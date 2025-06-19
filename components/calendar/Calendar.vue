<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  addDays,
  addMonths,
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
  startOfYear,
  set
} from 'date-fns'
import Select from 'components/select'
import Radio from 'components/radio'
import { useSlotsExist, useInject } from 'components/utils'
import type { SelectOption, RadioOption } from 'vue-amazing-ui'
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type DefaultWeek = '一' | '二' | '三' | '四' | '五' | '六' | '日'
export interface Props {
  display?: 'panel' | 'card' // 日历展示方式，面板/卡片
  mode?: 'month' | 'year' // 初始模式
  header?: string // 自定义日历头部内容 string | slot
  yearSelectProps?: object // 年选择器 props，参考 Select 组件 Props
  monthSelectProps?: object // 月选择器 props，参考 Select 组件 Props
  modeRadioProps?: object // 模式切换器 props，参考 Radio 组件 Props
  startDayOfWeek?: DayOfWeek // 一周的开始是星期几，0-6，0 是周一
  dateStrip?: boolean // 日历面板默认会显示六周的日期，当最后一周的日期不包含当月日期时，是否去掉
  dateFormat?: (date: number, timestamp: number) => string // 自定义日期展示格式
  weekFormat?: (defaultWeek: DefaultWeek, week: number, timestamp: number) => string // 自定义星期展示格式
  monthFormat?: (month: number, timestamp: number) => string // 自定义月展示格式
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  valueFormat?: string // 被选中日期的格式，默认为时间戳；参考 format https://date-fns.org/v4.1.0/docs/format
}
const props = withDefaults(defineProps<Props>(), {
  display: 'panel',
  mode: 'month',
  header: undefined,
  yearSelectProps: () => ({}),
  monthSelectProps: () => ({}),
  modeRadioProps: () => ({}),
  startDayOfWeek: 0,
  dateStrip: true,
  dateFormat: undefined,
  weekFormat: undefined,
  monthFormat: undefined,
  disabledDate: undefined,
  valueFormat: undefined
})
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
const now = ref(Date.now())
const yearOptions = ref<SelectOption[]>([])
const monthOptions = ref<SelectOption[]>(getMonthOptions())
const modeOptions = ref<RadioOption[]>([
  {
    label: '月',
    value: 'month'
  },
  {
    label: '年',
    value: 'year'
  }
])
const calendarYear = ref<number>(getYear(now.value))
const calendarMonth = ref<number>(getMonth(now.value) + 1)
const calendarMode = ref<Props['mode']>(props.mode)
const calendarDates = ref<Array<DateItem[]>>([])
const calendarMonths = ref<Array<MonthItem[]>>([])
const { colorPalettes } = useInject('Calendar') // 主题色注入
const emits = defineEmits(['change', 'panelChange', 'select'])
const slotsExist = useSlotsExist(['header'])
const defaultWeeks = computed(() => {
  const origin: DefaultWeek[] = ['一', '二', '三', '四', '五', '六', '日']
  const result: DefaultWeek[] = []
  result.push(origin[props.startDayOfWeek])
  let startDay = (props.startDayOfWeek + 1) % 7
  while (startDay !== props.startDayOfWeek) {
    result.push(origin[startDay])
    startDay = (startDay + 1) % 7
  }
  return result
})
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
  selectedValueTimestamp,
  (to) => {
    if (to) {
      calendarYear.value = getYear(to)
      calendarMonth.value = getMonth(to) + 1
    }
  },
  {
    immediate: true
  }
)
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
    yearOptions.value = getYearOptions()
    calendarMonths.value = getCalendarMonths()
  },
  {
    immediate: true
  }
)
watch(
  () => props.valueFormat,
  (to) => {
    if (selectedValue.value) {
      if (to === undefined || to === 'T') {
        if (typeof selectedValue.value === 'string') {
          selectedValue.value = Number(format(startOfDay(selectedValue.value).getTime(), 'T'))
        }
      } else {
        selectedValue.value = format(startOfDay(selectedValue.value).getTime(), to)
      }
    }
  },
  {
    immediate: true
  }
)
function getYearOptions(): SelectOption[] {
  const options = []
  const startYear = calendarYear.value - 10
  const endYear = calendarYear.value + 10
  for (let y = startYear; y < endYear; y++) {
    options.push({
      label: `${y}年`,
      value: y
    })
  }
  return options
}
function getMonthOptions(): SelectOption[] {
  const options = []
  for (let m = 1; m <= 12; m++) {
    options.push({
      label: `${m}月`,
      value: m
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
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: isSameDay(currentTs, time)
  }
}
function getDates(monthTs: number, currentTs: number, startDay: DayOfWeek, strip: boolean = false): DateItem[] {
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
    isCurrent: isSameMonth(currentTs, monthTs)
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
  return result
}
function getDateStr(date: DateItem): string {
  return format(date.timestamp, 'yyyy-MM-dd')
}
function getMonthStr(month: MonthItem): string {
  return format(month.timestamp, 'yyyy-MM')
}
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
function formatDate(timestamp: number): number | string {
  if (props.valueFormat === undefined || props.valueFormat === 'T') {
    return Number(format(timestamp, 'T'))
  } else {
    return format(timestamp, props.valueFormat)
  }
}
function onDateSelected(date: DateItem): void {
  let newDateValue
  if (selectedValueTimestamp.value) {
    if (startOfDay(new Date(selectedValueTimestamp.value)).getTime() !== date.timestamp) {
      newDateValue = set(new Date(selectedValueTimestamp.value), {
        year: date.dateObject.year,
        month: date.dateObject.month,
        date: date.dateObject.date
      }).getTime()
    }
  } else {
    newDateValue = date.timestamp
  }
  if (newDateValue) {
    newDateValue = formatDate(newDateValue)
    selectedValue.value = newDateValue
    emits('select', newDateValue, 'date')
    emits('change', newDateValue, date.dateObject)
  }
}
function onMonthSelected(month: MonthItem): void {
  let newDateValue
  if (selectedValueTimestamp.value) {
    if (startOfMonth(new Date(selectedValueTimestamp.value)).getTime() !== month.timestamp) {
      newDateValue = set(new Date(selectedValueTimestamp.value), {
        year: month.monthObject.year,
        month: month.monthObject.month
      }).getTime()
    }
  } else {
    newDateValue = month.timestamp
  }
  if (newDateValue) {
    newDateValue = formatDate(newDateValue)
    selectedValue.value = newDateValue
    emits('select', newDateValue, 'month')
    emits('change', newDateValue, month.monthObject)
  }
}
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
</script>
<template>
  <div
    class="m-calendar"
    :class="`calendar-${display}`"
    :style="`
      --calendar-primary-color: ${colorPalettes[5]};
      --calendar-panel-primary-bg-color: ${colorPalettes[0]};
      --calendar-card-primary-bg-color: ${colorPalettes[5]};
    `"
  >
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
          v-bind="yearSelectProps"
        />
        <Select
          v-if="calendarMode === 'month'"
          class="calendar-month-select"
          :size="display === 'card' ? 'small' : 'middle'"
          :options="monthOptions"
          :max-display="8"
          v-model="calendarMonth"
          @change="onPanelChange"
          v-bind="monthSelectProps"
        />
        <Radio
          class="calendar-mode-radio"
          :button-size="display === 'card' ? 'small' : 'middle'"
          :options="modeOptions"
          v-model:value="calendarMode"
          button
          @change="onPanelChange"
          v-bind="modeRadioProps"
        />
      </div>
    </div>
    <div tabindex="0" class="calendar-display-wrap">
      <div v-if="calendarMode === 'month'" class="calendar-date-panel">
        <div class="calendar-body">
          <table class="calendar-table">
            <thead>
              <tr>
                <th v-for="(defaultWeek, index) in defaultWeeks" :key="index">
                  <slot
                    name="week"
                    :defaultWeek="defaultWeek"
                    :week="index"
                    :timestamp="calendarDates[0][index].timestamp"
                    >{{ getWeekFormat(defaultWeek, index, calendarDates[0][index].timestamp) }}</slot
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(weekDates, weekIndex) in calendarDates" :key="weekIndex">
                <td
                  class="calendar-date-cell"
                  :class="{
                    'date-cell-disabled': disabledDate && disabledDate(dateItem.timestamp),
                    'date-cell-in-view': dateItem.inCurrentMonth,
                    'date-cell-today': dateItem.isCurrentDate,
                    'date-cell-selected':
                      selectedValueTimestamp && startOfDay(selectedValueTimestamp).getTime() === dateItem.timestamp
                  }"
                  v-for="(dateItem, index) in weekDates"
                  :key="index"
                  :title="getDateStr(dateItem)"
                  @click="onDateSelected(dateItem)"
                >
                  <div class="date-cell-inner">
                    <div class="date-value">
                      <slot name="dateValue" v-bind="dateItem">{{
                        getDateFormat(dateItem.dateObject.date, dateItem.timestamp)
                      }}</slot>
                    </div>
                    <div class="date-content">
                      <slot name="dateContent" v-bind="dateItem"></slot>
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
                    'date-cell-selected':
                      selectedValueTimestamp && startOfMonth(selectedValueTimestamp).getTime() === monthItem.timestamp
                  }"
                  v-for="(monthItem, index) in rowMonths"
                  :key="index"
                  :title="getMonthStr(monthItem)"
                  @click="onMonthSelected(monthItem)"
                >
                  <div class="date-cell-inner">
                    <div class="date-value">
                      <slot name="monthValue" v-bind="monthItem">{{
                        getMonthFormat(monthItem.monthObject.month + 1, monthItem.timestamp)
                      }}</slot>
                    </div>
                    <div class="date-content">
                      <slot name="monthContent" v-bind="monthItem"></slot>
                    </div>
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
            color: rgba(0, 0, 0, 0.88);
            vertical-align: middle;
            background: transparent;
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
              border-color: var(--calendar-primary-color);
              .date-value {
                color: rgba(0, 0, 0, 0.88);
              }
            }
          }
          .date-cell-selected {
            .date-cell-inner {
              color: var(--calendar-primary-color);
              background: var(--calendar-panel-primary-bg-color);
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
              transition:
                background 0.2s,
                color 0.2s;
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
                border: 1px solid var(--calendar-primary-color);
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
              background: var(--calendar-card-primary-bg-color);
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
