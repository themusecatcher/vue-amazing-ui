<script setup lang="ts">
import Spin from '../spin'
import Message from '../message'
import Image from '../image'
import Space from '../space'
import { ref, watchEffect, nextTick } from 'vue'
interface FileType {
  name?: string // 文件名
  url: any // 文件地址
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Props {
  accept?: string // 接受上传的文件类型，与<input type="file">的accept属性一致，详见 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file
  multiple?: boolean // 是否支持多选文件
  maxCount?: number // 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
  tip?: string // 上传描述文字 string | slot
  uploadingTip?: string // 上传中的文字描述
  gap?: number|number[] // 展示文件间距大小，数组时表示: [水平间距, 垂直间距]
  fit?: 'fill'|'contain'|'cover' // 预览图片缩放规则，仅当上传文件为图片时生效
  errorInfo?: string // 上传中断时的错误提示信息
  beforeUpload?: Function // 上传文件之前的钩子，参数为上传的文件，返回 false 则停止上传，返回 true 继续上传，通常用来现在用户上传的文件格式和大小
  uploadMode?: 'base64'|'custom' // 上传文件的方式，默认是 base64，可选 'base64' | 'custom'
  customRequest?: Function // 自定义上传行为，只有 uploadMode: custom 时，才会使用 customRequest 自定义上传行为
  disabled?: boolean // 是否禁用，只能预览，不能删除和上传
  fileList?: FileType[] // (v-model)已上传的文件列表
}
const props = withDefaults(defineProps<Props>(), {
  accept: '*', // 默认支持所有类型
  multiple: false,
  maxCount: 1,
  tip: 'Upload',
  uploadingTip: 'Uploading',
  gap: 8,
  fit: 'contain', // 可选 fill(填充) | contain(等比缩放包含) | cover(等比缩放覆盖)
  errorInfo: '',
  beforeUpload: () => true,
  uploadMode: 'base64',
  customRequest: () => {},
  disabled: false,
  fileList: () => []
})
const uploadedFiles = ref<FileType[]>([]) // 上传文件列表
const showUpload = ref(1)
const uploading = ref<boolean[]>(Array(props.maxCount).fill(false))
const uploadInput = ref()
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  initUpload()
})
function initUpload () {
  uploadedFiles.value = [...props.fileList]
  if (uploadedFiles.value.length > props.maxCount) {
    uploadedFiles.value.splice(props.maxCount)
  }
  if (props.disabled) { // 禁用
    showUpload.value = uploadedFiles.value.length
  } else {
    if (uploadedFiles.value.length < props.maxCount) {
      showUpload.value = props.fileList.length + 1
    } else {
      showUpload.value = props.maxCount
    }
  }
}
function isImage (url: string) { // 检查url是否为图片
  const imageUrlReg = /\.(jpg|jpeg|png|gif)$/i
  const base64Reg = /^data:image/
  return imageUrlReg.test(url) || base64Reg.test(url)
}
function isPDF (url: string) { // 检查url是否为pdf
  const pdfUrlReg = /\.pdf$/i
  const base64Reg = /^data:application\/pdf/
  return pdfUrlReg.test(url) || base64Reg.test(url)
}
function onDrop (e: DragEvent, index: number) { // 拖拽上传
  const files = e.dataTransfer?.files
  if (files?.length) {
    const len = files.length
    for (let n = 0; n < len; n++) {
      if (index + n <= props.maxCount) {
        uploadFile(files[n], index + n)
      } else {
        break
      }
    }
    // input的change事件默认保存上一次input的value值，同一value值(根据文件路径判断)在上传时不重新加载
    uploadInput.value[index].value = ''
  }
}
function onClick (index: number) {
  uploadInput.value[index].click()
}
function onUpload (e: any, index: number) { // 点击上传
  const files = e.target.files
  if (files?.length) {
    const len = files.length
    for (let n = 0; n < len; n++) {
      if (index + n < props.maxCount) {
        uploadFile(files[n], index + n)
      } else {
        break
      }
    }
    // input的change事件默认保存上一次input的value值，同一value值(根据文件路径判断)在上传时不重新加载
    uploadInput.value[index].value = ''
  }
}
const emits = defineEmits(['update:fileList', 'change', 'remove'])
const uploadFile = function (file: File, index: number) { // 统一上传文件方法
	// console.log('开始上传 upload-event files:', file)
  if (!props.beforeUpload(file)) { // 使用用户钩子进行上传前文件判断，例如大小、类型限制
    nextTick(() => { // 获取更新后的errorInfo 否则无法立即获取props更新
      onError(props.errorInfo)
    })
  } else {
    if (props.maxCount > showUpload.value) {
      showUpload.value++
    }
    if (props.uploadMode === 'base64') { // 以base64方式读取文件
      uploading.value[index] = true
      base64Upload(file, index)
    }
    if (props.uploadMode === 'custom') { // 自定义上传行为，需配合 customRequest 属性
      uploading.value[index] = true
      customUpload(file, index)
    }
  }
}
function base64Upload (file: File, index: number) {
  var reader = new FileReader()
  reader.readAsDataURL(file) // 以base64方式读取文件
  reader.onloadstart = function (e) { // 当读取操作开始时触发
    // reader.abort() // 取消上传
    // console.log('开始读取 onloadstart:', e)
  }
  reader.onabort = function (e) { // 当读取操作被中断时触发
    // console.log('读取中止 onabort:', e)
  }
  reader.onerror = function (e) { // 当读取操作发生错误时触发
    // console.log('读取错误 onerror:', e)
  }
  reader.onprogress = function (e) { // 在读取Blob时触发，读取上传进度，50ms左右调用一次
    // console.log('读取中 onprogress:', e)
    // console.log('已读取:', Math.ceil(e.loaded / e.total * 100))
    if (e.loaded === e.total) { // 上传完成
      uploading.value[index] = false // 隐藏loading状态
    }
  }
  reader.onload = function (e) { // 当读取操作成功完成时调用
    // console.log('读取成功 onload:', e)
    // 该文件的base64数据，如果是图片，则前端可直接用来展示图片
    uploadedFiles.value.push({
        name: file.name,
        url: e.target?.result
      })
    emits('update:fileList', uploadedFiles.value)
    emits('change', uploadedFiles.value)
  }
  reader.onloadend = function (e) { // 当读取操作结束时触发（要么成功，要么失败）触发
    // console.log('读取结束 onloadend:', e)
  }
}
function customUpload (file: File, index: number) {
  props.customRequest(file).then((res: any) => {
    uploadedFiles.value.push(res)
    emits('update:fileList', uploadedFiles.value)
    emits('change', uploadedFiles.value)
  }).catch((err: any) => {
    if (props.maxCount > 1) {
      showUpload.value = uploadedFiles.value.length + 1
    }
    onError(err)
  }).finally(() => {
    uploading.value[index] = false
  })
}
const imageRef = ref()
function onPreview (n: number, url: string) {
  console.log('isImage', isImage(url));
  if (isImage(url)) {
    const files = uploadedFiles.value.slice(0, n).filter(file => !isImage(file.url) )
    imageRef.value[n - files.length].onPreview(0)
  } else {
    window.open(url)
  }
}
function onRemove (index: number) {
  if (uploadedFiles.value.length < props.maxCount) {
    showUpload.value--
  }
  const removeFile = uploadedFiles.value.splice(index, 1)
  emits('remove', removeFile)
  emits('update:fileList', uploadedFiles.value)
  emits('change', uploadedFiles.value)
}
const message = ref()
function onError (content: any) {
  message.value.error(content) // error调用
}
</script>
<template>
  <div class="m-upload-list">
    <Space :size="gap">
      <div class="m-upload-item" v-for="n of showUpload" :key="n">
        <div class="m-upload">
          <div
            v-show="!uploading[n-1] && !uploadedFiles[n-1]"
            class="m-upload-wrap"
            :class="{'upload-disabled': disabled}"
            @dragenter.stop.prevent
            @dragover.stop.prevent
            @drop.stop.prevent="disabled ? () => false : onDrop($event, n-1)"
            @click="disabled ? () => false : onClick(n-1)">
            <input ref="uploadInput" type="file" @click.stop :accept="accept" :multiple="multiple" @change="onUpload($event, n-1)" style="display: none;" />
            <div>
              <svg focusable="false" class="u-plus" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><defs></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>
              <p class="u-tip">
                <slot>{{ tip }}</slot>
              </p>
            </div>
          </div>
          <div class="m-file-uploading" v-show="uploading[n-1]">
            <Spin class="u-spin" :tip="uploadingTip" size="small" indicator="dynamic-circle"/>
          </div>
          <div class="m-file-preview" v-if="uploadedFiles[n-1]">
            <Image
              v-if="isImage(uploadedFiles[n-1].url)"
              ref="imageRef"
              :bordered="false"
              :width="82"
              :height="82"
              :src="uploadedFiles[n-1].url"
              :name="uploadedFiles[n-1].name" />
            <!-- <img class="m-image"  :style="`object-fit: ${fit};`"  /> -->
            <svg class="u-file" v-else-if="isPDF(uploadedFiles[n-1].url)" focusable="false" data-icon="file-pdf" aria-hidden="true" viewBox="64 64 896 896"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"></path></svg>
            <svg class="u-file" v-else focusable="false" data-icon="file" aria-hidden="true" viewBox="64 64 896 896"><path d="M534 352V136H232v752h560V394H576a42 42 0 01-42-42z" fill="#e6f7ff"></path><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z"></path></svg>
            <div class="m-file-mask">
              <a class="m-icon" title="预览" @click="onPreview(n-1, uploadedFiles[n-1].url)">
                <svg class="u-icon" focusable="false" data-icon="eye" aria-hidden="true" viewBox="64 64 896 896"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
              </a>
              <a class="m-icon" title="删除" @click.prevent.stop="onRemove(n-1)" v-show="!disabled">
                <svg class="u-icon" focusable="false" data-icon="delete" aria-hidden="true" viewBox="64 64 896 896"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Space>
    <Message ref="message" :duration="3000" :top="30" />
  </div>
