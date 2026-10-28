import type { InjectionKey } from 'vue'
import { injectFromChain } from 'components/utils'
import type { MessageOptions, MessageReactive } from './Message.vue'

export interface MessageApi {
  open(message: string | MessageOptions): MessageReactive
  info(message: string | MessageOptions): MessageReactive
  success(message: string | MessageOptions): MessageReactive
  error(message: string | MessageOptions): MessageReactive
  warning(message: string | MessageOptions): MessageReactive
  loading(message: string | MessageOptions): MessageReactive
  destroyAll(): void
}

/**
 * 消息命令式 api 的注入键
 *
 * - 提供方：`MessageProvider`
 * - 消费方：`useMessage`
 * - 响应式：否（api 对象为稳定引用）
 * - 未命中：`undefined`，`useMessage` 抛错提示改用 `createDiscreteApi`
 */
export const messageApiKey: InjectionKey<MessageApi> = Symbol('vaMessageApi')

/**
 * 在 `setup` 内获取 Message api，需在 `<MessageProvider>` 内部使用。
 * 脱离组件树的场景请改用 `createDiscreteApi`。
 */
export function useMessage(): MessageApi {
  const api = injectFromChain(messageApiKey)
  if (!api) {
    throw new Error('[useMessage] 未获取到 Message api，请在 <MessageProvider> 内部使用，或改用 createDiscreteApi')
  }
  return api
}
