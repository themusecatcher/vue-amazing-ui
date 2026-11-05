import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Scrollbar from 'components/scrollbar'

/**
 * Scrollbar 实例能力回归守护
 *
 * `defineExpose` 除滚动方法外另暴露 `scrollElement`（内部滚动容器元素），
 * 供「需要指定滚动监听目标」的组合场景使用（如 BackTop 的 `listenTo` 直接传该元素），
 * 调用方无需再自行 `querySelector('.scrollbar-container')` 依赖内部结构。
 */

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

describe('Scrollbar 暴露的实例能力', () => {
  it('scrollElement 指向内部的 .scrollbar-container', () => {
    wrapper = mount(Scrollbar, { attachTo: document.body })

    const vm = wrapper.vm as unknown as { scrollElement: HTMLElement | null }
    const container = wrapper.find('.scrollbar-container').element

    expect(vm.scrollElement).toBeInstanceOf(HTMLElement)
    expect(vm.scrollElement).toBe(container)
  })

  it('原有滚动方法不受影响', () => {
    wrapper = mount(Scrollbar, { attachTo: document.body })

    const vm = wrapper.vm as unknown as {
      scrollTo: (...args: unknown[]) => void
      scrollBy: (...args: unknown[]) => void
      getScrollData: () => object
    }

    expect(typeof vm.scrollTo).toBe('function')
    expect(typeof vm.scrollBy).toBe('function')
    expect(vm.getScrollData()).toEqual(
      expect.objectContaining({
        scrollTop: expect.any(Number),
        scrollHeight: expect.any(Number),
        clientHeight: expect.any(Number)
      })
    )
  })

  it('getScrollData 读取的是实时滚动位置，不依赖内部测量时机', () => {
    wrapper = mount(Scrollbar, { attachTo: document.body })
    const container = wrapper.find('.scrollbar-container').element as HTMLElement
    const vm = wrapper.vm as unknown as { getScrollData: () => { scrollTop: number; scrollLeft: number } }

    container.scrollTop = 88
    container.scrollLeft = 12

    expect(vm.getScrollData().scrollTop).toBe(88)
    expect(vm.getScrollData().scrollLeft).toBe(12)
  })

  it('<KeepAlive> 切回时恢复失活前的滚动位置', async () => {
    const Other = defineComponent({ render: () => h('div', 'other') })
    const Host = defineComponent({
      components: { Scrollbar, Other },
      props: { showScrollbar: Boolean },
      template: `
        <KeepAlive>
          <Scrollbar v-if="showScrollbar" key="scrollbar"><div style="height: 500px">content</div></Scrollbar>
          <Other v-else key="other" />
        </KeepAlive>
      `
    })
    const host = mount(Host, { attachTo: document.body, props: { showScrollbar: true } })
    const container = host.find('.scrollbar-container').element as HTMLElement

    container.scrollTop = 150
    container.dispatchEvent(new Event('scroll'))
    await nextTick()

    // 切走再切回：失活期间 DOM 被移出文档，scrollTop 会归零
    await host.setProps({ showScrollbar: false })
    container.scrollTop = 0
    await host.setProps({ showScrollbar: true })
    await nextTick()

    expect(container.scrollTop).toBe(150)
    host.unmount()
  })
})

/**
 * 滚动事件回归守护
 *
 * 方向不能依赖「上一条 scroll 事件」推出来的标志：程序化滚动（拖动滚动条 thumb、instant scrollTo、
 * 直接写 scrollLeft/scrollTop）时浏览器紧接 scrollend 复位标志，事件会整体丢失，
 * 消费者（Table 表头跟随、左右阴影）便停在旧位置。这里断言程序化滚动同样派发且方向准确
 */
describe('Scrollbar 滚动事件', () => {
  /** 挂载并取出内部滚动容器 */
  function mountScrollbar(): HTMLElement {
    wrapper = mount(Scrollbar, { attachTo: document.body, props: { xScrollable: true } })
    return wrapper.find('.scrollbar-container').element as HTMLElement
  }
  /** 程序化滚动后派发 scroll，模拟浏览器在滚动位置变化后触发的事件 */
  async function scrollBy(container: HTMLElement, position: { left?: number; top?: number }): Promise<void> {
    if (position.left !== undefined) container.scrollLeft = position.left
    if (position.top !== undefined) container.scrollTop = position.top
    container.dispatchEvent(new Event('scroll'))
    await nextTick()
  }
  function scrollEvents(): [Event, string][] {
    return (wrapper?.emitted('scroll') ?? []) as [Event, string][]
  }

  it('程序化写 scrollLeft 也派发 scroll 事件，方向随位移变化', async () => {
    const container = mountScrollbar()

    await scrollBy(container, { left: 120 })
    expect(scrollEvents()).toHaveLength(1)
    expect(scrollEvents()[0][1]).toBe('right')

    await scrollBy(container, { left: 40 })
    expect(scrollEvents()).toHaveLength(2)
    expect(scrollEvents()[1][1]).toBe('left')
  })

  it('程序化写 scrollTop 同样派发，方向为 top / bottom', async () => {
    const container = mountScrollbar()

    await scrollBy(container, { top: 200 })
    expect(scrollEvents()[0][1]).toBe('bottom')

    await scrollBy(container, { top: 50 })
    expect(scrollEvents()[1][1]).toBe('top')
  })

  it('位置未变化时不派发，横纵同时变化各派发一次', async () => {
    const container = mountScrollbar()

    await scrollBy(container, { left: 0, top: 0 })
    expect(scrollEvents()).toHaveLength(0)

    await scrollBy(container, { left: 80, top: 80 })
    expect(scrollEvents().map((event) => event[1])).toEqual(['right', 'bottom'])
  })

  it('默认配置（autoHide 为 false）同样派发 scrollend，不被自动隐藏门控', async () => {
    const container = mountScrollbar()

    await scrollBy(container, { top: 200 })
    expect(wrapper?.emitted('scrollend')).toBeUndefined()

    // 滚动结束按 100ms 防抖判定，等待其触发
    await new Promise((resolve) => setTimeout(resolve, 150))
    const ends = (wrapper?.emitted('scrollend') ?? []) as [Event, string][]
    expect(ends).toHaveLength(1)
    expect(ends[0][1]).toBe('bottom')
  })
})
