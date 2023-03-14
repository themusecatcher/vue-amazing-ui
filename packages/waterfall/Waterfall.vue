<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
/*
  mode: JS
  使用js进行计算，新的图片每次都添加在最短那列的末尾
  mode: CSS
  纯CSS，实现简单，但图片顺序是每列从上往下排列
*/
interface Image {
  title: string,
  imgUrl: string
}
const props = defineProps({
    imageData: { // 瀑布流的图片数组
      type: Array<Image>,
      required: true,
      default: () => {
        return []
      }
    },
    columnCount: { // 瀑布流要划分的列数
      type: Number,
      default: 3
    },
    columnGap: { // 瀑布流各列之间的间隙
      type: Number,
      default: 30
    },
    totalWidth: { // 瀑布流区域的总宽度
      type: Number,
      default: 1200
    },
    backgroundColor: { // 瀑布流区域背景填充色
      type: String,
      default: '#F2F4F8'
    },
    mode: { // JS：js计算模式，CSS：css布局模式
      type: String,
      default: 'JS'
    }
  })
const cssWidth = computed(() => {
  return props.totalWidth - 2 * props.columnGap
})

const imagesProperty = ref<any[]>([])
const preColumnHeight = ref<number[]>([])

const imageWidth = computed(() => {
    return (props.totalWidth - 4 * props.columnGap) / props.columnCount
  })
const height = computed(() =>{
    return Math.max(...preColumnHeight.value) + props.columnGap
  })
watch(
  () => props.imageData,
  (to) => {
    onPreload()
    imagesProperty.value.splice(to.length)
  })
onMounted(() => {
  if (props.imageData.length) {
    onPreload()
    imagesProperty.value.splice(props.imageData.length)
  }
})

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
function onLoad (url: string, i: number) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.onload = function () { // 图片加载完成时执行，此时可通过image.width和image.height获取到图片原始宽高
      var height = image.height / (image.width / imageWidth.value)
      imagesProperty.value[i] = { // 存储图片宽高和位置信息
        width: imageWidth.value,
        height: height,
        ...getPosition(i, height)
      }
      resolve('load')
    }
  })
}
async function onPreload () { // 计算图片宽高和位置（top，left）
  const len = props.imageData.length
  for (let i = 0; i < len; i++) {
    await onLoad(props.imageData[i].imgUrl, i)
  }
}
</script>
<template>
  <div v-if="mode==='JS'" class="m-waterfall-js" :style="`background-color: ${backgroundColor}; width: ${totalWidth}px; height: ${height}px;`">
    <img
      class="u-img"
      v-for="(item, index) in imagesProperty"
      :key="index"
      :style="`width: ${imageWidth}px; top: ${item && item.top}px; left: ${item && item.left}px;`"
      :src="imageData[index].imgUrl"
      :title="imageData[index].title"
      :alt="imageData[index].title" />
  </div>
  <div v-else class="m-waterfall-css" :style="`background: ${backgroundColor}; width: ${cssWidth}px; padding: ${columnGap}px; column-count: ${columnCount}; column-gap: ${columnGap}px;`">
    <div class="m-img" :style="`margin-bottom: ${columnGap}px;`" v-for="(item, index) in imageData" :key="index">
      <img class="u-img" :src="item.imgUrl" :title="item.title" :alt="item.title" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-waterfall-css {
  .m-img {
    .u-img {
      width: 100%;
      vertical-align: bottom;
    }
  }
}
.m-waterfall-js {
  position: relative;
  .u-img {
    position: absolute;
    display: inline-block;
    object-fit: contain;
    vertical-align: bottom;
  }
}
</style>
