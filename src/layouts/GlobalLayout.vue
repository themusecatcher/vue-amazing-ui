<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/router'
import { toggleDark, useMutationObserver } from 'components/utils'
const route = useRoute() // 返回当前路由地址，相当于在模板中使用$route
// const router = useRouter() // 返回router实例，相当于在模板中使用$router
const themeDark = ref<boolean>(false)
const html = document.documentElement
onMounted(() => {
  themeDark.value = html.classList.contains('dark')
  if (!themeDark.value) {
    // 默认开启暗黑模式
    toggleDark()
  }
})
useMutationObserver(
  html,
  () => {
    themeDark.value = html.classList.contains('dark')
  },
  { attributes: true }
)
const menus = ref<any>(routes[0].children)
const current = ref<string[]>([route.name as string])
function onClick(e: any): void {
  console.log(`${e.item.title} ${e.key}`)
  // console.log(e.keyPath)
  console.log(route.name)
}
const routerViewRef = ref()
</script>
<template>
  <Row style="width: 100%">
    <Col :xs="5" :xl="4" style="position: relative">
      <Switch
        class="switch-theme"
        v-model="themeDark"
        ripple-color="#faad14"
        :circle-style="{ background: themeDark ? '#001529' : '#fff' }"
        @change="toggleDark"
      >
        <template #node>
          <svg
            v-if="themeDark"
            class="svg-dark"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
            ></path>
          </svg>
          <svg
            v-else
            class="svg-light"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
            ></path>
            <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
            <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
            <path
              d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
            ></path>
            <path
              d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
            ></path>
            <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
            <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
            <path
              d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
            ></path>
            <path
              d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
            ></path>
          </svg>
        </template>
      </Switch>
      <Scrollbar style="height: 100vh">
        <a-menu
          style="min-height: 100vh"
          v-model:selectedKeys="current"
          mode="inline"
          :theme="themeDark ? 'dark' : 'light'"
          @click="onClick"
        >
          <a-menu-item v-for="menu in menus" :key="menu.name" :title="menu.meta.title">
            <router-link :to="menu.path">{{ menu.meta.title }} {{ menu.name }}</router-link>
          </a-menu-item>
        </a-menu>
      </Scrollbar>
    </Col>
    <Col :xs="19" :xl="20">
      <Scrollbar style="height: 100vh">
        <div class="router-view" ref="routerViewRef">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
          <BackTop v-if="!['BackTop', 'ConfigProvider'].includes(route.name as string)" />
        </div>
      </Scrollbar>
    </Col>
  </Row>
</template>
<style lang="less" scoped>
.switch-theme {
  position: absolute !important;
  top: 13px;
  right: 13px;
  z-index: 3;
  :deep(&.switch-checked) {
    background: #faad14 !important;
    &:hover {
      background: #e8b339 !important;
    }
  }
}
.svg-dark {
  width: 12px;
  height: 12px;
  fill: #fff;
}
.svg-light {
  width: 12px;
  height: 12px;
  fill: rgba(60, 60, 67, 0.75);
}
.router-view {
  padding: 36px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
