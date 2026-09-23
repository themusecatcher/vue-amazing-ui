import { ref, toValue, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useSupported, useOptionsSupported, useEventListener } from './hooks'
import { throttle } from './function'
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
/**
 * 组合式函数：实时监测目标元素的滚动位置与方向状态
 *
 * 优先使用原生 `scrollend` 判定滚动结束，不支持该事件的浏览器以降级定时器兜底
 * （两条路径靠 `isScrolling` 保证幂等，不会重复回调）。
 *
 * @param target - 滚动目标（Ref / HTMLElement / Window / Document），默认整页（window）
 * @param throttleDelay - 滚动事件节流间隔（ms），默认 0（不做实际节流）
 * @param onScroll - 滚动中的回调，可选
 * @param onStop - 滚动结束的回调，可选
 * @returns 滚动位置、最大可滚距离、是否滚动中与四个方向标志
 */
export function useScroll(
  target?: Ref | HTMLElement | Window | Document,
  throttleDelay: number = 0,
  onScroll?: (e: Event) => void,
  onStop?: (e: Event) => void
): {
  x: Ref<number>
  xScrollMax: Ref<number>
  y: Ref<number>
  yScrollMax: Ref<number>
  isScrolling: Ref<boolean>
  left: Ref<boolean>
  right: Ref<boolean>
  top: Ref<boolean>
  bottom: Ref<boolean>
} {
  const x = ref(0) // 水平滚动距离
  const xScrollMax = ref(0) // 水平最大可滚动距离
  const y = ref(0) // 垂直滚动距离
  const yScrollMax = ref(0) // 垂直最大可滚动距离
  const isScrolling = ref(false) // 是否正在滚动
  const left = ref(false) // 是否向左滚动
  const right = ref(false) // 是否向右滚动
  const top = ref(false) // 是否向上滚动
  const bottom = ref(false) // 是否向下滚动
  const lastScrollLeft = ref(0) // 上一次水平滚动距离
  const lastScrollTop = ref(0) // 上一次垂直滚动距离
  let eventTarget: ScrollTarget | null = null // scroll 事件的实际监听目标
  let measureElement: HTMLElement | null = null // 滚动位置与最大滚动距离的读取元素
  let scrollEndTimer: ReturnType<typeof setTimeout> | null = null // 无原生 scrollend 时的滚动结束兜底定时器
  let lastScrollEvent: Event | null = null // 兜底定时器触发时用于回调的事件对象
  // 取消滚动结束兜底定时器
  function clearScrollEndTimer(): void {
    if (scrollEndTimer !== null) {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = null
    }
  }
  // 滚动结束事件：重置方向状态并回调；原生 scrollend 与兜底定时器可能都触发，靠 isScrolling 保证幂等
  function scrollEndEvent(e: Event) {
    clearScrollEndTimer()
    if (!isScrolling.value) {
      return
    }
    isScrolling.value = false
    left.value = false
    right.value = false
    top.value = false
    bottom.value = false
    onStop && onStop(e)
  }
  // 滚动事件
  function scrollEvent(e: Event) {
    isScrolling.value = true
    if (measureElement) {
      x.value = measureElement.scrollLeft
      y.value = measureElement.scrollTop
      left.value = x.value < lastScrollLeft.value
      right.value = x.value > lastScrollLeft.value
      top.value = y.value < lastScrollTop.value
      bottom.value = y.value > lastScrollTop.value
      lastScrollLeft.value = x.value
      lastScrollTop.value = y.value
    }
    // 兜底：不支持原生 scrollend 的浏览器靠该定时器判定滚动结束，每次滚动都重置计时
    lastScrollEvent = e
    clearScrollEndTimer()
    scrollEndTimer = setTimeout(() => {
      scrollEndTimer = null
      if (lastScrollEvent) scrollEndEvent(lastScrollEvent)
    }, throttleDelay + 200)
    onScroll && onScroll(e)
  }
  // 使用节流函数限制滚动事件触发频率；throttleDelay 为 0 时不做实际节流（每个宏任务放行一次）
  const throttleScroll = throttle(scrollEvent, throttleDelay)
  // 计算滚动目标元素：未传 target 时默认监听整页滚动；SSR（Node）无 window，返回 null
  const scrollTarget = computed<ScrollTarget | null>(() => {
    const targetValue = toValue(target) as ScrollTarget | null
    if (targetValue) {
      return targetValue
    }
    return typeof window !== 'undefined' ? window : null
  })
  // 清理函数：移除事件监听、取消兜底定时器并复位内部引用
  function cleanup(): void {
    eventTarget?.removeEventListener('scroll', throttleScroll as EventListener)
    eventTarget?.removeEventListener('scrollend', scrollEndEvent as EventListener)
    eventTarget = null
    measureElement = null
    clearScrollEndTimer()
  }
  // 监听滚动目标元素的变化：切换目标时先清理旧监听，再按新目标重建
  watch(
    () => scrollTarget.value,
    (to) => {
      cleanup()
      if (!to) return
      eventTarget = resolveScrollEventTarget(to)
      measureElement = resolveScrollMeasureElement(to)
      if (measureElement) {
        xScrollMax.value = measureElement.scrollWidth - measureElement.clientWidth
        yScrollMax.value = measureElement.scrollHeight - measureElement.clientHeight
      }
      eventTarget?.addEventListener('scroll', throttleScroll as EventListener)
      // 原生 scrollend 直接回调；不支持该事件的浏览器由 scrollEvent 中的兜底定时器接管
      eventTarget?.addEventListener('scrollend', scrollEndEvent as EventListener)
    },
    {
      immediate: true,
      flush: 'post'
    }
  )
  // 在组件卸载前调用清理函数，避免监听与兜底定时器残留
  onBeforeUnmount(cleanup)
  // 返回滚动位置和各种状态信息
  return { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom }
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
