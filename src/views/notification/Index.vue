<script setup lang="ts">
import { ref, h } from 'vue'
import { CloudFilled, FireFilled } from '@ant-design/icons-vue'
const notification = ref()
function onOpen(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description
  }) // open 调用
}
function onInfo(description: string) {
  notification.value.info({
    title: 'Notification Title',
    description
  }) // info 调用
}
function onSuccess(description: string) {
  notification.value.success({
    title: 'Notification Title',
    description
  }) // success 调用
}
function onWarning(description: string) {
  notification.value.warning({
    title: 'Notification Title',
    description
  }) // warning 调用
}
function onError(description: string) {
  notification.value.error({
    title: 'Notification Title',
    description
  }) // error 调用
}
function onInfoCustom(description: string) {
  notification.value.info({
    title: 'Notification Title',
    icon: h(CloudFilled),
    description
  })
}
function onOpenCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    icon: h(FireFilled, { style: 'color: gold' }),
    description
  })
}
function onClassCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description,
    icon: h(FireFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description,
    icon: h(CloudFilled),
    style: {
      width: '420px',
      color: '#ff6900'
    }
  })
}
function onOpenPlacement(placement: string) {
  notification.value.info({
    title: 'Notification Title',
    description: 'This is the content of the notification.',
    placement
  })
}
function onCustomClose() {
  notification.value.info({
    title: 'Notification Title',
    description: 'The notification will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
      console.log('custom notification closed')
    }
  })
}
function onNeverAutoClose() {
  notification.value.info({
    title: 'Notification Title',
    description: 'This notification will not automatically turn off.',
    duration: null
  })
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
}
// ========== 缺陷复现与验证 ==========
// B5：常驻通知阻塞分组回收。该缺陷已于本次队列重构修复，以下用例用于回归验证
function onB5Persistent() {
  notification.value.info({
    title: 'B5 常驻通知',
    description: 'duration: null，不会自动关闭',
    duration: null
  })
}
function onB5Temp() {
  notification.value.success({
    title: 'B5 临时通知',
    description: 'duration: 2000，2 秒后自动关闭',
    duration: 2000
  })
}
function logNotificationCount() {
  const count = document.querySelectorAll('.notification-container').length
  console.log('[B5] 当前 DOM 中 .notification-container 节点数:', count)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>
    <h2 class="mt30 mb10">不同类型的通知提醒</h2>
    <Space>
      <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
      <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
      <Button type="primary" @click="onError('This is a error notification')">Error</Button>
    </Space>
    <h2 class="mt30 mb10">自定义图标</h2>
    <Space>
      <Button type="primary" @click="onInfoCustom('This is a custom icon notification')">Custom Info Icon</Button>
      <Button type="primary" @click="onOpenCustom('This is a custom icon notification')">Custom Icon</Button>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space>
      <Button type="primary" @click="onClassCustom('This is a custom class notification')">Custom Class</Button>
      <Button type="primary" @click="onStyleCustom('This is a custom style notification')">Custom Style</Button>
    </Space>
    <h2 class="mt30 mb10">弹出位置</h2>
    <Space>
      <Button type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
      <Button type="primary" @click="onOpenPlacement('topRight')">topRight</Button>
      <Button type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
      <Button type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
    </Space>
    <h2 class="mt30 mb10">自定义关闭延时</h2>
    <Space>
      <Button type="primary" @click="onCustomClose">Custom Close</Button>
      <Button type="primary" @click="onNeverAutoClose">Never Auto Close</Button>
    </Space>
    <h2 class="mt30 mb10">【缺陷 B5】常驻通知阻塞分组回收（已修复，回归验证）</h2>
    <p class="mb10">
      问题：旧实现仅在「整组通知全部关闭」时才清理数据。因此只要存在一条 <code>duration: null</code> 的常驻通知，
      该分组内所有已关闭通知的 DOM 节点都会永久保留，造成内存与 DOM 泄漏。
    </p>
    <p class="mb10">
      步骤：① 点击「常驻通知」→ ② 点击「临时通知」→ ③ 等临时通知自动消失 → ④ 点击「打印通知节点数」并查看控制台。
    </p>
    <p class="mb10">
      预期：<strong>输出 1</strong>（仅剩常驻通知）。修复前会输出 <strong>2</strong>（临时通知的 DOM 未被回收）。
    </p>
    <Space>
      <Button type="primary" @click="onB5Persistent">① 常驻通知</Button>
      <Button type="primary" @click="onB5Temp">② 临时通知（2s）</Button>
      <Button type="primary" @click="logNotificationCount">④ 打印通知节点数</Button>
    </Space>
    <Notification ref="notification" @close="onClose" />
  </div>
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  color: #d4380d;
  .notification-title {
    font-weight: 500;
  }
}
</style>
