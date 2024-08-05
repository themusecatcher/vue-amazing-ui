# 下载文件 downloadFile

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

::: details Show Source Code

```ts
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

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
url | 文件地址 | string | - | true
name | 自定义文件名，未传时，从文件地址中自动提取文件名称 | string | - | false
