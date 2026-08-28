# 弹出定位测量 useFloatingPosition

<GlobalElement />

_为弹出类组件提供统一测量骨架的组合式函数_

该组合式函数被 `Select`、`AutoComplete`、`Tooltip` 等弹出类组件内部使用，负责定位容器查询与矩形测量；也可独立复用。

它只负责「量」，不负责「往哪弹」：翻转算法、对齐几何、遮挡边界等定位决策因组件需求不同，刻意保留在各组件层。

:::: details Show Source Code

```ts
import { ref, nextTick } from 'vue'
import type { Ref } from 'vue'
export function useFloatingPosition(
  contentRef: Ref<HTMLElement | null>,
  panelRef: Ref<HTMLElement | null>
): {
  positionedContainerRect: Ref<DOMRect | undefined>
  contentRect: Ref<DOMRect | undefined>
  measure: () => Promise<void>
} {
  const positionedContainer = ref<HTMLElement | null>(null) // 弹出框相对定位的容器元素
  const positionedContainerRect = ref<DOMRect>() // positionedContainer 元素的大小及其相对于视口的位置
  const contentRect = ref<DOMRect>() // 内容元素的大小及其相对于视口的位置

  // 获取弹出框相对定位的容器元素
  function getPositionedContainer(): void {
    let parentElement = panelRef.value?.parentElement
    while (parentElement) {
      if (parentElement === document.documentElement) {
        positionedContainer.value = document.documentElement
        return
      }
      const { position } = getComputedStyle(parentElement)
      if (position !== 'static') {
        positionedContainer.value = parentElement
        return
      }
      parentElement = parentElement.parentElement
    }
  }

  // 在 nextTick 后测量定位容器与内容元素的视口矩形
  async function measure(): Promise<void> {
    await nextTick()
    getPositionedContainer()
    positionedContainerRect.value = positionedContainer.value?.getBoundingClientRect() as DOMRect
    contentRect.value = contentRef.value?.getBoundingClientRect() as DOMRect
  }

  return { positionedContainerRect, contentRect, measure }
}
```

::::

## 基本使用

_测量弹出面板的定位容器与内容元素矩形_

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useFloatingPosition } from 'vue-amazing-ui'
const contentRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const { positionedContainerRect, contentRect, measure } = useFloatingPosition(contentRef, panelRef)
measure()
</script>
<template>
  <div>
    <button ref="contentRef">触发器</button>
    <div ref="panelRef" class="panel">弹出面板</div>
  </div>
</template>
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| contentRef | 触发器内容元素 | Ref&lt;HTMLElement &#124; null&gt; | undefined |
| panelRef | 弹出面板，同时作为定位容器的查询起点 | Ref&lt;HTMLElement &#124; null&gt; | undefined |

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| positionedContainerRect | 定位容器元素的大小及其相对于视口的位置 | Ref&lt;DOMRect &#124; undefined&gt; |
| contentRect | 内容元素的大小及其相对于视口的位置 | Ref&lt;DOMRect &#124; undefined&gt; |
| measure | 在 `nextTick` 后测量定位容器与内容元素的视口矩形 | () => Promise&lt;void&gt; |
