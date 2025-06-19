<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  ShopOutlined
} from '@ant-design/icons-vue'
import type { BreadcrumbRoute } from 'vue-amazing-ui'
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
const routes = ref<BreadcrumbRoute[]>([
  {
    name: 'Home'
  },
  {
    name: 'List'
  },
  {
    name: 'App'
  }
])
const routes1 = ref<BreadcrumbRoute[]>([
  {
    name: 'User'
  },
  {
    name: 'Curry'
  }
])
const selectedKeys = ref<string[]>(['2'])
const selectedKeys1 = ref<string[]>(['2'])
const selectedKeys2 = ref<string[]>(['1'])
const selectedKeys3 = ref<string[]>(['2'])
const selectedKeys4 = ref<string[]>(['1'])
const selectedKeys5 = ref<string[]>(['1'])
const selectedKeys6 = ref<string[]>(['1'])
const selectedKeys7 = ref<string[]>(['4'])
const selectedKeys8 = ref<string[]>(['4'])
const selectedKeys9 = ref<string[]>(['2'])
const openKeys = ref<string[]>(['sub1'])
const collapsed = ref<boolean>(true)
const onCollapse = (collapsed: boolean, type: 'responsiveBreakpoint' | 'clickTrigger') => {
  console.log('collapse', collapsed, type)
}
const onBreakpoint = (broken: boolean) => {
  console.log('breakpoint', broken)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Flex vertical :gap="48">
      <Layout>
        <LayoutHeader :style="headerStyle">Header</LayoutHeader>
        <LayoutContent :style="contentStyle">Content</LayoutContent>
        <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
      </Layout>

      <Layout>
        <LayoutHeader :style="headerStyle">Header</LayoutHeader>
        <Layout>
          <LayoutSider :width="300" :style="siderStyle">Sider</LayoutSider>
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
    <h3 class="mb10">最基本的『上-中-下』布局</h3>
    <h3 class="mb10"
      >一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。</h3
    >
    <Layout class="layout">
      <LayoutHeader>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </LayoutHeader>
      <LayoutContent style="padding: 0 50px">
        <Breadcrumb :routes="routes" style="margin: 16px 0" />
        <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div>
      </LayoutContent>
      <LayoutFooter style="text-align: center"> Vue Amazing UI ©2023 Created by the Muse Catcher </LayoutFooter>
    </Layout>
    <h2 class="mt30 mb10">顶部-侧边栏布局-通栏</h2>
    <h3 class="mb10">同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站</h3>
    <Layout>
      <LayoutHeader class="header">
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </LayoutHeader>
      <Layout>
        <LayoutSider width="200" style="background: #fff">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <user-outlined />
                  subnav 1
                </span>
              </template>
              <a-menu-item key="1">option1</a-menu-item>
              <a-menu-item key="2">option2</a-menu-item>
              <a-menu-item key="3">option3</a-menu-item>
              <a-menu-item key="4">option4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <laptop-outlined />
                  subnav 2
                </span>
              </template>
              <a-menu-item key="5">option5</a-menu-item>
              <a-menu-item key="6">option6</a-menu-item>
              <a-menu-item key="7">option7</a-menu-item>
              <a-menu-item key="8">option8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <notification-outlined />
                  subnav 3
                </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </LayoutSider>
        <Layout style="padding: 0 24px 24px">
          <Breadcrumb :routes="routes" style="margin: 16px 0" />
          <LayoutContent :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
            Content
          </LayoutContent>
        </Layout>
      </Layout>
    </Layout>
    <h2 class="mt30 mb10">顶部-侧边布局</h2>
    <h3 class="mb10">拥有顶部导航及侧边栏的页面，多用于展示类网站</h3>
    <Layout>
      <LayoutHeader class="header">
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys3" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </LayoutHeader>
      <LayoutContent style="padding: 0 50px">
        <Breadcrumb :routes="routes" style="margin: 16px 0" />
        <Layout style="padding: 24px 0; background: #fff">
          <LayoutSider width="200" style="background: #fff">
            <a-menu v-model:selectedKeys="selectedKeys4" v-model:openKeys="openKeys" mode="inline" style="height: 100%">
              <a-sub-menu key="sub1">
                <template #title>
                  <span>
                    <user-outlined />
                    subnav 1
                  </span>
                </template>
                <a-menu-item key="1">option1</a-menu-item>
                <a-menu-item key="2">option2</a-menu-item>
                <a-menu-item key="3">option3</a-menu-item>
                <a-menu-item key="4">option4</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub2">
                <template #title>
                  <span>
                    <laptop-outlined />
                    subnav 2
                  </span>
                </template>
                <a-menu-item key="5">option5</a-menu-item>
                <a-menu-item key="6">option6</a-menu-item>
                <a-menu-item key="7">option7</a-menu-item>
                <a-menu-item key="8">option8</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub3">
                <template #title>
                  <span>
                    <notification-outlined />
                    subnav 3
                  </span>
                </template>
                <a-menu-item key="9">option9</a-menu-item>
                <a-menu-item key="10">option10</a-menu-item>
                <a-menu-item key="11">option11</a-menu-item>
                <a-menu-item key="12">option12</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </LayoutSider>
          <LayoutContent :style="{ padding: '0 24px', minHeight: '280px' }"> Content </LayoutContent>
        </Layout>
      </LayoutContent>
      <LayoutFooter style="text-align: center"> Vue Amazing UI ©2023 Created by the Muse Catcher </LayoutFooter>
    </Layout>
    <h2 class="mt30 mb10">侧边布局</h2>
    <h3 class="mb10">侧边两列式布局。页面横向空间有限时，侧边导航可收起</h3>
    <h3 class="mb10"
      >侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。但这类导航横向页面内容的空间会被牺牲一部份</h3
    >
    <div style="height: 360px; overflow: auto; border-radius: 6px; box-shadow: 0 2px 8px #00000047">
      <Layout>
        <LayoutSider
          :style="{ height: '360px', position: 'sticky', left: 0, top: 0, bottom: 0 }"
          v-model:collapsed="collapsed"
          collapsible
          @collapse="onCollapse"
        >
          <div class="logo-1" />
          <a-menu v-model:selectedKeys="selectedKeys5" theme="dark" mode="inline" :inline-collapsed="collapsed">
            <a-menu-item key="1">
              <pie-chart-outlined />
              <span>Option 1</span>
            </a-menu-item>
            <a-menu-item key="2">
              <desktop-outlined />
              <span>Option 2</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <user-outlined />
                  <span>User</span>
                </span>
              </template>
              <a-menu-item key="3">Tom</a-menu-item>
              <a-menu-item key="4">Bill</a-menu-item>
              <a-menu-item key="5">Alex</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <team-outlined />
                  <span>Team</span>
                </span>
              </template>
              <a-menu-item key="6">Team 1</a-menu-item>
              <a-menu-item key="8">Team 2</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="9">
              <file-outlined />
              <span>File</span>
            </a-menu-item>
          </a-menu>
        </LayoutSider>
        <Layout>
          <LayoutHeader style="background: #fff; padding: 0" />
          <LayoutContent style="margin: 0 16px">
            <Breadcrumb :routes="routes1" style="margin: 16px 0" />
            <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
              Curry is a basketball player.
            </div>
          </LayoutContent>
          <LayoutFooter style="text-align: center"> Vue Amazing UI ©2023 Created by the Muse Catcher </LayoutFooter>
        </Layout>
      </Layout>
    </div>
    <h2 class="mt30 mb10">自定义收起展开触发器</h2>
    <h3 class="mb10">要使用自定义触发器，可以设置 :trigger="null" 来隐藏默认设定</h3>
    <Layout style="border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px #00000047">
      <LayoutSider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo-1" />
        <a-menu v-model:selectedKeys="selectedKeys6" theme="dark" mode="inline" :inline-collapsed="collapsed">
          <a-menu-item key="1">
            <user-outlined />
            <span>nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <video-camera-outlined />
            <span>nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <upload-outlined />
            <span>nav 3</span>
          </a-menu-item>
        </a-menu>
      </LayoutSider>
      <Layout>
        <LayoutHeader style="background: #fff; padding: 0">
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </LayoutHeader>
        <LayoutContent :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          Content
        </LayoutContent>
      </Layout>
    </Layout>
    <h2 class="mt30 mb10">响应式收起宽度</h2>
    <h3 class="mb10">collapsedWidth 支持响应式宽度，根据不同的视窗宽度可以设置不同的收起宽度</h3>
    <Layout style="border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px #00000047">
      <LayoutSider
        v-model:collapsed="collapsed"
        collapsible
        :collapsed-width="{ lg: 80, xl: 120 }"
        @collapse="onCollapse"
      >
        <div class="logo-1" />
        <a-menu v-model:selectedKeys="selectedKeys7" theme="dark" mode="inline" :inline-collapsed="collapsed">
          <a-menu-item key="1">
            <user-outlined />
            <span class="nav-text">nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <video-camera-outlined />
            <span class="nav-text">nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <upload-outlined />
            <span class="nav-text">nav 3</span>
          </a-menu-item>
          <a-menu-item key="4">
            <user-outlined />
            <span class="nav-text">nav 4</span>
          </a-menu-item>
        </a-menu>
      </LayoutSider>
      <Layout>
        <LayoutHeader :style="{ background: '#fff', padding: 0 }" />
        <LayoutContent :style="{ margin: '24px 16px 0' }">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">content</div>
        </LayoutContent>
        <LayoutFooter style="text-align: center"> Vue Amazing UI ©2023 Created by the Muse Catcher </LayoutFooter>
      </Layout>
    </Layout>
    <h2 class="mt30 mb10">响应式触发收起</h2>
    <h3 class="mb10"
      >通过配置 breakpoint 属性，当视窗宽度小于 breakpoint 时 Sider 缩小为对应的 collapsedWidth 宽度，若将
      collapsedWidth 设置为 0，会出现特殊 trigger</h3
    >
    <Layout style="border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px #00000047">
      <LayoutSider
        v-model:collapsed="collapsed"
        collapsible
        breakpoint="xl"
        :collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <div class="logo-1" />
        <a-menu v-model:selectedKeys="selectedKeys7" theme="dark" mode="inline" :inline-collapsed="collapsed">
          <a-menu-item key="1">
            <user-outlined />
            <span class="nav-text">nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <video-camera-outlined />
            <span class="nav-text">nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <upload-outlined />
            <span class="nav-text">nav 3</span>
          </a-menu-item>
          <a-menu-item key="4">
            <user-outlined />
            <span class="nav-text">nav 4</span>
          </a-menu-item>
        </a-menu>
      </LayoutSider>
      <Layout>
        <LayoutHeader :style="{ background: '#fff', padding: 0 }" />
        <LayoutContent :style="{ margin: '24px 16px 0' }">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">content</div>
        </LayoutContent>
        <LayoutFooter style="text-align: center"> Vue Amazing UI ©2023 Created by the Muse Catcher </LayoutFooter>
      </Layout>
    </Layout>
    <h2 class="mt30 mb10">固定侧边栏</h2>
    <h3 class="mb10">当内容较长时，使用固定侧边栏可以提供更好的体验</h3>
    <div style="height: 360px; overflow: auto; border-radius: 6px; box-shadow: 0 2px 8px #00000047">
      <Layout>
        <LayoutSider :style="{ overflow: 'auto', height: '360px', position: 'sticky', left: 0, top: 0, bottom: 0 }">
          <div class="logo-1" />
          <a-menu v-model:selectedKeys="selectedKeys8" theme="dark" mode="inline">
            <a-menu-item key="1">
              <user-outlined />
              <span class="nav-text">nav 1</span>
            </a-menu-item>
            <a-menu-item key="2">
              <video-camera-outlined />
              <span class="nav-text">nav 2</span>
            </a-menu-item>
            <a-menu-item key="3">
              <upload-outlined />
              <span class="nav-text">nav 3</span>
            </a-menu-item>
            <a-menu-item key="4">
              <bar-chart-outlined />
              <span class="nav-text">nav 4</span>
            </a-menu-item>
            <a-menu-item key="5">
              <cloud-outlined />
              <span class="nav-text">nav 5</span>
            </a-menu-item>
            <a-menu-item key="6">
              <appstore-outlined />
              <span class="nav-text">nav 6</span>
            </a-menu-item>
            <a-menu-item key="7">
              <team-outlined />
              <span class="nav-text">nav 7</span>
            </a-menu-item>
            <a-menu-item key="8">
              <shop-outlined />
              <span class="nav-text">nav 8</span>
            </a-menu-item>
          </a-menu>
        </LayoutSider>
        <Layout>
          <LayoutHeader :style="{ background: '#fff', padding: 0 }" />
          <LayoutContent :style="{ margin: '24px 16px 0', overflow: 'visible' }">
            <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
              ...
              <br />
              Really
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              long
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              content
            </div>
          </LayoutContent>
          <LayoutFooter :style="{ textAlign: 'center' }">
            Vue Amazing UI ©2023 Created by the Muse Catcher
          </LayoutFooter>
        </Layout>
      </Layout>
    </div>
    <h2 class="mt30 mb10">固定头部</h2>
    <h3 class="mb10">一般用于固定顶部导航，方便页面切换</h3>
    <div style="height: 360px; overflow: auto; border-radius: 6px; box-shadow: 0 2px 8px #00000047">
      <Layout>
        <LayoutHeader :style="{ position: 'sticky', zIndex: 1, top: 0, width: '100%' }">
          <div class="logo" />
          <a-menu v-model:selectedKeys="selectedKeys9" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item key="1">nav 1</a-menu-item>
            <a-menu-item key="2">nav 2</a-menu-item>
            <a-menu-item key="3">nav 3</a-menu-item>
          </a-menu>
        </LayoutHeader>
        <LayoutContent :style="{ padding: '0 50px' }">
          <Breadcrumb :routes="routes" style="margin: 16px 0" />
          <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">Content</div>
        </LayoutContent>
        <LayoutFooter :style="{ textAlign: 'center' }">
          Vue Amazing UI ©2023 Created by the Muse Catcher
        </LayoutFooter>
      </Layout>
    </div>
  </div>
</template>
<style lang="less" scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
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
    color: #1890ff;
  }
}
</style>
