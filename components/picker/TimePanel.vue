<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import TimeUnitColumn from './TimeUnitColumn.vue'
import {
  formatTimestamp,
  generateTimeUnits,
  getHourColumnLabel,
  getHourNumber,
  getMinuteNumber,
  getSecondNumber,
  getTimeTextFormat,
  HALF_DAY_HOURS,
  resolveTimePanelLayout,
  setTimeTimestamp,
  toHour24,
  toHourColumnValue
} from './date-utils'
import { handlePanelKeydown } from './keyboard'
import type { PickerKeyStep } from './keyboard'
import type { PickerDisabledTimeUnits, PickerTimePanelProps, PickerTimeUnit } from './types'
export interface TimePanelProps {
  value?: number | null // 当前草稿值（空值时不选中任何项，列停在顶部）
  baseTimestamp?: number // 合成新值的日期基准：范围形态取另一端，不传时退回 value
  format?: string // 展示格式：决定列显隐与 12 小时制
  headerFormat?: string // 头部的文本格式，使用方显式传入 format 时原样展示（含日期部分的占位符）
  timeProps?: PickerTimePanelProps // 时间面板选项（步长 / 12 小时制 / 隐藏禁用项）
  disabledUnits?: PickerDisabledTimeUnits // 按单位声明的禁用时间
  active?: boolean // 面板是否展开（展开时把选中项滚到列顶部）
  panelActive?: boolean // 是否为日期时间面板的当前活动列：活动列在键盘操作期间保持原透明度
  hideHeader?: boolean // 是否隐藏头部：独立时间选择器形态没有头部的时间文本行
}
const props = withDefaults(defineProps<TimePanelProps>(), {
  value: null,
  baseTimestamp: undefined,
  format: undefined,
  headerFormat: undefined,
  timeProps: undefined,
  disabledUnits: undefined,
  active: false,
  panelActive: false,
  hideHeader: false
})
const emits = defineEmits<{
  change: [timestamp: number]
}>()
/** 当前活动的时间列下标：-1 表示尚未指定（由首次左右键或上下键确定） */
const activeColumnIndex = ref(-1)
/**
 * 合成新时间戳的基准：提供新值的日期部分，未传时退回展示值
 *
 * 展示值只认草稿值（空草稿即 `null`），拿它当基准会在空草稿时退回当前时刻，
 * 使点时间的落值日期从「另一端那一日」漂到今天，故单列一个基准输入。
 */
const synthesisBase = computed(() => props.baseTimestamp ?? props.value ?? Date.now())
const layout = computed(() => resolveTimePanelLayout(props.format, props.timeProps?.use12Hours))
const hour24 = computed(() => (props.value === null ? null : getHourNumber(props.value)))
const minute = computed(() => (props.value === null ? null : getMinuteNumber(props.value)))
const second = computed(() => (props.value === null ? null : getSecondNumber(props.value)))
const isPM = computed(() => hour24.value !== null && hour24.value >= HALF_DAY_HOURS)
/** 小时列取值：12 小时制下为 0-11，24 小时制下为 0-23 */
const hourColumnValue = computed(() => {
  if (hour24.value === null) return null
  return layout.value.use12Hours ? toHourColumnValue(hour24.value) : hour24.value
})
/**
 * 上下午列取值：空值时按上午选中
 *
 * 小时列的候选按 {@link isPM} 取半（空值即上午半天），上下午列若在空值时无选中，两列会自相矛盾 ——
 * 小时列列的是上午刻度、上下午列却什么都没选。故空值同样落在上午，点选后由 `onPeriodSelect` 补齐落值。
 */
