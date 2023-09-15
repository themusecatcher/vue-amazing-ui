# 单选框 Radio<BackTop />

## 何时使用

- 用于在多个备选项中选中单个状态
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多

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
const value = ref(1)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>

## 基本使用

<Radio :options="options" v-model:value="value" />

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
const value = ref(1)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Radio :options="options" v-model:value="value" />
</template>
```

:::

## 禁用

<Radio :options="options" @change="onChange" v-model:value="value" disabled />

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
const value = ref(1)
</script>
<template>
  <Radio :options="options" v-model:value="value" disabled />
</template>
```

:::

## 禁用选项

<Radio :options="optionsDisabled" v-model:value="value" />

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

const value = ref(1)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Radio :options="optionsDisabled" v-model:value="value" />
</template>
```

:::

## 垂直排列

<Radio vertical :options="options" v-model:value="value" />

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
const value = ref(1)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Radio vertical :options="options" v-model:value="value" />
</template>
```

:::

## 自定义间距

<Radio :gap="24" :options="options" v-model:value="value" />

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
const value = ref(1)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Radio :gap="24" :options="options" v-model:value="value" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
options | 单选元素数据 | Option[] | [] | true
disabled | 是否禁用 | boolean | false | false
vertical | 是否垂直排列 | boolean | false | false
value <Tag color="cyan">v-model</Tag> | 当前选中的值 | any | null | false
gap | 多个单选框之间的间距，单位px，垂直排列时，间距即垂直间距 | number | 8 | false

## Option Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
label | 选项名 | string | true
value | 选项值 | any | true
disabled | 是否禁用单个单选器 | boolean | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 选项变化时的回调函数 | (value: any) => void
