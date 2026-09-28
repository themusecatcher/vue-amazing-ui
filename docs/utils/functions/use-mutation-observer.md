# DOM监听 useMutationObserver

<GlobalElement />

_使用 `MutationObserver` 观察 `DOM` 元素的变化的组合式函数_

::: details Show Source Code

```ts
/**
 * 组合式函数：用 MutationObserver 观察 DOM 变化
 *
 * 支持 Ref / 元素 / 元素数组作为目标；目标变化时自动重建观察，组件卸载时自动断开（避免内存泄漏）。
 * SSR（Node）下自动跳过。
 *
 * @param target - 观察目标（单个或数组，元素可为 Ref）
 * @param callback - 观察到变化时的回调
 * @param options - MutationObserver 观察选项，如 `{ subtree, childList, attributes, attributeFilter }`，默认 `{}`
 * @returns `start` / `stop` 用于手动开始与停止观察
 */
import { ref, toValue, computed, watch, onBeforeUnmount, onMounted, getCurrentInstance } from 'vue'
import type { Ref, ComputedRef } from 'vue'
/**
 * 归一化观察目标为 HTMLElement 数组
 *
 * 兼容 Ref / Ref[] / HTMLElement / HTMLElement[] 四种入参：先解包 Ref，再过滤空值，
 * 保证后续 observe 调用拿到的都是可用元素。
 *
 * @param target - 观察目标
 * @returns 解包并过滤后的元素数组
 */
function resolveTargetElements(target: Ref | Ref[] | HTMLElement | HTMLElement[]): HTMLElement[] {
  const targetValue = toValue(target) as Ref | Ref[] | HTMLElement | HTMLElement[] | null | undefined
  if (!targetValue) return []
  const list = Array.isArray(targetValue) ? targetValue : [targetValue]
  return list
    .map((item) => toValue(item) as HTMLElement | null | undefined)
    .filter((element): element is HTMLElement => Boolean(element))
}
export function useMutationObserver(
  target: Ref | Ref[] | HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: object = {}
): { start: () => void; stop: () => void } {
  // 用 typeof 判断而非裸 window：SSR（Node）下裸引用会直接抛 ReferenceError
  const isSupported = useSupported(() => typeof window !== 'undefined' && 'MutationObserver' in window)
  const stopObservation = ref(false)
  let observer: MutationObserver | undefined
  const targets = computed(() => resolveTargetElements(target))
  // 定义清理函数，用于断开 MutationObserver 的连接
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }
  // 初始化 MutationObserver，开始观察目标元素
  const observeElements = () => {
    if (isSupported.value && targets.value.length && !stopObservation.value) {
      observer = new MutationObserver(callback)
      targets.value.forEach((element: HTMLElement) => observer!.observe(element, options))
    }
  }
  // 监听 targets 的变化，当 targets 变化时，重新建立 MutationObserver 观察
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
  const start = () => {
    stopObservation.value = false
    observeElements()
  }
  const stop = () => {
    stopObservation.value = true
    cleanup()
  }
  // 在组件卸载前清理 MutationObserver
  onBeforeUnmount(() => cleanup())
  return {
    start,
    stop
  }
}
/**
 * 组合式函数：探测某项能力是否可用（挂载后才求值）
 *
 * 在挂载后才执行 `callback`，避免 SSR（Node）期访问浏览器 API 抛错；依赖 `useMounted` 触发重算，
 * 故 callback 内引用浏览器对象时仍需自行判断存在性。
 *
 * @param callback - 探测函数，返回是否可用
 * @returns 探测结果的计算属性
 */
export function useSupported(callback: () => unknown): ComputedRef<boolean> {
  const isMounted = useMounted()
  return computed(() => {
    // to trigger the ref
    isMounted.value
    return Boolean(callback())
  })
}
/**
 * 组合式函数：判断组件是否已挂载
 *
 * 用于需要区分「挂载前 / 挂载后」的场景（如依赖真实 DOM 的测量、异步分支）。
 *
 * @returns 挂载完成标志（初始 false，`onMounted` 后为 true）
 */
export function useMounted(): Ref<boolean> {
  const isMounted = ref(false)
  // 获取当前组件的实例
  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
  }
  return isMounted
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { useMutationObserver } from 'vue-amazing-ui'
const observerRef = ref<HTMLDivElement | null>(null)
const mutationCount = ref(0)
const itemId = ref(0)
const callback = (mutationsList: MutationRecord[]) => {
  mutationCount.value += mutationsList.length
}
const options = { childList: true, attributes: true, subtree: true }
const { start, stop } = useMutationObserver(observerRef, callback, options)
function addItem() {
  const item = document.createElement('div')
  item.className = 'observer-item'
  item.textContent = `节点 ${++itemId.value}`
  observerRef.value?.appendChild(item)
}
function removeItem() {
  observerRef.value?.lastElementChild?.remove()
}
</script>

## 基本使用

_监听容器内节点的增删，并实时统计变更次数_

<br/>

<Flex vertical>
  <Space :gap="8">
    <Button type="primary" @click="addItem">新增节点</Button>
    <Button @click="removeItem">删除节点</Button>
    <Button @click="stop">停止观察</Button>
    <Button @click="start">开始观察</Button>
  </Space>
  <Alert type="info" :message="`已观察到 ${mutationCount} 条变更记录`" />
  <div ref="observerRef" class="observer-container"></div>
</Flex>

<style lang="less" scoped>
.observer-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 52px;
  padding: 8px 12px;
  border: 1px dashed rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  :deep(.observer-item) {
    height: fit-content;
    padding: 4px 10px;
    font-size: 14px;
    background: #f0f5ff;
    border-radius: 4px;
  }
}
</style>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useMutationObserver } from 'vue-amazing-ui'
const observerRef = ref<HTMLDivElement | null>(null)
const mutationCount = ref(0)
const itemId = ref(0)
const callback = (mutationsList: MutationRecord[]) => {
  mutationCount.value += mutationsList.length
}
const options = { childList: true, attributes: true, subtree: true }
const { start, stop } = useMutationObserver(observerRef, callback, options)
function addItem() {
  const item = document.createElement('div')
  item.className = 'observer-item'
  item.textContent = `节点 ${++itemId.value}`
  observerRef.value?.appendChild(item)
}
function removeItem() {
  observerRef.value?.lastElementChild?.remove()
}
</script>
<template>
  <Flex vertical>
    <Space :gap="8">
      <Button type="primary" @click="addItem">新增节点</Button>
      <Button @click="removeItem">删除节点</Button>
      <Button @click="stop">停止观察</Button>
      <Button @click="start">开始观察</Button>
    </Space>
    <Alert type="info" :message="`已观察到 ${mutationCount} 条变更记录`" />
    <div ref="observerRef" class="observer-container"></div>
  </Flex>
</template>
<style lang="less" scoped>
.observer-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 52px;
  padding: 8px 12px;
  border: 1px dashed rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  :deep(.observer-item) {
    height: fit-content;
    padding: 4px 10px;
    font-size: 14px;
    background: #f0f5ff;
    border-radius: 4px;
  }
}
</style>
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 要观察的 `DOM` 元素或元素数组，可以是 `ref` 引用，也可以是 `DOM` 元素本身 | Ref &#124; Ref[] &#124; HTMLElement &#124; HTMLElement[] | undefined |
| callback | 当观察到变化时调用的回调函数 | MutationCallback | undefined |
| options | 观察选项，默认为空对象，[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe#options) | object | {} |

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| start | 开始观察目标元素 | () => void |
| stop | 停止观察并断开与目标元素的连接 | () => void |

## 参考文档

- [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
