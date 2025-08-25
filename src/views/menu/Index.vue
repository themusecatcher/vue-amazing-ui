<script setup lang="ts">
import { ref, h, reactive, watchEffect } from 'vue'
import type { VueElement } from 'vue'
import type { MenuProps, MenuItemType } from 'components/index'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
const current = ref<string[]>(['mail'])
const items = ref([
  {
    key: 'mail',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One'
  },
  {
    key: 'app',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two'
  },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1'
          },
          {
            label: 'Option 2',
            key: 'setting:2'
          }
        ]
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3'
          },
          {
            label: 'Option 4',
            key: 'setting:4'
          }
        ]
      }
    ]
  },
  {
    key: 'alipay',
    label: h(
      'a',
      { href: 'https://themusecatcher.github.io/vue-amazing-ui/', target: '_blank' },
      'Navigation Four - Link'
    ),
    title: 'Navigation Four - Link'
  }
])

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: MenuItemType[],
  type?: 'group'
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItemType
}

const inlineMenuItems: MenuItemType[] = reactive([
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group')
  ]),

  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')])
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group')
])
console.log('inlineMenuItems', inlineMenuItems)
watchEffect(() => {
  console.log('current', current.value)
})
watchEffect(() => {
  console.log('openKeys', openKeys.value)
})

function handleClick(e: any): void {
  console.log('click', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <!-- <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" /> -->
    <Menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
    <h2 class="mt30 mb10">内嵌菜单</h2>
    <h3 class="mb10">垂直菜单，子菜单内嵌在菜单区域</h3>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :items="inlineMenuItems"
      @click="handleClick"
    ></a-menu>
    <Menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :items="inlineMenuItems"
      @click="handleClick"
    ></Menu>
  </div>
</template>
