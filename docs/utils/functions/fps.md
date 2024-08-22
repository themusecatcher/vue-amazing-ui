# 刷新率 useFps

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*实时监测浏览器刷新率FPS的组合式函数*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 实时监测浏览器刷新率FPS
 *
 * FPS值可以帮助开发者识别性能瓶颈，以优化应用的性能
 *
 * @returns {Object} 返回一个包含 FPS 值的 ref 对象
 */
import { ref } from 'vue'
export function useFps() {
  const fps = ref<number>(0)
  const frameCount = ref<number>(0)
  let lastTime = performance.now()
  const every = 10
  const calculateFrameRate = (currentTime: number) => {
    frameCount.value++
    if (frameCount.value >= every) {
      // 每 every 帧进行一次 FPS 计算
      const timeDiff = currentTime - lastTime
      fps.value = Math.round(1000 / (timeDiff / every))
      lastTime = currentTime
      frameCount.value = 0
    }
    requestAnimationFrame(calculateFrameRate)
  }
  requestAnimationFrame(calculateFrameRate)
  // 返回帧率状态
  return { fps }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { useFps } from 'vue-amazing-ui'

const { fps } = useFps()
</script>

## 基本使用

<h3>帧率：{{ fps }}</h3>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useFps } from 'vue-amazing-ui'

const { fps } = useFps()
</script>
<template>
  <h3>帧率：{{ fps }}</h3>
</template>
```
