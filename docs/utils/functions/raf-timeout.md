# 定时器 rafTimeout cancelRaf

<GlobalElement />

_基于 `requestAnimationFrame` 实现的延时/间歇调用，配套提供取消函数 `cancelRaf()`。其回调绑定在渲染帧上，与 `setTimeout()` / `setInterval()` **并不等价**，仅适用于需要与动画帧同步的场景_

::: details Show Source Code

```ts
/**
 * 基于 requestAnimationFrame 实现的延时 / 间歇调用函数
 *
 * 注意：回调与渲染帧绑定 —— 页面不可见时会暂停、实际延迟比 delay 多出至多一帧，
 * 与 setTimeout / setInterval 不等价，仅适用于需要与动画帧同步的场景
 *
 * @param {Function} fn 要执行的函数
 * @param {number} [delay = 0] 延迟的时间，单位为 ms，默认为 0，表示不延迟立即执行
 * @param {boolean} [interval = false] 是否间隔执行，如果为 true，则在首次执行后，以 delay 为间隔持续执行
 * @returns {{ id: number }} 返回一个对象，包含一个 id 属性，该 id 为 requestAnimationFrame 的调用 ID，可用于取消动画帧
 */
export type AnimationFrameID = { id: number }
export function rafTimeout(fn: Function, delay: number = 0, interval: boolean = false): AnimationFrameID {
  let start: number | null = null // 记录动画开始的时间戳
  function timeElapse(timestamp: number) {
    // 定义动画帧回调函数
    /*
      timestamp参数：与 performance.now() 的返回值相同，它表示 requestAnimationFrame() 开始去执行回调函数的时刻
    */
    if (!start) {
      // 如果还没有开始时间，则以当前时间为开始时间
      start = timestamp
    }
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      try {
        fn() // 执行目标函数
      } catch (error) {
        console.error('Error executing rafTimeout function:', error)
      }
      if (interval) {
        // 如果需要间隔执行，则重置开始时间并继续安排下一次动画帧
        start = timestamp
        raf.id = requestAnimationFrame(timeElapse)
      }
    } else {
      raf.id = requestAnimationFrame(timeElapse)
    }
  }
  // 创建一个对象用于存储动画帧的 ID，并初始化动画帧
  const raf: AnimationFrameID = {
    id: requestAnimationFrame(timeElapse)
  }
  return raf
}
/**
 * 用于取消 rafTimeout 函数
 *
 * @param {{ id: number }} raf - 包含请求动画帧 ID 的对象；该 ID 是由 requestAnimationFrame 返回的
 *              该函数旨在取消之前通过 requestAnimationFrame 请求的动画帧
 *              如果传入的 raf 对象或其 id 无效，则会打印警告
 */
export function cancelRaf(raf: AnimationFrameID): void {
  if (raf && typeof raf?.id === 'number') {
    cancelAnimationFrame(raf.id)
  } else {
    console.warn('cancelRaf received an invalid id:', raf)
  }
}
```

:::

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { rafTimeout, cancelRaf } from 'vue-amazing-ui'
import type { AnimationFrameID } from 'vue-amazing-ui'
const timeoutMessage = ref('timeout 3000ms later...')
let timeoutRaf: AnimationFrameID | null = null
const interval = ref(0)
const intervalMessage = ref('interval 0ms...')
const intervalStopped = ref(false)
let intervalRaf: AnimationFrameID | null = null
function stopInterval() {
  if (intervalStopped.value || !intervalRaf) return
  intervalStopped.value = true
  cancelRaf(intervalRaf)
  intervalMessage.value = `已取消（累计 interval ${interval.value}ms）`
}
// SSR（Node）环境无 requestAnimationFrame：挂载后启动，卸载时取消
onMounted(() => {
  timeoutRaf = rafTimeout(() => {
    timeoutMessage.value = 'raf timeout'
  }, 3000)
  intervalRaf = rafTimeout(() => {
    interval.value += 1000
    intervalMessage.value = `interval ${interval.value}ms...`
  }, 1000, true)
})
onBeforeUnmount(() => {
  if (timeoutRaf) {
    cancelRaf(timeoutRaf)
  }
  if (intervalRaf) {
    cancelRaf(intervalRaf)
  }
})
</script>

## 何时使用

