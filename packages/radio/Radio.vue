<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  label: string,
  value: any,
  disabled?: boolean // 是否禁用单个单选器
}
interface Props {
  options: Array<Option>, // 单选元素数据
  disabled?: boolean, // 是否禁用所有子单选器
  vertical?: boolean, // 是否垂直排列
  value?: any, // 当前选中的值（v-model）
  gap?: number // 多个单选框之间的间距，单位px
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  value: null,
  gap: 8
})
const sum = computed(() => {
  return props.options.length
})
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
const emits = defineEmits(['update:value', 'change'])
function onClick (value: any) {
  if (value !== props.value) {
    emits('update:value', value)
    emits('change', value)
  }
}
</script>
<template>
  <div class="m-radio" :class="{ 'vertical': vertical }">
    <div
      class="m-radio-wrap"
      :class="{'disabled': disabled || option.disabled}"
      :style="sum !== index + 1 ? styleObject: ''"
      @click="(disabled || option.disabled) ? (e: Event) => e.preventDefault() : onClick(option.value)" v-for="(option, index) in options" :key="index">
      <span class="u-radio" :class="{'u-radio-checked': value === option.value }"></span>
      <span class="u-label">{{ option.label }}</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-radio {
  display: inline-flex;
  height: 24px;
  .m-radio-wrap {
    color: #000000d9;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    &:hover {
      .u-radio {
        border-color: @themeColor;
      }
    }
    .u-radio {
      position: relative;
      display: inline-block;
      width: 14px;
      height: 14px;
      background: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 50%;
      transition: all .3s;
      vertical-align: top;
      top: 4px;
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin-top: -8px;
        margin-left: -8px;
        background-color: @themeColor;
        border-radius: 100%;
        transform: scale(0);
        opacity: 0;
        transition: all .3s cubic-bezier(.78,.14,.15,.86);
        content: "";
      }
    }
    .u-radio-checked {
      border-color: @themeColor;
      &:after {
        transform: scale(.5);
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
      .u-radio {
        border-color: #d9d9d9;
      }
    }
    .u-radio {
      border-color: #d9d9d9;
      background-color: #f5f5f5;
      &:after {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
.vertical {
  display: inline-block;
}
</style>
