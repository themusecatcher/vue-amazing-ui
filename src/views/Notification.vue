<script setup lang="ts">
import { ref } from 'vue'

const notification = ref()

function onOpen (info: string) {
  notification.value.open({
    message: 'Notification Title',
    description: info
  }) // 默认使用
}
function onInfo (info: string) {
  notification.value.info({
    message: 'Notification Title',
    description: info
  }) // info调用
}
function onSuccess (info: string) {
  notification.value.success({
    message: 'Notification Title',
    description: info
  }) // success调用
}
function onWarning (info: string) {
  notification.value.warning({
    message: 'Notification Title',
    description: info
  }) // warning调用
}
function onError (info: string) {
  notification.value.error({
    message: 'Notification Title',
    description: info
  }) // error调用
}
function onOpenPlacement (place: string) {
  notification.value.info({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
    placement: place
  })
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>
<template>
  <div>
    <h1>Notification 通知提醒框</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :size="30">
      <Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>
      <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
      <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
      <Button type="primary" @click="onError('This is a error notification')">Error</Button>
    </Space>
    <h2 class="mt30 mb10">位置</h2>
    <Space :size="30">
      <Button type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
      <Button type="primary" @click="onOpenPlacement('topRight')">topRight</Button>
      <Button type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
      <Button type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
    </Space>
    <Notification
      ref="notification"
      placement="topRight"
      :duration="3000"
      :top="24"
      @close="onClose" />
  </div>
</template>
