<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
export interface Props {
  width?: string | number // 文本域宽度，单位 px
  allowClear?: boolean // 可以点击清除图标删除内容
  autoSize?: boolean | { minRows?: number; maxRows?: number } // 自适应内容高度
  disabled?: boolean // 是否禁用
  placeholder?: string // 文本域输入的占位符
  maxlength?: number // 文字最大长度
  showCount?: boolean // 是否展示字数
  value?: string // (v-model) 文本域内容
  valueModifiers?: object // 用于访问组件的 v-model 上添加的修饰符
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  allowClear: false,
  autoSize: false,
  disabled: false,
  placeholder: undefined,
  maxlength: undefined,
  showCount: false,
  value: '',
  valueModifiers: () => ({})
})
const textareaRef = ref<HTMLElement | null>(null) // textarea 元素引用
const areaHeight = ref<number>(32)
const textareaWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const autoSizeStyle = computed(() => {
  if (typeof props.autoSize === 'object') {
    const style: { 'min-height'?: string; 'max-height'?: string; [propName: string]: any } = {
      height: `${areaHeight.value}px`,
      resize: 'none'
    }
    if ('minRows' in props.autoSize) {
      style['min-height'] = (props.autoSize.minRows as number) * 22 + 10 + 'px'
    }
    if ('maxRows' in props.autoSize) {
      style['max-height'] = (props.autoSize.maxRows as number) * 22 + 10 + 'px'
    }
    return style
  }
  if (typeof props.autoSize === 'boolean') {
    if (props.autoSize) {
      return {
        height: `${areaHeight.value}px`,
        resize: 'none'
      }
    }
    return {}
  }
})
const showClear = computed(() => {
  return !props.disabled && props.allowClear && props.value
})
const showCountNum = computed(() => {
  if (props.maxlength) {
    return `${props.value.length} / ${props.maxlength}`
  }
  return props.value.length
})
const lazyTextarea = computed(() => {
  return 'lazy' in props.valueModifiers
})
watch(
  () => props.value,
  async () => {
    if (JSON.stringify(autoSizeStyle.value) !== '{}') {
      areaHeight.value = 32
      await nextTick()
      getAreaHeight()
    }
  },
  {
    flush: 'post'
  }
)
onMounted(() => {
  getAreaHeight()
})
function getAreaHeight(): void {
  areaHeight.value = (textareaRef.value as HTMLElement).scrollHeight + 2
}
const emits = defineEmits(['update:value', 'change', 'enter'])
function onInput(e: Event): void {
  const target = e.target as HTMLInputElement
  if (!lazyTextarea.value) {
    emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
    emits('change', e)
  }
}
function onChange(e: Event): void {
  const target = e.target as HTMLInputElement
  if (target.value !== props.value) {
    emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
    emits('change', e)
  }
}
function onEnter(e: KeyboardEvent): void {
  emits('enter', e)
}
function onClear(): void {
  emits('update:value', '')
  textareaRef.value?.focus()
}
</script>
<template>
  <div
    class="m-textarea"
    :class="{ 'show-count': showCount }"
    :style="`
      --textarea-width: ${textareaWidth};
      --textarea-primary-color-hover: #4096ff;
      --textarea-primary-color-focus: #4096ff;
      --textarea-primary-shadow-color: rgba(5, 145, 255, 0.1);
    `"
    :data-count="showCountNum"
  >
    <textarea
      ref="textareaRef"
      type="hidden"
      class="textarea-item"
      :class="{ 'clear-class': showClear, 'textarea-disabled': disabled }"
      :style="autoSizeStyle"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
      @keydown.enter="onEnter"
    />
    <svg
      v-if="showClear"
      class="clear-svg"
      @click="onClear"
      focusable="false"
      data-icon="close-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      viewBox="64 64 896 896"
    >
      <path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
      ></path>
    </svg>
  </div>
</template>
<style lang="less" scoped>
.m-textarea {
  position: relative;
  display: inline-block;
  width: var(--textarea-width);
  .textarea-item {
    width: 100%;
    min-width: 0;
    min-height: 32px;
    max-width: 100%;
    height: auto;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    transition:
      all 0.3s,
      height 0s;
    resize: vertical;
    position: relative;
    z-index: 9;
    display: inline-block;
    vertical-align: bottom;
    text-overflow: ellipsis;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    outline: none;
    &:hover {
      border-color: var(--textarea-primary-color-hover);
      z-index: 1;
    }
    &:focus-within {
      border-color: var(--textarea-primary-color-focus);
      box-shadow: 0 0 0 2px var(--textarea-primary-shadow-color);
      outline: 0;
    }
  }
  .clear-class {
    padding-right: 24px;
  }
  textarea:disabled {
    color: rgba(0, 0, 0, 0.25);
  }
  textarea::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  textarea:-moz-placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  textarea::-moz-placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  textarea:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  .clear-svg {
    position: absolute;
    top: 9px;
    right: 8px;
    z-index: 99;
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.25);
    fill: currentColor;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .textarea-disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: rgba(0, 0, 0, 0.04);
    cursor: not-allowed;
    &:hover {
      border-color: #d9d9d9;
    }
    &:focus-within {
      border-color: #d9d9d9;
      box-shadow: none;
    }
  }
}
.show-count {
  &::after {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    white-space: nowrap;
    content: attr(data-count);
    pointer-events: none;
    float: right;
  }
}
</style>
