<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { VNode } from 'vue'
import PickerPanel from './PickerPanel.vue'
import PickerPanelHeader from './PickerPanelHeader.vue'
import {
  addMonthTimestamp,
  addYearTimestamp,
  formatTimestamp,
  getDayOfMonth,
  getMonthGrid,
  getMonthNumber,
  getMonthTimestamps,
  getQuarterNumber,
  getQuarterTimestamps,
  getRangeCellClassNames,
  getWeekLabels,
  getYearNumber,
  getYearPanelGrid,
  getYearTimestamps,
  isLastDayOfMonthTimestamp,
  isMonthFullyDisabled,
  isQuarterFullyDisabled,
  isSameDayTimestamp,
  isSameMonthTimestamp,
  isSameQuarterTimestamp,
  isYearFullyDisabled,
  startOfDayTimestamp
} from './date-utils'
import type { StartDayOfWeek } from './date-utils'
import type { PickerPanelMode, PickerRangeSide, PickerRangeValue } from './types'
export interface DatePanelProps {
  value?: number | null // 当前选中日期（当日零点时间戳）
  baseMode?: PickerPanelMode // 形态对应的面板层级：决定初始层级与「选中即提交」的层级
  startDayOfWeek?: StartDayOfWeek // 一周起始日
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  defaultPickerValue?: number // 面板初始日期
  panelValue?: number // 受控的面板展示日期（范围形态由容器统一驱动，不传时面板自持）
  showToday?: boolean // 是否展示「今天」快捷
  datetime?: boolean // 日期时间形态：主体右侧并排时间面板，底部改由 footer 插槽提供（「此刻 / 确定」）
  range?: boolean // 范围形态：日期格叠加区间高亮
  rangeValue?: PickerRangeValue | null // 范围形态的已选区间
  hoverValue?: PickerRangeValue | null // 范围形态的悬浮预览区间
  side?: PickerRangeSide // 范围形态的面板位置：左面板隐去「下一」组、右面板隐去「上一」组
  active?: boolean // 面板是否展开：展开时把展示日期带回当前值
}
export interface DatePanelSlots {
  aside?: () => VNode[] // 主体右侧的附加面板（日期时间形态的时间面板）
  presets?: () => VNode[] // 主体左侧的预设侧栏
  footer?: () => VNode[] // 底部内容，默认「今天」
}
const props = withDefaults(defineProps<DatePanelProps>(), {
  value: null,
  baseMode: 'date',
  startDayOfWeek: 0,
  disabledDate: undefined,
  defaultPickerValue: undefined,
  panelValue: undefined,
  showToday: true,
  datetime: false,
  range: false,
  rangeValue: null,
  hoverValue: null,
  side: undefined,
  active: false
})
defineSlots<DatePanelSlots>()
const emits = defineEmits<{
  select: [timestamp: number]
  panelChange: [value: number, mode: PickerPanelMode]
  panelValueChange: [value: number]
  cellHover: [timestamp: number] // 悬浮日期格：范围形态据此换算预览区间，单选形态据此在输入框展示预览文本
  cellLeave: [] // 移出日期格：清除预览
}>()
/** 月面板格的列数（行数由格数除以列数得出） */
const MONTH_COL_COUNT = 3
/** 季面板格的列数：4 格 1 行 */
const QUARTER_COL_COUNT = 4
const YEAR_COL_COUNT = 3
/** 按列数切分为矩阵，供表格逐行渲染 */
function chunk<T>(list: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(list.length / size) }, (_, index) =>
    list.slice(index * size, index * size + size)
  )
}
const panelMode = ref<PickerPanelMode>(props.baseMode)
// 进入当前视图前的视图（选完年份后回到来源视图：日期面板进来回日期面板，月 / 季面板进来回原面板）
const sourceMode = ref<PickerPanelMode>(props.baseMode)
const innerViewDate = ref<number>(props.panelValue ?? props.value ?? props.defaultPickerValue ?? Date.now())
const viewDate = computed(() => props.panelValue ?? innerViewDate.value)
/**
 * 切换面板展示日期
 *
 * 受控时（传了 `panelValue`）只上报变更、等宿主回传，使范围形态的左右面板能由同一个视图驱动；
 * 非受控时直接更新自身状态。
 */
