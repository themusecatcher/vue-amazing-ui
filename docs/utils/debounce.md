# 防抖<BackTop />

<br/>

*对于短时间内连续触发的事件，防抖就是让某个时间 `delay` 期限内，事件处理函数只执行一次*

::: details Show Source Code

```ts
function debounce (fn: Function, delay = 300): any {
  let timer: any = null //借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
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
function showPosition () {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
}
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
fn | 要执行的函数 | Function | - | true
delay | 防抖时间期限，单位`ms` | number | 300 | false
