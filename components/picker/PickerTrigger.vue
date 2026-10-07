<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import PickerIcon from './PickerIcon.vue'
import type { PickerIconName } from './icons'
import type { PickerSize, PickerStatus } from './types'
export interface PickerTriggerProps {
  text?: string // 已按展示格式生成的文本
  texts?: [string, string] // 范围形态的两段文本，与 `text` 互斥
  placeholder?: string
  placeholders?: [string, string] // 范围形态的两段提示文字
  range?: boolean // 是否为范围形态（两段输入）
  activeIndex?: 0 | 1 // 范围形态下当前激活的段
  previewIndex?: 0 | 1 | null // 范围形态下当前展示预览文本（非真实值）的段
  size?: PickerSize
  status?: PickerStatus
  bordered?: boolean
  disabled?: boolean
  inputReadOnly?: boolean
  allowClear?: boolean
  open?: boolean // 面板是否展开，决定聚焦态样式
  inputSize?: number // 输入框原生 size 属性（字符数），未传时由浏览器按 20 字符估宽
  icon?: PickerIconName // 默认后缀图标
  suffixIcon?: VNode | (() => VNode) // 自定义后缀图标，优先于 icon
}
const props = withDefaults(defineProps<PickerTriggerProps>(), {
  text: '',
  texts: undefined,
  placeholder: '',
  placeholders: undefined,
  range: false,
  activeIndex: 0,
  previewIndex: null,
  size: 'middle',
  status: undefined,
  bordered: true,
  disabled: false,
  inputReadOnly: false,
  allowClear: true,
  open: false,
  inputSize: undefined,
  icon: 'calendar',
  suffixIcon: undefined
})
const emits = defineEmits<{
  clear: []
  click: [index: 0 | 1] // 点击落在哪一段（范围形态），宿主据此确定展开时的激活段
  arrowChange: [offset: number] // 面板指示箭头相对输入区左边缘的偏移，供宿主定位面板上的箭头
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  sideFocus: [index: 0 | 1] // 范围形态下聚焦到哪一段，宿主据此切换激活段
  textConfirm: [text: string, source: 'enter' | 'blur', index: 0 | 1] // 提交来源：回车 / 失焦，宿主据此决定是否真的提交
}>()
const triggerRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const endInputRef = ref<HTMLInputElement | null>(null)
const inputText = ref('')
const inputTexts = ref<[string, string]>(['', ''])
const startItemRef = ref<HTMLElement | null>(null)
const separatorRef = ref<HTMLElement | null>(null)
const endItemRef = ref<HTMLElement | null>(null)
const activeBarStyle = ref<CSSProperties>({ left: '0px', width: '0px' })
const focused = ref(false) // 输入框是否聚焦：面板收起后仍保留聚焦态样式（与参考实现的 focus 驱动口径一致）
// 输入框内容跟随外部文本，保证受控展示始终与值一致
watch(
  () => props.text,
  (text) => {
    inputText.value = text
  },
  { immediate: true }
)
watch(
  () => props.texts,
  (texts) => {
    inputTexts.value = texts ?? ['', '']
  },
  { immediate: true }
)
/**
 * 按激活段测量下划线
 *
 * 定位基准是触发器根（与参考实现同构）：起点段自输入区左边缘起；终点段自「起点段宽 + 分隔符一半」起
 * （下划线从分隔符中心开始，而非终点段左边缘），宽度取对应段的宽度。
 */
