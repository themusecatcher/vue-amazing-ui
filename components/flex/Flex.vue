<script setup lang="ts">
import { computed } from 'vue'
import type { Component, VNode } from 'vue'
export interface Props {
  width?: string | number // 弹性区域总宽度，单位 px
  flex?: string | number // 容器自身作为 flex 子项时的伸缩简写，如 '1' / '0 0 auto'
  vertical?: boolean // flex 主轴的方向是否垂直，vertical 使用 flex-direction: column
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' // 设置元素单行显示还是多行显示；参考 flex-wrap
  justify?: string // 设置元素在主轴方向上的对齐方式；参考 justify-content
  align?: string // 设置元素在交叉轴方向上的对齐方式；参考 align-items
  gap?: number | number[] | 'small' | 'middle' | 'large' // 设置网格之间的间隙，数组时表示: [水平间距, 垂直间距]
  component?: string | Component // 渲染的标签名或组件，用于语义化布局
}
// 声明组件插槽类型
export interface FlexSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  flex: undefined,
  vertical: false,
  wrap: 'nowrap',
  justify: 'normal',
  align: 'normal',
  gap: 'middle',
  component: 'div'
})
defineSlots<FlexSlots>()
const flexWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
// 数值即 flex-grow 简写（无单位），字符串原样透传（如 '0 0 auto'）
const flexShorthand = computed(() => {
  if (props.flex === undefined) {
    return ''
  }
  return `flex: ${props.flex};`
})
const gapValue = computed(() => {
  if (props.gap === undefined) {
    return 0
  }
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
</script>
<template>
  <component
    :is="component"
    class="flex-wrap"
    :class="{ 'flex-vertical': vertical }"
    :style="`
      width: ${flexWidth};
      gap: ${gapValue};
      ${flexShorthand}
      --flex-wrap: ${wrap};
      --flex-justify: ${justify};
      --flex-align: ${align};
    `"
  >
    <slot></slot>
  </component>
</template>
<style lang="less" scoped>
.flex-wrap {
  display: flex;
  flex-wrap: var(--flex-wrap);
  justify-content: var(--flex-justify);
  align-items: var(--flex-align);
  font-size: 14px;
  color: var(--va-text-color-1);
  transition: all 0.3s;
  &:empty {
    display: none;
  }
}
.flex-vertical {
  flex-direction: column;
}
</style>
