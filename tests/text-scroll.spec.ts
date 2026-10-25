import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { defineComponent, nextTick, reactive, ref } from 'vue'
import TextScroll from 'components/text-scroll'

/**
 * TextScroll 节拍、生命周期、交互与渲染守护
 *
 * 环境约定（同 tests/timer-cleanup.spec.ts）：
 * - happy-dom 不派发 ResizeObserver 初始回调，故需显式调用 `start()` 启动垂直节拍；
 * - 假定时器只接管 setTimeout / clearTimeout，避免 performance.now 被冻结。
 */
const verticalItems = [{ title: 'a' }, { title: 'b' }, { title: 'c' }, { title: 'd' }]
const mountVertical = () =>
  mount(TextScroll, {
    attachTo: document.body,
    props: { items: verticalItems, vertical: true, interval: 100, duration: 50 }
  })
const start = (wrapper: VueWrapper): void => {
  ;(wrapper.vm as unknown as { start(): void }).start()
}
/** 垂直模式当前可见条目下标（v-show 落 display: none） */
function visibleIndex(wrapper: VueWrapper): number {
  return wrapper
    .findAll('.scroll-item-wrap')
    .findIndex((item) => (item.element as HTMLElement).style.display !== 'none')
}
async function advance(ms: number): Promise<void> {
  vi.advanceTimersByTime(ms)
  await nextTick()
}
/** 等待复位链路跑完：复位后的启动排在「复位」这一拍之后 */
async function settle(): Promise<void> {
  await nextTick()
  await nextTick()
}
let wrapper: VueWrapper | null = null
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

describe('TextScroll：垂直滚动节拍', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('静止态起链：首拍等一个 interval，此后每拍等 interval + duration', async () => {
    wrapper = mountVertical()
    start(wrapper)

    await advance(99)
    expect(visibleIndex(wrapper)).toBe(0)
    await advance(1)
    expect(visibleIndex(wrapper)).toBe(1)

    // 稳态周期 = 停留 interval + 过渡 duration
    await advance(149)
    expect(visibleIndex(wrapper)).toBe(1)
    await advance(1)
    expect(visibleIndex(wrapper)).toBe(2)
  })

  it('存在未完成位移时起链，间隔为一个 interval 加一个 duration', async () => {
    wrapper = mountVertical()
    start(wrapper)
    await advance(100)
    expect(visibleIndex(wrapper)).toBe(1)

    // 替换文字会复位索引，此时仍有待完成的过渡，起链需额外等一个 duration
    await wrapper.setProps({ items: [{ title: 'x' }, { title: 'y' }, { title: 'z' }, { title: 'w' }] })
    expect(visibleIndex(wrapper)).toBe(0)

    await advance(149)
    expect(visibleIndex(wrapper)).toBe(0)
    await advance(1)
    expect(visibleIndex(wrapper)).toBe(1)
  })
})

describe('TextScroll：重复启动与卸载后启动的定时器守护', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('连续调用两次 start 只推进一拍', async () => {
    wrapper = mountVertical()
    start(wrapper)
    start(wrapper)

    await advance(100)
    expect(visibleIndex(wrapper)).toBe(1)
  })

  it('连续调用两次 start 后 stop 可彻底停止推进', async () => {
    wrapper = mountVertical()
    start(wrapper)
    start(wrapper)
    ;(wrapper.vm as unknown as { stop(): void }).stop()

    await advance(300)
    expect(visibleIndex(wrapper)).toBe(0)
  })

  it('卸载后调用 start 不再注册新的定时器', async () => {
    wrapper = mountVertical()
    const vm = wrapper.vm as unknown as { start(): void }
    start(wrapper)
    await advance(100)
    wrapper.unmount()

    const before = vi.getTimerCount()
    vm.start()
    await advance(2000)
    expect(vi.getTimerCount()).toBe(before)
    wrapper = null
  })
})

describe('TextScroll：KeepAlive 缓存时的滚动收尾', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('失活后停止推进，恢复后继续推进', async () => {
    const Host = defineComponent({
      components: { TextScroll },
      setup() {
        const show = ref(true)
        const items = [{ title: 'a' }, { title: 'b' }, { title: 'c' }]
        return { show, items }
      },
      template: `
        <KeepAlive>
          <TextScroll v-if="show" vertical :items="items" :interval="100" :duration="50" />
        </KeepAlive>
      `
    })
    wrapper = mount(Host, { attachTo: document.body })
    start(wrapper.findComponent(TextScroll))
    await advance(100)
    expect(visibleIndex(wrapper)).toBe(1)

    wrapper.vm.show = false
    await nextTick()
    await advance(500)
    wrapper.vm.show = true
    await nextTick()
    expect(visibleIndex(wrapper)).toBe(1)

    await advance(100)
    expect(visibleIndex(wrapper)).toBe(2)
  })
})

