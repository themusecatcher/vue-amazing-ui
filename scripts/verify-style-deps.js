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
 * 做法：产物 chunk（`es/<dir>/*.js`，排除 `style/` 生成的样式入口）之间的 import 是**编译期事实**，
 * 可机读（组件归属与边的解析规则见 `buildGraph`）。以它为边求传递闭包，与手写表做**双向断言**：
 *   - closure ⊆ table → 抓「漏写依赖」；
 *   - table ⊆ closure → 抓「写了但已不再依赖」（stale）。
 *
 * ⚠️ 边界（不改变 D1 的分工）：
 *   - 只校验**依赖集合的完整性**；**顺序与层叠仍由手写表 `componentDependencies` 决定**（生成器按表顺序写入口）；
 *   - 无法从 chunk 图推导的合法依赖（异步 `import()`、条件渲染、跨包耦合，以及同目录共享纯 JS 模块
 *     被目录兜底误判）用下方 EXEMPTIONS 显式登记，每条必须写明原因
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
const EXEMPTIONS = {
  LayoutSider: {
    deps: ['Layout'],
    reason:
      'LayoutSider 与 Layout 共用 components/layout/siderHook.ts（纯 JS、无样式）做子级登记；' +
      'chunk 图按「目录」判定依赖，会把该 import 的父目录 layout/ 误判为样式依赖，' +
      '而两者样式入口各自独立（LayoutSider 的 style 入口不含 Layout 的 CSS）'
  }
}

const { componentsMap, styleSources, componentDependencies, stylelessComponents } = readStyleDeps()
const esDir = resolve(rootDir, 'es')
const componentNames = Object.keys(componentsMap)
const styleless = new Set(stylelessComponents)

if (!existsSync(esDir) || !existsSync(resolve(rootDir, 'lib'))) {
  console.error('❌ 未找到 es/ 或 lib/ 产物，请先执行 `pnpm build` 后再运行 `pnpm verify:deps`')
  process.exit(1)
}

/** 产物目录 → 该目录下「有自己的一份 CSS」的组件集合 */
const ownCssComponentsByDir = new Map()
componentNames.forEach((name) => {
  if (!hasOwnCss(name)) {
    return
  }
  const dir = componentsMap[name]
  const set = ownCssComponentsByDir.get(dir) ?? new Set()
  set.add(name)
  ownCssComponentsByDir.set(dir, set)
})

/**
 * 目录兜底：把「认不出组件名的产物模块」归并到所在目录的组件
 *
 * 仅当该目录**唯一**归属一个「有自己 CSS」的组件时才归并。Provider 与底层组件同目录时
 * （Message + MessageProvider），Provider 的样式由底层组件承载，集合里只剩底层组件，结果与旧版一致。
 *
 * 多组件共享目录（picker 内核：9 个有自身 CSS 的面板同处 components/picker/）下不存在唯一归属，
 * 返回 undefined —— 否则 `date-utils.js` / `keyboard.js` 这类公共模块会被硬折成目录里的某个
 * 具体组件，既在闭包里造出伪边，又掩盖真实依赖。
 */
function componentByDirFallback(dir) {
  const set = ownCssComponentsByDir.get(dir)
  return set !== undefined && set.size === 1 ? [...set][0] : undefined
}

/**
 * 递归收集产物 chunk（`es/` 下全部 `.js`）
 *
 * 刻意不按 SFC 产物文件名（如 `*.vue2.js`）筛选：`preserveModules` 下同名 chunk 的编号后缀取决于
 * Rollup 创建模块的顺序（受 SFC 是否 scoped 等影响），同一份源码在不同组件上会落到 `X.vue.js` /
 * `X.vue2.js` / `X.vue3.js` 这类不同名字上 —— 按名筛选会让整个组件在图中消失（Menu 即此例）。
 *
 * 必须排除 `style/`：该目录由 generate-style-entries 按手写依赖表生成，其 import 与表同源，
 * 收进图里会让「表 ⊆ 闭包」自证成立，掩盖真实的漏写/残留。
 */
