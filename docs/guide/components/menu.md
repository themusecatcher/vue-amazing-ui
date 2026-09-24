# 导航菜单 Menu

<GlobalElement />

*为页面和功能提供导航的菜单列表*

## 何时使用

- 需要为页面提供水平方向或垂直方向的导航入口时
- 需要以展开 / 收起的方式组织带层级关系的菜单项时

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import {
  AppstoreOutlined,
  CalendarOutlined,
  DesktopOutlined,
  DownOutlined,
  InboxOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  RightOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import type { ItemType, MenuIcon, MenuKey } from 'vue-amazing-ui'

// 演示数据构造：图标以渲染函数给出
function getItem(label: string, key: string, icon?: MenuIcon, children?: ItemType[], type?: 'group'): ItemType {
  return { key, icon, children, label, type } as ItemType
}

// 顶部导航
const horizontalSelected = ref<MenuKey[]>(['mail'])
const horizontalItems: ItemType[] = [
  { key: 'mail', icon: () => h(MailOutlined), label: 'Navigation One', title: 'Navigation One' },
  { key: 'app', icon: () => h(AppstoreOutlined), label: 'Navigation Two', title: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      getItem('Item 1', 'g1', undefined, [getItem('Option 1', 'setting:1'), getItem('Option 2', 'setting:2')], 'group'),
      getItem('Item 2', 'g2', undefined, [getItem('Option 3', 'setting:3'), getItem('Option 4', 'setting:4')], 'group')
    ]
  },
  { key: 'alipay', label: 'Navigation Four - Link', title: 'Navigation Four - Link' }
]

// 内嵌菜单
const inlineSelected = ref<MenuKey[]>(['1'])
const inlineOpenKeys = ref<MenuKey[]>(['sub1'])
const inlineItems: ItemType[] = [
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Item 1', 'g1', undefined, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', undefined, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group')
  ]),
  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', undefined, [getItem('Option 7', '7'), getItem('Option 8', '8')])
  ]),
  { type: 'divider' },
  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ]),
  getItem('Group', 'grp', undefined, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group')
]

// 垂直菜单
const verticalSelected = ref<MenuKey[]>(['1'])
const verticalOpenKeys = ref<MenuKey[]>(['sub1'])
const verticalItems: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One', title: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two', title: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    title: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3', title: 'Option 3' },
      { key: '4', label: 'Option 4', title: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          { key: '5', label: 'Option 5', title: 'Option 5' },
          { key: '6', label: 'Option 6', title: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(SettingOutlined),
    label: 'Navigation Four',
    title: 'Navigation Four',
    children: [
      { key: '7', label: 'Option 7', title: 'Option 7' },
      { key: '8', label: 'Option 8', title: 'Option 8' },
      { key: '9', label: 'Option 9', title: 'Option 9' },
      { key: '10', label: 'Option 10', title: 'Option 10' }
    ]
  }
]

// 切换菜单类型
const switchMode = ref(false)
const switchTheme = ref(false)
const switchSelected = ref<MenuKey[]>(['1'])
const switchOpenKeys = ref<MenuKey[]>(['sub1'])
const switchItems: ItemType[] = [
  getItem('Navigation One', '1', h(MailOutlined)),
  getItem('Navigation Two', '2', h(CalendarOutlined)),
  getItem('Navigation Three', 'sub1', h(AppstoreOutlined), [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', undefined, [getItem('Option 5', '5'), getItem('Option 6', '6')])
  ]),
  getItem('Navigation Four', 'sub2', h(SettingOutlined), [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10')
  ])
]

// 缩起内嵌菜单
const collapsed = ref(false)
const collapsedSelected = ref<MenuKey[]>(['1'])
const collapsedOpenKeys = ref<MenuKey[]>(['sub1'])
const collapsedItems: ItemType[] = [
  { key: '1', icon: () => h(PieChartOutlined), label: 'Option 1', title: 'Option 1' },
  { key: '2', icon: () => h(DesktopOutlined), label: 'Option 2', title: 'Option 2' },
  { key: '3', icon: () => h(InboxOutlined), label: 'Option 3', title: 'Option 3' },
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    children: [
      { key: '5', label: 'Option 5', title: 'Option 5' },
      { key: '6', label: 'Option 6', title: 'Option 6' },
      { key: '7', label: 'Option 7', title: 'Option 7' },
      { key: '8', label: 'Option 8', title: 'Option 8' }
    ]
  }
]

