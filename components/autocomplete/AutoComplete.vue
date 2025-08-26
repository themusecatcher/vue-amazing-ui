<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
interface Option {
  disabled?: boolean // 是否禁用
  value: string | number // 唯一的 value 值
  label: string // 显示的 label 值
}
interface GroupOption {
  children?: (string | number | Option)[] // 子选项
  label: string // label 文本
  value: string | number // value 值
  type?: 'group' // 选项的类型
}
export interface Props {
  allowClear?: boolean // 是否支持清除
  disabled?: boolean // 是否禁用
  placeholder?: string // 默认占位文本
  to?: string | HTMLElement | false // 菜单容器挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  options?: (string | number | Option | GroupOption)[] //	自动完成的数据源
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
<template>
  <div class="auto-complete-wrap"></div>
</template>
<style lang="less" scoped>
.auto-complete-wrap {
}
</style>
