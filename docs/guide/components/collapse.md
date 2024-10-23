# 折叠面板 Collapse

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="✨ 成为赞助者 !"
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

*可以折叠/展开的内容区域*

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { DoubleRightOutlined, RightCircleFilled, StarOutlined, StarFilled } from '@ant-design/icons-vue'
const collapseData = ref([
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
const disabledCollapseData = ref([
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
const nestCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const extraCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    extra: 'Extra',
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
    extra: 'Extra',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const arrowCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    showArrow: false,
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
const activeKey = ref(['1'])
const activeKey1 = ref(['1'])
const activeKey2 = ref(['1'])
const activeKey3 = ref(['1'])
const activeKey4 = ref(['1'])
const activeKey5 = ref(['1'])
const activeKey6 = ref(['1'])
const activeKey7 = ref(['1'])
const activeKey8 = ref(['1'])
const activeKey9 = ref(['1'])
const activeKey10 = ref(['1'])
const nestActiveKey = ref(['1'])
const positionOptions = ref([
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const arrowPlacement = ref('left')
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey1.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey2.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey3.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey4.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey5.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey6.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey7.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey8.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey9.value)
})
watchEffect(() => {
  console.log('activeKey:', activeKey10.value)
})
watchEffect(() => {
  console.log('nestActiveKey:', nestActiveKey.value)
})
const key = ref('1')
watchEffect(() => {
  console.log('key:', key.value)
})
function onChange(key: number | string) {
  console.log('change:', key)
}
function handleClick(event: Event, key: string | number) {
  event.stopPropagation() // 阻止事件冒泡
  console.log('event', event)
  console.log('key', key)
}
</script>

## 基本使用

*activeKey 传入 `number[]` | `string[]`，所有面板可同时展开*

<br/>

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function onChange(key: number | string) {
  console.log('change:', key)
}
</script>
<template>
  <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" @change="onChange" />
</template>
```

:::

## 手风琴

*只允许单个内容区域展开，只需 `activeKey` 传入 `number` | `string` 即可*

<br/>

<Collapse :collapse-data="collapseData" v-model:active-key="key" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const key = ref('1')
watchEffect(() => {
  console.log('key:', key.value)
})
</script>
<template>
  <Collapse :collapse-data="collapseData" v-model:active-key="key" />
</template>
```

:::

## 禁用

<Flex vertical>
  <Collapse disabled :collapse-data="collapseData" v-model:active-key="activeKey1" />
  <Collapse :collapse-data="disabledCollapseData" v-model:active-key="activeKey1" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const disabledCollapseData = ref([
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Collapse disabled :collapse-data="collapseData" v-model:active-key="activeKey" />
    <Collapse :collapse-data="disabledCollapseData" v-model:active-key="activeKey" />
  </Flex>
</template>
```

:::

## 面板嵌套

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey2">
  <template #content="{ key }">
    <Collapse v-if="key === '1'" :collapse-data="nestCollapseData" v-model:active-key="nestActiveKey" />
  </template>
</Collapse>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const nestCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
const nestActiveKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
watchEffect(() => {
  console.log('nestActiveKey:', nestActiveKey.value)
})
</script>
<template>
  <Collapse :collapse-data="collapseData" v-model:active-key="activeKey">
    <template #content="{ key }">
      <Collapse v-if="key === '1'" :collapse-data="nestCollapseData" v-model:active-key="nestActiveKey" />
    </template>
  </Collapse>
</template>
```

:::

## 无边框

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey3" :bordered="false" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" :bordered="false" />
</template>
```

:::

## 可复制

<Collapse copyable lang="template" :collapse-data="collapseData" v-model:active-key="activeKey4" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Collapse copyable lang="template" :collapse-data="collapseData" v-model:active-key="activeKey" />
</template>
```

:::

## 隐藏箭头

<Collapse :collapse-data="arrowCollapseData" v-model:active-key="activeKey5" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const arrowCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    showArrow: false,
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Collapse :collapse-data="arrowCollapseData" v-model:active-key="activeKey" />
</template>
```

:::

## 箭头位置

<Flex vertical>
  <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
  <Collapse :collapse-data="collapseData" v-model:active-key="activeKey6" :arrow-placement="arrowPlacement" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const positionOptions = ref([
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const arrowPlacement = ref('left')
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
    <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" :arrow-placement="arrowPlacement" />
  </Flex>
</template>
```

:::

## 自定义面板

*自定义各个面板的背景色、圆角、边距和箭头图标*

<Collapse
  :collapse-data="collapseData"
  v-model:active-key="activeKey7"
  :bordered="false"
  :collapse-style="{ backgroundColor: '#fff' }"
  :item-style="{
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    marginBottom: '16px',
    border: 0
  }"
>
  <template #arrow="{ key, active }">
    <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
    <RightCircleFilled v-else :rotate="active ? 90 : 0" />
  </template>
</Collapse>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { DoubleRightOutlined, RightCircleFilled } from '@ant-design/icons-vue'
const collapseData = ref([
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Collapse
    :collapse-data="collapseData"
    v-model:active-key="activeKey"
    :bordered="false"
    :collapse-style="{ backgroundColor: '#fff' }"
    :item-style="{
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      marginBottom: '16px',
      border: 0
    }"
  >
    <template #arrow="{ key, active }">
      <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
      <RightCircleFilled v-else :rotate="active ? 90 : 0" />
    </template>
  </Collapse>
</template>
```

:::

## 自定义面板样式

<Collapse
  :collapse-data="collapseData"
  v-model:active-key="activeKey8"
  :arrow-style="{ fontSize: '14px', height: '25px' }"
  :header-style="{ fontSize: '16px', color: '#ff6900' }"
  :content-style="{ padding: '16px 24px', color: 'rgba(0, 0, 0, 0.65)' }"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Collapse
    :collapse-data="collapseData"
    v-model:active-key="activeKey"
    :arrow-style="{ fontSize: '14px', height: '25px' }"
    :header-style="{ fontSize: '16px', color: '#ff6900' }"
    :content-style="{ padding: '16px 24px', color: 'rgba(0, 0, 0, 0.65)' }"
  />
</template>
```

:::

## 面板额外内容

<Collapse :collapse-data="extraCollapseData" v-model:active-key="activeKey9">
  <template #extra="{ key }">
    <StarFilled @click="handleClick($event, key)" v-if="key === '1'" />
    <StarOutlined @click="handleClick($event, key)" v-if="key === '3'" />
  </template>
</Collapse>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { StarOutlined, StarFilled } from '@ant-design/icons-vue'
const extraCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    extra: 'Extra',
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
    extra: 'Extra',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
function handleClick(event: Event, key: string | number) {
  event.stopPropagation() // 阻止事件冒泡
  console.log('event', event)
  console.log('key', key)
}
</script>
<template>
  <Collapse :collapse-data="extraCollapseData" v-model:active-key="activeKey">
    <template #extra="{ key }">
      <StarFilled @click="handleClick($event, key)" v-if="key === '1'" />
      <StarOutlined @click="handleClick($event, key)" v-if="key === '3'" />
    </template>
  </Collapse>
</template>
```

:::

## 幽灵折叠面板

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey10" ghost />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const collapseData = ref([
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
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" ghost />
</template>
```

:::

## APIs

### Collapse

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
collapseData | 折叠面板数据，可使用 `slot` 替换指定 `key` 的 `header` `content` `arrow` `extra` `lang` | [Collapse](#collapse-type)[] | []
activeKey <Tag color="cyan">v-model</Tag> | 当前激活 `tab` 面板的 `key` | number[] &#124; number &#124; string[] &#124; string &#124; null | null
disabled | 是否禁用，优先级低于 `Collapse` 的 `disabled` | boolean | false
bordered | 带边框风格的折叠面板 | boolean | true
copyable | 是否可复制面板内容 | boolean | false
copyProps | 复制按钮属性配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
lang | 面板右上角固定内容，例如标识 `language` | string &#124; slot | undefined
itemStyle | 设置面板容器的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
headerStyle | 设置面板标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
contentStyle | 设置面板内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
arrow | 自定义箭头切换图标 | slot | undefined
showArrow | 是否展示箭头，优先级低于 `Collapse` 的 `showArrow` | boolean | true
arrowPlacement | 箭头位置 | 'left' &#124; 'right' | 'left'
arrowStyle | 设置面板箭头的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
extra | 面板标题右侧的额外内容 | string &#124; slot | undefined
ghost | 使折叠面板透明且无边框 | boolean | false

### Collapse Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
key | 对应 `activeKey`，如果没有传入 `key` 属性，则默认使用数据索引 (`0,1,2...`) 绑定 | string &#124; number | undefined
header | 面板标题 | string &#124; slot | undefined
content | 面板内容 | string &#124; slot | undefined
disabled | 是否禁用 | boolean | false
showArrow | 是否展示箭头 | boolean | true
extra | 面板标题右侧的额外内容 | string &#124; slot | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
change | 切换面板的回调 | (key: number &#124; string) => void
