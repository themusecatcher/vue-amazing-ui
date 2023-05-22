<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
interface Props {
  width?: string|number // 滑动输入条的宽度
  min?: number // 滑动输入条最小值
  max?: number // 滑动输入条最大值
  disabled?: boolean // 是否禁用
  range?: boolean // 是否双滑块模式
  step?: number // 步长，取值必须大于0，并且可被 (max - min) 整除
  tipFormatter?: Function | null // Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。
  value?: number | number[] // （v-model）设置当前取值，当 range 为 false 时，使用 number，否则用 [number, number]
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  min: 0,
  max: 100,
  disabled: false,
  range: false,
  step: 1,
  tipFormatter: () => {},
  value: 0
})
const transition = ref(false)
const timer = ref()
const left = ref(0) // 左滑块距离滑动条左端的距离
const right = ref(0) // 右滑动距离滑动条左端的距离
const slider = ref()
const sliderWidth = ref()
const leftHandle = ref() // left模板引用
const rightHandle = ref() // right模板引用

const scale = computed(() => {
  return sliderWidth.value / (props.max - props.min)
})
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const sliderValue = computed(() => {
  const high = Math.round(right.value / scale.value + props.min)
  if (props.range) {
    const low = Math.round(left.value / scale.value + props.min)
    return [low, high]
  }
  return high
})
console.log(typeof props.tipFormatter)
const leftValue = computed(() => {
  if (props.range) {
    if (typeof props.tipFormatter === 'function') {
      return props.tipFormatter((sliderValue.value as number[])[0])
    }
    return (sliderValue.value as number[])[0]
  }
  return null
})
const rightValue = computed(() => {
  if (props.range) {
    if (typeof props.tipFormatter === 'function') {
      return props.tipFormatter((sliderValue.value as number[])[0])
    }
    return (sliderValue.value as number[])[1]
  }
  if (typeof props.tipFormatter === 'function') {
    return props.tipFormatter(sliderValue.value)
  }
  return sliderValue.value
})
const emits = defineEmits(['update:value', 'change'])
watch(
  () => props.value,
  () => { getPosition() })
