import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import Layout from 'components/layout'
import LayoutContent from 'components/layout/layout-content'
import LayoutFooter from 'components/layout/layout-footer'
import LayoutHeader from 'components/layout/layout-header'
import LayoutSider from 'components/layout/layout-sider'
import Menu from 'components/menu'

/**
 * Layout 复合组件回归守护
 *
 * 覆盖三类易回归点：① hasSider 由子级 Sider 登记推导（插槽内容嵌套多层时仍须识别）；
 * ② 收起状态的受控 / 非受控分支；③ 断点响应式与 zero-width 触发器的渲染分支。
 */

function setWindowWidth(width: number): void {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true })
}

async function resizeTo(width: number): Promise<void> {
  setWindowWidth(width)
  window.dispatchEvent(new Event('resize'))
  await nextTick()
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

describe('Layout - 根类名与 hasSider 推导', () => {
  it('五个组件的根类名均为 {组件名}-wrap 体系', () => {
    expect(mount(Layout).classes()).toContain('layout-wrap')
    expect(mount(LayoutHeader).classes()).toContain('layout-header-wrap')
    expect(mount(LayoutContent).classes()).toContain('layout-content-wrap')
    expect(mount(LayoutFooter).classes()).toContain('layout-footer-wrap')
    expect(mount(LayoutSider).classes()).toContain('layout-sider-wrap')
  })

  it('直接子级含 Sider 时切换为水平布局', async () => {
    wrapper = mount(Layout, { slots: { default: () => h(LayoutSider) } })
    // Sider 在自身 setup 中登记，父级随之切换布局方向，故需等一次更新
    await nextTick()
    expect(wrapper.classes()).toContain('layout-has-sider')
  })

  it('不含 Sider 时不切换', async () => {
    wrapper = mount(Layout, { slots: { default: () => h(LayoutHeader) } })
    await nextTick()
    expect(wrapper.classes()).not.toContain('layout-has-sider')
  })

  it('Sider 嵌套在普通元素内仍能识别', async () => {
    wrapper = mount(Layout, {
      slots: { default: () => h('div', { class: 'inner' }, [h(LayoutSider)]) }
    })
    await nextTick()
    expect(wrapper.classes()).toContain('layout-has-sider')
  })

  it('Sider 卸载后取消登记', async () => {
    const show = ref(true)
    const Host = defineComponent({
      setup: () => () => h(Layout, null, { default: () => (show.value ? [h(LayoutSider)] : []) })
    })
    wrapper = mount(Host)
    const layout = wrapper.findComponent(Layout)
    await nextTick()
    expect(layout.classes()).toContain('layout-has-sider')

    show.value = false
    await nextTick()
    expect(layout.classes()).not.toContain('layout-has-sider')
  })

  it('hasSider 显式指定时优先于自动推导', () => {
    wrapper = mount(Layout, {
      props: { hasSider: false },
      slots: { default: () => h(LayoutSider) }
    })
    expect(wrapper.classes()).not.toContain('layout-has-sider')
  })
})

describe('LayoutSider - 宽度与收起状态', () => {
  it('默认宽度 200px、默认 dark 主题', () => {
    wrapper = mount(LayoutSider)
    expect(wrapper.attributes('style')).toContain('width: 200px')
    expect(wrapper.classes()).toContain('layout-sider-dark')
  })

  it('width 支持字符串与主题切换', () => {
    wrapper = mount(LayoutSider, { props: { width: '20%', theme: 'light' } })
    expect(wrapper.attributes('style')).toContain('width: 20%')
    expect(wrapper.classes()).toContain('layout-sider-light')
  })

  it('width 传纯数字字符串时按 px 处理', () => {
    wrapper = mount(LayoutSider, { props: { width: '200' } })
    expect(wrapper.attributes('style')).toContain('width: 200px')
  })

  it('非受控时点击触发器自持收起状态', async () => {
    wrapper = mount(LayoutSider, { props: { collapsible: true } })
    expect(wrapper.attributes('style')).toContain('width: 200px')

    await wrapper.find('.layout-sider-trigger').trigger('click')
    expect(wrapper.attributes('style')).toContain('width: 80px')
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true])
    expect(wrapper.emitted('collapse')?.[0]).toEqual([true, 'clickTrigger'])
  })

  it('受控时点击只抛出事件，状态由外部驱动', async () => {
    wrapper = mount(LayoutSider, { props: { collapsible: true, collapsed: false } })
    await wrapper.find('.layout-sider-trigger').trigger('click')
    // 未回写内部状态：仍停留在展开态，等待外部更新 collapsed
    expect(wrapper.attributes('style')).toContain('width: 200px')
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true])

    await wrapper.setProps({ collapsed: true })
    expect(wrapper.attributes('style')).toContain('width: 80px')
  })

  it('defaultCollapsed 决定非受控初始态', () => {
    wrapper = mount(LayoutSider, { props: { collapsible: true, defaultCollapsed: true } })
    expect(wrapper.attributes('style')).toContain('width: 80px')
  })
})

