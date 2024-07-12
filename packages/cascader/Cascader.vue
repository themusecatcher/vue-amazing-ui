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
  label?: string // 下拉字典项的文本字段名
  value?: string // 下拉字典项的值字段名
  children?: string // 下拉字典项的后代字段名
  placeholder?: string | string[] // 三级下拉各自占位文本
  changeOnSelect?: boolean // 当此项为 true 时，点选每级菜单选项值（v-model）都会发生变化；否则只有选择第三级选项后选项值才会变化
  gap?: number // 级联下拉框相互间隙宽度，单位px
  width?: 'auto' | number | number[] // 三级下拉各自宽度
  height?: number // 下拉框高度
  disabled?: boolean | boolean[] // 三级各自是否禁用
  allowClear?: boolean // 是否支持清除
  search?: boolean // 是否支持搜索
  /*
    根据输入项进行筛选，默认为 true 时，筛选每个选项的文本字段 label 是否包含输入项，包含返回 true，反之返回 false
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filter?: Function | true // 过滤条件函数，仅当支持搜索时生效
  maxDisplay?: number // 下拉面板最多能展示的下拉项数，超过后滚动显示
  modelValue?: number[] | string[] // （v-model）级联选中项
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: 'label',
  value: 'value',
  children: 'children',
  placeholder: '请选择',
  changeOnSelect: false,
  gap: 8,
  width: 'auto',
  height: 32,
  disabled: false,
  allowClear: false,
  search: false,
  filter: true,
  maxDisplay: 6,
  modelValue: () => []
})
const values = ref<(string | number)[]>([]) // 级联value值数组
const labels = ref<string[]>([]) // 级联label文本数组
const firstOptions = ref<Option[]>([])
const secondOptions = ref<Option[]>([])
const thirdOptions = ref<Option[]>([])
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
function initCascader(values: (string | number)[]) {
  // 获取二级/三级下拉项
  secondOptions.value = findChildren(firstOptions.value, 0)
  thirdOptions.value = []
  if (values.length > 1) {
    thirdOptions.value = findChildren(secondOptions.value, 1)
  }
}
function findLabel(options: Option[], index: number): any {
  const len = options.length
  for (let i = 0; i < len; i++) {
    if (options[i][props.value] === values.value[index]) {
      return options[i][props.label]
    }
  }
  return values.value[index]
}
function initLabels(values: (string | number)[]) {
  labels.value[0] = findLabel(firstOptions.value, 0)
  if (values.length > 1) {
    labels.value[1] = findLabel(secondOptions.value, 1)
  }
  if (values.length > 2) {
    labels.value[2] = findLabel(thirdOptions.value, 2)
  }
}
const emits = defineEmits(['update:modelValue', 'change'])
function onFirstChange(value: string | number, label: string) {
  // 一级下拉回调
  if (props.changeOnSelect) {
    emits('update:modelValue', [value])
    emits('change', [value], [label])
  } else {
    values.value = [value]
    labels.value = [label]
  }
}
function onSecondChange(value: string | number, label: string) {
  // 二级下拉回调
  if (props.changeOnSelect) {
    emits('update:modelValue', [values.value[0], value])
    emits('change', [values.value[0], value], [labels.value[0], label])
  } else {
    values.value = [values.value[0], value]
    labels.value = [labels.value[0], label]
  }
}
function onThirdChange(value: string | number, label: string) {
  // 三级下拉回调
  emits('update:modelValue', [...values.value.slice(0, 2), value])
  emits('change', [...values.value.slice(0, 2), value], [...labels.value.slice(0, 2), label])
}
</script>
<template>
  <div class="m-cascader" :style="`width: ${selectWidth}; height: ${height}px;`">
    <div
      :class="['m-select-wrap', { hover: !disabled, focus: showOptions, disabled: disabled }]"
      tabindex="1"
      ref="selectRef"
      @mouseenter="onInputEnter"
      @mouseleave="onInputLeave"
      @blur="activeBlur && !disabled ? onBlur() : () => false"
      @click="disabled ? () => false : openSelect()"
    >
      <span class="m-select-search" v-show="search">
        <input class="u-select-search" :style="`height: ${height - 2}px;`" autocomplete="off" />
      </span>
      <span
        :class="['u-select-item', { 'select-item-gray': !selectedName || showOptions }]"
        :style="`height: ${height - 2}px; line-height: ${height - 2}px;`"
        :title="selectedName"
      >
        {{ selectedName || placeholder }}
      </span>
      <svg
        focusable="false"
        :class="['u-svg', { show: showSearch }]"
        data-icon="search"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
        ></path>
      </svg>
      <svg
        :class="['u-svg', { rotate: showOptions, show: showArrow }]"
        viewBox="64 64 896 896"
        data-icon="down"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
        ></path>
      </svg>
      <svg
        @click.stop="onClear"
        :class="['u-clear', { show: showClear }]"
        focusable="false"
        data-icon="close-circle"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
        ></path>
      </svg>
    </div>
    <TransitionGroup name="fade" tag="div">
      <div
        v-show="showOptions && filterOptions && filterOptions.length"
        class="m-options-panel"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        key="1"
        :style="`top: ${height + 4}px; line-height: ${height - 10}px; max-height: ${maxDisplay * height + 9}px; width: 100%;`"
      >
        <p
          v-for="(option, index) in filterOptions"
          :key="index"
          :class="[
            'u-option',
            {
              'option-hover': !option.disabled && option[value] === hoverValue,
              'option-selected': option[label] === selectedName,
              'option-disabled': option.disabled
            }
          ]"
          :title="option[label]"
          @mouseenter="onHover(option[value])"
          @click="option.disabled ? () => false : onChange(option[value], option[label], index)"
        >
          {{ option[label] }}
        </p>
      </div>
      <div
        v-show="showOptions && filterOptions && !filterOptions.length"
        key="2"
        class="m-empty-wrap"
        :style="`top: ${height + 4}px; width: ${width}px;`"
      >
        <Empty image="2" key="2" />
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
.m-cascader {
  display: inline-flex;
}
</style>
