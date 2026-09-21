#!/usr/bin/env node
/**
 * 发布前守卫（由 package.json 的 `prepublishOnly` 触发，仅在 `npm publish` 时执行）
 *
 * 背景：`npm publish` 自身不会触发构建，而 `files` 是 glob 语义——产物目录缺失时 npm
 * 不会报错，只会打出一个 `main` / `module` / `types` 全部悬空的包。若绕开 `pnpm pub`
 * （scripts/publish.sh）直接发布，还可能把上一版遗留产物按新版本号发出去。
 *
 * 因此这里只做**毫秒级的存在性校验**（不跑构建、不校验内容与新鲜度）：
 * 1. `package.json` 声明的产物入口是否真实存在；
 * 2. 「每组件一个样式入口」的产物契约：
 *    - `es/` 与 `lib/` 下不存在编号 CSS（`*<数字>.css` → 构建期合并插件未生效，会静默少样式）；
 *    - 每个非无样式组件都有 `es/<dir>/style/index.js`、`lib/<dir>/style/index.cjs` 与两份 `index.d.ts`；
 *    - 每个入口文件中 `import` / `require` 的相对路径都能解析到真实文件；
 *    - `package.json` 的 `sideEffects` 覆盖全部样式产物（CSS 与样式入口 JS/CJS）。
 *
 * 「按需引入后样式是否真的齐全」由 `pnpm verify:on-demand` 负责（需跑构建），两者互补。
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readStyleDeps } from './parse-style-deps.js'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** 从 package.json 收集所有指向产物的具体路径（exports 中的通配项如 "./*" 不是具体文件，跳过） */
function collectEntryPaths(pkg) {
  const paths = new Set()
  const addPath = (value) => {
    if (typeof value !== 'string') return
    const normalized = value.replace(/^\.\//, '')
    if (normalized.includes('*')) return
    paths.add(normalized)
  }
  const walkExports = (node) => {
    if (typeof node === 'string') {
      addPath(node)
      return
    }
    if (node && typeof node === 'object') {
      Object.values(node).forEach(walkExports)
    }
  }
  const entryFields = [pkg.main, pkg.module, pkg.types, pkg.unpkg, pkg.jsdelivr]
  entryFields.forEach(addPath)
  walkExports(pkg.exports)
  return [...paths]
}

/** 递归收集编号 CSS（`Xxx2.css` 这类构建期合并前的残留） */
function findNumberedCss(dir, result = []) {
  if (!existsSync(dir)) {
    return result
  }
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      findNumberedCss(fullPath, result)
    } else if (/\d\.css$/.test(entry.name)) {
      result.push(fullPath)
    }
  })
  return result
}

const failures = []
const pkg = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))
const entryPaths = collectEntryPaths(pkg)
const missing = entryPaths.filter((entryPath) => !existsSync(resolve(rootDir, entryPath)))
if (missing.length > 0) {
  failures.push(
    `package.json 声明的产物入口不存在：\n${missing
      .map((entryPath) => `      ✗ ${entryPath}`)
      .join('\n')}\n      请先执行 \`pnpm build\`，或改用 \`pnpm pub\` 走完整发布流程`
  )
}

// 以下为「每组件样式入口」的产物契约（D 方案）
const { componentsMap, styleSources, stylelessComponents } = readStyleDeps()
const styleless = new Set(stylelessComponents)
const outDirs = [
  { dir: 'es', entryFileName: 'index.js' },
  { dir: 'lib', entryFileName: 'index.cjs' }
]

// 唯一样式入口目录：Provider / 子组件与其样式来源组件共用一个入口（如 Message 与 MessageProvider）
const entryDirs = new Set()
Object.keys(componentsMap).forEach((componentName) => {
  if (styleless.has(componentName)) {
    return
  }
  entryDirs.add(componentsMap[styleSources[componentName] ?? componentName])
})

// ① 编号 CSS 已归零
outDirs.forEach(({ dir }) => {
  findNumberedCss(resolve(rootDir, dir)).forEach((file) => {
    failures.push(`存在编号 CSS（构建期样式合并未生效，按需引入会少样式）：${relative(rootDir, file)}`)
  })
})

// ② 入口存在性 + ③ 入口内引用的相对路径可解析
entryDirs.forEach((dirPath) => {
  outDirs.forEach(({ dir, entryFileName }) => {
    const entryPath = resolve(rootDir, dir, dirPath, 'style', entryFileName)
    const dtsPath = resolve(rootDir, dir, dirPath, 'style', 'index.d.ts')
    if (!existsSync(entryPath)) {
      failures.push(`缺少样式入口：${relative(rootDir, entryPath)}`)
      return
    }
    if (!existsSync(dtsPath)) {
      failures.push(`缺少样式入口类型声明：${relative(rootDir, dtsPath)}`)
    }
    readFileSync(entryPath, 'utf-8')
      .split('\n')
      .forEach((line) => {
        const matched = line.match(/'([^']+)'/)
        if (!matched) return
        if (!existsSync(resolve(dirname(entryPath), matched[1]))) {
          failures.push(`样式入口引用的文件不存在：${relative(rootDir, entryPath)} -> ${matched[1]}`)
        }
      })
  })
})

