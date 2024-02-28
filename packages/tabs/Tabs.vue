<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
interface Tab {
  key: string | number // 对应 activeKey
  tab: string // 标签页显示文字
  content?: string // 标签页内容 string | slot
  disabled?: boolean // 禁用对应标签页
}
interface Props {
  tabPages: Array<Tab> // 标签页数组
  centered?: boolean // 标签是否居中展示
  size?: 'small'|'middle'|'large' // 标签页大小
  type?: 'line'|'card' // 标签页的样式
  gutter?: number // tabs 之前的间隙大小，单位px
  activeKey?: string|number // (v-model)当前激活 tab 面板的 key
}
const props = withDefaults(defineProps<Props>(), {
  tabPages: () => [],
  centered: false,
  size: 'middle',
  type: 'line',
  gutter: undefined,
  activeKey: ''
})
const tabs = ref() // 所有tabs的ref模板引用
const left = ref(0)
const width = ref(0)
const wrap = ref()
const wrapWidth = ref()
const nav = ref()
const navWidth = ref()
const showWheel = ref(false) // 导航是否有滚动
const scrollMax = ref(0) // 最大滚动距离
const scrollLeft = ref(0) // 滚动距离
watch(
  () => [props.tabPages, props.gutter, props.size, props.type],
  () => {
    getNavWidth()
  },
  {
    deep: true, // 强制转成深层侦听器
    flush: 'post'
  }
)
watch(
  () => props.activeKey,
  () => {
    getBarPosition()
  },
  {
    flush: 'post' // 在侦听器回调中访问被 Vue 更新之后的 DOM
  }
)
onMounted(() => {
  getNavWidth()
})
const emits = defineEmits(['update:activeKey', 'change'])
function getBarPosition () {
  const index = props.tabPages.findIndex(page => page.key === props.activeKey)
  const el = tabs.value[index]
  if (el) {
    left.value = el.offsetLeft
    width.value = el.offsetWidth
    if (left.value < scrollLeft.value) {
      scrollLeft.value = left.value
    }
    if (left.value + width.value - wrapWidth.value > scrollLeft.value) {
      scrollLeft.value = left.value + width.value - wrapWidth.value
    }
  } else {
    left.value = 0
    width.value = 0
  }
}
function getNavWidth () {
  wrapWidth.value = wrap.value.offsetWidth
  navWidth.value = nav.value.offsetWidth
  if (navWidth.value > wrapWidth.value) {
    showWheel.value = true
    scrollMax.value = navWidth.value - wrapWidth.value
  }
  getBarPosition()
}
function onTab (key: string|number) {
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
function onWheel (e: WheelEvent) {
  if (e.deltaX !== 0) { // 防止标签页处触摸板上下滚动不生效
    e.preventDefault() // 禁止浏览器捕获触摸板滑动事件
    const scrollX = e.deltaX * 1 // 滚轮的横向滚动量
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
        ref="wrap"
        class="m-tabs-nav-wrap"
        :class="{'tabs-center': centered, 'before-shadow-active': scrollLeft > 0, 'after-shadow-active': scrollLeft < scrollMax}">
        <div
          ref="nav"
          class="m-tabs-nav-list"
          @wheel="showWheel ? onWheel($event) : () => false"
          :style="`transform: translate(${-scrollLeft}px, 0)`">
          <div
            ref="tabs"
            class="u-tab"
            :class="[
              `u-tab-${size}`,
              { 'u-tab-card': type === 'card', 'u-tab-disabled': page.disabled },
              { 'u-tab-line-active': activeKey === page.key && type === 'line' },
              { 'u-tab-card-active': activeKey === page.key && type === 'card' }
            ]"
            :style="`margin-left: ${index !== 0 ? gutter : null}px;`"
            @click="page.disabled ? () => false : onTab(page.key)"
            v-for="(page, index) in tabPages" :key="page.key">
            {{ page.tab }}
          </div>
          <div class="u-tab-bar" :class="{ 'u-card-hidden': type === 'card' }" :style="`left: ${left}px; width: ${width}px;`"></div>
        </div>
      </div>
    </div>
    <div class="m-tabs-page">
      <div
        class="m-tabs-content"
        v-show="activeKey === page.key"
        v-for="page in tabPages" :key="page.key">
        <slot :name="page.key">{{ page.content }}</slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-tabs {
  display: flex;
  color: rgba(0, 0, 0, .88);
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
      border-bottom: 1px solid rgba(5, 5, 5, .06);
      content: '';
    }
    .m-tabs-nav-wrap {
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
        transition: opacity .3s;
        content: '';
        pointer-events: none;
        top: 0;
        bottom: 0;
        width: 32px;
      }
      &::before {
        .shadow();
        left: 0;
        box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .08);
        
      }
      &::after {
        .shadow();
        right: 0;
        box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .08);
      }
      .m-tabs-nav-list {
        position: relative;
        display: flex;
        .u-tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 12px 0;
          font-size: 14px;
          background: transparent;
          border: 0;
          outline: none;
          cursor: pointer;
          transition: all .3s;
          &:not(:first-child) {
            margin-left: 32px;
          }
          &:hover {
            color: @themeColor;
          }
        }
        .u-tab-small {
          font-size: 14px;
          padding: 8px 0;
        }
        .u-tab-large {
          font-size: 16px;
          padding: 16px 0;
        }
        .u-tab-card {
          border-radius: 8px 8px 0 0;
          padding: 8px 16px;
          background: rgba(0, 0, 0, .02);
          border: 1px solid rgba(5, 5, 5, .06);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          &:not(:first-child) {
            margin-left: 2px;
          }
        }
        .u-tab-line-active {
          color: @themeColor;
          text-shadow: 0 0 .25px currentcolor;
        }
        .u-tab-card-active {
          border-bottom-color: #ffffff;
          color: @themeColor;
          background: #ffffff;
          text-shadow: 0 0 .25px currentcolor;
        }
        .u-tab-disabled {
          color: rgba(0, 0, 0, .25);
          cursor: not-allowed;
          &:hover {
            color: rgba(0, 0, 0, .25);
          }
        }
        .u-tab-bar {
          position: absolute;
          background: @themeColor;
          pointer-events: none;
          height: 2px;
          transition: width .3s,left .3s,right .3s;
          bottom: 0;
        }
        .u-card-hidden {
          visibility: hidden;
        }
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
    .m-tabs-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
