<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const colorValue = ref('')
watchEffect(() => {
  console.log('colorValue', colorValue.value)
})
</script>
<template>
  <div>
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1> -->
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :width="240">
      <ColorPicker v-model:value="colorValue" :modes="['rgb', 'hex', 'hsl', 'hsv']" />
      <n-color-picker v-model:value="colorValue" :modes="['rgb', 'hex', 'hsl', 'hsv']" />
    </Space>
  </div>
</template>
