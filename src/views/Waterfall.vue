<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])

function loadImages() {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Waterfall :images="images" :width="1100" />
    <h2 class="mt30 mb10">自定义展示</h2>
    <Waterfall
      :images="images"
      :width="1100"
      :column-count="4"
      :column-gap="10"
      background-color="#e1faeb"
      :border-radius="6"
    />
  </div>
</template>
