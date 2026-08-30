<script setup lang="ts">
import { ref, h } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
const message = ref()
const customMessage = ref()
function onOpen(content: string) {
  message.value.open(content) // open 调用
}
function onInfo(content: string) {
  message.value.info(content) // info 调用
}
function onSuccess(content: string) {
  message.value.success(content) // success 调用
}
function onError(content: string) {
  message.value.error(content) // error 调用
}
function onWarning(content: string) {
  message.value.warning(content) // warning 调用
}
function onLoading(content: string) {
  message.value.loading(content) // loading 调用
}
function onInfoCustom(content: string) {
  // info 调用, 并自定义图标
  message.value.info({
    content,
    icon: h(SoundFilled)
  })
}
function onOpenCustom(content: string) {
  // open 调用, 并自定义图标
  message.value.open({
    content,
    icon: h(FireFilled, { style: 'color: gold' })
  })
}
function onClassCustom(content: string) {
  message.value.info({
    content,
    icon: h(SoundFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(content: string) {
  customMessage.value.warning({
    content,
    icon: h(FireFilled),
    top: '30vh',
    style: {
      color: '#f50'
    }
  })
}
function onCustomClose() {
  message.value.info({
    content: 'The message will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
      console.log('custom message closed')
    }
  })
}
function onNeverAutoClose() {
  message.value.info({
    content: 'This message will not automatically turn off.',
    duration: null,
    onClick: () => {
      console.log('custom message clicked')
    }
  })
}
function onClick(e: Event) {
  console.log('click', e)
}
function onClose() {
  console.log('close')
}
// ========== 缺陷复现与验证 ==========
// B1：duration 为全局单例，hover 离开后按错误的 duration 重新计时
function onB1MessageA() {
  message.value.success({
    content: 'B1-A（duration: 2000）',
    duration: 2000
  })
}
function onB1MessageB() {
  message.value.info({
    content: 'B1-B（duration: 10000）',
    duration: 10000
  })
}
// B2：duration 为 null 时永久阻塞清理
function onB2Persistent() {
  message.value.info({
    content: 'B2-常驻消息（duration: null）',
    duration: null
  })
}
function onB2Temp() {
  message.value.success({
    content: 'B2-临时消息（duration: 2000）',
    duration: 2000
  })
}
function logMessageCount() {
  const count = document.querySelectorAll('.message-container').length
  console.log('[B2] 当前 DOM 中 .message-container 节点数:', count)
}
// B3：容器 top 为全局单例，后发消息会顶掉已显示消息的位置
function onB3DefaultTop() {
  message.value.success({
    content: 'B3-默认位置（top: 30）',
    duration: 10000
  })
}
function onB3CustomTop() {
  message.value.warning({
    content: 'B3-自定义位置（top: 200）',
    top: 200,
    duration: 10000
  })
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="onOpen('This is a noraml message')">Open</Button>
    <h2 class="mt30 mb10">不同类型的全局提示</h2>
    <Space>
      <Button type="primary" @click="onInfo('This is an info message')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
      <Button type="primary" @click="onError('This is an error message')">Error</Button>
      <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
      <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
    </Space>
    <h2 class="mt30 mb10">自定义图标</h2>
    <Space>
      <Button type="primary" @click="onInfoCustom('This is a custom icon message')">Custom Info Icon</Button>
      <Button type="primary" @click="onOpenCustom('This is a custom icon message')">Custom Icon</Button>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space>
      <Button type="primary" @click="onClassCustom('This is a custom class message')">Custom Class</Button>
      <Button type="primary" @click="onStyleCustom('This is a custom style message')">Custom Style</Button>
    </Space>
    <h2 class="mt30 mb10">自定义关闭延时</h2>
    <Space>
      <Button type="primary" @click="onCustomClose">Custom Close</Button>
      <Button type="primary" @click="onNeverAutoClose">Never Auto Close</Button>
    </Space>
    <h2 class="mt30 mb10">【缺陷 B1】duration 为全局单例，hover 后按错误的时长重新计时</h2>
    <p class="mb10">
      问题：组件内 <code>closeDuration</code> 是单个 ref，被所有消息共享，后发消息会覆盖它。
      导致先发消息在「鼠标移入再移出」后，按后发消息的 duration 重新计时。
    </p>
    <p class="mb10">
      步骤：① 点击「B1-A（2s）」→ ② 点击「B1-B（10s）」→ ③ 把鼠标移到 A 上停留一会再移开 → ④ 观察 A 的消失时间。
    </p>
    <p class="mb10">
      预期：A 应在移开后约 <strong>2 秒</strong> 消失。实际会等到 <strong>10 秒</strong>（沿用了 B 的时长）。
    </p>
    <Space>
      <Button type="primary" @click="onB1MessageA">① B1-A（2s）</Button>
      <Button type="primary" @click="onB1MessageB">② B1-B（10s）</Button>
    </Space>
    <h2 class="mt30 mb10">【缺陷 B2】duration 为 null 时永久阻塞清理</h2>
    <p class="mb10">
      问题：清理条件是「所有消息都已隐藏」，而 <code>duration: null</code> 的常驻消息永不隐藏，
      导致后续消息关闭后也无法被回收，数组与 DOM 无限增长。Message 组件没有关闭按钮，用户无法解除。
    </p>
    <p class="mb10">
      步骤：① 点击「常驻消息」→ ② 点击「临时消息（2s）」→ ③ 等临时消息消失 → ④ 点击「打印消息节点数」查看控制台。
    </p>
    <p class="mb10">
      预期：<strong>输出 1</strong>。实际会输出 <strong>2</strong>（临时消息仍以 display:none 残留在 DOM 中）。
    </p>
    <Space>
      <Button type="primary" @click="onB2Persistent">① 常驻消息</Button>
      <Button type="primary" @click="onB2Temp">② 临时消息（2s）</Button>
      <Button type="primary" @click="logMessageCount">④ 打印消息节点数</Button>
    </Space>
    <h2 class="mt30 mb10">【缺陷 B3】容器 top 为全局单例</h2>
    <p class="mb10">
      问题：所有消息共用一个 <code>.message-wrap</code> 容器，其 <code>top</code> 由单个 ref 控制。 后发消息传入不同
      <code>top</code> 时，会把已显示的消息一起挪走。
    </p>
    <p class="mb10"> 步骤：① 点击「默认位置」→ ② 点击「自定义位置 top:200」→ ③ 观察第一条消息的位置变化。 </p>
    <p class="mb10"> 预期：第一条消息位置 <strong>保持不变</strong>。实际会 <strong>整体跳到 200px</strong>。 </p>
    <Space>
      <Button type="primary" @click="onB3DefaultTop">① 默认位置</Button>
      <Button type="primary" @click="onB3CustomTop">② 自定义位置 top:200</Button>
    </Space>
    <Message ref="message" @click="onClick" @close="onClose" />
    <Message ref="customMessage" @click="onClick" @close="onClose" />
  </div>
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  color: #ff6900;
}
</style>
