# 监听DOM尺寸 useResizeObserver<BackTop />

<br/>

*使用 `ResizeObserver` 观察 `DOM` 元素的变化的组合式函数*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 使用 ResizeObserver 观察 DOM 元素尺寸变化
 * 
 * 该函数提供了一种方便的方式来观察一个或多个元素的尺寸变化，并在变化时执行指定的回调函数。
 * 
 * @param target 要观察的目标，可以是 Ref 对象、Ref 数组、HTMLElement 或 HTMLElement 数组
 * @param callback 当元素尺寸变化时调用的回调函数
 * @param options ResizeObserver 选项，用于定制观察行为
 * @returns 返回一个对象，包含停止和开始观察的方法，使用者可以调用 start 方法开始观察，调用 stop 方法停止观察
 */
export function useResizeObserver(target: Ref | Ref[] | HTMLElement | HTMLElement[], callback: ResizeObserverCallback, options = {} ) {
  let observer: ResizeObserver | undefined
  const stopObservation = ref(false)
  const targets = computed(() => {
    const targetValue = toValue(target)
    if (targetValue) {
      return Array.isArray(targetValue) ? targetValue : [targetValue]
    }
    return []
  })
  // 定义清理函数，用于断开 ResizeObserver 的连接
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }
  // 初始化 ResizeObserver，开始观察目标元素
  const observeElements = () => {
    if (targets.value.length && !stopObservation.value) {
      observer = new ResizeObserver(callback)
      targets.value.forEach((element: HTMLElement) => observer!.observe(element, options))
    }
  }
  // 监听 targets 的变化，当 targets 变化时，重新建立 ResizeObserver 观察
  watch(
    () => targets.value,
    () => {
      cleanup()
      observeElements()
    },
    {
      immediate: true, // 立即触发回调，以便初始状态也被观察
      flush: 'post'
    }
  )
  const stop = () => {
    stopObservation.value = true
    cleanup()
  }
  const start = () => {
    stopObservation.value = false
    observeElements()
  }
  // 在组件卸载前清理 ResizeObserver
  onBeforeUnmount(() => cleanup())
  return {
    stop,
    start
  }
}
```

:::

## 基本使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from 'vue-amazing-ui'

const defaultSlotsRef = ref()
// 监听 defaultSlotsRef DOM 尺寸变化
const callback = (mutationsList: any, observer: any) => {
  // console.log('mutationsList', mutationsList)
  // console.log('observer', observer)
}
const options = { }
useResizeObserver(defaultSlotsRef, callback, options)
</script>
<template>
  <div ref="defaultSlotsRef">
    <slot></slot>
  </div>
</template>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
target | 要观察的 `DOM` 元素或元素数组，可以是 `ref` 引用，也可以是 `DOM` 元素本身 | Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[] | - | true
callback | 当观察到变化时调用的回调函数 | MutationCallback | - | true
options | 观察选项，默认为空对象，[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe#attributes) | object | {} | true
