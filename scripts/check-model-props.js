/**
 * v-model 声明契约校验（由 `scripts/prepublish-guard.js` 第 ⑦ 项调用）
 *
 * 全库判据是「传值即受控」（`props.x !== undefined`），它与 `defineModel` 自带的判据
 * （prop + `onUpdate` 监听器同时存在）冲突，故三条断言：
 *
 * ① **公共 API 禁止 `defineModel`**（见 `LEGACY_DEFINE_MODEL` 白名单，当前为空）——
 *    `defineModel` 会把「父只传值不监听」退化为本地可写，UI 正常但数据不回流（静默分叉）。
 * ② 白名单内的存量若仍用 `defineModel`，其字段必须并入对外 props 类型：`defineModel('value')`
 *    在产物里生成 `value` prop 与 `update:value` 事件，但源码侧的 `export interface Props`
 *    看不到它，对外导出的 `XxxProps` 须手动合并 `Props & { value?: T }`，否则
 *    `const p: XxxProps = { value }` 这类显式标注会报「不存在该属性」（dev 站与单测都走
 *    组件实例，`vue-tsc` 也不报，只有使用方踩得到）。未声明对外 props 类型的 SFC 计入 skipped。
 * ③ `useControlledModel('x', ...)` 的字段在 `withDefaults` 里只能写 `undefined`：
 *    布尔 prop 缺省会被强转 `false`，其余默认值同样会让判据恒真 → 组件永久受控、写入不生效。
 *
 * 只做文本解析（不跑编译器、不跑构建），与守卫其余各项同为毫秒级。
 */
import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { collectSfcs, findBalancedEnd, parsePropsFields } from './check-prop-runtime-types.js'

/** `defineModel` 声明：不带参数时默认模型名为 `modelValue` */
const MODEL_PATTERN = /defineModel\s*(?:<[^()]*>)?\s*\(\s*(?:'([^']+)'|"([^"]+)")?/g

/**
 * 存量白名单：这些 SFC 仍允许用 `defineModel` 声明 v-model 字段
 *
 * 全库 v-model 判据统一为「传值即受控」（`props.x !== undefined`），见
 * `development/component-design.md` 的「v-model 声明约定」。`defineModel` 的受控判据要求
 * 「prop + onUpdate 监听器」同时存在，与上述判据冲突，故禁止用于公共 API。
 *
 * 存量迁移已全部完成（最后一处 `time-picker/TimePicker.vue` 随 3.7.0 迁往 `useControlledModel`），
 * 白名单为空：任何组件新增 `defineModel` 都会被判为问题。
 */
const LEGACY_DEFINE_MODEL = new Set([])

