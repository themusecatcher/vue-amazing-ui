<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onInfo(content: string) {
  message.value.info(content) // info调用
}
function onSuccess(content: string) {
  message.value.success(content) // success调用
}
function onError(content: string) {
  message.value.error(content) // error调用
}
function onWarning(content: string) {
  message.value.warning(content) // warning调用
}
function onLoading(content: string) {
  message.value.loading(content) // loading调用
}
function onClose() {
  console.log('close')
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <Button type="primary" @click="onInfo('This is a normal message')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
      <Button type="primary" @click="onError('This is a error message')">Error</Button>
      <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
      <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
    </Space>
    <Message ref="message" @close="onClose" />
  </div>
</template>