const periodValue = computed(() => (isPM.value ? 1 : 0))
/** 小时列：12 小时制按上下午过滤后重映射取值与文本（0 点展示为 12） */
const hourUnits = computed<PickerTimeUnit[]>(() => {
  const units = generateTimeUnits('hour', props.timeProps?.hourStep, props.disabledUnits?.disabledHours?.())
  if (!layout.value.use12Hours) {
    return units
  }
  const isPMHalf = isPM.value
  return units
    .filter((unit) => (isPMHalf ? unit.value >= HALF_DAY_HOURS : unit.value < HALF_DAY_HOURS))
    .map((unit) => ({
      ...unit,
      label: getHourColumnLabel(unit.value % HALF_DAY_HOURS),
      value: unit.value % HALF_DAY_HOURS
    }))
})
const minuteUnits = computed(() =>
  generateTimeUnits('minute', props.timeProps?.minuteStep, props.disabledUnits?.disabledMinutes?.(hour24.value ?? -1))
)
const secondUnits = computed(() =>
  generateTimeUnits(
    'second',
    props.timeProps?.secondStep,
    props.disabledUnits?.disabledSeconds?.(hour24.value ?? -1, minute.value ?? -1)
  )
)
/** 上下午列：该半天内所有小时均禁用时才禁用 */
const periodUnits = computed<PickerTimeUnit[]>(() => {
  const units = generateTimeUnits('hour', props.timeProps?.hourStep, props.disabledUnits?.disabledHours?.())
  const isHalfDisabled = (isPMHalf: boolean) =>
    units.every((unit) => (isPMHalf ? unit.value < HALF_DAY_HOURS : unit.value >= HALF_DAY_HOURS) || unit.disabled)
  return [
    { label: 'AM', value: 0, disabled: isHalfDisabled(false) },
    { label: 'PM', value: 1, disabled: isHalfDisabled(true) }
  ]
})
/**
 * 头部文本格式：使用方**显式传入** format 时原样使用（含日期部分则一并展示），否则按列显隐推导纯时刻
 *
 * 形态的默认展示格式不参与头部 —— 头部展示的是「时间」这一列的取值，而非整个值的展示格式。
 */
const headerTextFormat = computed(() => props.headerFormat || getTimeTextFormat(layout.value))
const headerText = computed(() => {
  if (props.value === null) return ''
  const textFormat = headerTextFormat.value
  return textFormat ? formatTimestamp(props.value, textFormat) : ''
})
/** 合成新的时间戳：未选中的分钟 / 秒按 0 计 */
function emitTime(hour: number, minuteValue: number | null, secondValue: number | null): void {
  emits(
    'change',
    setTimeTimestamp(synthesisBase.value, hour, Math.max(0, minuteValue ?? 0), Math.max(0, secondValue ?? 0))
  )
}
function onHourSelect(columnHour: number): void {
  // 12 小时制下同一列值对应上 / 下午两个 24 小时制小时，须按当前上下午还原
  const mergedHour = layout.value.use12Hours ? toHour24(columnHour, isPM.value) : columnHour
  emitTime(mergedHour, minute.value, second.value)
}
function onMinuteSelect(value: number): void {
  emitTime(hour24.value ?? 0, value, second.value)
}
function onSecondSelect(value: number): void {
  emitTime(hour24.value ?? 0, minute.value, value)
}
function onPeriodSelect(value: number): void {
  emitTime(toHour24(hourColumnValue.value ?? 0, value === 1), minute.value, second.value)
}
/* ============================== 键盘导航 ============================== */
/**
 * 时间列清单：顺序即左右键的遍历顺序（与渲染顺序一致）
 *
 * 列清单按 props 推导而非从 DOM 取：禁用项过滤与 12 小时制重映射都发生在候选项生成阶段，
 * DOM 里读不到这份语义。隐藏的列不参与构表，其候选项也就不会被求值。
 */
const columns = computed(() => {
  const list: Array<{
    name: string
    units: PickerTimeUnit[]
    value: number | null
    select: (value: number) => void
  }> = []
  if (layout.value.showHour) {
    list.push({ name: 'hour', units: hourUnits.value, value: hourColumnValue.value, select: onHourSelect })
  }
  if (layout.value.showMinute) {
    list.push({ name: 'minute', units: minuteUnits.value, value: minute.value, select: onMinuteSelect })
  }
  if (layout.value.showSecond) {
    list.push({ name: 'second', units: secondUnits.value, value: second.value, select: onSecondSelect })
  }
  if (layout.value.use12Hours) {
    list.push({ name: 'period', units: periodUnits.value, value: periodValue.value, select: onPeriodSelect })
  }
  return list
})
/** 活动列名：供各列判定自身是否为键盘操作的目标（无活动列时为 null） */
const activeColumnName = computed(() => columns.value[activeColumnIndex.value]?.name ?? null)
/** 面板不再是活动列时清掉列下标：下次激活从「未指定」重新开始，不接着上一次的列 */
watch(
  () => props.panelActive,
  (active) => {
    if (!active) {
      activeColumnIndex.value = -1
    }
  }
)
/**
 * 在活动列内移动取值
 *
 * 从当前值出发按步长找第一个可选项（跳过禁用项）。该列尚无选中项时（下标为 -1）按步长取模——
 * 正向落到首项、反向落到倒数第二项。
 */
