<script setup lang="ts">
import type { VNode } from 'vue'

export interface Props {
  value?: string | number // 选项值
  label?: string // 选项文本，未提供时取默认插槽内容
  disabled?: boolean // 是否禁用该选项，默认 false
  [propName: string]: unknown // 允许携带任意自定义字段，会原样透传给 #option 插槽
}
// 声明组件插槽类型
export interface SelectOptionSlots {
  default?: () => VNode[] // 选项文本
}

defineProps<Props>()
defineSlots<SelectOptionSlots>()
</script>

<template>
  <!-- 数据标记组件：Select 从插槽 vnode 中读取选项数据并自行渲染，本组件自身不产出任何 DOM -->
  <slot v-if="false" />
</template>