function collectChunks(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'style' ? [] : collectChunks(fullPath)
    }
    return entry.name.endsWith('.js') ? [fullPath] : []
  })
}

/**
 * chunk 所属组件名：先按 chunk 文件名认，认不出再按「目录 → 组件」映射兜底
 *
 * - 文件名认得出（`Popup.vue2.js` → `Popup`、`DialogProvider.vue.js` → `DialogProvider`）：同目录的
 *   Provider / 子组件各有自己的节点，不能一律按目录归并；
 * - 认不出（`Menu.vue.js` 这类 SFC 门面、`MenuNodes.js` / `useModal.js` 这类同目录支撑模块）：
 *   `preserveModules` 下 chunk 路径与源码路径同构，且该目录唯一归属一个组件时按目录归并 ——
 *   组件经 `.ts` 内核模块转出去的 import（如 Menu 的浮层宿主 `Popup`）只有这样才进得了闭包。
 * 目录与文件名都不对应组件（`utils/`、`_virtual/`、`index.js`、多组件共享目录等）时返回 undefined，调用方跳过。
 */
function componentOfChunk(chunkFile) {
  const fileName = chunkFile.slice(chunkFile.lastIndexOf('/') + 1)
  const namedByFile = fileName.replace(/\..*$/, '')
  if (componentsMap[namedByFile] !== undefined) {
    return namedByFile
  }
  const dir = relative(esDir, dirname(chunkFile)).split('\\').join('/')
  return componentByDirFallback(dir)
}

/** 该组件是否有「自己的一份 CSS」——无自身 CSS 的组件（Provider / 子组件 / 无样式组件）不构成样式依赖 */
function hasOwnCss(componentName) {
  return styleSources[componentName] === undefined && !styleless.has(componentName)
}

/** 解析 chunk 的 import 语句：说明符 + 具名导入的**原始导出名**（默认导入记 `default`、命名空间记 `*`） */
function parseImports(code) {
  return [...code.matchAll(/import\s+([^;]+?)\s+from\s+"([^"]+)"/g)].map((matched) => {
    const [, clause, specifier] = matched
    const imported = []
    const named = clause.match(/\{([^}]*)\}/)
    if (named) {
      splitTopLevel(named[1], ',').forEach((item) => {
        const name = item.trim().split(/\s+as\s+/)[0]
        if (name) {
          imported.push(name)
        }
      })
    }
    if (/\*\s+as\s+[\w$]+/.test(clause)) {
      imported.push('*')
    }
    // 具名导入之外仍有裸标识符（`import X from` / `import X, { ... } from`）→ 默认导入
    const withoutNamed = clause.replace(/\{[^}]*\}/, '').replace(/\*\s+as\s+[\w$]+/, '')
    if (withoutNamed.split(',').some((part) => /^[\w$]+$/.test(part.trim()))) {
      imported.push('default')
    }
    return { specifier, imported }
  })
}

/** 按顶层分隔符切分（忽略括号内的逗号，如 `const f = r(o)` 的参数） */
function splitTopLevel(text, separator) {
  const items = []
  let depth = 0
  let current = ''
  for (const char of text) {
    if (char === '(' || char === '{' || char === '[') {
      depth += 1
    } else if (char === ')' || char === '}' || char === ']') {
      depth -= 1
    } else if (char === separator && depth === 0) {
      items.push(current)
      current = ''
      continue
    }
    current += char
  }
  if (current.trim()) {
    items.push(current)
  }
  return items
}

/**
 * 解析目录聚合入口（`<dir>/index.js`）的三张映射表
 *
 * `preserveModules` 产物保留了导出名，但本地变量被重命名（如
 * `const n = t, R = i, f = r(o); export { n as RadioButton, R as RadioGroup, f as default }`），
 * 因此需要还原 `导出名 → 本地变量 → import 源模块` 的链路，才能把「经 barrel 引入」
 * 还原成「实际依赖哪个组件」。
 */
