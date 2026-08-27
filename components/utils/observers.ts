import { ref, toValue, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useSupported, useOptionsSupported, useEventListener } from './hooks'
import { throttle, debounce } from './function'
import { getScrollParent } from './dom'
/**
 * 组合式函数
 * 使用 MutationObserver 观察 DOM 元素的变化
 *
 * 该函数提供了一个便捷的方式来订阅 DOM 元素的变动，当元素发生指定的变化时，调用提供的回调函数
 * 使用者可以指定要观察的一个或多个 DOM 元素，以及观察的选项和回调函数
 *
 * @param {Ref | Ref[] | HTMLElement | HTMLElement[]} target 要观察的目标，可以是 Ref 对象、Ref 数组、HTMLElement 或 HTMLElement 数组
 * @param {MutationCallback} callback 当观察到变化时调用的回调函数
 * @param {object} [options = {}] MutationObserver 的观察选项，默认为空对象；例如:
 *          subtree: 是否监听以 target 为根节点的整个子树，包括子树中所有节点的属性
 *          childList: 是否监听 target 节点中发生的节点的新增与删除
 *          attributes: 是否观察所有监听的节点属性值的变化
 *          attributeFilter: 声明哪些属性名会被监听的数组；如果不声明该属性，所有属性的变化都将触发通知
 * @returns {start: () => void, stop: () => void} 返回一个对象，包含停止和开始观察的方法，使用者可以调用 start 方法开始观察，调用 stop 方法停止观察
 */
