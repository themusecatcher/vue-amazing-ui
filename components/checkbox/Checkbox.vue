<script setup lang="ts">
import { computed, inject, ref, watch, watchEffect } from 'vue'
import type { VNode } from 'vue'
import { useSlotsExist, useWave } from 'components/utils'
import { checkboxGroupContextKey } from './context'
import type { CheckboxChangeEvent, CheckboxValue } from './context'

export interface Props {
  checked?: boolean // (v-model) 当前是否选中
  value?: CheckboxValue // 本项的值；脱离组时随 change 事件回传，置于 CheckboxGroup 内时作为本项的身份标识
  disabled?: boolean // 是否禁用
  indeterminate?: boolean // 全选时的样式控制
  autofocus?: boolean // 是否自动聚焦原生 input
  name?: string // 原生 input 的表单字段名；置于 CheckboxGroup 内时以组的配置为准
  id?: string // 原生 input 的 id
}
// 声明组件插槽类型
export interface CheckboxSlots {
  default?: () => VNode[] // 选项名
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  value: undefined,
  disabled: false,
  indeterminate: false,
  autofocus: false,
  name: undefined,
  id: undefined
})
defineSlots<CheckboxSlots>()
const checkboxChecked = ref<boolean>(false) // v-model:checked 是否选中标志
const { wave, startWave, endWave } = useWave() // 复选框动画选中效果标志
const emits = defineEmits(['update:checked', 'change'])
const slotsExist = useSlotsExist(['default'])
// 所在复选框组：置入组内时选中态、禁用态与事件出口改由组统一承载，脱离组时不读取
const groupContext = inject(checkboxGroupContextKey, undefined)
const singleInput = ref<HTMLInputElement>()
// 程序化聚焦不匹配 :focus-visible（调用时最近的交互通常是鼠标），另置标志驱动焦点环，使 focus() 调用有可见反馈
const exposedSingleFocused = ref<boolean>(false)
// 是否作为组内单项使用：由组上下文是否存在判断
const inGroupItem = computed(() => groupContext !== undefined)
// 组内是否选中：以自身标识值与组内已选值比较；未提供标识值时不参与比较
const groupChecked = computed(() => {
  const target = props.value
  if (!inGroupItem.value || target === undefined) {
    return false
  }
  return groupContext?.value.value.includes(target) ?? false
})
// 选中态：组内由组决定，组外读自身 checked
const mergedChecked = computed(() => (inGroupItem.value ? groupChecked.value : checkboxChecked.value))
// 禁用态：组内叠加组的禁用，组外读自身 disabled
const mergedDisabled = computed(() =>
  inGroupItem.value ? groupContext?.disabled.value || props.disabled : props.disabled
)
// 表单字段名：组内以组的配置为准
const mergedName = computed(() => (inGroupItem.value ? groupContext?.name.value : props.name))
watchEffect(() => {
  checkboxChecked.value = props.checked
})
// 半选是 DOM 属性而非 HTML 属性，须在原生 input 上设置；浏览器改写 checked 时会清掉它，故一并依赖选中态
watch(
  [() => props.indeterminate, mergedChecked, singleInput],
  () => {
    const input = singleInput.value
    if (input) {
      input.indeterminate = props.indeterminate
    }
  },
  { flush: 'post' }
)
// 选中扩散环由选中态驱动：程序化改变选中值（受控回写 / 组内切换）同样播放，与点击来源无关
watch(mergedChecked, (checked) => {
  if (checked) {
    startWave()
  }
})
// 禁用时扩散环节点被移除，`animationend` 不会再回来复位，重新启用时环会凭空播一次，故禁用即复位
watch(mergedDisabled, (disabled) => {
  if (disabled) {
    endWave()
  }
})
// 状态快照取本组件 props，原生事件与方法附在其上，与原生 input 的 change 同形态
function buildChangeEvent(nativeEvent: Event, checked: boolean, value?: CheckboxValue): CheckboxChangeEvent {
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
  const { target } = event
  if (target instanceof HTMLInputElement) {
    target.checked = checked
  }
}
// 组外单项切换：自身受控，取消选中同样上报
function onCheckedChange(event: Event): void {
  const nextChecked = !checkboxChecked.value
  checkboxChecked.value = nextChecked
  emits('update:checked', nextChecked)
  emits('change', nextChecked, buildChangeEvent(event, nextChecked, props.value))
  syncInputChecked(event, nextChecked)
}
// 单项切换：组内选中集合由组维护，本项只上报新的选中态，避免同一次选择双出口。
// 交互统一走原生 click（鼠标经外层 label 转发后事件目标仍是本 input），由此天然单点触发；
// input 上的 `@click.stop` 同时拦掉这条转发点击的冒泡，否则使用方绑在组件根上的 click 会触发两次
function onSingleClick(event: Event): void {
  if (!inGroupItem.value) {
    onCheckedChange(event)
    return
  }
  const target = props.value
  if (target === undefined) {
    return
  }
  const nextChecked = !groupChecked.value
  groupContext?.onChange(nextChecked, target, event)
  syncInputChecked(event, nextChecked)
}
// 清除程序化聚焦标志：焦点真正离开原生 input 时（原生 blur）一并收尾，避免焦点环残留
function clearExposedFocus(): void {
  exposedSingleFocused.value = false
}
// 键盘聚焦：:focus-visible 无 JS 可读状态，在 focus 事件当下用 matches 判定后置位；
// 鼠标点击与脚本调用 focus() 均不匹配该伪类，与容器上 :focus-visible 的 CSS 路径同口径
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
    class="checkbox-container"
    :class="{ 'checkbox-disabled': mergedDisabled, 'checkbox-focused': exposedSingleFocused }"
    @mousedown="onMouseDown"
    v-bind="$attrs"
  >
    <input
      ref="singleInput"
      class="checkbox-input"
      type="checkbox"
      :id="id"
      :value="value"
      :name="mergedName"
      :checked="mergedChecked"
      :disabled="mergedDisabled"
      :autofocus="autofocus"
      @click.stop.prevent="onSingleClick($event)"
      @focus="onInputFocus"
      @blur="clearExposedFocus"
    />
    <span
      class="checkbox-box"
      :class="{
        'checkbox-checked': mergedChecked && !indeterminate,
        'checkbox-indeterminate': indeterminate
      }"
    >
      <span
        v-if="!mergedDisabled"
        class="checkbox-wave"
        :class="{ 'wave-active': wave && mergedChecked }"
        @animationend="endWave"
      ></span>
    </span>
    <span v-if="slotsExist.default" class="checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>
