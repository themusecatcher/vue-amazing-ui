import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Message from 'components/message/Message.vue'
import type { MessageApi } from 'components/message'

/**
 * P1 / P5 涉及组件内部的定时器持有情况，无法通过 DOM 断言直接观测。
 * 组件以原生 setTimeout 持有自动关闭定时器，故使用 vitest 假定时器统计
 * 「已注册且尚未触发、尚未取消」的定时器数量：被 clearTimeout 取消的定时器
 * 会从计数中移除，与原先打桩 cancelRaf 的观测口径一致。
 * 附带收益：无需真实等待 duration，用例瞬时完成。
 */
beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

interface MessageReactive {
  key: string
  destroy(): void
}
interface MessageInst {
  info(m: { content: string; duration: number | null }): MessageReactive
  success(m: { content: string; duration: number | null }): MessageReactive
}

function mountMessage() {
  // Message 已移除 defineExpose，改用 ready 事件回传命令式 api
  let api!: MessageApi
  const wrapper = mount(Message, {
    attachTo: document.body,
    props: { onReady: (value: MessageApi) => (api = value) }
  })
  return { wrapper, vm: api as unknown as MessageInst }
}

// 挂载本身（happy-dom 渲染环境）会带来常驻定时器，且其不随 unmount 释放，
// 故断言组件自身持有的定时器增量，而非绝对数量
function baseline(): number {
  return vi.getTimerCount()
}

describe('P1 - Message 卸载时应清理全部定时器', () => {
  it('定时器尚未触发时卸载，不应残留未被取消的定时器', async () => {
    const { wrapper, vm } = mountMessage()
    const base = baseline()
    vm.info({ content: 'P1', duration: 5000 })
    await wrapper.vm.$nextTick()
    // 尚未到达 5000ms，定时器处于 pending 状态，卸载必须主动取消，否则会残留
    expect(vi.getTimerCount()).toBe(base + 1)

    wrapper.unmount()

    expect(vi.getTimerCount()).toBe(base)
  })
})

describe('P5 - Message 定时器应随消息关闭而释放', () => {
  it('单条消息关闭后其定时器应被取消，剩余消息的定时器保留', async () => {
    const { wrapper, vm } = mountMessage()
    const base = baseline()
    const handleA = vm.info({ content: 'A', duration: 5000 })
    vm.info({ content: 'B', duration: 5000 })
    await wrapper.vm.$nextTick()
    expect(vi.getTimerCount()).toBe(base + 2)

    // 关闭 A，其定时器应被取消，B 的定时器仍在
    handleA.destroy()
    await wrapper.vm.$nextTick()
    expect(vi.getTimerCount()).toBe(base + 1)

    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(base)
  })
})
