import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import Tabs from 'components/tabs/Tabs.vue'
import TabPane from 'components/tabs/tab-pane'
import Dropdown from 'components/dropdown'
import { getCenterScroll } from 'components/tabs/scroll'

const makeTab = (key: string | number | undefined, tab: string, content: string, disabled = false) => {
  const props: Record<string, unknown> = { tab, disabled }
  if (key !== undefined) {
    props.key = key
  }
  return h(TabPane, props, { default: () => content })
}

describe('Tabs 组件式用法', () => {
  it('按 TabPane 渲染导航与面板，并高亮 activeKey 对应的页签', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '2' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'Content 1'), makeTab('2', 'Tab 2', 'Content 2')] }
    })
    const items = wrapper.findAll('.tab-item')
    expect(items.length).toBe(2)
    expect(items.map((item) => item.text())).toEqual(['Tab 1', 'Tab 2'])
    expect(items[1].classes()).toContain('tab-line-active')
    expect(wrapper.findAll('.tabs-content').length).toBe(2)
    expect(wrapper.text()).toContain('Content 1')
    expect(wrapper.text()).toContain('Content 2')
    wrapper.unmount()
  })

  it('card 类型点亮 tab-card-active', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1', type: 'card' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'Content 1')] }
    })
    expect(wrapper.find('.tab-item').classes()).toContain('tab-card-active')
    expect(wrapper.find('.tab-bar').classes()).toContain('card-hidden')
    wrapper.unmount()
  })

  it('未写 key 时按下标兜底绑定 activeKey', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: 1 },
      slots: { default: () => [makeTab(undefined, 'Tab 1', 'C1'), makeTab(undefined, 'Tab 2', 'C2')] }
    })
    expect(wrapper.findAll('.tab-item')[1].classes()).toContain('tab-line-active')
    wrapper.unmount()
  })

  it('点击页签抛出 update:activeKey 与 change', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
    })
    await wrapper.findAll('.tab-item')[1].trigger('click')
    expect(wrapper.emitted('update:activeKey')?.[0]).toEqual(['2'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['2'])
    wrapper.unmount()
  })

  it('禁用页签点击不切换', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2', true)] }
    })
    const disabledItem = wrapper.findAll('.tab-item')[1]
    expect(disabledItem.classes()).toContain('tab-disabled')
    await disabledItem.trigger('click')
    expect(wrapper.emitted('update:activeKey')).toBeUndefined()
    wrapper.unmount()
  })

  it('自定义页签插槽优先于 tab 属性', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: {
        default: () => [h(TabPane, { key: '1', tab: '文字' }, { default: () => 'C1', tab: () => h('b', '自定义页签') })]
      }
    })
    expect(wrapper.find('.tab-item').text()).toBe('自定义页签')
    wrapper.unmount()
  })

  it('v-for 产生的 Fragment 展平为页签列表', () => {
    const list = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
      { id: 'c', label: 'C' }
    ]
    const wrapper = mount(Tabs, {
      props: { activeKey: 'b' },
      slots: { default: () => list.map((item) => makeTab(item.id, item.label, `${item.label} 内容`)) }
    })
    const items = wrapper.findAll('.tab-item')
    expect(items.length).toBe(3)
    expect(items[1].classes()).toContain('tab-line-active')
    wrapper.unmount()
  })

  it('页签内的动态字面量随父组件重渲染更新', async () => {
    const label = ref('Tab 1')
    const content = ref('Content 1')
    const Parent = defineComponent({
      setup() {
        return () =>
          h(
            Tabs,
            { activeKey: '1' },
            {
              default: () => [h(TabPane, { key: '1', tab: label.value }, { default: () => content.value })]
            }
          )
      }
    })
    const wrapper = mount(Parent)
    expect(wrapper.find('.tab-item').text()).toBe('Tab 1')
    label.value = 'Tab 1 改名'
    content.value = '内容改名'
    await nextTick()
    expect(wrapper.find('.tab-item').text()).toBe('Tab 1 改名')
    expect(wrapper.find('.tabs-content').text()).toBe('内容改名')
    wrapper.unmount()
  })
})

