# 警告提示 Alert

<br/>

*警告提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭

<script setup lang="ts">
function onClose (e: MouseEvent) {
  console.log(e, 'I was closed.')
}
</script>

## 共有四种样式 success、info、warning、error

<Space direction="vertical" align="stretch" style="width: 100%">
  <Alert message="Info Text" />
  <Alert message="Success Text" type="success" />
  <Alert message="Warning Text" type="warning" />
  <Alert message="Error Text" type="error" />
</Space>

::: details Show Code

```vue
<template>
  <Space direction="vertical" align="stretch" style="width: 100%">
    <Alert message="Info Text" />
    <Alert message="Success Text" type="success" />
    <Alert message="Warning Text" type="warning" />
    <Alert message="Error Text" type="error" />
  </Space>
</template>
```

:::

## 可关闭的警告提示

<Space direction="vertical" align="stretch" style="width: 100%">
  <Alert
    message="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
    type="warning"
    closable
    @close="onClose"
  />
  <Alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description Error Description Error Description"
    type="error"
    closable
    @close="onClose"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function onClose (e: MouseEvent) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <Space direction="vertical" align="stretch" style="width: 100%">
    <Alert
      message="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
      type="warning"
      closable
      @close="onClose"
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable
      @close="onClose"
    />
  </Space>
</template>
```

:::

## 辅助性文字介绍

<Space direction="vertical" align="stretch" style="width: 100%">
  <Alert message="Success Text" type="success">
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
</Space>

::: details Show Code

```vue
<template>
  <Space direction="vertical" align="stretch" style="width: 100%">
    <Alert message="Success Text" type="success">
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
  </Space>
</template>
```

:::

## 辅助图标

<Space direction="vertical" align="stretch" style="width: 100%">
  <Alert message="Success Tips" type="success" show-icon />
  <Alert message="Informational Notes" type="info" show-icon />
  <Alert message="Warning" type="warning" show-icon />
  <Alert message="Error" type="error" show-icon />
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
</Space>

::: details Show Code

```vue
<template>
  <Space direction="vertical" align="stretch" style="width: 100%">
    <Alert message="Success Tips" type="success" show-icon />
    <Alert message="Informational Notes" type="info" show-icon />
    <Alert message="Warning" type="warning" show-icon />
    <Alert message="Error" type="error" show-icon />
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
  </Space>
</template>
```

:::

## 自定义关闭文字

<Alert message="Info Text" type="info" closable close-text="Close Now" />

::: details Show Code

```vue
<template>
  <Alert message="Info Text" type="info" closable close-text="Close Now" />
</template>
```

:::

## 自定义图标

<Space direction="vertical" align="stretch" style="width: 100%">
  <Alert message="Success Tips" type="success" show-icon>
    <template #icon>
      <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
    </template>
  </Alert>
  <Alert message="Informational Notes" type="info" show-icon>
    <template #icon>
      <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
    </template>
  </Alert>
  <Alert message="Warning" type="warning" show-icon>
    <template #icon>
      <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
    </template>
  </Alert>
  <Alert message="Error" type="error" show-icon>
    <template #icon>
      <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
    </template>
  </Alert>
  <Alert
    message="Success"
    type="success"
    icon="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
    show-icon>
  </Alert>
  <Alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    icon="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
    show-icon />
</Space>

::: details Show Code

```vue
<template>
  <Space direction="vertical" align="stretch" style="width: 100%">
    <Alert message="Success Tips" type="success" show-icon>
      <template #icon>
        <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
      </template>
    </Alert>
    <Alert message="Informational Notes" type="info" show-icon>
      <template #icon>
        <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
      </template>
    </Alert>
    <Alert message="Warning" type="warning" show-icon>
      <template #icon>
        <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
      </template>
    </Alert>
    <Alert message="Error" type="error" show-icon>
      <template #icon>
        <svg focusable="false" class="u-icon" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
      </template>
    </Alert>
    <Alert
      message="Success"
      type="success"
      icon="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
      show-icon>
    </Alert>
    <Alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      icon="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg"
      show-icon />
  </Space>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
message | 警告提示内容 | string &#124; slot | '' | false
description | 警告提示的辅助性文字介绍 | string &#124; slot | '' | false
type | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` | 'success' &#124; 'info' &#124; 'warning' &#124; 'error' | 'info' | false
closable | 是否显示关闭按钮 | boolean | false | false
closeText | 自定义关闭按钮 |  string &#124; slot | '' | false
icon | 自定义图标，`showIcon` 为 `true` 时有效 |  string &#124; slot | '' | false
showIcon | 是否显示辅助图标 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
close | 关闭时触发的回调函数 | (e: MouseEvent) => void
