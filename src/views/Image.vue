<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    name: 'image-5.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg',
    name: 'image-6.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/7.jpg',
    name: 'image-7.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/8.jpg',
    name: 'image-8.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/9.jpg',
    name: 'image-9.jpg'
  }
])
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <h3 class="mb10">自定义宽高，同时图片等比缩放覆盖容器，预览文本设为 preview</h3>
    <Image
      :width="300"
      :height="300"
      fit="scale-down"
      src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg"
    >
      <template #preview>
        <p class="u-pre">preview</p>
      </template>
    </Image>
    <h2 class="mt30 mb10">多张图片预览</h2>
    <h3 class="mb10">可循环切换图片，并支持键盘 (left / right / up / down) 按键切换</h3>
    <Image :src="images" loop />
    <h2 class="mt30 mb10">隐藏边框</h2>
    <Image :src="images" :bordered="false" fit="cover" loop />
    <h2 class="mt30 mb10">相册模式</h2>
    <Image :src="images" album loop />
    <h2 class="mt30 mb10">自定义预览配置</h2>
    <h3 class="mb10">更改缩放比率和最大最小缩放比例</h3>
    <Image
      :zoom-ratio="0.2"
      :min-zoom-scale="0.5"
      :max-zoom-scale="2"
      src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"
    />
  </div>
</template>
<style lang="less" scoped>
.u-pre {
  display: inline-block;
  font-size: 16px;
}
</style>
