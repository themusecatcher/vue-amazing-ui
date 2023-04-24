<script setup lang="ts">
import Spin from '../spin'
import { ref } from 'vue'
interface Props {
  accept?: string // 接受上传的文件类型，详见 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file
  disabled?: boolean // 是否禁用
  maxCount?: number // 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
  maxSize?: number // 限制上传文件大小，单位B，默认1MB 
  multiple?: boolean // 是否支持多选文件
  tip?: string // 描述文字 string | slot
  uploadingTip?: string // 上传时文字提示
  fit?: string // 预览图片缩放规则，仅上传文件为图片时生效
  fileList?: any[] // 已上传的文件列表
}
const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  disabled: false,
  maxCount: 1,
  maxSize: 1024 * 1024,
  multiple: false,
  tip: 'Upload',
  uploadingTip: 'Uploading',
  fit: 'contain', // 可选 fill(填充) | contain(等比缩放包含) | cover(等比缩放覆盖)
  fileList: () => []
})
const uploadedFiles = ref(props.fileList) // 上传文件列表
const fileNames = ref<string[]>([])
const showUpload = ref(1)
const uploading = ref<boolean[]>(Array(props.maxCount).fill(false))
const isImage = ref<boolean[]>(Array(props.maxCount).fill(false))
const uploadInput = ref()
function onDrop (e: DragEvent, index: number) { // 拖拽上传
  const files = e.dataTransfer?.files
  if (files?.length) {
    uploadFile(files, index)
  }
}
// function onClick () {
//   console.log('upload:', upload.value)
// }
function onUpload (e: any, index: number) { // 点击上传
  const files = e.target.files
  if (files?.length) {
    uploadFile(files, index)
  }
}
function uploadFile (files: FileList, index: number) { // 统一上传文件方法
	console.log('开始上传 upload-event files:', files[0])
  if (props.maxCount > showUpload.value) {
    showUpload.value++
  }
  uploading.value[index] = true
  if (files[0].type.includes('image')) {
    isImage.value[index] = true
  }
  fileNames.value.push(files[0].name)
  var reader = new FileReader()
  // reader.readAsBinaryString(files[0])
  reader.readAsDataURL(files[0]) // 以base64方式读取文件内容
  reader.onloadstart = function (e) { // 当读取操作开始时触发
    const fileSize = e.total
    if (fileSize > props.maxSize) { // 文件大于 maxSize 时取消上传
      reader.abort()
      uploading.value[index] = false
    } else {
      console.log('开始读取 onloadstart:', e)
    }
  }
  reader.onabort = function (e) { // 当读取操作被中断时触发
    console.log('读取中止 onabort:', e)
  }
  reader.onerror = function (e) { // 当读取操作发生错误时触发
    console.log('读取错误 onerror:', e)
  }
  reader.onprogress = function (e) { // 在读取Blob时触发，读取上传进度，50ms左右调用一次
    console.log('读取中 onprogress:', e)
    console.log('已读取:', Math.ceil(e.loaded / e.total * 100))
    if (e.loaded === e.total) { // 上传完成
      uploading.value[index] = false
    }
  }
  reader.onload = function (e) { // 当读取操作成功完成时调用
    console.log('读取成功 onload:', e)
    // 该文件的base64数据，如果是图片，则前端可直接用来展示图片
    uploadedFiles.value.push(e.target?.result)
    // 若使用<img id="img">标签展示图片，可直接赋值src属性
    // document.getElementById('img').src = e.target.result
    // 调用上传接口，上传base64格式的文件数据
    const fileType = files[0].type.slice(files[0].type.indexOf('/') + 1)
    var formData = {
      uploadFile: e.target?.result,
      fileFormat: fileType
    }
    console.log('提交数据:', formData)
    // upload(formData).then(res => {
    //   console.log('upload-res:', res)
    //   if (res.message.code === 0) {
    //     that.fileUrl = res.data.url
    //   }
    // }).finally(() => {
    //   // input的change事件默认保存上一次input的value值，同一value值(根据文件路径判断)在上传时不重新加载
    //   upload.value.value = ''
    // })
  }
  reader.onloadend = function (e) { // 当读取操作结束时触发（要么成功，要么失败）触发
    console.log('读取结束 onloadend:', e)
    // input的change事件默认保存上一次input的value值，同一value值(根据文件路径判断)在上传时不重新加载
    uploadInput.value[index].value = ''
  }
}
function onDelete (index: number) {
  if (uploadedFiles.value.length < props.maxCount) {
    showUpload.value--
  }
  uploadedFiles.value.splice(index, 1)
  fileNames.value.splice(index, 1)
  isImage.value.splice(index, 1)
  isImage.value.push(false)
}
</script>
<template>
  <div class="m-upload-list">
    <div class="m-upload-item" v-for="n of showUpload" :key="n">
      <div class="m-upload" :class="{'uploaded': uploadedFiles[n-1]}">
        <div
          v-show="!uploading[n-1] && !uploadedFiles[n-1]"
          class="m-upload-wrap"
          @dragenter.stop.prevent
          @dragover.stop.prevent
          @drop.stop.prevent="onDrop($event, n-1)"
          @click="uploadInput[n-1].click()">
          <input type="file" ref="uploadInput" :accept="accept" :multiple="multiple" @change="onUpload($event, n-1)" style="display: none;" />
          <div>
            <svg class="u-plus" focusable="false" data-icon="plus" aria-hidden="true" viewBox="64 64 896 896"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>
            <p class="u-tip">
              <slot>{{ tip }}</slot>
            </p>
          </div>
        </div>
        <div class="m-image-uploading" v-show="uploading[n-1]">
          <Spin class="u-spin" :tip="uploadingTip" size="small" indicator="circle" />
        </div>
        <div class="m-image-preview" v-show="uploadedFiles[n-1]">
          <img class="u-image" v-if="isImage[n-1]" :style="`object-fit: ${fit};`" :src="uploadedFiles[n-1]" :alt="fileNames[n-1]" />
          <div class="m-file" v-else>
            <svg class="u-file" focusable="false" data-icon="file" aria-hidden="true" viewBox="64 64 896 896"><path d="M534 352V136H232v752h560V394H576a42 42 0 01-42-42z" fill="#e6f7ff"></path><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z"></path></svg>
            <p class="u-name" :title="fileNames[n-1]">{{ fileNames[n-1] }}</p>
          </div>
        </div>
        <div class="m-image-mask" v-show="isImage[n-1] && uploadedFiles[n-1]">
          <a class="m-icon" title="预览" :href="uploadedFiles[n-1]" @click.stop target="_blank">
            <svg class="u-icon" focusable="false" data-icon="eye" aria-hidden="true" viewBox="64 64 896 896"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
          </a>
          <a class="m-icon" title="删除" @click.prevent.stop="onDelete(n-1)">
            <svg class="u-icon" focusable="false" data-icon="delete" aria-hidden="true" viewBox="64 64 896 896"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-upload-list {
  display: inline-block;
  .m-upload-item {
    display: inline-block;
    vertical-align: top;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
.m-upload {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  .m-upload-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 98px;
    height: 98px;
    border-radius: 8px;
    border: 1px dashed #d9d9d9;
    background-color: rgba(0, 0, 0, 0.02);
    cursor: pointer;
    transition: border-color 0.3s;
    &:hover {
      border-color: @themeColor;
      .m-image-mask {
        opacity: 1;
        pointer-events: auto;
      }
    }
    .u-plus {
      display: inline-block;
      width: 14px;
      height: 14px;
    }
    .u-tip {
      margin-top: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.571;
    }
  }
  .m-image-uploading {
    width: 82px;
    height: 82px;
    padding: 8px;
    border-radius: 8px;
    border: 1px dashed #d9d9d9;
    background-color: rgba(0, 0, 0, 0.02);
    display: flex;
    align-items: center;
    text-align: center;
    .u-spin {
      display: inline-block;
      :deep(.u-tip) {
        max-width: 82px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .m-image-preview {
    position: relative;
    padding: 8px;
    width: 82px;
    height: 82px;
    border-radius: 8px;
    padding: 8px;
    border: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    text-align: center;
    .u-image {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .m-file {
      display: inline-block;
      width: 100%;
      .u-file {
        width: 30px;
        height: 30px;
        fill: @themeColor;
      }
      .u-name {
        font-size: 14px;
        color: @themeColor;
        line-height: 1.571;
        max-width: 82px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .m-image-mask {
    // top right bottom left 简写为 inset: 0
    // insert 无论元素的书写模式、行内方向和文本朝向如何，其所定义的都不是逻辑偏移而是实体偏移
    position: absolute;
    inset: 0;
    margin: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    .m-icon {
      display: inline-block;
      height: 16px;
      margin: 0 4px;
      .u-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        fill: rgba(255, 255, 255, 0.65);
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          fill: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
.uploaded {
  &:hover {
    .m-image-mask {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
