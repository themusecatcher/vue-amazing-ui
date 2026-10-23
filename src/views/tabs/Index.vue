<script setup lang="ts">
import { ref, h, watchEffect, computed, reactive } from 'vue'
import type { CSSProperties } from 'vue'
import { AppleOutlined, AndroidOutlined, WindowsOutlined } from '@ant-design/icons-vue'
import type { TabsProps, TabsItem } from 'vue-amazing-ui'
const tabItems = ref<TabsItem[]>([
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
const tabItemsDisabled = ref<TabsItem[]>([
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
const iconTabPages = ref<TabsItem[]>([
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
const moreTabPages = ref<TabsItem[]>([
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
  },
  {
    key: '7',
    tab: 'Tab 7',
    content: 'Content of Tab Pane 7'
  },
  {
    key: '8',
    tab: 'Tab 8',
    content: 'Content of Tab Pane 8'
  }
])
const activeKey = ref<TabsProps['activeKey']>('1')
const iconActiveKey = ref<TabsProps['activeKey']>(0)
const moreActiveKey = ref<TabsProps['activeKey']>('1')
watchEffect(() => {
  console.log('activeKey', activeKey.value)
})
watchEffect(() => {
  console.log('iconActiveKey', iconActiveKey.value)
})
watchEffect(() => {
  console.log('moreActiveKey', moreActiveKey.value)
})
const typeOptions = [
  {
    label: 'line',
    value: 'line'
  },
  {
    label: 'card',
    value: 'card'
  }
]
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<TabsProps['size']>('middle')
const positionOptions = [
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const position = ref<NonNullable<TabsProps['tabPosition']>>('top')
const morePosition = ref<NonNullable<TabsProps['tabPosition']>>('top')
const positionStyle = computed(() => {
  if (['top', 'bottom'].includes(morePosition.value)) {
    return {
      width: '360px'
    }
  } else {
    return {
      height: '200px'
    }
  }
})
const state = reactive<TabsProps>({
  prefix: '',
  suffix: '',
  animated: true,
  centered: false,
  size: 'middle',
  type: 'line',
  tabGutter: 24,
  tabPosition: 'top'
})
function onChange(key: string | number) {
  console.log('key', key)
}
// 自定义样式取主题变量：明暗模式与主题主色都会自动跟随（硬编码浅色在暗色下会整条发白）
const customTabStyle: CSSProperties = {
  background: 'var(--va-primary-bg-color)',
  color: 'var(--va-text-color-2)',
  fontSize: '16px',
  fontWeight: 600
}
// card 的激活页签默认取 --va-bg-container-color（容器底），被自定义底覆盖后要一并改成主色实底，
// 否则暗色下会在自定义底上「挖出」一块深色页签
const customCardTabStyle: CSSProperties = {
  ...customTabStyle,
  '--va-bg-container-color': 'var(--va-primary-color)',
  '--va-cp-tabs-primary-text-color': 'var(--va-text-color-solid)'
}
const customContentStyle: CSSProperties = {
  fontSize: '16px'
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Tabs :items="tabItems" v-model:active-key="activeKey" @change="onChange" />
    <h2 class="mt30 mb10">卡片式标签页</h2>
    <Tabs :items="tabItems" v-model:active-key="activeKey" type="card" @change="onChange" />
    <h2 class="mt30 mb10">禁用某一项</h2>
    <Flex vertical>
      <Tabs :items="tabItemsDisabled" v-model:active-key="activeKey" />
      <Tabs :items="tabItemsDisabled" v-model:active-key="activeKey" type="card" />
    </Flex>
    <h2 class="mt30 mb10">居中展示</h2>
    <Flex vertical>
      <Tabs :items="tabItems" v-model:active-key="activeKey" centered />
      <Tabs :items="tabItems" v-model:active-key="activeKey" centered type="card" />
    </Flex>
    <h2 class="mt30 mb10">带图标的标签页</h2>
    <Flex vertical>
      <Tabs :items="iconTabPages" v-model:active-key="iconActiveKey" />
      <Tabs :items="iconTabPages" v-model:active-key="iconActiveKey" type="card">
        <template #tab="{ key, tab }">
          <AppleOutlined v-if="key === 0" />
          <AndroidOutlined v-if="key === 1" />
          {{ tab }}
          <WindowsOutlined v-if="key === 2" />
        </template>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">前缀 & 后缀</h2>
    <Flex vertical>
      <Tabs :items="tabItems" v-model:active-key="activeKey" prefix="prefix" suffix="suffix" />
      <Tabs :items="tabItems" v-model:active-key="activeKey" type="card">
        <template #prefix>
          <Button type="primary">prefix</Button>
        </template>
        <template #suffix>
          <Button type="primary">suffix</Button>
        </template>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Flex vertical>
      <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Tabs :items="tabItems" v-model:active-key="activeKey" :size="size" />
      <Tabs :items="tabItems" v-model:active-key="activeKey" :size="size" type="card" />
    </Flex>
    <h2 class="mt30 mb10">自定义位置</h2>
    <Flex vertical>
      <RadioGroup :options="positionOptions" v-model:value="position" button button-style="solid" />
      <Tabs :items="tabItems" v-model:active-key="activeKey" :tab-position="position" />
      <Tabs :items="tabItems" v-model:active-key="activeKey" :tab-position="position" type="card" />
    </Flex>
    <h2 class="mt30 mb10">左右滑动，容纳更多标签</h2>
    <Flex vertical>
      <RadioGroup :options="positionOptions" v-model:value="morePosition" button button-style="solid" />
      <Tabs
        :style="positionStyle"
        :items="moreTabPages"
        v-model:active-key="moreActiveKey"
        :tab-position="morePosition"
      />
      <Tabs
        :style="positionStyle"
        :items="moreTabPages"
        v-model:active-key="moreActiveKey"
        :tab-position="morePosition"
        type="card"
      />
    </Flex>
    <h2 class="mt30 mb10">自定义 Tab & Content 样式</h2>
    <Flex vertical>
      <Tabs
        :items="tabItems"
        v-model:active-key="activeKey"
        :tab-gutter="24"
        :tab-style="customTabStyle"
        :content-style="customContentStyle"
      />
      <Tabs
        :items="tabItems"
        v-model:active-key="activeKey"
        type="card"
        size="large"
        :tab-gutter="12"
        :tab-style="customCardTabStyle"
        :content-style="customContentStyle"
      />
    </Flex>
    <h2 class="mt30 mb10">自定义内容</h2>
    <Tabs :items="tabItems" v-model:active-key="activeKey">
      <template #content="{ key, content }">
        <p v-if="key === '1'">key: 1 的 slot 内容</p>
        <p v-if="key === '2'">key: 2 的 slot 内容</p>
        <p v-if="key === '3'">key: 3 的 slot 内容</p>
      </template>
    </Tabs>
    <h2 class="mt30 mb10">标签页配置器</h2>
    <Flex gap="large" vertical>
      <Row :gutter="[24, 12]">
        <Col :span="6">
          <Space gap="small" vertical> prefix：<Input v-model:value="state.prefix" placeholder="prefix" /> </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> suffix：<Input v-model:value="state.suffix" placeholder="suffix" /> </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> animated：<Switch v-model:value="state.animated" /> </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> centered：<Switch v-model:value="state.centered" /> </Space>
        </Col>
        <Col :span="12">
          <Space gap="small" vertical>
            size：<RadioGroup :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
          </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical>
            type：<RadioGroup :options="typeOptions" v-model:value="state.type" button button-style="solid" />
          </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            tabGutter：<Slider v-model:value="state.tabGutter" :min="0" :step="1" :max="100" />
          </Flex>
        </Col>
        <Col :span="12">
          <Space gap="small" vertical>
            tabPosition：<RadioGroup
              :options="positionOptions"
              v-model:value="state.tabPosition"
              button
              button-style="solid"
            />
          </Space>
        </Col>
      </Row>
      <Tabs :items="tabItems" v-model:active-key="activeKey" v-bind="state" />
    </Flex>
  </div>
</template>
