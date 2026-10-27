import type { InjectionKey } from 'vue'
import { injectFromChain } from 'components/utils'
import type { NotificationOptions, NotificationReactive } from './Notification.vue'

export interface NotificationApi {
  open(options: NotificationOptions): NotificationReactive
  info(options: NotificationOptions): NotificationReactive
  success(options: NotificationOptions): NotificationReactive
  error(options: NotificationOptions): NotificationReactive
  warning(options: NotificationOptions): NotificationReactive
  destroy(key: string): void
  destroyAll(): void
}

/**
 * 通知命令式 api 的注入键
 *
 * - 提供方：`NotificationProvider`
 * - 消费方：`useNotification`
 * - 响应式：否（api 对象为稳定引用）
 * - 未命中：`undefined`，`useNotification` 抛错提示改用 `createDiscreteApi`
 */
export const notificationApiKey: InjectionKey<NotificationApi> = Symbol('vaNotificationApi')

/**
 * 在 `setup` 内获取 Notification api，需在 `<NotificationProvider>` 内部使用。
 * 脱离组件树的场景请改用 `createDiscreteApi`。
 */
export function useNotification(): NotificationApi {
  const api = injectFromChain(notificationApiKey)
  if (!api) {
    throw new Error(
      '[useNotification] 未获取到 Notification api，请在 <NotificationProvider> 内部使用，或改用 createDiscreteApi'
    )
  }
  return api
}
