<script setup lang="ts">
import { ref, computed, watchEffect, watch, nextTick, onMounted, onBeforeUnmount, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import Empty from 'components/empty'
import Scrollbar from 'components/scrollbar'
import { useEventListener, useMutationObserver, useInject, useOptionsSupported } from 'components/utils'
export interface Option {
  disabled?: boolean // 是否禁用
  value: string | number // 唯一的 value 值
  label: string // 显示的 label 值
}
export interface GroupOption {
  children?: (string | number | Option)[] // 子选项
  label: string // label 文本
  value: string | number // value 值
  type?: 'group' // 选项的类型
}
export interface Props {
  allowClear?: boolean // 是否支持清除
  bordered?: boolean // 是否有边框
  disabled?: boolean // 是否禁用
  placeholder?: string // 默认占位文本
  to?: string | HTMLElement | false // 下拉面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  options?: (string | number | Option | GroupOption)[] // 自动完成的数据源
  value: string // (v-model) 当前输入的值
  size?: 'small' | 'middle' | 'large' // 自动完成大小
  status?: 'error' | 'warning' // 设置校验状态
  /*
    根据输入项进行筛选，默认为 false 时不筛选，显示全部数据源，由用户在 search 事件中远程更新 options
    当其为 true 时，筛选每个选项的文本字段 label 是否包含输入项，包含返回 true，反之返回 false
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filterOption?: boolean | Function // 过滤条件函数
}
const props = withDefaults(defineProps<Props>(), {
  allowClear: false,
  bordered: true,
  disabled: false,
  placeholder: undefined,
  to: 'body',
  options: () => [],
  value: undefined,
  size: 'middle',
  status: undefined,
  filterOption: false
})
const emit = defineEmits(['update:value', 'search', 'select', 'change', 'focus', 'blur', 'clear', 'openChange'])
const slots = useSlots()
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const inputRef = ref<HTMLInputElement | null>(null) // input 元素引用
const customInputRef = ref<HTMLElement | null>(null) // 自定义输入组件容器引用
const disabledBlur = ref<boolean>(false) // 是否禁用 input 标签的 blur 事件
const hoverValue = ref<string | number | null>(null) // 鼠标悬浮项的 value 值
const showOptions = ref<boolean>(false) // 显示隐藏下拉面板
const showClear = ref<boolean>(false) // 清除图标显隐
const focused = ref<boolean>(false) // 自动完成是否聚焦
const { colorPalettes, shadowColor } = useInject('AutoComplete') // 主题色注入
const scrollTarget = ref<HTMLElement | null>(null) // 最近的可滚动父元素
const scrollTop = ref<number>(0) // scrollTarget 的滚动位置
const panelOffset = ref<number>(0) // 下拉面板相对于内容的垂直偏移距离
const panelPlace = ref<'bottom' | 'top'>('bottom') // 下拉面板位置
const contentRef = ref<HTMLElement | null>(null) // 内容模板引用
const contentRect = ref<DOMRect>() // 内容元素的大小及其相对于视口的位置
const positionedContainer = ref<HTMLElement | null>(null) // 下拉面板相对定位的容器元素
const positionedContainerRect = ref<DOMRect>() // positionedContainer 元素的大小及其相对于视口的位置
const panelRef = ref<HTMLElement | null>(null) // 下拉面板模板引用
const panelHeight = ref<number>() // 下拉面板的高度
const viewportWidth = ref<number>(document.documentElement.clientWidth) // 视口宽度(不包括滚动条)
const viewportHeight = ref<number>(document.documentElement.clientHeight) // 视口高度(不包括滚动条)
const { isSupported: passiveSupported } = useOptionsSupported('passive')
const autoCompleteHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 32,
    large: 40
  }
  return `${heightMap[props.size]}px`
})
const optionsStyle = computed(() => {
  const style: CSSProperties = {
    maxHeight: '256px'
  }
  return style
})
// 判断是否为分组项
function isGroup(item: string | number | Option | GroupOption): item is GroupOption {
  return typeof item === 'object' && (item as GroupOption).type === 'group'
}
// 获取叶子选项的 value 值
function getValue(item: string | number | Option): string | number {
  if (typeof item === 'string' || typeof item === 'number') {
    return item
  }
  return item.value
}
// 获取叶子选项的 label 文本，缺失时兜底 value 的字符串形式
function getLabel(item: string | number | Option): string {
  if (typeof item === 'string' || typeof item === 'number') {
    return String(item)
  }
  return item.label ?? String(item.value)
}
// 判断叶子选项是否禁用
function isDisabled(item: string | number | Option): boolean | undefined {
  if (typeof item === 'string' || typeof item === 'number') {
    return false
  }
  return item.disabled
}
// 选项过滤是否匹配
function matchOption(item: string | number | Option): boolean {
  const label = getLabel(item)
  if (typeof props.filterOption === 'function') {
    const option = typeof item === 'object' ? item : { value: getValue(item), label }
    return Boolean(props.filterOption(props.value, option))
  }
  return label.includes(props.value)
}
// #option 插槽参数，字符串/数字包装为 Option 结构，对象透传原始数据（保留自定义字段）
function childSlotProps(item: string | number | Option): Option {
  if (typeof item === 'string' || typeof item === 'number') {
    return { value: item, label: String(item) }
  }
  return item
}
// 过滤后的选项数据（保留分组结构，过滤后空组剔除）
const filteredData = computed<(string | number | Option | GroupOption)[]>(() => {
  if (props.filterOption === false) {
    return props.options
  }
  const result: (string | number | Option | GroupOption)[] = []
  props.options.forEach((item) => {
    if (isGroup(item)) {
      const children = (item.children ?? []).filter(matchOption)
      if (children.length) {
        result.push({ ...item, children })
      }
    } else if (matchOption(item)) {
      result.push(item)
    }
  })
  return result
})
// 展平的叶子选项列表，用于 hover 高亮和空态判断
const flattenOptions = computed<Option[]>(() => {
  const result: Option[] = []
  filteredData.value.forEach((item) => {
    if (isGroup(item)) {
      item.children?.forEach((child) => {
        result.push({ value: getValue(child), label: getLabel(child), disabled: isDisabled(child) })
      })
    } else {
      result.push({ value: getValue(item), label: getLabel(item), disabled: isDisabled(item) })
    }
  })
  return result
})
const panelPlacement = computed(() => {
  const contentTop = (contentRect.value as DOMRect)?.top ?? 0
  const containerTop = (positionedContainerRect.value as DOMRect)?.top ?? 0
  const offsetTop = contentTop - containerTop
  const contentBottom = (contentRect.value as DOMRect)?.bottom ?? 0
  const containerBottom = (positionedContainerRect.value as DOMRect)?.bottom ?? 0
  const offsetBottom = containerBottom - contentBottom
  const contentLeft = (contentRect.value as DOMRect)?.left ?? 0
  const containerLeft = (positionedContainerRect.value as DOMRect)?.left ?? 0
  const offsetLeft = contentLeft - containerLeft
  const panelWidth = (contentRect.value as DOMRect)?.width ?? 0
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
watch(showOptions, (to) => {
  if (to && !initialDisplay.value) {
    initialDisplay.value = true
  }
})
watch(showOptions, (to) => {
  emit('openChange', to)
})
watchEffect(() => {
  const firstEnabled = flattenOptions.value.find((option) => !option.disabled)
  hoverValue.value = firstEnabled ? firstEnabled.value : null
})
watchEffect(() => {
  if (focused.value) {
    showOptions.value = true
  }
})
onMounted(() => {
  observeScroll()
  // 挂载后同步一次 value 到自定义输入组件插槽元素
  if (slots.default) {
    const el = getCustomInputEl()
    if (el && el.value !== props.value) {
      el.value = props.value ?? ''
    }
  }
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
  let parentElement = panelRef.value?.parentElement
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
  scrollTarget.value = getScrollParent(contentRef.value)
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
  contentRect.value = contentRef.value?.getBoundingClientRect() as DOMRect
  panelHeight.value = panelRef.value?.offsetHeight
  panelOffset.value = contentRect.value.height + 4
  panelPlace.value = getPlacement()
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
  const { top, bottom } = contentRect.value as DOMRect // 内容元素各边缘相对于浏览器视口的位置(不包括滚动条)
  const { top: targetTop, bottom: targetBottom } = getShelterRect() // 滚动元素或视口各边缘相对于浏览器视口的位置(不包括滚动条)
  const topDistance = top - targetTop // 内容元素上边缘距离滚动元素上边缘的距离
  const bottomDistance = targetBottom - bottom // 内容元素下边缘距离动元素下边缘的距离
  return findPlace('bottom', [])
  // 查询满足条件的 place，如果没有，则返回默认值
  function findPlace(place: string, disabledPlaces: string[]): 'bottom' | 'top' {
    if (place === 'bottom') {
      if (!disabledPlaces.includes('bottom')) {
        if (bottomDistance < (panelHeight.value as number) + 4) {
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
        if (topDistance < (panelHeight.value as number) + 4) {
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
    return 'bottom'
  }
}
function openPanel(): void {
  if (!props.disabled) {
    showOptions.value = true
    getPosition()
  }
}
function onInput(e: Event): void {
  const input = (e.target as HTMLInputElement)?.value ?? ''
  emit('update:value', input)
  emit('search', input)
  openPanel()
}
function onFocus(): void {
  focused.value = true
  openPanel()
  emit('focus')
}
function onBlur(): void {
  focused.value = false
  showOptions.value = false
  emit('blur')
}
function onClick(): void {
  openPanel()
}
function onEnter(): void {
  disabledBlur.value = true
  if (props.allowClear && props.value) {
    showClear.value = true
  }
}
function onLeave(): void {
  disabledBlur.value = false
  if (props.allowClear && showClear.value) {
    showClear.value = false
  }
}
function onHover(value: string | number, disabled: boolean | undefined): void {
  disabledBlur.value = Boolean(disabled)
  hoverValue.value = value
}
function onSelectOption(item: string | number | Option): void {
  const value = getValue(item)
  emit('update:value', String(value))
  emit('select', value, childSlotProps(item))
  emit('change', value)
  showOptions.value = false
  // select 后保持 input 失焦，避免 watchEffect 重新打开面板
  focused.value = false
  blurInput()
}
function onClear(): void {
  if (focused.value) {
    inputFocus()
  }
  showClear.value = false
  emit('update:value', '')
  emit('change', '')
  emit('clear')
  showOptions.value = false
}
function inputFocus(): void {
  const customEl = getCustomInputEl()
  if (customEl) {
    customEl.focus()
  } else {
    inputRef.value?.focus()
  }
}
function blurInput(): void {
  const customEl = getCustomInputEl()
  if (customEl) {
    customEl.blur()
  } else {
    inputRef.value?.blur()
  }
}
// 获取自定义输入组件插槽内的 input/textarea 元素
function getCustomInputEl(): HTMLInputElement | HTMLTextAreaElement | null {
  return customInputRef.value?.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null
}
// 自定义输入组件模式下，同步外部 value 到插槽元素
watch(
  () => props.value,
  (val) => {
    const el = getCustomInputEl()
    if (el && el.value !== val) {
      el.value = val ?? ''
    }
  },
  { immediate: true }
)
</script>
<template>
  <div
    class="auto-complete-wrap"
    :class="{
      'auto-complete-focused': focused,
      'auto-complete-small': size === 'small',
      'auto-complete-large': size === 'large',
      'auto-complete-disabled': disabled,
      'auto-complete-borderless': !bordered,
      'auto-complete-custom': slots.default,
      'auto-complete-status-error': status === 'error',
      'auto-complete-status-warning': status === 'warning'
    }"
    :style="`
      --auto-complete-height: ${autoCompleteHeight};
      --auto-complete-primary-color-hover: ${colorPalettes[4]};
      --auto-complete-primary-color-focus: ${colorPalettes[4]};
      --auto-complete-primary-shadow-color: ${shadowColor};
    `"
  >
    <div ref="contentRef" class="auto-complete-content" @mouseenter="onEnter" @mouseleave="onLeave">
      <div
        v-if="slots.default"
        ref="customInputRef"
        class="auto-complete-custom-input"
        @input="onInput"
        @focusin="!disabled ? onFocus() : () => false"
        @focusout="!disabledBlur && !disabled ? onBlur() : () => false"
        @click="onClick"
      >
        <slot />
      </div>
      <input
        v-else
        ref="inputRef"
        class="auto-complete-input"
        type="text"
        autocomplete="off"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="value"
        @input="onInput"
        @blur="!disabledBlur && !disabled ? onBlur() : () => false"
        @focus="!disabled ? onFocus() : () => false"
        @click="onClick"
      />
      <span v-if="slots.clearIcon" class="clear-svg" :class="{ 'show-svg': showClear }" @click.stop="onClear">
        <slot name="clearIcon" :clear-icon="onClear" />
      </span>
      <svg
        v-else
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
          ref="panelRef"
          class="auto-complete-panel"
          :style="{
            ...panelPlacement,
            '--auto-complete-option-bg-color-active': colorPalettes[0]
          }"
        >
          <Scrollbar
            v-show="flattenOptions.length"
            :style="{ ...optionsStyle, '--scrollbar-rail-vertical-right': '2px 0 2px auto' }"
            class="auto-complete-options"
            @click.stop="inputFocus"
            @mouseenter="disabledBlur = true"
            @mouseleave="disabledBlur = false"
          >
            <template v-for="(item, index) in filteredData" :key="index">
              <template v-if="isGroup(item)">
                <p class="auto-complete-group-title">{{ item.label }}</p>
                <p
                  v-for="(child, childIndex) in item.children"
                  :key="`${index}-${childIndex}`"
                  :class="[
                    'auto-complete-option',
                    {
                      'option-hover': !isDisabled(child) && getValue(child) === hoverValue,
                      'option-disabled': isDisabled(child)
                    }
                  ]"
                  :title="getLabel(child)"
                  @mouseenter="onHover(getValue(child), isDisabled(child))"
                  @click.stop="isDisabled(child) ? inputFocus() : onSelectOption(child)"
                >
                  <slot v-if="slots.option" name="option" v-bind="childSlotProps(child)" />
                  <template v-else>{{ getLabel(child) }}</template>
                </p>
              </template>
              <p
                v-else
                :class="[
                  'auto-complete-option',
                  {
                    'option-hover': !isDisabled(item) && getValue(item) === hoverValue,
                    'option-disabled': isDisabled(item)
                  }
                ]"
                :title="getLabel(item)"
                @mouseenter="onHover(getValue(item), isDisabled(item))"
                @click.stop="isDisabled(item) ? inputFocus() : onSelectOption(item)"
              >
                <slot v-if="slots.option" name="option" v-bind="childSlotProps(item)" />
                <template v-else>{{ getLabel(item) }}</template>
              </p>
            </template>
          </Scrollbar>
          <div
            v-show="!flattenOptions.length"
            class="auto-complete-options options-empty"
            @click.stop="inputFocus"
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
.auto-complete-wrap {
  position: relative;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.88);
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  &:not(.auto-complete-disabled):hover {
    .auto-complete-content {
      border-color: var(--auto-complete-primary-color-hover);
    }
  }
  .auto-complete-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-width: 120px;
    padding: 0 11px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: #fff;
    height: var(--auto-complete-height);
    outline: none;
    cursor: text;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    .auto-complete-input {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      appearance: none;
      font-size: inherit;
      color: inherit;
      &::placeholder {
        color: rgba(0, 0, 0, 0.25);
      }
    }
    .clear-svg {
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
.auto-complete-focused:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: var(--auto-complete-primary-color-focus);
    box-shadow: 0 0 0 2px var(--auto-complete-primary-shadow-color);
  }
}
.auto-complete-small {
  .auto-complete-content {
    padding: 0 7px;
    border-radius: 4px;
    .clear-svg {
      right: 7px;
    }
  }
}
.auto-complete-large {
  font-size: 16px;
  .auto-complete-content {
    border-radius: 8px;
  }
}
.auto-complete-borderless:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: transparent;
  }
  &:hover .auto-complete-content {
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &.auto-complete-focused .auto-complete-content {
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.04);
    box-shadow: none;
  }
}
.auto-complete-status-error:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: #ff4d4f;
  }
  &:hover .auto-complete-content {
    border-color: #ff7875;
  }
  &.auto-complete-focused .auto-complete-content {
    border-color: #ff4d4f;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
  }
}
.auto-complete-status-warning:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: #faad14;
  }
  &:hover .auto-complete-content {
    border-color: #ffc53d;
  }
  &.auto-complete-focused .auto-complete-content {
    border-color: #faad14;
    box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);
  }
}
.auto-complete-custom {
  .auto-complete-content {
    min-width: 0;
    padding: 0;
    border: none;
    background: transparent;
    height: auto;
  }
  .auto-complete-custom-input {
    width: 100%;
  }
}
.auto-complete-disabled {
  .auto-complete-content {
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    user-select: none;
    cursor: not-allowed;
    .auto-complete-input {
      cursor: not-allowed;
    }
  }
}
.auto-complete-panel {
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
  .auto-complete-options {
    .auto-complete-group-title {
      padding: 5px 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      line-height: 1.5714285714285714;
      cursor: default;
    }
    .auto-complete-option {
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
    .option-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
  .options-empty {
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
