# 按钮 Button

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*按钮用于开始一个即时操作*

## 何时使用

- 当需要添加一个操作按钮时

<script setup lang="ts">
import { ref } from 'vue'
const customLoading = ref(false)
const loadingOptions = [
  {
    label: 'static',
    value: 'static'
  },
  {
    label: 'dynamic',
    value: 'dynamic'
  }
]
const loadingType = ref('dynamic')
const loading = ref(true)
const sizeOptions = [
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
  }
]
const size = ref('middle')
function onClick(e: Event) {
  console.log('click', e)
}
</script>

## 基本使用

*七种类型*

<br/>

<Space>
  <Button>Default Button</Button>
  <Button type="reverse">Reverse Button</Button>
  <Button type="primary">Primary Button</Button>
  <Button type="danger">Danger Button</Button>
  <Button type="dashed">Dashed Button</Button>
  <Button type="text">Text Button</Button>
  <Button type="link">Link Button</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button>Default Button</Button>
    <Button type="reverse">Reverse Button</Button>
    <Button type="primary">Primary Button</Button>
    <Button type="danger">Danger Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
</template>
```

:::

## 幽灵按钮

<Space>
  <Button type="primary" ghost>Primary Ghost Button</Button>
  <Button type="danger" ghost>Danger Ghost Button</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button type="primary" ghost>Primary Ghost Button</Button>
    <Button type="danger" ghost>Danger Ghost Button</Button>
  </Space>
</template>
```

:::

## 禁用

<Space vertical>
  <Space>
    <Button disabled>Default Button</Button>
    <Button disabled type="reverse">Reverse Button</Button>
    <Button disabled type="primary">Primary Button</Button>
    <Button disabled type="danger">Danger Button</Button>
    <Button disabled type="dashed">Dashed Button</Button>
    <Button disabled type="text">Text Button</Button>
    <Button disabled type="link">Link Button</Button>
  </Space>
  <Space>
    <Button disabled type="primary" ghost>Primary Ghost Button</Button>
    <Button disabled type="danger" ghost>Danger Ghost Button</Button>
  </Space>
</Space>

::: details Show Code

```vue
<template>
  <Space vertical>
    <Space>
      <Button disabled>Default Button</Button>
      <Button disabled type="reverse">Reverse Button</Button>
      <Button disabled type="primary">Primary Button</Button>
      <Button disabled type="danger">Danger Button</Button>
      <Button disabled type="dashed">Dashed Button</Button>
      <Button disabled type="text">Text Button</Button>
      <Button disabled type="link">Link Button</Button>
    </Space>
    <Space>
      <Button disabled type="primary" ghost>Primary Ghost Button</Button>
      <Button disabled type="danger" ghost>Danger Ghost Button</Button>
    </Space>
  </Space>
</template>
```

:::

## 按钮尺寸

<Space vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Space>
    <Button :size="size">Default Button</Button>
    <Button :size="size" type="reverse">Reverse Button</Button>
    <Button :size="size" type="primary">Primary Button</Button>
    <Button :size="size" type="danger">Danger Button</Button>
  </Space>
  <Space>
    <Button :size="size" type="dashed">Dashed Button</Button>
    <Button :size="size" type="text">Text Button</Button>
    <Button :size="size" type="link">Link Button</Button>
  </Space>
  <Space>
    <Button :size="size" type="primary" ghost>Primary Button</Button>
    <Button :size="size" type="danger" ghost>Danger Button</Button>
    <Button :size="size" type="primary" ghost loading>Primary Ghost Button</Button>
    <Button :size="size" type="danger" ghost loading>Danger Ghost Button</Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const sizeOptions = [
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
  }
]
const size = ref('middle')
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Space>
      <Button :size="size">Default Button</Button>
      <Button :size="size" type="reverse">Reverse Button</Button>
      <Button :size="size" type="primary">Primary Button</Button>
      <Button :size="size" type="danger">Danger Button</Button>
    </Space>
    <Space>
      <Button :size="size" type="dashed">Dashed Button</Button>
      <Button :size="size" type="text">Text Button</Button>
      <Button :size="size" type="link">Link Button</Button>
    </Space>
    <Space>
      <Button :size="size" type="primary" ghost>Primary Button</Button>
      <Button :size="size" type="danger" ghost>Danger Button</Button>
      <Button :size="size" type="primary" ghost loading>Primary Ghost Button</Button>
      <Button :size="size" type="danger" ghost loading>Danger Ghost Button</Button>
    </Space>
  </Space>
