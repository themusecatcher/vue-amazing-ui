# 触摸滑动插件 Swiper<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">{{ pkg.dependencies.swiper }}</Tag>

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 何时使用

- 创建触摸滑块和可滑动内容的区域

## 参考文档

- [Swiper 官方](https://swiperjs.com/)
- [Swiper API](https://swiperjs.com/swiper-api)
- [Swiper Vue](https://swiperjs.com/vue)
- [Swiper Demos](https://swiperjs.com/demos)

<script setup lang="ts">
import { ref, shallowReactive, onBeforeMount } from 'vue'
import pkg from '../../../package.json'

const images = ref<any[]>([])
function loadImages() {
  for (let i = 1; i <= 6; i++) {
    images.value.push({
      title: `image-${i}`,
      link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
function onChange(swiper: any) {
  console.log('slider change', swiper)
}
const effects = ['slide', 'fade', 'cube', 'flip', 'coverflow', 'cards']
const creativeEffects = [
  {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    }
  },
  {
    prev: {
      shadow: true,
      translate: ['-120%', 0, -500],
    },
    next: {
      shadow: true,
      translate: ['120%', 0, -500],
    }
  },
  {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    }
  },
  {
    prev: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [180, 0, 0],
    },
    next: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [-180, 0, 0],
    }
  },
  {
    prev: {
      shadow: true,
      translate: ['-125%', 0, -800],
      rotate: [0, 0, -90],
    },
    next: {
      shadow: true,
      translate: ['125%', 0, -800],
      rotate: [0, 0, 90],
    }
  },
  {
    prev: {
      shadow: true,
      origin: 'left center',
      translate: ['-5%', 0, -200],
      rotate: [0, 100, 0],
    },
    next: {
      origin: 'right center',
      translate: ['5%', 0, -200],
      rotate: [0, -100, 0],
    }
  }
]
const navigation = shallowReactive<{ [key: string]: any }>({})
function onBroadcastSwiper(swiper: any) {
  console.log('carousel', swiper)
  navigation.prevEl = swiper.navigation.prevEl
  navigation.prevEl.style.display = 'none'
  navigation.nextEl = swiper.navigation.nextEl
  navigation.nextEl.style.display = 'none'
}
function onPrev() {
  navigation.prevEl.click()
}
function onNext() {
  navigation.nextEl.click()
}
</script>

## 基本使用

<Swiper
  :images="images"
  :height="480"
  :pagination="{
    dynamicBullets: true,
    clickable: true
  }"
  @change="onChange"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 6; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
function onChange (swiper: any) {
  console.log('slider change', swiper)
}
</script>
<template>
  <Swiper
    :images="images"
    :height="480"
    :pagination="{
      dynamicBullets: true,
      clickable: true
    }"
    @change="onChange"
  />
</template>
```

:::

## 各种切换动画

<Flex :gap="36" wrap="wrap">
  <Badge style="width: 30%" :value="effect" color="volcano" v-for="(effect, index) in effects" :key="index">
    <Swiper
      style="display: inline-block"
      :images="images"
      :height="160"
      :pagination="{
        dynamicBullets: true,
        clickable: true
      }"
      :effect="effect"
    />
  </Badge>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages() {
  for (let i = 1; i <= 6; i++) {
    images.value.push({
      title: `image-${i}`,
      link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
const effects = ['slide', 'fade', 'cube', 'flip', 'coverflow', 'cards']
</script>
<template>
  <Flex :gap="36" wrap="wrap">
    <Badge style="width: 30%" :value="effect" color="volcano" v-for="(effect, index) in effects" :key="index">
      <Swiper
        style="display: inline-block"
        :images="images"
        :height="160"
        :pagination="{
          dynamicBullets: true,
          clickable: true
        }"
        :effect="effect"
      />
    </Badge>
  </Flex>
</template>
```

:::

## 自定义切换动画

<Flex :gap="36" wrap="wrap">
  <Badge
    style="width: 30%"
    value="creative"
    color="cyan"
    v-for="(creativeEffect, index) in creativeEffects"
    :key="index"
  >
    <Swiper
      style="display: inline-block"
      :images="images"
      :height="160"
      :pagination="{
        dynamicBullets: true,
        clickable: true
      }"
      effect="creative"
      :creativeEffect="creativeEffect"
    />
  </Badge>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages() {
  for (let i = 1; i <= 6; i++) {
    images.value.push({
      title: `image-${i}`,
      link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
const creativeEffects = [
  {
    prev: {
      shadow: true,
      translate: [0, 0, -400]
    },
    next: {
      translate: ['100%', 0, 0]
    }
  },
  {
    prev: {
      shadow: true,
      translate: ['-120%', 0, -500]
    },
    next: {
      shadow: true,
      translate: ['120%', 0, -500]
    }
  },
  {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1]
    },
    next: {
      translate: ['100%', 0, 0]
    }
  },
  {
    prev: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [180, 0, 0]
    },
    next: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [-180, 0, 0]
    }
  },
  {
    prev: {
      shadow: true,
      translate: ['-125%', 0, -800],
      rotate: [0, 0, -90]
    },
    next: {
      shadow: true,
      translate: ['125%', 0, -800],
      rotate: [0, 0, 90]
    }
  },
  {
    prev: {
      shadow: true,
      origin: 'left center',
      translate: ['-5%', 0, -200],
      rotate: [0, 100, 0]
    },
    next: {
      origin: 'right center',
      translate: ['5%', 0, -200],
      rotate: [0, -100, 0]
    }
  }
]
</script>
<template>
  <Flex :gap="36" wrap="wrap">
    <Badge
      style="width: 30%"
      value="creative"
      color="cyan"
      v-for="(creativeEffect, index) in creativeEffects"
      :key="index"
    >
      <Swiper
        style="display: inline-block"
        :images="images"
        :height="160"
        :pagination="{
          dynamicBullets: true,
          clickable: true
        }"
        effect="creative"
        :creativeEffect="creativeEffect"
      />
    </Badge>
  </Flex>
