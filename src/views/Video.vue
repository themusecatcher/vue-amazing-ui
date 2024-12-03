<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.1/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.1/ultra.jpg')
function onPlay() {
  console.log('play')
}
function onPause() {
  console.log('pause')
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Video :src="src" :poster="poster" @play="onPlay" @pause="onPause" />
    <h2 class="mt30 mb10">自动播放</h2>
    <Video autoplay :src="src" :poster="poster" />
    <h2 class="mt30 mb10">自动截取视频指定帧作为视频封面</h2>
    <Video :src="src" :second="3" />
  </div>
</template>
