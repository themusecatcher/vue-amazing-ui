# 下载文件

::: details  Show Source Code

```ts
function downloadFile (url: string, name: string) {
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
```

:::

## 何时使用

- 下载文件并自定义文件名时

## 基本使用

```vue
<script setup lang="ts">
import { downloadFile } from 'vue-amazing-ui'

donwloadFile('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Markdown.pdf', 'Markdown')
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
url | 文件地址 | string | - | true
name | 自定义文件名，未传时，从文件地址中自动获取文件名称 | string | - | false
