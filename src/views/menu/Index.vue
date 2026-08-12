<script setup lang="ts">
import { ref, h, computed } from 'vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import type { MenuProps, ItemType } from 'components/index'

// 基础多级菜单数据（内嵌菜单/缩起内嵌菜单/只展开当前父级菜单/主题/切换菜单类型等用例共用结构）
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
          // per-item onClick：先于 Menu 级 click 触发
          { key: '1', label: 'Option 1', onClick: (info) => console.log('per-item onClick', info) },
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
// 顶部导航数据（含 h('a', ...) 渲染的 link item，对齐 antdv horizontal demo）
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
// 垂直菜单数据（含三级嵌套子菜单 sub1 > sub1-2，对齐 antdv vertical demo）
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
// 禁用用例数据
const disabledItems: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: '2', icon: () => h(AppstoreOutlined), label: 'Navigation Two', disabled: true },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three',
    disabled: true,
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' }
    ]
  },
  { key: '5', label: 'Navigation Four' }
]
// 危险菜单项用例数据
const dangerItems: ItemType[] = [
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: '2', icon: () => h(AppstoreOutlined), label: 'Navigation Two' },
  { type: 'divider' },
  { key: '3', icon: () => h(SettingOutlined), label: 'Navigation Three', danger: true },
  {
    key: 'sub1',
    icon: () => h(DeleteOutlined),
    label: 'Danger Submenu',
    children: [
      { key: '4', label: 'Option 4', danger: true },
      { key: '5', label: 'Option 5' }
    ]
  }
]

// 1. 顶部导航
const horizontalOpenKeys = ref<MenuProps['openKeys']>([])
const horizontalSelectedKeys = ref<MenuProps['selectedKeys']>(['mail'])
// 2. 内嵌菜单
const inlineOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const inlineSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
// 3. 缩起内嵌菜单
const collapsed = ref(true)
const collapsedOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const collapsedSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
// 4. 只展开当前父级菜单
const rootSubmenuKeys: (string | number)[] = ['sub1', 'sub2', 'sub4'] // 顶层 SubMenu 的 key
const parentOpenKeys = ref<(string | number)[]>(['sub1'])
const parentSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
function onParentOpenChange(openKeys: (string | number)[]) {
  // 找到本次新展开的 key
  const latestOpenKey = openKeys.find((key) => !parentOpenKeys.value?.includes(key))
  if (latestOpenKey === undefined || !rootSubmenuKeys.includes(latestOpenKey)) {
    // 展开的是子级 SubMenu 或收起操作，直接同步
    parentOpenKeys.value = openKeys
  } else {
    // 展开的是顶层 SubMenu，只保留当前这一个
    parentOpenKeys.value = [latestOpenKey]
  }
}
// 5. 垂直菜单
const verticalOpenKeys = ref<MenuProps['openKeys']>([])
const verticalSelectedKeys = ref<MenuProps['selectedKeys']>([])
// 6. 主题（Switch 动态切换 light/dark）
const themeMode = ref<MenuProps['theme']>('dark')
const themeModeOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const themeModeSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
// 7. 子菜单主题（根 dark + 单个 SubMenu 通过 theme 独立设置）
const subTheme = ref<'light' | 'dark'>('light')
const subThemeOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const subThemeSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
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
// 8. 切换菜单类型（inline ↔ vertical）+ 主题
const switchMode = ref<MenuProps['mode']>('inline')
const switchTheme = ref<MenuProps['theme']>('light')
const switchModeOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const switchModeSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])

