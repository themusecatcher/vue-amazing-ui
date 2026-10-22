<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { VNode } from 'vue'
import {
  addDays,
  addMonths,
  format,
  getDate,
  getDay,
  getMonth,
  getTime,
  getYear,
  startOfMonth,
  startOfYear
} from 'date-fns'
import Select, { type SelectOption, type SelectProps } from 'components/select'
import { RadioGroup, type RadioGroupOption, type RadioGroupProps } from 'components/radio'
import {
  formatTimestamp,
  handlePanelKeydown,
  isMonthFullyDisabled,
  isSameDayTimestamp,
  isSameMonthTimestamp,
  isYearFullyDisabled,
  parseTimestamp,
  startOfDayTimestamp,
  type PickerKeydownHandlers
} from 'components/picker'
import { useSlotsExist } from 'components/utils'
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type DefaultWeek = '一' | '二' | '三' | '四' | '五' | '六' | '日'

// select 事件的来源：年选择器 / 月（选择器或月面板格）/ 日期面板格 / 头部整体替换
export interface SelectInfo {
  source: 'year' | 'month' | 'date' | 'customize'
}
export interface Props {
  defaultValue?: string | number // 非受控初始值：同时决定初始面板日期与初始选中值，受控 value 优先
  valueFormat?: string // 被选中日期的格式，默认为时间戳；参考 format https://date-fns.org/v4.1.0/docs/format
  header?: string // 自定义日历头部内容
  display?: 'panel' | 'card' // 日历展示方式，面板 / 卡片
  mode?: 'month' | 'year' // 面板模式（受控）：月 / 年
  startDayOfWeek?: DayOfWeek // 一周的开始是星期几，0-6，0 是周一
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  validRange?: [string | number, string | number] // 可选日期区间，区间外的日期不可选，同时收窄年 / 月选项
  dateFormat?: (date: number, timestamp: number) => string // 自定义日期展示格式
  weekFormat?: (defaultWeek: DefaultWeek, week: number, timestamp: number) => string // 自定义星期展示格式
  monthFormat?: (month: number, timestamp: number) => string // 自定义月展示格式
  yearSelectProps?: SelectProps // 年选择器 props，参考 Select 组件 Props
  monthSelectProps?: SelectProps // 月选择器 props，参考 Select 组件 Props
  modeRadioProps?: RadioGroupProps // 模式切换器 props，参考 RadioGroup 组件 Props
}
// 头部整体替换插槽的入参：当前面板年月 / 模式、当前选中值，以及写回选中值与切换模式的回调
export interface HeaderFullSlotProps {
  year: number
  month: number
  mode: 'month' | 'year'
  value: string | number | undefined
  onChange: (value: string | number) => void
  onTypeChange: (mode: 'month' | 'year') => void
}
// 声明组件插槽类型
export interface CalendarSlots {
  header?: () => VNode[]
  headerFull?: (props: HeaderFullSlotProps) => VNode[]
  week?: (props: { defaultWeek: DefaultWeek; week: number; timestamp: number }) => VNode[]
  dateValue?: (props: DateItem) => VNode[]
  dateContent?: (props: DateItem) => VNode[]
  dateFull?: (props: DateItem) => VNode[]
  monthValue?: (props: MonthItem) => VNode[]
  monthContent?: (props: MonthItem) => VNode[]
  monthFull?: (props: MonthItem) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: undefined,
  valueFormat: undefined,
  header: undefined,
  display: 'panel',
  mode: 'month',
  startDayOfWeek: 0,
  disabledDate: undefined,
  validRange: undefined,
  dateFormat: undefined,
  weekFormat: undefined,
  monthFormat: undefined,
  yearSelectProps: () => ({}),
  monthSelectProps: () => ({}),
  modeRadioProps: () => ({})
})
defineSlots<CalendarSlots>()
// (v-model) 当前被选中的日期
const selectedValue = defineModel<string | number>('value')
export interface DateItem {
  type: 'date'
  dateObject: {
    date: number // 日期
    month: number // 月份 0-11
    year: number // 年份
  }
  timestamp: number // 当天开始的时间戳
  inCurrentMonth: boolean // 是否在当前月
  isCurrentDate: boolean // 是否为今天
}
export interface MonthItem {
  type: 'month'
  monthObject: {
    month: number // 月份 0-11
    year: number // 年份
  }
  timestamp: number // 当月开始的时间戳
  isCurrent: boolean // 是否为当前月
}
// 把对外值（时间戳或格式化串）归一为时间戳：格式未知或无法解析时返回 undefined
function toTimestamp(value: string | number): number | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (value === '') return undefined
  if (props.valueFormat === undefined || props.valueFormat === 'T') {
    const timestamp = Number(value)
    return Number.isFinite(timestamp) ? timestamp : undefined
  }
  return parseTimestamp(value, props.valueFormat) ?? undefined
}
// 可选区间：按当日零点归一（忽略时分秒），起止颠倒时归一为「小到大」
const validRangeTimestamp = computed<[number, number] | undefined>(() => {
  const range = props.validRange
  if (!range) return
  const startTimestamp = toTimestamp(range[0])
  const endTimestamp = toTimestamp(range[1])
  if (startTimestamp === undefined || endTimestamp === undefined) return
  const start = startOfDayTimestamp(startTimestamp)
  const end = startOfDayTimestamp(endTimestamp)
  return start <= end ? [start, end] : [end, start]
})
// 是否存在可造成「整层禁用（整月 / 整年不可选）」的来源：disabledDate 或 validRange 二者之一；
// 都没有时整月 / 整年必然可选，可跳过逐日扫描（年 / 月选项与月份格的禁用判定共用该口径）
const hasDisableSource = computed(() => Boolean(props.disabledDate) || validRangeTimestamp.value !== undefined)
// 初始面板日期：受控 value 优先，其次非受控 defaultValue，两者都缺省时取当天
const hasControlledValue = selectedValue.value !== undefined && selectedValue.value !== ''
const initialTimestamp =
  toTimestamp((hasControlledValue ? selectedValue.value : props.defaultValue) ?? '') ?? Date.now()
