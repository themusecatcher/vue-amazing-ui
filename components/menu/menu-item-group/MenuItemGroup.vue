<script setup lang="ts">
import type { VNode } from 'vue'

/**
 * 菜单分组（组件式用法）
 *
 * 只承载配置描述，渲染统一由 `Menu` 完成；默认插槽内的子节点须为 `MenuItem`。
 */
export interface Props {
  title?: string // 分组标题
}
// 声明组件插槽类型
export interface MenuItemGroupSlots {
  default?: () => VNode[] // 分组的菜单项
  title?: () => VNode[] // 分组标题
}

defineProps<Props>()
defineSlots<MenuItemGroupSlots>()
</script>

<template>
  <!-- 数据标记组件：Menu 从插槽 vnode 中读取分组数据并自行渲染，本组件自身不产出任何 DOM -->
  <slot v-if="false" />
</template>
