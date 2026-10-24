# 单选框 Radio

<GlobalElement />

_在一组备选项中选中单个状态，支持圆点、按钮与配置式写法，选中值由 `RadioGroup` 统一维护_

## 何时使用

- 用于在多个备选项中选中单个状态
- 和 `Select` 的区别是，`Radio` 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多
- 需要统一维护一组选项的选中值时，使用 `RadioGroup` 包裹一组 `Radio`

<script setup lang="ts">
import { h, ref, watchEffect } from 'vue'
import type { Radio, RadioButton, RadioGroupOption, RadioProps } from 'vue-amazing-ui'
// 基本使用
const checked = ref<boolean>(false)
const onChange = (checked: boolean) => {
  console.log('change', checked)
}
// 单选组合 / 表单字段名
const groupItems = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' }
]
const groupValue = ref<RadioProps['value']>(1)
const nameItems = [
  { value: '1', label: 'A' },
  { value: '2', label: 'B' },
  { value: '3', label: 'C' },
  { value: '4', label: 'D' }
]
const nameValue = ref<string>('1')
// 选项列表：城市选项，长短混排便于观察换行与间距
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const optionGroupValue = ref<RadioProps['value']>(1)
// 单选组垂直排列
const verticalItems = [
  { value: 1, label: 'Option A' },
  { value: 2, label: 'Option B' },
  { value: 3, label: 'Option C' },
  { value: 4, label: 'More...' }
]
// 逐项定高并居中：选项内嵌控件出现 / 消失时不影响行盒基线
const verticalStyle: Record<string, string> = {
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  lineHeight: '30px'
}
const verticalValue = ref<RadioProps['value']>(1)
const verticalAttrValue = ref<RadioProps['value']>(1)
// 按钮样式 / 填底的按钮样式 / 按钮大小
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const outlineValue = ref<RadioProps['value']>('a')
const outlineItemDisabledValue = ref<RadioProps['value']>('a')
const outlineGroupDisabledValue = ref<RadioProps['value']>('a')
const outlineOptionsValue = ref<RadioProps['value']>(2)
const buttonChecked = ref<boolean>(false)
const solidValue = ref<RadioProps['value']>('a')
const solidItemDisabledValue = ref<RadioProps['value']>('c')
const solidChecked = ref<boolean>(false)
const solidOptionsGroupValue = ref<RadioProps['value']>(2)
const sizeOptions = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
const buttonSizeValue = ref<RadioProps['size']>('middle')
const largeValue = ref<RadioProps['value']>('a')
const middleValue = ref<RadioProps['value']>('a')
const smallValue = ref<RadioProps['value']>('a')
const sizeChecked = ref<boolean>(false)
const sizeOptionsValue = ref<RadioProps['value']>(2)
// 禁用
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
const disabledOptionsValue = ref<RadioProps['value']>(2)
const disabledGroupValue = ref<RadioProps['value']>(1)
// 禁用选项
const optionsDisabled = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2, disabled: true },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const optionDisabledButtonValue = ref<RadioProps['value']>(1)
const optionDisabledGroupValue = ref<RadioProps['value']>(1)
// 自定义选项名
const customSlotValue = ref<RadioProps['value']>(2)
const customSlotGroupValue = ref<RadioProps['value']>(1)
// 非字符串选项名：label 直接传入 VNode
const vnodeOptions: RadioGroupOption[] = [
  { label: '拜占庭', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '君士坦丁堡'), value: 2 },
  { label: '伊斯坦布尔', value: 3 }
]
const vnodeValue = ref<RadioProps['value']>(1)
const vnodeGroupValue = ref<RadioProps['value']>(1)
// 自定义间距 / 单选组间距
const horizontalGap = ref(16)
const verticalGap = ref(8)
const gapRadioValue = ref<RadioProps['value']>(2)
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
const groupGapValue = ref<RadioProps['value']>(1)
// 聚焦方法
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusRadioRef = ref<InstanceType<typeof Radio> | null>(null)
const focusButtonChecked = ref<boolean>(false)
const focusButtonFocused = ref<boolean>(false)
const focusButtonRef = ref<InstanceType<typeof RadioButton> | null>(null)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>

## 基本使用

