<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { rafTimeout, cancelRaf } from '../utils'
interface Props {
  content?: string // 提示内容
  duration?: number // 自动关闭的延时，单位 ms，设置 null 时，不自动关闭
  top?: string | number // 消息距离顶部的位置，单位 px
}
const props = withDefaults(defineProps<Props>(), {
  content: undefined,
  duration: 3000,
  top: 30
})
interface Message {
  content?: string // 提示内容
  icon?: VNode // 自定义图标
  duration?: number | null // 自动关闭的延时时长，单位 ms；设置 null 时，不自动关闭
  class?: string // 自定义类名
  style?: CSSProperties // 自定义样式
  onClick?: Function // 点击 message 时的回调函数
  onClose?: Function // 关闭时的回调函数
  [key: string]: any // 额外属性
}
const resetTimer = ref()
const showMessage = ref<boolean[]>([])
const hideTimers = ref<any[]>([])
const messageContent = ref<Message[]>([])
const closeDuration = ref<number | null>(null) // 自动关闭延时
const emits = defineEmits(['click', 'close'])
const messageTop = computed(() => {
  if (typeof props.top === 'number') {
    return `${props.top}px`
  }
  return props.top
})
const clear = computed(() => {
  // 所有提示是否已经全部变为false
  return showMessage.value.every((show) => !show)
})
watch(clear, (to, from) => {
  // 所有提示都消失后重置
  if (!from && to) {
    resetTimer.value = rafTimeout(() => {
      messageContent.value.splice(0)
      showMessage.value.splice(0)
    }, 300)
  }
})
function onEnter(index: number) {
  hideTimers.value[index] && cancelRaf(hideTimers.value[index])
}
function onLeave(index: number) {
  hideMessage(index)
}
function onClick(e: Event, index: number) {
  messageContent.value[index].onClick && messageContent.value[index].onClick()
  emits('click', e)
}
function hideMessage(index: number) {
  if (closeDuration.value !== null) {
    hideTimers.value[index] = rafTimeout(() => {
      showMessage.value[index] = false
      messageContent.value[index].onClose && messageContent.value[index].onClose()
      emits('close')
    }, closeDuration.value)
  }
}
function show() {
  resetTimer.value && cancelRaf(resetTimer.value)
  const index = messageContent.value.length - 1
  const last = messageContent.value[index]
  showMessage.value[index] = true
  if (last.duration !== null) {
    closeDuration.value = last.duration || props.duration
    hideMessage(index)
  } else {
    closeDuration.value = null
  }
}
function open(message: string | Message) {
  if (typeof message === 'string') {
    messageContent.value.push({
      content: message,
      mode: 'open'
    })
  } else {
    messageContent.value.push({
      ...message,
      mode: 'open'
    })
  }
  show()
}
function info(message: string | Message) {
  if (typeof message === 'string') {
    messageContent.value.push({
      content: message,
      mode: 'info'
    })
  } else {
    messageContent.value.push({
      ...message,
      mode: 'info'
    })
  }
  show()
}
function success(message: string | Message) {
  if (typeof message === 'string') {
    messageContent.value.push({
      content: message,
      mode: 'success'
    })
  } else {
    messageContent.value.push({
      ...message,
      mode: 'success'
    })
  }
  show()
}
function error(message: string | Message) {
  if (typeof message === 'string') {
    messageContent.value.push({
      content: message,
      mode: 'error'
    })
  } else {
    messageContent.value.push({
      ...message,
      mode: 'error'
    })
  }
  show()
}
function warning(message: string | Message) {
  if (typeof message === 'string') {
    messageContent.value.push({
      content: message,
      mode: 'warning'
    })
  } else {
    messageContent.value.push({
      ...message,
      mode: 'warning'
    })
  }
  show()
}
function loading(message: string | Message) {
  if (typeof message === 'string') {
    messageContent.value.push({
      content: message,
      mode: 'loading'
    })
  } else {
    messageContent.value.push({
      ...message,
      mode: 'loading'
    })
  }
  show()
}
defineExpose({
  open,
  info,
  success,
  error,
  warning,
  loading
})
</script>
<template>
  <div class="m-message-wrap" :style="`top: ${messageTop};`">
    <TransitionGroup name="slide-fade">
      <div
        v-show="showMessage[index]"
        class="m-message"
        :class="message.class"
        :style="message.style"
        v-for="(message, index) in messageContent"
        :key="index"
      >
        <div
          class="m-message-content"
          :class="`icon-${message.mode}`"
          @mouseenter="onEnter(index)"
          @mouseleave="onLeave(index)"
          @click="onClick($event, index)"
        >
          <component v-if="message.icon" :is="message.icon" class="icon-svg" />
          <svg
            v-else-if="message.mode === 'info'"
            class="icon-svg"
            focusable="false"
            data-icon="info-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
            ></path>
          </svg>
          <svg
            v-else-if="message.mode === 'success'"
            class="icon-svg"
            focusable="false"
            data-icon="check-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
            ></path>
          </svg>
          <svg
            v-else-if="message.mode === 'error'"
            class="icon-svg"
            focusable="false"
            data-icon="close-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            fill-rule="evenodd"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
            ></path>
          </svg>
          <svg
            v-else-if="message.mode === 'warning'"
            class="icon-svg"
            focusable="false"
            data-icon="exclamation-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
            ></path>
          </svg>
          <svg
            v-else-if="message.mode === 'loading'"
            width="1em"
            height="1em"
            fill="currentColor"
            class="icon-svg circle"
            viewBox="0 0 50 50"
          >
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
          <div class="message-content">
            {{ message.content || content }}
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
// 滑动渐变过渡效果
.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-16px);
  -ms-transform: translateY(-16px); /* IE 9 */
  -webkit-transform: translateY(-16px); /* Safari and Chrome */
  opacity: 0;
}
.slide-fade-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.m-message-wrap {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  position: fixed;
  z-index: 999; // 突出显示该层级
  width: 100%;
  left: 0;
  right: 0;
  pointer-events: none; // 保证整个message区域不遮挡背后元素响应鼠标事件
  .m-message {
    text-align: center;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .m-message-content {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      padding: 9px 12px;
      background: #fff;
      border-radius: 8px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      pointer-events: auto; // 保证内容区域部分可以正常响应鼠标事件
      :deep(.icon-svg) {
        display: inline-block;
        font-size: 16px;
        fill: currentColor;
      }
      .circle {
        display: inline-block;
        stroke: currentColor;
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
      .message-content {
        display: inline-block;
      }
    }
    .icon-open {
      :deep(svg) {
        fill: currentColor;
      }
    }
    .icon-info,
    .icon-loading {
      :deep(svg) {
        color: @themeColor;
        fill: currentColor;
      }
    }
    .icon-success {
      :deep(svg) {
        color: #52c41a;
        fill: currentColor;
      }
    }
    .icon-warning {
      :deep(svg) {
        color: #faad14;
        fill: currentColor;
      }
    }
    .icon-error {
      :deep(svg) {
        color: #ff4d4f;
        fill: currentColor;
      }
    }
  }
}
</style>
