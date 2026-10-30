<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance, onBeforeUnmount, onMounted } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import Popup from 'components/popup'
import {
  findFocusable,
  useContainerClose,
  useSlotsExist,
  useResizeObserver,
  FLOATING_LAYER_Z_INDEX
} from 'components/utils'
// prop 契约与「下游需继承的默认值」同源存放于纯 .ts 文件（Popover / Popconfirm 用 extends 继承）
import type { TooltipProps } from './types'
import { TOOLTIP_INHERITED_DEFAULTS } from './types'

// 声明组件插槽类型
export interface TooltipSlots {
  tooltip?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<TooltipProps>(), {
  // 含默认值 ≠ 隐式默认的布尔项（arrow / flip），下游组件继承类型时一并继承这里的默认值
  ...TOOLTIP_INHERITED_DEFAULTS,
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
  bgColor: 'var(--va-bg-spotlight-color)',
  arrowPointAtCenter: false,
  placement: 'top',
  trigger: 'hover',
  keyboard: false,
  disabled: false,
  to: undefined,
  destroyOnHide: false,
  transitionDuration: 100,
  showDelay: 100,
  hideDelay: 100,
  openControl: false,
  anchor: null,
  getDisabled: undefined,
  tooltipRole: 'tooltip',
  tooltipLabelledby: undefined,
  describedBy: true
})
defineSlots<TooltipSlots>()
// 模板存在「包裹层 / 浮层」两个条件根，属性继承需显式下发（见模板中包裹层根节点的 v-bind="$attrs"；
// 锚点模式没有自有根节点，$attrs 不再下发）
defineOptions({ inheritAttrs: false })
const tooltipShow = ref<boolean>(false) // 未受控时的内部显隐状态
// 受控判定：显式传入 open（含 false）即视为受控 —— 显隐以属性为准，内部请求只经事件上报。
// 与 Dropdown 的 `props.open === undefined ? innerOpen : props.open` 同口径；open 的默认值因此必须是
// undefined（布尔 prop 缺省会被 Vue 强转成 false，那会让所有用法都变成「受控且恒关闭」）
const openControlled = computed<boolean>(() => props.open !== undefined)
// 实际可见性：受控取 open 属性，未受控取内部状态。面板渲染、无障碍关联与所有早返回判定统一看它，
// 避免出现「内部状态与属性各说各话」的脱同步
const tooltipVisible = computed<boolean>(() => (openControlled.value ? Boolean(props.open) : tooltipShow.value))
// 显隐定时器分离（与 Dropdown 同口径）：单定时器会让「待显示」与「待隐藏」互相取消 ——
// 例如 hover 移入排了显示、移出排了隐藏，后者复用同一个句柄时前者的取消动作会把两者搅在一起
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
// Enter 键切换的一次性标记：浏览器会在 Enter 后为可聚焦子元素补发 click，用于忽略那次重复切换
let enterActivated = false
type Placement = NonNullable<TooltipProps['placement']>
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
const emits = defineEmits(['update:open', 'openChange', 'animationend'])
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
// 锚点模式：使用方提供外部锚点，本组件不再渲染触发包裹层（.tooltip-wrap / .tooltip-content），
// 触发监听与无障碍属性（tabindex / aria-describedby）直接写到锚点元素上；浮层只作为「指向该元素
// 的独立层」存在，故使用方的 DOM 结构不随提示显隐变化
const anchorMode = computed(() => Boolean(props.anchor))
// 是否需要「点击外部 / esc 关闭」：click 与 contextmenu 这类主动触发的浮层由使用者显式收起，
// hover 由移出延迟承担、focus 由失焦承担。与 Dropdown 的 needOutsideClick 同口径
const needOutsideClick = computed<boolean>(() => props.trigger === 'click' || props.trigger === 'contextmenu')
// 弹出框 id：以组件实例 uid 保证全局唯一，供触发器 aria-describedby 关联
const tooltipCardId = `va-tooltip-${getCurrentInstance()?.uid ?? 0}`
// 仅在弹出框实际可见时关联描述，避免初始隐藏态被读屏器朗读；
// 对话框类面板（role 为 dialog / alertdialog）由皮肤层传入 describedBy: false 断开 —— 面板内容是「待操作
// 的内容」而非触发器的描述，且关联后整块按钮文案都会被当成描述朗读
const ariaDescribedby = computed(() =>
  showTooltip.value && tooltipVisible.value && props.describedBy ? tooltipCardId : undefined
)
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
// 浮层宿主绑定：包裹层模式与锚点模式共用同一份（两者只有触发元素来源不同）
const popupBindings = computed(() => ({
  show: showTooltip.value && tooltipVisible.value,
  // 外点判定与监听下沉到宿主：口径为「面板之外 且 锚点（触发器）之外」，本组件只接收上报结果
  closeOnOutsideClick: needOutsideClick.value,
  to: props.to,
  destroyOnHide: props.destroyOnHide,
  anchor: anchorEl.value,
  placement: props.placement,
  flip: props.flip,
  shift: props.flip,
  offset: mainAxisGap.value,
  arrow: props.arrow,
  arrowClass: 'tooltip-arrow',
  panelClass: tooltipPanelClass.value,
  panelStyle: tooltipPanelStyle.value,
  zIndex: props.zIndex,
  transitionProps: tooltipTransitionProps
}))
// 初始即为可见态（受控 open 为真）时，可见性 watcher 在 setup 阶段执行（此时模板引用尚未就绪），
// 故挂载后补测一次
onMounted(() => {
  syncAnchorBinding()
  measureAnchor()
})
// 可见性完全由 tooltipVisible 表达（受控时取属性、未受控时取内部状态），故无需同步状态的 watcher，
// 也不需要因属性变化回传 update:open —— 受控变化由父侧驱动，与 Dropdown 同口径
watch(
  () => showTooltip.value && tooltipVisible.value,
  (to) => {
    if (to) {
      measureAnchor()
    }
  },
  {
    immediate: true
  }
)
// 承载层（Modal / Dialog / Drawer / 外层浮层面板）关闭时收起：承载层内容常驻不卸载，浮层不会随容器消失；
// 若保持打开，容器重开时浮层会以「仍打开」的状态冒出来。关闭容器的路径里，点 X / 遮罩会顺带触发
// 「点击外部」把 click 触发型关掉，但 **Esc 关闭**（Modal 的 Esc 处理在弹窗主体上，不产生 document click）
// 与 **程序化关闭**（接口回调 / 父状态变更）没有任何指针事件，浮层会残留打开态。
// 开合状态的订阅收敛在 useContainerClose（Popup 只提供状态，不自订阅）
useContainerClose(() => onHide(true))
// 测量锚点：定位内核按「单一 anchorRect」口径求解，锚点尺寸另供箭头中心让位使用。
// 锚点模式直接以外部元素为锚点；包裹层模式取插槽内容的首个元素，仅文本内容时退回 .tooltip-content
function measureAnchor(): void {
  const externalAnchor = props.anchor
  if (externalAnchor) {
    anchorEl.value = externalAnchor
    anchorSize.value = { width: externalAnchor.offsetWidth, height: externalAnchor.offsetHeight }
    return
  }
  const wrap = tooltipContentRef.value
  if (!wrap) return
  const el = (wrap.firstElementChild as HTMLElement | null) ?? wrap
  anchorEl.value = el
  anchorSize.value = { width: el.offsetWidth, height: el.offsetHeight }
}
// 监听 tooltipCard 和 tooltipContent 的尺寸变化，更新弹出框位置
useResizeObserver([tooltipCardRef, tooltipContentRef], (entries: ResizeObserverEntry[]) => {
  if (!(showTooltip.value && tooltipVisible.value)) return
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
// 请求变更显隐：受控时只上报（状态以 open 属性为准，组件不自行改写），未受控时写内部状态；
// 两者都只在「值真的变化」时上报 —— 与 Dropdown 的 requestOpen 同口径，避免无变化通知
function requestVisible(val: boolean): void {
  const prev = tooltipVisible.value
  if (!openControlled.value) {
    tooltipShow.value = val
  }
  if (prev === val) return
  emits('update:open', val)
  emits('openChange', val)
}
function applyShow(): void {
  showTimer = null
  requestVisible(true)
}
function applyHide(): void {
  hideTimer = null
  requestVisible(false)
}
function onShow(): void {
  // getDisabled 在每次展示前求值：使用方据此表达「当前不值得展示」（如文本未溢出）
  if (props.disabled || props.getDisabled?.()) return
  // 先取消待执行的隐藏：重新移入 / 重新打开不应被上一次的隐藏回调收走
  clearHideTimer()
  if (tooltipVisible.value) return
  clearShowTimer()
  // 显示延迟仅在 hover 触发时生效，click/contextmenu/focus 等触发方式立即显示
  const delay = props.trigger === 'hover' ? props.showDelay : 0
  showTimer = setTimeout(applyShow, delay)
}
function onHide(immediate = false): void {
  // 先取消待执行的显示：快速划过时鼠标已离开，不能在离开后补弹
  clearShowTimer()
  if (!tooltipVisible.value) return
  clearHideTimer()
  // 隐藏延迟仅在 hover 触发且非立即模式下生效，click/contextmenu/focus 等触发方式立即隐藏
  const delay = props.trigger === 'hover' && !immediate ? props.hideDelay : 0
  hideTimer = setTimeout(applyHide, delay)
}
// 显式切换（click 触发 / keyboard 的 enter）：状态在同一拍内落定，不依赖定时器时序
function toggleVisible(): void {
  if (!showTooltip.value) return
  clearTimers()
  if (tooltipVisible.value) {
    applyHide()
    return
  }
  if (props.disabled || props.getDisabled?.()) return
  applyShow()
}
// 触发器点击：click 触发时显式切换（与 Dropdown 的 onTriggerClick 同口径）。
// contextmenu 触发时左键点击触发器应收起 —— 右键唤起的浮层没有左键 toggle 语义，
// 但「点触发器关掉它」是最直觉的关闭动作（antdv 在 contextmenu 模式下同样会收起）
function onTriggerClick(): void {
  if (props.trigger === 'contextmenu') {
    if (tooltipVisible.value) {
      onHide()
    }
    return
  }
  if (props.trigger !== 'click') return
  if (enterActivated) {
    // 浏览器在可聚焦子元素上收到 Enter 后会补发一次 click（键盘激活），该次切换已由
    // onEnterKeydown 完成，此处忽略，否则同一次按键会把显示态切回原样
    enterActivated = false
    return
  }
  toggleVisible()
}
// 外部点击：判定与监听已下沉到宿主（closeOnOutsideClick，口径为「面板之外 且 触发器之外」），
// 此处只接上报结果、不参与判定
function closeFromOutside(): void {
  onHide()
}
function onEnterWrap() {
  if (showTooltip.value && props.trigger === 'hover' && !props.openControl) {
    onShow()
  }
}
function onLeaveWrap() {
  if (showTooltip.value && props.trigger === 'hover' && !props.openControl) {
    onHide()
  }
}
// 面板自身的动画结束由宿主过滤（忽略插槽内容中嵌套动画的冒泡），此处只负责对外转发
function onAnimationEnd() {
  emits('animationend', tooltipVisible.value)
}
function onEnterTooltip() {
  if (props.trigger === 'hover' && !props.openControl) {
    onShow()
  }
}
function onLeaveTooltip() {
  if (props.trigger === 'hover' && !props.openControl) {
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
  // 焦点仍在内容内部移动时（包裹层模式看 .tooltip-content，锚点模式看锚点子树）不隐藏，避免闪烁
  const container = props.anchor ?? tooltipContentRef.value
  if (container?.contains(e.relatedTarget as Node | null)) return
  onHide()
}
// contextmenu 触发：右键时显示并阻止浏览器原生菜单。**展开状态下同样要阻止** ——
// 否则同一个手势第一次拦、第二次放行，原生菜单会叠在浮层上（与 antdv 一致）
function onContextmenu(e: Event) {
  if (!showTooltip.value || props.trigger !== 'contextmenu') return
  e.preventDefault()
  if (!tooltipVisible.value) {
    onShow()
  }
}
// esc：click / contextmenu 触发时关闭。触发器与面板两处都响应（与 Dropdown 同口径）：
// 焦点落在触发子树上时按键事件经冒泡到此处，不必要求焦点停在面板内
function onEscKeydown() {
  if (!needOutsideClick.value || !tooltipVisible.value) return
  onHide()
}
// enter：click 触发且开启 keyboard 时切换显示（click 切换本身由 onTriggerClick 承担，与本键无关）
function onEnterKeydown() {
  if (!showTooltip.value || props.trigger !== 'click' || !props.keyboard) return
  enterActivated = true
  // 同拍内复位：补发的 click 与 keydown 在同一轮任务里，若浏览器不补发（非可激活元素）则不影响下次点击
  setTimeout(() => {
    enterActivated = false
  }, 0)
  toggleVisible()
}
// ── 锚点模式：触发监听与无障碍属性绑定到外部锚点 ────────────────────────────
// 锚点的 focus / blur 不冒泡，与包裹层模式同口径使用捕获阶段监听；绑定随 anchor 变化重建，
// 卸载时移除，并把本组件写入锚点的 tabindex / aria-describedby 还原（不覆盖使用方自有值）
let boundAnchor: HTMLElement | null = null
let anchorTabIndexApplied = false
function onAnchorKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter') {
    onEnterKeydown()
  } else if (e.key === 'Escape') {
    onEscKeydown()
  }
}
function bindAnchor(el: HTMLElement): void {
  el.addEventListener('mouseenter', onEnterWrap)
  el.addEventListener('mouseleave', onLeaveWrap)
  el.addEventListener('click', onTriggerClick)
  el.addEventListener('contextmenu', onContextmenu)
  el.addEventListener('focus', onFocus, true)
  el.addEventListener('blur', onBlur, true)
  el.addEventListener('keydown', onAnchorKeydown)
}
// 还原写入锚点的无障碍属性：tabindex 仅在本组件补过时才移除
function releaseAnchorA11y(el: HTMLElement): void {
  if (anchorTabIndexApplied) {
    el.removeAttribute('tabindex')
    anchorTabIndexApplied = false
  }
  if (el.getAttribute('aria-describedby') === tooltipCardId) {
    el.removeAttribute('aria-describedby')
  }
}
function unbindAnchor(el: HTMLElement): void {
  el.removeEventListener('mouseenter', onEnterWrap)
  el.removeEventListener('mouseleave', onLeaveWrap)
  el.removeEventListener('click', onTriggerClick)
  el.removeEventListener('contextmenu', onContextmenu)
  el.removeEventListener('focus', onFocus, true)
  el.removeEventListener('blur', onBlur, true)
  el.removeEventListener('keydown', onAnchorKeydown)
  releaseAnchorA11y(el)
}
// 无障碍属性同步：tabindex 仅在 focus 触发时补（使用方已设置则不动），
// aria-describedby 仅在提示实际可见时关联，避免读屏器朗读隐藏内容
function syncAnchorA11y(el: HTMLElement | null): void {
  if (!el) return
  if (props.trigger === 'focus') {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0')
      anchorTabIndexApplied = true
    }
  } else if (anchorTabIndexApplied) {
    el.removeAttribute('tabindex')
    anchorTabIndexApplied = false
  }
  const describedBy = ariaDescribedby.value
  if (describedBy) {
    el.setAttribute('aria-describedby', describedBy)
  } else if (el.getAttribute('aria-describedby') === tooltipCardId) {
    el.removeAttribute('aria-describedby')
  }
}
function syncAnchorBinding(): void {
  const externalAnchor = props.anchor
  if (boundAnchor === externalAnchor) return
  if (boundAnchor) {
    unbindAnchor(boundAnchor)
    boundAnchor = null
  }
  if (externalAnchor) {
    bindAnchor(externalAnchor)
    boundAnchor = externalAnchor
    measureAnchor()
    syncAnchorA11y(externalAnchor)
  }
}
watch(() => props.anchor, syncAnchorBinding, { flush: 'post' })
watch([ariaDescribedby, () => props.trigger], () => syncAnchorA11y(props.anchor), { flush: 'post' })
// 卸载时取消延迟显示/隐藏定时器，避免回调在组件卸载后仍然触发
// （外部点击监听由宿主按 show 挂卸并在自身卸载时移除，本组件无需处理）
onBeforeUnmount(() => {
  clearTimers()
  if (boundAnchor) {
    unbindAnchor(boundAnchor)
    boundAnchor = null
  }
})
// 焦点归还：把焦点送回触发元素。包裹层模式取「触发内容里的首个可聚焦元素」（触发器常是 Button，
// 包裹用的 `.tooltip-content` 本身不可聚焦，聚焦它等于没还）；锚点模式直接聚焦使用方提供的锚点
function focusTrigger(): void {
  const root = anchorMode.value ? anchorEl.value : tooltipContentRef.value
  if (!root) return
  const target = findFocusable(root)
  ;(target ?? root).focus({ preventScroll: true })
}
defineExpose({
  show: () => onShow(),
  hide: () => onHide(),
  focusTrigger, // 供皮肤层（Popconfirm）在关闭后归还焦点
  tooltipCardRef // 供皮肤层判定「焦点是否仍留在面板内」
})
</script>
<template>
  <!-- 包裹层模式（默认）：组件自持触发元素与两层包裹 DOM，$attrs 落到包裹层根节点 -->
  <div v-if="!anchorMode" class="tooltip-wrap" @mouseenter="onEnterWrap" @mouseleave="onLeaveWrap" v-bind="$attrs">
    <!-- 浮层宿主承担 Teleport / 首帧优化 / Transition / 关闭语义 / 层级 / 箭头 DOM；
         面板级监听经宿主的 $attrs 落到面板上（宿主根节点是 Teleport，需显式透传） -->
    <Popup
      ref="popupRef"
      v-bind="popupBindings"
      :default-z-index="FLOATING_LAYER_Z_INDEX.tooltip"
      @mouseenter="onEnterTooltip"
      @mouseleave="onLeaveTooltip"
      @keydown.esc="onEscKeydown"
      @outside-click="closeFromOutside"
      @animationend="onAnimationEnd"
    >
      <div
        ref="tooltipCardRef"
        class="tooltip-card"
        :role="tooltipRole"
        :aria-labelledby="tooltipLabelledby"
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
      @click="onTriggerClick"
      @contextmenu="onContextmenu"
      @focus.capture="onFocus"
      @blur.capture="onBlur"
      @keydown.enter="onEnterKeydown"
      @keydown.esc="onEscKeydown"
    >
      <slot>{{ content }}</slot>
    </span>
  </div>
  <!-- 锚点模式：触发元素由使用方提供（监听见 bindAnchor），本组件只渲染「指向该元素的浮层」，
       使用方 DOM 结构不随提示显隐变化；$attrs 在锚点模式下无从下发（本组件没有自有根节点） -->
  <Popup
    v-else
    ref="popupRef"
    v-bind="popupBindings"
    :default-z-index="FLOATING_LAYER_Z_INDEX.tooltip"
    @mouseenter="onEnterTooltip"
    @mouseleave="onLeaveTooltip"
    @keydown.esc="onEscKeydown"
    @outside-click="closeFromOutside"
    @animationend="onAnimationEnd"
  >
    <div
      ref="tooltipCardRef"
      class="tooltip-card"
      :role="tooltipRole"
      :aria-labelledby="tooltipLabelledby"
      :id="tooltipCardId"
      :class="tooltipClass"
      :style="tooltipStyle"
    >
      <slot name="tooltip">{{ tooltip }}</slot>
    </div>
  </Popup>
</template>
<style lang="less" scoped>
.tooltip-wrap {
  position: relative;
  display: inline-block;
}
.tooltip-content {
  display: inline-block;
}
.tooltip-card {
  min-width: 32px;
  max-width: var(--tooltip-max-width);
  min-height: 32px;
  padding: 6px 8px;
  font-size: 14px;
  color: #fff;
  line-height: 1.5714285714285714;
  text-align: justify;
  word-break: break-word;
  background-color: var(--tooltip-background-color);
  border-radius: 6px;
  box-shadow:
    0 6px 16px 0 var(--va-shadow-color),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
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
  --tooltip-arrow-edge: 5px;
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
    left: var(--tooltip-arrow-edge);
  }
  &.va-popup-placement-topRight .tooltip-arrow,
  &.va-popup-placement-bottomRight .tooltip-arrow {
    left: auto;
    right: var(--tooltip-arrow-edge);
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
    top: var(--tooltip-arrow-edge);
  }
  &.va-popup-placement-leftBottom .tooltip-arrow,
  &.va-popup-placement-rightBottom .tooltip-arrow {
    top: auto;
    bottom: var(--tooltip-arrow-edge);
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
