<script setup lang="ts">
import { ref } from 'vue'

const images = ref([
  {
    title: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg',
    link: ''
  },
  {
    title: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/2.jpg',
    link: ''
  },
  {
    title: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/3.jpg',
    link: ''
  },
  {
    title: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/4.jpg',
    link: ''
  },
  {
    title: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg',
    link: ''
  },
  {
    title: 'image-6',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/6.jpg',
    link: ''
  },
  {
    title: 'image-7',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/7.jpg',
    link: ''
  },
  {
    title: 'image-8',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/8.jpg',
    link: ''
  },
  {
    title: 'image-9',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/9.jpg',
    link: ''
  }
])
</script>
<template>
  <div>
    <h1>Carousel 走马灯</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Carousel
      :images="images"
      :width="800"
      :height="450" />
    <h2 class="mt30 mb10">自定义导航、分页样式</h2>
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      navColor="#13C2C2"
      :navSize="48"
      pageActiveColor="#13C2C2"
      :pageStyle="{ width: '20px', height: '12px', borderRadius: '12px', backgroundColor: '#DDD' }" />
  </div>
</template>
