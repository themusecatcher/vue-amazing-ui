<script setup lang="ts">
import { ref, computed, watch } from 'vue'
export interface Props {
  width?: string | number // 视频播放器宽度，单位 px
  height?: string | number // 视频播放器高度，单位 px
  src?: string // 视频文件地址，支持网络地址 https 和相对地址
  poster?: string // 视频封面地址，支持网络地址 https 和相对地址
  second?: number // 在未设置封面时，自动截取视频第 second 秒对应帧作为视频封面，单位 s
  fit?: 'none' | 'fill' | 'contain' | 'cover' // 视频封面和内容的缩放规则，参考 object-fit
  autoplay?: boolean // 视频就绪后是否马上播放，优先级高于 preload
  controls?: boolean // 是否向用户显示控件，比如进度条，全屏等
  loop?: boolean // 视频播放完成后，是否循环播放
  muted?: boolean // 是否静音
  preload?: 'auto' | 'metadata' | 'none' // 是否在页面加载后载入视频，如果设置了 autoplay 属性，则 preload 将被忽略
  playIcon?: boolean // 播放暂停时是否显示播放器中间的暂停图标
  iconSize?: number // 暂停图标尺寸，单位 px
}
const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 450,
  src: undefined,
  poster: undefined,
  second: 0.5,
  /*
    fit 可选属性：
    none: 保存原有内容，不进行缩放;
    fill: 不保持原有比例，内容拉伸填充整个内容容器;
    contain: 保存原有比例，内容以包含方式缩放;
    cover: 保存原有比例，内容以覆盖方式缩放
  */
  fit: 'contain',
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
    metadata: 当页面加载后仅加载视频的元数据（例如长度），建议使用 metadata，以便视频自动获取第一帧作为封面 poster
    none: 页面加载后不应加载视频
  */
  preload: 'metadata',
  playIcon: true,
  iconSize: 80
})
const veoRef = ref() // 视频元素模板引用，参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
const veoPoster = ref() // 自动截取视频帧生成的封面
const playing = ref<boolean>(false) // 是否正在播放
const originPlay = ref<boolean>(true) // 是否第一次播放
const showPlayIcon = ref<boolean>(false) // 是否展示播放器中间的播放按钮图标
const emits = defineEmits(['play', 'pause'])
const veoWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const veoHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})
watch(
  () => props.second,
  () => {
    getPoster()
  }
)
watch(
  () => props.autoplay,
  (to) => {
    if (to) {
      showPlayIcon.value = false
      originPlay.value = false
      playing.value = true
    } else {
      showPlayIcon.value = true
      originPlay.value = true
      playing.value = false
      veoRef.value?.pause()
    }
  },
  {
    immediate: true,
    flush: 'post'
  }
)
/*
  自定义设置播放速度，经测试：
  在vue2中需设置：this.$refs.veoRef.playbackRate = 2
  在vue3中需设置：veoRef.value.defaultPlaybackRate = 2
*/
// veoRef.value.defaultPlaybackRate = 2
/*
  loadedmetadata 事件在元数据（metadata）被加载完成后触发
  loadeddata 事件在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发
    若在移动/平板设备的浏览器设置中开启了流量节省（data-saver）模式，该事件则不会被触发。
  preload 为 none 时不会触发
*/
function getPoster() {
  // 在未设置封面时，自动截取视频0.5s对应帧作为视频封面
  // 由于不少视频第一帧为黑屏，故设置视频开始播放时间为0.5s，即取该时刻帧作为封面图
  if (veoRef.value) {
    veoRef.value.currentTime = props.second
    // 创建canvas元素
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // canvas画图
    canvas.width = veoRef.value.videoWidth
    canvas.height = veoRef.value.videoHeight
    ctx?.drawImage(veoRef.value, 0, 0, canvas.width, canvas.height)
    // 把canvas转成base64编码格式
    veoPoster.value = canvas.toDataURL('image/png')
  }
}
function onClickPlay() {
  if (originPlay.value) {
    originPlay.value = false
    veoRef.value.currentTime = 0
  }
  if (playing.value) {
    veoRef.value.pause()
  } else {
    veoRef.value.play()
  }
}
function onPause() {
  playing.value = false
  if (props.playIcon) {
    showPlayIcon.value = true
  }
  emits('pause')
}
function onPlay() {
  playing.value = true
  if (props.playIcon) {
    showPlayIcon.value = false
  }
  emits('play')
}
function play() {
  if (originPlay.value) {
    originPlay.value = false
    veoRef.value.currentTime = 0
  }
  if (!playing.value) {
    veoRef.value.play()
  }
}
function pause() {
  if (playing.value) {
    veoRef.value.pause()
  }
}
defineExpose({
  play,
  pause
})
</script>
<template>
  <div
    class="m-video"
    :class="{ 'video-hover': showPlayIcon }"
    :style="`--video-width: ${veoWidth}; --video-height: ${veoHeight}; --video-icon-scale: ${iconSize / 80};`"
  >
    <video
      ref="veoRef"
      class="u-video"
      :style="`object-fit: ${fit};`"
      :src="src"
      :poster="poster ? poster : veoPoster"
      :autoplay="autoplay"
      :controls="!originPlay && controls"
      :loop="loop"
      :muted="autoplay || muted"
      :preload="preload"
      crossorigin="anonymous"
      @loadedmetadata="poster ? () => false : getPoster()"
      @pause="onPause()"
      @play="onPlay()"
      @click.prevent="onClickPlay"
      v-bind="$attrs"
    >
      您的浏览器不支持video标签。
    </video>
    <span v-show="originPlay || playIcon" class="icon-play" :class="{ 'icon-show': showPlayIcon }">
      <svg class="play-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
        <path
          d="M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z"
        ></path>
      </svg>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-video {
  width: var(--video-width);
  height: var(--video-height);
  position: relative;
  background: #000;
  cursor: pointer;
  .u-video {
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }
  .icon-play {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 80px;
    height: 80px;
    transform: scale(var(--video-icon-scale));
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    pointer-events: none;
    transition: background-color 0.3s;
    .play-svg {
      display: inline-block;
      color: #fff;
      fill: currentColor;
      width: 29px;
      height: 34px;
      margin-left: 3px;
    }
  }
  .icon-show {
    opacity: 1;
  }
}
.video-hover {
  &:hover {
    .icon-play {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
