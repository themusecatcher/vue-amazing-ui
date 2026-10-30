# 弹出确认 Popconfirm

<GlobalElement />

_点击元素，弹出气泡式的确认框_

## 何时使用

- 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户

<script setup lang="ts">
import { h, ref } from 'vue'
import { FireFilled, QuestionCircleFilled, SoundFilled } from '@ant-design/icons-vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
const openChange = (open: boolean) => {
  console.log('open', open)
}
// 受控显示：显隐由 v-model:open 接管，内部触发的开合经 update:open 回传
const controlledOpen = ref(false)
// openControl：显隐只由 open 驱动
const openControlOpen = ref(false)
// 弹出位置：6 个方向（含复合方向），默认的箭头与翻转行为可一屏对比
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const placement = ref('top')
</script>

## 基本使用

<Popconfirm
  title="Are you sure delete this task ?"
  description="This will have other effects..."
  @ok="confirm"
  @cancel="cancel"
  @open-change="openChange"
>
  <Button type="danger">Delete Confirm</Button>
</Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
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
    @open-change="openChange"
  >
    <Button type="danger">Delete Confirm</Button>
  </Popconfirm>
</template>
```

:::

## 隐藏取消按钮

<Popconfirm
  title="It's friendly reminder ..."
  :show-cancel="false"
  icon="info"
  @ok="confirm"
>
  <Button type="primary">Hidden Cancel Btn</Button>
</Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
</script>
<template>
  <Popconfirm
    title="It's friendly reminder ..."
    :show-cancel="false"
    icon="info"
    @ok="confirm"
  >
    <Button type="primary">Hidden Cancel Btn</Button>
  </Popconfirm>
</template>
```

:::

## 自定义样式

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

::: details Show Code

```vue
<script setup lang="ts">
import { FireFilled } from '@ant-design/icons-vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
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
</template>
```

:::

## 弹出位置

_通过 `placement` 指定方向；复合方向（如 `topLeft`）配合 `arrowPointAtCenter` 可让箭头指向触发元素中心，空间不足时 `flip` 会自动翻转_

<br/>

<div style="margin-bottom: 16px">
  <Space align="center">
    placement:
    <Segmented v-model:value="placement" :options="placements" />
  </Space>
</div>

<Popconfirm
  :placement="placement"
  title="It's friendly reminder ..."
  @ok="confirm"
  @cancel="cancel"
>
  <Button type="primary">Adjust Placement</Button>
</Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const placement = ref('top')
</script>
<template>
  <div style="margin-bottom: 16px">
    <Space align="center">
      placement:
      <Segmented v-model:value="placement" :options="placements" />
    </Space>
  </div>
  <Popconfirm
    :placement="placement"
    title="It's friendly reminder ..."
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Adjust Placement</Button>
  </Popconfirm>
</template>
```

:::

## 箭头指向

_设置 `arrowPointAtCenter` 后，箭头将指向目标元素中心，仅当 `placement` 为复合方向（如 `topLeft`）时生效_

<br/>

<Space>
  <Popconfirm placement="topLeft" title="Are you sure ?" @ok="confirm" @cancel="cancel">
    <Button type="primary">Align edge</Button>
  </Popconfirm>
  <Popconfirm placement="topLeft" arrow-point-at-center title="Are you sure ?" @ok="confirm" @cancel="cancel">
    <Button type="primary">Arrow points to center</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
  <Space>
    <Popconfirm placement="topLeft" title="Are you sure ?" @ok="confirm" @cancel="cancel">
      <Button type="primary">Align edge</Button>
    </Popconfirm>
    <Popconfirm placement="topLeft" arrow-point-at-center title="Are you sure ?" @ok="confirm" @cancel="cancel">
      <Button type="primary">Arrow points to center</Button>
    </Popconfirm>
  </Space>
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
  <Popconfirm
    title="Are you sure ?"
    ok-text="Yes"
    ok-type="danger"
    cancel-text="No"
    cancel-type="dashed"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="danger">Delete Confirm</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
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
    <Popconfirm
      title="Are you sure ?"
      ok-text="Yes"
      ok-type="danger"
      cancel-text="No"
      cancel-type="dashed"
      @ok="confirm"
      @cancel="cancel"
    >
      <Button type="danger">Delete Confirm</Button>
    </Popconfirm>
  </Space>
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
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
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
import { h } from 'vue'
import { QuestionCircleFilled, SoundFilled } from '@ant-design/icons-vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
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
</template>
```

:::

