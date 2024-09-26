<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import type { VNode } from 'vue'
import { useResizeObserver } from '../utils'
interface Tab {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  tab?: string // 标签页显示文字 string | slot
  icon?: VNode // 标签页图标
  content?: string // 标签页内容 string | slot
  disabled?: boolean // 禁用对应标签页
}
interface Props {
  tabPages?: Tab[] // 标签页数组
  centered?: boolean // 标签是否居中展示
  size?: 'small' | 'middle' | 'large' // 标签页大小
  type?: 'line' | 'card' // 标签页的样式
  gutter?: number // tabs 之前的间隙大小，单位 px
  activeKey?: string | number // (v-model) 当前激活 tab 面板的 key
}
const props = withDefaults(defineProps<Props>(), {
  tabPages: () => [],
  centered: false,
  size: 'middle',
  type: 'line',
  gutter: undefined,
  activeKey: undefined
})
const tabsRef = ref() // 所有 tabs 的 ref 模板引用
const left = ref(0)
const width = ref(0)
const wrapRef = ref()
const wrapWidth = ref()
const navRef = ref()
const navWidth = ref()
const rafId = ref()
const showWheel = ref(false) // 导航是否有滚动
const scrollMax = ref(0) // 最大滚动距离
const scrollLeft = ref(0) // 滚动距离
const activeIndex = computed(() => {
  return props.tabPages.findIndex((page, index) => getPageKey(page.key, index) === props.activeKey)
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
useResizeObserver([wrapRef, navRef], () => {
  getNavWidth()
})
onMounted(() => {
  getNavWidth()
})
const emits = defineEmits(['update:activeKey', 'change'])
const transition = ref(false)
function getBarDisplay() {
  const el = tabsRef.value[activeIndex.value]
  if (el) {
    left.value = el.offsetLeft
    width.value = el.offsetWidth
    if (showWheel.value) {
      if (left.value < scrollLeft.value) {
        transition.value = true
        scrollLeft.value = left.value
      }
      const targetScroll = left.value + width.value - wrapWidth.value
      if (targetScroll > scrollLeft.value) {
        transition.value = true
        scrollLeft.value = targetScroll
      }
    }
  } else {
    left.value = 0
    width.value = 0
  }
}
function getNavWidth() {
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
function getPageKey(key: string | number | undefined, index: number) {
  if (key === undefined) {
    return index
  } else {
    return key
  }
}
function onTab(key: string | number) {
  emits('update:activeKey', key)
  emits('change', key)
}
/*
  （触摸板滑动也会触发）监听滚轮事件，结合 transform: translate(${scrollLeft}px, 0) 模拟滚动效果
  参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event
  WheelEvent:
  事件属性：
  WheelEvent.deltaX 只读：返回一个浮点数（double），表示水平方向的滚动量。
  WheelEvent.deltaY 只读：返回一个浮点数（double），表示垂直方向的滚动量。
  WheelEvent.deltaZ 只读：返回一个浮点数（double）表示 z 轴方向的滚动量。
  WheelEvent.deltaMode 只读：返回一个无符号长整型数（unsigned long），表示 delta* 值滚动量的单位。
*/
function onWheel(e: WheelEvent) {
  if (e.deltaX || e.deltaY) {
    // 防止标签页处触摸板上下滚动不生效
    // e.preventDefault() // 禁止浏览器捕获触摸板滑动事件
    const scrollX = (e.deltaX || e.deltaY) * 1 // 滚轮的横向滚动量
    if (scrollLeft.value + scrollX > scrollMax.value) {
      scrollLeft.value = scrollMax.value
    } else if (scrollLeft.value + scrollX < 0) {
      scrollLeft.value = 0
    } else {
      scrollLeft.value += scrollX
    }
  }
}
</script>
<template>
  <div class="m-tabs">
    <div class="m-tabs-nav">
      <div
        ref="wrapRef"
        class="tabs-nav-wrap"
        :class="{
          'tabs-center': centered,
          'before-shadow-active': showWheel && scrollLeft > 0,
          'after-shadow-active': showWheel && scrollLeft < scrollMax
        }"
      >
        <div
          ref="navRef"
          class="tabs-nav-list"
          :class="{ 'nav-transition': transition }"
          @transitionend="transition = false"
          :style="`transform: translate(${-scrollLeft}px, 0)`"
          @wheel.stop.prevent="showWheel ? onWheel($event) : () => false"
        >
          <div
            ref="tabsRef"
            class="tab-item"
            :class="[
              `tab-${size}`,
              {
                'tab-card': type === 'card',
                'tab-disabled': page.disabled,
                'tab-line-active': activeKey === getPageKey(page.key, index) && type === 'line',
                'tab-card-active': activeKey === getPageKey(page.key, index) && type === 'card'
              }
            ]"
            :style="`margin-left: ${index !== 0 ? gutter : null}px;`"
            @click="page.disabled ? () => false : onTab(getPageKey(page.key, index))"
            v-for="(page, index) in tabPages"
            :key="index"
          >
            <slot name="tab" :key="getPageKey(page.key, index)" :tab="page.tab">
              <component v-if="page.icon" :is="page.icon" />
              {{ page.tab }}
            </slot>
          </div>
          <div
            class="tab-bar"
            :class="{ 'card-hidden': type === 'card' }"
            :style="`left: ${left}px; width: ${width}px;`"
          ></div>
        </div>
      </div>
    </div>
    <div class="m-tabs-page">
      <div
        class="tabs-content"
        v-show="activeKey === getPageKey(page.key, index)"
        v-for="(page, index) in tabPages"
        :key="page.key || index"
      >
        <slot name="content" :key="getPageKey(page.key, index)" :content="page.content">{{ page.content }}</slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-tabs {
  display: flex;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  flex-direction: column; // 子元素将垂直显示，正如一个列一样。
  .m-tabs-nav {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    margin: 0 0 16px 0;
    &::before {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
      content: '';
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
        top: 0;
        bottom: 0;
        width: 32px;
      }
      &::before {
        .shadow();
        left: 0;
        box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.08);
      }
      &::after {
        .shadow();
        right: 0;
        box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.08);
      }
      .tabs-nav-list {
        position: relative;
        display: flex;
        .tab-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 0;
          font-size: 14px;
          background: transparent;
          border: 0;
          outline: none;
          cursor: pointer;
          transition: all 0.3s;
          &:not(:first-child) {
            margin-left: 32px;
          }
          &:hover {
            color: @themeColor;
          }
          :deep(svg) {
            fill: currentColor;
          }
        }
        .tab-small {
          font-size: 14px;
          padding: 8px 0;
        }
        .tab-large {
          font-size: 16px;
          padding: 16px 0;
        }
        .tab-card {
          border-radius: 8px 8px 0 0;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(5, 5, 5, 0.06);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          &:not(:first-child) {
            margin-left: 2px;
          }
        }
        .tab-line-active {
          color: @themeColor;
          text-shadow: 0 0 0.25px currentcolor;
        }
        .tab-card-active {
          border-bottom-color: #ffffff;
          color: @themeColor;
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
        .tab-bar {
          position: absolute;
          background: @themeColor;
          pointer-events: none;
          height: 2px;
          border-radius: 2px;
          transition:
            width 0.3s,
            left 0.3s,
            right 0.3s;
          bottom: 0;
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
  .m-tabs-page {
    font-size: 14px;
    flex: auto;
    min-width: 0;
    min-height: 0;
    .tabs-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