/**
 * ④ package.json 的 sideEffects 必须覆盖全部样式产物
 *
 * webpack 生产模式默认开启 `optimization.sideEffects`：未命中 `sideEffects` 模式的文件会被判定为
 * 「无副作用」，连带 `import 'vue-amazing-ui/es/button/style'`（纯副作用导入，无绑定）一起被 tree-shaking
 * 丢弃 → 消费方静默少样式。实测（webpack 5.111 + `experiments.css`）：
 *   - `es/<dir>/<Comp>.css`（命中 `*.css`）→ 保留；
 *   - `es/<dir>/style/index.js`（`.js`，未命中任何模式）→ **被丢弃**，其 CSS 一并消失；
 *   - 补上 `**\/style\/*` 后 → 保留。
 * 该失败模式 Vite 侧不可见（`pnpm verify:on-demand` 检测不到），因此在发布前守卫中兜住。
 */

/** 已按 webpack 实测结果自检的用例：匹配语义若被改坏，这里会直接抛错 */
const SIDE_EFFECT_MATCH_CASES = [
  { filePath: 'es/tag/Tag.css', pattern: '*.css', matched: true },
  { filePath: 'es/tag/style/index.js', pattern: '*.css', matched: false },
  { filePath: 'es/tag/style/index.js', pattern: '**/style/*', matched: true },
  { filePath: 'es/grid/row/style/index.js', pattern: '**/style/*', matched: true },
  { filePath: 'lib/tag/style/index.cjs', pattern: '**/style/*', matched: true }
]

/**
 * 复刻 webpack `SideEffectsFlagPlugin` 的 glob 语义（`lib/util/globUtils` + `globTo-regexp`）：
 * 1. 不含 `/` 的模式自动补 `**\/` 前缀（故 `"*.css"` 能匹配 `es/tag/Tag.css`）；
 * 2. `**` 跨目录段（可为零段），`*` 只在单个目录段内匹配；整串锚定，允许可选 `./` 前缀。
 */
function sideEffectsPatternToRegExp(pattern) {
  const expanded = pattern.includes('/') ? pattern : `**/${pattern}`
  const segments = expanded.split('/')
  let source = ''
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1
    if (segment === '**') {
      if (isLast) {
        // `dist/**` → 匹配 dist 下的任意层级文件
        source = `${source.replace(/\/$/, '')}(?:/[^/]*)*`
      } else {
        source += '(?:[^/]+/)*'
      }
      return
    }
    source += segment.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*')
    if (!isLast) {
      source += '/'
    }
  })
  return new RegExp(`^(?:\\./)?${source}$`)
}

function matchesSideEffects(filePath, pattern) {
  return sideEffectsPatternToRegExp(pattern).test(filePath)
}

SIDE_EFFECT_MATCH_CASES.forEach(({ filePath, pattern, matched }) => {
  if (matchesSideEffects(filePath, pattern) !== matched) {
    throw new Error(`[prepublish-guard] sideEffects 匹配语义自检失败：${pattern} vs ${filePath}（期望 ${matched}）`)
  }
})

/** 收集所有「必须被 sideEffects 覆盖」的样式产物：CSS 文件 + 样式入口 JS/CJS */
function collectStyleArtifacts(dir, result = []) {
  if (!existsSync(dir)) {
    return result
  }
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      collectStyleArtifacts(fullPath, result)
      return
    }
    const filePath = relative(rootDir, fullPath).split('\\').join('/')
    if (filePath.endsWith('.css') || /(^|\/)style\/index\.(js|cjs)$/.test(filePath)) {
      result.push(filePath)
    }
  })
  return result
}

const sideEffectPatterns = pkg.sideEffects ?? []
const uncoveredStyles = ['es', 'lib', 'dist']
  .flatMap((dir) => collectStyleArtifacts(resolve(rootDir, dir)))
  .filter((filePath) => !sideEffectPatterns.some((pattern) => matchesSideEffects(filePath, pattern)))

if (uncoveredStyles.length > 0) {
  const sample = uncoveredStyles.slice(0, 5).join('\n      ✗ ')
  failures.push(
    `以下样式产物未被 package.json 的 sideEffects 覆盖（webpack 生产模式会将其 tree-shaking 掉，导致样式静默丢失）：\n      ✗ ${sample}` +
      (uncoveredStyles.length > 5 ? `\n      …… 共 ${uncoveredStyles.length} 个` : '')
  )
}

if (failures.length > 0) {
  console.error('❌ 发布守卫未通过：')
  failures.forEach((failure) => console.error(`   ✗ ${failure}`))
  process.exit(1)
}

console.log(
  `✅ 发布守卫通过：${entryPaths.length} 个产物入口、${entryDirs.size} × ${outDirs.length} 个组件样式入口均就绪`
)
