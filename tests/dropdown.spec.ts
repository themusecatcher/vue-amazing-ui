import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Dropdown from 'components/dropdown/dropdown'
import DropdownButton from 'components/dropdown/dropdown-button'
import Popup from 'components/popup'
import type { DropdownMenuOption } from 'components/dropdown'

/**
 * Dropdown 契约守护（基于 Popup + useFloating 重建）
 *
 * 覆盖三类「后续重构容易无声改坏」的行为：
 * 1. 配置式菜单各类型的渲染分支（普通 / 分割线 / 分组 / 禁用 / 危险 / 加载中 / 递归子菜单）；
 * 2. 触发语义与展开语义：hover 延迟、click 切换、contextmenu 点位锚定、外部点击 / esc 关闭、
 *    受控 open 不擅自收起、菜单项点击**不通知 openChange**；
 * 3. 浮层能力接线：`matchTriggerWidth`（等宽策略）、箭头（含 pointAtCenter 让位）、过渡配置透传、层级。
 *
 * 注 1：用例统一使用 `to: false` 就地渲染，按组件根节点收敛查询，避免 Teleport 到 body 的节点跨用例残留。
 * 注 2：jsdom 无视口尺寸（所有 rect 为 0），定位求解会退化（方向可能被自适应改写），故断言**接线与状态**，
 *       不断言最终的 top / left 数值 —— 位置正确性由浏览器实测保证。
 */
const mountOptions = {
  attachTo: document.body,
  global: {
    stubs: {
      transition: false
    }
  }
}

const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

/** 等待「定时器（delay 0）→ 渲染」两拍 */
async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}

/** 轮询等待浮层转入隐藏（v-show + 离开过渡），必要时补发 animationend 促使过渡收尾 */
async function waitHidden(query: () => HTMLElement | null): Promise<void> {
  for (let i = 0; i < 20; i += 1) {
    const panel = query()
    if (!panel || panel.style.display === 'none') return
    panel.dispatchEvent(new Event('animationend'))
    await new Promise((resolve) => setTimeout(resolve, 10))
    await nextTick()
  }
}

const menus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item', disabled: true },
  { key: '4', label: '4th menu item', danger: true },
  { key: '5', label: '5th menu item', loading: true }
]

const groupMenus: DropdownMenuOption[] = [
  {
    type: 'group',
    label: 'Group 1',
    children: [
      { key: 'g1', label: 'Option 1-1' },
      { key: 'g2', label: 'Option 1-2' }
    ]
  }
]

/** 三层菜单：用于验证「递归渲染任意层级」 */
const nestedMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  {
    key: 'sub1',
    label: 'sub menu',
    children: [
      { key: 'sub1-1', label: '3rd menu item' },
      {
        key: 'sub1-2',
        label: 'nested sub menu',
        children: [{ key: 'sub1-2-1', label: '5th menu item' }]
      }
    ]
  }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

function mountDropdown(props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) {
  wrapper = mount(Dropdown, {
    ...mountOptions,
    props: { to: false, mouseEnterDelay: 0, mouseLeaveDelay: 0, ...props },
    slots: { default: () => h('a', { class: 'dropdown-link' }, 'Hover me'), ...slots }
  })
  return wrapper
}

function queryAll(selector: string): Element[] {
  return Array.from(wrapper?.element.querySelectorAll(selector) ?? [])
}

function panelEl(): HTMLElement | null {
  return wrapper?.element.querySelector('.dropdown-overlay') ?? null
}

function submenuPanels(): HTMLElement[] {
  return queryAll('.dropdown-submenu-overlay') as HTMLElement[]
}

