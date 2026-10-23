# 输入框 Input

<GlobalElement />

_通过鼠标或键盘输入内容，是最基础的表单域的包装_

## 何时使用

- 需要用户输入表单域内容时
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  UserOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  EnvironmentOutlined,
  CompassOutlined
} from '@ant-design/icons-vue'
const value = ref('')
const lazyValue = ref('')
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
const size = ref('middle')
watchEffect(() => {
  console.log('value', value.value)
})
watchEffect(() => {
  console.log('lazyValue', lazyValue.value)
})
function onChange(e: Event) {
  console.log('change', e)
}
function onEnter(e: KeyboardEvent) {
  console.log('enter', e)
}
</script>

## 基本使用

::: tip `.lazy` 默认情况下，`v-model` 会在每次 `input` 事件后更新数据 (`IME` 拼字阶段的状态例外)。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据

```vue
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<Input v-model:value.lazy="msg" />
```

:::

<Space gap="small" vertical :width="200">
  <Input v-model:value="value" placeholder="Basic usage" @change="onChange" @enter="onEnter" />
  <Input v-model:value.lazy="lazyValue" placeholder="Lazy usage" @change="onChange" @enter="onEnter" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
const lazyValue = ref('')
watchEffect(() => {
  console.log('value', value.value)
})
watchEffect(() => {
  console.log('lazyValue', lazyValue.value)
})
function onChange(e: Event) {
  console.log('change', e)
}
function onEnter(e: KeyboardEvent) {
  console.log('enter', e)
}
</script>
<template>
  <Space gap="small" vertical :width="200">
    <Input v-model:value="value" placeholder="Basic usage" @change="onChange" @enter="onEnter" />
    <Input v-model:value.lazy="lazyValue" placeholder="Lazy usage" @change="onChange" @enter="onEnter" />
  </Space>
</template>
```

:::

## 未受控输入与行内混排

_未绑定 `v-model` 时输入内容由组件自行承载，不会因悬浮 / 聚焦等状态变化丢失_

<br/>

<Input placeholder="未绑定 v-model，输入后移开鼠标内容仍保留" style="width: 280px" />

::: tip 未受控用法
不绑定 `v-model` 时，输入框仅作为展示载体：输入内容（含输入法合成中的文本）由组件内部承载，悬浮 / 聚焦等状态变化都不会将其抹掉；但组件不会向外上报值，需要取值、校验或受控渲染时请绑定 `v-model` 或监听 `change` 事件。
:::

_与文字混排时按基线对齐，与原生 `input` 同口径_

<br/>

<div style="display: flex; align-items: center; height: 32px; gap: 8px">
  <span>姓名</span>
  <Input placeholder="与文字同行" style="width: 200px" />
</div>

::: tip 行内混排对齐约定
控件与文字同处一行时按基线对齐（与原生 `input` 同口径）。若该行还会有其它行内控件动态出现 / 消失，行容器必须改用**盒对齐并固定行高**（如 `display: flex; align-items: center;`，行高取控件高度且不得矮于控件）：行内元素的出现 / 消失会改变所在行盒的基线，仅靠基线对齐的容器会产生约 `1px` 的整行位移（原生控件同样如此，属 `CSS` 固有行为）。
:::

::: details Show Code

```vue
<template>
  <!-- 未受控：内容由组件内部承载 -->
  <Input placeholder="未绑定 v-model，输入后移开鼠标内容仍保留" style="width: 280px" />
  <!-- 行内混排：行容器盒对齐并固定行高，避免控件动态出现 / 消失时整行位移 -->
  <div style="display: flex; align-items: center; height: 32px; gap: 8px">
    <span>姓名</span>
    <Input placeholder="与文字同行" style="width: 200px" />
  </div>
</template>
```

:::

## 前缀和后缀

<Space gap="small" vertical :width="300">
  <Input v-model:value="value" placeholder="Basic usage" prefix="￥" suffix="RMB" />
  <Input v-model:value="value" placeholder="Basic usage">
    <template #prefix>
      <UserOutlined />
    </template>
    <template #suffix>
      <Tooltip :max-width="150" tooltip="Extra information">
        <InfoCircleOutlined />
      </Tooltip>
    </template>
  </Input>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
const value = ref('')
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Space gap="small" vertical :width="300">
    <Input v-model:value="value" placeholder="Basic usage" prefix="￥" suffix="RMB" />
    <Input v-model:value="value" placeholder="Basic usage">
      <template #prefix>
        <UserOutlined />
      </template>
      <template #suffix>
        <Tooltip :max-width="150" tooltip="Extra information">
          <InfoCircleOutlined />
        </Tooltip>
      </template>
    </Input>
  </Space>
</template>
```

:::

## 前置和后置标签

