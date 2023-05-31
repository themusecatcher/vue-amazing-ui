<script setup lang="ts">
import Select from '../select'
import { ref, watchEffect } from 'vue'
interface Option {
  label?: string // 选项名
  value?: string | number // 选项值
  disabled?: boolean // 是否禁用选项
  children?: Option[] // 选项children数组
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Props {
  options?: Option[] // 可选项数据源
  selectedValue?: (number|string)[] // （v-model）级联选中项
  label?: string // 下拉字典项的文本字段名
  value?: string // 下拉字典项的值字段名
  children?: string // 下拉字典项的后代字段名
  changeOnSelect?: boolean // 当此项为true时，点选每级菜单选项值（v-model）都会发生变化；否则只有选择第三级选项后选项值才会变化
  zIndex?: number // 下拉层级
  gap?: number // 级联下拉框相互间隙宽度，单位px
  width?: number|number[] // 三级下拉各自宽度
  height?: number // 下拉框高度
  disabled?: boolean|boolean[] // 三级各自是否禁用
  placeholder?: string|string[] // 三级下拉各自占位文本
  maxDisplay?: number // 下拉面板最多能展示的下拉项数，超过后滚动显示
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
  width: 120,
  height: 32,
  disabled: false,
  placeholder: '请选择',
  maxDisplay: 6
})
const values = ref<(string|number)[]>([]) // 级联value值数组
const labels = ref<string[]>([]) // 级联label文本数组
const firstOptions = ref<Option[]>([])
const secondOptions = ref<Option[]>([])
const thirdOptions = ref<Option[]>([])
watchEffect(() => {
  firstOptions.value = [...props.options]
})
watchEffect(() => {
  values.value = [...props.selectedValue]
})
watchEffect(() => {
  initCascader(values.value)
  initLabels(values.value)
})
function findChildren (options: Option[], index: number): Option[] {
  const len = options.length
  for (let i = 0; i < len; i++) {
    if (options[i][props.value] === values.value[index]) {
      return options[i][props.children] || []
    }
  }
  return []
}
function initCascader (values: (string|number)[]) { // 获取二级/三级下拉项
  secondOptions.value = findChildren(firstOptions.value, 0)
  thirdOptions.value = []
  if (values.length > 1) {
    thirdOptions.value = findChildren(secondOptions.value, 1)
  }
}
function findLabel (options: Option[], index: number): any {
  const len = options.length
  for (let i = 0; i < len; i++) {
    if (options[i][props.value] === values.value[index]) {
      return options[i][props.label]
    }
  }
  return values.value[index]
}
function initLabels (values: (string|number)[]) {
  labels.value[0] = findLabel(firstOptions.value, 0)
  if (values.length > 1) {
    labels.value[1] = findLabel(secondOptions.value, 1)
  }
  if (values.length > 2) {
    labels.value[2] = findLabel(thirdOptions.value, 2)
  }
}
const emits = defineEmits(['update:selectedValue', 'change'])
function onFirstChange (value: string|number, label: string) { // 一级下拉回调
  if (props.changeOnSelect) {
    emits('update:selectedValue', [value])
    emits('change', [value], [label])
  } else {
    values.value = [value]
    labels.value = [label]
  }
}
function onSecondChange (value: string|number, label: string) { // 二级下拉回调
  if (props.changeOnSelect) {
    emits('update:selectedValue', [values.value[0], value])
    emits('change', [values.value[0], value], [labels.value[0], label])
  } else {
    values.value = [values.value[0], value]
    labels.value = [labels.value[0], label]
  }
}
function onThirdChange (value: string|number, label: string) { // 三级下拉回调
  emits('update:selectedValue', [...values.value.slice(0, 2), value])
  emits('change', [...values.value.slice(0, 2), value], [...labels.value.slice(0, 2), label])
}
</script>
<template>
  <div class="m-cascader-wrap" :style="`height: ${height}px;`">
    <Select
      :style="`margin-right: ${gap}px; z-index: ${zIndex};`"
      :options="firstOptions"
      v-model="values[0]"
      :label="label"
      :value="value"
      :disabled="Array.isArray(disabled) ? disabled[0] : disabled"
      :width="Array.isArray(width) ? width[0] : width"
      :height="height"
      :maxDisplay="maxDisplay"
      :placeholder="Array.isArray(placeholder) ? placeholder[0] : placeholder"
      @change="onFirstChange" />
    <Select
      :style="`margin-right: ${gap}px; z-index: ${zIndex};`"
      :options="secondOptions"
      v-model="values[1]"
      :label="label"
      :value="value"
      :disabled="Array.isArray(disabled) ? disabled[1] : disabled"
      :width="Array.isArray(width) ? width[1] : width"
      :height="height"
      :maxDisplay="maxDisplay"
      :placeholder="Array.isArray(placeholder) ? placeholder[1] : placeholder"
      @change="onSecondChange" />
    <Select
      :style="`z-index: ${zIndex};`"
      :options="thirdOptions"
      v-model="values[2]"
      :label="label"
      :value="value"
      :disabled="Array.isArray(disabled) ? disabled[2] : disabled"
      :width="Array.isArray(width) ? width[2] : width"
      :height="height"
      :maxDisplay="maxDisplay"
      :placeholder="Array.isArray(placeholder) ? placeholder[2]:placeholder"
      @change="onThirdChange" />
  </div>
</template>
<style lang="less" scoped>
.m-cascader-wrap {
  display: inline-block;
}
</style>
