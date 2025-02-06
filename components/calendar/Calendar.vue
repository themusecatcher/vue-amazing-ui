<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick, computed } from 'vue'
import type { VNode, Slot } from 'vue'
import {
  addDays,
  addMonths,
  addQuarters,
  addYears,
  format,
  getDate,
  getDay,
  getMonth,
  getQuarter,
  getTime,
  getYear,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  isSameWeek,
  isSameYear,
  isValid,
  parse,
  setYear,
  startOfDay,
  startOfMonth,
  startOfYear
} from 'date-fns'
import type { SelectOption, RadioOption } from 'vue-amazing-ui'
import Select from 'components/select'
import Radio from 'components/radio'
export interface Props {
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  display?: 'panel' | 'card' // 日历展示方式，面板/卡片
  mode?: 'month' | 'year' // 初始模式
  value?: number // (v-model) 当前被选中的日期的时间戳
}
const props = withDefaults(defineProps<Props>(), {
  disabledDate: undefined,
  display: 'panel',
  mode: 'month',
  value: undefined
})
export interface DateItem {
  type: 'date'
  dateObject: {
    date: number
    month: number
    year: number
  }
  inCurrentMonth: boolean
  isCurrentDate: boolean
  inSpan: boolean
  startOfSpan: boolean
  endOfSpan: boolean
  selected: boolean
  inSelectedWeek: boolean
  ts: number
}
const yearOptions = reactive<SelectOption[]>([])
const monthOptions = reactive<SelectOption[]>([])
const modeOptions = reactive<RadioOption[]>([
  {
    label: '月',
    value: 'month'
  },
  {
    label: '年',
    value: 'year'
  }
])
const weeks = ['一', '二', '三', '四', '五', '六', '日']
const now = Date.now()
const calendarYear = ref<number>(getYear(now))
const calendarMonth = ref<number>(getMonth(now) + 1)
const calendarMode = ref<'month' | 'year'>(props.mode)
const matcherMap = {
  date: isSameDay,
  month: isSameMonth,
  year: isSameYear,
  quarter: isSameQuarter
} as const
const calendarDates = ref<Array<DateItem[]>>([])
const dateSelectedTimestamp = ref<number>(startOfDay(now).getTime())
const calendarMonths = ref<Array<MonthItem[]>>([])
const monthSelectedTimestamp = ref<number>(startOfMonth(now).getTime())
const emits = defineEmits(['update:value', 'change', 'panelChange'])
watch(
  () => props.mode,
  (to) => {
    calendarMode.value = to
  }
)
watch(
  () => [calendarYear.value, calendarMonth.value],
  () => {
    const firstDayOfMonth = new Date(calendarYear.value, calendarMonth.value - 1, 1)
    const startOfMonthTimestamp = firstDayOfMonth.getTime()
    calendarDates.value = getCalendarDates(startOfMonthTimestamp)
    calendarMonths.value = getCalendarMonths(startOfMonthTimestamp)
    console.log('calendarDates', calendarDates.value)
    console.log('calendarMonths', calendarMonths.value)
  },
  {
    deep: true,
    immediate: true
  }
)
onMounted(() => {
  getYearOptions()
  getMonthOptions()
})
function getYearOptions() {
  yearOptions.length = 0
  const startYear = calendarYear.value - 10
  const endYear = calendarYear.value + 9
  for (let y = startYear; y <= endYear; y++) {
    yearOptions.push({
      label: `${y}年`,
      value: y
    })
  }
}
function getMonthOptions() {
  for (let m = 1; m <= 12; m++) {
    monthOptions.push({
      label: `${m}月`,
      value: m
    })
  }
}
// 0 is Monday
export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
function dateOrWeekItem(
  time: number,
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  mode: 'date' | 'week',
  firstDayOfWeek: FirstDayOfWeek
): DateItem {
  if (mode === 'date') {
    return dateItem(time, monthTs, valueTs, currentTs)
  } else {
    return weekItem(time, monthTs, valueTs, currentTs, firstDayOfWeek)
  }
}
function makeWeekMatcher(firstDayOfWeek: FirstDayOfWeek) {
  return (sourceTime: number, patternTime: number | Date) => {
    // date-fns: 0 - Sunday
    // naive-ui: 0 - Monday
    const weekStartsOn = ((firstDayOfWeek + 1) % 7) as FirstDayOfWeek
    return isSameWeek(sourceTime, patternTime, { weekStartsOn })
  }
}
function matchDate(
  sourceTime: number,
  patternTime: number | Date,
  type: 'date' | 'month' | 'year' | 'quarter' | 'week',
  firstDayOfWeek: FirstDayOfWeek = 0
): boolean {
  const matcher = type === 'week' ? makeWeekMatcher(firstDayOfWeek) : matcherMap[type]
  return matcher(sourceTime, patternTime)
}
// date item's valueTs can be a tuple since two date may show in one panel, so
// any matched value would make it shown as selected
function dateItem(
  time: number,
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number
): DateItem {
  let inSpan = false
  let startOfSpan = false
  let endOfSpan = false
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time && time < valueTs[1]) {
      inSpan = true
    }
    if (matchDate(valueTs[0], time, 'date')) startOfSpan = true
    if (matchDate(valueTs[1], time, 'date')) endOfSpan = true
  }
  const selected =
    valueTs !== null &&
    (Array.isArray(valueTs)
      ? matchDate(valueTs[0], time, 'date') || matchDate(valueTs[1], time, 'date')
      : matchDate(valueTs, time, 'date'))
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time, 'date'),
    inSpan,
    inSelectedWeek: false,
    startOfSpan,
    endOfSpan,
    selected,
    ts: getTime(time)
  }
}
function weekItem(
  time: number,
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  firstDayOfWeek: FirstDayOfWeek
): DateItem {
  let inSpan = false
  let startOfSpan = false
  let endOfSpan = false
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time && time < valueTs[1]) {
      inSpan = true
    }
    if (matchDate(valueTs[0], time, 'week', firstDayOfWeek)) startOfSpan = true
    if (matchDate(valueTs[1], time, 'week', firstDayOfWeek)) endOfSpan = true
  }
  const inSelectedWeek =
    valueTs !== null &&
    (Array.isArray(valueTs)
      ? matchDate(valueTs[0], time, 'week', firstDayOfWeek) || matchDate(valueTs[1], time, 'week', firstDayOfWeek)
      : matchDate(valueTs, time, 'week', firstDayOfWeek))
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time, 'date'),
    inSpan,
    startOfSpan,
    endOfSpan,
    selected: false,
    inSelectedWeek,
    ts: getTime(time)
  }
}
/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 */
function getDates(
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  strip: boolean = false,
  weekMode: boolean = false
): DateItem[] {
  const granularity = weekMode ? 'week' : 'date'
  const displayMonth = getMonth(monthTs)
  // First day of current month
  let displayMonthIterator = getTime(startOfMonth(monthTs))
  // Last day of last month
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1))
  const calendarDays: DateItem[] = []
  let protectLastMonthDateIsShownFlag = !strip
  while (getDay(lastMonthIterator) !== startDay || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(dateOrWeekItem(lastMonthIterator, monthTs, valueTs, currentTs, granularity, startDay))
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1))
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay))
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  const endIndex = strip ? (calendarDays.length <= 28 ? 28 : calendarDays.length <= 35 ? 35 : 42) : 42
  while (calendarDays.length < endIndex) {
    calendarDays.push(dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay))
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }

  return calendarDays
}
console.log('startOfMonth(now).valueOf()', startOfMonth(now).valueOf())
function getCalendarDates(startOfMonthTimestamp: number): DateItem[][] {
  const dates = getDates(startOfMonthTimestamp, null, now, 0, true, false)
  const chunkSize = 7
  const chunkCount = dates.length / chunkSize
  const result: DateItem[][] = []
  for (let i = 0; i < chunkCount; i++) {
    result.push(dates.slice(i * chunkSize, (i + 1) * chunkSize))
  }
  console.log('result', result)
  return result
}
function getCalendarMonths(startOfMonthTimestamp: number): MonthItem[][] {
  const months = getMonths(startOfMonthTimestamp, null, now, { monthFormat: 'MMMM' })
  const chunkSize = 3
  const chunkCount = months.length / chunkSize
  const result: MonthItem[][] = []
  for (let i = 0; i < chunkCount; i++) {
    result.push(months.slice(i * chunkSize, (i + 1) * chunkSize))
  }
  console.log('result', result)
  return result
}
console.log('getDates', getDates(startOfMonth(now).valueOf(), null, now, 0, true, true))
function getDateStr(date: DateItem) {
  return format(date.ts, 'yyyy-MM-dd')
}
function getMonthStr(month: MonthItem) {
  return format(month.ts, 'yyyy-MM')
}
function onDateSelected(date: DateItem) {
  console.log('onDateSelected', date)
  if (dateSelectedTimestamp.value !== date.ts) {
    dateSelectedTimestamp.value = date.ts
  }
}
function onMonthSelected(month: MonthItem) {
  console.log('onMonthSelected', month)
  if (monthSelectedTimestamp.value !== month.ts) {
    monthSelectedTimestamp.value = month.ts
  }
}
export interface MonthItem {
  type: 'month'
  monthFormat: string
  dateObject: {
    month: number
    year: number
  }
  isCurrent: boolean
  selected: boolean
  ts: number
}
function monthItem(
  monthTs: number,
  valueTs: number | null,
  currentTs: number,
  {
    monthFormat
  }: {
    monthFormat: string
  }
): MonthItem {
  return {
    type: 'month',
    monthFormat,
    dateObject: {
      month: getMonth(monthTs),
      year: getYear(monthTs)
    },
    isCurrent: isSameMonth(currentTs, monthTs),
    selected: valueTs !== null && matchDate(valueTs, monthTs, 'month'),
    ts: getTime(monthTs)
  }
}
function getMonths(
  yearAnchorTs: number,
  valueTs: number | null,
  currentTs: number,
  format: {
    monthFormat: string
  }
): MonthItem[] {
  const calendarMonths: MonthItem[] = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 12; i++) {
    calendarMonths.push(monthItem(getTime(addMonths(yearStart, i)), valueTs, currentTs, format))
  }
  return calendarMonths
}
console.log('getMonths', getMonths(now, null, now, { monthFormat: 'MMMM' }))
function onPanelChange() {
  if (calendarMode.value === 'month') {
    emits('panelChange', { year: calendarYear.value, month: calendarMonth.value }, calendarMode.value)
  } else {
    emits('panelChange', { year: calendarYear.value }, calendarMode.value)
  }
}
</script>
<template>
  <div class="m-calendar" :class="`calendar-${display}`">
    <div class="calendar-header">
      <Select
        class="calendar-year-select"
        :size="display === 'card' ? 'small' : 'middle'"
        :options="yearOptions"
        v-model="calendarYear"
        @change="onPanelChange"
      />
      <Select
        v-if="calendarMode === 'month'"
        class="calendar-month-select"
        :size="display === 'card' ? 'small' : 'middle'"
        :options="monthOptions"
        v-model="calendarMonth"
        @change="onPanelChange" />
      <Radio
        class="calendar-mode-radio"
        :button-size="display === 'card' ? 'small' : 'middle'"
        :options="modeOptions"
        v-model:value="calendarMode"
        button
        @change="onPanelChange"
      />
    </div>
    <div tabindex="0" class="calendar-display-wrap">
      <div class="calendar-date-panel">
        <div class="calendar-body">
          <table class="calendar-table">
            <thead v-if="calendarMode === 'month'">
              <tr>
                <th v-for="(week, index) in weeks" :key="index">{{ week }}</th>
              </tr>
            </thead>
            <tbody v-if="calendarMode === 'month'">
              <tr v-for="(weekDates, weekIndex) in calendarDates" :key="weekIndex">
                <td
                  class="calendar-date-cell"
                  v-for="(dateItem, index) in weekDates"
                  :key="index"
                  :title="getDateStr(dateItem)"
                >
                  <div
                    class="date-cell-inner"
                    :class="{
                      'date-cell-in-view': dateItem.inCurrentMonth,
                      'date-cell-today': dateItem.isCurrentDate,
                      'date-cell-selected': dateSelectedTimestamp === dateItem.ts
                    }"
                    @click="onDateSelected(dateItem)"
                  >
                    <div class="date-value">{{ dateItem.dateObject.date }}</div>
                    <div class="date-content"></div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="calendarMode === 'year'">
              <tr v-for="(rowMonths, rowIndex) in calendarMonths" :key="rowIndex">
                <td
                  class="calendar-date-cell"
                  v-for="(monthItem, index) in rowMonths"
                  :key="index"
                  :title="getMonthStr(monthItem)"
                >
                  <div
                    class="date-cell-inner date-cell-in-view"
                    :class="{
                      'date-cell-today': monthItem.isCurrent,
                      'date-cell-selected': monthSelectedTimestamp === monthItem.ts
                    }"
                    @click="onMonthSelected(monthItem)"
                  >
                    <div class="date-value">{{ monthItem.dateObject.month + 1 }}月</div>
                    <div class="date-content"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <slot name="header"></slot>
  </div>
