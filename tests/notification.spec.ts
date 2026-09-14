import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Notification from 'components/notification/Notification.vue'
import type { NotificationApi, NotificationOptions } from 'components/notification'

/**
 * Notification 为 Teleport 到 body 的浮层：wrapper.find* 无法定位传送出去的节点，
 * 统一改为 document 级查询；命令式方法经 `ready` 事件回传的 api 获取。
 */
function mountNotification(attrs: Record<string, unknown> = {}) {
  const apiHolder: { api?: NotificationApi } = {}
  const wrapper = mount(Notification, {
    attachTo: document.body,
    props: {
      onReady: (value: NotificationApi) => {
        apiHolder.api = value
      }
    },
    attrs
  })
  return { wrapper, api: apiHolder.api as unknown as { open: (o: NotificationOptions) => void } }
}

describe('Notification 属性透传', () => {
  // 回归守护：根节点是 Teleport 时 Vue 无法自动继承 attrs，会丢弃 class / style 并告警；
  // 容器按弹出位置分组渲染，故类名会应用到每个位置的容器
  it('组件级 class / style 透传到每个弹出位置的通知容器 .notification-wrap', async () => {
    const { wrapper, api } = mountNotification({ class: 'custom-class', style: 'color: red;' })
    await flushPromises()
    api.open({ title: 'a', content: 'a', duration: null, placement: 'topRight' })
    api.open({ title: 'b', content: 'b', duration: null, placement: 'bottomLeft' })
    await flushPromises()
    const wraps = Array.from(document.querySelectorAll<HTMLElement>('.notification-wrap'))
    expect(wraps).toHaveLength(2)
    wraps.forEach((wrap) => {
      expect(wrap.classList.contains('custom-class')).toBe(true)
      expect(wrap.getAttribute('style')).toContain('color: red')
    })
    wrapper.unmount()
  })

  it('单条配置项的 class / style 落到该条通知自己的容器上', async () => {
    const { wrapper, api } = mountNotification()
    await flushPromises()
    api.open({ title: 'a', content: 'a', duration: null, class: 'per-notification', style: { color: 'red' } })
    await flushPromises()
    const container = document.body.querySelector<HTMLElement>('.notification-container')
    expect(container?.classList.contains('per-notification')).toBe(true)
    expect(container?.getAttribute('style')).toContain('color: red')
    wrapper.unmount()
  })
})
