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
    <Watermark v-if="routeName !== 'Watermark'" content="Vue Amazing UI">
      <RouterView />
    </Watermark>
    <RouterView v-else />
  </a-config-provider>
</template>
