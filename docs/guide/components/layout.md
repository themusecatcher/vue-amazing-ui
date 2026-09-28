# 布局 Layout

<GlobalElement />

*协助进行页面级整体布局*

## 何时使用

- 需要为页面提供顶部导航、侧边栏、内容区、页脚的整体框架时
- 需要在页面横向空间有限时提供可收起的侧边导航时

<script setup lang="ts">
import { h, ref } from 'vue'
import type { CSSProperties } from 'vue'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  DesktopOutlined,
  FileOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  PieChartOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons-vue'
import type { BreadcrumbRoute, ItemType, MenuKey } from 'vue-amazing-ui'

// 共用数据：示例内联样式与面包屑数据
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea'
}
const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9'
}
const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9'
}
const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea'
}
const routes = ref<BreadcrumbRoute[]>([{ name: 'Home' }, { name: 'List' }, { name: 'App' }])

// 菜单配置：顶部导航（上中下布局 / 顶部-侧边布局-通栏 / 顶部-侧边布局 / 固定头部 共用）
const headerItems: ItemType[] = [
  { key: '1', label: 'nav 1' },
  { key: '2', label: 'nav 2' },
  { key: '3', label: 'nav 3' }
]
// 菜单配置：侧边子菜单（顶部-侧边布局-通栏 / 顶部-侧边布局 共用）
const subnavItems: ItemType[] = [
  {
    key: 'sub1',
    icon: () => h(UserOutlined),
    label: 'subnav 1',
    children: [
      { key: '1', label: 'option1' },
      { key: '2', label: 'option2' },
      { key: '3', label: 'option3' },
      { key: '4', label: 'option4' }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(LaptopOutlined),
    label: 'subnav 2',
    children: [
      { key: '5', label: 'option5' },
      { key: '6', label: 'option6' },
      { key: '7', label: 'option7' },
      { key: '8', label: 'option8' }
    ]
  },
  {
    key: 'sub3',
    icon: () => h(NotificationOutlined),
    label: 'subnav 3',
    children: [
      { key: '9', label: 'option9' },
      { key: '10', label: 'option10' },
      { key: '11', label: 'option11' },
      { key: '12', label: 'option12' }
    ]
  }
]
// 菜单配置：侧边菜单（响应式布局 / 响应式收起宽度 共用）
const responsiveItems: ItemType[] = [
  { key: '1', icon: () => h(UserOutlined), label: 'nav 1' },
  { key: '2', icon: () => h(VideoCameraOutlined), label: 'nav 2' },
  { key: '3', icon: () => h(UploadOutlined), label: 'nav 3' },
  { key: '4', icon: () => h(UserOutlined), label: 'nav 4' }
]

// 各用例的状态独立持有：同页多个用例共用会互相串联
// 上中下布局
const topNavKeys = ref<MenuKey[]>(['2'])

// 顶部-侧边布局-通栏
const topSide2NavKeys = ref<MenuKey[]>(['2'])
const topSide2SiderKeys = ref<MenuKey[]>(['1'])
const topSide2OpenKeys = ref<MenuKey[]>(['sub1'])

// 顶部-侧边布局
const topSideNavKeys = ref<MenuKey[]>(['2'])
const topSideSiderKeys = ref<MenuKey[]>(['1'])
const topSideOpenKeys = ref<MenuKey[]>(['sub1'])

// 侧边布局
const collapsedSide = ref(false)
const sideSelectedKeys = ref<MenuKey[]>(['1'])
const sideItems: ItemType[] = [
  { key: '1', icon: () => h(PieChartOutlined), label: 'Option 1' },
  { key: '2', icon: () => h(DesktopOutlined), label: 'Option 2' },
  {
    key: 'sub1',
    icon: () => h(UserOutlined),
    label: 'User',
    children: [
      { key: '3', label: 'Tom' },
      { key: '4', label: 'Bill' },
      { key: '5', label: 'Alex' }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(TeamOutlined),
    label: 'Team',
    children: [
      { key: '6', label: 'Team 1' },
      { key: '8', label: 'Team 2' }
    ]
  },
  { key: '9', icon: () => h(FileOutlined), label: 'File' }
]
const onCollapse = (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {
  console.log('collapse', collapsed, type)
}

// 自定义触发器
const collapsedCustom = ref(false)
const customTriggerSelectedKeys = ref<MenuKey[]>(['1'])
const customTriggerItems: ItemType[] = [
  { key: '1', icon: () => h(UserOutlined), label: 'nav 1' },
  { key: '2', icon: () => h(VideoCameraOutlined), label: 'nav 2' },
  { key: '3', icon: () => h(UploadOutlined), label: 'nav 3' }
]

// 响应式布局
const responsiveSelectedKeys = ref<MenuKey[]>(['4'])
const onBreakpoint = (broken: boolean) => {
  console.log('breakpoint', broken)
}

// 固定侧边栏
const fixedSiderSelectedKeys = ref<MenuKey[]>(['4'])
const fixedSiderItems: ItemType[] = [
  { key: '1', icon: () => h(UserOutlined), label: 'nav 1' },
  { key: '2', icon: () => h(VideoCameraOutlined), label: 'nav 2' },
  { key: '3', icon: () => h(UploadOutlined), label: 'nav 3' },
  { key: '4', icon: () => h(BarChartOutlined), label: 'nav 4' },
  { key: '5', icon: () => h(CloudOutlined), label: 'nav 5' },
  { key: '6', icon: () => h(AppstoreOutlined), label: 'nav 6' },
  { key: '7', icon: () => h(TeamOutlined), label: 'nav 7' },
  { key: '8', icon: () => h(ShopOutlined), label: 'nav 8' }
]

// 固定头部
const fixedNavKeys = ref<MenuKey[]>(['2'])

// 响应式收起宽度
const collapsedResponsiveWidth = ref(true)
const responsiveWidthSelectedKeys = ref<MenuKey[]>(['4'])
</script>

## 基本结构

<Flex vertical :gap="48">
  <Layout>
    <LayoutHeader :style="headerStyle">Header</LayoutHeader>
    <LayoutContent :style="contentStyle">Content</LayoutContent>
    <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
  </Layout>
  <Layout>
    <LayoutHeader :style="headerStyle">Header</LayoutHeader>
    <Layout>
      <LayoutSider :style="siderStyle">Sider</LayoutSider>
      <LayoutContent :style="contentStyle">Content</LayoutContent>
    </Layout>
    <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
  </Layout>
  <Layout>
    <LayoutHeader :style="headerStyle">Header</LayoutHeader>
    <Layout>
      <LayoutContent :style="contentStyle">Content</LayoutContent>
      <LayoutSider :style="siderStyle">Sider</LayoutSider>
    </Layout>
    <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
  </Layout>
  <Layout>
    <LayoutSider :style="siderStyle">Sider</LayoutSider>
    <Layout>
      <LayoutHeader :style="headerStyle">Header</LayoutHeader>
      <LayoutContent :style="contentStyle">Content</LayoutContent>
      <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
    </Layout>
  </Layout>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import type { CSSProperties } from 'vue'
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea'
}
const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9'
}
const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9'
}
const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea'
}
</script>
<template>
  <Flex vertical :gap="48">
    <Layout>
      <LayoutHeader :style="headerStyle">Header</LayoutHeader>
      <LayoutContent :style="contentStyle">Content</LayoutContent>
      <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
    </Layout>
    <Layout>
      <LayoutHeader :style="headerStyle">Header</LayoutHeader>
      <Layout>
        <LayoutSider :style="siderStyle">Sider</LayoutSider>
        <LayoutContent :style="contentStyle">Content</LayoutContent>
      </Layout>
      <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
    </Layout>
    <Layout>
      <LayoutHeader :style="headerStyle">Header</LayoutHeader>
      <Layout>
        <LayoutContent :style="contentStyle">Content</LayoutContent>
        <LayoutSider :style="siderStyle">Sider</LayoutSider>
      </Layout>
      <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
    </Layout>
    <Layout>
      <LayoutSider :style="siderStyle">Sider</LayoutSider>
      <Layout>
        <LayoutHeader :style="headerStyle">Header</LayoutHeader>
        <LayoutContent :style="contentStyle">Content</LayoutContent>
        <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
      </Layout>
    </Layout>
  </Flex>
