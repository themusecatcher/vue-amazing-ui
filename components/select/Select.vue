​
<script setup lang="ts">
import { ref, computed, watchEffect, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import Empty from 'components/empty'
import Scrollbar from 'components/scrollbar'
import { useEventListener, useMutationObserver, useInject, useOptionsSupported } from 'components/utils'
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
  width?: string | number // 选择器宽度，单位 px
  height?: number // 选择器高度，单位 px
  size?: 'small' | 'middle' | 'large' // 选择器大小
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
  width: 'auto',
  height: undefined,
  size: 'middle',
  allowClear: false,
  search: false,
  placement: 'bottom',
  flip: true,
  to: 'body',
  filter: true,
  maxDisplay: 6,
  scrollbarProps: () => ({}),
  modelValue: undefined
})
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const filterOptions = ref<Option[]>([]) // 过滤后的选项数组
const selectedName = ref() // 当前选中选项的 label
const inputRef = ref<HTMLElement | null>(null) // input 元素引用
const inputValue = ref() // 支持搜索时，用户输入内容
const disabledBlur = ref<boolean>(false) // 是否禁用 input 标签的 blur 事件
const hideSelectName = ref<boolean>(false) // 用户输入时，隐藏 selectName 的展示
const hoverValue = ref() // 鼠标悬浮项的 value 值
const showOptions = ref<boolean>(false) // 显示隐藏 options 面板
const showArrow = ref<boolean>(true) // 剪头图标显隐
const showClear = ref<boolean>(false) // 清除图标显隐
const showCaret = ref<boolean>(false) // 支持搜索时，输入光标的显隐
const showSearch = ref<boolean>(false) // 搜索图标显隐
const selectFocused = ref<boolean>(false) /// select 是否聚焦
const { colorPalettes, shadowColor } = useInject('Select') // 主题色注入
const scrollTarget = ref<HTMLElement | null>(null) // 最近的可滚动父元素
const scrollTop = ref<number>(0) // scrollTarget 的滚动位置
const panelOffset = ref<number>(0) // 下拉面板相对于 selectContent 的垂直偏移距离
const panelPlace = ref<'bottom' | 'top'>('bottom') // 下拉面板位置
const selectContentRef = ref<HTMLElement | null>(null) // selectContent 模板引用
const selectContentRect = ref<DOMRect>() // selectContent 元素的大小及其相对于视口的位置
const positionedContainer = ref<HTMLElement | null>(null) // 下拉面板相对定位的容器元素
const positionedContainerRect = ref<DOMRect>() // positionedContainer 元素的大小及其相对于视口的位置
const selectPanelRef = ref<HTMLElement | null>(null) // 下拉面板 selectPanel 模板引用
const selectPanelHeight = ref<number>() // 下拉面板 selectPanel 的高度
const viewportWidth = ref<number>(document.documentElement.clientWidth) // 视口宽度(不包括滚动条)
const viewportHeight = ref<number>(document.documentElement.clientHeight) // 视口高度(不包括滚动条)
const { isSupported: passiveSupported } = useOptionsSupported('passive')
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
const panelPlacement = computed(() => {
  const contentTop = (selectContentRect.value as DOMRect)?.top ?? 0
  const containerTop = (positionedContainerRect.value as DOMRect)?.top ?? 0
  const offsetTop = contentTop - containerTop
  const contentBottom = (selectContentRect.value as DOMRect)?.bottom ?? 0
  const containerBottom = (positionedContainerRect.value as DOMRect)?.bottom ?? 0
  const offsetBottom = containerBottom - contentBottom
  const contentLeft = (selectContentRect.value as DOMRect)?.left ?? 0
  const containerLeft = (positionedContainerRect.value as DOMRect)?.left ?? 0
  const offsetLeft = contentLeft - containerLeft
  const panelWidth = (selectContentRect.value as DOMRect)?.width ?? 0
  switch (panelPlace.value) {
    case 'bottom':
      return {
        transformOrigin: '0 0',
        top: `${offsetTop + panelOffset.value}px`,
        left: `${offsetLeft}px`,
        minWidth: `${panelWidth}px`,
        width: `${panelWidth}px`
      }
    case 'top':
      return {
        transformOrigin: '100% 100%',
        bottom: `${offsetBottom + panelOffset.value}px`,
        left: `${offsetLeft}px`,
        minWidth: `${panelWidth}px`,
        width: `${panelWidth}px`
      }
    default:
      return {
        transformOrigin: '0 0',
        top: `${offsetTop + panelOffset.value}px`,
        left: `${offsetLeft}px`,
        minWidth: `${panelWidth}px`,
        width: `${panelWidth}px`
      }
  }
})
watch(
  () => [props.placement, props.flip],
  () => {
    updatePosition()
  },
  {
    deep: true
  }
)
watch(showOptions, (to) => {
  if (to && !initialDisplay.value) {
    initialDisplay.value = true
  }
})
watch(showOptions, (to) => {
  emits('openChange', to)
  if (props.search && !to) {
    inputValue.value = undefined
    hideSelectName.value = false
  }
})
watchEffect(() => {
  if (props.search) {
    if (inputValue.value) {
      filterOptions.value = props.options.filter((option) => {
        if (typeof props.filter === 'function') {
          return props.filter(inputValue.value, option)
        } else {
          return option[props.label].includes(inputValue.value)
        }
      })
    } else {
      if (showOptions.value) {
        filterOptions.value = [...props.options]
      } else {
        setTimeout(() => {
          filterOptions.value = [...props.options]
        }, 200)
      }
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
  initSelector()
})
onMounted(() => {
  observeScroll()
})
onBeforeUnmount(() => {
  cleanup()
})
// 监听 vitepress 文档页面滚动
const mutationObserver = useMutationObserver(
  scrollTarget,
  () => {
    if (scrollTop.value !== scrollTarget.value?.scrollTop) {
      scrollTop.value = scrollTarget.value?.scrollTop ?? 0
      updatePosition()
    }
  },
  { subtree: true, attributes: true }
)
useEventListener(window, 'resize', getViewportSize)
function getPositionedContainer(): void {
  let parentElement = selectPanelRef.value?.parentElement
  while (parentElement) {
    if (parentElement === document.documentElement) {
      positionedContainer.value = document.documentElement
      return
    }
    const { position } = getComputedStyle(parentElement)
    if (position !== 'static') {
      positionedContainer.value = parentElement
      return
    }
    parentElement = parentElement.parentElement
  }
}
function getViewportSize() {
  viewportWidth.value = document.documentElement.clientWidth
  viewportHeight.value = document.documentElement.clientHeight
  observeScroll() // 窗口尺寸变化时，重新查询并监听最近可滚动父元素
  updatePosition()
}
// 查询并监听最近可滚动父元素
function observeScroll() {
  cleanup()
  scrollTarget.value = getScrollParent(selectContentRef.value)
  scrollTarget.value &&
    scrollTarget.value.addEventListener(
      'scroll',
      updatePosition,
      passiveSupported.value ? { passive: true } : undefined
    )
  if (scrollTarget.value === document.documentElement) {
    mutationObserver.start()
  } else {
    mutationObserver.stop()
  }
}
/**
 * 清理滚动监听事件并重置滚动目标。
 *
 * 清理函数，移除滚动事件监听并重置滚动目标
 */
function cleanup() {
  scrollTarget.value && scrollTarget.value.removeEventListener('scroll', updatePosition)
  scrollTarget.value = null
}
// 获取父元素
function getParentElement(el: HTMLElement): HTMLElement | null {
  // Document
  if (el === document.documentElement) return null
  return el.parentElement
}
// 查找最近的可滚动父元素
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (el === null) return null
  const parentElement = getParentElement(el)
  if (parentElement === null) return null
  // Document
  if (parentElement === document.documentElement) return document.documentElement
  const isScrollable = (el: HTMLElement): boolean => {
    const { overflow, overflowX, overflowY } = getComputedStyle(el)
    return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
  }
  // Element
  if (isScrollable(parentElement)) return parentElement
  return getScrollParent(parentElement)
}
// 更新下拉面板位置
function updatePosition() {
  showOptions.value && getPosition()
}
// 计算下拉面板位置
async function getPosition() {
  await nextTick()
  getPositionedContainer()
  positionedContainerRect.value = positionedContainer.value?.getBoundingClientRect() as DOMRect
  selectContentRect.value = selectContentRef.value?.getBoundingClientRect() as DOMRect
  selectPanelHeight.value = selectPanelRef.value?.offsetHeight
  panelOffset.value = selectContentRect.value.height + 4
  if (props.flip) {
    panelPlace.value = getPlacement()
  }
}
// 获取可滚动父元素或视口的矩形信息
function getShelterRect() {
  if (scrollTarget.value) {
    const scrollTargetRect = scrollTarget.value.getBoundingClientRect()
    return {
      top: scrollTargetRect.top < 0 ? 0 : scrollTargetRect.top,
      bottom: scrollTargetRect.bottom > viewportHeight.value ? viewportHeight.value : scrollTargetRect.bottom
    }
  }
  return {
    top: 0,
    bottom: viewportHeight.value
  }
}
// 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
function getPlacement(): 'bottom' | 'top' {
  const { top, bottom } = selectContentRect.value as DOMRect // 内容元素各边缘相对于浏览器视口的位置(不包括滚动条)
  const { top: targetTop, bottom: targetBottom } = getShelterRect() // 滚动元素或视口各边缘相对于浏览器视口的位置(不包括滚动条)
  const topDistance = top - targetTop // 内容元素上边缘距离滚动元素上边缘的距离
  const bottomDistance = targetBottom - bottom // 内容元素下边缘距离动元素下边缘的距离
  return findPlace(props.placement, [])
  // 查询满足条件的 place，如果没有，则返回默认值
  function findPlace(place: string, disabledPlaces: string[]): 'bottom' | 'top' {
    if (place === 'bottom') {
      if (!disabledPlaces.includes('bottom')) {
        if (bottomDistance < (selectPanelHeight.value as number) + 4) {
          return findPlace('top', [...disabledPlaces, 'bottom'])
        } else {
          return 'bottom'
        }
      } else {
        if (!disabledPlaces.includes('top')) {
          return findPlace('top', disabledPlaces)
        }
      }
    } else if (place === 'top') {
      if (!disabledPlaces.includes('top')) {
        if (topDistance < (selectPanelHeight.value as number) + 4) {
          return findPlace('bottom', [...disabledPlaces, 'top'])
        } else {
          return 'top'
        }
      } else {
        if (!disabledPlaces.includes('bottom')) {
          return findPlace('bottom', disabledPlaces)
        }
      }
    }
    return props.placement
  }
}
function initSelector(): void {
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
function onFocus(): void {
  selectFocused.value = true
}
function onBlur(): void {
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
function onEnter(): void {
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
function onLeave(): void {
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
function onHover(value: string | number, disabled: boolean | undefined): void {
  disabledBlur.value = Boolean(disabled)
  hoverValue.value = value
}
async function toggleSelect(): Promise<void> {
  selectFocus()
  if (!props.search && inputRef.value) {
    inputRef.value.style.opacity = '0'
  }
  showOptions.value = !showOptions.value
  if (showOptions.value) {
    getPosition()
  }
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
function onSearchInput(e: Event): void {
  hideSelectName.value = Boolean((e.target as HTMLInputElement)?.value)
}
function onClear(): void {
  if (selectFocused.value) {
    selectFocus()
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
function selectFocus(): void {
  inputRef.value?.focus() // 通过 input 标签聚焦来模拟 select 整体聚焦效果
}
// 选中下拉项后的回调
function onChange(value: string | number, label: string, index: number): void {
  if (props.modelValue !== value) {
    selectedName.value = label
    hoverValue.value = value
    emits('update:modelValue', value)
    emits('change', value, label, index)
  }
  showCaret.value = false
  selectFocus()
}
</script>
<template>
  <div
    class="select-wrap"
    :class="{
      'select-focused': selectFocused,
      'search-select': search,
      'select-small': size === 'small',
      'select-large': size === 'large',
      'select-disabled': disabled
    }"
    :style="`
      --select-width: ${selectWidth};
      --select-height: ${selectHeight};
      --select-primary-color-hover: ${colorPalettes[4]};
      --select-primary-color-focus: ${colorPalettes[4]};
      --select-primary-shadow-color: ${shadowColor};
    `"
    @click="disabled ? () => false : toggleSelect()"
  >
    <div ref="selectContentRef" class="select-content-container" @mouseenter="onEnter" @mouseleave="onLeave">
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
          @blur="!disabledBlur && !disabled ? onBlur() : () => false"
          @focus="!disabled ? onFocus() : () => false"
        />
      </span>
      <span
        class="select-item"
        :class="{ 'select-placeholder': !selectedName || showOptions, 'select-item-hidden': hideSelectName }"
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
    <Teleport :disabled="to === false" :to="to === false ? null : to">
      <Transition
        name="slide"
        enter-from-class="slide-enter"
        enter-active-class="slide-enter"
        enter-to-class="slide-enter slide-enter-active"
        leave-from-class="slide-leave"
        leave-active-class="slide-leave slide-leave-active"
        leave-to-class="slide-leave slide-leave-active"
      >
        <div
          v-if="initialDisplay"
          v-show="showOptions"
          ref="selectPanelRef"
          class="select-panel-container"
          :style="{
            ...panelPlacement,
            '--select-option-bg-color-active': colorPalettes[0]
          }"
        >
          <Scrollbar
            v-show="filterOptions.length"
            :style="{ ...optionsStyle, '--scrollbar-rail-vertical-right': '2px 0 2px auto' }"
            class="select-options-panel"
            @click.stop="selectFocus"
            @mouseenter="disabledBlur = true"
            @mouseleave="disabledBlur = false"
            v-bind="scrollbarProps"
          >
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
              @click.stop="option.disabled ? selectFocus() : onChange(option[value], option[label], index)"
            >
              {{ option[label] }}
            </p>
          </Scrollbar>
          <div
            v-show="!filterOptions.length"
            class="select-options-panel options-panel-empty"
            @click.stop="selectFocus"
            @mouseenter="disabledBlur = true"
            @mouseleave="disabledBlur = false"
          >
            <Empty image="outlined" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<style lang="less" scoped>
.slide-enter {
  transform: scale(0);
  opacity: 0;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.slide-enter-active {
  animation-name: slideIn;
  animation-play-state: running;
  @keyframes slideIn {
    0% {
      transform: scaleY(0.8);
      opacity: 0;
    }
    100% {
      transform: scaleY(1);
      opacity: 1;
    }
  }
}
.slide-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.slide-leave-active {
  animation-name: slideOut;
  animation-play-state: running;
  @keyframes slideOut {
    0% {
      transform: scaleY(1);
      opacity: 1;
    }
    100% {
      transform: scaleY(0.8);
      opacity: 0;
    }
  }
}
.select-wrap {
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
    .select-content-container {
      border-color: var(--select-primary-color-hover);
    }
  }
  .select-content-container {
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
    .select-item-hidden {
      visibility: hidden;
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
}
.select-focused:not(.select-disabled) {
  .select-content-container {
    border-color: var(--select-primary-color-focus);
    box-shadow: 0 0 0 2px var(--select-primary-shadow-color);
  }
}
.search-select {
  .select-content-container {
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
  .select-content-container {
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
  .select-content-container {
    padding: 0 11px;
    border-radius: 8px;
    .select-item {
      padding-right: 20px;
    }
  }
}
.select-disabled {
  .select-content-container {
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    user-select: none;
    cursor: not-allowed;
    .select-search .search-input {
      cursor: not-allowed;
    }
  }
}
.select-panel-container {
  position: absolute;
  z-index: 1000;
  padding: 4px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  outline: none;
  cursor: auto;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);

  .select-options-panel {
    .select-option {
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
      background: rgba(0, 0, 0, 0.04);
    }
    .option-selected {
      font-weight: 600;
      background: var(--select-option-bg-color-active);
    }
    .option-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
  .options-panel-empty {
    min-width: 112px;
    padding: 9px 16px;
    .empty-wrap {
      margin-block: 8px;
      :deep(.empty-image-wrap) {
        height: 35px;
      }
    }
  }
}
</style>
