<script setup lang="ts">
import { computed, inject, watch } from 'vue'
import type { Ref, VNode } from 'vue'
import { THEME_MODE_KEY } from 'components/config-provider/context'
import { deriveColorStates } from 'components/theme'
import type { ResolvedMode } from 'components/theme'
import { useSlotsExist, useWave } from 'components/utils'

export interface Props {
  type?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 设置按钮类型
  shape?: 'default' | 'circle' | 'round' // 设置按钮形状
  icon?: VNode | (() => VNode) // 设置按钮图标，支持 VNode / 渲染函数；插槽形态请用 #icon
  size?: 'small' | 'middle' | 'large' // 设置按钮尺寸
  ghost?: boolean // 按钮背景是否透明，仅当 type: 'primary' | 'danger' 时生效
  buttonClass?: string // 设置按钮类名
  color?: string // 按钮颜色
  href?: string // 点击跳转的地址，与 a 链接的 href 属性一致
  target?: '_self' | '_blank' // 如何打开目标链接，相当于 a 链接的 target 属性，href 存在时生效
  keyboard?: boolean // 是否支持键盘操作
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否加载中
  loadingType?: 'static' | 'dynamic' // 加载指示符类型
  block?: boolean // 是否将按钮宽度调整为其父宽度
}
// 声明组件插槽类型
export interface ButtonSlots {
  icon?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  shape: 'default',
  icon: undefined,
  size: 'middle',
  ghost: false,
  color: undefined,
  buttonClass: undefined,
  href: undefined,
  target: '_self',
  keyboard: true,
  disabled: false,
  loading: false,
  loadingType: 'dynamic',
  block: false
})
defineSlots<ButtonSlots>()
const { wave, waveKey, startWave, endWave } = useWave()
// 禁用时波纹节点被移除，`animationend` 也就不会再回来复位；若置为禁用发生在动画结束前，
// `wave` 会一直残留到重新启用，元素重新挂载时 `wave-active` 会让波纹凭空播一次（没有点击来源）。
// 故在进入禁用态时主动复位。
watch(
  () => props.disabled,
  (disabled: boolean) => {
    if (disabled) {
      endWave()
    }
  }
)
// 当前主题作用域的模式：实例色的 hover / active 在深浅模式取不同色阶档位，必须跟着走
const themeMode = inject<Ref<ResolvedMode> | null>(THEME_MODE_KEY, null)
// 实例色：传 color 时按该色派生主色状态并写到组件公开令牌上；未传时沿用全局别名（见样式内默认值）。
// 这里写公开名属于「实例覆盖」：inline 优先级最高，比祖先作用域更近，符合「实例 > 祖先」的直觉。
// 注意 inline 会连带压住整棵子树，所以只允许由 prop 派生的一次性写入，不要拿它当默认值。
const buttonThemeStyle = computed<Record<string, string>>(() => {
  if (props.color === undefined) {
    return {}
  }
  const states = deriveColorStates(props.color, themeMode?.value ?? 'light')
  const style: Record<string, string> = {
    '--va-button-primary-color': states.base,
    '--va-button-primary-color-hover': states.hover,
    '--va-button-primary-color-active': states.active,
    '--va-button-solid-text-color': states.solid
  }
  // 文字 / 链接按钮的波纹固定透明（见 .btn-text / .btn-link）；其余类型显式写一份，才能让实例色压过 .btn-danger 声明的波纹色
  if (props.type !== 'text' && props.type !== 'link') {
    style['--button-ripple-color'] = states.base
  }
  return style
})
const emit = defineEmits(['click'])
const slotsExist = useSlotsExist(['icon', 'default'])
const showIcon = computed(() => {
  return slotsExist.icon || props.icon
})
const showIconOnly = computed(() => {
  return showIcon.value && !slotsExist.default
})
function onClick(e: Event) {
  startWave()
  emit('click', e)
}
function onKeyboard(e: KeyboardEvent) {
  onClick(e)
}
</script>
<template>
  <component
    :is="href ? 'a' : 'div'"
    tabindex="0"
    class="btn-wrap"
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
    :style="buttonThemeStyle"
    :href="href"
    :target="target"
    @click="disabled || loading ? () => false : onClick($event)"
    @keydown.enter.prevent="keyboard && !disabled && !loading ? onKeyboard($event) : () => false"
  >
    <div v-if="loading || !showIcon" class="btn-loading">
      <div v-if="!href && loadingType === 'static'" class="static-circle">
        <svg class="circle" width="1em" height="1em" fill="currentColor" viewBox="0 0 100 100">
          <path
            d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
            stroke-linecap="round"
            class="path"
            fill-opacity="0"
          ></path>
        </svg>
      </div>
      <div v-if="!href && loadingType === 'dynamic'" class="dynamic-circle">
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
    <div
      v-if="!disabled"
      :key="waveKey"
      class="button-wave"
      :class="{ 'wave-active': wave }"
      @animationend="endWave"
    ></div>
  </component>
