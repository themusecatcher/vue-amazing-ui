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
  getItem('Navigation Two', 'sub3', () => h(AppstoreOutlined), [getItem('Option 5', '5'), getItem('Option 6', '6')])
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>

    <h2 class="mt30 mb10">顶部导航</h2>
    <p class="mb10">水平的顶部导航菜单</p>
    <Menu v-model:selectedKeys="horizontalSelected" mode="horizontal" :items="horizontalItems" />

    <h2 class="mt30 mb10">内嵌菜单</h2>
    <p class="mb10">子菜单内嵌在菜单区域内，可逐级展开</p>
    <Menu
      v-model:openKeys="inlineOpenKeys"
      v-model:selectedKeys="inlineSelected"
      style="width: 256px"
      mode="inline"
      :items="inlineItems"
    />

    <h2 class="mt30 mb10">垂直菜单</h2>
    <p class="mb10">子菜单以弹出形式展示，支持多级嵌套</p>
    <Menu
      v-model:openKeys="verticalOpenKeys"
      v-model:selectedKeys="verticalSelected"
      style="width: 256px"
      mode="vertical"
      :items="verticalItems"
    />

    <h2 class="mt30 mb10">切换菜单类型</h2>
    <p class="mb10">动态切换菜单模式与主题</p>
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

    <h2 class="mt30 mb10">缩起内嵌菜单</h2>
    <p class="mb10">收起时只显示图标，子菜单以浮层展示，悬浮菜单项可查看完整标题</p>
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

    <h2 class="mt30 mb10">只展开当前父级菜单</h2>
    <p class="mb10">点击菜单时收起其他已展开的菜单，保持菜单聚焦简洁</p>
    <Menu
      style="width: 256px"
      mode="inline"
      :items="parentItems"
      :open-keys="parentOpenKeys"
      v-model:selectedKeys="parentSelected"
      @open-change="onParentOpenChange"
    />

    <h2 class="mt30 mb10">多选</h2>
    <p class="mb10">通过 <code>multiple</code> 允许多选，再次点击已选中项会触发取消选中</p>
    <Menu v-model:selectedKeys="multipleSelected" style="width: 256px" mode="inline" multiple :items="multipleItems" />

    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">
      通过 <code>disabled</code> 禁用整个菜单；菜单项自身的 <code>disabled</code> 只禁用该项，<code>danger</code>
      用于呈现错误状态样式
    </p>
    <Switch v-model:value="wholeDisabled" checked="禁用" unchecked="可用" />
    <Menu
      v-model:selectedKeys="disabledSelected"
      style="width: 256px; margin-top: 16px"
      mode="inline"
      :disabled="wholeDisabled"
      :items="disabledItems"
    />

    <h2 class="mt30 mb10">空数据</h2>
    <p class="mb10">菜单内容为空时渲染空列表，不报错也不残留占位</p>
    <Menu style="width: 256px" mode="inline" :items="emptyItems" />

    <h2 class="mt30 mb10">自定义展开图标</h2>
    <p class="mb10">通过 <code>expandIcon</code> 属性或同名插槽自定义子菜单的展开收起图标</p>
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

    <h2 class="mt30 mb10">主题</h2>
    <p class="mb10">内建 <code>light</code> 与 <code>dark</code> 两套主题，默认为 <code>light</code></p>
    <Switch v-model:value="themeDark" checked="Dark" unchecked="Light" />
    <Menu
      v-model:openKeys="themeOpenKeys"
      v-model:selectedKeys="themeSelected"
      style="width: 256px; margin-top: 16px"
      mode="inline"
      :theme="themeDark ? 'dark' : 'light'"
      :items="themeItems"
    />

    <h2 class="mt30 mb10">子菜单主题</h2>
    <p class="mb10">通过子菜单的 <code>theme</code> 属性设置其主题，可实现根目录深色、子目录浅色的效果</p>
    <Switch v-model:value="submenuDark" checked="Dark" unchecked="Light" />
    <Menu
      style="width: 256px; margin-top: 16px"
      mode="vertical"
      theme="dark"
      :open-keys="submenuOpenKeys"
      v-model:selectedKeys="submenuSelected"
      :items="submenuItems"
    />
  </div>
</template>
<style lang="less" scoped>
.demo-divider {
  margin: 0 1em;
}
</style>