export function useMutationObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: object = {}
): { start: () => void; stop: () => void } {
  const isSupported = useSupported(() => window && 'MutationObserver' in window)
  const stopObservation = ref(false)
  let observer: MutationObserver | undefined
  const targets = computed(() => {
    const targetsValue = toValue(target)
    if (targetsValue) {
      if (Array.isArray(targetsValue)) {
        return targetsValue.map((el: any) => toValue(el)).filter((el: any) => el)
      } else {
        return [targetsValue]
      }
    }
    return []
  })
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
 * 组合式函数
 * 使用 ResizeObserver 观察 DOM 元素尺寸变化
 *
 * 该函数提供了一种方便的方式来观察一个或多个元素的尺寸变化，并在变化时执行指定的回调函数
 *
 * @param {Ref | Ref[] | HTMLElement | HTMLElement[]} target 要观察的目标，可以是 Ref 对象、Ref 数组、HTMLElement 或 HTMLElement 数组
 * @param {ResizeObserverCallback} callback 当元素尺寸变化时调用的回调函数
 * @param {object} [options = {}] ResizeObserver 选项，用于定制观察行为
 * @returns {{ start: () => void, stop: () => void }} 返回一个对象，包含停止和开始观察的方法，使用者可以调用 start 方法开始观察，调用 stop 方法停止观察
 */
export function useResizeObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: ResizeObserverCallback,
  options: object = {}
): { start: () => void; stop: () => void } {
  const isSupported = useSupported(() => window && 'ResizeObserver' in window)
  let observer: ResizeObserver | undefined
  const stopObservation = ref(false)
  const targets = computed(() => {
    const targetsValue = toValue(target)
    if (targetsValue) {
      if (Array.isArray(targetsValue)) {
        return targetsValue.map((el: any) => toValue(el)).filter((el: any) => el)
      } else {
        return [targetsValue]
      }
    }
    return []
  })
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
/**
 * 组合式函数
 * 实时监测目标元素滚动位置及状态
 *
 * 自定义钩子用于处理滚动事件和状态
 * @param {Ref | HTMLElement | Window | Document} [target = window] 滚动目标元素，可以是 Ref、HTMLElement、Window 或 Document，默认为 window
 * @param {number} [throttleDelay = 0] 节流延迟，用于限制滚动事件的触发频率，默认为 0
 * @param {(e: Event) => void} onScroll 滚动事件的回调函数，可选
 * @param {(e: Event) => void} onStop 滚动结束的回调函数，可选
 * @returns {{ x: Ref<number>, xScrollMax: Ref<number>, y: Ref<number>, yScrollMax: Ref<number>, isScrolling: Ref<boolean>, left: Ref<boolean>, right: Ref<boolean>, top: Ref<boolean>, bottom: Ref<boolean> }} 返回一个对象，包含滚动位置和各种状态信息
 */
export function useScroll(
  target: Ref | HTMLElement | Window | Document = window,
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
  // 滚动事件
  function scrollEvent(e: Event) {
    isScrolling.value = true
    const eventTarget = ((e.target as Document).documentElement ?? e.target) as HTMLElement
    x.value = eventTarget.scrollLeft
    y.value = eventTarget.scrollTop
    left.value = x.value < lastScrollLeft.value
    right.value = x.value > lastScrollLeft.value
    top.value = y.value < lastScrollTop.value
    bottom.value = y.value > lastScrollTop.value
    lastScrollLeft.value = x.value
    lastScrollTop.value = y.value
    debounceScrollEnd(e)
    onScroll && onScroll(e)
  }
  // 使用节流函数限制滚动事件触发频率
  const throttleScroll = throttle(scrollEvent, throttleDelay)
  // 滚动结束事件
  function scrollEndEvent(e: Event) {
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
  // 使用防抖函数延迟处理滚动结束事件
  const debounceScrollEnd = debounce(scrollEndEvent, throttleDelay + 200)
  // 计算滚动目标元素
  const scrollTarget = computed(() => {
    const targetValue = toValue(target)
    if (targetValue) {
      return targetValue
    }
    return null
  })
  // 监听滚动目标元素的变化
  watch(
    () => scrollTarget.value,
    (to: any, from: any) => {
      if (from) {
        cleanup(from)
      }
      if (to) {
        const el: Element = ((to as Window)?.document?.documentElement ||
          (to as Document)?.documentElement ||
          (to as HTMLElement)) as Element
        xScrollMax.value = el.scrollWidth - el.clientWidth
        yScrollMax.value = el.scrollHeight - el.clientHeight
        el.addEventListener('scroll', throttleScroll as EventListener)
        el.addEventListener('scrollend', debounceScrollEnd as EventListener)
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  )
  // 清理函数，用于移除事件监听器
  function cleanup(target: any) {
    const el: Element = ((target as Window)?.document?.documentElement ||
      (target as Document)?.documentElement ||
      (target as HTMLElement)) as Element
    el.removeEventListener('scroll', throttleScroll as EventListener)
    el.removeEventListener('scrollend', debounceScrollEnd as EventListener)
  }
  // 在组件卸载前调用清理函数
  onBeforeUnmount(() => cleanup(scrollTarget.value))
  // 返回滚动位置和各种状态信息
  return { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom }
}
/**
 * 组合式函数
 * 查询并监听最近可滚动父元素，响应视口 resize，维护滚动位置与视口尺寸状态
 *
 * 与定位算法解耦，任何需要滚动感知的组件均可复用。滚动父元素查找（getScrollParent）、
 * 滚动监听（observeScroll）、清理（cleanup）等逻辑在此收敛。
 *
 * @param {Ref<HTMLElement | null>} contentRef 触发器内容元素（用于向上查找可滚动父元素）
 * @param {() => void} onScroll 滚动/resize 触发的回调（组件侧传入 updatePosition）
 * @param {ScrollParentOptions} [options] 配置项
 * @returns {{ scrollTarget: Ref<HTMLElement | null>, viewportWidth: Ref<number>, viewportHeight: Ref<number>, observeScroll: () => void, cleanup: () => void }} 返回滚动目标、视口尺寸与生命周期方法
 */
export interface ScrollParentOptions {
  passive?: boolean // 是否使用 passive 滚动监听，默认跟随浏览器支持情况
  onCleanup?: () => void // 附加清理：组件自身需在 cleanup 时执行的逻辑（如 Tooltip 的 cancelRaf）
}
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
  const scrollTop = ref<number>(0) // scrollTarget 的滚动位置
  const viewportWidth = ref(document.documentElement.clientWidth)
  const viewportHeight = ref(document.documentElement.clientHeight)
  const { isSupported: passiveSupported } = useOptionsSupported('passive')
  const usePassive = options.passive !== false && passiveSupported.value

  // vitepress 文档页滚动监听（scrollTarget 为 documentElement 时启用）
  const mutationObserver = useMutationObserver(
    scrollTarget,
    () => {
      if (scrollTop.value !== scrollTarget.value?.scrollTop) {
        scrollTop.value = scrollTarget.value?.scrollTop ?? 0
        onScroll()
      }
    },
    { subtree: true, attributes: true }
  )

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
    scrollTarget.value?.addEventListener('scroll', onScroll, usePassive ? { passive: true } : undefined)
    if (scrollTarget.value === document.documentElement) {
      mutationObserver.start()
    } else {
      mutationObserver.stop()
    }
  }

  // 清理滚动监听并重置滚动目标（含组件注入的附加清理）
  function cleanup() {
    scrollTarget.value?.removeEventListener('scroll', onScroll)
    scrollTarget.value = null
    options.onCleanup?.()
  }

  useEventListener(window, 'resize', getViewportSize)
  onMounted(observeScroll)
  onBeforeUnmount(cleanup)

  return { scrollTarget, viewportWidth, viewportHeight, observeScroll, cleanup }
}
