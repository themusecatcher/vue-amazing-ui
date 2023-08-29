<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const tabPagesDisabled = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tab: 'Tab 3',
    disabled: true,
    content: 'Content of Tab Pane 3'
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
function onChange (key: string|number) {
  console.log('key:', key)
}
</script>
<template>
  <div>
    <h1>Tabs 标签页</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Tabs
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      @change="onChange" />
    <h2 class="mt30 mb10">禁用某一项</h2>
    <Tabs
      :tab-pages="tabPagesDisabled"
      v-model:active-key="activeKey"
      @change="onChange" />
    <h2 class="mt30 mb10">居中展示</h2>
    <Tabs
      centered
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      @change="onChange" />
    <h2 class="mt30 mb10">左右滑动，容纳更多标签</h2>
    <Tabs
      style="width: 320px;"
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      @change="onChange" />
    <h2 class="mt30 mb10">大号标签页</h2>
    <Tabs
      size="large"
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      @change="onChange" />
    <h2 class="mt30 mb10">自定义内容</h2>
    <Tabs
      :tab-pages="tabPages"
      v-model:active-key="activeKey"
      @change="onChange">
      <template #1>
        <p>key: 1 的 slot 内容</p>
      </template>
      <template #2>
        <p>key: 2 的 slot 内容</p>
      </template>
      <template #3>
        <p>key: 3 的 slot 内容</p>
      </template>
    </Tabs>
    <h2 class="mt30 mb10">Ant Design Vue 标签页</h2>
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3" disabled>Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane key="4" tab="Tab 4" force-render>Content of Tab Pane 4</a-tab-pane>
      <a-tab-pane key="5" tab="Tab 5">Content of Tab Pane 5</a-tab-pane>
      <a-tab-pane key="6" tab="Tab 6">Content of Tab Pane 4</a-tab-pane>
    </a-tabs>
  </div>
</template>
