<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlotsExist, useEventListener, rafTimeout, cancelRaf } from '../utils'
interface Props {
  maxWidth?: string | number // 弹出提示最大宽度，单位 px
  content?: string // 展示的内容 string | slot
  contentStyle?: CSSProperties // 设置展示内容的样式
  tooltip?: string // 弹出提示内容 string | slot
  tooltipClass?: string // 设置弹出提示的类名
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
  bgColor?: string // 弹出提示框背景颜色
  arrow?: boolean // 是否显示箭头
  placement?: 'top' | 'bottom' | 'left' | 'right' // 弹出提示位置
  flip?: boolean // 弹出提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  trigger?: 'hover' | 'click' // 弹出提示触发方式
  keyboard?: boolean // 是否支持按键操作 (enter 显示；esc 关闭)，仅当 trigger: 'click' 时生效
  transitionDuration?: number // 弹出提示动画的过渡持续时间，单位 ms
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
  keyboard: false,
  transitionDuration: 100,
  showDelay: 100,
  hideDelay: 100,
  show: false
})
const tooltipVisible = ref<boolean>(false)
const hideTimer = ref()
const scrollTarget = ref<HTMLElement | null>(null) // 最近的可滚动父元素
const contentRect = ref() // content 的矩形信息
const top = ref(0) // 提示框 top 定位
const left = ref(0) // 提示框 left 定位
const tooltipPlace = ref('top') // 弹出提示位置
const contentRef = ref() // 声明一个同名的模板引用
const contentWidth = ref() // 展示内容宽度
const contentHeight = ref() // 展示内容高度
const tooltipRef = ref() // 声明一个同名的模板引用
const tooltipWidth = ref() // 弹出提示内容宽度
const tooltipHeight = ref() // 弹出提示内容高度
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
  () => props.show,
  (to) => {
    tooltipVisible.value = to
  },
  {
    immediate: true
  }
)
watch(
  () => [tooltipMaxWidth.value, props.placement, props.arrow, props.flip],
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
  scrollTarget.value = getScrollParent(contentRef.value?.parentElement ?? null)
  scrollTarget.value && scrollTarget.value.addEventListener('scroll', getPosition)
}
function cleanup() {
  scrollTarget.value && scrollTarget.value.removeEventListener('scroll', getPosition)
  scrollTarget.value = null
}
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  const isScrollable = (el: HTMLElement): boolean => {
    const style = window.getComputedStyle(el)
    if (
      (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) &&
      (style.overflow === 'scroll' || style.overflow === 'auto')
    ) {
      return true
    }
    return false
  }
  if (el) {
    return isScrollable(el) ? el : getScrollParent(el.parentElement ?? null)
  }
  return null
}
function getPosition() {
  contentWidth.value = contentRef.value.offsetWidth
  contentHeight.value = contentRef.value.offsetHeight
  tooltipWidth.value = tooltipRef.value.offsetWidth
  tooltipHeight.value = tooltipRef.value.offsetHeight
  if (props.flip) {
    contentRect.value = contentRef.value.getBoundingClientRect()
    tooltipPlace.value = getPlacement(props.placement, [])
  }
  if (['top', 'bottom'].includes(tooltipPlace.value)) {
    top.value = tooltipHeight.value + (props.arrow ? 4 : 6)
    left.value = (tooltipWidth.value - contentWidth.value) / 2
  } else {
    top.value = (tooltipHeight.value - contentHeight.value) / 2
    left.value = tooltipWidth.value + (props.arrow ? 4 : 6)
  }
}
// 获取可滚动父元素或视口的矩形信息
function getShelterRect() {
  if (scrollTarget.value) {
    return scrollTarget.value.getBoundingClientRect()
  } else {
    return {
      top: 0,
      left: 0,
      bottom: viewportHeight.value,
      right: viewportWidth.value
    }
  }
}
// 弹出提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
function getPlacement(place: string, disabledPlaces: string[]): string {
  const { top, bottom, left, right } = contentRect.value // 内容元素各边缘相对于浏览器视口的位置(不包括滚动条)
  const { top: targetTop, bottom: targetBottom, left: targetLeft, right: targetRight } = getShelterRect() // 滚动元素或视口各边缘相对于浏览器视口的位置(不包括滚动条)
  const topDistance = top - targetTop // 内容元素上边缘距离滚动元素上边缘的距离
  const bottomDistance = targetBottom - bottom // 内容元素下边缘距离动元素下边缘的距离
  const leftDistance = left - targetLeft // 内容元素左边缘距离滚动元素左边缘的距离
  const rightDistance = targetRight - right // 内容元素右边缘距离滚动元素右边缘的距离
  const horizontalDistance = (tooltipWidth.value - contentWidth.value) / 2 // 水平方向容纳弹出提示需要的最小宽度
  const verticalDistance = (tooltipHeight.value - contentHeight.value) / 2 // 垂直方向容纳弹出提示需要的最小高度
  switch (place) {
    case 'top':
      if (!disabledPlaces.includes('top')) {
        if (topDistance < tooltipHeight.value + (props.arrow ? 4 : 6) && disabledPlaces.length !== 3) {
          return getPlacement('bottom', [...disabledPlaces, 'top'])
        } else {
          if (leftDistance >= horizontalDistance && rightDistance >= horizontalDistance) {
            return 'top'
          } else {
            if (disabledPlaces.length !== 3) {
              if (leftDistance < horizontalDistance) {
                return getPlacement('right', [...disabledPlaces, 'top', 'bottom', 'left'])
              }
              if (rightDistance < horizontalDistance) {
                return getPlacement('left', [...disabledPlaces, 'top', 'bottom', 'right'])
              }
            }
          }
        }
      } else {
        if (!disabledPlaces.includes('bottom')) {
          return getPlacement('bottom', [...disabledPlaces, 'top'])
        }
        if (!disabledPlaces.includes('left')) {
          return getPlacement('left', [...disabledPlaces, 'top'])
        }
      }
    case 'bottom':
      if (!disabledPlaces.includes('bottom')) {
        if (bottomDistance < tooltipHeight.value + (props.arrow ? 4 : 6) && disabledPlaces.length !== 3) {
          return getPlacement('top', [...disabledPlaces, 'bottom'])
        } else {
          if (leftDistance >= horizontalDistance && rightDistance >= horizontalDistance) {
            return 'bottom'
          } else {
            if (disabledPlaces.length !== 3) {
              if (leftDistance < horizontalDistance) {
                return getPlacement('right', [...disabledPlaces, 'top', 'bottom', 'left'])
              }
              if (rightDistance < horizontalDistance) {
                return getPlacement('left', [...disabledPlaces, 'top', 'bottom', 'right'])
              }
            }
          }
        }
      } else {
        if (!disabledPlaces.includes('top')) {
          return getPlacement('top', [...disabledPlaces, 'bottom'])
        }
        if (!disabledPlaces.includes('left')) {
          return getPlacement('left', [...disabledPlaces, 'bottom'])
        }
      }
    case 'left':
      if (!disabledPlaces.includes('left')) {
        if (leftDistance < tooltipWidth.value + (props.arrow ? 4 : 6) && disabledPlaces.length !== 3) {
          return getPlacement('right', [...disabledPlaces, 'left'])
        } else {
          if (topDistance >= verticalDistance && bottomDistance >= verticalDistance) {
            return 'left'
          } else {
            if (disabledPlaces.length !== 3) {
              if (topDistance < verticalDistance) {
                return getPlacement('bottom', [...disabledPlaces, 'left', 'right', 'top'])
              }
              if (bottomDistance < verticalDistance) {
                return getPlacement('top', [...disabledPlaces, 'left', 'right', 'bottom'])
              }
            }
          }
        }
      } else {
        if (!disabledPlaces.includes('right')) {
          return getPlacement('right', [...disabledPlaces, 'left'])
        }
        if (!disabledPlaces.includes('top')) {
          return getPlacement('top', [...disabledPlaces, 'left'])
        }
      }
      if (topDistance >= verticalDistance && bottomDistance >= verticalDistance) {
        return 'left'
      }
    case 'right':
      if (!disabledPlaces.includes('right')) {
        if (rightDistance < tooltipWidth.value + (props.arrow ? 4 : 6) && disabledPlaces.length !== 3) {
          return getPlacement('left', [...disabledPlaces, 'right'])
        } else {
          if (topDistance >= verticalDistance && bottomDistance >= verticalDistance) {
            return 'right'
          } else {
            if (disabledPlaces.length !== 3) {
              if (topDistance < verticalDistance) {
                return getPlacement('bottom', [...disabledPlaces, 'left', 'right', 'top'])
              }
              if (bottomDistance < verticalDistance) {
                return getPlacement('top', [...disabledPlaces, 'left', 'right', 'bottom'])
              }
            }
          }
        }
      } else {
        if (!disabledPlaces.includes('left')) {
          return getPlacement('left', [...disabledPlaces, 'right'])
        }
        if (!disabledPlaces.includes('top')) {
          return getPlacement('top', [...disabledPlaces, 'right'])
        }
      }
    default:
      return props.placement
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
defineExpose({
  show: onShow,
  hide: onHide
})
</script>
<template>
  <div
    class="m-tooltip-wrap"
    :style="`--tooltip-max-width: ${tooltipMaxWidth}; --tooltip-background-color: ${bgColor}; --transition-duration: ${transitionDuration}ms;`"
    @mouseenter="trigger === 'hover' ? onShow() : () => false"
    @mouseleave="trigger === 'hover' ? onHide() : () => false"
  >
    <div
      ref="tooltipRef"
      tabindex="1"
      class="m-tooltip-card"
      :class="{
        [`tooltip-${tooltipPlace}-padding`]: arrow,
        'tooltip-visible': showTooltip && tooltipVisible
      }"
      :style="tooltipPlacement"
      @blur="trigger === 'click' && activeBlur ? onHide() : () => false"
      @mouseenter="trigger === 'hover' ? onShow() : () => false"
      @mouseleave="trigger === 'hover' ? onHide() : () => false"
      @keydown.esc="trigger === 'click' && keyboard && tooltipVisible ? onHide() : () => false"
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
      @keydown.enter="trigger === 'click' && keyboard ? toggleVisible() : () => false"
      @keydown.esc="trigger === 'click' && keyboard && tooltipVisible ? onHide() : () => false"
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
    outline: none;
    transform: scale(0.8);
    opacity: 0;
    transition:
      opacity var(--transition-duration) cubic-bezier(0.78, 0.14, 0.15, 0.86),
      transform var(--transition-duration) cubic-bezier(0.78, 0.14, 0.15, 0.86);
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
    transition:
      opacity var(--transition-duration) cubic-bezier(0.08, 0.82, 0.17, 1),
      transform var(--transition-duration) cubic-bezier(0.08, 0.82, 0.17, 1);
  }
  .tooltip-content {
    display: inline-block;
  }
}
</style>
