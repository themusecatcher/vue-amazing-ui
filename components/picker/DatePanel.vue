<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { VNode } from 'vue'
import PickerPanel from './PickerPanel.vue'
import PickerPanelHeader from './PickerPanelHeader.vue'
import {
  addMonthTimestamp,
  addYearTimestamp,
  CENTURY_YEAR_COUNT,
  formatTimestamp,
  getCenturyRange,
  getDayOfMonth,
  getDecadeLabel,
  getDecadePanelGrid,
  getMonthGrid,
  getMonthNumber,
  getMonthTimestamps,
  getQuarterNumber,
  getQuarterTimestamps,
  getRangeCellClassNames,
  getWeekLabels,
  getWeekNumber,
  getWeekStartTimestamp,
  getYearNumber,
  getYearPanelGrid,
  getYearTimestamps,
  isDecadeFullyDisabled,
  isDecadeInCentury,
  isLastDayOfMonthTimestamp,
  isMonthFullyDisabled,
  isQuarterFullyDisabled,
  isSameDayTimestamp,
  isSameDecadeTimestamp,
  isSameMonthTimestamp,
  isSameQuarterTimestamp,
  isSameWeekTimestamp,
  isWeekFullyDisabled,
  isYearFullyDisabled,
  startOfDayTimestamp,
  YEAR_COUNT
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
/** 十年面板格的列数（与年面板同构：3 列 × 4 行） */
const DECADE_COL_COUNT = 3
/** 按列数切分为矩阵，供表格逐行渲染 */
function chunk<T>(list: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(list.length / size) }, (_, index) =>
    list.slice(index * size, index * size + size)
  )
}
const panelMode = ref<PickerPanelMode>(props.baseMode)
// 进入当前视图前的视图：选完该层的值后回到来源视图（日期 / 周 / 月 / 季 / 年面板各自回原面板；
// 十年面板的进出不记录来源，见 switchPanel）
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
/** 周形态恒按 ISO 周（周一起始）排布：周序号与 `RRRR-II周` 展示格式同源，不随 `startDayOfWeek` 变化 */
const ISO_START_DAY_OF_WEEK: StartDayOfWeek = 0
const weekLabels = computed(() => getWeekLabels(props.startDayOfWeek))
const weekPanelLabels = computed(() => getWeekLabels(ISO_START_DAY_OF_WEEK))
const dateRows = computed(() => chunk(getMonthGrid(viewDate.value, props.startDayOfWeek), 7))
const monthRows = computed(() => chunk(getMonthTimestamps(viewDate.value), MONTH_COL_COUNT))
const quarterRows = computed(() => chunk(getQuarterTimestamps(viewDate.value), QUARTER_COL_COUNT))
const yearRows = computed(() => chunk(getYearPanelGrid(viewDate.value), YEAR_COL_COUNT))
const decadeRows = computed(() => chunk(getDecadePanelGrid(viewDate.value), DECADE_COL_COUNT))
const viewYear = computed(() => getYearNumber(viewDate.value))
const viewMonth = computed(() => getMonthNumber(viewDate.value))
const decadeYears = computed(() => {
  const years = getYearTimestamps(viewDate.value)
  return `${getYearNumber(years[0])}-${getYearNumber(years[years.length - 1])}`
})
/** 十年面板的头部：世纪区间（如 2000-2099） */
const centuryText = computed(() => {
  const [startYear, endYear] = getCenturyRange(viewDate.value)
  return `${startYear}-${endYear}`
})
/**
 * 周面板的日期行：除 7 个日期格外，额外携带该行的周序号（由行首日所在周得出）
 *
 * 周形态恒按 ISO 周排布（周一起始）：周序号与 `RRRR-II周` 展示格式同源，故不随 `startDayOfWeek` 变化。
 */
