import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import Carousel from 'components/carousel/Carousel.vue'

interface CarouselInst {
  to: (n: number, dontAnimate?: boolean) => void
  prev: () => void
  next: () => void
  getCurrentIndex: () => number
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 轮询等待条件成立，避免依赖固定 sleep 造成的时序脆弱
async function waitFor(cond: () => boolean, timeout = 2000): Promise<void> {
  const start = Date.now()
  while (!cond() && Date.now() - start < timeout) {
    await sleep(10)
  }
}

const UNIT = 300 // 与下方 offsetWidth 桩保持一致
const HEIGHT = 200 // 与下方 offsetHeight 桩保持一致

// happy-dom 无布局引擎：元素尺寸恒为 0，且不会派发 ResizeObserver 回调。
// Carousel 在尺寸未测量时会跳过位移换算与自动轮播调度，故须补齐这两项环境能力。
const offsetWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
const offsetHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
const realResizeObserver = globalThis.ResizeObserver

function installLayoutStub(): void {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => UNIT })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, get: () => HEIGHT })
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
}

function restoreLayoutEnv(): void {
  globalThis.ResizeObserver = realResizeObserver
  if (offsetWidthDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', offsetWidthDescriptor)
  }
  if (offsetHeightDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', offsetHeightDescriptor)
  }
}

const DEFAULT_IMAGES = [{ src: 'a.png' }, { src: 'b.png' }, { src: 'c.png' }]

async function mountCarousel(props: Record<string, unknown> = {}) {
  const wrapper = mount(Carousel, {
    attachTo: document.body,
    props: {
      autoplay: false,
      effect: 'slide',
      slideDuration: 50,
      images: DEFAULT_IMAGES,
      ...props
    }
  })
  await nextTick()
  return wrapper
}

type CarouselWrapper = Awaited<ReturnType<typeof mountCarousel>>

// 读取轮播容器的位移数值（水平/垂直轮播分别用 translateX / translateY 驱动）
function slideOffset(el: HTMLElement): number {
  const matched = /translate[XY]\((-?[\d.]+)px\)/.exec(el.style.transform)
  return matched ? Number(matched[1]) : NaN
}

function slideEl(wrapper: CarouselWrapper): HTMLElement {
  return wrapper.find('.carousel-flex-wrap').element as HTMLElement
}

function inst(wrapper: CarouselWrapper): CarouselInst {
  return wrapper.vm as unknown as CarouselInst
}

function slideWraps(wrapper: CarouselWrapper) {
  return wrapper.findAll('.image-wrap')
}

// 第 index 个轮播项是否仍处于加载态（Spin 加载中会给内容加 spin-blur）
function isSpinning(wrapper: CarouselWrapper, index: number): boolean {
  return slideWraps(wrapper)[index].find('.spin-blur').exists()
}

/**
 * 回归守护：Carousel 的状态边界与键盘可访问性
 *
 * 覆盖四类曾真实存在的缺陷：
 * 1. 图片为空时点击箭头，`imageAmount` 为 0 使取模得到 NaN，污染 activeSwitcher 并永久卡死 switchPrevent；
 * 2. 图片数量减少后当前页越界，slide 滑出空白区、fade 下所有图片都不满足选中条件而整块不可见；
 * 3. 图片加载失败无兜底，Spin 永久旋转且蒙层使该页始终不可点击；
 * 4. 箭头/指示点上的 `@keydown.prevent` 无条件吞掉 Tab，形成键盘焦点陷阱。
 *
 * 另守护两项状态修正：加载态按 src 记录（换地址后能重新进入加载态）、
 * 鼠标悬停暂停不会被 props 变更经 `initCarousel` 静默解除。
 */
