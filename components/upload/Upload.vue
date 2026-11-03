<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { VNode } from 'vue'
import Spin, { type SpinProps } from 'components/spin'
import Image, { type ImageProps } from 'components/image'
import Space, { type SpaceProps } from 'components/space'
import { log, useControlledModel } from 'components/utils'
import { attrAccept } from './accept'
export interface FileType {
  name?: string // 文件名
  url: any // 文件地址
  [propName: string]: any // 允许携带任意自定义字段，会随原始文件对象透传
}

export interface Props {
  accept?: string // 接受上传的文件类型，与 <input type="file" /> 的 accept 属性一致，参考 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/accept
  multiple?: boolean // 是否支持多选文件，开启后可选择多个文件
  maxCount?: number // 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
  tip?: string // 上传描述文字
  fit?: 'contain' | 'fill' | 'cover' | 'none' | 'scale-down' // 预览图片缩放规则，仅当上传文件为图片时生效
  draggable?: boolean // 是否支持拖拽上传，开启后可拖拽文件到选择框上传
  disabled?: boolean // 是否禁用，只能预览，不能删除和上传
  spaceProps?: SpaceProps // Space 组件属性配置，用于配置多个文件时的排列方式
  spinProps?: SpinProps // Spin 组件属性配置，用于配置上传中样式
  imageProps?: ImageProps // Image 组件属性配置，用于配置图片预览
  beforeUpload?: (file: File) => boolean | void | Promise<unknown> // 上传文件之前的钩子，参数为上传的文件，返回 false 则停止上传，返回 true 开始上传；支持返回一个 Promise 对象（如服务端校验等），Promise 对象 reject 时停止上传，resolve 时开始上传；通常用来校验用户上传的文件格式和大小
  uploadMode?: 'base64' | 'custom' // 上传文件的方式
  customRequest?: (file: File) => Promise<FileType> // 自定义上传行为，只有 uploadMode: custom 时，才会使用 customRequest 自定义上传行为
  fileList?: FileType[] // (v-model) 已上传的文件列表
}
// 声明组件插槽类型
export interface UploadSlots {
  tip?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  accept: '*', // 默认支持所有类型
  multiple: false,
  maxCount: undefined,
  tip: 'Upload',
  fit: 'contain',
  draggable: true,
  disabled: false,
  spaceProps: () => ({}),
  spinProps: () => ({}),
  imageProps: () => ({}),
  beforeUpload: () => true,
  uploadMode: 'base64',
  // custom 模式下的兜底实现：返回空结果，避免未配置时 .then 抛错
  customRequest: () => Promise.resolve({ url: '' })
})
defineSlots<UploadSlots>()
// (v-model) 上传文件列表：传值即受控，未传时组件自持
// 写入一律整体替换：受控时该 ref 就是父数组，下标赋值 / splice 会绕过上报并污染父级数据
const uploadedFilesModel = useControlledModel<FileType[]>('fileList', [])
const showUpload = ref<number>(1) // 展示的上传框
const uploading = ref<boolean[]>([]) // 上传中
const uploadInputRef = ref<HTMLInputElement[]>([]) // 上传文件控件引用
const imageRef = ref<InstanceType<typeof Image>[]>([]) // Image 组件实例引用
// 组件自身不再持有 Message，操作提示交由使用方通过 success / error / remove 事件自行处理
const emits = defineEmits(['update:fileList', 'drop', 'reject', 'change', 'preview', 'remove', 'success', 'error'])
const maxFileCount = computed(() => {
  if (props.maxCount === undefined) {
    return Infinity
  }
  return props.maxCount
})
watchEffect(() => {
  initUpload()
})
function initUpload(): void {
  // 展示槽位数由 fileList 长度与 maxCount 推得；超限时不再截断数组本体
  // （截断必须改父级数组，与「受控只上报」冲突），模板本就只渲染 showUpload 个槽位
  const count = uploadedFilesModel.value.length
  if (props.disabled) {
    // 禁用
    showUpload.value = count
  } else if (count < maxFileCount.value) {
    showUpload.value = count + 1
  } else if (maxFileCount.value === 1 && count === 1) {
    // 单文件模式占满后在预览格外常驻一格上传框（共 2 格），上传落点覆盖槽位 0：
    // 仍可上传，新文件代替当前文件
    showUpload.value = 2
  } else {
    showUpload.value = maxFileCount.value
  }
}
/**
 * 按「触发上传的格子下标」与「本次待写入的文件数」求落点槽位
 *
 * 返回值与文件一一对应，长度不足 `count` 即表示多余文件被丢弃：槽位下标合法范围是
 * `[0, maxCount - 1]`，超出的文件直接丢弃（否则会进 fileList 却不展示、无法删除）。
 * 单文件模式特殊：常驻上传框的下标是 1，但它与预览格共用槽位 0，故一次只收第一个文件。
 * 一个文件都不收时返回空数组 —— 落点数绝不能多于文件数（否则 `uploadFile` 会拿到 `undefined`）
 */
