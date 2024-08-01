<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
import { ref, computed, watch, useSlots } from 'vue'
import { add } from '../utils'
interface Props {
  width?: string | number // 输入框宽度
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 每次改变步数，可以为小数
  precision?: number // 数值精度
  prefix?: string // 前缀图标 string | slot
  formatter?: Function // 指定展示值的格式
  keyboard?: boolean // 是否启用键盘快捷键行为（上方向键增，下方向键减）
  disabled?: boolean // 是否禁用
  value?: number | null // (v-model) 当前值
}
const props = withDefaults(defineProps<Props>(), {
  width: 90,
  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: 0,
  prefix: '',
  formatter: (value: string) => value,
  keyboard: true,
  disabled: false,
  value: null
})
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
const slots = useSlots()
const showPrefix = computed(() => {
  const prefixSlots = slots.prefix?.()
  if (prefixSlots) {
    return Boolean(prefixSlots[0].children !== 'v-if' && prefixSlots?.length)
  }
  return props.prefix
})
const numValue = ref(props.formatter(props.value?.toFixed(precision.value)))
watch(
  () => props.value,
  (to) => {
    numValue.value = to === null ? null : props.formatter(to?.toFixed(precision.value))
  }
)
watch(numValue, (to) => {
  if (!to) {
    emitValue(null)
  }
})
const emits = defineEmits(['update:value', 'change'])
function emitValue(value: number | null) {
  emits('change', value)
  emits('update:value', value)
}
function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value.replace(/,/g, '')
  if (!Number.isNaN(parseFloat(value))) {
    // Number.isNaN() 判断传递的值是否为NaN，并检测器类型是否为 Number
    if (parseFloat(value) > props.max) {
      emitValue(props.max)
      return
    }
    if (parseFloat(value) < props.min) {
      emitValue(props.min)
      return
    }
    if (parseFloat(value) !== props.value) {
      emitValue(parseFloat(value))
    } else {
      numValue.value = props.value?.toFixed(precision.value)
    }
  } else {
    numValue.value = props.value?.toFixed(precision.value)
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
    <div class="m-input-wrap">
      <span class="input-prefix" v-if="showPrefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        v-if="keyboard"
        class="u-input-number"
        autocomplete="off"
        :disabled="disabled"
        v-model="numValue"
        @keydown.up.prevent
        @keydown="onKeyboard"
        @change="onChange"
        v-bind="$attrs"
      />
      <input v-else autocomplete="off" class="u-input-number" @change="onChange" v-model="numValue" v-bind="$attrs" />
    </div>
    <div class="m-handler-wrap">
      <span class="m-arrow up-arrow" :class="{ 'arrow-disabled': (value || 0) >= max }" @click="onUp">
        <svg focusable="false" class="u-icon" data-icon="up" aria-hidden="true" viewBox="64 64 896 896">
          <path
            d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
          ></path>
        </svg>
      </span>
      <span class="m-arrow down-arrow" :class="{ 'arrow-disabled': (value || 0) <= min }" @click="onDown">
        <svg focusable="false" class="u-icon" data-icon="down" aria-hidden="true" viewBox="64 64 896 896">
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
    border-color: @themeColor;
    .m-handler-wrap {
      background: #fff;
      opacity: 1;
    }
  }
  &:focus-within {
    // 激活时样式
    border-color: @themeColor;
    box-shadow: 0 0 0 2px fade(@themeColor, 20%);
  }
  .m-input-wrap {
    height: 100%;
    display: flex;
    .input-prefix {
      pointer-events: none;
      margin-inline-end: 4px;
      display: inline-flex;
      align-items: center;
    }
    .u-input-number {
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
    transition: all 0.2s linear 0.2s;
    .u-icon {
      width: 7px;
      height: 7px;
      fill: rgba(0, 0, 0, 0.45);
      user-select: none;
    }
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
        .u-icon {
          fill: @themeColor;
        }
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
  .m-input-wrap .u-input-number {
    cursor: not-allowed;
  }
  .m-handler-wrap {
    display: none;
  }
}
</style>
