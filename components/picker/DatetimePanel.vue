<script setup lang="ts">
import { computed } from 'vue'
import Button from 'components/button'
import DatePanel from './DatePanel.vue'
import TimePanel from './TimePanel.vue'
import {
  getHourNumber,
  getLowerBoundTime,
  getMinuteNumber,
  getSecondNumber,
  mergeTimeStep,
  setTimeTimestamp
} from './date-utils'
import type { StartDayOfWeek } from './date-utils'
import type { PickerDisabledTime, PickerDisabledTimeUnits, PickerPanelMode, PickerTimePanelProps } from './types'
export interface DatetimePanelProps {
  value?: number | null // 草稿值：面板内的选择只更新草稿，「确定」才提交
  format?: string // 展示格式：推导时间列显隐与 12 小时制
  headerFormat?: string // 时间面板头部的文本格式，使用方显式传入 format 时原样透传
  timeProps?: PickerTimePanelProps // 时间面板选项（步长 / 12 小时制 / 隐藏禁用项）
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  disabledTime?: PickerDisabledTime // 不可选择的时间
  defaultTime?: number // 选中日期时的默认时分秒（只取其中的时分秒）
  defaultPickerValue?: number // 面板初始日期
  startDayOfWeek?: StartDayOfWeek // 一周起始日
  showNow?: boolean // 是否展示「此刻」快捷
  active?: boolean // 面板是否展开（时间列据此把选中项滚到列顶部）
}
const props = withDefaults(defineProps<DatetimePanelProps>(), {
  value: null,
  format: undefined,
  headerFormat: undefined,
  timeProps: undefined,
  disabledDate: undefined,
  disabledTime: undefined,
  defaultTime: undefined,
  defaultPickerValue: undefined,
  startDayOfWeek: 0,
  showNow: true,
  active: false
})
const emits = defineEmits<{
  change: [timestamp: number]
  confirm: [timestamp: number, source: 'ok' | 'now'] // 提交来源：确定按钮 / 此刻快捷
  panelChange: [value: number, mode: PickerPanelMode]
}>()
/** 禁用时间的判定基准：草稿值优先，空草稿时退回默认时分秒 / 当前时刻 */
const disabledBase = computed(() => props.value ?? props.defaultTime ?? Date.now())
const disabledUnits = computed<PickerDisabledTimeUnits>(() => props.disabledTime?.(disabledBase.value) ?? {})
const steps = computed(() => ({
  hour: mergeTimeStep('hour', props.timeProps?.hourStep),
  minute: mergeTimeStep('minute', props.timeProps?.minuteStep),
  second: mergeTimeStep('second', props.timeProps?.secondStep)
}))
/** 「确定」是否禁用：无草稿或草稿日已被禁用（与参考实现同口径） */
const okDisabled = computed(() => props.value === null || (props.disabledDate?.(props.value) ?? false))
/**
 * 选择日期：保留当前草稿的时分秒（与参考实现同口径）
 *
 * 空草稿时取默认时分秒，未声明则取当前时刻的时分秒——不退回 0 点，避免选日期时把时间重置。
 */
function onDateSelect(timestamp: number): void {
  const base = props.value ?? props.defaultTime ?? Date.now()
  emits('change', setTimeTimestamp(timestamp, getHourNumber(base), getMinuteNumber(base), getSecondNumber(base)))
}
function onTimeChange(timestamp: number): void {
  emits('change', timestamp)
}
function onPanelChange(timestamp: number, mode: PickerPanelMode): void {
  emits('panelChange', timestamp, mode)
}
/**
 * 「此刻」：取当前时刻并按步长向下取整后即提交
 *
 * 不判当日是否被 `disabledDate` 禁用（与参考实现同口径）：此刻是「跳到当前时刻」的快捷入口，
 * 与「今天」的禁用判定不同径——被禁用的日期仍可点此提交，是否接受交由使用方决定。
 */
function onNow(): void {
  const now = Date.now()
  const [hour, minute, second] = getLowerBoundTime(
    getHourNumber(now),
    getMinuteNumber(now),
    getSecondNumber(now),
    steps.value.hour,
    steps.value.minute,
    steps.value.second
  )
  emits('confirm', setTimeTimestamp(now, hour, minute, second), 'now')
}
function onOk(): void {
  if (props.value !== null) {
    emits('confirm', props.value, 'ok')
  }
}
</script>
<template>
  <DatePanel
    class="picker-datetime-panel"
    :value="value"
    :start-day-of-week="startDayOfWeek"
    :disabled-date="disabledDate"
    :default-picker-value="defaultPickerValue"
    :datetime="true"
    :show-today="false"
    @select="onDateSelect"
    @panel-change="onPanelChange"
  >
    <template #aside>
      <TimePanel
        :value="value"
        :format="format"
        :header-format="headerFormat"
        :time-props="timeProps"
        :disabled-units="disabledUnits"
        :active="active"
        @change="onTimeChange"
      />
    </template>
    <template #footer>
      <ul class="picker-panel-ranges">
        <li v-if="showNow" class="picker-panel-now">
          <a class="picker-panel-now-btn" @click="onNow">此刻</a>
        </li>
        <li class="picker-panel-ok">
          <Button size="small" type="primary" :disabled="okDisabled" @click="onOk">确定</Button>
        </li>
      </ul>
    </template>
  </DatePanel>
</template>
<style lang="less" scoped>
// 日期时间形态：日期与时间两列并排，面板宽度随内容自适应（日期 280 + 时间列 168 + 两列间分隔线 1）
.picker-panel.picker-datetime-panel {
  width: auto;
  // 日期列与时间列之间的分隔线由时间面板的左边框提供（与参考实现同构）
  .picker-time-panel {
    border-left: 1px solid rgba(5, 5, 5, 0.06);
  }
}
.picker-panel-ranges {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 4px 12px;
  line-height: 34px;
  text-align: start;
  list-style: none;
  > li {
    display: inline-block;
  }
  // 隐藏「此刻」时底部只剩「确定」，靠自身外边距顶到行尾（与参考实现的 -ok 声明同款）；
  // 高度取页脚行高（display: flex 后行高不再参与内在高度，不声明则页脚矮 10px），
  // 弹性居中补偿按钮根节点为 inline-block div 的基线偏移（参考实现用原生 button，按基线排布即居中）
  .picker-panel-ok {
    display: flex;
    align-items: center;
    height: 34px;
    margin-inline-start: auto;
  }
}
.picker-panel-now-btn {
  color: var(--picker-primary-color, #1677ff);
  cursor: pointer;
  &:hover {
    color: var(--picker-primary-color-hover, #4096ff);
  }
}
</style>
