import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { rafTimeout, cancelRaf } from 'components/utils'
import Message from 'components/message/Message.vue'
import Notification from 'components/notification/Notification.vue'
import Modal from 'components/modal/Modal.vue'

/**
 * 测试环境探针：验证 S0 的三个前置条件
 * 1. happy-dom 下 requestAnimationFrame 可用（rafTimeout 依赖它）
 * 2. components 别名与 .vue 单文件组件可被解析
 * 3. 三个目标组件可独立挂载（useInject 有默认值回退，无需外层 ConfigProvider）
 */
describe('测试环境探针', () => {
  it('requestAnimationFrame 可用，rafTimeout 能在 delay 后触发', async () => {
    let called = false
    rafTimeout(() => {
      called = true
    }, 50)
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(called).toBe(true)
  })

  it('cancelRaf 能取消尚未触发的 rafTimeout', async () => {
    let called = false
    const raf = rafTimeout(() => {
      called = true
    }, 50)
    cancelRaf(raf)
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(called).toBe(false)
  })

  it('三个目标组件均可独立挂载', () => {
    expect(mount(Message).exists()).toBe(true)
    expect(mount(Notification).exists()).toBe(true)
    expect(mount(Modal).exists()).toBe(true)
  })

  it('Message 暴露命令式方法', () => {
    const wrapper = mount(Message)
    const vm = wrapper.vm as unknown as Record<string, unknown>
    expect(typeof vm.open).toBe('function')
    expect(typeof vm.success).toBe('function')
    expect(typeof vm.loading).toBe('function')
  })
})
