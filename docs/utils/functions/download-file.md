# 下载文件 downloadFile

<GlobalElement />

*下载文件并自定义文件名的工具函数*

::: details Show Source Code

```ts
/**
 * 下载文件并自定义文件名
 *
 * @param url 文件的 URL，支持网络路径或本地路径
 * @param fileName 文件名；文件的命名，如果未提供，则从 URL 中尝试提取
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
```

:::

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
url | 文件的 `URL`，支持网络路径或本地路径 | string | undefined
fileName? | 文件的命名，如果未提供，则从 `URL` 中尝试提取 | string | undefined
