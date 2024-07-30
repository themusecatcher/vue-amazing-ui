<script setup lang="ts">
import { ref, nextTick } from 'vue'
interface Props {
  type?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 按钮类型
  size?: 'small' | 'middle' | 'large' // 按钮尺寸
  ghost?: boolean // 按钮背景是否透明，仅当 type: 'primary' | 'danger' 时生效
  rippleColor?: string // 点击时的波纹颜色，一般不需要设置，默认会根据 type 自动匹配，主要用于自定义样式时且 type: 'default'
  href?: string // 点击跳转的地址，与 a 链接的 href 属性一致
  target?: '_self' | '_blank' // 如何打开目标链接，相当于 a 链接的 target 属性，href 存在时生效
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否加载中
  loadingType?: 'static' | 'dynamic' // 加载指示符类型
  loadingColor?: string // 加载指示符颜色，一般不需要设置，默认会根据 type 自动匹配，主要用于自定义样式时且 type: 'default'
  block?: boolean // 是否将按钮宽度调整为其父宽度
}
withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'middle',
  ghost: false,
  rippleColor: undefined,
  href: undefined,
  target: '_self',
  disabled: false,
  loading: false,
  loadingType: 'dynamic',
  loadingColor: 'rgba(0, 0, 0, 0.88)',
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
function onClick(e: Event) {
  emit('click', e)
  if (wave.value) {
    wave.value = false
    nextTick(() => {
      wave.value = true
    })
  } else {
    wave.value = true
  }
}
function onKeyboard(e: KeyboardEvent) {
  onClick(e)
}
function onWaveEnd() {
  wave.value = false
}
</script>
<template>
  <a
    tabindex="0"
    class="m-btn"
    :class="[
      `btn-${type} btn-${size}`,
      {
        [`loading-${size}`]: !href && loading,
        'btn-loading': !href && loading,
        'btn-ghost': ghost,
        'btn-block': block,
        'btn-disabled': disabled
      }
    ]"
    :style="`--ripple-color: ${rippleColor || presetRippleColors[type]}; --loading-color: ${loadingColor};`"
    :disabled="disabled"
    :href="href ? href : 'javascript:void(0);'"
    :target="href ? target : '_self'"
    @click="onClick"
    @keydown.enter.prevent="onKeyboard"
    v-bind="$attrs"
  >
    <div v-if="!href && loadingType === 'static'" class="m-static-circle">
      <span class="u-spin-circle"></span>
    </div>
    <div v-if="!href && loadingType === 'dynamic'" class="m-dynamic-circle">
      <svg class="circular" viewBox="0 0 50 50" fill="currentColor">
        <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </div>
    <span class="u-text">
      <slot></slot>
    </span>
    <div v-if="!disabled" class="m-button-wave" :class="{ 'button-wave-active': wave }" @animationend="onWaveEnd"></div>
  </a>
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
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  outline: none;
  user-select: none;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  .m-static-circle {
    display: inline-flex;
    justify-content: start;
    opacity: 0;
    width: 0;
    transition:
      padding-right 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .u-spin-circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      border-top-color: inherit;
      animation: loading-circle 1s linear infinite;
      -webkit-animation: loading-circle 1s linear infinite;
    }
    @keyframes loading-circle {
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .m-dynamic-circle {
    display: inline-flex;
    justify-content: start;
    opacity: 0;
    width: 0;
    transition:
      padding-right 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .circular {
      width: 14px;
      height: 14px;
      animation: loading-rotate 2s linear infinite;
      -webkit-animation: loading-rotate 2s linear infinite;
      @keyframes loading-rotate {
        100% {
          transform: rotate(360deg);
        }
      }
      .path {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 5;
        stroke-linecap: round;
        animation: loading-dash 1.5s ease-in-out infinite;
        -webkit-animation: loading-dash 1.5s ease-in-out infinite;
        @keyframes loading-dash {
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
            stroke-dashoffset: -120px;
          }
        }
      }
    }
  }
  .u-text {
    display: inline-flex;
    align-items: center;
  }
  .m-button-wave {
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
  .button-wave-active {
    z-index: 1;
    animation-name: button-wave-spread, button-wave-opacity;
    @keyframes button-wave-spread {
      from {
        box-shadow: 0 0 0.5px 0 var(--ripple-color);
      }
      to {
        box-shadow: 0 0 0.5px 5.5px var(--ripple-color);
      }
    }
    @keyframes button-wave-opacity {
      from {
        opacity: 0.6;
      }
      to {
        opacity: 0;
      }
    }
  }
}
.btn-default {
  background-color: #ffffff;
  border-color: #d9d9d9;
  &:hover {
    color: #4096ff;
    border-color: #4096ff;
  }
  &:active {
    color: #0958d9;
    border-color: #0958d9;
  }
  .m-static-circle .u-spin-circle {
    border-top-color: var(--loading-color);
  }
  .m-dynamic-circle .circular .path {
    stroke: var(--loading-color);
  }
}
.btn-reverse {
  .btn-default();
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
.btn-primary {
  color: #fff;
  background-color: @primary;
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
  .m-dynamic-circle .circular .path {
    stroke: #fff;
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
  .m-dynamic-circle .circular .path {
    stroke: #fff;
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
  .m-dynamic-circle .circular .path {
    stroke: rgba(0, 0, 0, 0.88);
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
  .m-dynamic-circle .circular .path {
    stroke: @primary;
  }
}
.btn-small {
  font-size: 14px;
  height: 24px;
  padding: 0px 7px;
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
  .m-static-circle .u-spin-circle,
  .m-dynamic-circle .circular {
    width: 16px;
    height: 16px;
  }
}
.loading-small,
.loading-middle {
  .m-static-circle,
  .m-dynamic-circle {
    padding-right: 8px;
    width: 22px;
    opacity: 1;
  }
}
.loading-large {
  .m-static-circle,
  .m-dynamic-circle {
    padding-right: 8px;
    width: 24px;
    opacity: 1;
  }
}
.btn-loading {
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
  .m-dynamic-circle .circular .path {
    stroke: @primary;
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
  .m-dynamic-circle .circular .path {
    stroke: @danger;
  }
}
.btn-block {
  width: 100%;
}
.btn-disabled {
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.04);
  cursor: not-allowed;
  &:hover,
  &:active {
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
    background-color: rgba(0, 0, 0, 0.04);
  }
  &.text,
  &.link {
    background-color: transparent;
    border: none;
  }
  .m-dynamic-circle .circular .path {
    stroke: rgba(0, 0, 0, 0.25);
  }
}
</style>
