<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getImageUrl } from '@/utils/util'

const imageData = ref<any[]>([])

function loadImages () {
  for (let i = 2; i <= 10; i++) {
    imageData.value.push({
      title: `image-${i}`,
      link: 'https://www.baidu.com',
      imgUrl: getImageUrl(i)
    })
  }
  console.log(imageData.value)
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <div>
    <h1>Swiper 参考文档</h1>
    <a class="u-file" href="https://swiperjs.com/" target="_blank">Swiper官方</a>
    <a class="u-file" href="https://swiperjs.com/vue" target="_blank">Swiper Vue</a>
    <a class="u-file" href="https://swiperjs.com/demos" target="_blank">Swiper Demos</a>
    <h1 class="mt30">banner轮播图</h1>
    <Swiper :imageData="imageData" mode="banner" />
    <h1 class="mt30">carousel走马灯</h1>
    <Swiper :imageData="imageData" mode="carousel" />
  </div>
</template>
<style lang="less" scoped>
.u-file {
  font-size: 18px;
  display: block;
}
</style>
