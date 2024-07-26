<script setup lang="ts">
import { ref } from 'vue'
const customLoading = ref(false)
const loadingOptions = [
  {
    label: 'static',
    value: 'static'
  },
  {
    label: 'dynamic',
    value: 'dynamic'
  }
]
const loadingType = ref('dynamic')
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
        <Button :size="size" type="danger" ghost loading>Danger Ghost Button</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space vertical>
      <Space align="center"> Loading state:<Switch v-model:checked="customLoading" /> </Space>
      <Space align="center"> Loading Type:<Radio :options="loadingOptions" v-model:value="loadingType" /> </Space>
      <Space>
        <Button
          style="width: 150px; height: 40px; font-size: 18px; border-color: #faad14; color: #faad14"
          ripple-color="#faad14"
          loading-color="#faad14"
          size="large"
          :loading-type="loadingType"
          :loading="customLoading"
        >
          自定义样式
        </Button>
        <Button
          style="width: 150px; height: 40px; font-size: 18px; background: #faad14; border-color: #faad14; color: #fff"
          ripple-color="#faad14"
          loading-color="#fff"
          size="large"
          :loading-type="loadingType"
          :loading="customLoading"
        >
          自定义样式
        </Button>
      </Space>
    </Space>
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
        <Button :loading="loading" loading-type="static">Default Button</Button>
        <Button type="reverse" :loading="loading" loading-type="static">Reverse Button</Button>
        <Button type="primary" :loading="loading" loading-type="static">Primary Button</Button>
        <Button type="danger" :loading="loading" loading-type="static">Danger Button</Button>
      </Space>
      <Space>
        <Button type="dashed" :loading="loading" loading-type="static">Dashed Button</Button>
        <Button type="text" :loading="loading" loading-type="static">Text Button</Button>
        <Button type="link" :loading="loading" loading-type="static">Link Button</Button>
      </Space>
      <Space>
        <Button type="primary" ghost :loading="loading" loading-type="static">Primary Button</Button>
        <Button type="danger" ghost :loading="loading" loading-type="static">Danger Button</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">block 按钮</h2>
    <Space>
      <Button block @click="onClick">Default Button</Button>
      <Button block type="primary" ghost>Primary Button</Button>
      <Button block type="danger" ghost>Danger Button</Button>
    </Space>
  </div>
</template>
