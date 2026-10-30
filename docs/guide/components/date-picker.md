# 日期选择器 DatePicker

<GlobalElement />

_输入或选择日期的控件_

## 何时使用

- 需要输入或选择日期时
- 需要输入或选择日期与时间时

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfDay,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  isSameDay,
  startOfDay,
  startOfMonth
} from 'date-fns'
import type { CSSProperties } from 'vue'
import type { DatePickerProps } from 'vue-amazing-ui'
/** 演示用例的固定值：取固定日期（不随当天变化），便于截图与文档展示 */
const fixedDate = new Date(2026, 9, 10).getTime()
/** 范围用例的初始值：两端都归一到当日零点，与面板按天选择的粒度一致 */
function initialRange(startOffset: number = 0, endOffset: number = 7): [number, number] {
  const start = startOfDay(addDays(new Date(), startOffset)).getTime()
  const end = startOfDay(addDays(new Date(), endOffset)).getTime()
  return [start, end]
}
// 各用例独立持有一组值，避免在一个用例里选日期影响到其它用例
// 除「日期格式」「禁用」等少数需要展示已选值的用例外，其余用例均不设初始值
const basicValue = ref<number | null>(null)
const slashValue = ref<number | null>(fixedDate)
const chineseValue = ref<number | null>(fixedDate)
const rangeFormatValue = ref<[number, number] | null>([fixedDate, addDays(fixedDate, 5).getTime()])
const disabledValue = ref<number | null>(fixedDate)
const beforeTodayValue = ref<number | null>(null)
const afterTodayValue = ref<number | null>(null)
const weekendValue = ref<number | null>(null)
const sizeCaseValue = ref<number | null>(null)
const suffixValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
const errorValue = ref<number | null>(null)
const errorRangeValue = ref<[number, number] | null>(null)
const warningRangeValue = ref<[number, number] | null>(null)
const borderlessValue = ref<number | null>(null)
const placementBottomLeftValue = ref<number | null>(null)
const placementBottomRightValue = ref<number | null>(null)
const placementTopLeftValue = ref<number | null>(null)
const placementTopRightValue = ref<number | null>(null)
const placementRangeBottomLeftValue = ref<[number, number] | null>(null)
const placementRangeTopLeftValue = ref<[number, number] | null>(null)
// 键盘操作用例：日期 / 范围 / 日期时间各一；无初始值时光标以面板视图日期（当天）为起点，方向键同样可操作
const keyboardValue = ref<number | null>(null)
const keyboardRangeValue = ref<[number, number] | null>(null)
const keyboardDateTimeValue = ref<number | null>(null)
// 周形态用例：面板按 ISO 周成行高亮，展示格式为 ISO 周年 + 周序号，带「周」字后缀
const weekValue = ref<number | null>(null)
// 月 / 季 / 年形态用例：初始值为空
const monthValue = ref<number | null>(null)
const quarterValue = ref<number | null>(null)
const yearValue = ref<number | null>(null)
const monthFormatValue = ref<number | null>(startOfMonth(fixedDate).getTime())
// 周格式用例：周年占位符只能取 ISO 口径（RRRR）——与周序号（II）配对才可解析；该用例与官方一致取当天值
const weekFormatValue = ref<number | null>(Date.now())
const disabledMonthValue = ref<number | null>(startOfMonth(fixedDate).getTime())
const disabledFullRangeValue = ref<[number, number] | null>([fixedDate, fixedDate])
const disabledMonthBeforeValue = ref<number | null>(null)
const sizeMonthValue = ref<number | null>(null)
const sizeWeekValue = ref<number | null>(null)
// 月 / 季 / 年范围用例：初始值为空
const monthRangeValue = ref<[number, number] | null>(null)
const quarterRangeValue = ref<[number, number] | null>(null)
const yearRangeValue = ref<[number, number] | null>(null)
// 周范围用例：初始值为空
const weekRangeValue = ref<[number, number] | null>(null)
const presetMonthRangeValue = ref<[number, number] | null>(null)
// 无边框用例的月 / 季 / 年形态：各持一组值，不与其它用例联动；初始值均为空
const borderlessMonthValue = ref<number | null>(null)
const borderlessQuarterValue = ref<number | null>(null)
const borderlessYearValue = ref<number | null>(null)
const borderlessMonthRangeValue = ref<[number, number] | null>(null)
const borderlessYearRangeValue = ref<[number, number] | null>(null)
const borderlessWeekValue = ref<number | null>(null)
const borderlessWeekRangeValue = ref<[number, number] | null>(null)
const borderlessDateRangeValue = ref<[number, number] | null>(null)
const borderlessQuarterRangeValue = ref<[number, number] | null>(null)
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
// 范围用例：主用例的日期范围形态，初始值为空
const rangeValue = ref<[number, number] | null>(null)
const sizeRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
// 其余范围形态的提示文字按形态区分（周 / 月 / 季 / 年各有独立文案）
const weekRangePlaceholder: [string, string] = ['开始周', '结束周']
const monthRangePlaceholder: [string, string] = ['开始月份', '结束月份']
const quarterRangePlaceholder: [string, string] = ['开始季度', '结束季度']
const yearRangePlaceholder: [string, string] = ['开始年份', '结束年份']
// 切换不同的选择器用例：分段控件切换形态，各形态共用同一个绑定值
type SwitchableType = 'date' | 'week' | 'month' | 'quarter' | 'year'
const switchableType = ref<SwitchableType>('date')
const switchableValue = ref<number | null>(null)
const switchableOptions: { label: string; value: SwitchableType }[] = [
  { label: '日期', value: 'date' },
  { label: '周', value: 'week' },
  { label: '月份', value: 'month' },
  { label: '季度', value: 'quarter' },
  { label: '年份', value: 'year' }
]
/** 切换选择器的提示文字：随形态切换，与各形态基本用例的提示保持一致 */
const switchablePlaceholder = computed(() => {
  const placeholderMap: Record<SwitchableType, string> = {
    date: '请选择日期',
    week: '请选择周',
    month: '请选择月份',
    quarter: '请选择季度',
    year: '请选择年份'
  }
  return placeholderMap[switchableType.value]
})
// 日期时间范围用例：单个日期时间面板 + 两段切换，初始值为空
const dateTimeRangeValue = ref<[number, number] | null>(null)
// 按段默认时刻用例：范围形态按段指定（起点当日 0 点、终点当日 23:59:59）
const defaultTimeRangeValue = ref<[number, number] | null>(null)
/** 起点取当日 0 点、终点取当日 23:59:59（只取其中的时分秒，日期部分不参与落值） */
const rangeDefaultTime: NonNullable<DatePickerProps['defaultTime']> = [
  startOfDay(new Date()).getTime(),
  endOfDay(new Date()).getTime()
]
// 禁用日期用例的范围变体：初始为空值
const disabledRangeValue = ref<[number, number] | null>(null)
// 逐段禁用用例：起点段禁用且持有值（起点不可输入但值仍展示）、终点段可编辑
const disabledSideRangeValue = ref<[number, number] | null>(initialRange(-3, 0))
// 日期时间用例：主用例 + 时间面板选项 / 12 小时制 / 隐藏「此刻」三个细项，初始值均为空
const datetimeValue = ref<number | null>(null)
const minuteStepValue = ref<number | null>(null)
const twelveHourValue = ref<number | null>(null)
const showNowValue = ref<number | null>(null)
// 事件用例：单选 / 范围 / 日期时间各一，绑定后可在控制台查看各事件的触发时机与参数；初始值均为空
const eventValue = ref<number | null>(null)
const eventRangeValue = ref<[number, number] | null>(null)
const eventDateTimeValue = ref<number | null>(null)
/** 值变化时的回调：值与格式化值双轨 */
function onEventChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('change', value, formattedValue)
}
/** 范围形态待选区间变化时的回调：`info.range` 标识本次改动落在哪一段 */
function onEventCalendarChange(
  value: [number | null, number | null] | null,
  formattedValue: [string, string] | null,
  info: { range: 'start' | 'end' }
): void {
  console.log('calendarChange', value, formattedValue, info)
}
/** 带时间的形态点击「确定」时的回调（「此刻」是快捷入口，不派发） */
function onEventOk(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('ok', value, formattedValue)
}
/** 面板展开收起时的回调 */
function onEventOpenChange(open: boolean): void {
  console.log('openChange', open)
}
/** 面板视图切换时的回调：`mode` 为切换后的视图层级 */
function onEventPanelChange(value: number, mode: string): void {
  console.log('panelChange', value, mode)
}
/** 输入框获取焦点时的回调 */
function onEventFocus(event: FocusEvent): void {
  console.log('focus', event)
}
/** 输入框失去焦点时的回调 */
function onEventBlur(event: FocusEvent): void {
  console.log('blur', event)
}
// 不可选择日期和时间用例：初始为空值，展开后再选择
const disabledDateTimeValue = ref<number | null>(null)
// 隐藏禁用项用例：与「不可选择日期和时间」同源，改用 timePickerProps 把禁用的时分秒从面板中隐藏
const hideDisabledOptionsValue = ref<number | null>(null)
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
// 定制日期单元格用例：单日期与日期范围各持一组值，初始值均为空
const dateRenderValue = ref<number | null>(null)
const dateRenderRangeValue = ref<[number, number] | null>(null)
/** 定制日期单元格：每月 1 号描一圈边框（单元格内层块高 24px，自定义节点须按 border-box 等高，否则外框会把圆圈撑高 2px） */
function firstDayCellStyle(dayOfMonth: number): CSSProperties {
  const cellStyle: CSSProperties = { boxSizing: 'border-box', height: '24px' }
  return dayOfMonth === 1 ? { ...cellStyle, border: '1px solid #1677ff', borderRadius: '50%' } : cellStyle
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

<Space vertical>
  <DatePicker v-model:value="basicValue" placeholder="请选择日期" />
  <DatePicker v-model:value="weekValue" type="week" placeholder="请选择周" />
  <DatePicker v-model:value="monthValue" type="month" placeholder="请选择月份" />
  <DatePicker v-model:value="quarterValue" type="quarter" placeholder="请选择季度" />
  <DatePicker v-model:value="yearValue" type="year" placeholder="请选择年份" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const basicValue = ref<number | null>(null)
const weekValue = ref<number | null>(null)
const monthValue = ref<number | null>(null)
const quarterValue = ref<number | null>(null)
const yearValue = ref<number | null>(null)
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="basicValue" placeholder="请选择日期" />
    <DatePicker v-model:value="weekValue" type="week" placeholder="请选择周" />
    <DatePicker v-model:value="monthValue" type="month" placeholder="请选择月份" />
    <DatePicker v-model:value="quarterValue" type="quarter" placeholder="请选择季度" />
    <DatePicker v-model:value="yearValue" type="year" placeholder="请选择年份" />
  </Space>
</template>
```

:::

## 日期格式

_使用 `format` 定制展示格式_

<br/>

<Space vertical>
  <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
  <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
  <DatePicker v-model:value="monthFormatValue" type="month" format="yyyy年MM月" placeholder="请选择月份" />
  <!-- 周形态的周年占位符取 ISO 口径（RRRR），与周序号（II）配对才可解析 -->
  <DatePicker v-model:value="weekFormatValue" type="week" format="RRRR年第II周" placeholder="请选择周" />
  <DatePicker v-model:value="rangeFormatValue" type="daterange" format="yyyy/MM/dd" :placeholder="rangePlaceholder" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { addDays, startOfMonth } from 'date-fns'
const fixedDate = new Date(2026, 9, 10).getTime()
const slashValue = ref<number | null>(fixedDate)
const chineseValue = ref<number | null>(fixedDate)
const monthFormatValue = ref<number | null>(startOfMonth(fixedDate).getTime())
const weekFormatValue = ref<number | null>(Date.now())
const rangeFormatValue = ref<[number, number] | null>([fixedDate, addDays(fixedDate, 5).getTime()])
const rangePlaceholder = ['开始日期', '结束日期']
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
    <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
    <DatePicker v-model:value="monthFormatValue" type="month" format="yyyy年MM月" placeholder="请选择月份" />
    <!-- 周形态的周年占位符取 ISO 口径（RRRR），与周序号（II）配对才可解析 -->
    <DatePicker v-model:value="weekFormatValue" type="week" format="RRRR年第II周" placeholder="请选择周" />
    <DatePicker v-model:value="rangeFormatValue" type="daterange" format="yyyy/MM/dd" :placeholder="rangePlaceholder" />
  </Space>
</template>
```

:::

## 范围选择器

_通过设置 `type` 属性，指定范围选择器类型_

<br/>

<Space vertical>
  <DatePicker v-model:value="rangeValue" type="daterange" :placeholder="rangePlaceholder" />
  <DatePicker v-model:value="weekRangeValue" type="weekrange" :placeholder="weekRangePlaceholder" />
  <DatePicker v-model:value="monthRangeValue" type="monthrange" :placeholder="monthRangePlaceholder" />
  <DatePicker v-model:value="quarterRangeValue" type="quarterrange" :placeholder="quarterRangePlaceholder" />
  <DatePicker v-model:value="yearRangeValue" type="yearrange" :placeholder="yearRangePlaceholder" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const rangeValue = ref<[number, number] | null>(null)
const weekRangeValue = ref<[number, number] | null>(null)
const monthRangeValue = ref<[number, number] | null>(null)
const quarterRangeValue = ref<[number, number] | null>(null)
const yearRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
// 其余范围形态的提示文字按形态区分（周 / 月 / 季 / 年各有独立文案）
const weekRangePlaceholder: [string, string] = ['开始周', '结束周']
const monthRangePlaceholder: [string, string] = ['开始月份', '结束月份']
const quarterRangePlaceholder: [string, string] = ['开始季度', '结束季度']
const yearRangePlaceholder: [string, string] = ['开始年份', '结束年份']
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="rangeValue" type="daterange" :placeholder="rangePlaceholder" />
    <DatePicker v-model:value="weekRangeValue" type="weekrange" :placeholder="weekRangePlaceholder" />
    <DatePicker v-model:value="monthRangeValue" type="monthrange" :placeholder="monthRangePlaceholder" />
    <DatePicker v-model:value="quarterRangeValue" type="quarterrange" :placeholder="quarterRangePlaceholder" />
    <DatePicker v-model:value="yearRangeValue" type="yearrange" :placeholder="yearRangePlaceholder" />
  </Space>
</template>
```

:::

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
import { getHours, getMinutes, getSeconds, isSameDay } from 'date-fns'
const dateTimeRangeValue = ref<[number, number] | null>(null)
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

:::

## 切换不同的选择器

_提供选择器，自由切换不同类型的日期选择器，常用于日期筛选场合；时间选择由 `TimePicker` 组件承担，故分段项不含「时间」项_

<br/>

<Space vertical>
  <Segmented v-model:value="switchableType" :options="switchableOptions" />
  <DatePicker v-model:value="switchableValue" :type="switchableType" :placeholder="switchablePlaceholder" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
type SwitchableType = 'date' | 'week' | 'month' | 'quarter' | 'year'
const switchableType = ref<SwitchableType>('date')
const switchableValue = ref<number | null>(null)
const switchableOptions: { label: string; value: SwitchableType }[] = [
  { label: '日期', value: 'date' },
  { label: '周', value: 'week' },
  { label: '月份', value: 'month' },
  { label: '季度', value: 'quarter' },
  { label: '年份', value: 'year' }
]
/** 切换选择器的提示文字：随形态切换，与各形态基本用例的提示保持一致 */
const switchablePlaceholder = computed(() => {
  const placeholderMap: Record<SwitchableType, string> = {
    date: '请选择日期',
    week: '请选择周',
    month: '请选择月份',
    quarter: '请选择季度',
    year: '请选择年份'
  }
  return placeholderMap[switchableType.value]
})
</script>
<template>
  <Space vertical>
    <Segmented v-model:value="switchableType" :options="switchableOptions" />
    <DatePicker v-model:value="switchableValue" :type="switchableType" :placeholder="switchablePlaceholder" />
  </Space>
</template>
```

:::

## 日期时间选择

_`type="datetime"` 增加选择时间功能，时间面板选项经 `timePickerProps` 透传；展开期间的选择只落在草稿值上，点「确定」或「此刻」才提交，关闭面板则丢弃草稿_

<br/>

<DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />

<br/>
<br/>

_分钟按 `5` 分钟步长选择_

<br/>

<DatePicker
  v-model:value="minuteStepValue"
  type="datetime"
  :time-picker-props="{ minuteStep: 5 }"
  placeholder="请选择日期时间"
/>

<br/>
<br/>

_`12` 小时制：`use12Hours` 与 `12` 小时制格式（`hh`）配合使用_

<br/>

<DatePicker
  v-model:value="twelveHourValue"
  type="datetime"
  format="yyyy-MM-dd hh:mm:ss"
  :time-picker-props="{ use12Hours: true }"
  placeholder="请选择日期时间"
/>

<br/>
<br/>

_隐藏「此刻」快捷_

<br/>

<DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const datetimeValue = ref<number | null>(null)
const minuteStepValue = ref<number | null>(null)
const twelveHourValue = ref<number | null>(null)
const showNowValue = ref<number | null>(null)
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

:::

## 事件

_单选形态绑定 `change`、`openChange`、`panelChange`、`focus`、`blur`，范围形态绑定 `change`、`calendarChange`，带时间的形态还可绑定 `ok`；各事件的参数都会打印到控制台_

<br/>

<Space vertical>
  <DatePicker
    v-model:value="eventValue"
    placeholder="请选择日期"
    @change="onEventChange"
    @open-change="onEventOpenChange"
    @panel-change="onEventPanelChange"
    @focus="onEventFocus"
    @blur="onEventBlur"
  />
  <DatePicker
    v-model:value="eventRangeValue"
    type="daterange"
    :placeholder="rangePlaceholder"
    @change="onEventChange"
    @calendar-change="onEventCalendarChange"
    @open-change="onEventOpenChange"
    @panel-change="onEventPanelChange"
  />
  <DatePicker
    v-model:value="eventDateTimeValue"
    type="datetime"
    placeholder="请选择日期时间"
    @change="onEventChange"
    @ok="onEventOk"
    @open-change="onEventOpenChange"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const eventValue = ref<number | null>(null)
const eventRangeValue = ref<[number, number] | null>(null)
const eventDateTimeValue = ref<number | null>(null)
const rangePlaceholder = ['开始日期', '结束日期']
/** 值变化时的回调：值与格式化值双轨 */
function onEventChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('change', value, formattedValue)
}
/** 范围形态待选区间变化时的回调：`info.range` 标识本次改动落在哪一段 */
function onEventCalendarChange(
  value: [number | null, number | null] | null,
  formattedValue: [string, string] | null,
  info: { range: 'start' | 'end' }
): void {
  console.log('calendarChange', value, formattedValue, info)
}
/** 带时间的形态点击「确定」时的回调（「此刻」是快捷入口，不派发） */
function onEventOk(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('ok', value, formattedValue)
}
/** 面板展开收起时的回调 */
function onEventOpenChange(open: boolean): void {
  console.log('openChange', open)
}
/** 面板视图切换时的回调：`mode` 为切换后的视图层级 */
function onEventPanelChange(value: number, mode: string): void {
  console.log('panelChange', value, mode)
}
/** 输入框获取焦点时的回调 */
function onEventFocus(event: FocusEvent): void {
  console.log('focus', event)
}
/** 输入框失去焦点时的回调 */
function onEventBlur(event: FocusEvent): void {
  console.log('blur', event)
}
</script>
<template>
  <Space vertical>
    <DatePicker
      v-model:value="eventValue"
      placeholder="请选择日期"
      @change="onEventChange"
      @open-change="onEventOpenChange"
      @panel-change="onEventPanelChange"
      @focus="onEventFocus"
      @blur="onEventBlur"
    />
    <DatePicker
      v-model:value="eventRangeValue"
      type="daterange"
      :placeholder="rangePlaceholder"
      @change="onEventChange"
      @calendar-change="onEventCalendarChange"
      @open-change="onEventOpenChange"
      @panel-change="onEventPanelChange"
    />
    <DatePicker
      v-model:value="eventDateTimeValue"
      type="datetime"
      placeholder="请选择日期时间"
      @change="onEventChange"
      @ok="onEventOk"
      @open-change="onEventOpenChange"
    />
  </Space>
