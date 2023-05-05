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
  value?: number | number[] // （v-model）设置当前取值，当 range 为 false 时，使用 number，否则用 [number, number]
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  min: 0,
  max: 100,
  disabled: false,
  range: false,
  step: 1,
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
const emit = defineEmits(['update:value', 'change'])
watch(
  () => props.value,
  () => { getPosition() })
watch(sliderValue, (to) => {
  emit('update:value', to)
  emit('change', to)
})
onMounted(() => {
  getSliderWidth()
  getPosition()
})
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
      @mousedown="onLeftMouseDown"></div>
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
      @mousedown="onRightMouseDown"
      ></div>
  </div>
</template>
<style lang="less" scoped>
.m-slider {
  box-sizing: border-box;
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
    &:hover {
      width: 20px;
      height: 20px;
      border-width: 4px;
      border-color: @themeColor;
    }
  }
  .handleTransition {
    transition: left .2s;
  }
}
.disabled {
  cursor: not-allowed;
  .u-slider-rail {
    pointer-events: none;
  }
  .u-slider-track {
    background: rgba(0, 0, 0, .25);
  }
  .u-slider-handle {
    border-color: rgba(0, 0, 0, .25);
    pointer-events: none;
  }
  &:hover {
    .u-slider-track {
       background: rgba(0, 0, 0, .25);
    }
  }
}
</style>
