<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
interface Props {
  videoSrc: string // 视频文件url，必传，支持网络地址 https 和相对地址
  videoPoster?: string // 视频封面url，支持网络地址 https 和相对地址（在未设置封面且preload不等于none时，自动获取视频第0.3s对应帧作为封面图）
  width?: number // 视频播放器宽度
  height?: number // 视频播放器高度
  autoplay?: boolean // 视频就绪后是否马上播放，优先级高于preload
  controls?: boolean // 是否向用户显示控件，比如进度条，全屏等
  loop?: boolean // 视频播放完成后，是否循环播放
  muted?: boolean // 是否静音
  preload?: string // 是否在页面加载后载入视频，如果设置了autoplay属性，则preload将被忽略
  showPlay?: boolean // 播放暂停时是否显示播放器中间的暂停图标
  playWidth?: number // 中间播放暂停按钮的边长
  zoom?: string // video的poster默认图片和视频内容缩放规则
}
const props = withDefaults(defineProps<Props>(), {
  videoSrc: '',
  videoPoster: '',
  width: 800,
  height: 450,
  /*
    参考 MDN 自动播放指南：https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide
    Autoplay 功能
    据新政策，媒体内容将在满足以下至少一个的条件下自动播放：
    1.音频被静音或其音量设置为 0
    2.用户和网页已有交互行为（包括点击、触摸、按下某个键等等）
    3.网站已被列入白名单；如果浏览器确定用户经常与媒体互动，这可能会自动发生，也可能通过首选项或其他用户界面功能手动发生
    4.自动播放策略应用到<iframe>或者其文档上
    autoplay：由于目前在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，
    已不再允许自动播放音频和视频。就算你为video或audio标签设置了autoplay属性也一样不能自动播放！
    解决方法：设置视频 autoplay 时，视频必须设置为静音 muted: true 即可实现自动播放，
    然后用户可以使用控制栏开启声音，类似某宝商品自动播放的宣传视频逻辑
  */
  autoplay: false,
  controls: true,
  loop: false,
  muted: false,
  /*
    preload可选属性：
    auto: 一旦页面加载，则开始加载视频;
    metadata: 当页面加载后仅加载视频的元数据（例如长度），建议使用metadata，以便视频自动获取第一帧作为封面poster
    none: 页面加载后不应加载视频
  */
  preload: 'auto',
  showPlay: false,
  playWidth: 96,
  /*
    zoom可选属性：
    none: (默认)保存原有内容，不进行缩放;
    fill: 不保持原有比例，内容拉伸填充整个内容容器;
    contain: 保存原有比例，内容以包含方式缩放;
    cover: 保存原有比例，内容以覆盖方式缩放
  */
  zoom: 'none'
})
// 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
const poster = ref(props.videoPoster)
const originPlay = ref(true)
const vplay = ref(false)
// 为模板引用标注类型
const veo = ref()
// const veo = ref<HTMLVideoElement | null>(null) // 声明一个同名的模板引用

/*
  loadeddata 事件在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发
  preload为none时不会触发
*/
function getPoster () { // 在未设置封面时，自动获取视频0.3s对应帧作为视频封面
  // 由于不少视频第一帧为黑屏，故设置视频开始播放时间为0.3s，即取该时刻帧作为封面图
  veo.value.currentTime = 0.3
  // 创建canvas元素
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  // canvas画图
  canvas.width = veo.value.videoWidth
  canvas.height = veo.value.videoHeight
  ctx?.drawImage(veo.value, 0, 0, canvas.width, canvas.height)
  // 把canvas转成base64编码格式
  poster.value = canvas.toDataURL('image/png')
}
function onPlay () {
  console.log('click')
  if (props.autoplay) {
    veo.value?.pause()
  } else {
    vplay.value = true
    originPlay.value = false
    veo.value?.play()
  }
}
function onPause () {
  vplay.value = false
  console.log('pause')
}
function onPlaying () {
  vplay.value = true
  console.log('playing')
}
onMounted(() => {
  if (props.showPlay) {
    veo.value?.addEventListener('pause', onPause)
    veo.value?.addEventListener('playing', onPlaying)
  }
  if (props.autoplay) {
    vplay.value = true
    originPlay.value = false
  }
  /*
    自定义设置播放速度，经测试：
    在vue2中需设置：this.$refs.veo.playbackRate = 2
    在vue3中需设置：veo.value.defaultPlaybackRate = 2
  */
  // veo.value.defaultPlaybackRate = 2
})
onUnmounted(() => {
  veo.value?.removeEventListener('pause', onPause)
  veo.value?.removeEventListener('playing', onPlaying)
})
</script>
<template>
  <div class="m-video" :class="{'u-video-hover': !vplay}" :style="`width: ${width}px; height: ${height}px;`">
    <video
      ref="veo"
      :style="`object-fit: ${zoom};`"
      :src="videoSrc"
      :poster="poster"
      :width="width"
      :height="height"
      :autoplay="autoplay"
      :controls="!originPlay&&controls"
      :loop="loop"
      :muted="autoplay || muted"
      :preload="preload"
      crossorigin="anonymous"
      v-bind="$attrs"
      @loadeddata="poster ? (e: Event) => e.preventDefault():getPoster()"
      @click.prevent.once="onPlay">
      您的浏览器不支持video标签。
    </video>
    <svg v-show="originPlay || showPlay" class="u-play" :class="{'hidden': vplay}" :style="`width: ${playWidth}px; height: ${playWidth}px;`" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"></path>
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 12L9.75 8.75V15.25L15.25 12Z"></path>
    </svg>
  </div>
</template>
<style lang="less" scoped>
.m-video {
  display: inline-block;
  position: relative;
  background: #000;
  cursor: pointer;
  .u-play {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    fill: none;
    color: #FFF;
    pointer-events: none;
    opacity: 0.7;
    transition: opacity .3s;
  }
  .hidden {
    opacity: 0;
  }
}
.u-video-hover {
  &:hover {
    .u-play {
      opacity: 0.9;
    }
  }
}
</style>