</template>
```

:::

## 禁用

<Space vertical>
  <DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />
  <DatePicker disabled v-model:value="disabledMonthValue" type="month" placeholder="请选择月份" />
  <DatePicker disabled v-model:value="disabledFullRangeValue" type="daterange" :placeholder="rangePlaceholder" />
</Space>

<br/>
<br/>

_范围形态的 `disabled` 可传两段元组逐段禁用，被禁用的段不可输入、面板也不整体置灰_

<br/>

<DatePicker
  v-model:value="disabledSideRangeValue"
  type="daterange"
  :disabled="[true, false]"
  :placeholder="rangePlaceholder"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { startOfDay, startOfMonth, subDays } from 'date-fns'
const fixedDate = new Date(2026, 9, 10).getTime()
const disabledValue = ref<number | null>(fixedDate)
const disabledMonthValue = ref<number | null>(startOfMonth(fixedDate).getTime())
const disabledFullRangeValue = ref<[number, number] | null>([fixedDate, fixedDate])
// 起点段禁用且持有值：起点不可输入但值仍展示
const disabledSideRangeValue = ref<[number, number] | null>([
  startOfDay(subDays(new Date(), 3)).getTime(),
  startOfDay(new Date()).getTime()
])
const rangePlaceholder = ['开始日期', '结束日期']
</script>
<template>
  <Space vertical>
    <DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />
    <DatePicker disabled v-model:value="disabledMonthValue" type="month" placeholder="请选择月份" />
    <DatePicker disabled v-model:value="disabledFullRangeValue" type="daterange" :placeholder="rangePlaceholder" />
  </Space>
  <DatePicker
    v-model:value="disabledSideRangeValue"
    type="daterange"
    :disabled="[true, false]"
    :placeholder="rangePlaceholder"
  />
</template>
```

