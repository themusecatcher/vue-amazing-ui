# 是否支持事件监听器选项 useOptionsSupported

<GlobalElement />

_检查浏览器是否支持给定的事件监听器选项_

::: details Show Source Code

```ts
/**
 * 组合式函数：探测浏览器是否支持指定的 addEventListener 选项
 *
 * 原理：在 options 上以 getter 定义目标选项，浏览器读取该项时即置为「支持」
 * （老浏览器把第三个参数当作布尔值，不会读取选项，故保持 false）。
 *
 * @param option - 待探测的选项名：`'capture'` / `'once'` / `'passive'` / `'signal'`
 * @returns `isSupported` 表示是否支持该选项
 */
import { ref } from 'vue'
import type { Ref } from 'vue'
export function useOptionsSupported(option: 'capture' | 'once' | 'passive' | 'signal'): { isSupported: Ref<boolean> } {
  const isSupported = ref<boolean>(false) // 浏览器是否支持 options 参数
  try {
    const options = {
      get [option]() {
        // 浏览器仅在真正读取该选项时才触发 getter（老浏览器只把它当布尔值），故此处置为支持
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
function callback() {
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
function callback() {
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
| option | 事件监听器选项 | 'capture' &#124; 'once' &#124; 'passive' &#124; 'signal' | undefined |

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| isSupported | 浏览器是否支持给定的事件监听器选项 | Ref&lt;boolean&gt; |
