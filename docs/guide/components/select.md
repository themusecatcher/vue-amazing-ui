# 选择器 Select

<GlobalElement />

*下拉选择器*

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时
- 当选项少时（少于 `5` 项），建议直接将选项平铺，使用 `Radio` 是更好的选择

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const optionsDisabled = ref<SelectOption[]>([
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
const optionsCustom = ref<SelectOption[]>([
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
const sizeOptions = [
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
]
const size = ref('large')
const selectedValue = ref<SelectProps['modelValue']>(5)
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--select-primary-color-hover': colorPalettes[4],
    '--select-primary-color-focus': colorPalettes[4],
    '--select-primary-shadow-color': primaryShadowColor.value,
    '--select-item-bg-color-active': colorPalettes[0]
  }
  return style
}
function onChange(value: string | number, label: string, index: number) {
  console.log('value', value)
  console.log('label', label)
  console.log('index', index)
}
function onOpenChange(open: boolean) {
  console.log('openChange', open)
}
// 自定义过滤函数，当选项的 value 值大于 输入项时返回 true
function filter(inputValue: string, option: any) {
  return option.value > inputValue
}
</script>

## 基本使用

<Select :options="options" v-model="selectedValue" @change="onChange" @openChange="onOpenChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
function onChange (value: string | number, label: string,  index: number) {
  console.log('value', value)
  console.log('label', label)
  console.log('index', index)
}
function onOpenChange(open: boolean) {
  console.log('openChange', open)
}
</script>
<template>
  <Select :options="options" v-model="selectedValue" @change="onChange" @openChange="onOpenChange" />
</template>
```

:::

## 禁用

<Select :options="options" v-model="selectedValue" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
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
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const optionsDisabled = ref<SelectOption[]>([
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
const selectedValue = ref<SelectProps['modelValue']>(5)
</script>
<template>
  <Select :options="optionsDisabled" v-model="selectedValue" />
</template>
```

:::

## 自定义节点字段名

<Select
  :options="optionsCustom"
  label="name"
  value="id"
  v-model="selectedValue"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const optionsCustom = ref<SelectOption[]>([
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
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select
    :options="optionsCustom"
    label="name"
    value="id"
    v-model="selectedValue"
  />
</template>
```

:::

## 自定义样式

<Select
  :width="150"
  :height="36"
  :options="options"
  v-model="selectedValue"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select
    :width="150"
    :height="36"
    :options="options"
    v-model="selectedValue"
  />
</template>
```

:::

## 三种尺寸

<Space vertical >
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Select :options="options" v-model="selectedValue" :size="size" />
  <Select :options="options" search allowClear v-model="selectedValue" :size="size" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const sizeOptions = [
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
]
const size = ref('large')
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Space vertical >
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Select :options="options" v-model="selectedValue" :size="size" />
    <Select :options="options" search allowClear v-model="selectedValue" :size="size" />
  </Space>
</template>
```

:::

## 支持清除

<Select :options="options" allow-clear v-model="selectedValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :options="options" allow-clear v-model="selectedValue" />
</template>
```

:::

## 支持搜索

<Select :options="options" allow-clear search v-model="selectedValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :options="options" allow-clear search v-model="selectedValue" />
</template>
```

:::

## 自定义搜索过滤函数

<Select :options="options" search :filter="filter" v-model="selectedValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
// 自定义过滤函数，当选项的 value 值大于 输入项时返回 true
function filter (inputValue: string, option: any) {
  return option.value > inputValue
}
</script>
<template>
  <Select :options="options" search :filter="filter" v-model="selectedValue" />
</template>
```

:::

## 自定义下拉面板数

<Select :options="options" :max-display="5" v-model="selectedValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :options="options" :max-display="5" v-model="selectedValue" />
</template>
```

:::

## 自定义下拉面板滚动条

<Select :options="options" v-model="selectedValue" :scrollbar-props="{ size: 8, delay: 2000 }" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :options="options" v-model="selectedValue" :scrollbar-props="{ size: 8, delay: 2000 }" />
</template>
```

:::

## 自定义主题色

<Space vertical>
  <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
  <Space align="center">
    primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
  </Space>
  <Select :style="getThemeStyle(primaryColor)" search :options="options" v-model="selectedValue" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const options = ref<SelectOption[]>([
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
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const selectedValue = ref<SelectProps['modelValue']>(5)
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--select-primary-color-hover': colorPalettes[4],
    '--select-primary-color-focus': colorPalettes[4],
    '--select-primary-shadow-color': primaryShadowColor.value,
    '--select-item-bg-color-active': colorPalettes[0]
  }
  return style
}
</script>
<template>
  <Space vertical>
    <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
    <Space align="center">
      primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
    </Space>
    <Select :style="getThemeStyle(primaryColor)" search :options="options" v-model="selectedValue" />
  </Space>
</template>
```

:::

## APIs

### Select

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
options | 选项数据 | [Option](#option-type)[] | []
label | 选项的 `label` 文本字段名 | string | 'label'
value | 选项的 `value` 值字段名 | string | 'value'
placeholder | 默认占位文本 | string | '请选择'
disabled | 是否禁用 | boolean | false
width | 选择器宽度，单位 `px` | string &#124; number | 'auto'
height | 选择器高度，单位 `px` | number | undefined
size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
allowClear | 是否支持清除 | boolean | false
search | 是否支持搜索 | boolean | false
filter | 过滤条件函数，仅当支持搜索时生效，根据输入项进行筛选：<li>默认为 `true` 时，筛选每个选项的文本字段 `label` 是否包含输入项，包含时返回 `true`，反之返回 `false`</li><li>当其为函数 `Function` 时，接受 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`</li> | Function &#124; true | true
scrollbarProps | 下拉面板滚动条 `scrollbar` 组件属性配置，参考 [Scrollbar Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar) | object | {}
maxDisplay | 下拉面板最多能展示的下拉项数，超过后滚动显示 | number | 6
modelValue <Tag color="cyan">v-model</Tag> | 当前选中的 `option` 条目值 | number &#124; string | undefined

### Option Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
label? | 选项名 | string | undefined
value? | 选项值 | string &#124; number | undefined
disabled? | 是否禁用选项 | boolean | false
[propName: string] | 用于包含带有任意数量的其他属性 | any | undefined

## Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 选项值改变后的回调 | (value: string &#124; number, label: string,  index: number) => void
openChange | 下拉菜单展开收起的回调 | (open: boolean) => void