const weekPanelRows = computed(() =>
  chunk(getMonthGrid(viewDate.value, ISO_START_DAY_OF_WEEK), 7).map((row) => ({
    weekStart: row[0],
    weekNumber: getWeekNumber(row[0]),
    days: row
  }))
)
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
/* ============================== 周形态 ============================== */
/** 比较两个时间戳所在 ISO 周的前后（-1 在前 / 0 同周 / 1 在后） */
function compareWeek(a: number, b: number): number {
  const weekA = getWeekStartTimestamp(a)
  const weekB = getWeekStartTimestamp(b)
  if (weekA === weekB) {
    return 0
  }
  return weekA < weekB ? -1 : 1
}
/** 某周是否与目标时间戳落在同一周 */
function isSameWeekAs(weekStart: number, target: number | null): boolean {
  return target !== null && compareWeek(weekStart, target) === 0
}
/** 该周是否整周不可选：整周都禁用时才降级（与月 / 季 / 年格「整段判定」口径一致） */
function isWeekRowDisabled(weekStart: number): boolean {
  return props.disabledDate ? isWeekFullyDisabled(weekStart, props.disabledDate) : false
}
/**
 * 周面板行的类名
 *
 * 周面板以「行」为选择单位（日期面板则以「格」为单位）：单选形态高亮选中周，范围形态按周粒度叠加
 * 区间端点、区间内部与悬浮预览。行内日期格只表达「是否在本月 / 是否今天 / 是否禁用」，选中与区间
 * 一律由行承载（行底色取代格内块的底色）。
 *
 * 跨月的一周会同时出现在左右两块面板里，端点因此只在「承载该端点日期的面板」上实心（`isInView`），
 * 另一块面板里的同周行归入区间内部底色——否则同一周会亮起两处实心端点，读不出区间端点落在哪。
 */
