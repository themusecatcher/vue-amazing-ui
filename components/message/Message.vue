<script setup lang="ts">
import { ref, computed, onBeforeUnmount, isVNode } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { useInject } from 'components/utils'
import type { MessageApi } from './useMessage'
// 内容支持的三种形态：纯文本、已构造的 VNode、返回 VNode 的渲染函数
export type ContentType = string | VNode | (() => VNode)
export interface Props {
  duration?: number | null // 自动关闭的延时，单位 ms，设置 null 时，不自动关闭
  top?: string | number // 消息距离顶部的位置，单位 px
  maxCount?: number // 可同时存在的最大消息数，超出时淘汰最旧的一条
  keepAliveOnHover?: boolean // 鼠标移入时是否暂停自动关闭
  to?: string | HTMLElement // 消息容器挂载的节点，可选：元素标签名 (例如 'body') 或者元素本身
}
const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  top: 30,
  maxCount: undefined,
  keepAliveOnHover: true,
  to: 'body'
})
export interface Message {
  content?: ContentType // 提示内容
  icon?: VNode | (() => VNode) // 自定义图标
  duration?: number | null // 自动关闭的延时时长，单位 ms；设置 null 时，不自动关闭
  class?: string // 自定义类名
  style?: CSSProperties // 自定义样式
  onClick?: () => void // 点击 message 时的回调函数
  onClose?: () => void // 关闭时的回调函数
}
type Mode = 'open' | 'info' | 'success' | 'error' | 'warning' | 'loading'
// update 可更新的字段：Message 全部属性 + mode（用于切换内置图标类型）
export interface MessageUpdate extends Message {
  mode?: Mode
}
// 每条消息的展示数据
interface MessageItem extends Message {
  readonly key: string // 唯一标识，替代数组下标作为身份
  mode: Mode
}
// 单条消息的句柄，用于编程式关闭与更新
export interface MessageReactive extends Message {
  readonly key: string // 该条消息的唯一标识
  destroy: () => void // 关闭该条消息
  update: (options: MessageUpdate) => void // 更新该条消息；mode 可切换内置图标类型
}
const messageItems = ref<MessageItem[]>([])
const { colorPalettes } = useInject('Message') // 主题色注入
// 所有消息共享同一容器位置
// 既可通过 <MessageProvider top="..."> 透传生效，也可直接设置在 <Message> 组件上
const messageTop = computed(() => {
  const top = props.top
  return typeof top === 'number' ? `${top}px` : top
})
const emits = defineEmits<{
  click: [e: Event] // 具名元素语法
  close: [key: string]
  ready: [api: MessageApi]
}>()
// 每条消息独立持有自动关闭定时器，按 key 存取，避免多条消息互相干扰
const closeTimers = new Map<string, ReturnType<typeof setTimeout>>()
let seed = 0
function createKey(): string {
  seed += 1
  return `message_${Date.now()}_${seed}`
}
function clearTimer(key: string): void {
  const timer = closeTimers.get(key)
  if (timer) {
    clearTimeout(timer)
    closeTimers.delete(key)
  }
}
function autoClose(key: string): void {
  const item = messageItems.value.find((m) => m.key === key)
  if (!item) {
    return
  }
  // 无论何种情况都先清理旧定时器，否则 update 改为 duration: null 后旧定时器仍会触发关闭
  clearTimer(key)
  // per-item 优先，未指定时回落到组件级；两者为 null 均表示不自动关闭
  const delay: number | null = item.duration === undefined ? props.duration : item.duration
  if (delay === null) {
    return
  }
  closeTimers.set(
    key,
    setTimeout(() => {
      close(key)
    }, delay)
  )
}
function onEnter(key: string): void {
  if (!props.keepAliveOnHover) {
    return
  }
  clearTimer(key)
}
function onLeave(key: string): void {
  if (!props.keepAliveOnHover) {
    return
  }
  const item = messageItems.value.find((m) => m.key === key)
  if (item) {
    autoClose(item.key)
  }
}
function onClick(e: Event, item: MessageItem): void {
  item.onClick && item.onClick()
  emits('click', e)
}
// 关闭单条消息：按 key 精确移除，离场动画交由 TransitionGroup 播放
function close(key: string): void {
  const index = messageItems.value.findIndex((m) => m.key === key)
  if (index === -1) {
    return
  }
  const item = messageItems.value[index]
  clearTimer(key)
  item.onClose && item.onClose()
  emits('close', key)
  messageItems.value.splice(index, 1)
}
function destroyAll(): void {
  messageItems.value.slice().forEach((item) => {
    close(item.key)
  })
}
function updateItem(key: string, options: MessageUpdate): void {
  const item = messageItems.value.find((m) => m.key === key)
  if (!item) {
    return
  }
  Object.assign(item, options)
  // duration 发生变更时按新时长重新计时
  if ('duration' in options) {
    autoClose(key)
  }
}
function push(message: string | Message, mode: Mode): MessageReactive {
  const data: Message = typeof message === 'string' ? { content: message } : { ...message }
  const key = createKey()
  // 超出上限时淘汰最旧的一条，不触发 onClose；maxCount 非法（0 或负数）时不淘汰
  if (props.maxCount && props.maxCount > 0 && messageItems.value.length >= props.maxCount) {
    clearTimer(messageItems.value[0].key)
    messageItems.value.shift()
  }
  const item: MessageItem = { ...data, key, mode }
  messageItems.value.push(item)
  autoClose(key)
  return {
    key,
    destroy: () => close(key),
    update: (options: MessageUpdate) => updateItem(key, options)
  }
}
function open(message: string | Message): MessageReactive {
  return push(message, 'open')
}
function info(message: string | Message): MessageReactive {
  return push(message, 'info')
}
function success(message: string | Message): MessageReactive {
  return push(message, 'success')
}
function error(message: string | Message): MessageReactive {
  return push(message, 'error')
}
function warning(message: string | Message): MessageReactive {
  return push(message, 'warning')
}
function loading(message: string | Message): MessageReactive {
  return push(message, 'loading')
}
// 将内容归一化为可直接渲染的形态：函数式内容调用后得到 VNode
function renderContent(content: ContentType): VNode | string {
  return typeof content === 'function' ? content() : content
}
// 向 <MessageProvider> 回传 api，使其无需依赖模板 ref 即可对外提供
emits('ready', { open, info, success, error, warning, loading, destroyAll })
onBeforeUnmount(() => {
  closeTimers.forEach((timer) => {
    clearTimeout(timer)
  })
  closeTimers.clear()
})
</script>
<template>
  <Teleport :to="to">
    <div
      class="message-wrap"
      :style="`
      top: ${messageTop};
      --message-primary-color: ${colorPalettes[5]};
      --message-success-color: #52c41a;
      --message-warning-color: #faad14;
      --message-error-color: #ff4d4f;
    `"
    >
      <TransitionGroup name="slide-fade">
        <div
          v-for="message in messageItems"
          :key="message.key"
          class="message-container"
          :class="message.class"
          :style="message.style"
        >
          <div
            class="message-content-wrap"
            :class="`icon-${message.mode}`"
            @mouseenter="onEnter(message.key)"
            @mouseleave="onLeave(message.key)"
            @click="onClick($event, message)"
          >
            <component v-if="message.icon" :is="renderContent(message.icon)" class="icon-svg" />
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
              <component v-if="typeof message.content === 'function'" :is="message.content()" />
              <component v-else-if="isVNode(message.content)" :is="message.content" />
              <template v-else>{{ message.content ?? '' }}</template>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-fade-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.message-wrap {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  position: fixed;
  z-index: 999; // 突出显示该层级
  width: 100%;
  left: 0;
  right: 0;
  pointer-events: none; // 保证整个 message 区域不遮挡背后元素响应鼠标事件
  .message-container {
    text-align: center;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .message-content-wrap {
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
        animation: loadingRotate 2s linear infinite;
        @keyframes loadingRotate {
          100% {
            transform: rotate(360deg);
          }
        }
        .path {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          stroke-width: 5;
          stroke-linecap: round;
          animation: loadingDash 1.5s ease-in-out infinite;
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
        color: var(--message-primary-color);
        fill: currentColor;
      }
    }
    .icon-success {
      :deep(svg) {
        color: var(--message-success-color);
        fill: currentColor;
      }
    }
    .icon-warning {
      :deep(svg) {
        color: var(--message-warning-color);
        fill: currentColor;
      }
    }
    .icon-error {
      :deep(svg) {
        color: var(--message-error-color);
        fill: currentColor;
      }
    }
  }
}
</style>
