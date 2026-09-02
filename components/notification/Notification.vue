<script setup lang="ts">
import { ref, reactive, onBeforeUnmount, isVNode, watch } from 'vue'
import type { VNode, CSSProperties } from 'vue'
import Scrollbar from 'components/scrollbar'
import { useInject } from 'components/utils'
import type { NotificationApi } from './useNotification'
// 内容支持的三种形态：纯文本、已构造的 VNode、返回 VNode 的渲染函数
export type ContentType = string | VNode | (() => VNode)
export interface Props {
  top?: number // 消息从顶部弹出时，距离顶部的位置，单位 px
  bottom?: number // 消息从底部弹出时，距离底部的位置，单位 px
  duration?: number | null // 自动关闭的延时时长，单位 ms；设置 null 时，不自动关闭，优先级低于 Notification 中的 duration
  placement?: Placement // 消息弹出位置，优先级低于 Notification 中的 placement
  keepAliveOnHover?: boolean // 鼠标移入时是否暂停自动关闭
  maxCount?: number // 同一 placement 下可同时存在的最大通知数，超出时淘汰最旧的一条
  closable?: boolean // 是否显示关闭按钮，优先级低于单条通知中的 closable
  scrollable?: boolean // 通知容器是否可滚动，通知过多超出视口高度时滚动显示
  to?: string | HTMLElement // 通知容器挂载的节点，可选：元素标签名 (例如 'body') 或者元素本身
}
const props = withDefaults(defineProps<Props>(), {
  top: 16,
  bottom: 16,
  duration: 4500,
  placement: 'topRight',
  keepAliveOnHover: true,
  maxCount: undefined,
  closable: true,
  scrollable: true,
  to: 'body'
})
export interface NotificationOptions {
  key?: string // 该条通知的唯一标识，未指定时自动生成；指定后可用于去重，也可由 api.destroy(key) 精确关闭
  title?: ContentType // 通知提醒标题
  content?: ContentType // 通知提醒内容
  icon?: VNode | (() => VNode) // 自定义图标
  action?: ContentType // 自定义操作区域（如底部按钮），渲染在通知底部右侧，支持三种形态
  meta?: ContentType // meta 信息，渲染在通知底部左侧，与 action 同行左右分布，支持三种形态
  class?: string // 自定义类名
  style?: CSSProperties // 自定义样式
  closable?: boolean // 是否显示关闭按钮，优先级高于组件级 closable
  duration?: number | null // 自动关闭的延时时长，单位 ms；设置 null 时，不自动关闭
  placement?: Placement // 通知提醒弹出位置
  onClick?: (e: MouseEvent) => void // 点击通知时的回调函数；点击关闭按钮不触发
  onClose?: () => void | boolean | Promise<void | boolean> // 关闭时的回调函数；返回 false（或 resolve false）时取消本次关闭
}
type Placement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'
type Mode = 'open' | 'info' | 'success' | 'error' | 'warning'
// update 可更新的字段：NotificationOptions 除 key 外的全部属性 + mode（用于切换内置图标类型）
// key 是通知的身份标识，创建后不可变更，故从可更新字段中剔除
export interface NotificationUpdate extends Omit<NotificationOptions, 'key'> {
  mode?: Mode
}
// 每条通知的展示数据
interface NotificationItem extends NotificationOptions {
  readonly key: string // 唯一标识，替代数组下标作为身份
  mode: Mode
}
// 单条通知的句柄，用于编程式关闭与更新
export interface NotificationReactive extends NotificationOptions {
  readonly key: string // 该条通知的唯一标识
  destroy: () => void // 关闭该条通知
  update: (options: NotificationUpdate) => void // 更新该条通知；mode 可切换内置图标类型
}
// 单个 placement 分组的状态：独立的通知列表
interface NotificationGroup {
  placement: Placement
  data: NotificationItem[]
}
const notificationGroups = ref<NotificationGroup[]>([])
const { colorPalettes } = useInject('Notification') // 主题色注入
const emits = defineEmits<{
  close: [key: string]
  ready: [api: NotificationApi]
}>()
// 每条通知独立持有自动关闭定时器，按 key 存取，避免多条通知互相干扰
const closeTimers = new Map<string, ReturnType<typeof setTimeout>>()
// 离场动画时长，需与 <style> 中 .xxx-leave-active 的 transition 时长保持一致
const LEAVE_DURATION = 200
// 空分组回收定时器，组件卸载时统一清理
const recycleTimers = new Set<ReturnType<typeof setTimeout>>()
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
// 每个弹出位置对应的 TransitionGroup 动画名：居中方向纵向位移，四角沿用横向位移
const transitionNames: Record<Placement, 'top' | 'bottom' | 'left' | 'right'> = {
  top: 'top',
  topLeft: 'left',
  topRight: 'right',
  bottom: 'bottom',
  bottomLeft: 'left',
  bottomRight: 'right'
}
function topStyle(placement: Placement): CSSProperties {
  if (['top', 'topRight', 'topLeft'].includes(placement)) {
    return { top: 0 }
  }
  return {}
}
function bottomStyle(placement: Placement): CSSProperties {
  if (['bottom', 'bottomRight', 'bottomLeft'].includes(placement)) {
    return { bottom: 0 }
  }
  return {}
}
// 通知内容区布局：flex 纵向排列，宽度不一致的通知按 placement 语义对齐（左右位贴边、居中位居中）
// 滚动模式额外保留对向留白，使滚到极限时内容不贴容器边缘
function contentStyle(placement: Placement): CSSProperties {
  const isTop = ['top', 'topRight', 'topLeft'].includes(placement)
  const offset = isTop ? props.top : props.bottom
  let paddingStyle: CSSProperties
  if (!props.scrollable) {
    paddingStyle = isTop ? { paddingTop: `${offset}px` } : { paddingBottom: `${offset}px` }
  } else {
    paddingStyle = isTop
      ? { paddingTop: `${offset}px`, paddingBottom: '32px' }
      : { paddingTop: '32px', paddingBottom: `${offset}px` }
  }
  let alignItems: 'flex-start' | 'center' | 'flex-end'
  if (placement === 'top' || placement === 'bottom') {
    alignItems = 'center'
  } else if (placement.endsWith('Right')) {
    alignItems = 'flex-end'
  } else {
    alignItems = 'flex-start'
  }
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems,
    ...paddingStyle
  }
}
// 将内容归一化为可直接渲染的形态：函数式内容调用后得到 VNode
function renderContent(content: ContentType): VNode | string {
  return typeof content === 'function' ? content() : content
}
// 通知列表滚动容器的高度上限（scrollable 模式）：
// 默认挂载到 body 时沿用 CSS 的 100vh 兜底；挂载到自定义容器时实时跟随容器高度，
// 使通知过多时在容器内滚动而非突破容器边界
const scrollbarMaxHeight = ref<string | undefined>(undefined)
let containerObserver: ResizeObserver | null = null
// 解析 to 指向的挂载容器（兼容选择器字符串与 DOM 元素，与 Teleport 解析规则一致）
function resolveContainer(target: string | HTMLElement): HTMLElement | null {
  if (typeof target !== 'string' || !target) {
    return typeof target === 'string' ? null : target
  }
  try {
    return document.querySelector<HTMLElement>(target)
  } catch {
    return null
  }
}
function syncScrollbarMaxHeight(): void {
  containerObserver?.disconnect()
  containerObserver = null
  if (!props.scrollable) {
    scrollbarMaxHeight.value = undefined
    return
  }
  const container = resolveContainer(props.to)
  // 挂载目标是视口级（body / html）时不做内联限制，交由 CSS 按 100vh 兜底
  if (!container || container === document.body || container === document.documentElement) {
    scrollbarMaxHeight.value = undefined
    return
  }
  const update = (): void => {
    // 容器高度为 0（尚未完成布局）时回退视口高度，避免通知列表被压没
    const next = container.clientHeight > 0 ? `${container.clientHeight}px` : undefined
    if (next !== scrollbarMaxHeight.value) {
      scrollbarMaxHeight.value = next
    }
  }
  update()
  containerObserver = new ResizeObserver(update)
  containerObserver.observe(container)
}
// to 可能在组件挂载后才可解析（Teleport 目标要求先于组件存在），故用 flush: 'post' 等 DOM 就绪后再绑定
watch(
  () => props.to,
  () => syncScrollbarMaxHeight(),
  { immediate: true, flush: 'post' }
)
watch(
  () => props.scrollable,
  () => syncScrollbarMaxHeight()
)
onBeforeUnmount(() => {
  containerObserver?.disconnect()
  containerObserver = null
  closeTimers.forEach((timer) => {
    clearTimeout(timer)
  })
  closeTimers.clear()
  recycleTimers.forEach((timer) => {
    clearTimeout(timer)
  })
  recycleTimers.clear()
})
function clearTimer(key: string): void {
  const timer = closeTimers.get(key)
  if (timer) {
    clearTimeout(timer)
    closeTimers.delete(key)
  }
}
function autoClose(group: NotificationGroup, key: string): void {
  const item = group.data.find((n) => n.key === key)
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
      close(group, key)
    }, delay)
  )
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
// 分组内最后一条通知关闭后，等离场动画播完再回收该分组，避免长期残留空的容器 DOM
// 必须延后回收：立即移除容器会连同待播动画的离场节点一起摘掉，导致最后一条通知失去离场动画
function recycleGroup(group: NotificationGroup): void {
  if (group.data.length > 0) {
    return
  }
  const timer = setTimeout(() => {
    recycleTimers.delete(timer)
    // 延后期间该分组可能又收到新通知，此时需继续保留
    if (group.data.length > 0) {
      return
    }
    const index = notificationGroups.value.indexOf(group)
    if (index !== -1) {
      notificationGroups.value.splice(index, 1)
    }
  }, LEAVE_DURATION + 100)
  recycleTimers.add(timer)
}
// 单条通知是否显示关闭按钮：未指定时回落到组件级 closable
function isClosable(item: NotificationItem): boolean {
  return item.closable ?? props.closable
}
// 点击通知体触发单条通知的 onClick；关闭按钮已 stopPropagation，不会走到这里
function onClick(e: MouseEvent, item: NotificationItem): void {
  item.onClick?.(e)
}
// 关闭单条通知：按 key 精确移除，离场动画交由 TransitionGroup 播放；
// onClose 返回 false（或 Promise resolve false）时取消本次关闭，通知保留且不再自动关闭
async function close(group: NotificationGroup, key: string): Promise<void> {
  let index = group.data.findIndex((n) => n.key === key)
  if (index === -1) {
    return
  }
  const item = group.data[index]
  clearTimer(key)
  const result = await item.onClose?.()
  if (result === false) {
    return
  }
  // await 期间组内数据可能已变化（并发关闭 / 淘汰导致数组位移），必须按 key 重新定位后再移除
  index = group.data.findIndex((n) => n.key === key)
  if (index === -1) {
    return
  }
  emits('close', key)
  group.data.splice(index, 1)
  // 分组内无剩余通知时调度回收，待离场动画播完移除空容器 DOM
  recycleGroup(group)
}
function destroyAll(): void {
  notificationGroups.value.forEach((group) => {
    group.data.slice().forEach((item) => {
      close(group, item.key)
    })
  })
}
// 按 key 精确关闭任意分组内的通知，便于跨调用点定位（如 axios 拦截器内关闭组件中打开的那条）
function destroy(key: string): void {
  notificationGroups.value.forEach((group) => {
    if (group.data.some((n) => n.key === key)) {
      close(group, key)
    }
  })
}
function updateItem(group: NotificationGroup, key: string, options: NotificationUpdate): void {
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
// 单条通知的编程式句柄，新增与命中去重两种路径共用
function createHandle(group: NotificationGroup, key: string): NotificationReactive {
  return {
    key,
    destroy: () => close(group, key),
    update: (options: NotificationUpdate) => updateItem(group, key, options)
  }
}
function push(notification: NotificationOptions, mode: Mode): NotificationReactive {
  const placement = notification.placement || props.placement
  const group = getGroup(placement)
  // 指定了 key 且该 key 已存在：原地更新该条并重新计时，不新增（同一业务标识只保留一条）
  const existing = notification.key === undefined ? undefined : group.data.find((n) => n.key === notification.key)
  if (existing) {
    // key 为身份标识不可变更，更新时剔除
    const { key: _existedKey, ...rest } = notification
    updateItem(group, existing.key, { ...rest, mode })
    autoClose(group, existing.key)
    return createHandle(group, existing.key)
  }
  const key = notification.key ?? createKey()
  // 超出上限时淘汰最旧的一条；maxCount 非法（0 或负数）时不淘汰
  if (props.maxCount && props.maxCount > 0 && group.data.length >= props.maxCount) {
    clearTimer(group.data[0].key)
    group.data.shift()
  }
  group.data.push({
    ...notification,
    key,
    mode
  })
  autoClose(group, key)
  return createHandle(group, key)
}
function open(notification: NotificationOptions): NotificationReactive {
  return push(notification, 'open')
}
function info(notification: NotificationOptions): NotificationReactive {
  return push(notification, 'info')
}
function success(notification: NotificationOptions): NotificationReactive {
  return push(notification, 'success')
}
function error(notification: NotificationOptions): NotificationReactive {
  return push(notification, 'error')
}
function warning(notification: NotificationOptions): NotificationReactive {
  return push(notification, 'warning')
}
// 向 <NotificationProvider> 回传 api，使其无需依赖模板 ref 即可对外提供
emits('ready', { open, info, success, error, warning, destroy, destroyAll })
</script>
<template>
  <Teleport :to="to">
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
      <Scrollbar
        class="notification-scrollbar"
        :class="{ 'notification-scrollbar--scrollable': scrollable }"
        :style="scrollable && scrollbarMaxHeight ? { maxHeight: scrollbarMaxHeight } : undefined"
        :content-style="contentStyle(group.placement)"
      >
        <TransitionGroup appear :name="transitionNames[group.placement]" @before-leave="onBeforeLeave">
          <div
            class="notification-container"
            :class="[`icon-${notification.mode}`, notification.class]"
            :style="notification.style"
            v-for="notification in group.data"
            :key="notification.key"
            @click="onClick($event, notification)"
            @mouseenter="onEnter(group, notification.key)"
            @mouseleave="onLeave(group, notification.key)"
          >
            <component v-if="notification.icon" :is="renderContent(notification.icon)" class="icon-svg" />
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
            <div class="notification-main">
              <div class="notification-title">
                <component v-if="typeof notification.title === 'function'" :is="notification.title()" />
                <component v-else-if="isVNode(notification.title)" :is="notification.title" />
                <template v-else>{{ notification.title ?? '' }}</template>
              </div>
              <div class="notification-content">
                <component v-if="typeof notification.content === 'function'" :is="notification.content()" />
                <component v-else-if="isVNode(notification.content)" :is="notification.content" />
                <template v-else>{{ notification.content ?? '' }}</template>
              </div>
              <div v-if="notification.meta || notification.action" class="notification-footer">
                <div v-if="notification.meta" class="notification-footer__meta">
                  <component v-if="typeof notification.meta === 'function'" :is="notification.meta()" />
                  <component v-else-if="isVNode(notification.meta)" :is="notification.meta" />
                  <template v-else>{{ notification.meta }}</template>
                </div>
                <div v-if="notification.action" class="notification-footer__action">
                  <component v-if="typeof notification.action === 'function'" :is="notification.action()" />
                  <component v-else-if="isVNode(notification.action)" :is="notification.action" />
                  <template v-else>{{ notification.action }}</template>
                </div>
              </div>
            </div>
            <a
              v-if="isClosable(notification)"
              tabindex="0"
              class="notification-close"
              @click.stop="close(group, notification.key)"
            >
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
      </Scrollbar>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.right-move,
.right-enter-active,
.right-leave-active,
.left-move,
.left-enter-active,
.left-leave-active,
.top-move,
.top-enter-active,
.top-leave-active,
.bottom-move,
.bottom-enter-active,
.bottom-leave-active {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.right-leave-to,
.left-leave-to,
.top-leave-to,
.bottom-leave-to {
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
.top-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.bottom-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.top-leave-active,
.bottom-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.notification-wrap {
  position: fixed;
  z-index: 999;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  .notification-container {
    position: relative;
    display: flex;
    width: 384px;
    max-width: calc(100vw - 48px);
    margin-left: 24px;
    margin-right: 24px;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
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
    .notification-main {
      width: 100%;
      .notification-title {
        padding-right: 24px;
        margin-bottom: 8px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.5;
      }
      .notification-content {
        font-size: 14px;
      }
    }
    .notification-footer {
      display: flex;
      align-items: center;
      margin-top: 16px;
      .notification-footer__meta {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
      .notification-footer__action {
        margin-left: auto;
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
.notification-top,
.notification-bottom {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}
.notification-topRight,
.notification-bottomRight {
  right: 0;
}
.notification-topLeft,
.notification-bottomLeft {
  left: 0;
}
// 通知列表滚动容器：内容较少时高度自适应，超出视口高度时滚动显示
.notification-wrap .notification-scrollbar {
  height: fit-content;
  :deep(.scrollbar-container) {
    height: fit-content;
  }
  &.notification-scrollbar--scrollable {
    max-height: 100vh;
  }
}
</style>
