# 弹出定位测量 useFloatingPosition

<GlobalElement />

_为弹出类组件提供统一测量骨架的组合式函数_

查询弹出面板的定位容器，并测量容器与内容元素的视口矩形。

::: details Show Source Code

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

:::

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useFloatingPosition } from 'vue-amazing-ui'
const contentRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelVisible = ref(true)
const { positionedContainerRect, contentRect, measure } = useFloatingPosition(contentRef, panelRef)
// 面板渲染完成后才能测量，否则矩形为 undefined（measure 内部已 await nextTick）
onMounted(measure)
async function togglePanel() {
  panelVisible.value = !panelVisible.value
  if (!panelVisible.value) {
    // 面板移除后清空测量结果，避免继续展示过期数据
    positionedContainerRect.value = undefined
    contentRect.value = undefined
    return
  }
  await measure()
}
// 测量结果即 getBoundingClientRect()，此处只展示宽高
function formatRect(rect?: DOMRect) {
  return rect ? `宽 ${Math.round(rect.width)} × 高 ${Math.round(rect.height)}` : '未测量'
}
const containerInfo = computed(() => formatRect(positionedContainerRect.value))
const contentInfo = computed(() => formatRect(contentRect.value))
</script>

## 基本使用

_虚线框 ① 是定位容器，触发器 ② 是内容元素，面板绝对定位于 ① 内_

<br/>

<Flex vertical :gap="24">
  <div class="demo-stage">
    <span class="demo-legend">① 定位容器（position: relative）：{{ containerInfo }}</span>
    <div class="demo-row">
      <button ref="contentRef" class="demo-trigger" @click="togglePanel">触发器</button>
      <span class="demo-value">② 内容元素（contentRef）：{{ contentInfo }}</span>
    </div>
    <div v-if="panelVisible" ref="panelRef" class="demo-panel">弹出面板 · panelRef</div>
  </div>
  <Card :body-style="{ fontSize: '16px' }">
    <p>① 虚线框 = 定位容器：面板向上查找到的最近一个 <code>position</code> 非 <code>static</code> 的祖先，对应 <code>positionedContainerRect</code></p>
    <p>② 触发器 = 内容元素：传入的 <code>contentRef</code> 元素，对应 <code>contentRect</code></p>
    <p>面板绝对定位于 ① 内，要先量出这两个矩形才能算出面板位置；点击触发器可切换面板显隐</p>
  </Card>
</Flex>

<style lang="less" scoped>
.demo-stage {
  position: relative;
  width: 380px;
  // 底部预留空间给绝对定位的弹出面板（面板 top: 64px）
  padding: 16px 16px 64px;
  border: 1px dashed #1677ff;
  border-radius: 8px;
  background: #f7faff;
  font-size: 14px;
  .demo-legend {
    position: absolute;
    top: -11px;
    left: 12px;
    padding: 0 6px;
    font-size: 12px;
    color: #1677ff;
    background: #fff;
  }
  .demo-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .demo-trigger {
    padding: 6px 16px;
    // 与 ② 内容元素数值同色，便于一一对应
    border: 1px solid #fa8c16;
    color: #fa8c16;
    cursor: pointer;
  }
  .demo-value {
    font-size: 12px;
    color: #fa8c16;
  }
  .demo-panel {
    position: absolute;
    top: 64px;
    left: 16px;
    padding: 8px 16px;
    background: #f0f5ff;
    border: 1px solid #1677ff;
    border-radius: 6px;
    font-size: 12px;
    color: #1677ff;
  }
}
</style>

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useFloatingPosition } from 'vue-amazing-ui'
const contentRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelVisible = ref(true)
const { positionedContainerRect, contentRect, measure } = useFloatingPosition(contentRef, panelRef)
// 面板渲染完成后才能测量，否则矩形为 undefined（measure 内部已 await nextTick）
onMounted(measure)
async function togglePanel() {
  panelVisible.value = !panelVisible.value
  if (!panelVisible.value) {
    // 面板移除后清空测量结果，避免继续展示过期数据
    positionedContainerRect.value = undefined
    contentRect.value = undefined
    return
  }
  await measure()
}
// 测量结果即 getBoundingClientRect()，此处只展示宽高
function formatRect(rect?: DOMRect) {
  return rect ? `宽 ${Math.round(rect.width)} × 高 ${Math.round(rect.height)}` : '未测量'
}
const containerInfo = computed(() => formatRect(positionedContainerRect.value))
const contentInfo = computed(() => formatRect(contentRect.value))
</script>
<template>
  <Flex vertical :gap="24">
    <div class="demo-stage">
      <span class="demo-legend">① 定位容器（position: relative）：{{ containerInfo }}</span>
      <div class="demo-row">
        <button ref="contentRef" class="demo-trigger" @click="togglePanel">触发器</button>
        <span class="demo-value">② 内容元素（contentRef）：{{ contentInfo }}</span>
      </div>
      <div v-if="panelVisible" ref="panelRef" class="demo-panel">弹出面板 · panelRef</div>
    </div>
    <Card :body-style="{ fontSize: '16px' }">
      <p>① 虚线框 = 定位容器：面板向上查找到的最近一个 <code>position</code> 非 <code>static</code> 的祖先，对应 <code>positionedContainerRect</code></p>
      <p>② 触发器 = 内容元素：传入的 <code>contentRef</code> 元素，对应 <code>contentRect</code></p>
      <p>面板绝对定位于 ① 内，要先量出这两个矩形才能算出面板位置；点击触发器可切换面板显隐</p>
    </Card>
  </Flex>
</template>
<style lang="less" scoped>
.demo-stage {
  position: relative;
  width: 380px;
  // 底部预留空间给绝对定位的弹出面板（面板 top: 64px）
  padding: 16px 16px 64px;
  border: 1px dashed #1677ff;
  border-radius: 8px;
  background: #f7faff;
  font-size: 14px;
  .demo-legend {
    position: absolute;
    top: -11px;
    left: 12px;
    padding: 0 6px;
    font-size: 12px;
    color: #1677ff;
    background: #fff;
  }
  .demo-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .demo-trigger {
    padding: 6px 16px;
    // 与 ② 内容元素数值同色，便于一一对应
    border: 1px solid #fa8c16;
    color: #fa8c16;
    cursor: pointer;
  }
  .demo-value {
    font-size: 12px;
    color: #fa8c16;
  }
  .demo-panel {
    position: absolute;
    top: 64px;
    left: 16px;
    padding: 8px 16px;
    background: #f0f5ff;
    border: 1px solid #1677ff;
    border-radius: 6px;
    font-size: 12px;
    color: #1677ff;
  }
}
</style>
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

## 注意事项

- 被 `Select`、`AutoComplete`、`Tooltip` 等弹出类组件内部使用，也可脱离组件库独立复用
- 只负责「量」不负责「往哪弹」：翻转算法、对齐几何、遮挡边界等定位决策因组件需求不同，保留在各组件层
- `measure` 内部会先 `await nextTick()`，请在面板渲染完成后调用，否则测得的矩形为 `undefined`
- 定位容器为面板向上查找到的最近非 `static` 定位祖先；一路查到 `documentElement` 时回退为 `documentElement`
