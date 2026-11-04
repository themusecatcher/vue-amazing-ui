<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMessage } from 'vue-amazing-ui'
import type { UploadFileType } from 'vue-amazing-ui'
const message = useMessage()
// 各分节独立绑定，操作任一用例不会联动其余用例
const basicFiles = ref<UploadFileType[]>([])
const multipleFiles = ref<UploadFileType[]>([])
// 工厂每次返回新数组，避免各分节共用同一份文件列表
function createFileList(): UploadFileType[] {
  return [
    {
      name: '1.jpg',
      url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
    },
    {
      name: 'Markdown.pdf',
      url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
    }
  ]
}
const disabledFileList = ref<UploadFileType[]>(createFileList())
const limitFileList = ref<UploadFileType[]>(createFileList())
const customStyleFileList = ref<UploadFileType[]>(createFileList())
const messageFileList = ref<UploadFileType[]>(createFileList())
const customRequestFileList = ref<UploadFileType[]>(createFileList())
const chunkFileList = ref<UploadFileType[]>(createFileList())
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
// 单文件模式演示：预置 1 个文件，用于展示「占满后仍显示上传入口，再次上传即替换」
const singleFile = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  }
])
// 拖拽上传演示：拖拽路径同样按 accept 过滤，类型不符的文件经 reject 回传
const dragList = ref<UploadFileType[]>([])
watchEffect(() => {
  console.log('imageList', imageList.value)
})
watchEffect(() => {
  console.log('pdfList', pdfList.value)
})
watchEffect(() => {
  console.log('singleFile', singleFile.value)
})
watchEffect(() => {
  console.log('dragList', dragList.value)
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
// 拖拽投放的文件不符合 accept 时触发：点选不会走到这里（<input accept> 已由浏览器拦截）
function onReject(rejectedFiles: File[]) {
  console.log('reject', rejectedFiles)
  message.warning(`已忽略 ${rejectedFiles.length} 个类型不符的文件`)
}
function onCustomRequest(file: File): Promise<UploadFileType> {
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
function onCustomSliceUpload(file: File): Promise<UploadFileType> {
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
function onUploadFailRequest(file: File): Promise<UploadFileType> {
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
    <Upload v-model:fileList="basicFiles" @drop="onDrop" @change="onChange" @preview="onPreview" />
    <h2 class="mt30 mb10">非受控模式</h2>
    <p class="mb10">不传 v-model:fileList 时由组件自持，用 defaultFileList 预填文件列表；继续上传、删除照常生效</p>
    <Upload
      :default-file-list="[
        {
          name: '1.jpg',
          url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
        }
      ]"
    />
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">只能预览，不能删除和上传</p>
    <Upload disabled v-model:fileList="disabledFileList" />
    <h2 class="mt30 mb10">限制数量</h2>
    <p class="mb10">
      通过 <code>maxCount</code> 限制上传数量；当为
      <code>1</code> 时占满后仍显示上传入口，再次上传即替换当前文件（示例已预置 1 个文件）
    </p>
    <Space vertical>
      <Upload :max-count="1" tip="maxCount: 1" v-model:fileList="singleFile" />
      <Upload :max-count="3" tip="maxCount: 3" v-model:fileList="limitFileList" />
    </Space>
    <h2 class="mt30 mb10">多文件上传</h2>
    <p class="mb10">可一次选择多个文件进行上传</p>
    <Upload multiple v-model:fileList="multipleFiles" />
    <h2 class="mt30 mb10">拖拽上传</h2>
    <p class="mb10">
      <code>draggable</code> 默认开启，把文件拖入上传框即可上传；拖拽路径与点选共用 <code>multiple</code> /
      <code>accept</code> 约束，类型不符的文件经 <code>reject</code> 回传
    </p>
    <Upload accept="image/*" tip="拖拽图片到此" v-model:fileList="dragList" @drop="onDrop" @reject="onReject" />
    <h2 class="mt30 mb10">自定义样式布局</h2>
    <p class="mb10">缩略图等比覆盖；上传描述文字使用：上传</p>
    <Upload tip="上传" fit="cover" v-model:fileList="customStyleFileList" />
    <p class="mt30 mb10">排列间距使用：<code>'middle'</code>；自定义上传 <code>uploading</code> 动画样式</p>
    <Upload
      :space-props="{ gap: 'middle' }"
      :spin-props="{ indicator: 'dot-wheel', color: '#ff6900', tip: '上传中...' }"
      v-model:fileList="customStyleFileList"
    />
    <h2 class="mt30 mb10">操作完成的消息提示</h2>
    <p class="mb10">全局提示由使用方监听 <code>@success</code> / <code>@remove</code> / <code>@error</code> 后调用</p>
    <Space vertical>
      <Upload v-model:fileList="messageFileList" @success="onSuccess" @remove="onRemove" />
      <Upload
        upload-mode="custom"
        :custom-request="onUploadFailRequest"
        v-model:fileList="messageFileList"
        @error="onError"
      />
    </Space>
    <h2 class="mt30 mb10">上传文件校验</h2>
    <p class="mb10">
      上传文件最大 <code>500KB</code>；同时限定文件类型（拖拽路径的类型过滤与
      <code>reject</code> 回传见「拖拽上传」一节）
    </p>
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
      v-model:fileList="customRequestFileList"
      @change="onChange"
      @remove="onRemove"
      @success="onSuccess"
      @error="onError"
    />
    <h2 class="mt30 mb10">自定义分片上传</h2>
    <Upload
      upload-mode="custom"
      :custom-request="onCustomSliceUpload"
      v-model:fileList="chunkFileList"
      @change="onChange"
      @remove="onRemove"
      @success="onSuccess"
      @error="onError"
    />
  </div>
</template>
