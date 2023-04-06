<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Option {
  label: string,
  value: any,
  disabled?: boolean // 是否禁用单个复选框
}
interface Props {
  options?: Array<Option>, // 复选元素数据
  disabled?: boolean, // 是否禁用所有复选框
  vertical?: boolean, // 是否垂直排列
  value?: any[], // 当前选中的值（v-model）
  gap?: number, // 多个单选框之间的间距，单位px
  indeterminate?: boolean, // 全选时的样式控制
  checked?: boolean // 是否全选（v-model）
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  value: () => [],
  gap: 8,
  indeterminate: false,
  checked: false
})
const sum = computed(() => {
  return props.options.length
})
const checkedValue = ref(props.value)
watch(
  () => props.value,
  (to) => {
    checkedValue.value = to
  }
)
const styleObject = computed(() => {
  if (props.vertical) {
    return {
      marginBottom: props.gap + 'px'
    }
  } else {
    return {
      marginRight: props.gap + 'px'
    }
  }
})
const emits = defineEmits(['update:value', 'update:checked', 'change'])
function onClick (value: any) {
  if (props.value.includes(value)) { // 已选中
    const newVal = checkedValue.value.filter(target => target !== value)
    emits('update:value', newVal)
    emits('change', newVal)
  } else { // 未选中
    const newVal = [...checkedValue.value, value]
    emits('update:value', newVal)
    emits('change', newVal)
  }
}
function onCheckAll () { // 全选切换
  emits('update:checked', !props.checked)
}
</script>
<template>
  <div class="m-checkbox" :class="{'vertical': vertical}">
    <div
      v-if="sum"
      class="m-checkbox-wrap"
      :class="{'disabled': disabled || option.disabled}"
      :style="sum !== index + 1 ? styleObject: ''"
      @click="(disabled || option.disabled) ? (e: Event) => e.preventDefault() : onClick(option.value)" v-for="(option, index) in options" :key="index">
      <span class="u-checkbox" :class="{'u-checkbox-checked': checkedValue.includes(option.value) }"></span>
      <span class="u-label">
        <slot :label="option.label">{{ option.label }}</slot>
      </span>
    </div>
    <div
      v-else
      class="m-checkbox-wrap"
      :class="{'disabled': disabled}"
      @click="onCheckAll">
      <span class="u-checkbox" :class="{'u-checkbox-checked': checked && !indeterminate, 'indeterminate': indeterminate }"></span>
      <span class="u-label">
        <slot>Check all</slot>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-checkbox {
  display: inline-flex;
  height: 24px;
  .m-checkbox-wrap {
    color: #000000d9;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    &:hover {
      .u-checkbox {
        border-color: @themeColor;
      }
    }
    .u-checkbox {
      position: relative;
      display: inline-block;
      width: 14px;
      height: 14px;
      background: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      transition: all .3s;
      vertical-align: top;
      top: 4px;
      &:after {
        position: absolute;
        top: 50%;
        left: 21.5%;
        width: 3.71428571px;
        height: 7.14285714px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0) translate(-50%, -50%);
        opacity: 0;
        transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        content: '';
      }
    }
    .u-checkbox-checked {
      background-color: @themeColor;
      border-color: @themeColor;
      &:after {
        position: absolute;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        opacity: 1;
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        content: '';
      }
    }
    .indeterminate {
      &:after {
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background-color: @themeColor;
        border: 0;
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }
    .u-label {
      padding: 0 8px;
      font-size: 16px;
      display: inline-block;
      line-height: 24px;
    }
  }
  .disabled {
    color: #00000040;
    cursor: not-allowed;
    &:hover {
      .u-checkbox {
        border-color: #d9d9d9;
      }
    }
    .u-checkbox {
      border-color: #d9d9d9;
      background-color: #f5f5f5;
      &:after {
        border-color: rgba(0, 0, 0, 0.25);
        animation-name: none;
      }
    }
  }
}
.vertical {
  display: inline-block;
}
</style>
