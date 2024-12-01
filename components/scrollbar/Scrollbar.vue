<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { debounce, useResizeObserver, useScroll } from 'components/utils'
export interface Props {
  contentClass?: string // 内容 div 的类名
  contentStyle?: CSSProperties // 内容 div 的样式
  size?: number // 滚动条的大小，单位 px
  trigger?: 'hover' | 'none' // 显示滚动条的时机，'none' 表示一直显示
  autoHide?: boolean // 是否自动隐藏滚动条，仅当 trigger: 'hover' 时生效；为 true 时表示鼠标在滚动区域且不滚动时自动隐藏，滚动时自动显示；为 false 时表示鼠标在滚动区域时始终显示，无论是否在滚动
  delay?: number // 滚动条自动隐藏的延迟时间，单位 ms
  xScrollable?: boolean // 是否使用横向滚动
  yScrollable?: boolean // 是否使用纵向滚动
  xPlacement?: 'top' | 'bottom' // 横向滚动时滚动条的位置
  yPlacement?: 'left' | 'right' // 纵向滚动时滚动条的位置
}
const props = withDefaults(defineProps<Props>(), {
  contentClass: undefined,
  contentStyle: () => ({}),
  size: 5,
  trigger: 'hover',
  autoHide: true,
  delay: 500,
  xScrollable: false,
  yScrollable: true,
  xPlacement: 'bottom',
  yPlacement: 'right'
})
const containerRef = ref() // 滚动容器 DOM 引用
const contentRef = ref() // 滚动内容 DOM 引用
const railVerticalRef = ref() // 垂直滚动条 DOM 引用
const railHorizontalRef = ref() // 水平滚动条 DOM 引用
const showYTrack = ref(false) // 是否显示垂直滚动条
const showXTrack = ref(false) // 是否显示横向滚动条
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
const mouseEnter = ref(false) // 鼠标是否在滚动区域内
const trackYPressed = ref(false) // 垂直滚动条是否被按下
const trackXPressed = ref(false) // 水平滚动条是否被按下
const mousePressedLeave = ref(false) // 鼠标在按下滚动条并拖动时是否离开滚动区域
const memoYTop = ref<number>(0) // 鼠标选中并按下垂直滚动条时已滚动的垂直距离
const memoXLeft = ref<number>(0) // 鼠标选中并按下水平滚动条时已滚动的水平距离
const memoMouseY = ref<number>(0) // 鼠标选中并按下垂直滚动条时的鼠标 Y 坐标
const memoMouseX = ref<number>(0) // 鼠标选中并按下水平滚动条时的鼠标 X 坐标
const horizontalContentStyle = { width: 'fit-content' } // 水平滚动时内容区域默认样式
const yTrackHover = ref(false) // 鼠标是否在垂直滚动条上
const xTrackHover = ref(false) // 鼠标是否在水平滚动条上
const emits = defineEmits(['scroll', 'scrollend'])
const autoShowTrack = computed(() => {
  return props.trigger === 'hover' && props.autoHide
})
const notAutoShowTrack = computed(() => {
  return props.trigger === 'hover' && !props.autoHide
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
  if (containerScrollHeight.value || containerScrollWidth.value) {
    return (props.yScrollable && isYScroll.value) || (props.xScrollable && isXScroll.value)
  }
  return true
})
const trackHeight = computed(() => {
  // 垂直滚动条高度
  if (props.yScrollable && isYScroll.value) {
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
onMounted(() => {
  updateState()
})
const {
  left: scrollingLeft,
  right: scrollingRight,
  top: scrollingTop,
  bottom: scrollingBottom
} = useScroll(containerRef)
useResizeObserver([containerRef, contentRef], updateState)
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
const debounceYScrollEnd = debounce(yScrollEnd, 100)
const debounceXScrollEnd = debounce(xScrollEnd, 100)
const debounceHideYScrollbar = debounce(hideYScrollbar, 100 + props.delay)
const debounceHideXScrollbar = debounce(hideXScrollbar, 100 + props.delay)
function yScrollEnd(e: Event, direction: 'left' | 'right' | 'top' | 'bottom') {
  emits('scrollend', e, direction)
}
function xScrollEnd(e: Event, direction: 'left' | 'right' | 'top' | 'bottom') {
  emits('scrollend', e, direction)
}
function hideYScrollbar() {
  if (autoShowTrack.value && !yTrackHover.value) {
    showYTrack.value = false
  }
  if (notAutoShowTrack.value && !mouseEnter.value) {
    showYTrack.value = false
  }
}
function hideXScrollbar() {
  if (autoShowTrack.value && !xTrackHover.value) {
    showXTrack.value = false
  }
  if (notAutoShowTrack.value && !mouseEnter.value) {
    showXTrack.value = false
  }
}
function onScroll(e: Event) {
  if (scrollingLeft.value || scrollingRight.value) {
    let direction: string = ''
    if (scrollingLeft.value) {
      direction = 'left'
    }
    if (scrollingRight.value) {
      direction = 'right'
    }
    emits('scroll', e, direction)
    if (autoShowTrack.value) {
      showXTrack.value = true
      if (!trackXPressed.value) {
        debounceXScrollEnd(e, direction)
        debounceHideXScrollbar()
      }
    }
  }
  if (scrollingTop.value || scrollingBottom.value) {
    let direction: string = ''
    if (scrollingTop.value) {
      direction = 'top'
    }
    if (scrollingBottom.value) {
      direction = 'bottom'
    }
    emits('scroll', e, direction)
    if (autoShowTrack.value) {
      showYTrack.value = true
      if (!trackYPressed.value) {
        debounceYScrollEnd(e, direction)
        debounceHideYScrollbar()
      }
    }
  }
  updateScrollState()
}
function onMouseEnter() {
  mouseEnter.value = true
  if (trackXPressed.value || trackYPressed.value) {
    mousePressedLeave.value = false
  } else {
    if (!autoShowTrack.value) {
      showXTrack.value = true
      showYTrack.value = true
    }
  }
}
function onMouseLeave() {
  mouseEnter.value = false
  if (trackXPressed.value || trackYPressed.value) {
    mousePressedLeave.value = true
  } else {
    if (!autoShowTrack.value) {
      if (showXTrack.value) {
        debounceHideXScrollbar()
      }
      if (showYTrack.value) {
        debounceHideYScrollbar()
      }
    }
  }
}
function onEnterYTrack() {
  yTrackHover.value = true
}
function onLeaveYTrack() {
  yTrackHover.value = false
  if (autoShowTrack.value) {
    debounceHideYScrollbar()
  }
}
function onEnterXTrack() {
  xTrackHover.value = true
}
function onLeaveXTrack() {
  xTrackHover.value = false
  if (autoShowTrack.value) {
    debounceHideXScrollbar()
  }
}
function onYTrackMouseDown(e: MouseEvent) {
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
    if (autoShowTrack.value && !yTrackHover.value) {
      debounceHideYScrollbar()
    } else if (notAutoShowTrack.value && mousePressedLeave.value) {
      mousePressedLeave.value = false
      debounceHideYScrollbar()
    }
  }
}
function onXTrackMouseDown(e: MouseEvent) {
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
    if (autoShowTrack.value && !xTrackHover.value) {
      debounceHideXScrollbar()
    } else if (notAutoShowTrack.value && mousePressedLeave.value) {
      mousePressedLeave.value = false
      debounceHideXScrollbar()
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
    scrollHeight: containerScrollHeight.value,
    clientWidth: containerClientWidth.value,
    clientHeight: containerClientHeight.value
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
    class="m-scrollbar"
    :style="`
      --scrollbar-width: ${size}px;
      --scrollbar-height: ${size}px;
      --scrollbar-border-radius: ${size}px;
      --scrollbar-color: rgba(0, 0, 0, 0.25);
      --scrollbar-color-hover: rgba(0, 0, 0, 0.4);
      --scrollbar-rail-horizontal-top: 4px 2px auto 2px;
      --scrollbar-rail-horizontal-bottom: auto 2px 4px 2px;
      --scrollbar-rail-vertical-right: 2px 4px 2px auto;
      --scrollbar-rail-vertical-left: 2px auto 2px 4px;
      --scrollbar-rail-color: transparent;
    `"
    @mouseenter="isScroll && trigger === 'hover' ? onMouseEnter() : () => false"
    @mouseleave="isScroll && trigger === 'hover' ? onMouseLeave() : () => false"
  >
    <div ref="containerRef" class="scrollbar-container" :class="{ 'container-scroll': isScroll }" @scroll="onScroll">
      <div
        ref="contentRef"
        class="scrollbar-content"
        :class="contentClass"
        :style="[xScrollable ? { ...horizontalContentStyle, ...contentStyle } : contentStyle]"
      >
        <slot></slot>
      </div>
    </div>
    <div
      v-show="yScrollable"
      ref="railVerticalRef"
      class="scrollbar-rail rail-vertical"
      :class="`rail-vertical-${yPlacement}`"
    >
      <div
        class="scrollbar-track"
        :class="{ 'track-visible': trigger === 'none' || showYTrack }"
        :style="verticalTrackStyle"
        @mouseenter="autoShowTrack ? onEnterYTrack() : () => false"
        @mouseleave="autoShowTrack ? onLeaveYTrack() : () => false"
        @mousedown.prevent.stop="onYTrackMouseDown"
      ></div>
    </div>
    <div
      v-show="xScrollable"
      ref="railHorizontalRef"
      class="scrollbar-rail rail-horizontal"
      :class="`rail-horizontal-${xPlacement}`"
    >
      <div
        class="scrollbar-track"
        :class="{ 'track-visible': trigger === 'none' || showXTrack }"
        :style="horizontalTrackStyle"
        @mouseenter="autoShowTrack ? onEnterXTrack() : () => false"
        @mouseleave="autoShowTrack ? onLeaveXTrack() : () => false"
        @mousedown.prevent.stop="onXTrackMouseDown"
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
  .container-scroll {
    overflow: scroll;
  }
  .scrollbar-rail {
    position: absolute;
    pointer-events: none;
    user-select: none;
    background: var(--scrollbar-rail-color);
    -webkit-user-select: none;
    .scrollbar-track {
      z-index: 9;
      position: absolute;
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      background-color: var(--scrollbar-color);
      transition:
        background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        background-color: var(--scrollbar-color-hover);
      }
    }
    .track-visible {
      opacity: 1;
      pointer-events: all;
    }
  }
  .rail-vertical {
    width: var(--scrollbar-width);
    .scrollbar-track {
      width: var(--scrollbar-width);
      border-radius: var(--scrollbar-border-radius);
      bottom: 0;
    }
  }
  .rail-vertical-left {
    inset: var(--scrollbar-rail-vertical-left);
  }
  .rail-vertical-right {
    inset: var(--scrollbar-rail-vertical-right);
  }
  .rail-horizontal {
    height: var(--scrollbar-height);
    .scrollbar-track {
      height: var(--scrollbar-height);
      border-radius: var(--scrollbar-border-radius);
      right: 0;
    }
  }
  .rail-horizontal-top {
    inset: var(--scrollbar-rail-horizontal-top);
  }
  .rail-horizontal-bottom {
    inset: var(--scrollbar-rail-horizontal-bottom);
  }
  .scrollbar-thumb {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
