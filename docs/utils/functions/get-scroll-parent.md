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
 * @param el - 待查询的 DOM 元素
 * @returns 返回父元素，若传入的是 documentElement 或无父元素则返回 null
 */
export function getParentElement(el: HTMLElement): HTMLElement | null {
  if (el === document.documentElement) return null
  return el.parentElement
}
/**
 * 查找最近的可滚动父元素
 *
 * 从给定元素出发，沿父链向上递归查找第一个 overflow 为 auto/scroll/overlay 的可滚动元素，
 * 若一路查到 documentElement 则返回 documentElement（视口滚动），找不到返回 null
 *
 * @param el - 起始元素，可为 null
 * @returns 返回最近的可滚动父元素或 documentElement，无则返回 null
 */
export function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (el === null) return null
  const parentElement = getParentElement(el)
  if (parentElement === null) return null
  if (parentElement === document.documentElement) return document.documentElement
  const isScrollable = (el: HTMLElement): boolean => {
    const { overflow, overflowX, overflowY } = getComputedStyle(el)
    return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
  }
  if (isScrollable(parentElement)) return parentElement
  return getScrollParent(parentElement)
}
```

:::

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getScrollParent } from 'vue-amazing-ui'
const scrollContentRef = ref<HTMLDivElement | null>(null)
const scrollParentName = ref('未找到')
onMounted(() => {
  const scrollParent = getScrollParent(scrollContentRef.value)
  if (scrollParent) {
    const className = scrollParent.className ? `.${scrollParent.className}` : ''
    scrollParentName.value = `${scrollParent.tagName.toLowerCase()}${className}`
  }
})
</script>

## 基本使用

_查找元素最近的可滚动父元素_

<br/>

<div class="scroll-container">
  <div ref="scrollContentRef" class="scroll-content">Scroll Me</div>
</div>

<br/>

<Alert type="info" :message="`最近的可滚动父元素：${scrollParentName}`" />

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
import { onMounted, ref } from 'vue'
import { getScrollParent } from 'vue-amazing-ui'
const scrollContentRef = ref<HTMLDivElement | null>(null)
const scrollParentName = ref('未找到')
onMounted(() => {
  const scrollParent = getScrollParent(scrollContentRef.value)
  if (scrollParent) {
    const className = scrollParent.className ? `.${scrollParent.className}` : ''
    scrollParentName.value = `${scrollParent.tagName.toLowerCase()}${className}`
  }
})
</script>
<template>
  <div class="scroll-container">
    <div ref="scrollContentRef" class="scroll-content">Scroll Me</div>
  </div>
  <Alert type="info" :message="`最近的可滚动父元素：${scrollParentName}`" />
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
| el | 起始元素，可从 `null` 开始向上查找 | HTMLElement &#124; null | undefined |

## Return

| 类型 | 说明 |
| --- | --- |
| HTMLElement &#124; null | 最近的可滚动父元素或 `documentElement`，无则返回 `null` |
