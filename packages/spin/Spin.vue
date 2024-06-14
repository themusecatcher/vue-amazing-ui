<script setup lang="ts">
interface Props {
  spinning?: boolean // 是否为加载中状态
  size?: 'small' | 'default' | 'large' // 组件大小，可选 small default large
  tip?: string // 描述文案
  indicator?:
    | 'dot'
    | 'spin-dot'
    | 'spin-line'
    | 'quarter-circle'
    | 'half-circle'
    | 'three-quarters-circle'
    | 'dynamic-circle' // 加载指示符
  color?: string // 主题颜色
  rotate?: boolean // spin-dot 或 spin-line 初始是否旋转，仅当 indicator: spin-dot | spin-line 时生效
  speed?: number // spin-dot 或 spin-line 渐变旋转的动画速度，单位ms，仅当 indicator: spin-dot | spin-line 时生效
}
withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'default',
  tip: '',
  indicator: 'dot',
  color: '#1677FF',
  rotate: false,
  speed: 600
})
</script>
<template>
  <div :class="`m-spin-wrap spin-${size}`" :style="`--color: ${color}; --speed: ${speed}ms;`">
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
        <div v-if="indicator === 'quarter-circle'" class="u-quarter-circle"></div>
        <div v-if="indicator === 'half-circle'" class="u-half-circle"></div>
        <div v-if="indicator === 'three-quarters-circle'" class="u-three-quarters-circle"></div>
        <div v-if="indicator === 'dynamic-circle'" class="m-dynamic-circle">
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
        </div>
        <p class="u-tip" v-show="tip">{{ tip }}</p>
      </div>
    </div>
    <div :class="['m-spin-content', { 'm-spin-mask': spinning }]">
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
  pointer-events: none;
}
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
        } // to { transform: rotate(405deg); }
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
        } // to { transform: rotate(360deg); }
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
    .u-quarter-circle {
      display: inline-block;
      border-radius: 50%;
      border-style: solid;
      border-color: transparent;
      border-top-color: var(--color); // 显示上1/4圆
      animation: loading-circle 1s infinite linear;
      -webkit-animation: loading-circle 1s infinite linear;
    }
    .u-half-circle {
      display: inline-block;
      border-radius: 50%;
      border-style: solid;
      border-color: transparent;
      border-top-color: var(--color); // 显示上1/4圆
      border-right-color: var(--color); // 显示右1/4圆
      animation: loading-circle 1s infinite linear;
      -webkit-animation: loading-circle 1s infinite linear;
    }
    .u-three-quarters-circle {
      display: inline-block;
      border-radius: 50%;
      border-style: solid;
      border-color: var(--color);
      border-top-color: transparent; // 隐藏1/4圆
      animation: loading-circle 1s infinite linear;
      -webkit-animation: loading-circle 1s infinite linear;
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
        @keyframes loading-rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        .path {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          stroke-width: 5;
          stroke: var(--color);
          stroke-linecap: round;
          animation: loading-dash 1.5s ease-in-out infinite;
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
    .u-tip {
      color: var(--color);
      text-align: center;
    }
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
    .u-quarter-circle {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }
    .u-half-circle {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }
    .u-three-quarters-circle {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }
    .m-dynamic-circle {
      width: 26px;
      height: 26px;
    }
    .u-tip {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      margin-top: 6px;
    }
  }
}
.spin-default {
  .m-spin .m-spin-box {
    .m-loading-dot {
      width: 28px;
      height: 28px;
      .u-dot-item {
        width: 10px;
        height: 10px;
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
    .u-quarter-circle {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }
    .u-half-circle {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }
    .u-three-quarters-circle {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }
    .m-dynamic-circle {
      width: 34px;
      height: 34px;
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
      width: 36px;
      height: 36px;
      .u-dot-item {
        width: 12px;
        height: 12px;
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
    .u-quarter-circle {
      width: 40px;
      height: 40px;
      border-width: 4px;
    }
    .u-half-circle {
      width: 40px;
      height: 40px;
      border-width: 4px;
    }
    .u-three-quarters-circle {
      width: 40px;
      height: 40px;
      border-width: 4px;
    }
    .m-dynamic-circle {
      width: 40px;
      height: 40px;
    }
    .u-tip {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      margin-top: 14px;
    }
  }
}
.m-spin-content {
  transition: opacity 0.3s;
}
.m-spin-mask {
  user-select: none;
  pointer-events: none;
  opacity: 0.4;
}
</style>
