<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue'
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDate,
  getDay,
  getMonth,
  getTime,
  getYear,
  isSameDay,
  isSameMonth,
  parse,
  startOfDay,
  startOfMonth,
  startOfYear
} from 'date-fns'
import Select from 'components/select'
import Radio from 'components/radio'
import { useSlotsExist } from 'components/utils'
import type { SelectOption, RadioOption } from 'vue-amazing-ui'
export type StartDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type DefaultWeek = '一' | '二' | '三' | '四' | '五' | '六' | '日'
export interface Props {
  display?: 'panel' | 'card' // 日历展示方式，面板/卡片
  mode?: 'month' | 'year' // 初始模式
  header?: string // 自定义头部内容 string | slot
  startDayOfWeek?: StartDayOfWeek // 一周的开始是星期几，0-6，0 是周一
  dateStrip?: boolean // 日历面板默认会显示六周的日期，当最后一周的日期不包含当月日期时，是否去掉
  dateFormat?: (date: number) => string // 自定义日期展示格式
  weekFormat?: (defaultWeek: DefaultWeek, week: number) => string // 自定义星期展示格式
  monthFormat?: (month: number) => string // 自定义月展示格式
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  valueFormat?: string // 被选中日期的格式，默认为时间戳；参考 https://date-fns.org/v4.1.0/docs/format
  value?: string | number // (v-model) 当前被选中的日期的时间戳
}
const props = withDefaults(defineProps<Props>(), {
  display: 'panel',
  mode: 'month',
  header: undefined,
  startDayOfWeek: 0,
  dateStrip: true,
  dateFormat: undefined,
  weekFormat: undefined,
  monthFormat: undefined,
  disabledDate: undefined,
  valueFormat: undefined,
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
  ts: number
}
export interface MonthItem {
  type: 'month'
  dateObject: {
    month: number
    year: number
  }
  isCurrent: boolean
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
const now = ref(Date.now())
const defaultWeeks = computed(() => {
  const origin: DefaultWeek[] = ['一', '二', '三', '四', '五', '六', '日']
  const result: DefaultWeek[] = []
  result.push(origin[props.startDayOfWeek])
  let startDay = (props.startDayOfWeek + 1) % 7
  while(startDay !== props.startDayOfWeek) {
    result.push(origin[startDay])
    startDay = (startDay + 1) % 7
  }
  return result
})
const calendarYear = ref<number>(getYear(now.value))
const calendarMonth = ref<number>(getMonth(now.value) + 1)
const calendarMode = ref<Props['mode']>(props.mode)
const calendarDates = ref<Array<DateItem[]>>([])
const selectedValue = ref<string | number>()
const calendarMonths = ref<Array<MonthItem[]>>([])
const slotsExist = useSlotsExist(['header'])
const emits = defineEmits(['update:value', 'change', 'panelChange', 'select'])
const selectedValueTimestamp = computed(() => {
  if (!selectedValue.value) return
  if (typeof selectedValue.value === 'string') {
    return parse(selectedValue.value, props.valueFormat as string, new Date()).getTime()
  }
  return selectedValue.value
})
const startOfMonthTimestamp = computed(() => {
  const firstDayOfMonth = new Date(calendarYear.value, calendarMonth.value - 1, 1)
  return firstDayOfMonth.getTime()
})
const showHeader = computed(() => {
  return slotsExist.header || props.header
})
watch(
  () => props.mode,
  (to) => {
    calendarMode.value = to
  }
)
watch(
  () => [props.startDayOfWeek, props.dateStrip, calendarMonth.value, calendarYear.value],
  () => {
    calendarDates.value = getCalendarDates()
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  calendarYear,
  () => {
    calendarMonths.value = getCalendarMonths()
  },
  {
    immediate: true
  }
)
watch(
  () => [props.valueFormat, props.value],
  () => {
    if (props.value) {
      if (props.valueFormat === undefined || props.valueFormat === 'T') {
        selectedValue.value = Number(format(startOfDay(props.value).getTime(), props.valueFormat || 'T'))
      } else {
        selectedValue.value = format(startOfDay(props.value).getTime(), props.valueFormat)
      }
    }
    console.log('selectedValue', selectedValue.value)
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
function getYearOptions(): void {
  yearOptions.length = 0
  const startYear = calendarYear.value - 10
  const endYear = calendarYear.value + 10
  for (let y = startYear; y < endYear; y++) {
    yearOptions.push({
      label: `${y}年`,
      value: y
    })
  }
}
function getMonthOptions(): void {
  for (let m = 1; m <= 12; m++) {
    monthOptions.push({
      label: `${m}月`,
      value: m
    })
  }
}
function getDateItem(time: number, monthTs: number, currentTs: number): DateItem {
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: isSameDay(currentTs, time),
    ts: getTime(time)
  }
}
function getDates(monthTs: number, currentTs: number, startDay: StartDayOfWeek, strip: boolean = false): DateItem[] {
  const displayMonth = getMonth(monthTs)
  // First day of current month
  let displayMonthIterator = getTime(startOfMonth(monthTs))
  // Last day of last month
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1))
  const calendarDays: DateItem[] = []
  let protectLastMonthDateIsShownFlag = !strip
  while (getDay(lastMonthIterator) !== startDay || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(getDateItem(lastMonthIterator, monthTs, currentTs))
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1))
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(getDateItem(displayMonthIterator, monthTs, currentTs))
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  const endIndex = strip ? (calendarDays.length <= 28 ? 28 : calendarDays.length <= 35 ? 35 : 42) : 42
  while (calendarDays.length < endIndex) {
    calendarDays.push(getDateItem(displayMonthIterator, monthTs, currentTs))
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  return calendarDays
}
function getCalendarDates(): DateItem[][] {
  const dates = getDates(startOfMonthTimestamp.value, Date.now(), props.startDayOfWeek, props.dateStrip)
  // console.log('dates', dates)
  const chunkSize = 7
  const chunkCount = dates.length / chunkSize
  const result: DateItem[][] = []
  for (let i = 0; i < chunkCount; i++) {
    result.push(dates.slice(i * chunkSize, (i + 1) * chunkSize))
  }
  // console.log('result', result)
  return result
}
function getMonthItem(monthTs: number, currentTs: number): MonthItem {
  return {
    type: 'month',
    dateObject: {
      month: getMonth(monthTs),
      year: getYear(monthTs)
    },
    isCurrent: isSameMonth(currentTs, monthTs),
    ts: getTime(monthTs)
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
  const months = getMonths(startOfMonthTimestamp.value, Date.now())
  const chunkSize = 3
  const chunkCount = months.length / chunkSize
  const result: MonthItem[][] = []
  for (let i = 0; i < chunkCount; i++) {
    result.push(months.slice(i * chunkSize, (i + 1) * chunkSize))
  }
  // console.log('result', result)
  return result
}
function getDateStr(date: DateItem): string {
  return format(date.ts, 'yyyy-MM-dd')
}
function getMonthStr(month: MonthItem): string {
  return format(month.ts, 'yyyy-MM')
}
function getDateFormat(date: number): string {
  if (props.dateFormat === undefined) {
    return `${date}`
  } else {
    return props.dateFormat(date)
  }
}
function getWeekFormat(defaultWeek: DefaultWeek, week: number): string {
  if (props.weekFormat === undefined) {
    return defaultWeek
  } else {
    return props.weekFormat(defaultWeek, week)
  }
}
function getMonthFormat(month: number): string {
  if (props.monthFormat === undefined) {
    return `${month}月`
  } else {
    return props.monthFormat(month)
  }
}
function onDateSelected(date: DateItem): void {
  // console.log('onDateSelected', date)
  if (selectedValueTimestamp.value !== date.ts) {
    if (date.dateObject.month + 1 !== calendarMonth.value) {
      calendarMonth.value = date.dateObject.month + 1
    }
    if (props.valueFormat === undefined || props.valueFormat === 'T') {
      selectedValue.value = date.ts
    } else {
      selectedValue.value = format(date.ts, props.valueFormat)
    }
    emits('update:value', selectedValue.value)
    emits('select', selectedValue.value, 'date')
    emits('change', selectedValue.value, date.dateObject)
  }
}
function getSelectedValueStartOfMonthTimeStamp(): number | undefined {
  if (!selectedValue.value) return
  if (typeof selectedValue.value === 'string') {
    const selectedValueTimestamp = parse(selectedValue.value, props.valueFormat as string, new Date()).getTime()
    return startOfMonth(selectedValueTimestamp).getTime()
  }
  return startOfMonth(selectedValue.value).getTime()
}
function onMonthSelected(month: MonthItem): void {
  // console.log('onMonthSelected', month)
  if (getSelectedValueStartOfMonthTimeStamp() !== month.ts) {
    calendarMonth.value = month.dateObject.month + 1
    if (selectedValue.value) {
      const offsetYears = month.dateObject.year - getYear(selectedValueTimestamp.value as number)
      const offsetMonths = month.dateObject.month - getMonth(selectedValueTimestamp.value as number)
      const newDate = addMonths(addYears(selectedValueTimestamp.value as number, offsetYears), offsetMonths)
      if (props.valueFormat === undefined || props.valueFormat === 'T') {
        selectedValue.value = Number(format(newDate, props.valueFormat || 'T'))
      } else {
        selectedValue.value = format(newDate, props.valueFormat)
      }
    }
    emits('update:value', selectedValue.value)
    emits('select', selectedValue.value, 'month')
    emits('change', selectedValue.value, month.dateObject)
  }
}
function onPanelChange(): void {
  if (calendarMode.value === 'month') {
    emits('panelChange', { year: calendarYear.value, month: calendarMonth.value }, calendarMode.value)
  } else {
    emits('panelChange', { year: calendarYear.value }, calendarMode.value)
  }
}
</script>
<template>
  <div class="m-calendar" :class="`calendar-${display}`">
    <div class="calendar-header-wrap">
      <div v-if="showHeader" class="calendar-header-content">
        <slot name="header">{{ header }}</slot>
      </div>
      <div class="calendar-header-actions">
        <Select
          class="calendar-year-select"
          :size="display === 'card' ? 'small' : 'middle'"
          :options="yearOptions"
          :max-display="8"
          v-model="calendarYear"
          @change="onPanelChange"
        />
        <Select
          v-if="calendarMode === 'month'"
          class="calendar-month-select"
          :size="display === 'card' ? 'small' : 'middle'"
          :options="monthOptions"
          :max-display="8"
          v-model="calendarMonth"
          @change="onPanelChange"
        />
        <Radio
          class="calendar-mode-radio"
          :button-size="display === 'card' ? 'small' : 'middle'"
          :options="modeOptions"
          v-model:value="calendarMode"
          button
          @change="onPanelChange"
        />
      </div>
    </div>
    <div tabindex="0" class="calendar-display-wrap">
      <div v-if="calendarMode === 'month'" class="calendar-date-panel">
        <div class="calendar-body">
          <table class="calendar-table">
            <thead>
              <tr>
                <th v-for="(week, index) in defaultWeeks" :key="index">{{ getWeekFormat(week, index + 1) }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(weekDates, weekIndex) in calendarDates" :key="weekIndex">
                <td
                  class="calendar-date-cell"
                  :class="{
                    'date-cell-disabled': disabledDate && disabledDate(dateItem.ts),
                    'date-cell-in-view': dateItem.inCurrentMonth,
                    'date-cell-today': dateItem.isCurrentDate,
                    'date-cell-selected': selectedValueTimestamp && selectedValueTimestamp === dateItem.ts
                  }"
                  v-for="(dateItem, index) in weekDates"
                  :key="index"
                  :title="getDateStr(dateItem)"
                >
                  <div class="date-cell-inner" @click="onDateSelected(dateItem)">
                    <div class="date-value">
                      <slot name="dateCellValue" :dateObject="dateItem.dateObject" v-bind="dateItem.dateObject" :timestamp="dateItem.ts">{{ getDateFormat(dateItem.dateObject.date) }}</slot>
                    </div>
                    <div class="date-content">
                      <slot name="dateCellContent" :dateObject="dateItem.dateObject" v-bind="dateItem.dateObject" :timestamp="dateItem.ts"></slot>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="calendarMode === 'year'" class="calendar-month-panel">
        <div class="calendar-body">
          <table class="calendar-table">
            <tbody>
              <tr v-for="(rowMonths, rowIndex) in calendarMonths" :key="rowIndex">
                <td
                  class="calendar-date-cell date-cell-in-view"
                  :class="{
                    'date-cell-today': monthItem.isCurrent,
                    'date-cell-selected': selectedValueTimestamp && startOfMonth(selectedValueTimestamp).getTime() === monthItem.ts
                  }"
                  v-for="(monthItem, index) in rowMonths"
                  :key="index"
                  :title="getMonthStr(monthItem)"
                >
                  <div class="date-cell-inner" @click="onMonthSelected(monthItem)">
                    <div class="date-value">{{ getMonthFormat(monthItem.dateObject.month + 1) }}</div>
                    <div class="date-content"></div>
                  </div>
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
.m-calendar {
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  background: #ffffff;
  .calendar-header-wrap {
    padding: 12px 0;
    .calendar-header-content {
      margin-bottom: 10px;
    }
    .calendar-header-actions {
      display: flex;
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
    background: #ffffff;
    outline: none;
    .calendar-date-panel,
    .calendar-month-panel {
      display: flex;
      flex-direction: column;
      width: auto;
      .calendar-body {
        padding: 8px 0;
        .calendar-table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          th,
          td {
            position: relative;
            min-width: 24px;
            font-weight: normal;
          }
          th {
            height: auto;
            line-height: 18px;
            width: 36px;
            color: rgba(0, 0, 0, 0.88);
            vertical-align: middle;
          }
          .calendar-date-cell {
            color: rgba(0, 0, 0, 0.25);
            cursor: pointer;
            .date-cell-inner {
              position: relative;
              z-index: 2;
              min-width: 24px;
              line-height: 24px;
            }
            &:hover:not(.date-cell-selected) {
              .date-cell-inner {
                background: rgba(0, 0, 0, 0.04);
              }
            }
          }
          .date-cell-disabled {
            color: rgba(0, 0, 0, 0.25);
            pointer-events: none;
          }
          .date-cell-in-view:not(.date-cell-disabled):not(.date-cell-selected) {
            color: rgba(0, 0, 0, 0.88);
          }
        }
      }
    }
  }
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
          }
          .date-cell-today {
            .date-cell-inner {
              border-color: #1677ff;
              .date-value {
                color: rgba(0, 0, 0, 0.88);
              }
            }
          }
          .date-cell-selected {
            .date-cell-inner {
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
  .calendar-header-wrap {
    padding-left: 8px;
    padding-right: 8px;
    .calendar-header-actions {
      .calendar-year-select {
        min-width: 86px;
      }
      .calendar-month-select {
        min-width: 70px;
      }
    }
  }
  .calendar-display-wrap {
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    border-radius: 0 0 8px 8px;
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
              border-radius: 4px;
              transition: background 0.2s, color 0.2s;
            }
          }
          .date-cell-disabled {
            &::before {
              background: rgba(0, 0, 0, 0.04);
            }
          }
          .date-cell-today {
            .date-cell-inner {
              &::before {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                border: 1px solid #1677ff;
                border-radius: 4px;
                content: '';
              }
            }
          }
          .date-cell-disabled.date-cell-today {
            .date-cell-inner {
              &::before {
                border-color: rgba(0, 0, 0, 0.25);
              }
            }
          }
          .date-cell-selected {
            .date-cell-inner {
              color: #fff;
              background: #1677ff;
            }
          }
        }
      }
    }
    .calendar-date-panel {
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
</style>
