<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, addDays, startOfWeek, endOfWeek, addHours, addMinutes, addSeconds } from 'date-fns'

const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
const dateTimeValue = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
const rangeValue = ref<number[]>([Date.now(), addDays(new Date(), 1).getTime()])
console.log(addHours(Date.now(), 1))

const timeRangeValue = ref([
  {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds()
  },
  {
    hours: addHours(Date.now(), 1).getHours(),
    minutes: addMinutes(Date.now(), 10).getMinutes(),
    seconds: addSeconds(Date.now(), 30).getSeconds()
  }
])
const presetRanges = ref([
  { label: 'Today', range: [new Date(), new Date()] },
  { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  { label: 'This year', range: [startOfYear(new Date()).getTime(), endOfYear(new Date()).getTime()] }
])
const timeValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
})
const secondsValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: new Date().getSeconds()
})
const weekValue = ref(['2023-05-28', '2023-06-03'])
const monthValue = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})
const yearValue = ref(new Date().getFullYear())

watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
watchEffect(() => {
  console.log('dateTimeValue:', dateTimeValue.value)
})
watchEffect(() => {
  console.log('rangeValue:', rangeValue.value)
})
watchEffect(() => {
  console.log('timeRangeValue:', timeRangeValue.value)
})
watchEffect(() => {
  console.log('timeValue:', timeValue.value)
})
watchEffect(() => {
  console.log('secondsValue:', secondsValue.value)
})
watchEffect(() => {
  console.log('weekValue:', weekValue.value)
})
watchEffect(() => {
  console.log('monthValue:', monthValue.value)
})
watchEffect(() => {
  console.log('yearValue:', yearValue.value)
})
</script>
<template>
  <div>
    <h1>Vue datepicker 参考文档</h1>
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://vue3datepicker.com/" target="_blank">Vue Datepicker</a>
      </li>
      <li>
        <a class="u-file" href="https://vue3datepicker.com/installation/" target="_blank">Vue Datepicker Documents</a>
      </li>
    </ul>
    <h1 class="mt30">DatePicker 日期选择器</h1>
    <h2 class="mt30 mb10">日期选择器 (mode: date 默认)</h2>
    <DatePicker
      placeholder="请选择日期"
      v-model="dateValue"
      show-today
      format="yyyy-MM-dd" />
    <h2 class="mt30 mb10">禁用过去的日期选择器 (mode: date )</h2>
    <DatePicker
      placeholder="请选择日期"
      v-model="dateValue"
      :min-date="new Date()"
      format="yyyy-MM-dd" />
    <h2 class="mt30 mb10">禁用未来的日期选择器 (mode: date )</h2>
    <DatePicker
      placeholder="请选择日期"
      v-model="dateValue"
      :max-date="new Date()"
      format="yyyy-MM-dd" />
    <h2 class="mt30 mb10">日期时间选择器 (mode: date & show-time & enable-seconds)</h2>
    <DatePicker
      placeholder="请选择日期时间"
      v-model="dateTimeValue"
      format="yyyy-MM-dd HH:mm:ss"
      :width="240"
      show-time
      enable-seconds />
    <h2 class="mt30 mb10">日期范围选择器 (range)</h2>
    <DatePicker
      placeholder="请选择日期范围"
      v-model="rangeValue"
      range
      :preset-ranges="presetRanges"
      format="yyyy-MM-dd"
      :width="280" />
    <h2 class="mt30 mb10">日期范围选择器，双日期面板 (range & multi-calendars)</h2>
    <DatePicker
      placeholder="请选择日期范围"
      v-model="rangeValue"
      mode="range"
      format="yyyy-MM-dd"
      :width="280"
      range
      multi-calendars />
    <h2 class="mt30 mb10">时分选择器 (mode: time & show-time)</h2>
    <DatePicker
      placeholder="请选择时间"
      v-model="timeValue"
      mode="time"
      show-time
      mode-height="120"
      format="HH:mm"
      :width="120" />
    <h2 class="mt30 mb10">时分秒选择器 (mode: time & show-time & enable-seconds)</h2>
    <DatePicker
      placeholder="请选择时间"
      v-model="secondsValue"
      mode="time"
      show-time
      enable-seconds
      mode-height="120"
      format="HH:mm:ss"
      :width="150" />
    <h2 class="mt30 mb10">时分秒范围选择器 (mode: time & range & show-time & enable-seconds)</h2>
    <DatePicker
      placeholder="请选择时间"
      v-model="timeRangeValue"
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
      v-model="weekValue"
      mode="week"
      format="yyyy-MM-dd"
      :width="280" />
    <h2 class="mt30 mb10">月选择器 (mode: month)</h2>
    <DatePicker
      placeholder="请选择月"
      v-model="monthValue"
      mode="month"
      format="yyyy-MM"
      :width="150" />
    <h2 class="mt30 mb10">年选择器 (mode: year)</h2>
    <DatePicker
      placeholder="请选择年"
      v-model="yearValue"
      mode="year"
      format="yyyy"
      :width="120" />
  </div>
</template>
