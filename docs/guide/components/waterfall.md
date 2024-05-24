# 瀑布流 Waterfall

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*瀑布流展示图片列表*

::: tip 说明
宽度固定，图片等比例缩放；使用JS获取每张图片宽度和高度，结合 `relative` 和 `absolute` 定位计算每个图片的位置 `top`，`left`，保证每张新的图片都追加在当前高度最小的那列末尾
:::

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

## 基本使用

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
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${i}.jpg`
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

## 自定义展示

<Waterfall :images="images" :column-count="4" :column-gap="10" background-color="#e1faeb" :border-radius="6" />

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
  <Waterfall :images="images" :column-count="4" :column-gap="10" background-color="#e1faeb" :border-radius="6" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
images | 图片数组 | [Image](#image-type)[] | [] | true
columnCount | 要划分的列数 | number | 3 | false
columnGap | 各列之间的间隙，单位`px` | number | 20 | false
width | 瀑布流区域的总宽度 | string &#124; number | '100%' | false
borderRadius | 瀑布流区域和图片圆角，单位`px` | number | 8 | false
backgroundColor | 瀑布流区域背景填充色 | string | '#F2F4F8' | false

## Image Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 图片名称 | string | false
src | 图片地址 | string | true
