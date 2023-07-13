<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onInfo (content: any) {
  message.value.info(content) // info调用
}
function onSuccess (content: any) {
  message.value.success(content) // success调用
}
function onError (content: any) {
  message.value.error(content) // error调用
}
function onWarn (content: any) {
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
    <Button type="primary" @click="onInfo('This is a normal message')" class="mr30">Info</Button>
    <Button type="primary" @click="onSuccess('This is a success message')" class="mr30">Success</Button>
    <Button type="primary" @click="onError('This is a error message')" class="mr30">Error</Button>
    <Button type="primary" @click="onWarn('This is a warn message')" class="mr30">Warn</Button>
    <Message ref="message" :duration="3000" :top="30" @close="onClose" />
  </div>
</template>
