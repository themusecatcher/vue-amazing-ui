<script setup lang="ts">
import { ref, watchEffect } from 'vue'
interface Option {
  value: string | number
  label: string
  children?: Option[]
}
const props = defineProps({
  options: { // 可选项数据源
    type: Array<any>,
    default: () => []
  },
  selectedValue: { // （v-model）级联选中项
    type: Array<number|string>,
    default: () => []
  },
  label: { // 下拉字典项的文本字段名
    type: String,
    default: 'label'
  },
  value: { // 下拉字典项的值字段名
    type: String,
    default: 'value'
  },
  children: { // 下拉字典项的后代字段名
    type: String,
    default: 'children'
  },
  changeOnSelect: { // 当此项为true时，点选每级菜单选项值（v-model）都会发生变化；否则只有选择三级选项后选项值才会变化
    type: Boolean,
    default: false
  },
  zIndex: { // 下拉层级
    type: Number,
    default: 1
  },
  gap: { // 级联下拉框相互间隙宽度，单位px，默认8px
    type: Number,
    default: 8
  },
  width: { // 三级下拉各自宽度
    type: [Number, Array<number>],
    default: 160
  },
  height: { // 下拉框高度
    type: Number,
    default: 36
  },
  disabled: { // 三级各自是否禁用
    type: [Boolean, Array<boolean>],
    default: false
  },
  placeholder: { // 三级下拉各自占位文本
    type: [String, Array<string>],
    default: '请选择'
  },
  num: { // 下拉面板最多能展示的下拉项数，超过后滚动显示
    type: Number,
    default: 6
  }
})
const values = ref<(string|number)[]>([]) // 级联value值数组
const labels = ref<any[]>([]) // 级联label文本数组
const firstOptions = ref(props.options)
const secondOptions = ref<any[]>([])
const thirdOptions = ref<Option[]>([])
watchEffect(() => {
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
