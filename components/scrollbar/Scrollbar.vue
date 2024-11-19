<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { debounce, useEventListener, useMutationObserver } from '../utils'
interface Props {
  contentClass?: string // 内容 div 的类名
  contentStyle?: CSSProperties // 内容 div 的样式
  size?: number // 滚动条的大小，单位 px
  trigger?: 'hover' | 'none' // 显示滚动条的时机，'none' 表示一直显示
  autoHide?: boolean // 是否自动隐藏滚动条，仅当 trigger: 'hover' 时生效；为 true 时表示鼠标在滚动区域且不滚动时自动隐藏，滚动时自动显示；为 false 时表示鼠标在滚动区域时始终显示，无论是否在滚动
  delay?: number // 滚动条自动隐藏的延迟时间，单位 ms
  xScrollable?: boolean // 是否使用横向滚动
  xPlacement?: 'top' | 'bottom' // 横向滚动时滚动条的位置
  yPlacement?: 'left' | 'right' // 纵向滚动时滚动条的位置
}
const props = withDefaults(defineProps<Props>(), {
  contentClass: undefined,
  contentStyle: () => ({}),
  size: 5,
  trigger: 'hover',
  autoHide: true,
  delay: 1000,
  xScrollable: false,
  xPlacement: 'bottom',
  yPlacement: 'right'
})
const scrollbarRef = ref()
const containerRef = ref()
const contentRef = ref()
const railVerticalRef = ref()
const railHorizontalRef = ref()
const showTrack = ref(false)
const containerScrollHeight = ref(0) // 滚动区域高度，包括溢出高度
const containerScrollWidth = ref(0) // 滚动区域宽度，包括溢出宽度
const containerClientHeight = ref(0) // 滚动区域高度，不包括溢出高度
const containerClientWidth = ref(0) // 滚动区域宽度，不包括溢出宽度
const containerHeight = ref(0) // 容器高度
const containerWidth = ref(0) // 容器宽度
const contentHeight = ref(0) // 内容高度
const contentWidth = ref(0) // 内容宽度
const railHeight = ref(0) // 滚动条高度
const railWidth = ref(0) // 滚动条宽度
const containerScrollTop = ref(0) // 垂直滚动距离
const containerScrollLeft = ref(0) // 水平滚动距离
const trackYPressed = ref(false) // 垂直滚动条是否被按下
const trackXPressed = ref(false) // 水平滚动条是否被按下
const mouseLeave = ref(false) // 鼠标在按下滚动条并拖动时是否离开滚动区域
const memoYTop = ref<number>(0) // 鼠标选中并按下垂直滚动条时已滚动的垂直距离
const memoXLeft = ref<number>(0) // 鼠标选中并按下水平滚动条时已滚动的水平距离
const memoMouseY = ref<number>(0) // 鼠标选中并按下垂直滚动条时的鼠标 Y 坐标
const memoMouseX = ref<number>(0) // 鼠标选中并按下水平滚动条时的鼠标 X 坐标
const horizontalContentStyle = { width: 'fit-content' } // 水平滚动时内容区域默认样式
const trackHover = ref(false) // 鼠标是否在滚动条上
const trackLeave = ref(false) // 鼠标在按下滚动条并拖动时是否离开滚动条
const emit = defineEmits(['scroll'])
const autoShowTrack = computed(() => {
  return props.trigger === 'hover' && props.autoHide
})
const isYScroll = computed(() => {
  // 是否存在垂直滚动
  return containerScrollHeight.value > containerClientHeight.value
})
const isXScroll = computed(() => {
  // 是否存在水平滚动
  return containerScrollWidth.value > containerClientWidth.value
})
const isScroll = computed(() => {
  // 是否存在滚动，水平或垂直
  return isYScroll.value || (props.xScrollable && isXScroll.value)
})
const trackHeight = computed(() => {
  // 垂直滚动条高度
  if (isYScroll.value) {
    if (containerHeight.value && contentHeight.value && railHeight.value) {
      const value = Math.min(
        containerHeight.value,
        (railHeight.value * containerHeight.value) / contentHeight.value + 1.5 * props.size
      )
      return Number(value.toFixed(4))
    }
  }
  return 0
})
const trackTop = computed(() => {
  // 滚动条垂直偏移
  if (containerHeight.value && contentHeight.value && railHeight.value) {
    return (
      (containerScrollTop.value / (contentHeight.value - containerHeight.value)) *
      (railHeight.value - trackHeight.value)
    )
  }
  return 0
})
const verticalTrackStyle = computed(() => {
  // 垂直滚动条样式
  return {
    top: `${trackTop.value}px`,
    height: `${trackHeight.value}px`
  }
})
const trackWidth = computed(() => {
  // 横向滚动条宽度
  if (props.xScrollable && isXScroll.value) {
    if (containerWidth.value && contentWidth.value && railWidth.value) {
      const value = (railWidth.value * containerWidth.value) / contentWidth.value + 1.5 * props.size
      return Number(value.toFixed(4))
    }
  }
  return 0
})
const trackLeft = computed(() => {
  // 滚动条水平偏移
  if (containerWidth.value && contentWidth.value && railWidth.value) {
    return (
      (containerScrollLeft.value / (contentWidth.value - containerWidth.value)) * (railWidth.value - trackWidth.value)
    )
  }
  return 0
})
const horizontalTrackStyle = computed(() => {
  // 水平滚动条样式
  return {
    left: `${trackLeft.value}px`,
    width: `${trackWidth.value}px`
  }
})
useEventListener(window, 'resize', updateState)
useMutationObserver(scrollbarRef, updateState, { subtree: true, childList: true, attributes: true })
const debounceHideEvent = debounce(hideScrollbar, props.delay)
onMounted(() => {
  updateState()
})
function hideScrollbar() {
  if (!trackHover.value) {
    showTrack.value = false
  }
}
function updateScrollState() {
  containerScrollTop.value = containerRef.value.scrollTop
  containerScrollLeft.value = containerRef.value.scrollLeft
}
function updateScrollbarState() {
  containerScrollHeight.value = containerRef.value.scrollHeight
  containerScrollWidth.value = containerRef.value.scrollWidth
  containerClientHeight.value = containerRef.value.clientHeight
  containerClientWidth.value = containerRef.value.clientWidth
  containerHeight.value = containerRef.value.offsetHeight
  containerWidth.value = containerRef.value.offsetWidth
  contentHeight.value = contentRef.value.offsetHeight
  contentWidth.value = contentRef.value.offsetWidth
  railHeight.value = railVerticalRef.value.offsetHeight
  railWidth.value = railHorizontalRef.value.offsetWidth
}
function updateState() {
  updateScrollState()
  updateScrollbarState()
}
function onScroll(e: Event) {
  if (autoShowTrack.value) {
    showTrack.value = true
    if (!trackXPressed.value && !trackYPressed.value) {
      debounceHideEvent()
    }
  }
  emit('scroll', e)
  updateScrollState()
}
function onMouseEnter() {
  if (trackXPressed.value || trackYPressed.value) {
    mouseLeave.value = false
  } else {
    if (!autoShowTrack.value) {
      showTrack.value = true
    }
  }
}
function onMouseLeave() {
  if (trackXPressed.value || trackYPressed.value) {
    mouseLeave.value = true
  } else {
    if (!autoShowTrack.value) {
      showTrack.value = false
    }
  }
}
function onEnterTrack() {
  trackHover.value = true
}
function onLeaveTrack() {
  if (trackXPressed.value || trackYPressed.value) {
    trackLeave.value = true
  } else {
    trackHover.value = false
    debounceHideEvent()
  }
}
function onTrackVerticalMouseDown(e: MouseEvent) {
  trackYPressed.value = true
  memoYTop.value = containerScrollTop.value
  memoMouseY.value = e.clientY
  window.onmousemove = (e: MouseEvent) => {
    const diffY = e.clientY - memoMouseY.value
    const dScrollTop =
      (diffY * (contentHeight.value - containerHeight.value)) / (containerHeight.value - trackHeight.value)
    const toScrollTopUpperBound = contentHeight.value - containerHeight.value
    let toScrollTop = memoYTop.value + dScrollTop
    toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
    toScrollTop = Math.max(toScrollTop, 0)
    containerRef.value.scrollTop = toScrollTop
  }
  window.onmouseup = () => {
    window.onmousemove = null
    trackYPressed.value = false
    if (props.trigger === 'hover' && mouseLeave.value) {
      showTrack.value = false
      mouseLeave.value = false
    }
    if (autoShowTrack.value && trackLeave.value) {
      trackLeave.value = false
      trackHover.value = false
      debounceHideEvent()
    }
  }
}
function onTrackHorizontalMouseDown(e: MouseEvent) {
  trackXPressed.value = true
  memoXLeft.value = containerScrollLeft.value
  memoMouseX.value = e.clientX
  window.onmousemove = (e: MouseEvent) => {
    const diffX = e.clientX - memoMouseX.value
    const dScrollLeft =
      (diffX * (contentWidth.value - containerWidth.value)) / (containerWidth.value - trackWidth.value)
    const toScrollLeftUpperBound = contentWidth.value - containerWidth.value
    let toScrollLeft = memoXLeft.value + dScrollLeft
    toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
    toScrollLeft = Math.max(toScrollLeft, 0)
    containerRef.value.scrollLeft = toScrollLeft
  }
  window.onmouseup = () => {
    window.onmousemove = null
    trackXPressed.value = false
    if (props.trigger === 'hover' && mouseLeave.value) {
      showTrack.value = false
      mouseLeave.value = false
    }
    if (autoShowTrack.value && trackLeave.value) {
      trackLeave.value = false
      trackHover.value = false
      debounceHideEvent()
    }
  }
}
function scrollTo(...args: any[]) {
  containerRef.value?.scrollTo(...args)
}
function scrollBy(...args: any[]) {
  containerRef.value?.scrollBy(...args)
}
function getScrollData() {
  return {
    scrollWidth: containerScrollWidth.value,
    clientWidth: containerClientWidth.value
  }
}
defineExpose({
  scrollTo,
  scrollBy,
  getScrollData
})
</script>
<template>
  <div
    ref="scrollbarRef"
    class="m-scrollbar"
    :style="`--scrollbar-size: ${size}px;`"
    @mouseenter="isScroll && trigger === 'hover' ? onMouseEnter() : () => false"
    @mouseleave="isScroll && trigger === 'hover' ? onMouseLeave() : () => false"
  >
    <div ref="containerRef" class="scrollbar-container" @scroll="onScroll">
      <div
        ref="contentRef"
        class="scrollbar-content"
        :class="contentClass"
        :style="[xScrollable ? { ...horizontalContentStyle, ...contentStyle } : contentStyle]"
      >
        <slot></slot>
      </div>
    </div>
    <div ref="railVerticalRef" class="scrollbar-rail rail-vertical" :class="[`rail-vertical-${yPlacement}`]">
      <div
        class="scrollbar-track"
        :class="{ 'track-visible': trigger === 'none' || showTrack }"
        :style="verticalTrackStyle"
        @mouseenter="autoShowTrack ? onEnterTrack() : () => false"
        @mouseleave="autoShowTrack ? onLeaveTrack() : () => false"
        @mousedown.prevent.stop="onTrackVerticalMouseDown"
      ></div>
    </div>
    <div
      ref="railHorizontalRef"
      v-show="xScrollable"
      class="scrollbar-rail rail-horizontal"
      :class="[`rail-horizontal-${xPlacement}`]"
    >
      <div
        class="scrollbar-track"
        :class="{ 'track-visible': trigger === 'none' || showTrack }"
        :style="horizontalTrackStyle"
        @mouseenter="autoShowTrack ? onEnterTrack() : () => false"
        @mouseleave="autoShowTrack ? onLeaveTrack() : () => false"
        @mousedown.prevent.stop="onTrackHorizontalMouseDown"
      ></div>
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
  .scrollbar-container {
    width: 100%;
    overflow: scroll;
    height: 100%;
    min-height: inherit;
    max-height: inherit;
    scrollbar-width: none;
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track-piece,
    &::-webkit-scrollbar-thumb {
      width: 0;
      height: 0;
      display: none;
    }
    .scrollbar-content {
      box-sizing: border-box;
      min-width: 100%;
    }
  }
  .scrollbar-rail {
    position: absolute;
    pointer-events: none;
    user-select: none;
    background: transparent;
    -webkit-user-select: none;
    .scrollbar-track {
      z-index: 9;
      position: absolute;
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      background-color: rgba(0, 0, 0, 0.25);
      transition:
        background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
    .track-visible {
      opacity: 1;
      pointer-events: all;
    }
  }
  .rail-vertical {
    width: var(--scrollbar-size);
    .scrollbar-track {
      width: var(--scrollbar-size);
      border-radius: var(--scrollbar-size);
      bottom: 0;
    }
  }
  .rail-vertical-left {
    inset: 2px auto 2px 4px;
  }
  .rail-vertical-right {
    inset: 2px 4px 2px auto;
  }
  .rail-horizontal {
    height: var(--scrollbar-size);
    .scrollbar-track {
      height: var(--scrollbar-size);
      border-radius: var(--scrollbar-size);
      right: 0;
    }
  }
  .rail-horizontal-top {
    inset: 4px 2px auto 2px;
  }
  .rail-horizontal-bottom {
    inset: auto 2px 4px 2px;
  }
  .scrollbar-thumb {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
