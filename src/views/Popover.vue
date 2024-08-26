<script setup lang="ts">
function openChange(visible: boolean) {
  console.log('visible:', visible)
}
</script>
<template>
  <div class="ml60">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Popover title="Title" @open-change="openChange">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Popover title="Title" trigger="click">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Click me</Button>
    </Popover>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Popover
      :max-width="240"
      :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
      :overlayStyle="{ padding: '12px 18px', borderRadius: '12px' }"
    >
      <template #title> Custom Title </template>
      <template #content>
        <p>Custom Content</p>
        <p>Custom Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
  </div>
</template>
