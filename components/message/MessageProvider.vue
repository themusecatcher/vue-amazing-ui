<script setup lang="ts">
import { provide } from 'vue'
import Message from './Message.vue'
import { messageApiKey } from './useMessage'
import type { MessageApi } from './useMessage'

// 透传属性给内部实例，使 <MessageProvider :duration="6000"> 等声明式配置继续生效
defineOptions({ inheritAttrs: false })

// 占位实现：子组件挂载完成前的调用直接报错，避免静默失效
function notReady(method: string): never {
  throw new Error(`[MessageProvider] Message 尚未挂载，无法调用 ${method}`)
}
// 子组件就绪后用真实实现就地覆盖，外部持有的是同一引用
const api: MessageApi = {
  open: () => notReady('open'),
  info: () => notReady('info'),
  success: () => notReady('success'),
  error: () => notReady('error'),
  warning: () => notReady('warning'),
  loading: () => notReady('loading'),
  destroyAll: () => notReady('destroyAll')
}
provide(messageApiKey, api)
function onReady(real: MessageApi): void {
  Object.assign(api, real)
}
</script>
<template>
  <slot></slot>
  <Message v-bind="$attrs" @ready="onReady" />
</template>
