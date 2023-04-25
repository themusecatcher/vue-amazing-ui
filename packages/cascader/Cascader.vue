<script setup lang="ts">
import { ref, watchEffect } from 'vue'
interface Option {
  value?: string | number // 选项值
  label?: string // 选项名
  children?: Option[] // 选项children数组
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Props {
  options?: Option[] // 可选项数据源
  selectedValue?: (number|string)[] // （v-model）级联选中项
  label?: string // 下拉字典项的文本字段名
  value?: string // 下拉字典项的值字段名
  children?: string // 下拉字典项的后代字段名
  changeOnSelect?: boolean // 当此项为true时，点选每级菜单选项值（v-model）都会发生变化；否则只有选择三级选项后选项值才会变化
  zIndex?: number // 下拉层级
  gap?: number // 级联下拉框相互间隙宽度，单位px，默认8px
  width?: number|number[] // 三级下拉各自宽度
  height?: number // 下拉框高度
  disabled?: boolean|boolean[] // 三级各自是否禁用
  placeholder?: string|string[] // 三级下拉各自占位文本
  num?: number // 下拉面板最多能展示的下拉项数，超过后滚动显示
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  selectedValue: () => [],
  label: 'label',
  value: 'value',
  children: 'children',
  changeOnSelect: false,
  zIndex: 1,
  gap: 8,
  width: 160,
  height: 36,
  disabled: false,
  placeholder: '请选择',
  num: 6,
})
const values = ref<(string|number)[]>([]) // 级联value值数组
const labels = ref<any[]>([]) // 级联label文本数组
const firstOptions = ref<Option[]>([])
const secondOptions = ref<Option[]>([])
const thirdOptions = ref<Option[]>([])
watchEffect(() => {
  firstOptions.value = props.options
  values.value = props.selectedValue
  if (props.selectedValue.length) {
    initCascader(props.selectedValue)
    initLabels(props.selectedValue)
  }
})
function findChildren (options: any[], index: number): Option[] {
  const len = options.length
  for (let i = 0; i < len; i++) {
    if (options[i][props.value] === props.selectedValue[index]) {
      return options[i][props.children] || []
    }
  }
  return []
}
function initCascader (selectedValue: (string|number)[]) {
  secondOptions.value = findChildren(firstOptions.value, 0)
  thirdOptions.value = []
  if (selectedValue.length > 1) {
    thirdOptions.value = findChildren(secondOptions.value, 1)
  }
}
function findLabel (options: any[], index: number): any {
  const len = options.length
  for (let i = 0; i < len; i++) {
    if (options[i][props.value] === props.selectedValue[index]) {
      return options[i][props.label]
    }
  }
  return props.selectedValue[index]
}
function initLabels (selectedValue: (string|number)[]) {
  labels.value[0] = findLabel(firstOptions.value, 0)
  if (selectedValue.length > 1) {
    labels.value[1] = findLabel(secondOptions.value, 1)
  }
  if (selectedValue.length > 2) {
    labels.value[2] = findLabel(thirdOptions.value, 2)
  }
}
const emits = defineEmits(['update:selectedValue', 'change'])
function onFirstChange (value: string|number, label: string, index: number) { // 一级下拉回调
  values.value = [value]
  labels.value = [label]
  if (props.changeOnSelect) {
    emits('update:selectedValue', values.value)
    emits('change', values.value, labels.value)
  }
  // 获取二级下拉选项
  secondOptions.value = firstOptions.value[index][props.children] || []
  thirdOptions.value = []
}
function onSecondChange (value: string|number, label: string, index: number) { // 二级下拉回调
  values.value = [values.value[0], value]
  labels.value = [labels.value[0], label]
  if (props.changeOnSelect) {
    emits('update:selectedValue', values.value)
    emits('change', values.value, labels.value)
  }
  // 获取三级下拉选项
  thirdOptions.value = secondOptions.value[index][props.children] || []
}
function onThirdChange (value: string|number, label: string) { // 三级下拉回调
  values.value[2] = value
  labels.value[2] = label
  emits('update:selectedValue', values.value)
  emits('change', values.value, labels.value)
}
</script>
<template>
  <div class="m-cascader-wrap" :style="`height: ${height}px;`">
    <Select
      :style="`margin-right: ${gap}px; z-index: ${zIndex};`"
      :options="firstOptions"
      v-model:selectedValue="selectedValue[0]"
      :label="label"
      :value="value"
      :disabled="Array.isArray(disabled) ? disabled[0] : disabled"
      :width="Array.isArray(width) ? width[0] : width"
      :height="height"
      :num="num"
      :placeholder="Array.isArray(placeholder) ? placeholder[0] : placeholder"
      @change="onFirstChange" />
    <Select
      :style="`margin-right: ${gap}px; z-index: ${zIndex};`"
      :options="secondOptions"
      v-model:selectedValue="selectedValue[1]"
      :label="label"
      :value="value"
      :disabled="Array.isArray(disabled) ? disabled[1] : disabled"
      :width="Array.isArray(width) ? width[1] : width"
      :height="36"
      :num="num"
      :placeholder="Array.isArray(placeholder) ? placeholder[1] : placeholder"
      @change="onSecondChange" />
    <Select
      :style="`z-index: ${zIndex};`"
      :options="thirdOptions"
      v-model:selectedValue="selectedValue[2]"
      :label="label"
      :value="value"
      :disabled="Array.isArray(disabled) ? disabled[2] : disabled"
      :width="Array.isArray(width) ? width[2] : width"
      :height="height"
      :num="num"
      :placeholder="Array.isArray(placeholder) ? placeholder[2]:placeholder"
      @change="onThirdChange" />
  </div>
</template>
<style lang="less" scoped>
.m-cascader-wrap {
  display: inline-block;
}
</style>
