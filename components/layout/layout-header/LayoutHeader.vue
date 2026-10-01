<script setup lang="ts">
import type { VNode } from 'vue'

/** 顶部布局：自带默认样式，只能放在 Layout 中 */
export interface LayoutHeaderSlots {
  default?: () => VNode[]
}
defineSlots<LayoutHeaderSlots>()
</script>
<template>
  <header class="layout-header-wrap">
    <slot></slot>
  </header>
</template>
<style lang="less" scoped>
.layout-header-wrap {
  flex: 0 0 auto;
  height: 64px;
  padding: 0 50px;
  color: var(--layout-header-color, rgba(0, 0, 0, 0.88));
  line-height: 64px;
  background: var(--layout-header-background, #001529);
}
</style>
