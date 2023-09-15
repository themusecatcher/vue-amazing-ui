# 选择器 Select<BackTop />

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const optionsDisabled = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2,
        disabled: true
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const optionsCustom = ref([
      {
        name: '北京市',
        id: 1
      },
      {
        name: '上海市',
        id: 2
      },
      {
        name: '纽约市',
        id: 3
      },
      {
        name: '旧金山',
        id: 4
      },
      {
        name: '布宜诺斯艾利斯',
        id: 5
      },
      {
        name: '伊斯坦布尔',
        id: 6
      },
      {
        name: '拜占庭',
        id: 7
      },
      {
        name: '君士坦丁堡',
        id: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (value: string|number, label: string,  index: number) {
  console.log('value:', value)
  console.log('label:', label)
  console.log('index:', index)
}
// 自定义过滤函数，但选项的 value 值大于 输入项时返回 true
function filter (inputValue: string, option: any) {
  return option.value > inputValue
}
</script>

## 基本使用

<Select :options="options" v-model="selectedValue" />

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
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
</script>
<template>
  <Select :options="options" v-model="selectedValue" />
</template>
```

:::

## 禁用

<Select :options="options" v-model="selectedValue" disabled />

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
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
</script>
<template>
  <Select :options="options" v-model="selectedValue" disabled />
</template>
```

:::

## 禁用选项

<Select :options="optionsDisabled" v-model="selectedValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const optionsDisabled = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2,
        disabled: true
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
</script>
<template>
  <Select :options="optionsDisabled" v-model="selectedValue" />
</template>
```

:::

## 支持清除

<Select
  :options="options"
  allow-clear
  v-model="selectedValue"
  @change="onChange" />

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
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (value: string|number, label: string,  index: number) {
  console.log('value:', value)
  console.log('label:', label)
  console.log('index:', index)
}
</script>
<template>
  <Select
    :options="options"
    allow-clear
    v-model="selectedValue"
    @change="onChange" />
</template>
```

:::

## 支持搜索

<Select :options="options" search v-model="selectedValue" />

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
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
</script>
<template>
  <Select :options="options" search v-model="selectedValue" />
</template>
```

:::

## 自定义搜索过滤函数

<Select
  :options="options"
  search
  :filter="filter"
  v-model="selectedValue" />

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
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
// 自定义过滤函数，但选项的 value 值大于 输入项时返回 true
function filter (inputValue: string, option: any) {
  return option.value > inputValue
}
</script>
<template>
  <Select
    :options="options"
    search
    :filter="filter"
    v-model="selectedValue" />
</template>
```

:::

## 自定义样式

<Select
  :width="160"
  :height="36"
  :options="options"
  v-model="selectedValue" />

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
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
</script>
<template>
  <Select
    :width="160"
    :height="36"
    :options="options"
    v-model="selectedValue" />
</template>
```

:::

## 自定义节点 `label`、`value` 字段名

<Select
  :options="optionsCustom"
  label="name"
  value="id"
  v-model="selectedValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const optionsCustom = ref([
      {
        name: '北京市',
        id: 1
      },
      {
        name: '上海市',
        id: 2
      },
      {
        name: '纽约市',
        id: 3
      },
      {
        name: '旧金山',
        id: 4
      },
      {
        name: '布宜诺斯艾利斯',
        id: 5
      },
      {
        name: '伊斯坦布尔',
        id: 6
      },
      {
        name: '拜占庭',
        id: 7
      },
      {
        name: '君士坦丁堡',
        id: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
</script>
<template>
  <Select
    :options="optionsCustom"
    label="name"
    value="id"
    v-model="selectedValue" />
</template>
```

:::

## 自定义下拉面板展示数

<Select
  :options="options"
  :max-display="8"
  v-model="selectedValue" />

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
        label: '上海市',
        value: 2
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
</script>
<template>
  <Select
    :options="options"
    :max-display="8"
    v-model="selectedValue" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
options | 选项数据 | Option[] | [] | false
label | 选项的 `label` 文本字段名 | string | 'label' | false
value | 选项的 `value` 值字段名 | string | 'value' | false
placeholder | 选择框默认文字 | string | '请选择' | false
disabled | 是否禁用 | boolean | false | false
allowClear | 是否支持清除 | boolean | false | false
search | 是否支持搜索 | boolean | false | false
filter | 过滤条件函数，仅当支持搜索时生效，根据输入项进行筛选：<li>默认为 `true` 时，筛选每个选项的文本字段 `label` 是否包含输入项，包含返回 `true`，反之返回 `false`</li><li>当其为函数 `Function` 时，接受 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`</li> | Function &#124; true | true | false
width | 宽度，单位px | number | 120 | false
height | 高度，单位px | number | 32 | false
maxDisplay | 下拉面板最多能展示的下拉项数，超过后滚动显示 | number | 6 | false
modelValue <Tag color="cyan">v-model</Tag> | 当前选中的 `option` 条目 | number &#124; string &#124; null | null | false

## Option Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
label | 选项名 | string | false
value | 选项值 | string &#124; number | false
disabled | 是否禁用选项 | boolean | false
[propName: string] | 添加一个字符串索引签名，用于包含带有任意数量的其他属性 | any | -

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 选项值改变后的回调 | (value: string &#124; number, label: string,  index: number) => void
