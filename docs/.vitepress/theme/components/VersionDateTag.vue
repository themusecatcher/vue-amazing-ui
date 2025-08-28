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
  <Flex gap="small" align="center" style="font-size: 24px; font-weight: 600; line-height: 32px">
    <slot></slot>
    <Tag color="volcano" size="small" v-bind="tagProps">
      {{ date }}
    </Tag>
  </Flex>
</template>
