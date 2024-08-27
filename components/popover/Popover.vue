<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlotsExist, rafTimeout, cancelRaf } from '../utils'
interface Props {
  maxWidth?: string | number // 弹出卡片最大宽度，单位 px
  title?: string // 卡片标题 string | slot
  titleStyle?: CSSProperties // 卡片标题样式
  content?: string // 卡片内容 string | slot
  contentStyle?: CSSProperties // 卡片内容样式
  bgColor?: string // 弹出卡片背景颜色
  popoverStyle?: CSSProperties // 卡片容器样式
  arrow?: boolean // 是否显示箭头
  trigger?: 'hover' | 'click' // 弹出卡片触发方式
  showDelay?: number // 弹出卡片显示的延迟时间，单位 ms
  hideDelay?: number // 弹出卡片隐藏的延迟时间，单位 ms
  show?: boolean // (v-model) 弹出卡片是否显示
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'auto',
  title: undefined,
  titleStyle: () => ({}),
  content: undefined,
  contentStyle: () => ({}),
  bgColor: '#fff',
  popoverStyle: () => ({}),
  arrow: true,
  trigger: 'hover',
  showDelay: 100,
  hideDelay: 100,
  show: false
})
const visible = ref(false)
const top = ref(0) // 提示框top定位
const left = ref(0) // 提示框left定位
const defaultRef = ref() // 声明一个同名的模板引用
const popoverRef = ref() // 声明一个同名的模板引用
const hideTimer = ref() // 延迟调用 ID
const activeBlur = ref(false) // 是否激活 blur 事件
const emits = defineEmits(['update:show', 'openChange'])
const slotsExist = useSlotsExist(['title', 'content'])
const popoverMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return props.maxWidth + 'px'
  }
  return props.maxWidth
})
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showContent = computed(() => {
  return slotsExist.content || props.content
})
watch(
  popoverMaxWidth,
  () => {
    getPosition()
  },
  {
    flush: 'post'
  }
)
watchEffect(() => {
  visible.value = props.show
})
function getPosition() {
  const defaultWidth = defaultRef.value.offsetWidth // 展示文本宽度
  const popWidth = popoverRef.value.offsetWidth // 提示文本宽度
  const popHeight = popoverRef.value.offsetHeight // 提示文本高度
  top.value = popHeight + (props.arrow ? 4 : 6)
  left.value = (popWidth - defaultWidth) / 2
}
function onShow() {
  hideTimer.value && cancelRaf(hideTimer.value)
  if (!visible.value) {
    getPosition()
    rafTimeout(() => {
      visible.value = true
      emits('update:show', true)
      emits('openChange', true)
    }, props.showDelay)
  }
}
function onHide(): void {
  hideTimer.value = rafTimeout(() => {
    visible.value = false
    emits('update:show', false)
    emits('openChange', false)
  }, props.hideDelay)
}
function toggleVisible() {
  if (!visible.value) {
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
  popoverRef.value.focus()
}
function onBlur() {
  visible.value = false
  emits('update:show', false)
  emits('openChange', false)
}
</script>
<template>
  <div
    class="m-popover-wrap"
    @mouseenter="trigger === 'hover' ? onShow() : () => false"
    @mouseleave="trigger === 'hover' ? onHide() : () => false"
  >
    <div
      ref="popoverRef"
      tabindex="1"
      class="m-pop-content"
      :class="{ 'popover-padding': arrow, 'popover-visible': visible }"
      :style="`max-width: ${popoverMaxWidth}; --popover-background-color: ${bgColor}; transform-origin: 50% ${top}px; top: ${-top}px; left: ${-left}px;`"
      @blur="trigger === 'click' && activeBlur ? onBlur() : () => false"
      @mouseenter="trigger === 'hover' ? onShow() : () => false"
      @mouseleave="trigger === 'hover' ? onHide() : () => false"
    >
      <div class="m-popover" :style="popoverStyle">
        <div v-if="showTitle" class="popover-title" :style="titleStyle">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="showContent" class="popover-content" :style="contentStyle">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
      <div v-if="arrow" class="popover-arrow"></div>
    </div>
    <div
      ref="defaultRef"
      @click="trigger === 'click' ? toggleVisible() : () => false"
      @mouseenter="trigger === 'click' && visible ? onEnter() : () => false"
      @mouseleave="trigger === 'click' && visible ? onLeave() : () => false"
    >
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-popover-wrap {
  position: relative;
  display: inline-block;
  .m-pop-content {
    position: absolute;
    z-index: 999;
    width: max-content;
    pointer-events: none;
    transform: scale(0.8);
    opacity: 0;
    transition:
      transform 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    outline: none;
    .m-popover {
      padding: 12px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.5714285714285714;
      text-align: start;
      text-decoration: none;
      word-break: break-all;
      cursor: auto;
      user-select: text;
      background-color: var(--popover-background-color);
      border-radius: 8px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .popover-title {
        min-width: 176px;
        color: rgba(0, 0, 0, 0.88);
        font-weight: 600;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
      .popover-content {
        color: rgba(0, 0, 0, 0.88);
      }
    }
    .popover-arrow {
      position: absolute;
      z-index: 9;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%) translateY(100%) rotate(180deg);
      display: block;
      pointer-events: none;
      width: 16px;
      height: 16px;
      overflow: hidden;
      &::before {
        position: absolute;
        bottom: 0;
        inset-inline-start: 0;
        width: 16px;
        height: 8px;
        background-color: var(--popover-background-color);
        clip-path: path(
          'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
        );
        content: '';
      }
      &::after {
        position: absolute;
        width: 8.970562748477143px;
        height: 8.970562748477143px;
        bottom: 0;
        inset-inline: 0;
        margin: auto;
        border-radius: 0 0 2px 0;
        transform: translateY(50%) rotate(-135deg);
        box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
        z-index: 0;
        background: transparent;
        content: '';
      }
    }
  }
  .popover-padding {
    padding-bottom: 12px;
  }
  .popover-visible {
    pointer-events: auto;
    transform: scale(1);
    opacity: 1;
  }
}
</style>
