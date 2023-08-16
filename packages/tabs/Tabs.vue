<script setup lang="ts">
import { ref, watchEffect } from 'vue'
interface Tab {
  key: string | number // 对应 activeKey
  tab: string // 标签页显示文字
  content?: string // 标签页内容 string | slot
  disabled?: boolean // 禁用对应标签页
}
interface Props {
  tabPages: Array<Tab> // 标签页数组
  centered?: boolean // 标签是否居中展示
  size?: 'small'|'large' // 标签页大小 可选 small | large
  activeKey?: string|number // (v-model)当前激活 tab 面板的 key
}
const props = withDefaults(defineProps<Props>(), {
  tabPages: () => [],
  centered: false,
  size: 'small',
  activeKey: ''
})
const tabs = ref() // 所有tabs的ref模板引用
const left = ref(0)
const width = ref(0)
const wrap = ref()
const nav = ref()
const showWheel = ref(false) // 导航是否有滚动
const scrollMax = ref(0) // 最大滚动距离
const scrollLeft = ref(0) // 滚动距离
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  getNavWidth()
}, { flush: 'post' })
watchEffect(() => { // 若想要侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项
  getBarPosition(props.activeKey)
}, { flush: 'post' })
const emits = defineEmits(['update:activeKey', 'change'])
function findElement (key: string|number) {
  return tabs.value.find((element: any) => element.__vnode.key === key)
}
function getBarPosition (key: string|number) {
  const el = findElement(key)
  if (el) {
    left.value = el.offsetLeft
    width.value = el.offsetWidth
  } else {
    left.value = 0
    width.value = 0
  }
}
function getNavWidth () {
  const wrapWidth = wrap.value.offsetWidth
  const navWidth = nav.value.offsetWidth
  if (navWidth > wrapWidth) {
    showWheel.value = true
    scrollMax.value = navWidth - wrapWidth
  }
}
function onTab (key: string|number) {
  getBarPosition(key)
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
  <div :class="`m-tabs ${size}`">
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
            :class="{'u-tab-active': activeKey === page.key, 'u-tab-disabled': page.disabled}"
            @click="page.disabled ? () => false : onTab(page.key)"
            v-for="page in tabPages" :key="page.key">
            {{ page.tab }}
          </div>
          <div class="u-tab-bar" :style="`left: ${left}px; width: ${width}px;`"></div>
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
  line-height: 1.57;
  flex-direction: column; // 子元素将垂直显示，正如一个列一样。
  .m-tabs-nav {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(5, 5, 5, .06);
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
          background: transparent;
          border: 0;
          cursor: pointer;
          transition: all .3s;
          &:not(:first-child) {
            margin-left: 32px;
          }
          &:hover {
            color: @themeColor;
          }
        }
        .u-tab-active {
          color: @themeColor;
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
.small {
  font-size: 14px;
  .u-tab {
    padding: 12px 0;
  }
}
.large {
  font-size: 16px;
  .u-tab {
    padding: 16px 0;
  }
}
</style>
