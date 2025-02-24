<script setup lang="ts">
import { ref, computed, watch, isVNode } from 'vue'
import type { VNode, CSSProperties } from 'vue'
import { useResizeObserver } from 'components/utils'
export type Marks = { [markValue: number]: string | VNode | { style: CSSProperties, label: string | VNode } | (() => VNode) }
export interface Props {
  width?: string | number // 滑动输入条宽度，单位 px，水平模式时生效
  height?: string | number // 滑动输入条高度，单位 px，垂直模式时生效
  vertical?: boolean // 是否启用垂直模式
  min?: number // 最小值
  max?: number // 最大值
  marks?: Marks // 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
  disabled?: boolean // 是否禁用
  range?: boolean // 是否使用双滑块模式
  step?: number // 步长，取值必须大于 0，并且可被 (max - min) 整除
  formatTooltip?: (value: number) => string | number // Slider 会把当前值传给 formatTooltip，并在 Tooltip 中显示 formatTooltip 的返回值
  tooltip?: boolean // 是否展示 Tooltip
  value?: number | number[] // (v-model) 设置当前取值，当 range 为 false 时，使用 number，否则用 [number, number]
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  vertical: false,
  min: 0,
  max: 100,
  marks: () => ({}),
  disabled: false,
  range: false,
  step: 1,
  formatTooltip: (value: number) => value,
  tooltip: true,
  value: 0
})
const sliderRef = ref() // slider 模板引用
const sliderWidth = ref<number>(0) // 滑动输入条宽度
const sliderHeight = ref<number>(0) // 滑动输入条高度
const low = ref<number>(0) // 左/下滑块距离滑动条左/上端的距离
const high = ref<number>(0) // 右/上滑动距离滑动条左/上端的距离
const lowHandleRef = ref() // low handle DOM 引用
const lowTooltipRef = ref() // low tooltip DOM 引用
const highHandleRef = ref() // high handle DOM 引用
const highTooltipRef = ref() // high tooltip DOM 引用
const emits = defineEmits(['update:value', 'change'])
const sliderSize = computed(() => {
  if (!props.vertical) {
    return sliderWidth.value
  } else {
    return sliderHeight.value
  }
})
const sliderStyle = computed(() => {
  if (!props.vertical) {
    return {
      width: typeof props.width === 'number' ? `${props.width}px` : props.width
    }
  } else {
    return {
      height: typeof props.height === 'number' ? `${props.height}px` : props.height
    }
  }
})
const trackStyle = computed(() => {
  if (!props.vertical) {
    return {
      left: `${low.value}px`,
      right: 'auto',
      width: `${high.value - low.value}px`
    }
  } else {
    return {
      bottom: `${low.value}px`,
      top: 'auto',
      height: `${high.value - low.value}px`
    }
  }
})
const lowHandleStyle = computed(() => {
  if (!props.vertical) {
    return {
      left: `${low.value}px`,
      right: 'auto',
      transform: 'translate(-50%, -50%)'
    }
  } else {
    return {
      bottom: `${low.value}px`,
      top: 'auto',
      transform: 'translate(-50%, 50%)'
    }
  }
})
const highHandleStyle = computed(() => {
  if (!props.vertical) {
    return {
      left: `${high.value}px`,
      right: 'auto',
      transform: 'translate(-50%, -50%)'
    }
  } else {
    return {
      bottom: `${high.value}px`,
      top: 'auto',
      transform: 'translate(-50%, 50%)'
    }
  }
})
const marksDot = computed(() => {
  let dots: number[] = []
  if (Object.keys(props.marks).length > 0) {
    dots = Object.keys(props.marks).map(parseFloat).sort((a, b) => a - b)
  }
  return dots
})
// 获取 step 数值精度
const precision = computed(() => {
  const strNumArr = props.step.toString().split('.')
  return strNumArr[1]?.length ?? 0
})
// 滑动输入条的值（通过 handle 位置计算得出）
const sliderValue = computed(() => {
  let highValue
  if (high.value === sliderSize.value) {
    highValue = props.max
  } else {
    highValue = fixedDigit(pixelStepOperation(high.value, '/') * props.step + props.min, precision.value)
    if (props.step > 1) {
      highValue = Math.round(highValue / props.step) * props.step
    }
  }
  if (props.range) {
    let lowValue = fixedDigit(pixelStepOperation(low.value, '/') * props.step + props.min, precision.value)
    if (props.step > 1) {
      lowValue = Math.round(lowValue / props.step) * props.step
    }
    return [lowValue, highValue]
  }
  return highValue
})
  const lowTooltipValue = computed(() => {
  if (props.range) {
    return props.formatTooltip((sliderValue.value as number[])[0])
  }
  return null
})
const highTooltipValue = computed(() => {
  if (props.range) {
    return props.formatTooltip((sliderValue.value as number[])[1])
  }
  return props.formatTooltip(sliderValue.value as number)
})
watch(
  () => [props.min, props.max, props.step, props.vertical, props.value],
  () => {
    updateSliderPosition()
  },
  {
    deep: true,
    flush: 'post'
  }
)
watch(sliderValue, (to) => {
  if (JSON.stringify(to) !== JSON.stringify(props.value)) {
    emits('update:value', to)
    emits('change', to)
  }
})
useResizeObserver(sliderRef, () => {
  getSliderSize()
})
function getSliderSize() {
  sliderWidth.value = sliderRef.value.offsetWidth
  sliderHeight.value = sliderRef.value.offsetHeight
  updateSliderPosition()
}
// 更新双滑块时的下/左滑块位置
function updateLowHandlePosition(value: number) {
  const lowValue = pixelStepOperation((checkLow(value) - props.min) / props.step, '*')
  low.value = fixedDigit(lowValue, 2)
}
// 更新双滑块时的上/右滑块位置
function updateHighHandlePosition(value: number) {
  const highValue = pixelStepOperation((checkHigh(value) - props.min) / props.step, '*')
  high.value = fixedDigit(highValue, 2)
}
// 更新单滑块的滑块位置
function updateSingleHandlePosition(value: number) {
  const highValue = pixelStepOperation((checkValue(value) - props.min) / props.step, '*')
  high.value = fixedDigit(highValue, 2)
}
// 通过 sliderValue 计算滑块位置
function updateSliderPosition() {
  if (props.range) {
    // 双滑块模式
    updateLowHandlePosition((props.value as number[])[0])
    updateHighHandlePosition((props.value as number[])[1])
  } else {
    // 单滑块模式
    updateSingleHandlePosition((props.value as number))
  }
}
function checkLow(value: number): number {
  if (value < props.min) {
    return props.min
  }
  return value
}
function checkHigh(value: number): number {
  if (value > props.max) {
    return props.max
  }
  return value
}
function checkValue(value: number): number {
  if (value < props.min) {
    return props.min
  }
  if (value > props.max) {
    return props.max
  }
  return value
}
function fixedDigit(num: number, precision: number) {
  return parseFloat(num.toFixed(precision))
}
function handlerBlur(tooltip: HTMLElement) {
  tooltip.classList.remove('show-handle-tooltip')
}
function handlerFocus(handler: HTMLElement, tooltip: HTMLElement) {
  handler.focus()
  if (props.tooltip) {
    tooltip.classList.add('show-handle-tooltip')
  }
}
// 点击滑动输入条任意位置
function onClickSliderPoint(e: MouseEvent) {
  let targetDistance // 目标移动距离
  if (!props.vertical) {
    // horizontal
    const leftX = sliderRef.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
    // e.clientX 返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    const value = Math.round(pixelStepOperation(e.clientX - leftX, '/'))
    targetDistance = fixedDigit(pixelStepOperation(value, '*'), 2)
  } else {
    const bottomY = sliderRef.value.getBoundingClientRect().bottom // 滑动条下端距离屏幕可视区域上边界的距离
    // e.clientY 返回事件被触发时鼠标指针相对于浏览器可视窗口的垂直坐标
    const value = Math.round(pixelStepOperation(bottomY - e.clientY, '/'))
    targetDistance = fixedDigit(pixelStepOperation(value, '*'), 2)
  }
  if (props.range) {
    // 双滑块模式
    if (targetDistance <= low.value) {
      low.value = targetDistance
      handlerFocus(lowHandleRef.value, lowTooltipRef.value)
    } else if (targetDistance >= high.value) {
      high.value = targetDistance
      handlerFocus(highHandleRef.value, highTooltipRef.value)
    } else {
      if (targetDistance - low.value < high.value - targetDistance) {
        low.value = targetDistance
        handlerFocus(lowHandleRef.value, lowTooltipRef.value)
      } else {
        high.value = targetDistance
        handlerFocus(highHandleRef.value, highTooltipRef.value)
      }
    }
  } else {
    // 单滑块模式
    high.value = targetDistance
    handlerFocus(highHandleRef.value, highTooltipRef.value)
  }
}
function handleLowMouseDown(e: MouseEvent) {
  if (!lowHandleRef.value) return
  document.addEventListener('mousemove', handleLowMouseMove)
  document.addEventListener('mouseup', handleLowMouseUp)
  handleLowMouseMove(e)
}
function handleLowMouseMove(e: MouseEvent) {
  // 在滑动输入条上拖动较小数值滑块
  let originalDistance
  if (!props.vertical) {
    // horizontal
    originalDistance = sliderRef.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  } else {
    originalDistance = sliderRef.value.getBoundingClientRect().bottom // 滑动条下端距离屏幕可视区域上边界的距离
  }
  if (props.tooltip) {
    lowTooltipRef.value.classList.add('show-handle-tooltip')
  }
  let targetDistance // 目标移动距离
  if (!props.vertical) {
    // horizontal
    // e.clientX 返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    const value = Math.round(pixelStepOperation(e.clientX - originalDistance, '/'))
    targetDistance = fixedDigit(pixelStepOperation(value, '*'), 2)
  } else {
    // vertical
    // e.clientY 返回事件被触发时鼠标指针相对于浏览器可视窗口的垂直坐标
    const value = Math.round(pixelStepOperation(originalDistance - e.clientY, '/'))
    targetDistance = fixedDigit(pixelStepOperation(value, '*'), 2)
  }
  if (targetDistance < 0) {
    low.value = 0
  } else if (targetDistance >= 0 && targetDistance <= high.value) {
    low.value = targetDistance
  } else {
    // targetDistance > high
    low.value = high.value
    highHandleRef.value.focus()
    handleLowMouseUp()
    handleHighMouseDown(e)
  }
}
function handleLowMouseUp() {
  if (props.tooltip) {
    lowTooltipRef.value.classList.remove('show-handle-tooltip')
  }
  document.removeEventListener('mousemove', handleLowMouseMove)
  document.removeEventListener('mouseup', handleLowMouseUp)
}
function handleHighMouseDown(e: MouseEvent) {
  if (!highHandleRef.value) return
  document.addEventListener('mousemove', handleHighMouseMove)
  document.addEventListener('mouseup', handleHighMouseUp)
  handleHighMouseMove(e)
}
function handleHighMouseMove(e: MouseEvent) {
  // 在滑动输入条上拖动较大数值滑块
  let originalDistance
  if (!props.vertical) {
    // horizontal
    originalDistance = sliderRef.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  } else {
    originalDistance = sliderRef.value.getBoundingClientRect().bottom // 滑动条下端距离屏幕可视区域上边界的距离
  }
  if (props.tooltip) {
    highTooltipRef.value.classList.add('show-handle-tooltip')
  }
  let targetDistance // 目标移动距离
  if (!props.vertical) {
    // horizontal
    // e.clientX 返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    const value = Math.round(pixelStepOperation(e.clientX - originalDistance, '/'))
    targetDistance = fixedDigit(pixelStepOperation(value, '*'), 2)
  } else {
    // vertical
    // e.clientY 返回事件被触发时鼠标指针相对于浏览器可视窗口的垂直坐标
    const value = Math.round(pixelStepOperation(originalDistance - e.clientY, '/'))
    targetDistance = fixedDigit(pixelStepOperation(value, '*'), 2)
  }
  if (targetDistance > sliderSize.value) {
    high.value = sliderSize.value
  } else if (low.value <= targetDistance && targetDistance <= sliderSize.value) {
    high.value = targetDistance
  } else {
    // targetDistance < low
    high.value = low.value
    if (props.range) {
      lowHandleRef.value.focus()
      handleHighMouseUp()
      handleLowMouseDown(e)
    }
  }
}
function handleHighMouseUp() {
  if (props.tooltip) {
    highTooltipRef.value.classList.remove('show-handle-tooltip')
  }
  document.removeEventListener('mousemove', handleHighMouseMove)
  document.removeEventListener('mouseup', handleHighMouseUp)
}
function getDotStyle(value: number) {
  const offset = `${Math.abs(value - props.min) / (props.max - props.min) * 100}%`
  if (!props.vertical) {
    return {
      left: offset
    }
  } else {
    return {
      bottom: offset
    }
  }
}
function isDotActive(value: number) {
  if (props.range) {
    return (sliderValue.value as number[])[0] <= value && value <= (sliderValue.value as number[])[1]
  }
  return value <= (sliderValue.value as number)
}
function getMarkLabel(value: number) {
  const mark = typeof props.marks[value] === 'function' ? props.marks[value]() : props.marks[value]
  const markIsObject = typeof mark === 'object' && !isVNode(mark)
  let markLabel = markIsObject ? mark.label : mark
  if (markIsObject) {
    console.log('mark', typeof mark.label, isVNode(mark.label))
  }
  if (!markLabel) return null
  return markLabel
}
function getMarkStyle(value: number) {
  const offset = `${Math.abs(value - props.min) / (props.max - props.min) * 100}%`
  let markLabelStyle = {}
  const mark = typeof props.marks[value] === 'function' ? props.marks[value]() : props.marks[value]
  const markIsObject = typeof mark === 'object' && !isVNode(mark)
  if (markIsObject && 'style' in mark) {
    markLabelStyle = mark.style
  }
  if (!props.vertical) {
    return {
      transform: 'translateX(-50%)',
      left: offset,
      ...markLabelStyle
    }
  } else {
    return {
      transform: 'translateY(50%)',
      bottom: offset,
      ...markLabelStyle
    }
  }
}
function onClickMark(value: number) {
  if (props.range) {
    // 双滑块模式
    if (value <= (sliderValue.value as number[])[0]) {
      updateLowHandlePosition(value)
      handlerFocus(lowHandleRef.value, lowTooltipRef.value)
    } else if (value >= (sliderValue.value as number[])[1]) {
      updateHighHandlePosition(value)
      handlerFocus(highHandleRef.value, highTooltipRef.value)
    } else {
      if (value - (sliderValue.value as number[])[0] < (sliderValue.value as number[])[1] - value) {
        updateLowHandlePosition(value)
        handlerFocus(lowHandleRef.value, lowTooltipRef.value)
      } else {
        updateHighHandlePosition(value)
        handlerFocus(highHandleRef.value, highTooltipRef.value)
      }
    }
  } else {
    // 单滑块模式
    updateSingleHandlePosition(value)
    handlerFocus(highHandleRef.value, highTooltipRef.value)
  }
}
function handleLowSlide(source: number, place: string) {
  const targetDistance = pixelStepOperation(source, '-')
  if (place === 'low') {
    // 左/下滑块左/下移
    if (targetDistance < 0) {
      low.value = 0
    } else {
      low.value = targetDistance
    }
  } else {
    // 右/上滑块左/下移
    if (targetDistance >= low.value) {
      high.value = targetDistance
    } else {
      high.value = low.value
      low.value = targetDistance
      lowHandleRef.value.focus()
    }
  }
}
function handleHighSlide(source: number, place: string) {
  const targetDistance = pixelStepOperation(source, '+')
  if (place === 'high') {
    // 右/上滑块右/上移
    if (targetDistance > sliderSize.value) {
      high.value = sliderSize.value
    } else {
      high.value = targetDistance
    }
  } else {
    // 左/下滑块右/上移
    if (targetDistance <= high.value) {
      low.value = targetDistance
    } else {
      low.value = high.value
      high.value = targetDistance
      highHandleRef.value.focus()
    }
  }
}
function pixelStepOperation(target: number, operator: '+' | '-' | '*' | '/'): number {
  if (operator === '+') {
    return target + (sliderSize.value * props.step) / (props.max - props.min)
  }
  if (operator === '-') {
    return target - (sliderSize.value * props.step) / (props.max - props.min)
  }
  if (operator === '*') {
    return (target * sliderSize.value * props.step) / (props.max - props.min)
  }
  if (operator === '/') {
    return (target * (props.max - props.min)) / (sliderSize.value * props.step)
  }
  return target
}
</script>
<template>
  <div
    ref="sliderRef"
    class="m-slider"
    :class="{
      'slider-horizontal': !vertical,
      'slider-vertical': vertical,
      'slider-with-marks': Object.keys(marks).length > 0,
      'slider-disabled': disabled
    }"
    :style="[
      sliderStyle,
      `
        --rail-color: rgba(0, 0, 0, 0.04);
        --rail-color-hover: rgba(0, 0, 0, 0.1);
        --rail-color-disabled: rgba(0, 0, 0, 0.06);
        --track-color: #91caff;
        --track-color-hover: #1677ff;
        --track-color-disabled: rgba(0, 0, 0, 0.25);
        --handle-color: #fff;
        --handle-shadow-color: #91caff;
        --handle-shadow-color-hover-focus: #1677ff;
        --handle-shadow-color-disabled: #bfbfbf;
      `
    ]"
    @click="disabled ? () => false : onClickSliderPoint($event)"
  >
    <div class="slider-rail"></div>
    <div class="slider-track" :style="trackStyle"></div>
    <template v-if="Object.keys(marks).length > 0">
      <div class="slider-dots">
        <span
          class="slider-dot"
          :class="{ 'slider-dot-active': isDotActive(markValue) }"
          :style="getDotStyle(markValue)"
          v-for="(markValue, index) in marksDot" :key="index"
        ></span>
      </div>
      <div class="slider-marks">
        <span
          class="slider-mark"
          :class="{ 'slider-mark-active': isDotActive(markValue) }"
          :style="getMarkStyle(markValue)"
          v-for="(markValue, index) in marksDot" :key="index"
          @click.stop="onClickMark(markValue)"
        >
          <slot name="mark" :label="getMarkLabel(markValue)" :isVNode="isVNode(getMarkLabel(markValue))" :value="markValue">
            <component v-if="isVNode(getMarkLabel(markValue))" :is="getMarkLabel(markValue)"/>
            <template v-else>{{ getMarkLabel(markValue) }}</template>
          </slot>
        </span>
      </div>
    </template>
    <div
      v-if="range"
      tabindex="0"
      ref="lowHandleRef"
      class="slider-handle"
      :style="lowHandleStyle"
      @keydown.left.prevent="disabled ? () => false : handleLowSlide(low, 'low')"
      @keydown.right.prevent="disabled ? () => false : handleHighSlide(low, 'low')"
      @keydown.down.prevent="disabled ? () => false : handleLowSlide(low, 'low')"
      @keydown.up.prevent="disabled ? () => false : handleHighSlide(low, 'low')"
      @mousedown="disabled ? () => false : handleLowMouseDown($event)"
      @blur="tooltip && !disabled ? handlerBlur(lowTooltipRef) : () => false"
    >
      <div v-if="tooltip" ref="lowTooltipRef" class="handle-tooltip">
        {{ lowTooltipValue }}
        <div class="tooltip-arrow"></div>
      </div>
    </div>
    <div
      tabindex="0"
      ref="highHandleRef"
      class="slider-handle"
      :style="highHandleStyle"
      @keydown.left.prevent="disabled ? () => false : handleLowSlide(high, 'high')"
      @keydown.right.prevent="disabled ? () => false : handleHighSlide(high, 'high')"
      @keydown.down.prevent="disabled ? () => false : handleLowSlide(high, 'high')"
      @keydown.up.prevent="disabled ? () => false : handleHighSlide(high, 'high')"
      @mousedown="disabled ? () => false : handleHighMouseDown($event)"
      @blur="tooltip && !disabled ? handlerBlur(highTooltipRef) : () => false"
    >
      <div v-if="tooltip" ref="highTooltipRef" class="handle-tooltip">
        {{ highTooltipValue }}
        <div class="tooltip-arrow"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-slider {
  position: relative;
  cursor: pointer;
  touch-action: none; // 禁用元素上的所有手势,使用自己的拖动和缩放api
  .slider-rail {
    // 灰色轨道颜色
    position: absolute;
    background-color: var(--rail-color);
    border-radius: 2px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slider-track {
    // 蓝色轨道颜色
    position: absolute;
    background-color: var(--track-color);
    border-radius: 2px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slider-dots {
    position: absolute;
    background: transparent;
    pointer-events: none;
    .slider-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #ffffff;
      border: 2px solid #f0f0f0;
      border-radius: 50%;
      cursor: pointer;
      transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .slider-dot-active {
      border-color: #91caff;
    }
  }
  .slider-marks {
    position: absolute;
    font-size: 14px;
    .slider-mark {
      position: absolute;
      display: inline-block;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      word-break: keep-all;
      cursor: pointer;
      user-select: none;
    }
    .slider-mark-active {
      color: rgba(0, 0, 0, 0.88);
    }
  }
  &:hover {
    .slider-rail {
      // 灰色轨道悬浮色
      background: var(--rail-color-hover);
    }
    .slider-track {
      // 蓝色轨道悬浮色
      background: var(--track-color-hover);
    }
    .slider-dots {
      .slider-dot {
        border-color: var(--rail-color-hover);
      }
      .slider-dot-active {
        border-color: var(--track-color-hover);
      }
    }
  }
  .slider-handle {
    // 滑块
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--handle-color);
    box-shadow: 0 0 0 2px var(--handle-shadow-color);
    border-radius: 50%;
    outline: none;
    transition:
      width 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      width: 14px;
      height: 14px;
      background-color: transparent;
    }
    .hover-focus-handle {
      width: 12px;
      height: 12px;
      box-shadow: 0 0 0 4px var(--handle-shadow-color-hover-focus);
    }
    &:hover,
    &:focus {
      .hover-focus-handle();
      &::before {
        left: -5px;
        top: -5px;
        width: 20px;
        height: 20px;
      }
    }
    .handle-tooltip {
      position: relative;
      display: inline-block;
      width: max-content;
      min-width: 32px;
      max-width: 250px;
      padding: 6px 8px;
      height: 32px;
      font-size: 14px;
      color: #fff;
      line-height: 20px;
      text-align: center;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.85);
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      pointer-events: none;
      user-select: none;
      outline: none;
      opacity: 0;
      transition:
        transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      .tooltip-arrow {
        position: absolute;
        z-index: 9;
        display: block;
        pointer-events: none;
        width: 16px;
        height: 16px;
        overflow: hidden;
        &::before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 16px;
          height: 8px;
          background-color: rgba(0, 0, 0, 0.85);
          clip-path: path(
            'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
          );
          content: '';
        }
        &::after {
          position: absolute;
          width: 8.970562748477143px;
          height: 8.970562748477143px;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          border-radius: 0 0 2px 0;
          transform: translateY(50%) rotate(-135deg);
          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
          z-index: 0;
          background: transparent;
          content: '';
        }
      }
    }
  }
}
.slider-horizontal {
  padding-block: 4px;
  height: 12px;
  margin: 10px 5px;
  .slider-rail {
    height: 4px;
    width: 100%;
  }
  .slider-track {
    height: 4px;
  }
  .slider-dots {
    left: 0;
    top: 4px;
    width: 100%;
    height: 4px;
    .slider-dot {
      margin-left: -4px;
      position: absolute;
      top: -2px;
    }
  }
  .slider-marks {
    left: 0;
    top: 14px;
    width: 100%;
  }
  .slider-handle {
    top: 50%;
    .handle-tooltip {
      top: -32px;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      .tooltip-arrow {
        left: 50%;
        bottom: 0;
        transform: translateX(-50%) translateY(100%) rotate(180deg);
      }
    }
    .show-handle-tooltip {
      pointer-events: auto;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    &:hover {
      .handle-tooltip {
        .show-handle-tooltip();
      }
    }
  }
}
.slider-horizontal.slider-with-marks {
  margin-bottom: 30px;
}
.slider-vertical {
  padding-inline: 4px;
  width: 12px;
  margin: 5px 10px;
  .slider-rail {
    width: 4px;
    height: 100%;
  }
  .slider-track {
    width: 4px;
  }
  .slider-dots {
    left: 4px;
    top: 0;
    height: 100%;
    width: 4px;
    .slider-dot {
      margin-bottom: -4px;
      position: absolute;
      left: -2px;
    }
  }
  .slider-marks {
    left: 18px;
    top: 0;
    height: 100%;
  }
  .slider-handle {
    left: 50%;
    .handle-tooltip {
      left: 100%;
      top: 50%;
      transform: translate(16px, -50%) scale(0.8);
      .tooltip-arrow {
        top: 50%;
        left: 0;
        transform: translateY(-50%) translateX(-100%) rotate(-90deg);
      }
    }
    .show-handle-tooltip {
      pointer-events: auto;
      transform: translate(16px, -50%) scale(1);
      opacity: 1;
    }
    &:hover {
      .handle-tooltip {
        .show-handle-tooltip();
      }
    }
  }
}
.slider-disabled {
  cursor: not-allowed;
  .slider-rail {
    background: var(--rail-color-disabled);
  }
  .slider-track {
    background: var(--track-color-disabled);
  }
  .slider-handle {
    box-shadow: 0 0 0 2px var(--handle-shadow-color-disabled);
    &:hover,
    &:focus {
      width: 10px;
      height: 10px;
      box-shadow: 0 0 0 2px var(--handle-shadow-color-disabled);
    }
  }
  &:hover {
    .slider-rail {
      background: var(--rail-color-disabled);
    }
    .slider-track {
      background: var(--track-color-disabled);
    }
  }
}
.slider-vertical.slider-with-marks {
  margin-right: 36px;
}
</style>