// 只展开当前父级菜单
const rootSubmenuKeys: MenuKey[] = ['sub1', 'sub2', 'sub4']
const parentOpenKeys = ref<MenuKey[]>(['sub1'])
const parentSelected = ref<MenuKey[]>([])
const parentItems: ItemType[] = [
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4')
  ]),
  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', undefined, [getItem('Option 7', '7'), getItem('Option 8', '8')])
  ]),
  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ])
]
// 展开集合受控：仅保留最新展开的顶层子菜单，其余一并收起
function onParentOpenChange(openKeys: MenuKey[]) {
  const latestOpenKey = openKeys.find((key) => !parentOpenKeys.value.includes(key))
  if (latestOpenKey === undefined || !rootSubmenuKeys.includes(latestOpenKey)) {
    parentOpenKeys.value = openKeys
  } else {
    parentOpenKeys.value = [latestOpenKey]
  }
}

// 多选
const multipleSelected = ref<MenuKey[]>(['1'])
const multipleItems: ItemType[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation',
    children: [
      { key: '4', label: 'Option 4' },
      { key: '5', label: 'Option 5' }
    ]
  }
]

// 禁用
const disabledSelected = ref<MenuKey[]>(['1'])
const wholeDisabled = ref(false)
const disabledItems: ItemType[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2（disabled）', disabled: true },
  { key: '3', label: 'Option 3（danger）', danger: true },
  { key: '4', label: 'Option 4', disabled: true }
]

// 空数据
const emptyItems: ItemType[] = []

// 自定义展开图标
const expandIconSelected = ref<MenuKey[]>(['1'])
const expandIconOpenKeys = ref<MenuKey[]>(['sub1'])
const expandIconItems: ItemType[] = [
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Submenu', 'sub2', undefined, [getItem('Option 3', '3'), getItem('Option 4', '4')])
  ]),
  getItem('Navigation Two', 'sub3', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6')
  ])
]

// 主题
const themeDark = ref(true)
const themeSelected = ref<MenuKey[]>(['1'])
const themeOpenKeys = ref<MenuKey[]>(['sub1'])
const themeItems: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One', title: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two', title: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    title: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3', title: 'Option 3' },
      { key: '4', label: 'Option 4', title: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          { key: '5', label: 'Option 5', title: 'Option 5' },
          { key: '6', label: 'Option 6', title: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(SettingOutlined),
    label: 'Navigation Four',
    title: 'Navigation Four',
    children: [
      { key: '7', label: 'Option 7', title: 'Option 7' },
      { key: '8', label: 'Option 8', title: 'Option 8' },
      { key: '9', label: 'Option 9', title: 'Option 9' },
      { key: '10', label: 'Option 10', title: 'Option 10' }
    ]
  }
]

// 子菜单主题：根目录深色、子目录浅色（子菜单 theme 随开关变化）
const submenuDark = ref(false)
const submenuSelected = ref<MenuKey[]>(['1'])
const submenuOpenKeys = ref<MenuKey[]>(['sub1'])
const submenuItems = computed<ItemType[]>(() => [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    theme: submenuDark.value ? 'dark' : 'light',
    children: [
      { key: '1', label: 'Option 1', title: 'Option 1' },
      { key: '2', label: 'Option 2', title: 'Option 2' },
      { key: '3', label: 'Option 3', title: 'Option 3' }
    ]
  },
  { key: '5', label: 'Option 5', title: 'Option 5' },
  { key: '6', label: 'Option 6', title: 'Option 6' }
])
</script>

## 顶部导航

*水平的顶部导航菜单*

<br/>

<Menu v-model:selectedKeys="horizontalSelected" mode="horizontal" :items="horizontalItems" />

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuIcon, MenuKey } from 'vue-amazing-ui'

function getItem(label: string, key: string, icon?: MenuIcon, children?: ItemType[], type?: 'group'): ItemType {
  return { key, icon, children, label, type } as ItemType
}
const horizontalSelected = ref<MenuKey[]>(['mail'])
const horizontalItems: ItemType[] = [
  { key: 'mail', icon: () => h(MailOutlined), label: 'Navigation One', title: 'Navigation One' },
  { key: 'app', icon: () => h(AppstoreOutlined), label: 'Navigation Two', title: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      getItem('Item 1', 'g1', undefined, [getItem('Option 1', 'setting:1'), getItem('Option 2', 'setting:2')], 'group'),
      getItem('Item 2', 'g2', undefined, [getItem('Option 3', 'setting:3'), getItem('Option 4', 'setting:4')], 'group')
    ]
  },
  { key: 'alipay', label: 'Navigation Four - Link', title: 'Navigation Four - Link' }
]
</script>
<template>
  <Menu v-model:selectedKeys="horizontalSelected" mode="horizontal" :items="horizontalItems" />
