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
const positionOptions = ref([
  {
    label: 'Top',
    value: 'top'
  },
  {
    label: 'Bottom',
    value: 'bottom'
  },
  {
    label: 'Left',
    value: 'left'
  },
  {
    label: 'Right',
    value: 'right'
  }
])
const dotPosition = ref('top')
function clickImage (image: object) {
  console.log('image', image)
}
</script>

## 基本使用

*支持自动切换，导航切换，键盘上、下、左、右按键切换，点击指示点切换*

<br>

<Carousel :images="images" :height="420" @click="clickImage" />

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
function clickImage (image: object) {
  console.log('image', image)
}
</script>
<template>
  <Carousel :images="images" :height="420" @click="clickImage" />
</template>
```

:::

## 指示点位置

<Radio :options="positionOptions" v-model:value="dotPosition" />
<br/>
<br/>
<Carousel
  :images="images"
  :width="800"
  :height="450"
  :dotPosition="dotPosition" />

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
const positionOptions = ref([
  {
    label: 'Top',
    value: 'top'
  },
  {
    label: 'Bottom',
    value: 'bottom'
  },
  {
    label: 'Left',
    value: 'left'
  },
  {
    label: 'Right',
    value: 'right'
  }
])
const dotPosition = ref('top')
</script>
<template>
  <Radio :options="positionOptions" v-model:value="dotPosition" />
  <br/>
  <br/>
  <Carousel
    :images="images"
    :width="800"
    :height="450"
    :dotPosition="dotPosition" />
</template>
```

:::

## 自定义滑动动画

<Carousel
  :images="images"
  :width="800"
  :height="450"
  :animation-duration="800"
  :animation-function="[0.45, 1, 0.55, 1]" />

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
    :width="800"
    :height="450"
    :animation-duration="800"
    :animation-function="[0.45, 1, 0.55, 1]" />
</template>
```

:::

## 自定义样式

<Carousel
  :images="images"
  :height="420"
  nav-color="#13C2C2"
  :nav-size="48"
  dot-active-color="#13C2C2"
  :dot-style="{ width: '24px', height: '5px', borderRadius: '5px', backgroundColor: '#FFF' }"
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
    dot-active-color="#13C2C2"
    :dot-style="{ width: '24px', height: '5px', borderRadius: '5px', backgroundColor: '#FFF' }"
    :spin-style="{ indicator: 'dot', color: '#13C2C2' }" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
images | 走马灯图片数组 | [Image](#image-type)[] | [] | true
autoplay | 是否自动切换 | boolean | true | false
interval | 自动滑动轮播间隔，单位`ms` | number | 3000 | false
width | 走马灯宽度 | number &#124; string | '100%' | false
height | 走马灯高度 | number &#124; string | '100vh' | false
navigation | 是否显示导航 | boolean | true | false
navColor | 导航颜色 | string | '#FFF' | false
navSize | 导航大小，单位`px` | number | 36 | false
dots | 是否显示指示点 | boolean | true | false
dotActiveColor | 指示点选中颜色 | string | '#1677FF' | false
dotSize | 指示点大小，单位`px` | number | 10 | false
dotStyle | 指示点样式，优先级高于 `pageSize` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} | false
spinStyle | 加载样式配置 | [SpinProperties](#spinproperties-type) | {} | false
dotPosition | 指示点位置 | 'bottom' &#124; 'top' &#124; 'left' &#124; 'right' | 'bottom' | false
animationDuration | 滑动动画持续时长，单位`ms` | number | 1000 | false
animationFunction | 滑动动画函数，参考 [`useTransition`](https://vueuse.org/core/useTransition/#usage) | number[] | [0.65, 0, 0.35, 1] | false

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
indicator | 加载指示符 | 'dot' &#124; 'quarter-circle' &#124; 'half-circle' &#124; 'three-quarters-circle' &#124; 'dynamic-circle' | false
color | 主题颜色 | string | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
click | 点击图片时的回调 | (image: [Image](#image-type)) => void
