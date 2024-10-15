<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlotsExist } from '../utils'
interface Props {
  title?: string // 倒计时标题 string | slot
  titleStyle?: CSSProperties // 设置标题的样式
  prefix?: string // 倒计时的前缀 string | slot
  suffix?: string // 倒计时的后缀 string | slot
  finishedText?: string // 完成后的展示文本 string | slot
  future?: boolean // value 是否为未来某时刻的时间戳；为 false 表示相对剩余时间戳
  format?: string // 倒计时展示格式，(Y/YY：年，M/MM：月，D/DD：日，H/HH：时，m/mm：分钟，s/ss：秒，SSS：毫秒)
  value?: number // 倒计时数值，支持设置未来某时刻的时间戳 (ms) 或 相对剩余时间 (ms)
  valueStyle?: CSSProperties // 设置倒计时的样式
  active?: boolean // 是否处于计时状态，仅当 future: false 时生效
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  titleStyle: () => ({}),
  prefix: undefined,
  suffix: undefined,
  finishedText: undefined,
  future: true,
  format: 'HH:mm:ss',
  value: 0,
  valueStyle: () => ({}),
  active: true
})
const futureTime = ref(0) // 未来截止时间戳
const remainingTime = ref(0) // 剩余时间戳
const rafID = ref<number | null>(null) // requestAnimationFrame 返回的请求 ID 是一个 long 类型整数值，是在回调列表里的唯一标识符
const emit = defineEmits(['finish'])
const slotsExist = useSlotsExist(['title', 'prefix', 'suffix'])
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showPrefix = computed(() => {
  return slotsExist.prefix || props.prefix
})
const showSuffix = computed(() => {
  return slotsExist.suffix || props.suffix
})
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
watch(
  () => props.active,
  (to: boolean) => {
    if (!props.future) {
      if (to) {
        futureTime.value = remainingTime.value + Date.now()
        rafID.value = requestAnimationFrame(CountDown)
      } else {
        rafID.value && cancelAnimationFrame(rafID.value)
        rafID.value = null
      }
    }
  }
)
watch(
  () => [props.value, props.future],
  () => {
    initCountdown()
  },
  {
    deep: true
  }
)
onMounted(() => {
  initCountdown()
})
function initCountdown() {
  // 只有数值类型的值，且是有穷的（finite），才返回 true
  if (Number.isFinite(props.value)) {
    // 检测传入的参数是否是一个有穷数
    if (props.future) {
      // 未来某时刻的时间戳，单位ms
      if (props.value > Date.now()) {
        futureTime.value = props.value
      } else {
        finish()
      }
    } else {
      // 相对剩余时间，单位 ms
      if (props.value > 0) {
        futureTime.value = props.value + Date.now()
      } else {
        finish()
      }
    }
    remainingTime.value = futureTime.value - Date.now()
    if (props.future || (!props.future && props.active)) {
      rafID.value && cancelAnimationFrame(rafID.value)
      rafID.value = requestAnimationFrame(CountDown)
    }
  } else {
    remainingTime.value = 0
  }
}
function finish() {
  remainingTime.value = 0
  emit('finish')
}
function CountDown() {
  if (futureTime.value > Date.now()) {
    remainingTime.value = futureTime.value - Date.now()
    rafID.value = requestAnimationFrame(CountDown)
  } else {
    finish()
  }
}
// 前置补 0
function padZero(value: number, targetLength: number = 2): string {
  // 左侧补零函数
  return String(value).padStart(targetLength, '0')
}
function timeFormat(time: number): string {
  let showTime = props.format
  if (showType.value.showMillisecond) {
    var millisecond = time % 1000
    showTime = showTime.replace('SSS', padZero(millisecond, 3))
  }
  time = Math.floor(time / 1000) // 将时间转为 s 为单位
  if (showType.value.showYear) {
    var Y = Math.floor(time / (60 * 60 * 24 * 30 * 12))
    showTime = showTime.includes('YY') ? showTime.replace('YY', padZero(Y)) : showTime.replace('Y', String(Y))
  } else {
    var Y = 0
  }
  if (showType.value.showMonth) {
    time = time - Y * 60 * 60 * 24 * 30 * 12
    var M = Math.floor(time / (60 * 60 * 24 * 30))
    showTime = showTime.includes('MM') ? showTime.replace('MM', padZero(M)) : showTime.replace('M', String(M))
  } else {
    var M = 0
  }
  if (showType.value.showDay) {
    time = time - M * 60 * 60 * 24 * 30
    var D = Math.floor(time / (60 * 60 * 24))
    showTime = showTime.includes('DD') ? showTime.replace('DD', padZero(D)) : showTime.replace('D', String(D))
  } else {
    var D = 0
  }
  if (showType.value.showHour) {
    time = time - D * 60 * 60 * 24
    var H = Math.floor(time / (60 * 60))
    showTime = showTime.includes('HH') ? showTime.replace('HH', padZero(H)) : showTime.replace('H', String(H))
  } else {
    var H = 0
  }
  if (showType.value.showMinute) {
    time = time - H * 60 * 60
    var m = Math.floor(time / 60)
    showTime = showTime.includes('mm') ? showTime.replace('mm', padZero(m)) : showTime.replace('m', String(m))
  } else {
    var m = 0
  }
  if (showType.value.showSecond) {
    var s = time - m * 60
    showTime = showTime.includes('ss') ? showTime.replace('ss', padZero(s)) : showTime.replace('s', String(s))
  }
  return showTime
}
function resetCountdown() {
  // 重置倒计时
  initCountdown()
}
defineExpose({
  reset: resetCountdown
})
</script>
<template>
  <div class="m-countdown">
    <div v-if="showTitle" class="countdown-title" :style="titleStyle">
      <slot name="title">{{ props.title }}</slot>
    </div>
    <div class="countdown-time">
      <template v-if="showPrefix">
        <span class="time-prefix" v-if="showPrefix || remainingTime > 0">
          <slot name="prefix">{{ prefix }}</slot>
        </span>
      </template>
      <span v-if="finishedText && remainingTime === 0" class="time-value" :style="valueStyle">
        <slot name="finish">{{ finishedText }}</slot>
      </span>
      <span v-else class="time-value" :style="valueStyle">
        {{ timeFormat(remainingTime) }}
      </span>
      <template v-if="showSuffix">
        <span class="time-suffix" v-if="showSuffix || remainingTime > 0">
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
  .countdown-title {
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  .countdown-time {
    color: rgba(0, 0, 0, 0.88);
    font-size: 24px;
    font-family: 'Helvetica Neue'; // 保证数字等宽显示
    .time-prefix {
      display: inline-block;
      margin-right: 4px;
    }
    .time-value {
      display: inline-block;
      direction: ltr;
    }
    .time-suffix {
      display: inline-block;
      margin-left: 4px;
    }
  }
}
</style>
