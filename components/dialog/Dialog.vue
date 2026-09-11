<script lang="ts">
// 本块为模块级作用域（仅在模块加载时执行一次），用于创建跨组件实例共享的单例。
// 鼠标点击位置必须在模块加载时就开始捕获：createDiscreteApi（setup 外调用）的首次点击，
// 组件实例尚未 mount，若把监听放在 onMounted 中，该次点击会丢失、展开动画退回中心。
// 该变量仅在事件回调与动画钩子中读写，不参与渲染，故无需响应式。
let mousePosition: { x: number; y: number } | null = null
// 点击时效窗口 100ms：仅点击后短窗口内打开才从鼠标位置展开，
// 异步 / 代码方式打开（窗口已过期）退化为中心展开，避免沿用早已失效的点击坐标
const CLICK_EXPIRE = 100
let expireTimer: ReturnType<typeof setTimeout> | null = null
function getClickPosition(e: MouseEvent): void {
  mousePosition = {
    x: e.clientX, // 相对于浏览器视口左上角的 X 坐标，不随页面滚动而改变
    y: e.clientY // 相对于浏览器视口左上角的 Y 坐标，不随页面滚动而改变
  }
  // 以最后一次点击为准重启计时
  if (expireTimer) {
    clearTimeout(expireTimer)
  }
  expireTimer = setTimeout(() => {
    mousePosition = null
    expireTimer = null
  }, CLICK_EXPIRE)
}
// 第三参用布尔值 true，等价于 { capture: true }：省去 options 特性检测且兼容旧浏览器
if (typeof document !== 'undefined') {
  document.addEventListener('click', getClickPosition, true)
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick, isVNode, createTextVNode } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Scrollbar, { type ScrollbarProps } from 'components/scrollbar'
import Button, { type ButtonProps } from 'components/button'
import { lockScroll, useSlotsExist } from 'components/utils'
import type { DialogApi } from './useDialog'
/** 内容支持的三种形态：纯文本、已构造的 VNode、返回 VNode 的渲染函数 */
export type ContentType = string | VNode | (() => VNode)
/** 底部区域：false 隐藏；true 渲染内置按钮组；函数则完全自定义 */
export type FooterType = boolean | (() => VNode)
/** 按钮回调：返回 false 或 Promise reject 时阻止关闭，其余情况（含 Promise resolve）自动关闭 */
export type DialogCallback = () => unknown | Promise<unknown>
/** 拖拽边界配置：'window' 限制在视口内（默认），'none' 不限制 */
export interface DialogDraggableOptions {
  bounds?: 'none' | 'window'
}
export interface Props {
  width?: string | number // 对话框宽度，单位 px
  height?: string | number // 对话框高度，单位 px，默认自适应内容高度
  title?: ContentType // 标题
  titleClass?: string // 自定义标题类名
  titleStyle?: CSSProperties // 自定义标题样式
  content?: ContentType // 内容
  contentClass?: string // 自定义内容类名
  contentStyle?: CSSProperties // 自定义内容样式
  bodyClass?: string // 自定义弹窗卡片（.dialog-body-wrap）类名，用于定制背景 / 圆角 / 阴影等外观
  bodyStyle?: CSSProperties // 自定义弹窗卡片（.dialog-body-wrap）样式，用于定制背景 / 圆角 / 阴影等外观
  scrollbarProps?: ScrollbarProps // Scrollbar 组件属性配置，用于设置内容滚动条的样式
  cancelText?: string // 取消按钮文字
  cancelProps?: ButtonProps // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确定按钮文字
  okType?: 'primary' | 'danger' // 确定按钮类型
  okProps?: ButtonProps // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  footer?: FooterType // 是否显示底部按钮
  closable?: boolean // 是否显示右上角关闭按钮
  closeIcon?: VNode | (() => VNode) // 自定义关闭图标；插槽形态请用 #closeIcon
  closeFocusable?: boolean // 关闭按钮是否可聚焦，关闭后不参与 Tab 序列
  renderBeforeOpen?: boolean // 首次打开前是否渲染内容（关闭懒渲染），仅声明式用法生效
  destroyOnClose?: boolean // 关闭时是否销毁 Dialog 里的子元素
  switchFullscreen?: boolean // 是否允许切换全屏，允许后右上角会出现一个切换按钮
  centered?: boolean // 是否水平垂直居中，否则固定高度水平居中
  top?: string | number // 固定高度水平居中时，距顶部高度，仅当 centered: false 时生效，单位 px
  transformOrigin?: 'mouse' | 'center' // 对话框动画出现的位置
  confirmLoading?: boolean // 确定按钮 loading
  blockScroll?: boolean // 是否在打开对话框时禁用背景滚动
  keyboard?: boolean // 是否支持键盘 esc 关闭
  mask?: boolean // 是否展示遮罩，false 时背景可交互
  maskClosable?: boolean // 点击蒙层是否允许关闭
  maskClass?: string // 自定义蒙层类名
  maskStyle?: CSSProperties // 自定义蒙层样式
  zIndex?: number // 对话框层级，遮罩取该值，弹窗取该值 + 10
  wrapClass?: string // 自定义外层容器（.dialog-wrap）类名，多实例同时打开时以打开中的实例为准
  wrapStyle?: CSSProperties // 自定义外层容器（.dialog-wrap）样式，多实例同时打开时以打开中的实例为准
  containerClass?: string // 自定义弹窗定位层（.dialog-container）类名，用于覆盖 width / top / zIndex 等定位表现
  containerStyle?: CSSProperties // 自定义弹窗定位层（.dialog-container）样式，优先级高于 width / top / zIndex 等内置样式；定制背景 / 圆角 / 阴影等卡片外观请用 bodyClass / bodyStyle
  focusTriggerAfterClose?: boolean // 关闭后是否将焦点归还给触发元素
  // 打开时自动聚焦的按钮：undefined 聚焦内容容器。必须聚焦到弹窗内，否则焦点在弹窗外时 Esc 不再响应
  autoFocusButton?: 'ok' | 'cancel'
  draggable?: boolean | DialogDraggableOptions // 是否可拖拽，开启后标题栏为拖拽句柄
  afterClose?: () => void // 完全关闭（离场动画结束）后的回调
  onEsc?: (e: KeyboardEvent) => void // 按下 Esc 键的回调，无论是否允许关闭都会触发
  onMaskClick?: (e: MouseEvent) => void // 点击遮罩的回调，无论是否允许关闭都会触发
  open?: boolean // (v-model) 对话框是否可见，声明式用法下生效
  to?: string | HTMLElement // 对话框 Teleport 挂载的节点，可选：元素标签名 (例如 'body') 或者元素本身
}
// 声明组件插槽类型
export interface DialogSlots {
  title?: () => VNode[]
  default?: () => VNode[]
  footer?: () => VNode[]
  closeIcon?: () => VNode[]
}

