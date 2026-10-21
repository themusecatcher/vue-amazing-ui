<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MessageProvider } from 'components/message'
import { ModalProvider } from 'components/modal'
import { DialogProvider } from 'components/dialog'
import { NotificationProvider } from 'components/notification'
import { LoadingBarProvider } from 'components/loading-bar'
// 主题与 router/index.ts 的离散实例共用（见 src/theme.ts）
import { theme } from '@/theme'
const route = useRoute()
const routeName = computed(() => {
  return route.name
})
</script>
<template>
  <!-- abstract 显式传 true：演示站有大量 Teleport 到 body 的浮层，只有写 <html> 才能让它们跟随主题 -->
  <ConfigProvider :theme="theme" :abstract="true">
    <LoadingBarProvider>
      <MessageProvider>
        <ModalProvider>
          <DialogProvider>
            <NotificationProvider>
              <RouterView v-if="routeName === 'Watermark'" />
              <Watermark v-else content="Vue Amazing UI">
                <RouterView />
              </Watermark>
            </NotificationProvider>
          </DialogProvider>
        </ModalProvider>
      </MessageProvider>
    </LoadingBarProvider>
  </ConfigProvider>
</template>
