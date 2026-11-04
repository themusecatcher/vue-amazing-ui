# 标签页 Tabs

<GlobalElement />

_选项卡切换组件_

## 何时使用

- 提供平级的区域将大块内容进行收纳和展现，保持界面整洁

<script setup lang="ts">
import { ref, watchEffect, computed, reactive } from 'vue'
import type { CSSProperties } from 'vue'
import { AppleOutlined, AndroidOutlined, PlusCircleOutlined, PlusOutlined, WindowsOutlined } from '@ant-design/icons-vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 5' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 6' }
]
const tabListDisabled = tabList.map((item) => ({ ...item, disabled: item.key === '3' }))
const moreTabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 5' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 6' },
  { key: '7', tab: 'Tab 7', content: 'Content of Tab Pane 7' },
  { key: '8', tab: 'Tab 8', content: 'Content of Tab Pane 8' }
]
// 各分节独立绑定，操作任一用例不会联动其余用例
const basicActiveKey = ref<TabsProps['activeKey']>('1')
const disabledActiveKey = ref<TabsProps['activeKey']>('1')
const centeredActiveKey = ref<TabsProps['activeKey']>('1')
const prefixActiveKey = ref<TabsProps['activeKey']>('1')
const sizeActiveKey = ref<TabsProps['activeKey']>('1')
const positionActiveKey = ref<TabsProps['activeKey']>('1')
const cardActiveKey = ref<TabsProps['activeKey']>('1')
const cardContainerActiveKey = ref<TabsProps['activeKey']>('1')
const customStyleActiveKey = ref<TabsProps['activeKey']>('1')
const justifyActiveKey = ref<TabsProps['activeKey']>('1')
const classActiveKey = ref<TabsProps['activeKey']>('1')
const configActiveKey = ref<TabsProps['activeKey']>('1')
const iconActiveKey = ref<TabsProps['activeKey']>('1')
const moreActiveKey = ref<TabsProps['activeKey']>('1')
const contentActiveKey = ref<TabsProps['activeKey']>('1')
const barActiveKey = ref<TabsProps['activeKey']>('1')
const animActiveKey = ref<TabsProps['activeKey']>('1')
const animEnabled = ref(true)
const destroyActiveKey = ref<TabsProps['activeKey']>('1')
const destroyEnabled = ref(true)
const editActiveKey = ref<TabsProps['activeKey']>('1')
const editPanes = ref([
  { key: '1', tab: 'Tab 1', content: 'Content of Tab 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab 3', closable: false }
])
let newPaneIndex = 0
function addPane(): void {
  newPaneIndex += 1
  const key = `newTab${newPaneIndex}`
  editPanes.value = [
    ...editPanes.value,
    { key, tab: `New Tab ${newPaneIndex}`, content: `Content of New Tab ${newPaneIndex}`, closable: true }
  ]
  editActiveKey.value = key
}
function closePane(key: string | number): void {
  const index = editPanes.value.findIndex((pane) => pane.key === key)
  if (index === -1) {
    return
  }
  const rest = editPanes.value.filter((pane) => pane.key !== key)
  editPanes.value = rest
  // 关掉的是当前激活项时，优先激活后一个，没有则取前一个
  if (editActiveKey.value === key && rest.length) {
    editActiveKey.value = rest[Math.min(index, rest.length - 1)].key
  }
}
watchEffect(() => {
  console.log('moreActiveKey', moreActiveKey.value)
})
const typeOptions = [
  {
    label: 'line',
    value: 'line'
  },
  {
    label: 'card',
    value: 'card'
  }
]
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<TabsProps['size']>('middle')
const positionOptions = [
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const position = ref<NonNullable<TabsProps['tabPosition']>>('top')
const morePosition = ref<NonNullable<TabsProps['tabPosition']>>('top')
const positionStyle = computed(() => {
  if (['top', 'bottom'].includes(morePosition.value)) {
    return {
      width: '360px'
    }
  } else {
    return {
      height: '200px'
    }
  }
})
const state = reactive<TabsProps>({
  prefix: '',
  suffix: '',
  animated: false,
  size: 'middle',
  type: 'line',
  justifyContent: 'start',
  tabGutter: 24,
  tabPosition: 'top',
  destroyInactiveTabPane: false
})
function onChange(key: string | number) {
  console.log('key', key)
}
const eventActiveKey = ref<TabsProps['activeKey']>('1')
const eventLog = ref('')
function onEventChange(key: string | number): void {
  eventLog.value = `change: ${key}`
}
function onEventTabClick(key: string | number): void {
  eventLog.value = `tabClick: ${key}`
}
function onEventTabScroll(info: { direction: 'left' | 'right' | 'top' | 'bottom' }): void {
  eventLog.value = `tabScroll: ${info.direction}`
}
const centerEnabled = ref(true)
const centerActiveKey = ref<TabsProps['activeKey']>('1')
const justifyValue = ref<NonNullable<TabsProps['justifyContent']>>('start')
const justifyOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'space-between', value: 'space-between' },
  { label: 'space-around', value: 'space-around' },
  { label: 'space-evenly', value: 'space-evenly' }
]
const guardEnabled = ref(true)
const guardActiveKey = ref<TabsProps['activeKey']>('1')
const guardTip = ref('')
function onBeforeLeave(key: string | number): boolean {
  if (!guardEnabled.value) {
    guardTip.value = `未拦截，已切换到 Tab ${key}`
    return true
  }
  guardTip.value = `beforeLeave 返回 false，已取消切换到 Tab ${key}`
  return false
}
const renderActiveKey = ref<TabsProps['activeKey']>('1')
const addDisabledDemo = ref(true)
// 对象形态渲染禁用态按钮：无权限时保留入口但不触发新增
const addableDemo = computed<boolean | { disabled?: boolean }>(() => {
  return addDisabledDemo.value ? { disabled: true } : true
})
// 自定义样式取主题变量：明暗模式与主题主色都会自动跟随（硬编码浅色在暗色下会整条发白）
const customTabStyle: CSSProperties = {
  background: 'var(--va-primary-bg-color)',
  color: 'var(--va-text-color-2)',
  fontSize: '16px',
  fontWeight: 600
}
// card 的激活页签默认取 --va-bg-container-color（容器底），被自定义底覆盖后要一并改成主色实底，
// 否则暗色下会在自定义底上「挖出」一块深色页签
const customCardTabStyle: CSSProperties = {
  ...customTabStyle,
  '--va-bg-container-color': 'var(--va-primary-color)',
  '--va-cp-tabs-primary-text-color': 'var(--va-text-color-solid)'
}
const customContentStyle: CSSProperties = {
  fontSize: '16px'
}
// 容器用法：面板补白底与内边距，视觉上与上方卡片页签连成一块容器。
// 上移量 = 页签栏 16px 下外边距 + 1px 分割线，使面板顶边贴合并盖住分割线，否则两者之间会留一道缝
const cardTopContentStyle: CSSProperties = {
  height: '120px',
  padding: '16px',
  marginTop: '-17px',
  background: 'var(--va-bg-container-color)',
  border: '1px solid var(--va-border-split-color)',
  borderTop: 'none',
  borderRadius: '0 0 8px 8px'
}
</script>

