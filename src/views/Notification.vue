<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()

function onShow (info: string) {
  notification.value.open(info) // 默认使用
}
function onInfo (info: string) {
  notification.value.info(info) // 默认使用
}
function onSuccess (info: string) {
  notification.value.success(info) // success调用
}
function onError (info: string) {
  notification.value.error(info) // error调用
}
function onWarn (info: string) {
  notification.value.warn(info) // warning调用
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>
<template>
  <div>
    <Button @click="onShow('This is a normal notification')" class="mr30">Open</Button>
    <Button @click="onInfo('This is a normal notification')" class="mr30">Info</Button>
    <Button @click="onSuccess('This is a success notification')" class="mr30">Success</Button>
    <Button @click="onError('This is a error notification')" class="mr30">Error</Button>
    <Button @click="onWarn('This is a warn notification')" class="mr30">Warn</Button>
    <Notification
      ref="notification"
      placement="topRight"
      :duration="3000"
      :top="30"
      @close="onClose" />
  </div>
</template>
<style lang="less" scoped>

</style>
