<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function openChange(open: boolean) {
  console.log('open', open)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Popover title="Title" @open-change="openChange">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Popover
      :max-width="180"
      bg-color="#000"
      :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
      :content-style="{ color: '#fff' }"
      :tooltip-style="{ padding: '12px 18px', borderRadius: '12px' }"
    >
      <template #title> Custom Title </template>
      <template #content>
        <p>Custom Content</p>
        <p>Custom Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Space>
      <Popover title="Hover Title">
        <template #content>
          <p>Content</p>
          <p>Content</p>
        </template>
        <Button type="primary">Hover Me</Button>
      </Popover>
      <Popover title="Click Title" trigger="click">
        <template #content>
          <p>Content</p>
          <p>Content</p>
        </template>
        <Button type="primary">Click Me</Button>
      </Popover>
    </Space>
    <h2 class="mt30 mb10">从浮层内关闭</h2>
    <h3 class="mb10">使用 show 属性控制显示隐藏</h3>
    <Popover v-model:show="show" title="Click Title" trigger="click">
      <template #content>
        <a @click="(show = false)">Close</a>
      </template>
      <Button type="primary">Click Me</Button>
    </Popover>
    <h2 class="mt30 mb10">自定义过渡动画时间</h2>
    <Popover title="Transition Duration 300ms" :transition-duration="300">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Transition Duration 300ms</Button>
    </Popover>
    <h2 class="mt30 mb10">延迟显示隐藏</h2>
    <Space>
      <Popover :show-delay="300" :hide-delay="300" title="delay 300ms" content="Vue Amazing UI">
        <Button type="primary">Delay 300ms Popover</Button>
      </Popover>
      <Popover :show-delay="500" :hide-delay="500" title="delay 500ms" content="Vue Amazing UI">
        <Button type="primary">Delay 500ms Popover</Button>
      </Popover>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Popover :arrow="false" title="Title">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hide Arrow</Button>
    </Popover>
  </div>
</template>