_独立用法：`v-model:checked` 双向绑定选中态，`change` 事件回传最新选中值_

<br/>

<Radio v-model:checked="checked" @change="onChange">Radio</Radio>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref<boolean>(false)
const onChange = (value: boolean) => {
  console.log('change', value)
}
</script>
<template>
  <Radio v-model:checked="checked" @change="onChange">Radio</Radio>
</template>
```

:::

## 单选组合

_选中值由 `RadioGroup` 统一维护，组内 `Radio` 用 `value` 标识自身，无需各自维护选中态_

<br/>

<RadioGroup v-model:value="groupValue">
  <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
</RadioGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioProps } from 'vue-amazing-ui'
const groupItems = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' }
]
const value = ref<RadioProps['value']>(1)
</script>
<template>
  <RadioGroup v-model:value="value">
    <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
  </RadioGroup>
</template>
```

:::

## 表单字段名

_设置 `name` 后，组内各原生 `input` 共享同一字段名，浏览器据此把它们识别为同一组选项_

<br/>

<RadioGroup v-model:value="nameValue" name="radioGroup">
  <Radio v-for="item in nameItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
</RadioGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const nameItems = [
  { value: '1', label: 'A' },
  { value: '2', label: 'B' },
  { value: '3', label: 'C' },
  { value: '4', label: 'D' }
]
const value = ref<string>('1')
</script>
<template>
  <RadioGroup v-model:value="value" name="radioGroup">
    <Radio v-for="item in nameItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
  </RadioGroup>
</template>
```

:::

## 选项列表

_配置式写法：传入 `options` 数组即可渲染整组选项；自定义选项名、按钮形态等能力均由 `RadioGroup` 承载_

<br/>

<RadioGroup v-model:value="optionGroupValue" :options="options" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<RadioProps['value']>(1)
</script>
<template>
  <RadioGroup v-model:value="value" :options="options" />
</template>
```

:::

## 单选组垂直排列

_选项内需要放输入框等控件时，逐项定高并居中，可避免控件出现 / 消失时整行跳动_

<br/>

<RadioGroup v-model:value="verticalValue" style="display: inline-block">
  <Radio v-for="item in verticalItems" :key="item.value" :value="item.value" :style="verticalStyle">
    {{ item.label }}
    <Input v-if="item.value === 4 && verticalValue === 4" style="width: 100px; margin-left: 10px" />
  </Radio>
</RadioGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioProps } from 'vue-amazing-ui'
const items = [
  { value: 1, label: 'Option A' },
  { value: 2, label: 'Option B' },
  { value: 3, label: 'Option C' },
  { value: 4, label: 'More...' }
]
const verticalStyle: Record<string, string> = {
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  lineHeight: '30px'
}
const value = ref<RadioProps['value']>(1)
</script>
<template>
  <RadioGroup v-model:value="value" style="display: inline-block">
    <Radio v-for="item in items" :key="item.value" :value="item.value" :style="verticalStyle">
      {{ item.label }}
      <Input v-if="item.value === 4 && value === 4" style="width: 100px; margin-left: 10px" />
    </Radio>
  </RadioGroup>
</template>
```

:::

_也可以直接用 `vertical` 让组内选项垂直排列_

<br/>

<RadioGroup v-model:value="verticalAttrValue" vertical>
  <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
</RadioGroup>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioProps } from 'vue-amazing-ui'
const groupItems = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' }
]
const value = ref<RadioProps['value']>(1)
</script>
<template>
  <RadioGroup v-model:value="value" vertical>
    <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
  </RadioGroup>
</template>
```

:::

## 按钮样式

_按钮形态有两种写法：组内放 `RadioButton`，或给组设置 `button`_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">默认</span>
    <RadioGroup v-model:value="outlineValue">
      <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">单项禁用</span>
    <RadioGroup v-model:value="outlineItemDisabledValue">
      <RadioButton
        v-for="button in buttonItems"
        :key="button.value"
        :value="button.value"
        :disabled="button.value === 'b'"
      >
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">整组禁用</span>
    <RadioGroup v-model:value="outlineGroupDisabledValue" disabled>
      <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">配置式</span>
    <RadioGroup v-model:value="outlineOptionsValue" :options="options" button />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<RadioProps['value']>('a')
