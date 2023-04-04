<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getImageUrl } from '@/utils/util'

const imageData = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 8; i++) {
    imageData.value.push({
      title: `image-${i}`,
      link: '',
      imgUrl: getImageUrl(i)
    })
  }
  console.log(imageData.value)
}
onMounted(() => {
  // setTimeout(() => {
  loadImages()
  // }, 0)
})
</script>
<template>
  <div>
    <h2 class="mb10">Carousel 走马灯基本使用</h2>
    <Carousel
      :imageData="imageData"
      :width="800"
      :height="450"
      :interval="1500"
      :pauseOnMouseEnter="true"
      :disableOnInteraction="false" />
  </div>
</template>
<style lang="less" scoped>

</style>
