<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
const options = ref<any[]>([])
function onSearch(searchText: string) {
  console.log('searchText', searchText)
  const prefix = searchText.split('@')[0]
  console.log('prefix', prefix)
  options.value = ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
  console.log('options', options.value)
}
watchEffect(() => {
  console.log('value', value.value)
})
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
    <AutoComplete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      placeholder="input here"
      @select="onSelect"
      @search="onSearch"
    />
  </div>
</template>
