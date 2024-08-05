/**
 * 格式化日期时间字符串
 *
 * @param value 待格式化的日期时间值，支持数字、字符串和Date类型，默认为当前时间戳
 * @param format 格式化字符串，默认为'YYYY-MM-DD HH:mm:ss'，支持格式化参数：YY：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒
 * @returns 返回格式化后的日期时间字符串
 */
export function dateFormat(value: number | string | Date = Date.now(), format = 'YYYY-MM-DD HH:mm:ss'): string {
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
 * 该函数提供了一种灵活的方式将数字格式化为字符串，包括设置精度、千位分隔符、小数点字符、前缀和后缀。
 * 这样可以方便地根据不同的需求和地域习惯来显示数字。
 *
 * @param value 要格式化的数字或数字字符串。
 * @param precision 小数点后的位数，默认为2。
 * @param separator 千分位分隔符，默认为","。
 * @param decimal 小数点字符，默认为"."。
 * @param prefix 数字前的字符串，默认为空。
 * @param suffix 数字后的字符串，默认为空。
 * @returns 格式化后的字符串。如果输入值不是数字或字符串，则抛出类型错误。
 */
export function formatNumber(
  value: number | string,
  precision = 2,
  separator = ',',
  decimal = '.',
  prefix = '',
  suffix = ''
): string {
  // 类型检查
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new TypeError('Expected value to be of type number or string')
  }
  if (typeof precision !== 'number') {
    throw new TypeError('Expected precision to be of type number')
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
  // 如果separator是数值而非字符串，会导致错误，此处进行检查
  if (typeof separator === 'string' && separator !== '') {
    const [integerPart, decimalPart] = formatValue.split('.')
    formatValue =
      integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$1' + separator) + (decimalPart ? decimal + decimalPart : '')
  }
  return prefix + formatValue + suffix
}
/**
 * 使用requestAnimationFrame实现的延迟setTimeout或间隔setInterval调用函数。
 *
 * @param fn 要执行的函数。
 * @param delay 延迟的时间，单位为ms，默认为0，表示不延迟立即执行。
 * @param interval 是否间隔执行，如果为true，则在首次执行后，以delay为间隔持续执行。
 * @returns 返回一个对象，包含一个id属性，该id为requestAnimationFrame的调用ID，可用于取消动画帧。
 */
export function rafTimeout(fn: Function, delay = 0, interval = false): object {
  let start: number | null = null // 记录动画开始的时间戳
  function timeElapse(timestamp: number) {
    // 定义动画帧回调函数
    /*
      timestamp参数：与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻
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
  // 创建一个对象用于存储动画帧的ID，并初始化动画帧
  const raf: AnimationFrameID = {
    id: requestAnimationFrame(timeElapse)
  }
  return raf
}
/**
 * 用于取消 rafTimeout 函数
 *
 * @param raf - 包含请求动画帧ID的对象。该ID是由requestAnimationFrame返回的。
 *              该函数旨在取消之前通过requestAnimationFrame请求的动画帧。
 *              如果传入的raf对象或其id无效，则会打印警告。
 */
export function cancelRaf(raf: { id: number }): void {
  if (raf && raf.id && typeof raf.id === 'number') {
    cancelAnimationFrame(raf.id)
  } else {
    console.warn('cancelRaf received an invalid id:', raf)
  }
}
/**
 * 节流函数throttle
 *
 * 该函数用于生成一个节流函数，用于控制某个函数在给定时间间隔内只能被执行一次。
 * 主要用于性能优化，例如限制事件处理函数的触发频率。
 *
 * @param fn 要被节流的函数。
 * @param delay 节流的时间间隔，单位ms，默认为300毫秒。
 * @returns 返回一个新的节流的函数。
 */
export function throttle(fn: Function, delay = 300): any {
  let valid = true // 用于标记函数是否可以执行
  return function (...args: any[]) {
    // 返回一个新的函数，该函数负责执行节流逻辑
    if (valid) {
      valid = false // 将函数置为无效
      setTimeout(() => {
        fn(...args) // 执行原函数，并在执行后重新标记为可执行
        valid = true
      }, delay)
    }
    return false // 返回false，表示当前不执行函数
  }
}
/**
 * 防抖函数debounce
 * 主要用于限制函数调用的频率，当频繁触发某个函数时，实际上只需要在最后一次触发后的一段时间内执行一次即可。
 * 这对于诸如输入事件处理函数、窗口大小调整事件处理函数等可能会频繁触发的函数非常有用。
 *
 * @param fn 要执行的函数。
 * @param delay 防抖的时间期限，单位ms，默认为300毫秒。
 * @returns 返回一个新的防抖的函数
 */
export function debounce(fn: Function, delay = 300): any {
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
 * 消除js加减精度问题的加法函数
 *
 * 该函数旨在添加两个数字，考虑到它们可能是整数或小数。对于整数，直接返回它们的和。
 * 对于小数，为了确保精确计算，将小数转换为相同长度的字符串进行处理，然后将结果转换回小数。
 *
 * @param num1 第一个数字
 * @param num2 第二个数字
 * @returns 返回两个数字的和
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
 * @param url 文件的URL
 * @param name 文件名；文件的命名，如果未提供，则从URL中尝试提取
 */
export function downloadFile(url: string, name: string): void {
  url = encodeURI(url) // 对URL进行编码防止XSS攻击
  let fileName = ''
  if (name) {
    fileName = name
  } else {
    // 提取文件名
    const urlObj = new URL(url)
    fileName = urlObj.pathname.split('/').pop() || 'download'
  }
  const xhr = new XMLHttpRequest() // 创建XMLHttpRequest对象用于文件下载
  xhr.open('GET', url, true)
  xhr.responseType = 'blob' // 设置响应类型为blob，以便处理二进制数据
  xhr.onerror = function () {
    console.error('下载文件失败')
  }
  xhr.onload = function () {
    if (xhr.status === 200) {
      const blob = xhr.response
      const link = document.createElement('a')
      const body = document.querySelector('body')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.style.display = 'none'
      body?.appendChild(link)
      link.click()
      body?.removeChild(link) // 下载完成后，移除链接并释放blob对象URL
      window.URL.revokeObjectURL(link.href)
    } else {
      console.error('请求文件失败，状态码：', xhr.status)
    }
  }
  xhr.send() // 发送请求
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
export function toggleDark() {
  const html = document.documentElement
  // 如果 <html> 上 dark 类值已存在，则移除它，否则添加它
  html.classList.toggle('dark')
  if (html.classList.contains('dark')) {
    html.style.colorScheme = 'dark'
  } else {
    html.style.colorScheme = 'light'
  }
}
/**
 * 组合式函数
 * 使用Vue的生命周期钩子添加和移除事件监听器。
 *
 * 该函数旨在提供一种优雅的方式来管理事件监听器，避免在组件卸载后仍保留事件监听器，
 * 从而可能导致内存泄漏的问题。通过结合Vue的`onMounted`和`onUnmounted`钩子，
 * 在组件挂载时添加事件监听器，并在组件卸载时移除它，确保资源被妥善管理。
 *
 * @param target 目标元素或对象。可以是DOM元素或其他支持addEventListener的对象。
 * @param event 要监听的事件名称。
 * @param callback 事件被触发时执行的回调函数。
 */
import { ref, toValue, computed, watch, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import type { Ref } from 'vue'
export function useEventListener(target: HTMLElement | Window | Document, event: string, callback: Function): void {
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback as EventListenerOrEventListenerObject))
  onUnmounted(() => target.removeEventListener(event, callback as EventListenerOrEventListenerObject))
}
/**
 * 组合式函数
 * 使用 MutationObserver 观察 DOM 元素的变化
 *
 * 该函数提供了一个便捷的方式来订阅 DOM 元素的变动，当元素发生指定的变化时，调用提供的回调函数；
 * 使用者可以指定要观察的一个或多个 DOM 元素，以及观察的选项和回调函数；
 * 返回一个对象，包含开始和停止观察的方法，使用者可以调用 start 方法开始观察，调用 stop 方法停止观察
 *
 * @param target 要观察的目标，可以是 Ref 对象、Ref 数组、HTMLElement 或 HTMLElement 数组
 * @param callback 当观察到变化时调用的回调函数
 * @param options MutationObserver 的观察选项，默认为空对象；例如:
 *  subtree: 是否监听以 target 为根节点的整个子树，包括子树中所有节点的属性
 *  childList: 是否监听 target 节点中发生的节点的新增与删除
 *  attributes: 是否观察所有监听的节点属性值的变化
 *  attributeFilter: 声明哪些属性名会被监听的数组；如果不声明该属性，所有属性的变化都将触发通知
 */
export function useMutationObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options = {}
) {
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
    if (targets.value.length && !stopObservation.value) {
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
  const stop = () => {
    stopObservation.value = true
    cleanup()
  }
  const start = () => {
    stopObservation.value = false
    observeElements()
  }
  // 在组件卸载前清理 MutationObserver
  onBeforeUnmount(() => cleanup())
  return {
    stop,
    start
  }
}
/**
 * 组合式函数
 * 实时监测页面滚动方向
 *
 * @param throttleDelay 节流延迟时间，单位ms，默认为100毫秒。用于控制滚动事件触发的频率。
 * @returns 返回一个对象，其中包含一个名为scrollDown的响应式属性，表示滚动方向是否向下。
 */
export function useScrollDirection(throttleDelay = 100) {
  // 使用ref定义一个响应式变量，指示当前滚动方向是否向下
  const scrollDown = ref<boolean>(false)
  // 记录上一次滚动的位置
  let lastScrollY = 0
  // 监听滚动事件的函数
  function scrollEvent() {
    // 获取当前的滚动位置
    // 注：在 safari 浏览器中 currentScrollY 会出现负值，可将负值统一处理为 0 来和 google 浏览器行为统一
    let currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    currentScrollY = currentScrollY < 0 ? 0 : currentScrollY
    // 比较当前位置和上一次记录的位置，来确定滚动方向
    scrollDown.value = currentScrollY > lastScrollY
    // 更新上次滚动位置
    lastScrollY = currentScrollY
  }
  // 使用节流函数封装scrollEvent，以减少滚动事件的触发频率
  const throttleScroll = throttle(scrollEvent, throttleDelay)
  useEventListener(window, 'scroll', throttleScroll)
  // 返回一个对象，包含我们想要暴露给组件的状态或方法
  return { scrollDown }
}
/**
 * 组合式函数
 * 实时监测浏览器刷新率FPS
 *
 * 该函数提供了一个用于监测帧率的钩子。它通过计算每秒渲染的帧数（FPS）来评估动画或渲染性能。
 * FPS值可以帮助开发者识别性能瓶颈，以优化应用的性能。
 *
 * @returns {Object} 返回一个包含FPS值的对象。
 */
export function useFps() {
  const fps = ref<number>(0)
  const frameCount = ref<number>(0)
  let lastTime = performance.now()
  const every = 10
  function calculateFrameRate(currentTime: number) {
    frameCount.value++
    if (frameCount.value >= every) {
      // 每 every 帧进行一次FPS计算
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
 * @param mediaQuery 媒体查询字符串，用于定义要查询的媒体条件
 * @returns 返回一个对象，其中包含一个名为 match 的响应式属性，表示当前是否为移动设备视口
 */
export function useMediaQuery(mediaQuery: string) {
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
 * 该函数提供了一种方便的方式来观察一个或多个元素的尺寸变化，并在变化时执行指定的回调函数。
 *
 * @param target 要观察的目标，可以是 Ref 对象、Ref 数组、HTMLElement 或 HTMLElement 数组
 * @param callback 当元素尺寸变化时调用的回调函数
 * @param options ResizeObserver 选项，用于定制观察行为
 * @returns 返回一个对象，包含停止和开始观察的方法，使用者可以调用 start 方法开始观察，调用 stop 方法停止观察
 */
export function useResizeObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: ResizeObserverCallback,
  options = {}
) {
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
    if (targets.value.length && !stopObservation.value) {
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
  const stop = () => {
    stopObservation.value = true
    cleanup()
  }
  const start = () => {
    stopObservation.value = false
    observeElements()
  }
  // 在组件卸载前清理 ResizeObserver
  onBeforeUnmount(() => cleanup())
  return {
    stop,
    start
  }
}
