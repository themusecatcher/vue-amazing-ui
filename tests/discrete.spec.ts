import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createDiscreteApi } from 'components/discrete'
import ConfigProvider from 'components/config-provider'
import { MessageProvider, useMessage } from 'components/message'
import { themeSnapshot } from 'components/_internal/theme-snapshot'

/**
 * S4 双入口 D+ 用例：
 * 1. createDiscreteApi 可脱离组件树调用（对应 axios 拦截器 / 路由守卫场景）
 * 2. 主题快照由 ConfigProvider 自动写入，使用方无需手工构造
 * 3. useXxx() 在 XxxProvider 内部可用
 */
describe('S4 - createDiscreteApi 可在任意位置调用', () => {
  it('setup 外调用 notification / message / modal 均可正常弹出', async () => {
    const { notification, message, modal } = createDiscreteApi(['notification', 'message', 'modal'])
    notification.info({ title: '离散通知', duration: null })
    message.info({ content: '离散消息', duration: null })
    modal.info({ content: '离散弹窗' })
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(document.querySelector('.notification-container')).not.toBeNull()
    expect(document.querySelector('.message-container')).not.toBeNull()
    expect(document.querySelector('.modal-container')).not.toBeNull()
  })
})

describe('S4 - 主题快照由 ConfigProvider 自动写入', () => {
  it('ConfigProvider 挂载后 themeSnapshot 应同步其主题', async () => {
    const wrapper = mount(ConfigProvider, {
      props: {
        theme: {
          common: { primaryColor: '#ff0000' },
          Message: { primaryColor: '#00ff00' }
        }
      }
    })
    await wrapper.vm.$nextTick()

    expect(themeSnapshot.value.common?.primaryColor).toBe('#ff0000')
    expect(themeSnapshot.value.Message?.primaryColor).toBe('#00ff00')
    wrapper.unmount()
  })
})

describe('S4 - useXxx 在 Provider 内部可用', () => {
  it('useMessage 在 MessageProvider 内可取到 api 并弹出消息', async () => {
    let api: ReturnType<typeof useMessage> | null = null
    const Child = defineComponent({
      setup() {
        api = useMessage()
        return () => null
      }
    })
    const wrapper = mount(MessageProvider, {
      slots: { default: () => h(Child) },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()

    expect(api).not.toBeNull()
    api!.info({ content: '来自 Provider 的消息', duration: null })
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('来自 Provider 的消息')
    wrapper.unmount()
  })
})
