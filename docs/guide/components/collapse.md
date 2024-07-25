# 折叠面板 Collapse

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*可以折叠/展开的内容区域*

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const nestCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const arrowCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    showArrow: false,
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
const nestActiveKey = ref(['1'])
const arrowPlacement = ref('left')
const positionOptions = ref([
  {
    label: 'Left',
    value: 'left'
  },
  {
    label: 'Right',
    value: 'right'
  }
])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
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
</script>

## 基本使用

*activeKey 传入 `number[]` | `string[]`，所有面板可同时展开*

<br/>

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
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
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
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

## 面板嵌套

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey">
  <template #text="{ key }">
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
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const nestCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
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
    <template #text="{ key }">
      <Collapse v-if="key === '1'" :collapse-data="nestCollapseData" v-model:active-key="nestActiveKey" />
    </template>
  </Collapse>
</template>
```

:::

## 无边框

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey" :bordered="false" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
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

<Collapse copyable lang="template" :collapse-data="collapseData" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
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

## 自定义内容

*自定义 `header、lang、text` 内容和样式*

<br/>

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey">
  <template #header="{ header, key }">
    <span v-if="key==='1'" style="color: burlywood;">burlywood color: {{ header }} (key = {{ key }})</span>
  </template>
  <template #lang>typescript</template>
  <template #text="{ text, key }">
    <span v-if="key==='1'" style="color: burlywood;">burlywood color: {{ text }} (key = {{ key }})</span>
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
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Collapse :collapse-data="collapseData" v-model:active-key="activeKey">
    <template #header="{ header, key }">
      <span v-if="key==='1'" style="color: burlywood;">burlywood color {{ header }} (key = {{ key }})</span>
    </template>
    <template #lang>typescript</template>
    <template #text="{ text, key }">
      <span v-if="key==='1'" style="color: burlywood;">burlywood color {{ text }} (key = {{ key }})</span>
    </template>
  </Collapse>
</template>
```

:::

## 隐藏箭头

<Collapse :collapse-data="arrowCollapseData" v-model:active-key="activeKey" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const arrowCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    showArrow: false,
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
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

<Radio :options="positionOptions" v-model:value="arrowPlacement" button />
<br />
<br />
<Collapse :collapse-data="collapseData" v-model:active-key="activeKey" :arrow-placement="arrowPlacement" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const positionOptions = ref([
  {
    label: 'Left',
    value: 'left'
  },
  {
    label: 'Right',
    value: 'right'
  }
])
const arrowPlacement = ref('left')
const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Radio :options="positionOptions" v-model:value="arrowPlacement" button />
  <br />
  <br />
  <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" :arrow-placement="arrowPlacement" />
</template>
```

:::

## 幽灵折叠面板

<Collapse :collapse-data="collapseData" v-model:active-key="activeKey" ghost />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
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

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
collapseData | 折叠面板数据，可使用 `v-slot` 替换对应索引的 `header` 和 `text` | [Collapse](#collapse-type)[] | [] | true
activeKey <Tag color="cyan">v-model</Tag> | 当前激活 `tab` 面板的 `key` | number[] &#124; number &#124; string[] &#124; string &#124; null | null | false
bordered | 带边框风格的折叠面板 | boolean | true | false
copyable | 是否可复制面板内容 | boolean | false | false
lang | 面板右上角固定内容，例如标识 `language` | string &#124; slot | '' | false
fontSize | 面板标题和内容的字体大小，单位 `px` | number | 14 | false
headerFontSize | 面板标题字体大小，单位 `px`，优先级高于 `fontSize` | number | 0 | false
textFontSize | 面板内容字体大小，单位 `px`，优先级高于 `fontSize` | number | 0 | false
showArrow | 是否展示所有箭头，优先级低于 `Collapse` 的 `showArrow` | boolean | true | false
arrowPlacement | 箭头位置 | 'left' &#124; 'right' | 'left' | false
ghost | 使折叠面板透明且无边框 | boolean | false | false

### Collapse Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
key | 对应 `activeKey`，如果没有传入 `key` 属性，则默认使用数据索引 (`0,1,2...`) 绑定 | string &#124; number | false
header | 面板标题 | string &#124; slot | false
text | 面板内容 | string &#124; slot | false
showArrow | 是否展示箭头 | boolean |false

## Events

名称 | 说明 | 类型
-- | -- | --
change | 切换面板的回调 | (key: number &#124; string) => void
