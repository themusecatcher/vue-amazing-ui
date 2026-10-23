# 复选框 Checkbox

<GlobalElement />

_在一组备选项中进行多项选择，支持配置式写法与 `CheckboxGroup` 组合式用法，含半选态_

## 何时使用

- 在一组可选项中进行多项选择时
- 单独使用可以表示两种状态之间的切换，和 `Switch` 类似

<script setup lang="ts">
import { computed, h, ref, watch, watchEffect } from 'vue'
import type { Checkbox, CheckboxGroupOption } from 'vue-amazing-ui'
// 基本使用
const checked = ref<boolean>(false)
const onChange = (value: boolean | (string | number)[]) => {
  console.log('change', value)
}
// 受控：选中与禁用均由外部状态驱动
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
// 全选：全选框的三态由子项已选数量推导
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
const groupOptions: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const groupPlainValue = ref<string[]>([])
const groupSelectedValue = ref<string[]>(['Apple'])
const groupObjectValue = ref<string[]>(['Pear'])
// 与栅格配合
const gridItems = ['A', 'B', 'C', 'D', 'E']
const gridValue = ref<string[]>([])
// 选项列表 / 垂直排列 / 禁用选项 / 自定义选项名：城市选项，长短混排便于观察换行与间距
const options = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const optionsDisabled = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2, disabled: true },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const groupOptionsDisabled: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear', disabled: true },
  { label: 'Orange', value: 'Orange' }
]
const listValue = ref<(string | number)[]>([2])
const verticalValue = ref<(string | number)[]>([1, 2])
const verticalGroupValue = ref<(string | number)[]>([1, 2])
// 禁用
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
const disabledListValue = ref<(string | number)[]>([2])
const disabledGroupValue = ref<string[]>(['Apple'])
// 禁用选项
const optionDisabledListValue = ref<(string | number)[]>([1])
const optionDisabledGroupValue = ref<string[]>(['Apple'])
// 自定义选项名
const customSlotValue = ref<(string | number)[]>([2])
const customSlotGroupValue = ref<(string | number)[]>([1])
// 非字符串选项名：label 直接传入 VNode
const vnodeOptions: CheckboxGroupOption[] = [
  { label: '拜占庭', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '君士坦丁堡'), value: 2 },
  { label: '伊斯坦布尔', value: 3 }
]
const vnodeValue = ref<(string | number)[]>([2])
const vnodeGroupValue = ref<(string | number)[]>([2])
// 自定义间距 / 复选框组间距
const horizontalGap = ref(16)
const verticalGap = ref(8)
const gapValue = ref<(string | number)[]>([2])
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
const groupGapValue = ref<(string | number)[]>([1, 2])
// 聚焦方法
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusCheckboxRef = ref<InstanceType<typeof Checkbox> | null>(null)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>

## 基本使用

_独立用法：`v-model:checked` 双向绑定选中态；「受控」示例由外部状态驱动选中与禁用_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">基础</span>
    <Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">受控</span>
    <Flex gap="small" align="center">
      <Checkbox v-model:checked="controlled" :disabled="controlledDisabled">{{ controlledLabel }}</Checkbox>
      <Button size="small" type="primary" @click="toggleControlled">{{ controlled ? 'Uncheck' : 'Check' }}</Button>
      <Button size="small" type="primary" @click="toggleControlledDisabled">
        {{ controlledDisabled ? 'Enable' : 'Disable' }}
      </Button>
    </Flex>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
const checked = ref<boolean>(false)
const onChange = (value: boolean) => {
  console.log('change', value)
}
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
  <Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>
  <Checkbox v-model:checked="controlled" :disabled="controlledDisabled">{{ controlledLabel }}</Checkbox>
  <Button size="small" type="primary" @click="toggleControlled">{{ controlled ? 'Uncheck' : 'Check' }}</Button>
  <Button size="small" type="primary" @click="toggleControlledDisabled">
    {{ controlledDisabled ? 'Enable' : 'Disable' }}
  </Button>
