<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CSSProperties, VNode, Slot } from 'vue'
import { rafTimeout, cancelRaf } from 'components/utils'
export interface Item {
  label?: string // 菜单标题
  icon?: VNode // 菜单图标
  title?: string // 设置收缩时展示的悬浮标题
  key?: string | number // 菜单唯一标识
  children?: Item[] // 子菜单的菜单项
  disabled?: boolean // 是否禁用
  onTitleClick?: Function // 点击子菜单标题的回调函数
}
export interface Props {
  inlineCollapsed?: boolean // inline 时菜单是否收起状态
  inlineIndent?: number // inline 模式的菜单缩进宽度，单位 px
  items?: Item[] // 菜单目录
  mode?: 'vertical' | 'horizontal' | 'inline' // 菜单类型，支持垂直、水平和内嵌三种模式
  openKeys?: (string | number)[] // (v-model) 当前展开的 SubMenu 菜单项 key 数组
  overflowedIndicator?: VNode | Slot // 用于自定义 Menu 水平空间不足时的省略收缩的图标
  selectable?: boolean // 是否允许选中
  selectedKeys?: (string | number)[] // (v-model) 当前选中的菜单项 key 数组
  theme?: 'light' | 'dark' // 主题颜色
  triggerSubMenuAction?: 'click' | 'hover' // 触发子菜单展开的行为，支持点击和悬停
}
const props = withDefaults(defineProps<Props>(), {
  inlineCollapsed: undefined,
  inlineIndent: 24,
  items: () => [],
  mode: 'vertical',
  openKeys: () => [],
  overflowedIndicator: undefined,
  selectable: true,
  selectedKeys: () => [],
  theme: 'light',
  triggerSubMenuAction: 'click'
})
const emits = defineEmits(['update:openKeys', 'update:selectedKeys', 'click', 'select', 'openChange'])
</script>
<template>
  <div class="m-menu"> </div>
</template>
<style lang="less" scoped>
.m-menu {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  outline: none;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
}
</style>