</template>
```

:::::

## 内嵌菜单

*子菜单内嵌在菜单区域内，可逐级展开*

<br/>

<Menu
  v-model:openKeys="inlineOpenKeys"
  v-model:selectedKeys="inlineSelected"
  style="width: 256px"
  mode="inline"
  :items="inlineItems"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuIcon, MenuKey } from 'vue-amazing-ui'

function getItem(label: string, key: string, icon?: MenuIcon, children?: ItemType[], type?: 'group'): ItemType {
  return { key, icon, children, label, type } as ItemType
}
const inlineSelected = ref<MenuKey[]>(['1'])
const inlineOpenKeys = ref<MenuKey[]>(['sub1'])
const inlineItems: ItemType[] = [
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Item 1', 'g1', undefined, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', undefined, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group')
  ]),
  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', undefined, [getItem('Option 7', '7'), getItem('Option 8', '8')])
  ]),
  { type: 'divider' },
  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ]),
  getItem('Group', 'grp', undefined, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group')
]
</script>
<template>
  <Menu
    v-model:openKeys="inlineOpenKeys"
    v-model:selectedKeys="inlineSelected"
    style="width: 256px"
    mode="inline"
    :items="inlineItems"
  />
</template>
```

:::::

## 垂直菜单

*子菜单以弹出形式展示，支持多级嵌套*

<br/>

<Menu
  v-model:openKeys="verticalOpenKeys"
  v-model:selectedKeys="verticalSelected"
  style="width: 256px"
  mode="vertical"
  :items="verticalItems"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'

const verticalSelected = ref<MenuKey[]>(['1'])
const verticalOpenKeys = ref<MenuKey[]>(['sub1'])
const verticalItems: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One', title: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two', title: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    title: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3', title: 'Option 3' },
      { key: '4', label: 'Option 4', title: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          { key: '5', label: 'Option 5', title: 'Option 5' },
          { key: '6', label: 'Option 6', title: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(SettingOutlined),
    label: 'Navigation Four',
    title: 'Navigation Four',
    children: [
      { key: '7', label: 'Option 7', title: 'Option 7' },
      { key: '8', label: 'Option 8', title: 'Option 8' },
      { key: '9', label: 'Option 9', title: 'Option 9' },
      { key: '10', label: 'Option 10', title: 'Option 10' }
    ]
  }
]
</script>
<template>
  <Menu
    v-model:openKeys="verticalOpenKeys"
    v-model:selectedKeys="verticalSelected"
    style="width: 256px"
    mode="vertical"
    :items="verticalItems"
  />
</template>
```

:::::

## 切换菜单类型

*动态切换菜单模式与主题*

<br/>

<Switch v-model:value="switchMode" checked="vertical" unchecked="inline" />
<span class="demo-divider" />
<Switch v-model:value="switchTheme" checked="dark" unchecked="light" />
<Menu
  v-model:openKeys="switchOpenKeys"
  v-model:selectedKeys="switchSelected"
  style="width: 256px; margin-top: 16px"
  :mode="switchMode ? 'vertical' : 'inline'"
  :theme="switchTheme ? 'dark' : 'light'"
  :items="switchItems"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuIcon, MenuKey } from 'vue-amazing-ui'

function getItem(label: string, key: string, icon?: MenuIcon, children?: ItemType[]): ItemType {
  return { key, icon, children, label } as ItemType
}
const switchMode = ref(false)
const switchTheme = ref(false)
const switchSelected = ref<MenuKey[]>(['1'])
const switchOpenKeys = ref<MenuKey[]>(['sub1'])
const switchItems: ItemType[] = [
  getItem('Navigation One', '1', h(MailOutlined)),
  getItem('Navigation Two', '2', h(CalendarOutlined)),
  getItem('Navigation Three', 'sub1', h(AppstoreOutlined), [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', undefined, [getItem('Option 5', '5'), getItem('Option 6', '6')])
  ]),
  getItem('Navigation Four', 'sub2', h(SettingOutlined), [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10')
  ])
]
</script>
<template>
  <Switch v-model:value="switchMode" checked="vertical" unchecked="inline" />
  <span class="demo-divider" />
  <Switch v-model:value="switchTheme" checked="dark" unchecked="light" />
  <Menu
    v-model:openKeys="switchOpenKeys"
    v-model:selectedKeys="switchSelected"
    style="width: 256px; margin-top: 16px"
    :mode="switchMode ? 'vertical' : 'inline'"
    :theme="switchTheme ? 'dark' : 'light'"
    :items="switchItems"
  />
</template>
```