function setViewDate(next: number) {
  if (props.panelValue === undefined) {
    innerViewDate.value = next
    return
  }
  emits('panelValueChange', next)
}
// 选中值变化时把面板带过去；清空时保留当前视图，避免面板跳回今天（受控时视图归容器管理）
watch(
  () => props.value,
  (value) => {
    if (value && props.panelValue === undefined) {
      innerViewDate.value = value
    }
  }
)
/**
 * 展开时把展示日期带回当前值，并回到形态基准层级
 *
 * 面板在浮层收起后并不销毁，若不在展开时重置，上一次翻页到别的月份、或钻取到年 / 月 / 季面板
 * 都会一直留在视图里，与触发器上显示的值对不上（受控时视图归容器管理，此处不介入视图）。
 */
watch(
  () => props.active,
  (active) => {
    if (!active) {
      return
    }
    panelMode.value = props.baseMode
    sourceMode.value = props.baseMode
    if (props.panelValue === undefined) {
      innerViewDate.value = props.value ?? props.defaultPickerValue ?? Date.now()
    }
  }
)
/** 形态变化（宿主动态切换 type）时回到形态基准层级 */
watch(
  () => props.baseMode,
  (mode) => {
    panelMode.value = mode
    sourceMode.value = mode
  }
)
watch(
  () => props.defaultPickerValue,
  (value) => {
    if (value && props.panelValue === undefined) {
      innerViewDate.value = value
    }
  }
)
const weekLabels = computed(() => getWeekLabels(props.startDayOfWeek))
const dateRows = computed(() => chunk(getMonthGrid(viewDate.value, props.startDayOfWeek), 7))
const monthRows = computed(() => chunk(getMonthTimestamps(viewDate.value), MONTH_COL_COUNT))
const quarterRows = computed(() => chunk(getQuarterTimestamps(viewDate.value), QUARTER_COL_COUNT))
const yearRows = computed(() => chunk(getYearPanelGrid(viewDate.value), YEAR_COL_COUNT))
const viewYear = computed(() => getYearNumber(viewDate.value))
const viewMonth = computed(() => getMonthNumber(viewDate.value))
const decadeYears = computed(() => {
  const years = getYearTimestamps(viewDate.value)
  return `${getYearNumber(years[0])}-${getYearNumber(years[years.length - 1])}`
})
/** 范围形态的格类名（非范围形态返回空对象，省去逐格的类名求值）；粒度随当前面板层级 */
function getCellRangeClasses(timestamp: number): Record<string, boolean> {
  if (!props.range) {
    return {}
  }
  return getRangeCellClassNames(timestamp, {
    value: props.rangeValue,
    hoverValue: props.hoverValue,
    viewDate: viewDate.value,
    mode: panelMode.value
  })
}
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
/** 底部可见性：日期时间形态的底部即「此刻 / 确定」，与「今天」的视图条件无关 */
const footerVisible = computed(() => props.datetime || (props.showToday && panelMode.value === 'date'))
// 范围形态两个面板并排：左面板的「下一」与右面板的「上一」指向同一个相邻月份，故各自隐去；
// 隐去仅隐本体、留占位，两个面板头部的视图区才会落在同一水平位置
const showPrevNav = computed(() => props.side !== 'end')
const showNextNav = computed(() => props.side !== 'start')
/** 月面板格代表整月：月内每一天都不可选时才禁用（与日期格的「按天判定」区分） */
function isMonthDisabled(timestamp: number): boolean {
  return props.disabledDate ? isMonthFullyDisabled(timestamp, props.disabledDate) : false
}
/** 年面板格代表整年：12 个月都不可选时才禁用 */
function isYearDisabled(timestamp: number): boolean {
  return props.disabledDate ? isYearFullyDisabled(timestamp, props.disabledDate) : false
}
/** 季面板格代表整季：季内 3 个月都不可选时才禁用 */
function isQuarterDisabled(timestamp: number): boolean {
  return props.disabledDate ? isQuarterFullyDisabled(timestamp, props.disabledDate) : false
}
/** 是否为当前选中的月份（月面板格的比较粒度为月） */
function isSelectedMonth(timestamp: number): boolean {
  return props.value !== null && isSameMonthTimestamp(timestamp, props.value)
}
/** 是否为当前选中的年份（年面板格的比较粒度为年） */
function isSelectedYear(timestamp: number): boolean {
  return props.value !== null && getYearNumber(timestamp) === getYearNumber(props.value)
}
/** 是否为当前选中的季度（季面板格的比较粒度为季） */
function isSelectedQuarter(timestamp: number): boolean {
  return props.value !== null && isSameQuarterTimestamp(timestamp, props.value)
}
/** 「今天」是否不可选（与日期格同为当日零点口径） */
function isTodayDisabled(): boolean {
  return props.disabledDate ? props.disabledDate(startOfDayTimestamp(Date.now())) : false
}
function onDateSelect(timestamp: number) {
  if (props.disabledDate?.(timestamp)) {
    return
  }
  // 选中跨月补齐日时把面板视图带到该月（范围形态下视图由容器统一驱动，两侧面板因此一起翻页）
  if (!isInView(timestamp)) {
    setViewDate(timestamp)
  }
  emits('select', timestamp)
}
/** 悬浮到日期格：范围形态由容器据此换算预览区间，单选形态由宿主据此预览文本 */
function onCellHover(timestamp: number) {
  emits('cellHover', timestamp)
}
/**
 * 移出日期格：清除预览
 *
 * 逐格 mouseleave：离开被悬浮的那一格即取消预览
 * 即撤预览——鼠标停在本面板的内边距、或两面板之间的空隙时，同样会先离开该格，预览不会滞留。
 */
