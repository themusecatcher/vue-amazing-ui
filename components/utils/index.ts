/**
 * 格式化日期时间字符串
 *
 * @param {number | string | Date} [value = Date.now()] 待格式化的日期时间值，支持数字、字符串和 Date 类型，默认为当前时间戳
 * @param {string} [format = 'YYYY-MM-DD HH:mm:ss'] 格式化字符串，默认为'YYYY-MM-DD HH:mm:ss'，支持格式化参数：YY：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒
 * @returns {string} 返回格式化后的日期时间字符串
 */
export function dateFormat(value: number | string | Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  try {
    let date: Date
    if (typeof value === 'number' || typeof value === 'string') {
      date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }
    } else {
      date = value
    }
    const padZero = (value: number, len: number = 2): string => {
      // 左侧补零函数
      return String(value).padStart(len, '0')
    }
    const replacement = (match: string) => {
      switch (match) {
        case 'YYYY':
          return padZero(date.getFullYear())
        case 'YY':
          return padZero(date.getFullYear()).slice(2, 4)
        case 'MM':
          return padZero(date.getMonth() + 1)
        case 'M':
          return String(date.getMonth() + 1)
        case 'DD':
          return padZero(date.getDate())
        case 'D':
          return String(date.getDate())
        case 'HH':
          return padZero(date.getHours())
        case 'H':
          return String(date.getHours())
        case 'mm':
          return padZero(date.getMinutes())
        case 'm':
          return String(date.getMinutes())
        case 'ss':
          return padZero(date.getSeconds())
        case 's':
          return String(date.getSeconds())
        case 'SSS':
          return padZero(date.getMilliseconds(), 3)
        default:
          return match
      }
    }
    return format.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g, replacement)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}
/**
 * 数字格式化函数
 *
 * 该函数提供了一种灵活的方式将数字格式化为字符串，包括设置精度、千位分隔符、小数点字符、前缀和后缀
 *
 * @param {number | string} value 要格式化的数字或数字字符串
 * @param {number} [precision = 2] 小数点后的位数，默认为 2
 * @param {string} [separator = ','] 千分位分隔符，默认为 ','
 * @param {string} [decimal = '.'] 小数点字符，默认为 '.'
 * @param {string} prefix 数字前的字符串，默认为 undefined
 * @param {string} suffix 数字后的字符串，默认为 undefined
 * @returns {string} 格式化后的字符串；如果输入值不是数字或字符串，则抛出类型错误
 */
export function formatNumber(
  value: number | string,
  precision: number = 2,
  separator: string = ',',
  decimal: string = '.',
  prefix?: string,
  suffix?: string
): string {
  // 类型检查
  if (typeof value !== 'number' && typeof value !== 'string') {
    console.warn('Expected value to be of type number or string')
  }
  if (typeof precision !== 'number') {
    console.warn('Expected precision to be of type number')
  }
  // 处理非数值或NaN的情况
  const numValue = Number(value)
  if (isNaN(numValue) || !isFinite(numValue)) {
    return ''
  }
  if (numValue === 0) {
    return numValue.toFixed(precision)
  }
  let formatValue = numValue.toFixed(precision)
  // 如果 separator 是数值而非字符串，会导致错误，此处进行检查
  if (typeof separator === 'string' && separator !== '') {
    const [integerPart, decimalPart] = formatValue.split('.')
    formatValue =
      integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$1' + separator) + (decimalPart ? decimal + decimalPart : '')
  }
  return (prefix || '') + formatValue + (suffix || '')
}
/**
 * 使用 requestAnimationFrame 实现的延迟 setTimeout 或间隔 setInterval 调用函数
 *
 * @param {Function} fn 要执行的函数
 * @param {number} [delay = 0] 延迟的时间，单位为 ms，默认为 0，表示不延迟立即执行
 * @param {boolean} [interval = false] 是否间隔执行，如果为 true，则在首次执行后，以 delay 为间隔持续执行
 * @returns {{ id: number }} 返回一个对象，包含一个 id 属性，该 id 为 requestAnimationFrame 的调用 ID，可用于取消动画帧
 */
