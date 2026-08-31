import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

/**
 * P1 / P5 涉及组件内部的定时器持有情况，无法通过 DOM 断言直接观测，
 * 故对 components/utils 的 rafTimeout / cancelRaf 打桩，记录注册与取消。
 */
const timerState = vi.hoisted(() => ({
  registered: [] as Array<{ id: number; fired: boolean }>,
  cancelled: new Set<number>(),
  seq: 0
}))

vi.mock('components/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('components/utils')>()
  return {
    ...actual,
    rafTimeout: (fn: Function, delay = 0) => {
      timerState.seq += 1
      const record = { id: timerState.seq, fired: false }
      timerState.registered.push(record)
      // 以真实 setTimeout 驱动，确保消息能真正走完关闭流程（进而触发整批重置定时器）
      setTimeout(() => {
        record.fired = true
        fn()
      }, delay)
      return { id: record.id }
    },
    cancelRaf: (raf: unknown) => {
      const target = raf as { id?: number } | null
      if (target && typeof target.id === 'number') {
        timerState.cancelled.add(target.id)
      }
    }
  }
})

import Message from 'components/message/Message.vue'
import type { MessageApi } from 'components/message'

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

/**
 * 仍未触发且未被取消的定时器。
 * 已触发的定时器生命周期已自然结束，本就无需取消，故不计入，
 * 否则会误判为残留。
 */
function pendingTimers(): number[] {
  return timerState.registered.filter((r) => !r.fired && !timerState.cancelled.has(r.id)).map((r) => r.id)
}

describe('P1 - Message 卸载时应清理全部定时器', () => {
  beforeEach(() => {
    timerState.registered.length = 0
    timerState.cancelled.clear()
  })

  it('定时器尚未触发时卸载，不应残留未被取消的定时器', async () => {
    const { wrapper, vm } = mountMessage()
    vm.info({ content: 'P1', duration: 5000 })
    await wrapper.vm.$nextTick()
    // 尚未到达 5000ms，定时器处于 pending 状态，卸载必须主动取消，否则会残留
    expect(pendingTimers().length).toBe(1)

    wrapper.unmount()

    expect(pendingTimers()).toEqual([])
  })
})

describe('P5 - Message 定时器应随消息关闭而释放', () => {
  beforeEach(() => {
    timerState.registered.length = 0
    timerState.cancelled.clear()
  })

  it('单条消息关闭后其定时器应被取消，剩余消息的定时器保留', async () => {
    const { wrapper, vm } = mountMessage()
    const handleA = vm.info({ content: 'A', duration: 5000 })
    vm.info({ content: 'B', duration: 5000 })
    await wrapper.vm.$nextTick()
    expect(pendingTimers().length).toBe(2)

    // 关闭 A，其定时器应被取消，B 的定时器仍在
    handleA.destroy()
    await wrapper.vm.$nextTick()
    expect(pendingTimers().length).toBe(1)

    wrapper.unmount()
    expect(pendingTimers()).toEqual([])
  })
})
