<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { formatNumber } from '../utils'
import { useTransition, TransitionPresets } from '@vueuse/core'
enum TransitionFunc {
  linear = 'linear',
  easeOutSine = 'easeOutSine',
  easeInOutSine = 'easeInOutSine',
  easeInQuad = 'easeInQuad',
  easeOutQuad = 'easeOutQuad',
  easeInOutQuad = 'easeInOutQuad',
  easeInCubic = 'easeInCubic',
  easeOutCubic = 'easeOutCubic',
  easeInOutCubic = 'easeInOutCubic',
  easeInQuart = 'easeInQuart',
  easeOutQuart = 'easeOutQuart',
  easeInOutQuart = 'easeInOutQuart',
  easeInQuint = 'easeInQuint',
  easeOutQuint = 'easeOutQuint',
  easeInOutQuint = 'easeInOutQuint',
  easeInExpo = 'easeInExpo',
  easeOutExpo = 'easeOutExpo',
  easeInOutExpo = 'easeInOutExpo',
  easeInCirc = 'easeInCirc',
  easeOutCirc = 'easeOutCirc',
  easeInOutCirc = 'easeInOutCirc',
  easeInBack = 'easeInBack',
  easeOutBack = 'easeOutBack',
  easeInOutBack = 'easeInOutBack'
}
interface Props {
  from?: number // 数值动画起始数值
  to?: number // 数值目标值
  duration?: number // 数值动画持续时间，单位 ms
  autoplay?: boolean // 是否自动开始动画
  precision?: number // 精度，保留小数点后几位
  prefix?: string // 前缀
  suffix?: string // 后缀
  separator?: string // 千分位分隔符
  decimal?: string // 小数点字符
  valueStyle?: CSSProperties // 数值文本样式
  transition?: TransitionFunc // 动画过渡效果
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
  transition: TransitionFunc['easeInOutCubic']
})
const source = ref(props.from)
const emits = defineEmits(['started', 'finished'])
watchEffect(() => {
  source.value = props.from
})
watch(
  () => [props.from, props.to],
  () => {
    if (props.autoplay) {
      play()
    }
  },
  {
    deep: true
  }
)
onMounted(() => {
  props.autoplay && play()
})
const outputValue = useTransition(source, {
  duration: props.duration,
  transition: TransitionPresets[props.transition],
  onFinished: () => emits('finished'),
  onStarted: () => emits('started')
})
function play() {
  source.value = props.to
}
const showValue = computed(() => {
  const { precision, separator, decimal, prefix, suffix } = props
  return formatNumber(outputValue.value, precision, separator, decimal, prefix, suffix)
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
