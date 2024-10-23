# 文本域 Textarea

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者✨"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

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

::: tip `.lazy`
默认情况下，`v-model` 会在每次 `input` 事件后更新数据 (`IME` 拼字阶段的状态例外)。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据

```vue
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<Textarea v-model:value.lazy="msg" />
```

:::

<Space vertical :width="480">
  <Textarea v-model:value="value" placeholder="Basic usage rows 2" :rows="2" @change="onChange" @enter="onEnter" />
  <Textarea
    v-model:value.lazy="lazyValue"
    placeholder="Lazy usage rows 2"
    :rows="2"
    @change="onChange"
    @enter="onEnter"
  />
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
  <Space vertical :width="480">
    <Textarea v-model:value="value" placeholder="Basic usage rows 2" :rows="2" @change="onChange" @enter="onEnter" />
    <Textarea
      v-model:value.lazy="lazyValue"
      placeholder="Lazy usage rows 2"
      :rows="2"
      @change="onChange"
      @enter="onEnter"
    />
  </Space>
</template>
```

:::

## 适应文本高度的文本域

<Space :width="480">
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
  <Space :width="480">
    <Textarea
      v-model:value="value"
      placeholder="Autosize height based on content lines"
      auto-size
    />
  </Space>
</template>
```

:::

## 自定义行数

<Space :width="480">
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
  <Space :width="480">
    <Textarea
      v-model:value="value"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
  </Space>
</template>
```

:::

## 带清除图标

<Space :width="480">
  <Textarea v-model:value="value" placeholder="textarea with clear icon" allow-clear />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space :width="480">
    <Textarea v-model:value="value" placeholder="textarea with clear icon" allow-clear />
  </Space>
</template>
```

:::

## 带数字提示

<Space :width="480">
  <Textarea v-model:value="value" show-count :maxlength="10" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space :width="480">
    <Textarea v-model:value="value" show-count :maxlength="10" />
  </Space>
</template>
```

:::

## 禁用

<Space :width="480">
  <Textarea v-model:value="value" disabled />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <Space :width="480">
    <Textarea v-model:value="value" disabled />
  </Space>
</template>
```

:::

## APIs

### Textarea

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 文本域宽度，单位 `px` | string &#124; number | '100%'
allowClear | 可以点击清除图标删除内容 | boolean | false
autoSize | 自适应内容高度 | boolean &#124; {minRows\?: number, maxRows?: number} | false
disabled | 是否禁用 | boolean | false
placeholder | 文本域输入的占位符 | string | undefined
maxlength | 文字最大长度 | number | undefined
showCount | 是否展示字数 | boolean | false
value <Tag color="cyan">v-model</Tag> | 文本域内容 | string | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
change | 文本域内容变化时的回调 | (e: Event) => void
enter | 按下回车的回调 | (e: Event) => void