:::::

## 缩起内嵌菜单

*收起时只显示图标，子菜单以浮层展示，悬浮菜单项可查看完整标题*

<br/>

<Button type="primary" class="mb10" @click="collapsed = !collapsed">
  <MenuUnfoldOutlined v-if="collapsed" />
  <MenuFoldOutlined v-else />
</Button>
<Menu
  v-model:openKeys="collapsedOpenKeys"
  v-model:selectedKeys="collapsedSelected"
  style="width: 256px"
  mode="inline"
  theme="dark"
  :inline-collapsed="collapsed"
  :items="collapsedItems"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import {
  DesktopOutlined,
  InboxOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined
} from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'

const collapsed = ref(false)
const collapsedSelected = ref<MenuKey[]>(['1'])
const collapsedOpenKeys = ref<MenuKey[]>(['sub1'])
const collapsedItems: ItemType[] = [
  { key: '1', icon: () => h(PieChartOutlined), label: 'Option 1', title: 'Option 1' },
  { key: '2', icon: () => h(DesktopOutlined), label: 'Option 2', title: 'Option 2' },
  { key: '3', icon: () => h(InboxOutlined), label: 'Option 3', title: 'Option 3' },
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    children: [
      { key: '5', label: 'Option 5', title: 'Option 5' },
      { key: '6', label: 'Option 6', title: 'Option 6' },
      { key: '7', label: 'Option 7', title: 'Option 7' },
      { key: '8', label: 'Option 8', title: 'Option 8' }
    ]
  }
]
</script>
<template>
  <Button type="primary" style="margin-bottom: 10px" @click="collapsed = !collapsed">
    <MenuUnfoldOutlined v-if="collapsed" />
    <MenuFoldOutlined v-else />
  </Button>
  <Menu
    v-model:openKeys="collapsedOpenKeys"
    v-model:selectedKeys="collapsedSelected"
    style="width: 256px"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    :items="collapsedItems"
  />
</template>
```

:::::

## 只展开当前父级菜单

*点击菜单时收起其他已展开的菜单，保持菜单聚焦简洁*

<br/>

<Menu
  style="width: 256px"
  mode="inline"
  :items="parentItems"
  :open-keys="parentOpenKeys"
  v-model:selectedKeys="parentSelected"
  @open-change="onParentOpenChange"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuIcon, MenuKey } from 'vue-amazing-ui'

function getItem(label: string, key: string, icon?: MenuIcon, children?: ItemType[]): ItemType {
  return { key, icon, children, label } as ItemType
}
const rootSubmenuKeys: MenuKey[] = ['sub1', 'sub2', 'sub4']
const parentOpenKeys = ref<MenuKey[]>(['sub1'])
const parentSelected = ref<MenuKey[]>([])
const parentItems: ItemType[] = [
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4')
  ]),
  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', undefined, [getItem('Option 7', '7'), getItem('Option 8', '8')])
  ]),
  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ])
]
// 展开集合受控：仅保留最新展开的顶层子菜单，其余一并收起
function onParentOpenChange(openKeys: MenuKey[]) {
  const latestOpenKey = openKeys.find((key) => !parentOpenKeys.value.includes(key))
  if (latestOpenKey === undefined || !rootSubmenuKeys.includes(latestOpenKey)) {
    parentOpenKeys.value = openKeys
  } else {
    parentOpenKeys.value = [latestOpenKey]
  }
}
</script>
<template>
  <Menu
    style="width: 256px"
    mode="inline"
    :items="parentItems"
    :open-keys="parentOpenKeys"
    v-model:selectedKeys="parentSelected"
    @open-change="onParentOpenChange"
  />
</template>
```

:::::

## 多选

*通过 `multiple` 允许多选，再次点击已选中项会触发取消选中*

<br/>