function onCellLeave() {
  emits('cellLeave')
}
/**
 * 选择月份
 *
 * 形态即为月（`type="month"`）时点格即提交；其余情况（从日期面板钻取上来）只切换面板视图、
 * 不直接提交值（与日期面板的层级递进一致）。
 */
function onMonthSelect(timestamp: number) {
  if (isMonthDisabled(timestamp)) {
    return
  }
  setViewDate(timestamp)
  if (panelMode.value === props.baseMode) {
    emits('select', timestamp)
    return
  }
  changePanel('date', timestamp)
}
/** 选择季度：季面板只作为形态基准层级出现（不能从其他层级钻取进来），故点格即提交 */
function onQuarterSelect(timestamp: number) {
  if (isQuarterDisabled(timestamp)) {
    return
  }
  setViewDate(timestamp)
  emits('select', timestamp)
}
/**
 * 选择年份
 *
 * 面板层级即形态层级（`type="year"`）时点格即提交；其余情况只平移视图年份（保留当前月日）
 * 并回到来源视图——从日期面板进入年面板时选完年直接回日期面板，从月 / 季面板进入时回原面板。
 * 年份格本身是「1 月 1 日」，若直接把格时间戳写入视图会把月日重置为 1 月，故按年份差平移。
 */
function onYearSelect(timestamp: number) {
  if (isYearDisabled(timestamp)) {
    return
  }
  if (panelMode.value === props.baseMode) {
    emits('select', timestamp)
    return
  }
  setViewDate(addYearTimestamp(viewDate.value, getYearNumber(timestamp) - viewYear.value))
  changePanel(sourceMode.value)
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
// 翻页后的视图日期先落入局部变量再上报：受控模式下 viewDate 要等宿主回传才更新，不能读回自身
function onSuperPrev() {
  const next = addYearTimestamp(viewDate.value, panelMode.value === 'year' ? -10 : -1)
  setViewDate(next)
  emits('panelChange', next, panelMode.value)
}
function onSuperNext() {
  const next = addYearTimestamp(viewDate.value, panelMode.value === 'year' ? 10 : 1)
  setViewDate(next)
  emits('panelChange', next, panelMode.value)
}
function onPrev() {
  const next = addMonthTimestamp(viewDate.value, -1)
  setViewDate(next)
  emits('panelChange', next, panelMode.value)
}
function onNext() {
  const next = addMonthTimestamp(viewDate.value, 1)
  setViewDate(next)
  emits('panelChange', next, panelMode.value)
}
</script>
<template>
  <PickerPanel :show-footer="footerVisible">
    <template #presets>
      <slot name="presets" />
    </template>
    <div class="picker-date-panel-body">
      <!-- 悬浮预览只在日期格内有效：清除挂在**日期格自身**的 mouseleave 上（见下方格上的
           `@mouseleave`），移出该格即取消。挂在面板主体上的话，鼠标停在本面板的内边距
           （或两面板之间的空隙）时仍处于主体内，预览不会撤、输入框会一直显示悬浮日期 -->
      <div class="picker-date-panel-main">
        <PickerPanelHeader
          :show-single-nav="panelMode === 'date'"
          :show-prev="showPrevNav"
          :show-next="showNextNav"
          @super-prev="onSuperPrev"
          @super-next="onSuperNext"
          @prev="onPrev"
          @next="onNext"
        >
          <template #view>
            <template v-if="panelMode === 'date'">
              <button type="button" tabindex="-1" class="picker-panel-year-btn" @click="changePanel('year')"
                >{{ viewYear }}年</button
              >
              <button type="button" tabindex="-1" class="picker-panel-month-btn" @click="changePanel('month')"
                >{{ viewMonth }}月</button
              >
            </template>
            <button
              v-else-if="panelMode === 'month' || panelMode === 'quarter'"
              type="button"
              tabindex="-1"
              class="picker-panel-year-btn"
              @click="changePanel('year')"
              >{{ viewYear }}年</button
            >
            <span v-else>{{ decadeYears }}</span>
          </template>
        </PickerPanelHeader>
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
                  :class="[
                    {
                      'picker-panel-cell-in-view': isInView(timestamp),
                      'picker-panel-cell-today': isToday(timestamp),
                      // 月首 / 月末标记：范围预览在跨月边界处据此收边
                      'picker-panel-cell-start': getDayOfMonth(timestamp) === 1,
                      'picker-panel-cell-end': isLastDayOfMonthTimestamp(timestamp),
                      'picker-panel-cell-selected': isSelected(timestamp),
                      'picker-panel-cell-disabled': Boolean(disabledDate?.(timestamp))
                    },
                    getCellRangeClasses(timestamp)
                  ]"
                  :title="formatTimestamp(timestamp, 'yyyy-MM-dd')"
                  @click="onDateSelect(timestamp)"
                  @mouseenter="onCellHover(timestamp)"
                  @mouseleave="onCellLeave()"
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
                  :class="[
                    {
                      'picker-panel-cell-selected': isSelectedMonth(timestamp),
                      'picker-panel-cell-disabled': isMonthDisabled(timestamp)
                    },
                    getCellRangeClasses(timestamp)
                  ]"
                  :title="formatTimestamp(timestamp, 'yyyy-MM')"
                  @click="onMonthSelect(timestamp)"
                  @mouseenter="onCellHover(timestamp)"
                  @mouseleave="onCellLeave()"
                >
                  <div class="picker-panel-cell-inner">{{ getMonthNumber(timestamp) }}月</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="panelMode === 'quarter'" class="picker-panel-content picker-panel-quarter-content">
          <table>
            <tbody>
              <tr v-for="(row, rowIndex) in quarterRows" :key="rowIndex">
                <td
                  v-for="(timestamp, cellIndex) in row"
                  :key="cellIndex"
                  class="picker-panel-cell picker-panel-cell-in-view"
                  :class="[
                    {
                      'picker-panel-cell-selected': isSelectedQuarter(timestamp),
                      'picker-panel-cell-disabled': isQuarterDisabled(timestamp)
                    },
                    getCellRangeClasses(timestamp)
                  ]"
                  :title="formatTimestamp(timestamp, 'yyyy-QQQ')"
                  @click="onQuarterSelect(timestamp)"
                  @mouseenter="onCellHover(timestamp)"
                  @mouseleave="onCellLeave()"
                >
                  <div class="picker-panel-cell-inner">Q{{ getQuarterNumber(timestamp) }}</div>
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
                  :class="[
                    {
                      // 十年区间的首 / 末格：范围预览据此收边，避免虚线溢出到相邻十年
                      'picker-panel-cell-start': getYearNumber(timestamp) % 10 === 0,
                      'picker-panel-cell-end': getYearNumber(timestamp) % 10 === 9,
                      'picker-panel-cell-selected': isSelectedYear(timestamp),
                      'picker-panel-cell-disabled': isYearDisabled(timestamp)
                    },
                    // 十年代外的年格不参与区间底色：此格的 `-in-view` 恒真（承载选中态与文案色），
                    // 无法像日期格那样靠它在 CSS 层收边，故在类名层直接拦掉
                    isYearInView(timestamp) ? getCellRangeClasses(timestamp) : {}
                  ]"
                  :title="formatTimestamp(timestamp, 'yyyy')"
                  @click="onYearSelect(timestamp)"
                  @mouseenter="onCellHover(timestamp)"
                  @mouseleave="onCellLeave()"
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
      </div>
      <slot name="aside" />
    </div>
    <template #footer>
      <slot name="footer">
        <a
          class="picker-panel-today-btn"
          :class="{ 'picker-panel-today-btn-disabled': isTodayDisabled() }"
          :aria-disabled="isTodayDisabled()"
          @click="onTodaySelect"
        >
          今天
        </a>
      </slot>
    </template>
  </PickerPanel>
