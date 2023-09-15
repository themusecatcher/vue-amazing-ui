# 防抖<BackTop />

<br/>

*对于短时间内连续触发的事件，防抖就是让某个时间（delay）期限内，事件处理函数只执行一次*

::: details  Show Source Code

```ts
function debounce (fn: Function, delay = 300): any {
  let timer: any = null //借助闭包
  return function () {
    if (timer) {
      cancelRaf(timer)
    }
    timer = rafTimeout(fn, delay)
  }
}
```

:::

## 何时使用

- 对于短时间内连续触发的事件，在 delay ms 内函数只执行最后一次

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { debounce } from 'vue-amazing-ui'

onMounted(() => {
  document.onscroll = debounce(showPosition, 1000)
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
import { debounce } from 'vue-amazing-ui'

onMounted(() => {
  document.onscroll = debounce(showPosition, 1000)
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
delay | 防抖时间期限，单位ms | number | 300 | false
