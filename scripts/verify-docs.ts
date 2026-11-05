#!/usr/bin/env node
/**
 * 组件文档契约守护（`pnpm verify:docs`）：三项断言，同一进程、同一退出码
 *
 * ① Props「默认值」列 ↔ 源码 `withDefaults`
 * ② 尾部章节顺序（APIs → Slots → Events → Methods → CSS 变量 → 在 setup 外使用）
 * ③ 演示用例一致性：Show Code 自包含 / 跨分节 `v-model` 绑定独立（用例数量差异降级为提示）
 *
 * 为什么①需要脚本：这类失真只能靠「逐字段与源码比对」发现，人工抽查必然漏 ——
 * 已发现的每一处（如 `avatar.color` / `waterfall.backgroundColor` / `time-picker.*Step` / `textarea.value`）
 * 都是这么漏掉的，且每一处都让使用方按错误默认值写代码。
 *
 * **口径**：默认值列写 **prop 默认值**，不是未传时的**有效初始值**（有效值写进说明列）。
 * 依据见 `development/demo-doc-guide.md` 的「默认值列」条目；`time-picker.hourStep` 是典型例子 ——
 * 默认值列写 `undefined`，未传时实际按 `1` 处理（有效值写在说明列）。
 *
 * 判定：两侧都归一到「值文本」再比对 ——
 * - 源码 `() => []` / `() => ({})` / `() => ['hover']` ↔ 文档 `[]` / `{}` / `'hover'`；
 * - 源码带类型断言（`as CubicBezierPoints`）时去掉断言；
 * - 文档侧的 Markdown 转义（`\_` `\:` `\{`）、`<br/>`、`&nbsp;`、反引号、`**` 一律剥掉；
 * - 引号与空白不参与比较；
 * - 默认值列允许「值 + 括号补充说明」（如 `undefined（ring-circle 取 12）`），只比对值本身。
 *
 * 无法静态求值的少数行（默认值由同文件常量表达等）登记在 `WHITELIST`，每项须写明理由。
 *
 * 为什么②需要脚本：2026-11-04 盘点 73 个组件文档，旧顺序（APIs → Slots → Methods → Events）
 * 执行率仅 85%，11 处漂移演化出 4 种形态（输入类把 Methods 写到 Events 之后，下拉 / 浮层类把
 * Events 提到 Slots 之前）—— 散文规范拦不住，只能机械断言。唯一标准见
 * `development/demo-doc-guide.md` 的「尾部章节顺序」；章节可缺省，断言的只是**相对顺序**
 * （规范序列的子序列）。同时拦截尾部自造标题（`## API` / `## 实例方法` / `## 事件` 等）：
 * 变体标题会让锚点失效，也会让顺序断言漏检；一份文档若通篇用变体标题、连一节规范标题都没有，
 * 同样失败（否则新写的文档会静默通过）。正文 demo 章节不在尾部区间内（如 date-picker /
 * time-picker 的「事件」示例），不参与判定。
 *
 * ② 只扫 `docs/`、约 40 行、零依赖，与①同目录同进程：不值得为它单开一个脚本 / 一条命令。
 *
 * 为什么③并入本脚本（2026-11-05）：Show Code 一致性曾只靠人工对账，实测漏掉 5 处「块内引用页面级变量」
 * 与 10 处「少写用例」。这类失真与①②同属「文档契约」，扫描范围（docs + views）、判据（机械断言）都同源，
 * 再单开脚本 / 命令只会让收尾多跑一条 —— 并入既有入口即可。为什么「用例数量」只提示不阻断：
 * `## 使用方式` 这类说明型章节会把多段代码并排、Show Code 只覆盖其中一段，机械比较必然误报，
 * 交给人工按章节性质判断。
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseModelDefaults } from './check-model-props'
import { stripComments } from './component-vars-parse'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = resolve(rootDir, 'components')
const docsDir = resolve(rootDir, 'docs/guide/components')

/**
 * 明确豁免的行：`<文档文件名> <prop>`
 *
 * 只接受「脚本无法静态求值」或「默认值列本身承载跨组件差异说明」两类，且必须写明理由。
 */
