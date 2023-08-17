<script setup lang="ts">
import pkg from '/package.json'
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/${i}.jpg`
    })
  }
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
        <a class="u-file" href="https://swiperjs.com/swiper-api" target="_blank">Swiper API</a>
      </li>
      <li>
        <a class="u-file" href="https://swiperjs.com/vue" target="_blank">Swiper Vue</a>
      </li>
      <li>
        <a class="u-file" href="https://swiperjs.com/demos" target="_blank">Swiper Demos</a>
      </li>
    </ul>
    <Space align="top" class="mt30" :size="6">
      <h1>Swiper</h1>
      <Tag color="volcano">{{ pkg.dependencies.swiper }}</Tag>
    </Space>
    <h2 class="mt30 mb10">轮播图基本使用 (type: banner)</h2>
    <Swiper :images="images" :height="600" @change="onChange" />
    <h2 class="mt30 mb10">Swiper 走马灯基本使用 (type: carousel)</h2>
    <Swiper
      :images="images"
      type="carousel"
      :height="240"
      :slides-per-view="3"
      :space-between="20"
      :speed="2500" />
  </div>
</template>