// 面板「今天」基准：跨零点后重新取当天，避免长驻页面中今天的高亮停在昨天
const todayTimestamp = ref<number>(startOfDayTimestamp(Date.now()))
let todayTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  todayTimer = setInterval(() => {
    const today = startOfDayTimestamp(Date.now())
    if (today !== todayTimestamp.value) todayTimestamp.value = today
  }, 60000)
})
onBeforeUnmount(() => {
  if (todayTimer) clearInterval(todayTimer)
})
const modeOptions = ref<RadioGroupOption[]>([
  {
    label: '月',
    value: 'month'
  },
  {
    label: '年',
    value: 'year'
  }
])
const calendarYear = ref<number>(getYear(initialTimestamp))
const calendarMonth = ref<number>(getMonth(initialTimestamp) + 1)
const calendarMode = ref<'month' | 'year'>(props.mode ?? 'month')
// 年份选项的区间锚点：面板展开期间冻结，选中年份后列表区间不随面板定位年平移
// （关闭动画期间列表内容保持原样、选中态就地生效；重新展开时才按当前年份重建并滚动到选中项）
const yearOptionsAnchor = ref<number>(calendarYear.value)
const yearSelectOpen = ref<boolean>(false)
const calendarDates = computed<DateItem[][]>(() => getCalendarDates())
const calendarMonths = computed<MonthItem[][]>(() => getCalendarMonths())
const yearOptions = computed<SelectOption[]>(() => getYearOptions())
const monthOptions = computed<SelectOption[]>(() => getMonthOptions())
const emits = defineEmits<{
  change: [value: string | number, dateObject?: DateItem['dateObject'] | MonthItem['monthObject']]
  panelChange: [value: string | number | undefined, info: { year: number; month?: number }, mode: 'month' | 'year']
  select: [value: string | number | undefined, info: SelectInfo]
}>()
const slotsExist = useSlotsExist(['header', 'headerFull'])
// 月面板网格列数：12 个月按 3 列 × 4 行排布，键盘上下移动一行即跨三个月
const MONTH_GRID_COLUMNS = 3
// 非受控初值：受控 value 缺省时，defaultValue 同时作为初始选中值
if (!hasControlledValue && props.defaultValue !== undefined && props.defaultValue !== '') {
  const defaultDateTimestamp = toTimestamp(props.defaultValue)
  if (defaultDateTimestamp !== undefined) selectedValue.value = formatDate(defaultDateTimestamp)
}
// 一周起始日的收敛值：入参越界（或非数字）时归一到 0-6，避免周标题与日期网格生成陷入死循环
const normalizedStartDay = computed<DayOfWeek>(() => {
  const day = Math.trunc(Number(props.startDayOfWeek))
  if (!Number.isFinite(day)) return 0
  return (((day % 7) + 7) % 7) as DayOfWeek
})
const defaultWeeks = computed(() => {
  const origin: DefaultWeek[] = ['一', '二', '三', '四', '五', '六', '日']
  const result: DefaultWeek[] = []
  result.push(origin[normalizedStartDay.value])
  let startDay = (normalizedStartDay.value + 1) % 7
  while (startDay !== normalizedStartDay.value) {
    result.push(origin[startDay])
    startDay = (startDay + 1) % 7
  }
  return result
})
// 选中值对应的时间戳：与对外值同口径解析，无法解析时视同无选中值
const selectedValueTimestamp = computed<number | undefined>(() => {
  const value = selectedValue.value
  if (value === undefined || value === null || value === '') return
  return toTimestamp(value)
})

const startOfMonthTimestamp = computed(() => {
  const firstDayOfMonth = new Date(calendarYear.value, calendarMonth.value - 1, 1)
  return firstDayOfMonth.getTime()
})
const showHeader = computed(() => {
  return slotsExist.header || props.header
})
watch(
  selectedValueTimestamp,
  (to) => {
    // 0（1970-01-01）是合法时间戳，不能用真值判断是否有选中值
    if (to !== undefined) {
      calendarYear.value = getYear(to)
      calendarMonth.value = getMonth(to) + 1
    }
  },
  {
    immediate: true
  }
)
// 年份选项区间只在选择器关闭时跟随面板定位年：展开期间保持原区间，
// 否则选中年份后列表会在关闭动画中整体平移（与「先打选中态、再关闭、下次展开才更新列表」的交互不符）
watch(calendarYear, (to) => {
  if (!yearSelectOpen.value) yearOptionsAnchor.value = to
})
// 面板模式：外部变更同步到面板；面板内部切换模式不回写该属性
watch(
  () => props.mode,
  (to) => {
    if (to) calendarMode.value = to
  }
)