## 基本用法

<Tabs v-model:active-key="basicActiveKey" @change="onChange">
  <TabPane key="1" tab="Tab 1">Content of Tab Pane 1</TabPane>
  <TabPane key="2" tab="Tab 2">Content of Tab Pane 2</TabPane>
  <TabPane key="3" tab="Tab 3">Content of Tab Pane 3</TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const activeKey = ref<TabsProps['activeKey']>('1')
function onChange(key: string | number) {
  console.log('key', key)
}
</script>
<template>
  <Tabs v-model:active-key="activeKey" @change="onChange">
    <TabPane key="1" tab="Tab 1">Content of Tab Pane 1</TabPane>
    <TabPane key="2" tab="Tab 2">Content of Tab Pane 2</TabPane>
    <TabPane key="3" tab="Tab 3">Content of Tab Pane 3</TabPane>
  </Tabs>
</template>
```

::::

## 禁用

<Flex vertical>
  <Tabs v-model:active-key="disabledActiveKey">
    <TabPane v-for="item in tabListDisabled" :key="item.key" :tab="item.tab" :disabled="item.disabled">{{
      item.content
    }}</TabPane>
  </Tabs>
  <Tabs v-model:active-key="disabledActiveKey" type="card">
    <TabPane v-for="item in tabListDisabled" :key="item.key" :tab="item.tab" :disabled="item.disabled">{{
      item.content
    }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabListDisabled = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1', disabled: false },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2', disabled: false },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3', disabled: true }
]
const activeKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Flex vertical>
    <Tabs v-model:active-key="activeKey">
      <TabPane v-for="item in tabListDisabled" :key="item.key" :tab="item.tab" :disabled="item.disabled">{{
        item.content
      }}</TabPane>
    </Tabs>
    <Tabs v-model:active-key="activeKey" type="card">
      <TabPane v-for="item in tabListDisabled" :key="item.key" :tab="item.tab" :disabled="item.disabled">{{
        item.content
      }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## 居中

_通过 `justifyContent` 设为 center 让页签居中，line 与 card 类型均支持_

<br/>

<Flex vertical>
  <Tabs v-model:active-key="centeredActiveKey" justify-content="center">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <Tabs v-model:active-key="centeredActiveKey" justify-content="center" type="card">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Flex vertical>
    <Tabs v-model:active-key="activeKey" justify-content="center">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <Tabs v-model:active-key="activeKey" justify-content="center" type="card">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## 图标

_使用 `TabPane` 的 `tab` 插槽自定义页签内容_

<br/>

<Tabs v-model:active-key="iconActiveKey">
  <TabPane key="1" tab="Tab 1">
    <template #tab><AppleOutlined />Tab 1</template>
    Content of Tab Pane 1
  </TabPane>
  <TabPane key="2" tab="Tab 2">
    <template #tab><AndroidOutlined />Tab 2</template>
    Content of Tab Pane 2
  </TabPane>
  <TabPane key="3" tab="Tab 3">
    <template #tab>Tab 3<WindowsOutlined /></template>
    Content of Tab Pane 3
  </TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AppleOutlined, AndroidOutlined, WindowsOutlined } from '@ant-design/icons-vue'
import type { TabsProps } from 'vue-amazing-ui'
const iconActiveKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Tabs v-model:active-key="iconActiveKey">
    <TabPane key="1" tab="Tab 1">
      <template #tab><AppleOutlined />Tab 1</template>
      Content of Tab Pane 1
    </TabPane>
    <TabPane key="2" tab="Tab 2">
      <template #tab><AndroidOutlined />Tab 2</template>
      Content of Tab Pane 2
    </TabPane>
    <TabPane key="3" tab="Tab 3">
      <template #tab>Tab 3<WindowsOutlined /></template>
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
</template>
```

::::

## 滑动

_页签超出可视区域时可滚轮滑动，滚出视口的页签收纳进末尾的更多下拉_

<br/>

<Flex gap="small" align="center">
  tabPosition：<RadioGroup :options="positionOptions" v-model:value="morePosition" button button-style="solid" />
</Flex>

