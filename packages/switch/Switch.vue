<script setup lang="ts">
import { ref, watch } from 'vue'
interface Props {
  checkedInfo?: string, // 选中时的内容
  uncheckedInfo?: string, // 未选中时的内容
  disabled?: boolean, // 是否禁用
  checked?: boolean // （v-model）指定当前是否选中
}
const props = withDefaults(defineProps<Props>(), {
  checkedInfo: '',
  uncheckedInfo: '',
  disabled: false,
  checked: false
})
const checked = ref(props.checked)
watch(
  () => props.checked,
  (to): void => {
    checked.value = to
  }
)
const emit = defineEmits(['update:checked', 'change'])
function onSwitch () {
  emit('update:checked', !checked.value)
  emit('change', !checked.value)
}
</script>
<template>
  <div class="m-switch-wrap">
    <div @click="disabled ? (e:Event) => e.preventDefault() : onSwitch()" :class="['m-switch', { 'switch-checked': checked, 'disabled': disabled }]">
      <div :class="['u-switch-inner', checked ? 'inner-checked' : 'inner-unchecked' ]">{{ checked ? checkedInfo : uncheckedInfo }}</div>
      <div :class="['u-node', { 'node-checked': checked }]"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-switch-wrap {
  height: 22px;
  min-width: 44px;
  display: inline-block;
  .m-switch {
    position: relative;
    height: 22px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    background: rgba(0,0,0,.25);
    border-radius: 100px;
    cursor: pointer;
    transition: background .36s;
    .u-switch-inner {
      display: inline-block;
      color: #fff;
      font-size: 14px;
      line-height: 22px;
      padding: 0 8px;
      transition: all .36s;
    }
    .inner-checked {
      margin-right: 18px;
    }
    .inner-unchecked {
      margin-left: 18px;
    }
    .u-node {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      background: #FFF;
      border-radius: 100%;
      cursor: pointer;
      transition: all .36s;
    }
    .node-checked { // 结果等价于right: 2px; 为了滑动效果都以左边为基准进行偏移
      left: 100%;
      margin-left: -2px;
      transform: translateX(-100%);
    }
  }
  .switch-checked {
    background: @themeColor;
  }
  .disabled {
    cursor: not-allowed;
    opacity: .4;
  }
}
</style>