// 值格式变更时重新表达已选值：字符串按旧格式解析、number 直接使用；解析失败则保持原值，不抛错
watch(
  () => props.valueFormat,
  (to, from) => {
    const value = selectedValue.value
    // 0（1970-01-01）是合法时间戳，不能用真值判断是否有选中值
    if (value === undefined || value === null || value === '') return
    // 目标格式为时间戳且值本就是 number 时不改写，避免改动调用方传入的原始值
    if (typeof value === 'number' && (to === undefined || to === 'T')) return
    const sourceFormat = from ?? to
    let timestamp: number | null
    if (typeof value === 'number') {
      timestamp = value
    } else if (sourceFormat && sourceFormat !== 'T') {
      timestamp = parseTimestamp(value, sourceFormat)
    } else {
      timestamp = Number(value)
    }
    if (timestamp === null || !Number.isFinite(timestamp)) return
    const dayTimestamp = startOfDayTimestamp(timestamp)
    selectedValue.value = to === undefined || to === 'T' ? dayTimestamp : formatTimestamp(dayTimestamp, to)
  },
  {
    immediate: true
  }
)
// 年份选项：有可选区间时收窄到该区间的年份，否则取锚点年前 10 年起的 20 个年份
// （循环为左闭右开 [startYear, endYear)，故 endYear 取「结束年 + 1」才能包含结束年）
function getYearOptions(): SelectOption[] {
  const range = validRangeTimestamp.value
  const startYear = range ? getYear(range[0]) : yearOptionsAnchor.value - 10
  const endYear = range ? getYear(range[1]) + 1 : yearOptionsAnchor.value + 10
  const options: SelectOption[] = []
  for (let y = startYear; y < endYear; y++) {
    options.push({
      label: `${y}年`,
      value: y,
      disabled: hasDisableSource.value && isYearFullyDisabled(new Date(y, 0, 1).getTime(), isDateDisabled)
    })
  }
  return options
}
// 月份选项：当前年为可选区间端点年时收窄到区间内的月份；整月不可选的月份禁用
function getMonthOptions(): SelectOption[] {
  const range = validRangeTimestamp.value
  let startMonth = 1
  let endMonth = 12
  if (range) {
    if (getYear(range[0]) === calendarYear.value) startMonth = getMonth(range[0]) + 1
    if (getYear(range[1]) === calendarYear.value) endMonth = getMonth(range[1]) + 1
  }
  const options: SelectOption[] = []
  for (let m = startMonth; m <= endMonth; m++) {
    options.push({
      label: `${m}月`,
      value: m,
      disabled:
        hasDisableSource.value && isMonthFullyDisabled(new Date(calendarYear.value, m - 1, 1).getTime(), isDateDisabled)
    })
  }
  return options
}
function getDateItem(time: number, monthTs: number, currentTs: number): DateItem {
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    timestamp: getTime(time),
    inCurrentMonth: isSameMonthTimestamp(time, monthTs),
    isCurrentDate: isSameDayTimestamp(currentTs, time)
  }
}
// 日期网格格数：恒定六周（42 格）。行数固定，面板 / 卡片形态都不会因月份在 4 / 5 / 6 行之间
// 切换而跳动，也不会在固定高度里留下空白末行
const DATE_GRID_SIZE = 42
function getDates(monthTs: number, currentTs: number, startDay: DayOfWeek): DateItem[] {
  let displayMonthIterator = getTime(startOfMonth(monthTs))
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1))
  const calendarDays: DateItem[] = []
  // 补到「起始日的前一天」为止：1 号本身即为起始日时不补任何上月日期
  while (getDay(lastMonthIterator) !== startDay) {
    calendarDays.unshift(getDateItem(lastMonthIterator, monthTs, currentTs))
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1))
  }
  while (calendarDays.length < DATE_GRID_SIZE) {
    calendarDays.push(getDateItem(displayMonthIterator, monthTs, currentTs))
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  return calendarDays
}
function getCalendarDates(): DateItem[][] {
  const dates = getDates(startOfMonthTimestamp.value, todayTimestamp.value, normalizedStartDay.value)
  const chunkSize = 7
  const chunkCount = dates.length / chunkSize
  const result: DateItem[][] = []
  for (let i = 0; i < chunkCount; i++) {
    result.push(dates.slice(i * chunkSize, (i + 1) * chunkSize))
  }
  return result
}
function getMonthItem(monthTs: number, currentTs: number): MonthItem {
  return {
    type: 'month',
    monthObject: {
      month: getMonth(monthTs),
      year: getYear(monthTs)
    },
    timestamp: getTime(monthTs),
    isCurrent: isSameMonthTimestamp(currentTs, monthTs)
  }
}
function getMonths(yearAnchorTs: number, currentTs: number): MonthItem[] {
  const calendarMonths: MonthItem[] = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 12; i++) {
    calendarMonths.push(getMonthItem(getTime(addMonths(yearStart, i)), currentTs))
  }
  return calendarMonths
}
function getCalendarMonths(): MonthItem[][] {
  const months = getMonths(startOfMonthTimestamp.value, todayTimestamp.value)
  const chunkCount = months.length / MONTH_GRID_COLUMNS
  const result: MonthItem[][] = []
  for (let i = 0; i < chunkCount; i++) {
    result.push(months.slice(i * MONTH_GRID_COLUMNS, (i + 1) * MONTH_GRID_COLUMNS))
  }
  return result
}
// 格子的原生 tooltip 文案：固定格式，不随 dateFormat / monthFormat 变化
function getDateStr(date: DateItem): string {
  return format(date.timestamp, 'yyyy-MM-dd')
}
function getMonthStr(month: MonthItem): string {
  return format(month.timestamp, 'yyyy-MM')
}
// 三处展示格式：未传自定义函数时用内置文案（日期不补零、星期为一…日、月份带「月」后缀）
function getDateFormat(date: number, timestamp: number): string {
  if (props.dateFormat === undefined) {
    return `${date}`
  } else {
    return props.dateFormat(date, timestamp)
  }
}
function getWeekFormat(defaultWeek: DefaultWeek, week: number, timestamp: number): string {
  if (props.weekFormat === undefined) {
    return defaultWeek
  } else {
    return props.weekFormat(defaultWeek, week, timestamp)
  }
}
function getMonthFormat(month: number, timestamp: number): string {
  if (props.monthFormat === undefined) {
    return `${month}月`
  } else {
    return props.monthFormat(month, timestamp)
  }
}
// 禁用判定：可选区间（按日期粒度）与 disabledDate 合并
function isDateDisabled(timestamp: number): boolean {
  const range = validRangeTimestamp.value
  if (range) {
    const dayTimestamp = startOfDayTimestamp(timestamp)
    if (dayTimestamp < range[0] || dayTimestamp > range[1]) return true
  }
  return Boolean(props.disabledDate?.(timestamp))
}
// 月份的整层禁用：整月每一天都不可选（禁用来源为 disabledDate 或 validRange）；
// 月格禁用态与月面板键盘导航共用该判定
function isMonthTimestampDisabled(monthTimestamp: number): boolean {
  return hasDisableSource.value && isMonthFullyDisabled(monthTimestamp, isDateDisabled)
}
function isMonthItemDisabled(monthItem: MonthItem): boolean {
  return isMonthTimestampDisabled(monthItem.timestamp)
}
// 选中态判定：日期按「当日零点」比较、月份按「同月」比较（展示态与事件判定共用同一口径）
function isDateSelected(dateItem: DateItem): boolean {
  const selectedTimestamp = selectedValueTimestamp.value
  return (
    selectedTimestamp !== undefined &&
    startOfDayTimestamp(selectedTimestamp) === startOfDayTimestamp(dateItem.timestamp)
  )
}
function isMonthSelected(monthItem: MonthItem): boolean {
  const selectedTimestamp = selectedValueTimestamp.value
  return selectedTimestamp !== undefined && isSameMonthTimestamp(selectedTimestamp, monthItem.timestamp)
}
// 把时间戳按 valueFormat 表达为对外值；未指定格式（或 'T'）时输出当日零点时间戳
function formatDate(timestamp: number): number | string {
  const dayTimestamp = startOfDayTimestamp(timestamp)
  if (props.valueFormat === undefined || props.valueFormat === 'T') {
    return dayTimestamp
  }
  return formatTimestamp(dayTimestamp, props.valueFormat)
}
// 按「年 + 月」重组选中值：保留原有「日」，目标月天数不足时收敛到月末，避免溢出到下个月
function mergeYearMonth(baseTimestamp: number, year: number, month: number): number {
  const dayCount = new Date(year, month, 0).getDate()
  const day = Math.min(getDate(baseTimestamp), dayCount)
  return startOfDayTimestamp(new Date(year, month - 1, day).getTime())
}
// 年份变更时收窄月份：落在可选区间端点年时，把月份收敛到区间内
function clampMonthToRange(year: number, month: number): number {
  const range = validRangeTimestamp.value
  if (!range) return month
  if (year === getYear(range[1]) && month > getMonth(range[1]) + 1) return getMonth(range[1]) + 1
  if (year === getYear(range[0]) && month < getMonth(range[0]) + 1) return getMonth(range[0]) + 1
  return month
}
/**
 * 求「只替换年月、保留原日」后的可写回日期
 *
 * 月格 / 年选择器 / 月选择器只换年月、保留原「日」，该日可能不可选，按顺序收敛：
 * 1. 先收敛到可选区间（区间端点必定落在目标月内）；
 * 2. 仍被 `disabledDate` 命中时，取同月内最近的可用日（先向后、再向前）——
 *    面板定位由选中值驱动，无法「只切视图」，因此必须给出一个可选日期，
 *    而不能把禁用的原「日」直接写回；
 * 3. 整月都不可选时原样返回（月格与月选项此时已是禁用态，正常不会走到）。
 */
