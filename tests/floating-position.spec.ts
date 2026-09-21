import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import { mount } from '@vue/test-utils'
import {
  getOffset,
  getPlacementAndOffsetOfFollower,
  getProperTransformOrigin,
  snapTranslate,
  useFloating
} from 'components/utils'
import type {
  FloatingBoundary,
  FloatingPlacement,
  FloatingPoint,
  FloatingRect,
  FloatingVirtualAnchor,
  KebabPlacement,
  UseFloatingReturn
} from 'components/utils'

/**
 * 浮层定位内核（`useFloating`）自证测试
 *
 * 求解层必须「逐 placement × 逐边界条件」自证等价，故此处：
 * - 用合成矩形直接校验求解结果（翻转 / 次轴 align 自适应 / 微调量），口径独立于实现；
 * - 用查表断言锁住 12 向的 top / left / transform（最容易抄错的部分）；
 * - 用挂载集成测试校验「对外命名 ↔ 内核 kebab 命名」映射与全链滚动监听。
 */

/** 合成视口尺寸 */
const VIEW_WIDTH = 1000
const VIEW_HEIGHT = 600

/**
 * 构造内部坐标系矩形
 *
 * left / top 为视口坐标，right / bottom 为「到视口右 / 下边缘的剩余空间」（见 FloatingRect 口径说明）。
 */
function rect(left: number, top: number, width: number, height: number): FloatingRect {
  return {
    left,
    top,
    right: VIEW_WIDTH - (left + width),
    bottom: VIEW_HEIGHT - (top + height),
    width,
    height
  }
}

describe('求解层 · 主轴翻转与次轴对齐', () => {
  const target = rect(400, 300, 100, 40)
  const follower = rect(0, 0, 200, 80)

  it('空间充足时保持期望方向，且不产生微调量', () => {
    expect(getPlacementAndOffsetOfFollower('bottom', target, follower, true, true)).toEqual({
      placement: 'bottom',
      top: 0,
      left: 0
    })
    expect(getPlacementAndOffsetOfFollower('top-start', target, follower, true, true)).toEqual({
      placement: 'top-start',
      top: 0,
      left: 0
    })
  })

  it('主轴空间不足时仅同轴翻转，并保留原次轴后缀', () => {
    // 锚点贴近视口底部：下方仅剩 20px，放不下 80px 高的浮层
    const nearBottom = rect(400, 540, 100, 40)
    expect(getPlacementAndOffsetOfFollower('bottom-start', nearBottom, follower, true, true)).toEqual({
      placement: 'top-start',
      top: 0,
      left: 0
    })
    // 垂直主轴方向同理：左 ↔ 右 翻转，绝不跨到 top / bottom（锚点贴近视口右边缘）
    expect(getPlacementAndOffsetOfFollower('right-end', rect(800, 300, 50, 40), follower, true, true)).toEqual({
      placement: 'left-end',
      top: 0,
      left: 0
    })
  })

  it('两侧都放不下时选空间更大的一侧', () => {
    const tallFollower = rect(0, 0, 200, 500)
    // 上方 250 / 下方 310，均放不下 500，选更大的下方
    expect(getPlacementAndOffsetOfFollower('top', rect(400, 250, 100, 40), tallFollower, true, true)).toEqual({
      placement: 'bottom',
      top: 0,
      left: 0
    })
    // 上方 300 / 下方 260，仍选上方（保持在原方向）
    expect(getPlacementAndOffsetOfFollower('top', rect(400, 300, 100, 40), tallFollower, true, true)).toEqual({
      placement: 'top',
      top: 0,
      left: 0
    })
  })

  it('浮层宽于锚点且 start 对齐时溢出，自动改对齐侧并给出微调量', () => {
    // 锚点贴近视口右边缘，按 start 对齐必然溢出
    const nearRight = rect(880, 300, 100, 40)
    const wide = rect(0, 0, 200, 40)
    expect(getPlacementAndOffsetOfFollower('top-start', nearRight, wide, true, true)).toEqual({
      placement: 'top-end',
      top: 0,
      left: 0
    })
  })

  it('居中放不下时退化为居中以外的对齐（主动改 align，而非硬推回）', () => {
    // 浮层 500 宽、锚点 100 宽且靠右：左右两侧剩余空间都不足半个溢出量，居中反而是最优
    expect(
      getPlacementAndOffsetOfFollower('top-start', rect(600, 300, 100, 40), rect(0, 0, 500, 40), true, true)
    ).toEqual({
      placement: 'top',
      top: 0,
      left: 0
    })
  })

  it('flip 与 shift 相互独立：flip=false 时次轴兜底仍然生效', () => {
    const nearRight = rect(880, 300, 100, 40)
    const wide = rect(0, 0, 200, 40)
    // 关闭主轴翻转、保留次轴微调 → 方向仍会因空间不足而换对齐侧
    const onlyShift = getPlacementAndOffsetOfFollower('top-start', nearRight, wide, true, false)
    expect(onlyShift.placement).toBe('top-end')
    expect(onlyShift.placement.startsWith('top')).toBe(true) // 主轴绝不跨轴
    // 两者同时关闭 → 原样返回
    expect(getPlacementAndOffsetOfFollower('top-start', nearRight, wide, false, false)).toEqual({
      placement: 'top-start',
      top: 0,
      left: 0
    })
  })

  it('shift=false 时不做次轴微调，但仍可翻转主轴', () => {
    const nearBottom = rect(400, 540, 100, 40)
    expect(getPlacementAndOffsetOfFollower('bottom-start', nearBottom, follower, false, true)).toEqual({
      placement: 'top-start',
      top: 0,
      left: 0
    })
  })
})

