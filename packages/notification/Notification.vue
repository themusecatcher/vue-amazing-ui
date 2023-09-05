<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
interface Props {
  message?: string // 全局通知提醒标题，优先级低于 Notification 中的 message
  duration?: number|null // 自动关闭的延时时长，单位ms，默认4500ms；设置 null 时，不自动关闭
  top?: number // 消息从顶部弹出时，距离顶部的位置，单位px
  bottom?: number // 消息从底部弹出时，距离底部的位置，单位px
  placement?: 'topLeft'|'topRight'|'bottomLeft'|'bottomRight' // 消息弹出位置，优先级低于 Notification 中的 placement
}
const props = withDefaults(defineProps<Props>(), {
  message: '温馨提示',
  duration: 4500,
  top: 24,
  bottom: 24,
  placement: 'topRight'
})
enum ColorStyle { // 颜色主题对象
  info = '#1677FF',
  success = '#52c41a',
  error = '#ff4d4f',
  warning = '#faad14'
}
interface Notification {
  message?: string // 通知提醒标题
  description: string // 通知提醒内容
  mode?: 'open'|'info'|'success'|'warning'|'error' // 通知提醒类型
  placement?: 'topLeft'|'topRight'|'bottomLeft'|'bottomRight' // 通知提醒弹出位置
}
const resetTimer = ref()
const hideIndex = ref<number[]>([])
const hideTimers = ref<any[]>([])
const notificationData = ref<Array<Notification>>([])
const place = ref<any>(props.placement)
const notification = ref()
const clear = computed(() => {
  // 所有提示是否已经全部变为false
  return hideIndex.value.length === notificationData.value.length
})
watch(clear, (to, from) => { // 所有提示都消失后重置
  if (!from && to) {
    resetTimer.value = rafTimeout(() => {
      hideIndex.value.splice(0)
      notificationData.value.splice(0)
    }, 300)
  }
})
function onEnter (index: number) {
  cancelRaf(hideTimers.value[index])
  hideTimers.value[index] = null
}
function onLeave (index: number) {
  if (props.duration) {
    hideTimers.value[index] = rafTimeout(() => {
      onClose(index)
    }, props.duration)
  }
}
function show () {
  cancelRaf(resetTimer.value)
  hideTimers.value.push(null)
  const index = notificationData.value.length - 1
  nextTick(() => {
    notification.value[index].style.height = notification.value[index].offsetHeight + 'px'
    notification.value[index].style.opacity = 1
  })
  if (notificationData.value[index].placement) {
    place.value = notificationData.value[index].placement
  }
  if (props.duration) {
    hideTimers.value[index] = rafTimeout(() => {
      onClose(index)
    }, props.duration)
  }
}
function open (data: Notification) {
  notificationData.value.push({
    ...data,
    mode: 'open'
  })
  show()
}
function info (data: Notification) {
  notificationData.value.push({
    ...data,
    mode: 'info'
  })
  show()
}
function success (data: Notification) {
  notificationData.value.push({
    ...data,
    mode: 'success'
  })
  show()
}
function error (data: Notification) {
  notificationData.value.push({
    ...data,
    mode: 'error'
  })
  show()
}
function warning (data: Notification) {
  notificationData.value.push({
    ...data,
    mode: 'warning'
  })
  show()
}
defineExpose({
  open,
  info,
  success,
  error,
  warning
})
const emit = defineEmits(['close'])
function onClose (index: number) {
  hideIndex.value.push(index)
  emit('close')
}
</script>
<template>
  <div
    :class="['m-notification-wrapper', place]"
    :style="`top: ${['topRight', 'topLeft'].includes(place) ? top : 'auto'}px; bottom: ${['bottomRight', 'bottomLeft'].includes(place) ? bottom : ''}px;`">
    <TransitionGroup :name="['topRight', 'bottomRight'].includes(place) ? 'right':'left'">
      <div
        ref="notification"
        class="m-notification"
        v-show="!hideIndex.includes(index)"
        @mouseenter="onEnter(index)"
        @mouseleave="onLeave(index)"
        v-for="(data, index) in notificationData" :key="index">
        <div class="m-notification-content">
          <svg v-if="data.mode==='info'" class="u-svg" :style="`fill: ${ColorStyle[data.mode]}`" viewBox="64 64 896 896" data-icon="info-circle" aria-hidden="true" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
          <svg v-if="data.mode==='success'" class="u-svg" :style="`fill: ${ColorStyle[data.mode]}`" viewBox="64 64 896 896" data-icon="check-circle" aria-hidden="true" focusable="false"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
          <svg v-if="data.mode==='warning'" class="u-svg" :style="`fill: ${ColorStyle[data.mode]}`" viewBox="64 64 896 896" data-icon="exclamation-circle" aria-hidden="true" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>
          <svg v-if="data.mode==='error'" class="u-svg" :style="`fill: ${ColorStyle[data.mode]}`" viewBox="64 64 896 896" data-icon="close-circle" aria-hidden="true" focusable="false"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
          <div :class="['u-title', {'mb4': data.mode!=='open', 'ml36': data.mode!=='open'}]">{{ data.message || message }}</div>
          <p :class="['u-description', {'ml36': data.mode!=='open'}]">{{ data.description || '--' }}</p>
          <svg class="u-close" @click="onClose(index)"  viewBox="64 64 896 896" data-icon="close" aria-hidden="true" focusable="false"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
