# 日期选择器 DatePicker

<GlobalElement />

_输入或选择日期的控件_

## 何时使用

- 需要输入或选择日期时
- 需要输入或选择日期与时间时

<script setup lang="ts">
import { ref } from 'vue'
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfDay,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  isSameDay,
  setHours,
  startOfDay
} from 'date-fns'
import type { DatePickerProps } from 'vue-amazing-ui'
/** 单日期用例的初始值：当天（`offsetDays` 可偏移） */
function initialDate(offsetDays: number = 0): number {
  return addDays(new Date(), offsetDays).getTime()
}
/** 日期时间用例的初始值：当前时刻（含时分秒） */
function initialDateTime(): number {
  return new Date().getTime()
}
/** 日期时间范围用例的初始值：起点取当日 09:00、终点取七天后 18:00 */
function initialDateTimeRange(): [number, number] {
  const start = setHours(startOfDay(new Date()), 9).getTime()
  const end = setHours(addDays(startOfDay(new Date()), 7), 18).getTime()
  return [start, end]
}
/** 范围用例的初始值：两端都归一到当日零点，与面板按天选择的粒度一致 */
function initialRange(startOffset: number = 0, endOffset: number = 7): [number, number] {
  const start = startOfDay(addDays(new Date(), startOffset)).getTime()
  const end = startOfDay(addDays(new Date(), endOffset)).getTime()
  return [start, end]
}
// 各用例独立持有一组值，避免在一个用例里选日期影响到其它用例
const basicValue = ref<number | null>(initialDate())
const slashValue = ref<number | null>(initialDate())
const chineseValue = ref<number | null>(initialDate())
const disabledValue = ref<number | null>(initialDate())
const beforeTodayValue = ref<number | null>(initialDate(-3))
const afterTodayValue = ref<number | null>(initialDate(3))
const weekendValue = ref<number | null>(initialDate())
const sizeCaseValue = ref<number | null>(initialDate())
const suffixValue = ref<number | null>(initialDate())
const warningValue = ref<number | null>(initialDate())
const errorValue = ref<number | null>(initialDate())
const borderlessValue = ref<number | null>(initialDate())
const placementBottomLeftValue = ref<number | null>(initialDate())
const placementBottomRightValue = ref<number | null>(initialDate())
const placementTopLeftValue = ref<number | null>(initialDate())
const placementTopRightValue = ref<number | null>(initialDate())
// 范围用例：主用例的日期范围形态
const rangeValue = ref<[number, number] | null>(initialRange())
const sizeRangeValue = ref<[number, number] | null>(initialRange())
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
// 日期时间范围用例：单个日期时间面板 + 两段切换
const dateTimeRangeValue = ref<[number, number] | null>(initialDateTimeRange())
// 禁用日期用例的范围变体：初始为空值
const disabledRangeValue = ref<[number, number] | null>(null)
// 日期时间用例：主用例 + 时间面板选项 / 12 小时制 / 隐藏「此刻」三个细项
const datetimeValue = ref<number | null>(initialDateTime())
const minuteStepValue = ref<number | null>(initialDateTime())
const twelveHourValue = ref<number | null>(initialDateTime())
const showNowValue = ref<number | null>(initialDateTime())
// 不可选择日期和时间用例：初始为空值，展开后再选择
const disabledDateTimeValue = ref<number | null>(null)
/** 不可选择今天之后的日期（`disabledDate` 入参为「当日零点」的毫秒时间戳） */
function disabledDateBefore(timestamp: number): boolean {
  return startOfDay(timestamp).getTime() > startOfDay(new Date()).getTime()
}
/** 只能选择未来七天内的日期 */
function disabledDateAfter(timestamp: number): boolean {
  const current = endOfDay(timestamp).getTime()
  return current <= endOfDay(new Date()).getTime() || current > endOfDay(addDays(new Date(), 7)).getTime()
}
/** 不可选择周六与周日 */
function disabledWeekendDate(timestamp: number): boolean {
  const day = getDay(timestamp)
  return day === 0 || day === 6
}
/** 半开区间 [start, end) 的整数序列 */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, index) => index + start)
}
/** 不可选择今天及之前 */
function disabledDateTodayOrBefore(timestamp: number): boolean {
  return endOfDay(timestamp).getTime() <= endOfDay(new Date()).getTime()
}
/** 禁用的时间区间：4-23 时 / 30-59 分 / 55-56 秒 */
function disabledDateTimeUnits() {
  return {
    disabledHours: () => range(4, 24),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  }
}
// 选择不超过七天的范围用例：初始为空值，可选范围由草稿区间动态限制
const sevenDaysValue = ref<[number, number] | null>(null)
/** 草稿区间：`calendarChange` 直接给出的时间戳区间 */
const sevenDaysDraft = ref<[number | null, number | null] | null>(null)
/**
 * 草稿期间把可选日期限制在草稿两端 ±7 天内
 *
 * 草稿由 `calendarChange` 记录、`disabledDate` 读草稿动态收窄可选范围，草稿变化即重算禁用态。
 */
