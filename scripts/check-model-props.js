/**
 * v-model 声明契约校验（由 `scripts/prepublish-guard.js` 第 ⑦ 项调用）
 *
 * 全库判据是「传值即受控」（`props.x !== undefined`），它与 `defineModel` 自带的判据
 * （prop + `onUpdate` 监听器同时存在）冲突，故三条断言：
 *
 * ① **禁止 `defineModel`**（无白名单例外，公共 API 与内部组件一律适用）——
 *    `defineModel` 会把「父只传值不监听」退化为本地可写，UI 正常但数据不回流（静默分叉）。
 * ② `useControlledModel('x', ...)` 的字段在 `withDefaults` 里只能写 `undefined`：
 *    布尔 prop 缺省会被强转 `false`，其余默认值同样会让判据恒真 → 组件永久受控、写入不生效。
 * ③ `useControlledModel('x', ...)` 的字段必须在 `defineEmits` 里声明 `update:x`：
 *    派发发生在组合式函数内部，漏声明时功能照常，但每次交互都会输出 dev 告警，
 *    监听器还会落进 `$attrs` 透传到根节点。
 *
 * 三条规则的文本扫描前都先剥离注释 —— 注释里的示例代码不该被当成真实调用点。
 * 只做文本解析（不跑编译器、不跑构建），与守卫其余各项同为毫秒级。
 */
import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { collectSfcs, findBalancedEnd } from './check-prop-runtime-types.js'
import { stripComments } from './component-vars-check.js'

/** `defineModel` 声明：不带参数时默认模型名为 `modelValue` */
const MODEL_PATTERN = /defineModel\s*(?:<[^()]*>)?\s*\(\s*(?:'([^']+)'|"([^"]+)")?/g

/**
 * 收集 SFC 里 `defineModel` 声明的模型名
 *
 * 全库禁止 `defineModel`（判据冲突见文件头），这里只为把违规点连同模型名一起报出来。
 *
 * @param source - SFC 源码
 * @returns 模型名清单，未使用时为空数组
 */
function collectDefinedModels(source) {
  const models = []
  MODEL_PATTERN.lastIndex = 0
  let hit = MODEL_PATTERN.exec(source)
  while (hit) {
    models.push(hit[1] || hit[2] || 'modelValue')
    hit = MODEL_PATTERN.exec(source)
  }
  return models
}

/**
 * `useControlledModel<T>('x', ...)` 调用点：受控判据落在 `<T>` 与 `'x'` 上
 *
 * 泛型写不写都要能识别 —— 漏掉不写泛型的调用会让下面第 ② 条静默失效（正是它要防的那类缺陷）。
 * 不写泛型时 `typeName` 为 `undefined`，只跳过「布尔字段必须显式写 `undefined`」那条（类型不可知）。
 */