describe('求解层 · 查表自证', () => {
  it('transformOrigin 的 12 项映射正确', () => {
    const expected: Record<KebabPlacement, string> = {
      'bottom-start': 'top left',
      bottom: 'top center',
      'bottom-end': 'top right',
      'top-start': 'bottom left',
      top: 'bottom center',
      'top-end': 'bottom right',
      'right-start': 'top left',
      right: 'center left',
      'right-end': 'bottom left',
      'left-start': 'top right',
      left: 'center right',
      'left-end': 'bottom right'
    }
    Object.entries(expected).forEach(([placement, origin]) => {
      expect(getProperTransformOrigin(placement as KebabPlacement)).toBe(origin)
    })
  })

  it('getOffset 的 12 项 top / left / translate 正确', () => {
    const target = rect(400, 300, 100, 40)
    const offsetRect = { left: 0, top: 0 }
    // 位移用独立属性 translate（CSS 语法为 <x> <y>），而非 transform：避免与皮肤层的 scale 动画复合时被缩放
    const expected: Record<KebabPlacement, { top: string; left: string; translate: string }> = {
      'bottom-start': { top: '340px', left: '400px', translate: '' },
      bottom: { top: '340px', left: '450px', translate: '-50%' },
      'bottom-end': { top: '340px', left: '500px', translate: '-100%' },
      'top-start': { top: '300px', left: '400px', translate: '0 -100%' },
      top: { top: '300px', left: '450px', translate: '-50% -100%' },
      'top-end': { top: '300px', left: '500px', translate: '-100% -100%' },
      'right-start': { top: '300px', left: '500px', translate: '' },
      right: { top: '320px', left: '500px', translate: '0 -50%' },
      'right-end': { top: '340px', left: '500px', translate: '0 -100%' },
      'left-start': { top: '300px', left: '400px', translate: '-100%' },
      left: { top: '320px', left: '400px', translate: '-100% -50%' },
      'left-end': { top: '340px', left: '400px', translate: '-100% -100%' }
    }
    Object.entries(expected).forEach(([placement, style]) => {
      expect(getOffset(placement as KebabPlacement, offsetRect, target, 0, 0)).toEqual(style)
    })
  })

  it('snapTranslate 把百分比位移取整到整数像素（不足 1px 的小数用 calc 补足）', () => {
    // 浮层尺寸带小数（卡片宽度由文本撑开，如 130.15625px）→ -100% 落在小数像素上，需补足到整数
    expect(snapTranslate('-100% -50%', { width: 130.15625, height: 34 })).toBe('calc(-100% + 0.1563px) -50%')
    // 单轴（无 y）与 0 位移：0 不是百分比，原样保留
    expect(snapTranslate('-100%', { width: 130.15625, height: 34 })).toBe('calc(-100% + 0.1563px)')
    expect(snapTranslate('0 -100%', { width: 118, height: 46.390625 })).toBe('0 calc(-100% + 0.3906px)')
    // 参照尺寸已是整数 / 位移为空 / 尺寸不可用（未布局、SSR、单测环境）→ 原样返回
    expect(snapTranslate('-100% -100%', { width: 130, height: 46 })).toBe('-100% -100%')
    expect(snapTranslate('', { width: 130.15625, height: 46 })).toBe('')
    expect(snapTranslate('-50%', { width: 0, height: 0 })).toBe('-50%')
  })

  it('主轴外间距与对齐微调量叠加进 top / left，且容器原点参与换算', () => {
    const target = rect(400, 300, 100, 40)
    // 定位容器位于文档原点左上（页面滚动时为负值）
    const shifted = getOffset('bottom-start', { left: 0, top: 0 }, target, 0, 12)
    expect(shifted.top).toBe('340px')
    expect(shifted.left).toBe('412px')
    const scrolled = getOffset('bottom-start', { left: -50, top: -20 }, target, 0, 0)
    expect(scrolled.top).toBe('360px')
    expect(scrolled.left).toBe('450px')
  })
})