function resolveYearMonthSelection(baseTimestamp: number, year: number, month: number): number {
  const mergedTimestamp = mergeYearMonth(baseTimestamp, year, month)
  const range = validRangeTimestamp.value
  const inRangeTimestamp = range ? Math.min(Math.max(mergedTimestamp, range[0]), range[1]) : mergedTimestamp
  if (!isDateDisabled(inRangeTimestamp)) return inRangeTimestamp
  return findNearestEnabledDay(inRangeTimestamp) ?? inRangeTimestamp
}
// 同月内离目标日期最近的可用日：先向后、再向前；同距离取靠后的一天
function findNearestEnabledDay(timestamp: number): number | undefined {
  const year = getYear(timestamp)
  const zeroBasedMonth = getMonth(timestamp)
  const preferredDay = getDate(timestamp)
  const dayCount = new Date(year, zeroBasedMonth + 1, 0).getDate()
  for (let offset = 1; offset < dayCount; offset++) {
    const forwardDay = preferredDay + offset
    if (forwardDay <= dayCount) {
      const forwardTimestamp = new Date(year, zeroBasedMonth, forwardDay).getTime()
      if (!isDateDisabled(forwardTimestamp)) return forwardTimestamp
    }
    const backwardDay = preferredDay - offset
    if (backwardDay >= 1) {
      const backwardTimestamp = new Date(year, zeroBasedMonth, backwardDay).getTime()
      if (!isDateDisabled(backwardTimestamp)) return backwardTimestamp
    }
  }
  return undefined
}
// 由时间戳取出对外的日期对象：change 事件的第二参，与日期格的选择同口径
function getDateObject(timestamp: number): DateItem['dateObject'] {
  return {
    date: getDate(timestamp),
    month: getMonth(timestamp),
    year: getYear(timestamp)
  }
}
/**
 * 写回选中值
 *
 * 事件顺序：select 每次必发（含重复选中），change 仅在日期变化时发；面板跨期时补发 panelChange
 * （日期面板看「跨月」、月面板看「跨年」）。
 */
