<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
function onScroll(e: Evevt) {
  console.log('change value:', value)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
  </div>
</template>
