<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  width?: string | number // 区域总宽度
  align?: 'stretch' | 'start' | 'end' | 'center' | 'baseline' // 垂直排列方式
  direction?: 'horizontal' | 'vertical' // 间距方向
  gap?: number | number[] | 'small' | 'middle' | 'large' // 间距大小，数组时表示: [水平间距, 垂直间距]
  wrap?: boolean // 是否自动换行，仅在 horizontal 时有效
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  align: 'start',
  direction: 'horizontal',
  gap: 'small',
  wrap: true
})
const spaceWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const gapValue = computed(() => {
  if (typeof props.gap === 'number') {
    return props.gap + 'px'
  }
  if (Array.isArray(props.gap)) {
    return props.gap[1] + 'px ' + props.gap[0] + 'px '
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
  <div
    class="m-space"
    :class="[`space-${direction} space-${align}`, { 'space-wrap': wrap }]"
    :style="`width: ${spaceWidth}; gap: ${gapValue}; margin-bottom: -${Array.isArray(props.gap) && wrap ? props.gap[1] : 0}px;`"
  >
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-space {
  display: inline-flex;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  transition: all 0.3s;
}
.space-horizontal {
  flex-direction: row;
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
.space-wrap {
  flex-wrap: wrap;
}
</style>