function disabledSevenDaysDate(timestamp: number): boolean {
  const draft = sevenDaysDraft.value
  if (!draft || (draft[0] === null && draft[1] === null)) {
    return false
  }
  const tooLate = draft[0] === null ? false : differenceInCalendarDays(timestamp, draft[0]) > 7
  const tooEarly = draft[1] === null ? false : differenceInCalendarDays(draft[1], timestamp) > 7
  return tooLate || tooEarly
}
function onSevenDaysCalendarChange(value: [number | null, number | null] | null): void {
  sevenDaysDraft.value = value
}
/** 展开时丢弃上一轮草稿：否则上次的区间会继续限制本次可选范围 */
function onSevenDaysOpenChange(open: boolean): void {
  if (open) {
    sevenDaysDraft.value = null
  }
}
// 预设范围用例：单选 / 日期范围 / 日期时间范围三种形态各持一组值
const presetValue = ref<number | null>(null)
const presetRangeValue = ref<[number, number] | null>(null)
const presetDateTimeRangeValue = ref<[number, number] | null>(null)
/** 近 N 天区间：起点取 N 天前的零点、终点取当前时刻 */
function recentDaysRange(days: number): [number, number] {
  return [startOfDay(addDays(new Date(), -days)).getTime(), Date.now()]
}
/** 预设值可为时间戳，也可为返回时间戳的函数（函数值在点击时才求值） */
const datePresets: NonNullable<DatePickerProps['presets']> = [
  { label: '昨天', value: startOfDay(addDays(new Date(), -1)).getTime() },
  { label: '一周前', value: () => startOfDay(addDays(new Date(), -7)).getTime() },
  { label: '一个月前', value: () => startOfDay(addMonths(new Date(), -1)).getTime() }
]
const rangePresets: NonNullable<DatePickerProps['presets']> = [
  { label: '近 7 天', value: () => recentDaysRange(7) },
  { label: '近 14 天', value: () => recentDaysRange(14) },
  { label: '近 30 天', value: () => recentDaysRange(30) },
  { label: '近 90 天', value: () => recentDaysRange(90) }
]
// 自定义日期范围选择用例：两个独立选择器经 disabledDate / disabledTime 与展开状态互相约束
const startValue = ref<number | null>(null)
const endValue = ref<number | null>(null)
const endOpen = ref(false)
/** 选中日期时的默认时分秒 */
const defaultTime = startOfDay(new Date()).getTime()
const sizeValue = ref<DatePickerProps['size']>('middle')
const sizeOptions: Array<{ label: string; value: NonNullable<DatePickerProps['size']> }> = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
/** 起点不得晚于终点的「整日」：同一天仍可选，越界的时间点交给 disabledTime */
function disabledStartDate(timestamp: number): boolean {
  const end = endValue.value
  return end !== null && differenceInCalendarDays(timestamp, end) > 0
}
/** 终点不得早于起点的「整日」：同一天仍可选 */
function disabledEndDate(timestamp: number): boolean {
  const start = startValue.value
  return start !== null && differenceInCalendarDays(timestamp, start) < 0
}
/**
 * 同一天内的时间约束：逐级判定（只有高一级与边界相同，下一级才有额外禁用项），边界时刻本身视为越界
 *
 * @param boundary 约束边界的时刻（终点侧为起点、起点侧为终点）
 * @param timestamp 面板当前所编辑的时刻
 */
function disabledUnitsNotLaterThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  const hour = getHours(boundary)
  const minute = getMinutes(boundary)
  const second = getSeconds(boundary)
  return {
    disabledHours: () => range(0, hour),
    disabledMinutes: (currentHour: number) => (currentHour === hour ? range(0, minute) : []),
    disabledSeconds: (currentHour: number, currentMinute: number) =>
      currentHour === hour && currentMinute === minute ? range(0, second + 1) : []
  }
}
/** 同 disabledUnitsNotLaterThan，方向相反：禁用晚于边界时刻的时间单位 */
function disabledUnitsNotEarlierThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  const hour = getHours(boundary)
  const minute = getMinutes(boundary)
  const second = getSeconds(boundary)
  return {
    disabledHours: () => range(hour + 1, 24),
    disabledMinutes: (currentHour: number) => (currentHour === hour ? range(minute + 1, 60) : []),
    disabledSeconds: (currentHour: number, currentMinute: number) =>
      currentHour === hour && currentMinute === minute ? range(second + 1, 60) : []
  }
}
/** 终点侧：同一天只允许选择晚于起点时刻的时间 */
function disabledEndTime(timestamp: number) {
  const start = startValue.value
  return start === null ? {} : disabledUnitsNotLaterThan(start, timestamp)
}
/** 起点侧：同一天只允许选择早于终点时刻的时间 */
function disabledStartTime(timestamp: number) {
  const end = endValue.value
  return end === null ? {} : disabledUnitsNotEarlierThan(end, timestamp)
}
/** 日期时间范围用例：终点只选晚于起点的时分秒（日期整日越界由内核按激活段自动禁用） */
function disabledDateTimeRangeTime(timestamp: number, side: 'start' | 'end') {
  const boundary = (side === 'end' ? dateTimeRangeValue.value?.[0] : dateTimeRangeValue.value?.[1]) ?? null
  if (boundary === null) {
    return {}
  }
  return side === 'end'
    ? disabledUnitsNotLaterThan(boundary, timestamp)
    : disabledUnitsNotEarlierThan(boundary, timestamp)
}
/** 起点选完即收起：把终点直接展开，省掉用户的一次点击 */
function onStartOpenChange(open: boolean): void {
  if (!open) {
    endOpen.value = true
  }
}
</script>

