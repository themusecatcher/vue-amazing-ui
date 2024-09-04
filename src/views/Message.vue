<script setup lang="ts">
import { ref, h } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
// import { message } from 'ant-design-vue'

const message = ref()
const messageRef = ref()
function onOpen(content: string) {
  message.value.open({
    content,
    icon: h(SoundFilled),
    iconColor: 'gold',
    duration: 5000
  }) // open 调用
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
function onUnifiedIcon(content: string) {
  messageRef.value.info(content)
}
function onSeparatelyIcon(content: string) {
  // info 调用, 并自定义图标
  messageRef.value.warning({
    content,
    icon: h(FireFilled)
  })
}
function onClick(e: Event) {
  console.log('click', e)
}
function onClose() {
  console.log('close')
}
const success = () => {
  // message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button @click="success">ant design</Button>
    <Space vertical>
      <Button type="primary" @click="onOpen('This is a open message')">Open</Button>
      <Button type="primary" @click="onInfo('This is a info message')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
      <Button type="primary" @click="onError('This is a error message')">Error</Button>
      <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
      <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
    </Space>
    <Message ref="message" :duration="null" @click="onClick" @close="onClose" />
    <h2 class="mt30 mb10">自定义图标</h2>
    <Space>
      <Button type="primary" @click="onUnifiedIcon('This is a unified custom icon message')"
        >Unified Custom Icon</Button
      >
      <Button type="primary" @click="onSeparatelyIcon('This is a separately custom icon message')"
        >Separately Custom Icon</Button
      >
    </Space>
    <Message ref="messageRef" :icon="h(SoundFilled)" @click="onClick" @close="onClose">
      <!-- <template #icon>
        <SoundFilled />
      </template> -->
    </Message>
  </div>
</template>