describe('LayoutSider - 触发器渲染分支', () => {
  it('collapsedWidth 传 0 时渲染特殊触发器，且不再占用触发器高度', () => {
    wrapper = mount(LayoutSider, {
      props: { collapsible: true, collapsed: true, collapsedWidth: 0 }
    })
    expect(wrapper.classes()).toContain('layout-sider-zero-width')
    expect(wrapper.classes()).not.toContain('layout-sider-has-trigger')
    expect(wrapper.find('.layout-sider-zero-width-trigger').exists()).toBe(true)
    expect(wrapper.find('.layout-sider-trigger').exists()).toBe(false)
  })

  it('reverseArrow 时特殊触发器出现在右侧', () => {
    wrapper = mount(LayoutSider, {
      props: { collapsible: true, collapsed: true, collapsedWidth: 0, reverseArrow: true }
    })
    expect(wrapper.find('.layout-sider-zero-width-trigger-right').exists()).toBe(true)
  })

  it('trigger 传 null 时隐藏触发器', () => {
    wrapper = mount(LayoutSider, { props: { collapsible: true, trigger: null } })
    expect(wrapper.find('.layout-sider-trigger').exists()).toBe(false)
    expect(wrapper.classes()).not.toContain('layout-sider-has-trigger')
  })

  it('trigger 插槽优先于默认图标', () => {
    wrapper = mount(LayoutSider, {
      props: { collapsible: true },
      slots: { trigger: () => h('span', { class: 'my-trigger' }, '收起') }
    })
    expect(wrapper.find('.layout-sider-trigger .my-trigger').exists()).toBe(true)
  })

  it('不可收起且未配置断点时默认不渲染触发器', () => {
    wrapper = mount(LayoutSider)
    expect(wrapper.find('.layout-sider-trigger').exists()).toBe(false)
  })
})

describe('LayoutSider - 断点响应式', () => {
  it('初始视窗低于断点时应自动收起并抛出 breakpoint / collapse', async () => {
    setWindowWidth(800)
    wrapper = mount(LayoutSider, { props: { collapsible: true, breakpoint: 'lg' } })
    expect(wrapper.emitted('breakpoint')?.[0]).toEqual([true])
    expect(wrapper.emitted('collapse')?.[0]).toEqual([true, 'responsive'])

    await nextTick()
    expect(wrapper.attributes('style')).toContain('width: 80px')
  })

  it('resize 跌破 / 回到断点上方时同步收起状态', async () => {
    setWindowWidth(1200)
    wrapper = mount(LayoutSider, { props: { collapsible: true, breakpoint: 'lg' } })
    expect(wrapper.attributes('style')).toContain('width: 200px')

    await resizeTo(800)
    expect(wrapper.attributes('style')).toContain('width: 80px')

    await resizeTo(1200)
    expect(wrapper.attributes('style')).toContain('width: 200px')
  })

  it('collapsedWidth 支持响应式对象', async () => {
    setWindowWidth(800)
    wrapper = mount(LayoutSider, {
      props: { collapsible: true, collapsed: true, collapsedWidth: { lg: 80, xl: 120 } }
    })
    expect(wrapper.attributes('style')).toContain('width: 80px')

    await resizeTo(1300)
    expect(wrapper.attributes('style')).toContain('width: 120px')
  })

  it('未配置 breakpoint 时不参与响应式收起', () => {
    setWindowWidth(320)
    wrapper = mount(LayoutSider, { props: { collapsible: true } })
    expect(wrapper.emitted('breakpoint')).toBeUndefined()
    expect(wrapper.attributes('style')).toContain('width: 200px')
  })

  it('未开启 collapsible 时断点收起同样收窄到 collapsedWidth', async () => {
    setWindowWidth(800)
    // 宽度只由收起状态决定，与「是否可点击收起」无关（响应式用例即此形态）
    wrapper = mount(LayoutSider, { props: { breakpoint: 'lg', collapsedWidth: 0 } })
    await nextTick()
    expect(wrapper.classes()).toContain('layout-sider-below')
    expect(wrapper.attributes('style')).toContain('width: 0px')
    expect(wrapper.find('.layout-sider-zero-width-trigger').exists()).toBe(true)
  })
})

describe('LayoutSider - 与 Menu 的收起联动', () => {
  it('侧边栏收起时内嵌 Menu 同步收起，无需显式 inlineCollapsed', () => {
    wrapper = mount(LayoutSider, {
      props: { collapsed: true },
      slots: { default: () => h(Menu, { mode: 'inline' }) }
    })
    expect(wrapper.findComponent(Menu).classes()).toContain('menu-inline-collapsed')
  })

  it('侧边栏展开时覆盖 Menu 自身的 inlineCollapsed', () => {
    wrapper = mount(LayoutSider, {
      props: { collapsed: false },
      slots: { default: () => h(Menu, { mode: 'inline', inlineCollapsed: true }) }
    })
    expect(wrapper.findComponent(Menu).classes()).not.toContain('menu-inline-collapsed')
  })

  it('点击触发器收起后内嵌 Menu 跟随', async () => {
    wrapper = mount(LayoutSider, {
      props: { collapsible: true },
      slots: { default: () => h(Menu, { mode: 'inline' }) }
    })
    expect(wrapper.findComponent(Menu).classes()).not.toContain('menu-inline-collapsed')

    await wrapper.find('.layout-sider-trigger').trigger('click')
    expect(wrapper.findComponent(Menu).classes()).toContain('menu-inline-collapsed')
  })

  it('断点触发收起时内嵌 Menu 同步收起', async () => {
    setWindowWidth(800)
    wrapper = mount(LayoutSider, {
      props: { breakpoint: 'lg' },
      slots: { default: () => h(Menu, { mode: 'inline' }) }
    })
    await nextTick()
    expect(wrapper.findComponent(Menu).classes()).toContain('menu-inline-collapsed')
  })

  it('侧边栏之外的 Menu 仍以自身 inlineCollapsed 为准', () => {
    wrapper = mount(Menu, { props: { mode: 'inline', inlineCollapsed: true } })
    expect(wrapper.classes()).toContain('menu-inline-collapsed')
  })
})
