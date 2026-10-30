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

#### 继承自 Tooltip 的属性

除上述自有属性外，`Popover` 完整继承 [Tooltip Props](./tooltip.md#tooltip-props) —— 类型为 `PopoverProps`，即 `Omit<TooltipProps, …>` 后叠加自有字段，`<Popover trigger="click">` 这类写法与 `<Tooltip trigger="click">` 等价。以下为高频项（默认值为 `Popover` 的实际取值）：

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| open <Tag color="cyan">v-model</Tag> | 卡片是否显示；显式传入（含 `false`）即为受控，显隐以该值为准，内部触发只经 `update:open` / `openChange` 上报（不传时由内部触发自管） | boolean | undefined |
| openControl | 仅当 `trigger: hover` 时生效：移入移出连 `update:open` 都不再上报（显隐受控本身由是否传入 `open` 决定） | boolean | false |
| placement | 卡片位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' &#124; 'left' &#124; 'leftTop' &#124; 'leftBottom' &#124; 'right' &#124; 'rightTop' &#124; 'rightBottom' | 'top' |
| arrow | 是否显示箭头 | boolean | true |
| arrowPointAtCenter | 箭头是否指向目标元素中心，仅当 `placement` 为复合方向 (如 `topLeft`) 时生效 | boolean | false |
| maxWidth | 卡片最大宽度，单位 `px` | string &#124; number | 'auto' |
| bgColor | 卡片背景颜色，支持预设色或自定义色值 (如 `#f50` / `rgba`) | string | 'var(--va-bg-elevated-color)' |
| popupClassName | 设置浮层面板（定位盒）的类名 | string | undefined |
| popupStyle | 设置浮层面板（定位盒）的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| disabled | 禁用卡片，禁用后不响应任何触发 | boolean | false |
| trigger | 触发方式 | 'hover' &#124; 'click' &#124; 'focus' &#124; 'contextmenu' | 'hover' |
| keyboard | 是否支持按键操作 (`enter` 切换显示)，仅当 `trigger: 'click'` 时生效；`esc` 关闭不受此属性控制，`trigger` 为 `click` / `contextmenu` 时始终可用 | boolean | false |
| flip | 卡片被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true |
| showDelay | 显示延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| hideDelay | 隐藏延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| destroyOnHide | 隐藏后是否卸载浮层 `DOM`：离开动画结束后卸载，再次显示时重新创建并重新定位 | boolean | false |
| to | 浮层挂载的容器节点（同 [Tooltip `to`](./tooltip.md#tooltip-props)，不传时优先挂到最近的承载层内容容器） | string &#124; HTMLElement &#124; false | undefined |
| zIndex | 浮层层级，优先级最高 | number | undefined |
| transitionDuration | 卡片动画的过渡持续时间，单位 `ms` | number | 200 |

**未在此列出**的继承属性与 [Tooltip Props](./tooltip.md#tooltip-props) 完全一致，类型见 `TooltipProps`。

#### 特殊字段

| 名称 | 说明 |
| :-- | :-- |
| contentStyle / tooltipStyle | 支持，含义同自有属性：分别作用于卡片内容区与卡片容器（覆盖内置的 `padding` / 圆角） |
| contentClass / tooltip | **不支持**（类型上已从 `PopoverProps` 剔除）。运行时传入仍会作为 `Tooltip` 属性透传并生效（`Omit` 只修正类型承诺，挡不住运行时）：`contentClass` 落在触发包裹层，`tooltip` 被 `#tooltip` 插槽覆盖 —— 均属未定义行为，请改用 `#content` 插槽与自有属性 |
| anchor | 支持。传入后不再渲染触发包裹层（默认插槽不渲染），需自行提供触发元素；`#tooltip` 卡片仍正常渲染 |
| content / title | 为 `Popover` 自有属性（卡片内容 / 标题），与 `Tooltip` 的同名 `content` 无关 |

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