</template>
```

:::

## 全选

_`indeterminate` 用于表达「部分选中」：全选框的半选态由子项已选数量推导_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">全选</span>
    <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll" @change="onCheckAllChange">Check all</Checkbox>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">子项</span>
    <CheckboxGroup v-model:value="checkedList" :options="plainOptions" />
  </Flex>
</Flex>

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

_选中值由 `CheckboxGroup` 统一维护，组内 `Checkbox` 用 `value` 标识自身_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">默认</span>
    <CheckboxGroup v-model:value="groupPlainValue" :options="plainOptions" name="checkboxGroup" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">默认选中</span>
    <CheckboxGroup v-model:value="groupSelectedValue" :options="plainOptions" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">对象选项</span>
    <CheckboxGroup v-model:value="groupObjectValue" :options="groupOptions" />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const groupOptions: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const value = ref<string[]>(['Apple'])
</script>
<template>
  <CheckboxGroup v-model:value="value" :options="plainOptions" name="checkboxGroup" />
  <CheckboxGroup v-model:value="value" :options="groupOptions" />
</template>
```

:::

## 与栅格配合

_`CheckboxGroup` 内嵌 `Checkbox` 并与栅格组合，可实现多列对齐布局_

<br/>

<Flex vertical gap="small" align="start" width="100%">
  <CheckboxGroup v-model:value="gridValue" style="width: 100%">
    <Row>
      <Col v-for="item in gridItems" :key="item" :span="8">
        <Checkbox :value="item">{{ item }}</Checkbox>
      </Col>
    </Row>
  </CheckboxGroup>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const gridItems = ['A', 'B', 'C', 'D', 'E']
const value = ref<string[]>([])
</script>
<template>
  <CheckboxGroup v-model:value="value" style="width: 100%">
    <Row>
      <Col v-for="item in gridItems" :key="item" :span="8">
        <Checkbox :value="item">{{ item }}</Checkbox>
      </Col>
    </Row>
  </CheckboxGroup>
</template>
```

:::

## 选项列表

_配置式写法：传入 `options` 数组即可渲染整组选项，选中值为数组_

<br/>

<CheckboxGroup :options="options" v-model:value="listValue" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const options = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<(string | number)[]>([2])
</script>
<template>
  <CheckboxGroup :options="options" v-model:value="value" />
</template>
```

:::

## 垂直排列

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">配置式</span>
    <CheckboxGroup :options="options" v-model:value="verticalValue" vertical />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">组合式</span>
    <CheckboxGroup v-model:value="verticalGroupValue" vertical>
      <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
    </CheckboxGroup>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const options = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<(string | number)[]>([1, 2])
</script>
<template>
  <CheckboxGroup :options="options" v-model:value="value" vertical />
  <CheckboxGroup v-model:value="value" vertical>
    <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
  </CheckboxGroup>
</template>
```

:::

## 禁用

_开关演示禁用态：禁用后不可聚焦、不可切换，组的 `disabled` 会叠加到组内各项_

<br/>

<Flex vertical align="start">
  <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">复选框</span>
    <Flex gap="small" align="center">
      <Checkbox v-model:checked="disabledChecked" :disabled="disabled">Disabled</Checkbox>
      <Checkbox v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Checkbox>
    </Flex>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">配置式</span>
    <CheckboxGroup :options="options" v-model:value="disabledListValue" disabled />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">复选框组</span>
    <CheckboxGroup v-model:value="disabledGroupValue" :options="groupOptions" disabled />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const disabled = ref<boolean>(true)
const checked1 = ref<boolean>(true)
const checked2 = ref<boolean>(false)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
</script>
<template>
  <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
  <Checkbox v-model:checked="checked1" :disabled="disabled">Disabled</Checkbox>
  <Checkbox v-model:checked="checked2" :disabled="disabled">Disabled</Checkbox>
</template>
```

:::

## 禁用选项

_在选项数据里给单项设置 `disabled: true`，仅该项不可选，其余选项不受影响_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">配置式</span>
    <CheckboxGroup :options="optionsDisabled" v-model:value="optionDisabledListValue" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">复选框组</span>
    <CheckboxGroup v-model:value="optionDisabledGroupValue" :options="groupOptionsDisabled" />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const options: CheckboxGroupOption[] = [
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2, disabled: true },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
]
const groupOptions: CheckboxGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear', disabled: true },
  { label: 'Orange', value: 'Orange' }
]
const value = ref<(string | number)[]>([1])
const groupValue = ref<string[]>(['Apple'])
</script>
<template>
  <CheckboxGroup :options="options" v-model:value="value" />
  <CheckboxGroup v-model:value="groupValue" :options="groupOptions" />