describe('Carousel 状态与可访问性', () => {
  beforeEach(() => {
    installLayoutStub()
  })
  afterEach(() => {
    restoreLayoutEnv()
  })

  it('图片为空时点击箭头不污染当前页，补齐图片后仍可正常切换', async () => {
    const wrapper = await mountCarousel({ images: [] })
    inst(wrapper).next()
    expect(inst(wrapper).getCurrentIndex()).toBe(1)

    await wrapper.setProps({ images: DEFAULT_IMAGES })
    await nextTick()
    inst(wrapper).next()
    await waitFor(() => slideOffset(slideEl(wrapper)) === -UNIT)
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    wrapper.unmount()
  })

  it('图片数量减少后当前页被钳制回有效区间', async () => {
    const wrapper = await mountCarousel()
    inst(wrapper).to(3)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -2 * UNIT)
    expect(inst(wrapper).getCurrentIndex()).toBe(3)

    await wrapper.setProps({ images: [{ src: 'a.png' }] })
    await nextTick()
    // 旧实现保留越界下标，位移会停在已不存在的第三张上
    expect(inst(wrapper).getCurrentIndex()).toBe(1)
    expect(slideOffset(slideEl(wrapper))).toBe(0)
    wrapper.unmount()
  })

  it('图片加载失败时结束加载态，不再永久旋转', async () => {
    const wrapper = await mountCarousel()
    // 3 张图片 + 1 张首图副本，初始全部处于加载态
    expect(slideWraps(wrapper).length).toBe(4)
    expect(wrapper.findAll('.spin-blur').length).toBe(4)

    await slideWraps(wrapper)[0].find('img').trigger('error')
    await nextTick()
    // a.png 与其副本同时结束加载态（加载态按 src 记录），其余仍保持加载中
    expect(isSpinning(wrapper, 0)).toBe(false)
    expect(isSpinning(wrapper, 3)).toBe(false)
    expect(wrapper.findAll('.spin-blur').length).toBe(2)
    wrapper.unmount()
  })

  it('图片地址变更后重新进入加载态', async () => {
    const wrapper = await mountCarousel()
    await slideWraps(wrapper)[0].find('img').trigger('load')
    await nextTick()
    expect(isSpinning(wrapper, 0)).toBe(false)

    await wrapper.setProps({ images: [{ src: 'a-new.png' }, { src: 'b.png' }, { src: 'c.png' }] })
    await nextTick()
    // 旧实现按下标记录加载态，新地址会被误判为已加载
    expect(isSpinning(wrapper, 0)).toBe(true)
    wrapper.unmount()
  })

  it('slide 效果渲染首图副本，副本对辅助技术隐藏且不参与键盘焦点', async () => {
    const wrapper = await mountCarousel()
    expect(slideWraps(wrapper).length).toBe(4)
    const clone = slideWraps(wrapper)[3]
    expect(clone.attributes('aria-hidden')).toBe('true')
    expect(clone.find('a').attributes('tabindex')).toBe('-1')
    // 真实图片不应被隐藏
    expect(slideWraps(wrapper)[0].attributes('aria-hidden')).toBeUndefined()
    wrapper.unmount()
  })

  it('fade 效果不渲染首图副本', async () => {
    const wrapper = await mountCarousel({ effect: 'fade' })
    expect(slideWraps(wrapper).length).toBe(3)
    wrapper.unmount()
  })

  it('方向键切换并阻止默认行为，Tab 键保持默认行为', async () => {
    const wrapper = await mountCarousel()
    const arrow = wrapper.find('.arrow-left')
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true, bubbles: true })
    arrow.element.dispatchEvent(tabEvent)
    // 旧实现的无条件 prevent 会吞掉 Tab，使焦点无法从箭头移出
    expect(tabEvent.defaultPrevented).toBe(false)

    const nextEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true, bubbles: true })
    arrow.element.dispatchEvent(nextEvent)
    expect(nextEvent.defaultPrevented).toBe(true)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -UNIT)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    wrapper.unmount()
  })

  it('图片不足两张时不渲染箭头，避免出现点击无反应的控件', async () => {
    const empty = await mountCarousel({ images: [] })
    expect(empty.find('.arrow-left').exists()).toBe(false)
    expect(empty.find('.arrow-right').exists()).toBe(false)
    empty.unmount()

    const single = await mountCarousel({ images: [{ src: 'a.png' }] })
    expect(single.find('.arrow-left').exists()).toBe(false)
    expect(single.find('.arrow-right').exists()).toBe(false)
    single.unmount()

    // 可切换时才渲染箭头
    const multi = await mountCarousel()
    expect(multi.find('.arrow-left').exists()).toBe(true)
    expect(multi.find('.arrow-right').exists()).toBe(true)
    multi.unmount()
  })

  it('to 方法拒绝非整数入参', async () => {
    const wrapper = await mountCarousel()
    inst(wrapper).to(1.5)
    // 旧实现会写入 1.5，使指示点永不命中并把位移拖到半格
    expect(inst(wrapper).getCurrentIndex()).toBe(1)
    expect(slideOffset(slideEl(wrapper))).toBe(0)

    inst(wrapper).to(2)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -UNIT)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    wrapper.unmount()
  })

  it('鼠标悬停暂停后，props 变更不会解除暂停', async () => {
    // 自证：相同自动轮播配置下不悬停时位移确实会被推进
    const auto = await mountCarousel({ autoplay: true, interval: 60, slideDuration: 30 })
    await slideWraps(auto)[0].find('img').trigger('load')
    await nextTick()
    await waitFor(() => slideOffset(slideEl(auto)) < 0)
    expect(slideOffset(slideEl(auto))).toBeLessThan(0)
    auto.unmount()

    const wrapper = await mountCarousel({ autoplay: true, pauseOnMouseEnter: true, interval: 60, slideDuration: 30 })
    await slideWraps(wrapper)[0].find('img').trigger('load')
    await nextTick()
    await wrapper.trigger('mouseenter')
    const el = slideEl(wrapper)
    const before = slideOffset(el)
    // 旧实现会在 initCarousel → onStart 中清掉暂停标志，导致鼠标仍悬停时恢复轮播
    await wrapper.setProps({ interval: 61 })
    await sleep(250)
    expect(slideOffset(el)).toBe(before)
    wrapper.unmount()
  })
})

