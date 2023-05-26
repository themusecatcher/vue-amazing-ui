# 上传 Upload

<br/>

*文件选择上传和拖拽上传控件*

## 何时使用

- 当需要上传一个或一些文件时
- 当需要展现上传的进度时
- 当需要使用拖拽交互时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const files = ref([])
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Markdown.pdf'
  }
])
const imageList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
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
const errorInfo = ref('') // 上传错误提示信息
function onBeforeUpload (file: File) {
  const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png']
  if (file.size > 500 * 1024) { // 文件大于 500KB 时取消上传
    errorInfo.value = '文件必须小于500KB'
    return false
  }
  if (!acceptTypes.includes(file.type)) { // 继续上传
    errorInfo.value = '只能上传jpg、jpeg、png格式的文件'
    return false // 停止上传
  }
  return true
}
function onCustomRequest (file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // 模拟接口调用返回name和url
      const res = {
        name: '1.jpg',
        url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg'
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

## 基本使用

<Upload v-model:file-list="files" />

<details>
<summary>查看代码</summary>

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

</details>

## 多文件上传

*限制上传数量为3*

<br/>

<Upload multiple :max-count="3" v-model:file-list="fileList" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Markdown.pdf'
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

</details>

## 自定义样式

*缩略图等比覆盖，上传描述文字使用：上传*

<br/>

<Upload :max-count="3" tip="上传" fit="cover" v-model:file-list="fileList" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Markdown.pdf'
  }
])
watchEffect(() => {
  console.log('fileList:', fileList.value)
})
</script>
<template>
  <Upload :max-count="3" tip="上传" fit="cover" v-model:file-list="fileList" />
</template>
```

</details>

## 禁用

*只能预览，不能删除和上传*

<br/>

<Upload disabled v-model:file-list="imageList" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const imageList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
  }
])
</script>
<template>
  <Upload disabled v-model:file-list="imageList" />
</template>
```

</details>

## 限制文件大小和类型

*上传文件最大500KB，同时文件类型只能是图片*

<br/>

<Upload
  accept="image/*"
  :max-count="3"
  :error-info="errorInfo"
  :before-upload="onBeforeUpload"
  v-model:file-list="imageList"
  @change="onChange"
  @remove="onRemove" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const imageList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
  }
])
const errorInfo = ref('') // 上传错误提示信息
watchEffect(() => {
  console.log('imageList:', imageList.value)
})
function onBeforeUpload (file: File) {
  const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png']
  if (file.size > 500 * 1024) { // 文件大于 500KB 时取消上传
    errorInfo.value = '文件必须小于500KB'
    return false
  }
  if (!acceptTypes.includes(file.type)) { // 继续上传
    errorInfo.value = '只能上传jpg、jpeg、png格式的文件'
    return false // 停止上传
  }
  return true
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
    accept="image/*"
    :max-count="3"
    :error-info="errorInfo"
    :before-upload="onBeforeUpload"
    v-model:file-list="imageList"
    @change="onChange"
    @remove="onRemove" />
</template>
```

</details>

## 自定义上传行为

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

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Markdown.pdf'
  }
])
const errorInfo = ref('') // 上传错误提示信息
watchEffect(() => {
  console.log('fileList:', fileList.value)
})
function onBeforeUpload (file: File) {
  const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png']
  if (file.size > 500 * 1024) { // 文件大于 500KB 时取消上传
    errorInfo.value = '文件必须小于500KB'
    return false
  }
  if (!acceptTypes.includes(file.type)) { // 继续上传
    errorInfo.value = '只能上传jpg、jpeg、png格式的文件'
    return false // 停止上传
  }
  return true
}
function onCustomRequest (file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // 模拟接口调用返回name和url
      const res = {
        name: '1.jpg',
        url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg'
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

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