watch(sliderValue, (to) => {
  emits('update:value', to)
  emits('change', to)
})
onMounted(() => {
  getSliderWidth()
  getPosition()
})
function formatter (value: number) {
  return value
}
function getSliderWidth () {
  sliderWidth.value = slider.value.offsetWidth
}
function getPosition () {
  if (props.range) { // 双滑块模式
    left.value = ((props.value as number[])[0] - props.min) * scale.value
    right.value = ((props.value as number[])[1] - props.min) * scale.value
  } else {
    right.value = (props.value as number - props.min) * scale.value
  }
}
function onClickPoint (e: any) { // 点击滑动条，移动滑块
  if (props.disabled) {
    return
  }
  if (transition.value) {
    cancelRaf(timer.value)
    timer.value = null
  } else {
    transition.value = true
  }
  timer.value = rafTimeout(() => {
    transition.value = false
  }, 300)
  // 元素是absolute时，e.layerX是相对于自身元素左上角的水平位置
  const targetX = e.layerX // 鼠标点击位置距离滑动输入条左端的水平距离
  if (props.range) { // 双滑块模式
    if (targetX <= left.value) {
      left.value = targetX
    } else if (targetX >= right.value) {
      right.value = targetX
    } else {
      if ((targetX - left.value) < (right.value - targetX)) {
        left.value = targetX
      } else {
        right.value = targetX
      }
    }
  } else { // 单滑块模式
    right.value = targetX
  }
}
function onLeftMouseDown () { // 在滚动条上拖动左滑块
  if (props.disabled) {
    return
  }
  const leftX = slider.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  document.onmousemove = (e: MouseEvent) => {
    // e.clientX返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    const targetX = e.clientX - leftX
    if (targetX < 0) {
      left.value = 0
    } else if (targetX >= 0 && targetX <= right.value) {
      left.value = targetX
    } else { // targetX > right
      left.value = right.value
      onRightMouseDown()
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
  }
}
function onRightMouseDown () { // 在滚动条上拖动右滑块
  if (props.disabled) {
    return
  }
  const leftX = slider.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  document.onmousemove = (e: MouseEvent) => {
    // e.clientX返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    const targetX = e.clientX - leftX
    if (targetX > sliderWidth.value) {
      right.value = sliderWidth.value
    } else if (left.value <= targetX && targetX <= sliderWidth.value) {
      right.value = targetX
    } else { // targetX < left
      right.value = left.value
      onLeftMouseDown()
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
  }
}
function onLeftSlide (source: number, place: string) {
  if (props.disabled) {
    return
  }
  const targetX = source - props.step * scale.value
  if (place === 'left') { // 左滑块左移
    if (targetX < 0) {
      left.value = 0
    } else {
      left.value = targetX
    }
  } else { // 右滑块左移
    if (targetX >= left.value) {
      right.value = targetX
    } else {
      right.value = left.value
      left.value = targetX
    }
  }
}
function onRightSlide (source: number, place: string) {
  if (props.disabled) {
    return
  }
  const targetX = source + props.step * scale.value
  if (place === 'right') { // 右滑块右移
    if (targetX > sliderWidth.value) {
      right.value = sliderWidth.value
    } else {
      right.value = targetX
    }
  } else { // 左滑块右移
    if (targetX <= right.value) {
      left.value = targetX
    } else {
      left.value = right.value
      right.value = targetX
    }
  }
}
</script>
<template>
  <div :class="['m-slider', { disabled: disabled }]" ref="slider" :style="`width: ${totalWidth};`">
    <div class="u-slider-rail" @click.self="onClickPoint"></div>
    <div class="u-slider-track" :class="{trackTransition: transition}" :style="`left: ${left}px; right: auto; width: ${right - left}px;`"></div>
    <div
      v-if="range"
      tabindex="-1"
      ref="leftHandle"
      class="u-slider-handle"
      :class="{handleTransition: transition}"
      :style="`left: ${left}px; right: auto; transform: translate(-50%, -50%);`"
      @keydown.left.prevent="onLeftSlide(left, 'left')"
      @keydown.right.prevent="onRightSlide(left, 'left')"
      @keydown.down.prevent="onLeftSlide(left, 'left')"
      @keydown.up.prevent="onRightSlide(left, 'left')"
      @mousedown="onLeftMouseDown">
      <div v-if="tipFormatter !== null" class="u-handle-tooltip">
        {{ leftValue }}
        <div class="m-arrow">
          <span class="u-arrow"></span>
        </div>
      </div>
    </div>
    <div
      tabindex="-1"
      ref="rightHandle"
      class="u-slider-handle"
      :class="{handleTransition: transition}"
      :style="`left: ${right}px; right: auto; transform: translate(-50%, -50%);`"
      @keydown.left.prevent="onLeftSlide(right, 'right')"
      @keydown.right.prevent="onRightSlide(right, 'right')"
      @keydown.down.prevent="onLeftSlide(right, 'right')"
      @keydown.up.prevent="onRightSlide(right, 'right')"
      @mousedown="onRightMouseDown">
      <div v-if="tipFormatter !== null" class="u-handle-tooltip">
        {{ rightValue }}
        <div class="m-arrow">
          <span class="u-arrow"></span>
        </div>
      </div></div>
  </div>
</template>
<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.m-slider {
  display: inline-block;
  height: 4px;
  position: relative;
  z-index: 9;
  touch-action: none; // 禁用元素上的所有手势,使用自己的拖动和缩放api
  .u-slider-rail { // 灰色未选择滑动条背景色
    position: absolute;
    z-index: 99;
    height: 4px;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 2px;
    cursor: pointer;
    transition: background-color .3s;
  }
  .u-slider-track { // 蓝色已选择滑动条背景色
    position: absolute;
    z-index: 99;
    background: lighten(fade(@themeColor, 54%), 10%);
    border-radius: 4px;
    height: 4px;
    cursor: pointer;
    transition: background .3s;
    pointer-events: none;
  }
  .trackTransition {
    transition: left .2s, width .2s, background .3s;
  }
  &:hover {
    .u-slider-rail { // 灰色未选择滑动条背景色
      background: #E3E3E3;
    }
    .u-slider-track { // 蓝色已选择滑动条背景色
      background: @themeColor;
    }
  }
  .u-slider-handle { // 滑块
    position: absolute;
    z-index: 999;
    width: 14px;
    height: 14px;
    top: 50%;
    background: #fff;
    border: 2px solid lighten(fade(@themeColor, 54%), 10%);
    border-radius: 50%;
    cursor: pointer;
    transition: width .3s, height .3s, border-color .3s, border-width .3s, transform .3s cubic-bezier(.18,.89,.32,1.28);
    .u-handle-tooltip {
      position: relative;
      display: inline-block;
      padding: 6px 8px;
      font-size: 14px;
      color: #FFF;
      line-height: 20px;
      text-align: center;
      min-width: 32px;
      border-radius: 6px;
      transform: translate(-50%, -50%) scale(0.8);
      top: -32px;
      left: 50%;
      background: rgba(0,0,0,.85);
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
      pointer-events: none;
      opacity: 0;
      transition: transform .25s, opacity .25s;
      .m-arrow {
        position: absolute;
        z-index: 9;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 100%);
        width: 15.55px;
        height: 10px;
        border-radius: 0 0 5px 5px;
        overflow: hidden;
        .u-arrow {
          position: absolute;
          left: 50%;
          top: -1px;
          transform: translate(-50%, -50%) rotate(45deg);
          margin: 0 auto;
          width: 11px;
          height: 11px;
          border-radius: 0 0 2px 0;
          z-index: 8;
          background: rgba(0,0,0,.85);
          box-shadow: 1px 1px 1px 1px fade(@themeColor, 12%);
        }
      }
    }
    &:hover {
      width: 20px;
      height: 20px;
      border-width: 4px;
      border-color: @themeColor;
      .u-handle-tooltip {
        pointer-events: auto;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  .handleTransition {
    transition: left .2s;
  }
}
.disabled {
  .u-slider-rail {
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.06);
  }
  .u-slider-track {
    background: rgba(0, 0, 0, .25);
  }
  .u-slider-handle {
    border-color: rgba(0, 0, 0, .25);
    cursor: not-allowed;
    &:hover {
      width: 14px;
      height: 14px;
      border-width: 2px;
      border-color: rgba(0, 0, 0, .25);
    }
  }
  &:hover {
    .u-slider-rail {
      background: rgba(0, 0, 0, .06);
    }
    .u-slider-track {
      background: rgba(0, 0, 0, .25);
    }
  }
}
</style>
