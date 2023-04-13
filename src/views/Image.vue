<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg',
    alt: 'image-1'
  },
  {
    src: 'https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZOKAPknKAAUO5gkkV8M466.jpg',
    alt: 'image-3'
  }
])
</script>
<template>
  <div>
    <h2 class="mb10">Image 图片基本使用</h2>
    <Image src="https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg" />
    <h2 class="mt30 mb10">Image 多张图片预览 (src: images)</h2>
    <Image :src="images" />
    <h2 class="mt30 mb10">Image 预览文本设为preview (preview: preview)</h2>
    <Image src="https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg">
      <template #preview>
        <p class="u-pre">preview</p>
      </template>
    </Image>
    <h2 class="mt30 mb10">Image 更改缩放比率和最大最小缩放比例 (zoomRatio: 0.2 & minZoomScale: 0.5 & maxZoomScale: 2)</h2>
    <Image
      :zoomRatio="0.2"
      :minZoomScale="0.5"
      :maxZoomScale="2"
      src="https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg" />
    <h2 class="mt30 mb10">Ant Design Vue 图片</h2>
    <a-image
      class="border-box"
      :width="200"
      :height="200"
      src="https://ali.jinhui365.cn/group5/M00/00/73/CgAAcmEDZMWADliHAAf8CDmwJyU179.jpg"
    />
    <br/>
    <a-image-preview-group>
      <a-image :width="200" :src="images[0].src" />
      <a-image :width="200" :src="images[1].src" />
    </a-image-preview-group>
  </div>
</template>
<style lang="less" scoped>
.border-box {
  :deep(*) {
    box-sizing: border-box;
  }
}
.u-pre {
  display: inline-block;
  font-size: 16px;
}
</style>
