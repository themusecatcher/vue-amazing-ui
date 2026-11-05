import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useScroll } from 'components/utils'
import type { UseScrollOptions, UseScrollReturn } from 'components/utils'

/**
 * useScroll 的契约测试
 *
 * 覆盖四类行为：
 * ① 监听目标解析（整页滚动必须绑 window，元素滚动绑元素）；
 * ② 状态同步不受节流影响（连续两次滚动，末次位置必须生效 —— 旧实现按时间节流会丢末次）；
 * ③ 方向 / 边界由「本次位置 - 上次位置」与上限实时判定；
 * ④ 滚动结束只回调一次（静默期定时器与原生 scrollend 双保险），`refresh` / `start` / `stop` 可用。
 */

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.useRealTimers()
  vi.restoreAllMocks()
})

/** happy-dom 不做真实布局，滚动容器尺寸只能自行定义 */
function createScroller(
  size: {
    scrollWidth?: number
    scrollHeight?: number
    clientWidth?: number
    clientHeight?: number
  } = {}
) {
  const element = document.createElement('div')
  const geometry = { scrollWidth: 0, scrollHeight: 0, clientWidth: 0, clientHeight: 0, ...size }
  Object.defineProperties(element, {
    scrollWidth: { configurable: true, get: () => geometry.scrollWidth },
    scrollHeight: { configurable: true, get: () => geometry.scrollHeight },
    clientWidth: { configurable: true, get: () => geometry.clientWidth },
    clientHeight: { configurable: true, get: () => geometry.clientHeight }
  })
  // 浏览器写 scrollLeft / scrollTop 后异步派发 scroll，这里同步模拟
  function scrollTo(left: number, top: number): void {
    element.scrollLeft = left
    element.scrollTop = top
    element.dispatchEvent(new Event('scroll'))
  }
  return { element, geometry, scrollTo }
}

/** 挂载一个仅用于承载 useScroll 生命周期的探针组件 */
function mountProbe(element: HTMLElement, options: UseScrollOptions = {}) {
  const holder: { state?: UseScrollReturn } = {}
  const Probe = defineComponent({
    setup() {
      holder.state = useScroll(element, options)
      return () => h('div', 'probe')
    }
  })
  wrapper = mount(Probe)
  return { state: holder.state as UseScrollReturn }
}

describe('useScroll 的滚动监听目标', () => {
  it('默认（整页滚动）时应监听 window，而非 documentElement', () => {
    const winAdd = vi.spyOn(window, 'addEventListener')
    const docElAdd = vi.spyOn(document.documentElement, 'addEventListener')
    const Probe = defineComponent({
      setup() {
        useScroll()
        return () => h('div', 'probe')
      }
    })

    wrapper = mount(Probe)

    expect(winAdd.mock.calls.filter((call) => call[0] === 'scroll').length).toBeGreaterThan(0)
    expect(docElAdd.mock.calls.filter((call) => call[0] === 'scroll').length).toBe(0)
  })

  it('卸载时应从 window 上移除 scroll 监听', () => {
    const winRemove = vi.spyOn(window, 'removeEventListener')
    const Probe = defineComponent({
      setup() {
        useScroll()
        return () => h('div', 'probe')
      }
    })

    wrapper = mount(Probe)
    wrapper.unmount()
    wrapper = null

    expect(winRemove.mock.calls.filter((call) => call[0] === 'scroll').length).toBeGreaterThan(0)
  })

  it('传入元素时应把 scroll 监听绑到该元素，而非 window', () => {
    const scroller = createScroller({ scrollHeight: 400, clientHeight: 100 })
    const onScroll = vi.fn()
    const winAdd = vi.spyOn(window, 'addEventListener')
    const elementAdd = vi.spyOn(scroller.element, 'addEventListener')
    mountProbe(scroller.element, { onScroll })

    expect(elementAdd.mock.calls.filter((call) => call[0] === 'scroll').length).toBe(1)
    expect(winAdd.mock.calls.filter((call) => call[0] === 'scroll').length).toBe(0)

    scroller.scrollTo(0, 50)
    expect(onScroll).toHaveBeenCalledTimes(1)
  })
})

