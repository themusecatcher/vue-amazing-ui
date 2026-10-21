<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { VNode } from 'vue'
import Button, { type ButtonProps } from 'components/button'
import { useSlotsExist } from 'components/utils'

export interface Props {
  width?: string | number // 搜索框宽度，单位 px
  icon?: boolean // 搜索图标
  search?: string // 搜索按钮，默认时为搜索图标
  searchProps?: ButtonProps // 设置搜索按钮的属性，参考 Button Props
  size?: 'small' | 'middle' | 'large' // 搜索框大小
  allowClear?: boolean // 可以点击清除图标删除搜索框内容
  addonBefore?: string // 设置前置标签
  prefix?: string // 前缀图标
  suffix?: string // 后缀图标
  loading?: boolean // 是否搜索中
  disabled?: boolean // 是否禁用
  placeholder?: string // 搜索框输入的占位符
  maxlength?: number // 文本最大长度
  showCount?: boolean // 是否展示字数
  value?: string // (v-model) 搜索框内容
  valueModifiers?: object // 用于访问组件的 v-model 上添加的修饰符
}
// 声明组件插槽类型
export interface InputSearchSlots {
  addonBefore?: () => VNode[]
  prefix?: () => VNode[]
  suffix?: () => VNode[]
  search?: () => VNode[]
  icon?: () => VNode[]
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
  placeholder: undefined,
  maxlength: undefined,
  showCount: false,
  value: undefined,
  valueModifiers: () => ({})
})
defineSlots<InputSearchSlots>()
const inputRef = ref<HTMLElement | null>(null) // input 元素引用
const isComposing = ref<boolean>(false) // 是否正在使用文本合成系统输入中
const inputSearchValue = ref<string>() // 搜索框内容
const emits = defineEmits(['update:value', 'compositionstart', 'compositionend', 'change', 'search'])
const slotsExist = useSlotsExist(['prefix', 'suffix', 'addonBefore'])
const inputSearchWidth = computed(() => {
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
    return (inputSearchValue.value ? inputSearchValue.value.length : 0) + ' / ' + props.maxlength
  }
  return inputSearchValue.value ? inputSearchValue.value.length : 0
})
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
watch(
  () => props.value,
  (to) => {
    if (inputSearchValue.value !== to) {
      inputSearchValue.value = to
    }
  },
  {
    immediate: true
  }
)
// 文本合成系统即输入法编辑器开始新的输入合成时会触发
function onCompositionStart(e: CompositionEvent): void {
  isComposing.value = true
  emits('compositionstart', e)
}
// 当文本段落的组成完成或取消时触发 (具有特殊字符的触发，需要一系列键和其他输入，如语音识别或移动中的字词建议)
function onCompositionEnd(e: CompositionEvent): void {
  isComposing.value = false
  emits('compositionend', e)
  const changeEvent = new Event('change')
  e.target?.dispatchEvent(changeEvent)
}
function onInput(e: Event): void {
  if (!isComposing.value) {
    const target = e.target as HTMLInputElement
    inputSearchValue.value = target.value
    if (!lazyInput.value) {
      emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
      emits('change', e)
    }
  }
}
function onChange(e: Event): void {
  const target = e.target as HTMLInputElement
  if (target.value !== props.value) {
    emits('update:value', target.value) // 保证在 change 回调时能获取到最新数据
    emits('change', e)
  }
}
function onClear(): void {
  inputSearchValue.value = ''
  emits('update:value', '')
  inputRef.value?.focus()
}
function onInputSearch(e: KeyboardEvent): void {
  if (isComposing.value || props.loading) {
    return
  }
  onSearch(e)
  if (lazyInput.value) {
    const changeEvent = new Event('change')
    e.target?.dispatchEvent(changeEvent)
  }
}
function onSearch(e: MouseEvent | KeyboardEvent): void {
  emits('search', inputSearchValue.value, e)
}
</script>
<template>
  <div
    class="input-search-wrap"
    :class="`input-search-${size}`"
    :style="`
      --input-search-width: ${inputSearchWidth};
    `"
  >
    <span v-if="showBefore" class="input-search-addon-before" :class="`addon-before-${size}`">
      <slot name="addonBefore">{{ addonBefore }}</slot>
    </span>
    <div
      tabindex="1"
      class="input-search-container"
      :class="[
        `input-search-${size}`,
        {
          'input-search-before': showBefore,
          'input-search-disabled': disabled
        }
      ]"
    >
      <span v-if="showPrefix" class="input-search-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <input
        ref="inputRef"
        class="input-search"
        type="text"
        :value="inputSearchValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @input="onInput"
        @change="onChange"
        @keydown.enter.prevent="onInputSearch"
      />
      <span v-if="showInputSuffix" class="input-search-suffix">
        <span
          v-if="showClear"
          class="input-search-clear"
          :class="{ 'clear-hidden': !inputSearchValue }"
          @click="onClear"
        >
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
        <span v-if="showSuffix" class="suffix-item">
          <slot name="suffix">{{ suffix }}</slot>
        </span>
      </span>
    </div>
    <span class="input-search-button" @click="onSearch" @keydown.enter.prevent="onSearch">
      <slot name="search">
        <Button class="search-btn" :size="size" :disabled="disabled" :loading="loading" v-bind="searchProps">
          <template v-if="icon" #icon>
            <slot name="icon">
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
            </slot>
          </template>
          {{ search }}
        </Button>
      </slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.input-search-wrap {
  /* 拼接圆角：随 size 变化（小 / 中 / 大三档），
     由根节点下发变量，作用域内的容器、前置标签、搜索按钮共用同一份 */
  --input-search-radius: 6px;
  width: var(--input-search-width);
  position: relative;
  display: inline-flex;
  align-items: center;
  &.input-search-small {
    --input-search-radius: 4px;
  }
  &.input-search-large {
    --input-search-radius: 8px;
  }
  .input-search-addon-before {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 11px;
    color: var(--va-text-color-1);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.5714285714285714;
    text-align: center;
    background-color: var(--va-fill-color-1);
    border: 1px solid var(--va-border-color);
    border-radius: var(--input-search-radius);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    transition: all 0.3s;
    :deep(svg) {
      fill: currentColor;
    }
  }
  .addon-before-small {
    height: 24px;
  }
  .addon-before-middle {
    height: 32px;
  }
  .addon-before-large {
    height: 40px;
  }
  .input-search-container {
    font-size: 14px;
    color: var(--va-text-color-1);
    line-height: 1.5714285714285714;
    position: relative;
    display: inline-flex;
    width: 100%;
    min-width: 0;
    /* 右侧保留边框：输入区自身画完整闭合边框（单个元素的边框是一条闭合路径，
       转角处不会在亚像素位置漏缝）。与按钮的交接线由按钮左移 1px 覆盖 */
    z-index: 0;
    background-color: var(--va-bg-container-color);
    /* 底色只铺到内边距区：聚焦时右边框会临时置透明（见下方 :focus-within），
       若底色仍延伸到边框区，会从这个透明边框漏出来、把交接线盖成白色 */
    background-clip: padding-box;
    border: 1px solid var(--va-border-color);
    transition: all 0.2s;
    &:hover {
      border-color: var(--va-cp-input-search-primary-color-hover, var(--va-primary-color-hover));
    }
    &:focus-within {
      border-color: var(--va-cp-input-search-primary-color-hover, var(--va-primary-color-hover));
      /* 焦点环只包输入区（不含右侧按钮），所以必须抬到按钮之上，
         否则环的右段被按钮盖住、看上去缺一条边 */
      z-index: 1;
      /* 交接线由按钮自己的伪元素负责（见 .input-search-button .btn-wrap::before），
         输入区右边框让位，否则这条高亮色会压在实底按钮的左边缘上 */
      border-right-color: transparent;
      box-shadow: var(--va-cp-input-search-focus-shadow, var(--va-focus-shadow));
      outline: 0;
    }
    .input-search-prefix {
      margin-right: 4px;
      display: flex;
      flex: none;
      align-items: center;
      :deep(svg) {
        fill: currentColor;
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
      background-color: var(--va-bg-container-color);
      border: none;
      outline: none;
      text-overflow: ellipsis;
      transition: all 0.2s;
    }
    input::-webkit-input-placeholder {
      color: var(--va-text-color-disabled);
    }
    input:-moz-placeholder {
      color: var(--va-text-color-disabled);
    }
    input::-moz-placeholder {
      color: var(--va-text-color-disabled);
    }
    input:-ms-input-placeholder {
      color: var(--va-text-color-disabled);
    }
    .input-search-suffix {
      margin-left: 4px;
      display: flex;
      flex: none;
      gap: 8px;
      align-items: center;
      .input-search-clear {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .clear-svg {
          display: inline-block;
          font-size: 12px;
          color: var(--va-text-color-disabled);
          transition: color 0.3s;
          &:hover {
            color: var(--va-text-color-3);
          }
        }
      }
      .clear-hidden {
        visibility: hidden;
      }
      .input-search-count {
        color: var(--va-text-color-3);
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
  .input-search-small {
    height: 24px;
    padding: 0 7px;
    border-radius: var(--input-search-radius);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-search-middle {
    height: 32px;
    padding: 4px 11px;
    border-radius: var(--input-search-radius);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-search-large {
    height: 40px;
    padding: 7px 11px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: var(--input-search-radius);
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
    color: var(--va-text-color-disabled);
    background-color: var(--va-fill-color-1);
    cursor: not-allowed;
    &:hover {
      border-color: var(--va-border-color);
    }
    &:focus-within {
      border-color: var(--va-border-color);
      box-shadow: none;
    }
    .input-search {
      color: var(--va-text-color-disabled);
      background-color: transparent;
      cursor: not-allowed;
    }
  }
  /* 普通按钮把自己的左边框染成输入区当前的颜色（这一像素与输入区右边框完全重叠，上层是谁都同色），
     悬停时右侧轮廓与其余三条边同为高亮色、移出时同一条 transition 平滑回落；
     语义色按钮（primary / danger / link / 禁用）的边框本身有意义，保持不动 */
  &:hover,
  &:focus-within {
    .input-search-button :deep(.btn-wrap) {
      &:not(.btn-primary):not(.btn-danger):not(.btn-link):not(.btn-disabled) {
        border-left-color: var(--va-cp-input-search-primary-color-hover, var(--va-primary-color-hover));
      }
    }
  }
  .input-search-button {
    position: relative;
    /* 与输入区重叠 1px：按钮左边框正好压在
       输入区右边框上，交界处只有一条线；顺带保住按钮右边缘与容器右边缘对齐。
       若改成相邻不重叠（输入区 border-right: 0），两个边框各画 1px 会在亚像素位置
       于右上 / 右下转角各缺 1px，悬停、聚焦时最明显 */
    margin-left: -1px;
    border-left: 0;
    color: var(--va-text-color-1);
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    background-color: var(--va-fill-color-1);
    border-top-left-radius: 0;
    border-top-right-radius: var(--input-search-radius);
    border-bottom-right-radius: var(--input-search-radius);
    border-bottom-left-radius: 0;
    transition: all 0.3s;
    line-height: 1;
    :deep(.btn-wrap) {
      padding-top: 0;
      padding-bottom: 0;
      border-top-left-radius: 0;
      border-top-right-radius: var(--input-search-radius);
      border-bottom-right-radius: var(--input-search-radius);
      border-bottom-left-radius: 0;
      /* 与输入区保持同一条过渡曲线，交接线才与其余三条边同时到位
         （按钮自身是 0.2s cubic-bezier(...)，曲线不同会让这一条边看着「慢半拍」） */
      transition: all 0.2s;
      &:not(.btn-primary):not(.btn-danger):not(.btn-link):not(.btn-disabled) {
        color: var(--va-text-color-3);
      }
      /* 交接线：按钮左移 1px 后，输入区右边框正好被这一像素压住。这里用伪元素画在按钮边框之上，
         颜色继承按钮自身的左边框色——
         · 普通按钮是灰 / 高亮色一条线，且这一像素盖住按钮自身上下边框 45° 斜接留下的半像素，
           右上 / 右下转角不会各缺 1px；
         · primary / danger 这类边框色即底色的实底按钮上自然不可见，交界处不会出现浅色细线。
         注意：这里不能声明 transition——颜色是逐帧继承父元素动画结果的，再补一层过渡会变成
         「追赶父元素」的二次动画，视觉上这条边明显比其他三条慢 */
      &::before {
        content: '';
        position: absolute;
        top: -1px;
        bottom: -1px;
        left: -1px;
        width: 0;
        border-left: 1px solid;
        border-left-color: inherit;
        pointer-events: none;
      }
    }
  }
  /* slot 自定义按钮：与内置按钮同样按拼接形状重置圆角，
     否则按钮自带的整圈圆角会在拼接处留下白色缺口 */
  :deep(.input-search-button > *) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: var(--input-search-radius);
    border-bottom-right-radius: var(--input-search-radius);
  }
}
</style>
