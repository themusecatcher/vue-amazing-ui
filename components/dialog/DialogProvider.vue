<script setup lang="ts">
import { provide } from 'vue'
import Dialog from './Dialog.vue'
import { dialogApiKey } from './useDialog'
import type { DialogApi } from './useDialog'

// 透传属性给内部实例，使 <DialogProvider :width="600"> 等声明式配置继续生效
defineOptions({ inheritAttrs: false })

// 占位实现：子组件挂载完成前的调用直接报错，避免静默失效
function notReady(method: string): never {
  throw new Error(`[DialogProvider] Dialog 尚未挂载，无法调用 ${method}`)
}
// 子组件就绪后用真实实现就地覆盖，外部持有的是同一引用
const api: DialogApi = {
  open: () => notReady('open'),
  destroyAll: () => notReady('destroyAll')
}
provide(dialogApiKey, api)
function onReady(real: DialogApi): void {
  Object.assign(api, real)
}
</script>
<template>
  <slot></slot>
  <Dialog v-bind="$attrs" @ready="onReady" />
</template>
