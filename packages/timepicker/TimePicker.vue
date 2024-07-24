<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
enum ColorStyle { // 颜色主题对象
  blue = '#1677ff',
  green = '#52c41a',
  red = '#ff4d4f',
  gray = '#00000040'
}
interface Data {
  desc: string // 文字描述 string | slot
  color?: string // 圆圈颜色，可选四种预置颜色：blue | green | red | gray 或者 使用颜色值，默认值 blue
}
interface Props {
  timelineData: Data[] // 时间轴内容数组
  width?: number | string // 时间轴区域总宽度，单位px
  lineStyle?: 'solid' | 'dashed' | 'dotted' // 时间线样式
  mode?: 'left' | 'center' | 'right' // 通过设置 mode 可以改变时间轴和内容的相对位置
  position?: 'left' | 'right' // 当 mode 为 center 时，内容交替展现，内容从左边（left）开始或者右边（right）开始展现
}
const props = withDefaults(defineProps<Props>(), {
  timelineData: () => [],
  width: '100%',
  lineStyle: 'solid',
  mode: 'left',
  position: 'left'
})
</script>
<template>
  <div class="m-timepicker"> </div>
</template>
<style lang="less" scoped>
.m-timepicker {
}
</style>