// ---------- 新增能力（P2）守护 ----------

const setPointerCaptureDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'setPointerCapture')
const releasePointerCaptureDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'releasePointerCapture')

// happy-dom 未实现指针捕获：补齐为无操作实现，否则 onPointerDown 中的捕获调用会直接抛错
function stubPointerCapture(): void {
  Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', { configurable: true, value: () => {} })
  Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', { configurable: true, value: () => {} })
}

function restorePointerCapture(): void {
  const descriptors: [string, PropertyDescriptor | undefined][] = [
    ['setPointerCapture', setPointerCaptureDescriptor],
    ['releasePointerCapture', releasePointerCaptureDescriptor]
  ]
  descriptors.forEach(([name, descriptor]) => {
    if (descriptor) {
      Object.defineProperty(HTMLElement.prototype, name, descriptor)
    } else {
      delete (HTMLElement.prototype as unknown as Record<string, unknown>)[name]
    }
  })
}

// happy-dom 的 PointerEvent / WheelEvent 支持不完整：改用 MouseEvent 承载并补齐组件读取的字段
function dispatchPointer(el: HTMLElement, type: string, init: Record<string, unknown>): void {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true })
  Object.assign(event, init)
  el.dispatchEvent(event)
}

function dispatchWheel(el: HTMLElement, deltaX: number, deltaY: number): void {
  const event = new MouseEvent('wheel', { bubbles: true, cancelable: true })
  Object.assign(event, { deltaX, deltaY })
  el.dispatchEvent(event)
}

// 临时把系统「减弱动态效果」偏好置为命中，返回还原函数
function stubReducedMotion(): () => void {
  const original = window.matchMedia
  window.matchMedia = ((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false
  })) as unknown as typeof window.matchMedia
  return () => {
    window.matchMedia = original
  }
}

function carouselRoot(wrapper: CarouselWrapper): HTMLElement {
  return wrapper.find('.carousel-wrap').element as HTMLElement
}

/**
 * P2 能力守护：loop / initialIndex / 受控 currentIndex / beforeChange·afterChange /
 * to(n, dontAnimate) / objectFit / prefers-reduced-motion / 拖拽 / 滚轮 / 箭头与指示点插槽
 */