<Menu v-model:selectedKeys="multipleSelected" style="width: 256px" mode="inline" multiple :items="multipleItems" />

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'

const multipleSelected = ref<MenuKey[]>(['1'])
const multipleItems: ItemType[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation',
    children: [
      { key: '4', label: 'Option 4' },
      { key: '5', label: 'Option 5' }
    ]
  }
]
</script>
<template>
  <Menu v-model:selectedKeys="multipleSelected" style="width: 256px" mode="inline" multiple :items="multipleItems" />
</template>
```

:::::

## 禁用

*通过 `disabled` 禁用整个菜单；菜单项自身的 `disabled` 只禁用该项，`danger` 用于呈现错误状态样式*

<br/>

<Switch v-model:value="wholeDisabled" checked="禁用" unchecked="可用" />
<Menu
  v-model:selectedKeys="disabledSelected"
  style="width: 256px; margin-top: 16px"
  mode="inline"
  :disabled="wholeDisabled"
  :items="disabledItems"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'

const disabledSelected = ref<MenuKey[]>(['1'])
const wholeDisabled = ref(false)
const disabledItems: ItemType[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2（disabled）', disabled: true },
  { key: '3', label: 'Option 3（danger）', danger: true },
  { key: '4', label: 'Option 4', disabled: true }
]
</script>
<template>
  <Switch v-model:value="wholeDisabled" checked="禁用" unchecked="可用" />
  <Menu
    v-model:selectedKeys="disabledSelected"
    style="width: 256px; margin-top: 16px"
    mode="inline"
    :disabled="wholeDisabled"
    :items="disabledItems"
  />
</template>
```

:::::

## 空数据

*菜单内容为空时渲染空列表，不报错也不残留占位*

<br/>

<Menu style="width: 256px" mode="inline" :items="emptyItems" />

::::: details Show Code

```vue
<script setup lang="ts">
import type { ItemType } from 'vue-amazing-ui'

const emptyItems: ItemType[] = []
</script>
<template>
  <Menu style="width: 256px" mode="inline" :items="emptyItems" />
</template>
```

:::::

## 自定义展开图标

*通过 `expandIcon` 属性或同名插槽自定义子菜单的展开收起图标*

<br/>

<Menu
  v-model:openKeys="expandIconOpenKeys"
  v-model:selectedKeys="expandIconSelected"
  style="width: 256px"
  mode="inline"
  :items="expandIconItems"
>
  <template #expandIcon="{ isOpen }">
    <DownOutlined v-if="isOpen" />
    <RightOutlined v-else />
  </template>
</Menu>

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { AppstoreOutlined, DownOutlined, MailOutlined, RightOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuIcon, MenuKey } from 'vue-amazing-ui'

function getItem(label: string, key: string, icon?: MenuIcon, children?: ItemType[]): ItemType {
  return { key, icon, children, label } as ItemType
}
const expandIconSelected = ref<MenuKey[]>(['1'])
const expandIconOpenKeys = ref<MenuKey[]>(['sub1'])
const expandIconItems: ItemType[] = [
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Submenu', 'sub2', undefined, [getItem('Option 3', '3'), getItem('Option 4', '4')])
  ]),
  getItem('Navigation Two', 'sub3', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6')
  ])
]
</script>
<template>
  <Menu
    v-model:openKeys="expandIconOpenKeys"
    v-model:selectedKeys="expandIconSelected"
    style="width: 256px"
    mode="inline"
    :items="expandIconItems"
  >
    <template #expandIcon="{ isOpen }">
      <DownOutlined v-if="isOpen" />
      <RightOutlined v-else />
    </template>
  </Menu>
