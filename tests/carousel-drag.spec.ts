import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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
const setPointerCaptureDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'setPointerCapture')
const releasePointerCaptureDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'releasePointerCapture')
const realResizeObserver = globalThis.ResizeObserver
// 指针捕获调用记录：用于验证捕获时机（这是「draggable 下子元素 click 是否失效」的根因）
const captureSpy = vi.fn()

function installLayoutStub(): void {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => UNIT })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, get: () => HEIGHT })
  Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', { configurable: true, value: captureSpy })
  Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', { configurable: true, value: () => {} })
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
  const restore = (name: string, descriptor?: PropertyDescriptor) => {
    if (descriptor) {
      Object.defineProperty(HTMLElement.prototype, name, descriptor)
    } else {
      delete (HTMLElement.prototype as unknown as Record<string, unknown>)[name]
    }
  }
  restore('offsetWidth', offsetWidthDescriptor)
  restore('offsetHeight', offsetHeightDescriptor)
  restore('setPointerCapture', setPointerCaptureDescriptor)
  restore('releasePointerCapture', releasePointerCaptureDescriptor)
}

const DEFAULT_IMAGES = [{ src: 'a.png' }, { src: 'b.png' }, { src: 'c.png' }]

async function mountCarousel(props: Record<string, unknown> = {}) {
  const wrapper = mount(Carousel, {
    attachTo: document.body,
    props: { autoplay: false, effect: 'slide', slideDuration: 20, images: DEFAULT_IMAGES, ...props }
  })
  await nextTick()
  return wrapper
}

type CarouselWrapper = Awaited<ReturnType<typeof mountCarousel>>

const inst = (wrapper: CarouselWrapper) => wrapper.vm as unknown as CarouselInst
const rootEl = (wrapper: CarouselWrapper) => wrapper.find('.carousel-wrap').element as HTMLElement
const slideEl = (wrapper: CarouselWrapper) => wrapper.find('.carousel-flex-wrap').element as HTMLElement

function slideOffset(el: HTMLElement): number {
  const matched = /translate[XY]\((-?[\d.]+)px\)/.exec(el.style.transform)
  return matched ? Number(matched[1]) : NaN
}

function dispatchPointer(el: HTMLElement, type: string, init: Record<string, unknown>): void {
  // happy-dom 的 PointerEvent 支持不完整：改用 MouseEvent 承载并补齐组件读取的字段
  const event = new MouseEvent(type, { bubbles: true, cancelable: true })
  Object.assign(event, init)
  el.dispatchEvent(event)
}

