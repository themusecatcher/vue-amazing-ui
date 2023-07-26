<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
import Spin from '../spin'
interface Image {
  title?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
}
interface Props {
  images: Image[] // 走马灯图片数组
  interval?: number // 自动滑动轮播间隔
  width?: number|string // 走马灯宽度
  height?: number|string // 走马灯高度
  navigation?: boolean // 是否显示导航
  navColor?: string // 导航颜色
  navSize?: number // 导航大小
  pagination?: boolean // 是否显示分页
  pageActiveColor?: string // 分页选中颜色
  pageSize?: number // 分页大小
  pageStyle?: CSSProperties // 分页样式，优先级高于pageSize
  disableOnInteraction?: boolean // 用户操作导航或分页之后，是否禁止自动切换，默认为true：停止
  pauseOnMouseEnter?: boolean // 鼠标悬浮时暂停自动切换，鼠标离开时恢复自动切换，默认true
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  interval: 3000,
  width: '100%',
  height: '100vh',
  navigation: true,
  navColor: '#FFF',
  navSize: 36,
  pagination: true,
  pageActiveColor: '#1677FF',
  pageSize: 10,
  pageStyle: () => ({}),
  disableOnInteraction: true,
  pauseOnMouseEnter:  true
})
const toLeft = ref(true) // 左滑标志，默认左滑
const left = ref(0) // 滑动偏移值
const transition = ref(false) // 暂停时为完成滑动的过渡标志
const slideTimer = ref() // 轮播切换定时器
const moveRaf = ref() // 滑动效果回调标识
const targetMove = ref() // 目标移动位置
const switched = ref(false) // 是否在进行跳转切换，用于区别箭头或自动切换（false）和跳转切换（true）
const carousel = ref() // DOM引用
const activeSwitcher = ref(1) // 当前展示图片标识

