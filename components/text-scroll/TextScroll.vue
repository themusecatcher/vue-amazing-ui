<script setup lang="ts">
import { ref, computed, watch, nextTick, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import type { ComponentPublicInstance, CSSProperties } from 'vue'
import Ellipsis, { type EllipsisProps } from 'components/ellipsis'
import { useResizeObserver } from 'components/utils'
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
  amount?: number | false // 滚动区域展示条数，为 false 时所有文字平铺展示，水平滚动时生效
  gap?: number // 水平滚动文字各列间距或垂直滚动文字两边的间距，单位 px
  speed?: number // 水平滚动时移动的速度，单位是像素每秒，水平滚动时生效
  vertical?: boolean // 是否垂直滚动
  duration?: number // 垂直滚动过渡持续时间，单位 ms，垂直滚动时生效
  interval?: number // 垂直文字滚动时间间隔，单位 ms，垂直滚动时生效
  ellipsis?: boolean // 是否启用文本省略组件
  ellipsisProps?: EllipsisProps // Ellipsis 组件属性配置，参考 Ellipsis Props，用于配置文本省略弹出提示
  pauseOnMouseEnter?: boolean // 鼠标移入是否暂停滚动
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  single: false,
  width: '100%',
  height: 50,
  itemStyle: () => ({}),
  hrefHoverColor: undefined,
  amount: 4,
  gap: 20,
  speed: 48,
  vertical: false,
  duration: 1000,
  interval: 3000,
  ellipsis: false,
  ellipsisProps: () => ({}),
  pauseOnMouseEnter: false
})
const horizontalRef = ref<HTMLElement | null>(null) // 水平滚动 DOM 引用
const horizontalWrapWidth = ref<number>(0) // 水平滚动容器宽度
const verticalRef = ref<HTMLElement | null>(null) // 垂直滚动 DOM 引用
const groupRef = ref<HTMLElement | null>(null) // 水平滚动内容 DOM 引用
const groupWidth = ref<number>(0) // 水平滚动内容宽度
const playState = ref<'paused' | 'running'>('paused') // 水平滚动动画执行状态
const reset = ref<boolean>(true) // 重置水平滚动动画状态
const activeIndex = ref<number>(0) // 垂直滚动当前索引
const verticalMoveTimer = ref<ReturnType<typeof setTimeout> | null>(null) // 垂直滚动定时器引用标识
const atRest = ref<boolean>(true) // 当前没有待完成的位移过渡
const resumeAfterActivate = ref<boolean>(false) // 失活前是否处于滚动状态，用于恢复播放
const emit = defineEmits(['click'])
let disposed = false // 组件已卸载，禁止再启动新的节拍链
// 派生滚动目标文字数组：single 包装为单条，垂直单条复制两份以便首尾相接
const normalizedItems = computed<Item[]>(() => {
  const { items, single, vertical } = props
  if (single) {
    return [items as Item]
  }
  const list = Array.isArray(items) ? items : [items]
  return vertical && list.length === 1 ? [...list, ...list] : [...list]
})
const itemsAmount = computed(() => {
  return normalizedItems.value.length
})
// 文字滚动区域尺寸样式
const scrollBoardStyle = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: `${props.height}px`
  }
})
// 水平滚动时展示条数
const displayAmount = computed(() => {
  if (props.single) {
    return 1
  }
  if (props.amount === false) {
    return 0
  }
  return Math.max(1, props.amount) // 兜底：amount 为 0 或负数时不参与除法，避免窄宽度算出 Infinity
})
const itemWidth = computed(() => {
  // 水平滚动单条文字宽度
  if (props.amount === false) {
    return 'auto'
  }
  // 限制两位小数：多列分摊的亚像素误差会在两组接缝处累计成 1px 缝隙
  const width = Math.round((horizontalWrapWidth.value / displayAmount.value) * 100) / 100
  return `${width - props.gap}px`
})
// 条目自身样式：启用省略时样式由 Ellipsis 的文本容器承载
const plainItemStyle = computed<CSSProperties>(() => (props.ellipsis ? {} : props.itemStyle))
const animationDuration = computed(() => {
  // 水平滚动动画持续时间
  return groupWidth.value / props.speed
})
// 深监听不可省：消费方原地改写 items[0].title 时数组引用不变，浅监听不会触发复位
watch(normalizedItems, () => resetMove(), { deep: true })
watch(
  [() => props.vertical, () => props.duration, () => props.interval],
  () => {
    initScroll()
  },
  {
    flush: 'post'
  }
)
useResizeObserver([horizontalRef, groupRef, verticalRef], () => {
  initScroll()
})
function clearVerticalTimer(): void {
  if (verticalMoveTimer.value === null) return
  clearTimeout(verticalMoveTimer.value)
  verticalMoveTimer.value = null
}
function initScroll(): void {
  clearVerticalTimer()
  atRest.value = true
  if (!props.vertical) {
    getScrollSize()
  }
  startMove() // 开始滚动
}
// 获取水平滚动容器宽度；水平滚动内容宽度
function getScrollSize(): void {
  if (!horizontalRef.value || !groupRef.value) return
  horizontalWrapWidth.value = horizontalRef.value.offsetWidth
  groupWidth.value = groupRef.value.offsetWidth
}
// 水平滚动内容 DOM 引用（渲染两份分组，仅首个分组需取宽度）
function setGroupRef(el: Element | ComponentPublicInstance | null): void {
  groupRef.value = el as HTMLElement | null
}
// 重置水平滚动状态
function resetScrollState(): void {
  playState.value = 'paused'
  nextTick(() => {
    void horizontalRef.value?.offsetTop // 强制浏览器触发重排
    playState.value = 'running'
  })
}
// 当 CSS Animation 运动到最后一帧时触发
function onAnimationIteration(): void {
  resetScrollState()
}
function verticalMove(): void {
  // 稳态周期 = 停留 interval + 过渡 duration（与轮播图的 interval 同口径），每次触发后再排下一拍，避免堆积
  const cycle = props.interval + props.duration
  const tick = (): void => {
    atRest.value = false
    activeIndex.value = (activeIndex.value + 1) % itemsAmount.value
    verticalMoveTimer.value = setTimeout(tick, cycle)
  }
  // 静止态起链时当前条已停留过，首拍只等 interval；复位刚触发过一趟过渡时，首拍需再补一个 duration 等它落位
  verticalMoveTimer.value = setTimeout(tick, atRest.value ? props.interval : cycle)
}
function onClick(item: Item): void {
  emit('click', item)
}
function onMouseEnter(): void {
  if (!props.pauseOnMouseEnter) return
  stopMove()
}
function onMouseLeave(): void {
  if (!props.pauseOnMouseEnter) return
  startMove()
}
// 滚动开始；可重入保护：节拍链已在运行时直接返回，避免并存两条链
function startMove(): void {
  if (disposed) return
  if (props.vertical) {
    if (verticalMoveTimer.value !== null) return
    if (itemsAmount.value >= 1) {
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
function stopMove(): void {
  if (props.vertical) {
    atRest.value = true
    clearVerticalTimer()
  } else {
    playState.value = 'paused'
  }
}
// 滚动重置
function resetMove(): void {
  if (props.vertical) {
    clearVerticalTimer()
    if (activeIndex.value !== 0) {
      activeIndex.value = 0
      atRest.value = false
    } else {
      atRest.value = true
    }
    startMove()
  } else {
    playState.value = 'paused'
    reset.value = true
    nextTick(() => {
      void horizontalRef.value?.offsetTop
      startMove()
    })
  }
}
// KeepAlive 失活时组件不卸载，定时器需自行收尾，否则会持续推进到返回页面
onDeactivated(() => {
  resumeAfterActivate.value = props.vertical ? verticalMoveTimer.value !== null : playState.value === 'running'
  stopMove()
})
onActivated(() => {
  if (!resumeAfterActivate.value) return
  resumeAfterActivate.value = false
  startMove()
})
onBeforeUnmount(() => {
  disposed = true
  clearVerticalTimer()
})
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
    class="text-scroll-horizontal"
    :style="[
      scrollBoardStyle,
      `
        --text-scroll-href-hover-color: ${hrefHoverColor || 'var(--va-cp-text-scroll-primary-color, var(--va-primary-color))'};
        --text-scroll-item-gap: ${gap}px;
        --text-scroll-play-state: ${playState};
        --text-scroll-duration: ${animationDuration}s;
        --text-scroll-delay: 0s;
        --text-scroll-iteration-count: infinite;
      `
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- 两份内容分组首尾相接：首组测量宽度并接管动画复位，次组仅作无缝补位 -->
    <div
      v-for="groupIndex in 2"
      :key="groupIndex"
      :ref="groupIndex === 1 ? setGroupRef : undefined"
      class="scroll-items-group"
      :class="{ 'scroll-items-reset': reset }"
      v-on="groupIndex === 1 ? { animationiteration: onAnimationIteration } : {}"
    >
      <component
        :is="item.href ? 'a' : 'div'"
        v-for="(item, index) in normalizedItems"
        :key="index"
        class="scroll-item"
        :class="{ 'href-item': !ellipsis && item.href }"
        :style="[plainItemStyle, `width: ${itemWidth};`]"
        :title="ellipsis ? null : item.title"
        :href="item.href"
        :target="item.target"
        @click="onClick(item)"
      >
        <!-- 类名与文字样式走 class / style 通道：Ellipsis 的浮层按需挂载，落点恒为文本容器 -->
        <Ellipsis
          v-if="ellipsis"
          :max-width="itemWidth"
          :class="item.href ? 'href-item' : null"
          :style="itemStyle"
          v-bind="ellipsisProps"
        >
          {{ item.title }}
        </Ellipsis>
        <template v-else>{{ item.title }}</template>
      </component>
    </div>
  </div>
  <div
    v-else
    ref="verticalRef"
    class="text-scroll-vertical"
    :style="[
      scrollBoardStyle,
      `
        --text-scroll-href-hover-color: ${hrefHoverColor || 'var(--va-cp-text-scroll-primary-color, var(--va-primary-color))'};
        --text-scroll-duration: ${duration}ms;
        --text-scroll-timing-function: ease;
        --text-scroll-scale: 0.5;
        --text-scroll-item-padding: ${gap}px;
      `
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <TransitionGroup name="slide">
      <div
        class="scroll-item-wrap"
        v-for="(item, index) in normalizedItems"
        :key="index"
        v-show="activeIndex === index"
      >
        <component
          :is="item.href ? 'a' : 'div'"
          class="scroll-item"
          :class="{ 'href-item': !ellipsis && item.href }"
          :style="plainItemStyle"
          :title="ellipsis ? null : item.title"
          :href="item.href"
          :target="item.target"
          @click="onClick(item)"
        >
          <Ellipsis v-if="ellipsis" :class="item.href ? 'href-item' : null" :style="itemStyle" v-bind="ellipsisProps">
            {{ item.title }}
          </Ellipsis>
          <template v-else>{{ item.title }}</template>
        </component>
      </div>
    </TransitionGroup>
  </div>
</template>
<style lang="less" scoped>
// 滚动条目文字声明
.scroll-item-base() {
  font-size: 16px;
  font-weight: 400;
  color: var(--va-text-color-1);
  line-height: 1.57;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// 链接条目声明；悬浮色需盖过条目自身颜色
.href-item-base() {
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--text-scroll-href-hover-color) !important;
  }
  .ellipsis-container {
    cursor: inherit;
  }
}
// 水平滚动
.text-scroll-horizontal {
  overflow: hidden;
  display: flex;
  box-shadow: 0px 0px 5px var(--va-text-scroll-shadow-color, var(--va-border-color));
  border-radius: 6px;
  background-color: var(--va-text-scroll-bg-color, var(--va-bg-container-color));
  .scroll-items-group {
    z-index: 1;
    display: flex;
    align-items: center;
    will-change: transform;
    animation: horizontalScroll var(--text-scroll-duration) linear var(--text-scroll-delay)
      var(--text-scroll-iteration-count);
    animation-play-state: var(--text-scroll-play-state);
    @keyframes horizontalScroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    .scroll-item {
      margin-left: var(--text-scroll-item-gap);
      .scroll-item-base();
    }
    :deep(.href-item) {
      .href-item-base();
    }
  }
  .scroll-items-reset {
    animation: none;
  }
}
// 垂直滚动
.slide-enter-active,
.slide-leave-active {
  transition: all var(--text-scroll-duration) var(--text-scroll-timing-function);
}
.slide-enter-from {
  transform: translateY(100%) scale(var(--text-scroll-scale));
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-100%) scale(var(--text-scroll-scale));
  opacity: 0;
}
.text-scroll-vertical {
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0px 5px var(--va-text-scroll-shadow-color, var(--va-border-color));
  border-radius: 6px;
  background-color: var(--va-text-scroll-bg-color, var(--va-bg-container-color));
  .scroll-item-wrap {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--text-scroll-item-padding);
    .scroll-item {
      .scroll-item-base();
    }
    :deep(.href-item) {
      .href-item-base();
    }
  }
}
</style>
