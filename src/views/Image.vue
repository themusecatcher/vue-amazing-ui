<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg',
    name: 'image-5.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/6.jpg',
    name: 'image-6.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/7.jpg',
    name: 'image-7.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/8.jpg',
    name: 'image-8.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/9.jpg',
    name: 'image-9.jpg'
  }
])
setTimeout(() => {
  
}, 1000)
</script>
<template>
  <div>
    <h1>Image 图片</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg" />
    <h2 class="mt30 mb10">多张图片预览，同时支持键盘 (left / right / up / down) 按键切换 (src: images)</h2>
    <Image :src="images" />
    <h2 class="mt30 mb10">多张图片预览，支持循环切换图片 (loop: true)</h2>
    <Image loop :src="images" />
    <h2 class="mt30 mb10">多张图片预览，相册模式 (album: true)</h2>
    <Image loop :src="images" album />
    <h2 class="mt30 mb10">预览文本设为 preview 同时图片覆盖容器 (preview: preview & fit: cover)</h2>
    <Image fit="cover" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg">
      <template #preview>
        <p class="u-pre">preview</p>
      </template>
    </Image>
    <h2 class="mt30 mb10">更改缩放比率和最大最小缩放比例 (zoomRatio: 0.2 & minZoomScale: 0.5 & maxZoomScale: 2)</h2>
    <Image
      :width="400"
      :height="300"
      :zoomRatio="0.2"
      :minZoomScale="0.5"
      :maxZoomScale="2"
      src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg" />
  </div>
</template>
<style lang="less" scoped>
.u-pre {
  display: inline-block;
  font-size: 16px;
}
</style>
