/**
 * 生成「每组件一个样式入口」`es|lib/<dir>/style/index.{js,cjs}`（构建后处理，由 vite.config.ts 在 closeBundle 调用）
 *
 * 背景：`es` / `lib` 按需产物中，产物 JS 不 import 任何 CSS，组件样式完全由消费方 resolver 的
 * `sideEffects` 路径决定。旧实现把「组件 → 样式依赖」这份知识放在 resolver 运行时（三张表 + 拼多条 CSS
 * 路径），依赖表写错只会在消费方构建时表现为「静默缺样式」。本生成器把这份知识下沉到产物：
 *
 *   es/tooltip/style/index.js  →  import '../../style/global.css'
 *                                  import '../Tooltip.css'
 *                                  import '../../popup/Popup.css'
 *
 * 入口内部按「层叠顺序」逐条引用 CSS，resolver 只需返回这一条入口路径，不再维护依赖表。
 *
 * 顺序（必须与旧 `getSideEffects()` 的 push 顺序逐项一致，见 STYLE-ENTRY-PLAN 的 §7.4 等价性快照法）：
 *   global → 自身（或 styleSources 指向的来源组件）→ 依赖（componentDependencies 表顺序，去重保留首次出现）→ vendor
 *
 * 两类硬失败（构建期直接 throw，把「静默缺样式」变成「构建失败」）：
 *   1. 目标 CSS 不存在 —— 表里写错组件名、或该 SFC 漏了 <style> 块；
 *   2. 组件目录下同名前缀 CSS 不止 1 份（如残留 `Tooltip2.css`）—— 说明 mergeComponentStyles 未生效。
 */

import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'
import { componentsMap, styleSources, componentDependencies, stylelessComponents } from '../components/utils/style-deps'
import type { ComponentName } from '../components/utils/style-deps'
import { vendorStylesByComponent } from '../components/utils/vendor-styles'

export interface StyleEntryOutDir {
  /** 产物目录名（相对 rootDir），如 'es' / 'lib' */
  dir: string
  /** 模块格式，决定文件扩展名与语句形式 */
  format: 'esm' | 'cjs'
}

export interface GenerateStyleEntriesOptions {
  rootDir: string
  /** 默认 [{ dir: 'es', format: 'esm' }, { dir: 'lib', format: 'cjs' }] */
  outDirs?: StyleEntryOutDir[]
  /** 日志输出，默认 console；传 null 可静默 */
  logger?: Pick<Console, 'log' | 'warn'> | null
}

/** 组件库全局默认样式，相对各产物根目录 */
const GLOBAL_CSS = 'style/global.css'
const DEFAULT_OUT_DIRS: StyleEntryOutDir[] = [
  { dir: 'es', format: 'esm' },
  { dir: 'lib', format: 'cjs' }
]

/** 组件自身（或样式来源组件）的 CSS 相对路径，如 `tooltip/Tooltip.css` */
function cssOf(componentName: ComponentName): string {
  return `${componentsMap[componentName]}/${componentName}.css`
}

/** 统一为正斜杠：入口文件的 import 路径需在任意平台下一致 */
function toPosix(filePath: string): string {
  return filePath.split(sep).join('/')
}

