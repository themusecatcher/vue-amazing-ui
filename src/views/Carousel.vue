<script setup lang="ts">
import { ref } from 'vue'

const images = ref([
  {
    title: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    link: ''
  },
  {
    title: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    link: ''
  },
  {
    title: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    link: ''
  },
  {
    title: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    link: ''
  },
  {
    title: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    link: ''
  },
  {
    title: 'image-6',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg',
    link: ''
  },
  {
    title: 'image-7',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/7.jpg',
    link: ''
  },
  {
    title: 'image-8',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/8.jpg',
    link: ''
  },
  {
    title: 'image-9',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/9.jpg',
    link: ''
  }
])
const positionOptions = ref([
  {
    label: 'Top',
    value: 'top'
  },
  {
    label: 'Bottom',
    value: 'bottom'
  },
  {
    label: 'Left',
    value: 'left'
  },
  {
    label: 'Right',
    value: 'right'
  }
])
const dotPosition = ref('top')
function clickImage(image: object) {
  console.log('image', image)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">支持自动切换，导航切换，键盘上、下、左、右按键切换，点击指示点切换</h3>
    <Carousel :images="images" :width="800" :height="450" :autoplay="false" @click="clickImage" />
    <h2 class="mt30 mb10">指示点位置</h2>
    <Radio :options="positionOptions" v-model:value="dotPosition" button />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :dotPosition="dotPosition" />
    <h2 class="mt30 mb10">自定义滑动动画</h2>
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      :animation-duration="800"
      :animation-function="[0.45, 1, 0.55, 1]"
    />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      nav-color="#13C2C2"
      :nav-size="48"
      dot-active-color="#13C2C2"
      :dot-style="{ width: '24px', height: '5px', borderRadius: '5px', backgroundColor: '#FFF' }"
      :spin-style="{ indicator: 'dot', color: '#13C2C2' }"
    />
  </div>
</template>
