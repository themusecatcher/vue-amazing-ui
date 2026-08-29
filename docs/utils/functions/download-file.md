# 下载文件 downloadFile

<GlobalElement />

_下载文件并自定义文件名的工具函数，内置同源 `anchor` 与跨域 `iframe` 双下载策略_

::: details Show Source Code

```ts
/**
 * 文件下载工具
 *
 * 统一入口 downloadFile，内置两种下载策略：
 *
 * | 策略   | 适用场景                  | 文件名控制                                              | target 控制 |
 * | ------ | ------------------------- | ------------------------------------------------------- | ----------- |
 * | anchor | 同源地址（自有业务接口等）| ✅ 纯前端生效（download 属性）                          | ⚠️ 见下     |
 * | iframe | 跨域地址（对象存储 CDN 等）| ⚠️ 依赖服务端支持 response-content-disposition（COS/OSS 专有参数） | ❌     |
 *
 * 关于 target：仅 anchor 策略、且 download 属性未真正生效（如老浏览器降级到
 * window.open）时才有意义；一旦 download 属性生效，浏览器会忽略 target。
 *
 * 两种策略能力互补，auto 策略按「同源走 anchor，跨域走 iframe」自动分流，
 * 调用方通常无需关心底层实现。
 */

/** iframe 加载完成后等待检查下载结果的时间（ms），确保内容加载完成 */
const IFRAME_CHECK_DELAY = 1000

/** iframe 触发下载后自动移除的时间（ms），避免内存泄漏 */
const IFRAME_REMOVE_DELAY = 10000

/**
 * 下载策略
 * - auto: 自动分流——同源走 anchor，跨域走 iframe（推荐，默认值）
 * - anchor: a 标签 download 属性下载，文件名纯前端可控，仅同源地址有效
 * - iframe: 隐藏 iframe 触发下载，适合跨域地址，文件名依赖服务端支持 response-content-disposition 参数
 *            （COS/OSS 等对象存储专有）；未传文件名时同样从 URL 中提取
 */
export type DownloadStrategy = 'auto' | 'anchor' | 'iframe'

export interface DownloadOptions {
  /**
   * 打开方式，仅 anchor 策略生效；且仅在 download 属性未真正生效
   * （老浏览器降级 window.open）时才起作用
   */
  target?: '_self' | '_blank'
  /** 下载策略，默认 auto */
  strategy?: DownloadStrategy
}

/**
 * 从已解析的 URL 中提取文件名
 *
 * 直接取 pathname 的最后一段，天然剥离查询参数（?）与哈希（#），
 * 无需手动切分。
 *
 * @param parsedUrl 已解析成功的 URL 对象
 * @returns 提取的文件名；无有效路径段时返回空字符串
 */
function getFileName(parsedUrl: URL): string {
  const segments = parsedUrl.pathname.split('/')
  const rawName = segments[segments.length - 1] || ''
  try {
    return decodeURIComponent(rawName)
  } catch {
    // 路径段含非法百分号编码时 decodeURIComponent 会抛异常，此时原样返回
    return rawName
  }
}

/**
 * anchor 策略：a 标签 download 属性下载
 *
 * download 是 HTML5 标准属性，由浏览器原生实现：
 * 1. 无论服务端响应头是 inline 还是 attachment，都强制触发下载
 * 2. 文件名由前端完全控制，零服务端依赖
 *
 * 局限：仅同源地址生效；跨域地址下浏览器会忽略 download 属性。
 *
 * @param parsedUrl 已解析的 URL 对象（用于兜底提取文件名）
 * @param target 打开方式
 * @param fileName 期望文件名，未传则从 URL 提取
 */
function downloadViaAnchor(parsedUrl: URL, target: '_self' | '_blank', fileName?: string): void {
  const url = parsedUrl.href
  const link = document.createElement('a')
  link.href = url
  link.target = target

  // 特性检测：支持时 download 返回空字符串（falsy），故必须用 in 判断属性是否存在，
  // 不能用 link.download !== undefined（恒为 true）或 if (link.download)（空串误判）
  if ('download' in link) {
    link.download = fileName || getFileName(parsedUrl)
    // 部分浏览器（如个别 Firefox 版本）要求元素在文档中才能触发 click 下载，
    // 挂载 → 触发 → 移除，兼容性最稳妥
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
 *
 * 生效链路（是否下载、文件名是否生效均由服务端决定）：
 *   前端拼接 response-content-disposition 参数
 *   → 服务端识别该参数（仅 COS/OSS 等对象存储支持，属其 SDK 专有参数）
 *   → 服务端改写响应头 Content-Disposition: attachment;filename=xxx
 *   → 浏览器按响应头触发下载
 *
 * 注意：
 * 1. 普通服务端不认识该参数，文件名会被忽略，此时是否下载完全取决于服务端响应头：
 *    inline 类型（如未设置 Content-Disposition 的 PDF）会在 iframe 内预览而非下载
 * 2. 跨域限制导致前端无法读取 iframe 内容，下载失败只能依赖 checkIframeError 尽力检测
 *
 * @param parsedUrl 已解析的 URL 对象（用于兜底提取文件名）
 * @param fileName 期望文件名，未传则从 URL 提取
 */
function downloadViaIframe(parsedUrl: URL, fileName?: string): void {
  const url = parsedUrl.href
  let srcUrl = url
  // 未传文件名时从 URL 兜底提取，与 anchor 策略行为保持一致；
  // 携带 attachment 可强制跨域图片 / PDF 等可预览类型触发下载，而非在 iframe 内预览
  const finalName = fileName || getFileName(parsedUrl)
  // 判空守卫：URL 无有效文件名末段（如纯域名）时提取结果为空，
  // 此时不拼参数，避免发出 filename 为空的畸形 Content-Disposition 而被服务端拒绝
  if (finalName) {
    // 按 RFC 5987 规范同时携带 filename 与 filename*，兼容中文文件名
    const disposition = `attachment;filename=${encodeURIComponent(finalName)};filename*=UTF-8''${encodeURIComponent(finalName)}`
    const separator = url.includes('?') ? '&' : '?'
    srcUrl = `${url}${separator}response-content-disposition=${encodeURIComponent(disposition)}`
  }

  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.style.height = '0'
  iframe.src = srcUrl
  iframe.onload = () => {
    // 延迟检查，确保 iframe 内容加载完成。
    // 注意：本定时器从 onload 起算，与下方 IFRAME_REMOVE_DELAY（从 appendChild 起算）
    // 相互独立；若资源加载极慢（onload 晚于移除时机），检测会落在 iframe 移除之后而失效，
    // 后果仅是少打一条错误日志，不影响下载本身。
    setTimeout(() => checkIframeError(iframe), IFRAME_CHECK_DELAY)
  }
  document.body.appendChild(iframe)

  // 下载触发后及时移除 iframe，避免内存泄漏
  setTimeout(() => {
    iframe.remove()
  }, IFRAME_REMOVE_DELAY)
}

/**
 * 尽力检测 iframe 下载是否失败
 *
 * 原理：下载失败时服务端通常返回错误页面（HTML 内容），
 * 此时 iframe 的 body 有内容；下载成功时 body 为空。
 * 局限：跨域场景下浏览器禁止读取 iframe 内容，检测会抛异常而失效。
 */
function checkIframeError(iframe: HTMLIFrameElement): void {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    const bodyContent = iframeDoc?.body?.innerHTML
    if (bodyContent) {
      console.error(`文件下载失败：服务器返回错误url: ${iframe.src}`)
    }
  } catch (err) {
    // 跨域限制导致无法读取 iframe 内容，检测失效属预期行为，用 debug 级别避免污染业务方控制台
    console.debug('无法检查 iframe 内容（通常为跨域限制，可忽略）：', err)
  }
}

/**
 * 统一下载入口，自动选择下载策略
 *
 * 路由规则：
 * - strategy='anchor' → 强制 anchor 策略
 * - strategy='iframe' → 强制 iframe 策略
 * - strategy='auto'（默认）→ 同源走 anchor，跨域走 iframe
 *
 * auto 分流的依据：
 * - 同源用 anchor：文件名纯前端可控 + 强制下载，能力最强
 * - 跨域用 iframe：anchor 的 download 属性跨域失效，iframe 是唯一通用兜底
 *
 * 说明：仅负责「触发」下载。iframe 跨域场景下浏览器禁止读取内容，前端无法可靠
 * 判断下载成败，故返回值不携带成败信息，触发成功即 resolve。
 *
 * @param url 下载地址，支持绝对 URL 与同源相对路径
 * @param fileName 期望的下载文件名；未传时两种策略均从 URL 中提取。anchor 策略纯前端生效，
 *                 iframe 策略通过 response-content-disposition 参数传递给服务端（仅 COS/OSS 识别）
 * @param options 下载配置（打开方式、下载策略）
 * @returns Promise<void>，resolve 表示已触发下载；URL 非法时 reject
 *
 * @example
 * // 自动分流：同源走 anchor，跨域走 iframe
 * downloadFile('https://example.com/file.pdf')
 *
 * // 同源相对路径 + 自定义文件名
 * downloadFile('/api/export?id=1', '导出.xlsx')
 *
 * // 强制 iframe 策略（如 COS 对象存储地址 + 自定义文件名）
 * downloadFile(url, '附件.pdf', { strategy: 'iframe' })
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
    downloadViaIframe(parsedUrl, fileName)
  }
  return Promise.resolve()
}
```

