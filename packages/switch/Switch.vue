<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
interface Props {
  onInfo?: string // 选中时的内容
  offInfo?: string // 未选中时的内容
  size?: 'small' | 'middle' | 'large' // 开关大小
  nodeStyle?: CSSProperties // 节点样式
  disabled?: boolean // 是否禁用
  checked?: boolean // (v-model) 指定当前是否选中
}
const props = withDefaults(defineProps<Props>(), {
  onInfo: undefined,
  offInfo: undefined,
  size: 'middle',
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
    :class="{
      'switch-small': size === 'small',
      'switch-large': size === 'large',
      'switch-checked': checked,
      'switch-disabled': disabled
    }"
    @click="disabled ? () => false : onSwitch()"
  >
    <div class="m-switch-inner">
      <span class="inner-checked">{{ onInfo }}</span>
      <span class="inner-unchecked">{{ offInfo }}</span>
    </div>
    <div class="u-switch-node" :style="nodeStyle">
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
  .m-switch-inner {
    display: block;
    overflow: hidden;
    border-radius: 100px;
    height: 100%;
    padding-left: 24px;
    padding-right: 9px;
    transition: padding-left 0.2s ease-in-out, padding-right 0.2s ease-in-out;
    .inner-checked {
      margin-left: calc(-100% + 22px - 48px);
      margin-right: calc(100% - 22px + 48px);
      display: block;
      text-align: center;
      color: #fff;
      font-size: 14px;
      transition: margin-left 0.2s ease-in-out, margin-right 0.2s ease-in-out;
      pointer-events: none;
    }
    .inner-unchecked {
      margin-top: -22px;
      margin-left: 0;
      margin-right: 0;
      display: block;
      text-align: center;
      color: #fff;
      font-size: 14px;
      transition: margin-left 0.2s ease-in-out, margin-right 0.2s ease-in-out;
      pointer-events: none;
    }
  }
  .u-switch-node {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 2px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
}
.switch-small {
  min-width: 28px;
  height: 16px;
  line-height: 16px;
  .m-switch-inner {
    padding-left: 18px;
    padding-right: 6px;
    .inner-checked {
      font-size: 12px;
      margin-left: calc(-100% + 16px - 36px);
      margin-right: calc(100% - 16px + 36px);
    }
    .inner-unchecked {
      font-size: 12px;
      margin-top: -16px;
    }
  }
  .u-switch-node {
    width: 12px;
    height: 12px;
  }
}
.switch-large {
  min-width: 60px;
  height: 28px;
  line-height: 28px;
  .m-switch-inner {
    padding-left: 30px;
    padding-right: 12px;
    .inner-checked {
      font-size: 18px;
      margin-left: calc(-100% + 28px - 60px);
      margin-right: calc(100% - 28px + 60px);
    }
    .inner-unchecked {
      font-size: 18px;
      margin-top: -28px;
    }
  }
  .u-switch-node {
    width: 24px;
    height: 24px;
  }
}
.switch-checked {
  background: @themeColor;
  &:hover:not(.switch-disabled) {
    background: #4096ff;
  }
  .m-switch-inner {
    padding-left: 9px;
    padding-right: 24px;
    .inner-checked {
      margin-left: 0;
      margin-right: 0;
    }
    .inner-unchecked {
      margin-left: calc(100% - 22px + 48px);
      margin-right: calc(-100% + 22px - 48px);
    }
  }
  .u-switch-node {
    left: calc(100% - 20px);
  }
}
.switch-small.switch-checked {
  .m-switch-inner {
    padding-left: 6px;
    padding-right: 18px;
    .inner-unchecked {
      margin-left: calc(100% - 16px + 36px);
      margin-right: calc(-100% + 16px - 36px);
    }
  }
  .u-switch-node {
    left: calc(100% - 14px);
  }
}
.switch-large.switch-checked {
  .m-switch-inner {
    padding-left: 12px;
    padding-right: 30px;
    .inner-unchecked {
      margin-left: calc(100% - 28px + 60px);
      margin-right: calc(-100% + 28px - 60px);
    }
  }
  .u-switch-node {
    left: calc(100% - 26px);
  }
}
.switch-disabled {
  cursor: not-allowed;
  opacity: 0.65;
  .u-switch-node {
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
      box-shadow: 0 0 0.5px 5px @themeColor;
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
