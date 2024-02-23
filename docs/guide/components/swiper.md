# 触摸滑动插件 Swiper<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">{{ pkg.dependencies.swiper }}</Tag>

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*旋转木马，一组轮播的区域*

## 何时使用

- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现
- 常用于一组图片或卡片轮播

## 参考文档

- [Swiper 官方](https://swiperjs.com/)
- [Swiper API](https://swiperjs.com/swiper-api)
- [Swiper Vue](https://swiperjs.com/vue)
- [Swiper Demos](https://swiperjs.com/demos)

<script setup lang="ts">
import { ref, shallowReactive, onBeforeMount } from 'vue'
import pkg from '../../../package.json'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
function onChange () {
  console.log('slider change')
}
const navigation = shallowReactive<{[key: string]: any}>({})
function onSwiper (swiper: any) {
  navigation.prevEl = swiper.navigation.prevEl
  navigation.prevEl.style.display = 'none'
  navigation.nextEl = swiper.navigation.nextEl
  navigation.nextEl.style.display = 'none'
}
function onPrev () {
  navigation.prevEl.click()
}
function onNext () {
  navigation.nextEl.click()
}
</script>

## 基本使用

*首页banner*

<br/>

<Swiper :images="images" :height="420" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`
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

:::

## 走马灯

<Swiper
  :images="images"
  type="carousel"
  :height="180"
  :slides-per-view="3"
  :space-between="20"
  :speed="2500" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`
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

:::

## 信息展播

<Space>
  <Button @click="onPrev">Prev</Button>
  <Button @click="onNext">Next</Button>
</Space>
<br/>
<br/>
<Swiper
  :images="images"
  type="broadcast"
  :pagination="{
    dynamicBullets: true,
    clickable: true
  }"
  :height="200"
  :slides-per-view="3"
  :space-between="30"
  loop
  mousewheel
  @swiper="onSwiper" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, shallowReactive, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
const navigation = shallowReactive<{[key: string]: any}>({})
function onSwiper (swiper: any) {
  navigation.prevEl = swiper.navigation.prevEl
  navigation.prevEl.style.display = 'none'
  navigation.nextEl = swiper.navigation.nextEl
  navigation.nextEl.style.display = 'none'
}
function onPrev () {
  navigation.prevEl.click()
}
function onNext () {
  navigation.nextEl.click()
}
</script>
<template>
  <Space>
    <Button @click="onPrev">Prev</Button>
    <Button @click="onNext">Next</Button>
  </Space>
  <br/>
  <br/>
  <Swiper
    :images="images"
    type="broadcast"
    :pagination="{
      dynamicBullets: true,
      clickable: true
    }"
    :height="200"
    :slides-per-view="3"
    :space-between="30"
    loop
    mousewheel
    @swiper="onSwiper" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
images | 轮播图片数组 | Image[] | [] | true
width | 图片宽度 | number &#124; string | '100%' | false
height | 图片高度 | number &#124; string  | '100vh' | false
type | `banner`: 轮播图模式；`carousel`: 走马灯模式；`broadcast`: 信息展播模式 | 'banner' &#124; 'carousel' &#124; 'broadcast' | 'banner' | false
navigation | 是否显示导航 | boolean | true | false
delay | 自动切换的时间间隔（`type: banner`时生效），单位`ms` | number | 3000 | false
swipe | 是否可以鼠标拖动 | boolean | true | false
preloaderColor | 预加载时的 `loading` 颜色 | 'theme' &#124; 'white' &#124; 'black' | 'theme' | false

## Image Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 图片名称 | string | true
link | 图片跳转链接 | string | false
src | 图像地址 | string | true

## Events

事件名称 | 说明 | 参数
-- | -- | --
swiper | `Swiper`初始化后的回调 | (swiper: any) => void
change | 轮播图片变化时的回调 | () => void
