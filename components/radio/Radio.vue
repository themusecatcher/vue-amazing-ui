<script setup lang="ts">
interface Option {
  label: string // 选项名
  value: any // 选项值
  disabled?: boolean // 是否禁用单个单选器，默认 false
}
interface Props {
  options?: Option[] // 单选元素数据
  disabled?: boolean // 是否禁用
  vertical?: boolean // 是否垂直排列，仅当 button: false 时生效
  value?: any // (v-model) 当前选中的值
  gap?: number // 多个单选框之间的间距，单位px，垂直排列时，间距即垂直间距，仅当 button: false 时生效
  button?: boolean // 是否启用按钮样式
  buttonStyle?: 'outline' | 'solid' // 按钮样式风格
  buttonSize?: 'small' | 'middle' | 'large' // 按钮大小，仅当 button: true 时生效
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  value: null,
  gap: 8,
  button: false,
  buttonStyle: 'outline',
  buttonSize: 'middle'
})
const emits = defineEmits(['update:value', 'change'])
function onClick(value: any) {
  if (value !== props.value) {
    emits('update:value', value)
    emits('change', value)
  }
}
</script>
<template>
  <div
    class="m-radio"
    :class="{
      'radio-vertical': !button && vertical,
      'radio-button-solid': buttonStyle === 'solid',
      'radio-button-small': button && buttonSize === 'small',
      'radio-button-large': button && buttonSize === 'large'
    }"
    :style="`gap: ${button ? 0 : gap}px;`"
  >
    <div
      v-if="!button"
      class="m-radio-wrap"
      :class="{ 'radio-disabled': disabled || option.disabled }"
      v-for="(option, index) in options"
      :key="index"
      @click="disabled || option.disabled ? () => false : onClick(option.value)"
    >
      <span class="radio-handle" :class="{ 'radio-checked': value === option.value }"></span>
      <span class="radio-label">
        <slot :label="option.label">{{ option.label }}</slot>
      </span>
    </div>
    <template v-else>
      <div
        tabindex="0"
        class="m-radio-button-wrap"
        :class="{
          'radio-button-checked': value === option.value,
          'radio-button-disabled': disabled || option.disabled
        }"
        v-for="(option, index) in options"
        :key="index"
        @click="disabled || option.disabled ? () => false : onClick(option.value)"
      >
        <span class="radio-label">
          <slot :label="option.label">{{ option.label }}</slot>
        </span>
      </div>
    </template>
  </div>
</template>
<style lang="less" scoped>
.m-radio {
  display: inline-flex;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1;
  .m-radio-wrap {
    height: 100%;
    display: inline-flex; // 设置为flex布局后，所有的子元素都会变成行内块元素
    align-items: flex-start;
    cursor: pointer;
    &:not(.radio-disabled):hover {
      .radio-handle {
        border-color: @themeColor;
      }
    }
    .radio-handle {
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
      transition: all 0.3s;
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
        transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        content: '';
      }
    }
    .radio-checked {
      border-color: @themeColor;
      background-color: @themeColor;
      &::after {
        transform: scale(0.375);
        opacity: 1;
        transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
    }
    .radio-label {
      word-break: break-all;
      padding: 0 8px;
      font-size: 14px;
      line-height: 22px;
      display: inline-block;
    }
  }
  .radio-disabled {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    .radio-handle {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
      cursor: not-allowed;
      &::after {
        transform: scale(0.5);
        background-color: rgba(0, 0, 0, 0.25);
      }
    }
  }
  .m-radio-button-wrap {
    position: relative;
    height: 32px;
    padding-inline: 15px;
    line-height: 30px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-block-start-width: 1px;
    border-inline-start-width: 0;
    border-inline-end-width: 1px;
    cursor: pointer;
    transition:
      all 0.2s,
      box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    &:focus-within {
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    }
    &:first-child {
      border-inline-start: 1px solid #d9d9d9;
      border-start-start-radius: 6px;
      border-end-start-radius: 6px;
    }
    &:not(:first-child)::before {
      position: absolute;
      top: -1px;
      left: -1px;
      display: block;
      width: 1px;
      height: 100%;
      padding-block: 1px;
      box-sizing: content-box;
      background-color: #d9d9d9;
      transition: background-color 0.3s;
      content: '';
    }
    &:last-child {
      border-start-end-radius: 6px;
      border-end-end-radius: 6px;
    }
    &:not(.radio-button-disabled):hover {
      color: @themeColor;
    }
  }
  .radio-button-checked:not(.radio-button-disabled) {
    z-index: 1;
    color: @themeColor;
    background-color: #ffffff;
    border-color: @themeColor;
    &::before {
      background-color: @themeColor;
    }
  }
  .radio-button-disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: rgba(0, 0, 0, 0.04);
    border-color: #d9d9d9;
    cursor: not-allowed;
  }
  .radio-button-disabled.radio-button-checked {
    background-color: rgba(0, 0, 0, 0.15);
  }
}
.radio-vertical {
  display: inline-flex;
  flex-direction: column;
}
.radio-button-solid {
  .radio-button-checked:not(.radio-button-disabled) {
    color: #fff;
    background-color: @themeColor;
    border-color: @themeColor;
    &:hover {
      color: #fff;
    }
  }
}
.radio-button-small {
  .m-radio-button-wrap {
    height: 24px;
    padding-inline: 7px;
    line-height: 22px;
    &:first-child {
      border-start-start-radius: 4px;
      border-end-start-radius: 4px;
    }
    &:last-child {
      border-start-end-radius: 4px;
      border-end-end-radius: 4px;
    }
  }
}
.radio-button-large {
  .m-radio-button-wrap {
    height: 40px;
    font-size: 16px;
    line-height: 38px;
    &:first-child {
      border-start-start-radius: 8px;
      border-end-start-radius: 8px;
    }
    &:last-child {
      border-start-end-radius: 8px;
      border-end-end-radius: 8px;
    }
  }
}
</style>
