# 轮播图 Carousel

<GlobalElement />

*一组轮播的区域*

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用轮播图的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
const showArrow = ref<boolean>(false)
const positionOptions = [
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
]
const dotPosition = ref<CarouselProps['dotPosition']>('top')
const effectOptions = [
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  }
]
const effect = ref<CarouselProps['effect']>('fade')
const triggerOptions = [
  {
    label: 'click',
    value: 'click'
  },
  {
    label: 'hover',
    value: 'hover'
  }
]
const dotsTrigger = ref<CarouselProps['dotsTrigger']>('hover')
function clickImage(image: CarouselImage) {
  console.log('image', image)
}
function onChange(index: number) {
  console.log('change', index)
}
const carousel = ref()
const toIndex = ref(1)
const currentIndex = ref(1)
function getCurrentIndex() {
  currentIndex.value = carousel.value.getCurrentIndex()
}
const state = reactive<CarouselProps>({
  autoplay: true,
  pauseOnMouseEnter: false,
  effect: 'slide',
  interval: 3000,
  showArrow: true,
  arrowColor: '#FFF',
  arrowSize: 36,
  dots: true,
  dotSize: 10,
  dotColor: 'rgba(255, 255, 255, 0.3)',
  dotActiveColor: '#1677FF',
  dotPosition: 'bottom',
  dotsTrigger: 'click',
  fadeDuration: 500,
  fadeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
})
</script>

## 基本使用

*当焦点在 `Arrow` 或 `Dots` 上时，可以通过键盘上、下、左、右按键切换*

<br>

