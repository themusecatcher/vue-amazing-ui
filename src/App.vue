<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadingBarRef } from '@/router'
import { LoadingBar } from 'vue-amazing-ui'
import { MessageProvider } from 'components/message'
import { ModalProvider } from 'components/modal'
import { DialogProvider } from 'components/dialog'
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
const loadingBar = ref<InstanceType<typeof LoadingBar> | null>(null)
onMounted(() => {
  loadingBarRef.value = loadingBar.value
})
</script>
<template>
  <ConfigProvider :theme="theme">
    <MessageProvider>
      <ModalProvider>
        <DialogProvider>
          <NotificationProvider>
            <RouterView v-if="routeName === 'Watermark'" />
            <Watermark v-else content="Vue Amazing UI">
              <RouterView />
            </Watermark>
            <LoadingBar ref="loadingBar" />
          </NotificationProvider>
        </DialogProvider>
      </ModalProvider>
    </MessageProvider>
  </ConfigProvider>
</template>