// ---- 以下为扩展用例 ----
// hover 触发子菜单
const hoverOpenKeys = ref<MenuProps['openKeys']>([])
const hoverSelectedKeys = ref<MenuProps['selectedKeys']>([])
// 自定义缩进
const indentOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const indentSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
// 禁用
const disabledOpenKeys = ref<MenuProps['openKeys']>([])
const disabledSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
// 危险菜单项
const dangerOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const dangerSelectedKeys = ref<MenuProps['selectedKeys']>(['3'])
// 不可选中
const unselectableOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
// 监听事件
const eventOpenKeys = ref<MenuProps['openKeys']>(['sub1'])
const eventSelectedKeys = ref<MenuProps['selectedKeys']>(['1'])
function onClick(info: { item: ItemType | null; key: string | number; keyPath: (string | number)[] }) {
  console.log('click', info)
}
function onSelect(info: {
  item: ItemType | null
  key: string | number
  keyPath: (string | number)[]
  selectedKeys: (string | number)[]
}) {
  console.log('select', info)
}
function onOpenChange(openKeys: (string | number)[]) {
  console.log('openChange', openKeys)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">顶部导航</h2>
    <h3 class="mb10">水平的顶部导航菜单。</h3>
    <Menu
      mode="horizontal"
      :items="horizontalItems"
      v-model:open-keys="horizontalOpenKeys"
      v-model:selected-keys="horizontalSelectedKeys"
    />
    <h2 class="mt30 mb10">内嵌菜单</h2>
    <h3 class="mb10">垂直菜单，子菜单内嵌在菜单区域。</h3>
    <Menu
      style="width: 256px"
      mode="inline"
      :items="baseItems"
      v-model:open-keys="inlineOpenKeys"
      v-model:selected-keys="inlineSelectedKeys"
    />
    <h2 class="mt30 mb10">缩起内嵌菜单</h2>
    <h3 class="mb10">
      内嵌菜单可以被缩起/展开。
      <button @click="toggleCollapsed" style="margin-left: 8px; cursor: pointer">
        {{ collapsed ? '展开' : '收起' }}
      </button>
    </h3>
    <div style="width: 256px">
      <Menu
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        :items="baseItems"
        v-model:open-keys="collapsedOpenKeys"
        v-model:selected-keys="collapsedSelectedKeys"
      />
    </div>
    <h2 class="mt30 mb10">只展开当前父级菜单</h2>
    <h3 class="mb10">点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。</h3>
    <Menu
      style="width: 256px"
      mode="inline"
      :items="baseItems"
      :open-keys="parentOpenKeys"
      v-model:selected-keys="parentSelectedKeys"
      @open-change="onParentOpenChange"
    />
    <h2 class="mt30 mb10">垂直菜单</h2>
    <h3 class="mb10">子菜单是弹出的形式。</h3>
    <Menu
      style="width: 256px"
      mode="vertical"
      :items="verticalItems"
      v-model:open-keys="verticalOpenKeys"
      v-model:selected-keys="verticalSelectedKeys"
    />
    <h2 class="mt30 mb10">主题</h2>
    <h3 class="mb10">内建了两套主题 <code>light</code> 和 <code>dark</code>，默认 <code>light</code>。</h3>
    <Switch v-model="themeMode" checked-value="dark" unchecked-value="light" checked="Dark" unchecked="Light" />
    <Menu
      style="width: 256px; margin-top: 12px"
      mode="inline"
      :theme="themeMode"
      :items="baseItems"
      v-model:open-keys="themeModeOpenKeys"
      v-model:selected-keys="themeModeSelectedKeys"
    />
    <h2 class="mt30 mb10">子菜单主题</h2>
    <h3 class="mb10">
      你可以通过 <code>theme</code> 属性来设置 SubMenu
      的主题从而达到不同目录树下不同主题色的效果。该例子默认为根目录深色，子目录浅色效果。
    </h3>
    <Switch v-model="subTheme" checked-value="dark" unchecked-value="light" checked="dark" unchecked="light" />
    <Menu
      style="width: 256px; margin-top: 12px"
      mode="vertical"
      theme="dark"
      :items="subThemeItems"
      v-model:open-keys="subThemeOpenKeys"
      v-model:selected-keys="subThemeSelectedKeys"
    />
    <h2 class="mt30 mb10">切换菜单类型</h2>
    <h3 class="mb10">展示动态切换模式。</h3>
    <Flex :gap="16">
      <Switch
        v-model="switchMode"
        checked-value="vertical"
        unchecked-value="inline"
        checked="vertical"
        unchecked="inline"
      />
      <Switch v-model="switchTheme" checked-value="dark" unchecked-value="light" checked="Dark" unchecked="Light" />
    </Flex>
    <Menu
      style="width: 256px; margin-top: 12px"
      :mode="switchMode"
      :theme="switchTheme"
      :items="baseItems"
      v-model:open-keys="switchModeOpenKeys"
      v-model:selected-keys="switchModeSelectedKeys"
    />

    <h2 class="mt30 mb10">hover 触发子菜单</h2>
    <h3 class="mb10"
      >通过 triggerSubMenuAction="hover" 设置子菜单悬停触发展开（非 inline 模式，默认 hover；inline 模式恒为点击）</h3
    >
    <Menu
      style="width: 256px"
      mode="vertical"
      trigger-sub-menu-action="hover"
      :items="verticalItems"
      v-model:open-keys="hoverOpenKeys"
      v-model:selected-keys="hoverSelectedKeys"
    />
    <h2 class="mt30 mb10">自定义缩进</h2>
    <h3 class="mb10">通过 inlineIndent 自定义每一级菜单的缩进宽度，单位 px（默认 24）</h3>
    <Menu
      style="width: 256px"
      mode="inline"
      :inline-indent="40"
      :items="baseItems"
      v-model:open-keys="indentOpenKeys"
      v-model:selected-keys="indentSelectedKeys"
    />
    <h2 class="mt30 mb10">禁用</h2>
    <h3 class="mb10">通过 disabled 禁用菜单项或子菜单，禁用后不可点击、展开与选中</h3>
    <Menu
      style="width: 256px"
      mode="inline"
      :items="disabledItems"
      v-model:open-keys="disabledOpenKeys"
      v-model:selected-keys="disabledSelectedKeys"
    />
    <h2 class="mt30 mb10">危险菜单项</h2>
    <h3 class="mb10">通过 danger 将菜单项标记为危险状态，常用于删除等操作</h3>
    <Menu
      style="width: 256px"
      mode="inline"
      :items="dangerItems"
      v-model:open-keys="dangerOpenKeys"
      v-model:selected-keys="dangerSelectedKeys"
    />
    <h2 class="mt30 mb10">不可选中</h2>
    <h3 class="mb10">设置 selectable 为 false 使菜单项点击后不展示选中态</h3>
    <Menu
      style="width: 256px"
      mode="inline"
      :selectable="false"
      :items="baseItems"
      v-model:open-keys="unselectableOpenKeys"
    />
    <h2 class="mt30 mb10">监听事件</h2>
    <h3 class="mb10"
      >监听 click（点击菜单项）、select（选中菜单项）、openChange（展开/收起子菜单）事件，Option 1 另含 per-item
      onClick</h3
    >
    <Menu
      style="width: 256px"
      mode="inline"
      :items="baseItems"
      v-model:open-keys="eventOpenKeys"
      v-model:selected-keys="eventSelectedKeys"
      @click="onClick"
      @select="onSelect"
      @open-change="onOpenChange"
    />
  </div>
</template>