</template>
```

:::

## 自定义选项名

_`options` 模式的默认插槽提供 `option` / `label` / `index`，可自行渲染选项名_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">插槽 · 配置式</span>
    <CheckboxGroup :options="options" v-model:value="customSlotValue">
      <template #default="{ option, label, index }">
        <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
        <span v-else-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
        <span v-else>{{ label }}</span>
      </template>
    </CheckboxGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">插槽 · 组合式</span>
    <CheckboxGroup v-model:value="customSlotGroupValue">
      <Checkbox :value="1">拜占庭</Checkbox>
      <Checkbox :value="2"><span style="color: #ff6900">君士坦丁堡</span></Checkbox>
      <Checkbox :value="3">伊斯坦布尔</Checkbox>
      <Checkbox :value="4"><span style="color: #1677ff">布宜诺斯艾利斯</span></Checkbox>
    </CheckboxGroup>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const options = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<(string | number)[]>([2])
</script>
<template>
  <CheckboxGroup :options="options" v-model:value="value">
    <template #default="{ option, label, index }">
      <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
      <span v-else-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
      <span v-else>{{ label }}</span>
    </template>
  </CheckboxGroup>
</template>
```

:::

_选项名支持富内容：配置式可把 `VNode` 作为 `label` 传入，组合式直接在插槽内写 HTML 或组件_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">VNode · 配置式</span>
    <CheckboxGroup :options="vnodeOptions" v-model:value="vnodeValue" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">VNode · 组合式</span>
    <CheckboxGroup v-model:value="vnodeGroupValue">
      <Checkbox :value="1">拜占庭</Checkbox>
      <Checkbox :value="2"><span style="color: #1677ff">君士坦丁堡</span></Checkbox>
      <Checkbox :value="3">伊斯坦布尔</Checkbox>
    </CheckboxGroup>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const vnodeOptions: CheckboxGroupOption[] = [
  { label: '拜占庭', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '君士坦丁堡'), value: 2 },
  { label: '伊斯坦布尔', value: 3 }
]
const value = ref<(string | number)[]>([2])
const groupValue = ref<(string | number)[]>([2])
</script>
<template>
  <CheckboxGroup :options="vnodeOptions" v-model:value="value" />
  <CheckboxGroup v-model:value="groupValue">
    <Checkbox :value="1">拜占庭</Checkbox>
    <Checkbox :value="2"><span style="color: #1677ff">君士坦丁堡</span></Checkbox>
    <Checkbox :value="3">伊斯坦布尔</Checkbox>
  </CheckboxGroup>
</template>
```

:::

## 自定义间距

_`gap` 传数组时为「水平间距, 垂直间距」；垂直间距仅在选项换行时才生效，此处用窄容器触发换行_

<br/>

<Flex vertical align="start">
  <Flex gap="large">
    <Flex gap="small" vertical>
      <span>水平间距 {{ horizontalGap }}px</span>
      <Slider v-model:value="horizontalGap" :width="200" />
    </Flex>
    <Flex gap="small" vertical>
      <span>垂直间距 {{ verticalGap }}px</span>
      <Slider v-model:value="verticalGap" :width="200" />
    </Flex>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">窄容器</span>
    <div style="width: 240px">
      <CheckboxGroup :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="gapValue" />
    </div>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const options = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const horizontalGap = ref(16)
const verticalGap = ref(8)
const value = ref<(string | number)[]>([2])
</script>
<template>
  <Flex gap="small" vertical>
    <span>水平间距 {{ horizontalGap }}px</span>
    <Slider v-model:value="horizontalGap" />
  </Flex>
  <Flex gap="small" vertical>
    <span>垂直间距 {{ verticalGap }}px</span>
    <Slider v-model:value="verticalGap" />
  </Flex>
  <!-- 容器宽度不足时选项换行，此时垂直间距生效 -->
  <div style="width: 240px">
    <CheckboxGroup :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
  </div>
</template>
```

:::

## 复选框组间距

_组的 `gap` 传数字即统一间距；打开「垂直排列」后 `gap` 转为行间距_

<br/>

<Flex vertical align="start">
  <Flex gap="large">
    <Flex gap="small" vertical>
      <span>选项间距 {{ groupGap }}px</span>
      <Slider v-model:value="groupGap" :width="200" />
    </Flex>
    <Flex gap="small" vertical align="flex-start">
      <span>垂直排列</span>
      <Switch v-model:value="groupVertical" />
    </Flex>
  </Flex>
  <CheckboxGroup v-model:value="groupGapValue" :gap="groupGap" :vertical="groupVertical">
    <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
  </CheckboxGroup>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupOption } from 'vue-amazing-ui'
