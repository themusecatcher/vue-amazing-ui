import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Message from 'components/message/Message.vue'
import type { MessageApi, MessageOptions } from 'components/message'

/**
 * Message 为 Teleport 到 body 的浮层：wrapper.find* 无法定位传送出去的节点，
 * 统一改为 document 级查询；命令式方法经 `ready` 事件回传的 api 获取。
 */
function mountMessage(attrs: Record<string, unknown> = {}) {
  const apiHolder: { api?: MessageApi } = {}
  const wrapper = mount(Message, {
    attachTo: document.body,
    props: {
      onReady: (value: MessageApi) => {
        apiHolder.api = value
      }
    },
    attrs
  })
  return { wrapper, api: apiHolder.api as unknown as { open: (o: MessageOptions) => void } }
}

describe('Message 属性透传', () => {
  // 回归守护：根节点是 Teleport 时 Vue 无法自动继承 attrs，会丢弃 class / style 并告警
  it('组件级 class / style 透传到消息容器 .message-wrap', async () => {
    const { wrapper } = mountMessage({ class: 'custom-class', style: 'color: red;' })
    await flushPromises()
    const wrap = document.body.querySelector<HTMLElement>('.message-wrap')
    expect(wrap?.classList.contains('custom-class')).toBe(true)
    expect(wrap?.getAttribute('style')).toContain('color: red')
    wrapper.unmount()
  })

  it('单条配置项的 class / style 落到该条消息自己的容器上', async () => {
    const { wrapper, api } = mountMessage()
    await flushPromises()
    api.open({ content: 'a', duration: null, class: 'per-message', style: { color: 'red' } })
    await flushPromises()
    const container = document.body.querySelector<HTMLElement>('.message-container')
    expect(container?.classList.contains('per-message')).toBe(true)
    expect(container?.getAttribute('style')).toContain('color: red')
    wrapper.unmount()
  })
})
