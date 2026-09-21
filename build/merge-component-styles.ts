/**
 * 合并「同一 SFC 多个 `<style>` 块」产出的编号 CSS 文件（构建后处理，由 vite.config.ts 在 closeBundle 调用）
 *
 * 背景：`es` / `lib` 按需产物使用 cssCodeSplit + preserveModules，一个 `.vue` 文件的每个 `<style>` 块会
 * 各自产出一个 CSS 资源，Vite 对同名资源追加序号区分：`Tooltip.css`（第 1 块）+ `Tooltip2.css`（第 2 块）。
 * 而产物 JS 不 import 任何 CSS —— 样式完全由消费方 resolver 的 sideEffects 路径决定，resolver 只引用
 * `vue-amazing-ui/es/<dir>/<Component>.css`，编号文件（第二个及以后的 `<style>` 块）**永远无人引入**。
 * 表现为按需引入后组件缺失部分样式：`Tooltip` 的「面板壳 / 箭头 / 动画」（恰好是必须走全局块、
 * 无法写进 scoped 的那部分）在按需引入下完全丢失。
 *
 * 当前仅 `Tooltip.vue` 有两个块（scoped 皮肤 + 全局面板壳）。该机制为通用兜底：后续任何组件新增第二个
 * `<style>` 块都会自动被合回主文件，无需再改 resolver。
 *
 * 处理：把编号块按序号升序追加进同目录的主文件后删除，确立「一个组件一个 CSS 文件」的产物契约。
 * 序号升序 = 与源码中 `<style>` 块的先后顺序一致，故层叠优先级与开发态（Vite dev 按源码顺序注入）相同。
 */
import { appendFileSync, existsSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { basename, dirname, relative, resolve } from 'node:path'

export interface MergeComponentStylesOptions {
  /** 仓库根目录 */
  rootDir: string
  /** 需要处理的产物目录名（相对 rootDir），默认 es 与 lib */
  outDirs?: string[]
  /** 日志输出，默认 console */
  logger?: Pick<Console, 'log' | 'warn'>
}

/** 匹配 Vite 为同名 CSS 资源追加的序号：`Tooltip2.css` → 主文件 `Tooltip.css` + 序号 2 */
const NUMBERED_CSS = /^(.*?)(\d+)\.css$/

/** 递归收集目录下所有 `.css` 文件（组件目录可能带层级，如 `es/grid/row/Row.css`） */
function collectCssFiles(directory: string, result: string[] = []): string[] {
  if (!existsSync(directory)) {
    return result
  }
  readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(directory, entry.name)
    if (entry.isDirectory()) {
      collectCssFiles(fullPath, result)
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      result.push(fullPath)
    }
  })
  return result
}

/**
 * 执行合并，返回被合并的主文件绝对路径列表（便于构建日志与断言）
 *
 * 幂等：合并后编号文件已删除，重复调用不再命中；第三方 vendor 样式（如 `effect-cards.css`）不含
 * 「纯数字序号」后缀，不会被误判（见 vendor-styles.ts 的命名约定）
 */
export function mergeComponentStyles(options: MergeComponentStylesOptions): string[] {
  const { rootDir, outDirs = ['es', 'lib'], logger = console } = options
  const mergedFiles: string[] = []
  outDirs.forEach((outDir) => {
    // 主文件路径 → 待追加的编号块（带序号，用于还原源码块顺序）
    const grouped = new Map<string, { index: number; path: string }[]>()
    collectCssFiles(resolve(rootDir, outDir)).forEach((cssPath) => {
      const matched = NUMBERED_CSS.exec(basename(cssPath))
      if (!matched) {
        return
      }
      const basePath = resolve(dirname(cssPath), `${matched[1]}.css`)
      const blocks = grouped.get(basePath) ?? []
      blocks.push({ index: Number(matched[2]), path: cssPath })
      grouped.set(basePath, blocks)
    })
    grouped.forEach((blocks, basePath) => {
      if (!existsSync(basePath)) {
        // 异常产物：保留编号文件而非删除，避免样式内容直接丢失
        logger.warn(`[merge-component-styles] 缺少主文件，跳过合并：${relative(rootDir, basePath)}`)
        return
      }
      const content = blocks
        .sort((prev, next) => prev.index - next.index)
        .map((block) => readFileSync(block.path, 'utf-8'))
        .join('\n')
      appendFileSync(basePath, `\n${content}`)
      blocks.forEach((block) => rmSync(block.path))
      mergedFiles.push(basePath)
      logger.log(`[merge-component-styles] ${relative(rootDir, basePath)} ← 合并 ${blocks.length} 个编号样式块`)
    })
  })
  return mergedFiles
}
