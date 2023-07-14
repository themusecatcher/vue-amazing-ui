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
    <h1>Modal 信息提示</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :size="30">
      <Button type="primary" @click="showConfirmModal('Some descriptions ...')">提交确认</Button>
      <Button type="primary" @click="showDeleteModal('Some descriptions ...')">删除确认</Button>
      <Button type="primary" @click="showInfoModal('Some descriptions ...')">Info</Button>
      <Button type="primary" @click="showSuccessModal('Some descriptions ...')">Success</Button>
      <Button type="primary" @click="showErrorModal('Some descriptions ...')">Error</Button>
      <Button type="primary" @click="showWarnModal('Some descriptions ...')">Warn</Button>
      <Button type="primary" @click="showFixModal('Some descriptions ...')">高度固定</Button>
    </Space>
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
