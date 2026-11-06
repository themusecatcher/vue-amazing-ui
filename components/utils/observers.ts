import { ref, toValue, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { useSupported, useOptionsSupported, useEventListener } from './hooks'
import { getScrollParent } from './dom'

/**
 * 基于观察者（Observer）的组合式函数集合
 *
 * 统一处理三类观察目标：DOM 变更（MutationObserver）、尺寸变化（ResizeObserver）、滚动位置
 * （scroll 事件）；观察目标均支持 Ref / 元素 / 数组，且随组件卸载自动清理。
 */

/**
 * 归一化观察目标为 HTMLElement 数组
 *
 * 兼容 Ref / Ref[] / HTMLElement / HTMLElement[] 四种入参：先解包 Ref，再过滤空值，
 * 保证后续 observe 调用拿到的都是可用元素。
 *
 * @param target - 观察目标
 * @returns 解包并过滤后的元素数组
 */
function resolveTargetElements(target: Ref | Ref[] | HTMLElement | HTMLElement[]): HTMLElement[] {
  const targetValue = toValue(target) as Ref | Ref[] | HTMLElement | HTMLElement[] | null | undefined
  if (!targetValue) return []
  const list = Array.isArray(targetValue) ? targetValue : [targetValue]
  return list
    .map((item) => toValue(item) as HTMLElement | null | undefined)
    .filter((element): element is HTMLElement => Boolean(element))
}
/**
 * 组合式函数：用 MutationObserver 观察 DOM 变化
 *
 * 支持 Ref / 元素 / 元素数组作为目标；目标变化时自动重建观察，组件卸载时自动断开（避免内存泄漏）。
 * SSR（Node）下自动跳过。
 *
 * @param target - 观察目标（单个或数组，元素可为 Ref）
 * @param callback - 观察到变化时的回调
 * @param options - MutationObserver 观察选项，如 `{ subtree, childList, attributes, attributeFilter }`，默认 `{}`
 * @returns `start` / `stop` 用于手动开始与停止观察
 */
export function useMutationObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: object = {}
): { start: () => void; stop: () => void } {
  // 用 typeof 判断而非裸 window：SSR（Node）下裸引用会直接抛 ReferenceError
  const isSupported = useSupported(() => typeof window !== 'undefined' && 'MutationObserver' in window)
  const stopObservation = ref(false)
  let observer: MutationObserver | undefined
  const targets = computed(() => resolveTargetElements(target))
  // 定义清理函数，用于断开 MutationObserver 的连接
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }
  // 初始化 MutationObserver，开始观察目标元素
  const observeElements = () => {
    if (isSupported.value && targets.value.length && !stopObservation.value) {
      observer = new MutationObserver(callback)
      targets.value.forEach((element: HTMLElement) => observer!.observe(element, options))
    }
  }
  // 监听 targets 的变化，当 targets 变化时，重新建立 MutationObserver 观察
  watch(
    () => targets.value,
    () => {
      cleanup()
      observeElements()
    },
    {
      immediate: true, // 立即触发回调，以便初始状态也被观察
      flush: 'post'
    }
  )
  const start = () => {
    stopObservation.value = false
    observeElements()
  }
  const stop = () => {
    stopObservation.value = true
    cleanup()
  }
  // 在组件卸载前清理 MutationObserver
  onBeforeUnmount(() => cleanup())
  return {
    start,
    stop
  }
}
/**
 * 组合式函数：用 ResizeObserver 观察元素尺寸变化
 *
 * 支持 Ref / 元素 / 元素数组作为目标；目标变化时自动重建观察，组件卸载时自动断开（避免内存泄漏）。
 * SSR（Node）下自动跳过。
 *
 * @param target - 观察目标（单个或数组，元素可为 Ref）
 * @param callback - 尺寸变化时的回调
 * @param options - ResizeObserver 选项，默认 `{}`
 * @returns `start` / `stop` 用于手动开始与停止观察
 */
