<script setup lang="ts">
import { ref } from 'vue'

const images = ref([
  {
    title: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg',
    link: ''
  },
  {
    title: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/2.jpg',
    link: ''
  },
  {
    title: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/3.jpg',
    link: ''
  },
  {
    title: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/4.jpg',
    link: ''
  },
  {
    title: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/5.jpg',
    link: ''
  },
  {
    title: 'image-6',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/6.jpg',
    link: ''
  },
  {
    title: 'image-7',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/7.jpg',
    link: ''
  },
  {
    title: 'image-8',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/8.jpg',
    link: ''
  },
  {
    title: 'image-9',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/9.jpg',
    link: ''
  }
])
</script>
<template>
  <div>
    <h2 class="mb10">Carousel 走马灯基本使用</h2>
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      :interval="3000"
      :pauseOnMouseEnter="true"
      :disableOnInteraction="false" />
  </div>
</template>
