<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue'
import Empty from '../empty'
interface Option {
  label?: string // 选项值
  value?: string|number // 选项名
  disabled?: boolean // 是否禁用选项
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Props {
  options?: Option[] // 选项数据
  label?: string // 字典项的文本字段名
  value?: string // 字典项的值字段名
  placeholder?: string // 默认文本
  disabled?: boolean // 是否禁用
  allowClear?: boolean // 是否支持清除
  search?: boolean // 是否支持搜索
  /*
    根据输入项进行筛选，默认为 true 时，筛选每个选项的文本字段 label 是否包含输入项，包含返回 true，反之返回 false
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filter?: Function|true // 过滤条件函数，仅当支持搜索时生效
  width?: number // 宽度
  height?: number // 高度
  maxDisplay?: number // 下拉面板最多能展示的下拉项数，超过后滚动显示
  modelValue?: number|string|null // （v-model）当前选中的option条目
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: 'label',
  value: 'value',
  placeholder: '请选择',
  disabled: false,
  search: false,
  allowClear: false,
  filter: true,
  width: 120,
  height: 32,
  maxDisplay: 6,
  modelValue: null
})
const filterOptions = ref<Option[]>()
const selectedName = ref()
const inputValue = ref()
const hoverValue = ref() // 鼠标悬浮项的value值
const showOptions = ref(false) // options面板
const activeBlur = ref(true) // 是否激活blur事件
const showArrow = ref(true) // 剪头图标显隐
const showClear = ref(false) // 清除图标显隐
const showSearch = ref(false) // 搜索图标显隐
const selectRef = ref()
watchEffect(() => {
  if (props.search) {
    filterOptions.value = props.options.filter(option => {
      if (typeof props.filter === 'function') {
        return props.filter(inputValue.value, option)
      } else {
        return option[props.label].includes(inputValue.value)
      }
    })
    if (filterOptions.value.length && inputValue.value) {
      hoverValue.value = filterOptions.value[0][props.value]
    } else {
      hoverValue.value = null
    }
  } else {
    filterOptions.value = props.options
  }
})
watchEffect(() =>{ // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  initSelector()
})
watch(showOptions, (to) => {
  if (!to && props.search) {
    inputValue.value = selectedName.value
  }
})
function initSelector () {
  if (props.modelValue) {
    const target = props.options.find(option => option[props.value] === props.modelValue)
    if (target) {
      selectedName.value = target[props.label]
      hoverValue.value = target[props.value]
    } else {
      selectedName.value = props.modelValue
      hoverValue.value = null
    }
  } else {
    selectedName.value = null
    hoverValue.value = null
  }
  if (props.search) {
    inputValue.value = selectedName.value
  }
}
function onBlur () {
  // console.log('blur')
  if (showOptions.value) {
    showOptions.value = false
  }
  if (props.search) {
    showSearch.value = false
    showArrow.value = true
  }
}
function onInputEnter () {
  // console.log('input enter')
  if (props.allowClear && selectedName.value) {
    showArrow.value = false
    showClear.value = true
    if (props.search) {
      showSearch.value = false
    }
  }
}
function onInputLeave () {
  // console.log('input leave')
  if (props.allowClear && showClear.value) {
    showClear.value = false
    if (!props.search) {
      showArrow.value = true
    }
  }
  if (props.search) {
    if (showOptions.value) {
      showSearch.value = true
      showArrow.value = false
      selectRef.value.focus()
    } else {
      showSearch.value = false
      showArrow.value = true
    }
  }
}
function onHover (value: string|number) {
  hoverValue.value = value
}
function onEnter () {
  activeBlur.value = false
}
function onLeave () {
  hoverValue.value = null
  activeBlur.value = true
  selectRef.value.focus()
}
function openSelect () {
  showOptions.value = !showOptions.value
  inputValue.value = ''
  if (!hoverValue.value && selectedName.value) {
    const target = props.options.find(option => option[props.label] === selectedName.value)
    hoverValue.value = target ? target[props.value] : null
  }
  if (props.search) {
    if (!showClear.value) {
      showArrow.value = !showOptions.value
      showSearch.value = showOptions.value
    }
  }
}
const emits = defineEmits(['update:modelValue', 'change'])
function onClear () {
  showClear.value = false
  selectedName.value = null
  hoverValue.value = null
  showOptions.value = false
  showArrow.value = true
  emits('update:modelValue')
  emits('change')
}
function onChange (value: string|number, label: string, index: number) { // 选中下拉项后的回调
  if (props.modelValue !== value) {
    selectedName.value = label
    hoverValue.value = value
    emits('update:modelValue', value)
    emits('change', value, label, index)
  }
  showOptions.value = false
  if (props.search) {
    showSearch.value = false
    showArrow.value = true
  }
}
</script>
<template>
  <div class="m-select" :style="`height: ${height}px;`">
    <div
      :class="['m-select-wrap', {'hover': !disabled, 'focus': showOptions, 'disabled': disabled}]"
      :style="`width: ${width}px; height: ${height}px;`"
      tabindex="1"
      ref="selectRef"
      @mouseenter="onInputEnter"
      @mouseleave="onInputLeave"
      @blur="activeBlur && !disabled ? onBlur() : () => false"
      @click="disabled ? () => false : openSelect()">
      <div
        v-if="!search"
        :class="['u-select-input', {'placeholder': !selectedName}]"
        :style="`line-height: ${height - 2}px;`"
        :title="selectedName"
      >{{ selectedName || placeholder }}</div>
      <input
        v-else
        class="u-search"
        :style="`line-height: ${height - 2}px;`"
        autocomplete="off"
        v-model.number.trim="inputValue"
        :placeholder="selectedName || placeholder" />
      <svg focusable="false" :class="['u-svg', {'show': showSearch}]" data-icon="search" aria-hidden="true" viewBox="64 64 896 896"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
      <svg :class="['u-svg', {'rotate': showOptions, 'show': showArrow}]" viewBox="64 64 896 896" data-icon="down" aria-hidden="true" focusable="false"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
      <svg @click.stop="onClear" :class="['close', {'show': showClear}]" focusable="false" data-icon="close-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
    </div>
    <TransitionGroup name="fade" tag="div">
      <div
        v-show="showOptions && filterOptions && filterOptions.length"
        class="m-options-panel"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        key="1"
        :style="`top: ${height + 4}px; line-height: ${height - 10}px; max-height: ${ maxDisplay * height + 9 }px; width: ${width}px;`">
        <p
          v-for="(option, index) in filterOptions" :key="index"
          :class="['u-option', {'option-hover': !option.disabled&&option[value]===hoverValue, 'option-selected': option[label]===selectedName, 'option-disabled': option.disabled }]"
          :title="option[label]"
          @mouseenter="onHover(option[value])"
          @click="option.disabled ? () => false : onChange(option[value], option[label], index)">
          {{ option[label] }}
        </p>
      </div>
      <div
        v-show="showOptions && filterOptions && !filterOptions.length"
        key="2"
        class="m-empty-wrap"
        :style="`top: ${height + 4}px; width: ${width}px;`">
        <Empty image="2" key="2" />
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
.m-select {
  position: relative;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, .88);
}
.fade-enter-active, .fade-leave-active {
  transform: scaleY(1);
  transform-origin: 0% 0%;
  opacity: 1;
  transition: all .3s;
}
.fade-enter-from {
  transform: scaleY(.8);
  transform-origin: 0% 0%;
  opacity: 0;
}
.fade-leave-to {
  transform: scaleY(1);
  opacity: 0;
}
.m-select-wrap {
  position: relative;
  z-index: 8;
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background-color: #FFF;
  outline: none;
  cursor: pointer;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  .u-select-input {
    display: block;
    text-align: left;
    margin-left: 11px;
    margin-right: 27px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .u-search {
    display: inline-block;
    margin-left: 11px;
    margin-right: 27px;
    width: calc(100% - 38px);
    text-overflow: ellipsis;
    background: transparent;
    border: none;
    outline: none;
  }
  input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, .25);
  }
  input:-moz-placeholder {
    color: rgba(0, 0, 0, .25);
  }
  input::-moz-placeholder {
    color: rgba(0, 0, 0, .25);
  }
  input:-ms-input-placeholder {
    color: rgba(0, 0, 0, .25);
  }
  .placeholder {
    color: rgba(0, 0, 0, .25);
  }
  .u-svg {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    right: 11px;
    width: 12px;
    height: 12px;
    fill: rgba(0, 0, 0, .25);
    opacity: 0;
    pointer-events: none;
    transition: all .3s ease-in-out;
  }
  .rotate {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }
  .close {
    .u-svg();
    fill: rgba(140, 140, 140, .6);
    &:hover {
      fill: rgba(100, 100, 100, .8);
    }
  }
  .show {
    opacity: 1;
    pointer-events: auto;
  }
}
.hover { // 悬浮时样式
  &:hover {
    border-color: @themeColor;
  }
}
.focus { // 激活时样式
  border-color: @themeColor;
  box-shadow: 0 0 0 2px fade(@themeColor, 20%);
}
.disabled { // 下拉禁用样式
  color: rgba(0,0,0,.25);
  background: #f5f5f5;
  user-select: none;
  cursor: not-allowed;
}
.m-options-panel {
  position: absolute;
  z-index: 9;
  overflow: auto;
  background-color: #FFF;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
  .u-option { // 下拉项默认样式
    text-align: left;
    position: relative;
    display: block;
    padding: 5px 12px;
    border-radius: 4px;
    font-weight: 400;
    line-height: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: background .3s ease;
  }
  .option-hover { // 悬浮时的下拉项样式
    background: rgba(0, 0, 0, .04);
  }
  .option-selected { // 被选中的下拉项样式
    font-weight: 600;
    background: #e6f4ff;
  }
  .option-disabled { // 禁用某个下拉选项时的样式
    color: rgba(0, 0, 0, .25);
    user-select: none;
    cursor: not-allowed;
  }
}
.m-empty-wrap {
  position: absolute;
  z-index: 9;
  height: 100px;
  border-radius: 8px;
  padding: 13px 20px;
  background-color: #FFF;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
}
</style>