export function useResizeObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: ResizeObserverCallback,
  options: object = {}
): { start: () => void; stop: () => void } {
  // 用 typeof 判断而非裸 window：SSR（Node）下裸引用会直接抛 ReferenceError
  const isSupported = useSupported(() => typeof window !== 'undefined' && 'ResizeObserver' in window)
  let observer: ResizeObserver | undefined
  const stopObservation = ref(false)
  const targets = computed(() => resolveTargetElements(target))
  // 定义清理函数，用于断开 ResizeObserver 的连接
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }
  // 初始化 ResizeObserver，开始观察目标元素
  const observeElements = () => {
    if (isSupported.value && targets.value.length && !stopObservation.value) {
      observer = new ResizeObserver(callback)
      targets.value.forEach((element: HTMLElement) => observer!.observe(element, options))
    }
  }
  // 监听 targets 的变化，当 targets 变化时，重新建立 ResizeObserver 观察
  watch(
    () => targets.value,
    () => {
      cleanup()
      observeElements()
    },
    {
      immediate: true, // 立即触发回调，以便初始状态也被观察
      flush: 'post'
    }
  )
  const start = () => {
    stopObservation.value = false
    observeElements()
  }
  const stop = () => {
    stopObservation.value = true
    cleanup()
  }
  // 在组件卸载前清理 ResizeObserver
  onBeforeUnmount(() => cleanup())
  return {
    start,
    stop
  }
}
type ScrollTarget = HTMLElement | Window | Document

/** 类型守卫：是否为 window（视口级滚动目标） */
function isWindowTarget(value: unknown): value is Window {
  return typeof window !== 'undefined' && value === window
}
/** 类型守卫：是否为 document */
function isDocumentTarget(value: unknown): value is Document {
  return typeof Document !== 'undefined' && value instanceof Document
}
/**
 * 解析 scroll 事件的实际监听目标
 *
 * 视口（页面级）滚动时，scroll 事件派发在 window / document 上，documentElement 收不到
 * （元素级 scroll 不冒泡，视口滚动的事件目标为 Document / Window）。
 * 故传入 documentElement 时需改听 window，否则监听恒不触发。
 *
 * @param target - 期望的滚动目标
 * @returns 实际应绑定 scroll 监听的目标
 */
function resolveScrollEventTarget(target: ScrollTarget | null): ScrollTarget | null {
  if (!target) return null
  if (typeof document !== 'undefined' && target === document.documentElement) return window
  return target
}
/**
 * 解析滚动尺寸（scrollWidth / scrollHeight 等）的测量元素
 *
 * window / document 自身没有内容尺寸属性，需回退到 documentElement 读取。
 *
 * @param target - 期望的滚动目标
 * @returns 用于读取尺寸与滚动位置的元素
 */
