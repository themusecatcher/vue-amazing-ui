<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadingBarRef } from '@/router'
const antTheme = ref({
  token: {
    colorPrimary: '#d4380d'
  }
})
const theme = ref({
  common: {
    primaryColor: '#ff6900'
  }
})
const route = useRoute()
const routeName = computed(() => {
  return route.name
})
const loadingBar = ref()
onMounted(() => {
  loadingBarRef.value = loadingBar.value
})
</script>
<template>
  <ConfigProvider :theme="theme">
    <RouterView v-if="routeName === 'Watermark'" />
    <Watermark v-else content="Vue Amazing UI">
      <RouterView />
    </Watermark>
    <LoadingBar ref="loadingBar" />
  </ConfigProvider>
</template>