describe('useScroll 的位置与状态同步', () => {
  it('target 传入 Ref 时，元素就位后应自动绑定并测量', async () => {
    const scroller = createScroller({ scrollHeight: 400, clientHeight: 100 })
    const elementRef = ref<HTMLDivElement | null>(null)
    const holder: { state?: UseScrollReturn } = {}
    const Probe = defineComponent({
      setup() {
        holder.state = useScroll(elementRef)
        return () => h('div', 'probe')
      }
    })
    wrapper = mount(Probe)
    const state = holder.state as UseScrollReturn

    elementRef.value = scroller.element
    await nextTick()
    expect(state.maxY.value).toBe(300)

    scroller.scrollTo(0, 100)
    expect(state.y.value).toBe(100)
    expect(state.direction.value).toBe('bottom')
  })

  it('挂载时应立即测量位置与最大可滚动距离，并给出边界标志', () => {
    const scroller = createScroller({ scrollWidth: 300, clientWidth: 100, scrollHeight: 500, clientHeight: 200 })
    const { state } = mountProbe(scroller.element)

    expect(state.x.value).toBe(0)
    expect(state.y.value).toBe(0)
    expect(state.maxX.value).toBe(200)
    expect(state.maxY.value).toBe(300)
    expect(state.atLeft.value).toBe(true)
    expect(state.atRight.value).toBe(false)
    expect(state.atTop.value).toBe(true)
    expect(state.atBottom.value).toBe(false)
    expect(state.isScrolling.value).toBe(false)
    expect(state.direction.value).toBeNull()
  })

  it('连续两次滚动都应生效（状态同步不受节流影响，末次位置不能丢）', () => {
    const scroller = createScroller({ scrollHeight: 500, clientHeight: 100 })
    const onScroll = vi.fn()
    const { state } = mountProbe(scroller.element, { onScroll })

    scroller.scrollTo(0, 60)
    scroller.scrollTo(0, 260)

    expect(onScroll).toHaveBeenCalledTimes(2)
    expect(state.y.value).toBe(260)
    expect(state.direction.value).toBe('bottom')
    expect(state.atBottom.value).toBe(false)
  })

  it('方向随位移变化，双轴同时位移取位移更大的一轴，到底后边界标志为 true', () => {
    const scroller = createScroller({ scrollWidth: 200, clientWidth: 100, scrollHeight: 500, clientHeight: 100 })
    const { state } = mountProbe(scroller.element)

    scroller.scrollTo(50, 10)
    expect(state.direction.value).toBe('right')

    scroller.scrollTo(60, 100)
    expect(state.direction.value).toBe('bottom')

    scroller.scrollTo(100, 400)
    expect(state.direction.value).toBe('bottom')
    expect(state.atRight.value).toBe(true)
    expect(state.atBottom.value).toBe(true)

    scroller.scrollTo(0, 0)
    expect(state.direction.value).toBe('top')
    expect(state.atLeft.value).toBe(true)
    expect(state.atTop.value).toBe(true)
  })

  it('内容在滚动间隙被撑开时，上限应随滚动刷新（边界标志不停在旧值）', () => {
    const scroller = createScroller({ scrollHeight: 400, clientHeight: 100 })
    const { state } = mountProbe(scroller.element)

    scroller.scrollTo(0, 300)
    expect(state.atBottom.value).toBe(true)

    scroller.geometry.scrollHeight = 900
    scroller.scrollTo(0, 300)
    expect(state.maxY.value).toBe(800)
    expect(state.atBottom.value).toBe(false)
  })

  it('refresh 可主动重新测量（内容尺寸变化且未产生滚动时）', () => {
    const scroller = createScroller({ scrollHeight: 400, clientHeight: 100 })
    const { state } = mountProbe(scroller.element)

    scroller.geometry.scrollHeight = 900
    state.refresh()

    expect(state.maxY.value).toBe(800)
    expect(state.atBottom.value).toBe(false)
  })
})

describe('useScroll 的滚动结束判定', () => {
  it('静默期到点后收尾：isScrolling 复位、direction 置空，onStop 只触发一次', () => {
    vi.useFakeTimers()
    const scroller = createScroller({ scrollHeight: 500, clientHeight: 100 })
    const onStop = vi.fn()
    const { state } = mountProbe(scroller.element, { onStop })

    scroller.scrollTo(0, 120)
    expect(state.isScrolling.value).toBe(true)
    expect(onStop).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(state.isScrolling.value).toBe(false)
    expect(state.direction.value).toBeNull()
    expect(onStop).toHaveBeenCalledTimes(1)

    // 原生 scrollend 后到，不应重复回调
    scroller.element.dispatchEvent(new Event('scrollend'))
    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it('原生 scrollend 先到即收尾，并取消静默期定时器', () => {
    vi.useFakeTimers()
    const scroller = createScroller({ scrollHeight: 500, clientHeight: 100 })
    const onStop = vi.fn()
    const { state } = mountProbe(scroller.element, { onStop })

    scroller.scrollTo(0, 120)
    scroller.element.dispatchEvent(new Event('scrollend'))
    expect(state.isScrolling.value).toBe(false)
    expect(onStop).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(200)
    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it('scrollEndDelay 可配置静默时长', () => {
    vi.useFakeTimers()
    const scroller = createScroller({ scrollHeight: 500, clientHeight: 100 })
    const onStop = vi.fn()
    mountProbe(scroller.element, { onStop, scrollEndDelay: 500 })

    scroller.scrollTo(0, 120)
    vi.advanceTimersByTime(200)
    expect(onStop).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(onStop).toHaveBeenCalledTimes(1)
  })
})

describe('useScroll 的启停控制', () => {
  it('stop 后不再响应滚动，start 后恢复监听并按当前位置重新测量', () => {
    const scroller = createScroller({ scrollHeight: 500, clientHeight: 100 })
    const onScroll = vi.fn()
    const { state } = mountProbe(scroller.element, { onScroll })

    scroller.scrollTo(0, 10)
    expect(onScroll).toHaveBeenCalledTimes(1)

    state.stop()
    expect(state.isScrolling.value).toBe(false)

    scroller.scrollTo(0, 20)
    expect(onScroll).toHaveBeenCalledTimes(1)

    state.start()
    expect(state.y.value).toBe(20)
    scroller.scrollTo(0, 30)
    expect(onScroll).toHaveBeenCalledTimes(2)
    expect(state.y.value).toBe(30)
  })
})
