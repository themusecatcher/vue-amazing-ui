# 间距 Space

<br/>

*设置组件之间的间距*

## 何时使用

避免组件紧贴在一起，拉开统一的空间

- 适合行内元素的水平间距
- 可以设置各种水平对齐方式

<script setup lang="ts">
import { ref } from 'vue'
const options = ref([
      {
        label: 'small',
        value: 'small'
      },
      {
        label: 'middle',
        value: 'middle',
      },
      {
        label: 'large',
        value: 'large'
      }
    ])
const size = ref('small')
</script>

## 水平间距

<Radio :options="options" v-model:value="size" />
<br/><br/>
<Space :size="size">
  <Button type="primary">Primary</Button>
  <Button>Default</Button>
  <Button type="dashed">Dashed</Button>
</Space>

::: details Show Code

```vue
<template>
  <Radio :options="options" v-model:value="size" />
  <br/><br/>
  <Space :size="size">
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
  </Space>
</template>
```

:::

## 垂直间距

<Space direction="vertical">
  <Card title="Card" style="width: 300px">
    <p>Card content</p>
    <p>Card content</p>
  </Card>
  <Card title="Card" style="width: 300px">
    <p>Card content</p>
    <p>Card content</p>
  </Card>
</Space>

::: details Show Code

```vue
<template>
  <Space direction="vertical">
    <Card title="Card" style="width: 300px">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Card" style="width: 300px">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
</template>
```

:::

## 自动换行

<Space :size="[8, 16]" wrap>
  <template v-for="n in 10" :key="n">
    <Button>Button</Button>
  </template>
</Space>

::: details Show Code

```vue
<template>
  <Space :size="[8, 16]" wrap>
    <template v-for="n in 10" :key="n">
      <Button>Button</Button>
    </template>
  </Space>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
align | 对齐方式 | 'start' &#124; 'end' &#124; 'center' &#124; 'baseline' | undefined | false
direction | 间距方向 | 'horizontal' &#124; 'vertical' | 'horizontal' | false
size | 间距大小，数组时表示: [水平间距, 垂直间距] | number &#124; number[] &#124; 'small' &#124; 'middle' &#124; 'large' | 'small' | false
wrap | 是否自动换行，仅在 horizontal 时有效 | boolean | false | false