/** 命令式调用的配置项；声明式用法下与 Props 等价，回调支持返回 Promise 控制关闭时机 */
export interface DialogOptions {
  width?: string | number
  height?: string | number
  title?: ContentType
  titleClass?: string
  titleStyle?: CSSProperties
  content?: ContentType
  contentClass?: string
  contentStyle?: CSSProperties
  bodyClass?: string // 卡片层（.dialog-body-wrap）类名，用于定制背景 / 圆角 / 阴影
  bodyStyle?: CSSProperties // 卡片层（.dialog-body-wrap）样式，用于定制背景 / 圆角 / 阴影
  scrollbarProps?: ScrollbarProps
  cancelText?: string
  cancelProps?: ButtonProps
  okText?: string
  okType?: 'primary' | 'danger'
  okProps?: ButtonProps
  footer?: FooterType
  closable?: boolean
  closeIcon?: VNode | (() => VNode)
  closeFocusable?: boolean
  destroyOnClose?: boolean
  switchFullscreen?: boolean
  centered?: boolean
  top?: string | number
  transformOrigin?: 'mouse' | 'center'
  blockScroll?: boolean
  keyboard?: boolean
  mask?: boolean
  maskClosable?: boolean
  maskClass?: string
  maskStyle?: CSSProperties
  zIndex?: number
  wrapClass?: string
  wrapStyle?: CSSProperties
  containerClass?: string // 定位层（.dialog-container）类名，用于覆盖 width / top / zIndex
  containerStyle?: CSSProperties // 定位层（.dialog-container）样式；卡片外观请用 bodyClass / bodyStyle
  focusTriggerAfterClose?: boolean
  autoFocusButton?: 'ok' | 'cancel'
  draggable?: boolean | DialogDraggableOptions
  afterClose?: () => void
  onEsc?: (e: KeyboardEvent) => void
  onMaskClick?: (e: MouseEvent) => void
  // 下列回调返回 false 或 Promise reject 时阻止关闭，其余情况（含 Promise resolve）自动关闭
  onOk?: DialogCallback
  onCancel?: DialogCallback
}
/** update 可更新的字段：DialogOptions 的全部属性 + loading（供外部异步流程手动控制按钮状态） */
export interface DialogUpdate extends DialogOptions {
  loading?: boolean
}
/** 单个弹窗的句柄，用于编程式关闭与更新 */
export interface DialogReactive extends DialogOptions {
  readonly key: string // 该弹窗的唯一标识
  destroy: () => void // 关闭该弹窗
  update: (options: DialogUpdate) => void // 更新该弹窗
  show: () => void // 重新打开该弹窗；实例已被销毁（destroyOnClose: true 且离场结束）时调用无效
}

