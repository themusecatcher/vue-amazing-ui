# 滚动监测 useScroll

<GlobalElement />

_实时监测滚动位置、方向与边界状态的组合式函数_

::: details Show Source Code

```ts
import { ref, computed, watch, toValue, onBeforeUnmount } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
type ScrollTarget = HTMLElement | Window | Document

/** 类型守卫：是否为 window（视口级滚动目标） */
function isWindowTarget(value: unknown): value is Window {
  return typeof window !== 'undefined' && value === window
}
/** 类型守卫：是否为 document */
function isDocumentTarget(value: unknown): value is Document {
  return typeof Document !== 'undefined' && value instanceof Document
}
/**
 * 解析 scroll 事件的实际监听目标
 *
 * 视口（页面级）滚动时，scroll 事件派发在 window / document 上，documentElement 收不到
 * （元素级 scroll 不冒泡，视口滚动的事件目标为 Document / Window）。
 * 故传入 documentElement 时需改听 window，否则监听恒不触发。
 */
function resolveScrollEventTarget(target: ScrollTarget | null): ScrollTarget | null {
  if (!target) return null
  if (typeof document !== 'undefined' && target === document.documentElement) return window
  return target
}
/** 解析滚动位置与尺寸的读取元素：window / document 自身没有这些属性，需回退到 documentElement */
function resolveScrollMeasureElement(target: ScrollTarget | null): HTMLElement | null {
  if (!target) return null
  if (isWindowTarget(target)) return target.document.documentElement
  if (isDocumentTarget(target)) return target.documentElement
  return target
}
/** 滚动方向：内容位移方向（`scrollTop` 增大为 `bottom`，与 Scrollbar 的 thumb 移动方向同口径） */
type ScrollDirection = 'left' | 'right' | 'top' | 'bottom'
/** `useScroll` 的配置项 */
export interface UseScrollOptions {
  /** 滚动结束判定的静默时长（ms），作为原生 `scrollend` 的兜底；先到者生效 */
  scrollEndDelay?: number
  /** 滚动中的回调；状态（位置 / 上限 / 边界 / 方向）在回调前已同步，不做节流 */
  onScroll?: (e: Event) => void
  /** 滚动结束的回调；原生 `scrollend` 与静默期定时器互斥，只触发一次 */
  onStop?: (e: Event) => void
}
/** `useScroll` 的返回值 */
export interface UseScrollReturn {
  x: Ref<number>
  y: Ref<number>
  maxX: Ref<number>
  maxY: Ref<number>
  isScrolling: Ref<boolean>
  direction: Ref<ScrollDirection | null>
  atLeft: Ref<boolean>
  atRight: Ref<boolean>
  atTop: Ref<boolean>
  atBottom: Ref<boolean>
  refresh: () => void
  start: () => void
  stop: () => void
}
/** 边界判定容差（px）：内容尺寸按整数取整、滚动位置可能是小数，1px 内视为到底 */
const SCROLL_EDGE_TOLERANCE = 1
export function useScroll(
  target?: MaybeRefOrGetter<ScrollTarget | null | undefined>,
  options: UseScrollOptions = {}
): UseScrollReturn {
  const { scrollEndDelay = 200, onScroll, onStop } = options
  const x = ref(0)
  const y = ref(0)
  const maxX = ref(0)
  const maxY = ref(0)
  const isScrolling = ref(false)
  const direction = ref<ScrollDirection | null>(null)
  const atLeft = ref(true)
  const atRight = ref(true)
  const atTop = ref(true)
  const atBottom = ref(true)
  let eventTarget: ScrollTarget | null = null
  let measureElement: HTMLElement | null = null
  let endTimer: ReturnType<typeof setTimeout> | null = null
  let lastEvent: Event | null = null
  let lastX = 0
  let lastY = 0
  let listening = true
  // 滚动目标：未传或为空时默认整页滚动；SSR（Node）无 window，返回 null
  const scrollTarget = computed<ScrollTarget | null>(() => {
    const targetValue = toValue(target) as ScrollTarget | null | undefined
    if (targetValue) return targetValue
    return typeof window !== 'undefined' ? window : null
  })
  function clearEndTimer(): void {
    if (endTimer !== null) {
      clearTimeout(endTimer)
      endTimer = null
    }
  }
  // 按当前位置刷新四个边界标志
  function syncEdges(): void {
    atLeft.value = x.value <= SCROLL_EDGE_TOLERANCE
    atRight.value = maxX.value - x.value <= SCROLL_EDGE_TOLERANCE
    atTop.value = y.value <= SCROLL_EDGE_TOLERANCE
    atBottom.value = maxY.value - y.value <= SCROLL_EDGE_TOLERANCE
  }
  // 重新测量位置与上限；读到位置即作为方向判定基准，切换目标后首个事件不会误判方向
  function measure(): void {
    const element = measureElement
    if (!element) return
    x.value = element.scrollLeft
    y.value = element.scrollTop
    lastX = x.value
    lastY = y.value
    maxX.value = Math.max(element.scrollWidth - element.clientWidth, 0)
    maxY.value = Math.max(element.scrollHeight - element.clientHeight, 0)
    syncEdges()
  }
  // 读数复位：无可用目标时所有数值归零、边界标志全部为「无余量」
  function resetReading(): void {
    x.value = 0
    y.value = 0
    lastX = 0
    lastY = 0
    maxX.value = 0
    maxY.value = 0
    syncEdges()
  }
  // 滚动结束：原生 scrollend 与静默期定时器可能都触发，靠 isScrolling 保证只回调一次
  function finishScroll(e: Event): void {
    clearEndTimer()
    lastEvent = null
    if (!isScrolling.value) return
    isScrolling.value = false
    direction.value = null
    if (onStop) onStop(e)
  }
  // 滚动事件：先同步状态、后回调；状态不受节流影响
  function handleScroll(e: Event): void {
    const element = measureElement
    if (!element) return
    const nextX = element.scrollLeft
    const nextY = element.scrollTop
    const deltaX = nextX - lastX
    const deltaY = nextY - lastY
    x.value = nextX
    y.value = nextY
    lastX = nextX
    lastY = nextY
    // 内容可能在滚动间隙被撑开 / 收起，顺带刷新上限，边界标志才不会停在旧值
    maxX.value = Math.max(element.scrollWidth - element.clientWidth, 0)
    maxY.value = Math.max(element.scrollHeight - element.clientHeight, 0)
    syncEdges()
    // 方向取本次位移；双轴同时位移取位移更大的一轴，位移为 0（写回同一位置）时保留上一个方向
    if (deltaX !== 0 || deltaY !== 0) {
      if (Math.abs(deltaY) < Math.abs(deltaX)) {
        direction.value = deltaX > 0 ? 'right' : 'left'
      } else {
        direction.value = deltaY > 0 ? 'bottom' : 'top'
      }
    }
    isScrolling.value = true
    lastEvent = e
    // 静默期计时与原生 scrollend 双保险：先到者收尾并清掉另一方
    clearEndTimer()
    endTimer = setTimeout(() => {
      endTimer = null
      if (lastEvent) finishScroll(lastEvent)
    }, scrollEndDelay)
    if (onScroll) onScroll(e)
  }
  // 解绑监听并结束「滚动中」状态（位置与上限保留，由后续 measure 覆盖）
  function unbind(): void {
    if (eventTarget) {
      eventTarget.removeEventListener('scroll', handleScroll as EventListener)
      eventTarget.removeEventListener('scrollend', finishScroll as EventListener)
    }
    eventTarget = null
    measureElement = null
    lastEvent = null
    clearEndTimer()
    isScrolling.value = false
    direction.value = null
  }
  // 绑定监听：事件目标与测量元素分开解析（视口滚动的两者分别是 window 与 documentElement）
  function bind(elementTarget: ScrollTarget | null): void {
    unbind()
    if (!elementTarget) {
      resetReading()
      return
    }
    eventTarget = resolveScrollEventTarget(elementTarget)
    measureElement = resolveScrollMeasureElement(elementTarget)
    measure()
    // 不 preventDefault，声明 passive 让浏览器不必等待回调即可继续滚动
    eventTarget?.addEventListener('scroll', handleScroll as EventListener, { passive: true })
    eventTarget?.addEventListener('scrollend', finishScroll as EventListener)
  }
  function refresh(): void {
    measure()
  }
  function start(): void {
    if (listening && eventTarget) return
    listening = true
    bind(scrollTarget.value)
  }
  function stop(): void {
    listening = false
    unbind()
  }
  // 目标变化（含挂载后 ref 就位）时重建监听；stop 期间不绑定
  watch(
    scrollTarget,
    (to) => {
      if (!listening) return
      bind(to)
    },
    { immediate: true, flush: 'post' }
  )
  // 卸载前解绑监听并取消静默期定时器
  onBeforeUnmount(() => {
    listening = false
    unbind()
  })
  return { x, y, maxX, maxY, isScrolling, direction, atLeft, atRight, atTop, atBottom, refresh, start, stop }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from 'vue-amazing-ui'
const scrollRef = ref<HTMLDivElement | null>(null)
const { x, y, maxX, maxY, isScrolling, direction, atLeft, atRight, atTop, atBottom } = useScroll(scrollRef, {
  onScroll,
  onStop
})
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
  <Card title="滚动位置及状态" :width="360" :body-style="{ fontSize: '16px' }">
    <p>水平滚动距离：{{ x }}</p>
    <p>垂直滚动距离：{{ y }}</p>
    <p>水平最大可滚动距离：{{ maxX }}</p>
    <p>垂直最大可滚动距离：{{ maxY }}</p>
    <p>是否正在滚动：{{ isScrolling }}</p>
    <p>滚动方向：{{ direction ?? '—' }}</p>
    <p>是否已到最左 / 最右：{{ atLeft }} / {{ atRight }}</p>
    <p>是否已到顶部 / 底部：{{ atTop }} / {{ atBottom }}</p>
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
const { x, y, maxX, maxY, isScrolling, direction, atLeft, atRight, atTop, atBottom } = useScroll(scrollRef, {
  onScroll,
  onStop
})
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
    <Card title="滚动位置及状态" :width="360" :body-style="{ fontSize: '16px' }">
      <p>水平滚动距离：{{ x }}</p>
      <p>垂直滚动距离：{{ y }}</p>
      <p>水平最大可滚动距离：{{ maxX }}</p>
      <p>垂直最大可滚动距离：{{ maxY }}</p>
      <p>是否正在滚动：{{ isScrolling }}</p>
      <p>滚动方向：{{ direction ?? '—' }}</p>
      <p>是否已到最左 / 最右：{{ atLeft }} / {{ atRight }}</p>
      <p>是否已到顶部 / 底部：{{ atTop }} / {{ atBottom }}</p>
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

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| target? | 滚动目标：元素 / `window` / `document` / `Ref` / `getter`，未传或为空时默认监听整页滚动（绑定到 `window`） | MaybeRefOrGetter&lt;HTMLElement &#124; Window &#124; Document &#124; null&gt; | window |
| options.scrollEndDelay | 滚动结束判定的静默时长，单位 `ms`，作为原生 `scrollend` 的兜底 | number | 200 |
| options.onScroll | 滚动中的回调函数；状态在回调前已同步 | (e: Event) => void | undefined |
| options.onStop | 滚动结束的回调函数，只触发一次 | (e: Event) => void | undefined |

## Return

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| x | 水平滚动距离（`scrollLeft`） | Ref&lt;number&gt; |
| y | 垂直滚动距离（`scrollTop`） | Ref&lt;number&gt; |
| maxX | 水平最大可滚动距离（`scrollWidth - clientWidth`，下限 `0`） | Ref&lt;number&gt; |
| maxY | 垂直最大可滚动距离（`scrollHeight - clientHeight`，下限 `0`） | Ref&lt;number&gt; |
| isScrolling | 是否正在滚动 | Ref&lt;boolean&gt; |
| direction | 滚动方向：`'left'` / `'right'` / `'top'` / `'bottom'`，滚动结束为 `null` | Ref&lt;'left' &#124; 'right' &#124; 'top' &#124; 'bottom' &#124; null&gt; |
| atLeft | 横向是否已无可滚动余量（到最左，含 `1px` 容差） | Ref&lt;boolean&gt; |
| atRight | 横向是否已无可滚动余量（到最右，含 `1px` 容差） | Ref&lt;boolean&gt; |
| atTop | 纵向是否已无可滚动余量（到顶部，含 `1px` 容差） | Ref&lt;boolean&gt; |
| atBottom | 纵向是否已无可滚动余量（到底部，含 `1px` 容差） | Ref&lt;boolean&gt; |
| refresh | 重新测量位置与最大可滚动距离 | () => void |
| start | 恢复监听（`stop` 之后重新绑定当前目标） | () => void |
| stop | 停止监听并结束「滚动中」状态（保留当前读数） | () => void |

## 注意事项

- 未传 `target` 时默认监听整页滚动：此时内部把 `scroll` 监听绑定到 `window`（视口滚动的事件目标是 `window` / `document`，`documentElement` 收不到 `scroll`）
- 状态同步不做节流：浏览器本身已按帧合并 `scroll` 事件，再叠加时间节流只会丢掉末次位置；需要限制回调频率时请在 `onScroll` 内自行节流
- `direction` 由「本次位置 - 上次位置」判定，与滚动来源（滚轮 / 拖拽 / 程序化写入）无关；双轴同时位移取位移更大的一轴，滚动结束置 `null`
- `maxX` / `maxY` 在每次滚动与调用 `refresh` 时刷新；内容尺寸变化但未产生滚动时，请手动调用 `refresh` 对齐边界标志
- 边界标志含 `1px` 容差；内容不足以滚动时，两侧标志同为 `true`（该方向已无可滚动余量）
- 原生 `scrollend` 与静默期定时器双保险，`onStop` 只触发一次（不支持原生 `scrollend` 的浏览器由定时器接管）
