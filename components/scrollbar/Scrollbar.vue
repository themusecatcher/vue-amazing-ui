<script setup lang="ts">
import { ref, computed, onMounted, onActivated, onDeactivated } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { debounce, useResizeObserver } from 'components/utils'
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
// 声明组件插槽类型
export interface ScrollbarSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  contentClass: undefined,
  contentStyle: () => ({}),
  size: 5,
  trigger: 'hover',
  autoHide: false,
  delay: 0,
  xScrollable: false,
  yScrollable: true,
  xPlacement: 'bottom',
  yPlacement: 'right'
})
defineSlots<ScrollbarSlots>()
/** 滚动方向：thumb 移动方向即内容滚动的方向 */
export type ScrollDirection = 'left' | 'right' | 'top' | 'bottom'
/** getScrollData 的返回结构（调用瞬间的真实几何数据） */
export interface ScrollbarScrollData {
  scrollTop: number
  scrollLeft: number
  scrollWidth: number
  scrollHeight: number
  clientWidth: number
  clientHeight: number
}
/** 组件实例对外暴露的能力（与 defineExpose 一致，供调用方声明模板 ref 类型） */
export interface ScrollbarExpose {
  scrollTo(options: ScrollToOptions): void
  scrollTo(left: number, top: number): void
  scrollBy(options: ScrollToOptions): void
  scrollBy(left: number, top: number): void
  /** 实时读取滚动容器的滚动位置与尺寸 */
  getScrollData(): ScrollbarScrollData
  /** 内部滚动容器元素，未挂载时为 null */
  scrollElement: HTMLElement | null
}
interface ScrollbarEmits {
  scroll: [e: Event, direction: ScrollDirection] // 滚动中；横纵同帧变化时各派发一次
  scrollend: [e: Event, direction: ScrollDirection] // 某一方向滚动结束
}
const emits = defineEmits<ScrollbarEmits>()
// DOM 引用
const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const verticalRailRef = ref<HTMLElement | null>(null)
const horizontalRailRef = ref<HTMLElement | null>(null)
// 渲染状态：thumb 是否可见（trigger 为 none 时恒显，此值不参与判断）
const showVerticalTrack = ref(false)
const showHorizontalTrack = ref(false)
// 量测结果：thumb 的大小与偏移全部由这些尺寸换算得出
const containerScrollHeight = ref(0) // scrollHeight：内容总高度
const containerScrollWidth = ref(0) // scrollWidth：内容总宽度
const containerClientHeight = ref(0) // clientHeight：可视高度（不含边框）
const containerClientWidth = ref(0) // clientWidth：可视宽度（不含边框）
const containerOffsetHeight = ref(0) // offsetHeight：容器渲染高度
const containerOffsetWidth = ref(0) // offsetWidth：容器渲染宽度
const contentOffsetHeight = ref(0) // 内容渲染高度
const contentOffsetWidth = ref(0) // 内容渲染宽度
const verticalRailHeight = ref(0) // 垂直轨道高度，即 thumb 的可拖拽范围
const horizontalRailWidth = ref(0) // 水平轨道宽度，即 thumb 的可拖拽范围
const containerScrollTop = ref(0) // scrollTop：垂直滚动距离
const containerScrollLeft = ref(0) // scrollLeft：水平滚动距离
// 交互状态：只服务于事件逻辑、不参与渲染，故不放进响应式系统
let isMouseInside = false // 指针是否在滚动区域内
let isMouseLeftWhilePressed = false // 拖拽过程中指针是否离开过滚动区域
let isVerticalTrackPressed = false // 垂直 thumb 是否被按住
let isHorizontalTrackPressed = false // 水平 thumb 是否被按住
let isVerticalTrackHovered = false // 指针是否停在垂直 thumb 上
let isHorizontalTrackHovered = false // 指针是否停在水平 thumb 上
let dragStartScrollTop = 0 // 开始拖拽时的滚动位置（垂直）
let dragStartScrollLeft = 0 // 开始拖拽时的滚动位置（水平）
let dragStartPointerY = 0 // 开始拖拽时的指针 Y 坐标
let dragStartPointerX = 0 // 开始拖拽时的指针 X 坐标
// 横向滚动时内容需按 fit-content 撑开，否则会被容器宽度截断而滚不动
const fitContentStyle = { width: 'fit-content' }
// trigger 为 hover 时滚动条随滚动显隐，为 none 时恒显
const autoShowTrack = computed(() => {
  return props.trigger === 'hover'
})
// 是否存在垂直滚动（内容高度超出可视高度）
const hasVerticalScroll = computed(() => {
  return containerScrollHeight.value > containerClientHeight.value
})
// 是否存在水平滚动（内容宽度超出可视宽度）
const hasHorizontalScroll = computed(() => {
  return containerScrollWidth.value > containerClientWidth.value
})
// 任一方向是否可滚动：尺寸尚未测出时先按可滚动处理，避免首帧被判定为不可滚动而拿不到滚动事件
const hasScroll = computed(() => {
  if (!containerScrollHeight.value && !containerScrollWidth.value) return true
  return (props.yScrollable && hasVerticalScroll.value) || (props.xScrollable && hasHorizontalScroll.value)
})
// 垂直 thumb 高度：可视高度与内容高度之比 × 轨道高度，并按滚动条尺寸补足最小可拖拽高度；
// 上限取容器高度 —— 内容只比容器高一点时比例会接近 1，不夹取会让 thumb 比轨道还长
const verticalTrackHeight = computed(() => {
  if (!props.yScrollable || !hasVerticalScroll.value) return 0
  if (!containerOffsetHeight.value || !contentOffsetHeight.value || !verticalRailHeight.value) return 0
  const value = Math.min(
    containerOffsetHeight.value,
    (verticalRailHeight.value * containerOffsetHeight.value) / contentOffsetHeight.value + 1.5 * props.size
  )
  return Number(value.toFixed(4))
})
// 垂直 thumb 偏移：可滚距离与可拖距离同比例换算（无滚动余量时为 0，避免除零得到 NaN）
const verticalTrackTop = computed(() => {
  const scrollRange = contentOffsetHeight.value - containerOffsetHeight.value
  if (scrollRange <= 0 || !verticalRailHeight.value) return 0
  return (containerScrollTop.value / scrollRange) * (verticalRailHeight.value - verticalTrackHeight.value)
})
const verticalTrackStyle = computed(() => {
  return {
    top: `${verticalTrackTop.value}px`,
    height: `${verticalTrackHeight.value}px`
  }
})
// 水平 thumb 宽度：口径与垂直完全一致
const horizontalTrackWidth = computed(() => {
  if (!props.xScrollable || !hasHorizontalScroll.value) return 0
  if (!containerOffsetWidth.value || !contentOffsetWidth.value || !horizontalRailWidth.value) return 0
  const value = Math.min(
    containerOffsetWidth.value,
    (horizontalRailWidth.value * containerOffsetWidth.value) / contentOffsetWidth.value + 1.5 * props.size
  )
  return Number(value.toFixed(4))
})
// 水平 thumb 偏移：同垂直口径
const horizontalTrackLeft = computed(() => {
  const scrollRange = contentOffsetWidth.value - containerOffsetWidth.value
  if (scrollRange <= 0 || !horizontalRailWidth.value) return 0
  return (containerScrollLeft.value / scrollRange) * (horizontalRailWidth.value - horizontalTrackWidth.value)
})
const horizontalTrackStyle = computed(() => {
  return {
    left: `${horizontalTrackLeft.value}px`,
    width: `${horizontalTrackWidth.value}px`
  }
})
onMounted(() => {
  updateState()
})
// 上一条 scroll 事件对应的滚动位置，用于判定本次滚动方向；只由 onScroll 推进，
// 其它地方改写滚动位置（内容夹取、激活恢复）会由随后派发的 scroll 事件自然接入，避免漏派发一次
let lastScrollTop = 0
let lastScrollLeft = 0
let isDeactivated = false // 是否被 <KeepAlive> 失活（失活期间 DOM 尺寸为 0，测量会把滚动条算成 0 尺寸）
let activatedOnce = false // 首次激活与 onMounted 重叠，跳过恢复
useResizeObserver([containerRef, contentRef], updateState)
/**
 * 被 <KeepAlive> 切回来时恢复滚动位置：
 * 失活期间 DOM 被移出文档，scrollTop / scrollLeft 归零，只能按失活前记录的位置写回
 */
