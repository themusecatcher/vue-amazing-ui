<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
interface Option {
  label: string // 选项名
  value: string | number | boolean // 选项值
  disabled?: boolean // 是否禁用选项
}
interface Props {
  options?: Option[] // 单选框选项数据
  disabled?: boolean // 是否禁用
  vertical?: boolean // 是否垂直排列，仅当 button: false 时生效
  checked?: boolean // (v-model) 当前是否选中
  gap?: number | number[] // 多个单选框之间的间距；垂直排列时为垂直间距，单位 px；数组间距用于水平排列折行时：[水平间距, 垂直间距]；仅当 button: false 时生效
  width?: string | number // 单选区域最大宽度，超出后折行，单位 px；仅当 button: false 时生效
  height?: string | number // 单选区域最大高度，超出后滚动，单位 px；仅当 button: false 时生效
  button?: boolean // 是否启用按钮样式
  buttonStyle?: 'outline' | 'solid' // 按钮样式风格
  buttonSize?: 'small' | 'middle' | 'large' // 按钮大小；仅当 button: true 时生效
  value?: string | number | boolean // (v-model) 当前选中的值
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  checked: false,
  gap: 8,
  width: 'auto',
  height: 'auto',
  button: false,
  buttonStyle: 'outline',
  buttonSize: 'middle',
  value: undefined
})
const radioChecked = ref<boolean>()
const optionsCheckedValue = ref<string | number | boolean>()
const emits = defineEmits(['update:checked', 'update:value', 'change'])
const optionsAmount = computed(() => {
  // 选项总数
  return props.options.length
})
const maxWidth = computed(() => {
  // 单选区域最大宽度
  if (!props.button) {
    if (typeof props.width === 'number') {
      return props.width + 'px'
    } else {
      return props.width
    }
  } else {
    return 'auto'
  }
})
const maxHeight = computed(() => {
  // 单选区域最大高度
  if (!props.button) {
    if (typeof props.height === 'number') {
      return props.height + 'px'
    } else {
      return props.height
    }
  } else {
    return 'auto'
  }
})
const gapValue = computed(() => {
  if (!props.button) {
    if (!props.vertical && Array.isArray(props.gap)) {
      return `${props.gap[1]}px ${props.gap[0]}px`
    }
    return `${props.gap}px`
  } else {
    return 0
  }
})
watchEffect(() => {
  radioChecked.value = props.checked
})
watchEffect(() => {
  optionsCheckedValue.value = props.value
})
function checkDisabled(disabled: boolean | undefined) {
  if (disabled === undefined) {
    return props.disabled
  } else {
    return disabled
  }
}
function onClick(value: string | number | boolean) {
  if (value !== optionsCheckedValue.value) {
    optionsCheckedValue.value = value
    emits('update:value', value)
    emits('change', value)
  }
}
function onChecked() {
  if (!radioChecked.value) {
    radioChecked.value = true
    emits('update:checked', true)
    emits('change', true)
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
    :style="`--radio-gap: ${gapValue}; --radio-max-width: ${maxWidth}; --radio-max-height: ${maxHeight};`"
  >
    <template v-if="optionsAmount">
      <template v-if="!button">
        <div
          class="m-radio-wrap"
          :class="{ 'radio-disabled': checkDisabled(option.disabled) }"
          v-for="(option, index) in options"
          :key="index"
          @click="checkDisabled(option.disabled) ? () => false : onClick(option.value)"
        >
          <span class="radio-handle" :class="{ 'radio-checked': optionsCheckedValue === option.value }"></span>
          <span class="radio-label">
            <slot :label="option.label">{{ option.label }}</slot>
          </span>
        </div>
      </template>
      <template v-else>
        <div
          tabindex="0"
          class="m-radio-button-wrap"
          :class="{
            'radio-button-checked': optionsCheckedValue === option.value,
            'radio-button-disabled': checkDisabled(option.disabled)
          }"
          v-for="(option, index) in options"
          :key="index"
          @click="checkDisabled(option.disabled) ? () => false : onClick(option.value)"
        >
          <span class="radio-label">
            <slot :label="option.label">{{ option.label }}</slot>
          </span>
        </div>
      </template>
    </template>
    <template v-else>
      <template v-if="!button">
        <div class="m-radio-wrap" :class="{ 'radio-disabled': disabled }" @click="disabled ? () => false : onChecked()">
          <span class="radio-handle" :class="{ 'radio-checked': radioChecked }"></span>
          <span class="radio-label">
            <slot></slot>
          </span>
        </div>
      </template>
      <template v-else>
        <div
          tabindex="0"
          class="m-radio-button-wrap"
          :class="{
            'radio-button-checked': radioChecked,
            'radio-button-disabled': disabled
          }"
          @click="disabled ? () => false : onChecked()"
        >
          <span class="radio-label">
            <slot></slot>
          </span>
        </div>
      </template>
    </template>
  </div>
</template>
<style lang="less" scoped>
.m-radio {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--radio-gap);
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1;
  max-width: var(--radio-max-width);
  max-height: var(--radio-max-height);
  overflow: auto;
  .m-radio-wrap {
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    &:not(.radio-disabled):hover {
      .radio-handle {
        border-color: @themeColor;
      }
    }
    .radio-handle {
      /*
        如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小
        如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
      */
      flex-shrink: 0; // 默认 1.即空间不足时，项目将缩小
      position: relative;
      top: 3px;
      width: 16px;
      height: 16px;
      background: transparent;
      border: 1px solid #d9d9d9;
      border-radius: 50%;
      transition: all 0.3s;
      &::after {
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 16px;
        height: 16px;
        margin-top: -8px;
        margin-left: -8px;
        background-color: #fff;
        border-top: 0;
        border-left: 0;
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
      line-height: 1.5714285714285714;
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
    border-top-width: 1px;
    border-left-width: 0;
    border-right-width: 1px;
    cursor: pointer;
    transition:
      all 0.2s,
      box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    &:focus-within {
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    }
    &:first-child {
      border-left: 1px solid #d9d9d9;
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
  flex-direction: column;
  flex-wrap: nowrap;
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
