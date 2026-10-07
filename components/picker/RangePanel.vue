<script setup lang="ts">
import { computed, ref } from 'vue'
import type { VNode } from 'vue'
import DatePanel from './DatePanel.vue'
import PickerPanel from './PickerPanel.vue'
import { addMonthTimestamp } from './date-utils'
import type { StartDayOfWeek } from './date-utils'
import type { PickerPanelMode, PickerRangeSide, PickerRangeValue } from './types'
export interface RangePanelProps {
  value?: PickerRangeValue | null // 当前区间（含只选中一段的中间态）
  activeSide?: PickerRangeSide // 当前激活的段：悬浮预览写入该端
  startDayOfWeek?: StartDayOfWeek // 一周起始日
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  defaultPickerValue?: number // 面板初始日期
  showFooter?: boolean // 是否展示跨两个面板的底部
}
export interface RangePanelSlots {
  footer?: () => VNode[] // 跨两个面板的底部内容
}
const props = withDefaults(defineProps<RangePanelProps>(), {
  value: null,
  activeSide: 'start',
  startDayOfWeek: 0,
  disabledDate: undefined,
  defaultPickerValue: undefined,
  showFooter: false
})
defineSlots<RangePanelSlots>()
const emits = defineEmits<{
  select: [timestamp: number, side: PickerRangeSide]
  panelChange: [value: number, mode: PickerPanelMode, side: PickerRangeSide]
  hoverChange: [timestamp: number | null] // 悬浮的日期，供触发器在该段显示预览文本
}>()
// 左右面板共用一份视图日期：右面板固定为左面板的下一月，任一侧翻页都带动另一侧
const viewDate = ref<number>(props.value?.[0] ?? props.defaultPickerValue ?? Date.now())
const endViewDate = computed(() => addMonthTimestamp(viewDate.value, 1))
const hoverValue = ref<PickerRangeValue | null>(null)
/** 悬浮预览区间：两段齐全且终点晚于起点时才生效（否则不产生任何悬浮类名） */
const hoverRangedValue = computed<PickerRangeValue | null>(() => {
  const hover = hoverValue.value
  if (!hover || hover[0] === null || hover[1] === null || hover[1] <= hover[0]) {
    return null
  }
  return hover
})
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
  viewDate.value = next
}
/** 右面板翻页：以其为准反推左面板，保持两面板始终相差一个月 */
function onEndViewChange(next: number) {
  viewDate.value = addMonthTimestamp(next, -1)
}
/**
 * 面板选中日期：写入**当前激活段**（与参考实现同口径，与面板左右位置无关）
 *
 * 两个面板共用同一份视图与区间，用户从左面板选完起点后激活段切到终点，
 * 此后在任一面板点选都作用于终点段。
 */
function onPanelSelect(timestamp: number) {
  hoverValue.value = null
  emits('hoverChange', null)
  emits('select', timestamp, props.activeSide)
}
/** 左右面板各带自己的头部导航，翻页时需带上来源段（面板切换事件按段上报） */
function onStartPanelChange(value: number, mode: PickerPanelMode) {
  emits('panelChange', value, mode, 'start')
}
function onEndPanelChange(value: number, mode: PickerPanelMode) {
  emits('panelChange', value, mode, 'end')
}
</script>
<template>
  <PickerPanel class="picker-range-panel-layout" :show-footer="showFooter">
    <div class="picker-range-panels">
      <DatePanel
        class="picker-range-panel"
        :panel-value="viewDate"
        :start-day-of-week="startDayOfWeek"
        :disabled-date="disabledDate"
        :default-picker-value="defaultPickerValue"
        :show-today="false"
        :range="true"
        :range-value="value"
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
        :range-value="value"
        :hover-value="hoverRangedValue"
        side="end"
        @select="onPanelSelect"
        @panel-change="onEndPanelChange"
        @panel-value-change="onEndViewChange"
        @cell-hover="onCellHover"
        @cell-leave="onCellLeave"
      />
    </div>
    <template #footer>
      <slot name="footer" />
    </template>
  </PickerPanel>
</template>
<style lang="less" scoped>
// 容器宽度随两个面板展开（内层日期面板各自 280px），不能沿用单选面板的固定 280px
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
