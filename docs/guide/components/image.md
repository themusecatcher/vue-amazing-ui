# 图片 Image

<GlobalElement />

*可预览的图片*

## 何时使用

- 需要展示图片和预览时
- 加载图片时显示 `loading`

<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>

## 基本使用

<Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />

::: details Show Code

```vue
<template>
  <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
</template>
```

:::

## 多张图片预览

*可循环切换图片，并支持键盘 (`left` / `right` / `up` / `down`) 按键切换*

<br/>

<Image :src="images" loop />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" loop />
</template>
```

:::

## 自定义样式

*自定义宽高；同时图片覆盖容器；预览文本设为 `preview`*

<br/>

<Image
  :src="images"
  :width="[100, 200, 100, 200, 100]"
  :space-props="{ width: 416 }"
  fit="cover"
  loop
>
  <template #preview>
    <p class="u-pre">preview</p>
  </template>
</Image>

<style lang="less" scoped>
.u-pre {
  display: inline-block;
  font-size: 16px;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image
    :src="images"
    :width="[100, 200, 100, 200, 100]"
    :space-props="{ width: 416 }"
    fit="cover"
    loop
  >
    <template #preview>
      <p class="u-pre">preview</p>
    </template>
  </Image>
</template>
<style lang="less" scoped>
.u-pre {
  display: inline-block;
  font-size: 16px;
}
</style>
```

:::

## 自定义排列方式 & 加载中样式

<Image
  :src="images"
  :space-props="{ width: 632, gap: 16 }"
  :spin-props="{ tip: 'loading', indicator: 'spin-line', color: '#fadb14' }"
  loop
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image
    :src="images"
    :space-props="{ width: 632, gap: 16 }"
    :spin-props="{ tip: 'loading', indicator: 'spin-line', color: '#fadb14' }"
    loop
  />
</template>
```

:::

## 无边框

<Image :src="images" :bordered="false" fit="cover" loop />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" :bordered="false" fit="cover" loop />
</template>
```

:::

## 相册模式

<Image :src="images" album loop />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    name: 'image-1.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    name: 'image-2.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    name: 'image-3.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    name: 'image-4.jpg'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    name: 'image-5.jpg'
  }
])
</script>
<template>
  <Image :src="images" album loop />
</template>
```

:::

## 自定义预览配置

*更改缩放比率和最大最小缩放比例*

<br/>

<Image
  :zoom-ratio="0.2"
  :min-zoom-scale="0.5"
  :max-zoom-scale="2"
  src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />

::: details Show Code

```vue
<template>
  <Image
    :zoom-ratio="0.2"
    :min-zoom-scale="0.5"
    :max-zoom-scale="2"
    src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
</template>
```

:::

## APIs

### Image

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
src | 图像地址或图像地址数组 | string &#124; [Image](#image-type)[] | undefined
name | 图像名称，没有传入图片名时自动从图像地址 `src` 中读取 | string | undefined
width | 图像宽度，单位 `px` | string &#124; number &#124; (string &#124; number)[] | 100
height | 图像高度，单位 `px` | string &#124; number &#124; (string &#124; number)[] | 100
bordered | 是否显示边框 | boolean | true
fit | 图片在容器内的的适应类型，参考 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) | 'contain' &#124; 'fill' &#124; 'cover' &#124; 'none' &#124; 'scale-down' | 'contain'
preview | 预览文本 | string &#124; slot | '预览'
spaceProps | `Space` 组件属性配置，参考 [Space Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/space.html#space)，用于配置多张展示图片时的排列方式 | object | {}
spinProps | `Spin` 组件属性配置，参考 [Spin Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin)，用于配置图片加载中样式 | object | {}
zoomRatio | 每次缩放比率 | number | 0.1
minZoomScale | 最小缩放比例 | number | 0.1
maxZoomScale | 最大缩放比例 | number | 10
resetOnDbclick | 缩放移动旋转图片后，是否可以双击还原 | boolean | true
loop | 是否可以循环切换图片 | boolean | false
album | 是否相册模式，即从一张展示图片点开相册 | boolean | false

### Image Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
src | 图像地址 | string | undefined
name? | 图像名称 | string | undefined

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
preview | 自定义预览文本 | v-slot:preview

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
preview | 预览索引为 `index` 的图片，从 `0` 开始 | (index: number) => void