export function rafTimeout(fn: Function, delay: number = 0, interval: boolean = false): { id: number } {
  let start: number | null = null // 记录动画开始的时间戳
  function timeElapse(timestamp: number) {
    // 定义动画帧回调函数
    /*
      timestamp参数：与 performance.now() 的返回值相同，它表示 requestAnimationFrame() 开始去执行回调函数的时刻
    */
    if (!start) {
      // 如果还没有开始时间，则以当前时间为开始时间
      start = timestamp
    }
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      try {
        fn() // 执行目标函数
      } catch (error) {
        console.error('Error executing rafTimeout function:', error)
      }
      if (interval) {
        // 如果需要间隔执行，则重置开始时间并继续安排下一次动画帧
        start = timestamp
        raf.id = requestAnimationFrame(timeElapse)
      }
    } else {
      raf.id = requestAnimationFrame(timeElapse)
    }
  }
  interface AnimationFrameID {
    id: number
  }
  // 创建一个对象用于存储动画帧的 ID，并初始化动画帧
  const raf: AnimationFrameID = {
    id: requestAnimationFrame(timeElapse)
  }
  return raf
}
/**
 * 用于取消 rafTimeout 函数
 *
 * @param {{id: number}} raf - 包含请求动画帧 ID 的对象；该 ID 是由 requestAnimationFrame 返回的
 *              该函数旨在取消之前通过 requestAnimationFrame 请求的动画帧
 *              如果传入的 raf 对象或其 id 无效，则会打印警告
 */
export function cancelRaf(raf: { id: number }): void {
  if (raf && raf.id && typeof raf.id === 'number') {
    cancelAnimationFrame(raf.id)
  } else {
    console.warn('cancelRaf received an invalid id:', raf)
  }
}
/**
 * 节流函数 throttle
 *
 * 该函数用于生成一个节流函数，用于控制某个函数在给定时间间隔内只能被执行一次
 * 主要用于性能优化，例如限制事件处理函数的触发频率
 *
 * @param {Function} fn 要被节流的函数
 * @param {number} [delay = 300] 节流的时间间隔，单位 ms，默认为 300ms
 * @returns {Function} 返回一个新的节流的函数
 */
export function throttle(fn: Function, delay: number = 300): Function {
  let valid = true // 用于标记函数是否可以执行
  return function (...args: any[]) {
    if (!valid) return false // 返回 false，表示当前不执行函数
    // 返回一个新的函数，该函数负责执行节流逻辑
    if (valid) {
      fn(...args) // 执行原函数
      valid = false // 将函数置为无效
      setTimeout(() => {
        valid = true
      }, delay)
    }
  }
}
/**
 * 防抖函数 debounce
 *
 * 主要用于限制函数调用的频率，当频繁触发某个函数时，实际上只需要在最后一次触发后的一段时间内执行一次即可
 * 这对于诸如输入事件处理函数、窗口大小调整事件处理函数等可能会频繁触发的函数非常有用
 *
 * @param {Function} fn 要执行的函数
 * @param {number} [delay = 300] 防抖的时间期限，单位 ms，默认为 300ms
 * @returns {Function} 返回一个新的防抖的函数
 */
