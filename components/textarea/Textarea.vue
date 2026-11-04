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
  defaultValue?: string // 非受控初始值，未绑 v-model:value 时生效
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
  value: undefined,
  defaultValue: undefined,
  valueModifiers: () => ({})
})
const textareaRef = ref<HTMLElement | null>(null) // textarea 元素引用
const isComposing = ref<boolean>(false) // 是否正在使用文本合成系统输入中
// 渲染镜像：唯一用途是给模板 :value 提供值，必须无条件追随 DOM（落后一次就会被重渲染写回旧值）
const innerValue = ref<string>(props.defaultValue ?? '')
// 字数计数：合成期冻结，仅供展示，不参与写入判定、不上报
const countValue = ref<string>(props.defaultValue ?? '')
const areaHeight = ref<number>(32)
const emits = defineEmits(['update:value', 'compositionstart', 'compositionend', 'change', 'enter', 'focus', 'blur'])
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
      style['min-height'] = `${(props.autoSize.minRows as number) * 22 + 10}px`
    }
    if ('maxRows' in props.autoSize) {
      style['max-height'] = `${(props.autoSize.maxRows as number) * 22 + 10}px`
    }
    return style
  }
  if (typeof props.autoSize === 'boolean' && props.autoSize) {
    return {
      height: `${areaHeight.value}px`,
      resize: 'none'
    }
  }
  return {}
})
const showClear = computed(() => {
  return !props.disabled && props.allowClear && innerValue.value
})
const showCountNum = computed(() => {
  if (props.maxlength) {
    return `${countValue.value ? countValue.value.length : 0} / ${props.maxlength}`
  }
  return countValue.value ? countValue.value.length : 0
})
const lazyTextarea = computed(() => {
  return 'lazy' in props.valueModifiers
})
watch(
  () => props.value,
  async (to) => {
    // 非受控（父未传值）：保留 defaultValue 与用户输入，只跳过值同步，高度重算照常执行
    if (to !== undefined) {
      innerValue.value = to
      countValue.value = to
    }
    if (JSON.stringify(autoSizeStyle.value) !== '{}') {
      areaHeight.value = 32
      await nextTick()
      getAreaHeight()
    }
  },
  {
    immediate: true,
    flush: 'post'
  }
)
onMounted(() => {
  getAreaHeight()
})
function getAreaHeight(): void {
  // SSR（Node）下模板引用为空，判空后再读取
  if (!textareaRef.value) {
    return
  }
  areaHeight.value = textareaRef.value.scrollHeight + 2
}
// 文本合成系统即输入法编辑器开始新的输入合成时会触发
function onCompositionStart(e: CompositionEvent): void {
  isComposing.value = true
  emits('compositionstart', e)
}
// 当文本段落的组成完成或取消时触发 (具有特殊字符的触发，需要一系列键和其他输入，如语音识别或移动中的字词建议)
function onCompositionEnd(e: CompositionEvent): void {
  isComposing.value = false
  const target = e.target as HTMLInputElement | null
  // 选词后 DOM 已是最终文本：镜像与计数都要同步（只同步计数的话，镜像仍停在拼音上）
  if (target) {
    innerValue.value = target.value
    countValue.value = target.value
  }
  emits('compositionend', e)
  const changeEvent = new Event('change')
  e.target?.dispatchEvent(changeEvent)
}
function onInput(e: Event): void {
  const target = e.target as HTMLInputElement
  // 含合成期间的文本也要回写镜像，否则任一次重渲染都会把 DOM 值写回旧值
  innerValue.value = target.value
  // 非受控时高度只能在这里重算：watch(props.value) 不会被触发，autoSize 将不随内容长高
  if (props.autoSize) getAreaHeight() // 未开 autoSize 时免去每键一次强制布局读取
  if (isComposing.value) {
    return // 合成期间只回写镜像：字数冻结、不对外上报，待合成结束补发的 change 统一派发
  }
  countValue.value = target.value
  if (!lazyTextarea.value) {
    emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
    emits('change', e)
  }
}
function onChange(e: Event): void {
  const target = e.target as HTMLInputElement
  // 同 onInput：change 路径同样回写，避免镜像落后于 DOM
  innerValue.value = target.value
  countValue.value = target.value
  if (target.value !== props.value) {
    emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
    emits('change', e)
  }
}
function onEnter(e: KeyboardEvent): void {
  if (isComposing.value) {
    return
  }
  emits('enter', e)
}
// 原生 focus / blur 从内部 textarea 转发：两者都不冒泡，挂在根节点上的监听收不到；同步带上 relatedTarget 供宿主判断焦点来源 / 去向
// 注意点击清除图标会先让 textarea 失焦、再清空值，宿主若用 blur 做校验，拿到的是清空前的值（与 Input 的清除行为一致）
function onFocus(e: FocusEvent): void {
  emits('focus', e)
}
function onBlur(e: FocusEvent): void {
  emits('blur', e)
}
function onClear(): void {
  innerValue.value = ''
  countValue.value = ''
  emits('update:value', '')
  textareaRef.value?.focus()
}
// 程序化控制焦点：走原生 textarea 的 focus / blur
function focus(): void {
  textareaRef.value?.focus()
}
function blur(): void {
  textareaRef.value?.blur()
}
defineExpose({ focus, blur })
</script>
<template>
  <div
    class="textarea-wrap"
    :class="{ 'show-count': showCount }"
    :style="`
      --textarea-width: ${textareaWidth};
    `"
    :data-count="showCountNum"
  >
    <textarea
      ref="textareaRef"
      type="hidden"
      class="textarea-item"
      :class="{ 'clear-class': showClear, 'textarea-disabled': disabled }"
      :style="autoSizeStyle"
      :value="innerValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
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
.textarea-wrap {
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
    color: var(--va-textarea-text-color, var(--va-text-color-1));
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
    background-color: var(--va-textarea-bg-color, var(--va-bg-container-color));
    border: 1px solid var(--va-textarea-border-color, var(--va-border-color));
    border-radius: 6px;
    outline: none;
    &:hover {
      border-color: var(--va-cp-textarea-primary-color-hover, var(--va-primary-color-hover));
      z-index: 1;
    }
    &:focus-within {
      border-color: var(--va-cp-textarea-primary-color-hover, var(--va-primary-color-hover));
      box-shadow: var(--va-cp-textarea-focus-shadow, var(--va-focus-shadow));
      outline: 0;
    }
  }
  .clear-class {
    padding-right: 24px;
  }
  textarea:disabled {
    color: var(--va-text-color-disabled);
  }
  .textarea-item:-webkit-autofill,
  .textarea-item:-webkit-autofill:hover,
  .textarea-item:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--va-textarea-text-color, var(--va-text-color-1));
    caret-color: var(--va-textarea-text-color, var(--va-text-color-1));
    box-shadow: 0 0 0 1000px var(--va-textarea-bg-color, var(--va-bg-container-color)) inset;
    transition: background-color 9999s ease-out 0s;
  }
  textarea::-webkit-input-placeholder {
    color: var(--va-textarea-placeholder-color, var(--va-text-color-disabled));
  }
  textarea:-moz-placeholder {
    color: var(--va-textarea-placeholder-color, var(--va-text-color-disabled));
  }
  textarea::-moz-placeholder {
    color: var(--va-textarea-placeholder-color, var(--va-text-color-disabled));
  }
  textarea:-ms-input-placeholder {
    color: var(--va-textarea-placeholder-color, var(--va-text-color-disabled));
  }
  .clear-svg {
    position: absolute;
    top: 9px;
    right: 8px;
    z-index: 99;
    display: inline-block;
    font-size: 12px;
    color: var(--va-text-color-disabled);
    fill: currentColor;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: var(--va-text-color-3);
    }
  }
  .textarea-disabled {
    color: var(--va-text-color-disabled);
    background-color: var(--va-fill-color-1);
    cursor: not-allowed;
    &:hover {
      border-color: var(--va-border-color);
    }
    &:focus-within {
      border-color: var(--va-border-color);
      box-shadow: none;
    }
  }
}
.show-count {
  &::after {
    font-size: 14px;
    color: var(--va-text-color-3);
    white-space: nowrap;
    content: attr(data-count);
    pointer-events: none;
    float: right;
  }
}
</style>
