<script setup lang="ts">
/**
 * 下拉菜单：由「触发器 + 触发语义 + 浮层 + 菜单内容」四层职责构成。
 * 浮层的定位 / Teleport / 动画承载由 Popup 承担，触发语义（hover / click / contextmenu）由本组件自持。
 */
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, useSlots, watch } from 'vue'
import type { CSSProperties, Ref, TransitionProps, VNode } from 'vue'
import Popup from 'components/popup'
import {
  FLOATING_LAYER_Z_INDEX,
  useOptionsSupported,
  useResizeObserver,
  useSlotsExist,
  Z_INDEX_CONTAINER_OPEN_KEY
} from 'components/utils'
import type { FloatingPlacement } from 'components/utils'
import { DROPDOWN_MENU_KEY, DropdownMenu } from './DropdownMenu'
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
// 箭头配置（arrow 传对象可控制箭头是否指向触发器中心）
export interface DropdownArrowOptions {
  pointAtCenter?: boolean // 箭头是否指向触发器中心
}
// 触发方式
export type DropdownTrigger = 'hover' | 'click' | 'contextmenu'
export interface Props {
  open?: boolean // (v-model) 下拉菜单是否展开
  menus?: MenuOption[] // 菜单项配置数据 (配置式)，与 overlay 插槽二选一；菜单支持任意层级（children 递归）
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 下拉菜单弹出位置
  arrow?: boolean | DropdownArrowOptions // 是否显示下拉箭头；传 { pointAtCenter: true } 时箭头指向触发器中心
  disabled?: boolean // 菜单是否禁用
  trigger?: DropdownTrigger | DropdownTrigger[] // 触发下拉行为的方式，可传多个组合
  flip?: boolean // 下拉菜单被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  mouseEnterDelay?: number // 移入触发器显示下拉菜单的延迟时间，单位 ms，仅当 trigger 含 'hover' 时生效
  mouseLeaveDelay?: number // 移出触发器隐藏下拉菜单的延迟时间，单位 ms，仅当 trigger 含 'hover' 时生效
  transitionDuration?: number // 下拉菜单动画的过渡持续时间，单位 ms
  destroyOnHide?: boolean // 隐藏后是否卸载下拉菜单 DOM：离开动画结束后卸载，再次显示时重新创建并重新定位；false 时元素常驻、仅切换显示
  to?: string | HTMLElement | false // 下拉菜单挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地；不传时就近挂载到 Modal / Drawer / Dialog 等承载层内容容器（无承载层则 body）
  overlayClassName?: string // 下拉菜单根元素的类名
  overlayStyle?: CSSProperties // 下拉菜单根元素的样式
  zIndex?: number // 下拉菜单层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
}
// 声明组件插槽类型
export interface DropdownSlots {
  default?: () => VNode[]
  overlay?: () => VNode[]
  label?: (props: { option: MenuOption }) => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  menus: () => [],
  placement: 'bottomLeft',
  arrow: false,
  disabled: false,
  // 默认值写成返回数组的工厂函数：trigger 为「单值 | 数组」联合，规则要求含数组形态的 prop 默认值
  // 必须是函数且返回数组（裸值 / 返回字符串均会被 vue/require-valid-default-prop 判为非法）
  trigger: () => ['hover'],
  flip: true,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  transitionDuration: 200,
  destroyOnHide: false,
  to: undefined,
  overlayClassName: undefined,
  overlayStyle: () => ({}),
  zIndex: undefined
})
defineSlots<DropdownSlots>()
const emits = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'openChange', open: boolean): void
  (e: 'menuClick', key: Key | undefined, option: MenuOption): void
}>()
const slots = useSlots()
const slotsExist = useSlotsExist(['overlay'])
const triggerRef = ref<HTMLElement | null>(null) // 触发器元素：浮层锚点与触发事件的落点
const popupRef = ref<InstanceType<typeof Popup> | null>(null) // 浮层宿主引用：面板引用用于判定外部点击
// contextmenu 触发时作为锚点的鼠标位置（视口坐标）：内核的 point 锚点优先级高于 DOM 锚点
const contextPoint = ref<{ x: number; y: number } | null>(null)
const innerOpen = ref<boolean>(false) // 未受控时使用的内部展开态
// 展开态：受控时以 open 为准（内部写入不生效，需外部更新），未受控时用内部态
const mergedOpen = computed<boolean>({
  get() {
    return props.open === undefined ? innerOpen.value : props.open
  },
  set(val: boolean) {
    innerOpen.value = val
  }
})
// 触发方式归一为数组后逐项判定
const triggerTypes = computed<DropdownTrigger[]>(() => {
  return Array.isArray(props.trigger) ? props.trigger : [props.trigger]
})
const useHover = computed<boolean>(() => triggerTypes.value.includes('hover'))
const useClick = computed<boolean>(() => triggerTypes.value.includes('click'))
const useContextMenu = computed<boolean>(() => triggerTypes.value.includes('contextmenu'))
// 是否需要「点击外部关闭」：click / contextmenu 触发时补齐（hover 由移出延迟收起承担）
const needOutsideClick = computed<boolean>(() => useClick.value || useContextMenu.value)
// 浮层内容来源：overlay 插槽优先，其次配置式 menus；两者皆空时不可展开（无浮层内容时不弹出）
const showOverlay = computed<boolean>(() => Boolean(slotsExist.overlay) || props.menus.length > 0)
const canOpen = computed<boolean>(() => !props.disabled && showOverlay.value)
// 箭头是否显示（arrow 传入对象时同样视为显示）
const showArrow = computed<boolean>(() => {
  return typeof props.arrow === 'boolean' ? props.arrow : true
})
// 箭头是否指向触发器中心
const arrowPointAtCenter = computed<boolean>(() => {
  return typeof props.arrow === 'object' && props.arrow?.pointAtCenter === true
})
// 实际方向：定位内核翻转 / 次轴自适应后的结果（宿主未挂载时退回期望方向）
const actualPlacement = computed<FloatingPlacement>(() => {
  return popupRef.value?.actualPlacement ?? props.placement ?? 'bottomLeft'
})
// 次轴对齐方式：Left 为 start，Right 为 end，无后缀为 center
const crossAlign = computed<'start' | 'center' | 'end'>(() => {
  const place = actualPlacement.value
  if (place.endsWith('Left')) {
    return 'start'
  }
  if (place.endsWith('Right')) {
    return 'end'
  }
  return 'center'
})
// 箭头中心距浮层对齐边的距离（px）：箭头元素边缘距边 6px + 箭头半宽 8px
const ARROW_CENTER_OFFSET = 14
// 触发器宽度：仅用于箭头指向中心时计算面板让位量
const anchorWidth = ref<number>(0)
// 箭头指向中心：移动**面板**（而非箭头）使箭头中心落在触发器中心 ——
// 箭头中心距面板对齐边固定为 ARROW_CENTER_OFFSET，故面板需沿次轴让位「锚点半宽 − 该距离」
const arrowCenterShift = computed<CSSProperties>(() => {
  if (!arrowPointAtCenter.value || crossAlign.value === 'center') {
    return {}
  }
  const shifted = anchorWidth.value / 2 - ARROW_CENTER_OFFSET
  return { marginLeft: `${crossAlign.value === 'start' ? shifted : -shifted}px` }
})
// 浮层面板的内联样式：动画时长变量（动画配置归皮肤层，见下方全局样式）+ 箭头让位位移；
// 使用者的 overlayStyle 最后合并，可覆盖定位与上述皮肤值（层级不受其影响，始终由 zIndex prop / 分配器决定）
const panelStyle = computed<CSSProperties>(() => ({
  '--dropdown-transition-duration': `${props.transitionDuration}ms`,
  ...arrowCenterShift.value,
  ...props.overlayStyle
}))
// 面板类名：方向类由宿主落在面板上，箭头 / 菜单皮肤以方向类 + 父子嵌套表达，无需解析方向字符串
const panelClass = computed<string>(() => {
  return ['dropdown-overlay', showArrow.value ? 'dropdown-has-arrow' : '', props.overlayClassName]
    .filter(Boolean)
    .join(' ')
})
// 面板与锚点的尺寸关系：菜单宽度不小于触发器宽度
// contextmenu 触发时浮层跟随鼠标定位，不做拉伸
const matchTriggerWidth = computed<'minWidth' | false>(() => {
  return useContextMenu.value ? false : 'minWidth'
})
// 过渡动画配置：宿主不含皮肤，动画名 / 各阶段类名由本组件提供（关键帧见下方全局样式）。
// 类名与关键帧名统一带 `dropdown-` 前缀：面板由宿主编译（scope id 属宿主），这些规则只能落在全局
// 样式块，用通用名会随库一起污染宿主页面。
const panelTransitionProps: TransitionProps = {
  name: 'dropdown-slide',
  enterFromClass: 'dropdown-slide-enter',
  enterActiveClass: 'dropdown-slide-enter',
  enterToClass: 'dropdown-slide-enter dropdown-slide-enter-active',
  leaveFromClass: 'dropdown-slide-leave',
  leaveActiveClass: 'dropdown-slide-leave dropdown-slide-leave-active',
  leaveToClass: 'dropdown-slide-leave dropdown-slide-leave-active'
}
// label 插槽透传给菜单渲染模块（菜单为渲染函数实现，无法在模板内直接消费插槽）
function renderLabel(option: MenuOption): VNode[] | undefined {
  return slots.label?.({ option })
}
// 菜单上下文：任意层级的菜单项 / 子菜单据此回调，避免逐层透传 props
provide(DROPDOWN_MENU_KEY, {
  renderLabel,
  onSelect: onMenuSelect,
  isOpen: mergedOpen
})
const { isSupported: captureSupported } = useOptionsSupported('capture') // 外部点击监听是否支持 options 形态
let showTimer: ReturnType<typeof setTimeout> | null = null // 延迟展开的定时器
let hideTimer: ReturnType<typeof setTimeout> | null = null // 延迟收起的定时器
let documentListenerAttached = false // 外部点击监听是否已注册，确保注册 / 移除一一对应
// 测量触发器宽度（箭头指向中心时面板需按此让位）
function measureAnchor(): void {
  anchorWidth.value = triggerRef.value?.offsetWidth ?? 0
}
function clearShowTimer(): void {
  if (showTimer !== null) {
    clearTimeout(showTimer)
    showTimer = null
  }
}
function clearHideTimer(): void {
  if (hideTimer !== null) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}