describe('Tabs 增强能力', () => {
  it('未传 activeKey 时由 defaultActiveKey 决定初始激活项，点击后内部状态自更新', async () => {
    const wrapper = mount(Tabs, {
      props: { defaultActiveKey: '2' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
    })
    expect(wrapper.findAll('.tab-item')[1].classes()).toContain('tab-line-active')
    await wrapper.findAll('.tab-item')[0].trigger('click')
    expect(wrapper.findAll('.tab-item')[0].classes()).toContain('tab-line-active')
    wrapper.unmount()
  })

  it('点击页签抛出 tabClick，禁用项也抛出但不切换', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2', true)] }
    })
    await wrapper.findAll('.tab-item')[1].trigger('click')
    expect(wrapper.emitted('tabClick')?.[0]?.[0]).toBe('2')
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('键盘方向键切换页签并跳过禁用项', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: {
        default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2', true), makeTab('3', 'Tab 3', 'C3')]
      }
    })
    await wrapper.findAll('.tab-item')[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('change')?.[0]).toEqual(['3'])
    await wrapper.findAll('.tab-item')[2].trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('change')?.[1]).toEqual(['1'])
    wrapper.unmount()
  })

  it('closable 页签渲染关闭按钮，点击抛出 close 且不切换', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: {
        default: () => [
          h(TabPane, { key: '1', tab: 'Tab 1', closable: true }, { default: () => 'C1' }),
          makeTab('2', 'Tab 2', 'C2')
        ]
      }
    })
    const closeBtn = wrapper.find('.tab-close')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')?.[0]).toEqual(['1'])
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('addable 渲染新增按钮，点击抛出 add 且支持自定义图标插槽', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1', addable: true },
      slots: {
        default: () => [makeTab('1', 'Tab 1', 'C1')],
        addIcon: () => h('i', { class: 'custom-add-icon' })
      }
    })
    const addBtn = wrapper.find('.tab-add')
    expect(addBtn.exists()).toBe(true)
    expect(addBtn.find('.custom-add-icon').exists()).toBe(true)
    await addBtn.trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
    wrapper.unmount()
  })

  it('destroyInactiveTabPane 后非激活面板不渲染内容', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1', destroyInactiveTabPane: true },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
    })
    const panels = wrapper.findAll('.tabs-content')
    expect(panels.length).toBe(2)
    expect(panels[0].text()).toBe('C1')
    expect(panels[1].text()).toBe('')
    wrapper.unmount()
  })

  it('输出 tablist / tab / tabpanel 语义与 aria 关联', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '2' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
    })
    const navList = wrapper.find('.tabs-nav-list')
    expect(navList.attributes('role')).toBe('tablist')
    expect(navList.attributes('aria-orientation')).toBe('horizontal')
    const items = wrapper.findAll('.tab-item')
    expect(items[0].attributes('role')).toBe('tab')
    expect(items[0].attributes('aria-selected')).toBe('false')
    expect(items[1].attributes('aria-selected')).toBe('true')
    expect(items[1].attributes('tabindex')).toBe('0')
    const panel = wrapper.findAll('.tabs-content')[1]
    expect(panel.attributes('role')).toBe('tabpanel')
    expect(panel.attributes('aria-labelledby')).toBe(items[1].attributes('id'))
    expect(items[1].attributes('aria-controls')).toBe(panel.attributes('id'))
    wrapper.unmount()
  })

  it('页签横向滚动时抛出 tabScroll 及其方向', async () => {
    // 只有导航区超出容器才开启滚动，故按类名伪造宽度
    const widthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement
    ) {
      return this.classList.contains('tabs-nav-list') ? 200 : 100
    })
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
    })
    await nextTick()
    const nav = wrapper.find('.tabs-nav-list')
    // 事件构造器不带 deltaX，需显式定义后再派发
    const fireWheel = (deltaX: number) => {
      const wheelEvent = new WheelEvent('wheel', { bubbles: true })
      Object.defineProperty(wheelEvent, 'deltaX', { value: deltaX })
      nav.element.dispatchEvent(wheelEvent)
    }
    fireWheel(50)
    await nextTick()
    fireWheel(-50)
    await nextTick()
    expect(wrapper.emitted('tabScroll')).toEqual([[{ direction: 'right' }], [{ direction: 'left' }]])
    widthSpy.mockRestore()
    wrapper.unmount()
  })

  it('鼠标滚轮（仅 deltaY）也能横向滚动页签', async () => {
    const widthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement
    ) {
      return this.classList.contains('tabs-nav-list') ? 200 : 100
    })
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
    })
    await nextTick()
    const nav = wrapper.find('.tabs-nav-list')
    const fireWheel = (deltaY: number) => {
      const wheelEvent = new WheelEvent('wheel', { bubbles: true })
      Object.defineProperty(wheelEvent, 'deltaY', { value: deltaY })
      nav.element.dispatchEvent(wheelEvent)
    }
    fireWheel(50)
    await nextTick()
    fireWheel(-50)
    await nextTick()
    expect(wrapper.emitted('tabScroll')).toEqual([[{ direction: 'right' }], [{ direction: 'left' }]])
    widthSpy.mockRestore()
    wrapper.unmount()
  })

  it('tabBar 插槽替换内置导航，change 可回写页签', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: {
        default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')],
        tabBar: ({ change }: { change: (key: string | number) => void }) =>
          h('button', { class: 'custom-bar', onClick: () => change('2') }, '自定义页签头')
      }
    })
    expect(wrapper.find('.tabs-nav-list').exists()).toBe(false)
    expect(wrapper.find('.custom-bar').exists()).toBe(true)
    await wrapper.find('.custom-bar').trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual(['2'])
    expect(wrapper.findAll('.tabs-content').length).toBe(2)
    wrapper.unmount()
  })

  it('animated 默认关闭：非激活面板 display:none，且不挂动画类', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1' },
      slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
    })
    const panels = wrapper.findAll('.tabs-content')
    expect(panels[0].attributes('style')).toBeUndefined()
    expect(panels[1].attributes('style')).toContain('display: none')
    expect(wrapper.find('.tabs-content-animated').exists()).toBe(false)
    wrapper.unmount()
  })
})