:::

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

<br/>
<br/>

_不可选择今天之后的日期_

<br/>

<DatePicker v-model:value="beforeTodayValue" :disabled-date="disabledDateBefore" placeholder="请选择日期" />

<br/>
<br/>

_只能选择未来七天内的日期_

<br/>

<DatePicker v-model:value="afterTodayValue" :disabled-date="disabledDateAfter" placeholder="请选择日期" />

<br/>
<br/>

_日期范围不可选择今天及之前（`disabledDate` 同时作用于两个面板）_

<br/>

<DatePicker
  v-model:value="disabledRangeValue"
  type="daterange"
  :disabled-date="disabledDateTodayOrBefore"
  :placeholder="rangePlaceholder"
/>

<br/>
<br/>

_不可选择周六与周日_

<br/>

<DatePicker v-model:value="weekendValue" :disabled-date="disabledWeekendDate" placeholder="请选择日期" />

<br/>
<br/>

_月形态不可选择今天之前的月份（`disabledDate` 的粒度为整月，整月都不可选该格才禁用）_

<br/>

<DatePicker
  v-model:value="disabledMonthBeforeValue"
  type="month"
  :disabled-date="disabledMonthBefore"
  placeholder="请选择月份"
/>

<br/>
<br/>

_用 `time-picker-props` 的 `hideDisabledOptions` 把禁用的时分秒从面板中隐藏（而非置灰），适合禁用项过多的场景_

