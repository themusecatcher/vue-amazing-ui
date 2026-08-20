<script setup lang="ts">
import { ref, h } from 'vue'
import { DownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons-vue'
import type { MenuOption, Key } from 'components/dropdown'
import { toggleDark } from 'components/utils'
// 基础菜单数据（配置式）
const basicMenus: MenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 含分割线、禁用项
const itemMenus: MenuOption[] = [
  { key: '0', label: '1st menu item', href: 'https://www.antdv.com/', target: '_blank' },
  { key: '1', label: '2nd menu item', href: 'https://www.vuejs.org/', target: '_blank' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item（disabled）', disabled: true }
]
// 带图标
const iconMenus: MenuOption[] = [
  { key: '1', label: '1st menu item', icon: h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: h(UserOutlined) },
  { key: '3', label: '3rd menu item', icon: h(UserOutlined) }
]
// 加载中
const loadingMenus: MenuOption[] = [
  { key: '1', label: 'Submit and continue', loading: true },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 危险项
const dangerMenus: MenuOption[] = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { type: 'divider' },
  { key: '3', label: 'Delete', danger: true }
]
// 多级菜单
const subMenus: MenuOption[] = [
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
const groupMenus: MenuOption[] = [
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
const placements = ['bottomLeft', 'bottom', 'bottomRight', 'topLeft', 'top', 'topRight'] as const
const open = ref<boolean>(false)
function onMenuClick(key: Key | undefined, option: MenuOption) {
  console.log('menu click', key, option)
}
function onOpenChange(o: boolean) {
  console.log('open change', o)
}
function onButtonClick(e: MouseEvent) {
  console.log('left button click', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">主题切换</h2>
    <Button type="primary" @click="toggleDark">切换 light/dark 主题</Button>

    <h2 class="mt30 mb10">基本</h2>
    <p class="mb10">最简单的下拉菜单。</p>
    <Dropdown :menus="basicMenus">
      <a @click.prevent>
        Hover me
        <DownOutlined />
      </a>
    </Dropdown>

    <h2 class="mt30 mb10">弹出位置</h2>
    <p class="mb10">支持 6 个弹出位置。</p>
    <div class="placement-wrap">
      <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p">
        <Button>{{ p }}</Button>
      </Dropdown>
    </div>

    <h2 class="mt30 mb10">其他元素</h2>
    <p class="mb10">分割线和不可用菜单项。</p>
    <Dropdown :menus="itemMenus">
      <a @click.prevent>
        Hover me
        <DownOutlined />
      </a>
    </Dropdown>

    <h2 class="mt30 mb10">触发方式</h2>
    <p class="mb10">默认是移入触发菜单，可以点击触发。</p>
    <Dropdown :menus="basicMenus" trigger="click">
      <a @click.prevent>
        Click me
        <DownOutlined />
      </a>
    </Dropdown>

    <h2 class="mt30 mb10">触发事件</h2>
    <p class="mb10"
      >点击菜单项后触发 <code>menuClick</code> 事件，事件对象包含菜单项 <code>key</code> 与完整配置
      <code>option</code>（打开控制台查看）。</p
    >
    <Space>
      <Dropdown :menus="iconMenus" @menu-click="onMenuClick">
        <a @click.prevent>
          Hover me, Click menu item
          <DownOutlined />
        </a>
      </Dropdown>
    </Space>

    <h2 class="mt30 mb10">右键菜单</h2>
    <p class="mb10">默认是移入触发菜单，可以点击鼠标右键触发，菜单会在鼠标点击位置弹出。</p>
    <Dropdown :menus="basicMenus" trigger="contextMenu">
      <div class="context-area">Right Click on here</div>
    </Dropdown>

    <h2 class="mt30 mb10">箭头</h2>
    <p class="mb10">设置 <code>arrow</code> 属性显示下拉框箭头。</p>
    <div class="placement-wrap">
      <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p" arrow>
        <Button>{{ p }}</Button>
      </Dropdown>
    </div>

    <h2 class="mt30 mb10">菜单隐藏方式</h2>
    <p class="mb10">使用 <code>open</code> 属性（v-model）控制展开状态。</p>
    <Dropdown v-model:open="open" :menus="basicMenus" trigger="click" @open-change="onOpenChange">
      <Button>{{ open ? '展开中' : '点击展开' }}</Button>
    </Dropdown>

    <h2 class="mt30 mb10">多级菜单</h2>
    <p class="mb10">传入的菜单里有多个层级。</p>
    <Dropdown :menus="subMenus">
      <a @click.prevent>
        Cascading menu
        <DownOutlined />
      </a>
    </Dropdown>

    <h2 class="mt30 mb10">加载中</h2>
    <p class="mb10">添加 <code>loading</code> 属性即可让菜单项进入加载状态。</p>
    <Dropdown :menus="loadingMenus" trigger="click">
      <Button>Loading Menu</Button>
    </Dropdown>

    <h2 class="mt30 mb10">菜单分组</h2>
    <p class="mb10">支持把菜单项进行分组，分组子项相对分组标题缩进显示。</p>
    <Dropdown :menus="groupMenus">
      <a @click.prevent>
        Grouped menu
        <DownOutlined />
      </a>
    </Dropdown>

    <h2 class="mt30 mb10">危险项</h2>
    <p class="mb10">设置菜单项的 <code>danger</code> 属性可标记为危险项。</p>
    <Dropdown :menus="dangerMenus" trigger="click">
      <Button>Danger Menu</Button>
    </Dropdown>

    <h2 class="mt30 mb10">自定义浮层内容</h2>
    <p class="mb10">使用 <code>overlay</code> 插槽自定义下拉内容，与 <code>menus</code> 配置二选一。</p>
    <Dropdown trigger="click">
      <Button>Custom Overlay</Button>
      <template #overlay>
        <div class="custom-overlay">
          <SmileOutlined />
          <span>自定义内容</span>
        </div>
      </template>
    </Dropdown>

    <h2 class="mt30 mb10">按钮式下拉菜单</h2>
    <p class="mb10">左侧是按钮，右侧是额外的相关功能菜单。</p>
    <Space>
      <DropdownButton :menus="iconMenus" @click="onButtonClick" @menu-click="onMenuClick"> Dropdown </DropdownButton>
      <DropdownButton :menus="iconMenus" type="primary"> Dropdown </DropdownButton>
      <DropdownButton :menus="iconMenus" disabled> Dropdown </DropdownButton>
    </Space>

    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">菜单不可用。</p>
    <Dropdown :menus="basicMenus" disabled>
      <Button>Disabled Menu</Button>
    </Dropdown>
  </div>
</template>
<style lang="less" scoped>
.placement-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.context-area {
  width: 240px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  color: #777;
  background: #f7f7f7;
  border-radius: 8px;
}
.custom-overlay {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
}
</style>
