<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { rafTimeout, cancelRaf, useResizeObserver } from 'components/utils'
export interface Item {
  title: string // 文字标题
  href?: string // 跳转链接
  target?: '_self' | '_blank' // 跳转链接打开方式，href 存在时生效
}
export interface Props {
  items?: Item[] | Item // 滚动文字数组，single 为 true 时，类型为 Item；多条文字水平滚动时，数组长度必须大于等于 amount 才能滚动
  single?: boolean // 是否启用单条文字滚动效果，水平滚动时生效；为 true 时，amount 自动设为 1
  width?: number | string // 滚动区域宽度，单位 px
  height?: number // 滚动区域高度，单位 px
  itemStyle?: CSSProperties // 滚动文字样式
  hrefHoverColor?: string // 链接文字鼠标悬浮颜色；仅当 href 存在时生效
  amount?: number // 滚动区域展示条数，水平滚动时生效
  gap?: number // 水平滚动文字各列间距或垂直滚动文字两边的间距，单位 px
  speed?: number // 水平滚动时移动的速度，单位是像素每秒，水平滚动时生效
  vertical?: boolean // 是否垂直滚动
  duration?: number // 垂直滚动过渡持续时间，单位 ms，垂直滚动时生效
  interval?: number // 垂直文字滚动时间间隔，单位 ms，垂直滚动时生效
  pauseOnMouseEnter?: boolean // 鼠标移入是否暂停滚动
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  single: false,
  width: '100%',
  height: 50,
  itemStyle: () => ({}),
  hrefHoverColor: '#1677ff',
  amount: 4,
  gap: 20,
  speed: 48,
  vertical: false,
  duration: 1000,
  interval: 3000,
  pauseOnMouseEnter: true
})
const horizontalRef = ref() // 水平滚动 DOM 引用
const horizontalWrapWidth = ref<number>(0) // 水平滚动容器宽度
const verticalRef = ref() // 垂直滚动 DOM 引用
const groupRef = ref() // 水平滚动内容 DOM 引用
const groupWidth = ref<number>(0) // 水平滚动内容宽度
const playState = ref<'paused' | 'running'>('paused') // 水平滚动动画执行状态
const reset = ref<boolean>(true) // 重置水平滚动动画状态
const activeIndex = ref(0) // 垂直滚动当前索引
const verticalMoveRaf = ref() // 垂直滚动定时器引用标识
const originVertical = ref<boolean>(true) // 垂直滚动初始状态
const emit = defineEmits(['click'])
const scrollItems = ref<Item[]>([])
const itemsAmount = computed(() => {
  return scrollItems.value.length
})
const scrollBoardStyle = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
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
const itemWidth = computed(() => {
  // 水平滚动单条文字宽度
  return parseFloat((horizontalWrapWidth.value / displayAmount.value).toFixed(2))
})
const horizontalDuration = computed(() => {
  return groupWidth.value / props.speed
})
watch(
  () => props.items,
  () => {
    if (props.single) {
      scrollItems.value = [props.items] as Item[]
    } else {
      if (props.vertical && (props.items as Item[]).length === 1) {
        scrollItems.value = [...props.items as Item[], ...props.items as Item[]]
      } else {
        scrollItems.value = [...(props.items as Item[])]
      }
    }
  },
  {
    immediate: true
  }
)
watch(scrollItems, () => {
  resetMove()
})
watch(
  () => [props.vertical, props.interval],
  () => {
    initScroll()
  },
  {
    deep: true,
    flush: 'post'
  }
)
useResizeObserver([horizontalRef, groupRef, verticalRef], () => {
  initScroll()
})
function initScroll() {
  if (!props.vertical) {
    getScrollSize()
  } else {
    originVertical.value = true
  }
  startMove() // 开始滚动
}
// 获取水平滚动容器宽度；水平滚动内容宽度
function getScrollSize() {
  horizontalWrapWidth.value = horizontalRef.value.offsetWidth
  groupWidth.value = groupRef.value.offsetWidth
}
// 重置水平滚动状态
function resetScrollState() {
  playState.value = 'paused'
  nextTick(() => {
    void horizontalRef.value?.offsetTop // 强制浏览器触发重排
    playState.value = 'running'
  })
}
// 当 CSS Animation 运动到最后一帧时触发
function onAnimationIteration() {
  resetScrollState()
}
// 滚动开始
function startMove() {
  if (props.vertical) {
    if (itemsAmount.value > 1) {
      reset.value = false
      verticalMove() // 垂直滚动
    }
  } else {
    if (itemsAmount.value >= displayAmount.value) {
      // 超过 amount 条开始滚动
      reset.value = false
      playState.value = 'running' // 水平滚动
    }
  }
}
// 滚动暂停
function stopMove() {
  if (props.vertical) {
    originVertical.value = false
    verticalMoveRaf.value && cancelRaf(verticalMoveRaf.value)
  } else {
    playState.value = 'paused'
  }
}
// 滚动重置
function resetMove() {
  if (props.vertical) {
    activeIndex.value = 0
  } else {
    playState.value = 'paused'
    reset.value = true
  }
  nextTick(() => {
    void horizontalRef.value?.offsetTop
    startMove()
  })
}
function verticalMove() {
  verticalMoveRaf.value = rafTimeout(
    () => {
      if (originVertical.value) {
        originVertical.value = false
      }
      activeIndex.value = (activeIndex.value + 1) % itemsAmount.value
      verticalMove()
    },
    originVertical.value ? props.interval : props.interval + props.duration
  )
  
}
function onClick(item: Item) {
  emit('click', item)
}
defineExpose({
  start: startMove,
  stop: stopMove,
  reset: resetMove
})
</script>
<template>
  <div
    v-if="!vertical"
    ref="horizontalRef"
    class="m-scroll-horizontal"
    :style="[
      scrollBoardStyle,
      `
        --scroll-shadow-color: #d3d3d3;
        --scroll-bg-color: #fff;
        --scroll-href-hover-color: ${hrefHoverColor};
        --scroll-item-gap: ${gap}px;
        --scroll-play-state: ${playState};
        --scroll-duration: ${horizontalDuration}s;
        --scroll-delay: 0s;
        --scroll-iteration-count: infinite;
      `
    ]"
    @mouseenter="pauseOnMouseEnter ? stopMove() : () => false"
    @mouseleave="pauseOnMouseEnter ? startMove() : () => false"
  >
    <div
      ref="groupRef"
      class="scroll-items-group"
      :class="{ 'scroll-items-reset': reset }"
      @animationiteration="onAnimationIteration"
    >
      <component
        :is="item.href ? 'a' : 'div'"
        class="scroll-item"
        :class="{ 'href-item': item.href }"
        :style="[itemStyle, `width: ${itemWidth}px;`]"
        v-for="(item, index) in <Item[]>scrollItems"
        :key="index"
        :title="item.title"
        :href="item.href"
        :target="item.target"
        @click="onClick(item)"
      >
        {{ item.title }}
      </component>
    </div>
    <div class="scroll-items-group" :class="{ 'scroll-items-reset': reset }">
      <component
        :is="item.href ? 'a' : 'div'"
        class="scroll-item"
        :class="{ 'href-item': item.href }"
        :style="[itemStyle, `width: ${itemWidth}px;`]"
        v-for="(item, index) in scrollItems"
        :key="index"
        :title="item.title"
        :href="item.href"
        :target="item.target"
        @click="onClick(item)"
      >
        {{ item.title }}
      </component>
    </div>
  </div>
  <div
    v-else
    ref="verticalRef"
    class="m-scroll-vertical"
    :style="[
      scrollBoardStyle,
      `
        --scroll-shadow-color: #d3d3d3;
        --scroll-bg-color: #fff;
        --scroll-href-hover-color: ${hrefHoverColor};
        --scroll-duration: ${duration}ms;
        --scroll-timing-function: ease;
        --scroll-scale: 0.5;
        --scroll-item-padding: ${gap}px;
      `
    ]"
    @mouseenter="pauseOnMouseEnter ? stopMove() : () => false"
    @mouseleave="pauseOnMouseEnter ? startMove() : () => false"
  >
    <TransitionGroup name="slide">
      <div
        class="scroll-item-wrap"
        v-for="(item, index) in scrollItems"
        :key="index"
        v-show="activeIndex === index"
      >
        <component
          :is="item.href ? 'a' : 'div'"
          class="scroll-item"
          :class="{ 'href-item': item.href }"
          :style="itemStyle"
          :title="item.title"
          :href="item.href"
          :target="item.target"
          @click="onClick(item)"
        >
          {{ item.title }}
        </component>
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
// 水平滚动
.m-scroll-horizontal {
  overflow: hidden;
  display: flex;
  box-shadow: 0px 0px 5px var(--scroll-shadow-color);
  border-radius: 6px;
  background-color: var(--scroll-bg-color);
  .scroll-items-group {
    min-width: 100%;
    flex: 0 0 auto;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: horizontalScroll var(--scroll-duration) linear var(--scroll-delay) var(--scroll-iteration-count);
    animation-play-state: var(--scroll-play-state);
    @keyframes horizontalScroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    .scroll-item {
      padding-left: var(--scroll-item-gap);
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.57;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .href-item {
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: var(--scroll-href-hover-color) !important;
      }
    }
  }
  .scroll-items-reset {
    animation: none;
  }
}
// 垂直滚动
.slide-enter-active,
.slide-leave-active {
  transition: all var(--scroll-duration) var(--scroll-timing-function);
}
.slide-enter-from {
  transform: translateY(100%) scale(var(--scroll-scale));
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-100%) scale(var(--scroll-scale));
  opacity: 0;
}
.m-scroll-vertical {
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 5px var(--scroll-shadow-color);
  border-radius: 6px;
  background-color: var(--scroll-bg-color);
  .scroll-item-wrap {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--scroll-item-padding);
    .scroll-item {
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.57;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .href-item {
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: var(--scroll-href-hover-color) !important;
      }
    }
  }
}
</style>