</template>
```

::::

## 上中下布局

<Layout>
  <LayoutHeader>
    <div class="logo" />
    <Menu
      v-model:selectedKeys="topNavKeys"
      style="line-height: 64px"
      mode="horizontal"
      theme="dark"
      :items="headerItems"
    />
  </LayoutHeader>
  <LayoutContent style="padding: 0 50px">
    <Breadcrumb :routes="routes" style="margin: 16px 0" />
    <div class="demo-content">Content</div>
  </LayoutContent>
  <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
</Layout>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { BreadcrumbRoute, ItemType, MenuKey } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([{ name: 'Home' }, { name: 'List' }, { name: 'App' }])
const headerItems: ItemType[] = [
  { key: '1', label: 'nav 1' },
  { key: '2', label: 'nav 2' },
  { key: '3', label: 'nav 3' }
]
const topNavKeys = ref<MenuKey[]>(['2'])
</script>
<template>
  <Layout>
    <LayoutHeader>
      <div class="logo" />
      <Menu
        v-model:selectedKeys="topNavKeys"
        style="line-height: 64px"
        mode="horizontal"
        theme="dark"
        :items="headerItems"
      />
    </LayoutHeader>
    <LayoutContent style="padding: 0 50px">
      <Breadcrumb :routes="routes" style="margin: 16px 0" />
      <div class="demo-content">Content</div>
    </LayoutContent>
    <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
  </Layout>
</template>
```

