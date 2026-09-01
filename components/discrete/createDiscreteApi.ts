import { createApp, defineComponent, h } from 'vue'
import ConfigProvider from 'components/config-provider'
import { NotificationProvider, useNotification } from 'components/notification'
import type { NotificationApi } from 'components/notification'
import { MessageProvider, useMessage } from 'components/message'
import type { MessageApi } from 'components/message'
import { ModalProvider, useModal } from 'components/modal'
import type { ModalApi } from 'components/modal'
import { themeSnapshot } from 'components/_internal'

export type DiscreteApiType = 'notification' | 'message' | 'modal'

export interface DiscreteApi {
  notification: NotificationApi
  message: MessageApi
  modal: ModalApi
}

// 调用方可按需销毁独立实例
export type DiscreteApiInstance<K extends DiscreteApiType> = Pick<DiscreteApi, K> & {
  dispose: () => void
}

const providerMap = {
  notification: NotificationProvider,
  message: MessageProvider,
  modal: ModalProvider
} as const

const hookMap = {
  notification: useNotification,
  message: useMessage,
  modal: useModal
} as const

/**
 * 创建脱离组件树上下文的命令式 api，可在 axios 拦截器、路由守卫、Pinia action 等任意位置调用。
 *
 * 实现要点：建立独立的 Vue 应用实例，内部依次包裹 `ConfigProvider` 与各 `XxxProvider`，
 * 再在每个 Provider 内部渲染一个「提取器」组件，于其 `setup` 中调用 `useXxx()` 把 api 取出到外部。
 * 主题取自模块级主题快照，且快照在渲染函数中读取，故主应用主题变化后会跟随重渲染。
 */
export function createDiscreteApi<K extends DiscreteApiType>(types: K[]): DiscreteApiInstance<K> {
  const apis: Record<DiscreteApiType, unknown> = {
    notification: null,
    message: null,
    modal: null
  }
  // 提取器：在 Provider 内部的 setup 中取 api，渲染为空
  const extractors = types.map((type) =>
    defineComponent({
      setup() {
        apis[type] = hookMap[type]()
        return () => null
      }
    })
  )
  // 逐层嵌套各 Provider，使提取器均能注入到对应 api
  function buildProviders(index: number) {
    if (index >= types.length) {
      return null
    }
    const type = types[index]
    return h(providerMap[type], null, {
      default: () => [h(extractors[index]), buildProviders(index + 1)]
    })
  }
  const container = document.createElement('div')
  document.body.appendChild(container)
  const app = createApp({
    render() {
      return h(
        ConfigProvider,
        { abstract: true, theme: themeSnapshot.value },
        {
          default: () => buildProviders(0)
        }
      )
    }
  })
  app.mount(container)
  // 销毁实例：卸载独立应用并移除挂载容器；重复调用为空操作
  let disposed = false
  const dispose = (): void => {
    if (disposed) {
      return
    }
    disposed = true
    app.unmount()
    container.parentNode?.removeChild(container)
  }
  return {
    ...(apis as Pick<DiscreteApi, K>),
    dispose
  }
}
