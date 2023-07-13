<script setup lang="ts">
import { ref } from 'vue'
import src from '@/assets/files/Bao.mp4'

// const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Bao.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/bao.jpg')
</script>

<template>
  <div>
    <h1>Video 播放器</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Video :src="src" :poster="poster" />
    <h2 class="mt30 mb10">自动播放</h2>
    <Video autoplay :src="src" :poster="poster" />
    <h2 class="mt30 mb10">自动截取视频指定帧作为视频封面</h2>
    <Video :src="src" :second="3" />
  </div>
</template>