function resolveSlots(index: number, count: number): number[] {
  // 全部文件都被 accept 拒绝时没有任何落点：单文件模式的槽位恒为 0，
  // 若此时仍返回 `[0]`，`uploadFile(undefined, 0)` 会写出空文件（custom 模式）或卡住 loading（base64 模式）
  if (count === 0) return []
  if (maxFileCount.value === 1) return [0]
  return Array.from({ length: count }, (_, n) => index + n).filter((slot) => slot < maxFileCount.value)
}
/**
 * 按上传槽位写入结果：整体替换数组，保留槽位下标的稀疏语义，返回写入后的新数组
 *
 * 事件载荷必须用返回值：受控时模型写完立刻回读，拿到的仍是父侧旧值
 */
function setUploadedFile(index: number, file: FileType): FileType[] {
  const next = [...uploadedFilesModel.value]
  next[index] = file
  uploadedFilesModel.value = next
  return next
}
/**
 * 上传成功收口：写入槽位后派发 `success` / `change`
 *
 * 两条上传路径（base64 读取、customRequest）共用，避免其中一条漏用写入结果而当载荷落后一拍
 */
function emitUploaded(index: number, file: FileType): void {
  const nextFiles = setUploadedFile(index, file)
  emits('success', file, nextFiles)
  emits('change', nextFiles)
}
// 检查 url 是否为图片
function isImage(url: string): boolean {
  const imageUrlReg = /\.(jpg|jpeg|png|gif|bmp|webp|svg|ico)$/i
  const base64Reg = /^data:image/
  return imageUrlReg.test(url) || base64Reg.test(url)
}
// 检查 url 是否为 pdf
function isPDF(url: string): boolean {
  const pdfUrlReg = /\.pdf$/i
  const base64Reg = /^data:application\/pdf/
  return pdfUrlReg.test(url) || base64Reg.test(url)
}
// 拖拽上传
function onDrop(e: DragEvent, index: number): void {
  const files = e.dataTransfer?.files
  if (files?.length) {
    // 拖拽路径不受 <input accept> / <input multiple> 约束，需在此复刻：
    // 先按 accept 分区（被拒的通过 reject 事件回传），未开启多选时只取第一个文件。
    // 分区必须一趟走完：attrAccept 对非法 token 会告警，逐条 filter 等于对同一文件重复求值
    const dropped = Array.from(files)
    const accepted: File[] = []
    const rejected: File[] = []
    dropped.forEach((file) => {
      if (attrAccept(file, props.accept)) {
        accepted.push(file)
      } else {
        rejected.push(file)
      }
    })
    if (rejected.length > 0) {
      emits('reject', rejected)
    }
    const picked = props.multiple ? accepted : accepted.slice(0, 1)
    const slots = resolveSlots(index, picked.length)
    slots.forEach((slot, n) => uploadFile(picked[n], slot))
    // input 的 change 事件默认保存上一次 input 的 value 值，同一 value 值(根据文件路径判断)在上传时不重新加载
    uploadInputRef.value[index].value = ''
  }
  emits('drop', e)
}
function onClickFileInput(index: number): void {
  uploadInputRef.value[index].click()
}
// 点击上传
function onUpload(e: any, index: number): void {
  const files = e.target.files as FileList | null
  if (files?.length) {
    // 单文件模式下常驻上传框（下标 1）与预览格共用槽位 0，落点由 resolveSlots 统一计算
    const picked = Array.from(files)
    const slots = resolveSlots(index, picked.length)
    slots.forEach((slot, n) => uploadFile(picked[n], slot))
    // input 的 change 事件默认保存上一次 input 的 value 值，同一 value 值(根据文件路径判断)在上传时不重新加载
    uploadInputRef.value[index].value = ''
  }
}
// 使用方返回 false 表示主动拒绝该文件：以带标记的 Error 承载这一信号，
// 与真实异常区分（靠消息字符串判定太脆弱，使用方抛同名消息会被误判静默）
function createBeforeUploadRejected(): Error {
  const error = new Error('beforeUpload returned false')
  error.name = 'BeforeUploadRejected'
  return error
}
// 统一上传文件方法
function uploadFile(file: File, index: number): void {
  function promiseFunction() {
    return new Promise((resolve, reject) => {
      try {
        // 尝试执行传入的函数，并获取返回值
        const result = props.beforeUpload(file)
        // 检查返回值是否是 Promise
        if (result instanceof Promise) {
          // 如果是 Promise，则等待其 resolve 或 reject
          result.then(resolve, reject)
        } else {
          // 检查返回值是否为布尔值
          if (typeof result === 'boolean') {
            // 如果是布尔值，根据值 resolve 或 reject
            result ? resolve(result) : reject(createBeforeUploadRejected())
          } else {
            // 否则，直接 resolve 返回值
            resolve(result)
          }
        }
      } catch (error) {
        // 如果执行过程中抛出错误，则 reject 错误
        reject(error)
      }
    })
  }
  promiseFunction()
    .then(() => {
      // 使用用户钩子进行上传前文件判断，例如大小、类型限制
      if (maxFileCount.value > showUpload.value) {
        showUpload.value++
      }
      if (props.uploadMode === 'base64') {
        // 以 base64 方式读取文件
        uploading.value[index] = true
        base64Upload(file, index)
      }
      if (props.uploadMode === 'custom') {
        // 自定义上传行为，需配合 customRequest 属性
        uploading.value[index] = true
        customUpload(file, index)
      }
    })
    .catch((error: unknown) => {
      // beforeUpload 返回 false 表示使用方主动拒绝该文件（内部以带标记的 Error 承载这一信号），属预期业务流，不告警；
      // 其余抛错才是使用方回调异常 —— 与 Dialog / Modal 的回调出错同级，用 error 便于线上排查
      if (error instanceof Error && error.name === 'BeforeUploadRejected') return
      log('error', 'Upload', 'beforeUpload 执行出错，已跳过该文件', error)
    })
}
function base64Upload(file: File, index: number): void {
  const reader = new FileReader()
  reader.readAsDataURL(file) // 以 base64 方式读取文件
  reader.onloadstart = function (e) {
    // 当读取操作开始时触发：loading 已在 uploadFile 中置位，此处无需再处理
  }
  reader.onabort = function (e) {
    // 当读取操作被中断时触发：库内未开放取消能力（无 reader.abort() 调用）；
    // 若将来支持，loading 复位同样由 onloadend 统一承担，无需在此重复
  }
  reader.onerror = function (e) {
    // 当读取操作发生错误时触发：读取失败不会有 onload，需补上可观测日志与失败事件；
    // loading 由 onloadend 兜底复位（error 之后必然触发）
    log('error', 'Upload', '文件读取失败，loading 已复位并派发 error 事件', reader.error)
    emits('error', reader.error)
  }
  reader.onprogress = function (e) {
    // 在读取 Blob 时触发，读取上传进度，50ms 左右调用一次
    if (e.loaded === e.total) {
      // 上传完成：进度读满即隐藏 loading（原有提前收口行为，保留）
      // 代价：此刻 uploadedFilesModel[index] 尚未写入（要到 onload 才赋值），模板的「上传框」
      // （v-show="!uploading[n-1] && !uploadedFilesModel[n-1]"）与「loading」（v-if="uploading[n-1]"）
      // 会同时为假，该槽位理论上存在一帧空窗；失败 / 中断 / progress 未报满的复位由 onloadend 兜底
      uploading.value[index] = false // 隐藏 loading 状态
    }
  }
  reader.onload = function (e) {
    // 当读取操作成功完成时调用
    // 该文件的 base64 数据，如果是图片，则前端可直接用来展示图片
    const uploaded = { name: file.name, url: e.target?.result } as FileType
    emitUploaded(index, uploaded)
  }
  reader.onloadend = function (e) {
    // 当读取操作结束时触发（成功 / 失败 / 中断都会触发）：作为 loading 的兜底复位。
    // onprogress 只在进度读满（`loaded === total`）时收口，而规范中 progress 属于「可以派发」，
    // 读到结束不保证派发一次相等的 progress（失败 / 中断更必然没有），故这里再兜一层；
    // 与 onprogress 的复位互为幂等，不会造成重复渲染。
    uploading.value[index] = false
  }
}
function customUpload(file: File, index: number): void {
  props
    .customRequest(file)
    .then((res: FileType) => {
      emitUploaded(index, res)
    })
    .catch((err: any) => {
      if (maxFileCount.value > 1) {
        showUpload.value = uploadedFilesModel.value.length + 1
      }
      emits('error', err)
    })
    .finally(() => {
      uploading.value[index] = false
    })
}
function onPreview(index: number, url: string): void {
  if (isImage(url)) {
    const files = uploadedFilesModel.value.slice(0, index).filter((file) => !isImage(file.url))
    imageRef.value[index - files.length].preview(0)
  } else {
    window.open(url)
  }
  emits('preview', uploadedFilesModel.value[index])
}
function onRemove(index: number): void {
  if (uploadedFilesModel.value.length < maxFileCount.value) {
    showUpload.value--
  }
  const next = [...uploadedFilesModel.value]
  const [removed] = next.splice(index, 1)
  uploadedFilesModel.value = next
  emits('remove', removed)
  emits('change', next)
}
</script>
<template>
  <div class="upload-wrap">
    <Space gap="small" v-bind="spaceProps">
      <div class="upload-item-panel" v-for="n of showUpload" :key="n">
        <div
          v-show="!uploading[n - 1] && !uploadedFilesModel[n - 1]"
          class="upload-item"
          :class="{ 'upload-disabled': disabled }"
          @dragenter.stop.prevent
          @dragover.stop.prevent
          @drop.stop.prevent="draggable && !disabled ? onDrop($event, n - 1) : () => false"
          @click="!disabled ? onClickFileInput(n - 1) : () => false"
        >
          <input
            ref="uploadInputRef"
            type="file"
            @click.stop
            :accept="accept"
            :multiple="multiple"
            @change="onUpload($event, n - 1)"
            style="display: none"
          />
          <div>
            <svg
              focusable="false"
              class="plus-svg"
              data-icon="plus"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <defs></defs>
              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
              <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
            </svg>
            <p class="upload-tip">
              <slot name="tip">{{ tip }}</slot>
            </p>
          </div>
        </div>
        <div v-if="uploading[n - 1]" class="file-uploading">
          <Spin
            class="spin-uploading"
            tip="uploading"
            size="small"
            indicator="line-wheel"
            color="var(--va-cp-upload-primary-color, var(--va-primary-color))"
            v-bind="spinProps"
          />
        </div>
        <div v-else-if="uploadedFilesModel[n - 1]" class="file-preview">
          <Image
            v-if="isImage(uploadedFilesModel[n - 1].url)"
            ref="imageRef"
            :bordered="false"
            :width="82"
            :height="82"
            :fit="fit"
            :src="uploadedFilesModel[n - 1].url"
            :name="uploadedFilesModel[n - 1].name"
            v-bind="imageProps"
          />
          <svg
            v-else-if="isPDF(uploadedFilesModel[n - 1].url)"
            class="file-svg"
            focusable="false"
            data-icon="file-pdf"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"
            ></path>
          </svg>
          <svg
            v-else
            class="file-svg"
            focusable="false"
            data-icon="file"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"
            ></path>
          </svg>
          <div class="file-mask">
            <a class="file-icon" title="预览" @click="onPreview(n - 1, uploadedFilesModel[n - 1].url)">
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="eye"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                ></path>
              </svg>
            </a>
            <a v-show="!disabled" class="file-icon" title="删除" @click.prevent.stop="onRemove(n - 1)">
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="delete"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Space>
  </div>
