<script lang="ts">
/*
  一个根节点时，禁用组件根节点自动继承 attribute，必须使用这种写法！然后在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
  多个根节点时，只需在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
*/
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
interface Props {
  width?: string|number // 输入框宽度
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 每次改变步数，可以为小数
  precision?: number // 数值精度
  prefix?: string // 前缀图标 string | slot
  formatter?: Function // 指定展示值的格式
  keyboard?: boolean // 是否启用键盘快捷键行为（上方向键增，下方向键减）
  value?: number|null // 当前值(v-model)
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
  value: null
})
const inputWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const precision = computed(() => { // 数值精度取步长和精度中较大者
  const stepPrecision = String(props.step).split('.')[1]?.length || 0
  return Math.max(props.precision, stepPrecision)
})
const numValue = ref(props.formatter(props.value?.toFixed(precision.value)))
watch(
  () => props.value,
  (to) => {
    numValue.value = props.formatter(to?.toFixed(precision.value))
  }
)
watch(
  numValue,
  (to) => {
    if (!to)  {
      emitValue(null)
    }
  }
)
const prefixRef = ref() // 声明一个同名的模板引用
const showPrefix = ref(1)
onMounted(() => {
  showPrefix.value = prefixRef.value.offsetWidth
})
const emits = defineEmits(['update:value', 'change'])
function emitValue (value: any) {
  emits('change', value)
  emits('update:value', value)
}
function onChange (e: any) {
  const value = e.target.value.replaceAll(',', '')
  if (!Number.isNaN(parseFloat(value))) { // Number.isNaN() 判断传递的值是否为NaN，并检测器类型是否为 Number
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
// 消除js加减精度问题的加法函数
function add (num1: number, num2: number) {
  const num1DeciStr = String(num1).split('.')[1]
  const num2DeciStr = String(num2).split('.')[1]
  let maxLen = Math.max(num1DeciStr?.length || 0, num2DeciStr?.length || 0) // 两数中最长的小数位长度
  let num1Str = num1.toFixed(maxLen) // 补零，返回字符串
  let num2Str = num2.toFixed(maxLen)
  const result = +(num1Str.replace('.', '')) + +(num2Str.replace('.', '')) // 转换为整数相加
  return result / Math.pow(10, maxLen)
}
function onKeyboard (e: any) {
  if (e.key === 'ArrowUp') {
    onUp()
  }
  if (e.key === 'ArrowDown') {
    onDown()
  }
}
function onUp () {
  const res = parseFloat(Math.min(props.max, add(props.value || 0, +props.step)).toFixed(precision.value))
  emitValue(res)
}
function onDown () {
  const res = parseFloat(Math.max(props.min, add(props.value || 0, -props.step)).toFixed(precision.value))
  emitValue(res)
}
</script>
<template>
  <div class="m-input-number" tabindex="1" :style="`width: ${inputWidth};`">
    <div class="m-input-wrap">
      <span class="u-input-prefix" ref="prefixRef" v-if="showPrefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        v-if="keyboard"
        autocomplete="off"
        class="u-input-number"
        @change="onChange"
        v-model="numValue"
        @keydown.up.prevent
        @keydown="onKeyboard"
        v-bind="$attrs" />
      <input
        v-else
        autocomplete="off"
        class="u-input-number"
        @change="onChange"
        v-model="numValue"
        v-bind="$attrs" />
    </div>
    <div class="m-handler-wrap">
      <span class="u-up-arrow" :class="{disabled: (value || 0) >= max}" @click="onUp">
        <svg focusable="false" class="u-icon" data-icon="up" aria-hidden="true" viewBox="64 64 896 896"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path></svg>
      </span>
      <span class="u-down-arrow" :class="{disabled: (value || 0) <= min}" @click="onDown">
        <svg focusable="false" class="u-icon" data-icon="down" aria-hidden="true" viewBox="64 64 896 896"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-input-number {
  position: relative;
  display: inline-block;
  height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, .88);
  line-height: 1.5714285714285714;
  padding: 0 11px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  transition: all .2s;
  &:hover {
    border-color: @themeColor;
    .m-handler-wrap {
      background: #FFF;
      opacity: 1;
    }
  }
  &:focus-within { // 激活时样式
    border-color: @themeColor;
    box-shadow: 0 0 0 2px fade(@themeColor, 20%);
  }
  .m-input-wrap {
    width: 100%;
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    .u-input-prefix {
      pointer-events: none;
      margin-inline-end: 4px;
    }
    .u-input-number {
      width: 100%;
      height: 28px;
      background: transparent;
      border: none;
      border-radius: 6px;
      outline: 0;
      transition: all .2s linear;
      appearance: textfield;
      color: rgba(0, 0, 0, .88);
    }
    input::-webkit-input-placeholder {
      color: rgba(0, 0, 0, .25)
    }
    input:-moz-placeholder {
      color: rgba(0, 0, 0, .25)
    }
    input::-moz-placeholder {
      color: rgba(0, 0, 0, .25)
    }
    input:-ms-input-placeholder {
      color: rgba(0, 0, 0, .25)
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
    transition: all .2s linear .2s;
    .u-icon {
      width: 7px;
      height: 7px;
      fill: rgba(0, 0, 0, .25);
      transition: all .2s linear;
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
      transition: all .2s linear;
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
      transition: all .2s linear;
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
          fill: rgba(0, 0, 0, .25);
        }
      }
    }
  }
}
</style>