## 基本使用

<br/>

<DatePicker v-model:value="basicValue" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const basicValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker v-model:value="basicValue" placeholder="请选择日期" />
</template>
```

::::

## 日期格式

_使用 `format` 定制展示格式_

<br/>

<Space vertical>
  <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
  <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const slashValue = ref<number | null>(new Date().getTime())
const chineseValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
    <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
  </Space>
</template>
```

::::

## 范围选择器

_通过设置 `type` 属性，指定范围选择器类型_

<br/>

<DatePicker v-model:value="rangeValue" type="daterange" :placeholder="rangePlaceholder" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const rangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
</script>
<template>
  <DatePicker v-model:value="rangeValue" type="daterange" :placeholder="rangePlaceholder" />
</template>
```

::::

_`type="datetimerange"` 在范围形态上叠加时间面板：两段共用同一个日期时间面板，点「确定」提交当前段并自动切到另一端，两段都确定后才收起；展开期间的选择只落在草稿上，关闭面板则丢弃草稿；配合 `disabledTime` 可让终点只选「晚于起点」的时分秒（日期整日越界由内核按激活段自动禁用）_

<br/>

<DatePicker
  v-model:value="dateTimeRangeValue"
  type="datetimerange"
  :disabled-time="disabledDateTimeRangeTime"
  :placeholder="rangePlaceholder"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { addDays, getHours, getMinutes, getSeconds, isSameDay, setHours, startOfDay } from 'date-fns'
const start = setHours(startOfDay(new Date()), 9).getTime()
const end = setHours(addDays(startOfDay(new Date()), 7), 18).getTime()
const dateTimeRangeValue = ref<[number, number] | null>([start, end])
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
/** 半开区间 [start, end) 的整数序列 */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, index) => index + start)
}
/**
 * 同一天内的时间约束：逐级判定，边界时刻本身视为越界
 *
 * @param boundary 约束边界的时刻（终点侧为起点、起点侧为终点）
 * @param timestamp 面板当前所编辑的时刻
 */
function disabledUnitsNotLaterThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  const hour = getHours(boundary)
  const minute = getMinutes(boundary)
  const second = getSeconds(boundary)
  return {
    disabledHours: () => range(0, hour),
    disabledMinutes: (currentHour: number) => (currentHour === hour ? range(0, minute) : []),
    disabledSeconds: (currentHour: number, currentMinute: number) =>
      currentHour === hour && currentMinute === minute ? range(0, second + 1) : []
  }
}
/** 同 disabledUnitsNotLaterThan，方向相反：禁用晚于边界时刻的时间单位 */
function disabledUnitsNotEarlierThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  const hour = getHours(boundary)
  const minute = getMinutes(boundary)
  const second = getSeconds(boundary)
  return {
    disabledHours: () => range(hour + 1, 24),
    disabledMinutes: (currentHour: number) => (currentHour === hour ? range(minute + 1, 60) : []),
    disabledSeconds: (currentHour: number, currentMinute: number) =>
      currentHour === hour && currentMinute === minute ? range(second + 1, 60) : []
  }
}
/** 终点侧：同一天只允许选择晚于起点时刻的时间 */
function disabledDateTimeRangeTime(timestamp: number, side: 'start' | 'end') {
  const rangeValue = dateTimeRangeValue.value
  const boundary = (side === 'end' ? rangeValue?.[0] : rangeValue?.[1]) ?? null
  if (boundary === null) {
    return {}
  }
  return side === 'end'
    ? disabledUnitsNotLaterThan(boundary, timestamp)
    : disabledUnitsNotEarlierThan(boundary, timestamp)
}
</script>
<template>
  <DatePicker
    v-model:value="dateTimeRangeValue"
    type="datetimerange"
    :disabled-time="disabledDateTimeRangeTime"
    :placeholder="rangePlaceholder"
  />
</template>
```

