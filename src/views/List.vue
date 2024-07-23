<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :gap="30">
      <Button type="primary" @click="onInfo('This is a normal message')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
      <Button type="primary" @click="onError('This is a error message')">Error</Button>
      <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
      <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
    </Space>
    <Message ref="message" @close="onClose" />
  </div>
</template>
