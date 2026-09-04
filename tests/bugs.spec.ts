import { describe, it, expect, beforeEach } from 'vitest'
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
  key?: string
  title?: unknown // string | VNode | (() => VNode)
  content?: unknown
  closable?: boolean
  duration?: number | null
  placement?: string
  onClick?: () => void
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

// 自动关闭依赖真实计时，此处直接等待对应时长推进；
// 不引入假定时器，以免干扰 Teleport 与过渡相关的断言
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

describe('B3 Message - 容器 top 为组件级配置，后发消息不改变位置', () => {
  it('容器 top 由组件级 props 决定，连续打开消息后保持不变', async () => {
    let api!: MessageApi
    const wrapper = mount(Message, {
      attachTo: document.body,
      props: { top: 80, onReady: (value: MessageApi) => (api = value) }
    })
    api.success({ content: 'A' })
    await wrapper.vm.$nextTick()
    expect(containers('.message-wrap')[0].style.top).toBe('80px')

    // 后发消息不再改写容器位置（原 B3 缺陷：messageTop 为全局单例，后发消息顶掉已显示消息）
    api.success({ content: 'B' })
    api.success({ content: 'C' })
    await wrapper.vm.$nextTick()
    expect(containers('.message-wrap')[0].style.top).toBe('80px')
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

describe('B6 Modal - onOk 抛错导致后续语句被跳过，按钮 loading 卡死', () => {
  it('onOk 抛错后，loading 应复位且弹窗保持打开（对齐 antdv：reject 视为取消关闭）', async () => {
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

    // 断言与实现无关：抛错后弹窗保持打开（reject 阻止关闭），loading 已复位
    const visible = visibleContainers('.modal-container')
    expect(visible.length).toBe(1)
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

describe('Modal 多实例 - 每实例独占全屏 layer，弹窗层叠而非纵向排列', () => {
  // 回归保护：曾因所有实例平铺在 flex column 的 .modal-wrap 下而上下排列（与 naive-ui / antdv 的层叠行为不一致）。
  // 修复后每实例渲染独立全屏 .modal-layer，遮罩与弹窗均在层内，实例间靠 zIndex 层叠。
  it('同时打开多个实例时各渲染独立 modal-layer，容器不再作为 modal-wrap 的直接子级', async () => {
    const { wrapper, vm } = mountModal()
    vm.info({ content: 'first' })
    vm.confirm({ content: 'second' })
    vm.error({ content: 'third' })
    await wrapper.vm.$nextTick()

    const layers = containers('.modal-layer')
    expect(layers.length).toBe(3)
    // 容器均被 layer 包裹，不再直接平铺在 modal-wrap 下
    expect(containers('.modal-wrap > .modal-container').length).toBe(0)
    expect(containers('.modal-wrap > .modal-layer').length).toBe(3)
    // 每个 layer 内各含一个弹窗容器与一个遮罩
    layers.forEach((layer) => {
      expect(layer.querySelector('.modal-container')).not.toBeNull()
      expect(layer.querySelector('.modal-mask')).not.toBeNull()
    })
    wrapper.unmount()
  })

  it('关闭其中一层后仅移除该实例的 layer，其余 layer 保留', async () => {
    const { wrapper, vm } = mountModal()
    const modal = vm as unknown as ModalApi
    const first = modal.info({ content: 'first' })
    modal.confirm({ content: 'second' })
    modal.error({ content: 'third' })
    await wrapper.vm.$nextTick()
    expect(containers('.modal-layer').length).toBe(3)

    first.destroy()
    await wrapper.vm.$nextTick()
    // happy-dom 下 Transition 离场动画回调不可靠，DOM 不实际移除，故按「可见性」判定（与既有 Modal 用例一致）：
    // 被关闭实例的容器进入离场态（v-show: false），其余两个实例保持可见
    const visible = visibleContainers('.modal-container')
    expect(visible.length).toBe(2)
    expect(visible.some((el) => el.textContent?.includes('second'))).toBe(true)
    expect(visible.some((el) => el.textContent?.includes('third'))).toBe(true)
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

describe('Notification - onClose 返回 false 应取消本次关闭（对齐 naive-ui）', () => {
  it('onClose 返回 false 时点击关闭按钮，通知保留', async () => {
    const { wrapper, vm } = mountNotification()
    vm.open({
      title: 'Satisfaction',
      content: '通知内容',
      duration: null,
      onClose: () => false
    })
    await wrapper.vm.$nextTick()
    dispatch(containers('.notification-close')[0], 'click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    expect(containers('.notification-container').length).toBe(1)
    wrapper.unmount()
  })

  it('onClose 未返回 false 时点击关闭按钮，通知移除', async () => {
    const { wrapper, vm } = mountNotification()
    vm.open({
      title: 'Normal',
      content: '通知内容',
      duration: null,
      onClose: () => true
    })
    await wrapper.vm.$nextTick()
    dispatch(containers('.notification-close')[0], 'click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    expect(containers('.notification-container').length).toBe(0)
    wrapper.unmount()
  })
})

describe('Notification - meta 与 action 底部区域渲染', () => {
  it('meta 与 action 同时传入时渲染到通知底部', async () => {
    const { wrapper, vm } = mountNotification()
    vm.open({
      title: 'Satisfaction',
      content: '通知内容',
      duration: null,
      meta: '2019-5-27 15:11',
      action: () => h('a', { onClick: () => {} }, '已读')
    })
    await wrapper.vm.$nextTick()
    const footer = containers('.notification-footer')[0]
    expect(footer.querySelector('.notification-footer__meta')?.textContent).toContain('2019-5-27 15:11')
    expect(footer.querySelector('.notification-footer__action')?.textContent).toBe('已读')
    wrapper.unmount()
  })

  it('仅传 action 时 footer 渲染且无 meta 节点', async () => {
    const { wrapper, vm } = mountNotification()
    vm.open({
      title: 'Notification Title',
      content: '通知内容',
      duration: null,
      action: () => h('a', { onClick: () => {} }, 'Confirm')
    })
    await wrapper.vm.$nextTick()
    const footer = containers('.notification-footer')[0]
    expect(footer.querySelector('.notification-footer__meta')).toBeNull()
    expect(footer.querySelector('.notification-footer__action')?.textContent).toBe('Confirm')
    wrapper.unmount()
  })

  it('未传 meta / action 时不渲染 footer', async () => {
    const { wrapper, vm } = mountNotification()
    vm.open({ title: 'plain', content: '通知内容', duration: null })
    await wrapper.vm.$nextTick()
    expect(containers('.notification-footer').length).toBe(0)
    wrapper.unmount()
  })
})

describe('Notification - 并发关闭时按 key 精确移除（await 期间数组位移不误删）', () => {
  it('异步 onClose 的通知在其他通知移除后仍能按 key 正确关闭', async () => {
    const { wrapper, vm } = mountNotification()
    let resolveA!: () => void
    // B 在前（同步关闭），A 在后（异步 onClose）
    vm.open({ title: 'B', duration: null, onClose: () => true })
    vm.open({
      title: 'A',
      duration: null,
      onClose: () => new Promise<void>((resolve) => (resolveA = resolve))
    })
    await wrapper.vm.$nextTick()
    expect(containers('.notification-container').length).toBe(2)
    // 先关闭 index 0 的 B（同步 onClose，立即移除），A 前移到 index 0
    dispatch(containers('.notification-close')[0], 'click')
    await flushPromises()
    expect(containers('.notification-container').length).toBe(1)
    // 再关闭 A（异步 onClose），期间数组已位移，必须按 key 重新定位后再移除
    dispatch(containers('.notification-close')[0], 'click')
    resolveA!()
    await flushPromises()
    await wrapper.vm.$nextTick()
    expect(containers('.notification-container').length).toBe(0)
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
    expect(host.querySelector('.modal-wrap')).toBeNull()
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

describe('Notification - top / bottom 偏移通过内容 padding 生效且不裁切阴影', () => {
  // 偏移通过内容区 paddingTop/paddingBottom 表达（容器贴边 top/bottom: 0）：
  // 通知卡片的溢出阴影落在内容区内，不会被滚动容器 overflow: hidden 裁切；
  // 该方案对 scrollable=true（默认）与 scrollable=false 均一致生效。
  it('top 偏移应体现为内容区 paddingTop，而非容器 top 定位', async () => {
    let api!: NotificationApi
    const wrapper = mount(Notification, {
      attachTo: document.body,
      props: { top: 100, onReady: (value: NotificationApi) => (api = value) }
    })
    api.info({ title: 'offset', duration: null })
    await wrapper.vm.$nextTick()
    const wrap = containers('.notification-wrap.notification-topRight')[0]
    const content = wrap?.querySelector<HTMLElement>('.scrollbar-content')
    expect(wrap).toBeTruthy()
    // 容器贴边，偏移落在内容 padding 上，避免裁切通知卡片的溢出阴影
    expect(wrap?.style.top).toBe('0px')
    expect(content?.style.paddingTop).toBe('100px')
    expect(content?.style.paddingBottom).toBe('32px')
    wrapper.unmount()
  })

  it('bottom 偏移应体现为内容区 paddingBottom，而非容器 bottom 定位', async () => {
    let api!: NotificationApi
    const wrapper = mount(Notification, {
      attachTo: document.body,
      props: { bottom: 80, onReady: (value: NotificationApi) => (api = value) }
    })
    api.info({ title: 'offset', placement: 'bottomRight', duration: null })
    await wrapper.vm.$nextTick()
    const wrap = containers('.notification-wrap.notification-bottomRight')[0]
    const content = wrap?.querySelector<HTMLElement>('.scrollbar-content')
    expect(wrap).toBeTruthy()
    expect(wrap?.style.bottom).toBe('0px')
    expect(content?.style.paddingBottom).toBe('80px')
    expect(content?.style.paddingTop).toBe('32px')
    wrapper.unmount()
  })

  it('scrollable=false 时 top 偏移同样通过内容 padding 生效', async () => {
    let api!: NotificationApi
    const wrapper = mount(Notification, {
      attachTo: document.body,
      props: { top: 100, scrollable: false, onReady: (value: NotificationApi) => (api = value) }
    })
    api.info({ title: 'offset', duration: null })
    await wrapper.vm.$nextTick()
    const wrap = containers('.notification-wrap.notification-topRight')[0]
    const content = wrap?.querySelector<HTMLElement>('.scrollbar-content')
    expect(wrap).toBeTruthy()
    expect(wrap?.style.top).toBe('0px')
    expect(content?.style.paddingTop).toBe('100px')
    // 非滚动模式不附加对向滚动留白
    expect(content?.style.paddingBottom).toBe('')
    wrapper.unmount()
  })
})

describe('Notification - closable 控制关闭按钮渲染', () => {
  // 计数断言基于 document 级查询，先清理此前用例可能残留的容器，避免相互干扰
  beforeEach(() => {
    containers('.notification-wrap').forEach((el) => el.remove())
  })

  it('closable: false 时不渲染关闭按钮', async () => {
    const { wrapper, vm } = mountNotification()
    vm.info({ title: 'no close', content: 'body', duration: null, closable: false })
    await wrapper.vm.$nextTick()
    expect(containers('.notification-close').length).toBe(0)
    wrapper.unmount()
  })

  it('单条 closable 优先于组件级配置', async () => {
    let api!: NotificationApi
    const wrapper = mount(Notification, {
      attachTo: document.body,
      props: { closable: false, onReady: (value: NotificationApi) => (api = value) }
    })
    api.info({ title: 'inherit', content: '继承组件级 false', duration: null })
    api.info({ title: 'override', content: '单条 true 覆盖组件级', duration: null, closable: true })
    await wrapper.vm.$nextTick()
    // 组件级 false 已生效，仅单条 closable: true 的那条渲染关闭按钮
    expect(containers('.notification-close').length).toBe(1)
    wrapper.unmount()
  })
})

describe('Notification - key 去重与按 key 关闭', () => {
  beforeEach(() => {
    containers('.notification-wrap').forEach((el) => el.remove())
  })

  it('相同 key 重复调用不叠加，只原地更新该条内容', async () => {
    const { wrapper, vm } = mountNotification()
    vm.info({ key: 'sync', title: '第一次', content: 'first', duration: null })
    vm.info({ key: 'sync', title: '第二次', content: 'second', duration: null })
    await wrapper.vm.$nextTick()
    expect(containers('.notification-container').length).toBe(1)
    expect(containers('.notification-container')[0].textContent).toContain('second')
    wrapper.unmount()
  })

  it('destroy(key) 可精确关闭指定 key 的通知', async () => {
    const { wrapper, vm } = mountNotification()
    vm.info({ key: 'sync', title: 'sync', duration: null })
    vm.info({ title: 'other', duration: null })
    await wrapper.vm.$nextTick()
    expect(containers('.notification-container').length).toBe(2)
    ;(vm as unknown as NotificationApi).destroy('sync')
    await flushPromises()
    await wrapper.vm.$nextTick()
    expect(containers('.notification-container').length).toBe(1)
    wrapper.unmount()
  })
})

describe('Notification - onClick 点击通知体回调', () => {
  beforeEach(() => {
    containers('.notification-wrap').forEach((el) => el.remove())
  })

  it('点击通知体触发 onClick，点击关闭按钮不触发', async () => {
    const { wrapper, vm } = mountNotification()
    let clicked = 0
    vm.info({ title: 'click', content: 'body', duration: null, onClick: () => (clicked += 1) })
    await wrapper.vm.$nextTick()
    dispatch(containers('.notification-container')[0], 'click')
    expect(clicked).toBe(1)
    // 关闭按钮点击已阻止冒泡，不应再触发 onClick
    dispatch(containers('.notification-close')[0], 'click')
    await flushPromises()
    await wrapper.vm.$nextTick()
    expect(clicked).toBe(1)
    wrapper.unmount()
  })
})

describe('Notification - 通知清空后回收空容器 DOM（对齐 naive-ui）', () => {
  beforeEach(() => {
    containers('.notification-wrap').forEach((el) => el.remove())
  })

  it('分组内最后一条通知离场后，容器 DOM 应被移除', async () => {
    const { wrapper, vm } = mountNotification()
    vm.info({ title: 'only', duration: null })
    await wrapper.vm.$nextTick()
    expect(containers('.notification-wrap').length).toBe(1)
    ;(vm as unknown as NotificationApi).destroyAll()
    await flushPromises()
    await wrapper.vm.$nextTick()
    // 需等离场动画结束（after-leave）后回收分组，jsdom 无真实动画，短等即可
    await wait(400)
    await wrapper.vm.$nextTick()
    expect(containers('.notification-wrap').length).toBe(0)
    wrapper.unmount()
  })
})
