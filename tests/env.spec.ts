import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Message from 'components/message/Message.vue'
import Notification from 'components/notification/Notification.vue'
import Modal from 'components/modal/Modal.vue'

/**
 * 测试环境探针：验证 S0 的三个前置条件
 * 1. happy-dom 下 requestAnimationFrame 可用（组件帧调度依赖它）
 * 2. components 别名与 .vue 单文件组件可被解析
 * 3. 三个目标组件可独立挂载（useInject 有默认值回退，无需外层 ConfigProvider）
 */
describe('测试环境探针', () => {
  it('requestAnimationFrame 可用，帧回调能被调度', async () => {
    let called = false
    requestAnimationFrame(() => {
      called = true
    })
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(called).toBe(true)
  })

  it('cancelAnimationFrame 能取消尚未触发的帧回调', async () => {
    let called = false
    const id = requestAnimationFrame(() => {
      called = true
    })
    cancelAnimationFrame(id)
    await new Promise((resolve) => setTimeout(resolve, 100))
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
