import { describe, it, expect, afterEach } from 'vitest'
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
})
