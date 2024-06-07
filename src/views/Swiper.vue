<script setup lang="ts">
import pkg from '/package.json'
import { ref, shallowReactive, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
function onChange (swiper: any) {
  console.log('slider change', swiper)
}
const navigation = shallowReactive<{[key: string]: any}>({})
function onSwiper (swiper: any) {
  navigation.prevEl = swiper.navigation.prevEl
  navigation.prevEl.style.display = 'none'
  navigation.nextEl = swiper.navigation.nextEl
  navigation.nextEl.style.display = 'none'
}
function onPrev () {
  navigation.prevEl.click()
}
function onNext () {
  navigation.nextEl.click()
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
    <h2 class="mt30 mb10">基本使用</h2>
    <Swiper
      :images="images"
      :height="600"
      :pagination="{
        dynamicBullets: true,
        clickable: true
      }"
      @change="onChange" />
    <h2 class="mt30 mb10">走马灯</h2>
    <Swiper
      :images="images"
      type="carousel"
      :height="240"
      :slides-per-view="3"
      :space-between="20"
      :speed="2500" />
    <h2 class="mt30 mb10">信息展播</h2>
    <Space>
      <Button @click="onPrev">Prev</Button>
      <Button @click="onNext">Next</Button>
    </Space>
    <br/>
    <br/>
    <Swiper
      :images="images"
      type="broadcast"
      :pagination="{
        dynamicBullets: true,
        clickable: true
      }"
      :height="320"
      :slides-per-view="3"
      :space-between="30"
      loop
      mousewheel
      @swiper="onSwiper" />
  </div>
</template>
