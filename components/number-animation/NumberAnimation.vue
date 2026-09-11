<script setup lang="ts">
import { ref, computed, onMounted, onScopeDispose, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { formatNumber } from 'components/utils'
import { transition, TransitionPresets } from '@vueuse/core'
import type { CubicBezierPoints, EasingFunction } from '@vueuse/core'
// 缓动预设名，派生自 @vueuse/core 的 TransitionPresets，随上游自动同步
// 预设 / 缓动函数 / 贝塞尔控制点 / transition 文档：https://vueuse.org/core/useTransition/
export type EasingPreset = keyof typeof TransitionPresets
export interface Props {
  from?: number // 数值动画起始数值
  to?: number // 数值目标值
  duration?: number // 数值动画持续时间，单位 ms
  autoplay?: boolean // 是否自动开始动画（由 false 变为 true 时重新播放）
  precision?: number // 精度，保留小数点后几位
  prefix?: string // 前缀
  suffix?: string // 后缀
  separator?: string // 千分位分隔符
  decimal?: string // 小数点字符
  valueStyle?: CSSProperties // 数值文本样式
  easing?: EasingPreset | CubicBezierPoints | EasingFunction // 动画缓动曲线
}
const props = withDefaults(defineProps<Props>(), {
  from: 0,
  to: 1000,
  duration: 3000,
  autoplay: true,
  precision: 0,
  prefix: undefined,
  suffix: undefined,
  separator: ',',
  decimal: '.',
  valueStyle: () => ({}),
  easing: 'easeInOutCubic'
})
const emits = defineEmits(['started', 'finished'])
const displayedValue = ref(props.from)
let animating = false
let currentId = 0
function animate(from: number = props.from, to: number = props.to) {
  const id = ++currentId
  displayedValue.value = from
  if (from === to) {
    animating = false
    return
  }
  animating = true
  emits('started')
  const { duration, easing } = props
  // 字符串形式的预置名需自行查表，vueuse 仅解析缓动函数与贝塞尔控制点
  // https://vueuse.org/core/useTransition/#usage
  const resolvedEasing = typeof easing === 'string' ? TransitionPresets[easing] : easing
  transition(displayedValue, from, to, {
    duration,
    easing: resolvedEasing,
    abort: () => id !== currentId
  }).then(() => {
    if (id !== currentId) {
      return
    }
    displayedValue.value = to
    animating = false
    emits('finished')
  })
}
function play() {
  if (animating) {
    return
  }
  animate()
}
watch(
  () => props.autoplay,
  (autoplay) => {
    if (autoplay) {
      animate()
    }
  }
)
watch([() => props.from, () => props.to], () => {
  if (props.autoplay) {
    animate()
  }
})
onMounted(() => {
  if (props.autoplay) {
    animate()
  }
})
onScopeDispose(() => {
  currentId++
})
const showValue = computed(() => {
  const { precision, separator, decimal, prefix, suffix } = props
  return formatNumber(displayedValue.value, precision, separator, decimal, prefix, suffix)
})
defineExpose({
  play
})
</script>
<template>
  <span :style="valueStyle">
    {{ showValue }}
  </span>
</template>
