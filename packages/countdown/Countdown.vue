<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { requestAnimationFrame } from '../index'
interface Props {
  title?: string // 倒计时标题 string | v-slot
  value?: number // 倒计时数值，支持设置未来某时刻的时间戳(ms) 或 相对剩余时间(ms)
  format?: string // 格式化倒计时展示，(Y：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒)
  prefix?: string // 倒计时数值的前缀 string | v-slot
  suffix?: string // 倒计时数值的后缀 string | v-slot
  titleStyle?: CSSProperties // 设置标题的样式
  valueStyle?: CSSProperties // 设置数值的样式
  finishedText?: string // 完成后的展示文本 string | v-slot
}
const props = withDefaults(defineProps<Props>(), { // 基于类型的声明
  title: 'Countdown',
  value: undefined,
  format: 'HH:mm:ss',
  prefix: '',
  suffix: '',
  titleStyle: () => ({}),
  valueStyle: () => ({}),
  finishedText: 'Finished'
})
const prefixRef = ref()
const suffixRef = ref()
const showPrefix = ref(1)
const showSuffix = ref(1)
onMounted(() => {
  showPrefix.value = prefixRef.value.offsetWidth
  showSuffix.value = suffixRef.value.offsetWidth
})
const futureTime = ref() // 未来截止时间戳
const restTime = ref() // 剩余时间戳
const showType = computed(() => {
  return {
    showMillisecond: props.format.includes('SSS'),
    showYear: props.format.includes('Y'),
    showMonth: props.format.includes('M'),
    showDay: props.format.includes('D'),
    showHour: props.format.includes('H'),
    showMinute: props.format.includes('m'),
    showSecond: props.format.includes('s')
  }
})
function fixedTwo (value: number): string {
  return value < 10 ? '0' + value : String(value)
}
function timeFormat (time: number|null): string {
  if (time === null) {
    return '--'
  }
  let showTime = props.format
  if (showType.value.showMillisecond) {
    var S = time % 1000
    showTime = showTime.replace('SSS', '0'.repeat(3 - String(S).length) + S)
  }
  time = Math.floor(time / 1000) // 将时间转为s为单位
  if (showType.value.showYear) {
    var Y = Math.floor(time / (60 * 60 * 24 * 30 * 12))
    showTime = showTime.includes('YY') ? showTime.replace('YY', fixedTwo(Y)) : showTime.replace('Y', String(Y))
  } else {
    var Y = 0
  }
  if (showType.value.showMonth) {
    time = time - Y * 60 * 60 * 24 * 30 * 12
    var M = Math.floor(time / (60 * 60 * 24 * 30))
    showTime = showTime.includes('MM') ? showTime.replace('MM', fixedTwo(M)) : showTime.replace('M', String(M))
  } else {
    var M = 0
  }
  if (showType.value.showDay) {
    time = time - M * 60 * 60 * 24 * 30
    var D = Math.floor(time / (60 * 60 * 24))
    showTime = showTime.includes('DD') ? showTime.replace('DD', fixedTwo(D)) : showTime.replace('D', String(D))
  } else {
    var D = 0
  }
  if (showType.value.showHour) {
    time = time - D * 60 * 60 * 24
    var H = Math.floor(time / (60 * 60))
    showTime = showTime.includes('HH') ? showTime.replace('HH', fixedTwo(H)) : showTime.replace('H', String(H))
  } else {
    var H = 0
  }
  if (showType.value.showMinute) {
    time = time - H * 60 * 60
    var m = Math.floor(time / 60)
    showTime = showTime.includes('mm') ? showTime.replace('mm', fixedTwo(m)) : showTime.replace('m', String(m))
  } else {
    var m = 0
  }
  if (showType.value.showSecond) {
    var s = time - m * 60
    showTime = showTime.includes('ss') ? showTime.replace('ss', fixedTwo(s)) : showTime.replace('s', String(s))
  }
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
watchEffect(() => {
  // 只有数值类型的值，且是有穷的（finite），才返回 true
  if (Number.isFinite(props.value)) { //检测传入的参数是否是一个有穷数
    if ((props.value as number) >= Date.now()) { // 未来某时刻的时间戳，单位ms
      futureTime.value = props.value
    } else { // 相对剩余时间，单位ms
      futureTime.value = (props.value as number) + Date.now()
    }
    requestAnimationFrame(CountDown)
  } else {
    restTime.value = null
  }
})
</script>
<template>
  <div class="m-countdown">
    <div class="u-title" :style="titleStyle">
      <slot name="title">{{ props.title }}</slot>
    </div>
    <div class="m-time">
      <template v-if="showPrefix">
        <span ref="prefixRef" class="u-prefix" v-if="showPrefix || restTime > 0 || restTime === null">
          <slot name="prefix">{{ prefix }}</slot>
        </span>
      </template>
      <span class="u-time-value" :style="valueStyle" v-if="finishedText && restTime === 0 && restTime !== null">
        <slot name="finish">{{ finishedText }}</slot>
      </span>
      <span class="u-time-value" :style="valueStyle" v-if="Number.isFinite(restTime) && restTime > 0">{{ timeFormat(restTime) }}</span>
      <template v-if="showSuffix">
        <span ref="suffixRef" class="u-suffix" v-if="showSuffix || restTime > 0 || restTime === null">
          <slot name="suffix">{{ suffix }}</slot>
        </span>
      </template>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-countdown {
  display: inline-block;
  line-height: 1.5714285714285714;
  .u-title {
    margin-bottom: 4px;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
  }
  .m-time {
    color: rgba(0, 0, 0, .88);
    font-size: 24px;
    font-family: 'Helvetica Neue'; // 保证数字等宽显示
    .u-prefix {
      display: inline-block;
      margin-inline-end: 4px;
    }
    .u-time-value {
      display: inline-block;
      direction: ltr;
    }
    .u-suffix {
      display: inline-block;
      margin-inline-start: 4px;
    }
  }
}
</style>