</script>
<template>
  <RadioGroup v-model:value="value">
    <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
      {{ button.label }}
    </RadioButton>
  </RadioGroup>
  <RadioGroup v-model:value="value" :options="options" button />
</template>
```

:::

_单组件同样可用 `button` 切换按钮形态_

<br/>

<Radio v-model:checked="buttonChecked" button @change="onChange">Radio Button</Radio>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref<boolean>(false)
</script>
<template>
  <Radio v-model:checked="checked" button>Radio Button</Radio>
</template>
```

:::

## 填底的按钮样式

_在按钮形态基础上设置 `buttonStyle="solid"`，选中项以主题色填底_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">默认</span>
    <RadioGroup v-model:value="solidValue" button-style="solid">
      <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">单项禁用</span>
    <RadioGroup v-model:value="solidItemDisabledValue" button-style="solid">
      <RadioButton
        v-for="button in buttonItems"
        :key="button.value"
        :value="button.value"
        :disabled="button.value === 'b'"
      >
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">配置式</span>
    <RadioGroup v-model:value="solidOptionsGroupValue" :options="options" button button-style="solid" />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<RadioProps['value']>('a')
</script>
<template>
  <RadioGroup v-model:value="value" button-style="solid">
    <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
      {{ button.label }}
    </RadioButton>
  </RadioGroup>
  <RadioGroup v-model:value="value" :options="options" button button-style="solid" />
</template>
```

:::

_单组件的填底按钮形态：`button` 配合 `buttonStyle="solid"`_

<br/>

<Radio v-model:checked="solidChecked" button button-style="solid" @change="onChange">Radio Button Solid</Radio>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref<boolean>(false)
</script>
<template>
  <Radio v-model:checked="checked" button button-style="solid">Radio Button Solid</Radio>
</template>
```

:::

## 按钮大小

_组的 `size` 统一作用于组内所有按钮，未指定时各按钮回落自身 `size`_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">large</span>
    <RadioGroup v-model:value="largeValue" size="large">
      <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">middle</span>
    <RadioGroup v-model:value="middleValue" size="middle">
      <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">small</span>
    <RadioGroup v-model:value="smallValue" size="small">
      <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioProps } from 'vue-amazing-ui'
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const value = ref<RadioProps['value']>('a')
</script>
<template>
  <RadioGroup v-model:value="value" size="large">
    <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
      {{ button.label }}
    </RadioButton>
  </RadioGroup>
</template>
```

:::

_单组件按自身 `size` 渲染，可与上方的尺寸选择联动切换_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">尺寸</span>
    <RadioGroup :options="sizeOptions" v-model:value="buttonSizeValue" button button-style="solid" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">单组件</span>
    <Radio v-model:checked="sizeChecked" button :size="buttonSizeValue">Radio Button</Radio>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">配置式</span>
    <RadioGroup :options="options" v-model:value="sizeOptionsValue" button :size="buttonSizeValue" />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const sizeOptions = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
const buttonSizeValue = ref<RadioProps['size']>('middle')
const checked = ref<boolean>(false)
const value = ref<RadioProps['value']>(2)
</script>
<template>
  <RadioGroup :options="sizeOptions" v-model:value="buttonSizeValue" button button-style="solid" />
  <Radio v-model:checked="checked" button :size="buttonSizeValue">Radio Button</Radio>
  <RadioGroup :options="options" v-model:value="value" button :size="buttonSizeValue" />
</template>
```

:::

## 禁用

_开关演示整组禁用：禁用后不可聚焦、不可切换，`disabled` 由组统一下发给组内各项_

<br/>

<Flex vertical align="start">
  <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">单选按钮</span>
    <Flex gap="small" align="center">
      <Radio v-model:checked="disabledChecked" :disabled="disabled">Disabled</Radio>
      <Radio v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Radio>
    </Flex>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">配置式</span>
    <RadioGroup :options="options" v-model:value="disabledOptionsValue" disabled />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">按钮形态</span>
    <RadioGroup :options="options" v-model:value="disabledOptionsValue" button disabled />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">单选组</span>
    <RadioGroup v-model:value="disabledGroupValue" :options="options" disabled />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const disabled = ref<boolean>(true)
