<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue'
import type { VNode } from 'vue'
import { useSlotsExist, useInject, useWave } from 'components/utils'
import { radioGroupContextKey } from './context'
import type { RadioChangeEvent, RadioValue } from './context'
import { renderOptionLabel } from './render'
export interface Option {
  label: string | number | VNode // 选项名；传入 VNode 时原样渲染
  value: RadioValue // 选项值
  disabled?: boolean // 是否禁用选项
}

export interface Props {
  checked?: boolean // (v-model) 当前是否选中
  value?: RadioValue // (v-model) 当前选中的值；置于 RadioGroup 内时作为本项的身份标识，与组内当前值比较得出选中态

  options?: Option[] // 单选框选项数据

  button?: boolean // 是否启用按钮样式；置于 RadioGroup 内时该形态由组的 optionType 决定
  buttonStyle?: 'outline' | 'solid' // 按钮样式风格；置于 RadioGroup 内时以组的配置为准
  size?: 'small' | 'middle' | 'large' // 尺寸，仅当按钮形态时生效；置于 RadioGroup 内时以组的配置为准
  vertical?: boolean // 是否垂直排列，仅当 button: false 时生效
  gap?: number | number[] // 多个单选框之间的间距；垂直排列时为垂直间距，单位 px；数组间距用于水平排列折行时：[水平间距, 垂直间距]；仅当 button: false 时生效

  disabled?: boolean // 是否禁用

  autofocus?: boolean // 是否自动聚焦原生 input

