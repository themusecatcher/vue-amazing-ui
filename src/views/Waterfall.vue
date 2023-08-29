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
    <h1>Waterfall 瀑布流</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">默认使用JS计算进行布局展示</h3>
    <Waterfall
      :images="images"
      :width="1100" />
    <h2 class="mt30 mb10">CSS布局方式</h2>
    <Waterfall
      :images="images"
      :width="1100"
      mode="CSS" />
  </div>
</template>
