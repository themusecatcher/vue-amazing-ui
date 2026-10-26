/**
 * props 运行时类型契约校验（由 `scripts/prepublish-guard.js` 第 ⑥ 项调用）
 *
 * 背景：本库的 SFC 统一用 `defineProps<Props>()` 类型推导声明 props。Vue 编译器只能把
 * 「可映射类型」（`String` / `Number` / `Boolean` / `Object` / `Array` / `Function` / `Date` /
 * `Symbol` 等）写进 props 的运行时类型，**DOM 接口（`HTMLElement` / `Document`）与
 * `keyof typeof xxx` 派生类型无法推断**：
 *
 * - 非生产编译：推断失败会打 `skipCheck`，运行时跳过校验 → 库内 dev 站永远看不到问题；
 * - 生产编译：`skipCheck` 被剥掉 → 发布包里 `to` 只剩 `[String, Boolean]`，
 *   使用方在开发环境传元素便误报 `Invalid prop: type check failed`。
 *
 * 该错位在库内全部自检链条（type-check / 单测 / 库内 dev 站）上都不可见，只能在消费方暴露，
 * 故按「源码约定 + 产物一致性」两层兜住：
 *
 * 1. **源码约定**：`interface Props` 中不允许把裸 `HTMLElement` / `Document` 直接作为联合成员，
 *    须改用 `MountElement` / `MountDocument`（`interface extends` 形态，可被推断为 `Object`）。
 * 2. **产物一致性**：源码里带 DOM 类型（或 `Mount*`）的 prop，产物运行时类型必须含 `Object`；
 *    带 `keyof typeof` / `LiteralUnion` 的，必须含 `String`。
 *
 * 只做文本解析（不跑编译器、不跑构建），与守卫其余各项同为毫秒级。
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { relative, resolve } from 'node:path'

/**
 * 各产物目录的组件编译产物后缀
 *
 * 同一 SFC 的编译代码落在哪个文件取决于它是否另有 `<template>` / `<style>` 之外的部件：
 * 多数组件在 `<Name>.vue2.js`，另一些（如 `NumberAnimation`）在 `<Name>.vue.js`，另一个只是转发壳，
 * 故两个都要试（lib 同理为 `.vue2.cjs` / `.vue.cjs`）。
 */
const DEFAULT_OUT_DIRS = [
  { dir: 'es', artifactSuffixes: ['.vue2.js', '.vue.js'] },
  { dir: 'lib', artifactSuffixes: ['.vue2.cjs', '.vue.cjs'] }
]

/** 裸 DOM 类型：只能经 interface 替身（MountElement / MountDocument）间接使用 */
const RAW_DOM_TYPES = new Set(['HTMLElement', 'Document'])

/** 递归收集 SFC（跳过隐藏目录与 node_modules） */
function collectSfcs(dir, result = []) {
  if (!existsSync(dir)) {
    return result
  }
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') {
      return
    }
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      collectSfcs(fullPath, result)
      return
    }
    if (entry.name.endsWith('.vue')) {
      result.push(fullPath)
    }
  })
  return result
}

/** 取从 openIndex 处左括号开始、配平的右括号下标（跳过字符串字面量内的括号） */
function findBalancedEnd(text, openIndex) {
  const open = text[openIndex]
  const close = open === '{' ? '}' : open === '[' ? ']' : open === '(' ? ')' : '<'
  let depth = 0
  let quote = ''
  for (let i = openIndex; i < text.length; i++) {
    const char = text[i]
    if (quote) {
      if (char === '\\') {
        i++
      } else if (char === quote) {
        quote = ''
      }
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char
      continue
    }
    if (char === open) {
      depth++
    } else if (char === close) {
      depth--
      if (depth === 0) {
        return i
      }
    }
  }
  return -1
}

/** 去掉行尾 `//` 注释（类型文本本身不含 `//`，注释里的 URL 一律在 `//` 之后） */
function stripLineComment(line) {
  const index = line.indexOf('//')
  return index >= 0 ? line.slice(0, index) : line
}

/** 按顶层 `|` 拆分联合类型，返回各成员（已 trim、去空） */
export function splitUnionMembers(typeText) {
  const members = []
  let depth = 0
  let current = ''
  for (let index = 0; index < typeText.length; index++) {
    const char = typeText[index]
    // 箭头函数的 `=>` 不能按泛型右尖括号处理，否则括号深度会被抹平、后续 `|` 被误当顶层分隔
    if (char === '>' && typeText[index - 1] === '=') {
      current += char
      continue
    }
    if ('([{<'.includes(char)) {
      depth++
    } else if (')]}>'.includes(char)) {
      depth--
    }
    if (char === '|' && depth === 0) {
      members.push(current.trim())
      current = ''
      continue
    }
    current += char
  }
  members.push(current.trim())
  return members.filter(Boolean)
}

