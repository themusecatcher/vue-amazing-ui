# 媒体查询 useMediaQuery

<GlobalElement />

_根据 `CSS media query` 的不同结果动态地更新：是桌面端还是移动端_

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 使用媒体查询来判断当前环境是否符合指定的媒体查询条件
 *
 * 该函数提供了一个响应式的媒体查询机制，根据查询的不同结果动态更新响应式变量
 *
 * @param {string} mediaQuery 媒体查询字符串，用于定义要查询的媒体条件
 * @returns {{ match: Ref<boolean> }} 返回一个对象，其中包含一个名为 match 的 ref 对象，表示当前是否为移动设备视口
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
export function useMediaQuery(mediaQuery: string): { match: Ref<boolean> } {
  // 检查传入的mediaQuery参数是否为空或非法
  if (!mediaQuery || typeof mediaQuery !== 'string' || mediaQuery.trim() === '') {
    throw new Error('Invalid mediaQuery parameter. It must be a non-empty string.')
  }
  const match = ref(window && window.matchMedia(mediaQuery).matches)
  const mediaQueryList = window.matchMedia(mediaQuery)
  // 处理媒体查询状态改变的事件
  const updateChange = (e: MediaQueryListEvent) => {
    match.value = e.matches // 一个布尔值，如果当前 document 与媒体查询列表相匹配，则返回 true，否则返回 false
  }
  onMounted(() => {
    mediaQueryList.addEventListener('change', updateChange)
  })
  onBeforeUnmount(() => {
    mediaQueryList.removeEventListener('change', updateChange)
  })
  return { match }
}
```

:::

## 参考文档

- [Window.matchMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)

<script setup lang="ts">
import { useMediaQuery } from 'vue-amazing-ui'
const { match: isMobile } = useMediaQuery('(max-width: 768px)')
</script>

## 基本使用

_请缩放浏览器查看效果_

<h3>{{ isMobile ? '移动端' : '桌面端' }}</h3>

```vue
<script setup lang="ts">
import { useMediaQuery } from 'vue-amazing-ui'
const { match: isMobile } = useMediaQuery('(max-width: 768px)')
</script>
<template>
  <h3>{{ isMobile ? '移动端' : '桌面端' }}</h3>
</template>
```

## Params

| 参数       | 说明                                     | 类型   | 默认值    |
| ---------- | ---------------------------------------- | ------ | --------- |
| mediaQuery | 媒体查询字符串，用于定义要查询的媒体条件 | string | undefined |
