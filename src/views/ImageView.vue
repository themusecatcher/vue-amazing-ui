<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
    <h2 class="mt30 mb10">多张图片预览</h2>
    <h3 class="mb10">可循环切换图片，并支持键盘 (left / right / up / down) 按键切换</h3>
    <Image :src="images" loop />
    <h2 class="mt30 mb10">禁用预览</h2>
    <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" disabled />
    <h2 class="mt30 mb10">自定义样式</h2>
    <h3 class="mb10">自定义宽高；同时图片覆盖容器；预览文本设为 preview</h3>
    <Image :src="images" :width="[100, 200, 100, 200, 100]" :space-props="{ width: 416 }" fit="cover" loop>
      <template #preview>
        <p class="preview-txt">preview</p>
      </template>
    </Image>
    <h2 class="mt30 mb10">自定义预览图片样式</h2>
    <Image :src="images" :preview-image-style="{ background: '#fff', padding: '12px', borderRadius: '8px' }" loop />
    <h2 class="mt30 mb10">自定义排列方式 & 加载中样式</h2>
    <Image
      :src="images"
      :space-props="{ width: 332, gap: 16 }"
      :spin-props="{ tip: 'loading', indicator: 'spin-line', color: '#fadb14' }"
      loop
    />
    <h2 class="mt30 mb10">无边框</h2>
    <Image :src="images" :bordered="false" fit="cover" loop />
    <h2 class="mt30 mb10">相册模式</h2>
    <Image :src="images" album loop />
    <h2 class="mt30 mb10">自定义预览配置</h2>
    <h3 class="mb10">更改缩放比率和最大最小缩放比例</h3>
    <Image
      :zoom-ratio="0.2"
      :min-zoom-scale="0.5"
      :max-zoom-scale="2"
      src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg"
    />
  </div>
</template>
<style lang="less" scoped>
.preview-txt {
  display: inline-block;
  font-size: 16px;
}
</style>
