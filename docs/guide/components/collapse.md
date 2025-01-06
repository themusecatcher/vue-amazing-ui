# 折叠面板 Collapse

<GlobalElement />

*可以折叠/展开的内容区域*

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁

<script setup lang="ts">
import { ref, watchEffect, h } from 'vue'
import {
  ArrowRightOutlined,
  DoubleRightOutlined,
  RightCircleFilled,
  StarOutlined,
  StarFilled
} from '@ant-design/icons-vue'
import type { CollapseProps, CollapseItem, RadioOption } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const disabledCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    disabled: true,
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const nestCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const customStyleItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    headerStyle: {
      fontSize: '16px',
      color: '#1677ff'
    },
    contentStyle: {
      padding: '16px 24px',
      color: '#eb2f96'
    },
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const customArrowItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    arrow: h(ArrowRightOutlined),
    arrowStyle: {
      color: '#1677ff'
    },
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const extraCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    extra: 'Extra',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const positionOptions = ref<RadioOption[]>([
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
const nestActiveKey = ref<CollapseProps['activeKey']>(['1'])
const arrowPlacement = ref<CollapseProps['arrowPlacement']>('right')
const key = ref<CollapseProps['activeKey']>('1')
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
watchEffect(() => {
  console.log('nestActiveKey', nestActiveKey.value)
})

watchEffect(() => {
  console.log('key', key.value)
})
function onChange(key: number | string) {
  console.log('change', key)
}
function handleClick(key: string | number) {
  console.log('key', key)
}
</script>

## 基本使用

*`activeKey` 传入 `number[]` | `string[]`，所有面板可同时展开*

<br/>

<Collapse :items="collapseItems" v-model:active-key="activeKey" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
function onChange(key: number | string) {
  console.log('change', key)
}
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="activeKey" @change="onChange" />
</template>
```

:::

## 手风琴

*只允许单个内容区域展开，只需 `activeKey` 传入 `number` | `string` 即可*

<br/>

<Collapse :items="collapseItems" v-model:active-key="key" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const key = ref<CollapseProps['activeKey']>('1')
watchEffect(() => {
  console.log('key', key.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="key" />
</template>
```

:::

## 无边框

<Collapse :items="collapseItems" v-model:active-key="activeKey1" :bordered="false" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="activeKey" :bordered="false" />
</template>
```

:::

## 禁用

<Flex vertical>
  <Collapse disabled :items="collapseItems" v-model:active-key="activeKey2" />
  <Collapse :items="disabledCollapseItems" v-model:active-key="activeKey2" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const disabledCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    disabled: true,
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Collapse disabled :items="collapseItems" v-model:active-key="activeKey" />
    <Collapse :items="disabledCollapseItems" v-model:active-key="activeKey" />
  </Flex>
</template>
```

:::

## 幽灵折叠面板

<Collapse :items="collapseItems" v-model:active-key="activeKey3" ghost />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="activeKey" ghost />
</template>
```

:::

## 面板嵌套

<Collapse :items="collapseItems" v-model:active-key="activeKey4">
  <template #content="{ key }">
    <Collapse v-if="key === '1'" :items="nestCollapseItems" v-model:active-key="nestActiveKey" />
  </template>
</Collapse>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const nestCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
const nestActiveKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
watchEffect(() => {
  console.log('nestActiveKey', nestActiveKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="activeKey">
    <template #content="{ key }">
      <Collapse v-if="key === '1'" :items="nestCollapseItems" v-model:active-key="nestActiveKey" />
    </template>
  </Collapse>
</template>
```

:::

## 自定义面板

*自定义各个面板的背景色、圆角、边距*

<br/>

<Collapse
  style="background-color: #fff"
  :items="collapseItems"
  v-model:active-key="activeKey5"
  :bordered="false"
  :collapse-style="{
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    marginBottom: '16px',
    border: 0
  }"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse
    style="background-color: #fff"
    :items="collapseItems"
    v-model:active-key="activeKey"
    :bordered="false"
    :collapse-style="{
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      marginBottom: '16px',
      border: 0
    }"
    />
</template>
```

:::

## 自定义样式

<Collapse
  :items="customStyleItems"
  v-model:active-key="activeKey6"
  :header-style="{ fontSize: '16px', color: '#ff6900' }"
  :content-style="{ padding: '16px 24px', color: '#09c8ce' }"
  :arrow-style="{ fontSize: '14px', height: '25px' }"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const customStyleItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    headerStyle: {
      fontSize: '16px',
      color: '#1677ff'
    },
    contentStyle: {
      padding: '16px 24px',
      color: '#eb2f96'
    },
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse
    :items="collapseItems"
    v-model:active-key="activeKey"
    :arrow-style="{ fontSize: '14px', height: '25px' }"
    :header-style="{ fontSize: '16px', color: '#ff6900' }"
    :content-style="{ padding: '16px 24px', color: 'rgba(0, 0, 0, 0.65)' }"
  />
</template>
```

:::

## 自定义箭头

<Collapse :items="customArrowItems" :arrow-style="{ color: '#ff6900' }" v-model:active-key="activeKey7">
  <template #arrow="{ key, active }">
    <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
    <RightCircleFilled v-if="key === '3'" :rotate="active ? 90 : 0" />
  </template>
</Collapse>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect, h } from 'vue'
import {
  ArrowRightOutlined,
  DoubleRightOutlined,
  RightCircleFilled
} from '@ant-design/icons-vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const customArrowItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    arrow: h(ArrowRightOutlined),
    arrowStyle: {
      color: '#1677ff'
    },
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse :items="customArrowItems" :arrow-style="{ color: '#ff6900' }" v-model:active-key="activeKey">
    <template #arrow="{ key, active }">
      <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
      <RightCircleFilled v-if="key === '3'" :rotate="active ? 90 : 0" />
    </template>
  </Collapse>
