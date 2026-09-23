<script setup lang="ts">
import { provide } from 'vue'
import type { VNode } from 'vue'
import LoadingBar from './LoadingBar.vue'
import { loadingBarApiKey } from './useLoadingBar'
import type { LoadingBarApi } from './useLoadingBar'

// 声明组件插槽类型
export interface LoadingBarProviderSlots {
  default?: () => VNode[]
}
defineSlots<LoadingBarProviderSlots>()
// 透传属性给内部实例，使 <LoadingBarProvider :to="..." :loading-bar-style="..."> 等声明式配置继续生效
defineOptions({ inheritAttrs: false })

// 占位实现：子组件挂载完成前的调用直接报错，避免静默失效
function notReady(method: string): never {
  throw new Error(`[LoadingBarProvider] LoadingBar 尚未挂载，无法调用 ${method}`)
}
// 子组件就绪后用真实实现就地覆盖，外部持有的是同一引用
const api: LoadingBarApi = {
  start: () => notReady('start'),
  finish: () => notReady('finish'),
  error: () => notReady('error')
}
provide(loadingBarApiKey, api)
function onReady(real: LoadingBarApi): void {
  Object.assign(api, real)
}
</script>
<template>
  <slot></slot>
  <LoadingBar v-bind="$attrs" @ready="onReady" />
</template>
