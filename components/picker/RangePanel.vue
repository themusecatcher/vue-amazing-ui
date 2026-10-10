<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { VNode } from 'vue'
import DatePanel from './DatePanel.vue'
import DatetimePanel from './DatetimePanel.vue'
import PickerPanel from './PickerPanel.vue'
import { addMonthTimestamp } from './date-utils'
import type { StartDayOfWeek } from './date-utils'
import type {
  PickerDisabledTime,
  PickerPanelMode,
  PickerRangeDisabledTime,
  PickerRangeSide,
  PickerRangeValue,
  PickerTimePanelProps
} from './types'
export interface RangePanelProps {
  value?: PickerRangeValue | null // 当前区间（含只选中一段的中间态）
  activeSide?: PickerRangeSide // 当前激活的段：悬浮预览与下一次选择都作用于该端
  startDayOfWeek?: StartDayOfWeek // 一周起始日
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  defaultPickerValue?: number // 面板初始日期
  showFooter?: boolean // 是否展示跨两个面板的底部
  datetime?: boolean // 日期时间范围：单个日期时间面板，两段靠「确定」切换编辑
  format?: string // 展示格式：推导时间列显隐与 12 小时制
  headerFormat?: string // 时间面板头部的文本格式
  timeProps?: PickerTimePanelProps // 时间面板选项（步长 / 12 小时制 / 隐藏禁用项）
  disabledTime?: PickerRangeDisabledTime // 不可选择的时间（按段判定）
  defaultTime?: number // 选中日期时的默认时分秒（只取其中的时分秒）
  previewValue?: PickerRangeValue | null // 外部预览区间（预设悬浮），与面板内悬浮同为预览来源
  active?: boolean // 面板是否展开：展开时把展示日期带回当前区间起点
}
export interface RangePanelSlots {
  presets?: () => VNode[] // 两个面板左侧的预设侧栏
  footer?: () => VNode[] // 跨两个面板的底部内容
}
const props = withDefaults(defineProps<RangePanelProps>(), {
  value: null,
  activeSide: 'start',
  startDayOfWeek: 0,
  disabledDate: undefined,
  defaultPickerValue: undefined,
  showFooter: false,
  datetime: false,
  format: undefined,
  headerFormat: undefined,
  timeProps: undefined,
  disabledTime: undefined,
  defaultTime: undefined,
  previewValue: null,
  active: false
})
defineSlots<RangePanelSlots>()
const emits = defineEmits<{
  select: [timestamp: number, side: PickerRangeSide] // 日期时间范围以外的形态：选中即提交该段
  draftChange: [timestamp: number, side: PickerRangeSide] // 日期时间范围：面板内的选择只更新草稿
  confirm: [timestamp: number, side: PickerRangeSide] // 日期时间范围：点「确定」提交当前激活段
  panelChange: [value: number, mode: PickerPanelMode, side: PickerRangeSide]
  hoverChange: [timestamp: number | null] // 悬浮的日期，供触发器在该段显示预览文本
}>()
/**
 * 左右面板共用一份视图日期：右面板固定为左面板的下一月，任一侧翻页都带动另一侧
 *
 * `manualViewDate` 只承载「用户翻页 / 选到补齐月」产生的手动视图；未手动翻页时视图直接由当前区间
 * 起点派生——
 * 预设填入 / 外部改值后，展开中的面板视图会立刻跟到新区间，而不是等下次展开才对齐。
 */
const manualViewDate = ref<number | null>(null)
const viewDate = computed(() => manualViewDate.value ?? props.value?.[0] ?? props.defaultPickerValue ?? Date.now())
const endViewDate = computed(() => addMonthTimestamp(viewDate.value, 1))
/**
 * 展开时清掉手动视图
 *
 * 浮层收起后两个面板并不销毁，若不在展开时重置，上一次翻页留下的月份会一直留在视图里，
 * 与触发器上显示的区间对不上。
 */
watch(
  () => props.active,
  (active) => {
    if (active) {
      manualViewDate.value = null
    }
  }
)
const hoverValue = ref<PickerRangeValue | null>(null)
/** 当前激活段的值：日期时间范围的面板以此为展示值（决定选中格与面板视图） */
const activeValue = computed<number | null>(() => props.value?.[props.activeSide === 'start' ? 0 : 1] ?? null)
/** 另一端的值：激活段为空时作为时间面板的展示基准 */
const otherSideValue = computed<number | null>(() => props.value?.[props.activeSide === 'start' ? 1 : 0] ?? null)
/** 激活段的禁用时间：把段标识注入判定函数（对外口径为 `(timestamp, side)`） */
const activeDisabledTime = computed<PickerDisabledTime | undefined>(() => {
  const disabledTime = props.disabledTime
  if (!disabledTime) {
    return undefined
  }
  return (timestamp) => disabledTime(timestamp, props.activeSide)
})
/**
 * 悬浮预览区间（格子悬浮产生）：两段齐全且终点晚于起点时才生效，否则不产生任何预览类名
 *
 * 只承载「格子悬浮」这一路；预设悬浮走 {@link rangedValue}。
 */
const hoverRangedValue = computed<PickerRangeValue | null>(() => {
  const source = hoverValue.value
  if (!source || source[0] === null || source[1] === null || source[1] <= source[0]) {
    return null
  }
  return source
})
/**
 * 面板的区间取值：预设悬浮预览优先于已选值
 *
 * 预设悬浮时面板按「已选区间」渲染，
 * 因而呈现与真实区间一致的底色与端点，而非格子悬浮的虚线框。
 */
