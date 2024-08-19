<script setup lang="ts">
import { ref } from 'vue'
const routes = ref([
  {
    name: '一级路由',
    path: '/first'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '三级路由'
  }
])
const longNameRoutes = ref([
  {
    name: '一级路由'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '我是一个名字超长的三级路由'
  }
])
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Breadcrumb :routes="routes" />
    <h2 class="mt30 mb10">自定义分隔符</h2>
    <Flex vertical>
      <Breadcrumb :routes="routes" separator="/" />
      <Breadcrumb :routes="routes">
        <template #separator>
          <svg
            class="svg-icon"
            focusable="false"
            data-icon="arrow-right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"
            ></path>
          </svg>
        </template>
      </Breadcrumb>
      <Breadcrumb :routes="routes">
        <template #separator>
          <svg
            class="svg-icon"
            focusable="false"
            data-icon="double-right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
            ></path>
          </svg>
        </template>
      </Breadcrumb>
    </Flex>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Flex vertical>
      <Breadcrumb
        :routes="longNameRoutes"
        breadcrumb-class="custom-breadcrumb-class"
        :max-width="210" />
      <Breadcrumb
        :routes="longNameRoutes"
        :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
        :separator-style="{ fontSize: '18px' }"
        :max-width="210" />
      <Breadcrumb
        :routes="longNameRoutes"
        :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
        :separator-style="{ fontSize: '18px' }"
        :max-width="210">
        <template #separator>
          <svg
            class="svg-icon"
            focusable="false"
            data-icon="arrow-right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"
            ></path>
          </svg>
        </template>
      </Breadcrumb>
      <Breadcrumb
        :routes="longNameRoutes"
        :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
        :separator-style="{ fontSize: '18px' }"
        :max-width="210">
        <template #separator="{ index }">
          <svg
            v-if="index === 0"
            class="svg-icon"
            focusable="false"
            data-icon="arrow-right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"
            ></path>
          </svg>
          <svg
            v-if="index === 1"
            class="svg-icon"
            focusable="false"
            data-icon="double-right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
            ></path>
          </svg>
        </template>
      </Breadcrumb>
    </Flex>
    <h2 class="mt30 mb10">新页面打开目标链接</h2>
    <Breadcrumb :routes="routes" target="_blank" />
  </div>
</template>
<style lang="less" scoped>
.svg-icon {
  fill: rgba(0, 0, 0, 0.45);
}
.custom-breadcrumb-class {
  font-size: 20px;
  color: #1677ff;
  height: 40px;
  :deep(.m-breadcrumb-item) {
    .breadcrumb-link {
      color: rgba(22, 119, 255, 0.72);
      padding: 0 8px;
      border-radius: 8px;
    }
    .link-hover {
      &:hover {
        color: #fff;
        background: #4096ff;
      }
    }
    .link-active {
      color: #1677ff;
    }
    .breadcrumb-separator {
      .icon-arrow {
        fill: rgba(22, 119, 255, 0.72);
      }
    }
  }
}
</style>
