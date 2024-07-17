<script lang="ts">
/*
  一个根节点时，禁用组件根节点自动继承 attribute，必须使用这种写法！然后在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
  多个根节点时，只需在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
*/
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { useEventListener, useMutationObserver } from '../utils'
interface Props {
  contentStyle?: CSSProperties // 内容样式
  size?: number // 滚动条的大小，单位 px
  trigger?: 'hover' | 'none' // 显示滚动条的时机，'none' 表示一直显示
  horizontal?: boolean // 是否使用横向滚动
}
const props = withDefaults(defineProps<Props>(), {
  contentStyle: () => ({}),
  size: 5,
  trigger: 'hover',
  horizontal: false
})
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
const emit = defineEmits(['scroll'])
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
  return isYScroll.value || (props.horizontal && isXScroll.value)
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
const trackWidth = computed(() => {
  // 横向滚动条宽度
  if (props.horizontal && isXScroll.value) {
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
onMounted(() => {
  updateState()
})
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
useEventListener(window, 'resize', updateState)
const options = { childList: true, attributes: true, subtree: true }
useMutationObserver(containerRef, updateState, options)
function onScroll(e: Event) {
  emit('scroll', e)
  updateScrollState()
}
function onMouseEnter() {
  if (props.horizontal) {
    if (trackXPressed.value) {
      mouseLeave.value = false
    } else {
      showTrack.value = true
    }
  } else {
    if (trackYPressed.value) {
      mouseLeave.value = false
    } else {
      showTrack.value = true
    }
  }
}
function onMouseLeave() {
  if (props.horizontal) {
    if (trackXPressed.value) {
      mouseLeave.value = true
    } else {
      showTrack.value = false
    }
  } else {
    if (trackYPressed.value) {
      mouseLeave.value = true
    } else {
      showTrack.value = false
    }
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
  }
}
function scrollTo(...args: any[]) {
  containerRef.value?.scrollTo(...args)
}
function scrollBy(...args: any[]) {
  containerRef.value?.scrollBy(...args)
}

defineExpose({
  scrollTo,
  scrollBy
})
</script>
<template>
  <div
    class="m-scrollbar"
    :style="`--scrollbar-size: ${size}px;`"
    @mouseenter="isScroll && trigger === 'hover' ? onMouseEnter() : () => false"
    @mouseleave="isScroll && trigger === 'hover' ? onMouseLeave() : () => false"
  >
    <div ref="containerRef" class="m-scrollbar-container" @scroll="onScroll" v-bind="$attrs">
      <div
        ref="contentRef"
        class="m-scrollbar-content"
        :style="[horizontal ? { ...horizontalContentStyle, ...contentStyle } : contentStyle]"
      >
        <slot></slot>
      </div>
    </div>
    <div ref="railVerticalRef" class="m-scrollbar-rail rail-vertical">
      <Transition name="fade">
        <div
          v-if="trigger === 'none' || showTrack"
          class="m-scrollbar-track"
          :style="`top: ${trackTop}px; height: ${trackHeight}px;`"
          @mousedown.prevent.stop="onTrackVerticalMouseDown"
        ></div>
      </Transition>
    </div>
    <div ref="railHorizontalRef" v-show="horizontal" class="m-scrollbar-rail rail-horizontal">
      <Transition name="fade">
        <div
          v-if="trigger === 'none' || showTrack"
          class="m-scrollbar-track"
          :style="`left: ${trackLeft}px; width: ${trackWidth}px;`"
          @mousedown.prevent.stop="onTrackHorizontalMouseDown"
        ></div>
      </Transition>
    </div>
  </div>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
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
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track-piece,
    &::-webkit-scrollbar-thumb {
      width: 0;
      height: 0;
      display: none;
    }
    .m-scrollbar-content {
      box-sizing: border-box;
      min-width: 100%;
    }
  }
  .m-scrollbar-rail {
    position: absolute;
    pointer-events: none;
    user-select: none;
    background: transparent;
    -webkit-user-select: none;
    .m-scrollbar-track {
      z-index: 1;
      position: absolute;
      cursor: pointer;
      pointer-events: all;
      background-color: rgba(0, 0, 0, 0.25);
      transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .rail-vertical {
    inset: 2px 4px 2px auto;
    width: var(--scrollbar-size);
    .m-scrollbar-track {
      width: var(--scrollbar-size);
      border-radius: var(--scrollbar-size);
      bottom: 0;
    }
  }
  .rail-horizontal {
    inset: auto 2px 4px 2px;
    height: var(--scrollbar-size);
    .m-scrollbar-track {
      height: var(--scrollbar-size);
      border-radius: var(--scrollbar-size);
      right: 0;
    }
  }
}
</style>