/**
 * 解析 `interface Props { ... }` 的字段（字段名 → 类型文本）
 *
 * 按**括号深度**切分：只在顶层（深度 0）识别 `字段名?:` 作为新字段的起点，因此
 * - 跨行联合（`placement?:\n | 'top'\n | 'topLeft'`）会被完整归入同一字段；
 * - 嵌套对象类型（`loadingBarStyle?: { loading?: ... }`）的内层键不会被误判为顶层字段。
 * 行尾 `//` 注释先统一剥离，避免注释里的中文标点与括号干扰深度统计。
 *
 * @param source - SFC 源码
 * @returns 字段映射；SFC 内没有 `interface Props` 时返回 null
 */
export function parsePropsFields(source) {
  const match = /interface\s+Props\b[^{]*\{/.exec(source)
  if (!match) {
    return null
  }
  const braceIndex = source.indexOf('{', match.index)
  const end = findBalancedEnd(source, braceIndex)
  if (end < 0) {
    return null
  }
  const body = source
    .slice(braceIndex + 1, end)
    .split('\n')
    .map(stripLineComment)
    .join('\n')
  const fieldStart = /([A-Za-z_$][\w$]*)\??\s*:\s*/g
  const starts = []
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
    // 箭头函数的 `=>` 不能按泛型右尖括号处理
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
    if (depth === 0 && atLineHead && /[A-Za-z_$]/.test(char)) {
      fieldStart.lastIndex = index
      const hit = fieldStart.exec(body)
      if (hit && hit.index === index) {
        starts.push({ key: hit[1], start: index, typeStart: index + hit[0].length })
        index += hit[0].length
        continue
      }
    }
    index++
  }
  const fields = new Map()
  starts.forEach((item, position) => {
    const typeEnd = position + 1 < starts.length ? starts[position + 1].start : body.length
    fields.set(item.key, body.slice(item.typeStart, typeEnd).trim().replace(/\s+/g, ' '))
  })
  return fields
}

/**
 * 收集「危险别名」：把 `HTMLElement` / `Document` 或 `keyof typeof` 藏进类型别名后，
 * 单看字段文本无法识别（如 `easing?: EasingPreset | CubicBezierPoints`）。
 *
 * @param source - SFC 源码
 * @returns `domAliases` 命中 DOM 类型的别名、`stringAliases` 命中 `keyof typeof` 的别名
 */
export function parseRiskyAliases(source) {
  const domAliases = new Set()
  const stringAliases = new Set()
  const aliasPattern = /(?:export\s+)?type\s+([A-Za-z_$][\w$]*)\s*=\s*([^\n]+)/g
  let hit = aliasPattern.exec(source)
  while (hit) {
    if (/keyof\s+typeof/.test(hit[2])) {
      stringAliases.add(hit[1])
    }
    if (/\b(?:HTMLElement|Document)\b/.test(hit[2])) {
      domAliases.add(hit[1])
    }
    hit = aliasPattern.exec(source)
  }
  return { domAliases, stringAliases }
}

/** 类型文本是否引用了任一别名（按标识符边界匹配，避免 `EasingPreset` 命中 `EasingPresetX`） */
function mentionsAlias(typeText, aliases) {
  return [...aliases].some((alias) => new RegExp(`\\b${alias}\\b`).test(typeText))
}

/** 从产物文本中读取某个 prop 的运行时类型声明（如 `[String,Object,Boolean]` / `String`）；读不到返回 null */
export function readRuntimePropType(artifactText, propName) {
  const propsIndex = artifactText.indexOf('props:')
  if (propsIndex < 0) {
    return null
  }
  const pattern = new RegExp(`(?:[,{])\\s*${propName}\\s*:`)
  pattern.lastIndex = propsIndex
  const hit = pattern.exec(artifactText)
  if (!hit) {
    return null
  }
  let cursor = hit.index + hit[0].length
  while (cursor < artifactText.length && /\s/.test(artifactText[cursor])) {
    cursor++
  }
  const head = artifactText[cursor]
  if (head === '[') {
    // 无 default / required 时 Rollup 会压成短写法 `foo:[String,Object]`
    const end = findBalancedEnd(artifactText, cursor)
    return end < 0 ? null : artifactText.slice(cursor, end + 1)
  }
  if (head === '{') {
    const end = findBalancedEnd(artifactText, cursor)
    if (end < 0) {
      return null
    }
    const objectText = artifactText.slice(cursor, end + 1)
    const typeHit = /type\s*:\s*(\[[^\]]*\]|[A-Za-z_$][\w$]*)/.exec(objectText)
    return typeHit ? typeHit[1] : ''
  }
  // 极简写法 `foo:String`
  const shortHit = /^[A-Za-z_$][\w$]*/.exec(artifactText.slice(cursor))
  return shortHit ? shortHit[0] : null
}

