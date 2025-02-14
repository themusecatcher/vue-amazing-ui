<script setup lang="ts">
import { ref, computed, watchEffect, watch, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import Empty from 'components/empty'
import Scrollbar from 'components/scrollbar'
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
  placeholder?: string // 默认占位文本
  disabled?: boolean // 是否禁用
  allowClear?: boolean // 是否支持清除
  search?: boolean // 是否支持搜索，使用搜索时请设置 width
  /*
    根据输入项进行筛选，默认为 true 时，筛选每个选项的文本字段 label 是否包含输入项，包含返回 true，反之返回 false
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filter?: Function | true // 过滤条件函数，仅当支持搜索时生效
  width?: string | number // 选择器宽度，单位 px
  height?: number // 选择器高度，单位 px
  size?: 'small' | 'middle' | 'large' // 选择器大小
  maxDisplay?: number // 下拉面板最多能展示的下拉项数，超过后滚动显示
  scrollbarProps?: object // 下拉面板滚动条 scrollbar 组件属性配置
  modelValue?: number | string // (v-model) 当前选中的 option 条目值
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
  width: 'auto',
  height: undefined,
  size: 'middle',
  maxDisplay: 6,
  scrollbarProps: () => ({}),
  modelValue: undefined
})
const filterOptions = ref<Option[]>() // 过滤后的选项数组
const selectedName = ref() // 当前选中选项的 label
const inputRef = ref() // 输入框 DOM 引用
const inputValue = ref() // 支持搜索时，用户输入内容
const disabledBlur = ref(false) // 是否禁用 input 标签的 blur 事件
const hideSelectName = ref(false) // 用户输入时，隐藏 selectName 的展示
const hoverValue = ref() // 鼠标悬浮项的 value 值
const scrollbarRef = ref() // 下拉面板滚动条 DOM 引用
const scrollTop = ref(0) // 下拉面板滚动条滚动高度
const showOptions = ref(false) // 显示隐藏 options 面板
const showArrow = ref(true) // 剪头图标显隐
const showClear = ref(false) // 清除图标显隐
const showCaret = ref(false) // 支持搜索时，输入光标的显隐
const showSearch = ref(false) // 搜索图标显隐
const selectFocused = ref(false) /// select 是否聚焦
const emits = defineEmits(['update:modelValue', 'change', 'openChange'])
const selectWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const selectHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 32,
    large: 40
  }
  if (props.height !== undefined) {
    return `${props.height}px`
  }
  return `${heightMap[props.size]}px`
})
// 是否存在滚动
const isScrollable = computed(() => {
  return props.options.length > props.maxDisplay
})
const optionsStyle = computed(() => {
  const style: CSSProperties = {
    maxHeight: `${props.maxDisplay * 32 + 8}px`
  }
  return style
})
watchEffect(() => {
  if (props.search) {
    if (inputValue.value) {
      showOptions.value = true
      filterOptions.value = props.options.filter((option) => {
        if (typeof props.filter === 'function') {
          return props.filter(inputValue.value, option)
        } else {
          return option[props.label].includes(inputValue.value)
        }
      })
    } else {
      filterOptions.value = [...props.options]
    }
    if (filterOptions.value.length && inputValue.value) {
      hoverValue.value = filterOptions.value[0][props.value]
    } else {
      hoverValue.value = null
    }
  } else {
    filterOptions.value = props.options
  }
})
watchEffect(() => {
  // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  initSelector()
})
watch(showOptions, async (to) => {
  if (isScrollable.value) {
    if (!to) {
      const scrollData = scrollbarRef.value && scrollbarRef.value.getScrollData()
      scrollTop.value = scrollData?.scrollTop || 0
    } else {
      await nextTick()
      scrollbarRef.value &&
        scrollbarRef.value.scrollTo({
          top: scrollTop.value,
          behavior: 'instant'
        })
    }
  }
  emits('openChange', to)
  if (props.search && !to) {
    inputValue.value = undefined
    hideSelectName.value = false
  }
})
function initSelector() {
  if (props.modelValue) {
    const target = props.options.find((option) => option[props.value] === props.modelValue)
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
}
function onBlur() {
  selectFocused.value = false
  if (showOptions.value) {
    showOptions.value = false
  }
  if (props.search) {
    showSearch.value = false
    showArrow.value = true
    hideSelectName.value = false
  }
}
function onEnter() {
  disabledBlur.value = true
  if (props.allowClear) {
    if (selectedName.value || (props.search && inputValue.value)) {
      showArrow.value = false
      showClear.value = true
      if (props.search) {
        showSearch.value = false
      }
    }
  }
}
function onLeave() {
  disabledBlur.value = false
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
    } else {
      showSearch.value = false
      showArrow.value = true
    }
  }
}
function onHover(value: string | number, disabled: boolean | undefined) {
  disabledBlur.value = Boolean(disabled)
  hoverValue.value = value
}
function toggleSelect() {
  focusSelect()
  if (!props.search) {
    inputRef.value.style.opacity = 0
  }
  showOptions.value = !showOptions.value
  if (!hoverValue.value && selectedName.value) {
    const target = props.options.find((option) => option[props.label] === selectedName.value)
    hoverValue.value = target ? target[props.value] : null
  }
  if (props.search) {
    if (!showClear.value) {
      showArrow.value = !showOptions.value
      showSearch.value = showOptions.value
    }
  }
}
function onSearchInput(e: Event) {
  hideSelectName.value = Boolean((e.target as HTMLInputElement)?.value)
}
function onClear() {
  if (selectFocused.value) {
    focusSelect()
    showCaret.value = true
  }
  showClear.value = false
  selectedName.value = null
  hoverValue.value = null
  showOptions.value = false
  showSearch.value = false
  showArrow.value = true
  emits('update:modelValue')
  emits('change')
}
function focusSelect() {
  inputRef.value.focus() // 通过 input 标签聚焦来模拟 select 整体聚焦效果
  selectFocused.value = true
}
function onChange(value: string | number, label: string, index: number) {
  // 选中下拉项后的回调
  if (props.modelValue !== value) {
    selectedName.value = label
    hoverValue.value = value
    emits('update:modelValue', value)
    emits('change', value, label, index)
  }
  showCaret.value = false
}
function onClick() {
  inputRef.value.focus()
}
</script>
<template>
  <div
    class="m-select"
    :class="{
      'select-focused': selectFocused,
      'search-select': search,
      'select-small': size === 'small',
      'select-large': size === 'large',
      'select-disabled': disabled
    }"
    :style="`--select-width: ${selectWidth}; --select-height: ${selectHeight};`"
    @click="disabled ? () => false : toggleSelect()"
  >
    <div class="select-wrap" @mouseenter="onEnter" @mouseleave="onLeave">
      <span class="select-search">
        <input
          ref="inputRef"
          class="search-input"
          :class="{ 'caret-show': showOptions || showCaret }"
          type="text"
          autocomplete="off"
          :readonly="!search"
          :disabled="disabled"
          @input="onSearchInput"
          v-model="inputValue"
          @blur="!disabledBlur && showOptions && !disabled ? onBlur() : () => false"
        />
      </span>
      <span
        v-if="!hideSelectName"
        class="select-item"
        :class="{ 'select-placeholder': !selectedName || showOptions }"
        :title="selectedName"
      >
        {{ selectedName || placeholder }}
      </span>
      <svg
        class="arrow-svg"
        :class="{ 'arrow-rotate': showOptions, 'show-svg': showArrow }"
        focusable="false"
        data-icon="down"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
        ></path>
      </svg>
      <svg
        class="search-svg"
        :class="{ 'show-svg': showSearch }"
        focusable="false"
        data-icon="search"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
        ></path>
      </svg>
      <svg
        class="clear-svg"
        :class="{ 'show-svg': showClear }"
        focusable="false"
        data-icon="close-circle"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        fill-rule="evenodd"
        viewBox="64 64 896 896"
        @click.stop="onClear"
      >
        <path
          d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
        ></path>
      </svg>
    </div>
    <Transition
      name="slide-down"
      enter-from-class="slide-down-enter"
      enter-active-class="slide-down-enter"
      enter-to-class="slide-down-enter slide-down-enter-active"
      leave-from-class="slide-down-leave"
      leave-active-class="slide-down-leave slide-down-leave-active"
      leave-to-class="slide-down-leave slide-down-leave-active"
    >
      <div
        v-if="showOptions && filterOptions && filterOptions.length"
        class="select-options-panel"
        @click.stop="onClick"
        @mouseenter="disabledBlur = true"
        @mouseleave="disabledBlur = false"
      >
        <Scrollbar ref="scrollbarRef" :content-style="{ padding: '4px' }" :style="optionsStyle" v-bind="scrollbarProps">
          <p
            v-for="(option, index) in filterOptions"
            :key="index"
            :class="[
              'select-option',
              {
                'option-hover': !option.disabled && option[value] === hoverValue,
                'option-selected': option[label] === selectedName,
                'option-disabled': option.disabled
              }
            ]"
            :title="option[label]"
            @mouseenter="onHover(option[value], option.disabled)"
            @click.stop="option.disabled ? focusSelect() : onChange(option[value], option[label], index)"
          >
            {{ option[label] }}
          </p>
        </Scrollbar>
      </div>
      <div
        v-else-if="showOptions && filterOptions && !filterOptions.length"
        class="select-options-panel options-empty"
        @click.stop="onClick"
        @mouseenter="disabledBlur = true"
        @mouseleave="disabledBlur = false"
      >
        <Empty image="outlined" />
      </div>
    </Transition>
  </div>
</template>
<style lang="less" scoped>
.slide-down-enter {
  transform: scale(0);
  transform-origin: 0% 0%;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.slide-down-enter-active {
  animation-name: slideDownIn;
  animation-play-state: running;
  @keyframes slideDownIn {
    0% {
      transform: scaleY(0.8);
      transform-origin: 0% 0%;
      opacity: 0;
    }
    100% {
      transform: scaleY(1);
      transform-origin: 0% 0%;
      opacity: 1;
    }
  }
}
.slide-down-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.slide-down-leave-active {
  animation-name: slideDownOut;
  animation-play-state: running;
  @keyframes slideDownOut {
    0% {
      transform: scaleY(1);
      transform-origin: 0% 0%;
      opacity: 1;
    }
    100% {
      transform: scaleY(0.8);
      transform-origin: 0% 0%;
      opacity: 0;
    }
  }
}
.m-select {
  position: relative;
  display: inline-block;
  width: var(--select-width);
  height: var(--select-height);
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.88);
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  &:not(.select-disabled):hover {
    // 悬浮时样式
    .select-wrap {
      border-color: #4096ff;
    }
  }
  .select-wrap {
    position: relative;
    display: flex;
    padding: 0 11px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    outline: none;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &::after {
      display: inline-block;
      width: 0;
      visibility: hidden;
      content: '\a0';
      line-height: calc(var(--select-height) - 2px);
    }
    .select-search {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 11px;
      right: 11px;
      .search-input {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        caret-color: transparent;
        vertical-align: top;
        background: transparent;
        border: none;
        outline: none;
        appearance: none;
        opacity: 0;
        cursor: pointer;
      }
      .caret-show {
        caret-color: auto;
      }
    }
    .select-item {
      position: relative;
      padding-right: 18px;
      flex: 1;
      line-height: calc(var(--select-height) - 2px);
      user-select: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: all 0.3s;
    }
    .select-placeholder {
      color: rgba(0, 0, 0, 0.25);
      transition: none;
      pointer-events: none;
    }
    .icon-svg {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 11px;
      margin: auto 0;
      display: inline-block;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.25);
      fill: currentColor;
      opacity: 0;
      user-select: none;
      pointer-events: none;
    }
    .arrow-svg {
      .icon-svg();
      transition:
        transform 0.3s,
        opacity 0.3s;
    }
    .arrow-rotate {
      transform: rotate(180deg);
    }
    .search-svg {
      .icon-svg();
      transition: opacity 0.3s;
    }
    .clear-svg {
      .icon-svg();
      z-index: 1;
      background: #fff;
      cursor: pointer;
      transition:
        color 0.2s,
        opacity 0.3s;
      &:hover {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .show-svg {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .select-options-panel {
    position: absolute;
    top: calc(var(--select-height) + 4px);
    z-index: 1000;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    outline: none;
    cursor: auto;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    .select-option {
      // 下拉项默认样式
      min-height: 32px;
      display: block;
      padding: 5px 12px;
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5714285714285714;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: background 0.3s ease;
    }
    .option-hover {
      // 悬浮时的下拉项样式
      background: rgba(0, 0, 0, 0.04);
    }
    .option-selected {
      // 被选中的下拉项样式
      font-weight: 600;
      background: #e6f4ff;
    }
    .option-disabled {
      // 禁用某个下拉选项时的样式
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
  .options-empty {
    padding: 9px 16px;
    .m-empty {
      margin-block: 8px;
      :deep(.empty-image-wrap) {
        height: 35px;
      }
    }
  }
}
.select-focused:not(.select-disabled) {
  // 激活时样式
  .select-wrap {
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }
}
.search-select {
  .select-wrap {
    cursor: text;
    .select-search {
      .search-input {
        cursor: auto;
        color: inherit;
        opacity: 1;
      }
    }
  }
}
.select-small {
  font-size: 14px;
  .select-wrap {
    padding: 0 7px;
    border-radius: 4px;
    .select-search {
      left: 7px;
      right: 28px;
    }
    .select-item {
      padding-right: 22px;
    }
  }
}
.select-large {
  font-size: 16px;
  .select-wrap {
    padding: 0 11px;
    border-radius: 8px;
    .select-item {
      padding-right: 20px;
    }
  }
}
.select-disabled {
  .select-wrap {
    // 下拉禁用样式
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    user-select: none;
    cursor: not-allowed;
    .select-search .search-input {
      cursor: not-allowed;
    }
  }
}
</style>