::::

## 日期时间选择

_`type="datetime"` 增加选择时间功能，时间面板选项经 `timePickerProps` 透传；展开期间的选择只落在草稿值上，点「确定」或「此刻」才提交，关闭面板则丢弃草稿_

<br/>

<DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />

_分钟按 5 分钟步长选择_

<br/>

<DatePicker
  v-model:value="minuteStepValue"
  type="datetime"
  :time-picker-props="{ minuteStep: 5 }"
  placeholder="请选择日期时间"
/>

_12 小时制：`use12Hours` 与 12 小时制格式（`hh`）配合使用_

<br/>

<DatePicker
  v-model:value="twelveHourValue"
  type="datetime"
  format="yyyy-MM-dd hh:mm:ss"
  :time-picker-props="{ use12Hours: true }"
  placeholder="请选择日期时间"
/>

_隐藏「此刻」快捷_

<br/>

<DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const datetimeValue = ref<number | null>(new Date().getTime())
const minuteStepValue = ref<number | null>(new Date().getTime())
const twelveHourValue = ref<number | null>(new Date().getTime())
const showNowValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />
    <DatePicker
      v-model:value="minuteStepValue"
      type="datetime"
      :time-picker-props="{ minuteStep: 5 }"
      placeholder="请选择日期时间"
    />
    <DatePicker
      v-model:value="twelveHourValue"
      type="datetime"
      format="yyyy-MM-dd hh:mm:ss"
      :time-picker-props="{ use12Hours: true }"
      placeholder="请选择日期时间"
    />
    <DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />
  </Space>
</template>
```

::::

## 禁用

<br/>

<DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const disabledValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />
</template>
```

::::

## 不可选择日期和时间

_`disabledDate` 与 `disabledTime` 分别禁止选择部分日期与时间，`disabledTime` 需与带时间的形态配合使用_

<br/>

<DatePicker
  v-model:value="disabledDateTimeValue"
  type="datetime"
  :disabled-date="disabledDateTodayOrBefore"
  :disabled-time="disabledDateTimeUnits"
  :default-time="defaultTime"
  placeholder="请选择日期时间"
/>

_不可选择今天之后的日期_

<br/>

<DatePicker v-model:value="beforeTodayValue" :disabled-date="disabledDateBefore" placeholder="请选择日期" />

_只能选择未来七天内的日期_

<br/>

<DatePicker v-model:value="afterTodayValue" :disabled-date="disabledDateAfter" placeholder="请选择日期" />

_日期范围不可选择今天及之前（`disabledDate` 同时作用于两个面板）_

<br/>

<DatePicker
  v-model:value="disabledRangeValue"
  type="daterange"
  :disabled-date="disabledDateTodayOrBefore"
  :placeholder="rangePlaceholder"
/>

_不可选择周六与周日_

<br/>

<DatePicker v-model:value="weekendValue" :disabled-date="disabledWeekendDate" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { addDays, endOfDay, getDay, startOfDay } from 'date-fns'
const disabledDateTimeValue = ref<number | null>(null)
const disabledRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
const beforeTodayValue = ref<number | null>(new Date().getTime())
const afterTodayValue = ref<number | null>(new Date().getTime())
const weekendValue = ref<number | null>(new Date().getTime())
// 选中日期时的默认时分秒
const defaultTime = startOfDay(new Date()).getTime()
/** 半开区间 [start, end) 的整数序列 */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, index) => index + start)
}
function disabledDateTodayOrBefore(timestamp: number): boolean {
  return endOfDay(timestamp).getTime() <= endOfDay(new Date()).getTime()
}
function disabledDateBefore(timestamp: number): boolean {
  return startOfDay(timestamp).getTime() > startOfDay(new Date()).getTime()
}
function disabledDateAfter(timestamp: number): boolean {
  const current = endOfDay(timestamp).getTime()
  return current <= endOfDay(new Date()).getTime() || current > endOfDay(addDays(new Date(), 7)).getTime()
}
function disabledWeekendDate(timestamp: number): boolean {
  const day = getDay(timestamp)
  return day === 0 || day === 6
}
function disabledDateTimeUnits() {
  return {
    disabledHours: () => range(4, 24),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  }
}
</script>
<template>
  <Space vertical>
    <DatePicker
      v-model:value="disabledDateTimeValue"
      type="datetime"
      :disabled-date="disabledDateTodayOrBefore"
      :disabled-time="disabledDateTimeUnits"
      :default-time="defaultTime"
      placeholder="请选择日期时间"
    />
    <DatePicker v-model:value="beforeTodayValue" :disabled-date="disabledDateBefore" placeholder="请选择日期" />
    <DatePicker v-model:value="afterTodayValue" :disabled-date="disabledDateAfter" placeholder="请选择日期" />
    <DatePicker
      v-model:value="disabledRangeValue"
      type="daterange"
      :disabled-date="disabledDateTodayOrBefore"
      :placeholder="rangePlaceholder"
    />
    <DatePicker v-model:value="weekendValue" :disabled-date="disabledWeekendDate" placeholder="请选择日期" />
  </Space>
