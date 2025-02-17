<script setup lang="ts">
import { computed } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Gradient {
  '0%'?: string
  '100%'?: string
  from?: string
  to?: string
  direction?: 'left' | 'right' // 默认 'right'
}
export interface Props {
  width?: number | string // 进度条宽度，单位 px；type: 'line' 时，为进度条宽度，默认值 '100%'；type: 'circle' 时，为进度圈宽高，默认值 120
  percent?: number // 当前进度百分比
  lineSize?: number // 进度条的尺寸，单位 px；type: 'line' 时，为进度条线高，默认值 8；type: 'circle' 时，单位是进度圈画布宽度的百分比，默认值 6
  lineColor?: string | Gradient // 进度条的色彩，传入 string 时为纯色，传入 Gradient 时为渐变，进度圈时 direction: 'left' 为逆时针，direction: 'right' 为顺时针
  lineCap?: 'round' | 'butt' // 进度条边缘的形状
  showInfo?: boolean // 是否显示进度数值或状态图标
  infoSize?: number // 进度数值或状态图标的尺寸，单位 px；type: 'line' 时，默认值 14；type: 'circle' 时，默认值 24
  success?: string // 进度完成时的信息 string | slot
  format?: (percent: number) => string | number // 内容的模板函数 function | slot
  type?: 'line' | 'circle' // 进度条类型
}
const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  percent: 0,
  lineSize: undefined,
  lineColor: '#1677FF',
  lineCap: 'round',
  showInfo: true,
  infoSize: undefined,
  success: undefined,
  format: (percent: number) => percent + '%',
  type: 'line'
})
const slotsExist = useSlotsExist(['success'])
const progressSize = computed(() => {
  // 进度条宽度；进度圈宽高
  if (props.width === undefined) {
    if (props.type === 'line') {
      return '100%'
    }
    if (props.type === 'circle') {
      return '120px'
    }
  }
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})
const progressLineSize = computed(() => {
  // 进度条高度；进度圈线宽
  if (props.lineSize === undefined) {
    if (props.type === 'line') {
      return 8
    }
    if (props.type === 'circle') {
      return 6
    }
  }
  return props.lineSize as number
})
const progressInfoSize = computed(() => {
  // 进度条/圈进度数值或状态图标尺寸
  if (props.infoSize === undefined) {
    if (props.type === 'line') {
      return '14px'
    }
    if (props.type === 'circle') {
      return '24px'
    }
  }
  return `${props.infoSize}px`
})
const perimeter = computed(() => {
  // 圆条周长
  return (100 - progressLineSize.value) * Math.PI
})
const path = computed(() => {
  // 圆条轨道路径指令
  const long = 100 - progressLineSize.value
  return `M 50,50 m 0,-${long / 2}
   a ${long / 2},${long / 2} 0 1 1 0,${long}
   a ${long / 2},${long / 2} 0 1 1 0,-${long}`
})
const gradientColor = computed(() => {
  // 是否为渐变色
  return typeof props.lineColor !== 'string'
})
const lineColor = computed(() => {
  // 进度条/圈颜色
  if (typeof props.lineColor === 'string') {
    return props.lineColor
  } else {
    return `linear-gradient(to ${props.lineColor.direction || 'right'}, ${props.lineColor['0%'] || props.lineColor.from}, ${props.lineColor['100%'] || props.lineColor.to})`
  }
})
const circleGradient = computed(() => {
  // 进度圈渐变色 id
  if (gradientColor.value) {
    const gradientColor = props.lineColor as Gradient
    if (gradientColor.direction === undefined || gradientColor.direction === 'right') {
      return `right-${gradientColor['0%'] || gradientColor.from}-${gradientColor['100%'] || gradientColor.to}`
    } else {
      return `left-${gradientColor['100%'] || gradientColor.to}-${gradientColor['0%'] || gradientColor.from}`
    }
  }
  return null
})
const circleColorFrom = computed(() => {
  if (gradientColor.value) {
    const gradientColor = props.lineColor as Gradient
    if (gradientColor.direction === undefined || gradientColor.direction === 'right') {
      return gradientColor['0%'] || gradientColor.from
    } else {
      return gradientColor['100%'] || gradientColor.to
    }
  }
  return
})
const circleColorTo = computed(() => {
  if (gradientColor.value) {
    const gradientColor = props.lineColor as Gradient
    if (!gradientColor.direction || gradientColor.direction === 'right') {
      return gradientColor['100%'] || gradientColor.to
    } else {
      return gradientColor['0%'] || gradientColor.from
    }
  }
  return
})
const showPercent = computed(() => {
  return props.format(props.percent > 100 ? 100 : props.percent)
})
const showSuccess = computed(() => {
  return slotsExist.success || props.success
})
</script>
<template>
  <div
    v-if="type === 'line'"
    class="m-progress-line"
    :style="`
      --progress-size: ${progressSize};
      --success-color: #52c41a;
      --info-size: ${progressInfoSize};
    `"
  >
    <div class="progress-inner">
      <div
        :class="['progress-bg', { 'line-success': percent >= 100 && !gradientColor }]"
        :style="`background: ${lineColor}; width: ${percent >= 100 ? 100 : percent}%; height: ${progressLineSize}px; --border-radius: ${lineCap === 'round' ? '100px' : 0};`"
      ></div>
    </div>
    <template v-if="showInfo">
      <Transition name="fade" mode="out-in">
        <span v-if="percent >= 100" class="progress-success">
          <svg
            v-if="showSuccess === undefined"
            class="icon-svg"
            focusable="false"
            data-icon="check-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
            ></path>
          </svg>
          <p v-else class="progress-success-info">
            <slot name="success">{{ success }}</slot>
          </p>
        </span>
        <p v-else class="progress-text">
          <slot name="format" :percent="percent">{{ showPercent }}</slot>
        </p>
      </Transition>
    </template>
  </div>
  <div
    v-else
    class="m-progress-circle"
    :style="`--progress-size: ${progressSize}; --success-color: #52c41a; --info-size: ${progressInfoSize};`"
  >
    <svg class="progress-circle" viewBox="0 0 100 100">
      <defs v-if="gradientColor">
        <linearGradient :id="`${circleGradient}`" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" :stop-color="circleColorFrom as string"></stop>
          <stop offset="100%" :stop-color="circleColorTo as string"></stop>
        </linearGradient>
      </defs>
      <path
        :d="path"
        :stroke-linecap="lineCap"
        class="circle-trail"
        :stroke-width="progressLineSize"
        :style="`stroke-dasharray: ${perimeter}px, ${perimeter}px;`"
        fill-opacity="0"
      ></path>
      <path
        :d="path"
        :stroke-linecap="lineCap"
        class="circle-path"
        :class="{ 'circle-path-success': percent >= 100 && !gradientColor }"
        :stroke-width="progressLineSize"
        :stroke="gradientColor ? `url(#${circleGradient})` : lineColor"
        :style="`stroke-dasharray: ${(percent / 100) * perimeter}px, ${perimeter}px;`"
        :opacity="percent === 0 ? 0 : 1"
        fill-opacity="0"
      ></path>
    </svg>
    <template v-if="showInfo">
      <Transition name="fade" mode="out-in">
        <svg
          v-if="showSuccess === undefined && percent >= 100"
          class="icon-svg"
          focusable="false"
          data-icon="check"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
          ></path>
        </svg>
        <p v-else-if="percent >= 100" class="progress-success-info">
          <slot name="success">{{ success }}</slot>
        </p>
        <p v-else class="progress-text">
          <slot name="format" :percent="percent">{{ showPercent }}</slot>
        </p>
      </Transition>
    </template>
  </div>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.m-progress-line {
  display: flex;
  align-items: center;
  width: var(--progress-size);
  .progress-inner {
    width: 100%;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 100px;
    overflow: hidden;
    .progress-bg {
      position: relative;
      background-color: #1677ff;
      border-radius: var(--border-radius);
      transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      &::after {
        content: '';
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.5) 100%);
        animation: progressRipple 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes progressRipple {
        0% {
          position: absolute;
          inset: 0;
          right: 100%;
          opacity: 1;
        }
        66% {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        100% {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
      }
    }
    .line-success {
      background: var(--success-color) !important;
    }
  }
  .progress-success {
    width: 40px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    padding-left: 8px;
    flex-shrink: 0; // 默认 1.即空间不足时，项目将缩小
    .icon-svg {
      display: inline-block;
      font-size: var(--info-size);
      fill: currentColor;
      color: var(--success-color);
    }
    .progress-success-info {
      flex-shrink: 0; // 默认 1.即空间不足时，项目将缩小
      width: 40px;
      font-size: var(--info-size);
      padding-left: 8px;
      color: var(--success-color);
    }
  }
  .progress-text {
    /*
      如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小
      如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
    */
    flex-shrink: 0; // 默认 1.即空间不足时，项目将缩小
    min-width: 40px;
    font-size: var(--info-size);
    padding-left: 8px;
    color: rgba(0, 0, 0, 0.88);
  }
}
.m-progress-circle {
  display: inline-block;
  position: relative;
  width: var(--progress-size);
  height: var(--progress-size);
  .progress-circle {
    .circle-trail {
      stroke: rgba(0, 0, 0, 0.06);
      stroke-dashoffset: 0;
      transition:
        stroke-dashoffset 0.3s ease 0s,
        stroke-dasharray 0.3s ease 0s,
        stroke 0.3s ease 0s,
        stroke-width 0.06s ease 0.3s,
        opacity 0.3s ease 0s;
    }
    .circle-path {
      stroke-dashoffset: 0;
      transition:
        stroke-dashoffset 0.3s ease 0s,
        stroke-dasharray 0.3s ease 0s,
        stroke 0.3s ease 0s,
        stroke-width 0.06s ease 0.3s,
        opacity 0.3s ease 0s;
    }
    .circle-path-success {
      stroke: var(--success-color) !important;
    }
  }
  .icon-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 30%;
    height: 30%;
    fill: currentColor;
    color: var(--success-color);
  }
  .progress-success-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: var(--info-size);
    line-height: 1;
    text-align: center;
    color: var(--success-color);
  }
  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: var(--info-size);
    line-height: 1;
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
