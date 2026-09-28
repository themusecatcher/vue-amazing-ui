<script setup lang="ts">
import type { VNode } from 'vue'

/** 底部布局：自带默认样式，只能放在 Layout 中 */
export interface LayoutFooterSlots {
  default?: () => VNode[]
}
defineSlots<LayoutFooterSlots>()
</script>
<template>
  <footer class="layout-footer-wrap">
    <slot></slot>
  </footer>
</template>
<style lang="less" scoped>
.layout-footer-wrap {
  flex: 0 0 auto;
  padding: 24px 50px;
  color: var(--layout-footer-color, rgba(0, 0, 0, 0.88));
  font-size: 14px;
  background: var(--layout-footer-background, #f5f5f5);
}
</style>
