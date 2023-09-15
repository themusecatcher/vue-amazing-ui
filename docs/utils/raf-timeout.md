# 定时器<BackTop />

<br/>

*使用 raf 动画帧模拟实现的定时器，等效替代 setTimeout() 和 setInterval()*

::: details  Show Source Code

```typescript
function rafTimeout (fn: Function, delay = 0, interval = false): object {
  // @ts-ignore
  const requestAnimationFrame = typeof window !== 'undefined' ? (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame) : () => {}
  var start: any = null
  function timeElapse (timestamp: number) {
    /*
      timestamp参数：与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻
    */
    if (!start) {
      start = timestamp
    }
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      fn() // 执行目标函数func
      if (interval) { // 使用间歇调用
        start = null
        raf.id = requestAnimationFrame(timeElapse)
      }
    } else {
      raf.id = requestAnimationFrame(timeElapse)
    }
  }
  const raf = { // 引用类型保存，方便获取 requestAnimationFrame()方法返回的 ID.
    id: requestAnimationFrame(timeElapse)
  }
  return raf
}
// 用于取消 rafTimeout 函数
function cancelRaf (raf: { id: number }): void {
  // @ts-ignore
  const cancelAnimationFrame = typeof window !== 'undefined' ? (window.cancelAnimationFrame || window.mozCancelAnimationFrame) : () => {}
  if (raf && raf.id) {
    cancelAnimationFrame(raf.id)
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
delay | 延时调用或间歇调用时间间隔，单位ms | number | 0 | false
interval | 是否使用间歇调用 | false | false
