<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
interface DisabledTime {
  disabledHours?: () => number[]
  disabledMinutes?: (selectedHour: number) => number[]
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[]
}
interface Props {
  allowClear?: boolean // 是否展示清除按钮
  bordered?: boolean // 是否有边框
  disabled?: boolean // 是否禁用
  disabledTime?: DisabledTime // 不可选择的时间
  format?: string // 展示的时间格式
  hideDisabledOptions?: boolean // 是否隐藏禁用选项
  hourStep?: number // 小时选项间隔
  minuteStep?: number // 分钟选项间隔
  secondStep?: number // 秒选项间隔
  placeholder?: string | [string, string] // 没有值时的占位文本
  showNow?: boolean // 是否显示 "此刻" 时间
  use12Hours?: boolean // 是否使用 12 小时制
  value?: string | null // (v-model) 当前时间
  valueFormat?: string // 绑定值的格式
}
const props = withDefaults(defineProps<Props>(), {
  allowClear: true,
  bordered: true,
  disabled: false,
  disabledTime: undefined,
  format: 'HH:mm:ss',
  hideDisabledOptions: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  placeholder: '请选择时间',
  showNow: false,
  use12Hours: false,
  value: null,
  valueFormat: 'HH:mm:ss'
})
const emit = defineEmits(['update:value', 'change'])
</script>
<template>
  <div class="m-timepicker"> </div>
</template>
<style lang="less" scoped>
.m-timepicker {
}
</style>
