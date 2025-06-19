# 弹出确认 Popconfirm

<GlobalElement />

_点击元素，弹出气泡式的确认框_

## 何时使用

- 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户

<script setup lang="ts">
import { ref, h } from 'vue'
import { FireFilled, QuestionCircleFilled, SoundFilled } from '@ant-design/icons-vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
const openChange = (open: boolean) => {
  console.log('open', open)
}
</script>

<Message ref="message" />

## 基本使用

<Popconfirm title="Are you sure delete this task ?" description="This will have other effects..." @ok="confirm" @cancel="cancel" @openChange="openChange"

> <Button type="danger">Delete Confirm</Button> </Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
const openChange = (open: boolean) => {
  console.log('open', open)
}
</script>
<template>
  <Popconfirm
    title="Are you sure delete this task ?"
    description="This will have other effects..."
    @ok="confirm"
    @cancel="cancel"
    @openChange="openChange"
  >
    <Button type="danger">Delete Confirm</Button>
  </Popconfirm>
  <Message ref="message" />
</template>
```

:::

## 隐藏取消按钮

<Popconfirm title="It's friendly reminder ..." :show-cancel="false" icon="info" @ok="confirm"

> <Button type="primary">Hidden Cancel Btn</Button> </Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
</script>
<template>
  <Popconfirm title="It's friendly reminder ..." :show-cancel="false" icon="info" @ok="confirm">
    <Button type="primary">Hidden Cancel Btn</Button>
  </Popconfirm>
  <Message ref="message" />
</template>
```

:::

## 自定义样式

<Popconfirm :max-width="280" :show-cancel="false" :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }" :description-style="{ color: '#fff' }" bg-color="#000" :tooltip-style="{ padding: '16px 18px', borderRadius: '12px' }" :icon-style="{ fontSize: '16px', paddingTop: '5px' }" ok-text="Awesome" :ok-props="{ shape: 'round' }" @ok="confirm" @cancel="cancel"

> <template #title>

    <a href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank">Vue Amazing UI</a>

  </template>
  <template #description> An Amazing Vue3 UI Components Library </template>
  <template #icon>
    <FireFilled style="color: #d4380d" />
  </template>
  <Button type="primary">Vue Amazing UI</Button>
</Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FireFilled } from '@ant-design/icons-vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Popconfirm
    :max-width="280"
    :show-cancel="false"
    :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
    :description-style="{ color: '#fff' }"
    bg-color="#000"
    :tooltip-style="{ padding: '16px 18px', borderRadius: '12px' }"
    :icon-style="{ fontSize: '16px', paddingTop: '5px' }"
    ok-text="Awesome"
    :ok-props="{ shape: 'round' }"
    @ok="confirm"
    @cancel="cancel"
  >
    <template #title>
      <a href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank">Vue Amazing UI</a>
    </template>
    <template #description> An Amazing Vue3 UI Components Library </template>
    <template #icon>
      <FireFilled style="color: #d4380d" />
    </template>
    <Button type="primary">Vue Amazing UI</Button>
  </Popconfirm>
  <Message ref="message" />
</template>
```

:::

## 自定义按钮

<Space>
  <Popconfirm
    title="Are you sure ?"
    ok-text="Yes"
    cancel-text="No"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="danger">Delete Confirm</Button>
  </Popconfirm>
  <Popconfirm
    title="Are you sure ?"
    ok-text="Yes"
    :ok-props="{ ghost: true }"
    cancel-text="No"
    :cancel-props="{ type: 'danger', ghost: true }"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="danger">Delete Confirm</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Space>
    <Popconfirm title="Are you sure ?" ok-text="Yes" cancel-text="No" @ok="confirm" @cancel="cancel">
      <Button type="danger">Delete Confirm</Button>
    </Popconfirm>
    <Popconfirm
      title="Are you sure ?"
      ok-text="Yes"
      :ok-props="{ ghost: true }"
      cancel-text="No"
      :cancel-props="{ type: 'danger', ghost: true }"
      @ok="confirm"
      @cancel="cancel"
    >
      <Button type="danger">Delete Confirm</Button>
    </Popconfirm>
  </Space>
  <Message ref="message" />
</template>
```

:::

## 预置四种图标

<Space>
  <Popconfirm
    title="Are you sure delete this task ?"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Warning Confirm</Button>
  </Popconfirm>
  <Popconfirm
    title="Are you sure delete this task ?"
    icon="info"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Info Confirm</Button>
  </Popconfirm>
  <Popconfirm
    title="Are you sure delete this task ?"
    icon="success"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Success Confirm</Button>
  </Popconfirm>
  <Popconfirm
    title="Are you sure delete this task ?"
    icon="danger"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Danger Confirm</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Space>
    <Popconfirm title="Are you sure delete this task ?" @ok="confirm" @cancel="cancel">
      <Button type="primary">Warning Confirm</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task ?" icon="info" @ok="confirm" @cancel="cancel">
      <Button type="primary">Info Confirm</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task ?" icon="success" @ok="confirm" @cancel="cancel">
      <Button type="primary">Success Confirm</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task ?" icon="danger" @ok="confirm" @cancel="cancel">
      <Button type="primary">Danger Confirm</Button>
    </Popconfirm>
  </Space>
  <Message ref="message" />
