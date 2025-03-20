<script setup lang="ts">
import pkg from '/package.json'
import { ref, watchEffect } from 'vue'
import {
  format,
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  addHours,
  addMinutes,
  addSeconds
} from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
const dateTimeValue = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
const rangeValue = ref<string[]>([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
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
const presetDates = ref([
  { label: 'Today', value: [new Date(), new Date()] },
  { label: 'This month', value: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))]
  },
  { label: 'This year', value: [startOfYear(new Date()).getTime(), endOfYear(new Date()).getTime()] }
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
// startOfWeek & endOfWeek 默认以周日作为一周的开始，可以传递一个选项对象，以周一作为一周的开始：{ weekStartsOn: 1 }
const options: any = { weekStartsOn: 1 }
const weekValue = ref([startOfWeek(new Date(), options), endOfWeek(new Date(), options)])
const monthValue = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})
const yearValue = ref(new Date().getFullYear())
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref('middle')
watchEffect(() => {
  console.log('dateValue', dateValue.value)
})
watchEffect(() => {
  console.log('dateTimeValue', dateTimeValue.value)
})
watchEffect(() => {
  console.log('rangeValue', rangeValue.value)
})
watchEffect(() => {
  console.log('timeRangeValue', timeRangeValue.value)
})
watchEffect(() => {
  console.log('timeValue', timeValue.value)
})
watchEffect(() => {
  console.log('secondsValue', secondsValue.value)
})
watchEffect(() => {
  console.log('weekValue', weekValue.value)
})
watchEffect(() => {
  console.log('monthValue', monthValue.value)
})
watchEffect(() => {
  console.log('yearValue', yearValue.value)
})
function disabledDates(date: Date): boolean {
  const current = date.getTime()
  if (endOfDay(new Date()).getTime() < current && current <= endOfDay(addDays(new Date(), 7)).getTime()) {
    return true
  }
  return false
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://vue3datepicker.com/" target="_blank">Vue Datepicker</a>
      </li>
      <li>
        <a class="u-file" href="https://vue3datepicker.com/installation/" target="_blank">Vue Datepicker Documents</a>
      </li>
      <li>
        <a class="u-file" href="https://date-fns.org/" target="_blank">date-fns</a>
      </li>
    </ul>
    <Space class="mt30" gap="small">
      <h1>@vuepic/vue-datepicker</h1>
      <Tag color="volcano">{{ pkg.dependencies['@vuepic/vue-datepicker'] }}</Tag>
    </Space>
    <h2 class="mt30 mb10">基本使用</h2>
    <DatePicker v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
    <h2 class="mt30 mb10">三种大小</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <DatePicker :size="size" v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <DatePicker disabled v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
    <h2 class="mt30 mb10">禁用日期</h2>
    <h3 class="mb10">不可选择过去日期，min-date 支持：Date | string 类型</h3>
    <DatePicker v-model="dateValue" :min-date="new Date()" format="yyyy-MM-dd" placeholder="请选择日期" />
    <h3 class="mt10 mb10">不可选择未来日期，max-date 支持：Date | string 类型</h3>
    <DatePicker
      v-model="dateValue"
      :max-date="format(new Date(), 'yyyy-MM-dd')"
      format="yyyy-MM-dd"
      placeholder="请选择日期"
    />
    <h3 class="mt10 mb10"
      >不可选择指定范围日期，disabled-dates 支持：Date[] | string[] | (date: Date) => boolean 类型</h3
    >
    <h3 class="mt10 mb10">不可选择未来7天内的日期</h3>
    <DatePicker v-model="dateValue" :disabled-dates="disabledDates" format="yyyy-MM-dd" placeholder="请选择日期" />
    <h3 class="mt10 mb10">只能选择未来7天内的日期</h3>
    <DatePicker v-model="dateValue" :disabled-dates="disabledDates" format="yyyy-MM-dd" placeholder="请选择日期" />
    <!-- <h3 class="mt10 mb10">不可选择过去七天的日期</h3>
    <DatePicker v-model="dateValue" :disabled-dates="[new Date(), subDays(new Date(), 7)]" format="yyyy-MM-dd" placeholder="请选择日期" />
    <h3 class="mt10 mb10">不可选择未来七天的日期</h3>
    <DatePicker v-model="dateValue" :disabled-dates="[format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 7), 'yyyy-MM-dd')]" format="yyyy-MM-dd" placeholder="请选择日期" /> -->
    <h2 class="mt30 mb10">日期时间选择器</h2>
    <DatePicker
      :width="210"
      v-model="dateTimeValue"
      format="yyyy-MM-dd HH:mm:ss"
      show-time
      enable-seconds
      placeholder="请选择日期时间"
    />
    <h2 class="mt30 mb10">日期范围选择器</h2>
    <DatePicker
      :width="240"
      v-model="rangeValue"
      range
      :preset-dates="presetDates"
      format="yyyy-MM-dd"
      placeholder="请选择日期范围"
    />
    <h2 class="mt30 mb10">双日期面板</h2>
    <DatePicker
      :width="240"
      v-model="rangeValue"
      mode="range"
      format="yyyy-MM-dd"
      range
      :multi-calendars="{ solo: true }"
      placeholder="请选择日期范围"
    />
    <h2 class="mt30 mb10">预设范围</h2>
    <h3 class="mb10">预设常用的日期范围以提高用户体验</h3>
    <DatePicker
      :width="240"
      v-model="rangeValue"
      mode="range"
      format="yyyy-MM-dd"
      range
      :preset-dates="presetDates"
      multi-calendars
      placeholder="请选择日期范围"
    />
    <h2 class="mt30 mb10">时分选择器</h2>
    <DatePicker
      :width="110"
      v-model="timeValue"
      mode="time"
      show-time
      mode-height="120"
      format="HH:mm"
      placeholder="请选择时间"
    />
    <h2 class="mt30 mb10">时分秒选择器</h2>
    <DatePicker
      :width="130"
      v-model="secondsValue"
      mode="time"
      format="HH:mm:ss"
      show-time
      enable-seconds
      mode-height="120"
      placeholder="请选择时间"
    />
    <h2 class="mt30 mb10">时分秒范围选择器</h2>
    <DatePicker
      :width="200"
      v-model="timeRangeValue"
      mode="time"
      format="HH:mm:ss"
      show-time
      range
      enable-seconds
      mode-height="120"
      placeholder="请选择时间"
    />
    <h2 class="mt30 mb10">周选择器</h2>
    <Space vertical>
      <GradientText
        :size="24"
        :weight="600"
        :gradient="{
          deg: '90deg',
          from: '#09c8ce',
          to: '#eb2f96'
        }"
      >
        {{ format(weekValue[0], 'yyyy-MM-dd') + ' ~ ' + format(weekValue[1], 'yyyy-MM-dd') }}
      </GradientText>
      <DatePicker :width="170" v-model="weekValue" mode="week" format="yyyy年 第ww周" placeholder="请选择周" />
    </Space>
    <h2 class="mt30 mb10">月选择器</h2>
    <DatePicker :width="130" v-model="monthValue" mode="month" format="yyyy-MM" placeholder="请选择月" />
    <h2 class="mt30 mb10">年选择器</h2>
    <DatePicker :width="110" v-model="yearValue" mode="year" format="yyyy" placeholder="请选择年" />
  </div>
</template>