- 需要与 `requestAnimationFrame` 动画帧同步的定时任务（如与帧率一致的重绘、插值计算，或需在绘制前完成的布局读写）
- 定时任务需要在组件卸载前通过 `cancelRaf` 取消，避免回调泄漏

::: warning 选用前请确认
`rafTimeout` 的回调绑定在渲染帧上，与 `setTimeout()` / `setInterval()` 存在本质差异：

- **精度**：回调在「已过去时间 ≥ delay」的**首个渲染帧**执行，实际延迟比 `delay` 多出至多一帧（60Hz 约 16.7ms），刷新率越低偏差越大
- **后台行为**：页面不可见（切换标签页、最小化窗口等）时 `requestAnimationFrame` 会被浏览器**暂停**，回调将延后到页面重新可见后才触发，实际延迟可能远大于设定的 `delay`
- **开销**：`interval` 模式需要每一帧轮询判断是否到达间隔，而非注册一次后等待

因此纯计时任务（延迟显示、防抖、轮播节拍等）应优先使用 `setTimeout()` / `setInterval()`；
需要逐帧同步时应直接使用 `requestAnimationFrame`。
:::

## 延时调用

_在 `delay` `ms` 后执行一次回调_

<br/>

<Alert :message="timeoutMessage" type="info" />

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { rafTimeout, cancelRaf } from 'vue-amazing-ui'
import type { AnimationFrameID } from 'vue-amazing-ui'
const timeoutMessage = ref('timeout 3000ms later...')
let timeoutRaf: AnimationFrameID | null = null
// SSR（Node）环境无 requestAnimationFrame：挂载后启动，卸载时取消
onMounted(() => {
  timeoutRaf = rafTimeout(() => {
    timeoutMessage.value = 'raf timeout'
  }, 3000)
})
onBeforeUnmount(() => {
  if (timeoutRaf) {
    cancelRaf(timeoutRaf)
  }
})
</script>
<template>
  <Alert :message="timeoutMessage" type="info" />
</template>
```

## 间歇调用

_每隔 `delay` `ms` 执行一次回调，直到手动取消_

<br/>

<Alert :message="intervalMessage" type="warning">
  <template #actions>
    <Button size="small" type="danger" :disabled="intervalStopped" @click="stopInterval">Stop</Button>
  </template>
</Alert>

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { rafTimeout, cancelRaf } from 'vue-amazing-ui'
import type { AnimationFrameID } from 'vue-amazing-ui'
const interval = ref(0)
const intervalMessage = ref('interval 0ms...')
const intervalStopped = ref(false)
let intervalRaf: AnimationFrameID | null = null
function stopInterval() {
  if (intervalStopped.value || !intervalRaf) return
  intervalStopped.value = true
  cancelRaf(intervalRaf)
  intervalMessage.value = `已取消（累计 interval ${interval.value}ms）`
}
// SSR（Node）环境无 requestAnimationFrame：挂载后启动，卸载时取消
onMounted(() => {
  intervalRaf = rafTimeout(() => {
    interval.value += 1000
    intervalMessage.value = `interval ${interval.value}ms...`
  }, 1000, true)
})
onBeforeUnmount(() => {
  if (intervalRaf) {
    cancelRaf(intervalRaf)
  }
})
</script>
<template>
  <Alert :message="intervalMessage" type="warning">
    <template #actions>
      <Button size="small" type="danger" :disabled="intervalStopped" @click="stopInterval">Stop</Button>
    </template>
  </Alert>
</template>
```

## Params

### rafTimeout

| 参数     | 说明                                  | 类型     | 默认值    |
| -------- | ------------------------------------- | -------- | --------- |
| fn       | 要执行的函数                          | Function | undefined |
| delay    | 延时调用或间歇调用时间间隔，单位 `ms` | number   | 0         |
| interval | 是否使用间歇调用                      | boolean  | false     |

### cancelRaf

| 参数 | 说明                                                                    | 类型             | 默认值    |
| ---- | ----------------------------------------------------------------------- | ---------------- | --------- |
| raf  | 包含请求动画帧 `ID` 的对象；该 `ID` 是由 `requestAnimationFrame` 返回的 | `{ id: number }` | undefined |

## Return

### rafTimeout 返回值

| 类型             | 说明                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------- |
| `{ id: number }` | 包含 `id` 属性的对象，该 `id` 为 `requestAnimationFrame` 的调用 `ID`，可用于取消动画帧 |

### cancelRaf 返回值

<br/>

无返回值（`void`）
