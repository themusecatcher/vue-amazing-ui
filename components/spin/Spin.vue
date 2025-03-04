<script setup lang="ts">
import { computed } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Props {
  spinning?: boolean // 是否为加载中状态
  size?: 'small' | 'middle' | 'large' // 加载中尺寸
  tip?: string // 描述文案 string | slot
  indicator?: 'dot' | 'spin-dot' | 'spin-line' | 'ring-circle' | 'ring-rail' | 'dynamic-circle' | 'magic-ring' // 加载指示符
  color?: string // 指示符颜色，当 indicator: 'magic-ring' 时为外环颜色
  spinCircleWidth?: number // 圆环宽度，单位是加载指示符宽度的百分比，仅当 indicator: 'ring-circle' | 'ring-rail' 时生效
  spinCirclePercent?: number // 圆环长度百分比 (0～100)，单位是圆环周长的百分比，仅当 indicator: 'ring-circle' | 'ring-rail' 时生效
  ringRailColor?: string // 圆环轨道颜色，仅当 indicator: 'ring-rail' 时生效
  magicRingColor?: string // 内环颜色，仅当 indicator: 'magic-ring' 时生效
  rotate?: boolean // spin-dot 或 spin-line 初始是否旋转，仅当 indicator: 'spin-dot' | 'spin-line' 时生效
  speed?: number // spin-dot 或 spin-line 渐变旋转的动画速度，单位 ms，仅当 indicator: 'spin-dot' | 'spin-line' 时生效
}
const props = withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'middle',
  tip: undefined,
  indicator: 'dot',
  color: '#1677ff',
  spinCircleWidth: 12,
  spinCirclePercent: 33,
  ringRailColor: 'rgba(0, 0, 0, 0.12)',
  magicRingColor: '#4096ff',
  rotate: false,
  speed: 800
})
const slotsExist = useSlotsExist(['tip'])
const circlePerimeter = computed(() => {
  // 圆环周长
  return (100 - props.spinCircleWidth) * Math.PI
})
const circlePath = computed(() => {
  // 圆环轨道路径指令
  const long = 100 - props.spinCircleWidth
  return `M 50,50 m 0,-${long / 2}
   a ${long / 2},${long / 2} 0 1 1 0,${long}
   a ${long / 2},${long / 2} 0 1 1 0,-${long}`
})
const showTip = computed(() => {
  return slotsExist.tip || props.tip
})
</script>
<template>
  <div
    :class="`m-spin spin-${size}`"
    :style="`--spin-color: ${color}; --spin-magic-ring-color: ${magicRingColor}; --spin-circle-width: ${spinCircleWidth}; --spin-speed: ${speed}ms;`"
  >
    <div class="spin-wrap" v-show="spinning">
      <div class="spin-box">
        <div v-if="indicator === 'dot'" class="spin-loading-dot">
          <span class="dot-item"></span>
          <span class="dot-item"></span>
          <span class="dot-item"></span>
          <span class="dot-item"></span>
        </div>
        <div v-if="indicator === 'spin-dot'" class="spin-wrap-box" :class="{ 'spin-box-rotate': rotate }">
          <div class="spin-dot-items">
            <span class="dot-item"></span>
            <span class="dot-item"></span>
            <span class="dot-item"></span>
            <span class="dot-item"></span>
          </div>
          <div class="spin-dot-items spin-rotate" :class="{ 'has-tip': tip }">
            <span class="dot-item"></span>
            <span class="dot-item"></span>
            <span class="dot-item"></span>
            <span class="dot-item"></span>
          </div>
        </div>
        <div v-if="indicator === 'spin-line'" class="spin-wrap-box" :class="{ 'spin-box-rotate': rotate }">
          <div class="spin-line-items">
            <span class="line-item"></span>
            <span class="line-item"></span>
            <span class="line-item"></span>
            <span class="line-item"></span>
          </div>
          <div class="spin-line-items spin-rotate" :class="{ 'has-tip': tip }">
            <span class="line-item"></span>
            <span class="line-item"></span>
            <span class="line-item"></span>
            <span class="line-item"></span>
          </div>
        </div>
        <div v-if="indicator === 'ring-circle'" class="spin-ring-circle">
          <svg class="circle" viewBox="0 0 100 100">
            <path
              :d="circlePath"
              stroke-linecap="round"
              class="path"
              :style="`stroke-dasharray: ${(spinCirclePercent / 100) * circlePerimeter}px, ${circlePerimeter}px;`"
              fill-opacity="0"
            ></path>
          </svg>
        </div>
        <div v-if="indicator === 'ring-rail'" class="spin-ring-rail">
          <svg class="circle" viewBox="0 0 100 100">
            <path
              :d="circlePath"
              :stroke="ringRailColor"
              stroke-linecap="round"
              class="trail"
              :style="`stroke-dasharray: ${circlePerimeter}px, ${circlePerimeter}px;`"
              fill-opacity="0"
            ></path>
            <path
              :d="circlePath"
              stroke-linecap="round"
              class="path"
              :style="`stroke-dasharray: ${(spinCirclePercent / 100) * circlePerimeter}px, ${circlePerimeter}px;`"
              fill-opacity="0"
            ></path>
          </svg>
        </div>
        <div v-if="indicator === 'dynamic-circle'" class="spin-dynamic-circle">
          <svg class="circle" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
        </div>
        <div v-if="indicator === 'magic-ring'" class="spin-magic-ring">
          <div class="outer-ring"></div>
          <div class="inner-ring"></div>
        </div>
        <div v-if="showTip" class="spin-tip" :class="{ 'dot-tip': ['dot', 'spin-dot'].includes(indicator) }">
          <slot name="tip">{{ tip }}</slot>
        </div>
      </div>
    </div>
    <div class="spin-content" :class="{ 'spin-blur': spinning }">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-spin {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .spin-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    .spin-box {
      text-align: center;
      line-height: 0;
      .spin-loading-dot {
        position: relative;
        display: inline-block;
        transform: rotate(45deg);
        animation: loadingDot 1.2s linear infinite;
        -webkit-animation: loadingDot 1.2s linear infinite;
        @keyframes loadingDot {
          100% {
            transform: rotate(405deg);
          }
        }
        .dot-item {
          // 单个圆点样式
          position: absolute;
          background: var(--spin-color);
          border-radius: 50%;
          opacity: 0.3;
          animation: loadingDotColor 1s linear infinite alternate;
          -webkit-animation: loadingDotColor 1s linear infinite alternate;
          @keyframes loadingDotColor {
            100% {
              opacity: 1;
            }
          }
        }
        .dot-item:first-child {
          top: 0;
          left: 0;
        }
        .dot-item:nth-child(2) {
          top: 0;
          right: 0;
          animation-delay: 0.4s;
          -webkit-animation-delay: 0.4s;
        }
        .dot-item:nth-child(3) {
          bottom: 0;
          right: 0;
          animation-delay: 0.8s;
          -webkit-animation-delay: 0.8s;
        }
        .dot-item:last-child {
          bottom: 0;
          left: 0;
          animation-delay: 1.2s;
          -webkit-animation-delay: 1.2s;
        }
      }
      .spin-box-rotate {
        animation: spinCircle 2.4s ease-in-out;
        -webkit-animation: spinCircle 2.4s ease-in-out;
      }
      .spin-wrap-box {
        text-align: center;
        line-height: 0;
        position: relative;
        .spin-dot-items {
          position: relative;
          display: inline-block;
          .dot-item {
            position: absolute;
            background: var(--spin-color);
            border-radius: 50%;
          }
          .dot-item:first-child {
            top: 0;
            left: 0;
            opacity: 0.3;
            animation: spinColor1 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor1 var(--spin-speed) linear infinite;
          }
          .dot-item:nth-child(2) {
            top: 0;
            right: 0;
            opacity: 0.5;
            animation: spinColor3 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor3 var(--spin-speed) linear infinite;
          }
          .dot-item:nth-child(3) {
            bottom: 0;
            right: 0;
            opacity: 0.7;
            animation: spinColor5 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor5 var(--spin-speed) linear infinite;
          }
          .dot-item:last-child {
            bottom: 0;
            left: 0;
            opacity: 0.9;
            animation: spinColor7 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor7 var(--spin-speed) linear infinite;
          }
        }
        .spin-line-items {
          position: relative;
          display: inline-block;
          .line-item {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--spin-color);
          }
          .line-item:first-child {
            opacity: 0.3;
            animation: spinColor1 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor1 var(--spin-speed) linear infinite;
          }
          .line-item:nth-child(2) {
            opacity: 0.5;
            transform: translateX(-50%) rotate(90deg);
            animation: spinColor3 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor3 var(--spin-speed) linear infinite;
          }
          .line-item:nth-child(3) {
            opacity: 0.7;
            transform: translateX(-50%) rotate(180deg);
            animation: spinColor5 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor5 var(--spin-speed) linear infinite;
          }
          .line-item:last-child {
            opacity: 0.9;
            transform: translateX(-50%) rotate(270deg);
            animation: spinColor7 var(--spin-speed) linear infinite;
            -webkit-animation: spinColor7 var(--spin-speed) linear infinite;
          }
        }
        .spin-rotate {
          position: absolute;
          left: 0;
          transform: rotate(45deg);
          .dot-item,
          .line-item {
            &:first-child {
              opacity: 0.4;
              animation: spinColor2 var(--spin-speed) linear infinite;
              -webkit-animation: spinColor2 var(--spin-speed) linear infinite;
            }
            &:nth-child(2) {
              opacity: 0.6;
              animation: spinColor4 var(--spin-speed) linear infinite;
              -webkit-animation: spinColor4 var(--spin-speed) linear infinite;
            }
            &:nth-child(3) {
              opacity: 0.8;
              animation: spinColor6 var(--spin-speed) linear infinite;
              -webkit-animation: spinColor6 var(--spin-speed) linear infinite;
            }
            &:last-child {
              opacity: 1;
              animation: spinColor8 var(--spin-speed) linear infinite;
              -webkit-animation: spinColor8 var(--spin-speed) linear infinite;
            }
          }
        }
        .has-tip {
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
        }
        @keyframes spinColor1 {
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
        @keyframes spinColor2 {
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
        @keyframes spinColor3 {
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
        @keyframes spinColor4 {
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
        @keyframes spinColor5 {
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
        @keyframes spinColor6 {
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
        @keyframes spinColor7 {
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
        @keyframes spinColor8 {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
      }
      .spin-ring-circle,
      .spin-ring-rail {
        display: inline-block;
        overflow: hidden;
        animation: spinCircle 0.8s linear infinite;
        -webkit-animation: spinCircle 0.8s linear infinite;
      }
      .circle {
        .trail {
          stroke-width: var(--spin-circle-width);
          stroke-dashoffset: 0;
        }
        .path {
          stroke: var(--spin-color);
          stroke-width: var(--spin-circle-width);
          stroke-dashoffset: 0;
        }
      }
      .spin-dynamic-circle {
        display: inline-block;
        animation: spinCircle 2s linear infinite;
        -webkit-animation: spinCircle 2s linear infinite;
        .circle {
          .path {
            stroke-width: 5;
            stroke-dasharray: 90, 150;
            stroke-dashoffset: 0;
            stroke: var(--spin-color);
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
      .spin-magic-ring {
        display: inline-block;
        position: relative;
        transform: rotate(45deg);
        animation: spinRotate 2.5s linear infinite;
        -webkit-animation: spinRotate 2.5s linear infinite;
        @keyframes spinRotate {
          100% {
            transform: rotate(405deg);
          }
        }
        .outer-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-style: solid;
          border-color: var(--spin-color);
          border-radius: 50%;
          animation: spinOuterRing 1.5s linear infinite;
          -webkit-animation: spinOuterRing 1.5s linear infinite;
          @keyframes spinOuterRing {
            100% {
              transform: rotateY(360deg);
            }
          }
        }
        .inner-ring {
          position: absolute;
          border-style: solid;
          border-color: var(--spin-magic-ring-color);
          border-radius: 50%;
          animation: spinInnerRing 1.5s linear infinite;
          -webkit-animation: spinInnerRing 1.5s linear infinite;
          @keyframes spinInnerRing {
            0% {
              transform: rotateY(45deg);
            }
            100% {
              transform: rotateY(405deg);
            }
          }
        }
      }
      .spin-tip {
        color: var(--spin-color);
        text-align: center;
      }
    }
  }
  .spin-content {
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
  .spin-wrap .spin-box {
    .spin-loading-dot {
      width: 20px;
      height: 20px;
      .dot-item {
        width: 8px;
        height: 8px;
      }
    }
    .spin-dot-items {
      width: 20px;
      height: 20px;
      .dot-item {
        width: 6px;
        height: 6px;
      }
    }
    .spin-line-items {
      --line-length: 8px;
      width: calc(var(--line-length) * 3);
      height: calc(var(--line-length) * 3);
      .line-item {
        transform-origin: 50% calc(var(--line-length) * 1.5);
        border-radius: var(--line-length);
        width: calc(var(--line-length) / 2.5);
        height: var(--line-length);
      }
    }
    .spin-ring-circle,
    .spin-ring-rail {
      width: 24px;
      height: 24px;
    }
    .spin-dynamic-circle {
      width: 26px;
      height: 26px;
    }
    .spin-magic-ring {
      width: 24px;
      height: 24px;
      .outer-ring,
      .inner-ring {
        border-width: 3px;
      }
      .inner-ring {
        top: 3px;
        left: 3px;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
      }
    }
    .spin-tip {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      margin-top: 8px;
    }
    .dot-tip {
      margin-top: 12px;
    }
  }
}
.spin-middle {
  .spin-wrap .spin-box {
    .spin-loading-dot {
      width: 30px;
      height: 30px;
      .dot-item {
        width: 11px;
        height: 11px;
      }
    }
    .spin-dot-items {
      width: 30px;
      height: 30px;
      .dot-item {
        width: 9px;
        height: 9px;
      }
    }
    .spin-line-items {
      --line-length: 12px;
      width: calc(var(--line-length) * 3);
      height: calc(var(--line-length) * 3);
      .line-item {
        transform-origin: 50% calc(var(--line-length) * 1.5);
        border-radius: var(--line-length);
        width: calc(var(--line-length) / 3);
        height: var(--line-length);
      }
    }
    .spin-ring-circle,
    .spin-ring-rail {
      width: 36px;
      height: 36px;
    }
    .spin-dynamic-circle {
      width: 38px;
      height: 38px;
    }
    .spin-magic-ring {
      width: 36px;
      height: 36px;
      .outer-ring,
      .inner-ring {
        border-width: 5px;
      }
      .inner-ring {
        top: 5px;
        left: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
      }
    }
    .spin-tip {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      margin-top: 12px;
    }
    .dot-tip {
      margin-top: 16px;
    }
  }
}
.spin-large {
  .spin-wrap .spin-box {
    .spin-loading-dot {
      width: 40px;
      height: 40px;
      .dot-item {
        width: 15px;
        height: 15px;
      }
    }
    .spin-dot-items {
      width: 40px;
      height: 40px;
      .dot-item {
        width: 12px;
        height: 12px;
      }
    }
    .spin-line-items {
      --line-length: 16px;
      width: calc(var(--line-length) * 3);
      height: calc(var(--line-length) * 3);
      .line-item {
        transform-origin: 50% calc(var(--line-length) * 1.5);
        border-radius: var(--line-length);
        width: calc(var(--line-length) / 3);
        height: var(--line-length);
      }
    }
    .spin-ring-circle,
    .spin-ring-rail {
      width: 48px;
      height: 48px;
    }
    .spin-dynamic-circle {
      width: 50px;
      height: 50px;
    }
    .spin-magic-ring {
      width: 48px;
      height: 48px;
      .outer-ring,
      .inner-ring {
        border-width: 6px;
      }
      .inner-ring {
        top: 6px;
        left: 6px;
        width: calc(100% - 12px);
        height: calc(100% - 12px);
      }
    }
    .spin-tip {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      margin-top: 16px;
    }
    .dot-tip {
      margin-top: 22px;
    }
  }
}
</style>