const options = ref<CheckboxGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
const value = ref<(string | number)[]>([1, 2])
</script>
<template>
  <Flex gap="small" vertical>
    <span>选项间距 {{ groupGap }}px</span>
    <Slider v-model:value="groupGap" />
  </Flex>
  <Flex gap="small" vertical align="flex-start">
    <span>垂直排列</span>
    <Switch v-model:value="groupVertical" />
  </Flex>
  <CheckboxGroup v-model:value="value" :gap="groupGap" :vertical="groupVertical">
    <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
  </CheckboxGroup>
</template>
```

:::

## 聚焦方法

_组件暴露 `focus` / `blur` 方法操作原生 `input`，程序化聚焦同样会显示焦点环_

<br/>

<Flex gap="small" align="center">
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
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { Checkbox } from 'vue-amazing-ui'
const checked = ref<boolean>(false)
const focused = ref<boolean>(false)
const checkboxRef = ref<InstanceType<typeof Checkbox> | null>(null)
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

### Checkbox Props

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
checked <Tag color="cyan">v-model</Tag> | 当前是否选中；作为组内单项使用时由组内已选值决定，本属性不生效 | boolean | false
value | 本项的值；脱离组时随 `change` 事件回传，置于 `CheckboxGroup` 内时作为本项的身份标识 | string &#124; number | undefined
disabled | 是否禁用 | boolean | false
indeterminate | 半选（全选）时的样式控制 | boolean | false
autofocus | 是否自动聚焦原生 `input` | boolean | false
name | 原生 `input` 的表单字段名；置于 `CheckboxGroup` 内时以组的配置为准 | string | undefined
id | 原生 `input` 的 `id` | string | undefined

### CheckboxGroup Props

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
value <Tag color="cyan">v-model</Tag> | 组内已选中的值；不传时由组内部维护 | (string &#124; number)[] | []
options | 复选框选项数据；提供后组内默认插槽不生效 | (string &#124; number &#124; [CheckboxGroupOption](#checkboxgroupoption-type))[] | []
vertical | 是否垂直排列 | boolean | false
gap | 选项间距，单位 `px`；垂直排列时即垂直间距（传数组取垂直间距）；数组用于水平排列折行时：`[水平间距, 垂直间距]` | number &#124; number[] | 8
disabled | 是否禁用整组，组内单项自身的 `disabled` 在此基础上叠加 | boolean | false
name | 表单字段名，下发到组内每个原生 `input` | string | undefined
id | `input` 的 `id` 前缀，`options` 模式下实际 `id` 追加选项下标；组合式用法不下发，请在组内各项上自行设置 | string | undefined
autofocus | 是否自动聚焦首项，仅 `options` 模式生效 | boolean | false

### CheckboxGroupOption Type

名称 | 说明 | 类型
:-- | :-- | :--
label? | 选项名，未提供时以选项值展示；传入 `VNode` 时原样渲染 | string &#124; number &#124; VNode
value | 选项值 | string &#124; number
disabled? | 是否禁用选项 | boolean

## Slots

### Checkbox Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 选项名 | v-slot:default

### CheckboxGroup Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | `options` 模式下为每个选项提供作用域参数；未提供 `options` 时用于放置 `Checkbox` | v-slot:default="{ option, label, index }"

## Methods

### Checkbox Methods

名称 | 说明 | 类型
:-- | :-- | :--
focus | 聚焦组件的原生 `input` | () => void
blur | 使组件的原生 `input` 失焦 | () => void

## Events

### Checkbox Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 变化时的回调函数；作为 `CheckboxGroup` 的组内单项使用时本组件不触发（组内选中变更由组的 `change` 统一出口） | (value: boolean, event: CheckboxChangeEvent) => void

`event` 为与原生 `input` 的 `change` 同形态的事件对象，含 `target`（`checked` / `value` / `name` / `disabled` 状态快照）、`nativeEvent` 与 `stopPropagation` / `preventDefault`。`target.value` 为该项的标识值，`target.checked` 为该项变化后的选中态。

### CheckboxGroup Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 组内选项变化时的回调函数 | (value: (string \| number)[], event: CheckboxChangeEvent) => void

`event.target.value` 为变更后的组内已选值数组，`event.target.checked` 表示变更后组内是否仍有选中项（非「全选」语义）。

