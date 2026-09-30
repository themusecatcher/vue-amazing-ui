<script setup lang="ts">
import { ref } from 'vue'
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
import type { BreadcrumbRoute, MenuKey } from 'vue-amazing-ui'

// 基本结构用例的内联配色
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
// 面包屑数据：侧边布局用例的层级与其它用例不同，单独一份
const routes = ref<BreadcrumbRoute[]>([{ name: 'Home' }, { name: 'List' }, { name: 'App' }])
const sideRoutes = ref<BreadcrumbRoute[]>([{ name: 'User' }, { name: 'Bill' }])

// 各用例的状态独立持有：同页多个用例共用会互相串联
const topNavKeys = ref<MenuKey[]>(['2'])
const topSide2NavKeys = ref<MenuKey[]>(['2'])
const topSide2SiderKeys = ref<MenuKey[]>(['1'])
const topSide2OpenKeys = ref<MenuKey[]>(['sub1'])
const topSideNavKeys = ref<MenuKey[]>(['2'])
const topSideSiderKeys = ref<MenuKey[]>(['1'])
const topSideOpenKeys = ref<MenuKey[]>(['sub1'])
const collapsedSide = ref(false)
const sideSelectedKeys = ref<MenuKey[]>(['1'])
const collapsedCustom = ref(false)
const customTriggerSelectedKeys = ref<MenuKey[]>(['1'])
const responsiveSelectedKeys = ref<MenuKey[]>(['4'])
const fixedSiderSelectedKeys = ref<MenuKey[]>(['4'])
const fixedNavKeys = ref<MenuKey[]>(['2'])
const collapsedResponsiveWidth = ref(true)
const responsiveWidthSelectedKeys = ref<MenuKey[]>(['4'])
const customScrollbarSelectedKeys = ref<MenuKey[]>(['1'])
const onCollapse = (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {
  console.log('collapse', collapsed, type)
}
const onBreakpoint = (broken: boolean) => {
  console.log('breakpoint', broken)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本结构</h2>
    <p class="mb10">四种典型页面框架：仅上中下、含侧边栏、侧边栏在右、侧边栏在左</p>
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
    <h2 class="mt30 mb10">上中下布局</h2>
    <p class="mb10">内容集中在定宽区域内，页面结构稳定，不受浏览区域宽度影响</p>
    <Layout>
      <LayoutHeader>
        <div class="logo" />
        <Menu v-model:selectedKeys="topNavKeys" style="line-height: 64px" mode="horizontal" theme="dark">
          <MenuItem key="1">nav 1</MenuItem>
          <MenuItem key="2">nav 2</MenuItem>
          <MenuItem key="3">nav 3</MenuItem>
        </Menu>
      </LayoutHeader>
      <LayoutContent style="padding: 0 50px">
        <Breadcrumb :routes="routes" style="margin: 16px 0" />
        <div style="padding: 24px; background: #fff; min-height: 280px">Content</div>
      </LayoutContent>
      <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
    </Layout>
    <h2 class="mt30 mb10">顶部-侧边布局-通栏</h2>
    <p class="mb10">顶部导航与侧边栏贴合页面边缘、不留外边距，适合信息密度高的应用型页面</p>
    <Layout>
      <LayoutHeader>
        <div class="logo" />
        <Menu v-model:selectedKeys="topSide2NavKeys" style="line-height: 64px" mode="horizontal" theme="dark">
          <MenuItem key="1">nav 1</MenuItem>
          <MenuItem key="2">nav 2</MenuItem>
          <MenuItem key="3">nav 3</MenuItem>
        </Menu>
      </LayoutHeader>
      <Layout>
        <LayoutSider width="200" style="background: #fff">
          <Menu
            v-model:selectedKeys="topSide2SiderKeys"
            v-model:openKeys="topSide2OpenKeys"
            style="height: 100%; border-right: 0"
            mode="inline"
          >
            <MenuSubMenu key="sub1">
              <template #title>
                <span>
                  <UserOutlined />
                  subnav 1
                </span>
              </template>
              <MenuItem key="1">option1</MenuItem>
              <MenuItem key="2">option2</MenuItem>
              <MenuItem key="3">option3</MenuItem>
              <MenuItem key="4">option4</MenuItem>
            </MenuSubMenu>
            <MenuSubMenu key="sub2">
              <template #title>
                <span>
                  <LaptopOutlined />
                  subnav 2
                </span>
              </template>
              <MenuItem key="5">option5</MenuItem>
              <MenuItem key="6">option6</MenuItem>
              <MenuItem key="7">option7</MenuItem>
              <MenuItem key="8">option8</MenuItem>
            </MenuSubMenu>
            <MenuSubMenu key="sub3">
              <template #title>
                <span>
                  <NotificationOutlined />
                  subnav 3
                </span>
              </template>
              <MenuItem key="9">option9</MenuItem>
              <MenuItem key="10">option10</MenuItem>
              <MenuItem key="11">option11</MenuItem>
              <MenuItem key="12">option12</MenuItem>
            </MenuSubMenu>
          </Menu>
        </LayoutSider>
        <Layout style="padding: 0 24px 24px">
          <Breadcrumb :routes="routes" style="margin: 16px 0" />
          <LayoutContent style="background: #fff; padding: 24px; margin: 0; min-height: 280px">Content</LayoutContent>
        </Layout>
      </Layout>
    </Layout>

    <h2 class="mt30 mb10">顶部-侧边布局</h2>
    <p class="mb10">相比通栏形态，内容区两侧留出边距，多用于展示类页面</p>
    <Layout>
      <LayoutHeader>
        <div class="logo" />
        <Menu v-model:selectedKeys="topSideNavKeys" style="line-height: 64px" mode="horizontal" theme="dark">
          <MenuItem key="1">nav 1</MenuItem>
          <MenuItem key="2">nav 2</MenuItem>
          <MenuItem key="3">nav 3</MenuItem>
        </Menu>
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
            >
              <MenuSubMenu key="sub1">
                <template #title>
                  <span>
                    <UserOutlined />
                    subnav 1
                  </span>
                </template>
                <MenuItem key="1">option1</MenuItem>
                <MenuItem key="2">option2</MenuItem>
                <MenuItem key="3">option3</MenuItem>
                <MenuItem key="4">option4</MenuItem>
              </MenuSubMenu>
              <MenuSubMenu key="sub2">
                <template #title>
                  <span>
                    <LaptopOutlined />
                    subnav 2
                  </span>
                </template>
                <MenuItem key="5">option5</MenuItem>
                <MenuItem key="6">option6</MenuItem>
                <MenuItem key="7">option7</MenuItem>
                <MenuItem key="8">option8</MenuItem>
              </MenuSubMenu>
              <MenuSubMenu key="sub3">
                <template #title>
                  <span>
                    <NotificationOutlined />
                    subnav 3
                  </span>
                </template>
                <MenuItem key="9">option9</MenuItem>
                <MenuItem key="10">option10</MenuItem>
                <MenuItem key="11">option11</MenuItem>
                <MenuItem key="12">option12</MenuItem>
              </MenuSubMenu>
            </Menu>
          </LayoutSider>
          <LayoutContent style="padding: 0 24px; min-height: 280px">Content</LayoutContent>
        </Layout>
      </LayoutContent>
      <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
    </Layout>

    <h2 class="mt30 mb10">侧边布局</h2>
    <p class="mb10">侧边导航可收起，横向空间有限时能腾出内容区宽度；如需定制滚动条，可搭配 Scrollbar 组件</p>
    <div class="demo-container">
      <Layout>
        <LayoutSider v-model:collapsed="collapsedSide" collapsible>
          <div class="logo-1" />
          <Menu v-model:selectedKeys="sideSelectedKeys" theme="dark" mode="inline">
            <MenuItem key="1">
              <template #icon><PieChartOutlined /></template>
              Option 1
            </MenuItem>
            <MenuItem key="2">
              <template #icon><DesktopOutlined /></template>
              Option 2
            </MenuItem>
            <MenuSubMenu key="sub1" title="User">
              <template #icon><UserOutlined /></template>
              <MenuItem key="3">Tom</MenuItem>
              <MenuItem key="4">Bill</MenuItem>
              <MenuItem key="5">Alex</MenuItem>
            </MenuSubMenu>
            <MenuSubMenu key="sub2" title="Team">
              <template #icon><TeamOutlined /></template>
              <MenuItem key="6">Team 1</MenuItem>
              <MenuItem key="8">Team 2</MenuItem>
            </MenuSubMenu>
            <MenuItem key="9">
              <template #icon><FileOutlined /></template>
              File
            </MenuItem>
          </Menu>
        </LayoutSider>
        <Layout>
          <LayoutHeader style="background: #fff; padding: 0" />
          <LayoutContent style="margin: 0 16px">
            <Breadcrumb :routes="sideRoutes" style="margin: 16px 0" />
            <div style="padding: 24px; background: #fff; min-height: 360px">Bill is a cat.</div>
          </LayoutContent>
          <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
        </Layout>
      </Layout>
    </div>

    <h2 class="mt30 mb10">自定义触发器</h2>
    <p class="mb10">设置 <code>:trigger="null"</code> 隐藏默认触发器，改用头部图标控制侧边栏开合</p>
    <Layout>
      <LayoutSider v-model:collapsed="collapsedCustom" :trigger="null" collapsible>
        <div class="logo-1" />
        <Menu v-model:selectedKeys="customTriggerSelectedKeys" theme="dark" mode="inline">
          <MenuItem key="1">
            <template #icon><UserOutlined /></template>
            nav 1
          </MenuItem>
          <MenuItem key="2">
            <template #icon><VideoCameraOutlined /></template>
            nav 2
          </MenuItem>
          <MenuItem key="3">
            <template #icon><UploadOutlined /></template>
            nav 3
          </MenuItem>
        </Menu>
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

    <h2 class="mt30 mb10">响应式布局</h2>
    <p class="mb10">
      视窗宽度低于 <code>breakpoint</code> 时侧边栏自动收起到 <code>collapsedWidth</code>；
      <code>collapsedWidth</code> 为 <code>0</code> 时改用悬浮于侧边栏之外的特殊触发器
    </p>
    <Layout>
      <LayoutSider breakpoint="lg" :collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
        <div class="logo-1 faint" />
        <Menu v-model:selectedKeys="responsiveSelectedKeys" theme="dark" mode="inline">
          <MenuItem key="1">
            <template #icon><UserOutlined /></template>
            nav 1
          </MenuItem>
          <MenuItem key="2">
            <template #icon><VideoCameraOutlined /></template>
            nav 2
          </MenuItem>
          <MenuItem key="3">
            <template #icon><UploadOutlined /></template>
            nav 3
          </MenuItem>
          <MenuItem key="4">
            <template #icon><UserOutlined /></template>
            nav 4
          </MenuItem>
        </Menu>
      </LayoutSider>
      <Layout>
        <LayoutHeader style="background: #fff; padding: 0" />
        <LayoutContent style="margin: 24px 16px 0">
          <div style="padding: 24px; background: #fff; min-height: 360px">content</div>
        </LayoutContent>
        <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
      </Layout>
    </Layout>

    <h2 class="mt30 mb10">固定侧边栏</h2>
    <p class="mb10">内容超过一屏时侧边栏保持固定，滚动浏览时不会移出视口；如需定制滚动条，可搭配 Scrollbar 组件</p>
    <div class="demo-container">
      <Layout has-sider>
        <LayoutSider :style="{ overflow: 'auto', height: '360px', position: 'sticky', left: 0, top: 0, bottom: 0 }">
          <div class="logo-1 faint" />
          <Menu v-model:selectedKeys="fixedSiderSelectedKeys" theme="dark" mode="inline">
            <MenuItem key="1">
              <template #icon><UserOutlined /></template>
              nav 1
            </MenuItem>
            <MenuItem key="2">
              <template #icon><VideoCameraOutlined /></template>
              nav 2
            </MenuItem>
            <MenuItem key="3">
              <template #icon><UploadOutlined /></template>
              nav 3
            </MenuItem>
            <MenuItem key="4">
              <template #icon><BarChartOutlined /></template>
              nav 4
            </MenuItem>
            <MenuItem key="5">
              <template #icon><CloudOutlined /></template>
              nav 5
            </MenuItem>
            <MenuItem key="6">
              <template #icon><AppstoreOutlined /></template>
              nav 6
            </MenuItem>
            <MenuItem key="7">
              <template #icon><TeamOutlined /></template>
              nav 7
            </MenuItem>
            <MenuItem key="8">
              <template #icon><ShopOutlined /></template>
              nav 8
            </MenuItem>
          </Menu>
        </LayoutSider>
        <Layout>
          <LayoutHeader style="background: #fff; padding: 0" />
          <LayoutContent style="margin: 24px 16px 0; overflow: initial">
            <div style="padding: 24px; background: #fff; text-align: center">
              ...<br />Really<br />...<br />...<br />...<br />...<br />...<br />...<br />long<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />...<br />content
            </div>
          </LayoutContent>
          <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
        </Layout>
      </Layout>
    </div>

    <h2 class="mt30 mb10">固定头部</h2>
    <p class="mb10">顶部导航固定在顶部，长页面滚动时仍可随时切换</p>
    <div class="demo-container">
      <Layout>
        <LayoutHeader :style="{ position: 'sticky', zIndex: 1, top: 0, width: '100%' }">
          <div class="logo faint" />
          <Menu v-model:selectedKeys="fixedNavKeys" style="line-height: 64px" mode="horizontal" theme="dark">
            <MenuItem key="1">nav 1</MenuItem>
            <MenuItem key="2">nav 2</MenuItem>
            <MenuItem key="3">nav 3</MenuItem>
          </Menu>
        </LayoutHeader>
        <LayoutContent style="padding: 0 50px">
          <Breadcrumb :routes="routes" style="margin: 16px 0" />
          <div style="padding: 24px; background: #fff; min-height: 380px">Content</div>
        </LayoutContent>
        <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
      </Layout>
    </div>

    <h2 class="mt30 mb10">响应式收起宽度</h2>
    <p class="mb10"><code>collapsedWidth</code> 支持响应式宽度，按不同视窗宽度设置不同的收起宽度</p>
    <Layout>
      <LayoutSider v-model:collapsed="collapsedResponsiveWidth" collapsible :collapsed-width="{ lg: 80, xl: 120 }">
        <div class="logo-1" />
        <Menu v-model:selectedKeys="responsiveWidthSelectedKeys" theme="dark" mode="inline">
          <MenuItem key="1">
            <template #icon><UserOutlined /></template>
            nav 1
          </MenuItem>
          <MenuItem key="2">
            <template #icon><VideoCameraOutlined /></template>
            nav 2
          </MenuItem>
          <MenuItem key="3">
            <template #icon><UploadOutlined /></template>
            nav 3
          </MenuItem>
          <MenuItem key="4">
            <template #icon><UserOutlined /></template>
            nav 4
          </MenuItem>
        </Menu>
      </LayoutSider>
      <Layout>
        <LayoutHeader style="background: #fff; padding: 0" />
        <LayoutContent style="margin: 24px 16px 0">
          <div style="padding: 24px; background: #fff; min-height: 360px">content</div>
        </LayoutContent>
        <LayoutFooter style="text-align: center">Vue Amazing UI ©2023 Created by the Muse Catcher</LayoutFooter>
      </Layout>
    </Layout>

    <h2 class="mt30 mb10">自定义滚动条</h2>
    <p class="mb10">侧边栏与内容区的滚动条改用 Scrollbar 组件，滚动样式与交互由组件统一提供</p>
    <div class="demo-container demo-container-lg">
      <Layout style="height: 100%">
        <LayoutSider>
          <Scrollbar style="height: 100%">
            <div class="logo-1 faint" />
            <Menu v-model:selectedKeys="customScrollbarSelectedKeys" theme="dark" mode="inline">
              <MenuItem key="1">
                <template #icon><UserOutlined /></template>
                nav 1
              </MenuItem>
              <MenuItem key="2">
                <template #icon><VideoCameraOutlined /></template>
                nav 2
              </MenuItem>
              <MenuItem key="3">
                <template #icon><UploadOutlined /></template>
                nav 3
              </MenuItem>
              <MenuItem key="4">
                <template #icon><BarChartOutlined /></template>
                nav 4
              </MenuItem>
              <MenuItem key="5">
                <template #icon><CloudOutlined /></template>
                nav 5
              </MenuItem>
              <MenuItem key="6">
                <template #icon><AppstoreOutlined /></template>
                nav 6
              </MenuItem>
              <MenuItem key="7">
                <template #icon><TeamOutlined /></template>
                nav 7
              </MenuItem>
              <MenuItem key="8">
                <template #icon><ShopOutlined /></template>
                nav 8
              </MenuItem>
              <MenuItem key="9">
                <template #icon><DesktopOutlined /></template>
                nav 9
              </MenuItem>
              <MenuItem key="10">
                <template #icon><LaptopOutlined /></template>
                nav 10
              </MenuItem>
              <MenuItem key="11">
                <template #icon><NotificationOutlined /></template>
                nav 11
              </MenuItem>
              <MenuItem key="12">
                <template #icon><PieChartOutlined /></template>
                nav 12
              </MenuItem>
            </Menu>
          </Scrollbar>
        </LayoutSider>
        <Layout>
          <LayoutHeader style="background: #fff; padding: 0" />
          <LayoutContent>
            <Scrollbar style="height: 100%">
              <div style="padding: 24px; background: #fff">
                <template v-for="i in 12" :key="i">
                  <h3 style="margin: 0 0 8px; font-size: 16px">Section {{ i }}</h3>
                  <p style="margin: 0 0 24px; color: rgba(0, 0, 0, 0.45)">
                    Sider 与内容区各自独立滚动，滚动条均由 Scrollbar 组件提供
                  </p>
                </template>
              </div>
            </Scrollbar>
          </LayoutContent>
        </Layout>
      </Layout>
    </div>
  </div>
</template>
<style lang="less" scoped>
// 承载「整页」形态的用例（对应官网 iframe 承载），限高并允许内部滚动，避免撑高文档页面
.demo-container {
  height: 360px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: 0 2px 8px #00000047;
}
// 自定义滚动条用例的承载盒：加高以放大滚动区域，滚动条的滚动幅度更易观察
.demo-container-lg {
  height: 480px;
}
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.logo-1 {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
// 占位块更淡的用例（与官网各用例取值一致）
.faint {
  background: rgba(255, 255, 255, 0.2);
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
