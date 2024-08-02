<script setup lang="ts">
import { computed, useSlots } from 'vue'
interface Props {
  orientation?: 'left' | 'center' | 'right' // 分割线标题的位置
  orientationMargin?: string | number // 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right
  borderWidth?: number // 分割线宽度，单位 px
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' // 分割线样式
  borderColor?: string // 分割线颜色
  vertical?: boolean // 是否垂直分割
  height?: string | number // 垂直分割线高度，仅当 vertical: true 时生效
}
const props = withDefaults(defineProps<Props>(), {
  orientation: 'center',
  orientationMargin: undefined,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'rgba(5, 5, 5, 0.06)',
  vertical: false,
  height: '0.9em'
})
const margin = computed(() => {
  if (typeof props.orientationMargin === 'number') {
    return props.orientationMargin + 'px'
  }
  return props.orientationMargin
})
const lineHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  }
  return props.height
})
const slots = useSlots()
const showText = computed(() => {
  const defaultSlots = slots.default?.()
  if (defaultSlots) {
    return Boolean(defaultSlots[0].children !== 'v-if' && defaultSlots[0].children?.length)
  }
  return false
})
</script>
<template>
  <div
    class="m-divider divider-style"
    :class="[
      vertical ? 'divider-vertical' : 'divider-horizontal',
      {
        'divider-with-text': showText,
        'divider-with-text-center': showText && orientation === 'center',
        'divider-with-text-left': showText && orientation === 'left',
        'divider-with-text-right': showText && orientation === 'right',
        'divider-orientation-margin-left': showText && orientation === 'left' && orientationMargin !== undefined,
        'divider-orientation-margin-right': showText && orientation === 'right' && orientationMargin !== undefined
      }
    ]"
    :style="`--border-width: ${borderWidth}px; --border-style: ${borderStyle}; --border-color: ${borderColor}; --margin: ${margin}; --line-height: ${lineHeight};`"
  >
    <span class="m-divider-text" v-show="showText">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-divider {
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  border-block-start: var(--border-width) var(--border-style) var(--border-color);
  .m-divider-text {
    display: inline-block;
    padding: 0 1em;
  }
}
.divider-horizontal {
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  margin: 24px 0;
}
.divider-vertical {
  position: relative;
  top: -0.06em;
  display: inline-block;
  height: var(--line-height);
  margin: 0 8px;
  vertical-align: middle;
  border-top: 0;
  border-inline-start: var(--border-width) var(--border-style) var(--border-color);
}
.divider-style {
  background: none;
  border-color: var(--border-color);
  border-style: var(--border-style);
  border-width: var(--border-width) 0 0;
}
.divider-vertical.divider-style {
  border-inline-start-width: var(--border-width);
  border-inline-end: 0;
  border-block-start: 0;
  border-block-end: 0;
}
.divider-with-text {
  display: flex;
  align-items: center;
  margin: 16px 0;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  border-block-start: 0 var(--border-color);
  &::before,
  &::after {
    position: relative;
    width: 50%;
    border-top-width: var(--border-width);
    border-top-style: var(--border-style);
    border-top-color: inherit;
    transform: translateY(50%);
    content: '';
  }
}
.divider-with-text.divider-style {
  &::before,
  &::after {
    border-style: var(--border-style) none none;
  }
}
.divider-with-text-left {
  &::before {
    width: 5%;
  }
  &::after {
    width: 95%;
  }
}
.divider-with-text-right {
  &::before {
    width: 95%;
  }
  &::after {
    width: 5%;
  }
}
.divider-orientation-margin-left {
  &::before {
    width: 0;
  }
  &::after {
    width: 100%;
  }
  .m-divider-text {
    margin-left: var(--margin);
    padding-inline-start: 0;
  }
}
.divider-orientation-margin-right {
  &::before {
    width: 100%;
  }
  &::after {
    width: 0;
  }
  .m-divider-text {
    margin-right: var(--margin);
    padding-inline-end: 0;
  }
}
</style>