export function debounce(fn: Function, delay: number = 300): Function {
  let timer: any = null // 使用闭包保存定时器的引用
  return function (...args: any[]) {
    // 返回一个包装函数
    if (timer) {
      // 如果定时器存在，则清除之前的定时器
      clearTimeout(timer)
    }
    // 设置新的定时器，延迟执行原函数
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
/**
 * 消除 js 加减精度问题的加法函数
 *
 * 该函数旨在添加两个数字，考虑到它们可能是整数或小数；对于整数，直接返回它们的和
 * 对于小数，为了确保精确计算，将小数转换为相同长度的字符串进行处理，然后将结果转换回小数
 *
 * @param {number} num1 第一个数字
 * @param {number} num2 第二个数字
 * @returns {number} 返回两个数字的和
 */
export function add(num1: number, num2: number): number {
  // 验证输入是否为有效的数字
  // Number.isNaN() 不会尝试将参数转换为数字；全局 isNaN() 函数会将参数强制转换为数字
  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    throw new Error('Both num1 and num2 must be valid numbers.')
  }
  // 检查输入是否为小数
  const isDecimalNum1 = num1 % 1 !== 0
  const isDecimalNum2 = num2 % 1 !== 0
  if (!isDecimalNum1 && !isDecimalNum2) {
    return num1 + num2 // 如果两个数字都是整数，则直接返回它们的和
  }
  const num1DeciStr = String(num1).split('.')[1] ?? ''
  const num2DeciStr = String(num2).split('.')[1] ?? ''
  const maxLen = Math.max(num1DeciStr.length, num2DeciStr.length)
  const factor = Math.pow(10, maxLen)
  const num1Str = num1.toFixed(maxLen)
  const num2Str = num2.toFixed(maxLen)
  // 将小数点移除并转换为整数相加
  const result = (+num1Str.replace('.', '') + +num2Str.replace('.', '')) / factor
  return result
}
/**
 * 下载文件并自定义文件名
 *
 * @param {string} url 文件的 URL，支持网络路径或本地路径
 * @param {string} fileName 文件名；文件的命名，如果未提供，则从 URL 中尝试提取
 */
export function downloadFile(url: string, fileName?: string): void {
  if (!url) {
    console.error('无效的 url')
    return
  }
  // 获取文件名，如果未提供，则从URL中获取或使用默认值
  const name = fileName ? fileName : url.split('?')[0].split('/').pop() || 'download'
  try {
    // 使用 fetch API 从指定 URL 请求文件
    fetch(url).then((response) => {
      // 检查响应状态是否成功
      if (response.ok) {
        // 将响应转换为 Blob 对象
        response.blob().then((blob) => {
          const blobUrl = URL.createObjectURL(blob) // 创建 Blob URL
          const a = document.createElement('a') // 创建超链接元素
          a.href = blobUrl // 设置超链接的 href 属性为 Blob URL
          a.download = name // 设置超链接的 download 属性为自定义的文件名
          // 将超链接元素添加到文档中并触发点击事件
          document.body.appendChild(a)
          a.click() // 点击超链接，触发下载事件
          document.body.removeChild(a)
          URL.revokeObjectURL(blobUrl) // 释放 Blob URL 所占的内存
        })
      } else {
        console.error('请求文件失败，状态码:', response.status)
      }
    })
  } catch (error) {
    // 处理下载过程中出现的异常情况
    console.error('文件下载失败:', error)
  }
}
/*
  一键切换暗黑模式函数
  在 <html> 根元素上动态切换 dark 模式，在根元素添加 dark 类值，同时样式添加 color-scheme: dark，具体样式需自行添加
  // dark 主题样式参考如下：
  html {
    transition: filter .3s ease-in-out;
  }
  · invert(): 反转输入图像，1表示完全反转
  · hue-rotate(): 在输入图像上应用色相旋转
  html.dark { // 暗黑模式
    filter: invert(1) hue-rotate(180deg);
    img, video { // 将图片和视频再次反转以恢复原本的颜色
      filter: invert(1) hue-rotate(180deg);
    }
  }
*/
export function toggleDark(): void {
  const html = document.documentElement
  // 如果 <html> 上 dark 类值已存在，则移除它，否则添加它
  html.classList.toggle('dark')
  if (html.classList.contains('dark')) {
    html.style.colorScheme = 'dark'
  } else {
    html.style.colorScheme = 'light'
  }
}
import {
  ref,
  getCurrentInstance,
  onMounted,
  toValue,
  computed,
  watch,
  onBeforeUnmount,
  onUnmounted,
  useSlots,
  reactive,
  Text,
  Comment
} from 'vue'
import type { Ref, ComputedRef, Reactive, VNode } from 'vue'
/**
 * 用于判断组件是否已挂载的自定义钩子
 *
 * 在组件的生命周期中，我们经常需要知道组件是否已经挂载，特别是在异步操作或者动态渲染的场景中
 * 此钩子通过在组件挂载时设置一个 Ref 对象的状态来帮助我们进行判断
 *
 * @returns { Ref<boolean> } 返回一个 Ref 对象，用于指示组件是否已挂载
 */
export function useMounted(): Ref<boolean> {
  const isMounted = ref(false)
  // 获取当前组件的实例
  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
  }
  return isMounted
}
/**
 * 检查 api 是否支持
 *
 * 用于检查给定的回调函数是否在组件挂载期间被支持
 *
 * @param {() => unknown} callback 回调函数，用于执行某些操作，并返回用于计算的值
 * @returns {ComputedRef<boolean>} 返回一个计算属性，该属性在组件挂载时会触发回调函数，并根据回调函数的返回值计算支持状态
 */
