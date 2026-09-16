<script setup lang="ts">
import { computed, ref, nextTick, getCurrentInstance, onBeforeUnmount, h } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Tooltip from 'components/tooltip'
import { useSlotsExist, useResizeObserver, rafTimeout, cancelRaf } from 'components/utils'
export type Key = string | number
export interface MenuOption {
  key?: Key // 菜单项唯一标识
  label?: string // 菜单项显示文本，插槽形态请用 #label
  icon?: VNode // 菜单项图标
  disabled?: boolean // 是否禁用
  danger?: boolean // 是否为危险项（红色文本）
  loading?: boolean // 是否加载中
  href?: string // 链接地址，存在时菜单项渲染为 a 标签
  target?: '_self' | '_blank' // 链接打开方式，href 存在时生效
  type?: 'item' | 'divider' | 'group' // 菜单项类型：菜单项 | 分割线 | 分组
  children?: MenuOption[] // 子菜单（多级菜单）或分组子项
  [key: string]: unknown // 其他自定义字段
}
// 箭头配置（对齐 antdv：arrow 传对象可控制箭头是否指向触发器中心）
export interface DropdownArrowOptions {
  pointAtCenter?: boolean // 箭头是否指向触发器中心
}

export interface Props {
  menus?: MenuOption[] // 菜单项配置数据 (配置式)，与 overlay 插槽二选一
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 下拉菜单弹出位置
  trigger?: 'hover' | 'click' | 'contextMenu' // 触发下拉行为的方式
  disabled?: boolean // 菜单是否禁用
  arrow?: boolean | DropdownArrowOptions // 是否显示下拉箭头；传 { pointAtCenter: true } 时箭头指向触发器中心
  open?: boolean // (v-model) 下拉菜单是否展开
  flip?: boolean // 下拉菜单被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  to?: string | HTMLElement | false // 下拉菜单挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  overlayClassName?: string // 下拉菜单根元素的类名
  overlayStyle?: CSSProperties // 下拉菜单根元素的样式
  transitionDuration?: number // 下拉菜单动画的过渡持续时间，单位 ms
  mouseEnterDelay?: number // 移入触发器显示下拉菜单的延迟时间，单位 ms，仅当 trigger: 'hover' 时生效
  mouseLeaveDelay?: number // 移出触发器隐藏下拉菜单的延迟时间，单位 ms，仅当 trigger: 'hover' 时生效
}
// 声明组件插槽类型
export interface DropdownSlots {
  default?: () => VNode[]
  overlay?: () => VNode[]
  label?: (props: { option: MenuOption }) => VNode[]
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
defineSlots<DropdownSlots>()
const emits = defineEmits(['update:open', 'openChange', 'menuClick'])
const slotsExist = useSlotsExist(['overlay', 'label'])
// 菜单项加载指示符：对齐 antdv 菜单项使用的 LoadingOutlined（内联 SVG，避免引入图标运行时依赖）
const loadingIcon = h(
  'svg',
  {
    class: 'dropdown-menu-item-loading',
    focusable: 'false',
    'data-icon': 'loading',
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true',
    viewBox: '0 0 1024 1024'
  },
  [
    h('path', {
      d: 'M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z'
    })
  ]
)
const showOverlay = computed(() => {
  return slotsExist.overlay || props.menus.length > 0
})
// 箭头是否显示（antdv 语义：arrow 传入对象时同样视为显示）
const showArrow = computed<boolean>(() => {
  return typeof props.arrow === 'boolean' ? props.arrow : true
})
// 箭头是否指向触发器中心
const arrowPointAtCenter = computed<boolean>(() => {
  return typeof props.arrow === 'object' && props.arrow?.pointAtCenter === true
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
// 收起后的对齐复位定时器标识：延迟到隐藏过渡结束后再复位，避免动画期间浮层跳位
const resetTimer = ref<ReturnType<typeof setTimeout> | null>(null)
// 内部显示状态，未受控时使用
const innerOpen = ref<boolean>(false)
// 上次已对外通知的展开状态：Tooltip 会随浮层显隐一并回调 openChange，
// 记录该值可避免「同一状态被通知两次」（如点击菜单项：本组件先关闭，Tooltip 关闭后再次回调）
let notifiedOpen: boolean | null = null
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
// 箭头中心距浮层对齐边的水平距离，对齐 antdv 的 dropdownArrowOffset：
// 箭头元素边缘距对齐边 6px（12 - arrowInnerOffset 6）+ 箭头半宽 8px
const ARROW_EDGE_OFFSET = 14
// 触发器宽度，作为浮层最小宽度（对齐 antdv 的 minOverlayWidthMatchTrigger 默认行为）
const triggerMinWidth = ref<number>(0)
// 浮层最终样式：叠加对齐修正的 transform（contextMenu 修正 x/y，其余仅修正 x）
const mergedOverlayStyle = computed<CSSProperties>(() => {
  const { x, y } = alignOffset.value
  const needTransform = x !== 0 || y !== 0
  return {
    padding: '4px',
    borderRadius: '8px',
    // 浮层为白底，需显式指定文字色：否则继承 Tooltip 卡片的白色文字，overlay 插槽的自定义内容会「隐形」
    color: 'rgba(0, 0, 0, 0.88)',
    // 浮层宽度不小于触发器宽度（antdv 默认行为，右键菜单跟随鼠标定位故不拉伸）
    minWidth: triggerMinWidth.value > 0 ? `${triggerMinWidth.value}px` : undefined,
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
  // 箭头指向中心：移动浮层（而非移动箭头），位移量取「箭头中心距对齐边」值，令箭头中心恰好落在触发器中心
  // （antdv 此处固定用历史常量 20，与其箭头实际距边 14 不符，箭头会偏离中心 6px；本库修正为精确指向）
  const pointAtCenterShift = arrowPointAtCenter.value ? tRect.width / 2 - ARROW_EDGE_OFFSET : 0
  if (alignDirection.value === 'left') {
    // 左对齐：浮层左边缘对齐触发器左边缘
    alignOffset.value = { x: tRect.left + pointAtCenterShift - baseLeft, y: 0 }
  } else {
    // 右对齐：浮层右边缘对齐触发器右边缘
    alignOffset.value = { x: tRect.right - pointAtCenterShift - baseRight, y: 0 }
  }
}
// 箭头水平位置：居中方向交回 Tooltip 默认居中；左右对齐方向按 antdv 规则距对齐边固定偏移
function updateArrowOffset(): void {
  const containerEl = overlayRef.value?.parentElement
  const arrowEl = containerEl?.querySelector<HTMLElement>('.tooltip-arrow')
  if (!arrowEl || !containerEl) {
    return
  }
  if (alignDirection.value === 'center') {
    arrowEl.style.left = ''
    return
  }
  // 用布局宽度（offsetWidth）而非 rect：rect 会受缩放 / 过渡动画影响而读数偏小
  const containerWidth = containerEl.offsetWidth
  const cardOffset = alignDirection.value === 'left' ? ARROW_EDGE_OFFSET : containerWidth - ARROW_EDGE_OFFSET
  // 箭头定位在浮层容器上，而水平对齐偏移作用在卡片（子元素）上，两者坐标系相差 alignOffset.x，需换算到容器坐标
  // 箭头自带 translateX(-50%)，此处 left 即箭头中心位置
  arrowEl.style.left = `${cardOffset + alignOffset.value.x}px`
}
// 卡片尺寸（展开后测量），用于计算缩放动画原点
const cardSize = ref<{ width: number; height: number }>({ width: 0, height: 0 })
// 缩放动画原点：显式按卡片位置给出（水平取卡片中心，垂直取卡片「靠近触发器的一侧」——主轴 top 时取底边）。
// 缩放载体是容器、对齐平移载体是卡片，若不覆盖，Tooltip 依 placement 计算的原点会脱离卡片（右键菜单跟随鼠标定位时最明显）
const overlayTransformOrigin = computed<string | undefined>(() => {
  const { width, height } = cardSize.value
  if (width === 0) {
    return undefined
  }
  const { x, y } = alignOffset.value
  const originY = tooltipPlacement.value === 'top' ? y + height : y
  return `${x + width / 2}px ${originY}px`
})
// 测量卡片尺寸（对齐修正后尺寸已稳定）
function measureCardSize(): void {
  const cardEl = overlayRef.value
  if (!cardEl) {
    return
  }
  cardSize.value = { width: cardEl.offsetWidth, height: cardEl.offsetHeight }
}
// 浮层最小宽度取触发器宽度（右键菜单跟随鼠标定位，不做拉伸）
function updateTriggerMinWidth(): void {
  triggerMinWidth.value = props.trigger === 'contextMenu' ? 0 : (triggerRef.value?.offsetWidth ?? 0)
}
// 重算浮层位置：先修正对齐偏移，再同步卡片尺寸与箭头位置
function refreshPosition(): void {
  computeAlignOffset()
  measureCardSize()
  updateArrowOffset()
}
// 监听浮层尺寸变化，尺寸变化时重算对齐偏移（应对首次渲染宽度变化的竞态）
const { start: startObserveOverlay, stop: stopObserveOverlay } = useResizeObserver(overlayRef, () => {
  refreshPosition()
})
// 展开后启动对齐修正：定位浮层元素 + 多帧收敛 + 尺寸监听
async function updateAlignOffset(): Promise<void> {
  // 取消上次收起时排队的复位，避免刚展开就被复位（保留的偏移会被重新测量覆盖）
  clearResetTimer()
  // SSR 环境无 document，跳过对齐修正（对齐定位仅在浏览器端生效）
  if (typeof document === 'undefined') {
    return
  }
  // 先更新浮层最小宽度，使其在本次渲染中生效，避免首帧测量偏差
  updateTriggerMinWidth()
  await nextTick()
  overlayRef.value = document.querySelector(`.${overlayId}`)
  if (!overlayRef.value) {
    return
  }
  // 居中方向由 computeAlignOffset 归零、箭头由 updateArrowOffset 复位，无需在此单独分支
  refreshPosition()
  // Tooltip 定位为异步，二次收敛确保对齐到最终位置
  if (alignTimer.value) {
    cancelRaf(alignTimer.value)
  }
  alignTimer.value = rafTimeout(() => {
    refreshPosition()
  }, 0)
  startObserveOverlay()
}
// 复位对齐偏移与箭头内联偏移（此刻浮层已隐藏，不产生视觉变化）
function resetAlignOffset(): void {
  const arrowEl = overlayRef.value?.parentElement?.querySelector<HTMLElement>('.tooltip-arrow')
  if (arrowEl) {
    arrowEl.style.left = ''
  }
  overlayRef.value = null
  alignOffset.value = { x: 0, y: 0 }
}
function clearResetTimer(): void {
  if (resetTimer.value) {
    clearTimeout(resetTimer.value)
    resetTimer.value = null
  }
}
// 收起时停止监听，并把对齐复位推迟到隐藏过渡结束后
// （立即复位会让浮层在淡出动画中跳回 Tooltip 默认居中位置，出现一闪而过的错位）
function resetAlign(): void {
  stopObserveOverlay()
  contextPos.value = null
  clearResetTimer()
  resetTimer.value = setTimeout(() => {
    resetAlignOffset()
    resetTimer.value = null
  }, props.transitionDuration)
}
onBeforeUnmount(() => {
  if (alignTimer.value) {
    cancelRaf(alignTimer.value)
  }
  clearResetTimer()
  stopObserveOverlay()
})
// Dropdown trigger → Tooltip trigger 映射（contextMenu 走 click，触发器层单独处理右键）
const tooltipTrigger = computed<'hover' | 'click'>(() => {
  return props.trigger === 'hover' ? 'hover' : 'click'
})
// 浮层过渡动画名：取 Tooltip 内置的 slide-y（纵向卷帘，scaleY），对齐 antdv Dropdown 的 slide 展开效果；
// 展开方向复用 Tooltip 依 placement 计算的内联 transform-origin（始终落在靠近触发器的一侧）
const tooltipTransitionName = 'slide-y'
// disabled 或无浮层内容时，禁止 hover 触发（Tooltip showControl 仅 hover 生效）
const disableTrigger = computed<boolean>(() => {
  return props.disabled || !showOverlay.value
})
function onOpenChange(val: boolean): void {
  if (disableTrigger.value && val) {
    return
  }
  // 状态未变化则不重复通知（Tooltip 显隐回调会与自身关闭请求叠加）
  if (notifiedOpen === val) {
    return
  }
  notifiedOpen = val
  mergedOpen.value = val
  emits('openChange', val)
  if (val) {
    updateAlignOffset()
  } else if (!mergedOpen.value) {
    // 受控模式下外部仍保持 open 为 true 时不收起（如「点击菜单项不关闭」用例），仅在真正收起时重置对齐
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
    class="dropdown-wrap"
    :placement="tooltipPlacement"
    :trigger="tooltipTrigger"
    :arrow="showArrow"
    :flip="flip"
    :to="to"
    :show="mergedOpen"
    bg-color="#fff"
    :max-width="'auto'"
    :transition-duration="transitionDuration"
    :transition-name="tooltipTransitionName"
    :transform-origin="overlayTransformOrigin"
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
                      <component :is="child.loading ? loadingIcon : child.icon" />
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
                  <component :is="option.loading ? loadingIcon : option.icon" />
                </span>
                <span class="dropdown-menu-item-label">
                  <slot name="label" :option="option">{{ option.label }}</slot>
                </span>
                <span v-if="option.children?.length" class="dropdown-menu-item-arrow">
                  <!-- 展开图标对齐 antdv 的 RightOutlined（内联 SVG，写法同 Select 的 close-circle） -->
                  <svg
                    focusable="false"
                    data-icon="right"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
                    ></path>
                  </svg>
                </span>
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
                      <component :is="child.loading ? loadingIcon : child.icon" />
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
}
.dropdown-trigger-disabled {
  cursor: not-allowed;
  // 按钮触发器：改用禁用配色（对齐 antdv 把 disabled 注入触发器的观感），不再叠加整体透明度
  :deep(.btn-wrap) {
    color: rgba(0, 0, 0, 0.25);
    border-color: #d9d9d9;
    background-color: rgba(0, 0, 0, 0.04);
  }
  // 其他触发器（链接 / 文本等）：降低整体不透明度示意禁用
  > :deep(*:not(.btn-wrap)) {
    opacity: 0.65;
  }
  :deep(*) {
    pointer-events: none;
  }
}
/* 菜单宽度由内容决定（对齐 antdv：其下拉主菜单未设最小宽度，见 ant-design-vue dropdown/style） */
.dropdown-menu {
  margin: 0;
  padding: 0;
  list-style: none;
}
.dropdown-menu-divider {
  height: 1px;
  margin: 4px 0;
  background-color: rgba(5, 5, 5, 0.06);
}
.dropdown-menu-group-title {
  padding: 5px 12px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  transition: all 0.3s;
}
.dropdown-menu-group-list {
  // 组内子项左右各留 8px（对齐 antd 的 menu-item-group-list margin），配合项自身水平内边距形成相对标题的缩进
  margin: 0 8px;
  padding: 0;
  list-style: none;
}
.dropdown-menu-item {
  position: relative;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  transition: all 0.3s;
}
.dropdown-menu-item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  color: inherit;
  text-decoration: none;
}
.dropdown-menu-item:hover:not(.dropdown-menu-item-disabled) {
  background-color: rgba(0, 0, 0, 0.04);
}
.dropdown-menu-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 14px;
  font-size: 14px;
  // 加载指示符由组件内 h() 创建（VNode 不带 scoped 属性），需经 :deep 从容器穿透命中
  :deep(.dropdown-menu-item-loading) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font-size: 14px;
    animation: dropdown-spin 1s linear infinite;
    @keyframes dropdown-spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
.dropdown-menu-item-label {
  flex: 1;
  white-space: nowrap;
}
// 展开图标对齐 antdv Dropdown：RightOutlined 图标（12px、次要文字色、绝对定位在项右侧 8px）
.dropdown-menu-item-arrow {
  position: absolute;
  top: 50%;
  right: 8px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  transform: translateY(-50%);
}
.dropdown-menu-item-disabled {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  .dropdown-menu-item-content {
    pointer-events: none;
  }
}
.dropdown-menu-item-danger {
  color: #ff4d4f;
  &:hover:not(.dropdown-menu-item-disabled) {
    color: #fff;
    background-color: #ff4d4f;
  }
}
.dropdown-menu-item-submenu {
  // 为右侧展开箭头留出空间（对齐 antd submenu-title 的 paddingInlineEnd = 12px 内边距 + 12px 图标宽）
  > .dropdown-menu-item-content {
    padding-right: 24px;
  }
  .dropdown-submenu {
    position: absolute;
    // 位置对齐 antdv menu 的 rightTop placement：左上角对齐父项右上角；
    // 水平间距 = 4px offset + popup 内 ul 的 0.3em 外边距（父项右边界距卡片右边界 4px，故合计 8px）
    top: 0;
    left: calc(100% + 8px);
    // 子菜单最小宽度对齐 antdv 的 menu token dropdownWidth (160px)
    min-width: 160px;
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
    // 展开动画对齐 antdv 的 zoom-big motion（scale 0.8↔1 + 左上角原点），而非水平位移；
    // 收起沿用 zoom-big 的退场缓动（motionEaseInOutCirc），展开时由 hover 规则切为出场缓动
    transform-origin: 0 0;
    transform: scale(0.8);
    transition:
      opacity 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      transform 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      visibility 0.2s;
    pointer-events: none;
  }
  // 禁用项不展开子菜单（对齐官网 disabled sub menu 行为）
  &:not(.dropdown-menu-item-disabled):hover > .dropdown-submenu {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    pointer-events: auto;
    // 展开（enter）用 antd zoom-big 的出场缓动 motionEaseOutCirc
    transition-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  }
}
</style>
