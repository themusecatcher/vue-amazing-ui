<script setup lang="ts">
/**
 * 菜单分割线（组件式用法）
 *
 * 只承载配置描述，渲染统一由 `Menu` 完成；无插槽，故不声明插槽类型。
 */
export interface Props {
  dashed?: boolean // 是否虚线
}

defineProps<Props>()
</script>

<template>
  <!-- 数据标记组件：Menu 从插槽 vnode 中读取分割线数据并自行渲染，本组件自身不产出任何 DOM（也无插槽） -->
  <template v-if="false" />
</template>
