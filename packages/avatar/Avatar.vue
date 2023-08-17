<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { Slot } from 'vue'
interface Responsive {
  xs?: number // <576px 响应式栅格
  sm?: number // ≥576px 响应式栅格
  md?: number // ≥768px 响应式栅格
  lg?: number // ≥992px 响应式栅格
  xl?: number // ≥1200px 响应式栅格
  xxl?: number // ≥1600px 响应式栅格
}
interface Props {
  shape?: 'circle'|'square' // 指定头像的形状
  size?: number|'large'|'small'|'default'|Responsive // 设置头像的大小
  src?: string // 图片类头像资源地址
  alt?: string // 图片无法显示时的替代文本
  icon?: Slot // 设置头像的图标
}
const props = withDefaults(defineProps<Props>(), {
  shape: 'circle',
  size: 'default',
  src: '',
  alt: '',
  icon: undefined
})
const clientWidth = ref(document.documentElement.clientWidth)
const iconRef = ref()
const showIcon = ref(1)
const strRef = ref()
const showStr = ref(1)
onMounted(() => {
  window.addEventListener('resize', getBrowserSize)
  if (!props.src) {
    showIcon.value = iconRef.value.offsetHeight
    nextTick(() => {
      if (!showIcon.value) {
        showStr.value = strRef.value.offsetHeight
      }
    })
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', getBrowserSize)
})
function getBrowserSize () {
  // document.documentElement返回<html>元素
  clientWidth.value = document.documentElement.clientWidth
}
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
        fontSize: (props.size as number / 2) + 'px'
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
    if (clientWidth.value >= 1600 && props.size.xxl) {
      size = props.size.xxl
    } else if (clientWidth.value >= 1200 && props.size.xl) {
      size = props.size.xl
    } else if (clientWidth.value >= 992 && props.size.lg) {
      size = props.size.lg
    } else if (clientWidth.value >= 768 && props.size.md) {
      size = props.size.md
    } else if (clientWidth.value >= 576 && props.size.sm) {
      size = props.size.sm
    } else if (clientWidth.value < 576 && props.size.xs) {
      size = props.size.xs
    }
    return {
      width: size + 'px',
      height: size + 'px',
      lineHeight: size + 'px',
      fontSize: (size / 2) + 'px'
    }
  }
})
const strStyle = computed(() => {
  if (typeof props.size === 'string') {
    return {
      transform: `scale(1) translateX(-50%)`
    }
  }
  if (typeof props.size === 'number') {
    const scale = Math.min(1, Math.max(1/45, (1 + (props.size - 9) * 1) / 45))
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
    :class="[avatarStyle === null ? 'avatar-' + size: '', 'avatar-' + shape, {'avatar-image': src}]"
    :style="avatarStyle || {}">
    <img class="u-image" :src="src" :alt="alt" v-if="src" />
    <span class="m-icon" ref="iconRef" v-if="!src && showIcon">
      <slot name="icon"></slot>
    </span>
    <span class="m-string" :style="strStyle" ref="strRef" v-if="!src && !showIcon && showStr">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-avatar {
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  position: relative;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background: rgba(0, 0, 0, .25);
  border: 1px solid transparent;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  &.avatar-square {
    border-radius: 6px;
  }
  .u-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .m-icon {
    display: inline-flex;
    align-items: center;
    color: inherit;
    line-height: 0;
    text-align: center;
    vertical-align: -0.125em;
  }
  .m-string {
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
  .m-icon {
    font-size: 24px;
  }
  &.avatar-square {
    border-radius: 8px;
  }
}
.avatar-default {
  .m-icon {
    font-size: 18px;
  }
}
.avatar-small {
  font-size: 14px;
  width: 24px;
  height: 24px;
  line-height: 22px;
  border-radius: 50%;
  .m-icon {
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
