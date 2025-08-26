<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
export interface Props {
  allowClear?: boolean // 是否支持清除
  disabled?: boolean // 是否禁用
  placeholder?: string // 默认占位文本
  options?: Option[] //	自动完成的数据源
  value: string // (v-model) 当前选中的条目
}
const props = withDefaults(defineProps<Props>(), {
  allowClear: false,
  disabled: false,
  placeholder: undefined,
  options: () => [],
  value: undefined
})
const emit = defineEmits(['close'])
</script>
<template></template>
<style lang="less" scoped></style>
