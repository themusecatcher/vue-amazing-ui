/**
 * 日期选择内核的日期工具
 *
 * 值一律以毫秒时间戳在层间传递（与 `Calendar` 的 `disabledDate(timestamp)` / `valueFormat` 口径一致），
 * 字符串解析与格式化统一使用 date-fns 占位符（如 `yyyy-MM-dd`），内核中不出现 `Date` 对象。
 */
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDate,
  getDaysInMonth,
  getHours,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getYear,
  isMatch,
  isValid,
  parse,
  set,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear
} from 'date-fns'
import type { PickerPanelMode, PickerRangeValue, PickerTimePanelLayout, PickerTimeUnit, PickerType } from './types'

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
/** 一个季度包含的月份数 */
const QUARTER_MONTH_COUNT = 3
/** 年面板一次展示的年数 */
const YEAR_COUNT = 10
/** 年面板网格格数：3 列 × 4 行（比十年区间多出的两格用于展示相邻年份） */
const YEAR_PANEL_SIZE = 12

/** 形态 → 默认展示格式（date-fns 占位符） */
const DEFAULT_FORMATS: Record<PickerType, string> = {
  date: 'yyyy-MM-dd',
  week: 'yyyy-ww',
  month: 'yyyy-MM',
  quarter: 'yyyy-QQQ',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  monthrange: 'yyyy-MM',
  quarterrange: 'yyyy-QQQ',
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

/** 是否为同一季度 */
export function isSameQuarterTimestamp(a: number, b: number): boolean {
  return startOfQuarter(a).getTime() === startOfQuarter(b).getTime()
}

/** 是否为同一年 */
export function isSameYearTimestamp(a: number, b: number): boolean {
  return getYear(a) === getYear(b)
}

/** 取出形态对应的默认展示格式 */
export function getDefaultFormat(type: PickerType): string {
  return DEFAULT_FORMATS[type]
}

/** 是否为全角字符：中文格式里的「年」「月」「日」等在字体中约占两个半角字符的宽度 */
function isFullWidth(char: string): boolean {
  return char.charCodeAt(0) > 0xff
}

/**
 * 输入框原生 `size` 属性（字符数）
 *
 * 浏览器对未声明 `size` 的输入框按 20 字符估宽，远大于实际展示格式所需宽度，会让触发器明显偏宽；
 * 这里按展示格式宽度推算（不足下限时取下限），使宽度随格式自适应。
 * 全角字符按 2 个字符计入 —— 只数字符个数会让中文格式（如 `yyyy年MM月dd日`）的文本超出输入框约 4px 被裁掉
 */
export function getInputSize(format: string, minSize: number = 10): number {
  const width = Array.from(format).reduce((total, char) => total + (isFullWidth(char) ? 2 : 1), 0)
  return Math.max(minSize, width) + 2
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

/** 平移若干天（负数向前），结果归一到当日零点 */
export function addDayTimestamp(reference: number, diff: number): number {
  return startOfDayTimestamp(addDays(reference, diff).getTime())
}

/** 平移若干月（负数向前） */
export function addMonthTimestamp(reference: number, diff: number): number {
  return addMonths(reference, diff).getTime()
}

/** 整季是否都不可选（季面板格的禁用判定：季内 3 个月逐月判定，月内全不可选才算禁用） */
export function isQuarterFullyDisabled(timestamp: number, disabledDate: (timestamp: number) => boolean): boolean {
  const quarterStart = startOfQuarterTimestamp(timestamp)
  for (let index = 0; index < QUARTER_MONTH_COUNT; index += 1) {
    if (!isMonthFullyDisabled(addMonthTimestamp(quarterStart, index), disabledDate)) {
      return false
    }
  }
  return true
}

/** 平移若干年（负数向前） */
export function addYearTimestamp(reference: number, diff: number): number {
  return addYears(reference, diff).getTime()
}

/**
 * 范围形态另一侧面板的视图日期
 *
 * 两面板相差「一格」，而一格的粒度随形态变化：日期形态差 1 个月、月 / 季形态差 1 年、年形态差一个
 * 十年区间；`direction` 为 -1 时按同一粒度反推（右面板翻页后据此回推左面板）。
 */
export function getClosingViewTimestamp(reference: number, mode: PickerPanelMode, direction: number = 1): number {
  if (mode === 'year') {
    return addYearTimestamp(reference, YEAR_COUNT * direction)
  }
  if (mode === 'month' || mode === 'quarter') {
    return addYearTimestamp(reference, direction)
  }
  return addMonthTimestamp(reference, direction)
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

/**
 * 是否为当月最后一天
 *
 * 供日期格的 `-end` 标记使用：范围预览在跨月边界处需要据此收边
 */
export function isLastDayOfMonthTimestamp(reference: number): boolean {
  return getDaysInMonth(reference) === getDate(reference)
}

/** 年份 */
export function getYearNumber(reference: number): number {
  return getYear(reference)
}

/** 季度（1-4） */
export function getQuarterNumber(reference: number): number {
  return getQuarter(reference)
}

/* ============================== 范围形态 ============================== */

/** 范围格类名判定的上下文 */
export interface RangeCellContext {
  /** 已选区间：两端都存在时才产生区间底色与端点样式 */
  value?: PickerRangeValue | null
  /** 悬浮预览区间：起止齐全且有序时才生效 */
  hoverValue?: PickerRangeValue | null
  /** 当前面板的展示日期：判定相邻格是否已跨出本面板视图 */
  viewDate: number
  /** 面板层级：决定一格的粒度（日期格按天、月格按月、季格按季、年格按年） */
  mode?: PickerPanelMode
}

/** 某层级下的相邻格时间戳（前一格 / 后一格），用于收边判定 */
function getRangeCellNeighbours(timestamp: number, mode: PickerPanelMode): [number, number] {
  if (mode === 'year') {
    return [addYearTimestamp(timestamp, -1), addYearTimestamp(timestamp, 1)]
  }
  if (mode === 'quarter') {
    return [addMonthTimestamp(timestamp, -QUARTER_MONTH_COUNT), addMonthTimestamp(timestamp, QUARTER_MONTH_COUNT)]
  }
  if (mode === 'month') {
    return [addMonthTimestamp(timestamp, -1), addMonthTimestamp(timestamp, 1)]
  }
  return [addDayTimestamp(timestamp, -1), addDayTimestamp(timestamp, 1)]
}

/** 两个时间戳是否代表同一格（按时段比较：月格同月、季格同季、年格同年） */
function isSameRangeCell(a: number, b: number, mode: PickerPanelMode): boolean {
  if (mode === 'year') {
    return isSameYearTimestamp(a, b)
  }
  if (mode === 'quarter') {
    return isSameQuarterTimestamp(a, b)
  }
  if (mode === 'month') {
    return isSameMonthTimestamp(a, b)
  }
  return isSameDayTimestamp(a, b)
}

/**
 * 该格是否落在本面板的视图范围内
 *
 * 判据是「格是否属于本面板的周期」：日期面板为展示月、年面板为当前十年；月 / 季面板的格与视图
 * 一一对应（不渲染周期外的格），故恒为真。该判定同时用于探测相邻格：只有年面板会渲染十年之外
 * 的前后各一格，预览延伸到十年边界时相邻格落在周期外，区间虚线在该处收边（而不是悬空断掉）；
 * 月 / 季面板没有周期外的格，因而不会在面板交界处收边。
 */
function isInRangeView(timestamp: number, viewDate: number, mode: PickerPanelMode): boolean {
  if (mode === 'year') {
    const startYear = getYearNumber(getYearTimestamps(viewDate)[0])
    const year = getYearNumber(timestamp)
    return year >= startYear && year < startYear + YEAR_COUNT
  }
  if (mode === 'month' || mode === 'quarter') {
    return true
  }
  return isSameMonthTimestamp(timestamp, viewDate)
}

/** 时间戳是否落在区间**内部**（不含两端：端点由 `-range-start` / `-range-end` 表达） */
export function isInRangeTimestamp(start: number | null, end: number | null, target: number): boolean {
  if (start === null || end === null) {
    return false
  }
  const day = startOfDayTimestamp(target)
  return day > startOfDayTimestamp(start) && day < startOfDayTimestamp(end)
}

/**
 * 范围形态的越界判定
 *
 * 已选起点时段不能早于起点、已选终点时段不能晚于终点。
 * 两侧都归一到当日零点比较，同日不算越界（否则带时分秒的宿主值会把当天也置灰）。
 */
export function isOutOfRangeBoundary(target: number, boundary: number, boundaryIsStart: boolean): boolean {
  const targetDay = startOfDayTimestamp(target)
  const boundaryDay = startOfDayTimestamp(boundary)
  return boundaryIsStart ? targetDay < boundaryDay : targetDay > boundaryDay
}

/**
 * 范围形态的格类名
 *
 * 区间底色只覆盖**严格内部**的格；悬浮预览（`-range-hover*`）
 * 要求预览区间起止齐全且有序；`-edge-*` / `-near-hover` 用于在面板首末格与已选端点相邻处收边。
 *
 * 面板层级决定「一格代表多长时间」：相邻格推算、同格判定与视图范围据此切换，
 * 日期 / 月 / 季 / 年四种层级共用同一套类名口径。
 */
export function getRangeCellClassNames(timestamp: number, context: RangeCellContext): Record<string, boolean> {
  const { value, hoverValue, viewDate, mode = 'date' } = context
  const rangeStart = value?.[0] ?? null
  const rangeEnd = value?.[1] ?? null
  const hoverStart = hoverValue?.[0] ?? null
  const hoverEnd = hoverValue?.[1] ?? null
  const [prevDate, nextDate] = getRangeCellNeighbours(timestamp, mode)
  const isSameAs = (date: number, target: number | null) => target !== null && isSameRangeCell(date, target, mode)
  const isInView = (date: number) => isInRangeView(date, viewDate, mode)
  const isRangeStart = (date: number) => isSameAs(date, rangeStart)
  const isRangeEnd = (date: number) => isSameAs(date, rangeEnd)
  const isRangeHovered = isInRangeTimestamp(hoverStart, hoverEnd, timestamp)
  const isHoverStart = isSameAs(timestamp, hoverStart)
  const isHoverEnd = isSameAs(timestamp, hoverEnd)
  // 面板首 / 末格（或紧邻已选端点）需要向该侧收边，避免区间底色溢出面板边界
  const isHoverEdgeStart = (isRangeHovered || isHoverEnd) && (!isInView(prevDate) || isRangeEnd(prevDate))
  const isHoverEdgeEnd = (isRangeHovered || isHoverStart) && (!isInView(nextDate) || isRangeStart(nextDate))
  return {
    'picker-panel-cell-in-range': isInRangeTimestamp(rangeStart, rangeEnd, timestamp),
    'picker-panel-cell-range-start': isRangeStart(timestamp),
    'picker-panel-cell-range-end': isRangeEnd(timestamp),
    'picker-panel-cell-range-start-single': isRangeStart(timestamp) && rangeEnd === null,
    'picker-panel-cell-range-end-single': isRangeEnd(timestamp) && rangeStart === null,
    'picker-panel-cell-range-start-near-hover':
      isRangeStart(timestamp) && (isSameAs(prevDate, hoverStart) || isInRangeTimestamp(hoverStart, hoverEnd, prevDate)),
    'picker-panel-cell-range-end-near-hover':
      isRangeEnd(timestamp) && (isSameAs(nextDate, hoverEnd) || isInRangeTimestamp(hoverStart, hoverEnd, nextDate)),
    'picker-panel-cell-range-hover': isRangeHovered,
    'picker-panel-cell-range-hover-start': isHoverStart,
    'picker-panel-cell-range-hover-end': isHoverEnd,
    'picker-panel-cell-range-hover-edge-start': isHoverEdgeStart,
    'picker-panel-cell-range-hover-edge-end': isHoverEdgeEnd,
    'picker-panel-cell-range-hover-edge-start-near-range': isHoverEdgeStart && isSameAs(prevDate, rangeEnd),
    'picker-panel-cell-range-hover-edge-end-near-range': isHoverEdgeEnd && isSameAs(nextDate, rangeStart)
  }
}

/* ================================ 时间 ================================ */

/** 时间面板的三类单位 */
export type PickerTimeUnitName = 'hour' | 'minute' | 'second'

/** 各时间单位的取值上限（时 0-23，分 / 秒 0-59） */
export const TIME_UNIT_MAX: Record<PickerTimeUnitName, number> = { hour: 23, minute: 59, second: 59 }
/** 列文本不足两位时补零的长度 */
const UNIT_LABEL_LENGTH = 2
/** 12 小时制的半天小时数 */
export const HALF_DAY_HOURS = 12

/** 小时（24 小时制） */
export function getHourNumber(reference: number): number {
  return getHours(reference)
}

/** 分钟 */
export function getMinuteNumber(reference: number): number {
  return getMinutes(reference)
}

/** 秒 */
export function getSecondNumber(reference: number): number {
  return getSeconds(reference)
}

/** 替换时间戳的时分秒（毫秒归零），日期部分保持不变 */
export function setTimeTimestamp(reference: number, hour: number, minute: number, second: number): number {
  return set(reference, { hours: hour, minutes: minute, seconds: second, milliseconds: 0 }).getTime()
}

/**
 * 归一化时间步长
 *
 * 步长必须能整除该单位的刻度总数（时 24 / 分 60 / 秒 60），否则末位会留下除不尽的零头
 * （如 5 小时步长会得到 0,5,…,20 而丢掉 21-23），此时退回 1。
 */
export function mergeTimeStep(name: PickerTimeUnitName, step: number | undefined): number {
  const mergedStep = step ?? 1
  if (mergedStep < 1 || (TIME_UNIT_MAX[name] + 1) % mergedStep !== 0) {
    return 1
  }
  return mergedStep
}

/** 生成某一时间单位的候选列（`disabledUnits` 为按 24 小时制取值标记的禁用项） */
export function generateTimeUnits(
  name: PickerTimeUnitName,
  step: number | undefined,
  disabledUnits?: number[]
): PickerTimeUnit[] {
  const mergedStep = mergeTimeStep(name, step)
  const units: PickerTimeUnit[] = []
  for (let value = 0; value <= TIME_UNIT_MAX[name]; value += mergedStep) {
    units.push({
      label: String(value).padStart(UNIT_LABEL_LENGTH, '0'),
      value,
      disabled: disabledUnits?.includes(value) ?? false
    })
  }
  return units
}

/** 12 小时制下小时列的取值（0-11） */
export function toHourColumnValue(hour: number): number {
  return hour % HALF_DAY_HOURS
}

/** 由「上午 / 下午 + 小时列取值」还原 24 小时制小时 */
export function toHour24(columnHour: number, isPM: boolean): number {
  return isPM ? columnHour + HALF_DAY_HOURS : columnHour
}

/** 12 小时制下小时列的文本（0 点展示为 12） */
export function getHourColumnLabel(columnHour: number): string {
  return columnHour === 0 ? String(HALF_DAY_HOURS) : String(columnHour).padStart(UNIT_LABEL_LENGTH, '0')
}

/**
 * 按展示格式解析时间面板的列显隐与 12 小时制
 *
 * 格式中含 `s` / `m` / `H`·`h` 才展示对应列，含 `a`·`A` 则启用 12 小时制；
 * 未传格式时三列全展示。显式传入的 `use12Hours` 优先于格式推导。
 */
export function resolveTimePanelLayout(formatStr?: string, use12Hours?: boolean): PickerTimePanelLayout {
  const placeholders = formatStr ?? ''
  const is12Hours = use12Hours ?? /[aA]/.test(placeholders)
  if (!placeholders) {
    return { use12Hours: is12Hours, showHour: true, showMinute: true, showSecond: true }
  }
  return {
    use12Hours: is12Hours,
    showHour: /[Hh]/.test(placeholders),
    showMinute: placeholders.includes('m'),
    showSecond: placeholders.includes('s')
  }
}

/** 时间面板头部的文本格式（由列显隐推导，避免出现没有对应列的刻度） */
export function getTimeTextFormat(layout: PickerTimePanelLayout): string {
  const parts: string[] = []
  if (layout.showHour) {
    parts.push(layout.use12Hours ? 'hh' : 'HH')
  }
  if (layout.showMinute) {
    parts.push('mm')
  }
  if (layout.showSecond) {
    parts.push('ss')
  }
  return parts.join(':')
}

/**
 * 「此刻」按钮的取整结果
 *
 * 当前时分秒按步长向下取整；若被取整到更早的刻度，则其后的分 / 秒取该单位的最大合法刻度
 * （如步长 5 时 12:03:07 → 12:00:55），避免落在一个不存在的刻度上。
 */
export function getLowerBoundTime(
  hour: number,
  minute: number,
  second: number,
  hourStep: number,
  minuteStep: number,
  secondStep: number
): [number, number, number] {
  const lowerBoundHour = Math.floor(hour / hourStep) * hourStep
  if (lowerBoundHour < hour) {
    return [lowerBoundHour, TIME_UNIT_MAX.minute - minuteStep + 1, TIME_UNIT_MAX.second - secondStep + 1]
  }
  const lowerBoundMinute = Math.floor(minute / minuteStep) * minuteStep
  if (lowerBoundMinute < minute) {
    return [lowerBoundHour, lowerBoundMinute, TIME_UNIT_MAX.second - secondStep + 1]
  }
  const lowerBoundSecond = Math.floor(second / secondStep) * secondStep
  return [lowerBoundHour, lowerBoundMinute, lowerBoundSecond]
}