/** 元素 → 桩矩形；未登记的元素（含惰性创建的视口测量元素）统一返回视口矩形 */
const rects = new Map<HTMLElement, DOMRect>()
/** 元素 → 桩布局尺寸（offsetWidth / offsetHeight）；未登记时回落到桩矩形 */
const offsetSizes = new Map<HTMLElement, { width: number; height: number }>()
const viewportRect = {
  x: 0,
  y: 0,
  left: 0,
  top: 0,
  right: VIEW_WIDTH,
  bottom: VIEW_HEIGHT,
  width: VIEW_WIDTH,
  height: VIEW_HEIGHT,
  toJSON: () => ({})
} as DOMRect
let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect
let originalOffsetWidth: PropertyDescriptor | undefined
let originalOffsetHeight: PropertyDescriptor | undefined

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

interface FloatingHarness {
  wrapper: ReturnType<typeof mount>
  api: UseFloatingReturn
  placementRef: Ref<FloatingPlacement>
  enabledRef: Ref<boolean>
  flipRef: Ref<boolean>
  boundaryRef: Ref<FloatingBoundary>
  offsetRef: Ref<number>
  matchTriggerWidthRef: Ref<'width' | 'minWidth' | number | false>
  pointRef: Ref<FloatingPoint | null>
  virtualAnchorRef: Ref<FloatingVirtualAnchor | null>
  containerRef: Ref<HTMLElement | null>
  panelRef: Ref<HTMLElement | null>
  anchorRef: Ref<HTMLElement | null>
}

interface FloatingHarnessOptions {
  /** 挂载点，默认 document.body */
  attachTo?: HTMLElement
  /** 不渲染 DOM 锚点，用于验证「仅手动 / 虚拟锚点」形态 */
  withoutAnchor?: boolean
}

