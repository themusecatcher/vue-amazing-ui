<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">七种类型</h2>
    <Space>
      <Button>Default Button</Button>
      <Button type="reverse">Reverse Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button type="danger">Danger Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space>
      <Button disabled>Default Button</Button>
      <Button disabled type="reverse">Reverse Button</Button>
      <Button disabled type="primary">Primary Button</Button>
      <Button disabled type="danger">Danger Button</Button>
      <Button disabled type="dashed">Dashed Button</Button>
      <Button disabled type="text">Text Button</Button>
      <Button disabled type="link">Link Button</Button>
    </Space>
    <h2 class="mt30 mb10">自定义颜色</h2>
    <Space>
      <n-button type="error" color="#8a2be2">#8a2be2</n-button>
      <Button type="danger" color="#8a2be2">#8a2be2</Button>
      <a-button type="primary">#8a2be2</a-button>
    </Space>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space>
      <Button size="small">Small</Button>
      <Button>Default</Button>
      <Button size="large">Large</Button>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Button style="width: 140px; height: 40px" size="large">
      <p style="font-size: 18px">自定义样式</p>
    </Button>
    <h2 class="mt30 mb10">自定义跳转</h2>
    <Button href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank"
      >跳转按钮</Button
    >
    <h2 class="mt30 mb10">加载中状态</h2>
    <Space>
      <Button :loading="loading">Default Button</Button>
      <Button type="reverse" :loading="loading">Reverse Button</Button>
      <Button type="primary" :loading="loading">Primary Button</Button>
      <Button type="danger" :loading="loading">Danger Button</Button>
      <Button type="dashed" :loading="loading">Dashed Button</Button>
      <Button type="text" :loading="loading">Text Button</Button>
      <Button type="link" :loading="loading">Link Button</Button>
    </Space>
    <br />
    <br />
    <Space align="center"> Loading state:<Switch v-model:checked="loading" /> </Space>
    <h2 class="mt30 mb10">居中展示</h2>
    <Button center @click="onClick">Default Button</Button>
  </div>
</template>
