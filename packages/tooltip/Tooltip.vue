<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
defineProps({ // 运行时声明
  maxWidth: { // 提示框内容最大宽度
    type: Number,
    default: 120
  },
  content: { // 展示的文本
    type: String,
    default: '暂无内容' // string | slot
  },
  title: { // 提示的文本
    type: String,
    default: '暂无提示' // string | slot
  }
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
onUpdated(() => {
  getPosition()
})
function getPosition (): void {
  const rect = contentRef.value.getBoundingClientRect()
  const targetTop = rect.top + window.pageYOffset
  const targetLeft = rect.left + window.pageXOffset
  const targetWidth = rect.width
  const titleWidth = titleRef.value.offsetWidth // 提示文本宽度
  const titleHeight = titleRef.value.offsetHeight // 提示文本高度
  top.value = targetTop - titleHeight
  left.value = targetLeft - (titleWidth - targetWidth) / 2
}
function onShow (): void {
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
      <div class="u-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="u-arrow"></div>
    </div>
    <div ref="contentRef" class="u-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-tooltip {
  display: inline-block;
}
.m-title {
  position: fixed;
  z-index: 999;
  padding-bottom: 6px;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.8); // 缩放变换
  -ms-transform: scale(0.8); /* IE 9 */
  -webkit-transform: scale(0.8); /* Safari and Chrome */
  transition: all .3s;
  .u-title {
    padding: 10px;
    margin: 0 auto;
    word-break: break-all;
    word-wrap: break-word;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px 0px rgba(0,121,221,0.3000);
    border-radius: 6px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #666666;
  }
  .u-arrow {
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid #FFF;
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
