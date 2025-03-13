# 上传 Upload

<GlobalElement />

*文件选择上传和拖拽上传控件*

## 何时使用

- 当需要上传一个或一些文件时
- 当需要展现上传的进度时
- 当需要使用拖拽交互时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { UploadFileType } from 'vue-amazing-ui'
const uploadRef = ref()
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
const primaryColor = ref('#ff6900')
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
    uploadRef.value.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  console.log('file', file)
  console.log('type', file.type)
  if (!file.type.includes('image')) {
    // 继续上传
    uploadRef.value.error('只能上传图片')
    return false // 停止上传
  }
  return true // 继续上传
}
function onBeforePdfUpload(file: File) {
  const acceptTypes = ['application/pdf']
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    uploadRef.value.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  if (!acceptTypes.includes(file.type)) {
    // 继续上传
    uploadRef.value.error('只能上传 pdf 格式的文件')
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
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
        }
      } else {
        var res = {
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
function onRemove(file: UploadFileType) {
  console.log('remove', file)
}
</script>

## 基本使用

<Upload v-model:fileList="files" @drop="onDrop" @change="onChange" @preview="onPreview" @remove="onRemove" />

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
function onRemove(file: UploadFileType) {
  console.log('remove', file)
}
</script>
<template>
  <Upload v-model:fileList="files" @drop="onDrop" @change="onChange" @preview="onPreview" @remove="onRemove" />
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
const imageList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  }
])
</script>
<template>
  <Upload disabled v-model:file-list="imageList" />
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

## 自定义操作完成的消息提示

<Upload
  :action-message="{
    upload: 'upload success',
    remove: 'remove success'
  }"
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
    :action-message="{
      upload: 'upload success',
      remove: 'remove success'
    }"
    v-model:fileList="fileList"
  />
</template>
```

:::

## 上传文件校验

*上传文件最大 `500KB`；同时限定文件类型*

<br/>

<Space vertical>
  <Upload
    ref="uploadRef"
    accept="image/*"
    tip="Only Image"
    :before-upload="onBeforeImageUpload"
    v-model:fileList="imageList"
    @change="onChange"
    @remove="onRemove"
  />
  <Upload
    ref="uploadRef"
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
import type { UploadFileType } from 'vue-amazing-ui'
const uploadRef = ref()
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
    uploadRef.value.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  console.log('file', file)
  console.log('type', file.type)
  if (!file.type.includes('image')) {
    // 继续上传
    uploadRef.value.error('只能上传图片')
    return false // 停止上传
  }
  return true // 继续上传
}
function onBeforePdfUpload(file: File) {
  const acceptTypes = ['application/pdf']
  if (file.size > 500 * 1024) {
    // 文件大于 500KB 时取消上传
    uploadRef.value.warning('文件必须小于 500KB')
    return false // 停止上传
  }
  if (!acceptTypes.includes(file.type)) {
    // 继续上传
    uploadRef.value.error('只能上传 pdf 格式的文件')
    return false // 停止上传
  }
  return true // 继续上传
}
function onChange (files: UploadFileType[]) {
  console.log('change', files)
}
function onRemove (file: UploadFileType) {
  console.log('remove', file)
}
</script>
<template>
  <Space vertical>
    <Upload
      ref="uploadRef"
      accept="image/*"
      tip="Only Image"
      :before-upload="onBeforeImageUpload"
      v-model:fileList="imageList"
      @change="onChange"
      @remove="onRemove"
    />
    <Upload
      ref="uploadRef"
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

<Upload
  multiple
  upload-mode="custom"
  :custom-request="onCustomRequest"
  v-model:fileList="fileList"
  @change="onChange"
  @remove="onRemove"
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
function onCustomRequest(file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用返回name和url
      if (file.type === 'application/pdf') {
        var res = {
          name: 'Markdown.pdf',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
        }
      } else {
        var res = {
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
function onChange (files: UploadFileType[]) {
  console.log('change', files)
}
function onRemove (file: UploadFileType) {
  console.log('remove', file)
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
  />
</template>
```

:::

## 自定义主题色

