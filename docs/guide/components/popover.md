# 气泡卡片 Popover

<GlobalElement />

_点击/鼠标移入元素，弹出气泡式的卡片浮层。_

## 何时使用

- 当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
- 和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

<script setup lang="ts">
import { ref } from 'vue'
const controlledOpen = ref(false)
function openChange(open: boolean) {
  console.log('open', open)
}
// 弹出位置：6 个方向（含复合方向），默认的箭头与翻转行为可一屏对比
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const placement = ref('top')
// openControl：显隐只由 open 驱动
const openControlOpen = ref(false)
</script>

## 基本使用

<Popover title="Title" @open-change="openChange">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Hover me</Button>
</Popover>

::: details Show Code

```vue
<script setup lang="ts">
function openChange(open: boolean) {
  console.log('open', open)
}
</script>
<template>
  <Popover title="Title" @open-change="openChange">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Hover me</Button>
  </Popover>
</template>
```

:::

## 自定义样式

<Popover
  :max-width="180"
  bg-color="#000"
  :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
  :content-style="{ color: '#fff' }"
  :tooltip-style="{ padding: '12px 18px', borderRadius: '12px' }"
>
  <template #title> Custom Title </template>
  <template #content>
    <p>Custom Content</p>
    <p>Custom Content</p>
  </template>
  <Button type="primary">Hover me</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover
    :max-width="180"
    bg-color="#000"
    :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
    :content-style="{ color: '#fff' }"
    :tooltip-style="{ padding: '12px 18px', borderRadius: '12px' }"
  >
    <template #title> Custom Title </template>
    <template #content>
      <p>Custom Content</p>
      <p>Custom Content</p>
    </template>
    <Button type="primary">Hover me</Button>
  </Popover>
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

<Popover :placement="placement" title="Title">
  <template #content>
    <p>Content</p>
  </template>
  <Button type="primary">Adjust Placement</Button>
</Popover>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
  <Popover :placement="placement" title="Title">
    <template #content>
      <p>Content</p>
    </template>
    <Button type="primary">Adjust Placement</Button>
  </Popover>
</template>
```

:::

## 箭头指向

_设置 `arrowPointAtCenter` 后，箭头将指向目标元素中心，仅当 `placement` 为复合方向（如 `topLeft`）时生效_

<br/>

<Space>
  <Popover placement="topLeft" title="Title" content="Vue Amazing UI">
    <Button type="primary">Align edge</Button>
  </Popover>
  <Popover placement="topLeft" arrow-point-at-center title="Title" content="Vue Amazing UI">
    <Button type="primary">Arrow points to center</Button>
  </Popover>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Popover placement="topLeft" title="Title" content="Vue Amazing UI">
      <Button type="primary">Align edge</Button>
    </Popover>
    <Popover placement="topLeft" arrow-point-at-center title="Title" content="Vue Amazing UI">
      <Button type="primary">Arrow points to center</Button>
    </Popover>
  </Space>
</template>
```

:::

## 不同的触发方式

_`click` 触发时再次点击触发器收起；`click` / `contextmenu` 触发时点击浮层之外或按 `esc` 关闭（与 [文字提示 Tooltip](./tooltip.md) 一致）_

<br/>

<Space>
  <Popover title="Hover Title">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Hover Me</Button>
  </Popover>
  <Popover title="Click Title" trigger="click">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Click Me</Button>
  </Popover>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Popover title="Hover Title">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hover Me</Button>
    </Popover>
    <Popover title="Click Title" trigger="click">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Click Me</Button>
    </Popover>
  </Space>
</template>
```

:::

## 受控显示

_使用 `v-model:open` 控制显隐；`openControl` 为真时 `trigger: hover` 不再驱动显隐，显隐完全由 `open` 决定_

<br/>

<Space vertical align="start" :gap="12">
  <Space>
    <Popover v-model:open="controlledOpen" title="Click Title" trigger="click">
      <template #content>
        <a @click="controlledOpen = false">Close</a>
      </template>
      <Button>Controlled: {{ controlledOpen }}</Button>
    </Popover>
    <Button type="primary" @click="controlledOpen = !controlledOpen">Toggle Open</Button>
  </Space>
  <Space>
    <Popover v-model:open="openControlOpen" open-control trigger="hover" title="Controlled Only">
      <template #content>
        <p>悬停不会展开，只有 open 为真才显示</p>
      </template>
      <Button>Hover (openControl)</Button>
    </Popover>
    <Button type="primary" @click="openControlOpen = !openControlOpen">Toggle Open (openControl)</Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const controlledOpen = ref(false)
const openControlOpen = ref(false)
</script>
<template>
  <Space vertical align="start" :gap="12">
    <Space>
      <Popover v-model:open="controlledOpen" title="Click Title" trigger="click">
        <template #content>
          <a @click="controlledOpen = false">Close</a>
        </template>
        <Button>Controlled: {{ controlledOpen }}</Button>
      </Popover>
      <Button type="primary" @click="controlledOpen = !controlledOpen">Toggle Open</Button>
    </Space>
    <Space>
      <Popover v-model:open="openControlOpen" open-control trigger="hover" title="Controlled Only">
        <template #content>
          <p>悬停不会展开，只有 open 为真才显示</p>
        </template>
        <Button>Hover (openControl)</Button>
      </Popover>
      <Button type="primary" @click="openControlOpen = !openControlOpen">Toggle Open (openControl)</Button>
    </Space>
  </Space>
</template>
```

