# 监听DOM尺寸 useResizeObserver<BackTop />

<br/>

*使用 `ResizeObserver` 观察 `DOM` 元素尺寸变化的组合式函数*

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
import { ref, toValue, computed, watch, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
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

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useResizeObserver } from 'vue-amazing-ui'

const el = ref(null)
const state = reactive({
  borderBlockSize: null,
  borderInlineSize: null,
  contentBlockSize: null,
  contentInlineSize: null,
  x: null,
  y: null,
  width: null,
  height: null,
  top: null,
  bottom: null,
  right: null,
  left: null,
  devicePixelContentBlockSize: null,
  devicePixelContentInlineSize: null
})
useResizeObserver(el, (entries, observer) => {
  console.log('entries', entries)
  console.log('observer', observer)
  const entry = entries[0]
  state.borderBlockSize = entry.borderBoxSize[0].blockSize
  state.borderInlineSize = entry.borderBoxSize[0].inlineSize
  state.contentBlockSize = entry.contentBoxSize[0].blockSize
  state.contentInlineSize = entry.contentBoxSize[0].inlineSize
  state.x = entry.contentRect.x
  state.y = entry.contentRect.y
  state.width = entry.contentRect.width
  state.height = entry.contentRect.height
  state.top = entry.contentRect.top
  state.bottom = entry.contentRect.bottom
  state.right = entry.contentRect.right
  state.left = entry.contentRect.left
  state.devicePixelContentBlockSize = entry.devicePixelContentBoxSize[0].blockSize
  state.devicePixelContentInlineSize = entry.devicePixelContentBoxSize[0].inlineSize
})
</script>

<h3>Resize the box to see changes</h3>
<div class="m-size-wrap">
  <textarea ref="el" class="resizer" disabled />
  <div class="m-size">
    <p>borderBlockSize: {{ state.borderBlockSize }}</p>
    <p>borderInlineSize: {{ state.borderInlineSize }}</p>
    <p>contentBlockSize: {{ state.contentBlockSize }}</p>
    <p>contentInlineSize: {{ state.contentInlineSize }}</p>
    <h3>contentRect：</h3>
    <p>x: {{ state.x }}</p>
    <p>y: {{ state.y }}</p>
    <p>width: {{ state.width }}</p>
    <p>height: {{ state.height }}</p>
    <p>top: {{ state.top }}</p>
    <p>bottom: {{ state.bottom }}</p>
    <p>right: {{ state.right }}</p>
    <p>left: {{ state.left }}</p>
    <p>devicePixelContentBlockSize: {{ state.devicePixelContentBlockSize }}</p>
    <p>devicePixelContentInlineSize: {{ state.devicePixelContentInlineSize }}</p>
  </div>
</div>

<style lang="less" scoped>
.m-size-wrap {
  position: relative;
  .resizer {
    background: #222;
    color: #fff;
    resize: both;
    padding: 16px 32px;
    min-width: 300px;
    min-height: 450px;
    max-width: 688px;
    border: 1px solid #2e2e32;;
    border-radius: 4px;
    outline: none;
    white-space: pre;
    overflow-wrap: normal;
    overflow: hidden;
    display: block;
    font-size: 16px;
    box-shadow: #2e2e32 0 0 0 1px;
    margin: 8px 0;
    background: #1b1b1f;
    touch-action: manipulation;
  }
  .m-size {
    top: 12px;
    left: 16px;
    position: absolute;
    color: #fff;
    font-size: 16px;
    h3 {
      margin-top: 0;
    }
  }
}
</style>

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useResizeObserver } from 'vue-amazing-ui'

const el = ref(null)
const state = reactive({
  borderBlockSize: null,
  borderInlineSize: null,
  contentBlockSize: null,
  contentInlineSize: null,
  x: null,
  y: null,
  width: null,
  height: null,
  top: null,
  bottom: null,
  right: null,
  left: null,
  devicePixelContentBlockSize: null,
  devicePixelContentInlineSize: null
})
useResizeObserver(el, (entries, observer) => {
  console.log('entries', entries)
  console.log('observer', observer)
  const entry = entries[0]
  state.borderBlockSize = entry.borderBoxSize[0].blockSize
  state.borderInlineSize = entry.borderBoxSize[0].inlineSize
  state.contentBlockSize = entry.contentBoxSize[0].blockSize
  state.contentInlineSize = entry.contentBoxSize[0].inlineSize
  state.x = entry.contentRect.x
  state.y = entry.contentRect.y
  state.width = entry.contentRect.width
  state.height = entry.contentRect.height
  state.top = entry.contentRect.top
  state.bottom = entry.contentRect.bottom
  state.right = entry.contentRect.right
  state.left = entry.contentRect.left
  state.devicePixelContentBlockSize = entry.devicePixelContentBoxSize[0].blockSize
  state.devicePixelContentInlineSize = entry.devicePixelContentBoxSize[0].inlineSize
})
</script>
<template>
  <h3>Resize the box to see changes</h3>
  <div class="m-size-wrap">
    <textarea ref="el" class="resizer" disabled />
    <div class="m-size">
      <p>borderBlockSize: {{ state.borderBlockSize }}</p>
      <p>borderInlineSize: {{ state.borderInlineSize }}</p>
      <p>contentBlockSize: {{ state.contentBlockSize }}</p>
      <p>contentInlineSize: {{ state.contentInlineSize }}</p>
      <h3>contentRect：</h3>
      <p>x: {{ state.x }}</p>
      <p>y: {{ state.y }}</p>
      <p>width: {{ state.width }}</p>
      <p>height: {{ state.height }}</p>
      <p>top: {{ state.top }}</p>
      <p>bottom: {{ state.bottom }}</p>
      <p>right: {{ state.right }}</p>
      <p>left: {{ state.left }}</p>
      <p>devicePixelContentBlockSize: {{ state.devicePixelContentBlockSize }}</p>
      <p>devicePixelContentInlineSize: {{ state.devicePixelContentInlineSize }}</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-size-wrap {
  position: relative;
  .resizer {
    background: #222;
    color: #fff;
    resize: both;
    padding: 16px;
    min-width: 300px;
    min-height: 450px;
    max-width: 688px;
    border: 1px solid #2e2e32;;
    border-radius: 4px;
    outline: none;
    white-space: pre;
    overflow-wrap: normal;
    overflow: hidden;
    display: block;
    font-size: 16px;
    box-shadow: #2e2e32 0 0 0 1px;
    margin: 8px 0;
    background: #1b1b1f;
    touch-action: manipulation;
  }
  .m-size {
    top: 12px;
    left: 16px;
    position: absolute;
    color: #fff;
    font-size: 16px;
    h3 {
      margin-top: 0;
    }
  }
}
</style>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
target | 要观察的目标，可以是 `Ref` 对象、`Ref` 数组、`HTMLElement` 或 `HTMLElement` 数组 | Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[] | - | true
callback | 当元素尺寸变化时调用的回调函数 | ResizeObserverCallback | - | true
options | `ResizeObserver` 选项，用于定制观察行为，[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/observe) | object | {} | false