::::

## 顶部-侧边布局-通栏

*同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站*

<br/>

<Layout>
  <LayoutHeader>
    <div class="logo" />
    <Menu
      v-model:selectedKeys="topSide2NavKeys"
      style="line-height: 64px"
      mode="horizontal"
      theme="dark"
      :items="headerItems"
    />
  </LayoutHeader>
  <Layout>
    <LayoutSider width="200" style="background: #fff">
      <Menu
        v-model:selectedKeys="topSide2SiderKeys"
        v-model:openKeys="topSide2OpenKeys"
        style="height: 100%; border-right: 0"
        mode="inline"
        :items="subnavItems"
      />
    </LayoutSider>
    <Layout style="padding: 0 24px 24px">
      <Breadcrumb :routes="routes" style="margin: 16px 0" />
      <LayoutContent style="background: #fff; padding: 24px; min-height: 280px">Content</LayoutContent>
    </Layout>
  </Layout>
</Layout>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { BreadcrumbRoute, ItemType, MenuKey } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([{ name: 'Home' }, { name: 'List' }, { name: 'App' }])
const headerItems: ItemType[] = [
  { key: '1', label: 'nav 1' },
  { key: '2', label: 'nav 2' },
  { key: '3', label: 'nav 3' }
]
const subnavItems: ItemType[] = [
  {
    key: 'sub1',
    icon: () => h(UserOutlined),
    label: 'subnav 1',
    children: [
      { key: '1', label: 'option1' },
      { key: '2', label: 'option2' },
      { key: '3', label: 'option3' },
      { key: '4', label: 'option4' }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(LaptopOutlined),
    label: 'subnav 2',
    children: [
      { key: '5', label: 'option5' },
      { key: '6', label: 'option6' },
      { key: '7', label: 'option7' },
      { key: '8', label: 'option8' }
    ]
  },
  {
    key: 'sub3',
    icon: () => h(NotificationOutlined),
    label: 'subnav 3',
    children: [
      { key: '9', label: 'option9' },
      { key: '10', label: 'option10' },
      { key: '11', label: 'option11' },
      { key: '12', label: 'option12' }
    ]
  }
]
const topSide2NavKeys = ref<MenuKey[]>(['2'])
const topSide2SiderKeys = ref<MenuKey[]>(['1'])
const topSide2OpenKeys = ref<MenuKey[]>(['sub1'])
</script>
<template>
  <Layout>
    <LayoutHeader>
      <div class="logo" />
      <Menu
        v-model:selectedKeys="topSide2NavKeys"
        style="line-height: 64px"
        mode="horizontal"
        theme="dark"
        :items="headerItems"
      />
    </LayoutHeader>
    <Layout>
      <LayoutSider width="200" style="background: #fff">
        <Menu
          v-model:selectedKeys="topSide2SiderKeys"
          v-model:openKeys="topSide2OpenKeys"
          style="height: 100%; border-right: 0"
          mode="inline"
          :items="subnavItems"
        />
      </LayoutSider>
      <Layout style="padding: 0 24px 24px">
        <Breadcrumb :routes="routes" style="margin: 16px 0" />
        <LayoutContent style="background: #fff; padding: 24px; min-height: 280px">Content</LayoutContent>
      </Layout>
    </Layout>
  </Layout>
</template>
```

::::

## 顶部-侧边布局

*拥有顶部导航及侧边栏的页面，多用于展示类网站*

<br/>

<Layout>
  <LayoutHeader>
    <div class="logo" />
    <Menu
      v-model:selectedKeys="topSideNavKeys"
      style="line-height: 64px"
      mode="horizontal"
      theme="dark"
      :items="headerItems"
    />
  </LayoutHeader>
  <LayoutContent style="padding: 0 50px">
    <Breadcrumb :routes="routes" style="margin: 16px 0" />
    <Layout style="padding: 24px 0; background: #fff">
      <LayoutSider width="200" style="background: #fff">
        <Menu
          v-model:selectedKeys="topSideSiderKeys"
          v-model:openKeys="topSideOpenKeys"
          style="height: 100%"
          mode="inline"
          :items="subnavItems"
        />
      </LayoutSider>
      <LayoutContent style="padding: 0 24px; min-height: 280px">Content</LayoutContent>
    </Layout>
  </LayoutContent>
  <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
</Layout>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { BreadcrumbRoute, ItemType, MenuKey } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([{ name: 'Home' }, { name: 'List' }, { name: 'App' }])
const headerItems: ItemType[] = [
  { key: '1', label: 'nav 1' },
  { key: '2', label: 'nav 2' },
  { key: '3', label: 'nav 3' }
]
const subnavItems: ItemType[] = [
  {
    key: 'sub1',
    icon: () => h(UserOutlined),
    label: 'subnav 1',
    children: [
      { key: '1', label: 'option1' },
      { key: '2', label: 'option2' },
      { key: '3', label: 'option3' },
      { key: '4', label: 'option4' }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(LaptopOutlined),
    label: 'subnav 2',
    children: [
      { key: '5', label: 'option5' },
      { key: '6', label: 'option6' },
      { key: '7', label: 'option7' },
      { key: '8', label: 'option8' }
    ]
  },
  {
    key: 'sub3',
    icon: () => h(NotificationOutlined),
    label: 'subnav 3',
    children: [
      { key: '9', label: 'option9' },
      { key: '10', label: 'option10' },
      { key: '11', label: 'option11' },
      { key: '12', label: 'option12' }
    ]
  }
]
const topSideNavKeys = ref<MenuKey[]>(['2'])
const topSideSiderKeys = ref<MenuKey[]>(['1'])
const topSideOpenKeys = ref<MenuKey[]>(['sub1'])
</script>
<template>
  <Layout>
    <LayoutHeader>
      <div class="logo" />
      <Menu
        v-model:selectedKeys="topSideNavKeys"
        style="line-height: 64px"
        mode="horizontal"
        theme="dark"
        :items="headerItems"
      />
    </LayoutHeader>
    <LayoutContent style="padding: 0 50px">
      <Breadcrumb :routes="routes" style="margin: 16px 0" />
      <Layout style="padding: 24px 0; background: #fff">
        <LayoutSider width="200" style="background: #fff">
          <Menu
            v-model:selectedKeys="topSideSiderKeys"
            v-model:openKeys="topSideOpenKeys"
            style="height: 100%"
            mode="inline"
            :items="subnavItems"
          />
        </LayoutSider>
        <LayoutContent style="padding: 0 24px; min-height: 280px">Content</LayoutContent>
      </Layout>
    </LayoutContent>
    <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
  </Layout>
</template>
```

::::

## 侧边布局

*侧边两列式布局。页面横向空间有限时，侧边导航可收起*

<br/>

<div class="demo-container">
  <Layout>
    <LayoutSider
      :style="{ height: '360px', position: 'sticky', left: 0, top: 0, bottom: 0 }"
      v-model:collapsed="collapsedSide"
      collapsible
      @collapse="onCollapse"
    >
      <div class="logo-1" />
      <Menu
        v-model:selectedKeys="sideSelectedKeys"
        theme="dark"
        mode="inline"
        :inline-collapsed="collapsedSide"
        :items="sideItems"
      />
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0" />
      <LayoutContent style="margin: 0 16px">
        <Breadcrumb :routes="routes" style="margin: 16px 0" />
        <div class="demo-content">Curry is a basketball player.</div>
      </LayoutContent>
      <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
    </Layout>
  </Layout>
</div>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { BreadcrumbRoute, ItemType, MenuKey } from 'vue-amazing-ui'
const collapsedSide = ref(false)
const sideSelectedKeys = ref<MenuKey[]>(['1'])
const routes = ref<BreadcrumbRoute[]>([{ name: 'Home' }, { name: 'List' }, { name: 'App' }])
const sideItems: ItemType[] = [
  { key: '1', icon: () => h(PieChartOutlined), label: 'Option 1' },
  { key: '2', icon: () => h(DesktopOutlined), label: 'Option 2' },
  {
    key: 'sub1',
    icon: () => h(UserOutlined),
    label: 'User',
    children: [
      { key: '3', label: 'Tom' },
      { key: '4', label: 'Bill' },
      { key: '5', label: 'Alex' }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(TeamOutlined),
    label: 'Team',
    children: [
      { key: '6', label: 'Team 1' },
      { key: '8', label: 'Team 2' }
    ]
  },
  { key: '9', icon: () => h(FileOutlined), label: 'File' }
]
const onCollapse = (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {
  console.log('collapse', collapsed, type)
}
</script>
<template>
  <div class="demo-container">
    <Layout>
      <LayoutSider
        :style="{ height: '360px', position: 'sticky', left: 0, top: 0, bottom: 0 }"
        v-model:collapsed="collapsedSide"
        collapsible
        @collapse="onCollapse"
      >
        <div class="logo-1" />
        <Menu
          v-model:selectedKeys="sideSelectedKeys"
          theme="dark"
          mode="inline"
          :inline-collapsed="collapsedSide"
          :items="sideItems"
        />
      </LayoutSider>
      <Layout>
        <LayoutHeader style="background: #fff; padding: 0" />
        <LayoutContent style="margin: 0 16px">
          <Breadcrumb :routes="routes" style="margin: 16px 0" />
          <div class="demo-content">Curry is a basketball player.</div>
        </LayoutContent>
        <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
      </Layout>
    </Layout>
  </div>
</template>
```

::::

## 自定义触发器

*要使用自定义触发器，可以设置 `:trigger="null"` 来隐藏默认设定*

<br/>

<Layout class="demo-shadow">
  <LayoutSider v-model:collapsed="collapsedCustom" :trigger="null" collapsible>
    <div class="logo-1" />
    <Menu
      v-model:selectedKeys="customTriggerSelectedKeys"
      theme="dark"
      mode="inline"
      :inline-collapsed="collapsedCustom"
      :items="customTriggerItems"
    />
  </LayoutSider>
  <Layout>
    <LayoutHeader style="background: #fff; padding: 0">
      <MenuUnfoldOutlined v-if="collapsedCustom" class="trigger" @click="collapsedCustom = !collapsedCustom" />
      <MenuFoldOutlined v-else class="trigger" @click="collapsedCustom = !collapsedCustom" />
    </LayoutHeader>
    <LayoutContent style="margin: 24px 16px; padding: 24px; background: #fff; min-height: 280px">
      Content
    </LayoutContent>
  </Layout>
</Layout>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'
const collapsedCustom = ref(false)
const customTriggerSelectedKeys = ref<MenuKey[]>(['1'])
const customTriggerItems: ItemType[] = [
  { key: '1', icon: () => h(UserOutlined), label: 'nav 1' },
  { key: '2', icon: () => h(VideoCameraOutlined), label: 'nav 2' },
  { key: '3', icon: () => h(UploadOutlined), label: 'nav 3' }
]
</script>
<template>
  <Layout class="demo-shadow">
    <LayoutSider v-model:collapsed="collapsedCustom" :trigger="null" collapsible>
      <div class="logo-1" />
      <Menu
        v-model:selectedKeys="customTriggerSelectedKeys"
        theme="dark"
        mode="inline"
        :inline-collapsed="collapsedCustom"
        :items="customTriggerItems"
      />
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0">
        <MenuUnfoldOutlined v-if="collapsedCustom" class="trigger" @click="collapsedCustom = !collapsedCustom" />
        <MenuFoldOutlined v-else class="trigger" @click="collapsedCustom = !collapsedCustom" />
      </LayoutHeader>
      <LayoutContent style="margin: 24px 16px; padding: 24px; background: #fff; min-height: 280px">
        Content
      </LayoutContent>
    </Layout>
  </Layout>
</template>
```

::::

## 响应式布局

*配置 `breakpoint` 属性即生效，视窗宽度小于 `breakpoint` 时 Sider 缩小为 `collapsedWidth` 宽度，若将 `collapsedWidth` 设置为零，会出现特殊 trigger*

<br/>

<Layout class="demo-shadow">
  <LayoutSider collapsible breakpoint="lg" :collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
    <div class="logo-1" />
    <Menu v-model:selectedKeys="responsiveSelectedKeys" theme="dark" mode="inline" :items="responsiveItems" />
  </LayoutSider>
  <Layout>
    <LayoutHeader style="background: #fff; padding: 0" />
    <LayoutContent style="margin: 24px 16px 0">
      <div class="demo-content tall">content</div>
    </LayoutContent>
    <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
  </Layout>
</Layout>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'
const onCollapse = (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {
  console.log('collapse', collapsed, type)
}
const onBreakpoint = (broken: boolean) => {
  console.log('breakpoint', broken)
}
const responsiveSelectedKeys = ref<MenuKey[]>(['4'])
const responsiveItems: ItemType[] = [
  { key: '1', icon: () => h(UserOutlined), label: 'nav 1' },
  { key: '2', icon: () => h(VideoCameraOutlined), label: 'nav 2' },
  { key: '3', icon: () => h(UploadOutlined), label: 'nav 3' },
  { key: '4', icon: () => h(UserOutlined), label: 'nav 4' }
]
</script>
<template>
  <Layout class="demo-shadow">
    <LayoutSider collapsible breakpoint="lg" :collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <div class="logo-1" />
      <Menu v-model:selectedKeys="responsiveSelectedKeys" theme="dark" mode="inline" :items="responsiveItems" />
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0" />
      <LayoutContent style="margin: 24px 16px 0">
        <div class="demo-content tall">content</div>
      </LayoutContent>
      <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
    </Layout>
  </Layout>
</template>
```

::::

## 固定侧边栏

*当内容较长时，使用固定侧边栏可以提供更好的体验*

<br/>

<div class="demo-container">
  <Layout has-sider>
    <LayoutSider :style="{ overflow: 'auto', height: '360px', position: 'sticky', left: 0, top: 0, bottom: 0 }">
      <div class="logo-1" />
      <Menu v-model:selectedKeys="fixedSiderSelectedKeys" theme="dark" mode="inline" :items="fixedSiderItems" />
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0" />
      <LayoutContent style="margin: 24px 16px 0">
        <div class="demo-content long">
          <p v-for="n in 30" :key="n">...</p>
          <p>Really long content</p>
        </div>
      </LayoutContent>
      <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
    </Layout>
  </Layout>
</div>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'
const fixedSiderSelectedKeys = ref<MenuKey[]>(['4'])
const fixedSiderItems: ItemType[] = [
  { key: '1', icon: () => h(UserOutlined), label: 'nav 1' },
  { key: '2', icon: () => h(VideoCameraOutlined), label: 'nav 2' },
  { key: '3', icon: () => h(UploadOutlined), label: 'nav 3' },
  { key: '4', icon: () => h(BarChartOutlined), label: 'nav 4' },
  { key: '5', icon: () => h(CloudOutlined), label: 'nav 5' },
  { key: '6', icon: () => h(AppstoreOutlined), label: 'nav 6' },
  { key: '7', icon: () => h(TeamOutlined), label: 'nav 7' },
  { key: '8', icon: () => h(ShopOutlined), label: 'nav 8' }
]
</script>
<template>
  <div class="demo-container">
    <Layout has-sider>
      <LayoutSider :style="{ overflow: 'auto', height: '360px', position: 'sticky', left: 0, top: 0, bottom: 0 }">
        <div class="logo-1" />
        <Menu v-model:selectedKeys="fixedSiderSelectedKeys" theme="dark" mode="inline" :items="fixedSiderItems" />
      </LayoutSider>
      <Layout>
        <LayoutHeader style="background: #fff; padding: 0" />
        <LayoutContent style="margin: 24px 16px 0">
          <div class="demo-content long">
            <p v-for="n in 30" :key="n">...</p>
            <p>Really long content</p>
          </div>
        </LayoutContent>
        <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
      </Layout>
    </Layout>
  </div>
</template>
```

::::

## 固定头部

*一般用于固定顶部导航，方便页面切换*

<br/>

<div class="demo-container">
  <Layout>
    <LayoutHeader :style="{ position: 'sticky', zIndex: 1, top: 0, width: '100%' }">
      <div class="logo" />
      <Menu
        v-model:selectedKeys="fixedNavKeys"
        style="line-height: 64px"
        mode="horizontal"
        theme="dark"
        :items="headerItems"
      />
    </LayoutHeader>
    <LayoutContent style="padding: 0 50px">
      <Breadcrumb :routes="routes" style="margin: 16px 0" />
      <div class="demo-content tall">Content</div>
    </LayoutContent>
    <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
  </Layout>
</div>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { BreadcrumbRoute, ItemType, MenuKey } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([{ name: 'Home' }, { name: 'List' }, { name: 'App' }])
const headerItems: ItemType[] = [
  { key: '1', label: 'nav 1' },
  { key: '2', label: 'nav 2' },
  { key: '3', label: 'nav 3' }
]
const fixedNavKeys = ref<MenuKey[]>(['2'])
</script>
<template>
  <div class="demo-container">
    <Layout>
      <LayoutHeader :style="{ position: 'sticky', zIndex: 1, top: 0, width: '100%' }">
        <div class="logo" />
        <Menu
          v-model:selectedKeys="fixedNavKeys"
          style="line-height: 64px"
          mode="horizontal"
          theme="dark"
          :items="headerItems"
        />
      </LayoutHeader>
      <LayoutContent style="padding: 0 50px">
        <Breadcrumb :routes="routes" style="margin: 16px 0" />
        <div class="demo-content tall">Content</div>
      </LayoutContent>
      <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
    </Layout>
  </div>
</template>
```

::::

## 响应式收起宽度

*`collapsedWidth` 支持响应式宽度，根据不同的视窗宽度可以设置不同的收起宽度*

<br/>

<Layout class="demo-shadow">
  <LayoutSider
    v-model:collapsed="collapsedResponsiveWidth"
    collapsible
    :collapsed-width="{ lg: 80, xl: 120 }"
    @collapse="onCollapse"
  >
    <div class="logo-1" />
    <Menu
      v-model:selectedKeys="responsiveWidthSelectedKeys"
      theme="dark"
      mode="inline"
      :inline-collapsed="collapsedResponsiveWidth"
      :items="responsiveItems"
    />
  </LayoutSider>
  <Layout>
    <LayoutHeader style="background: #fff; padding: 0" />
    <LayoutContent style="margin: 24px 16px 0">
      <div class="demo-content tall">content</div>
    </LayoutContent>
    <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
  </Layout>
</Layout>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuKey } from 'vue-amazing-ui'
const collapsedResponsiveWidth = ref(true)
const responsiveWidthSelectedKeys = ref<MenuKey[]>(['4'])
const responsiveItems: ItemType[] = [
  { key: '1', icon: () => h(UserOutlined), label: 'nav 1' },
  { key: '2', icon: () => h(VideoCameraOutlined), label: 'nav 2' },
  { key: '3', icon: () => h(UploadOutlined), label: 'nav 3' },
  { key: '4', icon: () => h(UserOutlined), label: 'nav 4' }
]
const onCollapse = (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {
  console.log('collapse', collapsed, type)
}
</script>
<template>
  <Layout class="demo-shadow">
    <LayoutSider
      v-model:collapsed="collapsedResponsiveWidth"
      collapsible
      :collapsed-width="{ lg: 80, xl: 120 }"
      @collapse="onCollapse"
    >
      <div class="logo-1" />
      <Menu
        v-model:selectedKeys="responsiveWidthSelectedKeys"
        theme="dark"
        mode="inline"
        :inline-collapsed="collapsedResponsiveWidth"
        :items="responsiveItems"
      />
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0" />
      <LayoutContent style="margin: 24px 16px 0">
        <div class="demo-content tall">content</div>
      </LayoutContent>
      <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
    </Layout>
  </Layout>
</template>
```

::::

## APIs

### Layout

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
hasSider | 表示子元素里有 `Sider`，一般不用指定；子级存在 `LayoutSider` 时会自动推导，可用于服务端渲染时避免样式闪动 | boolean | undefined

### LayoutSider

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
collapsed <Tag color="cyan">v-model</Tag> | 当前收起状态，不传时为非受控 | boolean | undefined
defaultCollapsed | 是否默认收起，仅非受控时生效 | boolean | false
width | 宽度，数字按 `px` 处理 | number &#124; string | 200
collapsedWidth | 收缩宽度，数字按 `px` 处理，设置为 `0` 会出现特殊 trigger；传响应式对象时按视窗宽度取对应档位 | number &#124; [LayoutSiderResponsive](#layoutsiderresponsive-type) | 80
theme | 主题颜色 | 'light' &#124; 'dark' | 'dark'
collapsible | 是否可收起 | boolean | false
breakpoint | 触发响应式布局的断点，视窗宽度低于该断点时收起 | 'xs' &#124; 'sm' &#124; 'md' &#124; 'lg' &#124; 'xl' &#124; 'xxl' &#124; 'xxxl' | undefined
trigger | 自定义收起触发器，设置为 `null` 时隐藏触发器；插槽形态请用同名 `#trigger` 插槽 | VNode &#124; string &#124; null | undefined
reverseArrow | 翻转折叠提示箭头的方向，当 `Sider` 在右边时可以使用 | boolean | false
zeroWidthTriggerStyle | 指定当 `collapsedWidth` 为 `0` 时出现的特殊 trigger 的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined

### LayoutSiderResponsive Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
xs | `<576px` 时的收起宽度 | number | undefined
sm | `≥576px` 时的收起宽度 | number | undefined
md | `≥768px` 时的收起宽度 | number | undefined
lg | `≥992px` 时的收起宽度 | number | undefined
xl | `≥1200px` 时的收起宽度 | number | undefined
xxl | `≥1600px` 时的收起宽度 | number | undefined
xxxl | `≥2000px` 时的收起宽度 | number | undefined

## Slots

### Layout Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义布局内容 | v-slot:default

### LayoutHeader Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义顶部布局内容 | v-slot:default

### LayoutContent Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义内容区内容 | v-slot:default

### LayoutFooter Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义底部布局内容 | v-slot:default

### LayoutSider Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义侧边栏内容 | v-slot:default
trigger | 自定义收起触发器，存在时优先于 `trigger` 属性 | v-slot:trigger

## Events

名称 | 说明 | 类型
:-- | :-- | :--
collapse | 展开-收起时的回调函数，点击 trigger 与响应式反馈均可触发 | (collapsed: boolean, type: 'clickTrigger' &#124; 'responsive') => void
breakpoint | 触发响应式布局断点时的回调，`broken` 为 `true` 表示视窗宽度已低于断点 | (broken: boolean) => void

<style lang="less" scoped>
.demo-content {
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
.demo-content.tall {
  min-height: 360px;
}
.demo-content.long {
  text-align: center;
  p {
    line-height: 24px;
  }
}
.demo-container {
  height: 360px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: 0 2px 8px #00000047;
}
.demo-shadow {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px #00000047;
}
.logo {
  float: left;
  width: 120px;
  height: 32px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.logo-1 {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--primary-color);
  }
}
</style>
