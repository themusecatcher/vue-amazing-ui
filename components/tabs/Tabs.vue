<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { useResizeObserver, useSlotsExist, useInject } from 'components/utils'
export interface Item {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  tab?: string // 页签显示文字 string | slot
  icon?: VNode // 页签图标
  content?: string // 标签页内容 string | slot
  disabled?: boolean // 是否禁用页签
}
export interface Props {
  items?: Item[] // 标签页数组
  prefix?: string // 标签页前缀 string | slot
  suffix?: string // 标签页后缀 string | slot
  animated?: boolean // 是否启用切换动画，在 tabPosition: 'top' | 'bottom' 时有效
  centered?: boolean // 标签是否居中展示
  size?: 'small' | 'middle' | 'large' // 标签页大小
  type?: 'line' | 'card' // 标签页的类型
  tabGutter?: number // 页签之前的间隙大小，单位 px
  tabStyle?: CSSProperties // 自定义页签样式
  tabPosition?: 'top' | 'right' | 'bottom' | 'left' // 自定义页签位置
  contentStyle?: CSSProperties // 自定义内容样式
  activeKey?: string | number // (v-model) 当前激活 tab 面板的 key
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  prefix: undefined,
  suffix: undefined,
  animated: true,
  centered: false,
  size: 'middle',
  type: 'line',
  tabGutter: undefined,
  tabStyle: () => ({}),
  tabPosition: 'top',
  contentStyle: () => ({}),
  activeKey: undefined
})
const tabsRef = ref() // 所有 tabs 的 ref 模板引用
const tabBarLeft = ref(0) // tabBar 的水平偏移量
const tabBarTop = ref(0) // tabBar 的垂直偏移量
const tabBarWidth = ref(0) // tabBar 的宽度
const tabBarHeight = ref(0) // tabBar 的高度
const wrapRef = ref()
const wrapWidth = ref()
const wrapHeight = ref()
const navRef = ref()
const navWidth = ref()
const navHeight = ref()
const showWheel = ref(false) // 标签页是否存在滚动
const scrollMax = ref(0) // 最大滚动距离
const scrollLeft = ref(0) // 水平滚动距离
const scrollTop = ref(0) // 垂直滚动距离
const transition = ref(false)
const { colorPalettes } = useInject('Tabs') // 主题色注入
const emits = defineEmits(['update:activeKey', 'change'])
const slotsExist = useSlotsExist(['prefix', 'suffix'])
const activeIndex = computed(() => {
  return props.items.findIndex((page, index) => getPageKey(page.key, index) === props.activeKey)
})
const showPrefix = computed(() => {
  return Boolean(slotsExist.prefix || props.prefix)
})
const showSuffix = computed(() => {
  return Boolean(slotsExist.suffix || props.suffix)
})
const beforeShadowShow = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    // 水平位置
    return showWheel.value && scrollLeft.value > 0
  } else {
    // 垂直位置
    return showWheel.value && scrollTop.value > 0
  }
})
const afterShadowShow = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    // 水平位置
    return showWheel.value && scrollLeft.value < scrollMax.value
  } else {
    // 垂直位置
    return showWheel.value && scrollTop.value < scrollMax.value
  }
})
const navStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      transform: `translate(${-scrollLeft.value}px, 0)`
    }
  } else {
    return {
      transform: `translate(0, ${-scrollTop.value}px)`
    }
  }
})
const tabGutterStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      marginLeft: `${props.tabGutter}px`
    }
  } else {
    return {
      marginTop: `${props.tabGutter}px`
    }
  }
})
const tabBarStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      left: `${tabBarLeft.value}px`,
      width: `${tabBarWidth.value}px`
    }
  } else {
    return {
      top: `${tabBarTop.value}px`,
      height: `${tabBarHeight.value}px`
    }
  }
})
const animatedStyle = computed(() => {
  if (props.animated && ['top', 'bottom'].includes(props.tabPosition)) {
    return {
      marginLeft: `-${100 * (activeIndex.value !== -1 ? activeIndex.value : 0)}%`
    }
  }
  return {}
})
const hiddenStyle = computed(() => {
  if (props.animated && ['top', 'bottom'].includes(props.tabPosition)) {
    return {
      visibility: 'hidden',
      height: '0px',
      overflowY: 'hidden'
    }
  }
  return {
    display: 'none'
  }
})
watch(
  () => props.activeKey,
  () => {
    getBarDisplay()
  },
  {
    flush: 'post'
  }
)
onMounted(() => {
  getNavSize()
})
useResizeObserver([wrapRef, navRef], () => {
  getNavSize()
})
function getNavSize(): void {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    getNavHorizontalSize()
  } else {
    getNavVerticalSize()
  }
}
function getNavHorizontalSize(): void {
  wrapWidth.value = wrapRef.value.offsetWidth
  navWidth.value = navRef.value.offsetWidth
  if (navWidth.value > wrapWidth.value) {
    showWheel.value = true
    scrollMax.value = navWidth.value - wrapWidth.value
    scrollLeft.value = scrollMax.value
  } else {
    showWheel.value = false
    scrollLeft.value = 0
  }
  getBarDisplay()
}
function getNavVerticalSize(): void {
  wrapHeight.value = wrapRef.value.offsetHeight
  navHeight.value = navRef.value.offsetHeight
  if (navHeight.value > wrapHeight.value) {
    showWheel.value = true
    scrollMax.value = navHeight.value - wrapHeight.value
    scrollTop.value = scrollMax.value
  } else {
    showWheel.value = false
    scrollTop.value = 0
  }
  getBarDisplay()
}
function getBarDisplay(): void {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    getBarHorizontalDisplay()
  } else {
    getBarVerticalDisplay()
  }
}
function getBarHorizontalDisplay(): void {
  const el = activeIndex.value !== -1 ? tabsRef.value[activeIndex.value] : null
  if (el) {
    tabBarLeft.value = el.offsetLeft
    tabBarWidth.value = el.offsetWidth
    if (showWheel.value) {
      if (tabBarLeft.value < scrollLeft.value) {
        transition.value = true
        scrollLeft.value = tabBarLeft.value
      }
      const targetScroll = tabBarLeft.value + tabBarWidth.value - wrapWidth.value
      if (targetScroll > scrollLeft.value) {
        transition.value = true
        scrollLeft.value = targetScroll
      }
    }
  } else {
    tabBarLeft.value = 0
    tabBarWidth.value = 0
  }
}
function getBarVerticalDisplay(): void {
  const el = activeIndex.value !== -1 ? tabsRef.value[activeIndex.value] : null
  if (el) {
    tabBarTop.value = el.offsetTop
    tabBarHeight.value = el.offsetHeight
    if (showWheel.value) {
      if (tabBarTop.value < scrollTop.value) {
        transition.value = true
        scrollTop.value = tabBarTop.value
      }
      const targetScroll = tabBarTop.value + tabBarHeight.value - wrapHeight.value
      if (targetScroll > scrollTop.value) {
        transition.value = true
        scrollTop.value = targetScroll
      }
    }
  } else {
    tabBarTop.value = 0
    tabBarHeight.value = 0
  }
}
function getPageKey(key: string | number | undefined, index: number): string | number {
  if (key === undefined) {
    return index
  } else {
    return key
  }
}
function onTab(key: string | number): void {
  emits('update:activeKey', key)
  emits('change', key)
}
/*
  （触摸板滑动也会触发）监听滚轮事件，结合 transform: translate(-${scrollLeft}px, 0) 模拟滚动效果
  参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event
  WheelEvent:
  事件属性：
  WheelEvent.deltaX 只读：返回一个浮点数（double），表示水平方向的滚动量。
  WheelEvent.deltaY 只读：返回一个浮点数（double），表示垂直方向的滚动量。
  WheelEvent.deltaZ 只读：返回一个浮点数（double）表示 z 轴方向的滚动量。
  WheelEvent.deltaMode 只读：返回一个无符号长整型数（unsigned long），表示 delta* 值滚动量的单位。
*/
function onWheel(e: WheelEvent): void {
  e.stopPropagation()
  e.preventDefault() // 禁止浏览器捕获触摸板滑动事件
  if (e.deltaX || e.deltaY) {
    if (['top', 'bottom'].includes(props.tabPosition)) {
      // 水平滚动
      getHorizontalScroll(e)
    } else {
      // 垂直滚动
      getVerticalScroll(e)
    }
  }
}
function getHorizontalScroll(e: WheelEvent): void {
  const scrollX = (e.deltaX || e.deltaY) * 1 // 滚轮的水平滚动量
  if (scrollLeft.value + scrollX > scrollMax.value) {
    scrollLeft.value = scrollMax.value
  } else if (scrollLeft.value + scrollX < 0) {
    scrollLeft.value = 0
  } else {
    scrollLeft.value += scrollX
  }
}
function getVerticalScroll(e: WheelEvent): void {
  const scrollY = (e.deltaX || e.deltaY) * 1 // 滚轮的垂直滚动量
  if (scrollTop.value + scrollY > scrollMax.value) {
    scrollTop.value = scrollMax.value
  } else if (scrollTop.value + scrollY < 0) {
    scrollTop.value = 0
  } else {
    scrollTop.value += scrollY
  }
}
function getContentStyle(key: string | number | undefined, index: number): CSSProperties {
  if (props.activeKey !== getPageKey(key, index)) {
    return hiddenStyle.value as CSSProperties
  }
  return {}
}
</script>
<template>
  <div
    class="tabs-wrap"
    :class="[
      `tabs-${tabPosition} tabs-${size}`,
      {
        'tabs-card': type === 'card'
      }
    ]"
    :style="`--tabs-primary-color: ${colorPalettes[5]};`"
  >
    <div class="tabs-nav-container" :style="tabStyle">
      <div v-if="showPrefix" class="tabs-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </div>
      <div
        ref="wrapRef"
        class="tabs-nav-wrap"
        :class="{
          'tabs-center': centered,
          'before-shadow-active': beforeShadowShow,
          'after-shadow-active': afterShadowShow
        }"
      >
        <div
          ref="navRef"
          class="tabs-nav-list"
          :class="{ 'nav-transition': transition }"
          @transitionend="transition = false"
          :style="navStyle"
          @wheel="showWheel ? onWheel($event) : () => false"
        >
          <div
            ref="tabsRef"
            class="tab-item"
            :class="{
              'tab-line-active': type === 'line' && activeKey === getPageKey(item.key, index),
              'tab-card-active': type === 'card' && activeKey === getPageKey(item.key, index),
              'tab-disabled': item.disabled
            }"
            :style="index > 0 && tabGutter !== undefined ? tabGutterStyle : {}"
            @click="item.disabled ? () => false : onTab(getPageKey(item.key, index))"
            v-for="(item, index) in items"
            :key="index"
          >
            <slot name="tab" :item="item" :tab="item.tab" :key="getPageKey(item.key, index)">
              <component v-if="item.icon" :is="item.icon" />
              {{ item.tab }}
            </slot>
          </div>
          <div
            class="tab-bar"
            :class="{
              'tab-bar-disabled': items[activeIndex]?.disabled,
              'card-hidden': type === 'card'
            }"
            :style="tabBarStyle"
          ></div>
        </div>
      </div>
      <div v-if="showSuffix" class="tabs-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </div>
    </div>
    <div class="tabs-page-container" :style="contentStyle">
      <div
        class="tabs-content-wrap"
        :class="{ 'tabs-content-animated': animated && ['top', 'bottom'].includes(tabPosition) }"
        :style="animatedStyle"
      >
        <div
          class="tabs-content"
          :style="getContentStyle(item.key, index)"
          v-for="(item, index) in items"
          :key="item.key || index"
        >
          <slot name="content" :item="item" :content="item.content" :key="getPageKey(item.key, index)">{{
            item.content
          }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.tabs-wrap {
  display: flex;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  list-style: none;
  .tabs-nav-container {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    &::before {
      position: absolute;
      content: '';
    }
    .tabs-prefix {
      flex: none;
    }
    .tabs-suffix {
      flex: none;
    }
    .tabs-nav-wrap {
      position: relative;
      display: flex;
      flex: auto;
      align-self: stretch;
      overflow: hidden;
      white-space: nowrap;
      transform: translate(0);
      .shadow {
        position: absolute;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
        content: '';
        pointer-events: none;
      }
      &::before {
        .shadow();
      }
      &::after {
        .shadow();
      }
      .tabs-nav-list {
        position: relative;
        display: flex;
        .tab-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 0;
          outline: none;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            color: var(--tabs-primary-color);
          }
          :deep(svg) {
            fill: currentColor;
          }
        }
        .tab-line-active {
          color: var(--tabs-primary-color);
          text-shadow: 0 0 0.25px currentcolor;
        }
        .tab-disabled {
          color: rgba(0, 0, 0, 0.25);
          cursor: not-allowed;
          &:hover {
            color: rgba(0, 0, 0, 0.25);
          }
        }
        .tab-bar {
          position: absolute;
          background-color: var(--tabs-primary-color);
          pointer-events: none;
          border-radius: 2px;
          transition:
            width 0.3s,
            left 0.3s,
            height 0.3s,
            top 0.3s,
            background-color;
        }
        .tab-bar-disabled {
          background-color: rgba(0, 0, 0, 0.25);
        }
        .card-hidden {
          visibility: hidden;
        }
      }
      .nav-transition {
        transition: all 0.15s;
      }
    }
    .tabs-center {
      justify-content: center;
    }
    .before-shadow-active {
      &::before {
        opacity: 1;
      }
    }
    .after-shadow-active {
      &::after {
        opacity: 1;
      }
    }
  }
  .tabs-page-container {
    flex: auto;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    .tabs-content-wrap {
      position: relative;
      display: flex;
      width: 100%;
      .tabs-content {
        outline: none;
        flex: none;
        width: 100%;
      }
    }
    .tabs-content-animated {
      transition: margin 0.3s;
    }
  }
}
.tabs-top {
  flex-direction: column;
  .tabs-nav-container {
    margin-bottom: 16px;
    .tabs-prefix {
      padding-right: 12px;
    }
    .tabs-suffix {
      padding-left: 12px;
    }
    &::before {
      right: 0;
      left: 0;
      bottom: 0;
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    }
    .tabs-nav-wrap {
      &::before {
        top: 0;
        bottom: 0;
        width: 32px;
        left: 0;
        box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.08);
      }
      &::after {
        top: 0;
        bottom: 0;
        width: 32px;
        right: 0;
        box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.08);
      }
      .tabs-nav-list {
        .tab-item {
          &:not(:first-child) {
            margin-left: 32px;
          }
        }
        .tab-bar {
          height: 2px;
          bottom: 0;
        }
      }
    }
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 8px 8px 0 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 8px 8px 0 0;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 6px 6px 0 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 6px 6px 0 0;
          }
        }
      }
    }
  }
}
.tabs-bottom {
  flex-direction: column;
  .tabs-nav-container {
    order: 1;
    margin-top: 16px;
    .tabs-prefix {
      padding-right: 12px;
    }
    .tabs-suffix {
      padding-left: 12px;
    }
    &::before {
      right: 0;
      left: 0;
      top: 0;
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    }
    .tabs-nav-wrap {
      &::before {
        top: 0;
        bottom: 0;
        width: 32px;
        left: 0;
        box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.08);
      }
      &::after {
        top: 0;
        bottom: 0;
        width: 32px;
        right: 0;
        box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.08);
      }
      .tabs-nav-list {
        .tab-item {
          &:not(:first-child) {
            margin-left: 32px;
          }
        }
        .tab-bar {
          height: 2px;
          top: 0;
        }
      }
    }
  }
  .tabs-page-container {
    order: 0;
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 0 0 8px 8px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 0 8px 8px;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 0 0 6px 6px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 0 6px 6px;
          }
        }
      }
    }
  }
}
.tabs-left {
  .tabs-nav-container {
    flex-direction: column;
    min-width: 40px;
    margin-right: 24px;
    .tabs-prefix {
      padding-bottom: 12px;
    }
    .tabs-suffix {
      padding-top: 12px;
    }
    &::before {
      top: 0;
      bottom: 0;
      right: 0;
      border-left: 1px solid rgba(5, 5, 5, 0.06);
    }
    .tabs-nav-wrap {
      flex-direction: column;
      &::before {
        right: 0;
        left: 0;
        height: 32px;
        top: 0;
        box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, 0.08);
      }
      &::after {
        right: 0;
        left: 0;
        height: 32px;
        bottom: 0;
        box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08);
      }
      .tabs-nav-list {
        flex: 1 0 auto;
        flex-direction: column;
        .tab-item {
          padding: 8px 24px;
          text-align: center;
          &:not(:first-child) {
            margin-top: 16px;
          }
        }
        .tab-bar {
          width: 2px;
          right: 0;
        }
      }
    }
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 8px 0 0 8px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 8px 0 0 8px;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 6px 0 0 6px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 6px 0 0 6px;
          }
        }
      }
    }
  }
}
.tabs-right {
  .tabs-nav-container {
    order: 1;
    flex-direction: column;
    min-width: 40px;
    margin-left: 24px;
    .tabs-prefix {
      padding-bottom: 12px;
    }
    .tabs-suffix {
      padding-top: 12px;
    }
    &::before {
      top: 0;
      bottom: 0;
      left: 0;
      border-left: 1px solid rgba(5, 5, 5, 0.06);
    }
    .tabs-nav-wrap {
      flex-direction: column;
      &::before {
        right: 0;
        left: 0;
        height: 32px;
        top: 0;
        box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, 0.08);
      }
      &::after {
        right: 0;
        left: 0;
        height: 32px;
        bottom: 0;
        box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08);
      }
      .tabs-nav-list {
        flex: 1 0 auto;
        flex-direction: column;
        .tab-item {
          padding: 8px 24px;
          text-align: center;
        }
        .tab-bar {
          width: 2px;
          left: 0;
        }
      }
    }
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 0 8px 8px 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 8px 8px 0;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 0 6px 6px 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 6px 6px 0;
          }
        }
      }
    }
  }
}
.tabs-small {
  .tabs-nav-container {
    font-size: 14px;
  }
  &.tabs-top:not(.tabs-card),
  &.tabs-bottom:not(.tabs-card) {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 8px 0;
          }
        }
      }
    }
  }
}
.tabs-middle {
  .tabs-nav-container {
    font-size: 14px;
  }
  &.tabs-top:not(.tabs-card),
  &.tabs-bottom:not(.tabs-card) {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 12px 0;
          }
        }
      }
    }
  }
}
.tabs-large {
  .tabs-nav-container {
    font-size: 16px;
  }
  &.tabs-top:not(.tabs-card),
  &.tabs-bottom:not(.tabs-card) {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 16px 0;
          }
        }
      }
    }
  }
}
.tabs-card {
  .tabs-nav-container {
    .tabs-nav-wrap {
      .tabs-nav-list {
        .tab-item {
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(5, 5, 5, 0.06);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .tab-card-active {
          color: var(--tabs-primary-color);
          background: #ffffff;
          text-shadow: 0 0 0.25px currentcolor;
        }
        .tab-disabled {
          color: rgba(0, 0, 0, 0.25);
          cursor: not-allowed;
          &:hover {
            color: rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
  }
  &.tabs-top {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-left: 2px;
            }
          }
          .tab-card-active {
            border-bottom-color: #ffffff;
          }
        }
      }
    }
  }
  &.tabs-bottom {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-left: 2px;
            }
          }
          .tab-card-active {
            border-top-color: #ffffff;
          }
        }
      }
    }
  }
  &.tabs-left {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-top: 2px;
            }
          }
          .tab-card-active {
            border-right-color: #ffffff;
          }
        }
      }
    }
  }
  &.tabs-right {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-top: 2px;
            }
          }
          .tab-card-active {
            border-left-color: #ffffff;
          }
        }
      }
    }
  }
  &.tabs-small {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 6px 16px;
          }
        }
      }
    }
  }
}
</style>
