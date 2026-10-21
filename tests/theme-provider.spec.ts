import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import { derive, MODE_ATTRIBUTE, THEME_VAR_NAMES } from 'components/theme'
import type { ConfigProviderTheme } from 'components/config-provider'

/**
 * ConfigProvider 主题域：默认不写、种子派生、模式、包裹元素与卸载恢复
 *
 * 写入契约：未传 theme 时完全不写变量（静态默认表生效）；最外层写 `<html>`；
 * `abstract: false` 写自身包裹元素（SSR 可直接序列化）；卸载时恢复写入前的快照。
 */
const RED = '#f5222d'
const GREEN = '#18a058'

const htmlStyle = (): CSSStyleDeclaration => document.documentElement.style
const readVar = (name: string): string => htmlStyle().getPropertyValue(name)

/** 替身 matchMedia：可控系统配色偏好并记录监听注册 */
function mockMatchMedia(matches: boolean): { setMatches: (value: boolean) => void; listenerCount: () => number } {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  let current = matches
  const media = {
    get matches() {
      return current
    },
    media: '(prefers-color-scheme: dark)',
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener)
    },
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener)
    }
  }
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: () => media
  })
  return {
    setMatches: (value: boolean) => {
      current = value
      listeners.forEach((listener) => listener({ matches: value } as MediaQueryListEvent))
    },
    listenerCount: () => listeners.size
  }
}