onActivated(() => {
  isDeactivated = false
  if (!activatedOnce) {
    activatedOnce = true
    return
  }
  if (!containerRef.value) return
  containerRef.value.scrollTop = containerScrollTop.value
  containerRef.value.scrollLeft = containerScrollLeft.value
  updateState()
})
onDeactivated(() => {
  isDeactivated = true
})
// 同步滚动位置（thumb 偏移的渲染依据）
function updateScrollState(): void {
  if (!containerRef.value) return
  containerScrollTop.value = containerRef.value.scrollTop
  containerScrollLeft.value = containerRef.value.scrollLeft
}
// 同步容器 / 内容 / 轨道的尺寸（thumb 大小与显隐的渲染依据）
function updateScrollbarState(): void {
  if (!containerRef.value || !contentRef.value || !verticalRailRef.value || !horizontalRailRef.value) return
  containerScrollHeight.value = containerRef.value.scrollHeight
  containerScrollWidth.value = containerRef.value.scrollWidth
  containerClientHeight.value = containerRef.value.clientHeight
  containerClientWidth.value = containerRef.value.clientWidth
  containerOffsetHeight.value = containerRef.value.offsetHeight
  containerOffsetWidth.value = containerRef.value.offsetWidth
  contentOffsetHeight.value = contentRef.value.offsetHeight
  contentOffsetWidth.value = contentRef.value.offsetWidth
  verticalRailHeight.value = verticalRailRef.value.offsetHeight
  horizontalRailWidth.value = horizontalRailRef.value.offsetWidth
}
// 全量重测：挂载、尺寸变化、鼠标进入、拖拽结束、激活恢复后调用
function updateState(): void {
  if (isDeactivated) return
  updateScrollState()
  updateScrollbarState()
}
function emitScrollEnd(e: Event, direction: ScrollDirection): void {
  emits('scrollend', e, direction)
}
const debounceVerticalScrollEnd = debounce(emitScrollEnd, 100)
const debounceHorizontalScrollEnd = debounce(emitScrollEnd, 100)
const debounceHideVerticalScrollbar = debounce(hideVerticalScrollbar, 100 + props.delay)
const debounceHideHorizontalScrollbar = debounce(hideHorizontalScrollbar, 100 + props.delay)
function hideVerticalScrollbar(): void {
  if (autoShowTrack.value) {
    if (props.autoHide && !isVerticalTrackHovered) {
      showVerticalTrack.value = false
    }
    if (!props.autoHide && !isMouseInside) {
      showVerticalTrack.value = false
    }
  }
}
function hideHorizontalScrollbar(): void {
  if (autoShowTrack.value) {
    if (props.autoHide && !isHorizontalTrackHovered) {
      showHorizontalTrack.value = false
    }
    if (!props.autoHide && !isMouseInside) {
      showHorizontalTrack.value = false
    }
  }
}
/**
 * 滚动回调：方向按「本次位置 - 上次位置」的位移判定
 *
 * 不能用别处维护的方向状态来做派发开关：拖动 thumb、instant scrollTo/scrollBy、直接写
 * scrollLeft/scrollTop 都属于程序化滚动，浏览器随后会立刻结束滚动序列并复位这类状态，
 * 依赖它就会整段丢事件，消费方（如表格表头跟随、左右阴影）便停在旧位置。
 * 按位移判定则与滚动来源无关，且方向与本次滚动真实一致；横纵同帧变化时各派发一次
 */
