# 警告提示 Alert

<br/>

*图标右上角的圆形徽标数字或文本前的状态小圆点*

## 何时使用

- 一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理

::: details Show Code

```vue
<template>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
color | 自定义小圆点的颜色 | string | '' | false
dot | 不展示数字，只有一个小红点 | boolean | false | false
status | 设置 `Badge` 为状态点 | 'success' &#124; 'processing &#124; 'default' &#124; 'error' &#124; 'warn' | 'info' | false
text | 在设置了 `status` 的前提下有效，设置状态点的文本 | string &#124; slot | '' | false
