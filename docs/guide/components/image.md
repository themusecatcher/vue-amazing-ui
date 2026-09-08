# 图片 Image

<GlobalElement />

*可预览的图片*

## 何时使用

- 需要展示图片和预览时
- 加载图片时显示 `loading`

> [!WARNING]
> 下方示例图片以 `cdn.jsdelivr.net` 为入口，默认的「下载」按钮会失效，原因如下：
>
> 内置 `downloadFile` 对跨域地址走 `iframe` 策略，需由服务端识别 `response-content-disposition` 参数并下发 `Content-Disposition: attachment`，浏览器才会触发下载；而 `cdn.jsdelivr.net` 是普通 `CDN`，不识别该参数（仅 `COS / OSS` 等对象存储支持），响应中不含 `attachment`，图片仅在隐藏的 `iframe` 内渲染。因此请求虽返回 `200`，却不会触发下载，控制台也不会有任何报错——跨域 `iframe` 内容禁止读取，内置的错误检测同样失效，表现为「静默失败」。
>
> 下方的「自定义下载」小节演示了可用的 `XHR + Blob` 方案：以二进制流读取图片（需图床开启 `CORS`，本示例图床返回 `Access-Control-Allow-Origin: *`）后转 Blob URL，再用 `a` 标签 `download` 属性强制下载，不受上述限制。

<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
/**
 * 自定义下载示例：用 XHR + Blob 下载跨域图床图片
 * 内置 downloadFile 的 iframe 策略受图床 X-Frame-Options 限制，改用 XHR 取二进制后通过 Blob 触发下载，不受该限制
 */
function customDownload(url: string, fileName?: string) {
  // 以二进制流方式请求图片，需要图床开启 CORS 才能跨域读取
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 将二进制流转为本地 Blob URL，再通过 a 标签的 download 属性强制下载（blob 同源，download 始终生效）
      const blobUrl = URL.createObjectURL(xhr.response)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = fileName || url.split('?')[0].split('/').pop() || 'download'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl) // 释放 Blob URL，避免内存泄漏
    }
  }
  xhr.send()
}
</script>

## 基本使用

<Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />

::: details Show Code

```vue
<template>
  <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
</template>
```

:::

## 多张图片预览

*可循环切换图片，并支持键盘 (`left` / `right` / `up` / `down`) 按键切换*

<br/>

<Image :src="images" loop />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" loop />
</template>
```

:::

## 禁用预览

<Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" disabled />

::: details Show Code

```vue
<template>
  <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" disabled />
</template>
```

:::

## 自定义样式

*自定义宽高；同时图片覆盖容器；预览文本设为 `preview`*

<br/>

<Image :src="images" :width="[100, 200, 100, 200, 100]" :space-props="{ width: 416 }" fit="cover" loop>
  <template #preview>
    <p class="preview-txt">preview</p>
  </template>
</Image>


<style lang="less" scoped>
.preview-txt {
  display: inline-block;
  font-size: 16px;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" :width="[100, 200, 100, 200, 100]" :space-props="{ width: 416 }" fit="cover" loop>
    <template #preview>
      <p class="preview-txt">preview</p>
    </template>
  </Image>
</template>
<style lang="less" scoped>
.preview-txt {
  display: inline-block;
  font-size: 16px;
}
</style>
```

:::

## 自定义预览图片样式

<Image :src="images" :preview-image-style="{ background: '#fff', padding: '12px', borderRadius: '8px' }" loop />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" :preview-image-style="{ background: '#fff', padding: '12px', borderRadius: '8px' }" loop />
</template>
```

:::

## 自定义排列方式 & 加载中样式

<Image
  :src="images"
  :space-props="{ width: 332, gap: 16 }"
  :spin-props="{ tip: 'loading', indicator: 'spin-line', color: '#fadb14' }"
  loop
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image
    :src="images"
    :space-props="{ width: 332, gap: 16 }"
    :spin-props="{ tip: 'loading', indicator: 'spin-line', color: '#fadb14' }"
    loop
  />
</template>
```

:::

## 无边框

<Image :src="images" :bordered="false" fit="cover" loop />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" :bordered="false" fit="cover" loop />
</template>
```

:::

## 相册模式

<Image :src="images" album loop />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" album loop />
</template>
```

:::

## 自定义预览配置

*更改缩放比率和最大最小缩放比例*

<br/>

<Image
  :zoom-ratio="0.2"
  :min-zoom-scale="0.5"
  :max-zoom-scale="2"
  src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg"
/>

::: details Show Code

```vue
<template>
  <Image
    :zoom-ratio="0.2"
    :min-zoom-scale="0.5"
    :max-zoom-scale="2"
    src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg"
  />
</template>
```

:::

## 下载配置

*通过 `downloadOptions` 配置内置下载策略（`anchor` / `iframe`）与打开方式（`_self` / `_blank`）*

