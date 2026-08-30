import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import Message from 'components/message/Message.vue'
import Notification from 'components/notification/Notification.vue'
import Modal from 'components/modal/Modal.vue'
import Upload from 'components/upload/Upload.vue'

/**
 * B1 - B6 缺陷复现用例
 *
 * 本文件中的用例针对 TEMP-REFACTOR-PLAN.md 第三节「Bug 修复清单」。
 * 用例描述的是**修复后的期望行为**，因此在当前代码下应当失败；
 * 重构完成后应全部转为通过，届时即为缺陷已修复的实证。
 */

interface MessageOptions {
  content?: unknown // string | VNode | (() => VNode)
  duration?: number | null
  top?: string | number
}
interface MessageInst {
  open(m: MessageOptions): void
  info(m: MessageOptions): void
  success(m: MessageOptions): void
  error(m: MessageOptions): void
  warning(m: MessageOptions): void
  loading(m: MessageOptions): void
}

interface NotificationOptions {
  title?: unknown // string | VNode | (() => VNode)
  description?: unknown
  duration?: number | null
}
interface NotificationInst {
  open(o: NotificationOptions): void
  info(o: NotificationOptions): void
  success(o: NotificationOptions): void
  error(o: NotificationOptions): void
  warning(o: NotificationOptions): void
}

interface ModalOptions {
  title?: string
  content?: string
  onOk?: () => void | Promise<void>
  onCancel?: () => void
  onKnow?: () => void
}
interface ModalInst {
  info(o: ModalOptions): void
  success(o: ModalOptions): void
  error(o: ModalOptions): void
  warning(o: ModalOptions): void
  confirm(o: ModalOptions): void
  erase(o: ModalOptions): void
}

// rafTimeout 基于 requestAnimationFrame 的时间戳差值，测试中使用真实等待推进
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function mountMessage() {
  const wrapper = mount(Message, { attachTo: document.body })
  return { wrapper, vm: wrapper.vm as unknown as MessageInst }
}
function mountNotification() {
  const wrapper = mount(Notification, { attachTo: document.body })
  return { wrapper, vm: wrapper.vm as unknown as NotificationInst }
}
function mountModal() {
  const wrapper = mount(Modal, { attachTo: document.body })
  return { wrapper, vm: wrapper.vm as unknown as ModalInst }
}

describe('B1 Message - duration 为全局单例，hover 离开后按错误的 duration 重新计时', () => {
  it('A(duration 200) hover 离开后应仍按 200ms 关闭，不被 B 的 5000ms 覆盖', async () => {
    const { wrapper, vm } = mountMessage()
    vm.success({ content: 'A', duration: 200 })
    vm.success({ content: 'B', duration: 5000 })
    await wrapper.vm.$nextTick()

    const items = wrapper.findAll('.message-container')
    expect(items.length).toBe(2)

    // hover 暂停计时，离开时重新计时——此时应取 A 自身的 duration
    await items[0].find('.message-content-wrap').trigger('mouseenter')
    await items[0].find('.message-content-wrap').trigger('mouseleave')

    await wait(500) // 已超过 A 自身的 200ms
    await wrapper.vm.$nextTick()

    const first = wrapper.findAll('.message-container')[0].element as HTMLElement
    expect(first.style.display).toBe('none')
    wrapper.unmount()
  })
})

describe('B2 Message - duration 为 null 时永久阻塞清理', () => {
  it('存在常驻消息时，后续消息关闭后仍应被回收', async () => {
    const { wrapper, vm } = mountMessage()
    vm.info({ content: '常驻', duration: null })
    vm.success({ content: '临时', duration: 100 })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.message-container').length).toBe(2)

    await wait(900) // 覆盖临时消息关闭(100ms) + 清理延时(300ms)
    await wrapper.vm.$nextTick()

    // 期望：临时消息被移除，仅剩常驻的 1 条
    expect(wrapper.findAll('.message-container').length).toBe(1)
    wrapper.unmount()
  })
})

describe('B3 Message - 容器 top 为全局单例', () => {
  it('后发消息的 top 不应改变已显示消息的位置', async () => {
    const { wrapper, vm } = mountMessage()
    vm.success({ content: 'A' }) // 使用组件默认 top: 30
    await wrapper.vm.$nextTick()

    const topBefore = (wrapper.find('.message-wrap').element as HTMLElement).style.top
    expect(topBefore).toBe('30px')

    vm.success({ content: 'B', top: 200 })
    await wrapper.vm.$nextTick()

    const topAfter = (wrapper.find('.message-wrap').element as HTMLElement).style.top
    expect(topAfter).toBe(topBefore)
    wrapper.unmount()
  })
})

describe('B4 Modal - onOk 内再次弹窗会被 await 之后的关闭逻辑立即关闭', () => {
  it('onOk 中调用 error 后，该 error 弹窗应保持可见', async () => {
    const { wrapper, vm } = mountModal()
    vm.confirm({
      content: '确认删除',
      onOk: async () => {
        vm.error({ content: '删除失败' })
      }
    })
    await flushPromises()

    // Button 组件根元素为 div（:is="href ? 'a' : 'div'"），故按 .btn-wrap 定位而非 button 标签
    const okBtn = wrapper.findAll('.btn-wrap').find((b) => b.text() === '确定')
    expect(okBtn).toBeTruthy()
    await okBtn!.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    const container = wrapper.find('.modal-container').element as HTMLElement
    expect(container.style.display).not.toBe('none')
    wrapper.unmount()
  })
})