<Carousel :images="images" :height="450" @click="clickImage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
function clickImage (image: CarouselImage) {
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
  showArrow: <Switch v-model="showArrow" />
</Space>
<br />
<br />
<Carousel :images="images" :height="450" :show-arrow="showArrow" @click="clickImage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
const showArrow = ref<boolean>(false)
function clickImage (image: CarouselImage) {
  console.log('image', image)
}
</script>
<template>
  <Space align="center">
    showArrow: <Switch v-model="showArrow" />
  </Space>
  <br />
  <br />
  <Carousel :images="images" :height="450" :show-arrow="showArrow" @click="clickImage" />
</template>
```

:::

## 自动轮播

<Carousel :images="images" :height="450" autoplay @change="onChange" @click="clickImage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
function clickImage (image: CarouselImage) {
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
<Carousel :images="images" :height="450" :dotPosition="dotPosition" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
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
const dotPosition = ref<CarouselProps['dotPosition']>('top')
</script>
<template>
  <Radio :options="positionOptions" v-model:value="dotPosition" button button-style="solid" />
  <br/>
  <br/>
  <Carousel :images="images" :height="450" :dotPosition="dotPosition" />
</template>
```

:::

## 垂直

<Carousel :images="images" :height="450" autoplay dotPosition="right" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
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
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
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
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
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
const effect = ref<CarouselProps['effect']>('fade')
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

<Radio :options="triggerOptions" v-model:value="dotsTrigger" button button-style="solid" />
<br />
<br />
<Carousel :images="images" :height="450" :dots-trigger="dotsTrigger" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
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
const dotsTrigger = ref<CarouselProps['dotsTrigger']>('hover')
</script>
<template>
  <Radio :options="triggerOptions" v-model:value="dotsTrigger" button button-style="solid" />
  <br />
  <br />
  <Carousel :images="images" :height="450" :dots-trigger="dotsTrigger" />
</template>
```

:::

## 自定义滑动动画

<Carousel
  :images="images"
  :height="450"
  :slide-duration="800"
  :slide-function="[0.45, 1, 0.55, 1]"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
</script>
<template>
  <Carousel
    :images="images"
    :height="450"
    :slide-duration="800"
    :slide-function="[0.45, 1, 0.55, 1]"
  />
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
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
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

## 使用 Methods

<Space>
  <InputNumber :min="1" :max="images.length" v-model:value="toIndex" />
  <Button @click="carousel.to(toIndex)">跳转到</Button>
  <Button @click="carousel.prev()">前一页</Button>
  <Button @click="carousel.next()">后一页</Button>
  <Button @click="getCurrentIndex">获取当前页：{{ currentIndex }}</Button>
</Space>
<br />
<br />
<Carousel ref="carousel" :images="images" :height="450" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
const carousel = ref()
const toIndex = ref(1)
const currentIndex = ref(1)
function getCurrentIndex () {
  currentIndex.value = carousel.value.getCurrentIndex()
}
</script>
<template>
  <Space>
    <InputNumber :min="1" :max="images.length" v-model:value="toIndex" />
    <Button @click="carousel.to(toIndex)">跳转到</Button>
    <Button @click="carousel.prev()">前一页</Button>
    <Button @click="carousel.next()">后一页</Button>
    <Button @click="getCurrentIndex">获取当前页：{{ currentIndex }}</Button>
  </Space>
  <br />
  <br />
  <Carousel ref="carousel" :images="images" :height="450" />
</template>
```

:::

## 轮播图配置器

<Flex gap="large" vertical>
  <Row :gutter="[24, 12]">
    <Col :span="6">
      <Space gap="small" vertical> autoplay：<Switch v-model="state.autoplay" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> pauseOnMouseEnter：<Switch v-model="state.pauseOnMouseEnter" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        effect：<Radio :options="effectOptions" v-model:value="state.effect" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        interval：<Slider v-model:value="state.interval" :min="100" :step="10" :max="10000" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> showArrow：<Switch v-model="state.showArrow" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        arrowColor：<ColorPicker v-model:value="state.arrowColor" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical> arrowSize：<Slider v-model:value="state.arrowSize" :min="1" /> </Flex>
    </Col>
    <Col :span="6"></Col>
    <Col :span="6">
      <Space gap="small" vertical> dots：<Switch v-model="state.dots" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotSize：<Slider v-model:value="state.dotSize" :min="4" :max="64" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotColor：<ColorPicker v-model:value="state.dotColor" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotActiveColor：<ColorPicker v-model:value="state.dotActiveColor" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotPosition：
        <Select :options="positionOptions" v-model="state.dotPosition" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        dotsTrigger：
        <Radio :options="triggerOptions" v-model:value="state.dotsTrigger" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        fadeDuration：<Slider v-model:value="state.fadeDuration" :min="100" :step="10" :max="10000" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        fadeFunction：<Input v-model:value="state.fadeFunction" placeholder="fadeFunction" />
      </Flex>
    </Col>
  </Row>
  <Carousel
    :images="images"
    :height="450"
    :spin-style="{ indicator: 'dot', color: '#13C2C2' }"
    v-bind="state"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
const state = reactive<CarouselProps>({
  autoplay: true,
  pauseOnMouseEnter: false,
  effect: 'slide',
  interval: 3000,
  showArrow: true,
  arrowColor: '#FFF',
  arrowSize: 36,
  dots: true,
  dotSize: 10,
  dotColor: 'rgba(255, 255, 255, 0.3)',
  dotActiveColor: '#1677FF',
  dotPosition: 'bottom',
  dotsTrigger: 'click',
  fadeDuration: 500,
  fadeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
})
</script>
<template>
  <Flex gap="large" vertical>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Space gap="small" vertical> autoplay：<Switch v-model="state.autoplay" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> pauseOnMouseEnter：<Switch v-model="state.pauseOnMouseEnter" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          effect：<Radio :options="effectOptions" v-model:value="state.effect" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          interval：<Slider v-model:value="state.interval" :min="100" :step="10" :max="10000" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> showArrow：<Switch v-model="state.showArrow" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          arrowColor：<ColorPicker v-model:value="state.arrowColor" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> arrowSize：<Slider v-model:value="state.arrowSize" :min="1" /> </Flex>
      </Col>
      <Col :span="6"></Col>
      <Col :span="6">
        <Space gap="small" vertical> dots：<Switch v-model="state.dots" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotSize：<Slider v-model:value="state.dotSize" :min="4" :max="64" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotColor：<ColorPicker v-model:value="state.dotColor" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotActiveColor：<ColorPicker v-model:value="state.dotActiveColor" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotPosition：
          <Select :options="positionOptions" v-model="state.dotPosition" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          dotsTrigger：
          <Radio :options="triggerOptions" v-model:value="state.dotsTrigger" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          fadeDuration：<Slider v-model:value="state.fadeDuration" :min="100" :step="10" :max="10000" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          fadeFunction：<Input v-model:value="state.fadeFunction" placeholder="fadeFunction" />
        </Flex>
      </Col>
    </Row>
    <Carousel
      :images="images"
      :height="450"
      :spin-style="{ indicator: 'dot', color: '#13C2C2' }"
      v-bind="state"
    />
  </Flex>
</template>
```

:::

## APIs

### Carousel

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
images | 轮播图图片数组 | [Image](#image-type)[] | []
width | 轮播图宽度，单位 `px` | number &#124; string | '100%'
height | 轮播图高度，单位 `px` | number &#124; string | '100vh'
autoplay | 是否自动轮播 | boolean | false
pauseOnMouseEnter | 当鼠标移入轮播图时，是否暂停自动轮播 | boolean | false
effect | 轮播图切换时的过渡效果 | 'slide' &#124; 'fade' | 'slide'
interval | 自动轮播间隔，单位 `ms` | number | 3000
showArrow | 是否显示箭头 | boolean | true
arrowColor | 箭头颜色 | string | '#FFF'
arrowSize | 箭头大小，单位 `px` | number | 36
dots | 是否显示指示点 | boolean | true
dotSize | 指示点大小，单位 `px` | number | 10
dotColor | 指示点颜色 | string | 'rgba(255, 255, 255, 0.3)'
dotActiveColor | 指示点选中颜色 | string | undefined
dotStyle | 指示点样式，优先级高于 `dotSize`、`dotColor` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
dotActiveStyle | 指示点选中样式，优先级高于 `dotActiveColor` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
dotPosition | 指示点位置，位置为 `left` &#124; `right` 时，`effect: 'slide'` 轮播自动变为垂直轮播 | 'bottom' &#124; 'top' &#124; 'left' &#124; 'right' | 'bottom'
dotsTrigger | 指示点触发切换的方式 | 'click' &#124; 'hover' | 'click'
spinProps | 图片加载中样式，`Spin` 组件属性配置，参考 [Spin Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin) | object | {}
fadeDuration | 渐变动画持续时长，单位 `ms`，仅当 `effect` 为 `'fade'` 时生效 | number | 500
fadeFunction | 渐变动画函数，仅当 `effect` 为 `'fade'` 时生效，可参考 [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) | string | 'cubic-bezier(0.4, 0, 0.2, 1)'
slideDuration | 滑动动画持续时长，单位 `ms`，仅当 `effect` 为 `'slide'` 时生效 | number | 800
slideFunction | 滑动动画函数，，仅当 `effect` 为 `'slide'` 时生效，可参考 [`useTransition`](https://vueuse.org/core/useTransition/#usage) | number[] | [0.65, 0, 0.35, 1]

### Image Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
name? | 图片名称 | string | undefined
src | 图片地址 | string | undefined
link? | 图片跳转链接 | string | undefined
target? | 如何打开跳转链接 | '_self' &#124; '_blank' | undefined

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
to | 切换至某一页，从 `1` 开始 | (n: number) => void
prev | 切换至前一页 | () => void
next | 切换至后一页 | () => void
getCurrentIndex | 获取当前页，从 `1` 开始 | () => number

## Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 切换时的图片索引，从 `1` 开始 | (index: number) => void
click | 点击图片时的回调 | (image: [Image](#image-type)) => void
