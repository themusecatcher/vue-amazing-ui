<script setup lang="ts">
import { computed } from 'vue'
interface Option {
  label: string // 选项名
  value: any // 选项值
  disabled?: boolean // 是否禁用单个单选器
}
interface Props {
  options: Array<Option> // 单选元素数据
  disabled?: boolean // 是否禁用所有子单选器
  vertical?: boolean // 是否垂直排列
  value?: any // 当前选中的值（v-model）
  gap?: number // 多个单选框之间的间距，单位px，垂直排列时，间距即垂直间距
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  value: null,
  gap: 8
})
const sum = computed(() => { // 选项总数
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
  <div class="m-radio">
    <div
      class="m-radio-wrap"
      :class="{'vertical': vertical}"
      :style="sum !== index + 1 ? styleObject: ''"
      v-for="(option, index) in options" :key="index">
      <div class="m-box" :class="{'disabled': disabled || option.disabled}" @click="(disabled || option.disabled) ? () => false : onClick(option.value)">
        <span class="u-radio" :class="{'u-radio-checked': value === option.value }"></span>
        <span class="u-label">
          <slot :label="option.label">{{ option.label }}</slot>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-radio {
  box-sizing: border-box;
  display: inline-block;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1;
  .m-radio-wrap {
    display: inline-block;
    height: 22px;
    .m-box {
      height: 100%;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        .u-radio {
          border-color: @themeColor;
        }
      }
      .u-radio {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 50%;
        transition: all .3s;
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
        font-size: 14px;
        line-height: 22px;
        display: inline-block;
      }
    }
    .disabled {
      color: rgba(0, 0, 0, 0.25);
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
    display: block;
  }
}
</style>
