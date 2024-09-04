<script setup lang="ts">
import { ref, computed } from 'vue'
import type { VNode, Slot } from 'vue'
import { throttle, useEventListener, useSlotsExist } from '../utils'
interface Responsive {
  xs?: number // <576px 响应式栅格
  sm?: number // ≥576px 响应式栅格
  md?: number // ≥768px 响应式栅格
  lg?: number // ≥992px 响应式栅格
  xl?: number // ≥1200px 响应式栅格
  xxl?: number // ≥1600px 响应式栅格
}
interface Props {
  shape?: 'circle' | 'square' // 指定头像的形状
  size?: number | 'large' | 'small' | 'default' | Responsive // 设置头像的大小，number 类型时单位 px
  src?: string // 图片类头像资源地址
  alt?: string // 图片无法显示时的替代文本
  icon?: VNode | Slot // 设置头像的图标
}
const props = withDefaults(defineProps<Props>(), {
  shape: 'circle',
  size: 'default',
  src: undefined,
  alt: undefined,
  icon: undefined
})
const viewportWidth = ref(window.innerWidth)
function getViewportWidth() {
  viewportWidth.value = window.innerWidth
}
const throttleEvent = throttle(getViewportWidth, 100)
useEventListener(window, 'resize', throttleEvent)
const avatarStyle = computed(() => {
  if (typeof props.size === 'string') {
    return null
  }
  if (typeof props.size === 'number') {
    if (showIcon.value) {
      return {
        width: props.size + 'px',
        height: props.size + 'px',
        lineHeight: props.size + 'px',
        fontSize: (props.size as number) / 2 + 'px'
      }
    } else {
      return {
        width: props.size + 'px',
        height: props.size + 'px',
        lineHeight: props.size + 'px',
        fontSize: '18px'
      }
    }
  }
  if (typeof props.size === 'object') {
    let size = 32
    if (viewportWidth.value >= 1600 && props.size.xxl) {
      size = props.size.xxl
    } else if (viewportWidth.value >= 1200 && props.size.xl) {
      size = props.size.xl
    } else if (viewportWidth.value >= 992 && props.size.lg) {
      size = props.size.lg
    } else if (viewportWidth.value >= 768 && props.size.md) {
      size = props.size.md
    } else if (viewportWidth.value >= 576 && props.size.sm) {
      size = props.size.sm
    } else if (viewportWidth.value < 576 && props.size.xs) {
      size = props.size.xs
    }
    return {
      width: size + 'px',
      height: size + 'px',
      lineHeight: size + 'px',
      fontSize: size / 2 + 'px'
    }
  }
})
const slotsExist = useSlotsExist(['default', 'icon'])
const showIcon = computed(() => {
  if (!props.src) {
    return slotsExist.icon || props.icon
  }
  return false
})
const showStr = computed(() => {
  if (!props.src && !showIcon.value) {
    return slotsExist.default
  }
  return false
})
const strStyle = computed(() => {
  if (typeof props.size === 'string') {
    return {
      transform: `scale(1) translateX(-50%)`
    }
  }
  if (typeof props.size === 'number') {
    const scale = Math.min(1, Math.max(1 / 45, (1 + (props.size - 9) * 1) / 45))
    return {
      lineHeight: props.size + 'px',
      transform: `scale(${scale}) translateX(-50%)`
    }
  }
})
</script>
<template>
  <div
    class="m-avatar"
    :class="[avatarStyle === null ? `avatar-${size}` : '', `avatar-${shape}`, { 'avatar-image': src }]"
    :style="avatarStyle || {}"
  >
    <img class="avatar-image" :src="src" :alt="alt" v-if="src" />
    <span class="avatar-icon" v-if="!src && showIcon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span class="avatar-string" :style="strStyle" v-if="!src && !showIcon && showStr">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-avatar {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  color: #fff;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid transparent;
  overflow: hidden;
  white-space: nowrap;
  &.avatar-square {
    border-radius: 6px;
  }
  .avatar-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .avatar-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    :deep(svg) {
      fill: currentColor;
    }
  }
  .avatar-string {
    position: absolute;
    left: 50%;
    transform-origin: 0 center;
  }
}
.avatar-large {
  font-size: 24px;
  width: 40px;
  height: 40px;
  line-height: 38px;
  border-radius: 50%;
  .avatar-icon {
    font-size: 24px;
  }
  &.avatar-square {
    border-radius: 8px;
  }
}
.avatar-default {
  .avatar-icon {
    font-size: 18px;
  }
}
.avatar-small {
  font-size: 14px;
  width: 24px;
  height: 24px;
  line-height: 22px;
  border-radius: 50%;
  .avatar-icon {
    font-size: 14px;
  }
  &.avatar-square {
    border-radius: 4px;
  }
}
.avatar-image {
  background: transparent;
}
</style>
