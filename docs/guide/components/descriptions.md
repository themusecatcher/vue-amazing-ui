# 描述列表 Descriptions<Badge type="warning">开发中...</Badge>

<br/>

*成组展示多个只读字段*

## 何时使用

- 常见于详情页的信息展示

## 基本使用

<Descriptions title="User Info">
  <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
  <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
  <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
  <DescriptionsItem label="Remark">empty</DescriptionsItem>
  <DescriptionsItem label="Address" :span="2">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </DescriptionsItem>
</Descriptions>

## APIs

### Descriptions

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 描述列表的标题，显示在最顶部 | string &#124; slot | '' | false
bordered | 是否展示边框 | boolean | false | false
column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 | false
extra | 描述列表的操作区域，显示在右上方 | string | '' | false
layout | 描述布局 | 'horizontal' &#124; 'vertical' | 'horizontal' | false
size | 设置列表的大小 | 'default' &#124; 'middle' &#124; 'small' | 'default'

### DescriptionsItem

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
label | 内容的描述标签 | string &#124; slot | '' | false
labelStyle | 自定义标签样式 | CSSProperties | {} | false
contentStyle | 自定义内容样式 | CSSProperties | {} | false
span | 包含列的数量 | number | 1 | false