const WHITELIST = new Map([
  ['drawer.md push', '默认值由同文件常量 DEFAULT_PUSH_DISTANCE 表达，脚本不求值；改常量时需人工同步文档'],
  [
    'popconfirm.md tooltipRole',
    '默认值列同时承载「与 Tooltip 的差异」两个取值（`alertdialog` / `false`），无法归一为单个值'
  ]
])

/** `input-search` → `InputSearch`，用于定位同名 SFC */
function pascalCase(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/** 取走包裹括号：`({ a: 1 })` → `{ a: 1 }` */
function unwrapParens(value: string): string {
  let current = value.trim()
  while (current.startsWith('(') && current.endsWith(')')) {
    current = current.slice(1, -1).trim()
  }
  return current
}

/**
 * 归一化一侧的值文本
 *
 * @param raw - 源码默认值表达式或文档单元格文本
 * @returns 归一化后的可比值
 */
function normalizeValue(raw: string): string {
  let value = raw
  // 文档侧：HTML / Markdown 修饰与转义
  value = value.replace(/<br\s*\/?>/gi, '')
  value = value.replace(/&nbsp;/gi, '')
  value = value.replace(/`/g, '')
  value = value.replace(/\*\*/g, '')
  value = value.replace(/\\([_:\-|*.[\](){}])/g, '$1')
  // 源码侧：箭头函数、类型断言、包裹括号
  value = value.replace(/^\(\s*\)\s*=>\s*/, '')
  value = value.replace(/\s+as\s+[\w$.<>[\]\s|]+$/, '')
  value = unwrapParens(value)
  // 单元素数组等价于该元素（`() => ['hover']` ↔ `'hover'`）
  if (/^\[[^,]*\]$/.test(value.trim())) value = value.trim().slice(1, -1)
  return value.replace(/['"]/g, '').replace(/\s+/g, '').trim()
}

/**
 * 文档默认值列的实际值文本：去掉「默认」前缀与补充说明
 *
 * 只在全角括号 / 全角逗号处切分补充说明 —— 值本身常含半角括号（`rgba(...)`、`var(--x)`、
 * `(percent: number) => ...`），按半角括号切会把值截断成 `rgba` 这类片段。
 *
 * @param cell - 表格的默认值单元格
 * @returns 可比值
 */
function docCellValue(cell: string): string {
  const withoutNote = cell.split(/[（，]/)[0] ?? ''
  return withoutNote.replace(/^\s*默认\s*/, '')
}

/** 首列是否就是该 prop（允许反引号与 `<Tag>` 修饰） */
function isPropRow(line: string, prop: string): boolean {
  if (!line.trim().startsWith('|')) return false
  const first = (line.split('|')[1] ?? '').replace(/`/g, '').trim()
  return new RegExp(`^${prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$|<)`).test(first)
}

/** 尾部章节的唯一标准（数组下标即 rank）。标题文字必须逐字匹配 */
const ORDER = ['APIs', 'Slots', 'Events', 'Methods', 'CSS 变量', '在 setup 外使用']

/** 语义相同但不符合规范的标题变体 → 正确写法。只在尾部区间（首个规范章节之后）生效 */
const ALIASES = new Map([
  ['API', 'APIs'],
  ['Props', 'APIs'],
  ['属性', 'APIs'],
  ['插槽', 'Slots'],
  ['事件', 'Events'],
  ['方法', 'Methods'],
  ['实例方法', 'Methods'],
  ['CSS变量', 'CSS 变量'],
  ['在 setup 外调用', '在 setup 外使用']
])

/** 取二级标题：跳过代码围栏内的 `## `（demo 代码块里可能内嵌 markdown 示例） */
function levelTwoHeadings(lines: string[]): string[] {
  const headings: string[] = []
  let fence: string | null = null
  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(```+|~~~+)/)
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1][0]
      else if (fenceMatch[1][0] === fence) fence = null
      continue
    }
    if (fence !== null) continue
    const heading = line.match(/^##\s+(.+?)\s*$/)
    if (heading) headings.push(heading[1])
  }
  return headings
}

const valueFailures: string[] = []
let checked = 0
let whitelisted = 0

readdirSync(componentsDir).forEach((name) => {
  const dir = join(componentsDir, name)
  if (!statSync(dir).isDirectory() || !existsSync(join(dir, 'index.ts'))) return
  const docPath = join(docsDir, `${name}.md`)
  if (!existsSync(docPath)) return
  const sfcPath = join(dir, `${pascalCase(name)}.vue`)
  if (!existsSync(sfcPath)) return

  // 先剥注释：注释里的旧 `withDefaults` 示例会被当成真实默认值，导致比对的是过期取值
  const { hasBlock, blocked, defaults } = parseModelDefaults(stripComments(readFileSync(sfcPath, 'utf-8')))
  if (blocked) {
    valueFailures.push(`${name}.md 对应的 ${name}/${pascalCase(name)}.vue 的 withDefaults 无法解析，默认值列无法校验`)
    return
  }
  if (!hasBlock) return

  const docLines = readFileSync(docPath, 'utf-8').split('\n')
  defaults.forEach((rawDefault, prop) => {
    // 未在 Props 表出现的字段不报：`valueModifiers` 这类由 v-model 修饰符注入的字段本就不该列表
    const row = docLines.find((line) => isPropRow(line, prop))
    if (!row) return
    checked++
    const cells = row.split('|').map((cell) => cell.trim())
    const docDefault = cells[cells.length - 2] ?? ''
    if (normalizeValue(rawDefault) === normalizeValue(docCellValue(docDefault))) return
    if (WHITELIST.has(`${name}.md ${prop}`)) {
      whitelisted++
      return
    }
    valueFailures.push(
      `${name}.md 的 \`${prop}\` 默认值列写 ${JSON.stringify(docDefault)}，源码是 \`${rawDefault}\`：` +
        '默认值列应写 prop 默认值，未传时的有效初始值请写进说明列'
    )
  })
})