function resolveScrollMeasureElement(target: ScrollTarget | null): HTMLElement | null {
  if (!target) return null
  if (isWindowTarget(target)) return target.document.documentElement
  if (isDocumentTarget(target)) return target.documentElement
  return target
}
/** 滚动方向：内容位移方向（`scrollTop` 增大为 `bottom`，与 Scrollbar 的 thumb 移动方向同口径） */
type ScrollDirection = 'left' | 'right' | 'top' | 'bottom'
/** `useScroll` 的配置项 */
export interface UseScrollOptions {
  /** 滚动结束判定的静默时长（ms），作为原生 `scrollend` 的兜底；先到者生效 */
  scrollEndDelay?: number
  /** 滚动中的回调；状态（位置 / 上限 / 边界 / 方向）在回调前已同步，不做节流 */
  onScroll?: (e: Event) => void
  /** 滚动结束的回调；原生 `scrollend` 与静默期定时器互斥，只触发一次 */
  onStop?: (e: Event) => void
}
/** `useScroll` 的返回值 */
export interface UseScrollReturn {
  /** 水平滚动距离（`scrollLeft`） */
  x: Ref<number>
  /** 垂直滚动距离（`scrollTop`） */
  y: Ref<number>
  /** 水平最大可滚动距离（`scrollWidth - clientWidth`，下限 0） */
  maxX: Ref<number>
  /** 垂直最大可滚动距离（`scrollHeight - clientHeight`，下限 0） */
  maxY: Ref<number>
  /** 是否正在滚动（首个 `scroll` 起为 true，滚动结束后复位） */
  isScrolling: Ref<boolean>
  /** 滚动方向，滚动结束置 `null` */
  direction: Ref<ScrollDirection | null>
  /** 横向是否已无可滚动余量（左 / 右两侧共用 `maxX` 判定） */
  atLeft: Ref<boolean>
  atRight: Ref<boolean>
  /** 纵向是否已无可滚动余量（上 / 下两侧共用 `maxY` 判定） */
  atTop: Ref<boolean>
  atBottom: Ref<boolean>
  /** 重新测量位置与最大可滚动距离（内容尺寸变化且未产生滚动时调用） */
  refresh: () => void
  /** 恢复监听（`stop` 之后重新绑定当前目标） */
  start: () => void
  /** 停止监听并结束「滚动中」状态（保留当前读数） */
  stop: () => void
}
/** 边界判定容差（px）：内容尺寸按整数取整、滚动位置可能是小数，1px 内视为到底 */
const SCROLL_EDGE_TOLERANCE = 1
/**
 * 组合式函数：实时监测滚动位置、方向与边界状态
 *
 * 三条设计口径：
 *
 * - **状态与回调分工**：每次 `scroll` 都同步写状态 —— 浏览器本身已按帧合并 scroll 事件，
 *   再叠加时间节流只会丢掉末次位置；需要限制回调频率时由调用方在 `onScroll` 内自行处理；
 * - **方向即位移**：`direction` 由「本次位置 - 上次位置」判定，与滚动来源（滚轮 / 拖拽 / 程序化写入）
 *   无关；双轴同时位移取位移更大的一轴，滚动结束置 `null`；
 * - **滚动结束**：原生 `scrollend` 与 `scrollEndDelay` 静默期定时器双保险，先到者收尾；两条路径靠
 *   `isScrolling` 幂等，`onStop` 不会重复触发（无原生 `scrollend` 的浏览器由定时器接管）。
 *
 * @param target - 滚动目标（元素 / window / document / Ref / getter）；未传时默认整页（window），传入但未就位（如模板 ref 尚未挂载）时先不监听
 * @param options - 配置项
 * @returns 滚动位置、最大可滚动距离、方向与边界标志，以及 `refresh` / `start` / `stop`
 */
