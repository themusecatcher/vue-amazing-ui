<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { useResizeObserver, useSlotsExist } from '../utils'
interface Tab {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  tab?: string // 标签页显示文字 string | slot
  icon?: VNode // 标签页图标
  content?: string // 标签页内容 string | slot
  disabled?: boolean // 禁用对应标签页
}
interface Props {
  tabPages?: Tab[] // 标签页数组
  prefix?: string // 标签页前缀 string | slot
  suffix?: string // 标签页后缀 string | slot
  animated?: boolean // 是否启用切换动画
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
  tabPages: () => [],
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
const left = ref(0) // tabBar 的偏移量
const width = ref(0) // tabBar 的宽度
const wrapRef = ref()
const wrapWidth = ref()
const navRef = ref()
const navWidth = ref()
const showWheel = ref(false) // 导航是否有滚动
const scrollMax = ref(0) // 最大滚动距离
const scrollLeft = ref(0) // 滚动距离
const transition = ref(false)
const emits = defineEmits(['update:activeKey', 'change'])
const slotsExist = useSlotsExist(['prefix', 'suffix'])
const activeIndex = computed(() => {
  return props.tabPages.findIndex((page, index) => getPageKey(page.key, index) === props.activeKey)
})
const showPrefix = computed(() => {
  return Boolean(slotsExist.prefix || props.prefix)
})
const showSuffix = computed(() => {
  return Boolean(slotsExist.suffix || props.suffix)
})
const tabBarStyle = computed(() => {
  return {
    left: left.value + 'px',
    width: width.value + 'px'
  }
})
const hiddenStyle = computed(() => {
  if (props.animated) {
    return {
      visibility: 'hidden',
      height: '0px',
      overflowY: 'hidden'
    }
  } else {
    return {
      display: 'none'
    }
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
useResizeObserver([wrapRef, navRef], () => {
  getNavWidth()
})
onMounted(() => {
  getNavWidth()
})
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
function onTab(key: string | number, index: number) {
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
  e.stopPropagation()
  e.preventDefault()
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
  <div
    class="m-tabs"
    :class="[
      `tabs-${tabPosition} tabs-${size}`,
      {
        'tabs-card': type === 'card'
      }
    ]"
  >
    <div class="m-tabs-nav" :style="tabStyle">
      <div v-if="showPrefix" class="tabs-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </div>
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
          @wheel="showWheel ? onWheel($event) : () => false"
        >
          <div
            ref="tabsRef"
            class="tab-item"
            :class="{
              'tab-line-active': type === 'line' && activeKey === getPageKey(page.key, index),
              'tab-card-active': type === 'card' && activeKey === getPageKey(page.key, index),
              'tab-disabled': page.disabled
            }"
            :style="index > 0 && tabGutter ? { marginLeft: `${tabGutter}px` } : {}"
            @click="page.disabled ? () => false : onTab(getPageKey(page.key, index), index)"
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
            :class="{
              'tab-bar-disabled': tabPages[activeIndex]?.disabled,
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
    <div class="m-tabs-page" :style="contentStyle">
      <div
        class="tabs-content-wrap"
        :class="{ 'tabs-content-animated': animated }"
        :style="animated ? { marginLeft: `${-100 * activeIndex}%` } : {}"
      >
        <div
          class="tabs-content"
          :style="activeKey === getPageKey(page.key, index) ? {} : hiddenStyle"
          v-for="(page, index) in tabPages"
          :key="page.key || index"
        >
          <slot name="content" :key="getPageKey(page.key, index)" :content="page.content">{{ page.content }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-tabs {
  display: flex;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
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
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
      content: '';
    }
    .tabs-prefix {
      flex: none;
      padding-right: 16px;
    }
    .tabs-suffix {
      flex: none;
      padding-left: 16px;
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
        .tab-line-active {
          color: @themeColor;
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
          background-color: @themeColor;
          pointer-events: none;
          height: 2px;
          border-radius: 2px;
          transition:
            width 0.3s,
            left 0.3s,
            right 0.3s,
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
  .m-tabs-page {
    flex: auto;
    min-width: 0;
    min-height: 0;
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
  .m-tabs-nav {
    margin: 0 0 16px 0;
    &::before {
      bottom: 0;
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
        .tab-bar {
          bottom: 0;
        }
      }
    }
  }
  &.tabs-card {
    .m-tabs-nav {
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
    .m-tabs-nav {
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
  .m-tabs-nav {
    order: 1;
    margin-top: 16px;
    margin-bottom: 0;
    &::before {
      top: 0;
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
        .tab-bar {
          top: 0;
        }
      }
    }
  }
  .m-tabs-page {
    order: 0;
  }
  &.tabs-card {
    .m-tabs-nav {
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
    .m-tabs-nav {
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
.tabs-small {
  .m-tabs-nav {
    font-size: 14px;
    .tabs-nav-wrap {
      .tabs-nav-list {
        .tab-item {
          padding: 8px 0;
        }
      }
    }
  }
}
.tabs-middle {
  .m-tabs-nav {
    font-size: 14px;
    .tabs-nav-wrap {
      .tabs-nav-list {
        .tab-item {
          padding: 12px 0;
        }
      }
    }
  }
}
.tabs-large {
  .m-tabs-nav {
    font-size: 16px;
    .tabs-nav-wrap {
      .tabs-nav-list {
        .tab-item {
          padding: 16px 0;
        }
      }
    }
  }
}
.tabs-card {
  .m-tabs-nav {
    .tabs-nav-wrap {
      .tabs-nav-list {
        .tab-item {
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(5, 5, 5, 0.06);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          &:not(:first-child) {
            margin-left: 2px;
          }
        }
        .tab-card-active {
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
      }
    }
  }
  &.tabs-top {
    .m-tabs-nav {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-card-active {
            border-bottom-color: #ffffff;
          }
        }
      }
    }
  }
  &.tabs-bottom {
    .m-tabs-nav {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-card-active {
            border-top-color: #ffffff;
          }
        }
      }
    }
  }
  &.tabs-small {
    .m-tabs-nav {
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
