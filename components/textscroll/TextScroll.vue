<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf, useResizeObserver } from 'components/utils'
export interface Text {
  title: string // 文字标题
  href?: string // 跳转链接
  target?: '_self' | '_blank' // 跳转链接打开方式，href 存在时生效
}
export interface Props {
  scrollText?: Text[] | Text // 滚动文字数组，single 为 true 时，类型为 Text；多条文字滚动时，数组长度必须大于等于 amount 才能滚动
  single?: boolean // 是否启用单条文字滚动效果，只支持水平文字滚动，为 true 时，amount 自动设为 1
  width?: number | string // 滚动区域宽度，单位 px
  height?: number // 滚动区域高度，单位 px
  boardStyle?: CSSProperties // 滚动区域样式，优先级低于 width、height
  textStyle?: CSSProperties // 滚动文字样式
  hrefHoverColor?: string // 链接文字鼠标悬浮颜色；仅当 href 存在时生效
  amount?: number // 滚动区域展示条数，水平滚动时生效
  gap?: number // 水平滚动文字各列间距或垂直滚动文字两边的边距，单位 px
  interval?: number // 水平滚动动画执行时间间隔，单位 ms，水平滚动时生效
  step?: number // 水平滚动动画每次执行时移动距离，单位 px，水平滚动时生效，与 interval 配合控制滚动速度
  vertical?: boolean // 是否垂直滚动
  verticalInterval?: number // 垂直文字滚动时间间隔，单位 ms，垂直滚动时生效
}
const props = withDefaults(defineProps<Props>(), {
  scrollText: () => [],
  single: false,
  width: '100%',
  height: 50,
  boardStyle: () => ({}),
  textStyle: () => ({}),
  hrefHoverColor: '#1677ff',
  amount: 4,
  gap: 20,
  interval: 10,
  step: 1,
  vertical: false,
  verticalInterval: 3000
})
const horizontalRef = ref() // 水平滚动 DOM 引用
const verticalRef = ref() // 垂直滚动 DOM 引用
const left = ref(0) // 水平滚动偏移距离
const distance = ref(0) // 每条滚动文字移动距离
const activeIndex = ref(0) // 垂直滚动当前索引
const horizontalMoveRaf = ref()
const verticalMoveRaf = ref()
const origin = ref(true) // 垂直滚动初始状态
const emit = defineEmits(['click'])
const textData = ref<Text[]>([])
const textAmount = computed(() => {
  return textData.value.length
})
const totalWidth = computed(() => {
  // 文字滚动区域总宽度
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else {
    return props.width
  }
})
const sliderBoardStyle = computed(() => {
  return {
    ...props.boardStyle,
    width: totalWidth.value,
    height: `${props.height}px`
  }
})
const displayAmount = computed(() => {
  if (props.single) {
    return 1
  } else {
    return props.amount
  }
})
watch(
  () => [
    textData.value,
    props.width,
    props.amount,
    props.gap,
    props.step,
    props.interval,
    props.vertical,
    props.verticalInterval
  ],
  () => {
    initScroll()
  },
  {
    deep: true, // 强制转成深层侦听器
    flush: 'post'
  }
)
watchEffect(() => {
  initScrollText()
})
useResizeObserver([horizontalRef, verticalRef], () => {
  initScroll()
})
function initScrollText() {
  left.value = 0
  activeIndex.value = 0
  if (props.single) {
    textData.value = [props.scrollText, props.scrollText] as Text[]
  } else {
    const text = props.scrollText as Text[]
    if (text.length === props.amount) {
      textData.value = [...text, ...text]
    } else {
      textData.value = [...text]
    }
  }
}
function initScroll() {
  if (!props.vertical) {
    distance.value = getDistance() // 获取每列文字宽度
  } else {
    origin.value = true
  }
  horizontalMoveRaf.value && cancelRaf(horizontalMoveRaf.value)
  verticalMoveRaf.value && cancelRaf(verticalMoveRaf.value)
  startMove() // 开始滚动
}
function getDistance(): number {
  return parseFloat((horizontalRef.value.offsetWidth / displayAmount.value).toFixed(2))
}
function startMove() {
  if (props.vertical) {
    if (textAmount.value > 1) {
      verticalMoveRaf.value && cancelRaf(verticalMoveRaf.value)
      verticalMove() // 垂直滚动
    }
  } else {
    if (textAmount.value > displayAmount.value) {
      // 超过 amount 条开始滚动
      horizontalMoveRaf.value && cancelRaf(horizontalMoveRaf.value)
      horizonMove() // 水平滚动
    }
  }
}
function stopMove() {
  // 暂停动画
  if (props.vertical) {
    verticalMoveRaf.value && cancelRaf(verticalMoveRaf.value)
  } else {
    horizontalMoveRaf.value && cancelRaf(horizontalMoveRaf.value)
  }
}
function horizonMove() {
  horizontalMoveRaf.value = rafTimeout(
    () => {
      if (left.value >= distance.value) {
        textData.value.push(textData.value.shift() as Text) // 将第一条数据放到最后
        left.value = 0
      } else {
        left.value += props.step // 每次移动 step px
      }
    },
    props.interval,
    true
  )
}
function verticalMove() {
  verticalMoveRaf.value = rafTimeout(
    () => {
      if (origin.value) {
        origin.value = false
      }
      activeIndex.value = (activeIndex.value + 1) % textAmount.value
      verticalMove()
    },
    origin.value ? props.verticalInterval : props.verticalInterval + 1000
  )
}
function onClick(text: Text) {
  emit('click', text)
}
defineExpose({
  start: startMove,
  stop: stopMove,
  reset: initScrollText
})
</script>
<template>
  <div
    v-if="!vertical"
    ref="horizontalRef"
    class="m-slider-horizontal"
    :style="[
      sliderBoardStyle,
      `--shadow-color: #d3d3d3; --bg-color: #fff; --href-hover-color: ${hrefHoverColor}; --text-gap: ${gap}px;`
    ]"
  >
    <div class="m-scroll-view" :style="`will-change: transform; transform: translateX(${-left}px);`">
      <component
        :is="text.href ? 'a' : 'div'"
        class="slide-text"
        :class="{ 'href-text': text.href }"
        :style="[textStyle, `width: ${distance}px;`]"
        v-for="(text, index) in <Text[]>textData"
        :key="index"
        :title="text.title"
        :href="text.href"
        :target="text.target"
        @mouseenter="stopMove"
        @mouseleave="startMove"
        @click="onClick(text)"
      >
        {{ text.title }}
      </component>
    </div>
  </div>
  <div
    v-else
    ref="verticalRef"
    class="m-slider-vertical"
    :style="[
      sliderBoardStyle,
      `--shadow-color: #d3d3d3; --bg-color: #fff; --href-hover-color: ${hrefHoverColor}; --enter-move: ${height}px; --leave-move: ${-height}px; --tex-gap: ${gap}px;`
    ]"
  >
    <TransitionGroup name="slide">
      <div class="m-scroll-view" v-for="(text, index) in <Text[]>textData" :key="index" v-show="activeIndex === index">
        <component
          :is="text.href ? 'a' : 'div'"
          class="slide-text"
          :class="{ 'href-text': text.href }"
          :style="textStyle"
          :title="text.title"
          :href="text.href"
          :target="text.target"
          @mouseenter="stopMove"
          @mouseleave="startMove"
          @click="onClick(text)"
        >
          {{ text.title }}
        </component>
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
// 水平滚动
.m-slider-horizontal {
  overflow: hidden;
  box-shadow: 0px 0px 5px var(--shadow-color);
  border-radius: 6px;
  background-color: var(--bg-color);
  .m-scroll-view {
    height: 100%;
    display: inline-flex;
    align-items: center;
    .slide-text {
      padding-left: var(--text-gap);
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.57;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .href-text {
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: var(--href-hover-color) !important;
      }
    }
  }
}
// 垂直滚动
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from {
  transform: translateY(var(--enter-move)) scale(0.5);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(var(--leave-move)) scale(0.5);
  opacity: 0;
}
.m-slider-vertical {
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 5px var(--shadow-color);
  border-radius: 6px;
  background-color: var(--bg-color);
  .m-scroll-view {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--tex-gap);
    .slide-text {
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.57;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .href-text {
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: var(--href-hover-color) !important;
      }
    }
  }
}
</style>
