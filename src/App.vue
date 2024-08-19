<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const theme = ref({
  token: {
    colorPrimary: '#00b96b'
  }
})
const route = useRoute()
const routeName = computed(() => {
  return route.name
})
</script>
<template>
  <a-config-provider :theme="theme">
    <RouterView v-if="routeName === 'Watermark'" />
    <Watermark v-else content="Vue Amazing UI">
      <RouterView />
    </Watermark>
  </a-config-provider>
</template>
