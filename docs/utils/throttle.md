# 节流<BackTop />

<br/>

*如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间（delay）期限内不再工作，直至过了这段时间才重新生效*

::: details  Show Source Code

```ts
function throttle (fn: Function, delay = 300): any {
  var valid = true
  return function () {
    if (valid) {
      valid = false // 将函数置为无效
      rafTimeout(() => {
        fn()
        valid = true
      }, delay)
    }
    return false // valid为false时，函数不执行
  }
}
```

:::

## 何时使用

- 短时间内大量触发同一事件时，每 delay ms 内函数只执行一次

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { throttle } from 'vue-amazing-ui'

onMounted(() => {
  document.onscroll = throttle(showPosition, 1000)
})
onUnmounted(() => {
  // 移除键盘切换事件
  document.onscroll = null
})
function showPosition () {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条位置：' + scrollTop)
}
</script>

## 基本使用

*打开控制台查看输出*

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { throttle } from 'vue-amazing-ui'

onMounted(() => {
  document.onscroll = throttle(showPosition, 1000)
})
onUnmounted(() => {
  // 移除键盘切换事件
  document.onscroll = null
})
function showPosition () {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条位置：' + scrollTop)
}
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
fn | 要执行的函数 | Function | - | true
delay | 函数失效时长，单位ms | number | 300 | false
