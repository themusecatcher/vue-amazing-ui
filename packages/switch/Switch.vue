<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
interface Props {
  onInfo?: string // 选中时的内容
  offInfo?: string // 未选中时的内容
  nodeStyle?: CSSProperties // 节点样式
  disabled?: boolean // 是否禁用
  checked?: boolean // (v-model) 指定当前是否选中
}
const props = withDefaults(defineProps<Props>(), {
  onInfo: undefined,
  offInfo: undefined,
  nodeStyle: () => ({}),
  disabled: false,
  checked: false
})
const wave = ref(false)
const emit = defineEmits(['update:checked', 'change'])
function onSwitch() {
  emit('update:checked', !props.checked)
  emit('change', !props.checked)
  if (wave.value) {
    wave.value = false
    nextTick(() => {
      wave.value = true
    })
  } else {
    wave.value = true
  }
}
function onWaveEnd() {
  wave.value = false
}
</script>
<template>
  <div
    class="m-switch"
    :class="{ 'switch-checked': checked, 'switch-disabled': disabled }"
    @click="disabled ? () => false : onSwitch()"
  >
    <div :class="['u-switch-inner', checked ? 'inner-checked' : 'inner-unchecked']">{{
      checked ? onInfo : offInfo
    }}</div>
    <div :class="['u-node', { 'node-checked': checked }]" :style="nodeStyle">
      <slot name="node"></slot>
    </div>
    <div v-if="!disabled" class="m-switch-wave" :class="{ 'wave-active': wave }" @animationend="onWaveEnd"></div>
  </div>
</template>
<style lang="less" scoped>
.m-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  min-width: 44px;
  height: 22px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 22px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  &:hover:not(.switch-disabled) {
    background: rgba(0, 0, 0, 0.45);
  }
  .u-switch-inner {
    color: #fff;
    font-size: 14px;
    line-height: 22px;
    padding: 0 8px;
    transition: all 0.2s ease-in-out;
  }
  .inner-checked {
    margin-right: 18px;
  }
  .inner-unchecked {
    margin-left: 18px;
  }
  .u-node {
    position: absolute;
    left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .node-checked {
    // 结果等价于right: 2px; 为了滑动效果都以左边为基准进行偏移
    left: 100%;
    margin-left: -2px;
    transform: translateX(-100%);
  }
}
.switch-checked {
  background: @themeColor;
  &:hover:not(.switch-disabled) {
    background: #4096ff;
  }
}
.switch-disabled {
  cursor: not-allowed;
  opacity: 0.65;
  .u-node {
    cursor: not-allowed;
  }
}
.m-switch-wave {
  position: absolute;
  pointer-events: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation-iteration-count: 1;
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1), cubic-bezier(0, 0, 0.2, 1);
  border-radius: inherit;
}
.wave-active {
  z-index: 1;
  animation-name: wave-spread, wave-opacity;
  @keyframes wave-spread {
    from {
      box-shadow: 0 0 0.5px 0 @themeColor;
    }
    to {
      box-shadow: 0 0 0.5px 5.5px @themeColor;
    }
  }
  @keyframes wave-opacity {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
