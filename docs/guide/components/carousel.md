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
const showArrow = ref(false)
const positionOptions = ref([
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const dotPosition = ref('top')
const effectOptions = ref([
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  }
])
const effect = ref('fade')
const triggerOptions = ref([
  {
    label: 'click',
    value: 'click'
  },
  {
    label: 'hover',
    value: 'hover'
  }
])
const trigger = ref('hover')
function clickImage(image: object) {
  console.log('image', image)
}
function onChange(index: number) {
  console.log('change', index)
}
</script>

## 基本使用

*支持导航切换，键盘上、下、左、右按键切换，点击指示点切换*

<br>

<Carousel :images="images" :height="450" @click="clickImage" />

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
  <Carousel :images="images" :height="450" @click="clickImage" />
</template>
```

:::

## 箭头

<Space align="center">
  showArrow: <Switch v-model:checked="showArrow" />
</Space>
<br />
<br />
<Carousel :images="images" :height="450" :show-arrow="showArrow" @click="clickImage" />

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
const showArrow = ref(false)
function clickImage (image: object) {
  console.log('image', image)
}
</script>
<template>
  <Space align="center">
    showArrow: <Switch v-model:checked="showArrow" />
  </Space>
  <br />
  <br />
  <Carousel :images="images" :height="450" :show-arrow="showArrow" @click="clickImage" />
</template>
```

:::

## 自动播放

<Carousel :images="images" :height="450" autoplay @change="onChange" @click="clickImage" />

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
function onChange(index: number) {
  console.log('change', index)
}
</script>
<template>
  <Carousel :images="images" :height="450" autoplay @change="onChange" @click="clickImage" />
</template>
```

:::

## 指示点位置

<Radio :options="positionOptions" v-model:value="dotPosition" button button-style="solid" />
<br/>
<br/>
<Carousel
  :images="images"
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
    label: 'top',
    value: 'top'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const dotPosition = ref('top')
</script>
<template>
  <Radio :options="positionOptions" v-model:value="dotPosition" button button-style="solid" />
  <br/>
  <br/>
  <Carousel
    :images="images"
    :height="450"
    :dotPosition="dotPosition" />
</template>
```

:::

## 垂直

<Carousel :images="images" :height="450" autoplay dotPosition="right" />

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
  <Carousel :images="images" :height="450" autoplay dotPosition="right" />
</template>
```

:::

## 移入暂停

<Carousel :images="images" :height="450" autoplay pause-on-mouse-enter dotPosition="right" />

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
  <Carousel :images="images" :height="450" autoplay pause-on-mouse-enter dotPosition="right" />
</template>
```

:::

## 过渡效果

<Radio :options="effectOptions" v-model:value="effect" button button-style="solid" />
<br />
<br />
<Carousel :images="images" :height="450" :effect="effect" :fade-duration="1500" />

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
const effectOptions = ref([
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  }
])
const effect = ref('fade')
</script>
<template>
  <Radio :options="effectOptions" v-model:value="effect" button button-style="solid" />
  <br />
  <br />
  <Carousel :images="images" :height="450" :effect="effect" :fade-duration="1500" />
</template>
```

:::

## 鼠标经过指示点切换轮播图

<Radio :options="triggerOptions" v-model:value="trigger" button button-style="solid" />
<br />
<br />
<Carousel :images="images" :height="450" :dots-trigger="trigger" />

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
const triggerOptions = ref([
  {
    label: 'click',
    value: 'click'
  },
  {
    label: 'hover',
    value: 'hover'
  }
])
const trigger = ref('hover')
</script>
<template>
  <Radio :options="triggerOptions" v-model:value="trigger" button button-style="solid" />
  <br />
  <br />
  <Carousel :images="images" :height="450" :dots-trigger="trigger" />
</template>
```

:::

## 自定义滑动动画

<Carousel
  :images="images"
  :height="450"
  :slide-duration="800"
  :slide-function="[0.45, 1, 0.55, 1]" />

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
    :height="450"
    :slide-duration="800"
    :slide-function="[0.45, 1, 0.55, 1]" />
</template>
```

:::

## 自定义样式

<Carousel
  :images="images"
  :height="450"
  arrow-color="#13C2C2"
  :arrow-size="48"
  dot-active-color="#13C2C2"
  :dot-style="{ backgroundColor: '#FFF' }"
  :dot-active-style="{ width: '25px', backgroundColor: 'gold' }"
  :spin-style="{ indicator: 'dot', color: '#13C2C2' }"
/>

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
    :height="450"
    arrow-color="#13C2C2"
    :arrow-size="48"
    dot-active-color="#13C2C2"
    :dot-style="{ backgroundColor: '#FFF' }"
    :dot-active-style="{ width: '25px', backgroundColor: 'gold' }"
    :spin-style="{ indicator: 'dot', color: '#13C2C2' }"
  />
</template>
```

:::

<!-- ## 自定义配置 -->

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
images | 走马灯图片数组 | [Image](#image-type)[] | [] | true
autoplay | 是否自动切换 | boolean | false | false
pauseOnMouseEnter | 当鼠标移入走马灯时，是否暂停自动轮播 | boolean | false | false
effect | 轮播图切换时的过渡效果 | 'slide' &#124; 'fade' | 'slide' | false
interval | 自动轮播间隔，单位`ms` | number | 3000 | false
width | 走马灯宽度 | number &#124; string | '100%' | false
height | 走马灯高度 | number &#124; string | '100vh' | false
showArrow | 是否显示箭头 | boolean | true | false
arrowColor | 箭头颜色 | string | '#FFF' | false
arrowSize | 箭头大小，单位`px` | number | 36 | false
dots | 是否显示指示点 | boolean | true | false
dotSize | 指示点大小，单位`px` | number | 10 | false
dotColor | 指示点颜色 | string | 'rgba(255, 255, 255, 0.3)' | false
dotActiveColor | 指示点选中颜色 | string | '#1677FF' | false
dotStyle | 指示点样式，优先级高于 `dotSize`、`dotColor` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} | false
dotActiveStyle | 指示点选中样式，优先级高于 `dotActiveColor` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} | false
dotPosition | 指示点位置，位置为 `left` &#124; `right` 时，`effect: 'slide'` 轮播自动变为垂直轮播 | 'bottom' &#124; 'top' &#124; 'left' &#124; 'right' | 'bottom' | false
dotsTrigger | 指示点触发切换的方式 | 'click' &#124; 'hover' | 'click' | false
spinStyle | 图片加载中样式 | [SpinProperties](#spinproperties-type) | {} | false
fadeDuration | 渐变动画持续时长，单位`ms`，仅当 `effect` 为 `'fade'` 时生效 | number | 500 | false
fadeFunction | 渐变动画函数，仅当 `effect` 为 `'fade'` 时生效，可参考 [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) | string | 'cubic-bezier(0.4, 0, 0.2, 1)' | false
slideDuration | 滑动动画持续时长，单位`ms`，仅当 `effect` 为 `'slide'` 时生效 | number | 800 | false
slideFunction | 滑动动画函数，，仅当 `effect` 为 `'slide'` 时生效，可参考 [`useTransition`](https://vueuse.org/core/useTransition/#usage) | number[] | [0.65, 0, 0.35, 1] | false

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
change | 切换时的图片索引，从 `1` 开始 | (index: number) => void
click | 点击图片时的回调 | (image: [Image](#image-type)) => void
