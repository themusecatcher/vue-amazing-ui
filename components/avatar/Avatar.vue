<script setup lang="ts">
import { ref, computed } from 'vue'
import type { VNode, Slot } from 'vue'
import { useEventListener, useSlotsExist } from '../utils'
interface Responsive {
  xs?: number // <576px 响应式栅格
  sm?: number // ≥576px 响应式栅格
  md?: number // ≥768px 响应式栅格
  lg?: number // ≥992px 响应式栅格
  xl?: number // ≥1200px 响应式栅格
  xxl?: number // ≥1600px 响应式栅格
}
interface Props {
  color?: string // 头像的背景色
  shape?: 'circle' | 'square' // 指定头像的形状
  size?: number | 'small' | 'middle' | 'large' | Responsive // 设置头像的大小，number 类型时单位 px
  src?: string // 图片类头像资源地址
  alt?: string // 图片无法显示时的替代文本
  icon?: VNode | Slot // 设置头像的图标
}
const props = withDefaults(defineProps<Props>(), {
  color: 'rgba(0, 0, 0, 0.25)',
  shape: 'circle',
  size: 'middle',
  src: undefined,
  alt: undefined,
  icon: undefined
})
const viewportWidth = ref(window.innerWidth)
function getViewportWidth() {
  viewportWidth.value = window.innerWidth
}
useEventListener(window, 'resize', getViewportWidth)
const slotsExist = useSlotsExist(['default', 'icon'])
const showIcon = computed(() => {
  if (!props.src) {
    return Boolean(slotsExist.icon || props.icon)
  }
  return false
})
const avatarStyle = computed(() => {
  if (typeof props.size === 'number') {
    if (showIcon.value) {
      return {
        backgroundColor: props.color,
        width: `${props.size}px`,
        height: `${props.size}px`,
        lineHeight: `${props.size}px`,
        fontSize: `${props.size / 2}px`
      }
    } else {
      return {
        backgroundColor: props.color,
        width: `${props.size}px`,
        height: `${props.size}px`,
        lineHeight: `${props.size}px`,
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
      backgroundColor: props.color,
      width: `${size}px`,
      height: `${size}px`,
      lineHeight: `${size}px`,
      fontSize: `${size / 2}px`
    }
  }
  return {
    backgroundColor: props.color
  }
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
      transform: 'scale(1) translateX(-50%)'
    }
  }
  if (typeof props.size === 'number') {
    const scale = Math.min(1, Math.max(1 / 45, (1 + (props.size - 9) * 1) / 45))
    return {
      lineHeight: `${props.size}px`,
      transform: `scale(${scale}) translateX(-50%)`
    }
  }
  return {}
})
</script>
<template>
  <div
    class="m-avatar"
    :class="[
      `avatar-${shape}`,
      {
        [`avatar-${size}`]: typeof size === 'string' && ['small', 'middle', 'large'].includes(size),
        'avatar-image': src
      }
    ]"
    :style="avatarStyle"
  >
    <img v-if="src" class="avatar-image" :src="src" :alt="alt" />
    <slot v-if="!src && showIcon" name="icon">
      <component :is="icon" />
    </slot>
    <span v-if="!src && !showIcon && showStr" class="avatar-string" :style="strStyle">
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
  :deep(svg) {
    fill: currentColor;
  }
  .avatar-string {
    position: absolute;
    left: 50%;
    transform-origin: 0 center;
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
.avatar-middle {
  .avatar-icon {
    font-size: 18px;
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
.avatar-image {
  background: transparent;
}
</style>
