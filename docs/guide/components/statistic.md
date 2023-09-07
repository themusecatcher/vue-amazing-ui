# 统计数值 Statistic

<br/>

*展示统计数值*

## 何时使用

- 当需要突出某个或某组数字时
- 当需要展示带描述的统计类数据时使用

<script setup lang="ts">
function formatter (value: string): string {
  console.log('value', value)
  return '1年有 ' + value + ' 天'
}
</script>

## 基本使用

<ClientOnly>
  <Row>
    <Col :span="12">
      <Statistic title="Active Users" :value="112893" />
    </Col>
    <Col :span="12">
      <Statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
    </Col>
  </Row>
</ClientOnly>

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

<ClientOnly>
  <Row :gutter="16">
    <Col :span="12">
      <Statistic title="Feedback" :value="1128">
        <template #suffix>
          <svg focusable="false" class="u-svg" data-icon="like" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path></svg>
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
</ClientOnly>

::: details Show Code

```vue
<template>
  <Row :gutter="16">
    <Col :span="12">
      <Statistic title="Feedback" :value="1128">
        <template #suffix>
          <svg focusable="false" class="u-svg" data-icon="like" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path></svg>
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
<style lang="less" scoped>
.u-svg {
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-align: center;
  vertical-align: -0.125em;
}
</style>
```

:::

## 在卡片中使用

<ClientOnly>
  <div style="width: 425px; background: #ececec; padding: 30px">
    <Row :gutter="16">
      <Col :span="12">
        <Card>
          <Statistic
            title="Feedback"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px">
            <template #prefix>
              <svg focusable="false" class="u-svg-up" data-icon="arrow-up" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path></svg>
            </template>
          </Statistic>
        </Card>
      </Col>
      <Col :span="12">
        <Card>
          <Statistic
            title="Idle"
            :value="9.3"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#cf1322' }">
            <template #prefix>
              <svg focusable="false" class="u-svg-down" data-icon="arrow-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg>
            </template>
          </Statistic>
        </Card>
      </Col>
    </Row>
  </div>
</ClientOnly>

::: details Show Code

```vue
<template>
  <div style="width: 425px; background: #ececec; padding: 30px">
    <Row :gutter="16">
      <Col :span="12">
        <Card>
          <Statistic
            title="Feedback"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px">
            <template #prefix>
              <svg focusable="false" class="u-svg" data-icon="arrow-up" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path></svg>
            </template>
          </Statistic>
        </Card>
      </Col>
      <Col :span="12">
        <Card>
          <Statistic
            title="Idle"
            :value="9.3"
            :precision="2"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#cf1322' }">
            <template #prefix>
              <svg focusable="false" class="u-svg" data-icon="arrow-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg>
            </template>
          </Statistic>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<style lang="less" scoped>
.u-svg {
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-align: center;
  vertical-align: -0.125em;
}
</style>
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

<style lang="less" scoped>
.u-svg-up {
  display: inline-flex;
  align-items: center;
  fill: #3f8600;
  text-align: center;
  vertical-align: -0.125em;
}
.u-svg-down {
  display: inline-flex;
  align-items: center;
  fill: #cf1322;
  text-align: center;
  vertical-align: -0.125em;
}
.u-svg {
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-align: center;
  vertical-align: -0.125em;
}
</style>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 数值的标题 | string | '' | false
value | 数值的内容 | string &#124; number &#124; slot | '' | false
valueStyle | 设置数值的样式 | CSSProperties | {} | false
precision | 数值精度 | number | 0 | false
prefix | 设置数值的前缀 | string &#124; slot | '' | false
suffix | 设置数值的后缀 | string &#124; slot | '' | false
separator | 设置千分位标识符 | string | ',' | false
formatter | 自定义数值展示 | Function | (value: string) => value | false