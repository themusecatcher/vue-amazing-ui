<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.1/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <div>
    <h2 class="mb10">Waterfall 瀑布流基本使用 (默认使用JS计算进行布局展示)</h2>
    <Waterfall
      :images="images"
      :columnCount="3"
      :columnGap="30"
      :width="1100"
      mode="JS"
      backgroundColor="#F2F4F8" />
    <h2 class="mt30 mb10">瀑布流使用CSS布局展示 (mode: CSS)</h2>
    <Waterfall
      :images="images"
      :columnCount="3"
      :columnGap="30"
      :width="1100"
      mode="CSS"
      backgroundColor="#F2F4F8" />
  </div>
</template>
