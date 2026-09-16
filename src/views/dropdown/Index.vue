<script setup lang="ts">
import { ref, h } from 'vue'
import type { Ref } from 'vue'
import { DownOutlined, UserOutlined, SmileOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import type { DropdownMenuOption, DropdownKey } from 'components/dropdown'
import { toggleDark } from 'components/utils'
// 基础菜单数据（配置式）
const basicMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 弹出位置（按弹框方向排布：top 系列在上排、bottom 系列在下排，左/中/右对应 *Left / 无后缀 / *Right）
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'] as const
// 箭头 / 箭头指向示例的位置
const arrowPlacements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'] as const
// 含链接、分割线、禁用项
const itemMenus: DropdownMenuOption[] = [
  { key: '0', label: '1st menu item', href: 'http://www.alipay.com/', target: '_blank' },
  { key: '1', label: '2nd menu item', href: 'http://www.taobao.com/', target: '_blank' },
  { type: 'divider' },
  { key: '3', label: '3rd menu item（disabled）', disabled: true }
]
// 带图标
const iconMenus: DropdownMenuOption[] = [
  { key: '1', label: '1st menu item', icon: h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: h(UserOutlined) },
  { key: '3', label: '3rd menu item', icon: h(UserOutlined) }
]
// 多级菜单
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
// 菜单隐藏方式
const keepOpenMenus: DropdownMenuOption[] = [
  { key: '1', label: 'Clicking me will not close the menu.' },
  { key: '2', label: 'Clicking me will not close the menu also.' },
  { key: '3', label: 'Clicking me will close the menu' }
]
// 加载中（菜单项）
const loadingMenus: DropdownMenuOption[] = [
  { key: '1', label: 'Submit and continue', loading: true },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' }
]
// 按钮加载中（对齐 antd 官网 demo：弹框内容仅一项 Submit and continue）
const buttonMenus: DropdownMenuOption[] = [{ key: '1', label: 'Submit and continue' }]
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
// 展开状态（受控）
const visible = ref<boolean>(false)
// 按钮加载状态
const loading1 = ref<boolean>(false)
const loading2 = ref<boolean>(false)
function onMenuClick(key: DropdownKey | undefined, option: DropdownMenuOption) {
  console.log('menu click', key, option)
}
function onOpenChange(o: boolean) {
  console.log('open change', o)
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
// ===== 以下为 antd 官网用例对照数据 =====
const aPlacements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'] as const
const aArrowPlacements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'] as const
const aVisible = ref<boolean>(false)
const aLoading1 = ref<boolean>(false)
const aLoading2 = ref<boolean>(false)
const onAntMenuClick: MenuProps['onClick'] = ({ key }) => {
  console.log(`Click on item ${key}`)
}
const onAntKeepOpenMenuClick: MenuProps['onClick'] = (e) => {
  if (e.key === '3') {
    aVisible.value = false
  }
}
function onAntButtonClick(e: Event) {
  console.log('click left button', e)
}
function enterAntLoading(target: Ref<boolean>) {
  target.value = true
  setTimeout(() => {
    target.value = false
  }, 6000)
}
function enterAntLoading1() {
  enterAntLoading(aLoading1)
}
function enterAntLoading2() {
  enterAntLoading(aLoading2)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="basicMenus">
          <a @click.prevent>
            Hover me
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Hover me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">1st menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">2nd menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">3rd menu item</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">弹出位置</h2>
    <p class="mb10">支持 6 个弹出位置。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <div class="placement-wrap">
          <Dropdown v-for="p in placements" :key="p" :menus="basicMenus" :placement="p">
            <Button>{{ p }}</Button>
          </Dropdown>
        </div>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <div id="components-dropdown-demo-placement" class="placement-wrap">
          <a-dropdown v-for="p in aPlacements" :key="p" :placement="p">
            <a-button>{{ p }}</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>

    <h2 class="mt30 mb10">箭头</h2>
    <p class="mb10">可以展示一个箭头。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <div class="placement-wrap">
          <Dropdown v-for="p in arrowPlacements" :key="p" :menus="basicMenus" :placement="p" arrow>
            <Button>{{ p }}</Button>
          </Dropdown>
        </div>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <div class="placement-wrap">
          <a-dropdown v-for="p in aArrowPlacements" :key="p" :placement="p" arrow>
            <a-button>{{ p }}</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>

    <h2 class="mt30 mb10">其他元素</h2>
    <p class="mb10">分割线和不可用菜单项。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="itemMenus">
          <a @click.prevent>
            Hover me
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Hover me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" disabled>3rd menu item（disabled）</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">箭头指向</h2>
    <p class="mb10">设置 <code>arrow</code> 为 <code>{ pointAtCenter: true }</code> 后，箭头将指向目标元素的中心。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <div class="placement-wrap">
          <Dropdown
            v-for="p in arrowPlacements"
            :key="p"
            :menus="basicMenus"
            :placement="p"
            :arrow="{ pointAtCenter: true }"
          >
            <Button>{{ p }}</Button>
          </Dropdown>
        </div>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-space style="display: flex; flex-wrap: wrap">
          <template v-for="p in aArrowPlacements" :key="p">
            <a-dropdown :placement="p" :arrow="{ pointAtCenter: true }">
              <a-button>{{ p }}</a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-space>
      </div>
    </div>

    <h2 class="mt30 mb10">触发方式</h2>
    <p class="mb10">默认是移入触发菜单，可以点击触发。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="basicMenus" trigger="click">
          <a @click.prevent>
            Click me
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            Click me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">触发事件</h2>
    <p class="mb10">点击菜单项后会触发事件，用户可以通过相应的菜单项 <code>key</code> 进行不同的操作。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="basicMenus" @menu-click="onMenuClick" @open-change="onOpenChange">
          <a @click.prevent>
            Hover me, Click menu item
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Hover me, Click menu item
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="onAntMenuClick">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">带下拉框的按钮</h2>
    <p class="mb10">左边是按钮，右边是额外的相关功能菜单。可设置 <code>icon</code> 属性来修改右边的图标。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <div class="demo-dropdown-wrap">
          <DropdownButton :menus="iconMenus" @click="onButtonClick" @menu-click="onMenuClick">
            Dropdown
          </DropdownButton>
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
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <div class="demo-dropdown-wrap">
          <a-dropdown-button @click="onAntButtonClick">
            Dropdown
            <template #overlay>
              <a-menu @click="onAntMenuClick">
                <a-menu-item key="1">
                  <UserOutlined />
                  1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <UserOutlined />
                  2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <UserOutlined />
                  3rd item
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
          <a-dropdown-button>
            Dropdown
            <template #overlay>
              <a-menu @click="onAntMenuClick">
                <a-menu-item key="1">
                  <UserOutlined />
                  1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <UserOutlined />
                  2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <UserOutlined />
                  3rd item
                </a-menu-item>
              </a-menu>
            </template>
            <template #icon><UserOutlined /></template>
          </a-dropdown-button>
          <a-dropdown-button disabled @click="onAntButtonClick">
            Dropdown
            <template #overlay>
              <a-menu @click="onAntMenuClick">
                <a-menu-item key="1">
                  <UserOutlined />
                  1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <UserOutlined />
                  2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <UserOutlined />
                  3rd item
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
          <a-dropdown>
            <template #overlay>
              <a-menu @click="onAntMenuClick">
                <a-menu-item key="1">
                  <UserOutlined />
                  1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <UserOutlined />
                  2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <UserOutlined />
                  3rd item
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Button
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </div>
    </div>

    <h2 class="mt30 mb10">多级菜单</h2>
    <p class="mb10">传入的菜单里有多个层级。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="subMenus">
          <a @click.prevent>
            Cascading menu
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Cascading menu
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>1st menu item</a-menu-item>
              <a-menu-item>2nd menu item</a-menu-item>
              <a-sub-menu key="sub1" title="sub menu">
                <a-menu-item>3rd menu item</a-menu-item>
                <a-menu-item>4th menu item</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub2" title="disabled sub menu" disabled>
                <a-menu-item>5d menu item</a-menu-item>
                <a-menu-item>6th menu item</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">菜单隐藏方式</h2>
    <p class="mb10">默认是点击关闭菜单，可以关闭此功能。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
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
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown v-model:open="aVisible">
          <a class="ant-dropdown-link" @click.prevent>
            Hover me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="onAntKeepOpenMenuClick">
              <a-menu-item key="1">Clicking me will not close the menu.</a-menu-item>
              <a-menu-item key="2">Clicking me will not close the menu also.</a-menu-item>
              <a-menu-item key="3">Clicking me will close the menu</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">右键菜单</h2>
    <p class="mb10">默认是移入触发菜单，可以点击鼠标右键触发。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="basicMenus" trigger="contextMenu">
          <div class="context-area">Right Click on here</div>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown :trigger="['contextmenu']">
          <div
            :style="{
              textAlign: 'center',
              background: '#f7f7f7',
              height: '200px',
              lineHeight: '200px',
              color: '#777'
            }"
          >
            Right Click on here
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">加载中状态</h2>
    <p class="mb10">添加 <code>loading</code> 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
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
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-space direction="vertical">
          <a-dropdown-button type="primary" loading>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">Submit and continue</a-menu-item>
              </a-menu>
            </template>
            Submit
          </a-dropdown-button>
          <a-dropdown-button type="primary" size="small" loading>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">Submit and continue</a-menu-item>
              </a-menu>
            </template>
            Submit
          </a-dropdown-button>
          <a-dropdown-button type="primary" :loading="aLoading1" @click="enterAntLoading1">
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">Submit and continue</a-menu-item>
              </a-menu>
            </template>
            Submit
          </a-dropdown-button>
          <a-dropdown-button :loading="aLoading2" @click="enterAntLoading2">
            Submit
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">Submit and continue</a-menu-item>
              </a-menu>
            </template>
            <template #icon><DownOutlined /></template>
          </a-dropdown-button>
        </a-space>
      </div>
    </div>

    <h2 class="mt30 mb10">菜单分组</h2>
    <p class="mb10">支持把菜单项进行分组，分组子项相对分组标题缩进显示。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="groupMenus">
          <a @click.prevent>
            Grouped menu
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Grouped menu
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="onAntMenuClick">
              <a-menu-item-group title="Group 1">
                <a-menu-item key="1-1">Option 1-1</a-menu-item>
                <a-menu-item key="1-2">Option 1-2</a-menu-item>
              </a-menu-item-group>
              <a-menu-item-group title="Group 2">
                <a-menu-item key="2-1">Option 2-1</a-menu-item>
                <a-menu-item key="2-2">Option 2-2</a-menu-item>
              </a-menu-item-group>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">危险项</h2>
    <p class="mb10">设置菜单项的 <code>danger</code> 属性可标记为危险项。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="dangerMenus" trigger="click">
          <Button>Danger Menu</Button>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown :trigger="['click']">
          <a-button>Danger Menu</a-button>
          <template #overlay>
            <a-menu @click="onAntMenuClick">
              <a-menu-item key="1">Edit</a-menu-item>
              <a-menu-item key="2">Duplicate</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" danger>Delete</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">自定义浮层内容</h2>
    <p class="mb10">使用 <code>overlay</code> 插槽自定义下拉内容，与 <code>menus</code> 配置二选一。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
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
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown :trigger="['click']">
          <a-button>Custom Overlay</a-button>
          <template #overlay>
            <div class="custom-overlay">
              <SmileOutlined />
              <span>自定义内容</span>
            </div>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">菜单项加载中</h2>
    <p class="mb10">添加菜单项的 <code>loading</code> 属性即可让该菜单项进入加载状态。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="loadingMenus" trigger="click">
          <Button>Loading Menu</Button>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown :trigger="['click']">
          <a-button>Loading Menu</a-button>
          <template #overlay>
            <a-menu @click="onAntMenuClick">
              <a-menu-item key="1">
                <LoadingOutlined />
                Submit and continue
              </a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">菜单不可用。</p>
    <div class="cmp-row">
      <div class="cmp-col">
        <span class="cmp-tag">vue-amazing-ui</span>
        <Dropdown :menus="basicMenus" disabled>
          <Button>Disabled Menu</Button>
        </Dropdown>
      </div>
      <div class="cmp-col">
        <span class="cmp-tag">ant-design-vue</span>
        <a-dropdown disabled>
          <a-button>Disabled Menu</a-button>
          <template #overlay>
            <a-menu @click="onAntMenuClick">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <h2 class="mt30 mb10">主题切换</h2>
    <Button type="primary" @click="toggleDark">切换 light/dark 主题</Button>
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
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
}
.cmp-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 32px;
}
.cmp-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cmp-tag {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
/* 按钮组间距与换行（与 antd 官网 demo 的 .demo-dropdown-wrap 保持一致） */
.demo-dropdown-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