function clearTimers(): void {
  clearShowTimer()
  clearHideTimer()
}
/**
 * 请求变更展开态
 *
 * notify 为假时只改状态、不对外通知 —— 菜单项点击导致的收起走此路径（onMenuSelect）
 */
function requestOpen(val: boolean, notify = true): void {
  if (val && !canOpen.value) {
    return
  }
  const prev = mergedOpen.value
  if (props.open === undefined) {
    innerOpen.value = val
  }
  if (prev === val) {
    return
  }
  if (val) {
    measureAnchor()
  }
  if (notify) {
    emits('update:open', val)
    emits('openChange', val)
  }
}
// 触发器移入：hover 触发时按 mouseEnterDelay 延迟展开
function onTriggerEnter(): void {
  if (!useHover.value) return
  clearHideTimer()
  if (mergedOpen.value || !canOpen.value) return
  clearShowTimer()
  showTimer = setTimeout(() => {
    showTimer = null
    requestOpen(true)
  }, props.mouseEnterDelay)
}
// 触发器移出：无论是否已展开都先取消「待展开」定时器，再按 mouseLeaveDelay 延迟收起（移入浮层会取消）。
// ⚠️ 取消必须先于「是否已展开」判定：若未展开就早返回，快速划过触发器时鼠标已离开、
// 延迟展开仍会照常触发
function onTriggerLeave(): void {
  if (!useHover.value) return
  clearShowTimer()
  if (!mergedOpen.value) return
  scheduleHide()
}
// 浮层移入：取消待执行的收起（鼠标从触发器移到浮层时必经此处）
function onPanelEnter(): void {
  if (useHover.value) {
    clearHideTimer()
  }
}
// 浮层移出：hover 触发时延迟收起
function onPanelLeave(): void {
  if (useHover.value) {
    scheduleHide()
  }
}
function scheduleHide(): void {
  clearHideTimer()
  hideTimer = setTimeout(() => {
    hideTimer = null
    requestOpen(false)
  }, props.mouseLeaveDelay)
}
// 触发器点击：click 触发时切换展开态
function onTriggerClick(): void {
  if (!useClick.value) return
  clearTimers()
  requestOpen(!mergedOpen.value)
}
// 触发器右键：contextmenu 触发时阻止默认菜单，并以鼠标位置为锚点展开
function onTriggerContextMenu(e: MouseEvent): void {
  if (!useContextMenu.value || !canOpen.value) return
  e.preventDefault()
  clearTimers()
  contextPoint.value = { x: e.clientX, y: e.clientY }
  requestOpen(true)
}
// 面板 / 触发器 esc：click / contextmenu 触发时关闭
function onEscKeydown(): void {
  if (!needOutsideClick.value || !mergedOpen.value) return
  requestOpen(false)
}
// 外部点击关闭：仅 click / contextmenu 触发需要，点击触发器与浮层内部均不关闭
function handleDocumentClick(e: MouseEvent): void {
  const target = e.target as Node | null
  if (!target) return
  if (triggerRef.value?.contains(target) || popupRef.value?.panelRef?.contains(target)) return
  clearTimers()
  requestOpen(false)
}
// 注册外部点击关闭监听（幂等，避免重复注册）
function addDocumentListener(): void {
  if (documentListenerAttached || typeof document === 'undefined') return
  document.addEventListener('click', handleDocumentClick, captureSupported.value ? { capture: true } : true)
  documentListenerAttached = true
}
// 移除外部点击关闭监听（幂等；与注册条件解耦，确保显隐切换或卸载时不残留）
function removeDocumentListener(): void {
  if (!documentListenerAttached || typeof document === 'undefined') return
  document.removeEventListener('click', handleDocumentClick, captureSupported.value ? { capture: true } : true)
  documentListenerAttached = false
}
// 菜单项点击：触发 menuClick；无子项的菜单项点击后收起浮层（任意菜单项点击即关闭，含链接项）
function onMenuSelect(option: MenuOption): void {
  if (option.disabled || option.loading) return
  emits('menuClick', option.key, option)
  if (option.children?.length) return
  requestOpen(false, false)
}
// 展开态变化时同步监听与锚点：展开注册外部点击监听，收起清除鼠标锚点并注销监听
watch(
  mergedOpen,
  (open) => {
    if (open) {
      if (needOutsideClick.value) {
        addDocumentListener()
      }
      return
    }
    contextPoint.value = null
    removeDocumentListener()
  },
  { immediate: true }
)
// 触发器宽度变化时刷新让位量（如按钮 loading 文案变化导致宽度变化）
useResizeObserver(triggerRef, () => {
  measureAnchor()
})
// 受控 open 初始为真时，挂载后再测一次锚点宽度，避免首帧以 0 计算让位量
onMounted(measureAnchor)
// 承载层（Modal / Drawer / Dialog）关闭时收起：与 Tooltip / Select 同一不变量 —— 承载层内容常驻不卸载，
// 浮层不会随容器消失；若保持打开，容器重开时浮层会以「仍打开」的状态冒出来。
// Esc 关闭与程序化关闭都不产生 document click，故必须在此显式收起（详见 utils/z-index.ts）
const containerOpen = inject(Z_INDEX_CONTAINER_OPEN_KEY, null) as Ref<boolean> | null
if (containerOpen) {
  watch(containerOpen, (open) => {
    if (!open) {
      clearTimers()
      requestOpen(false)
    }
  })
}
// 卸载时清理定时器与外部点击监听，避免回调在组件卸载后仍触发
onBeforeUnmount(() => {
  clearTimers()
  removeDocumentListener()
})
</script>
<template>
  <!-- 触发器与浮层为**兄弟节点**：浮层在 to: false 就地渲染时会落进根容器内，
       若与触发器同体，浮层内的点击会冒泡到触发器的 click 监听而误触发「切换展开态」 -->
  <div class="dropdown-wrap">
    <span
      ref="triggerRef"
      class="dropdown-trigger"
      :class="{ 'dropdown-trigger-disabled': disabled }"
      @mouseenter="onTriggerEnter"
      @mouseleave="onTriggerLeave"
      @click="onTriggerClick"
      @contextmenu="onTriggerContextMenu"
      @keydown.esc="onEscKeydown"
    >
      <slot></slot>
    </span>
    <!-- 浮层宿主承担 Teleport / 首帧优化 / Transition / 关闭语义 / 层级 / 箭头 DOM；
         面板级监听经宿主的 $attrs 落到面板上（宿主根节点是 Teleport，需显式透传） -->
    <Popup
      ref="popupRef"
      :show="mergedOpen && showOverlay"
      :to="to"
      :destroy-on-hide="destroyOnHide"
      :anchor="triggerRef"
      :point="contextPoint"
      :placement="placement"
      :flip="flip"
      :shift="flip"
      :offset="4"
      :match-trigger-width="matchTriggerWidth"
      :arrow="showArrow"
      arrow-class="dropdown-arrow"
      :panel-class="panelClass"
      :panel-style="panelStyle"
      :z-index="zIndex"
      :default-z-index="FLOATING_LAYER_Z_INDEX.select"
      :transition-props="panelTransitionProps"
      @mouseenter="onPanelEnter"
      @mouseleave="onPanelLeave"
      @keydown.esc="onEscKeydown"
    >
      <!-- 菜单皮肤承载层：面板只做定位盒与箭头槽位，皮肤（背景 / 圆角 / 阴影 / 内边距）落在此层 -->
      <div class="dropdown-content">
        <slot name="overlay">
          <DropdownMenu :options="menus" />
        </slot>
      </div>
    </Popup>
  </div>