export function useSupported(callback: () => unknown): ComputedRef<boolean> {
  const isMounted = useMounted()
  return computed(() => {
    // to trigger the ref
    isMounted.value
    return Boolean(callback())
  })
}
/**
 * 组合式函数
 * 使用 Vue 的生命周期钩子添加和移除事件监听器
 *
 * 该函数旨在提供一种优雅的方式来管理事件监听器，避免在组件卸载后仍保留事件监听器，
 * 从而可能导致内存泄漏的问题；通过结合 Vue 的 onMounted 和 onUnmounted 钩子，
 * 在组件挂载时添加事件监听器，并在组件卸载时移除它
 *
 * @param {HTMLElement | Window | Document} target 目标元素或对象；可以是 DOM 元素或其他支持 addEventListener 的对象
 * @param {string} event 要监听的事件名称
 * @param {Function} callback 事件被触发时执行的回调函数
 */
export function useEventListener(target: HTMLElement | Window | Document, event: string, callback: Function): void {
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback as EventListenerOrEventListenerObject))
  onUnmounted(() => target.removeEventListener(event, callback as EventListenerOrEventListenerObject))
}
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
 * 实时监测浏览器刷新率FPS
 *
 * FPS值可以帮助开发者识别性能瓶颈，以优化应用的性能
 *
 * @returns {{ fps: Ref<number> }} 返回一个包含 FPS 值的 ref 对象
 */
export function useFps(): { fps: Ref<number> } {
  const fps = ref<number>(0)
  const frameCount = ref<number>(0)
  let lastTime = performance.now()
  const every = 10
  const calculateFrameRate = (currentTime: number) => {
    frameCount.value++
    if (frameCount.value >= every) {
      // 每 every 帧进行一次 FPS 计算
      const timeDiff = currentTime - lastTime
      fps.value = Math.round(1000 / (timeDiff / every))
      lastTime = currentTime
      frameCount.value = 0
    }
    requestAnimationFrame(calculateFrameRate)
  }
  requestAnimationFrame(calculateFrameRate)
  // 返回帧率状态
  return { fps }
}
/**
 * 组合式函数
 * 使用媒体查询来判断当前环境是否符合指定的媒体查询条件
 *
 * 该函数提供了一个响应式的媒体查询机制，根据查询的不同结果动态更新响应式变量
 *
 * @param {string} mediaQuery 媒体查询字符串，用于定义要查询的媒体条件
 * @returns {{ match: Ref<boolean> }} 返回一个对象，其中包含一个名为 match 的 ref 对象，表示当前是否为移动设备视口
 */
export function useMediaQuery(mediaQuery: string): { match: Ref<boolean> } {
  // 检查传入的mediaQuery参数是否为空或非法
  if (!mediaQuery || typeof mediaQuery !== 'string' || mediaQuery.trim() === '') {
    throw new Error('Invalid mediaQuery parameter. It must be a non-empty string.')
  }
  const match = ref(window && window.matchMedia(mediaQuery).matches)
  const mediaQueryList = window.matchMedia(mediaQuery)
  // 处理媒体查询状态改变的事件
  const updateChange = (e: MediaQueryListEvent) => {
    match.value = e.matches // 一个布尔值，如果当前 document 与媒体查询列表相匹配，则返回 true，否则返回 false
  }
  onMounted(() => {
    mediaQueryList.addEventListener('change', updateChange)
  })
  onBeforeUnmount(() => {
    mediaQueryList.removeEventListener('change', updateChange)
  })
  return { match }
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
 * 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在
 *
 * @param slotsName - 插槽的名称或名称数组，默认为 'default'
 * @returns 如果是单个插槽名称，则返回一个计算属性，表示该插槽是否存在
 *          如果是插槽名称数组，则返回一个 reactive 对象，其中的每个属性对应该插槽是否存在
 */
type SlotsExistResult<T extends string | string[]> = T extends string
  ? ComputedRef<boolean>
  : Reactive<Record<string, ComputedRef<boolean>>>
export function useSlotsExist<T extends string | string[] = 'default'>(slotsName: T): SlotsExistResult<T> {
  const slots = useSlots() // 获取当前组件的所有插槽
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotName: string): boolean => {
    const slotsContent = slots[slotName]?.()
    const checkExist = (slotContent: VNode) => {
      if (slotContent.type === Comment) {
        return false
      }
      if (Array.isArray(slotContent.children) && !slotContent.children.length) {
        return false
      }
      if (slotContent.type !== Text) {
        return true
      }
      if (typeof slotContent.children === 'string') {
        return slotContent.children.trim() !== ''
      }
    }
    if (slotsContent && slotsContent?.length) {
      const result = slotsContent.some((slotContent: VNode) => {
        return checkExist(slotContent)
      })
      return result
    }
    return false
  }
  if (Array.isArray(slotsName)) {
    const slotsExist = reactive<Record<string, ComputedRef<boolean>>>({})
    slotsName.forEach((slotName: string) => {
      const exist = computed(() => checkSlotsExist(slotName))
      slotsExist[slotName] = exist // 将一个 ref 赋值给一个 reactive 属性时，该 ref 会自动解包
    })
    return slotsExist as SlotsExistResult<T>
  } else {
    return computed(() => checkSlotsExist(slotsName)) as SlotsExistResult<T>
  }
}
import { TinyColor } from '@ctrl/tinycolor'
import { generate } from '@ant-design/colors'
import { inject, toRefs } from 'vue'
/**
 * 使用依赖注入的函数
 * 用于获取颜色调色板和阴影颜色
 * 如果在组件中使用，则会尝试从组件的依赖注入中获取颜色配置
 * 如果未找到，则回退到全局的默认颜色配置
 *
 * @param {string} key 组件名，用于在组件的依赖注入中查找颜色配置
 * @returns {{ colorPalettes: Ref<string[]>, shadowColor: Ref<string> }} 返回包含颜色调色板和阴影颜色的主题对象
 */
