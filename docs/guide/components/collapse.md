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
const accordionActiveKey = ref<CollapseProps['activeKey']>('1')
const borderlessActiveKey = ref<CollapseProps['activeKey']>(['1'])
const disabledActiveKey = ref<CollapseProps['activeKey']>(['1'])
const disabledItemActiveKey = ref<CollapseProps['activeKey']>(['1'])
const ghostActiveKey = ref<CollapseProps['activeKey']>(['1'])
const nestOuterActiveKey = ref<CollapseProps['activeKey']>(['1'])
const nestInnerActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customStyleActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customArrowActiveKey1 = ref<CollapseProps['activeKey']>(['1'])
const customArrowActiveKey2 = ref<CollapseProps['activeKey']>(['1'])
const hideArrowActiveKey = ref<CollapseProps['activeKey']>(['1'])
const arrowPlaceActiveKey = ref<CollapseProps['activeKey']>(['1'])
const arrowPlacement = ref<CollapseProps['arrowPlacement']>('right')
const extraActiveKey = ref<CollapseProps['activeKey']>(['1'])
const copyableActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customCopyActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
watchEffect(() => {
  console.log('accordionActiveKey', accordionActiveKey.value)
})
watchEffect(() => {
  console.log('borderlessActiveKey', borderlessActiveKey.value)
})
watchEffect(() => {
  console.log('disabledItemActiveKey', disabledItemActiveKey.value)
})
watchEffect(() => {
  console.log('ghostActiveKey', ghostActiveKey.value)
})
watchEffect(() => {
  console.log('nestOuterActiveKey', nestOuterActiveKey.value)
})
watchEffect(() => {
  console.log('nestInnerActiveKey', nestInnerActiveKey.value)
})
watchEffect(() => {
  console.log('customActiveKey', customActiveKey.value)
})
watchEffect(() => {
  console.log('customStyleActiveKey', customStyleActiveKey.value)
})
watchEffect(() => {
  console.log('customArrowActiveKey1', customArrowActiveKey1.value)
})
watchEffect(() => {
  console.log('customArrowActiveKey2', customArrowActiveKey2.value)
})
watchEffect(() => {
  console.log('hideArrowActiveKey', hideArrowActiveKey.value)
})
watchEffect(() => {
  console.log('arrowPlaceActiveKey', arrowPlaceActiveKey.value)
})
watchEffect(() => {
  console.log('arrowPlacement', arrowPlacement.value)
})
watchEffect(() => {
  console.log('extraActiveKey', extraActiveKey.value)
})
watchEffect(() => {
  console.log('copyableActiveKey', copyableActiveKey.value)
})
watchEffect(() => {
  console.log('customCopyActiveKey', customCopyActiveKey.value)
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

<Collapse :items="collapseItems" v-model:active-key="accordionActiveKey" />

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
const accordionActiveKey = ref<CollapseProps['activeKey']>('1')
watchEffect(() => {
  console.log('accordionActiveKey', accordionActiveKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="accordionActiveKey" />
</template>
```

:::

## 无边框

<Collapse :items="collapseItems" v-model:active-key="borderlessActiveKey" :bordered="false" />

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
const borderlessActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('borderlessActiveKey', borderlessActiveKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="borderlessActiveKey" :bordered="false" />
</template>
```

:::

## 禁用

<Flex vertical>
  <Collapse disabled :items="collapseItems" v-model:active-key="disabledActiveKey" />
  <Collapse :items="disabledCollapseItems" v-model:active-key="disabledItemActiveKey" />
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
const disabledActiveKey = ref<CollapseProps['activeKey']>(['1'])
const disabledItemActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('disabledActiveKey', disabledActiveKey.value)
})
watchEffect(() => {
  console.log('disabledItemActiveKey', disabledItemActiveKey.value)
})
</script>
<template>
  <Flex vertical>
    <Collapse disabled :items="collapseItems" v-model:active-key="disabledActiveKey" />
    <Collapse :items="disabledCollapseItems" v-model:active-key="disabledItemActiveKey" />
  </Flex>
</template>
```

:::

## 幽灵折叠面板

<Collapse :items="collapseItems" v-model:active-key="ghostActiveKey" ghost />

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
const ghostActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('ghostActiveKey', ghostActiveKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="ghostActiveKey" ghost />
</template>
```

:::

## 面板嵌套

<Collapse :items="collapseItems" v-model:active-key="nestOuterActiveKey">
  <template #content="{ key }">
    <Collapse v-if="key === '1'" :items="nestCollapseItems" v-model:active-key="nestInnerActiveKey" />
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
const nestOuterActiveKey = ref<CollapseProps['activeKey']>(['1'])
const nestInnerActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('nestOuterActiveKey', nestOuterActiveKey.value)
})
watchEffect(() => {
  console.log('nestInnerActiveKey', nestInnerActiveKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="nestOuterActiveKey">
    <template #content="{ key }">
      <Collapse v-if="key === '1'" :items="nestCollapseItems" v-model:active-key="nestInnerActiveKey" />
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
  v-model:active-key="customActiveKey"
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
const customActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('customActiveKey', customActiveKey.value)
})
</script>
<template>
  <Collapse
    style="background-color: #fff"
    :items="collapseItems"
    v-model:active-key="customActiveKey"
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
  v-model:active-key="customStyleActiveKey"
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
const customStyleActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('customStyleActiveKey', customStyleActiveKey.value)
})
</script>
<template>
  <Collapse
    :items="customStyleItems"
    v-model:active-key="customStyleActiveKey"
    :header-style="{ fontSize: '16px', color: '#ff6900' }"
    :content-style="{ padding: '16px 24px', color: '#09c8ce' }"
    :arrow-style="{ fontSize: '14px', height: '25px' }"
  />
