<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import Select from 'components/select'
export interface Option {
  label?: string // 选项名
  value?: string | number // 选项值
  disabled?: boolean // 是否禁用选项，默认 false
  children?: Option[] // 选项 children 数组
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
export interface Props {
  options?: Option[] // 可选项数据源
  label?: string // 字典项的文本字段名
  value?: string // 字典项的值字段名
  children?: string // 字典项的后代字段名
  placeholder?: string | string[] // 三级选择器各自占位文本
  disabled?: boolean | boolean[] // 是否禁用，可全部禁用或单独禁用某一级选择器
  width?: 'auto' | number | number[] // 三级选择器各自宽度，单位 px
  height?: number // 级联选择高度，单位 px
  size?: 'small' | 'middle' | 'large' // 级联选择大小
  gap?: number // 级联选择器相互间隙宽度，单位 px
  changeOnSelect?: boolean // 当此项为 true 时，点选每级菜单选项值（v-model）都会发生变化；否则只有选择第三级选项后选项值才会变化
  allowClear?: boolean // 是否支持清除
  search?: boolean // 是否支持搜索
  placement?: 'bottom' | 'top' // 下拉面板弹出位置
  flip?: boolean // 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  to?: string | HTMLElement | false // 下拉面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  /*
    根据输入项进行筛选，默认为 true 时，筛选每个选项的文本字段 label 是否包含输入项，包含返回 true，反之返回 false
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filter?: Function | true // 过滤条件函数，仅当支持搜索时生效
  maxDisplay?: number // 下拉面板最多能展示的项数，超过后滚动显示
  scrollbarProps?: object // 下拉面板滚动条 scrollbar 组件属性配置
  modelValue?: number[] | string[] //（v-model）级联选中项
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: 'label',
  value: 'value',
  children: 'children',
  placeholder: '请选择',
  disabled: false,
  width: 'auto',
  height: undefined,
  size: 'middle',
  gap: undefined,
  changeOnSelect: false,
  allowClear: false,
  search: false,
  placement: 'bottom',
  flip: true,
  to: 'body',
  filter: true,
  maxDisplay: 6,
  scrollbarProps: () => ({}),
  modelValue: () => []
})
const values = ref<(string | number)[]>([]) // 级联 value 值数组
const labels = ref<(string | number)[]>([]) // 级联 label 文本数组
const firstOptions = ref<Option[]>([])
const secondOptions = ref<Option[]>([])
const thirdOptions = ref<Option[]>([])
const emits = defineEmits(['update:modelValue', 'change'])
const selectGap = computed(() => {
  const gapMap = {
    small: 4,
    middle: 6,
    large: 8
  }
  if (props.gap !== undefined) {
    return `${props.gap}px`
  }
  return `${gapMap[props.size]}px`
})
watchEffect(() => {
  firstOptions.value = [...props.options]
})
watchEffect(() => {
  values.value = [...props.modelValue]
})
watchEffect(() => {
  initCascader(values.value)
  initLabels(values.value)
})
function findChildren(options: Option[], index: number): Option[] {
  const len = options.length
  for (let i = 0; i < len; i++) {
    if (options[i][props.value] === values.value[index]) {
      return options[i][props.children] || []
    }
  }
  return []
}
// 获取二级/三级下拉项
function initCascader(values: (string | number)[]): void {
  secondOptions.value = findChildren(firstOptions.value, 0)
  thirdOptions.value = []
  if (values.length > 1) {
    thirdOptions.value = findChildren(secondOptions.value, 1)
  }
}
function findLabel(options: Option[], index: number): string | number {
  const len = options.length
  for (let i = 0; i < len; i++) {
    if (options[i][props.value] === values.value[index]) {
      return options[i][props.label]
    }
  }
  return values.value[index]
}
function initLabels(values: (string | number)[]): void {
  labels.value[0] = findLabel(firstOptions.value, 0)
  if (values.length > 1) {
    labels.value[1] = findLabel(secondOptions.value, 1)
  }
  if (values.length > 2) {
    labels.value[2] = findLabel(thirdOptions.value, 2)
  }
}
// 一级下拉回调
function onFirstChange(value: string | number, label: string): void {
  if (props.changeOnSelect) {
    emits('update:modelValue', [value])
    emits('change', [value], [label])
  } else {
    values.value = [value]
    labels.value = [label]
  }
}
// 二级下拉回调
function onSecondChange(value: string | number, label: string): void {
  if (props.changeOnSelect) {
    emits('update:modelValue', [values.value[0], value])
    emits('change', [values.value[0], value], [labels.value[0], label])
  } else {
    values.value = [values.value[0], value]
    labels.value = [labels.value[0], label]
  }
}
// 三级下拉回调
function onThirdChange(value: string | number, label: string): void {
  emits('update:modelValue', [...values.value.slice(0, 2), value])
  emits('change', [...values.value.slice(0, 2), value], [...labels.value.slice(0, 2), label])
}
</script>
<template>
  <div class="cascader-wrap" :style="`--cascader-select-gap: ${selectGap};`">
    <Select
      :options="firstOptions"
      :label="label"
      :value="value"
      :placeholder="Array.isArray(placeholder) ? placeholder[0] : placeholder"
      :disabled="Array.isArray(disabled) ? disabled[0] : disabled"
      :width="Array.isArray(width) ? width[0] : width"
      :height="height"
      :size="size"
      :allow-clear="allowClear"
      :search="search"
      :placement="placement"
      :flip="flip"
      :to="to"
      :filter="filter"
      :max-display="maxDisplay"
      :scrollbar-props="scrollbarProps"
      v-model="values[0]"
      @change="onFirstChange"
      v-bind="$attrs"
    />
    <Select
      :options="secondOptions"
      :label="label"
      :value="value"
      :placeholder="Array.isArray(placeholder) ? placeholder[1] : placeholder"
      :disabled="Array.isArray(disabled) ? disabled[1] : disabled"
      :width="Array.isArray(width) ? width[1] : width"
      :height="height"
      :size="size"
      :allow-clear="allowClear"
      :search="search"
      :placement="placement"
      :flip="flip"
      :to="to"
      :filter="filter"
      :max-display="maxDisplay"
      :scrollbar-props="scrollbarProps"
      v-model="values[1]"
      @change="onSecondChange"
      v-bind="$attrs"
    />
    <Select
      :options="thirdOptions"
      :label="label"
      :value="value"
      :placeholder="Array.isArray(placeholder) ? placeholder[2] : placeholder"
      :disabled="Array.isArray(disabled) ? disabled[2] : disabled"
      :width="Array.isArray(width) ? width[2] : width"
      :height="height"
      :size="size"
      :allow-clear="allowClear"
      :search="search"
      :placement="placement"
      :flip="flip"
      :to="to"
      :filter="filter"
      :max-display="maxDisplay"
      :scrollbar-props="scrollbarProps"
      v-model="values[2]"
      @change="onThirdChange"
      v-bind="$attrs"
    />
  </div>
</template>
<style lang="less" scoped>
.cascader-wrap {
  display: inline-flex;
  gap: var(--cascader-select-gap);
}
</style>
