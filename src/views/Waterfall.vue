<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getImageUrl } from '@/utils/util'

const imageData = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    imageData.value.push({
      title: `image-${i}`,
      imgUrl: getImageUrl(i)
    })
  }
  console.log(imageData.value)
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <div>
    <Waterfall
      class="mt60"
      :imageData="imageData"
      :columnCount="3"
      :columnGap="30"
      :totalWidth="900"
      mode="JS"
      backgroundColor="#F2F4F8" />
  </div>
</template>
<style lang="less" scoped>

</style>
