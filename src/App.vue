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
    <Watermark content="Vue Amazing UI" v-if="routeName !== 'Watermark'">
      <RouterView />
    </Watermark>
    <RouterView v-else />
  </a-config-provider>
</template>
