<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { ref, computed } from 'vue'

interface Image {
  title: string,
  link: string,
  imgUrl: string
}
const props = defineProps({
  imageData: {
    type: Array<Image>,
    default: () => {
      return []
    }
  },
  width: { // 图片宽度
    type: [Number, String],
    default: '100%'
  },
  height: { // 图片高度
    type: [Number, String],
    default: '100vh'
  },
  mode: { // banner轮播图模式 | carousel走马灯模式
    type: String,
    default: 'banner' // banner | carousel
  },
  navigation: { // 是否显示导航
    type: Boolean,
    default: true
  }
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
// 设置Slide的切换效果，默认为"slide"（普通位移切换），还可设置为"fade"（淡入）、"cube"（方块）、"coverflow"（3d流）、"flip"（3d翻转）、"cards"(卡片式)、"creative"（创意性）
const effect = ref<any>('slide')
const modulesBanner = ref([Navigation, Pagination, Autoplay, EffectFade])
const pagination = ref({
  clickable: true
})
const autoplayBanner = ref({
  delay: 3000, // 自动切换的时间间隔
  disableOnInteraction: true, // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
  pauseOnMouseEnter: true // 鼠标置于swiper时暂停自动切换，鼠标离开时恢复自动切换，默认false
})

const modulesCarousel = ref([Autoplay])
const autoplayCarousel = ref<object|boolean>({
  delay: 0
})
function onSwiper (swiper: any) {
  console.log(swiper)
  if (props.mode === 'carousel') {
    swiper.el.onmouseenter = () => { // 移入暂停
      swiper.autoplay.stop()
    }
    swiper.el.onmouseleave = () => { // 移出启动
      swiper.autoplay.start()
    }
  }
}
function onSlideChange () {
  console.log('slide change')
}
</script>
<template>
  <swiper
    v-if="mode==='banner'"
    :modules="modulesBanner"
    :effect="effect"
    :lazy="true"
    :navigation="navigation"
    :pagination="pagination"
    :slides-per-view="1"
    :autoplay="autoplayBanner"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(image, index) in imageData" :key="index">
      <img
        :src="image.imgUrl"
        class="u-banner-img"
        :style="`width: ${imgWidth}; height: ${imgHeight};`"
        :alt="image.title"
        loading="lazy" />
      <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
    </swiper-slide>
  </swiper>
  <swiper
    class="swiper-no-swiping"
    v-if="mode==='carousel'"
    :modules="modulesCarousel"
    :lazy="true"
    :slides-per-view="3"
    :space-between="20"
    :speed="2500"
    :autoplay="autoplayCarousel"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(image, index) in imageData" :key="index">
      <img
        :src="image.imgUrl"
        class="u-carousel-img"
        :style="`width: ${imgWidth}; height: ${imgHeight};`"
        :alt="image.title"
        loading="lazy" />
      <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
    </swiper-slide>
  </swiper>
</template>
<style lang="less" scoped>
.u-banner-img {
  // width: 100%;
  // height: 100vh;
  object-fit: cover;
  cursor: pointer;
}
.u-carousel-img {
  // width: 100%;
  // height: 240px;
  object-fit: cover;
}
:deep(.swiper-wrapper) { // 自动切换过渡效果设置
  transition-timing-function: linear; // 线性过渡模拟走马灯效果
  -webkit-transition-timing-function: linear;
}
:deep(.swiper-pagination-bullet) {
  width: 36px;
  height: 4px;
  background: #E3E3E3;
  border-radius: 1px;
  margin-right: 10px;
  cursor: pointer;
}
:deep(.swiper-pagination-bullet-active) {
  background: @themeColor;
}
</style>
