<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import Scrollbar from 'components/scrollbar'
import type { PickerTimeUnit } from './types'
export interface TimeUnitColumnProps {
  units?: PickerTimeUnit[] // 该列的候选项
  value?: number | null // 当前选中项（空值时不选中任何项，列停在顶部）
  hideDisabledOptions?: boolean // 是否隐藏禁用项
  active?: boolean // 面板是否展开：展开时把选中项滚到列顶部
}
const props = withDefaults(defineProps<TimeUnitColumnProps>(), {
  units: () => [],
  value: null,
  hideDisabledOptions: false,
  active: false
})
const emits = defineEmits<{
  select: [value: number]
}>()
/** 选中项滚到列顶部的动画时长 */
const SCROLL_DURATION = 120
/** 面板展开后等待可见的最大帧数（浮层首帧可能仍在 display: none） */
const MAX_VISIBLE_FRAMES = 20
const columnRef = ref<HTMLElement | null>(null)
const cellRefs = new Map<number, HTMLElement>()
let frameId = 0
function setCellRef(value: number, element: Element | ComponentPublicInstance | null): void {
  if (element instanceof HTMLElement) {
    cellRefs.set(value, element)
    return
  }
  cellRefs.delete(value)
}
/**
 * 列的滚动容器：滚动量写入与滚动条轨道都由 Scrollbar 组件作用在它上面
 *
 * 取组件内部容器的方式与 `Select` 面板一致（Scrollbar 未对外暴露元素引用，只暴露 scrollTo 等命令）。
 */
function getScroller(): HTMLElement | null {
  return columnRef.value?.querySelector<HTMLElement>('.scrollbar-container') ?? null
}
/** 列是否可见：隐藏时（display: none）取不到客户端矩形，元素偏移也不可信 */
function isColumnVisible(): boolean {
  return (getScroller()?.getClientRects().length ?? 0) > 0
}
function scrollToOffset(to: number, duration: number): void {
  const scroller = getScroller()
  if (!scroller) return
  cancelAnimationFrame(frameId)
  if (duration <= 0) {
    scroller.scrollTop = to
    return
  }
  // 每帧移动「剩余距离 ÷ 剩余时长 × 10」并递减剩余时长，收尾自动吸附到目标
  const step = (remaining: number) => {
    const difference = to - scroller.scrollTop
    if (Math.abs(difference) < 1 || remaining <= 0) {
      scroller.scrollTop = to
      return
    }
    scroller.scrollTop += (difference / remaining) * 10
    frameId = requestAnimationFrame(() => step(remaining - 10))
  }
  frameId = requestAnimationFrame(() => step(duration))
}
/**
 * 把选中项滚到列顶部（无选中项或列不可见时保持原位）
 *
 * 偏移量取选中项的 `offsetTop`：样式里已让滚动容器成为列的定位祖先（`position: relative`），
 * 该值即「距滚动容器的偏移」。不可改用矩形差——浮层入场 / 收起期间面板带 `scaleY` 变换，
 * 矩形差会被同比缩放，量出的滚动量偏小（实测入场中 448 被量成 358）。
 */
function scrollToSelected(duration: number): void {
  if (!isColumnVisible()) return
  // 空值不选中任何项：把列带回顶部（清掉上一次选择留下的滚动位置，否则初始态会停在旧时刻）
  if (props.value === null) {
    scrollToOffset(0, duration)
    return
  }
  const target = cellRefs.get(props.value)
  if (!target) return
  scrollToOffset(target.offsetTop, duration)
}
function scrollToSelectedWhenVisible(attempt: number = 0): void {
  if (isColumnVisible() || attempt >= MAX_VISIBLE_FRAMES) {
    scrollToSelected(0)
    return
  }
  frameId = requestAnimationFrame(() => scrollToSelectedWhenVisible(attempt + 1))
}
watch(
  () => props.value,
  () => scrollToSelected(SCROLL_DURATION)
)
watch(
  () => props.active,
  (active) => {
    if (!active) return
    // 展开首帧面板可能尚未可见，须等渲染完成后再量取元素位置
    nextTick(() => scrollToSelectedWhenVisible())
  },
  { immediate: true, flush: 'post' }
)
onBeforeUnmount(() => cancelAnimationFrame(frameId))
function onCellClick(unit: PickerTimeUnit): void {
  if (unit.disabled) return
  emits('select', unit.value)
}
</script>
<template>
  <div ref="columnRef" class="picker-time-column">
    <Scrollbar>
      <ul class="picker-time-list">
        <template v-for="unit in units" :key="unit.value">
          <li
            v-if="!(hideDisabledOptions && unit.disabled)"
            :ref="(element) => setCellRef(unit.value, element)"
            class="picker-time-cell"
            :class="{
              'picker-time-cell-selected': unit.value === value,
              'picker-time-cell-disabled': unit.disabled
            }"
            @click="onCellClick(unit)"
          >
            <div class="picker-time-cell-inner">{{ unit.label }}</div>
          </li>
        </template>
      </ul>
    </Scrollbar>
  </div>
</template>
<style lang="less" scoped>
.picker-time-column {
  flex: 1 0 auto;
  width: 56px;
  // 上下留白在滚动容器之外，列高因此等于内容高减 8px
  margin: 4px 0;
  // 让 Scrollbar 的滚动容器成为列的定位祖先：候选项的 offsetTop 才是「距滚动容器的偏移」
  :deep(.scrollbar-container) {
    position: relative;
  }
  &:not(:first-child) {
    border-left: 1px solid rgba(5, 5, 5, 0.06);
  }
  .picker-time-list {
    margin: 0;
    padding: 0;
    text-align: start;
    list-style: none;
    transition: background 0.2s;
    // 尾随占位：「最后几项」也能滚到列顶部（高度 = 内容高 224 - 格高 28 + 上下留白 4 × 2；
    // 独立时间选择器形态若复用本列，该值需随面板高度改回 196px）
    &::after {
      display: block;
      height: 204px;
      content: '';
    }
  }
  .picker-time-cell {
    margin: 0 4px;
    padding: 0;
    .picker-time-cell-inner {
      display: block;
      width: 48px;
      height: 28px;
      padding-left: 14px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 28px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    }
    &.picker-time-cell-selected .picker-time-cell-inner {
      background: var(--picker-primary-bg-color, #e6f4ff);
    }
    &.picker-time-cell-disabled {
      pointer-events: none;
      .picker-time-cell-inner {
        color: rgba(0, 0, 0, 0.25);
        background: transparent;
        cursor: not-allowed;
      }
    }
  }
}
</style>
