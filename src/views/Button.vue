<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
function onClick (e: Event) {
  console.log('click', e)
}
</script>
<template>
  <div>
    <h1>Button 按钮</h1>
    <h2 class="mt30 mb10">共六种类型</h2>
    <Space>
      <Button :loading="loading">Default Button</Button>
      <Button effect="reverse" :loading="loading">Reverse Button</Button>
      <Button type="primary" :loading="loading">Primary Button</Button>
      <Button type="danger" :loading="loading">Danger Button</Button>
      <Button type="dashed" :loading="loading">Dashed Button</Button>
      <Button type="text" :loading="loading">Text Button</Button>
      <Button disabled :loading="loading">Disabled Button</Button>
    </Space>
    <h2 class="mt30 mb10">大(large)、中(default)、小(small) 三种尺寸</h2>
    <Space>
      <Button size="large" :loading="loading">Large Button</Button>
      <Button :loading="loading">Default Button</Button>
      <Button size="small" :loading="loading">Small Button</Button>
    </Space>
    <h2 class="mt30 mb10">加载中状态</h2>
    <Button loading>Default Button</Button>
    <h3 class="mt30">Loading state: <Switch v-model:checked="loading" /></h3>
    <h2 class="mt30 mb10">居中展示</h2>
    <Button center @click="onClick">Default Button</Button>
  </div>
</template>
