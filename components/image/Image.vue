<script setup lang="ts">
import { computed, ref, watchEffect, nextTick } from 'vue'
import Space from 'components/space'
import Spin from 'components/spin'
import { add } from 'components/utils'
export interface Image {
  src: string // 图像地址
  name?: string // 图像名称
}
export interface Props {
  src?: string | Image[] // 图像地址或图像地址数组
  name?: string // 图像名称，没有传入图片名时自动从图像地址 src 中读取
  width?: string | number | (string | number)[] // 图像宽度，单位 px
  height?: string | number | (string | number)[] // 图像高度，单位 px
  bordered?: boolean // 是否显示边框
  fit?: 'contain' | 'fill' | 'cover' | 'none' | 'scale-down' // 图片在容器内的的适应类型
  preview?: string // 预览文本 string | slot
  spaceProps?: object // Space 组件属性配置，用于配置多张展示图片时的排列方式
  spinProps?: object // Spin 组件属性配置，用于配置图片加载中样式
  zoomRatio?: number // 每次缩放比率
  minZoomScale?: number // 最小缩放比例
  maxZoomScale?: number // 最大缩放比例
  resetOnDbclick?: boolean // 缩放移动旋转图片后，是否可以双击还原
  draggable?: boolean // 是否可以拖动图片
  loop?: boolean // 是否可以循环切换图片
  album?: boolean // 是否相册模式，即从一张展示图片点开相册
}
const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  name: undefined,
  width: 100,
  height: 100,
  bordered: true,
  fit: 'contain',
  preview: '预览',
  spaceProps: () => ({}),
  spinProps: () => ({}),
  zoomRatio: 0.1,
  minZoomScale: 0.1,
  maxZoomScale: 10,
  resetOnDbclick: true,
  draggable: false,
  loop: false,
  album: false
})
const images = ref<any[]>([])
const previewRef = ref() // 预览 DOM 引用
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
const sourceDragX = ref(0) // 鼠标按下时图片的X轴偏移量
const sourceDragY = ref(0) // 鼠标按下时图片的Y轴偏移量
const top = ref<number>(0) // 图片上边缘距浏览器窗口上边界的距离
const bottom = ref<number>(0) // 图片下边缘距浏览器窗口上边界的距离
const right = ref<number>(0) // 图片右边缘距浏览器窗口左边界的距离
const left = ref<number>(0) // 图片左边缘距浏览器窗口左边界的距离
const viewportWidth = ref<number>(0) // 视口宽度
const viewportHeight = ref<number>(0) // 视口高度
const imageAmount = computed(() => {
  return images.value.length
})
const dragTransitionDuration = computed(() => {
  return props.draggable ? '100ms' : '300ms'
})
const complete = ref(Array(imageAmount.value).fill(false)) // 图片是否加载完成
const loaded = ref(Array(imageAmount.value).fill(false)) // 预览图片是否加载完成
watchEffect(() => {
  images.value = getImages()
})
function getImages() {
  if (Array.isArray(props.src)) {
    return props.src
  } else {
    return [
      {
        src: props.src,
        name: props.name
      }
    ]
  }
}
function onComplete(n: number) {
  // 图片加载完成
  complete.value[n] = true
}
function onLoaded(index: number) {
  // 预览图片加载完成
  loaded.value[index] = true
}
function getImageName(image: Image) {
  // 从图像地址src中获取图像名称
  if (image) {
    if (image.name) {
      return image.name
    } else {
      const res = image.src.split('?')[0].split('/')
      return res[res.length - 1]
    }
  }
}
function getImageSize(size: string | number | (string | number)[], index: number): string {
  if (Array.isArray(size)) {
    if (typeof size[index] === 'number') {
      return `${size[index]}px`
    }
    return size[index]
  } else {
    if (typeof size === 'number') {
      return `${size}px`
    }
    return size
  }
}
function onKeyboard(e: KeyboardEvent) {
  if (showPreview.value && imageAmount.value > 1) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      onSwitchLeft()
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      onSwitchRight()
    }
  }
}
async function onPreview(index: number) {
  scale.value = 1
  rotate.value = 0
  dragX.value = 0
  dragY.value = 0
  showPreview.value = true
  previewIndex.value = index
  await nextTick()
  previewRef.value.focus()
}
defineExpose({
  preview: onPreview
})
function onClose() {
  // 关闭
  showPreview.value = false
}
function onZoomin() {
  // 放大
  if (scale.value + props.zoomRatio > props.maxZoomScale) {
    scale.value = props.maxZoomScale
  } else {
    scale.value = add(scale.value, props.zoomRatio)
  }
}
function onZoomout() {
  // 缩小
  if (scale.value - props.zoomRatio < props.minZoomScale) {
    scale.value = props.minZoomScale
  } else {
    scale.value = add(scale.value, -props.zoomRatio)
  }
}
function onResetOrigin() {
  // 重置图片为初始状态
  scale.value = 1
  swapX.value = 1
  swapY.value = 1
  rotate.value = 0
  dragX.value = 0
  dragY.value = 0
}
function onClockwiseRotate() {
  // 顺时针旋转
  rotate.value += 90
}
function onAnticlockwiseRotate() {
  // 逆时针旋转
  rotate.value -= 90
}
function onHorizontalMirror() {
  swapX.value *= -1
}
function onVerticalMirror() {
  swapY.value *= -1
}
function onWheel(e: WheelEvent) {
  // 鼠标滚轮缩放
  // e.preventDefault() // 禁止浏览器捕获滑动事件
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
function handleMouseDown(e: MouseEvent) {
  // event.preventDefault() // 消除拖动元素时的阴影
  if (!e.target) return
  const el = e.target // 当前点击的元素
  const imageRect = (el as Element).getBoundingClientRect()
  top.value = imageRect.top // 图片上边缘距浏览器窗口上边界的距离
  bottom.value = imageRect.bottom // 图片下边缘距浏览器窗口上边界的距离
  right.value = imageRect.right // 图片右边缘距浏览器窗口左边界的距离
  left.value = imageRect.left // 图片左边缘距浏览器窗口左边界的距离
  viewportWidth.value = window.innerWidth // 视口宽度
  viewportHeight.value = window.innerHeight // 视口高度
  sourceX.value = e.clientX // 鼠标按下时相对于视口左边缘的X坐标
  sourceY.value = e.clientY // 鼠标按下时相对于视口上边缘的Y坐标
  sourceDragX.value = dragX.value // 鼠标按下时图片的X轴偏移量
  sourceDragY.value = dragY.value // 鼠标按下时图片的Y轴偏移量
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  handleMouseMove(e)
}
function handleMouseMove(e: MouseEvent) {
  // e.clientX返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
  dragX.value = sourceDragX.value + e.clientX - sourceX.value
  dragY.value = sourceDragY.value + e.clientY - sourceY.value
}
function handleMouseUp() {
  if (props.draggable) {
    if (dragX.value > sourceDragX.value + viewportWidth.value - right.value) {
      // 溢出视口右边缘
      dragX.value = sourceDragX.value + viewportWidth.value - right.value
    }
    if (dragX.value < sourceDragX.value - left.value) {
      // 溢出视口左边缘
      dragX.value = sourceDragX.value - left.value
    }
    if (dragY.value > sourceDragY.value + viewportHeight.value - bottom.value) {
      // 溢出视口下边缘
      dragY.value = sourceDragY.value + viewportHeight.value - bottom.value
    }
    if (dragY.value < sourceDragY.value - top.value) {
      // 溢出视口上边缘
      dragY.value = sourceDragY.value - top.value
    }
  } else {
    dragX.value = 0
    dragY.value = 0
  }
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}
function onSwitchLeft() {
  if (props.loop) {
    previewIndex.value = (previewIndex.value - 1 + imageAmount.value) % imageAmount.value
  } else {
    if (previewIndex.value > 0) {
      previewIndex.value--
    }
  }
  onResetOrigin()
}
function onSwitchRight() {
  if (props.loop) {
    previewIndex.value = (previewIndex.value + 1) % imageAmount.value
  } else {
    if (previewIndex.value < imageAmount.value - 1) {
      previewIndex.value++
    }
  }
  onResetOrigin()
}
</script>
<template>
  <div class="m-image">
    <Space gap="small" v-bind="spaceProps">
      <div
        v-show="!album || (album && index === 0)"
        class="image-wrap"
        :class="{ 'image-bordered': bordered, 'image-hover-mask': complete[index] }"
        :style="`width: ${getImageSize(props.width, index)}; height: ${getImageSize(props.height, index)};`"
        v-for="(image, index) in images"
        :key="index"
      >
        <Spin :spinning="!complete[index]" indicator="dynamic-circle" size="small" v-bind="spinProps">
          <img
            class="image-item"
            :style="`object-fit: ${fit};`"
            @load="onComplete(index)"
            :src="image.src"
            :alt="getImageName(image)"
          />
        </Spin>
        <div class="image-mask" @click="onPreview(index)">
          <div class="image-mask-info">
            <svg
              class="eye-svg"
              focusable="false"
              data-icon="eye"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
              ></path>
            </svg>
            <p class="mask-pre">
              <slot name="preview">{{ preview }}</slot>
            </p>
          </div>
        </div>
      </div>
    </Space>
    <Transition name="fade">
      <div v-show="showPreview" class="preview-mask"></div>
    </Transition>
    <Transition
      name="zoom"
      enter-from-class="zoom-enter"
      enter-active-class="zoom-enter"
      enter-to-class="zoom-enter zoom-enter-active"
      leave-from-class="zoom-leave"
      leave-active-class="zoom-leave zoom-leave-active"
      leave-to-class="zoom-leave zoom-leave-active"
    >
      <div
        v-show="showPreview"
        ref="previewRef"
        class="preview-wrap"
        tabindex="-1"
        @click.self="onClose"
        @wheel.prevent="onWheel"
        @keydown="onKeyboard"
        @keydown.esc="onClose"
      >
        <div class="preview-body">
          <div class="preview-operations">
            <a
              class="previe-name"
              :href="images[previewIndex].src"
              target="_blank"
              :title="getImageName(images[previewIndex])"
            >
              {{ getImageName(images[previewIndex]) }}
            </a>
            <p class="preview-progress" v-show="Array.isArray(src)">{{ previewIndex + 1 }} / {{ imageAmount }}</p>
            <div class="preview-operation" title="关闭" @click="onClose">
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                ></path>
              </svg>
            </div>
            <div
              class="preview-operation"
              :class="{ 'operation-disabled': scale === maxZoomScale }"
              title="放大"
              @click="onZoomin"
            >
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="zoom-in"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"
                ></path>
              </svg>
            </div>
            <div
              class="preview-operation"
              :class="{ 'operation-disabled': scale === minZoomScale }"
              title="缩小"
              @click="onZoomout"
            >
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="zoom-out"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"
                ></path>
              </svg>
            </div>
            <div class="preview-operation" title="还原" @click="onResetOrigin">
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="expand"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"
                ></path>
              </svg>
            </div>
            <div class="preview-operation" title="向右旋转" @click="onClockwiseRotate">
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="rotate-right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z"
                ></path>
                <path
                  d="M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z"
                ></path>
              </svg>
            </div>
            <div class="preview-operation" title="向左旋转" @click="onAnticlockwiseRotate">
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="rotate-left"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"
                ></path>
                <path
                  d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"
                ></path>
              </svg>
            </div>
            <div class="preview-operation" title="水平镜像" @click="onHorizontalMirror">
              <svg
                class="icon-svg"
                focusable="false"
                data-icon="swap"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"
                ></path>
              </svg>
            </div>
            <div class="preview-operation" title="垂直镜像" @click="onVerticalMirror">
              <svg
                class="icon-svg"
                style="transform: rotate(90deg)"
                focusable="false"
                data-icon="swap"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            class="preview-image-wrap"
            :style="`--drag-transition-duration: ${dragTransitionDuration}; transform: translate3d(${dragX}px, ${dragY}px, 0px);`"
            v-show="previewIndex === index"
            v-for="(image, index) in images"
            :key="index"
          >
            <img
              class="preview-image"
              :style="`transform: scale3d(${swapX * scale}, ${swapY * scale}, 1) rotate(${rotate}deg);`"
              :src="image.src"
              :alt="getImageName(image)"
              @mousedown.prevent="handleMouseDown"
              @load="onLoaded(index)"
              @dblclick="resetOnDbclick ? onResetOrigin() : () => false"
            />
          </div>
          <template v-if="imageAmount > 1">
            <div class="switch-left" :class="{ 'switch-disabled': previewIndex === 0 && !loop }" @click="onSwitchLeft">
              <svg
                class="switch-svg"
                focusable="false"
                data-icon="left"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                ></path>
              </svg>
            </div>
            <div
              class="switch-right"
              :class="{ 'switch-disabled': previewIndex === imageAmount - 1 && !loop }"
              @click="onSwitchRight"
            >
              <svg
                class="switch-svg"
                focusable="false"
                data-icon="right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
                ></path>
              </svg>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.zoom-enter {
  transform: none;
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.zoom-enter-active {
  animation-name: zoomIn;
  animation-play-state: running;
  @keyframes zoomIn {
    0% {
      transform: scale(0.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
.zoom-leave {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-leave-active {
  animation-name: zoomOut;
  animation-play-state: running;
  pointer-events: none;
  @keyframes zoomOut {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.2);
      opacity: 0;
    }
  }
}

.m-image {
  display: inline-block;
  .image-hover-mask {
    &:hover {
      .image-mask {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
  .image-wrap {
    position: relative;
    display: inline-block;
    vertical-align: top;
    border-radius: 8px;
    overflow: hidden;
    .image-item {
      display: inline-block;
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
    .image-mask {
      // top right bottom left 简写为 inset: 0
      // insert 无论元素的书写模式、行内方向和文本朝向如何，其所定义的都不是逻辑偏移而是实体偏移
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
      .image-mask-info {
        display: inline-flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 4px;
        .eye-svg {
          margin-right: 4px;
          font-size: 14px;
          color: #fff;
          fill: currentColor;
        }
        .mask-pre {
          display: inline-block;
          color: #fff;
        }
      }
    }
  }
  .image-bordered {
    border: 1px solid #d9d9d9;
  }
  .preview-mask {
    position: fixed;
    inset: 0;
    z-index: 1000;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
  }
  .preview-wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    outline: none;
    z-index: 1080;
    height: 100%;
    text-align: center;
    .preview-body {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      .preview-operations {
        position: fixed;
        width: 100%;
        z-index: 9;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        background: rgba(0, 0, 0, 0.1);
        height: 42px;
        pointer-events: auto;
        .previe-name {
          position: absolute;
          left: 12px;
          font-size: 14px;
          color: rgb(255, 255, 255);
          line-height: 1.57;
          max-width: calc(50% - 60px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s;
          &:hover {
            color: #1677ff;
          }
        }
        .preview-progress {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: rgb(255, 255, 255);
          line-height: 1.57;
        }
        .preview-operation {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 42px;
          height: 42px;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          &:not(:last-child) {
            margin-left: 12px;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.25);
          }
          .icon-svg {
            font-size: 18px;
            color: #fff;
            fill: currentColor;
          }
        }
        .operation-disabled {
          color: rgba(255, 255, 255, 0.25);
          pointer-events: none;
          .icon-svg {
            color: rgba(255, 255, 255, 0.25);
          }
        }
      }
      .preview-image-wrap {
        position: absolute;
        z-index: 3;
        inset: 0;
        transition: transform var(--drag-transition-duration) cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        display: flex;
        justify-content: center;
        align-items: center;
        .preview-image {
          display: inline-block;
          vertical-align: middle;
          max-width: 100%;
          max-height: 100vh;
          cursor: grab;
          transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
          user-select: none;
          pointer-events: auto;
        }
      }
      .switch-left {
        left: 12px;
        position: fixed;
        top: 50%;
        z-index: 1081;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-top: -20px;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 0.3s;
        pointer-events: auto;
        user-select: none;
        &:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .switch-svg {
          font-size: 18px;
          color: #fff;
          fill: currentColor;
        }
      }
      .switch-right {
        right: 12px;
        position: fixed;
        top: 50%;
        z-index: 1081;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-top: -20px;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 0.3s;
        pointer-events: auto;
        &:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .switch-svg {
          font-size: 18px;
          color: #fff;
          fill: currentColor;
        }
      }
      .switch-disabled {
        color: rgba(255, 255, 255, 0.25);
        background: transparent;
        cursor: not-allowed;
        &:hover {
          background: transparent;
        }
        .switch-svg {
          color: rgba(255, 255, 255, 0.25);
        }
      }
    }
  }
}
</style>