/** import / require 的相对路径必须以 `./` 或 `../` 开头，否则会被当作裸模块名 */
function toModuleSpecifier(filePath: string): string {
  return filePath.startsWith('.') ? filePath : `./${filePath}`
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** 目录下「与组件同名前缀」的 CSS（`Tooltip.css` / `Tooltip2.css`），用于编号残留断言 */
function numberedCssNames(componentDir: string, componentName: string): string[] {
  if (!existsSync(componentDir)) {
    return []
  }
  const pattern = new RegExp(`^${escapeRegExp(componentName)}\\d*\\.css$`)
  return readdirSync(componentDir).filter((name) => pattern.test(name))
}

/**
 * 计算「产物目录 → 入口内容」的映射
 *
 * - 按 `componentsMap[source]` 去重：组件与其 Provider 共用同一目录时只产出**一个**入口
 *   （如 `Message` / `MessageProvider` 共用 `es/message/style/index.js`），目标 CSS 取并集；
 * - 跳过 `stylelessComponents`（无 `<style>` 块且不复用他人样式）；
 * - 目标 CSS 列表保持「global → 自身 → 依赖（表顺序）→ vendor」并去重保留首次出现。
 */
function collectEntryTargets(): Map<string, { componentName: ComponentName; cssFiles: string[] }> {
  const entries = new Map<string, { componentName: ComponentName; cssFiles: string[] }>()
  ;(Object.keys(componentsMap) as ComponentName[]).forEach((componentName) => {
    if (stylelessComponents.includes(componentName)) {
      return
    }
    const source = styleSources[componentName] ?? componentName
    const dirPath = componentsMap[source]
    const dependencies = componentDependencies[componentName] ?? []
    const vendorTargets = vendorStylesByComponent[componentName] ?? []
    const targetCss = [GLOBAL_CSS, cssOf(source), ...dependencies.map(cssOf), ...vendorTargets]
    const existing = entries.get(dirPath)
    // 共用同一目录的多个组件（如 Message / MessageProvider）合并到同一入口；去重统一用 Set，保留首次出现顺序
    const cssFiles = existing ? [...new Set([...existing.cssFiles, ...targetCss])] : [...new Set(targetCss)]
    entries.set(dirPath, { componentName: existing?.componentName ?? source, cssFiles })
  })
  return entries
}

/** 生成每组件样式入口，返回生成的文件绝对路径列表；任何断言失败直接 throw（使构建失败） */
export function generateStyleEntries(options: GenerateStyleEntriesOptions): string[] {
  const { rootDir, outDirs = DEFAULT_OUT_DIRS, logger = console } = options
  const entries = collectEntryTargets()
  const generatedFiles: string[] = []

  outDirs.forEach(({ dir, format }) => {
    const outDir = resolve(rootDir, dir)
    entries.forEach(({ componentName, cssFiles }, dirPath) => {
      // ① 存在性断言：目标 CSS 缺失 → 构建失败（表写错 / SFC 漏 <style> 块）
      const missing = cssFiles.filter((css) => !existsSync(resolve(outDir, css)))
      if (missing.length > 0) {
        throw new Error(
          `[generate-style-entry] ${componentName} 缺少样式文件：\n${missing.map((css) => `  ${dir}/${css}`).join('\n')}\n` +
            '（请检查 components/utils/style-deps.ts 的 componentsMap / styleSources / componentDependencies，' +
            '或该 SFC 是否漏了 <style> 块）'
        )
      }
      // ② 编号残留断言：同名前缀 CSS 必须恰好 1 份（多份 = 合并插件未生效，会静默少样式）
      const matched = numberedCssNames(resolve(outDir, dirPath), componentName)
      if (matched.length !== 1) {
        throw new Error(
          `[generate-style-entry] ${componentName} 的样式文件数量异常（期望恰好 1 个，实际 ${matched.length} 个）：` +
            `${matched.join('、') || '无'}\n（请确认 build/merge-component-styles.ts 的编号 CSS 合并已执行）`
        )
      }

      const entryFileName = format === 'esm' ? 'index.js' : 'index.cjs'
      const entryFile = resolve(outDir, dirPath, 'style', entryFileName)
      const dtsFile = resolve(outDir, dirPath, 'style', 'index.d.ts')
      // 相对路径一律由 path.relative 计算，禁止手数 `../`（复合组件存在 grid/row 这类嵌套目录）
      const lines = cssFiles.map((css) => {
        const specifier = toModuleSpecifier(toPosix(relative(dirname(entryFile), resolve(outDir, css))))
        return format === 'esm' ? `import '${specifier}'` : `require('${specifier}')`
      })
      mkdirSync(dirname(entryFile), { recursive: true })
      writeFileSync(entryFile, `${lines.join('\n')}\n`, 'utf-8')
      writeFileSync(dtsFile, 'export {}\n', 'utf-8')
      generatedFiles.push(entryFile, dtsFile)
    })
    logger?.log(`[generate-style-entries] ${dir} 生成 ${entries.size} 个组件样式入口`)
  })
  return generatedFiles
}
