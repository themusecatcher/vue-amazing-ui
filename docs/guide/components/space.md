# 间距 Space

<GlobalElement />

*设置组件之间的间距*

## 何时使用

避免组件紧贴在一起，拉开统一的空间

- 适合行内元素的水平间距
- 可以设置各种水平对齐方式

<script setup lang="ts">
import { ref } from 'vue'
const gapOptions = ref([
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
  },
  {
    label: 'customize',
    value: 'customize'
  }
])
const gapSize = ref('middle')
const customGapSize = ref(16)
</script>

## 基本使用

<Space align="center">
  Space
  <Button type="primary">Button</Button>
  <Popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No">
    <Button>Confirm</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<template>
  <Space align="center">
    Space
    <Button type="primary">Button</Button>
    <Popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No">
      <Button>Confirm</Button>
    </Popconfirm>
  </Space>
</template>
```

:::

## 设置间距

<Flex vertical>
  <Radio :options="gapOptions" v-model:value="gapSize" />
  <Slider v-if="gapSize === 'customize'" v-model:value="customGapSize" />
  <Space :gap="gapSize !== 'customize' ? gapSize : customGapSize">
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="link">Link</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const gapOptions = ref([
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
  },
  {
    label: 'customize',
    value: 'customize'
  }
])
const gapSize = ref('middle')
const customGapSize = ref(16)
</script>
<template>
  <Flex vertical>
    <Radio :options="gapOptions" v-model:value="gapSize" />
    <Slider v-if="gapSize === 'customize'" v-model:value="customGapSize" />
    <Space :gap="gapSize !== 'customize' ? gapSize : customGapSize">
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </Space>
  </Flex>
</template>
```

:::

## 垂直间距

<Space vertical>
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
  <Space vertical>
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

## 对齐

<div class="space-align-container">
  <div class="space-align-block">
    <Space align="center">
      center
      <Button type="primary">Primary</Button>
      <span class="mock-block">Block</span>
    </Space>
  </div>
  <div class="space-align-block">
    <Space align="start">
      start
      <Button type="primary">Primary</Button>
      <span class="mock-block">Block</span>
    </Space>
  </div>
  <div class="space-align-block">
    <Space align="end">
      end
      <Button type="primary">Primary</Button>
      <span class="mock-block">Block</span>
    </Space>
  </div>
  <div class="space-align-block">
    <Space align="baseline">
      baseline
      <Button type="primary">Primary</Button>
      <span class="mock-block">Block</span>
    </Space>
  </div>
</div>

<style lang="less" scoped>
.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.space-align-block {
  margin: 8px 4px;
  border: 1px solid #40a9ff;
  padding: 4px;
  flex: none;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}
</style>

::: details Show Code

```vue
<template>
  <div class="space-align-container">
    <div class="space-align-block">
      <Space align="center">
        center
        <Button type="primary">Primary</Button>
        <span class="mock-block">Block</span>
      </Space>
    </div>
    <div class="space-align-block">
      <Space align="start">
        start
        <Button type="primary">Primary</Button>
        <span class="mock-block">Block</span>
      </Space>
    </div>
    <div class="space-align-block">
      <Space align="end">
        end
        <Button type="primary">Primary</Button>
        <span class="mock-block">Block</span>
      </Space>
    </div>
    <div class="space-align-block">
      <Space align="baseline">
        baseline
        <Button type="primary">Primary</Button>
        <span class="mock-block">Block</span>
      </Space>
    </div>
  </div>
</template>
<style lang="less" scoped>
.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.space-align-block {
  margin: 8px 4px;
  border: 1px solid #40a9ff;
  padding: 4px;
  flex: none;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}
</style>
```

:::

## 自动换行

<Space :gap="[8, 16]">
  <template v-for="n in 16" :key="n">
    <Button type="primary">Button</Button>
  </template>
</Space>
<br/>
<br/>

::: details Show Code

```vue
<template>
  <Space :gap="[8, 16]">
    <template v-for="n in 16" :key="n">
      <Button type="primary">Button</Button>
    </template>
  </Space>
</template>
```

:::

## APIs

### Space

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
width | 区域总宽度，单位 `px` | string &#124; number | 'auto'
align | 垂直排列方式 | 'stretch' &#124; 'start' &#124; 'end' &#124; 'center' &#124; 'baseline' | 'start'
vertical | 是否为垂直布局 | boolean | false
gap | 间距大小，数组时表示: `[水平间距, 垂直间距]` | number &#124; number[] &#124; 'small' &#124; 'middle' &#124; 'large' | 'middle'
wrap | 是否自动换行，仅在 `horizontal` 时有效 | boolean | true
