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
