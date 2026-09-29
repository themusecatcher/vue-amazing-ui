<script setup lang="ts">
import type { VNode } from 'vue'
import type { MenuExpandIconInfo, MenuTheme, MenuTitleInfo } from '../interface'

/**
 * 子菜单（组件式用法）
 *
 * 只承载配置描述，渲染与展开收起统一由 `Menu` 完成；默认插槽内的子节点须为 `MenuItem` 或 `MenuSubMenu`。
 */
export interface Props {
  title?: string // 子菜单标题，收起态下同时作为悬浮标题
  theme?: MenuTheme // 子菜单主题，不传时继承 Menu 的 theme
  popupClassName?: string // 弹出子菜单的自定义类名，inline 模式下无效
  popupOffset?: [number, number] // 弹出子菜单与锚点的偏移，inline 模式下无效
  disabled?: boolean // 是否禁用
}
// 声明组件插槽类型
export interface MenuSubMenuSlots {
  default?: () => VNode[] // 子菜单的菜单项
  title?: () => VNode[] // 子菜单标题
  icon?: () => VNode[] // 菜单图标
  expandIcon?: (info: MenuExpandIconInfo) => VNode[] // 子菜单的展开收起图标，优先于 Menu 的 expandIcon
}

defineProps<Props>()
defineSlots<MenuSubMenuSlots>()
defineEmits<{
  titleClick: [info: MenuTitleInfo] // 点击子菜单标题时调用
}>()
</script>

<template>
  <!-- 数据标记组件：Menu 从插槽 vnode 中读取子菜单数据并自行渲染，本组件自身不产出任何 DOM -->
  <slot v-if="false" />
</template>
