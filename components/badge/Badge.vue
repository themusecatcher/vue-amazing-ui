<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import SingleNumber from './SingleNumber'
import { useSlotsExist } from 'components/utils'
export type PresetColor =
  | 'pink'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'green'
  | 'blue'
  | 'purple'
  | 'geekblue'
  | 'magenta'
  | 'volcano'
  | 'gold'
  | 'lime'
export type Status = 'success' | 'processing' | 'default' | 'error' | 'warning'

export interface Props {
  color?: PresetColor | string // 自定义小圆点的颜色，优先级高于 status
  value?: number | string // 展示的数字或文字，为数字时大于 max 显示为 max+，为 0 时隐藏
  max?: number // 展示封顶的数字值
  showZero?: boolean // 当数值为 0 时，是否展示 Badge
  dot?: boolean // 不展示数字，只有一个小红点
  offset?: [number | string, number | string] // 设置状态点的位置偏移，距默认位置左侧、上方的偏移量 [x, y]: [水平偏移, 垂直偏移]
  status?: Status // 设置 Badge 为状态点
  text?: string // 在设置了 status 或 color 的前提下有效，设置状态点的文本
  valueStyle?: CSSProperties // 设置徽标的样式
  zIndex?: number // 设置徽标的 z-index
  title?: string // 设置鼠标放在状态点上时显示的文字
  ripple?: boolean // 是否开启涟漪动画效果
}
// 声明组件插槽类型
export interface BadgeSlots {
  default?: () => VNode[]
  value?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  value: undefined,
  max: 99,
  showZero: false,
  dot: false,
  offset: undefined,
  status: undefined,
  text: undefined,
  valueStyle: () => ({}),
  zIndex: 9,
  title: undefined,
  ripple: false
})
defineSlots<BadgeSlots>()
const presetColors: string[] = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
]
const slotsExist = useSlotsExist(['default', 'value'])
const customStyle = computed(() => {
  if (props.color && !presetColors.includes(props.color)) {
    if ((props.value !== undefined && props.value !== 0) || (props.showZero && props.value === 0)) {
      return {
        backgroundColor: props.color
      }
    } else {
      return {
        color: props.color,
        backgroundColor: props.color
      }
    }
  }
})
const presetClass = computed(() => {
  if (props.color) {
    if (presetColors.includes(props.color)) {
      if ((props.value !== undefined && props.value !== 0) || (props.showZero && props.value === 0)) {
        return `color-${props.color} white`
      } else {
        return `color-${props.color}`
      }
    }
  }
  if (props.status) {
    if ((props.value !== undefined && props.value !== 0) || (props.showZero && props.value === 0)) {
      return `status-${props.status} white`
    } else {
      return `status-${props.status}`
    }
  }
  return
})
const showContent = computed(() => {
  if (props.value !== undefined || props.dot || (!props.color && !props.status)) {
    return slotsExist.default
  }
  return false
})
const showValue = computed(() => {
  if (!props.color && !props.status) {
    return slotsExist.value
  }
  return false
})
const showBadge = computed(() => {
  if ((props.value !== undefined && props.value !== 0) || (props.showZero && props.value === 0) || props.dot) {
    return true
  }
  return false
})
// 超过 max 时限顶展示，如 100 → 99+
const numberedDisplay = computed(() => {
  if (typeof props.value === 'number' && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})
// 缓存实际用于渲染的数值与 dot 状态：badge 即将隐藏时不再跟随入参更新，
// 保证离场动画期间展示的仍是隐藏前的数字
const renderedValue = ref<number | string | undefined>(numberedDisplay.value)
const renderedDot = ref(props.dot)
watch(
  [() => props.value, numberedDisplay, () => props.dot, () => props.showZero],
  () => {
    if (!showBadge.value) return
    renderedValue.value = numberedDisplay.value
    renderedDot.value = props.dot
  },
  { immediate: true }
)
// 是否仅以小圆点展示（不展示数字）
const renderedShowDot = computed(() => {
  return renderedValue.value === undefined || (renderedValue.value === 0 && !props.showZero) || renderedDot.value
})
// 仅整数值逐位渲染以支持滚动动画，其余（如 max+ 等非整数值）直接渲染文本
const renderedNumberList = computed<string[] | null>(() => {
  const value = renderedValue.value
  if (!value || Number(value) % 1 !== 0) {
    return null
  }
  return String(value).split('')
})
// 传入数字位的完整数值，用于判断滚动方向
const renderedNumberCount = computed(() => Number(renderedValue.value))
const dotOffestStyle = computed(() => {
  if (props.offset?.length) {
    return {
      right: isNumber(props.offset[0]) ? -props.offset[0] + 'px' : handleOffset(props.offset[0] as string),
      marginTop: isNumber(props.offset[1]) ? props.offset[1] + 'px' : props.offset[1]
    }
  }
  return {}
})
function isNumber(value: number | string): boolean {
  return typeof value === 'number'
}
function handleOffset(value: string): string {
  if (value.includes('-')) {
    return value.replace('-', '')
  } else {
    return `-${value}`
  }
}
</script>
<template>
  <div
    class="badge-wrap"
    :class="{ 'badge-status-color': value === undefined && (color || status) }"
    :style="[`--badge-z-index: ${zIndex}`, value === undefined && !dot ? dotOffestStyle : null]"
  >
    <template v-if="value === undefined && !dot && (color || status)">
      <span class="status-dot" :class="[presetClass, { 'dot-ripple': ripple }]" :style="customStyle"></span>
      <span class="status-text">
        <slot>{{ text }}</slot>
      </span>
    </template>
    <template v-else>
      <template v-if="showContent">
        <slot></slot>
      </template>
      <span v-if="showValue" class="value" :class="{ 'only-number': !showContent }">
        <slot name="value"></slot>
      </span>
      <Transition
        name="zoom"
        enter-from-class="zoom-enter"
        enter-active-class="zoom-enter"
        enter-to-class="zoom-enter"
        leave-from-class="zoom-leave"
        leave-active-class="zoom-leave"
        leave-to-class="zoom-leave"
        v-else
      >
        <div
          v-if="showBadge"
          class="badge-value"
          :class="[
            {
              'small-num': String(renderedValue).length <= 1,
              'only-number': !showContent,
              'only-dot': renderedShowDot
            },
            presetClass
          ]"
          :style="[customStyle, dotOffestStyle, valueStyle]"
          :title="title || (renderedValue !== undefined ? String(renderedValue) : '')"
        >
          <template v-if="!renderedDot && renderedNumberList">
            <SingleNumber
              v-for="(num, index) in renderedNumberList"
              :key="renderedNumberList.length - index"
              :value="num"
              :count="renderedNumberCount"
            />
          </template>
          <span v-else-if="!renderedDot">{{ renderedValue }}</span>
        </div>
      </Transition>
    </template>
  </div>
