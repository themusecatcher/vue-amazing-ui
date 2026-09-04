<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadingBarRef } from '@/router'
import { MessageProvider } from 'components/message'
import { ModalProvider } from 'components/modal'
import { NotificationProvider } from 'components/notification'
const theme = ref({
  // common: {
  //   primaryColor: '#ff6900'
  // }
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
    <MessageProvider>
      <ModalProvider>
        <NotificationProvider>
          <RouterView v-if="routeName === 'Watermark'" />
          <Watermark v-else content="Vue Amazing UI">
            <RouterView />
          </Watermark>
          <LoadingBar ref="loadingBar" />
        </NotificationProvider>
      </ModalProvider>
    </MessageProvider>
  </ConfigProvider>
</template>
