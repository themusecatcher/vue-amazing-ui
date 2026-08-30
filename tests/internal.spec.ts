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

interface MessageInst {
  info(m: { content: string; duration: number | null }): void
  success(m: { content: string; duration: number | null }): void
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function mountMessage() {
  const wrapper = mount(Message, { attachTo: document.body })
  return { wrapper, vm: wrapper.vm as unknown as MessageInst }
}

/**
 * 仍未触发且未被取消的定时器。
 * 已触发的定时器生命周期已自然结束，本就无需取消，故不计入，
 * 否则会误判为残留。
 */
function pendingTimers(): number[] {
  return timerState.registered.filter((r) => !r.fired && !timerState.cancelled.has(r.id)).map((r) => r.id)
}

describe('P1 - Message 卸载时应清理全部定时器（含整批重置定时器）', () => {
  beforeEach(() => {
    timerState.registered.length = 0
    timerState.cancelled.clear()
  })

  it('卸载后不应残留未被取消的定时器', async () => {
    const { wrapper, vm } = mountMessage()
    vm.info({ content: 'P1', duration: 20 })
    await wrapper.vm.$nextTick()
    // 等自动关闭触发，进而注册用于整批重置的 resetTimer（其内部延时 300ms）
    await wait(120)
    // 确保确实注册了不止一个定时器，否则本用例失去意义
    expect(timerState.registered.length).toBeGreaterThan(1)

    wrapper.unmount()

    // 当前实现仅清理 hideTimers，resetTimer 未清理 → 此处会暴露残留
    expect(pendingTimers()).toEqual([])
  })
})

describe('P5 - Message 定时器应随消息关闭而释放', () => {
  beforeEach(() => {
    timerState.registered.length = 0
    timerState.cancelled.clear()
  })

  it('多条消息全部关闭后不应残留未被取消的定时器', async () => {
    const { wrapper, vm } = mountMessage()
    vm.success({ content: 'A', duration: 20 })
    vm.success({ content: 'B', duration: 20 })
    vm.success({ content: 'C', duration: 20 })
    await wrapper.vm.$nextTick()
    await wait(150)

    wrapper.unmount()

    expect(pendingTimers()).toEqual([])
  })
})
