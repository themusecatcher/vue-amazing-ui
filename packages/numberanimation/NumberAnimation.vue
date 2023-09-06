<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, watch } from 'vue'
import type { CSSProperties } from 'vue'
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
  duration?: number // 数值动画持续时间，单位ms
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
  prefix: '',
  suffix: '',
  separator: ',',
  decimal: '.',
  valueStyle: () => ({}),
  transition: TransitionFunc['easeInOutCubic']
})
const source = ref(props.from)
watchEffect(() => {
  source.value = props.from
})
watch(
  [() => props.from, () => props.to],
  () => {
    if (props.autoplay) {
      play()
    }
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
function play () {
  source.value = props.to
}
const showValue = computed(() => formatNumber(outputValue.value))
function isNumber (val: any) {
  return Object.prototype.toString.call(val) === '[object Number]'
}
const emits = defineEmits(['started', 'finished'])
function formatNumber (num: number | string) {
  const { precision, decimal, separator, suffix, prefix } = props
  if (num === 0) {
    return num.toFixed(precision)
  }
  if (!num) {
    return ''
  }
  num = Number(num).toFixed(precision)
  num += ''

  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''

  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}
defineExpose({
  play
})
</script>
<template>
  <span :style="valueStyle">
    {{ showValue }}
  </span>
</template>