</template>
```

:::

## 自定义样式

<Space vertical>
  <Space align="center"> Loading state:<Switch v-model="customLoading" /> </Space>
  <Space align="center"> Loading Type:<Radio :options="loadingOptions" v-model:value="loadingType" /> </Space>
  <Space>
    <Button
      style="width: 150px; height: 40px; font-size: 18px; border-color: #faad14; color: #faad14"
      ripple-color="#faad14"
      loading-color="#faad14"
      size="large"
      :loading-type="loadingType"
      :loading="customLoading"
    >
      自定义样式
    </Button>
    <Button
      style="width: 150px; height: 40px; font-size: 18px; background: #faad14; border-color: #faad14; color: #fff"
      ripple-color="#faad14"
      loading-color="#fff"
      size="large"
      :loading-type="loadingType"
      :loading="customLoading"
    >
      自定义样式
    </Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const customLoading = ref(false)
const loadingOptions = [
  {
    label: 'static',
    value: 'static'
  },
  {
    label: 'dynamic',
    value: 'dynamic'
  }
]
const loadingType = ref('dynamic')
</script>
<template>
  <Space vertical>
    <Space align="center"> Loading state:<Switch v-model="customLoading" /> </Space>
    <Space align="center"> Loading Type:<Radio :options="loadingOptions" v-model:value="loadingType" /> </Space>
    <Space>
      <Button
        style="width: 150px; height: 40px; font-size: 18px; border-color: #faad14; color: #faad14"
        ripple-color="#faad14"
        loading-color="#faad14"
        size="large"
        :loading-type="loadingType"
        :loading="customLoading"
      >
        <p style="font-size: 18px">自定义样式</p>
      </Button>
      <Button
        style="width: 150px; height: 40px; font-size: 18px; background: #faad14; border-color: #faad14; color: #fff"
        ripple-color="#faad14"
        loading-color="#fff"
        size="large"
        :loading-type="loadingType"
        :loading="customLoading"
      >
        自定义样式
      </Button>
    </Space>
  </Space>
</template>
```

:::

## 自定义跳转

<Button href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank">跳转按钮</Button>

::: details Show Code

```vue
<template>
  <Button href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank">跳转按钮</Button>
</template>
```

:::

## 加载中状态

<Space vertical>
  <Space align="center"> Loading state:<Switch v-model="loading" /> </Space>
  <Space>
    <Button :loading="loading">Default Button</Button>
    <Button type="reverse" :loading="loading">Reverse Button</Button>
    <Button type="primary" :loading="loading">Primary Button</Button>
    <Button type="danger" :loading="loading">Danger Button</Button>
  </Space>
  <Space>
    <Button type="dashed" :loading="loading">Dashed Button</Button>
    <Button type="text" :loading="loading">Text Button</Button>
    <Button type="link" :loading="loading">Link Button</Button>
  </Space>
  <Space>
    <Button type="primary" ghost :loading="loading">Primary Button</Button>
    <Button type="danger" ghost :loading="loading">Danger Button</Button>
  </Space>
  <Space>
    <Button :loading="loading" loading-type="static">Default Button</Button>
    <Button type="reverse" :loading="loading" loading-type="static">Reverse Button</Button>
    <Button type="primary" :loading="loading" loading-type="static">Primary Button</Button>
    <Button type="danger" :loading="loading" loading-type="static">Danger Button</Button>
  </Space>
  <Space>
    <Button type="dashed" :loading="loading" loading-type="static">Dashed Button</Button>
    <Button type="text" :loading="loading" loading-type="static">Text Button</Button>
    <Button type="link" :loading="loading" loading-type="static">Link Button</Button>
  </Space>
  <Space>
    <Button type="primary" ghost :loading="loading" loading-type="static">Primary Button</Button>
    <Button type="danger" ghost :loading="loading" loading-type="static">Danger Button</Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</script>
