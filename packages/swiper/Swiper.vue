<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay, EffectFade, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { ref, computed } from 'vue'
interface Image {
  title: string // 图片名称
  link?: string // 图片跳转链接
  src: string // 图片地址
}
interface Props {
  images: Image[] // 轮播图片数组
  width?: number|string // 图片宽度
  height?: number|string // 图片高度
  type?: 'banner'|'carousel'|'broadcast' // banner轮播图模式 | carousel走马灯模式
  navigation?: boolean // 是否显示导航
  delay?: number // 自动切换的时间间隔（type: banner时生效），单位ms
  swipe?: boolean // 是否可以鼠标拖动
  preloaderColor?: 'theme'|'white'|'black' // 预加载时的loading颜色
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  width: '100%',
  height: '100vh',
  type: 'banner', // 可选 banner | carousel
  navigation: true,
  delay: 3000,
  swipe: true,
  preloaderColor: 'theme' // 可选 theme white black
})
const imgWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const imgHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return props.height
  }
})
const modulesBanner = ref([Navigation, Pagination, Autoplay, EffectFade])
const autoplayBanner = ref({
  delay: props.delay,
  disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
  pauseOnMouseEnter: true // 鼠标置于swiper时暂停自动切换，鼠标离开时恢复自动切换，默认false
})

const modulesCarousel = ref([Autoplay])
const autoplayCarousel = ref<object|boolean>({
  delay: 0,
  disableOnInteraction: false
})
const modulesBroadcast = ref([Navigation, Pagination, Mousewheel])
const emits = defineEmits(['swiper', 'change'])
function onSwiper (swiper: any) {
  // console.log(swiper)
  emits('swiper', swiper)
  if (props.type === 'carousel') {
    swiper.el.onmouseenter = () => { // 移入暂停
      swiper.autoplay.stop()
    }
    swiper.el.onmouseleave = () => { // 移出启动
      swiper.autoplay.start()
    }
  }
}
</script>
<template>
  <swiper
    v-if="type==='banner'"
    :class="{'swiper-no-swiping': !swipe}"
    :modules="modulesBanner"
    :navigation="navigation"
    :slides-per-view="1"
    :autoplay="autoplayBanner"
    lazy
    loop
    @swiper="onSwiper"
    @slideChange="(swiper) => $emit('change', swiper)"
    v-bind="$attrs">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <a :href="image.link ? image.link:'javascript:;'" :target="image.link ? '_blank':'_self'" class="m-link">
        <img
          :src="image.src"
          class="u-img"
          :style="`width: ${imgWidth}; height: ${imgHeight};`"
          :alt="image.title"
          loading="lazy" />
      </a>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </swiper-slide>
  </swiper>
  <swiper
    v-if="type==='carousel'"
    class="swiper-no-swiping"
    :modules="modulesCarousel"
    :autoplay="autoplayCarousel"
    lazy
    loop
    @swiper="onSwiper"
    @slideChange="(swiper) => $emit('change', swiper)"
    v-bind="$attrs">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <a :href="image.link ? image.link:'javascript:;'" :target="image.link ? '_blank':'_self'" class="m-link">
        <img
          :src="image.src"
          class="u-img"
          :style="`width: ${imgWidth}; height: ${imgHeight};`"
          :alt="image.title"
          loading="lazy" />
      </a>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </swiper-slide>
  </swiper>
  <swiper
    v-if="type==='broadcast'"
    :modules="modulesBroadcast"
    :navigation="navigation"
    lazy
    @swiper="onSwiper"
    @slideChange="(swiper) => $emit('change', swiper)"
    v-bind="$attrs">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <a :href="image.link ? image.link:'javascript:;'" :target="image.link ? '_blank':'_self'" class="m-link">
        <img
          :src="image.src"
          class="u-img"
          :style="`width: ${imgWidth}; height: ${imgHeight};`"
          :alt="image.title"
          loading="lazy" />
      </a>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </swiper-slide>
  </swiper>
</template>
<style lang="less" scoped>
.m-link {
  display: block;
  height: 100%;
}
.u-img {
  object-fit: cover;
  cursor: pointer;
}
.swiper {
  --swiper-theme-color: @themeColor;
}
:deep(.swiper-wrapper) { // 自动切换过渡效果设置
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
