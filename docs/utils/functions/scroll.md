# 滚动监测 useScroll

<GlobalElement />

*实时监测页面滚动方向的组合式函数*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 实时监测滚动位置和状态
 *
 * @param throttleDelay 节流延迟时间，单位 ms，默认为 100ms，用于控制滚动事件触发的频率
 * @returns 返回一个对象，其中包含一个名为 scrollDown 的 ref 对象，表示滚动方向是否向下
 */
import { ref } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'
export function useScrollDirection(throttleDelay = 100) {
  // 使用 ref 定义一个响应式变量，指示当前滚动方向是否向下
  const scrollDown = ref<boolean>(false)
  // 记录上一次滚动的位置
  let lastScrollY = 0
  // 监听滚动事件的函数
  function scrollEvent() {
    // 获取当前的滚动位置
    // 注：在 safari 浏览器中 currentScrollY 会出现负值，可将负值统一处理为 0 来和 google 浏览器行为统一
    let currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    currentScrollY = currentScrollY < 0 ? 0 : currentScrollY
    // 比较当前位置和上一次记录的位置，来确定滚动方向
    scrollDown.value = currentScrollY > lastScrollY
    // 更新上次滚动位置
    lastScrollY = currentScrollY
  }
  // 使用节流函数封装 scrollEvent，以减少滚动事件的触发频率
  const throttleScroll = throttle(scrollEvent, throttleDelay)
  useEventListener(window, 'scroll', throttleScroll)
  // 返回一个对象，包含我们想要暴露给组件的状态或方法
  return { scrollDown }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '../../../dist/vue-amazing-ui.js'
const scrollRef = ref()
const { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom } = useScroll(scrollRef)
</script>

## 基本使用

<Flex ref="scrollRef" justify="space-between">
  <div class="scroll-container">
    <div class="scroll-content"></div>
  </div>
  <Space vertical gap="small">
    <p>水平滚动距离：{{ x }}</p>
    <p>垂直滚动距离：{{ y }}</p>
    <p>水平最大可滚动距离：{{ xScrollMax }}</p>
    <p>垂直最大可滚动距离：{{ yScrollMax }}</p>
    <p>是否正在滚动：{{ isScrolling }}</p>
    <p>是否向左滚动：{{ left }}</p>
    <p>是否向右滚动：{{ right }}</p>
    <p>是否向上滚动：{{ top }}</p>
    <p>是否向下滚动：{{ bottom }}</p>
  </Space>
</Flex>

<style lang="less" scoped>
.scroll-container {
  width: 360px;
  height: 360px;
  border-radius: 12px;
  border: 2px solid #1677ff;
  overflow: scroll;
  .scroll-content {
    width: 600px;
    height: 600px;
  }
}
</style>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from 'vue-amazing-ui'
const { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom, onScroll, onStop } = useScroll()
function onScroll(e: Event) {
  console.log('scroll', e)
}
function onStop(e: Event) {
  console.log('scrollend', e)
}
</script>
<template>
  <Flex vertical>
    <h3>水平滚动距离：{{ x }}</h3>
    <h3>垂直滚动距离：{{ y }}</h3>
    <h3>水平最大可滚动距离：{{ xScrollMax }}</h3>
    <h3>垂直最大可滚动距离：{{ yScrollMax }}</h3>
    <h3>是否正在滚动：{{ isScrolling }}</h3>
    <h3>是否向左滚动：{{ left }}</h3>
    <h3>是否向右滚动：{{ right }}</h3>
    <h3>是否向上滚动：{{ top }}</h3>
    <h3>是否向下滚动：{{ bottom }}</h3>
  </Flex>
</template>
```

## Params

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
throttleDelay | 节流延迟时间，单位 `ms` | number | 100
