<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlotsExist, rafTimeout, cancelRaf } from '../utils'
interface Props {
  maxWidth?: string | number // 弹出提示最大宽度，单位 px
  content?: string // 展示的文本 string | slot
  contentStyle?: CSSProperties // 设置展示文本的样式
  tooltip?: string // 弹出提示文本 string | slot
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
  bgColor?: string // 弹出提示框背景颜色
  arrow?: boolean // 是否显示箭头
  trigger?: 'hover' | 'click' // 弹出提示触发方式
  showDelay?: number // 弹出提示显示的延迟时间，单位 ms
  hideDelay?: number // 弹出提示隐藏的延迟时间，单位 ms
  show?: boolean // (v-model) 弹出提示是否显示
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: 240,
  content: undefined,
  contentStyle: () => ({}),
  tooltip: undefined,
  tooltipStyle: () => ({}),
  bgColor: 'rgba(0, 0, 0, 0.85)',
  arrow: true,
  trigger: 'hover',
  showDelay: 100,
  hideDelay: 100,
  show: false
})
const visible = ref(false)
const hideTimer = ref()
const top = ref(0) // 提示框 top 定位
const left = ref(0) // 提示框 left 定位
const contentRef = ref() // 声明一个同名的模板引用
const tooltipRef = ref() // 声明一个同名的模板引用
const activeBlur = ref(false) // 是否激活 blur 事件
const emits = defineEmits(['update:show', 'openChange'])
const slotsExist = useSlotsExist(['tooltip'])
const tooltipMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return props.maxWidth + 'px'
  }
  return props.maxWidth
})
const showTooltip = computed(() => {
  return slotsExist.tooltip || props.tooltip
})
watch(
  tooltipMaxWidth,
  () => {
    getPosition()
  },
  {
    flush: 'post'
  }
)
watchEffect(() => {
  visible.value = props.show
})
function getPosition() {
  const contentWidth = contentRef.value.offsetWidth // 展示文本宽度
  const tooltipWidth = tooltipRef.value.offsetWidth // 提示文本宽度
  const tooltipHeight = tooltipRef.value.offsetHeight // 提示文本高度
  top.value = tooltipHeight + (props.arrow ? 4 : 6)
  left.value = (tooltipWidth - contentWidth) / 2
}
function onShow() {
  hideTimer.value && cancelRaf(hideTimer.value)
  if (!visible.value) {
    getPosition()
    rafTimeout(() => {
      visible.value = true
      emits('update:show', true)
      emits('openChange', true)
    }, props.showDelay)
  }
}
function onHide(): void {
  hideTimer.value = rafTimeout(() => {
    visible.value = false
    emits('update:show', false)
    emits('openChange', false)
  }, props.hideDelay)
}
function toggleVisible() {
  if (!visible.value) {
    onShow()
  } else {
    onHide()
  }
}
function onEnter() {
  activeBlur.value = false
}
function onLeave() {
  activeBlur.value = true
  tooltipRef.value.focus()
}
function onBlur() {
  visible.value = false
  emits('update:show', false)
  emits('openChange', false)
}
</script>
<template>
  <div
    class="m-tooltip-wrap"
    @mouseenter="trigger === 'hover' ? onShow() : () => false"
    @mouseleave="trigger === 'hover' ? onHide() : () => false"
  >
    <div
      ref="tooltipRef"
      tabindex="1"
      class="m-tooltip-card"
      :class="{ 'tooltip-padding': arrow, 'tooltip-visible': visible && showTooltip }"
      :style="`--tooltip-max-width: ${tooltipMaxWidth}; --tooltip-background-color: ${bgColor}; transform-origin: 50% ${top}px; top: ${-top}px; left: ${-left}px;`"
      @blur="trigger === 'click' && activeBlur ? onBlur() : () => false"
      @mouseenter="trigger === 'hover' ? onShow() : () => false"
      @mouseleave="trigger === 'hover' ? onHide() : () => false"
    >
      <div class="tooltip-card" :style="tooltipStyle">
        <slot name="tooltip">{{ tooltip }}</slot>
      </div>
      <div v-if="arrow" class="tooltip-arrow"></div>
    </div>
    <span
      ref="contentRef"
      class="tooltip-content"
      :style="contentStyle"
      @click="trigger === 'click' ? toggleVisible() : () => false"
      @mouseenter="trigger === 'click' && visible ? onEnter() : () => false"
      @mouseleave="trigger === 'click' && visible ? onLeave() : () => false"
    >
      <slot>{{ content }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-tooltip-wrap {
  position: relative;
  display: inline-block;
  .m-tooltip-card {
    position: absolute;
    z-index: 999;
    width: max-content;
    max-width: var(--tooltip-max-width);
    pointer-events: none;
    transform: scale(0.8);
    opacity: 0;
    transition:
      transform 0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    .tooltip-card {
      min-width: 32px;
      min-height: 32px;
      padding: 6px 8px;
      font-size: 14px;
      color: #fff;
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
        left: 0;
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
  .tooltip-padding {
    padding-bottom: 12px;
  }
  .tooltip-visible {
    pointer-events: auto;
    transform: scale(1);
    opacity: 1;
  }
  .tooltip-content {
    display: inline-block;
  }
}
</style>
