# 走马灯 Carousel

## 何时使用

- 首页banner轮播展示
- 轮播新闻展示

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const imageData = ref<any[]>([])
function getImageUrl (name: any): string {
  return new URL(`../../public/images/${name}.jpg`, import.meta.url).href
}
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
  loadImages()
})
</script>

## 基本使用

<Carousel :imageData="imageData" :height="360" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const imageData = ref<any[]>([])
function getImageUrl (name: any): string {
  return new URL(`../../public/images/${name}.jpg`, import.meta.url).href
}
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
  loadImages()
})
</script>
<template>
  <Carousel :imageData="imageData" :height="360" />
</template>
```

</details>
