<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
interface Props {
  maxWidth?: number // 提示框内容最大宽度
  content?: string // 展示的文本 string | slot
  title?: string // 提示的文本 string | slot
  fontSize?: number // 提示文本字体大小
  color?: string // 提示文本字体颜色
  backgroundColor?: string // 提示框背景色
}
withDefaults(defineProps<Props>(), {
  maxWidth: 120,
  content: '暂无内容',
  title: '暂无提示',
  fontSize: 14,
  color: 'rgba(0,0,0,.85)',
  backgroundColor: '#FFF'
})
const visible = ref(false)
const hideTimer = ref()
const top = ref(0) // 提示框top定位
const left = ref(0) // 提示框left定位
const contentRef = ref() // 声明一个同名的模板引用
const titleRef = ref() // 声明一个同名的模板引用
onMounted(() => {
  getPosition()
})
function getPosition () {
  const rect = contentRef.value.getBoundingClientRect()
  const targetTop = rect.top
  const targetLeft = rect.left
  const targetWidth = rect.width
  const titleWidth = titleRef.value.offsetWidth // 提示文本宽度
  const titleHeight = titleRef.value.offsetHeight // 提示文本高度
  top.value = targetTop - titleHeight
  left.value = targetLeft - (titleWidth - targetWidth) / 2
}
function onShow () {
  getPosition()
  cancelRaf(hideTimer.value)
  visible.value = true
}
function onHide (): void {
  hideTimer.value = rafTimeout(() => {
    visible.value = false
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
      :style="`max-width: ${maxWidth}px; top: ${top}px; left: ${left}px;`">
      <div class="u-title" :style="`font-size: ${fontSize}px; color: ${color}; background-color: ${backgroundColor};`">
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
  box-sizing: border-box;
  display: inline-block;
}
.m-title {
  position: fixed;
  z-index: 999;
  padding-bottom: 12px;
  pointer-events: none;
  opacity: 0;
  transform-origin: 50% 75%;
  transform: scale(0.8); // 缩放变换
  -ms-transform: scale(0.8); /* IE 9 */
  -webkit-transform: scale(0.8); /* Safari and Chrome */
  transition: transform .25s, opacity .25s;
  .u-title {
    padding: 10px;
    margin: 0 auto;
    word-break: break-all;
    word-wrap: break-word;
    box-shadow: 0px 0px 5px 1px fade(@themeColor, 36%);
    border-radius: 5px;
    font-weight: 400;
    line-height: 1.5;
  }
  .m-arrow {
    position: absolute;
    z-index: 9;
    bottom: 12px;
    left: 50%;
    transform: translate(-50%, 100%);
    width: 15.55px;
    height: 10px;
    border-radius: 0 0 5px 5px;
    overflow: hidden;
    .u-arrow {
      position: absolute;
      left: 50%;
      top: -1px;
      transform: translate(-50%, -50%) rotate(45deg);
      margin: 0 auto;
      width: 11px;
      height: 11px;
      border-radius: 0 0 3px 0;
      z-index: 8;
      box-shadow: 1px 1px 1px 1px fade(@themeColor, 12%);
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
  color: #000000;
}
</style>
