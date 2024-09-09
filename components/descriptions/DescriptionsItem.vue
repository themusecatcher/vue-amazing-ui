<script setup lang="ts">
import type { CSSProperties } from 'vue'
interface Props {
  label?: string // 内容的描述标签 string | slot
  span?: number // 包含列的数量；当使用水平列表且未设置 span 时等效于 span: 1，但最后一行的最后一项，会包含该行剩余的所有列数
  labelStyle?: CSSProperties // 自定义标签样式，优先级高于 Description 的 labelStyle
  contentStyle?: CSSProperties // 自定义内容样式，优先级高于 Description 的 contentStyle
}
withDefaults(defineProps<Props>(), {
  label: undefined,
  span: undefined,
  labelStyle: () => ({}),
  contentStyle: () => ({})
})
</script>
<template>
  <div class="descriptions-item" :data-span="span">
    <span class="descriptions-label" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </span>
    <span class="descriptions-content" :style="contentStyle">
      <slot></slot>
    </span>
  </div>
  <tr class="descriptions-item-bordered" :data-span="span">
    <th class="descriptions-label-th" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </th>
    <td class="descriptions-content-td" :style="contentStyle">
      <slot></slot>
    </td>
  </tr>
</template>
<style lang="less" scoped>
.descriptions-item {
  display: flex;
  .descriptions-label {
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
  .descriptions-content {
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
