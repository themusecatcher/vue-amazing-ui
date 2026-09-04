# 上传 Upload

<GlobalElement />

*文件选择上传和拖拽上传控件*

## 何时使用

- 当需要上传一个或一些文件时
- 当需要展现上传的进度时
- 当需要使用拖拽交互时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMessage } from 'vue-amazing-ui'
import type { UploadFileType } from 'vue-amazing-ui'
const message = useMessage()
const files = ref<UploadFileType[]>([])
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
const imageList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  }
])
const pdfList = ref<UploadFileType[]>([
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('files', files.value)
})
watchEffect(() => {
  console.log('fileList', fileList.value)
})
watchEffect(() => {
  console.log('imageList', imageList.value)
})
watchEffect(() => {
  console.log('pdfList', pdfList.value)
})
function onBeforeImageUpload(file: File) {
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    message.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  console.log('file', file)
  console.log('type', file.type)
  if (!file.type.includes('image')) {
    // 继续上传
    message.error('只能上传图片')
    return false // 停止上传
  }
  return true // 继续上传
}
function onBeforePdfUpload(file: File) {
  const acceptTypes = ['application/pdf']
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    message.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  if (!acceptTypes.includes(file.type)) {
    // 继续上传
    message.error('只能上传 pdf 格式的文件')
    return false // 停止上传
  }
  return true // 继续上传
}
function onCustomRequest(file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用返回 name 和 url
      let res: { name: string; url: string }
      if (file.type === 'application/pdf') {
        res = {
          name: 'Markdown.pdf',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
        }
      } else {
        res = {
          name: '1.jpg',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
        }
      }
      if (res) {
        resolve(res)
      } else {
        reject('upload request fail ...')
      }
    }, 1000)
  })
}
function onDrop(e: DragEvent) {
  console.log('drop', e)
}
function onChange(files: UploadFileType[]) {
  console.log('change', files)
}
function onPreview(file: UploadFileType) {
  console.log('preview', file)
}
function onSuccess(file: UploadFileType) {
  console.log('upload success', file)
  message.success('upload success')
}
function onRemove(file: UploadFileType) {
  console.log('upload remove', file)
  message.success('remove success')
}
function onError(err: unknown) {
  console.log('upload error', err)
  message.error(err instanceof Error ? err.message : String(err))
}
// 上传失败演示：custom 模式 reject 会触发 @error，由使用方自行提示
function onUploadFailRequest(file: File) {
  console.log('upload fail request', file.name)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('模拟上传失败，请重试'))
    }, 1000)
  })
}
</script>

## 基本使用

<Upload v-model:fileList="files" @drop="onDrop" @change="onChange" @preview="onPreview" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { UploadFileType } from 'vue-amazing-ui'
const files = ref<UploadFileType[]>([])
watchEffect(() => {
  console.log('files', files.value)
})
function onDrop(e: DragEvent) {
  console.log('drop', e)
}
function onChange(files: UploadFileType[]) {
  console.log('change', files)
}
function onPreview(file: UploadFileType) {
  console.log('preview', file)
}
</script>
<template>
  <Upload v-model:fileList="files" @drop="onDrop" @change="onChange" @preview="onPreview" />
</template>
```

:::

## 禁用

*只能预览，不能删除和上传*

<br/>

<Upload disabled v-model:fileList="fileList" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileType } from 'vue-amazing-ui'
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
</script>
<template>
  <Upload disabled v-model:fileList="fileList" />
</template>
```

:::

## 限制数量

*通过 `maxCount` 限制上传数量；当为 `1` 时，始终用最新上传的代替当前*

<br/>

<Space vertical>
  <Upload :max-count="1" tip="maxCount: 1" v-model:fileList="files" />
  <Upload :max-count="3" tip="maxCount: 3" v-model:fileList="fileList" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { UploadFileType } from 'vue-amazing-ui'
const files = ref<UploadFileType[]>([])
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('files', files.value)
})
watchEffect(() => {
  console.log('fileList', fileList.value)
})
</script>
<template>
  <Space vertical>
    <Upload :max-count="1" tip="maxCount: 1" v-model:fileList="files" />
    <Upload :max-count="3" tip="maxCount: 3" v-model:fileList="fileList" />
  </Space>
</template>
```

:::

## 多文件上传

*可一次选择多个文件进行上传*

<br/>

<Upload multiple v-model:fileList="files" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { UploadFileType } from 'vue-amazing-ui'
const files = ref<UploadFileType[]>([])
watchEffect(() => {
  console.log('files', files.value)
})
</script>
<template>
  <Upload multiple v-model:fileList="files" />
</template>
```

