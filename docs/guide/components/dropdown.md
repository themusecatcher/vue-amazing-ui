# 下拉菜单 Dropdown

<GlobalElement />

_向下弹出的列表_

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单，可在列表中进行选择，并执行相应的命令。

- 用于收罗一组命令操作
- `Select` 用于选择，而 `Dropdown` 是命令集合

<script setup lang="ts">
import { ref, h } from 'vue'
import type { Ref } from 'vue'
import { DownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption, DropdownKey } from 'vue-amazing-ui'
// 共用菜单数据（多个分区复用）
const basicMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 弹出位置（按弹框方向排布：top 系列在上排、bottom 系列在下排，左/中/右对应 *Left / 无后缀 / *Right）
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'] as const
// 触发方式（前两项为外链、中间一条分割线）
const triggerMenus: DropdownMenuOption[] = [
  { key: '0', label: '1st menu item', href: 'http://www.alipay.com/' },
  { key: '1', label: '2nd menu item', href: 'http://www.taobao.com/' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item' }
]
// 含链接、分割线、禁用项
const itemMenus: DropdownMenuOption[] = [
  { key: '0', label: '1st menu item', href: 'http://www.alipay.com/', target: '_blank' },
  { key: '1', label: '2nd menu item', href: 'http://www.taobao.com/', target: '_blank' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item（disabled）', disabled: true }
]
// 菜单分组
const groupMenus: DropdownMenuOption[] = [
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
// 危险项
const dangerMenus: DropdownMenuOption[] = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { type: 'divider' },
  { key: '3', label: 'Delete', danger: true }
]
// 菜单项加载中
const loadingMenus: DropdownMenuOption[] = [
  { key: '1', label: 'Submit and continue', loading: true },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 多级菜单（两级）
const subMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  {
    key: '3',
    label: 'sub menu',
    children: [
      { key: '3-1', label: '3rd menu item' },
      { key: '3-2', label: '4th menu item' }
    ]
  },
  {
    key: '4',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      { key: '4-1', label: '5d menu item' },
      { key: '4-2', label: '6th menu item' }
    ]
  }
]
// 多级菜单（三级，验证递归渲染）
const nestedMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  {
    key: '2',
    label: 'sub menu',
    children: [
      { key: '2-1', label: '2nd menu item' },
      {
        key: '2-2',
        label: 'nested sub menu',
        children: [
          { key: '2-2-1', label: '3rd menu item' },
          { key: '2-2-2', label: '4th menu item' }
        ]
      }
    ]
  }
]
// 菜单隐藏方式
const keepOpenMenus: DropdownMenuOption[] = [
  { key: '1', label: 'Clicking me will not close the menu.' },
  { key: '2', label: 'Clicking me will not close the menu also.' },
  { key: '3', label: 'Clicking me will close the menu' }
]
// 展开状态（受控）
const visible = ref<boolean>(false)
// 带图标的菜单
const iconMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item', icon: h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: h(UserOutlined) },
  { key: '3', label: '3rd item', icon: h(UserOutlined) }
]
// 按钮加载中
const buttonMenus: DropdownMenuOption[] = [{ key: '1', label: 'Submit and continue' }]
// 按钮加载状态
const loading1 = ref<boolean>(false)
const loading2 = ref<boolean>(false)
// 事件处理
// 菜单项点击：key 为菜单项唯一标识，option 为完整菜单项配置
function onMenuClick(key: DropdownKey | undefined, option: DropdownMenuOption) {
  console.log(`Click on item ${key}`, option)
}
// 受控 open：仅在展开时记录状态，菜单项点击引发的关闭请求交由 onKeepOpenMenuClick 决定
function onKeepOpenOpenChange(val: boolean) {
  if (val) {
    visible.value = true
  }
}
// 仅点击第 3 项时关闭菜单，其余项保持展开
function onKeepOpenMenuClick(key: DropdownKey | undefined) {
  if (key === '3') {
    visible.value = false
  }
}
function onButtonClick(e: MouseEvent) {
  console.log('click left button', e)
}
function enterLoading(target: Ref<boolean>) {
  target.value = true
  setTimeout(() => {
    target.value = false
  }, 6000)
}
function enterLoading1() {
  enterLoading(loading1)
}
function enterLoading2() {
  enterLoading(loading2)
}
</script>

## 基本使用

