<script setup lang="ts">
interface Props {
  date?: string // 日期
  tagProps?: object // Tag 组件属性
}
withDefaults(defineProps<Props>(), {
  date: undefined,
  tagProps: () => ({})
})
</script>
<template>
  <slot></slot> <Tag color="volcano" size="small" v-bind="tagProps">{{ date }}</Tag>
</template>
<style lang="less" scoped>
.m-tag {
  vertical-align: top;
  margin-top: 5px;
}
</style>