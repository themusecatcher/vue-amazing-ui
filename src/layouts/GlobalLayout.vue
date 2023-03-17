<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute() // 返回当前路由地址，相当于在模板中使用$route
// const router = useRouter() // 返回router实例，相当于在模板中使用$router

const current = ref([route.name])
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
  <a-row style="width: 100%;" :gutter="{ xs: 48, xl: 64}">
    <a-col :xs="6" :xl="5">
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
        <a-menu-item key="Breadcrumb">
          <router-link to="/breadcrumb">面包屑（Breadcrumb）</router-link>
        </a-menu-item>
        <a-menu-item key="Button">
          <router-link to="/button">按钮（Button）</router-link>
        </a-menu-item>
        <a-menu-item key="Countdown">
          <router-link to="/countdown">倒计时（Countdown）</router-link>
        </a-menu-item>
        <a-menu-item key="DatePicker">
          <router-link to="/datepicker">日期选择器（DatePicker）</router-link>
        </a-menu-item>
        <a-menu-item key="Dialog">
          <router-link to="/dialog">对话框（Dialog）</router-link>
        </a-menu-item>
        <a-menu-item key="Message">
          <router-link to="/message">全局提示（Message）</router-link>
        </a-menu-item>
        <a-menu-item key="Modal">
          <router-link to="/modal">信息提示（Modal）</router-link>
        </a-menu-item>
        <a-menu-item key="Notification">
          <router-link to="/notification">通知提醒框（Notification）</router-link>
        </a-menu-item>
        <a-menu-item key="Pagination">
          <router-link to="/pagination">分页器（Pagination）</router-link>
        </a-menu-item>
        <a-menu-item key="Radio">
          <router-link to="/radio">单选框（Radio）</router-link>
        </a-menu-item>
        <a-menu-item key="Select">
          <router-link to="/select">选择器（Select）</router-link>
        </a-menu-item>
        <a-menu-item key="Spin">
          <router-link to="/spin">加载中（Spin）</router-link>
        </a-menu-item>
        <a-menu-item key="Swiper">
          <router-link to="/swiper">触摸滑动插件（Swiper）</router-link>
        </a-menu-item>
        <a-menu-item key="Switch">
          <router-link to="/switch">开关（Switch）</router-link>
        </a-menu-item>
        <a-menu-item key="Tooltip">
          <router-link to="/tooltip">文字提示（Tooltip）</router-link>
        </a-menu-item>
        <a-menu-item key="Video">
          <router-link to="/video">播放器（Video）</router-link>
        </a-menu-item>
        <a-menu-item key="Waterfall">
          <router-link to="/waterfall">瀑布流（Waterfall）</router-link>
        </a-menu-item>
        <!-- <a-menu-item key="Common">
          <router-link to="/common">常用</router-link>
        </a-menu-item> -->
        <!-- <a-menu-item key="Table">
          <router-link to="/table">分页列表</router-link>
        </a-menu-item>
        <a-menu-item key="Lines">
          <router-link to="/lines">Lines</router-link>
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
        <a-menu-item key="Viewer">
          <router-link to="/viewer">预览插件</router-link>
        </a-menu-item>
        <a-menu-item key="Steps">
          <router-link to="/steps">步骤条组件</router-link>
        </a-menu-item>
        <a-menu-item key="Lazyload">
          <router-link to="/lazyload">懒加载</router-link>
        </a-menu-item> -->
        <!--
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
    </a-col>
    <a-col :xs="18" :xl="19" :class="['router-view', {'content-box': !current.includes('DatePicker') }]">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </a-col>
  </a-row>
</template>
<style lang="less" scoped>
.u-switch {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.router-view {
  margin-top: 62px;
}
.content-box {
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
