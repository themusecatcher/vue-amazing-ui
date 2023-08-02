<script setup lang="ts">
import type { CSSProperties } from 'vue'
interface Props {
  label?: string // 内容的描述标签 string | slot
  span?: number // 包含列的数量
  labelStyle?: CSSProperties // 自定义标签样式，优先级高于 Description
  contentStyle?: CSSProperties // 自定义内容样式，优先级高于 Description
}
withDefaults(defineProps<Props>(), {
  label: '',
  span: 1,
  labelStyle: () => ({}),
  contentStyle: () => ({})
})
</script>
<template>
  <div class="m-desc-item" :data-span="span" :data-label-style="JSON.stringify(labelStyle)" :data-content-style="JSON.stringify(contentStyle)">
    <span class="u-label">
      <slot name="label">{{ label }}</slot>
    </span>
    <span class="u-content">
      <slot></slot>
    </span>
  </div>
  <div class="m-desc-item-bordered" :data-span="span" :data-label-style="JSON.stringify(labelStyle)" :data-content-style="JSON.stringify(contentStyle)">
    <th class="u-label-th">
      <slot name="label">{{ label }}</slot>
    </th>
    <td class="u-content-td">
      <slot></slot>
    </td>
  </div>
</template>
<style lang="less" scoped>
.m-desc-item {
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
</style>
