# 节流 throttle

<GlobalElement />

_对于短时间内大量触发同一事件的情况，节流保证在每 `delay` `ms` 的窗口内最多执行一次，且窗口的首个调用立即执行_

## 何时使用

- 滚动 / 拖拽 / 鼠标移动等高频事件中需要「过程中的持续响应」时：每 `delay` `ms` 放行一次，不像防抖那样要等到操作停止后才响应
- 需要限制进度回调、尺寸测量、埋点上报等高频逻辑的执行频率时
- 只关心高频事件的「最终状态」而非过程中的每一次变化时，应改用 [防抖 debounce](/utils/functions/debounce.html)

::: details Show Source Code

```ts
/**
 * 节流：同一窗口内最多执行一次——每轮窗口的首个调用立即执行，其后 `delay` 毫秒内的调用被直接丢弃
 *
 * 非周期性调度：窗口结束（`delay` 后）需再次调用才会执行，被丢弃的调用不会补发；常用于滚动 / 拖拽等高频事件。
 *
 * @param fn - 需要节流的函数
 * @param delay - 节流间隔（ms），默认 300
 * @returns 节流后的包装函数；窗口内被丢弃的调用返回 false，正常执行时不返回值（原函数的返回值不向外传递）
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

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| fn | 要被节流的函数 | Function | undefined |
| delay | 节流的时间间隔，单位 `ms` | number | 300 |

## Return

| 类型 | 说明 |
| :-- | :-- |
| Function | 节流后的新函数；窗口内被丢弃的调用返回 `false`，正常执行时不返回值 |
