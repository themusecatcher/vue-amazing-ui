# 防抖 debounce

<GlobalElement />

_对于短时间内连续触发的事件，防抖只在停止触发 `delay` `ms` 后执行最后一次调用，触发期间不会执行_

## 何时使用

- 输入框实时搜索 / 联想：避免每次按键都发起请求，只在用户停止输入后请求一次
- 窗口 `resize`、滚动结束后的布局测量与重算：只在用户停止操作后重算一次
- 只关心高频事件的「最终状态」而非过程中的每一次变化时（需要过程中也持续响应，应改用 [节流 throttle](/utils/functions/throttle.html)）

::: details Show Source Code

```ts
/**
 * 防抖：连续触发时只保留最后一次调用，待停止触发满 `delay` 毫秒后执行
 *
 * 触发期间不断重置计时器，故连续高频触发只会执行最后一次；常用于输入、窗口 resize 等场景。
 *
 * @param fn - 需要防抖的函数
 * @param delay - 防抖等待时长（ms），默认 300
 * @returns 防抖后的包装函数；任何情况下都不返回值（原函数的返回值不向外传递）
 */
export function debounce(fn: Function, delay: number = 300): Function {
  let timer: any = null // 闭包持有定时器引用，便于重置
  return function (...args: any[]) {
    if (timer) {
      // 已有待执行任务则重置计时
      clearTimeout(timer)
    }
    // 重新计时，只有最后一次触发会真正执行
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { debounce, useEventListener } from 'vue-amazing-ui'

const scrollTop = ref(0)
// SSR（Node）环境无 window，需判断存在性后再注册监听
if (typeof window !== 'undefined') {
  useEventListener(window, 'scroll', debounce(showPosition, 100))
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
import { debounce, useEventListener } from 'vue-amazing-ui'
const scrollTop = ref(0)
// SSR（Node）环境无 window，需判断存在性后再注册监听
if (typeof window !== 'undefined') {
  useEventListener(window, 'scroll', debounce(showPosition, 100))
}
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

## Return

| 类型 | 说明 |
| --- | --- |
| Function | 防抖后的新函数；任何情况下都不返回值（原函数的返回值不向外传递） |
