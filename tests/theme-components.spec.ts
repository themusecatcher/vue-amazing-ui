import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { defineComponent, h, inject, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import { themeTeleportKey } from 'components/config-provider/context'
import { derive, deriveColorStates, MODE_ATTRIBUTE } from 'components/theme'
import type { ConfigProviderTheme } from 'components/config-provider'

/**
 * 组件级主色：ConfigProvider 把 `theme.components.<Component>.primaryColor`
 * 映射为组件消费的 CSS 变量（有公开令牌的组件走 `--va-<component>-*`，
 * 其余组件走内部桥 `--va-cp-<component>-primary-*`），组件本身不持有主题逻辑。
 *
 * 断言口径：
 * - 组件配置优先于 seed；
 * - 运行期增删组件配置会写入 / 恢复；
 * - 暗色按暗色色阶派生；
 * - 未支持组件与非法色只告警、不写变量；
 * - Teleport 转发同时携带全局令牌与组件级令牌。
 */
const RED = '#f5222d'
const GREEN = '#18a058'

const styleOf = (element: Element): CSSStyleDeclaration => (element as HTMLElement).style
const buttonBase = (color: string, mode: 'light' | 'dark' = 'light'): string => deriveColorStates(color, mode).base
const sliderTrack = (color: string, mode: 'light' | 'dark' = 'light'): string => deriveColorStates(color, mode).border

/** 读取 Teleport 转发通道里的指定令牌 */
const TeleportProbe = defineComponent({
  name: 'ComponentThemeTeleportProbe',
  props: { name: { type: String, required: true } },
  setup(props) {
    const teleportTheme = inject(themeTeleportKey, null)
    return () =>
      h('i', {
        class: 'component-theme-probe',
        'data-value': teleportTheme?.value?.vars?.[props.name] ?? ''
      })
  }
})

function resetDocument(): void {
  document.documentElement.removeAttribute('style')
  document.documentElement.removeAttribute(MODE_ATTRIBUTE)
  document.body.innerHTML = ''
}

describe('ConfigProvider 组件级主色', () => {
  beforeEach(() => {
    resetDocument()
  })
  afterEach(() => {
    resetDocument()
    vi.restoreAllMocks()
  })

  it('abstract: false 把组件令牌写到包裹元素，且优先于 seed', async () => {
    const theme: ConfigProviderTheme = {
      seed: { primary: RED },
      components: { Button: { primaryColor: GREEN }, Slider: { primaryColor: GREEN } }
    }
    const wrapper = mount(ConfigProvider, { props: { theme }, slots: { default: () => h('div') } })
    await nextTick()

    const style = styleOf(wrapper.element)
    expect(style.getPropertyValue('--va-primary-color')).toBe(RED)
    expect(style.getPropertyValue('--va-button-primary-color')).toBe(buttonBase(GREEN))
    expect(style.getPropertyValue('--va-button-primary-color-hover')).toBe(deriveColorStates(GREEN).hover)
    expect(style.getPropertyValue('--va-slider-track-color')).toBe(sliderTrack(GREEN))
    // 未登记 themeRole 的中性令牌不被组件配置改写
    expect(style.getPropertyValue('--va-slider-rail-color')).toBe('')
    wrapper.unmount()
  })

  it('组件主色接受 #rrggbbff（与 seed 同一归一化口径）', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Button: { primaryColor: '#18a058ff' } } } }
    })
    await nextTick()

    expect(styleOf(wrapper.element).getPropertyValue('--va-button-primary-color')).toBe(buttonBase(GREEN))
    wrapper.unmount()
  })

  it('有 themeRole 的组件同时写桥与公开令牌（桥是统一格式的冗余写入）', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Button: { primaryColor: GREEN } } } }
    })
    await nextTick()

    const style = styleOf(wrapper.element)
    // 两条通道指向同一份派生结果：组件样式只读公开令牌，桥对 Button 不参与计算
    expect(style.getPropertyValue('--va-cp-button-primary-color')).toBe(buttonBase(GREEN))
    expect(style.getPropertyValue('--va-button-primary-color')).toBe(buttonBase(GREEN))
    wrapper.unmount()
  })

  it('公开令牌映射组件仍可消费桥：Slider 的聚焦边框依赖桥，不能按 themeRole 裁剪', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Slider: { primaryColor: GREEN } } } }
    })
    await nextTick()

    expect(styleOf(wrapper.element).getPropertyValue('--va-cp-slider-primary-border-color')).toBe(
      deriveColorStates(GREEN).border
    )
    wrapper.unmount()
  })

  it('abstract: true 与 seed 同层时把组件令牌写到 <html>', async () => {
    const theme: ConfigProviderTheme = {
      seed: { primary: RED },
      components: { Button: { primaryColor: GREEN } }
    }
    const wrapper = mount(ConfigProvider, { props: { abstract: true, theme } })
    await nextTick()

    expect(document.documentElement.style.getPropertyValue('--va-button-primary-color')).toBe(buttonBase(GREEN))
    expect(document.documentElement.style.getPropertyValue('--va-primary-color')).toBe(RED)
    wrapper.unmount()
    expect(document.documentElement.style.getPropertyValue('--va-button-primary-color')).toBe('')
  })

  it('只有组件配置时 abstract: false 只写组件令牌，不写全局令牌', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Button: { primaryColor: GREEN } } } }
    })
    await nextTick()

    const style = styleOf(wrapper.element)
    expect(style.getPropertyValue('--va-button-primary-color')).toBe(buttonBase(GREEN))
    expect(style.getPropertyValue('--va-primary-color')).toBe('')
    // 没有 seed / 显式 mode 时不声明模式，避免静态表遮蔽宿主对 :root 的覆盖
    expect(wrapper.element.hasAttribute(MODE_ATTRIBUTE)).toBe(false)
    wrapper.unmount()
  })

  it('运行期移除组件配置时撤销写入，回落到 seed', async () => {
    const theme = {
      seed: { primary: RED },
      components: { Button: { primaryColor: GREEN } }
    }
    const wrapper = mount(ConfigProvider, { props: { theme } })
    await nextTick()
    expect(styleOf(wrapper.element).getPropertyValue('--va-button-primary-color')).toBe(buttonBase(GREEN))

    await wrapper.setProps({ theme: { seed: { primary: RED } } })
    await nextTick()
    expect(styleOf(wrapper.element).getPropertyValue('--va-button-primary-color')).toBe('')
    expect(styleOf(wrapper.element).getPropertyValue('--va-primary-color')).toBe(RED)
    wrapper.unmount()
  })

  it('暗色下按暗色色阶派生组件令牌', async () => {
    const theme: ConfigProviderTheme = {
      mode: 'dark',
      components: { Slider: { primaryColor: GREEN } }
    }
    const wrapper = mount(ConfigProvider, { props: { theme } })
    await nextTick()

    expect(styleOf(wrapper.element).getPropertyValue('--va-slider-track-color')).toBe(sliderTrack(GREEN, 'dark'))
    wrapper.unmount()
  })

  it('嵌套作用域：内层组件配置覆盖外层', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { seed: { primary: RED }, components: { Button: { primaryColor: RED } } } },
      slots: {
        default: () =>
          h(
            ConfigProvider,
            { theme: { components: { Button: { primaryColor: GREEN } } } },
            { default: () => h('div', { class: 'inner-content' }) }
          )
      }
    })
    await nextTick()

    const innerWrap = wrapper.find('.inner-content').element.parentElement as HTMLElement
    expect(styleOf(wrapper.element).getPropertyValue('--va-button-primary-color')).toBe(buttonBase(RED))
    expect(styleOf(innerWrap).getPropertyValue('--va-button-primary-color')).toBe(buttonBase(GREEN))
    wrapper.unmount()
  })

  it('非法色只告警并忽略该组件配置，不写组件令牌', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(ConfigProvider, {
      props: { theme: { seed: { primary: RED }, components: { Button: { primaryColor: 'red' } } } }
    })
    await nextTick()

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('theme.components.Button.primaryColor 非法'))
    expect(styleOf(wrapper.element).getPropertyValue('--va-button-primary-color')).toBe('')
    wrapper.unmount()
  })

  it('支持 Menu 的组件级主色桥', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Menu: { primaryColor: GREEN } } } }
    })
    await nextTick()

    const style = styleOf(wrapper.element)
    expect(style.getPropertyValue('--va-menu-primary-color')).toBe(buttonBase(GREEN))
    expect(style.getPropertyValue('--va-menu-primary-palette')).toBe(deriveColorStates(GREEN).bg)
    wrapper.unmount()
  })

  it('支持无公开令牌的组件：写内部桥变量', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Switch: { primaryColor: GREEN } } } }
    })
    await nextTick()

    const style = styleOf(wrapper.element)
    expect(style.getPropertyValue('--va-cp-switch-primary-color')).toBe(buttonBase(GREEN))
    expect(style.getPropertyValue('--va-cp-switch-primary-color-hover')).toBe(deriveColorStates(GREEN).hover)
    expect(style.getPropertyValue('--va-cp-switch-primary-bg-color')).toBe(deriveColorStates(GREEN).bg)
    expect(style.getPropertyValue('--va-cp-switch-focus-shadow')).toBe(
      derive({ primary: GREEN }, 'light')['--va-focus-shadow']
    )
    wrapper.unmount()
  })

  it('未支持的组件键只告警，不写任何令牌', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(ConfigProvider, {
      // 故意越界：验证运行期对未登记键的降级（类型层面已由 ThemeComponentKey 拒绝）
      props: {
        theme: { components: { Divider: { primaryColor: GREEN } } } as unknown as ConfigProviderTheme
      }
    })
    await nextTick()

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('theme.components.Divider 暂不支持组件级主色'))
    expect(styleOf(wrapper.element).getPropertyValue('--va-cp-divider-primary-color')).toBe('')
    wrapper.unmount()
  })

  it('只有组件配置的 abstract: true 不写 <html>，并给出用法告警', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { components: { Button: { primaryColor: GREEN } } } }
    })
    await nextTick()

    expect(document.documentElement.style.getPropertyValue('--va-button-primary-color')).toBe('')
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('theme.components 在 abstract: true 时需与 seed / mode 同层')
    )
    wrapper.unmount()
  })

  it('abstract: true + mode + components（无 seed）也写桥变量与模式属性', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { mode: 'dark', components: { Switch: { primaryColor: GREEN } } } }
    })
    await nextTick()

    const html = document.documentElement
    expect(html.style.getPropertyValue('--va-cp-switch-primary-color')).toBe(deriveColorStates(GREEN, 'dark').base)
    expect(html.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    wrapper.unmount()
  })

  it('Teleport 转发同时携带全局令牌与组件令牌', async () => {
    const wrapper = mount(ConfigProvider, {
      props: {
        theme: { seed: { primary: RED }, components: { Button: { primaryColor: GREEN } } },
        abstract: false
      },
      slots: {
        default: () => h(TeleportProbe, { name: '--va-button-primary-color' })
      }
    })
    await nextTick()

    expect(wrapper.find('.component-theme-probe').attributes('data-value')).toBe(buttonBase(GREEN))
    wrapper.unmount()
  })

  it('seed 的派生值不因组件配置而改变', async () => {
    const theme: ConfigProviderTheme = {
      seed: { primary: RED },
      components: { Button: { primaryColor: GREEN } }
    }
    const wrapper = mount(ConfigProvider, { props: { theme } })
    await nextTick()

    const expected = derive({ primary: RED }, 'light')
    expect(styleOf(wrapper.element).getPropertyValue('--va-link-color')).toBe(expected['--va-link-color'])
    expect(styleOf(wrapper.element).getPropertyValue('--va-text-color-1')).toBe(expected['--va-text-color-1'])
    wrapper.unmount()
  })
})
