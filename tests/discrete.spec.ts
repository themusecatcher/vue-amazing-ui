import { describe, it, expect } from 'vitest'
import { computed, defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { createDiscreteApi } from 'components/discrete'
import { MessageProvider, useMessage } from 'components/message'
import { getColorPalettes } from 'components/utils'

/**
 * S4 双入口 D+ 用例：
 * 1. createDiscreteApi 可脱离组件树调用（对应 axios 拦截器 / 路由守卫场景）
 * 2. 主题通过 options.configProviderProps 显式传入（支持 Ref / computed 响应式），不依赖模块级全局快照
 * 3. useXxx() 在 XxxProvider 内部可用
 */
describe('S4 - createDiscreteApi 可在任意位置调用', () => {
  it('setup 外调用 notification / message / modal 均可正常弹出', async () => {
    const { notification, message, modal, dispose } = createDiscreteApi(['notification', 'message', 'modal'])
    notification.info({ title: '离散通知', duration: null })
    message.info({ content: '离散消息', duration: null })
    modal.info({ content: '离散弹窗' })
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(document.querySelector('.notification-container')).not.toBeNull()
    expect(document.querySelector('.message-container')).not.toBeNull()
    expect(document.querySelector('.modal-container')).not.toBeNull()
    dispose()
  })
})

describe('S4 - createDiscreteApi 支持 dispose 销毁独立实例', () => {
  it('dispose 后消息容器应从 DOM 移除', async () => {
    const api = createDiscreteApi(['message'])
    api.message.info({ content: '待销毁', duration: null })
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(document.querySelector('.message-container')).not.toBeNull()

    api.dispose()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(document.querySelector('.message-container')).toBeNull()
  })

  it('重复调用 dispose 不应抛错', () => {
    const api = createDiscreteApi(['message'])
    api.dispose()
    expect(() => api.dispose()).not.toThrow()
  })
})

describe('S4 - createDiscreteApi 主题通过 configProviderProps 显式传入', () => {
  it('configProviderProps.theme 生效：消息容器主题色 CSS 变量跟随传入主题', async () => {
    const { message, dispose } = createDiscreteApi(['message'], {
      configProviderProps: {
        theme: { common: { primaryColor: '#ff0000' } }
      }
    })
    message.info({ content: '主题消息', duration: null })
    await new Promise((resolve) => setTimeout(resolve, 50))

    const wrap = document.querySelector('.message-wrap') as HTMLElement
    expect(wrap).not.toBeNull()
    // 组件经 useInject 取色，调色板第 6 档（index 5）写入容器主题色变量
    expect(wrap.getAttribute('style')).toContain(`--message-primary-color: ${getColorPalettes('#ff0000')[5]}`)
    dispose()
  })

  it('configProviderProps 支持 computed 响应式：主题变化后按新主题渲染', async () => {
    const primaryColor = ref<string>('#1677ff')
    // configProviderProps 本身作为 computed，根渲染读取其值以建立响应式依赖
    const configProviderProps = computed(() => ({
      theme: { common: { primaryColor: primaryColor.value } }
    }))
    const { message, dispose } = createDiscreteApi(['message'], { configProviderProps })
    message.info({ content: '默认主题', duration: null })
    await new Promise((resolve) => setTimeout(resolve, 50))
    const defaultWrap = document.querySelector('.message-wrap') as HTMLElement
    expect(defaultWrap.getAttribute('style')).toContain(`--message-primary-color: ${getColorPalettes('#1677ff')[5]}`)

    primaryColor.value = '#ff6900'
    await new Promise((resolve) => setTimeout(resolve, 50))
    message.info({ content: '切换主题', duration: null })
    await new Promise((resolve) => setTimeout(resolve, 50))
    const wrap = document.querySelector('.message-wrap') as HTMLElement
    expect(wrap.getAttribute('style')).toContain(`--message-primary-color: ${getColorPalettes('#ff6900')[5]}`)
    dispose()
  })
})

describe('S4 - createDiscreteApi 支持透传各 Provider props', () => {
  it('messageProviderProps 透传到内部消息容器（如 top）', async () => {
    const { message, dispose } = createDiscreteApi(['message'], {
      messageProviderProps: { top: 66 }
    })
    message.info({ content: '顶部 66', duration: null })
    await new Promise((resolve) => setTimeout(resolve, 50))

    const wrap = document.querySelector('.message-wrap') as HTMLElement
    expect(wrap).not.toBeNull()
    expect(wrap.getAttribute('style')).toContain('top: 66px')
    dispose()
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

describe('S4 - createDiscreteApi 支持 dialog', () => {
  it('setup 外调用 dialog.open 可弹出对话框，dispose 后应从 DOM 移除', async () => {
    const { dialog, dispose } = createDiscreteApi(['dialog'])
    dialog.open({ title: '离散弹窗', content: '脱离组件树调用' })
    await new Promise((resolve) => setTimeout(resolve, 50))

    const dialogEl = document.querySelector('[role="dialog"]')
    expect(dialogEl).not.toBeNull()
    expect(dialogEl?.textContent).toContain('脱离组件树调用')

    dispose()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(document.querySelector('.dialog-container')).toBeNull()
  })
})
