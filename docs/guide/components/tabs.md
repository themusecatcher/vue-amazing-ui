# 标签页 Tabs

<br/>

*选项卡切换组件*

## 何时使用

- 提供平级的区域将大块内容进行收纳和展现，保持界面整洁

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const tabPagesDisabled = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    disabled: true,
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
function onChange (key: string|number) {
  console.log('key:', key)
}
</script>

## 基本使用

<Tabs :tab-pages="tabPages" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" />
</template>
```

:::

## 禁用某一项

*禁用 key: 3 标签页*

<br/>

<Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPagesDisabled = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    disabled: true,
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" />
</template>
```

:::

## 居中展示

<Tabs centered :tab-pages="tabPages" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs centered :tab-pages="tabPages" v-model:active-key="activeKey" />
</template>
```

:::

## 左右滑动，容纳更多标签

<Tabs style="width: 320px;" :tab-pages="tabPages" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs style="width: 320px;" :tab-pages="tabPages" v-model:active-key="activeKey" />
</template>
```

:::

## 大号标签页

<Tabs size="large" :tab-pages="tabPages" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs size="large" :tab-pages="tabPages" v-model:active-key="activeKey" />
</template>
```

:::

## 自定义内容

<Tabs :tab-pages="tabPages" v-model:active-key="activeKey">
  <template #1>
    <p>key: 1 的 slot 内容</p>
  </template>
  <template #2>
    <p>key: 2 的 slot 内容</p>
  </template>
  <template #3>
    <p>key: 3 的 slot 内容</p>
  </template>
</Tabs>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey">
    <template #1>
      <p>key: 1 的 slot 内容</p>
    </template>
    <template #2>
      <p>key: 2 的 slot 内容</p>
    </template>
    <template #3>
      <p>key: 3 的 slot 内容</p>
    </template>
  </Tabs>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
tabPages | 标签页数组 | Tab[] | [] | true
centered | 标签是否居中展示 | boolean | false | false
size | 标签页大小 | 'small' &#124; 'large' | 'small' | false
activeKey <Tag color="cyan">v-model</Tag> | 当前激活 `tab` 面板的 `key` | string &#124; number | '' | false

## Tab Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
key | 对应 `activeKey` | string &#124; number | true
tab | 标签页显示文字 | string | true
content | 标签页内容 | string &#124; slot | false
disabled | 禁用对应标签页 | boolean | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 切换面板的回调 | (key: string &#124; number) => void
