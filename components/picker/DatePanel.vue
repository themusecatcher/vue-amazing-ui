<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PickerPanel from './PickerPanel.vue'
import {
  addMonthTimestamp,
  addYearTimestamp,
  formatTimestamp,
  getDayOfMonth,
  getMonthGrid,
  getMonthNumber,
  getMonthTimestamps,
  getWeekLabels,
  getYearNumber,
  getYearPanelGrid,
  getYearTimestamps,
  isMonthFullyDisabled,
  isSameDayTimestamp,
  isSameMonthTimestamp,
  isYearFullyDisabled,
  startOfDayTimestamp
} from './date-utils'
import type { StartDayOfWeek } from './date-utils'
import type { PickerPanelMode } from './types'
export interface DatePanelProps {
  value?: number | null // 当前选中日期（当日零点时间戳）
  startDayOfWeek?: StartDayOfWeek // 一周起始日
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  defaultPickerValue?: number // 面板初始日期
  showToday?: boolean // 是否展示「今天」快捷
}
const props = withDefaults(defineProps<DatePanelProps>(), {
  value: null,
  startDayOfWeek: 0,
  disabledDate: undefined,
  defaultPickerValue: undefined,
  showToday: true
})
const emits = defineEmits<{
  select: [timestamp: number]
  panelChange: [value: number, mode: PickerPanelMode]
}>()
/** 月/年面板的列数（行数由格数除以列数得出） */
const MONTH_COL_COUNT = 3
const YEAR_COL_COUNT = 3
/** 按列数切分为矩阵，供表格逐行渲染 */
function chunk<T>(list: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(list.length / size) }, (_, index) =>
    list.slice(index * size, index * size + size)
  )
}
const panelMode = ref<PickerPanelMode>('date')
// 进入当前视图前的视图（选完年份后回到来源视图：日期面板进来回日期面板，月面板进来回月面板）
const sourceMode = ref<PickerPanelMode>('date')
const viewDate = ref<number>(props.value ?? props.defaultPickerValue ?? Date.now())
// 选中值变化时把面板带过去；清空时保留当前视图，避免面板跳回今天
watch(
  () => props.value,
  (value) => {
    if (value) {
      viewDate.value = value
    }
  }
)
watch(
  () => props.defaultPickerValue,
  (value) => {
    if (value) {
      viewDate.value = value
    }
  }
)
const weekLabels = computed(() => getWeekLabels(props.startDayOfWeek))
const dateRows = computed(() => chunk(getMonthGrid(viewDate.value, props.startDayOfWeek), 7))
const monthRows = computed(() => chunk(getMonthTimestamps(viewDate.value), MONTH_COL_COUNT))
const yearRows = computed(() => chunk(getYearPanelGrid(viewDate.value), YEAR_COL_COUNT))
const viewYear = computed(() => getYearNumber(viewDate.value))
const viewMonth = computed(() => getMonthNumber(viewDate.value))
const decadeYears = computed(() => {
  const years = getYearTimestamps(viewDate.value)
  return `${getYearNumber(years[0])}-${getYearNumber(years[years.length - 1])}`
})
/** 当前视图是否为今天 */
function isToday(timestamp: number): boolean {
  return isSameDayTimestamp(timestamp, Date.now())
}
/** 是否为当前选中的日期 */
function isSelected(timestamp: number): boolean {
  return props.value !== null && isSameDayTimestamp(timestamp, props.value)
}
/** 是否落在当前展示的月份内 */
function isInView(timestamp: number): boolean {
  return isSameMonthTimestamp(timestamp, viewDate.value)
}
/** 是否落在当前展示的十年区间内 */
function isYearInView(timestamp: number): boolean {
  const year = getYearNumber(timestamp)
  const startYear = getYearNumber(getYearTimestamps(viewDate.value)[0])
  return year >= startYear && year < startYear + 10
}
/** 月面板格代表整月：月内每一天都不可选时才禁用（与日期格的「按天判定」区分） */
function isMonthDisabled(timestamp: number): boolean {
  return props.disabledDate ? isMonthFullyDisabled(timestamp, props.disabledDate) : false
}
/** 年面板格代表整年：12 个月都不可选时才禁用 */
function isYearDisabled(timestamp: number): boolean {
  return props.disabledDate ? isYearFullyDisabled(timestamp, props.disabledDate) : false
}
/** 是否为当前选中的月份（月面板格的比较粒度为月） */
function isSelectedMonth(timestamp: number): boolean {
  return props.value !== null && isSameMonthTimestamp(timestamp, props.value)
}
/** 是否为当前选中的年份（年面板格的比较粒度为年） */
function isSelectedYear(timestamp: number): boolean {
  return props.value !== null && getYearNumber(timestamp) === getYearNumber(props.value)
}
/** 「今天」是否不可选（与日期格同为当日零点口径） */
function isTodayDisabled(): boolean {
  return props.disabledDate ? props.disabledDate(startOfDayTimestamp(Date.now())) : false
}
function onDateSelect(timestamp: number) {
  if (props.disabledDate?.(timestamp)) {
    return
  }
  emits('select', timestamp)
}
// 选择月份与年份只切换面板视图，不直接提交值（与日期面板的层级递进一致）
function onMonthSelect(timestamp: number) {
  if (isMonthDisabled(timestamp)) {
    return
  }
  viewDate.value = timestamp
  changePanel('date', timestamp)
}
/**
 * 选择年份：只平移视图年份（保留当前月日）并回到来源视图
 *
 * 与参考实现同口径：从日期面板进入年面板时，选完年直接回日期面板；从月面板进入时回月面板。
 * 年份格本身是「1 月 1 日」，若直接把格时间戳写入视图会把月日重置为 1 月，故按年份差平移。
 */
