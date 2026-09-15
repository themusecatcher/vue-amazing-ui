import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Message from 'components/message'
import type { MessageApi } from 'components/message'
import Notification from 'components/notification'
import type { NotificationApi } from 'components/notification'
import Modal, { ModalProvider } from 'components/modal'
import type { ModalApi } from 'components/modal'
import Dialog, { DialogProvider } from 'components/dialog'
import type { DialogApi } from 'components/dialog'

/**
 * 内容渲染与实例 key 接线回归（Message / Notification / Modal / Dialog）
 *
 * 本轮两处抽取直接影响这四个组件的「内容是否显示得出来」：
 * 1. `renderContentToVNode`（utils/render.ts）接管 icon / title / content：
 *    Message / Notification 的 icon，以及 Modal / Dialog 的 title / content。
 *    接线一旦错位（如把渲染函数直接交给 `:is` 当函数式组件），表现为内容空白或反复重建；
 * 2. `createKeyGenerator`（utils/function.ts）接管四者的实例标识：
 *    key 若发生碰撞，`destroy(key)` / `close` 事件会误伤同毫秒内创建的其他实例。
 *
 * 既有用例已覆盖「渲染函数形态」（bugs.spec.ts P4）与「Modal icon 四形态」（modal-icon.spec.ts），
 * 此处补齐 icon 接线与 key 唯一性两条链路，形成闭环。
 */

let cleanup: (() => void) | null = null

afterEach(() => {
  cleanup?.()
  cleanup = null
  document.body.innerHTML = ''
})

function mountMessage(): MessageApi {
  let api!: MessageApi
  const wrapper = mount(Message, {
    attachTo: document.body,
    props: { onReady: (value: MessageApi) => (api = value) }
  })
  cleanup = () => wrapper.unmount()
  return api
}

function mountNotification(): NotificationApi {
  let api!: NotificationApi
  const wrapper = mount(Notification, {
    attachTo: document.body,
    props: { onReady: (value: NotificationApi) => (api = value) }
  })
  cleanup = () => wrapper.unmount()
  return api
}

describe('Message / Notification - icon 经 renderContentToVNode 接管后仍可渲染', () => {
  it('Message：icon 传 VNode 应渲染该节点并覆盖内置图标', async () => {
    const api = mountMessage()
    api.info({ content: 'VNode 图标', duration: null, icon: h('span', { class: 'msg-vnode-icon' }) })
    await nextTick()

    expect(document.querySelector('.msg-vnode-icon')).not.toBeNull()
    // 自定义 icon 存在时不应再渲染内置图标
    expect(document.querySelector('[data-icon="info-circle"]')).toBeNull()
  })

  it('Message：icon 传渲染函数应被调用一次并渲染其结果', async () => {
    const api = mountMessage()
    api.info({ content: '函数图标', duration: null, icon: () => h('span', { class: 'msg-fn-icon' }) })
    await nextTick()

    expect(document.querySelector('.msg-fn-icon')).not.toBeNull()
  })

  it('Notification：icon 传 VNode 与渲染函数均应渲染', async () => {
    const api = mountNotification()
    api.info({ title: 'VNode 图标', duration: null, icon: h('span', { class: 'notify-vnode-icon' }) })
    api.info({ title: '函数图标', duration: null, icon: () => h('span', { class: 'notify-fn-icon' }) })
    await nextTick()

    expect(document.querySelector('.notify-vnode-icon')).not.toBeNull()
    expect(document.querySelector('.notify-fn-icon')).not.toBeNull()
  })
})

describe('Modal / Dialog - title / content 经 renderContentToVNode 接管后仍可渲染', () => {
  it('Modal：title 与 content 的纯文本、渲染函数两种形态均可渲染', async () => {
    let api!: ModalApi
    const wrapper = mount(ModalProvider, {
      attrs: { onReady: (value: ModalApi) => (api = value) },
      attachTo: document.body
    })
    cleanup = () => wrapper.unmount()

    api.info({ title: '纯文本标题', content: '纯文本内容', onKnow: () => {} })
    api.info({
      title: () => h('span', { class: 'modal-fn-title' }, '函数标题'),
      content: () => h('span', { class: 'modal-fn-content' }, '函数内容'),
      onKnow: () => {}
    })
    await nextTick()

    expect(document.body.textContent).toContain('纯文本标题')
    expect(document.body.textContent).toContain('纯文本内容')
    expect(document.querySelector('.modal-fn-title')).not.toBeNull()
    expect(document.querySelector('.modal-fn-content')).not.toBeNull()
  })

  it('Dialog：title 与 content 传渲染函数时应渲染为对应节点', async () => {
    const wrapper = mount(Dialog, {
      props: {
        open: true,
        title: () => h('span', { class: 'dialog-fn-title' }, '函数标题'),
        content: () => h('span', { class: 'dialog-fn-content' }, '函数内容')
      }
    })
    cleanup = () => wrapper.unmount()
    await nextTick()

    expect(document.querySelector('.dialog-fn-title')).not.toBeNull()
    expect(document.querySelector('.dialog-fn-content')).not.toBeNull()
  })

  it('Dialog：title 与 content 传纯文本时应渲染为文本节点（不被当作组件名）', async () => {
    const wrapper = mount(Dialog, { props: { open: true, title: '文本标题', content: '文本内容' } })
    cleanup = () => wrapper.unmount()
    await nextTick()

    const dialogEl = document.body.querySelector('[role="dialog"]')
    expect(dialogEl?.textContent).toContain('文本标题')
    expect(dialogEl?.textContent).toContain('文本内容')
  })
})

describe('实例 key 经 createKeyGenerator 接管后互相唯一', () => {
  it('Message：同毫秒内创建的多条消息 key 互不相同', async () => {
    const api = mountMessage()
    const handles = [
      api.info({ content: '消息A', duration: null }),
      api.info({ content: '消息B', duration: null }),
      api.info({ content: '消息C', duration: null })
    ]
    await nextTick()

    const keys = handles.map((handle) => handle.key)
    expect(new Set(keys).size).toBe(3)
    // key 无碰撞时三条消息均应各自渲染
    expect(document.body.textContent).toContain('消息A')
    expect(document.body.textContent).toContain('消息B')
    expect(document.body.textContent).toContain('消息C')
  })

  it('Notification：同毫秒内创建的多条通知 key 互不相同', async () => {
    const api = mountNotification()
    const keys = [
      api.info({ title: 'A', duration: null }),
      api.info({ title: 'B', duration: null }),
      api.info({ title: 'C', duration: null })
    ].map((handle) => handle.key)
    await nextTick()

    expect(new Set(keys).size).toBe(3)
  })

  it('Notification：按 key 关闭只影响目标通知', async () => {
    const api = mountNotification()
    const first = api.info({ title: '第一条', duration: null })
    api.info({ title: '第二条', duration: null })
    await nextTick()

    first.destroy()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 300))

    const text = document.body.textContent ?? ''
    expect(text).not.toContain('第一条')
    expect(text).toContain('第二条')
  })
})