/** 拖拽状态载体，即弹窗实例对象 */
interface DragTarget {
  /** 横向拖拽偏移，null 表示未拖拽 */
  dragX: number | null
  /** 纵向拖拽偏移，null 表示未拖拽 */
  dragY: number | null
  /** 是否处于全屏态，全屏时禁止拖拽 */
  fullscreen: boolean
}
interface DragController {
  /** 开始监听拖拽，重复调用会先清理上一次的监听 */
  start: (container: HTMLElement, handle: HTMLElement | null) => void
  /** 停止监听并清理待写入的位置 */
  stop: () => void
}
const props = withDefaults(defineProps<Props>(), {
  width: 520,
  height: 'auto',
  title: undefined,
  titleClass: undefined,
  titleStyle: () => ({}),
  content: undefined,
  contentClass: undefined,
  contentStyle: () => ({}),
  bodyClass: undefined,
  bodyStyle: () => ({}),
  scrollbarProps: () => ({}),
  cancelText: '取消',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  footer: true,
  closable: true,
  closeIcon: undefined,
  closeFocusable: true,
  renderBeforeOpen: false,
  destroyOnClose: false,
  switchFullscreen: false,
  centered: false,
  top: 100,
  transformOrigin: 'mouse',
  confirmLoading: false,
  blockScroll: true,
  keyboard: true,
  mask: true,
  maskClosable: true,
  maskClass: undefined,
  maskStyle: () => ({}),
  zIndex: 1000,
  wrapClass: undefined,
  wrapStyle: () => ({}),
  containerClass: undefined,
  containerStyle: () => ({}),
  focusTriggerAfterClose: true,
  autoFocusButton: undefined,
  draggable: false,
  afterClose: undefined,
  onEsc: undefined,
  onMaskClick: undefined,
  open: false,
  to: 'body'
})
defineSlots<DialogSlots>()
const slotsExist = useSlotsExist(['title'])
/** 弹窗栈中的单个实例：开关状态、loading、全屏态与动画原点各自持有，避免多实例互相覆盖 */
interface DialogItem extends DialogOptions {
  readonly key: string // 唯一标识，作为身份与 :key
  open: boolean
  loading: boolean
  fullscreen: boolean
  origin: string // 解析后的动画原点（区别于 transformOrigin 配置项）
  displayed: boolean // 动画期间保持内容渲染，离场结束后置 false
  // 打开时的鼠标位置快照：离场沿用打开位置收起，而非最后一次点击（关闭按钮）的位置
  openOrigin: { x: number; y: number } | null
  dragX: number | null // 拖拽横向偏移，null 表示未拖拽
  dragY: number | null // 拖拽纵向偏移，null 表示未拖拽
}
const dialogWrapRef = ref<HTMLElement>() // 弹窗层 DOM 引用
// 打开前的焦点元素，关闭后用于归还焦点；弹窗栈归零时统一处理，避免多开时被内层弹窗覆盖
let triggerElement: HTMLElement | null = null
// 是否有实例在关闭时要求归还焦点
let pendingFocusRestore = false
// 各实例弹窗容器的 DOM，用于焦点锁定时圈定可聚焦范围
const containerEls = new Map<string, HTMLElement>()
// 各实例确定 / 取消按钮的 DOM，用于打开时按 autoFocusButton 聚焦
const okBtnEls = new Map<string, HTMLElement>()
const cancelBtnEls = new Map<string, HTMLElement>()
// 各实例的拖拽控制器，实例销毁时需停止监听
const dragControllers = new Map<string, DragController>()
const showDialogWrap = ref<boolean>(false)
const emits = defineEmits<{
  'update:open': [value: boolean]
  cancel: [e?: Event]
  ok: [e?: MouseEvent]
  change: [open: boolean, key: string]
  ready: [api: DialogApi]
}>()
// 弹窗实例栈：每次命令式调用入栈一个实例，关闭时仅弹出自身
const dialogList = ref<DialogItem[]>([])
// 声明式实例的固定标识：由 props.open 驱动，与命令式实例共用同一渲染管线
const DECLARATIVE_KEY = 'dialog_declarative'
let seed = 0
function createKey(): string {
  seed += 1
  return `dialog_${Date.now()}_${seed}`
}
// 栈尾实例：可能已关闭（destroyOnClose: false 的实例关闭后会滞留栈中）
const topItem = computed<DialogItem | undefined>(() => dialogList.value[dialogList.value.length - 1])
// 栈顶的「打开中」实例：Esc / 遮罩点击 / 焦点锁定必须作用于它；
// 直接用 topItem 会命中已关闭的滞留实例，导致上述交互静默失效
const topOpenItem = computed<DialogItem | undefined>(() => {
  for (let index = dialogList.value.length - 1; index >= 0; index -= 1) {
    const item = dialogList.value[index]
    if (item.open) {
      return item
    }
  }
  return undefined
})
// 栈中处于打开状态的实例数，用于滚动锁的引用计数与焦点归还时机
const openCount = computed(() => dialogList.value.filter((item) => item.open).length)
// 只要有任一打开实例要求锁滚动即持锁；lockScroll 内部为引用计数，重复加锁 / 释放均安全
const needScrollLock = computed(() =>
  dialogList.value.some((item) => item.open && getComputedValue(item, 'blockScroll'))
)
// 外层容器的层级取栈中打开实例的最大 zIndex：先开的实例可能配置了更高的 zIndex，
// 取最大值可保证整个弹窗层浮于页面之上，实例之间的先后关系由各自的 zIndex 决定
const baseZIndex = computed(() => {
  const opened = dialogList.value.filter((item) => item.open)
  if (opened.length === 0) {
    return getComputedValue(topItem.value, 'zIndex') ?? props.zIndex
  }
  return Math.max(...opened.map((item) => itemZIndex(item)))
})
// 本组件持有的滚动锁释放函数：加锁后保存返回值、释放后置空，存在即代表本组件持锁；
// 多实例共用一个持锁配额，卸载兜底据此精确释放，避免未持锁时误解锁他人
let scrollLockRelease: (() => void) | null = null
// 内容区按下标记：区分「点击内容」与「内容内按下、遮罩抬起」的拖选场景，避免误关闭
let contentPressed = false
let contentPressTimer: ReturnType<typeof setTimeout> | null = null
function findItem(key: string): DialogItem | undefined {
  return dialogList.value.find((item) => item.key === key)
}
// 取某项配置的最终生效值：per-item 优先级高于组件 Props
function getComputedValue<K extends keyof Props>(item: DialogItem | undefined, key: K): Props[K] {
  if (item && item[key as keyof DialogOptions] !== undefined) {
    return item[key as keyof DialogOptions] as unknown as Props[K]
  }
  return props[key]
}
// 将内容统一渲染为节点：函数式内容调用一次，VNode 直接透传，字符串转为文本节点
function renderContent(content: ContentType | undefined): VNode {
  if (typeof content === 'function') {
    return content()
  }
  if (isVNode(content)) {
    return content
  }
  return createTextVNode(content ?? '')
}
// 长度类配置统一转字符串：数字补 px，字符串（含百分比）原样透传
function resolveSize(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined
  }
  return typeof value === 'number' ? `${value}px` : value
}
// 单个实例的层级：遮罩取 zIndex，弹窗取 zIndex + 10，保持两者的层叠关系
function itemZIndex(item: DialogItem): number {
  return getComputedValue(item, 'zIndex') ?? props.zIndex
}
// 标题元素 id，供 aria-labelledby 关联（无标题时不设置该属性）
function titleId(item: DialogItem): string {
  return `dialog-title-${item.key}`
}
// 外层容器的类名 / 样式：以「打开中」实例为准（共享表现取最上层实例）
function wrapClassOf(): string {
  return getComputedValue(topOpenItem.value, 'wrapClass') ?? ''
}
function wrapStyleOf(): CSSProperties {
  return getComputedValue(topOpenItem.value, 'wrapStyle') ?? {}
}
// 取引用对应的 DOM：原生元素直接返回，组件（Button 未 expose）取其 $el 根节点
function resolveRefEl(el: unknown): HTMLElement | null {
  if (el instanceof HTMLElement) {
    return el
  }
  if (el && typeof el === 'object' && '$el' in el) {
    const root = (el as { $el?: unknown }).$el
    if (root instanceof HTMLElement) {
      return root
    }
  }
  return null
}
// 收集按钮 DOM 供 autoFocusButton 聚焦，按钮随弹窗销毁而移除
function setOkBtnEl(key: string, el: unknown): void {
  const dom = resolveRefEl(el)
  if (dom) {
    okBtnEls.set(key, dom)
  } else {
    okBtnEls.delete(key)
  }
}
function setCancelBtnEl(key: string, el: unknown): void {
  const dom = resolveRefEl(el)
  if (dom) {
    cancelBtnEls.set(key, dom)
  } else {
    cancelBtnEls.delete(key)
  }
}
// 是否存在标题：title 配置与 #title 插槽任一存在即可，仅判断配置会让插槽标题丢失无障碍关联
function hasTitle(item: DialogItem): boolean {
  return Boolean(getComputedValue(item, 'title') || slotsExist.title)
}
// header 同时充当拖拽句柄，故开启拖拽时即便无标题也需渲染
function hasHeader(item: DialogItem): boolean {
  return hasTitle(item) || Boolean(getComputedValue(item, 'draggable'))
}
// 底部区域：传函数时完全自定义，false 时整块隐藏
function isFooterFn(item: DialogItem): boolean {
  return typeof getComputedValue(item, 'footer') === 'function'
}
function footerNode(item: DialogItem): VNode {
  const footer = getComputedValue(item, 'footer')
  return typeof footer === 'function' ? footer() : createTextVNode('')
}
function showFooter(item: DialogItem): boolean {
  return getComputedValue(item, 'footer') !== false
}
// 内容渲染判定：destroyOnClose 为 false 时内容常驻（DOM 保留）；
// 为 true 时保留至离场动画结束后再销毁，避免关闭瞬间内容闪空；
// renderBeforeOpen 优先级最高：即便配置了关闭即销毁，首次打开前内容也已渲染完成
function shouldRenderBody(item: DialogItem): boolean {
  if (getComputedValue(item, 'renderBeforeOpen')) {
    return true
  }
  if (getComputedValue(item, 'destroyOnClose')) {
    return item.open || item.displayed
  }
  return true
}
// 关闭图标：未配置时返回 null，由模板渲染默认图标
function closeIconNode(item: DialogItem): VNode | null {
  const icon = getComputedValue(item, 'closeIcon')
  if (icon === undefined || icon === null) {
    return null
  }
  return renderContent(icon)
}
// 确定按钮的 loading：实例内部异步 loading 与受控 confirmLoading 任一为真即展示
function okLoading(item: DialogItem): boolean {
  return item.loading || getComputedValue(item, 'confirmLoading') === true
}
// 容器定位与拖拽偏移：非居中时拖拽偏移以 calc 叠加在基准 top 之上，兼容百分比 top
function itemStyle(item: DialogItem): CSSProperties {
  const style: CSSProperties = {
    transformOrigin: item.origin,
    zIndex: itemZIndex(item) + 10
  }
  // 全屏态：铺满视口并吸附左上角，覆盖 width / top / left（含拖拽偏移）
  if (item.fullscreen) {
    style.width = '100%'
    style.top = 0
    style.left = 0
    return style
  }
  const centered = getComputedValue(item, 'centered')
  const dragX = item.dragX
  const dragY = item.dragY
  style.width = resolveSize(getComputedValue(item, 'width'))
  if (!centered) {
    const topStr = resolveSize(getComputedValue(item, 'top')) ?? '0px'
    style.top = dragY ? `calc(${topStr} + ${dragY}px)` : topStr
  } else if (dragY) {
    style.top = `${dragY}px`
  }
  if (dragX) {
    style.left = `${dragX}px`
  }
  return style
}
// 内容区高度：全屏时铺满视口，否则取 height（'auto' 时由内容自然撑开）
function dialogBodyStyle(item: DialogItem): CSSProperties {
  if (item.fullscreen) {
    return { height: '100vh', ...getComputedValue(item, 'bodyStyle') }
  }
  return {
    height: resolveSize(getComputedValue(item, 'height')),
    ...getComputedValue(item, 'bodyStyle')
  }
}
// 拖拽句柄类名：仅开启 draggable 时挂载，供控制器查找
function draggableClass(item: DialogItem): string {
  return getComputedValue(item, 'draggable') ? 'dialog-draggable' : ''
}
// 从离场/入场元素上取回实例标识
function getKey(el: Element): string {
  return (el as HTMLElement).dataset.key ?? ''
}
watch(needScrollLock, async (to) => {
  if (!to) {
    // 无需锁时释放本组件持有的锁（未持锁时为空调用，幂等无副作用）
    scrollLockRelease?.()
    scrollLockRelease = null
    return
  }
  await nextTick()
  // 等待期间可能已全部关闭或已持锁，需再次确认，避免重复加锁或锁残留
  if (!needScrollLock.value || scrollLockRelease) {
    return
  }
  scrollLockRelease = lockScroll()
})
// 弹窗数量在「0 ↔ 非 0」之间变化时显示 / 隐藏弹窗层并记录 / 归还触发元素焦点
watch(openCount, (to, from) => {
  if (to > 0) {
    showDialogWrap.value = true
    // 首个弹窗打开时记录触发元素，供全部关闭后归还焦点
    if (from === 0) {
      triggerElement = document.activeElement as HTMLElement | null
    }
    return
  }
  // 关闭后焦点归还触发元素，避免键盘用户从页面顶部重新开始 Tab
  if (pendingFocusRestore && triggerElement?.isConnected) {
    triggerElement.focus({ preventScroll: true })
  }
  pendingFocusRestore = false
  triggerElement = null
})
onUnmounted(() => {
  if (contentPressTimer) {
    clearTimeout(contentPressTimer)
  }
  dragControllers.forEach((controller) => controller.stop())
  dragControllers.clear()
  // 释放触发元素的引用，避免组件卸载后仍持有已移除的 DOM
  triggerElement = null
  // 卸载兜底：本组件仍持锁时释放，否则滚动锁随组件销毁而残留，页面滚动永久锁死；
  // 以 scrollLockRelease 而非 openCount 判定，避免 blockScroll=false 从未加锁却误解锁他人
  scrollLockRelease?.()
})
// 鼠标点击位置由上方模块级 <script> 统一捕获（import 即注册），组件实例无需再监听
//
// 动画原点按实例持有，避免后开弹窗改写先开弹窗的动画原点
async function onBeforeEnter(el: Element) {
  showDialogWrap.value = true
  await nextTick()
  const item = findItem(getKey(el))
  if (!item) {
    return
  }
  const transOrigin = getComputedValue(item, 'transformOrigin')
  if (transOrigin === 'mouse' && mousePosition) {
    const rect = el.getBoundingClientRect()
    // 快照打开时的位置，供离场沿用；否则离场会取到关闭按钮所在的最新点击位置
    item.openOrigin = mousePosition
    item.origin = `${mousePosition.x - rect.left}px ${mousePosition.y - rect.top}px`
  } else {
    item.openOrigin = null
    item.origin = '50% 50%'
  }
}
/**
 * 创建拖拽控制器
 *
 * 1. 拖拽句柄由调用方指定（而非固定 header），通过 class 查找
 * 2. rAF 节流写入位置，避免 mousemove 高频触发多次响应式更新
 * 3. 支持窗口边界钳制，防止弹窗被拖出视口不可见
 *
 * 本库 Dialog 是多实例栈，故状态直接写入实例对象，由调用方按 key 管理控制器生命周期。
 *
 * @param {DragTarget} target 拖拽状态载体，拖拽过程中直接改写其 dragX / dragY
 * @param {boolean | DialogDraggableOptions} draggable 拖拽配置，false 时 start 为空操作
 * @returns {DragController} 控制器，需在实例销毁时调用 stop
 */