:::

## 自定义样式布局

*缩略图等比覆盖；上传描述文字使用：上传*

<br/>

<Upload tip="上传" fit="cover" v-model:fileList="fileList" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { UploadFileType } from 'vue-amazing-ui'
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList', fileList.value)
})
</script>
<template>
  <Upload tip="上传" fit="cover" v-model:fileList="fileList" />
</template>
```

:::

*排列间距使用：`'middle'`；自定义上传 `uploading` 动画样式*

<br/>

<Upload
  :space-props="{ gap: 'middle' }"
  :spin-props="{ indicator: 'spin-dot', color: '#ff6900', tip: '上传中...' }"
  v-model:fileList="fileList"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { UploadFileType } from 'vue-amazing-ui'
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList', fileList.value)
})
</script>
<template>
  <Upload
    :space-props="{ gap: 'middle' }"
    :spin-props="{ indicator: 'spin-dot', color: '#ff6900', tip: '上传中...' }"
    v-model:fileList="fileList"
  />
</template>
```

:::

## 操作完成的消息提示

_组件不再内嵌 `Message`，上传成功 / 删除 / 上传失败等提示改由使用方监听 `@success` / `@remove` / `@error` 事件后自行调用（本例使用 `useMessage()` 演示；第二个示例为 `custom` 模式下上传失败触发 `@error` 的场景）_

<Space vertical>
  <Upload
    v-model:fileList="fileList"
    @success="onSuccess"
    @remove="onRemove"
  />
  <Upload
    upload-mode="custom"
    :custom-request="onUploadFailRequest"
    v-model:fileList="fileList"
    @error="onError"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMessage } from 'vue-amazing-ui'
import type { UploadFileType } from 'vue-amazing-ui'
const message = useMessage()
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList', fileList.value)
})
function onSuccess(file: UploadFileType) {
  console.log('upload success', file)
  message.success('upload success')
}
function onRemove(file: UploadFileType) {
  console.log('upload remove', file)
  message.success('remove success')
}
function onError(err: unknown) {
  console.log('upload error', err)
  message.error(err instanceof Error ? err.message : String(err))
}
// 上传失败演示：custom 模式 reject 会触发 @error，由使用方自行提示
function onUploadFailRequest(file: File) {
  console.log('upload fail request', file.name)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('模拟上传失败，请重试'))
    }, 1000)
  })
}
</script>
<template>
  <Space vertical>
    <Upload
      v-model:fileList="fileList"
      @success="onSuccess"
      @remove="onRemove"
    />
    <Upload
      upload-mode="custom"
      :custom-request="onUploadFailRequest"
      v-model:fileList="fileList"
      @error="onError"
    />
  </Space>
</template>
```

:::

## 上传文件校验

*上传文件最大 `500KB`；同时限定文件类型*

<br/>

<Space vertical>
  <Upload
    accept="image/*"
    tip="Only Image"
    :before-upload="onBeforeImageUpload"
    v-model:fileList="imageList"
    @change="onChange"
    @remove="onRemove"
  />
  <Upload
    accept="application/pdf"
    tip="Only PDF"
    :before-upload="onBeforePdfUpload"
    v-model:fileList="pdfList"
    @change="onChange"
    @remove="onRemove"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMessage } from 'vue-amazing-ui'
import type { UploadFileType } from 'vue-amazing-ui'
const message = useMessage()
const imageList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  }
])
const pdfList = ref<UploadFileType[]>([
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('imageList', imageList.value)
})
watchEffect(() => {
  console.log('pdfList', pdfList.value)
})
function onBeforeImageUpload(file: File) {
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    message.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  console.log('file', file)
  console.log('type', file.type)
  if (!file.type.includes('image')) {
    // 继续上传
    message.error('只能上传图片')
    return false // 停止上传
  }
  return true // 继续上传
}
function onBeforePdfUpload(file: File) {
  const acceptTypes = ['application/pdf']
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    message.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  if (!acceptTypes.includes(file.type)) {
    // 继续上传
    message.error('只能上传 pdf 格式的文件')
    return false // 停止上传
  }
  return true // 继续上传
}
function onChange(files: UploadFileType[]) {
  console.log('change', files)
}
function onRemove(file: UploadFileType) {
  console.log('remove', file)
}
</script>
<template>
  <Space vertical>
    <Upload
      accept="image/*"
      tip="Only Image"
      :before-upload="onBeforeImageUpload"
      v-model:fileList="imageList"
      @change="onChange"
      @remove="onRemove"
    />
    <Upload
      accept="application/pdf"
      tip="Only PDF"
      :before-upload="onBeforePdfUpload"
      v-model:fileList="pdfList"
      @change="onChange"
      @remove="onRemove"
    />
  </Space>
</template>
```