</template>
```

::::

## 选择不超过七天的范围

_用 `calendarChange` 记录草稿区间、用 `disabledDate` 读草稿收窄可选范围_

<br/>

<DatePicker
  v-model:value="sevenDaysValue"
  type="daterange"
  :disabled-date="disabledSevenDaysDate"
  :placeholder="rangePlaceholder"
  @calendar-change="onSevenDaysCalendarChange"
  @open-change="onSevenDaysOpenChange"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { differenceInCalendarDays } from 'date-fns'
const sevenDaysValue = ref<[number, number] | null>(null)
/** 草稿区间：`calendarChange` 直接给出的时间戳区间 */
const sevenDaysDraft = ref<[number | null, number | null] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
/** 草稿期间把可选日期限制在草稿两端 ±7 天内 */
function disabledSevenDaysDate(timestamp: number): boolean {
  const draft = sevenDaysDraft.value
  if (!draft || (draft[0] === null && draft[1] === null)) {
    return false
  }
  const tooLate = draft[0] === null ? false : differenceInCalendarDays(timestamp, draft[0]) > 7
  const tooEarly = draft[1] === null ? false : differenceInCalendarDays(draft[1], timestamp) > 7
  return tooLate || tooEarly
}
function onSevenDaysCalendarChange(value: [number | null, number | null] | null): void {
  sevenDaysDraft.value = value
}
/** 展开时丢弃上一轮草稿：否则上次的区间会继续限制本次可选范围 */
function onSevenDaysOpenChange(open: boolean): void {
  if (open) {
    sevenDaysDraft.value = null
  }
}
</script>
<template>
  <DatePicker
    v-model:value="sevenDaysValue"
    type="daterange"
    :disabled-date="disabledSevenDaysDate"
    :placeholder="rangePlaceholder"
    @calendar-change="onSevenDaysCalendarChange"
    @open-change="onSevenDaysOpenChange"
  />
</template>
```

::::

## 预设范围

_用 `presets` 预设常用日期与区间，点击即填入并收起；值可为时间戳，也可为返回时间戳的函数_

<br/>

<Space vertical>
  <DatePicker v-model:value="presetValue" :presets="datePresets" placeholder="请选择日期" />
  <DatePicker
    v-model:value="presetRangeValue"
    type="daterange"
    :presets="rangePresets"
    :placeholder="rangePlaceholder"
  />
  <DatePicker
    v-model:value="presetDateTimeRangeValue"
    type="datetimerange"
    format="yyyy/MM/dd HH:mm:ss"
    width="400px"
    :presets="rangePresets"
    :placeholder="rangePlaceholder"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { addDays, addMonths, startOfDay } from 'date-fns'
import type { DatePickerProps } from 'vue-amazing-ui'
const presetValue = ref<number | null>(null)
const presetRangeValue = ref<[number, number] | null>(null)
const presetDateTimeRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
/** 近 N 天区间：起点取 N 天前的零点、终点取当前时刻 */
function recentDaysRange(days: number): [number, number] {
  return [startOfDay(addDays(new Date(), -days)).getTime(), Date.now()]
}
/** 预设值可为时间戳，也可为返回时间戳的函数（函数值在点击时才求值） */
const datePresets: NonNullable<DatePickerProps['presets']> = [
  { label: '昨天', value: startOfDay(addDays(new Date(), -1)).getTime() },
  { label: '一周前', value: () => startOfDay(addDays(new Date(), -7)).getTime() },
  { label: '一个月前', value: () => startOfDay(addMonths(new Date(), -1)).getTime() }
]
const rangePresets: NonNullable<DatePickerProps['presets']> = [
  { label: '近 7 天', value: () => recentDaysRange(7) },
  { label: '近 14 天', value: () => recentDaysRange(14) },
  { label: '近 30 天', value: () => recentDaysRange(30) },
  { label: '近 90 天', value: () => recentDaysRange(90) }
]
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="presetValue" :presets="datePresets" placeholder="请选择日期" />
    <DatePicker
      v-model:value="presetRangeValue"
      type="daterange"
      :presets="rangePresets"
      :placeholder="rangePlaceholder"
    />
    <DatePicker
      v-model:value="presetDateTimeRangeValue"
      type="datetimerange"
      format="yyyy/MM/dd HH:mm:ss"
      width="400px"
      :presets="rangePresets"
      :placeholder="rangePlaceholder"
    />
  </Space>
