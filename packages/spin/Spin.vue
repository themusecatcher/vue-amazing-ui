<script setup lang="ts">
interface Props {
  spinning?: boolean // 是否为加载中状态
  size?: 'small'|'default'|'large' // 组件大小，可选 small default large
  tip?: string // 描述文案
  indicator?: 'dot'|'spin-dot'|'spin-line'|'quarter-circle'|'half-circle'|'three-quarters-circle'|'dynamic-circle' // 加载指示符
  color?: string // 主题颜色
}
withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'default',
  tip: '',
  indicator: 'dot',
  color: '#1677FF'
})
</script>
<template>
  <div :class="`m-spin-wrap spin-${size}`" :style="`--color: ${color};`">
    <div class="m-spin" v-show="spinning">
      <div class="m-spin-box">
        <div class="m-loading-dot" v-if="indicator==='dot'">
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
        </div>
        <div class="spin-wrap-box" v-if="indicator==='spin-dot'">
          <div class="m-spin-dot">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
          <div class="m-spin-dot spin-rotate" :class="{'spin-tip': tip}">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
        </div>
        <div class="spin-wrap-box" v-if="indicator==='spin-line'">
          <div class="m-spin-line">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
          <div class="m-spin-line spin-rotate" :class="{'spin-tip': tip}">
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
            <span class="u-spin-item"></span>
          </div>
        </div>
        <div v-if="indicator==='quarter-circle'" class="u-quarter-circle"></div>
        <div v-if="indicator==='half-circle'" class="u-half-circle"></div>
        <div v-if="indicator==='three-quarters-circle'" class="u-three-quarters-circle"></div>
        <div v-if="indicator==='dynamic-circle'" class="m-dynamic-circle">
          <svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg>
        </div>
        <p class="u-tip" v-show="tip">{{ tip }}</p>
      </div>
    </div>
    <div :class="['m-spin-content', {'m-spin-mask': spinning}]">
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
      .u-dot-item { // 单个圆点样式
        position: absolute;
        background: var(--color);
        border-radius: 50%;
        opacity: .3;
        animation: loading-dot-color 1s linear infinite alternate;
        -webkit-animation: loading-dot-color 1s linear infinite alternate;
        @keyframes loading-dot-color {
          100% { opacity: 1; }
        }
      }
      .u-dot-item:first-child {
        top: 0;
        left: 0;
      }
      .u-dot-item:nth-child(2) {
        top: 0;
        right: 0;
        animation-delay: .4s;
        -webkit-animation-delay: .4s;
      }
      .u-dot-item:nth-child(3) {
        bottom: 0;
        right: 0;
        animation-delay: .8s;
        -webkit-animation-delay: .8s;
      }
      .u-dot-item:last-child {
        bottom: 0;
        left: 0;
        animation-delay: 1.2s;
        -webkit-animation-delay: 1.2s;
      }
    }
    .spin-wrap-box {
      text-align: center;
      line-height: 0;
      position: relative;
      animation: spin-line 3s ease-in-out;
      -webkit-animation: spin-line 3s ease-in-out;
      @keyframes spin-line {
        100% {
          transform: rotate(720deg);
        } // to { transform: rotate(720deg); }
      }
      .m-spin-dot {
        position: relative;
        display: inline-block;
        .u-spin-item { // 单个圆点样式
          position: absolute;
          background: var(--color);
          border-radius: 50%;
          opacity: 1;
          animation: spin-dot-color .8s linear infinite;
          -webkit-animation: spin-dot-color .8s linear infinite;
          @keyframes spin-dot-color {
            100% {
              opacity: 0.1;
            }
          }
        }
        .u-spin-item:first-child {
          top: 0;
          left: 0;
        }
        .u-spin-item:nth-child(2) {
          top: 0;
          right: 0;
          animation-delay: .2s;
          -webkit-animation-delay: .2s;
        }
        .u-spin-item:nth-child(3) {
          bottom: 0;
          right: 0;
          animation-delay: .4s;
          -webkit-animation-delay: .4s;
        }
        .u-spin-item:last-child {
          bottom: 0;
          left: 0;
          animation-delay: .6s;
          -webkit-animation-delay: .6s;
        }
      }
      .m-spin-line {
        position: relative;
        display: inline-block;
        .u-spin-item { // 单个圆点样式
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--color);
          opacity: 1;
          animation: spin-line-color .8s linear infinite;
          -webkit-animation: spin-line-color .8s linear infinite;
          @keyframes spin-line-color {
            100% {
              opacity: 0.1;
            }
          }
        }
        .u-spin-item:nth-child(2) {
          transform: translateX(-50%) rotate(90deg);
          animation-delay: .2s;
          -webkit-animation-delay: .2s;
        }
        .u-spin-item:nth-child(3) {
          transform: translateX(-50%) rotate(180deg);
          animation-delay: .4s;
          -webkit-animation-delay: .4s;
        }
        .u-spin-item:last-child {
          transform: translateX(-50%) rotate(270deg);
          animation-delay: .6s;
          -webkit-animation-delay: .6s;
        }
      }
      .spin-rotate {
        position: absolute;
        left: 0;
        transform: rotate(45deg);
        .u-spin-item:first-child {
          animation-delay: .1s;
          -webkit-animation-delay: .1s;
        }
        .u-spin-item:nth-child(2) {
          animation-delay: .3s;
          -webkit-animation-delay: .3s;
        }
        .u-spin-item:nth-child(3) {
          animation-delay: .5s;
          -webkit-animation-delay: .5s;
        }
        .u-spin-item:last-child {
          animation-delay: .7s;
          -webkit-animation-delay: .7s;
        }
      }
      .spin-tip {
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
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
          stroke-dasharray: 90,150;
          stroke-dashoffset: 0;
          stroke-width: 5;
          stroke: var(--color);
          stroke-linecap: round;
          animation: loading-dash 1.5s ease-in-out infinite;
          @keyframes loading-dash {
            0% {
              stroke-dasharray: 1,200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90,150;
              stroke-dashoffset: -40px;
            }
            100% {
              stroke-dasharray: 90,150;
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
      @lineLength: 15px;
      width: @lineLength * 3;
      height: @lineLength * 3;
      .u-spin-item {
        transform-origin: 50% calc(@lineLength * 1.5);
        border-radius: @lineLength;
        width: calc(@lineLength / 3);
        height: @lineLength;
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
      @lineLength: 12px;
      width: @lineLength * 3;
      height: @lineLength * 3;
      .u-spin-item {
        transform-origin: 50% calc(@lineLength * 1.5);
        border-radius: @lineLength;
        width: calc(@lineLength / 3);
        height: @lineLength;
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
      @lineLength: 9px;
      width: @lineLength * 3;
      height: @lineLength * 3;
      .u-spin-item {
        transform-origin: 50% calc(@lineLength * 1.5);
        border-radius: @lineLength;
        width: calc(@lineLength / 3);
        height: @lineLength;
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
.m-spin-content {
  transition: opacity .3s;
}
.m-spin-mask {
  user-select: none;
  pointer-events: none;
  opacity: .4;
}
</style>
