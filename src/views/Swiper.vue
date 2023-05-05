<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getImageUrl } from '@/utils/util'

const images = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: getImageUrl(i)
    })
  }
  console.log(images.value)
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
function onChange () {
  console.log('slider change')
}
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
    <h2 class="mt30 mb10">Swiper 轮播图基本使用 (type: banner)</h2>
    <Swiper
      :images="images"
      type="banner"
      effect="slider"
      width="100%"
      height="600px"
      navigation
      @change="onChange" />
    <h2 class="mt30 mb10">Swiper 走马灯基本使用 (type: carousel)</h2>
    <Swiper
      :images="images"
      type="carousel"
      width="100%"
      preloaderColor="theme"
      :height="240"
      :slides-per-view="3"
      :space-between="20"
      :speed="2500" />
  </div>
</template>