function commitSelectedTimestamp(
  nextTimestamp: number,
  source: SelectInfo['source'],
  dateObject?: DateItem['dateObject'] | MonthItem['monthObject']
): void {
  const nextDay = startOfDayTimestamp(nextTimestamp)
  const previousTimestamp = selectedValueTimestamp.value
  const changed = previousTimestamp === undefined || startOfDayTimestamp(previousTimestamp) !== nextDay
  const newValue = formatDate(nextDay)
  selectedValue.value = newValue
  if (changed) {
    emits('change', newValue, dateObject)
    // 面板跨期判定以「面板定位」为准：面板年月由选中值驱动，无选中值时停在初始定位——
    // 同月 / 同年内换日不算跨期；无选中值时从初始定位跳转（如直接操作年 / 月选择器）同样算
    const panelAnchor = new Date(calendarYear.value, calendarMonth.value - 1, 1).getTime()
    const crossedPeriod =
      calendarMode.value === 'month'
        ? !isSameMonthTimestamp(panelAnchor, nextDay)
        : getYear(panelAnchor) !== getYear(nextDay)
    if (crossedPeriod) {
      emits('panelChange', newValue, { year: getYear(nextDay), month: getMonth(nextDay) + 1 }, calendarMode.value)
    }
  }
  emits('select', newValue, { source })
}
// 日期格选择：禁用格不响应
function onDateSelected(date: DateItem): void {
  if (isDateDisabled(date.timestamp)) return
  commitSelectedTimestamp(date.timestamp, 'date', date.dateObject)
}
// 月格选择：仅替换年月，保留原有「日」；来源为月，change 第二参回传月份对象
function onMonthSelected(month: MonthItem): void {
  if (isMonthItemDisabled(month)) return
  const baseTimestamp = selectedValueTimestamp.value ?? month.timestamp
  const { year, month: targetMonth } = month.monthObject
  commitSelectedTimestamp(resolveYearMonthSelection(baseTimestamp, year, targetMonth + 1), 'month', month.monthObject)
}
// 年选择器开合：展开时把选项区间对齐到当前面板定位年；关闭时不刷新，保证列表在收起动画中不突变
function onYearSelectOpenChange(open: boolean): void {
  yearSelectOpen.value = open
  if (open) yearOptionsAnchor.value = calendarYear.value
}
// 头部年选择器：仅替换年份，保留原有「月日」，并收窄到可选区间
function onYearSelectChanged(year: number): void {
  const baseTimestamp = selectedValueTimestamp.value ?? startOfMonthTimestamp.value
  const month = clampMonthToRange(year, getMonth(baseTimestamp) + 1)
  const nextTimestamp = resolveYearMonthSelection(baseTimestamp, year, month)
  commitSelectedTimestamp(nextTimestamp, 'year', getDateObject(nextTimestamp))
}
// 头部月选择器：仅替换月份，保留原有「日」；来源为月，change 第二参回传月份对象
function onMonthSelectChanged(month: number): void {
  const baseTimestamp = selectedValueTimestamp.value ?? startOfMonthTimestamp.value
  const monthObject: MonthItem['monthObject'] = { month: month - 1, year: calendarYear.value }
  commitSelectedTimestamp(resolveYearMonthSelection(baseTimestamp, monthObject.year, month), 'month', monthObject)
}
// 头部整体替换插槽的写回：来源记为 customize
function onHeaderFullChange(value: string | number): void {
  const timestamp = toTimestamp(value)
  if (timestamp === undefined) return
  commitSelectedTimestamp(timestamp, 'customize')
}
// 头部整体替换插槽的模式切换：切换面板模式并上报（不写回选中值）
function onTypeChange(mode: 'month' | 'year'): void {
  calendarMode.value = mode
  onPanelChange()
}
// 模式切换：只上报面板变化，不写回选中值
function onPanelChange(): void {
  if (calendarMode.value === 'month') {
    emits(
      'panelChange',
      selectedValue.value,
      { year: calendarYear.value, month: calendarMonth.value },
      calendarMode.value
    )
  } else {
    emits('panelChange', selectedValue.value, { year: calendarYear.value }, calendarMode.value)
  }
}
// 键盘移动的基准日期：优先选中值，其次面板定位月的首日
function getKeyStepBase(): number {
  return selectedValueTimestamp.value ?? startOfMonthTimestamp.value
}
/**
 * 面板导航键位表：粒度随面板模式切换，与内核日期面板同口径——
 * 日期面板左右为一天、上下为一周、翻页为一月、Ctrl（macOS 为 Cmd）为一年；
 * 月面板（年模式）左右为一月、上下为一行（三月）、Ctrl 为一年，不响应翻页键
 */
