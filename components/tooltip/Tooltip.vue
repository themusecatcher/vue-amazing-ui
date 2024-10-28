<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlotsExist, useEventListener, rafTimeout, cancelRaf } from '../utils'
interface Props {
  maxWidth?: string | number // 弹出提示最大宽度，单位 px
  content?: string // 展示的文本 string | slot
  contentStyle?: CSSProperties // 设置展示文本的样式
  tooltip?: string // 弹出提示文本 string | slot
  tooltipClass?: string // 设置弹出提示的类名
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
  bgColor?: string // 弹出提示框背景颜色
  arrow?: boolean // 是否显示箭头
  placement?: 'top' | 'bottom' | 'left' | 'right' // 弹出提示位置
  flip?: boolean // 弹出提示被浏览器窗口遮-挡时自动调整弹出位置
  trigger?: 'hover' | 'click' // 弹出提示触发方式
  showDelay?: number // 弹出提示显示的延迟时间，单位 ms
  hideDelay?: number // 弹出提示隐藏的延迟时间，单位 ms
  show?: boolean // (v-model) 弹出提示是否显示
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: 240,
  content: undefined,
  contentStyle: () => ({}),
  tooltip: undefined,
  tooltipClass: undefined,
  tooltipStyle: () => ({}),
  bgColor: 'rgba(0, 0, 0, 0.85)',
  arrow: true,
  placement: 'top',
  flip: true,
  trigger: 'hover',
  showDelay: 100,
  hideDelay: 100,
  show: false
})
const tooltipVisible = ref<boolean>(false)
const hideTimer = ref()
const scrollTarget = ref<HTMLElement | null>(null) // 最近的可滚动父元素
const top = ref(0) // 提示框 top 定位
const left = ref(0) // 提示框 left 定位
const tooltipPlace = ref('top') // 弹出提示位置
const contentRef = ref() // 声明一个同名的模板引用
const tooltipRef = ref() // 声明一个同名的模板引用
const tooltipWidth = ref() // 提示文本宽度
const tooltipHeight = ref() // 提示文本高度
const activeBlur = ref(false) // 是否激活 blur 事件
const emits = defineEmits(['update:show', 'openChange'])
const slotsExist = useSlotsExist(['tooltip'])
const viewportWidth = ref(document.documentElement.clientWidth) // 视口宽度(不包括滚动条)
const viewportHeight = ref(document.documentElement.clientHeight) // 视口高度(不包括滚动条)
const tooltipMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return `${props.maxWidth}px`
  }
  return props.maxWidth
})
const showTooltip = computed(() => {
  return slotsExist.tooltip || props.tooltip
})
const tooltipPlacement = computed(() => {
  switch (tooltipPlace.value) {
    case 'top':
      return {
        transformOrigin: `50% ${top.value}px`,
        top: `${-top.value}px`,
        left: `${-left.value}px`
      }
    case 'bottom':
      return {
        transformOrigin: `50% ${props.arrow ? -4 : -6}px`,
        bottom: `${-top.value}px`,
        left: `${-left.value}px`
      }
    case 'left':
      return {
        transformOrigin: `${left.value}px 50%`,
        top: `${-top.value}px`,
        left: `${-left.value}px`
      }
    case 'right':
      return {
        transformOrigin: `${props.arrow ? -4 : -6}px 50%`,
        top: `${-top.value}px`,
        right: `${-left.value}px`
      }
    default:
      return {
        transformOrigin: `50% ${top.value}px`,
        top: `${-top.value}px`,
        left: `${-left.value}px`
      }
  }
})
watch(
  () => props.placement,
  (to) => {
    tooltipPlace.value = to
  },
  {
    immediate: true
  }
)
watch(
  () => props.show,
  (to) => {
    tooltipVisible.value = to
  },
  {
    immediate: true
  }
)
watch(
  () => [tooltipMaxWidth.value, tooltipPlace.value, props.arrow, props.flip],
  () => {
    getPosition()
  },
  {
    deep: true,
    flush: 'post'
  }
)
onMounted(() => {
  observeScroll()
})
onBeforeUnmount(() => {
  cleanup()
})
useEventListener(window, 'resize', getViewportSize)
function getViewportSize() {
  viewportWidth.value = document.documentElement.clientWidth
  viewportHeight.value = document.documentElement.clientHeight
  getPosition()
}
function observeScroll() {
  // 监听可滚动父元素
  cleanup()
  scrollTarget.value = getScrollParent(contentRef.value?.parentElement.parentElement ?? null)
  scrollTarget.value && scrollTarget.value.addEventListener('scroll', getPosition)
}
function cleanup() {
  scrollTarget.value && scrollTarget.value.removeEventListener('scroll', getPosition)
  scrollTarget.value = null
}
function getScrollParent(el: HTMLElement | null) {
  if (el) {
    if (el.scrollHeight > el.clientHeight) {
      return el
    } else {
      return getScrollParent(el.parentElement ?? null)
    }
  }
  return null
}
function getPosition() {
  const contentWidth = contentRef.value.offsetWidth // 展示文本宽度
  const contentHeight = contentRef.value.offsetHeight // 展示文本高度
  tooltipWidth.value = tooltipRef.value.offsetWidth
  tooltipHeight.value = tooltipRef.value.offsetHeight
  if (props.flip) {
    tooltipPlace.value = getPlacement(props.placement, [])
  }
  if (['top', 'bottom'].includes(tooltipPlace.value)) {
    top.value = tooltipHeight.value + (props.arrow ? 4 : 6)
    left.value = (tooltipWidth.value - contentWidth) / 2
  } else {
    top.value = (tooltipHeight.value - contentHeight) / 2
    left.value = tooltipWidth.value + (props.arrow ? 4 : 6)
  }
}
// 弹出提示被浏览器窗口遮挡时自动调整弹出位置
function getPlacement(place: string, disabledPlaces: string[]): string {
  const contentRect = contentRef.value.getBoundingClientRect()
  const { top, bottom, left, right } = contentRect // 展示文本各边缘相对于浏览器视口的位置(不包括滚动条)
  const bottomDistance = viewportHeight.value - bottom // 下边缘距离视口下边缘的距离
  const rightDistance = viewportWidth.value - right // 右边缘距离视口右边缘的距离
  switch (place) {
    case 'top':
      if (!disabledPlaces.includes('top')) {
        if (top < tooltipHeight.value + (props.arrow ? 4 : 6)) {
          return getPlacement('bottom', [...disabledPlaces, 'top'])
        }
      } else {
        if (!disabledPlaces.includes('bottom')) {
          return getPlacement('bottom', [...disabledPlaces, 'top'])
        }
        if (!disabledPlaces.includes('left')) {
          return getPlacement('left', [...disabledPlaces, 'top'])
        }
      }
      return 'top'
    case 'bottom':
      if (!disabledPlaces.includes('bottom')) {
        if (bottomDistance < tooltipHeight.value + (props.arrow ? 4 : 6)) {
          return getPlacement('top', [...disabledPlaces, 'bottom'])
        }
      } else {
        if (!disabledPlaces.includes('top')) {
          return getPlacement('top', [...disabledPlaces, 'bottom'])
        }
        if (!disabledPlaces.includes('left')) {
          return getPlacement('left', [...disabledPlaces, 'bottom'])
        }
      }
      return 'bottom'
    case 'left':
      if (!disabledPlaces.includes('left')) {
        if (left < tooltipWidth.value + (props.arrow ? 4 : 6)) {
          return getPlacement('right', [...disabledPlaces, 'left'])
        }
      } else {
        if (!disabledPlaces.includes('right')) {
          return getPlacement('right', [...disabledPlaces, 'left'])
        }
        if (!disabledPlaces.includes('top')) {
          return getPlacement('top', [...disabledPlaces, 'left'])
        }
      }
      return 'left'
    case 'right':
      if (!disabledPlaces.includes('right')) {
        if (rightDistance < tooltipWidth.value + (props.arrow ? 4 : 6)) {
          return getPlacement('left', [...disabledPlaces, 'right'])
        }
      } else {
        if (!disabledPlaces.includes('left')) {
          return getPlacement('left', [...disabledPlaces, 'right'])
        }
        if (!disabledPlaces.includes('top')) {
          return getPlacement('top', [...disabledPlaces, 'right'])
        }
      }
      return 'right'
    default:
      return tooltipPlace.value
  }
}
function onShow() {
  hideTimer.value && cancelRaf(hideTimer.value)
  if (!tooltipVisible.value) {
    getPosition()
    rafTimeout(() => {
      tooltipVisible.value = true
      emits('update:show', true)
      emits('openChange', true)
    }, props.showDelay)
  }
}
function onHide(): void {
  hideTimer.value = rafTimeout(() => {
    tooltipVisible.value = false
    emits('update:show', false)
    emits('openChange', false)
  }, props.hideDelay)
}
function toggleVisible() {
  if (!tooltipVisible.value) {
    onShow()
  } else {
    onHide()
  }
}
function onEnter() {
  activeBlur.value = false
}
function onLeave() {
  activeBlur.value = true
  tooltipRef.value.focus()
}
function onBlur() {
  tooltipVisible.value = false
  emits('update:show', false)
  emits('openChange', false)
}
</script>
<template>
  <div
    class="m-tooltip-wrap"
    @mouseenter="trigger === 'hover' ? onShow() : () => false"
    @mouseleave="trigger === 'hover' ? onHide() : () => false"
  >
    <div
      ref="tooltipRef"
      tabindex="1"
      class="m-tooltip-card"
      :class="{
        [`tooltip-${tooltipPlace}-padding`]: arrow,
        'tooltip-visible': tooltipVisible && showTooltip
      }"
      :style="[`--tooltip-max-width: ${tooltipMaxWidth}; --tooltip-background-color: ${bgColor};`, tooltipPlacement]"
      @blur="trigger === 'click' && activeBlur ? onBlur() : () => false"
      @mouseenter="trigger === 'hover' ? onShow() : () => false"
      @mouseleave="trigger === 'hover' ? onHide() : () => false"
    >
      <div class="tooltip-card" :class="tooltipClass" :style="tooltipStyle">
        <slot name="tooltip">{{ tooltip }}</slot>
      </div>
      <div v-if="arrow" class="tooltip-arrow" :class="`arrow-${tooltipPlace || 'top'}`"></div>
    </div>
    <span
      ref="contentRef"
      class="tooltip-content"
      :style="contentStyle"
      @click="trigger === 'click' ? toggleVisible() : () => false"
      @mouseenter="trigger === 'click' && tooltipVisible ? onEnter() : () => false"
      @mouseleave="trigger === 'click' && tooltipVisible ? onLeave() : () => false"
    >
      <slot>{{ content }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-tooltip-wrap {
  position: relative;
  display: inline-block;
  .m-tooltip-card {
    position: absolute;
    z-index: 999;
    width: max-content;
    max-width: var(--tooltip-max-width);
    pointer-events: none;
    transform: scale(0.8);
    opacity: 0;
    transition:
      transform 0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    .tooltip-card {
      min-width: 32px;
      min-height: 32px;
      padding: 6px 8px;
      font-size: 14px;
      color: #fff;
      line-height: 1.5714285714285714;
      text-align: justify;
      text-decoration: none;
      word-break: break-all;
      background-color: var(--tooltip-background-color);
      border-radius: 6px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
    .tooltip-arrow {
      position: absolute;
      z-index: 9;
      display: block;
      pointer-events: none;
      width: 16px;
      height: 16px;
      overflow: hidden;
      &::before {
        position: absolute;
        width: 16px;
        height: 8px;
        background-color: var(--tooltip-background-color);
        clip-path: path(
          'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
        );
        content: '';
      }
      &::after {
        position: absolute;
        width: 8.970562748477143px;
        height: 8.970562748477143px;
        margin: auto;
        border-radius: 0 0 2px 0;
        transform: translateY(50%) rotate(-135deg);
        box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
        z-index: 0;
        background: transparent;
        content: '';
      }
    }
    .arrow-top {
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%) translateY(100%) rotate(180deg);
      &::before {
        bottom: 0;
        left: 0;
      }
      &::after {
        bottom: 0;
        inset-inline: 0;
      }
    }
    .arrow-bottom {
      left: 50%;
      top: 12px;
      transform: translateX(-50%) translateY(-100%) rotate(0deg);
      &::before {
        bottom: 0;
        left: 0;
      }
      &::after {
        bottom: 0;
        inset-inline: 0;
      }
    }
    .arrow-left {
      top: 50%;
      right: 12px;
      transform: translateX(100%) translateY(-50%) rotate(90deg);
      &::before {
        bottom: 0;
        left: 0;
      }
      &::after {
        bottom: 0;
        inset-inline: 0;
      }
    }
    .arrow-right {
      top: 50%;
      left: 12px;
      transform: translateX(-100%) translateY(-50%) rotate(-90deg);
      &::before {
        bottom: 0;
        left: 0;
      }
      &::after {
        bottom: 0;
        inset-inline: 0;
      }
    }
  }
  .tooltip-top-padding {
    padding-bottom: 12px;
  }
  .tooltip-bottom-padding {
    padding-top: 12px;
  }
  .tooltip-left-padding {
    padding-right: 12px;
  }
  .tooltip-right-padding {
    padding-left: 12px;
  }
  .tooltip-visible {
    pointer-events: auto;
    transform: scale(1);
    opacity: 1;
  }
  .tooltip-content {
    display: inline-block;
  }
}
</style>
