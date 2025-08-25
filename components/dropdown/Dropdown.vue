<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Option {
  label?: string // 选项名
  value?: string | number // 选项值
  disabled?: boolean // 是否禁用选项，默认 false
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
export interface Props {
  options?: Option[] // 选项数据
  label?: string // 字典项的文本字段名
  value?: string // 字典项的值字段名
  arrow?: boolean // 下拉框箭头是否显示
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: 'label',
  value: 'value',
  arrow: false
})
const presetColors: string[] = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
]
</script>
<template>
  <div class="dropdown-wrap"> </div>
</template>
<style lang="less" scoped>
.dropdown-wrap {
}
</style>
