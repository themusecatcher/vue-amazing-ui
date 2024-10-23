# 滚动方向 useScrollDirection

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者 !"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*实时监测页面滚动方向的组合式函数*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 实时监测页面滚动方向
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
import { useScrollDirection } from 'vue-amazing-ui'

const { scrollDown } = useScrollDirection()
</script>

## 基本使用

<h3>滚动方向：{{ scrollDown ? '向下' : '向上' }}</h3>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useScrollDirection } from 'vue-amazing-ui'

const { scrollDown } = useScrollDirection()
</script>
<template>
  <h3>滚动方向：{{ scrollDown ? '向下' : '向上' }}</h3>
</template>
```

## Params

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
throttleDelay | 节流延迟时间，单位 `ms` | number | 100
