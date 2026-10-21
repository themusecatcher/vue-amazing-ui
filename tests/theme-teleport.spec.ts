import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, inject, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import Popup from 'components/popup/Popup.vue'
import Modal from 'components/modal/Modal.vue'
import { THEME_TELEPORT_KEY } from 'components/config-provider/context'
import { derive, MODE_ATTRIBUTE } from 'components/theme'

/**
 * Teleport 浮层的主题转发
 *
 * 变量写在包裹元素上（`abstract: false`）时，Teleport 到 body 的浮层拿不到 DOM 继承，
 * 必须由 Provider 经 `THEME_TELEPORT_KEY` 把当前作用域的令牌与模式转发到浮层根节点。
 * 写在 `<html>` 上的全局 owner 不转发，避免无谓的内联样式。
 */
const RED = '#f5222d'
const GREEN = '#18a058'

/** 读取转发通道的探针：只断言通道内容，不依赖具体组件 */
const Probe = defineComponent({
  name: 'ThemeProbe',
  setup() {
    const teleportTheme = inject(THEME_TELEPORT_KEY, null)
    return () =>
      h('i', {
        class: 'theme-probe',
        'data-forwarded': teleportTheme?.value ? 'yes' : 'no',
        'data-mode': teleportTheme?.value?.mode ?? '',
        'data-has-primary': teleportTheme?.value?.vars['--va-primary-color'] ? 'yes' : 'no'
      })
  }
})

const darkRed = (): string => derive({ primary: RED }, 'dark')['--va-primary-color']

function resetDocument(): void {
  document.documentElement.removeAttribute('style')
  document.documentElement.removeAttribute(MODE_ATTRIBUTE)
}

describe('Teleport 浮层的主题转发', () => {
  beforeEach(() => {
    resetDocument()
    document.body.innerHTML = ''
  })
  afterEach(() => {
    resetDocument()
    document.body.innerHTML = ''
  })

  it('DOM 作用域（abstract: false）向下游提供转发通道', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED }, mode: 'dark' } },
      slots: { default: () => h(Probe) }
    })
    await nextTick()
    const probe = wrapper.find('.theme-probe').element as HTMLElement
    expect(probe.getAttribute('data-forwarded')).toBe('yes')
    expect(probe.getAttribute('data-mode')).toBe('dark')
    wrapper.unmount()
  })

  it('全局 owner（abstract: true）不转发：浮层直接继承 <html>', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { seed: { primary: RED }, mode: 'dark' } },
      slots: { default: () => h(Probe) }
    })
    await nextTick()
    await nextTick()
    const probe = wrapper.find('.theme-probe').element as HTMLElement
    expect(probe.getAttribute('data-forwarded')).toBe('no')
    wrapper.unmount()
  })

  it('未配置主题且无祖先作用域时不转发（静态表兜底）', async () => {
    const wrapper = mount(ConfigProvider, { slots: { default: () => h(Probe) } })
    await nextTick()
    expect(wrapper.find('.theme-probe').attributes('data-forwarded')).toBe('no')
    wrapper.unmount()
  })

  it('嵌套作用域转发自己的种子与模式，而不是外层的', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: true, theme: { seed: { primary: RED }, mode: 'light' } },
      slots: {
        default: () =>
          h(
            ConfigProvider,
            { abstract: false, theme: { seed: { primary: GREEN }, mode: 'dark' } },
            {
              default: () => h(Probe)
            }
          )
      }
    })
    await nextTick()
    await nextTick()
    const probe = wrapper.find('.theme-probe').element as HTMLElement
    expect(probe.getAttribute('data-forwarded')).toBe('yes')
    expect(probe.getAttribute('data-mode')).toBe('dark')
    wrapper.unmount()
  })

  it('Popup 的 Teleport 根节点自带当前作用域变量与模式', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED }, mode: 'dark' } },
      slots: {
        default: () => h(Popup, { show: true, to: 'body', defaultZIndex: 1000 }, { default: () => h('span', 'panel') })
      }
    })
    await nextTick()

    const container = document.body.querySelector('.va-popup-container') as HTMLElement
    expect(container).toBeTruthy()
    expect(container.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(container.style.getPropertyValue('--va-primary-color')).toBe(darkRed())
    wrapper.unmount()
  })

  it('只配 components 时不转发全局令牌：不覆盖宿主在 <html> 上的纯 CSS 主题', async () => {
    document.documentElement.style.setProperty('--va-primary-color', '#ff0000')
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Table: { primaryColor: GREEN } } } },
      slots: { default: () => h(Probe) }
    })
    await nextTick()

    const probe = wrapper.find('.theme-probe').element as HTMLElement
    expect(probe.getAttribute('data-forwarded')).toBe('yes')
    // 没有生效种子时不带 snapshot：浮层继续继承 <html> 上的宿主值
    expect(probe.getAttribute('data-has-primary')).toBe('no')
    wrapper.unmount()
  })

  it('只配 components 且未传 mode 时不下发模式属性（继续继承 <html>）', async () => {
    document.documentElement.setAttribute(MODE_ATTRIBUTE, 'dark')
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Table: { primaryColor: GREEN } } } },
      slots: { default: () => h(Probe) }
    })
    await nextTick()

    const probe = wrapper.find('.theme-probe').element as HTMLElement
    expect(probe.getAttribute('data-forwarded')).toBe('yes')
    // 不写 data-va-mode：宿主用纯 CSS 切的暗色不会被强制改成 light
    expect(probe.getAttribute('data-mode')).toBe('')
    wrapper.unmount()
  })

  it('没有可转发内容时不建立通道（非法组件主色 + 无种子）', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: { components: { Button: { primaryColor: '#18a05880' } } } },
      slots: { default: () => h(Probe) }
    })
    await nextTick()

    // 半透明主色被忽略 → 没有组件变量、没有种子、没有显式 mode，浮层直接继承 <html>
    expect(wrapper.find('.theme-probe').attributes('data-forwarded')).toBe('no')
    wrapper.unmount()
  })

  it('Modal 的 Teleport 根节点自带当前作用域变量', async () => {
    const wrapper = mount(ConfigProvider, {
      props: { abstract: false, theme: { seed: { primary: RED }, mode: 'dark' } },
      slots: { default: () => h(Modal, { open: true }, { default: () => 'content' }) }
    })
    await nextTick()
    await nextTick()

    const modalWrap = document.body.querySelector('.modal-wrap') as HTMLElement
    expect(modalWrap).toBeTruthy()
    expect(modalWrap.getAttribute(MODE_ATTRIBUTE)).toBe('dark')
    expect(modalWrap.style.getPropertyValue('--va-primary-color')).toBe(darkRed())
    wrapper.unmount()
  })
})
