<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const checked = ref(isDark)

const route = useRoute() // 返回当前路由地址，相当于在模板中使用$route
// const router = useRouter() // 返回router实例，相当于在模板中使用$router

const current = ref([route.name])
function onClick (e: any):void {
  console.log(e.key)
  // console.log(e.keyPath)
}
</script>
<template>
  <a-row style="width: 100%;">
    <a-col :xs="5" :xl="4">
      <Switch
        class="u-switch"
        v-model:checked="checked"
        @change="toggleDark"
        checkedInfo="Dark"
        uncheckedInfo="Light" />
      <a-menu
        class="m-menus"
        v-model:selectedKeys="current"
        mode="inline"
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
        <a-menu-item key="Carousel">
          <router-link to="/carousel">走马灯（Carousel）</router-link>
        </a-menu-item>
        <a-menu-item key="Cascader">
          <router-link to="/cascader">级联选择（Cascader）</router-link>
        </a-menu-item>
        <a-menu-item key="Checkbox">
          <router-link to="/checkbox">多选框（Checkbox）</router-link>
        </a-menu-item>
        <a-menu-item key="Collapse">
          <router-link to="/collapse">折叠面板（Collapse）</router-link>
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
        <a-menu-item key="Divider">
          <router-link to="/divider">分割线（Divider）</router-link>
        </a-menu-item>
        <a-menu-item key="Empty">
          <router-link to="/empty">空状态（Empty）</router-link>
        </a-menu-item>
        <a-menu-item key="Image">
          <router-link to="/image">图片（Image）</router-link>
        </a-menu-item>
        <a-menu-item key="InputNumber">
          <router-link to="/inputnumber">数字输入框（InputNumber）</router-link>
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
        <a-menu-item key="Progress">
          <router-link to="/progress">进度条（Progress）</router-link>
        </a-menu-item>
        <a-menu-item key="QRCode">
          <router-link to="/qrcode">二维码（QRCode）</router-link>
        </a-menu-item>
        <a-menu-item key="Radio">
          <router-link to="/radio">单选框（Radio）</router-link>
        </a-menu-item>
        <a-menu-item key="Rate">
          <router-link to="/rate">评分（Rate）</router-link>
        </a-menu-item>
        <a-menu-item key="Select">
          <router-link to="/select">选择器（Select）</router-link>
        </a-menu-item>
        <a-menu-item key="Slider">
          <router-link to="/slider">滑动输入条（Slider）</router-link>
        </a-menu-item>
        <a-menu-item key="Spin">
          <router-link to="/spin">加载中（Spin）</router-link>
        </a-menu-item>
        <a-menu-item key="Steps">
          <router-link to="/steps">步骤条（Steps）</router-link>
        </a-menu-item>
        <a-menu-item key="Swiper">
          <router-link to="/swiper">触摸滑动插件（Swiper）</router-link>
        </a-menu-item>
        <a-menu-item key="Switch">
          <router-link to="/switch">开关（Switch）</router-link>
        </a-menu-item>
        <a-menu-item key="Table">
          <router-link to="/table">表格（Table）</router-link>
        </a-menu-item>
        <a-menu-item key="Tabs">
          <router-link to="/tabs">标签页（Tabs）</router-link>
        </a-menu-item>
        <a-menu-item key="TextScroll">
          <router-link to="/textscroll">文字滚动（TextScroll）</router-link>
        </a-menu-item>
        <a-menu-item key="Timeline">
          <router-link to="/timeline">时间轴（Timeline）</router-link>
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
        <!--
        <a-menu-item key="Drag">
          <router-link to="/drag">拖拽组件</router-link>
        </a-menu-item>
        <a-menu-item key="Lazyload">
          <router-link to="/lazyload">懒加载</router-link>
        </a-menu-item> -->
        <!--
        <a-menu-item key="Ws">
          <router-link to="/ws">WebSocket</router-link>
        </a-menu-item> -->
      </a-menu>
    </a-col>
    <a-col :xs="19" :xl="20">
      <div :class="['router-view', {'content-box': !current.includes('DatePicker')}]">
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
  margin-top: 14px;
  margin-bottom: 14px;
}
.m-menus {
  overflow: auto;
  height: calc(100vh - 50px);
}
.router-view {
  margin-top: 50px;
  padding: 0 48px 48px;
  overflow: auto;
  height: calc(100vh - 50px);
}
.content-box {
    :deep(*), :deep(:before), :deep(:after) {
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
