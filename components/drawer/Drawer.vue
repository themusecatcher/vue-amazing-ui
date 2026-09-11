<script setup lang="ts">
import { ref, computed, watch, watchEffect, onMounted, onUnmounted, inject, provide, nextTick } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Scrollbar, { type ScrollbarProps } from 'components/scrollbar'
import { useSlotsExist, lockScroll } from 'components/utils'

// 多层抽屉推动的默认位移距离
const DEFAULT_PUSH_DISTANCE = 180

export interface Props {
  width?: string | number // 抽屉宽度，在 placement 为 right 或 left 时使用，单位 px
  height?: string | number // 抽屉高度，在 placement 为 top 或 bottom 时使用，单位 px
  size?: 'default' | 'large' // 预设抽屉宽度（或高度），default 378px、large 736px
  title?: string // 标题
  closable?: boolean // 是否显示左上角的关闭按钮
  closeIcon?: VNode | (() => VNode) // 自定义关闭图标，插槽形态请用 #closeIcon
  placement?: 'top' | 'right' | 'bottom' | 'left' // 抽屉的方向
  headerClass?: string // 设置 Drawer 头部的类名
  headerStyle?: CSSProperties // 设置 Drawer 头部的样式
  bodyClass?: string // 设置 Drawer 内容部分的类名
  bodyStyle?: CSSProperties // 设置 Drawer 内容部分的样式
  scrollbarProps?: ScrollbarProps // Scrollbar 组件属性配置，用于设置内容滚动条的样式
  extra?: string // 抽屉右上角的操作区域
  footer?: string // 抽屉的页脚
  footerClass?: string // 设置 Drawer 页脚的类名
  footerStyle?: CSSProperties // 设置 Drawer 页脚的样式
  destroyOnClose?: boolean // 关闭时是否销毁 Drawer 里的子元素
  forceRender?: boolean // 预渲染 Drawer 内元素
  contentWrapperStyle?: CSSProperties // 设置 Drawer 包裹内容部分的样式
  rootClassName?: string // 最外层容器的类名
  rootStyle?: CSSProperties // 最外层容器的样式
  getContainer?: string | HTMLElement | (() => HTMLElement) | false // 指定 Drawer 挂载的节点，false 时渲染在当前 DOM
  zIndex?: number // 设置 Drawer 的 z-index
  open?: boolean // (v-model) 抽屉是否可见
  autofocus?: boolean // 抽屉展开后是否将焦点切换至其 DOM 节点
  keyboard?: boolean // 是否支持键盘 esc 关闭
  mask?: boolean // 是否展示遮罩
  maskClosable?: boolean // 点击蒙层是否允许关闭
  maskStyle?: CSSProperties // 遮罩样式
  push?: boolean | { distance: string | number } // 用于设置多层 Drawer 的推动行为，distance 为推动距离，单位 px
  blockScroll?: boolean // 是否在打开时禁用 body 滚动
}
// 声明组件插槽类型
export interface DrawerSlots {
  title?: () => VNode[] // 自定义标题
  extra?: () => VNode[] // 自定义抽屉右上角的操作区域
  default?: () => VNode[] // 自定义抽屉内容
  footer?: () => VNode[] // 自定义抽屉的页脚
  closeIcon?: () => VNode[] // 自定义关闭图标
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  size: 'default',
  title: undefined,
  closable: true,
  closeIcon: undefined,
  placement: 'right',
  headerClass: undefined,
  headerStyle: () => ({}),
  bodyClass: undefined,
  bodyStyle: () => ({}),
  scrollbarProps: () => ({}),
  extra: undefined,
  footer: undefined,
  footerClass: undefined,
  footerStyle: () => ({}),
  destroyOnClose: false,
  forceRender: false,
  contentWrapperStyle: () => ({}),
  rootClassName: undefined,
  rootStyle: () => ({}),
  getContainer: 'body',
  zIndex: 1000,
  open: false,
  autofocus: true,
  keyboard: true,
  mask: true,
  maskClosable: true,
  maskStyle: () => ({}),
  push: () => ({ distance: DEFAULT_PUSH_DISTANCE }),
  blockScroll: true
})
defineSlots<DrawerSlots>()
const drawerRef = ref<HTMLElement | null>(null)
// 将焦点切回抽屉 DOM：父抽屉复位、打开态初始化、开合动画后共用
function focusDrawer() {
  nextTick(() => {
    drawerRef.value?.focus()
  })
}
const drawerOpen = ref<boolean>(props.open)
// 组件持有的滚动锁释放函数：加锁后保存返回值、释放后置空，存在即代表本组件持锁；
// 卸载兜底据此精确释放，避免未持锁时误解锁他人
let scrollLockRelease: (() => void) | null = null
const slotsExist = useSlotsExist(['title', 'extra', 'footer'])
const emits = defineEmits(['update:open', 'close', 'afterOpenChange'])
// 多层抽屉 push
// 父抽屉通过 provide 暴露 setPush / setPull：子抽屉开合时通知父抽屉位移 / 复位。
// sPush 表示「本抽屉是否被子抽屉推动」，仅由子抽屉调用本抽屉的 setPush 置位
type ParentDrawerOpts = { setPush: () => void; setPull: () => void }
const parentDrawerOpts = inject<ParentDrawerOpts | null>('parentDrawerOpts', null)
const sPush = ref<boolean>(false)
function setPush() {
  sPush.value = true
}
function setPull() {
  sPush.value = false
  focusDrawer()
}
provide('parentDrawerOpts', { setPush, setPull })
// 尺寸
const mergedWidth = computed(() => props.width ?? (props.size === 'large' ? 736 : 378))
const mergedHeight = computed(() => props.height ?? (props.size === 'large' ? 736 : 378))
// 尺寸值：纯数字及其字符串形式（如 "520"）补 px 单位，百分比 / 视口单位（如 "50%"、"100vh"）原样返回
function toCssSize(value: string | number): string {
  const numeric = !Number.isNaN(parseFloat(String(value))) && Number.isFinite(Number(value))
  return numeric ? `${value}px` : String(value)
}
const drawerWidth = computed(() => toCssSize(mergedWidth.value))
const drawerHeight = computed(() => toCssSize(mergedHeight.value))
const wrapperSizeStyle = computed<CSSProperties>(() => {
  if (['top', 'bottom'].includes(props.placement)) {
    return { height: drawerHeight.value }
  }
  return { width: drawerWidth.value }
})
// 推动位移：left/top 沿正方向、right/bottom 沿负方向，使父抽屉为子抽屉让出空间
const pushTransform = computed(() => {
  const { push, placement } = props
  let distance: number
  if (typeof push === 'boolean') {
    distance = push ? DEFAULT_PUSH_DISTANCE : 0
  } else {
    distance = parseFloat(String(push?.distance ?? 0))
  }
  if (!distance) {
    return undefined
  }
  if (placement === 'left' || placement === 'right') {
    return `translateX(${placement === 'left' ? distance : -distance}px)`
  }
  return `translateY(${placement === 'top' ? distance : -distance}px)`
})
// 挂载容器
// getContainer 为 false 时禁用 Teleport，Drawer 渲染在当前 DOM（配合 .is-inline 绝对定位）
const teleportDisabled = computed(() => props.getContainer === false)
const teleportTarget = computed<string | HTMLElement>(() => {
  const { getContainer } = props
  if (!getContainer || getContainer === 'body') {
    return 'body'
  }
  if (typeof getContainer === 'function') {
    // 函数形态在渲染时求值；SSR 或元素未就绪时回退 body，避免 Teleport 目标无效
    return getContainer() ?? 'body'
  }
  return getContainer
})
// 显示与内容渲染
const showHeader = computed(() => {
  return slotsExist.title || slotsExist.extra || props.title || props.extra || props.closable
})
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showExtra = computed(() => {
  return slotsExist.extra || props.extra
})
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
// forceRender 预渲染 / 非 destroyOnClose 常驻 / destroyOnClose 时仅打开期间渲染
const shouldRenderBody = computed(() => {
  return props.forceRender || !props.destroyOnClose || !!drawerOpen.value
})
const closeIconNode = computed<VNode | null>(() => {
  const { closeIcon } = props
  if (closeIcon === undefined || closeIcon === null) {
    return null
  }
  return typeof closeIcon === 'function' ? closeIcon() : closeIcon
})
// 滚动锁
const needScrollLock = computed(() => !!drawerOpen.value && props.blockScroll)
watch(
  needScrollLock,
  async (to) => {
    if (!to) {
      // 无需锁时释放本组件持有的锁（未持锁时为空调用，幂等无副作用）
      scrollLockRelease?.()
      scrollLockRelease = null
      return
    }
    await nextTick()
    // 等待期间可能已关闭或已持锁，需再次确认，避免重复加锁或锁残留
    if (!needScrollLock.value || scrollLockRelease) {
      return
    }
    scrollLockRelease = lockScroll()
  },
  {
    immediate: true,
    flush: 'post'
  }
)
// 开合响应
// 外部 open 同步到内部 drawerOpen
watchEffect(() => {
  drawerOpen.value = props.open
})
watch(
  drawerOpen,
  (to) => {
    // 通知父抽屉：本抽屉打开 / 关闭时推动 / 复位父抽屉
    if (parentDrawerOpts) {
      if (to) {
        parentDrawerOpts.setPush()
      } else {
        parentDrawerOpts.setPull()
      }
    }
    if (to && props.autofocus) {
      focusDrawer()
    }
  },
  {
    flush: 'post'
  }
)
onMounted(() => {
  // 初始即为打开态时同步推动父抽屉与聚焦（watch 不触发初始值，避免初始关闭态误抢焦点）
  if (!drawerOpen.value) {
    return
  }
  parentDrawerOpts?.setPush()
  if (props.autofocus) {
    focusDrawer()
  }
})
onUnmounted(() => {
  // 卸载兜底：本组件仍持锁时释放，否则滚动锁随组件销毁而残留，页面滚动永久锁死；
  // 以 scrollLockRelease 而非 drawerOpen 判定，避免从未加锁却误解锁他人
  scrollLockRelease?.()
  // 卸载时复位父抽屉，避免父抽屉停留在被推动位置
  parentDrawerOpts?.setPull()
})
function closeDrawer(e: Event) {
  drawerOpen.value = false
  emits('update:open', false)
  emits('close', e)
}
function onMaskClick(e: MouseEvent) {
  if (props.maskClosable) {
    closeDrawer(e)
  }
}
function onKeydown(e: KeyboardEvent) {
  if (props.keyboard && e.key === 'Escape') {
    closeDrawer(e)
  }
}
function onAfterOpenChange(open: boolean) {
  emits('afterOpenChange', open)
}
</script>
<template>
  <Teleport :to="teleportTarget" :disabled="teleportDisabled">
    <div
      ref="drawerRef"
      tabindex="-1"
      class="drawer-wrap"
      :class="[rootClassName, { 'is-inline': teleportDisabled }]"
      :style="rootStyle"
      @keydown="onKeydown"
    >
      <Transition name="fade">
        <div v-if="mask" v-show="drawerOpen" class="drawer-mask" :style="maskStyle" @click="onMaskClick"></div>
      </Transition>
      <Transition
        :name="`motion-${placement}`"
        @after-enter="onAfterOpenChange(true)"
        @after-leave="onAfterOpenChange(false)"
      >
        <div
          v-show="drawerOpen"
          class="drawer-container"
          :class="`drawer-${placement}`"
          :style="[{ zIndex, transform: sPush ? pushTransform : undefined }, contentWrapperStyle, wrapperSizeStyle]"
        >
          <div class="drawer-content">
            <div v-if="shouldRenderBody" class="drawer-body-wrapper">
              <div v-show="showHeader" class="drawer-header" :class="headerClass" :style="headerStyle">
                <div class="header-title">
                  <span v-if="closable" class="drawer-close" @click="closeDrawer">
                    <slot name="closeIcon">
                      <component v-if="closeIconNode" :is="closeIconNode" class="svg-close" />
                      <svg
                        v-else
                        focusable="false"
                        class="svg-close"
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                      >
                        <path
                          d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                        ></path>
                      </svg>
                    </slot>
                  </span>
                  <div v-if="showTitle" class="header-title">
                    <slot name="title">{{ title }}</slot>
                  </div>
                </div>
                <div v-if="showExtra" class="header-extra">
                  <slot name="extra">{{ extra }}</slot>
                </div>
              </div>
              <Scrollbar v-bind="scrollbarProps">
                <div class="drawer-body" :class="bodyClass" :style="bodyStyle">
                  <slot></slot>
                </div>
              </Scrollbar>
              <div v-if="showFooter" class="drawer-footer" :class="footerClass" :style="footerStyle">
                <slot name="footer">{{ footer }}</slot>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
