# 统计数值 Statistic

<GlobalElement />

*展示统计数值*

## 何时使用

- 当需要突出某个或某组数字时
- 当需要展示带描述的统计类数据时使用

<script setup lang="ts">
import { LikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
function formatter(value: string): string {
  console.log('value', value)
  return '1年有 ' + value + ' 天'
}
</script>

## 基本使用

<Row>
  <Col :span="12">
    <Statistic title="Active Users" :value="112893" />
  </Col>
  <Col :span="12">
    <Statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Row>
    <Col :span="12">
      <Statistic title="Active Users" :value="112893" />
    </Col>
    <Col :span="12">
      <Statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
    </Col>
  </Row>
</template>
```

:::

## 添加前缀和后缀

<Row :gutter="16">
  <Col :span="12">
    <Statistic title="Feedback" :value="1128">
      <template #suffix>
        <LikeOutlined />
      </template>
    </Statistic>
  </Col>
  <Col :span="12">
    <Statistic title="Unmerged" :value="90">
      <template #suffix>
        <span>%</span>
      </template>
    </Statistic>
  </Col>
</Row>

::: details Show Code

```vue
<script setup lang="ts">
import { LikeOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Row :gutter="16">
    <Col :span="12">
      <Statistic title="Feedback" :value="1128">
        <template #suffix>
          <LikeOutlined />
        </template>
      </Statistic>
    </Col>
    <Col :span="12">
      <Statistic title="Unmerged" :value="90">
        <template #suffix>
          <span>%</span>
        </template>
      </Statistic>
    </Col>
  </Row>
</template>
```

:::

## 在卡片中使用

<div style="width: 425px; background: #ececec; padding: 30px; border-radius: 8px;">
  <Row :gutter="16">
    <Col :span="12">
      <Card>
        <Statistic
          title="Feedback"
          :value="11.28"
          :precision="2"
          suffix="%"
          :value-style="{ color: '#3f8600' }"
          style="margin-right: 50px"
        >
          <template #prefix>
            <ArrowUpOutlined />
          </template>
        </Statistic>
      </Card>
    </Col>
    <Col :span="12">
      <Card>
        <Statistic title="Idle" :value="9.3" :precision="2" suffix="%" :value-style="{ color: '#cf1322' }">
          <template #prefix>
            <ArrowDownOutlined />
          </template>
        </Statistic>
      </Card>
    </Col>
  </Row>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <div style="width: 425px; background: #ececec; padding: 30px; border-radius: 8px;">
    <Row :gutter="16">
      <Col :span="12">
        <Card>
          <Statistic
            title="Feedback"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
            <template #prefix>
              <ArrowUpOutlined />
            </template>
          </Statistic>
        </Card>
      </Col>
      <Col :span="12">
        <Card>
          <Statistic title="Idle" :value="9.3" :precision="2" suffix="%" :value-style="{ color: '#cf1322' }">
            <template #prefix>
              <ArrowDownOutlined />
            </template>
          </Statistic>
        </Card>
      </Col>
    </Row>
  </div>
</template>
```

:::

## 自定义数值样式

<Statistic
  title="Worth"
  :value="1600000"
  :value-style="{ color: '#3f8600' }"
  prefix="$"
  suffix="/ 天" />

::: details Show Code

```vue
<template>
  <Statistic
    title="Worth"
    :value="1600000"
    :value-style="{ color: '#3f8600' }"
    prefix="$"
    suffix="/ 天" />
</template>
```

:::

## 设置数值精度

<Statistic
  title="Precision"
  :value="100000000.1"
  :precision="2" />

::: details Show Code

```vue
<template>
  <Statistic
    title="Precision"
    :value="100000000.1"
    :precision="2" />
</template>
```

:::

## 自定义分隔符

<Statistic
  title="Precision"
  :value="100000000.1"
  separator=";"
  :precision="3" />

::: details Show Code

```vue
<template>
  <Statistic
    title="Precision"
    :value="100000000.1"
    separator=";"
    :precision="3" />
</template>
```

:::

## 自定义数值展示

<Statistic
  title="Formatter"
  :value="365"
  :value-style="{ color: '#1677ff' }"
  :formatter="formatter" />

::: details Show Code

```vue
<script setup lang="ts">
function formatter (value: string): string {
  console.log('value', value)
  return '1年有 ' + value + ' 天'
}
</script>
<template>
  <Statistic
    title="Formatter"
    :value="365"
    :value-style="{ color: '#1677ff' }"
    :formatter="formatter" />
</template>
```

:::

## APIs

### Statistic

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
title | 数值的标题 | string | undefined
value | 数值的内容 | string &#124; number &#124; slot | undefined
valueStyle | 设置数值的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
precision | 数值精度 | number | 0
prefix | 设置数值的前缀 | string &#124; slot | undefined
suffix | 设置数值的后缀 | string &#124; slot | undefined
separator | 设置千分位标识符 | string | ','
formatter | 自定义数值展示 | Function | (value: string) => value
