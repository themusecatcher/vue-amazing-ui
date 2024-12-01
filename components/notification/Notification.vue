<script setup lang="ts">
import { ref, computed, watch, watchEffect, nextTick } from 'vue'
import type { VNode, CSSProperties } from 'vue'
import { rafTimeout, cancelRaf } from 'components/utils'
export interface Props {
  title?: string // 通知提醒标题，优先级低于 Notification 中的 title
  description?: string // 通知提醒内容，优先级低于 Notification 中的 description
  duration?: number | null // 自动关闭的延时时长，单位 ms；设置 null 时，不自动关闭，优先级低于 Notification 中的 duration
  top?: number // 消息从顶部弹出时，距离顶部的位置，单位 px
  bottom?: number // 消息从底部弹出时，距离底部的位置，单位 px
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' // 消息弹出位置，优先级低于 Notification 中的 placement
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  duration: 4500,
  top: 24,
  bottom: 24,
  placement: 'topRight'
})
export interface Notification {
  title?: string // 通知提醒标题
  description?: string // 通知提醒内容
  icon?: VNode // 自定义图标
  class?: string // 自定义类名
  style?: CSSProperties // 自定义样式
  duration?: number | null // 自动关闭的延时时长，单位 ms；设置 null 时，不自动关闭
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' // 通知提醒弹出位置
  onClose?: Function // 关闭时的回调函数
}
const resetTimer = ref()
const hideIndex = ref<number[]>([])
const hideTimers = ref<any[]>([])
const notificationData = ref<any[]>([])
const closeDuration = ref<number | null>(null) // 自动关闭延时
const notificationPlace = ref() // 弹出位置
const notificationRef = ref() // notificationData 数组的 DOM 引用
const emit = defineEmits(['close'])
const topStyle = computed(() => {
  if (['topRight', 'topLeft'].includes(notificationPlace.value)) {
    return {
      top: `${props.top}px`
    }
  }
  return {}
})
const bottomStyle = computed(() => {
  if (['bottomRight', 'bottomLeft'].includes(notificationPlace.value)) {
    return {
      bottom: `${props.bottom}px`
    }
  }
  return {}
})
const clear = computed(() => {
  // 所有提示是否已经全部变为 false
  return hideIndex.value.length === notificationData.value.length
})
watch(
  clear,
  (to, from) => {
    // 所有提示都消失后重置
    if (!from && to) {
      resetTimer.value = rafTimeout(() => {
        hideIndex.value.splice(0)
        notificationData.value.splice(0)
      }, 300)
    }
  },
  {
    flush: 'post'
  }
)
watchEffect(() => {
  notificationPlace.value = props.placement
})
function onEnter(index: number) {
  stopAutoClose(index)
}
function onLeave(index: number) {
  if (!hideIndex.value.includes(index)) {
    autoClose(index)
  }
}
function stopAutoClose(index: number) {
  hideTimers.value[index] && cancelRaf(hideTimers.value[index])
  hideTimers.value[index] = null
}
function autoClose(index: number) {
  if (closeDuration.value !== null) {
    hideTimers.value[index] = rafTimeout(() => {
      onClose(index)
    }, closeDuration.value)
  }
}
async function onClose(index: number) {
  notificationRef.value[index].style.maxHeight = notificationRef.value[index].offsetHeight + 'px'
  await nextTick()
  hideIndex.value.push(index)
  notificationData.value[index].onClose && notificationData.value[index].onClose()
  emit('close')
}
function show() {
  resetTimer.value && cancelRaf(resetTimer.value)
  hideTimers.value.push(null)
  const index = notificationData.value.length - 1
  const last = notificationData.value[index]
  if (last.placement) {
    notificationPlace.value = last.placement
  }
  if (last.duration !== null) {
    closeDuration.value = last.duration || props.duration
    autoClose(index)
  } else {
    closeDuration.value = null
  }
}
function open(notification: Notification) {
  notificationData.value.push({
    ...notification,
    mode: 'open'
  })
  show()
}
function info(notification: Notification) {
  notificationData.value.push({
    ...notification,
    mode: 'info'
  })
  show()
}
function success(notification: Notification) {
  notificationData.value.push({
    ...notification,
    mode: 'success'
  })
  show()
}
function error(notification: Notification) {
  notificationData.value.push({
    ...notification,
    mode: 'error'
  })
  show()
}
function warning(notification: Notification) {
  notificationData.value.push({
    ...notification,
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
</script>
<template>
  <div
    class="m-notification-wrap"
    :class="`notification-${notificationPlace}`"
    :style="{ ...topStyle, ...bottomStyle }"
  >
    <TransitionGroup :name="['topRight', 'bottomRight'].includes(notificationPlace) ? 'right' : 'left'">
      <div
        v-show="!hideIndex.includes(index)"
        ref="notificationRef"
        class="m-notification-content"
        :class="[`icon-${notification.mode}`, notification.class]"
        :style="notification.style"
        v-for="(notification, index) in notificationData"
        :key="index"
        @mouseenter="onEnter(index)"
        @mouseleave="onLeave(index)"
      >
        <component v-if="notification.icon" :is="notification.icon" class="icon-svg" />
        <svg
          v-else-if="notification.mode === 'info'"
          class="icon-svg"
          viewBox="64 64 896 896"
          data-icon="info-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          ></path>
          <path
            d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
          ></path>
        </svg>
        <svg
          v-else-if="notification.mode === 'success'"
          class="icon-svg"
          viewBox="64 64 896 896"
          data-icon="check-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
          ></path>
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          ></path>
        </svg>
        <svg
          v-else-if="notification.mode === 'warning'"
          class="icon-svg"
          viewBox="64 64 896 896"
          data-icon="exclamation-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          ></path>
          <path
            d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
          ></path>
        </svg>
        <svg
          v-else-if="notification.mode === 'error'"
          class="icon-svg"
          viewBox="64 64 896 896"
          data-icon="close-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
          ></path>
          <path
            d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          ></path>
        </svg>
        <div class="notification-content">
          <div class="notification-title">{{ notification.title || title }}</div>
          <div class="notification-description">{{ notification.description || description }}</div>
        </div>
        <a tabindex="0" class="notification-close" @click="onClose(index)">
          <svg
            class="close-svg"
            viewBox="64 64 896 896"
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            ></path>
          </svg>
        </a>
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
.right-move, // 对移动中的元素应用的过渡
.right-enter-active,
.right-leave-active,
.left-move,
.left-enter-active,
.left-leave-active {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.right-leave-to,
.left-leave-to {
  max-height: 0 !important;
  opacity: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
.right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.right-leave-active {
  position: absolute;
  right: 0;
}
.left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.left-leave-active {
  position: absolute;
  left: 0;
}
.m-notification-wrap {
  position: fixed;
  z-index: 999; // 突出显示该层级
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  margin-right: 24px;
  .m-notification-content {
    position: relative;
    display: flex;
    width: 384px;
    max-width: calc(100vw - 48px);
    margin-bottom: 16px;
    margin-left: auto;
    padding: 20px 24px;
    overflow: hidden;
    line-height: 1.5714285714285714;
    word-break: break-all;
    background: #fff;
    border-radius: 8px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    :deep(.icon-svg) {
      flex-shrink: 0;
      display: inline-block;
      font-size: 24px;
      fill: currentColor;
      margin-right: 12px;
      svg {
        fill: currentColor;
      }
    }
    .notification-content {
      width: 100%;
      .notification-title {
        padding-right: 24px;
        margin-bottom: 8px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.5;
      }
      .notification-description {
        font-size: 14px;
      }
    }
    .notification-close {
      position: absolute;
      top: 20px;
      right: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.45);
      outline: none;
      width: 22px;
      height: 22px;
      border-radius: 4px;
      transition:
        background-color 0.2s,
        color 0.2s;
      .close-svg {
        display: inline-block;
        font-size: 14px;
        fill: currentColor;
        transition: color 0.2s;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.06);
        .close-svg {
          color: rgba(0, 0, 0, 0.88);
        }
      }
    }
  }
  .icon-info {
    :deep(.icon-svg) {
      color: @themeColor;
    }
  }
  .icon-success {
    :deep(.icon-svg) {
      color: #52c41a;
    }
  }
  .icon-warning {
    :deep(.icon-svg) {
      color: #faad14;
    }
  }
  .icon-error {
    :deep(.icon-svg) {
      color: #ff4d4f;
    }
  }
}
.notification-topRight,
.notification-bottomRight {
  margin-right: 24px;
  right: 0;
}
.notification-topLeft,
.notification-bottomLeft {
  margin-left: 24px;
  left: 0;
}
</style>