</template>
```

:::

## 隐藏箭头

<Collapse :items="collapseItems" v-model:active-key="activeKey8" :show-arrow="false" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="activeKey" :show-arrow="false" />
</template>
```

:::

## 箭头位置

<Flex vertical>
  <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
  <Collapse :items="collapseItems" v-model:active-key="activeKey9" :arrow-placement="arrowPlacement" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem, RadioOption } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const positionOptions = ref<RadioOption[]>([
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const arrowPlacement = ref<CollapseProps['arrowPlacement']>('right')
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
    <Collapse :items="collapseItems" v-model:active-key="activeKey" :arrow-placement="arrowPlacement" />
  </Flex>
</template>
```

:::

## 面板额外内容

<Collapse :items="extraCollapseItems" v-model:active-key="activeKey10">
  <template #extra="{ key }">
    <StarFilled v-if="key === '1'" @click.stop="handleClick(key)" />
    <StarOutlined v-if="key === '3'" @click.stop="handleClick(key)" />
  </template>
</Collapse>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { StarOutlined, StarFilled } from '@ant-design/icons-vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const extraCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    extra: 'Extra',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
function handleClick(event: Event, key: string | number) {
  event.stopPropagation() // 阻止事件冒泡
  console.log('event', event)
  console.log('key', key)
}
</script>
<template>
  <Collapse :items="extraCollapseItems" v-model:active-key="activeKey">
    <template #extra="{ key }">
      <StarFilled v-if="key === '1'" @click.stop="handleClick(key)" />
      <StarOutlined v-if="key === '3'" @click.stop="handleClick(key)" />
    </template>
  </Collapse>
</template>
```

:::

## 可复制

<Collapse :items="collapseItems" v-model:active-key="activeKey11" lang="template" copyable />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="activeKey" lang="template" copyable />
</template>
```

:::

## 自定义复制按钮

<Collapse
  :items="collapseItems"
  v-model:active-key="activeKey12"
  lang="javascript"
  copyable
  copy-text="复制"
  copied-text="已复制"
  :copy-props="{
    ghost: true
  }"
>
  <template #lang="{ key }">
    <span v-if="key === '2'">typescript</span>
  </template>
</Collapse>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CollapseProps, CollapseItem } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
</script>
<template>
  <Collapse
    :items="collapseItems"
    v-model:active-key="activeKey"
    lang="javascript"
    copyable
    copy-text="复制"
    copied-text="已复制"
    :copy-props="{
      ghost: true
    }"
  >
    <template #lang="{ key }">
      <span v-if="key === '2'">typescript</span>
    </template>
  </Collapse>
</template>
```

:::

## APIs

### Collapse

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
items | 折叠面板数据 | [Item](#item-type)[] | []
activeKey <Tag color="cyan">v-model</Tag> | 当前激活 `tab` 面板的 `key` | number[] &#124; number &#124; string[] &#124; string &#124; null | null
bordered | 带边框风格的折叠面板 | boolean | true
disabled | 是否禁用展开收起 | boolean | false
ghost | 使折叠面板透明且无边框 | boolean | false
headerStyle | 设置面板标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
contentStyle | 设置面板内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
collapseStyle | 设置面板容器的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
arrow | 自定义箭头切换图标 | VNode &#124; slot | undefined
showArrow | 是否展示箭头 | boolean | true
arrowPlacement | 箭头位置 | 'left' &#124; 'right' | 'left'
arrowStyle | 设置面板箭头的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
extra | 面板标题右侧的额外内容 | string &#124; slot | undefined
lang | 面板右上角固定内容，例如 `language` 标识 | string &#124; slot | undefined
copyable | 是否可复制面板内容 | boolean | false
copyProps | 复制按钮属性配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
copyText | 复制按钮文本 | string | 'Copy'
copiedText | 已复制按钮文本 | string | 'Copied'

### Item Type

<br/>

*以下属性均具有更高优先级*

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
key? | 对应 `activeKey`，如果没有传入 `key` 属性，则默认使用数据索引 (`0,1,2...`) 绑定 | string &#124; number | undefined
disabled? | 是否禁用展开收起 | boolean | undefined
header? | 面板标题 | string &#124; v-slot:header="{ item, header, key, active }" | undefined
headerStyle? | 设置面板标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
content? | 面板内容 | string &#124; v-slot:content="{ item, content, key, active }" | undefined
contentStyle? | 设置面板内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
collapseStyle? | 设置面板容器的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
arrow? | 自定义箭头切换图标 | VNode | undefined
showArrow? | 是否展示箭头 | boolean | undefined
arrowPlacement? | 箭头位置 | 'left' &#124; 'right' | undefined
arrowStyle? | 设置面板箭头的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
extra? | 面板标题右侧的额外内容 | string &#124; slot | undefined
lang? | 面板右上角固定内容，例如标识 `language` | string &#124; slot | undefined
copyable? | 是否可复制面板内容 | boolean | undefined
copyProps? | 复制按钮属性配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | undefined
copyText? | 复制按钮文本 | string | undefined
copiedText? | 已复制按钮文本 | string | undefined

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
header | 自定义面板标题 | v-slot:header="{ item, header, key, active }"
content | 自定义面板内容 | v-slot:content="{ item, content, key, active }"
arrow | 自定义箭头切换图标 | v-slot:arrow="{ item, key, active }"
extra | 自定义面板标题右侧的额外内容 | v-slot:extra="{ item, extra, key, active }"
lang | 自定义面板右上角固定内容 | v-slot:lang="{ item, lang, key, active }"

## Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 切换面板的回调 | (key: number &#124; string) => void