</template>
```

:::

## 自定义箭头

<Flex vertical>
  <Collapse
    :items="customArrowItems"
    :arrow-style="{ color: '#ff6900' }"
    v-model:active-key="customArrowActiveKey1"
  />
  <Collapse
    :items="customArrowItems"
    :arrow-style="{ color: '#ff6900' }"
    v-model:active-key="customArrowActiveKey2"
  >
    <template #arrow="{ key, active }">
      <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
      <RightCircleFilled v-if="key === '3'" :rotate="active ? 90 : 0" />
    </template>
  </Collapse>
</Flex>

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
const customArrowActiveKey1 = ref<CollapseProps['activeKey']>(['1'])
const customArrowActiveKey2 = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('customArrowActiveKey1', customArrowActiveKey1.value)
})
watchEffect(() => {
  console.log('customArrowActiveKey2', customArrowActiveKey2.value)
})
</script>
<template>
  <Flex vertical>
    <Collapse
      :items="customArrowItems"
      :arrow-style="{ color: '#ff6900' }"
      v-model:active-key="customArrowActiveKey1"
    />
    <Collapse
      :items="customArrowItems"
      :arrow-style="{ color: '#ff6900' }"
      v-model:active-key="customArrowActiveKey2"
    >
      <template #arrow="{ key, active }">
        <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
        <RightCircleFilled v-if="key === '3'" :rotate="active ? 90 : 0" />
      </template>
    </Collapse>
  </Flex>
</template>
```

:::

## 隐藏箭头

<Collapse :items="collapseItems" v-model:active-key="hideArrowActiveKey" :show-arrow="false" />

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
const hideArrowActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('hideArrowActiveKey', hideArrowActiveKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="hideArrowActiveKey" :show-arrow="false" />
</template>
```

:::

## 箭头位置

<Flex vertical>
  <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
  <Collapse :items="collapseItems" v-model:active-key="arrowPlaceActiveKey" :arrow-placement="arrowPlacement" />
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
const arrowPlaceActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('arrowPlaceActiveKey', arrowPlaceActiveKey.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
    <Collapse :items="collapseItems" v-model:active-key="arrowPlaceActiveKey" :arrow-placement="arrowPlacement" />
  </Flex>
</template>
```

:::

## 面板额外内容

<Collapse :items="extraCollapseItems" v-model:active-key="extraActiveKey">
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
const extraActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('extraActiveKey', extraActiveKey.value)
})
function handleClick(key: string | number) {
  console.log('key', key)
}
</script>
<template>
  <Collapse :items="extraCollapseItems" v-model:active-key="extraActiveKey">
    <template #extra="{ key }">
      <StarFilled v-if="key === '1'" @click.stop="handleClick(key)" />
      <StarOutlined v-if="key === '3'" @click.stop="handleClick(key)" />
    </template>
  </Collapse>
</template>
```

:::

## 可复制

<Collapse :items="collapseItems" v-model:active-key="copyableActiveKey" lang="template" copyable />

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
const copyableActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('copyableActiveKey', copyableActiveKey.value)
})
</script>
<template>
  <Collapse :items="collapseItems" v-model:active-key="copyableActiveKey" lang="template" copyable />
</template>
```

:::

## 自定义复制按钮

<Collapse
  :items="collapseItems"
  v-model:active-key="customCopyActiveKey"
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
const customCopyActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('customCopyActiveKey', customCopyActiveKey.value)
})
</script>
<template>
  <Collapse
    :items="collapseItems"
    v-model:active-key="customCopyActiveKey"
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
header? | 面板标题 | string &#124; slot | undefined
headerStyle? | 设置面板标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
content? | 面板内容 | string &#124; slot | undefined
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