</template>
<style lang="less" scoped>
.m-upload-list {
  display: inline-block;
  .m-upload-item {
    display: inline-block;
  }
  .mr8 {
    margin-right: 8px;
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
    width: 100px;
    height: 100px;
    border-radius: 8px;
    border: 1px dashed #d9d9d9;
    background-color: rgba(0, 0, 0, .02);
    cursor: pointer;
    transition: border-color .3s;
    &:hover {
      border-color: @themeColor;
    }
    .u-plus {
      display: inline-block;
      width: 14px;
      height: 14px;
      fill: rgba(0, 0, 0, .88);
    }
    .u-tip {
      margin-top: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, .88);
      line-height: 1.5714285714285714;
    }
  }
  .upload-disabled {
    cursor: not-allowed;
    &:hover {
      border-color: #d9d9d9;
    }
  }
  .m-file-uploading {
    width: 100px;
    height: 100px;
    padding: 8px;
    border-radius: 8px;
    border: 1px dashed #d9d9d9;
    background-color: rgba(0, 0, 0, .02);
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
  .m-file-preview {
    position: relative;
    padding: 8px;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    padding: 8px;
    border: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    text-align: center;
    .u-file {
      display: inline-block;
      width: 100%;
      height: 60px;
      fill: @themeColor;
    }
    .m-file-mask {
      // top right bottom left 简写为 inset: 0
      // insert 无论元素的书写模式、行内方向和文本朝向如何，其所定义的都不是逻辑偏移而是实体偏移
      position: absolute;
      inset: 0;
      margin: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, .5);
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s;
      .m-icon {
        display: inline-block;
        height: 16px;
        margin: 0 4px;
        cursor: pointer;
        .u-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          fill: rgba(255, 255, 255, .65);
          cursor: pointer;
          transition: all .3s;
          &:hover {
            fill: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    &:hover {
      .m-file-mask {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}
</style>