.right-move, /* 对移动中的元素应用的过渡 */
.right-enter-active,
.right-leave-active,
.left-move,
.left-enter-active,
.left-leave-active {
  transition: all .2s;
}
.right-enter-from {
  transform: translateX(100%);
  -ms-transform: translateX(100%); /* IE 9 */
  -webkit-transform: translateX(100%); /* Safari and Chrome */
  opacity: 0;
}
.right-leave-to,
.left-leave-to {
  height: 0 !important;
  opacity: 0 !important;
}
/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.right-leave-active {
  position: absolute;
  right: 0;
}
.left-enter-from {
  transform: translateX(-100%);
  -ms-transform: translateX(-100%); /* IE 9 */
  -webkit-transform: translateX(-100%); /* Safari and Chrome */
  opacity: 0;
}
.left-leave-active {
  position: absolute;
  left: 0;
}
.topRight,
.bottomRight {
  margin-right: 24px;
  right: 0;
}
.topLeft,
.bottomLeft {
  margin-left: 24px;
  left: 0;
}
.m-notification-wrapper {
  position: fixed;
  z-index: 999; // 突出显示该层级
  color: rgba(0, 0, 0, .88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  margin-inline-end: 24px;
  .m-notification {
    overflow: hidden;
    margin-bottom: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
    .m-notification-content {
      position: relative;
      width: 384px;
      max-width: calc(100vw - 48px);
      margin-inline-start: auto;
      padding: 20px 24px;
      line-height: 1.5714285714285714;
      word-wrap: break-word;
      .u-svg {
        position: absolute;
        display: inline-block;
        width: 24px;
        height: 24px;
      }
      .u-title {
        padding-right: 24px;
        margin-bottom: 8px;
        font-size: 16px;
        color: rgba(0, 0, 0, .88);
        line-height: 1.5;
      }
      .u-description {
        font-size: 14px;
      }
      .mb4 {
        margin-bottom: 4px;
      }
      .ml36 {
        margin-left: 36px;
      }
      .u-close {
        display: inline-block;
        position: absolute;
        top: 25px;
        right: 24px;
        width: 14px;
        height: 14px;
        fill: rgba(0, 0, 0, .45);
        cursor: pointer;
        transition: fill .3s;
        &:hover {
          fill: rgba(0, 0, 0, .75);
        }
      }
    }
  }
}
</style>
