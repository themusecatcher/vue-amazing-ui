<script setup lang="ts">
import { MessageProvider } from 'components/message'
import { ModalProvider } from 'components/modal'
import { DialogProvider } from 'components/dialog'
import { NotificationProvider } from 'components/notification'
import { LoadingBarProvider } from 'components/loading-bar'
// 主题与 router/index.ts 的离散实例共用（见 src/stores/theme.ts）
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>
<template>
  <!-- abstract 显式传 true：演示站有大量 Teleport 到 body 的浮层，只有写 <html> 才能让它们跟随主题 -->
  <ConfigProvider :theme="themeStore.theme" :abstract="true">
    <LoadingBarProvider>
      <MessageProvider>
        <ModalProvider>
          <DialogProvider>
            <NotificationProvider>
              <RouterView />
            </NotificationProvider>
          </DialogProvider>
        </ModalProvider>
      </MessageProvider>
    </LoadingBarProvider>
  </ConfigProvider>
</template>
