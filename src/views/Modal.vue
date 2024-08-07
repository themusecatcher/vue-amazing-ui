<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const okType = ref('primary')
const center = ref(true)
const loading = ref(false)
const show = ref(false)

function showInfoModal() {
  modal.value.info({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showSuccessModal() {
  modal.value.success({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showErrorModal() {
  modal.value.error({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showWarningModal() {
  modal.value.warning({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showConfirmModal() {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'Some descriptions ...'
  })
  okType.value = 'primary'
  center.value = true
}
function showEraseModal() {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: 'Some descriptions ...'
  })
  okType.value = 'danger'
  center.value = true
}
function showFixModal() {
  modal.value.info({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = false
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    show.value = false
    loading.value = false
  }, 2000)
}
function onKnow() {
  // “我知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <Button type="primary" @click="showInfoModal">Info Modal</Button>
      <Button type="primary" @click="showSuccessModal">Success Modal</Button>
      <Button type="primary" @click="showErrorModal">Error Modal</Button>
      <Button type="primary" @click="showWarningModal">Warning Modal</Button>
      <Button type="primary" @click="showConfirmModal">Confirm Modal</Button>
      <Button type="primary" @click="showEraseModal">Erase Modal</Button>
      <Button type="primary" @click="showFixModal">Height Fixed Modal</Button>
    </Space>
    <Modal
      ref="modal"
      v-model:show="show"
      :width="420"
      cancel-text="取消"
      ok-text="确认"
      :ok-type="okType"
      notice-text="知道了"
      :center="center"
      :top="120"
      :loading="loading"
      @cancel="onCancel"
      @ok="onOk"
      @know="onKnow"
    />
  </div>
</template>
