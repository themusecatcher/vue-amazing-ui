import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Slider from 'components/slider/Slider.vue'

/**
 * Slider 手柄气泡接入定位内核后的契约回归
 *
 * 迁移前气泡的几何全部由样式表承担（`.slider-horizontal` / `.slider-vertical` 各写一套
 * `top / left / transform`），迁移后由 `useFloating` 输出内联样式、方向由气泡上的方向类驱动。
 * 此处锁定：
 * - **主轴几何**：水平模式气泡在手柄上方 16px、水平居中（`translate: -50% -100%`）；垂直模式在手柄右侧
 *   16px、垂直居中（`translate: 0 -50%`）—— 与旧实现 CSS 等价；
 * - **方向契约**：气泡落 `slider-tooltip-{方向}` 类（内核输出的对外命名），箭头几何由该类选择器驱动；
 * - **移动锚点重对齐**：手柄位置变化时组件主动 `sync()`，气泡跟随（旧实现靠 CSS 相对定位天然跟随，
 *   改由内核计算后必须显式重对齐）；
 * - **显隐**：`tooltipOpen` 常显；`tooltip` 为 false 时不渲染气泡。
 *
 * 环境说明：happy-dom 无布局引擎且不派发 ResizeObserver 回调，而 Slider 依赖它测量滑动条尺寸
 * （尺寸为 0 时手柄位置恒为 0，无法验证「锚点移动」），故按 tests/carousel-drag.spec.ts 的既有写法
 * 补齐布局桩与 ResizeObserver 回调。
 */
const VIEW_WIDTH = 1000
const VIEW_HEIGHT = 600
const SLIDER_WIDTH = 100
const SLIDER_HEIGHT = 12
const HANDLE_SIZE = 10
const TOOLTIP_SIZE = 32

/** 构造桩 DOMRect */
function domRect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    x: left,
    y: top,
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    toJSON: () => ({})
  } as DOMRect
}

/** 视口桩矩形：未登记元素（含内核惰性创建的视口测量元素）统一返回它 */
const viewportRect = domRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
/** 手柄桩矩形：按用例改动后触发重对齐，即可验证「移动锚点」路径 */
let handleRect = domRect(400, 300, HANDLE_SIZE, HANDLE_SIZE)

