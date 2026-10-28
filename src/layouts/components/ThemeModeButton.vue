<script setup lang="ts">
import { computed } from 'vue'
import ThemeModeIcon from './ThemeModeIcon.vue'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
// 与共享主题同源：读写 store.mode，切换的是组件库真实的浅色 / 暗色变量表（见 src/stores/theme.ts，变更会持久化）
const isDark = computed<boolean>(() => themeStore.mode === 'dark')
// 图标与提示语都描述「点击后会切到哪个模式」
const tooltip = computed<string>(() => (isDark.value ? '切换浅色模式' : '切换暗黑模式'))
// 皮肤：浅色下白底（default），暗色下用主题色（primary，跟随当前主色）
const buttonType = computed<'default' | 'primary'>(() => (isDark.value ? 'primary' : 'default'))
function toggleMode(): void {
  themeStore.mode = isDark.value ? 'light' : 'dark'
}
</script>
<template>
  <!-- 与主题色浮钮同列（后者 bottom: 100），位于其上方；right 与滚动条宽度补偿沿用 FloatButton 默认值 -->
  <FloatButton :type="buttonType" :bottom="160" :tooltip="tooltip" @click="toggleMode">
    <template #icon>
      <ThemeModeIcon :dark="!isDark" />
    </template>
  </FloatButton>
</template>