describe('Tabs 能力对齐（beforeLeave / displayDirective / justifyContent / addable / 类名）', () => {
  const twoTabs = () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')]

  it('beforeLeave 同步返回 false 时取消切换', async () => {
    const beforeLeave = vi.fn(() => false)
    const wrapper = mount(Tabs, { props: { defaultActiveKey: '1', beforeLeave }, slots: { default: twoTabs } })
    await wrapper.findAll('.tab-item')[1].trigger('click')
    expect(beforeLeave).toHaveBeenCalledWith('2', '1')
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.findAll('.tab-item')[1].classes()).not.toContain('tab-line-active')
    wrapper.unmount()
  })

  it('beforeLeave 异步 resolve false 取消、resolve true 放行', async () => {
    const deny = mount(Tabs, {
      props: { defaultActiveKey: '1', beforeLeave: () => Promise.resolve(false) },
      slots: { default: twoTabs }
    })
    await deny.findAll('.tab-item')[1].trigger('click')
    await flushPromises()
    expect(deny.emitted('change')).toBeUndefined()
    deny.unmount()

    const allow = mount(Tabs, {
      props: { defaultActiveKey: '1', beforeLeave: () => Promise.resolve(true) },
      slots: { default: twoTabs }
    })
    await allow.findAll('.tab-item')[1].trigger('click')
    await flushPromises()
    expect(allow.emitted('change')?.[0]).toEqual(['2'])
    allow.unmount()
  })

  it('beforeLeave 抛错时按取消处理', async () => {
    const wrapper = mount(Tabs, {
      props: {
        defaultActiveKey: '1',
        beforeLeave: () => {
          throw new Error('denied')
        }
      },
      slots: { default: twoTabs }
    })
    await wrapper.findAll('.tab-item')[1].trigger('click')
    await flushPromises()
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('beforeLeave 连点：只采纳最后一次请求的结果', async () => {
    const resolvers: Array<(value: boolean) => void> = []
    const beforeLeave = () =>
      new Promise<boolean>((resolve) => {
        resolvers.push(resolve)
      })
    const wrapper = mount(Tabs, { props: { defaultActiveKey: '1', beforeLeave }, slots: { default: twoTabs } })
    const items = wrapper.findAll('.tab-item')
    await items[1].trigger('click')
    await items[1].trigger('click')
    expect(resolvers.length).toBe(2)
    resolvers[1](true)
    resolvers[0](false)
    await flushPromises()
    expect(wrapper.emitted('change')?.length).toBe(1)
    expect(wrapper.emitted('change')?.[0]).toEqual(['2'])
    wrapper.unmount()
  })

  it('displayDirective="if" 时非激活面板内容不渲染', async () => {
    const wrapper = mount(Tabs, {
      props: { defaultActiveKey: '1' },
      slots: {
        default: () => [
          h(TabPane, { key: '1', tab: 'T1', displayDirective: 'if' }, { default: () => 'C1' }),
          h(TabPane, { key: '2', tab: 'T2', displayDirective: 'if' }, { default: () => 'C2' })
        ]
      }
    })
    expect(wrapper.text()).toContain('C1')
    expect(wrapper.text()).not.toContain('C2')
    await wrapper.findAll('.tab-item')[1].trigger('click')
    expect(wrapper.text()).toContain('C2')
    expect(wrapper.text()).not.toContain('C1')
    wrapper.unmount()
  })

  it('displayDirective="show:lazy" 时首次激活后才渲染并保留', async () => {
    const wrapper = mount(Tabs, {
      props: { defaultActiveKey: '1' },
      slots: {
        default: () => [
          h(TabPane, { key: '1', tab: 'T1', displayDirective: 'show:lazy' }, { default: () => 'C1' }),
          h(TabPane, { key: '2', tab: 'T2', displayDirective: 'show:lazy' }, { default: () => 'C2' })
        ]
      }
    })
    expect(wrapper.text()).not.toContain('C2')
    await wrapper.findAll('.tab-item')[1].trigger('click')
    expect(wrapper.text()).toContain('C2')
    await wrapper.findAll('.tab-item')[0].trigger('click')
    expect(wrapper.text()).toContain('C2')
    wrapper.unmount()
  })

  it('justifyContent 在 line 下生效、card 下不生效', () => {
    const line = mount(Tabs, {
      props: { activeKey: '1', justifyContent: 'space-between' },
      slots: { default: twoTabs }
    })
    expect(line.find('.tabs-nav-list').attributes('style')).toContain('justify-content: space-between')
    line.unmount()

    const card = mount(Tabs, {
      props: { activeKey: '1', type: 'card', justifyContent: 'space-between' },
      slots: { default: twoTabs }
    })
    expect(card.find('.tabs-nav-list').attributes('style') ?? '').not.toContain('justify-content')
    card.unmount()
  })

  it('justifyContent 为 center 时 line 由列表承担、card 由导航容器承担', () => {
    const line = mount(Tabs, {
      props: { activeKey: '1', justifyContent: 'center' },
      slots: { default: twoTabs }
    })
    expect(line.find('.tabs-nav-list').attributes('style')).toContain('justify-content: center')
    line.unmount()

    const card = mount(Tabs, {
      props: { activeKey: '1', type: 'card', justifyContent: 'center' },
      slots: { default: twoTabs }
    })
    expect(card.find('.tabs-nav-wrap').classes()).toContain('tabs-center')
    card.unmount()
  })

  it('justifyContent 为 center 且页签溢出时不再居中（否则两端页签滚不到）', async () => {
    // 导航区宽于容器即溢出，按类名伪造宽度
    const widthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement
    ) {
      return this.classList.contains('tabs-nav-list') ? 200 : 100
    })
    const wrapper = mount(Tabs, {
      props: { activeKey: '1', justifyContent: 'center' },
      slots: { default: twoTabs }
    })
    await nextTick()
    expect(wrapper.find('.tabs-nav-wrap').classes()).not.toContain('tabs-center')
    expect(wrapper.find('.tabs-nav-list').attributes('style') ?? '').not.toContain('justify-content')
    widthSpy.mockRestore()
    wrapper.unmount()
  })

  it('tabBar 插槽的 change 同样经过 beforeLeave 拦截', async () => {
    const beforeLeave = vi.fn(() => false)
    const wrapper = mount(Tabs, {
      props: { defaultActiveKey: '1', beforeLeave },
      slots: {
        default: twoTabs,
        tabBar: ({ change }: { change: (key: string | number) => void }) =>
          h('button', { class: 'custom-bar', onClick: () => change('2') }, '自定义页签头')
      }
    })
    await wrapper.find('.custom-bar').trigger('click')
    await flushPromises()
    expect(beforeLeave).toHaveBeenCalledWith('2', '1')
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('切换 justifyContent 后指示条重新贴合激活页签', async () => {
    // jsdom 无布局：按页签下标伪造水平位置，分布变化时位置随之改变，用于验证指示条重算
    let distributed = false
    const leftSpy = vi.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockImplementation(function (
      this: HTMLElement
    ) {
      const index = Array.from(this.parentElement?.children ?? []).indexOf(this)
      return distributed ? index * 100 + 40 : index * 100
    })
    const sizeSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(60)
    const wrapper = mount(Tabs, { props: { activeKey: '2' }, slots: { default: twoTabs } })
    await nextTick()
    expect(wrapper.find('.tab-bar').attributes('style')).toContain('left: 100px')
    distributed = true
    await wrapper.setProps({ justifyContent: 'space-between' })
    await nextTick()
    expect(wrapper.find('.tab-bar').attributes('style')).toContain('left: 140px')
    distributed = false
    await wrapper.setProps({ justifyContent: 'center' })
    await nextTick()
    expect(wrapper.find('.tab-bar').attributes('style')).toContain('left: 100px')
    leftSpy.mockRestore()
    sizeSpy.mockRestore()
    wrapper.unmount()
  })

  it('addable 传 { disabled: true } 时渲染禁用按钮且不触发 add', async () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1', addable: { disabled: true } },
      slots: { default: twoTabs }
    })
    const add = wrapper.find('.tab-add')
    expect(add.exists()).toBe(true)
    expect(add.attributes('disabled')).toBeDefined()
    expect(add.classes()).toContain('tab-add-disabled')
    await add.trigger('click')
    expect(wrapper.emitted('add')).toBeUndefined()
    wrapper.unmount()
  })

  it('tabClass / contentClass 落到页签与面板', () => {
    const wrapper = mount(Tabs, {
      props: { activeKey: '1', tabClass: 'my-tab', contentClass: 'my-panel' },
      slots: { default: twoTabs }
    })
    expect(wrapper.findAll('.tab-item')[0].classes()).toContain('my-tab')
    expect(wrapper.findAll('.tabs-content')[0].classes()).toContain('my-panel')
    wrapper.unmount()
  })

  it('displayDirective 兼容模板中的 kebab-case 写法', () => {
    const wrapper = mount(Tabs, {
      props: { defaultActiveKey: '1' },
      slots: {
        default: () => [
          h(TabPane, { key: '1', tab: 'T1', 'display-directive': 'if' }, { default: () => 'C1' }),
          h(TabPane, { key: '2', tab: 'T2', 'display-directive': 'if' }, { default: () => 'C2' })
        ]
      }
    })
    expect(wrapper.text()).toContain('C1')
    expect(wrapper.text()).not.toContain('C2')
    wrapper.unmount()
  })
})