const carouselWidth = computed(() => { // 走马灯区域宽度
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const carouselHeight = computed(() => { // 走马灯区域高度
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return props.height
  }
})
const totalWidth = computed(() => { // 容器宽度：(图片数组长度+1) * 图片宽度
  return (props.images.length + 1) * imageWidth.value
})
const imageCount = computed(() => { // 图片数量
  return props.images.length
})

onMounted(() => {
  getFPS() // 获取浏览器的刷新率
  getImageSize() // 获取每张图片大小
  // 监听键盘切换事件
  document.addEventListener('keydown', keyboardSwitch)
})
onUnmounted(() => {
  // 移除键盘切换事件
  document.removeEventListener('keydown', keyboardSwitch)
})
const complete = ref(Array(imageCount.value).fill(false)) // 图片是否加载完成
const fpsRaf = ref() // fps回调标识
const fps = ref(60)
const step = computed(() => { // 移动参数（120fps: 24, 60fps: 12）
  if (fps.value === 60) {
    return 12
  } else {
    return 12 * (fps.value / 60)
  }
})
function onComplete (index: number) { // 图片加载完成
  complete.value[index] = true
}
watch(
  () => complete.value[0],
  (to) => {
    if (to) {
      onStart()
    }
  }
)
function getFPS () { // 获取屏幕刷新率
  // @ts-ignore
  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  var start: any = null
  function timeElapse (timestamp: number) {
    /*
      timestamp参数：与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻
    */
    // console.log('timestamp:', timestamp)
    if (!start) {
      if (fpsRaf.value > 10) {
        start = timestamp
      }
      fpsRaf.value = requestAnimationFrame(timeElapse)
    } else {
      fps.value = Math.floor(1000 / (timestamp - start))
      console.log('fps', fps.value)
    }
  }
  fpsRaf.value = requestAnimationFrame(timeElapse)
}
const imageWidth = ref() // 图片宽度
const imageHeight = ref() // 图片高度
function getImageSize () {
  imageWidth.value = carousel.value.offsetWidth
  imageHeight.value = carousel.value.offsetHeight
}
function keyboardSwitch (e: KeyboardEvent) {
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
function onStart () {
  if (imageCount.value > 1) { // 超过一条时滑动
    toLeft.value = true // 重置左滑标志
    transition.value = false
    onAutoSlide() // 自动滑动轮播
    console.log('imageSlider start')
  }
}
function onStop () {
  cancelRaf(slideTimer.value)
  if (toLeft.value) { // 左滑箭头移出时
    onStopLeft()
  } else {
    onStopRight()
  }
  console.log('imageSlider stop')
}
function onStopLeft () { // 停止往左滑动
  cancelRaf(slideTimer.value)
  cancelAnimationFrame(moveRaf.value)
  transition.value = true
  left.value = Math.ceil(left.value / imageWidth.value) * imageWidth.value // ceil：向上取整，floor：向下取整
}
function onStopRight () { // 停止往右滑动
  cancelAnimationFrame(moveRaf.value)
  transition.value = true
  left.value = Math.floor(left.value / imageWidth.value) * imageWidth.value // ceil：向上取整，floor：向下取整
}
function onAutoSlide () {
  slideTimer.value = rafTimeout(() => {
    const target = left.value % (imageCount.value * imageWidth.value) + imageWidth.value
    activeSwitcher.value = activeSwitcher.value % imageCount.value + 1
    autoMoveLeft(target)
  }, props.interval)
}
function goLeft (target: number) { // 点击右箭头，往左滑动
  if (toLeft.value) {
    onStopLeft()
  } else {
    onStopRight()
    toLeft.value = true // 向左滑动
  }
  transition.value = false
  moveLeft(target)
}
function goRight (target: number) { // 点击左箭头，往右滑动
  if (toLeft.value) {
    onStopLeft()
    toLeft.value = false // 非向左滑动
  } else {
    onStopRight()
  }
  transition.value = false
  moveRight(target)
}
function onLeftArrow () {
  const target = (activeSwitcher.value + imageCount.value - 2) % imageCount.value * imageWidth.value
  activeSwitcher.value = (activeSwitcher.value - 1 > 0) ? activeSwitcher.value - 1 : imageCount.value
  goRight(target)
}
function onRightArrow () {
  const target = activeSwitcher.value * imageWidth.value
  activeSwitcher.value = activeSwitcher.value % imageCount.value + 1
  goLeft(target)
}
function autoMoveLeftEffect () {
  if (left.value >= targetMove.value) {
    onAutoSlide() // 自动间隔切换下一张
  } else {
    var move = Math.ceil((targetMove.value - left.value) / step.value) // 越来越慢的滑动过程
    left.value += move
    moveRaf.value = requestAnimationFrame(autoMoveLeftEffect)
  }
}
function autoMoveLeft (target: number) { // 自动切换，向左滑动效果
  if (left.value === imageCount.value * imageWidth.value) { // 最后一张时，重置left
    left.value = 0
  }
  targetMove.value = target
  moveRaf.value = requestAnimationFrame(autoMoveLeftEffect)
}
function moveLeftEffect () {
  if (left.value >= targetMove.value) {
    if (switched.value) { // 跳转切换，完成后自动滑动
      switched.value = false
      if (!props.disableOnInteraction && !props.pauseOnMouseEnter) {
        onStart()
      }
    }
  } else {
    var move = Math.ceil((targetMove.value - left.value) / step.value) // 越来越慢的滑动过程
    left.value += move
    moveRaf.value = requestAnimationFrame(moveLeftEffect)
  }
}
function moveLeft (target: number) { // 箭头切换或跳转切换，向左滑动效果
  if (left.value === imageCount.value * imageWidth.value) { // 最后一张时，重置left
    left.value = 0
  }
  targetMove.value = target
  moveRaf.value = requestAnimationFrame(moveLeftEffect)
}
function moveRightEffect () {
  if (left.value <= targetMove.value) {
    if (switched.value) { // 跳转切换，完成后自动滑动
      switched.value = false
      if (!props.disableOnInteraction && !props.pauseOnMouseEnter) {
        onStart()
      }
    }
  } else {
    var move = Math.floor((targetMove.value - left.value) / step.value) // 越来越慢的滑动过程
    left.value += move
    moveRaf.value = requestAnimationFrame(moveRightEffect)
  }
}
function moveRight (target: number) { // 箭头切换或跳转切换，向右滑动效果
  if (left.value === 0) { // 第一张时，重置left
    left.value = imageCount.value * imageWidth.value
  }
  targetMove.value = target
  moveRaf.value = requestAnimationFrame(moveRightEffect)
}
function onSwitch (n: number) { // 分页切换图片
  if (activeSwitcher.value !== n) {
    switched.value = true // 跳转切换标志
    const target = (n - 1) * imageWidth.value
    if (n < activeSwitcher.value) { // 往右滑动
      activeSwitcher.value = n
      goRight(target)
    }
    if (n > activeSwitcher.value) { // 往左滑动
      activeSwitcher.value = n
      goLeft(target)
    }
  }
}
</script>
<template>
  <div
    class="m-slider"
    ref="carousel"
    :style="`--navColor: ${navColor}; --pageActiveColor: ${pageActiveColor}; width: ${carouselWidth}; height: ${carouselHeight};`"
    @mouseenter="pauseOnMouseEnter ? onStop() : () => false"
    @mouseleave="pauseOnMouseEnter ? onStart() : () => false">
    <div :class="{'transition': transition}" :style="`width: ${totalWidth}px; height: 100%; will-change: transform; transform: translateX(${-left}px);`">
      <div class="m-image" v-for="(image, index) in images" :key="index">
        <Spin :spinning="!complete[index]" indicator="dynamic-circle">
          <a :href="image.link ? image.link:'javascript:;'" :target="image.link ? '_blank':'_self'" class="m-link">
            <img @load="onComplete(index)" :src="image.src" :key="image.src" :alt="image.title" class="u-img" :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"/>
          </a>
        </Spin>
      </div>
      <div class="m-image" v-if="imageCount">
        <Spin :spinning="!complete[0]" indicator="dynamic-circle">
          <a :href="images[0].link ? images[0].link:'javascript:;'" :target="images[0].link ? '_blank':'_self'" class="m-link">
            <img @load="onComplete(0)" :src="images[0].src" :key="images[0].src" :alt="images[0].title" class="u-img"  :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"/>
          </a>
        </Spin>
      </div>
    </div>
    <template v-if="navigation">
      <svg class="arrow-left" :style="`width: ${navSize}px; height: ${navSize}px;`" @click="onLeftArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z"></path></svg>
      <svg class="arrow-right" :style="`width: ${navSize}px; height: ${navSize}px;`" @click="onRightArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z"></path></svg>
    </template>
    <div class="m-switch" v-if="pagination">
      <div
        @click="onSwitch(n)"
        :class="['u-circle', {'active': activeSwitcher === n }]"
        :style="[{width: `${pageSize}px`, height: `${pageSize}px`}, pageStyle]"
        v-for="n in imageCount" :key="n">
      </div>
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
    transition: transform .3s ease-out;
  }
  .m-image {
    display: inline-block;
    .m-link {
      position: relative;
      display: block;
      height: 100%;
      .u-img {
        object-fit: cover;
        vertical-align: bottom; // 消除img标签底部的5px
        cursor: pointer;
      }
    }
  }
  &:hover {
    .arrow-left {
      opacity: .7;
      pointer-events: auto;
    }
    .arrow-right {
      opacity: .7;
      pointer-events: auto;
    }
  }
  .arrow-left {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--navColor);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all .3s;
    &:hover {
      opacity: 1;
    }
  }
  .arrow-right {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--navColor);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all .3s;
    &:hover {
      opacity: 1;
    }
  }
  .m-switch {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: nowrap;
    .u-circle {
      background-color: rgba(255, 255, 255, .3);
      border-radius: 50%;
      margin: 0 4px;
      cursor: pointer;
      transition: background-color .3s cubic-bezier(.4, 0, .2, 1);
    }
    .active {
      background-color: var(--pageActiveColor) !important;
    }
  }
}
</style>