const barrelCache = new Map()
function parseBarrel(entryFile) {
  if (barrelCache.has(entryFile)) {
    return barrelCache.get(entryFile)
  }
  const barrel = { imports: new Map(), aliases: new Map(), exports: new Map(), stars: [] }
  barrelCache.set(entryFile, barrel)
  // `export *` 的目标可能是纯类型模块（产物中无对应 JS），不存在时按空入口处理
  if (!existsSync(entryFile)) {
    return barrel
  }
  const code = readFileSync(entryFile, 'utf-8')
  // import 本地名 → 源模块（默认 / 具名 / 命名空间）
  for (const matched of code.matchAll(/import\s+([^;]+?)\s+from\s+"([^"]+)"/g)) {
    const [, clause, specifier] = matched
    const source = resolve(dirname(entryFile), specifier)
    const named = clause.match(/\{([^}]*)\}/)
    if (named) {
      splitTopLevel(named[1], ',').forEach((item) => {
        const [imported, local = imported] = item.trim().split(/\s+as\s+/)
        const localName = local.trim()
        if (localName) {
          barrel.imports.set(localName, { source, imported: imported.trim() })
        }
      })
    }
    const namespace = clause.match(/\*\s+as\s+([\w$]+)/)
    if (namespace) {
      barrel.imports.set(namespace[1], { source, imported: '*' })
    }
    const withoutNamed = clause.replace(/\{[^}]*\}/, '').replace(/\*\s+as\s+[\w$]+/, '')
    withoutNamed.split(',').forEach((part) => {
      const localName = part.trim()
      if (/^[\w$]+$/.test(localName)) {
        barrel.imports.set(localName, { source, imported: 'default' })
      }
    })
  }
  // 本地常量别名（Rollup 会把多个声明合并为 `const a = x, b = y;`）
  for (const matched of code.matchAll(/(?:const|let|var)\s+([^;]+);/g)) {
    splitTopLevel(matched[1], ',').forEach((declaration) => {
      const [local, expression = ''] = declaration.split('=')
      const localName = local.trim()
      if (/^[\w$]+$/.test(localName)) {
        barrel.aliases.set(localName, expression)
      }
    })
  }
  // 导出名 → 本地名
  for (const matched of code.matchAll(/export\s*\{([^}]*)\}/g)) {
    splitTopLevel(matched[1], ',').forEach((item) => {
      const [local, exported = local] = item.trim().split(/\s+as\s+/)
      const localName = local.trim()
      if (localName) {
        barrel.exports.set(exported.trim(), localName)
      }
    })
  }
  for (const matched of code.matchAll(/export\s+\*\s+from\s+"([^"]+)"/g)) {
    barrel.stars.push(resolve(dirname(entryFile), matched[1]))
  }
  for (const matched of code.matchAll(/export\s+(?:const|let|var|function|class)\s+([\w$]+)/g)) {
    barrel.exports.set(matched[1], matched[1])
  }
  return barrel
}

/** 本地名 → 实际源模块：import 直接返回；常量别名展开其表达式中的标识符（如 `f = r(o)` 中的 `r` / `o`） */
function resolveBarrelLocal(entryFile, local, barrel, visited) {
  const key = `${entryFile}#local#${local}`
  if (visited.has(key)) {
    return []
  }
  visited.add(key)
  const imported = barrel.imports.get(local)
  if (imported !== undefined) {
    return [imported.source]
  }
  const expression = barrel.aliases.get(local)
  if (expression === undefined) {
    return []
  }
  const sources = []
  ;[...expression.matchAll(/\b([A-Za-z_$][\w$]*)\b/g)].forEach((matched) => {
    const identifier = matched[1]
    if (barrel.imports.has(identifier)) {
      sources.push(barrel.imports.get(identifier).source)
    } else if (barrel.aliases.has(identifier)) {
      sources.push(...resolveBarrelLocal(entryFile, identifier, barrel, visited))
    }
  })
  return sources
}

