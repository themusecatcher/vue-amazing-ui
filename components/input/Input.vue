<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
import { ref, computed, useSlots } from 'vue'
interface Props {
  width?: string | number // 输入框宽度
  addonBefore?: string // 设置前置标签 string | slot
  addonAfter?: string // 设置后置标签 string | slot
  allowClear?: boolean // 可以点击清除图标删除内容
  password?: boolean // 是否启用密码框
  disabled?: boolean // 是否禁用
  maxlength?: number // 最大长度
  showCount?: boolean // 是否展示字数
  size?: 'large' | 'middle' | 'small' // 输入框大小
  prefix?: string // 前缀图标 string | slot
  suffix?: string // 后缀图标 string | slot
  value?: string // (v-model) 输入框内容
  valueModifiers?: object // 用于访问组件的 v-model 上添加的修饰符
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  addonBefore: undefined,
  addonAfter: undefined,
  allowClear: false,
  password: false,
  disabled: false,
  maxlength: undefined,
  showCount: false,
  size: 'middle',
  prefix: undefined,
  suffix: undefined,
  value: undefined,
  valueModifiers: () => ({})
})
const inputWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const showCountNum = computed(() => {
  if (props.maxlength) {
    return (props.value ? props.value.length : 0) + ' / ' + props.maxlength
  }
  return props.value ? props.value.length : 0
})
const slots = useSlots()
const showPrefix = computed(() => {
  const prefixSlots = slots.prefix?.()
  if (prefixSlots) {
    return Boolean(prefixSlots[0].children !== 'v-if' && prefixSlots?.length)
  }
  return props.prefix
})
const showSuffix = computed(() => {
  const suffixSlots = slots.suffix?.()
  if (suffixSlots) {
    return Boolean(suffixSlots[0].children !== 'v-if' && suffixSlots?.length)
  }
  return props.suffix
})
const showBefore = computed(() => {
  const addonBeforeSlots = slots.addonBefore?.()
  if (addonBeforeSlots) {
    return Boolean(addonBeforeSlots[0].children !== 'v-if' && addonBeforeSlots?.length)
  }
  return props.addonBefore
})
const showAfter = computed(() => {
  const addonAfterSlots = slots.addonAfter?.()
  if (addonAfterSlots) {
    return Boolean(addonAfterSlots[0].children !== 'v-if' && addonAfterSlots?.length)
  }
  return props.addonAfter
})
const lazyInput = computed(() => {
  return 'lazy' in props.valueModifiers
})
const emits = defineEmits(['update:value', 'change', 'enter'])
function onInput(e: InputEvent) {
  if (!lazyInput.value) {
    emits('update:value', (e.target as HTMLInputElement).value)
    emits('change', e)
  }
}
function onChange(e: InputEvent) {
  if (lazyInput.value) {
    emits('update:value', (e.target as HTMLInputElement).value)
    emits('change', e)
  }
}
function onKeyboard(e: KeyboardEvent) {
  emits('enter', e)
}
const input = ref()
function onClear() {
  emits('update:value', '')
  input.value.focus()
}
const showPassword = ref(false)
function onPassword() {
  showPassword.value = !showPassword.value
}
</script>
<template>
  <div class="m-input-wrap" :style="`width: ${inputWidth};`">
    <span class="m-addon" :class="{ 'addon-before': showBefore }" v-if="showBefore">
      <slot name="addonBefore">{{ addonBefore }}</slot>
    </span>
    <div
      tabindex="1"
      class="m-input"
      :class="[`${size}`, { 'input-disabled': disabled, 'input-before': showBefore, 'input-after': showAfter }]"
    >
      <span class="m-prefix" v-if="showPrefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        ref="input"
        class="u-input"
        :type="password && !showPassword ? 'password' : 'text'"
        :value="value"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="onInput"
        @change="onChange"
        @keydown.enter.prevent="onKeyboard"
        v-bind="$attrs"
      />
      <span class="m-suffix">
        <span class="m-action" v-if="!disabled && allowClear && value" @click="onClear">
          <svg
            class="u-clear"
            focusable="false"
            data-icon="close-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
            ></path>
          </svg>
        </span>
        <span class="m-action" v-if="password" @click="onPassword">
          <svg
            v-show="showPassword"
            class="u-eye"
            focusable="false"
            data-icon="eye"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
            ></path>
          </svg>
          <svg
            v-show="!showPassword"
            class="u-eye"
            focusable="false"
            data-icon="eye-invisible"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"
            ></path>
            <path
              d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"
            ></path>
          </svg>
        </span>
        <span class="m-count" v-if="showCount">{{ showCountNum }}</span>
        <slot name="suffix" v-if="showSuffix">{{ suffix }}</slot>
      </span>
    </div>
    <span class="m-addon" :class="{ 'addon-after': showAfter }" v-if="showAfter">
      <slot name="addonAfter">{{ addonAfter }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-input-wrap {
  width: 100%;
  text-align: start;
  vertical-align: top;
  position: relative;
  display: inline-table;
  border-collapse: separate;
  border-spacing: 0;
  .m-addon {
    position: relative;
    padding: 0 11px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.02);
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    transition: all 0.3s;
    line-height: 1;
    display: table-cell;
    width: 1px;
    white-space: nowrap;
    vertical-align: middle;
  }
  .addon-before {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    border-inline-end: 0;
  }
  .addon-after {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    border-inline-start: 0;
  }
  .m-input {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.5714285714285714;
    position: relative;
    display: inline-flex;
    width: 100%;
    min-width: 0;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    transition: all 0.2s;
    &:hover {
      border-color: #4096ff;
      border-inline-end-width: 1px;
      z-index: 1;
    }
    &:focus-within {
      border-color: #4096ff;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      border-inline-end-width: 1px;
      outline: 0;
    }
    .m-prefix {
      margin-inline-end: 4px;
      display: flex;
      flex: none;
      align-items: center;
    }
    .u-input {
      font-size: 14px;
      line-height: 1.5714285714285714;
      position: relative;
      display: inline-block;
      width: 100%;
      min-width: 0;
      background-color: #ffffff;
      border: none;
      outline: none;
      text-overflow: ellipsis;
      transition: all 0.2s;
    }
    input:disabled {
      color: rgba(0, 0, 0, 0.25);
    }
    input::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    input:-moz-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    input::-moz-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    input:-ms-input-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    .m-suffix {
      margin-inline-start: 4px;
      display: flex;
      flex: none;
      gap: 4px;
      align-items: center;
      .m-action {
        cursor: pointer;
        .u-clear {
          font-size: 12px;
          display: inline-block;
          fill: rgba(0, 0, 0, 0.25);
          text-align: center;
          line-height: 0;
          vertical-align: -0.08em;
          transition: fill 0.3s;
          &:hover {
            fill: rgba(0, 0, 0, 0.45);
          }
        }
        .u-eye {
          font-size: 14px;
          display: inline-block;
          fill: rgba(0, 0, 0, 0.45);
          text-align: center;
          line-height: 1;
          vertical-align: -0.125em;
          transition: fill 0.3s;
          &:hover {
            fill: rgba(0, 0, 0, 0.85);
          }
        }
      }
      .m-count {
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  .large {
    padding: 7px 11px;
    font-size: 16px;
    line-height: 1.5714285714285714;
    border-radius: 8px;
  }
  .middle {
    padding: 4px 11px;
    border-radius: 6px;
  }
  .small {
    padding: 0px 7px;
    border-radius: 4px;
  }
  .input-before {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  .input-after {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
  .input-disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: rgba(0, 0, 0, 0.04);
    cursor: not-allowed;
    &:hover {
      border-color: #d9d9d9;
    }
    &:focus-within {
      border-color: #d9d9d9;
      box-shadow: none;
    }
    .u-input {
      background-color: transparent;
      cursor: not-allowed;
    }
  }
}
</style>