</template>
<style lang="less" scoped>
.zoom-enter {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.12, 0.4, 0.29, 1.46);
  animation-fill-mode: both;
  animation-name: zoomBadgeIn;
  @keyframes zoomBadgeIn {
    0% {
      transform: scale(0) translate(50%, -50%);
      opacity: 0;
    }
    100% {
      transform: scale(1) translate(50%, -50%);
    }
  }
}
.zoom-leave {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.12, 0.4, 0.29, 1.46);
  animation-fill-mode: both;
  animation-name: zoomBadgeOut;
  @keyframes zoomBadgeOut {
    0% {
      transform: scale(1) translate(50%, -50%);
    }
    100% {
      transform: scale(0) translate(50%, -50%);
      opacity: 0;
    }
  }
}
// 无外层内容（纯数字 / 圆点）时改用不带位移的缩放动画，
// 避免 @keyframes 的 transform 覆盖静态定位
.only-number.zoom-enter {
  animation-name: noWrapperZoomBadgeIn;
  @keyframes noWrapperZoomBadgeIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
    }
  }
}
.only-number.zoom-leave {
  animation-name: noWrapperZoomBadgeOut;
  @keyframes noWrapperZoomBadgeOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
}
.badge-wrap {
  position: relative;
  display: inline-block;
  width: fit-content;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1;
  .status-dot {
    position: relative;
    top: -1px;
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .dot-ripple {
    &::after {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-width: 1px;
      border-style: solid;
      border-color: inherit;
      border-radius: 50%;
      animation-name: dotRipple;
      animation-duration: 1.2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      content: '';
    }
    @keyframes dotRipple {
      0% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      100% {
        transform: scale(2.4);
        opacity: 0;
      }
    }
  }
  .status-text {
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
  }
  .value {
    position: absolute;
    top: 0;
    z-index: var(--badge-z-index);
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0%;
  }
  .badge-value {
    .value();
    overflow: hidden;
    padding: 0 8px;
    min-width: 20px;
    height: 20px;
    color: #ffffff;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #ff4d4f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #ffffff;
    transition: background 0.2s;
    .number-value {
      position: relative;
      display: inline-block;
      vertical-align: top;
      height: 20px;
      transition: all 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d; // 设置元素的子元素是位于 3D 空间中还是平面中 flat | preserve-3d
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden; // 当元素背面朝向观察者时是否可见 hidden | visible
      :deep(.number) {
        display: block;
        height: 20px;
        margin: 0;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
    }
  }
  .small-num {
    padding: 0;
  }
  .only-number {
    position: relative;
    top: auto;
    display: block;
    transform-origin: 50% 50%;
    transform: none;
  }
  .only-dot {
    width: 6px;
    min-width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #ffffff;
    padding: 0;
    transition: background 0.3s;
  }
  .status-success {
    color: #52c41a;
    background-color: #52c41a;
  }
  .status-error {
    color: #ff4d4f;
    background-color: #ff4d4f;
  }
  .status-default {
    color: rgba(0, 0, 0, 0.25);
    background-color: rgba(0, 0, 0, 0.25);
  }
  .status-processing {
    color: #1677ff;
    background-color: #1677ff;
  }
  .status-warning {
    color: #faad14;
    background-color: #faad14;
  }
  .color-pink {
    color: #eb2f96;
    background-color: #eb2f96;
  }
  .color-red {
    color: #f5222d;
    background-color: #f5222d;
  }
  .color-yellow {
    color: #fadb14;
    background-color: #fadb14;
  }
  .color-orange {
    color: #fa8c16;
    background-color: #fa8c16;
  }
  .color-cyan {
    color: #13c2c2;
    background-color: #13c2c2;
  }
  .color-green {
    color: #52c41a;
    background-color: #52c41a;
  }
  .color-blue {
    color: #1677ff;
    background-color: #1677ff;
  }
  .color-purple {
    color: #722ed1;
    background-color: #722ed1;
  }
  .color-geekblue {
    color: #2f54eb;
    background-color: #2f54eb;
  }
  .color-magenta {
    color: #eb2f96;
    background-color: #eb2f96;
  }
  .color-volcano {
    color: #fa541c;
    background-color: #fa541c;
  }
  .color-gold {
    color: #faad14;
    background-color: #faad14;
  }
  .color-lime {
    color: #a0d911;
    background-color: #a0d911;
  }
  .white {
    color: #ffffff;
  }
}
.badge-status-color {
  line-height: inherit;
  vertical-align: baseline;
}
</style>
