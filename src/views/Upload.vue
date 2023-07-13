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
  const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
  if (file.size > 500 * 1024) { // 文件大于 500KB 时取消上传
    errorInfo.value = '文件必须小于500KB'
    return false
  }
  if (!acceptTypes.includes(file.type)) { // 继续上传
    errorInfo.value = '只能上传jpg、jpeg、png、pdf格式的文件'
    return false // 停止上传
  }
  return true
}
function onCustomRequest (file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // 模拟接口调用返回name和url
      if (file.type === 'application/pdf') {
        var res = {
          name: 'Markdown.pdf',
          url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Markdown.pdf"
        }
      } else {
        var res = {
          name: '1.jpg',
          url: "https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
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
function onChange (files: FileType[]) {
  console.log('change:', files)
}
function onRemove (file: FileType) {
  console.log('remove:', file)
}
</script>
<template>
  <div>
    <h1>Upload 上传</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Upload v-model:fileList="files" />
    <h2 class="mt30 mb10">多文件上传，并限制上传数量为3 (multiple: true & maxCount: 3)</h2>
    <Upload multiple :maxCount="3" v-model:fileList="fileList" />
    <h2 class="mt30 mb10">缩略图等比覆盖，上传描述文字使用：上传 (fit: cover & tip: 上传)</h2>
    <Upload :maxCount="3" tip="上传" fit="cover" v-model:fileList="fileList" />
    <h2 class="mt30 mb10">禁用，只能预览，不能删除和上传 (disabled: true)</h2>
    <Upload disabled v-model:fileList="fileList" />
    <h2 class="mt30 mb10">限制上传文件最大500KB，同时文件类型只能是图片 (error-info: errorInfo & before-upload: onBeforeUpload)</h2>
    <Upload
      accept="image/*,application/pdf"
      :maxCount="3"
      :error-info="errorInfo"
      :before-upload="onBeforeUpload"
      v-model:fileList="imageList"
      @change="onChange"
      @remove="onRemove" />
    <h2 class="mt30 mb10">自定义上传行为 (upload-mode: custom & custom-request: onCustomRequest)</h2>
    <Upload
      multiple
      :maxCount="5"
      :error-info="errorInfo"
      :before-upload="onBeforeUpload"
      upload-mode="custom"
      :custom-request="onCustomRequest"
      v-model:fileList="fileList"
      @change="onChange"
      @remove="onRemove" />
  </div>
</template>