:::

## 自定义上传行为

<Upload multiple upload-mode="custom" :custom-request="onCustomRequest" v-model:fileList="fileList" @change="onChange" @remove="onRemove" @success="onSuccess" @error="onError" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMessage } from 'vue-amazing-ui'
import type { UploadFileType } from 'vue-amazing-ui'
const message = useMessage()
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList', fileList.value)
})
function onCustomRequest(file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用返回 name 和 url
      let res: { name: string; url: string }
      if (file.type === 'application/pdf') {
        res = {
          name: 'Markdown.pdf',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
        }
      } else {
        res = {
          name: '1.jpg',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
        }
      }
      if (res) {
        resolve(res)
      } else {
        reject('upload request fail ...')
      }
    }, 1000)
  })
}
function onChange(files: UploadFileType[]) {
  console.log('change', files)
}
function onRemove(file: UploadFileType) {
  console.log('remove', file)
}
function onSuccess(file: UploadFileType) {
  console.log('upload success', file)
  message.success('upload success')
}
function onError(err: unknown) {
  console.log('upload error', err)
  message.error(err instanceof Error ? err.message : String(err))
}
</script>
<template>
  <Upload
    multiple
    upload-mode="custom"
    :custom-request="onCustomRequest"
    v-model:fileList="fileList"
    @change="onChange"
    @remove="onRemove"
    @success="onSuccess"
    @error="onError"
  />
</template>
```

:::

## 自定义分片上传

<Upload upload-mode="custom" :custom-request="onCustomSliceUpload" v-model:fileList="fileList" @change="onChange" @remove="onRemove" @success="onSuccess" @error="onError" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMessage } from 'vue-amazing-ui'
import type { UploadFileType } from 'vue-amazing-ui'
const message = useMessage()
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList', fileList.value)
})
import { sliceFile } from './sliceFile'
function onCustomSliceUpload(file: File) {
  return new Promise((resolve, reject) => {
    console.time('sliceFile')
    sliceFile(file).then((chunks) => {
      console.log('chunks', chunks)
      console.timeEnd('sliceFile')
      setTimeout(() => {
        // 模拟接口调用返回 name 和 url
        let res: { name: string; url: string }
        if (file.type === 'application/pdf') {
          res = {
            name: 'Markdown.pdf',
            url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
          }
        } else {
          res = {
            name: '1.jpg',
            url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
          }
        }
        if (res) {
          resolve(res)
        } else {
          reject('upload request fail ...')
        }
      }, 1000)
    })
  })
}
function onChange(files: UploadFileType[]) {
  console.log('change', files)
}
function onRemove(file: UploadFileType) {
  console.log('remove', file)
}
function onSuccess(file: UploadFileType) {
  console.log('upload success', file)
  message.success('upload success')
}
function onError(err: unknown) {
  console.log('upload error', err)
  message.error(err instanceof Error ? err.message : String(err))
}
</script>
<template>
  <Upload
    multiple
    upload-mode="custom"
    :custom-request="onCustomSliceUpload"
    v-model:fileList="fileList"
    @change="onChange"
    @remove="onRemove"
    @success="onSuccess"
    @error="onError"
  />
</template>
```

:::

::: details sliceFile Source Code

```ts
const CHUNK_SIZE = 1024 * 1024 * 5 // 5MB 分片大小
// navigator.hardwareConcurrency 返回用户计算机上可用于运行线程的逻辑处理器数量
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 并发执行的线程数
export function sliceFile(file: File) {
  return new Promise((resolve, reject) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 分片数量
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT) // 每个线程分配的分片数量
    const result: any[] = []
    let finishCount = 0
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 依次创建 web worker 线程
      const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }) // // module 为了线程内部可以导入其他模块
      const start = i * threadChunkCount
      const end = Math.min(start + threadChunkCount, chunkCount)
      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE
      })
      worker.onmessage = (e: MessageEvent) => {
        worker.terminate()
        result[i] = e.data
        finishCount++
        if (finishCount === THREAD_COUNT) {
          // 所有线程均完成时返回结果
          resolve(result.flat())
        }
      }
      worker.onerror = (err) => {
        worker.terminate()
        reject(err)
      }
    }
  })
}
```

