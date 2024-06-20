<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const nestCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const arrowCollapseData = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    showArrow: false,
    header: 'This is panel header 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  },
  {
    key: '3',
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
const nestActiveKey = ref(['1'])
const arrowPlacement = ref('left')
const positionOptions = ref([
  {
    label: 'Left',
    value: 'left'
  },
  {
    label: 'Right',
    value: 'right'
  }
])
watchEffect(() => {
  console.log('activeKey:', activeKey.value)
})
watchEffect(() => {
  console.log('nestActiveKey:', nestActiveKey.value)
})
const key = ref('1')
watchEffect(() => {
  console.log('key:', key.value)
})
function onChange(key: number | string) {
  console.log('change:', key)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">activeKey 传入 number[] | string[]，所有面板可同时展开</h3>
    <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" @change="onChange" />
    <h2 class="mt30 mb10">'手风琴'</h2>
    <h3 class="mb10">只允许单个内容区域展开，只需 activeKey 传入 number | string 即可</h3>
    <Collapse :collapse-data="collapseData" v-model:active-key="key" />
    <h2 class="mt30 mb10">面板嵌套</h2>
    <Collapse :collapse-data="collapseData" v-model:active-key="activeKey">
      <template #text="{ key }">
        <Collapse v-if="key === '1'" :collapse-data="nestCollapseData" v-model:active-key="nestActiveKey" />
      </template>
    </Collapse>
    <h2 class="mt30 mb10">无边框</h2>
    <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" :bordered="false" />
    <h2 class="mt30 mb10">可复制</h2>
    <Collapse copyable lang="template" :collapse-data="collapseData" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">自定义内容</h2>
    <Collapse :collapse-data="collapseData" v-model:active-key="activeKey">
      <template #header="{ header, key }">
        <span v-if="key === '1'" style="color: burlywood">burlywood color {{ header }} (key = {{ key }})</span>
      </template>
      <template #lang>typescript</template>
      <template #text="{ text, key }">
        <span v-if="key === '1'" style="color: burlywood">burlywood color {{ text }} (key = {{ key }})</span>
      </template>
    </Collapse>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Collapse :collapse-data="arrowCollapseData" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">箭头位置</h2>
    <Radio :options="positionOptions" v-model:value="arrowPlacement" button />
    <br />
    <br />
    <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" :arrow-placement="arrowPlacement" />
    <h2 class="mt30 mb10">幽灵折叠面板</h2>
    <Collapse :collapse-data="collapseData" v-model:active-key="activeKey" ghost />
  </div>
</template>