<Flex vertical>
  <Tabs :style="positionStyle" v-model:active-key="moreActiveKey" :tab-position="morePosition">
    <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <Tabs :style="positionStyle" v-model:active-key="moreActiveKey" :tab-position="morePosition" type="card">
    <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const moreTabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 5' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 6' },
  { key: '7', tab: 'Tab 7', content: 'Content of Tab Pane 7' },
  { key: '8', tab: 'Tab 8', content: 'Content of Tab Pane 8' }
]
const positionOptions = [
  { label: 'top', value: 'top' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' }
]
const morePosition = ref<NonNullable<TabsProps['tabPosition']>>('top')
const positionStyle = computed(() => {
  if (['top', 'bottom'].includes(morePosition.value)) {
    return {
      width: '360px'
    }
  } else {
    return {
      height: '200px'
    }
  }
})
const moreActiveKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Flex gap="small" align="center">
    tabPosition：<RadioGroup :options="positionOptions" v-model:value="morePosition" button button-style="solid" />
  </Flex>
  <Flex vertical>
    <Tabs :style="positionStyle" v-model:active-key="moreActiveKey" :tab-position="morePosition">
      <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <Tabs :style="positionStyle" v-model:active-key="moreActiveKey" :tab-position="morePosition" type="card">
      <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## 附加内容

<Flex vertical>
  <Tabs v-model:active-key="prefixActiveKey" prefix="prefix" suffix="suffix">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <Tabs v-model:active-key="prefixActiveKey" type="card">
    <template #prefix>
      <Button type="primary">prefix</Button>
    </template>
    <template #suffix>
      <Button type="primary">suffix</Button>
    </template>
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Flex vertical>
    <Tabs v-model:active-key="activeKey" prefix="prefix" suffix="suffix">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <Tabs v-model:active-key="activeKey" type="card">
      <template #prefix>
        <Button type="primary">prefix</Button>
      </template>
      <template #suffix>
        <Button type="primary">suffix</Button>
      </template>
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## 大小

<Flex gap="small" align="center">
  size：<RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
</Flex>

<Flex vertical>
  <Tabs v-model:active-key="sizeActiveKey" :size="size">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <Tabs v-model:active-key="sizeActiveKey" :size="size" type="card">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const sizeOptions = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
const size = ref<TabsProps['size']>('middle')
const activeKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Flex gap="small" align="center">
    size：<RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
  </Flex>
  <Flex vertical>
    <Tabs v-model:active-key="activeKey" :size="size">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <Tabs v-model:active-key="activeKey" :size="size" type="card">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## 位置

<Flex gap="small" align="center">
  tabPosition：<RadioGroup :options="positionOptions" v-model:value="position" button button-style="solid" />
</Flex>

<Flex vertical>
  <Tabs v-model:active-key="positionActiveKey" :tab-position="position">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <Tabs v-model:active-key="positionActiveKey" :tab-position="position" type="card">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const positionOptions = [
  { label: 'top', value: 'top' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' }
]
const position = ref<NonNullable<TabsProps['tabPosition']>>('top')
const activeKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Flex gap="small" align="center">
    tabPosition：<RadioGroup :options="positionOptions" v-model:value="position" button button-style="solid" />
  </Flex>
  <Flex vertical>
    <Tabs v-model:active-key="activeKey" :tab-position="position">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <Tabs v-model:active-key="activeKey" :tab-position="position" type="card">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## 卡片式页签

<Tabs v-model:active-key="cardActiveKey" type="card" @change="onChange">
  <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
function onChange(key: string | number) {
  console.log('key', key)
}
</script>
<template>
  <Tabs v-model:active-key="activeKey" type="card" @change="onChange">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</template>
```

::::

## 新增和关闭页签

_`addable` 展示新增按钮、`closable` 展示关闭按钮，增删由 `add` / `close` 事件驱动，`line` 与 `card` 类型均支持_

<br/>

<Flex vertical>
  <Tabs v-model:active-key="editActiveKey" type="card" addable @add="addPane" @close="closePane">
    <TabPane
      v-for="pane in editPanes"
      :key="pane.key"
      :tab="pane.tab"
      :closable="pane.closable !== false"
      >{{ pane.content }}</TabPane
    >
  </Tabs>
  <Tabs v-model:active-key="editActiveKey" type="line" addable @add="addPane" @close="closePane">
    <TabPane
      v-for="pane in editPanes"
      :key="pane.key"
      :tab="pane.tab"
      :closable="pane.closable !== false"
      >{{ pane.content }}</TabPane
    >
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const editActiveKey = ref<TabsProps['activeKey']>('1')
const editPanes = ref([
  { key: '1', tab: 'Tab 1', content: 'Content of Tab 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab 3', closable: false }
])
let newPaneIndex = 0
function addPane(): void {
  newPaneIndex += 1
  const key = `newTab${newPaneIndex}`
  editPanes.value = [
    ...editPanes.value,
    { key, tab: `New Tab ${newPaneIndex}`, content: `Content of New Tab ${newPaneIndex}`, closable: true }
  ]
  editActiveKey.value = key
}
function closePane(key: string | number): void {
  const index = editPanes.value.findIndex((pane) => pane.key === key)
  if (index === -1) {
    return
  }
  const rest = editPanes.value.filter((pane) => pane.key !== key)
  editPanes.value = rest
  // 关掉的是当前激活项时，优先激活后一个，没有则取前一个
  if (editActiveKey.value === key && rest.length) {
    editActiveKey.value = rest[Math.min(index, rest.length - 1)].key
  }
}
</script>
<template>
  <Tabs v-model:active-key="editActiveKey" type="card" addable @add="addPane" @close="closePane">
    <TabPane
      v-for="pane in editPanes"
      :key="pane.key"
      :tab="pane.tab"
      :closable="pane.closable !== false"
      >{{ pane.content }}</TabPane
    >
  </Tabs>
  <Tabs v-model:active-key="editActiveKey" type="line" addable @add="addPane" @close="closePane">
    <TabPane
      v-for="pane in editPanes"
      :key="pane.key"
      :tab="pane.tab"
      :closable="pane.closable !== false"
      >{{ pane.content }}</TabPane
    >
  </Tabs>
</template>
```

::::

## 卡片式页签容器

_用于容器顶部时，可通过 `contentStyle` 覆盖面板底色与内边距_

<br/>

<Tabs v-model:active-key="cardContainerActiveKey" type="card" :content-style="cardTopContentStyle">
  <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">
    <p>{{ item.content }}</p>
    <p>{{ item.content }}</p>
    <p>{{ item.content }}</p>
  </TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
// 容器用法：面板补白底与内边距，视觉上与上方卡片页签连成一块容器。
// 上移量 = 页签栏 16px 下外边距 + 1px 分割线，使面板顶边贴合并盖住分割线，否则两者之间会留一道缝
const cardTopContentStyle: CSSProperties = {
  height: '120px',
  padding: '16px',
  marginTop: '-17px',
  background: 'var(--va-bg-container-color)',
  border: '1px solid var(--va-border-split-color)',
  borderTop: 'none',
  borderRadius: '0 0 8px 8px'
}
</script>
<template>
  <Tabs v-model:active-key="activeKey" type="card" :content-style="cardTopContentStyle">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">
      <p>{{ item.content }}</p>
      <p>{{ item.content }}</p>
      <p>{{ item.content }}</p>
    </TabPane>
  </Tabs>
</template>
```

::::

## 自定义新增页签触发器

_关闭内置新增按钮，改用 `suffix` 插槽中的自定义触发器_

<br/>

<Tabs v-model:active-key="editActiveKey" type="card" @close="closePane">
  <template #suffix>
    <Button type="primary" @click="addPane">
      <template #icon><PlusOutlined /></template>
      新增页签
    </Button>
  </template>
  <TabPane
    v-for="pane in editPanes"
    :key="pane.key"
    :tab="pane.tab"
    :closable="pane.closable !== false"
    >{{ pane.content }}</TabPane
  >
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { TabsProps } from 'vue-amazing-ui'
const editActiveKey = ref<TabsProps['activeKey']>('1')
const editPanes = ref([
  { key: '1', tab: 'Tab 1', content: 'Content of Tab 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab 3', closable: false }
])
let newPaneIndex = 0
function addPane(): void {
  newPaneIndex += 1
  const key = `newTab${newPaneIndex}`
  editPanes.value = [
    ...editPanes.value,
    { key, tab: `New Tab ${newPaneIndex}`, content: `Content of New Tab ${newPaneIndex}`, closable: true }
  ]
  editActiveKey.value = key
}
function closePane(key: string | number): void {
  const index = editPanes.value.findIndex((pane) => pane.key === key)
  if (index === -1) {
    return
  }
  const rest = editPanes.value.filter((pane) => pane.key !== key)
  editPanes.value = rest
  // 关掉的是当前激活项时，优先激活后一个，没有则取前一个
  if (editActiveKey.value === key && rest.length) {
    editActiveKey.value = rest[Math.min(index, rest.length - 1)].key
  }
}
</script>
<template>
  <Tabs v-model:active-key="editActiveKey" type="card" @close="closePane">
    <template #suffix>
      <Button type="primary" @click="addPane">
        <template #icon><PlusOutlined /></template>
        新增页签
      </Button>
    </template>
    <TabPane
      v-for="pane in editPanes"
      :key="pane.key"
      :tab="pane.tab"
      :closable="pane.closable !== false"
      >{{ pane.content }}</TabPane
    >
  </Tabs>
</template>
```

::::

## 自定义新增图标

_通过 `addIcon` 插槽替换新增按钮的内置图标_

<br/>

<Tabs v-model:active-key="editActiveKey" type="card" addable @add="addPane" @close="closePane">
  <template #addIcon><PlusCircleOutlined /></template>
  <TabPane
    v-for="pane in editPanes"
    :key="pane.key"
    :tab="pane.tab"
    :closable="pane.closable !== false"
    >{{ pane.content }}</TabPane
  >
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import type { TabsProps } from 'vue-amazing-ui'
const editActiveKey = ref<TabsProps['activeKey']>('1')
const editPanes = ref([
  { key: '1', tab: 'Tab 1', content: 'Content of Tab 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab 3', closable: false }
])
let newPaneIndex = 0
function addPane(): void {
  newPaneIndex += 1
  const key = `newTab${newPaneIndex}`
  editPanes.value = [
    ...editPanes.value,
    { key, tab: `New Tab ${newPaneIndex}`, content: `Content of New Tab ${newPaneIndex}`, closable: true }
  ]
  editActiveKey.value = key
}
function closePane(key: string | number): void {
  const rest = editPanes.value.filter((pane) => pane.key !== key)
  editPanes.value = rest
  if (editActiveKey.value === key && rest.length) {
    editActiveKey.value = rest[rest.length - 1].key
  }
}
</script>
<template>
  <Tabs v-model:active-key="editActiveKey" type="card" addable @add="addPane" @close="closePane">
    <template #addIcon><PlusCircleOutlined /></template>
    <TabPane
      v-for="pane in editPanes"
      :key="pane.key"
      :tab="pane.tab"
      :closable="pane.closable !== false"
      >{{ pane.content }}</TabPane
    >
  </Tabs>
</template>
```

::::

## 新增按钮禁用

_`addable` 传对象可把新增按钮渲染为禁用态，无权限时保留入口而非直接消失_

<br/>

<Flex gap="small" align="center"> 禁用新增：<Switch v-model:value="addDisabledDemo" /> </Flex>

<Tabs v-model:active-key="editActiveKey" type="card" :addable="addableDemo" @add="addPane" @close="closePane">
  <TabPane
    v-for="pane in editPanes"
    :key="pane.key"
    :tab="pane.tab"
    :closable="pane.closable !== false"
    >{{ pane.content }}</TabPane
  >
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const editActiveKey = ref<TabsProps['activeKey']>('1')
const editPanes = ref([
  { key: '1', tab: 'Tab 1', content: 'Content of Tab 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab 2' }
])
const addDisabled = ref(true)
const addable = computed<boolean | { disabled?: boolean }>(() => {
  return addDisabled.value ? { disabled: true } : true
})
function addPane(): void {
  // 实际项目这里追加页签数据
}
</script>
<template>
  <Switch v-model:value="addDisabled" />
  <Tabs v-model:active-key="editActiveKey" type="card" :addable="addable" @add="addPane">
    <TabPane v-for="pane in editPanes" :key="pane.key" :tab="pane.tab">{{ pane.content }}</TabPane>
  </Tabs>
</template>
```

::::

## 自定义页签头

_通过 `tabBar` 插槽替换内置导航，示例为卡片式页签头，选中项呈现为主色实心_

<br/>

<Tabs v-model:active-key="barActiveKey">
  <template #tabBar="{ tabs, activeKey: currentKey, change }">
    <div class="custom-tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="custom-tab-bar-item"
        :class="{ 'custom-tab-bar-item-active': currentKey === tab.key }"
        @click="change(tab.key)"
        >{{ tab.tab }}</button
      >
    </div>
  </template>
  <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const barActiveKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Tabs v-model:active-key="barActiveKey">
    <template #tabBar="{ tabs, activeKey: currentKey, change }">
      <div class="custom-tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="custom-tab-bar-item"
          :class="{ 'custom-tab-bar-item-active': currentKey === tab.key }"
          @click="change(tab.key)"
          >{{ tab.tab }}</button
        >
      </div>
    </template>
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</template>
<style lang="less" scoped>
.custom-tab-bar {
  display: flex;
  gap: 8px;
  padding-bottom: 12px;
}
.custom-tab-bar-item {
  padding: 8px 20px;
  font-weight: 500;
  color: var(--va-text-color-2);
  background: var(--va-bg-container-color);
  border: 1px solid var(--va-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: var(--va-primary-text-color);
    border-color: var(--va-primary-border-color);
  }
}
.custom-tab-bar-item-active {
  color: var(--va-text-color-solid);
  background: var(--va-primary-color);
  border-color: var(--va-primary-color);
  &:hover {
    color: var(--va-text-color-solid);
    background: var(--va-primary-color-hover);
    border-color: var(--va-primary-color-hover);
  }
}
</style>
```

::::

<style lang="less" scoped>
.custom-tab-bar {
  display: flex;
  gap: 8px;
  padding-bottom: 12px;
}
.custom-tab-bar-item {
  padding: 8px 20px;
  font-weight: 500;
  color: var(--va-text-color-2);
  background: var(--va-bg-container-color);
  border: 1px solid var(--va-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: var(--va-primary-text-color);
    border-color: var(--va-primary-border-color);
  }
}
.custom-tab-bar-item-active {
  color: var(--va-text-color-solid);
  background: var(--va-primary-color);
  border-color: var(--va-primary-color);
  &:hover {
    color: var(--va-text-color-solid);
    background: var(--va-primary-color-hover);
    border-color: var(--va-primary-color-hover);
  }
}
</style>

## 自定义 Tab & Content 样式

<Flex vertical>
  <Tabs
    v-model:active-key="customStyleActiveKey"
    :tab-gutter="24"
    :tab-style="customTabStyle"
    :content-style="customContentStyle"
  >
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <Tabs
    v-model:active-key="customStyleActiveKey"
    type="card"
    size="large"
    :tab-gutter="12"
    :tab-style="customCardTabStyle"
    :content-style="customContentStyle"
  >
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
// 自定义样式取主题变量：明暗模式与主题主色都会自动跟随（硬编码浅色在暗色下会整条发白）
const customTabStyle: CSSProperties = {
  background: 'var(--va-primary-bg-color)',
  color: 'var(--va-text-color-2)',
  fontSize: '16px',
  fontWeight: 600
}
// card 的激活页签默认取 --va-bg-container-color（容器底），被自定义底覆盖后要一并改成主色实底，
// 否则暗色下会在自定义底上「挖出」一块深色页签
const customCardTabStyle: CSSProperties = {
  ...customTabStyle,
  '--va-bg-container-color': 'var(--va-primary-color)',
  '--va-cp-tabs-primary-text-color': 'var(--va-text-color-solid)'
}
const customContentStyle: CSSProperties = {
  fontSize: '16px'
}
</script>
<template>
  <Flex vertical>
    <Tabs
      v-model:active-key="activeKey"
      :tab-gutter="24"
      :tab-style="customTabStyle"
      :content-style="customContentStyle"
    >
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <Tabs
      v-model:active-key="activeKey"
      type="card"
      size="large"
      :tab-gutter="12"
      :tab-style="customCardTabStyle"
      :content-style="customContentStyle"
    >
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## 自定义内容

_使用 `TabPane` 的默认插槽自定义该页签的内容，可放任意组件_

<br/>

<Tabs v-model:active-key="contentActiveKey">
  <TabPane key="1" tab="Tab 1">
    <p>key: 1 的插槽内容（可放任意组件）</p>
    <Button type="primary" size="small">操作按钮</Button>
  </TabPane>
  <TabPane key="2" tab="Tab 2">
    <p>key: 2 的插槽内容（可放任意组件）</p>
    <Button type="primary" size="small">操作按钮</Button>
  </TabPane>
  <TabPane key="3" tab="Tab 3">
    <p>key: 3 的插槽内容（可放任意组件）</p>
    <Button type="primary" size="small">操作按钮</Button>
  </TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const contentActiveKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Tabs v-model:active-key="contentActiveKey">
    <TabPane key="1" tab="Tab 1">
      <p>key: 1 的插槽内容（可放任意组件）</p>
      <Button type="primary" size="small">操作按钮</Button>
    </TabPane>
    <TabPane key="2" tab="Tab 2">
      <p>key: 2 的插槽内容（可放任意组件）</p>
      <Button type="primary" size="small">操作按钮</Button>
    </TabPane>
    <TabPane key="3" tab="Tab 3">
      <p>key: 3 的插槽内容（可放任意组件）</p>
      <Button type="primary" size="small">操作按钮</Button>
    </TabPane>
  </Tabs>
</template>
```

::::

## 切换动画

_开启 `animated` 后面板随页签横向滑动切换，仅在 `tabPosition` 为 top / bottom 时生效_

<br/>

<Flex gap="small" align="center">
  animated：<Switch v-model:value="animEnabled" />
</Flex>

<Tabs v-model:active-key="animActiveKey" :animated="animEnabled">
  <TabPane v-for="item in tabList.slice(0, 4)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' }
]
const animActiveKey = ref<TabsProps['activeKey']>('1')
const animEnabled = ref(true)
</script>
<template>
  <Flex gap="small" align="center">
    animated：<Switch v-model:value="animEnabled" />
  </Flex>
  <Tabs v-model:active-key="animActiveKey" :animated="animEnabled">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</template>
```

::::

## 销毁非活跃面板

_开启 `destroyInactiveTabPane` 后非激活面板的内容会被卸载，切回时重新创建（关闭后输入内容会保留）_

<br/>

<Flex gap="small" align="center">
  destroyInactiveTabPane：<Switch v-model:value="destroyEnabled" />
</Flex>

<Tabs v-model:active-key="destroyActiveKey" :destroy-inactive-tab-pane="destroyEnabled">
  <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">
    <Input placeholder="输入后切换页签，观察内容是否保留" />
  </TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const destroyActiveKey = ref<TabsProps['activeKey']>('1')
const destroyEnabled = ref(true)
</script>
<template>
  <Flex gap="small" align="center">
    destroyInactiveTabPane：<Switch v-model:value="destroyEnabled" />
  </Flex>
  <Tabs v-model:active-key="destroyActiveKey" :destroy-inactive-tab-pane="destroyEnabled">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">
      <Input placeholder="输入后切换页签，观察内容是否保留" />
    </TabPane>
  </Tabs>
</template>
```

::::

## 面板渲染时机

_`TabPane` 的 `displayDirective` 控制非激活面板：`if` 立即卸载、`show` 保留、`show:lazy` 首次激活后保留_

<br/>

<Flex vertical>
  <Tabs v-model:active-key="renderActiveKey">
    <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab" display-directive="if">
      <p>if：切走后内容卸载，输入不保留</p>
      <Input placeholder="输入后切换页签，观察内容" />
    </TabPane>
  </Tabs>
  <Tabs v-model:active-key="renderActiveKey">
    <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab" display-directive="show">
      <p>show：内容常驻，输入保留</p>
      <Input placeholder="输入后切换页签，观察内容" />
    </TabPane>
  </Tabs>
  <Tabs v-model:active-key="renderActiveKey">
    <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab" display-directive="show:lazy">
      <p>show:lazy：首次激活后才渲染，之后保留</p>
      <Input placeholder="输入后切换页签，观察内容" />
    </TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const renderActiveKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Tabs v-model:active-key="renderActiveKey">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab" display-directive="if">
      <Input placeholder="输入后切换页签，观察内容" />
    </TabPane>
  </Tabs>
  <Tabs v-model:active-key="renderActiveKey">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab" display-directive="show">
      <Input placeholder="输入后切换页签，观察内容" />
    </TabPane>
  </Tabs>
  <Tabs v-model:active-key="renderActiveKey">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab" display-directive="show:lazy">
      <Input placeholder="输入后切换页签，观察内容" />
    </TabPane>
  </Tabs>
</template>
```

::::

## 事件回调

_`change` / `tabClick` 在切换时触发，`tabScroll` 在页签滚动到边界之外时触发_

<br/>

<Tabs
  v-model:active-key="eventActiveKey"
  style="width: 360px"
  @change="onEventChange"
  @tab-click="onEventTabClick"
  @tab-scroll="onEventTabScroll"
>
  <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

<p class="mt10">最近事件：{{ eventLog || '暂无' }}</p>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 5' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 6' },
  { key: '7', tab: 'Tab 7', content: 'Content of Tab Pane 7' }
]
const eventActiveKey = ref<TabsProps['activeKey']>('1')
const eventLog = ref('')
function onEventChange(key: string | number): void {
  eventLog.value = `change: ${key}`
}
function onEventTabClick(key: string | number): void {
  eventLog.value = `tabClick: ${key}`
}
function onEventTabScroll(info: { direction: 'left' | 'right' | 'top' | 'bottom' }): void {
  eventLog.value = `tabScroll: ${info.direction}`
}
</script>
<template>
  <Tabs
    v-model:active-key="eventActiveKey"
    style="width: 360px"
    @change="onEventChange"
    @tab-click="onEventTabClick"
    @tab-scroll="onEventTabScroll"
  >
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <p class="mt10">最近事件：{{ eventLog || '暂无' }}</p>
</template>
```

::::

## 页签分布

_通过 `justifyContent` 控制页签在导航区的分布，仅在 `type` 为 line 且页签未溢出时生效_

<br/>

<Flex gap="small" align="center">
  justifyContent：<RadioGroup :options="justifyOptions" v-model:value="justifyValue" button button-style="solid" />
</Flex>

<Tabs v-model:active-key="justifyActiveKey" :justify-content="justifyValue">
  <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
const justifyValue = ref<NonNullable<TabsProps['justifyContent']>>('start')
const justifyOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'space-between', value: 'space-between' },
  { label: 'space-around', value: 'space-around' },
  { label: 'space-evenly', value: 'space-evenly' }
]
</script>
<template>
  <Flex gap="small" align="center">
    justifyContent：<RadioGroup :options="justifyOptions" v-model:value="justifyValue" button button-style="solid" />
  </Flex>
  <Tabs v-model:active-key="activeKey" :justify-content="justifyValue">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</template>
