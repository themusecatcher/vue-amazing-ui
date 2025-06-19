<script setup lang="ts">
import { ref, watchEffect, h } from 'vue'
import {
  ArrowRightOutlined,
  DoubleRightOutlined,
  RightCircleFilled,
  StarOutlined,
  StarFilled
} from '@ant-design/icons-vue'
import type { CollapseProps, CollapseItem, RadioOption } from 'vue-amazing-ui'
const collapseItems = ref<CollapseItem[]>([
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
const disabledCollapseItems = ref<CollapseItem[]>([
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
const nestCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const customStyleItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    key: '2',
    header: 'This is panel header 2',
    headerStyle: {
      fontSize: '16px',
      color: '#1677ff'
    },
    contentStyle: {
      padding: '16px 24px',
      color: '#eb2f96'
    },
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
const customArrowItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
    arrow: h(ArrowRightOutlined),
    arrowStyle: {
      color: '#1677ff'
    },
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
const extraCollapseItems = ref<CollapseItem[]>([
  {
    key: '1',
    header: 'This is panel header 1',
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
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const positionOptions = ref<RadioOption[]>([
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
])
const activeKey = ref<CollapseProps['activeKey']>(['1'])
const accordionActiveKey = ref<CollapseProps['activeKey']>('1')
const borderlessActiveKey = ref<CollapseProps['activeKey']>(['1'])
const disabledActiveKey = ref<CollapseProps['activeKey']>(['1'])
const disabledItemActiveKey = ref<CollapseProps['activeKey']>(['1'])
const ghostActiveKey = ref<CollapseProps['activeKey']>(['1'])
const nestOuterActiveKey = ref<CollapseProps['activeKey']>(['1'])
const nestInnerActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customStyleActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customArrowActiveKey1 = ref<CollapseProps['activeKey']>(['1'])
const customArrowActiveKey2 = ref<CollapseProps['activeKey']>(['1'])
const hideArrowActiveKey = ref<CollapseProps['activeKey']>(['1'])
const arrowPlaceActiveKey = ref<CollapseProps['activeKey']>(['1'])
const arrowPlacement = ref<CollapseProps['arrowPlacement']>('right')
const extraActiveKey = ref<CollapseProps['activeKey']>(['1'])
const copyableActiveKey = ref<CollapseProps['activeKey']>(['1'])
const customCopyActiveKey = ref<CollapseProps['activeKey']>(['1'])
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
watchEffect(() => {
  console.log('accordionActiveKey', accordionActiveKey.value)
})
watchEffect(() => {
  console.log('borderlessActiveKey', borderlessActiveKey.value)
})
watchEffect(() => {
  console.log('disabledItemActiveKey', disabledItemActiveKey.value)
})
watchEffect(() => {
  console.log('ghostActiveKey', ghostActiveKey.value)
})
watchEffect(() => {
  console.log('nestOuterActiveKey', nestOuterActiveKey.value)
})
watchEffect(() => {
  console.log('nestInnerActiveKey', nestInnerActiveKey.value)
})
watchEffect(() => {
  console.log('customActiveKey', customActiveKey.value)
})
watchEffect(() => {
  console.log('customStyleActiveKey', customStyleActiveKey.value)
})
watchEffect(() => {
  console.log('customArrowActiveKey1', customArrowActiveKey1.value)
})
watchEffect(() => {
  console.log('customArrowActiveKey2', customArrowActiveKey2.value)
})
watchEffect(() => {
  console.log('hideArrowActiveKey', hideArrowActiveKey.value)
})
watchEffect(() => {
  console.log('arrowPlaceActiveKey', arrowPlaceActiveKey.value)
})
watchEffect(() => {
  console.log('arrowPlacement', arrowPlacement.value)
})
watchEffect(() => {
  console.log('extraActiveKey', extraActiveKey.value)
})
watchEffect(() => {
  console.log('copyableActiveKey', copyableActiveKey.value)
})
watchEffect(() => {
  console.log('customCopyActiveKey', customCopyActiveKey.value)
})
function onChange(key: number | string) {
  console.log('change', key)
}
function handleClick(key: string | number) {
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
    <Collapse :items="collapseItems" v-model:active-key="accordionActiveKey" />
    <h2 class="mt30 mb10">无边框</h2>
    <Collapse :items="collapseItems" v-model:active-key="borderlessActiveKey" :bordered="false" />
    <h2 class="mt30 mb10">禁用</h2>
    <Flex vertical>
      <Collapse disabled :items="collapseItems" v-model:active-key="disabledActiveKey" />
      <Collapse :items="disabledCollapseItems" v-model:active-key="disabledItemActiveKey" />
    </Flex>
    <h2 class="mt30 mb10">幽灵折叠面板</h2>
    <Collapse :items="collapseItems" v-model:active-key="ghostActiveKey" ghost />
    <h2 class="mt30 mb10">面板嵌套</h2>
    <Collapse :items="collapseItems" v-model:active-key="nestOuterActiveKey">
      <template #content="{ key }">
        <Collapse v-if="key === '1'" :items="nestCollapseItems" v-model:active-key="nestInnerActiveKey" />
      </template>
    </Collapse>
    <h2 class="mt30 mb10">自定义面板</h2>
    <h3 class="mb10">自定义各个面板的背景色、圆角、边距</h3>
    <Collapse
      style="background-color: #fff"
      :items="collapseItems"
      v-model:active-key="customActiveKey"
      :bordered="false"
      :collapse-style="{
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        marginBottom: '16px',
        border: 0
      }"
    />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Collapse
      :items="customStyleItems"
      v-model:active-key="customStyleActiveKey"
      :header-style="{ fontSize: '16px', color: '#ff6900' }"
      :content-style="{ padding: '16px 24px', color: '#09c8ce' }"
      :arrow-style="{ fontSize: '14px', height: '25px' }"
    />
    <h2 class="mt30 mb10">自定义箭头</h2>
    <Flex vertical>
      <Collapse
        :items="customArrowItems"
        :arrow-style="{ color: '#ff6900' }"
        v-model:active-key="customArrowActiveKey1"
      />
      <Collapse
        :items="customArrowItems"
        :arrow-style="{ color: '#ff6900' }"
        v-model:active-key="customArrowActiveKey2"
      >
        <template #arrow="{ key, active }">
          <DoubleRightOutlined v-if="key === '2'" :rotate="active ? 90 : 0" />
          <RightCircleFilled v-if="key === '3'" :rotate="active ? 90 : 0" />
        </template>
      </Collapse>
    </Flex>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Collapse :items="collapseItems" v-model:active-key="hideArrowActiveKey" :show-arrow="false" />
    <h2 class="mt30 mb10">箭头位置</h2>
    <Flex vertical>
      <Radio :options="positionOptions" v-model:value="arrowPlacement" button button-style="solid" />
      <Collapse :items="collapseItems" v-model:active-key="arrowPlaceActiveKey" :arrow-placement="arrowPlacement" />
    </Flex>
    <h2 class="mt30 mb10">面板额外内容</h2>
    <Collapse :items="extraCollapseItems" v-model:active-key="extraActiveKey">
      <template #extra="{ key }">
        <StarFilled v-if="key === '1'" @click.stop="handleClick(key)" />
        <StarOutlined v-if="key === '3'" @click.stop="handleClick(key)" />
      </template>
    </Collapse>
    <h2 class="mt30 mb10">可复制</h2>
    <Collapse :items="collapseItems" v-model:active-key="copyableActiveKey" lang="template" copyable />
    <h2 class="mt30 mb10">自定义复制按钮</h2>
    <Collapse
      :items="collapseItems"
      v-model:active-key="customCopyActiveKey"
      lang="javascript"
      copyable
      copy-text="复制"
      copied-text="已复制"
      :copy-props="{
        ghost: true
      }"
    >
      <template #lang="{ key }">
        <span v-if="key === '2'">typescript</span>
      </template>
    </Collapse>
  </div>
</template>
