# 上传 Upload

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*文件选择上传和拖拽上传控件*

## 何时使用

- 当需要上传一个或一些文件时
- 当需要展现上传的进度时
- 当需要使用拖拽交互时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const uploadRef = ref()
const files = ref([])
const fileList = ref([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf'
  }
])
const imageList = ref([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg'
  }
])
watchEffect(() => {
  console.log('files:', files.value)
})
watchEffect(() => {
  console.log('fileList:', fileList.value)
})
watchEffect(() => {
  console.log('imageList:', imageList.value)
})
function onBeforeUpload(file: File) {
  const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    uploadRef.value.warning('文件必须小于500KB')
    return false // 停止上传
  }
  if (!acceptTypes.includes(file.type)) {
    // 继续上传
    uploadRef.value.error('只能上传jpg、jpeg、png、pdf格式的文件')
    return false // 停止上传
  }
  return true // 继续上传
}
function onCustomRequest(file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用返回name和url
      if (file.type === 'application/pdf') {
        var res = {
          name: 'Markdown.pdf',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf'
        }
      } else {
        var res = {
          name: '1.jpg',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg'
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
interface FileType {
  name?: string // 文件名
  url: any // 文件地址
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
function onChange(files: FileType[]) {
  console.log('change:', files)
}
function onRemove(file: FileType) {
  console.log('remove:', file)
}
</script>

## 基本使用

<Upload v-model:file-list="files" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const files = ref([])
watchEffect(() => {
  console.log('files:', files.value)
})
</script>
<template>
  <Upload v-model:file-list="files" />
</template>
```

:::

## 禁用

*只能预览，不能删除和上传*

<br/>

<Upload disabled v-model:file-list="imageList" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const imageList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"
  }
])
</script>
<template>
  <Upload disabled v-model:file-list="imageList" />
</template>
```

:::

## 多文件上传

*限制上传数量为3*

<br/>

<Upload multiple :max-count="3" v-model:file-list="fileList" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList:', fileList.value)
})
</script>
<template>
  <Upload multiple :max-count="3" v-model:file-list="fileList" />
</template>
```

:::

## 自定义样式

*缩略图等比覆盖；上传描述文字使用：上传；间距设为16px*

<br/>

<Upload :max-count="3" tip="上传" fit="cover" :gap="16" v-model:file-list="fileList" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList:', fileList.value)
})
</script>
<template>
  <Upload :max-count="3" tip="上传" fit="cover" :gap="16" v-model:file-list="fileList" />
</template>
```

:::

## 限制文件大小和类型

*上传文件最大500KB，同时文件类型只能是图片*

<br/>

<Upload
  ref="uploadRef"
  accept="image/*"
  :max-count="3"
  :before-upload="onBeforeUpload"
  v-model:file-list="imageList"
  @change="onChange"
  @remove="onRemove" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const uploadRef = ref()
const imageList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"
  }
])
watchEffect(() => {
  console.log('imageList:', imageList.value)
})
function onBeforeUpload(file: File) {
  const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    uploadRef.value.warning('文件必须小于500KB')
    return false // 停止上传
  }
  if (!acceptTypes.includes(file.type)) {
    // 继续上传
    uploadRef.value.error('只能上传jpg、jpeg、png、pdf格式的文件')
    return false // 停止上传
  }
  return true // 继续上传
}
function onChange (files: object[]) {
  console.log('change:', files)
}
function onRemove (file: object) {
  console.log('remove:', file)
}
</script>
<template>
  <Upload
    ref="uploadRef"
    accept="image/*"
    :max-count="3"
    :before-upload="onBeforeUpload"
    v-model:file-list="imageList"
    @change="onChange"
    @remove="onRemove" />
</template>
```

:::

## 自定义上传行为

<Upload
  multiple
  :max-count="5"
  upload-mode="custom"
  :custom-request="onCustomRequest"
  v-model:file-list="fileList"
  @change="onChange"
  @remove="onRemove" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList:', fileList.value)
})
function onCustomRequest(file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用返回name和url
      if (file.type === 'application/pdf') {
        var res = {
          name: 'Markdown.pdf',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf'
        }
      } else {
        var res = {
          name: '1.jpg',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg'
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
function onChange (files: object[]) {
  console.log('change:', files)
}
function onRemove (file: object) {
  console.log('remove:', file)
}
</script>
<template>
  <Upload
    multiple
    :max-count="5"
    :error-info="errorInfo"
    :before-upload="onBeforeUpload"
    upload-mode="custom"
    :custom-request="onCustomRequest"
    v-model:file-list="fileList"
    @change="onChange"
    @remove="onRemove" />
</template>
```

:::

## APIs

### Upload

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
accept | 接受上传的文件类型，与`<input type="file" />`的 `accept` 属性一致，参考 [input accept Attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file) | string | '*' | false
multiple | 是否支持多选文件 | boolean | false | false
maxCount | 限制上传数量。当为 `1` 时，始终用最新上传的文件代替当前文件 | number | 1 | false
tip | 上传描述文字 | string | 'Upload' | false
fit | 预览图片缩放规则，参考 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)，仅当上传文件为图片时生效 | 'fill' &#124; 'contain' &#124; 'cover' &#124; 'none' &#124; 'scale-down' | 'contain' | false
spaceProps | `Space` 组件属性配置，参考 [Space Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/space.html#space)，用于配置多个文件时的排列方式 | object | {} | false
spinProps | `Spin` 组件属性配置，参考 [Spin Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin)，用于配置上传中样式 | object | {} | false
imageProps | `Image` 组件属性配置，参考 [Image Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/image.html#image)，用于配置图片预览 | object | {} | false
messageProps | `Message` 组件属性配置，参考 [Message Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/message.html#message)，用于配置操作消息提示 | object | {} | false
actionMessage | 操作成功的消息提示，传 `{}` 即可不显示任何消息提示 | [MessageType](#messagetype-type) | \{ upload: '上传成功', remove: '删除成功' } | false
beforeUpload | 上传文件之前的钩子，参数为上传的文件，返回 `false` 则停止上传，返回 `true` 继续上传，通常用来现在用户上传的文件格式和大小 | Function | () => true | false
uploadMode | 上传文件的方式，可选 `'base64'` &#124; `'custom'` | 'base64' &#124; 'custom' | 'base64' | false
customRequest | 自定义上传行为，只有 `uploadMode: custom` 时，才会使用 `customRequest` 自定义上传行为 | Function | () => {} | false
disabled | 是否禁用，只能预览，不能删除和上传 | boolean | false | false
fileList <Tag color="cyan">v-model</Tag> | 已上传的文件列表 | [FileType](#filetype-type)[] | [] | false

### FileType Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
name | 文件名 | string | false
url | 文件地址 | string | true
[propName: string] | 添加一个字符串索引签名，用于包含带有任意数量的其他属性 | any | false

### MessageType Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
upload | 上传成功的消息提示，没有设置该属性时即不显示上传消息提示 | string | false
remove | 删除成功的消息提示，没有设置该属性时即不显示删除消息提示 | string | false

## Methods

名称 | 说明 | 类型
-- | -- | --
info | 上传基本信息提示 | (content: string) => void
success | 上传成功信息提示 | (content: string) => void
error | 上传失败信息提示 | (content: string) => void
warning | 上传警告信息提示 | (content: string) => void
loading | 加载中信息提示 | (content: string) => void

## Events

名称 | 说明 | 类型
-- | -- | --
change | 上传文件改变时的回调 | (files: FileType[]) => void
remove | 点击移除文件时的回调 | (files: FileType[]) => void