*下方示例强制 `anchor` 策略并设 `target="_blank"`，跨域下 `download` 属性失效，点击后在新窗口打开图片*

<br/>

<Image
  album
  :src="images"
  :download-options="{ strategy: 'anchor', target: '_blank' }"
  loop
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image
    album
    :src="images"
    :download-options="{ strategy: 'anchor', target: '_blank' }"
    loop
  />
</template>
```

:::

## 自定义下载

*跨域图床（如设置 `X-Frame-Options` 拒绝 `iframe` 的 CDN）下载受限时，内置 `downloadFile` 可能无法满足：可通过 `downloadOptions` 调整内置下载策略，或通过 `customDownload` 提供完全自定义的下载方法*

*下方示例演示了用 `XHR + Blob` 绕过 `X-Frame-Options` 限制下载跨域图床图片*

<br/>

<Image
  album
  :src="images"
  :custom-download="customDownload"
  loop
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
/**
 * 自定义下载示例：用 XHR + Blob 下载跨域图床图片
 * 内置 downloadFile 的 iframe 策略受图床 X-Frame-Options 限制，改用 XHR 取二进制后通过 Blob 触发下载，不受该限制
 */
function customDownload(url: string, fileName?: string) {
  // 以二进制流方式请求图片，需要图床开启 CORS 才能跨域读取
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 将二进制流转为本地 Blob URL，再通过 a 标签的 download 属性强制下载（blob 同源，download 始终生效）
      const blobUrl = URL.createObjectURL(xhr.response)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = fileName || url.split('?')[0].split('/').pop() || 'download'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl) // 释放 Blob URL，避免内存泄漏
    }
  }
  xhr.send()
}
</script>
<template>
  <Image album :src="images" :custom-download="customDownload" loop />
</template>
```

:::

## APIs

### Image

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| src | 图像地址或图像地址数组 | string &#124; [Image](#image-type)[] | undefined |
| name | 图像名称，未设置时自动从图像地址 `src` 中提取 | string | undefined |
| width | 图像宽度，单位 `px` | string &#124; number &#124; (string &#124; number)[] | 100 |
| height | 图像高度，单位 `px` | string &#124; number &#124; (string &#124; number)[] | 100 |
| disabled | 是否禁用图像预览 | boolean | false |
| bordered | 是否显示边框 | boolean | true |
| fit | 图片在容器内的的适应类型，参考 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) | 'contain' &#124; 'fill' &#124; 'cover' &#124; 'none' &#124; 'scale-down' | 'contain' |
| preview | 预览文本 | string &#124; slot | '预览' |
| previewImageStyle | 自定义预览图片时 `img` 元素的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| spaceProps | `Space` 组件属性配置，参考 [Space Props](./space.md#space)，用于配置多张展示图片时的排列方式 | [SpaceProps](./space.md#space) | {} |
| spinProps | `Spin` 组件属性配置，参考 [Spin Props](./spin.md#spin)，用于配置图片加载中样式 | [SpinProps](./spin.md#spin) | {} |
| previewSpinProps | `Spin` 组件属性配置，参考 [Spin Props](./spin.md#spin)，用于配置预览图片加载中样式 | [SpinProps](./spin.md#spin) | {} |
| zoomRatio | 每次缩放比率 | number | 0.1 |
| minZoomScale | 最小缩放比例 | number | 0.1 |
| maxZoomScale | 最大缩放比例 | number | 10 |
| resetOnDbclick | 缩放移动旋转图片后，是否可以双击还原 | boolean | true |
| draggable | 是否可以拖动图片 | boolean | false |
| loop | 是否可以循环切换图片 | boolean | false |
| album | 是否相册模式，即从一张展示图片点开相册 | boolean | false |
| downloadOptions | 图片下载配置，透传给内置 `downloadFile` 的第三个参数 `options`；默认 `auto` 策略（同源 `anchor` / 跨域 `iframe`） | { target?: '_self' &#124; '_blank'; strategy?: 'auto' &#124; 'anchor' &#124; 'iframe' } | undefined |
| customDownload | 自定义下载方法，提供时优先于内置 `downloadFile` 使用；用于解决跨域图床下载受限（如 `X-Frame-Options`、无 `CORS`）等内置策略无法满足的场景 | (url: string, fileName?: string) => void &#124; Promise&lt;void&gt; | undefined |

### Image Type

| 名称  | 说明     | 类型   | 默认值    |
| :---- | :------- | :----- | :-------- |
| src   | 图像地址 | string | undefined |
| name? | 图像名称，未设置时自动从图像地址 `src` 中提取 | string | undefined |

## Slots

| 名称    | 说明           | 类型           |
| :------ | :------------- | :------------- |
| preview | 自定义预览文本 | v-slot:preview |

## Methods

| 名称    | 说明                                   | 类型                    |
| :------ | :------------------------------------- | :---------------------- |
| preview | 预览索引为 `index` 的图片，从 `0` 开始 | (index: number) => void |