// ② 尾部章节顺序：口径见 demo-doc-guide.md 的「尾部章节顺序」，断言的是规范序列的子序列
let orderChecked = 0
const orderFailures: string[] = []

readdirSync(docsDir)
  .filter((file) => file.endsWith('.md'))
  .sort()
  .forEach((file) => {
    const headings = levelTwoHeadings(readFileSync(join(docsDir, file), 'utf-8').split('\n'))
    const canonical = headings.filter((heading) => ORDER.includes(heading))
    orderChecked++

    // 别名只查尾部区间：正文 demo 章节允许叫「事件」等名字
    const firstCanonicalIndex = headings.findIndex((heading) => ORDER.includes(heading))
    if (firstCanonicalIndex === -1) {
      // 通篇变体标题（`## Props` / `## 事件`）时尾部区间不存在，必须显式报错 ——
      // 否则「拦截自造标题」恰好在新写的文档上失效（无任何二级标题的空壳文件不判）
      if (headings.length > 0) {
        const aliasHints = headings
          .filter((heading) => ALIASES.has(heading))
          .map((heading) => `\`## ${heading}\` → \`## ${ALIASES.get(heading) ?? heading}\``)
        orderFailures.push(
          `${file} 未找到任何规范尾部章节（至少要有一节 \`## APIs\`）` +
            (aliasHints.length > 0 ? `；疑似变体：${aliasHints.join('、')}` : '')
        )
      }
      return
    }

    headings.slice(firstCanonicalIndex).forEach((heading) => {
      const expected = ALIASES.get(heading)
      if (expected) {
        orderFailures.push(
          `${file} 的 \`## ${heading}\` 应写作 \`## ${expected}\`（尾部标题文字固定，否则锚点与顺序断言失效）`
        )
      }
    })

    if (canonical.length < 2) return

    const ranks = canonical.map((heading) => ORDER.indexOf(heading))
    const broken = ranks.findIndex((rank, index) => index > 0 && rank < ranks[index - 1])
    if (broken === -1) return

    const expected = [...canonical].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b))
    orderFailures.push(`${file} 尾部章节顺序错误：现为 ${canonical.join(' → ')}，应为 ${expected.join(' → ')}`)
  })

