# 图片 Image

<br/>

*可预览的图片*

## 何时使用

- 需要展示图片时
- 加载图片时显示 loading

<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>

## 基本使用

<Image :width="400" :height="300" src="https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg" />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Image :width="400" :height="300" src="https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg" />
</template>
```

</details>

## 多张图片预览，支持键盘 (left / right / up / down) 按键切换

<Image :width="400" :height="300" :src="images" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :width="400" :height="300" :src="images" />
</template>
```

</details>

## 多张图片预览，循环切换图片

<Image :width="400" :height="300" loop :src="images" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :width="400" :height="300" loop :src="images" />
</template>
```

</details>

## 预览文本设为 preview 同时图片覆盖容器

<Image :width="400" :height="300" fit="cover" src="https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg">
  <template #preview>
    <p class="u-pre">preview</p>
  </template>
</Image>

<details>
<summary>查看代码</summary>

```vue
<template>
  <Image :width="400" :height="300" fit="cover" src="https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg">
    <template #preview>
      <p class="u-pre">preview</p>
    </template>
  </Image>
</template>
```

</details>

## 更改缩放比率和最大最小缩放比例

<Image
  :width="400"
  :height="300"
  :zoomRatio="0.2"
  :minZoomScale="0.5"
  :maxZoomScale="2"
  src="https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg" />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Image
  :width="400"
  :height="300"
  :zoomRatio="0.2"
  :minZoomScale="0.5"
  :maxZoomScale="2"
  src="https://cdn.jsdelivr.net/gh/themusecatcher/images@0.0.1/1.jpg" />
</template>
```

</details>