</template>
<style lang="less" scoped>
/* 触发器：包裹用户内容并作为浮层锚点，尺寸不额外增加 */
.dropdown-trigger {
  display: inline-block;
}
.dropdown-wrap {
  position: relative;
  display: inline-block;
  font-size: 14px;
}
.dropdown-trigger-disabled {
  cursor: not-allowed;
  // 按钮触发器：改用禁用配色，不再叠加整体透明度
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
</style>
<style lang="less">
/* 仅「面板壳 + 箭头 + 菜单内容 + 动画」必须留在全局：面板与箭头由 <Popup> 宿主编译（scope id 属宿主），
   菜单内容由 DropdownMenu.ts 的渲染函数生成（VNode 不带本组件 scope id），Teleport 到 body 后也不在
   本组件 DOM 子树内（`:deep()` 同样选不中）。收口口径分三类，缺一即外溢到宿主页面：
   ① 面板 / 箭头几何 —— 一律以 .dropdown-overlay 收口；
   ② 菜单内容 —— 一律以 .dropdown-overlay 收口（子菜单面板含同类名，故自动命中）；
   ③ 动画类与关键帧 —— 类名由 <Transition> 落在面板上，无法用①②收口，故类名与关键帧名统一加
      `dropdown-` 前缀，避免全局裸名与宿主页面 / animate.css 撞名 */
.dropdown-overlay {
  width: max-content;
  outline: none;
  font-size: 14px;
  // 箭头元素边缘距面板对齐边的距离
  --dropdown-arrow-edge: 6px;
  // 箭头槽位：仅在渲染箭头时按主轴方向保留
  &.dropdown-has-arrow.va-popup-placement-top,
  &.dropdown-has-arrow.va-popup-placement-topLeft,
  &.dropdown-has-arrow.va-popup-placement-topRight {
    padding-bottom: 12px;
  }
  &.dropdown-has-arrow.va-popup-placement-bottom,
  &.dropdown-has-arrow.va-popup-placement-bottomLeft,
  &.dropdown-has-arrow.va-popup-placement-bottomRight {
    padding-top: 12px;
  }
  /* 菜单皮肤：背景 / 圆角 / 阴影 / 内边距 */
  .dropdown-content {
    padding: 4px;
    color: rgba(0, 0, 0, 0.88);
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 8px;
    // 卡片不继承触发器的 cursor（按钮、链接都是 pointer）
    cursor: auto;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .dropdown-arrow {
    position: absolute;
    /* 必须绘制在菜单盒**之上**：菜单盒自带向下扩散的 box-shadow，若箭头置于其下会被阴影染出一条暗带 */
    z-index: 9;
    display: block;
    pointer-events: none;
    width: 16px;
    height: 16px;
    overflow: hidden;
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 16px;
      height: 8px;
      background-color: #fff;
      clip-path: path(
        'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
      );
      content: '';
    }
    /* 圆角与外投影层：与 ::before 的圆角三角拼成完整箭头。
       ⚠️ 必须显式给出 bottom / left / right —— 只写 width / height 时绝对定位会退回**静态位置**
       （箭头盒左上角），投影跑到左上角后被 overflow 裁出一条「重影」；z-index 用 0，
       与 ::before 同处一个绘制层级、按源码顺序覆盖上去 */
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 8.970562748477143px;
      height: 8.970562748477143px;
      margin: auto;
      border-radius: 0 0 2px 0;
      transform: translateY(50%) rotate(-135deg);
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
      z-index: 0;
      background: transparent;
      content: '';
    }
  }
  /* 主轴几何：方向类由 <Popup> 宿主落在面板上（值取 actualPlacement 的对外命名），零 JS 箭头运算。
     面板为箭头预留 12px 槽位，箭头与菜单盒**相切（不重叠）** —— 重叠会让浅色拼接处显出一条更深的线 */
  &.va-popup-placement-top .dropdown-arrow,
  &.va-popup-placement-topLeft .dropdown-arrow,
  &.va-popup-placement-topRight .dropdown-arrow {
    bottom: 12px;
    transform: translateY(100%) rotate(180deg);
  }
  &.va-popup-placement-bottom .dropdown-arrow,
  &.va-popup-placement-bottomLeft .dropdown-arrow,
  &.va-popup-placement-bottomRight .dropdown-arrow {
    top: 12px;
    transform: translateY(-100%);
  }
  /* 次轴对齐：无后缀为居中（主轴规则已给 translate，此处只补水平居中）；Left 贴左、Right 贴右 */
  &.va-popup-placement-top .dropdown-arrow,
  &.va-popup-placement-bottom .dropdown-arrow {
    left: 50%;
  }
  &.va-popup-placement-top .dropdown-arrow {
    transform: translateX(-50%) translateY(100%) rotate(180deg);
  }
  &.va-popup-placement-bottom .dropdown-arrow {
    transform: translateX(-50%) translateY(-100%);
  }
  &.va-popup-placement-topLeft .dropdown-arrow,
  &.va-popup-placement-bottomLeft .dropdown-arrow {
    left: var(--dropdown-arrow-edge);
  }
  &.va-popup-placement-topRight .dropdown-arrow,
  &.va-popup-placement-bottomRight .dropdown-arrow {
    right: var(--dropdown-arrow-edge);
  }
  /* 菜单项列表（通用：主菜单与子菜单共用） */
  .dropdown-menu {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .dropdown-menu-divider {
    height: 1px;
    margin: 4px 0;
    overflow: hidden;
    line-height: 0;
    background-color: rgba(5, 5, 5, 0.06);
  }
  .dropdown-menu-group-title {
    padding: 5px 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
    transition: all 0.3s;
  }
  // 组内子项左右各留 8px，配合项自身水平内边距形成相对标题的缩进
  .dropdown-menu-group-list {
    margin: 0 8px;
    padding: 0;
    list-style: none;
  }
  .dropdown-menu-item {
    position: relative;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 22px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    &:not(.dropdown-menu-item-disabled):hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  .dropdown-menu-item-content {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px;
    color: inherit;
    text-decoration: none;
  }
  .dropdown-menu-item-label {
    flex: 1;
    white-space: nowrap;
  }
  .dropdown-menu-item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 14px;
    font-size: 14px;
    .dropdown-menu-item-loading {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      font-size: 14px;
      animation: dropdown-spin 1s linear infinite;
    }
  }
  // 子菜单展开图标
  .dropdown-menu-item-arrow {
    position: absolute;
    top: 50%;
    right: 8px;
    display: inline-flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
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
    &:not(.dropdown-menu-item-disabled):hover {
      color: #fff;
      background-color: #ff4d4f;
    }
  }
  // 为右侧展开箭头留出空间
  .dropdown-menu-item-submenu > .dropdown-menu-item-content {
    padding-right: 24px;
  }
}
/* 子菜单面板：无箭头槽位，故自身即菜单盒（皮肤直接落在面板上）。
   宽度纯由内容决定，不设 min-width */
.dropdown-submenu-overlay {
  padding: 4px;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 8px;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
@keyframes dropdown-spin {
  100% {
    transform: rotate(360deg);
  }
}
/* 主面板动画：slide（仅纵向缩放，像卷帘展开）。关键帧只动 scale（独立变换属性）与 opacity ——
   定位写在内核的独立属性 `translate` 上（复合链最外层，不受缩放影响）；缩放原点由内核按实际方向
   给出（始终落在靠近触发器的一侧）。 */
.dropdown-slide-enter,
.dropdown-slide-leave {
  animation-duration: var(--dropdown-transition-duration);
  animation-fill-mode: both;
  animation-play-state: paused;
}
.dropdown-slide-enter {
  scale: none;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.dropdown-slide-enter-active {
  animation-name: dropdown-slide-in;
  animation-play-state: running;
}
.dropdown-slide-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.dropdown-slide-leave-active {
  animation-name: dropdown-slide-out;
  animation-play-state: running;
}
@keyframes dropdown-slide-in {
  0% {
    scale: 1 0.8;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
@keyframes dropdown-slide-out {
  0% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 1 0.8;
    opacity: 0;
  }
}
.dropdown-zoom-enter,
.dropdown-zoom-leave {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.dropdown-zoom-enter {
  scale: 0.8;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.dropdown-zoom-enter-active {
  animation-name: dropdown-zoom-in;
  animation-play-state: running;
}
.dropdown-zoom-leave {
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.dropdown-zoom-leave-active {
  animation-name: dropdown-zoom-out;
  animation-play-state: running;
}
@keyframes dropdown-zoom-in {
  0% {
    scale: 0.8;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
@keyframes dropdown-zoom-out {
  0% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 0.8;
    opacity: 0;
  }
}
</style>
