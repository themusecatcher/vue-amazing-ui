<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '../router'

const theme = ref('dark')

const route = useRoute() // 返回当前路由地址，相当于在模板中使用$route
// const router = useRouter() // 返回router实例，相当于在模板中使用$router

const menus = ref(routes[0].children)
const current = ref([route.name])
function onClick (e: any):void {
  console.log(`${e.item.title} ${e.key}`)
  // console.log(e.keyPath)
}
function changeTheme (checked: boolean) {
  theme.value = checked ? 'dark' : 'light'
}
</script>
<template>
  <a-row style="width: 100%;">
    <a-col :xs="5" :xl="4">
      <a-switch
        class="u-switch"
        :checked="theme === 'dark'"
        checked-children="Dark"
        un-checked-children="Light"
        @change="changeTheme" />
      <a-menu
        class="m-menus"
        v-model:selectedKeys="current"
        mode="inline"
        :theme="theme"
        @click="onClick">
        <a-menu-item v-for="menu in menus" :key="menu.name" :title="menu.meta.title">
          <router-link :to="menu.path">{{ menu.meta.title }} {{ menu.name }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col :xs="19" :xl="20">
      <div class="router-view">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </a-col>
  </a-row>
</template>
<style lang="less" scoped>
.u-switch {
  position: absolute;
  top: 13px;
  right: 13px;
  z-index: 9;
}
:deep(.ant-switch-checked) {
  background: #52c41a;
  &:hover {
    background: #73d13d !important;
  }
}
.m-menus {
  overflow-y: auto;
  height: 100vh;
}
.router-view {
  padding: 36px;
  overflow-y: auto;
  height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
