<script setup lang="ts">
import { ref, computed, watchEffect, nextTick } from 'vue'
import { useSlotsExist, useInject } from 'components/utils'
export interface Option {
  label: string // 选项名
  value: string | number // 选项值
  disabled?: boolean // 是否禁用选项
}
export interface Props {
  options?: Option[] // 复选框选项数据
  disabled?: boolean // 是否禁用
  vertical?: boolean // 是否垂直排列
  value?: (string | number)[] // (v-model) 当前选中的值，配合 options 使用
  gap?: number | number[] // 多个复选框之间的间距；垂直排列时为垂直间距，单位 px；数组间距用于水平排列折行时：[水平间距, 垂直间距]
  indeterminate?: boolean // 全选时的样式控制
  checked?: boolean // (v-model) 当前是否选中
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  vertical: false,
  value: () => [],
  gap: 8,
  indeterminate: false,
  checked: false
})
const checkboxChecked = ref<boolean>(false) // v-model:checked 是否选中标志
const optionsCheckedValue = ref<(string | number)[]>([]) // v-model:value 已选中的选项值
const wave = ref<boolean>(false) // 使用 v-model:checked 时的复选框动画选中效果标志
const waveOptionsValue = ref<(string | number)[]>([]) // 使用 v-model:value 时的复选框动画选中效果标志
const { colorPalettes } = useInject('Checkbox') // 主题色注入
const emits = defineEmits(['update:value', 'update:checked', 'change'])
const slotsExist = useSlotsExist(['default'])
// 选项总数
const optionsAmount = computed(() => {
  return props.options.length
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
function checkDisabled(disabled: boolean | undefined): boolean {
  if (disabled === undefined) {
    return props.disabled
  } else {
    return disabled
  }
}
function onChecked(): void {
  startWave()
  checkboxChecked.value = !checkboxChecked.value
  emits('update:checked', checkboxChecked.value)
  emits('change', checkboxChecked.value)
}
function onClick(value: string | number): void {
  startOptionWave(value)
  if (optionsCheckedValue.value.includes(value)) {
    // 已选中
    const newVal = optionsCheckedValue.value.filter((target: string | number) => target !== value)
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
function startWave(): void {
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
function startOptionWave(value: string | number): void {
  if (waveOptionsValue.value.includes(value)) {
    waveOptionsValue.value = waveOptionsValue.value.filter((optionValue: string | number) => optionValue !== value)
    nextTick(() => {
      waveOptionsValue.value.push(value)
    })
  } else {
    waveOptionsValue.value.push(value)
  }
}
function onWaveOptionEnd(value: string | number): void {
  waveOptionsValue.value = waveOptionsValue.value.filter((optionValue: string | number) => optionValue !== value)
}
</script>
<template>
  <div
    v-if="optionsAmount"
    class="checkbox-wrap"
    :class="{ 'checkbox-vertical': vertical }"
    :style="`--checkbox-gap: ${gapValue}; --checkbox-primary-color: ${colorPalettes[5]};`"
    v-bind="$attrs"
  >
    <div
      class="checkbox-container"
      :class="{ 'checkbox-disabled': checkDisabled(option.disabled) }"
      v-for="(option, index) in options"
      :key="index"
      @click="checkDisabled(option.disabled) ? () => false : onClick(option.value)"
    >
      <span class="checkbox-box" :class="{ 'checkbox-checked': optionsCheckedValue.includes(option.value) }">
        <span
          v-if="!checkDisabled(option.disabled)"
          class="checkbox-wave"
          :class="{ 'wave-active': waveOptionsValue.includes(option.value) }"
          @animationend="onWaveOptionEnd(option.value)"
        ></span>
      </span>
      <span class="checkbox-label">
        <slot :option="option" :label="option.label" :index="index">{{ option.label }}</slot>
      </span>
    </div>
  </div>
  <div
    v-else
    class="checkbox-container"
    :class="{ 'checkbox-disabled': disabled }"
    :style="`--checkbox-primary-color: ${colorPalettes[5]};`"
    @click="disabled ? () => false : onChecked()"
    v-bind="$attrs"
  >
    <span
      class="checkbox-box"
      :class="{
        'checkbox-checked': checkboxChecked && !indeterminate,
        'checkbox-indeterminate': indeterminate
      }"
    >
      <span v-if="!disabled" class="checkbox-wave" :class="{ 'wave-active': wave }" @animationend="onWaveEnd"></span>
    </span>
    <span v-if="slotsExist.default" class="checkbox-label">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.checkbox-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--checkbox-gap);
}
.checkbox-vertical {
  flex-direction: column;
  flex-wrap: nowrap;
}
.checkbox-container {
  display: inline-flex;
  align-items: baseline;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  &:not(.checkbox-disabled):hover {
    .checkbox-box {
      border-color: var(--checkbox-primary-color);
    }
  }
  .checkbox-box {
    /*
      如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小
      如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
    */
    flex-shrink: 0; // 默认 1.即空间不足时，项目将缩小
    align-self: center;
    position: relative;
    width: 16px;
    height: 16px;
    background: transparent;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    &::after {
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
    .checkbox-wave {
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
          box-shadow: 0 0 0.5px 0 var(--checkbox-primary-color);
        }
        to {
          box-shadow: 0 0 0.5px 5px var(--checkbox-primary-color);
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
  }
  .checkbox-checked {
    background-color: var(--checkbox-primary-color);
    border-color: var(--checkbox-primary-color);
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
      background-color: var(--checkbox-primary-color);
      border: 0;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  .checkbox-label {
    word-break: break-all;
    padding: 0 8px;
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
</style>