function createDragController(target: DragTarget, draggable: boolean | DialogDraggableOptions): DragController {
  let cleanup: (() => void) | undefined

  function stop(): void {
    cleanup?.()
    cleanup = undefined
  }

  function start(container: HTMLElement, handle: HTMLElement | null): void {
    stop()
    if (!draggable || !handle) {
      return
    }
    const boundsToWindow = draggable === true || draggable.bounds !== 'none'
    let mousedownEvent: MouseEvent | undefined
    let minMoveX = 0
    let minMoveY = 0
    let maxMoveX = 0
    let maxMoveY = 0
    let prevMoveX = 0
    let prevMoveY = 0
    let rafId: number | null = null
    let pending: { x: number; y: number } | null = null

    function flush(): void {
      if (pending) {
        target.dragX = pending.x
        target.dragY = pending.y
        pending = null
      }
      rafId = null
    }

    function handleMouseDown(event: MouseEvent): void {
      // 全屏态下卡片铺满视口，拖拽无意义
      if (target.fullscreen) {
        return
      }
      event.preventDefault()
      mousedownEvent = event
      const { x, y, right, bottom } = container.getBoundingClientRect()
      minMoveX = x
      minMoveY = y
      maxMoveX = window.innerWidth - right
      maxMoveY = window.innerHeight - bottom
      prevMoveX = target.dragX ?? 0
      prevMoveY = target.dragY ?? 0
    }

    function handleMouseMove(event: MouseEvent): void {
      if (!mousedownEvent || target.fullscreen) {
        return
      }
      const { clientX: downX, clientY: downY } = mousedownEvent
      let moveX = event.clientX - downX
      let moveY = event.clientY - downY
      if (boundsToWindow) {
        if (moveX > maxMoveX) {
          moveX = maxMoveX
        } else if (-moveX > minMoveX) {
          moveX = -minMoveX
        }
        if (moveY > maxMoveY) {
          moveY = maxMoveY
        } else if (-moveY > minMoveY) {
          moveY = -minMoveY
        }
      }
      pending = { x: moveX + prevMoveX, y: moveY + prevMoveY }
      if (rafId === null) {
        rafId = requestAnimationFrame(flush)
      }
    }

    function handleMouseUp(): void {
      mousedownEvent = undefined
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        // 取消 rAF 后立即补写，避免最后一次移动丢失
        flush()
      }
    }

    handle.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    cleanup = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      handle.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }

  return { start, stop }
}
// 入场聚焦目标：autoFocusButton 指定 ok / cancel 按钮；undefined 沿用默认聚焦内容容器；
// null 不聚焦。按钮不存在时回落内容容器，保证首次 Tab 前 Esc 可用
function resolveAutoFocusTarget(item: DialogItem, container: HTMLElement): HTMLElement | null {
  const autoFocusButton = getComputedValue(item, 'autoFocusButton')
  const defaultTarget = container.querySelector<HTMLElement>('.dialog-body-wrap') ?? container
  if (autoFocusButton === undefined) {
    return defaultTarget
  }
  const btnEl = autoFocusButton === 'cancel' ? cancelBtnEls.get(item.key) : okBtnEls.get(item.key)
  return btnEl ?? defaultTarget
}
// 入场动画结束后聚焦并按需启动拖拽：此时动画类已移除，设置 left / top 不会被动画覆盖
function onAfterEnter(el: Element): void {
  const item = findItem(getKey(el))
  if (!item) {
    return
  }
  const container = el as HTMLElement
  const focusTarget = resolveAutoFocusTarget(item, container)
  if (focusTarget) {
    focusTarget.focus({ preventScroll: true })
  }
  const draggable = getComputedValue(item, 'draggable')
  if (draggable) {
    const controller = createDragController(item, draggable)
    controller.start(container, container.querySelector<HTMLElement>('.dialog-draggable'))
    dragControllers.set(item.key, controller)
  }
}
function onBeforeLeave(el: Element) {
  const item = findItem(getKey(el))
  if (!item) {
    return
  }
  // 离场沿用打开时的鼠标位置：按当前位置重算会让缩放动画从关闭按钮处收起，而非打开位置
  if (getComputedValue(item, 'transformOrigin') === 'mouse' && item.openOrigin) {
    const rect = el.getBoundingClientRect()
    item.origin = `${item.openOrigin.x - rect.left}px ${item.openOrigin.y - rect.top}px`
  } else {
    item.origin = '50% 50%'
  }
  // 离场期间停止拖拽，避免动画途中仍在改写位置
  dragControllers.get(item.key)?.stop()
  dragControllers.delete(item.key)
}
function onAfterLeave(el: Element): void {
  const item = findItem(getKey(el))
  if (item) {
    // 离场结束后才允许销毁内容并重置全屏，避免关闭瞬间内容闪空
    item.displayed = false
    item.fullscreen = false
    item.dragX = null
    item.dragY = null
    getComputedValue(item, 'afterClose')?.()
    if (getComputedValue(item, 'destroyOnClose')) {
      removeItem(item.key)
    }
  }
  // 栈中仍有打开实例时保持显示，否则其余弹窗会被一起隐藏
  if (openCount.value === 0) {
    showDialogWrap.value = false
  }
}
// 焦点锁定的可聚焦元素选择器，覆盖常见交互元素与显式 tabindex
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')
// 取容器内当前可见的可聚焦元素：隐藏元素（如未展开的面板）不参与循环
function getFocusableEls(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getClientRects().length > 0
  )
}
/**
 * 弹窗主体的键盘处理：keydown 绑定在弹窗主体上，
 * 由「焦点是否在弹窗内」决定由哪个弹窗响应，因此无需跨实例的全局仲裁栈；
 * 代价是焦点移出弹窗后（如 mask: false 时点击背景）Esc 不再响应。
 */
