# 瀑布流 Waterfall

<br/>

*瀑布流展示图片列表*

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

## 基本使用

*默认使用JS计算方式进行布局展示*

<br/>

<Waterfall :images="images" />

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
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.1/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <Waterfall :images="images" />
</template>
```

:::

## CSS布局方式

<Waterfall :images="images" mode="CSS" />

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
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.1/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <Waterfall :images="images" mode="CSS" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
images | 图片数组 | Image[] | [] | true
columnCount | 要划分的列数 | number | 3 | false
columnGap | 各列之间的间隙，单位px | number | 20 | false
width | 瀑布流区域的总宽度 | string &#124; number | '100%' | false
backgroundColor | 瀑布流区域背景填充色 | string | '#F2F4F8' | false
mode | 瀑布流排列方式，可选：`JS` (js计算)、`CSS` (css布局) | string | 'JS' | false

## Image Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 图片名称 | string | false
src | 图片地址 | string | true

## 不同 mode 的区别

*mode: JS*

- 使用JS获取每张图片宽高，结合 `relative` 和 `absolute` 定位计算每个图片的位置 `top`，`left`，保证每张新的图片都追加在当前高度最小的那列末尾

*mode: CSS*

- 使用CSS的 `column-count` 和 `column-gap`，实现简单，但图片顺序是每列从上往下排列
