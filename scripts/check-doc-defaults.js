#!/usr/bin/env node
/**
 * 文档 Props「默认值」列与源码 `withDefaults` 的一致性守护（`pnpm verify:docs`）
 *
 * 为什么需要脚本：这类失真只能靠「逐字段与源码比对」发现，人工抽查必然漏 ——
 * 已发现的每一处（如 `avatar.color` / `waterfall.backgroundColor` / `time-picker.*Step` / `textarea.value`）
 * 都是这么漏掉的，且每一处都让使用方按错误默认值写代码。
 *
 * **口径**：默认值列写 **prop 默认值**，不是未传时的**有效初始值**（有效值写进说明列）。
 * 依据见 `development/demo-doc-guide.md` 的「默认值列」条目；`Tabs.activeKey` 是典型例子 ——
 * 有效值是首项，文档仍写 `undefined`。
 *
 * 判定：两侧都归一到「值文本」再比对 ——
 * - 源码 `() => []` / `() => ({})` / `() => ['hover']` ↔ 文档 `[]` / `{}` / `'hover'`；
 * - 源码带类型断言（`as CubicBezierPoints`）时去掉断言；
 * - 文档侧的 Markdown 转义（`\_` `\:` `\{`）、`<br/>`、`&nbsp;`、反引号、`**` 一律剥掉；
 * - 引号与空白不参与比较；
 * - 默认值列允许「值 + 括号补充说明」（如 `undefined（ring-circle 取 12）`），只比对值本身。
 *
 * 无法静态求值的少数行（默认值由同文件常量表达等）登记在 `WHITELIST`，每项须写明理由。
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseModelDefaults } from './check-model-props.js'
import { stripComments } from './component-vars-check.js'

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
function pascalCase(name) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/** 取走包裹括号：`({ a: 1 })` → `{ a: 1 }` */
function unwrapParens(value) {
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
function normalizeValue(raw) {
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
function docCellValue(cell) {
  const withoutNote = cell.split(/[（，]/)[0] ?? ''
  return withoutNote.replace(/^\s*默认\s*/, '')
}

/** 首列是否就是该 prop（允许反引号与 `<Tag>` 修饰） */
function isPropRow(line, prop) {
  if (!line.trim().startsWith('|')) return false
  const first = (line.split('|')[1] ?? '').replace(/`/g, '').trim()
  return new RegExp(`^${prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$|<)`).test(first)
}

const failures = []
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
    failures.push(`${name}.md 对应的 ${name}/${pascalCase(name)}.vue 的 withDefaults 无法解析，默认值列无法校验`)
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
    failures.push(
      `${name}.md 的 \`${prop}\` 默认值列写 ${JSON.stringify(docDefault)}，源码是 \`${rawDefault}\`：` +
        '默认值列应写 prop 默认值，未传时的有效初始值请写进说明列'
    )
  })
})

if (failures.length > 0) {
  console.error('❌ 文档默认值与源码不一致：')
  failures.forEach((failure) => console.error(`   ✗ ${failure}`))
  process.exit(1)
}
console.log(
  `✅ 文档默认值守护通过：${checked} 个 prop 的默认值列与源码 withDefaults 一致` +
    (whitelisted > 0 ? `（${whitelisted} 处按白名单豁免，见 scripts/check-doc-defaults.js）` : '')
)
