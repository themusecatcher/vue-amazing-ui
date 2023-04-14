<script setup lang="ts">
interface Props {
  spinning?: boolean // 是否为加载中状态
  size?: string // 组件大小，可选small default large
  tip?: string // 描述文案 string | slot
  indicator?: string // 加载指示符 string
}
withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'default',
  tip: '',
  indicator: 'dot' // 可选 dot | circle
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
        <div v-if="indicator==='circle'" class="u-spin-circle"></div>
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
        100% {transform: rotate(405deg);} // to {transform: rotate(405deg);}
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
    }
    @keyframes loadingCircle {
      100% {
        transform: rotate(360deg);
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
        width: 13px;
        height: 13px;
      }
    }
    .u-spin-circle {
      width: 40px;
      height: 40px;
      border-width: 5px;
    }
    .u-tip {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      padding-top: 10px;
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
    .u-tip {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      padding-top: 6px;
    }
  }
}
.small {
  .m-spin .m-spin-box {
    .m-spin-dot {
      width: 20px;
      height: 20px;
      .u-dot-item {
        width: 7px;
        height: 7px;
      }
    }
    .u-spin-circle {
      width: 24px;
      height: 24px;
      border-width: 3px;
    }
    .u-tip {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      padding-top: 4px;
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
