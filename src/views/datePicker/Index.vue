<script setup lang="ts">
import { ref } from 'vue'
import {
  addDays,
  addMonths,
  addYears,
  differenceInCalendarDays,
  endOfDay,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  isSameDay,
  setHours,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfYear
} from 'date-fns'
import type { DatePickerProps } from 'vue-amazing-ui'
/** 单日期用例的初始值：当天（`offsetDays` 可偏移） */
function initialDate(offsetDays: number = 0): number {
  return addDays(new Date(), offsetDays).getTime()
}
/** 周末用例的初始值：当天是周六 / 周日时顺延到下一周周一，避免默认值本身落在被禁用的日期上 */
function initialWeekday(): number {
  const day = getDay(new Date())
  if (day === 6) {
    return addDays(new Date(), 2).getTime()
  }
  if (day === 0) {
    return addDays(new Date(), 1).getTime()
  }
  return new Date().getTime()
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
const weekendValue = ref<number | null>(initialWeekday())
const sizeCaseValue = ref<number | null>(initialDate())
const suffixValue = ref<number | null>(initialDate())
const warningValue = ref<number | null>(initialDate())
const errorValue = ref<number | null>(initialDate())
const borderlessValue = ref<number | null>(initialDate())
const placementBottomLeftValue = ref<number | null>(initialDate())
const placementBottomRightValue = ref<number | null>(initialDate())
const placementTopLeftValue = ref<number | null>(initialDate())
const placementTopRightValue = ref<number | null>(initialDate())
// 月 / 季 / 年形态用例：初始值取当前月首日 / 季首日 / 年首日，与形态的粒度一致
const monthValue = ref<number | null>(startOfMonth(new Date()).getTime())
const quarterValue = ref<number | null>(startOfQuarter(new Date()).getTime())
const yearValue = ref<number | null>(startOfYear(new Date()).getTime())
const monthFormatValue = ref<number | null>(startOfMonth(new Date()).getTime())
const disabledMonthValue = ref<number | null>(startOfMonth(new Date()).getTime())
const disabledMonthBeforeValue = ref<number | null>(startOfMonth(new Date()).getTime())
const sizeMonthValue = ref<number | null>(startOfMonth(new Date()).getTime())
// 月 / 季 / 年范围用例：起点取过去、终点取未来，使区间跨越多个格
const monthRangeValue = ref<[number, number] | null>([
  startOfMonth(addMonths(new Date(), -2)).getTime(),
  startOfMonth(addMonths(new Date(), 2)).getTime()
])
const quarterRangeValue = ref<[number, number] | null>([
  startOfQuarter(addMonths(new Date(), -3)).getTime(),
  startOfQuarter(addMonths(new Date(), 3)).getTime()
])
const yearRangeValue = ref<[number, number] | null>([
  startOfYear(addYears(new Date(), -1)).getTime(),
  startOfYear(addYears(new Date(), 1)).getTime()
])
const presetMonthRangeValue = ref<[number, number] | null>(null)
// 无边框用例的月 / 季 / 年形态：各持一组值，不与其它用例联动
const borderlessMonthValue = ref<number | null>(startOfMonth(new Date()).getTime())
const borderlessQuarterValue = ref<number | null>(startOfQuarter(new Date()).getTime())
const borderlessYearValue = ref<number | null>(startOfYear(new Date()).getTime())
const borderlessMonthRangeValue = ref<[number, number] | null>([
  startOfMonth(addMonths(new Date(), -1)).getTime(),
  startOfMonth(addMonths(new Date(), 1)).getTime()
])
const borderlessYearRangeValue = ref<[number, number] | null>([
  startOfYear(addYears(new Date(), -1)).getTime(),
  startOfYear(addYears(new Date(), 1)).getTime()
])
// 月范围用例的预设：值同样支持时间戳与函数（此处为「近 N 个月」两个区间）
const monthRangePresets: NonNullable<DatePickerProps['presets']> = [
  {
    label: '近 3 个月',
    value: () => [startOfMonth(addMonths(new Date(), -2)).getTime(), startOfMonth(new Date()).getTime()]
  },
  {
    label: '近半年',
    value: () => [startOfMonth(addMonths(new Date(), -5)).getTime(), startOfMonth(new Date()).getTime()]
  }
]
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
/** 不可选择今天之前的月份（粒度为整月：整月都早于今天才算禁用） */
function disabledMonthBefore(timestamp: number): boolean {
  return endOfDay(timestamp).getTime() < startOfDay(new Date()).getTime()
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <DatePicker v-model:value="basicValue" placeholder="请选择日期" />
      <DatePicker v-model:value="monthValue" type="month" placeholder="请选择月份" />
      <DatePicker v-model:value="quarterValue" type="quarter" placeholder="请选择季度" />
      <DatePicker v-model:value="yearValue" type="year" placeholder="请选择年份" />
    </Space>
    <h2 class="mt30 mb10">日期格式</h2>
    <p class="mb10">使用 <code>format</code> 定制展示格式</p>
    <Space vertical>
      <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
      <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
      <DatePicker v-model:value="monthFormatValue" type="month" format="yyyy年MM月" placeholder="请选择月份" />
    </Space>
    <h2 class="mt30 mb10">范围选择器</h2>
    <p class="mb10">通过设置 <code>type</code> 属性，指定范围选择器类型</p>
    <Space vertical>
      <DatePicker v-model:value="rangeValue" type="daterange" :placeholder="rangePlaceholder" />
      <DatePicker v-model:value="monthRangeValue" type="monthrange" :placeholder="rangePlaceholder" />
      <DatePicker v-model:value="quarterRangeValue" type="quarterrange" :placeholder="rangePlaceholder" />
      <DatePicker v-model:value="yearRangeValue" type="yearrange" :placeholder="rangePlaceholder" />
    </Space>
    <p class="mt30 mb10">
      <code>type="datetimerange"</code>
      在范围形态上叠加时间面板：两段共用同一个日期时间面板，点「确定」提交当前段并自动切到另一端，两段都确定后才收起；展开期间的选择只落在草稿上，关闭面板则丢弃草稿；配合
      <code>disabledTime</code> 可让终点只选「晚于起点」的时分秒（日期整日越界由内核按激活段自动禁用）
    </p>
    <DatePicker
      v-model:value="dateTimeRangeValue"
      type="datetimerange"
      :disabled-time="disabledDateTimeRangeTime"
      :placeholder="rangePlaceholder"
    />
    <h2 class="mt30 mb10">日期时间选择</h2>
    <p class="mb10">
      <code>type="datetime"</code> 增加选择时间功能，时间面板选项经 <code>timePickerProps</code>
      透传；展开期间的选择只落在草稿值上，点「确定」或「此刻」才提交，关闭面板则丢弃草稿
    </p>
    <DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />
    <p class="mt30 mb10">分钟按 5 分钟步长选择</p>
    <DatePicker
      v-model:value="minuteStepValue"
      type="datetime"
      :time-picker-props="{ minuteStep: 5 }"
      placeholder="请选择日期时间"
    />
    <p class="mt30 mb10">12 小时制：<code>use12Hours</code> 与 12 小时制格式（<code>hh</code>）配合使用</p>
    <DatePicker
      v-model:value="twelveHourValue"
      type="datetime"
      format="yyyy-MM-dd hh:mm:ss"
      :time-picker-props="{ use12Hours: true }"
      placeholder="请选择日期时间"
    />
    <p class="mt30 mb10">隐藏「此刻」快捷</p>
    <DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical>
      <DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />
      <DatePicker disabled v-model:value="disabledMonthValue" type="month" placeholder="请选择月份" />
    </Space>
    <h2 class="mt30 mb10">不可选择日期和时间</h2>
    <p class="mb10">
      <code>disabledDate</code> 与 <code>disabledTime</code> 分别禁止选择部分日期与时间，<code>disabledTime</code>
      需与带时间的形态配合使用
    </p>
    <DatePicker
      v-model:value="disabledDateTimeValue"
      type="datetime"
      :disabled-date="disabledDateTodayOrBefore"
      :disabled-time="disabledDateTimeUnits"
      :default-time="defaultTime"
      placeholder="请选择日期时间"
    />
    <p class="mt30 mb10">不可选择今天之后的日期</p>
    <DatePicker v-model:value="beforeTodayValue" :disabled-date="disabledDateBefore" placeholder="请选择日期" />
    <p class="mt30 mb10">只能选择未来七天内的日期</p>
    <DatePicker v-model:value="afterTodayValue" :disabled-date="disabledDateAfter" placeholder="请选择日期" />
    <p class="mt30 mb10">日期范围不可选择今天及之前（<code>disabledDate</code> 同时作用于两个面板）</p>
    <DatePicker
      v-model:value="disabledRangeValue"
      type="daterange"
      :disabled-date="disabledDateTodayOrBefore"
      :placeholder="rangePlaceholder"
    />
    <p class="mt30 mb10">不可选择周六与周日</p>
    <DatePicker v-model:value="weekendValue" :disabled-date="disabledWeekendDate" placeholder="请选择日期" />
    <p class="mt30 mb10">
      月形态不可选择今天之前的月份（<code>disabledDate</code> 的粒度为整月，整月都不可选该格才禁用）
    </p>
    <DatePicker
      v-model:value="disabledMonthBeforeValue"
      type="month"
      :disabled-date="disabledMonthBefore"
      placeholder="请选择月份"
    />
    <h2 class="mt30 mb10">选择不超过七天的范围</h2>
    <p class="mb10">用 <code>calendarChange</code> 记录草稿区间、用 <code>disabledDate</code> 读草稿收窄可选范围</p>
    <DatePicker
      v-model:value="sevenDaysValue"
      type="daterange"
      :disabled-date="disabledSevenDaysDate"
      :placeholder="rangePlaceholder"
      @calendar-change="onSevenDaysCalendarChange"
      @open-change="onSevenDaysOpenChange"
    />
    <h2 class="mt30 mb10">预设范围</h2>
    <p class="mb10">
      用 <code>presets</code> 预设常用日期与区间，点击即填入并收起；值可为时间戳，也可为返回时间戳的函数
    </p>
    <Space vertical>
      <DatePicker v-model:value="presetValue" :presets="datePresets" placeholder="请选择日期" />
      <DatePicker
        v-model:value="presetRangeValue"
        type="daterange"
        :presets="rangePresets"
        :placeholder="rangePlaceholder"
      />
      <DatePicker
        v-model:value="presetMonthRangeValue"
        type="monthrange"
        :presets="monthRangePresets"
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
    <h2 class="mt30 mb10">三种大小</h2>
    <Space vertical>
      <Radio v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
      <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
      <DatePicker v-model:value="sizeMonthValue" type="month" :size="sizeValue" placeholder="请选择月份" />
      <DatePicker v-model:value="sizeRangeValue" type="daterange" :size="sizeValue" :placeholder="rangePlaceholder" />
    </Space>
    <h2 class="mt30 mb10">自定义日期范围选择</h2>
    <p class="mb10">
      用两个独立的选择器组合出范围选择：<code>disabledDate</code> 按整日互相约束起止、<code>disabledTime</code>
      把同一天的时分秒精确到边界之后，<code>open</code>
      与展开事件联动，起点选完自动展开终点
    </p>
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
    <h2 class="mt30 mb10">后缀图标</h2>
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
    <h2 class="mt30 mb10">自定义状态</h2>
    <Space vertical>
      <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
      <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
    </Space>
    <h2 class="mt30 mb10">无边框</h2>
    <Space vertical>
      <DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />
      <DatePicker v-model:value="borderlessMonthValue" type="month" :bordered="false" placeholder="请选择月份" />
      <DatePicker v-model:value="borderlessQuarterValue" type="quarter" :bordered="false" placeholder="请选择季度" />
      <DatePicker v-model:value="borderlessYearValue" type="year" :bordered="false" placeholder="请选择年份" />
      <DatePicker
        v-model:value="borderlessMonthRangeValue"
        type="monthrange"
        :bordered="false"
        :placeholder="rangePlaceholder"
      />
      <DatePicker
        v-model:value="borderlessYearRangeValue"
        type="yearrange"
        :bordered="false"
        :placeholder="rangePlaceholder"
      />
    </Space>
    <h2 class="mt30 mb10">弹出位置</h2>
    <Space wrap>
      <DatePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
      <DatePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
      <DatePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
      <DatePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
    </Space>
  </div>
</template>
