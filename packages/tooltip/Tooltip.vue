<script setup lang="ts">
import { ref, nextTick, onMounted, onUpdated } from 'vue'
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
const visible = ref(true)
const hideTimer = ref()
const top = ref(-1000) // 提示框top定位
const left = ref(-1000) // 提示框left定位
const contentRef = ref() // 声明一个同名的模板引用
const titleRef = ref() // 声明一个同名的模板引用

function getPosition (): void {
  clearTimeout(hideTimer.value)
  const rect = contentRef.value.getBoundingClientRect()
  const targetTop = rect.top + window.pageYOffset
  const targetLeft = rect.left + window.pageXOffset
  const targetWidth = rect.width
  const titleWidth = titleRef.value.offsetWidth // 提示文本宽度
  const titleHeight = titleRef.value.offsetHeight // 提示文本高度
  visible.value = false
  nextTick(() => {
    setTimeout(() => { // 等待过渡完成
      top.value = targetTop - titleHeight
      left.value = targetLeft - (titleWidth - targetWidth) / 2
    }, 200)
  })
}
function onShow (): void {
  clearTimeout(hideTimer.value)
  visible.value = true
}
function onHide (): void {
  hideTimer.value = setTimeout(() => {
    visible.value = false
  }, 100)
}

onMounted(() => {
  getPosition()
})
onUpdated(() => {
  visible.value = true
  nextTick(() => {
    getPosition()
  })
})
</script>
<template>
  <div class="m-tooltip" @mouseenter="onShow" @mouseleave="onHide">
    <transition name="fade">
      <div
        ref="titleRef"
        class="m-title"
        @mouseenter="onShow"
        @mouseleave="onHide"
        v-show="visible"
        :style="`max-width: ${maxWidth}px; top: ${top}px; left: ${left}px;`">
        <div class="u-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="u-arrow"></div>
      </div>
    </transition>
    <div ref="contentRef" class="u-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
// 渐变过渡效果
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8); // 缩放变换
  -ms-transform: scale(0.8); /* IE 9 */
  -webkit-transform: scale(0.8); /* Safari and Chrome */
}
// 滑动渐变过渡效果
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(6px); // 滑动变换
  -ms-transform: translateY(6px); /* IE 9 */
  -webkit-transform: translateY(6px); /* Safari and Chrome */
  opacity: 0;
}
.m-tooltip {
  display: inline-block;
}
.m-title {
  position: absolute;
  z-index: 999;
  padding-bottom: 6px;
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
.u-content {
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  color: #000000;
}
</style>