describe('Dropdown · 配置式菜单渲染', () => {
  it('按 type 渲染普通项 / 分割线，并标记禁用、危险、加载中', async () => {
    mountDropdown({ menus, open: true })
    await flush()

    expect(queryAll('.dropdown-menu').length).toBe(1)
    // 5 个菜单项（2 普通 + 1 禁用 + 1 危险 + 1 加载中）、1 条分割线
    expect(queryAll('.dropdown-menu-item').length).toBe(5)
    expect(queryAll('.dropdown-menu-divider').length).toBe(1)
    expect(queryAll('.dropdown-menu-item-disabled').length).toBe(1)
    expect(queryAll('.dropdown-menu-item-danger').length).toBe(1)
    expect(queryAll('.dropdown-menu-item-loading').length).toBe(1)
  })

  it('type 为 group 时渲染分组标题与分组子项', async () => {
    mountDropdown({ menus: groupMenus, open: true })
    await flush()

    expect(queryAll('.dropdown-menu-group').length).toBe(1)
    expect(wrapper?.element.querySelector('.dropdown-menu-group-title')?.textContent?.trim()).toBe('Group 1')
    expect(queryAll('.dropdown-menu-group-list .dropdown-menu-item').length).toBe(2)
  })

  it('overlay 插槽优先于 menus', async () => {
    mountDropdown({ menus, open: true }, { overlay: () => h('div', { class: 'custom-overlay' }, 'custom') })
    await flush()

    expect(queryAll('.custom-overlay').length).toBe(1)
    expect(queryAll('.dropdown-menu').length).toBe(0)
  })

  it('menus 为空且无 overlay 插槽时不可展开（无浮层内容时不弹出）', async () => {
    mountDropdown({ menus: [] })
    await flush()
    await wrapper!.find('.dropdown-trigger').trigger('mouseenter')
    await flush()

    expect(panelEl()).toBeNull()
  })

  it('label 插槽可自定义菜单项文本，并回退未提供插槽的项', async () => {
    mountDropdown(
      { menus: [{ key: '1', label: '1st' }], open: true },
      { label: ({ option }: { option: DropdownMenuOption }) => h('em', { class: 'custom-label' }, `#${option.key}`) }
    )
    await flush()

    expect(wrapper?.element.querySelector('.dropdown-menu-item-label .custom-label')?.textContent).toBe('#1')
  })
})

describe('Dropdown · 递归子菜单', () => {
  it('子菜单标题带展开箭头，hover 后在独立浮层内渲染子项', async () => {
    mountDropdown({ menus: nestedMenus, open: true })
    await flush()

    const submenuTitle = wrapper!.element.querySelector('.dropdown-menu-item-submenu .dropdown-menu-item-content')
    expect(submenuTitle).not.toBeNull()
    expect(submenuTitle?.querySelector('.dropdown-menu-item-arrow')).not.toBeNull()
    // 回归守护：标题内容层只有一层（曾误包成两层同 class，导致内边距叠加）
    expect(wrapper?.element.querySelectorAll('.dropdown-menu-item-submenu > .dropdown-menu-item-content').length).toBe(
      1
    )
    // 未展开时子菜单面板不渲染
    expect(submenuPanels().length).toBe(0)

    submenuTitle?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }))
    await flush()

    const submenuPanel = submenuPanels()[0]
    expect(submenuPanel).toBeDefined()
    expect(submenuPanel.querySelector('.dropdown-menu-item')?.textContent).toContain('3rd menu item')
  })

  it('递归渲染任意层级：三级子菜单标题出现在二级面板内，展开后生成第三个浮层', async () => {
    mountDropdown({ menus: nestedMenus, open: true })
    await flush()

    wrapper?.element
      .querySelector('.dropdown-menu-item-submenu .dropdown-menu-item-content')
      ?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()

    const nestedTitle = submenuPanels()[0]?.querySelector('.dropdown-menu-item-submenu .dropdown-menu-item-content') as
      | HTMLElement
      | undefined
    expect(nestedTitle?.textContent).toContain('nested sub menu')

    nestedTitle?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()

    expect(submenuPanels().length).toBe(2)
    expect(submenuPanels()[1]?.textContent).toContain('5th menu item')
  })

  it('禁用子菜单项不响应展开', async () => {
    mountDropdown({
      menus: [{ key: 'sub', label: 'disabled sub menu', disabled: true, children: [{ key: 'c', label: 'child' }] }],
      open: true
    })
    await flush()

    wrapper?.element
      .querySelector('.dropdown-menu-item-submenu .dropdown-menu-item-content')
      ?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()

    expect(submenuPanels().length).toBe(0)
  })

  it('主浮层收起时同步收起已展开的子菜单', async () => {
    mountDropdown({ menus: nestedMenus, open: true })
    await flush()
    wrapper?.element
      .querySelector('.dropdown-menu-item-submenu .dropdown-menu-item-content')
      ?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(submenuPanels().length).toBe(1)

    await wrapper!.setProps({ open: false })
    await flush()
    await waitHidden(() => submenuPanels()[0] ?? null)
    expect(submenuPanels()[0]?.style.display).toBe('none')
  })
})

