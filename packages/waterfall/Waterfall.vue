<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Spin from '../spin'
import { debounce, useEventListener } from '../index'
/*
  宽度固定，图片等比例缩放；使用JS获取每张图片宽度和高度，结合 `relative` 和 `absolute` 定位
  计算每个图片的位置 `top`，`left`，保证每张新的图片都追加在当前高度最小的那列末尾
*/
interface Image {
  src: string // 图片地址
  title?: string // 图片名称
}
interface Props {
  images: Image[] // 图片数组
  columnCount?: number // 要划分的列数
  columnGap?: number // 各列之间的间隙，单位px
  width?: string | number // 瀑布流区域的总宽度
  borderRadius?: number // 瀑布流区域和图片圆角，单位px
  backgroundColor?: string // 瀑布流区域背景填充色
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  columnCount: 3,
  columnGap: 20,
  width: '100%',
  borderRadius: 8,
  backgroundColor: '#F2F4F8'
})
const waterfall = ref()
const waterfallWidth = ref<number>()
const loaded = ref(Array(props.images.length).fill(false)) // 图片是否加载完成
const imageWidth = ref<number>()
const imagesProperty = ref<{ width: number; height: number; top: number; left: number }[]>([])
const preColumnHeight = ref<number[]>(Array(props.columnCount).fill(0)) // 每列的高度
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const height = computed(() => {
  return Math.max(...preColumnHeight.value) + props.columnGap
})
const len = computed(() => {
  return props.images.length
})
const flag = ref(0)
watch(
  () => [props.images, props.columnCount, props.columnGap, props.width],
  () => {
    waterfallWidth.value = waterfall.value.offsetWidth
    preColumnHeight.value = Array(props.columnCount).fill(0)
    flag.value++
    preloadImages(flag.value)
  },
  {
    deep: true, // 强制转成深层侦听器
    flush: 'post' // 在侦听器回调中访问被 Vue 更新之后的 DOM
  }
)
onMounted(() => {
  waterfallWidth.value = waterfall.value.offsetWidth
  preloadImages(flag.value)
})
function resizeEvent() {
  const currentWidth = waterfall.value.offsetWidth
  // 窗口宽度改变时重新计算瀑布流布局
  if (props.images.length && currentWidth !== waterfallWidth.value) {
    waterfallWidth.value = currentWidth
    flag.value++
    preloadImages(flag.value)
  }
}
const debounceEvent = debounce(resizeEvent)
useEventListener(window, 'resize', debounceEvent)
async function preloadImages(symbol: number) {
  // 计算图片宽高和位置（top，left）
  // 计算每列的图片宽度
  imageWidth.value = ((waterfallWidth.value as number) - (props.columnCount + 1) * props.columnGap) / props.columnCount
  imagesProperty.value.splice(0)
  for (let i = 0; i < len.value; i++) {
    if (symbol === flag.value) {
      await loadImage(props.images[i].src, i)
    } else {
      return false
    }
  }
}
function loadImage(url: string, n: number) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.onload = function () {
      // 图片加载完成时执行，此时可通过image.width和image.height获取到图片原始宽高
      const height = image.height / (image.width / (imageWidth.value as number))
      imagesProperty.value[n] = {
        // 存储图片宽高和位置信息
        width: imageWidth.value as number,
        height: height,
        ...getPosition(n, height)
      }
      resolve('load')
    }
  })
}
function getPosition(i: number, height: number) {
  // 获取图片位置信息（top，left）
  if (i < props.columnCount) {
    preColumnHeight.value[i] = props.columnGap + height
    return {
      top: props.columnGap,
      left: ((imageWidth.value as number) + props.columnGap) * i + props.columnGap
    }
  } else {
    const top = Math.min(...preColumnHeight.value)
    let index = 0
    for (let n = 0; n < props.columnCount; n++) {
      if (preColumnHeight.value[n] === top) {
        index = n
        break
      }
    }
    preColumnHeight.value[index] = top + props.columnGap + height
    return {
      top: top + props.columnGap,
      left: ((imageWidth.value as number) + props.columnGap) * index + props.columnGap
    }
  }
}
function onLoaded(index: number) {
  loaded.value[index] = true
}
</script>
<template>
  <div
    class="m-waterfall"
    ref="waterfall"
    :style="`--border-radius: ${borderRadius}px; background-color: ${backgroundColor}; width: ${totalWidth}; height: ${height}px;`"
  >
    <Spin
      class="m-image"
      :style="`width: ${property.width}px; height: ${property.height}px; top: ${property && property.top}px; left: ${property && property.left}px;`"
      :spinning="!loaded[index]"
      size="small"
      indicator="dynamic-circle"
      v-for="(property, index) in imagesProperty"
      :key="index"
    >
      <img class="u-image" :src="images[index].src" :alt="images[index].title" @load="onLoaded(index)" />
    </Spin>
  </div>
</template>
<style lang="less" scoped>
.m-waterfall {
  position: relative;
  border-radius: var(--border-radius);
  .m-image {
    position: absolute;
    .u-image {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      display: inline-block;
      vertical-align: bottom;
    }
  }
}
</style>
