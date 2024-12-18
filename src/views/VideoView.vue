<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
const video = ref()
function onPlay() {
  console.log('play')
}
function onPause() {
  console.log('pause')
}
const play = () => {
  video.value.play()
}
const pause = () => {
  video.value.pause()
}
</script>
<template>
  <div style="max-width: 800px">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Video :src="src" :poster="poster" @play="onPlay" @pause="onPause" />
    <h2 class="mt30 mb10">自定义视频和图标尺寸</h2>
    <Video :src="src" :poster="poster" :width="400" :height="225" :icon-size="60" />
    <h2 class="mt30 mb10">自动截取视频指定帧作为视频封面</h2>
    <h3 class="mb10">在未设置封面时，自动截取视频第 second 秒指定帧作为封面图</h3>
    <Video :src="src" :second="3" />
    <h2 class="mt30 mb10">自定义视频封面和内容的缩放规则</h2>
    <Video :src="src" :poster="poster" fit="cover" />
    <h2 class="mt30 mb10">自动循环播放</h2>
    <h3 class="mb10">
      autoplay：由于目前在最新版的 Chrome 浏览器（以及所有以 Chromium
      为内核的浏览器）中，已不再允许自动播放音频和视频。就算你为 video 或 audio 标签设置了 autoplay
      属性也一样不能自动播放！
    </h3>
    <h3 class="mb10">
      解决方法：设置视频 autoplay 时，视频必须设置为静音 muted: true
      即可实现自动播放，然后用户可以使用控制栏开启声音，类似某宝商品自动播放的宣传视频逻辑
    </h3>
    <Video :src="src" :poster="poster" autoplay loop />
    <h2 class="mt30 mb10">隐藏播放控件</h2>
    <Video :src="src" :poster="poster" :controls="false" />
    <h2 class="mt30 mb10">隐藏暂停图标</h2>
    <Video :src="src" :poster="poster" :play-icon="false" />
    <h2 class="mt30 mb10">使用 Methods</h2>
    <Flex vertical>
      <Space>
        <Button type="primary" @click="play">播放</Button>
        <Button @click="pause">暂停</Button>
      </Space>
      <Video ref="video" :src="src" :poster="poster" />
    </Flex>
  </div>
</template>
