<script setup lang="ts">
import { computed } from 'vue'
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
import type { PickerDisabledTimeUnits, PickerTimePanelProps, PickerTimeUnit } from './types'
export interface TimePanelProps {
  value?: number | null // 当前草稿值（空值时不选中任何项，列停在顶部）
  format?: string // 展示格式：决定列显隐与 12 小时制
  headerFormat?: string // 头部的文本格式，使用方显式传入 format 时原样展示（含日期部分的占位符）
  timeProps?: PickerTimePanelProps // 时间面板选项（步长 / 12 小时制 / 隐藏禁用项）
  disabledUnits?: PickerDisabledTimeUnits // 按单位声明的禁用时间
  active?: boolean // 面板是否展开（展开时把选中项滚到列顶部）
}
const props = withDefaults(defineProps<TimePanelProps>(), {
  value: null,
  format: undefined,
  headerFormat: undefined,
  timeProps: undefined,
  disabledUnits: undefined,
  active: false
})
const emits = defineEmits<{
  change: [timestamp: number]
}>()
/** 空草稿时以当前时刻为基准合成时分秒（与参考实现的 `value || getNow()` 同口径） */
const baseTimestamp = computed(() => props.value ?? Date.now())
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
const periodValue = computed(() => (hour24.value === null ? null : isPM.value ? 1 : 0))
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
/** 上下午列：该半天内所有小时均禁用时才禁用（与参考实现同口径） */
const periodUnits = computed<PickerTimeUnit[]>(() => {
  const units = generateTimeUnits('hour', props.timeProps?.hourStep, props.disabledUnits?.disabledHours?.())
  const isHalfDisabled = (isPMHalf: boolean) =>
    units.every((unit) => (isPMHalf ? unit.value < HALF_DAY_HOURS : unit.value >= HALF_DAY_HOURS) || unit.disabled)
  return [
    { label: 'AM', value: 0, disabled: isHalfDisabled(false) },
    { label: 'PM', value: 1, disabled: isHalfDisabled(true) }
  ]
})
/** 头部文本格式：显式传入时原样使用（与参考实现把 `showTime.format` 交给时间面板同口径），否则按列显隐推导 */
const headerTextFormat = computed(() => props.headerFormat || getTimeTextFormat(layout.value))
const headerText = computed(() => {
  if (props.value === null) return ''
  const textFormat = headerTextFormat.value
  return textFormat ? formatTimestamp(props.value, textFormat) : ''
})
/** 合成新的时间戳：未选中的分钟 / 秒按 0 计（与参考实现的空值兜底一致） */
function emitTime(hour: number, minuteValue: number | null, secondValue: number | null): void {
  emits(
    'change',
    setTimeTimestamp(baseTimestamp.value, hour, Math.max(0, minuteValue ?? 0), Math.max(0, secondValue ?? 0))
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
</script>
<template>
  <div class="picker-time-panel">
    <div class="picker-time-panel-header">
      <div class="picker-time-panel-view">{{ headerText }}</div>
    </div>
    <div class="picker-time-panel-content">
      <TimeUnitColumn
        v-if="layout.showHour"
        :units="hourUnits"
        :value="hourColumnValue"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
        @select="onHourSelect"
      />
      <TimeUnitColumn
        v-if="layout.showMinute"
        :units="minuteUnits"
        :value="minute"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
        @select="onMinuteSelect"
      />
      <TimeUnitColumn
        v-if="layout.showSecond"
        :units="secondUnits"
        :value="second"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
        @select="onSecondSelect"
      />
      <TimeUnitColumn
        v-if="layout.use12Hours"
        :units="periodUnits"
        :value="periodValue"
        :hide-disabled-options="timeProps?.hideDisabledOptions"
        :active="active"
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
  // 头部只展示已选时间的文本、不带导航按钮，故不复用面板头部的导航结构
  .picker-time-panel-header {
    display: flex;
    padding: 0 8px;
    color: rgba(0, 0, 0, 0.88);
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    .picker-time-panel-view {
      flex: auto;
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