// 拖拽 40px 且耗时 200ms：位移与速度均低于翻页阈值 → 回弹、不翻页
async function dragBelowThreshold(wrapper: CarouselWrapper): Promise<void> {
  const nowSpy = vi.spyOn(Date, 'now')
  nowSpy.mockReturnValue(1_000_000)
  const root = rootEl(wrapper)
  dispatchPointer(root, 'pointerdown', { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
  dispatchPointer(root, 'pointermove', { pointerId: 1, pointerType: 'mouse', clientX: 160, clientY: 0 })
  await nextTick()
  nowSpy.mockReturnValue(1_000_200)
  dispatchPointer(root, 'pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 160, clientY: 0 })
  nowSpy.mockRestore()
  await waitFor(() => slideOffset(slideEl(wrapper)) === 0)
}

function dispatchDrag(wrapper: CarouselWrapper, toX: number): void {
  const root = rootEl(wrapper)
  dispatchPointer(root, 'pointerdown', { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
  dispatchPointer(root, 'pointermove', { pointerId: 1, pointerType: 'mouse', clientX: toX, clientY: 0 })
  dispatchPointer(root, 'pointerup', { pointerId: 1, pointerType: 'mouse', clientX: toX, clientY: 0 })
}

// 模拟页面可见性变化（happy-dom 下用实例属性遮蔽原型 getter）
function setVisibility(state: 'hidden' | 'visible'): void {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => state })
  document.dispatchEvent(new Event('visibilitychange'))
}

function restoreVisibility(): void {
  delete (document as unknown as Record<string, unknown>).visibilityState
}

/**
 * 回归守护：拖拽交互与切换事件契约
 *
 * 覆盖四类曾真实存在的缺陷：
 * 1. 拖拽未达阈值回弹时误抛 afterChange（且无对应 beforeChange），破坏事件成对性；
 * 2. `pointerdown` 就无条件 setPointerCapture，使浏览器把随后的 click 重定向到轮播容器，
 *    导致箭头 / 指示点 / 图片上的 click 全部失效（真实浏览器行为，happy-dom 无法复现，
 *    故此处以「捕获时机」作为可测代理，并额外断言箭头 click 链路可用）；
 * 3. 受控 currentIndex 在切换动画期间变更被直接丢弃，受控方与内部下标永久失同步；
 * 4. 页面隐藏中止在飞切换时漏抛 afterChange（与 1 同源，收口到 settleSwitch 后由事件成对性覆盖）。
 */
describe('Carousel 拖拽与切换事件契约', () => {
  beforeEach(() => {
    installLayoutStub()
    captureSpy.mockClear()
  })
  afterEach(() => {
    restoreLayoutEnv()
    restoreVisibility()
  })

  it('拖拽未达阈值回弹：不抛 beforeChange 与 afterChange，且回到原位', async () => {
    const wrapper = await mountCarousel({ draggable: true })
    await dragBelowThreshold(wrapper)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)
    expect(slideOffset(slideEl(wrapper))).toBe(0)
    expect(wrapper.emitted('beforeChange')).toBeUndefined()
    expect(wrapper.emitted('afterChange')).toBeUndefined()
    wrapper.unmount()
  })

  it('拖拽超过阈值翻页：beforeChange 与 afterChange 成对抛出', async () => {
    const wrapper = await mountCarousel({ draggable: true })
    dispatchDrag(wrapper, 0)
    await waitFor(() => inst(wrapper).getCurrentIndex() === 2)
    await waitFor(() => wrapper.emitted('afterChange') !== undefined)
    expect(wrapper.emitted('beforeChange')).toEqual([[1, 2]])
    expect(wrapper.emitted('afterChange')).toEqual([[2]])
    wrapper.unmount()
  })

  it('指针捕获延后到越过拖拽阈值：普通点击不捕获，避免子元素 click 被重定向', async () => {
    const wrapper = await mountCarousel({ draggable: true })
    const root = rootEl(wrapper)
    // 纯点击：按下即抬起，不应捕获
    dispatchPointer(root, 'pointerdown', { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
    dispatchPointer(root, 'pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 200, clientY: 0 })
    await nextTick()
    expect(captureSpy).not.toHaveBeenCalled()

    // 位移未达阈值：仍不捕获
    dispatchPointer(root, 'pointerdown', { pointerId: 2, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
    dispatchPointer(root, 'pointermove', { pointerId: 2, pointerType: 'mouse', clientX: 197, clientY: 0 })
    await nextTick()
    expect(captureSpy).not.toHaveBeenCalled()

    // 越过阈值：捕获一次
    dispatchPointer(root, 'pointermove', { pointerId: 2, pointerType: 'mouse', clientX: 190, clientY: 0 })
    await nextTick()
    expect(captureSpy).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('未开启 draggable 时始终不捕获指针', async () => {
    const wrapper = await mountCarousel()
    dispatchDrag(wrapper, 100)
    await nextTick()
    expect(captureSpy).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('开启 draggable 后点击箭头仍可翻页，点击图片仍抛 click', async () => {
    const wrapper = await mountCarousel({ draggable: true })
    // 未发生指针捕获时 click 才会落在箭头 / 图片上，这是 draggable 可用的前提
    wrapper.find('.arrow-left').element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await waitFor(() => inst(wrapper).getCurrentIndex() === 3)
    expect(wrapper.emitted('beforeChange')).toEqual([[1, 3]])

    // 轨道首部是末图副本，首张实图在下标 1
    wrapper
      .findAll('.image-wrap')[1]
      .element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await nextTick()
    expect(wrapper.emitted('click')?.[0]).toEqual([DEFAULT_IMAGES[0]])
    wrapper.unmount()
  })

  it('受控 currentIndex 在动画期间变更：动画结束后同步，不再永久失同步', async () => {
    const wrapper = await mountCarousel({ currentIndex: 1, slideDuration: 300 })
    inst(wrapper).to(2)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    await sleep(20)
    // 动画进行中改外部下标：先记账，待本次切换结束后消费
    await wrapper.setProps({ currentIndex: 3 })
    await sleep(20)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    await waitFor(() => inst(wrapper).getCurrentIndex() === 3)
    expect(inst(wrapper).getCurrentIndex()).toBe(3)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -2 * UNIT)
    expect(slideOffset(slideEl(wrapper))).toBe(-2 * UNIT)
    wrapper.unmount()
  })

  it('页面隐藏中止在飞切换时补抛 afterChange', async () => {
    const wrapper = await mountCarousel({ slideDuration: 500 })
    inst(wrapper).next()
    expect(wrapper.emitted('afterChange')).toBeUndefined()
    setVisibility('hidden')
    await nextTick()
    // 该次切换已提交（beforeChange 已抛、当前页已更新），中止动画时须补抛 afterChange
    expect(wrapper.emitted('beforeChange')).toEqual([[1, 2]])
    expect(wrapper.emitted('afterChange')).toEqual([[2]])
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    setVisibility('visible')
    wrapper.unmount()
  })

  it('页面隐藏期间积压的受控下标，在恢复可见后生效', async () => {
    const wrapper = await mountCarousel({ currentIndex: 1, slideDuration: 300 })
    inst(wrapper).to(2)
    await sleep(20)
    await wrapper.setProps({ currentIndex: 3 })
    await sleep(20)
    setVisibility('hidden')
    await nextTick()
    // 隐藏期间不消费积压下标（此时启动动画会因 rAF 暂停而卡住 switchPrevent）
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    setVisibility('visible')
    await waitFor(() => inst(wrapper).getCurrentIndex() === 3)
    expect(inst(wrapper).getCurrentIndex()).toBe(3)
    wrapper.unmount()
  })

  // 回归守护：pointerdown 就中止在飞动画会停在两张图之间的中间位移，且 afterChange 永久丢失
  it('滑动动画进行中纯点击：动画自然结束并落位，事件仍成对', async () => {
    const wrapper = await mountCarousel({ draggable: true, slideDuration: 400 })
    inst(wrapper).next()
    await sleep(120)
    const mid = slideOffset(slideEl(wrapper))
    expect(mid).toBeLessThan(0)
    expect(mid).toBeGreaterThan(-UNIT)

    const root = rootEl(wrapper)
    dispatchPointer(root, 'pointerdown', { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
    dispatchPointer(root, 'pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 200, clientY: 0 })

    await waitFor(() => wrapper.emitted('afterChange') !== undefined)
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    expect(wrapper.emitted('beforeChange')).toEqual([[1, 2]])
    expect(wrapper.emitted('afterChange')).toEqual([[2]])
    wrapper.unmount()
  })

  it('滑动动画进行中开始拖拽：先收口在飞切换，再按拖拽翻页，两次切换事件各自成对', async () => {
    const wrapper = await mountCarousel({ draggable: true, slideDuration: 400 })
    inst(wrapper).next()
    await sleep(120)

    const root = rootEl(wrapper)
    dispatchPointer(root, 'pointerdown', { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 200, clientY: 0 })
    // 越过拖拽阈值即收口在飞切换
    dispatchPointer(root, 'pointermove', { pointerId: 1, pointerType: 'mouse', clientX: 190, clientY: 0 })
    await nextTick()
    dispatchPointer(root, 'pointermove', { pointerId: 1, pointerType: 'mouse', clientX: -100, clientY: 0 })
    await nextTick()
    dispatchPointer(root, 'pointerup', { pointerId: 1, pointerType: 'mouse', clientX: -100, clientY: 0 })

    await waitFor(() => inst(wrapper).getCurrentIndex() === 3)
    await waitFor(() => (wrapper.emitted('afterChange')?.length ?? 0) === 2)
    expect(wrapper.emitted('beforeChange')).toEqual([
      [1, 2],
      [2, 3]
    ])
    expect(wrapper.emitted('afterChange')).toEqual([[2], [3]])
    wrapper.unmount()
  })

  // 回归守护：loop 回绕后位移停在尾部副本位，未归位时该方向的拖拽没有剩余空间（完全拖不动）
  it('loop 回绕到首张后，前向拖拽仍可继续切换', async () => {
    const wrapper = await mountCarousel({ draggable: true, loop: true, slideDuration: 60 })
    inst(wrapper).to(3)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -2 * UNIT)
    inst(wrapper).next()
    await waitFor(() => slideOffset(slideEl(wrapper)) === -3 * UNIT)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)

    dispatchDrag(wrapper, 0)
    await waitFor(() => inst(wrapper).getCurrentIndex() === 2)
    expect(inst(wrapper).getCurrentIndex()).toBe(2)
    wrapper.unmount()
  })
})
