<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
const visible6 = ref(false)
const loading = ref(false)
function showDialog () {
  visible1.value = true
}
function showCustomHeightDialog () {
  visible2.value = true
}
function showFooterDialog () {
  visible3.value = true
}
function showFixPositionDialog () {
  visible4.value = true
}
function showFullScreenDialog () {
  visible5.value = true
}
function showCustomHBodyDialog () {
  visible6.value = true
}
function onClose () { // 关闭回调
  visible1.value = false
  visible2.value = false
  visible3.value = false
  visible4.value = false
  visible5.value = false
  visible6.value = false
}
function onCancel () { // “取消”按钮回调
  visible3.value = false
}
function onConfirm () { // “确定”,“知道了”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    visible3.value = false
    loading.value = false
  }, 500)
}
</script>
<template>
  <div>
    <h1>Dialog 对话框</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :size="16">
      <Button type="primary" @click="showDialog">默认对话框</Button>
      <Dialog :visible="visible1" @close="onClose">
        <template #title>Title</template>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Dialog>
      <Button type="primary" @click="showCustomHeightDialog">内容高度自定义</Button>
      <Dialog
        :height="360"
        @close="onClose"
        :visible="visible2">
        <template #title>Title</template>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Dialog>
      <Button type="primary" @click="showFooterDialog">有底部按钮</Button>
      <Dialog
        footer
        @close="onClose"
        @cancel="onCancel"
        @ok="onConfirm"
        :loading="loading"
        :visible="visible3">
        <template #title>Title</template>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Dialog>
      <Button type="primary" @click="showFixPositionDialog">位置高度自定义</Button>
      <Dialog
        :center="false"
        :top="120"
        @close="onClose"
        :visible="visible4">
        <template #title>Title</template>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Dialog>
      <Button type="primary" @click="showFullScreenDialog">允许切换全屏</Button>
      <Dialog
        switch-fullscreen
        @close="onClose"
        :visible="visible5">
        <template #title>Title</template>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Dialog>
      <Button type="primary" @click="showCustomHBodyDialog">body 样式自定义</Button>
      <Dialog
        :body-style="{fontSize: '20px', color: '#eb2f96'}"
        @close="onClose"
        :visible="visible6">
        <template #title>Title</template>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Dialog>
    </Space>
  </div>
</template>
