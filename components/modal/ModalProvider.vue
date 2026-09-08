<script setup lang="ts">
import { provide } from 'vue'
import Modal from './Modal.vue'
import { modalApiKey } from './useModal'
import type { ModalApi } from './useModal'

// 透传属性给内部实例，使 <ModalProvider :width="600"> 等声明式配置继续生效
defineOptions({ inheritAttrs: false })

// 占位实现：子组件挂载完成前的调用直接报错，避免静默失效
function notReady(method: string): never {
  throw new Error(`[ModalProvider] Modal 尚未挂载，无法调用 ${method}`)
}
// 子组件就绪后用真实实现就地覆盖，外部持有的是同一引用
const api: ModalApi = {
  info: () => notReady('info'),
  success: () => notReady('success'),
  error: () => notReady('error'),
  warning: () => notReady('warning'),
  confirm: () => notReady('confirm'),
  erase: () => notReady('erase'),
  create: () => notReady('create'),
  destroyAll: () => notReady('destroyAll')
}
provide(modalApiKey, api)
function onReady(real: ModalApi): void {
  Object.assign(api, real)
}
</script>
<template>
  <slot></slot>
  <Modal v-bind="$attrs" @ready="onReady" />
</template>
