<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref('middle')
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">按钮类型</h2>
    <Space>
      <Button>Default Button</Button>
      <Button type="reverse">Reverse Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button type="danger">Danger Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
    <h2 class="mt30 mb10">幽灵按钮</h2>
    <Space>
      <Button type="primary" ghost>Primary Ghost Button</Button>
      <Button type="danger" ghost>Danger Ghost Button</Button>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical>
      <Space>
        <Button disabled>Default Button</Button>
        <Button disabled type="reverse">Reverse Button</Button>
        <Button disabled type="primary">Primary Button</Button>
        <Button disabled type="danger">Danger Button</Button>
        <Button disabled type="dashed">Dashed Button</Button>
        <Button disabled type="text">Text Button</Button>
        <Button disabled type="link">Link Button</Button>
      </Space>
      <Space>
        <Button disabled type="primary" ghost>Primary Ghost Button</Button>
        <Button disabled type="danger" ghost>Danger Ghost Button</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">按钮尺寸</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Space>
        <Button :size="size">Default Button</Button>
        <Button :size="size" type="reverse">Reverse Button</Button>
        <Button :size="size" type="primary">Primary Button</Button>
        <Button :size="size" type="danger">Danger Button</Button>
      </Space>
      <Space>
        <Button :size="size" type="dashed">Dashed Button</Button>
        <Button :size="size" type="text">Text Button</Button>
        <Button :size="size" type="link">Link Button</Button>
      </Space>
      <Space>
        <Button :size="size" type="primary" ghost>Primary Button</Button>
        <Button :size="size" type="danger" ghost>Danger Button</Button>
        <Button :size="size" type="primary" ghost loading>Primary Ghost Button</Button>
        <Button :size="size" type="danger" ghost loading loading-type="dynamic">Danger Ghost Button</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Button style="width: 140px; height: 40px; background:" size="large">
      <p style="font-size: 18px">自定义样式</p>
    </Button>
    <h2 class="mt30 mb10">自定义跳转</h2>
    <Button href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank"
      >跳转按钮</Button
    >
    <h2 class="mt30 mb10">加载中状态</h2>
    <Space vertical>
      <Space align="center"> Loading state:<Switch v-model:checked="loading" /> </Space>
      <Space>
        <Button :loading="loading">Default Button</Button>
        <Button type="reverse" :loading="loading">Reverse Button</Button>
        <Button type="primary" :loading="loading">Primary Button</Button>
        <Button type="danger" :loading="loading">Danger Button</Button>
      </Space>
      <Space>
        <Button type="dashed" :loading="loading">Dashed Button</Button>
        <Button type="text" :loading="loading">Text Button</Button>
        <Button type="link" :loading="loading">Link Button</Button>
      </Space>
      <Space>
        <Button type="primary" ghost :loading="loading">Primary Button</Button>
        <Button type="danger" ghost :loading="loading">Danger Button</Button>
      </Space>
      <Space>
        <Button :loading="loading" loading-type="dynamic">Default Button</Button>
        <Button type="reverse" :loading="loading" loading-type="dynamic">Reverse Button</Button>
        <Button type="primary" :loading="loading" loading-type="dynamic">Primary Button</Button>
        <Button type="danger" :loading="loading" loading-type="dynamic">Danger Button</Button>
      </Space>
      <Space>
        <Button type="dashed" :loading="loading" loading-type="dynamic">Dashed Button</Button>
        <Button type="text" :loading="loading" loading-type="dynamic">Text Button</Button>
        <Button type="link" :loading="loading" loading-type="dynamic">Link Button</Button>
      </Space>
      <Space>
        <Button type="primary" ghost :loading="loading" loading-type="dynamic">Primary Button</Button>
        <Button type="danger" ghost :loading="loading" loading-type="dynamic">Danger Button</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">居中展示</h2>
    <Flex vertical>
      <Button center @click="onClick">Default Button</Button>
      <Button center type="primary" ghost>Primary Button</Button>
      <Button center type="danger" ghost>Danger Button</Button>
    </Flex>
  </div>
</template>
