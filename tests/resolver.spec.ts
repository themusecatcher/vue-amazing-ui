import { readFileSync, readdirSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { VueAmazingUIResolver } from 'components/utils/resolver'
import type { VueAmazingUIResolverOptions } from 'components/utils/resolver'

/**
 * 按需引入 resolver 的回归防护（D 方案：每组件一个样式入口）
 *
 * 背景：resolver 现在只回答一个问题「该组件的样式入口在哪」——返回**单条**
 * `es|lib/<dir>/style/index.{js,cjs}`。入口内部的 CSS 顺序（global → 自身 → 依赖 → vendor）由构建期
 * build/generate-style-entries.ts 依据 components/utils/style-deps.ts 固化，其断言集见
 * tests/generate-style-entries.spec.ts（原先「依赖是否注入齐全」的多条 CSS 列表断言已迁移到那里）。
 *
 * 本文件保留两类职责：
 *   1. 入口路径本身：无样式组件、Provider / 子组件的样式来源、嵌套目录、cjs 形态、未收录组件；
 *   2. 全量合法性扫描 + 无 `<style>` 块 SFC 的登记完整性 —— 表写错 / 漏登记时在此暴露。
 */
function sideEffectsOf(name: string, options?: VueAmazingUIResolverOptions): string[] {
  return VueAmazingUIResolver(options).resolve(name)?.sideEffects ?? []
}

// 从 style-deps.ts（样式依赖的单一数据源）源码解析各表，避免为测试而导出内部常量
const styleDepsSource = readFileSync(resolve(process.cwd(), 'components/utils/style-deps.ts'), 'utf-8')
function parseComponentsMap(): Array<[string, string]> {
  const block = styleDepsSource.match(/const componentsMap = \{([\s\S]*?)\n\}/)
  if (!block) {
    throw new Error('未能从 components/utils/style-deps.ts 中解析出 componentsMap')
  }
  return [...block[1].matchAll(/^\s*([A-Za-z0-9]+):\s*'([^']+)',?\s*$/gm)].map((m) => [m[1], m[2]])
}
/** 从 style-deps.ts 源码解析组件样式来源表（键为自身无样式的组件，值为承载其样式的组件） */
function parseStyleSources(): Record<string, string> {
  const block = styleDepsSource.match(
    /const styleSources: Partial<Record<ComponentName, ComponentName>> = \{([\s\S]*?)\n\}/
  )
  if (!block) {
    throw new Error('未能从 components/utils/style-deps.ts 中解析出 styleSources')
  }
  return Object.fromEntries([...block[1].matchAll(/^\s*([A-Za-z0-9]+):\s*'([^']+)',?\s*$/gm)].map((m) => [m[1], m[2]]))
}
/** 从 style-deps.ts 源码解析「无任何样式」的组件白名单 */
function parseStylelessComponents(): string[] {
  const block = styleDepsSource.match(/const stylelessComponents:[^=]*= \[([^\]]*)\]/)
  if (!block) {
    throw new Error('未能从 components/utils/style-deps.ts 中解析出无样式组件白名单')
  }
  return [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1])
}
/** 递归收集目录下所有 SFC 的绝对路径 */
function collectVueFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      return collectVueFiles(fullPath)
    }
    return entry.name.endsWith('.vue') ? [fullPath] : []
  })
}

describe('resolver - 样式入口路径', () => {
  it('已知组件返回单条样式入口', () => {
    expect(sideEffectsOf('Button')).toEqual(['vue-amazing-ui/es/button/style/index.js'])
  })

  it('cjs 选项下入口指向 lib 的 .cjs 文件', () => {
    expect(sideEffectsOf('Button', { cjs: true })).toEqual(['vue-amazing-ui/lib/button/style/index.cjs'])
  })

  it.each(['ConfigProvider', 'Highlight', 'NumberAnimation', 'Watermark'])('%s 不应引入任何样式', (name) => {
    expect(sideEffectsOf(name)).toEqual([])
  })

  it('Provider 复用底层组件的入口目录，不出现自身目录', () => {
    expect(sideEffectsOf('MessageProvider')).toEqual(['vue-amazing-ui/es/message/style/index.js'])
    expect(sideEffectsOf('NotificationProvider')).toEqual(['vue-amazing-ui/es/notification/style/index.js'])
    expect(sideEffectsOf('ModalProvider')).toEqual(['vue-amazing-ui/es/modal/style/index.js'])
    expect(sideEffectsOf('DialogProvider')).toEqual(['vue-amazing-ui/es/dialog/style/index.js'])
  })

  it('子组件样式来源落在父组件目录下', () => {
    expect(sideEffectsOf('DescriptionsItem')).toEqual(['vue-amazing-ui/es/descriptions/descriptions/style/index.js'])
  })

  it('嵌套目录组件的入口路径正确', () => {
    expect(sideEffectsOf('Row')).toEqual(['vue-amazing-ui/es/grid/row/style/index.js'])
    expect(sideEffectsOf('Col')).toEqual(['vue-amazing-ui/es/grid/col/style/index.js'])
    expect(sideEffectsOf('ListItem')).toEqual(['vue-amazing-ui/es/list/list-item/style/index.js'])
  })

  it('四个命令式 Provider 均应能被解析', () => {
    ;['MessageProvider', 'NotificationProvider', 'ModalProvider', 'DialogProvider'].forEach((name) => {
      const result = VueAmazingUIResolver().resolve(name)
      expect(result, `${name} 应能被 resolver 解析`).toBeDefined()
      expect(result?.from).toBe('vue-amazing-ui')
      expect(result?.name).toBe(name)
    })
  })

  it('未收录组件应返回 undefined，交由其它 resolver 处理', () => {
    expect(VueAmazingUIResolver().resolve('NotExistComponent')).toBeUndefined()
  })
})

describe('resolver - 全量组件映射', () => {
  const entries = parseComponentsMap()
  const dirMap = new Map(entries)
  const styleSources = parseStyleSources()

  it('应解析出全部组件映射', () => {
    expect(entries.length).toBeGreaterThanOrEqual(68)
  })

  it('每个组件都应返回其样式来源目录下的单条入口，且不含 undefined', () => {
    entries.forEach(([name]) => {
      const effects = sideEffectsOf(name)
      if (effects.length === 0) {
        return // 无样式组件，已由独立用例覆盖
      }
      expect(effects, `${name} 应只注入一条样式入口`).toHaveLength(1)
      const source = styleSources[name] ?? name
      const sourceDir = dirMap.get(source)
      expect(sourceDir, `${name} 的样式来源 ${source} 应已收录于 componentsMap`).toBeDefined()
      expect(effects[0], `${name} 的入口路径异常`).toBe(`vue-amazing-ui/es/${sourceDir}/style/index.js`)
    })
  })
})

describe('resolver - 无 <style> 块 SFC 的登记完整性', () => {
  it('每个无 <style> 块的 SFC 都必须登记到白名单或样式来源表', () => {
    const styleSources = parseStyleSources()
    const styleless = parseStylelessComponents()
    const unregistered = collectVueFiles(resolve(process.cwd(), 'components'))
      .filter((file) => !/<style[\s>]/.test(readFileSync(file, 'utf-8')))
      .map((file) => basename(file, '.vue'))
      .filter((name) => !styleless.includes(name) && styleSources[name] === undefined)
    expect(unregistered, `以下 SFC 无 <style> 块但未登记样式来源：${unregistered.join('、')}`).toEqual([])
  })
})
