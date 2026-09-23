# 节流 throttle

<GlobalElement />

_如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间 `delay` 期限内不再工作，直至过了这段时间才重新生效_

## 何时使用

- 短时间内大量触发同一事件时，每 `delay` `ms` 内函数只执行一次

::: details Show Source Code

```ts
/**
 * 节流：限制函数在 `delay` 内最多执行一次
 *
 * 首次调用立即执行，`delay` 内的后续调用被忽略（非「拖尾执行」）；常用于滚动 / 拖拽等高频事件。
 *
 * @param fn - 需要节流的函数
 * @param delay - 节流间隔（ms），默认 300
 * @returns 节流后的包装函数；处于节流窗口内被忽略的调用直接返回 false
 */
export function throttle(fn: Function, delay: number = 300): Function {
  let valid = true // 当前是否处于可执行窗口
  return function (...args: any[]) {
    if (!valid) return false // 处于节流窗口内，直接忽略本次调用
    fn(...args) // 执行原函数
    valid = false // 关闭窗口，delay 后重新开启
    setTimeout(() => {
      valid = true
    }, delay)
  }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'
const scrollTop = ref(0)
// SSR（Node）环境无 window，需判断存在性后再注册监听
if (typeof window !== 'undefined') {
  useEventListener(window, 'scroll', throttle(showPosition, 100))
}
function showPosition() {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>

## 基本使用

<h3>滚动条位置：{{ scrollTop }}</h3>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'
const scrollTop = ref(0)
// SSR（Node）环境无 window，需判断存在性后再注册监听
if (typeof window !== 'undefined') {
  useEventListener(window, 'scroll', throttle(showPosition, 100))
}
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

## Return

| 类型 | 说明 |
| --- | --- |
| Function | 节流后的新函数；处于节流窗口内被忽略的调用返回 `false` |
