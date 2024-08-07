<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
import { ref, computed, watch, onMounted, nextTick } from 'vue'
interface Props {
  width?: string | number // 文本域宽度，单位 px
  allowClear?: boolean // 可以点击清除图标删除内容
  autoSize?: boolean | { minRows?: number; maxRows?: number } // 自适应内容高度
  disabled?: boolean // 是否禁用
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
  maxlength: undefined,
  showCount: false,
  value: '',
  valueModifiers: () => ({})
})
const areaWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const autoSizeProperty = computed(() => {
  if (typeof props.autoSize === 'object') {
    const style: { 'min-height'?: string; 'max-height'?: string; [propName: string]: any } = {
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
        'max-height': '9000000000000000px',
        resize: 'none'
      }
    }
    return {}
  }
})
const showCountNum = computed(() => {
  if (props.maxlength) {
    return props.value.length + ' / ' + props.maxlength
  }
  return props.value.length
})
const lazyTextarea = computed(() => {
  return 'lazy' in props.valueModifiers
})
watch(
  () => props.value,
  () => {
    if (JSON.stringify(autoSizeProperty.value) !== '{}') {
      areaHeight.value = 32
      nextTick(() => {
        getAreaHeight()
      })
    }
  },
  {
    flush: 'post'
  }
)
const textarea = ref()
const areaHeight = ref(32)
onMounted(() => {
  getAreaHeight()
})
function getAreaHeight() {
  areaHeight.value = textarea.value.scrollHeight + 2
}
const emits = defineEmits(['update:value', 'change', 'enter'])
function onInput(e: InputEvent) {
  if (!lazyTextarea.value) {
    emits('update:value', (e.target as HTMLInputElement).value)
    emits('change', e)
  }
}
function onChange(e: InputEvent) {
  if (lazyTextarea.value) {
    emits('update:value', (e.target as HTMLInputElement).value)
    emits('change', e)
  }
}
function onKeyboard(e: KeyboardEvent) {
  // e.preventDefault() // 消除enter键换行
  emits('enter', e)
}
function onClear() {
  emits('update:value', '')
  textarea.value.focus()
}
</script>
<template>
  <div
    class="m-textarea"
    :class="{ 'show-count': showCount }"
    :style="`width: ${areaWidth};`"
    :data-count="showCountNum"
  >
    <textarea
      ref="textarea"
      type="hidden"
      class="u-textarea"
      :class="{ 'textarea-disabled': disabled }"
      :style="[`height: ${autoSize ? areaHeight : ''}px`, autoSizeProperty]"
      :value="value"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
      @keydown.enter.prevent="onKeyboard"
      v-bind="$attrs"
    />
    <span class="m-clear" v-if="!disabled && allowClear && value" @click="onClear">
      <svg
        class="u-clear"
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
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-textarea {
  position: relative;
  display: inline-block;
  .u-textarea {
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
    display: inline-block;
    vertical-align: bottom;
    text-overflow: ellipsis;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    outline: none;
    &:hover {
      border-color: #4096ff;
      border-inline-end-width: 1px;
      z-index: 1;
    }
    &:focus-within {
      border-color: #4096ff;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      border-inline-end-width: 1px;
      outline: 0;
    }
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
  .m-clear {
    position: absolute;
    inset-block-start: 8px;
    inset-inline-end: 8px;
    z-index: 1;
    display: inline-block;
    line-height: 0;
    .u-clear {
      display: inline-block;
      fill: rgba(0, 0, 0, 0.25);
      font-size: 12px;
      line-height: 1;
      vertical-align: -1px;
      cursor: pointer;
      transition: color 0.3s;
      transition: fill 0.3s;
      &:hover {
        fill: rgba(0, 0, 0, 0.45);
      }
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
    color: rgba(0, 0, 0, 0.45);
    white-space: nowrap;
    content: attr(data-count);
    pointer-events: none;
    float: right;
  }
}
</style>
