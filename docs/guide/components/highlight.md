# 高亮文本 Highlight

<GlobalElement />

*用过搜索引擎的都知道我是做什么的*

## 何时使用

- 需要对搜索结果中指定文本高亮时

<script setup lang="ts">
import { ref } from 'vue'
const text = ref('Vue Amazing UI 是一个 Vue3 的组件库，主题可调，全量使用 TypeScript 和 SFC，支持 tree shaking，有点意思')
const patterns = ref(['Vue Amazing UI', 'Vue3', 'TypeScript', 'SFC', 'tree shaking'])
</script>

## 基本使用

<Highlight :text="text" :patterns="patterns" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const text = ref(
  'Vue Amazing UI 是一个 Vue3 的组件库，主题可调，全量使用 TypeScript 和 SFC，支持 tree shaking，有点意思'
)
const patterns = ref(['Vue Amazing UI', 'Vue3', 'TypeScript', 'SFC', 'tree shaking'])
</script>
<template>
  <Highlight :text="text" :patterns="patterns" />
</template>
```

:::

## 样式

<Highlight
  text="Vue Amazing UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接"
  :patterns="['Vue Amazing UI', 'TypeScript']"
  :highlight-style="{
    padding: '0 6px',
    borderRadius: '3px',
    display: 'inline-block',
    color: '#fff',
    background: '#1677ff',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }"
/>

::: details Show Code

```vue
<template>
  <Highlight
    text="Vue Amazing UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接"
    :patterns="['Vue Amazing UI', 'TypeScript']"
    :highlight-style="{
      padding: '0 6px',
      borderRadius: '3px',
      display: 'inline-block',
      color: 'rgb(255, 255, 255)',
      background: 'rgb(24, 160, 88)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }"
  />
</template>
```

:::

## 区分大小写

<Highlight
  text="Vue Amazing UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接"
  :patterns="['Vue Amazing UI', 'typeScript']"
  case-sensitive
/>

::: details Show Code

```vue
<template>
  <Highlight
    text="Vue Amazing UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接"
    :patterns="['Vue Amazing UI', 'typeScript']"
    case-sensitive
  />
</template>
```

:::

## 高亮标签

<Highlight
  :text="text"
  :patterns="patterns"
  highlight-tag="span"
  :highlight-style="{ fontWeight: '500', color: '#ff6900', textDecoration: 'underline' }"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const text = ref(
  'Vue Amazing UI 是一个 Vue3 的组件库，主题可调，全量使用 TypeScript 和 SFC，支持 tree shaking，有点意思'
)
const patterns = ref(['Vue Amazing UI', 'Vue3', 'TypeScript', 'SFC', 'tree shaking'])
</script>
<template>
  <Highlight
    :text="text"
    :patterns="patterns"
    highlight-tag="span"
    :highlight-style="{ fontWeight: '500', color: '#ff6900', textDecoration: 'underline' }"
  />
</template>
```

:::

## APIs

### Highlight

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
text | 文本 | string | undefined
patterns | 需要高亮的文本内容 | string[] | []
autoEscape | 自动转义。默认情况下，`patterns` 中的元素会被转化为正则表达式进行匹配，这个过程中需要进行自动转义，正则表达式最终匹配的是元素的字面内容，例如 `\(` 匹配的就是 `\(`。如果你需要 `Highlight` 组件去匹配使用 `patterns` 中元素本身构造的正则表达式，例如 `\(` 匹配的是 `(`，则可以设为 `false`。如果你看不懂这些，不要改这个设置。 | boolean | true
caseSensitive | 区分大小写 | boolean | false
highlightTag | 高亮内容的 `HTML` 元素类型 | string | 'mark'
highlightClass | 高亮内容的类名 | string | undefined
highlightStyle | 高亮内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
