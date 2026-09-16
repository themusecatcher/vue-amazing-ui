import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Dropdown from 'components/dropdown/dropdown'
import DropdownButton from 'components/dropdown/dropdown-button'
import Tooltip from 'components/tooltip'

/**
 * Dropdown 契约守护：
 * 1. 配置式 `menus` 各菜单项类型（普通 / 分割线 / 分组 / 禁用 / 危险 / 加载中）的渲染分支；
 * 2. `overlay` 插槽与 `menus` 的双源优先级（本项目统一 **插槽优先**）；
 * 3. 空 `menus` + 无 `overlay` 时不展示浮层；
 * 4. `menuClick` 的触发条件（禁用 / 加载中项不触发）；
 * 5. **受控 `open` 语义**：内部发出的关闭请求不应擅自收起浮层（由外部决定）；
 * 6. `arrow` 对象形态（`pointAtCenter`）与布尔形态的箭头渲染；
 * 7. DropdownButton 的根类名与 `#icon` 插槽优先于 `icon` prop。
 *
 * 注：@vue/test-utils 默认 stub `Transition`，会使挂在 `<Transition>` 上的监听
 * 落到 stub 而非真实元素，故显式关闭（与本仓库 tests/popover.spec.ts 一致）。
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

async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}

const defaultSlot = () => h('a', { class: 'dropdown-link' }, 'Hover me')

const menus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item', disabled: true },
  { key: '4', label: '4th menu item', danger: true },
  { key: '5', label: '5th menu item', loading: true }
]

const groupMenus = [
  {
    type: 'group',
    label: 'Group 1',
    children: [
      { key: 'g1', label: 'Option 1-1' },
      { key: 'g2', label: 'Option 1-2' }
    ]
  }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

function mountDropdown(props: Record<string, unknown>, slots: Record<string, unknown> = {}): ReturnType<typeof mount> {
  wrapper = mount(Dropdown, {
    ...mountOptions,
    props,
    slots: { default: defaultSlot, ...slots }
  })
  return wrapper
}

function queryAll(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector)
}

function rect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    x: left,
    y: top,
    toJSON: () => ({})
  } as DOMRect
}

// jsdom 的 getBoundingClientRect 恒返回 0，对齐修正需借助桩数据才能被观测
function mockRects(): void {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    if (this.classList.contains('dropdown-trigger')) {
      return rect(200, 100, 100, 30)
    }
    if (this.classList.contains('tooltip-card')) {
      // 真实 DOM 中已叠加的对齐偏移会体现在元素位置上，桩数据需同样跟随 transform，
      // 否则重复测量会不断累加偏移（被测逻辑依赖「还原基准位置」的算法）
      const offsetX = Number(/translate\((-?[\d.]+)px/.exec(this.style.transform)?.[1] ?? 0)
      const offsetY = Number(/translate\(-?[\d.]+px, (-?[\d.]+)px\)/.exec(this.style.transform)?.[1] ?? 0)
      return rect(offsetX, offsetY, 300, 200)
    }
    return rect(0, 0, 0, 0)
  })
}

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

// jsdom 的 offsetWidth 恒为 0，触发器宽度 / 浮层宽度相关逻辑需借助桩数据观测
function mockWidths(triggerWidth: number, containerWidth: number, cardWidth = 0, cardHeight = 0): void {
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.classList.contains('dropdown-trigger')) {
      return triggerWidth
    }
    if (this.classList.contains('tooltip-card-container')) {
      return containerWidth
    }
    if (this.classList.contains('tooltip-card')) {
      return cardWidth
    }
    return 0
  })
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return this.classList.contains('tooltip-card') ? cardHeight : 0
  })
}

function queryArrowEl(): HTMLElement | null {
  return document.querySelector('.tooltip-arrow')
}

describe('Dropdown 配置式菜单渲染', () => {
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
    expect(document.querySelector('.dropdown-menu-group-title')?.textContent?.trim()).toBe('Group 1')
    expect(queryAll('.dropdown-menu-group-list .dropdown-menu-item').length).toBe(2)
  })

  it('overlay 插槽优先于 menus（本项目统一插槽优先）', async () => {
    mountDropdown({ menus, open: true }, { overlay: () => h('div', { class: 'custom-overlay' }, 'custom') })
    await flush()

    expect(queryAll('.custom-overlay').length).toBe(1)
    expect(queryAll('.dropdown-menu').length).toBe(0)
  })

  it('menus 为空且无 overlay 插槽时，hover 不会展开浮层', async () => {
    mountDropdown({ menus: [] })
    await flush()
    ;(document.querySelector('.tooltip-wrap') as HTMLElement).dispatchEvent(new Event('mouseenter'))
    await flush()

    // 无内容时不展开（showOverlay 为 false → disableTrigger 拦截 hover 触发）
    expect(document.querySelector('.tooltip-card-container')).toBeNull()
  })
})

describe('Dropdown 菜单项点击', () => {
  it('点击普通项触发 menuClick 并透出 key 与完整配置', async () => {
    const onMenuClick = vi.fn()
    mountDropdown({ menus, open: true, onMenuClick })
    await flush()
    ;(queryAll('.dropdown-menu-item')[0] as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(onMenuClick).toHaveBeenCalledTimes(1)
    expect(onMenuClick.mock.calls[0][0]).toBe('1')
    expect(onMenuClick.mock.calls[0][1]).toMatchObject({ key: '1', label: '1st menu item' })
  })

  it('点击禁用项与加载中项不触发 menuClick', async () => {
    const onMenuClick = vi.fn()
    mountDropdown({ menus, open: true, onMenuClick })
    await flush()

    const items = Array.from(queryAll('.dropdown-menu-item')) as HTMLElement[]
    const disabledItem = items.find((el) => el.classList.contains('dropdown-menu-item-disabled'))
    const loadingItem = items.find((el) => el.classList.contains('dropdown-menu-item-loading'))

    disabledItem?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    loadingItem?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(onMenuClick).not.toHaveBeenCalled()
  })
})

describe('Dropdown 受控 open 语义', () => {
  it('受控 open 为 true 时点击菜单项仅发出关闭请求，浮层不擅自收起', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, open: true, onOpenChange })
    await flush()
    ;(queryAll('.dropdown-menu-item')[0] as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(onOpenChange).toHaveBeenCalledWith(false)
    // 外部未更新 open，浮层应保持展示（回归守护：曾因误触 resetAlign 导致后续定位失效）
    expect(queryAll('.dropdown-menu').length).toBe(1)
  })

  it('收起时延迟复位对齐偏移，隐藏过渡期间浮层不跳回默认居中位置', async () => {
    mockRects()
    const localWrapper = mountDropdown({ menus, open: true, placement: 'bottomLeft', transitionDuration: 30 })
    await flush()

    const cardEl = document.querySelector('.tooltip-card') as HTMLElement
    // 左对齐：浮层左边缘对齐触发器左边缘 → x = 200 - 0
    expect(cardEl.style.transform).toBe('translate(200px, 0px)')

    await localWrapper.setProps({ open: false })
    await flush()
    // 回归守护：隐藏过渡期间不得清零对齐偏移，否则浮层会在淡出动画中跳回居中位置
    expect(cardEl.style.transform).toBe('translate(200px, 0px)')

    await wait(80)
    await flush()
    // 过渡结束后才复位（此刻浮层已隐藏，无视觉影响）
    expect(cardEl.style.transform).toBe('')
  })

  it('点击菜单项关闭浮层时 openChange 只通知一次（Tooltip 显隐回调不重复通知）', async () => {
    const onOpenChange = vi.fn()
    mountDropdown({ menus, trigger: 'click', onOpenChange })
    await flush()
    ;(document.querySelector('.tooltip-content') as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flush()
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    ;(queryAll('.dropdown-menu-item')[0] as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    // 回归守护：本组件关闭浮层后，Tooltip 关闭回调曾再次通知同一状态导致重复触发
    expect(onOpenChange).toHaveBeenCalledTimes(2)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })
})

describe('Dropdown 浮层宽度与箭头位置', () => {
  it('浮层最小宽度取触发器宽度；右键菜单跟随鼠标定位故不拉伸', async () => {
    mockWidths(240, 300)
    mountDropdown({ menus, open: true, placement: 'bottomLeft' })
    await flush()

    expect((document.querySelector('.tooltip-card') as HTMLElement).style.minWidth).toBe('240px')

    wrapper?.unmount()
    wrapper = null
    mountDropdown({ menus, open: true, placement: 'bottomLeft', trigger: 'contextMenu' })
    await flush()

    expect((document.querySelector('.tooltip-card') as HTMLElement).style.minWidth).toBe('')
  })

  it('箭头跟随对齐方向：左对齐距左 14px、居中方向居中、右对齐距右 14px', async () => {
    mockWidths(100, 300)
    mountDropdown({ menus, open: true, placement: 'bottomLeft', arrow: true })
    await flush()
    expect(queryArrowEl()?.style.left).toBe('14px')

    wrapper?.unmount()
    wrapper = null
    mountDropdown({ menus, open: true, placement: 'bottom', arrow: true })
    await flush()
    expect(queryArrowEl()?.style.left).toBe('')

    wrapper?.unmount()
    wrapper = null
    mountDropdown({ menus, open: true, placement: 'bottomRight', arrow: true })
    await flush()
    expect(queryArrowEl()?.style.left).toBe('286px')
  })

  it('箭头位置换算到容器坐标：叠加浮层的水平对齐偏移量', async () => {
    mockRects()
    mockWidths(100, 300)
    mountDropdown({ menus, open: true, placement: 'bottomLeft', arrow: true })
    await flush()

    // 桩数据下左对齐偏移为 200px，箭头应落在「卡片左 + 14px」= 容器坐标 214px
    // （对齐偏移作用在卡片上，箭头定位在容器上，二者相差 alignOffset.x）
    expect(queryArrowEl()?.style.left).toBe('214px')
  })

  it('箭头指向中心时，浮层位移让箭头中心精确落在触发器中心（有意修正 antdv 的 6px 偏差）', async () => {
    mockRects()
    mockWidths(100, 300)
    mountDropdown({ menus, open: true, placement: 'bottomLeft', arrow: { pointAtCenter: true } })
    await flush()

    // 触发器 rect(200, 100, 100, 30) 中心为 250；浮层左 = 250 - 箭头中心距边(14) = 236；
    // 箭头 left = 卡片坐标 14 + 容器坐标换算 236 = 250，即精确指向触发器中心
    // （antdv 位移固定取历史常量 20，箭头中心为 244，偏离中心 6px —— 本用例守护该有意差异不被改回）
    expect((document.querySelector('.tooltip-card') as HTMLElement).style.transform).toBe('translate(236px, 0px)')
    expect(queryArrowEl()?.style.left).toBe('250px')
  })

  it('右键菜单：缩放原点落在卡片顶部中心，动画不再表现为位移', async () => {
    mockRects()
    mockWidths(100, 300, 160, 120)
    mountDropdown({ menus, open: true, trigger: 'contextMenu', placement: 'bottomLeft' })
    await flush()

    const triggerEl = document.querySelector('.dropdown-trigger') as HTMLElement
    triggerEl.dispatchEvent(new MouseEvent('contextmenu', { clientX: 500, clientY: 300, bubbles: true }))
    await flush()

    // 卡片被平移到鼠标点 (500, 300)，主轴 bottom 时原点取卡片顶部中心 → (500 + 160/2, 300)
    const containerEl = document.querySelector('.tooltip-card-container') as HTMLElement
    expect(containerEl.style.transformOrigin).toBe('580px 300px')
  })
})

describe('Dropdown 浮层过渡动画', () => {
  it('透传 slide 动画名给内层 Tooltip（而非沿用内置 zoom 的双向缩放）', async () => {
    mountDropdown({ menus, open: true })
    await flush()

    const tooltipWrapper = wrapper!.findComponent(Tooltip)
    expect(tooltipWrapper.props('transitionName')).toBe('slide-y')
  })
})

describe('Dropdown 箭头', () => {
  it('arrow 为 false 时不渲染箭头', async () => {
    mountDropdown({ menus, open: true, arrow: false })
    await flush()

    expect(queryAll('.tooltip-arrow').length).toBe(0)
  })

  it('arrow 传对象形态时同样渲染箭头', async () => {
    mountDropdown({ menus, open: true, arrow: { pointAtCenter: true } })
    await flush()

    expect(queryAll('.tooltip-arrow').length).toBe(1)
  })
})

describe('DropdownButton', () => {
  it('渲染根类名 dropdown-button-wrap 与左右两个按钮', async () => {
    wrapper = mount(DropdownButton, {
      ...mountOptions,
      props: { menus, open: true },
      slots: { default: () => 'Dropdown' }
    })
    await flush()

    expect(queryAll('.dropdown-button-wrap').length).toBe(1)
    expect(queryAll('.dropdown-button-left').length).toBe(1)
    expect(queryAll('.dropdown-button-right').length).toBe(1)
    // 默认图标对齐 antdv 的 EllipsisOutlined（未传 icon 时渲染省略号 SVG）
    expect(queryAll('.dropdown-button-right [data-icon="ellipsis"]').length).toBe(1)
  })

  it('左按钮 loading 时右按钮同步置灰（对齐 antd 的 loading 联动规则）', async () => {
    wrapper = mount(DropdownButton, {
      ...mountOptions,
      props: { menus, loading: true },
      slots: { default: () => 'Submit' }
    })
    await flush()

    expect(queryAll('.dropdown-button-wrap.dropdown-button-loading').length).toBe(1)
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
})
