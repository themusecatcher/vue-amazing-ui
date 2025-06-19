<script setup lang="ts">
import { computed } from 'vue'
export interface Gradient {
  from: string
  to: string
  deg?: number | string // 渐变角度，默认 252，单位 deg
}
export interface Props {
  gradient?: string | Gradient // 文字渐变色参数
  size?: number | string // 文字大小，不指定单位时，默认单位 px
  weight?: number // 文字粗细
  type?: 'primary' | 'info' | 'success' | 'warning' | 'error' // 渐变文字的类型
}
const props = withDefaults(defineProps<Props>(), {
  gradient: undefined,
  size: 14,
  weight: 400,
  type: 'primary'
})
enum TypeStartColor {
  primary = 'rgba(22, 199, 255, 0.6)',
  info = 'rgba(22, 199, 255, 0.6)',
  success = 'rgba(82, 196, 26, 0.6)',
  warning = 'rgba(250, 173, 20, 0.6)',
  error = 'rgba(255, 77, 79, 0.6)'
}
enum TypeEndColor {
  primary = '#1677ff',
  info = '#1677ff',
  success = '#52c41a',
  warning = '#faad14',
  error = '#ff4d4f'
}
const gradientText = computed(() => {
  if (typeof props.gradient === 'string') {
    return {
      backgroundImage: props.gradient
    }
  }
  return {}
})
const rotate = computed(() => {
  if (typeof props.gradient === 'object' && props.gradient.deg) {
    return isNumber(props.gradient.deg) ? `${props.gradient.deg}deg` : props.gradient.deg
  }
  return '252deg'
})
const colorStart = computed(() => {
  if (typeof props.gradient === 'object') {
    return props.gradient.from
  } else {
    return TypeStartColor[props.type]
  }
})
const colorEnd = computed(() => {
  if (typeof props.gradient === 'object') {
    return props.gradient.to
  } else {
    return TypeEndColor[props.type]
  }
})
const fontSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})
function isNumber(value: string | number): boolean {
  return typeof value === 'number'
}
</script>
<template>
  <span
    class="m-gradient-text"
    :style="[
      `--rotate: ${rotate}; --color-start: ${colorStart}; --color-end: ${colorEnd}; --font-size: ${fontSize}; --font-weight: ${weight};`,
      gradientText
    ]"
  >
    <slot></slot>
  </span>
</template>
<style lang="less" scoped>
.m-gradient-text {
  display: inline-block;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: 1.5714285714285714;
  -webkit-background-clip: text;
  background-clip: text;
  color: #0000;
  white-space: nowrap;
  background-image: linear-gradient(var(--rotate), var(--color-start) 0%, var(--color-end) 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
