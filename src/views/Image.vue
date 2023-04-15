<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg',
    alt: 'image-1'
  },
  {
    src: 'https://download.jinhui365.cn/group1/M00/01/30/CgABcmQ4yseAGS8yAAugtJ8mHPI827.jpg',
    alt: 'image-2'
  },
  {
    src: new URL(`../assets/images/1.jpg`, import.meta.url).href,
    alt: 'image-3'
  },
  {
    src: new URL(`../assets/images/2.jpg`, import.meta.url).href,
    alt: 'image-4'
  },
  {
    src: new URL(`../assets/images/3.jpg`, import.meta.url).href,
    alt: 'image-5'
  }
])
</script>
<template>
  <div>
    <h2 class="mb10">Image 图片基本使用</h2>
    <Image :width="400" :height="300" src="https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg" />
    <h2 class="mt30 mb10">多张图片预览，同时支持键盘 (left / right / up / down) 按键切换 (src: images)</h2>
    <Image :width="400" :height="300" :src="images" />
    <h2 class="mt30 mb10">多张图片预览，支持循环切换图片 (loop: true)</h2>
    <Image :width="400" :height="300" loop :src="images" />
    <h2 class="mt30 mb10">预览文本设为 preview 同时图片覆盖容器 (preview: preview & fit: cover)</h2>
    <Image :width="400" :height="300" fit="cover" src="https://download.jinhui365.cn/group1/M00/01/30/CgABcmQ4yseAGS8yAAugtJ8mHPI827.jpg">
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
      src="https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg" />
  </div>
</template>
<style lang="less" scoped>
.border-box {
  :deep(*) {
    box-sizing: border-box;
  }
}
.u-pre {
  display: inline-block;
  font-size: 16px;
}
</style>
