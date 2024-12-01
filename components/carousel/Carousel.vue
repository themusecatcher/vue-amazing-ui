<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf, useEventListener, useResizeObserver } from 'components/utils'
import { useTransition } from '@vueuse/core'
import Spin from 'components/spin'
export interface Image {
  title?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
}
export interface Props {
  images?: Image[] // 走马灯图片数组
  width?: number | string // 走马灯宽度，单位 px
  height?: number | string // 走马灯高度，单位 px
  autoplay?: boolean // 是否自动轮播
  pauseOnMouseEnter?: boolean // 当鼠标移入走马灯时，是否暂停自动轮播
  effect?: 'slide' | 'fade' // 轮播图切换时的过渡效果
  interval?: number // 自动轮播间隔，单位 ms
  showArrow?: boolean // 是否显示箭头
  arrowColor?: string // 箭头颜色
  arrowSize?: number // 箭头大小，单位 px
  dots?: boolean // 是否显示指示点
  dotSize?: number // 指示点大小，单位 px
  dotColor?: string // 指示点颜色
  dotActiveColor?: string // 指示点选中颜色
  dotStyle?: CSSProperties // 指示点样式，优先级高于 dotSize、dotColor
  dotActiveStyle?: CSSProperties // 指示点选中样式，优先级高于 dotActiveColor
  dotPosition?: 'bottom' | 'top' | 'left' | 'right' // 指示点位置，位置为 'left' | 'right' 时，effect: 'slide' 轮播自动变为垂直轮播
  dotsTrigger?: 'click' | 'hover' // 指示点触发切换的方式
  spinProps?: object // 图片加载中样式，Spin 组件属性配置，参考 Spin Props
  fadeDuration?: number // 渐变动画持续时长，单位 ms，仅当 effect 为 'fade' 时生效
  fadeFunction?: string // 渐变动画函数，仅当 effect 为 'fade' 时生效，可参考 transition-timing-function 写法：https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
  slideDuration?: number // 滑动动画持续时长，单位 ms，仅当 effect 为 'slide' 时生效
  slideFunction?: string | number[] // 滑动动画函数，仅当 effect 为 'slide' 时生效，可参考 useTransition 写法：https://vueuse.org/core/useTransition/#usage
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  width: '100%',
  height: '100vh',
  autoplay: false,
  pauseOnMouseEnter: false,
  effect: 'slide',
  interval: 3000,
  showArrow: true,
  arrowColor: '#FFF',
  arrowSize: 36,
  dots: true,
  dotSize: 10,
  dotColor: 'rgba(255, 255, 255, 0.3)',
  dotActiveColor: '#1677FF',
  dotStyle: () => ({}),
  dotActiveStyle: () => ({}),
  dotPosition: 'bottom',
  dotsTrigger: 'click',
  spinProps: () => ({}),
  fadeDuration: 500,
  fadeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  slideDuration: 800,
  slideFunction: () => [0.65, 0, 0.35, 1]
})
const offset = ref(0) // 滑动偏移值
const slideTimer = ref() // 轮播切换定时器
const stopCarousel = ref(false) // 鼠标悬浮时，停止切换标志
const switchPrevent = ref(false) // 在滑动切换过程中，禁用其他所有切换操作
const moveEffectRaf = ref() // 移动过程 requestAnimationFrame 的返回值，一个 long 整数，请求 ID，是回调列表中唯一的标识
const targetPosition = ref() // 目标移动位置
const carouselRef = ref() // carousel DOM 引用
const activeSwitcher = ref(1) // 当前展示图片标识
const imageWidth = ref() // 图片宽度
const imageHeight = ref() // 图片高度
const complete = ref(Array(props.images.length).fill(false)) // 图片是否加载完成
const emits = defineEmits(['change', 'click'])
const carouselWidth = computed(() => {
  // 走马灯区域宽度
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else {
    return props.width
  }
})
const carouselHeight = computed(() => {
  // 走马灯区域高度
  if (typeof props.height === 'number') {
    return `${props.height}px`
  } else {
    return props.height
  }
})
const imageAmount = computed(() => {
  // 轮播图片数量
  return props.images.length
})
const verticalSlide = computed(() => {
  // 是否垂直轮播
  return ['left', 'right'].includes(props.dotPosition)
})
const moveUnitDistance = computed(() => {
  // 每次移动的单位距离
  if (verticalSlide.value) {
    return imageHeight.value
  } else {
    return imageWidth.value
  }
})
const carouselStyle = computed(() => {
  if (props.effect === 'slide') {
    return {
      transform: (verticalSlide.value ? 'translateY' : 'translateX') + `(${-offset.value}px)`
    }
  } else {
    return {}
  }
})
watch(
  () => [
    verticalSlide.value,
    props.effect,
    props.images,
    props.autoplay,
    props.interval,
    props.fadeDuration,
    props.fadeFunction,
    complete.value[0]
  ],
  () => {
    initCarousel()
  },
  {
    deep: true,
    flush: 'post'
  }
)
watch(activeSwitcher, (to) => {
  emits('change', to)
})
useEventListener(document, 'visibilitychange', visibilityChange)
useResizeObserver(carouselRef, () => {
  getImageSize()
  initCarousel()
})
function initCarousel() {
  slideTimer.value && cancelRaf(slideTimer.value)
  moveEffectRaf.value && cancelAnimationFrame(moveEffectRaf.value)
  switchPrevent.value = false
  if (props.effect === 'slide') {
    offset.value = (activeSwitcher.value - 1) * moveUnitDistance.value
  }
  onStart()
}
function onComplete(index: number) {
  // 图片加载完成
  complete.value[index] = true
}
function getImageSize() {
  // 获取每张图片大小
  imageWidth.value = carouselRef.value.offsetWidth
  imageHeight.value = carouselRef.value.offsetHeight
}
function onKeyboard(e: KeyboardEvent) {
  if (imageAmount.value > 1) {
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
  const visibility = document.visibilityState
  if (visibility === 'hidden') {
    // hidden
    slideTimer.value && cancelRaf(slideTimer.value)
    offset.value = originNumber.value + distance.value
    switchPrevent.value = false
  } else {
    // visible
    onStart()
  }
}
function onStart() {
  if (props.autoplay && imageAmount.value > 1 && complete.value[0]) {
    // 超过一条时滑动
    stopCarousel.value = false
    autoSlide() // 自动滑动轮播
    // console.log('Carousel Start')
  }
}
function onStop() {
  slideTimer.value && cancelRaf(slideTimer.value)
  stopCarousel.value = true
  // console.log('Carousel Stop')
}
function autoSlide() {
  if (!stopCarousel.value) {
    slideTimer.value && cancelRaf(slideTimer.value)
    slideTimer.value = rafTimeout(() => {
      switchPrevent.value = true // 禁用导航切换
      if (props.effect === 'slide') {
        const target = (offset.value % (imageAmount.value * moveUnitDistance.value)) + moveUnitDistance.value
        moveLeft(target)
        activeSwitcher.value = (activeSwitcher.value % imageAmount.value) + 1
      } else {
        // fade
        moveFade('left')
      }
    }, props.interval)
  }
}
function onLeftArrow() {
  if (!switchPrevent.value) {
    switchPrevent.value = true
    slideTimer.value && cancelRaf(slideTimer.value)
    if (props.effect === 'slide') {
      const target = ((activeSwitcher.value + imageAmount.value - 2) % imageAmount.value) * moveUnitDistance.value
      moveRight(target)
      activeSwitcher.value = activeSwitcher.value - 1 > 0 ? activeSwitcher.value - 1 : imageAmount.value
    } else {
      // fade
      moveFade('right')
    }
  }
}
function onRightArrow() {
  if (!switchPrevent.value) {
    switchPrevent.value = true
    slideTimer.value && cancelRaf(slideTimer.value)
    if (props.effect === 'slide') {
      const target = activeSwitcher.value * moveUnitDistance.value
      moveLeft(target)
      activeSwitcher.value = (activeSwitcher.value % imageAmount.value) + 1
    } else {
      // fade
      moveFade('left')
    }
  }
}
const baseNumber = ref(0)
const originNumber = ref(0) // 初始位置
const distance = ref(0) // 滑动距离
// @ts-ignore
const cubicBezierNumber = useTransition(baseNumber, {
  duration: props.slideDuration, // 过渡动画时长
  transition: props.slideFunction // 过渡动画函数
})
function moveFade(direction: 'left' | 'right' | 'switch', n?: number) {
  if (direction === 'left') {
    activeSwitcher.value = (activeSwitcher.value % imageAmount.value) + 1
  } else if (direction === 'right') {
    activeSwitcher.value = activeSwitcher.value - 1 > 0 ? activeSwitcher.value - 1 : imageAmount.value
  } else {
    activeSwitcher.value = n as number
  }
  rafTimeout(() => {
    switchPrevent.value = false
    if (props.autoplay) {
      autoSlide()
    }
  }, props.fadeDuration)
}
function toggleNumber(target: number) {
  targetPosition.value = target
  baseNumber.value = baseNumber.value ? 0 : 1
  originNumber.value = offset.value // 初始位置
  distance.value = target - originNumber.value // 总距离
}
function moveEffect() {
  // 滑动效果函数
  if (baseNumber.value) {
    offset.value = originNumber.value + distance.value * cubicBezierNumber.value
  } else {
    offset.value = originNumber.value + distance.value * (1 - cubicBezierNumber.value)
  }
}
function moveLeftEffect() {
  if (offset.value >= targetPosition.value) {
    switchPrevent.value = false
    if (props.autoplay) {
      autoSlide() // 自动间隔切换下一张
    }
  } else {
    moveEffect()
    moveEffectRaf.value = requestAnimationFrame(moveLeftEffect)
  }
}
function moveLeft(target: number) {
  // 箭头切换或跳转切换，向左滑动效果
  if (offset.value === imageAmount.value * moveUnitDistance.value) {
    // 最后一张时，重置left
    offset.value = 0
  }
  toggleNumber(target)
  moveEffectRaf.value = requestAnimationFrame(moveLeftEffect)
}
function moveRightEffect() {
  if (offset.value <= targetPosition.value) {
    switchPrevent.value = false
    if (props.autoplay) {
      autoSlide()
    }
  } else {
    moveEffect()
    moveEffectRaf.value = requestAnimationFrame(moveRightEffect)
  }
}
function moveRight(target: number) {
  // 箭头切换或跳转切换，向右滑动效果
  if (offset.value === 0) {
    // 第一张时，重置left
    offset.value = imageAmount.value * moveUnitDistance.value
  }
  toggleNumber(target)
  moveEffectRaf.value = requestAnimationFrame(moveRightEffect)
}
function onSwitch(n: number) {
  // 分页切换图片
  if (!switchPrevent.value && activeSwitcher.value !== n) {
    switchPrevent.value = true
    slideTimer.value && cancelRaf(slideTimer.value)
    if (n < activeSwitcher.value) {
      // 往右滑动
      if (props.effect === 'slide') {
        const target = (n - 1) * moveUnitDistance.value
        moveRight(target)
        activeSwitcher.value = n
      } else {
        // fade
        moveFade('switch', n)
      }
    }
    if (n > activeSwitcher.value) {
      // 往左滑动
      if (props.effect === 'slide') {
        const target = (n - 1) * moveUnitDistance.value
        moveLeft(target)
        activeSwitcher.value = n
      } else {
        // fade
        moveFade('switch', n)
      }
    }
  }
}
function onMouseEnter(n: number) {
  onSwitch(n)
}
function clickImage(image: Image) {
  emits('click', image)
}
function to(n: number): void {
  if (n >= 1 && n <= imageAmount.value) {
    onSwitch(n)
  }
}
function prev(): void {
  onLeftArrow()
}
function next(): void {
  onRightArrow()
}
function getCurrentIndex(): number {
  return activeSwitcher.value
}
defineExpose({
  to,
  prev,
  next,
  getCurrentIndex
})
</script>
<template>
  <div
    ref="carouselRef"
    class="m-carousel"
    :class="{ 'carousel-vertical': verticalSlide, 'carousel-fade': effect === 'fade' }"
    :style="`--arrow-color: ${arrowColor}; --dot-size: ${dotSize}px; --dot-color: ${dotColor}; --fade-duration: ${props.fadeDuration}ms; --fade-function: ${props.fadeFunction}; width: ${carouselWidth}; height: ${carouselHeight};`"
    @mouseenter="autoplay && pauseOnMouseEnter ? onStop() : () => false"
    @mouseleave="autoplay && pauseOnMouseEnter ? onStart() : () => false"
  >
    <div class="m-carousel-flex" :style="carouselStyle">
      <div
        class="m-image"
        :class="{ 'image-fade-active': effect === 'fade' && activeSwitcher === index + 1 }"
        @click="clickImage(image)"
        v-for="(image, index) in images"
        :key="index"
      >
        <Spin :spinning="!complete[index]" indicator="dynamic-circle" v-bind="spinProps">
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
      <div class="m-image" @click="clickImage(images[0])" v-if="imageAmount && effect === 'slide'">
        <Spin :spinning="!complete[0]" indicator="dynamic-circle" v-bind="spinProps">
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
    <template v-if="showArrow">
      <svg
        tabindex="0"
        class="arrow-left"
        :style="`width: ${arrowSize}px; height: ${arrowSize}px;`"
        @click="onLeftArrow"
        @keydown.prevent="onKeyboard"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z"
        ></path>
      </svg>
      <svg
        tabindex="0"
        class="arrow-right"
        :style="`width: ${arrowSize}px; height: ${arrowSize}px;`"
        @click="onRightArrow"
        @keydown.prevent="onKeyboard"
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
        tabindex="0"
        class="u-dot"
        :style="[dotStyle, activeSwitcher === n ? { backgroundColor: dotActiveColor, ...dotActiveStyle } : {}]"
        v-for="n in imageAmount"
        :key="n"
        @click="dotsTrigger === 'click' ? onSwitch(n) : () => false"
        @mouseenter="dotsTrigger === 'hover' ? onMouseEnter(n) : () => false"
        @keydown.prevent="onKeyboard"
      ></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-carousel {
  display: inline-block;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .m-carousel-flex {
    display: flex;
    width: 100%;
    height: 100%;
    // will-change: transform;
    .m-image {
      // 指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值
      flex-shrink: 0; // 默认为 1，为 0 时不缩小
      display: inline-block;
      cursor: pointer;
      .u-image {
        display: inline-block;
        object-fit: cover;
        vertical-align: bottom; // 消除img标签底部的5px
      }
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
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--arrow-color);
    fill: currentColor;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    outline: none;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .arrow-right {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--arrow-color);
    fill: currentColor;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    outline: none;
    transition: opacity 0.3s;
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
    .u-dot {
      // flex: 0 1 auto;
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: var(--dot-size);
      background-color: var(--dot-color);
      cursor: pointer;
      outline: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
.carousel-vertical {
  .m-carousel-flex {
    flex-direction: column;
  }
  .arrow-left {
    top: 6px;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
  .arrow-right {
    top: auto;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
}
.carousel-fade {
  .m-image {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    transition-property: opacity;
    transition-duration: var(--fade-duration);
    transition-timing-function: var(--fade-function);
  }
  .image-fade-active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
