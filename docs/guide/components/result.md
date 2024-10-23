# 结果 Result

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="✨ 成为赞助者 !"
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

*用于反馈一系列操作任务的处理结果*

## 何时使用

- 当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用

<script setup lang="ts">
import { CloseCircleOutlined, SmileTwoTone } from '@ant-design/icons-vue'
</script>

## 成功的结果

<Result
  status="success"
  title="Successfully Purchased Cloud Server ECS!"
  sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
>
  <template #extra>
    <Button key="console" type="primary">Go Console</Button>
    <Button key="buy">Buy Again</Button>
  </template>
</Result>

::: details Show Code

```vue
<template>
  <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <template #extra>
      <Button key="console" type="primary">Go Console</Button>
      <Button key="buy">Buy Again</Button>
    </template>
  </Result>
</template>
```

:::

## 展示处理结果

<Result title="Your operation has been executed">
  <template #extra>
    <Button key="console" type="primary">Go Console</Button>
  </template>
</Result>

::: details Show Code

```vue
<template>
  <Result title="Your operation has been executed">
    <template #extra>
      <Button key="console" type="primary">Go Console</Button>
    </template>
  </Result>
</template>
```

:::

## 警告类型的结果

<Result status="warning" title="There are some problems with your operation.">
  <template #extra>
    <Button key="console" type="primary">Go Console</Button>
  </template>
</Result>

::: details Show Code

```vue
<template>
  <Result status="warning" title="There are some problems with your operation.">
    <template #extra>
      <Button key="console" type="primary">Go Console</Button>
    </template>
  </Result>
</template>
```

:::

## 复杂的错误反馈

<Result
  status="error"
  title="Submission Failed"
  sub-title="Please check and modify the following information before resubmitting."
>
  <template #extra>
    <Button key="console" type="primary">Go Console</Button>
    <Button key="buy">Buy Again</Button>
  </template>
  <div class="desc">
    <p style="font-size: 16px">
      <strong>The content you submitted has the following error:</strong>
    </p>
    <p>
      <CloseCircleOutlined style="font-size: 14px; color: #ff4d4f" />
      Your account has been frozen
      <a>Thaw immediately &gt;</a>
    </p>
    <p>
      <CloseCircleOutlined :style="{ fontSize: '14px', color: '#ff4d4f' }" />
      Your account is not yet eligible to apply
      <a>Apply Unlock &gt;</a>
    </p>
  </div>
</Result>

::: details Show Code

```vue
<script setup lang="ts">
import { CloseCircleOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Result
    status="error"
    title="Submission Failed"
    sub-title="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <Button key="console" type="primary">Go Console</Button>
      <Button key="buy">Buy Again</Button>
    </template>
    <div class="desc">
      <p style="font-size: 16px">
        <strong>The content you submitted has the following error:</strong>
      </p>
      <p>
        <CloseCircleOutlined style="font-size: 14px; color: #ff4d4f" />
        Your account has been frozen
        <a>Thaw immediately &gt;</a>
      </p>
      <p>
        <CloseCircleOutlined :style="{ fontSize: '14px', color: '#ff4d4f' }" />
        Your account is not yet eligible to apply
        <a>Apply Unlock &gt;</a>
      </p>
    </div>
  </Result>
</template>
<style lang="less" scoped>
.desc p {
  margin-bottom: 1em;
  line-height: 1;
}
</style>
```

:::

## 403 你没有此页面的访问权限

<Result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
  <template #extra>
    <Button type="primary">Back Home</Button>
  </template>
</Result>

::: details Show Code

```vue
<template>
  <Result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <Button type="primary">Back Home</Button>
    </template>
  </Result>
</template>
```

:::

## 404 此页面未找到

<Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
  <template #extra>
    <Button type="primary">Back Home</Button>
  </template>
</Result>

::: details Show Code

```vue
<template>
  <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <Button type="primary">Back Home</Button>
    </template>
  </Result>
</template>
```

:::

## 500 服务器发生了错误

<Result status="500" title="500" sub-title="Sorry, the server is wrong.">
  <template #extra>
    <Button type="primary">Back Home</Button>
  </template>
</Result>

::: details Show Code

```vue
<template>
  <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <Button type="primary">Back Home</Button>
    </template>
  </Result>

  ## 500 服务器发生了错误

  <Result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <Button type="primary">Back Home</Button>
    </template>
  </Result>
</template>
```

:::

## 自定义 Icon

<Result title="Great, we have done all the operations!">
  <template #icon>
    <SmileTwoTone />
  </template>
  <template #extra>
    <Button type="primary">Next</Button>
  </template>
</Result>

::: details Show Code

```vue
<script setup lang="ts">
import { SmileTwoTone } from '@ant-design/icons-vue'
</script>
<template>
  <Result title="Great, we have done all the operations!">
    <template #icon>
      <SmileTwoTone />
    </template>
    <template #extra>
      <Button type="primary">Next</Button>
    </template>
  </Result>
</template>
```

:::

<style lang="less" scoped>
.desc p {
  margin-bottom: 1em;
  line-height: 1;
}
</style>

## APIs

### Result

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
icon | 自定义图标 | slot | undefined
status | 结果的状态，决定图标和颜色 | 'success' &#124; 'error' &#124; 'info' &#124; 'warning' &#124; '404' &#124; '403' &#124; '500' | 'info'
title | 标题文字 | string &#124; slot | undefined
subTitle | 副标题文字 | string &#124; slot | undefined
extra | 额外内容 | string &#124; slot | undefined
