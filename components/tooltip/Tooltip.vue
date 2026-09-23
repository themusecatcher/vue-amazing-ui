<script setup lang="ts">
import { ref, computed, watch, inject, getCurrentInstance, onBeforeUnmount, onMounted } from 'vue'
import type { CSSProperties, Ref, TransitionProps, VNode } from 'vue'
import Popup from 'components/popup'
import {
  useSlotsExist,
  useResizeObserver,
  useOptionsSupported,
  Z_INDEX_CONTAINER_OPEN_KEY,
  FLOATING_LAYER_Z_INDEX
} from 'components/utils'

export interface Props {
  maxWidth?: string | number // 文字提示最大宽度，单位 px
  content?: string // 展示的内容
  contentClass?: string // 设置展示内容的类名
  contentStyle?: CSSProperties // 设置展示内容的样式
  tooltip?: string // 文字提示内容
  tooltipClass?: string // 设置文字提示的类名
  tooltipStyle?: CSSProperties // 设置文字提示的样式
  popupClassName?: string // 设置浮层面板（定位盒）的类名，用于自定义面板层样式
  popupStyle?: CSSProperties // 设置浮层面板（定位盒）的样式，在皮肤变量与动画原点之后合并，可覆盖定位
  zIndex?: number // 浮层层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
  bgColor?: string // 文字提示框背景颜色，支持预设色或自定义色值 (如 #f50/rgba)
  arrow?: boolean // 是否显示箭头
  arrowPointAtCenter?: boolean // 箭头是否指向目标元素中心，仅当 placement 为复合方向 (如 topLeft) 时生效
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom' // 文字提示位置
  flip?: boolean // 文字提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  trigger?: 'hover' | 'click' | 'focus' | 'contextmenu' // 文字提示触发方式
  keyboard?: boolean // 是否支持按键操作 (enter 切换显示；esc 关闭)，仅当 trigger: 'click' 时生效
  disabled?: boolean // 是否禁用文字提示，禁用后不响应任何触发
  to?: string | HTMLElement | false // 弹出框挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  destroyOnHide?: boolean // 隐藏后是否卸载弹出框 DOM：离开动画结束后卸载，再次显示时重新创建并重新定位；false 时元素常驻、仅切换显示
  transitionDuration?: number // 文字提示动画的过渡持续时间，单位 ms
  showDelay?: number // 文字提示显示的延迟时间，单位 ms，仅当 trigger: hover 时生效
  hideDelay?: number // 文字提示隐藏的延迟时间，单位 ms，仅当 trigger: hover 时生效
  show?: boolean // (v-model) 文字提示是否显示
  showControl?: boolean // 只使用 show 属性控制显示隐藏，仅当 trigger: hover 时生效，此时移入移出将不会触发显示隐藏，全部由 show 属性控制
}
// 声明组件插槽类型
export interface TooltipSlots {
  tooltip?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 240,
  content: undefined,
  contentClass: undefined,
  contentStyle: () => ({}),
  tooltip: undefined,
  tooltipClass: undefined,
  tooltipStyle: () => ({}),
  popupClassName: undefined,
  popupStyle: () => ({}),
  zIndex: undefined,
  bgColor: 'rgba(0, 0, 0, 0.85)',
  arrow: true,
  arrowPointAtCenter: false,
  placement: 'top',
  flip: true,
  trigger: 'hover',
  keyboard: false,
  disabled: false,
  to: undefined,
  destroyOnHide: false,
  transitionDuration: 100,
  showDelay: 100,
  hideDelay: 100,
  show: false,
  showControl: false
})
defineSlots<TooltipSlots>()
const tooltipShow = ref<boolean>(false) // tooltip 显示隐藏标识
const tooltipTimer = ref<ReturnType<typeof setTimeout> | null>(null) // tooltip 延迟显示隐藏的定时器标识符
const documentListenerAttached = ref<boolean>(false) // 外部点击关闭监听是否已注册，确保注册/移除一一对应
type Placement = NonNullable<Props['placement']>
type MainAxis = 'top' | 'bottom' | 'left' | 'right' // 主轴方向
type CrossAlign = 'start' | 'center' | 'end' // 次轴对齐方式
const popupRef = ref<InstanceType<typeof Popup> | null>(null) // 浮层宿主引用：定位 / 显隐 / 层级 / 箭头 DOM 均由宿主承担
const tooltipContentRef = ref<HTMLElement | null>(null) // tooltipContent 模板引用
const tooltipCardRef = ref<HTMLElement | null>(null) // tooltipCard 模板引用
// 锚点 = 触发元素（插槽内容的首个元素）；仅文本内容（无元素子节点）时退回包裹用的 .tooltip-content
// 定位全链路只认这一个锚点盒
const anchorEl = ref<HTMLElement | null>(null)
const anchorSize = ref<{ width: number; height: number }>({ width: 0, height: 0 })
// 卡片布局尺寸 (取 offset 尺寸)：仅用于识别「尺寸真的变了」的重复回调，避免无谓重算
const cardSize = ref<{ width: number; height: number }>({ width: 0, height: 0 })
const { isSupported: captureSupported } = useOptionsSupported('capture')
const emits = defineEmits(['update:show', 'openChange', 'animationend'])
const slotsExist = useSlotsExist(['tooltip'])
// 预设色板：色名 → 色值
const presetColors: Record<string, string> = {
  pink: '#eb2f96',
  red: '#f5222d',
  yellow: '#fadb14',
  orange: '#fa8c16',
  cyan: '#13c2c2',
  green: '#52c41a',
  blue: '#1677ff',
  purple: '#722ed1',
  geekblue: '#2f54eb',
  magenta: '#eb2f96',
  volcano: '#fa541c',
  gold: '#faad14',
  lime: '#a0d911'
}
// 解析背景色：预设色名映射为对应色值，否则作为自定义色值直接使用
const tooltipBgColor = computed(() => {
  return presetColors[props.bgColor] ?? props.bgColor
})
const tooltipMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return `${props.maxWidth}px`
  }
  return props.maxWidth
})
const showTooltip = computed(() => {
  return slotsExist.tooltip || props.tooltip
})
// 弹出框 id：以组件实例 uid 保证全局唯一，供触发器 aria-describedby 关联
const tooltipCardId = `va-tooltip-${getCurrentInstance()?.uid ?? 0}`
// 仅在弹出框实际可见时关联描述，避免初始隐藏态被读屏器朗读
const ariaDescribedby = computed(() => (showTooltip.value && tooltipShow.value ? tooltipCardId : undefined))
// 复合方向时箭头中心距面板对齐边的距离，单位 px
const arrowOffset = computed(() => {
  return props.arrow ? 13 : 8
})
// 主轴方向的面板外间距：面板盒紧贴锚点外 4px（有箭头，箭头槽 12px 计在面板内）/ 6px（无箭头）
const mainAxisGap = computed(() => {
  return props.arrow ? 4 : 6
})
// 实际方向：定位内核翻转 / 次轴自适应后的结果（宿主未挂载时退回期望方向）
const actualPlacement = computed<Placement>(() => popupRef.value?.actualPlacement ?? props.placement)
// 将实际方向拆分为主轴方向 (top/bottom/left/right)
const mainAxis = computed<MainAxis>(() => {
  const place = actualPlacement.value
  if (place.startsWith('top')) return 'top'
  if (place.startsWith('bottom')) return 'bottom'
  if (place.startsWith('left')) return 'left'
  if (place.startsWith('right')) return 'right'
  return 'top'
})
// 将实际方向拆分为次轴对齐方式 (start/center/end)：Left/Top 为 start，Right/Bottom 为 end
const crossAlign = computed<CrossAlign>(() => {
  const place = actualPlacement.value
  if (place.endsWith('Left') || place.endsWith('Top')) return 'start'
  if (place.endsWith('Right') || place.endsWith('Bottom')) return 'end'
  return 'center'
})
// 次轴方向上的缩放动画原点 (复合方向对齐到箭头所在侧)
const transformOriginCross = computed(() => {
  if (crossAlign.value === 'start') return `${arrowOffset.value}px`
  if (crossAlign.value === 'end') return `calc(100% - ${arrowOffset.value}px)`
  return '50%'
})
// 缩放动画原点：内核查表值与本组件所需语义不同，故在皮肤层计算并覆盖 —— 主轴分量均为
// 「面板盒外侧 4px / 6px」（可用 calc(100% + Npx) 表达），次轴分量沿对齐边内缩 arrowOffset
const transformOrigin = computed(() => {
  const arrowEdge = props.arrow ? -4 : -6
  if (mainAxis.value === 'bottom') return `${transformOriginCross.value} ${arrowEdge}px`
  if (mainAxis.value === 'right') return `${arrowEdge}px ${transformOriginCross.value}`
  const outer = `calc(100% + ${mainAxisGap.value}px)`
  return mainAxis.value === 'top' ? `${transformOriginCross.value} ${outer}` : `${outer} ${transformOriginCross.value}`
})
// 箭头指向元素中心时面板需沿次轴让位：箭头中心距面板对齐边 arrowOffset，
// 因此 start 对齐时面板位移 anchorSize / 2 - arrowOffset，end 对齐时反号
const arrowCenterShift = computed<CSSProperties>(() => {
  if (!props.arrowPointAtCenter || crossAlign.value === 'center') return {}
  const vertical = mainAxis.value === 'left' || mainAxis.value === 'right'
  const size = vertical ? anchorSize.value.height : anchorSize.value.width
  const shift = crossAlign.value === 'start' ? size / 2 - arrowOffset.value : arrowOffset.value - size / 2
  return vertical ? { marginTop: `${shift}px` } : { marginLeft: `${shift}px` }
})
// 面板的内联皮肤：动画原点 / 箭头让位位移 + 三个 CSS 变量（箭头与卡片都要用，故落在面板上继承下去）；
// 使用者的 popupStyle 最后合并：与 Select 的 dropdownMenuStyle 同一语义，可覆盖定位与上述皮肤值
const tooltipPanelStyle = computed<CSSProperties>(() => ({
  '--tooltip-max-width': tooltipMaxWidth.value,
  '--tooltip-background-color': tooltipBgColor.value,
  '--tooltip-transition-duration': `${props.transitionDuration}ms`,
  transformOrigin: transformOrigin.value,
  ...arrowCenterShift.value,
  ...props.popupStyle
}))
// 面板类名：渲染箭头时才保留箭头槽；popupClassName 追加在末尾，
// 供使用者在面板层（定位盒）自定义样式
const tooltipPanelClass = computed(() =>
  [props.arrow ? 'tooltip-card-container tooltip-has-arrow' : 'tooltip-card-container', props.popupClassName]
    .filter(Boolean)
    .join(' ')
)
// 过渡动画配置：宿主不含皮肤，动画名 / 各阶段类名由本组件提供（关键帧见下方样式）。
// 类名与关键帧名统一带 `tooltip-` 前缀：面板由宿主编译（scope id 属宿主），这些规则只能落在**全局**
// 样式块，用 `zoom-enter` / `zoomIn` 这类通用名会随库一起污染宿主页面（`zoomIn` 与 animate.css 同名）
const tooltipTransitionProps: TransitionProps = {
  name: 'tooltip-zoom',
  enterFromClass: 'tooltip-zoom-enter',
  enterActiveClass: 'tooltip-zoom-enter',
  enterToClass: 'tooltip-zoom-enter tooltip-zoom-enter-active',
  leaveFromClass: 'tooltip-zoom-leave',
  leaveActiveClass: 'tooltip-zoom-leave tooltip-zoom-leave-active',
  leaveToClass: 'tooltip-zoom-leave tooltip-zoom-leave-active'
}
// 受控 show 初始为真时，可见性 watcher 在 setup 阶段执行（此时模板引用尚未就绪），故挂载后补测一次
onMounted(measureAnchor)
watch(
  () => showTooltip.value && tooltipShow.value,
  (to) => {
    if (to) {
      measureAnchor()
    }
  },
  {
    immediate: true
  }
)
watch(
  () => props.show,
  (to) => {
    // 受控 show 需立即同步（跳过 hover 延迟）
    if (to && !tooltipShow.value) {
      onShow(true)
    }
    if (!to && tooltipShow.value) {
      onHide(true)
    }
  },
  {
    immediate: true
  }
)
// 承载层（Modal / Dialog / Drawer）关闭时收起：与 Select / AutoComplete 同一不变量 ——
// 承载层内容常驻不卸载，浮层不会随容器消失；若保持打开，容器重开时浮层会以「仍打开」的状态冒出来。
// 关闭容器的路径里，点 X / 遮罩会顺带触发「点击外部」把 click 触发型关掉，但 **Esc 关闭**（Modal 的
// Esc 处理在弹窗主体上，不产生 document click）与 **程序化关闭**（接口回调 / 父状态变更）没有任何指针
// 事件，浮层会残留打开态。详见 utils/z-index.ts 的 Z_INDEX_CONTAINER_OPEN_KEY
const containerOpen = inject(Z_INDEX_CONTAINER_OPEN_KEY, null) as Ref<boolean> | null
if (containerOpen) {
  watch(containerOpen, (open) => {
    if (!open) {
      onHide(true)
    }
  })
}
// 测量锚点：定位内核按「单一 anchorRect」口径求解，锚点尺寸另供箭头中心让位使用
function measureAnchor(): void {
  const wrap = tooltipContentRef.value
  if (!wrap) return
  const el = (wrap.firstElementChild as HTMLElement | null) ?? wrap
  anchorEl.value = el
  anchorSize.value = { width: el.offsetWidth, height: el.offsetHeight }
}
// 监听 tooltipCard 和 tooltipContent 的尺寸变化，更新弹出框位置
useResizeObserver([tooltipCardRef, tooltipContentRef], (entries: ResizeObserverEntry[]) => {
  if (!(showTooltip.value && tooltipShow.value)) return
  // 显隐切换 (v-show display:none→block) 会产生同尺寸的重复回调；卡片尺寸未变则无需重算位置（双方均为 offset 边框盒口径，无需取整）
  if (entries.length === 1 && entries[0].target === tooltipCardRef.value) {
    const cardEl = entries[0].target as HTMLElement
    if (cardEl.offsetWidth === cardSize.value.width && cardEl.offsetHeight === cardSize.value.height) {
      return
    }
  }
  updatePosition()
})
// 重算位置：滚动 / resize / 尺寸变化由内核与监听统一驱动，宿主内部已做帧合并（每帧至多一次）
function updatePosition(): void {
  const cardEl = tooltipCardRef.value
  if (cardEl) {
    // 取 offset 尺寸 (布局尺寸) 而非 getBoundingClientRect：缩放动画会改变 transform，
    // 使 rect 返回缩放后的视觉尺寸，导致动画期间误判为「尺寸变化」而重复重算
    cardSize.value = { width: cardEl.offsetWidth, height: cardEl.offsetHeight }
  }
  measureAnchor()
  popupRef.value?.update()
}
// 取消延迟显示/隐藏定时器并清空标识，避免重复取消已失效的定时器
function clearTooltipTimer(): void {
  if (tooltipTimer.value !== null) {
    clearTimeout(tooltipTimer.value)
    tooltipTimer.value = null
  }
}
// immediate 为 true 时跳过 hover 延迟（用于受控 show 需立即生效的场景）
function onShow(immediate = false): void {
  if (props.disabled) return
  clearTooltipTimer()
  if (!tooltipShow.value) {
    // 显示延迟仅在 hover 触发且非立即模式下生效，click/contextmenu/focus 等触发方式立即显示
    const delay = props.trigger === 'hover' && !immediate ? props.showDelay : 0
    tooltipTimer.value = setTimeout(() => {
      tooltipShow.value = true
      emits('update:show', true)
      emits('openChange', true)
      if (showTooltip.value && (props.trigger === 'click' || props.trigger === 'contextmenu')) {
        addDocumentListener()
      }
    }, delay)
  }
}
function onHide(immediate = false): void {
  clearTooltipTimer()
  if (tooltipShow.value) {
    // 隐藏延迟仅在 hover 触发且非立即模式下生效，click/contextmenu/focus 等触发方式立即隐藏
    const delay = props.trigger === 'hover' && !immediate ? props.hideDelay : 0
    tooltipTimer.value = setTimeout(() => {
      tooltipShow.value = false
      emits('update:show', false)
      emits('openChange', false)
      removeDocumentListener()
    }, delay)
  }
}
function toggleVisible() {
  if (!tooltipShow.value) {
    onShow()
  } else {
    onHide()
  }
}
function handleClick(e: Event) {
  if (!popupRef.value?.panelRef?.contains(e.target as Node)) {
    onHide()
  }
}
// 注册外部点击关闭监听（仅 click/contextmenu 触发需要），幂等，避免重复注册
function addDocumentListener(): void {
  if (documentListenerAttached.value) return
  document.addEventListener('click', handleClick, captureSupported.value ? { capture: true } : true)
  documentListenerAttached.value = true
}
// 移除外部点击关闭监听，幂等；与注册条件解耦，确保卸载或显隐切换时不残留
function removeDocumentListener(): void {
  if (!documentListenerAttached.value) return
  document.removeEventListener('click', handleClick, captureSupported.value ? { capture: true } : true)
  documentListenerAttached.value = false
}
function onEnterWrap() {
  if (showTooltip.value && props.trigger === 'hover' && !props.showControl) {
    onShow()
  }
}
function onLeaveWrap() {
  if (showTooltip.value && props.trigger === 'hover' && !props.showControl) {
    onHide()
  }
}
// 面板自身的动画结束由宿主过滤（忽略插槽内容中嵌套动画的冒泡），此处只负责对外转发
function onAnimationEnd() {
  emits('animationend', tooltipShow.value)
}
function onEnterTooltip() {
  if (props.trigger === 'hover' && !props.showControl) {
    onShow()
  }
}
function onLeaveTooltip() {
  if (props.trigger === 'hover' && !props.showControl) {
    onHide()
  }
}
// focus 触发：内容元素（或其内部可聚焦子元素）获得/失去焦点时显示/隐藏
// focus/blur 不冒泡，包裹元素无法在冒泡阶段捕获内部子元素的焦点变化，故使用捕获阶段监听 (.capture)
// 选择捕获阶段而非 focusin/focusout：后者依赖浏览器原生支持 (Firefox 52+ 才支持)，捕获阶段监听兼容面更大
function onFocus() {
  if (showTooltip.value && props.trigger === 'focus') {
    onShow()
  }
}
function onBlur(e: FocusEvent) {
  if (!showTooltip.value || props.trigger !== 'focus') return
  // 焦点仍在内容内部移动时（如包裹 span → 内部可聚焦子元素）不隐藏，避免闪烁
  if (tooltipContentRef.value?.contains(e.relatedTarget as Node | null)) return
  onHide()
}
// contextmenu 触发：右键菜单时显示 (阻止默认菜单)，点击外部由 handleClick 关闭
function onContextmenu(e: Event) {
  if (showTooltip.value && props.trigger === 'contextmenu' && !tooltipShow.value) {
    e.preventDefault()
    onShow()
  }
}
// 弹出框卡片上的 esc 按键处理：trigger 为 click 且开启 keyboard 时关闭
function onTooltipKeydownEsc() {
  if (props.trigger === 'click' && props.keyboard && tooltipShow.value) {
    onHide()
  }
}
// 内容元素点击处理：trigger 为 click 时切换显示
function onContentClick() {
  if (showTooltip.value && props.trigger === 'click' && !tooltipShow.value) {
    onShow()
  }
}
// 内容元素 enter 按键处理：trigger 为 click 且开启 keyboard 时切换显示
function onContentKeydownEnter() {
  if (showTooltip.value && props.trigger === 'click' && props.keyboard) {
    toggleVisible()
  }
}
// 内容元素 esc 按键处理：trigger 为 click 且开启 keyboard 时关闭
function onContentKeydownEsc() {
  if (showTooltip.value && props.trigger === 'click' && props.keyboard && tooltipShow.value) {
    onHide()
  }
}
// 卸载时取消延迟显示/隐藏定时器，避免回调在组件卸载后仍然触发
// 显示状态下卸载时 onHide 的延迟回调不会执行，需在此无条件移除外部点击监听，避免监听残留
onBeforeUnmount(() => {
  clearTooltipTimer()
  removeDocumentListener()
})
defineExpose({
  show: () => onShow(),
  hide: () => onHide()
})
</script>
<template>
  <div class="tooltip-wrap" @mouseenter="onEnterWrap" @mouseleave="onLeaveWrap">
    <!-- 浮层宿主承担 Teleport / 首帧优化 / Transition / 关闭语义 / 层级 / 箭头 DOM；
         面板级监听经宿主的 $attrs 落到面板上（宿主根节点是 Teleport，需显式透传） -->
    <Popup
      ref="popupRef"
      :show="showTooltip && tooltipShow"
      :to="to"
      :destroy-on-hide="destroyOnHide"
      :anchor="anchorEl"
      :placement="placement"
      :flip="flip"
      :shift="flip"
      :offset="mainAxisGap"
      :arrow="arrow"
      arrow-class="tooltip-arrow"
      :panel-class="tooltipPanelClass"
      :panel-style="tooltipPanelStyle"
      :z-index="zIndex"
      :default-z-index="FLOATING_LAYER_Z_INDEX.tooltip"
      :transition-props="tooltipTransitionProps"
      @mouseenter="onEnterTooltip"
      @mouseleave="onLeaveTooltip"
      @keydown.esc="onTooltipKeydownEsc"
      @animationend="onAnimationEnd"
    >
      <div
        ref="tooltipCardRef"
        class="tooltip-card"
        role="tooltip"
        :id="tooltipCardId"
        :class="tooltipClass"
        :style="tooltipStyle"
      >
        <slot name="tooltip">{{ tooltip }}</slot>
      </div>
    </Popup>
    <span
      ref="tooltipContentRef"
      class="tooltip-content"
      :class="contentClass"
      :style="contentStyle"
      :aria-describedby="ariaDescribedby"
      :tabindex="trigger === 'focus' ? 0 : undefined"
      @click="onContentClick"
      @contextmenu="onContextmenu"
      @focus.capture="onFocus"
      @blur.capture="onBlur"
      @keydown.enter="onContentKeydownEnter"
      @keydown.esc="onContentKeydownEsc"
    >
      <slot>{{ content }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.tooltip-wrap {
  position: relative;
  display: inline-block;
}
.tooltip-content {
  display: inline-block;
}
/* 卡片是插槽内容、由本组件编译（带本组件 scope id），故皮肤留在 scoped 即可；
   只有 `<Popup>` 宿主编译的面板壳与箭头（scope id 属宿主）才必须走全局块 */
.tooltip-card {
  min-width: 32px;
  max-width: var(--tooltip-max-width);
  min-height: 32px;
  padding: 6px 8px;
  font-size: 14px;
  color: #fff;
  line-height: 1.5714285714285714;
  text-align: justify;
  text-decoration: none;
  word-break: break-word;
  background-color: var(--tooltip-background-color);
  border-radius: 6px;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  /* 卡片不继承触发器的 cursor（FloatButton 的按钮、Table 表头都是 pointer）：
     Teleport 到 body 时本就不受影响，就地渲染（to: false）时依赖此规则 */
  cursor: auto;
  svg {
    fill: currentColor;
  }
}
</style>
<style lang="less">
/* 仅「面板壳 + 箭头 + 动画」必须留在全局：三者作用于 <Popup> 宿主编译的面板（scope id 属宿主，
   本组件 scoped 规则匹配不到），且 Teleport 到 body 后不在本组件 DOM 子树内，`:deep()` 同样选不中。
   收口口径分两类，缺一即外溢到宿主页面：
   ① 面板 / 箭头几何 —— 一律以 .tooltip-card-container 收口；
   ② 动画类与关键帧 —— 类名由 <Transition> 落在面板上，无法用①收口，故类名与关键帧名统一加
      `tooltip-` 前缀（见 tooltipTransitionProps），避免全局裸名与宿主页面 / animate.css 撞名 */
.tooltip-card-container {
  width: max-content;
  outline: none;
  /* 箭头槽：仅在渲染箭头时按实际方向保留。
     方向类由 `<Popup>` 宿主落在面板上，复合方向（如 topLeft）归入其主轴方向 */
  &.tooltip-has-arrow.va-popup-placement-top,
  &.tooltip-has-arrow.va-popup-placement-topLeft,
  &.tooltip-has-arrow.va-popup-placement-topRight {
    padding-bottom: 12px;
  }
  &.tooltip-has-arrow.va-popup-placement-bottom,
  &.tooltip-has-arrow.va-popup-placement-bottomLeft,
  &.tooltip-has-arrow.va-popup-placement-bottomRight {
    padding-top: 12px;
  }
  &.tooltip-has-arrow.va-popup-placement-left,
  &.tooltip-has-arrow.va-popup-placement-leftTop,
  &.tooltip-has-arrow.va-popup-placement-leftBottom {
    padding-right: 12px;
  }
  &.tooltip-has-arrow.va-popup-placement-right,
  &.tooltip-has-arrow.va-popup-placement-rightTop,
  &.tooltip-has-arrow.va-popup-placement-rightBottom {
    padding-left: 12px;
  }
  .tooltip-arrow {
    position: absolute;
    /* 必须绘制在卡片**之上**：卡片自带向下扩散的 box-shadow，若箭头置于其下会被阴影染出一条暗带。
       拼接处（相切）的淡色细缝由内核把浮层位置取整到整数像素消除，此处无需重叠补偿 */
    z-index: 9;
    display: block;
    pointer-events: none;
    width: 16px;
    height: 16px;
    overflow: hidden;
    &::before {
      position: absolute;
      width: 16px;
      height: 8px;
      background-color: var(--tooltip-background-color);
      clip-path: polygon(
        1.6568542494923806px 100%,
        50% 1.6568542494923806px,
        14.34314575050762px 100%,
        1.6568542494923806px 100%
      );
      clip-path: path(
        'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
      );
      content: '';
    }
    &::after {
      position: absolute;
      width: 8.970562748477143px;
      height: 8.970562748477143px;
      margin: auto;
      border-radius: 0 0 2px 0;
      transform: translateY(50%) rotate(-135deg);
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
      /* 置于三角形**之下**：这层只负责延续投影，若压在三角形之上会把浅色（如白色）箭头染成灰色 */
      z-index: -1;
      background: transparent;
      content: '';
    }
  }
  // 复合方向箭头次轴对齐：--arrow-edge = 箭头中心距卡片边(13px) - 箭头视觉半宽(8px)
  --arrow-edge: 5px;
  // 主轴槽位：面板为箭头预留的距离，箭头与卡片**相切（不重叠）**
  // 说明：重叠会让半透明背景两层叠加，在拼接处显出一条更深的线，故不做重叠补偿；
  // 相切时卡片边缘可能落在亚像素上，露出的淡色细缝由内核消除 —— 浮层最终位置取整到整数像素，
  // 使卡片背景边缘与箭头边缘落在同一像素边界上（见 utils/position.ts 的 snapTranslate）
  // 主轴几何：由 `<Popup>` 宿主落在面板上的方向类驱动（值取 actualPlacement 的对外命名），零 JS 箭头运算
  // 复合方向归入其主轴：如 topLeft / topRight 与 top 共用「贴面板下边缘」的几何
  // 主轴 top：箭头贴面板下边缘
  &.va-popup-placement-top .tooltip-arrow,
  &.va-popup-placement-topLeft .tooltip-arrow,
  &.va-popup-placement-topRight .tooltip-arrow {
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%) translateY(100%) rotate(180deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  // 主轴 bottom：箭头贴面板上边缘
  &.va-popup-placement-bottom .tooltip-arrow,
  &.va-popup-placement-bottomLeft .tooltip-arrow,
  &.va-popup-placement-bottomRight .tooltip-arrow {
    left: 50%;
    top: 12px;
    transform: translateX(-50%) translateY(-100%) rotate(0deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  // 主轴 left：箭头贴面板右边缘
  &.va-popup-placement-left .tooltip-arrow,
  &.va-popup-placement-leftTop .tooltip-arrow,
  &.va-popup-placement-leftBottom .tooltip-arrow {
    top: 50%;
    right: 12px;
    transform: translateX(100%) translateY(-50%) rotate(90deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  // 主轴 right：箭头贴面板左边缘
  &.va-popup-placement-right .tooltip-arrow,
  &.va-popup-placement-rightTop .tooltip-arrow,
  &.va-popup-placement-rightBottom .tooltip-arrow {
    top: 50%;
    left: 12px;
    transform: translateX(-100%) translateY(-50%) rotate(-90deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  // 次轴对齐（复合方向）：Left / Top 后缀为次轴 start，Right / Bottom 为次轴 end；
  // 纯方向（top / bottom / left / right）不带次轴类，中心对齐由上面的主轴规则承担
  // 水平主轴 (top/bottom)：箭头沿水平方向靠边
  &.va-popup-placement-topLeft .tooltip-arrow,
  &.va-popup-placement-bottomLeft .tooltip-arrow {
    left: var(--arrow-edge);
  }
  &.va-popup-placement-topRight .tooltip-arrow,
  &.va-popup-placement-bottomRight .tooltip-arrow {
    left: auto;
    right: var(--arrow-edge);
  }
  &.va-popup-placement-topLeft .tooltip-arrow,
  &.va-popup-placement-topRight .tooltip-arrow {
    transform: translateX(0) translateY(100%) rotate(180deg);
  }
  &.va-popup-placement-bottomLeft .tooltip-arrow,
  &.va-popup-placement-bottomRight .tooltip-arrow {
    transform: translateX(0) translateY(-100%) rotate(0deg);
  }
  // 垂直主轴 (left/right)：箭头沿垂直方向靠边
  &.va-popup-placement-leftTop .tooltip-arrow,
  &.va-popup-placement-rightTop .tooltip-arrow {
    top: var(--arrow-edge);
  }
  &.va-popup-placement-leftBottom .tooltip-arrow,
  &.va-popup-placement-rightBottom .tooltip-arrow {
    top: auto;
    bottom: var(--arrow-edge);
  }
  &.va-popup-placement-leftTop .tooltip-arrow,
  &.va-popup-placement-leftBottom .tooltip-arrow {
    transform: translateX(100%) translateY(0) rotate(90deg);
  }
  &.va-popup-placement-rightTop .tooltip-arrow,
  &.va-popup-placement-rightBottom .tooltip-arrow {
    transform: translateX(-100%) translateY(0) rotate(-90deg);
  }
}
/* 缩放动画：关键帧只动 scale（独立变换属性）与 opacity —— 内核的定位写在独立属性 `translate` 上
   （复合链最外层，不受缩放影响），keyframes 改写 `transform` 会覆盖使用者传入的内联 transform。
   缩放原点由面板的内联 transform-origin 给出；离开动画期间的指针事件由宿主 Popup 统一禁用
   （宿主自持 `va-popup-leaving` 状态，皮肤层无需再声明 pointer-events） */
.tooltip-zoom-enter,
.tooltip-zoom-leave {
  animation-duration: var(--tooltip-transition-duration);
  animation-fill-mode: both;
  animation-play-state: paused;
}
.tooltip-zoom-enter {
  scale: none;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.tooltip-zoom-enter-active {
  animation-name: tooltip-zoom-in;
  animation-play-state: running;
}
.tooltip-zoom-leave {
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.tooltip-zoom-leave-active {
  animation-name: tooltip-zoom-out;
  animation-play-state: running;
}
@keyframes tooltip-zoom-in {
  0% {
    scale: 0.8;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
@keyframes tooltip-zoom-out {
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