function measureActiveBar() {
  const trigger = triggerRef.value
  const start = startItemRef.value
  const separator = separatorRef.value
  const end = endItemRef.value
  if (!trigger || !start || !separator || !end) {
    return
  }
  const isStartSide = props.activeIndex === 0
  // 输入区左边缘相对触发器 padding box 的偏移（跨过 1px 边框），下划线的 left 由此起算
  const inputOffset = start.getBoundingClientRect().left - trigger.getBoundingClientRect().left - trigger.clientLeft
  activeBarStyle.value = {
    // 终点段自「起点段宽 + 分隔符宽」起算，使下划线左边缘与终点段输入框左边缘对齐
    left: `${inputOffset + (isStartSide ? 0 : start.offsetWidth + separator.offsetWidth)}px`,
    width: `${(isStartSide ? start : end).offsetWidth}px`
  }
  // 面板指示箭头与激活段下划线同源：终点段自「起点段宽 + 分隔符宽」起算，使箭头与下划线、终点段输入框三者左边缘对齐，
  // 不含触发器的内边距与边框（宿主叠加到面板坐标上）
  emits('arrowChange', isStartSide ? 0 : start.offsetWidth + separator.offsetWidth)
}
// 激活段、两段文本与聚焦态都会改变下划线的位置 / 宽度 / 可见性，需等 DOM 更新后再测量
watch(
  () => [props.range, props.activeIndex, props.texts, props.size, props.open, focused.value],
  () => {
    if (props.range) {
      measureActiveBar()
    }
  },
  { flush: 'post', immediate: true }
)
// 挂载后立即测量一次：下划线在展开前就位，展开时只走透明度淡入（与参考实现一致），
// 否则首次展开会出现「自左向右拉长」的宽度过渡
onMounted(() => {
  if (props.range) {
    measureActiveBar()
  }
})
// 清除按钮常驻 DOM（与后缀图标同一槽位、以背景色覆盖），避免悬浮时宽度跳动。
// 是否有值可清由宿主判定后经 allowClear 下发（范围形态下不存在单一文本可供本组件判断）
const showClear = computed(() => props.allowClear && !props.disabled)
function onInput(event: Event) {
  inputText.value = (event.target as HTMLInputElement).value
}
function onRangeInput(event: Event, index: 0 | 1) {
  inputTexts.value[index] = (event.target as HTMLInputElement).value
}
// 提交输入文本时交给宿主解析，随后先回滚为当前合法文本，解析失败即自然保持原值
function onTextSubmit(source: 'enter' | 'blur', index: 0 | 1 = 0) {
  if (props.range) {
    emits('textConfirm', inputTexts.value[index], source, index)
    inputTexts.value[index] = props.texts?.[index] ?? ''
    return
  }
  emits('textConfirm', inputText.value, source, 0)
  inputText.value = props.text
}
function onFocus(event: FocusEvent, index: 0 | 1 = 0) {
  focused.value = true
  if (props.range) {
    emits('sideFocus', index)
  }
  emits('focus', event)
}
function onBlur(event: FocusEvent, index: 0 | 1 = 0) {
  // 焦点只是挪到了触发器内部（范围形态在两段输入框之间切换）时不算失焦，与参考实现的
  // `!isClickOutside(document.activeElement)` 同口径：否则会把「切段」当成手输提交，
  // 两段都有值时随即收起面板，紧接着的那次点击又把它重新展开（观感为面板一闪一现）。
  // 落点优先取 `relatedTarget`（浏览器在失焦那一刻已把 `document.activeElement` 置为 `body`，
  // 判不出落点），拿不到时退回 `activeElement` 兜底
  const nextFocus = (event.relatedTarget as Node | null) ?? document.activeElement
  if (nextFocus && triggerRef.value?.contains(nextFocus)) return
  focused.value = false
  emits('blur', event)
  onTextSubmit('blur', index)
}
/** 聚焦某一段输入框（范围形态按段定位，单段形态忽略下标） */
function focus(index: 0 | 1 = 0) {
  const target = props.range && index === 1 ? endInputRef.value : inputRef.value
  target?.focus()
}
function blur() {
  inputRef.value?.blur()
}
function onClear(event: MouseEvent) {
  event.stopPropagation()
  emits('clear')
}
/** 点击触发器：范围形态按落点属于哪一段上报（单段形态恒为 0），与参考实现的输入框驱动同口径 */
function onTriggerClick(event: MouseEvent) {
  const eventTarget = event.target as Node | null
  const hitEndSide = Boolean(props.range && eventTarget && endItemRef.value?.contains(eventTarget))
  emits('click', hitEndSide ? 1 : 0)
}
defineExpose({ focus, blur })
</script>
<template>
  <div
    ref="triggerRef"
    class="picker-trigger"
    :class="{
      'picker-trigger-small': size === 'small',
      'picker-trigger-large': size === 'large',
      'picker-trigger-focused': open || focused,
      'picker-trigger-disabled': disabled,
      'picker-trigger-borderless': !bordered,
      'picker-trigger-status-error': status === 'error',
      'picker-trigger-status-warning': status === 'warning'
    }"
    @click="onTriggerClick"
  >
    <div class="picker-trigger-input" :class="{ 'picker-trigger-input-placeholder': !range && inputText === '' }">
      <template v-if="range">
        <span
          ref="startItemRef"
          class="picker-trigger-range-item"
          :class="{
            'picker-trigger-range-item-active': activeIndex === 0,
            'picker-trigger-input-placeholder': previewIndex === 0
          }"
        >
          <input
            ref="inputRef"
            class="picker-trigger-input-inner"
            :value="inputTexts[0]"
            :size="inputSize"
            :placeholder="placeholders?.[0] ?? ''"
            :disabled="disabled"
            :readonly="inputReadOnly"
            @input="onRangeInput($event, 0)"
            @focus="onFocus($event, 0)"
            @blur="onBlur($event, 0)"
            @keydown.enter="onTextSubmit('enter', 0)"
          />
        </span>
        <span ref="separatorRef" class="picker-trigger-range-separator">
          <slot name="separator" />
        </span>
        <span
          ref="endItemRef"
          class="picker-trigger-range-item"
          :class="{
            'picker-trigger-range-item-active': activeIndex === 1,
            'picker-trigger-input-placeholder': previewIndex === 1
          }"
        >
          <input
            ref="endInputRef"
            class="picker-trigger-input-inner"
            :value="inputTexts[1]"
            :size="inputSize"
            :placeholder="placeholders?.[1] ?? ''"
            :disabled="disabled"
            :readonly="inputReadOnly"
            @input="onRangeInput($event, 1)"
            @focus="onFocus($event, 1)"
            @blur="onBlur($event, 1)"
            @keydown.enter="onTextSubmit('enter', 1)"
          />
        </span>
      </template>
      <input
        v-else
        ref="inputRef"
        class="picker-trigger-input-inner"
        :value="inputText"
        :size="inputSize"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="inputReadOnly"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="onTextSubmit('enter')"
      />
      <span class="picker-trigger-suffix">
        <slot name="suffix">
          <component :is="suffixIcon" v-if="suffixIcon" />
          <PickerIcon v-else :name="icon" />
        </slot>
      </span>
      <span v-if="showClear" class="picker-trigger-clear" role="button" aria-label="清除" @click="onClear">
        <PickerIcon name="close-circle" />
      </span>
    </div>
    <span v-if="range" class="picker-trigger-range-active-bar" :style="activeBarStyle" />
  </div>
