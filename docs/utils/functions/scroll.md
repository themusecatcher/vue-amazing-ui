# 滚动监测 useScroll

<GlobalElement />

_实时监测目标元素滚动位置及状态的组合式函数_

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 实时监测目标元素滚动位置及状态
 *
 * 自定义钩子用于处理滚动事件和状态
 * @param target 滚动目标元素，可以是 Ref、HTMLElement、Window 或 Document，默认为 window
 * @param throttleDelay 节流延迟，用于限制滚动事件的触发频率，默认为 0
 * @param onScroll 滚动事件的回调函数，可选
 * @param onStop 滚动结束的回调函数，可选
 * @returns 返回一个对象，包含滚动位置和各种状态信息
 */
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { throttle, debounce } from 'vue-amazing-ui'
export function useScroll(
  target: Ref | HTMLElement | Window | Document = window,
  throttleDelay: number = 0,
  onScroll?: (e: Event) => void,
  onStop?: (e: Event) => void
): {
  x: Ref<number>
  xScrollMax: Ref<number>
  y: Ref<number>
  yScrollMax: Ref<number>
  isScrolling: Ref<boolean>
  left: Ref<boolean>
  right: Ref<boolean>
  top: Ref<boolean>
  bottom: Ref<boolean>
} {
  const x = ref(0) // 水平滚动距离
  const xScrollMax = ref(0) // 水平最大可滚动距离
  const y = ref(0) // 垂直滚动距离
  const yScrollMax = ref(0) // 垂直最大可滚动距离
  const isScrolling = ref(false) // 是否正在滚动
  const left = ref(false) // 是否向左滚动
  const right = ref(false) // 是否向右滚动
  const top = ref(false) // 是否向上滚动
  const bottom = ref(false) // 是否向下滚动
  const lastScrollLeft = ref(0) // 上一次水平滚动距离
  const lastScrollTop = ref(0) // 上一次垂直滚动距离
  // 滚动事件
  function scrollEvent(e: Event) {
    isScrolling.value = true
    const eventTarget = ((e.target as Document).documentElement ?? e.target) as HTMLElement
    x.value = eventTarget.scrollLeft
    y.value = eventTarget.scrollTop
    left.value = x.value < lastScrollLeft.value
    right.value = x.value > lastScrollLeft.value
    top.value = y.value < lastScrollTop.value
    bottom.value = y.value > lastScrollTop.value
    lastScrollLeft.value = x.value
    lastScrollTop.value = y.value
    debounceScrollEnd(e)
    onScroll && onScroll(e)
  }
  // 使用节流函数限制滚动事件触发频率
  const throttleScroll = throttle(scrollEvent, throttleDelay)
  // 滚动结束事件
  function scrollEndEvent(e: Event) {
    if (!isScrolling.value) {
      return
    }
    isScrolling.value = false
    left.value = false
    right.value = false
    top.value = false
    bottom.value = false
    onStop && onStop(e)
  }
  // 使用防抖函数延迟处理滚动结束事件
  const debounceScrollEnd = debounce(scrollEndEvent, throttleDelay + 200)
  // 计算滚动目标元素
  const scrollTarget = computed(() => {
    const targetValue = toValue(target)
    if (targetValue) {
      return targetValue
    }
    return null
  })
  // 监听滚动目标元素的变化
  watch(
    () => scrollTarget.value,
    (to: any, from: any) => {
      if (from) {
        cleanup(from)
      }
      if (to) {
        const el: Element = ((to as Window)?.document?.documentElement ||
          (to as Document)?.documentElement ||
          (to as HTMLElement)) as Element
        xScrollMax.value = el.scrollWidth - el.clientWidth
        yScrollMax.value = el.scrollHeight - el.clientHeight
        el.addEventListener('scroll', throttleScroll as EventListener)
        el.addEventListener('scrollend', debounceScrollEnd as EventListener)
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  )
  // 清理函数，用于移除事件监听器
  function cleanup(target: any) {
    const el: Element = ((target as Window)?.document?.documentElement ||
      (target as Document)?.documentElement ||
      (target as HTMLElement)) as Element
    el.removeEventListener('scroll', throttleScroll as EventListener)
    el.removeEventListener('scrollend', debounceScrollEnd as EventListener)
  }
  // 在组件卸载前调用清理函数
  onBeforeUnmount(() => cleanup(scrollTarget.value))
  // 返回滚动位置和各种状态信息
  return { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from 'vue-amazing-ui'
const scrollRef = ref()
const { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom } = useScroll(scrollRef, 0, onScroll, onStop)
function onScroll(e: Event) {
  console.log('scroll', e)
}
function onStop(e: Event) {
  console.log('scrollend', e)
}
</script>

## 基本使用

<Flex justify="space-between">
  <div class="scroll-container" ref="scrollRef" >
    <div class="scroll-content">
      <div class="inside-content">Scroll Me</div>
    </div>
  </div>
  <Card title="滚动位置及状态" :body-style="{ fontSize: '16px' }">
    <p>水平滚动距离：{{ x }}</p>
    <p>垂直滚动距离：{{ y }}</p>
    <p>水平最大可滚动距离：{{ xScrollMax }}</p>
    <p>垂直最大可滚动距离：{{ yScrollMax }}</p>
    <p>是否正在滚动：{{ isScrolling }}</p>
    <p>是否向左滚动：{{ left }}</p>
    <p>是否向右滚动：{{ right }}</p>
    <p>是否向上滚动：{{ top }}</p>
    <p>是否向下滚动：{{ bottom }}</p>
  </Card>
</Flex>

<style lang="less" scoped>
.scroll-container {
  width: 360px;
  height: 360px;
  border-radius: 12px;
  border: 2px solid #1677ff;
  overflow: scroll;
  .scroll-content {
    position: relative;
    width: 600px;
    height: 600px;
    .inside-content {
      position: absolute;
      top: 33.3%;
      left: 33.3%;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 500;
      background: #fafafa;
      padding: 6px 8px;
      border-radius: 8px;
    }
  }
}
</style>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from 'vue-amazing-ui'
const scrollRef = ref()
const { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom } = useScroll(
  scrollRef,
  0,
  onScroll,
  onStop
)
function onScroll(e: Event) {
  console.log('scroll', e)
}
function onStop(e: Event) {
  console.log('scrollend', e)
}
</script>
<template>
  <Flex justify="space-between">
    <div class="scroll-container" ref="scrollRef">
      <div class="scroll-content">
        <div class="inside-content">Scroll Me</div>
      </div>
    </div>
    <Card title="滚动位置及状态" :body-style="{ fontSize: '16px' }">
      <p>水平滚动距离：{{ x }}</p>
      <p>垂直滚动距离：{{ y }}</p>
      <p>水平最大可滚动距离：{{ xScrollMax }}</p>
      <p>垂直最大可滚动距离：{{ yScrollMax }}</p>
      <p>是否正在滚动：{{ isScrolling }}</p>
      <p>是否向左滚动：{{ left }}</p>
      <p>是否向右滚动：{{ right }}</p>
      <p>是否向上滚动：{{ top }}</p>
      <p>是否向下滚动：{{ bottom }}</p>
    </Card>
  </Flex>
</template>
<style lang="less" scoped>
.scroll-container {
  width: 360px;
  height: 360px;
  border-radius: 12px;
  border: 2px solid #1677ff;
  overflow: scroll;
  .scroll-content {
    position: relative;
    width: 600px;
    height: 600px;
    .inside-content {
      position: absolute;
      top: 33.3%;
      left: 33.3%;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 500;
      background: #fafafa;
      padding: 6px 8px;
      border-radius: 8px;
    }
  }
}
</style>
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 滚动目标元素 | Ref &#124; HTMLElement &#124; Window &#124; Document | window |
| throttleDelay | 节流延迟时间，单位 `ms`，用于限制滚动事件的触发频率 | number | 0 |
| onScroll? | 滚动事件的回调函数 | (e: Event) => void | undefined |
| onStop? | 滚动结束的回调函数 | (e: Event) => void | undefined |
