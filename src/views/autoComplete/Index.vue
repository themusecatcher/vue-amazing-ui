<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = ref<string[]>([])
function onSearch(searchText: string) {
  console.log('searchText', searchText)
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    const prefix = searchText.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
}
function onSelect(value: string) {
  console.log('onSelect', value)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <a-auto-complete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      placeholder="input here"
      @select="onSelect"
      @search="onSearch"
    />
  </div>
</template>
