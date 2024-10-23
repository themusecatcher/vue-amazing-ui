# 抽屉 Drawer

<FloatButton
  :bottom="96"
  type="primary"
  tooltip="成为赞助者✨"
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

*屏幕边缘滑出的浮层面板*

## 何时使用

> 抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象

<script lang="ts" setup>
import { ref } from 'vue'

const open1 = ref<boolean>(false)
const open2 = ref<boolean>(false)
const open3 = ref<boolean>(false)
const open4 = ref<boolean>(false)
const open5 = ref<boolean>(false)
const options = ref([
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  }
])
const placement = ref('right')
const extraPlacement = ref('right')
const footerPlacement = ref('right')
function onClose () { // 点击遮罩层或左上角叉或取消按钮的回调
  open3.value = false
  open4.value = false
  console.log('close')
}
</script>

## 基本使用

<Button type="primary" @click="open1 = true">Open</Button>
<Drawer v-model:open="open1" title="Basic Drawer" @close="onClose">
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)
function onClose () { // 点击遮罩层或左上角叉或取消按钮的回调
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer v-model:open="open" title="Basic Drawer" @close="onClose">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

## 自定义位置

<Radio v-model:value="placement" :options="options" style="margin-right: 8px;" />
<Button type="primary" @click="open2 = true">Open</Button>
<Drawer v-model:open="open2" title="Basic Drawer" :closable="false" extra="extra" footer="footer" :placement="placement">
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)
const options = ref([
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  }
])
const placement = ref('right')
</script>
<template>
  <Radio v-model:value="placement" :options="options" style="margin-right: 8px;" />
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer v-model:open="open" title="Basic Drawer" :closable="false" extra="extra" footer="footer" :placement="placement">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

## 额外操作

<Radio v-model:value="extraPlacement" :options="options" style="margin-right: 8px;" />
<Button type="primary" @click="open3 = true">Open</Button>
<Drawer v-model:open="open3" title="Basic Drawer" :placement="extraPlacement">
  <template #extra>
    <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
    <Button type="primary" @click="onClose">Submit</Button>
  </template>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)
const options = ref([
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  }
])
const extraPlacement = ref('right')
function onClose () {
  open.value = false
  console.log('close')
}
</script>
<template>
  <Radio v-model:value="extraPlacement" :options="options" style="margin-right: 8px;" />
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer v-model:open="open" title="Basic Drawer" :placement="extraPlacement">
    <template #extra>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

## 抽屉页脚

<Radio v-model:value="footerPlacement" :options="options" style="margin-right: 8px;" />
<Button type="primary" @click="open4 = true">Open</Button>
<Drawer v-model:open="open4" title="Basic Drawer" :placement="footerPlacement" :footer-style="{ textAlign: 'right' }">
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <template #footer>
    <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
    <Button type="primary" @click="onClose">Submit</Button>
  </template>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)
const options = ref([
    {
      label: 'top',
      value: 'top'
    },
    {
      label: 'right',
      value: 'right'
    },
    {
      label: 'bottom',
      value: 'bottom'
    },
    {
      label: 'left',
      value: 'left'
    }
  ])
const footerPlacement = ref('right')
function onClose () {
  open.value = false
  console.log('close')
}
</script>
<template>
  <Radio v-model:value="footerPlacement" :options="options" style="margin-right: 8px;" />
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer v-model:open="open" title="Basic Drawer" :placement="footerPlacement" :footer-style="{ textAlign: 'right' }">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <template #footer>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
  </Drawer>
</template>
```

:::

## 自定义 header & body 样式

<Button type="primary" @click="open5 = true">Open</Button>
<Drawer
  v-model:open="open5"
  :closable="false"
  title="Basic Drawer"
  :header-style="{ textAlign: 'center' }"
  :body-style="{ textAlign: 'center' }"
>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)
</script>
<template>
  <Button type="primary" @click="open = true">Open</Button>
  <Drawer
    v-model:open="open"
    :closable="false"
    title="Basic Drawer"
    :header-style="{ textAlign: 'center' }"
    :body-style="{ textAlign: 'center' }"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

<style lang="less" scoped>
p {
  color: rgba(0, 0, 0, .88);
}
</style>

## APIs

### Drawer

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 抽屉宽度，在 `placement` 为 `right` 或 `left` 时使用，单位 `px` | string &#124; number | 378
height | 抽屉高度，在 `placement` 为 `top` 或 `bottom` 时使用，单位 `px` | string &#124; number | 378
title | 标题 | string &#124; slot | undefined
closable | 是否显示左上角的关闭按钮 | boolean | true
placement | 抽屉的方向 | 'top' &#124; 'right' &#124; 'bottom' &#124; 'left' | 'right'
headerClass | 设置 `Drawer` 头部的类名 | string | undefined
headerStyle | 设置 `Drawer` 头部的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
scrollbarProps | `Scrollbar` 组件属性配置，参考 [Scrollbar Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar)，用于设置内容滚动条的样式 | object | {}
bodyClass | 设置 `Drawer` 内容部分的类名 | string | undefined
bodyStyle | 设置 `Drawer` 内容部分的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
extra | 抽屉右上角的操作区域 | string &#124; slot | undefined
footer | 抽屉的页脚 | string &#124; slot | undefined
footerClass | 设置 `Drawer` 页脚的类名 | string | undefined
footerStyle | 设置 `Drawer` 页脚的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
destroyOnClose | 关闭时是否销毁 `Drawer` 里的子元素 | boolean | false
zIndex | 设置 `Drawer` 的 `z-index` | number | 1000
open <Tag color="cyan">v-model</Tag> | 抽屉是否可见 | boolean | false

## Events

名称 | 说明 | 类型
-- | -- | --
close | 点击遮罩层或左上角叉或取消按钮的回调 | (e: Event) => void
