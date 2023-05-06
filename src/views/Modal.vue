<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const center = ref(true)
const loading = ref(false)
const visible = ref(false)
function showConfirmModal (content: string) {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showDeleteModal (content: string) {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showInfoModal (content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showSuccessModal (content: string) {
  modal.value.success({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showErrorModal (content: string) {
  modal.value.error({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showWarnModal (content: string) {
  modal.value.warn({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showFixModal (content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = false
  visible.value = true
}
function onCancel () { // “取消”按钮回调
  visible.value = false
}
function onConfirm () { // “确定”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    visible.value = false
    loading.value = false
  }, 500)
}
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>
<template>
  <div>
    <h2 class="mb10">Modal 信息提示基本使用</h2>
    <Button class="mr30" @click="showConfirmModal('Some descriptions ...')">提交确认</Button>
    <Button class="mr30" @click="showDeleteModal('Some descriptions ...')">删除确认</Button>
    <Button class="mr30" @click="showInfoModal('Some descriptions ...')">Info</Button>
    <Button class="mr30" @click="showSuccessModal('Some descriptions ...')">Success</Button>
    <Button class="mr30" @click="showErrorModal('Some descriptions ...')">Error</Button>
    <Button class="mr30" @click="showWarnModal('Some descriptions ...')">Warn</Button>
    <Button class="mr30" @click="showFixModal('Some descriptions ...')">高度固定</Button>
    <Modal
      ref="modal"
      :width="420"
      :top="120"
      cancelText="取消"
      okText="确认"
      noticeText="知道了"
      :center="center"
      :loading="loading"
      :visible="visible"
      @cancel="onCancel"
      @ok="onConfirm"
      @know="onKnow" />
  </div>
</template>
