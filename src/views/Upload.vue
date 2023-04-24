<script setup lang="ts">
import { ref, watch } from 'vue'
const fileList = ref([
  {
    name: "xxx.png",
    url: "https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg"
  },
  {
    name: "xxx.png",
    url: "https://download.jinhui365.cn/group1/M00/01/30/CgABcmQ4yseAGS8yAAugtJ8mHPI827.jpg"
  }
])
watch(fileList, (to) => {
  console.log('fileList to:', to)
}, {deep: true})
const errorInfo = ref('') // 上传错误提示信息
function onBeforeUpload (file: File) {
  const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png']
  if (file.size > 1024 * 1024) { // 文件大于 1MB 时取消上传
    errorInfo.value = '文件必须小于1MB'
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
  <div>
    <h2 class="mb10">Upload 上传基本使用</h2>
    <Upload
      accept="image/*"
      :maxCount="5"
      multiple
      tip="上传"
      fit="cover"
      :maxSize="500 * 1024"
      :errorInfo="errorInfo"
      :beforeUpload="onBeforeUpload"
      @change="onChange"
      @remove="onRemove"
      v-model:fileList="fileList" />
  </div>
</template>
<style lang="less" scoped>
.border-box {
  :deep(*) {
    box-sizing: border-box;
  }
}
</style>