function moveActiveColumn(step: PickerKeyStep): void {
  const column = columns.value[activeColumnIndex.value]
  if (!column) {
    return
  }
  const { units } = column
  const currentIndex = units.findIndex((unit) => unit.value === column.value)
  for (let offset = 1; offset < units.length; offset += 1) {
    const next = units[(currentIndex + step * offset + units.length) % units.length]
    if (next && !next.disabled) {
      column.select(next.value)
      return
    }
  }
}
/**
 * 处理一次时间面板的导航按键
 *
 * 左右键在列之间循环移动；上下键改当前列的值，尚未指定列时首键只落到第一列（不在该键上取值）。
 * 回车不在此处理：它由触发器的文本提交消费，与「回车提交」的既有口径一致。
 */
function handleKeydown(event: KeyboardEvent): boolean {
  const count = columns.value.length
  if (count === 0) {
    return false
  }
  return handlePanelKeydown(event, {
    onLeftRight: (step) => {
      activeColumnIndex.value = (activeColumnIndex.value + step + count) % count
    },
    onUpDown: (step) => {
      if (activeColumnIndex.value === -1) {
        activeColumnIndex.value = 0
        return
      }
      moveActiveColumn(step)
    }
  })
}
defineExpose({ handleKeydown })
</script>
<template>
  <div class="picker-time-panel" :class="{ 'picker-time-panel-active': panelActive }">
    <div v-if="!hideHeader" class="picker-time-panel-header">
      <div class="picker-time-panel-view">{{ headerText }}</div>
    </div>
    <div class="picker-time-panel-content">
      <TimeUnitColumn
        v-if="layout.showHour"
        :units="hourUnits"
        :value="hourColumnValue"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
        :column-active="activeColumnName === 'hour'"
        @select="onHourSelect"
      />
      <TimeUnitColumn
        v-if="layout.showMinute"
        :units="minuteUnits"
        :value="minute"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
        :column-active="activeColumnName === 'minute'"
        @select="onMinuteSelect"
      />
      <TimeUnitColumn
        v-if="layout.showSecond"
        :units="secondUnits"
        :value="second"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
        :column-active="activeColumnName === 'second'"
        @select="onSecondSelect"
      />
      <TimeUnitColumn
        v-if="layout.use12Hours"
        :units="periodUnits"
        :value="periodValue"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
        :column-active="activeColumnName === 'period'"
        @select="onPeriodSelect"
      />
    </div>
  </div>
</template>
<style lang="less" scoped>
.picker-time-panel {
  display: flex;
  flex-direction: column;
  width: auto;
  min-width: auto;
  // 键盘操作期间在 0.3 / 1 之间切换透明度（见 `.picker-datetime-panel` 的淡化规则）
  transition: opacity 0.3s;
  // 头部只展示已选时间的文本、不带导航按钮，故不复用面板头部的导航结构
  .picker-time-panel-header {
    display: flex;
    padding: 0 8px;
    color: var(--va-text-color-1);
    border-bottom: 1px solid var(--va-border-split-color);
    .picker-time-panel-view {
      flex: auto;
      // 头部恒定占一行：草稿为空时头部文本为空串，内部没有行盒会让 `line-height` 失效、头部塌成 1px，
      // 时间列随即顶到面板顶边、与日期列表体错位。此处由 `min-height` 撑出这一行盒，
      // 头部因此恒为 41px（40 + 1px 下边框），与日期列头部对齐。
      min-height: 40px;
      font-weight: 600;
      line-height: 40px;
    }
  }
  .picker-time-panel-content {
    display: flex;
    flex: auto;
    height: 224px;
  }
}
</style>
