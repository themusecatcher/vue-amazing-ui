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

<Carousel :images="images" :height="420" />

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
  <Carousel :images="images" :height="420" />
</template>
```

:::

## 自定义样式

<Carousel
  :images="images"
  :height="420"
  nav-color="#13C2C2"
  :nav-size="48"
  page-active-color="#13C2C2"
  :page-style="{ width: '24px', height: '5px', borderRadius: '5px', backgroundColor: '#FFF' }"
  :spin-style="{ indicator: 'dot', color: '#13C2C2' }" />

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
    :height="420"
    nav-color="#13C2C2"
    :nav-size="48"
    page-active-color="#13C2C2"
    :page-style="{ width: '24px', height: '5px', borderRadius: '5px', backgroundColor: '#FFF' }"
    :spin-style="{ indicator: 'dot', color: '#13C2C2' }" />
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
spinStyle | 加载样式配置 | [SpinProperties](#spinproperties-type) | {} | false
animationDuration | 滑动动画持续时长，单位`ms` | number | 1000 | false
animationFunction | 滑动动画函数，参考 [`<easing-function>`](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#easing_functions) | number[] | [0.65, 0, 0.35, 1] | false

## Image Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 图片名称 | string | false
src | 图片地址 | string | true
link | 图片跳转链接 | string | false

## SpinProperties Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
size | 尺寸大小 | 'small' &#124; 'default' &#124; 'large' | false
tip | 描述文案 | string | false
indicator | 加载指示符 | 'dot' &#124; 'quarter-circle' &#124; 'three-quarters-circle' &#124; 'dynamic-circle' | false
color | 主题颜色 | string | false
