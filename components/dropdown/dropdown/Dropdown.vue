<script setup lang="ts">
import { computed, ref, nextTick, getCurrentInstance, onBeforeUnmount } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Tooltip from 'components/tooltip'
import { useSlotsExist, useResizeObserver, rafTimeout, cancelRaf } from 'components/utils'
export type Key = string | number
export interface MenuOption {
  key?: Key // 菜单项唯一标识
  label?: string // 菜单项显示文本 string | slot(label)
  icon?: VNode // 菜单项图标
  disabled?: boolean // 是否禁用
  danger?: boolean // 是否为危险项（红色文本）
  loading?: boolean // 是否加载中
  href?: string // 链接地址，存在时菜单项渲染为 a 标签
  target?: '_self' | '_blank' // 链接打开方式，href 存在时生效
  type?: 'item' | 'divider' | 'group' // 菜单项类型：菜单项 | 分割线 | 分组
  children?: MenuOption[] // 子菜单（多级菜单）或分组子项
  [key: string]: any // 其他自定义字段
}
export interface Props {
  menus?: MenuOption[] // 菜单项配置数据 (配置式)，与 overlay 插槽二选一
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 下拉菜单弹出位置
  trigger?: 'hover' | 'click' | 'contextMenu' // 触发下拉行为的方式
  disabled?: boolean // 菜单是否禁用
  arrow?: boolean // 是否显示下拉箭头
  open?: boolean // (v-model) 下拉菜单是否展开
  flip?: boolean // 下拉菜单被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  to?: string | HTMLElement | false // 下拉菜单挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  overlayClassName?: string // 下拉菜单根元素的类名
  overlayStyle?: CSSProperties // 下拉菜单根元素的样式
  transitionDuration?: number // 下拉菜单动画的过渡持续时间，单位 ms
  mouseEnterDelay?: number // 移入触发器显示下拉菜单的延迟时间，单位 ms，仅当 trigger: 'hover' 时生效
  mouseLeaveDelay?: number // 移出触发器隐藏下拉菜单的延迟时间，单位 ms，仅当 trigger: 'hover' 时生效
}
const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
  placement: 'bottomLeft',
  trigger: 'hover',
  disabled: false,
  arrow: false,
  open: undefined,
  flip: true,
  to: 'body',
  overlayClassName: undefined,
  overlayStyle: () => ({}),
  transitionDuration: 200,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100
})
const emits = defineEmits(['update:open', 'openChange', 'menuClick'])
const slotsExist = useSlotsExist(['overlay'])
const showOverlay = computed(() => {
  return slotsExist.overlay || props.menus.length > 0
})
// 组件唯一标识，用于定位 teleport 出去的浮层元素
const uid = getCurrentInstance()?.uid ?? 0
const overlayId = `dropdown-overlay-${uid}`
// 触发器模板引用
const triggerRef = ref<HTMLElement | null>(null)
// teleport 出去的浮层根元素引用（展开后 querySelector 获取）
const overlayRef = ref<HTMLElement | null>(null)
// 对齐修正偏移量 { x, y }，单位 px（Tooltip 默认水平居中，需按 placement 修正为左/右对齐；
// contextMenu 触发时需同时修正 x/y 使菜单跟随鼠标点击位置弹出）
const alignOffset = ref<{ x: number; y: number }>({ x: 0, y: 0 })
// contextMenu 触发时记录的鼠标点击坐标（相对视口）
const contextPos = ref<{ x: number; y: number } | null>(null)
// 对齐修正的 raf 定时器标识
const alignTimer = ref<{ id: number } | null>(null)
// 内部显示状态，未受控时使用
const innerOpen = ref<boolean>(false)
const mergedOpen = computed<boolean>({
  get() {
    return props.open === undefined ? innerOpen.value : props.open
  },
  set(val: boolean) {
    innerOpen.value = val
    emits('update:open', val)
  }
})
// Dropdown 6 向 placement → Tooltip 4 向 placement 的映射
const tooltipPlacement = computed<'top' | 'bottom' | 'left' | 'right'>(() => {
  return props.placement.startsWith('top') ? 'top' : 'bottom'
})
// 水平对齐方向：left / center / right
const alignDirection = computed<'left' | 'center' | 'right'>(() => {
  if (props.placement.endsWith('Left')) {
    return 'left'
  }
  if (props.placement.endsWith('Right')) {
    return 'right'
  }
  return 'center'
})
// 浮层最终样式：叠加对齐修正的 transform（contextMenu 修正 x/y，其余仅修正 x）
const mergedOverlayStyle = computed<CSSProperties>(() => {
  const { x, y } = alignOffset.value
  const needTransform = x !== 0 || y !== 0
  return {
    padding: '4px',
    borderRadius: '8px',
    transform: needTransform ? `translate(${x}px, ${y}px)` : undefined,
    ...props.overlayStyle
  }
})
// 展开后测量浮层与触发器实际位置，计算对齐所需的偏移
// 采用「基于实际位置修正」而非「宽度差推算」：读取浮层当前 rect 并还原 Tooltip 原始定位，
// 再对齐到目标位置，可自适应 Tooltip 异步定位与浮层尺寸变化，避免测量竞态
function computeAlignOffset(): void {
  const overlayEl = overlayRef.value
  const triggerEl = triggerRef.value
  if (!overlayEl || !triggerEl) {
    return
  }
  const oRect = overlayEl.getBoundingClientRect()
  const { x: curX, y: curY } = alignOffset.value
  // 还原浮层未叠加对齐偏移时（Tooltip 原始定位）的边缘位置
  const baseLeft = oRect.left - curX
  const baseRight = oRect.right - curX
  const baseTop = oRect.top - curY
  // contextMenu：菜单跟随鼠标点击位置弹出（左上角对齐鼠标坐标）
  if (props.trigger === 'contextMenu' && contextPos.value) {
    alignOffset.value = {
      x: contextPos.value.x - baseLeft,
      y: contextPos.value.y - baseTop
    }
    return
  }
  // 居中：无需水平修正
  if (alignDirection.value === 'center') {
    alignOffset.value = { x: 0, y: 0 }
    return
  }
  const tRect = triggerEl.getBoundingClientRect()
  if (alignDirection.value === 'left') {
    // 左对齐：浮层左边缘对齐触发器左边缘
    alignOffset.value = { x: tRect.left - baseLeft, y: 0 }
  } else {
    // 右对齐：浮层右边缘对齐触发器右边缘
    alignOffset.value = { x: tRect.right - baseRight, y: 0 }
  }
}
// 监听浮层尺寸变化，尺寸变化时重算对齐偏移（应对首次渲染宽度变化的竞态）
const { start: startObserveOverlay, stop: stopObserveOverlay } = useResizeObserver(overlayRef, () => {
  computeAlignOffset()
})
// 展开后启动对齐修正：定位浮层元素 + 多帧收敛 + 尺寸监听
async function updateAlignOffset(): Promise<void> {
  const isContextMenu = props.trigger === 'contextMenu'
  // 居中且非右键菜单，无需修正
  if (alignDirection.value === 'center' && !isContextMenu) {
    alignOffset.value = { x: 0, y: 0 }
    return
  }
  await nextTick()
  overlayRef.value = document.querySelector(`.${overlayId}`)
  if (!overlayRef.value) {
    return
  }
  computeAlignOffset()
  // Tooltip 定位为异步，二次收敛确保对齐到最终位置
  if (alignTimer.value) {
    cancelRaf(alignTimer.value)
  }
  alignTimer.value = rafTimeout(() => {
    computeAlignOffset()
  }, 0)
  startObserveOverlay()
}
// 收起时停止监听并重置
function resetAlign(): void {
  stopObserveOverlay()
  overlayRef.value = null
  alignOffset.value = { x: 0, y: 0 }
  contextPos.value = null
}
onBeforeUnmount(() => {
  if (alignTimer.value) {
    cancelRaf(alignTimer.value)
  }
  stopObserveOverlay()
})
// Dropdown trigger → Tooltip trigger 映射（contextMenu 走 click，触发器层单独处理右键）
const tooltipTrigger = computed<'hover' | 'click'>(() => {
  return props.trigger === 'hover' ? 'hover' : 'click'
})
// disabled 或无浮层内容时，禁止 hover 触发（Tooltip showControl 仅 hover 生效）
const disableTrigger = computed<boolean>(() => {
  return props.disabled || !showOverlay.value
})
function onOpenChange(val: boolean): void {
  if (disableTrigger.value && val) {
    return
  }
  mergedOpen.value = val
  emits('openChange', val)
  if (val) {
    updateAlignOffset()
  } else {
    resetAlign()
  }
}
// 右键触发：阻止默认菜单并在鼠标点击位置弹出
function onContextMenu(e: MouseEvent): void {
  if (props.trigger !== 'contextMenu' || props.disabled || !showOverlay.value) {
    return
  }
  e.preventDefault()
  // 记录鼠标点击坐标（相对视口），菜单左上角对齐到此处
  contextPos.value = { x: e.clientX, y: e.clientY }
  mergedOpen.value = true
  emits('openChange', true)
  updateAlignOffset()
}
// 点击菜单项
function onItemClick(option: MenuOption): void {
  if (option.disabled || option.loading) {
    return
  }
  emits('menuClick', option.key, option)
  if (option.href) {
    // 有 children 的父项不关闭，普通项点击后关闭浮层
    return
  }
  if (!option.children?.length) {
    onOpenChange(false)
  }
}
// 判断菜单项类型
function getItemType(option: MenuOption): 'divider' | 'group' | 'item' {
  return option.type ?? 'item'
}
</script>
<template>
  <Tooltip
    :placement="tooltipPlacement"
    :trigger="tooltipTrigger"
    :arrow="arrow"
    :flip="flip"
    :to="to"
    :show="mergedOpen"
    bg-color="#fff"
    :max-width="'auto'"
    :transition-duration="transitionDuration"
    :show-delay="mouseEnterDelay"
    :hide-delay="mouseLeaveDelay"
    :tooltip-class="['dropdown-overlay', overlayId, overlayClassName].filter(Boolean).join(' ')"
    :tooltip-style="mergedOverlayStyle"
    :show-control="disableTrigger"
    @open-change="onOpenChange"
  >
    <template #tooltip>
      <!-- 自定义浮层内容 -->
      <slot name="overlay">
        <!-- 配置式菜单渲染 -->
        <ul class="dropdown-menu" role="menu">
          <template v-for="(option, index) in menus" :key="option.key ?? index">
            <!-- 分割线 -->
            <li v-if="getItemType(option) === 'divider'" class="dropdown-menu-divider" role="separator"></li>
            <!-- 分组 -->
            <li v-else-if="getItemType(option) === 'group'" class="dropdown-menu-group" role="presentation">
              <div class="dropdown-menu-group-title">
                <slot name="label" :option="option">{{ option.label }}</slot>
              </div>
              <ul class="dropdown-menu-group-list">
                <li
                  v-for="(child, cIndex) in option.children"
                  :key="child.key ?? cIndex"
                  class="dropdown-menu-item"
                  :class="{
                    'dropdown-menu-item-disabled': child.disabled,
                    'dropdown-menu-item-danger': child.danger
                  }"
                  role="menuitem"
                  @click="onItemClick(child)"
                >
                  <component
                    :is="child.href ? 'a' : 'div'"
                    class="dropdown-menu-item-content"
                    :href="child.href"
                    :target="child.target"
                  >
                    <span v-if="child.icon || child.loading" class="dropdown-menu-item-icon">
                      <span v-if="child.loading" class="dropdown-menu-item-loading"></span>
                      <component :is="child.icon" v-else />
                    </span>
                    <span class="dropdown-menu-item-label">
                      <slot name="label" :option="child">{{ child.label }}</slot>
                    </span>
                  </component>
                </li>
              </ul>
            </li>
            <!-- 普通菜单项 / 含子菜单项 -->
            <li
              v-else
              class="dropdown-menu-item"
              :class="{
                'dropdown-menu-item-disabled': option.disabled,
                'dropdown-menu-item-danger': option.danger,
                'dropdown-menu-item-submenu': option.children?.length
              }"
              role="menuitem"
              @click="onItemClick(option)"
            >
              <component
                :is="option.href ? 'a' : 'div'"
                class="dropdown-menu-item-content"
                :href="option.href"
                :target="option.target"
              >
                <span v-if="option.icon || option.loading" class="dropdown-menu-item-icon">
                  <span v-if="option.loading" class="dropdown-menu-item-loading"></span>
                  <component :is="option.icon" v-else />
                </span>
                <span class="dropdown-menu-item-label">
                  <slot name="label" :option="option">{{ option.label }}</slot>
                </span>
                <span v-if="option.children?.length" class="dropdown-menu-item-arrow"></span>
              </component>
              <!-- 多级子菜单（递归展开） -->
              <ul v-if="option.children?.length" class="dropdown-submenu" role="menu">
                <li
                  v-for="(child, cIndex) in option.children"
                  :key="child.key ?? cIndex"
                  class="dropdown-menu-item"
                  :class="{
                    'dropdown-menu-item-disabled': child.disabled,
                    'dropdown-menu-item-danger': child.danger
                  }"
                  role="menuitem"
                  @click.stop="onItemClick(child)"
                >
                  <component
                    :is="child.href ? 'a' : 'div'"
                    class="dropdown-menu-item-content"
                    :href="child.href"
                    :target="child.target"
                  >
                    <span v-if="child.icon || child.loading" class="dropdown-menu-item-icon">
                      <span v-if="child.loading" class="dropdown-menu-item-loading"></span>
                      <component :is="child.icon" v-else />
                    </span>
                    <span class="dropdown-menu-item-label">
                      <slot name="label" :option="child">{{ child.label }}</slot>
                    </span>
                  </component>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </slot>
    </template>
    <!-- 触发器 -->
    <span
      ref="triggerRef"
      class="dropdown-trigger"
      :class="{ 'dropdown-trigger-disabled': disabled }"
      @contextmenu="onContextMenu"
    >
      <slot></slot>
    </span>
  </Tooltip>
