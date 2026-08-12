# 菜单 Menu

<GlobalElement />

*为页面提供导航功能的菜单列表*

## 何时使用

- 为页面和功能提供导航的菜单列表
- 可作为网站整体导航，也可作为页面局部功能的导航

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import type { ItemType } from 'components/menu'

const baseItems: ItemType[] = [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' }
        ]
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' }
        ]
      }
    ]
  },
  { type: 'divider' },
  {
    key: 'sub4',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' }
    ]
  }
]
const horizontalItems: ItemType[] = [
  { key: 'mail', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: 'app', icon: () => h(AppstoreOutlined), label: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { key: 'setting:1', label: 'Option 1' },
          { key: 'setting:2', label: 'Option 2' }
        ]
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { key: 'setting:3', label: 'Option 3' },
          { key: 'setting:4', label: 'Option 4' }
        ]
      }
    ]
  },
  {
    key: 'alipay',
    label: h('a', { href: 'https://antdv.com', target: '_blank', rel: 'noopener noreferrer' }, 'Navigation Four - Link')
  }
]
const verticalItems: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(SettingOutlined),
    label: 'Navigation Four',
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' }
    ]
  }
]

// 顶部导航
const horizontalOpen = ref([])
const horizontalSelected = ref(['mail'])
// 内嵌菜单
const inlineOpen = ref(['sub1'])
const inlineSelected = ref(['1'])
// 缩起内嵌菜单
const collapsed = ref(true)
const collapsedOpen = ref(['sub1'])
const collapsedSelected = ref(['1'])
function toggleCollapsed() { collapsed.value = !collapsed.value }
// 只展开当前父级菜单
const rootSubmenuKeys: (string | number)[] = ['sub1', 'sub2', 'sub4']
const parentOpen = ref<(string | number)[]>(['sub1'])
const parentSelected = ref(['1'])
function onParentOpenChange(openKeys: (string | number)[]) {
  const latestOpenKey = openKeys.find((key) => !parentOpen.value.includes(key))
  if (latestOpenKey === undefined || !rootSubmenuKeys.includes(latestOpenKey)) {
    parentOpen.value = openKeys
  } else {
    parentOpen.value = [latestOpenKey]
  }
}
// 垂直菜单
const verticalOpen = ref([])
const verticalSelected = ref([])
// 主题
const themeMode = ref<'light' | 'dark'>('dark')
const themeOpen = ref(['sub1'])
const themeSelected = ref(['1'])
// 子菜单主题
const subTheme = ref<'light' | 'dark'>('light')
const subThemeOpen = ref(['sub1'])
const subThemeSelected = ref(['1'])
const subThemeItems = computed<ItemType[]>(() => [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    theme: subTheme.value,
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' }
    ]
  },
  { key: '5', label: 'Option 5' },
  { key: '6', label: 'Option 6' }
])
// 切换菜单类型
const switchMode = ref<'vertical' | 'horizontal' | 'inline'>('inline')
const switchTheme = ref<'light' | 'dark'>('light')
const switchModeOpen = ref(['sub1'])
const switchModeSelected = ref(['1'])
</script>

## 顶部导航

水平的顶部导航菜单。

<Menu
  mode="horizontal"
  :items="horizontalItems"
  v-model:open-keys="horizontalOpen"
  v-model:selected-keys="horizontalSelected"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType } from 'vue-amazing-ui'

const items: ItemType[] = [
  { key: 'mail', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: 'app', icon: () => h(AppstoreOutlined), label: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    children: [
      { type: 'group', label: 'Item 1', children: [
        { key: 'setting:1', label: 'Option 1' }, { key: 'setting:2', label: 'Option 2' }
      ]},
      { type: 'group', label: 'Item 2', children: [
        { key: 'setting:3', label: 'Option 3' }, { key: 'setting:4', label: 'Option 4' }
      ]}
    ]
  },
  // 使用 h('a', ...) 渲染链接菜单项
  { key: 'alipay', label: h('a', { href: 'https://antdv.com', target: '_blank' }, 'Navigation Four - Link') }
]
const openKeys = ref([])
const selectedKeys = ref(['mail'])
</script>

