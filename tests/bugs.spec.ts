import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import Message from 'components/message/Message.vue'
import Notification from 'components/notification/Notification.vue'
import Modal from 'components/modal/Modal.vue'
import Upload from 'components/upload/Upload.vue'
import type { MessageApi } from 'components/message'
import type { NotificationApi } from 'components/notification'
import type { ModalApi } from 'components/modal'

/**
 * B1 - B7 缺陷复现用例 + P2 / P3 / P4 / P6 补充问题用例
 *
 * 本文件中的用例针对 TEMP-REFACTOR-PLAN.md 第三节「Bug 修复清单」与「补充问题」。
 * 全部缺陷均已修复，用例描述的是修复后的期望行为，当前应全部通过。
 * 三组件已移除 defineExpose，统一通过 @ready 事件回传命令式 api 驱动。
 */

interface MessageOptions {
  content?: unknown // string | VNode | (() => VNode)
  duration?: number | null
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
interface NotificationReactive {
  readonly key: string
  destroy(): void
  update(options: Partial<NotificationOptions>): void
}
interface NotificationInst {
  open(o: NotificationOptions): NotificationReactive
  info(o: NotificationOptions): NotificationReactive
  success(o: NotificationOptions): NotificationReactive
  error(o: NotificationOptions): NotificationReactive
  warning(o: NotificationOptions): NotificationReactive
}

interface ModalOptions {
  title?: unknown
  content?: unknown
  centered?: boolean
  top?: number | string
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

/**
 * 三组件均 Teleport 到 body，wrapper.find* 无法定位已传送出去的节点，
 * 故统一改为 document 级查询，并对原生节点派发事件。
 */
function containers(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(selector))
}
function visibleContainers(selector: string): HTMLElement[] {
  return containers(selector).filter((el) => el.style.display !== 'none')
}
function dispatch(el: Element, type: string): void {
  el.dispatchEvent(new MouseEvent(type, { bubbles: true }))
}

/**
 * 三组件已移除 defineExpose，改用 ready 事件回传命令式 api。
 * 挂载时通过 onReady 监听器取回 api，组件实例本身仍作为 wrapper 根组件，
 * 以便继续使用 wrapper.emitted() 观察组件自身事件。
 */
function mountMessage() {
  let api!: MessageApi
  const wrapper = mount(Message, {
    attachTo: document.body,
    props: { onReady: (value: MessageApi) => (api = value) }
  })
  return { wrapper, vm: api as unknown as MessageInst }
}
function mountNotification() {
  let api!: NotificationApi
  const wrapper = mount(Notification, {
    attachTo: document.body,
    props: { onReady: (value: NotificationApi) => (api = value) }
  })
  return { wrapper, vm: api as unknown as NotificationInst }
}
function mountModal() {
  let api!: ModalApi
  const wrapper = mount(Modal, {
    attachTo: document.body,
    props: { onReady: (value: ModalApi) => (api = value) }
  })
  return { wrapper, vm: api as unknown as ModalInst }
}

describe('B1 Message - duration 为全局单例，hover 离开后按错误的 duration 重新计时', () => {
  it('A(duration 200) hover 离开后应仍按 200ms 关闭，不被 B 的 5000ms 覆盖', async () => {
    const { wrapper, vm } = mountMessage()
    vm.success({ content: 'A', duration: 200 })
    vm.success({ content: 'B', duration: 5000 })
    await wrapper.vm.$nextTick()

    const items = containers('.message-content-wrap')
    expect(items.length).toBe(2)

    // hover 暂停计时，离开时重新计时——此时应取 A 自身的 duration
    dispatch(items[0], 'mouseenter')
    dispatch(items[0], 'mouseleave')

    await wait(500) // 已超过 A 自身的 200ms
    await wrapper.vm.$nextTick()

    // 断言与实现无关：A 已被移除、仅剩 B（不依赖 v-show 留下的 display: none）
    const remaining = containers('.message-container')
    expect(remaining.length).toBe(1)
    expect(remaining[0].textContent).toContain('B')
    wrapper.unmount()
  })
})

describe('B2 Message - duration 为 null 时永久阻塞清理', () => {
  it('存在常驻消息时，后续消息关闭后仍应被回收', async () => {
    const { wrapper, vm } = mountMessage()
    vm.info({ content: '常驻', duration: null })
    vm.success({ content: '临时', duration: 100 })
    await wrapper.vm.$nextTick()
    expect(containers('.message-container').length).toBe(2)

    await wait(900) // 覆盖临时消息关闭(100ms) + 清理延时(300ms)
    await wrapper.vm.$nextTick()

    // 期望：临时消息被移除，仅剩常驻的 1 条
    expect(containers('.message-container').length).toBe(1)
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
    const okBtn = containers('.btn-wrap').find((el) => el.textContent?.trim() === '确定')
    expect(okBtn).toBeTruthy()
    dispatch(okBtn!, 'click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    // 断言与实现无关：按「可见性」判定，而非取 DOM 中的第一个容器
    const visible = visibleContainers('.modal-container')
    expect(visible.length).toBe(1)
    expect(visible[0].textContent).toContain('删除失败')
    wrapper.unmount()
  })
})

describe('B5 Notification - 存在常驻通知时分组数据永不回收', () => {
  it('存在常驻通知时，其他通知关闭后应被移除', async () => {
    const { wrapper, vm } = mountNotification()
    vm.info({ title: '常驻', duration: null })
    vm.success({ title: '临时', duration: 100 })
    await wrapper.vm.$nextTick()
    expect(containers('.notification-container').length).toBe(2)

    await wait(900) // 覆盖临时通知关闭(100ms) + 清理延时(300ms)
    await wrapper.vm.$nextTick()

    // 期望：临时通知被移除，仅剩常驻的 1 条
    expect(containers('.notification-container').length).toBe(1)
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
    const okBtn = containers('.btn-wrap').find((el) => el.textContent?.trim() === '确定')
    expect(okBtn).toBeTruthy()
    dispatch(okBtn!, 'click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    // 断言与实现无关：抛错后弹窗应关闭，可见容器数为 0
    const visible = visibleContainers('.modal-container')
    expect(visible.length).toBe(0)
    wrapper.unmount()
  })
})

describe('Modal 定位 - centered 实例的居中类', () => {
  it('centered 弹窗的容器应带 is-centered 类', async () => {
    const { wrapper, vm } = mountModal()
    vm.info({ content: '居中', centered: true })
    await wrapper.vm.$nextTick()
    const el = containers('.modal-container')[0]
    expect(el.classList.contains('is-centered')).toBe(true)
    wrapper.unmount()
  })

  it('非 centered 弹窗的容器不应带 is-centered 类', async () => {
    const { wrapper, vm } = mountModal()
    vm.info({ content: '顶部', top: 100 })
    await wrapper.vm.$nextTick()
    const el = containers('.modal-container')[0]
    expect(el.classList.contains('is-centered')).toBe(false)
    wrapper.unmount()
  })
})

describe('B7 Notification - update({ duration: null }) 无法取消已有定时器', () => {
  it('改为常驻后，通知不应再按旧时长自动关闭', async () => {
    const { wrapper, vm } = mountNotification()
    const handle = vm.info({ title: 'B7', duration: 100 })
    await wrapper.vm.$nextTick()
    // 将短时通知改为常驻，此前注册的 100ms 定时器必须被取消
    handle.update({ duration: null })
    await wait(600) // 远超原定时器的 100ms
    await wrapper.vm.$nextTick()

    expect(containers('.notification-container').length).toBe(1)
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
    let api!: NotificationApi
    const wrapper = mount(Notification, {
      attachTo: host,
      props: { onReady: (value: NotificationApi) => (api = value) }
    })
    api.info({ title: 'P2', duration: null })
    await wrapper.vm.$nextTick()
    expect(host.querySelector('.notification-wrap')).toBeNull()
    wrapper.unmount()
    host.remove()
  })

  it('Message 容器不应留在组件挂载点内', async () => {
    const host = createHost()
    let api!: MessageApi
    const wrapper = mount(Message, {
      attachTo: host,
      props: { onReady: (value: MessageApi) => (api = value) }
    })
    api.info({ content: 'P2', duration: null })
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
    const { wrapper, vm } = mountNotification()
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
    const { wrapper, vm } = mountMessage()
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
    const { wrapper, vm } = mountNotification()
    vm.info({ title: h('span', { class: 'p4-title' }, 'Hello VNode'), duration: null })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.p4-title')).not.toBeNull()
    wrapper.unmount()
  })

  it('Message 的 content 支持渲染函数', async () => {
    const { wrapper, vm } = mountMessage()
    vm.info({
      content: () => h('span', { class: 'p4-content' }, 'Hello Fn'),
      duration: null
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.p4-content')).not.toBeNull()
    wrapper.unmount()
  })

  it('Modal 的 content 支持渲染函数', async () => {
    const { wrapper, vm } = mountModal()
    vm.info({
      content: () => h('span', { class: 'p4-modal-content' }, 'Hello Modal'),
      onKnow: () => {}
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.p4-modal-content')).not.toBeNull()
    wrapper.unmount()
  })
})

describe('P6 - Upload 已移除内嵌 Message，操作提示交由使用方处理', () => {
  // Upload 不再内嵌 <Message>，改为通过 success / error 事件配合 remove 事件由使用方自行提示，
  // 从根源消除「多实例各自内嵌容器，fixed: top 重叠」的问题。
  it('挂载多个 Upload 后不应产生任何 Message 容器', () => {
    const host = createHost()
    mount(Upload, { attachTo: host })
    mount(Upload, { attachTo: host })
    expect(document.querySelectorAll('.message-wrap').length).toBe(0)
    host.remove()
  })
})
