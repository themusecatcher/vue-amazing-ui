<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { requestAnimationFrame } from '../index'

interface Props {
  countdown: number, // 倒计时数值（countdown），必传，支持设置未来某时刻的时间戳(ms) 或 相对剩余时间(ms)
  title?: string, // 倒计时标题 string | v-slot
  format?: string, // 格式化倒计时展示，(Y：年，M：月，D：日，H：时，m：分钟，s：秒)
  prefix?: string, // 倒计时数值的前缀 string | v-slot
  suffix?: string, // 倒计时数值的后缀 string | v-slot
  finishedText?: string // 完成后的展示文本 string | v-slot
}
const props = withDefaults(defineProps<Props>(), { // 基于类型的声明
  countdown: 0,
  title: 'Countdown',
  format: 'HH:mm:ss',
  prefix: '',
  suffix: '',
  finishedText: ''
})
const futureTime = ref() // 未来某时刻
const restTime = ref() // 剩余时间
const millisecond = computed(() => { // 显示毫秒值
  return props.format.includes('SSS')
})

function fixedTwo (value: number): string {
  return value < 10 ? '0' + value : String(value)
}
function timeFormat (time: number): string {
  let showTime = props.format
  if (millisecond) {
    var S = time % 1000
    showTime = showTime.replace('SSS', String(S))
  }
  if (showTime.includes('s')) {
    time = Math.floor(time / 1000)
    var s = time
  } else {
    var s = 0
  }
  if (showTime.includes('m')) {
    s = s % 60
    var m = Math.floor((time - s) / 60)
  } else {
    var m = 0
  }
  if (showTime.includes('H')) {
    m = m % 60
    var H = Math.floor((time - s - m * 60) / 60 / 60)
  } else {
    var H = 0
  }
  if (showTime.includes('D')) {
    H = H % 24
    var D = Math.floor((time - s - m * 60 - H * 60 * 60) / 60 / 60 / 24)
  } else {
    var D = 0
  }
  if (showTime.includes('M')) {
    D = D % 30
    var M = Math.floor((time - s - m * 60 - H * 60 * 60 - D * 24 * 60 * 60) / 60 / 60 / 24 / 30)
  } else {
    var M = 0
  }
  if (showTime.includes('Y')) {
    M = M % 12
    var Y = Math.floor((time - s - m * 60 - H * 60 * 60 - D * 24 * 60 * 60 - M * 30 * 24 * 60 * 60) / 60 / 60 / 24 / 30 / 12)
  } else {
    var Y = 0
  }
  showTime = showTime.includes('ss') ? showTime.replace('ss', fixedTwo(s)) : showTime.replace('s', String(s))
  showTime = showTime.includes('mm') ? showTime.replace('mm', fixedTwo(m)) : showTime.replace('m', String(m))
  showTime = showTime.includes('HH') ? showTime.replace('HH', fixedTwo(H)) : showTime.replace('H', String(H))
  showTime = showTime.includes('DD') ? showTime.replace('DD', fixedTwo(D)) : showTime.replace('D', String(D))
  showTime = showTime.includes('MM') ? showTime.replace('MM', fixedTwo(M)) : showTime.replace('M', String(M))
  showTime = showTime.includes('YY') ? showTime.replace('YY', fixedTwo(Y)) : showTime.replace('Y', String(Y))
  return showTime
}
const emit = defineEmits(['finish'])
function CountDown () {
  if (futureTime.value > Date.now()) {
    restTime.value = futureTime.value - Date.now()
    requestAnimationFrame(CountDown)
  } else {
    restTime.value = 0
    emit('finish')
  }
}
onMounted(() => {
  if (props.countdown > Date.now()) { // 未来某时刻的时间戳，单位ms
    futureTime.value = props.countdown
  } else { // 相对剩余时间，单位ms
    futureTime.value = props.countdown + Date.now()
  }
  requestAnimationFrame(CountDown)
})
</script>
<template>
  <div class="m-countdown">
    <div class="u-title">
      <slot name="title">{{ props.title }}</slot>
    </div>
    <div class="u-time">
      <slot name="prefix" v-if="restTime > 0">{{ prefix }}</slot>
      <slot v-if="finishedText && restTime === 0" name="finish">{{ finishedText }}</slot>
      <span v-else>{{ timeFormat(restTime) }}</span>
      <slot name="suffix" v-if="restTime > 0">{{ suffix }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-countdown {
  display: inline-block;
  .u-title {
    margin-bottom: 4px;
    color: #00000073;
    font-size: 14px;
  }
  .u-time {
    color: #000000d9;
    font-size: 24px;
    line-height: 1.5;
  }
}
</style>