```

::::

## 切换拦截

_通过 `beforeLeave` 拦截切换：返回 `false` 或 Promise reject 时取消本次切换_

<br/>

<Flex gap="small" align="center"> 拦截切换：<Switch v-model:value="guardEnabled" /> </Flex>

<Tabs v-model:active-key="guardActiveKey" :before-leave="onBeforeLeave">
  <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

<p class="mt10">最近操作：{{ guardTip || '暂无' }}</p>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const guardEnabled = ref(true)
const guardActiveKey = ref<TabsProps['activeKey']>('1')
const guardTip = ref('')
function onBeforeLeave(key: string | number): boolean {
  if (!guardEnabled.value) {
    guardTip.value = `未拦截，已切换到 Tab ${key}`
    return true
  }
  guardTip.value = `beforeLeave 返回 false，已取消切换到 Tab ${key}`
  return false
}
</script>
<template>
  <Switch v-model:value="guardEnabled" />
  <Tabs v-model:active-key="guardActiveKey" :before-leave="onBeforeLeave">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
  <p>最近操作：{{ guardTip || '暂无' }}</p>
</template>
```

::::

## 自定义类名

_通过 `tabClass` / `contentClass` 给页签与面板挂类名，便于用外部样式定制_

<br/>

<Tabs v-model:active-key="classActiveKey" tab-class="demo-tab" content-class="demo-content">
  <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Tabs v-model:active-key="activeKey" tab-class="demo-tab" content-class="demo-content">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</template>
