<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  isVNode,
  createTextVNode,
  useSlots,
  h,
  Fragment
} from 'vue'
import type { VNode, Slot, CSSProperties } from 'vue'
import Button, { type ButtonProps } from 'components/button'
import Scrollbar, { type ScrollbarProps } from 'components/scrollbar'
import ModalRenderHost from './ModalRenderHost'
import { useInject, useOptionsSupported, lockScroll } from 'components/utils'
// 内容支持的三种形态：纯文本、已构造的 VNode、返回 VNode 的渲染函数
export type ContentType = string | VNode | (() => VNode)
// 底部区域：false 隐藏；true 渲染内置按钮组；函数则完全自定义
export type FooterType = boolean | (() => VNode)
// 按钮回调：返回 false 或 Promise reject 时阻止关闭，其余情况（含 Promise resolve）自动关闭
export type ModalCallback = () => unknown | Promise<unknown>
export interface Props {
  width?: string | number // 模态框宽度，单位 px
  height?: string | number // 内容区高度，单位 px，默认自适应内容高度
  icon?: VNode | Slot // 自定义图标
  title?: ContentType // 模态框标题，支持 string | VNode | 渲染函数
  titleClass?: string // 自定义标题类名
  titleStyle?: CSSProperties // 自定义标题样式
  content?: ContentType // 模态框内容，支持 string | VNode | 渲染函数
  contentClass?: string // 自定义内容类名
  contentStyle?: CSSProperties // 自定义内容样式
  scrollbarProps?: ScrollbarProps // Scrollbar 组件属性配置，用于设置内容滚动条的样式
  bodyClass?: string // 自定义 body 类名
  bodyStyle?: CSSProperties // 自定义 body 样式
  cancelText?: string // 取消按钮文字
  cancelProps?: ButtonProps // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确认按钮文字
  okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 确认按钮类型
  okProps?: ButtonProps // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  noticeText?: string // 通知按钮文字
  noticeProps?: ButtonProps // 通知按钮 props 配置，参考 Button 组件 Props
  footer?: FooterType // 是否显示底部按钮区 boolean | slot
  closable?: boolean // 是否显示右上角关闭按钮
  closeIcon?: VNode | Slot // 自定义关闭图标
  renderBeforeOpen?: boolean // 首次打开前是否渲染内容（关闭懒渲染）
  destroyOnClose?: boolean // 关闭时是否销毁 Modal 里的子元素
  centered?: boolean // 是否水平垂直居中，否则固定高度水平居中
  top?: string | number // 固定高度水平居中时，距顶部高度，仅当 center: false 时生效，单位 px
  transformOrigin?: 'mouse' | 'center' // 模态框动画出现的位置
  confirmLoading?: boolean // 确认按钮 loading
  blockScroll?: boolean // 是否在打开模态框时禁用背景滚动
  keyboard?: boolean // 是否支持键盘 esc 关闭
  mask?: boolean // 是否展示遮罩
  maskClosable?: boolean // 点击蒙层是否允许关闭
  maskClass?: string // 自定义蒙层类名
  maskStyle?: CSSProperties // 自定义蒙层样式
  wrapClass?: string // 自定义外层容器（.modal-wrap）类名，多实例同时打开时以栈顶为准
  wrapStyle?: CSSProperties // 自定义外层容器（.modal-wrap）样式，多实例同时打开时以栈顶为准
  containerClass?: string // 自定义弹窗容器（.modal-container）类名
  containerStyle?: CSSProperties // 自定义弹窗容器（.modal-container）样式，优先级高于 width / top / zIndex 等内置样式
  zIndex?: number // 模态框层级，遮罩取该值，弹窗取该值 + 10
  autoFocusButton?: null | 'ok' | 'cancel' // 打开时自动聚焦的按钮，null 表示不聚焦
  focusTriggerAfterClose?: boolean // 关闭后是否将焦点归还给触发元素
  trapFocus?: boolean // 是否将键盘焦点锁定在弹窗内，开启后 Tab / Shift + Tab 在弹窗内循环
  modalRender?: (arg: { originVNode: VNode }) => VNode // 自定义渲染弹窗内容，常用于包裹拖拽逻辑
  afterClose?: () => void // 完全关闭（离场动画结束）后的回调
  onEsc?: (e: KeyboardEvent) => void // 按下 Esc 键的回调，无论是否允许关闭都会触发
  onMaskClick?: (e: MouseEvent) => void // 点击遮罩的回调，无论是否允许关闭都会触发
  to?: string | HTMLElement // 弹窗容器挂载的节点，可选：元素标签名 (例如 'body') 或者元素本身
  open?: boolean // (v-model) 模态框是否可见，声明式用法下生效
}
const props = withDefaults(defineProps<Props>(), {
  width: 420,
  height: 'auto',
  icon: undefined,
  title: undefined,
  titleClass: undefined,
  titleStyle: () => ({}),
  content: undefined,
  contentClass: undefined,
  contentStyle: () => ({}),
  scrollbarProps: () => ({}),
  bodyClass: undefined,
  bodyStyle: () => ({}),
  cancelText: '取消',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  noticeText: '知道了',
  noticeProps: () => ({}),
  footer: true,
  closable: false,
  closeIcon: undefined,
  renderBeforeOpen: false,
  destroyOnClose: false,
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
  wrapClass: undefined,
  wrapStyle: () => ({}),
  containerClass: undefined,
  containerStyle: () => ({}),
  zIndex: 1000,
  autoFocusButton: 'ok',
  focusTriggerAfterClose: true,
  trapFocus: true,
  modalRender: undefined,
  afterClose: undefined,
  onEsc: undefined,
  onMaskClick: undefined,
  to: 'body',
  open: false
})
export interface ModalOptions {
  width?: string | number // 模态框宽度，单位 px
  height?: string | number // 内容区高度，单位 px，默认自适应内容高度
  icon?: VNode | (() => VNode) // 自定义图标
  title?: ContentType // 模态框标题
  titleClass?: string // 自定义标题类名
  titleStyle?: CSSProperties // 自定义标题样式
  content?: ContentType // 模态框内容
  contentClass?: string // 自定义内容类名
  contentStyle?: CSSProperties // 自定义内容样式
  scrollbarProps?: ScrollbarProps // Scrollbar 组件属性配置，用于设置内容滚动条的样式
  bodyClass?: string // 自定义 body 类名
  bodyStyle?: CSSProperties // 自定义 body 样式
  showCancel?: boolean // 是否显示取消按钮，仅 confirm / erase 双按钮形态生效，默认 true；其余形态该配置不生效
  cancelText?: string // 取消按钮文字
  cancelProps?: ButtonProps // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确认按钮文字
  okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 确认按钮类型
  okProps?: ButtonProps // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  noticeText?: string // 通知按钮文字
  noticeProps?: ButtonProps // 通知按钮 props 配置，参考 Button 组件 Props
  footer?: FooterType // 底部按钮区，false 隐藏，传函数则完全自定义；create() 调用默认 false，其余默认 true
  closable?: boolean // 是否显示右上角关闭按钮，默认 false，需要时显式开启
  closeIcon?: VNode | (() => VNode) // 自定义关闭图标
  renderBeforeOpen?: boolean // 首次打开前是否渲染内容（关闭懒渲染）
  destroyOnClose?: boolean // 关闭时是否销毁 Modal 里的子元素，命令式调用默认 true
  centered?: boolean // 是否水平垂直居中，否则固定高度水平居中
  top?: string | number // 固定高度水平居中时，距顶部高度，仅当 center: false 时生效，单位 px
  transformOrigin?: 'mouse' | 'center' // 模态框动画出现的位置
  blockScroll?: boolean // 是否在打开模态框时禁用背景滚动
  keyboard?: boolean // 是否支持键盘 esc 关闭
  mask?: boolean // 是否展示遮罩
  maskClosable?: boolean // 点击蒙层是否允许关闭
  maskClass?: string // 自定义蒙层类名
  maskStyle?: CSSProperties // 自定义蒙层样式
  wrapClass?: string // 自定义外层容器（.modal-wrap）类名，多实例同时打开时以栈顶为准
  wrapStyle?: CSSProperties // 自定义外层容器（.modal-wrap）样式，多实例同时打开时以栈顶为准
  containerClass?: string // 自定义弹窗容器（.modal-container）类名
  containerStyle?: CSSProperties // 自定义弹窗容器（.modal-container）样式，优先级高于 width / top / zIndex 等内置样式
  zIndex?: number // 模态框层级，遮罩取该值，弹窗取该值 + 10
  autoFocusButton?: null | 'ok' | 'cancel' // 打开时自动聚焦的按钮，null 表示不聚焦
  focusTriggerAfterClose?: boolean // 关闭后是否将焦点归还给触发元素
  trapFocus?: boolean // 是否将键盘焦点锁定在弹窗内，开启后 Tab / Shift + Tab 在弹窗内循环
  modalRender?: (arg: { originVNode: VNode }) => VNode // 自定义渲染弹窗内容
  afterClose?: () => void // 完全关闭（离场动画结束）后的回调
  // 下列回调返回 false 或 Promise reject 时阻止关闭，其余情况（含 Promise resolve）自动关闭
  onKnow?: ModalCallback // 点击知道了按钮的回调，返回 Promise 时按钮保持 loading 直至其结束
  onOk?: ModalCallback // 点击确认按钮的回调，返回 Promise 时按钮保持 loading 直至其结束
  onCancel?: ModalCallback // 点击遮罩层、Esc 键或取消按钮的回调
  onEsc?: (e: KeyboardEvent) => void // 按下 Esc 键的回调，无论是否允许关闭都会触发
  onMaskClick?: (e: MouseEvent) => void // 点击遮罩的回调，无论是否允许关闭都会触发
}
// custom 为完全自定义形态：不渲染内置图标与按钮组，交由 icon / footer 自行组合
type Mode = 'info' | 'success' | 'error' | 'warning' | 'confirm' | 'erase' | 'custom'
// 声明式实例的固定标识：由 props.open 驱动，与命令式实例共用同一渲染管线
const DECLARATIVE_KEY = 'modal_declarative'
// 声明式固定双按钮形态，与 Dialog 一致
const DECLARATIVE_MODE: Mode = 'confirm'
// update 可更新的字段：ModalOptions 的全部属性 + mode（用于切换弹窗类型，进而决定内置图标与按钮组）
// key 是身份标识，创建后不可变更；ModalOptions 本就不含 key，故无需额外剔除
export interface ModalUpdate extends ModalOptions {
  mode?: Mode // 切换弹窗类型，进而决定内置图标与按钮组
  loading?: boolean // 手动控制按钮 loading，供外部异步流程驱动
}
// 弹窗栈中的单个实例：开关状态、loading 与动画原点各自持有，避免多实例互相覆盖
interface ModalItem extends ModalOptions {
  readonly key: string // 唯一标识，作为身份与 :key
  mode: Mode
  open: boolean
  loading: boolean
  origin: string // 解析后的动画原点（区别于 transformOrigin 配置项）
  displayed: boolean // 动画期间保持内容渲染，离场结束后置 false
}
// 单个弹窗的句柄，用于编程式关闭与更新
export interface ModalReactive extends ModalOptions {
  readonly key: string // 该弹窗的唯一标识
  destroy: () => void // 关闭该弹窗
  update: (options: ModalUpdate) => void // 更新该弹窗；mode 可切换弹窗类型与内置图标
  show: () => void // 重新打开该弹窗；实例已被销毁（destroyOnClose: true 且离场结束）时调用无效
}
const modalWrapRef = ref() // modal DOM 引用
// 打开前的焦点元素，关闭后用于归还焦点；弹窗栈归零时统一处理，避免多开时被内层弹窗覆盖
let triggerElement: HTMLElement | null = null
// 是否有实例在关闭时要求归还焦点
let pendingFocusRestore = false
// 各实例确定 / 取消按钮的 DOM，用于打开时按 autoFocusButton 聚焦
const okBtnEls = new Map<string, HTMLElement>()
const cancelBtnEls = new Map<string, HTMLElement>()
// Button 的 ref 拿到的是组件实例，需取出其根 DOM
function resolveEl(el: unknown): HTMLElement | null {
  if (!el) {
    return null
  }
  const inner = (el as { $el?: unknown }).$el
  if (inner instanceof HTMLElement) {
    return inner
  }
  return el instanceof HTMLElement ? el : null
}
// 用函数 ref 按 key 收集按钮 DOM；卸载时传 null，需同步清理以免泄漏
function setOkBtnEl(key: string, el: unknown): void {
  const dom = resolveEl(el)
  if (dom) {
    okBtnEls.set(key, dom)
  } else {
    okBtnEls.delete(key)
  }
}
function setCancelBtnEl(key: string, el: unknown): void {
  const dom = resolveEl(el)
  if (dom) {
    cancelBtnEls.set(key, dom)
  } else {
    cancelBtnEls.delete(key)
  }
}
// 各实例弹窗容器的 DOM，用于焦点锁定时圈定可聚焦范围
const containerEls = new Map<string, HTMLElement>()
function setContainerEl(key: string, el: unknown): void {
  const dom = resolveEl(el)
  if (dom) {
    containerEls.set(key, dom)
  } else {
    containerEls.delete(key)
  }
}
const mousePosition = ref<{ x: number; y: number } | null>(null) // 鼠标点击位置（鼠标位置本身是全局事实，可共享）
const showModalWrap = ref<boolean>(false)
const { colorPalettes } = useInject('Modal') // 主题色注入
const { isSupported: captureSupported } = useOptionsSupported('capture')
const emits = defineEmits(['update:open', 'cancel', 'ok', 'know', 'change', 'ready'])
// 声明式用法下传入的插槽，仅用于为 modalRender 等能力提供兜底
// #modalRender 具名插槽在模板中没有对应的 <slot> 渲染位：内容经脚本读取后作为渲染
// 回调注入 ModalRenderHost，故需在此显式声明，避免 Volar 按模板插槽精确推断时报缺失
interface ModalSlots {
  modalRender?: (arg: { originVNode: VNode }) => VNode[]
}
const slots = useSlots() as unknown as ModalSlots
// 弹窗实例栈：每次命令式调用入栈一个实例，关闭时仅弹出自身
const modalList = ref<ModalItem[]>([])
let seed = 0
function createKey(): string {
  seed += 1
  return `modal_${Date.now()}_${seed}`
}
// 栈顶实例：遮罩样式、是否居中、遮罩关闭等共享表现以栈顶为准
const topItem = computed<ModalItem | undefined>(() => modalList.value[modalList.value.length - 1])
// 栈中处于打开状态的实例数，用于滚动锁的引用计数
const openCount = computed(() => modalList.value.filter((item) => item.open).length)
// 本组件持有的滚动锁释放函数：加锁后保存返回值、释放后置空，存在即代表本组件持锁；
// 多实例共用一个持锁配额，卸载兜底据此精确释放，避免未持锁时误解锁他人
let scrollLockRelease: (() => void) | null = null
function findItem(key: string): ModalItem | undefined {
  return modalList.value.find((item) => item.key === key)
}
// 取某项配置的最终生效值：per-item 优先级高于组件 Props
function getComputedValue<K extends keyof Props>(item: ModalItem | undefined, key: K): Props[K] {
  if (item && item[key as keyof ModalOptions] !== undefined) {
    return item[key as keyof ModalOptions] as unknown as Props[K]
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
// 单个实例的层级：遮罩取 zIndex，弹窗取 zIndex + 10，保持两者的层叠关系
function itemZIndex(item: ModalItem): number {
  return getComputedValue(item, 'zIndex') ?? props.zIndex
}
function itemStyle(item: ModalItem): CSSProperties {
  const width = getComputedValue(item, 'width')
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    transformOrigin: item.origin,
    zIndex: itemZIndex(item) + 10
  }
  if (!getComputedValue(item, 'centered')) {
    const top = getComputedValue(item, 'top')
    style.top = typeof top === 'number' ? `${top}px` : top
  }
  return style
}
function itemIconClass(item: ModalItem): string {
  return `icon-${item.mode}`
}
// 内置双按钮组形态：仅 confirm / erase 具备；notice 为单按钮形态，custom 无内置按钮组，二者均不参与
function isConfirmMode(item: ModalItem): boolean {
  return ['confirm', 'erase'].includes(item.mode)
}
// 取消按钮：仅在双按钮组形态下由 showCancel 控制，默认显示；其余形态该配置不生效，避免与单按钮 / 自定义底部冲突
function showCancelBtn(item: ModalItem): boolean {
  return isConfirmMode(item) && item.showCancel !== false
}
function isNoticeMode(item: ModalItem): boolean {
  return ['info', 'success', 'error', 'warning'].includes(item.mode)
}
// 底部区域：传函数时完全自定义，false 时整块隐藏
function isFooterFn(item: ModalItem): boolean {
  return typeof getComputedValue(item, 'footer') === 'function'
}
function footerNode(item: ModalItem): VNode {
  const footer = getComputedValue(item, 'footer')
  return typeof footer === 'function' ? footer() : createTextVNode('')
}
// 底部容器：仅在存在内置按钮组或自定义底部节点时渲染；
// 否则仅因 footer 默认为 true 就会渲染出一个无内容的空壳（custom 形态与 update 切形态均会命中）
function showFooter(item: ModalItem): boolean {
  if (isFooterFn(item)) {
    return true
  }
  return getComputedValue(item, 'footer') !== false && (isConfirmMode(item) || isNoticeMode(item))
}
// 关闭图标：未配置时返回 null，由模板渲染默认图标
function closeIconNode(item: ModalItem): VNode | null {
  const icon = getComputedValue(item, 'closeIcon')
  if (icon === undefined || icon === null) {
    return null
  }
  return renderContent(icon as ContentType)
}
// 内容区高度：height 为 'auto' 时不约束，由内容自然撑开
function contentHeightStyle(item: ModalItem): CSSProperties {
  const height = getComputedValue(item, 'height')
  if (height === undefined || height === 'auto') {
    return {}
  }
  return { height: typeof height === 'number' ? `${height}px` : height }
}
// 标题元素 id，供 aria-labelledby 关联（无标题时不设置该属性）
function titleId(item: ModalItem): string {
  return `modal-title-${item.key}`
}
// 内容渲染判定：renderBeforeOpen 为 true 时常驻；destroyOnClose 为 false 时内容常驻（DOM 保留）
// 为 true 时保留至离场动画结束后再销毁
function shouldRenderBody(item: ModalItem): boolean {
  if (getComputedValue(item, 'renderBeforeOpen')) {
    return true
  }
  return !getComputedValue(item, 'destroyOnClose') || item.open || item.displayed
}
// modalRender 的 prop 与 #modalRender 插槽双通道：两者签名一致，prop 优先，未配置时回退插槽
// 包装函数引用稳定，插槽留到调用时再读取，避免每次渲染都生成新函数触发多余更新
// 插槽缺省（如命令式实例）或返回空时回退原始 VNode，保证 h 的 children 始终为有效节点
const slotModalRender = (arg: { originVNode: VNode }): VNode =>
  h(Fragment, null, slots.modalRender?.(arg) ?? [arg.originVNode])
function resolveModalRender(item: ModalItem): Props['modalRender'] {
  const render = getComputedValue(item, 'modalRender')
  if (render) {
    return render
  }
  return slots.modalRender ? slotModalRender : undefined
}
// 从离场/入场元素上取回实例标识
function getKey(el: Element): string {
  return (el as HTMLElement).dataset.key ?? ''
}
// 只要栈中存在「打开且要求锁滚动」的实例就持锁：先开的锁、后开的不锁（或反之）时按当前栈重算，
// 避免首个实例的 blockScroll 一直决定锁状态。lockScroll 内部为引用计数，重复加锁 / 释放均安全
const needScrollLock = computed(() =>
  modalList.value.some((item) => item.open && getComputedValue(item, 'blockScroll'))
)
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
// 弹窗数量在「0 ↔ 非 0」之间变化时记录 / 归还触发元素焦点
watch(openCount, (to, from) => {
  if (to > 0) {
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
onMounted(() => {
  document.addEventListener('click', getClickPosition, captureSupported.value ? { capture: true } : true) // 事件在捕获阶段执行
  // Tab 焦点锁定同样走捕获阶段，避免被弹窗内部元素的 stopPropagation 阻断
  document.addEventListener('keydown', onKeydownTab, captureSupported.value ? { capture: true } : true)
})
onUnmounted(() => {
  document.removeEventListener('click', getClickPosition, captureSupported.value ? { capture: true } : true)
  document.removeEventListener('keydown', onKeydownTab, captureSupported.value ? { capture: true } : true)
  // 卸载兜底：本组件仍持锁时释放，否则滚动锁随组件销毁而残留，页面滚动永久锁死；
  // 以 scrollLockRelease 而非 openCount 判定，避免 blockScroll=false 从未加锁却误解锁他人
  scrollLockRelease?.()
})
function getClickPosition(e: MouseEvent) {
  if (openCount.value === 0) {
    mousePosition.value = {
      x: e.clientX, // 相对于浏览器视口左上角的 X 坐标，不页面滚动而改变
      y: e.clientY // 相对于浏览器视口左上角的 Y 坐标，不页面滚动而改变
    }
  }
}
// 动画原点按实例持有，避免后开弹窗改写先开弹窗的动画原点
async function onBeforeEnter(el: Element) {
  showModalWrap.value = true
  await nextTick()
  const item = findItem(getKey(el))
  if (!item) {
    return
  }
  const transOrigin = getComputedValue(item, 'transformOrigin')
  if (transOrigin === 'mouse' && mousePosition.value) {
    const rect = el.getBoundingClientRect()
    item.origin = `${mousePosition.value.x - rect.left}px ${mousePosition.value.y - rect.top}px`
  } else {
    item.origin = '50% 50%'
  }
}
// 入场动画结束后按 autoFocusButton 聚焦；目标按钮不存在时回落到容器，保证 Esc 键可用
function onAfterEnter(el: Element): void {
  const item = findItem(getKey(el))
  if (!item) {
    return
  }
  const target = getComputedValue(item, 'autoFocusButton')
  if (target === null || target === undefined) {
    return
  }
  const btnEl = target === 'cancel' ? cancelBtnEls.get(item.key) : okBtnEls.get(item.key)
  if (btnEl) {
    btnEl.focus({ preventScroll: true })
    return
  }
  modalWrapRef.value?.focus({ preventScroll: true })
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
// 焦点锁定：Tab / Shift + Tab 在栈顶弹窗内循环，避免键盘焦点跑到背景页面
function onKeydownTab(e: KeyboardEvent): void {
  if (e.key !== 'Tab') {
    return
  }
  if (openCount.value === 0) {
    return
  }
  const item = topItem.value
  if (!item || !getComputedValue(item, 'trapFocus')) {
    return
  }
  const container = containerEls.get(item.key)
  if (!container) {
    return
  }
  const focusable = getFocusableEls(container)
  if (focusable.length === 0) {
    e.preventDefault()
    // 无可聚焦元素时退回外层容器，焦点不至于跑回背景页面
    modalWrapRef.value?.focus({ preventScroll: true })
    return
  }
  e.preventDefault()
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
function onAfterLeave(el: Element): void {
  const item = findItem(getKey(el))
  if (item) {
    // 离场结束后才允许销毁内容，避免关闭瞬间内容闪空
    item.displayed = false
    getComputedValue(item, 'afterClose')?.()
    if (getComputedValue(item, 'destroyOnClose')) {
      removeItem(item.key)
    }
  }
  // 栈中仍有打开实例时保持显示，否则其余弹窗会被一起隐藏
  if (openCount.value === 0) {
    showModalWrap.value = false
  }
}
function push(modal: ModalOptions, mode: Mode): ModalReactive {
  const key = createKey()
  modalList.value.push({
    ...modal,
    key,
    mode,
    open: true,
    // loading 在实例创建时初始化，不再随 props 持续同步，避免覆盖 per-instance loading
    loading: props.confirmLoading,
    origin: '50% 50%',
    displayed: true,
    // 命令式弹窗默认销毁（一次性调用），避免关闭后实例无限累积；需要保留内容时可显式传 destroyOnClose: false
    destroyOnClose: modal.destroyOnClose ?? true,
    // 命令式弹窗默认不显示关闭按钮，需要时可显式传 closable: true；
    // 该默认值固化到实例，与 destroyOnClose 一致，ModalProvider 上的 :closable 不会覆盖命令式
    closable: modal.closable ?? false,
    // 命令式弹窗默认不响应遮罩点击（与 antdv Modal.confirm 一致，避免误触关闭）；
    // 同样固化到实例，需要时显式传 maskClosable: true
    maskClosable: modal.maskClosable ?? false
  })
  // 创建即打开同样视为一次打开状态变化，保证 change 可完整追踪弹窗开关生命周期
  emits('change', true, key)
  return {
    key,
    destroy: () => closeItem(key),
    update: (options: ModalUpdate) => updateItem(key, options),
    show: () => openItem(key)
  }
}
function info(data: ModalOptions): ModalReactive {
  return push(data, 'info')
}
function success(data: ModalOptions): ModalReactive {
  return push(data, 'success')
}
function error(data: ModalOptions): ModalReactive {
  return push(data, 'error')
}
function warning(data: ModalOptions): ModalReactive {
  return push(data, 'warning')
}
function confirm(data: ModalOptions): ModalReactive {
  return push(data, 'confirm')
}
function erase(data: ModalOptions): ModalReactive {
  return push(data, 'erase')
}
// 完全自定义弹窗：不渲染内置图标与按钮组，内容、图标、底部均由调用方自行组合
function create(data: ModalOptions): ModalReactive {
  return push(data, 'custom')
}
function updateItem(key: string, options: ModalUpdate): void {
  const item = findItem(key)
  if (!item) {
    return
  }
  Object.assign(item, options)
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
  const index = modalList.value.findIndex((item) => item.key === key)
  if (index === -1) {
    return
  }
  modalList.value.splice(index, 1)
  // 同步清理按钮与容器 DOM 缓存，避免实例销毁后仍被引用
  okBtnEls.delete(key)
  cancelBtnEls.delete(key)
  containerEls.delete(key)
}
// 关闭所有弹窗：逐实例走正常关闭流程以保留离场动画，离场结束后统一从栈中移除
function destroyAll(): void {
  modalList.value.forEach((item) => {
    if (!item.open) {
      return
    }
    // 统一置为销毁，避免 destroyOnClose: false 的实例关闭后仍滞留栈中
    item.destroyOnClose = true
    closeItem(item.key)
  })
}
// 声明式实例：由 props.open 驱动，具体配置经 getComputedValue 回落到组件 Props
// 不设 destroyOnClose 与 closable：回落组件 Props 默认 false / false（保留内容 DOM、默认不显示关闭按钮）
function pushDeclarative(open: boolean): void {
  modalList.value.push({
    key: DECLARATIVE_KEY,
    mode: DECLARATIVE_MODE,
    open,
    loading: props.confirmLoading,
    origin: '50% 50%',
    displayed: true
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
  // 声明式实例打开同样触发 change（含 watch immediate 首次打开）
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
watch(
  () => props.renderBeforeOpen,
  (to) => {
    if (to && !findItem(DECLARATIVE_KEY)) {
      pushDeclarative(false)
    }
  },
  { immediate: true }
)
// 遮罩点击：先派发 onMaskClick（无论是否允许关闭），再按 maskClosable 决定是否关闭栈顶实例
function handleMaskClick(e: MouseEvent): void {
  const item = topItem.value
  if (!item) {
    return
  }
  getComputedValue(item, 'onMaskClick')?.(e)
  if (getComputedValue(item, 'maskClosable')) {
    onCancel(item.key, e)
  }
}
function onKeydownEsc(e: KeyboardEvent): void {
  const item = topItem.value
  if (!item) {
    return
  }
  getComputedValue(item, 'onEsc')?.(e)
  if (getComputedValue(item, 'keyboard')) {
    onCancel(item.key, e)
  }
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
    console.error('[Modal] onCancel error:', err) // 避免 unhandled rejection 导致取消流程静默中断
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
  item.loading = true
  try {
    const result = await item.onOk?.()
    if (result === false) {
      return
    }
  } catch (err) {
    console.error('[Modal] onOk error:', err) // 避免 unhandled rejection 导致 loading 卡死
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
async function onKnow(key: string, e?: MouseEvent): Promise<void> {
  const item = findItem(key)
  if (!item) {
    return
  }
  item.loading = true
  try {
    const result = await item.onKnow?.()
    if (result === false) {
      return
    }
  } catch (err) {
    console.error('[Modal] onKnow error:', err)
    return
  } finally {
    item.loading = false
  }
  if (findItem(key)) {
    closeItem(key)
  }
  emits('know', e)
}
// 外层容器的层级取栈中打开实例的最大 zIndex：先开的实例可能配置了更高的 zIndex，
// 取最大值可保证整个弹窗层浮于页面之上，实例之间的先后关系由各自的 zIndex 决定
const baseZIndex = computed(() => {
  const opened = modalList.value.filter((item) => item.open)
  if (opened.length === 0) {
    return getComputedValue(topItem.value, 'zIndex') ?? props.zIndex
  }
  return Math.max(...opened.map((item) => itemZIndex(item)))
})
// 向 <ModalProvider> 回传 api，使其无需依赖模板 ref 即可对外提供
emits('ready', { info, success, error, warning, confirm, erase, create, destroyAll })
</script>
<template>
  <Teleport :to="to">
    <div
      v-show="showModalWrap"
      tabindex="-1"
      ref="modalWrapRef"
      class="modal-wrap"
      :class="getComputedValue(topItem, 'wrapClass')"
      :style="[
        getComputedValue(topItem, 'wrapStyle'),
        {
          zIndex: baseZIndex + 10,
          '--modal-primary-color': colorPalettes[5],
          '--modal-success-color': '#52c41a',
          '--modal-error-color': '#ff4d4f',
          '--modal-warning-color': '#faad14',
          '--modal-confirm-color': '#faad14',
          '--modal-erase-color': '#faad14'
        }
      ]"
      @keydown.esc="onKeydownEsc"
    >
      <template v-for="item in modalList" :key="item.key">
        <div class="modal-layer" @click.self="handleMaskClick">
          <Transition name="fade" appear>
            <div
              v-show="item.open && getComputedValue(item, 'mask')"
              class="modal-mask"
              aria-hidden="true"
              :class="getComputedValue(item, 'maskClass')"
              :style="[getComputedValue(item, 'maskStyle'), { zIndex: itemZIndex(item) }]"
              @click="handleMaskClick"
            ></div>
          </Transition>
          <Transition
            name="zoom"
            appear
            enter-from-class="zoom-enter"
            enter-active-class="zoom-enter"
            enter-to-class="zoom-enter zoom-enter-active"
            leave-from-class="zoom-leave"
            leave-active-class="zoom-leave zoom-leave-active"
            leave-to-class="zoom-leave zoom-leave-active"
            @before-enter="onBeforeEnter"
            @after-enter="onAfterEnter"
            @after-leave="onAfterLeave"
          >
            <div
              v-show="item.open"
              :ref="(el: unknown) => setContainerEl(item.key, el)"
              :data-key="item.key"
              class="modal-container"
              :class="[getComputedValue(item, 'containerClass'), { 'is-centered': getComputedValue(item, 'centered') }]"
              :style="[itemStyle(item), getComputedValue(item, 'containerStyle')]"
            >
              <ModalRenderHost v-if="shouldRenderBody(item)" :render="resolveModalRender(item)">
                <div
                  class="modal-body-wrap"
                  role="dialog"
                  aria-modal="true"
                  :aria-labelledby="getComputedValue(item, 'title') ? titleId(item) : undefined"
                  :class="getComputedValue(item, 'bodyClass')"
                  :style="getComputedValue(item, 'bodyStyle')"
                >
                  <span
                    v-if="getComputedValue(item, 'closable')"
                    class="close-action"
                    @click="onCancel(item.key, $event)"
                  >
                    <slot name="closeIcon">
                      <component v-if="closeIconNode(item)" :is="closeIconNode(item)" class="icon-svg" />
                      <svg
                        v-else
                        class="icon-svg"
                        focusable="false"
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
                  <div class="modal-body">
                    <div
                      class="modal-header"
                      :class="[itemIconClass(item), { 'header-with-close': getComputedValue(item, 'closable') }]"
                    >
                      <slot name="icon">
                        <component
                          v-if="getComputedValue(item, 'icon')"
                          :is="getComputedValue(item, 'icon')"
                          class="icon-svg"
                        />
                        <svg
                          v-else-if="isConfirmMode(item)"
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
                            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                          ></path>
                          <path
                            d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
                          ></path>
                        </svg>
                        <svg
                          v-else-if="item.mode === 'info'"
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
                          v-else-if="item.mode === 'success'"
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
                          v-else-if="item.mode === 'error'"
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
                          v-else-if="item.mode === 'warning'"
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
                      </slot>
                      <div
                        :id="titleId(item)"
                        class="modal-title"
                        :class="getComputedValue(item, 'titleClass')"
                        :style="getComputedValue(item, 'titleStyle')"
                      >
                        <slot name="title">
                          <component :is="renderContent(getComputedValue(item, 'title'))" />
                        </slot>
                      </div>
                    </div>
                    <Scrollbar
                      class="modal-content-scroll"
                      :style="contentHeightStyle(item)"
                      v-bind="getComputedValue(item, 'scrollbarProps')"
                    >
                      <div
                        class="modal-content"
                        :class="getComputedValue(item, 'contentClass')"
                        :style="getComputedValue(item, 'contentStyle')"
                      >
                        <slot>
                          <component :is="renderContent(getComputedValue(item, 'content'))" />
                        </slot>
                      </div>
                    </Scrollbar>
                  </div>
                  <div v-if="showFooter(item)" class="modal-btns">
                    <component v-if="isFooterFn(item)" :is="footerNode(item)" />
                    <slot v-else name="footer">
                      <template v-if="isConfirmMode(item)">
                        <Button
                          v-if="showCancelBtn(item)"
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
                          :loading="item.loading"
                          @click="onOK(item.key, $event)"
                          v-bind="getComputedValue(item, 'okProps')"
                        >
                          {{ getComputedValue(item, 'okText') }}
                        </Button>
                      </template>
                      <Button
                        v-if="isNoticeMode(item)"
                        :ref="(el: unknown) => setOkBtnEl(item.key, el)"
                        type="primary"
                        :loading="item.loading"
                        @click="onKnow(item.key, $event)"
                        v-bind="getComputedValue(item, 'noticeProps')"
                      >
                        {{ getComputedValue(item, 'noticeText') }}
                      </Button>
                    </slot>
                  </div>
                </div>
              </ModalRenderHost>
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
.modal-mask {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: auto; // 遮罩可见时接收点击（遮罩关闭 / 阻断背景交互）
}
.modal-wrap {
  position: fixed;
  inset: 0;
  overflow: hidden;
  outline: 0;
  pointer-events: none;
}
.modal-layer {
  position: fixed;
  inset: 0;
  overflow: auto;
  outline: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  .modal-container {
    position: relative;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    padding-bottom: 24px;
    outline: none;
    pointer-events: auto;
    &.is-centered {
      margin-top: auto;
      margin-bottom: auto;
      padding-bottom: 0;
    }
    .modal-body-wrap {
      position: relative;
      word-break: break-all;
      padding: 20px 24px;
      background-color: #fff;
      border-radius: 8px;
      width: auto;
      max-width: calc(100vw - 32px);
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .modal-body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .modal-header {
          display: flex;
          align-items: center;
          // 显示关闭按钮时为标题预留空间，避免被右上角按钮遮挡
          &.header-with-close {
            max-width: calc(100% - 24px);
          }
          :deep(svg) {
            flex-shrink: 0;
            align-self: flex-start;
            display: inline-block;
            margin-right: 12px;
            margin-top: 1px;
            font-size: 22px;
            fill: currentColor;
          }
          .modal-title {
            display: inline-block;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.88);
            line-height: 1.5;
            font-weight: 600;
          }
          :deep(svg) {
            fill: currentColor;
          }
        }
        .icon-info {
          color: var(--modal-primary-color);
        }
        .icon-success {
          color: var(--modal-success-color);
        }
        .icon-error {
          color: var(--modal-error-color);
        }
        .icon-warning {
          color: var(--modal-warning-color);
        }
        .icon-confirm {
          color: var(--modal-confirm-color);
        }
        .icon-erase {
          color: var(--modal-erase-color);
        }
        .modal-content-scroll {
          flex-basis: 100%;
          margin-top: 8px;
          margin-left: 34px;
          max-width: calc(100% - 34px);
        }
        .modal-content {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.88);
        }
      }
      .close-action {
        position: absolute;
        top: 20px;
        right: 18px;
        z-index: 1;
        width: 22px;
        height: 22px;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
        :deep(.icon-svg) {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.45);
          fill: currentColor;
          transition: color 0.2s;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.06);
          :deep(.icon-svg) {
            color: rgba(0, 0, 0, 0.88);
          }
        }
      }
      .modal-btns {
        margin-top: 12px;
        text-align: right;
        .mr8 {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