</template>
<style lang="less" scoped>
// 日期时间形态：日期列与时间列并排，两列各带自己的头部，头部导航因此只覆盖日期列而非整个面板
// 形态类由 `DatetimePanel` 透传到面板根上，须与之一致
.picker-datetime-panel {
  .picker-date-panel-body {
    display: flex;
  }
}
// 日期列固定 280px（日期 / 月 / 年三种视图共用）：面板宽度改由内容决定时（如带预设侧栏）不收缩
.picker-date-panel-main {
  flex: none;
  width: 280px;
}
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
.picker-panel-quarter-content {
  // 季面板只有 1 行（4 格）
  padding: 0 8px;
  table {
    height: 56px;
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
  // 已选端点与预览端点不吃普通悬浮底色
  &:hover:not(.picker-panel-cell-selected):not(.picker-panel-cell-range-start):not(.picker-panel-cell-range-end):not(
      .picker-panel-cell-range-hover-start
    ):not(.picker-panel-cell-range-hover-end)
    .picker-panel-cell-inner {
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
  // ===== 范围形态 =====
  // 以下范围规则一律限定在本月格（`-in-view`）内：跨月补齐日虽会命中范围类名，
  // 但不参与区间底色与预览虚线的渲染
  // 区间底色由 ::before 承载；端点格只铺内侧半边，与外层底色拼成连续色带
  &.picker-panel-cell-in-view.picker-panel-cell-in-range::before,
  &.picker-panel-cell-in-view.picker-panel-cell-range-start:not(.picker-panel-cell-range-start-single)::before,
  &.picker-panel-cell-in-view.picker-panel-cell-range-end:not(.picker-panel-cell-range-end-single)::before {
    background: var(--picker-primary-color-bg, #e6f4ff);
  }
  &.picker-panel-cell-in-view.picker-panel-cell-range-start::before {
    left: 50%;
  }
  &.picker-panel-cell-in-view.picker-panel-cell-range-end::before {
    right: 50%;
  }
  // 端点实心主色：与单选的选中态同款，但圆角只留在区间外侧
  &.picker-panel-cell-in-view.picker-panel-cell-range-start .picker-panel-cell-inner,
  &.picker-panel-cell-in-view.picker-panel-cell-range-end .picker-panel-cell-inner {
    color: #fff;
    background: var(--picker-primary-color, #1677ff);
  }
  &.picker-panel-cell-in-view.picker-panel-cell-range-start:not(.picker-panel-cell-range-start-single):not(
      .picker-panel-cell-range-end
    )
    .picker-panel-cell-inner {
    border-radius: 4px 0 0 4px;
  }
  &.picker-panel-cell-in-view.picker-panel-cell-range-end:not(.picker-panel-cell-range-end-single):not(
      .picker-panel-cell-range-start
    )
    .picker-panel-cell-inner {
    border-radius: 0 4px 4px 0;
  }
  // 悬浮预览：预览区间与已选区间重合处的底色加深（端点格同样只加深内侧半边）
  &.picker-panel-cell-in-view.picker-panel-cell-in-range.picker-panel-cell-range-hover::before,
  &.picker-panel-cell-in-view.picker-panel-cell-range-start.picker-panel-cell-range-hover::before,
  &.picker-panel-cell-in-view.picker-panel-cell-range-end.picker-panel-cell-range-hover::before,
  &.picker-panel-cell-in-view.picker-panel-cell-range-start:not(
      .picker-panel-cell-range-start-single
    ).picker-panel-cell-range-hover-start::before,
  &.picker-panel-cell-in-view.picker-panel-cell-range-end:not(
      .picker-panel-cell-range-end-single
    ).picker-panel-cell-range-hover-end::before {
    background: var(--picker-primary-color-bg-hover, #c8dfff);
  }
  // 悬浮预览：预览区间的上下虚线边界（端点与已选端点重合的组合不再单独绘制）
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-start:not(.picker-panel-cell-in-range):not(
      .picker-panel-cell-range-start
    ):not(.picker-panel-cell-range-end)::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-end:not(.picker-panel-cell-in-range):not(
      .picker-panel-cell-range-start
    ):not(.picker-panel-cell-range-end)::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-start.picker-panel-cell-range-start-single::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-start.picker-panel-cell-range-start.picker-panel-cell-range-end.picker-panel-cell-range-end-near-hover::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-end.picker-panel-cell-range-start.picker-panel-cell-range-end.picker-panel-cell-range-start-near-hover::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-end.picker-panel-cell-range-end-single::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover:not(.picker-panel-cell-in-range)::after {
    position: absolute;
    top: 50%;
    z-index: 0;
    height: 24px;
    content: '';
    border-top: 1px dashed var(--picker-hover-border-color, #7cb3ff);
    border-bottom: 1px dashed var(--picker-hover-border-color, #7cb3ff);
    transform: translateY(-50%);
    // 只过渡左右边界：`all` 会把后补上的 border-left / border-right 从 currentColor（近黑）与 medium（3px）补间，
    // 观感即「预览边界移动时先出现一条深色粗线、再变成浅蓝虚线」
    transition:
      left 0.3s,
      right 0.3s;
  }
  &.picker-panel-cell-range-hover::after,
  &.picker-panel-cell-range-hover-start::after,
  &.picker-panel-cell-range-hover-end::after {
    right: 0;
    left: 2px;
  }
  // 预览端点落在已选端点上时，该侧虚线收齐到中线
  &.picker-panel-cell-range-hover.picker-panel-cell-range-end::after {
    left: 50%;
  }
  &.picker-panel-cell-range-hover.picker-panel-cell-range-start::after {
    right: 50%;
  }
  // 预览区间左侧边界：只画「预览起点」与「跨面板时本月的月首格」两处竖线
  // 行首 / 行末格不画竖线，中间各行因此只有上下虚线、不闭合（按渲染结果对齐，不自补行边竖线）
  &.picker-panel-cell-in-view.picker-panel-cell-start.picker-panel-cell-range-hover-edge-start.picker-panel-cell-range-hover-edge-start-near-range::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-edge-start:not(
      .picker-panel-cell-range-hover-edge-start-near-range
    )::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-start::after {
    left: 6px;
    border-left: 1px dashed var(--picker-hover-border-color, #7cb3ff);
    border-radius: 4px 0 0 4px;
  }
  // 预览端点与已选端点重合（起点已选待选终点 / 终点已选待选起点）：该侧已由已选端点的实心块收口，
  // 虚线收到实心块以内（中线），避免虚线穿过实心块、在块外圆角处露出生硬的断点
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-start.picker-panel-cell-range-start::after {
    left: 50%;
    border-left: 0;
    border-radius: 0;
  }
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-end.picker-panel-cell-range-end::after {
    right: 50%;
    border-right: 0;
    border-radius: 0;
  }
  // 预览区间右侧边界：只画「预览终点」与「跨面板时本月的月末格」两处竖线（同上，行末格不画）
  &.picker-panel-cell-in-view.picker-panel-cell-end.picker-panel-cell-range-hover-edge-end.picker-panel-cell-range-hover-edge-end-near-range::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-edge-end:not(
      .picker-panel-cell-range-hover-edge-end-near-range
    )::after,
  &.picker-panel-cell-in-view.picker-panel-cell-range-hover-end::after {
    right: 6px;
    border-right: 1px dashed var(--picker-hover-border-color, #7cb3ff);
    border-radius: 0 6px 6px 0;
  }
  // 预览端点落在已选区间内部时，格内剩余半边由内层补一段加深底色（区间底色只铺内侧半边）
  &.picker-panel-cell-in-view.picker-panel-cell-in-range.picker-panel-cell-range-hover-start
    .picker-panel-cell-inner::after,
  &.picker-panel-cell-in-view.picker-panel-cell-in-range.picker-panel-cell-range-hover-end
    .picker-panel-cell-inner::after {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    content: '';
    background: var(--picker-primary-color-bg-hover, #c8dfff);
    transition: all 0.3s;
  }
  &.picker-panel-cell-in-view.picker-panel-cell-in-range.picker-panel-cell-range-hover-start
    .picker-panel-cell-inner::after {
    right: -6px;
    left: 0;
  }
  &.picker-panel-cell-in-view.picker-panel-cell-in-range.picker-panel-cell-range-hover-end
    .picker-panel-cell-inner::after {
    right: 0;
    left: -6px;
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
// 月 / 季 / 年面板的格比日期格宽（格内块宽 60px）：预览端点竖线随之对齐格内块的边缘内侧（+2px），
// 与日期面板「24px 块 + 6px 偏移」同一口径；圆角与上下虚线由上方通用规则给出，此处只管偏移
.picker-panel-month-content,
.picker-panel-quarter-content,
.picker-panel-year-content {
  .picker-panel-cell.picker-panel-cell-in-view.picker-panel-cell-range-hover-start::after {
    left: calc(50% - 28px);
  }
  .picker-panel-cell.picker-panel-cell-in-view.picker-panel-cell-range-hover-end::after {
    right: calc(50% - 28px);
  }
  // 与日期面板同口径：预览端点与已选端点重合时收到实心块以内
  .picker-panel-cell.picker-panel-cell-in-view.picker-panel-cell-range-hover-start.picker-panel-cell-range-start::after {
    left: 50%;
  }
  .picker-panel-cell.picker-panel-cell-in-view.picker-panel-cell-range-hover-end.picker-panel-cell-range-end::after {
    right: 50%;
  }
}
.picker-panel-month-content .picker-panel-cell .picker-panel-cell-inner,
.picker-panel-year-content .picker-panel-cell .picker-panel-cell-inner {
  // 固定宽度，使三个月格 / 年格等宽且居中（与日期格 24px 的自适应宽度区分）
  width: 60px;
  padding: 0 8px;
}
.picker-panel-quarter-content .picker-panel-cell .picker-panel-cell-inner {
  // 与月 / 年格同宽（border-box：60px 含左右内边距，落在 4 列约 66px 的列宽内）
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
