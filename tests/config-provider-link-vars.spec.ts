import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import { createDiscreteApi } from 'components/discrete'
import { getColorPalettes } from 'components/utils'

const RED = '#f5222d'
const readVar = (name: string): string => document.documentElement.style.getPropertyValue(name)

/**
 * 链接基座联动：ConfigProvider 把 common 主色的色阶写入 CSS 变量（供 `:where(a)` 消费），
 * 变量为最外层实例写入、卸载时移除（回退样式表 fallback）。
 */
describe('ConfigProvider 链接色 CSS 变量', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('style')
  })
  afterEach(() => {
    document.documentElement.removeAttribute('style')
  })

  it('按 common 主色色阶写入链接色变量', async () => {
    const wrapper = mount(ConfigProvider, { props: { theme: { common: { primaryColor: RED } } } })
    await nextTick()

    const palettes = getColorPalettes(RED)
    expect(readVar('--link-color')).toBe(palettes[5])
    expect(readVar('--link-color-hover')).toBe(palettes[3])
    expect(readVar('--link-color-active')).toBe(palettes[6])

    wrapper.unmount()
  })

  it('主色变化时同步更新变量', async () => {
    const wrapper = mount(ConfigProvider, { props: { theme: { common: { primaryColor: '#1677ff' } } } })
    await nextTick()
    expect(readVar('--link-color')).toBe(getColorPalettes('#1677ff')[5])

    await wrapper.setProps({ theme: { common: { primaryColor: RED } } })
    await nextTick()
    expect(readVar('--link-color')).toBe(getColorPalettes(RED)[5])

    wrapper.unmount()
  })

  it('卸载后移除变量，使样式表默认值重新生效', async () => {
    const wrapper = mount(ConfigProvider, { props: { theme: { common: { primaryColor: RED } } } })
    await nextTick()
    expect(readVar('--link-color')).not.toBe('')

    wrapper.unmount()
    expect(readVar('--link-color')).toBe('')
    expect(readVar('--link-color-hover')).toBe('')
  })

  it('离散实例既不覆盖也不清除主应用写入的变量', async () => {
    // 主应用最外层写入
    const wrapper = mount(ConfigProvider, { props: { theme: { common: { primaryColor: '#1677ff' } } } })
    await nextTick()
    const appValue = readVar('--link-color')
    expect(appValue).toBe(getColorPalettes('#1677ff')[5])

    // 离散实例即使传入不同主题色，也不应写全局变量（其内部 ConfigProvider 带跳过标记）
    const { dispose } = createDiscreteApi(['message'], {
      configProviderProps: { theme: { common: { primaryColor: RED } } }
    })
    await nextTick()
    expect(readVar('--link-color')).toBe(appValue)

    // dispose 只清理自身，主应用写入的值不受影响
    dispose()
    expect(readVar('--link-color')).toBe(appValue)

    wrapper.unmount()
  })
})
