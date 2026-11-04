<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { CSSProperties } from 'vue'
import {
  AppleOutlined,
  AndroidOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  WindowsOutlined
} from '@ant-design/icons-vue'
import type { TabsProps } from 'vue-amazing-ui'
const tabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 5' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 6' }
]
const tabListDisabled = tabList.map((item) => ({ ...item, disabled: item.key === '3' }))
const moreTabList = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 4' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 5' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 6' },
  { key: '7', tab: 'Tab 7', content: 'Content of Tab Pane 7' },
  { key: '8', tab: 'Tab 8', content: 'Content of Tab Pane 8' }
]
// 各分节独立绑定，操作任一用例不会联动其余用例
const basicActiveKey = ref<TabsProps['activeKey']>('1')
const disabledActiveKey = ref<TabsProps['activeKey']>('1')
const centeredActiveKey = ref<TabsProps['activeKey']>('1')
const prefixActiveKey = ref<TabsProps['activeKey']>('1')
const sizeActiveKey = ref<TabsProps['activeKey']>('1')
const positionActiveKey = ref<TabsProps['activeKey']>('1')
const cardActiveKey = ref<TabsProps['activeKey']>('1')
const cardContainerActiveKey = ref<TabsProps['activeKey']>('1')
const customStyleActiveKey = ref<TabsProps['activeKey']>('1')
const justifyActiveKey = ref<TabsProps['activeKey']>('1')
const classActiveKey = ref<TabsProps['activeKey']>('1')
const configActiveKey = ref<TabsProps['activeKey']>('1')
const iconActiveKey = ref<TabsProps['activeKey']>('1')
const moreActiveKey = ref<TabsProps['activeKey']>('1')
const contentActiveKey = ref<TabsProps['activeKey']>('1')
const barActiveKey = ref<TabsProps['activeKey']>('1')
const animActiveKey = ref<TabsProps['activeKey']>('1')
const animEnabled = ref(true)
const destroyActiveKey = ref<TabsProps['activeKey']>('1')
const destroyEnabled = ref(true)
const editActiveKey = ref<TabsProps['activeKey']>('1')
const editPanes = ref([
  { key: '1', tab: 'Tab 1', content: 'Content of Tab 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab 3', closable: false }
])
let newPaneIndex = 0
function addPane(): void {
  newPaneIndex += 1
  const key = `newTab${newPaneIndex}`
  editPanes.value = [
    ...editPanes.value,
    { key, tab: `New Tab ${newPaneIndex}`, content: `Content of New Tab ${newPaneIndex}`, closable: true }
  ]
  editActiveKey.value = key
}
function closePane(key: string | number): void {
  const index = editPanes.value.findIndex((pane) => pane.key === key)
  if (index === -1) {
    return
  }
  const rest = editPanes.value.filter((pane) => pane.key !== key)
  editPanes.value = rest
  // 关掉的是当前激活项时，优先激活后一个，没有则取前一个
  if (editActiveKey.value === key && rest.length) {
    editActiveKey.value = rest[Math.min(index, rest.length - 1)].key
  }
}
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
  animated: false,
  size: 'middle',
  type: 'line',
  justifyContent: 'start',
  tabGutter: 24,
  tabPosition: 'top',
  destroyInactiveTabPane: false
})
function onChange(key: string | number) {
  console.log('key', key)
}
const eventActiveKey = ref<TabsProps['activeKey']>('1')
const eventLog = ref('')
function onEventChange(key: string | number): void {
  eventLog.value = `change: ${key}`
}
function onEventTabClick(key: string | number): void {
  eventLog.value = `tabClick: ${key}`
}
function onEventTabScroll(info: { direction: 'left' | 'right' | 'top' | 'bottom' }): void {
  eventLog.value = `tabScroll: ${info.direction}`
}
const centerEnabled = ref(true)
const centerActiveKey = ref<TabsProps['activeKey']>('1')
const justifyValue = ref<NonNullable<TabsProps['justifyContent']>>('start')
const justifyOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'space-between', value: 'space-between' },
  { label: 'space-around', value: 'space-around' },
  { label: 'space-evenly', value: 'space-evenly' }
]
const guardEnabled = ref(true)
const guardActiveKey = ref<TabsProps['activeKey']>('1')
const guardTip = ref('')
function onBeforeLeave(key: string | number): boolean {
  if (!guardEnabled.value) {
    guardTip.value = `未拦截，已切换到 Tab ${key}`
    return true
  }
  guardTip.value = `beforeLeave 返回 false，已取消切换到 Tab ${key}`
  return false
}
const renderActiveKey = ref<TabsProps['activeKey']>('1')
const addDisabledDemo = ref(true)
// 对象形态渲染禁用态按钮：无权限时保留入口但不触发新增
const addableDemo = computed<boolean | { disabled?: boolean }>(() => {
  return addDisabledDemo.value ? { disabled: true } : true
})
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
// 容器用法：面板补白底与内边距，视觉上与上方卡片页签连成一块容器。
// 上移量 = 页签栏 16px 下外边距 + 1px 分割线，使面板顶边贴合并盖住分割线，否则两者之间会留一道缝
const cardTopContentStyle: CSSProperties = {
  height: '120px',
  padding: '16px',
  marginTop: '-17px',
  background: 'var(--va-bg-container-color)',
  border: '1px solid var(--va-border-split-color)',
  borderTop: 'none',
  borderRadius: '0 0 8px 8px'
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本用法</h2>
    <Tabs v-model:active-key="basicActiveKey" @change="onChange">
      <TabPane key="1" tab="Tab 1">Content of Tab Pane 1</TabPane>
      <TabPane key="2" tab="Tab 2">Content of Tab Pane 2</TabPane>
      <TabPane key="3" tab="Tab 3">Content of Tab Pane 3</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">禁用</h2>
    <Flex vertical>
      <Tabs v-model:active-key="disabledActiveKey">
        <TabPane v-for="item in tabListDisabled" :key="item.key" :tab="item.tab" :disabled="item.disabled">{{
          item.content
        }}</TabPane>
      </Tabs>
      <Tabs v-model:active-key="disabledActiveKey" type="card">
        <TabPane v-for="item in tabListDisabled" :key="item.key" :tab="item.tab" :disabled="item.disabled">{{
          item.content
        }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">居中</h2>
    <p class="mb10">通过 <code>justifyContent</code> 设为 center 让页签居中，line 与 card 类型均支持</p>
    <Flex vertical>
      <Tabs v-model:active-key="centeredActiveKey" justify-content="center">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
      <Tabs v-model:active-key="centeredActiveKey" justify-content="center" type="card">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">图标</h2>
    <p class="mb10">使用 <code>TabPane</code> 的 <code>tab</code> 插槽自定义页签内容</p>
    <Tabs v-model:active-key="iconActiveKey">
      <TabPane key="1" tab="Tab 1">
        <template #tab><AppleOutlined />Tab 1</template>
        Content of Tab Pane 1
      </TabPane>
      <TabPane key="2" tab="Tab 2">
        <template #tab><AndroidOutlined />Tab 2</template>
        Content of Tab Pane 2
      </TabPane>
      <TabPane key="3" tab="Tab 3">
        <template #tab>Tab 3<WindowsOutlined /></template>
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
    <h2 class="mt30 mb10">滑动</h2>
    <p class="mb10">页签超出可视区域时可滚轮滑动，滚出视口的页签收纳进末尾的更多下拉</p>
    <Flex gap="small" align="center" class="mb10">
      tabPosition：<RadioGroup :options="positionOptions" v-model:value="morePosition" button button-style="solid" />
    </Flex>
    <Flex vertical>
      <Tabs :style="positionStyle" v-model:active-key="moreActiveKey" :tab-position="morePosition">
        <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
      <Tabs :style="positionStyle" v-model:active-key="moreActiveKey" :tab-position="morePosition" type="card">
        <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">附加内容</h2>
    <Flex vertical>
      <Tabs v-model:active-key="prefixActiveKey" prefix="prefix" suffix="suffix">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
      <Tabs v-model:active-key="prefixActiveKey" type="card">
        <template #prefix>
          <Button type="primary">prefix</Button>
        </template>
        <template #suffix>
          <Button type="primary">suffix</Button>
        </template>
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">大小</h2>
    <Flex gap="small" align="center" class="mb10">
      size：<RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
    </Flex>
    <Flex vertical>
      <Tabs v-model:active-key="sizeActiveKey" :size="size">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
      <Tabs v-model:active-key="sizeActiveKey" :size="size" type="card">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">位置</h2>
    <Flex gap="small" align="center" class="mb10">
      tabPosition：<RadioGroup :options="positionOptions" v-model:value="position" button button-style="solid" />
    </Flex>
    <Flex vertical>
      <Tabs v-model:active-key="positionActiveKey" :tab-position="position">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
      <Tabs v-model:active-key="positionActiveKey" :tab-position="position" type="card">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">卡片式页签</h2>
    <Tabs v-model:active-key="cardActiveKey" type="card" @change="onChange">
      <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">新增和关闭页签</h2>
    <p class="mb10"
      ><code>addable</code> 展示新增按钮、<code>closable</code> 展示关闭按钮，增删由 <code>add</code> /
      <code>close</code> 事件驱动，<code>line</code> 与 <code>card</code> 类型均支持</p
    >
    <Flex vertical>
      <Tabs v-model:active-key="editActiveKey" type="card" addable @add="addPane" @close="closePane">
        <TabPane v-for="pane in editPanes" :key="pane.key" :tab="pane.tab" :closable="pane.closable !== false">{{
          pane.content
        }}</TabPane>
      </Tabs>
      <Tabs v-model:active-key="editActiveKey" type="line" addable @add="addPane" @close="closePane">
        <TabPane v-for="pane in editPanes" :key="pane.key" :tab="pane.tab" :closable="pane.closable !== false">{{
          pane.content
        }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">卡片式页签容器</h2>
    <p class="mb10">用于容器顶部时，可通过 <code>contentStyle</code> 覆盖面板底色与内边距</p>
    <Tabs v-model:active-key="cardContainerActiveKey" type="card" :content-style="cardTopContentStyle">
      <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">
        <p>{{ item.content }}</p>
        <p>{{ item.content }}</p>
        <p>{{ item.content }}</p>
      </TabPane>
    </Tabs>
    <h2 class="mt30 mb10">自定义新增页签触发器</h2>
    <p class="mb10">关闭内置新增按钮，改用 <code>suffix</code> 插槽中的自定义触发器</p>
    <Tabs v-model:active-key="editActiveKey" type="card" @close="closePane">
      <template #suffix>
        <Button type="primary" @click="addPane">
          <template #icon><PlusOutlined /></template>
          新增页签
        </Button>
      </template>
      <TabPane v-for="pane in editPanes" :key="pane.key" :tab="pane.tab" :closable="pane.closable !== false">{{
        pane.content
      }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">自定义新增图标</h2>
    <p class="mb10">通过 <code>addIcon</code> 插槽替换新增按钮的内置图标</p>
    <Tabs v-model:active-key="editActiveKey" type="card" addable @add="addPane" @close="closePane">
      <template #addIcon><PlusCircleOutlined /></template>
      <TabPane v-for="pane in editPanes" :key="pane.key" :tab="pane.tab" :closable="pane.closable !== false">{{
        pane.content
      }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">新增按钮禁用</h2>
    <p class="mb10"> <code>addable</code> 传对象可把新增按钮渲染为禁用态，无权限时保留入口而非直接消失 </p>
    <Flex gap="small" align="center" class="mb10"> 禁用新增：<Switch v-model:value="addDisabledDemo" /> </Flex>
    <Tabs v-model:active-key="editActiveKey" type="card" :addable="addableDemo" @add="addPane" @close="closePane">
      <TabPane v-for="pane in editPanes" :key="pane.key" :tab="pane.tab" :closable="pane.closable !== false">{{
        pane.content
      }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">自定义页签头</h2>
    <p class="mb10">通过 <code>tabBar</code> 插槽替换内置导航，示例为卡片式页签头，选中项呈现为主色实心</p>
    <Tabs v-model:active-key="barActiveKey">
      <template #tabBar="{ tabs, activeKey: currentKey, change }">
        <div class="custom-tab-bar">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="custom-tab-bar-item"
            :class="{ 'custom-tab-bar-item-active': currentKey === tab.key }"
            @click="change(tab.key)"
            >{{ tab.tab }}</button
          >
        </div>
      </template>
      <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">自定义 Tab & Content 样式</h2>
    <Flex vertical>
      <Tabs
        v-model:active-key="customStyleActiveKey"
        :tab-gutter="24"
        :tab-style="customTabStyle"
        :content-style="customContentStyle"
      >
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
      <Tabs
        v-model:active-key="customStyleActiveKey"
        type="card"
        size="large"
        :tab-gutter="12"
        :tab-style="customCardTabStyle"
        :content-style="customContentStyle"
      >
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">自定义内容</h2>
    <p class="mb10">使用 <code>TabPane</code> 的默认插槽自定义该页签的内容，可放任意组件</p>
    <Tabs v-model:active-key="contentActiveKey">
      <TabPane key="1" tab="Tab 1">
        <p class="mb10">key: 1 的插槽内容（可放任意组件）</p>
        <Button type="primary" size="small">操作按钮</Button>
      </TabPane>
      <TabPane key="2" tab="Tab 2">
        <p class="mb10">key: 2 的插槽内容（可放任意组件）</p>
        <Button type="primary" size="small">操作按钮</Button>
      </TabPane>
      <TabPane key="3" tab="Tab 3">
        <p class="mb10">key: 3 的插槽内容（可放任意组件）</p>
        <Button type="primary" size="small">操作按钮</Button>
      </TabPane>
    </Tabs>
    <h2 class="mt30 mb10">切换动画</h2>
    <p class="mb10"
      >开启 <code>animated</code> 后面板随页签横向滑动切换，仅在 <code>tabPosition</code> 为 top / bottom 时生效</p
    >
    <Flex gap="small" align="center" class="mb10"> animated：<Switch v-model:value="animEnabled" /> </Flex>
    <Tabs v-model:active-key="animActiveKey" :animated="animEnabled">
      <TabPane v-for="item in tabList.slice(0, 4)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">销毁非活跃面板</h2>
    <p class="mb10"
      >开启 <code>destroyInactiveTabPane</code> 后非激活面板的内容会被卸载，切回时重新创建（关闭后输入内容会保留）</p
    >
    <Flex gap="small" align="center" class="mb10">
      destroyInactiveTabPane：<Switch v-model:value="destroyEnabled" />
    </Flex>
    <Tabs v-model:active-key="destroyActiveKey" :destroy-inactive-tab-pane="destroyEnabled">
      <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">
        <Input placeholder="输入后切换页签，观察内容是否保留" />
      </TabPane>
    </Tabs>
    <h2 class="mt30 mb10">面板渲染时机</h2>
    <p class="mb10">
      <code>TabPane</code> 的 <code>displayDirective</code> 控制非激活面板：<code>if</code> 立即卸载、<code>show</code>
      保留、<code>show:lazy</code> 首次激活后保留
    </p>
    <Flex vertical>
      <Tabs v-model:active-key="renderActiveKey">
        <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab" display-directive="if">
          <p class="mb10">if：切走后内容卸载，输入不保留</p>
          <Input placeholder="输入后切换页签，观察内容" />
        </TabPane>
      </Tabs>
      <Tabs v-model:active-key="renderActiveKey">
        <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab" display-directive="show">
          <p class="mb10">show：内容常驻，输入保留</p>
          <Input placeholder="输入后切换页签，观察内容" />
        </TabPane>
      </Tabs>
      <Tabs v-model:active-key="renderActiveKey">
        <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab" display-directive="show:lazy">
          <p class="mb10">show:lazy：首次激活后才渲染，之后保留</p>
          <Input placeholder="输入后切换页签，观察内容" />
        </TabPane>
      </Tabs>
    </Flex>
    <h2 class="mt30 mb10">事件回调</h2>
    <p class="mb10">
      <code>change</code> / <code>tabClick</code> 在切换时触发，<code>tabScroll</code> 在页签滚动到边界之外时触发
    </p>
    <Tabs
      v-model:active-key="eventActiveKey"
      style="width: 360px"
      @change="onEventChange"
      @tab-click="onEventTabClick"
      @tab-scroll="onEventTabScroll"
    >
      <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <p class="mt10">最近事件：{{ eventLog || '暂无' }}</p>
    <h2 class="mt30 mb10">页签分布</h2>
    <p class="mb10">
      通过 <code>justifyContent</code> 控制页签在导航区的分布，仅在 <code>type</code> 为 line 且页签未溢出时生效
    </p>
    <Flex gap="small" align="center" class="mb10">
      justifyContent：<RadioGroup :options="justifyOptions" v-model:value="justifyValue" button button-style="solid" />
    </Flex>
    <Tabs v-model:active-key="justifyActiveKey" :justify-content="justifyValue">
      <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">切换拦截</h2>
    <p class="mb10">
      通过 <code>beforeLeave</code> 拦截切换：返回 <code>false</code> 或 Promise reject 时取消本次切换
    </p>
    <Flex gap="small" align="center" class="mb10"> 拦截切换：<Switch v-model:value="guardEnabled" /> </Flex>
    <Tabs v-model:active-key="guardActiveKey" :before-leave="onBeforeLeave">
      <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <p class="mt10">最近操作：{{ guardTip || '暂无' }}</p>
    <h2 class="mt30 mb10">自定义类名</h2>
    <p class="mb10"> 通过 <code>tabClass</code> / <code>contentClass</code> 给页签与面板挂类名，便于用外部样式定制 </p>
    <Tabs v-model:active-key="classActiveKey" tab-class="demo-tab" content-class="demo-content">
      <TabPane v-for="item in tabList.slice(0, 3)" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">激活项居中</h2>
    <p class="mb10"> 开启 <code>centerActiveTab</code> 后切换页签会把激活项滚到导航区中间，首尾空间不足时贴边 </p>
    <Flex gap="small" align="center" class="mb10"> 居中：<Switch v-model:value="centerEnabled" /> </Flex>
    <Tabs v-model:active-key="centerActiveKey" style="width: 360px" :center-active-tab="centerEnabled">
      <TabPane v-for="item in moreTabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
    </Tabs>
    <h2 class="mt30 mb10">标签页配置器</h2>
    <p class="mb10">
      组合调整下方配置项可实时预览属性效果，<code>justifyContent</code> 的 <code>center</code> 用于页签居中；<code
        >line</code
      >
      下仅未溢出时生效，<code>card</code> 下仅 <code>center</code> 生效
    </p>
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
          <Space gap="small" vertical>
            type：<RadioGroup :options="typeOptions" v-model:value="state.type" button button-style="solid" />
          </Space>
        </Col>
        <Col :span="12">
          <Space gap="small" vertical>
            size：<RadioGroup :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
          </Space>
        </Col>
        <Col :span="12">
          <Flex gap="small" vertical>
            tabGutter：<Slider v-model:value="state.tabGutter" :min="0" :step="1" :max="100" />
          </Flex>
        </Col>
        <Col :span="24">
          <Space gap="small" vertical>
            justifyContent：<RadioGroup
              :options="justifyOptions"
              v-model:value="state.justifyContent"
              button
              button-style="solid"
            />
          </Space>
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
        <Col :span="12">
          <Space gap="small" vertical>
            destroyInactiveTabPane：<Switch v-model:value="state.destroyInactiveTabPane" />
          </Space>
        </Col>
      </Row>
      <Tabs v-model:active-key="configActiveKey" v-bind="state">
        <TabPane v-for="item in tabList" :key="item.key" :tab="item.tab">{{ item.content }}</TabPane>
      </Tabs>
    </Flex>
  </div>
</template>
<style lang="less" scoped>
// 卡片式页签头：未选中为描边卡片，选中为主色实心，等同实体按钮的观感
.custom-tab-bar {
  display: flex;
  gap: 8px;
  padding-bottom: 12px;
}
.custom-tab-bar-item {
  padding: 8px 20px;
  font-weight: 500;
  color: var(--va-text-color-2);
  background: var(--va-bg-container-color);
  border: 1px solid var(--va-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: var(--va-primary-text-color);
    border-color: var(--va-primary-border-color);
  }
}
.custom-tab-bar-item-active {
  color: var(--va-text-color-solid);
  background: var(--va-primary-color);
  border-color: var(--va-primary-color);
  &:hover {
    color: var(--va-text-color-solid);
    background: var(--va-primary-color-hover);
    border-color: var(--va-primary-color-hover);
  }
}
:deep(.demo-tab) {
  font-weight: 600;
}
:deep(.demo-content) {
  padding: 8px 12px;
  background: var(--va-fill-color-1);
  border-radius: 8px;
}
</style>
