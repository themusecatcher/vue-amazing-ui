<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  spinning?: boolean // 是否为加载中状态
  size?: 'small' | 'middle' | 'large' // 加载中尺寸
  tip?: string // 描述文案
  indicator?:
    | 'dot'
    | 'spin-dot'
    | 'spin-line'
    | 'quarter-circle'
    | 'half-circle'
    | 'three-quarters-circle'
    | 'ring-circle'
    | 'dynamic-circle'
    | 'magic-ring' // 加载指示符
  color?: string // 指示符颜色，当 indicator: 'magic-ring' 时为外环颜色
  magicRingColor?: string // 内环颜色，仅当 indicator: 'magic-ring' 时生效
  ringCirclePercent?: number // 内环长度百分比 (0～100)，仅当 indicator: 'ring-circle' 时生效
  ringCircleColor?: string // 圆形轨道颜色，仅当 indicator: 'ring-circle' 时生效
  rotate?: boolean // spin-dot 或 spin-line 初始是否旋转，仅当 indicator: 'spin-dot' | 'spin-line' 时生效
  speed?: number // spin-dot 或 spin-line 渐变旋转的动画速度，单位 ms，仅当 indicator: 'spin-dot' | 'spin-line' 时生效
}
const props = withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'middle',
  tip: undefined,
  indicator: 'dot',
  color: '#1677ff',
  magicRingColor: '#4096ff',
  ringCirclePercent: 33,
  ringCircleColor: 'rgba(0, 0, 0, 0.12)',
  rotate: false,
  speed: 800
})
const perimeter = computed(() => {
  // 圆环周长
  return (100 - ringCircleWidth.value) * Math.PI
})
const ringCircleWidth = computed(() => {
  const ringCircleWidthMap = {
    small: 12,
    middle: 14,
    large: 16
  }
  return ringCircleWidthMap[props.size]
})
const ringCirclePath = computed(() => {
  // 圆条轨道路径指令
  const long = 100 - ringCircleWidth.value
  return `M 50,50 m 0,-${long / 2}
   a ${long / 2},${long / 2} 0 1 1 0,${long}
   a ${long / 2},${long / 2} 0 1 1 0,-${long}`
})
</script>
<template>
  <div
    :class="`m-spin-wrap spin-${size}`"
    :style="`--color: ${color}; --magic-ring-color: ${magicRingColor}; --ring-circle-width: ${ringCircleWidth}; --speed: ${speed}ms;`"
  >
    <div class="m-spin" v-show="spinning">
      <div class="m-spin-box">
        <div class="m-loading-dot" v-if="indicator === 'dot'">
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
        </div>
        <div class="spin-wrap-box" :class="{ 'spin-wrap-rotate': rotate }" v-if="indicator === 'spin-dot'">
          <div class="m-spin-dot">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
          <div class="m-spin-dot spin-rotate" :class="{ 'spin-tip': tip }">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
        </div>
        <div class="spin-wrap-box" :class="{ 'spin-wrap-rotate': rotate }" v-if="indicator === 'spin-line'">
          <div class="m-spin-line">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
          <div class="m-spin-line spin-rotate" :class="{ 'spin-tip': tip }">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
        </div>
        <div class="m-ring-circle" v-if="indicator === 'ring-circle'">
          <svg class="ring-circle" viewBox="0 0 100 100">
            <path
              :d="ringCirclePath"
              :stroke="ringCircleColor"
              stroke-linecap="round"
              class="ring-trail"
              :style="`stroke-dasharray: ${perimeter}px, ${perimeter}px;`"
              fill-opacity="0"
            ></path>
            <path
              :d="ringCirclePath"
              stroke-linecap="round"
              class="ring-path"
              :style="`stroke-dasharray: ${(ringCirclePercent / 100) * perimeter}px, ${perimeter}px;`"
              opacity="1"
              fill-opacity="0"
            ></path>
          </svg>
        </div>
        <div v-if="indicator === 'quarter-circle'" class="m-quarter-circle part-circle">
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
        </div>
        <div v-if="indicator === 'half-circle'" class="m-half-circle part-circle">
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
        </div>
        <div v-if="indicator === 'three-quarters-circle'" class="m-three-quarters-circle part-circle">
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
        </div>
        <div v-if="indicator === 'dynamic-circle'" class="m-dynamic-circle">
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
        </div>
        <div v-if="indicator === 'magic-ring'" class="m-magic-ring">
          <div class="m-outer-ring"></div>
          <div class="u-inner-ring"></div>
        </div>
        <p class="u-tip" v-show="tip">{{ tip }}</p>
      </div>
    </div>
    <div :class="['m-spin-content', { 'spin-blur': spinning }]">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-spin-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .m-spin {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    .m-spin-box {
      text-align: center;
      line-height: 0;
      .m-loading-dot {
        position: relative;
        display: inline-block;
        transform: rotate(45deg);
        animation: loading-dot 1.2s infinite linear;
        -webkit-animation: loading-dot 1.2s infinite linear;
        @keyframes loading-dot {
          100% {
            transform: rotate(405deg);
          }
        }
        .u-dot-item {
          // 单个圆点样式
          position: absolute;
          background: var(--color);
          border-radius: 50%;
          opacity: 0.3;
          animation: loading-dot-color 1s linear infinite alternate;
          -webkit-animation: loading-dot-color 1s linear infinite alternate;
          @keyframes loading-dot-color {
            100% {
              opacity: 1;
            }
          }
        }
        .u-dot-item:first-child {
          top: 0;
          left: 0;
        }
        .u-dot-item:nth-child(2) {
          top: 0;
          right: 0;
          animation-delay: 0.4s;
          -webkit-animation-delay: 0.4s;
        }
        .u-dot-item:nth-child(3) {
          bottom: 0;
          right: 0;
          animation-delay: 0.8s;
          -webkit-animation-delay: 0.8s;
        }
        .u-dot-item:last-child {
          bottom: 0;
          left: 0;
          animation-delay: 1.2s;
          -webkit-animation-delay: 1.2s;
        }
      }
      .spin-wrap-rotate {
        animation: spin-rotate 2.4s ease-in-out;
        -webkit-animation: spin-rotate 2.4s ease-in-out;
        @keyframes spin-rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      }
      .spin-wrap-box {
        text-align: center;
        line-height: 0;
        position: relative;
        .m-spin-dot {
          position: relative;
          display: inline-block;
          .u-spin-item {
            position: absolute;
            background: var(--color);
            border-radius: 50%;
          }
          .u-spin-item:first-child {
            top: 0;
            left: 0;
            opacity: 0.3;
            animation: spin-color-1 var(--speed) linear infinite;
            -webkit-animation: spin-color-1 var(--speed) linear infinite;
          }
          .u-spin-item:nth-child(2) {
            top: 0;
            right: 0;
            opacity: 0.5;
            animation: spin-color-3 var(--speed) linear infinite;
            -webkit-animation: spin-color-3 var(--speed) linear infinite;
          }
          .u-spin-item:nth-child(3) {
            bottom: 0;
            right: 0;
            opacity: 0.7;
            animation: spin-color-5 var(--speed) linear infinite;
            -webkit-animation: spin-color-5 var(--speed) linear infinite;
          }
          .u-spin-item:last-child {
            bottom: 0;
            left: 0;
            opacity: 0.9;
            animation: spin-color-7 var(--speed) linear infinite;
            -webkit-animation: spin-color-7 var(--speed) linear infinite;
          }
        }
        .m-spin-line {
          position: relative;
          display: inline-block;
          .u-spin-item {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--color);
          }
          .u-spin-item:first-child {
            opacity: 0.3;
            animation: spin-color-1 var(--speed) linear infinite;
            -webkit-animation: spin-color-1 var(--speed) linear infinite;
          }
          .u-spin-item:nth-child(2) {
            opacity: 0.5;
            transform: translateX(-50%) rotate(90deg);
            animation: spin-color-3 var(--speed) linear infinite;
            -webkit-animation: spin-color-3 var(--speed) linear infinite;
          }
          .u-spin-item:nth-child(3) {
            opacity: 0.7;
            transform: translateX(-50%) rotate(180deg);
            animation: spin-color-5 var(--speed) linear infinite;
            -webkit-animation: spin-color-5 var(--speed) linear infinite;
          }
          .u-spin-item:last-child {
            opacity: 0.9;
            transform: translateX(-50%) rotate(270deg);
            animation: spin-color-7 var(--speed) linear infinite;
            -webkit-animation: spin-color-7 var(--speed) linear infinite;
          }
        }
        .spin-rotate {
          position: absolute;
          left: 0;
          transform: rotate(45deg);
          .u-spin-item:first-child {
            opacity: 0.4;
            animation: spin-color-2 var(--speed) linear infinite;
            -webkit-animation: spin-color-2 var(--speed) linear infinite;
          }
          .u-spin-item:nth-child(2) {
            opacity: 0.6;
            animation: spin-color-4 var(--speed) linear infinite;
            -webkit-animation: spin-color-4 var(--speed) linear infinite;
          }
          .u-spin-item:nth-child(3) {
            opacity: 0.8;
            animation: spin-color-6 var(--speed) linear infinite;
            -webkit-animation: spin-color-6 var(--speed) linear infinite;
          }
          .u-spin-item:last-child {
            opacity: 1;
            animation: spin-color-8 var(--speed) linear infinite;
            -webkit-animation: spin-color-8 var(--speed) linear infinite;
          }
        }
        .spin-tip {
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
        }
        @keyframes spin-color-1 {
          0% {
            opacity: 0.3;
          }
          14.3% {
            opacity: 1;
          }
          100% {
            opacity: 0.4;
          }
        }
        @keyframes spin-color-2 {
          0% {
            opacity: 0.4;
          }
          14.3% {
            opacity: 0.3;
          }
          28.6% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }
        @keyframes spin-color-3 {
          0% {
            opacity: 0.5;
          }
          28.6% {
            opacity: 0.3;
          }
          42.8% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }
        @keyframes spin-color-4 {
          0% {
            opacity: 0.6;
          }
          42.8% {
            opacity: 0.3;
          }
          57.1% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }
        @keyframes spin-color-5 {
          0% {
            opacity: 0.7;
          }
          57.1% {
            opacity: 0.3;
          }
          71.4% {
            opacity: 1;
          }
          100% {
            opacity: 0.8;
          }
        }
        @keyframes spin-color-6 {
          0% {
            opacity: 0.8;
          }
          71.4% {
            opacity: 0.3;
          }
          85.7% {
            opacity: 1;
          }
          100% {
            opacity: 0.9;
          }
        }
        @keyframes spin-color-7 {
          0% {
            opacity: 0.9;
          }
          85.7% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes spin-color-8 {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
      }
      .m-ring-circle {
        display: inline-block;
        overflow: hidden;
        animation: loading-circle 1s infinite linear;
        -webkit-animation: loading-circle 1s infinite linear;
        .ring-circle {
          .ring-trail {
            stroke-width: var(--ring-circle-width);
            stroke-dashoffset: 0;
            transition:
              stroke-dashoffset 0.3s ease 0s,
              stroke-dasharray 0.3s ease 0s,
              stroke 0.3s ease 0s,
              stroke-width 0.06s ease 0.3s,
              opacity 0.3s ease 0s;
          }
          .ring-path {
            stroke: var(--color);
            stroke-width: var(--ring-circle-width);
            stroke-dashoffset: 0;
            transition:
              stroke-dashoffset 0.3s ease 0s,
              stroke-dasharray 0.3s ease 0s,
              stroke 0.3s ease 0s,
              stroke-width 0.06s ease 0.3s,
              opacity 0.3s ease 0s;
          }
        }
      }
      .part-circle {
        display: inline-block;
        animation: loading-circle 1s infinite linear;
        -webkit-animation: loading-circle 1s infinite linear;
        .circular {
          display: inline-block;
          .path {
            stroke-dasharray: 31.42, 125.66;
            stroke-dashoffset: 0;
            stroke: var(--color);
            stroke-linecap: round;
          }
        }
      }
      .m-quarter-circle {
        .circular {
          .path {
            stroke-dasharray: 31.42, 125.66;
          }
        }
      }
      .m-half-circle {
        .circular {
          .path {
            stroke-dasharray: 62.83, 125.66;
          }
        }
      }
      .m-three-quarters-circle {
        .circular {
          .path {
            stroke-dasharray: 94.25, 125.66;
          }
        }
      }
      @keyframes loading-circle {
        100% {
          transform: rotate(360deg);
        }
      }
      .m-dynamic-circle {
        display: inline-block;
        .circular {
          display: inline-block;
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
            stroke: var(--color);
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
      .m-magic-ring {
        display: inline-block;
        position: relative;
        transform: rotate(45deg);
        animation: spin-rotate 2.5s linear infinite;
        -webkit-animation: spin-rotate 2.5s linear infinite;
        @keyframes spin-rotate {
          100% {
            transform: rotate(405deg);
          }
        }
        .m-outer-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-style: solid;
          border-color: var(--color);
          border-radius: 50%;
          animation: spin-outer-ring 1.5s linear infinite;
          -webkit-animation: spin-outer-ring 1.5s linear infinite;
          @keyframes spin-outer-ring {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }
        }
        .u-inner-ring {
          position: absolute;
          border-style: solid;
          border-color: var(--magic-ring-color);
          border-radius: 50%;
          animation: spin-inner-ring 1.5s linear infinite;
          -webkit-animation: spin-inner-ring 1.5s linear infinite;
          @keyframes spin-inner-ring {
            0% {
              transform: rotateY(45deg);
            }
            100% {
              transform: rotateY(405deg);
            }
          }
        }
      }
      .u-tip {
        color: var(--color);
        text-align: center;
      }
    }
  }
  .m-spin-content {
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
  }
  .spin-blur {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }
}
.spin-small {
  .m-spin .m-spin-box {
    .m-loading-dot {
      width: 20px;
      height: 20px;
      .u-dot-item {
        width: 8px;
        height: 8px;
      }
    }
    .m-spin-dot {
      width: 20px;
      height: 20px;
      .u-spin-item {
        width: 6px;
        height: 6px;
      }
    }
    .m-spin-line {
      --line-length: 8px;
      width: calc(var(--line-length) * 3);
      height: calc(var(--line-length) * 3);
      .u-spin-item {
        transform-origin: 50% calc(var(--line-length) * 1.5);
        border-radius: var(--line-length);
        width: calc(var(--line-length) / 2.5);
        height: var(--line-length);
      }
    }
    .m-ring-circle {
      width: 24px;
      height: 24px;
    }
    .m-quarter-circle,
    .m-half-circle,
    .m-three-quarters-circle,
    .m-dynamic-circle {
      width: 26px;
      height: 26px;
      .circular .path {
        stroke-width: 5;
      }
    }
    .m-magic-ring {
      width: 24px;
      height: 24px;
      .m-outer-ring,
      .u-inner-ring {
        border-width: 3px;
      }
      .u-inner-ring {
        top: 3px;
        left: 3px;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
      }
    }
    .u-tip {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      margin-top: 6px;
    }
  }
}
.spin-middle {
  .m-spin .m-spin-box {
    .m-loading-dot {
      width: 30px;
      height: 30px;
      .u-dot-item {
        width: 11px;
        height: 11px;
      }
    }
    .m-spin-dot {
      width: 30px;
      height: 30px;
      .u-spin-item {
        width: 9px;
        height: 9px;
      }
    }
    .m-spin-line {
      --line-length: 12px;
      width: calc(var(--line-length) * 3);
      height: calc(var(--line-length) * 3);
      .u-spin-item {
        transform-origin: 50% calc(var(--line-length) * 1.5);
        border-radius: var(--line-length);
        width: calc(var(--line-length) / 3);
        height: var(--line-length);
      }
    }
    .m-ring-circle {
      width: 36px;
      height: 36px;
    }
    .m-quarter-circle,
    .m-half-circle,
    .m-three-quarters-circle,
    .m-dynamic-circle {
      width: 38px;
      height: 38px;
      .circular .path {
        stroke-width: 5;
      }
    }
    .m-magic-ring {
      width: 36px;
      height: 36px;
      .m-outer-ring,
      .u-inner-ring {
        border-width: 5px;
      }
      .u-inner-ring {
        top: 5px;
        left: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
      }
    }
    .u-tip {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      margin-top: 10px;
    }
  }
}
.spin-large {
  .m-spin .m-spin-box {
    .m-loading-dot {
      width: 40px;
      height: 40px;
      .u-dot-item {
        width: 15px;
        height: 15px;
      }
    }
    .m-spin-dot {
      width: 40px;
      height: 40px;
      .u-spin-item {
        width: 12px;
        height: 12px;
      }
    }
    .m-spin-line {
      --line-length: 16px;
      width: calc(var(--line-length) * 3);
      height: calc(var(--line-length) * 3);
      .u-spin-item {
        transform-origin: 50% calc(var(--line-length) * 1.5);
        border-radius: var(--line-length);
        width: calc(var(--line-length) / 3);
        height: var(--line-length);
      }
    }
    .m-ring-circle {
      width: 48px;
      height: 48px;
    }
    .m-quarter-circle,
    .m-half-circle,
    .m-three-quarters-circle,
    .m-dynamic-circle {
      width: 50px;
      height: 50px;
      .circular .path {
        stroke-width: 6;
      }
    }
    .m-magic-ring {
      width: 48px;
      height: 48px;
      .m-outer-ring,
      .u-inner-ring {
        border-width: 6px;
      }
      .u-inner-ring {
        top: 6px;
        left: 6px;
        width: calc(100% - 12px);
        height: calc(100% - 12px);
      }
    }
    .u-tip {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      margin-top: 14px;
    }
  }
}
</style>
