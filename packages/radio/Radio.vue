<script setup lang="ts">
import { computed, watch } from 'vue'

interface Option {
  label: string,
  value: string|number,
  disabled?: boolean
}
interface Props {
  options: Array<Option>, // 单选元素数据
  disabled?: boolean, // 是否禁用
  value?: any, // 自定义分隔符
  gap?: number // 多个单选框之间的间距，单位px
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  value: null,
  gap: 8
})
const sum = computed(() => {
  return props.options.length
})
watch(
  () => props.value,
  (to) => {
    console.log('s to:', to)
  }
)
const emit = defineEmits(['update:value'])
function onClick (value: string|number) {
  emit('update:value', value)
}
</script>
<template>
  <div class="m-radio">
    <div class="m-radio-wrap" :style="`margin-right: ${sum !== index + 1 ? gap:0}px;`" @click="onClick(option.value)" v-for="(option, index) in options" :key="index">
      <div class="m-input" :class="{'m-radio-checked': value === option.value }">
        <input type="radio" class="u-radio-input" :value="option.value">
        <span class="u-radio-inner"></span>
      </div>
      <span class="u-label">{{ option.label }}</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-radio {
  width: 100%;
  display: inline-flex;
  height: 24px;
  .m-radio-wrap {
    color: #000000d9;
    font-size: 14px;
    line-height: 24px;
    // display: inline-flex;
    cursor: pointer;
    .m-input {
      width: 16px;
      height: 16px;
      position: relative;
      top: 2px;
      display: inline-block;
      cursor: pointer;
      &:hover {
        .u-radio-inner {
          border-color: @themeColor;
        }
      }
      .u-radio-input {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        cursor: pointer;
        opacity: 0;
      }
      .u-radio-inner {
        position: relative;
        display: inline-block;
        width: 14px;
        height: 14px;
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
    }
    .m-radio-checked {
      .u-radio-inner {
        border-color: @themeColor;
        &:after {
          transform: scale(.5);
          opacity: 1;
        }
      }
    }
    .u-label {
      padding: 0 8px;
      font-size: 16px;
      display: inline-block;
      line-height: 24px;
    }
  }
}
</style>
