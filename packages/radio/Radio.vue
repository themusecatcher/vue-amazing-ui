<script setup lang="ts">
import { computed } from 'vue'
interface Option {
  label: string // 选项名
  value: any // 选项值
  disabled?: boolean // 是否禁用单个单选器
}
interface Props {
  options: Array<Option> // 单选元素数据
  disabled?: boolean // 是否禁用
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
  display: inline-block;
  color: rgba(0, 0, 0, .88);
  font-size: 14px;
  line-height: 1;
  .m-radio-wrap {
    display: inline-block;
    .m-box {
      height: 100%;
      display: inline-flex; // 设置为flex布局后，所有的子元素都会变成行内块元素
      align-items: flex-start;
      cursor: pointer;
      &:hover {
        .u-radio {
          border-color: @themeColor;
        }
      }
      .u-radio {
        position: relative;
        /*
          如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小
          如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
        */
        flex-shrink: 0; // 默认 1.即空间不足时，项目将缩小
        margin-top: 3px;
        width: 16px;
        height: 16px;
        background: transparent;
        border: 1px solid #d9d9d9;
        border-radius: 50%;
        transition: all .3s;
        &::after {
          box-sizing: border-box;
          position: absolute;
          inset-block-start: 50%;
          inset-inline-start: 50%;
          display: block;
          width: 16px;
          height: 16px;
          margin-block-start: -8px;
          margin-inline-start: -8px;
          background-color: #fff;
          border-block-start: 0;
          border-inline-start: 0;
          border-radius: 16px;
          transform: scale(0);
          opacity: 0;
          transition: all .3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
          content: "";
        }
      }
      .u-radio-checked {
        border-color: @themeColor;
        background-color: @themeColor;
        &::after {
          transform: scale(.375);
          opacity: 1;
          transition: all .3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        }
      }
      .u-label {
        word-break: break-all;
        padding: 0 8px;
        font-size: 14px;
        line-height: 22px;
        display: inline-block;
      }
    }
    .disabled {
      color: rgba(0, 0, 0, .25);
      cursor: not-allowed;
      &:hover {
        .u-radio {
          border-color: #d9d9d9;
        }
      }
      .u-radio {
        background-color: rgba(0, 0, 0, .04);
        border-color: #d9d9d9;
        cursor: not-allowed;
        &::after {
          transform: scale(.5);
          background-color: rgba(0, 0, 0, .25);
        }
      }
    }
  }
  .vertical {
    display: block;
  }
}
</style>