/**
 * 「更多」下拉的对齐方位
 *
 * 纵向时收纳入口在导航列底、宽度撑满整列（样式侧保证），故面板的次轴对齐边即导航列的边界：
 * 左列贴左（bottomLeft）、右列贴右（bottomRight），面板朝内容侧展开。横向入口在导航末端，
 * 沿用 bottomLeft 与触发器左沿对齐。
 */
describe('Tabs 更多下拉的对齐方位', () => {
  it('纵向按导航列边界对齐：左列贴左、右列贴右；横向贴触发器左沿', async () => {
    // jsdom 无布局：伪造「导航列表长于容器 + 次个页签完全滚出视口」，使收纳入口渲染出来。
    // 首项贴容器起点（激活项不回滚），次项落在视口之外，故收纳集合非空
    const stub = (prop: 'offsetWidth' | 'offsetHeight' | 'offsetLeft' | 'offsetTop') =>
      vi.spyOn(HTMLElement.prototype, prop, 'get').mockImplementation(function (this: HTMLElement) {
        if (prop === 'offsetLeft' || prop === 'offsetTop') {
          const index = Array.from(this.parentElement?.children ?? []).indexOf(this)
          return this.classList.contains('tab-item') && index > 0 ? 300 : 0
        }
        return this.classList.contains('tabs-nav-list') ? 200 : 100
      })
    const spies = [stub('offsetWidth'), stub('offsetHeight'), stub('offsetLeft'), stub('offsetTop')]
    const cases = [
      { tabPosition: 'top', placement: 'bottomLeft' },
      { tabPosition: 'bottom', placement: 'bottomLeft' },
      { tabPosition: 'left', placement: 'bottomLeft' },
      { tabPosition: 'right', placement: 'bottomRight' }
    ] as const

    for (const item of cases) {
      const wrapper = mount(Tabs, {
        props: { activeKey: '1', tabPosition: item.tabPosition },
        slots: { default: () => [makeTab('1', 'Tab 1', 'C1'), makeTab('2', 'Tab 2', 'C2')] }
      })
      await nextTick()
      expect(wrapper.find('.tab-more').exists()).toBe(true)
      expect(wrapper.findComponent(Dropdown).props('placement')).toBe(item.placement)
      wrapper.unmount()
    }

    spies.forEach((spy) => spy.mockRestore())
  })
})

describe('Tabs 滚动目标计算（centerActiveTab）', () => {
  it('激活项居中：目标块中点对齐可视区中点', () => {
    expect(getCenterScroll(100, 100, 300, 500)).toBe(0)
    expect(getCenterScroll(400, 100, 300, 500)).toBe(300)
  })

  it('首尾空间不足时贴边', () => {
    expect(getCenterScroll(0, 60, 300, 200)).toBe(0)
    expect(getCenterScroll(600, 60, 300, 200)).toBe(200)
  })

  it('无可滚动距离时恒为 0', () => {
    expect(getCenterScroll(120, 80, 300, 0)).toBe(0)
  })
})