<br/>

<DatePicker
  v-model:value="hideDisabledOptionsValue"
  type="datetime"
  :disabled-date="disabledDateTodayOrBefore"
  :disabled-time="disabledDateTimeUnits"
  :time-picker-props="{ hideDisabledOptions: true }"
  placeholder="请选择日期时间"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { addDays, endOfDay, getDay, startOfDay } from 'date-fns'
const disabledDateTimeValue = ref<number | null>(null)
const hideDisabledOptionsValue = ref<number | null>(null)
const disabledRangeValue = ref<[number, number] | null>(null)
const disabledMonthBeforeValue = ref<number | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
const beforeTodayValue = ref<number | null>(null)
const afterTodayValue = ref<number | null>(null)
const weekendValue = ref<number | null>(null)
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
function disabledMonthBefore(timestamp: number): boolean {
  return endOfDay(timestamp).getTime() < startOfDay(new Date()).getTime()
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
    <DatePicker
      v-model:value="disabledMonthBeforeValue"
      type="month"
      :disabled-date="disabledMonthBefore"
      placeholder="请选择月份"
    />
    <DatePicker
      v-model:value="hideDisabledOptionsValue"
      type="datetime"
      :disabled-date="disabledDateTodayOrBefore"
      :disabled-time="disabledDateTimeUnits"
      :time-picker-props="{ hideDisabledOptions: true }"
      placeholder="请选择日期时间"
    />
  </Space>
</template>
```

:::

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

:::

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
    v-model:value="presetMonthRangeValue"
    type="monthrange"
    :presets="monthRangePresets"
    :placeholder="monthRangePlaceholder"
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
import { addDays, addMonths, startOfDay, startOfMonth } from 'date-fns'
import type { DatePickerProps } from 'vue-amazing-ui'
const presetValue = ref<number | null>(null)
const presetRangeValue = ref<[number, number] | null>(null)
const presetMonthRangeValue = ref<[number, number] | null>(null)
const presetDateTimeRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
// 月范围的提示文字按形态区分
const monthRangePlaceholder: [string, string] = ['开始月份', '结束月份']
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
      v-model:value="presetMonthRangeValue"
      type="monthrange"
      :presets="monthRangePresets"
      :placeholder="monthRangePlaceholder"
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

:::

## 额外的页脚

_用 `renderExtraFooter` 在面板底部追加额外内容，渲染在「今天」「确定」等操作行之上_

<br/>

<Space vertical>
  <DatePicker placeholder="请选择日期">
    <template #renderExtraFooter>
      <span>extra footer</span>
    </template>
  </DatePicker>
  <DatePicker type="datetime" placeholder="请选择日期时间">
    <template #renderExtraFooter>
      <span>extra footer</span>
    </template>
  </DatePicker>
  <DatePicker type="daterange" :placeholder="rangePlaceholder">
    <template #renderExtraFooter>
      <span>extra footer</span>
    </template>
  </DatePicker>
  <DatePicker type="datetimerange" :placeholder="rangePlaceholder">
    <template #renderExtraFooter>
      <span>extra footer</span>
    </template>
  </DatePicker>
  <DatePicker type="month" placeholder="请选择月份">
    <template #renderExtraFooter>
      <span>extra footer</span>
    </template>
  </DatePicker>
</Space>

::: details Show Code

```vue
<template>
  <Space vertical>
    <DatePicker placeholder="请选择日期">
      <template #renderExtraFooter>
        <span>extra footer</span>
      </template>
    </DatePicker>
    <DatePicker type="datetime" placeholder="请选择日期时间">
      <template #renderExtraFooter>
        <span>extra footer</span>
      </template>
    </DatePicker>
    <DatePicker type="daterange" :placeholder="rangePlaceholder">
      <template #renderExtraFooter>
        <span>extra footer</span>
      </template>
    </DatePicker>
    <DatePicker type="datetimerange" :placeholder="rangePlaceholder">
      <template #renderExtraFooter>
        <span>extra footer</span>
      </template>
    </DatePicker>
    <DatePicker type="month" placeholder="请选择月份">
      <template #renderExtraFooter>
        <span>extra footer</span>
      </template>
    </DatePicker>
  </Space>
</template>
<script setup lang="ts">
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
</script>
```

:::

## 三种大小

<Space vertical>
  <RadioGroup v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
  <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
  <DatePicker v-model:value="sizeMonthValue" type="month" :size="sizeValue" placeholder="请选择月份" />
  <DatePicker
    v-model:value="sizeRangeValue"
    type="daterange"
    :size="sizeValue"
    :placeholder="rangePlaceholder"
  />
  <DatePicker v-model:value="sizeWeekValue" type="week" :size="sizeValue" placeholder="请选择周" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DatePickerProps } from 'vue-amazing-ui'
const sizeCaseValue = ref<number | null>(null)
const sizeMonthValue = ref<number | null>(null)
const sizeRangeValue = ref<[number, number] | null>(null)
const sizeWeekValue = ref<number | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
const sizeValue = ref<DatePickerProps['size']>('middle')
const sizeOptions: Array<{ label: string; value: NonNullable<DatePickerProps['size']> }> = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
</script>
<template>
  <Space vertical>
    <RadioGroup v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
    <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
    <DatePicker v-model:value="sizeMonthValue" type="month" :size="sizeValue" placeholder="请选择月份" />
    <DatePicker
      v-model:value="sizeRangeValue"
      type="daterange"
      :size="sizeValue"
      :placeholder="rangePlaceholder"
    />
    <DatePicker v-model:value="sizeWeekValue" type="week" :size="sizeValue" placeholder="请选择周" />
  </Space>
</template>
```

:::

## 定制日期单元格

_用 `dateRender` 自定义日期单元格的内容与样式，入参 `current` 为该格日期的零点时间戳_

<br/>

<Space vertical>
  <DatePicker v-model:value="dateRenderValue" placeholder="请选择日期">
    <template #dateRender="{ current }">
      <div :style="firstDayCellStyle(getDate(current))">{{ getDate(current) }}</div>
    </template>
  </DatePicker>
  <DatePicker v-model:value="dateRenderRangeValue" type="daterange" :placeholder="rangePlaceholder">
    <template #dateRender="{ current }">
      <div :style="firstDayCellStyle(getDate(current))">{{ getDate(current) }}</div>
    </template>
  </DatePicker>
</Space>

::: details Show Code

```vue
<template>
  <Space vertical>
    <DatePicker v-model:value="dateRenderValue" placeholder="请选择日期">
      <template #dateRender="{ current }">
        <div :style="firstDayCellStyle(getDate(current))">{{ getDate(current) }}</div>
      </template>
    </DatePicker>
    <DatePicker v-model:value="dateRenderRangeValue" type="daterange" :placeholder="rangePlaceholder">
      <template #dateRender="{ current }">
        <div :style="firstDayCellStyle(getDate(current))">{{ getDate(current) }}</div>
      </template>
    </DatePicker>
  </Space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import { getDate } from 'date-fns'
/** 定制日期单元格：每月 1 号描一圈边框（单元格内层块高 24px，自定义节点须按 border-box 等高，否则外框会把圆圈撑高 2px） */
function firstDayCellStyle(dayOfMonth: number): CSSProperties {
  const cellStyle: CSSProperties = { boxSizing: 'border-box', height: '24px' }
  return dayOfMonth === 1 ? { ...cellStyle, border: '1px solid #1677ff', borderRadius: '50%' } : cellStyle
}
const dateRenderValue = ref<number | null>(null)
const dateRenderRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
</script>
```

:::

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

:::

## 后缀图标

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
const suffixValue = ref<number | null>(null)
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

:::

## 自定义状态

<Space vertical>
  <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
  <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
  <DatePicker v-model:value="errorRangeValue" type="daterange" status="error" :placeholder="rangePlaceholder" />
  <DatePicker v-model:value="warningRangeValue" type="daterange" status="warning" :placeholder="rangePlaceholder" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
const errorRangeValue = ref<[number, number] | null>(null)
const warningRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
    <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
    <DatePicker v-model:value="errorRangeValue" type="daterange" status="error" :placeholder="rangePlaceholder" />
    <DatePicker v-model:value="warningRangeValue" type="daterange" status="warning" :placeholder="rangePlaceholder" />
  </Space>
</template>
```

:::

## 无边框

<Space vertical>
  <DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />
  <DatePicker v-model:value="borderlessWeekValue" type="week" :bordered="false" placeholder="请选择周" />
  <DatePicker v-model:value="borderlessMonthValue" type="month" :bordered="false" placeholder="请选择月份" />
  <DatePicker v-model:value="borderlessQuarterValue" type="quarter" :bordered="false" placeholder="请选择季度" />
  <DatePicker v-model:value="borderlessYearValue" type="year" :bordered="false" placeholder="请选择年份" />
  <DatePicker
    v-model:value="borderlessDateRangeValue"
    type="daterange"
    :bordered="false"
    :placeholder="rangePlaceholder"
  />
  <DatePicker
    v-model:value="borderlessWeekRangeValue"
    type="weekrange"
    :bordered="false"
    :placeholder="weekRangePlaceholder"
  />
  <DatePicker
    v-model:value="borderlessMonthRangeValue"
    type="monthrange"
    :bordered="false"
    :placeholder="monthRangePlaceholder"
  />
  <DatePicker
    v-model:value="borderlessQuarterRangeValue"
    type="quarterrange"
    :bordered="false"
    :placeholder="quarterRangePlaceholder"
  />
  <DatePicker
    v-model:value="borderlessYearRangeValue"
    type="yearrange"
    :bordered="false"
    :placeholder="yearRangePlaceholder"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const borderlessValue = ref<number | null>(null)
const borderlessWeekValue = ref<number | null>(null)
const borderlessMonthValue = ref<number | null>(null)
const borderlessQuarterValue = ref<number | null>(null)
const borderlessYearValue = ref<number | null>(null)
const borderlessDateRangeValue = ref<[number, number] | null>(null)
const borderlessWeekRangeValue = ref<[number, number] | null>(null)
const borderlessMonthRangeValue = ref<[number, number] | null>(null)
const borderlessQuarterRangeValue = ref<[number, number] | null>(null)
const borderlessYearRangeValue = ref<[number, number] | null>(null)
const rangePlaceholder: [string, string] = ['开始日期', '结束日期']
// 其余范围形态的提示文字按形态区分（周 / 月 / 季 / 年各有独立文案）
const weekRangePlaceholder: [string, string] = ['开始周', '结束周']
const monthRangePlaceholder: [string, string] = ['开始月份', '结束月份']
const quarterRangePlaceholder: [string, string] = ['开始季度', '结束季度']
const yearRangePlaceholder: [string, string] = ['开始年份', '结束年份']
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />
    <DatePicker v-model:value="borderlessWeekValue" type="week" :bordered="false" placeholder="请选择周" />
    <DatePicker v-model:value="borderlessMonthValue" type="month" :bordered="false" placeholder="请选择月份" />
    <DatePicker v-model:value="borderlessQuarterValue" type="quarter" :bordered="false" placeholder="请选择季度" />
    <DatePicker v-model:value="borderlessYearValue" type="year" :bordered="false" placeholder="请选择年份" />
    <DatePicker
      v-model:value="borderlessDateRangeValue"
      type="daterange"
      :bordered="false"
      :placeholder="rangePlaceholder"
    />
    <DatePicker
      v-model:value="borderlessWeekRangeValue"
      type="weekrange"
      :bordered="false"
      :placeholder="weekRangePlaceholder"
    />
    <DatePicker
      v-model:value="borderlessMonthRangeValue"
      type="monthrange"
      :bordered="false"
      :placeholder="monthRangePlaceholder"
    />
    <DatePicker
      v-model:value="borderlessQuarterRangeValue"
      type="quarterrange"
      :bordered="false"
      :placeholder="quarterRangePlaceholder"
    />
    <DatePicker
      v-model:value="borderlessYearRangeValue"
      type="yearrange"
      :bordered="false"
      :placeholder="yearRangePlaceholder"
    />
  </Space>
</template>
```

:::

## 弹出位置

<Space>
  <DatePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
  <DatePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
  <DatePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
  <DatePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
  <DatePicker
    v-model:value="placementRangeBottomLeftValue"
    type="daterange"
    placement="bottomLeft"
    :placeholder="rangePlaceholder"
  />
  <DatePicker
    v-model:value="placementRangeTopLeftValue"
    type="daterange"
    placement="topLeft"
    :placeholder="rangePlaceholder"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const bottomLeftValue = ref<number | null>(null)
const bottomRightValue = ref<number | null>(null)
const topLeftValue = ref<number | null>(null)
const topRightValue = ref<number | null>(null)
const rangeBottomLeftValue = ref<[number, number] | null>(null)
const rangeTopLeftValue = ref<[number, number] | null>(null)
const rangePlaceholder = ['开始日期', '结束日期']
</script>
<template>
  <Space>
    <DatePicker v-model:value="bottomLeftValue" placement="bottomLeft" placeholder="左下" />
    <DatePicker v-model:value="bottomRightValue" placement="bottomRight" placeholder="右下" />
    <DatePicker v-model:value="topLeftValue" placement="topLeft" placeholder="左上" />
    <DatePicker v-model:value="topRightValue" placement="topRight" placeholder="右上" />
    <DatePicker
      v-model:value="rangeBottomLeftValue"
      type="daterange"
      placement="bottomLeft"
      :placeholder="rangePlaceholder"
    />
    <DatePicker
      v-model:value="rangeTopLeftValue"
      type="daterange"
      placement="topLeft"
      :placeholder="rangePlaceholder"
    />
  </Space>
</template>
```

:::

## 键盘操作

_面板展开后按 `Tab` 把键盘交给面板，方向键按当前面板层级的粒度移动光标、`Enter` 提交；带时间的形态下 `Tab` 在日期与时间两列之间切换，非活动列淡化_

<br/>

<Space vertical>
  <DatePicker v-model:value="keyboardValue" placeholder="请选择日期" />
  <DatePicker v-model:value="keyboardRangeValue" type="daterange" :placeholder="rangePlaceholder" />
  <DatePicker v-model:value="keyboardDateTimeValue" type="datetime" placeholder="请选择日期时间" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const keyboardValue = ref<number | null>(null)
const keyboardRangeValue = ref<[number, number] | null>(null)
const keyboardDateTimeValue = ref<number | null>(null)
const rangePlaceholder = ['开始日期', '结束日期']
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="keyboardValue" placeholder="请选择日期" />
    <DatePicker v-model:value="keyboardRangeValue" type="daterange" :placeholder="rangePlaceholder" />
    <DatePicker v-model:value="keyboardDateTimeValue" type="datetime" placeholder="请选择日期时间" />
  </Space>
</template>
```

:::

## 按段默认时刻

_`defaultTime` 指定空草稿时的默认时分秒，范围形态可传两段元组按段指定（起点 `00:00:00`、终点 `23:59:59`）；某段为 `undefined` 时该段退回当前时刻_

<br/>

<DatePicker
  v-model:value="defaultTimeRangeValue"
  type="datetimerange"
  :default-time="rangeDefaultTime"
  :placeholder="rangePlaceholder"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { endOfDay, startOfDay } from 'date-fns'
const defaultTimeRangeValue = ref<[number, number] | null>(null)
const rangeDefaultTime = [startOfDay(new Date()).getTime(), endOfDay(new Date()).getTime()]
const rangePlaceholder = ['开始日期', '结束日期']
</script>
<template>
  <DatePicker
    v-model:value="defaultTimeRangeValue"
    type="datetimerange"
    :default-time="rangeDefaultTime"
    :placeholder="rangePlaceholder"
  />
</template>
```

:::

## APIs

### DatePicker Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 双向绑定值，毫秒时间戳；范围形态为两段元组，某段可为 `null` | number &#124; [number &#124; null, number &#124; null] &#124; null | null |
| formattedValue <Tag color="cyan">v-model</Tag> | 字符串轨道的双向绑定值，传入时以它为准（受控）；显示格式由 `format` / `valueFormat` 决定 | string &#124; [string, string] &#124; null | null |
| open <Tag color="cyan">v-model</Tag> | 面板是否展开 | boolean | false |
| type | 选择形态 | [DatePickerType](#datepickertype-type) | 'date' |
| format | 日期展示格式，参考 [format](https://date-fns.org/v4.1.0/docs/format) | string | [DefaultFormat](#defaultformat-value) |
| valueFormat | 绑定值格式，默认与 `format` 相同 | string | undefined |
| placeholder | 输入框提示文字，范围形态可传入两段文案 | string &#124; [string, string] | '' |
| defaultPickerValue | 面板初始日期（毫秒时间戳），默认取 `value` 或今天 | number | undefined |
| startDayOfWeek | 一周的开始是星期几，`0-6`，`0` 是周一；周形态恒按 `ISO` 周（周一起始），该属性对周形态不生效 | 0 &#124; 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6 | 0 |
| disabledDate | 不可选择的日期，入参为「当日零点」的毫秒时间戳；月 / 季 / 年形态下按整段判定（整段都不可选该格才禁用） | (timestamp: number) => boolean | undefined |
| disabledTime | 不可选择的时间，仅带时间的形态生效；入参为当前面板草稿值的时间戳，范围形态额外接收段标识 | [DatePickerDisabledTime](#datepickerdisabledtime-type) &#124; [DatePickerRangeDisabledTime](#datepickerrangedisabledtime-type) | undefined |
| defaultTime | 选中日期时的默认时分秒（只取其中的时分秒，不参与时间面板的预选展示）；范围形态可按段传入两段元组，某段为 `undefined` 时该段退回当前时刻 | number &#124; [number &#124; undefined, number &#124; undefined] | undefined |
| timePickerProps | 时间面板选项（步长 / `12` 小时制 / 隐藏禁用项） | [DatePickerTimeProps](#datepickertimeprops-type) | undefined |
| presets | 预设选项，点击即提交并收起 | [DatePickerPreset](#datepickerpreset-type)[] | [] |
| width | 选择器宽度，单位 `px`，不传时随内容自适应 | string &#124; number | undefined |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| status | 校验状态 | 'warning' &#124; 'error' | undefined |
| bordered | 是否展示边框 | boolean | true |
| disabled | 是否禁用；范围形态可传两段元组逐段禁用（被禁用的段不可输入，且该段日期被对端的值锁死） | boolean &#124; [boolean, boolean] | false |
| allowClear | 是否展示清除按钮 | boolean | true |
| allowEmpty | 范围形态各段是否允许为空，为空时该段可被单独清空并对外提交 | [boolean, boolean] | [false, false] |
| inputReadOnly | 输入框是否只读（避免移动端唤起键盘） | boolean | false |
| to | 面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 `'body'`) 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | undefined |
| placement | 面板弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomLeft' |
| showArrow | 范围形态的面板指示箭头是否展示：不传时跟随弹出方位（仅左侧对齐的 `bottomLeft` / `topLeft` 展示），`true` 始终展示、`false` 始终隐藏 | boolean | undefined |
| showToday | 是否展示面板底部的「今天」快捷，面板切到周 / 月 / 季 / 年视图时隐藏 | boolean | true |
| showNow | 是否展示面板底部的「此刻」快捷，仅带时间的形态生效 | boolean | true |
| dateRender | 自定义日期单元格的内容与样式（替换日号），单元格容器与选中 / 悬浮 / 区间底色仍由组件提供；入参 `current` 为该格日期的零点时间戳、`today` 为当前时刻时间戳 | (params: { current: number; today: number }) => VNode &#124; VNode[] | undefined |
| renderExtraFooter | 面板底部的额外页脚，渲染在「今天」「确定」等操作行之上 | () => VNode &#124; VNode[] | undefined |
| suffixIcon | 自定义选择框后缀图标 | VNode &#124; (() => VNode) | undefined |
| panelClass | 面板额外类名 | string | '' |
| panelStyle | 面板额外样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex | 面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |

### DatePickerType Type

| 名称 | 值 |
| :-- | :-- |
| DatePickerType | 'date' &#124; 'datetime' &#124; 'week' &#124; 'month' &#124; 'quarter' &#124; 'year' &#124; 'daterange' &#124; 'datetimerange' &#124; 'weekrange' &#124; 'monthrange' &#124; 'quarterrange' &#124; 'yearrange' |

### DatePickerDisabledTime Type

<br/>

不可选择的时间判定，入参为当前面板草稿值的时间戳。

| 名称 | 值 |
| :-- | :-- |
| DatePickerDisabledTime | (timestamp: number) => [DatePickerDisabledTimeUnits](#datepickerdisabledtimeunits-type) |

### DatePickerRangeDisabledTime Type

<br/>

范围形态的不可选择时间判定，`side` 标识当前作用在起点还是终点。

| 名称 | 值 |
| :-- | :-- |
| DatePickerRangeDisabledTime | (timestamp: number, side: 'start' &#124; 'end') => [DatePickerDisabledTimeUnits](#datepickerdisabledtimeunits-type) |

### DatePickerDisabledTimeUnits Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| disabledHours? | 禁用的「时」 | () => number[] |
| disabledMinutes? | 禁用的「分」，入参为选中的「时」 | (hour: number) => number[] |
| disabledSeconds? | 禁用的「秒」，入参为选中的「时」「分」 | (hour: number, minute: number) => number[] |

### DatePickerTimeProps Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| hourStep? | 「时」的步长，默认 `1`；须能整除 `24`，非法值按 `1` 处理 | number |
| minuteStep? | 「分」的步长，默认 `1`；须能整除 `60`，非法值按 `1` 处理 | number |
| secondStep? | 「秒」的步长，默认 `1`；须能整除 `60`，非法值按 `1` 处理 | number |
| use12Hours? | 是否使用 `12` 小时制，与 `12` 小时制格式（`hh`）配合使用 | boolean |
| hideDisabledOptions? | 是否隐藏禁用的选项 | boolean |

### DatePickerPreset Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| label | 预设名称 | string &#124; VNode |
| value | 预设值：单选形态为一个时间戳，范围形态为两段元组；可为返回预设值的函数（点击时才求值） | number &#124; [number, number] &#124; (() => number &#124; [number, number]) |

### DatePickerRangeInfo Type

<br/>

范围形态草稿变更的来源信息。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| range | 草稿变更落在哪一段 | 'start' &#124; 'end' |

### DefaultFormat Value

| 名称 | 值 |
| :-- | :-- |
| date | 'yyyy-MM-dd' |
| datetime | 'yyyy-MM-dd HH:mm:ss' |
| week | 'RRRR-II周' |
| month | 'yyyy-MM' |
| quarter | 'yyyy-QQQ' |
| year | 'yyyy' |
| daterange | 'yyyy-MM-dd' |
| datetimerange | 'yyyy-MM-dd HH:mm:ss' |
| weekrange | 'RRRR-II周' |
| monthrange | 'yyyy-MM' |
| quarterrange | 'yyyy-QQQ' |
| yearrange | 'yyyy' |

### format 支持的格式化占位符列表

<br/>

`format` / `valueFormat` 采用 [date-fns](https://date-fns.org/v4.1.0/docs/format) 占位符，常用占位符：

| 标识 | 示例 | 描述 |
| :-- | :-- | :-- |
| `yy` | 26 | 年，两位数 |
| `yyyy` | 2026 | 年，四位数 |
| `M` | 1-12 | 月 |
| `MM` | 01-12 | 月，两位数 |
| `Q` | 1-4 | 季度 |
| `QQQ` | Q1-Q4 | 季度，带 `Q` 前缀 |
| `d` | 1-31 | 日 |
| `dd` | 01-31 | 日，两位数 |
| `h` | 1-12 | 小时，`12` 小时制 |
| `hh` | 01-12 | 小时，`12` 小时制，两位数 |
| `H` | 0-23 | 小时 |
| `HH` | 00-23 | 小时，两位数 |
| `m` | 0-59 | 分钟 |
| `mm` | 00-59 | 分钟，两位数 |
| `s` | 0-59 | 秒 |
| `ss` | 00-59 | 秒，两位数 |
| `ww` | 01-53 | 第几周，两位数（本地周口径） |
| `II` | 01-53 | `ISO` 周序号，两位数 |
| `RRRR` | 2026 | `ISO` 周年，四位数 |

> 周形态的默认格式为 `RRRR-II周`（如 `2026-41周`）：「周」是字面量后缀，中文语境下用于指明该数字为周序号，不需要时传入 `format="RRRR-II"` 即可移除；`date-fns` 不允许「周年 + 本地周序号」同串（`yyyy` 与 `ww` 会解析失败），故周序号须与周年同为 `ISO` 口径。

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| dateRender | 自定义日期单元格的内容与样式（替换日号），优先于同名属性 | v-slot:dateRender |
| renderExtraFooter | 面板底部的额外页脚，优先于同名属性 | v-slot:renderExtraFooter |
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
| calendarChange | 范围形态待选区间变化时的回调，`info.range` 标识本次改动落在哪一段 | (value: [number &#124; null, number &#124; null] &#124; null, formattedValue: [string, string] &#124; null, info: [DatePickerRangeInfo](#datepickerrangeinfo-type)) => void |
| ok | 带时间的形态点击「确定」时的回调 | (value: number &#124; [number &#124; null, number &#124; null] &#124; null, formattedValue: string &#124; [string, string] &#124; null) => void |
| openChange | 面板展开收起时的回调 | (open: boolean) => void |
| panelChange | 面板视图切换时的回调 | (value: number, mode: string) => void |
| focus | 输入框获取焦点时的回调 | (event: FocusEvent) => void |
| blur | 输入框失去焦点时的回调 | (event: FocusEvent) => void |