</template>
<style lang="less" scoped>
.upload-wrap {
  display: inline-block;
  width: 100%;
  .upload-item-panel {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    .upload-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100px;
      height: 100px;
      border-radius: 8px;
      border: 1px dashed var(--va-border-color);
      background-color: var(--va-fill-color-1);
      cursor: pointer;
      transition: border-color 0.3s;
      &:hover {
        border-color: var(--va-cp-upload-primary-color, var(--va-primary-color));
      }
      .plus-svg {
        display: inline-block;
        font-size: 14px;
        color: var(--va-text-color-1);
      }
      .upload-tip {
        margin-top: 8px;
        font-size: 14px;
        color: var(--va-text-color-1);
        line-height: 1.5714285714285714;
      }
    }
    .upload-disabled {
      cursor: not-allowed;
      &:hover {
        border-color: var(--va-border-color);
      }
    }
    .file-uploading {
      width: 100px;
      height: 100px;
      padding: 8px;
      border-radius: 8px;
      border: 1px dashed var(--va-border-color);
      background-color: var(--va-fill-color-1);
      display: flex;
      align-items: center;
      text-align: center;
      .spin-uploading {
        display: inline-block;
        :deep(.spin-tip) {
          max-width: 82px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .file-preview {
      position: relative;
      padding: 8px;
      width: 100px;
      height: 100px;
      border-radius: 8px;
      border: 1px solid var(--va-border-color);
      display: flex;
      align-items: center;
      text-align: center;
      .file-svg {
        display: inline-block;
        width: 100%;
        height: 60px;
        color: var(--va-cp-upload-primary-color, var(--va-primary-color));
      }
      .file-mask {
        // top right bottom left 简写为 inset: 0
        // inset 无论元素的书写模式、行内方向和文本朝向如何，其所定义的都不是逻辑偏移而是实体偏移
        position: absolute;
        inset: 0;
        margin: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
        .file-icon {
          display: inline-block;
          height: 16px;
          margin: 0 4px;
          cursor: pointer;
          .icon-svg {
            display: inline-block;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.65);
            cursor: pointer;
            transition: color 0.3s;
            &:hover {
              color: var(--va-text-color-solid);
            }
          }
        }
      }
      &:hover {
        .file-mask {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
}
</style>
