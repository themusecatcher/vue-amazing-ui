<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CSSProperties } from 'vue'
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
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
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
// 周格式用例：周年占位符只能取 ISO 口径（RRRR）——与周序号（II）配对才可解析，详见下方 format 用例说明；该用例与官方一致取当天值
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
// 逐段禁用用例：起点段禁用且持有值（起点不可输入但值仍展示）、终点段可编辑；被禁用段有值才能展示其日期约束
const disabledSideRangeInit = initialRange(-3, 0)
const disabledSideRangeValue = ref<[number, number] | null>(disabledSideRangeInit)
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
// 定制日期单元格用例：单日期与日期范围各持一组值，初始值均为空
const dateRenderValue = ref<number | null>(null)
const dateRenderRangeValue = ref<[number, number] | null>(null)
/** 定制日期单元格：每月 1 号描一圈边框（单元格内层块高 24px，自定义节点须按 border-box 等高，否则外框会把圆圈撑高 2px） */
function firstDayCellStyle(dayOfMonth: number): CSSProperties {
  const cellStyle: CSSProperties = { boxSizing: 'border-box', height: '24px' }
  return dayOfMonth === 1 ? { ...cellStyle, border: '1px solid #1677ff', borderRadius: '50%' } : cellStyle
}
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
/** 时间面板的禁用单位 */
interface DisabledTimeUnits {
  disabledHours: () => number[]
  disabledMinutes: (currentHour: number) => number[]
  disabledSeconds: (currentHour: number, currentMinute: number) => number[]
}
/**
 * 由边界时刻的时分秒构造禁用单位：逐级判定（只有高一级与边界相同，下一级才有额外禁用项），边界时刻本身视为越界
 *
 * @param direction `notLaterThan` 禁用早于等于边界的时刻（终点侧用）、`notEarlierThan` 禁用晚于等于边界的时刻（起点侧用）
 */
function disabledTimeUnitsByBoundary(
  hour: number,
  minute: number,
  second: number,
  direction: 'notLaterThan' | 'notEarlierThan'
): DisabledTimeUnits {
  if (direction === 'notLaterThan') {
    return {
      disabledHours: () => range(0, hour),
      disabledMinutes: (currentHour: number) => (currentHour === hour ? range(0, minute) : []),
      disabledSeconds: (currentHour: number, currentMinute: number) =>
        currentHour === hour && currentMinute === minute ? range(0, second + 1) : []
    }
  }
  return {
    disabledHours: () => range(hour + 1, 24),
    disabledMinutes: (currentHour: number) => (currentHour === hour ? range(minute + 1, 60) : []),
    disabledSeconds: (currentHour: number, currentMinute: number) =>
      currentHour === hour && currentMinute === minute ? range(second + 1, 60) : []
  }
}
/**
 * 同一天内的时间约束：跨天则无额外禁用项（整日越界由内核按激活段禁用）
 *
 * @param boundary 约束边界的时刻（终点侧为起点、起点侧为终点）
 * @param timestamp 面板当前所编辑的时刻
 */
function disabledUnitsNotLaterThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  return disabledTimeUnitsByBoundary(getHours(boundary), getMinutes(boundary), getSeconds(boundary), 'notLaterThan')
}
/** 同 disabledUnitsNotLaterThan，方向相反：禁用晚于边界时刻的时间单位 */
function disabledUnitsNotEarlierThan(boundary: number, timestamp: number) {
  if (!isSameDay(timestamp, boundary)) {
    return {}
  }
  return disabledTimeUnitsByBoundary(getHours(boundary), getMinutes(boundary), getSeconds(boundary), 'notEarlierThan')
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
      <DatePicker v-model:value="weekValue" type="week" placeholder="请选择周" />
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
      <!-- 周形态的周年占位符取 ISO 口径（RRRR），与周序号（II）配对才可解析 -->
      <DatePicker v-model:value="weekFormatValue" type="week" format="RRRR年第II周" placeholder="请选择周" />
      <DatePicker
        v-model:value="rangeFormatValue"
        type="daterange"
        format="yyyy/MM/dd"
        :placeholder="rangePlaceholder"
      />
    </Space>
    <h2 class="mt30 mb10">范围选择器</h2>
    <p class="mb10">通过设置 <code>type</code> 属性，指定范围选择器类型</p>
    <Space vertical>
      <DatePicker v-model:value="rangeValue" type="daterange" :placeholder="rangePlaceholder" />
      <DatePicker v-model:value="weekRangeValue" type="weekrange" :placeholder="rangePlaceholder" />
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
    <h2 class="mt30 mb10">切换不同的选择器</h2>
    <p class="mb10">
      提供选择器，自由切换不同类型的日期选择器，常用于日期筛选场合；时间选择由 <code>TimePicker</code>
      组件承担，故分段项不含「时间」项
    </p>
    <Space vertical>
      <Segmented v-model:value="switchableType" :options="switchableOptions" />
      <DatePicker v-model:value="switchableValue" :type="switchableType" :placeholder="switchablePlaceholder" />
    </Space>
    <h2 class="mt30 mb10">日期时间选择</h2>
    <p class="mb10">
      <code>type="datetime"</code> 增加选择时间功能，时间面板选项经 <code>timePickerProps</code>
      透传；展开期间的选择只落在草稿值上，点「确定」或「此刻」才提交，关闭面板则丢弃草稿
    </p>
    <DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />
    <p class="mt30 mb10">分钟按 <code>5</code> 分钟步长选择</p>
    <DatePicker
      v-model:value="minuteStepValue"
      type="datetime"
      :time-picker-props="{ minuteStep: 5 }"
      placeholder="请选择日期时间"
    />
    <p class="mt30 mb10"
      ><code>12</code> 小时制：<code>use12Hours</code> 与 <code>12</code> 小时制格式（<code>hh</code>）配合使用</p
    >
    <DatePicker
      v-model:value="twelveHourValue"
      type="datetime"
      format="yyyy-MM-dd hh:mm:ss"
      :time-picker-props="{ use12Hours: true }"
      placeholder="请选择日期时间"
    />
    <p class="mt30 mb10">隐藏「此刻」快捷</p>
    <DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />
    <h2 class="mt30 mb10">事件</h2>
    <p class="mb10">
      单选形态绑定
      <code>change</code
      >、<code>openChange</code>、<code>panelChange</code>、<code>focus</code>、<code>blur</code>，范围形态绑定
      <code>change</code>、<code>calendarChange</code>，带时间的形态还可绑定
      <code>ok</code>；各事件的参数都会打印到控制台
    </p>
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
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical>
      <DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />
      <DatePicker disabled v-model:value="disabledMonthValue" type="month" placeholder="请选择月份" />
      <DatePicker disabled v-model:value="disabledFullRangeValue" type="daterange" :placeholder="rangePlaceholder" />
    </Space>
    <p class="mt30 mb10">
      范围形态的 <code>disabled</code> 可传两段元组逐段禁用，被禁用的段不可输入、面板也不整体置灰
    </p>
    <DatePicker
      v-model:value="disabledSideRangeValue"
      type="daterange"
      :disabled="[true, false]"
      :placeholder="rangePlaceholder"
    />
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
    <p class="mt30 mb10">
      用 <code>time-picker-props</code> 的 <code>hideDisabledOptions</code>
      把禁用的时分秒从面板中隐藏（而非置灰），适合禁用项过多的场景
    </p>
    <DatePicker
      v-model:value="hideDisabledOptionsValue"
      type="datetime"
      :disabled-date="disabledDateTodayOrBefore"
      :disabled-time="disabledDateTimeUnits"
      :time-picker-props="{ hideDisabledOptions: true }"
      placeholder="请选择日期时间"
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
    <h2 class="mt30 mb10">额外的页脚</h2>
    <p class="mb10">用 <code>renderExtraFooter</code> 在面板底部追加额外内容，渲染在「今天」「确定」等操作行之上</p>
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
    <h2 class="mt30 mb10">三种大小</h2>
    <Space vertical>
      <RadioGroup v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
      <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
      <DatePicker v-model:value="sizeMonthValue" type="month" :size="sizeValue" placeholder="请选择月份" />
      <DatePicker v-model:value="sizeRangeValue" type="daterange" :size="sizeValue" :placeholder="rangePlaceholder" />
      <DatePicker v-model:value="sizeWeekValue" type="week" :size="sizeValue" placeholder="请选择周" />
    </Space>
    <h2 class="mt30 mb10">定制日期单元格</h2>
    <p class="mb10"
      >用 <code>dateRender</code> 自定义日期单元格的内容与样式，入参 <code>current</code> 为该格日期的零点时间戳</p
    >
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
      <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
      <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
      <DatePicker v-model:value="errorRangeValue" type="daterange" status="error" :placeholder="rangePlaceholder" />
      <DatePicker v-model:value="warningRangeValue" type="daterange" status="warning" :placeholder="rangePlaceholder" />
    </Space>
    <h2 class="mt30 mb10">无边框</h2>
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
        :placeholder="rangePlaceholder"
      />
      <DatePicker
        v-model:value="borderlessMonthRangeValue"
        type="monthrange"
        :bordered="false"
        :placeholder="rangePlaceholder"
      />
      <DatePicker
        v-model:value="borderlessQuarterRangeValue"
        type="quarterrange"
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
    <h2 class="mt30 mb10">键盘操作</h2>
    <p class="mb10">
      面板展开后按 <code>Tab</code> 把键盘交给面板，方向键按当前面板层级的粒度移动光标、<code>Enter</code>
      提交；带时间的形态下 <code>Tab</code> 在日期与时间两列之间切换，非活动列淡化
    </p>
    <Space vertical>
      <DatePicker v-model:value="keyboardValue" placeholder="请选择日期" />
      <DatePicker v-model:value="keyboardRangeValue" type="daterange" :placeholder="rangePlaceholder" />
      <DatePicker v-model:value="keyboardDateTimeValue" type="datetime" placeholder="请选择日期时间" />
    </Space>
    <h2 class="mt30 mb10">按段默认时刻</h2>
    <p class="mb10">
      <code>defaultTime</code> 指定空草稿时的默认时分秒，范围形态可传两段元组按段指定（起点 <code>00:00:00</code>、终点
      <code>23:59:59</code>）；某段为 <code>undefined</code> 时该段退回当前时刻
    </p>
    <DatePicker
      v-model:value="defaultTimeRangeValue"
      type="datetimerange"
      :default-time="rangeDefaultTime"
      :placeholder="rangePlaceholder"
    />
  </div>
</template>
