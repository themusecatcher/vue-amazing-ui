# 选择器 Select

<GlobalElement />

_下拉选择器_

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时
- 当选项少时（少于 `5` 项），建议直接将选项平铺，使用 `Radio` 是更好的选择

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
const placementOptions = [
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'top',
    value: 'top'
  }
]
const size = ref('large')
const placement = ref('bottom')
// 各分节独立绑定：避免操作一个用例时其余用例同步联动，便于单独核对每个特性
const basicValue = ref<SelectProps['value']>(5)
const disabledValue = ref<SelectProps['value']>(5)
const disabledOptionValue = ref<SelectProps['value']>(5)
const fieldNameValue = ref<SelectProps['value']>(5)
const customStyleValue = ref<SelectProps['value']>(5)
const clearableValue = ref<SelectProps['value']>(5)
const searchableValue = ref<SelectProps['value']>(5)
const filterValue = ref<SelectProps['value']>(5)
const placementValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('basicValue', basicValue.value)
})
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
// 长列表（10 项）的选中项，用于观察面板滚动与「打开时自动滚到选中项」
const optionsLong = ref<SelectOption[]>([
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
    label: '巴黎',
    value: 9
  },
  {
    label: '里约热内卢',
    value: 10
  }
])
const keyboardValue = ref<SelectProps['value']>(5)
const maxDisplayValue = ref<SelectProps['value']>(5)
const scrollbarValue = ref<SelectProps['value']>(5)
const sizeValue = ref<SelectProps['value']>(5)
// 挂载容器：不传 to 时优先挂到最近的承载层内容容器
const toValue = ref<SelectProps['value']>(5)
// 下拉面板样式的公开入口：popupClassName / dropdownMenuStyle
const panelValue = ref<SelectProps['value']>(1)
const panelZIndexValue = ref<SelectProps['value']>(1)
</script>

## 基本使用

<Select :options="options" v-model:value="basicValue" @change="onChange" @openChange="onOpenChange" />

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
  }
])
const selectedValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
function onChange(value: string | number, label: string, index: number) {
  console.log('value', value)
  console.log('label', label)
  console.log('index', index)
}
function onOpenChange(open: boolean) {
  console.log('openChange', open)
}
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" @change="onChange" @openChange="onOpenChange" />
</template>
```

:::

## 禁用

<Select :options="options" v-model:value="disabledValue" disabled />

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
  }
])
const selectedValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" disabled />
</template>
```

:::

## 禁用选项

<Select :options="optionsDisabled" v-model:value="disabledOptionValue" />

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
const selectedValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Select :options="optionsDisabled" v-model:value="selectedValue" />
</template>
```

:::

## 自定义节点字段名

<Select
  :options="optionsCustom"
  :field-names="{ label: 'name', value: 'id' }"
  v-model:value="fieldNameValue"
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
const selectedValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :options="optionsCustom" :field-names="{ label: 'name', value: 'id' }" v-model:value="selectedValue" />
</template>
```

:::

## 自定义样式

<Select
  :width="150"
  :height="36"
  search
  :options="options"
  v-model:value="customStyleValue"
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
  }
])
const selectedValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :width="150" :height="36" search :options="options" v-model:value="selectedValue" />
</template>
```

:::

## 自定义下拉面板

*通过 `popupClassName` 自定义面板类名、`dropdownMenuStyle` 设置面板样式，两者均落在 `Teleport` 后的面板上，需写在全局样式中；`zIndex` 用于覆盖面板层级（默认 1050）*

<Flex gap="large" wrap="wrap">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">默认面板</span>
    <Select :width="180" :options="options" v-model:value="panelValue" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">自定义类名与样式</span>
    <Select
      :width="180"
      :options="options"
      v-model:value="panelValue"
      popup-class-name="custom-select-panel"
      :dropdown-menu-style="{
        background: 'rgba(255, 105, 0, 0.05)',
        border: '1px solid #ff6900',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
      }"
    />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">自定义层级</span>
    <Select :width="180" :options="options" v-model:value="panelZIndexValue" :z-index="1100" />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '布宜诺斯艾利斯', value: 5 },
  { label: '伊斯坦布尔', value: 6 },
  { label: '拜占庭', value: 7 },
  { label: '君士坦丁堡', value: 8 }
])
const panelValue = ref<SelectProps['value']>(1)
const panelZIndexValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Flex gap="large" wrap="wrap">
    <Flex vertical gap="small" align="start">
      <span class="demo-label">默认面板</span>
      <Select :width="180" :options="options" v-model:value="panelValue" />
    </Flex>
    <Flex vertical gap="small" align="start">
      <span class="demo-label">自定义类名与样式</span>
      <Select
        :width="180"
        :options="options"
        v-model:value="panelValue"
        popup-class-name="custom-select-panel"
        :dropdown-menu-style="{
          background: 'rgba(255, 105, 0, 0.05)',
          border: '1px solid #ff6900',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
        }"
      />
    </Flex>
    <Flex vertical gap="small" align="start">
      <span class="demo-label">自定义层级</span>
      <Select :width="180" :options="options" v-model:value="panelZIndexValue" :z-index="1100" />
    </Flex>
  </Flex>
</template>

<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 popupClassName 下发类名 + 全局样式；
   选项规则把类名重复一次以提升特异性，覆盖带 scope 属性的组件内规则 */
@demo-primary: #ff6900;

.custom-select-panel {
  &.custom-select-panel .select-options-panel .select-option {
    color: darken(@demo-primary, 12%);
    font-weight: 500;
  }
  .select-options-panel .select-option.option-hover {
    background: fade(@demo-primary, 10%);
  }
  .select-options-panel .select-option.option-selected {
    color: darken(@demo-primary, 12%);
    background: fade(@demo-primary, 16%);
  }
}
.demo-label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}
</style>
```

