<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CSSProperties, Slots } from 'vue'  
export interface Props {
  class?: string // 容器 class
  style?: CSSProperties // 指定样式
}
withDefaults(defineProps<Props>(), {
  class: undefined,
  style: () => ({})
})
const slots = useSlots() as Slots
const hasSider = computed(() => {
  const slotsDefault = slots.default?.({})
  if (slotsDefault && slotsDefault?.length) {
    const result = slotsDefault.some((slotDefault: any) => {
      return slotDefault.type.__name === 'LayoutSider'
    })
    return result
  }
  return false
})
</script>
<template>
  <section class="m-layout" :class="{ 'layout-has-sider': hasSider }" :style="style">
    <slot></slot>
  </section>
</template>
<style lang="less" scoped>
.m-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  min-height: 0;
  background: #f5f5f5;
  :deep(.layout-header) {
    height: 64px;
    padding-left: 50px;
    padding-right: 50px;
    color: rgba(0, 0, 0, 0.88);
    line-height: 64px;
    background: #001529;
  }
  :deep(.layout-sider) {
    position: relative;
    min-width: 0;
    background: #001529;
    transition: all 0.2s, background 0s;
  }
  :deep(.layout-sider-has-trigger) {
    .layout-sider-children {
      padding-bottom: 48px;
    }
  }
  :deep(.layout-sider-children) {
    overflow: auto;
    height: 100%;
    margin-top: -0.1px;
    padding-top: 0.1px;
  }
  :deep(.layout-sider-zero-width-trigger) {
    position: absolute;
    top: 64px;
    right: -40px;
    z-index: 1;
    width: 40px;
    height: 40px;
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #001529;
    border-start-start-radius: 0;
    border-start-end-radius: 6px;
    border-end-end-radius: 6px;
    border-end-start-radius: 0;
    cursor: pointer;
    transition: background 0.3s;
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      transition: all 0.3s;
      content: "";
    }
    &:hover::after {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  :deep(.layout-sider-trigger) {
    // position: fixed;
    position: sticky;
    bottom: 0;
    z-index: 1;
    height: 48px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #002140;
    cursor: pointer;
    transition: all 0.2s;
  }
  :deep(.layout-content) {
    flex: auto;
    min-height: 0;
  }
  :deep(.layout-footer) {
    padding: 24px 50px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    background: #f5f5f5;
  }
  :deep(.layout-header, .layout-footer) {
    flex: 0 0 auto;
  }
}
.m-layout.layout-has-sider {
  flex-direction: row;
}
</style>
