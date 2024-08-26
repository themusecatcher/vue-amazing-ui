<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
import { ref, computed, nextTick } from 'vue'
import Button from '../button'
import { useSlotsExist } from '../utils'
interface Props {
  width?: string | number // 搜索框宽度，单位 px
  icon?: boolean // 搜索图标 boolean | slot
  search?: string // 搜索按钮，默认时为搜索图标 string | slot
  searchProps?: object // 设置搜索按钮的属性，参考 Button Props
  size?: 'small' | 'middle' | 'large' // 搜索框大小
  allowClear?: boolean // 可以点击清除图标删除搜索框内容
  addonBefore?: string // 设置前置标签 string | slot
  prefix?: string // 前缀图标 string | slot
  suffix?: string // 后缀图标 string | slot
  loading?: boolean // 是否搜索中
  disabled?: boolean // 是否禁用
  maxlength?: number // 文本最大长度
  showCount?: boolean // 是否展示字数
  value?: string // (v-model) 搜索框内容
  valueModifiers?: object // 用于访问组件的 v-model 上添加的修饰符
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  icon: true,
  search: undefined,
  searchProps: () => ({}),
  size: 'middle',
  addonBefore: undefined,
  prefix: undefined,
  suffix: undefined,
  allowClear: false,
  loading: false,
  disabled: false,
  maxlength: undefined,
  showCount: false,
  value: undefined,
  valueModifiers: () => ({})
})
const inputSearchWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const showClear = computed(() => {
  return !props.disabled && props.allowClear
})
const showCountNum = computed(() => {
  if (props.maxlength) {
    return (props.value ? props.value.length : 0) + ' / ' + props.maxlength
  }
  return props.value ? props.value.length : 0
})
const slotsExist = useSlotsExist(['prefix', 'suffix', 'addonBefore'])
const showPrefix = computed(() => {
  return slotsExist.prefix || props.prefix
})
const showSuffix = computed(() => {
  return slotsExist.suffix || props.suffix
})
const showInputSuffix = computed(() => {
  return showClear.value || props.showCount || showSuffix.value
})
const showBefore = computed(() => {
  return slotsExist.addonBefore || props.addonBefore
})
const lazyInput = computed(() => {
  return 'lazy' in props.valueModifiers
})
const emits = defineEmits(['update:value', 'change', 'search'])
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
const input = ref()
function onClear() {
  emits('update:value', '')
  input.value.focus()
}
async function onInputSearch(e: KeyboardEvent) {
  if (!lazyInput.value) {
    onSearch()
  } else {
    if (lazyInput.value) {
      input.value.blur()
      await nextTick()
      input.value.focus()
    }
    emits('search', props.value)
  }
}
function onSearch() {
  emits('search', props.value)
}
</script>
<template>
  <div class="m-input-search-wrap" :style="`width: ${inputSearchWidth};`">
    <span class="m-addon-before" :class="`addon-before-${size}`" v-if="showBefore">
      <slot name="addonBefore">{{ addonBefore }}</slot>
    </span>
    <div
      tabindex="1"
      class="m-input-search"
      :class="[
        `input-search-${size}`,
        {
          'input-search-before': showBefore,
          'input-search-disabled': disabled
        }
      ]"
    >
      <span class="m-prefix" v-if="showPrefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        ref="input"
        class="input-search"
        type="text"
        :value="value"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="onInput"
        @change="onChange"
        @keydown.enter.prevent="onInputSearch"
        v-bind="$attrs"
      />
      <span v-if="showInputSuffix" class="input-search-suffix">
        <span v-if="showClear" class="m-clear" :class="{ 'clear-hidden': !value }" @click="onClear">
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
        <span v-if="showCount" class="input-search-count">{{ showCountNum }}</span>
        <slot v-if="showSuffix" name="suffix">{{ suffix }}</slot>
      </span>
    </div>
    <span class="m-search-button" @click="onSearch" @keydown.enter.prevent="onSearch">
      <slot name="search">
        <Button class="search-btn" :size="size" :disabled="disabled" :loading="loading" v-bind="searchProps">
          <template v-if="icon" #icon>
            <svg
              focusable="false"
              data-icon="search"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
              ></path>
            </svg>
          </template>
          {{ search }}
        </Button>
      </slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-input-search-wrap {
  width: 100%;
  position: relative;
  display: inline-flex;
  align-items: center;
  .m-addon-before {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 11px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.5714285714285714;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.02);
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    transition: all 0.3s;
    :deep(svg) {
      fill: rgba(0, 0, 0, 0.88);
    }
  }
  .addon-before-small {
    height: 24px;
  }
  .addon-before-middle {
    height: 32px;
  }
  .addon-before-small {
    height: 40px;
  }
  .m-input-search {
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
      border-right-width: 1px;
      z-index: 1;
    }
    &:focus-within {
      border-color: #4096ff;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      border-right-width: 1px;
      outline: 0;
      z-index: 1;
    }
    .m-prefix {
      margin-right: 4px;
      display: flex;
      flex: none;
      align-items: center;
      :deep(svg) {
        fill: rgba(0, 0, 0, 0.88);
      }
    }
    .input-search {
      font-size: 14px;
      color: inherit;
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
    .input-search-suffix {
      margin-left: 4px;
      display: flex;
      flex: none;
      gap: 8px;
      align-items: center;
      .m-clear {
        cursor: pointer;
        .clear-svg {
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
      }
      .clear-hidden {
        visibility: hidden;
      }
      .input-search-count {
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  .input-search-small {
    height: 24px;
    padding: 0 7px;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-search-middle {
    height: 32px;
    padding: 4px 11px;
    border-radius: 6px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-search-large {
    height: 40px;
    padding: 7px 11px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 8px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    .input-search {
      font-size: 16px;
      line-height: 1.5;
    }
  }
  .input-search-before {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .input-search-disabled {
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
    .input-search {
      color: rgba(0, 0, 0, 0.25);
      background-color: transparent;
      cursor: not-allowed;
    }
  }
  .m-search-button {
    position: relative;
    left: -1px;
    border-left: 0;
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.02);
    border-top-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 0;
    transition: all 0.3s;
    line-height: 1;
    :deep(.m-btn) {
      padding-top: 0;
      padding-bottom: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 0;
      &:not(.btn-primary):not(.btn-danger):not(.btn-link):not(.btn-disabled) {
        color: rgba(0, 0, 0, 0.45);
        .btn-icon {
          svg {
            fill: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }
    :deep(.search-btn):not(.btn-primary):not(.btn-danger):not(.btn-link):not(.btn-disabled) {
      color: rgba(0, 0, 0, 0.45);
      &:hover {
        .btn-icon {
          svg {
            fill: #4096ff;
          }
        }
      }
      &:active {
        .btn-icon {
          svg {
            fill: #0958d9;
          }
        }
      }
      .btn-icon {
        svg {
          fill: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }
}
</style>