// ③ 演示用例一致性：口径见 demo-doc-guide.md 的「正文 demo ↔ Show Code 契约」
// 背景（2026-11-05 全库盘点）：Show Code 长期靠手工同步，出现三类静默失效 ——
// ① 块内模板引用页面级变量（复制后直接报错）② 少写正文的用例 / 交互控件（复制后演示不完整）
// ③ 多个分节共用同一 `v-model`（操作 A 用例联动 B 用例）
// ①②为确定性断言（FAIL）；②中的「用例数量」依赖人工判断（说明型章节常把多段代码并排、
// Show Code 只覆盖其中一段），故降级为提示，不阻断。
const LAYOUT_TAGS = new Set([
  'Flex',
  'Space',
  'Row',
  'Col',
  'Divider',
  'GlobalElement',
  'ClientOnly',
  'Tag',
  'Title',
  'Text',
  'Link'
])
const HOST_OBJECTS = new Set([
  'FileReader',
  'HTMLElement',
  'HTMLDivElement',
  'HTMLInputElement',
  'VNode',
  'MessageApi',
  'NotificationApi',
  'DialogApi',
  'ModalApi',
  'LoadingBarApi',
  'ConfigProviderTheme'
])
const EXPR_GLOBALS = new Set([
  'Math',
  'Object',
  'console',
  'window',
  'document',
  'setTimeout',
  'setInterval',
  'Promise',
  'String',
  'Number',
  'Array',
  'JSON',
  'Date',
  'Boolean',
  'RegExp',
  'Map',
  'Set',
  'Intl',
  'parseInt',
  'parseFloat',
  'isNaN',
  'encodeURIComponent',
  'decodeURIComponent',
  'undefined',
  'null',
  'true',
  'false',
  'this',
  'void',
  'typeof',
  'in',
  'of',
  'new',
  'delete',
  'instanceof',
  'return',
  'if',
  'else',
  'await',
  'async',
  'function',
  'let',
  'const',
  'var',
  'class',
  'import',
  'export',
  'from',
  'as',
  'default',
  'extends',
  'keyof',
  'readonly',
  'number',
  'string',
  'boolean',
  'any',
  'unknown',
  'never',
  'object',
  'symbol',
  'bigint',
  '$event'
])