describe('B5 Notification - 存在常驻通知时分组数据永不回收', () => {
  it('存在常驻通知时，其他通知关闭后应被移除', async () => {
    const { wrapper, vm } = mountNotification()
    vm.info({ title: '常驻', duration: null })
    vm.success({ title: '临时', duration: 100 })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.notification-container').length).toBe(2)

    await wait(900) // 覆盖临时通知关闭(100ms) + 清理延时(300ms)
    await wrapper.vm.$nextTick()

    // 期望：临时通知被移除，仅剩常驻的 1 条
    expect(wrapper.findAll('.notification-container').length).toBe(1)
    wrapper.unmount()
  })
})

describe('B6 Modal - onOk 抛错导致后续语句被跳过，弹窗无法关闭', () => {
  it('onOk 抛错后，loading 应复位且弹窗应关闭', async () => {
    const { wrapper, vm } = mountModal()
    vm.confirm({
      content: '确认',
      onOk: () => {
        throw new Error('boom')
      }
    })
    await flushPromises()

    // Button 组件根元素为 div（:is="href ? 'a' : 'div'"），故按 .btn-wrap 定位而非 button 标签
    const okBtn = wrapper.findAll('.btn-wrap').find((b) => b.text() === '确定')
    expect(okBtn).toBeTruthy()
    await okBtn!.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    const container = wrapper.find('.modal-container').element as HTMLElement
    expect(container.style.display).toBe('none')
    wrapper.unmount()
  })
})

// ========== P 类补充问题用例 ==========
/**
 * P2：命令式组件应 Teleport 到 body。
 * 判据：容器不应出现在组件挂载点 host 内（无 Teleport 时会留在其中）。
 */
function createHost(): HTMLElement {
  const host = document.createElement('div')
  document.body.appendChild(host)
  return host
}

describe('P2 - 命令式组件应 Teleport 到 body', () => {
  it('Notification 容器不应留在组件挂载点内', async () => {
    const host = createHost()
    const wrapper = mount(Notification, { attachTo: host })
    const vm = wrapper.vm as unknown as NotificationInst
    vm.info({ title: 'P2', duration: null })
    await wrapper.vm.$nextTick()
    expect(host.querySelector('.notification-wrap')).toBeNull()
    wrapper.unmount()
    host.remove()
  })

  it('Message 容器不应留在组件挂载点内', async () => {
    const host = createHost()
    const wrapper = mount(Message, { attachTo: host })
    const vm = wrapper.vm as unknown as MessageInst
    vm.info({ content: 'P2', duration: null })
    await wrapper.vm.$nextTick()
    expect(host.querySelector('.message-wrap')).toBeNull()
    wrapper.unmount()
    host.remove()
  })

  it('Modal 根容器不应留在组件挂载点内', async () => {
    const host = createHost()
    const wrapper = mount(Modal, { attachTo: host })
    await wrapper.vm.$nextTick()
    expect(host.querySelector('.modal-root')).toBeNull()
    wrapper.unmount()
    host.remove()
  })
})

describe('P3 - close 事件应携带关闭项标识', () => {
  it('Notification 的 close 事件应传出该条通知的 key', async () => {
    const wrapper = mount(Notification, { attachTo: document.body })
    const vm = wrapper.vm as unknown as NotificationInst
    const handle = vm.info({ title: 'P3', duration: null })
    await wrapper.vm.$nextTick()
    handle.destroy()
    await wrapper.vm.$nextTick()
    const events = wrapper.emitted('close')
    expect(events).toBeTruthy()
    expect(events![0][0]).toBe(handle.key)
    wrapper.unmount()
  })

  it('Message 的 close 事件同样应传出标识', async () => {
    const wrapper = mount(Message, { attachTo: document.body })
    const vm = wrapper.vm as unknown as MessageInst
    vm.info({ content: 'P3', duration: 50 })
    await wrapper.vm.$nextTick()
    await wait(400)
    const events = wrapper.emitted('close')
    expect(events).toBeTruthy()
    expect(events![0][0]).toBeTruthy()
    wrapper.unmount()
  })
})

describe('P4 - 内容应支持 VNode / 渲染函数', () => {
  it('Notification 的 title 支持 VNode', async () => {
    const wrapper = mount(Notification, { attachTo: document.body })
    const vm = wrapper.vm as unknown as NotificationInst
    vm.info({ title: h('span', { class: 'p4-title' }, 'Hello VNode'), duration: null })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.p4-title').exists()).toBe(true)
    wrapper.unmount()
  })

  it('Message 的 content 支持渲染函数', async () => {
    const wrapper = mount(Message, { attachTo: document.body })
    const vm = wrapper.vm as unknown as MessageInst
    vm.info({
      content: () => h('span', { class: 'p4-content' }, 'Hello Fn'),
      duration: null
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.p4-content').exists()).toBe(true)
    wrapper.unmount()
  })
})

describe('P6 - Upload 内嵌独立 Message 容器', () => {
  // 现状记录：Upload 内部硬编码 <Message>（Upload.vue L418），
  // 每个实例一个独立容器，与页面自有的 Message 互相隔离且均固定 top:30px，可能重叠。
  // 解耦完成后，此断言应反转为 false。
  it('Upload 内部存在独立的 Message 容器', () => {
    const wrapper = mount(Upload, { attachTo: document.body })
    expect(wrapper.find('.message-wrap').exists()).toBe(true)
    wrapper.unmount()
  })
})
