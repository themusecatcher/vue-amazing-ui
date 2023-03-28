<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { rafTimeout } from '../../packages'
// import videoUrl from '@/assets/files/Bao.mp4'
// import videoCover from '@/assets/images/Bao.jpg'

// const videoUrl = ref(new URL('@/assets/files/Bao.mp4', import.meta.url).href)
// const videoCover = ref(new URL('@/assets/images/Bao.jpg', import.meta.url).href)

const videoUrl = ref()
const videoCover = ref()

onMounted(() => {
  rafTimeout(() => { // 模拟接口调用
      videoUrl.value = 'https://download.jinhui365.cn/group1/M00/00/A7/CgAAcmNCagWAejQND0jqHviL8QA869.mp4'
      videoCover.value = 'https://download.jinhui365.cn//group1/M00/00/A8/CgAAcmNCddKACHUbAADB2zx3w90256.jpg'
    }, 1000)
})
</script>

<template>
  <div>
    <h2 class="mb10">Video 播放器基本使用</h2>
    <Video
      v-show="true"
      :videoUrl="videoUrl"
      :videoCover="videoCover"
      :width="800"
      :height="450"
      :autoplay="false"
      :controls="true"
      :loop="false"
      :muted="false"
      preload="auto"
      :showPlay="true"
      :playWidth="96"
      zoom="cotain" />
  </div>
</template>

<style lang="less" scoped>
</style>
