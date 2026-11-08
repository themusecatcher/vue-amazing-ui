<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import Scrollbar, { type ScrollbarExpose } from 'components/scrollbar'
import type { PickerTimeUnit } from './types'
export interface TimeUnitColumnProps {
  units?: PickerTimeUnit[] // 该列的候选项
  value?: number | null // 当前选中项（空值时不选中任何项，且保持当前滚动位置）
  hideDisabledOptions?: boolean // 是否隐藏禁用项
  active?: boolean // 面板是否展开：展开时把选中项滚到列顶部
  columnActive?: boolean // 是否为键盘操作当前所在的列（该列加底色以示目标）
}
const props = withDefaults(defineProps<TimeUnitColumnProps>(), {
  units: () => [],
  value: null,
  hideDisabledOptions: false,
  active: false,
  columnActive: false
})
const emits = defineEmits<{
  select: [value: number]
}>()
/** 选中项滚到列顶部的动画时长 */
const SCROLL_DURATION = 120
/** 面板展开后等待可见的最大帧数（浮层首帧可能仍在 display: none） */
const MAX_VISIBLE_FRAMES = 20
const columnRef = ref<HTMLElement | null>(null)
const scrollbarRef = ref<ScrollbarExpose | null>(null)
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
 * 直接取组件暴露的容器元素，不依赖 Scrollbar 内部类名
 */
function getScroller(): HTMLElement | null {
  return scrollbarRef.value?.scrollElement ?? null
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
  // 空值只清掉选中态、不动滚动位置：范围形态切换激活段时对端常为空值，回到列顶会让面板「看着被重置」，
  // 而列在面板收起后仍保留原滚动位置（同参照实现：空值段沿用上一次选择的列位置）
  if (props.value === null) return
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
  <div ref="columnRef" class="picker-time-column" :class="{ 'picker-time-column-active': columnActive }">
    <Scrollbar ref="scrollbarRef">
      <ul class="picker-time-list" role="listbox">
        <template v-for="unit in units" :key="unit.value">
          <li
            v-if="!(hideDisabledOptions && unit.disabled)"
            :ref="(element) => setCellRef(unit.value, element)"
            class="picker-time-cell"
            :class="{
              'picker-time-cell-selected': unit.value === value,
              'picker-time-cell-disabled': unit.disabled
            }"
            role="option"
            :aria-selected="unit.value === value"
            :aria-disabled="unit.disabled"
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
  // 分隔线与活动列底纹都由本列的绝对定位伪元素绘制，故须成为它们的定位祖先；
  // isolation 让底纹的 z-index: -1 留在本列之内，否则会沉到面板底色之下而看不见
  position: relative;
  isolation: isolate;
  flex: 1 0 auto;
  width: 56px;
  margin: 4px 0;
  :deep(.scrollbar-container) {
    position: relative;
    /* 滚到边界不带动页面：时间列常被触控板惯性推到顶 / 底，滚动链会带着整页跳走（与 Select 面板同一处理；
       须用 none 而非 contain —— contain 只切断滚动链，元素自身的弹性回弹仍会把列表带出滚动区露出空白） */
    overscroll-behavior: none;
  }
  &:not(:first-child) {
    margin-left: 1px;
    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1px;
      width: 1px;
      background: var(--va-border-split-color);
      content: '';
    }
  }
  &.picker-time-column-active {
    &::before {
      position: absolute;
      inset: 0 2px;
      z-index: -1;
      background: var(--va-fill-color-1);
      border-radius: 4px;
      content: '';
    }
    .picker-time-cell:not(.picker-time-cell-selected) .picker-time-cell-inner:hover {
      background: var(--va-fill-color-2);
    }
  }
  .picker-time-list {
    margin: 0;
    padding: 0;
    text-align: start;
    list-style: none;
    transition: background 0.2s;
    &::after {
      display: block;
      height: var(--picker-time-column-trailing-height, 204px);
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
      color: var(--va-text-color-1);
      line-height: 28px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
      &:hover {
        background: var(--va-fill-color-1);
      }
    }
    &.picker-time-cell-selected .picker-time-cell-inner {
      background: var(--picker-primary-color-bg, var(--va-primary-bg-color));
    }
    &.picker-time-cell-disabled {
      pointer-events: none;
      .picker-time-cell-inner {
        color: var(--va-text-color-disabled);
        background: transparent;
        cursor: not-allowed;
      }
    }
  }
}
</style>