/** 导出名 → 实际源模块（未命中显式导出时沿 `export *` 继续找） */
function resolveBarrelExport(entryFile, exportedName, visited = new Set()) {
  const key = `${entryFile}#${exportedName}`
  if (visited.has(key)) {
    return []
  }
  visited.add(key)
  const barrel = parseBarrel(entryFile)
  const local = barrel.exports.get(exportedName)
  const sources = local === undefined ? [] : resolveBarrelLocal(entryFile, local, barrel, visited)
  barrel.stars.forEach((source) => sources.push(...resolveBarrelExport(source, exportedName, visited)))
  return sources
}

/**
 * 组件 chunk 的依赖边：指向另一个「有自己 CSS」的组件
 *
 * 目标组件解析顺序：
 *   1. 目录聚合入口（`<dir>/index.js`）按 import 的**具名符号**展开到实际源模块
 *      （`import { RadioGroup } from "../radio/index.js"` → `radio/radio-group/index.js` → RadioGroup）；
 *   2. 被引用文件名直接命中组件名（`PickerPanel.vue.js` → PickerPanel、`Popup.vue2.js` → Popup）；
 *   3. 否则按所在目录兜底（`../popup/index.js` → 目录 popup → Popup），见 `componentByDirFallback`。
 *
 * 起点按 chunk 归属组件汇总（见 `componentOfChunk`）。参与判定的说明符两类：
 *   - 跨目录 `../<dir>/...`：常规跨组件依赖；
 *   - 同目录单文件 `./<Comp>.vue.js`：多组件共享目录（picker 内核）里面板之间正是这样互引 ——
 *     被引用文件名命中另一个组件才算依赖边；同目录支撑模块（`./date-utils.js`）命中不了组件，
 *     经目录兜底后与自身组件同名而被过滤，不会产生伪边。
 * 嵌套同目录 `./<subdir>/...`（复合组件范式：layout/ → layout-sider/、dropdown/ → dropdown-button/）
 * 中的子组件由组件入口聚合导出引入、各有独立样式入口，不属于父组件的样式依赖，故不计边。
 */
function buildGraph() {
  const graph = new Map()
  collectChunks(esDir).forEach((chunkFile) => {
    const componentName = componentOfChunk(chunkFile)
    if (componentName === undefined) {
      return
    }
    // 一个组件可能由多个 chunk 承载（SFC 门面 + 同目录支撑模块），边取并集
    const dependencies = graph.get(componentName) ?? new Set()
    const targetModules = new Set()
    parseImports(readFileSync(chunkFile, 'utf-8')).forEach(({ specifier, imported }) => {
      if (!specifier.startsWith('.')) {
        return
      }
      // 同目录的嵌套子目录归属另一个组件（复合组件范式），不计边
      if (specifier.startsWith('./') && specifier.slice(2).includes('/')) {
        return
      }
      const targetModule = resolve(dirname(chunkFile), specifier)
      if (targetModule.endsWith('/index.js') && existsSync(targetModule)) {
        const importedNames = imported.length > 0 ? imported : ['*']
        const expanded = []
        importedNames.forEach((name) => {
          if (name !== '*') {
            expanded.push(...resolveBarrelExport(targetModule, name))
            return
          }
          // 命名空间导入无法分辨成员：保守展开该入口的全部导出
          parseBarrel(targetModule).exports.forEach((_, exportedName) => {
            expanded.push(...resolveBarrelExport(targetModule, exportedName))
          })
        })
        if (expanded.length > 0) {
          expanded.forEach((source) => targetModules.add(source))
          return
        }
      }
      targetModules.add(targetModule)
    })
    targetModules.forEach((targetModule) => {
      const namedByFile = targetModule.slice(targetModule.lastIndexOf('/') + 1).replace(/\..*$/, '')
      const targetComponent =
        componentsMap[namedByFile] !== undefined
          ? namedByFile
          : componentByDirFallback(relative(esDir, dirname(targetModule)).split('\\').join('/'))
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