/** `Props & { ... }` 形式的对外合并块（如 `CalendarProps = Props & { value?: ... }`） */
const MERGE_PATTERN = /type\s+[A-Za-z_$][\w$]*\s*=\s*Props\s*&\s*\{/g

/**
 * `useControlledModel<T>('x', ...)` 调用点：受控判据落在 `<T>` 与 `'x'` 上
 *
 * 泛型写不写都要能识别 —— 漏掉不写泛型的调用会让下面第 ③ 条静默失效（正是它要防的那类缺陷）。
 * 不写泛型时 `typeName` 为 `undefined`，只跳过「布尔字段必须显式写 `undefined`」那条（类型不可知）。
 */
const CONTROLLED_MODEL_PATTERN =
  /useControlledModel\s*(?:<\s*([^<>]*(?:<[^<>]*>[^<>]*)*)\s*>)?\s*\(\s*['"]([A-Za-z_$][\w$]*)['"]/g

/**
 * 解析 `withDefaults(defineProps(), { ... })` 的顶层默认值
 *
 * 判据只看「值是否恰好是 `undefined`」—— 双模字段的合法写法只有这一种，
 * 其余任何值都会让「传值即受控」的判据恒真。
 *
 * @param source - SFC 源码
 * @returns `hasBlock` 是否存在 withDefaults、`hasSpread` 是否含展开项（展开项无法静态求值）、
 *          `defaults` 字段名 → 默认值文本
 */
export function parseModelDefaults(source) {
  const defaults = new Map()
  const hit = /withDefaults\s*\(\s*defineProps\b[^)]*\)\s*,\s*\{/.exec(source)
  if (!hit) return { hasBlock: false, hasSpread: false, defaults }
  const braceIndex = source.indexOf('{', hit.index + hit[0].length - 1)
  const end = findBalancedEnd(source, braceIndex)
  if (end <= braceIndex) return { hasBlock: false, hasSpread: false, defaults }
  // 先剥行注释：默认值常带 `, // 说明`，注释里的逗号会切断后续字段
  const body = stripLineComments(source.slice(braceIndex + 1, end))
  // 展开项（`...SHARED_DEFAULTS`）在源码里不可求值，含展开时只做「字段是否在块内」的判断
  const hasSpread = /(^|\n)\s*\.\.\./.test(body)
  splitTopLevelEntries(body).forEach((entry) => {
    const field = /^\s*([A-Za-z_$][\w$]*)\s*:\s*([\s\S]*)$/.exec(entry)
    if (field) defaults.set(field[1], field[2].trim())
  })
  return { hasBlock: true, hasSpread, defaults }
}

/** 去掉行注释（字符串内的 `//` 不算），保留换行以便字段按行分隔 */
function stripLineComments(text) {
  let output = ''
  let quote = ''
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (quote) {
      output += char
      if (char === '\\') {
        output += text[index + 1] ?? ''
        index++
      } else if (char === quote) {
        quote = ''
      }
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char
      output += char
      continue
    }
    if (char === '/' && text[index + 1] === '/') {
      while (index < text.length && text[index] !== '\n') index++
      output += '\n'
      continue
    }
    output += char
  }
  return output
}

/**
 * 按顶层逗号切分对象字面量的成员
 *
 * 括号深度 0 才算分隔符，因此 `() => ({ a: 1, b: 2 })` 不会被切碎；`=>` 的 `>` 跳过，
 * 否则箭头函数会把深度算成负数、后续逗号全部失效。
 *
 * @param body - 对象体文本
 * @returns 成员文本清单
 */
function splitTopLevelEntries(body) {
  const entries = []
  let depth = 0
  let quote = ''
  let start = 0
  let index = 0
  while (index < body.length) {
    const char = body[index]
    if (quote) {
      if (char === '\\') {
        index += 2
        continue
      }
      if (char === quote) quote = ''
      index++
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char
      index++
      continue
    }
    if (char === '>' && body[index - 1] === '=') {
      index++
      continue
    }
    if ('([{<'.includes(char)) {
      depth++
      index++
      continue
    }
    if (')]}>'.includes(char)) {
      depth--
      index++
      continue
    }
    if (char === ',' && depth === 0) {
      entries.push(body.slice(start, index))
      start = index + 1
    }
    index++
  }
  entries.push(body.slice(start))
  return entries
}

/**
 * 提取对象字面量类型体的顶层字段名
 *
 * 只在括号深度 0 且位于行首（前一字符为空白）处识别 `字段名?:`，因此嵌套对象的内层键不会被
 * 误判为顶层字段；`=>` 的 `>` 单独跳过，避免箭头函数把深度抹平。
 *
 * @param body - `{` 与 `}` 之间的文本
 * @returns 顶层字段名清单
 */
export function parseObjectFieldNames(body) {
  const names = []
  let depth = 0
  let quote = ''
  let index = 0
  while (index < body.length) {
    const char = body[index]
    if (quote) {
      if (char === '\\') {
        index += 2
        continue
      }
      if (char === quote) {
        quote = ''
      }
      index++
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char
      index++
      continue
    }
    if (char === '>' && body[index - 1] === '=') {
      index++
      continue
    }
    if ('([{<'.includes(char)) {
      depth++
      index++
      continue
    }
    if (')]}>'.includes(char)) {
      depth--
      index++
      continue
    }
    const atLineHead = index === 0 || /\s/.test(body[index - 1])
    if (depth === 0 && atLineHead) {
      const hit = /^([A-Za-z_$][\w$]*)\??\s*:/.exec(body.slice(index))
      if (hit) {
        names.push(hit[1])
        index += hit[0].length
        continue
      }
    }
    index++
  }
  return names
}

/**
 * 解析 SFC 的 v-model 声明与对外 props 类型字段
 *
 * @param source - SFC 源码
 * @returns `models` 声明的模型名清单、`declared` 对外 props 类型可用的字段名集合、
 *          `typed` 该 SFC 是否声明了对外 props 类型（无则为内部组件，校验不适用）
 */
export function parseModelContract(source) {
  const models = []
  MODEL_PATTERN.lastIndex = 0
  let hit = MODEL_PATTERN.exec(source)
  while (hit) {
    models.push(hit[1] || hit[2] || 'modelValue')
    hit = MODEL_PATTERN.exec(source)
  }

  const declared = new Set()
  let typed = false
  const propsFields = parsePropsFields(source)
  if (propsFields) {
    typed = true
    propsFields.forEach((_type, name) => declared.add(name))
  }
  MERGE_PATTERN.lastIndex = 0
  let merge = MERGE_PATTERN.exec(source)
  while (merge) {
    const braceIndex = source.indexOf('{', merge.index)
    const end = findBalancedEnd(source, braceIndex)
    if (end > braceIndex) {
      typed = true
      parseObjectFieldNames(source.slice(braceIndex + 1, end)).forEach((name) => declared.add(name))
    }
    merge = MERGE_PATTERN.exec(source)
  }

  return { models, declared, typed }
}

/**
 * 校验双模字段的 prop 默认值
 *
 * `useControlledModel` 的判据是 `props.x !== undefined`，因此字段的 `withDefaults` 只能写 `undefined`：
 * - 写了别的值（`false` / `0` / `() => []`）→ 判据恒真，组件永久受控、写入不生效（现象是「事件照常派发、界面不动」）；
 * - 布尔字段一个字都不写 → Vue 把缺省的 Boolean prop 强转为 `false`，同样恒真。
 *
 * 含展开项（`...SHARED_DEFAULTS`）时默认值无法静态求值，只判定「字段是否在块内」，展开项的正确性由组件自身的用例兜住。
 *
 * @param source - SFC 源码
 * @param label - 问题信息里的文件标识
 * @returns 问题清单
 */
export function collectModelDefaultProblems(source, label) {
  const problems = []
  const { hasBlock, hasSpread, defaults } = parseModelDefaults(source)
  if (!hasBlock) return problems
  CONTROLLED_MODEL_PATTERN.lastIndex = 0
  let hit = CONTROLLED_MODEL_PATTERN.exec(source)
  while (hit) {
    const [, typeName, field] = hit
    hit = CONTROLLED_MODEL_PATTERN.exec(source)
    if (defaults.has(field)) {
      const value = defaults.get(field)
      if (value !== 'undefined') {
        problems.push(
          `${label} 的 \`useControlledModel('${field}')\` 字段在 withDefaults 中给了 \`${value}\`：` +
            '双模字段的默认值只能是 undefined，否则「传值即受控」的判据恒真，组件永久受控、交互写入不生效' +
            '（非受控初值请作为 useControlledModel 的第二个参数传入）'
        )
      }
      continue
    }
    if (hasSpread) continue
    // 布尔 prop 缺省会被 Vue 强转为 false，判据同样恒真 —— 必须显式写 undefined
    // 未标注泛型时类型不可知，只能跳过这条（字段本身的默认值判定不受影响）
    if (typeName && /\bboolean\b/.test(typeName)) {
      problems.push(
        `${label} 的 \`useControlledModel<${typeName}>('${field}')\` 未在 withDefaults 中声明：` +
          '布尔 prop 缺省会被 Vue 强转为 false，判据恒真；请在 withDefaults 中显式写 `undefined`'
      )
    }
  }
  return problems
}

/**
 * 执行校验
 *
 * @param options - 校验参数
 * @param options.rootDir - 项目根目录
 * @param options.componentsDir - 组件源码目录（默认 `components`）
 * @param options.allowedSfc - 允许继续使用 `defineModel` 的 SFC 相对路径集合（默认取存量白名单）
 * @returns `checked` 已校验的 v-model 字段数、`skipped` 不适用（内部组件）的模型数、
 *          `defaultsChecked` 已校验的双模字段数、`problems` 问题清单
 */
export function checkModelProps({ rootDir, componentsDir = 'components', allowedSfc = LEGACY_DEFINE_MODEL }) {
  const problems = []
  let checked = 0
  let skipped = 0
  let defaultsChecked = 0
  const componentsRoot = resolve(rootDir, componentsDir)

  collectSfcs(componentsRoot).forEach((sfcPath) => {
    const source = readFileSync(sfcPath, 'utf-8')
    const sfcRelative = relative(componentsRoot, sfcPath).split('\\').join('/')
    const label = `${componentsDir}/${sfcRelative}`
    const { models, declared, typed } = parseModelContract(source)
    // 白名单之外一律禁止：defineModel 的受控判据（prop + 监听器）与全库「传值即受控」的判据冲突，
    // 会让「父只传值不监听」的用法退化为本地可写（静默分叉）
    if (models.length > 0) {
      if (!allowedSfc.has(sfcRelative)) {
        problems.push(
          `${label} 使用了 \`defineModel('${models[0]}')\`：公共 API 禁止用 defineModel 声明 v-model，` +
            '请改为 `interface Props` 里声明字段 + `defineEmits` 声明 `update:x`' +
            '（双模字段用 components/utils 的 useControlledModel），见 development/component-design.md 的「v-model 声明约定」；' +
            '非公共入口确需使用请加入 scripts/check-model-props.js 的白名单'
        )
      } else {
        models.forEach((modelName) => {
          if (!typed) {
            skipped++
            return
          }
          checked++
          if (!declared.has(modelName)) {
            problems.push(
              `${label} 的 \`defineModel('${modelName}')\` 未出现在对外 props 类型中：` +
                `请在 \`interface Props\` 或 \`XxxProps = Props & { ${modelName}?: ... }\` 合并块中补齐，` +
                '否则使用方拿到的具名 props 类型缺少该 v-model 字段' +
                '（见 development/component-design.md 的「v-model 声明约定」）'
            )
          }
        })
      }
    }
    defaultsChecked += (source.match(/useControlledModel\s*[(<]/g) || []).length
    collectModelDefaultProblems(source, label).forEach((problem) => problems.push(problem))
  })

  return { checked, skipped, defaultsChecked, problems }
}
