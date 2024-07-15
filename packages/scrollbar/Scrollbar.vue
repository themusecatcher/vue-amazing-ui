<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
interface Props {
  size?: number // 滚动条的大小，单位 px
  trigger?: 'hover' | 'none' // 显示滚动条的时机，'none' 表示一直显示
  horizontal?: boolean // 是否使用横向滚动
  scrollStyle?: CSSProperties // 滚动条样式
  contentStyle?: CSSProperties // 内容样式
}
const props = withDefaults(defineProps<Props>(), {
  size: 5,
  trigger: 'hover',
  horizontal: false,
  scrollStyle: () => ({}),
  contentStyle: () => ({})
})
const scrollbarRef = ref()
const emits = defineEmits(['scroll'])
function onTrackMouseDown(e: MouseEvent) {
  yBarPressed = true
  on('mousemove', window, handleYScrollMouseMove, true)
  on('mouseup', window, handleYScrollMouseUp, true)
  window.onmousemove = handleYScrollMouseMove
  memoYTop = containerScrollTopRef.value
  memoMouseY = e.clientY
}
function handleYScrollMouseMove(e: MouseEvent) {
  if (!yBarPressed) {
    return
  }
  if (xBarVanishTimerId !== undefined) {
    window.clearTimeout(xBarVanishTimerId)
  }
  if (yBarVanishTimerId !== undefined) {
    window.clearTimeout(yBarVanishTimerId)
  }
  const { value: containerHeight } = containerHeightRef
  const { value: contentHeight } = contentHeightRef
  const { value: yBarSize } = yBarSizeRef
  if (containerHeight === null || contentHeight === null) {
    return
  }
  const dY = e.clientY - memoMouseY
  const dScrollTop = (dY * (contentHeight - containerHeight)) / (containerHeight - yBarSize)
  const toScrollTopUpperBound = contentHeight - containerHeight
  let toScrollTop = memoYTop + dScrollTop
  toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
  toScrollTop = Math.max(toScrollTop, 0)
  const { value: container } = mergedContainerRef
  if (container) {
    container.scrollTop = toScrollTop
  }
}
function scrollTo(...args: any[]) {
  scrollbarRef.value?.scrollTo(args[0], args[1])
}
function scrollBy(...args: any[]) {
  scrollbarRef.value?.scrollBy(args[0], args[1])
}
defineExpose({
  scrollTo,
  scrollBy
})
</script>
<template>
  <div ref="scrollbarRef" class="m-scrollbar" :style="contentStyle">
    <div class="m-scrollbar-container">
      <div class="m-scrollbar-content">
        <slot></slot>
      </div>
    </div>
    <div class="m-scrollbar-rail">
      <div class="m-scrollbar-track" @mousedown.prevent.stop="onTrackMouseDown"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-scrollbar {
  overflow: hidden;
  position: relative;
  z-index: auto;
  height: 100%;
  width: 100%;
  .m-scrollbar-container {
    width: 100%;
    overflow: scroll;
    height: 100%;
    min-height: inherit;
    max-height: inherit;
    scrollbar-width: none;
    .m-scrollbar-content {
      box-sizing: border-box;
      min-width: 100%;
    }
  }
  .m-scrollbar-rail {
    inset: 2px 4px 2px auto;
    width: 5px;
    position: absolute;
    pointer-events: none;
    user-select: none;
    background: transparent;
    -webkit-user-select: none;
    .m-scrollbar-track {
      width: 5px;
      border-radius: 5px;
      bottom: 0;
      z-index: 1;
      position: absolute;
      cursor: pointer;
      pointer-events: all;
      background-color: rgba(0, 0, 0, 0.25);
      transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}
</style>
