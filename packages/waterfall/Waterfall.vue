<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Spin from '../spin'
/*
  mode: JS
  使用JS获取每张图片宽高，结合relative和absolute定位计算每个图片的位置top，left，
  保证每张新的图片都追加在当前高度最小的那列末尾
  mode: CSS
  使用CSS的column-count和column-gap，实现简单，但图片顺序是每列从上往下排列
*/
interface Image {
  src: string // 图片地址
  title?: string // 图片名称
}
interface Props {
  images: Image[] // 图片数组
  columnCount?: number // 要划分的列数
  columnGap?: number // 各列之间的间隙
  width?: string|number // 瀑布流区域的总宽度
  backgroundColor?: string // 瀑布流区域背景填充色
  mode?: string // 瀑布流排列方式，可选：JS(js计算) CSS(css布局)
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  columnCount: 3,
  columnGap: 20,
  width: '100%',
  backgroundColor: '#F2F4F8',
  mode: 'JS'
})
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})

const imagesProperty = ref<any[]>([])
const preColumnHeight = ref<number[]>([]) // 每列的高度
const waterfall = ref()
const imageWidth = ref()
const height = computed(() => {
  return Math.max(...preColumnHeight.value) + props.columnGap
})
const len = computed(() => {
  return props.images.length
})
const loaded = ref(Array(len.value).fill(false)) // 图片是否加载完成
watch(
  () => props.images,
  (to) => {
    if (to.length && props.mode === 'JS') {
      onPreload()
    }
  }
)
onMounted(() => {
  if (props.images.length && props.mode === 'JS') {
    onPreload()
  }
})
function onLoaded (index: number) {
  loaded.value[index] = true
}
function getPosition (i: number, height: number) { // 获取图片位置信息（top，left）
  if (i < props.columnCount) {
    preColumnHeight.value[i] = props.columnGap + height
    return {
      top: props.columnGap,
      left: (imageWidth.value + props.columnGap) * i + props.columnGap
    }
  } else {
    const top = Math.min(...preColumnHeight.value)
    var index = 0
    for (let n = 0; n < preColumnHeight.value.length; n++) {
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
function loadImage (url: string, n: number) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.onload = function () { // 图片加载完成时执行，此时可通过image.width和image.height获取到图片原始宽高
      var height = image.height / (image.width / imageWidth.value)
      imagesProperty.value[n] = { // 存储图片宽高和位置信息
        width: imageWidth.value,
        height: height,
        ...getPosition(n, height)
      }
      resolve('load')
    }
  })
}
async function onPreload () { // 计算图片宽高和位置（top，left）
  // 计算每列的图片宽度
  imageWidth.value = (waterfall.value.offsetWidth - (props.columnCount + 1) * props.columnGap) / props.columnCount
  const len = props.images.length
  imagesProperty.value.splice(len)
  for (let i = 0; i < len; i++) {
    await loadImage(props.images[i].src, i)
  }
}
</script>
<template>
  <div v-if="mode==='JS'" v-bind="$attrs" class="m-waterfall-js" ref="waterfall" :style="`background-color: ${backgroundColor}; width: ${totalWidth}; height: ${height}px;`">
    <Spin
      class="m-img"
      :style="`width: ${property.width}px; height: ${property.height}px; top: ${property && property.top}px; left: ${property && property.left}px;`"
      :spinning="!loaded[index]"
      size="small"
      indicator="dynamic-circle"
      v-for="(property, index) in imagesProperty" :key="index">
      <img
        class="u-img"
        :src="images[index].src"
        :alt="images[index].title"
        @load="onLoaded(index)" />
    </Spin>
  </div>
  <div v-if="mode==='CSS'" v-bind="$attrs" class="m-waterfall-css" :style="`background: ${backgroundColor}; width: ${totalWidth}; padding: ${columnGap}px; column-count: ${columnCount}; column-gap: ${columnGap}px;`">
    <Spin
      :style="`margin-bottom: ${columnGap}px;`"
      :spinning="!loaded[index]"
      size="small"
      indicator="dynamic-circle"
      v-for="(item, index) in images" :key="index">
      <img class="u-img" :src="item.src" :alt="item.title" @load="onLoaded(index)"/>
    </Spin>
  </div>
</template>
<style lang="less" scoped>
.m-waterfall-js {
  position: relative;
  border-radius: 8px;
  .m-img {
    position: absolute;
    .u-img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      display: inline-block;
      vertical-align: bottom;
    }
  }
}
.m-waterfall-css {
  border-radius: 8px;
  .u-img {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: bottom;
  }
}
</style>