</template>
```

:::::

## 主题

*内建 `light` 与 `dark` 两套主题，默认为 `light`*

<br/>

<Switch v-model:value="themeDark" checked="Dark" unchecked="Light" />
<Menu
  v-model:openKeys="themeOpenKeys"
  v-model:selectedKeys="themeSelected"
  style="width: 256px; margin-top: 16px"
  mode="inline"
  :theme="themeDark ? 'dark' : 'light'"
  :items="themeItems"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'

const themeDark = ref(true)
const themeSelected = ref<MenuKey[]>(['1'])
const themeOpenKeys = ref<MenuKey[]>(['sub1'])
const themeItems: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One', title: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two', title: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    title: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3', title: 'Option 3' },
      { key: '4', label: 'Option 4', title: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          { key: '5', label: 'Option 5', title: 'Option 5' },
          { key: '6', label: 'Option 6', title: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(SettingOutlined),
    label: 'Navigation Four',
    title: 'Navigation Four',
    children: [
      { key: '7', label: 'Option 7', title: 'Option 7' },
      { key: '8', label: 'Option 8', title: 'Option 8' },
      { key: '9', label: 'Option 9', title: 'Option 9' },
      { key: '10', label: 'Option 10', title: 'Option 10' }
    ]
  }
]
</script>
<template>
  <Switch v-model:value="themeDark" checked="Dark" unchecked="Light" />
  <Menu
    v-model:openKeys="themeOpenKeys"
    v-model:selectedKeys="themeSelected"
    style="width: 256px; margin-top: 16px"
    mode="inline"
    :theme="themeDark ? 'dark' : 'light'"
    :items="themeItems"
  />
</template>
```

:::::

## 子菜单主题

*通过子菜单的 `theme` 属性设置其主题，可实现根目录深色、子目录浅色的效果*

<br/>

<Switch v-model:value="submenuDark" checked="Dark" unchecked="Light" />
<Menu
  style="width: 256px; margin-top: 16px"
  mode="vertical"
  theme="dark"
  :open-keys="submenuOpenKeys"
  v-model:selectedKeys="submenuSelected"
  :items="submenuItems"
/>

::::: details Show Code

```vue
<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { MailOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'

const submenuDark = ref(false)
const submenuSelected = ref<MenuKey[]>(['1'])
const submenuOpenKeys = ref<MenuKey[]>(['sub1'])
const submenuItems = computed<ItemType[]>(() => [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    theme: submenuDark.value ? 'dark' : 'light',
    children: [
      { key: '1', label: 'Option 1', title: 'Option 1' },
      { key: '2', label: 'Option 2', title: 'Option 2' },
      { key: '3', label: 'Option 3', title: 'Option 3' }
    ]
  },
  { key: '5', label: 'Option 5', title: 'Option 5' },
  { key: '6', label: 'Option 6', title: 'Option 6' }
])
</script>
<template>
  <Switch v-model:value="submenuDark" checked="Dark" unchecked="Light" />
  <Menu
    style="width: 256px; margin-top: 16px"
    mode="vertical"
    theme="dark"
    :open-keys="submenuOpenKeys"
    v-model:selectedKeys="submenuSelected"
    :items="submenuItems"
  />
</template>
```

:::::

## APIs

