#!/usr/bin/env node
/**
 * 产物级一致性校验（D-12）：样式依赖闭包 + 聚合入口导出
 *
 * ## 一、样式依赖表 ↔ 产物 chunk 依赖图 的闭包一致性
 *
 * 背景：`componentDependencies` 漏写某个「实际用到的依赖组件」时，依赖组件自身的 CSS 依然存在于产物里，
 * 因此「文件存在性断言」（生成器 / 发布守卫）抓不到 —— 只有消费方视觉上才会发现样式缺失。
 * 反向也一样：组件改造后不再依赖某组件、但表里的条目没删（stale），同样不会报错。
 * 历史同类问题：`Upload` 移除内嵌 `Message` 后，样式依赖未同步移除。
 *
 * 做法：产物 chunk（`es/<dir>/<Comp>.vue2.js`）之间的 `from "../<other>/index.js"` 是**编译期事实**，
 * 可机读。以它为边求传递闭包，与手写表做**双向断言**：
 *   - closure ⊆ table → 抓「漏写依赖」；
 *   - table ⊆ closure → 抓「写了但已不再依赖」（stale）。
 *
 * ⚠️ 边界（不改变 D1 的分工）：
 *   - 只校验**依赖集合的完整性**；**顺序与层叠仍由手写表 `componentDependencies` 决定**（生成器按表顺序写入口）；
 *   - 无法从 chunk 图推导的合法依赖（异步 `import()`、条件渲染、跨包耦合）用下方 EXEMPTIONS 显式登记，
 *     每条必须写明原因
 *   - 需要已构建的 `es/` + `lib/` 产物 → 本脚本挂在 `pnpm verify` 链（`verify:deps`），不进 `pnpm check`。
 *
 * ## 二、聚合入口导出一致性
 *
 * 与样式无关，但同属「需产物、写错即静默失败」的一类：
 * `<dir>/index.d.ts` 声明的值导出必须与产物模块的运行时导出**双向**一致。纯转发的具名导出
 * （`export { useX } from './useX'`）会被 Rollup 转发优化剔除 —— 入口自身另有本地绑定（如
 * `export default withInstall(X)`）时模块仍存在、`index.js` 也会生成，只是该具名导出不在其中，
 * 而 `index.d.ts` 仍照常声明，消费方走深路径 `vue-amazing-ui/es|lib/<dir>` 时取到 `undefined`。
 * 该类错位对 `pnpm build`、type-check、单测与 `prepublish-guard.js` 第 ⑤ 项（只查模块存在性）均不可见。
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, relative, resolve } from 'node:path'
import { readStyleDeps, rootDir, styleSourceOf } from './parse-style-deps.js'

/**
 * 豁免清单：chunk 图推导不出、但确属合法的样式依赖。
 * 结构：{ <组件名>: { deps: string[], reason: string } }
 */
const EXEMPTIONS = {}

const { componentsMap, styleSources, componentDependencies, stylelessComponents } = readStyleDeps()
const esDir = resolve(rootDir, 'es')
const componentNames = Object.keys(componentsMap)
const styleless = new Set(stylelessComponents)

if (!existsSync(esDir) || !existsSync(resolve(rootDir, 'lib'))) {
  console.error('❌ 未找到 es/ 或 lib/ 产物，请先执行 `pnpm build` 后再运行 `pnpm verify:deps`')
  process.exit(1)
}

/** 产物目录 → 该目录承载的组件名（Provider 与底层组件同目录，优先取「非样式来源」的那个作为规范名） */
const dirToComponent = new Map()
componentNames.forEach((name) => {
  const dir = componentsMap[name]
  const current = dirToComponent.get(dir)
  if (current === undefined) {
    dirToComponent.set(dir, name)
    return
  }
  // 同目录多个组件名时，取「不在 styleSources 中」的组件作为规范名（Message 优先于 MessageProvider）
  if (styleSources[current] !== undefined && styleSources[name] === undefined) {
    dirToComponent.set(dir, name)
  }
})

/** 递归收集产物 chunk（`<Comp>.vue2.js`） */
function collectChunks(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      return collectChunks(fullPath)
    }
    return /\.vue2\.js$/.test(entry.name) ? [fullPath] : []
  })
}

/** 该组件是否有「自己的一份 CSS」——无自身 CSS 的组件（Provider / 子组件 / 无样式组件）不构成样式依赖 */
function hasOwnCss(componentName) {
  return styleSources[componentName] === undefined && !styleless.has(componentName)
}