describe('ConfigProvider 主题域', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute(MODE_ATTRIBUTE)
  })
  afterEach(() => {
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute(MODE_ATTRIBUTE)
    vi.restoreAllMocks()
  })

  it('未传 theme 时不写任何变量与模式属性（静态默认表生效）', async () => {
    const wrapper = mount(ConfigProvider, { props: { abstract: true } })
    await nextTick()
    expect(htmlStyle().length).toBe(0)
    expect(document.documentElement.hasAttribute(MODE_ATTRIBUTE)).toBe(false)
    wrapper.unmount()
  })

  it('传空对象 / 空种子同样视为未配置', async () => {
    const wrapper = mount(ConfigProvider, { props: { abstract: true, theme: {} } })
    await nextTick()
    expect(htmlStyle().length).toBe(0)
    await wrapper.setProps({ theme: { seed: {} } })
    expect(htmlStyle().length).toBe(0)
    wrapper.unmount()
  })

  it('运行期移除主题时撤销写入，回到静态默认表', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { seed: { primary: RED }, mode: 'dark' } }
    })
    await nextTick()
    // 暗色下常态色取暗色色阶的第 6 档
    expect(readVar('--va-primary-color')).toBe(derive({ primary: RED }, 'dark')['--va-primary-color'])
    expect(document.documentElement.getAttribute(MODE_ATTRIBUTE)).toBe('dark')

    await wrapper.setProps({ theme: {} })
    await nextTick()
    expect(readVar('--va-primary-color')).toBe('')
    expect(document.documentElement.hasAttribute(MODE_ATTRIBUTE)).toBe(false)
    wrapper.unmount()
  })

  it('按种子派生并写入 <html>，卸载后移除（回落静态默认表）', async () => {
    const wrapper = mount(ConfigProvider, { props: { abstract: true, theme: { seed: { primary: RED } } } })
    await nextTick()
    const expected = derive({ primary: RED }, 'light')
    expect(readVar('--va-primary-color')).toBe(RED)
    expect(readVar('--va-link-color')).toBe(expected['--va-link-color'])
    expect(readVar('--va-text-color-1')).toBe(expected['--va-text-color-1'])

    wrapper.unmount()
    expect(readVar('--va-primary-color')).toBe('')
    expect(readVar('--va-link-color')).toBe('')
  })

  it('只传 mode 时只写 data-va-mode，不写变量（交给静态暗色表）', async () => {
    const wrapper = mount(ConfigProvider, { props: { abstract: true, theme: { mode: 'dark' } } })
    await nextTick()
    expect(document.documentElement.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(htmlStyle().length).toBe(0)
    wrapper.unmount()
    expect(document.documentElement.hasAttribute(MODE_ATTRIBUTE)).toBe(false)
  })

  it('种子随模式重算：切 dark 时全量写入暗色值', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { seed: { primary: RED }, mode: 'light' } }
    })
    await nextTick()
    const lightValue = readVar('--va-bg-container-color')
    expect(lightValue).toBe(derive({ primary: RED }, 'light')['--va-bg-container-color'])

    await wrapper.setProps({ theme: { seed: { primary: RED }, mode: 'dark' } })
    await nextTick()
    expect(document.documentElement.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(readVar('--va-bg-container-color')).toBe(derive({ primary: RED }, 'dark')['--va-bg-container-color'])
    expect(readVar('--va-bg-container-color')).not.toBe(lightValue)
    wrapper.unmount()
  })

  it('卸载时恢复写入前的快照值，而不是一律移除', async () => {
    htmlStyle().setProperty('--va-primary-color', '#000000')
    const wrapper = mount(ConfigProvider, { props: { abstract: true, theme: { seed: { primary: RED } } } })
    await nextTick()
    expect(readVar('--va-primary-color')).toBe(RED)

    wrapper.unmount()
    expect(readVar('--va-primary-color')).toBe('#000000')
  })

  it('abstract: false 时变量写在包裹元素上，不改写 <html>（SSR 可序列化）', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED }, mode: 'dark' } }
    })
    await nextTick()
    const wrap = wrapper.find('.config-provider-wrap').element as HTMLElement
    expect(wrap.style.getPropertyValue('--va-primary-color')).toBe(
      derive({ primary: RED }, 'dark')['--va-primary-color']
    )
    expect(wrap.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(htmlStyle().length).toBe(0)
    wrapper.unmount()
  })

  it('mode="auto" 监听系统配色，变化时重写变量并在卸载后解除监听', async () => {
    const media = mockMatchMedia(true)
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { seed: { primary: RED }, mode: 'auto' } }
    })
    await nextTick()
    expect(document.documentElement.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(media.listenerCount()).toBe(1)

    media.setMatches(false)
    await nextTick()
    expect(document.documentElement.getAttribute(MODE_ATTRIBUTE)).toBe('light')
    expect(readVar('--va-bg-container-color')).toBe(derive({ primary: RED }, 'light')['--va-bg-container-color'])

    wrapper.unmount()
    expect(media.listenerCount()).toBe(0)
  })

  it('非法种子回退默认值并告警，其余字段照常派生', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { seed: { primary: 'not-a-color', success: GREEN } } }
    })
    await nextTick()
    expect(readVar('--va-primary-color')).toBe('#1677ff')
    expect(readVar('--va-success-color')).toBe(GREEN)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('theme.seed.primary 非法'))
    wrapper.unmount()
  })

  it('运行期就地改写 seed 即生效', async () => {
    const theme = reactive<{ seed: { primary: string } }>({ seed: { primary: RED } })
    const wrapper = mount(ConfigProvider, { props: { abstract: true, theme } })
    await nextTick()
    expect(readVar('--va-primary-color')).toBe(RED)

    theme.seed.primary = GREEN
    await nextTick()
    expect(readVar('--va-primary-color')).toBe(GREEN)
    wrapper.unmount()
  })

  it('createDiscreteApi 内部实例跳过 <html> 写入，不影响主应用变量', async () => {
    const { createDiscreteApi } = await import('components/discrete')
    const main = mount(ConfigProvider, { props: { abstract: true, theme: { seed: { primary: RED } } } })
    await nextTick()
    const appValue = readVar('--va-primary-color')

    const { dispose } = createDiscreteApi(['message'], {
      configProviderProps: { theme: { seed: { primary: GREEN } } }
    })
    await nextTick()
    expect(readVar('--va-primary-color')).toBe(appValue)

    dispose()
    expect(readVar('--va-primary-color')).toBe(appValue)
    main.unmount()
  })
})

describe('ConfigProvider 主题变更的写入成本', () => {
  it('每次变更全量写一次变量表（不做 diff 簿记）', async () => {
    const setProperty = vi.spyOn(CSSStyleDeclaration.prototype, 'setProperty')
    const wrapper = mount(ConfigProvider, { props: { theme: { seed: { primary: RED } } } })
    await nextTick()
    expect(setProperty.mock.calls.length).toBeLessThanOrEqual(THEME_VAR_NAMES.length)
    setProperty.mockClear()

    await wrapper.setProps({ theme: { seed: { primary: GREEN } } })
    await nextTick()
    expect(setProperty.mock.calls.length).toBe(THEME_VAR_NAMES.length)

    wrapper.unmount()
    setProperty.mockRestore()
  })
})

