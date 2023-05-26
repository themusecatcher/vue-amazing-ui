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
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>

## 基本使用

<Image :width="400" :height="300" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg" />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Image :width="400" :height="300" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg" />
</template>
```

</details>

## 多张图片预览

*可循环切换图片，并支持键盘 (left / right / up / down) 按键切换*

<br/>

<Image :width="400" :height="300" :src="images" loop />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :width="400" :height="300" :src="images" loop />
</template>
```

</details>

## 自定义样式

*预览文本设为 preview，同时图片覆盖容器*

<br/>

<Image :width="400" :height="300" fit="cover" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg">
  <template #preview>
    <p class="u-pre">preview</p>
  </template>
</Image>

<details>
<summary>查看代码</summary>

```vue
<template>
  <Image :width="400" :height="300" fit="cover" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg">
    <template #preview>
      <p class="u-pre">preview</p>
    </template>
  </Image>
</template>
```

</details>

## 自定义预览配置

*更改缩放比率和最大最小缩放比例*

<br/>

<Image
  :width="400"
  :height="300"
  :zoom-ratio="0.2"
  :min-zoom-scale="0.5"
  :max-zoom-scale="2"
  src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.1/1.jpg" />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Image
    :width="400"
    :height="300"
    :zoom-ratio="0.2"
    :min-zoom-scale="0.5"
    :max-zoom-scale="2"
    src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg" />
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
