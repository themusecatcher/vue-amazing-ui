# 事件监听 useEventListener<BackTop />

<br/>

*添加和清除 `DOM` 事件监听器的组合式函数*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 使用Vue的生命周期钩子添加和移除事件监听器。
 * 
 * 该函数旨在提供一种优雅的方式来管理事件监听器，避免在组件卸载后仍保留事件监听器，
 * 从而可能导致内存泄漏的问题。通过结合Vue的`onMounted`和`onUnmounted`钩子，
 * 在组件挂载时添加事件监听器，并在组件卸载时移除它，确保资源被妥善管理。
 * 
 * @param target 目标元素或对象。可以是DOM元素或其他支持addEventListener的对象。
 * @param event 要监听的事件名称。
 * @param callback 事件被触发时执行的回调函数。
 */
import { onMounted, onUnmounted } from 'vue'
export function useEventListener(target: HTMLElement | Window | Document, event: string, callback: Function): void {
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback as EventListenerOrEventListenerObject))
  onUnmounted(() => target.removeEventListener(event, callback  as EventListenerOrEventListenerObject))
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'

const scrollDown = ref(false) // 是否向下滚动
let lastScrollPosition = 0 // 保存上一次滚动的位置

function scrollEvent () {
  // 获取当前滚动条的位置
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  // 比较当前位置和上一次记录的位置
  scrollDown.value = currentScrollPosition > lastScrollPosition
  // 更新上一次滚动的位置
  lastScrollPosition = currentScrollPosition
}
const throttleScroll = throttle(scrollEvent, 100)
useEventListener(window, 'scroll', throttleScroll)
</script>

## 基本使用

<h3>滚动方向：{{ scrollDown ? '向下':'向上' }}</h3>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'

const scrollDown = ref(false) // 是否向下滚动
let lastScrollPosition = 0 // 保存上一次滚动的位置

function scrollEvent () {
  // 获取当前滚动条的位置
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  // 比较当前位置和上一次记录的位置
  scrollDown.value = currentScrollPosition > lastScrollPosition
  // 更新上一次滚动的位置
  lastScrollPosition = currentScrollPosition
}
const throttleScroll = throttle(scrollEvent, 100)
useEventListener(window, 'scroll', throttleScroll)
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
target | 要添加监听事件的目标元素 | HTMLElement &#124; Window &#124; Document | - | true
event | 监听的事件类型（大小写敏感） | string | - | true
callback | 监听事件触发时的回调函数 | Function | - | true