<template>
  <Space vertical>
    <Space align="center"> Loading state:<Switch v-model="loading" /> </Space>
    <Space>
      <Button :loading="loading">Default Button</Button>
      <Button type="reverse" :loading="loading">Reverse Button</Button>
      <Button type="primary" :loading="loading">Primary Button</Button>
      <Button type="danger" :loading="loading">Danger Button</Button>
    </Space>
    <Space>
      <Button type="dashed" :loading="loading">Dashed Button</Button>
      <Button type="text" :loading="loading">Text Button</Button>
      <Button type="link" :loading="loading">Link Button</Button>
    </Space>
    <Space>
      <Button type="primary" ghost :loading="loading">Primary Button</Button>
      <Button type="danger" ghost :loading="loading">Danger Button</Button>
    </Space>
    <Space>
      <Button :loading="loading" loading-type="static">Default Button</Button>
      <Button type="reverse" :loading="loading" loading-type="static">Reverse Button</Button>
      <Button type="primary" :loading="loading" loading-type="static">Primary Button</Button>
      <Button type="danger" :loading="loading" loading-type="static">Danger Button</Button>
    </Space>
    <Space>
      <Button type="dashed" :loading="loading" loading-type="static">Dashed Button</Button>
      <Button type="text" :loading="loading" loading-type="static">Text Button</Button>
      <Button type="link" :loading="loading" loading-type="static">Link Button</Button>
    </Space>
    <Space>
      <Button type="primary" ghost :loading="loading" loading-type="static">Primary Button</Button>
      <Button type="danger" ghost :loading="loading" loading-type="static">Danger Button</Button>
    </Space>
  </Space>
</template>
```

:::

## block 按钮

<Space>
  <Button block @click="onClick">Default Button</Button>
  <Button block type="primary" ghost>Primary Button</Button>
  <Button block type="danger" ghost>Danger Button</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <Space>
    <Button block @click="onClick">Default Button</Button>
    <Button block type="primary" ghost>Primary Button</Button>
    <Button block type="danger" ghost>Danger Button</Button>
  </Space>
</template>
```

:::

## APIs

### Button

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
type | 设置按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'default'
size | 设置按钮尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
ghost | 按钮背景是否透明，仅当 `type: 'primary'` &#124; `'danger'` 时生效 | boolean | false
rippleColor | 点击时的波纹颜色，一般不需要设置，默认会根据 `type` 自动匹配，主要用于自定义样式时且 `type: 'default'` | string | undefined
href | 点击跳转的地址，与 `a` 链接的 `href` 属性一致 | string | undefined
target | 如何打开目标链接，相当于 `a` 链接的 `target` 属性，`href` 存在时生效 | '_self' &#124; '_blank' | '_self'
disabled | 是否禁用 | boolean | false
loading | 是否加载中 | boolean | false
loadingType | 加载指示符类型 | 'static' &#124; 'dynamic' | 'dynamic'
loadingColor | 加载指示符颜色，一般不需要设置，默认会根据 `type` 自动匹配，主要用于自定义样式时且 `type: 'default'` | string | 'rgba(0, 0, 0, 0.88)'
block | 是否将按钮宽度调整为其父宽度 | boolean | false

## Events

名称 | 说明 | 类型
-- | -- | --
click | 点击按钮时的回调 | (e: Event) => void