<style lang="less" scoped>
:deep(.demo-tab) {
  font-weight: 600;
}
:deep(.demo-content) {
  padding: 8px 12px;
  background: var(--va-fill-color-1);
  border-radius: 8px;
}
:deep(.demo-tab) {
  font-weight: 600;
}
:deep(.demo-content) {
  padding: 8px 12px;
  background: var(--va-fill-color-1);
  border-radius: 8px;
}

</style>
```

::::

## 激活项居中

_开启 `centerActiveTab` 后切换页签会把激活项滚到导航区中间，首尾空间不足时贴边_

<br/>

<Flex gap="small" align="center"> 居中：<Switch v-model:value="centerEnabled" /> </Flex>

<Tabs v-model:active-key="centerActiveKey" style="width: 360px" :center-active-tab="centerEnabled">
  <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
</Tabs>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 5' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 6' },
  { key: '7', tab: 'Tab 7', content: 'Content of Tab Pane 7' }
]
const centerEnabled = ref(true)
const centerActiveKey = ref<TabsProps['activeKey']>('1')
</script>
<template>
  <Switch v-model:value="centerEnabled" />
  <Tabs v-model:active-key="centerActiveKey" style="width: 360px" :center-active-tab="centerEnabled">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</template>
```

::::

## 标签页配置器

