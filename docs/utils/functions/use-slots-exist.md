# 监听插槽存在 useSlotsExist

<GlobalElement />

_监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在_

::: details Show Source Code

```ts
/**
 * 组合式函数：判断插槽是否「真的渲染了内容」
 *
 * 判定以「实际调用插槽并检查返回的 vnode」为准，可识别「已提供但渲染为空」的插槽；
 * 探测时以空对象作为作用域参数，插槽内抛错按「已提供」处理。
 *
 * 时效性：`slots` 与 `attrs` 同级，是官方明确不响应式的普通对象，`computed` 追踪不到它的增删，
 * 故在更新前比对插槽名集合，集合变化时自增版本号让探测重算。
 *
 * 边界：作用域插槽应直接按 `slots.xxx` 是否存在判断（空作用域探测会误判）；
 * 需要精确判定渲染期内容时，请在渲染函数里调用一次 `renderSlot` 复用同一批 vnode（见下节）。
 *
 * @param slotsName - 插槽名或插槽名数组，默认 `'default'`
 * @returns 单个名称 → 该插槽是否存在的计算属性；名称数组 → 以插槽名为键的 reactive 映射
 */
import { useSlots, ref, reactive, computed, onBeforeUpdate, Comment, Text } from 'vue'
import type { ComputedRef, Reactive, VNode } from 'vue'
type SlotsExistResult<T extends string | string[]> = T extends string
  ? ComputedRef<boolean>
  : Reactive<Record<string, boolean>>
export function useSlotsExist<T extends string | string[] = 'default'>(slotsName: T): SlotsExistResult<T> {
  const slots = useSlots() // 获取当前组件的所有插槽
  // 插槽对象非响应式：仅在插槽名集合变化时让探测失效，避免每次更新都重新调用插槽
  const slotsVersion = ref<number>(0)
  let prevSlotKeys = Object.keys(slots).join(',')
  onBeforeUpdate(() => {
    const nextSlotKeys = Object.keys(slots).join(',')
    if (nextSlotKeys === prevSlotKeys) {
      return
    }
    prevSlotKeys = nextSlotKeys
    slotsVersion.value += 1
  })
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotName: string): boolean => {
    slotsVersion.value // 建立依赖：插槽集合变化后重新探测
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
    const checkExist = (slotContent: VNode): boolean => {
      if (slotContent.type === Comment) {
        return false
      }
      if (Array.isArray(slotContent.children) && !slotContent.children.length) {
        return false
      }
      if (slotContent.type !== Text) {
        return true
      }
      return typeof slotContent.children === 'string' ? slotContent.children.trim() !== '' : false
    }
    if (slotsContent?.length) {
      return slotsContent.some((slotContent: VNode) => {
        return checkExist(slotContent)
      })
    }
    return false
  }
  if (Array.isArray(slotsName)) {
    const slotsExist: Record<string, ComputedRef<boolean>> = {}
    slotsName.forEach((slotName: string) => {
      // 将一个 ref 赋值给一个 reactive 属性时，该 ref 会自动解包，故对外类型为 boolean
      slotsExist[slotName] = computed(() => checkSlotsExist(slotName))
    })
    return reactive(slotsExist) as unknown as SlotsExistResult<T>
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
const provideHeader = ref(true)
const renderContent = ref(true)
// 用一个内联组件模拟「外部提供插槽」的真实场景
const SlotChecker = {
  setup() {
    const slotsExist = useSlotsExist(['default', 'header'])
    return () =>
      h('ul', [
        h('li', `default 插槽：${slotsExist.default ? '有内容' : '无内容'}`),
        h('li', `header 插槽：${slotsExist.header ? '有内容' : '无内容'}`)
      ])
  }
}
// 对照组件：同一个插槽，两种判定口径并排展示
const SlotCompare = {
  setup(_, { slots }) {
    const headerExist = useSlotsExist('header')
    return () =>
      h('ul', [
        h('li', `$slots.header（是否提供）：${slots.header ? '是' : '否'}`),
        h('li', `useSlotsExist('header')（是否渲染内容）：${headerExist.value ? '是' : '否'}`)
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
        h('li', `default 插槽：${slotsExist.default ? '有内容' : '无内容'}`),
        h('li', `header 插槽：${slotsExist.header ? '有内容' : '无内容'}`)
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

## 与 $slots 的区别

`$slots.xxx` 只能判断「父级是否传了插槽」，判断不了「传了但渲染为空」；`useSlotsExist` 会实际调用一次插槽，检查返回的 `vnode` 是否为空。下面两个开关分别控制「是否提供插槽」与「插槽内是否渲染内容」，可对照两列判定：

<br/>

<Space :gap="12" vertical>
  <Space :gap="8">
    <span>提供 header 插槽</span>
    <Switch v-model:value="provideHeader" />
  </Space>
  <Space :gap="8">
    <span>插槽内渲染内容</span>
    <Switch v-model:value="renderContent" />
  </Space>
</Space>

<br/>

<SlotCompare>
  <template v-if="provideHeader" #header>
    <span v-if="renderContent">header 内容</span>
  </template>
</SlotCompare>

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { useSlotsExist } from 'vue-amazing-ui'
const provideHeader = ref(true)
const renderContent = ref(true)
// 对照组件：同一个插槽，两种判定口径并排展示
const SlotCompare = {
  setup(_, { slots }) {
    const headerExist = useSlotsExist('header')
    return () =>
      h('ul', [
        h('li', `$slots.header（是否提供）：${slots.header ? '是' : '否'}`),
        h('li', `useSlotsExist('header')（是否渲染内容）：${headerExist.value ? '是' : '否'}`)
      ])
  }
}
</script>
<template>
  <Space :gap="12" vertical>
    <Space :gap="8">
      <span>提供 header 插槽</span>
      <Switch v-model:value="provideHeader" />
    </Space>
    <Space :gap="8">
      <span>插槽内渲染内容</span>
      <Switch v-model:value="renderContent" />
    </Space>
  </Space>
  <SlotCompare>
    <template v-if="provideHeader" #header>
      <span v-if="renderContent">header 内容</span>
    </template>
  </SlotCompare>
</template>
```