:::

::: details worker Source Code

```ts
import SparkMD5 from 'spark-md5'
// 创建分片
function createFileChunk(file: File, index: number, chunkSize: number) {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize
    const end = Math.min(file.size, start + chunkSize)
    const spark = new SparkMD5.ArrayBuffer() // https://github.com/satazor/js-spark-md5
    const fileReader = new FileReader()
    const blob = file.slice(start, end)
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob
      })
    }
    fileReader.onerror = (e) => {
      reject(new Error(`文件读取过程中发生错误: ${e}`))
    }
    fileReader.readAsArrayBuffer(blob)
  })
}
// web worker 通信
onmessage = async (e: MessageEvent) => {
  const { file, start, end, CHUNK_SIZE } = e.data
  const result = []
  for (let i = start; i < end; i++) {
    const chunkPromise = createFileChunk(file, i, CHUNK_SIZE)
    result.push(chunkPromise)
  }
  const chunks = await Promise.all(result)
  postMessage(chunks)
}
```

:::

## APIs

### Upload

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| accept | 接受上传的文件类型，与`<input type="file" />`的 `accept` 属性一致，参考 [input accept Attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/accept) | string | '\*' |
| multiple | 是否支持多选文件，开启后可选择多个文件 | boolean | false |
| maxCount | 限制上传数量。当为 `1` 时，始终用最新上传的文件代替当前文件 | number | undefined |
| tip | 上传描述文字 | string | 'Upload' |
| fit | 预览图片缩放规则，参考 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)，仅当上传文件为图片时生效 | 'fill' &#124; 'contain' &#124; 'cover' &#124; 'none' &#124; 'scale-down' | 'contain' |
| draggable | 是否支持拖拽上传，开启后可拖拽文件到选择框上传 | boolean | true |
| disabled | 是否禁用，只能预览，不能删除和上传 | boolean | false |
| spaceProps | `Space` 组件属性配置，参考 [Space Props](./space.md#space)，用于配置多个文件时的排列方式 | [SpaceProps](./space.md#space) | {} |
| spinProps | `Spin` 组件属性配置，参考 [Spin Props](./spin.md#spin)，用于配置上传中样式 | [SpinProps](./spin.md#spin) | {} |
| imageProps | `Image` 组件属性配置，参考 [Image Props](./image.md#image)，用于配置图片预览 | [ImageProps](./image.md#image) | {} |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，返回 `false` 则停止上传，返回 `true` 开始上传；支持返回一个 `Promise` 对象（如服务端校验等），`Promise` 对象 `reject` 时停止上传，`resolve` 时开始上传；通常用来校验用户上传的文件格式和大小 | (file: File) => boolean &#124; void &#124; Promise&lt;unknown&gt; | () => true |
| uploadMode | 上传文件的方式，可选 `'base64'` &#124; `'custom'` | 'base64' &#124; 'custom' | 'base64' |
| customRequest | 自定义上传行为，只有 `uploadMode: custom` 时，才会使用 `customRequest` 自定义上传行为；未配置时默认返回空结果，避免调用 `.then` 报错 | (file: File) => Promise&lt;[FileType](#filetype-type)&gt; | () => Promise.resolve({ url: '' }) |
| fileList <Tag color="cyan">v-model</Tag> | 已上传的文件列表 | [FileType](#filetype-type)[] | [] |

### FileType Type

| 名称               | 说明                           | 类型   | 默认值    |
| :----------------- | :----------------------------- | :----- | :-------- |
| name?              | 文件名                         | string | undefined |
| url                | 文件地址                       | string | undefined |
| [propName: string] | 用于包含带有任意数量的其他属性 | any    | undefined |

## Slots

| 名称 | 说明               | 类型       |
| :--- | :----------------- | :--------- |
| tip  | 自定义上传描述文字 | v-slot:tip |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| drop | 当文件被拖入上传区域时的回调 | (e: [DragEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent/DragEvent)) => void |
| change | 上传文件改变时的回调 | (files: [FileType](#filetype-type)[]) => void |
| preview | 点击预览时的回调 | (file: [FileType](#filetype-type)) => void |
| remove | 点击移除文件时的回调 | (file: [FileType](#filetype-type)) => void |
| success | 上传成功时的回调 | (file: [FileType](#filetype-type), files: [FileType](#filetype-type)[]) => void |
| error | 上传失败时的回调 | (error: any) => void |
