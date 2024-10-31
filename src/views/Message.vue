<script setup lang="ts">
import { ref, h } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
const message = ref()
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
    duration: null,
    class: 'custom-class'
  })
}
function onStyleCustom(content: string) {
  message.value.warning({
    content,
    icon: h(FireFilled),
    duration: null,
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
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="onOpen('This is a open message')">Open</Button>
    <h2 class="mt30 mb10">不同类型的全局提示</h2>
    <Space>
      <Button type="primary" @click="onInfo('This is a info message')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
      <Button type="primary" @click="onError('This is a error message')">Error</Button>
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
    <Message ref="message" @click="onClick" @close="onClose" />
  </div>
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  color: #ff6900;
}
</style>
