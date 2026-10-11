<script setup lang="ts">
import { computed } from 'vue'
import type { VNode } from 'vue'
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
import type {
  PickerDateRender,
  PickerDisabledTime,
  PickerDisabledTimeUnits,
  PickerPanelMode,
  PickerRangeValue,
  PickerTimePanelProps
} from './types'
export interface DatetimePanelProps {
  value?: number | null // 草稿值：面板内的选择只更新草稿，「确定」才提交
  format?: string // 展示格式：推导时间列显隐与 12 小时制
  headerFormat?: string // 时间面板头部的文本格式，使用方显式传入 format 时原样透传
  timeProps?: PickerTimePanelProps // 时间面板选项（步长 / 12 小时制 / 隐藏禁用项）
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  disabledTime?: PickerDisabledTime // 不可选择的时间
  dateRender?: PickerDateRender // 日期单元格内容定制：透传给日期列
  defaultTime?: number // 选中日期时的默认时分秒（只取其中的时分秒）
  defaultPickerValue?: number // 面板初始日期
  extraFooter?: () => VNode[] // 面板底部的额外页脚：渲染在「此刻 / 确定」之上
  startDayOfWeek?: StartDayOfWeek // 一周起始日
  showNow?: boolean // 是否展示「此刻」快捷
  active?: boolean // 面板是否展开（时间列据此把选中项滚到列顶部）
  range?: boolean // 日期时间范围形态：日期格叠加区间高亮（`value` 为该形态下激活段的值）
  fallbackValue?: number | null // 激活段为空时的取值基准（范围形态传另一端，供时间面板展示）
  rangeValue?: PickerRangeValue | null // 范围形态的当前区间
  hoverValue?: PickerRangeValue | null // 范围形态的悬浮预览区间
}
export interface DatetimePanelSlots {
  presets?: () => VNode[] // 日期列左侧的预设侧栏
}
const props = withDefaults(defineProps<DatetimePanelProps>(), {
  value: null,
  format: undefined,
  headerFormat: undefined,
  timeProps: undefined,
  disabledDate: undefined,
  disabledTime: undefined,
  dateRender: undefined,
  defaultTime: undefined,
  defaultPickerValue: undefined,
  extraFooter: undefined,
  startDayOfWeek: 0,
  showNow: true,
  active: false,
  range: false,
  fallbackValue: null,
  rangeValue: null,
  hoverValue: null
})
defineSlots<DatetimePanelSlots>()
const emits = defineEmits<{
  change: [timestamp: number]
  confirm: [timestamp: number, source: 'ok' | 'now'] // 提交来源：确定按钮 / 此刻快捷
  panelChange: [value: number, mode: PickerPanelMode]
  cellHover: [timestamp: number] // 悬浮日期格：范围形态据此预览区间，单选形态据此预览文本
  cellLeave: [] // 移出日期格：清除预览
}>()
/**
 * 禁用时间的判定基准：与时间面板的展示值同源
 *
 * 顺序为「草稿值 → 另一端值 → 默认时分秒 → 当前时刻」：范围形态激活段为空时，判定落在另一端
 * 那一日，否则同一天内的时分秒约束会因基准日不同而整段失效。范围面板传入的 `value`
 * 即 `value ?? 另一端值`，`disabledTime` 因而以另一端时刻为入参。
 */
const disabledBase = computed(() => props.value ?? props.fallbackValue ?? props.defaultTime ?? Date.now())
/**
 * 时间面板的展示值：草稿值优先，激活段为空时退回 `fallbackValue`
 *
 * 起点段尚未选时，时间列以另一端（终点）的时刻为基准，时间区不再空着。
 * 仅影响时间面板的展示与滚动定位，不改变日期格的选中态。
 */
const timePanelValue = computed(() => props.value ?? props.fallbackValue ?? null)
const disabledUnits = computed<PickerDisabledTimeUnits>(() => props.disabledTime?.(disabledBase.value) ?? {})
const steps = computed(() => ({
  hour: mergeTimeStep('hour', props.timeProps?.hourStep),
  minute: mergeTimeStep('minute', props.timeProps?.minuteStep),
  second: mergeTimeStep('second', props.timeProps?.secondStep)
}))
/**
 * 「确定」是否禁用：无草稿或草稿日被禁用
 *
 * 草稿的时分秒即使落在 `disabledTime` 的禁用区间内也不据此禁用「确定」——
 * 禁用项只表达「时间列的不可选」。
 */
const okDisabled = computed(() => props.value === null || (props.disabledDate?.(props.value) ?? false))
/**
 * 选择日期：保留当前草稿的时分秒
 *
 * 空草稿时取默认时分秒，未声明则取当前时刻的时分秒——不退回 0 点，避免选日期时把时间重置。
 * 保留的时分秒若已被 `disabledTime` 禁用（典型：终点先选好时刻、再选回起点所在日）**不做校正**：
 * 禁用项只体现为「时间列的不可选」，已落定的越界值原样保留并可提交。
 */
function onDateSelect(timestamp: number): void {
  const base = props.value ?? props.defaultTime ?? Date.now()
  emits('change', setTimeTimestamp(timestamp, getHourNumber(base), getMinuteNumber(base), getSecondNumber(base)))
}
function onTimeChange(timestamp: number): void {
  emits('change', timestamp)
}
function onCellHover(timestamp: number): void {
  emits('cellHover', timestamp)
}
function onCellLeave(): void {
  emits('cellLeave')
}
function onPanelChange(timestamp: number, mode: PickerPanelMode): void {
  emits('panelChange', timestamp, mode)
}
/**
 * 「此刻」：取当前时刻并按步长向下取整后即提交
 *
 * 不判当日是否被 `disabledDate` 禁用：此刻是「跳到当前时刻」的快捷入口，
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
    :active="active"
    :start-day-of-week="startDayOfWeek"
    :disabled-date="disabledDate"
    :date-render="dateRender"
    :default-picker-value="defaultPickerValue"
    :extra-footer="extraFooter"
    :datetime="true"
    :show-today="false"
    :range="range"
    :range-value="rangeValue"
    :hover-value="hoverValue"
    @select="onDateSelect"
    @panel-change="onPanelChange"
    @cell-hover="onCellHover"
    @cell-leave="onCellLeave"
  >
    <template #presets>
      <slot name="presets" />
    </template>
    <template #aside>
      <TimePanel
        :value="timePanelValue"
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
  // 日期列与时间列之间的分隔线由时间面板的左边框提供
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
    // 面板就地渲染（`to` 默认 false）会落在宿主文档的内容区内，宿主会给相邻 li 补外边距（如
    // VitePress 的 `.vp-doc li + li`），使「确定」相对「此刻」下沉；此处归零，间距由本组件自行掌控
    margin: 0;
  }
  // 隐藏「此刻」时底部只剩「确定」，靠自身外边距顶到行尾；
  // 高度取页脚行高（display: flex 后行高不再参与内在高度，不声明则页脚矮 10px），
  // 弹性居中补偿按钮根节点为 inline-block div 的基线偏移（原生 button 按基线排布即居中）
  .picker-panel-ok {
    display: flex;
    align-items: center;
    height: 34px;
    margin-inline-start: auto;
  }
}
.picker-panel-now-btn {
  // 同 `.picker-panel-today-btn`：还原被宿主文档链接样式接管的字重与下划线
  color: var(--picker-primary-color, #1677ff);
  font-weight: normal;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: var(--picker-primary-color-hover, #4096ff);
  }
}
</style>
