<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRightOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
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
          <ArrowRightOutlined />
        </template>
      </Breadcrumb>
      <Breadcrumb :routes="routes">
        <template #separator>
          <DoubleRightOutlined />
        </template>
      </Breadcrumb>
    </Flex>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Flex vertical>
      <Breadcrumb :routes="longNameRoutes" breadcrumb-class="custom-breadcrumb-class" :max-width="210" />
      <Breadcrumb
        :routes="longNameRoutes"
        :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
        :separator-style="{ fontSize: '18px' }"
        :max-width="210"
      />
      <Breadcrumb
        :routes="longNameRoutes"
        :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
        :separator-style="{ fontSize: '18px' }"
        :max-width="210"
      >
        <template #separator>
          <ArrowRightOutlined />
        </template>
      </Breadcrumb>
      <Breadcrumb
        :routes="longNameRoutes"
        :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
        :separator-style="{ fontSize: '18px' }"
        :max-width="210"
      >
        <template #separator="{ index }">
          <ArrowRightOutlined v-if="index === 0" />
          <DoubleRightOutlined v-if="index === 1" />
        </template>
      </Breadcrumb>
    </Flex>
    <h2 class="mt30 mb10">新页面打开目标链接</h2>
    <Breadcrumb :routes="routes" target="_blank" />
  </div>
</template>
<style lang="less" scoped>
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
      color: rgba(22, 119, 255, 0.72);
    }
  }
}
</style>