function getKeydownHandlers(): PickerKeydownHandlers {
  const base = getKeyStepBase()
  if (calendarMode.value === 'year') {
    return {
      onLeftRight: (step) => selectMonthByKey(addMonths(base, step).getTime()),
      onCtrlLeftRight: (step) => selectMonthByKey(addMonths(base, step * 12).getTime()),
      onUpDown: (step) => selectMonthByKey(addMonths(base, step * MONTH_GRID_COLUMNS).getTime())
    }
  }
  return {
    onLeftRight: (step) => selectByKey(addDays(base, step).getTime()),
    onCtrlLeftRight: (step) => selectByKey(addMonths(base, step * 12).getTime()),
    onUpDown: (step) => selectByKey(addDays(base, step * 7).getTime()),
    onPageUpDown: (step) => selectByKey(addMonths(base, step).getTime())
  }
}
// 日期面板键盘移动即选中：面板随之定位到目标日期所在月
function selectByKey(timestamp: number): void {
  if (isDateDisabled(timestamp)) return
  commitSelectedTimestamp(timestamp, 'date', getDateObject(timestamp))
}
// 月面板键盘移动即选中：与月格点击同口径（仅替换年月、保留「日」、回传月份对象），面板随之定位到目标月
function selectMonthByKey(monthTimestamp: number): void {
  if (isMonthTimestampDisabled(monthTimestamp)) return
  const monthObject: MonthItem['monthObject'] = {
    month: getMonth(monthTimestamp),
    year: getYear(monthTimestamp)
  }
  const baseTimestamp = selectedValueTimestamp.value ?? monthTimestamp
  const nextTimestamp = resolveYearMonthSelection(baseTimestamp, monthObject.year, monthObject.month + 1)
  commitSelectedTimestamp(nextTimestamp, 'month', monthObject)
}
// 面板导航按键：未声明的意图不消费该键，按键交还浏览器
function onKeydown(event: KeyboardEvent): void {
  handlePanelKeydown(event, getKeydownHandlers())
}
</script>
<template>
  <div class="calendar-wrap" :class="`calendar-${display}`">
    <slot
      v-if="slotsExist.headerFull"
      name="headerFull"
      :year="calendarYear"
      :month="calendarMonth"
      :mode="calendarMode"
      :value="selectedValue"
      :onChange="onHeaderFullChange"
      :onTypeChange="onTypeChange"
    ></slot>
    <div v-else class="calendar-header-wrap">
      <div v-if="showHeader" class="calendar-header-content">
        <slot name="header">{{ header }}</slot>
      </div>
      <div class="calendar-header-actions">
        <Select
          class="calendar-year-select"
          :size="display === 'card' ? 'small' : 'middle'"
          :options="yearOptions"
          :max-display="8"
          :value="calendarYear"
          @change="onYearSelectChanged"
          @open-change="onYearSelectOpenChange"
          v-bind="yearSelectProps"
        />
        <Select
          v-if="calendarMode === 'month'"
          class="calendar-month-select"
          :size="display === 'card' ? 'small' : 'middle'"
          :options="monthOptions"
          :max-display="8"
          :value="calendarMonth"
          @change="onMonthSelectChanged"
          v-bind="monthSelectProps"
        />
        <RadioGroup
          class="calendar-mode-radio"
          :size="display === 'card' ? 'small' : 'middle'"
          :options="modeOptions"
          v-model:value="calendarMode"
          button
          @change="onPanelChange"
          v-bind="modeRadioProps"
        />
      </div>
    </div>
    <div class="calendar-display-wrap" tabindex="0" @keydown="onKeydown">
      <div v-if="calendarMode === 'month'" class="calendar-date-panel">
        <div class="calendar-body">
          <table class="calendar-table" role="grid">
            <thead>
              <tr>
                <th v-for="(defaultWeek, index) in defaultWeeks" :key="index">
                  <slot
                    name="week"
                    :defaultWeek="defaultWeek"
                    :week="index"
                    :timestamp="calendarDates[0]?.[index]?.timestamp ?? startOfMonthTimestamp"
                    >{{
                      getWeekFormat(defaultWeek, index, calendarDates[0]?.[index]?.timestamp ?? startOfMonthTimestamp)
                    }}</slot
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(weekDates, weekIndex) in calendarDates" :key="weekIndex">
                <td
                  class="calendar-date-cell"
                  role="gridcell"
                  :aria-selected="isDateSelected(dateItem)"
                  :aria-disabled="isDateDisabled(dateItem.timestamp)"
                  :class="{
                    'date-cell-disabled': isDateDisabled(dateItem.timestamp),
                    'date-cell-in-view': dateItem.inCurrentMonth,
                    'date-cell-selected': isDateSelected(dateItem)
                  }"
                  v-for="(dateItem, index) in weekDates"
                  :key="index"
                  :title="getDateStr(dateItem)"
                  @click="onDateSelected(dateItem)"
                >
                  <slot name="dateFull" v-bind="dateItem">
                    <div class="date-cell-inner" :class="{ 'date-cell-today': dateItem.isCurrentDate }">
                      <div class="date-value">
                        <slot name="dateValue" v-bind="dateItem">{{
                          getDateFormat(dateItem.dateObject.date, dateItem.timestamp)
                        }}</slot>
                      </div>
                      <div class="date-content">
                        <slot name="dateContent" v-bind="dateItem"></slot>
                      </div>
                    </div>
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="calendarMode === 'year'" class="calendar-month-panel">
        <div class="calendar-body">
          <table class="calendar-table" role="grid">
            <tbody>
              <tr v-for="(rowMonths, rowIndex) in calendarMonths" :key="rowIndex">
                <td
                  class="calendar-date-cell date-cell-in-view"
                  role="gridcell"
                  :aria-selected="isMonthSelected(monthItem)"
                  :aria-disabled="isMonthItemDisabled(monthItem)"
                  :class="{
                    'date-cell-disabled': isMonthItemDisabled(monthItem),
                    'date-cell-selected': isMonthSelected(monthItem)
                  }"
                  v-for="(monthItem, index) in rowMonths"
                  :key="index"
                  :title="getMonthStr(monthItem)"
                  @click="onMonthSelected(monthItem)"
                >
                  <slot name="monthFull" v-bind="monthItem">
                    <div class="date-cell-inner" :class="{ 'date-cell-today': monthItem.isCurrent }">
                      <div class="date-value">
                        <slot name="monthValue" v-bind="monthItem">{{
                          getMonthFormat(monthItem.monthObject.month + 1, monthItem.timestamp)
                        }}</slot>
                      </div>
                      <div class="date-content">
                        <slot name="monthContent" v-bind="monthItem"></slot>
                      </div>
                    </div>
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.calendar-wrap {
  color: var(--va-text-color-1);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  background: var(--va-bg-container-color);
  border-radius: 4px;
  .calendar-header-wrap {
    padding: 12px 0;
    .calendar-header-content {
      margin-bottom: 10px;
      :deep(svg) {
        fill: currentColor;
      }
    }
    .calendar-header-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .calendar-month-select {
        margin-left: 8px;
      }
      .calendar-mode-radio {
        margin-left: 8px;
      }
    }
  }
  .calendar-display-wrap {
    background: var(--va-bg-container-color);
    .calendar-date-panel,
    .calendar-month-panel {
      display: flex;
      flex-direction: column;
      width: auto;
      .calendar-body {
        padding: 8px 0;
        .calendar-table {
          display: table;
          margin: 0;
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          tr {
            border: none;
            background-color: transparent;
          }
          th,
          td {
            position: relative;
            min-width: 24px;
            font-size: inherit;
            font-weight: normal;
            padding: 0;
            border: none;
          }
          th {
            text-align: inherit;
            height: auto;
            line-height: 18px;
            width: 36px;
            color: var(--va-text-color-1);
            vertical-align: middle;
            background: transparent;
          }
          .calendar-date-cell {
            color: var(--va-text-color-disabled);
            cursor: pointer;
            .date-cell-inner {
              position: relative;
              z-index: 2;
              min-width: 24px;
              line-height: 24px;
            }
            &:hover:not(.date-cell-selected) {
              .date-cell-inner {
                background: var(--va-fill-color-1);
              }
            }
          }
          // 禁用格：不响应指针（不可悬浮、不可点击、不改变鼠标形态），灰底由卡片形态的伪元素承担
          .date-cell-disabled {
            color: var(--va-text-color-disabled);
            pointer-events: none;
          }
          .date-cell-in-view:not(.date-cell-disabled):not(.date-cell-selected) {
            color: var(--va-text-color-1);
          }
        }
      }
    }
  }
}
// 面板承载键盘导航：焦点指示沿用内核日期面板口径——容器不画焦点环，
// 键盘移动即选中，选中态本身就是位置反馈
.calendar-display-wrap:focus-visible {
  outline: none;
}
.calendar-panel {
  .calendar-header-wrap {
    .calendar-header-actions {
      .calendar-year-select {
        min-width: 90px;
      }
      .calendar-month-select {
        min-width: 72px;
      }
    }
  }
  .calendar-display-wrap {
    width: 100%;
    text-align: end;
    .calendar-date-panel,
    .calendar-month-panel {
      .calendar-body {
        .calendar-table {
          th {
            padding-right: 12px;
            padding-bottom: 4px;
          }
          .calendar-date-cell {
            .date-cell-inner {
              display: block;
              width: auto;
              height: auto;
              margin: 0 4px;
              padding: 4px 8px 0;
              border: 0;
              border-top: 2px solid var(--va-border-split-color);
              border-radius: 0;
              transition: background 0.3s;
              .date-value {
                line-height: 24px;
                transition: color 0.3s;
              }
              .date-content {
                position: static;
                width: auto;
                height: 86px;
                overflow-y: auto;
                color: var(--va-text-color-1);
                line-height: 1.5714285714285714;
                text-align: start;
              }
            }
          }
          // 选中：保留原有底色，并把该格的网格线（顶线）一并取主色
          .date-cell-selected {
            .date-cell-inner {
              color: var(--va-cp-calendar-primary-color, var(--va-primary-color));
              background: var(--va-cp-calendar-primary-bg-color, var(--va-primary-bg-color));
              border-top-color: var(--va-cp-calendar-primary-color, var(--va-primary-color));
            }
          }
        }
      }
    }
  }
  // 今天：日面板用实心主色圆、月面板用两端半圆的实心胶囊（同为实底白字），圆角取 24px 高度的一半
  // ⚠️ 两者都锁定 24px 行高（不用 aspect-ratio / border 改变盒高），否则 today 所在行被撑高，
  // 同排 hover / 选中格的底色会在底部露出间隙
  .calendar-date-panel .date-cell-inner.date-cell-today {
    .date-value {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 4px;
      color: var(--va-text-color-solid);
      background: var(--va-cp-calendar-primary-color, var(--va-primary-color));
      border-radius: 12px;
    }
  }
  .calendar-month-panel .date-cell-inner.date-cell-today {
    .date-value {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      // 不设最小宽度：宽度由文案决定，两侧留白恒为 8px（长文案如 October 才不会贴边）
      padding: 0 8px;
      color: var(--va-text-color-solid);
      background: var(--va-cp-calendar-primary-color, var(--va-primary-color));
      border-radius: 12px;
    }
  }
  // 今天本身不可选时，标记退为中性色，避免与可选态混淆
  .calendar-date-panel .calendar-date-cell.date-cell-disabled .date-cell-inner.date-cell-today .date-value {
    background: var(--va-text-color-disabled);
  }
  .calendar-month-panel .calendar-date-cell.date-cell-disabled .date-cell-inner.date-cell-today .date-value {
    background: var(--va-text-color-disabled);
  }
}
.calendar-card {
  // 卡片形态按小卡片呈现：宽度由组件给定基准，容器更窄时才收缩
  width: 300px;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--va-border-color);
  border-radius: 4px;
  .calendar-header-wrap {
    padding-left: 8px;
    padding-right: 8px;
    .calendar-header-actions {
      flex-wrap: wrap;
      .calendar-year-select {
        min-width: 86px;
      }
      .calendar-month-select {
        min-width: 70px;
      }
    }
  }
  .calendar-display-wrap {
    display: flex;
    flex-direction: column;
    text-align: center;
    border-top: 1px solid var(--va-border-split-color);
    border-radius: 0 0 4px 4px;
    .calendar-date-panel,
    .calendar-month-panel {
      .calendar-body {
        .calendar-table {
          .calendar-date-cell {
            padding: 4px 0;
            &::before {
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              z-index: 1;
              height: 24px;
              transform: translateY(-50%);
              transition: all 0.3s;
              content: '';
              pointer-events: none;
            }
            .date-cell-inner {
              display: inline-block;
              height: 24px;
              // overflow 非 visible 时行内块的基线取底部边缘，会把日期整体顶高；
              // 用 middle 把日期摆回格子中线（与灰底条同心）
              vertical-align: middle;
              overflow: hidden;
              border-radius: 4px;
              transition:
                background 0.2s,
                color 0.2s;
            }
          }
          .date-cell-disabled {
            &::before {
              background: var(--va-fill-color-1);
            }
          }
          // 今天：1px 主色描边方块 + 主色文字（卡片形态用描边标记，区别于面板形态的实心标记）
          .date-cell-inner.date-cell-today {
            &::before {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 1;
              border: 1px solid var(--va-cp-calendar-primary-color, var(--va-primary-color));
              border-radius: 4px;
              content: '';
            }
            .date-value {
              position: relative;
              z-index: 2;
              color: var(--va-cp-calendar-primary-color, var(--va-primary-color));
            }
          }
          // 今天本身不可选且未被选中时，描边与文字一并退为中性色（选中态优先，保持白字）
          .calendar-date-cell.date-cell-disabled:not(.date-cell-selected) .date-cell-inner.date-cell-today {
            &::before {
              border-color: var(--va-text-color-disabled);
            }
            .date-value {
              color: var(--va-text-color-disabled);
            }
          }
          // 卡片形态的选中态是实心主色块：面板形态的浅底（`-bg-color`）配白字会看不清
          .date-cell-selected {
            .date-cell-inner {
              color: var(--va-text-color-solid);
              background: var(--va-cp-calendar-primary-color, var(--va-primary-color));
            }
            // 选中与今天重叠时，文字以选中态为准
            .date-cell-inner.date-cell-today .date-value {
              color: var(--va-text-color-solid);
            }
          }
        }
      }
    }
    .calendar-date-panel {
      // 日期区恒定六周，行高固定即可保证卡片高度稳定，无需再写死内容区高度
      .calendar-body {
        .calendar-table {
          .calendar-date-cell {
            height: 40px;
          }
        }
      }
    }
    .calendar-month-panel {
      .calendar-body {
        .calendar-table {
          .calendar-date-cell {
            height: 64px;
            .date-cell-inner {
              width: 60px;
              padding: 0 8px;
            }
          }
        }
      }
    }
  }
}
// 窄屏（≤480px）：头部操作区换行堆叠，年 / 月选择器各占半行、模式切换独占整行
@media (max-width: 480px) {
  .calendar-header-actions {
    flex-wrap: wrap;
    .calendar-year-select,
    .calendar-month-select {
      width: calc(50% - 4px);
      margin-left: 0;
    }
    .calendar-month-select {
      margin-left: 8px;
    }
    .calendar-mode-radio {
      width: 100%;
      margin-top: 8px;
      margin-left: 0;
    }
  }
}
</style>