const checked1 = ref<boolean>(true)
const checked2 = ref<boolean>(false)
const optionsValue = ref<RadioProps['value']>(1)
const buttonValue = ref<RadioProps['value']>(1)
const groupValue = ref<RadioProps['value']>(1)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
</script>
<template>
  <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
  <Radio v-model:checked="checked1" :disabled="disabled">Disabled</Radio>
  <Radio v-model:checked="checked2" :disabled="disabled">Disabled</Radio>
  <RadioGroup :options="options" v-model:value="optionsValue" disabled />
  <RadioGroup :options="options" v-model:value="buttonValue" button disabled />
  <RadioGroup v-model:value="groupValue" :options="options" disabled />
</template>
```

:::

## 禁用选项

_在选项数据里给单项设置 `disabled: true`，仅该项不可选，其余选项不受影响_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">单选组</span>
    <RadioGroup v-model:value="optionDisabledGroupValue" :options="optionsDisabled" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">按钮形态</span>
    <RadioGroup v-model:value="optionDisabledButtonValue" :options="optionsDisabled" button />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2, disabled: true },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<RadioProps['value']>(1)
</script>
<template>
  <RadioGroup v-model:value="value" :options="options" />
</template>
```

:::

## 自定义选项名

_`options` 模式的默认插槽提供 `option` / `label` / `index`，可自行渲染选项名_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">插槽 · 配置式</span>
    <RadioGroup :options="options" v-model:value="customSlotValue">
      <template #default="{ option, label, index }">
        <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
        <span v-else-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
        <span v-else>{{ label }}</span>
      </template>
    </RadioGroup>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">插槽 · 组合式</span>
    <RadioGroup v-model:value="customSlotGroupValue">
      <Radio :value="1">拜占庭</Radio>
      <Radio :value="2"><span style="color: #ff6900">君士坦丁堡</span></Radio>
      <Radio :value="3">伊斯坦布尔</Radio>
      <Radio :value="4"><span style="color: #1677ff">布宜诺斯艾利斯</span></Radio>
    </RadioGroup>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const value = ref<RadioProps['value']>(2)
</script>
<template>
  <RadioGroup :options="options" v-model:value="value">
    <template #default="{ option, label, index }">
      <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
      <span v-else-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
      <span v-else>{{ label }}</span>
    </template>
  </RadioGroup>
</template>
```

:::

_选项名支持富内容：配置式可把 `VNode` 作为 `label` 传入，组合式直接在插槽内写 HTML 或组件_

<br/>

<Flex vertical align="start">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">VNode · 配置式</span>
    <RadioGroup :options="vnodeOptions" v-model:value="vnodeValue" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">VNode · 组合式</span>
    <RadioGroup v-model:value="vnodeGroupValue">
      <Radio :value="1">拜占庭</Radio>
      <Radio :value="2"><span style="color: #1677ff">君士坦丁堡</span></Radio>
      <Radio :value="3">伊斯坦布尔</Radio>
    </RadioGroup>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const vnodeOptions: RadioGroupOption[] = [
  { label: '拜占庭', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '君士坦丁堡'), value: 2 },
  { label: '伊斯坦布尔', value: 3 }
]
const value = ref<RadioProps['value']>(1)
const groupValue = ref<RadioProps['value']>(1)
</script>
<template>
  <RadioGroup :options="vnodeOptions" v-model:value="value" />
  <RadioGroup v-model:value="groupValue">
    <Radio :value="1">拜占庭</Radio>
    <Radio :value="2"><span style="color: #1677ff">君士坦丁堡</span></Radio>
    <Radio :value="3">伊斯坦布尔</Radio>
  </RadioGroup>
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
      <RadioGroup :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="gapRadioValue" />
    </div>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioGroupOption, RadioProps } from 'vue-amazing-ui'
const options = ref<RadioGroupOption[]>([
  { label: '拜占庭', value: 1 },
  { label: '君士坦丁堡', value: 2 },
  { label: '伊斯坦布尔', value: 3 },
  { label: '布宜诺斯艾利斯', value: 4 }
])
const horizontalGap = ref(16)
const verticalGap = ref(8)
const value = ref<RadioProps['value']>(2)
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
    <RadioGroup :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
  </div>
</template>
```

:::

