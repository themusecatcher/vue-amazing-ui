<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Spin from 'components/spin'
import { useResizeObserver } from 'components/utils'
/*
  宽度固定，图片等比例缩放；使用JS获取每张图片宽度和高度，结合 `relative` 和 `absolute` 定位
  计算每个图片的位置 `top`，`left`，保证每张新的图片都追加在当前高度最小的那列末尾
*/
export interface Image {
  name?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
  target?: '_self' | '_blank' // 如何打开跳转链接
}
export interface Props {
  images?: Image[] // 图片数组
  columnCount?: number // 要划分的列数
  columnGap?: number // 各列之间的间隙，单位 px
  width?: string | number // 瀑布流区域的总宽度，单位 px
  borderRadius?: number // 瀑布流区域和图片圆角，单位 px
  backgroundColor?: string // 瀑布流区域背景填充色
  spinProps?: object // Spin 组件属性配置，参考 Spin Props，用于配置图片加载中样式
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  columnCount: 3,
  columnGap: 20,
  width: '100%',
  borderRadius: 8,
  backgroundColor: '#F2F4F8',
  spinProps: () => ({})
})
const waterfallRef = ref() // 瀑布流容器引用
const waterfallWidth = ref<number>(0) // 瀑布流区域宽度
const imagesLoaded = ref<boolean[]>(Array(props.images.length).fill(false)) // 图片是否加载完成
const imagesSize = ref<{ width: number; height: number }[]>([]) // 所有图片原始尺寸
const imagesProperty = ref<{ width: number; height: number; top: number; left: number }[]>([]) // 瀑布流图片的宽高和位置信息
const preColumnHeight = ref<number[]>(Array(props.columnCount).fill(0)) // 每列的高度
const flag = ref<number>(0) // 更新瀑布流标识
// 瀑布流区域总宽度
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else {
    return props.width
  }
})
// 瀑布流区域总高度
const totalHeight = computed(() => {
  return Math.max(...preColumnHeight.value) + props.columnGap
})
// 每列的图片宽度
const imageWidth = computed(() => {
  return (waterfallWidth.value - (props.columnCount + 1) * props.columnGap) / props.columnCount
})
// 图片总数量
const imagesAmount = computed(() => {
  return props.images.length
})
watch(
  () => [props.images, props.columnCount, props.columnGap, props.width],
  () => {
    waterfallWidth.value = waterfallRef.value.offsetWidth
    preColumnHeight.value = Array(props.columnCount).fill(0)
    flag.value++
    updateWaterfall(flag.value)
  },
  {
    deep: true, // 强制转成深层侦听器
    flush: 'post' // 在侦听器回调中访问被 Vue 更新之后的 DOM
  }
)
onMounted(() => {
  waterfallWidth.value = waterfallRef.value.offsetWidth
  updateWaterfall(flag.value)
})
// 窗口宽度改变时重新计算瀑布流布局
useResizeObserver(waterfallRef, () => {
  const currentWidth = waterfallRef.value.offsetWidth
  if (props.images.length && currentWidth !== waterfallWidth.value) {
    waterfallWidth.value = currentWidth
    flag.value++
    updateWaterfall(flag.value)
  }
})
// 更新瀑布流
async function updateWaterfall(symbol: number): Promise<boolean | void> {
  imagesProperty.value = []
  for (let i = 0; i < imagesAmount.value; i++) {
    if (symbol === flag.value) {
      if (!imagesSize.value[i]) {
        await loadImage(props.images[i].src, i)
      } else {
        getImagesProperty(i)
      }
    } else {
      return false
    }
  }
}
// 加载图片并计算宽高和位置信息
function loadImage(url: string, n: number): void | Promise<string> {
  const loadedImageSize = imagesSize.value[n]
  if (loadedImageSize) {
    // 图片已被加载过
    getImagesProperty(n)
  } else {
    // 图片未被加载过
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = url
      // 图片加载完成后，通过 image.width 和 image.height 获取图片原始宽高
      image.onload = function () {
        imagesSize.value[n] = {
          // 保存已加载图片的尺寸信息
          width: image.width,
          height: image.height
        }
        getImagesProperty(n)
        resolve('loaded')
      }
      image.onerror = function (err) {
        reject(new Error(`Failed to load image at ${url}, err: ${err}`))
      }
    })
  }
}
// 获取并存储实际渲染图片的宽高和位置信息
function getImagesProperty(n: number): void {
  const loadedImageSize = imagesSize.value[n]
  const height = loadedImageSize.height / (loadedImageSize.width / imageWidth.value)
  imagesProperty.value[n] = {
    width: imageWidth.value,
    height: height,
    ...getPosition(n, height)
  }
}
// 获取图片位置信息
function getPosition(i: number, height: number): { top: number; left: number } {
  if (i < props.columnCount) {
    preColumnHeight.value[i] = props.columnGap + height
    return {
      top: props.columnGap,
      left: (imageWidth.value + props.columnGap) * i + props.columnGap
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
      left: (imageWidth.value + props.columnGap) * index + props.columnGap
    }
  }
}
function onLoaded(index: number): void {
  imagesLoaded.value[index] = true
}
// 从图像地址 src 中获取图像名称
function getImageName(image: Image): string {
  if (image) {
    if (image.name) {
      return image.name
    } else {
      const res = image.src.split('?')[0].split('/')
      return res[res.length - 1]
    }
  }
  return ''
}
</script>
<template>
  <div
    ref="waterfallRef"
    class="m-waterfall"
    :style="`
      --waterfall-border-radius: ${borderRadius}px;
      --waterfall-bg-color: ${backgroundColor};
      --waterfall-width: ${totalWidth};
      --waterfall-height: ${totalHeight}px;
    `"
  >
    <Spin
      class="waterfall-image"
      :style="`width: ${property.width}px; height: ${property.height}px; top: ${property && property.top}px; left: ${property && property.left}px;`"
      :spinning="!imagesLoaded[index]"
      size="small"
      indicator="dynamic-circle"
      v-bind="spinProps"
      v-for="(property, index) in imagesProperty"
      :key="index"
    >
      <a
        class="image-link"
        :class="{ 'link-cursor': images[index].link }"
        :href="images[index].link"
        :target="images[index].target ? images[index].target : '_blank'"
      >
        <img class="image-item" :src="images[index].src" :alt="getImageName(images[index])" @load="onLoaded(index)" />
      </a>
    </Spin>
  </div>
</template>
<style lang="less" scoped>
.m-waterfall {
  position: relative;
  width: var(--waterfall-width);
  height: var(--waterfall-height);
  border-radius: var(--waterfall-border-radius);
  background-color: var(--waterfall-bg-color);
  .waterfall-image {
    position: absolute;
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
</style>
