# 事件监听 useEventListener

<GlobalElement />

_添加和清除 `DOM` 事件监听器的组合式函数_

::: details Show Source Code

```ts
/**
 * 组合式函数：随组件生命周期自动挂载 / 卸载事件监听
 *
 * 挂载时 `addEventListener`、卸载时 `removeEventListener`，避免监听残留导致内存泄漏。
 * 注意：入参须为监听目标对象本身，不支持 CSS 选择器字符串。
 *
 * @param target - 事件目标（DOM 元素 / Window / Document 等）
 * @param event - 事件名
 * @param callback - 事件回调
 */
import { onMounted, onUnmounted } from 'vue'
export function useEventListener(target: HTMLElement | Window | Document, event: string, callback: Function): void {
  onMounted(() => target.addEventListener(event, callback as EventListenerOrEventListenerObject))
  onUnmounted(() => target.removeEventListener(event, callback as EventListenerOrEventListenerObject))
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
// SSR（Node）环境无 window，需判断存在性后再注册监听
if (typeof window !== 'undefined') {
  useEventListener(window, 'scroll', throttleScroll)
}
</script>

## 基本使用

<h3>滚动方向：{{ scrollDown ? '向下':'向上' }}</h3>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'
const scrollDown = ref(false) // 是否向下滚动
let lastScrollPosition = 0 // 保存上一次滚动的位置
function scrollEvent() {
  // 获取当前滚动条的位置
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  // 比较当前位置和上一次记录的位置
  scrollDown.value = currentScrollPosition > lastScrollPosition
  // 更新上一次滚动的位置
  lastScrollPosition = currentScrollPosition
}
const throttleScroll = throttle(scrollEvent, 100)
// SSR（Node）环境无 window，需判断存在性后再注册监听
if (typeof window !== 'undefined') {
  useEventListener(window, 'scroll', throttleScroll)
}
</script>
```

## Params

| 参数     | 说明                         | 类型                                      | 默认值    |
| -------- | ---------------------------- | ----------------------------------------- | --------- |
| target   | 要添加监听事件的目标元素     | HTMLElement &#124; Window &#124; Document | undefined |
| event    | 监听的事件类型（大小写敏感） | string                                    | undefined |
| callback | 监听事件触发时的回调函数     | Function                                  | undefined |