describe('Dropdown · 菜单项点击', () => {
  it('点击普通项触发 menuClick（透出 key 与完整配置）', async () => {
    const onMenuClick = vi.fn()
    mountDropdown({ menus, open: true, onMenuClick })
    await flush()
    queryAll('.dropdown-menu-item')[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(onMenuClick).toHaveBeenCalledTimes(1)
    expect(onMenuClick.mock.calls[0][0]).toBe('1')
    expect(onMenuClick.mock.calls[0][1]).toMatchObject({ key: '1', label: '1st menu item' })
  })

  it('点击禁用项与加载中项不触发 menuClick', async () => {
    const onMenuClick = vi.fn()
    mountDropdown({ menus, open: true, onMenuClick })
    await flush()

    queryAll('.dropdown-menu-item-disabled')[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    wrapper?.element
      .querySelector('.dropdown-menu-item-loading')
      ?.closest('.dropdown-menu-item')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(onMenuClick).not.toHaveBeenCalled()
  })

  it('菜单项点击收起浮层但不通知 openChange', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: 'click', onOpenChange })
    await flush()

    await wrapper!.find('.dropdown-trigger').trigger('click')
    await flush()
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)

    queryAll('.dropdown-menu-item')[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    // 回归守护：明示「点击菜单项导致的消失不会触发 openChange」，故仍为 1 次
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('受控 open 为 true 时点击菜单项不擅自收起（展开态归属由使用者决定）', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, open: true, onOpenChange })
    await flush()
    queryAll('.dropdown-menu-item')[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(onOpenChange).not.toHaveBeenCalled()
    expect(wrapper?.element.querySelector('.dropdown-menu')).not.toBeNull()
  })
})

describe('Dropdown · 触发语义', () => {
  it('trigger 为 click 时点击触发器切换展开态，并对外通知 openChange', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: 'click', onOpenChange })
    await flush()

    await wrapper!.find('.dropdown-trigger').trigger('click')
    await flush()
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)

    await wrapper!.find('.dropdown-trigger').trigger('click')
    await flush()
    expect(onOpenChange).toHaveBeenCalledTimes(2)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })

  it('trigger 为 click 时点击外部关闭浮层', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: 'click', onOpenChange })
    await flush()
    await wrapper!.find('.dropdown-trigger').trigger('click')
    await flush()

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })

  it('trigger 为 hover 时未到延迟不展开', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, mouseEnterDelay: 40, onOpenChange })
    await flush()
    await wrapper!.find('.dropdown-trigger').trigger('mouseenter')
    await flush()

    expect(onOpenChange).not.toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 60))
    await flush()
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('未展开时移出触发器会取消待展开延迟（回归守护：快速划过不应弹出）', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: 'hover', mouseEnterDelay: 40, onOpenChange })
    await flush()

    await wrapper!.find('.dropdown-trigger').trigger('mouseenter')
    await wrapper!.find('.dropdown-trigger').trigger('mouseleave')

    await new Promise((resolve) => setTimeout(resolve, 60))
    await flush()

    // 曾经：未展开时早返回导致 clearShowTimer 被跳过，鼠标已离开仍会照常弹出
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('trigger 支持数组组合（hover 展开 + click 收起）', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: ['hover', 'click'], onOpenChange })
    await flush()

    await wrapper!.find('.dropdown-trigger').trigger('mouseenter')
    await flush()
    expect(onOpenChange).toHaveBeenLastCalledWith(true)

    await wrapper!.find('.dropdown-trigger').trigger('click')
    await flush()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })

  it('trigger 为 contextmenu 时以鼠标位置为锚点展开并阻止浏览器默认菜单', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: 'contextmenu', onOpenChange })
    await flush()

    const event = new MouseEvent('contextmenu', { clientX: 500, clientY: 300, bubbles: true, cancelable: true })
    wrapper!.find('.dropdown-trigger').element.dispatchEvent(event)
    await flush()

    expect(event.defaultPrevented).toBe(true)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    // 点位锚定由内核的 point 承担（jsdom 无视口，不断言求解结果）
    expect(wrapper!.findComponent(Popup).props('point')).toEqual({ x: 500, y: 300 })
  })

  it('esc 关闭浮层（click / contextmenu 触发）', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: 'click', onOpenChange })
    await flush()
    await wrapper!.find('.dropdown-trigger').trigger('click')
    await flush()

    await wrapper!.find('.dropdown-trigger').trigger('keydown', { key: 'Escape' })
    await flush()

    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })

  it('disabled 或无浮层内容时任何触发都不展开', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, disabled: true, trigger: ['click', 'hover', 'contextmenu'], onOpenChange })
    await flush()

    await wrapper!.find('.dropdown-trigger').trigger('click')
    await wrapper!.find('.dropdown-trigger').trigger('mouseenter')
    wrapper!.find('.dropdown-trigger').element.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }))
    await flush()

    expect(onOpenChange).not.toHaveBeenCalled()
    expect(panelEl()).toBeNull()
  })
})