<Dropdown :menus="basicMenus">
  <a @click.prevent>
    Hover me
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const basicMenus: DropdownMenuOption[] = [
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

:::

## 触发方式

_默认是移入触发菜单，可以点击触发。_

<Dropdown :menus="triggerMenus" trigger="click">
  <a @click.prevent>
    Click me
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const triggerMenus: DropdownMenuOption[] = [
  { key: '0', label: '1st menu item', href: 'http://www.alipay.com/' },
  { key: '1', label: '2nd menu item', href: 'http://www.taobao.com/' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="triggerMenus" trigger="click">
    <a @click.prevent>
      Click me
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::

_触发方式可组合成数组，移入展开、点击收起。_

<Dropdown :menus="basicMenus" :trigger="['hover', 'click']">
  <a @click.prevent>
    Hover or Click me
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const basicMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="basicMenus" :trigger="['hover', 'click']">
    <a @click.prevent>
      Hover or Click me
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::

## 右键菜单

_默认是移入触发菜单，可以点击鼠标右键触发。_

<br/>

<Dropdown :menus="basicMenus" trigger="contextmenu">
  <div class="dropdown-doc-context">Right Click on here</div>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import type { DropdownMenuOption } from 'vue-amazing-ui'
const basicMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown :menus="basicMenus" trigger="contextmenu">
    <div style="width: 240px; height: 200px; line-height: 200px; text-align: center; color: #777; background: #f7f7f7; border-radius: 8px">
      Right Click on here
    </div>
  </Dropdown>
</template>
```

:::

## 触发事件

_点击菜单项后会触发事件，用户可以通过相应的菜单项 `key` 进行不同的操作。_

<Dropdown :menus="basicMenus" @menu-click="onMenuClick">
  <a @click.prevent>
    Hover me, Click menu item
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownKey, DropdownMenuOption } from 'vue-amazing-ui'
const basicMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
function onMenuClick(key: DropdownKey | undefined, option: DropdownMenuOption) {
  console.log(`Click on item ${key}`, option)
}
</script>
<template>
  <Dropdown :menus="basicMenus" @menu-click="onMenuClick">
    <a @click.prevent>
      Hover me, Click menu item
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::

## 弹出位置

_支持 `6` 个弹出位置。_

<br/>

<div class="dropdown-doc-placement">
  <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p">
    <Button>{{ p }}</Button>
  </Dropdown>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import type { DropdownMenuOption } from 'vue-amazing-ui'
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const basicMenus: DropdownMenuOption[] = [
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

:::

## 箭头

<div class="dropdown-doc-placement">
  <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p" arrow>
    <Button>{{ p }}</Button>
  </Dropdown>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import type { DropdownMenuOption } from 'vue-amazing-ui'
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const basicMenus: DropdownMenuOption[] = [
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

:::

## 箭头指向

_设置 `arrow` 为 `{ pointAtCenter: true }` 后，箭头将指向目标元素的中心。_

<br/>

<div class="dropdown-doc-placement">
  <Dropdown
    v-for="p in placements"
    :key="p"
    :menus="basicMenus"
    :placement="p"
    :arrow="{ pointAtCenter: true }"
  >
    <Button>{{ p }}</Button>
  </Dropdown>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import type { DropdownMenuOption } from 'vue-amazing-ui'
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const basicMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
</script>
<template>
  <Dropdown
    v-for="p in placements"
    :key="p"
    :menus="basicMenus"
    :placement="p"
    :arrow="{ pointAtCenter: true }"
  >
    <Button>{{ p }}</Button>
  </Dropdown>
</template>
```

:::

## 其他元素

_分割线和不可用菜单项。_

<Dropdown :menus="itemMenus">
  <a @click.prevent>
    Hover me
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const itemMenus: DropdownMenuOption[] = [
  { key: '0', label: '1st menu item', href: 'http://www.alipay.com/', target: '_blank' },
  { key: '1', label: '2nd menu item', href: 'http://www.taobao.com/', target: '_blank' },
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

:::

## 菜单分组

_支持把菜单项进行分组，分组子项相对分组标题缩进显示。_

<Dropdown :menus="groupMenus">
  <a @click.prevent>
    Grouped menu
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const groupMenus: DropdownMenuOption[] = [
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

:::

## 危险项

_设置菜单项的 `danger` 属性可标记为危险项。_

<br/>

<Dropdown :menus="dangerMenus" trigger="click">
  <Button>Danger Menu</Button>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import type { DropdownMenuOption } from 'vue-amazing-ui'
const dangerMenus: DropdownMenuOption[] = [
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

:::

## 菜单项加载中

_添加菜单项的 `loading` 属性即可让该菜单项进入加载状态。_

<br/>

<Dropdown :menus="loadingMenus" trigger="click">
  <Button>Loading Menu</Button>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import type { DropdownMenuOption } from 'vue-amazing-ui'
const loadingMenus: DropdownMenuOption[] = [
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

:::

## 多级菜单

_传入的菜单里有多个层级。_

<Dropdown :menus="subMenus">
  <a @click.prevent>
    Cascading menu
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const subMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  {
    key: '3',
    label: 'sub menu',
    children: [
      { key: '3-1', label: '3rd menu item' },
      { key: '3-2', label: '4th menu item' }
    ]
  },
  {
    key: '4',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      { key: '4-1', label: '5d menu item' },
      { key: '4-2', label: '6th menu item' }
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

:::

_菜单层级支持递归渲染，可嵌套任意层级。_

<Dropdown :menus="nestedMenus">
  <a @click.prevent>
    Nested menu
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const nestedMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  {
    key: '2',
    label: 'sub menu',
    children: [
      { key: '2-1', label: '2nd menu item' },
      {
        key: '2-2',
        label: 'nested sub menu',
        children: [
          { key: '2-2-1', label: '3rd menu item' },
          { key: '2-2-2', label: '4th menu item' }
        ]
      }
    ]
  }
]
</script>
<template>
  <Dropdown :menus="nestedMenus">
    <a @click.prevent>
      Nested menu
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::

## 禁用

_菜单不可用。_

<br/>

<Dropdown :menus="basicMenus" disabled>
  <Button>Disabled Menu</Button>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import type { DropdownMenuOption } from 'vue-amazing-ui'
const basicMenus: DropdownMenuOption[] = [
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

:::

<style lang="less" scoped>
/* 弹出位置 / 箭头 / 箭头指向：按弹框方向排布（top 系列在上排、bottom 系列在下排，左/中/右对应 *Left / 无后缀 / *Right），
   行间距留出弹框展示空间，便于直观看出各弹出位置 */
.dropdown-doc-placement {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  justify-content: space-between;
  row-gap: 140px;
  width: 420px;
  max-width: 100%;
}
.dropdown-doc-btn-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.dropdown-doc-context {
  width: 240px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #777;
  background: #f7f7f7;
  border-radius: 8px;
}
.dropdown-doc-overlay {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
}
:deep(.btn-tail-icon) {
  margin-left: 8px;
}
</style>

## 菜单隐藏方式

_默认是点击关闭菜单，可以关闭此功能。_

<Dropdown
  :menus="keepOpenMenus"
  :open="visible"
  @menu-click="onKeepOpenMenuClick"
  @open-change="onKeepOpenOpenChange"
>
  <a @click.prevent>
    Hover me
    <DownOutlined />
  </a>
</Dropdown>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownKey, DropdownMenuOption } from 'vue-amazing-ui'
const keepOpenMenus: DropdownMenuOption[] = [
  { key: '1', label: 'Clicking me will not close the menu.' },
  { key: '2', label: 'Clicking me will not close the menu also.' },
  { key: '3', label: 'Clicking me will close the menu' }
]
const visible = ref<boolean>(false)
function onKeepOpenOpenChange(val: boolean) {
  if (val) {
    visible.value = true
  }
}
function onKeepOpenMenuClick(key: DropdownKey | undefined) {
  if (key === '3') {
    visible.value = false
  }
}
</script>
<template>
  <Dropdown
    :menus="keepOpenMenus"
    :open="visible"
    @menu-click="onKeepOpenMenuClick"
    @open-change="onKeepOpenOpenChange"
  >
    <a @click.prevent>
      Hover me
      <DownOutlined />
    </a>
  </Dropdown>
</template>
```

:::

## 带下拉框的按钮

_左边是按钮，右边是额外的相关功能菜单。可设置 `icon` 属性来修改右边的图标。_

<br/>

<div class="dropdown-doc-btn-wrap">
  <DropdownButton :menus="iconMenus" @click="onButtonClick" @menu-click="onMenuClick">
    Dropdown
  </DropdownButton>
  <DropdownButton :menus="iconMenus">
    Dropdown
    <template #icon>
      <UserOutlined />
    </template>
  </DropdownButton>
  <DropdownButton :menus="iconMenus" disabled @click="onButtonClick"> Dropdown </DropdownButton>
  <Dropdown :menus="iconMenus">
    <Button>
      Button
      <DownOutlined class="btn-tail-icon" />
    </Button>
  </Dropdown>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const iconMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item', icon: h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: h(UserOutlined) },
  { key: '3', label: '3rd item', icon: h(UserOutlined) }
]
function onButtonClick(e: MouseEvent) {
  console.log('click left button', e)
}
function onMenuClick(key, option) {
  console.log(`Click on item ${key}`, option)
}
</script>
<template>
  <DropdownButton :menus="iconMenus" @click="onButtonClick" @menu-click="onMenuClick">
    Dropdown
  </DropdownButton>
  <DropdownButton :menus="iconMenus">
    Dropdown
    <template #icon>
      <UserOutlined />
    </template>
  </DropdownButton>
  <DropdownButton :menus="iconMenus" disabled @click="onButtonClick"> Dropdown </DropdownButton>
  <Dropdown :menus="iconMenus">
    <Button>
      Button
      <DownOutlined />
    </Button>
  </Dropdown>
</template>
```

:::

## 加载中状态

_添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。_

<br/>

<Space direction="vertical">
  <DropdownButton :menus="buttonMenus" type="primary" loading>Submit</DropdownButton>
  <DropdownButton :menus="buttonMenus" type="primary" size="small" loading>Submit</DropdownButton>
  <DropdownButton :menus="buttonMenus" type="primary" :loading="loading1" @click="enterLoading1">
    Submit
  </DropdownButton>
  <DropdownButton :menus="buttonMenus" :loading="loading2" @click="enterLoading2">
    Submit
    <template #icon>
      <DownOutlined />
    </template>
  </DropdownButton>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownMenuOption } from 'vue-amazing-ui'
const buttonMenus: DropdownMenuOption[] = [{ key: '1', label: 'Submit and continue' }]
const loading1 = ref<boolean>(false)
const loading2 = ref<boolean>(false)
function enterLoading1() {
  loading1.value = true
  setTimeout(() => {
    loading1.value = false
  }, 6000)
}
function enterLoading2() {
  loading2.value = true
  setTimeout(() => {
    loading2.value = false
  }, 6000)
}
</script>
<template>
  <Space direction="vertical">
    <DropdownButton :menus="buttonMenus" type="primary" loading>Submit</DropdownButton>
    <DropdownButton :menus="buttonMenus" type="primary" size="small" loading>Submit</DropdownButton>
    <DropdownButton :menus="buttonMenus" type="primary" :loading="loading1" @click="enterLoading1">
      Submit
    </DropdownButton>
    <DropdownButton :menus="buttonMenus" :loading="loading2" @click="enterLoading2">
      Submit
      <template #icon>
        <DownOutlined />
      </template>
    </DropdownButton>
  </Space>
</template>
```

:::

## 自定义浮层内容

_使用 `overlay` 插槽自定义下拉内容，与 `menus` 配置二选一。_

<br/>

<Dropdown trigger="click">
  <Button>Custom Overlay</Button>
  <template #overlay>
    <div class="dropdown-doc-overlay">
      <SmileOutlined />
      <span>自定义内容</span>
    </div>
  </template>
</Dropdown>

::: details Show Code

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

:::

## APIs

### Dropdown

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
open <Tag color="cyan">v-model</Tag> | 下拉菜单是否展开 | boolean | undefined
menus | 菜单项配置数据 (配置式)，与 `overlay` 插槽二选一 | [MenuOption](#menuoption-type)[] | []
placement | 下拉菜单弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomLeft'
arrow | 是否显示下拉箭头；传 `{ pointAtCenter: true }` 时箭头指向触发器中心 | boolean &#124; [DropdownArrowOptions](#dropdownarrowoptions-type) | false
disabled | 菜单是否禁用 | boolean | false
trigger | 触发下拉行为的方式，可传数组组合 | [DropdownTrigger](#dropdowntrigger-type) &#124; [DropdownTrigger](#dropdowntrigger-type)[] | 'hover'
flip | 下拉菜单被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true
mouseEnterDelay | 移入触发器显示下拉菜单的延迟时间，单位 `ms`，`trigger` 含 `'hover'` 时生效 | number | 100
mouseLeaveDelay | 移出触发器隐藏下拉菜单的延迟时间，单位 `ms`，`trigger` 含 `'hover'` 时生效 | number | 100
transitionDuration | 下拉菜单动画的过渡持续时间，单位 `ms` | number | 200
destroyOnHide | 隐藏后是否卸载下拉菜单 `DOM`：离开动画结束后卸载，再次显示时重新创建并重新定位 | boolean | false
to | 下拉菜单挂载的容器节点，可选：元素标签名 (例如 `'body'`) 或者元素本身，`false` 会待在原地；不传时就近挂载到 `Modal` / `Drawer` / `Dialog` 等承载层内容容器（无承载层则 `body`） | string &#124; HTMLElement &#124; false | undefined
overlayClassName | 下拉菜单根元素的类名 | string | undefined
overlayStyle | 下拉菜单根元素的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
zIndex | 下拉菜单层级，优先级最高（未传时使用默认层级或 `ConfigProvider` 的 `baseZIndex` 分配） | number | undefined

### DropdownTrigger Type

类型 | 说明
:-- | :--
'hover' &#124; 'click' &#124; 'contextmenu' | 分别对应移入、点击、右键触发；传入数组可组合多种触发方式

### DropdownArrowOptions Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
pointAtCenter | 箭头是否指向触发器中心 | boolean | false

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
children | 子菜单（多级菜单）或分组子项，支持任意层级递归 | [MenuOption](#menuoption-type)[] | undefined

### DropdownButton

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
open <Tag color="cyan">v-model</Tag> | 下拉菜单是否展开 | boolean | undefined
menus | 菜单项配置数据 (配置式)，与 `overlay` 插槽二选一 | [MenuOption](#menuoption-type)[] | []
type | 按钮类型，同 [Button](/guide/components/button.html#button) | 'default' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'default'
size | 按钮尺寸，同 [Button](/guide/components/button.html#button) | 'small' &#124; 'middle' &#124; 'large' | 'middle'
icon | 右侧下拉按钮图标（默认为省略号），插槽形态请用 `#icon` 插槽 | VNode | undefined
placement | 下拉菜单弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomRight'
arrow | 是否显示下拉箭头；传 `{ pointAtCenter: true }` 时箭头指向触发器中心 | boolean &#124; [DropdownArrowOptions](#dropdownarrowoptions-type) | false
disabled | 菜单是否禁用（左按钮和右按钮同时禁用） | boolean | false
loading | 左侧按钮加载状态 | boolean | false
trigger | 触发下拉行为的方式，可传数组组合 | [DropdownTrigger](#dropdowntrigger-type) &#124; [DropdownTrigger](#dropdowntrigger-type)[] | 'hover'
mouseEnterDelay | 移入触发按钮显示下拉菜单的延迟时间，单位 `ms`，`trigger` 含 `'hover'` 时生效 | number | 100
mouseLeaveDelay | 移出触发按钮隐藏下拉菜单的延迟时间，单位 `ms`，`trigger` 含 `'hover'` 时生效 | number | 100
destroyOnHide | 隐藏后是否卸载下拉菜单 `DOM` | boolean | false
to | 下拉菜单挂载的容器节点，可选：元素标签名 (例如 `'body'`) 或者元素本身，`false` 会待在原地；不传时就近挂载到 `Modal` / `Drawer` / `Dialog` 等承载层内容容器（无承载层则 `body`） | string &#124; HTMLElement &#124; false | undefined
overlayClassName | 下拉菜单根元素的类名 | string | undefined
overlayStyle | 下拉菜单根元素的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}

## Events

### Dropdown

名称 | 说明 | 类型
:-- | :-- | :--
openChange | 下拉菜单展开收起时的回调（点击菜单项导致的收起不触发） | (open: boolean) => void
menuClick | 点击菜单项时的回调（`disabled`、`loading` 项不触发） | (key: string &#124; number &#124; undefined, option: [MenuOption](#menuoption-type)) => void

### DropdownButton

名称 | 说明 | 类型
:-- | :-- | :--
click | 点击左侧按钮时的回调 | (e: MouseEvent) => void
openChange | 下拉菜单展开收起时的回调（点击菜单项导致的收起不触发） | (open: boolean) => void
menuClick | 点击菜单项时的回调（`disabled`、`loading` 项不触发） | (key: string &#124; number &#124; undefined, option: [MenuOption](#menuoption-type)) => void

## Slots

### Dropdown

名称 | 说明 | 用法
:-- | :-- | :--
default | 触发器内容 | v-slot:default
overlay | 自定义下拉浮层内容（与 `menus` 配置二选一） | v-slot:overlay
label | 自定义菜单项显示文本 | v-slot:label="{ option }"

### DropdownButton

名称 | 说明 | 用法
:-- | :-- | :--
default | 左侧按钮内容 | v-slot:default
overlay | 自定义下拉浮层内容（与 `menus` 配置二选一） | v-slot:overlay
icon | 自定义右侧下拉按钮图标（优先于 `icon` 属性） | v-slot:icon
label | 自定义菜单项显示文本 | v-slot:label="{ option }"
