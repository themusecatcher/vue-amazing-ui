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

<details>
<summary>查看代码</summary>

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

</details>

## 禁用某一项

*禁用 key: 3 标签页*

<br/>

<Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" />

<details>
<summary>查看代码</summary>

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

</details>

## 居中展示

<Tabs centered :tab-pages="tabPages" v-model:active-key="activeKey" />

<details>
<summary>查看代码</summary>

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

</details>

## 左右滑动，容纳更多标签

<Tabs style="width: 320px;" :tab-pages="tabPages" v-model:active-key="activeKey" />

<details>
<summary>查看代码</summary>

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

</details>

## 大号标签页

<Tabs size="large" :tab-pages="tabPages" v-model:active-key="activeKey" />

<details>
<summary>查看代码</summary>

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

</details>

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

<details>
<summary>查看代码</summary>

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

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
