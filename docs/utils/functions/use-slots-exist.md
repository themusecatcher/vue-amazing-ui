# 监听插槽存在 useSlotsExist

<GlobalElement />

_监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在_

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在
 *
 * 判定以「实际调用插槽并检查返回的 vnode」为准，可识别「已提供但渲染为空」的插槽；
 * 探测时以空对象作为作用域参数，插槽内抛错按「已提供」处理
 *
 * @param slotsName - 插槽的名称或名称数组，默认为 'default'
 * @returns 如果是单个插槽名称，则返回一个计算属性，表示该插槽是否存在
 *          如果是插槽名称数组，则返回一个 reactive 对象，其中的每个属性对应该插槽是否存在
 */
import { useSlots, reactive, computed, Comment, Text } from 'vue'
import type { ComputedRef, Reactive, VNode } from 'vue'
type SlotsExistResult<T extends string | string[]> = T extends string
  ? ComputedRef<boolean>
  : Reactive<Record<string, ComputedRef<boolean>>>
export function useSlotsExist<T extends string | string[] = 'default'>(slotsName: T): SlotsExistResult<T> {
  const slots = useSlots() // 获取当前组件的所有插槽
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotName: string): boolean => {
    const slot = slots[slotName]
    if (slot === undefined) {
      return false
    }
    // 必须实际调用一次插槽才能拿到 vnode，进而判断「是否真的渲染了内容」
    let slotsContent: VNode[] | undefined
    try {
      // 作用域参数在模板插槽的形参位置解构，空对象探测也可能因访问嵌套属性而抛错；
      // 能抛错即说明插槽已被提供，按「存在」处理（探测失败不等同于未提供）
      slotsContent = slot({})
    } catch {
      return true
    }
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
    const slotsExist = reactive<Record<string, ComputedRef<boolean>>>({})
    slotsName.forEach((slotName: string) => {
      const exist = computed(() => checkSlotsExist(slotName))
      slotsExist[slotName] = exist // 将一个 ref 赋值给一个 reactive 属性时，该 ref 会自动解包
    })
    return slotsExist as SlotsExistResult<T>
  } else {
    return computed(() => checkSlotsExist(slotsName)) as SlotsExistResult<T>
  }
}
```

:::

<script setup lang="ts">
import { h, ref } from 'vue'
import { useSlotsExist } from 'vue-amazing-ui'
const showHeader = ref(true)
// 用一个内联组件模拟「外部提供插槽」的真实场景
const SlotChecker = {
  setup() {
    const slotsExist = useSlotsExist(['default', 'header'])
    return () =>
      h('ul', [
        h('li', `default 插槽：${slotsExist.default ? '存在' : '不存在'}`),
        h('li', `header 插槽：${slotsExist.header ? '存在' : '不存在'}`)
      ])
  }
}
</script>

## 基本使用

_通过开关控制 `header` 插槽是否渲染内容，实时查看检测结果_

<br/>

<Space :gap="8">
  <span>header 插槽内容</span>
  <Switch v-model:value="showHeader" />
</Space>

<br/>

<SlotChecker>
  <template #header>
    <span v-if="showHeader">header 内容</span>
  </template>
  默认内容
</SlotChecker>

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { useSlotsExist } from 'vue-amazing-ui'
const showHeader = ref(true)
// 用一个内联组件模拟「外部提供插槽」的真实场景
const SlotChecker = {
  setup() {
    const slotsExist = useSlotsExist(['default', 'header'])
    return () =>
      h('ul', [
        h('li', `default 插槽：${slotsExist.default ? '存在' : '不存在'}`),
        h('li', `header 插槽：${slotsExist.header ? '存在' : '不存在'}`)
      ])
  }
}
</script>
<template>
  <Space :gap="8">
    <span>header 插槽内容</span>
    <Switch v-model:value="showHeader" />
  </Space>
  <SlotChecker>
    <template #header>
      <span v-if="showHeader">header 内容</span>
    </template>
    默认内容
  </SlotChecker>
</template>
```

## Params

| 参数      | 说明                 | 类型                   | 默认值    |
| --------- | -------------------- | ---------------------- | --------- |
| slotsName | 插槽的名称或名称数组 | string &#124; string[] | 'default' |

## Return

| 类型 | 说明 |
| --- | --- |
| ComputedRef&lt;boolean&gt; | 传入单个插槽名称时，返回该插槽是否存在的计算属性 |
| Reactive&lt;Record&lt;string, ComputedRef&lt;boolean&gt;&gt;&gt; | 传入插槽名称数组时，返回各插槽是否存在状态的响应式对象 |
