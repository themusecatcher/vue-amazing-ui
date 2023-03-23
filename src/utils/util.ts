// var timestamp = 1626056435
// console.log('dateFormat:', dateFormat(1626056435, 'YYYYMMDD HH:mm:ss', '/')) // 2021/07/12 10:20:35
// console.log('dateFormat:', dateFormat(1626056435, 'YYYYMMDD HH:mm:ss', '', 'CN')) // 2021年07月12日 10时20分35秒
// 默认format：YYYYMMDD，默认分隔符seq：'-'，默认格式类型lang：'US'
export function dateFormat (timestamp: number, format = 'YYYYMMDD', seq = '-', lang = 'US'): number|string {
  if (!isFinite(timestamp)) return '--'
  if (String(timestamp).length === 10) {
    timestamp = timestamp * 1000
  }
  let date = new Date(timestamp)
  let Y: any = date.getFullYear()
  let M: any = date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let D: any = date.getDate()
  D = D < 10 ? '0' + D : D
  let hour: any = date.getHours()
  hour = hour < 10 ? '0' + hour : hour
  let min: any = date.getMinutes()
  min = min < 10 ? '0' + min : min
  let sec: any = date.getSeconds()
  sec = sec < 10 ? '0' + sec : sec
  if (lang === 'CN') {
    Y += '年'
    M += '月'
    D += '日'
    hour += '时'
    min += '分'
    sec += '秒'
    if (format === 'YYYY') {
      return Y // 2021年
    } else if (format === 'YYYYMM') { // 2021年07月
      return `${Y} + ${M}`
    } else if (format === 'YYYYMMDD') { // 2021年07月12日
      return Y + M + D
    } else if (format === 'HH:mm:ss') { // 10时20分35秒
      return hour + min + sec
    } else if (format === 'YYYYMMDD HH:mm') { // 2021年07月12日 10时20分
      return Y + M + D + ' ' + hour + ':' + min
    } else if (format === 'YYYYMMDD HH:mm:ss') { // 2021年07月12日 10时20分35秒
      return Y + M + D + ' ' + hour + min + sec
    } else {
      return '--'
    }
  } else {
    if (format === 'YYYY') {
      return Y // 2021
    } else if (format === 'YYYYMM') { // 2021-07
      return Y + seq + M
    } else if (format === 'YYYYMMDD') { // 2021-07-12
      return Y + seq + M + seq + D
    } else if (format === 'HH:mm:ss') { // 10:20:35
      return hour + ':' + min + ':' + sec
    } else if (format === 'YYYYMMDD HH:mm') { // 2021-07-12 10:20
      return Y + seq + M + seq + D + ' ' + hour + ':' + min
    } else if (format === 'YYYYMMDD HH:mm:ss') { // 2021-07-12 10:20:35
      return Y + seq + M + seq + D + ' ' + hour + ':' + min + ':' + sec
    } else {
      return '--'
    }
  }
}
// 获取静态资源地址
export function getImageUrl (name: any) {
  return new URL(`../assets/images/${name}.jpg`, import.meta.url).href
}
/*
  使用 requestAnimationFrame 模拟 setTimeout 和 setInterval
  fn: 延迟 delay ms后要执行的函数
  delay: 延迟的毫秒数，默认值0
  interval: 默认情况下rafTimeout等效setTimeout，如果要使用setInterval，这传入第三个参数（interval: true）
*/
export function rafTimeout (func: Function, delay = 0, interval = false) {
  let start: any = null
  function timeElapse (timestamp: number) {
    /*
      timestamp参数：与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻
    */
    // console.log('timestamp:', timestamp)
    if (!start) {
      start = timestamp
    }
    const elapsed = timestamp - start
    // console.log('elapsed:', elapsed)
    if (elapsed >= delay) {
      func() // 执行目标函数func
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
export const setDocumentTitle = function (title: string) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
export const domTitle = 'Vue Amazing UI'
