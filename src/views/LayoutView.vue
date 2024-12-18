<script setup lang="ts">
import { ref, watchEffect } from 'vue'
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
  </div>
</template>
