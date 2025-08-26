# 节流 throttle

<GlobalElement />

_如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间 `delay` 期限内不再工作，直至过了这段时间才重新生效_

::: details Show Source Code

```ts
/**
 * 节流函数 throttle
 *
 * 该函数用于生成一个节流函数，用于控制某个函数在给定时间间隔内只能被执行一次
 * 主要用于性能优化，例如限制事件处理函数的触发频率
 *
 * @param {Function} fn 要被节流的函数
 * @param {number} [delay = 300] 节流的时间间隔，单位 ms，默认为 300ms
 * @returns {Function} 返回一个新的节流的函数
 */
export function throttle(fn: Function, delay: number = 300): Function {
  let valid = true // 用于标记函数是否可以执行
  return function (...args: any[]) {
    if (!valid) return false // 返回 false，表示当前不执行函数
    // 返回一个新的函数，该函数负责执行节流逻辑
    if (valid) {
      fn(...args) // 执行原函数
      valid = false // 将函数置为无效
      setTimeout(() => {
        valid = true
      }, delay)
    }
  }
}
```

:::

## 何时使用

- 短时间内大量触发同一事件时，每 `delay` `ms` 内函数只执行一次

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'
const scrollTop = ref(0)
useEventListener(window, 'scroll', throttle(showPosition, 100))
function showPosition () {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>

## 基本使用

<h3>滚动条位置：{{ scrollTop }}</h3>

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'
const scrollTop = ref(0)
useEventListener(window, 'scroll', throttle(showPosition, 100))
function showPosition() {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>
```

## Params

| 参数  | 说明                      | 类型     | 默认值    |
| ----- | ------------------------- | -------- | --------- |
| fn    | 要被节流的函数            | Function | undefined |
| delay | 节流的时间间隔，单位 `ms` | number   | 300       |
