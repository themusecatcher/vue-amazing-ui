# 下拉菜单 Dropdown

<GlobalElement />

_向下弹出的列表_

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单，可在列表中进行选择，并执行相应的命令。

- 用于收罗一组命令操作
- Select 用于选择，而 Dropdown 是命令集合

## 基本

最简单的下拉菜单。

<Dropdown :menus="basicMenus">
  <a @click.prevent>
    Hover me
    <DownOutlined />
  </a>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="basicMenus">
    <a @click.prevent>
      Hover me
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::::

## 弹出位置

支持 6 个弹出位置。

<div class="dropdown-doc-placement">
  <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p">
    <Button>{{ p }}</Button>
  </Dropdown>
</div>

::::: details Show Code

```vue
<script setup lang="ts">
const placements = ['bottomLeft', 'bottom', 'bottomRight', 'topLeft', 'top', 'topRight']
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p">
    <Button>{{ p }}</Button>
  </Dropdown>
</template>
```

:::::

## 其他元素

分割线和不可用菜单项。

<Dropdown :menus="itemMenus">
  <a @click.prevent>
    Hover me
    <DownOutlined />
  </a>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
const itemMenus = [
  { key: '0', label: '1st menu item', href: 'https://www.antdv.com/', target: '_blank' },
  { key: '1', label: '2nd menu item', href: 'https://www.vuejs.org/', target: '_blank' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item（disabled）', disabled: true }
]
</script>
<template>
  <Dropdown :menus="itemMenus">
    <a @click.prevent>
      Hover me
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::::

## 触发方式

默认是移入触发菜单，可以点击触发。

<Dropdown :menus="basicMenus" trigger="click">
  <a @click.prevent>
    Click me
    <DownOutlined />
  </a>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="basicMenus" trigger="click">
    <a @click.prevent>
      Click me
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::::

## 触发事件

点击菜单项后触发 `menuClick` 事件，事件对象包含菜单项 `key` 与完整配置 `option`（打开控制台查看）。

<Dropdown :menus="iconMenus" @menu-click="onMenuClick">
  <a @click.prevent>
    Hover me, Click menu item
    <DownOutlined />
  </a>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'
const iconMenus = [
  { key: '1', label: '1st menu item', icon: h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: h(UserOutlined) },
  { key: '3', label: '3rd menu item', icon: h(UserOutlined) }
]
function onMenuClick(key, option) {
  console.log('menu click', key, option)
}
</script>
<template>
  <Dropdown :menus="iconMenus" @menu-click="onMenuClick">
    <a @click.prevent>
      Hover me, Click menu item
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::::

## 右键菜单

默认是移入触发菜单，可以点击鼠标右键触发，菜单会在鼠标点击位置弹出。

<Dropdown :menus="basicMenus" trigger="contextMenu">
  <div class="dropdown-doc-context">Right Click on here</div>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="basicMenus" trigger="contextMenu">
    <div style="width: 240px; height: 120px; line-height: 120px; text-align: center; color: #777; background: #f7f7f7; border-radius: 8px">
      Right Click on here
    </div>
  </Dropdown>
</template>
```

:::::

## 箭头

设置 `arrow` 属性显示下拉框箭头。

<div class="dropdown-doc-placement">
  <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p" arrow>
    <Button>{{ p }}</Button>
  </Dropdown>
</div>

::::: details Show Code

```vue
<script setup lang="ts">
const placements = ['bottomLeft', 'bottom', 'bottomRight', 'topLeft', 'top', 'topRight']
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p" arrow>
    <Button>{{ p }}</Button>
  </Dropdown>
</template>
```

:::::

## 菜单隐藏方式

使用 `open` 属性（支持 `v-model:open`）控制展开状态。

<Dropdown v-model:open="open" :menus="basicMenus" trigger="click" @open-change="onOpenChange">
  <Button>{{ open ? '展开中' : '点击展开' }}</Button>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
function onOpenChange(o) {
  console.log('open change', o)
}
</script>
<template>
  <Dropdown v-model:open="open" :menus="basicMenus" trigger="click" @open-change="onOpenChange">
    <Button>{{ open ? '展开中' : '点击展开' }}</Button>
  </Dropdown>
</template>
```

:::::

## 多级菜单

传入的菜单里有多个层级。

<Dropdown :menus="subMenus">
  <a @click.prevent>
    Cascading menu
    <DownOutlined />
  </a>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
const subMenus = [
  { key: '1', label: 'Navigation One' },
  { key: '2', label: 'Navigation Two' },
  {
    key: '3',
    label: 'Navigation Three - Submenu',
    children: [
      { key: '3-1', label: 'Option 3-1' },
      { key: '3-2', label: 'Option 3-2' },
      { key: '3-3', label: 'Option 3-3' }
    ]
  }
]
</script>
<template>
  <Dropdown :menus="subMenus">
    <a @click.prevent>
      Cascading menu
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::::

## 加载中

添加 `loading` 属性即可让菜单项进入加载状态。

<Dropdown :menus="loadingMenus" trigger="click">
  <Button>Loading Menu</Button>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
const loadingMenus = [
  { key: '1', label: 'Submit and continue', loading: true },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="loadingMenus" trigger="click">
    <Button>Loading Menu</Button>
  </Dropdown>
</template>
```

:::::

## 菜单分组

支持把菜单项进行分组，分组子项相对分组标题缩进显示。

<Dropdown :menus="groupMenus">
  <a @click.prevent>
    Grouped menu
    <DownOutlined />
  </a>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
const groupMenus = [
  {
    type: 'group',
    label: 'Group 1',
    children: [
      { key: '1-1', label: 'Option 1-1' },
      { key: '1-2', label: 'Option 1-2' }
    ]
  },
  {
    type: 'group',
    label: 'Group 2',
    children: [
      { key: '2-1', label: 'Option 2-1' },
      { key: '2-2', label: 'Option 2-2' }
    ]
  }
]
</script>
<template>
  <Dropdown :menus="groupMenus">
    <a @click.prevent>
      Grouped menu
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::::

## 危险项

设置菜单项的 `danger` 属性可标记为危险项。

<Dropdown :menus="dangerMenus" trigger="click">
  <Button>Danger Menu</Button>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
const dangerMenus = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { type: 'divider' },
  { key: '3', label: 'Delete', danger: true }
]
</script>
<template>
  <Dropdown :menus="dangerMenus" trigger="click">
    <Button>Danger Menu</Button>
  </Dropdown>
</template>
```

:::::

## 自定义浮层内容

使用 `overlay` 插槽自定义下拉内容，与 `menus` 配置二选一。

<Dropdown trigger="click">
  <Button>Custom Overlay</Button>
  <template #overlay>
    <div style="display: flex; align-items: center; gap: 8px; padding: 12px 16px">
      <SmileOutlined />
      <span>自定义内容</span>
    </div>
  </template>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Dropdown trigger="click">
    <Button>Custom Overlay</Button>
    <template #overlay>
      <div style="display: flex; align-items: center; gap: 8px; padding: 12px 16px">
        <SmileOutlined />
        <span>自定义内容</span>
      </div>
    </template>
  </Dropdown>
</template>
```

:::::

## 按钮式下拉菜单

左侧是按钮，右侧是额外的相关功能菜单。

<Space>
  <DropdownButton :menus="iconMenus" @click="onButtonClick" @menu-click="onMenuClick">
    Dropdown
  </DropdownButton>
  <DropdownButton :menus="iconMenus" type="primary">
    Dropdown
  </DropdownButton>
  <DropdownButton :menus="iconMenus" disabled>
    Dropdown
  </DropdownButton>
</Space>

::::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
const iconMenus = [
  { key: '1', label: '1st menu item', icon: h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: h(UserOutlined) },
  { key: '3', label: '3rd menu item', icon: h(UserOutlined) }
]
function onButtonClick(e) {
  console.log('left button click', e)
}
function onMenuClick(key, option) {
  console.log('menu click', key, option)
}
</script>
<template>
  <Space>
    <DropdownButton :menus="iconMenus" @click="onButtonClick" @menu-click="onMenuClick">
      Dropdown
    </DropdownButton>
    <DropdownButton :menus="iconMenus" type="primary">
      Dropdown
    </DropdownButton>
    <DropdownButton :menus="iconMenus" disabled>
      Dropdown
    </DropdownButton>
  </Space>
</template>
```

:::::

## 禁用

菜单不可用。

<Dropdown :menus="basicMenus" disabled>
  <Button>Disabled Menu</Button>
</Dropdown>

::::: details Show Code

```vue
<script setup lang="ts">
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="basicMenus" disabled>
    <Button>Disabled Menu</Button>
  </Dropdown>
</template>
```

:::::

<script setup lang="ts">
import { ref, h } from 'vue'
import { DownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons-vue'
// 基础菜单数据（配置式）
const basicMenus = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 含分割线、禁用项、链接项
const itemMenus = [
  { key: '0', label: '1st menu item', href: 'https://www.antdv.com/', target: '_blank' },
  { key: '1', label: '2nd menu item', href: 'https://www.vuejs.org/', target: '_blank' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item（disabled）', disabled: true }
]
// 带图标
const iconMenus = [
  { key: '1', label: '1st menu item', icon: h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: h(UserOutlined) },
  { key: '3', label: '3rd menu item', icon: h(UserOutlined) }
]
// 加载中
const loadingMenus = [
  { key: '1', label: 'Submit and continue', loading: true },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 危险项
const dangerMenus = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { type: 'divider' },
  { key: '3', label: 'Delete', danger: true }
]
// 多级菜单
const subMenus = [
  { key: '1', label: 'Navigation One' },
  { key: '2', label: 'Navigation Two' },
  {
    key: '3',
    label: 'Navigation Three - Submenu',
    children: [
      { key: '3-1', label: 'Option 3-1' },
      { key: '3-2', label: 'Option 3-2' },
      { key: '3-3', label: 'Option 3-3' }
    ]
  }
]
// 分组
const groupMenus = [
  {
    type: 'group',
    label: 'Group 1',
    children: [
      { key: '1-1', label: 'Option 1-1' },
      { key: '1-2', label: 'Option 1-2' }
    ]
  },
  {
    type: 'group',
    label: 'Group 2',
    children: [
      { key: '2-1', label: 'Option 2-1' },
      { key: '2-2', label: 'Option 2-2' }
    ]
  }
]
const placements = ['bottomLeft', 'bottom', 'bottomRight', 'topLeft', 'top', 'topRight']
const open = ref(false)
function onMenuClick(key: string | number | undefined, option: { label?: string }) {
  console.log('menu click', key, option)
}
function onOpenChange(o: boolean) {
  console.log('open change', o)
}
function onButtonClick(e: MouseEvent) {
  console.log('left button click', e)
}
</script>

<style>
.dropdown-doc-placement {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.dropdown-doc-context {
  width: 240px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  color: #777;
  background: #f7f7f7;
  border-radius: 8px;
}
</style>

## APIs

### Dropdown

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
menus | 菜单项配置数据 (配置式)，与 `overlay` 插槽二选一 | [MenuOption](#menuoption-type)[] | []
placement | 下拉菜单弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomLeft'
trigger | 触发下拉行为的方式 | 'hover' &#124; 'click' &#124; 'contextMenu' | 'hover'
disabled | 菜单是否禁用 | boolean | false
arrow | 是否显示下拉箭头 | boolean | false
open <Tag color="cyan">v-model</Tag> | 下拉菜单是否展开 | boolean | undefined
flip | 下拉菜单被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true
to | 下拉菜单挂载的容器节点，可选：元素标签名 (例如 `'body'`) 或者元素本身，`false` 会待在原地 | string &#124; HTMLElement &#124; false | 'body'
overlayClassName | 下拉菜单根元素的类名 | string | undefined
overlayStyle | 下拉菜单根元素的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
transitionDuration | 下拉菜单动画的过渡持续时间，单位 `ms` | number | 200
mouseEnterDelay | 移入触发器显示下拉菜单的延迟时间，单位 `ms`，仅当 `trigger: 'hover'` 时生效 | number | 100
mouseLeaveDelay | 移出触发器隐藏下拉菜单的延迟时间，单位 `ms`，仅当 `trigger: 'hover'` 时生效 | number | 100

更多属性请参考 [Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip)

### MenuOption Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
key | 菜单项唯一标识 | string &#124; number | undefined
label | 菜单项显示文本 | string | undefined
icon | 菜单项图标 | VNode | undefined
disabled | 是否禁用 | boolean | false
danger | 是否为危险项（红色文本） | boolean | false
loading | 是否加载中 | boolean | false
href | 链接地址，存在时菜单项渲染为 `a` 标签 | string | undefined
target | 链接打开方式，`href` 存在时生效 | '_self' &#124; '_blank' | '_self'
type | 菜单项类型：菜单项 &#124; 分割线 &#124; 分组 | 'item' &#124; 'divider' &#124; 'group' | 'item'
children | 子菜单（多级菜单）或分组子项 | [MenuOption](#menuoption-type)[] | undefined

### DropdownButton

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
menus | 菜单项配置数据 (配置式)，与 `overlay` 插槽二选一 | [MenuOption](#menuoption-type)[] | []
placement | 下拉菜单弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomRight'
trigger | 触发下拉行为的方式 | 'hover' &#124; 'click' &#124; 'contextMenu' | 'hover'
disabled | 菜单是否禁用（左按钮和右按钮同时禁用） | boolean | false
arrow | 是否显示下拉箭头 | boolean | false
open <Tag color="cyan">v-model</Tag> | 下拉菜单是否展开 | boolean | undefined
type | 按钮类型，同 [Button](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | 'default' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'default'
size | 按钮尺寸，同 [Button](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | 'small' &#124; 'middle' &#124; 'large' | 'middle'
loading | 左侧按钮加载状态 | boolean | false
icon | 右侧下拉按钮图标 | VNode | undefined
to | 下拉菜单挂载的容器节点，可选：元素标签名 (例如 `'body'`) 或者元素本身，`false` 会待在原地 | string &#124; HTMLElement &#124; false | 'body'
overlayClassName | 下拉菜单根元素的类名 | string | undefined
overlayStyle | 下拉菜单根元素的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}

## Events

### Dropdown

名称 | 说明 | 类型
:-- | :-- | :--
openChange | 下拉菜单展开收起时的回调 | (open: boolean) => void
menuClick | 点击菜单项时的回调（`disabled`、`loading` 项不触发） | (key: string &#124; number &#124; undefined, option: [MenuOption](#menuoption-type)) => void

### DropdownButton

名称 | 说明 | 类型
:-- | :-- | :--
click | 点击左侧按钮时的回调 | (e: MouseEvent) => void
openChange | 下拉菜单展开收起时的回调 | (open: boolean) => void
menuClick | 点击菜单项时的回调（`disabled`、`loading` 项不触发） | (key: string &#124; number &#124; undefined, option: [MenuOption](#menuoption-type)) => void

## Slots

名称 | 说明 | 参数
:-- | :-- | :--
overlay | 自定义下拉浮层内容（与 `menus` 配置二选一） | -
label | 自定义菜单项显示文本 | { option: [MenuOption](#menuoption-type) }
default | 触发器内容（DropdownButton 中为左侧按钮内容） | -