<template>
  <Menu mode="horizontal" :items="items"
    v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" />
</template>
```

:::::

## 内嵌菜单

垂直菜单，子菜单内嵌在菜单区域。

<Menu
  style="width: 256px"
  mode="inline"
  :items="baseItems"
  v-model:open-keys="inlineOpen"
  v-model:selected-keys="inlineSelected"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType } from 'vue-amazing-ui'

const items: ItemType[] = [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    children: [
      { type: 'group', label: 'Item 1', children: [
        { key: '1', label: 'Option 1' }, { key: '2', label: 'Option 2' }
      ]},
      { type: 'group', label: 'Item 2', children: [
        { key: '3', label: 'Option 3' }, { key: '4', label: 'Option 4' }
      ]}
    ]
  },
  { key: 'sub2', icon: () => h(AppstoreOutlined), label: 'Navigation Two',
    children: [{ key: '5', label: 'Option 5' }, { key: '6', label: 'Option 6' }]
  },
  { type: 'divider' },
  { key: 'sub4', icon: () => h(SettingOutlined), label: 'Navigation Three',
    children: [{ key: '9', label: 'Option 9' }, { key: '10', label: 'Option 10' }]
  }
]
const openKeys = ref(['sub1'])
const selectedKeys = ref(['1'])
</script>

<template>
  <Menu style="width: 256px" mode="inline" :items="items"
    v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" />
</template>
```

:::::

## 缩起内嵌菜单

内嵌菜单可以被缩起/展开。收起时只显示图标，子菜单以弹出层形式展示；切换时自动缓存并恢复 `openKeys`。

<button @click="toggleCollapsed" class="mb10" style="cursor: pointer">
  {{ collapsed ? '展开' : '收起' }}菜单
</button>

<div style="width: 256px">
  <Menu
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    :items="baseItems"
    v-model:open-keys="collapsedOpen"
    v-model:selected-keys="collapsedSelected"
  />
</div>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const collapsed = ref(true)
const openKeys = ref(['sub1'])
const selectedKeys = ref(['1'])
</script>

<template>
  <button @click="collapsed = !collapsed">
    {{ collapsed ? '展开' : '收起' }}菜单
  </button>
  <div style="width: 256px">
    <Menu mode="inline" theme="dark" :inline-collapsed="collapsed"
      :items="items" v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" />
  </div>
</template>
```

:::::

## 只展开当前父级菜单

点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。

<Menu
  style="width: 256px"
  mode="inline"
  :items="baseItems"
  :open-keys="parentOpen"
  v-model:selected-keys="parentSelected"
  @open-change="onParentOpenChange"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'] // 顶层 SubMenu 的 key
const openKeys = ref<(string | number)[]>(['sub1'])
const selectedKeys = ref(['1'])
function onOpenChange(latest: (string | number)[]) {
  const latestOpenKey = latest.find((key) => !openKeys.value.includes(key))
  if (latestOpenKey === undefined || !rootSubmenuKeys.includes(latestOpenKey)) {
    openKeys.value = latest
  } else {
    openKeys.value = [latestOpenKey] // 只保留当前展开的顶层 SubMenu
  }
}
</script>

<template>
  <Menu style="width: 256px" mode="inline" :items="items"
    :open-keys="openKeys" v-model:selected-keys="selectedKeys"
    @open-change="onOpenChange" />
</template>
```

:::::

## 垂直菜单

子菜单是弹出的形式，支持多级嵌套。

<Menu
  style="width: 256px"
  mode="vertical"
  :items="verticalItems"
  v-model:open-keys="verticalOpen"
  v-model:selected-keys="verticalSelected"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType } from 'vue-amazing-ui'

const items: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
      // 三级嵌套子菜单
      { key: 'sub1-2', label: 'Submenu', children: [
        { key: '5', label: 'Option 5' }, { key: '6', label: 'Option 6' }
      ]}
    ]
  },
  { key: 'sub2', icon: () => h(SettingOutlined), label: 'Navigation Four',
    children: [{ key: '7', label: 'Option 7' }, { key: '8', label: 'Option 8' }]
  }
]
const openKeys = ref([])
const selectedKeys = ref([])
</script>