<Space gap="small" vertical :width="300">
  <Input
    v-model:value="value"
    placeholder="Basic usage"
    addon-before="Http://"
    addon-after=".com"
  />
  <Input v-model:value="value" placeholder="Basic usage">
    <template #addonAfter>
      <SettingOutlined />
    </template>
  </Input>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue'
const value = ref('')
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Space gap="small" vertical :width="300">
    <Input v-model:value="value" placeholder="Basic usage" addon-before="Http://" addon-after=".com" />
    <Input v-model:value="value" placeholder="Basic usage">
      <template #addonAfter>
        <SettingOutlined />
      </template>
    </Input>
  </Space>
</template>
```

:::

## 三种大小

<Space gap="small" vertical :width="240">
  <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Input v-model:value="value" :size="size" placeholder="Basic usage" />
  <Input
    v-model:value="value"
    :size="size"
    placeholder="Basic usage"
  >
    <template #prefix>
      <UserOutlined />
    </template>
    <template #suffix>
      <InfoCircleOutlined />
    </template>
  </Input>
  <Input
    v-model:value="value"
    :size="size"
    placeholder="Basic usage"
  >
    <template #addonBefore>
      <EnvironmentOutlined />
    </template>
    <template #addonAfter>
      <CompassOutlined />
    </template>
  </Input>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { UserOutlined, InfoCircleOutlined, EnvironmentOutlined, CompassOutlined } from '@ant-design/icons-vue'
const value = ref('')
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
const size = ref('middle')
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Space gap="small" vertical :width="240">
    <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Input v-model:value="value" :size="size" placeholder="Basic usage" />
    <Input v-model:value="value" :size="size" placeholder="Basic usage">
      <template #prefix>
        <UserOutlined />
      </template>
      <template #suffix>
        <InfoCircleOutlined />
      </template>
    </Input>
    <Input v-model:value="value" :size="size" placeholder="Basic usage">
      <template #addonBefore>
        <EnvironmentOutlined />
      </template>
      <template #addonAfter>
        <CompassOutlined />
      </template>
    </Input>
  </Space>
</template>
```

:::

## 带清除图标

<Input :width="200" allow-clear v-model:value="value" placeholder="input with clear icon" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Input :width="200" allow-clear v-model:value="value" placeholder="input with clear icon" />
</template>
```

:::

## 密码框

<Input :width="200" password v-model:value="value" placeholder="input password" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Input :width="200" password v-model:value="value" placeholder="input password" />
</template>
```

:::

## 带字数提示

<Space vertical>
  <Input show-count allow-clear v-model:value="value" placeholder="please input" />
  <Input show-count allow-clear v-model:value="value" :maxlength="20" placeholder="please input" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Space vertical>
    <Input show-count allow-clear v-model:value="value" placeholder="please input" />
    <Input show-count allow-clear v-model:value="value" :maxlength="20" placeholder="please input" />
  </Space>
</template>
```

:::

## 禁用

<Input :width="200" disabled v-model:value="value" placeholder="disabled input" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Input :width="200" disabled v-model:value="value" placeholder="disabled input" />
</template>
```

:::

## APIs

### Input Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width | 输入框宽度，单位 `px` | string &#124; number | '100%' |
| size | 输入框大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| addonBefore | 设置前置标签 | string | undefined |
| addonAfter | 设置后置标签 | string | undefined |
| prefix | 前缀图标 | string | undefined |
| suffix | 后缀图标 | string | undefined |
| allowClear | 可以点击清除图标删除内容 | boolean | false |
| password | 是否启用密码框 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| placeholder | 文本输入的占位符 | string | undefined |
| maxlength | 最大长度 | number | undefined |
| showCount | 是否展示字数 | boolean | false |
| value <Tag color="cyan">v-model</Tag> | 输入框内容 | string | undefined |

## Slots

| 名称       | 说明          | 用法               |
| :---------- | :------------- | :----------------- |
| addonBefore | 自定义前置标签 | v-slot:addonBefore |
| addonAfter | 自定义后置标签 | v-slot:addonAfter  |
| prefix     | 自定义前缀图标 | v-slot:prefix      |
| suffix     | 自定义后缀图标 | v-slot:suffix      |

## Events

| 名称            | 说明                                              | 类型                          |
| :--------------- | :------------------------------------------------- | :---------------------------- |
| change          | 输入框内容变化时的回调                            | (e: Event) => void            |
| enter           | 按下回车的回调                                    | (e: KeyboardEvent) => void    |
| compositionstart | 使用文本合成系统即输入法编辑器开始新的输入时的回调 | (e: CompositionEvent) => void |
| compositionend  | 当文本段落的组成完成或取消时触发的回调            | (e: CompositionEvent) => void |