## 不同的触发方式

_默认点击触发器展开，再次点击触发器或点击浮层之外收起；`click` / `contextmenu` 触发时按 `esc` 也可关闭（与 [文字提示 Tooltip](./tooltip.md) 一致）_

<br/>

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
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
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
</template>
```

:::

## 受控显示

_使用 `v-model:open` 控制显隐；`openControl` 为真时 `trigger: hover` 不再驱动显隐，显隐完全由 `open` 决定_

<br/>

<Space vertical align="start" :gap="12">
  <Space>
    <Popconfirm v-model:open="controlledOpen" title="It's friendly reminder ..." @ok="confirm" @cancel="cancel">
      <Button>Controlled: {{ controlledOpen }}</Button>
    </Popconfirm>
    <Button type="primary" @click="controlledOpen = !controlledOpen">Toggle Open</Button>
  </Space>
  <Space>
    <Popconfirm
      v-model:open="openControlOpen"
      open-control
      trigger="hover"
      title="Controlled Only"
      @ok="confirm"
      @cancel="cancel"
    >
      <Button>Hover (openControl)</Button>
    </Popconfirm>
    <Button type="primary" @click="openControlOpen = !openControlOpen">Toggle Open (openControl)</Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
const controlledOpen = ref(false)
const openControlOpen = ref(false)
</script>
<template>
  <Space vertical align="start" :gap="12">
    <Space>
      <Popconfirm v-model:open="controlledOpen" title="It's friendly reminder ..." @ok="confirm" @cancel="cancel">
        <Button>Controlled: {{ controlledOpen }}</Button>
      </Popconfirm>
      <Button type="primary" @click="controlledOpen = !controlledOpen">Toggle Open</Button>
    </Space>
    <Space>
      <Popconfirm
        v-model:open="openControlOpen"
        open-control
        trigger="hover"
        title="Controlled Only"
        @ok="confirm"
        @cancel="cancel"
      >
        <Button>Hover (openControl)</Button>
      </Popconfirm>
      <Button type="primary" @click="openControlOpen = !openControlOpen">Toggle Open (openControl)</Button>
    </Space>
  </Space>
</template>
```

:::

## 自定义过渡动画时间

<Popconfirm title="Transition Duration 300ms" :transition-duration="300" @ok="confirm" @cancel="cancel">
  <Button type="primary">Transition Duration 300ms</Button>
</Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
  <Popconfirm title="Transition Duration 300ms" :transition-duration="300" @ok="confirm" @cancel="cancel">
    <Button type="primary">Transition Duration 300ms</Button>
  </Popconfirm>
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
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
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
</template>
```

:::

## 隐藏后卸载

_设置 `destroyOnHide` 后，浮层在离开动画结束时卸载 `DOM`，再次显示时重新创建并定位；默认 `false`（元素常驻，仅切换显示）_

<br/>

<Space>
  <Popconfirm title="Are you sure ?" destroy-on-hide @ok="confirm" @cancel="cancel">
    <Button type="primary">Click (destroyOnHide)</Button>
  </Popconfirm>
  <Popconfirm title="Are you sure ?" @ok="confirm" @cancel="cancel">
    <Button>Click (default)</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
  <Space>
    <Popconfirm title="Are you sure ?" destroy-on-hide @ok="confirm" @cancel="cancel">
      <Button type="primary">Click (destroyOnHide)</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure ?" @ok="confirm" @cancel="cancel">
      <Button>Click (default)</Button>
    </Popconfirm>
  </Space>
</template>
```

:::

## 隐藏箭头

<Popconfirm
  :arrow="false"
  title="My arrow is hidden"
  @ok="confirm"
  @cancel="cancel"
>
  <Button type="primary">Hide Arrow Confirm</Button>
</Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
  <Popconfirm
    :arrow="false"
    title="My arrow is hidden"
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Hide Arrow Confirm</Button>
  </Popconfirm>
</template>
```

:::

<br/>

## 键盘与读屏

_面板语义为 `alertdialog`，可访问名称取标题；打开后焦点落在「确定」，`Tab` 在「取消 / 确定」之间移动，`Esc` 关闭，关闭后焦点归还触发元素（若关闭前焦点已被点到页面上其它位置，则不抢回）。触发器不再把面板内容作为描述朗读_

<br/>

<Popconfirm
  title="Are you sure delete this task ?"
  description="This will have other effects..."
  @ok="confirm"
  @cancel="cancel"
>
  <Button type="primary">Keyboard Confirm</Button>
</Popconfirm>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
</script>
<template>
  <Popconfirm
    title="Are you sure delete this task ?"
    description="This will have other effects..."
    @ok="confirm"
    @cancel="cancel"
  >
    <Button type="primary">Keyboard Confirm</Button>
  </Popconfirm>
</template>
```

