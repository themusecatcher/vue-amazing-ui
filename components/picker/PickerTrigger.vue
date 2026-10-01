<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { VNode } from 'vue'
import PickerIcon from './PickerIcon.vue'
import type { PickerIconName } from './icons'
import type { PickerSize, PickerStatus } from './types'
export interface PickerTriggerProps {
  text?: string // 已按展示格式生成的文本
  placeholder?: string
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
  placeholder: '',
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
  click: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  textConfirm: [text: string, source: 'enter' | 'blur'] // 提交来源：回车 / 失焦，宿主据此决定是否真的提交
}>()
const inputRef = ref<HTMLInputElement | null>(null)
const inputText = ref('')
const focused = ref(false) // 输入框是否聚焦：面板收起后仍保留聚焦态样式（与参考实现的 focus 驱动口径一致）
// 输入框内容跟随外部文本，保证受控展示始终与值一致
watch(
  () => props.text,
  (text) => {
    inputText.value = text
  },
  { immediate: true }
)
// 清除按钮常驻 DOM（与后缀图标同一槽位、以背景色覆盖），避免悬浮时宽度跳动
const showClear = computed(() => {
  return props.allowClear && !props.disabled && inputText.value !== ''
})
function onInput(event: Event) {
  inputText.value = (event.target as HTMLInputElement).value
}
// 提交输入文本时交给宿主解析，随后先回滚为当前合法文本，解析失败即自然保持原值
function onTextSubmit(source: 'enter' | 'blur') {
  emits('textConfirm', inputText.value, source)
  inputText.value = props.text
}
function onFocus(event: FocusEvent) {
  focused.value = true
  emits('focus', event)
}
function onBlur(event: FocusEvent) {
  focused.value = false
  emits('blur', event)
  onTextSubmit('blur')
}
function focus() {
  inputRef.value?.focus()
}
function blur() {
  inputRef.value?.blur()
}
function onClear(event: MouseEvent) {
  event.stopPropagation()
  emits('clear')
}
defineExpose({ focus, blur })
</script>
<template>
  <div
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
    @click="emits('click')"
  >
    <div class="picker-trigger-input" :class="{ 'picker-trigger-input-placeholder': inputText === '' }">
      <input
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
