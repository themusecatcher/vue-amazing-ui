<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref, computed, onMounted } from 'vue'
enum Status {
  success = 'success',
  process = 'processing',
  default = 'default',
  error = 'error',
  warning = 'warning'
}
interface Props {
  color?: string // 自定义小圆点的颜色
  count?: number // 展示的数字，大于 max 时显示为 max+，为 0 时隐藏；number | slot
  max?: number // 展示封顶的数字值
  showZero?: boolean // 当数值为 0 时，是否展示 Badge
  dot?: boolean // 不展示数字，只有一个小红点
  status?: Status // 设置 Badge 为状态点
  text?: string // 在设置了 status 的前提下有效，设置状态点的文本 string | slot
  countStyle?: CSSProperties // 设置状态点的样式
  title?: string // 设置鼠标放在状态点上时显示的文字
  ripple?: boolean // 是否开启涟漪动画效果
}
const props = withDefaults(defineProps<Props>(), {
  color: '',
  count: 0,
  max: 99,
  showZero: false,
  dot: false,
  status: undefined,
  text: '',
  countStyle: () => ({}),
  title: '',
  ripple: true
})
const presetColor = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime']
const customStyle = computed(() => {
  if (props.color && !presetColor.includes(props.color)) {
    return {
      color: props.color,
      backgroundColor: props.color
    } 
  }
})
const contentRef = ref()
const showContent = ref(1)
const countRef = ref()
const showCount = ref(1)
onMounted(() => {
  if (!props.status && !props.color) {
    showContent.value = contentRef.value.offsetHeight
    showCount.value = countRef.value.offsetHeight
  }
})
</script>
<template>
  <div class="m-badge" :class="{'badge-status': status}">
    <template v-if="status||color">
      <span class="u-status-dot" :class="[`status-${status||color}`, {'dot-ripple': ripple}]" :style="customStyle"></span>
      <span class="u-status-text">
        <slot>{{ text }}</slot>
      </span>
    </template>
    <template v-else>
      <span ref="contentRef" v-if="showContent">
        <slot></slot>
      </span>
      <span
        ref="countRef"
        v-if="showCount"
        class="m-count"
        :class="{'only-number': !showContent}">
        <slot name="count"></slot>
      </span>
      <Transition name="zoom" v-else>
        <div
          v-show="showZero || count !== 0 || dot"
          class="m-badge-count"
          :class="{'small-num': count < 10, 'only-number': !showContent, 'only-dot': count === 0 && !showZero}"
          :style="countStyle"
          :title="title || String(count)">
          <span v-if="!dot" class="m-number" style="transition: none 0s ease 0s;">
            <span class="u-number">{{ count > max ? max + '+' : count }}</span>
          </span>
        </div>
      </Transition>
    </template>
  </div>
</template>
<style lang="less" scoped>
.zoom-enter-active {
  animation: zoomBadgeIn .3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  animation-fill-mode: both;
}
.zoom-leave-active {
  animation: zoomBadgeOut .3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  animation-fill-mode: both;
}
@keyframes zoomBadgeIn {
  0% {
    transform: scale(0) translate(50%, -50%);
    opacity: 0;
  }
  100% {
    transform: scale(1) translate(50%, -50%);
  }
}
@keyframes zoomBadgeOut {
  0% {
    transform: scale(1) translate(50%, -50%);
  }
  100% {
    transform: scale(0) translate(50%, -50%);
    opacity: 0;
  }
}
.m-badge {
  color: rgba(0, 0, 0, .88);
  font-size: 14px;
  line-height: 1;
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
  }
  .dot-ripple {
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
      animation-name: dotRipple;
      animation-duration: 1.2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      content: "";
    }
    @keyframes dotRipple {
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
  .status-warning {
    color: #faad14;
    background-color: #faad14;
  }
  .status-pink {
    color: #eb2f96;
    background-color: #eb2f96;;
  }
  .status-red {
    color: #f5222d;
    background-color: #f5222d;
  }
  .status-yellow {
    color: #fadb14;
    background-color: #fadb14;
  }
  .status-orange {
    color: #fa8c16;
    background-color: #fa8c16;
  }
  .status-cyan {
    color: #13c2c2;
    background-color: #13c2c2;
  }
  .status-green {
    color: #52c41a;
    background-color: #52c41a;
  }
  .status-blue {
    color: #1677ff;
    background-color: #1677ff;
  }
  .status-purple {
    color: #722ed1;
    background-color: #722ed1;
  }
  .status-geekblue {
    color: #2f54eb;
    background-color: #2f54eb;
  }
  .status-magenta {
    color: #eb2f96;
    background-color: #eb2f96;
  }
  .status-volcano {
    color: #fa541c;
    background-color: #fa541c;
  }
  .status-gold {
    color: #faad14;
    background-color: #faad14;
  }
  .status-lime {
    color: #a0d911;
    background-color: #a0d911;
  }
  .u-status-text {
    margin-inline-start: 8px;
    color: rgba(0, 0, 0, .88);
    font-size: 14px;
  }
  .m-count {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0%;
  }
  .m-badge-count {
    .m-count();
    overflow: hidden;
    padding: 0 8px;
    z-index: auto;
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
    transition: background .2s;
    .m-number {
      position: relative;
      display: inline-block;
      height: 20px;
      transition: all .3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d; // 设置元素的子元素是位于 3D 空间中还是平面中 flat | preserve-3d
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden; // 当元素背面朝向观察者时是否可见 hidden | visible
      .u-number {
        display: inline-block;
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
    z-index: auto;
    width: 6px;
    min-width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #ffffff;
    padding: 0;
    transition: background .3s;
  }
}
.badge-status {
  line-height: inherit;
  vertical-align: baseline;
}
</style>
