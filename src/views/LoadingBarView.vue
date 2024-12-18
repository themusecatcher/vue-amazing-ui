<script setup lang="ts">
import { ref } from 'vue'
const loadingBar = ref()
const disabled = ref(true)
const localCardRef = ref()
const localLoadingBar = ref()
const customLoadingBar = ref()
function handleStart() {
  loadingBar.value.start()
  disabled.value = false
}
function handleFinish() {
  loadingBar.value.finish()
  disabled.value = true
}
function handleError() {
  disabled.value = true
  loadingBar.value.error()
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
    <LoadingBar ref="loadingBar" />
    <h2 class="mt30 mb10">局部加载条</h2>
    <div class="m-container" ref="localCardRef">
      <Space>
        <Button type="primary" @click="localLoadingBar.start()">Start</Button>
        <Button @click="localLoadingBar.finish()">Finish</Button>
        <Button type="danger" @click="localLoadingBar.error()">Error</Button>
      </Space>
    </div>
    <LoadingBar ref="localLoadingBar" :container-style="{ position: 'absolute' }" :to="localCardRef" />
    <h2 class="mt30 mb10">自定义加载条样式</h2>
    <Space>
      <Button type="primary" @click="customLoadingBar.start()">Start</Button>
      <Button @click="customLoadingBar.finish()">Finish</Button>
      <Button type="danger" @click="customLoadingBar.error()">Error</Button>
    </Space>
    <LoadingBar
      ref="customLoadingBar"
      :loading-bar-size="5"
      color-loading="#2db7f5"
      color-finish="#52c41a"
      color-error="magenta"
    />
  </div>
</template>
<style lang="less" scoped>
.m-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 200px;
  padding: 16px 24px;
  border: 1px solid #d9d9d9;
}
</style>