/** 组件 chunk 的依赖边：指向其它组件「有自己 CSS」的公共入口 `../<dir>/index.js`（同目录兄弟模块不算组件依赖） */
function buildGraph() {
  const graph = new Map()
  collectChunks(esDir).forEach((chunkFile) => {
    const componentName = chunkFile
      .replace(/\.vue2\.js$/, '')
      .split('/')
      .pop()
    if (componentsMap[componentName] === undefined) {
      return
    }
    const dependencies = new Set()
    const specifiers = [...readFileSync(chunkFile, 'utf-8').matchAll(/from\s+"([^"]+)"/g)].map((matched) => matched[1])
    specifiers.forEach((specifier) => {
      // 只看跨目录的组件入口（`./Xxx.vue.js` 这类同目录兄弟模块不参与组件依赖判定）
      if (!specifier.startsWith('..')) {
        return
      }
      const targetDir = relative(esDir, dirname(resolve(dirname(chunkFile), specifier)))
        .split('\\')
        .join('/')
      const targetComponent = dirToComponent.get(targetDir)
      if (targetComponent === undefined || targetComponent === componentName) {
        return
      }
      // 目标组件没有自己的一份 CSS（无样式组件、或在 styleSources 中登记为由他人承载样式）→ 不是样式依赖
      // 例：Descriptions 会 import DescriptionsItem（子组件），但后者的样式写在 Descriptions.vue 内
      if (!hasOwnCss(targetComponent)) {
        return
      }
      dependencies.add(targetComponent)
    })
    graph.set(componentName, dependencies)
  })
  return graph
}

/** 从起点求传递闭包（不含起点自身） */
function closureOf(start, graph) {
  const visited = new Set()
  const queue = [...(graph.get(start) ?? [])]
  while (queue.length > 0) {
    const current = queue.shift()
    if (visited.has(current)) {
      continue
    }
    visited.add(current)
    ;(graph.get(current) ?? []).forEach((next) => {
      if (!visited.has(next)) {
        queue.push(next)
      }
    })
  }
  visited.delete(start)
  return visited
}

const graph = buildGraph()
const issues = []

/** 双向比对：返回 { missing（漏写）, stale（写了但已不依赖） } */
function diff(componentName, actual, expected) {
  const exempted = new Set(EXEMPTIONS[componentName]?.deps ?? [])
  const missing = [...actual].filter((dep) => !expected.has(dep) && !exempted.has(dep)).sort()
  const stale = [...expected].filter((dep) => !actual.has(dep) && !exempted.has(dep)).sort()
  return { missing, stale }
}

componentNames.forEach((componentName) => {
  if (styleless.has(componentName)) {
    return
  }
  const expected = new Set(componentDependencies[componentName] ?? [])
  if (styleSources[componentName] === undefined) {
    // 有自己入口的组件：表 ↔ 自身 chunk 的传递闭包
    const { missing, stale } = diff(componentName, closureOf(componentName, graph), expected)
    if (missing.length > 0) {
      issues.push(`${componentName} 漏写依赖（产物 chunk 图闭包中存在，表中缺失）：${missing.join('、')}`)
    }
    if (stale.length > 0) {
      issues.push(`${componentName} 的依赖已 stale（表中声明但 chunk 图中已不存在）：${stale.join('、')}`)
    }
    return
  }
  // Provider / 子组件：与样式来源组件**共用同一个入口**，其声明的依赖必须落在共享入口的集合内
  const source = styleSourceOf(componentName, styleSources)
  const sharedCss = new Set([source, ...(componentDependencies[source] ?? [])])
  const extra = [...expected].filter((dep) => !sharedCss.has(dep)).sort()
  if (extra.length > 0) {
    issues.push(
      `${componentName} 声明的依赖不在共享入口（${componentsMap[source]}/style）中：${extra.join('、')}（其样式入口与 ${source} 共用）`
    )
  }
})

/**
 * ============ 二、聚合入口导出一致性 ============
 *
 * 比对 `<dir>/index.d.ts` 声明的**值**导出与产物模块的运行时导出，双向断言：
 *   - 声明 ⊆ 运行时 → 抓「类型有声明、运行时无导出」（纯转发具名导出被 Rollup 转发优化剔除）；
 *   - 运行时 ⊆ 声明 → 抓「有导出无声明」（消费方拿不到类型）。
 *
 * 只解析携带 `index.d.ts` 且**同时**有运行时入口的目录：整个入口纯转发导致 `index.js` 缺失的情形
 * 由 `scripts/prepublish-guard.js` 第 ⑤ 项负责，本脚本不重复报错（`utils/` 已登记为例外）。
 */
const dtsExportCache = new Map()

