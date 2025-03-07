<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Swiper as SwiperTypes } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  EffectCards,
  EffectCreative
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import 'swiper/css/autoplay' // 目标文件为空
// import 'swiper/css/mousewheel' // 目标文件为空
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
// import 'swiper/css/effect-coverflow' // 目标文件为空
import 'swiper/css/effect-cards'
import 'swiper/css/effect-creative'
export interface Image {
  name?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
  target?: '_self' | '_blank' // 如何打开跳转链接
}
export interface Props {
  images?: Image[] // 轮播图片数组
  width?: number | string // 轮播区域宽度，单位 px
  height?: number | string // 轮播区域高度，单位 px
  mode?: 'banner' | 'carousel' | 'broadcast' // banner: 轮播图模式; carousel: 走马灯模式; broadcast: 信息展播模式
  navigation?: boolean // 是否显示导航
  effect?: 'slide' | 'fade' | 'cube' | 'flip' | 'coverflow' | 'cards' | 'creative' // 切换动画效果
  delay?: number // 自动切换的时间间隔，仅当 mode: 'banner' 时生效，单位 ms
  speed?: number // 切换过渡的动画持续时间，单位 ms
  loop?: boolean // 是否循环切换
  pauseOnMouseEnter?: boolean // 当鼠标移入走马灯时，是否暂停自动轮播，仅当 mode: 'banner' 或 mode: 'carousel' 时生效
  swipe?: boolean // 是否可以鼠标拖动
  preloaderColor?: 'theme' | 'white' | 'black' // 预加载时的 loading 颜色
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  width: '100%',
  height: '100%',
  mode: 'banner',
  navigation: false,
  effect: 'slide',
  delay: 3000,
  speed: 300,
  loop: true,
  pauseOnMouseEnter: false,
  swipe: true,
  preloaderColor: 'theme'
})
const autoplayBanner = ref({
  delay: props.delay,
  disableOnInteraction: false, // 用户操作 swiper 之后，是否禁止 autoplay。默认为 true：停止。
  pauseOnMouseEnter: props.pauseOnMouseEnter // 鼠标置于 swiper 时暂停自动切换，鼠标离开时恢复自动切换，默认 false
})
const modulesCarousel = ref([Autoplay])
const autoplayCarousel = ref<object | boolean>({
  delay: 0,
  disableOnInteraction: false
})
const modulesBroadcast = ref([Navigation, Pagination, Mousewheel])
const emits = defineEmits(['swiper', 'change'])
const swiperWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else {
    return props.width
  }
})
const swiperHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
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
function onSwiper(swiper: SwiperTypes) {
  emits('swiper', swiper)
  if (props.mode === 'carousel' && props.pauseOnMouseEnter) {
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
function onSlideChange(swiper: SwiperTypes) {
  emits('change', swiper)
}
function getImageName(image: Image) {
  // 从图片地址 src 中获取图片名称
  if (image.name) {
    return image.name
  } else {
    const res = image.src.split('?')[0].split('/')
    return res[res.length - 1]
  }
}
</script>
<template>
  <Swiper
    v-if="mode === 'banner'"
    class="swiper-banner"
    :class="{ 'swiper-no-swiping': !swipe }"
    :style="`--swiper-width: ${swiperWidth}; --swiper-height: ${swiperHeight}; --swiper-primary-color: #1677ff;`"
    :modules="modulesBanner"
    :navigation="navigation"
    :slides-per-view="1"
    :autoplay="autoplayBanner"
    :effect="effect"
    :speed="speed"
    :loop="loop"
    lazy
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <component
        :is="image.link ? 'a' : 'div'"
        class="swiper-link"
        :href="image.link"
        :target="image.target ? image.target : '_blank'"
      >
        <img class="swiper-image" :src="image.src" :alt="getImageName(image)" loading="lazy" />
      </component>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </SwiperSlide>
  </Swiper>
  <Swiper
    v-if="mode === 'carousel'"
    class="swiper-carousel swiper-no-swiping"
    :style="`--swiper-width: ${swiperWidth}; --swiper-height: ${swiperHeight}; --swiper-primary-color: #1677ff;`"
    :modules="modulesCarousel"
    :autoplay="autoplayCarousel"
    :speed="speed"
    :loop="loop"
    lazy
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <component
        :is="image.link ? 'a' : 'div'"
        class="swiper-link"
        :href="image.link"
        :target="image.target ? image.target : '_blank'"
      >
        <img class="swiper-image" :src="image.src" :alt="getImageName(image)" loading="lazy" />
      </component>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </SwiperSlide>
  </Swiper>
  <Swiper
    v-if="mode === 'broadcast'"
    class="swiper-broadcast"
    :style="`--swiper-width: ${swiperWidth}; --swiper-height: ${swiperHeight}; --swiper-primary-color: #1677ff;`"
    :modules="modulesBroadcast"
    :navigation="navigation"
    :speed="speed"
    :loop="loop"
    lazy
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <component
        :is="image.link ? 'a' : 'div'"
        class="swiper-link"
        :href="image.link"
        :target="image.target ? image.target : '_blank'"
      >
        <img class="swiper-image" :src="image.src" :alt="getImageName(image)" loading="lazy" />
      </component>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </SwiperSlide>
  </Swiper>
</template>
<style lang="less" scoped>
.swiper-banner {
  width: var(--swiper-width);
  height: var(--swiper-height);
  :deep(.swiper-wrapper) {
    transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
}
.swiper-carousel {
  width: var(--swiper-width);
  height: var(--swiper-height);
  :deep(.swiper-wrapper) {
    // 自动切换过渡效果设置
    transition-timing-function: linear; // 线性过渡模拟走马灯效果
  }
}
.swiper-broadcast {
  width: var(--swiper-width);
  height: var(--swiper-height);
  :deep(.swiper-wrapper) {
    transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
}
.swiper-link {
  display: block;
  height: 100%;
  .swiper-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
}
.swiper {
  --swiper-theme-color: var(--swiper-primary-color);
}
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
}
.swiper-lazy-preloader-theme {
  --swiper-preloader-color: var(--swiper-primary-color);
}
</style>
