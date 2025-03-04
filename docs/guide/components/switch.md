# 开关 Switch

<GlobalElement />

*开关选择器*

## 何时使用

- 需要表示开关状态/两种状态之间的切换时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { generate } from '@ant-design/colors'
const checked = ref(true)
const primaryColor = ref('#ff6900')
const customValue1 = ref('no')
const customValue2 = ref(2)
watchEffect(() => {
  console.log('checked', checked.value)
})
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--switch-primary-color': color,
    '--switch-primary-color-hover': colorPalettes[4],
    '--switch-ripple-color': color
  }
  return style
}
function onChange(checked: boolean) {
  console.log('checked', checked)
}
</script>

## 基本使用

<Switch v-model="checked" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const checked = ref(true)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>
<template>
  <Switch v-model="checked" />
</template>
```

:::

## 禁用开关

<Switch v-model="checked" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>
<template>
  <Switch v-model="checked" disabled />
</template>
```

:::

## 三种大小

<Space>
  <Switch v-model="checked" size="small" />
  <Switch v-model="checked" />
  <Switch v-model="checked" size="large" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const checked = ref(true)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>
<template>
  <Space>
    <Switch v-model="checked" size="small" />
    <Switch v-model="checked" />
    <Switch v-model="checked" size="large" />
  </Space>
</template>
```

:::

## 加载中

<Space>
  <Switch v-model="checked" size="small" loading />
  <Switch v-model="checked" loading />
  <Switch v-model="checked" size="large" loading />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>
<template>
  <Space>
    <Switch v-model="checked" size="small" loading />
    <Switch v-model="checked" loading />
    <Switch v-model="checked" size="large" loading />
  </Space>
</template>
```

:::

## 带 文字 / 数字 / 字母 的开关

<Space>
  <Switch v-model="checked" checked="开" unchecked="关" />
  <Switch v-model="checked" checked="1" unchecked="0" />
  <Switch v-model="checked" checked="yes" unchecked="no" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const checked = ref(true)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>
<template>
  <Space>
    <Switch v-model="checked" checked="开" unchecked="关" />
    <Switch v-model="checked" checked="1" unchecked="0" />
    <Switch v-model="checked" checked="yes" unchecked="no" />
  </Space>
</template>
```

:::

## 自定义图标和样式

<Switch class="theme-switch" v-model="checked" ripple-color="#faad14" :circle-style="{ background: checked ? '#001529' : '#fff' }">
  <template #node="{ checked }">
    <svg
      v-if="checked"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      class="svg-dark"
    >
      <path
        d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
      ></path>
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      class="svg-light"
    >
      <path
        d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
      ></path>
      <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
      <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
      <path
        d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
      ></path>
      <path
        d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
      ></path>
      <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
      <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
      <path
        d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
      ></path>
      <path
        d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
      ></path>
    </svg>
  </template>
</Switch>

<style lang="less" scoped>
.theme-switch {
  :deep(.switch-checked) {
    background: #faad14;
    &:hover:not(.disabled) {
      background: #e8b339;
    }
  }
}
.svg-dark {
  width: 12px;
  height: 12px;
  fill: #fff;
}
.svg-light {
  width: 12px;
  height: 12px;
  fill: rgba(60, 60, 67, .75);
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const checked = ref(true)
watchEffect(() => {
  console.log('checked', checked.value)
})
</script>
<template>
  <Switch class="theme-switch" v-model="checked" ripple-color="#faad14" :circle-style="{ background: checked ? '#001529' : '#fff' }">
    <template #node="{ checked }">
      <svg
        v-if="checked"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        class="svg-dark"
      >
        <path
          d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
        ></path>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        class="svg-light"
      >
        <path
          d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
        ></path>
        <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
        <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
        <path
          d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
        ></path>
        <path
          d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
        ></path>
        <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
        <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
        <path
          d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
        ></path>
        <path
          d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
        ></path>
      </svg>
    </template>
  </Switch>
</template>
<style lang="less" scoped>
.theme-switch {
  :deep(.switch-checked) {
    background: #faad14;
    &:hover:not(.disabled) {
      background: #e8b339;
    }
  }
}
.svg-dark {
  width: 12px;
  height: 12px;
  fill: #fff;
}
.svg-light {
  width: 12px;
  height: 12px;
  fill: rgba(60, 60, 67, .75);
}
</style>
```

:::

## 自定义主题色

<Space vertical>
  <Space align="center">
    primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" />
  </Space>
  <Switch :style="getThemeStyle(primaryColor)" v-model="checked" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { generate } from '@ant-design/colors'
const checked = ref(true)
const primaryColor = ref('#ff6900')
watchEffect(() => {
  console.log('checked', checked.value)
})
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--switch-primary-color': color,
    '--switch-primary-color-hover': colorPalettes[4],
    '--switch-ripple-color': color
  }
  return style
}
</script>
<template>
  <Space vertical>
    <Space align="center">
      primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" />
    </Space>
    <Switch :style="getThemeStyle(primaryColor)" v-model="checked" />
  </Space>
</template>
```

:::

## 自定义选中的值

<Space gap="large">
  <Space vertical align="center">
    <Switch v-model="customValue1" checked-value="on" unchecked-value="off">
      <template #checked>on</template>
      <template #unchecked>off</template>
    </Switch>
    Current Value: {{ customValue1 }}
  </Space>
  <Space vertical align="center">
    <Switch v-model="customValue2" :checked-value="1" :unchecked-value="2">
      <template #checked>yes</template>
      <template #unchecked>no</template>
    </Switch>
    Current Value: {{ customValue2 }}
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const customValue1 = ref('no')
const customValue2 = ref(2)
</script>
<template>
  <Space gap="large">
    <Space vertical align="center">
      <Switch v-model="customValue1" checked-value="on" unchecked-value="off">
        <template #checked>on</template>
        <template #unchecked>off</template>
      </Switch>
      Current Value: {{ customValue1 }}
    </Space>
    <Space vertical align="center">
      <Switch v-model="customValue2" :checked-value="1" :unchecked-value="2">
        <template #checked>yes</template>
        <template #unchecked>no</template>
      </Switch>
      Current Value: {{ customValue2 }}
    </Space>
  </Space>
</template>
```

:::

## APIs

### Switch

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
checked | 选中时的内容 | string &#124; slot | undefined
checkedValue | 选中时的值 | boolean &#124; string &#124; number | true
unchecked | 未选中时的内容 | string &#124; slot | undefined
uncheckedValue | 未选中时的值 | boolean &#124; string &#124; number | false
loading | 是否加载中 | boolean | false
disabled | 是否禁用 | boolean | false
size | 开关大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
rippleColor | 点击时的波纹颜色，当自定义选中颜色时需要设置 | string | '#1677ff'
circleStyle | 圆点样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
modelValue <Tag color="cyan">v-model</Tag> | 指定当前是否选中 | boolean &#124; string &#124; number | false

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
checked | 自定义选中时的内容 | v-slot:checked
unchecked | 自定义未选中时的内容 | v-slot:unchecked
node | 自定义开关节点 | v-slot:node="{ checked }"

## Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 变化时的回调 | (checked: boolean) => void
