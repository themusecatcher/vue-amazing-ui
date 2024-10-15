<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
interface Option {
  label: string // 选项名
  value: string | number // 选项值
  disabled?: boolean // 是否禁用选项
}
interface Props {
  options?: Option[] // 复选框选项数据
  disabled?: boolean // 是否禁用
  vertical?: boolean // 是否垂直排列
  value?: (string | number)[] // (v-model) 当前选中的值，配合 options 使用
  gap?: number | number[] // 多个复选框之间的间距；垂直排列时为垂直间距，单位 px；数组间距用于水平排列折行时：[水平间距, 垂直间距]
  width?: string | number // 复选区域最大宽度，超出后折行，单位 px
  height?: string | number // 复选区域最大高度，超出后滚动，单位 px
  indeterminate?: boolean // 全选时的样式控制
  checked?: boolean // (v-model) 当前是否选中
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  value: () => [],
  gap: 8,
  width: 'auto',
  height: 'auto',
  indeterminate: false,
  checked: false
})
const checkboxChecked = ref<boolean>()
const optionsCheckedValue = ref<any[]>([])
const emits = defineEmits(['update:value', 'update:checked', 'change'])
const optionsAmount = computed(() => {
  // 选项总数
  return props.options.length
})
const maxWidth = computed(() => {
  // 复选区域最大宽度
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const maxHeight = computed(() => {
  // 复选区域最大高度
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return props.height
  }
})
const gapValue = computed(() => {
  if (!props.vertical && Array.isArray(props.gap)) {
    return `${props.gap[1]}px ${props.gap[0]}px`
  }
  return `${props.gap}px`
})
watchEffect(() => {
  checkboxChecked.value = props.checked
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
function onClick(value: string | number) {
  if (optionsCheckedValue.value.includes(value)) {
    // 已选中
    const newVal = optionsCheckedValue.value.filter((target) => target !== value)
    optionsCheckedValue.value = newVal
    emits('update:value', newVal)
    emits('change', newVal)
  } else {
    // 未选中
    const newVal = [...optionsCheckedValue.value, value]
    optionsCheckedValue.value = newVal
    emits('update:value', newVal)
    emits('change', newVal)
  }
}
function onChecked() {
  checkboxChecked.value = !checkboxChecked.value
  emits('update:checked', checkboxChecked.value)
  emits('change', checkboxChecked.value)
}
</script>
<template>
  <div
    class="m-checkbox"
    :class="{ 'checkbox-vertical': vertical }"
    :style="`--checkbox-gap: ${gapValue}; --checkbox-max-width: ${maxWidth}; --checkbox-max-height: ${maxHeight};`"
  >
    <template v-if="optionsAmount">
      <div class="m-checkbox-wrap" v-for="(option, index) in options" :key="index">
        <div
          class="m-checkbox-box"
          :class="{ 'checkbox-disabled': checkDisabled(option.disabled) }"
          @click="checkDisabled(option.disabled) ? () => false : onClick(option.value)"
        >
          <span class="checkbox-box" :class="{ 'checkbox-checked': optionsCheckedValue.includes(option.value) }"></span>
          <span class="checkbox-label">
            <slot :label="option.label">{{ option.label }}</slot>
          </span>
        </div>
      </div>
    </template>
    <div v-else class="m-checkbox-wrap">
      <div
        class="m-checkbox-box"
        :class="{ 'checkbox-disabled': disabled }"
        @click="disabled ? () => false : onChecked()"
      >
        <span
          class="checkbox-box"
          :class="{
            'checkbox-checked': checkboxChecked && !indeterminate,
            'checkbox-indeterminate': indeterminate
          }"
        ></span>
        <span class="checkbox-label">
          <slot></slot>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-checkbox {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--checkbox-gap);
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1;
  max-width: var(--checkbox-max-width);
  max-height: var(--checkbox-max-height);
  overflow: auto;
  .m-checkbox-wrap {
    .m-checkbox-box {
      display: inline-flex;
      align-items: flex-start;
      cursor: pointer;
      &:not(.checkbox-disabled):hover {
        .checkbox-box {
          border-color: @themeColor;
        }
      }
      .checkbox-box {
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
        border-radius: 4px;
        transition: all 0.3s;
        &::after {
          box-sizing: border-box;
          position: absolute;
          top: 50%;
          left: 21.5%;
          display: table;
          width: 5.7142857142857135px;
          height: 9.142857142857142px;
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          transform: rotate(45deg) scale(0) translate(-50%, -50%);
          opacity: 0;
          content: '';
          transition:
            all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
            opacity 0.1s;
        }
      }
      .checkbox-checked {
        background-color: @themeColor;
        border-color: @themeColor;
        &::after {
          opacity: 1;
          transform: rotate(45deg) scale(1) translate(-50%, -50%);
          transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        }
      }
      .checkbox-indeterminate {
        &::after {
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
      .checkbox-label {
        word-break: break-all;
        padding: 0 8px;
        line-height: 1.5714285714285714;
      }
    }
    .checkbox-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
      .checkbox-box {
        border-color: #d9d9d9;
        background-color: rgba(0, 0, 0, 0.04);
        &::after {
          border-color: rgba(0, 0, 0, 0.25);
          animation-name: none;
        }
      }
    }
  }
}
.checkbox-vertical {
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