_组合调整下方配置项可实时预览属性效果，`justifyContent` 的 `center` 用于页签居中；`line` 下仅未溢出时生效，`card` 下仅 `center` 生效_

<br/>

<Flex gap="large" vertical>
  <Row :gutter="[24, 12]">
    <Col :span="6">
      <Space gap="small" vertical> prefix：<Input v-model:value="state.prefix" placeholder="prefix" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> suffix：<Input v-model:value="state.suffix" placeholder="suffix" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> animated：<Switch v-model:value="state.animated" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        type：<RadioGroup :options="typeOptions" v-model:value="state.type" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="12">
      <Space gap="small" vertical>
        size：<RadioGroup :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="12">
      <Flex gap="small" vertical>
        tabGutter：<Slider v-model:value="state.tabGutter" :min="0" :step="1" :max="100" />
      </Flex>
    </Col>
    <Col :span="24">
      <Space gap="small" vertical>
        justifyContent：<RadioGroup
          :options="justifyOptions"
          v-model:value="state.justifyContent"
          button
          button-style="solid"
        />
      </Space>
    </Col>
    <Col :span="12">
      <Space gap="small" vertical>
        tabPosition：<RadioGroup
          :options="positionOptions"
          v-model:value="state.tabPosition"
          button
          button-style="solid"
        />
      </Space>
    </Col>
    <Col :span="12">
      <Space gap="small" vertical>
        destroyInactiveTabPane：<Switch v-model:value="state.destroyInactiveTabPane" />
      </Space>
    </Col>
  </Row>
  <Tabs v-model:active-key="configActiveKey" v-bind="state">
    <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
  </Tabs>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' }
]
const activeKey = ref<TabsProps['activeKey']>('1')
const typeOptions = [
  { label: 'line', value: 'line' },
  { label: 'card', value: 'card' }
]
const sizeOptions = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
const positionOptions = [
  { label: 'top', value: 'top' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' }
]
const justifyOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'space-between', value: 'space-between' },
  { label: 'space-around', value: 'space-around' },
  { label: 'space-evenly', value: 'space-evenly' }
]
const state = reactive<TabsProps>({
  prefix: '',
  suffix: '',
  animated: false,
  size: 'middle',
  type: 'line',
  justifyContent: 'start',
  tabGutter: 24,
  tabPosition: 'top',
  destroyInactiveTabPane: false
})
</script>
<template>
  <Flex gap="large" vertical>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Space gap="small" vertical> prefix：<Input v-model:value="state.prefix" placeholder="prefix" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> suffix：<Input v-model:value="state.suffix" placeholder="suffix" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> animated：<Switch v-model:value="state.animated" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          type：<RadioGroup :options="typeOptions" v-model:value="state.type" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="12">
        <Space gap="small" vertical>
          size：<RadioGroup :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="12">
        <Flex gap="small" vertical>
          tabGutter：<Slider v-model:value="state.tabGutter" :min="0" :step="1" :max="100" />
        </Flex>
      </Col>
      <Col :span="24">
        <Space gap="small" vertical>
          justifyContent：<RadioGroup
            :options="justifyOptions"
            v-model:value="state.justifyContent"
            button
            button-style="solid"
          />
        </Space>
      </Col>
      <Col :span="12">
        <Space gap="small" vertical>
          tabPosition：<RadioGroup
            :options="positionOptions"
            v-model:value="state.tabPosition"
            button
            button-style="solid"
          />
        </Space>
      </Col>
      <Col :span="12">
        <Space gap="small" vertical>
          destroyInactiveTabPane：<Switch v-model:value="state.destroyInactiveTabPane" />
        </Space>
      </Col>
    </Row>
    <Tabs v-model:active-key="activeKey" v-bind="state">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
  </Flex>