/** 挂载一个最小宿主：定位容器 > (浮层, 锚点)，并暴露内核实例、各元素引用与三种锚点来源 */
function mountFloating(placement: FloatingPlacement, harnessOptions: FloatingHarnessOptions = {}): FloatingHarness {
  const { attachTo, withoutAnchor = false } = harnessOptions
  const containerRef = ref<HTMLElement | null>(null)
  const panelRef = ref<HTMLElement | null>(null)
  const anchorRef = ref<HTMLElement | null>(null)
  const placementRef = ref<FloatingPlacement>(placement)
  const enabledRef = ref(true)
  const flipRef = ref(true)
  const boundaryRef = ref<FloatingBoundary>('scrollParent')
  const offsetRef = ref(0)
  const matchTriggerWidthRef = ref<'width' | 'minWidth' | number | false>(false)
  const pointRef = ref<FloatingPoint | null>(null)
  const virtualAnchorRef = ref<FloatingVirtualAnchor | null>(null)
  let api!: UseFloatingReturn
  const Harness = defineComponent({
    setup() {
      api = useFloating(panelRef, {
        anchor: anchorRef,
        virtualAnchor: virtualAnchorRef,
        point: pointRef,
        offsetContainer: containerRef,
        placement: placementRef,
        flip: flipRef,
        boundary: boundaryRef,
        offset: offsetRef,
        matchTriggerWidth: matchTriggerWidthRef,
        enabled: enabledRef
      })
      return () =>
        h('div', { ref: containerRef, class: 'va-container' }, [
          h('div', { ref: panelRef, class: 'va-panel' }),
          withoutAnchor ? null : h('span', { ref: anchorRef, class: 'va-anchor' })
        ])
    }
  })
  const wrapper = mount(Harness, { attachTo: attachTo ?? document.body })
  return {
    wrapper,
    api,
    placementRef,
    enabledRef,
    flipRef,
    boundaryRef,
    offsetRef,
    matchTriggerWidthRef,
    pointRef,
    virtualAnchorRef,
    containerRef,
    panelRef,
    anchorRef
  }
}

/** 登记浮层与参照容器的桩矩形（容器默认位于文档原点左上，即 Teleport 到 body 的常见形态） */
function stubPanelRects(
  harness: FloatingHarness,
  panel = domRect(0, 0, 200, 80),
  container = domRect(0, 0, VIEW_WIDTH, 0)
): void {
  rects.set(harness.containerRef.value as HTMLElement, container)
  rects.set(harness.panelRef.value as HTMLElement, panel)
}

/** 登记浮层、参照容器与 DOM 锚点的桩矩形 */
function stubRects(
  harness: FloatingHarness,
  anchor: DOMRect,
  panel = domRect(0, 0, 200, 80),
  container = domRect(0, 0, VIEW_WIDTH, 0)
): void {
  stubPanelRects(harness, panel, container)
  rects.set(harness.anchorRef.value as HTMLElement, anchor)
}

let wrapper: ReturnType<typeof mount> | null = null
let extraElements: HTMLElement[] = []

beforeEach(() => {
  originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
  HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    return rects.get(this) ?? viewportRect
  }
  // 内核按布局尺寸（offsetWidth / offsetHeight）测量浮层，happy-dom 无布局引擎，按桩矩形补齐
  originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
  originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement): number {
      return (offsetSizes.get(this) ?? rects.get(this) ?? viewportRect).width
    }
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement): number {
      return (offsetSizes.get(this) ?? rects.get(this) ?? viewportRect).height
    }
  })
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  extraElements.forEach((el) => el.remove())
  extraElements = []
  rects.clear()
  offsetSizes.clear()
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  if (originalOffsetWidth) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
  }
  if (originalOffsetHeight) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  }
  vi.restoreAllMocks()
})

describe('useFloating · 集成', () => {
  it('空间充足时按期望方向定位，样式相对定位容器计算', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()

    stubRects(harness, domRect(400, 300, 100, 40))
    harness.api.update()

    expect(harness.api.actualPlacement.value).toBe('bottomLeft')
    expect(harness.api.panelStyle.value).toEqual({ top: '340px', left: '400px', translate: '' })
    expect(harness.api.transformOrigin.value).toBe('top left')
  })

  it('主轴空间不足时翻转，翻转后的实际方向按对外命名输出', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()

    // 锚点贴近视口底部：下方仅剩 0px
    stubRects(harness, domRect(400, 560, 100, 40))
    harness.api.update()

    expect(harness.api.actualPlacement.value).toBe('topLeft')
    expect(harness.api.panelStyle.value).toEqual({ top: '560px', left: '400px', translate: '0 -100%' })
    expect(harness.api.transformOrigin.value).toBe('bottom left')
  })

  it('空间充足时 12 向 placement 均不翻转（对外命名 ↔ 内核 kebab 命名映射往返自洽）', async () => {
    const placements: FloatingPlacement[] = [
      'top',
      'topLeft',
      'topRight',
      'bottom',
      'bottomLeft',
      'bottomRight',
      'left',
      'leftTop',
      'leftBottom',
      'right',
      'rightTop',
      'rightBottom'
    ]
    const harness = mountFloating('top')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))

    for (const placement of placements) {
      harness.placementRef.value = placement
      await nextTick()
      expect(harness.api.actualPlacement.value).toBe(placement)
    }
  })

  it('enabled=false 时不测量、不更新样式', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))
    harness.api.update()
    const before = { ...harness.api.panelStyle.value }

    harness.enabledRef.value = false
    await nextTick()
    stubRects(harness, domRect(10, 10, 100, 40))
    harness.api.update()

    expect(harness.api.panelStyle.value).toEqual(before)
  })

  it('锚点缺失时 update() 安全跳过，不抛错且样式保持原状', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    // 未登记锚点矩形时元素仍在，此处以「卸载后调用」模拟缺失
    harness.wrapper.unmount()
    wrapper = null
    expect(() => harness.api.update()).not.toThrow()
  })
})