export function useInject(key: string): { colorPalettes: Ref<string[]>; shadowColor: Ref<string> } {
  // 获取默认的颜色调色板
  const colorPalettes = getColorPalettes('#1677ff')
  // 获取 common 的依赖注入
  const commonInjectValue = inject('common', reactive({ colorPalettes, shadowColor: getAlphaColor(colorPalettes[0]) }))
  // 获取组件的依赖注入
  const componentsInjectValue = inject('components', null) as Record<
    string,
    { colorPalettes: string[]; shadowColor: string }
  > | null
  if (
    componentsInjectValue !== null &&
    key in componentsInjectValue &&
    componentsInjectValue[key].colorPalettes.length
  ) {
    return toRefs(componentsInjectValue[key])
  }
  return toRefs(commonInjectValue)
}
/**
 * 获取颜色调色板
 *
 * @param {string} primaryColor 主色
 * @returns {string[]} 返回颜色调色板
 */
export function getColorPalettes(primaryColor: string): string[] {
  return generate(primaryColor)
}
/**
 * 是否为可靠的颜色值
 *
 * @param {number} color 颜色值
 * @returns {boolean} 返回颜色值是否可靠
 */
function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255
}
/**
 * 获取透明度颜色，一般用作阴影色
 *
 * @param {string} frontColor 前景色
 * @param {string} [backgroundColor = '#ffffff'] 背景色
 * @returns {string} 返回透明度颜色
 */
export function getAlphaColor(frontColor: string, backgroundColor: string = '#ffffff'): string {
  const { r: fR, g: fG, b: fB, a: originAlpha } = new TinyColor(frontColor).toRgb()
  if (originAlpha < 1) return frontColor
  const { r: bR, g: bG, b: bB } = new TinyColor(backgroundColor).toRgb()
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA)
    const g = Math.round((fG - bG * (1 - fA)) / fA)
    const b = Math.round((fB - bB * (1 - fA)) / fA)
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return new TinyColor({ r, g, b, a: Math.round(fA * 100) / 100 }).toRgbString()
    }
  }
  return new TinyColor({ r: fR, g: fG, b: fB, a: 1 }).toRgbString()
}
/**
 * 检查浏览器是否支持给定的事件监听器选项
 *
 * @param {'capture' | 'once' | 'passive' | 'signal'} prop 一个表示要检查的事件监听器属性的字符串，可选 'capture'、'once'、'passive' 或 'signal'
 * @returns {{ isSupported: Ref<boolean> }} 返回一个对象，包含一个 Ref 对象，其值指示浏览器是否支持给定的选项
 */
export function useOptionsSupported(prop: 'capture' | 'once' | 'passive' | 'signal'): { isSupported: Ref<boolean> } {
  // 兼容旧版本的浏览器（以及一些相对不算古老的）仍然假定 addEventListener 第三个参数是布尔值的情况
  const isSupported = ref<boolean>(false) // 浏览器是否支持 options 参数
  try {
    const options = {
      get [prop]() {
        // 该函数会在浏览器尝试访问 [prop] 值时被调用
        isSupported.value = true
        return false
      }
    }
    window.addEventListener('test', () => null, options)
    window.removeEventListener('test', () => null, options)
  } catch (err) {
    isSupported.value = false
  }
  return { isSupported }
}
