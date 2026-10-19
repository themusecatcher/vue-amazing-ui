<script setup lang="ts">
import { computed, inject, ref, watch, watchEffect } from 'vue'
import type { VNode } from 'vue'
import { useSlotsExist, useInject, useWave } from 'components/utils'
import { radioGroupContextKey } from './context'
import type { RadioButtonStyle, RadioChangeEvent, RadioSize, RadioValue } from './context'

export interface Props {
  checked?: boolean // (v-model) 当前是否选中
  value?: RadioValue // 本项的值；脱离组时随 change 事件回传，置于 RadioGroup 内时作为本项的身份标识，与组内当前值比较得出选中态
  button?: boolean // 是否启用按钮样式；置于 RadioGroup 内时该形态由组的 button 决定
  buttonStyle?: RadioButtonStyle // 按钮样式风格；置于 RadioGroup 内时以组的配置为准
  size?: RadioSize // 尺寸，仅当按钮形态时生效；置于 RadioGroup 内时以组的配置为准，组未指定时回落自身尺寸
  disabled?: boolean // 是否禁用
  autofocus?: boolean // 是否自动聚焦原生 input
  name?: string // 原生 input 的表单字段名；置于 RadioGroup 内时以组的配置为准
  id?: string // 原生 input 的 id
}
// 声明组件插槽类型
export interface RadioSlots {
  default?: () => VNode[] // 选项名
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  value: undefined,
  button: false,
  buttonStyle: 'outline',
  size: 'middle',
  disabled: false,
  autofocus: false,
  name: undefined,
  id: undefined
})
defineSlots<RadioSlots>()
const radioChecked = ref<boolean>(false)
const { wave, startWave, endWave } = useWave()
const { colorPalettes, shadowColor } = useInject('Radio') // 主题色注入
const emits = defineEmits(['update:checked', 'change'])
const slotsExist = useSlotsExist(['default'])
// 所在单选组：置入组内时选中态、禁用态与按钮形态改由组统一下发，脱离组时不读取
const groupContext = inject(radioGroupContextKey, undefined)
const singleInput = ref<HTMLInputElement>()
// 程序化聚焦不匹配 :focus-visible（调用时最近的交互通常是鼠标），另置标志驱动焦点环，使 focus() 调用有可见反馈
const exposedSingleFocused = ref<boolean>(false)
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
  return groupContext ? groupContext.button.value : false
})
// 按钮风格与尺寸：组内以组的配置为准，保证同组外观统一
const mergedButtonStyle = computed(() => (groupContext ? groupContext.buttonStyle.value : props.buttonStyle))
// 尺寸：组内以组的配置为准，组未指定时回落自身
const mergedSize = computed(() => (groupContext ? (groupContext.size.value ?? props.size) : props.size))
// 表单字段名：组内以组的配置为准
const mergedName = computed(() => (groupContext ? groupContext.name.value : props.name))
watchEffect(() => {
  radioChecked.value = props.checked
})
// 选中扩散环由选中态驱动：程序化改变选中值（受控回写 / 组内切换）同样播放，与点击来源无关
watch(mergedChecked, (checked) => {
  if (checked) {
    startWave()
  }
})
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
// 受控模式下浏览器已先行切换原生选中态，需按组件状态回写，避免二者不一致；
// 选项模式下点击 label 时事件目标是 label，只有落到原生 input 才写回
function syncInputChecked(event: Event, checked: boolean): void {
  const { target } = event
  if (target instanceof HTMLInputElement) {
    target.checked = checked
  }
}
// 组外单选：已选中时不再重复上报
function onChecked(event: Event): void {
  if (!radioChecked.value) {
    radioChecked.value = true
    emits('update:checked', true)
    emits('change', true, buildChangeEvent(event, true, props.value))
  }
  syncInputChecked(event, true)
}
// 单项点击：组内选中态由组维护，本项只上报自身 value；组外走自身的受控切换。
// 两个分支的原生 input 均以 `@click.stop` 拦掉「label → input」的转发点击，否则使用方绑在组件根上的
// click 会收到两次（转发点击的选中逻辑已由本函数承载）
function onSingleClick(event: Event): void {
  if (mergedDisabled.value) {
    return
  }
  if (groupContext) {
    const { value } = props
    if (value === undefined) {
      // 未提供 value 时组内无从比较，原生选中态仍需按组件状态回写，避免 DOM 与视觉状态不一致
      syncInputChecked(event, false)
      return
    }
    if (groupChecked.value) {
      syncInputChecked(event, true)
      return
    }
    groupContext.onChange(value, buildChangeEvent(event, true, value))
    syncInputChecked(event, true)
    return
  }
  onChecked(event)
}
// 清除程序化聚焦标志：焦点真正离开原生 input 时（原生 blur）一并收尾，避免焦点环残留
function clearExposedFocus(): void {
  exposedSingleFocused.value = false
}
// 键盘聚焦：:focus-visible 无 JS 可读状态，在 focus 事件当下用 matches 判定后置位；
// 鼠标点击与脚本调用 focus() 均不匹配该伪类，与 CSS 路径同口径（圆点形态另有一条 :focus-visible CSS 兜底）
function onInputFocus(event: Event): void {
  const { target } = event
  if (target instanceof HTMLInputElement && target.matches(':focus-visible')) {
    exposedSingleFocused.value = true
  }
}
// 鼠标按下即撤销焦点环：浏览器对鼠标按下（含已聚焦元素被再次点击）不再给 :focus-visible，
// 纯 CSS 方案下焦点环随之消失，class 方案需对齐该行为，避免 Tab 聚焦后点鼠标残留焦点环
function onMouseDown(): void {
  clearExposedFocus()
}
// 聚焦原生 input
function focus(): void {
  singleInput.value?.focus()
  exposedSingleFocused.value = true
}
// 失焦原生 input
function blur(): void {
  clearExposedFocus()
  singleInput.value?.blur()
}
defineExpose({ focus, blur })
</script>
<template>
  <label
    v-if="!mergedButton"
    class="radio-container"
    :class="{ 'radio-disabled': mergedDisabled, 'radio-focused': exposedSingleFocused }"
    :style="`--radio-primary-color: ${colorPalettes[5]}; --radio-primary-shadow-color: ${shadowColor};`"
    @click="onSingleClick($event)"
    @mousedown="onMouseDown"
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
      @click.stop
      @change="onSingleClick($event)"
      @focus="onInputFocus"
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
    :style="`--radio-primary-color: ${colorPalettes[5]}; --radio-primary-color-hover: ${colorPalettes[4]}; --radio-primary-color-active: ${colorPalettes[6]}; --radio-primary-shadow-color: ${shadowColor};`"
    @click="onSingleClick($event)"
    @mousedown="onMouseDown"
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
      @click.stop
      @change="onSingleClick($event)"
      @focus="onInputFocus"
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
<style lang="less" scoped>
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
  /* 键盘聚焦走 :focus-visible（input 的 focus 事件同步置位 .radio-focused，双路径兜底）；脚本调用 focus() 不匹配该伪类，由容器自身的 .radio-focused 兜底显示焦点环 */
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
    /* 选中扩散外环：1.6 倍外扩的描边环，扩散同时淡出（按钮形态仍沿用光晕） */
    .radio-wave {
      top: -1px;
      right: -1px;
      bottom: -1px;
      left: -1px;
      box-sizing: border-box;
      animation-duration: 0.3s;
      animation-timing-function: ease-in-out;
    }
    .wave-active {
      /* 默认不可见：环由选中态驱动，程序化选中时鼠标未必在项上 */
      visibility: hidden;
      border: 2px solid var(--radio-primary-color);
      animation-name: antRadioEffect;
      animation-fill-mode: both;
      @keyframes antRadioEffect {
        from {
          transform: scale(1);
          opacity: 0.5;
        }
        to {
          transform: scale(1.6);
          opacity: 0;
        }
      }
    }
  }
  /* 悬停时环可见：点击导致的选中必然伴随悬停，日常表现与直接播放一致 */
  &:hover .radio-handle .wave-active {
    visibility: visible;
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
  /* 行内块：脱离组单独使用时按内容宽度呈现；置于组内时为 flex item，宽度仍由组分配 */
  display: inline-block;
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
  /* 焦点环经 .radio-focused 显示：键盘聚焦与脚本 focus() 在 input 的 focus / focus() 内置位，鼠标按下撤销——与圆点形态同口径（鼠标点击不显示焦点环；:focus-within 不区分聚焦来源，弃用） */
  &.radio-focused {
    z-index: 1;
    border-color: var(--radio-primary-color);
    box-shadow: 0 0 0 2px var(--radio-primary-shadow-color);
  }
  &:first-child {
    /* 只恢复左边框宽度：颜色由基类 border 简写提供，聚焦 / 选中态的 border-color 方能作用到左边框（写成 border-left 简写会与之同特异性且更晚，把左边框颜色改写死） */
    border-left-width: 1px;
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
  /* 同 :first-child：仅恢复宽度，颜色交给基类与聚焦 / 选中态 */
  border-left-width: 1px;
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
/* 选中态 hover：文字 / 边框 / 相邻分隔线统一转为浅一档主色 */
.radio-button-wrap.radio-button-checked:not(.radio-button-disabled):hover {
  color: var(--radio-primary-color-hover);
  border-color: var(--radio-primary-color-hover);
  &::before {
    background-color: var(--radio-primary-color-hover);
  }
}
/* 选中态按下：主色深一档 */
.radio-button-wrap.radio-button-checked:not(.radio-button-disabled):active {
  color: var(--radio-primary-color-active);
  border-color: var(--radio-primary-color-active);
  &::before {
    background-color: var(--radio-primary-color-active);
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
  /* 选中态 hover：实心底色浅一档 */
  &:hover {
    color: #fff;
    background-color: var(--radio-primary-color-hover);
    border-color: var(--radio-primary-color-hover);
  }
  /* 选中态按下：实心底色深一档 */
  &:active {
    color: #fff;
    background-color: var(--radio-primary-color-active);
    border-color: var(--radio-primary-color-active);
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
