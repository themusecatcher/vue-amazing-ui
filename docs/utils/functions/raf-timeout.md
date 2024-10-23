# 定时器 rafTimeout cancelRaf

<GlobalElement />

*使用 `raf` 动画帧模拟实现的定时器，等效替代 `setTimeout()` 和 `setInterval()`*

::: details Show Source Code

```ts
/**
 * 使用 requestAnimationFrame 实现的延迟 setTimeout 或间隔 setInterval 调用函数
 *
 * @param fn 要执行的函数
 * @param delay 延迟的时间，单位为 ms，默认为 0，表示不延迟立即执行
 * @param interval 是否间隔执行，如果为 true，则在首次执行后，以 delay 为间隔持续执行
 * @returns 返回一个对象，包含一个 id 属性，该 id 为 requestAnimationFrame 的调用 ID，可用于取消动画帧
 */
export function rafTimeout(fn: Function, delay: number = 0, interval: boolean = false): object {
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
  interface AnimationFrameID {
    id: number
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
 * @param raf - 包含请求动画帧 ID 的对象；该 ID 是由 requestAnimationFrame 返回的
 *              该函数旨在取消之前通过 requestAnimationFrame 请求的动画帧
 *              如果传入的 raf 对象或其 id 无效，则会打印警告
 */
export function cancelRaf(raf: { id: number }): void {
  if (raf && raf.id && typeof raf.id === 'number') {
    cancelAnimationFrame(raf.id)
  } else {
    console.warn('cancelRaf received an invalid id:', raf)
  }
}
```

:::

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { rafTimeout, cancelRaf } from 'vue-amazing-ui'

const timeoutRaf = rafTimeout(() => {
  console.log('raf timeout')
}, 1000)

const intervalRaf = rafTimeout(() => {
  console.log('raf interval')
}, 1000, true)
onUnmounted(() => {
  cancelRaf(timeoutRaf)
  cancelRaf(intervalRaf)
})
</script>

## 延时调用

*打开控制台查看输出*

```vue
<script setup lang="ts">
import { onUnmounted } from 'vue'
import { rafTimeout, cancelRaf } from 'vue-amazing-ui'

const timeoutRaf = rafTimeout(() => {
  console.log('raf timeout')
}, 1000)

onUnmounted(() => {
  cancelRaf(timeoutRaf)
})
</script>
```

## 间歇调用

*打开控制台查看输出*

```vue
<script setup lang="ts">
import { onUnmounted } from 'vue'
import { rafTimeout, cancelRaf } from 'vue-amazing-ui'

const intervalRaf = rafTimeout(() => {
  console.log('raf interval')
}, 1000, true)

onUnmounted(() => {
  cancelRaf(intervalRaf)
})
</script>
```

## Params

### rafTimeout

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
fn | 要执行的函数 | Function | undefined
delay | 延时调用或间歇调用时间间隔，单位 `ms` | number | 0
interval | 是否使用间歇调用 | boolean | false

### cancelRaf

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
raf | 包含请求动画帧 `ID` 的对象；该 `ID` 是由 `requestAnimationFrame` 返回的 | object | undefined
