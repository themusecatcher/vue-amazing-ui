# 下载文件 downloadFile

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者 !"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

::: details Show Source Code

```ts
/**
 * 下载文件并自定义文件名
 * 
 * @param url 文件的 URL
 * @param fileName 文件名；文件的命名，如果未提供，则从 URL 中尝试提取
 */
export function downloadFile(url: string, fileName?: string): void {
  url = encodeURI(url) // 对 URL 进行编码防止 XSS 攻击
  let name = ''
  if (fileName) {
    name = fileName
  } else {
    // 提取文件名
    const urlObj = new URL(url)
    name = urlObj.pathname.split('/').pop() || 'download'
  }
  const xhr = new XMLHttpRequest() // 创建 XMLHttpRequest 对象用于文件下载
  xhr.open('GET', url, true)
  xhr.responseType = 'blob' // 设置响应类型为 blob，以便处理二进制数据
  xhr.onerror = function () {
    console.error('下载文件失败')
  }
  xhr.onload = function () {
    if (xhr.status === 200) {
      const blob = xhr.response
      const link = document.createElement('a')
      const body = document.querySelector('body')
      link.href = window.URL.createObjectURL(blob)
      link.download = name
      link.style.display = 'none'
      body?.appendChild(link)
      link.click()
      body?.removeChild(link) // 下载完成后，移除链接并释放 blob 对象 URL
      window.URL.revokeObjectURL(link.href)
    } else {
      console.error('请求文件失败，状态码：', xhr.status)
    }
  }
  xhr.send() // 发送请求
}
```

:::

## 何时使用

- 下载文件并自定义文件名时

## 基本使用

```vue
<script setup lang="ts">
import { downloadFile } from 'vue-amazing-ui'

donwloadFile('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf', 'Markdown')
</script>
```

## Params

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
url | 文件的 `URL` | string | undefined
fileName? | 文件的命名，如果未提供，则从 `URL` 中尝试提取 | string | undefined
