/*
  value: 13位时间戳 | new Date() | Date()
  console.log(dateFormat(1680227496788, 'YYYY-MM-DD HH:mm:ss'))
  format => YY：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒
*/
export function dateFormat (value: number|string|Date = Date.now(), format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (typeof value === 'number' || typeof value === 'string') {
    var date = new Date(value)
  } else {
    var date = value
  }
  let showTime = format
  if (showTime.includes('SSS')) {
    const S = String(date.getMilliseconds())
    showTime = showTime.replace('SSS', S.padStart(3, '0'))
  }
  if (showTime.includes('YY')) {
    const Y = String(date.getFullYear())
    showTime = showTime.includes('YYYY') ? showTime.replace('YYYY', Y) : showTime.replace('YY', Y.slice(2, 4))
  }
  if (showTime.includes('M')) {
    const M = String(date.getMonth() + 1)
    showTime = showTime.includes('MM') ? showTime.replace('MM', M.padStart(2, '0')) : showTime.replace('M', M)
  }
  if (showTime.includes('D')) {
    const D = String(date.getDate())
    showTime = showTime.includes('DD') ? showTime.replace('DD', D.padStart(2, '0')) : showTime.replace('D', D)
  }
  if (showTime.includes('H')) {
    const H = String(date.getHours())
    showTime = showTime.includes('HH') ? showTime.replace('HH', H.padStart(2, '0')) : showTime.replace('H', H)
  }
  if (showTime.includes('m')) {
    const m = String(date.getMinutes())
    showTime = showTime.includes('mm') ? showTime.replace('mm', m.padStart(2, '0')) : showTime.replace('m', m)
  }
  if (showTime.includes('s')) {
    const s = String(date.getSeconds())
    showTime = showTime.includes('ss') ? showTime.replace('ss', s.padStart(2, '0')) : showTime.replace('s', s)
  }
  return showTime
}
// @ts-ignore 兼容性requestAnimationFrame
export const requestAnimationFrame = typeof window !== 'undefined' ? (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame) : () => {}
// @ts-ignore 兼容性cancelAnimationFrame
export const cancelAnimationFrame = typeof window !== 'undefined' ? (window.cancelAnimationFrame || window.mozCancelAnimationFrame) : () => {}
/*
  使用 requestAnimationFrame 模拟 setTimeout 和 setInterval
  一共接收三个参数：
  fn: 延迟 delay ms后要执行的函数
  delay（可选）: 延迟的毫秒数，默认值0ms
  interval（可选）: 默认情况下 rafTimeout 等效于 setTimeout 功能，如果要使用 setInterval 功能，则需传入第三个参数（interval: true）

  返回值（用于取消 rafTimeout）：（object）raf: { id: number }
  取消 rafTimeout 定时器：cancelRaf(raf) 或者 cancelAnimationFrame(raf.id)
*/
export function rafTimeout (fn: Function, delay = 0, interval = false): object {
  // @ts-ignore
  const requestAnimationFrame = typeof window !== 'undefined' ? (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame) : () => {}
  let start: any = null
  function timeElapse (timestamp: number) {
    /*
      timestamp参数：与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻
    */
    if (!start) {
      start = timestamp
    }
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      fn() // 执行目标函数func
      if (interval) { // 使用间歇调用
        start = null
        raf.id = requestAnimationFrame(timeElapse)
      }
    } else {
      raf.id = requestAnimationFrame(timeElapse)
    }
  }
  const raf = { // 引用类型保存，方便获取 requestAnimationFrame()方法返回的 ID.
    id: requestAnimationFrame(timeElapse)
  }
  return raf
}
// 用于取消 rafTimeout 函数
export function cancelRaf (raf: { id: number }): void {
  // @ts-ignore
  const cancelAnimationFrame = typeof window !== 'undefined' ? (window.cancelAnimationFrame || window.mozCancelAnimationFrame) : () => {}
  if (raf && raf.id) {
    cancelAnimationFrame(raf.id)
  }
}
// 节流函数throttle
export function throttle (fn: Function, delay = 300): any {
  let valid = true
  return function () {
    if (valid) {
      valid = false // 将函数置为无效
      setTimeout(() => {
        fn()
        valid = true
      }, delay)
    }
    return false // valid为false时，函数不执行
  }
}
// 防抖函数debounce
export function debounce (fn: Function, delay = 300): any {
  let timer: any = null //借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}
// 消除js加减精度问题的加法函数
export function add (num1: number, num2: number): number {
  const num1DeciStr = String(num1).split('.')[1]
  const num2DeciStr = String(num2).split('.')[1]
  const maxLen = Math.max(num1DeciStr?.length || 0, num2DeciStr?.length || 0) // 两数中最长的小数位长度
  const num1Str = num1.toFixed(maxLen) // 补零，返回字符串
  const num2Str = num2.toFixed(maxLen)
  const result = +(num1Str.replace('.', '')) + +(num2Str.replace('.', '')) // 转换为整数相加
  return result / Math.pow(10, maxLen)
}
/*
  下载文件并自定义文件名
  url: 文件地址
  name: 自定义文件名，未传时，从文件地址中自动获取文件名称
*/
export function downloadFile (url: string, name: string) {
  let fileName = ''
  if (name) {
    fileName = name
  } else {
    const res = url.split('?')[0].split('/')
    fileName = res[res.length - 1]
  }
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
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
      body?.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    }
  }
  xhr.send()
}
/*
  自定义保留 precision 位小数，并使用 separator 分隔符进行数字格式化
  value：格式化目标数字
  precision：精度，保留小数点后几位，默认2位
  separator：千分位分隔符，默认为','
  decimal：小数点符号，默认'.'
  prefix：前缀字符，默认''
  suffix：后缀字符，默认''
  formatNumber(123456789.87654321, 2, ',') // 123,456,789.88
*/
export function formatNumber (value: number|string, precision = 2, separator = ',', decimal = '.', prefix = '', suffix = ''): string {
  if (Number(value) === 0) {
    return Number(value).toFixed(precision)
  }
  if (!value) {
    return ''
  }
  value = Number(value).toFixed(precision)
  value += ''
  const nums = value.split('.')
  let integer = nums[0]
  const decimals = nums.length > 1 ? decimal + nums[1] : ''
  const reg = /(\d+)(\d{3})/
  function isNumber (value: any) {
    return Object.prototype.toString.call(value) === '[object Number]'
  }
  if (separator && !isNumber(separator)) {
    while (reg.test(integer)) {
      integer = integer.replace(reg, '$1' + separator + '$2')
    }
  }
  return prefix + integer + decimals + suffix
}
/*
  在 <html> 根元素上动态切换 dark 模式，只在根元素添加 dark 类值，具体样式需自行添加
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
export function toggleDark () {
  // 如果 <html> 上 dark 类值已存在，则移除它，否则添加它
  document.documentElement.classList.toggle('dark')
}
// 定义组合式函数
import { onMounted, onUnmounted } from 'vue'
/*
  在目标元素 target 上注册一个事件监听器
  target：要添加监听事件的目标元素
  event：监听的事件类型（大小写敏感）
  callback：监听的事件类型触发时的回调函数

*/
export function useEventListener (target: any, event: string, callback: Function) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
