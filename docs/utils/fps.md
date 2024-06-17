# 刷新率<BackTop />

<br/>

*实时监测浏览器刷新率FPS的组合式函数*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 实时监测浏览器刷新率FPS
 * 
 * 该函数提供了一个用于监测帧率的钩子。它通过计算每秒渲染的帧数（FPS）来评估动画或渲染性能。
 * FPS值可以帮助开发者识别性能瓶颈，以优化应用的性能。
 * 
 * @returns {Object} 返回一个包含FPS值的对象。
 */
export function useFps(): object {
  const fps = ref(0)
  const frameCount = ref(0)
  let lastTime = performance.now()
  const every = 10
  function calculateFrameRate (currentTime: number) {
    frameCount.value++
    if (frameCount.value >= every) { // 每 every 帧进行一次FPS计算
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
<h3>帧率：{{ fps }}</h3>
```
