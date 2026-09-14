import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Carousel from 'components/carousel/Carousel.vue'

interface CarouselInst {
  to: (n: number) => void
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
// 尺寸未测量时 Carousel 的 moveUnitDistance 为 0，滑动目标恒为 0（不产生动画），
// 因此必须补齐这两项环境能力。
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

// 模拟页面可见性变化（happy-dom 不支持直接改写 visibilityState）
// 注意：回调内对 offset 的写入需等一次渲染才反映到 style 上，故此处必须 await 再断言
async function setVisibility(state: 'hidden' | 'visible'): Promise<void> {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => state })
  document.dispatchEvent(new Event('visibilitychange'))
  await nextTick()
}

function resetVisibility(): void {
  delete (document as unknown as Record<string, unknown>).visibilityState
}

async function mountCarousel(props: Record<string, unknown> = {}) {
  const wrapper = mount(Carousel, {
    attachTo: document.body,
    props: {
      autoplay: false,
      effect: 'slide',
      slideDuration: 50,
      images: [{ src: 'a.png' }, { src: 'b.png' }, { src: 'c.png' }],
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

function carouselRootStyle(wrapper: CarouselWrapper): string {
  return wrapper.find('.carousel-wrap').attributes('style') ?? ''
}

function inst(wrapper: CarouselWrapper): CarouselInst {
  return wrapper.vm as unknown as CarouselInst
}

describe('Carousel 滑动动画', () => {
  beforeEach(() => {
    installLayoutStub()
  })
  afterEach(() => {
    restoreLayoutEnv()
    resetVisibility()
  })

  it('过冲缓动下最终精确落位到目标位置', async () => {
    // easeOutBack 标准实现：中间会超过 1（过冲），末尾收敛回 1
    let maxProgress = 0
    const easeOutBack = (t: number) => {
      const c1 = 1.70158
      const c3 = c1 + 1
      const progress = 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
      maxProgress = Math.max(maxProgress, progress)
      return progress
    }

    const wrapper = await mountCarousel({ slideFunction: easeOutBack })
    inst(wrapper).next()
    await sleep(600)

    // 先自证本用例非空：缓动确实过冲（进度 > 1）
    expect(maxProgress).toBeGreaterThan(1)
    // 过冲后仍须精确落位；若按「位置越过目标即结束」判定，会停在过冲峰值上
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    wrapper.unmount()
  })

  it('过冲缓动切换到首 / 末页时同样过冲，且不越出首尾缓冲（不露出空白）', async () => {
    // back-out 与演示页配置一致：缓动进度会超过 1，位移相应越过目标
    const wrapper = await mountCarousel({ slideDuration: 300, slideFunction: [0.34, 1.56, 0.64, 1] })
    const el = slideEl(wrapper)
    // 轨道 = 末图副本 + 3 张实图 + 2 张首图副本，可显示位移 offset ∈ [-1, 4] 个单位宽，
    // 即 transform ∈ [-4 * UNIT, UNIT]；越出该范围会在容器边缘露出空白
    async function sampleOffsets(target: HTMLElement, ms: number): Promise<number[]> {
      const values: number[] = []
      const start = Date.now()
      while (Date.now() - start < ms) {
        const value = slideOffset(target)
        if (Number.isFinite(value)) values.push(value)
        await sleep(8)
      }
      return values
    }

    // 第 3 页 → 第 1 页（切到首图）：位移过冲到首图之前（露出末图副本）后回弹
    inst(wrapper).to(3)
    await waitFor(() => slideOffset(el) === -2 * UNIT)
    inst(wrapper).to(1)
    const toFirst = await sampleOffsets(el, 500)
    expect(toFirst.length).toBeGreaterThan(0)
    expect(Math.max(...toFirst)).toBeGreaterThan(0)
    expect(Math.max(...toFirst)).toBeLessThanOrEqual(UNIT)
    expect(slideOffset(el)).toBe(0)

    // 第 3 页 → next（回绕到首图）：位移过冲到落位的首图副本之后后回弹
    inst(wrapper).to(3)
    await waitFor(() => slideOffset(el) === -2 * UNIT)
    inst(wrapper).next()
    const toWrap = await sampleOffsets(el, 500)
    expect(toWrap.length).toBeGreaterThan(0)
    expect(Math.min(...toWrap)).toBeLessThan(-3 * UNIT)
    expect(Math.min(...toWrap)).toBeGreaterThanOrEqual(-4 * UNIT)
    expect(slideOffset(el)).toBe(-3 * UNIT)
    expect(inst(wrapper).getCurrentIndex()).toBe(1)

    // 第 1 页 → 第 3 页（切到末图）：位移过冲到末图之后（露出首图副本）后回弹
    inst(wrapper).to(3)
    const toLast = await sampleOffsets(el, 500)
    expect(toLast.length).toBeGreaterThan(0)
    expect(Math.min(...toLast)).toBeLessThan(-2 * UNIT)
    expect(Math.min(...toLast)).toBeGreaterThanOrEqual(-4 * UNIT)
    wrapper.unmount()

    // 行程远超缓冲时（30 张图从末页跳回首页）：过冲在缓冲边界收敛，仍不越出可显示范围
    const many = await mountCarousel({
      slideDuration: 200,
      slideFunction: [0.34, 1.56, 0.64, 1],
      images: Array.from({ length: 30 }, (_, index) => ({ src: `img-${index}.png` }))
    })
    const manyEl = slideEl(many)
    inst(many).to(30)
    await waitFor(() => slideOffset(manyEl) === -29 * UNIT)
    inst(many).to(1)
    const farJump = await sampleOffsets(manyEl, 400)
    expect(farJump.length).toBeGreaterThan(0)
    // 首部只留 1 个单位缓冲，过冲必然收敛于此，不会露出空白
    expect(Math.max(...farJump)).toBeGreaterThan(0)
    expect(Math.max(...farJump)).toBeLessThanOrEqual(UNIT)
    expect(slideOffset(manyEl)).toBe(0)
    many.unmount()
  })

  it('运行时修改 slideDuration 后按新时长生效', async () => {
    const wrapper = await mountCarousel({ slideDuration: 5000 })
    await wrapper.setProps({ slideDuration: 50 })
    inst(wrapper).next()
    await sleep(600)
    // 若 slideDuration 仍是初始化快照（5000ms），此处远未到达目标
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    wrapper.unmount()
  })

  it('运行时修改 slideFunction 后按新缓动生效', async () => {
    const called: number[] = []
    const wrapper = await mountCarousel()
    await wrapper.setProps({
      slideFunction: (t: number) => {
        called.push(t)
        return t
      }
    })
    inst(wrapper).next()
    await sleep(300)
    // 若 slideFunction 仍是初始化快照，新传入的缓动函数永远不会被调用
    expect(called.length).toBeGreaterThan(0)
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    wrapper.unmount()
  })

  it('slideFunction 传缓动预设名时按对应缓动生效', async () => {
    const wrapper = await mountCarousel({ slideDuration: 600, slideFunction: 'easeOutBack' })
    inst(wrapper).next()

    // easeOutBack 预设的进度会过冲越过 1，位移相应越过目标位移；
    // 未查表解析的预设名字符串会被当作贝塞尔控制点求值得到 NaN，位移不可能越过目标
    let maxOffset = 0
    const start = Date.now()
    while (Date.now() - start < 2000 && maxOffset <= UNIT) {
      const offset = Math.abs(slideOffset(slideEl(wrapper)))
      if (Number.isFinite(offset)) {
        maxOffset = Math.max(maxOffset, offset)
      }
      await sleep(8)
    }
    expect(maxOffset).toBeGreaterThan(UNIT)
    await waitFor(() => slideOffset(slideEl(wrapper)) === -UNIT)
    expect(slideOffset(slideEl(wrapper))).toBe(-UNIT)
    wrapper.unmount()
  })

  it('fadeFunction 原样写入 CSS 变量', async () => {
    // 默认值为四个贝塞尔控制点，写入 CSS 变量时转为 cubic-bezier 写法
    const defaultWrapper = await mountCarousel({ effect: 'fade' })
    expect(carouselRootStyle(defaultWrapper)).toContain('--carousel-fade-function: cubic-bezier(0.4, 0, 0.2, 1)')
    defaultWrapper.unmount()

    // 四个贝塞尔控制点转为 CSS cubic-bezier(...) 写法
    const bezierWrapper = await mountCarousel({ effect: 'fade', fadeFunction: [0.25, 0.1, 0.25, 1] })
    expect(carouselRootStyle(bezierWrapper)).toContain('--carousel-fade-function: cubic-bezier(0.25, 0.1, 0.25, 1)')
    bezierWrapper.unmount()

    // CSS 写法（关键字 / 函数 / var()）原样透传，不做二次加工
    const keywordWrapper = await mountCarousel({ effect: 'fade', fadeFunction: 'step-end' })
    expect(carouselRootStyle(keywordWrapper)).toContain('--carousel-fade-function: step-end')
    keywordWrapper.unmount()

    const fnWrapper = await mountCarousel({ effect: 'fade', fadeFunction: 'steps(5, end)' })
    expect(carouselRootStyle(fnWrapper)).toContain('--carousel-fade-function: steps(5, end)')
    fnWrapper.unmount()

    const varWrapper = await mountCarousel({ effect: 'fade', fadeFunction: 'var(--carousel-ease)' })
    expect(carouselRootStyle(varWrapper)).toContain('--carousel-fade-function: var(--carousel-ease)')
    varWrapper.unmount()
  })

  it('未处于滑动中时，页面隐藏不会改动位移', async () => {
    const wrapper = await mountCarousel()
    inst(wrapper).next()
    await waitFor(() => slideOffset(slideEl(wrapper)) === -UNIT)

    // 切换为垂直轮播：dotPosition 变化触发 initCarousel 按 imageHeight 重算位移。
    // 此时位移（200）与上一次滑动的「起点 + 距离」（300）不再一致，
    // 旧的 visibilitychange 实现按「起点 + 距离」赋值会把位移写回过期值。
    await wrapper.setProps({ dotPosition: 'left' })
    await nextTick()
    const settled = slideOffset(slideEl(wrapper))
    expect(settled).toBe(-HEIGHT)

    await setVisibility('hidden')
    expect(slideOffset(slideEl(wrapper))).toBe(settled)

    await setVisibility('visible')
    wrapper.unmount()
  })

  it('卸载后中止在飞滑动动画，不再请求动画帧', async () => {
    // 组件卸载后渲染副作用即停止，此时再写 offset 已不会刷新 DOM，
    // 故不能用「style 是否变化」判断动画是否停止，改用「是否仍在调度帧」观测
    const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame')
    const wrapper = await mountCarousel({ slideDuration: 500 })
    const el = slideEl(wrapper)
    inst(wrapper).next()
    // 轮询直到动画确已推进，避免固定 sleep 在慢机器上落到「尚未开始」的时序
    const beforeWait = rafSpy.mock.calls.length
    await waitFor(() => slideOffset(el) < 0)
    // 自证本用例非空：确实拦截到了动画帧的调度
    expect(rafSpy.mock.calls.length).toBeGreaterThan(beforeWait)

    wrapper.unmount()
    const afterUnmount = rafSpy.mock.calls.length
    await sleep(200)
    // 卸载时应中止动画：此后不再产生新的帧请求
    expect(rafSpy.mock.calls.length).toBe(afterUnmount)

    rafSpy.mockRestore()
  })
})
