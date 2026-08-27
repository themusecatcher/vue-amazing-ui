# 下载文件 downloadFile

<GlobalElement />

_下载文件并自定义文件名的工具函数，内置同源 `anchor` 与跨域 `iframe` 双下载策略_

::: details Show Source Code

```ts
/** iframe 加载完成后等待检查下载结果的时间（ms），确保内容加载完成 */
const IFRAME_CHECK_DELAY = 1000
/** iframe 触发下载后自动移除的时间（ms），避免内存泄漏 */
const IFRAME_REMOVE_DELAY = 10000
/**
 * 下载策略
 * - auto: 自动分流——同源走 anchor，跨域走 iframe（推荐，默认值）
 * - anchor: a 标签 download 属性下载，文件名纯前端可控，仅同源地址有效
 * - iframe: 隐藏 iframe 触发下载，适合跨域地址，文件名依赖服务端支持 response-content-disposition 参数
 */
type DownloadStrategy = 'auto' | 'anchor' | 'iframe'
interface DownloadOptions {
  /** 打开方式，仅 anchor 策略生效；且仅在 download 属性未真正生效（老浏览器降级 window.open）时才起作用 */
  target?: '_self' | '_blank'
  /** 下载策略，默认 auto */
  strategy?: DownloadStrategy
}
/**
 * 从已解析的 URL 中提取文件名
 * 直接取 pathname 的最后一段，天然剥离查询参数（?）与哈希（#）
 */
function getFileName(parsedUrl: URL): string {
  const segments = parsedUrl.pathname.split('/')
  const rawName = segments[segments.length - 1] || ''
  try {
    return decodeURIComponent(rawName)
  } catch {
    return rawName
  }
}
/**
 * anchor 策略：a 标签 download 属性下载，文件名由前端完全控制，仅同源地址生效
 */
function downloadViaAnchor(parsedUrl: URL, target: '_self' | '_blank', fileName?: string): void {
  const url = parsedUrl.href
  const link = document.createElement('a')
  link.href = url
  link.target = target
  // 特性检测：支持时 download 返回空字符串（falsy），故必须用 in 判断属性是否存在
  if ('download' in link) {
    link.download = fileName || getFileName(parsedUrl)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    link.remove()
    return
  }
  // 极老浏览器不支持 download 属性，降级为直接打开地址
  const openUrl = url.includes('?') ? url : `${url}?download`
  window.open(openUrl, target)
}
/**
 * iframe 策略：隐藏 iframe 触发浏览器原生下载
 * 文件名依赖服务端支持 response-content-disposition 参数（COS/OSS 等对象存储专有）
 */
function downloadViaIframe(url: string, fileName?: string): void {
  let srcUrl = url
  if (fileName) {
    // 按 RFC 5987 规范同时携带 filename 与 filename*，兼容中文文件名
    const disposition = `attachment;filename=${encodeURIComponent(fileName)};filename*=UTF-8''${encodeURIComponent(fileName)}`
    const separator = url.includes('?') ? '&' : '?'
    srcUrl = `${url}${separator}response-content-disposition=${encodeURIComponent(disposition)}`
  }
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.style.height = '0'
  iframe.src = srcUrl
  iframe.onload = () => {
    setTimeout(() => checkIframeError(iframe), IFRAME_CHECK_DELAY)
  }
  document.body.appendChild(iframe)
  setTimeout(() => {
    iframe.remove()
  }, IFRAME_REMOVE_DELAY)
}
/**
 * 尽力检测 iframe 下载是否失败
 * 下载失败时服务端通常返回错误页面（HTML），此时 iframe 的 body 有内容；下载成功时 body 为空
 */
function checkIframeError(iframe: HTMLIFrameElement): void {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    const bodyContent = iframeDoc?.body?.innerHTML
    if (bodyContent) {
      console.error(`文件下载失败：服务器返回错误url: ${iframe.src}`)
    }
  } catch (err) {
    console.debug('无法检查 iframe 内容（通常为跨域限制，可忽略）：', err)
  }
}
/**
 * 统一下载入口，自动选择下载策略
 * 路由规则：
 * - strategy='anchor' → 强制 anchor 策略
 * - strategy='iframe' → 强制 iframe 策略
 * - strategy='auto'（默认）→ 同源走 anchor，跨域走 iframe
 */
export function downloadFile(url: string, fileName?: string, options: DownloadOptions = {}): Promise<void> {
  const { target = '_blank', strategy = 'auto' } = options
  // 以当前页面地址为 base 解析，兼容同源相对路径；URL 非法时提前 reject
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url, location.href)
  } catch (err) {
    console.error(`下载地址解析失败：${url}`, err)
    return Promise.reject(err)
  }
  const isSameHost = parsedUrl.host === location.host
  const shouldUseAnchor = strategy === 'anchor' || (strategy === 'auto' && isSameHost)
  if (shouldUseAnchor) {
    downloadViaAnchor(parsedUrl, target, fileName)
  } else {
    downloadViaIframe(parsedUrl.href, fileName)
  }
  return Promise.resolve()
}
```

:::

## 基本使用

_自动分流：同源走 `anchor`，跨域走 `iframe`_

```vue
<script setup lang="ts">
import { downloadFile } from 'vue-amazing-ui'
// 自动分流下载，未传文件名时从 URL 中提取
downloadFile('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf', 'Markdown')
</script>
```

## 强制 `iframe` 策略

_跨域地址（如对象存储 `CDN`）可强制 `iframe` 策略，文件名依赖服务端支持_

```vue
<script setup lang="ts">
import { downloadFile } from 'vue-amazing-ui'
// 强制 iframe 策略（如 COS 对象存储地址 + 自定义文件名）
downloadFile('https://example.com/file.pdf', '附件.pdf', { strategy: 'iframe' })
</script>
```

## Params

| 参数      | 说明                                          | 类型   | 默认值    |
| --------- | --------------------------------------------- | ------ | --------- |
| url       | 文件的 `URL`，支持网络路径或本地路径          | string | undefined |
| fileName? | 文件的命名，如果未提供，则从 `URL` 中尝试提取 | string | undefined |
| options?  | 下载配置                                      | [DownloadOptions](#downloadoptions) | {} |

### DownloadOptions

| 参数     | 说明 | 类型 | 默认值 |
| -------- | ---- | ---- | ------ |
| target?  | 打开方式，仅 `anchor` 策略生效；且仅在 `download` 属性未真正生效（老浏览器降级 `window.open`）时才起作用 | '_self' &#124; '_blank' | '_blank' |
| strategy? | 下载策略，`auto` 自动分流——同源走 `anchor`，跨域走 `iframe` | 'auto' &#124; 'anchor' &#124; 'iframe' | 'auto' |

## Return

| 类型 | 说明 |
| ---- | ---- |
| Promise&lt;void&gt; | `resolve` 表示已触发下载；`URL` 非法时 `reject` |
