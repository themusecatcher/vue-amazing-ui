<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { rafTimeout } from '../../packages'
import videoSrc from '@/assets/files/Bao.mp4'
// import videoPoster from '@/assets/images/bao.jpg'

// const videoSrc = ref(new URL('@/assets/files/Bao.mp4', import.meta.url).href)
// const videoPoster = ref(new URL('@/assets/images/bao.jpg', import.meta.url).href)

// const videoSrc = ref('https://cdn.jsdelivr.net/gh/themusecatcher/static-resources@0.0.2/Bao.mp4')
const videoPoster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/static-resources@0.0.2/bao.jpg')

onMounted(() => {
  // rafTimeout(() => { // 模拟接口调用
  //     videoSrc.value = 'https://cdn.jsdelivr.net/gh/themusecatcher/static-resources@0.0.2/Bao.mp4'
  //     videoPoster.value = 'https://cdn.jsdelivr.net/gh/themusecatcher/static-resources@0.0.2/bao.jpg'
  //   }, 1000)
})
</script>

<template>
  <div>
    <h2 class="mb10">Video 播放器基本使用</h2>
    <Video
      v-show="true"
      :videoSrc="videoSrc"
      :videoPoster="videoPoster"
      :width="800"
      :height="450"
      :autoplay="false"
      :controls="true"
      :loop="false"
      :muted="false"
      preload="metadata"
      :showPlay="true"
      :playWidth="96"
      zoom="cotain" />
  </div>
</template>
