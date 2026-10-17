# 复选框 Checkbox

<GlobalElement />

_复选框_

## 何时使用

- 在一组可选项中进行多项选择时
- 单独使用可以表示两种状态之间的切换，和 `Switch` 类似

<script setup lang="ts">
import { computed, h, ref, watch, watchEffect } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
// 基本使用
const checked = ref<boolean>(false)
// 受控
const controlled = ref<boolean>(false)
const controlledDisabled = ref<boolean>(false)
const controlledLabel = computed(
  () => `${controlled.value ? 'Checked' : 'Unchecked'}-${controlledDisabled.value ? 'Disabled' : 'Enabled'}`
)
const toggleControlled = () => {
  controlled.value = !controlled.value
}
const toggleControlledDisabled = () => {
  controlledDisabled.value = !controlledDisabled.value
}
// 全选
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const checkedList = ref<string[]>(['Apple', 'Orange'])
const checkAll = ref<boolean>(false)
const indeterminate = ref<boolean>(false)
watch(
  checkedList,
  (value) => {
    indeterminate.value = value.length > 0 && value.length < plainOptions.length
    checkAll.value = value.length === plainOptions.length
  },
  { immediate: true }
)
const onCheckAllChange = (value: boolean) => {
  checkedList.value = value ? [...plainOptions] : []
}
// 复选框组
const groupOptions: CheckboxOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const groupOptionsWithDisabled: CheckboxOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]
const groupOptionsRedLabel: CheckboxOption[] = groupOptionsWithDisabled.map((option) => ({
  ...option,
  label: h('span', { style: 'color: red' }, option.label)
}))
const groupPlainValue = ref<string[]>([])
const groupSelectedValue = ref<string[]>(['Apple'])
const groupObjectValue = ref<string[]>(['Pear'])
const groupDisabledValue = ref<string[]>(['Apple'])
// 与栅格配合
const gridItems = ['A', 'B', 'C', 'D', 'E']
const gridValue = ref<string[]>([])
// 禁用
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
// 选项列表 / 禁用选项 / 垂直排列 / 自定义选项名
const options = ref<CheckboxOption[]>([
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
const optionsDisabled = ref<CheckboxOption[]>([
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
const vnodeOptions: CheckboxOption[] = [
  { label: '北京市', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '纽约市'), value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 }
]
const selectedOptions = ref<(string | number)[]>([2])
const vnodeValue = ref<(string | number)[]>([2])
const groupValue = ref<(string | number)[]>([1])
const groupVerticalValue = ref<(string | number)[]>([1, 2])
const horizontalGap = ref(16)
const verticalGap = ref(8)
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
// 聚焦方法
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusCheckboxRef = ref<{ focus: () => void; blur: () => void } | null>(null)
watchEffect(() => {
  console.log('checked', checked.value)
})
watchEffect(() => {
  console.log('selectedOptions', selectedOptions.value)
})
const onChange = (value: boolean | (string | number)[]) => {
  console.log('change', value)
}
</script>

## 基本使用

<Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const checked = ref<boolean>(false)
watchEffect(() => {
  console.log('checked', checked.value)
})
const onChange = (value: boolean) => {
  console.log('change', value)
}
</script>
<template>
  <Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>
</template>
```

:::

受控：选中与禁用均由外部状态驱动

<Flex class="mb20" gap="small">
  <Button type="primary" size="small" @click="toggleControlled">{{ controlled ? 'Uncheck' : 'Check' }}</Button>
  <Button type="primary" size="small" @click="toggleControlledDisabled">
    {{ controlledDisabled ? 'Enable' : 'Disable' }}
  </Button>
</Flex>
<Checkbox v-model:checked="controlled" :disabled="controlledDisabled">{{ controlledLabel }}</Checkbox>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
const controlled = ref<boolean>(false)
const controlledDisabled = ref<boolean>(false)
const controlledLabel = computed(
  () => `${controlled.value ? 'Checked' : 'Unchecked'}-${controlledDisabled.value ? 'Disabled' : 'Enabled'}`
)
const toggleControlled = () => {
  controlled.value = !controlled.value
}
const toggleControlledDisabled = () => {
  controlledDisabled.value = !controlledDisabled.value
}
</script>
<template>
  <Flex class="mb20" gap="small">
    <Button type="primary" size="small" @click="toggleControlled">
      {{ controlled ? 'Uncheck' : 'Check' }}
    </Button>
    <Button type="primary" size="small" @click="toggleControlledDisabled">
      {{ controlledDisabled ? 'Enable' : 'Disable' }}
    </Button>
  </Flex>
  <Checkbox v-model:checked="controlled" :disabled="controlledDisabled">{{ controlledLabel }}</Checkbox>
</template>
```

:::

## 全选

在实现全选效果时，你可能会用到 `indeterminate` 属性

<Checkbox :indeterminate="indeterminate" v-model:checked="checkAll" @change="onCheckAllChange">Check all</Checkbox>
<CheckboxGroup v-model:value="checkedList" :options="plainOptions" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const checkedList = ref<string[]>(['Apple', 'Orange'])
const checkAll = ref<boolean>(false)
const indeterminate = ref<boolean>(false)
watch(
  checkedList,
  (value) => {
    indeterminate.value = value.length > 0 && value.length < plainOptions.length
    checkAll.value = value.length === plainOptions.length
  },
  { immediate: true }
)
const onCheckAllChange = (value: boolean) => {
  checkedList.value = value ? [...plainOptions] : []
}
</script>
<template>
  <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll" @change="onCheckAllChange">Check all</Checkbox>
  <CheckboxGroup v-model:value="checkedList" :options="plainOptions" />
</template>
```

:::

## 复选框组

选中值由 `CheckboxGroup` 统一维护，组内 `Checkbox` 以 `value` 标识自身

<CheckboxGroup v-model:value="groupPlainValue" :options="plainOptions" name="checkboxgroup" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const groupPlainValue = ref<string[]>([])
</script>
<template>
  <CheckboxGroup v-model:value="groupPlainValue" :options="plainOptions" name="checkboxgroup" />
</template>
```

:::

<CheckboxGroup v-model:value="groupSelectedValue" :options="plainOptions" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const groupSelectedValue = ref<string[]>(['Apple'])
</script>
<template>
  <CheckboxGroup v-model:value="groupSelectedValue" :options="plainOptions" />
</template>
```

:::

<CheckboxGroup v-model:value="groupObjectValue" :options="groupOptions" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const groupOptions: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const groupObjectValue = ref<string[]>(['Pear'])
</script>
<template>
  <CheckboxGroup v-model:value="groupObjectValue" :options="groupOptions" />
</template>
```

:::

<CheckboxGroup v-model:value="groupDisabledValue" :options="groupOptionsRedLabel" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const groupOptions: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]
// 选项名直接传入 VNode
const groupOptionsRedLabel: CheckboxGroupOption[] = groupOptions.map((option) => ({
  ...option,
  label: h('span', { style: 'color: red' }, option.label)
}))
const groupDisabledValue = ref<string[]>(['Apple'])
</script>
<template>
  <CheckboxGroup v-model:value="groupDisabledValue" :options="groupOptionsRedLabel" disabled />
</template>
```

:::

## 与栅格配合

`CheckboxGroup` 内嵌 `Checkbox` 并与栅格组件一起使用，可以实现灵活的布局

<CheckboxGroup v-model:value="gridValue" style="width: 100%">
  <Row>
    <Col v-for="item in gridItems" :key="item" :span="8">
      <Checkbox :value="item">{{ item }}</Checkbox>
    </Col>
  </Row>
</CheckboxGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const gridItems = ['A', 'B', 'C', 'D', 'E']
const gridValue = ref<string[]>([])
</script>
<template>
  <CheckboxGroup v-model:value="gridValue" style="width: 100%">
    <Row>
      <Col v-for="item in gridItems" :key="item" :span="8">
        <Checkbox :value="item">{{ item }}</Checkbox>
      </Col>
    </Row>
  </CheckboxGroup>
</template>
```

:::

## 禁用

<Flex class="mb20" gap="small">
  <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
</Flex>
<Checkbox v-model:checked="disabledChecked" :disabled="disabled">Disabled</Checkbox>
<Checkbox v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Checkbox>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
</script>
<template>
  <Flex class="mb20" gap="small">
    <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
  </Flex>
  <Checkbox v-model:checked="disabledChecked" :disabled="disabled">Disabled</Checkbox>
  <Checkbox v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Checkbox>
</template>
```

:::

配置式写法

<Checkbox :options="options" v-model:value="selectedOptions" disabled />
<CheckboxGroup v-model:value="groupValue" :options="groupOptions" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption, CheckboxOption } from 'vue-amazing-ui'
const options = ref<CheckboxOption[]>([
  { label: '北京市', value: 1 },
  { label: '纽约市', value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 },
  { label: '伊斯坦布尔', value: 4 },
  { label: '拜占庭', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const groupOptions: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const selectedOptions = ref<(string | number)[]>([2])
const groupValue = ref<(string | number)[]>([1])
</script>
<template>
  <Checkbox :options="options" v-model:value="selectedOptions" disabled />
  <CheckboxGroup v-model:value="groupValue" :options="groupOptions" disabled />
</template>
```

:::

## 禁用选项

<Checkbox :options="optionsDisabled" v-model:value="selectedOptions" />
<CheckboxGroup v-model:value="groupValue" :options="groupOptionsWithDisabled" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption, CheckboxOption } from 'vue-amazing-ui'
const optionsDisabled = ref<CheckboxOption[]>([
  { label: '北京市', value: 1 },
  { label: '纽约市', value: 2, disabled: true },
  { label: '布宜诺斯艾利斯', value: 3 },
  { label: '伊斯坦布尔', value: 4 },
  { label: '拜占庭', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const groupOptionsWithDisabled: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]
const selectedOptions = ref<(string | number)[]>([2])
const groupValue = ref<(string | number)[]>([1])
</script>
<template>
  <Checkbox :options="optionsDisabled" v-model:value="selectedOptions" />
  <CheckboxGroup v-model:value="groupValue" :options="groupOptionsWithDisabled" />
</template>
```

:::

## 选项列表

单组件传入 `options`，选中值为数组，配合 `v-model:value` 使用

<Checkbox :options="options" v-model:value="selectedOptions" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const options = ref<CheckboxOption[]>([
  { label: '北京市', value: 1 },
  { label: '纽约市', value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 },
  { label: '伊斯坦布尔', value: 4 },
  { label: '拜占庭', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedOptions = ref<(string | number)[]>([2])
const onChange = (value: (string | number)[]) => {
  console.log('change', value)
}
</script>
<template>
  <Checkbox :options="options" v-model:value="selectedOptions" @change="onChange" />
</template>
```

:::

## 垂直排列

<Checkbox :options="options" vertical v-model:value="selectedOptions" />
<CheckboxGroup v-model:value="groupVerticalValue" vertical>
  <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
</CheckboxGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const options = ref<CheckboxOption[]>([
  { label: '北京市', value: 1 },
  { label: '纽约市', value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 },
  { label: '伊斯坦布尔', value: 4 },
  { label: '拜占庭', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedOptions = ref<(string | number)[]>([2])
const groupVerticalValue = ref<(string | number)[]>([1, 2])
</script>
<template>
  <Checkbox :options="options" vertical v-model:value="selectedOptions" />
  <CheckboxGroup v-model:value="groupVerticalValue" vertical>
    <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
  </CheckboxGroup>
</template>
```

:::

## 自定义选项名

<Checkbox :options="options" v-model:value="selectedOptions">
  <template #default="{ option, label, index }">
    <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
    <span v-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
  </template>
</Checkbox>
<CheckboxGroup v-model:value="groupValue">
  <Checkbox :value="1">北京市</Checkbox>
  <Checkbox :value="2"><span style="color: #ff6900">纽约市</span></Checkbox>
  <Checkbox :value="3">布宜诺斯艾利斯</Checkbox>
  <Checkbox :value="4"><span style="color: #1677ff">伊斯坦布尔</span></Checkbox>
</CheckboxGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const options = ref<CheckboxOption[]>([
  { label: '北京市', value: 1 },
  { label: '纽约市', value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 },
  { label: '伊斯坦布尔', value: 4 },
  { label: '拜占庭', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedOptions = ref<(string | number)[]>([2])
const groupValue = ref<(string | number)[]>([1])
</script>
<template>
  <Checkbox :options="options" v-model:value="selectedOptions">
    <template #default="{ option, label, index }">
      <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
      <span v-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
    </template>
  </Checkbox>
  <CheckboxGroup v-model:value="groupValue">
    <Checkbox :value="1">北京市</Checkbox>
    <Checkbox :value="2"><span style="color: #ff6900">纽约市</span></Checkbox>
    <Checkbox :value="3">布宜诺斯艾利斯</Checkbox>
    <Checkbox :value="4"><span style="color: #1677ff">伊斯坦布尔</span></Checkbox>
  </CheckboxGroup>
</template>
```

:::

选项名直接传入 VNode

<Checkbox :options="vnodeOptions" v-model:value="vnodeValue" />
<CheckboxGroup v-model:value="vnodeValue" :options="vnodeOptions" />

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import type { CheckboxGroupOption, CheckboxOption } from 'vue-amazing-ui'
// 选项名直接传入 VNode
const vnodeOptions: CheckboxOption[] = [
  { label: '北京市', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '纽约市'), value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 }
]
const vnodeValue = ref<(string | number)[]>([2])
</script>
<template>
  <Checkbox :options="vnodeOptions" v-model:value="vnodeValue" />
  <CheckboxGroup v-model:value="vnodeValue" :options="vnodeOptions" />
</template>
```

:::

## 自定义间距

单组件 `gap` 传数组时为「水平间距, 垂直间距」；垂直间距仅在水平方向放不下、选项换行时才生效

<Flex :gap="24" class="mb20">
  <Flex gap="small" vertical style="flex: 1">
    <span>horizontal gap: {{ horizontalGap }}px</span>
    <Slider v-model:value="horizontalGap" />
  </Flex>
  <Flex gap="small" vertical style="flex: 1">
    <span>vertical gap: {{ verticalGap }}px</span>
    <Slider v-model:value="verticalGap" />
  </Flex>
</Flex>

<Checkbox :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="selectedOptions" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const options = ref<CheckboxOption[]>([
  { label: '北京市', value: 1 },
  { label: '纽约市', value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 },
  { label: '伊斯坦布尔', value: 4 },
  { label: '拜占庭', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedOptions = ref<(string | number)[]>([2])
const horizontalGap = ref(16)
const verticalGap = ref(8)
</script>
<template>
  <Flex :gap="24" class="mb20">
    <Flex gap="small" vertical style="flex: 1">
      <span>horizontal gap: {{ horizontalGap }}px</span>
      <Slider v-model:value="horizontalGap" />
    </Flex>
    <Flex gap="small" vertical style="flex: 1">
      <span>vertical gap: {{ verticalGap }}px</span>
      <Slider v-model:value="verticalGap" />
    </Flex>
  </Flex>
  <Checkbox :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="selectedOptions" />
</template>
```

:::

## 单选组间距

单选组 `gap` 传数字为统一间距；开关切换水平 / 垂直布局，垂直布局时 `gap` 即行间距

<Flex :gap="24" class="mb20">
  <Flex gap="small" vertical style="flex: 1">
    <span>group gap: {{ groupGap }}px</span>
    <Slider v-model:value="groupGap" />
  </Flex>
  <Flex gap="small" vertical align="flex-start" style="flex: 1">
    <span>vertical layout</span>
    <Switch v-model:value="groupVertical" />
  </Flex>
</Flex>

<CheckboxGroup v-model:value="groupVerticalValue" :gap="groupGap" :vertical="groupVertical">
  <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
</CheckboxGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const options = ref<CheckboxOption[]>([
  { label: '北京市', value: 1 },
  { label: '纽约市', value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 },
  { label: '伊斯坦布尔', value: 4 },
  { label: '拜占庭', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const groupValue = ref<(string | number)[]>([1, 2])
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
</script>
<template>
  <Flex :gap="24" class="mb20">
    <Flex gap="small" vertical style="flex: 1">
      <span>group gap: {{ groupGap }}px</span>
      <Slider v-model:value="groupGap" />
    </Flex>
    <Flex gap="small" vertical align="flex-start" style="flex: 1">
      <span>vertical layout</span>
      <Switch v-model:value="groupVertical" />
    </Flex>
  </Flex>
  <CheckboxGroup v-model:value="groupValue" :gap="groupGap" :vertical="groupVertical">
    <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
  </CheckboxGroup>
</template>
```

:::

## 聚焦方法

_组件暴露 `focus` / `blur` 方法，可聚焦或失焦原生 `input`；调用 `focus` 时同样显示焦点环_

<br/>

<Checkbox
  ref="focusCheckboxRef"
  v-model:checked="focusChecked"
  @focusin="focusFocused = true"
  @focusout="focusFocused = false"
>
  Checkbox
</Checkbox>

<Button @click="focusCheckboxRef?.focus()">focus</Button>

<Button @click="focusCheckboxRef?.blur()">blur</Button>

<span>{{ focusFocused ? '已聚焦' : '未聚焦' }}</span>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref<boolean>(false)
const focused = ref<boolean>(false)
const checkboxRef = ref<{ focus: () => void; blur: () => void } | null>(null)
</script>
<template>
  <Checkbox ref="checkboxRef" v-model:checked="checked" @focusin="focused = true" @focusout="focused = false">
    Checkbox
  </Checkbox>
  <Button @click="checkboxRef?.focus()">focus</Button>
  <Button @click="checkboxRef?.blur()">blur</Button>
  <span>{{ focused ? '已聚焦' : '未聚焦' }}</span>
</template>
```

:::

## APIs

### Checkbox

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
checked <Tag color="cyan">v-model</Tag> | 当前是否选中 | boolean | false
value <Tag color="cyan">v-model</Tag> | 当前选中的值；配合 `options` 使用时为已选中的值数组，置于 `CheckboxGroup` 内时作为本项的身份标识 | (string &#124; number)[] &#124; string &#124; number | undefined
options | 复选框选项数据 | [CheckboxOption](#checkboxoption-type)[] | []
vertical | 是否垂直排列 | boolean | false
gap | 多个复选框之间的间距；垂直排列时为垂直间距，单位 `px`；数组间距用于水平排列折行时：`[水平间距, 垂直间距]` | number &#124; number[] | 8
disabled | 是否禁用 | boolean | false
indeterminate | 全选时的样式控制 | boolean | false
autofocus | 是否自动聚焦原生 `input` | boolean | false
name | 原生 `input` 的表单字段名；置于 `CheckboxGroup` 内时以组的配置为准 | string | undefined
id | 原生 `input` 的 `id`；`options` 模式下作为前缀，实际 `id` 追加选项下标 | string | undefined

### CheckboxGroup

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
value <Tag color="cyan">v-model</Tag> | 组内已选中的值 | (string &#124; number)[] | []
options | 复选框选项数据；提供后组内默认插槽不生效 | (string &#124; number &#124; [CheckboxGroupOption](#checkboxgroupoption-type))[] | []
vertical | 是否垂直排列 | boolean | false
gap | 选项间距，单位 `px`；垂直排列时即垂直间距；数组用于水平排列折行时：`[水平间距, 垂直间距]` | number &#124; number[] | 8
disabled | 是否禁用整组，组内单项自身的 `disabled` 在此基础上叠加 | boolean | false
name | 表单字段名，下发到组内每个原生 `input` | string | undefined

### CheckboxOption Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
label | 选项名，传入 VNode 时原样渲染 | string &#124; number &#124; VNode | undefined
value | 选项值 | string &#124; number | undefined
disabled? | 是否禁用选项 | boolean | undefined

### CheckboxGroupOption Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
label? | 选项名，未提供时以选项值展示；传入 VNode 时原样渲染 | string &#124; number &#124; VNode | undefined
value | 选项值 | string &#124; number | undefined
disabled? | 是否禁用选项 | boolean | undefined

## Slots

### Checkbox Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 自定义选项名 | v-slot:default="{ option, label, index }"

### CheckboxGroup Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 组内选项，用于放置 `Checkbox` | v-slot:default

## Events

### Checkbox Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 变化时的回调函数 | (value: boolean \| (string \| number)[], event: CheckboxChangeEvent) => void

`event` 为与原生 `input` 的 change 同形态的事件对象，含 `target`（`checked` / `value` / `name` / `disabled` 状态快照）、`nativeEvent` 与 `stopPropagation` / `preventDefault`

### CheckboxGroup Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 组内选项变化时的回调函数 | (value: (string \| number)[], event: CheckboxChangeEvent) => void

## Methods

### Checkbox Methods

名称 | 说明 | 类型
:-- | :-- | :--
focus | 聚焦组件的原生 `input`；`options` 模式下优先聚焦当前选中项 | () => void
blur | 使组件的原生 `input` 失焦 | () => void
