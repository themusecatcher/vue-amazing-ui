<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getImageUrl } from '@/utils/util'

const images = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      src: getImageUrl(i)
    })
  }
  console.log(images.value)
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
<style lang="less" scoped>

</style>
