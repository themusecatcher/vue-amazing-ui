<script setup lang="ts">
import { computed } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Props {
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
const slotsExist = useSlotsExist(['default'])
const margin = computed(() => {
  if (typeof props.orientationMargin === 'number') {
    return `${props.orientationMargin}px`
  }
  return props.orientationMargin
})
const lineHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})
const showText = computed(() => {
  return slotsExist.default
})
</script>
<template>
  <div
    class="m-divider"
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
    <span v-if="showText" class="divider-text">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-divider {
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  border-top: var(--border-width) var(--border-style) var(--border-color);
  .divider-text {
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
  border-left: var(--border-width) var(--border-style) var(--border-color);
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
  border-top: 0 var(--border-color);
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
  .divider-text {
    margin-left: var(--margin);
    padding-left: 0;
  }
}
.divider-orientation-margin-right {
  &::before {
    width: 100%;
  }
  &::after {
    width: 0;
  }
  .divider-text {
    margin-right: var(--margin);
    padding-right: 0;
  }
}
</style>