## 单选组间距

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
  <RadioGroup v-model:value="groupGapValue" :gap="groupGap" :vertical="groupVertical">
    <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
  </RadioGroup>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioProps } from 'vue-amazing-ui'
const groupItems = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' }
]
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
const value = ref<RadioProps['value']>(1)
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
  <RadioGroup v-model:value="value" :gap="groupGap" :vertical="groupVertical">
    <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
  </RadioGroup>
</template>
```

:::

## 聚焦方法

_组件暴露 `focus` / `blur` 方法操作原生 `input`，程序化聚焦同样会显示焦点环；键盘聚焦与脚本聚焦显示焦点环，鼠标按下不显示_

<br/>

<Flex vertical gap="small" align="start">
  <span class="demo-label">圆点形态</span>
  <Flex gap="small" align="center">
    <Radio
      ref="focusRadioRef"
      v-model:checked="focusChecked"
      @focusin="focusFocused = true"
      @focusout="focusFocused = false"
    >
      Radio
    </Radio>
    <Button @click="focusRadioRef?.focus()">focus</Button>
    <Button @click="focusRadioRef?.blur()">blur</Button>
    <span>{{ focusFocused ? '已聚焦' : '未聚焦' }}</span>
  </Flex>
</Flex>

<br/>

<Flex vertical gap="small" align="start">
  <span class="demo-label">按钮形态</span>
  <Flex gap="small" align="center">
    <RadioButton
      ref="focusButtonRef"
      v-model:checked="focusButtonChecked"
      @focusin="focusButtonFocused = true"
      @focusout="focusButtonFocused = false"
    >
      Radio Button
    </RadioButton>
    <Button @click="focusButtonRef?.focus()">focus</Button>
    <Button @click="focusButtonRef?.blur()">blur</Button>
    <span>{{ focusButtonFocused ? '已聚焦' : '未聚焦' }}</span>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { Radio, RadioButton } from 'vue-amazing-ui'
const checked = ref<boolean>(false)
const focused = ref<boolean>(false)
const radioRef = ref<InstanceType<typeof Radio> | null>(null)
const buttonChecked = ref<boolean>(false)
const buttonFocused = ref<boolean>(false)
const buttonRef = ref<InstanceType<typeof RadioButton> | null>(null)
</script>
<template>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">圆点形态</span>
    <Flex gap="small" align="center">
      <Radio ref="radioRef" v-model:checked="checked" @focusin="focused = true" @focusout="focused = false">Radio</Radio>
      <Button @click="radioRef?.focus()">focus</Button>
      <Button @click="radioRef?.blur()">blur</Button>
      <span>{{ focused ? '已聚焦' : '未聚焦' }}</span>
    </Flex>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">按钮形态</span>
    <Flex gap="small" align="center">
      <RadioButton
        ref="buttonRef"
        v-model:checked="buttonChecked"
        @focusin="buttonFocused = true"
        @focusout="buttonFocused = false"
      >
        Radio Button
      </RadioButton>
      <Button @click="buttonRef?.focus()">focus</Button>
      <Button @click="buttonRef?.blur()">blur</Button>
      <span>{{ buttonFocused ? '已聚焦' : '未聚焦' }}</span>
    </Flex>
  </Flex>
</template>
```

:::

## APIs

### Radio Props

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
checked <Tag color="cyan">v-model</Tag> | 当前是否选中；作为组内单项使用时以组的值为准，本属性不生效 | boolean | false
value | 本项的值；脱离组时随 `change` 事件回传，置于 `RadioGroup` 内时作为本项的身份标识，与组内当前值比较得出选中态 | string &#124; number &#124; boolean | undefined
button | 是否启用按钮样式；置于 `RadioGroup` 内时，组为按钮形态同样按按钮渲染（本属性为 `true` 时优先） | boolean | false
buttonStyle | 按钮样式风格；置于 `RadioGroup` 内时以组的配置为准 | 'outline' &#124; 'solid' | 'outline'
size | 尺寸，仅当按钮形态时生效；置于 `RadioGroup` 内时以组的配置为准，组未指定时回落自身尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
disabled | 是否禁用 | boolean | false
autofocus | 是否自动聚焦原生 `input` | boolean | false
name | 原生 `input` 的表单字段名；置于 `RadioGroup` 内时以组的配置为准 | string | undefined
id | 原生 `input` 的 `id` | string | undefined

