# 监听插槽存在 useSlotsExist

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者 !"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

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
import { useSlots, reactive, computed } from 'vue'
export function useSlotsExist(slotsName: string | string[] = 'default') {
  const slots = useSlots() // 获取当前组件的所有插槽
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotsName: string): boolean => {
    const slotsContent = slots[slotsName]?.()
    if (slotsContent && slotsContent?.length) {
      const firstSlot = slotsContent[0]
      if (typeof firstSlot.children === 'string') {
        if (firstSlot.children === 'v-if') {
          return false
        }
        return firstSlot.children.trim() !== ''
      } else {
        if (firstSlot.children === null) {
          if (firstSlot.type === 'img' || typeof firstSlot.type !== 'string') {
            return true
          }
        } else {
          return Boolean(firstSlot.children)
        }
      }
    }
    return false
  }
  if (Array.isArray(slotsName)) {
    const slotsExist = reactive<any>({})
    slotsName.forEach((item) => {
      const exist = computed(() => checkSlotsExist(item))
      slotsExist[item] = exist // 将一个 ref 赋值给一个 reactive 属性时，该 ref 会自动解包
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
