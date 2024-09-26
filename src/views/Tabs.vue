<script setup lang="ts">
import { ref, h, watchEffect } from 'vue'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'
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
const iconTabPages = ref([
  {
    tab: 'Tab 1',
    icon: h(AppleOutlined),
    content: 'Content of Tab Pane 1'
  },
  {
    tab: 'Tab 2',
    icon: h(AndroidOutlined),
    content: 'Content of Tab Pane 2'
  },
  {
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3'
  },
  {
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4'
  },
  {
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5'
  },
  {
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6'
  }
])
const activeKey = ref('1')
const iconActiveKey = ref(0)
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
watchEffect(() => {
  console.log('iconActiveKey:', iconActiveKey.value)
})
const options = ref([
  {
    label: 'Small',
    value: 'small'
  },
  {
    label: 'Middle',
    value: 'middle'
  },
  {
    label: 'Large',
    value: 'large'
  }
])
const size = ref('middle')
function onChange(key: string | number) {
  console.log('key:', key)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey" @change="onChange" />
    <h2 class="mt30 mb10">卡片式标签页</h2>
    <Tabs type="card" :tab-pages="tabPages" v-model:active-key="activeKey" @change="onChange" />
    <h2 class="mt30 mb10">禁用某一项</h2>
    <Tabs :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" />
    <br />
    <Tabs type="card" :tab-pages="tabPagesDisabled" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">居中展示</h2>
    <Tabs centered :tab-pages="tabPages" v-model:active-key="activeKey" />
    <br />
    <Tabs centered type="card" :tab-pages="tabPages" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">带图标的标签页</h2>
    <Tabs :tab-pages="iconTabPages" v-model:active-key="iconActiveKey" />
    <br />
    <Tabs type="card" :tab-pages="iconTabPages" v-model:active-key="iconActiveKey">
      <template #tab="{ key, tab }">
        <AppleOutlined v-if="key === 0" />
        <AndroidOutlined v-if="key === 1" />
        {{ tab }}
      </template>
    </Tabs>
    <h2 class="mt30 mb10">左右滑动，容纳更多标签</h2>
    <Tabs style="width: 320px" :tab-pages="tabPages" v-model:active-key="activeKey" />
    <br />
    <Tabs style="width: 320px" type="card" :tab-pages="tabPages" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Radio :options="options" v-model:value="size" button />
    <br />
    <Tabs :size="size" :tab-pages="tabPages" v-model:active-key="activeKey" />
    <br />
    <Tabs type="card" :size="size" :tab-pages="tabPages" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">自定义内容</h2>
    <Tabs :tab-pages="tabPages" v-model:active-key="activeKey">
      <template #content="{ key, content }">
        <p v-if="key === '1'">key: 1 的 slot 内容</p>
        <p v-if="key === '2'">key: 2 的 slot 内容</p>
        <p v-if="key === '3'">key: 3 的 slot 内容</p>
      </template>
    </Tabs>
  </div>
</template>
