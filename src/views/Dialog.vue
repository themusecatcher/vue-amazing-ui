<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const show9 = ref(false)
const loading = ref(false)
function onCancel() {
  // 点击遮罩层或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定回调
  show1.value = false
  show2.value = false
  show3.value = false
  show4.value = false
  show5.value = false
  show6.value = false
  show7.value = false
  show8.value = false
  show9.value = false
}
function handleCancel() {
  show4.value = false
}
function handleOk() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    show4.value = false
  }, 2000)
}
function onLoadingOk() {
  // 点击确定回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    show8.value = false
    loading.value = false
  }, 2000)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="show1 = true">Open Dialog</Button>
    <Dialog v-model:show="show1" title="Title" @cancel="onCancel" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义宽高</h2>
    <Button type="primary" @click="show2 = true">Open Dialog</Button>
    <Dialog v-model:show="show2" :width="480" :height="180" @ok="onOk">
      <template #title>Title</template>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义按钮文字 & 类型</h2>
    <Button type="primary" @click="show3 = true">Open Dialog</Button>
    <Dialog v-model:show="show3" title="Title" cancelText="cancel" okText="ok" okType="danger" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义底部按钮</h2>
    <Button type="primary" @click="show4 = true">Open Dialog</Button>
    <Dialog
      v-model:show="show4"
      title="Title"
      cancel-text="Return"
      :cancel-props="{ type: 'danger', ghost: true }"
      ok-text="Submit"
      :ok-props="{ type: 'primary', ghost: true, loading: loading }"
      @ok="handleOk"
    >
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">隐藏底部按钮</h2>
    <Button type="primary" @click="show5 = true">Open Dialog</Button>
    <Dialog v-model:show="show5" title="Title" :footer="false" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">固定高度</h2>
    <Button type="primary" @click="show6 = true">Open Dialog</Button>
    <Dialog v-model:show="show6" title="Title" :centered="false" :top="120" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">切换全屏</h2>
    <Button type="primary" @click="show7 = true">Open Dialog</Button>
    <Dialog v-model:show="show7" title="Title" switch-fullscreen @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">提交 loading</h2>
    <Button type="primary" @click="show8 = true">Open Dialog</Button>
    <Dialog v-model:show="show8" title="Title" :loading="loading" @ok="onLoadingOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">body 样式自定义</h2>
    <Button type="primary" @click="show9 = true">Open Dialog</Button>
    <Dialog v-model:show="show9" title="Title" :body-style="{ fontSize: '20px', color: '#eb2f96' }" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
  </div>
</template>
