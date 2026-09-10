# 滚动监测 useScroll

<GlobalElement />

_实时监测目标元素滚动位置及状态的组合式函数_

未传 `target` 时默认监听整页滚动：此时内部把 `scroll` 监听绑定到 `window`（视口滚动的事件目标是 `window` / `document`，`documentElement` 收不到 `scroll`）。

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 实时监测目标元素滚动位置及状态
 *
 * 自定义钩子用于处理滚动事件和状态
 * @param {Ref | HTMLElement | Window | Document} [target] 滚动目标元素，可以是 Ref、HTMLElement、Window 或 Document，默认为 window
 * @param {number} [throttleDelay = 0] 节流延迟，用于限制滚动事件的触发频率，默认为 0
 * @param {(e: Event) => void} onScroll 滚动事件的回调函数，可选
 * @param {(e: Event) => void} onStop 滚动结束的回调函数，可选
 * @returns {{ x: Ref<number>, xScrollMax: Ref<number>, y: Ref<number>, yScrollMax: Ref<number>, isScrolling: Ref<boolean>, left: Ref<boolean>, right: Ref<boolean>, top: Ref<boolean>, bottom: Ref<boolean> }} 返回一个对象，包含滚动位置和各种状态信息
 */
import { ref, computed, watch, toValue, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { throttle } from 'vue-amazing-ui'
type ScrollTarget = HTMLElement | Window | Document
// 是否为 window / document（视口级滚动目标）
function isWindowTarget(value: unknown): value is Window {
  return typeof window !== 'undefined' && value === window
}
function isDocumentTarget(value: unknown): value is Document {
  return typeof Document !== 'undefined' && value instanceof Document
}
// 解析 scroll 事件的实际监听目标：视口滚动的事件目标为 Window / Document，documentElement 收不到 scroll
function resolveScrollEventTarget(target: ScrollTarget | null): ScrollTarget | null {
  if (!target) return null
  if (typeof document !== 'undefined' && target === document.documentElement) return window
  return target
}
// 解析滚动尺寸的测量元素：window / document 自身没有内容尺寸属性，需回退到 documentElement
function resolveScrollMeasureElement(target: ScrollTarget | null): HTMLElement | null {
  if (!target) return null
  if (isWindowTarget(target)) return target.document.documentElement
  if (isDocumentTarget(target)) return target.documentElement
  return target
}
export function useScroll(
  target?: Ref | HTMLElement | Window | Document,
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
  let eventTarget: ScrollTarget | null = null // scroll 事件的实际监听目标
  let measureElement: HTMLElement | null = null // 滚动位置与最大滚动距离的读取元素
  let scrollEndTimer: ReturnType<typeof setTimeout> | null = null // 无原生 scrollend 时的滚动结束兜底定时器
  let lastScrollEvent: Event | null = null // 兜底定时器触发时用于回调的事件对象
  // 取消滚动结束兜底定时器
  function clearScrollEndTimer(): void {
    if (scrollEndTimer !== null) {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = null
    }
  }
  // 滚动结束事件：重置方向状态并回调；原生 scrollend 与兜底定时器可能都触发，靠 isScrolling 保证幂等
  function scrollEndEvent(e: Event) {
    clearScrollEndTimer()
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
  // 滚动事件
  function scrollEvent(e: Event) {
    isScrolling.value = true
    if (measureElement) {
      x.value = measureElement.scrollLeft
      y.value = measureElement.scrollTop
      left.value = x.value < lastScrollLeft.value
      right.value = x.value > lastScrollLeft.value
      top.value = y.value < lastScrollTop.value
      bottom.value = y.value > lastScrollTop.value
      lastScrollLeft.value = x.value
      lastScrollTop.value = y.value
    }
    // 兜底：不支持原生 scrollend 的浏览器靠该定时器判定滚动结束，每次滚动都重置计时
    lastScrollEvent = e
    clearScrollEndTimer()
    scrollEndTimer = setTimeout(() => {
      scrollEndTimer = null
      if (lastScrollEvent) scrollEndEvent(lastScrollEvent)
    }, throttleDelay + 200)
    onScroll && onScroll(e)
  }
  // 使用节流函数限制滚动事件触发频率
  const throttleScroll = throttle(scrollEvent, throttleDelay)
  // 计算滚动目标元素：未传 target 时默认监听整页滚动；SSR（Node）无 window，返回 null
  const scrollTarget = computed<ScrollTarget | null>(() => {
    const targetValue = toValue(target) as ScrollTarget | null
    if (targetValue) {
      return targetValue
    }
    return typeof window !== 'undefined' ? window : null
  })
  // 清理函数：移除事件监听、取消兜底定时器并复位内部引用
  function cleanup(): void {
    eventTarget?.removeEventListener('scroll', throttleScroll as EventListener)
    eventTarget?.removeEventListener('scrollend', scrollEndEvent as EventListener)
    eventTarget = null
    measureElement = null
    clearScrollEndTimer()
  }
  // 监听滚动目标元素的变化：切换目标时先清理旧监听，再按新目标重建
  watch(
    () => scrollTarget.value,
    (to) => {
      cleanup()
      if (!to) return
      eventTarget = resolveScrollEventTarget(to)
      measureElement = resolveScrollMeasureElement(to)
      if (measureElement) {
        xScrollMax.value = measureElement.scrollWidth - measureElement.clientWidth
        yScrollMax.value = measureElement.scrollHeight - measureElement.clientHeight
      }
      eventTarget?.addEventListener('scroll', throttleScroll as EventListener)
      // 原生 scrollend 直接回调；不支持该事件的浏览器由 scrollEvent 中的兜底定时器接管
      eventTarget?.addEventListener('scrollend', scrollEndEvent as EventListener)
    },
    {
      immediate: true,
      flush: 'post'
    }
  )
  // 在组件卸载前调用清理函数，避免监听与兜底定时器残留
  onBeforeUnmount(cleanup)
  // 返回滚动位置和各种状态信息
  return { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from 'vue-amazing-ui'
const scrollRef = ref<HTMLDivElement | null>(null)
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
const scrollRef = ref<HTMLDivElement | null>(null)
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
| target? | 滚动目标元素，未传时默认监听整页滚动（绑定到 `window`） | Ref &#124; HTMLElement &#124; Window &#124; Document | window |
| throttleDelay | 节流延迟时间，单位 `ms`，用于限制滚动事件的触发频率 | number | 0 |
| onScroll? | 滚动事件的回调函数 | (e: Event) => void | undefined |
| onStop? | 滚动结束的回调函数 | (e: Event) => void | undefined |

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| x | 水平滚动距离 | Ref&lt;number&gt; |
| xScrollMax | 水平最大可滚动距离 | Ref&lt;number&gt; |
| y | 垂直滚动距离 | Ref&lt;number&gt; |
| yScrollMax | 垂直最大可滚动距离 | Ref&lt;number&gt; |
| isScrolling | 是否正在滚动 | Ref&lt;boolean&gt; |
| left | 是否向左滚动 | Ref&lt;boolean&gt; |
| right | 是否向右滚动 | Ref&lt;boolean&gt; |
| top | 是否向上滚动 | Ref&lt;boolean&gt; |
| bottom | 是否向下滚动 | Ref&lt;boolean&gt; |
