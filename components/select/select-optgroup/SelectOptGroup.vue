<script setup lang="ts">
import type { VNode } from 'vue'

export interface Props {
  label?: string // 分组标题文本，未提供时取 #label 插槽内容
}
// 声明组件插槽类型
export interface SelectOptGroupSlots {
  label?: () => VNode[] // 分组标题
  default?: () => VNode[] // 分组内的选项
}

defineProps<Props>()
defineSlots<SelectOptGroupSlots>()
</script>

<template>
  <!-- 数据标记组件：Select 从插槽 vnode 中读取分组与选项数据并自行渲染，本组件自身不产出任何 DOM -->
  <slot v-if="false" />
</template>