:::

## 基本使用

_自动分流：同源走 `anchor`，跨域走 `iframe`；未传文件名时从 `URL` 中自动提取_

```vue
<script setup lang="ts">
import { downloadFile } from 'vue-amazing-ui'
// 自动分流下载，未传文件名，自动提取为 Markdown.pdf
downloadFile('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf')
</script>
```

::: warning
注：上方地址仅用于演示跨域调用方式。`cdn.jsdelivr.net` 不识别 `response-content-disposition` 参数，实际不会触发下载，详见下方「注意事项」。
:::

## 强制 `iframe` 策略

_跨域地址（如对象存储 `CDN`）可强制 `iframe` 策略，文件名依赖服务端支持_

```vue
<script setup lang="ts">
import { downloadFile } from 'vue-amazing-ui'
// 强制 iframe 策略（如 COS 对象存储地址 + 自定义文件名）
downloadFile('https://example.com/file.pdf', '附件.pdf', { strategy: 'iframe' })
</script>
```

## 注意事项

_`iframe` 策略依赖服务端支持，跨域下载前请先确认文件所在服务是否满足要求_

`iframe` 策略的完整链路为：<br/>
前端拼接 `response-content-disposition` 参数 → 服务端识别该参数并下发响应头 `Content-Disposition: attachment` → 浏览器据此触发下载。

<br/>

因此：
- **仅 COS / OSS 等对象存储识别该参数**。普通 `CDN`、静态文件服务器会直接忽略它，此时响应中不含 `attachment`，文件仅在隐藏的 `iframe` 内渲染（图片被预览、`PDF` 被内嵌展示），不会触发下载。
- **失败是静默的**。上述情况下网络请求返回 `200`，控制台没有任何报错；又因跨域 `iframe` 内容禁止读取，内置的失败检测同样失效，表现为「请求成功但没有下载」。

若下载未触发，可按以下顺序排查与应对：

1. 确认文件所在服务是否支持 `response-content-disposition` 参数，不支持则改用支持该参数的对象存储地址
2. 同源地址使用默认 `auto` 策略即可：`anchor` 策略由前端 `download` 属性强制下载，不依赖服务端
3. 跨域图床（如不识别该参数的 `CDN`、设置了 `X-Frame-Options` 的站点），可自行用 `XHR` 读取二进制后转 `Blob URL` 再下载，参考 [图片 Image 的自定义下载示例](/guide/components/image.html#自定义下载)

> `anchor` 策略没有上述限制，但仅在同源地址生效；跨域地址下浏览器会忽略 `download` 属性。

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
