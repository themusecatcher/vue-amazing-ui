<script setup lang="ts">
import { ref } from 'vue'
const theme = ref({
  token: {
    colorPrimary: '#00b96b'
  }
})
</script>
<template>
  <a-config-provider :theme="theme">
    <RouterView />
  </a-config-provider>
</template>
