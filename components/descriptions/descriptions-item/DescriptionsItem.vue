<script setup lang="ts">
import type { CSSProperties, VNode } from 'vue'
export interface Props {
  label?: string | number | VNode // 内容的描述标签
  span?: number // 包含列的数量；当使用水平列表且未设置 span 时等效于 span: 1，但最后一行的最后一项，会包含该行剩余的所有列数
  labelStyle?: CSSProperties // 自定义标签样式，优先级高于 Descriptions 的 labelStyle
  contentStyle?: CSSProperties // 自定义内容样式，优先级高于 Descriptions 的 contentStyle
  labelClass?: string // 标签自定义类名，与 Descriptions 的 labelClass 叠加
  contentClass?: string // 内容自定义类名，与 Descriptions 的 contentClass 叠加
}
// 声明组件插槽类型
export interface DescriptionsItemSlots {
  label?: () => VNode[]
  default?: () => VNode[]
}
withDefaults(defineProps<Props>(), {
  label: undefined,
  span: 1,
  labelStyle: undefined,
  contentStyle: undefined,
  labelClass: undefined,
  contentClass: undefined
})
defineSlots<DescriptionsItemSlots>()
// 本组件是 Descriptions 的纯数据载体：父组件读取其 props / slots 后自行渲染，组件自身不产出 DOM。
// 因此不声明根元素，需关闭属性继承以消除「非 props 属性无法透传」的告警；
// 单独使用时回退为渲染默认插槽，避免脱离 Descriptions 后内容丢失。
defineOptions({ inheritAttrs: false })
</script>
<template>
  <slot></slot>
</template>
