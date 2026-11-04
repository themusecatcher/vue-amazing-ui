<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { VNode } from 'vue'
import { useSlotsExist, add } from 'components/utils'

export interface Props {
  width?: string | number // 数字输入框宽度，单位 px
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 每次改变步数，可以为小数
  precision?: number // 数值精度
  prefix?: string // 前缀图标
  formatter?: (value: string | number) => string // 指定展示值的格式
  parser?: (value: string) => number // 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
  keyboard?: boolean // 是否启用键盘快捷键行为（上方向键增，下方向键减）
  disabled?: boolean // 是否禁用
  placeholder?: string // 数字输入的占位符
  value?: number // (v-model) 当前值
  defaultValue?: number // 非受控初始值，未绑 v-model:value 时生效
  valueModifiers?: object // 用于访问组件的 v-model 上添加的修饰符
}
// 声明组件插槽类型
export interface InputNumberSlots {
  prefix?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  width: 90,
  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: 0,
  prefix: undefined,
  formatter: undefined,
  parser: undefined,
  keyboard: true,
  disabled: false,
  placeholder: undefined,
  value: undefined,
  defaultValue: undefined,
  valueModifiers: () => ({})
})
defineSlots<InputNumberSlots>()
const inputRef = ref<HTMLInputElement | null>(null) // input 模板引用
const isComposing = ref<boolean>(false) // 是否正在使用文本合成系统输入中
const emits = defineEmits(['update:value', 'change', 'enter', 'focus', 'blur'])
// 父是否提供了值（受控）—— 值的真相源始终是 DOM 元素，这里只用于两处判断：
// ① 同步 props.value 时是否需要保留光标位置（非受控时元素自持，不能覆盖光标）；
// ② 清空输入时是否需要回传 undefined（非受控时无值可清）
const isControlled = computed(() => props.value !== undefined)
const slotsExist = useSlotsExist(['prefix'])
const inputWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const precision = computed(() => {
  // 数值精度取步长和精度中较大者
  const stepPrecision = String(props.step).split('.')[1]?.length || 0
  return Math.max(props.precision, stepPrecision)
})
// 初值必须与受控路径同口径（先按 min/max 钳制、再按 precision 格式化），故只能放在 precision 之后初始化
const numValue = ref<string | undefined>(
  props.defaultValue === undefined ? undefined : getFormatValue(getNumberValue(String(props.defaultValue)))
)
const showPrefix = computed(() => {
  return slotsExist.prefix || props.prefix
})
const lazyInput = computed(() => {
  return 'lazy' in props.valueModifiers
})
watch(
  [() => props.value, () => precision.value, () => props.formatter],
  async () => {
    if (isControlled.value) {
      if (inputRef.value) {
        const { selectionStart, selectionEnd, value } = inputRef.value
        const start = selectionStart ?? 0
        const end = selectionEnd ?? 0
        const beforeTxt = value.slice(0, start)
        const afterTxt = value.slice(end)
        numValue.value = getFormatValue() // 获取格式化后的值
        await nextTick()
        restoreCursor(start, beforeTxt, afterTxt)
      } else {
        numValue.value = getFormatValue()
      }
    }
  },
  {
    immediate: true,
    flush: 'post'
  }
)
function restoreCursor(start: number, beforeTxt: string, afterTxt: string): void {
  const inputEl = inputRef.value
  if (!inputEl) return
  const { value: inputValue } = inputEl
  let startPos = inputValue.length
  if (inputValue.endsWith(afterTxt)) {
    startPos = inputValue.length - afterTxt.length
  } else if (inputValue.startsWith(beforeTxt)) {
    startPos = beforeTxt.length
  } else {
    const beforeLastChar = beforeTxt[start - 1]
    const newIndex = inputValue.indexOf(beforeLastChar, start - 1)
    if (newIndex !== -1) {
      startPos = newIndex + 1
    }
  }
  inputEl.setSelectionRange(startPos, startPos)
}
function emitValue(value: number | undefined): void {
  emits('update:value', value) // 保证在 change 回调时能获取到最新数据
  emits('change', value)
}
function getFormatValue(value: number | undefined = props.value): string | undefined {
  if (props.formatter) {
    return props.formatter(value?.toFixed(precision.value) as string)
  } else {
    return value?.toFixed(precision.value)
  }
}
function getNumberValue(value: string): number {
  let numberValue = parseFloat(value)
  if (numberValue > props.max) {
    numberValue = props.max
  }
  if (numberValue < props.min) {
    numberValue = props.min
  }
  return numberValue
}
// 步进 / 钳制 / 箭头禁用态的数值基准：受控时以父值为准，非受控时以当前显示值为准
function currentNumber(): number {
  if (props.value !== undefined) {
    return props.value
  }
  const parsed = Number.parseFloat(numValue.value ?? '')
  return Number.isNaN(parsed) ? 0 : getNumberValue(String(parsed))
}
function updateValue(value: string): void {
  // Number.isNaN() 判断传递的值是否为 NaN，并检测器类型是否为 Number
  if (!Number.isNaN(parseFloat(value))) {
    const numberValue = getNumberValue(value)
    // 判据取父值而非当前显示值：受控时天然去重；非受控时 props.value 恒为 undefined，
    // 因此输入与失焦会各上报一次同一值（与 Input 的 change 口径一致，属既有设计）
    if (numberValue !== props.value) {
      emitValue(numberValue)
      // 非受控时没有父回写，必须自己把钳制后的值落到显示上，否则「显示 999 / 上报 100」分叉
      if (!isControlled.value) {
        numValue.value = getFormatValue(numberValue)
      }
    } else {
      numValue.value = getFormatValue()
    }
  } else {
    // 非受控时 props.value 恒为 undefined，直接回退会清空输入框，故以当前数值为基准回退
    numValue.value = getFormatValue(isControlled.value ? props.value : currentNumber())
  }
}
// 文本合成系统即输入法编辑器开始新的输入合成时会触发（不对外派发：Events 表无该事件）
function onCompositionStart(): void {
  isComposing.value = true
}
// 合成结束统一解析一次，替代合成期的逐字符解析
function onCompositionEnd(e: CompositionEvent): void {
  isComposing.value = false
  const target = e.target as HTMLInputElement | null
  if (target) {
    updateValueWithChineseDot(target.value)
  }
}
function onInput(e: Event): void {
  if (isComposing.value) {
    return // 合成期不解析、不上报：半成品（拼音、全角数字）不该进 updateValue
  }
  if (!lazyInput.value) {
    const target = e.target as HTMLInputElement
    const value = props.parser ? String(props.parser(target.value)) : target.value
    if (value && !Number.isNaN(getNumberValue(value)) && getNumberValue(value) !== props.value) {
      updateValue(value)
    }
    if (!value && isControlled.value) {
      emitValue(undefined)
    }
  }
}
/** 中文标点下打小数点会得到 `。`，静默纠正为 `.` */
function updateValueWithChineseDot(raw: string): void {
  const normalized = props.parser ? String(props.parser(raw)) : raw.replace(/。/g, '.')
  // 非受控时先落纠正后的文本：updateValue 解析失败会按「当前显示值」回退，基准必须是纠正后的文本，
  // 否则会退回 `1。5`；解析成功时 updateValue 再按精度重写一次。受控时交给父回写，避免中间帧闪烁
  if (!isControlled.value) {
    numValue.value = normalized
  }
  updateValue(normalized)
}
function onChange(e: Event): void {
  const target = e.target as HTMLInputElement
  const value = props.parser ? String(props.parser(target.value)) : target.value
  updateValue(value)
}
function onKeyboard(e: KeyboardEvent): void {
  if (isComposing.value) {
    return // 合成期上下键用于选候选词，不能同时触发步进
  }
  if (e.key === 'ArrowUp') {
    onUp()
  }
  if (e.key === 'ArrowDown') {
    onDown()
  }
}
function onEnter(e: KeyboardEvent): void {
  emits('enter', e)
  if (lazyInput.value) {
    const target = e.target as HTMLInputElement
    const value = props.parser ? String(props.parser(target.value)) : target.value
    updateValue(value)
  }
}
// 原生 focus / blur 从内部 input 转发：两者都不冒泡，挂在根节点上的监听收不到；同步带上 relatedTarget 供宿主判断焦点去向
// 注意口径：事件只对应内部 input，视觉聚焦态由容器的 :focus-within 驱动；上下箭头已阻止 mousedown 默认行为，点击不会让 input 失焦
function onFocus(e: FocusEvent): void {
  emits('focus', e)
}
function onBlur(e: FocusEvent): void {
  emits('blur', e)
}
function onUp(): void {
  const res = Math.min(props.max, add(currentNumber(), +props.step)).toFixed(precision.value)
  const numberValue = getNumberValue(res)
  // 非受控时没有父回写，必须自己写显示，否则「点了箭头画面完全不动」
  if (!isControlled.value) {
    numValue.value = getFormatValue(numberValue)
  }
  emitValue(numberValue)
}
function onDown(): void {
  const res = Math.max(props.min, add(currentNumber(), -props.step)).toFixed(precision.value)
  const numberValue = getNumberValue(res)
  if (!isControlled.value) {
    numValue.value = getFormatValue(numberValue)
  }
  emitValue(numberValue)
}
// 程序化控制焦点：走原生 input 的 focus / blur，聚焦态由 CSS :focus-within 驱动，无需另行同步
function focus(): void {
  inputRef.value?.focus()
}
function blur(): void {
  inputRef.value?.blur()
}
defineExpose({ focus, blur })
</script>
<template>
  <div
    class="input-number-wrap"
    :class="{ 'input-number-disabled': disabled }"
    :style="`
      --input-number-width: ${inputWidth};
    `"
  >
    <div class="input-number-container">
      <span v-if="showPrefix" class="input-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        ref="inputRef"
        class="input-number"
        autocomplete="off"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="numValue"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.up.prevent
        @keydown="keyboard ? onKeyboard($event) : () => false"
        @keydown.enter.prevent="onEnter"
      />
    </div>
    <div class="input-number-handler-wrap">
      <span
        class="input-number-arrow up-arrow"
        :class="{ 'arrow-disabled': currentNumber() >= max }"
        @mousedown.prevent
        @click="currentNumber() >= max ? () => false : onUp()"
      >
        <svg
          class="icon-svg"
          focusable="false"
          data-icon="up"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
          ></path>
        </svg>
      </span>
      <span
        class="input-number-arrow down-arrow"
        :class="{ 'arrow-disabled': currentNumber() <= min }"
        @mousedown.prevent
        @click="currentNumber() <= min ? () => false : onDown()"
      >
        <svg
          class="icon-svg"
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
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.input-number-wrap {
  position: relative;
  display: inline-block;
  width: var(--input-number-width);
  height: 32px;
  font-size: 14px;
  color: var(--va-text-color-1);
  line-height: 1.5714285714285714;
  padding: 0 11px;
  background-color: var(--va-bg-container-color);
  border-radius: 6px;
  border: 1px solid var(--va-border-color);
  transition: all 0.2s;
  &:hover {
    border-color: var(--va-cp-input-number-primary-color-hover, var(--va-primary-color-hover));
    .input-number-handler-wrap {
      background: var(--va-bg-container-color);
      opacity: 1;
    }
  }
  &:focus-within {
    border-color: var(--va-cp-input-number-primary-color-hover, var(--va-primary-color-hover));
    box-shadow: var(--va-cp-input-number-focus-shadow, var(--va-focus-shadow));
  }
  .input-number-container {
    height: 100%;
    display: flex;
    .input-prefix {
      pointer-events: none;
      margin-right: 4px;
      display: inline-flex;
      align-items: center;
    }
    .input-number {
      font-size: 14px;
      color: var(--va-text-color-1);
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 6px;
      transition: all 0.2s linear;
      appearance: textfield;
      border: none;
      outline: none;
    }
    input::-webkit-input-placeholder {
      color: var(--va-text-color-disabled);
    }
    input:-moz-placeholder {
      color: var(--va-text-color-disabled);
    }
    input::-moz-placeholder {
      color: var(--va-text-color-disabled);
    }
    input:-ms-input-placeholder {
      color: var(--va-text-color-disabled);
    }
  }
  .input-number-handler-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 22px;
    height: 100%;
    background: transparent;
    border-radius: 0 6px 6px 0;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch; // 默认值，元素被拉伸以适应容器
    transition: all 0.2s linear;
    .input-number-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: auto;
      height: 40%;
      border-left: 1px solid var(--va-border-color);
      cursor: pointer;
      transition: all 0.2s linear;
      &:hover {
        height: 60%;
        .icon-svg {
          color: var(--va-cp-input-number-primary-color, var(--va-primary-color));
        }
      }
      .icon-svg {
        font-size: 7px;
        color: var(--va-text-color-3);
        user-select: none;
        transition: color 0.2s;
      }
    }
    .up-arrow {
      border-top-right-radius: 6px;
    }
    .down-arrow {
      border-top: 1px solid var(--va-border-color);
      border-bottom-right-radius: 6px;
    }
    .arrow-disabled {
      cursor: not-allowed;
    }
  }
}
.input-number-disabled {
  color: var(--va-text-color-disabled);
  background-color: var(--va-fill-color-1);
  border-color: var(--va-border-color);
  box-shadow: none;
  cursor: not-allowed;
  opacity: 1;
  &:hover {
    border-color: var(--va-border-color);
  }
  &:focus-within {
    border-color: var(--va-border-color);
    box-shadow: none;
  }
  .input-number-container .input-number {
    color: var(--va-text-color-disabled);
    cursor: not-allowed;
  }
  .input-number-handler-wrap {
    display: none;
  }
}
</style>
