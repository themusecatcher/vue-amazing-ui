<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import type { VNode, Slot } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Props {
  type?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 设置按钮类型
  shape?: 'default' | 'circle' | 'round' // 设置按钮形状
  icon?: VNode | Slot // 设置按钮图标
  size?: 'small' | 'middle' | 'large' // 设置按钮尺寸
  ghost?: boolean // 按钮背景是否透明，仅当 type: 'primary' | 'danger' 时生效
  buttonClass?: string // 设置按钮类名
  rippleColor?: string // 点击时的波纹颜色，一般不需要设置，默认会根据 type 自动匹配，主要用于自定义样式时且 type: 'default'
  href?: string // 点击跳转的地址，与 a 链接的 href 属性一致
  target?: '_self' | '_blank' // 如何打开目标链接，相当于 a 链接的 target 属性，href 存在时生效
  keyboard?: boolean // 是否支持键盘操作
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否加载中
  loadingType?: 'static' | 'dynamic' // 加载指示符类型
  block?: boolean // 是否将按钮宽度调整为其父宽度
}
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  shape: 'default',
  icon: undefined,
  size: 'middle',
  ghost: false,
  rippleColor: undefined,
  buttonClass: undefined,
  href: undefined,
  target: '_self',
  keyboard: true,
  disabled: false,
  loading: false,
  loadingType: 'dynamic',
  block: false
})
const presetRippleColors = {
  default: '#1677ff',
  reverse: '#1677ff',
  primary: '#1677ff',
  danger: '#ff4d4f',
  dashed: '#1677ff',
  text: 'transparent',
  link: 'transparent'
}
const wave = ref(false)
const emit = defineEmits(['click'])
const slotsExist = useSlotsExist(['icon', 'default'])
const showIcon = computed(() => {
  return slotsExist.icon || props.icon
})
const showIconOnly = computed(() => {
  return showIcon.value && !slotsExist.default
})
function onClick(e: Event) {
  if (wave.value) {
    wave.value = false
    nextTick(() => {
      wave.value = true
    })
  } else {
    wave.value = true
  }
  emit('click', e)
}
function onKeyboard(e: KeyboardEvent) {
  onClick(e)
}
function onWaveEnd() {
  wave.value = false
}
</script>
<template>
  <component
    :is="href ? 'a' : 'div'"
    tabindex="0"
    class="m-btn"
    :class="[
      `btn-${type} btn-${size}`,
      {
        [`loading-${size}`]: !href && loading,
        'btn-icon-only': showIconOnly,
        'btn-circle': shape === 'circle',
        'btn-round': shape === 'round',
        'btn-loading-blur': !href && loading,
        'btn-ghost': ghost,
        'btn-block': block,
        'btn-disabled': disabled
      },
      buttonClass
    ]"
    :style="`--ripple-color: ${rippleColor || presetRippleColors[type]};`"
    :href="href"
    :target="target"
    @click="disabled || loading ? () => false : onClick($event)"
    @keydown.enter.prevent="keyboard && !disabled && !loading ? onKeyboard($event) : () => false"
  >
    <div v-if="loading || !showIcon" class="btn-loading">
      <div v-if="!href && loadingType === 'static'" class="m-static-circle">
        <svg class="circle" width="1em" height="1em" fill="currentColor" viewBox="0 0 100 100">
          <path
            d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
            stroke-linecap="round"
            class="path"
            fill-opacity="0"
          ></path>
        </svg>
      </div>
      <div v-if="!href && loadingType === 'dynamic'" class="m-dynamic-circle">
        <svg class="circle" viewBox="0 0 50 50" width="1em" height="1em" fill="currentColor">
          <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
        </svg>
      </div>
    </div>
    <span v-if="!loading && showIcon" class="btn-icon">
      <slot name="icon">
        <component v-if="icon" :is="icon" />
      </slot>
    </span>
    <span v-if="slotsExist.default" class="btn-content">
      <slot></slot>
    </span>
    <div v-if="!disabled" class="button-wave" :class="{ 'wave-active': wave }" @animationend="onWaveEnd"></div>
  </component>