### RadioGroup Props

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
value <Tag color="cyan">v-model</Tag> | 组内当前选中的值；不传时由组内部维护 | string &#124; number &#124; boolean | undefined
options | 单选框选项数据；提供后组内默认插槽不生效 | (string &#124; number &#124; [RadioGroupOption](#radiogroupoption-type))[] | []
button | 是否启用按钮样式 | boolean | false
buttonStyle | 按钮形态的风格，仅按钮形态生效 | 'outline' &#124; 'solid' | 'outline'
size | 尺寸，仅作用于按钮形态；未指定时组内各项回落自身尺寸 | 'small' &#124; 'middle' &#124; 'large' | undefined
vertical | 是否垂直排列；按钮形态（组的 `button` 或组内 `RadioButton`）不适用 | boolean | false
gap | 选项间距，单位 `px`；垂直排列时即垂直间距（传数组取垂直间距）；数组用于水平排列折行时：`[水平间距, 垂直间距]`；按钮形态下相邻项贴合成组，该属性不生效 | number &#124; number[] | 8
disabled | 是否禁用整组，组内单项自身的 `disabled` 在此基础上叠加 | boolean | false
name | 表单字段名，下发到组内每个原生 `input` | string | undefined
id | `input` 的 `id` 前缀，`options` 模式下实际 `id` 追加选项下标；组合式用法不下发，请在组内各项上自行设置 | string | undefined
autofocus | 是否自动聚焦首项，仅 `options` 模式生效 | boolean | false

### RadioButton Props

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
checked <Tag color="cyan">v-model</Tag> | 脱离组单独使用时的选中态 | boolean | false
value | 该项的值，置于组内时据此判断选中 | string &#124; number &#124; boolean | undefined
disabled | 是否禁用 | boolean | false
autofocus | 是否自动聚焦原生 `input` | boolean | false
name | 原生 `input` 的表单字段名；置于 `RadioGroup` 内时以组的配置为准 | string | undefined
id | 原生 `input` 的 `id` | string | undefined

### RadioGroupOption Type

名称 | 说明 | 类型
:-- | :-- | :--
label? | 选项名，未提供时以选项值展示；传入 `VNode` 时原样渲染 | string &#124; number &#124; VNode
value | 选项值 | string &#124; number &#124; boolean
disabled? | 是否禁用选项 | boolean

## Slots

### Radio Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 选项名 | v-slot:default

### RadioGroup Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | `options` 模式下为每个选项提供作用域参数；未提供 `options` 时用于放置 `Radio` / `RadioButton` | v-slot:default="{ option, label, index }"

### RadioButton Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 按钮文本 | v-slot:default

## Methods

### Radio Methods

名称 | 说明 | 类型
::-- | :-- | :--
focus | 聚焦组件的原生 `input` | () => void
blur | 使组件的原生 `input` 失焦 | () => void

### RadioButton Methods

名称 | 说明 | 类型
::-- | :-- | :--
focus | 聚焦组件的原生 `input` | () => void
blur | 使组件的原生 `input` 失焦 | () => void

## Events

### Radio Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 选项变化时的回调函数；脱组单独使用时触发（仅未选中 → 选中，首参恒为 `true`），作为 `RadioGroup` 的组内单项使用时本组件不触发（组内选中变更由组的 `change` 统一出口） | (checked: boolean, event: RadioChangeEvent) => void

`event` 为与原生 `input` 的 `change` 同形态的事件对象，含 `target`（`checked` / `value` / `name` / `disabled` 状态快照）、`nativeEvent` 与 `stopPropagation` / `preventDefault`

### RadioGroup Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 组内选项变化时的回调函数 | (value: string \| number \| boolean, event: RadioChangeEvent) => void

`event.target.checked` 恒为 `true`（选中事件），`value` 为本次选中的值，`name` / `disabled` 取该项当前生效的字段名与禁用态。

### RadioButton Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 选项变化时的回调函数；脱离组单独使用时触发，置于 `RadioGroup` 内时不触发（组内选中变更由 `RadioGroup` 的 `change` 统一出口） | (checked: boolean, event: RadioChangeEvent) => void
