<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/5.jpg'
  },
  {
    name: 'image-6',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg'
  },
  {
    name: 'image-7',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/7.jpg'
  },
  {
    name: 'image-8',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/8.jpg'
  },
  {
    name: 'image-9',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/9.jpg'
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">当焦点在 Arrow 或 Dots 上时，可以通过键盘上、下、左、右按键切换</h3>
    <Carousel :images="images" :width="800" :height="450" @click="clickImage" />
    <h2 class="mt30 mb10">箭头</h2>
    <Space align="center"> showArrow: <Switch v-model="showArrow" /> </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :show-arrow="showArrow" @click="clickImage" />
    <h2 class="mt30 mb10">自动轮播</h2>
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
    <Radio :options="triggerOptions" v-model:value="dotsTrigger" button button-style="solid" />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :dots-trigger="dotsTrigger" />
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
    <h2 class="mt30 mb10">使用 Methods</h2>
    <Space>
      <InputNumber :min="1" :max="images.length" v-model:value="toIndex" />
      <Button @click="carousel.to(toIndex)">跳转到</Button>
      <Button @click="carousel.prev()">前一页</Button>
      <Button @click="carousel.next()">后一页</Button>
      <Button @click="getCurrentIndex">获取当前页：{{ currentIndex }}</Button>
    </Space>
    <br />
    <br />
    <Carousel ref="carousel" :images="images" :width="800" :height="450" />
    <h2 class="mt30 mb10">轮播图配置器</h2>
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
          <Flex gap="small" vertical> arrowColor：<ColorPicker v-model:value="state.arrowColor" /> </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> arrowSize：<Slider v-model:value="state.arrowSize" :min="1" /> </Flex>
        </Col>
        <Col :span="6"></Col>
        <Col :span="6">
          <Space gap="small" vertical> dots：<Switch v-model="state.dots" /> </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> dotSize：<Slider v-model:value="state.dotSize" :min="4" :max="64" /> </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> dotColor：<ColorPicker v-model:value="state.dotColor" /> </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> dotActiveColor：<ColorPicker v-model:value="state.dotActiveColor" /> </Flex>
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
      <Carousel :images="images" :height="450" :spin-style="{ indicator: 'dot', color: '#13C2C2' }" v-bind="state" />
    </Flex>
  </div>
</template>
