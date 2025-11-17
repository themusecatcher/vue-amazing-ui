<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useSlotsExist, add, useInject } from 'components/utils'
export interface Props {
  width?: string | number // 数字输入框宽度，单位 px
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 每次改变步数，可以为小数
  precision?: number // 数值精度
  prefix?: string // 前缀图标 string | slot
  formatter?: (value: string | number) => string // 指定展示值的格式
  parser?: (value: string) => number // 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
  keyboard?: boolean // 是否启用键盘快捷键行为（上方向键增，下方向键减）
  disabled?: boolean // 是否禁用
  placeholder?: string // 数字输入的占位符
  value?: number // (v-model) 当前值
  valueModifiers?: object // 用于访问组件的 v-model 上添加的修饰符
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
  valueModifiers: () => ({})
})
const inputRef = ref() // input 模板引用
const numValue = ref<string>() // 数字输入框的内容
const { colorPalettes, shadowColor } = useInject('InputNumber') // 主题色注入
const emits = defineEmits(['update:value', 'change', 'enter'])
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
const showPrefix = computed(() => {
  return slotsExist.prefix || props.prefix
})
const lazyInput = computed(() => {
  return 'lazy' in props.valueModifiers
})
watch(
  () => [props.value, precision.value, props.formatter],
  async () => {
    if (props.value !== undefined) {
      if (inputRef.value) {
        const { selectionStart: start, selectionEnd: end, value } = inputRef.value
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
    flush: 'post',
    deep: true
  }
)
function restoreCursor(start: number, beforeTxt: string, afterTxt: string): void {
  const { value: inputValue } = inputRef.value
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
  inputRef.value.setSelectionRange(startPos, startPos)
}
function emitValue(value: number | undefined): void {
  emits('update:value', value) // 保证在 change 回调时能获取到最新数据
  emits('change', value)
}
function getFormatValue(): string | undefined {
  if (props.formatter) {
    return props.formatter(props.value?.toFixed(precision.value) as string)
  } else {
    return props.value?.toFixed(precision.value)
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
function updateValue(value: string): void {
  // Number.isNaN() 判断传递的值是否为 NaN，并检测器类型是否为 Number
  if (!Number.isNaN(parseFloat(value))) {
    const numberValue = getNumberValue(value)
    if (numberValue !== props.value) {
      emitValue(numberValue)
    } else {
      numValue.value = getFormatValue()
    }
  } else {
    numValue.value = getFormatValue()
  }
}
function onInput(e: Event): void {
  if (!lazyInput.value) {
    const target = e.target as HTMLInputElement
    const value = props.parser ? String(props.parser(target.value)) : target.value
    if (value && !Number.isNaN(getNumberValue(value)) && getNumberValue(value) !== props.value) {
      updateValue(value)
    }
    if (!value && props.value !== undefined) {
      emitValue(undefined)
    }
  }
}
function onChange(e: Event): void {
  const target = e.target as HTMLInputElement
  const value = props.parser ? String(props.parser(target.value)) : target.value
  updateValue(value)
}
function onKeyboard(e: KeyboardEvent): void {
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
function onUp(): void {
  const res = Math.min(props.max, add(props.value || 0, +props.step)).toFixed(precision.value)
  emitValue(getNumberValue(res))
}
function onDown(): void {
  const res = Math.max(props.min, add(props.value || 0, -props.step)).toFixed(precision.value)
  emitValue(getNumberValue(res))
}
</script>
<template>
  <div
    tabindex="1"
    class="input-number-wrap"
    :class="{ 'input-number-disabled': disabled }"
    :style="`
      --input-number-width: ${inputWidth};
      --input-number-primary-color: ${colorPalettes[5]};
      --input-number-primary-color-hover: ${colorPalettes[4]};
      --input-number-primary-color-focus: ${colorPalettes[4]};
      --input-number-primary-shadow-color: ${shadowColor};
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
        @input="onInput"
        @change="onChange"
        @keydown.up.prevent
        @keydown="keyboard ? onKeyboard($event) : () => false"
        @keydown.enter.prevent="onEnter"
      />
    </div>
    <div class="input-number-handler-wrap">
      <span
        class="input-number-arrow up-arrow"
        :class="{ 'arrow-disabled': (value || 0) >= max }"
        @click="(value || 0) >= max ? () => false : onUp()"
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
        :class="{ 'arrow-disabled': (value || 0) <= min }"
        @click="(value || 0) <= min ? () => false : onDown()"
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
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  padding: 0 11px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  transition: all 0.2s;
  &:hover {
    border-color: var(--input-number-primary-color-hover);
    .input-number-handler-wrap {
      background: #fff;
      opacity: 1;
    }
  }
  &:focus-within {
    // 激活时样式
    border-color: var(--input-number-primary-color-focus);
    box-shadow: 0 0 0 2px var(--input-number-primary-shadow-color);
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
      color: rgba(0, 0, 0, 0.88);
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
      color: rgba(0, 0, 0, 0.25);
    }
    input:-moz-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    input::-moz-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    input:-ms-input-placeholder {
      color: rgba(0, 0, 0, 0.25);
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
      border-left: 1px solid #d9d9d9;
      cursor: pointer;
      transition: all 0.2s linear;
      &:hover {
        height: 60%;
        .icon-svg {
          color: var(--input-number-primary-color);
        }
      }
      .icon-svg {
        font-size: 7px;
        color: rgba(0, 0, 0, 0.45);
        fill: currentColor;
        user-select: none;
        transition: color 0.2s;
      }
    }
    .up-arrow {
      border-top-right-radius: 6px;
    }
    .down-arrow {
      border-top: 1px solid #d9d9d9;
      border-bottom-right-radius: 6px;
    }
    .arrow-disabled {
      cursor: not-allowed;
    }
  }
}
.input-number-disabled {
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.04);
  border-color: #d9d9d9;
  box-shadow: none;
  cursor: not-allowed;
  opacity: 1;
  &:hover {
    border-color: #d9d9d9;
  }
  &:focus-within {
    // 激活时样式
    border-color: #d9d9d9;
    box-shadow: none;
  }
  .input-number-container .input-number {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
  .input-number-handler-wrap {
    display: none;
  }
}
</style>