describe('嵌套 ConfigProvider 的作用域隔离', () => {
  it('内层变量写在自身包裹元素，外层与 <html> 均不受影响', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED } } },
      slots: {
        default: () =>
          h(
            ConfigProvider,
            { abstract: false, theme: { seed: { primary: GREEN } } },
            { default: () => h('span', { class: 'inner' }, 'inner') }
          )
      }
    })
    await nextTick()

    const wraps = wrapper.findAll('.config-provider-wrap')
    expect(wraps).toHaveLength(2)
    expect(wraps[0].element.style.getPropertyValue('--va-primary-color')).toBe(RED)
    expect(wraps[1].element.style.getPropertyValue('--va-primary-color')).toBe(GREEN)
    // 最外层是 abstract=false，故 <html> 不被写入
    expect(document.documentElement.style.getPropertyValue('--va-primary-color')).toBe('')
  })

  it('内层未显式传 mode 时继承外层模式（暗色区域内不再是浅色变量）', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED }, mode: 'dark' } },
      slots: {
        default: () =>
          h(
            ConfigProvider,
            { abstract: false, theme: { seed: { primary: GREEN } } },
            { default: () => h('span', 'inner') }
          )
      }
    })
    await nextTick()

    const inner = wrapper.findAll('.config-provider-wrap')[1].element as HTMLElement
    expect(inner.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(inner.style.getPropertyValue('--va-bg-container-color')).toBe(
      derive({ primary: GREEN }, 'dark')['--va-bg-container-color']
    )
  })

  it('内层未传 seed 时继承外层种子（只切暗色不会退回默认蓝）', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED }, mode: 'light' } },
      slots: {
        default: () =>
          h(ConfigProvider, { abstract: false, theme: { mode: 'dark' } }, { default: () => h('span', 'inner') })
      }
    })
    await nextTick()

    const inner = wrapper.findAll('.config-provider-wrap')[1].element as HTMLElement
    expect(inner.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(inner.style.getPropertyValue('--va-primary-color')).toBe(
      derive({ primary: RED }, 'dark')['--va-primary-color']
    )
  })

  it('内层显式传 seed 时整体替换外层种子', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED } } },
      slots: {
        default: () =>
          h(ConfigProvider, { abstract: false, theme: { seed: { primary: GREEN } } }, { default: () => h('span', 'x') })
      }
    })
    await nextTick()

    const inner = wrapper.findAll('.config-provider-wrap')[1].element as HTMLElement
    expect(inner.style.getPropertyValue('--va-primary-color')).toBe(GREEN)
  })

  it('内层显式传 light 时在暗色作用域内独立生效', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { mode: 'dark' } },
      slots: {
        default: () =>
          h(
            ConfigProvider,
            { abstract: false, theme: { seed: { primary: RED }, mode: 'light' } },
            { default: () => h('span', 'inner') }
          )
      }
    })
    await nextTick()

    const inner = wrapper.findAll('.config-provider-wrap')[1].element as HTMLElement
    expect(inner.getAttribute(MODE_ATTRIBUTE)).toBe('light')
    expect(inner.style.getPropertyValue('--va-bg-container-color')).toBe(
      derive({ primary: RED }, 'light')['--va-bg-container-color']
    )
  })

  it('嵌套在已生效的作用域内且无包裹元素时，不覆盖外层写入的变量（无法隔离，随外层生效）', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { seed: { primary: RED } } },
      slots: {
        default: () =>
          h(ConfigProvider, { abstract: true, theme: { seed: { primary: GREEN } } }, { default: () => h('span', 'x') })
      }
    })
    await nextTick()
    expect(document.documentElement.style.getPropertyValue('--va-primary-color')).toBe(RED)
    wrapper.unmount()
  })

  it('外层未配置主题时不占用最外层名额，内层仍可写 <html>', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: {} },
      slots: {
        default: () =>
          h(ConfigProvider, { abstract: true, theme: { seed: { primary: GREEN } } }, { default: () => h('span', 'x') })
      }
    })
    await nextTick()
    expect(document.documentElement.style.getPropertyValue('--va-primary-color')).toBe(GREEN)
    wrapper.unmount()
  })

  it('默认 abstract: false：渲染包裹元素，变量只写在包裹元素上', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { seed: { primary: RED }, mode: 'dark' } },
      slots: { default: () => h('span', 'content') }
    })
    await nextTick()
    const wrap = wrapper.find('.config-provider-wrap').element as HTMLElement
    expect(wrap.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(wrap.style.getPropertyValue('--va-primary-color')).toBe(
      derive({ primary: RED }, 'dark')['--va-primary-color']
    )
    expect(htmlStyle().length).toBe(0)
    wrapper.unmount()
  })

  it('只切 mode 且 abstract: false：只写 data-va-mode，不写内联变量（交给静态表）', async () => {
    const wrapper = mount(ConfigProvider, { props: { abstract: false, theme: { mode: 'dark' } } })
    await nextTick()
    const wrap = wrapper.find('.config-provider-wrap').element as HTMLElement
    expect(wrap.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(wrap.style.length).toBe(0)
    expect(htmlStyle().length).toBe(0)
    wrapper.unmount()
  })
})

