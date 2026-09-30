import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import Menu from 'components/menu'
import { getColorPalettes } from 'components/utils'

/**
 * ConfigProvider 主题体系的登记完整性 + 按组件覆盖回归
 *
 * 背景：组件经 `useInject('<组件名>')` 读取主题，命中 `components` 注入表的前提是 ConfigProvider
 * 已为该组件名登记表项。漏登记时，`theme['<组件名>']` 会在写入色阶处抛
 * `TypeError: Cannot set properties of undefined`（`Menu` 曾如此），故此处以
 * 「源码扫描 → 与登记表比对」的方式守护：新增消费主题色的组件若漏登记即失败。
 */
const configProviderSource = readFileSync(
  resolve(process.cwd(), 'components/config-provider/ConfigProvider.vue'),
  'utf-8'
)
const RED = '#f5222d'

/** 扫描全部 SFC，取 `useInject('<组件名>')` 的组件名（库内唯一的主题色消费入口） */
function collectThemeConsumers(): string[] {
  const names = new Set<string>()
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith('.vue')) {
        const source = readFileSync(full, 'utf-8')
        for (const matched of source.matchAll(/useInject\('([A-Za-z0-9]+)'\)/g)) {
          names.add(matched[1])
        }
      }
    }
  }
  walk(resolve(process.cwd(), 'components'))
  return [...names].sort()
}
/** 解析 `Theme` 接口登记的组件键（使用方的类型入口；`common` 非组件，排除） */
function parseThemeKeys(): string[] {
  const block = configProviderSource.match(/export interface Theme \{([\s\S]*?)\n\}/)
  if (!block) {
    throw new Error('未能从 ConfigProvider.vue 中解析出 Theme 接口')
  }
  return [...block[1].matchAll(/^\s{2}([A-Za-z0-9]+)\?: \{/gm)]
    .map((matched) => matched[1])
    .filter((name) => name !== 'common')
    .sort()
}
/** 解析 `componentsThemeColor` 表登记的组件键（运行时色阶的写入目标） */
function parseThemeColorKeys(): string[] {
  const block = configProviderSource.match(
    /const componentsThemeColor = reactive<Record<string, ThemeColor>>\(\{([\s\S]*?)\n\}\)/
  )
  if (!block) {
    throw new Error('未能从 ConfigProvider.vue 中解析出 componentsThemeColor')
  }
  return [...block[1].matchAll(/^\s{2}([A-Za-z0-9]+): \{/gm)].map((matched) => matched[1]).sort()
}

describe('ConfigProvider 主题体系登记完整性', () => {
  it('消费主题色的组件均已登记到 Theme 接口与组件主题表', () => {
    const consumers = collectThemeConsumers()
    expect(consumers.length).toBeGreaterThan(0)
    expect(parseThemeKeys()).toEqual(consumers)
    expect(parseThemeColorKeys()).toEqual(consumers)
  })
})

describe('ConfigProvider 按组件覆盖主题色', () => {
  it('theme.Menu 生效：色阶注入菜单根节点且不抛错', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { Menu: { primaryColor: RED } } },
      slots: { default: () => h(Menu, { mode: 'horizontal', items: [{ key: '1', label: 'A' }] }) }
    })
    await nextTick()
    const root = wrapper.find('.menu-wrap')
    expect(root.exists()).toBe(true)
    expect(root.element.style.getPropertyValue('--menu-primary-color')).toBe(getColorPalettes(RED)[5])
  })
})
