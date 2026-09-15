import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useScroll } from 'components/utils'

/**
 * 回归守护：未传 target（默认监听整页滚动）时，scroll 监听必须绑到 window。
 *
 * 背景：视口滚动时 scroll 事件派发在 window / document 上，documentElement 收不到。
 * 旧实现把 window 目标解析成 documentElement 再挂监听，导致回调恒不触发。
 *
 * 断言口径：只校验监听注册在哪个目标上，不依赖事件派发机制，happy-dom 下稳定。
 */
const Probe = defineComponent({
  setup() {
    useScroll()
    return () => h('div', 'probe')
  }
})

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

describe('useScroll 的滚动监听目标', () => {
  it('默认（整页滚动）时应监听 window，而非 documentElement', async () => {
    const winAdd = vi.spyOn(window, 'addEventListener')
    const docElAdd = vi.spyOn(document.documentElement, 'addEventListener')

    wrapper = mount(Probe)

    const winScroll = winAdd.mock.calls.filter((call) => call[0] === 'scroll')
    const docElScroll = docElAdd.mock.calls.filter((call) => call[0] === 'scroll')

    expect(winScroll.length).toBeGreaterThan(0)
    expect(docElScroll.length).toBe(0)
  })

  it('卸载时应从 window 上移除 scroll 监听', async () => {
    const winRemove = vi.spyOn(window, 'removeEventListener')

    wrapper = mount(Probe)
    wrapper.unmount()
    wrapper = null

    const winScrollRemoved = winRemove.mock.calls.filter((call) => call[0] === 'scroll')
    expect(winScrollRemoved.length).toBeGreaterThan(0)
  })
})