只有「提供但渲染为空」这一行能体现差异：`$slots.header` 为「是」，`useSlotsExist('header')` 为「否」。

<br/>

| 状态 | `$slots.header` | `useSlotsExist('header')` | 含义 |
| :-- | :-- | :-- | :-- |
| 未提供插槽 | 否 | 否 | 父级没有写这个插槽 |
| 提供了但渲染为空 | 是 | 否 | 插槽函数存在，内容被 `v-if` 等条件过滤为空 |
| 提供了且有内容 | 是 | 是 | 正常渲染 |

返回值 `false` 同时对应「未提供」与「提供了但为空」两种状态，需要区分时可结合 `!!$slots.xxx` 判断。

## Params

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| slotsName | 插槽的名称或名称数组 | string &#124; string[] | 'default' |

## Return

| 类型 | 说明 |
| :-- | :-- |
| ComputedRef&lt;boolean&gt; | 传入单个插槽名称时，返回该插槽是否存在的计算属性 |
| Reactive&lt;Record&lt;string, boolean&gt;&gt; | 传入插槽名称数组时，返回各插槽是否存在状态的响应式对象 |

## 注意事项

- **作用域插槽**：探测以空对象调用插槽，若渲染内容依赖作用域参数（如只输出 `{ label }` 文本），可能被判为「未渲染内容」。此类插槽（含返回入参 `vnode` 的渲染委托型插槽）应直接判断 `slots.xxx` 是否存在 —— 即「是否提供」而不是「是否渲染出内容」；确实需要内容判定时见下节。
- **渲染为空的组件**：插槽内组件自身渲染为 `null` 时无法识别，按「已提供」处理。
- **更新时机**：`slots` 与 `attrs` 同级，官方明确不是响应式对象，故判定在组件更新前比对插槽名集合触发重算；同一插槽名的内容变化，由探测时读取到的响应式数据驱动。

## 渲染期精确判定

若必须在「内容为空时不渲染外层容器」，且插槽是作用域插槽，请在渲染函数里调用一次 `renderSlot` 复用同一批 `vnode`：`renderSlot` 内部已按官方口径过滤注释节点与空片段，返回片段的 `children` 为空即「没有有效内容」。

```ts
import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  setup(_, { slots }) {
    return () => {
      // 只调用一次插槽：判定与渲染共用同一批 vnode
      const content = renderSlot(slots, 'cell', { label: 'A' }, () => [])
      const children = Array.isArray(content.children) ? content.children : []
      return children.length ? h('div', { class: 'cell-wrap' }, content) : null
    }
  }
})
```

- **逐项判定**：作用域插槽的内容取决于作用域参数，`{ label: 'A' }` 有内容不代表 `{ label: '' }` 也有。需要按行判断时，把上面的写法放进「产出每一行」的位置（每行各渲染一次），而不是在 `setup` 里算出一个布尔值 —— 单一布尔值无法表达「某些行有内容、某些行没有」。
- **口径差异**：`renderSlot` 只过滤注释节点与空片段，纯空白文本、空字符串文本仍算「有内容」；若需与 `useSlotsExist` 完全一致（空白文本视为空），需自行遍历 `children` 判断。
- **适用范围**：仅限渲染函数 / `JSX` / 函数式组件 —— 模板中拿不到插槽 `vnode`，无法在渲染前判定。
