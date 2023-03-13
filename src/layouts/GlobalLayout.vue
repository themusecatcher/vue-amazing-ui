<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute() // 返回当前路由地址，相当于在模板中使用$route
// const router = useRouter() // 返回router实例，相当于在模板中使用$router

const current = computed(() => {
  return [route.name]
})
const theme = ref('light')

function changeTheme (checked: boolean) {
  theme.value = checked ? 'dark' : 'light'
}
console.log(route.name)
function onClick (e: any):void {
  console.log('e:', e)
  console.log('key:', e.key)
  // console.log('keyPath:', keyPath)
}
</script>
<template>
  <div class="globalLayout">
    <div style="width: 256px;">
      <a-switch
        class="u-switch"
        :checked="theme === 'dark'"
        checked-children="Dark"
        un-checked-children="Light"
        @change="changeTheme"
      />
      <a-menu
        v-model:selectedKeys="current"
        mode="inline"
        :theme="theme"
        @click="onClick">
        <a-menu-item key="Home">
          <router-link to="/home">首页</router-link>
        </a-menu-item>
        <a-menu-item key="Button">
          <router-link to="/button">按钮（Button）</router-link>
        </a-menu-item>
        <a-menu-item key="Breadcrumb">
          <router-link to="/breadcrumb">面包屑（Breadcrumb）</router-link>
        </a-menu-item>
        <a-menu-item key="Countdown">
          <router-link to="/countdown">倒计时（Countdown）</router-link>
        </a-menu-item>
        <a-menu-item key="Pagination">
          <router-link to="/pagination">分页器（Pagination）</router-link>
        </a-menu-item>
        <a-menu-item key="Tooltip">
          <router-link to="/tooltip">文字提示（Tooltip）</router-link>
        </a-menu-item>
        <a-menu-item key="Video">
          <router-link to="/video">播放器（Video）</router-link>
        </a-menu-item>
        <!-- <a-menu-item key="Common">
          <router-link to="/common">常用</router-link>
        </a-menu-item> -->
        <!-- <a-menu-item key="Spin">
          <router-link to="/spin">加载中</router-link>
        </a-menu-item> -->
        <!-- <a-menu-item key="Table">
          <router-link to="/table">分页列表</router-link>
        </a-menu-item>
        <a-menu-item key="Modal">
          <router-link to="/modal">对话框</router-link>
        </a-menu-item>
        <a-menu-item key="Tip">
          <router-link to="/tip">提示框</router-link>
        </a-menu-item>
        <a-menu-item key="Lines">
          <router-link to="/lines">Lines</router-link>
        </a-menu-item>
        <a-menu-item key="Swiper">
          <router-link to="/swiper">触摸滑动插件</router-link>
        </a-menu-item>
        <a-menu-item key="Tree">
          <router-link to="/tree">树图</router-link>
        </a-menu-item>
        <a-menu-item key="Drag">
          <router-link to="/drag">拖拽组件</router-link>
        </a-menu-item>
        <a-menu-item key="Selector">
          <router-link to="/selector">下拉组件</router-link>
        </a-menu-item>
        <a-menu-item key="Image">
          <router-link to="/image">图片组件</router-link>
        </a-menu-item>
        <a-menu-item key="Viewer">
          <router-link to="/viewer">预览插件</router-link>
        </a-menu-item>
        <a-menu-item key="Steps">
          <router-link to="/steps">步骤条组件</router-link>
        </a-menu-item>
        <a-menu-item key="Lazyload">
          <router-link to="/lazyload">懒加载</router-link>
        </a-menu-item> -->
        <!-- <a-menu-item key="Video">
          <router-link to="/video">播放组件</router-link>
        </a-menu-item> -->
        <!-- <a-menu-item key="Banner">
          <router-link to="/banner">banner组件</router-link>
        </a-menu-item>
        <a-menu-item key="Pdf">
          <router-link to="/pdf">pdf预览</router-link>
        </a-menu-item>
        <a-menu-item key="Slider">
          <router-link to="/slider">文字滚动</router-link>
        </a-menu-item>
        <a-menu-item key="Ws">
          <router-link to="/ws">WebSocket</router-link>
        </a-menu-item> -->
        <!-- <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper">Navigation Three - Submenu</span>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">
              Option 1
            </a-menu-item>
            <a-menu-item key="setting:2">
              Option 2
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu> -->
      </a-menu>
    </div>
    <div class="router-view">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
  </div>
  </div>
</template>
<style lang="less" scoped>
.globalLayout {
  display: flex;
}
.u-switch {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.router-view {
  margin-left: 60px;
  margin-top: 62px;
  min-width: 1000px;
  :deep(*) {
    box-sizing: content-box;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
