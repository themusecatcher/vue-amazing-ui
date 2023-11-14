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
  button?: boolean // 是否启用按钮样式
  buttonStyle?: 'outline'|'solid' // 按钮样式风格
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  value: null,
  gap: 8,
  button: false,
  buttonStyle: 'outline'
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
  <div class="m-radio" :class="{'m-radio-button-solid': buttonStyle === 'solid'}">
    <template v-if="!button">
      <div
        class="m-radio-wrap"
        :class="{'vertical': vertical}"
        :style="sum !== index + 1 ? styleObject: ''"
        v-for="(option, index) in options" :key="index">
        <div class="m-box" :class="{'m-radio-disabled': disabled || option.disabled}" @click="(disabled || option.disabled) ? () => false : onClick(option.value)">
          <span class="u-radio" :class="{'u-radio-checked': value === option.value }"></span>
          <span class="u-label">
            <slot :label="option.label">{{ option.label }}</slot>
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="m-radio-button-wrap"
        :class="{
          'm-radio-button-checked': value === option.value,
          'm-radio-button-disabled': disabled || option.disabled,
        }"
        v-for="(option, index) in options" :key="index"
        @click="(disabled || option.disabled) ? () => false : onClick(option.value)">
        <span class="u-label">
          <slot :label="option.label">{{ option.label }}</slot>
        </span>
      </div>
    </template>
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
      &:not(.m-radio-disabled):hover {
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
    .m-radio-disabled {
      color: rgba(0, 0, 0, .25);
      cursor: not-allowed;
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
  .m-radio-button-wrap {
    position: relative;
    display: inline-block;
    height: 32px;
    margin: 0;
    padding-inline: 15px;
    padding-block: 0;
    line-height: 30px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-block-start-width: 1.02px;
    border-inline-start-width: 0;
    border-inline-end-width: 1px;
    cursor: pointer;
    transition: color .2s, background .2s, border-color .2s;
    &:first-child {
      border-inline-start: 1px solid #d9d9d9;
      border-start-start-radius: 6px;
      border-end-start-radius: 6px;
    }
    &:not(:first-child)::before {
      position: absolute;
      inset-block-start: -1px;
      inset-inline-start: -1px;
      display: block;
      box-sizing: content-box;
      width: 1px;
      height: 100%;
      padding-block: 1px;
      padding-inline: 0;
      background-color: #d9d9d9;
      transition: background-color .3s;
      content: "";
    }
    &:last-child {
      border-start-end-radius: 6px;
      border-end-end-radius: 6px;
    }
    &:not(.m-radio-button-disabled):hover {
      color: @themeColor;
    }
  }
  .m-radio-button-checked:not(.m-radio-button-disabled) {
    z-index: 1;
    color: @themeColor;
    background: #ffffff;
    border-color: @themeColor;
    &::before {
      background-color: @themeColor;
    }
  }
  .m-radio-button-disabled {
    color: rgba(0, 0, 0, .25);
    background-color: rgba(0, 0, 0, .04);
    border-color: #d9d9d9;
    cursor: not-allowed;
  }
  .m-radio-button-disabled.m-radio-button-checked {
    background-color: rgba(0, 0, 0, .15);
  }
  .vertical {
    display: block;
  }
}
.m-radio-button-solid {
  .m-radio-button-checked:not(.m-radio-button-disabled) {
    color: #fff;
    background: @themeColor;
    border-color: @themeColor;
    &:hover {
      color: #fff;
    }
  }
}
</style>
