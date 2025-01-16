<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface Props {
  width?: string | number // 输入框宽度，单位 px
  size?: 'small' | 'middle' | 'large' // 输入框大小
  addonBefore?: string // 设置前置标签 string | slot
  addonAfter?: string // 设置后置标签 string | slot
  prefix?: string // 前缀图标 string | slot
  suffix?: string // 后缀图标 string | slot
  allowClear?: boolean // 可以点击清除图标删除内容
  password?: boolean // 是否启用密码框
  disabled?: boolean // 是否禁用
  placeholder?: string // 文本输入的占位符
  maxlength?: number // 最大长度
  showCount?: boolean // 是否展示字数
  value?: string // (v-model) 输入框内容
  valueModifiers?: object // 用于访问组件的 v-model 上添加的修饰符
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  size: 'middle',
  addonBefore: undefined,
  addonAfter: undefined,
  prefix: undefined,
  suffix: undefined,
  allowClear: false,
  password: false,
  disabled: false,
  placeholder: undefined,
  maxlength: undefined,
  showCount: false,
  value: undefined,
  valueModifiers: () => ({})
})
const inputRef = ref() // input 元素引用
const inputWrapHover = ref<boolean>(false) // 鼠标是否悬浮
const inputFocus = ref<boolean>(false) // input 元素是否聚焦
const inputValue = ref<string>() // 输入框的值
const showPassword = ref<boolean>(false) // 是否显示密码
const emits = defineEmits(['update:value', 'change', 'enter'])
const slotsExist = useSlotsExist(['prefix', 'suffix', 'addonBefore', 'addonAfter'])
const inputWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const showClear = computed(() => {
  return !props.disabled && props.allowClear
})
const showCountNum = computed(() => {
  if (props.maxlength) {
    return `${props.value ? props.value.length : 0} / ${props.maxlength}`
  }
  return props.value ? props.value.length : 0
})
const showPrefix = computed(() => {
  return slotsExist.prefix || props.prefix
})
const showSuffix = computed(() => {
  return slotsExist.suffix || props.suffix
})
const showInputSuffix = computed(() => {
  return showClear.value || props.password || props.showCount || showSuffix.value
})
const showBefore = computed(() => {
  return slotsExist.addonBefore || props.addonBefore
})
const showAfter = computed(() => {
  return slotsExist.addonAfter || props.addonAfter
})
const lazyInput = computed(() => {
  return 'lazy' in props.valueModifiers
})
watch(
  () => props.value,
  (to) => {
    if (inputValue.value !== to) {
      inputValue.value = to
    }
  },
  {
    immediate: true
  }
)
function onMouseEnter() {
  inputWrapHover.value = true
}
function onMouseLeave() {
  inputWrapHover.value = false
}
function onFocus() {
  inputFocus.value = true
}
function onBlur() {
  inputFocus.value = false
}
function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  inputValue.value = target.value
  if (!lazyInput.value) {
    emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
    emits('change', e)
  }
}
function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.value !== props.value) {
    emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
    emits('change', e)
  }
}
function onEnter(e: KeyboardEvent) {
  emits('enter', e)
  if (lazyInput.value) {
    const changeEvent = new Event('change')
    e.target?.dispatchEvent(changeEvent)
  }
}
function onClear() {
  emits('update:value', '')
  inputRef.value.focus()
}
function onPassword() {
  showPassword.value = !showPassword.value
}
</script>
<template>
  <div class="m-input" :style="`width: ${inputWidth};`">
    <span v-if="showBefore" class="input-addon" :class="{ 'addon-before': showBefore }">
      <slot name="addonBefore">{{ addonBefore }}</slot>
    </span>
    <div
      tabindex="1"
      class="input-wrap"
      :class="[
        `input-${size}`,
        {
          'input-before': showBefore,
          'input-after': showAfter,
          'input-disabled': disabled
        }
      ]"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="input-border"></div>
      <div class="input-border-state" :class="{ 'input-hover': inputWrapHover, 'input-focus': inputFocus }"></div>
      <span v-if="showPrefix" class="input-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        ref="inputRef"
        class="input-item"
        :type="password && !showPassword ? 'password' : 'text'"
        :value="inputValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @change="onChange"
        @keydown.enter.prevent="onEnter"
      />
      <span v-if="showInputSuffix" class="input-suffix">
        <span v-if="showClear" class="input-actions" :class="{ 'clear-hidden': !value }" @click="onClear">
          <svg
            class="clear-svg"
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
        <span v-if="password" class="input-actions" @click="onPassword">
          <svg
            v-show="showPassword"
            class="eye-svg"
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
            class="eye-svg"
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
        <span v-if="showCount" class="input-count">{{ showCountNum }}</span>
        <span v-if="showSuffix" class="suffix-item">
          <slot name="suffix">{{ suffix }}</slot>
        </span>
      </span>
    </div>
    <span v-if="showAfter" class="input-addon" :class="{ 'addon-after': showAfter }">
      <slot name="addonAfter">{{ addonAfter }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-input {
  width: 100%;
  text-align: start;
  vertical-align: top;
  position: relative;
  display: inline-table;
  border-collapse: separate;
  border-spacing: 0;
  .input-addon {
    position: relative;
    padding: 0 11px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.02);
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    line-height: 1;
    display: table-cell;
    width: 1px;
    white-space: nowrap;
    vertical-align: middle;
    transition: all 0.3s;
    :deep(svg) {
      fill: currentColor;
    }
  }
  .addon-before {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }
  .addon-after {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }
  .input-wrap {
    position: relative;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.5714285714285714;
    position: relative;
    display: inline-flex;
    vertical-align: top;
    width: 100%;
    min-width: 0;
    background-color: #ffffff;
    .input-border {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      border-radius: inherit;
      border: 1px solid #d9d9d9;
    }
    .input-border-state {
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      border-radius: inherit;
      border: 1px solid #d9d9d9;
      border-color: #00000000;
      transition: all 0.2s;
    }
    .input-hover {
      border: 1px solid #4096ff;
    }
    .input-focus {
      border: 1px solid #4096ff;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    }
    .input-prefix {
      margin-right: 4px;
      display: inline-flex;
      flex: none;
      align-items: center;
      :deep(svg) {
        fill: currentColor;
      }
    }
    .input-item {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.88);
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
    .input-suffix {
      margin-left: 4px;
      display: inline-flex;
      flex: none;
      gap: 8px;
      align-items: center;
      .input-actions {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        .clear-svg {
          display: inline-block;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.25);
          fill: currentColor;
          transition: color 0.3s;
          &:hover {
            color: rgba(0, 0, 0, 0.45);
          }
        }
        .eye-svg {
          display: inline-block;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          fill: currentColor;
          transition: color 0.3s;
          &:hover {
            color: rgba(0, 0, 0, 0.85);
          }
        }
      }
      .clear-hidden {
        visibility: hidden;
      }
      .input-count {
        color: rgba(0, 0, 0, 0.45);
      }
      .suffix-item {
        display: flex;
        flex: none;
        align-items: center;
        :deep(svg) {
          fill: currentColor;
        }
      }
    }
  }
  .input-small {
    padding: 1px 7px;
    border-radius: 4px;
  }
  .input-middle {
    padding: 5px 11px;
    border-radius: 6px;
  }
  .input-large {
    padding: 8px 11px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 8px;
    .input-item {
      font-size: 16px;
      line-height: 1.5;
    }
  }
  .input-before {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .input-after {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
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
    .input-item {
      color: rgba(0, 0, 0, 0.25);
      background-color: transparent;
      cursor: not-allowed;
    }
  }
}
</style>
