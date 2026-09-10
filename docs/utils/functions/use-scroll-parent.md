# 滚动感知 useScrollParent

<GlobalElement />

_查询并监听最近可滚动父元素，响应视口 `resize` 的组合式函数_

该组合式函数被 `Select`、`AutoComplete`、`Tooltip` 等弹出类组件内部使用，用于在可滚动容器内正确跟随滚动并维护定位；同时也可独立复用。

无滚动祖先（整页滚动）时，内部会把 `scroll` 监听绑定到 `window`：视口滚动的事件目标是 `window` / `document`，`documentElement` 收不到 `scroll`。

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

## 基本使用

_实现弹出面板在可滚动容器内跟随滚动_

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useScrollParent } from 'vue-amazing-ui'
const contentRef = ref<HTMLElement | null>(null)
const { scrollTarget, viewportWidth, viewportHeight } = useScrollParent(contentRef, () => {
  console.log('scrolled')
})
</script>
<template>
  <div class="scroll-container">
    <div ref="contentRef">Content</div>
  </div>
</template>
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