function onYearSelect(timestamp: number) {
  if (isYearDisabled(timestamp)) {
    return
  }
  viewDate.value = addYearTimestamp(viewDate.value, getYearNumber(timestamp) - viewYear.value)
  changePanel(sourceMode.value === 'date' ? 'date' : 'month')
}
/** 「今天」快捷：与日期格选中同径（当日零点），由宿主提交并收起面板 */
function onTodaySelect() {
  if (isTodayDisabled()) {
    return
  }
  emits('select', startOfDayTimestamp(Date.now()))
}
function changePanel(mode: PickerPanelMode, timestamp: number = viewDate.value) {
  sourceMode.value = panelMode.value
  panelMode.value = mode
  emits('panelChange', timestamp, mode)
}
function onSuperPrev() {
  const diff = panelMode.value === 'year' ? -10 : -1
  viewDate.value = addYearTimestamp(viewDate.value, diff)
  emits('panelChange', viewDate.value, panelMode.value)
}
function onSuperNext() {
  const diff = panelMode.value === 'year' ? 10 : 1
  viewDate.value = addYearTimestamp(viewDate.value, diff)
  emits('panelChange', viewDate.value, panelMode.value)
}
function onPrev() {
  viewDate.value = addMonthTimestamp(viewDate.value, -1)
  emits('panelChange', viewDate.value, panelMode.value)
}
function onNext() {
  viewDate.value = addMonthTimestamp(viewDate.value, 1)
  emits('panelChange', viewDate.value, panelMode.value)
}
</script>
<template>
  <PickerPanel
    :show-single-nav="panelMode === 'date'"
    :show-footer="showToday && panelMode === 'date'"
    @super-prev="onSuperPrev"
    @super-next="onSuperNext"
    @prev="onPrev"
    @next="onNext"
  >
    <template #header>
      <template v-if="panelMode === 'date'">
        <button type="button" tabindex="-1" class="picker-panel-year-btn" @click="changePanel('year')"
          >{{ viewYear }}年</button
        >
        <button type="button" tabindex="-1" class="picker-panel-month-btn" @click="changePanel('month')"
          >{{ viewMonth }}月</button
        >
      </template>
      <button
        v-else-if="panelMode === 'month'"
        type="button"
        tabindex="-1"
        class="picker-panel-year-btn"
        @click="changePanel('year')"
        >{{ viewYear }}年</button
      >
      <span v-else>{{ decadeYears }}</span>
    </template>
    <div v-if="panelMode === 'date'" class="picker-panel-content picker-panel-date-content">
      <table>
        <thead>
          <tr>
            <th v-for="(label, index) in weekLabels" :key="index">{{ label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dateRows" :key="rowIndex">
            <td
              v-for="(timestamp, cellIndex) in row"
              :key="cellIndex"
              class="picker-panel-cell"
              :class="{
                'picker-panel-cell-in-view': isInView(timestamp),
                'picker-panel-cell-today': isToday(timestamp),
                'picker-panel-cell-selected': isSelected(timestamp),
                'picker-panel-cell-disabled': disabledDate && disabledDate(timestamp)
              }"
              :title="formatTimestamp(timestamp, 'yyyy-MM-dd')"
              @click="onDateSelect(timestamp)"
            >
              <div class="picker-panel-cell-inner">{{ getDayOfMonth(timestamp) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="panelMode === 'month'" class="picker-panel-content picker-panel-month-content">
      <table>
        <tbody>
          <tr v-for="(row, rowIndex) in monthRows" :key="rowIndex">
            <td
              v-for="(timestamp, cellIndex) in row"
              :key="cellIndex"
              class="picker-panel-cell picker-panel-cell-in-view"
              :class="{
                'picker-panel-cell-selected': isSelectedMonth(timestamp),
                'picker-panel-cell-disabled': isMonthDisabled(timestamp)
              }"
              :title="formatTimestamp(timestamp, 'yyyy-MM')"
              @click="onMonthSelect(timestamp)"
            >
              <div class="picker-panel-cell-inner">{{ getMonthNumber(timestamp) }}月</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="picker-panel-content picker-panel-year-content">
      <table>
        <tbody>
          <tr v-for="(row, rowIndex) in yearRows" :key="rowIndex">
            <td
              v-for="(timestamp, cellIndex) in row"
              :key="cellIndex"
              class="picker-panel-cell picker-panel-cell-in-view"
              :class="{
                'picker-panel-cell-selected': isSelectedYear(timestamp),
                'picker-panel-cell-disabled': isYearDisabled(timestamp)
              }"
              :title="formatTimestamp(timestamp, 'yyyy')"
              @click="onYearSelect(timestamp)"
            >
              <div
                class="picker-panel-cell-inner picker-panel-cell-inner-year"
                :class="{ 'picker-panel-cell-out-view': !isYearInView(timestamp) }"
              >
                {{ getYearNumber(timestamp) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <a
        class="picker-panel-today-btn"
        :class="{ 'picker-panel-today-btn-disabled': isTodayDisabled() }"
        :aria-disabled="isTodayDisabled()"
        @click="onTodaySelect"
      >
        今天
      </a>
    </template>
  </PickerPanel>
</template>
<style lang="less" scoped>
.picker-panel-content {
  width: 100%;
  // 表格布局属性须落在 table 上：写在包裹层不生效，会退回 auto + separate，
  // 默认 border-spacing（2px）会挤占格宽并露出格间缝隙
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }
  th,
  td {
    position: relative;
    min-width: 24px;
    font-weight: normal;
  }
  th {
    height: 32px;
    color: rgba(0, 0, 0, 0.88);
    vertical-align: middle;
  }
}
.picker-panel-date-content {
  padding: 8px 12px;
  table {
    // 7 列日期格
    width: 252px;
  }
  th {
    width: 36px;
  }
}
.picker-panel-month-content,
.picker-panel-year-content {
  // 月 / 年面板上下不留内边距，高度由表格自身决定（4 行 × 66px）
  padding: 0 8px;
  table {
    height: 264px;
  }
}
.picker-panel-cell {
  padding: 4px 0;
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    z-index: 1;
    height: 24px;
    content: '';
    transform: translateY(-50%);
    transition: all 0.3s;
  }
  .picker-panel-cell-inner {
    position: relative;
    z-index: 2;
    display: inline-block;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    transition:
      background 0.2s,
      border 0.2s;
  }
  &:hover:not(.picker-panel-cell-selected) .picker-panel-cell-inner {
    background: rgba(0, 0, 0, 0.04);
  }
  &.picker-panel-cell-in-view {
    color: rgba(0, 0, 0, 0.88);
  }
  &.picker-panel-cell-in-view.picker-panel-cell-today .picker-panel-cell-inner::before {
    position: absolute;
    inset: 0;
    z-index: 1;
    border: 1px solid var(--picker-primary-color, #1677ff);
    border-radius: 4px;
    content: '';
  }
  &.picker-panel-cell-in-view.picker-panel-cell-selected .picker-panel-cell-inner {
    color: #fff;
    background: var(--picker-primary-color, #1677ff);
  }
  &.picker-panel-cell-disabled {
    color: rgba(0, 0, 0, 0.25);
    pointer-events: none;
    .picker-panel-cell-inner {
      background: transparent;
    }
    &::before {
      background: rgba(0, 0, 0, 0.04);
    }
  }
  &.picker-panel-cell-disabled.picker-panel-cell-today .picker-panel-cell-inner::before {
    border-color: rgba(0, 0, 0, 0.25);
  }
}
.picker-panel-month-content .picker-panel-cell .picker-panel-cell-inner,
.picker-panel-year-content .picker-panel-cell .picker-panel-cell-inner {
  // 固定宽度，使三个月格 / 年格等宽且居中（与日期格 24px 的自适应宽度区分）
  width: 60px;
  padding: 0 8px;
}
.picker-panel-cell-inner-year.picker-panel-cell-out-view {
  color: rgba(0, 0, 0, 0.25);
}
.picker-panel-today-btn {
  color: var(--picker-primary-color, #1677ff);
  cursor: pointer;
  &:hover {
    color: var(--picker-primary-color-hover, #4096ff);
  }
  &.picker-panel-today-btn-disabled {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
}
</style>
