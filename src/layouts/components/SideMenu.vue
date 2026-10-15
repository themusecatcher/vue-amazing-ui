<script setup lang="ts">
import { ref, watch, computed, h } from 'vue'
import { useRoute, RouterLink, type RouteRecordRaw } from 'vue-router'
import { routes } from '@/router'
import type { ItemType, MenuKey } from 'vue-amazing-ui'
export type SideMenuSize = 'xl' | 'lg' | 'md' | 'sm' // 侧栏档位（与库内 Col 断点口径一致）
export interface Props {
  theme?: 'light' | 'dark' // 菜单主题
  size?: SideMenuSize // 侧栏档位：同时决定菜单密度与菜单项文案详略
}
const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  size: 'xl'
})
const route = useRoute() // 返回当前路由地址，相当于在模板中使用$route
// 菜单来自编译时生成的静态路由表
const menus: RouteRecordRaw[] = routes[0]?.children ?? []
// 窄档只显示中文名：侧栏变窄后英文名会被省略号截断，只留一截反而降低辨识度
const showEnglishName = computed(() => props.size === 'xl' || props.size === 'lg')
const menuItems = computed<ItemType[]>(() =>
  menus.map((menu) => ({
    // 路由 name 由路由表生成，恒为 string；String() 用于收窄 RouteRecordNameGeneric（可能含 symbol）
    key: String(menu.name),
    label: h(RouterLink, { to: menu.path }, () => {
      const title = menu.meta?.title ?? ''
      return showEnglishName.value ? `${title} ${String(menu.name)}` : title
    }),
    title: menu.meta?.title
  }))
)
const current = ref<MenuKey[]>(route.name ? [String(route.name)] : [])
// 路由变化（含浏览器前进 / 后退）时同步菜单选中项
watch(
  () => route.name,
  (name) => {
    current.value = name ? [String(name)] : []
  }
)
</script>
<template>
  <Scrollbar class="side-menu" :class="`side-menu--${size}`" style="height: 100vh">
    <Menu style="min-height: 100vh" v-model:selectedKeys="current" mode="inline" :theme="theme" :items="menuItems" />
  </Scrollbar>
</template>
<style lang="less" scoped>
/* 菜单密度随侧栏档位收窄：字号、行高、左右内边距与项间距同步减小。
   选择器带 `.menu-wrap` 以提高特异性，稳定覆盖 Menu 组件内部的 `.menu-item` 样式 */
.side-menu {
  &--lg {
    :deep(.menu-wrap .menu-item) {
      height: 38px;
      padding: 0 14px;
      font-size: 13px;
      line-height: 38px;
    }
  }
  &--md {
    :deep(.menu-wrap .menu-item) {
      height: 36px;
      margin: 3px 4px;
      padding: 0 12px;
      font-size: 13px;
      line-height: 36px;
    }
  }
  &--sm {
    :deep(.menu-wrap .menu-item) {
      height: 34px;
      margin: 2px 4px;
      padding: 0 10px;
      font-size: 12px;
      line-height: 34px;
    }
  }
}
</style>