</template>
```

::::

## 三种大小

<br/>

<Radio v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
<div class="mt10">
  <Space vertical>
    <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
    <DatePicker
      v-model:value="sizeRangeValue"
      type="daterange"
      :size="sizeValue"
      :placeholder="rangePlaceholder"
    />
  </Space>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DatePickerProps } from 'vue-amazing-ui'
const sizeCaseValue = ref<number | null>(new Date().getTime())
const sizeRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
const sizeValue = ref<DatePickerProps['size']>('middle')
const sizeOptions: Array<{ label: string; value: NonNullable<DatePickerProps['size']> }> = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
</script>
<template>
  <Radio v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
  <div class="mt10">
    <Space vertical>
      <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
      <DatePicker
        v-model:value="sizeRangeValue"
        type="daterange"
        :size="sizeValue"
        :placeholder="rangePlaceholder"
      />
    </Space>
  </div>
</template>
```

::::

## 自定义日期范围选择

_用两个独立的选择器组合出范围选择：`disabledDate` 按整日互相约束起止、`disabledTime` 把同一天的时分秒精确到边界之后，`open` 与展开事件联动，起点选完自动展开终点_

<br/>

<Space vertical>
  <DatePicker
    v-model:value="startValue"
    type="datetime"
    :disabled-date="disabledStartDate"
    :disabled-time="disabledStartTime"
    placeholder="开始日期"
    @open-change="onStartOpenChange"
  />
  <DatePicker
    v-model:value="endValue"
    v-model:open="endOpen"
    type="datetime"
    :disabled-date="disabledEndDate"
    :disabled-time="disabledEndTime"
    placeholder="结束日期"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { differenceInCalendarDays, getHours, getMinutes, getSeconds, isSameDay } from 'date-fns'
const startValue = ref<number | null>(null)
const endValue = ref<number | null>(null)
const endOpen = ref(false)
/** 半开区间 [start, end) 的整数序列 */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, index) => index + start)
}
/** 起点不得晚于终点的「整日」：同一天仍可选，越界的时间点交给 disabledTime */
function disabledStartDate(timestamp: number): boolean {
  const end = endValue.value
  return end !== null && differenceInCalendarDays(timestamp, end) > 0
}
/** 终点不得早于起点的「整日」：同一天仍可选 */
function disabledEndDate(timestamp: number): boolean {
  const start = startValue.value
  return start !== null && differenceInCalendarDays(timestamp, start) < 0
}
/**
 * 同一天内的时间约束：逐级判定（只有高一级与边界相同，下一级才有额外禁用项），边界时刻本身视为越界
 *
 * @param boundary 约束边界的时刻（终点侧为起点、起点侧为终点）
 * @param timestamp 面板当前所编辑的时刻
 */
function disabledUnitsNotLaterThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  const hour = getHours(boundary)
  const minute = getMinutes(boundary)
  const second = getSeconds(boundary)
  return {
    disabledHours: () => range(0, hour),
    disabledMinutes: (currentHour: number) => (currentHour === hour ? range(0, minute) : []),
    disabledSeconds: (currentHour: number, currentMinute: number) =>
      currentHour === hour && currentMinute === minute ? range(0, second + 1) : []
  }
}
/** 同 disabledUnitsNotLaterThan，方向相反：禁用晚于边界时刻的时间单位 */
function disabledUnitsNotEarlierThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  const hour = getHours(boundary)
  const minute = getMinutes(boundary)
  const second = getSeconds(boundary)
  return {
    disabledHours: () => range(hour + 1, 24),
    disabledMinutes: (currentHour: number) => (currentHour === hour ? range(minute + 1, 60) : []),
    disabledSeconds: (currentHour: number, currentMinute: number) =>
      currentHour === hour && currentMinute === minute ? range(second + 1, 60) : []
  }
}
/** 终点侧：同一天只允许选择晚于起点时刻的时间 */
function disabledEndTime(timestamp: number) {
  const start = startValue.value
  return start === null ? {} : disabledUnitsNotLaterThan(start, timestamp)
}
/** 起点侧：同一天只允许选择早于终点时刻的时间 */
function disabledStartTime(timestamp: number) {
  const end = endValue.value
  return end === null ? {} : disabledUnitsNotEarlierThan(end, timestamp)
}
/** 起点选完即收起：把终点直接展开，省掉用户的一次点击 */
function onStartOpenChange(open: boolean): void {
  if (!open) {
    endOpen.value = true
  }
}
</script>
<template>
  <Space vertical>
    <DatePicker
      v-model:value="startValue"
      type="datetime"
      :disabled-date="disabledStartDate"
      :disabled-time="disabledStartTime"
      placeholder="开始日期"
      @open-change="onStartOpenChange"
    />
    <DatePicker
      v-model:value="endValue"
      v-model:open="endOpen"
      type="datetime"
      :disabled-date="disabledEndDate"
      :disabled-time="disabledEndTime"
      placeholder="结束日期"
    />
  </Space>
