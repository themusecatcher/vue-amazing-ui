# 分割线 Divider

<br/>

*区隔内容的分割线*

## 何时使用

- 对不同章节的文本段落进行分割
- 对行内文字/链接进行分割

## 基本使用

<Divider>Center Text</Divider>

## 中间无文字

<Divider />

## 指定文字位置

<Divider orientation="left">Left Text</Divider>
<Divider orientation="right">Right Text</Divider>

## 文字居左(右)并距左(右)边120px

<Divider orientation="left" :orientation-margin="120">Left Text</Divider>
<Divider orientation="right" :orientation-margin="120">Right Text</Divider>

## 使用虚线

<Divider dashed>Center Text</Divider>

## 分割线线宽3px

<Divider :borderWidth="3">Center Text</Divider>

## 基本使用

<Breadcrumb :routes="routes" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
</script>
<template>
  <Breadcrumb :routes="routes" />
</template>
```

</details>
