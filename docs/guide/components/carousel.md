# 走马灯 Carousel

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 何时使用

- 首页banner轮播展示
- 轮播新闻展示

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
  }
])
</script>

## 基本使用

*支持自动切换，导航切换，键盘上、下、左、右按键切换，分页切换*

<br>

<Carousel :images="images" :height="480" />

::: details Show Code

```vue
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
  }
])
</script>
<template>
  <Carousel :images="images" :height="480" />
</template>
```

:::

## 自定义导航、分页样式

<Carousel
  :images="images"
  :height="480"
  nav-color="#13C2C2"
  :nav-size="48"
  page-active-color="#13C2C2"
  :page-style="{ width: '24px', height: '5px', borderRadius: '5px', backgroundColor: '#FFF' }" />

::: details Show Code

```vue
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
  }
])
</script>
<template>
  <Carousel
    :images="images"
    :height="480"
    nav-color="#13C2C2"
    :nav-size="48"
    page-active-color="#13C2C2"
    :page-style="{ width: '24px', height: '5px', borderRadius: '5px', backgroundColor: '#FFF' }" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
images | 走马灯图片数组 | [Image](#image-type)[] | [] | true
interval | 自动滑动轮播间隔，单位`ms` | number | 3000 | false
width | 走马灯宽度 | number &#124; string | '100%' | false
height | 走马灯高度 | number &#124; string | '100vh' | false
navigation | 是否显示导航 | boolean | true | false
navColor | 导航颜色 | string | '#FFF' | false
navSize | 导航大小，单位`px` | number | 36 | false
pagination | 是否显示分页 | boolean | true | false
pageActiveColor | 分页选中颜色 | string | '#1677FF' | false
pageSize | 分页大小，单位`px` | number | 10 | false
pageStyle | 分页样式，优先级高于 `pageSize` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} | false
disableOnInteraction | 用户操作导航或分页之后，是否禁止自动切换 | boolean | true | false
pauseOnMouseEnter | 鼠标悬浮时暂停自动切换，鼠标离开时恢复自动切换 | boolean | true | false
move | 滑动动画移动参数，数值越小，滑动动画越快 | number | 24 | false

## Image Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 图片名称 | string | false
src | 图片地址 | string | true
link | 图片跳转链接 | string | false