/** 等待「渲染 → 内核 post flush / rAF 帧同步落位」 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

const queryTooltips = (): HTMLElement[] => Array.from(document.querySelectorAll('.slider-tooltip'))
const queryHighTooltip = (): HTMLElement => queryTooltips()[queryTooltips().length - 1]

let wrapper: ReturnType<typeof mount> | null = null
const offsetWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
const offsetHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
const realResizeObserver = globalThis.ResizeObserver
let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect

beforeEach(() => {
  handleRect = domRect(400, 300, HANDLE_SIZE, HANDLE_SIZE)
  originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
  HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    if (this.classList?.contains('slider-wrap')) return domRect(0, 0, SLIDER_WIDTH, SLIDER_HEIGHT)
    if (this.classList?.contains('slider-handle')) return handleRect
    if (this.classList?.contains('slider-tooltip')) return domRect(0, 0, TOOLTIP_SIZE, TOOLTIP_SIZE)
    return viewportRect
  }
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement): number {
      if (this.classList?.contains('slider-wrap')) return SLIDER_WIDTH
      // 气泡尺寸必须给出：内核按 offsetWidth / offsetHeight 求解翻转与百分比位移取整，
      // 尺寸为 0 会被当作「尚未渲染」而跳过求解
      if (this.classList?.contains('slider-tooltip')) return TOOLTIP_SIZE
      return this.classList?.contains('slider-handle') ? HANDLE_SIZE : 0
    }
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement): number {
      if (this.classList?.contains('slider-wrap')) return SLIDER_HEIGHT
      if (this.classList?.contains('slider-tooltip')) return TOOLTIP_SIZE
      return this.classList?.contains('slider-handle') ? HANDLE_SIZE : 0
    }
  })
  globalThis.ResizeObserver = class {
    private callback: ResizeObserverCallback
    constructor(callback: ResizeObserverCallback) {
      this.callback = callback
    }
    observe(target: Element): void {
      this.callback([{ target } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver)
    }
    unobserve(): void {}
    disconnect(): void {}
  } as unknown as typeof globalThis.ResizeObserver
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.slider-tooltip').forEach((el) => el.remove())
  globalThis.ResizeObserver = realResizeObserver
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  if (offsetWidthDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', offsetWidthDescriptor)
  }
  if (offsetHeightDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', offsetHeightDescriptor)
  }
})

async function mountSlider(props: Record<string, unknown> = {}, slots: Record<string, string> = {}): Promise<void> {
  wrapper = mount(Slider, { attachTo: document.body, props: { value: 0, ...props }, slots })
  await flush()
}

describe('Slider 手柄气泡接入定位内核（L1 旁路）', () => {
  it('水平模式：气泡在手柄上方 16px 且水平居中，方向属性为 top', async () => {
    await mountSlider()
    const tooltip = queryHighTooltip()
    expect(tooltip).not.toBeUndefined()
    // 手柄 top 300 - 16 → 面板顶边；translate 的 -100% 把面板整体移到手柄上方
    expect(tooltip.style.top).toBe('-16px')
    // 手柄 width 10 / 2 = 5 → 面板左边缘；translate 的 -50% 再按面板自身宽度回退一半 → 居中
    expect(tooltip.style.left).toBe('5px')
    expect(tooltip.style.translate).toBe('-50% -100%')
    expect(tooltip.classList.contains('slider-tooltip-top')).toBe(true)
    expect(tooltip.querySelector('.slider-tooltip-arrow')).not.toBeNull()
  })

  it('垂直模式：气泡在手柄右侧 16px 且垂直居中，方向类为 right', async () => {
    await mountSlider({ vertical: true })
    const tooltip = queryHighTooltip()
    // 手柄 left 400 - 400（同原点）+ width 10 + 间距 16
    expect(tooltip.style.left).toBe('26px')
    // 手柄 height 10 / 2 = 5 → 面板顶边；translate 的 -50% 再按面板自身高度回退一半 → 居中
    expect(tooltip.style.top).toBe('5px')
    expect(tooltip.style.translate).toBe('0 -50%')
    expect(tooltip.classList.contains('slider-tooltip-right')).toBe(true)
  })

  it('气泡内容取自 formatTooltip，随取值变化', async () => {
    await mountSlider({ value: 30, formatTooltip: (value: number) => `${value}%` })
    expect(queryHighTooltip().textContent?.trim()).toBe('30%')
  })

  it('tooltipOpen 为真时常显（显示态类由组件声明式绑定）', async () => {
    await mountSlider({ tooltipOpen: true })
    expect(queryHighTooltip().classList.contains('slider-tooltip-visible')).toBe(true)
  })

  it('手柄获得焦点时展开气泡，失焦收起（聚焦即显示）', async () => {
    await mountSlider()
    expect(queryHighTooltip().classList.contains('slider-tooltip-visible')).toBe(false)

    await wrapper?.find('.slider-handle').trigger('focus')
    expect(queryHighTooltip().classList.contains('slider-tooltip-visible')).toBe(true)

    await wrapper?.find('.slider-handle').trigger('blur')
    expect(queryHighTooltip().classList.contains('slider-tooltip-visible')).toBe(false)
  })

  it('禁用状态下聚焦手柄不展开气泡', async () => {
    await mountSlider({ disabled: true })
    await wrapper?.find('.slider-handle').trigger('focus')
    expect(queryHighTooltip().classList.contains('slider-tooltip-visible')).toBe(false)
  })

  it('tooltip 为 false 时不渲染气泡', async () => {
    await mountSlider({ tooltip: false })
    expect(queryTooltips()).toHaveLength(0)
  })

  it('range 模式下两个手柄各一套气泡', async () => {
    await mountSlider({ range: true, value: [20, 60] })
    expect(queryTooltips()).toHaveLength(2)
  })

  it('手柄尺寸 / 位置变化后主动重对齐：内核重新测量锚点', async () => {
    await mountSlider()
    expect(queryHighTooltip().style.left).toBe('5px')

    // hover / focus 的视觉放大已改由手柄的 ::after 承载（定位盒恒为 10px，气泡参照盒不随交互变化），
    // 此处直接改桩尺寸模拟「锚点尺寸本身发生变化」：
    // 取值变化会驱动手柄位置更新 → 组件主动 sync() → 内核重新测量锚点 → 居中基准随之更新
    handleRect = domRect(400, 300, 12, 12)
    await wrapper?.setProps({ value: 50 })
    await flush()

    // 12 / 2 = 6：若未重新测量锚点，此处仍是 5
    expect(queryHighTooltip().style.left).toBe('6px')
    expect(queryHighTooltip().style.top).toBe('-16px')
  })

  it('tooltipPlacement 指定后气泡落在该侧，方向类同步', async () => {
    await mountSlider({ tooltipPlacement: 'bottom' })
    const tooltip = queryHighTooltip()
    expect(tooltip.classList.contains('slider-tooltip-bottom')).toBe(true)
    // 手柄高 10 + 间距 16：面板顶边落在手柄下方（默认 top 方向时为 -16px）
    expect(parseFloat(tooltip.style.top)).toBe(26)
  })

  it('tooltipPlacement 覆盖垂直模式的默认方向', async () => {
    await mountSlider({ vertical: true, tooltipPlacement: 'left' })
    const tooltip = queryHighTooltip()
    expect(tooltip.classList.contains('slider-tooltip-left')).toBe(true)
    // 锚点左边 0 - 间距 16 → 面板右边缘；translate 的 -100% 再按面板自身宽度左移 → 贴在手柄左侧 16px
    expect(parseFloat(tooltip.style.left)).toBe(-16)
    expect(tooltip.style.translate).toContain('-100%')
  })

  it('tooltipClass 落到气泡根元素上', async () => {
    await mountSlider({ tooltipClass: 'custom-tooltip' })
    expect(queryHighTooltip().classList.contains('custom-tooltip')).toBe(true)
  })

  it('#tooltip 插槽可自定义气泡内容，箭头保留', async () => {
    const slot = '<template #tooltip="{ value }"><strong class="custom-tip">{{ value }}</strong></template>'
    await mountSlider({ value: 30, formatTooltip: (value: number) => `${value}%` }, { tooltip: slot })
    const tooltip = queryHighTooltip()
    expect(tooltip.querySelector('.custom-tip')?.textContent?.trim()).toBe('30%')
    expect(tooltip.querySelector('.slider-tooltip-arrow')).not.toBeNull()
  })

  it('主轴空间不足时自动翻到对侧', async () => {
    // 手柄贴近视口顶部：上方放不下气泡（间距 16 + 气泡高 32），应翻转到下方
    handleRect = domRect(400, 5, HANDLE_SIZE, HANDLE_SIZE)
    await mountSlider()
    const tooltip = queryHighTooltip()
    expect(tooltip.classList.contains('slider-tooltip-bottom')).toBe(true)
    // 翻转后面板顶边落在手柄下方：手柄高 10 + 间距 16
    expect(parseFloat(tooltip.style.top)).toBe(26)
  })

  it('空间充足时保持指定方向不翻转', async () => {
    handleRect = domRect(400, 300, HANDLE_SIZE, HANDLE_SIZE)
    await mountSlider()
    expect(queryHighTooltip().classList.contains('slider-tooltip-top')).toBe(true)
  })
})