</template>
```

::::

## 后缀图标

<br/>

<DatePicker v-model:value="suffixValue" placeholder="请选择日期">
  <template #suffixIcon>
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      />
      <path
        d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
      />
    </svg>
  </template>
</DatePicker>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const suffixValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker v-model:value="suffixValue" placeholder="请选择日期">
    <template #suffixIcon>
      <svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor" focusable="false" aria-hidden="true">
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        />
        <path
          d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
        />
      </svg>
    </template>
  </DatePicker>
</template>
```

::::

## 自定义状态

<br/>

<Space vertical>
  <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
  <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const warningValue = ref<number | null>(new Date().getTime())
const errorValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
    <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
  </Space>
</template>
```

::::

## 无边框

<br/>

<DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const borderlessValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />
</template>
```

::::

## 弹出位置

<br/>

<Space wrap>
  <DatePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
  <DatePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
  <DatePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
  <DatePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const bottomLeftValue = ref<number | null>(new Date().getTime())
const bottomRightValue = ref<number | null>(new Date().getTime())
const topLeftValue = ref<number | null>(new Date().getTime())
const topRightValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space wrap>
    <DatePicker v-model:value="bottomLeftValue" placement="bottomLeft" placeholder="左下" />
    <DatePicker v-model:value="bottomRightValue" placement="bottomRight" placeholder="右下" />
    <DatePicker v-model:value="topLeftValue" placement="topLeft" placeholder="左上" />
    <DatePicker v-model:value="topRightValue" placement="topRight" placeholder="右上" />
  </Space>