/** 去掉注释（先抹掉字符串，避免 URL 里的 `//` 被当作注释起点） */
function stripScriptComments(source: string): string {
  const noString = source
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``')
  return noString.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

/** Show Code 块内 `<script setup>` 定义的标识符 */
function scriptDefs(script: string): Set<string> {
  const names = new Set<string>()
  const source = stripScriptComments(script)
  for (const match of source.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g)) names.add(match[1])
  for (const match of source.matchAll(/\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g)) names.add(match[1])
  for (const match of source.matchAll(/import\s+(?:type\s+)?(?:([\w$]+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from/g)) {
    if (match[1]) names.add(match[1])
    if (!match[2]) continue
    for (const part of match[2].split(',')) {
      const name = part
        .trim()
        .replace(/^type\s+/, '')
        .split(/\s+as\s+/)
        .pop()
        ?.trim()
      if (name) names.add(name)
    }
  }
  return names
}

/** 模板里作为值读取的标识符（排除插槽作用域、v-for 别名、箭头函数参数） */
function templateRefs(template: string): Map<string, number> {
  const exprs: string[] = []
  for (const match of template.matchAll(/\{\{([\s\S]*?)\}\}/g)) exprs.push(match[1])
  for (const tag of template.matchAll(/<[A-Za-z][^>]*>/g)) {
    const text = tag[0]
    for (const match of text.matchAll(/\s(?::|v-bind:|@|v-on:)([\w.:-]+)\s*=\s*"([^"]*)"/g)) exprs.push(match[2])
    for (const match of text.matchAll(/\sv-(?:if|else-if|show|memo)\s*=\s*"([^"]*)"/g)) exprs.push(match[1])
    for (const match of text.matchAll(/\sv-for\s*=\s*"([^"]*)"/g)) {
      exprs.push(match[1].split(/\sin\s|\sof\s/).pop() ?? '')
    }
  }
  const scope = new Set<string>()
  for (const match of template.matchAll(/\s(?:v-slot(?::[\w-]+)?|#[\w-]+)\s*=\s*"([^"]*)"/g)) {
    for (const id of match[1].matchAll(/[A-Za-z_$][\w$]*/g)) scope.add(id[0])
  }
  for (const match of template.matchAll(/\sv-for\s*=\s*"([^"]*)"/g)) {
    for (const id of match[1].matchAll(/[A-Za-z_$][\w$]*/g)) scope.add(id[0])
  }
  for (const match of template.matchAll(/\sref\s*=\s*"([\w$]+)"/g)) scope.add(match[1])
  for (const expr of exprs) {
    for (const match of expr.matchAll(/\(([^()]*)\)\s*=>|([A-Za-z_$][\w$]*)\s*=>/g)) {
      const params = match[1] ?? match[2] ?? ''
      for (const id of params.matchAll(/[A-Za-z_$][\w$]*/g)) scope.add(id[0])
    }
  }
  const refs = new Map<string, number>()
  for (const expr of exprs) {
    const cleaned = expr
      .replace(/'(?:[^'\\]|\\.)*'/g, ' ')
      .replace(/"(?:[^"\\]|\\.)*"/g, ' ')
      .replace(/`(?:[^`\\]|\\.)*`/g, ' ')
      .replace(/\/(?![/*])(?:[^/\\\n]|\\.)+\/[gimsuy]*/g, ' ')
      .replace(/([{(,]\s*)[A-Za-z_$][\w$]*\s*:/g, '$1 ')
    for (const match of cleaned.matchAll(/(?<![\w$.'-])([A-Za-z_$][\w$]*)/g)) {
      const id = match[1]
      if (EXPR_GLOBALS.has(id) || scope.has(id) || /^[A-Z]/.test(id) || id.startsWith('$')) continue
      refs.set(id, (refs.get(id) ?? 0) + 1)
    }
  }
  return refs
}

interface DemoSection {
  name: string
  body: string
  codes: string[]
}

/** 按二级 / 三级标题切分文档：正文与 Show Code 代码块分离 */
function docSections(text: string): DemoSection[] {
  const sections: DemoSection[] = []
  for (const chunk of text.split(/\n(?=#{2,3} )/)) {
    const name = chunk.split('\n')[0]
    if (!/^#{2,3} /.test(name)) continue
    if (/^#{2,3} (?:APIs|Slots|Events|Methods|CSS 变量|在 setup 外使用|Params|Return)/.test(name)) continue
    if (/^### .*(?:Props|Type|Slots|Events|Methods)$/.test(name)) continue
    const codes = [...chunk.matchAll(/```vue\n([\s\S]*?)```/g)].map((match) => match[1])
    const body = chunk
      .replace(/```vue\n[\s\S]*?```/g, ' ')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
    sections.push({ name: name.replace(/^#{2,3} /, ''), body, codes })
  }
  return sections
}

/** 按 `<h2>` 切分演示页 */
function viewSections(text: string): DemoSection[] {
  const template = text.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
  const sections: DemoSection[] = []
  for (const chunk of template.split(/(?=<h2\b)/)) {
    const name = chunk.match(/<h2[^>]*>([^<]*)<\/h2>/)?.[1]?.trim()
    if (name) sections.push({ name, body: chunk, codes: [] })
  }
  return sections
}

function countTags(html: string): Map<string, number> {
  const counts = new Map<string, number>()
  for (const match of html.matchAll(/<([A-Z][A-Za-z0-9]*)[\s>]/g)) {
    const tag = match[1]
    if (LAYOUT_TAGS.has(tag) || HOST_OBJECTS.has(tag)) continue
    counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return counts
}

function bindingRoots(html: string): string[] {
  const roots: string[] = []
  for (const match of html.matchAll(/\bv-model(?::[\w-]+)?\s*=\s*"([^"]+)"/g)) {
    const value = match[1].trim()
    if (!/^[A-Za-z_$][\w$]*(?:\.[\w$]+)*$/.test(value)) continue
    roots.push(value.split('.')[0])
  }
  return roots
}

const selfContainedFailures: string[] = []
const bindingFailures: string[] = []
const countWarnings: string[] = []
let demoChecked = 0

readdirSync(docsDir)
  .filter((file) => file.endsWith('.md'))
  .sort()
  .forEach((file) => {
    const sections = docSections(readFileSync(join(docsDir, file), 'utf-8'))
    demoChecked++
    for (const section of sections) {
      // 自包含：模板引用的标识符必须在块内 script 定义
      section.codes.forEach((code, index) => {
        const script = code.match(/<script[^>]*\bsetup\b[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''
        const template = code.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
        if (!template) return
        const defs = scriptDefs(script)
        const missing = [...templateRefs(template).keys()].filter((id) => !defs.has(id))
        if (missing.length) {
          selfContainedFailures.push(
            `${file} §${section.name}（第 ${index + 1} 个 Show Code）模板引用了块内未定义的标识符：${missing.join(', ')}`
          )
        }
      })
      // 用例数量：正文多于 Show Code 时提示（说明型章节允许拆分，不阻断）
      if (!section.codes.length) continue
      const codeCounts = new Map<string, number>()
      for (const code of section.codes) {
        const template = code.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? code
        for (const [tag, count] of countTags(template)) {
          codeCounts.set(tag, (codeCounts.get(tag) ?? 0) + count)
        }
      }
      const diffs: string[] = []
      for (const [tag, count] of countTags(section.body)) {
        const inCode = codeCounts.get(tag) ?? 0
        if (count > inCode) diffs.push(`${tag} ${count} > ${inCode}`)
      }
      if (diffs.length) countWarnings.push(`${file} §${section.name} 正文用例多于 Show Code：${diffs.join('；')}`)
    }
    // 跨分节绑定：同一 `v-model` 根标识符不得出现在两个分节
    const owners = new Map<string, string[]>()
    for (const section of sections) {
      for (const root of bindingRoots(section.body)) owners.set(root, [...(owners.get(root) ?? []), section.name])
    }
    for (const [root, list] of owners) {
      const unique = [...new Set(list)]
      if (unique.length > 1) bindingFailures.push(`${file} 跨分节共用 v-model 绑定 \`${root}\`：${unique.join(' / ')}`)
    }
  })

