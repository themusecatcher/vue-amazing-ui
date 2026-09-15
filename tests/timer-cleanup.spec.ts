import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TextScroll from 'components/text-scroll/TextScroll.vue'
import Carousel from 'components/carousel/Carousel.vue'

/**
 * 回归守护：TextScroll / Carousel 的定时器具备自我续期能力
 * （TextScroll 为链式 setTimeout 节拍器；Carousel 的 autoSlide 在滑动结束后被重新调度），
 * 卸载时若未取消，回调会永久存活并持续持有组件作用域，阻塞 GC。
 *
 * 观测方式：统计「已注册且尚未触发、尚未取消」的定时器数（口径同 tests/internal.spec.ts）。
 * tests/setup.ts 中 requestAnimationFrame 由 setTimeout 驱动，故可用假定时器观测
 * 「定时器是否仍在自我续期」——已取消的回调被触发后会直接返回、不再重新注册，计数随之回落。
 *
 * 断言口径：组件挂载本身（happy-dom 渲染环境）会带来常驻定时器，故断言「卸载并推进后，
 * 定时器数严格低于运行期数量」——自我续期的定时器即使被推进任意时长也始终维持该数量，
 * 因此该断言可精确区分「已清理」与「仍在续期」，且不受环境常驻定时器干扰。
 *
 * 注意：必须显式限定 toFake，避免 performance.now 被冻结导致依赖时间推进的逻辑失效。
 */
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
})
afterEach(() => {
  vi.useRealTimers()
})

function mountTextScroll() {
  return mount(TextScroll, {
    attachTo: document.body,
    props: {
      items: [{ title: 'a' }, { title: 'b' }],
      vertical: true,
      interval: 20,
      duration: 10
    }
  })
}

describe('TextScroll 卸载时应清理定时器', () => {
  it('垂直滚动定时器在卸载后不应继续自我续期', () => {
    const base = vi.getTimerCount()
    const wrapper = mountTextScroll()
    // happy-dom 下 ResizeObserver 不触发初始回调，显式启动垂直滚动
    ;(wrapper.vm as unknown as { start(): void }).start()
    vi.advanceTimersByTime(100)
    // 前置校验：确认定时器确实在运行，避免用例因未启动而假通过
    const running = vi.getTimerCount()
    expect(running).toBeGreaterThan(base)

    wrapper.unmount()
    vi.advanceTimersByTime(2000)

    expect(vi.getTimerCount()).toBeLessThan(running)
  })
})

// happy-dom 无布局引擎：元素尺寸恒为 0，且不会派发 ResizeObserver 回调。
// Carousel 在尺寸为 0 / 未测量时会主动跳过自动轮播调度（避免 offset % 0 得到 NaN 使帧循环空转），
// 因此需补齐这两项环境能力，才能在测试中真实走通「自动轮播 → 定时器 → 卸载清理」链路。
const offsetWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
const offsetHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
const realResizeObserver = globalThis.ResizeObserver

function installLayoutStub(): void {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => 300 })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, get: () => 200 })
  // 观察目标时立即派发一次回调，模拟浏览器 ResizeObserver 的初始观测
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

async function mountCarousel(effect: 'slide' | 'fade') {
  const wrapper = mount(Carousel, {
    attachTo: document.body,
    props: {
      autoplay: true,
      interval: 20,
      effect,
      fadeDuration: 20,
      images: [{ src: 'a.png' }, { src: 'b.png' }]
    }
  })
  // happy-dom 不触发 img 的 load 事件，手动派发以激活 autoplay（依赖 complete[0]）
  for (const img of wrapper.findAll('img')) {
    await img.trigger('load')
  }
  return wrapper
}

describe('Carousel 卸载时应清理定时器', () => {
  beforeEach(() => {
    installLayoutStub()
  })
  afterEach(() => {
    restoreLayoutEnv()
  })

  it('slide 效果：轮播定时器与滑动动画帧在卸载后不应继续自我续期', async () => {
    const base = vi.getTimerCount()
    const wrapper = await mountCarousel('slide')
    vi.advanceTimersByTime(100)
    const running = vi.getTimerCount()
    expect(running).toBeGreaterThan(base)

    wrapper.unmount()
    vi.advanceTimersByTime(2000)

    expect(vi.getTimerCount()).toBeLessThan(running)
  })

  it('fade 效果：渐变结束定时器在卸载后不应继续自我续期', async () => {
    const base = vi.getTimerCount()
    const wrapper = await mountCarousel('fade')
    vi.advanceTimersByTime(100)
    const running = vi.getTimerCount()
    expect(running).toBeGreaterThan(base)

    wrapper.unmount()
    vi.advanceTimersByTime(2000)

    expect(vi.getTimerCount()).toBeLessThan(running)
  })
})