### Menu

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
openKeys <Tag color="cyan">v-model</Tag> | 当前展开的子菜单 `key` 数组，不传时为非受控 | [MenuKey](#menukey-type)[] | undefined
selectedKeys <Tag color="cyan">v-model</Tag> | 当前选中的菜单项 `key` 数组，不传时为非受控 | [MenuKey](#menukey-type)[] | undefined
items | 菜单内容 | [ItemType](#itemtype-type)[] | []
mode | 菜单类型 | 'horizontal' &#124; 'vertical' &#124; 'inline' | 'vertical'
theme | 主题颜色 | 'light' &#124; 'dark' | 'light'
inlineCollapsed | `inline` 模式下是否收起，收起时子菜单改为浮层展开 | boolean | false
inlineIndent | `inline` 模式每一级菜单项的缩进宽度 | number | 24
expandIcon | 自定义子菜单的展开收起图标 | (info: [MenuExpandIconInfo](#menuexpandiconinfo-type)) => VNodeChild | undefined
disabled | 是否禁用整个菜单 | boolean | false
selectable | 是否允许选中 | boolean | true
multiple | 是否允许多选 | boolean | false
triggerSubMenuAction | 子菜单的展开触发方式 | 'click' &#124; 'hover' | 'hover'
subMenuOpenDelay | 鼠标进入子菜单后开启的延时，单位秒 | number | 0
subMenuCloseDelay | 鼠标离开子菜单后关闭的延时，单位秒 | number | 0.1

### MenuKey Type

名称 | 值
:-- | :--
MenuKey | string &#124; number

### MenuNode Type

名称 | 值
:-- | :--
MenuNode | VNodeChild &#124; (() => VNodeChild)

### MenuIcon Type

名称 | 值
:-- | :--
MenuIcon | VNodeChild &#124; ((item: [SubMenuType](#submenutype-type) &#124; [MenuItemType](#menuitemtype-type)) => VNodeChild)

### ItemType Type

名称 | 值
:-- | :--
ItemType | [SubMenuType](#submenutype-type) &#124; [MenuItemType](#menuitemtype-type) &#124; [MenuItemGroupType](#menuitemgrouptype-type) &#124; [MenuDividerType](#menudividertype-type) &#124; null &#124; undefined

### MenuItemType Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
key | 唯一标志 | [MenuKey](#menukey-type) | —
label | 菜单项标题，支持渲染函数 | [MenuNode](#menunode-type) | undefined
icon | 菜单图标，渲染函数入参为所在菜单项的配置 | [MenuIcon](#menuicon-type) | undefined
title | 收起时展示的悬浮标题 | string | undefined
disabled | 是否禁用 | boolean | false
danger | 是否展示错误状态样式 | boolean | false
style | 菜单项自定义样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
class | 菜单项自定义类名 | string | undefined

### SubMenuType Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
key | 唯一标志 | [MenuKey](#menukey-type) | —
label | 子菜单标题，支持渲染函数 | [MenuNode](#menunode-type) | undefined
children | 子菜单的菜单项 | [ItemType](#itemtype-type)[] | —
icon | 菜单图标，渲染函数入参为所在子菜单的配置 | [MenuIcon](#menuicon-type) | undefined
theme | 子菜单主题，不传则继承 `Menu` 的 `theme` | 'light' &#124; 'dark' | undefined
title | 收起时展示的悬浮标题 | string | undefined
popupClassName | 弹出子菜单的自定义类名，`inline` 模式下无效 | string | undefined
popupOffset | 弹出子菜单与锚点的偏移，`inline` 模式下无效 | [number, number] | undefined
onTitleClick | 点击子菜单标题 | (info: [MenuTitleInfo](#menutitleinfo-type)) => void | undefined
disabled | 是否禁用 | boolean | false
style | 子菜单自定义样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
class | 子菜单自定义类名 | string | undefined

### MenuItemGroupType Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
type | 固定为 `group`，标记该项为分组 | 'group' | —
label | 分组标题，支持渲染函数 | [MenuNode](#menunode-type) | undefined
children | 分组的菜单项 | [ItemType](#itemtype-type)[] | undefined
style | 分组标题自定义样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
class | 分组标题自定义类名 | string | undefined

### MenuDividerType Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
type | 固定为 `divider`，标记该项为分割线 | 'divider' | —
dashed | 是否虚线 | boolean | false
style | 分割线自定义样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
class | 分割线自定义类名 | string | undefined

### MenuExpandIconInfo Type

`expandIcon` 属性与 `#expandIcon` 插槽的入参类型，为 [SubMenuType](#submenutype-type) 与以下字段的交叉类型：

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
isOpen | 所在子菜单当前是否展开 | boolean | undefined

### MenuInfo Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
key | 触发项的 `key` | [MenuKey](#menukey-type) | —
keyPath | 由根到触发项的 `key` 路径 | [MenuKey](#menukey-type)[] | —
item | 触发项的原始配置 | [SubMenuType](#submenutype-type) &#124; [MenuItemType](#menuitemtype-type) | —
domEvent | 触发的原生事件 | MouseEvent &#124; KeyboardEvent | —

### SelectInfo Type

为 [MenuInfo](#menuinfo-type) 与以下字段的交叉类型：

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
selectedKeys | 变化后的选中项 `key` 数组 | [MenuKey](#menukey-type)[] | —

### MenuTitleInfo Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
key | 子菜单的 `key` | [MenuKey](#menukey-type) | —
domEvent | 触发的原生事件 | MouseEvent &#124; KeyboardEvent | —

## Slots

### Menu Slots

名称 | 说明 | 类型
:-- | :-- | :--
expandIcon | 自定义子菜单的展开收起图标，存在时优先于 `expandIcon` 属性 | v-slot:expandIcon="{ isOpen, ...item }"

## Events

名称 | 说明 | 类型
:-- | :-- | :--
click | 点击菜单项时调用 | (info: [MenuInfo](#menuinfo-type)) => void
select | 被选中时调用 | (info: [SelectInfo](#selectinfo-type)) => void
deselect | 取消选中时调用，仅在 `multiple` 生效 | (info: [SelectInfo](#selectinfo-type)) => void
openChange | 子菜单展开 / 收起时调用 | (openKeys: [MenuKey](#menukey-type)[]) => void

<style lang="less" scoped>
.demo-divider {
  margin: 0 1em;
}
</style>