function onKeydown(item: DialogItem, e: KeyboardEvent): void {
  if (e.key === 'Tab') {
    trapTab(item, e)
    return
  }
  if (e.key === 'Escape') {
    handleEsc(item, e)
  }
}
// Tab 焦点锁定：Tab / Shift + Tab 在弹窗内循环，避免键盘焦点跑到背景页面
function trapTab(item: DialogItem, e: KeyboardEvent): void {
  const container = containerEls.get(item.key)
  if (!container) {
    return
  }
  e.preventDefault()
  const focusable = getFocusableEls(container)
  if (focusable.length === 0) {
    // 无可聚焦元素时退回外层容器，焦点不至于跑回背景页面
    dialogWrapRef.value?.focus({ preventScroll: true })
    return
  }
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const activeIndex = focusable.indexOf(document.activeElement as HTMLElement)
  if (activeIndex === -1) {
    // 焦点已在弹窗外（如点击了背景区域）时，正序回到首个、倒序回到末个
    const entry = e.shiftKey ? last : first
    entry.focus({ preventScroll: true })
    return
  }
  if (e.shiftKey) {
    const prev = activeIndex === 0 ? last : focusable[activeIndex - 1]
    prev.focus({ preventScroll: true })
    return
  }
  const next = activeIndex === focusable.length - 1 ? first : focusable[activeIndex + 1]
  next.focus({ preventScroll: true })
}
// Esc 关闭：stopPropagation 避免冒泡后又被页面其他 Esc 监听处理一次
function handleEsc(item: DialogItem, e: KeyboardEvent): void {
  // 输入法组合态下的 Esc 用于取消候选词，不应关闭弹窗
  if (e.isComposing || e.keyCode === 229) {
    return
  }
  e.stopPropagation()
  getComputedValue(item, 'onEsc')?.(e)
  if (getComputedValue(item, 'keyboard')) {
    void onCancel(item.key, e)
  }
}
// 内容区按下 / 抬起标记：用于区分拖选（内容内按下、遮罩抬起）与真实遮罩点击
function onContentMouseDown(): void {
  if (contentPressTimer) {
    clearTimeout(contentPressTimer)
  }
  contentPressed = true
}
function onContentMouseUp(): void {
  contentPressTimer = setTimeout(() => {
    contentPressed = false
  })
}
// 遮罩点击作用于该遮罩所属的实例：各实例遮罩按自身 zIndex 层叠，视觉最上层的不一定是栈尾，
// 统一按 topOpenItem 处理会在 zIndex 与入栈顺序不一致时关闭错误的实例
function handleMaskClick(item: DialogItem, e: MouseEvent): void {
  if (!item.open) {
    return
  }
  getComputedValue(item, 'onMaskClick')?.(e)
  // 本次点击起始于内容区（拖选后释放在遮罩），不视为遮罩点击
  if (contentPressed) {
    contentPressed = false
    return
  }
  if (getComputedValue(item, 'maskClosable')) {
    void onCancel(item.key, e)
  }
}
function onToggleFullscreen(item: DialogItem): void {
  item.fullscreen = !item.fullscreen
}
// 回调返回 false 或 Promise reject 时阻止关闭，其余情况（含 Promise resolve）自动关闭
async function onCancel(key: string, e?: Event): Promise<void> {
  const item = findItem(key)
  if (!item) {
    return
  }
  try {
    const result = await item.onCancel?.()
    if (result === false) {
      return
    }
  } catch (err) {
    console.error('[Dialog] onCancel error:', err) // 避免 unhandled rejection 导致取消流程静默中断
    return
  }
  closeItem(key)
  emits('cancel', e)
}
async function onOK(key: string, e?: MouseEvent): Promise<void> {
  const item = findItem(key)
  if (!item) {
    return
  }
  // 声明式：确定按钮只派发 ok，不自动关闭；
  // 关闭时机交由父组件的 v-model:open 决定，便于在 @ok 中异步提交或校验失败时保持打开
  if (key === DECLARATIVE_KEY) {
    emits('ok', e)
    return
  }
  item.loading = true
  try {
    const result = await item.onOk?.()
    if (result === false) {
      return
    }
  } catch (err) {
    console.error('[Dialog] onOk error:', err) // 避免 unhandled rejection 导致 loading 卡死
    return
  } finally {
    item.loading = false
  }
  // 仅关闭自身，不影响 onOk 期间新弹出的弹窗
  if (findItem(key)) {
    closeItem(key)
  }
  emits('ok', e)
}
function push(dialog: DialogOptions): DialogReactive {
  const key = createKey()
  dialogList.value.push({
    ...dialog,
    key,
    open: true,
    // 继承组件级 confirmLoading，使 <DialogProvider confirm-loading> 对命令式实例同样生效（与 Modal 一致）
    loading: props.confirmLoading,
    fullscreen: false,
    origin: '50% 50%',
    displayed: true,
    openOrigin: null,
    dragX: null,
    dragY: null,
    // 命令式弹窗默认销毁（一次性调用），避免关闭后实例无限累积；需要保留内容时可显式传 destroyOnClose: false
    destroyOnClose: dialog.destroyOnClose ?? true
  })
  emits('change', true, key)
  return {
    key,
    destroy: () => closeItem(key),
    update: (options: DialogUpdate) => updateItem(key, options),
    show: () => openItem(key)
  }
}
function openDialog(data: DialogOptions): DialogReactive {
  return push(data)
}
function updateItem(key: string, options: DialogUpdate): void {
  const item = findItem(key)
  if (!item) {
    return
  }
  Object.assign(item, options)
  // draggable 被 update 关闭时停止监听，否则拖拽句柄仍会响应
  if (!getComputedValue(item, 'draggable')) {
    dragControllers.get(key)?.stop()
    dragControllers.delete(key)
  }
}
// 重新打开实例：实例仍留在栈中时（destroyOnClose: false）可复用
function openItem(key: string): void {
  const item = findItem(key)
  if (!item || item.open) {
    return
  }
  item.open = true
  item.displayed = true
  if (key === DECLARATIVE_KEY) {
    emits('update:open', true)
  }
  emits('change', true, key)
}
// 关闭实例：仅标记 open: false 并触发离场动画；实际移除（销毁）在离场结束后由 removeItem 完成
function closeItem(key: string): void {
  const item = findItem(key)
  if (!item || !item.open) {
    return
  }
  item.open = false
  // 记录该实例的焦点归还偏好，待弹窗栈归零后统一归还
  if (getComputedValue(item, 'focusTriggerAfterClose')) {
    pendingFocusRestore = true
  }
  // v-model:open 仅反映声明式实例的状态
  if (key === DECLARATIVE_KEY) {
    emits('update:open', false)
  }
  emits('change', false, key)
}
// 从栈中彻底移除实例（DOM 随之销毁）
function removeItem(key: string): void {
  const index = dialogList.value.findIndex((item) => item.key === key)
  if (index === -1) {
    return
  }
  dialogList.value.splice(index, 1)
  containerEls.delete(key)
  okBtnEls.delete(key)
  cancelBtnEls.delete(key)
  dragControllers.get(key)?.stop()
  dragControllers.delete(key)
}
// 关闭所有弹窗：逐实例走正常关闭流程以保留离场动画，离场结束后统一从栈中移除
function destroyAll(): void {
  dialogList.value.forEach((item) => {
    if (!item.open) {
      return
    }
    // 统一置为销毁，避免 destroyOnClose: false 的实例关闭后仍滞留栈中
    item.destroyOnClose = true
    closeItem(item.key)
  })
}
// 声明式实例：由 props.open 驱动，具体配置经 getComputedValue 回落到组件 Props
function pushDeclarative(open: boolean): void {
  dialogList.value.push({
    key: DECLARATIVE_KEY,
    open,
    loading: false,
    fullscreen: false,
    origin: '50% 50%',
    displayed: true,
    openOrigin: null,
    dragX: null,
    dragY: null
  })
}
function openDeclarative(): void {
  const existing = findItem(DECLARATIVE_KEY)
  if (!existing) {
    pushDeclarative(true)
  } else {
    existing.open = true
    existing.displayed = true
  }
  emits('change', true, DECLARATIVE_KEY)
}
// 声明式开关：props.open 同步到栈内固定的声明式实例
watch(
  () => props.open,
  (to) => {
    if (to) {
      openDeclarative()
    } else if (findItem(DECLARATIVE_KEY)) {
      closeItem(DECLARATIVE_KEY)
    }
  },
  { immediate: true }
)
// 预渲染：开启后提前创建关闭态的声明式实例，使内容在首次打开前即完成渲染
// 必须置于 props.open 的 watch 之后：初始即为 open: true 时该实例已入栈，此处不再重复创建
watch(
  () => props.renderBeforeOpen,
  (to) => {
    if (to && !findItem(DECLARATIVE_KEY)) {
      pushDeclarative(false)
    }
  },
  { immediate: true }
)
// 用函数 ref 按 key 收集容器 DOM；卸载时传 null，需同步清理以免泄漏
function setContainerEl(key: string, el: unknown): void {
  const dom = el instanceof HTMLElement ? el : null
  if (dom) {
    containerEls.set(key, dom)
  } else {
    containerEls.delete(key)
  }
}
// 向 <DialogProvider> 回传 api，使其无需依赖模板 ref 即可对外提供
emits('ready', { open: openDialog, destroyAll })
</script>
<template>
  <Teleport :to="to">
    <div
      v-show="showDialogWrap"
      tabindex="-1"
      ref="dialogWrapRef"
      class="dialog-wrap"
      :class="wrapClassOf()"
      :style="[wrapStyleOf(), { zIndex: baseZIndex + 10 }]"
    >
      <template v-for="item in dialogList" :key="item.key">
        <!-- layer 自身 pointer-events: none，click.self 永不触发，遮罩点击统一由 mask 处理 -->
        <div class="dialog-layer">
          <Transition name="fade" appear>
            <div
              v-show="item.open && getComputedValue(item, 'mask')"
              class="dialog-mask"
              aria-hidden="true"
              :class="getComputedValue(item, 'maskClass')"
              :style="[getComputedValue(item, 'maskStyle'), { zIndex: itemZIndex(item) }]"
              @click="(e: MouseEvent) => handleMaskClick(item, e)"
            ></div>
          </Transition>
          <Transition
            name="zoom"
            appear
            enter-from-class="zoom-enter"
            enter-active-class="zoom-enter"
            enter-to-class="zoom-enter zoom-enter-active"
            leave-from-class="zoom-leave"
            leave-active-class="zoom-leave"
            leave-to-class="zoom-leave zoom-leave-active"
            @before-enter="onBeforeEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @after-leave="onAfterLeave"
          >
            <div
              v-show="item.open"
              :ref="(el: unknown) => setContainerEl(item.key, el)"
              :data-key="item.key"
              class="dialog-container"
              :class="[
                { 'dialog-with-fullscreen': item.fullscreen, 'is-centered': getComputedValue(item, 'centered') },
                getComputedValue(item, 'containerClass')
              ]"
              :style="[itemStyle(item), getComputedValue(item, 'containerStyle')]"
            >
              <div
                v-if="shouldRenderBody(item)"
                class="dialog-body-wrap"
                tabindex="-1"
                role="dialog"
                aria-modal="true"
                :aria-labelledby="hasTitle(item) ? titleId(item) : undefined"
                :class="getComputedValue(item, 'bodyClass')"
                :style="dialogBodyStyle(item)"
                @mousedown="onContentMouseDown"
                @mouseup="onContentMouseUp"
                @keydown="(e: KeyboardEvent) => onKeydown(item, e)"
              >
                <div
                  v-if="hasHeader(item)"
                  class="dialog-header"
                  :class="{
                    'header-with-switch': getComputedValue(item, 'switchFullscreen'),
                    'header-with-close': getComputedValue(item, 'closable'),
                    'dialog-draggable': getComputedValue(item, 'draggable')
                  }"
                  :style="getComputedValue(item, 'titleStyle')"
                >
                  <div :id="titleId(item)" :class="getComputedValue(item, 'titleClass')">
                    <slot name="title">
                      <component :is="renderContent(getComputedValue(item, 'title'))" />
                    </slot>
                  </div>
                </div>
                <button
                  v-if="getComputedValue(item, 'switchFullscreen')"
                  type="button"
                  class="fullscreen-action"
                  :class="{ 'fullscreen-only': !getComputedValue(item, 'closable') }"
                  :aria-label="item.fullscreen ? '退出全屏' : '全屏'"
                  @click="onToggleFullscreen(item)"
                >
                  <svg
                    v-show="!item.fullscreen"
                    class="icon-svg"
                    focusable="false"
                    data-icon="fullscreen"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
                    ></path>
                  </svg>
                  <svg
                    v-show="item.fullscreen"
                    class="icon-svg"
                    focusable="false"
                    data-icon="fullscreen-exit"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"
                    ></path>
                  </svg>
                </button>
                <button
                  v-if="getComputedValue(item, 'closable')"
                  type="button"
                  class="close-action"
                  :tabindex="getComputedValue(item, 'closeFocusable') ? 0 : -1"
                  aria-label="关闭"
                  @click="onCancel(item.key, $event)"
                >
                  <slot name="closeIcon">
                    <component v-if="closeIconNode(item)" :is="closeIconNode(item)" class="icon-svg" />
                    <svg
                      v-else
                      class="icon-svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="64 64 896 896"
                      data-icon="close"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                      ></path>
                    </svg>
                  </slot>
                </button>
                <Scrollbar v-bind="getComputedValue(item, 'scrollbarProps')">
                  <div
                    class="dialog-content"
                    :class="getComputedValue(item, 'contentClass')"
                    :style="getComputedValue(item, 'contentStyle')"
                  >
                    <slot>
                      <component :is="renderContent(getComputedValue(item, 'content'))" />
                    </slot>
                  </div>
                </Scrollbar>
                <div v-if="showFooter(item)" class="dialog-footer">
                  <component v-if="isFooterFn(item)" :is="footerNode(item)" />
                  <slot v-else name="footer">
                    <Button
                      class="mr8"
                      :ref="(el: unknown) => setCancelBtnEl(item.key, el)"
                      @click="onCancel(item.key, $event)"
                      v-bind="getComputedValue(item, 'cancelProps')"
                    >
                      {{ getComputedValue(item, 'cancelText') }}
                    </Button>
                    <Button
                      :ref="(el: unknown) => setOkBtnEl(item.key, el)"
                      :type="getComputedValue(item, 'okType')"
                      :loading="okLoading(item)"
                      :disabled="item.loading"
                      @click="onOK(item.key, $event)"
                      v-bind="getComputedValue(item, 'okProps')"
                    >
                      {{ getComputedValue(item, 'okText') }}
                    </Button>
                  </slot>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.zoom-enter {
  transform: none;
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.zoom-enter-active {
  animation-name: zoomIn;
  animation-play-state: running;
  @keyframes zoomIn {
    0% {
      transform: scale(0.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
.zoom-leave {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-leave-active {
  animation-name: zoomOut;
  animation-play-state: running;
  pointer-events: none;
  @keyframes zoomOut {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.2);
      opacity: 0;
    }
  }
}
.dialog-wrap {
  position: fixed;
  inset: 0;
  overflow: hidden;
  outline: 0;
  // 容器本身不接收点击，避免拦截未被遮罩 / 弹窗覆盖区域的交互
  pointer-events: none;
}
.dialog-layer {
  position: fixed;
  inset: 0;
  overflow: auto;
  outline: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}
.dialog-mask {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: auto; // 遮罩可见时接收点击（遮罩关闭 / 阻断背景交互）
}
.dialog-container {
  position: relative;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  width: auto;
  max-width: calc(100vw - 32px);
  padding-bottom: 24px;
  outline: none;
  pointer-events: auto;
  &.is-centered {
    margin-top: auto;
    margin-bottom: auto;
    padding-bottom: 0;
  }
  .dialog-body-wrap {
    display: flex;
    flex-direction: column;
    position: relative;
    outline: none;
    background-color: #fff;
    border-radius: 8px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    padding: 20px 24px;
    max-width: 100%;
    .dialog-header {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 600;
      line-height: 1.5;
      word-break: break-word;
      background: transparent;
      border-radius: 8px 8px 0 0;
      margin-bottom: 8px;
      // 显示右上角按钮时为标题预留空间，避免被按钮遮挡
      &.header-with-close {
        max-width: calc(100% - 24px);
      }
      &.header-with-switch {
        max-width: calc(100% - 54px);
      }
      // 仅有全屏按钮时按单个按钮宽度预留
      &.header-with-switch:not(.header-with-close) {
        max-width: calc(100% - 24px);
      }
      &.dialog-draggable {
        cursor: move;
      }
    }
    .fullscreen-action,
    .close-action {
      position: absolute;
      top: 20px;
      z-index: 1;
      padding: 0;
      border: none;
      outline: none;
      background: transparent;
      font-weight: 600;
      line-height: 1;
      border-radius: 4px;
      width: 22px;
      height: 22px;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-svg {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.45);
        fill: currentColor;
        transition: color 0.2s;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.06);
        .icon-svg {
          color: rgba(0, 0, 0, 0.88);
        }
      }
      &:focus-visible {
        outline: 2px solid rgba(0, 0, 0, 0.88);
        outline-offset: 1px;
      }
    }
    .fullscreen-action {
      right: 48px;
    }
    // 无关闭按钮时全屏按钮补位到关闭按钮的位置，避免右侧留出空档
    .fullscreen-action.fullscreen-only {
      right: 18px;
    }
    .close-action {
      right: 18px;
    }
    .dialog-content {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.5714285714285714;
      word-break: break-word;
      transition: all 0.25s;
    }
    .dialog-footer {
      text-align: end;
      background: transparent;
      margin-top: 12px;
      .mr8 {
        margin-right: 8px;
      }
    }
  }
  &.dialog-with-fullscreen {
    max-width: 100%;
    padding-bottom: 0;
    .dialog-body-wrap {
      border-radius: 0;
    }
  }
}
</style>
