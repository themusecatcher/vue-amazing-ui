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
function onBeforeImageUpload(file: File): boolean {
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
function onBeforePdfUpload(file: File): boolean {
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Upload v-model:fileList="files" @drop="onDrop" @change="onChange" @preview="onPreview" />
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">只能预览，不能删除和上传</p>
    <Upload disabled v-model:fileList="fileList" />
    <h2 class="mt30 mb10">限制数量</h2>
    <p class="mb10">通过 <code>maxCount</code> 限制上传数量；当为 <code>1</code> 时，始终用最新上传的代替当前</p>
    <Space vertical>
      <Upload :max-count="1" tip="maxCount: 1" v-model:fileList="files" />
      <Upload :max-count="3" tip="maxCount: 3" v-model:fileList="fileList" />
    </Space>
    <h2 class="mt30 mb10">多文件上传</h2>
    <p class="mb10">可一次选择多个文件进行上传</p>
    <Upload multiple v-model:fileList="files" />
    <h2 class="mt30 mb10">自定义样式布局</h2>
    <p class="mb10">缩略图等比覆盖；上传描述文字使用：上传</p>
    <Upload tip="上传" fit="cover" v-model:fileList="fileList" />
    <h3 class="mt30 mb10">排列间距使用：'middle'；自定义上传 uploading 动画样式</h3>
    <Upload
      :space-props="{ gap: 'middle' }"
      :spin-props="{ indicator: 'spin-dot', color: '#ff6900', tip: '上传中...' }"
      v-model:fileList="fileList"
    />
    <h2 class="mt30 mb10">操作完成的消息提示</h2>
    <p class="mb10">
      组件不再内嵌 <code>Message</code>，上传成功 / 删除 / 上传失败等提示改由使用方监听 <code>@success</code> /
      <code>@remove</code> / <code>@error</code> 事件后自行调用
    </p>
    <Space vertical>
      <Upload v-model:fileList="fileList" @success="onSuccess" @remove="onRemove" />
      <Upload upload-mode="custom" :custom-request="onUploadFailRequest" v-model:fileList="fileList" @error="onError" />
    </Space>
    <h2 class="mt30 mb10">上传文件校验</h2>
    <p class="mb10">上传文件最大 <code>500KB</code>；同时限定文件类型</p>
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
    <h2 class="mt30 mb10">自定义上传行为</h2>
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
    <h2 class="mt30 mb10">自定义分片上传</h2>
    <Upload
      upload-mode="custom"
      :custom-request="onCustomSliceUpload"
      v-model:fileList="fileList"
      @change="onChange"
      @remove="onRemove"
      @success="onSuccess"
      @error="onError"
    />
  </div>
</template>
