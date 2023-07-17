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
  function fixedTwo (value: number): string {
    return value < 10 ? '0' + value : String(value)
  }
  var showTime = format
  if (showTime.includes('SSS')) {
    const S = date.getMilliseconds()
    showTime = showTime.replace('SSS', '0'.repeat(3 - String(S).length) + S)
  }
  if (showTime.includes('YY')) {
    const Y = date.getFullYear()
    showTime = showTime.includes('YYYY') ? showTime.replace('YYYY', String(Y)) : showTime.replace('YY', String(Y).slice(2, 4))
  }
  if (showTime.includes('M')) {
    const M = date.getMonth() + 1
    showTime = showTime.includes('MM') ? showTime.replace('MM', fixedTwo(M)) : showTime.replace('M', String(M))
  }
  if (showTime.includes('D')) {
    const D = date.getDate()
    showTime = showTime.includes('DD') ? showTime.replace('DD', fixedTwo(D)) : showTime.replace('D', String(D))
  }
  if (showTime.includes('H')) {
    const H = date.getHours()
    showTime = showTime.includes('HH') ? showTime.replace('HH', fixedTwo(H)) : showTime.replace('H', String(H))
  }
  if (showTime.includes('m')) {
    var m = date.getMinutes()
    showTime = showTime.includes('mm') ? showTime.replace('mm', fixedTwo(m)) : showTime.replace('m', String(m))
  }
  if (showTime.includes('s')) {
    var s = date.getSeconds()
    showTime = showTime.includes('ss') ? showTime.replace('ss', fixedTwo(s)) : showTime.replace('s', String(s))
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
  var start: any = null
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
  var valid = true
  return function () {
    if (valid) {
      valid = false // 将函数置为无效
      rafTimeout(() => {
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
      cancelRaf(timer)
    }
    timer = rafTimeout(fn, delay)
  }
}
// 消除js加减精度问题的加法函数
export function add (num1: number, num2: number): number {
  const num1DeciStr = String(num1).split('.')[1]
  const num2DeciStr = String(num2).split('.')[1]
  let maxLen = Math.max(num1DeciStr?.length || 0, num2DeciStr?.length || 0) // 两数中最长的小数位长度
  let num1Str = num1.toFixed(maxLen) // 补零，返回字符串
  let num2Str = num2.toFixed(maxLen)
  const result = +(num1Str.replace('.', '')) + +(num2Str.replace('.', '')) // 转换为整数相加
  return result / Math.pow(10, maxLen)
}
/*
  下载文件并自定义文件名
  url: 文件地址
  name: 自定义文件名，未传时，从文件地址中自动获取文件名称
*/
export function downloadFile (url: string, name: string) {
  var fileName = ''
  if (name) {
    fileName = name
  } else {
    const res = url.split('?')[0].split('/')
    fileName = res[res.length - 1]
  }
  var xhr = new XMLHttpRequest()
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
  自定义保留 decimal 位小数，并使用 split 分隔符进行数字格式化
  value：格式化目标数字
  decimal：保留几位小数，默认2位
  split：千分位分隔符，默认为','
  moneyFormat(123456789.87654321, 2, ',') // 123,456,789.88
*/
export function moneyFormat (value: number|string, decimal = 2, split = ',') {
  function thousandFormat (numStr: string): string {
    const len = numStr.length
    return len <= 3 ? numStr : thousandFormat(numStr.slice(0, len - 3)) + split + numStr.slice(len - 3, len)
  }
  const money = String(value)
  if (isFinite(parseFloat(money))) { // num是数字
    if (parseFloat(money) === 0) { // 为0
      return parseFloat(money).toFixed(decimal)
    } else { // 非0
      var res = ''
      var dotIndex = money.indexOf('.')
      if (dotIndex === -1) { // 整数
        if (decimal === 0) {
          res = thousandFormat(money)
        } else {
          res = thousandFormat(money) + '.' + '0'.repeat(decimal)
        }
      } else { // 非整数
        // 四舍五入 Math.round()：正数时4舍5入，负数时5舍6入
        // Math.round(1.5) = 2
        // Math.round(-1.5) = -1
        // Math.round(-1.6) = -2
        // 保留decimals位小数
        const numStr = String((Math.round(parseFloat(money) * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal)) // 四舍五入，然后固定保留2位小数
        const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1) // 截取小数位
        res = thousandFormat(numStr.slice(0, dotIndex)) + decimals
      }
      return res
    }
  } else {
    return '--'
  }
}
  