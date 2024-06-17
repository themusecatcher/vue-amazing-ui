<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
import { useTransition } from '@vueuse/core'
import Spin from '../spin'
interface Image {
  title?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
  [key: string]: any
}
interface SpinProperties {
  size?: 'small' | 'default' | 'large' // 尺寸大小
  tip?: string // 描述文案
  indicator?: 'dot' | 'quarter-circle' | 'half-circle' | 'three-quarters-circle' | 'dynamic-circle' // 加载指示符
  color?: string // 主题颜色
}
interface Props {
  images: Image[] // 走马灯图片数组
  autoplay?: boolean // 是否自动切换
  interval?: number // 自动滑动轮播间隔，单位ms
  width?: number | string // 走马灯宽度
  height?: number | string // 走马灯高度
  navigation?: boolean // 是否显示导航
  navColor?: string // 导航颜色
  navSize?: number // 导航大小
  dots?: boolean // 是否显示指示点
  dotActiveColor?: string // 指示点选中颜色
  dotSize?: number // 指示点大小
  dotStyle?: CSSProperties // 指示点样式，优先级高于dotSize
  dotPosition?: 'bottom' | 'top' | 'left' | 'right' // 指示点位置
  spinStyle?: SpinProperties // 加载样式配置
  animationDuration?: number // 滑动动画持续时长，单位ms
  animationFunction?: number[] // 滑动动画函数，参考 useTransition 写法：https://vueuse.org/core/useTransition/#usage
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  autoplay: true,
  interval: 3000,
  width: '100%',
  height: '100vh',
  navigation: true,
  navColor: '#FFF',
  navSize: 36,
  dots: true,
  dotActiveColor: '#1677FF',
  dotSize: 10,
  dotStyle: () => ({}),
  dotPosition: 'bottom',
  spinStyle: () => ({}),
  animationDuration: 1000,
  animationFunction: () => [0.65, 0, 0.35, 1]
})
const carouselWidth = computed(() => {
  // 走马灯区域宽度
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const carouselHeight = computed(() => {
  // 走马灯区域高度
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return props.height
  }
})
const totalWidth = computed(() => {
  // 容器宽度：(图片数组长度+1) * 图片宽度
  return (props.images.length + 1) * imageWidth.value
})
const imageCount = computed(() => {
  // 图片数量
  return props.images.length
})
const left = ref(0) // 滑动偏移值
const slideTimer = ref() // 轮播切换定时器
const stopCarousel = ref(false) // 鼠标悬浮时，停止切换标志
const switchPrevent = ref(false) // 在滑动切换过程中，禁用其他所有切换操作
const targetPosition = ref() // 目标移动位置
const carousel = ref() // DOM引用
const activeSwitcher = ref(1) // 当前展示图片标识
const imageWidth = ref() // 图片宽度
const imageHeight = ref() // 图片高度
const complete = ref(Array(imageCount.value).fill(false)) // 图片是否加载完成
watch(
  () => [props.images, props.autoplay, props.interval, complete.value[0]],
  () => {
    if (complete.value[0] && imageCount.value > 1) {
      autoSlide() // 自动滑动轮播
    }
  },
  {
    deep: true,
    flush: 'post'
  }
)
watch(
  () => [props.width, props.height],
  () => {
    getImageSize() // 获取每张图片大小
  },
  {
    deep: true,
    flush: 'post'
  }
)
onMounted(() => {
  getImageSize() // 获取每张图片大小
  // 监听事件
  document.addEventListener('keydown', keyboardSwitch)
  document.addEventListener('visibilitychange', visibilityChange)
})
onUnmounted(() => {
  // 移除事件
  document.removeEventListener('keydown', keyboardSwitch)
  document.removeEventListener('visibilitychange', visibilityChange)
})
function onComplete(index: number) {
  // 图片加载完成
  complete.value[index] = true
}
function getImageSize() {
  imageWidth.value = carousel.value.offsetWidth
  imageHeight.value = carousel.value.offsetHeight
}
function keyboardSwitch(e: KeyboardEvent) {
  e.preventDefault()
  if (imageCount.value > 1) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      onLeftArrow()
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      onRightArrow()
    }
  }
}
// 当用户导航到新页面、切换标签页、关闭标签页、最小化或关闭浏览器，或者在移动设备上从浏览器切换到不同的应用程序时，暂停切换
function visibilityChange() {
  console.log('visibilityState', document.visibilityState)
  const visibility = document.visibilityState
  if (visibility === 'hidden') {
    slideTimer && cancelRaf(slideTimer.value)
    left.value = originNumber.value + distance.value
  } else {
    // visible
    autoSlide()
  }
}
function onStart() {
  if (imageCount.value > 1 && complete.value[0]) {
    // 超过一条时滑动
    stopCarousel.value = false
    autoSlide() // 自动滑动轮播
    console.log('Carousel Start')
  }
}
function onStop() {
  slideTimer.value && cancelRaf(slideTimer.value)
  stopCarousel.value = true
  console.log('Carousel Stop')
}
function autoSlide() {
  if (props.autoplay && !stopCarousel.value) {
    slideTimer.value && cancelRaf(slideTimer.value)
    slideTimer.value = rafTimeout(() => {
      switchPrevent.value = true // 禁用导航切换
      const target = (left.value % (imageCount.value * imageWidth.value)) + imageWidth.value
      activeSwitcher.value = (activeSwitcher.value % imageCount.value) + 1
      moveLeft(target)
    }, props.interval)
  }
}
function onLeftArrow() {
  if (!switchPrevent.value) {
    switchPrevent.value = true
    slideTimer && cancelRaf(slideTimer.value)
    const target = ((activeSwitcher.value + imageCount.value - 2) % imageCount.value) * imageWidth.value
    activeSwitcher.value = activeSwitcher.value - 1 > 0 ? activeSwitcher.value - 1 : imageCount.value
    moveRight(target)
  }
}
function onRightArrow() {
  if (!switchPrevent.value) {
    switchPrevent.value = true
    slideTimer && cancelRaf(slideTimer.value)
    const target = activeSwitcher.value * imageWidth.value
    activeSwitcher.value = (activeSwitcher.value % imageCount.value) + 1
    moveLeft(target)
  }
}
const baseNumber = ref(0)
const originNumber = ref(0) // 初始位置
const distance = ref(0) // 滑动距离
// @ts-ignore
const cubicBezierNumber = useTransition(baseNumber, {
  duration: props.animationDuration, // 过渡动画时长
  transition: props.animationFunction // 过渡动画函数
})
function toggleNumber(target: number) {
  targetPosition.value = target
  baseNumber.value = baseNumber.value ? 0 : 1
  originNumber.value = left.value // 初始位置
  distance.value = target - originNumber.value // 总距离
}
function moveEffect() {
  // 滑动效果函数
  if (baseNumber.value) {
    left.value = originNumber.value + distance.value * cubicBezierNumber.value
  } else {
    left.value = originNumber.value + distance.value * (1 - cubicBezierNumber.value)
  }
}
function moveLeftEffect() {
  if (left.value >= targetPosition.value) {
    switchPrevent.value = false
    autoSlide() // 自动间隔切换下一张
  } else {
    moveEffect()
    requestAnimationFrame(moveLeftEffect)
  }
}
function moveLeft(target: number) {
  // 箭头切换或跳转切换，向左滑动效果
  if (left.value === imageCount.value * imageWidth.value) {
    // 最后一张时，重置left
    left.value = 0
  }
  toggleNumber(target)
  requestAnimationFrame(moveLeftEffect)
}
function moveRightEffect() {
  if (left.value <= targetPosition.value) {
    switchPrevent.value = false
  } else {
    moveEffect()
    requestAnimationFrame(moveRightEffect)
  }
}
function moveRight(target: number) {
  // 箭头切换或跳转切换，向右滑动效果
  if (left.value === 0) {
    // 第一张时，重置left
    left.value = imageCount.value * imageWidth.value
  }
  toggleNumber(target)
  requestAnimationFrame(moveRightEffect)
}
function onSwitch(n: number) {
  // 分页切换图片
  if (!switchPrevent.value && activeSwitcher.value !== n) {
    switchPrevent.value = true
    const target = (n - 1) * imageWidth.value
    if (n < activeSwitcher.value) {
      // 往右滑动
      activeSwitcher.value = n
      moveRight(target)
    }
    if (n > activeSwitcher.value) {
      // 往左滑动
      activeSwitcher.value = n
      moveLeft(target)
    }
  }
}
const emit = defineEmits(['click'])
function clickImage(image: Image) {
  emit('click', image)
}
</script>
<template>
  <div
    class="m-slider"
    ref="carousel"
    :style="`--navColor: ${navColor}; --dotActiveColor: ${dotActiveColor}; width: ${carouselWidth}; height: ${carouselHeight};`"
    @mouseenter="onStop"
    @mouseleave="onStart"
  >
    <div :style="`width: ${totalWidth}px; height: 100%; will-change: transform; transform: translateX(${-left}px);`">
      <div class="m-image" @click="clickImage(image)" v-for="(image, index) in images" :key="index">
        <Spin :spinning="!complete[index]" indicator="dynamic-circle" v-bind="spinStyle">
          <img
            @load="onComplete(index)"
            :src="image.src"
            :key="image.src"
            :alt="image.title"
            class="u-image"
            :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"
          />
        </Spin>
      </div>
      <div class="m-image" @click="clickImage(images[0])" v-if="imageCount">
        <Spin :spinning="!complete[0]" indicator="dynamic-circle" v-bind="spinStyle">
          <img
            @load="onComplete(0)"
            :src="images[0].src"
            :key="images[0].src"
            :alt="images[0].title"
            class="u-image"
            :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"
          />
        </Spin>
      </div>
    </div>
    <template v-if="navigation">
      <svg
        class="arrow-left"
        :style="`width: ${navSize}px; height: ${navSize}px;`"
        @click="onLeftArrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z"
        ></path>
      </svg>
      <svg
        class="arrow-right"
        :style="`width: ${navSize}px; height: ${navSize}px;`"
        @click="onRightArrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z"
        ></path>
      </svg>
    </template>
    <div class="m-switch" :class="`switch-${dotPosition}`" v-if="dots">
      <div
        @click="onSwitch(n)"
        :class="['u-circle', { active: activeSwitcher === n }]"
        :style="[{ width: `${dotSize}px`, height: `${dotSize}px` }, dotStyle]"
        v-for="n in imageCount"
        :key="n"
      ></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-slider {
  display: inline-block;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .transition {
    transition: transform 0.3s ease-out;
  }
  .m-image {
    display: inline-block;
    .u-image {
      display: inline-block;
      object-fit: cover;
      vertical-align: bottom; // 消除img标签底部的5px
      cursor: pointer;
    }
  }
  &:hover {
    .arrow-left {
      opacity: 0.7;
      pointer-events: auto;
    }
    .arrow-right {
      opacity: 0.7;
      pointer-events: auto;
    }
  }
  .arrow-left {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--navColor);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .arrow-right {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--navColor);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .m-switch {
    display: flex;
    justify-content: center;
    gap: 8px;
    position: absolute;
    z-index: 9;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    .u-circle {
      // flex: 0 1 auto;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .active {
      background-color: var(--dotActiveColor) !important;
    }
  }
  .switch-top {
    top: 12px;
    bottom: auto;
  }
  .switch-left {
    left: 12px;
    right: auto;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    flex-direction: column;
  }
  .switch-right {
    right: 12px;
    left: auto;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    flex-direction: column;
  }
}
</style>