describe('TextScroll：渲染结构', () => {
  it('未启用省略时链接类名落在条目自身，且不渲染文本容器', () => {
    wrapper = mount(TextScroll, {
      props: { items: [{ title: 'a', href: 'https://example.com' }] }
    })
    const item = wrapper.find('.scroll-item')
    expect(item.element.tagName).toBe('A')
    expect(item.classes()).toContain('href-item')
    expect(wrapper.find('.ellipsis-container').exists()).toBe(false)
  })

  it('single 时按一条文字渲染，两个分组各一条', () => {
    wrapper = mount(TextScroll, { props: { items: { title: 'a' }, single: true } })
    const groups = wrapper.findAll('.scroll-items-group')
    expect(groups).toHaveLength(2)
    groups.forEach((group) => {
      expect(group.findAll('.scroll-item')).toHaveLength(1)
    })
  })

  it('single 误传空数组时不渲染条目', () => {
    wrapper = mount(TextScroll, { props: { items: [], single: true } })
    expect(wrapper.findAll('.scroll-item')).toHaveLength(0)
  })

  it('single 误传数组时按首条渲染', () => {
    wrapper = mount(TextScroll, { props: { items: [{ title: 'a' }, { title: 'b' }], single: true } })
    const groups = wrapper.findAll('.scroll-items-group')
    expect(groups).toHaveLength(2)
    groups.forEach((group) => {
      expect(group.findAll('.scroll-item')).toHaveLength(1)
    })
    expect(wrapper.text()).toBe('aa')
  })

  it('amount 为 false 时宽度自适应', () => {
    wrapper = mount(TextScroll, {
      props: { items: [{ title: 'a' }, { title: 'b' }], amount: false }
    })
    expect(wrapper.find('.scroll-item').attributes('style')).toContain('width: auto')
  })

  it('水平模式渲染两个条目数一致的分组', () => {
    wrapper = mount(TextScroll, {
      props: { items: verticalItems.concat({ title: 'e' }) }
    })
    const groups = wrapper.findAll('.scroll-items-group')
    expect(groups).toHaveLength(2)
    const counts = groups.map((group) => group.findAll('.scroll-item').length)
    expect(counts).toEqual([5, 5])
  })
})

describe('TextScroll：鼠标移入暂停', () => {
  it('mouseenter 暂停、mouseleave 恢复水平滚动', async () => {
    wrapper = mount(TextScroll, {
      attachTo: document.body,
      props: { items: verticalItems, pauseOnMouseEnter: true }
    })
    start(wrapper)
    await nextTick()
    expect(wrapper.attributes('style')).toContain('--text-scroll-play-state: running')

    await wrapper.trigger('mouseenter')
    expect(wrapper.attributes('style')).toContain('--text-scroll-play-state: paused')

    await wrapper.trigger('mouseleave')
    expect(wrapper.attributes('style')).toContain('--text-scroll-play-state: running')
  })
})

describe('TextScroll：文字数组变更后的复位', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('水平模式替换 items 后重置动画，条数不足时停用动画', async () => {
    const items = reactive([{ title: 'a' }, { title: 'b' }, { title: 'c' }, { title: 'd' }])
    wrapper = mount(TextScroll, { props: { items } })
    start(wrapper)
    await nextTick()
    expect(wrapper.find('.scroll-items-group').classes()).not.toContain('scroll-items-reset')

    // 条数少于 amount：复位后动画不再启动
    await wrapper.setProps({ items: [{ title: 'a' }, { title: 'b' }] })
    expect(wrapper.find('.scroll-items-group').classes()).toContain('scroll-items-reset')

    // 条数恢复：复位后动画重新启动
    await wrapper.setProps({ items: [{ title: 'a' }, { title: 'b' }, { title: 'c' }, { title: 'd' }, { title: 'e' }] })
    await settle()
    expect(wrapper.find('.scroll-items-group').classes()).not.toContain('scroll-items-reset')
  })

  it('垂直模式替换 items 后当前索引归零', async () => {
    wrapper = mountVertical()
    start(wrapper)
    // 首拍 100ms（interval），第二拍再过 150ms（interval + duration）
    await advance(250)
    expect(visibleIndex(wrapper)).toBe(2)

    await wrapper.setProps({ items: [{ title: 'x' }, { title: 'y' }, { title: 'z' }] })
    expect(visibleIndex(wrapper)).toBe(0)
  })

  it('原地改写文字标题同样触发复位', async () => {
    const items = reactive([{ title: 'a' }, { title: 'b' }, { title: 'c' }])
    wrapper = mount(TextScroll, {
      attachTo: document.body,
      props: { items, vertical: true, interval: 100, duration: 50 }
    })
    start(wrapper)
    await advance(100)
    expect(visibleIndex(wrapper)).toBe(1)

    items[0].title = 'changed'
    await nextTick()
    expect(visibleIndex(wrapper)).toBe(0)
  })
})

describe('TextScroll：条目样式落点与取值边界', () => {
  it('垂直模式启用省略时，itemStyle 的 maxWidth 生效于文本容器', () => {
    wrapper = mount(TextScroll, {
      props: {
        items: [{ title: 'a' }],
        vertical: true,
        ellipsis: true,
        itemStyle: { color: 'red', maxWidth: '200px' }
      }
    })
    const container = wrapper.find('.ellipsis-container')
    expect(container.attributes('style')).toContain('color: red')
    expect(container.attributes('style')).toContain('max-width: 200px')
    expect(wrapper.find('.scroll-item').attributes('style')).toBeUndefined()
  })

  it('amount 为 0 时条目宽度不出现 Infinity', () => {
    wrapper = mount(TextScroll, {
      props: { items: [{ title: 'a' }, { title: 'b' }], amount: 0 }
    })
    expect(wrapper.find('.scroll-item').attributes('style')).not.toContain('Infinity')
  })
})