</template>
<style lang="less" scoped>
.dropdown-trigger {
  display: inline-block;
  &-disabled {
    cursor: not-allowed;
    opacity: 0.65;
    :deep(*) {
      pointer-events: none;
    }
  }
}
.dropdown-menu {
  min-width: 128px;
  margin: 0;
  padding: 0;
  list-style: none;
  &-divider {
    height: 1px;
    margin: 4px 0;
    background-color: rgba(5, 5, 5, 0.06);
  }
  &-group {
    &-title {
      padding: 5px 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      transition: all 0.3s;
    }
    &-list {
      margin: 0;
      padding: 0;
      list-style: none;
      // 分组子项相对分组标题缩进对齐
      .dropdown-menu-item-content {
        padding-left: 24px;
      }
    }
  }
  &-item {
    position: relative;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    transition: all 0.3s;
    &-content {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 12px;
      color: inherit;
      text-decoration: none;
    }
    &:hover:not(.dropdown-menu-item-disabled) {
      background-color: rgba(0, 0, 0, 0.04);
    }
    &-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 14px;
      font-size: 14px;
    }
    &-loading {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid currentcolor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: dropdown-spin 0.8s linear infinite;
    }
    &-label {
      flex: 1;
      white-space: nowrap;
    }
    &-arrow {
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 4px solid rgba(0, 0, 0, 0.45);
    }
    &-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
      .dropdown-menu-item-content {
        pointer-events: none;
      }
    }
    &-danger {
      color: #ff4d4f;
      &:hover:not(.dropdown-menu-item-disabled) {
        color: #fff;
        background-color: #ff4d4f;
      }
    }
    &-submenu {
      .dropdown-submenu {
        position: absolute;
        top: -5px;
        left: 100%;
        min-width: 128px;
        margin: 0;
        padding: 4px;
        list-style: none;
        background-color: #fff;
        border-radius: 8px;
        box-shadow:
          0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 3px 6px -4px rgba(0, 0, 0, 0.12),
          0 9px 28px 8px rgba(0, 0, 0, 0.05);
        opacity: 0;
        visibility: hidden;
        transform: translateX(4px);
        transition: all 0.2s;
        pointer-events: none;
      }
      &:hover > .dropdown-submenu {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
        pointer-events: auto;
      }
    }
  }
}
@keyframes dropdown-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
