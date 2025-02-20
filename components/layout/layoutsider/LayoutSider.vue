<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
export interface Props {
  class?: string // 容器 class
  style?: CSSProperties // 指定样式
  width?: number | string // 宽度，单位 px
}
const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  style: () => ({}),
  width: 200
})
const siderWidth = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})
const siderStyle = computed(() => {
  const style: CSSProperties = {
    ...props.style,
    flex: `0 0 ${siderWidth.value}`,
    maxWidth: siderWidth.value,
    minWidth: siderWidth.value,
    width: siderWidth.value
  }
  return style
})
</script>
<template>
  <aside class="layout-sider" :style="siderStyle">
    <div class="layout-sider-children">
      <slot></slot>
    </div>
  </aside>
</template>
