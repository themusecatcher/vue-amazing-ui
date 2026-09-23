import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useScrollParent } from 'components/utils'

/**
 * 回归守护：整页滚动场景下，scroll 监听必须绑到 window，而不是 documentElement。
 *
 * 背景：页面（视口）滚动时 scroll 事件只派发到 document / window，documentElement 收不到
 * （元素级 scroll 不冒泡，视口滚动的事件目标为 Document / Window）。
 * 该场景下 useScrollParent 的 scrollTarget 恰为 documentElement，若把监听绑到它，
 * 回调将恒不触发，弹出层无法跟随滚动重算位置（flip / clamp 失准）。
 *
 * 断言口径：只校验「监听注册在哪个目标上」，不依赖事件派发机制，
 * 因此在 happy-dom 下稳定，可直接锁住绑定目标这一根因。
 */
const Probe = defineComponent({
  setup() {
    const contentRef = ref<HTMLElement | null>(null)
    useScrollParent(contentRef, () => {})
    return () => h('div', { ref: contentRef, style: 'height: 20px;' }, 'probe')
  }
})

/**
 * 元素滚动容器路径：内容元素存在可滚动祖先（overflow: auto）时，
 * scrollTarget 应为该容器，监听也必须落在它身上，而不是 window。
 */
const ScrollableProbe = defineComponent({
  props: {
    onScroll: { type: Function, required: true }
  },
  setup(props) {
    const contentRef = ref<HTMLElement | null>(null)
    useScrollParent(contentRef, () => props.onScroll())
    return () => h('div', { style: 'overflow: auto;' }, [h('div', { ref: contentRef }, 'content')])
  }
})

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

describe('useScrollParent 的滚动监听目标', () => {
  it('无滚动祖先（整页滚动）时应监听 window，而非 documentElement', async () => {
    const winAdd = vi.spyOn(window, 'addEventListener')
    const docElAdd = vi.spyOn(document.documentElement, 'addEventListener')

    wrapper = mount(Probe, { attachTo: document.body })
    await nextTick()

    const winScroll = winAdd.mock.calls.filter((call) => call[0] === 'scroll')
    const docElScroll = docElAdd.mock.calls.filter((call) => call[0] === 'scroll')

    expect(winScroll.length).toBeGreaterThan(0)
    expect(docElScroll.length).toBe(0)
  })

  it('卸载时应从 window 上移除 scroll 监听', async () => {
    const winRemove = vi.spyOn(window, 'removeEventListener')

    wrapper = mount(Probe, { attachTo: document.body })
    await nextTick()
    wrapper.unmount()
    wrapper = null

    const winScrollRemoved = winRemove.mock.calls.filter((call) => call[0] === 'scroll')
    expect(winScrollRemoved.length).toBeGreaterThan(0)
  })

  it('存在可滚动祖先时应把 scroll 监听绑到该元素，而非 window', async () => {
    const onScroll = vi.fn()

    wrapper = mount(ScrollableProbe, { props: { onScroll }, attachTo: document.body })
    await nextTick()

    // 在可滚动容器上派发 scroll 应触发回调
    const container = wrapper.element as HTMLElement
    container.dispatchEvent(new Event('scroll'))
    expect(onScroll).toHaveBeenCalledTimes(1)

    // 在 window 上派发 scroll 不应触发回调（说明监听没有落在 window）
    onScroll.mockClear()
    window.dispatchEvent(new Event('scroll'))
    expect(onScroll).not.toHaveBeenCalled()
  })
})
