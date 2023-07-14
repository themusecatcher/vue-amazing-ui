<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
interface Responsive {
  xs?: number // <576px
  sm?: number // ≥576px
  md?: number // ≥768px
  lg?: number // ≥992px
  xl?: number // ≥1200px
  xxl?: number // ≥1600px
}
interface Props {
  // 推荐使用 (16+8n)px 作为栅格间隔(n 是自然数：0,1,2,3...)
  gutter?: number|[number|Responsive, number|Responsive]|Responsive // 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]
  wrap?: boolean // 是否自动换行
}
const props = withDefaults(defineProps<Props>(), {
  gutter: 0,
  wrap: false
})
const xGap = computed(() => {
  if (typeof props.gutter === 'number') {
    return props.gutter
  }
  if (Array.isArray(props.gutter)) {
    if (typeof props.gutter[0] === 'object') {
      if (clientWidth.value >= 1600 && props.gutter[0].xxl) {
        return props.gutter[0].xxl
      }
      if (clientWidth.value >= 1200 && props.gutter[0].xl) {
        return props.gutter[0].xl
      }
      if (clientWidth.value >= 992 && props.gutter[0].lg) {
        return props.gutter[0].lg
      }
      if (clientWidth.value >= 768 && props.gutter[0].md) {
        return props.gutter[0].md
      }
      if (clientWidth.value >= 576 && props.gutter[0].sm) {
        return props.gutter[0].sm
      }
      if (clientWidth.value < 576 && props.gutter[0].xs) {
        return props.gutter[0].xs
      }
    }
    return props.gutter[0]
  }
  if (typeof props.gutter === 'object') {
    if (clientWidth.value >= 1600 && props.gutter.xxl) {
      return props.gutter.xxl
    }
    if (clientWidth.value >= 1200 && props.gutter.xl) {
      return props.gutter.xl
    }
    if (clientWidth.value >= 992 && props.gutter.lg) {
      return props.gutter.lg
    }
    if (clientWidth.value >= 768 && props.gutter.md) {
      return props.gutter.md
    }
    if (clientWidth.value >= 576 && props.gutter.sm) {
      return props.gutter.sm
    }
    if (clientWidth.value < 576 && props.gutter.xs) {
      return props.gutter.xs
    }
  }
  return 0
})
const yGap = computed(() => {
  if (Array.isArray(props.gutter)) {
    if (typeof props.gutter[1] === 'object') {
      if (clientWidth.value >= 1600 && props.gutter[1].xxl) {
        return props.gutter[1].xxl
      }
      if (clientWidth.value >= 1200 && props.gutter[1].xl) {
        return props.gutter[1].xl
      }
      if (clientWidth.value >= 992 && props.gutter[1].lg) {
        return props.gutter[1].lg
      }
      if (clientWidth.value >= 768 && props.gutter[1].md) {
        return props.gutter[1].md
      }
      if (clientWidth.value >= 576 && props.gutter[1].sm) {
        return props.gutter[1].sm
      }
      if (clientWidth.value < 576 && props.gutter[1].xs) {
        return props.gutter[1].xs
      }
    }
    return props.gutter[1]
  }
  return 0
})
const clientWidth = ref(document.documentElement.clientWidth)
const clientHeight = ref(document.documentElement.clientHeight)
onMounted(() => {
  window.addEventListener('resize', getBrowserSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', getBrowserSize)
})
function getBrowserSize () {
  // document.documentElement返回<html>元素
  clientWidth.value = document.documentElement.clientWidth
  clientHeight.value = document.documentElement.clientHeight
}
</script>
<template>
  <div class="m-row" :class="{'gutter-row': gutter}" :style="`--xGap: ${(xGap as number) / 2}px; margin-left: -${(xGap as number) / 2}px; margin-right: -${(xGap as number) / 2}px; row-gap: ${yGap}px;`">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-row {
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  transition: all .3s;
}
</style>