  name?: string // 原生 input 的表单字段名；置于 RadioGroup 内时以组的配置为准
  id?: string // 原生 input 的 id；options 模式下作为前缀，实际 id 追加选项下标
}
// 声明组件插槽类型
export interface RadioSlots {
  // options / button 模式下为每个选项提供作用域参数；children 透传模式下无真实数据，参数为 undefined
  default?: (props: { option?: Option; label?: string | number | VNode; index?: number }) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  value: undefined,
  options: () => [],
  button: false,
  buttonStyle: 'outline',
  size: 'middle',
  vertical: false,
  gap: 8,
  disabled: false,
  autofocus: false,
  name: undefined,
  id: undefined
})
defineSlots<RadioSlots>()
const radioChecked = ref<boolean>(false)
const optionsCheckedValue = ref<string | number | boolean>()
const { wave, startWave, endWave } = useWave()
const { colorPalettes, shadowColor } = useInject('Radio') // 主题色注入
const emits = defineEmits(['update:checked', 'update:value', 'change'])
const slotsExist = useSlotsExist(['default'])
// 所在单选组：置入组内时选中态、禁用态与按钮形态改由组统一下发，脱离组时不读取
const groupContext = inject(radioGroupContextKey, undefined)
// options 模式下按序收集各项原生 input，单选模式下只持有一项，供聚焦与失焦使用
const optionInputs = ref<HTMLInputElement[]>([])
const singleInput = ref<HTMLInputElement>()
// 程序化聚焦不匹配 :focus-visible（调用时最近的交互通常是鼠标），另置标志驱动焦点环，使 focus() 调用有可见反馈
const exposedOptionIndex = ref<number>(-1)
const exposedSingleFocused = ref<boolean>(false)
// 选项总数
const optionsAmount = computed(() => {
  return props.options.length
})
// 组内是否选中：以自身 value 与组内当前值比较；未提供 value 时无从比较
const groupChecked = computed(() => {
  if (!groupContext || props.value === undefined) {
    return false
  }
  return groupContext.value.value === props.value
})
// 选中态：组内由组决定，组外读自身 checked
const mergedChecked = computed(() => (groupContext ? groupChecked.value : radioChecked.value))
// 禁用态：组内叠加组的禁用，组外读自身 disabled
const mergedDisabled = computed(() => (groupContext ? groupContext.disabled.value || props.disabled : props.disabled))
// 按钮形态：显式声明 button，或所在组为按钮形态时，按按钮渲染
const mergedButton = computed(() => {
  if (props.button) {
    return true
  }
  return groupContext ? groupContext.optionType.value === 'button' : false
})
// 按钮风格与尺寸：组内以组的配置为准，保证同组外观统一
const mergedButtonStyle = computed(() => (groupContext ? groupContext.buttonStyle.value : props.buttonStyle))
// 尺寸：组内以组的配置为准，组未指定时回落自身
const mergedSize = computed(() => (groupContext ? (groupContext.size.value ?? props.size) : props.size))
// 表单字段名：组内以组的配置为准
const mergedName = computed(() => (groupContext ? groupContext.name.value : props.name))
const gapValue = computed(() => {
  if (!props.button) {
    if (!props.vertical && Array.isArray(props.gap)) {
      return `${props.gap[1]}px ${props.gap[0]}px`
    }
    return `${props.gap}px`
  } else {
    return 0
  }
})
watchEffect(() => {
  radioChecked.value = props.checked
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
// options 模式下各原生 input 的 id：以 id 为前缀追加下标，未提供前缀时不产出 id
function optionId(index: number): string | undefined {
  return props.id ? `${props.id}-${index}` : undefined
}
// 状态快照取本组件 props，原生事件与方法附在其上，与原生 input 的 change 同形态
function buildChangeEvent(nativeEvent: Event, checked: boolean, value?: RadioValue): RadioChangeEvent {
  return {
    target: {
      checked,
      value,
      name: mergedName.value,
      disabled: mergedDisabled.value
    },
    stopPropagation: () => nativeEvent.stopPropagation(),
    preventDefault: () => nativeEvent.preventDefault(),
    nativeEvent
  }
}
// 受控模式下浏览器已先行切换原生选中态，需按组件状态回写，避免二者不一致
function syncInputChecked(event: Event, checked: boolean): void {
  const input = event.target as HTMLInputElement | null
  if (input) {
    input.checked = checked
  }
}
// 选项模式选中某一项：鼠标点击与键盘操作共用，重复选中时仅回写状态
function onClick(option: Option, event: Event): void {
  if (checkDisabled(option.disabled)) {
    return
  }
  if (option.value !== optionsCheckedValue.value) {
    startWave()
    optionsCheckedValue.value = option.value
    emits('update:value', option.value)
    emits('change', option.value, buildChangeEvent(event, true, option.value))
  }
  syncInputChecked(event, optionsCheckedValue.value === option.value)
}
// 组外单选：已选中时不再重复上报
function onChecked(event: Event): void {
  if (!radioChecked.value) {
    startWave()
    radioChecked.value = true
    emits('update:checked', true)
    emits('change', true, buildChangeEvent(event, true, props.value))
  }
  syncInputChecked(event, true)
}
// 单项点击：组内选中态由组维护，本项只上报自身 value；组外走自身的受控切换
function onSingleClick(event: Event): void {
  if (mergedDisabled.value) {
    return
  }
  if (groupContext) {
    const { value } = props
    if (value === undefined || groupChecked.value) {
      return
    }
    startWave()
    groupContext.onChange(value, buildChangeEvent(event, true, value))
    return
  }
  onChecked(event)
}
// 清除程序化聚焦标志：焦点真正离开原生 input 时（原生 blur）一并收尾，避免焦点环残留
function clearExposedFocus(): void {
  exposedOptionIndex.value = -1
  exposedSingleFocused.value = false
}
// 聚焦原生 input：options 模式下优先聚焦当前选中项
function focus(): void {
  if (optionsAmount.value) {
    const inputs = optionInputs.value
    const checkedIndex = inputs.findIndex((input) => input.checked)
    const target = checkedIndex === -1 ? 0 : checkedIndex
    inputs[target]?.focus()
    exposedOptionIndex.value = target
    return
  }
  singleInput.value?.focus()
  exposedSingleFocused.value = true
}
// 失焦原生 input
function blur(): void {
  clearExposedFocus()
  if (optionsAmount.value) {
    optionInputs.value.forEach((input) => input.blur())
    return
  }
  singleInput.value?.blur()
}
defineExpose({ focus, blur })
</script>
<template>
  <div
    v-if="optionsAmount"
    class="radio-wrap"
    :class="{ 'radio-vertical': !button && vertical }"
    :style="`
      --radio-gap: ${gapValue};
      --radio-primary-color: ${colorPalettes[5]};
      --radio-primary-shadow-color: ${shadowColor};
    `"
    v-bind="$attrs"
  >
    <template v-if="!button">
      <label
        class="radio-container"
        :class="{
          'radio-disabled': checkDisabled(option.disabled),
          'radio-focused': exposedOptionIndex === index
        }"
        v-for="(option, index) in options"
        :key="index"
        @click="onClick(option, $event)"
      >
        <input
          ref="optionInputs"
          class="radio-input"
          type="radio"
          :id="optionId(index)"
          :value="option.value"
          :name="mergedName"
          :checked="optionsCheckedValue === option.value"
          :disabled="checkDisabled(option.disabled)"
          :autofocus="autofocus"
          @change="onClick(option, $event)"
          @blur="clearExposedFocus"
        />
        <span class="radio-handle" :class="{ 'radio-checked': optionsCheckedValue === option.value }">
          <span
            v-if="!checkDisabled(option.disabled)"
            class="radio-wave"
            :class="{ 'wave-active': wave && optionsCheckedValue === option.value }"
            @animationend="endWave"
          ></span>
        </span>
        <span class="radio-label">
          <slot :option="option" :label="option.label" :index="index">
            <component :is="renderOptionLabel(option.label)" />
          </slot>
        </span>
      </label>
    </template>
    <template v-else>
      <label
        class="radio-button-wrap"
        :class="{
          'radio-button-checked': optionsCheckedValue === option.value,
          'radio-button-disabled': checkDisabled(option.disabled),
          'radio-button-solid': buttonStyle === 'solid',
          'radio-button-small': size === 'small',
          'radio-button-large': size === 'large',
          'radio-focused': exposedOptionIndex === index
        }"
        v-for="(option, index) in options"
        :key="index"
        @click="onClick(option, $event)"
      >
        <input
          ref="optionInputs"
          class="radio-input"
          type="radio"
          :id="optionId(index)"
          :value="option.value"
          :name="mergedName"
          :checked="optionsCheckedValue === option.value"
          :disabled="checkDisabled(option.disabled)"
          :autofocus="autofocus"
          @change="onClick(option, $event)"
          @blur="clearExposedFocus"
        />
        <span class="radio-label">
          <slot :option="option" :label="option.label" :index="index">
            <component :is="renderOptionLabel(option.label)" />
          </slot>
        </span>
        <span
          v-if="!checkDisabled(option.disabled)"
          class="radio-wave"
          :class="{ 'wave-active': wave && optionsCheckedValue === option.value }"
          @animationend="endWave"
        ></span>
      </label>
    </template>
  </div>
  <template v-else>
    <label
      v-if="!mergedButton"
      class="radio-container"
      :class="{ 'radio-disabled': mergedDisabled, 'radio-focused': exposedSingleFocused }"
      :style="`--radio-primary-color: ${colorPalettes[5]}; --radio-primary-shadow-color: ${shadowColor};`"
      @click="onSingleClick($event)"
      v-bind="$attrs"
    >
      <input
        ref="singleInput"
        class="radio-input"
        type="radio"
        :id="id"
        :value="value"
        :name="mergedName"
        :checked="mergedChecked"
        :disabled="mergedDisabled"
        :autofocus="autofocus"
        @change="onSingleClick($event)"
        @blur="clearExposedFocus"
      />
      <span class="radio-handle" :class="{ 'radio-checked': mergedChecked }">
        <span
          v-if="!mergedDisabled"
          class="radio-wave"
          :class="{ 'wave-active': wave && mergedChecked }"
          @animationend="endWave"
        ></span>
      </span>
      <span v-if="slotsExist.default" class="radio-label">
        <slot></slot>
      </span>
    </label>
    <label
      v-else
      class="radio-button-wrap"
      :class="{
        'radio-button-single': !groupContext,
        'radio-button-checked': mergedChecked,
        'radio-button-disabled': mergedDisabled,
        'radio-button-solid': mergedButtonStyle === 'solid',
        'radio-button-small': mergedSize === 'small',
        'radio-button-large': mergedSize === 'large',
        'radio-focused': exposedSingleFocused
      }"
      :style="`--radio-primary-color: ${colorPalettes[5]}; --radio-primary-shadow-color: ${shadowColor};`"
      @click="onSingleClick($event)"
      v-bind="$attrs"
    >
      <input
        ref="singleInput"
        class="radio-input"
        type="radio"
        :id="id"
        :value="value"
        :name="mergedName"
        :checked="mergedChecked"
        :disabled="mergedDisabled"
        :autofocus="autofocus"
        @change="onSingleClick($event)"
        @blur="clearExposedFocus"
      />
      <span class="radio-label">
        <slot></slot>
      </span>
      <span
        v-if="!mergedDisabled"
        class="radio-wave"
        :class="{ 'wave-active': wave && mergedChecked }"
        @animationend="endWave"
      ></span>
    </label>
  </template>
</template>
<style lang="less" scoped>
.radio-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--radio-gap);
}
.radio-vertical {
  flex-direction: column;
  flex-wrap: nowrap;
}
/* 原生 input 承载语义与键盘操作，视觉上隐藏且不参与鼠标命中，鼠标交互由外层容器承担 */
.radio-input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
  pointer-events: none;
}
.radio-container {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  /* 行高落在容器上、由选项名继承：行内为该行指定行高时（如定高行内混排控件），文字与控件才能对齐同一基线 */
  line-height: 1.5714285714285714;
  /* 零宽行内伪元素参与基线对齐：容器被指定固定高度（如逐项内联 height）时，圆点与文字仍对齐于同一基线 */
  &::after {
    display: inline-block;
    width: 0;
    overflow: hidden;
    content: '\a0';
  }
  /* 键盘聚焦走 :focus-visible；脚本调用 focus() 不匹配该伪类，由容器自身的 .radio-focused 兜底显示焦点环 */
  .radio-input:focus-visible + .radio-handle,
  &.radio-focused .radio-handle {
    box-shadow: 0 0 0 2px var(--radio-primary-shadow-color);
  }
  &:not(.radio-disabled):hover {
    .radio-handle {
      border-color: var(--radio-primary-color);
    }
  }
  .radio-handle {
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
    border-radius: 50%;
    transition: all 0.3s;
    &::after {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 16px;
      height: 16px;
      margin-top: -8px;
      margin-left: -8px;
      background-color: #fff;
      border-top: 0;
      border-left: 0;
      border-radius: 16px;
      transform: scale(0);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      content: '';
    }
  }
  .radio-checked {
    border-color: var(--radio-primary-color);
    background-color: var(--radio-primary-color);
    &::after {
      transform: scale(0.375);
      opacity: 1;
      transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
  }
  .radio-label {
    word-break: break-word;
    padding: 0 8px;
  }
}
.radio-disabled {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  .radio-handle {
    background-color: rgba(0, 0, 0, 0.04);
    border-color: #d9d9d9;
    cursor: not-allowed;
    &::after {
      transform: scale(0.5);
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
.radio-button-wrap {
  position: relative;
  display: block;
  height: 32px;
  padding-inline: 15px;
  line-height: 30px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-top-width: 1px;
  border-left-width: 0;
  border-right-width: 1px;
  cursor: pointer;
  outline: none;
  transition:
    all 0.2s,
    box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  /* 键盘聚焦原生 input 时整块按钮显示焦点环 */
  &:focus-within {
    z-index: 1;
    border-color: var(--radio-primary-color);
    box-shadow: 0 0 0 2px var(--radio-primary-shadow-color);
  }
  &:first-child {
    border-left: 1px solid #d9d9d9;
    border-start-start-radius: 6px;
    border-end-start-radius: 6px;
  }
  &:not(:first-child) {
    /* 置入组内时抵消组的水平间距，相邻按钮的边框才能贴合为一条；组外由 0px 兜底 */
    margin-inline-start: calc(-1 * var(--radio-group-button-overlap, 0px));
  }
  &:not(:first-child):not(.radio-button-single)::before {
    position: absolute;
    top: -1px;
    left: -1px;
    display: block;
    width: 1px;
    height: 100%;
    padding-block: 1px;
    box-sizing: content-box;
    background-color: #d9d9d9;
    transition: background-color 0.3s;
    content: '';
  }
  &:last-child {
    border-start-end-radius: 6px;
    border-end-end-radius: 6px;
  }
  &:not(.radio-button-disabled):hover {
    color: var(--radio-primary-color);
  }
}
.radio-button-single {
  border-left: 1px solid #d9d9d9;
  border-radius: 6px;
}
.radio-button-wrap.radio-button-checked:not(.radio-button-disabled) {
  z-index: 1;
  color: var(--radio-primary-color);
  background-color: #ffffff;
  border-color: var(--radio-primary-color);
  &::before {
    background-color: var(--radio-primary-color);
  }
}
.radio-button-disabled {
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.04);
  border-color: #d9d9d9;
  cursor: not-allowed;
}
.radio-button-disabled.radio-button-checked {
  background-color: rgba(0, 0, 0, 0.15);
}
.radio-button-solid.radio-button-checked:not(.radio-button-disabled) {
  color: #fff;
  background-color: var(--radio-primary-color);
  border-color: var(--radio-primary-color);
  &:hover {
    color: #fff;
  }
}
.radio-button-small {
  &.radio-button-wrap {
    height: 24px;
    padding-inline: 7px;
    line-height: 22px;
    &:first-child {
      border-start-start-radius: 4px;
      border-end-start-radius: 4px;
    }
    &:last-child {
      border-start-end-radius: 4px;
      border-end-end-radius: 4px;
    }
  }
  &.radio-button-single {
    border-radius: 4px;
  }
}
.radio-button-large {
  &.radio-button-wrap {
    height: 40px;
    font-size: 16px;
    line-height: 38px;
    &:first-child {
      border-start-start-radius: 8px;
      border-end-start-radius: 8px;
    }
    &:last-child {
      border-start-end-radius: 8px;
      border-end-end-radius: 8px;
    }
  }
  &.radio-button-single {
    border-radius: 8px;
  }
}
.radio-wave {
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
      box-shadow: 0 0 0.5px 0 var(--radio-primary-color);
    }
    to {
      box-shadow: 0 0 0.5px 5px var(--radio-primary-color);
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
