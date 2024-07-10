<script setup lang="ts">
import type { Swiper as SwiperTypes } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  EffectCards,
  EffectCreative,
  Mousewheel
} from 'swiper/modules'
import 'swiper/less'
import 'swiper/less/navigation'
import 'swiper/less/pagination'
import 'swiper/less/effect-fade'
import 'swiper/less/effect-cube'
import 'swiper/less/effect-flip'
import 'swiper/less/effect-coverflow'
import 'swiper/less/effect-cards'
import 'swiper/less/effect-creative'
import { ref, computed } from 'vue'
interface Image {
  title?: string // 图片名称
  link?: string // 图片跳转链接
  src: string // 图片地址
}
interface Props {
  images: Image[] // 轮播图片数组
  width?: number | string // 轮播区域宽度
  height?: number | string // 轮播区域高度
  type?: 'banner' | 'carousel' | 'broadcast' // banner: 轮播图模式; carousel: 走马灯模式; broadcast: 信息展播模式
  navigation?: boolean // 是否显示导航
  effect?: 'slide' | 'fade' | 'cube' | 'flip' | 'coverflow' | 'cards' | 'creative' // 切换动画效果
  delay?: number // 自动切换的时间间隔，仅当 type: banner 时生效，单位ms
  speed?: number // 切换过渡的动画持续时间，单位ms
  loop?: boolean // 是否循环切换
  pauseOnMouseEnter?: boolean // 当鼠标移入走马灯时，是否暂停自动轮播，仅当 type: banner 或 type: carousel 时生效
  swipe?: boolean // 是否可以鼠标拖动
  preloaderColor?: 'theme' | 'white' | 'black' // 预加载时的 loading 颜色
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  width: '100%',
  height: '100%',
  type: 'banner',
  navigation: false,
  effect: 'slide',
  delay: 3000,
  speed: 300,
  loop: true,
  pauseOnMouseEnter: false,
  swipe: true,
  preloaderColor: 'theme'
})
const swiperWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const swiperHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return props.height
  }
})
const modulesBanner = computed(() => {
  const modules = [Navigation, Pagination, Autoplay]
  const effectMoudles = {
    fade: EffectFade,
    cube: EffectCube,
    flip: EffectFlip,
    coverflow: EffectCoverflow,
    cards: EffectCards,
    creative: EffectCreative
  }
  if (props.effect !== 'slide') {
    modules.push(effectMoudles[props.effect])
  }
  return modules
})
const autoplayBanner = ref({
  delay: props.delay,
  disableOnInteraction: false, // 用户操作swiper之后，是否禁止 autoplay。默认为 true：停止。
  pauseOnMouseEnter: props.pauseOnMouseEnter // 鼠标置于 swiper 时暂停自动切换，鼠标离开时恢复自动切换，默认 false
})
const modulesCarousel = ref([Autoplay])
const autoplayCarousel = ref<object | boolean>({
  delay: 0,
  disableOnInteraction: false
})
const modulesBroadcast = ref([Navigation, Pagination, Mousewheel])
const emits = defineEmits(['swiper', 'change'])
function onSwiper(swiper: SwiperTypes) {
  emits('swiper', swiper)
  if (props.type === 'carousel' && props.pauseOnMouseEnter) {
    swiper.el.onmouseenter = () => {
      // 移入暂停
      swiper.autoplay.stop()
    }
    swiper.el.onmouseleave = () => {
      // 移出启动
      swiper.autoplay.start()
    }
  }
}
function getImageTitle(image: Image) {
  // 从图片地址 src 中获取图片名称
  if (image.title) {
    return image.title
  } else {
    const res = image.src.split('?')[0].split('/')
    return res[res.length - 1]
  }
}
</script>
<template>
  <Swiper
    v-if="type === 'banner'"
    :class="{ 'swiper-no-swiping': !swipe }"
    :style="`width: ${swiperWidth}; height: ${swiperHeight};`"
    :modules="modulesBanner"
    :navigation="navigation"
    :slides-per-view="1"
    :autoplay="autoplayBanner"
    :effect="effect"
    :speed="speed"
    :loop="loop"
    lazy
    @swiper="onSwiper"
    @slideChange="(swiper) => $emit('change', swiper)"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <a :href="image.link ? image.link : 'javascript:;'" :target="image.link ? '_blank' : '_self'" class="m-link">
        <img class="u-image" :src="image.src" :alt="getImageTitle(image)" loading="lazy" />
      </a>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </SwiperSlide>
  </Swiper>
  <Swiper
    v-if="type === 'carousel'"
    class="swiper-no-swiping"
    :style="`width: ${swiperWidth}; height: ${swiperHeight};`"
    :modules="modulesCarousel"
    :autoplay="autoplayCarousel"
    :speed="speed"
    :loop="loop"
    lazy
    @swiper="onSwiper"
    @slideChange="(swiper) => $emit('change', swiper)"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <a :href="image.link ? image.link : 'javascript:;'" :target="image.link ? '_blank' : '_self'" class="m-link">
        <img class="u-image" :src="image.src" :alt="getImageTitle(image)" loading="lazy" />
      </a>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </SwiperSlide>
  </Swiper>
  <Swiper
    v-if="type === 'broadcast'"
    :style="`width: ${swiperWidth}; height: ${swiperHeight};`"
    :modules="modulesBroadcast"
    :navigation="navigation"
    :speed="speed"
    :loop="loop"
    lazy
    @swiper="onSwiper"
    @slideChange="(swiper) => $emit('change', swiper)"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <a :href="image.link ? image.link : 'javascript:;'" :target="image.link ? '_blank' : '_self'" class="m-link">
        <img class="u-image" :src="image.src" :alt="getImageTitle(image)" loading="lazy" />
      </a>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </SwiperSlide>
  </Swiper>
</template>
<style lang="less" scoped>
.m-link {
  display: block;
  height: 100%;
}
.u-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.swiper {
  --swiper-theme-color: @themeColor;
}
:deep(.swiper-wrapper) {
  // 自动切换过渡效果设置
  transition-timing-function: linear; // 线性过渡模拟走马灯效果
  -webkit-transition-timing-function: linear;
}
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
}
.swiper-lazy-preloader-theme {
  --swiper-preloader-color: @themeColor;
}
</style>
