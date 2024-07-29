# 定时器 rafTimeout cancelRaf<BackTop />

<br/>

*使用 `raf` 动画帧模拟实现的定时器，等效替代 `setTimeout()` 和 `setInterval()`*

::: details Show Source Code

```ts
/**
 * 使用requestAnimationFrame实现的延迟setTimeout或间隔setInterval调用函数。
 *
 * @param fn 要执行的函数。
 * @param delay 延迟的时间，单位为ms，默认为0，表示不延迟立即执行。
 * @param interval 是否间隔执行，如果为true，则在首次执行后，以delay为间隔持续执行。
 * @returns 返回一个对象，包含一个id属性，该id为requestAnimationFrame的调用ID，可用于取消动画帧。
 */
export function rafTimeout(fn: Function, delay = 0, interval = false): object {
  let start: number | null = null // 记录动画开始的时间戳
  function timeElapse(timestamp: number) {
    // 定义动画帧回调函数
    /*
      timestamp参数：与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻
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
  // 创建一个对象用于存储动画帧的ID，并初始化动画帧
  const raf: AnimationFrameID = {
    id: requestAnimationFrame(timeElapse)
  }
  return raf
}
/**
 * 用于取消 rafTimeout 函数
 *
 * @param raf - 包含请求动画帧ID的对象。该ID是由requestAnimationFrame返回的。
 *              该函数旨在取消之前通过requestAnimationFrame请求的动画帧。
 *              如果传入的raf对象或其id无效，则会打印警告。
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

## rafTimeout Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
fn | 要执行的函数 | Function | - | true
delay | 延时调用或间歇调用时间间隔，单位 `ms` | number | 0 | false
interval | 是否使用间歇调用 | boolean | false | false
