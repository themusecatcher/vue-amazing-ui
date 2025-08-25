# 防抖 debounce

<GlobalElement />

_对于短时间内连续触发的事件，防抖就是让某个时间 `delay` 期限内，事件处理函数只执行一次_

::: details Show Source Code

```ts
/**
 * 防抖函数 debounce
 *
 * 主要用于限制函数调用的频率，当频繁触发某个函数时，实际上只需要在最后一次触发后的一段时间内执行一次即可
 * 这对于诸如输入事件处理函数、窗口大小调整事件处理函数等可能会频繁触发的函数非常有用
 *
 * @param {Function} fn 要执行的函数
 * @param {number} [delay = 300] 防抖的时间期限，单位 ms，默认为 300ms
 * @returns {Function} 返回一个新的防抖的函数
 */
export function debounce(fn: Function, delay: number = 300): Function {
  let timer: any = null // 使用闭包保存定时器的引用
  return function (...args: any[]) {
    // 返回一个包装函数
    if (timer) {
      // 如果定时器存在，则清除之前的定时器
      clearTimeout(timer)
    }
    // 设置新的定时器，延迟执行原函数
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
```

:::

## 何时使用

- 对于短时间内连续触发的事件，在 `delay` `ms` 内函数只执行最后一次

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce, useEventListener } from 'vue-amazing-ui'

const scrollTop = ref(0)
useEventListener(window, 'scroll', debounce(showPosition, 100))
function showPosition () {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>

## 基本使用

<h3>滚动条位置：{{ scrollTop }}</h3>

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce, useEventListener } from 'vue-amazing-ui'
const scrollTop = ref(0)
useEventListener(window, 'scroll', debounce(showPosition, 100))
function showPosition() {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>
```

## Params

| 参数  | 说明                      | 类型     | 默认值    |
| ----- | ------------------------- | -------- | --------- |
| fn    | 要执行的函数              | Function | undefined |
| delay | 防抖的时间期限，单位 `ms` | number   | 300       |
