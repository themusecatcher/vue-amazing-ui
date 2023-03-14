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
    <Button @click="onInfo('This is a normal message')" class="mr30">Info</Button>
    <Button @click="onSuccess('This is a success message')" class="mr30">Success</Button>
    <Button @click="onError('This is a error message')" class="mr30">Error</Button>
    <Button @click="onWarn('This is a warn message')" class="mr30">Warn</Button>
    <Message ref="message" :duration="3000" :top="30" @close="onClose" />
  </div>
</template>
<style lang="less" scoped>
</style>
