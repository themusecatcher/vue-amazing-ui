<script setup lang="ts">
import { ref } from 'vue'
const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)
const open4 = ref(false)
const open5 = ref(false)
const open6 = ref(false)
const open7 = ref(false)
const open8 = ref(false)
const open9 = ref(false)
const loading = ref(false)
function onCancel() {
  // 点击遮罩层或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定回调
  open1.value = false
  open2.value = false
  open3.value = false
  open4.value = false
  open5.value = false
  open6.value = false
  open7.value = false
  open8.value = false
  open9.value = false
  console.log('ok')
}
function handleCancel() {
  console.log('cancel')
}
function handleOk() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    open4.value = false
    console.log('ok')
  }, 2000)
}
function onLoadingOk() {
  // 点击确定回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    loading.value = false
    open8.value = false
    console.log('ok')
  }, 2000)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="open1 = true">Open Dialog</Button>
    <Dialog v-model:open="open1" title="Title" @cancel="onCancel" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义宽高</h2>
    <Button type="primary" @click="open2 = true">Open Dialog</Button>
    <Dialog v-model:open="open2" :width="480" :height="180" @ok="onOk">
      <template #title>Title</template>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义按钮文字 & 类型</h2>
    <Button type="primary" @click="open3 = true">Open Dialog</Button>
    <Dialog v-model:open="open3" title="Title" cancelText="cancel" okText="ok" okType="danger" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义底部按钮</h2>
    <Button type="primary" @click="open4 = true">Open Dialog</Button>
    <Dialog
      v-model:open="open4"
      title="Title"
      cancel-text="Return"
      :cancel-props="{ type: 'danger', ghost: true }"
      ok-text="Submit"
      :ok-props="{ type: 'primary', ghost: true, loading: loading }"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">隐藏底部按钮</h2>
    <Button type="primary" @click="open5 = true">Open Dialog</Button>
    <Dialog v-model:open="open5" title="Title" :footer="false" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">固定高度</h2>
    <Button type="primary" @click="open6 = true">Open Dialog</Button>
    <Dialog v-model:open="open6" title="Title" :centered="false" :top="120" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">切换全屏</h2>
    <Button type="primary" @click="open7 = true">Open Dialog</Button>
    <Dialog v-model:open="open7" title="Title" switch-fullscreen @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">提交 loading</h2>
    <Button type="primary" @click="open8 = true">Open Dialog</Button>
    <Dialog v-model:open="open8" title="Title" :loading="loading" @ok="onLoadingOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">body 样式自定义</h2>
    <Button type="primary" @click="open9 = true">Open Dialog</Button>
    <Dialog v-model:open="open9" title="Title" :body-style="{ fontSize: '20px', color: '#eb2f96' }" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
  </div>
</template>
