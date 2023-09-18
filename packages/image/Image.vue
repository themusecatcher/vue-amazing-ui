<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watchEffect } from 'vue'
import Spin from '../spin'
import Space from '../space'
interface Image {
  src: string // 图像地址
  name?: string // 图像名称
}
interface Props {
  src: string|Image[] // 图像地址 | 图像地址数组
  name?: string // 图像名称，没有传入图片名时自动从图像地址src中读取
  width?: string|number // 图像宽度
  height?: string|number // 图像高度
  bordered?: boolean // 是否显示边框
  gap?: number|number[] // 展示图片间距大小，数组时表示: [水平间距, 垂直间距]
  fit?: 'contain'|'fill'|'cover' // 图像如何适应容器高度和宽度
  preview?: string // 预览文本 string | slot
  zoomRatio?: number // 每次缩放比率
  minZoomScale?: number // 最小缩放比例
  maxZoomScale?: number // 最大缩放比例
  resetOnDbclick?: boolean // 缩放移动旋转图片后，是否可以双击还原
  loop?: boolean // 是否可以循环切换图片
  album?: boolean // 是否相册模式，即从一张展示图片点开相册
}
const props = withDefaults(defineProps<Props>(), {
  src: '',
  name: '',
  width: 200,
  height: 200,
  bordered: true,
  gap: 8,
  fit: 'contain', // 可选 fill(填充) | contain(等比缩放包含) | cover(等比缩放覆盖)
  preview: '预览',
  zoomRatio: 0.1,
  minZoomScale: 0.1,
  maxZoomScale: 10,
  resetOnDbclick: true,
  loop: false,
  album: false
})
const imageWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const imageHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return props.height
  }
})
const images = ref<Image[]>([])
watchEffect(() => {
  images.value = getImages()
})
function getImages () {
  if (Array.isArray(props.src)) {
    return props.src
  } else {
    return [{
      src: props.src,
      name: props.name
    }]
  }
}
const imageCount = computed(() => {
  return images.value.length
})
onMounted(() => {
  // 监听键盘切换事件
  document.addEventListener('keydown', keyboardSwitch)
})
onUnmounted(() => {
  // 移除键盘切换事件
  document.removeEventListener('keydown', keyboardSwitch)
})
const complete = ref(Array(imageCount.value).fill(false)) // 图片是否加载完成
const loaded = ref(Array(imageCount.value).fill(false)) // 预览图片是否加载完成
const previewIndex = ref(0) // 当前预览的图片索引
const showPreview = ref(false) // 是否显示预览
const rotate = ref(0) // 预览图片旋转角度
const scale = ref(1) // 缩放比例
const swapX = ref(1) // 水平镜像数值符号
const swapY = ref(1) // 垂直镜像数值符号
const sourceX = ref(0) // 拖动开始时位置
const sourceY = ref(0) // 拖动开始时位置
const dragX = ref(0) // 拖动横向距离
const dragY = ref(0) // 拖动纵向距离
function keyboardSwitch (e: KeyboardEvent) {
  e.preventDefault()
  if (showPreview.value && imageCount.value > 1) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      onSwitchLeft()
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      onSwitchRight()
    }
  }
}
function onComplete (n: number) { // 图片加载完成
  complete.value[n] = true
}
function onLoaded (index: number) { // 预览图片加载完成
  loaded.value[index] = true
}
function getImageName (image: Image) { // 从图像地址src中获取图像名称
  if (image) {
    if (image.name) {
      return image.name
    } else {
      const res = image.src.split('?')[0].split('/')
      return res[res.length - 1]
    }
  }
}
function onPreview (n: number) {
  scale.value = 1
  rotate.value = 0
  dragX.value = 0
  dragY.value = 0
  showPreview.value = true
  previewIndex.value = n
}
defineExpose({
  onPreview
})
// 消除js加减精度问题的加法函数
function add (num1: number, num2: number) {
  const num1DeciStr = String(num1).split('.')[1]
  const num2DeciStr = String(num2).split('.')[1]
  let maxLen = Math.max(num1DeciStr?.length || 0, num2DeciStr?.length || 0) // 两数中最长的小数位长度
  let num1Str = num1.toFixed(maxLen) // 补零，返回字符串
  let num2Str = num2.toFixed(maxLen)
  const result = +(num1Str.replace('.', '')) + +(num2Str.replace('.', '')) // 转换为整数相加
  return result / Math.pow(10, maxLen)
}
function onClose () { // 关闭
  showPreview.value = false
}
function onZoomin () { // 放大
  if (scale.value + props.zoomRatio > props.maxZoomScale) {
    scale.value = props.maxZoomScale
  } else {
    scale.value = add(scale.value, props.zoomRatio)
  }
}
function onZoomout () { // 缩小
  if (scale.value - props.zoomRatio < props.minZoomScale) {
    scale.value = props.minZoomScale
  } else {
    scale.value = add(scale.value, -props.zoomRatio)
  }
}
function onResetOrigin () { // 重置图片为初始状态
  scale.value = 1
  swapX.value = 1
  swapY.value = 1
  rotate.value = 0
  dragX.value = 0
  dragY.value = 0
}
function onClockwiseRotate () { // 顺时针旋转
  rotate.value += 90
}
function onAnticlockwiseRotate () { // 逆时针旋转
  rotate.value -= 90
}
function onHorizontalMirror () {
  swapX.value *= -1
}
function onVerticalMirror () {
  swapY.value *= -1
}
function onWheel (e: WheelEvent) { // 鼠标滚轮缩放
  // e.preventDefault() // 禁止浏览器捕获滑动事件
  console.log('e', e)
  const scrollZoom = e.deltaY * props.zoomRatio * 0.1 // 滚轮的纵向滚动量
  if (scale.value === props.minZoomScale && scrollZoom > 0) {
    return
  }
  if (scale.value === props.maxZoomScale && scrollZoom < 0) {
    return
  }
  if (scale.value - scrollZoom < props.minZoomScale) {
    scale.value = props.minZoomScale
  } else if (scale.value - scrollZoom > props.maxZoomScale) {
    scale.value = props.maxZoomScale
  } else {
    scale.value = add(scale.value, -scrollZoom)
  }
}
function onMouseDown (event: MouseEvent) {
  // event.preventDefault() // 消除拖动元素时的阴影
  const el = event.target // 当前点击的元素
  const imageRect = (el as Element).getBoundingClientRect()
  const top = imageRect.top // 图片上边缘距浏览器窗口上边界的距离
  const bottom = imageRect.bottom // 图片下边缘距浏览器窗口上边界的距离
  const right = imageRect.right // 图片右边缘距浏览器窗口左边界的距离
  const left = imageRect.left // 图片左边缘距浏览器窗口左边界的距离
  const viewportWidth = document.documentElement.clientWidth
  const viewportHeight = document.documentElement.clientHeight
  sourceX.value = event.clientX // 鼠标按下时相对于视口左边缘的X坐标
  sourceY.value = event.clientY // 鼠标按下时相对于视口上边缘的Y坐标
  const sourceDragX = dragX.value // 鼠标按下时图片的X轴偏移量
  const sourceDragY = dragY.value // 鼠标按下时图片的Y轴偏移量
  document.onmousemove = (e: MouseEvent) => {
    // e.clientX返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    dragX.value = sourceDragX + e.clientX - sourceX.value
    dragY.value = sourceDragY + e.clientY - sourceY.value
  }
  document.onmouseup = () => {
    if (dragX.value > sourceDragX + viewportWidth - right) { // 溢出视口右边缘
      dragX.value = sourceDragX + viewportWidth - right
    }
    if (dragX.value < sourceDragX - left) { // 溢出视口左边缘
      dragX.value = sourceDragX - left
    }
    if (dragY.value > sourceDragY + viewportHeight - bottom) { // 溢出视口下边缘
      dragY.value = sourceDragY + viewportHeight - bottom
    }
    if (dragY.value < sourceDragY - top) { // 溢出视口上边缘
      dragY.value = sourceDragY - top
    }
    document.onmousemove = null
  }
}
function onSwitchLeft () {
  if (props.loop) {
    previewIndex.value = (previewIndex.value - 1 + imageCount.value) % imageCount.value
  } else {
    if (previewIndex.value > 0) {
      previewIndex.value--
    }
  }
  onResetOrigin()
}
function onSwitchRight () {
  if (props.loop) {
    previewIndex.value = (previewIndex.value + 1) % imageCount.value
  } else {
    if (previewIndex.value < imageCount.value - 1) {
      previewIndex.value++
    }
  }
  onResetOrigin()
}
</script>
<template>
  <div class="m-image-wrap">
    <Space :size="gap">
      <div
        class="m-image"
        :class="{bordered: bordered, 'image-hover-mask': complete[index]}"
        :style="`width: ${imageWidth}; height: ${imageHeight};`"
        v-for="(image, index) in images" :key="index"
        v-show="!album || (album && index === 0)">
        <Spin :spinning="!complete[index]" indicator="dynamic-circle">
          <img class="u-image" :style="`width: calc(${imageWidth} - 2px); height: calc(${imageHeight} - 2px); object-fit: ${fit};`" @load="onComplete(index)" :src="image.src" :alt="image.name" />
        </Spin>
        <div class="m-image-mask" @click="onPreview(index)">
          <div class="m-image-mask-info">
            <svg class="u-eye" focusable="false" data-icon="eye" aria-hidden="true" viewBox="64 64 896 896"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
            <p class="u-pre">
              <slot name="preview">{{ preview }}</slot>
            </p>
          </div>
        </div>
      </div>
    </Space>
    <Transition name="mask">
      <div class="m-preview-mask" v-show="showPreview"></div>
    </Transition>
    <Transition name="preview">
      <div class="m-preview-wrap" v-show="showPreview" @click.self="onClose" @wheel.prevent="onWheel">
        <div class="m-preview-body">
          <div class="m-preview-operations">
            <a class="u-name" :href="images[previewIndex].src" target="_blank" :title="getImageName(images[previewIndex])">{{ getImageName(images[previewIndex]) }}</a>
            <p class="u-preview-progress" v-show="Array.isArray(src)">{{ (previewIndex + 1) }} / {{ imageCount }}</p>
            <div class="u-preview-operation" title="关闭" @click="onClose">
              <svg class="u-icon" focusable="false" data-icon="close" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
            </div>
            <div class="u-preview-operation" title="放大" :class="{'u-operation-disabled': scale === maxZoomScale}" @click="onZoomin">
              <svg class="u-icon" focusable="false" data-icon="zoom-in" aria-hidden="true" viewBox="64 64 896 896"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
            </div>
            <div class="u-preview-operation" title="缩小" :class="{'u-operation-disabled': scale === minZoomScale}" @click="onZoomout">
              <svg class="u-icon" focusable="false" data-icon="zoom-out" aria-hidden="true" viewBox="64 64 896 896"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
            </div>
            <div class="u-preview-operation" title="还原" @click="onResetOrigin">
              <svg class="u-icon" focusable="false" data-icon="expand" aria-hidden="true" viewBox="64 64 896 896"><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg>
            </div>
            <div class="u-preview-operation" title="向右旋转" @click="onClockwiseRotate">
              <svg class="u-icon" focusable="false" data-icon="rotate-right" aria-hidden="true" viewBox="64 64 896 896"><path d="M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z"></path><path d="M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z"></path></svg>
            </div>
            <div class="u-preview-operation" title="向左旋转" @click="onAnticlockwiseRotate">
              <svg class="u-icon" focusable="false" data-icon="rotate-left" aria-hidden="true" viewBox="64 64 896 896"><path d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"></path><path d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"></path></svg>
            </div>
            <div class="u-preview-operation" title="水平镜像" @click="onHorizontalMirror">
              <svg class="u-icon" focusable="false" data-icon="swap" aria-hidden="true" viewBox="64 64 896 896"><path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
            </div>
            <div class="u-preview-operation" title="垂直镜像" @click="onVerticalMirror">
              <svg class="u-icon" style="transform: rotate(90deg);" focusable="false" data-icon="swap" aria-hidden="true" viewBox="64 64 896 896"><path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
            </div>
          </div>
          <div
            class="m-preview-image"
            :style="`transform: translate3d(${dragX}px, ${dragY}px, 0px);`">
            <Spin
              :spinning="!loaded[index]"
              indicator="dynamic-circle"
              v-show="previewIndex === index"
              v-for="(image, index) in images" :key="index">
              <img
                class="u-preview-image"
                :style="`transform: scale3d(${swapX * scale}, ${swapY * scale}, 1) rotate(${rotate}deg);`"
                :src="image.src"
                :alt="image.name"
                @mousedown.prevent="onMouseDown($event)"
                @load="onLoaded(index)"
                @dblclick="resetOnDbclick ? onResetOrigin() : () => false"/>
            </Spin>
          </div>
          <template v-if="imageCount > 1">
            <div
              class="m-switch-left"
              :class="{'u-switch-disabled': previewIndex === 0 && !loop}"
              @click="onSwitchLeft">
              <svg focusable="false" class="u-switch" data-icon="left" aria-hidden="true" viewBox="64 64 896 896"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
            </div>
            <div
              class="m-switch-right"
              :class="{'u-switch-disabled': previewIndex === imageCount - 1 && !loop}"
              @click="onSwitchRight">
              <svg focusable="false" class="u-switch" data-icon="right" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style lang="less" scoped>