</template>
<style lang="less" scoped>
.btn-wrap {
  // 文本按钮的悬浮 / 按下底色跟随 fill 令牌，无「只改这个按钮」的独立意图，故保持私有
  --button-text-color-hover: var(--va-fill-color-1);
  --button-text-color-active: var(--va-fill-color-2);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  line-height: 1.5714285714285714;
  color: var(--va-text-color-1);
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
    .static-circle,
    .dynamic-circle {
      display: inline-flex;
      justify-content: start;
      .circle .path {
        stroke: currentColor;
      }
    }
    .static-circle {
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
    .dynamic-circle {
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
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    animation-iteration-count: 1;
    animation-duration: 0.4s, 2s;
    animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1), cubic-bezier(0.08, 0.82, 0.17, 1);
    animation-fill-mode: forwards;
    border-radius: inherit;
  }
  .wave-active {
    z-index: 1;
    animation-name: waveSpread, waveOpacity;
    @keyframes waveSpread {
      from {
        box-shadow: 0 0 0 0 var(--button-ripple-color, var(--va-button-primary-color, var(--va-primary-color)));
      }
      to {
        box-shadow: 0 0 0 6px var(--button-ripple-color, var(--va-button-primary-color, var(--va-primary-color)));
      }
    }
    @keyframes waveOpacity {
      from {
        opacity: 0.2;
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
  background-color: var(--va-bg-container-color);
  border-color: var(--va-border-color);
  &:hover {
    color: var(--va-button-primary-color-hover, var(--va-primary-color-hover)) !important;
    border-color: var(--va-button-primary-color-hover, var(--va-primary-color-hover));
  }
  &:active {
    color: var(--va-button-primary-color-active, var(--va-primary-color-active)) !important;
    border-color: var(--va-button-primary-color-active, var(--va-primary-color-active));
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
    color: var(--va-button-solid-text-color, var(--va-text-color-solid)) !important;
    background-color: var(--va-button-primary-color, var(--va-primary-color));
    border-color: var(--va-button-primary-color, var(--va-primary-color));
  }
  &:active {
    color: var(--va-button-solid-text-color, var(--va-text-color-solid)) !important;
    background-color: var(--va-button-primary-color-active, var(--va-primary-color-active));
    border-color: var(--va-button-primary-color-active, var(--va-primary-color-active));
  }
}
.btn-primary {
  color: var(--va-button-solid-text-color, var(--va-text-color-solid));
  background-color: var(--va-button-primary-color, var(--va-primary-color));
  border-color: var(--va-button-primary-color, var(--va-primary-color));
  &:hover {
    color: var(--va-button-solid-text-color, var(--va-text-color-solid));
    background-color: var(--va-button-primary-color-hover, var(--va-primary-color-hover));
    border-color: var(--va-button-primary-color-hover, var(--va-primary-color-hover));
  }
  &:active {
    color: var(--va-button-solid-text-color, var(--va-text-color-solid));
    background-color: var(--va-button-primary-color-active, var(--va-primary-color-active));
    border-color: var(--va-button-primary-color-active, var(--va-primary-color-active));
  }
}
.btn-danger {
  // 波纹跟随危险色：波纹的回落链默认取主色，不声明会在这里显示成蓝色
  --button-ripple-color: var(--va-button-danger-color, var(--va-error-color));
  color: var(--va-button-solid-text-color, var(--va-text-color-solid));
  background-color: var(--va-button-danger-color, var(--va-error-color));
  border-color: var(--va-button-danger-color, var(--va-error-color));
  &:hover {
    color: var(--va-button-solid-text-color, var(--va-text-color-solid));
    background-color: var(--va-button-danger-color-hover, var(--va-button-danger-color, var(--va-error-color)));
    border-color: var(--va-button-danger-color-hover, var(--va-button-danger-color, var(--va-error-color)));
  }
  &:active {
    color: var(--va-button-solid-text-color, var(--va-text-color-solid));
    background-color: var(--va-button-danger-color-active, var(--va-button-danger-color, var(--va-error-color)));
    border-color: var(--va-button-danger-color-active, var(--va-button-danger-color, var(--va-error-color)));
  }
}
.btn-dashed {
  .btn-default();
  border-style: dashed;
}
.btn-text {
  --button-ripple-color: transparent;
  &:hover {
    background-color: var(--button-text-color-hover);
  }
  &:active {
    background-color: var(--button-text-color-active);
  }
}
.btn-link {
  --button-ripple-color: transparent;
  color: var(--va-button-primary-color, var(--va-primary-color));
  &:hover {
    color: var(--va-button-primary-color-hover, var(--va-primary-color-hover));
  }
  &:active {
    color: var(--va-button-primary-color-active, var(--va-primary-color-active));
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
  color: var(--va-button-primary-color, var(--va-primary-color));
  border-color: var(--va-button-primary-color, var(--va-primary-color));
  background-color: transparent;
  &:hover {
    color: var(--va-button-primary-color-hover, var(--va-primary-color-hover));
    border-color: var(--va-button-primary-color-hover, var(--va-primary-color-hover));
  }
  &:active {
    color: var(--va-button-primary-color-active, var(--va-primary-color-active));
    border-color: var(--va-button-primary-color-active, var(--va-primary-color-active));
  }
  .btn-icon {
    :deep(svg) {
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.btn-danger.btn-ghost:not(.btn-disabled) {
  color: var(--va-button-danger-color, var(--va-error-color));
  border-color: var(--va-button-danger-color, var(--va-error-color));
  background-color: transparent;
  &:hover {
    color: var(--va-button-danger-color-hover, var(--va-button-danger-color, var(--va-error-color)));
    border-color: var(--va-button-danger-color-hover, var(--va-button-danger-color, var(--va-error-color)));
  }
  &:active {
    color: var(--va-button-danger-color-active, var(--va-button-danger-color, var(--va-error-color)));
    border-color: var(--va-button-danger-color-active, var(--va-button-danger-color, var(--va-error-color)));
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
  color: var(--va-text-color-disabled);
  cursor: not-allowed;
  &:not(.btn-text, .btn-link) {
    border-color: var(--va-border-color);
    background-color: var(--va-fill-color-1);
  }
  &:not(.btn-text, .btn-link):hover,
  &:not(.btn-text, .btn-link):active {
    border-color: var(--va-border-color);
    color: var(--va-text-color-disabled) !important;
    background-color: var(--va-fill-color-1);
  }
  &.btn-text:hover,
  &.btn-text:active {
    background-color: transparent;
  }
  &.btn-link:hover,
  &.btn-link:active {
    color: var(--va-text-color-disabled);
  }
}
</style>