describe('useFloating · 同步层（全链滚动监听）', () => {
  it('锚点处于嵌套双层滚动容器内时，内外两层与视口都被监听', async () => {
    const outer = document.createElement('div')
    outer.style.overflow = 'auto'
    const inner = document.createElement('div')
    inner.style.overflow = 'auto'
    outer.appendChild(inner)
    document.body.appendChild(outer)
    extraElements = [outer]

    const outerAdd = vi.spyOn(outer, 'addEventListener')
    const innerAdd = vi.spyOn(inner, 'addEventListener')
    const winAdd = vi.spyOn(window, 'addEventListener')

    const harness = mountFloating('bottomLeft', { attachTo: inner })
    wrapper = harness.wrapper
    await nextTick()

    expect(innerAdd.mock.calls.some((call) => call[0] === 'scroll')).toBe(true)
    // 旧实现只监听最近的一个滚动祖先（inner），外层滚动不会触发跟随 —— 此处锁住全链行为
    expect(outerAdd.mock.calls.some((call) => call[0] === 'scroll')).toBe(true)
    expect(winAdd.mock.calls.some((call) => call[0] === 'scroll')).toBe(true)
  })

  it('外层滚动容器派发 scroll 时，浮层按新的锚点位置重算', async () => {
    const outer = document.createElement('div')
    outer.style.overflow = 'auto'
    document.body.appendChild(outer)
    extraElements = [outer]

    const harness = mountFloating('bottomLeft', { attachTo: outer })
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))
    harness.api.update()
    expect(harness.api.panelStyle.value.left).toBe('400px')

    stubRects(harness, domRect(100, 300, 100, 40))
    outer.dispatchEvent(new Event('scroll'))
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(harness.api.panelStyle.value.left).toBe('100px')
  })
})

