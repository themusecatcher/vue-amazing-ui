<script setup lang="ts">
import { computed } from 'vue'
import type { VNode } from 'vue'
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
// 声明组件插槽类型
export interface GradientTextSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  gradient: undefined,
  size: 14,
  weight: 400,
  type: 'primary'
})
defineSlots<GradientTextSlots>()
/**
 * 预设渐变的两端 → 主题变量
 *
 * 起点取语义色的描边档（浅色为最浅一档，暗色比常态更深，形成「深 → 亮」的渐变），
 * 终点取常态档。两端都是 `var(--va-*)`，因此换种子与切模式都整体跟随，
 * 不再把旧的浅色板写死在组件里。
 */
const TYPE_GRADIENT = {
  primary: {
    from: 'var(--va-cp-gradient-text-primary-border-color, var(--va-primary-border-color))',
    to: 'var(--va-cp-gradient-text-primary-color, var(--va-primary-color))'
  },
  info: { from: 'var(--va-info-border-color)', to: 'var(--va-info-color)' },
  success: { from: 'var(--va-success-border-color)', to: 'var(--va-success-color)' },
  warning: { from: 'var(--va-warning-border-color)', to: 'var(--va-warning-color)' },
  error: { from: 'var(--va-error-border-color)', to: 'var(--va-error-color)' }
} as const
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
    return TYPE_GRADIENT[props.type].from
  }
})
const colorEnd = computed(() => {
  if (typeof props.gradient === 'object') {
    return props.gradient.to
  } else {
    return TYPE_GRADIENT[props.type].to
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
    class="gradient-text-wrap"
    :style="[
      `--gradient-text-rotate: ${rotate}; --gradient-text-color-start: ${colorStart}; --gradient-text-color-end: ${colorEnd}; --gradient-text-font-size: ${fontSize}; --gradient-text-font-weight: ${weight};`,
      gradientText
    ]"
  >
    <slot></slot>
  </span>
</template>
<style lang="less" scoped>
.gradient-text-wrap {
  display: inline-block;
  font-size: var(--gradient-text-font-size);
  font-weight: var(--gradient-text-font-weight);
  line-height: 1.5714285714285714;
  -webkit-background-clip: text;
  background-clip: text;
  color: #0000;
  white-space: nowrap;
  background-image: linear-gradient(
    var(--gradient-text-rotate),
    var(--gradient-text-color-start) 0%,
    var(--gradient-text-color-end) 100%
  );
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
