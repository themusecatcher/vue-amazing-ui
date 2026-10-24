import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TextScroll from 'components/text-scroll/TextScroll.vue'

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
})
afterEach(() => {
  vi.useRealTimers()
})

const props = {
  items: [{ title: 'a' }, { title: 'b' }, { title: 'c' }, { title: 'd' }],
  vertical: true,
  interval: 100,
  duration: 50
}
type Vm = { start(): void; stop(): void; activeIndex: number }

describe('探针：stop 能否停住重复 start 产生的链', () => {
  it('start x2 后 stop，是否仍在推进', () => {
    const wrapper = mount(TextScroll, { attachTo: document.body, props })
    const vm = wrapper.vm as unknown as Vm
    vm.start()
    vm.start()
    vi.advanceTimersByTime(100)
    const beforeStop = vm.activeIndex
    vm.stop()
    vi.advanceTimersByTime(300)
    const afterStop = vm.activeIndex
    console.log('[probe] beforeStop:', beforeStop, 'afterStop:', afterStop)
    wrapper.unmount()
    expect(true).toBe(true)
  })
})
