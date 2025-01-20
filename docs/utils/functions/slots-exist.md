# 监听插槽存在 useSlotsExist

<GlobalElement />

*监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在
 * 
 * @param slotsName - 插槽的名称或名称数组，默认为 'default'
 * @returns 如果是单个插槽名称，则返回一个计算属性，表示该插槽是否存在
 *          如果是插槽名称数组，则返回一个 reactive 对象，其中的每个属性对应该插槽是否存在
 */
import { useSlots, reactive, computed, Comment, Text } from 'vue'
import type { VNode } from 'vue'
export function useSlotsExist(slotsName: string | string[] = 'default') {
  const slots = useSlots() // 获取当前组件的所有插槽
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotName: string): boolean => {
    const slotsContent = slots[slotName]?.()
    const checkExist = (slotContent: VNode) => {
      if (slotContent.type === Comment) {
        return false
      }
      if (Array.isArray(slotContent.children) && !slotContent.children.length) {
        return false
      }
      if (slotContent.type !== Text) {
        return true
      }
      if (typeof slotContent.children === 'string') {
        return slotContent.children.trim() !== ''
      }
    }
    if (slotsContent && slotsContent?.length) {
      const result = slotsContent.some((slotContent: VNode) => {
        return checkExist(slotContent)
      })
      return result
    }
    return false
  }
  if (Array.isArray(slotsName)) {
    const slotsExist = reactive<any>({})
    slotsName.forEach((slotName: string) => {
      const exist = computed(() => checkSlotsExist(slotName))
      slotsExist[slotName] = exist // 将一个 ref 赋值给一个 reactive 属性时，该 ref 会自动解包
    })
    return slotsExist
  } else {
    return computed(() => checkSlotsExist(slotsName))
  }
}
```

:::

## 基本使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useSlotsExist } from 'vue-amazing-ui'

// 监听单个插槽的存在
const slotsDefaultExist = useSlotsExist() // 等同于 useSlotsExist('default')
const slotsHeaderExist = useSlotsExist('header')
watchEffect(() => {
  console.log('slotsDefaultExist', slotsDefaultExist.value)
  console.log('slotsHeaderExist', slotsHeaderExist.value)
})

// 监听一组插槽的存在
const slotsExist = useSlotsExist(['default', 'header'])
watchEffect(() => {
  console.log('default', slotsExist.default)
  console.log('header', slotsExist.header)
})
</script>
<template>
  <div>
    <slot>{{ defaultContent }}</slot>
    <slot name="header">{{ headerContent }}</slot>
  </div>
</template>
```

## Params

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
slotsName | 插槽的名称或名称数组 | string &#124; string[] | 'default'