describe('Carousel 新增能力（P2）', () => {
  beforeEach(() => {
    installLayoutStub()
    stubPointerCapture()
  })
  afterEach(() => {
    restoreLayoutEnv()
    restorePointerCapture()
  })

  it('关闭 loop 后不渲染首图副本，首尾两个方向都不再回绕', async () => {
    const wrapper = await mountCarousel({ loop: false })
    expect(slideWraps(wrapper).length).toBe(3)

    inst(wrapper).prev()
    await sleep(80)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)
    expect(slideOffset(slideEl(wrapper))).toBe(0)

    inst(wrapper).to(3)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -2 * UNIT)
    inst(wrapper).next()
    await sleep(80)
    expect(inst(wrapper).getCurrentIndex()).toBe(3)
    expect(slideOffset(slideEl(wrapper))).toBe(-2 * UNIT)
    wrapper.unmount()
  })

  it('关闭 loop 后自动轮播到达末页即停止', async () => {
    const wrapper = await mountCarousel({ loop: false, autoplay: true, interval: 40, slideDuration: 20 })
    await slideWraps(wrapper)[0].find('img').trigger('load')
    await nextTick()
    await waitFor(() => inst(wrapper).getCurrentIndex() === 3)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -2 * UNIT)
    const settled = slideOffset(slideEl(wrapper))
    await sleep(220)
    expect(inst(wrapper).getCurrentIndex()).toBe(3)
    expect(slideOffset(slideEl(wrapper))).toBe(settled)
    wrapper.unmount()
  })

  it('开启 loop 时末页向后切换回绕到首张', async () => {
    const wrapper = await mountCarousel()
    inst(wrapper).to(3)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -2 * UNIT)
    inst(wrapper).next()
    await waitFor(() => inst(wrapper).getCurrentIndex() === 1)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)
    wrapper.unmount()
  })

  it('initialIndex 决定初始展示页，越界时钳制到有效区间', async () => {
    const wrapper = await mountCarousel({ initialIndex: 3 })
    expect(inst(wrapper).getCurrentIndex()).toBe(3)
    expect(slideOffset(slideEl(wrapper))).toBe(-2 * UNIT)
    wrapper.unmount()

    const overflow = await mountCarousel({ initialIndex: 99 })
    expect(inst(overflow).getCurrentIndex()).toBe(3)
    expect(slideOffset(slideEl(overflow))).toBe(-2 * UNIT)
    overflow.unmount()
  })

  it('受控 currentIndex 外部变更时同步切换', async () => {
    const wrapper = await mountCarousel({ currentIndex: 1 })
    await wrapper.setProps({ currentIndex: 3 })
    await waitFor(() => inst(wrapper).getCurrentIndex() === 3)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -2 * UNIT)
    expect(slideOffset(slideEl(wrapper))).toBe(-2 * UNIT)
    wrapper.unmount()
  })

  it('内部切换回写 update:currentIndex', async () => {
    const wrapper = await mountCarousel({ currentIndex: 1 })
    inst(wrapper).next()
    await waitFor(() => wrapper.emitted('update:currentIndex') !== undefined)
    expect(wrapper.emitted('update:currentIndex')?.[0]).toEqual([2])
    wrapper.unmount()
  })

  it('slide 切换依次抛出 beforeChange 与 afterChange', async () => {
    const wrapper = await mountCarousel()
    inst(wrapper).next()
    expect(wrapper.emitted('beforeChange')?.[0]).toEqual([1, 2])
    await waitFor(() => wrapper.emitted('afterChange') !== undefined)
    expect(wrapper.emitted('afterChange')?.[0]).toEqual([2])
    wrapper.unmount()
  })

  it('fade 切换同样抛出 beforeChange 与 afterChange', async () => {
    const wrapper = await mountCarousel({ effect: 'fade', fadeDuration: 40 })
    inst(wrapper).next()
    expect(wrapper.emitted('beforeChange')?.[0]).toEqual([1, 2])
    await waitFor(() => wrapper.emitted('afterChange') !== undefined)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    wrapper.unmount()
  })

  it('切换到当前页时不抛出切换事件', async () => {
    const wrapper = await mountCarousel()
    inst(wrapper).to(1)
    await sleep(80)
    expect(wrapper.emitted('beforeChange')).toBeUndefined()
    expect(wrapper.emitted('afterChange')).toBeUndefined()
    wrapper.unmount()
  })

  it('to(n, true) 跳过动画直接落位', async () => {
    const wrapper = await mountCarousel({ slideDuration: 5000 })
    inst(wrapper).to(3, true)
    await nextTick()
    expect(slideOffset(slideEl(wrapper))).toBe(-2 * UNIT)
    expect(inst(wrapper).getCurrentIndex()).toBe(3)
    wrapper.unmount()
  })

  it('objectFit 绑定到图片 object-fit', async () => {
    const wrapper = await mountCarousel({ objectFit: 'cover' })
    expect(slideWraps(wrapper)[0].find('img').attributes('style')).toContain('object-fit: cover')
    wrapper.unmount()
  })

  it('系统偏好减弱动效时滑动瞬时落位', async () => {
    const restoreMatchMedia = stubReducedMotion()
    try {
      const wrapper = await mountCarousel({ slideDuration: 5000 })
      inst(wrapper).next()
      await nextTick()
      expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
      wrapper.unmount()
    } finally {
      restoreMatchMedia()
    }
  })

  it('开启 draggable 后拖拽超过半个容器宽度触发翻页', async () => {
    const wrapper = await mountCarousel({ draggable: true, slideDuration: 20 })
    const root = carouselRoot(wrapper)
    dispatchPointer(root, 'pointerdown', { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
    dispatchPointer(root, 'pointermove', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 })
    dispatchPointer(root, 'pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 })
    await waitFor(() => inst(wrapper).getCurrentIndex() === 2)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -UNIT)
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    wrapper.unmount()
  })

  it('开启 draggable 后拖拽位移不足时回弹且不翻页', async () => {
    const wrapper = await mountCarousel({ draggable: true, slideDuration: 20 })
    const nowSpy = vi.spyOn(Date, 'now')
    nowSpy.mockReturnValue(1_000_000)
    const root = carouselRoot(wrapper)
    dispatchPointer(root, 'pointerdown', { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
    dispatchPointer(root, 'pointermove', { pointerId: 1, pointerType: 'mouse', clientX: 160, clientY: 0 })
    await nextTick()
    // 自证本用例非空：拖拽确实推进了位移
    expect(slideOffset(slideEl(wrapper))).toBe(-40)
    // 拖拽 40px 且耗时 200ms：位移与速度均低于翻页阈值
    nowSpy.mockReturnValue(1_000_200)
    dispatchPointer(root, 'pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 160, clientY: 0 })
    nowSpy.mockRestore()
    await waitFor(() => slideOffset(slideEl(wrapper)) === 0)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)
    expect(slideOffset(slideEl(wrapper))).toBe(0)
    wrapper.unmount()
  })

  it('开启 mousewheel 后滚轮切换，低于阈值不切换', async () => {
    const wrapper = await mountCarousel({ mousewheel: true })
    const root = carouselRoot(wrapper)
    dispatchWheel(root, 0, 5)
    await sleep(80)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)

    dispatchWheel(root, 0, 100)
    await waitFor(() => inst(wrapper).getCurrentIndex() === 2)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    wrapper.unmount()
  })

  it('未开启 mousewheel 时滚轮不切换', async () => {
    const wrapper = await mountCarousel()
    dispatchWheel(carouselRoot(wrapper), 0, 100)
    await sleep(80)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)
    wrapper.unmount()
  })

  it('箭头与指示点插槽可自定义并拿到作用域参数', async () => {
    const wrapper = mount(Carousel, {
      attachTo: document.body,
      props: { images: DEFAULT_IMAGES, effect: 'slide', slideDuration: 50 },
      slots: {
        // 作用域参数按「形参位置解构」书写，与模板插槽编译产物一致：
        // 组件只应在真实渲染时调用插槽，任何无参调用都会在此抛 TypeError
        prevArrow: ({ currentIndex, total }: Record<string, unknown>) =>
          h('button', { class: 'my-prev' }, `${currentIndex}/${total}`),
        nextArrow: () => h('button', { class: 'my-next' }, 'next'),
        dots: ({ currentIndex, total }: Record<string, unknown>) =>
          h('div', { class: 'my-dots' }, `${currentIndex}/${total}`)
      }
    })
    await nextTick()
    expect(wrapper.find('.my-prev').text()).toBe('1/3')
    expect(wrapper.find('.my-next').exists()).toBe(true)
    expect(wrapper.find('.my-dots').text()).toBe('1/3')
    expect(wrapper.find('.arrow-left').classes()).toContain('arrow-custom')
    // 自定义插槽替换默认内容
    expect(wrapper.find('.arrow-icon').exists()).toBe(false)
    expect(wrapper.find('.dot-item').exists()).toBe(false)
    wrapper.unmount()
  })
})
