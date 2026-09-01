import { inject } from 'vue'
import type { InjectionKey } from 'vue'
import type { Message, MessageReactive } from './Message.vue'

export interface MessageApi {
  open(message: string | Message): MessageReactive
  info(message: string | Message): MessageReactive
  success(message: string | Message): MessageReactive
  error(message: string | Message): MessageReactive
  warning(message: string | Message): MessageReactive
  loading(message: string | Message): MessageReactive
  destroyAll(): void
}

export const messageApiKey: InjectionKey<MessageApi> = Symbol('messageApi')

/**
 * 在 `setup` 内获取 Message api，需在 `<MessageProvider>` 内部使用。
 * 脱离组件树的场景请改用 `createDiscreteApi`。
 */
export function useMessage(): MessageApi {
  const api = inject(messageApiKey, null)
  if (!api) {
    throw new Error('[useMessage] 未获取到 Message api，请在 <MessageProvider> 内部使用，或改用 createDiscreteApi')
  }
  return api
}
