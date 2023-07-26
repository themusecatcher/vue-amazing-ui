<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
interface Props {
  maxWidth?: number // 提示框内容最大宽度，单位px
  content?: string // 展示的文本 string | slot
  title?: string // 提示的文本 string | slot
  fontSize?: number // 提示文本字体大小，单位px，优先级高于 overlayStyle
  color?: string // 提示文本字体颜色，优先级高于 overlayStyle
  backgroundColor?: string // 提示框背景颜色，优先级高于 overlayStyle
  overlayStyle?: CSSProperties // 提示框内容区域样式
}
withDefaults(defineProps<Props>(), {
  maxWidth: 120,
  content: '暂无内容',
  title: '暂无提示',
  fontSize: 14,
  color: '#FFF',
  backgroundColor: 'rgba(0,0,0,.85)',
  overlayStyle: () => ({})
})
const visible = ref(false)
const hideTimer = ref()
const top = ref(0) // 提示框top定位
const left = ref(0) // 提示框left定位
const contentRef = ref() // 声明一个同名的模板引用
const titleRef = ref() // 声明一个同名的模板引用
function getPosition () {
  const contentWidth = contentRef.value.offsetWidth // 内容宽度
  const titleWidth = titleRef.value.offsetWidth // 提示文本宽度
  const titleHeight = titleRef.value.offsetHeight // 提示文本高度
  top.value = titleHeight
  left.value = (titleWidth - contentWidth) / 2
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
      ref="titleRef"
      class="m-title"
      :class="{'show-tip': visible}"
      @mouseenter="onShow"
      @mouseleave="onHide"
      :style="`max-width: ${maxWidth}px; top: ${-top}px; left: ${-left}px;`">
      <div
        class="u-title"
        :style="[overlayStyle, `font-size: ${fontSize}px; color: ${color}; background-color: ${backgroundColor};`]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="m-arrow">
        <span class="u-arrow" :style="`background-color: ${backgroundColor};`"></span>
      </div>
    </div>
    <div ref="contentRef" class="u-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-tooltip {
  position: relative;
  display: inline-block;
  .m-title {
    position: absolute;
    z-index: 999;
    width: max-content;
    padding-bottom: 16px;
    pointer-events: none;
    opacity: 0;
    transform-origin: 50% 75%;
    transform: scale(.8); // 缩放变换
    -ms-transform: scale(.8); /* IE 9 */
    -webkit-transform: scale(.8); /* Safari and Chrome */
    transition: transform .25s, opacity .25s;
    .u-title {
      padding: 6px 8px;
      margin: 0 auto;
      text-align: start;
      word-break: break-all;
      box-shadow: 0 3px 12px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 24px 6px rgba(0, 0, 0, .05);
      border-radius: 6px;
      font-weight: 400;
      line-height: 1.5;
    }
    .m-arrow {
      position: absolute;
      z-index: 9;
      bottom: 16px;
      left: 50%;
      transform: translate(-50%, 100%);
      width: 18px;
      height: 10px;
      overflow: hidden;
      .u-arrow {
        position: absolute;
        left: 50%;
        top: 0px;
        transform: translate(-50%, -50%) rotate(45deg);
        margin: 0 auto;
        width: 12px;
        height: 12px;
        border-radius: 0 0 3px 0;
        z-index: 8;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, .05);
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
  .u-content {
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.85);
  }
}
</style>