/** 判定类型文本是否把裸 DOM 类型直接当联合成员（应改用 MountElement / MountDocument） */
function hasRawDomMember(typeText) {
  return splitUnionMembers(typeText).some((member) => RAW_DOM_TYPES.has(member))
}

/**
 * 生产编译只在联合里含 `Boolean` / `Function` 时才输出 props 的 `type`
 * （见 `@vue/compiler-sfc` 的 `genRuntimePropFromType`：其余类型会被整体省略）。
 * 因此「产物里没有 type」对 `string | MountElement` 这类纯对象/字符串联合是预期结果 ——
 * 此时运行时完全不校验，不会误报，无需断言；只有本应保留 type 的联合缺失才算问题。
 */
function expectsRuntimeType(typeText) {
  return splitUnionMembers(typeText).some(
    (member) => member === 'Boolean' || member === 'Function' || /=>/.test(member)
  )
}

/**
 * 执行校验
 *
 * @param options - 校验参数
 * @param options.rootDir - 项目根目录
 * @param options.componentsDir - 组件源码目录（默认 `components`）
 * @param options.outDirs - 产物目录与组件产物后缀
 * @returns `checked` 已校验的 prop × 产物数、`skipped` 产物缺失跳过数、`problems` 问题清单
 */
export function checkPropRuntimeTypes({ rootDir, componentsDir = 'components', outDirs = DEFAULT_OUT_DIRS }) {
  const problems = []
  let checked = 0
  let skipped = 0
  const componentsRoot = resolve(rootDir, componentsDir)

  collectSfcs(componentsRoot).forEach((sfcPath) => {
    const source = readFileSync(sfcPath, 'utf-8')
    const fields = parsePropsFields(source)
    if (!fields) {
      return
    }
    const { domAliases, stringAliases } = parseRiskyAliases(source)
    const sfcRelative = relative(componentsRoot, sfcPath).split('\\').join('/')
    const artifactBase = sfcRelative.replace(/\.vue$/, '')
    fields.forEach((typeText, propName) => {
      const rawDom = hasRawDomMember(typeText)
      const needsObject = rawDom || /MountElement|MountDocument/.test(typeText) || mentionsAlias(typeText, domAliases)
      const needsString = /keyof\s+typeof|LiteralUnion\s*</.test(typeText) || mentionsAlias(typeText, stringAliases)
      if (!needsObject && !needsString) {
        return
      }
      if (rawDom) {
        problems.push(
          `${componentsDir}/${sfcRelative} 的 prop \`${propName}\` 直接使用了裸 \`HTMLElement\` / \`Document\`：` +
            '编译器无法推断，发布包里会丢失该分支并误报 `Invalid prop`；请改用 `MountElement` / `MountDocument`' +
            '（见 development/component-design.md 的「Props 运行时类型约定」）'
        )
      }
      outDirs.forEach(({ dir, artifactSuffixes }) => {
        const expected = [needsObject && 'Object', needsString && 'String'].filter(Boolean).join(' / ')
        // 编译代码可能在 `.vue2.*` 也可能在 `.vue.*`（另一个是转发壳）：取第一个能读出该 prop 的文件
        const artifacts = artifactSuffixes
          .map((suffix) => ({ suffix, path: resolve(rootDir, dir, `${artifactBase}${suffix}`) }))
          .filter(({ path }) => existsSync(path))
        if (artifacts.length === 0) {
          skipped++
          return
        }
        let runtimeType = null
        let artifactLabel = ''
        artifacts.forEach(({ suffix, path }) => {
          if (runtimeType !== null) {
            return
          }
          const type = readRuntimePropType(readFileSync(path, 'utf-8'), propName)
          if (type !== null) {
            runtimeType = type
            artifactLabel = `${dir}/${artifactBase}${suffix}`
          }
        })
        if (runtimeType === null) {
          // 无 `Boolean` / `Function` 分支时生产编译会整体省略 type：运行时零校验，不会误报
          if (expectsRuntimeType(typeText)) {
            checked++
            problems.push(`${dir}/${artifactBase} 中找不到 prop \`${propName}\` 的运行时声明（期望含 ${expected}）`)
          }
          return
        }
        checked++
        if (!runtimeType && !expectsRuntimeType(typeText)) {
          // 找到 prop 但生产编译省略了 type（如 `string | MountElement`）：零校验，不会误报
          return
        }
        const missing = [needsObject && 'Object', needsString && 'String'].filter(
          (branch) => branch && !new RegExp(`\\b${branch}\\b`).test(runtimeType)
        )
        if (missing.length > 0) {
          problems.push(
            `${artifactLabel} 的 prop \`${propName}\` 运行时类型缺 ${missing.join(' / ')}：` +
              `实际为 \`${runtimeType}\`（源码类型 \`${typeText}\`）。` +
              'DOM 类型请经 MountElement / MountDocument，字符串字面量联合请补 `(string & {})` 或 LiteralUnion'
          )
        }
      })
    })
  })

  return { checked, skipped, problems }
}
