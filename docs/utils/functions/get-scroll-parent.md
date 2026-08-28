# 查找最近可滚动父元素 getScrollParent

<GlobalElement />

_向上查找元素最近的可滚动父元素的工具函数_

::: details Show Source Code

```ts
/**
 * 获取父元素
 *
 * 向上查找元素的直接父元素，若元素已是 documentElement 则返回 null
 *
 * @param {HTMLElement} el 待查询的 DOM 元素
 * @returns {HTMLElement | null} 返回父元素，若传入的是 documentElement 或无父元素则返回 null
 */
function getParentElement(el: HTMLElement): HTMLElement | null {
  // Document
  if (el === document.documentElement) return null
  return el.parentElement
}
/**
 * 查找最近的可滚动父元素
 *
 * 从给定元素出发，沿父链向上递归查找第一个 overflow 为 auto/scroll/overlay 的可滚动元素，
 * 若一路查到 documentElement 则返回 documentElement（视口滚动），找不到返回 null
 *
 * @param {HTMLElement | null} el 起始元素，可为 null
 * @returns {HTMLElement | null} 返回最近的可滚动父元素或 documentElement，无则返回 null
 */
export function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (el === null) return null
  const parentElement = getParentElement(el)
  if (parentElement === null) return null
  // Document
  if (parentElement === document.documentElement) return document.documentElement
  const isScrollable = (el: HTMLElement): boolean => {
    const { overflow, overflowX, overflowY } = getComputedStyle(el)
    return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
  }
  // Element
  if (isScrollable(parentElement)) return parentElement
  return getScrollParent(parentElement)
}
```

:::

## 基本使用

_查找元素最近的可滚动父元素_

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getScrollParent } from 'vue-amazing-ui'
const scrollContentRef = ref()
onMounted(() => {
  const scrollParent = getScrollParent(scrollContentRef.value)
  console.log('scrollParent', scrollParent)
})
</script>
<template>
  <div class="scroll-container">
    <div ref="scrollContentRef">Scroll Me</div>
  </div>
</template>
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| el | 起始元素，可从 `null` 开始向上查找 | HTMLElement &#124; null | undefined |

## Return

| 类型 | 说明 |
| --- | --- |
| HTMLElement &#124; null | 最近的可滚动父元素或 `documentElement`，无则返回 `null` |
