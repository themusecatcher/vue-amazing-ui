# 单选框 Radio

<GlobalElement />

_单选框_

## 何时使用

- 用于在多个备选项中选中单个状态
- 和 `Select` 的区别是，`Radio` 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多
- 需要统一维护一组选项的选中值时，使用 `RadioGroup` 包裹一组 `Radio`

<script setup lang="ts">
import { h, reactive, ref, watchEffect } from 'vue'
import type { Radio, RadioOption, RadioProps, RadioGroupOption } from 'vue-amazing-ui'
const groupItems = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' }
]
const nameItems = [
  { value: '1', label: 'A' },
  { value: '2', label: 'B' },
  { value: '3', label: 'C' },
  { value: '4', label: 'D' }
]
const nameValue = ref<string>('1')
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusRadioRef = ref<InstanceType<typeof Radio> | null>(null)
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const optionsWithDisabled: RadioGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true }
]
const optionCases: {
  key: string
  options: (string | RadioGroupOption)[]
  optionType: 'default' | 'button'
  disabled: boolean
}[] = [
  { key: 'plain', options: plainOptions, optionType: 'default', disabled: false },
  { key: 'option-disabled', options: optionsWithDisabled, optionType: 'default', disabled: false },
  { key: 'group-disabled', options: plainOptions, optionType: 'default', disabled: true },
  { key: 'button', options: plainOptions, optionType: 'button', disabled: false },
  { key: 'button-option-disabled', options: optionsWithDisabled, optionType: 'button', disabled: false },
  { key: 'button-group-disabled', options: plainOptions, optionType: 'button', disabled: true }
]
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const buttonCases = [
  { key: 'outline', value: 'a', groupDisabled: false, disabledValue: '' },
  { key: 'outline-item-disabled', value: 'a', groupDisabled: false, disabledValue: 'b' },
  { key: 'outline-group-disabled', value: 'a', groupDisabled: true, disabledValue: '' }
]
const solidCases = [
  { key: 'solid', value: 'a', groupDisabled: false, disabledValue: '' },
  { key: 'solid-item-disabled', value: 'c', groupDisabled: false, disabledValue: 'b' }
]
const sizeCases: { key: string; size: RadioProps['size'] }[] = [
  { key: 'large', size: 'large' },
  { key: 'middle', size: 'middle' },
  { key: 'small', size: 'small' }
]
const verticalStyle: Record<string, string> = {
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  lineHeight: '30px'
}
const verticalItems = [
  { value: 1, label: 'Option A' },
  { value: 2, label: 'Option B' },
  { value: 3, label: 'Option C' },
  { value: 4, label: 'More...' }
]
const initialValues: Record<string, string | number> = {
  plain: 'Apple',
  'option-disabled': 'Apple',
  'group-disabled': 'Apple',
  button: 'Apple',
  'button-option-disabled': 'Apple',
  'button-group-disabled': 'Apple',
  outline: 'a',
  'outline-item-disabled': 'a',
  'outline-group-disabled': 'a',
  solid: 'a',
  'solid-item-disabled': 'c',
  large: 'a',
  middle: 'a',
  small: 'a'
}
const groupValues = reactive<Record<string, string | number>>({ ...initialValues })
const checked = ref<boolean>(false)
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
const groupValue = ref<RadioProps['value']>(1)
const verticalValue = ref<RadioProps['value']>(1)
const verticalAttrValue = ref<RadioProps['value']>(1)
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const onChange = (value: string | number | boolean) => {
  console.log('change', value)
}
// 非字符串选项名：label 直接传入 VNode
const vnodeOptions: RadioOption[] = [
  { label: '北京市', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '纽约市'), value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 }
]
const vnodeGroupOptions: RadioGroupOption[] = [
  { label: '北京市', value: 1 },
  { label: h('span', { style: 'color: #1677ff' }, '纽约市'), value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 }
]
const vnodeValue = ref<RadioProps['value']>(1)
const vnodeGroupValue = ref<RadioProps['value']>(1)
const options = ref<RadioOption[]>([
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
const optionsDisabled = ref<RadioOption[]>([
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
const groupOptions = ref<RadioGroupOption[]>([
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
    value: 3,
    disabled: true
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
const value = ref<RadioProps['value']>(2)
const buttonSize = ref<RadioProps['size']>('middle')
const customGroupValue = ref<RadioProps['value']>(1)
const gapGroupValue = ref<RadioProps['value']>(1)
const horizontalGap = ref(16)
const verticalGap = ref(8)
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
watchEffect(() => {
  console.log('checked', checked.value)
})
watchEffect(() => {
  console.log('value', value.value)
})
</script>

## 基本使用

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

_选中值由 `RadioGroup` 统一维护，组内 `Radio` 以 `value` 标识自身_

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

_为组设置 `name` 后，组内各项的原生 `input` 共享同一字段名，浏览器据此把同组选项视为一组_

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

## 聚焦方法

_组件暴露 `focus` / `blur` 方法，可聚焦或失焦原生 `input`；调用 `focus` 时同样显示焦点环_

<br/>

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { Radio } from 'vue-amazing-ui'
const checked = ref<boolean>(false)
const focused = ref<boolean>(false)
const radioRef = ref<InstanceType<typeof Radio> | null>(null)
</script>
<template>
  <Radio ref="radioRef" v-model:checked="checked" @focusin="focused = true" @focusout="focused = false">Radio</Radio>
  <Button @click="radioRef?.focus()">focus</Button>
  <Button @click="radioRef?.blur()">blur</Button>
  <span>{{ focused ? '已聚焦' : '未聚焦' }}</span>
</template>
```

::::

## 选项列表

_单组件传入 `options` 亦可渲染整组选项，配合 `button` 切换按钮形态_

<br/>

<div v-for="item in optionCases" :key="item.key">
  <RadioGroup
    v-model:value="groupValues[item.key]"
    :options="item.options"
    :option-type="item.optionType"
    :disabled="item.disabled"
  />
</div>

<Radio :options="options" v-model:value="value" @change="onChange" />

<Radio :options="options" v-model:value="value" button />

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RadioOption, RadioGroupOption } from 'vue-amazing-ui'
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const optionsWithDisabled: RadioGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true }
]
const optionCases: {
  key: string
  options: (string | RadioGroupOption)[]
  optionType: 'default' | 'button'
  disabled: boolean
}[] = [
  { key: 'plain', options: plainOptions, optionType: 'default', disabled: false },
  { key: 'option-disabled', options: optionsWithDisabled, optionType: 'default', disabled: false },
  { key: 'group-disabled', options: plainOptions, optionType: 'default', disabled: true },
  { key: 'button', options: plainOptions, optionType: 'button', disabled: false },
  { key: 'button-option-disabled', options: optionsWithDisabled, optionType: 'button', disabled: false },
  { key: 'button-group-disabled', options: plainOptions, optionType: 'button', disabled: true }
]
const groupValues = reactive<Record<string, string | number>>({
  plain: 'Apple',
  'option-disabled': 'Apple',
  'group-disabled': 'Apple',
  button: 'Apple',
  'button-option-disabled': 'Apple',
  'button-group-disabled': 'Apple'
})
// 配置式写法：由单个 Radio 渲染全部选项
const options = ref<RadioOption[]>([
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
const value = ref<number>(2)
</script>
<template>
  <div v-for="item in optionCases" :key="item.key">
    <RadioGroup
      v-model:value="groupValues[item.key]"
      :options="item.options"
      :option-type="item.optionType"
      :disabled="item.disabled"
    />
  </div>
  <Radio :options="options" v-model:value="value" />
  <Radio :options="options" v-model:value="value" button />
</template>
```

:::

## 单选组垂直排列

_结合更多输入框选项的垂直排列用法_

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
const verticalItems = [
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
    <Radio v-for="item in verticalItems" :key="item.value" :value="item.value" :style="verticalStyle">
      {{ item.label }}
      <Input v-if="item.value === 4 && value === 4" style="width: 100px; margin-left: 10px" />
    </Radio>
  </RadioGroup>
</template>
```

:::

_使用 `vertical` 属性亦可让组内选项垂直排列_

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

_使用 `RadioButton` 子项，或给组设置 `optionType="button"`，均可切到按钮形态_

<br/>

<div v-for="item in buttonCases" :key="item.key">
  <RadioGroup v-model:value="groupValues[item.key]" :disabled="item.groupDisabled">
    <RadioButton
      v-for="button in buttonItems"
      :key="button.value"
      :value="button.value"
      :disabled="button.value === item.disabledValue"
    >
      {{ button.label }}
    </RadioButton>
  </RadioGroup>
</div>

<Radio v-model:checked="checked" button @change="onChange">Radio Button</Radio>

<Radio :options="options" v-model:value="value" button />

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const buttonCases = [
  { key: 'outline', value: 'a', groupDisabled: false, disabledValue: '' },
  { key: 'outline-item-disabled', value: 'a', groupDisabled: false, disabledValue: 'b' },
  { key: 'outline-group-disabled', value: 'a', groupDisabled: true, disabledValue: '' }
]
const groupValues = reactive<Record<string, string | number>>({
  outline: 'a',
  'outline-item-disabled': 'a',
  'outline-group-disabled': 'a'
})
// 配置式写法
const options = ref<RadioOption[]>([
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
const checked = ref<boolean>(false)
const value = ref<number>(2)
</script>
<template>
  <div v-for="item in buttonCases" :key="item.key">
    <RadioGroup v-model:value="groupValues[item.key]" :disabled="item.groupDisabled">
      <RadioButton
        v-for="button in buttonItems"
        :key="button.value"
        :value="button.value"
        :disabled="button.value === item.disabledValue"
      >
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </div>
  <Radio v-model:checked="checked" button>Radio Button</Radio>
  <Radio :options="options" v-model:value="value" button />
</template>
```

:::

## 填底的按钮样式

_单组件亦可直接使用填底的按钮形态_

<br/>

<div v-for="item in solidCases" :key="item.key">
  <RadioGroup v-model:value="groupValues[item.key]" button-style="solid" :disabled="item.groupDisabled">
    <RadioButton
      v-for="button in buttonItems"
      :key="button.value"
      :value="button.value"
      :disabled="button.value === item.disabledValue"
    >
      {{ button.label }}
    </RadioButton>
  </RadioGroup>
</div>

<Radio v-model:checked="checked" button button-style="solid" @change="onChange">Radio Button Solid</Radio>

<Radio :options="options" v-model:value="value" button button-style="solid" />

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const solidCases = [
  { key: 'solid', value: 'a', groupDisabled: false, disabledValue: '' },
  { key: 'solid-item-disabled', value: 'c', groupDisabled: false, disabledValue: 'b' }
]
const groupValues = reactive<Record<string, string | number>>({
  solid: 'a',
  'solid-item-disabled': 'c'
})
// 配置式写法
const options = ref<RadioOption[]>([
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
const checked = ref<boolean>(false)
const value = ref<number>(2)
</script>
<template>
  <div v-for="item in solidCases" :key="item.key">
    <RadioGroup v-model:value="groupValues[item.key]" button-style="solid" :disabled="item.groupDisabled">
      <RadioButton
        v-for="button in buttonItems"
        :key="button.value"
        :value="button.value"
        :disabled="button.value === item.disabledValue"
      >
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </div>
  <Radio v-model:checked="checked" button button-style="solid">Radio Button Solid</Radio>
  <Radio :options="options" v-model:value="value" button button-style="solid" />
</template>
```

:::

## 禁用

<Flex class="mb20" gap="small">
  <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
</Flex>

<Radio v-model:checked="disabledChecked" :disabled="disabled">Disabled</Radio>

<Radio v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Radio>

<Radio :options="options" v-model:value="value" disabled />

<Radio :options="options" v-model:value="value" button disabled />

<RadioGroup v-model:value="customGroupValue" :options="groupOptions" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioOption, RadioGroupOption } from 'vue-amazing-ui'
const disabled = ref<boolean>(true)
const checked1 = ref<boolean>(true)
const checked2 = ref<boolean>(false)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const options = ref<RadioOption[]>([
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
const groupOptions = ref<RadioGroupOption[]>([
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
    value: 3,
    disabled: true
  }
])
const value = ref<number>(2)
const groupValue = ref<number>(1)
</script>
<template>
  <Flex class="mb20" gap="small">
    <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
  </Flex>
  <Radio v-model:checked="checked1" :disabled="disabled">Disabled</Radio>
  <Radio v-model:checked="checked2" :disabled="disabled">Disabled</Radio>
  <Radio :options="options" v-model:value="value" disabled />
  <Radio :options="options" v-model:value="value" button disabled />
  <RadioGroup v-model:value="groupValue" :options="groupOptions" disabled />
</template>
```

:::

## 禁用选项

<Radio :options="optionsDisabled" v-model:value="value" />

<Radio :options="optionsDisabled" v-model:value="value" button />

<Radio :options="optionsDisabled" v-model:value="value" button button-style="solid" />

<RadioGroup v-model:value="customGroupValue" :options="groupOptions" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { RadioOption, RadioGroupOption } from 'vue-amazing-ui'
const optionsDisabled = ref<RadioOption[]>([
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
const groupOptions = ref<RadioGroupOption[]>([
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
    value: 3,
    disabled: true
  }
])
const value = ref<number>(2)
const groupValue = ref<number>(1)
</script>
<template>
  <Radio :options="optionsDisabled" v-model:value="value" />
  <Radio :options="optionsDisabled" v-model:value="value" button />
  <Radio :options="optionsDisabled" v-model:value="value" button button-style="solid" />
  <RadioGroup v-model:value="groupValue" :options="groupOptions" />
</template>
```

:::

## 自定义选项名

<Radio :options="options" v-model:value="value">
  <template #default="{ option, label, index }">
    <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
    <span v-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
  </template>
</Radio>

<RadioGroup v-model:value="customGroupValue">
  <Radio :value="1">北京市</Radio>
  <Radio :value="2"><span style="color: #ff6900">纽约市</span></Radio>
  <Radio :value="3">布宜诺斯艾利斯</Radio>
  <Radio :value="4"><span style="color: #1677ff">伊斯坦布尔</span></Radio>
</RadioGroup>

<Radio :options="vnodeOptions" v-model:value="vnodeValue" />

<RadioGroup v-model:value="vnodeGroupValue" :options="vnodeGroupOptions" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
const options = ref<RadioOption[]>([
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
const value = ref<number>(2)
const groupValue = ref<number>(1)
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Radio :options="options" v-model:value="value">
    <template #default="{ option, label, index }">
      <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
      <span v-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
    </template>
  </Radio>
  <RadioGroup v-model:value="groupValue">
    <Radio :value="1">北京市</Radio>
    <Radio :value="2"><span style="color: #ff6900">纽约市</span></Radio>
    <Radio :value="3">布宜诺斯艾利斯</Radio>
    <Radio :value="4"><span style="color: #1677ff">伊斯坦布尔</span></Radio>
  </RadioGroup>
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

<Radio :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
const horizontalGap = ref(16)
const verticalGap = ref(8)
const options = ref<RadioOption[]>([
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
const value = ref<number>(2)
watchEffect(() => {
  console.log('value', value.value)
})
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
  <Radio :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
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

<RadioGroup v-model:value="gapGroupValue" :gap="groupGap" :vertical="groupVertical">
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
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
const groupValue = ref<RadioProps['value']>(1)
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
  <RadioGroup v-model:value="groupValue" :gap="groupGap" :vertical="groupVertical">
    <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
  </RadioGroup>
</template>
```

:::

## 按钮大小

_单组件的按钮形态同样支持尺寸切换_

<br/>

<div v-for="item in sizeCases" :key="item.key">
  <RadioGroup v-model:value="groupValues[item.key]" :size="item.size">
    <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
      {{ button.label }}
    </RadioButton>
  </RadioGroup>
</div>

<Radio :options="sizeOptions" v-model:value="buttonSize" />

<Radio v-model:checked="checked" button :size="buttonSize">Radio Button</Radio>

<Radio :options="options" v-model:value="value" button :size="buttonSize" />

<Radio :options="options" v-model:value="value" button button-style="solid" :size="buttonSize" />

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RadioOption, RadioProps } from 'vue-amazing-ui'
const sizeCases: { key: string; size: RadioProps['size'] }[] = [
  { key: 'large', size: 'large' },
  { key: 'middle', size: 'middle' },
  { key: 'small', size: 'small' }
]
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const sizeOptions = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
const groupValues = reactive<Record<string, string | number>>({
  large: 'a',
  middle: 'a',
  small: 'a'
})
const buttonSize = ref<RadioProps['size']>('middle')
const checked = ref<boolean>(false)
// 配置式写法
const options = ref<RadioOption[]>([
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
const value = ref<number>(2)
</script>
<template>
  <div v-for="item in sizeCases" :key="item.key">
    <RadioGroup v-model:value="groupValues[item.key]" :size="item.size">
      <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
        {{ button.label }}
      </RadioButton>
    </RadioGroup>
  </div>
  <Radio :options="sizeOptions" v-model:value="buttonSize" />
  <Radio v-model:checked="checked" button :size="buttonSize">Radio Button</Radio>
  <Radio :options="options" v-model:value="value" button :size="buttonSize" />
  <Radio :options="options" v-model:value="value" button button-style="solid" :size="buttonSize" />
</template>
```

:::

## APIs

### Radio

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
checked <Tag color="cyan">v-model</Tag> | 当前是否选中 | boolean | false
value <Tag color="cyan">v-model</Tag> | 当前选中的值；置于 `RadioGroup` 内时作为本项的身份标识，与组内当前值比较得出选中态 | string &#124; number &#124; boolean | undefined
options | 单选框选项数据 | [RadioOption](#radiooption-type)[] | []
button | 是否启用按钮样式；置于 `RadioGroup` 内时该形态由组的 `optionType` 决定 | boolean | false
buttonStyle | 按钮样式风格；置于 `RadioGroup` 内时以组的配置为准 | 'outline' &#124; 'solid' | 'outline'
size | 尺寸，仅当按钮形态时生效；置于 `RadioGroup` 内时以组的配置为准 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
vertical | 是否垂直排列，仅当 `button: false` 时生效 | boolean | false
gap | 多个单选框之间的间距；垂直排列时为垂直间距，单位 `px`；数组间距用于水平排列折行时：`[水平间距, 垂直间距]`；仅当 `button: false` 时生效 | number &#124; number[] | 8
disabled | 是否禁用 | boolean | false
autofocus | 是否自动聚焦原生 `input` | boolean | false
name | 原生 `input` 的表单字段名；置于 `RadioGroup` 内时以组的配置为准 | string | undefined
id | 原生 `input` 的 `id`；`options` 模式下作为前缀，实际 `id` 追加选项下标 | string | undefined

### RadioGroup

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
value <Tag color="cyan">v-model</Tag> | 组内当前选中的值 | string &#124; number &#124; boolean | undefined
options | 单选框选项数据；提供后组内默认插槽不生效 | (string &#124; number &#124; [RadioGroupOption](#radiogroupoption-type))[] | []
optionType | 组内选项的呈现形态 | 'default' &#124; 'button' | 'default'
buttonStyle | 按钮形态的风格，仅当 `optionType` 为 `button` 时生效 | 'outline' &#124; 'solid' | 'outline'
size | 尺寸，仅作用于按钮形态；未指定时组内各项回落自身尺寸 | 'small' &#124; 'middle' &#124; 'large' | undefined
vertical | 是否垂直排列，仅当 `optionType` 为 `default` 时生效 | boolean | false
gap | 选项间距，单位 `px`；垂直排列时即垂直间距；数组用于水平排列折行时：`[水平间距, 垂直间距]` | number &#124; number[] | 8
disabled | 是否禁用整组，组内单项自身的 `disabled` 在此基础上叠加 | boolean | false
name | 表单字段名，下发到组内每个原生 `input` | string | undefined

### RadioButton

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
checked <Tag color="cyan">v-model</Tag> | 脱离组单独使用时的选中态 | boolean | false
value | 该项的值，置于组内时据此判断选中 | string &#124; number &#124; boolean | undefined
disabled | 是否禁用 | boolean | false
autofocus | 是否自动聚焦原生 `input` | boolean | false
name | 原生 `input` 的表单字段名；置于 `RadioGroup` 内时以组的配置为准 | string | undefined
id | 原生 `input` 的 `id` | string | undefined

### RadioOption Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
label | 选项名，传入 VNode 时原样渲染 | string &#124; number &#124; VNode | undefined
value | 选项值 | string &#124; number &#124; boolean | undefined
disabled? | 是否禁用选项 | boolean | undefined

### RadioGroupOption Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
label? | 选项名，未提供时以选项值展示；传入 VNode 时原样渲染 | string &#124; number &#124; VNode | undefined
value | 选项值 | string &#124; number &#124; boolean | undefined
disabled? | 是否禁用选项 | boolean | undefined

## Slots

### Radio Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 自定义选项名 | v-slot:default="{ option, label, index }"

### RadioGroup Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 组内选项，用于放置 `Radio` 或 `RadioButton` | v-slot:default

### RadioButton Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 按钮文本 | v-slot:default

## Events

### Radio Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 选项变化时的回调函数 | (value: string \| number \| boolean, event: RadioChangeEvent) => void

`event` 为与原生 `input` 的 change 同形态的事件对象，含 `target`（`checked` / `value` / `name` / `disabled` 状态快照）、`nativeEvent` 与 `stopPropagation` / `preventDefault`

### RadioGroup Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 选项变化时的回调函数 | (value: string \| number \| boolean, event: RadioChangeEvent) => void

### RadioButton Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 选项变化时的回调函数 | (value: string \| number \| boolean, event: RadioChangeEvent) => void

## Methods

### Radio Methods

名称 | 说明 | 类型
:-- | :-- | :--
focus | 聚焦组件的原生 `input`；`options` 模式下优先聚焦当前选中项 | () => void
blur | 使组件的原生 `input` 失焦 | () => void
