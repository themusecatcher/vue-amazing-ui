<script setup lang="ts">
enum Status {
  success = 'success',
  process = 'processing',
  default = 'default',
  error = 'error',
  warn = 'warn'
}
interface Props {
  color?: string // 自定义小圆点的颜色
  count?: number|string // 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
  dot?: boolean // 不展示数字，只有一个小红点
  status?: Status // 设置 Badge 为状态点
  text?: string // 在设置了 status 的前提下有效，设置状态点的文本 string | slot
}
const props = withDefaults(defineProps<Props>(), {
  color: '',
  count: undefined,
  dot: false,
  status: Status.default,
  text: ''
})
</script>
<template>
  <div class="m-badge">
    <span class="u-status-dot" :class="`status-${status}`"></span>
    <span class="u-status-text">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-badge {
  line-height: inherit;
  vertical-align: baseline;
  color: rgba(0, 0, 0, .88);
  font-size: 14px;
  position: relative;
  display: inline-block;
  width: fit-content;
  .u-status-dot {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
    &::after {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      inset-inline-start: 0;
      width: 100%;
      height: 100%;
      border-width: 1px;
      border-style: solid;
      border-color: inherit;
      border-radius: 50%;
      animation-name: antStatusProcessing;
      animation-duration: 1.2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      content: "";
    }
    @keyframes antStatusProcessing {
      0% {
        transform: scale(.8);
        opacity: .5;
      }
      100% {
        transform: scale(2.4);
        opacity: 0;
      }
    }
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
    color: rgba(0, 0, 0, .25);
    background-color: rgba(0, 0, 0, .25);
  }
  .status-processing {
    color: #1677ff;
    background-color: #1677ff;
  }
  .status-warn {
    color: #faad14;
    background-color: #faad14;
  }
  .u-status-text {
    margin-inline-start: 8px;
    color: rgba(0, 0, 0, .88);
    font-size: 14px;
  }
}
</style>
