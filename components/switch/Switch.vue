<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useInject } from 'components/utils'
export interface Props {
  checked?: string // 选中时的内容 string | slot
  checkedValue?: boolean | string | number // 选中时的值
  unchecked?: string // 未选中时的内容 string | slot
  uncheckedValue?: boolean | string | number // 未选中时的值
  loading?: boolean // 是否加载中
  disabled?: boolean // 是否禁用
  size?: 'small' | 'middle' | 'large' // 开关大小
  rippleColor?: string // 点击时的波纹颜色，当自定义选中颜色时需要设置
  circleStyle?: CSSProperties // 圆点样式
  modelValue?: boolean | string | number // (v-model) 指定当前是否选中
}
const props = withDefaults(defineProps<Props>(), {
  checked: undefined,
  checkedValue: true,
  unchecked: undefined,
  uncheckedValue: false,
  loading: false,
  disabled: false,
  size: 'middle',
  rippleColor: undefined,
  circleStyle: () => ({}),
  modelValue: false
})
const wave = ref<boolean>(false)
const { colorPalettes } = useInject('Switch') // 主题色注入
const emit = defineEmits(['update:modelValue', 'change'])
function onSwitch(): void {
  if (props.modelValue === props.checkedValue) {
    emit('update:modelValue', props.uncheckedValue)
    emit('change', props.uncheckedValue)
  } else {
    emit('update:modelValue', props.checkedValue)
    emit('change', props.checkedValue)
  }
  if (wave.value) {
    wave.value = false
    nextTick(() => {
      wave.value = true
    })
  } else {
    wave.value = true
  }
}
function onWaveEnd(): void {
  wave.value = false
}
</script>
<template>
  <div
    class="switch-wrap"
    :class="{
      'switch-loading': loading,
      'switch-small': size === 'small',
      'switch-large': size === 'large',
      'switch-checked': modelValue === checkedValue,
      'switch-disabled': disabled
    }"
    :style="`
      --switch-primary-color: ${colorPalettes[5]};
      --switch-primary-color-hover: ${colorPalettes[4]};
      --switch-ripple-color: ${rippleColor || colorPalettes[5]};
    `"
    @click="disabled || loading ? () => false : onSwitch()"
  >
    <div class="switch-inner">
      <span class="inner-checked">
        <slot name="checked">{{ checked }}</slot>
      </span>
      <span class="inner-unchecked">
        <slot name="unchecked">{{ unchecked }}</slot>
      </span>
    </div>
    <div class="switch-circle" :style="circleStyle">
      <svg v-if="loading" class="circular" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
      <slot name="node" :checked="modelValue"></slot>
    </div>
    <div v-if="!disabled" class="switch-wave" :class="{ 'wave-active': wave }" @animationend="onWaveEnd"></div>
  </div>
</template>
<style lang="less" scoped>
.switch-wrap {
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
  .switch-inner {
    display: block;
    overflow: hidden;
    border-radius: 100px;
    height: 100%;
    padding-left: 24px;
    padding-right: 9px;
    transition:
      padding-left 0.2s ease-in-out,
      padding-right 0.2s ease-in-out;
    .inner-checked {
      margin-left: calc(-100% + 22px - 48px);
      margin-right: calc(100% - 22px + 48px);
      display: block;
      text-align: center;
      color: #fff;
      font-size: 14px;
      transition:
        margin-left 0.2s ease-in-out,
        margin-right 0.2s ease-in-out;
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
      transition:
        margin-left 0.2s ease-in-out,
        margin-right 0.2s ease-in-out;
      pointer-events: none;
    }
  }
  .switch-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 100%;
    transition: all 0.2s ease-in-out;
    .circular {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 14px;
      height: 14px;
      animation: loadingRotate 2s linear infinite;
      -webkit-animation: loadingRotate 2s linear infinite;
      @keyframes loadingRotate {
        100% {
          transform: rotate(360deg);
        }
      }
      .path {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke: var(--switch-primary-color);
        stroke-width: 5;
        stroke-linecap: round;
        animation: loadingDash 1.5s ease-in-out infinite;
        -webkit-animation: loadingDash 1.5s ease-in-out infinite;
        @keyframes loadingDash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -40px;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -120px;
          }
        }
      }
    }
  }
}
.switch-loading {
  cursor: not-allowed;
  opacity: 0.65;
  .switch-inner,
  .switch-circle {
    box-shadow: none;
    cursor: not-allowed;
  }
}
.switch-small {
  min-width: 28px;
  height: 16px;
  line-height: 16px;
  .switch-inner {
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
  .switch-circle {
    width: 12px;
    height: 12px;
    .circular {
      width: 10px;
      height: 10px;
      .path {
        stroke-width: 4;
      }
    }
  }
}
.switch-large {
  min-width: 60px;
  height: 28px;
  line-height: 28px;
  .switch-inner {
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
  .switch-circle {
    width: 24px;
    height: 24px;
    .circular {
      width: 20px;
      height: 20px;
      .path {
        stroke-width: 6;
      }
    }
  }
}
.switch-checked {
  background: var(--switch-primary-color);
  &:hover:not(.switch-disabled) {
    background: var(--switch-primary-color-hover);
  }
  .switch-inner {
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
  .switch-circle {
    left: calc(100% - 20px);
  }
}
.switch-small.switch-checked {
  .switch-inner {
    padding-left: 6px;
    padding-right: 18px;
    .inner-unchecked {
      margin-left: calc(100% - 16px + 36px);
      margin-right: calc(-100% + 16px - 36px);
    }
  }
  .switch-circle {
    left: calc(100% - 14px);
  }
}
.switch-large.switch-checked {
  .switch-inner {
    padding-left: 12px;
    padding-right: 30px;
    .inner-unchecked {
      margin-left: calc(100% - 28px + 60px);
      margin-right: calc(-100% + 28px - 60px);
    }
  }
  .switch-circle {
    left: calc(100% - 26px);
  }
}
.switch-disabled {
  cursor: not-allowed;
  opacity: 0.65;
  .switch-circle {
    cursor: not-allowed;
  }
}
.switch-wave {
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
  animation-name: waveSpread, waveOpacity;
  @keyframes waveSpread {
    from {
      box-shadow: 0 0 0.5px 0 var(--switch-ripple-color);
    }
    to {
      box-shadow: 0 0 0.5px 5px var(--switch-ripple-color);
    }
  }
  @keyframes waveOpacity {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