describe('useFloating · 锚点三选一', () => {
  it('x-y 手动定位：以点锚点求解（宽高为 0），可用于跟随鼠标', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))

    harness.pointRef.value = { x: 300, y: 200 }
    await nextTick()

    expect(harness.api.panelStyle.value).toEqual({ top: '200px', left: '300px', translate: '' })
  })

  it('x-y 手动定位 + 居中方向：浮层中心对齐到该点', async () => {
    const harness = mountFloating('bottom')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))

    harness.pointRef.value = { x: 300, y: 200 }
    await nextTick()

    // 点锚点宽为 0，故 left 即该点 x，再由 translate 的 -50% 实现居中
    expect(harness.api.panelStyle.value).toEqual({ top: '200px', left: '300px', translate: '-50%' })
  })

  it('虚拟锚点：接受任意 getBoundingClientRect 来源（非 DOM 元素）', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))

    harness.virtualAnchorRef.value = { getBoundingClientRect: () => domRect(500, 100, 60, 30) }
    await nextTick()

    expect(harness.api.panelStyle.value).toEqual({ top: '130px', left: '500px', translate: '' })
  })

  it('优先级：point > virtualAnchor > anchor', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))

    // 仅 DOM 锚点
    harness.api.update()
    expect(harness.api.panelStyle.value.left).toBe('400px')
    // 虚拟锚点覆盖 DOM 锚点
    harness.virtualAnchorRef.value = { getBoundingClientRect: () => domRect(500, 100, 60, 30) }
    await nextTick()
    expect(harness.api.panelStyle.value.left).toBe('500px')
    // 点锚点覆盖虚拟锚点
    harness.pointRef.value = { x: 120, y: 200 }
    await nextTick()
    expect(harness.api.panelStyle.value.left).toBe('120px')
    // 手动锚点撤销后回落到虚拟锚点
    harness.pointRef.value = null
    await nextTick()
    expect(harness.api.panelStyle.value.left).toBe('500px')
  })

  it('仅手动锚点（无 DOM 锚点）时同样可定位，且不收集滚动链', async () => {
    const winAdd = vi.spyOn(window, 'addEventListener')
    const harness = mountFloating('bottomLeft', { withoutAnchor: true })
    wrapper = harness.wrapper
    await nextTick()
    expect(harness.anchorRef.value).toBeNull()
    stubPanelRects(harness)

    harness.pointRef.value = { x: 10, y: 10 }
    await nextTick()

    // 无 DOM 锚点也应正常求解（需求：Tour / 鼠标定点不需要 DOM 元素）
    expect(harness.api.panelStyle.value).toEqual({ top: '10px', left: '10px', translate: '' })
    // resize 是视口级事件，与锚点类型无关；滚动链依赖 DOM 祖先，故此处不注册
    expect(winAdd.mock.calls.some((call) => call[0] === 'resize')).toBe(true)
    expect(winAdd.mock.calls.some((call) => call[0] === 'scroll')).toBe(false)
  })
})

describe('useFloating · 移动锚点持续重对齐', () => {
  it('锚点移动后调用 sync() 即可跟随（拖动场景）', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))
    harness.api.update()
    expect(harness.api.panelStyle.value.left).toBe('400px')

    // 模拟拖动：锚点持续移动，且不产生任何滚动 / resize 事件
    stubRects(harness, domRect(250, 320, 100, 40))
    harness.api.sync()
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(harness.api.panelStyle.value).toEqual({ top: '360px', left: '250px', translate: '' })
  })

  it('sync() 为帧级合并：同一帧内多次调用只重算一次', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40))
    harness.api.update()
    // 先等一拍，确保首帧内的异步回调（如字体就绪）都已落定，避免计入读数
    await new Promise((resolve) => setTimeout(resolve, 10))

    const anchorEl = harness.anchorRef.value as HTMLElement
    let reads = 0
    anchorEl.getBoundingClientRect = () => {
      reads += 1
      return domRect(400, 300, 100, 40)
    }
    harness.api.sync()
    harness.api.sync()
    harness.api.sync()
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(reads).toBe(1)
  })
})

describe('useFloating · 就地渲染（to: false）场景', () => {
  it('浮层不 Teleport 时，定位相对参照容器原点计算', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    // 容器位于 (50, 40)：面板与容器同在带定位祖先内，left / top 需减去容器原点
    stubRects(harness, domRect(400, 300, 100, 40), domRect(50, 40, 200, 80), domRect(50, 40, 300, 0))
    harness.api.update()

    expect(harness.api.panelStyle.value).toEqual({ top: '300px', left: '350px', translate: '' })
  })
})