describe('Dropdown · 浮层能力接线', () => {
  it('菜单宽度不小于触发器宽度（matchTriggerWidth: minWidth），contextmenu 时不拉伸', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      if (this.classList.contains('dropdown-trigger')) {
        return { left: 200, top: 100, right: 440, bottom: 130, width: 240, height: 30, x: 200, y: 100 } as DOMRect
      }
      return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0 } as DOMRect
    })

    mountDropdown({ menus, open: true })
    await flush()
    expect(panelEl()?.style.minWidth).toBe('240px')

    wrapper?.unmount()
    wrapper = null
    mountDropdown({ menus, open: true, trigger: 'contextmenu' })
    await flush()
    expect(panelEl()?.style.minWidth).toBe('')
  })

  it('arrow 为 false 时不渲染箭头，传对象形态时渲染（含 pointAtCenter 的面板让位）', async () => {
    mountDropdown({ menus, open: true, arrow: false })
    await flush()
    expect(queryAll('.dropdown-arrow').length).toBe(0)

    wrapper?.unmount()
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
      return this.classList.contains('dropdown-trigger') ? 240 : 0
    })
    mountDropdown({ menus, open: true, placement: 'bottomLeft', arrow: { pointAtCenter: true } })
    await flush()

    expect(queryAll('.dropdown-arrow').length).toBe(1)
    // 让位量 = 锚点半宽(120) − 箭头中心距对齐边(14)：面板左边缘内移，使箭头中心落在触发器中心
    expect(panelEl()?.style.marginLeft).toBe('106px')
  })

  it('过渡动画配置与面板类名、样式经宿主落到面板上', async () => {
    mountDropdown({
      menus,
      open: true,
      overlayClassName: 'my-overlay',
      overlayStyle: { borderRadius: '12px' }
    })
    await flush()

    const popup = wrapper!.findComponent(Popup)
    expect(popup.props('transitionProps')?.name).toBe('dropdown-slide')
    expect(popup.props('defaultZIndex')).toBe(1050)
    const panel = panelEl()
    expect(panel?.classList.contains('my-overlay')).toBe(true)
    expect(panel?.style.borderRadius).toBe('12px')
    expect(panel?.classList.toString()).toContain('va-popup-placement-')
  })

  it('zIndex 优先于默认层级 1050', async () => {
    mountDropdown({ menus, open: true, zIndex: 1200 })
    await flush()

    expect(Number(panelEl()?.style.zIndex)).toBe(1200)
  })
})

describe('DropdownButton', () => {
  it('渲染根类名与左右按钮，默认图标为省略号', async () => {
    wrapper = mount(DropdownButton, {
      ...mountOptions,
      props: { menus, open: true },
      slots: { default: () => 'Dropdown' }
    })
    await flush()

    // 根类名即 wrapper.element，querySelectorAll 不含自身，故用 find / findAll
    expect(wrapper.find('.dropdown-button-wrap').exists()).toBe(true)
    expect(wrapper.findAll('.dropdown-button-left').length).toBe(1)
    expect(wrapper.findAll('.dropdown-button-right').length).toBe(1)
    expect(wrapper.findAll('.dropdown-button-right [data-icon="ellipsis"]').length).toBe(1)
  })

  it('#icon 插槽优先于 icon prop', async () => {
    wrapper = mount(DropdownButton, {
      ...mountOptions,
      props: { menus, open: true, icon: h('i', { class: 'icon-prop' }) },
      slots: { default: () => 'Dropdown', icon: () => h('i', { class: 'icon-slot' }) }
    })
    await flush()

    expect(queryAll('.dropdown-button-right .icon-slot').length).toBe(1)
    expect(queryAll('.dropdown-button-right .icon-prop').length).toBe(0)
  })

  it('左按钮 loading 时右按钮同步置灰', async () => {
    wrapper = mount(DropdownButton, {
      ...mountOptions,
      props: { menus, loading: true },
      slots: { default: () => 'Submit' }
    })
    await flush()

    expect(wrapper.find('.dropdown-button-wrap.dropdown-button-loading').exists()).toBe(true)
  })

  it('展开态只透传一次 openChange / update:open（回归守护：曾因同时监听两个事件而重复透传）', async () => {
    wrapper = mount(DropdownButton, {
      ...mountOptions,
      props: { menus, trigger: 'click' },
      slots: { default: () => 'Dropdown' }
    })
    await flush()

    await wrapper.find('.dropdown-trigger').trigger('click')
    await flush()

    expect(wrapper.emitted('openChange')?.length).toBe(1)
    expect(wrapper.emitted('update:open')?.length).toBe(1)
  })
})