</template>
<style lang="less" scoped>
.picker-trigger {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  padding: 4px 11px;
  background: #fff;
  line-height: 1;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  // 内边距一并过渡：尺寸切换时内边距（0 / 4px / 6.5px）不参与过渡会让整块在首帧瞬跳（参考实现即如此，此处优化为全程平滑）
  transition:
    border 0.2s,
    box-shadow 0.2s,
    padding 0.2s;
  // 指针样式交还浏览器默认（与参考实现一致）：触发器空白区为箭头，文本输入区为文本光标
  cursor: auto;
  &:hover {
    border-color: var(--picker-primary-color-hover, #4096ff);
  }
  &.picker-trigger-focused {
    border-color: var(--picker-primary-color, #1677ff);
    box-shadow: 0 0 0 2px var(--picker-primary-shadow-color, rgba(5, 145, 255, 0.1));
  }
  &.picker-trigger-disabled {
    background: rgba(0, 0, 0, 0.04);
    cursor: not-allowed;
    &:hover {
      border-color: #d9d9d9;
    }
    .picker-trigger-input-inner,
    .picker-trigger-suffix {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
  &.picker-trigger-borderless {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  &.picker-trigger-status-error {
    border-color: #ff4d4f;
    &:hover {
      border-color: #ff4d4f;
    }
    &.picker-trigger-focused {
      border-color: #ff4d4f;
      box-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);
    }
  }
  &.picker-trigger-status-warning {
    border-color: #faad14;
    &:hover {
      border-color: #faad14;
    }
    &.picker-trigger-focused {
      border-color: #faad14;
      box-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);
    }
  }
  .picker-trigger-input {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    .picker-trigger-input-inner {
      flex: auto;
      min-width: 1px;
      height: auto;
      padding: 0;
      font-family: inherit;
      font-size: 14px;
      line-height: 1.5714285714285714;
      color: rgba(0, 0, 0, 0.88);
      background: transparent;
      border: 0;
      outline: none;
      // 尺寸切换时宽度 / 行高 / 字号随过渡变化（与参考实现一致）
      transition: all 0.2s;
      &::placeholder {
        color: rgba(0, 0, 0, 0.25);
      }
      &:disabled {
        color: rgba(0, 0, 0, 0.25);
        background: transparent;
      }
    }
  }
  // 展示预览文本（悬浮面板日期时该段的临时值）的段取提示色，与参考实现的 `-input-placeholder` 同口径
  .picker-trigger-input-placeholder .picker-trigger-input-inner {
    color: rgba(0, 0, 0, 0.25);
  }
  // 范围形态：两段输入等宽并排，段间为分隔箭头，两段可分别聚焦
  .picker-trigger-range-item {
    display: inline-flex;
    flex: auto;
    min-width: 0;
    .picker-trigger-input-inner {
      width: 100%;
    }
  }
  .picker-trigger-range-separator {
    display: flex;
    flex: none;
    align-items: center;
    // 图标 16px + 左右各 8px 内边距：两段之间的间距因此为 32px（与参考实现逐值一致）
    padding: 0 8px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.25);
    line-height: 1;
    // 段间距随尺寸切换过渡，与输入框的过渡保持同一节奏
    transition: all 0.2s;
  }
  // 激活段下划线：位置与宽度按激活段测量，仅在聚焦 / 展开时可见
  // 定位基准取触发器根（与参考实现同构）：bottom 贴住底边框，而非浮在输入区下方
  .picker-trigger-range-active-bar {
    position: absolute;
    bottom: -1px;
    height: 2px;
    background: var(--picker-primary-color, #1677ff);
    opacity: 0;
    transition:
      all 0.3s ease-out,
      opacity 0.2s;
    pointer-events: none;
  }
  &.picker-trigger-focused .picker-trigger-range-active-bar {
    opacity: 1;
  }
  // 清除按钮与后缀图标同槽位：常驻 DOM 且不占流，以外底色盖住后缀，避免悬浮时触发器宽度跳动
  .picker-trigger-clear {
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    color: rgba(0, 0, 0, 0.25);
    line-height: 1;
    background: #fff;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0;
    transition:
      opacity 0.2s,
      color 0.2s;
    &:hover {
      color: rgba(0, 0, 0, 0.45);
    }
  }
  &:hover .picker-trigger-clear {
    opacity: 1;
  }
  .picker-trigger-suffix {
    display: flex;
    flex: none;
    align-self: center;
    margin-left: 4px;
    color: rgba(0, 0, 0, 0.25);
    line-height: 1;
    pointer-events: none;
  }
}
.picker-trigger-small {
  padding: 0 7px;
}
.picker-trigger-large {
  padding: 6.5px 11px;
  .picker-trigger-input .picker-trigger-input-inner {
    font-size: 16px;
  }
}
</style>
