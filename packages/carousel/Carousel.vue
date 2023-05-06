<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
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
  pagination?: boolean // 是否显示分页
  disableOnInteraction?: boolean // 用户操作导航或分页之后，是否禁止自动切换，默认为true：停止
  pauseOnMouseEnter?: boolean // 鼠标悬浮时暂停自动切换，鼠标离开时恢复自动切换，默认true
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  interval: 3000,
  width: '100%',
  height:  '100vh',
  navigation: true,
  pagination: true,
  disableOnInteraction: true,
  pauseOnMouseEnter:  true,
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
const len = computed(() => { // 图片数量
  return props.images.length
})

onMounted(() => {
  getFPS() // 获取浏览器的刷新率
  getImageSize() // 获取每张图片大小
})

const complete = ref(Array(len.value).fill(false)) // 图片是否加载完成
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
      onStart()
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
function onStart () {
  if (len.value > 1) { // 超过一条时滑动
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
    const target = left.value % (len.value * imageWidth.value) + imageWidth.value
    activeSwitcher.value = activeSwitcher.value % len.value + 1
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
function onLeftArrow (target: number) {
  activeSwitcher.value = (activeSwitcher.value - 1 > 0) ? activeSwitcher.value - 1 : len.value
  goRight(target)
}
function onRightArrow (target: number) {
  activeSwitcher.value = activeSwitcher.value % len.value + 1
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
  if (left.value === len.value * imageWidth.value) { // 最后一张时，重置left
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
  if (left.value === len.value * imageWidth.value) { // 最后一张时，重置left
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
    left.value = len.value * imageWidth.value
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
    :style="`width: ${carouselWidth}; height: ${carouselHeight};`"
    @mouseenter="pauseOnMouseEnter ? onStop() : () => false"
    @mouseleave="pauseOnMouseEnter ? onStart() : () => false">
    <div :class="{'transition': transition}" :style="`width: ${totalWidth}px; height: 100%; will-change: transform; transform: translateX(${-left}px);`">
      <div class="m-image" v-for="(image, index) in images" :key="index">
        <a :href="image.link ? image.link:'javascript:;'" :target="image.link ? '_blank':'_self'" class="m-link">
          <img @load="onComplete(index)" :src="image.src" :key="image.src" :alt="image.title" class="u-img" :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"/>
          <div class="u-spin-circle" v-show="!complete[index]"></div>
        </a>
      </div>
      <div class="m-image" v-if="len">
        <a :href="images[0].link ? images[0].link:'javascript:;'" :target="images[0].link ? '_blank':'_self'" class="m-link">
          <img @load="onComplete(0)" :src="images[0].src" :key="images[0].src" :alt="images[0].title" class="u-img"  :style="`width: ${imageWidth}px; height: ${imageHeight}px;`"/>
          <div class="u-spin-circle" v-show="!complete[0]"></div>
        </a>
      </div>
    </div>
    <template v-if="navigation">
      <svg class="arrow-left" @click="onLeftArrow((activeSwitcher + len - 2)%len*imageWidth)" viewBox="64 64 896 896" data-icon="left-circle" aria-hidden="true" focusable="false"><path d="M603.3 327.5l-246 178a7.95 7.95 0 0 0 0 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
      <svg class="arrow-right" @click="onRightArrow(activeSwitcher*imageWidth)" viewBox="64 64 896 896" data-icon="right-circle" aria-hidden="true" focusable="false"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
    </template>
    <div class="m-switch" v-if="pagination">
      <div
        @click="onSwitch(n)"
        :class="['u-rect', {'active': activeSwitcher === n }]"
        v-for="n in len"
        :key="n">
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
  box-sizing: border-box;
  .transition {
    transition: transform 0.3s ease-out;
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
      .u-spin-circle {
        position: absolute;
        inset: 0;
        margin: auto;
        pointer-events: none;
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border-width: 4px;
        border-style: solid;
        border-color: @themeColor;
        border-top-color: transparent; // 隐藏1/4圆
        animation: loadingCircle 1s infinite linear;
        -webkit-animation: loadingCircle 1s infinite linear;
      }
      @keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  &:hover {
    .arrow-left {
      opacity: 1;
      pointer-events: auto;
    }
    .arrow-right {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .arrow-left {
    width: 28px;
    height: 28px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    fill: rgba(255, 255, 255, .6);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all .3s;
    &:hover {
      fill: rgba(255, 255, 255);
    }
  }
  .arrow-right {
    width: 28px;
    height: 28px;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    fill: rgba(255, 255, 255, .6);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all .3s;
    &:hover {
      fill: rgba(255, 255, 255);
    }
  }
  .m-switch {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 8px;
    .u-rect {
      display: inline-block;
      vertical-align: middle;
      width: 36px;
      height: 4px;
      background: #E3E3E3;
      border-radius: 1px;
      margin: 0 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .active {
      background-color: @themeColor;
    }
  }
}
</style>