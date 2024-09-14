<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSlotsExist, add } from '../utils'
interface Props {
  width?: string | number // 数字输入框宽度，单位 px
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 每次改变步数，可以为小数
  precision?: number // 数值精度
  prefix?: string // 前缀图标 string | slot
  formatter?: (value: number | string) => string // 指定展示值的格式
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
const numValue = ref()
const emits = defineEmits(['update:value', 'change'])
const slotsExist = useSlotsExist(['prefix'])
const inputWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
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
  () => {
    if (!props.value) {
      if (props.formatter) {
        numValue.value = props.formatter('')
      }
    } else {
      numValue.value = getFormatValue()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(numValue, (to) => {
  if (!to || (props.parser && to && !props.parser(to))) {
    emitValue(undefined)
  }
})
function emitValue(value: number | undefined) {
  emits('change', value)
  emits('update:value', value)
}
function getFormatValue() {
  if (props.formatter) {
    return props.formatter(parseFloat(props.value?.toFixed(precision.value) as string))
  } else {
    return props.value?.toFixed(precision.value)
  }
}
function getNumberValue(value: string) {
  let numberValue = parseFloat(value)
  if (numberValue > props.max) {
    numberValue = props.max
  }
  if (numberValue < props.min) {
    numberValue = props.min
  }
  return numberValue
}
function updateValue(value: string) {
  if (!Number.isNaN(parseFloat(value))) {
    // Number.isNaN() 判断传递的值是否为 NaN，并检测器类型是否为 Number
    const numberValue = getNumberValue(value)
    if (numberValue !== props.value) {
      emitValue(numberValue)
    } else {
      numValue.value = getFormatValue()
    }
  } else {
    if (!props.value) {
      if (props.formatter) {
        numValue.value = props.formatter(value)
      }
    } else {
      numValue.value = getFormatValue()
    }
  }
}
function onInput(e: InputEvent) {
  if (!lazyInput.value) {
    const target = e.target as HTMLInputElement
    const value = props.parser ? String(props.parser(target.value)) : target.value
    if (value && getNumberValue(value) !== props.value) {
      updateValue(value)
    }
  }
}
function onChange(e: Event) {
  if (lazyInput.value || props.formatter) {
    const target = e.target as HTMLInputElement
    const value = props.parser ? String(props.parser(target.value)) : target.value
    updateValue(value)
  }
}
function onKeyboard(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    onUp()
  }
  if (e.key === 'ArrowDown') {
    onDown()
  }
}
function onUp() {
  const res = parseFloat(Math.min(props.max, add(props.value || 0, +props.step)).toFixed(precision.value))
  emitValue(res)
}
function onDown() {
  const res = parseFloat(Math.max(props.min, add(props.value || 0, -props.step)).toFixed(precision.value))
  emitValue(res)
}
</script>
<template>
  <div
    tabindex="1"
    class="m-input-number"
    :class="{ 'input-number-disabled': disabled }"
    :style="`width: ${inputWidth};`"
  >
    <div class="m-input-number-wrap">
      <span v-if="showPrefix" class="input-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        v-if="keyboard"
        class="input-number"
        autocomplete="off"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="numValue"
        @input="onInput"
        @change="onChange"
        @keydown.up.prevent
        @keydown="onKeyboard"
      />
      <input v-else autocomplete="off" class="input-number" @change="onChange" v-model="numValue" v-bind="$attrs" />
    </div>
    <div class="m-handler-wrap">
      <span class="m-arrow up-arrow" :class="{ 'arrow-disabled': (value || 0) >= max }" @click="onUp">
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
      <span class="m-arrow down-arrow" :class="{ 'arrow-disabled': (value || 0) <= min }" @click="onDown">
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
.m-input-number {
  position: relative;
  display: inline-block;
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
    border-color: #4096ff;
    .m-handler-wrap {
      background: #fff;
      opacity: 1;
    }
  }
  &:focus-within {
    // 激活时样式
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }
  .m-input-number-wrap {
    height: 100%;
    display: flex;
    .input-prefix {
      pointer-events: none;
      margin-inline-end: 4px;
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
  .m-handler-wrap {
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
    .m-arrow {
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
          color: @themeColor;
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
  .m-input-number-wrap .input-number {
    cursor: not-allowed;
  }
  .m-handler-wrap {
    display: none;
  }
}
</style>