:::

## 三种尺寸

<Space vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Space align="center" :size="24">
    <Select :options="options" v-model:value="sizeValue" :size="size" />
    <Select :options="options" search allow-clear v-model:value="sizeValue" :size="size" />
  </Space>
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
const sizeValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('sizeValue', sizeValue.value)
})
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Space align="center" :size="24">
      <Select :options="options" v-model:value="sizeValue" :size="size" />
      <Select :options="options" search allow-clear v-model:value="sizeValue" :size="size" />
    </Space>
  </Space>
</template>
```

:::

## 支持清除

<Select :options="options" allow-clear v-model:value="clearableValue" />

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
  }
])
const selectedValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :options="options" allow-clear v-model:value="selectedValue" />
</template>
```

:::

## 支持搜索

<Select :options="options" allow-clear search v-model:value="searchableValue" />

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
  }
])
const selectedValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Select :options="options" allow-clear search v-model:value="selectedValue" />
</template>
```

:::

## 搜索过滤函数

<Select :options="options" search :filter="filter" v-model:value="filterValue" />

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
  }
])
const selectedValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
// 自定义过滤函数，当选项的 value 值大于 输入项时返回 true
function filter(inputValue: string, option: any) {
  return option.value > inputValue
}
</script>
<template>
  <Select :options="options" search :filter="filter" v-model:value="selectedValue" />
</template>
```

:::

## 键盘操作

面板收起时按 `↑` / `↓` 可直接展开面板；面板展开后：

| 按键 | 说明 |
| :-- | :-- |
| `↑` / `↓` | 上下移动高亮项（自动跳过禁用项，到达列表端点时环形回绕，并随面板滚动到可视区） |
| `Enter` | 选中当前高亮项 |
| `Esc` | 关闭面板，不改变当前选中值 |
| `Tab` | 焦点移出，面板关闭 |

<Space align="start" :size="40">
  <Select :options="options" v-model:value="keyboardValue" />
  <Select :options="optionsDisabled" v-model:value="keyboardValue" />
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
const keyboardValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('keyboardValue', keyboardValue.value)
})
</script>
<template>
  <Space align="start" :size="40">
    <Select :options="options" v-model:value="keyboardValue" />
    <Select :options="optionsDisabled" v-model:value="keyboardValue" />
  </Space>
</template>
```

:::

## 下拉面板弹出位置

<Space vertical>
  <Radio :options="placementOptions" v-model:value="placement" button button-style="solid" />
  <Space align="center" :size="24">
    <Select :options="options" v-model:value="placementValue" :placement="placement" />
    <Select :options="options" search allow-clear v-model:value="placementValue" :placement="placement" />
  </Space>
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
  }
])
const placementOptions = [
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'top',
    value: 'top'
  }
]
const placement = ref('bottom')
const selectedValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
</script>
<template>
  <Space vertical>
    <Radio :options="placementOptions" v-model:value="placement" button button-style="solid" />
    <Space align="center" :size="24">
      <Select :options="options" v-model:value="placementValue" :placement="placement" />
      <Select :options="options" search allow-clear v-model:value="placementValue" :placement="placement" />
    </Space>
  </Space>
</template>
```

:::

## 下拉面板挂载容器

*不传 `to` 时面板优先挂到最近的承载层内容容器（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body`；设为 `false` 时面板留在原地*

<br/>

<Space>
  <Select :options="options" v-model:value="toValue" :width="200" />
  <Select :options="options" v-model:value="toValue" :to="false" :width="200" />
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '布宜诺斯艾利斯', value: 5 },
  { label: '伊斯坦布尔', value: 6 },
  { label: '拜占庭', value: 7 },
  { label: '君士坦丁堡', value: 8 }
])
const toValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Space>
    <Select :options="options" v-model:value="toValue" :width="200" />
    <Select :options="options" v-model:value="toValue" :to="false" :width="200" />
  </Space>
</template>
```

::::

## 下拉面板数

*选项较多时面板默认展示 8 项，超出部分通过滚动查看；可通过 `maxDisplay` 调整展示项数*

<br/>

