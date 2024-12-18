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
const pdfList = ref([
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf'
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
function onDrop(e: DragEvent) {
  console.log('drop', e)
}
function onChange(files: FileType[]) {
  console.log('change', files)
}
function onPreview(file: FileType) {
  console.log('preview', file)
}
function onRemove(file: FileType) {
  console.log('remove', file)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Upload v-model:fileList="files" @drop="onDrop" @change="onChange" @preview="onPreview" @remove="onRemove" />
    <h2 class="mt30 mb10">禁用</h2>
    <h3 class="mb10">只能预览，不能删除和上传</h3>
    <Upload disabled v-model:fileList="fileList" />
    <h2 class="mt30 mb10">限制数量</h2>
    <h3 class="mb10">通过 maxCount 限制上传数量；当为 1 时，始终用最新上传的代替当前</h3>
    <Space vertical>
      <Upload :max-count="1" tip="maxCount: 1" v-model:fileList="files" />
      <Upload :max-count="3" tip="maxCount: 3" v-model:fileList="fileList" />
    </Space>
    <h2 class="mt30 mb10">多文件上传</h2>
    <h3 class="mb10">可一次选择多个文件进行上传</h3>
    <Upload multiple v-model:fileList="files" />
    <h2 class="mt30 mb10">自定义样式布局</h2>
    <h3 class="mb10">缩略图等比覆盖；上传描述文字使用：上传</h3>
    <Upload tip="上传" fit="cover" v-model:fileList="fileList" />
    <h3 class="mt30 mb10">排列间距使用：'middle'；自定义上传 uploading 动画样式</h3>
    <Upload
      :space-props="{ gap: 'middle' }"
      :spin-props="{ indicator: 'spin-dot', color: '#ff6900', tip: '上传中...' }"
      v-model:fileList="fileList"
    />
    <h2 class="mt30 mb10">自定义操作完成的消息提示</h2>
    <Upload
      :action-message="{
        upload: 'upload success',
        remove: 'remove success'
      }"
      v-model:fileList="fileList"
    />
    <h2 class="mt30 mb10">上传文件校验</h2>
    <h3 class="mb10">上传文件最大 500KB；同时限定文件类型</h3>
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
    <h2 class="mt30 mb10">自定义上传行为</h2>
    <Upload
      multiple
      upload-mode="custom"
      :custom-request="onCustomRequest"
      v-model:fileList="fileList"
      @change="onChange"
      @remove="onRemove"
    />
  </div>
</template>
