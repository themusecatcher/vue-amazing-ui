<script setup lang="ts">
import { ref } from 'vue'
const loadingBarRef = ref()
const disabled = ref(true)
const localCardRef = ref()
const localLoadingBarRef = ref()
const customLoadingBarRef = ref()
function handleStart() {
  loadingBarRef.value.start()
  disabled.value = false
}
function handleFinish() {
  loadingBarRef.value.finish()
  disabled.value = true
}
function handleError() {
  disabled.value = true
  loadingBarRef.value.error()
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space>
      <Button type="primary" @click="handleStart">开始</Button>
      <Button :disabled="disabled" @click="handleFinish">结束</Button>
      <Button type="danger" @click="handleError">报个错</Button>
    </Space>
    <LoadingBar ref="loadingBarRef" />
    <h2 class="mt30 mb10">局部加载条</h2>
    <div class="card-container" ref="localCardRef">
      <Space>
        <Button type="primary" @click="localLoadingBarRef.start()">Start</Button>
        <Button @click="localLoadingBarRef.finish()">Finish</Button>
        <Button type="danger" @click="localLoadingBarRef.error()">Error</Button>
      </Space>
    </div>
    <LoadingBar ref="localLoadingBarRef" :container-style="{ position: 'absolute' }" :to="localCardRef" />
    <h2 class="mt30 mb10">自定义加载条样式</h2>
    <Space>
      <Button type="primary" @click="customLoadingBarRef.start()">Start</Button>
      <Button @click="customLoadingBarRef.finish()">Finish</Button>
      <Button type="danger" @click="customLoadingBarRef.error()">Error</Button>
    </Space>
    <LoadingBar
      ref="customLoadingBarRef"
      :loading-bar-size="5"
      color-loading="#2db7f5"
      color-finish="#52c41a"
      color-error="magenta"
    />
  </div>
</template>
<style lang="less" scoped>
.card-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 200px;
  padding: 16px 24px;
  border: 1px solid #d9d9d9;
}
</style>
