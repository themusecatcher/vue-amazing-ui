<script setup lang="ts">
import type { VNode } from 'vue'

/** 内容部分：自带默认样式，只能放在 Layout 中 */
export interface LayoutContentSlots {
  default?: () => VNode[]
}
defineSlots<LayoutContentSlots>()
</script>
<template>
  <main class="layout-content-wrap">
    <slot></slot>
  </main>
</template>
<style lang="less" scoped>
.layout-content-wrap {
  flex: auto;
  min-height: 0;
}
</style>