function getWeekRowClasses(weekStart: number): Record<string, boolean> {
  const rowDisabled = isWeekRowDisabled(weekStart)
  const rangeStart = props.rangeValue?.[0] ?? null
  const rangeEnd = props.rangeValue?.[1] ?? null
  if (!props.range) {
    return {
      'picker-panel-week-row-selected': isSameWeekAs(weekStart, props.value),
      'picker-panel-week-row-disabled': rowDisabled
    }
  }
  const isRangeStart = rangeStart !== null && isInView(rangeStart) && isSameWeekAs(weekStart, rangeStart)
  const isRangeEnd = rangeEnd !== null && isInView(rangeEnd) && isSameWeekAs(weekStart, rangeEnd)
  // 含两端（端点周在另一块面板里按区间内部处理），故「实心端点」需从区间中剔除
  const isInRange =
    rangeStart !== null &&
    rangeEnd !== null &&
    compareWeek(weekStart, rangeStart) >= 0 &&
    compareWeek(weekStart, rangeEnd) <= 0
  const hoverStart = props.hoverValue?.[0] ?? null
  const hoverEnd = props.hoverValue?.[1] ?? null
  const isHovered =
    hoverStart !== null &&
    hoverEnd !== null &&
    compareWeek(weekStart, hoverStart) >= 0 &&
    compareWeek(weekStart, hoverEnd) <= 0
  return {
    'picker-panel-week-row-disabled': rowDisabled,
    'picker-panel-week-row-range-start': isRangeStart,
    'picker-panel-week-row-range-end': isRangeEnd,
    'picker-panel-week-row-in-range': isInRange && !isRangeStart && !isRangeEnd,
    // 端点周与区间内的周不再叠悬浮底色：端点已有实心底色，区间内已有静态的加深底色。
    // 端点必须显式排除：区间只有一端时 `isInRange` 为假（它要求两端都存在），
    // 否则正在待选的那一端所在行会被叠上格级浅蓝、盖掉实心底色（渲染成「周序号实心 + 日期格浅蓝」）
    'picker-panel-week-row-range-hover': isHovered && !isInRange && !isRangeStart && !isRangeEnd
  }
}
/* ============================== 十年面板 ============================== */
/** 十年格是否落在当前世纪区间内：世纪之外的前后各一格据此灰显 */
function isDecadeInView(timestamp: number): boolean {
  return isDecadeInCentury(timestamp, viewDate.value)
}
/** 是否为当前选中的十年（十年面板格的比较粒度为十年） */
function isSelectedDecade(timestamp: number): boolean {
  return props.value !== null && isSameDecadeTimestamp(timestamp, props.value)
}
/** 十年格代表整个十年：10 年都不可选时才禁用 */
function isDecadeDisabled(timestamp: number): boolean {
  return props.disabledDate ? isDecadeFullyDisabled(timestamp, props.disabledDate) : false
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
  changePanel(sourceMode.value, timestamp)
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
/**
 * 选择十年
 *
 * 十年不是可选值粒度：点格只把视图平移到该十年（按年份差平移以保留月日）并回到年面板，
 * 不提交值。回层同样走 {@link switchPanel}，以保留最初钻取进来的层级记录。
 */
function onDecadeSelect(timestamp: number) {
  if (isDecadeDisabled(timestamp)) {
    return
  }
  const next = addYearTimestamp(viewDate.value, getYearNumber(timestamp) - viewYear.value)
  setViewDate(next)
  switchPanel('year', next)
}
/** 「今天」快捷：与日期格选中同径（当日零点），由宿主提交并收起面板 */
function onTodaySelect() {
  if (isTodayDisabled()) {
    return
  }
  emits('select', startOfDayTimestamp(Date.now()))
}
function switchPanel(mode: PickerPanelMode, timestamp: number = viewDate.value) {
  panelMode.value = mode
  emits('panelChange', timestamp, mode)
}
/**
 * 切换面板层级并记录来源层级
 *
 * 记录的来源层级供「选完该层的值后回到哪一层」使用；十年面板的进出走 {@link switchPanel}
 * 不记录，因此从年面板下钻十年再回来，仍能回到最初钻取进年面板的那一层。
 */
function changePanel(mode: PickerPanelMode, timestamp: number = viewDate.value) {
  sourceMode.value = panelMode.value
  switchPanel(mode, timestamp)
}
/** super 导航（跨单位翻页）的年数步长：十年面板跨世纪、年面板跨十年、其余跨一年 */
function getSuperStepYears(): number {
  if (panelMode.value === 'decade') {
    return CENTURY_YEAR_COUNT
  }
  return panelMode.value === 'year' ? YEAR_COUNT : 1
}
// 翻页后的视图日期先落入局部变量再上报：受控模式下 viewDate 要等宿主回传才更新，不能读回自身
function onSuperPrev() {
  const next = addYearTimestamp(viewDate.value, -getSuperStepYears())
  setViewDate(next)
  emits('panelChange', next, panelMode.value)
}
function onSuperNext() {
  const next = addYearTimestamp(viewDate.value, getSuperStepYears())
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
          :show-single-nav="panelMode === 'date' || panelMode === 'week'"
          :show-prev="showPrevNav"
          :show-next="showNextNav"
          @super-prev="onSuperPrev"
          @super-next="onSuperNext"
          @prev="onPrev"
          @next="onNext"
        >
          <template #view>
            <template v-if="panelMode === 'date' || panelMode === 'week'">
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
            <!-- 年面板的十年区间是进入十年面板的入口；十年面板自身是最高层级，头部只展示世纪区间 -->
            <button
              v-else-if="panelMode === 'year'"
              type="button"
              tabindex="-1"
              class="picker-panel-decade-btn"
              @click="switchPanel('decade')"
              >{{ decadeYears }}</button
            >
            <span v-else>{{ centuryText }}</span>
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
        <div v-else-if="panelMode === 'week'" class="picker-panel-content picker-panel-week-content">
          <table>
            <thead>
              <tr>
                <!-- 周序号列表头留空，与下方每行首格对齐 -->
                <th aria-label="周序号" />
                <th v-for="(label, index) in weekPanelLabels" :key="index">{{ label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, rowIndex) in weekPanelRows"
                :key="rowIndex"
                class="picker-panel-week-row"
                :class="getWeekRowClasses(row.weekStart)"
              >
                <td class="picker-panel-cell picker-panel-cell-week">{{ row.weekNumber }}</td>
                <td
                  v-for="(timestamp, cellIndex) in row.days"
                  :key="cellIndex"
                  class="picker-panel-cell picker-panel-cell-week-day"
                  :class="{
                    'picker-panel-cell-in-view': isInView(timestamp),
                    'picker-panel-cell-today': isToday(timestamp),
                    'picker-panel-cell-disabled': Boolean(disabledDate?.(timestamp))
                  }"
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
        <div v-else-if="panelMode === 'year'" class="picker-panel-content picker-panel-year-content">
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
        <div v-else class="picker-panel-content picker-panel-decade-content">
          <table>
            <tbody>
              <tr v-for="(row, rowIndex) in decadeRows" :key="rowIndex">
                <td
                  v-for="(timestamp, cellIndex) in row"
                  :key="cellIndex"
                  class="picker-panel-cell picker-panel-cell-in-view"
                  :class="{
                    'picker-panel-cell-selected': isSelectedDecade(timestamp),
                    'picker-panel-cell-disabled': isDecadeDisabled(timestamp)
                  }"
                  :title="getDecadeLabel(timestamp)"
                  @click="onDecadeSelect(timestamp)"
                >
                  <div
                    class="picker-panel-cell-inner picker-panel-cell-inner-year"
                    :class="{ 'picker-panel-cell-out-view': !isDecadeInView(timestamp) }"
                  >
                    {{ getDecadeLabel(timestamp) }}
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
// 日期列固定 280px（日期 / 周 / 月 / 季 / 年 / 十年各视图共用）：面板宽度改由内容决定时（如带预设侧栏）不收缩
.picker-date-panel-main {
  flex: none;
  width: 280px;
}
.picker-panel-content {
  width: 100%;
  // 面板就地渲染（`to` 默认 false，见 DatePicker），会落在宿主文档的内容区内：宿主若按 markdown
  // 表格排版（如 VitePress 的 `.vp-doc table / th / td / tr`），会用元素选择器给表格补
  // `display: block`、外边距、单元格边框与内边距、行底色 —— 这些属性组件原先未声明，会被宿主接管，
  // 表现为日期格被撑宽后溢出面板、格间出现边框与灰底。故把「会被宿主接管的表格属性」逐一显式声明
  table {
    display: table;
    width: 100%;
    margin: 0;
    // 表格布局属性须落在 table 上：写在包裹层不生效，会退回 auto + separate，
    // 默认 border-spacing（2px）会挤占格宽并露出格间缝隙
    table-layout: fixed;
    border-collapse: collapse;
    overflow: visible;
  }
  // 行底色与行边框：宿主常用伪类承载斑马纹（如 `.vp-doc tr:nth-child(2n)`），伪类计入类列，
  // 与本组同特异性、只能靠加载顺序取胜，故加一层 `:nth-child(n)`（匹配全部行）稳定压过
  tr:nth-child(n) {
    border: none;
    background-color: transparent;
  }
  // 单元格只重置「宿主会补、组件不再覆盖」的属性：内边距不在此列 —— 格内边距一律由
  // `.picker-panel-cell` 给出（其特异性本就压得过宿主的 `.vp-doc td`，在此归零反而会把格压扁）
  th,
  td {
    position: relative;
    min-width: 24px;
    font-size: inherit;
    font-weight: normal;
    background-color: transparent;
    border: none;
  }
  th {
    // 表头只作列名、自身无内边距需求，而宿主会给 th 补 16px 左右内边距（足以把 7 列撑破面板）
    padding: 0;
    height: 32px;
    // 面板整体居中排布，宿主会把 th 改回左对齐
    text-align: center;
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
.picker-panel-week-content {
  padding: 8px 12px;
  table {
    // 8 列（周序号 + 7 天）：总宽与日期面板一致，列宽相应收窄
    width: 252px;
    // 行底色要能收圆角：折叠边框模型下 td 的 border-radius 不生效，故改用分离模型并把间距归零
    border-collapse: separate;
    border-spacing: 0;
  }
  // 周面板以「行」为选择单位：格内块不吃底色，底色与端点圆角一律由行承载
  .picker-panel-cell {
    &::before {
      content: none;
    }
  }
  .picker-panel-cell-week {
    // 周序号只作参照，不响应点击
    cursor: default;
  }
  .picker-panel-week-row {
    td {
      transition: background 0.2s;
      // 行首 / 行尾格恒带圆角：底色由「整行」承载，圆角是这一行作为独立视觉单位的收边，
      // 悬浮高亮因此与选中周同口径
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
    }
    // 区间色带要连续：端点周朝向区间内侧的一侧、区间内部周与悬浮预览周一律去圆角，
    // 相邻多周才拼成一条不断开的色带；恰好只占一周的区间（两个端点类名同落一行）两端都要留圆角
    &.picker-panel-week-row-range-start:not(.picker-panel-week-row-range-end) td:last-child,
    &.picker-panel-week-row-range-end:not(.picker-panel-week-row-range-start) td:first-child,
    &.picker-panel-week-row-in-range td,
    &.picker-panel-week-row-range-hover td {
      border-radius: 0;
    }
    // 整周不可选的行不响应悬浮，避免给「点不动」的行亮起可点反馈；
    // 已带状态底色的行（选中周 / 区间端点 / 区间内部 / 悬浮预览）同样不吃普通悬浮底色：
    // 本规则的 :not() 链令其权重高于下方状态规则，不排除会把实心主色行染灰、把行级色带打断
    &:not(.picker-panel-week-row-disabled):not(.picker-panel-week-row-selected):not(
        .picker-panel-week-row-range-start
      ):not(.picker-panel-week-row-range-end):not(.picker-panel-week-row-in-range):not(
        .picker-panel-week-row-range-hover
      ):hover
      td {
      background: rgba(0, 0, 0, 0.04);
    }
    &.picker-panel-week-row-selected td,
    &.picker-panel-week-row-range-start td,
    &.picker-panel-week-row-range-end td {
      background: var(--picker-primary-color, #1677ff);
    }
    &.picker-panel-week-row-selected .picker-panel-cell-inner,
    &.picker-panel-week-row-range-start .picker-panel-cell-inner,
    &.picker-panel-week-row-range-end .picker-panel-cell-inner {
      color: #fff;
    }
    // 周序号与日期格同取纯白（周序号直接落在 td 上，不继承格内块的白色）
    &.picker-panel-week-row-selected .picker-panel-cell-week,
    &.picker-panel-week-row-range-start .picker-panel-cell-week,
    &.picker-panel-week-row-range-end .picker-panel-cell-week {
      color: #fff;
    }
    // 选中周里的「今天」圈线改为白色，否则白底蓝框叠在主色行上读不出边界
    &.picker-panel-week-row-selected .picker-panel-cell-today .picker-panel-cell-inner::before,
    &.picker-panel-week-row-range-start .picker-panel-cell-today .picker-panel-cell-inner::before,
    &.picker-panel-week-row-range-end .picker-panel-cell-today .picker-panel-cell-inner::before {
      border-color: #fff;
    }
    // 范围形态：区间内部底色只落在「展示月内的日期格」上（跨月补齐日与周序号格不着色）。
    // 一行（一周）跨月时会在左右两块面板各出现一次，整行着色会让同一周出现两处色带，
    // 且跨月补齐日被连带染色——与日期范围的格口径不一致（底色的作用域见 .picker-panel-week-content）
    &.picker-panel-week-row-in-range .picker-panel-cell-in-view {
      background: var(--picker-primary-color-bg, #e6f4ff);
    }
    // 悬浮预览（待选区间）与区间内部同色：整段连成一条「待选色带」，读作"改选后会变成这样"；
    // 若整段都用更深一档的底色，悬浮时会出现一大块深蓝，看起来像"多选了一段"
    &.picker-panel-week-row-range-hover .picker-panel-cell-in-view {
      background: var(--picker-primary-color-bg, #e6f4ff);
    }
    // 鼠标所在的那一周 = 待选端点（新落点）：取普通悬浮的灰底，与未进入待选段时的悬浮观感一致；
    // 行级灰底的权重高于上面的格级浅蓝，故整行覆盖（含周序号格与跨月补齐日）
    &.picker-panel-week-row-range-hover:hover td {
      background: rgba(0, 0, 0, 0.04);
    }
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
.picker-panel-decade-content {
  // 十年面板左右不缩进：格宽取满 280px 三等分
  padding: 0;
  table {
    height: 264px;
  }
  // 十年文本（2010-2019）比年月文本宽：内边距收窄且不设固定宽，随文本自适应，不参与范围形态故不画底色层
  .picker-panel-cell-inner {
    padding: 0 4px;
  }
  .picker-panel-cell::before {
    content: none;
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
  // 已选端点与预览端点不吃普通悬浮底色；周面板的格由行承载底色，格内块同样不吃（见 .picker-panel-week-content）
  // 跨月补齐日不参与区间渲染（见上方范围规则说明），其区间端点类名不构成排除依据：只要悬浮即吃同一底色
  &:hover:not(.picker-panel-cell-in-view):not(.picker-panel-cell-week-day) .picker-panel-cell-inner,
  &:hover:not(.picker-panel-cell-selected):not(.picker-panel-cell-range-start):not(.picker-panel-cell-range-end):not(
      .picker-panel-cell-range-hover-start
    ):not(.picker-panel-cell-range-hover-end):not(.picker-panel-cell-week-day)
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
  // 就地渲染时会被宿主文档的链接样式接管（如 `.vp-doc a` 的下划线与 500 字重），此处还原为面板自身口径
  color: var(--picker-primary-color, #1677ff);
  font-weight: normal;
  text-decoration: none;
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
