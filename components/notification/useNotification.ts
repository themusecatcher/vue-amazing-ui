import { inject } from 'vue'
import type { InjectionKey } from 'vue'
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

export const notificationApiKey: InjectionKey<NotificationApi> = Symbol('notificationApi')

/**
 * 在 `setup` 内获取 Notification api，需在 `<NotificationProvider>` 内部使用。
 * 脱离组件树的场景请改用 `createDiscreteApi`。
 */
export function useNotification(): NotificationApi {
  const api = inject(notificationApiKey, null)
  if (!api) {
    throw new Error(
      '[useNotification] 未获取到 Notification api，请在 <NotificationProvider> 内部使用，或改用 createDiscreteApi'
    )
  }
  return api
}