describe('useFloating · 业务侧合并', () => {
  it('浮层尺寸取布局尺寸（offsetWidth / offsetHeight），不受缩放动画期间的 rect 失真影响', async () => {
    const harness = mountFloating('top')
    wrapper = harness.wrapper
    await nextTick()
    // 上方可用空间 100
    stubRects(harness, domRect(400, 100, 100, 40), domRect(0, 0, 200, 80))
    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('top')

    // 布局高度 350（进入动画未结束时 rect 会偏小）：放不下 → 翻转
    offsetSizes.set(harness.panelRef.value as HTMLElement, { width: 200, height: 350 })
    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('bottom')
  })

  it('遮挡边界：scrollParent 口径下被滚动容器裁剪时翻转，viewport 口径下不翻转', async () => {
    const outer = document.createElement('div')
    outer.style.overflow = 'auto'
    document.body.appendChild(outer)
    extraElements = [outer]

    const harness = mountFloating('bottomLeft', { attachTo: outer })
    wrapper = harness.wrapper
    await nextTick()
    // 滚动容器高 200（视口高 600）：锚点下边缘 140，容器内下方仅剩 60，放不下 80 高的浮层
    rects.set(outer, domRect(0, 0, VIEW_WIDTH, 200))
    stubRects(harness, domRect(400, 100, 100, 40))

    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('topLeft')

    // 换成视口口径：下方空间 460，放得下 → 不翻转
    harness.boundaryRef.value = 'viewport'
    await nextTick()
    expect(harness.api.actualPlacement.value).toBe('bottomLeft')
  })

  it('等宽 / 最小等宽 / 固定宽度写入浮层尺寸，关闭时清空', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    stubRects(harness, domRect(400, 300, 100, 40)) // 触发器宽 100
    const panel = harness.panelRef.value as HTMLElement

    harness.matchTriggerWidthRef.value = 'width'
    await nextTick()
    expect(panel.style.width).toBe('100px')
    expect(panel.style.minWidth).toBe('100px')

    harness.matchTriggerWidthRef.value = 'minWidth'
    await nextTick()
    expect(panel.style.width).toBe('')
    expect(panel.style.minWidth).toBe('100px')

    harness.matchTriggerWidthRef.value = 260
    await nextTick()
    expect(panel.style.width).toBe('260px')
    expect(panel.style.minWidth).toBe('100px')

    harness.matchTriggerWidthRef.value = false
    await nextTick()
    expect(panel.style.width).toBe('')
    expect(panel.style.minWidth).toBe('')
  })

  it('翻转判定计入主轴间距（面板 + 间距仍放不下则翻转）', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    // 下方可用空间 100，面板高 80
    stubRects(harness, domRect(400, 460, 100, 40), domRect(0, 0, 200, 80))
    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('bottomLeft')

    // 间距 40 后占位 120 > 100 → 翻转（只比面板尺寸的实现不会翻转）
    harness.offsetRef.value = 40
    await nextTick()
    expect(harness.api.actualPlacement.value).toBe('topLeft')
  })

  it('真实占用空间判定：现状 Tooltip 的「面板 + 间距」语义可复现', () => {
    // 现状 Tooltip 有箭头时为「可用空间 ≥ 面板高 + 4 + 12」，等价于 offset = 16
    const target = rect(400, 400, 100, 40) // 上方空间 400，下方空间 160
    const panel = rect(0, 0, 200, 150)
    // 间距 16：下方 160 放不下 166 → 翻转
    expect(getPlacementAndOffsetOfFollower('bottom-start', target, panel, true, true, 16).placement).toBe('top-start')
    // 间距 0：下方 160 放得下 150 → 不翻转
    expect(getPlacementAndOffsetOfFollower('bottom-start', target, panel, true, true, 0).placement).toBe('bottom-start')
  })

  it('两侧都放不下时把主轴推回遮挡边界内', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    // 浮层高 500、视口高 600：锚点上方 200 / 下方 360，两侧都放不下
    stubRects(harness, domRect(400, 200, 100, 40), domRect(0, 0, 200, 500))
    harness.api.update()

    // 当前侧（下方 360）空间更大 → 不翻转；底边 200 + 40 + 500 = 740 溢出 140 → 上推 140，使底边贴住边界
    expect(harness.api.actualPlacement.value).toBe('bottomLeft')
    expect(harness.api.panelStyle.value).toEqual({ top: '100px', left: '400px', translate: '' })

    // 锚点下移后对侧（上方 400）空间更大 → 翻转到上方，再由位移把它推回边界内（视觉顶边回到 0）
    stubRects(harness, domRect(400, 400, 100, 40), domRect(0, 0, 200, 500))
    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('topLeft')
    expect(harness.api.panelStyle.value).toEqual({ top: '500px', left: '400px', translate: '0 -100%' })

    // flip=false 的语义是「不为主轴边界做任何位置调整」（Slider 气泡依赖）→ 保持期望方向与原始位移
    harness.flipRef.value = false
    await nextTick()
    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('bottomLeft')
    expect(harness.api.panelStyle.value).toEqual({ top: '440px', left: '400px', translate: '' })
  })

  it('浮层尚未渲染（display: none）时不落盘错误结论，改到后续帧重试', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    const panel = harness.panelRef.value as HTMLElement
    // 宿主 `v-show` 浮层「再次显示」的首个求解 tick：浮层仍是 display: none（尺寸量到 0）
    stubRects(harness, domRect(400, 200, 100, 40), domRect(0, 0, 200, 80))
    const before = { ...harness.api.panelStyle.value }
    panel.style.display = 'none'
    harness.api.update()
    // 未渲染时不得落盘（否则「下方永远放得下」会锁死错误方向，且此后不再有重算机会）
    expect(harness.api.panelStyle.value).toEqual(before)

    // 恢复渲染后（帧级重试）按真实尺寸求解
    panel.style.display = ''
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(harness.api.panelStyle.value).toEqual({ top: '240px', left: '400px', translate: '' })
  })
})

