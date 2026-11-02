/**
 * v-model 对外类型契约校验（由 `scripts/prepublish-guard.js` 第 ⑦ 项调用）
 *
 * 背景：`defineModel('value')` 是编译期宏 —— 它在产物里生成 `value` prop 与 `update:value` 事件，
 * 但源码侧的 `export interface Props` 看不到它（同名字段再写进 `defineProps` 会重复声明 prop）。
 * 于是对外导出的 `XxxProps` 必须手动合并 `Props & { value?: T }`，否则使用方拿到的具名 props
 * 类型缺 v-model 字段：组件本身可用（实例与模板类型由编译器补全），只有显式标注 `XxxProps`
 * 的场景出错，如 `const p: CalendarProps = { value }` 报「不存在该属性」。
 *
 * 该错位在库内全部自检链条上都不可见：dev 站与单测都走组件实例，`vue-tsc` 也不会报。
 * 故按「源码约定」在此兜住：凡声明了对外 props 类型（`interface Props` 或 `Props & { ... }` 合并块）
 * 的 SFC，其每个 `defineModel('x')` 的 `x` 都必须能在其中找到。
 * 未声明任何对外 props 类型的 SFC（内部组件）不适用，计入 skipped。
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
 * 执行校验
 *
 * @param options - 校验参数
 * @param options.rootDir - 项目根目录
 * @param options.componentsDir - 组件源码目录（默认 `components`）
 * @param options.allowedSfc - 允许继续使用 `defineModel` 的 SFC 相对路径集合（默认取存量白名单）
 * @returns `checked` 已校验的 v-model 字段数、`skipped` 不适用（内部组件）的模型数、`problems` 问题清单
 */
export function checkModelProps({ rootDir, componentsDir = 'components', allowedSfc = LEGACY_DEFINE_MODEL }) {
  const problems = []
  let checked = 0
  let skipped = 0
  const componentsRoot = resolve(rootDir, componentsDir)

  collectSfcs(componentsRoot).forEach((sfcPath) => {
    const { models, declared, typed } = parseModelContract(readFileSync(sfcPath, 'utf-8'))
    if (models.length === 0) {
      return
    }
    const sfcRelative = relative(componentsRoot, sfcPath).split('\\').join('/')
    // 白名单之外一律禁止：defineModel 的受控判据（prop + 监听器）与全库「传值即受控」的判据冲突，
    // 会让「父只传值不监听」的用法退化为本地可写（静默分叉）
    if (!allowedSfc.has(sfcRelative)) {
      problems.push(
        `${componentsDir}/${sfcRelative} 使用了 \`defineModel('${models[0]}')\`：公共 API 禁止用 defineModel 声明 v-model，` +
          '请改为 `interface Props` 里声明字段 + `defineEmits` 声明 `update:x`' +
          '（双模字段用 components/utils 的 useControlledModel），见 development/component-design.md 的「v-model 声明约定」；' +
          '非公共入口确需使用请加入 scripts/check-model-props.js 的白名单'
      )
      return
    }
    models.forEach((modelName) => {
      if (!typed) {
        skipped++
        return
      }
      checked++
      if (!declared.has(modelName)) {
        problems.push(
          `${componentsDir}/${sfcRelative} 的 \`defineModel('${modelName}')\` 未出现在对外 props 类型中：` +
            `请在 \`interface Props\` 或 \`XxxProps = Props & { ${modelName}?: ... }\` 合并块中补齐，` +
            '否则使用方拿到的具名 props 类型缺少该 v-model 字段' +
            '（见 development/component-design.md 的「v-model 声明约定」）'
        )
      }
    })
  })

  return { checked, skipped, problems }
}
