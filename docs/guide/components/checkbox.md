# 复选框 Checkbox

<GlobalElement />

*复选框*

## 何时使用

- 在一组可选项中进行多项选择时
- 单独使用可以表示两种状态之间的切换，和 `Switch` 类似

<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
const options = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const optionsDisabled = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2,
    disabled: true
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const checked = ref(false)
const value = ref([2])
watchEffect(() => {
  console.log('checked', checked.value)
})
watchEffect(() => {
  console.log('value', value.value)
})
function onChange(value: boolean | (string | number)[]) {
  console.log('change', value)
}
const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => {
  // 全选样式控制
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
})
watch(checkAll, (to) => {
  console.log('checkAll', to)
  if (to) {
    value.value = options.value.map((option) => option.value)
  } else {
    value.value = []
  }
})
const horizontalGap = ref(16)
const verticalGap = ref(8)
</script>

## 基本使用

<Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const checked = ref(false)
watchEffect(() => {
  console.log('checked', checked.value)
})
function onChange(value: boolean) {
  console.log('change', value)
}
</script>
<template>
  <Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>
</template>
```

:::

## 选项列表

<Checkbox :options="options" v-model:value="value" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const value = ref([2])
watchEffect(() => {
  console.log('value', value.value)
})
function onChange(value: (string | number)[]) {
  console.log('change', value)
}
</script>
<template>
  <Checkbox :options="options" v-model:value="value" @change="onChange" />
</template>
```

:::

## 禁用

<Checkbox :options="options" v-model:value="value" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const options = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const value = ref([2])
</script>
<template>
  <Checkbox :options="options" v-model:value="value" disabled />
</template>
```

:::

## 禁用选项

<Checkbox :options="optionsDisabled" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const optionsDisabled = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2,
    disabled: true
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const value = ref([2])
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Checkbox :options="optionsDisabled" v-model:value="value" />
</template>
```

:::

## 全选

<Space vertical>
  <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll">Check All</Checkbox>
  <Checkbox :options="options" v-model:value="value" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
const options = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const value = ref([2])
watchEffect(() => {
  console.log('value', value.value)
})
const checkAll = ref(false)
const indeterminate = computed(() => { // 全选样式控制
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
})
watch(checkAll, (to) => {
  console.log('checkAll', to)
  if (to) {
    value.value = options.value.map(option => option.value)
  } else {
    value.value = []
  }
})
</script>
<template>
  <Space vertical>
    <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll">Check All</Checkbox>
    <Checkbox :options="options" v-model:value="value" />
  </Space>
</template>
```

:::

## 垂直排列

<Checkbox :options="options" vertical v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const value = ref([2])
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Checkbox :options="options" vertical v-model:value="value" />
</template>
```

:::

## 自定义间距

<Flex vertical>
  <Row :gutter="24">
    <Col :span="12">
      <Flex gap="small" vertical>
        horizontal gap: <Slider v-model:value="horizontalGap" />
      </Flex>
    </Col>
    <Col :span="12">
      <Flex gap="small" vertical>
        vertical gap: <Slider v-model:value="verticalGap" />
      </Flex>
    </Col>
  </Row>
  <Checkbox :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const value = ref([2])
watchEffect(() => {
  console.log('value', value.value)
})
const horizontalGap = ref(16)
const verticalGap = ref(8)
</script>
<template>
  <Flex vertical>
    <Row :gutter="24">
      <Col :span="12">
        <Flex gap="small" vertical>
          horizontal gap: <Slider v-model:value="horizontalGap" />
        </Flex>
      </Col>
      <Col :span="12">
        <Flex gap="small" vertical>
          vertical gap: <Slider v-model:value="verticalGap" />
        </Flex>
      </Col>
    </Row>
    <Checkbox :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
  </Flex>
</template>
```

:::

## APIs

### Checkbox

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
options | 复选框选项数据 | [Option](#option-type)[] | []
disabled | 是否禁用 | boolean | false
vertical | 是否垂直排列 | boolean | false
value <Tag color="cyan">v-model</Tag> | 当前选中的值，配合 `options` 使用 | (string &#124; number)[] | []
gap | 多个复选框之间的间距；垂直排列时为垂直间距，单位 `px`；数组间距用于水平排列折行时：`[水平间距, 垂直间距]` | number | 8
indeterminate | 全选时的样式控制 | boolean | false
checked <Tag color="cyan">v-model</Tag> | 当前是否选中 | boolean | false

### Option Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
label | 选项名 | string | undefined
value | 选项值 | string &#124; number | undefined
disabled? | 是否禁用选项 | boolean | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
change | 变化时回调函数 | (value: boolean \| (string \| number)[]) => void