<Space align="start" :size="40">
  <Select :options="optionsLong" v-model:value="maxDisplayValue" />
  <Select :options="optionsLong" v-model:value="maxDisplayValue" :max-display="4" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const optionsLong = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '布宜诺斯艾利斯', value: 5 },
  { label: '伊斯坦布尔', value: 6 },
  { label: '拜占庭', value: 7 },
  { label: '君士坦丁堡', value: 8 },
  { label: '巴黎', value: 9 },
  { label: '里约热内卢', value: 10 }
])
const maxDisplayValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('maxDisplayValue', maxDisplayValue.value)
})
</script>
<template>
  <Space align="start" :size="40">
    <Select :options="optionsLong" v-model:value="maxDisplayValue" />
    <Select :options="optionsLong" v-model:value="maxDisplayValue" :max-display="4" />
  </Space>
</template>
```

:::

## 下拉面板滚动条

*通过 `scrollbarProps` 定制面板内滚动条*

<br/>

<Select :options="optionsLong" v-model:value="scrollbarValue" :scrollbar-props="{ size: 8, delay: 2000 }" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const optionsLong = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '布宜诺斯艾利斯', value: 5 },
  { label: '伊斯坦布尔', value: 6 },
  { label: '拜占庭', value: 7 },
  { label: '君士坦丁堡', value: 8 },
  { label: '巴黎', value: 9 },
  { label: '里约热内卢', value: 10 }
])
const scrollbarValue = ref<SelectProps['value']>(5)
watchEffect(() => {
  console.log('scrollbarValue', scrollbarValue.value)
})
</script>
<template>
  <Select :options="optionsLong" v-model:value="scrollbarValue" :scrollbar-props="{ size: 8, delay: 2000 }" />
</template>
```

:::

## APIs

### Select

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| options | 选项数据 | [SelectOption](#option-type)[] | [] |
| fieldNames | 选项的文本 / 值字段名配置 | `{ label?: string, value?: string }` | `{ label: 'label', value: 'value' }` |
| placeholder | 默认占位文本 | string | '请选择' |
| disabled | 是否禁用 | boolean | false |
| width | 选择器宽度，单位 `px` | string &#124; number | 'auto' |
| height | 选择器高度，单位 `px` | number | undefined |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| allowClear | 是否支持清除 | boolean | false |
| search | 是否支持搜索 | boolean | false |
| placement | 下拉面板弹出位置 | 'bottom' &#124; 'top' | 'bottom' |
| flip | 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true |
| to | 下拉面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 `'body'`) 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | undefined |
| popupClassName | 下拉面板的类名，用于自定义面板样式 | string | undefined |
| dropdownMenuStyle | 下拉面板自定义样式，可覆盖定位（与 `AutoComplete` 的同名属性语义一致） | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex | 下拉面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |
| filter | 过滤条件函数，仅当支持搜索时生效，根据输入项进行筛选：<li>默认为 `true` 时，筛选每个选项的文本字段（`fieldNames.label`，默认 `label`）是否包含输入项，包含时返回 `true`，反之返回 `false`</li><li>当其为函数 `Function` 时，接受 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`</li> | ((inputValue: string, option: SelectOption) => boolean) &#124; true | true |
| maxDisplay | 下拉面板最多能展示的项数，超过后滚动显示 | number | 8 |
| scrollbarProps | 下拉面板滚动条 `scrollbar` 组件属性配置，参考 [Scrollbar Props](./scrollbar.md#scrollbar) | [ScrollbarProps](./scrollbar.md#scrollbar) | {} |
| value <Tag color="cyan">v-model</Tag> | 当前选中的 `option` 条目值 | number &#124; string | undefined |

### Option Type

| 名称              | 说明                          | 类型                | 默认值    |
| :----------------- | :----------------------------- | :------------------- | :-------- |
| label?            | 选项名                        | string              | undefined |
| value?            | 选项值                        | string &#124; number | undefined |
| disabled?         | 是否禁用选项                  | boolean             | false     |
| [propName: string] | 用于包含带有任意数量的其他属性 | any                 | undefined |

## Events

| 名称      | 说明                  | 类型                                                                |
| :--------- | :--------------------- | :------------------------------------------------------------------ |
| change    | 选项值改变后的回调    | (value: string &#124; number, label: string, index: number) => void |
| openChange | 下拉菜单展开收起的回调 | (open: boolean) => void                                             |

<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 popupClassName 下发类名 + 全局样式；
   演示主题色：深浅色由 @demo-primary 派生（fade 调透明度、darken 调明度） */
@demo-primary: #ff6900;

.custom-select-panel {
  &.custom-select-panel .select-options-panel .select-option {
    color: darken(@demo-primary, 12%);
    font-weight: 500;
  }
  .select-options-panel .select-option.option-hover {
    background: fade(@demo-primary, 10%);
  }
  .select-options-panel .select-option.option-selected {
    color: darken(@demo-primary, 12%);
    background: fade(@demo-primary, 16%);
  }
}
.demo-label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}
</style>