.mask-enter-active, .mask-leave-active {
  transition: opacity .25s ease-in-out;
}
.mask-enter-from, .mask-leave-to {
  opacity: 0;
}
.preview-enter-active, .preview-leave-active {
  transition: all .25s ease-in-out;
}
.preview-enter-from, .preview-leave-to {
  opacity: 0;
  transform: scale(.01);
}
.m-image-wrap {
  display: inline-block;
  .image-hover-mask {
    &:hover {
      .m-image-mask {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
  .bordered {
    border: 1px solid #d9d9d9;
  }
  .m-image {
    position: relative;
    display: inline-block;
    vertical-align: top;
    border-radius: 8px;
    overflow: hidden;
    .u-image {
      display: inline-block;
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    .m-image-mask {
      // top right bottom left 简写为 inset: 0
      // insert 无论元素的书写模式、行内方向和文本朝向如何，其所定义的都不是逻辑偏移而是实体偏移
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: rgba(0, 0, 0, .5);
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s;
      .m-image-mask-info {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 4px;
        .u-eye {
          display: inline-flex;
          align-items: center;
          margin-right: 4px;
          vertical-align: -.125em;
          width: 14px;
          height: 14px;
          fill: #FFF;
        }
        .u-pre {
          display: inline-block;
        }
      }
    }
  }
  .m-preview-mask {
    position: fixed;
    inset: 0;
    z-index: 1000;
    height: 100%;
    background-color: rgba(0, 0, 0, .45);
  }
  .m-preview-wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    outline: 0;
    z-index: 1080;
    height: 100%;
    text-align: center;
    .m-preview-body {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      .m-preview-operations {
        position: fixed;
        width: 100%;
        z-index: 9;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        background: rgba(0, 0, 0, .1);
        height: 42px;
        pointer-events: auto;
        .u-name {
          position: absolute;
          left: 12px;
          font-size: 14px;
          color: rgb(255, 255, 255);
          line-height: 1.57;
          max-width: calc(50% - 60px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color .3s;
          &:hover {
            color: @themeColor;
          }
        }
        .u-preview-progress {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: rgb(255, 255, 255);
          line-height: 1.57;
        }
        .u-preview-operation {
          line-height: 1;
          padding: 12px;
          cursor: pointer;
          transition: all .3s;
          &:not(:last-child) {
            margin-left: 12px;
          }
          &:hover {
            background: rgba(0,0,0,.25);
          }
          .u-icon {
            display: inline-block;
            width: 18px;
            height: 18px;
            vertical-align: bottom;
            fill: #FFF;
          }
        }
        .u-operation-disabled {
          color: rgba(255, 255, 255, .25);
          pointer-events: none;
          .u-icon {
            fill: rgba(255, 255, 255, .25);
          }
        }
      }
      .m-preview-image {
        position: absolute;
        z-index: 3;
        inset: 0;
        transition: transform .3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        display: flex;
        justify-content: center;
        align-items: center;
        .u-preview-image {
          display: inline-block;
          vertical-align: middle;
          max-width: 100%;
          max-height: 100vh;
          cursor: grab;
          transition: transform .3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
          user-select: none;
          pointer-events: auto;
        }
      }
      .m-switch-left {
        inset-inline-start: 12px;
        position: fixed;
        inset-block-start: 50%;
        z-index: 1081;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-top: -20px;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, .1);
        border-radius: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all .3s;
        pointer-events: auto;
        &:hover {
          background: rgba(0, 0, 0, .2);
        }
        .u-switch {
          width: 18px;
          height: 18px;
          fill: #FFF;
        }
      }
      .m-switch-right {
        inset-inline-end: 12px;
        position: fixed;
        inset-block-start: 50%;
        z-index: 1081;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-top: -20px;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, .1);
        border-radius: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all .3s;
        pointer-events: auto;
        &:hover {
          background: rgba(0, 0, 0, .2);
        }
        .u-switch {
          width: 18px;
          height: 18px;
          fill: #FFF;
        }
      }
      .u-switch-disabled {
        color: rgba(255, 255, 255, .25);
        background: transparent;
        cursor: not-allowed;
        &:hover {
          background: transparent;
        }
        .u-switch {
          fill: rgba(255, 255, 255, .25);
        }
      }
    }
  }
}
</style>
