# 否支持事件监听器选项 useOptionsSupported

<GlobalElement />

_检查浏览器是否支持给定的事件监听器选项_

::: details Show Source Code

```ts
/**
 * 检查浏览器是否支持给定的事件监听器选项
 *
 * @param prop 一个表示要检查的事件监听器属性的字符串，可选 'capture'、'once'、'passive' 或 'signal'
 * @returns 返回一个对象，包含一个 Ref 对象，其值指示浏览器是否支持给定的选项
 */
import { ref } from 'vue'
import type { Ref } from 'vue'
export function useOptionsSupported(prop: 'capture' | 'once' | 'passive' | 'signal'): { isSupported: Ref<boolean> } {
  // 兼容旧版本的浏览器（以及一些相对不算古老的）仍然假定 addEventListener 第三个参数是布尔值的情况
  const isSupported = ref<boolean>(false) // 浏览器是否支持 options 参数
  try {
    const options = {
      get [prop]() {
        // 该函数会在浏览器尝试访问 [prop] 值时被调用
        isSupported.value = true
        return false
      }
    }
    window.addEventListener('test', () => null, options)
    window.removeEventListener('test', () => null, options)
  } catch (err) {
    isSupported.value = false
  }
  return { isSupported }
}
```

:::

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useOptionsSupported } from 'vue-amazing-ui'
const { isSupported: captureSupported } = useOptionsSupported('capture')
const { isSupported: onceSupported } = useOptionsSupported('once')
const { isSupported: passiveSupported } = useOptionsSupported('passive')
const { isSupported: signalSupported } = useOptionsSupported('signal')
function callback(e: Event) {
  console.log('do something')
}
onMounted(() => {
  document.addEventListener('click', callback, captureSupported ? { capture: true } : true) // 事件在捕获阶段执行
})
onUnmounted(() => {
  document.removeEventListener('click', callback, captureSupported ? { capture: true } : true)
})
</script>

## 基本使用

<Descriptions title="addEventListener's options isSupported" bordered :column="{ sm: 2, xs: 2 }">
  <DescriptionsItem label="capture">
    <Tag :color="captureSupported ? 'success' : 'error'">{{ captureSupported }}</Tag>
  </DescriptionsItem>
  <DescriptionsItem label="once">
    <Tag :color="onceSupported ? 'success' : 'error'">{{ onceSupported }}</Tag>
  </DescriptionsItem>
  <DescriptionsItem label="passive">
    <Tag :color="passiveSupported ? 'success' : 'error'">{{ passiveSupported }}</Tag>
  </DescriptionsItem>
  <DescriptionsItem label="signal">
    <Tag :color="signalSupported ? 'success' : 'error'">{{ signalSupported }}</Tag>
  </DescriptionsItem>
</Descriptions>

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useOptionsSupported } from 'vue-amazing-ui'
const { isSupported: captureSupported } = useOptionsSupported('capture')
const { isSupported: onceSupported } = useOptionsSupported('once')
const { isSupported: passiveSupported } = useOptionsSupported('passive')
const { isSupported: signalSupported } = useOptionsSupported('signal')
function callback(e: Event) {
  console.log('do something')
}
onMounted(() => {
  document.addEventListener('click', callback, captureSupported ? { capture: true } : true) // 事件在捕获阶段执行
})
onUnmounted(() => {
  document.removeEventListener('click', callback, captureSupported ? { capture: true } : true)
})
</script>
```

## Params

| 参数 | 说明                 | 类型                                                     | 默认值    |
| ---- | -------------------- | -------------------------------------------------------- | --------- |
| prop | 事件监听器选项的属性 | 'capture' &#124; 'once' &#124; 'passive' &#124; 'signal' | undefined |
