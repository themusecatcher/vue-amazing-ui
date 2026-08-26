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
/**
 * 获取父元素
 *
 * 向上查找元素的直接父元素，若元素已是 documentElement 则返回 null
 *
 * @param {HTMLElement} el 待查询的 DOM 元素
 * @returns {HTMLElement | null} 返回父元素，若传入的是 documentElement 或无父元素则返回 null
 */
export function getParentElement(el: HTMLElement): HTMLElement | null {
  // Document
  if (el === document.documentElement) return null
  return el.parentElement
}
/**
 * 查找最近的可滚动父元素
 *
 * 从给定元素出发，沿父链向上递归查找第一个 overflow 为 auto/scroll/overlay 的可滚动元素，
 * 若一路查到 documentElement 则返回 documentElement（视口滚动），找不到返回 null
 *
 * @param {HTMLElement | null} el 起始元素，可为 null
 * @returns {HTMLElement | null} 返回最近的可滚动父元素或 documentElement，无则返回 null
 */
export function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (el === null) return null
  const parentElement = getParentElement(el)
  if (parentElement === null) return null
  // Document
  if (parentElement === document.documentElement) return document.documentElement
  const isScrollable = (el: HTMLElement): boolean => {
    const { overflow, overflowX, overflowY } = getComputedStyle(el)
    return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
  }
  // Element
  if (isScrollable(parentElement)) return parentElement
  return getScrollParent(parentElement)
}