<template>
  <Menu style="width: 256px" mode="vertical" :items="items"
    v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" />
</template>
```

:::::

## 主题

内建了两套主题 `light` 和 `dark`，默认 `light`。

<Switch v-model="themeMode" checked-value="dark" unchecked-value="light" checked="Dark" unchecked="Light" />

<Menu
  style="width: 256px; margin-top: 12px"
  mode="inline"
  :theme="themeMode"
  :items="baseItems"
  v-model:open-keys="themeOpen"
  v-model:selected-keys="themeSelected"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const theme = ref<'light' | 'dark'>('dark')
const openKeys = ref(['sub1'])
const selectedKeys = ref(['1'])
</script>

<template>
  <Switch v-model="theme" checked-value="dark" unchecked-value="light" />
  <Menu style="width: 256px" mode="inline" :theme="theme" :items="items"
    v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" />
</template>
```

:::::

## 子菜单主题

你可以通过 `theme` 属性来设置 SubMenu 的主题从而达到不同目录树下不同主题色的效果。该例子默认为根目录深色，子目录浅色效果。

<Switch v-model="subTheme" checked-value="dark" unchecked-value="light" checked="dark" unchecked="light" />

<Menu
  style="width: 256px; margin-top: 12px"
  mode="vertical"
  theme="dark"
  :items="subThemeItems"
  v-model:open-keys="subThemeOpen"
  v-model:selected-keys="subThemeSelected"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { MailOutlined } from '@ant-design/icons-vue'
import type { ItemType } from 'vue-amazing-ui'

const subTheme = ref<'light' | 'dark'>('light')
const items = computed<ItemType[]>(() => [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    theme: subTheme.value, // 单个 SubMenu 独立设置主题
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' }
    ]
  },
  { key: '5', label: 'Option 5' },
  { key: '6', label: 'Option 6' }
])
const openKeys = ref(['sub1'])
const selectedKeys = ref(['1'])
</script>

<template>
  <Switch v-model="subTheme" checked-value="dark" unchecked-value="light" />
  <Menu style="width: 256px" mode="vertical" theme="dark" :items="items"
    v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" />
</template>
```

:::::

## 切换菜单类型

展示动态切换模式。

<Flex :gap="16">
  <Switch v-model="switchMode" checked-value="vertical" unchecked-value="inline" checked="vertical" unchecked="inline" />
  <Switch v-model="switchTheme" checked-value="dark" unchecked-value="light" checked="Dark" unchecked="Light" />
</Flex>

<Menu
  style="width: 256px; margin-top: 12px"
  :mode="switchMode"
  :theme="switchTheme"
  :items="baseItems"
  v-model:open-keys="switchModeOpen"
  v-model:selected-keys="switchModeSelected"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const mode = ref<'vertical' | 'inline'>('inline')
const theme = ref<'light' | 'dark'>('light')
const openKeys = ref(['sub1'])
const selectedKeys = ref(['1'])
</script>

<template>
  <Switch v-model="mode" checked-value="vertical" unchecked-value="inline" />
  <Switch v-model="theme" checked-value="dark" unchecked-value="light" />
  <Menu style="width: 256px" :mode="mode" :theme="theme" :items="items"
    v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" />
</template>
```

:::::

## API

