<script setup lang="ts">
import { Comment, computed, defineComponent, useSlots } from 'vue'
import type { PropType, VNode } from 'vue'
export interface Props {
  width?: string | number // 区域总宽度，单位 px
  align?: 'stretch' | 'start' | 'end' | 'center' | 'baseline' // 垂直排列方式
  vertical?: boolean // 是否为垂直布局
  gap?: number | number[] | 'small' | 'middle' | 'large' // 间距大小，数组时表示: [水平间距, 垂直间距]
  wrap?: boolean // 是否自动换行，仅在未开启 vertical 时有效
}
// 声明组件插槽类型
export interface SpaceSlots {
  default?: () => VNode[] // 间距内容
  split?: () => VNode[] // 相邻内容的间隔元素
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  align: 'start',
  vertical: false,
  gap: 'middle',
  wrap: true
})
defineSlots<SpaceSlots>()
const spaceWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const gapValue = computed(() => {
  if (typeof props.gap === 'number') {
    return `${props.gap}px`
  }
  if (Array.isArray(props.gap)) {
    return `${props.gap[1]}px ${props.gap[0]}px`
  }
  if (['small', 'middle', 'large'].includes(props.gap)) {
    const gapMap = {
      small: '8px',
      middle: '16px',
      large: '24px'
    }
    return gapMap[props.gap]
  }
})
// 承载 vnode 列表的中间组件：render 直接返回数组（等价于 Fragment），不产生包裹元素
const SpaceContent = defineComponent({
  name: 'SpaceContent',
  props: {
    content: { type: Array as PropType<VNode[]> }
  },
  setup: (contentProps) => () => contentProps.content
})
const slots: SpaceSlots = useSlots()
// 无内容的节点（`v-if` 假分支的注释、纯空白文本）不参与排列，否则会多出一份间隔
function isRenderable(node: VNode): boolean {
  if (node.type === Comment) {
    return false
  }
  return !(typeof node.children === 'string' && node.children.trim() === '')
}
// 渲染序列：内容之间插入分隔符。每个间隔重新求值插槽，避免同一 vnode 被多位置复用；
// 插槽在 computed 内求值以保留依赖收集，分隔符内容随外部状态更新
const contentNodes = computed<VNode[]>(() => {
  const children = (slots.default?.() ?? []).filter(isRenderable)
  const splitSlot = slots.split
  if (children.length < 2 || !splitSlot) {
    return children
  }
  const nodes: VNode[] = []
  children.forEach((child, index) => {
    if (index > 0) {
      nodes.push(...splitSlot())
    }
    nodes.push(child)
  })
  return nodes
})
</script>
<template>
  <div
    class="space-wrap"
    :class="[`space-${align}`, { 'space-vertical': vertical, 'space-flex-wrap': wrap }]"
    :style="`width: ${spaceWidth}; gap: ${gapValue};`"
  >
    <SpaceContent :content="contentNodes" />
  </div>
</template>
<style lang="less" scoped>
.space-wrap {
  display: inline-flex;
  font-size: 14px;
  color: var(--va-text-color-1);
  transition: all 0.3s;
  &:empty {
    display: none;
  }
}
.space-vertical {
  flex-direction: column;
}
.space-stretch {
  align-items: stretch;
}
.space-start {
  align-items: flex-start;
}
.space-end {
  align-items: flex-end;
}
.space-center {
  align-items: center;
}
.space-baseline {
  align-items: baseline;
}
.space-flex-wrap {
  flex-wrap: wrap;
}
</style>
