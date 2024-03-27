<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="ml60" style="margin-left: 200px;">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Popover title="Title">
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
    <h2 class="mt30 mb10">设置内容最大宽度</h2>
    <Popover title="TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle" :max-width="300">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Click me</Button>
    </Popover>
  </div>
</template>
