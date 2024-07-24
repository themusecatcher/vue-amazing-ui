<script setup lang="ts">
interface SegmentedOption {
  label?: string // 选项名
  value: string | number // 选项值
  disabled?: boolean // 是否禁用选项
  payload?: any // 自定义数据载体
}
interface Props {
  block?: boolean // 是否将宽度调整为父元素宽度，同时所有选项占据相同的宽度
  disabled?: boolean // 是否禁用
  options?: string[] | number[] | SegmentedOption[] // 选项数据
  size?: 'large' | 'middle' | 'small' // 控件尺寸
  value?: string | number // v-model 当前选中的值
}
const props = withDefaults(defineProps<Props>(), {
  block: false,
  disabled: false,
  options: () => [],
  size: 'middle',
  value: undefined
})
const emits = defineEmits(['update:value', 'change'])
function onSelected(value: string | number) {
  if (value !== props.value) {
    emits('update:value', value)
    emits('change', value)
  }
}
function getOptionDisabled(option: string | number | SegmentedOption) {
  if (typeof option == 'object') {
    return option?.disabled || false
  }
  return false
}
function getOptionValue(option: string | number | SegmentedOption) {
  if (typeof option == 'object') {
    return option.value
  }
  return option
}
function getOptionLabel(option: string | number | SegmentedOption) {
  if (typeof option == 'object') {
    return option.label
  }
  return option
}
</script>
<template>
  <div
    class="m-segmented"
    :class="{
      'segmented-small': size == 'small',
      'segmented-large': size == 'large',
      'segmented-block': block
    }"
  >
    <div class="m-segmented-group">
      <div
        class="m-segmented-item"
        :class="{
          'segmented-item-selected': value === getOptionValue(option),
          'segmented-item-disabled': disabled || getOptionDisabled(option),
          'segmented-item-block': block
        }"
        v-for="(option, index) in options"
        :key="index"
        @click="disabled || getOptionDisabled(option) ? () => false : onSelected(getOptionValue(option))"
      >
        <input
          class="segmented-item-input"
          type="radio"
          :checked="value === getOptionValue(option)"
          :disabled="disabled || getOptionDisabled(option)"
        />
        <div
          class="segmented-item-label"
          :title="typeof option === 'object' && option.payload ? undefined : String(getOptionLabel(option))"
        >
          <slot
            name="label"
            :label="getOptionLabel(option)"
            :payload="typeof option === 'object' ? option.payload : {}"
            >{{ getOptionLabel(option) }}</slot
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-segmented {
  display: inline-block;
  padding: 2px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5714285714285714;
  background-color: #f5f5f5;
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  .m-segmented-group {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-items: flex-start;
    width: 100%;
    .m-segmented-item {
      position: relative;
      text-align: center;
      cursor: pointer;
      transition:
        color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
        background-color 0.2s;
      border-radius: 4px;
      &:hover:not(.segmented-item-selected):not(.segmented-item-disabled) {
        color: rgba(0, 0, 0, 0.88);
        &::after {
          background-color: rgba(0, 0, 0, 0.06);
        }
      }
      &::after {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        inset-inline-start: 0;
        border-radius: inherit;
        transition: background-color 0.2s;
        pointer-events: none;
        content: '';
      }
      .segmented-item-input {
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
      }
      .segmented-item-label {
        min-height: 28px;
        line-height: 28px;
        padding: 0 11px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .segmented-item-selected {
      background-color: #ffffff;
      box-shadow:
        0 1px 2px 0 rgba(0, 0, 0, 0.03),
        0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);
      color: rgba(0, 0, 0, 0.88);
    }
    .segmented-item-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
}
.segmented-small {
  border-radius: 4px;
  .m-segmented-group .m-segmented-item {
    border-radius: 2px;
    .segmented-item-label {
      min-height: 20px;
      line-height: 20px;
      padding: 0 7px;
    }
  }
}
.segmented-large {
  border-radius: 8px;
  .m-segmented-group .m-segmented-item {
    border-radius: 6px;
    .segmented-item-label {
      min-height: 36px;
      line-height: 36px;
      padding: 0 11px;
      font-size: 16px;
    }
  }
}
.segmented-block {
  display: flex;
  width: 100%;
  .m-segmented-group .m-segmented-item {
    flex: 1;
    min-width: 0;
  }
}
</style>