export function useScroll(
  target?: MaybeRefOrGetter<ScrollTarget | null | undefined>,
  options: UseScrollOptions = {}
): UseScrollReturn {
  const { scrollEndDelay = 200, onScroll, onStop } = options
  const x = ref(0) // 水平滚动距离
  const y = ref(0) // 垂直滚动距离
  const maxX = ref(0) // 水平最大可滚动距离
  const maxY = ref(0) // 垂直最大可滚动距离
  const isScrolling = ref(false) // 是否正在滚动
  const direction = ref<ScrollDirection | null>(null) // 本次滚动方向
  const atLeft = ref(true) // 横向是否已无余量（左）
  const atRight = ref(true) // 横向是否已无余量（右）
  const atTop = ref(true) // 纵向是否已无余量（上）
  const atBottom = ref(true) // 纵向是否已无余量（下）
  let eventTarget: ScrollTarget | null = null // scroll 事件的实际监听目标
  let measureElement: HTMLElement | null = null // 位置与尺寸的读取元素（视口滚动时为 documentElement）
  let endTimer: ReturnType<typeof setTimeout> | null = null // 无原生 scrollend 时的静默期定时器
  let lastEvent: Event | null = null // 兜底定时器触发时用于回调的事件对象
  let lastX = 0 // 上一次水平滚动距离（方向判定基准）
  let lastY = 0 // 上一次垂直滚动距离（方向判定基准）
  let listening = true // 监听开关（start / stop）
  // 滚动目标：只有「未传」才默认整页滚动。显式传了目标但当前为空（模板 ref 尚未挂载）时保持 null ——
  // 否则目标长期不出现（如 v-if 分支未渲染）时会一直跟踪整页，位置与边界标志都是错的；
  // SSR（Node）无 window，同样返回 null
  const scrollTarget = computed<ScrollTarget | null>(() => {
    if (target !== undefined) return toValue(target) ?? null
    return typeof window !== 'undefined' ? window : null
  })
  // 取消静默期定时器
  function clearEndTimer(): void {
    if (endTimer !== null) {
      clearTimeout(endTimer)
      endTimer = null
    }
  }
  // 按当前位置刷新四个边界标志
  function syncEdges(): void {
    atLeft.value = x.value <= SCROLL_EDGE_TOLERANCE
    atRight.value = maxX.value - x.value <= SCROLL_EDGE_TOLERANCE
    atTop.value = y.value <= SCROLL_EDGE_TOLERANCE
    atBottom.value = maxY.value - y.value <= SCROLL_EDGE_TOLERANCE
  }
  // 重新测量位置与上限；读到位置即作为方向判定基准，切换目标后首个事件不会误判方向
  function measure(): void {
    const element = measureElement
    if (!element) return
    x.value = element.scrollLeft
    y.value = element.scrollTop
    lastX = x.value
    lastY = y.value
    maxX.value = Math.max(element.scrollWidth - element.clientWidth, 0)
    maxY.value = Math.max(element.scrollHeight - element.clientHeight, 0)
    syncEdges()
  }
  // 读数复位：无可用目标时所有数值归零、边界标志全部为「无余量」
  function resetReading(): void {
    x.value = 0
    y.value = 0
    lastX = 0
    lastY = 0
    maxX.value = 0
    maxY.value = 0
    syncEdges()
  }
  // 滚动结束：原生 scrollend 与静默期定时器可能都触发，靠 isScrolling 保证只回调一次
  function finishScroll(e: Event): void {
    clearEndTimer()
    lastEvent = null
    if (!isScrolling.value) return
    isScrolling.value = false
    direction.value = null
    if (onStop) onStop(e)
  }
  // 滚动事件：先同步状态、后回调；状态不受节流影响
  function handleScroll(e: Event): void {
    const element = measureElement
    if (!element) return
    const nextX = element.scrollLeft
    const nextY = element.scrollTop
    const deltaX = nextX - lastX
    const deltaY = nextY - lastY
    x.value = nextX
    y.value = nextY
    lastX = nextX
    lastY = nextY
    // 内容可能在滚动间隙被撑开 / 收起（懒加载、异步子节点），顺带刷新上限，边界标志才不会停在旧值
    maxX.value = Math.max(element.scrollWidth - element.clientWidth, 0)
    maxY.value = Math.max(element.scrollHeight - element.clientHeight, 0)
    syncEdges()
    // 方向取本次位移；双轴同时位移取位移更大的一轴，位移为 0（写回同一位置）时保留上一个方向
    if (deltaX !== 0 || deltaY !== 0) {
      if (Math.abs(deltaY) < Math.abs(deltaX)) {
        direction.value = deltaX > 0 ? 'right' : 'left'
      } else {
        direction.value = deltaY > 0 ? 'bottom' : 'top'
      }
    }
    isScrolling.value = true
    lastEvent = e
    // 静默期计时与原生 scrollend 双保险：先到者收尾并清掉另一方（无原生 scrollend 的浏览器靠它判定）
    clearEndTimer()
    endTimer = setTimeout(() => {
      endTimer = null
      if (lastEvent) finishScroll(lastEvent)
    }, scrollEndDelay)
    if (onScroll) onScroll(e)
  }
  // 解绑监听并结束「滚动中」状态（位置与上限保留，由后续 measure 覆盖）
  function unbind(): void {
    if (eventTarget) {
      eventTarget.removeEventListener('scroll', handleScroll as EventListener)
      eventTarget.removeEventListener('scrollend', finishScroll as EventListener)
    }
    eventTarget = null
    measureElement = null
    lastEvent = null
    clearEndTimer()
    isScrolling.value = false
    direction.value = null
  }
  // 绑定监听：事件目标与测量元素分开解析（视口滚动的两者分别是 window 与 documentElement）
  function bind(elementTarget: ScrollTarget | null): void {
    unbind()
    if (!elementTarget) {
      resetReading()
      return
    }
    eventTarget = resolveScrollEventTarget(elementTarget)
    measureElement = resolveScrollMeasureElement(elementTarget)
    measure()
    // 不 preventDefault，声明 passive 让浏览器不必等待回调即可继续滚动
    eventTarget?.addEventListener('scroll', handleScroll as EventListener, { passive: true })
    eventTarget?.addEventListener('scrollend', finishScroll as EventListener)
  }
  /** 重新测量位置与最大可滚动距离（内容尺寸变化且未产生滚动时调用） */
  function refresh(): void {
    measure()
  }
  /** 恢复监听 */
  function start(): void {
    if (listening && eventTarget) return
    listening = true
    bind(scrollTarget.value)
  }
  /** 停止监听 */
  function stop(): void {
    listening = false
    unbind()
  }
  // 目标变化（含挂载后 ref 就位）时重建监听；stop 期间不绑定
  watch(
    scrollTarget,
    (to) => {
      if (!listening) return
      bind(to)
    },
    { immediate: true, flush: 'post' }
  )
  // 卸载前解绑监听并取消静默期定时器
  onBeforeUnmount(() => {
    listening = false
    unbind()
  })
  return { x, y, maxX, maxY, isScrolling, direction, atLeft, atRight, atTop, atBottom, refresh, start, stop }
}
/** `useScrollParent` 的选项 */
export interface ScrollParentOptions {
  /** 是否以 passive 方式监听 scroll；默认跟随浏览器的支持情况 */
  passive?: boolean
  /** 附加清理：组件自身需要在 cleanup 时执行的逻辑（如 Tooltip 取消位置更新帧） */
  onCleanup?: () => void
}

