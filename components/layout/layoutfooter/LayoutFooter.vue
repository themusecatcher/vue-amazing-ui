<script setup lang="ts">
import type { CSSProperties } from 'vue'
export interface Props {
  class?: string // 容器 class
  style?: CSSProperties // 指定样式
}
withDefaults(defineProps<Props>(), {
  class: undefined,
  style: () => ({})
})
</script>
<template>
  <footer class="layout-footer" :style="style">
    <slot></slot>
  </footer>
</template>
