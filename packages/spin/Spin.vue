<script setup lang="ts">
interface Props {
  spinning?: boolean // 是否为加载中状态
  size?: string // 组件大小，可选 small default large
  tip?: string // 描述文案 string
  indicator?: 'dot'|'static-circle'|'dynamic-circle' // 加载指示符 string
}
withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'default',
  tip: '',
  indicator: 'dot'
})
</script>
<template>
  <div :class="`m-spin-wrap ${size}`">
    <div class="m-spin" v-show="spinning">
      <div class="m-spin-box">
        <div class="m-spin-dot" v-if="indicator==='dot'">
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
        </div>
        <div v-if="indicator==='static-circle'" class="u-spin-circle"></div>
        <div v-if="indicator==='dynamic-circle'" class="m-dynamic-circle">
          <div class="m-dynamic-layer">
            <div class="m-circle-left">
              <svg class="u-left-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="90" stroke-dasharray="491" stroke-dashoffset="246"></circle></svg>
            </div>
            <div class="m-circle-right">
              <svg class="u-right-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="90" stroke-dasharray="491" stroke-dashoffset="246"></circle></svg>
            </div>
          </div>
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.m-spin-wrap {
  position: relative;
  height: 100%;
  width: 100%;
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
    .m-spin-dot {
      position: relative;
      display: inline-block;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg); /* Internet Explorer */
      -moz-transform: rotate(45deg); /* Firefox */
      -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
      -o-transform: rotate(45deg); /* Opera */
      animation: loadingDot 1.2s infinite linear;
      -webkit-animation: loadingDot 1.2s infinite linear;
      @keyframes loadingDot {
        100% {
          transform: rotate(405deg);
        } // to {transform: rotate(405deg);}
      }
      .u-dot-item { // 单个圆点样式
        position: absolute;
        background: @themeColor;
        border-radius: 50%;
        opacity: .3;
        animation: spinMove 1s linear infinite alternate;
        -webkit-animation: spinMove 1s linear infinite alternate;
        @keyframes spinMove {
          100% {opacity: 1;}
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
    .u-spin-circle {
      display: inline-block;
      border-radius: 50%;
      border-style: solid;
      border-color: @themeColor;
      border-top-color: transparent; // 隐藏1/4圆
      animation: loadingCircle 1s infinite linear;
      -webkit-animation: loadingCircle 1s infinite linear;
      @keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .m-dynamic-circle {
      display: inline-flex;
      position: relative;
      animation: loading-container-rotate 1568.2352941176ms linear infinite;
      @keyframes loading-container-rotate {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      .m-dynamic-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
        @keyframes loading-layer-rotate {
          12.5% {
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
          }
          25% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
          }
          37.5% {
            -webkit-transform: rotate(405deg);
            transform: rotate(405deg);
          }
          50% {
            -webkit-transform: rotate(540deg);
            transform: rotate(540deg);
          }
          62.5% {
            -webkit-transform: rotate(675deg);
            transform: rotate(675deg);
          }
          75% {
            -webkit-transform: rotate(810deg);
            transform: rotate(810deg);
          }
          87.5% {
            -webkit-transform: rotate(945deg);
            transform: rotate(945deg);
          }
          100% {
            -webkit-transform: rotate(1080deg);
            transform: rotate(1080deg);
          }
        }
        .m-circle-left {
          display: inline-flex;
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
          .u-left-svg {
            width: 200%;
            stroke: @themeColor;
            fill: transparent;
            position: absolute;
            height: 100%;
            overflow: hidden;
            animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
            @keyframes loading-left-spin {
              0% {
                -webkit-transform: rotate(265deg);
                transform: rotate(265deg);
              }
              50% {
                -webkit-transform: rotate(130deg);
                transform: rotate(130deg);
              }
              100% {
                -webkit-transform: rotate(265deg);
                transform: rotate(265deg);
              }
            }
          }
        }
        .m-circle-right {
          display: inline-flex;
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
          .u-right-svg {
            left: -100%;
            width: 200%;
            stroke: @themeColor;
            fill: transparent;
            position: absolute;
            height: 100%;
            overflow: hidden;
            animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
            @keyframes loading-right-spin {
              0% {
                -webkit-transform: rotate(-265deg);
                transform: rotate(-265deg);
              }
              50% {
                -webkit-transform: rotate(-130deg);
                transform: rotate(-130deg);
              }
              100% {
                -webkit-transform: rotate(-265deg);
                transform: rotate(-265deg);
              }
            }
          }
        }
      }
    }
    .u-tip {
      color: @themeColor;
      text-align: center;
    }
  }
}
.large {
  .m-spin .m-spin-box {
    .m-spin-dot {
      width: 36px;
      height: 36px;
      .u-dot-item {
        width: 12px;
        height: 12px;
      }
    }
    .u-spin-circle {
      width: 40px;
      height: 40px;
      border-width: 5px;
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
.default {
  .m-spin .m-spin-box {
    .m-spin-dot {
      width: 28px;
      height: 28px;
      .u-dot-item {
        width: 10px;
        height: 10px;
      }
    }
    .u-spin-circle {
      width: 32px;
      height: 32px;
      border-width: 4px;
    }
    .m-dynamic-circle {
      width: 32px;
      height: 32px;
    }
    .u-tip {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      margin-top: 10px;
    }
  }
}
.small {
  .m-spin .m-spin-box {
    .m-spin-dot {
      width: 20px;
      height: 20px;
      .u-dot-item {
        width: 8px;
        height: 8px;
      }
    }
    .u-spin-circle {
      width: 24px;
      height: 24px;
      border-width: 3px;
    }
    .m-dynamic-circle {
      width: 24px;
      height: 24px;
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
  opacity: 0.4;
}
</style>
