<script setup lang="ts">
import type { VNode } from 'vue'

/**
 * 菜单项（组件式用法）
 *
 * 只承载「这一项是什么」的配置描述，层级缩进、选中态、收起态兜底与悬浮提示统一由 `Menu` 渲染，
 * 因此自身不产出任何 DOM。
 */
export interface Props {
  title?: string // 收起时展示的悬浮标题
  disabled?: boolean // 是否禁用
  danger?: boolean // 是否展示错误状态样式
}
// 声明组件插槽类型
export interface MenuItemSlots {
  default?: () => VNode[] // 菜单项标题
  icon?: () => VNode[] // 菜单图标
  title?: () => VNode[] // 收起时展示的悬浮标题
}

defineProps<Props>()
defineSlots<MenuItemSlots>()
</script>

<template>
  <!-- 数据标记组件：Menu 从插槽 vnode 中读取菜单项数据并自行渲染，本组件自身不产出任何 DOM -->
  <slot v-if="false" />
</template>
