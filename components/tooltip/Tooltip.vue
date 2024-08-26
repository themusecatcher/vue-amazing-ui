<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf } from '../utils'
interface Props {
  maxWidth?: number // 提示框内容最大宽度，单位 px
  content?: string // 展示的文本 string | slot
  tooltip?: string // 提示的文本 string | slot
  fontSize?: number // 提示文本字体大小，单位 px，优先级高于 overlayStyle
  color?: string // 提示文本字体颜色，优先级高于 overlayStyle
  backgroundColor?: string // 提示框背景颜色，优先级高于 overlayStyle
  overlayStyle?: CSSProperties // 提示框内容区域样式
}
withDefaults(defineProps<Props>(), {
  maxWidth: 120,
  content: '暂无内容',
  tooltip: '暂无提示',
  fontSize: 14,
  color: '#FFF',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  overlayStyle: () => ({})
})
const visible = ref(false)
const hideTimer = ref()
const top = ref(0) // 提示框 top 定位
const left = ref(0) // 提示框 left 定位
const contentRef = ref() // 声明一个同名的模板引用
const tooltipRef = ref() // 声明一个同名的模板引用
const emit = defineEmits(['openChange'])
function getPosition() {
  const contentWidth = contentRef.value.offsetWidth // 展示文本宽度
  const tooltipWidth = tooltipRef.value.offsetWidth // 提示文本宽度
  const tooltipHeight = tooltipRef.value.offsetHeight // 提示文本高度
  top.value = tooltipHeight + 4
  left.value = (tooltipWidth - contentWidth) / 2
}
function onShow() {
  getPosition()
  hideTimer.value && cancelRaf(hideTimer.value)
  visible.value = true
  emit('openChange', visible.value)
}
function onHide(): void {
  hideTimer.value = rafTimeout(() => {
    visible.value = false
    emit('openChange', visible.value)
  }, 100)
}
</script>
<template>
  <div class="m-tooltip-wrap" @mouseenter="onShow" @mouseleave="onHide">
    <div
      ref="tooltipRef"
      class="m-tooltip-content"
      :class="{ 'tip-visible': visible }"
      :style="`--tooltip-font-size: ${fontSize}px; --tooltip-color: ${color}; --tooltip-background-color: ${backgroundColor}; max-width: ${maxWidth}px; transform-origin: 50% ${top}px; top: ${-top}px; left: ${-left}px;`"
      @mouseenter="onShow"
      @mouseleave="onHide"
    >
      <div class="m-tooltip" :style="overlayStyle">
        <slot name="tooltip">{{ tooltip }}</slot>
      </div>
      <div class="tooltip-arrow">
        <span></span>
      </div>
    </div>
    <span ref="contentRef">
      <slot>{{ content }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-tooltip-wrap {
  position: relative;
  display: inline-block;
  .m-tooltip-content {
    position: absolute;
    z-index: 999;
    width: max-content;
    padding-bottom: 12px;
    pointer-events: none;
    transform: scale(0.8);
    opacity: 0;
    transition:
      transform 0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    .m-tooltip {
      min-width: 32px;
      min-height: 32px;
      padding: 6px 8px;
      font-size: var(--tooltip-font-size);
      color: var(--tooltip-color);
      line-height: 1.5714285714285714;
      text-align: justify;
      text-decoration: none;
      word-break: break-all;
      background-color: var(--tooltip-background-color);
      border-radius: 6px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
    .tooltip-arrow {
      position: absolute;
      z-index: 9;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%) translateY(100%) rotate(180deg);
      display: block;
      pointer-events: none;
      width: 16px;
      height: 16px;
      overflow: hidden;
      &::before {
        position: absolute;
        bottom: 0;
        inset-inline-start: 0;
        width: 16px;
        height: 8px;
        background-color: var(--tooltip-background-color);
        clip-path: path(
          'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
        );
        content: '';
      }
      &::after {
        position: absolute;
        width: 8.970562748477143px;
        height: 8.970562748477143px;
        bottom: 0;
        inset-inline: 0;
        margin: auto;
        border-radius: 0 0 2px 0;
        transform: translateY(50%) rotate(-135deg);
        box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
        z-index: 0;
        background: transparent;
        content: '';
      }
    }
  }
  .tip-visible {
    pointer-events: auto;
    transform: scale(1);
    opacity: 1;
  }
}
</style>