/** 解析 `*.d.ts` 声明的值导出：`export type` 为纯类型出口，不参与比对 */
function collectDeclaredExports(dtsPath) {
  if (dtsExportCache.has(dtsPath)) {
    return dtsExportCache.get(dtsPath)
  }
  const names = new Set()
  // 先落缓存再解析：`export *` 形成环时天然截断，不会无限递归
  dtsExportCache.set(dtsPath, names)
  if (!existsSync(dtsPath)) {
    return names
  }
  readFileSync(dtsPath, 'utf-8')
    .split('\n')
    .forEach((line) => {
      const starMatched = line.match(/^export \* from '([^']+)'/)
      if (starMatched) {
        collectDeclaredExports(resolveDtsSpecifier(dtsPath, starMatched[1])).forEach((name) => names.add(name))
        return
      }
      const namespaceMatched = line.match(/^export \* as (\w+) from/)
      if (namespaceMatched) {
        names.add(namespaceMatched[1])
        return
      }
      // `export type { ... }` 不以 `export {` 开头，不会命中此分支
      const exportMatched = line.match(/^export \{([^}]*)\}/)
      if (exportMatched) {
        exportMatched[1].split(',').forEach((item) => {
          const name = item
            .trim()
            .replace(/^default as /, '')
            .trim()
          if (name) {
            names.add(name)
          }
        })
        return
      }
      const declaredMatched = line.match(/^export declare (?:const|function|class|let|var) (\w+)/)
      if (declaredMatched) {
        names.add(declaredMatched[1])
        return
      }
      if (/^export default\b/.test(line)) {
        names.add('default')
      }
    })
  return names
}

/** 把 `*.d.ts` 内的相对模块说明符解析为真实声明文件路径 */
function resolveDtsSpecifier(fromDts, specifier) {
  const base = resolve(dirname(fromDts), specifier)
  const candidates = [`${base}.d.ts`, resolve(base, 'index.d.ts')]
  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[1]
}

/** 递归收集「既有 index.d.ts 又有运行时入口」的产物目录 */
function collectEntryDirs(dir, entryFileName, result = []) {
  if (!existsSync(dir)) {
    return result
  }
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory() || entry.name === 'style') {
      return
    }
    const fullPath = resolve(dir, entry.name)
    if (existsSync(resolve(fullPath, 'index.d.ts')) && existsSync(resolve(fullPath, entryFileName))) {
      result.push(fullPath)
    }
    collectEntryDirs(fullPath, entryFileName, result)
  })
  return result
}

const requireCjs = createRequire(import.meta.url)
const OUT_FORMATS = [
  { dir: 'es', entryFileName: 'index.js', load: (entryPath) => import(entryPath) },
  { dir: 'lib', entryFileName: 'index.cjs', load: (entryPath) => requireCjs(entryPath) }
]
const entryExportIssues = []
let checkedEntryCount = 0

for (const { dir, entryFileName, load } of OUT_FORMATS) {
  const entryDirs = collectEntryDirs(resolve(rootDir, dir), entryFileName)
  for (const entryDir of entryDirs) {
    checkedEntryCount += 1
    const entryPath = relative(rootDir, entryDir).split('\\').join('/')
    const declaredExports = collectDeclaredExports(resolve(entryDir, 'index.d.ts'))
    const moduleExports = new Set(Object.keys(await load(resolve(entryDir, entryFileName))))
    const undeclaredRuntime = [...declaredExports].filter((name) => !moduleExports.has(name)).sort()
    const missingDeclaration = [...moduleExports].filter((name) => !declaredExports.has(name)).sort()
    if (undeclaredRuntime.length > 0) {
      entryExportIssues.push(
        `${entryPath} 的 index.d.ts 声明了但运行时未导出：${undeclaredRuntime.join('、')}（入口该具名导出被 Rollup 转发优化剔除）`
      )
    }
    if (missingDeclaration.length > 0) {
      entryExportIssues.push(
        `${entryPath} 运行时导出了但 index.d.ts 未声明：${missingDeclaration.join('、')}（消费方取不到类型）`
      )
    }
  }
}

if (issues.length > 0 || entryExportIssues.length > 0) {
  if (issues.length > 0) {
    console.error('❌ 样式依赖一致性校验未通过：')
    issues.forEach((issue) => console.error(`   ✗ ${issue}`))
    console.error('   请修改 components/utils/style-deps.ts 的 componentDependencies；确属无法从 chunk 图推导的依赖，')
    console.error('   在 scripts/verify-style-deps.js 的 EXEMPTIONS 中登记并写明原因')
  }
  if (entryExportIssues.length > 0) {
    console.error('❌ 聚合入口导出一致性校验未通过：')
    entryExportIssues.forEach((issue) => console.error(`   ✗ ${issue}`))
    console.error('   修法：入口改为经本地常量再导出（如 `export const useMessage = useMessageImpl`），')
    console.error('   见 development/project-structure.md 的「聚合入口禁止纯转发」')
  }
  process.exit(1)
}

console.log(
  `✅ 产物一致性校验通过：${componentNames.length} 个组件与 chunk 依赖图闭包一致，${checkedEntryCount} 个聚合入口的类型声明与运行时导出双向一致`
)
