#!/usr/bin/env node
/**
 * `:has()` 使用契约守护
 *
 * `:has()` 是库内唯一一个「不支持时静默失效、且会让整条规则被丢弃」的样式特性，
 * 一旦扩散或写法退化，只会在低版本引擎上表现为布局错乱，本地与 CI 都看不见。
 * 强制项（失败即退出非 0），条文见 `development/component-design.md` 的「高版本 CSS 特性」：
 * 1. 位置白名单：当前仅 `timeline/timeline-item/TimelineItem.vue`，新增须先改规范再改白名单；
 * 2. 参数必须限定直接子项（`:has(> .a.b)`）：后代参数会把嵌套在内容里的同类组件算进来，
 *    Timeline 曾因此把内层 label 误判为外层分栏（外层轴点被拉到 50%）；
 * 3. 不得与其他选择器共用逗号列表：不支持该伪类的引擎会丢弃整条规则，普通选择器被连带失效，
 *    Timeline 曾因此让 alternate 模式的自定义节点不居中；
 * 4. 禁止 `:has(*)`：通配参数会让失效计算扩散到整棵子树，改为具体类名；
 * 5. 同一文件必须存在 `:not(:has(...))` 兜底分支：增强分支之外要有「不支持时仍正确」的基础形态。
 *
 * 扫描前统一剥离注释：注释里提到 `:has()` 是在说明原因，不应被当作使用。
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = resolve(rootDir, 'components')
/** 允许出现 `:has()` 的文件（相对 `components/`，posix 风格） */
const WHITELIST = new Set(['timeline/timeline-item/TimelineItem.vue'])
const STYLE_SUFFIXES = ['.less', '.css']
const failures: string[] = []

/** 剥离块注释与 `//` 行注释（Less 行注释在样式块里很常见） */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
}

/** 读取样式文本：`.vue` 取全部 `<style>` 块，`.less` / `.css` 整体即样式 */
function readStyleBlocks(file: string): string[] {
  const source = readFileSync(file, 'utf8')
  if (!file.endsWith('.vue')) {
    return [source]
  }
  return [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((matched) => matched[1])
}

/** 按顶层逗号切分选择器列表：括号 / 方括号内的逗号不参与切分 */
function splitSelectorList(selector: string): string[] {
  const parts: string[] = []
  let current = ''
  let depth = 0
  for (const char of selector) {
    if (char === '(' || char === '[') {
      depth += 1
    } else if (char === ')' || char === ']') {
      depth -= 1
    }
    if (char === ',' && depth === 0) {
      parts.push(current)
      current = ''
      continue
    }
    current += char
  }
  parts.push(current)
  return parts.filter((part) => part.trim().length > 0)
}

/** 收集规则的选择器文本：按 `{` / `}` / `;` 断句，声明段不会进入结果 */
function collectSelectors(css: string): string[] {
  const selectors: string[] = []
  let buffer = ''
  for (const char of css) {
    if (char === '{') {
      const selector = buffer.trim()
      if (selector.length > 0) {
        selectors.push(selector)
      }
      buffer = ''
      continue
    }
    if (char === '}' || char === ';') {
      buffer = ''
      continue
    }
    buffer += char
  }
  return selectors
}

/** 校验单条选择器；`file` 仅用于报错定位 */
function checkSelector(file: string, selector: string): void {
  const compact = selector.replace(/\s+/g, ' ')
  if (!compact.includes(':has(')) {
    return
  }
  if (splitSelectorList(compact).length > 1) {
    failures.push(`${file}：:has() 不得与其他选择器共用逗号列表（整条规则会被低版本引擎丢弃）→ ${compact}`)
  }
  for (const matched of compact.matchAll(/:has\(/g)) {
    const argument = compact.slice((matched.index ?? 0) + matched[0].length).trimStart()
    if (argument.startsWith('*')) {
      failures.push(`${file}：禁止 :has(*)，请改用具体类名 → ${compact}`)
    } else if (!argument.startsWith('>')) {
      failures.push(`${file}：:has() 参数必须限定直接子项，写成 :has(> .a.b) → ${compact}`)
    }
  }
}

/** 递归收集组件目录下的样式文件（`.vue` / `.less` / `.css`） */
function collectStyleFiles(): string[] {
  return (readdirSync(componentsDir, { recursive: true }) as string[])
    .filter((entry) => entry.endsWith('.vue') || STYLE_SUFFIXES.some((suffix) => entry.endsWith(suffix)))
    .map((entry) => entry.split('\\').join('/'))
    .sort()
}

let usageCount = 0
for (const relativePath of collectStyleFiles()) {
  const blocks = readStyleBlocks(resolve(componentsDir, relativePath))
  blocks.forEach((block) => {
    const css = stripComments(block)
    if (!css.includes(':has(')) {
      return
    }
    usageCount += css.split(':has(').length - 1
    if (!WHITELIST.has(relativePath)) {
      failures.push(`${relativePath}：:has() 仅允许出现在白名单文件（当前 ${[...WHITELIST].join('、')}）`)
    }
    collectSelectors(css).forEach((selector) => checkSelector(relativePath, selector))
    if (!/:not\(\s*:has\(/.test(css)) {
      failures.push(`${relativePath}：使用 :has() 的文件必须提供 :not(:has(...)) 兜底分支`)
    }
  })
}

if (failures.length > 0) {
  console.error('❌ :has() 使用契约守护未通过：')
  failures.forEach((failure) => console.error(`   ✗ ${failure}`))
  process.exit(1)
}
console.log(`✅ :has() 使用契约守护通过：${usageCount} 处，全部限定在 ${[...WHITELIST].join('、')}`)