// 遮罩的离场终点也落在 leave-active 上，与面板位移同步开始，避免遮罩比面板晚两帧才淡出
.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
.drawer-wrap {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  outline: none;
  // getContainer: false 时渲染在当前 DOM，改用绝对定位相对最近定位祖先
  &.is-inline {
    position: absolute;
  }
  .drawer-mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    pointer-events: auto;
  }
  .drawer-container {
    position: absolute;
    transition: all 0.3s;
    .drawer-content {
      width: 100%;
      height: 100%;
      overflow: auto;
      background: #ffffff;
      pointer-events: auto;
      .drawer-body-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .drawer-header {
          display: flex;
          flex: 0;
          align-items: center;
          padding: 16px 24px;
          font-size: 16px;
          line-height: 1.5;
          border-bottom: 1px solid rgba(5, 5, 5, 0.06);
          // 标题文字节点复用了同名类 header-title，若不用直接子选择器限定，flex 会一并命中内层文字节点，
          // 使其变成 flex 容器（子项按 justify-content 排列），headerStyle 的 text-align 随之失效、标题无法居中
          > .header-title {
            display: flex;
            flex: 1;
            align-items: center;
            min-width: 0;
            min-height: 0;
            .drawer-close {
              display: inline-flex;
              align-items: center;
              margin-right: 12px;
              color: rgba(0, 0, 0, 0.45);
              cursor: pointer;
              transition: color 0.2s;
              &:hover {
                color: rgba(0, 0, 0, 0.88);
              }
              .svg-close {
                display: inline-block;
                font-size: 16px;
                font-weight: 600;
                fill: currentColor;
              }
            }
            .header-title {
              flex: 1;
              margin: 0;
              color: rgba(0, 0, 0, 0.88);
              font-weight: 600;
              font-size: 16px;
              line-height: 1.5;
            }
          }
          .header-extra {
            flex: none;
            color: rgba(0, 0, 0, 0.88);
          }
        }
        .drawer-body {
          height: 100%;
          padding: 24px;
          // 按单词换行，仅当单词超长放不下时才在词内断行，避免英文被腰斩
          word-break: break-word;
        }
        .drawer-footer {
          flex-shrink: 0;
          padding: 8px 16px;
          border-top: 1px solid rgba(5, 5, 5, 0.06);
          color: rgba(0, 0, 0, 0.88);
        }
      }
    }
  }
  .drawer-top {
    top: 0;
    left: 0;
    right: 0;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .drawer-right {
    top: 0;
    right: 0;
    bottom: 0;
    box-shadow:
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05);
  }
  .drawer-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow:
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .drawer-left {
    top: 0;
    bottom: 0;
    left: 0;
    box-shadow:
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05);
  }
  // 面板位移动画：enter 起点与 leave 终点分别落在 enter-from / leave-active 上；
  // transition: none 须置于 active 规则之后，才能覆盖常驻 transition，保证 enter 起始态不产生过渡
  .motion-top-enter-active,
  .motion-right-enter-active,
  .motion-bottom-enter-active,
  .motion-left-enter-active,
  .motion-top-leave-active,
  .motion-right-leave-active,
  .motion-bottom-leave-active,
  .motion-left-leave-active {
    transition: all 0.3s;
  }
  .motion-top-enter-from,
  .motion-right-enter-from,
  .motion-bottom-enter-from,
  .motion-left-enter-from {
    transition: none;
  }
  .motion-top-enter-from,
  .motion-top-leave-active {
    transform: translateY(-100%);
  }
  .motion-right-enter-from,
  .motion-right-leave-active {
    transform: translateX(100%);
  }
  .motion-bottom-enter-from,
  .motion-bottom-leave-active {
    transform: translateY(100%);
  }
  .motion-left-enter-from,
  .motion-left-leave-active {
    transform: translateX(-100%);
  }
}
</style>
