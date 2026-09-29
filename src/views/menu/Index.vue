<script setup lang="ts">
import { computed, h, ref } from 'vue'
import {
  AppstoreOutlined,
  CalendarOutlined,
  DesktopOutlined,
  InboxOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusOutlined,
  PieChartOutlined,
  PlusOutlined,
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
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
    children: [
      { key: '9', label: 'Option 9', title: 'Option 9' },
      { key: '10', label: 'Option 10', title: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          { key: '11', label: 'Option 11', title: 'Option 11' },
          { key: '12', label: 'Option 12', title: 'Option 12' }
        ]
      }
    ]
  }
]

// 收起态长标题提示：标题长到换行 ⇒ 提示面板比菜单项更高
const longTitleSelected = ref<MenuKey[]>(['1'])
const longTitleItems: ItemType[] = [
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: '很长的标题 One：这段文案刻意写长，用于让收起态的悬浮提示折成多行，展示提示内容超出菜单项时的换行效果',
    title: '很长的标题 One：这段文案刻意写长，用于让收起态的悬浮提示折成多行，展示提示内容超出菜单项时的换行效果'
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: '较长的标题 Two：这段文案也写得较长，悬浮提示会折成多行，展示提示折成两行时的形态',
    title: '较长的标题 Two：这段文案也写得较长，悬浮提示会折成多行，展示提示折成两行时的形态'
  },
  {
    key: '3',
    icon: () => h(InboxOutlined),
    label: '很长的标题 Three：这段文案刻意写长，用于让收起态的悬浮提示折成多行，展示提示内容超出菜单项时的换行效果',
    title: '很长的标题 Three：这段文案刻意写长，用于让收起态的悬浮提示折成多行，展示提示内容超出菜单项时的换行效果'
  },
  {
    key: '4',
    icon: () => h(MailOutlined),
    label: '较长的标题 Four：这段文案也写得较长，悬浮提示会折成多行，展示提示折成两行时的形态',
    title: '较长的标题 Four：这段文案也写得较长，悬浮提示会折成多行，展示提示折成两行时的形态'
  },
  {
    key: '5',
    icon: () => h(AppstoreOutlined),
    label: '很长的标题 Five：这段文案刻意写长，用于让收起态的悬浮提示折成多行，展示提示内容超出菜单项时的换行效果',
    title: '很长的标题 Five：这段文案刻意写长，用于让收起态的悬浮提示折成多行，展示提示内容超出菜单项时的换行效果'
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

// 组件式用法：以子组件描述菜单结构
const componentSelected = ref<MenuKey[]>(['1'])
const componentOpenKeys = ref<MenuKey[]>(['sub2'])

// 组件式自定义展开图标：子菜单级 expandIcon 优先，未提供的子菜单回落 Menu 级
const componentExpandIconSelected = ref<MenuKey[]>(['1'])
const componentExpandIconOpenKeys = ref<MenuKey[]>(['sub1'])
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
    <!-- 宽度交给外层容器：内嵌菜单收起后自身宽度收到 80px，若把宽度写在菜单上会把它钉死在展开宽度 -->
    <Space vertical style="width: 256px">
      <Button type="primary" @click="collapsed = !collapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </Button>
      <Menu
        v-model:openKeys="collapsedOpenKeys"
        v-model:selectedKeys="collapsedSelected"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        :items="collapsedItems"
      />
    </Space>
    <h2 class="mt30 mb10">收起态长标题提示</h2>
    <p class="mb10"
      >提示取
      <code>title</code
      >，长标题会让提示折成多行（面板高于菜单项）；把某项滚动到窗口上/下缘附近再悬浮，提示面板会贴边完整显示，箭头依然对准该项</p
    >
    <div style="width: 256px">
      <Menu
        v-model:selectedKeys="longTitleSelected"
        mode="inline"
        theme="dark"
        :inline-collapsed="true"
        :items="longTitleItems"
      />
    </div>
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
        <RightOutlined class="demo-expand-icon" :class="{ 'demo-expand-icon-open': isOpen }" />
      </template>
    </Menu>

    <h2 class="mt30 mb10">组件式用法</h2>
    <p class="mb10">
      以 <code>MenuItem</code> / <code>MenuSubMenu</code> / <code>MenuItemGroup</code> /
      <code>MenuDivider</code> 子组件描述菜单结构，与 <code>items</code> 配置等价；两者同时提供时以子组件为准
    </p>
    <Menu
      v-model:openKeys="componentOpenKeys"
      v-model:selectedKeys="componentSelected"
      style="width: 256px"
      mode="inline"
    >
      <MenuItem key="1">
        <template #icon><MailOutlined /></template>
        Option 1
      </MenuItem>
      <MenuSubMenu key="sub2">
        <template #icon><AppstoreOutlined /></template>
        <template #title>Navigation Two</template>
        <MenuItem key="2">Option 2</MenuItem>
        <MenuItem key="3">Option 3</MenuItem>
        <MenuSubMenu key="sub2-1" title="Submenu">
          <MenuItem key="4">Option 4</MenuItem>
          <MenuItem key="5">Option 5</MenuItem>
        </MenuSubMenu>
      </MenuSubMenu>
      <MenuDivider />
      <MenuItemGroup title="Group">
        <MenuItem key="6">Option 6</MenuItem>
        <MenuItem key="7">Option 7</MenuItem>
      </MenuItemGroup>
      <MenuItem key="8" disabled>Option 8</MenuItem>
    </Menu>

    <h2 class="mt30 mb10">组件式自定义展开图标</h2>
    <p class="mb10">
      子菜单的 <code>expandIcon</code> 插槽优先于 <code>Menu</code> 的同名插槽，未提供时回落到 <code>Menu</code> 级图标
    </p>
    <Menu
      v-model:openKeys="componentExpandIconOpenKeys"
      v-model:selectedKeys="componentExpandIconSelected"
      style="width: 256px"
      mode="inline"
    >
      <template #expandIcon="{ isOpen }">
        <RightOutlined class="demo-expand-icon" :class="{ 'demo-expand-icon-open': isOpen }" />
      </template>
      <MenuSubMenu key="sub1" title="Navigation One">
        <template #icon><MailOutlined /></template>
        <template #expandIcon="{ isOpen }">
          <span class="demo-expand-switch">
            <PlusOutlined :class="{ 'demo-expand-switch-hidden': isOpen }" />
            <MinusOutlined :class="{ 'demo-expand-switch-hidden': !isOpen }" />
          </span>
        </template>
        <MenuItem key="1">Option 1</MenuItem>
        <MenuItem key="2">Option 2</MenuItem>
      </MenuSubMenu>
      <MenuSubMenu key="sub3" title="Navigation Three">
        <template #icon><SettingOutlined /></template>
        <MenuItem key="3">Option 3</MenuItem>
        <MenuItem key="4">Option 4</MenuItem>
      </MenuSubMenu>
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
/* 展开图标用「单个箭头旋转 90°」表达展开态：直接切换图标会有一次瞬跳，旋转则连续过渡 */
.demo-expand-icon {
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &.demo-expand-icon-open {
    transform: rotate(90deg);
  }
}
/* 加号 / 减号叠放在同一位置，靠「旋转 + 淡出」互换：若并列放置，过渡期间会同时出现两个图标并把标题挤动 */
.demo-expand-switch {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  > * {
    position: absolute;
    top: 0;
    left: 0;
    transition:
      opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.demo-expand-switch-hidden {
      opacity: 0;
      transform: rotate(-90deg);
    }
  }
}
</style>
