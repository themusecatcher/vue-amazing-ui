<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import type { VNode } from 'vue'
import { siderHookKey } from './siderHook'
import type { SiderHook } from './siderHook'

/**
 * 布局容器：承载 Header / Sider / Content / Footer，构成页面级整体框架
 * 子级存在 Sider 时自动切换为水平方向；服务端渲染可显式传 hasSider 以避免样式闪动
 */
export interface Props {
  hasSider?: boolean // 是否包含侧边栏；不传时按子级 Sider 自动推导
}
export interface LayoutSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  hasSider: undefined
})
defineSlots<LayoutSlots>()
// 子级 Sider 经登记表上报：插槽内容可嵌套多层元素，无法由插槽 VNode 结构可靠推导
const siders = ref<string[]>([])
const siderHook: SiderHook = {
  addSider: (id: string) => {
    siders.value = [...siders.value, id]
  },
  removeSider: (id: string) => {
    siders.value = siders.value.filter((currentId) => currentId !== id)
  }
}
provide(siderHookKey, siderHook)
const hasSider = computed(() => {
  return typeof props.hasSider === 'boolean' ? props.hasSider : siders.value.length > 0
})
</script>
<template>
  <section class="layout-wrap" :class="{ 'layout-has-sider': hasSider }">
    <slot></slot>
  </section>
</template>
<style lang="less" scoped>
.layout-wrap {
  display: flex;
  flex: auto;
  flex-direction: column;
  // Firefox 无法把 flex item 的高度压到内容高度以下，需显式清掉最小高度
  min-height: 0;
  font-size: 14px;
  color: var(--layout-color, rgba(0, 0, 0, 0.88));
  background: var(--layout-background, #f5f5f5);
}
.layout-wrap.layout-has-sider {
  flex-direction: row;
}
</style>
