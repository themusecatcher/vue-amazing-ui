<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEventListener } from 'components/utils'
export interface Responsive {
  xs?: number // <576px 响应式栅格
  sm?: number // ≥576px 响应式栅格
  md?: number // ≥768px 响应式栅格
  lg?: number // ≥992px 响应式栅格
  xl?: number // ≥1200px 响应式栅格
  xxl?: number // ≥1600px 响应式栅格
}
export interface Props {
  width?: string | number // 行宽度，单位 px
  // 推荐使用 (16+8n)px 作为栅格间隔(n 是自然数：0,1,2,3...)
  gutter?: number | [number | Responsive, number | Responsive] | Responsive // 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]
  wrap?: boolean // 是否自动换行
  align?: 'top' | 'middle' | 'bottom' | 'stretch' // 垂直对齐方式
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly' // 水平排列方式
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  gutter: 0,
  wrap: false,
  align: 'top',
  justify: 'start'
})
const alignProperties = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch'
}
const viewportWidth = ref(window.innerWidth)
const xGap = computed(() => {
  if (typeof props.gutter === 'number') {
    return props.gutter
  }
  if (Array.isArray(props.gutter)) {
    if (typeof props.gutter[0] === 'object') {
      return getResponsiveGap(props.gutter[0])
    }
    return props.gutter[0]
  }
  if (typeof props.gutter === 'object') {
    return getResponsiveGap(props.gutter)
  }
  return 0
})
const yGap = computed(() => {
  if (Array.isArray(props.gutter)) {
    if (typeof props.gutter[1] === 'object') {
      return getResponsiveGap(props.gutter[1])
    }
    return props.gutter[1]
  }
  return 0
})
const rowWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
useEventListener(window, 'resize', getViewportWidth)
function getViewportWidth() {
  viewportWidth.value = window.innerWidth
}
function getResponsiveGap(gutter: Responsive) {
  if (viewportWidth.value >= 1600 && gutter.xxl !== undefined) {
    return gutter.xxl
  }
  if (viewportWidth.value >= 1200 && gutter.xl !== undefined) {
    return gutter.xl
  }
  if (viewportWidth.value >= 992 && gutter.lg !== undefined) {
    return gutter.lg
  }
  if (viewportWidth.value >= 768 && gutter.md !== undefined) {
    return gutter.md
  }
  if (viewportWidth.value >= 576 && gutter.sm !== undefined) {
    return gutter.sm
  }
  if (viewportWidth.value < 576 && gutter.xs !== undefined) {
    return gutter.xs
  }
  return 0
}
</script>
<template>
  <div
    class="m-grid-row"
    :class="{ 'gutter-row': gutter }"
    :style="`--xGap: ${(xGap as number) / 2}px; --justify: ${justify}; --align: ${alignProperties[align]}; width: ${rowWidth}; margin-left: -${(xGap as number) / 2}px; margin-right: -${(xGap as number) / 2}px; row-gap: ${yGap}px;`"
  >
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-grid-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: var(--justify);
  align-items: var(--align);
  min-width: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  transition: all 0.3s;
}
</style>
