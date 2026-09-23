/**
 * 从 `components/utils/style-deps.ts` 源码解析样式依赖表（供纯 JS 脚本复用）
 *
 * 为什么用正则解析而不是 `import`：`scripts/*.js|mjs` 由 node 直接执行，而 style-deps.ts 是
 * TypeScript 源码 —— 本仓库 `engines` 允许的最低版本 Node 20.19 / 22.12 不支持「类型擦除」，
 * 无法直接 import .ts。该文件是单文件、格式稳定（三张表 + 一个白名单数组），正则解析足够可靠。
 *
 * 消费方：`scripts/prepublish-guard.js`（发布前存在性守卫）、`scripts/verify-style-deps.js`（产物闭包一致性校验）。
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** 解析 `Name: 'value'` 形态的单行条目 */
function parseStringEntries(block) {
  return Object.fromEntries(
    [...block.matchAll(/^\s*([A-Za-z0-9]+):\s*'([^']+)',?\s*$/gm)].map((matched) => [matched[1], matched[2]])
  )
}

/**
 * 读取三张表与无样式白名单
 *
 * @returns {{
 *   componentsMap: Record<string, string>,
 *   styleSources: Record<string, string>,
 *   componentDependencies: Record<string, string[]>,
 *   stylelessComponents: string[]
 * }}
 */
export function readStyleDeps() {
  const source = readFileSync(resolve(rootDir, 'components/utils/style-deps.ts'), 'utf-8')

  const componentsBlock = source.match(/const componentsMap = \{([\s\S]*?)\n\}/)
  if (!componentsBlock) {
    throw new Error('[parse-style-deps] 未能从 style-deps.ts 解析出 componentsMap')
  }
  const styleSourcesBlock = source.match(
    /const styleSources: Partial<Record<ComponentName, ComponentName>> = \{(.*?)\n\}/s
  )
  if (!styleSourcesBlock) {
    throw new Error('[parse-style-deps] 未能从 style-deps.ts 解析出 styleSources')
  }
  const dependenciesBlock = source.match(
    /const componentDependencies: Partial<Record<ComponentName, ComponentName\[\]>> = \{([\s\S]*?)\n\}/
  )
  if (!dependenciesBlock) {
    throw new Error('[parse-style-deps] 未能从 style-deps.ts 解析出 componentDependencies')
  }
  const stylelessBlock = source.match(/const stylelessComponents:[^=]*= \[([^\]]*)\]/)
  if (!stylelessBlock) {
    throw new Error('[parse-style-deps] 未能从 style-deps.ts 解析出 stylelessComponents')
  }

  const componentDependencies = {}
  // 单行与多行数组条目统一匹配：`X: ['A', 'B'],` 与 `X: [\n 'A',\n 'B'\n ]`（末条无尾逗号）
  for (const matched of dependenciesBlock[1].matchAll(/^\s*([A-Za-z0-9]+):\s*\[([\s\S]*?)\],?\s*$/gm)) {
    componentDependencies[matched[1]] = [...matched[2].matchAll(/'([^']+)'/g)].map((item) => item[1])
  }

  return {
    componentsMap: parseStringEntries(componentsBlock[1]),
    styleSources: parseStringEntries(styleSourcesBlock[1]),
    componentDependencies,
    stylelessComponents: [...stylelessBlock[1].matchAll(/'([^']+)'/g)].map((matched) => matched[1])
  }
}

/** 组件「样式来源」组件名（自身无样式文件时取其来源，如 MessageProvider → Message） */
export function styleSourceOf(componentName, styleSources) {
  return styleSources[componentName] ?? componentName
}
