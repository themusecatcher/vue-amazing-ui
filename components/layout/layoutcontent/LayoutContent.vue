<script setup lang="ts">
import type { CSSProperties } from 'vue'
interface Props {
  class?: string // 容器 class
  style?: CSSProperties // 指定样式
}
const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  style: () => ({})
})
</script>
<template>
  <div class="m-layout"> </div>
</template>
<style lang="less" scoped>
.m-layout {
}
</style>
