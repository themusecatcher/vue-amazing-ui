# 刷新率 useFps

<GlobalElement />

_实时监测浏览器刷新率 `FPS` 的组合式函数_

::: details Show Source Code

```ts
/**
 * 组合式函数：实时统计浏览器 FPS
 *
 * 每累计 10 帧计算一次平均帧率；帧循环在挂载后启动（SSR 无 requestAnimationFrame）、
 * 卸载时取消，避免循环永久自我续期。
 *
 * @returns 当前 FPS（初始 0）
 */
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
export function useFps(): { fps: Ref<number> } {
  const fps = ref<number>(0)
  const frameCount = ref<number>(0)
  let lastTime = performance.now()
  let rafId: number | null = null // 当前帧请求 ID，用于卸载时取消帧回调
  const every = 10 // 每 10 帧统计一次，避免逐帧计算带来的抖动
  const calculateFrameRate = (currentTime: number) => {
    frameCount.value++
    if (frameCount.value >= every) {
      // 每 every 帧进行一次 FPS 计算
      const timeDiff = currentTime - lastTime
      fps.value = Math.round(1000 / (timeDiff / every))
      lastTime = currentTime
      frameCount.value = 0
    }
    rafId = requestAnimationFrame(calculateFrameRate)
  }
  // SSR（Node）环境无 requestAnimationFrame，帧循环放到挂载后启动，浏览器端行为不变
  onMounted(() => {
    rafId = requestAnimationFrame(calculateFrameRate)
  })
  // 卸载时取消帧回调，否则该循环会永久自我续期，并持续持有 fps / frameCount 等状态
  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  })
  // 返回帧率状态
  return { fps }
}
```

:::

<script setup lang="ts">
import { useFps } from 'vue-amazing-ui'
const { fps } = useFps()
</script>

## 基本使用

<h3>帧率：{{ fps }}</h3>

```vue
<script setup lang="ts">
import { useFps } from 'vue-amazing-ui'
const { fps } = useFps()
</script>
<template>
  <h3>帧率：{{ fps }}</h3>
</template>
```

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| fps | 实时监测的浏览器刷新率 | Ref&lt;number&gt; |
