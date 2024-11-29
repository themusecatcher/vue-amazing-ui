<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { DoubleRightOutlined, RightCircleFilled, StarOutlined, StarFilled } from '@ant-design/icons-vue'
const collapseItems = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const disabledCollapseItems = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    disabled: true,
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const nestCollapseItems = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const extraCollapseItems = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    extra: 'Extra',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    extra: 'Extra',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    extra: 'Extra',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const arrowCollapseItems = ref([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    showArrow: false,
    header: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '3',
    header: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref(['1'])
const nestActiveKey = ref(['1'])
const positionOptions = ref([
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const arrowPlacement = ref('left')
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
watchEffect(() => {
  console.log('nestActiveKey', nestActiveKey.value)
})
const key = ref('1')
watchEffect(() => {
  console.log('key', key.value)
})
function onChange(key: number | string) {
  console.log('change', key)
}
function handleClick(event: Event, key: string | number) {
  event.stopPropagation() // 阻止事件冒泡
  console.log('event', event)
  console.log('key', key)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">activeKey 传入 number[] | string[]，所有面板可同时展开</h3>
    <Collapse :items="collapseItems" v-model:active-key="activeKey" @change="onChange" />
    <h2 class="mt30 mb10">'手风琴'</h2>
    <h3 class="mb10">只允许单个内容区域展开，只需 activeKey 传入 number | string 即可</h3>
    <Collapse :items="collapseItems" v-model:active-key="key" />
    <h2 class="mt30 mb10">禁用</h2>
    <Flex vertical>
      <Collapse disabled :items="collapseItems" v-model:active-key="activeKey" />
      <Collapse :items="disabledCollapseItems" v-model:active-key="activeKey" />
    </Flex>
    <h2 class="mt30 mb10">面板嵌套</h2>
    <Collapse :items="collapseItems" v-model:active-key="activeKey">
      <template #content="{ key }">
        <Collapse v-if="key === '1'" :items="nestCollapseItems" v-model:active-key="nestActiveKey" />
      </template>
    </Collapse>
    <h2 class="mt30 mb10">无边框</h2>
    <Collapse :items="collapseItems" v-model:active-key="activeKey" :bordered="false" />
    <h2 class="mt30 mb10">可复制</h2>
    <Collapse copyable lang="template" :items="collapseItems" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Collapse :items="arrowCollapseItems" v-model:active-key="activeKey" />
    <h2 class="mt30 mb10">箭头位置</h2>
    <Flex vertical>
      <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
      <Collapse :items="collapseItems" v-model:active-key="activeKey" :arrow-placement="arrowPlacement" />
    </Flex>
    <h2 class="mt30 mb10">自定义面板</h2>
    <h3 class="mb10">自定义各个面板的背景色、圆角、边距和箭头图标</h3>
    <Collapse
      :items="collapseItems"
      v-model:active-key="activeKey"
      :bordered="false"
      :collapse-style="{ backgroundColor: '#fff' }"
      :item-style="{
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        marginBottom: '16px',
        border: 0
      }"
    >
      <template #arrow="{ key, active }">
        <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
        <RightCircleFilled v-else :rotate="active ? 90 : 0" />
      </template>
    </Collapse>
    <h2 class="mt30 mb10">自定义面板样式</h2>
    <Collapse
      :items="collapseItems"
      v-model:active-key="activeKey"
      :arrow-style="{ fontSize: '14px', height: '25px' }"
      :header-style="{ fontSize: '16px', color: '#ff6900' }"
      :content-style="{ padding: '16px 24px', color: 'rgba(0, 0, 0, 0.65)' }"
    />
    <h2 class="mt30 mb10">面板额外内容</h2>
    <Collapse :items="extraCollapseItems" v-model:active-key="activeKey">
      <template #extra="{ key }">
        <StarFilled @click="handleClick($event, key)" v-if="key === '1'" />
        <StarOutlined @click="handleClick($event, key)" v-if="key === '3'" />
      </template>
    </Collapse>
    <h2 class="mt30 mb10">幽灵折叠面板</h2>
    <Collapse :items="collapseItems" v-model:active-key="activeKey" ghost />
  </div>
</template>