<style lang="less" scoped>
/* 原生 input 承载语义与键盘操作，视觉上隐藏；鼠标交互由外层 label 的转发行为承担 */
.checkbox-input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
}
.checkbox-container {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  cursor: pointer;
  color: var(--va-text-color-1);
  font-size: 14px;
  line-height: 1.5714285714285714;
  /* 零宽行内伪元素参与基线对齐：容器被指定固定高度（如逐项内联 height）时，方框与文字仍对齐于同一基线 */
  &::after {
    display: inline-block;
    width: 0;
    overflow: hidden;
    content: '\a0';
  }
  /* 键盘聚焦走 :focus-visible（input 的 focus 事件同步置位 .checkbox-focused，双路径兜底）；脚本调用 focus() 不匹配该伪类，由容器自身的 .checkbox-focused 兜底显示焦点环 */
  .checkbox-input:focus-visible + .checkbox-box,
  &.checkbox-focused .checkbox-box {
    box-shadow: 0 0 0 2px var(--va-cp-checkbox-focus-shadow, var(--va-focus-shadow));
  }
  &:not(.checkbox-disabled):hover {
    .checkbox-box {
      border-color: var(--va-cp-checkbox-primary-color, var(--va-primary-color));
    }
    /* 选中态 hover：底色浅一档、边框转透明，由实心色块铺满整块 */
    .checkbox-checked {
      background-color: var(--va-cp-checkbox-primary-color-hover, var(--va-primary-color-hover));
      border-color: transparent;
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
    border: 1px solid var(--va-border-color);
    border-radius: 4px;
    transition: all 0.3s;
    &::after {
      position: absolute;
      top: 50%;
      left: 21.5%;
      display: table;
      width: 5.7142857142857135px;
      height: 9.142857142857142px;
      border: 2px solid var(--va-text-color-solid);
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(0) translate(-50%, -50%);
      opacity: 0;
      content: '';
      transition:
        all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
        opacity 0.1s;
    }
    /* 选中扩散外环：1.6 倍外扩的描边环，扩散同时淡出 */
    .checkbox-wave {
      position: absolute;
      pointer-events: none;
      top: -1px;
      right: -1px;
      bottom: -1px;
      left: -1px;
      box-sizing: border-box;
      animation-iteration-count: 1;
      animation-duration: 0.3s;
      animation-timing-function: ease-in-out;
      border-radius: inherit;
      transition: all 0.3s;
    }
    .wave-active {
      z-index: 1;
      /* 默认不可见：环由选中态驱动，程序化选中时鼠标未必在项上 */
      visibility: hidden;
      border: 2px solid var(--va-cp-checkbox-primary-color, var(--va-primary-color));
      animation-name: antCheckboxEffect;
      animation-fill-mode: backwards;
      @keyframes antCheckboxEffect {
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
  &:hover .checkbox-box .wave-active {
    visibility: visible;
    /* 悬停中选中时环随选中底色一起提亮 */
    border-color: var(--va-cp-checkbox-primary-color-hover, var(--va-primary-color-hover));
  }
  .checkbox-checked {
    background-color: var(--va-cp-checkbox-primary-color, var(--va-primary-color));
    border-color: var(--va-cp-checkbox-primary-color, var(--va-primary-color));
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
      background-color: var(--va-cp-checkbox-primary-color, var(--va-primary-color));
      border: 0;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  .checkbox-label {
    word-break: break-word;
    padding: 0 8px;
  }
}
.checkbox-disabled {
  color: var(--va-text-color-disabled);
  cursor: not-allowed;
  .checkbox-box {
    border-color: var(--va-border-color);
    background-color: var(--va-fill-color-1);
    &::after {
      border-color: var(--va-text-color-disabled);
      animation-name: none;
    }
  }
  /* 半选禁用：实心小方块随禁用态去饱和，与禁用文字同色 */
  .checkbox-indeterminate::after {
    background-color: var(--va-text-color-disabled);
  }
}
</style>
