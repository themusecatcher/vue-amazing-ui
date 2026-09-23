# 滚动感知 useScrollParent

<GlobalElement />

_查询并监听最近可滚动父元素，响应视口 `resize` 的组合式函数_

用于在可滚动容器内正确跟随滚动并维护定位。

::: details Show Source Code

```ts
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useOptionsSupported, useEventListener, getScrollParent } from 'vue-amazing-ui'
// 注：ScrollTarget / resolveScrollEventTarget 为组件库内部共用的滚动目标解析工具（详见 useScroll 源码）
export interface ScrollParentOptions {
  passive?: boolean // 是否使用 passive 滚动监听，默认跟随浏览器支持情况
  onCleanup?: () => void // 附加清理：组件自身需在 cleanup 时执行的逻辑（如 Tooltip 取消位置更新帧）
}
export function useScrollParent(
  contentRef: Ref<HTMLElement | null>,
  onScroll: () => void,
  options: ScrollParentOptions = {}
): {
  scrollTarget: Ref<HTMLElement | null>
  viewportWidth: Ref<number>
  viewportHeight: Ref<number>
  observeScroll: () => void
  cleanup: () => void
} {
  const scrollTarget = ref<HTMLElement | null>(null) // 最近的可滚动父元素
  let scrollEventTarget: ScrollTarget | null = null // 实际承载 scroll 事件的监听目标
  // SSR（Node）环境无 document，取 0；浏览器端初始值与原来一致
  const viewportWidth = ref(typeof document !== 'undefined' ? document.documentElement.clientWidth : 0)
  const viewportHeight = ref(typeof document !== 'undefined' ? document.documentElement.clientHeight : 0)
  const { isSupported: passiveSupported } = useOptionsSupported('passive')
  const usePassive = options.passive !== false && passiveSupported.value

  // 更新视口尺寸，重新查询滚动父元素并触发重排
  function getViewportSize() {
    viewportWidth.value = document.documentElement.clientWidth
    viewportHeight.value = document.documentElement.clientHeight
    observeScroll()
    onScroll()
  }

  // 查询并监听最近可滚动父元素：整页滚动（scrollTarget 为 documentElement）时
  // scroll 事件派发在 window 上，documentElement 收不到，故监听目标需经 resolveScrollEventTarget 解析
  function observeScroll() {
    cleanup()
    scrollTarget.value = getScrollParent(contentRef.value)
    scrollEventTarget = resolveScrollEventTarget(scrollTarget.value)
    scrollEventTarget?.addEventListener('scroll', onScroll, usePassive ? { passive: true } : undefined)
  }

  // 清理滚动监听并重置滚动目标（含组件注入的附加清理）
  function cleanup() {
    scrollEventTarget?.removeEventListener('scroll', onScroll)
    scrollEventTarget = null
    scrollTarget.value = null
    options.onCleanup?.()
  }

  // 实参 window 在 setup 期求值，SSR（Node）下必须先判断存在性再调用
  if (typeof window !== 'undefined') {
    useEventListener(window, 'resize', getViewportSize)
  }
  onMounted(observeScroll)
  onBeforeUnmount(cleanup)

  return { scrollTarget, viewportWidth, viewportHeight, observeScroll, cleanup }
}
```

:::

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useScrollParent } from 'vue-amazing-ui'
const contentRef = ref<HTMLElement | null>(null)
const scrollCount = ref(0)
const { scrollTarget, viewportWidth, viewportHeight } = useScrollParent(contentRef, () => {
  scrollCount.value++
})
const scrollTargetName = computed(() => {
  const target = scrollTarget.value
  if (!target) return '未找到'
  const className = target.className ? `.${target.className}` : ''
  return `${target.tagName.toLowerCase()}${className}`
})
</script>

## 基本使用

_实现弹出面板在可滚动容器内跟随滚动_

<br/>

<div class="scroll-container">
  <div ref="contentRef" class="scroll-content">滚动我</div>
</div>

<br/>

<Card :body-style="{ fontSize: '16px' }">
  <p>最近可滚动父元素：{{ scrollTargetName }}</p>
  <p>滚动触发次数：{{ scrollCount }}</p>
  <p>视口宽度：{{ viewportWidth }}</p>
  <p>视口高度：{{ viewportHeight }}</p>
</Card>

<style lang="less" scoped>
.scroll-container {
  width: 500px;
  height: 360px;
  border: 2px solid #1677ff;
  border-radius: 12px;
  overflow: auto;
  .scroll-content {
    width: 800px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useScrollParent } from 'vue-amazing-ui'
const contentRef = ref<HTMLElement | null>(null)
const scrollCount = ref(0)
const { scrollTarget, viewportWidth, viewportHeight } = useScrollParent(contentRef, () => {
  scrollCount.value++
})
const scrollTargetName = computed(() => {
  const target = scrollTarget.value
  if (!target) return '未找到'
  const className = target.className ? `.${target.className}` : ''
  return `${target.tagName.toLowerCase()}${className}`
})
</script>
<template>
  <div class="scroll-container">
    <div ref="contentRef" class="scroll-content">滚动我</div>
  </div>
  <Card :body-style="{ fontSize: '16px' }">
    <p>最近可滚动父元素：{{ scrollTargetName }}</p>
    <p>滚动触发次数：{{ scrollCount }}</p>
    <p>视口宽度：{{ viewportWidth }}</p>
    <p>视口高度：{{ viewportHeight }}</p>
  </Card>
</template>
<style lang="less" scoped>
.scroll-container {
  width: 500px;
  height: 360px;
  border: 2px solid #1677ff;
  border-radius: 12px;
  overflow: auto;
  .scroll-content {
    width: 800px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| contentRef | 触发器内容元素，用于向上查找可滚动父元素 | Ref&lt;HTMLElement &#124; null&gt; | undefined |
| onScroll | 滚动/`resize` 触发的回调函数 | () => void | undefined |
| options | 配置项 | [ScrollParentOptions](#scrollparentoptions) | {} |

### ScrollParentOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| passive | 是否使用 `passive` 滚动监听 | boolean | 跟随浏览器支持情况 |
| onCleanup | 附加清理，组件自身需在 `cleanup` 时执行的逻辑 | () => void | undefined |

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| scrollTarget | 最近的可滚动父元素 | Ref&lt;HTMLElement &#124; null&gt; |
| viewportWidth | 视口宽度 | Ref&lt;number&gt; |
| viewportHeight | 视口高度 | Ref&lt;number&gt; |
| observeScroll | 查询并监听最近可滚动父元素 | () => void |
| cleanup | 清理滚动监听并重置滚动目标 | () => void |

## 注意事项

- 组件库内部**曾**用它为弹出类组件提供滚动跟随；浮层内核重构后，内部滚动跟随改由内核自带的滚动链监听承担（可覆盖嵌套双层滚动容器），本函数现主要面向外部复用
- 无滚动祖先（整页滚动）时内部会把 `scroll` 监听绑定到 `window`：视口滚动的事件目标是 `window` / `document`，`documentElement` 收不到 `scroll`
- 需在组件 `setup` 中调用；内部会在挂载时自动监听、卸载时自动清理，也可手动调用 `observeScroll` / `cleanup`
- `viewportWidth` / `viewportHeight` 基于 `documentElement` 的 `clientWidth` / `clientHeight`，仅随视口 `resize` 更新