const viewsDir = resolve(rootDir, 'src/views')
if (existsSync(viewsDir)) {
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) return walk(full)
      return entry === 'Index.vue' ? [full] : []
    })
  for (const file of walk(viewsDir)) {
    const sections = viewSections(readFileSync(file, 'utf-8'))
    const owners = new Map<string, string[]>()
    for (const section of sections) {
      for (const root of bindingRoots(section.body)) owners.set(root, [...(owners.get(root) ?? []), section.name])
    }
    for (const [root, list] of owners) {
      const unique = [...new Set(list)]
      if (unique.length > 1) {
        const rel = file.replace(`${rootDir}/`, '')
        bindingFailures.push(`${rel} 跨分节共用 v-model 绑定 \`${root}\`：${unique.join(' / ')}`)
      }
    }
  }
}

if (valueFailures.length > 0) {
  console.error('❌ 文档默认值与源码不一致：')
  valueFailures.forEach((failure) => console.error(`   ✗ ${failure}`))
}
if (orderFailures.length > 0) {
  console.error('❌ 文档尾部章节顺序不符合规范（APIs → Slots → Events → Methods → CSS 变量 → 在 setup 外使用）：')
  orderFailures.forEach((failure) => console.error(`   ✗ ${failure}`))
}
if (selfContainedFailures.length > 0) {
  console.error('❌ Show Code 不自包含（模板引用了块内未定义的标识符，复制后直接报错）：')
  selfContainedFailures.forEach((failure) => console.error(`   ✗ ${failure}`))
}
if (bindingFailures.length > 0) {
  console.error('❌ 跨分节共用 v-model 绑定（操作一个用例会联动其余用例）：')
  bindingFailures.forEach((failure) => console.error(`   ✗ ${failure}`))
}
if (countWarnings.length > 0) {
  console.warn('⚠️  Show Code 用例数量待人工确认（说明型章节允许只覆盖其中一段，不阻断）：')
  countWarnings.forEach((warning) => console.warn(`   ! ${warning}`))
}

const failed =
  valueFailures.length > 0 || orderFailures.length > 0 || selfContainedFailures.length > 0 || bindingFailures.length > 0
if (failed) process.exit(1)

console.log(
  `✅ 文档守护通过：${checked} 个 prop 的默认值列与源码 withDefaults 一致` +
    (whitelisted > 0 ? `（${whitelisted} 处按白名单豁免，见 scripts/verify-docs.ts）` : '') +
    `；${orderChecked} 个组件文档尾部章节顺序合规；${demoChecked} 个文档的 Show Code 自包含、跨分节绑定独立`
)
