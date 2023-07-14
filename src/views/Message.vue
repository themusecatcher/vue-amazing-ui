<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onInfo (content: string) {
  message.value.info(content) // info调用
}
function onSuccess (content: string) {
  message.value.success(content) // success调用
}
function onError (content: string) {
  message.value.error(content) // error调用
}
function onWarn (content: string) {
  message.value.warn(content) // warn调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <div>
    <h1>Message 全局提示</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :size="30">
      <Button type="primary" @click="onInfo('This is a normal message')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
      <Button type="primary" @click="onError('This is a error message')">Error</Button>
      <Button type="primary" @click="onWarn('This is a warn message')">Warn</Button>
    </Space>
    <Message ref="message" :duration="3000" :top="30" @close="onClose" />
  </div>
</template>