### Menu Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单内容数据 | `ItemType[]` | `[]` |
| mode | 菜单类型，支持垂直、水平、内嵌三种模式 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| theme | 主题颜色 | `'light' \| 'dark'` | `'light'` |
| selectedKeys(v-model) | 当前选中的菜单项 key 数组 | `(string \| number)[]` | `[]` |
| openKeys(v-model) | 当前展开的 SubMenu 菜单项 key 数组 | `(string \| number)[]` | `[]` |
| multiple | 是否允许多选 | `boolean` | `false` |
| selectable | 是否允许选中 | `boolean` | `true` |
| inlineCollapsed | inline 时菜单是否收起状态（收起/展开时自动缓存并恢复 openKeys） | `boolean` | `undefined` |
| inlineIndent | inline 模式的菜单缩进宽度 (px) | `number` | `24` |
| triggerSubMenuAction | 触发子菜单展开的行为（inline 模式恒为 click） | `'click' \| 'hover'` | `'hover'` |
| subMenuOpenDelay | 鼠标进入子菜单后开启延时，单位秒 | `number` | `0` |
| subMenuCloseDelay | 鼠标离开子菜单后关闭延时，单位秒 | `number` | `0.1` |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | `boolean` | `false` |
| getPopupContainer | 自定义弹出层挂载容器 | `(node: HTMLElement) => HTMLElement` | 默认 `body` |
| expandIcon | 自定义 SubMenu 展开图标（可被单个 SubMenu 的 expandIcon 覆盖） | `VNode \| ((info: { isOpen: boolean }) => VNode)` | - |
| motion | inline 展开/收起动画配置（Vue Transition 属性子集，如 `{ name }`） | `MenuMotion` | - |
| disabled | 整个菜单是否禁用 | `boolean` | `false` |
| id | 根元素 id（无障碍） | `string` | - |
| tabindex | 根元素 tabindex（无障碍） | `number \| string` | - |
| role | 根元素 role（无障碍） | `string` | - |

### Menu Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击 MenuItem 时触发 | `(info: { item; key; keyPath })` |
| select | 选中 MenuItem 时触发 | `(info: { item; key; keyPath; selectedKeys })` |
| deselect | 多选模式下取消选中 MenuItem 时触发 | `(info: { item; key; keyPath; selectedKeys })` |
| openChange | SubMenu 展开/关闭时触发 | `(openKeys: (string \| number)[])` |
| focus | 根元素获得焦点时触发 | `(event: FocusEvent)` |
| blur | 根元素失去焦点时触发 | `(event: FocusEvent)` |
| mousedown | 根元素鼠标按下时触发 | `(event: MouseEvent)` |

### ItemType

```ts
type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType

// 所有菜单项共享的属性
interface ItemSharedProps {
  style?: CSSProperties            // 自定义行内样式
  class?: string                   // 自定义类名
}

interface MenuItemType extends ItemSharedProps {
  key: string | number             // 唯一标识（必填）
  label?: string | VNode           // 菜单项标题
  icon?: VNode | (() => VNode)     // 菜单图标
  title?: string                   // 收起时展示的悬浮标题
  disabled?: boolean               // 是否禁用，默认 false
  danger?: boolean                 // 危险样式，默认 false
  onClick?: (info: MenuItemClickInfo) => void       // 点击回调（先于 Menu 的 click 事件触发）
  onMouseenter?: (info: MenuItemHoverInfo) => void  // 鼠标移入回调
  onMouseleave?: (info: MenuItemHoverInfo) => void  // 鼠标移出回调
}

interface SubMenuType extends ItemSharedProps {
  key: string | number             // 唯一标识（必填）
  children: ItemType[]             // 子菜单项
  label?: string | VNode           // 子菜单标题
  icon?: VNode | (() => VNode)     // 菜单图标
  title?: string                   // 收起时展示的悬浮标题
  disabled?: boolean               // 是否禁用，默认 false
  theme?: 'light' | 'dark'         // 子菜单主题（默认从 Menu 继承）
  popupClassName?: string          // 弹出层类名
  popupOffset?: [number, number]   // 弹出层偏移 [x, y]
  rootClassName?: string           // 弹出层根类名
  expandIcon?: VNode | ((info: { isOpen: boolean }) => VNode) // 自定义展开图标
  onMouseenter?: (info: MenuItemHoverInfo) => void
  onMouseleave?: (info: MenuItemHoverInfo) => void
  onTitleClick?: (info: { key; domEvent: MouseEvent }) => void // 点击子菜单标题回调
}

interface MenuItemGroupType extends ItemSharedProps {
  type: 'group'                    // 分组标识（必填）
  label?: string | VNode           // 分组标题
  children: ItemType[]             // 分组内菜单项
  key?: string | number            // 可选唯一标识
}

interface MenuDividerType extends ItemSharedProps {
  type: 'divider'                  // 分割线标识（必填）
  dashed?: boolean                 // 是否虚线，默认 false
}
```
