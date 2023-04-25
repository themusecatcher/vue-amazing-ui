<script setup lang="ts">
import { ref, watch } from 'vue'
import { rafTimeout } from '../../packages'
const files = ref([])
const fileList = ref([
  {
    name: '1.jpg',
    url: "https://download.jinhui365.cn/group1/M00/01/30/CgABcmQ4yseAGS8yAAugtJ8mHPI827.jpg"
  },
  {
    name: 'Markdown.pdf',
    url: 'https://download.jinhui365.cn/group1/M00/01/36/CgABcmRHl-qABv_cAAFDCXziBoQ316.pdf'
  }
])
const imageList = ref([
  {
    name: '1.jpg',
    url: "https://download.jinhui365.cn/group1/M00/01/30/CgABcmQ4yseAGS8yAAugtJ8mHPI827.jpg"
  }
])
watch(fileList, (to) => {
  console.log('fileList to:', to)
}, {deep: true})
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
    rafTimeout(() => { // 模拟接口调用返回name和url
      const res = true
      if (res) {
        resolve({
          name: file.name,
          url: 'https://download.jinhui365.cn/group1/M00/01/30/CgABcmQ4yseAGS8yAAugtJ8mHPI827.jpg'
        })
      } else {
        reject('upload request fail ...')
      }
    }, 1000)
  })
  /*
    调用接口进行文件上传，假设接口返回值如下格式：
    res: {
      message: {
        code: 0,
        message: 'success'
      },
      data: {
        url: 'https...'
      }
    }
  */
  // const formData = new FormData()
  // formData.set('name', file.name)
  // formData.set('type', file.type)
  // formData.set('file', file)
  // upload(formData).then((res:any) => { // 调用接口
  //   console.log('upload-res:', res)
  //   if (res.message.code === 0) { // 上传成功
  //    return {
  //       name: file.name,
  //       url: res.data.url
  //     }
  //   } else { // 上传失败
  //     errorInfo.value = res.message.message
  //   }
  // })
}
function onChange (files: object[]) {
  console.log('change:', files)
}
function onRemove (file: object) {
  console.log('remove:', file)
}
</script>
<template>
  <div>
    <h2 class="mb10">Upload 上传基本使用</h2>
    <Upload v-model:fileList="files" />
    <h2 class="mt30 mb10">多文件上传，并限制上传数量为3 (multiple: true & maxCount: 3)</h2>
    <Upload multiple :maxCount="3" v-model:fileList="fileList" />
    <h2 class="mt30 mb10">缩略图等比覆盖，上传描述文字使用：上传 (fit: cover & tip: 上传)</h2>
    <Upload :maxCount="3" tip="上传" fit="cover" v-model:fileList="fileList" />
    <h2 class="mt30 mb10">禁用，只能预览，不能删除和上传 (disabled: true)</h2>
    <Upload disabled v-model:fileList="fileList" />
    <h2 class="mt30 mb10">限制上传文件最大500KB，同时文件类型只能是图片 (error-info: errorInfo & before-upload: onBeforeUpload)</h2>
    <Upload
      accept="image/*"
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
<style lang="less" scoped>
</style>
