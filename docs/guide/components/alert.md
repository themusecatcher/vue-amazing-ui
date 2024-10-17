# 警告提示 Alert

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*警告提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭

<script setup lang="ts">
import { AlertFilled, AlertOutlined, SmileOutlined } from '@ant-design/icons-vue'
function onClose (e: Event) {
  console.log(e, 'I was closed.')
}
</script>

## 基本使用

<Alert message="Default Text" />

::: details Show Code

```vue
<template>
  <Alert message="Default Text" />
</template>
```

:::

## 不同类型

<Flex vertical>
  <Alert message="Info Text" type="info" />
  <Alert message="Success Text" type="success" />
  <Alert message="Warning Text" type="warning" />
  <Alert message="Error Text" type="error" />
</Flex>

::: details Show Code

```vue
<template>
  <Flex vertical>
    <Alert message="Info Text" type="info" />
    <Alert message="Success Text" type="success" />
    <Alert message="Warning Text" type="warning" />
    <Alert message="Error Text" type="error" />
  </Flex>
</template>
```

:::

## 无边框

<Flex vertical>
  <Alert message="Default Text" :bordered="false" />
  <Alert message="Info Text" type="info" :bordered="false" />
  <Alert message="Success Text" type="success" :bordered="false" />
  <Alert message="Warning Text" type="warning" :bordered="false" />
  <Alert message="Error Text" type="error" :bordered="false" />
</Flex>

::: details Show Code

```vue
<template>
  <Flex vertical>
    <Alert message="Default Text" :bordered="false" />
    <Alert message="Info Text" type="info" :bordered="false" />
    <Alert message="Success Text" type="success" :bordered="false" />
    <Alert message="Warning Text" type="warning" :bordered="false" />
    <Alert message="Error Text" type="error" :bordered="false" />
  </Flex>
</template>
```

:::

## 可关闭

<Flex vertical>
  <Alert
    message="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
    type="warning"
    closable
    @close="onClose"
  />
  <Alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description Error Description"
    type="error"
    closable
    @close="onClose"
  />
  <Alert
    :bordered="false"
    message="Info Text Info Text Info Text Info Text Info Text Info Text Info Text"
    type="info"
    closable
    @close="onClose"
  />
  <Alert
    :bordered="false"
    message="Success Text"
    description="Success Description Success Description Success Description Success Description"
    type="success"
    closable
    @close="onClose"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
function onClose (e: Event) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <Flex vertical>
    <Alert
      message="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
      type="warning"
      closable
      @close="onClose"
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable
      @close="onClose"
    />
    <Alert
      :bordered="false"
      message="Info Text Info Text Info Text Info Text Info Text Info Text Info Text"
      type="info"
      closable
      @close="onClose"
    />
    <Alert
      :bordered="false"
      message="Success Text"
      description="Success Description Success Description Success Description Success Description"
      type="success"
      closable
      @close="onClose"
    />
  </Flex>
</template>
```

:::

## 辅助性文字介绍

<Flex vertical>
  <Alert
    message="Default Text"
    description="Default Description Default Description Default Description Default Description"
  />
  <Alert type="success">
    Success Text
    <template #description>
      <p>
        Success Description
        <span style="color: red">Success</span>
        Description Success Description
      </p>
    </template>
  </Alert>
  <Alert
    message="Info Text"
    description="Info Description Info Description Info Description Info Description"
    type="info"
  />
  <Alert
    message="Warning Text"
    description="Warning Description Warning Description Warning Description Warning Description"
    type="warning"
  />
  <Alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description"
    type="error"
  />
</Flex>

::: details Show Code

```vue
<template>
  <Flex vertical>
    <Alert
      message="Default Text"
      description="Default Description Default Description Default Description Default Description"
    />
    <Alert type="success">
      Success Text
      <template #description>
        <p>
          Success Description
          <span style="color: red">Success</span>
          Description Success Description
        </p>
      </template>
    </Alert>
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <Alert
      message="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </Flex>
</template>
```

:::

## 辅助图标

<Flex vertical>
  <Alert message="Default Tips" show-icon>
    <template #icon>
      <AlertFilled />
    </template>
  </Alert>
  <Alert message="Success Tips" type="success" show-icon />
  <Alert message="Informational Notes" type="info" show-icon />
  <Alert message="Warning" type="warning" show-icon />
  <Alert message="Error" type="error" show-icon />
  <Alert
    message="Default Tips"
    description="Detailed description and advices about successful copywriting."
    show-icon
  >
    <template #icon>
      <AlertOutlined />
    </template>
  </Alert>
  <Alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    show-icon
  />
  <Alert
    message="Informational Notes"
    description="Additional description and informations about copywriting."
    type="info"
    show-icon
  />
  <Alert
    message="Warning"
    description="This is a warning notice about copywriting."
    type="warning"
    show-icon
  />
  <Alert
    message="Error"
    description="This is an error message about copywriting."
    type="error"
    show-icon
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { AlertFilled, AlertOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Flex vertical>
    <Alert message="Default Tips" show-icon>
      <template #icon>
        <AlertFilled />
      </template>
    </Alert>
    <Alert message="Success Tips" type="success" show-icon />
    <Alert message="Informational Notes" type="info" show-icon />
    <Alert message="Warning" type="warning" show-icon />
    <Alert message="Error" type="error" show-icon />
    <Alert
      message="Default Tips"
      description="Detailed description and advices about successful copywriting."
      show-icon
    >
      <template #icon>
        <AlertOutlined />
      </template>
    </Alert>
    <Alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      show-icon
    />
    <Alert
      message="Informational Notes"
      description="Additional description and informations about copywriting."
      type="info"
      show-icon
    />
    <Alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      show-icon
    />
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      show-icon
    />
  </Flex>
</template>
```

