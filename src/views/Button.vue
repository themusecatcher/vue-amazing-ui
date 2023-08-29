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
    <h2 class="mt30 mb10">六种类型</h2>
    <Space>
      <Button>Default Button</Button>
      <Button effect="reverse">Reverse Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button type="danger">Danger Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space>
      <Button disabled>Default Button</Button>
      <Button disabled effect="reverse">Reverse Button</Button>
      <Button disabled type="primary">Primary Button</Button>
      <Button disabled type="danger">Danger Button</Button>
      <Button disabled type="dashed">Dashed Button</Button>
      <Button disabled type="text">Text Button</Button>
    </Space>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space>
      <Button size="small">Small</Button>
      <Button>Default</Button>
      <Button size="large">Large</Button>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Button style="width: 120px; height: 40px;" size="large">
      <p style="font-size: 18px;">自定义样式</p>
    </Button>
    <h2 class="mt30 mb10">加载中状态</h2>
    <Space>
      <Button :loading="loading">Default Button</Button>
      <Button effect="reverse" :loading="loading">Reverse Button</Button>
      <Button type="primary" :loading="loading">Primary Button</Button>
      <Button type="danger" :loading="loading">Danger Button</Button>
      <Button type="dashed" :loading="loading">Dashed Button</Button>
      <Button type="text" :loading="loading">Text Button</Button>
    </Space>
    <br/>
    <Space align="center" style="margin-top: 10px;">
      <h3 style="margin-top: 0;">Loading state: </h3>
      <Switch v-model:checked="loading" />
    </Space>
    <h2 class="mt30 mb10">居中展示</h2>
    <Button center @click="onClick">Default Button</Button>
  </div>
</template>