describe('useFloating · 锚点离屏守卫', () => {
  it('锚点已完全离开可见区时不翻转，浮层按期望方向随锚点移出', async () => {
    const harness = mountFloating('top')
    wrapper = harness.wrapper
    await nextTick()

    // 锚点整体位于视口上方（下边缘 -20 < 0）；期望方向的上方空间本就不足，缺守卫时会翻转到下方
    stubRects(harness, domRect(400, -60, 100, 40))
    harness.api.update()

    expect(harness.api.actualPlacement.value).toBe('top')
    expect(harness.api.panelStyle.value).toEqual({ top: '-60px', left: '450px', translate: '-50% -100%' })
  })

  it('与可见区相接只差 1px：贴住边界仍在界内（翻转），完全离开才不调整', async () => {
    const harness = mountFloating('top')
    wrapper = harness.wrapper
    await nextTick()

    // 下边缘恰好 0：与可见区无交集 → 视为离屏，保持期望方向
    stubRects(harness, domRect(400, -40, 100, 40))
    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('top')
    expect(harness.api.panelStyle.value).toEqual({ top: '-40px', left: '450px', translate: '-50% -100%' })

    // 下边缘留有 1px：仍在可见区内 → 正常翻转（守卫不得误伤「锚点贴视口边缘」的既有行为）
    stubRects(harness, domRect(400, -39, 100, 40))
    harness.api.update()
    expect(harness.api.actualPlacement.value).toBe('bottom')
    expect(harness.api.panelStyle.value).toEqual({ top: '1px', left: '450px', translate: '-50%' })
  })

  it('锚点被滚动容器裁掉（仍在视口内）同样视为离屏', async () => {
    const outer = document.createElement('div')
    outer.style.overflow = 'auto'
    document.body.appendChild(outer)
    extraElements = [outer]

    const harness = mountFloating('top', { attachTo: outer })
    wrapper = harness.wrapper
    await nextTick()
    // 滚动容器占 100 ~ 300，锚点位于视口 20 ~ 60 —— 在视口内但已被容器裁掉（用户看不到）
    rects.set(outer, domRect(0, 100, VIEW_WIDTH, 200))
    stubRects(harness, domRect(400, 20, 100, 40))
    harness.api.update()

    expect(harness.api.actualPlacement.value).toBe('top')
    expect(harness.api.panelStyle.value).toEqual({ top: '20px', left: '450px', translate: '-50% -100%' })
  })

  it('锚点部分可见且两侧都放不下时仍把主轴推回边界内', async () => {
    const harness = mountFloating('bottomLeft')
    wrapper = harness.wrapper
    await nextTick()
    // 浮层高 500、视口高 600：锚点 100 ~ 140 完全可见，上方 100 / 下方 460 均放不下 → 上推 40 使底边贴住边界
    stubRects(harness, domRect(400, 100, 100, 40), domRect(0, 0, 200, 500))
    harness.api.update()

    expect(harness.api.actualPlacement.value).toBe('bottomLeft')
    expect(harness.api.panelStyle.value).toEqual({ top: '100px', left: '400px', translate: '' })
  })
})