</template>
```

:::

## 自定义图标

<Space>
  <Popconfirm
    title="Are you sure ?"
    :icon="() => h(QuestionCircleFilled, { style: 'color: #ff4d4f' })"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="danger">Delete Confirm</Button>
  </Popconfirm>
  <Popconfirm
    title="Are you sure ?"
    @ok="confirm"
    @cancel="cancel"
  >
    <template #icon>
      <SoundFilled style="color: #faad14" />
    </template>
    <Button type="primary">Notification Confirm</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { QuestionCircleFilled, SoundFilled } from '@ant-design/icons-vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Space>
    <Popconfirm
      title="Are you sure ?"
      :icon="() => h(QuestionCircleFilled, { style: 'color: #ff4d4f' })"
      @ok="confirm"
      @cancel="cancel"
    >
      <Button type="danger">Delete Confirm</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure ?" @ok="confirm" @cancel="cancel">
      <template #icon>
        <SoundFilled style="color: #faad14" />
      </template>
      <Button type="primary">Notification Confirm</Button>
    </Popconfirm>
  </Space>
  <Message ref="message" />
</template>
```

:::

## 不同的触发方式

<Space>
  <Popconfirm
    title="It's friendly reminder ..."
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Click Me Confirm</Button>
  </Popconfirm>
  <Popconfirm
    title="It's friendly reminder ..."
    trigger="hover"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Hover Me Confirm</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Space>
    <Popconfirm title="It's friendly reminder ..." @ok="confirm" @cancel="cancel">
      <Button type="primary">Click Me Confirm</Button>
    </Popconfirm>
    <Popconfirm title="It's friendly reminder ..." trigger="hover" @ok="confirm" @cancel="cancel">
      <Button type="primary">Hover Me Confirm</Button>
    </Popconfirm>
  </Space>
  <Message ref="message" />
</template>
```

:::

## 自定义过渡动画时间

<Popconfirm title="Transition Duration 300ms" :transition-duration="300" @ok="confirm" @cancel="cancel"> <Button type="primary">Transition Duration 300ms</Button> </Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Popconfirm title="Transition Duration 300ms" :transition-duration="300" @ok="confirm" @cancel="cancel">
    <Button type="primary">Transition Duration 300ms</Button>
  </Popconfirm>
  <Message ref="message" />
</template>
```

:::

## 延迟显示隐藏

<Space>
  <Popconfirm
    :show-delay="300"
    :hide-delay="300"
    title="Are you confirm ?"
    description="delay 300ms"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Delay 300ms Confirm</Button>
  </Popconfirm>
  <Popconfirm
    :show-delay="500"
    :hide-delay="500"
    title="Are you confirm ?"
    description="delay 500ms"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Delay 500ms Confirm</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Space>
    <Popconfirm
      :show-delay="300"
      :hide-delay="300"
      title="Are you confirm ?"
      description="delay 300ms"
      @ok="confirm"
      @cancel="cancel"
    >
      <Button type="primary">Delay 300ms Confirm</Button>
    </Popconfirm>
    <Popconfirm
      :show-delay="500"
      :hide-delay="500"
      title="Are you confirm ?"
      description="delay 500ms"
      @ok="confirm"
      @cancel="cancel"
    >
      <Button type="primary">Delay 500ms Confirm</Button>
    </Popconfirm>
  </Space>
  <Message ref="message" />
</template>
```

:::

## 隐藏箭头

<Popconfirm :arrow="false" title="My arrow is hidden" @ok="confirm" @cancel="cancel"

> <Button type="primary">Hide Arrow Confirm</Button> </Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <Popconfirm :arrow="false" title="My arrow is hidden" @ok="confirm" @cancel="cancel">
    <Button type="primary">Hide Arrow Confirm</Button>
  </Popconfirm>
  <Message ref="message" />
</template>
```

:::

<br/>

> _更多使用方式请参考 [文字提示 Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html)_

## APIs

### Popconfirm

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| title | 弹出确认框的标题 | string &#124; slot | undefined |
| titleStyle | 设置标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| description | 弹出确认框的内容描述 | string &#124; slot | undefined |
| descriptionStyle | 设置内容描述的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| keyboard | 是否支持按键操作 (`enter` 显示；`esc` 关闭) | boolean | true |
| tooltipStyle | 设置弹出提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| icon | 自定义弹出确认框 `Icon` 图标 | 'success' &#124; 'info' &#124; 'warning' &#124; 'danger' &#124; VNode &#124; Slot | 'warning' |
| iconStyle | 设置 `Icon` 图标的样式，一般不需要设置，主要用于自定义 `Icon` 图标时 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| cancelText | 取消按钮文字 | string &#124; slot | '取消' |
| cancelType | 取消按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'default' |
| cancelProps | 取消按钮 `props`，优先级高于 `cancelType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {} |
| okText | 确认按钮文字 | string &#124; slot | '确定' |
| okType | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'primary' |
| okProps | 确认按钮 `props`，优先级高于 `okType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {} |
| showCancel | 是否显示取消按钮 | boolean | true |

更多属性请参考 [Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip)

## Slots

| 名称        | 说明                       | 类型               |
| :---------- | :------------------------- | :----------------- |
| title       | 自定义弹出确认框的标题     | v-slot:title       |
| description | 自定义弹出确认框的内容描述 | v-slot:description |
| icon        | 自定义图标                 | v-slot:icon        |
| cancelText  | 自定义取消按钮文字         | v-slot:cancelText  |
| okText      | 自定义确认按钮文字         | v-slot:okText      |
| default     | 自定义内容                 | v-solt:default     |

## Events

| 名称       | 说明           | 类型                    |
| :--------- | :------------- | :---------------------- |
| cancel     | 点击取消的回调 | (e: Event) => void      |
| ok         | 点击确认的回调 | (e: Event) => void      |
| openChange | 显示隐藏的回调 | (open: boolean) => void |
