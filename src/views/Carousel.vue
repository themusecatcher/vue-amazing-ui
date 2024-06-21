<script setup lang="ts">
import { ref, reactive } from 'vue'

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
  },
  {
    title: 'image-6',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg',
    link: ''
  },
  {
    title: 'image-7',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/7.jpg',
    link: ''
  },
  {
    title: 'image-8',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/8.jpg',
    link: ''
  },
  {
    title: 'image-9',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/9.jpg',
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
const carouselConfig = reactive({
  autoplay: true,
  pauseOnMouseEnter: false,
  effect: 'slide',
  interval: 3000,
  width: '100%',
  height: '100vh',
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
  fadeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  slideDuration: 800,
  x1: 0.65,
  y1: 0,
  x2: 0.35,
  y2: 1
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">支持导航切换，键盘上、下、左、右按键切换，点击指示点切换</h3>
    <Carousel :images="images" :width="800" :height="450" @click="clickImage" />
    <h2 class="mt30 mb10">箭头</h2>
    <Space align="center"> showArrow: <Switch v-model:checked="showArrow" /> </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :show-arrow="showArrow" @click="clickImage" />
    <h2 class="mt30 mb10">自动播放</h2>
    <Carousel :images="images" :width="800" :height="450" autoplay @change="onChange" @click="clickImage" />
    <h2 class="mt30 mb10">指示点位置</h2>
    <Radio :options="positionOptions" v-model:value="dotPosition" button button-style="solid" />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" autoplay :dotPosition="dotPosition" />
    <h2 class="mt30 mb10">垂直</h2>
    <Carousel :images="images" :width="800" :height="450" autoplay dotPosition="right" />
    <h2 class="mt30 mb10">移入暂停</h2>
    <Carousel :images="images" :width="800" :height="450" autoplay pause-on-mouse-enter dotPosition="right" />
    <h2 class="mt30 mb10">过渡效果</h2>
    <Radio :options="effectOptions" v-model:value="effect" button button-style="solid" />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :effect="effect" :fade-duration="1500" />
    <h2 class="mt30 mb10">鼠标经过指示点切换轮播图</h2>
    <Radio :options="triggerOptions" v-model:value="trigger" button button-style="solid" />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :dots-trigger="trigger" />
    <h2 class="mt30 mb10">自定义滑动动画</h2>
    <Carousel :images="images" :width="800" :height="450" :slide-duration="800" :slide-function="[0.45, 1, 0.55, 1]" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      arrow-color="#13C2C2"
      :arrow-size="48"
      dot-active-color="#13C2C2"
      :dot-style="{ backgroundColor: '#FFF' }"
      :dot-active-style="{ width: '25px', backgroundColor: 'gold' }"
      :spin-style="{ indicator: 'dot', color: '#13C2C2' }"
    />
    <h2 class="mt30 mb10">自定义配置</h2>
    <Flex gap="middle">
      <Carousel
        :images="images"
        :autoplay="carouselConfig.autoplay"
        :show-arrow="carouselConfig.showArrow"
        :height="450"
        arrow-color="#13C2C2"
        :arrow-size="48"
        dot-active-color="#13C2C2"
        :dot-style="{ backgroundColor: '#FFF' }"
        :dot-active-style="{ width: '25px', backgroundColor: 'gold' }"
        :spin-style="{ indicator: 'dot', color: '#13C2C2' }"
      />
      <Divider type="vertical" />
      <Flex width="25%" vertical gap="middle">
        <Space align="center"> autoplay: <Switch v-model:checked="carouselConfig.autoplay" /> </Space>
        <Space align="center"> pauseOnMouseEnter: <Switch v-model:checked="carouselConfig.pauseOnMouseEnter" /> </Space>
        <Space align="center">
          effect: <Radio :options="effectOptions" v-model:value="carouselConfig.effect" button button-style="solid" />
        </Space>
        <Space align="center">
          interval: <Input v-model:value="carouselConfig.interval" placeholder="interval" />
        </Space>
        <Space align="center"> width: <Input v-model:value="carouselConfig.width" placeholder="width" /> </Space>
        <Space align="center"> height: <Input v-model:value="carouselConfig.height" placeholder="height" /> </Space>
        <Space align="center"> showArrow: <Switch v-model:checked="carouselConfig.showArrow" /> </Space>
        <Space align="center">
          arrowColor: <Input v-model:value="carouselConfig.arrowColor" placeholder="arrowColor" />
        </Space>
        <Space align="center"> arrowSize: <Slider v-model:value="carouselConfig.arrowSize" :min="1" /> </Space>
        <Space align="center"> dots: <Switch v-model:checked="carouselConfig.dots" /> </Space>
        <Space align="center"> dotSize: <Slider v-model:value="carouselConfig.dotSize" :min="1" /> </Space>
        <Space align="center">
          dotColor: <Input v-model:value="carouselConfig.dotColor" placeholder="dotColor" />
        </Space>
        <Space align="center">
          dotActiveColor: <Input v-model:value="carouselConfig.dotActiveColor" placeholder="dotActiveColor" />
        </Space>
        <Space align="center">
          dotPosition:
          <Radio :options="positionOptions" v-model:value="carouselConfig.dotPosition" button button-style="solid" />
        </Space>
        <Space align="center">
          dotsTrigger:
          <Radio :options="triggerOptions" v-model:value="carouselConfig.dotsTrigger" button button-style="solid" />
        </Space>
        <Space align="center">
          fadeDuration: <Slider v-model:value="carouselConfig.fadeDuration" :min="100" :step="10" :max="10000" />
        </Space>
        <Space align="center">
          fadeFunction: <Input v-model:value="carouselConfig.fadeFunction" placeholder="fadeFunction" />
        </Space>
        <Space align="center">
          slideDuration: <Slider v-model:value="carouselConfig.slideDuration" :min="100" :step="10" :max="10000" />
        </Space>
        <Space align="center">
          slideFunction:
          <InputNumber v-model:value="carouselConfig.x1" :min="0" placeholder="x1" />
          <InputNumber v-model:value="carouselConfig.y1" :min="0" placeholder="y1" />
        </Space>
        <br />
        <br />
      </Flex>
    </Flex>
  </div>
</template>