:::

## 自定义图标

<Flex vertical>
  <Alert type="success" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
    Success Tips
  </Alert>
  <Alert type="info" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
    Informational Notes
  </Alert>
  <Alert type="warning" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
    Warning
  </Alert>
  <Alert type="error" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
    Error
  </Alert>
  <Alert type="success" show-icon>
    <template #icon>
      <Avatar size="small" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
    </template>
    Success
  </Alert>
  <Alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    show-icon
  >
    <template #icon>
      <smile-outlined />
    </template>
  </Alert>
  <Alert
    message="Informational Notes"
    description="Additional description and informations about copywriting."
    type="info"
    show-icon
  >
    <template #icon>
      <smile-outlined />
    </template>
  </Alert>
  <Alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon>
    <template #icon>
      <smile-outlined />
    </template>
  </Alert>
  <Alert message="Error" description="This is an error message about copywriting." type="error" show-icon>
    <template #icon>
      <smile-outlined />
    </template>
  </Alert>
  <Alert
    message="Info Tips"
    description="Detailed description and advices about successful copywriting."
    type="info"
    show-icon
  >
    <template #icon>
      <Avatar size="large" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg" />
    </template>
  </Alert>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Flex vertical>
    <Alert type="success" show-icon>
      <template #icon>
        <SmileOutlined />
      </template>
      Success Tips
    </Alert>
    <Alert type="info" show-icon>
      <template #icon>
        <SmileOutlined />
      </template>
      Informational Notes
    </Alert>
    <Alert type="warning" show-icon>
      <template #icon>
        <SmileOutlined />
      </template>
      Warning
    </Alert>
    <Alert type="error" show-icon>
      <template #icon>
        <SmileOutlined />
      </template>
      Error
    </Alert>
    <Alert type="success" show-icon>
      <template #icon>
        <Avatar size="small" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
      </template>
      Success
    </Alert>
    <Alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      show-icon
    >
      <template #icon>
        <smile-outlined />
      </template>
    </Alert>
    <Alert
      message="Informational Notes"
      description="Additional description and informations about copywriting."
      type="info"
      show-icon
    >
      <template #icon>
        <smile-outlined />
      </template>
    </Alert>
    <Alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon>
      <template #icon>
        <smile-outlined />
      </template>
    </Alert>
    <Alert message="Error" description="This is an error message about copywriting." type="error" show-icon>
      <template #icon>
        <smile-outlined />
      </template>
    </Alert>
    <Alert
      message="Info Tips"
      description="Detailed description and advices about successful copywriting."
      type="info"
      show-icon
    >
      <template #icon>
        <Avatar size="large" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/2.jpg" />
      </template>
    </Alert>
  </Flex>
</template>
```

:::

## 自定义关闭文字

<Alert message="Info Text" type="info" closable close-text="Close Now" @close="onClose" />

::: details Show Code

```vue
<script setup lang="ts">
function onClose (e: Event) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <Alert message="Info Text" type="info" closable close-text="Close Now" @close="onClose" />
</template>
```

:::

## 自定义操作项

<Flex vertical>
  <Alert message="Success Tips" type="success" show-icon closable>
    <template #actions>
      <Button size="small" type="text">UNDO</Button>
    </template>
  </Alert>
  <Alert
    message="Error Text"
    show-icon
    description="Error Description Error Description Error Description Error Description"
    type="error"
  >
    <template #actions>
      <Button size="small" type="danger" ghost>Detail</Button>
    </template>
  </Alert>
  <Alert message="Warning Text" type="warning" closable>
    <template #actions>
      <Button size="small" type="text">Done</Button>
    </template>
  </Alert>
  <Alert
    message="Info Text"
    description="Info Description Info Description Info Description Info Description"
    type="info"
    closable
  >
    <template #actions>
      <Space vertical gap="small" align="center">
        <Button size="small" type="primary">Accept</Button>
        <Button size="small" type="danger" ghost>Decline</Button>
      </Space>
    </template>
  </Alert>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
function onClose (e: Event) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <Flex vertical>
    <Alert message="Success Tips" type="success" show-icon closable>
      <template #actions>
        <Button size="small" type="text">UNDO</Button>
      </template>
    </Alert>
    <Alert
      message="Error Text"
      show-icon
      description="Error Description Error Description Error Description Error Description"
      type="error"
    >
      <template #actions>
        <Button size="small" type="danger" ghost>Detail</Button>
      </template>
    </Alert>
    <Alert message="Warning Text" type="warning" closable>
      <template #actions>
        <Button size="small" type="text">Done</Button>
      </template>
    </Alert>
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      closable
    >
      <template #actions>
        <Space vertical gap="small" align="center">
          <Button size="small" type="primary">Accept</Button>
          <Button size="small" type="danger" ghost>Decline</Button>
        </Space>
      </template>
    </Alert>
  </Flex>
</template>
```

:::

## APIs

### Alert

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
message | 警告提示内容 | string &#124; slot | undefined
description | 警告提示的辅助性文字介绍 | string &#124; slot | undefined
type | 警告提示的类型 | 'default' &#124; 'success' &#124; 'info' &#124; 'warning' &#124; 'error' | 'default'
bordered | 是否显示边框 | boolean | true
closable | 是否显示关闭按钮 | boolean | false
closeText | 自定义关闭按钮 |  string &#124; slot | undefined
icon | 自定义图标，`showIcon` 为 `true` 时有效 |  string &#124; slot | undefined
showIcon | 是否显示辅助图标 | boolean | false
actions | 自定义操作项 | slot | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
close | 关闭时触发的回调函数 | (e: Event) => void