</template>
<style lang="less" scoped>
.m-calendar {
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  background: #ffffff;
  .calendar-header {
    display: flex;
    justify-content: flex-end;
    padding: 12px 0;
    .calendar-year-select {
      min-width: 80px;
    }
    .calendar-month-select {
      min-width: 72px;
      margin-left: 8px;
    }
    .calendar-mode-radio {
      margin-left: 8px;
    }
  }
  .calendar-display-wrap {
    background: #ffffff;
    outline: none;
    .calendar-date-panel {
      display: flex;
      flex-direction: column;
      width: auto;
      .calendar-body {
        padding: 8px 0;
        .calendar-table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          th {
            height: auto;
            line-height: 18px;
            width: 36px;
            color: rgba(0, 0, 0, 0.88);
            vertical-align: middle;
            position: relative;
            min-width: 24px;
            font-weight: normal;
          }
          td {
            position: relative;
            min-width: 24px;
            font-weight: normal;
          }
          .calendar-date-cell {
            .date-cell-inner {
              position: relative;
              z-index: 2;
              min-width: 24px;
              line-height: 24px;
              color: rgba(0, 0, 0, 0.25);
              cursor: pointer;
              &:hover:not(.date-cell-selected) {
                background: rgba(0, 0, 0, 0.04);
              }
            }
            .date-cell-in-view {
              color: rgba(0, 0, 0, 0.88);
            }
          }
        }
      }
    }
  }
}
.calendar-panel {
  .calendar-display-wrap {
    width: 100%;
    text-align: end;
    .calendar-date-panel {
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
              border-top: 2px solid rgba(5, 5, 5, 0.06);
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
                color: rgba(0, 0, 0, 0.88);
                line-height: 1.5714285714285714;
                text-align: start;
              }
            }
            .date-cell-today {
              border-color: #1677ff;
            }
            .date-cell-selected {
              color: #1677ff;
              background: #e6f4ff;
            }
          }
        }
      }
    }
  }
}
.calendar-card {
  width: 300px;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 4px;
  .calendar-header {
    padding-left: 8px;
    padding-right: 8px;
  }
  .calendar-display-wrap {
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    border-radius: 0 0 8px 8px;
    .calendar-date-panel {
      .calendar-body {
        .calendar-table {
          // height: 256px;
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
              content: "";
              pointer-events: none;
            }
            .date-cell-inner {
              display: inline-block;
              height: 24px;
              border-radius: 4px;
              transition: background 0.2s, color 0.2s;
            }
            .date-cell-today {
              &::before {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                border: 1px solid #1677ff;
                border-radius: 4px;
                content: "";
              }
            }
            .date-cell-selected {
              color: #fff;
              background: #1677ff;
            }
          }
        }
      }
    }
  }
}
</style>
