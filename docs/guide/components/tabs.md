# 标签页 Tabs

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*选项卡切换组件*

## 何时使用

- 提供平级的区域将大块内容进行收纳和展现，保持界面整洁

<script setup lang="ts">
import { ref, h, watchEffect, computed } from 'vue'
import { AppleOutlined, AndroidOutlined, WindowsOutlined } from '@ant-design/icons-vue'
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
const iconTabPages = ref([
  {
    tab: 'Tab 1',
    icon: h(AppleOutlined),
    content: 'Content of Tab Pane 1'
  },
  {
    tab: 'Tab 2',
    icon: h(AndroidOutlined),
    content: 'Content of Tab Pane 2'
  },
  {
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const moreTabPages = ref([
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
  },
  {
    key: '7',
    tab: 'Tab 7',
    content: 'Content of Tab Pane 7'
  },
  {
    key: '8',
    tab: 'Tab 8',
    content: 'Content of Tab Pane 8'
  }
])
const activeKey = ref('1')
const iconActiveKey = ref(0)
const moreActiveKey = ref('1')
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
watchEffect(() => {
  console.log('iconActiveKey:', iconActiveKey.value)
})
watchEffect(() => {
  console.log('moreActiveKey:', moreActiveKey.value)
})
const sizeOptions = ref([
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
])
const size = ref('middle')
const positionOptions = ref([
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
])
const position = ref('top')
const morePosition = ref('top')
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
function onChange(key: string | number) {
  console.log('key:', key)
}
</script>

## 基本使用

<Tabs :tab-pages="tabPages" v-model:active-key="activeKey" @change="onChange" />

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function onChange(key: string | number) {
  console.log('key:', key)
}
</script>
<template>
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" @change="onChange" />
</template>
```

:::

## 卡片式标签页

<Tabs :tab-pages="tabPages" v-model:active-key="activeKey" type="card" @change="onChange" />

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function onChange(key: string | number) {
  console.log('key:', key)
}
</script>
<template>
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" type="card" @change="onChange" />
</template>
```

:::

## 禁用某一项

*禁用 `key: 3` 标签页*

<br/>

<Flex vertical>
  <Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" />
  <Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" type="card" />
</Flex>

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" />
    <Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" type="card" />
  </Flex>
</template>
```

:::

## 居中展示

<Flex vertical>
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" centered />
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" centered type="card" />
</Flex>

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" centered />
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" centered type="card" />
  </Flex>
</template>
```

:::

## 带图标的标签页

<Flex vertical>
  <Tabs :tab-pages="iconTabPages" v-model:active-key="iconActiveKey" />
  <Tabs :tab-pages="iconTabPages" v-model:active-key="iconActiveKey" type="card">
    <template #tab="{ key, tab }">
      <AppleOutlined v-if="key === 0" />
      <AndroidOutlined v-if="key === 1" />
      {{ tab }}
      <WindowsOutlined v-if="key === 2" />
    </template>
  </Tabs>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h, watchEffect } from 'vue'
import { AppleOutlined, AndroidOutlined, WindowsOutlined } from '@ant-design/icons-vue'
const iconTabPages = ref([
  {
    tab: 'Tab 1',
    icon: h(AppleOutlined),
    content: 'Content of Tab Pane 1'
  },
  {
    tab: 'Tab 2',
    icon: h(AndroidOutlined),
    content: 'Content of Tab Pane 2'
  },
  {
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const iconActiveKey = ref(0)
watchEffect(() => {
  console.log('iconActiveKey:', iconActiveKey.value)
})
</script>
<template>
  <Flex vertical>
    <Tabs :tab-pages="iconTabPages" v-model:active-key="iconActiveKey" />
    <Tabs :tab-pages="iconTabPages" v-model:active-key="iconActiveKey" type="card">
      <template #tab="{ key, tab }">
        <AppleOutlined v-if="key === 0" />
        <AndroidOutlined v-if="key === 1" />
        {{ tab }}
        <WindowsOutlined v-if="key === 2" />
      </template>
    </Tabs>
  </Flex>
</template>
```

:::

## 前缀 & 后缀

<Flex vertical>
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" prefix="prefix" suffix="suffix" />
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" type="card">
    <template #prefix>
      <Button type="primary">prefix</Button>
    </template>
    <template #suffix>
      <Button type="primary">suffix</Button>
    </template>
  </Tabs>
</Flex>

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" prefix="prefix" suffix="suffix" />
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" type="card">
      <template #prefix>
        <Button type="primary">prefix</Button>
      </template>
      <template #suffix>
        <Button type="primary">suffix</Button>
      </template>
    </Tabs>
  </Flex>
</template>
```

:::

## 三种尺寸

<Flex vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :size="size" />
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :size="size" type="card" />
</Flex>

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
const sizeOptions = ref([
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
])
const size = ref('middle')
</script>
<template>
  <Flex vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :size="size" />
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :size="size" type="card" />
  </Flex>
</template>
```

:::

## 自定义位置

<Flex vertical>
  <Radio :options="positionOptions" v-model:value="position" button button-style="solid" />
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :tab-position="position" />
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :tab-position="position" type="card" />
</Flex>

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
const positionOptions = ref([
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
])
const position = ref('top')
</script>
<template>
  <Flex vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :size="size" />
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" :size="size" type="card" />
  </Flex>
</template>
```

:::

## 左右滑动，容纳更多标签

<Flex vertical>
  <Radio :options="positionOptions" v-model:value="morePosition" button button-style="solid" />
  <Tabs
    :style="positionStyle"
    :tab-pages="moreTabPages"
    v-model:active-key="moreActiveKey"
    :tab-position="morePosition"
  />
  <Tabs
    :style="positionStyle"
    :tab-pages="moreTabPages"
    v-model:active-key="moreActiveKey"
    :tab-position="morePosition"
    type="card"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
const moreTabPages = ref([
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
  },
  {
    key: '7',
    tab: 'Tab 7',
    content: 'Content of Tab Pane 7'
  },
  {
    key: '8',
    tab: 'Tab 8',
    content: 'Content of Tab Pane 8'
  }
])
const moreActiveKey = ref('1')
const positionOptions = ref([
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
])
const morePosition = ref('top')
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
watchEffect(() => {
  console.log('moreActiveKey:', moreActiveKey.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="positionOptions" v-model:value="morePosition" button button-style="solid" />
    <Tabs
      :style="positionStyle"
      :tab-pages="moreTabPages"
      v-model:active-key="moreActiveKey"
      :tab-position="morePosition"
    />
    <Tabs
      :style="positionStyle"
      :tab-pages="moreTabPages"
      v-model:active-key="moreActiveKey"
      :tab-position="morePosition"
      type="card"
    />
  </Flex>
</template>
```

:::

## 自定义 Tab & Content 样式

<Flex vertical>
  <Tabs
    :tab-pages="tabPages"
    v-model:active-key="activeKey"
    :tab-gutter="24"
    :tab-style="{
      background: '#fff7e6',
      fontSize: '16px',
      color: '#ff6900',
      fontWeight: 600
    }"
    :content-style="{
      fontSize: '16px'
    }"
  />
  <Tabs
    :tab-pages="tabPages"
    v-model:active-key="activeKey"
    type="card"
    size="large"
    :tab-gutter="12"
    :tab-style="{
      background: '#fff7e6',
      fontSize: '16px',
      color: '#ff6900',
      fontWeight: 600
    }"
    :content-style="{
      fontSize: '16px'
    }"
  />
</Flex>

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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Tabs
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      :tab-gutter="24"
      :tab-style="{
        background: '#fff7e6',
        fontSize: '16px',
        color: '#ff6900',
        fontWeight: 600
      }"
      :content-style="{
        fontSize: '16px'
      }"
    />
    <Tabs
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      type="card"
      size="large"
      :tab-gutter="12"
      :tab-style="{
        background: '#fff7e6',
        fontSize: '16px',
        color: '#ff6900',
        fontWeight: 600
      }"
      :content-style="{
        fontSize: '16px'
      }"
    />
  </Flex>
</template>
```

:::

## 自定义内容

<Tabs :tab-pages="tabPages" v-model:active-key="activeKey">
  <template #content="{ key, content }">
    <p v-if="key === '1'">key: 1 的 slot 内容</p>
    <p v-if="key === '2'">key: 2 的 slot 内容</p>
    <p v-if="key === '3'">key: 3 的 slot 内容</p>
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
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs :tab-pages="tabPages" v-model:active-key="activeKey">
    <template #content="{ key, content }">
      <p v-if="key === '1'">key: 1 的 slot 内容</p>
      <p v-if="key === '2'">key: 2 的 slot 内容</p>
      <p v-if="key === '3'">key: 3 的 slot 内容</p>
    </template>
  </Tabs>
</template>
```

:::

## APIs

### Tabs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
tabPages | 标签页数组 | [Tab](#tab-type)[] | []
prefix | 标签页前缀 | string &#124; slot | undefined
suffix | 标签页后缀 | string &#124; slot | undefined
animated | 是否启用切换动画，在 `tabPosition: 'top' \| 'bottom'` 时有效 | boolean | true
centered | 标签是否居中展示 | boolean | false
size | 标签页大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
type | 标签页的类型 |'line' &#124; 'card' | 'line'
tabGutter | 页签之前的间隙大小，单位 `px` | number | undefined
tabStyle | 自定义页签样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
tabPosition | 自定义页签位置 | 'top' &#124; 'right' &#124; 'bottom' &#124; 'left' | 'top'
contentStyle | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
activeKey <Tag color="cyan">v-model</Tag> | 当前激活 `tab` 面板的 `key` | string &#124; number | undefined

### Tab Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
key? | 对应 `activeKey`，如果没有传入 `key` 属性，则默认使用数据索引 `(0,1,2...)` 绑定 | string &#124; number | undefined
tab? | 页签显示文字 | string | undefined
icon? | 页签图标 | VNode | undefined
content? | 标签页内容 | string &#124; slot | undefined
disabled? | 是否禁用页签 | boolean | false

## Events

名称 | 说明 | 类型
-- | -- | --
change | 切换面板的回调 | (key: string &#124; number) => void
