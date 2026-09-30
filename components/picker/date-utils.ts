/**
 * 日期选择内核的日期工具
 *
 * 值一律以毫秒时间戳在层间传递（与 `Calendar` 的 `disabledDate(timestamp)` / `valueFormat` 口径一致），
 * 字符串解析与格式化统一使用 date-fns 占位符（如 `yyyy-MM-dd`），内核中不出现 `Date` 对象。
 */
import {
  addMonths,
  addYears,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getQuarter,
  getYear,
  isMatch,
  isValid,
  parse,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear
} from 'date-fns'
import type { PickerPanelMode, PickerType } from './types'

/** 周起始日：0 为周一，6 为周日（与 `Calendar` 的 startDayOfWeek 口径一致） */
export type StartDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** 周标题（索引 0 为周一，与 startDayOfWeek 口径对齐） */
const WEEK_LABELS = ['一', '二', '三', '四', '五', '六', '日']
/** 日期面板展开周数：始终渲染 6 周，避免面板高度跳动 */
const WEEK_COUNT = 6
/** 一周天数 */
const DAYS_PER_WEEK = 7
/** 一年中的月份数 */
const MONTH_COUNT = 12
/** 年面板一次展示的年数 */
const YEAR_COUNT = 10
/** 年面板网格格数：3 列 × 4 行（比十年区间多出的两格用于展示相邻年份） */
const YEAR_PANEL_SIZE = 12

/** 形态 → 默认展示格式（date-fns 占位符） */
const DEFAULT_FORMATS: Record<PickerType, string> = {
  date: 'yyyy-MM-dd',
  week: 'yyyy-ww',
  month: 'yyyy-MM',
  quarter: 'yyyy-QQ',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  monthrange: 'yyyy-MM',
  quarterrange: 'yyyy-QQ',
  yearrange: 'yyyy'
}

/** 把周起始日换算为 date-fns 的 weekStartsOn（date-fns 中 0 为周日） */
export function toWeekStartsOn(startDayOfWeek: StartDayOfWeek): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
  return ((startDayOfWeek + 1) % DAYS_PER_WEEK) as 0 | 1 | 2 | 3 | 4 | 5 | 6
}

/** 按起始日轮转周标题（如 startDayOfWeek 为 0 时返回 一…日） */
export function getWeekLabels(startDayOfWeek: StartDayOfWeek): string[] {
  return Array.from({ length: DAYS_PER_WEEK }, (_, index) => WEEK_LABELS[(startDayOfWeek + index) % DAYS_PER_WEEK])
}

/** 取当日零点时间戳（面板按天比较与取值均以零点为准） */
export function startOfDayTimestamp(timestamp: number): number {
  return startOfDay(timestamp).getTime()
}

/** 按占位符格式化时间戳 */
export function formatTimestamp(timestamp: number, formatStr: string): string {
  const date = new Date(timestamp)
  return isValid(date) ? format(date, formatStr) : ''
}

/**
 * 按占位符解析字符串为时间戳
 *
 * 先用 `isMatch` 做严格校验（长度与占位符逐位匹配），避免 `parse` 对残缺输入做宽松补全而
 * 产出「看似合法」的时间；无法解析或结果非法时返回 null，由调用方按空值处理。
 */
export function parseTimestamp(text: string, formatStr: string): number | null {
  if (!text || !isMatch(text, formatStr)) {
    return null
  }
  const date = parse(text, formatStr, new Date())
  return isValid(date) ? date.getTime() : null
}

/** 是否为同一天 */
export function isSameDayTimestamp(a: number, b: number): boolean {
  return startOfDayTimestamp(a) === startOfDayTimestamp(b)
}

/** 是否为同一月 */
export function isSameMonthTimestamp(a: number, b: number): boolean {
  return startOfMonth(a).getTime() === startOfMonth(b).getTime()
}

/** 取出形态对应的默认展示格式 */
export function getDefaultFormat(type: PickerType): string {
  return DEFAULT_FORMATS[type]
}

/**
 * 输入框原生 `size` 属性（字符数）
 *
 * 浏览器对未声明 `size` 的输入框按 20 字符估宽，远大于实际展示格式所需宽度，会让触发器明显偏宽；
 * 这里按展示格式长度推算（不足下限时取下限），使宽度随格式自适应，并与参考实现的口径一致
 */
export function getInputSize(format: string, minSize: number = 10): number {
  return Math.max(minSize, format.length) + 2
}

/** 形态是否为范围形态 */
export function isRangeType(type: PickerType): boolean {
  return type.endsWith('range')
}