/**
 * 组合式函数：监听最近的可滚动父元素，并维护滚动位置与视口尺寸
 *
 * 与定位算法解耦，任何需要滚动感知的组件均可复用：滚动父元素查找（`getScrollParent`）、
 * 滚动监听（`observeScroll`）、清理（`cleanup`）在此收敛。整页滚动（无滚动祖先，`scrollTarget`
 * 为 documentElement）时自动改听 window 的 scroll —— 该场景下事件派发在 window 上，documentElement 收不到。
 *
 * @param contentRef - 触发内容元素，用于向上查找可滚动父元素
 * @param onScroll - 滚动 / resize 触发的回调（组件侧传入 updatePosition）
 * @param options - 配置项
 * @returns 滚动目标、视口尺寸与生命周期方法
 */
export function useScrollParent(
  contentRef: Ref<HTMLElement | null>,
  onScroll: () => void,
  options: ScrollParentOptions = {}
): {
  scrollTarget: Ref<HTMLElement | null>
  viewportWidth: Ref<number>
  viewportHeight: Ref<number>
  observeScroll: () => void
  cleanup: () => void
} {
  const scrollTarget = ref<HTMLElement | null>(null) // 最近的可滚动父元素
  let scrollEventTarget: ScrollTarget | null = null // 实际承载 scroll 事件的监听目标
  // SSR（Node）环境无 document，取 0；浏览器端初始值与原来一致
  const viewportWidth = ref(typeof document !== 'undefined' ? document.documentElement.clientWidth : 0)
  const viewportHeight = ref(typeof document !== 'undefined' ? document.documentElement.clientHeight : 0)
  const { isSupported: passiveSupported } = useOptionsSupported('passive')
  const usePassive = options.passive !== false && passiveSupported.value

  // 更新视口尺寸，重新查询滚动父元素并触发重排
  function getViewportSize() {
    viewportWidth.value = document.documentElement.clientWidth
    viewportHeight.value = document.documentElement.clientHeight
    observeScroll()
    onScroll()
  }

  // 查询并监听最近可滚动父元素
  function observeScroll() {
    cleanup()
    scrollTarget.value = getScrollParent(contentRef.value)
    scrollEventTarget = resolveScrollEventTarget(scrollTarget.value)
    scrollEventTarget?.addEventListener('scroll', onScroll, usePassive ? { passive: true } : undefined)
  }

  // 清理滚动监听并重置滚动目标（含组件注入的附加清理）
  function cleanup() {
    scrollEventTarget?.removeEventListener('scroll', onScroll)
    scrollEventTarget = null
    scrollTarget.value = null
    options.onCleanup?.()
  }

  // 实参 window 在 setup 期求值，SSR（Node）下必须先判断存在性再调用
  if (typeof window !== 'undefined') {
    useEventListener(window, 'resize', getViewportSize)
  }
  onMounted(observeScroll)
  onBeforeUnmount(cleanup)

  return { scrollTarget, viewportWidth, viewportHeight, observeScroll, cleanup }
}
