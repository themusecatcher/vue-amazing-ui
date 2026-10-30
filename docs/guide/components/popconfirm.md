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
  @openChange="openChange"
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
    @openChange="openChange"
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

> *更多使用方式请参考 [文字提示 Tooltip](./tooltip.md)*

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

#### 继承自 Tooltip 的属性

除上述自有属性外，`Popconfirm` 完整继承 [Tooltip Props](./tooltip.md#tooltip-props) —— 类型为 `PopconfirmProps`，即 `Omit<TooltipProps, …>` 后叠加自有字段，`<Popconfirm trigger="hover">` 这类写法与 `<Tooltip trigger="hover">` 等价。以下为高频项（默认值为 `Popconfirm` 的实际取值）：

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| trigger | 触发方式（与 `Tooltip` 不同，默认点击触发；`click` 再次点击触发器收起，`click` / `contextmenu` 点击浮层之外收起） | 'hover' &#124; 'click' &#124; 'focus' &#124; 'contextmenu' | 'click' |
| keyboard | 是否支持按键操作 (`enter` 切换显示)，仅当 `trigger: 'click'` 时生效；`esc` 关闭不受此属性控制，`trigger` 为 `click` / `contextmenu` 时始终可用 | boolean | true |
| open <Tag color="cyan">v-model</Tag> | 确认框是否显示；显式传入（含 `false`）即为受控，显隐以该值为准，内部触发只经 `update:open` / `openChange` 上报（不传时由内部触发自管） | boolean | undefined |
| openControl | 仅当 `trigger: hover` 时生效：移入移出连 `update:open` 都不再上报（显隐受控本身由是否传入 `open` 决定） | boolean | false |
| placement | 确认框位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' &#124; 'left' &#124; 'leftTop' &#124; 'leftBottom' &#124; 'right' &#124; 'rightTop' &#124; 'rightBottom' | 'top' |
| flip | 确认框被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true |
| arrow | 是否显示箭头 | boolean | true |
| arrowPointAtCenter | 箭头是否指向目标元素中心，仅当 `placement` 为复合方向 (如 `topLeft`) 时生效 | boolean | false |
| destroyOnHide | 隐藏后是否卸载浮层 `DOM`：离开动画结束后卸载，再次显示时重新创建并重新定位 | boolean | false |
| to | 浮层挂载的容器节点（同 [Tooltip `to`](./tooltip.md#tooltip-props)，不传时优先挂到最近的承载层内容容器） | string &#124; HTMLElement &#124; false | undefined |
| zIndex | 浮层层级，优先级最高 | number | undefined |
| popupClassName | 设置浮层面板（定位盒）的类名 | string | undefined |
| popupStyle | 设置浮层面板（定位盒）的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| showDelay | 显示延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| hideDelay | 隐藏延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| disabled | 禁用确认框，禁用后不响应任何触发 | boolean | false |
| maxWidth | 确认框最大宽度，单位 `px` | string &#124; number | 'auto' |
| bgColor | 确认框背景颜色，支持预设色或自定义色值 (如 `#f50` / `rgba`) | string | 'var(--va-bg-elevated-color)' |
| transitionDuration | 确认框动画的过渡持续时间，单位 `ms` | number | 200 |

**未在此列出**的继承属性与 [Tooltip Props](./tooltip.md#tooltip-props) 完全一致，类型见 `TooltipProps`。

#### 特殊字段

| 字段 | 说明 |
| :-- | :-- |
| tooltipStyle | 支持，作用于卡片容器（覆盖内置的 `padding` / 圆角） |
| contentClass / contentStyle / tooltip | **不支持**（类型上已从 `PopconfirmProps` 剔除）。运行时传入仍会作为 `Tooltip` 属性透传并生效（`Omit` 只修正类型承诺，挡不住运行时）：`contentClass` / `contentStyle` 落在触发包裹层，`tooltip` 被 `#tooltip` 插槽覆盖 —— 均属未定义行为 |
| content | 继承自 `Tooltip`（触发元素旁的内联文案），但确认框的 `#tooltip` 插槽恒定提供，故传入后不显示；请改用 `title` / `description` 或同名插槽 |
| anchor | 支持。传入后不再渲染触发包裹层（默认插槽不渲染），需自行提供触发元素；`#tooltip` 卡片仍正常渲染 |
| title | 为 `Popconfirm` 自有属性（确认框标题） |

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
