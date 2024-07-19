<script setup lang="ts">
import type { CSSProperties, Slot } from 'vue'
interface Props {
  label?: string | Slot // 内容的描述标签 string | slot
  span?: number // 包含列的数量
  labelStyle?: CSSProperties // 自定义标签样式，优先级高于 Description 的 labelStyle
  contentStyle?: CSSProperties // 自定义内容样式，优先级高于 Description 的 contentStyle
}
withDefaults(defineProps<Props>(), {
  label: undefined,
  span: undefined, // 未设置时等效于 span: 1，除了最后一行的最后一项，会将最后一行剩余的列数全部分配给该项
  labelStyle: () => ({}),
  contentStyle: () => ({})
})
</script>
<template>
  <div class="m-desc-item" :data-span="span">
    <span class="u-label" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </span>
    <span class="u-content" :style="contentStyle">
      <slot></slot>
    </span>
  </div>
  <div class="m-desc-item-bordered" :data-span="span">
    <th class="u-label-th" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </th>
    <td class="u-content-td" :style="contentStyle">
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
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.5714285714285714;
    text-align: start;
    &::after {
      content: ':';
      position: relative;
      top: -0.5px;
      margin-inline: 2px 8px;
    }
  }
  .u-content {
    display: inline-flex;
    align-items: baseline;
    flex: 1;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    word-break: break-word;
    overflow-wrap: break-word;
  }
}
</style>