describe('多个顶层实例写 <html> 的仲裁', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute(MODE_ATTRIBUTE)
  })
  afterEach(() => {
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute(MODE_ATTRIBUTE)
    vi.restoreAllMocks()
  })

  /** 渲染两个互为兄弟的顶层实例（父链上互不为祖先） */
  function mountSiblings(themeA: ConfigProviderTheme, themeB: ConfigProviderTheme) {
    return mount(
      defineComponent({
        data: () => ({ showFirst: true }),
        render(): unknown {
          return [
            this.showFirst
              ? h(ConfigProvider, { abstract: true, theme: themeA }, { default: () => h('span', 'a') })
              : null,
            h(ConfigProvider, { abstract: true, theme: themeB }, { default: () => h('span', 'b') })
          ]
        }
      })
    )
  }

  it('后挂载者成为 owner，且先挂载者卸载不会冲掉它的变量', async () => {
    const wrapper = mountSiblings({ seed: { primary: RED } }, { seed: { primary: GREEN } })
    await nextTick()
    expect(readVar('--va-primary-color')).toBe(GREEN)

    // 先挂载者卸载：不得把仍在挂载的实例写过的属性清掉
    wrapper.vm.showFirst = false
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(readVar('--va-primary-color')).toBe(GREEN)

    wrapper.unmount()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
  })

  it('最后一个 owner 卸载后不残留任何变量（恢复静态默认表）', async () => {
    const wrapper = mountSiblings({ seed: { primary: RED } }, { seed: { primary: GREEN } })
    await nextTick()
    wrapper.unmount()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
    THEME_VAR_NAMES.forEach((name) => {
      expect(readVar(name)).toBe('')
    })
  })

  it('新旧实例颜色不同：卸载先挂载者后，变量值始终来自仍在挂载的实例', async () => {
    const wrapper = mountSiblings({ seed: { primary: RED } }, { seed: { primary: GREEN } })
    await nextTick()
    expect(readVar('--va-primary-color')).toBe(GREEN)
    wrapper.vm.showFirst = false
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
    // 既不是被清空，也不是回退到先挂载者的值（旧实现的「幽灵残留」）
    expect(readVar('--va-primary-color')).toBe(GREEN)
    wrapper.unmount()
  })

  it('未配置主题的顶层实例不阻挡后面的实例成为 owner', async () => {
    const wrapper = mount(
      defineComponent({
        render(): unknown {
          return [
            h(ConfigProvider, { abstract: true }, { default: () => h('span', 'empty') }),
            h(
              ConfigProvider,
              { abstract: true, theme: { seed: { primary: GREEN } } },
              { default: () => h('span', 'x') }
            )
          ]
        }
      })
    )
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(readVar('--va-primary-color')).toBe(GREEN)
    wrapper.unmount()
  })

  it('运行期从不配置变为配置时仍能写入 <html>', async () => {
    const wrapper = mount(
      defineComponent({
        data: () => ({ theme: undefined as ConfigProviderTheme | undefined }),
        render(): unknown {
          return h(ConfigProvider, { abstract: true, theme: this.theme }, { default: () => h('span', 'x') })
        }
      })
    )
    await nextTick()
    expect(readVar('--va-primary-color')).toBe('')

    wrapper.vm.theme = { seed: { primary: RED } }
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(readVar('--va-primary-color')).toBe(RED)
    wrapper.unmount()
  })
})