</template>
```

::::

## APIs

> **受控 / 非受控**：`activeKey` 传入即受控（值以父为准，组件只上报 `update:activeKey`）；不传则由组件自持，交互照常生效，可用 `defaultActiveKey` 指定初值。

### Tabs Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| activeKey <Tag color="cyan">v-model</Tag> | 当前激活 `tab` 面板的 `key` | string &#124; number | undefined |
| defaultActiveKey | 非受控时的初始激活 `key`，仅在未传 `activeKey` 时生效 | string &#124; number | undefined |
| prefix | 标签页前缀 | string | undefined |
| suffix | 标签页后缀 | string | undefined |
| size | 标签页大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| type | 标签页的类型 | 'line' &#124; 'card' | 'line' |
| tabPosition | 自定义页签位置 | 'top' &#124; 'right' &#124; 'bottom' &#124; 'left' | 'top' |
| justifyContent | 页签在导航区的分布方式，`line` 下仅未溢出时生效，`card` 下仅 `center` 生效 | 'space-between' &#124; 'space-around' &#124; 'space-evenly' &#124; 'center' &#124; 'start' &#124; 'end' | undefined |
| tabGutter | 页签之前的间隙大小，单位 `px` | number | undefined |
| tabStyle | 自定义页签样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| tabClass | 自定义页签类名 | string | undefined |
| contentStyle | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| contentClass | 自定义内容类名 | string | undefined |
| animated | 是否启用切换动画，在 `tabPosition: 'top'` &#124; `'bottom'` 时有效 | boolean | false |
| centerActiveTab | 切换页签时是否把激活项滚动到导航区中间，空间不足时贴边 | boolean | false |
| addable | 是否展示新增页签按钮，传对象可渲染为禁用态 | boolean &#124; [TabsAddable](#tabsaddable-type) | false |
| destroyInactiveTabPane | 是否销毁非激活面板的内容，`TabPane` 的 `displayDirective` 优先 | boolean | false |
| beforeLeave | 切换页签前的钩子，返回 `false` 或 Promise reject 时取消本次切换 | [TabsBeforeLeave](#tabsbeforeleave-type) | undefined |

### TabsAddable Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| disabled? | 是否禁用新增按钮 | boolean |

### TabsBeforeLeave Type

| 名称 | 值 |
| :-- | :-- |
| TabsBeforeLeave | (key: string &#124; number, oldKey?: string &#124; number) => boolean &#124; void &#124; Promise&lt;unknown&gt; |

### TabPane Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| tab | 页签显示文字，`tab` 插槽优先 | string | undefined |
| disabled | 是否禁用页签 | boolean | false |
| closable | 是否展示关闭按钮，点击后抛出 `close` 事件 | boolean | false |
| displayDirective | 面板内容渲染口径：`if` 非激活即卸载、`show` 保留、`show:lazy` 首次激活后保留；未设置时由 `Tabs` 的 `destroyInactiveTabPane` 决定 | 'if' &#124; 'show' &#124; 'show:lazy' | undefined |

## Slots

### Tabs Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 标签页内容（`TabPane` 子组件） | v-slot:default |
| prefix | 自定义标签页前缀 | v-slot:prefix |
| suffix | 自定义标签页后缀 | v-slot:suffix |
| addIcon | 自定义新增页签按钮的图标 | v-slot:addIcon |
| tabBar | 自定义页签头，使用后替代内置导航 | v-slot:tabBar="{ tabs, activeKey, change }" |

### TabPane Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 该页签的内容，可放任意组件 | v-slot:default |
| tab | 自定义页签显示内容，优先于 `tab` 属性 | v-slot:tab |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| change | 切换面板的回调 | (key: string &#124; number) => void |
| tabClick | 点击页签的回调，禁用页签也会触发 | (key: string &#124; number, event: MouseEvent &#124; KeyboardEvent) => void |
| tabScroll | 页签滚动到边界之外时的回调 | (info: { direction: 'left' &#124; 'right' &#124; 'top' &#124; 'bottom' }) => void |
| add | 点击新增页签按钮的回调 | () => void |
| close | 点击页签关闭按钮的回调 | (key: string &#124; number) => void |

## 键盘操作

| 按键 | 说明 |
| :-- | :-- |
| ← / → | `tabPosition` 为 `top` / `bottom` 时，在页签之间前后移动并激活 |
| ↑ / ↓ | `tabPosition` 为 `left` / `right` 时，在页签之间前后移动并激活 |
| Home | 跳到第一个可用页签并激活 |
| End | 跳到最后一个可用页签并激活 |
