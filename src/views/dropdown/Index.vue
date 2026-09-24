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
// 按钮加载中（弹框内容仅一项 Submit and continue）
const buttonMenus: DropdownMenuOption[] = [{ key: '1', label: 'Submit and continue' }]
// 按钮加载状态
const loading1 = ref<boolean>(false)
const loading2 = ref<boolean>(false)
// 事件处理
// 打印事件**全部字段**：前缀 `Click on item ${key}`
// + 第二个入参的完整菜单项配置（key / label / icon / disabled / danger / loading / href / target / type / children）
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Dropdown :menus="basicMenus">
      <a @click.prevent>
        Hover me
        <DownOutlined />
      </a>
    </Dropdown>
    <h2 class="mt30 mb10">触发方式</h2>
    <p class="mb10">默认是移入触发菜单，可以点击触发。</p>
    <Dropdown :menus="triggerMenus" trigger="click">
      <a @click.prevent>
        Click me
        <DownOutlined />
      </a>
    </Dropdown>
    <br />
    <br />
    <p class="mb10">触发方式可组合成数组，移入展开、点击收起。</p>
    <Dropdown :menus="basicMenus" :trigger="['hover', 'click']">
      <a @click.prevent>
        Hover or Click me
        <DownOutlined />
      </a>
    </Dropdown>
    <h2 class="mt30 mb10">右键菜单</h2>
    <p class="mb10">默认是移入触发菜单，可以点击鼠标右键触发。</p>
    <Dropdown :menus="basicMenus" trigger="contextmenu">
      <div class="context-area">Right Click on here</div>
    </Dropdown>
    <h2 class="mt30 mb10">触发事件</h2>
    <p class="mb10">点击菜单项后会触发事件，用户可以通过相应的菜单项 <code>key</code> 进行不同的操作。</p>
    <Dropdown :menus="basicMenus" @menu-click="onMenuClick">
      <a @click.prevent>
        Hover me, Click menu item
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
    <h2 class="mt30 mb10">箭头</h2>
    <p class="mb10">可以展示一个箭头。</p>
    <div class="placement-wrap">
      <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p" arrow>
        <Button>{{ p }}</Button>
      </Dropdown>
    </div>
    <h2 class="mt30 mb10">箭头指向</h2>
    <p class="mb10">设置 <code>arrow</code> 为 <code>{ pointAtCenter: true }</code> 后，箭头将指向目标元素的中心。</p>
    <div class="placement-wrap">
      <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p" :arrow="{ pointAtCenter: true }">
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
    <h2 class="mt30 mb10">菜单项加载中</h2>
    <p class="mb10">添加菜单项的 <code>loading</code> 属性即可让该菜单项进入加载状态。</p>
    <Dropdown :menus="loadingMenus" trigger="click">
      <Button>Loading Menu</Button>
    </Dropdown>
    <h2 class="mt30 mb10">多级菜单</h2>
    <p class="mb10">传入的菜单里有多个层级。</p>
    <Dropdown :menus="subMenus">
      <a @click.prevent>
        Cascading menu
        <DownOutlined />
      </a>
    </Dropdown>
    <br />
    <br />
    <p class="mb10">菜单层级支持递归渲染，可嵌套任意层级。</p>
    <Dropdown :menus="nestedMenus">
      <a @click.prevent>
        Nested menu
        <DownOutlined />
      </a>
    </Dropdown>
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">菜单不可用。</p>
    <Dropdown :menus="basicMenus" disabled>
      <Button>Disabled Menu</Button>
    </Dropdown>
    <h2 class="mt30 mb10">菜单隐藏方式</h2>
    <p class="mb10">默认是点击关闭菜单，可以关闭此功能。</p>
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
    <h2 class="mt30 mb10">带下拉框的按钮</h2>
    <p class="mb10">左边是按钮，右边是额外的相关功能菜单。可设置 <code>icon</code> 属性来修改右边的图标。</p>
    <div class="demo-dropdown-wrap">
      <DropdownButton :menus="iconMenus" @click="onButtonClick" @menu-click="onMenuClick"> Dropdown </DropdownButton>
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
    <h2 class="mt30 mb10">加载中状态</h2>
    <p class="mb10">添加 <code>loading</code> 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。</p>
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
  </div>
</template>
<style lang="less" scoped>
/* 弹出位置 / 箭头用例：按弹框方向排布（top 系列在上排、bottom 系列在下排，左/中/右对应 *Left / 无后缀 / *Right），
   行间距留出弹框展示空间，便于直观看出各弹出位置 */
.placement-wrap {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  justify-content: space-between;
  row-gap: 140px;
  width: 420px;
  max-width: 100%;
}
.context-area {
  width: 240px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #777;
  background: #f7f7f7;
  border-radius: 8px;
}
.custom-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
}
/* 按钮组间距与换行 */
.demo-dropdown-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
:deep(.btn-tail-icon) {
  margin-left: 8px;
}
</style>
