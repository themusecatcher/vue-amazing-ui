<script setup lang="ts">
import { provide } from 'vue'
import Notification from './Notification.vue'
import { notificationApiKey } from './useNotification'
import type { NotificationApi } from './useNotification'

// 透传属性给内部实例，使 <NotificationProvider :duration="6000"> 等声明式配置继续生效
defineOptions({ inheritAttrs: false })

// 占位实现：子组件挂载完成前的调用直接报错，避免静默失效
function notReady(method: string): never {
  throw new Error(`[NotificationProvider] Notification 尚未挂载，无法调用 ${method}`)
}
// 子组件就绪后用真实实现就地覆盖，外部持有的是同一引用
const api: NotificationApi = {
  open: () => notReady('open'),
  info: () => notReady('info'),
  success: () => notReady('success'),
  error: () => notReady('error'),
  warning: () => notReady('warning'),
  destroy: () => notReady('destroy'),
  destroyAll: () => notReady('destroyAll')
}
provide(notificationApiKey, api)
function onReady(real: NotificationApi): void {
  Object.assign(api, real)
}
</script>
<template>
  <slot></slot>
  <Notification v-bind="$attrs" @ready="onReady" />
</template>
