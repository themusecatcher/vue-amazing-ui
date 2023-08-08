<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  width?: string|number // 区域总宽度
  align?: 'stretch'|'start'|'end'|'center'|'baseline' // 垂直排列方式
  direction?: 'horizontal'|'vertical' // 间距方向
  size?: number|number[]|'small'|'middle'|'large' // 间距大小，数组时表示: [水平间距, 垂直间距]
  wrap?: boolean // 是否自动换行，仅在 horizontal 时有效
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  align: 'start',
  direction: 'horizontal',
  size: 'small',
  wrap: true
})
const spaceWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const gap = computed(() => {
  if (typeof props.size === 'number') {
    return props.size + 'px'
  }
  if (Array.isArray(props.size)) {
    return props.size[1] + 'px ' + props.size[0] + 'px '
  }
  if (['small', 'middle', 'large'].includes(props.size)) {
    const gapMap = {
      small: '8px',
      middle: '16px',
      large: '24px'
    }
    return gapMap[props.size]
  }
})
</script>
<template>
  <div
    class="m-space"
    :class="[`${direction} ${align}`, {wrap: wrap}]"
    :style="`width: ${spaceWidth}; gap: ${gap}; margin-bottom: -${Array.isArray(props.size) && wrap ? props.size[1] : 0}px;`">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-space {
  display: inline-flex;
  font-size: 14px;
  color: rgba(0, 0, 0, .88);
  transition: all .3s;
}
.horizontal {
  flex-direction: row;
}
.vertical {
  flex-direction: column;
}
.stretch {
  align-items: stretch;
}
.start {
  align-items: flex-start;
}
.end {
  align-items: flex-end;
}
.center {
  align-items: center;
}
.baseline {
  align-items: baseline;
}
.wrap {
  flex-wrap: wrap;
}
</style>
