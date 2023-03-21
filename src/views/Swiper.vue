<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getImageUrl } from '@/utils/util'

const imageData = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    imageData.value.push({
      title: `image-${i}`,
      // link: '',
      // imgUrl: getImageUrl(i)
      imgUrl: 'https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg'
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
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://swiperjs.com/" target="_blank">Swiper官方</a>
      </li>
      <li>
        <a class="u-file" href="https://swiperjs.com/vue" target="_blank">Swiper Vue</a>
      </li>
      <li>
        <a class="u-file" href="https://swiperjs.com/demos" target="_blank">Swiper Demos</a>
      </li>
    </ul>
    
    <h1 class="mt30">banner轮播图</h1>
    <Swiper
      :imageData="imageData"
      mode="banner"
      effect="fade"
      width="100%"
      height="100vh"
      navigation />
    <h1 class="mt30">carousel走马灯</h1>
    <Swiper
      :imageData="imageData"
      mode="carousel"
      width="100%"
      preloaderColor="theme"
      :height="240"
      :slides-per-view="3"
      :space-between="20"
      :speed="2500" />
  </div>
</template>
<style lang="less" scoped>
</style>
