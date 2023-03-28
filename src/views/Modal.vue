<script setup lang="ts">
import { ref } from 'vue'
import { rafTimeout } from '../../packages'

const center = ref(true)
const loading = ref(false)
const visible = ref(false)
const title = ref('')
const content = ref('Content of the modal ...')
const mode = ref('confirm')
const type = ref('delete')
function showConfirmModal (info: string) {
  mode.value = 'confirm'
  type.value = 'confirm'
  title.value = 'Do you Want to submit these items ?'
  content.value = info
  visible.value = true
}
function showDeleteModal (info: string) {
  mode.value = 'confirm'
  type.value = 'delete'
  title.value = 'Do you Want to delete these items ?'
  content.value = info
  visible.value = true
}
function showInfoModal (info: string) {
  mode.value = 'info'
  type.value = 'success'
  title.value = 'Do you See these items ?'
  content.value = info
  visible.value = true
}
function showFixModal (info: string) {
  mode.value = 'info'
  type.value = 'success'
  title.value = 'Do you See these items ?'
  center.value = false
  content.value = info
  visible.value = true
}
function showCenterModal (info: string) {
  mode.value = 'info'
  type.value = 'success'
  title.value = 'Do you See these items ?'
  center.value = true
  content.value = info
  visible.value = true
}
function onCancel () { // “取消”按钮回调
  visible.value = false
}
function onConfirm () { // “确定”,“知道了”按钮回调
  loading.value = true // 开启加载状态
  rafTimeout(() => {
    visible.value = false
    loading.value = false
  }, 500)
}
</script>
<template>
  <div>
    <h2 class="mb10">Modal 信息提示基本使用</h2>
    <Button class="mr30" @click="showConfirmModal('Some descriptions ...')">提交确认信息提示框</Button>
    <Button class="mr30" @click="showDeleteModal('Some descriptions ...')">删除确认信息提示框</Button>
    <Button class="mr30" @click="showFixModal('Some descriptions ...')">高度固定信息提示框</Button>
    <Button class="mr30" @click="showCenterModal('Some descriptions ...')">水平垂直居中信息提示框</Button>
    <Modal
      :title="title"
      :content="content"
      :width="480"
      cancelText="取消"
      okText="确认"
      noticeText="知道了"
      :mode="mode"
      :type="type"
      :center="center"
      :loading="loading"
      @cancel="onCancel"
      @ok="onConfirm"
      v-show="visible"
    />
  </div>
</template>
<style lang="less" scoped>
</style>
