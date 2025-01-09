<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <div>
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1> -->
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :width="240">
      <ColorPicker v-model:value="value" />
      <n-color-picker v-model:value="value" />
    </Space>
  </div>
</template>