function onScroll(e: Event): void {
  const container = containerRef.value
  if (!container) return
  const deltaX = container.scrollLeft - lastScrollLeft
  const deltaY = container.scrollTop - lastScrollTop
  lastScrollLeft = container.scrollLeft
  lastScrollTop = container.scrollTop
  // 水平方向：scrollend 与「自动隐藏」解耦 —— 它是公共事件，不能只在 autoHide + hover 时派发，
  // 否则默认配置（autoHide 为 false）与 trigger 为 none 时永远不会触发；隐藏仍按原条件排期
  if (deltaX !== 0) {
    const direction: ScrollDirection = deltaX > 0 ? 'right' : 'left'
    emits('scroll', e, direction)
    debounceHorizontalScrollEnd(e, direction)
    if (autoShowTrack.value) {
      showHorizontalTrack.value = true
      if (!isHorizontalTrackPressed && props.autoHide) {
        debounceHideHorizontalScrollbar()
      }
    }
  }
  // 垂直方向：同上
  if (deltaY !== 0) {
    const direction: ScrollDirection = deltaY > 0 ? 'bottom' : 'top'
    emits('scroll', e, direction)
    debounceVerticalScrollEnd(e, direction)
    if (autoShowTrack.value) {
      showVerticalTrack.value = true
      if (!isVerticalTrackPressed && props.autoHide) {
        debounceHideVerticalScrollbar()
      }
    }
  }
  updateScrollState()
}
// 指针进入滚动区域：hover 模式才跟踪；非 autoHide 时直接常显 thumb
function onMouseEnter(): void {
  if (!hasScroll.value || props.trigger !== 'hover') return
  isMouseInside = true
  if (isHorizontalTrackPressed || isVerticalTrackPressed) {
    isMouseLeftWhilePressed = false
  } else if (!props.autoHide) {
    showHorizontalTrack.value = true
    showVerticalTrack.value = true
  }
  // 进入时重测一次：隐藏期间尺寸会变化，内容也可能异步撑开（图片、字体），
  // 尺寸观察器会滞后一帧，thumb 比例会短暂失真
  updateState()
}
function onMouseLeave(): void {
  if (!hasScroll.value || props.trigger !== 'hover') return
  isMouseInside = false
  if (isHorizontalTrackPressed || isVerticalTrackPressed) {
    isMouseLeftWhilePressed = true
    return
  }
  if (props.autoHide) return
  if (showHorizontalTrack.value) {
    debounceHideHorizontalScrollbar()
  }
  if (showVerticalTrack.value) {
    debounceHideVerticalScrollbar()
  }
}
// 指针进入 / 离开 thumb：仅 hover + autoHide 时需要靠悬停保持显示
function onEnterVerticalTrack(): void {
  if (!autoShowTrack.value || !props.autoHide) return
  isVerticalTrackHovered = true
}
function onLeaveVerticalTrack(): void {
  if (!autoShowTrack.value || !props.autoHide) return
  isVerticalTrackHovered = false
  if (!isVerticalTrackPressed) {
    debounceHideVerticalScrollbar()
  }
}
function onEnterHorizontalTrack(): void {
  if (!autoShowTrack.value || !props.autoHide) return
  isHorizontalTrackHovered = true
}
function onLeaveHorizontalTrack(): void {
  if (!autoShowTrack.value || !props.autoHide) return
  isHorizontalTrackHovered = false
  if (!isHorizontalTrackPressed) {
    debounceHideHorizontalScrollbar()
  }
}
function handleVerticalTrackPointerDown(e: PointerEvent): void {
  isVerticalTrackPressed = true
  dragStartScrollTop = containerScrollTop.value
  dragStartPointerY = e.clientY
  // 捕获指针，确保即使移出元素也能继续跟踪
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  document.addEventListener('pointermove', handleVerticalTrackPointerMove)
  document.addEventListener('pointerup', handleVerticalTrackPointerUp)
  document.addEventListener('pointercancel', handleVerticalTrackPointerUp)
  handleVerticalTrackPointerMove(e)
}
function handleVerticalTrackPointerMove(e: PointerEvent): void {
  // 可滚距离与可拖距离同比例换算：thumb 与轨道等高时没有可拖距离，直接忽略避免除零
  const scrollRange = contentOffsetHeight.value - containerOffsetHeight.value
  const dragRange = containerOffsetHeight.value - verticalTrackHeight.value
  if (scrollRange <= 0 || dragRange <= 0) return
  const dScrollTop = ((e.clientY - dragStartPointerY) * scrollRange) / dragRange
  const toScrollTop = Math.min(Math.max(dragStartScrollTop + dScrollTop, 0), scrollRange)
  if (containerRef.value) {
    containerRef.value.scrollTop = toScrollTop
  }
}
function handleVerticalTrackPointerUp(): void {
  isVerticalTrackPressed = false
  if (autoShowTrack.value && props.autoHide && !isVerticalTrackHovered) {
    debounceHideVerticalScrollbar()
  } else if (autoShowTrack.value && !props.autoHide && isMouseLeftWhilePressed) {
    isMouseLeftWhilePressed = false
    debounceHideVerticalScrollbar()
  }
  document.removeEventListener('pointermove', handleVerticalTrackPointerMove)
  document.removeEventListener('pointerup', handleVerticalTrackPointerUp)
  document.removeEventListener('pointercancel', handleVerticalTrackPointerUp)
  // 拖拽结束重测一次：拖动期间内容变化会让容器夹取滚动位置，缓存值与真实位置需要对齐
  updateState()
}
function handleHorizontalTrackPointerDown(e: PointerEvent): void {
  isHorizontalTrackPressed = true
  dragStartScrollLeft = containerScrollLeft.value
  dragStartPointerX = e.clientX
  // 捕获指针，确保即使移出元素也能继续跟踪
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  document.addEventListener('pointermove', handleHorizontalTrackPointerMove)
  document.addEventListener('pointerup', handleHorizontalTrackPointerUp)
  document.addEventListener('pointercancel', handleHorizontalTrackPointerUp)
  handleHorizontalTrackPointerMove(e)
}
function handleHorizontalTrackPointerMove(e: PointerEvent): void {
  // 同垂直口径：没有可滚 / 可拖距离时直接忽略
  const scrollRange = contentOffsetWidth.value - containerOffsetWidth.value
  const dragRange = containerOffsetWidth.value - horizontalTrackWidth.value
  if (scrollRange <= 0 || dragRange <= 0) return
  const dScrollLeft = ((e.clientX - dragStartPointerX) * scrollRange) / dragRange
  const toScrollLeft = Math.min(Math.max(dragStartScrollLeft + dScrollLeft, 0), scrollRange)
  if (containerRef.value) {
    containerRef.value.scrollLeft = toScrollLeft
  }
}
function handleHorizontalTrackPointerUp(): void {
  isHorizontalTrackPressed = false
  if (autoShowTrack.value && props.autoHide && !isHorizontalTrackHovered) {
    debounceHideHorizontalScrollbar()
  } else if (autoShowTrack.value && !props.autoHide && isMouseLeftWhilePressed) {
    isMouseLeftWhilePressed = false
    debounceHideHorizontalScrollbar()
  }
  document.removeEventListener('pointermove', handleHorizontalTrackPointerMove)
  document.removeEventListener('pointerup', handleHorizontalTrackPointerUp)
  document.removeEventListener('pointercancel', handleHorizontalTrackPointerUp)
  // 拖拽结束重测一次：拖动期间内容变化会让容器夹取滚动位置，缓存值与真实位置需要对齐
  updateState()
}
/** 滚动到指定位置：支持 (options) 与 (left, top) 两种原生写法 */
function scrollTo(options: ScrollToOptions): void
function scrollTo(left: number, top: number): void
function scrollTo(optionsOrLeft: ScrollToOptions | number, top?: number): void {
  const container = containerRef.value
  if (!container) return
  if (typeof optionsOrLeft === 'number') {
    container.scrollTo(optionsOrLeft, top ?? 0)
    return
  }
  container.scrollTo(optionsOrLeft)
}
/** 滚动一段距离：入参同 scrollTo */
function scrollBy(options: ScrollToOptions): void
function scrollBy(left: number, top: number): void
function scrollBy(optionsOrLeft: ScrollToOptions | number, top?: number): void {
  const container = containerRef.value
  if (!container) return
  if (typeof optionsOrLeft === 'number') {
    container.scrollBy(optionsOrLeft, top ?? 0)
    return
  }
  container.scrollBy(optionsOrLeft)
}
/**
 * 读取滚动数据：直接读容器的实时几何值
 *
 * 不返回内部缓存的量测结果 —— 缓存在本组件的尺寸观察回调里更新，调用方自己的观察回调
 * 与本组件的回调先后顺序不确定，读缓存会拿到上一帧的尺寸；实时读取只有一次布局读取的代价，
 * 而它的调用场景（挂载、尺寸变化）本就处在需要最新值的时机
 */
