<script setup lang="ts">
import type { CSSProperties } from 'vue'
interface Props {
  label?: string // 内容的描述标签 string | slot
  labelStyle?: CSSProperties // 自定义标签样式
  contentStyle?: CSSProperties // 自定义内容样式
  span?: number // 包含列的数量
}
withDefaults(defineProps<Props>(), {
  label: '',
  labelStyle: () => ({}),
  contentStyle: () => ({}),
  span: 1
})
</script>
<template>
  <div class="m-desc-item col-span" :style="`--col-width: calc(${span * 100}% / var(--column));`">
    <div class="m-item-container">
      <span class="u-label">
        <slot name="label">{{ label }}</slot>
      </span>
      <span class="u-content">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-desc-item {
  padding-bottom: 16px;
  vertical-align: top;
  .m-item-container {
    display: flex;
    .u-label {
      display: inline-flex;
      align-items: baseline;
      color: rgba(0, 0, 0, .88);
      font-weight: normal;
      font-size: 14px;
      line-height: 1.5714285714285714;
      text-align: start;
      &::after {
        content: ":";
        position: relative;
        top: -.5px;
        margin-inline: 2px 8px;
      }
    }
    .u-content {
      display: inline-flex;
      align-items: baseline;
      flex: 1;
      color: rgba(0, 0, 0, .88);
      font-size: 14px;
      line-height: 1.5714285714285714;
      word-break: break-word;
      overflow-wrap: break-word;
    }
  }
}
.col-span {
  display: block;
  flex: 0 0 var(--col-width);
  max-width: var(--col-width);
}
</style>
