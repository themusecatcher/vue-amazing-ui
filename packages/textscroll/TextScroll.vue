<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
const props = defineProps({
    sliderText: { // 滚动文字数组
      type: Array<any>,
      required: true,
      default: () => []
    },
    width: { // 滚动区域宽度
      type: [Number, String],
      default: '100%'
    },
    height: { // 滚动区域高度
      type: Number,
      default: 60
    },
    backgroundColor: { // 滚动区域背景色
      type: String,
      default: '#FFF'
    },
    amount: { // 滚动区域展示条数，水平滚动时生效
      type: Number,
      default: 4
    },
    gap: { // 水平滚动文字各列间距或垂直滚动文字两边的边距
      type: Number,
      default: 20
    },
    vertical: { // 是否垂直滚动
      type: Boolean,
      default: false
    },
    interval: { // 文字滚动时间间隔，垂直滚动时生效
      type: Number,
      default: 3000
    }
  })
// horizon
const left = ref(0)
const fpsRaf = ref() // fps回调标识
const moveRaf = ref() // 一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义
const start = ref(0)
const end = ref(0)
const fps = ref(60)
const textData = ref([...props.sliderText])
const horizonRef = ref()
const distance = ref(0) // 每条滚动文字移动距离

const step = computed(() => { // 移动参数（120fps: 0.5, 60fps: 1）
  if (fps.value === 60) {
    return 1
  } else {
    return 60 / fps.value
  }
})
function getFPS (timestamp: number) {
  // 单位ms，用1000ms/两个时间的间隔≈刷新频率fps
  // console.log('timestamp:', timestamp)
  if (fpsRaf.value === 2) {
    start.value = timestamp
  }
  if (fpsRaf.value === 3) {
    end.value = timestamp
    // 计算屏幕刷新率
    fps.value = Math.floor(1000 / (end.value - start.value))
    console.log('fps:', fps.value)
    console.log('step:', step.value)
  }
  fpsRaf.value = requestAnimationFrame(getFPS)
  if (fpsRaf.value > 3) {
    cancelAnimationFrame(fpsRaf.value)
    distance.value = getDistance() // 获取每列文字宽度
    onStart() // 开始滚动
  }
}
function getDistance ():number {
  return parseFloat((horizonRef.value.offsetWidth / props.amount).toFixed(2))
}
function moveLeft () {
  if (left.value >= distance.value) {
    textData.value.push(textData.value.shift()) // 将第一条数据放到最后
    left.value = 0
  } else {
    left.value += step.value // 每次移动step（px）
  }
  moveRaf.value = requestAnimationFrame(moveLeft)
}

const totalWidth = computed(() => { // 文字滚动区域总宽度
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const len = computed(() => {
  return props.sliderText.length
})
onMounted(() => {
  if (props.vertical) {
    onStart() // 启动垂直滚动
    window.onfocus = () => { // 页面激活
      onStart()
    }
    window.onblur = () => { // 页面失焦
      onStop()
    }
  } else {
    fpsRaf.value = requestAnimationFrame(getFPS)
  }
})
function onStart () {
  if (props.vertical) {
    if (len.value > 1) {
      startMove() // 开始滚动
    }
  } else {
    if (textData.value.length > props.amount) { // 超过amount条开始滚动
      moveRaf.value = requestAnimationFrame(moveLeft) // 开始动画
    }
  }
}
function onStop () {
  if (props.vertical) {
    if (len.value > 1) {
      clearTimeout(timer.value) // 暂停滚动
      // timer.value = null
    }
  } else {
    cancelAnimationFrame(moveRaf.value) // 暂停动画
  }
}
const emit = defineEmits(['click'])
function onClick (title: string) { // 通知父组件点击的标题
  emit('click', title)
}

// vertical
const actIndex = ref(0)
const timer = ref()
function startMove () {
  timer.value = setTimeout(() => {
    if (actIndex.value === len.value - 1) {
      actIndex.value = 0
    } else {
      actIndex.value++
    }
    startMove()
  }, props.interval)
}
</script>
<template>
  <div v-if="!vertical" class="m-slider-horizon" @mouseenter="onStop" @mouseleave="onStart" ref="horizonRef" :style="`height: ${height}px; width: ${totalWidth}; background: ${backgroundColor};`">
    <a
      :style="`will-change: transform; transform: translateX(${-left}px); width: ${distance - gap}px; margin-left: ${gap}px;`"
      class="u-slide-title"
      v-for="(text, index) in textData"
      :key="index"
      :title="text.title"
      :href="text.link ? text.link:'javascript:;'"
      :target="text.link ? '_blank':'_self'"
      @click="onClick(text.title)">
      {{ text.title || '--' }}
    </a>
  </div>
  <div v-else class="m-slider-vertical" @mouseenter="onStop" @mouseleave="onStart" :style="`height: ${height}px; width: ${totalWidth}; background: ${backgroundColor};`">
    <TransitionGroup name="slide">
      <div
        class="m-slider"
        :style="`width: calc(${totalWidth} - ${2*gap}px); height: ${height}px;`"
        v-for="(text, index) in sliderText"
        :key="text"
        v-show="actIndex===index">
        <a
          class="u-slider"
          :title="text.title"
          :href="text.link ? text.link:'javascript:;'"
          :target="text.link ? '_blank':'_self'"
          @click="onClick(text.title)">
        {{ text.title }}</a>
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
// 水平滚动
.m-slider-horizon {
  box-shadow: 0px 0px 5px #D3D3D3;
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-align: center; // 水平居中
  &:after { // 垂直居中
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .u-slide-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #333;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      color: @themeColor;
    }
  }
}

// 垂直滚动
.slide-enter-active, .slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from {
  transform: translateY(50px) scale(0.6);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-50px) scale(0.6);
  opacity: 0;
}
.m-slider-vertical {
  position: relative;
  overflow: hidden;
  .m-slider {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center; // 水平居中
    &:after { // 垂直居中
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .u-slider {
      max-width: 100%;
      display: inline-block;
      vertical-align: middle;
      font-size: 18px;
      line-height: 28px;
      color: #333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
</style>