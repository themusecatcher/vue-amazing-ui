<script setup lang="ts">
import { ref, onMounted, onUpdated, nextTick } from 'vue'
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
const duration = ref(0)

onMounted(() => {
  getPosition()
})
onUpdated(() => {
  getPosition()
})
function getPosition () {
  const rect = contentRef.value.getBoundingClientRect()
  const targetTop = rect.top
  const targetLeft = rect.left
  const targetWidth = rect.width
  const titleWidth = titleRef.value.offsetWidth // 提示文本宽度
  const titleHeight = titleRef.value.offsetHeight // 提示文本高度
  duration.value = 0
  top.value = targetTop - titleHeight
  left.value = targetLeft - (titleWidth - targetWidth) / 2
  nextTick()
}
async function onShow () {
  await getPosition()
  duration.value = 0.3
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
      :style="`max-width: ${maxWidth}px; top: ${top}px; left: ${left}px; transition-duration: ${duration}s;`">
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
  padding-bottom: 12px;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.8); // 缩放变换
  -ms-transform: scale(0.8); /* IE 9 */
  -webkit-transform: scale(0.8); /* Safari and Chrome */
  transition-property: all;
  .u-title {
    padding: 10px;
    margin: 0 auto;
    word-break: break-all;
    word-wrap: break-word;
    background: #FFFFFF;
    box-shadow: 0px 0px 7px 1px fade(@themeColor, 36%);
    border-radius: 5px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }
  .u-arrow {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    margin: 0 auto;
    width: 10px;
    height: 10px;
    background: #FFF;
    border-radius: 0 0 3px 0;
    z-index: 0;
    box-shadow: 3px 3px 7px fade(@themeColor, 36%);
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
