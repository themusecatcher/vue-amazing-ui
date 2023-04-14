import { rafTimeout } from '../../packages'
// 获取静态资源地址
export function getImageUrl (name: any): string {
  return new URL(`../assets/images/${name}.jpg`, import.meta.url).href
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
      rafTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
export const domTitle = 'Vue Amazing UI'
