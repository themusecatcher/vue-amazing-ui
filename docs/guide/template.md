# 模板 Template

<GlobalElement />

_模板文件_

## 何时使用

- 当需要添加新组件时

<script setup lang="ts">
</script>

## 基本使用

::: details Show Code

```vue
<script lang="ts" setup>
</script>
<template>
</template>
```

:::

## APIs

### Template Props

<!-- 首列固定「名称」。双向绑定加 <Tag color="cyan">v-model</Tag>；必填加 <Tag color="red">required</Tag>（默认值列同时写 `—`），两者并存时 v-model 在前 -->

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |

<!-- 类型章节：标题 = 属性表引用的公开导出名 + ` Type`。只有两种形态：有字段 3 列 / 无字段 2 列，类型表不含「默认值」列 -->

<!-- ① 有字段（接口 / 对象结构 / 回调 / 实例信息）：3 列，可选字段名后加 `?`（与源码 interface 逐字段一致）；源码带索引签名时列出 `[propName: string]` 行（不加 `?`，名称与类型统一 `[propName: string]` / `any`） -->

### TemplateItem Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |

<!-- ② 组件产出的回调 / 实例信息也归入 3 列，表前加一句「以下字段均由组件产出，无需传入」；字段全必填时不加 `?` -->

### TemplateInfo Type

> 以下字段均由组件产出，无需传入。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |

<!-- ③ 类型别名 / 联合 / 枚举（无字段）：2 列 -->

### TemplateKey Type

| 名称 | 值 |
| :-- | :-- |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |

<!-- 组件暴露主题变量时才加本节；固定 3 列，首列「名称」写 --va-<组件>-* 全名 -->

## CSS 变量

| 名称 | 说明 | 默认值 |
| :-- | :-- | :-- |
