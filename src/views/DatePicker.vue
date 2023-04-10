<script setup lang="ts">
import { ref, watch } from 'vue'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns'

const dateValue = ref(1678936740000)
const rangeValue = ref<number[]>([1678936740000, 1679541540000])
const timeRangeValue = ref([
  {
    hours: 10,
    minutes: 20,
    seconds: 30
  },
  {
    hours: 14,
    minutes: 20,
    seconds: 30
  }
])
const presetRanges = ref([
  { label: 'Today', range: [new Date(), new Date()] },
  { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  { label: 'This year', range: [startOfYear(new Date()), endOfYear(new Date())] }
])
const timeValue = ref({
  hours: 10,
  minutes: 20
})
const secondsValue = ref({
  hours: 10,
  minutes: 20,
  seconds: 30
})
const weekValue = ref([1678032000000, 1678636799999])
const monthValue = ref({
  year: 2023,
  month: 0
})
const yearValue = ref(2023)

watch(dateValue, (to) => {
  console.log('p to:', to)
})
watch(rangeValue, (to) => {
  console.log('p to:', to)
})
watch(timeValue, (to) => {
  console.log('p to:', to)
})
watch(weekValue, (to) => {
  console.log('p to:', to)
})
watch(monthValue, (to) => {
  console.log('p to:', to)
})
watch(yearValue, (to) => {
  console.log('p to:', to)
})
</script>
<template>
  <div>
    <h1>Vue datepicker 参考文档</h1>
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://vue3datepicker.com/" target="_blank">Vue datepicker</a>
      </li>
      <li>
        <a class="u-file" href="https://vue3datepicker.com/installation/" target="_blank">Vue Datepicker Documents</a>
      </li>
    </ul>
    <h2 class="mt30 mb10">DatePicker 日期选择器基本使用</h2>
    <h2 class="mb10">日期选择器 (mode: date 默认)</h2>
    <DatePicker
      placeholder="请选择日期"
      v-model:date="dateValue"
      mode="date"
      show-today
      format="yyyy-MM-dd"
      :width="180" />
    <h2 class="mt30 mb10">禁用过去的日期选择器 (mode: date )</h2>
    <DatePicker
      placeholder="请选择日期"
      v-model:date="dateValue"
      mode="date"
      :min-date="new Date()"
      format="yyyy-MM-dd"
      :width="180" />
    <h2 class="mt30 mb10">禁用未来的日期选择器 (mode: date )</h2>
    <DatePicker
      placeholder="请选择日期"
      v-model:date="dateValue"
      mode="date"
      :max-date="new Date()"
      format="yyyy-MM-dd"
      :width="180" />
    <h2 class="mt30 mb10">日期时间选择器 (mode: date & show-time & enable-seconds)</h2>
    <DatePicker
      placeholder="请选择日期时间"
      v-model:date="dateValue"
      mode="date"
      format="yyyy-MM-dd HH:mm:ss"
      :width="240"
      show-time
      enable-seconds />
    <h2 class="mt30 mb10">日期范围选择器 (range)</h2>
    <DatePicker
      placeholder="请选择日期范围"
      v-model:date="rangeValue"
      range
      :preset-ranges="presetRanges"
      format="yyyy-MM-dd"
      :width="280" />
    <h2 class="mt30 mb10">日期范围选择器，双日期面板 (range & multi-calendars)</h2>
    <DatePicker
      placeholder="请选择日期范围"
      v-model:date="rangeValue"
      mode="range"
      format="yyyy-MM-dd"
      :width="280"
      range
      multi-calendars />
    <h2 class="mt30 mb10">时分选择器 (mode: time & show-time)</h2>
    <DatePicker
      placeholder="请选择时间"
      v-model:date="timeValue"
      mode="time"
      show-time
      mode-height="120"
      format="HH:mm"
      :width="120" />
    <h2 class="mt30 mb10">时分秒选择器 (mode: time & show-time & enable-seconds)</h2>
    <DatePicker
      placeholder="请选择时间"
      v-model:date="secondsValue"
      mode="time"
      show-time
      enable-seconds
      mode-height="120"
      format="HH:mm:ss"
      :width="150" />
    <h2 class="mt30 mb10">时分秒范围选择器 (mode: time & range & show-time & enable-seconds)</h2>
    <DatePicker
      placeholder="请选择时间"
      v-model:date="timeRangeValue"
      mode="time"
      show-time
      range
      enable-seconds
      mode-height="120"
      format="HH:mm:ss"
      :width="240" />
    <h2 class="mt30 mb10">周选择器 (mode: week)</h2>
    <DatePicker
      placeholder="请选择周"
      v-model:date="weekValue"
      mode="week"
      format="yyyy-MM-dd"
      :width="280" />
    <h2 class="mt30 mb10">月选择器 (mode: month)</h2>
    <DatePicker
      placeholder="请选择月"
      v-model:date="monthValue"
      mode="month"
      format="yyyy-MM"
      :width="150" />
    <h2 class="mt30 mb10">年选择器 (mode: year)</h2>
    <DatePicker
      placeholder="请选择年"
      v-model:date="yearValue"
      mode="year"
      format="yyyy"
      :width="120" />
  </div>
</template>
<style lang="less" scoped>
</style>