const CONTROLLED_MODEL_PATTERN =
  /useControlledModel\s*(?:<\s*([^<>]*(?:<[^<>]*>[^<>]*)*)\s*>)?\s*\(\s*['"]([A-Za-z_$][\w$]*)['"]/g

/** 跳过后随空白，返回第一个非空白字符下标 */
function skipSpaces(text, index) {
  let next = index
  while (next < text.length && /\s/.test(text[next])) next++
  return next
}

/**
 * 取 `startIndex`（指向开括号）的配对闭括号下标
 *
 * 只用于跳过类型参数与调用括号：字符串内容不参与配平；`=>` 的 `>` 单独跳过，
 * 否则箭头函数会把泛型深度抹平、后续闭括号失配。
 *
 * @param text - 源码
 * @param startIndex - 开括号所在下标
 * @returns 闭括号下标，未配平时为 `-1`
 */
function findCloseIndex(text, startIndex) {
  const pairs = { '(': ')', '<': '>', '[': ']', '{': '}' }
  const opener = text[startIndex]
  const closer = pairs[opener]
  let depth = 0
  let quote = ''
  for (let index = startIndex; index < text.length; index++) {
    const char = text[index]
    if (quote) {
      if (char === '\\') {
        index++
      } else if (char === quote) {
        quote = ''
      }
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char
      continue
    }
    if (char === '>' && text[index - 1] === '=') continue
    if (char === opener) {
      depth++
      continue
    }
    if (char === closer) {
      depth--
      if (depth === 0) return index
    }
  }
  return -1
}

/**
 * 解析 `withDefaults(defineProps(), { ... })` 的顶层默认值
 *
 * 判据只看「值是否恰好是 `undefined`」—— 双模字段的合法写法只有这一种，
 * 其余任何值都会让「传值即受控」的判据恒真。
 *
 * 泛型参数用括号配平跳过，不能用 `[^)]*`：类型里一旦出现函数成员
 * （`Props & { onClick?: (item: Item) => void }`），`[^)]*` 会提前闭合、整个默认值块被静默跳过。
 * 跳过失败时返回 `blocked: true`，由上层报「无法解析」而不是假装通过。
 *
 * @param source - SFC 源码
 * @returns `hasBlock` 是否存在默认值块、`blocked` 是否有默认值块但解析失败、
 *          `hasSpread` 是否含展开项（展开项无法静态求值）、`defaults` 字段名 → 默认值文本
 */
export function parseModelDefaults(source) {
  const empty = () => ({ hasBlock: false, blocked: false, hasSpread: false, defaults: new Map() })
  const failed = () => ({ hasBlock: false, blocked: true, hasSpread: false, defaults: new Map() })
  const hit = /withDefaults\s*\(\s*defineProps\b/.exec(source)
  if (!hit) return empty()
  let index = hit.index + hit[0].length
  if (source[index] === '<') {
    const genericsEnd = findCloseIndex(source, index)
    if (genericsEnd < 0) return failed()
    index = genericsEnd + 1
  }
  index = skipSpaces(source, index)
  if (source[index] !== '(') return failed()
  const callEnd = findCloseIndex(source, index)
  if (callEnd < 0) return failed()
  index = skipSpaces(source, callEnd + 1)
  // 没有第二个参数 = 该组件没写默认值，属正常写法
  if (source[index] !== ',') return empty()
  const braceIndex = skipSpaces(source, index + 1)
  if (source[braceIndex] !== '{') return failed()
  const end = findBalancedEnd(source, braceIndex)
  if (end <= braceIndex) return failed()
  const defaults = new Map()
  // 先剥注释：默认值常带 `, // 说明`，注释里的逗号会切断后续字段
  const body = stripComments(source.slice(braceIndex + 1, end))
  // 展开项（`...SHARED_DEFAULTS`）在源码里不可求值，含展开时只做「字段是否在块内」的判断
  const hasSpread = /(^|\n)\s*\.\.\./.test(body)
  splitTopLevelEntries(body).forEach((entry) => {
    const field = /^\s*([A-Za-z_$][\w$]*)\s*:\s*([\s\S]*)$/.exec(entry)
    if (field) defaults.set(field[1], field[2].trim())
  })
  return { hasBlock: true, blocked: false, hasSpread, defaults }
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
  const text = stripComments(source)
  const { hasBlock, blocked, hasSpread, defaults } = parseModelDefaults(text)
  // 有默认值块却解析不出来时不能静默跳过：那会让该组件的双模默认值「不被检查」而守卫仍显示通过
  if (blocked) {
    problems.push(
      `${label} 的 withDefaults 默认值块无法解析：该组件的双模字段默认值不会被校验，` +
        '请检查写法（类型参数里含函数成员时需保证括号配平）'
    )
    return problems
  }
  if (!hasBlock) return problems
  CONTROLLED_MODEL_PATTERN.lastIndex = 0
  let hit = CONTROLLED_MODEL_PATTERN.exec(text)
  while (hit) {
    const [, typeName, field] = hit
    hit = CONTROLLED_MODEL_PATTERN.exec(text)
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
 * 校验双模字段的 `update:x` 已声明进 `defineEmits`
 *
 * `useControlledModel` 在组合式函数内部派发 `update:x`（见 `components/utils/controlled-model.ts`），
 * 组件源码里没有对应的 emit 调用，因此「是否声明」只能靠字符串判定。
 * 漏声明时功能照常（Vue 从 `vnode.props` 取监听器），但每次交互都会输出
 * 「neither declared in the emits option nor as an "onUpdate:x" prop」的 dev 告警，
 * 且监听器落进 `$attrs` 透传到根节点 —— 不逐行读代码发现不了，必须由守卫兜住。
 *
 * 判据：先剔除派发调用点（`emits('update:x', ...)`），再要求 `'update:x'` 仍出现在源码里
 * （仍在 = 声明在 `defineEmits` 的数组 / 对象字面量 / 同文件类型别名中）。
 *
 * @param source - SFC 源码
 * @param label - 问题信息里的文件标识
 * @returns 问题清单
 */
export function collectEmitDeclareProblems(source, label) {
  const problems = []
  const text = stripComments(source)
  const checked = new Set()
  CONTROLLED_MODEL_PATTERN.lastIndex = 0
  let hit = CONTROLLED_MODEL_PATTERN.exec(text)
  while (hit) {
    const field = hit[2]
    hit = CONTROLLED_MODEL_PATTERN.exec(text)
    if (checked.has(field)) continue
    checked.add(field)
    const eventName = `update:${field}`
    const escaped = eventName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const withoutCalls = text.replace(new RegExp(`emi\\w*\\s*\\(\\s*(['"])${escaped}\\1`, 'g'), '')
    if (!withoutCalls.includes(`'${eventName}'`) && !withoutCalls.includes(`"${eventName}"`)) {
      problems.push(
        `${label} 的 \`useControlledModel('${field}')\` 未在 \`defineEmits\` 中声明 \`${eventName}\`：` +
          '该事件由组合式函数内部派发，漏声明会在使用方控制台输出 dev 告警，' +
          '监听器还会落进 `$attrs` 透传到根节点；请在 `defineEmits` 中补上该事件'
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
 * @returns `defaultsChecked` 已校验的双模字段数、`problems` 问题清单
 */
export function checkModelProps({ rootDir, componentsDir = 'components' }) {
  const problems = []
  let defaultsChecked = 0
  const componentsRoot = resolve(rootDir, componentsDir)

  collectSfcs(componentsRoot).forEach((sfcPath) => {
    // 先剥注释：注释里的示例代码（如「原先写法：useControlledModel('open', false)」）不该被当成真实调用点
    const source = stripComments(readFileSync(sfcPath, 'utf-8'))
    const sfcRelative = relative(componentsRoot, sfcPath).split('\\').join('/')
    const label = `${componentsDir}/${sfcRelative}`
    // 一律禁止：defineModel 的受控判据（prop + 监听器）与全库「传值即受控」的判据冲突，
    // 会让「父只传值不监听」的用法退化为本地可写（静默分叉）
    const models = collectDefinedModels(source)
    if (models.length > 0) {
      problems.push(
        `${label} 使用了 \`defineModel('${models[0]}')\`：禁止用 defineModel 声明 v-model，` +
          '请改为 `interface Props` 里声明字段 + `defineEmits` 声明 `update:x`' +
          '（双模字段用 components/utils 的 useControlledModel），见 development/component-design.md 的「v-model 声明约定」'
      )
    }
    defaultsChecked += (source.match(/useControlledModel\s*[(<]/g) || []).length
    collectModelDefaultProblems(source, label).forEach((problem) => problems.push(problem))
    collectEmitDeclareProblems(source, label).forEach((problem) => problems.push(problem))
  })

  return { defaultsChecked, problems }
}
