<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
interface Props {
  maxWidth?: number // 提示框内容最大宽度，单位px
  content?: string // 展示的文本 string | slot
  tooltip?: string // 提示的文本 string | slot
  fontSize?: number // 提示文本字体大小，单位px，优先级高于 overlayStyle
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
  backgroundColor: 'rgba(0, 0, 0, .85)',
  overlayStyle: () => ({})
})
const visible = ref(false)
const hideTimer = ref()
const top = ref(0) // 提示框top定位
const left = ref(0) // 提示框left定位
const contentRef = ref() // 声明一个同名的模板引用
const tooltipRef = ref() // 声明一个同名的模板引用
function getPosition () {
  const contentWidth = contentRef.value.offsetWidth // 展示文本宽度
  const tooltipWidth = tooltipRef.value.offsetWidth // 提示文本宽度
  const tooltipHeight = tooltipRef.value.offsetHeight // 提示文本高度
  top.value = tooltipHeight + 4
  left.value = (tooltipWidth - contentWidth) / 2
}
const emit = defineEmits(['openChange'])
function onShow () {
  getPosition()
  cancelRaf(hideTimer.value)
  visible.value = true
  emit('openChange', visible.value)
}
function onHide (): void {
  hideTimer.value = rafTimeout(() => {
    visible.value = false
    emit('openChange', visible.value)
  }, 100)
}
</script>
<template>
  <div class="m-tooltip" @mouseenter="onShow" @mouseleave="onHide">
    <div
      ref="tooltipRef"
      class="m-tooltip-content"
      :class="{'show-tip': visible}"
      :style="`--tooltip-font-size: ${fontSize}px; --tooltip-color: ${color}; --tooltip-background-color: ${backgroundColor}; max-width: ${maxWidth}px; top: ${-top}px; left: ${-left}px;`"
      @mouseenter="onShow"
      @mouseleave="onHide">
      <div
        class="u-tooltip"
        :style="overlayStyle">
        <slot name="tooltip">{{ tooltip }}</slot>
      </div>
      <div class="m-tooltip-arrow">
        <span class="u-tooltip-arrow"></span>
      </div>
    </div>
    <div ref="contentRef">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-tooltip {
  position: relative;
  display: inline-block;
  .m-tooltip-content {
    position: absolute;
    z-index: 999;
    width: max-content;
    padding-bottom: 12px;
    pointer-events: none;
    opacity: 0;
    transform-origin: 50% 75%;
    transform: scale(.8); // 缩放变换
    -ms-transform: scale(.8); /* IE 9 */
    -webkit-transform: scale(.8); /* Safari and Chrome */
    transition: transform .25s, opacity .25s;
    .u-tooltip {
      min-width: 32px;
      min-height: 32px;
      padding: 6px 8px;
      font-size: var(--tooltip-font-size);
      color: var(--tooltip-color);
      line-height: 1.5714285714285714;
      text-align: start;
      text-decoration: none;
      word-wrap: break-word;
      background-color: var(--tooltip-background-color);
      border-radius: 6px;
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
    }
    .m-tooltip-arrow {
      position: absolute;
      z-index: 9;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%) translateY(100%) rotate(180deg);
      display: block;
      border-radius: 0 0 2px;
      pointer-events: none;
      width: 32px;
      height: 32px;
      overflow: hidden;
      &::before {
        position: absolute;
        bottom: 0;
        inset-inline-start: 0;
        width: 32px;
        height: 8px;
        background: var(--tooltip-background-color);
        clip-path: path('M 6.343145750507619 8 A 4 4 0 0 0 9.17157287525381 6.82842712474619 L 14.585786437626904 1.414213562373095 A 2 2 0 0 1 17.414213562373096 1.414213562373095 L 22.82842712474619 6.82842712474619 A 4 4 0 0 0 25.65685424949238 8 Z');
        content: "";
      }
      &::after {
        position: absolute;
        width: 11.31370849898476px;
        height: 11.31370849898476px;
        bottom: 0;
        inset-inline: 0;
        margin: auto;
        border-radius: 0 0 2px 0;
        transform: translateY(50%) rotate(-135deg);
        box-shadow: 3px 3px 7px rgba(0, 0, 0, .1);
        z-index: 0;
        background: transparent;
        content: "";
      }
    }
  }
  .show-tip {
    pointer-events: auto;
    opacity: 1;
    transform: scale(1); // 缩放变换
    -ms-transform: scale(1); /* IE 9 */
    -webkit-transform: scale(1); /* Safari and Chrome */
  }
}
</style>
