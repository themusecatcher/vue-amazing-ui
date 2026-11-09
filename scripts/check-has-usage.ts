/**
 * `:has()` 使用契约判定（判定模块：只返回 problem 列表，不自执行、不退出进程）
 *
 * `:has()` 是库内唯一一个「不支持时静默失效、且会让整条规则被丢弃」的样式特性，
 * 一旦扩散或写法退化，只会在低版本引擎上表现为布局错乱，本地与 CI 都看不见。
 * 条文见 `development/component-design.md` 的「高版本 CSS 特性」，权威层为
 * `tests/has-usage-contract.spec.ts`（该测试同时锁定本模块的检出能力）。
 * 四条规则（失败即产出 problem）：
 * 1. 位置白名单：当前仅 `timeline/timeline-item/TimelineItem.vue`，新增须先改规范再改白名单；
 * 2. 参数必须限定直接子项（`:has(> .a.b)`）：后代参数会把嵌套在内容里的同类组件算进来，
 *    Timeline 曾因此把内层 label 误判为外层分栏（外层轴点被拉到 50%）；通配 `:has(*)` 同属违规；
 * 3. 不得与其他选择器共用逗号列表：不支持该伪类的引擎会丢弃整条规则，普通选择器被连带失效，
 *    Timeline 曾因此让 alternate 模式的自定义节点不居中；
 * 4. 同一文件必须存在 `:not(:has(...))` 兜底分支：增强分支之外要有「不支持时仍正确」的基础形态。
 *    注意强度上限：这是**文件级**存在性判断，只能拦住「整个文件忘写兜底」，
 *    不保证每条正向分支各有对应兜底。
 *
 * 扫描前统一剥离注释：注释里提到 `:has()` 是在说明原因，不应被当作使用。
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** 默认扫描根：仓库的 `components/` */
export const DEFAULT_COMPONENTS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'components')
/** 允许出现 `:has()` 的文件（相对 `components/`，posix 风格） */
export const DEFAULT_WHITELIST = ['timeline/timeline-item/TimelineItem.vue']

const STYLE_SUFFIXES = ['.less', '.css']

export interface CheckHasUsageOptions {
  /** 扫描根目录，默认仓库的 `components/`；测试可指向临时 fixture 工程 */
  componentsDir?: string
  /** 白名单（相对 `componentsDir`，posix 风格），默认 `DEFAULT_WHITELIST` */
  whitelist?: readonly string[]
}

export interface CheckHasUsageResult {
  /** 违约项，空数组表示通过 */
  problems: string[]
  /** 扫描到的 `:has(` 出现次数，用于确认扫描真的命中了目标文件而非空转 */
  usageCount: number
  /** 本次生效的白名单 */
  whitelist: readonly string[]
}

/**
 * 剥离块注释与 `//` 行注释（Less 行注释在样式块里很常见）
 *
 * `//` 既可能是整行注释也可能是行尾注释（`.a { color: red; } // 说明`）。
 * 只匹配 `行首 / 空白 / ; / { / }` 之后的 `//`，避免误伤 `https://`（前面是 `:`）
 * 与 `url(//cdn)`（前面是 `(`）。
 */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[\s;{}])\/\/.*$/gm, '$1')
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
function checkSelector(problems: string[], file: string, selector: string): void {
  const compact = selector.replace(/\s+/g, ' ')
  if (!compact.includes(':has(')) {
    return
  }
  if (splitSelectorList(compact).length > 1) {
    problems.push(`${file}：:has() 不得与其他选择器共用逗号列表（整条规则会被低版本引擎丢弃）→ ${compact}`)
  }
  for (const matched of compact.matchAll(/:has\(/g)) {
    const argument = compact.slice((matched.index ?? 0) + matched[0].length).trimStart()
    if (!argument.startsWith('>')) {
      problems.push(`${file}：:has() 参数必须限定直接子项（写成 :has(> .a.b)，通配 :has(*) 亦不允许）→ ${compact}`)
    }
  }
}

/** 递归收集组件目录下的样式文件（`.vue` / `.less` / `.css`） */
function collectStyleFiles(componentsDir: string): string[] {
  return (readdirSync(componentsDir, { recursive: true }) as string[])
    .filter((entry) => entry.endsWith('.vue') || STYLE_SUFFIXES.some((suffix) => entry.endsWith(suffix)))
    .map((entry) => entry.split('\\').join('/'))
    .sort()
}

/** 按契约扫描样式文件，返回违约项 */
export function checkHasUsage(options: CheckHasUsageOptions = {}): CheckHasUsageResult {
  const componentsDir = options.componentsDir ?? DEFAULT_COMPONENTS_DIR
  const whitelist = options.whitelist ?? DEFAULT_WHITELIST
  const whitelistSet = new Set(whitelist)
  const whitelistText = whitelist.length > 0 ? whitelist.join('、') : '无'
  const problems: string[] = []
  let usageCount = 0
  for (const relativePath of collectStyleFiles(componentsDir)) {
    const blocks = readStyleBlocks(resolve(componentsDir, relativePath))
    for (const block of blocks) {
      const css = stripComments(block)
      if (!css.includes(':has(')) {
        continue
      }
      usageCount += css.split(':has(').length - 1
      if (!whitelistSet.has(relativePath)) {
        problems.push(`${relativePath}：:has() 仅允许出现在白名单文件（当前 ${whitelistText}）`)
      }
      collectSelectors(css).forEach((selector) => checkSelector(problems, relativePath, selector))
      if (!/:not\(\s*:has\(/.test(css)) {
        problems.push(`${relativePath}：使用 :has() 的文件必须提供 :not(:has(...)) 兜底分支`)
      }
    }
  }
  return { problems, usageCount, whitelist }
}
