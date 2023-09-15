# 文本域 Textarea<BackTop />

<br/>

*用于多行输入*

## 何时使用

- 需要文本域输入较多内容时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
const lazyValue = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
watchEffect(() => {
  console.log('lazyValue:', lazyValue.value)
})
function onChange (e: Event) {
  console.log('change e:', e)
}
function onEnter (e: KeyboardEvent) {
  console.log('enter e:', e)
}
</script>

## 基本使用

::: tip .lazy
默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据

```vue
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

:::

<Space direction="vertical">
  <Textarea
    v-model:value="value"
    placeholder="Basic usage rows 2"
    :rows="2"
    @change="onChange"
    @enter="onEnter" />
  <Textarea
    v-model:value.lazy="lazyValue"
    placeholder="Lazy usage rows 2"
    :rows="2"
    @change="onChange" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
const lazyValue = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
watchEffect(() => {
  console.log('lazyValue:', lazyValue.value)
})
function onChange (e: Event) {
  console.log('change e:', e)
}
function onEnter (e: KeyboardEvent) {
  console.log('enter e:', e)
}
</script>
<template>
  <Space direction="vertical">
    <Textarea
      v-model:value="value"
      placeholder="Basic usage rows 2"
      :rows="2"
      @change="onChange"
      @enter="onEnter" />
    <Textarea
      v-model:value.lazy="lazyValue"
      placeholder="Lazy usage rows 2"
      :rows="2"
      @change="onChange" />
  </Space>
</template>
```

:::

## 适应文本高度的文本域

<Space>
  <Textarea
    v-model:value="value"
    placeholder="Autosize height based on content lines"
    auto-size
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space>
    <Textarea
      v-model:value="value"
      placeholder="Autosize height based on content lines"
      auto-size
    />
  </Space>
</template>
```

:::

## 设置行数

<Space>
  <Textarea
    v-model:value="value"
    placeholder="Autosize height with minimum and maximum number of lines"
    :auto-size="{ minRows: 2, maxRows: 5 }"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space>
    <Textarea
      v-model:value="value"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
  </Space>
</template>
```

:::

## 带移除图标

<Space>
  <Textarea v-model:value="value" placeholder="textarea with clear icon" allow-clear />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space>
    <Textarea v-model:value="value" placeholder="textarea with clear icon" allow-clear />
  </Space>
</template>
```

:::

## 带数字提示

<Space>
  <Textarea v-model:value="value" show-count :maxlength="10" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space>
    <Textarea v-model:value="value" show-count :maxlength="10" />
  </Space>
</template>
```

:::

## 禁用

<Space>
  <Textarea v-model:value="value" disabled />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space>
    <Textarea v-model:value="value" disabled />
  </Space>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 文本域宽度 | string &#124; number | '100%' | false
allowClear | 可以点击清除图标删除内容 | boolean | false | false
autoSize | 自适应内容高度 | boolean &#124; {minRows\?: number, maxRows?: number} | false | false
disabled | 是否禁用 | boolean | false | false
maxlength | 最大长度 | number | undefined | false
showCount | 是否展示字数 | boolean | false | false
value <Tag color="cyan">v-model</Tag> | 文本域内容 | string | '' | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 文本域内容变化时的回调 | (e: Event) => void
enter | 按下回车的回调 | (e: Event) => void