</template>
```

::::

## APIs

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 双向绑定值，毫秒时间戳；范围形态为两段元组，某段可为 `null` | number &#124; [number &#124; null, number &#124; null] &#124; null | null |
| formattedValue <Tag color="cyan">v-model</Tag> | 字符串轨道的双向绑定值，传入时以它为准（受控）；显示格式由 `format` / `valueFormat` 决定 | string &#124; [string, string] &#124; null | null |
| open <Tag color="cyan">v-model</Tag> | 面板是否展开 | boolean | false |
| type | 选择形态 | [DatePickerType](#datepickertype-type) | 'date' |
| format | 日期展示格式，参考 [format](https://date-fns.org/v4.1.0/docs/format) | string | [DefaultFormat](#defaultformat-value) |
| valueFormat | 绑定值格式，默认与 `format` 相同 | string | undefined |
| placeholder | 输入框提示文字，范围形态可传入两段文案 | string &#124; [string, string] | '' |
| defaultPickerValue | 面板初始日期（毫秒时间戳），默认取 `value` 或今天 | number | undefined |
| startDayOfWeek | 一周的开始是星期几，`0-6`，`0` 是周一 | 0 &#124; 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6 | 0 |
| disabledDate | 不可选择的日期，入参为「当日零点」的毫秒时间戳 | (timestamp: number) => boolean | undefined |
| disabledTime | 不可选择的时间，仅带时间的形态生效；入参为当前面板草稿值的时间戳，范围形态额外接收段标识 | [DatePickerDisabledTime](#datepickerdisabledtime-type) &#124; [DatePickerRangeDisabledTime](#datepickerragedisabledtime-type) | undefined |
| defaultTime | 选中日期时的默认时分秒（只取其中的时分秒），毫秒时间戳 | number | undefined |
| timePickerProps | 时间面板选项（步长 / 12 小时制 / 隐藏禁用项） | [DatePickerTimeProps](#datepickertimeprops-type) | undefined |
| presets | 预设选项，点击即提交并收起 | [DatePickerPreset](#datepickerpreset-type)[] | [] |
| width | 选择器宽度，单位 `px`，不传时随内容自适应 | string &#124; number | undefined |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| status | 校验状态 | 'warning' &#124; 'error' | undefined |
| bordered | 是否展示边框 | boolean | true |
| disabled | 是否禁用 | boolean | false |
| allowClear | 是否展示清除按钮 | boolean | true |
| allowEmpty | 范围形态各段是否允许为空，为空时该段可被单独清空并对外提交 | [boolean, boolean] | [false, false] |
| inputReadOnly | 输入框是否只读（避免移动端唤起键盘） | boolean | false |
| to | 面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 'body') 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | false |
| placement | 面板弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomLeft' |
| showArrow | 范围形态的面板指示箭头是否展示，不传时跟随弹出方位（仅左侧对齐的 `bottomLeft` / `topLeft` 展示） | boolean | undefined |
| showToday | 是否展示面板底部的「今天」快捷，面板切到月/年视图时隐藏 | boolean | true |
| showNow | 是否展示面板底部的「此刻」快捷，仅带时间的形态生效 | boolean | true |
| suffixIcon | 自定义选择框后缀图标 | VNode &#124; (() => VNode) | undefined |
| panelClass | 面板额外类名 | string | '' |
| panelStyle | 面板额外样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex | 面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |

### DatePickerType Type

| 名称 | 值 |
| :-- | :-- |
| DatePickerType | 'date' &#124; 'datetime' &#124; 'week' &#124; 'month' &#124; 'quarter' &#124; 'year' &#124; 'daterange' &#124; 'datetimerange' &#124; 'monthrange' &#124; 'quarterrange' &#124; 'yearrange' |

### DatePickerDisabledTime Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| DatePickerDisabledTime | 不可选择的时间判定 | (timestamp: number) => [DatePickerDisabledTimeUnits](#datepickerdisabledtimeunits-type) | undefined |

### DatePickerRangeDisabledTime Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| DatePickerRangeDisabledTime | 范围形态的不可选择时间判定，`side` 标识当前作用在起点还是终点 | (timestamp: number, side: 'start' &#124; 'end') => [DatePickerDisabledTimeUnits](#datepickerdisabledtimeunits-type) | undefined |

### DatePickerDisabledTimeUnits Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| disabledHours | 禁用的「时」 | () => number[] | undefined |
| disabledMinutes | 禁用的「分」，入参为选中的「时」 | (hour: number) => number[] | undefined |
| disabledSeconds | 禁用的「秒」，入参为选中的「时」「分」 | (hour: number, minute: number) => number[] | undefined |

### DatePickerTimeProps Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| hourStep | 「时」的步长，须能整除 `24`，否则按 `1` 处理 | number | 1 |
| minuteStep | 「分」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| secondStep | 「秒」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| use12Hours | 是否使用 12 小时制，与 12 小时制格式（`hh`）配合使用 | boolean | false |
| hideDisabledOptions | 是否隐藏禁用的选项 | boolean | false |

### DatePickerPreset Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| label | 预设名称 | string &#124; VNode | - |
| value | 预设值：单选形态为一个时间戳，范围形态为两段元组；可为返回预设值的函数（点击时才求值） | number &#124; [number, number] &#124; (() => number &#124; [number, number]) | - |

### DefaultFormat Value

| 类型 | 值 |
| :-- | :-- |
| date | 'yyyy-MM-dd' |
| datetime | 'yyyy-MM-dd HH:mm:ss' |
| week | 'yyyy-ww' |
| month | 'yyyy-MM' |
| quarter | 'yyyy-QQ' |
| year | 'yyyy' |
| daterange | 'yyyy-MM-dd' |
| datetimerange | 'yyyy-MM-dd HH:mm:ss' |
| monthrange | 'yyyy-MM' |
| quarterrange | 'yyyy-QQ' |
| yearrange | 'yyyy' |

### format 支持的格式化占位符列表

`format` / `valueFormat` 采用 [date-fns](https://date-fns.org/v4.1.0/docs/format) 占位符，常用占位符：

| 标识 | 示例 | 描述 |
| :-- | :-- | :-- |
| yy | 26 | 年，两位数 |
| yyyy | 2026 | 年，四位数 |
| M | 1-12 | 月 |
| MM | 01-12 | 月，两位数 |
| d | 1-31 | 日 |
| dd | 01-31 | 日，两位数 |
| h | 1-12 | 小时，12 小时制 |
| hh | 01-12 | 小时，12 小时制，两位数 |
| H | 0-23 | 小时 |
| HH | 00-23 | 小时，两位数 |
| m | 0-59 | 分钟 |
| mm | 00-59 | 分钟，两位数 |
| s | 0-59 | 秒 |
| ss | 00-59 | 秒，两位数 |
| ww | 01-53 | 第几周，两位数 |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| suffixIcon | 自定义选择框后缀图标 | v-slot:suffixIcon |
| separator | 范围形态两段之间的分隔符 | v-slot:separator |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| focus | 使选择器获取焦点 | () => void |
| blur | 使选择器失去焦点 | () => void |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| change | 值变化时的回调 | (value: number &#124; [number &#124; null, number &#124; null] &#124; null, formattedValue: string &#124; [string, string] &#124; null) => void |
| calendarChange | 范围形态待选区间变化时的回调，`info.range` 标识本次改动落在哪一段 | (value: [number &#124; null, number &#124; null] &#124; null, formattedValue: [string, string] &#124; null, info: { range: 'start' &#124; 'end' }) => void |
| ok | 带时间的形态点击「确定」时的回调 | (value: number &#124; [number &#124; null, number &#124; null] &#124; null, formattedValue: string &#124; [string, string] &#124; null) => void |
| openChange | 面板展开收起时的回调 | (open: boolean) => void |
| panelChange | 面板视图切换时的回调 | (value: number, mode: string) => void |
| focus | 输入框获取焦点时的回调 | (event: FocusEvent) => void |
| blur | 输入框失去焦点时的回调 | (event: FocusEvent) => void |