:::

## 自定义过渡动画时间

<Popover title="Transition Duration 300ms" :transition-duration="300">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Transition Duration 300ms</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover title="Transition Duration 300ms" :transition-duration="300">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Transition Duration 300ms</Button>
  </Popover>
</template>
```

:::

## 延迟显示隐藏

<Space>
  <Popover
    :show-delay="300"
    :hide-delay="300"
    title="delay 300ms"
    content="Vue Amazing UI"
  >
    <Button type="primary">Delay 300ms Popover</Button>
  </Popover>
  <Popover
    :show-delay="500"
    :hide-delay="500"
    title="delay 500ms"
    content="Vue Amazing UI"
  >
    <Button type="primary">Delay 500ms Popover</Button>
  </Popover>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Popover
      :show-delay="300"
      :hide-delay="300"
      title="delay 300ms"
      content="Vue Amazing UI"
    >
      <Button type="primary">Delay 300ms Popover</Button>
    </Popover>
    <Popover
      :show-delay="500"
      :hide-delay="500"
      title="delay 500ms"
      content="Vue Amazing UI"
    >
      <Button type="primary">Delay 500ms Popover</Button>
    </Popover>
  </Space>
</template>
```

:::

## 隐藏后卸载

_设置 `destroyOnHide` 后，浮层在离开动画结束时卸载 `DOM`，再次显示时重新创建并定位；默认 `false`（元素常驻，仅切换显示）_

<br/>

<Space>
  <Popover title="Title" content="Vue Amazing UI" destroy-on-hide>
    <Button type="primary">Hover (destroyOnHide)</Button>
  </Popover>
  <Popover title="Title" content="Vue Amazing UI">
    <Button>Hover (default)</Button>
  </Popover>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Popover title="Title" content="Vue Amazing UI" destroy-on-hide>
      <Button type="primary">Hover (destroyOnHide)</Button>
    </Popover>
    <Popover title="Title" content="Vue Amazing UI">
      <Button>Hover (default)</Button>
    </Popover>
  </Space>
</template>
```

:::

## 隐藏箭头

<Popover :arrow="false" title="Title">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Hide Arrow</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover :arrow="false" title="Title">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Hide Arrow</Button>
  </Popover>
</template>
```

:::

<br/>

> _更多使用方式请参考 [文字提示 Tooltip](./tooltip.md)_

## APIs

### Popover Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| title | 卡片标题 | string | undefined |
| titleStyle | 卡片标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| content | 卡片内容 | string | undefined |
| contentStyle | 卡片内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| tooltipStyle | 设置弹出提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |

### 与 Tooltip 的差异

<br/>

`Popover` 完整继承 [Tooltip Props](./tooltip.md#tooltip-props) 及对应的 `Events` / `Methods`（类型 `PopoverProps` 即 `Omit<TooltipProps, …>` 叠加自有字段），`<Popover trigger="click">` 这类写法与 `<Tooltip trigger="click">` 等价。

下表只列与 `Tooltip` 不同的部分，其余属性、事件与方法见 [文字提示 Tooltip](./tooltip.md)：

| 名称 | 与 Tooltip 的差异 |
| :-- | :-- |
| title / content | `Popover` 自有属性，分别表示卡片标题 / 卡片内容，与 `Tooltip` 的同名属性无关 |
| contentStyle | `Popover` 自有属性，作用于卡片内容区（`Tooltip` 的 `contentStyle` 作用于触发器包裹层） |
| tooltipStyle | 作用于卡片容器，内置 `padding: 12px` / `border-radius: 8px` 与左对齐文案，可覆盖 |
| tooltipClass | 可用，类名落在卡片容器上（与 `tooltipStyle` 同节点） |
| contentClass | 不可用（类型上已从 `PopoverProps` 剔除），请改用 `contentStyle` 或 `#content` 插槽 |
| tooltip | 不可用：卡片内容由本组件渲染，请改用 `title` / `content` 或同名插槽 |
| maxWidth | 默认 `'auto'`（`Tooltip` 为 `240`） |
| bgColor | 默认 `var(--va-bg-elevated-color)`，与浮层底板同色（`Tooltip` 为 `var(--va-bg-spotlight-color)`） |
| transitionDuration | 默认 `200`（`Tooltip` 为 `100`） |
| anchor | 可用，但传入后不再渲染触发包裹层，触发元素需由使用方自行提供 |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| title | 自定义卡片标题 | v-slot:title |
| content | 自定义卡片内容 | v-slot:content |
| default | 自定义内容 | v-slot:default |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| openChange | 显示隐藏的回调 | (open: boolean) => void |
| animationend | 显示隐藏动画结束时的回调 | (open: boolean) => void |
