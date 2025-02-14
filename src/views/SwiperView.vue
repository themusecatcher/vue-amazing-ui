<script setup lang="ts">
import pkg from '/package.json'
import { ref, shallowReactive, onBeforeMount } from 'vue'
import type { SwiperImage } from 'vue-amazing-ui'
const images = ref<SwiperImage[]>([])
function loadImages() {
  for (let i = 1; i <= 6; i++) {
    images.value.push({
      name: `image-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`,
      link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.6/${i}.jpg`
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
<template>
  <div>
    <h1>Swiper 参考文档</h1>
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://swiperjs.com/" target="_blank">Swiper官方</a>
      </li>
      <li>
        <a class="u-file" href="https://swiperjs.com/swiper-api" target="_blank">Swiper API</a>
      </li>
      <li>
        <a class="u-file" href="https://swiperjs.com/vue" target="_blank">Swiper Vue</a>
      </li>
      <li>
        <a class="u-file" href="https://swiperjs.com/demos" target="_blank">Swiper Demos</a>
      </li>
    </ul>
    <Space class="mt30" gap="small">
      <h1>swiper</h1>
      <Tag color="volcano">{{ pkg.dependencies.swiper }}</Tag>
    </Space>
    <h2 class="mt30 mb10">基本使用</h2>
    <Swiper
      :images="images"
      :height="640"
      :pagination="{
        dynamicBullets: true,
        clickable: true
      }"
      @change="onChange"
    />
    <h2 class="mt30 mb10">各种切换动画</h2>
    <Flex :gap="48" wrap="wrap">
      <Badge style="width: 30%" :value="effect" color="volcano" v-for="(effect, index) in effects" :key="index">
        <Swiper
          style="display: inline-block"
          :images="images"
          :height="240"
          :pagination="{
            dynamicBullets: true,
            clickable: true
          }"
          :effect="effect"
        />
      </Badge>
    </Flex>
    <h2 class="mt30 mb10">自定义切换动画</h2>
    <Flex :gap="48" wrap="wrap">
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
          :height="240"
          :pagination="{
            dynamicBullets: true,
            clickable: true
          }"
          effect="creative"
          :creativeEffect="creativeEffect"
        />
      </Badge>
    </Flex>
    <h2 class="mt30 mb10">走马灯</h2>
    <Swiper :images="images" mode="carousel" :height="240" :slides-per-view="3" :space-between="20" :speed="2500" />
    <h2 class="mt30 mb10">信息展播</h2>
    <Flex vertical gap="middle">
      <Space>
        <Button type="primary" @click="onPrev">Prev</Button>
        <Button type="primary" @click="onNext">Next</Button>
      </Space>
      <Swiper
        :images="images"
        mode="broadcast"
        :pagination="{
          dynamicBullets: true,
          clickable: true
        }"
        :height="320"
        :slides-per-view="3"
        :space-between="30"
        navigation
        mousewheel
        @swiper="onBroadcastSwiper"
      />
    </Flex>
  </div>
</template>