</template>
<style lang="less" scoped>
@primary: #1677ff;
@danger: #ff4d4f;
.m-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  line-height: 1.5714285714285714;
  color: rgba(0, 0, 0, 0.88);
  white-space: nowrap;
  text-align: center;
  background-color: transparent;
  border: 1px solid transparent;
  outline: none;
  user-select: none;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  .btn-loading {
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    opacity: 0;
    width: 0;
    transition:
      margin-right 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .m-static-circle,
    .m-dynamic-circle {
      display: inline-flex;
      justify-content: start;
      .circle .path {
        stroke: currentColor;
      }
    }
    .m-static-circle {
      .circle {
        animation: spinCircle 0.8s linear infinite;
        -webkit-animation: spinCircle 0.8s linear infinite;
        .path {
          stroke-width: 10;
          stroke-dashoffset: 0;
          stroke-dasharray: 84.82px, 282.74px;
        }
      }
    }
    .m-dynamic-circle {
      .circle {
        animation: spinCircle 2s linear infinite;
        -webkit-animation: spinCircle 2s linear infinite;
        .path {
          stroke-width: 5;
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          animation: loadingDash 1.5s ease-in-out infinite;
          -webkit-animation: loadingDash 1.5s ease-in-out infinite;
          @keyframes loadingDash {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -40px;
            }
            100% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -124px;
            }
          }
        }
      }
    }
    @keyframes spinCircle {
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .btn-icon,
  .btn-content {
    display: inline-flex;
    align-items: center;
    :deep(svg) {
      fill: currentColor;
    }
  }
  .button-wave {
    position: absolute;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    animation-iteration-count: 1;
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1), cubic-bezier(0, 0, 0.2, 1);
    border-radius: inherit;
  }
  .wave-active {
    z-index: 1;
    animation-name: waveSpread, waveOpacity;
    @keyframes waveSpread {
      from {
        box-shadow: 0 0 0.5px 0 var(--ripple-color);
      }
      to {
        box-shadow: 0 0 0.5px 5.5px var(--ripple-color);
      }
    }
    @keyframes waveOpacity {
      from {
        opacity: 0.6;
      }
      to {
        opacity: 0;
      }
    }
  }
  & > .btn-icon + .btn-content {
    margin-left: 8px;
  }
}
.btn-default {
  background-color: #ffffff;
  border-color: #d9d9d9;
  &:hover {
    color: #4096ff !important;
    border-color: #4096ff;
  }
  &:active {
    color: #0958d9 !important;
    border-color: #0958d9;
  }
  .btn-icon {
    :deep(svg) {
      transition: fill 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.btn-reverse {
  .btn-default();
  &:hover {
    color: #fff !important;
    background-color: #4096ff;
    border-color: #4096ff;
  }
  &:active {
    color: #fff !important;
    background-color: #0958d9;
    border-color: #0958d9;
  }
}
.btn-primary {
  color: #fff;
  background-color: @primary;
  border-color: @primary;
  &:hover {
    color: #fff;
    background-color: #4096ff;
    border-color: #4096ff;
  }
  &:active {
    color: #fff;
    background-color: #0958d9;
    border-color: #0958d9;
  }
}
.btn-danger {
  color: #fff;
  background-color: @danger;
  border-color: @danger;
  &:hover {
    color: #fff;
    background-color: #ff7875;
    border-color: #ff7875;
  }
  &:active {
    color: #fff;
    background-color: #d9363e;
    border-color: #d9363e;
  }
}
.btn-dashed {
  .btn-default();
  border-style: dashed;
}
.btn-text {
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.15);
  }
}
.btn-link {
  color: @primary;
  &:hover {
    color: #4096ff;
  }
  &:active {
    color: #0958d9;
  }
  .btn-icon {
    :deep(svg) {
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.btn-small {
  font-size: 14px;
  height: 24px;
  padding: 0 7px;
  border-radius: 4px;
}
.btn-middle {
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
}
.btn-large {
  font-size: 16px;
  height: 40px;
  padding: 6.428571428571429px 15px;
  border-radius: 8px;
}
.loading-small,
.loading-middle {
  .btn-loading {
    margin-right: 8px;
    width: 1em;
    opacity: 1;
  }
}
.loading-large {
  .btn-loading {
    margin-right: 8px;
    width: 1em;
    opacity: 1;
  }
}
.btn-icon-only {
  width: 32px;
  padding-left: 0;
  padding-right: 0;
  .btn-loading,
  .btn-icon {
    transform: scale(1.143);
  }
  .btn-loading {
    margin-right: 0;
  }
}
.btn-small.btn-icon-only {
  width: 24px;
  padding-left: 0;
  padding-right: 0;
}
.btn-large.btn-icon-only {
  width: 40px;
  padding-left: 0;
  padding-right: 0;
}
.btn-circle {
  min-width: 32px;
  padding-left: 0;
  padding-right: 0;
  border-radius: 50%;
}
.btn-small.btn-circle {
  min-width: 24px;
  padding-left: 0;
  padding-left: 0;
  border-radius: 50%;
}
.btn-large.btn-circle {
  min-width: 40px;
  padding-left: 0;
  padding-right: 0;
  border-radius: 50%;
}
.btn-round {
  border-radius: 32px;
  padding-left: 16px;
  padding-right: 16px;
}
.btn-small.btn-round {
  border-radius: 24px;
  padding-left: 12px;
  padding-right: 12px;
}
.btn-large.btn-round {
  border-radius: 40px;
  padding-left: 20px;
  padding-right: 20px;
}
.btn-icon-only.btn-round,
.btn-small.btn-icon-only.btn-round,
.btn-large.btn-icon-only.btn-round {
  width: auto;
}
.btn-loading-blur {
  opacity: 0.65;
  pointer-events: none;
}
.btn-primary.btn-ghost:not(.btn-disabled) {
  color: @primary;
  border-color: @primary;
  background-color: transparent;
  &:hover {
    color: #4096ff;
    border-color: #4096ff;
  }
  &:active {
    color: #0958d9;
    border-color: #0958d9;
  }
  .btn-icon {
    :deep(svg) {
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.btn-danger.btn-ghost:not(.btn-disabled) {
  color: @danger;
  border-color: @danger;
  background-color: transparent;
  &:hover {
    color: #ff7875;
    border-color: #ff7875;
  }
  &:active {
    color: #d9363e;
    border-color: #d9363e;
  }
  .btn-icon {
    :deep(svg) {
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.btn-block {
  width: 100%;
}
.btn-disabled {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  &:not(.btn-text, .btn-link) {
    border-color: #d9d9d9;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:not(.btn-text, .btn-link):hover,
  &:not(.btn-text, .btn-link):active {
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25) !important;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &.btn-text:hover,
  &.btn-text:active {
    background-color: transparent;
  }
  &.btn-link:hover,
  &.btn-link:active {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
