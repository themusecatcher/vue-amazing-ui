<script setup lang="ts">
import type { VNode } from 'vue'

/**
 * 标签页（组件式用法）
 *
 * 只承载「这一页叫什么、是否禁用、内容是什么」的配置描述，导航栏、指示条与面板容器统一由 `Tabs`
 * 渲染，因此自身不产出任何 DOM。
 */
export interface Props {
  tab?: string // 页签显示文字
  disabled?: boolean // 是否禁用页签
  closable?: boolean // 是否展示关闭按钮，点击后由 `Tabs` 抛出 `close` 事件
  displayDirective?: 'if' | 'show' | 'show:lazy' // 面板内容渲染口径：非激活时立即卸载 | 保留 | 首次激活后保留
}
// 声明组件插槽类型
export interface TabPaneSlots {
  default?: () => VNode[] // 标签页内容
  tab?: () => VNode[] // 自定义页签显示内容（图标 + 文字等富内容）
}

defineProps<Props>()
defineSlots<TabPaneSlots>()
</script>

<template>
  <!-- 数据标记组件：Tabs 从插槽 vnode 中读取标签页数据并自行渲染，本组件自身不产出任何 DOM -->
  <slot v-if="false" />
</template>