const rangedValue = computed<PickerRangeValue | null>(() => props.previewValue ?? props.value ?? null)
/** 悬浮日期写入当前激活段，形成「以该日期为一端」的预览区间，并上报给触发器做同段文本预览 */
function onCellHover(timestamp: number) {
  const current = props.value ?? [null, null]
  hoverValue.value = props.activeSide === 'start' ? [timestamp, current[1]] : [current[0], timestamp]
  emits('hoverChange', timestamp)
}
function onCellLeave() {
  hoverValue.value = null
  emits('hoverChange', null)
}
function onStartViewChange(next: number) {
  manualViewDate.value = next
}
/** 右面板翻页：以其为准反推左面板，保持两面板始终相差一个月 */
function onEndViewChange(next: number) {
  manualViewDate.value = addMonthTimestamp(next, -1)
}
/**
 * 面板选中日期：写入**当前激活段**（与面板左右位置无关）
 *
 * 两个面板共用同一份视图与区间，用户从左面板选完起点后激活段切到终点，
 * 此后在任一面板点选都作用于终点段。
 */
function onPanelSelect(timestamp: number) {
  hoverValue.value = null
  emits('hoverChange', null)
  emits('select', timestamp, props.activeSide)
}
/** 日期时间范围：面板内的选择（日期或时间）只更新激活段的草稿，待「确定」统一提交 */
function onDatetimeChange(timestamp: number) {
  // 与日期形态同口径：落值即清掉悬浮预览（否则点击后鼠标仍停在格子上，输入框会继续显示悬浮日期）
  hoverValue.value = null
  emits('hoverChange', null)
  emits('draftChange', timestamp, props.activeSide)
}
function onDatetimeConfirm(timestamp: number) {
  emits('confirm', timestamp, props.activeSide)
}
/** 左右面板各带自己的头部导航，翻页时需带上来源段（面板切换事件按段上报） */
function onStartPanelChange(value: number, mode: PickerPanelMode) {
  emits('panelChange', value, mode, 'start')
}
function onEndPanelChange(value: number, mode: PickerPanelMode) {
  emits('panelChange', value, mode, 'end')
}
function onDatetimePanelChange(value: number, mode: PickerPanelMode) {
  emits('panelChange', value, mode, props.activeSide)
}
</script>
<template>
  <PickerPanel class="picker-range-panel-layout" :show-footer="showFooter">
    <template #presets>
      <slot name="presets" />
    </template>
    <div class="picker-range-panels">
      <!-- 日期时间范围：单个日期时间面板，激活段由宿主按下划线所在段切换 -->
      <DatetimePanel
        v-if="datetime"
        class="picker-range-panel picker-datetime-panel"
        :value="activeValue"
        :format="format"
        :header-format="headerFormat"
        :time-props="timeProps"
        :disabled-date="disabledDate"
        :disabled-time="activeDisabledTime"
        :default-time="defaultTime"
        :default-picker-value="defaultPickerValue"
        :start-day-of-week="startDayOfWeek"
        :range="true"
        :fallback-value="otherSideValue"
        :range-value="rangedValue"
        :hover-value="hoverRangedValue"
        :show-now="false"
        :active="true"
        @change="onDatetimeChange"
        @confirm="onDatetimeConfirm"
        @panel-change="onDatetimePanelChange"
        @cell-hover="onCellHover"
        @cell-leave="onCellLeave"
      />
      <template v-else>
        <DatePanel
          class="picker-range-panel"
          :panel-value="viewDate"
          :start-day-of-week="startDayOfWeek"
          :disabled-date="disabledDate"
          :default-picker-value="defaultPickerValue"
          :show-today="false"
          :range="true"
          :range-value="rangedValue"
          :hover-value="hoverRangedValue"
          side="start"
          @select="onPanelSelect"
          @panel-change="onStartPanelChange"
          @panel-value-change="onStartViewChange"
          @cell-hover="onCellHover"
          @cell-leave="onCellLeave"
        />
        <DatePanel
          class="picker-range-panel"
          :panel-value="endViewDate"
          :start-day-of-week="startDayOfWeek"
          :disabled-date="disabledDate"
          :default-picker-value="defaultPickerValue"
          :show-today="false"
          :range="true"
          :range-value="rangedValue"
          :hover-value="hoverRangedValue"
          side="end"
          @select="onPanelSelect"
          @panel-change="onEndPanelChange"
          @panel-value-change="onEndViewChange"
          @cell-hover="onCellHover"
          @cell-leave="onCellLeave"
        />
      </template>
    </div>
    <template #footer>
      <slot name="footer" />
    </template>
  </PickerPanel>
</template>
<style lang="less" scoped>
// 容器宽度随面板展开（内层日期面板各自 280px / 日期时间面板更宽），不能沿用单选面板的固定 280px
.picker-panel.picker-range-panel-layout {
  width: auto;
}
.picker-range-panels {
  display: flex;
}
// 面板外观（圆角 / 阴影 / 裁切）由外层容器统一提供，内层面板只保留头部与内容
.picker-range-panel.picker-panel {
  border-radius: 0;
  box-shadow: none;
  overflow: visible;
}
</style>