</template>
```

:::

## 走马灯

<Swiper
  :images="images"
  type="carousel"
  :height="200"
  :slides-per-view="3"
  :space-between="20"
  :speed="2500" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 6; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`
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
    :height="200"
    :slides-per-view="3"
    :space-between="20"
    :speed="2500" />
</template>
```

:::

## 信息展播

<Flex vertical gap="middle">
  <Space>
    <Button type="primary" @click="onPrev">Prev</Button>
    <Button type="primary" @click="onNext">Next</Button>
  </Space>
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
    navigation
    mousewheel
    @swiper="onBroadcastSwiper"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, shallowReactive, onBeforeMount } from 'vue'

const images = ref<any[]>([])
function loadImages () {
  for (let i = 1; i <= 6; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
const navigation = shallowReactive<{[key: string]: any}>({})
function onBroadcastSwiper (swiper: any) {
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
  <Flex vertical gap="middle">
    <Space>
      <Button type="primary" @click="onPrev">Prev</Button>
      <Button type="primary" @click="onNext">Next</Button>
    </Space>
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
      navigation
      mousewheel
      @swiper="onBroadcastSwiper"
    />
  </Flex>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
images | 轮播图片数组 | [Image](#image-type)[] | [] | true
width | 轮播区域宽度 | number &#124; string | '100%' | false
height | 轮播区域高度 | number &#124; string  | '100%' | false
type | `banner`: 轮播图模式; `carousel`: 走马灯模式; `broadcast`: 信息展播模式 | 'banner' &#124; 'carousel' &#124; 'broadcast' | 'banner' | false
navigation | 是否显示导航 | boolean | false | false
effect | 切换动画效果 | 'slide' &#124; 'fade' &#124; 'cube' &#124; 'flip' &#124; 'coverflow' &#124; 'cards' &#124; 'creative' | 'slide' | false
delay | 自动切换的时间间隔，仅当 `type: banner` 时生效，单位`ms` | number | 3000 | false
speed | 切换过渡的动画持续时间，单位`ms` | number | 300 | false
loop | 是否循环切换 | boolean | true | false
pauseOnMouseEnter | 当鼠标移入走马灯时，是否暂停自动轮播，仅当 `type: banner` 或 `type: carousel` 时生效 | boolean | false | false
swipe | 是否可以鼠标拖动 | boolean | true | false
preloaderColor | 预加载时的 `loading` 颜色 | 'theme' &#124; 'white' &#124; 'black' | 'theme' | false

## Image Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 图片名称 | string | false
link | 图片跳转链接 | string | false
src | 图片地址 | string | true

## Events

事件名称 | 说明 | 参数
-- | -- | --
swiper | `Swiper`初始化后的回调 | (swiper: any) => void
change | 轮播图片变化时的回调 | (swiper: any) => void
