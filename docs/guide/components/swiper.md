# 触摸滑动插件 Swiper

<br/>

*旋转木马，一组轮播的区域*

## 何时使用

- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现
- 常用于一组图片或卡片轮播

## 参考文档

- [Swiper 官方](https://swiperjs.com/)
- [Swiper Vue](https://swiperjs.com/vue)
- [Swiper Demos](https://swiperjs.com/demos)

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
function onChange () {
  console.log('slider change')
}
</script>

## 基本使用

<Swiper :images="images" :height="420" @change="onChange" />

<details>
<summary>查看代码</summary>

```vue
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
function onChange () {
  console.log('slider change')
}
</script>
<template>
  <Swiper :images="images" :height="420" @change="onChange" />
</template>
```

</details>

## 走马灯

<Swiper
  :images="images"
  type="carousel"
  :height="180"
  :slides-per-view="3"
  :space-between="20"
  :speed="2500" />

<details>
<summary>查看代码</summary>

```vue
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
  <Swiper
    :images="images"
    type="carousel"
    :height="180"
    :slides-per-view="3"
    :space-between="20"
    :speed="2500" />
</template>
```

</details>
