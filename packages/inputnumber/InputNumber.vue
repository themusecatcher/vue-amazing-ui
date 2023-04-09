<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  min?: number, // 最小值
  max?: number, // 最大值
  step?: number, // 每次改变步数，可以为小数
  prefix?: string, // 前缀图标 string | slot
  value?: number|null // 当前值(v-model)
}
const props = withDefaults(defineProps<Props>(), {
  min: Infinity,
  max: -Infinity,
  step: 1,
  prefix: '',
  value: 0
})
const numValue = ref<number|null>(props.value)
const emits = defineEmits(['update:value', 'change'])
function emitValue (value: any) {
  emits('change', value)
  emits('update:value', value)
}
function onChange (e: any) {
  const value = e.target.value
  if (!Number.isNaN(parseFloat(value))) { // Number.isNaN() 判断传递的值是否为NaN，并检测器类型是否为Number
    numValue.value = parseFloat(value)
    if (numValue.value > props.max) {
      numValue.value = props.max
    }
    if (numValue.value < props.min) {
      numValue.value = props.min
    }
    if (numValue.value !== props.value) {
      emitValue(numValue.value)
    }
  } else {
    numValue.value = props.value
  }
}
function onInput (e: any) {
  const value = e.target.value
  if (value === '') {
    emitValue(null)
  }
  if (!Number.isNaN(parseFloat(value)) && parseFloat(value) >= props.min && parseFloat(value) <= props.max && parseFloat(value) !== props.value) {
    emitValue(parseFloat(value) || 0)
  }
}
function add (num1: number, num2: number) {
  const num1DeciStr = String(num1).split('.')[1]
  const num2DeciStr = String(num2).split('.')[1]
  let maxLen = Math.max(num1DeciStr?.length || 0, num2DeciStr?.length || 0) // 两数中最长的小数位长度
  let num1Str = num1.toFixed(maxLen) // 补零，返回字符串
  let num2Str = num2.toFixed(maxLen)
  const result = +(num1Str.replace('.', '')) + +(num2Str.replace('.', '')) // 转换为整数相加
  return result / Math.pow(10, maxLen)
}
function onUp () {
  if (numValue.value !== props.max) {
    const res = add(numValue.value || 0, + props.step)
    emitValue(Math.min(props.max, res))
    numValue.value = Math.min(props.max, res)
  }
}
function onDown () {
  if (numValue.value !== props.min) {
    const res = add(numValue.value || 0, -props.step)
    emitValue(Math.max(props.min, res))
    numValue.value = Math.max(props.min, res)
  }
}
</script>
<template>
  <div class="m-input-number" tabindex="1">
    <span class="u-input-prefix"><slot name="prefix">{{ prefix }}</slot></span>
    <div class="m-input-wrap">
      <input autocomplete="off" @change="onChange" @input="onInput" v-model="numValue" class="u-input-number">
    </div>
    <div class="m-handler-wrap">
      <span class="u-up-arrow" :class="{disabled: min === numValue || max === numValue}" @click="onUp">
        <svg focusable="false" class="u-icon" data-icon="up" aria-hidden="true" viewBox="64 64 896 896"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path></svg>
      </span>
      <span class="u-down-arrow" :class="{disabled: min === numValue || max === numValue}" @click="onDown">
        <svg focusable="false" class="u-icon" data-icon="down" aria-hidden="true" viewBox="64 64 896 896"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-input-number {
  position: relative;
  display: inline-block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5;
  padding: 0 11px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  transition: all 0.2s;
  &:hover {
    border-color: @themeColor;
    .m-handler-wrap {
      opacity: 1;
    }
  }
  &:focus-within { // 激活时样式
    border-color: @themeColor;
    box-shadow: 0 0 0 2px fade(@themeColor, 20%);
  }
  .u-input-prefix {
    margin-right: 4px;
    display: inline-block;
    vertical-align: middle;
    pointer-events: none;
  }
  .m-input-wrap {
    display: inline-block;
    vertical-align: middle;
    .u-input-number {
      display: inline-block;
      width: 68px;
      height: 28px;
      background: transparent;
      border: none;
      border-radius: 6px;
      outline: 0;
      transition: all 0.2s linear;
      appearance: textfield;
      color: rgba(0, 0, 0, 0.88);
    }
  }
  .m-handler-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 22px;
    height: 100%;
    background: #fff;
    border-radius: 0 6px 6px 0;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch; // 默认值，元素被拉伸以适应容器
    transition: opacity 0.2s linear 0.2s;
    .u-icon {
      width: 7px;
      height: 7px;
      fill: rgba(0, 0, 0, 0.25);
      transition: all 0.2s linear;
    }
    .u-up-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: auto;
      height: 40%;
      border-top-right-radius: 6px;
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
    .u-down-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: auto;
      height: 40%;
      border-top: 1px solid #d9d9d9;
      border-left: 1px solid #d9d9d9;
      border-bottom-right-radius: 2px;
      cursor: pointer;
      transition: all 0.2s linear;
      &:hover {
        height: 60%;
        .u-icon {
          fill: @themeColor;
        }
      }
    }
    .disabled {
      cursor: not-allowed;
      &:hover {
        .u-icon {
          fill: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
</style>
