import { createApp, defineComponent, h, provide, unref } from 'vue'
import { skipThemeWriteKey } from 'components/config-provider/context'
import type { Ref } from 'vue'
import ConfigProvider from 'components/config-provider'
import type { ConfigProviderProps } from 'components/config-provider'
import { NotificationProvider, useNotification } from 'components/notification'
import type { NotificationApi, NotificationProps } from 'components/notification'
import { MessageProvider, useMessage } from 'components/message'
import type { MessageApi, MessageProps } from 'components/message'
import { ModalProvider, useModal } from 'components/modal'
import type { ModalApi, ModalProps } from 'components/modal'
import { DialogProvider, useDialog } from 'components/dialog'
import type { DialogApi, DialogProps } from 'components/dialog'
import { LoadingBarProvider, useLoadingBar } from 'components/loading-bar'
import type { LoadingBarApi, LoadingBarProps } from 'components/loading-bar'

type DiscreteApiType = 'notification' | 'message' | 'modal' | 'dialog' | 'loadingBar'

type MaybeRef<T> = Ref<T> | T

interface DiscreteApi {
  notification: NotificationApi
  message: MessageApi
  modal: ModalApi
  dialog: DialogApi
  loadingBar: LoadingBarApi
}

/**
 * createDiscreteApi 选项，离散 API 形态
 *
 * 主题有两条路径，二者都不写 `<html>`：
 * - 不传 `configProviderProps`：浮层的 CSS 变量从 `<html>` 继承，跟随主应用主题；
 * - 传 `configProviderProps.theme`：浮层根节点内联该作用域的令牌与 `data-va-mode`，
 *   外观由这份主题决定（可独立换肤），与主应用写到 `<html>` 的主题互不影响；
 *   由于根节点在渲染函数中读取该值，传入 `Ref` / `computed` 即可获得响应式跟随。
 * - 各 `XxxProviderProps` 透传给离散实例内部挂载的对应 Provider，
 *   例如 `messageProviderProps: { top: 60 }` 可配置消息容器位置。
 */
export interface DiscreteApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  messageProviderProps?: MaybeRef<MessageProps>
  dialogProviderProps?: MaybeRef<DialogProps>
  notificationProviderProps?: MaybeRef<NotificationProps>
  modalProviderProps?: MaybeRef<ModalProps>
  loadingBarProviderProps?: MaybeRef<LoadingBarProps>
}

// 调用方可按需销毁独立实例
export type DiscreteApiInstance<K extends DiscreteApiType> = Pick<DiscreteApi, K> & {
  dispose: () => void
}

const providerMap = {
  notification: NotificationProvider,
  message: MessageProvider,
  modal: ModalProvider,
  dialog: DialogProvider,
  loadingBar: LoadingBarProvider
} as const

const hookMap = {
  notification: useNotification,
  message: useMessage,
  modal: useModal,
  dialog: useDialog,
  loadingBar: useLoadingBar
} as const

/**
 * 创建脱离组件树上下文的命令式 api，可在 axios 拦截器、路由守卫、Pinia action 等任意位置调用。
 *
 * 实现要点：建立独立的 Vue 应用实例，内部依次包裹 `ConfigProvider` 与各 `XxxProvider`，
 * 再在每个 Provider 内部渲染一个「提取器」组件，于其 `setup` 中调用 `useXxx()` 把 api 取出到外部。
 *
 * 主题不依赖任何模块级全局状态，完全由调用方通过 `configProviderProps` 显式传入：
 * 根节点渲染函数中读取该值（`unref`），故传 `Ref` / `computed` 时主题变化会触发独立实例重渲染。
 */
export function createDiscreteApi<K extends DiscreteApiType>(
  types: K[],
  options: DiscreteApiOptions = {}
): DiscreteApiInstance<K> {
  const {
    configProviderProps,
    messageProviderProps,
    dialogProviderProps,
    notificationProviderProps,
    modalProviderProps,
    loadingBarProviderProps
  } = options
  const apis: Record<DiscreteApiType, unknown> = {
    notification: null,
    message: null,
    modal: null,
    dialog: null,
    loadingBar: null
  }
  const providerPropsMap: Record<DiscreteApiType, MaybeRef<object> | undefined> = {
    notification: notificationProviderProps,
    message: messageProviderProps,
    modal: modalProviderProps,
    dialog: dialogProviderProps,
    loadingBar: loadingBarProviderProps
  }
  // 提取器：在 Provider 内部的 setup 中取 api，渲染为空
  // ⚠️ 必须经 hookMap[type]()（即 useMessage() / useLoadingBar() 等）沿「组件实例链」取，
  // 不能用裸 inject()：在 app.runWithContext() 上下文（如 vue-router 导航守卫）中，
  // inject() 会改道去翻宿主 app 的 app 级 provides，取不到 Provider 的组件级 provide
  // （原因详见 utils 的 injectFromChain）
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
    return h(providerMap[type], unref(providerPropsMap[type] ?? {}), {
      default: () => [h(extractors[index]), buildProviders(index + 1)]
    })
  }
  const container = document.createElement('div')
  document.body.appendChild(container)
  const app = createApp({
    setup() {
      // 离散实例不参与「主题变量写入 <html>」：避免覆盖主应用写入的值，并在 dispose 时误清除
      provide(skipThemeWriteKey, true)
      return () =>
        // 显式传 abstract: true：离散实例不写 <html>（见上方 SKIP），也不需要额外包裹节点；
        // 传了 configProviderProps.theme 时，其浮层由边界转发拿到该作用域的令牌。调用方显式传入时以调用方为准
        h(
          ConfigProvider,
          { abstract: true, ...unref(configProviderProps ?? {}) },
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
