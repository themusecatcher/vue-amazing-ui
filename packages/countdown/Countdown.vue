<script setup lang="ts">
import { ref, computed, watchEffect, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import { dateFormat } from '../utils'
interface Props {
  title?: string // 倒计时标题 string | v-slot
  value: number // 倒计时数值，支持设置未来某时刻的时间戳 (ms) 或 相对剩余时间戳 (ms)
  future?: boolean // 是否为未来某时刻；为 false 表示相对剩余时间戳
  format?: string // 格式化倒计时展示，(Y：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒)
  prefix?: string // 倒计时数值的前缀 string | v-slot
  suffix?: string // 倒计时数值的后缀 string | v-slot
  titleStyle?: CSSProperties // 设置标题的样式
  valueStyle?: CSSProperties // 设置数值的样式
  finishedText?: string // 完成后的展示文本 string | v-slot
}
const props = withDefaults(defineProps<Props>(), {
  // 基于类型的声明
  title: '',
  value: undefined,
  future: true,
  format: 'HH:mm:ss',
  prefix: '',
  suffix: '',
  titleStyle: () => ({}),
  valueStyle: () => ({}),
  finishedText: 'Finished'
})
const slots = useSlots()
const showPrefix = computed(() => {
  const prefixSlots = slots.prefix?.()
  if (prefixSlots) {
    return Boolean(prefixSlots[0].children !== 'v-if' && prefixSlots?.length)
  }
  return props.prefix
})
const showSuffix = computed(() => {
  const suffixSlots = slots.suffix?.()
  if (suffixSlots) {
    return Boolean(suffixSlots[0].children !== 'v-if' && suffixSlots?.length)
  }
  return props.suffix
})
const futureTime = ref(0) // 未来截止时间戳
const restTime = ref() // 剩余时间戳
const emit = defineEmits(['finish'])
function CountDown() {
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
  if (Number.isFinite(props.value)) {
    // 检测传入的参数是否是一个有穷数
    if (props.future) {
      // 未来某时刻的时间戳，单位ms
      if (props.value >= Date.now()) {
        futureTime.value = props.value
      }
    } else {
      // 相对剩余时间，单位ms
      if (props.value >= 0) {
        futureTime.value = props.value + Date.now()
      }
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
        <span class="u-prefix" v-if="showPrefix || restTime > 0 || restTime === null">
          <slot name="prefix">{{ prefix }}</slot>
        </span>
      </template>
      <span class="u-time-value" :style="valueStyle" v-if="finishedText && restTime === 0 && restTime !== null">
        <slot name="finish">{{ finishedText }}</slot>
      </span>
      <span class="u-time-value" :style="valueStyle" v-if="Number.isFinite(restTime) && restTime > 0">{{
        dateFormat(restTime, format)
      }}</span>
      <template v-if="showSuffix">
        <span class="u-suffix" v-if="showSuffix || restTime > 0 || restTime === null">
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
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  .m-time {
    color: rgba(0, 0, 0, 0.88);
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
