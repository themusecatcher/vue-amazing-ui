<script setup lang="ts">
import swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { ref, computed } from 'vue'

interface Image {
  title: string, // 图片名称
  link?: string, // 图片跳转链接
  imgUrl: string // 图片地址
}
const props = defineProps({
  imageData: {
    type: Array<Image>,
    default: () => []
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
  },
  delay: { // 自动切换的时间间隔，mode: banner时生效
    type: Number,
    default: 3000 // 单位ms
  },
  swipe: { // 是否可以鼠标拖动
    type: Boolean,
    default: true
  },
  preloaderColor: { // preload时loading的颜色
    type: String,
    default: 'theme' // 可选theme white black
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
const modulesBanner = ref([Navigation, Pagination, Autoplay, EffectFade])
const pagination = ref({
  clickable: true
})
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
    :class="{'swiper-no-swiping': !swipe}"
    v-if="mode==='banner'"
    :modules="modulesBanner"
    :lazy="true"
    :navigation="navigation"
    :pagination="pagination"
    :slides-per-view="1"
    :autoplay="autoplayBanner"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    v-bind="$attrs">
    <swiper-slide v-for="(image, index) in imageData" :key="index">
      <a :href="image.link ? image.link:'javascript:;'" :target="image.link ? '_blank':'_self'" class="m-link">
        <img
          :src="image.imgUrl"
          class="u-img"
          :style="`width: ${imgWidth}; height: ${imgHeight};`"
          :alt="image.title"
          loading="lazy" />
      </a>
      <div :class="`swiper-lazy-preloader swiper-lazy-preloader-${preloaderColor}`"></div>
    </swiper-slide>
  </swiper>
  <swiper
    class="swiper-no-swiping"
    v-if="mode==='carousel'"
    :modules="modulesCarousel"
    :lazy="true"
    :autoplay="autoplayCarousel"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    v-bind="$attrs">
    <swiper-slide v-for="(image, index) in imageData" :key="index">
      <a :href="image.link ? image.link:'javascript:;'" :target="image.link ? '_blank':'_self'" class="m-link">
        <img
          :src="image.imgUrl"
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
.swiper-lazy-preloader-theme {
  --swiper-preloader-color: @themeColor;
}
</style>