function getScrollData(): ScrollbarScrollData {
  const container = containerRef.value
  if (!container) {
    return { scrollTop: 0, scrollLeft: 0, scrollWidth: 0, scrollHeight: 0, clientWidth: 0, clientHeight: 0 }
  }
  return {
    scrollTop: container.scrollTop,
    scrollLeft: container.scrollLeft,
    scrollWidth: container.scrollWidth,
    scrollHeight: container.scrollHeight,
    clientWidth: container.clientWidth,
    clientHeight: container.clientHeight
  }
}
// 暴露内部滚动容器元素，供需要指定监听目标（如 BackTop 的 listenTo）或直接操作容器的场景使用
const scrollElement = computed(() => containerRef.value)
defineExpose({
  scrollTo,
  scrollBy,
  getScrollData,
  scrollElement
})
</script>
<template>
  <div
    class="scrollbar-wrap"
    :style="`
      --scrollbar-width: ${size}px;
      --scrollbar-height: ${size}px;
      --scrollbar-border-radius: ${size}px;
      --scrollbar-rail-horizontal-top: 4px 2px auto 2px;
      --scrollbar-rail-horizontal-bottom: auto 2px 4px 2px;
      --scrollbar-rail-vertical-right: 2px 4px 2px auto;
      --scrollbar-rail-vertical-left: 2px auto 2px 4px;
      --scrollbar-rail-color: transparent;
    `"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div ref="containerRef" class="scrollbar-container" :class="{ 'container-scroll': hasScroll }" @scroll="onScroll">
      <div
        ref="contentRef"
        class="scrollbar-content"
        :class="contentClass"
        :style="[xScrollable ? { ...fitContentStyle, ...contentStyle } : contentStyle]"
      >
        <slot></slot>
      </div>
    </div>
    <div
      v-show="yScrollable"
      ref="verticalRailRef"
      class="scrollbar-rail rail-vertical"
      :class="`rail-vertical-${yPlacement}`"
    >
      <div
        class="scrollbar-track"
        :class="{ 'track-visible': trigger === 'none' || showVerticalTrack }"
        :style="verticalTrackStyle"
        @mouseenter="onEnterVerticalTrack"
        @mouseleave="onLeaveVerticalTrack"
        @pointerdown.prevent.stop="handleVerticalTrackPointerDown"
      ></div>
    </div>
    <div
      v-show="xScrollable"
      ref="horizontalRailRef"
      class="scrollbar-rail rail-horizontal"
      :class="`rail-horizontal-${xPlacement}`"
    >
      <div
        class="scrollbar-track"
        :class="{ 'track-visible': trigger === 'none' || showHorizontalTrack }"
        :style="horizontalTrackStyle"
        @mouseenter="onEnterHorizontalTrack"
        @mouseleave="onLeaveHorizontalTrack"
        @pointerdown.prevent.stop="handleHorizontalTrackPointerDown"
      ></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.scrollbar-wrap {
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
      background-color: var(--va-scrollbar-color, var(--va-text-color-disabled));
      touch-action: none;
      transition:
        background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        background-color: var(--va-scrollbar-color-hover, var(--va-text-color-3));
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
}
</style>