/** 形态对应的初始面板模式（`datetime` / 范围形态以日期面板开局，时间面板与日期面板并存） */
export function getPanelModeOf(type: PickerType): PickerPanelMode {
  if (type === 'year' || type === 'yearrange') {
    return 'year'
  }
  if (type === 'month' || type === 'monthrange') {
    return 'month'
  }
  if (type === 'quarter' || type === 'quarterrange') {
    return 'quarter'
  }
  if (type === 'week') {
    return 'week'
  }
  return 'date'
}

/** 当前月的 6×7 日期格时间戳（含跨月补充日，按起始日排布） */
export function getMonthGrid(reference: number, startDayOfWeek: StartDayOfWeek): number[] {
  const weekStartsOn = toWeekStartsOn(startDayOfWeek)
  const firstCell = startOfWeek(startOfMonth(reference), { weekStartsOn })
  const cellCount = WEEK_COUNT * DAYS_PER_WEEK
  return Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(firstCell)
    date.setDate(firstCell.getDate() + index)
    return startOfDay(date).getTime()
  })
}

/** 指定年度的 12 个月首日时间戳 */
export function getMonthTimestamps(reference: number): number[] {
  const year = getYear(reference)
  return Array.from({ length: MONTH_COUNT }, (_, index) => new Date(year, index, 1).getTime())
}

/** 指定年度的 4 个季度首日时间戳 */
export function getQuarterTimestamps(reference: number): number[] {
  const year = getYear(reference)
  return Array.from({ length: 4 }, (_, index) => new Date(year, index * 3, 1).getTime())
}

/** 以参考时间所在十年为区间，返回 10 个年份首日时间戳（对齐年份面板的区间展示） */
export function getYearTimestamps(reference: number): number[] {
  const startYear = Math.floor(getYear(reference) / YEAR_COUNT) * YEAR_COUNT
  return Array.from({ length: YEAR_COUNT }, (_, index) => new Date(startYear + index, 0, 1).getTime())
}

/** 年面板网格：十年区间居中，前后各补一格相邻年份，共 12 格 */
export function getYearPanelGrid(reference: number): number[] {
  const firstYear = getYear(getYearTimestamps(reference)[0]) - 1
  return Array.from({ length: YEAR_PANEL_SIZE }, (_, index) => new Date(firstYear + index, 0, 1).getTime())
}

/**
 * 整月是否都不可选（月面板格的禁用判定）
 *
 * 面板格代表一段时间而非一天：只要区间内还有可选日期，该格就保持可用。判定需逐天回调
 * `disabledDate`，成本随天数增长，故仅在传入 `disabledDate` 时调用。
 */
export function isMonthFullyDisabled(timestamp: number, disabledDate: (timestamp: number) => boolean): boolean {
  const monthStart = startOfMonth(timestamp)
  const dayCount = getDaysInMonth(monthStart)
  for (let index = 0; index < dayCount; index += 1) {
    const date = new Date(monthStart)
    date.setDate(monthStart.getDate() + index)
    if (!disabledDate(date.getTime())) {
      return false
    }
  }
  return true
}

/** 整年是否都不可选（年面板格的禁用判定：12 个月逐月判定，月内全不可选才算禁用） */
export function isYearFullyDisabled(timestamp: number, disabledDate: (timestamp: number) => boolean): boolean {
  const year = getYear(timestamp)
  for (let month = 0; month < MONTH_COUNT; month += 1) {
    if (!isMonthFullyDisabled(new Date(year, month, 1).getTime(), disabledDate)) {
      return false
    }
  }
  return true
}

/** 平移若干月（负数向前） */
export function addMonthTimestamp(reference: number, diff: number): number {
  return addMonths(reference, diff).getTime()
}

/** 平移若干年（负数向前） */
export function addYearTimestamp(reference: number, diff: number): number {
  return addYears(reference, diff).getTime()
}

/** 当前月首日时间戳 */
export function startOfMonthTimestamp(reference: number): number {
  return startOfMonth(reference).getTime()
}

/** 当前年首日时间戳 */
export function startOfYearTimestamp(reference: number): number {
  return startOfYear(reference).getTime()
}

/** 当前季度首日时间戳 */
export function startOfQuarterTimestamp(reference: number): number {
  return startOfQuarter(reference).getTime()
}

/** 月份（1-12） */
export function getMonthNumber(reference: number): number {
  return getMonth(reference) + 1
}

/** 日期（1-31） */
export function getDayOfMonth(reference: number): number {
  return getDate(reference)
}

/** 年份 */
export function getYearNumber(reference: number): number {
  return getYear(reference)
}

/** 季度（1-4） */
export function getQuarterNumber(reference: number): number {
  return getQuarter(reference)
}