<Space vertical>
  <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
  <Upload
    :style="`--upload-primary-color: ${primaryColor}`"
    v-model:fileList="fileList"
    @change="onChange"
    @remove="onRemove"
  />
</Space>

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
const primaryColor = ref('#ff6900')
watchEffect(() => {
  console.log('fileList', fileList.value)
})
function onChange (files: UploadFileType[]) {
  console.log('change', files)
}
function onRemove (file: UploadFileType) {
  console.log('remove', file)
}
</script>
<template>
  <Space vertical>
    <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
    <Upload
      :style="`--upload-primary-color: ${primaryColor}`"
      v-model:fileList="fileList"
      @change="onChange"
      @remove="onRemove"
    />
  </Space>
</template>
```

:::

## APIs

### Upload

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
accept | 接受上传的文件类型，与`<input type="file" />`的 `accept` 属性一致，参考 [input accept Attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/accept) | string | '*'
multiple | 是否支持多选文件，开启后可选择多个文件 | boolean | false
maxCount | 限制上传数量。当为 `1` 时，始终用最新上传的文件代替当前文件 | number | undefined
tip | 上传描述文字 | string | 'Upload'
fit | 预览图片缩放规则，参考 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)，仅当上传文件为图片时生效 | 'fill' &#124; 'contain' &#124; 'cover' &#124; 'none' &#124; 'scale-down' | 'contain'
draggable | 是否支持拖拽上传，开启后可拖拽文件到选择框上传 | boolean | true
disabled | 是否禁用，只能预览，不能删除和上传 | boolean | false
spaceProps | `Space` 组件属性配置，参考 [Space Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/space.html#space)，用于配置多个文件时的排列方式 | object | {}
spinProps | `Spin` 组件属性配置，参考 [Spin Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin)，用于配置上传中样式 | object | {}
imageProps | `Image` 组件属性配置，参考 [Image Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/image.html#image)，用于配置图片预览 | object | {}
messageProps | `Message` 组件属性配置，参考 [Message Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/message.html#message)，用于配置操作消息提示 | object | {}
actionMessage | 操作成功的消息提示，传 `{}` 即可不显示任何消息提示 | [MessageType](#messagetype-type) | \{ upload: '上传成功', remove: '删除成功' }
beforeUpload | 上传文件之前的钩子，参数为上传的文件，返回 `false` 则停止上传，返回 `true` 开始上传；支持返回一个 `Promise` 对象（如服务端校验等），`Promise` 对象 `reject` 时停止上传，`resolve` 时开始上传；通常用来校验用户上传的文件格式和大小 | Function | () => true
uploadMode | 上传文件的方式，可选 `'base64'` &#124; `'custom'` | 'base64' &#124; 'custom' | 'base64'
customRequest | 自定义上传行为，只有 `uploadMode: custom` 时，才会使用 `customRequest` 自定义上传行为 | Function | () => {}
fileList <Tag color="cyan">v-model</Tag> | 已上传的文件列表 | [FileType](#filetype-type)[] | []

### FileType Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
name? | 文件名 | string | undefined
url | 文件地址 | string | undefined
[propName: string] | 用于包含带有任意数量的其他属性 | any | undefined

### MessageType Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
upload? | 上传成功的消息提示，没有设置该属性时即不显示上传消息提示 | string | '上传成功'
remove? | 删除成功的消息提示，没有设置该属性时即不显示删除消息提示 | string | '删除成功'

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
tip | 自定义上传描述文字 | v-slot:tip

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
info | 上传基本信息提示 | (content: string) => void
success | 上传成功信息提示 | (content: string) => void
error | 上传失败信息提示 | (content: string) => void
warning | 上传警告信息提示 | (content: string) => void
loading | 加载中信息提示 | (content: string) => void

## Events

名称 | 说明 | 类型
:-- | :-- | :--
drop | 当文件被拖入上传区域时的回调 | (e: [DragEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent/DragEvent)) => void
change | 上传文件改变时的回调 | (files: [FileType](#filetype-type)[]) => void
preview | 点击预览时的回调 | (file: [FileType](#filetype-type)) => void
remove | 点击移除文件时的回调 | (files: [FileType](#filetype-type)) => void