:::

<br/>

> _更多使用方式请参考 [文字提示 Tooltip](./tooltip.md)_

## APIs

### Popconfirm Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| title | 弹出确认框的标题 | string | undefined |
| titleStyle | 设置标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| description | 弹出确认框的内容描述 | string | undefined |
| descriptionStyle | 设置内容描述的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| tooltipStyle | 设置弹出提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| icon | 自定义弹出确认框 `Icon` 图标，预置四种类型，或 `prop` 支持 `VNode` / 渲染函数；插槽形态请用同名 `#icon` 插槽 | 'success' &#124; 'info' &#124; 'warning' &#124; 'danger' &#124; VNode &#124; (() => VNode) | 'warning' |
| iconStyle | 设置 `Icon` 图标的样式，一般不需要设置，主要用于自定义 `Icon` 图标时 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| cancelText | 取消按钮文字 | string | '取消' |
| cancelType | 取消按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'default' |
| cancelProps | 取消按钮 `props`，优先级高于 `cancelType`，参考 [Button Props](./button.md#button-props) | [ButtonProps](./button.md#button-props) | {} |
| okText | 确认按钮文字 | string | '确定' |
| okType | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'primary' |
| okProps | 确认按钮 `props`，优先级高于 `okType`，参考 [Button Props](./button.md#button-props) | [ButtonProps](./button.md#button-props) | {} |
| showCancel | 是否显示取消按钮 | boolean | true |

### 与 Tooltip 的差异

<br/>

`Popconfirm` 完整继承 [Tooltip Props](./tooltip.md#tooltip-props) 及对应的 `Events` / `Methods`（类型 `PopconfirmProps` 即 `Omit<TooltipProps, …>` 叠加自有字段），`<Popconfirm trigger="hover">` 这类写法与 `<Tooltip trigger="hover">` 等价。

下表只列与 `Tooltip` 不同的部分，其余属性、事件与方法见 [文字提示 Tooltip](./tooltip.md)：

| 名称 | 与 Tooltip 的差异 |
| :-- | :-- |
| tooltipStyle | 作用于卡片容器，内置 `padding: 12px` / `border-radius: 8px` 与左对齐文案，可覆盖 |
| tooltipClass | 可用，类名落在卡片容器上（与 `tooltipStyle` 同节点） |
| contentClass / contentStyle | 不可用（类型上已从 `PopconfirmProps` 剔除），请改用 `titleStyle` / `descriptionStyle` 或对应插槽 |
| tooltip | 不可用：卡片内容由本组件渲染，请改用 `title` / `description` 或同名插槽 |
| content | 不可用：确认框内容由 `title` / `description` 提供，传入后不显示 |
| trigger | 默认 `'click'`（`Tooltip` 为 `'hover'`）；`click` 再次点击触发器收起 |
| keyboard | 默认 `true`（`Tooltip` 为 `false`） |
| maxWidth | 默认 `'auto'`（`Tooltip` 为 `240`） |
| bgColor | 默认 `var(--va-bg-elevated-color)`，与浮层底板同色（`Tooltip` 为 `var(--va-bg-spotlight-color)`） |
| transitionDuration | 默认 `200`（`Tooltip` 为 `100`） |
| tooltipRole / describedBy | 默认 `'alertdialog'` / `false`（`Tooltip` 为 `'tooltip'` / `true`）：面板是待操作内容而非触发器的描述，无需传入 |
| anchor | 可用，但传入后不再渲染触发包裹层，触发元素需由使用方自行提供 |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| icon | 自定义图标 | v-slot:icon |
| title | 自定义弹出确认框的标题 | v-slot:title |
| description | 自定义弹出确认框的内容描述 | v-slot:description |
| cancelText | 自定义取消按钮文字 | v-slot:cancelText |
| okText | 自定义确认按钮文字 | v-slot:okText |
| default | 自定义内容 | v-slot:default |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| cancel | 点击取消的回调 | (e: Event) => void |
| ok | 点击确认的回调 | (e: Event) => void |
| openChange | 显示隐藏的回调 | (open: boolean) => void |
| animationend | 显示隐藏动画结束时的回调 | (open: boolean) => void |
