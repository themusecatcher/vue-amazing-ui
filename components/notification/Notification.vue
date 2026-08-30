<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue'
import type { VNode, CSSProperties } from 'vue'
import type { AnimationFrameID } from 'components/utils'
import { rafTimeout, cancelRaf, useInject } from 'components/utils'
export interface Props {
  title?: string // 通知提醒标题，优先级低于 Notification 中的 title
  description?: string // 通知提醒内容，优先级低于 Notification 中的 description
  duration?: number | null // 自动关闭的延时时长，单位 ms；设置 null 时，不自动关闭，优先级低于 Notification 中的 duration
  top?: number // 消息从顶部弹出时，距离顶部的位置，单位 px
  bottom?: number // 消息从底部弹出时，距离底部的位置，单位 px
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' // 消息弹出位置，优先级低于 Notification 中的 placement
  maxCount?: number // 同一 placement 下可同时存在的最大通知数，超出时淘汰最旧的一条
  keepAliveOnHover?: boolean // 鼠标移入时是否暂停自动关闭
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  duration: 4500,
  top: 24,
  bottom: 24,
  placement: 'topRight',
  maxCount: undefined,
  keepAliveOnHover: true
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
type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
// 单条通知的句柄，用于编程式关闭与更新
export interface NotificationReactive extends Notification {
  readonly key: string // 该条通知的唯一标识
  destroy: () => void // 关闭该条通知
  update: (options: Partial<Notification>) => void // 更新该条通知
}
type Mode = 'open' | 'info' | 'success' | 'error' | 'warning'
// 每条通知的展示数据
interface NotificationItem extends Notification {
  key: string // 唯一标识，替代数组下标作为身份
  mode: Mode
}
// 单个 placement 分组的状态：独立的通知列表
interface NotificationGroup {
  placement: Placement
  data: NotificationItem[]
}
const notificationGroups = ref<NotificationGroup[]>([])
const { colorPalettes } = useInject('Notification') // 主题色注入
const emit = defineEmits(['close'])
// 每条通知独立持有自动关闭定时器，按 key 存取，避免多条通知互相干扰
const closeTimers = new Map<string, AnimationFrameID>()
let seed = 0
function createKey(): string {
  seed += 1
  return `notification_${Date.now()}_${seed}`
}
// 根据 placement 找到对应分组，不存在则创建
function getGroup(placement: Placement): NotificationGroup {
  let group = notificationGroups.value.find((g) => g.placement === placement)
  if (!group) {
    group = reactive<NotificationGroup>({
      placement,
      data: []
    })
    notificationGroups.value.push(group)
  }
  return group
}
function topStyle(placement: Placement): CSSProperties {
  if (['topRight', 'topLeft'].includes(placement)) {
    return { top: `${props.top}px` }
  }
  return {}
}
function bottomStyle(placement: Placement): CSSProperties {
  if (['bottomRight', 'bottomLeft'].includes(placement)) {
    return { bottom: `${props.bottom}px` }
  }
  return {}
}
onBeforeUnmount(() => {
  closeTimers.forEach((raf) => {
    raf && cancelRaf(raf)
  })
  closeTimers.clear()
})
function clearTimer(key: string): void {
  const raf = closeTimers.get(key)
  if (raf) {
    cancelRaf(raf)
    closeTimers.delete(key)
  }
}
function autoClose(group: NotificationGroup, key: string): void {
  const item = group.data.find((n) => n.key === key)
  if (!item) {
    return
  }
  // duration 为 null 表示不自动关闭；为 undefined 时使用默认时长
  if (item.duration !== null) {
    clearTimer(key)
    const delay: number = item.duration || (props.duration ?? 4500)
    closeTimers.set(
      key,
      rafTimeout(() => {
        close(group, key)
      }, delay)
    )
  }
}
function onEnter(group: NotificationGroup, key: string): void {
  if (!props.keepAliveOnHover) {
    return
  }
  clearTimer(key)
}
function onLeave(group: NotificationGroup, key: string): void {
  if (!props.keepAliveOnHover) {
    return
  }
  autoClose(group, key)
}
// 离场前固定当前高度，使 max-height 收缩动画具备确定的起始值
function onBeforeLeave(el: Element): void {
  const target = el as HTMLElement
  target.style.maxHeight = `${target.offsetHeight}px`
}
// 关闭单条通知：按 key 精确移除，离场动画交由 TransitionGroup 播放
function close(group: NotificationGroup, key: string): void {
  const index = group.data.findIndex((n) => n.key === key)
  if (index === -1) {
    return
  }
  const item = group.data[index]
  clearTimer(key)
  item.onClose && item.onClose()
  emit('close')
  group.data.splice(index, 1)
}
function destroyAll(): void {
  notificationGroups.value.forEach((group) => {
    group.data.slice().forEach((item) => {
      close(group, item.key)
    })
  })
}
function updateItem(group: NotificationGroup, key: string, options: Partial<Notification>): void {
  const item = group.data.find((n) => n.key === key)
  if (!item) {
    return
  }
  Object.assign(item, options)
  // duration 发生变更时按新时长重新计时
  if ('duration' in options) {
    autoClose(group, key)
  }
}
function push(notification: Notification, mode: Mode): NotificationReactive {
  const placement = notification.placement || props.placement
  const group = getGroup(placement)
  const key = createKey()
  // 超出上限时淘汰最旧的一条
  if (props.maxCount && group.data.length >= props.maxCount) {
    clearTimer(group.data[0].key)
    group.data.shift()
  }
  group.data.push({
    ...notification,
    key,
    mode
  })
  autoClose(group, key)
  return {
    key,
    destroy: () => close(group, key),
    update: (options: Partial<Notification>) => updateItem(group, key, options)
  }
}
function open(notification: Notification): NotificationReactive {
  return push(notification, 'open')
}
function info(notification: Notification): NotificationReactive {
  return push(notification, 'info')
}
function success(notification: Notification): NotificationReactive {
  return push(notification, 'success')
}
function error(notification: Notification): NotificationReactive {
  return push(notification, 'error')
}
function warning(notification: Notification): NotificationReactive {
  return push(notification, 'warning')
}
defineExpose({
  open,
  info,
  success,
  error,
  warning,
  destroyAll
})
</script>
<template>
  <div
    v-for="group in notificationGroups"
    :key="group.placement"
    class="notification-wrap"
    :class="`notification-${group.placement}`"
    :style="[
      topStyle(group.placement),
      bottomStyle(group.placement),
      `
        --notification-primary-color: ${colorPalettes[5]};
        --notification-success-color: #52c41a;
        --notification-error-color: #ff4d4f;
        --notification-warning-color: #faad14;
      `
    ]"
  >
    <TransitionGroup
      appear
      :name="['topRight', 'bottomRight'].includes(group.placement) ? 'right' : 'left'"
      @before-leave="onBeforeLeave"
    >
      <div
        class="notification-container"
        :class="[`icon-${notification.mode}`, notification.class]"
        :style="notification.style"
        v-for="notification in group.data"
        :key="notification.key"
        @mouseenter="onEnter(group, notification.key)"
        @mouseleave="onLeave(group, notification.key)"
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
        <a tabindex="0" class="notification-close" @click="close(group, notification.key)">
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
.notification-wrap {
  position: fixed;
  z-index: 999; // 突出显示该层级
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  margin-right: 24px;
  .notification-container {
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
      color: var(--notification-primary-color);
    }
  }
  .icon-success {
    :deep(.icon-svg) {
      color: var(--notification-success-color);
    }
  }
  .icon-warning {
    :deep(.icon-svg) {
      color: var(--notification-warning-color);
    }
  }
  .icon-error {
    :deep(.icon-svg) {
      color: var(--notification-error-color);
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
