<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf, useEventListener, useResizeObserver, useInject } from 'components/utils'
import { useTransition } from '@vueuse/core'
import Spin from 'components/spin'
export interface Image {
  name?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
  target?: '_self' | '_blank' // 如何打开跳转链接
}
export interface Props {
  images?: Image[] // 轮播图图片数组
  width?: number | string // 轮播图宽度，单位 px
  height?: number | string // 轮播图高度，单位 px
  autoplay?: boolean // 是否自动轮播
  pauseOnMouseEnter?: boolean // 当鼠标移入轮播图时，是否暂停自动轮播
  effect?: 'slide' | 'fade' // 轮播图切换时的过渡效果
  interval?: number // 自动轮播间隔，单位 ms
  showArrow?: boolean // 是否显示箭头
  arrowColor?: string // 箭头颜色
  arrowSize?: number // 箭头大小，单位 px
  dots?: boolean // 是否显示指示点
  dotSize?: number // 指示点大小，单位 px
  dotColor?: string // 指示点颜色
  dotActiveColor?: string // 指示点选中颜色，默认为主题色
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
  dotActiveColor: undefined,
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
const { colorPalettes } = useInject('Carousel') // 主题色注入
const emits = defineEmits(['change', 'click'])
// 轮播图区域宽度
const carouselWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else {
    return props.width
  }
})
// 轮播图区域高度
const carouselHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  } else {
    return props.height
  }
})
// 轮播图片数量
const imageAmount = computed(() => {
  return props.images.length
})
// 是否垂直轮播
const verticalSlide = computed(() => {
  return ['left', 'right'].includes(props.dotPosition)
})
// 每次移动的单位距离
const moveUnitDistance = computed(() => {
  if (verticalSlide.value) {
    return imageHeight.value
  } else {
    return imageWidth.value
  }
})
// 指示点选中颜色
const dotActiveColorComputed = computed(() => {
  if (props.dotActiveColor === undefined) {
    return colorPalettes.value[5]
  } else {
    return props.dotActiveColor
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
function initCarousel(): void {
  slideTimer.value && cancelRaf(slideTimer.value)
  moveEffectRaf.value && cancelAnimationFrame(moveEffectRaf.value)
  switchPrevent.value = false
  if (props.effect === 'slide') {
    offset.value = (activeSwitcher.value - 1) * moveUnitDistance.value
  }
  onStart()
}
// 图片加载完成
function onComplete(index: number): void {
  complete.value[index] = true
}
// 获取每张图片尺寸
function getImageSize(): void {
  imageWidth.value = carouselRef.value.offsetWidth
  imageHeight.value = carouselRef.value.offsetHeight
}
function onKeyboard(e: KeyboardEvent): void {
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
function visibilityChange(): void {
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
function onStart(): void {
  if (props.autoplay && imageAmount.value > 1 && complete.value[0]) {
    // 超过一条时滑动
    stopCarousel.value = false
    autoSlide() // 自动滑动轮播
    // console.log('Carousel Start')
  }
}
function onStop(): void {
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
function onLeftArrow(): void {
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
function onRightArrow(): void {
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
// @ts-expect-error useTransition error
const cubicBezierNumber = useTransition(baseNumber, {
  duration: props.slideDuration, // 过渡动画时长
  transition: props.slideFunction // 过渡动画函数
})
function moveFade(direction: 'left' | 'right' | 'switch', n?: number): void {
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
function toggleNumber(target: number): void {
  targetPosition.value = target
  baseNumber.value = baseNumber.value ? 0 : 1
  originNumber.value = offset.value // 初始位置
  distance.value = target - originNumber.value // 总距离
}
// 滑动效果函数
function moveEffect(): void {
  if (baseNumber.value) {
    offset.value = originNumber.value + distance.value * (cubicBezierNumber.value as unknown as number)
  } else {
    offset.value = originNumber.value + distance.value * (1 - (cubicBezierNumber.value as unknown as number))
  }
}
function moveLeftEffect(): void {
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
// 箭头切换或跳转切换，向左滑动效果
function moveLeft(target: number): void {
  if (offset.value === imageAmount.value * moveUnitDistance.value) {
    // 最后一张时，重置left
    offset.value = 0
  }
  toggleNumber(target)
  moveEffectRaf.value = requestAnimationFrame(moveLeftEffect)
}
function moveRightEffect(): void {
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
// 箭头切换或跳转切换，向右滑动效果
function moveRight(target: number): void {
  if (offset.value === 0) {
    // 第一张时，重置left
    offset.value = imageAmount.value * moveUnitDistance.value
  }
  toggleNumber(target)
  moveEffectRaf.value = requestAnimationFrame(moveRightEffect)
}
// 分页切换图片
function onSwitch(n: number): void {
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
function onMouseEnter(n: number): void {
  onSwitch(n)
}
function clickImage(image: Image): void {
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
    class="carousel-wrap"
    :class="{ 'carousel-vertical': verticalSlide, 'carousel-fade': effect === 'fade' }"
    :style="`
      --carousel-width: ${carouselWidth};
      --carousel-height: ${carouselHeight};
      --carousel-arrow-color: ${arrowColor};
      --carousel-dot-size: ${dotSize}px;
      --carousel-dot-color: ${dotColor};
      --carousel-fade-duration: ${props.fadeDuration}ms;
      --carousel-fade-function: ${props.fadeFunction};
    `"
    @mouseenter="autoplay && pauseOnMouseEnter ? onStop() : () => false"
    @mouseleave="autoplay && pauseOnMouseEnter ? onStart() : () => false"
  >
    <div class="carousel-flex-wrap" :style="carouselStyle">
      <div
        class="image-wrap"
        :class="{ 'image-fade-active': effect === 'fade' && activeSwitcher === index + 1 }"
        @click="clickImage(image)"
        v-for="(image, index) in images"
        :key="index"
      >
        <Spin :spinning="!complete[index]" indicator="dynamic-circle" v-bind="spinProps">
          <a
            class="image-link"
            :class="{ 'link-cursor': image.link }"
            :href="image.link"
            :target="image.target ? image.target : '_blank'"
          >
            <img
              @load="onComplete(index)"
              :src="image.src"
              :key="image.src"
              :alt="image.name"
              class="image-item"
              :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"
            />
          </a>
        </Spin>
      </div>
      <div class="image-wrap" @click="clickImage(images[0])" v-if="imageAmount && effect === 'slide'">
        <Spin :spinning="!complete[0]" indicator="dynamic-circle" v-bind="spinProps">
          <a
            class="image-link"
            :class="{ 'link-cursor': images[0].link }"
            :href="images[0].link"
            :target="images[0].target ? images[0].target : '_blank'"
          >
            <img
              @load="onComplete(0)"
              :src="images[0].src"
              :key="images[0].src"
              :alt="images[0].name"
              class="image-item"
              :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"
            />
          </a>
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
    <div class="carousel-switch" :class="`switch-${dotPosition}`" v-if="dots">
      <div
        tabindex="0"
        class="dot-item"
        :style="[dotStyle, activeSwitcher === n ? { backgroundColor: dotActiveColorComputed, ...dotActiveStyle } : {}]"
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
.carousel-wrap {
  display: inline-block;
  width: var(--carousel-width);
  height: var(--carousel-height);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .carousel-flex-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    .image-wrap {
      // 指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值
      flex-shrink: 0; // 默认为 1，为 0 时不缩小
      display: inline-block;
      cursor: pointer;
      .image-link {
        display: block;
        height: 100%;
        cursor: default;
        .image-item {
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius);
          display: inline-block;
          vertical-align: bottom;
        }
      }
      .link-cursor {
        cursor: pointer;
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
    color: var(--carousel-arrow-color);
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
    color: var(--carousel-arrow-color);
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
  .carousel-switch {
    display: flex;
    justify-content: center;
    gap: 8px;
    position: absolute;
    z-index: 9;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    .dot-item {
      // flex: 0 1 auto;
      width: var(--carousel-dot-size);
      height: var(--carousel-dot-size);
      border-radius: var(--carousel-dot-size);
      background-color: var(--carousel-dot-color);
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
  .carousel-flex-wrap {
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
  .image-wrap {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    transition-property: opacity;
    transition-duration: var(--carousel-fade-duration);
    transition-timing-function: var(--carousel-fade-function);
  }
  .image-fade-active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
