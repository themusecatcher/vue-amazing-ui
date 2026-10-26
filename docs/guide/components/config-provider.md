# 全局化配置 ConfigProvider

<GlobalElement />

_为组件提供统一的全局化配置_

> 本页提供可交互示例与 `API` 参考；概念、派生规则、变量清单与排查见[定制主题](/guide/customize-theme.html)。

## 何时使用

- 想统一换掉整套配色（品牌色、成功 / 警告 / 错误色、明暗模式）
- 只想让页面的某一块区域换肤，而不是整页
- 需要给弹窗 / 消息这类「不在组件树里」的浮层单独配主题

<script setup lang="ts">
import { ref, computed, h, onMounted, onBeforeUnmount } from 'vue'
import {
  AppstoreOutlined,
  CalendarOutlined,
  CommentOutlined,
  InboxOutlined,
  MailOutlined,
  MessageOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { ConfigProvider, LoadingBarProvider, createDiscreteApi, useMessage, useModal, useNotification } from 'vue-amazing-ui'
import type {
  CarouselImage,
  ConfigProviderProps,
  ConfigProviderTheme,
  ItemType,
  LoadingBarApi,
  MenuKey,
  MessageApi,
  ModalApi,
  NotificationApi,
  SegmentedOption,
  SelectOption,
  StepsItem,
  TableColumn,
  TabsItem,
  TextScrollItem,
  ThemeMode,
  TimelineItemProps,
  UploadFileType
} from 'vue-amazing-ui'
// 暗色模式演示默认展示暗色，便于直观对比两套默认表
const mode = ref<ThemeMode>('dark')
const modeOptions: SegmentedOption[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Auto', value: 'auto' }
]
const primaryColor = ref<string>('#ff6900')
const commonPrimaryColor = ref<string>('#1677ff')
const scopePrimaryColor = ref<string>('#18a058')
const linkPrimaryColor = ref<string>('#1677ff')
// 语义种子：与 primary 同一套色阶映射
const seedSuccess = ref<string>('#52c41a')
const seedWarning = ref<string>('#faad14')
const seedError = ref<string>('#ff4d4f')
// info 未传时复用 primary 的三件套；显式传入后独立派生（链接色也取 info）
const seedInfo = ref<string>('#1677ff')
const seedTheme = computed<ConfigProviderTheme>(() => ({
  seed: {
    success: seedSuccess.value,
    warning: seedWarning.value,
    error: seedError.value,
    info: seedInfo.value
  }
}))
// 「全组件联动」补充的 6 个主色消费点：Badge / Tag / GradientText / TimePicker / Timeline / Table
const themeTimeValue = ref<number | null>(null)
const themeTimelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2023-05-24' },
  { content: 'Solve initial network problems 2023-05-24', color: 'blue' }
]
const themeTableColumns: TableColumn[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: Record<string, unknown>, b: Record<string, unknown>) =>
      String(a.name ?? '').localeCompare(String(b.name ?? ''))
  },
  { title: 'Age', dataIndex: 'age' }
]
const themeTableData: Record<string, unknown>[] = [
  { key: '1', name: 'Alice', age: 32 },
  { key: '2', name: 'Bob', age: 28 }
]
// 组件级主色：一个主色可同时配置多个组件
const componentPrimary = ref<string>('#18a058')
const componentTheme = computed<ConfigProviderTheme>(() => ({
  components: {
    Button: { primaryColor: componentPrimary.value },
    Slider: { primaryColor: componentPrimary.value },
    Progress: { primaryColor: componentPrimary.value }
  }
}))
// 组件令牌：纯 CSS 变量，不经过 Provider；整组覆盖才不会有「悬停跳回默认色」
const tokenStyle: Record<string, string> = {
  '--va-button-primary-color': '#722ed1',
  '--va-button-primary-color-hover': '#9254de',
  '--va-button-primary-color-active': '#531dab',
  '--va-slider-track-color': '#722ed1',
  '--va-slider-track-color-hover': '#9254de',
  // 滑块光环是独立令牌，只改轨道会让手柄停在默认主色
  '--va-slider-handle-shadow-color': '#722ed1',
  '--va-slider-handle-shadow-color-hover-focus': '#9254de'
}
const theme = computed<ConfigProviderTheme>(() => ({
  seed: {
    primary: commonPrimaryColor.value
  }
}))
const overrideEnabled = ref<boolean>(false)
// 运行期切换用的两个主题预设：仅切换主色种子
const themeWithoutOverride: ConfigProviderTheme = {
  seed: {
    primary: '#1677ff'
  }
}
const themeWithOverride: ConfigProviderTheme = {
  seed: {
    primary: '#18a058'
  }
}
const overrideTheme = computed<ConfigProviderTheme>(() =>
  overrideEnabled.value ? themeWithOverride : themeWithoutOverride
)
const checkboxChecked = ref<boolean>(false)
const cardDate = ref<number>(Date.now())
const dateValue = ref<number>(Date.now())
const inputValue = ref<string>('')
const inputNumberValue = ref<number>(3)
const inputSearchValue = ref<string>('')
const autoCompleteValue = ref<string>('')
const autoCompleteOptions = ref<string[]>([])
function onAutoCompleteSearch(searchText: string) {
  // 模拟远程搜索：根据输入动态生成联想选项
  autoCompleteOptions.value = !searchText
    ? []
    : [searchText, `${searchText}${searchText}`, `${searchText}${searchText}${searchText}`]
}
const cardRef = ref<HTMLDivElement>()
// 局部加载条挂载到 cardRef 容器，通过 <LoadingBarProvider> 的 @ready 取到该作用域内的 api
const localLoadingBar = ref<LoadingBarApi>()
// 浮层类组件推荐 useXxx()：入口 App.vue 已包裹对应 Provider
const message = useMessage()
const modal = useModal()
const notification = useNotification()
const page = ref<number>(1)
const radioChecked = ref<boolean>(false)
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
// 种子换色用例的菜单：深色皮肤的三层表面（根列表 / 浮层面板 / 内联子菜单）都取种子派生的品牌色暗底
const seedMenuOpenKeys = ref<MenuKey[]>(['sub1'])
const seedMenuSelectedKeys = ref<MenuKey[]>(['3'])
const seedMenuItems = ref<ItemType[]>([
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(SettingOutlined),
    label: 'Navigation Four',
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' }
    ]
  },
  { key: '9', icon: () => h(InboxOutlined), label: 'Navigation Five' }
])
const selectOptions = ref<SelectOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '上海市',
    value: 2
  },
  {
    label: '纽约市',
    value: 3
  },
  {
    label: '旧金山',
    value: 4
  },
  {
    label: '布宜诺斯艾利斯',
    value: 5
  },
  {
    label: '伊斯坦布尔',
    value: 6
  },
  {
    label: '拜占庭',
    value: 7
  },
  {
    label: '君士坦丁堡',
    value: 8
  }
])
const selectedValue = ref<number>(5)
const percent = ref<number>(80)
const sliderValue = ref<number>(50)
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref<number>(2)
const switchChecked = ref<boolean>(false)
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
const activeKey = ref<string>('1')
const textareaValue = ref<string>('')
const scrollItems = ref<TextScrollItem[]>([
  {
    title: '美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  },
  {
    title: '《麦田里的守望者》首次出版于1951年',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  },
  {
    title: '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
  },
  {
    title: '并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  },
  {
    title: '愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  }
])
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
function onIncrease(scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline(scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
// 离散实例的浮层挂在 body：不传 configProviderProps 时变量从 <html> 继承；传 theme 时浮层自带该作用域令牌
let discreteMessage: MessageApi | null = null
let discreteNotification: NotificationApi | null = null
let discreteModal: ModalApi | null = null
let discreteCustomMessage: MessageApi | null = null
let discreteCustomNotification: NotificationApi | null = null
let discreteCustomModal: ModalApi | null = null
let disposeInherited: (() => void) | null = null
let disposeCustom: (() => void) | null = null
// 浮层自带主题：传 computed 后改色即时生效，无需销毁重建离散实例
const discreteCustomPrimary = ref<string>('#eb2f96')
const discreteCustomConfig = computed<ConfigProviderProps>(() => ({
  theme: { seed: { primary: discreteCustomPrimary.value } }
}))
// createDiscreteApi 内部会创建 DOM 容器，SSR（Node）下需在挂载后调用
onMounted(() => {
  const inheritedApi = createDiscreteApi(['message', 'notification', 'modal'])
  discreteMessage = inheritedApi.message
  discreteNotification = inheritedApi.notification
  discreteModal = inheritedApi.modal
  disposeInherited = inheritedApi.dispose
  const customApi = createDiscreteApi(['message', 'notification', 'modal'], {
    configProviderProps: discreteCustomConfig
  })
  discreteCustomMessage = customApi.message
  discreteCustomNotification = customApi.notification
  discreteCustomModal = customApi.modal
  disposeCustom = customApi.dispose
})
// 离散实例是独立应用，离开页面必须显式销毁，否则容器与浮层会一直挂在 body 上
onBeforeUnmount(() => {
  disposeInherited?.()
  disposeCustom?.()
})
function onDiscreteMessage() {
  discreteMessage?.info('Discrete Message 继承主应用主题变量')
}
function onDiscreteCustomMessage() {
  discreteCustomMessage?.info('Discrete Message 使用 configProviderProps.theme 自定义主题')
}
function onDiscreteCustomNotification() {
  discreteCustomNotification?.info({
    title: 'Discrete Notification',
    content: '主题令牌由 configProviderProps.theme 提供'
  })
}
function onDiscreteCustomModal() {
  discreteCustomModal?.info({
    title: 'Discrete Modal',
    content: '主题令牌由 configProviderProps.theme 提供'
  })
}
function onDiscreteNotification() {
  discreteNotification?.info({
    title: 'Discrete Notification',
    content: '主题变量继承自 <html>'
  })
}
function onDiscreteModal() {
  discreteModal?.info({
    title: 'Discrete Modal',
    content: '主题变量继承自 <html>'
  })
}
// 浮层层级管理：自动分配
const layerOpen = ref(false)
const layerSelectedValue = ref<number>(1)
// 暗色模式演示：导航 / 浮层 / 表单类组件一并纳入，验证浮层跟随作用域
const darkSelectValue = ref<number>(1)
const darkSelectOptions: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
]
const darkPage = ref<number>(1)
</script>

## 配置面：从全局到实例

_自上而下，作用范围依次收窄，冲突时按普通 `CSS` 级联处理。_

| 改动目标 | 配置入口 | 生效范围 |
| :-- | :-- | :-- |
| 品牌色 / 成功·警告·错误色 / 中性基调 | `theme.seed` | 整页或整个子树 |
| 浅色 / 暗色 / 跟随系统 | `theme.mode` | 整页或整个子树 |
| 某个组件的整套主色（如「按钮要绿色」） | `theme.components.<组件>.primaryColor` | 该组件的全部状态 |
| 某个组件的某个细节（如「滑块手柄的光环」） | `--va-<组件>-*` 组件令牌 | 单个视觉面 |
| 单个实例 | 组件 `prop`（如 `Button.color`）或 `style` | 该实例 |

这几层的优先级、`CSS` 继承关系与「颜色没生效」的排查顺序，见[定制主题：优先级链](/guide/customize-theme.html#优先级链)。下面按「从大到小」逐层演示。

## 种子换色：全组件联动

_只修改种子 `seed.primary` 一个值，所有消费主色的组件同步换色，无需逐组件传色。_

<br/>

<ConfigProvider :theme="{ seed: { primary: primaryColor } }">
  <Card title="修改主题色，以下组件配色实时联动">
    <Space align="center">
      primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" :show-alpha="false" />
    </Space>
    <div class="theme-demo-swatches">
      <span class="theme-demo-swatch"><i class="theme-demo-chip chip-primary"></i><code>--va-primary-color</code></span>
      <span class="theme-demo-swatch"><i class="theme-demo-chip chip-primary-hover"></i><code>--va-primary-color-hover</code></span>
      <span class="theme-demo-swatch"><i class="theme-demo-chip chip-primary-active"></i><code>--va-primary-color-active</code></span>
      <span class="theme-demo-swatch"><i class="theme-demo-chip chip-primary-bg"></i><code>--va-primary-bg-color</code></span>
      <span class="theme-demo-swatch"><i class="theme-demo-chip chip-primary-border"></i><code>--va-primary-border-color</code></span>
      <span class="theme-demo-swatch"><i class="theme-demo-chip chip-link"></i><code>--va-link-color</code></span>
    </div>
    <p class="theme-demo-hint">
      色块取自当前作用域实际写入的变量值，而非静态示例色。修改种子后仅重算 15 个变量：主色 6（含上排 5 个色块与主色文字）、info 3、链接 3（末位色块，基色取 <code>info</code>，本节未单独设置故与主色同值）、焦点环 1、深色皮肤底色 2（只被 <code>Menu</code> 的 <code>theme="dark"</code> 消费，故不单独占色块）。其余 27 个值不变。
    </p>
  </Card>
  <br />
  <br />
  <Flex vertical>
    <Space align="center">
      <Alert style="width: 200px" message="Info Text" type="info" show-icon />
      <AutoComplete
        :width="200"
        v-model:value="autoCompleteValue"
        :options="autoCompleteOptions"
        placeholder="输入以远程搜索"
        @search="onAutoCompleteSearch"
      />
      <BackTop />
      <Button type="primary">Primary Button</Button>
      <Checkbox v-model:checked="checkboxChecked">Checkbox</Checkbox>
      <ColorPicker :width="200" />
      <DatePicker v-model:value="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
      <Input :width="200" v-model:value="inputValue" placeholder="please input" />
      <InputNumber :width="120" v-model:value="inputNumberValue" placeholder="please input" />
      <InputSearch
        :width="200"
        v-model:value="inputSearchValue"
        :search-props="{ type: 'primary' }"
        placeholder="input search"
      />
      <Button type="primary" @click="message.info('This is an info message')">Show Message</Button>
      <Button
        type="primary"
        @click="modal.info({ title: 'This is an info modal', content: 'Some descriptions ...' })"
        >Show Modal</Button
      >
      <Button
        type="primary"
        @click="notification.info({ title: 'Notification Title', content: 'This is a normal notification' })"
        >Show Notification</Button
      >
      <Popconfirm title="Custom Theme" description="There will have some descriptions ..." icon="info">
        <Button type="primary">Show Confirm</Button>
      </Popconfirm>
      <Radio v-model:checked="radioChecked">Radio</Radio>
      <Select :options="selectOptions" v-model:value="selectedValue" />
      <Switch v-model:value="switchChecked" />
      <Textarea :width="360" v-model:value="textareaValue" placeholder="custom theme textarea" />
      <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
    </Space>
    <Space align="center" wrap>
      <Badge :value="5">
        <Avatar shape="square" size="large" />
      </Badge>
      <Tag color="processing">Processing</Tag>
      <GradientText>Gradient Text</GradientText>
      <TimePicker v-model:value="themeTimeValue" placeholder="请选择时间" />
      <Timeline>
        <TimelineItem v-for="(item, index) in themeTimelineItems" :key="index" v-bind="item" />
      </Timeline>
    </Space>
    <Card>
      <Table :columns="themeTableColumns" :data-source="themeTableData" :show-pagination="false" size="small" />
    </Card>
    <Calendar v-model:value="cardDate" display="card" />
    <Carousel style="margin-left: 0" :images="images" :height="450" />
    <Card>
      <Menu
        v-model:openKeys="seedMenuOpenKeys"
        v-model:selectedKeys="seedMenuSelectedKeys"
        style="width: 256px"
        mode="inline"
        theme="dark"
        :items="seedMenuItems"
      />
    </Card>
    <Card style="height: 300px; transform: translate(0)">
      <FloatButton type="primary" :right="96">
        <template #icon>
          <MessageOutlined />
        </template>
      </FloatButton>
      <FloatButton type="primary" shape="square">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
    </Card>
    <div
      style="
        position: relative;
        padding: 48px 36px;
        overflow: hidden;
        border: 1px solid var(--va-border-color);
        border-radius: 8px;
      "
    >
      <div ref="cardRef" style="position: absolute; inset: 0; pointer-events: none"></div>
      <LoadingBarProvider
        :container-style="{ position: 'absolute' }"
        :to="cardRef"
        @ready="localLoadingBar = $event"
      >
        <Space>
          <Button type="primary" @click="localLoadingBar?.start()">Start</Button>
          <Button @click="localLoadingBar?.finish()">Finish</Button>
          <Button type="danger" @click="localLoadingBar?.error()">Error</Button>
        </Space>
      </LoadingBarProvider>
    </div>
    <Card>
      <Pagination v-model:page="page" :total="500" show-quick-jumper />
    </Card>
    <Card>
      <Flex vertical>
        <Progress :percent="percent" />
        <Space align="center">
          <Progress type="circle" :percent="percent" />
          <Button @click="onDecline(5)" size="large" :icon="h(MinusOutlined)">Decline</Button>
          <Button @click="onIncrease(5)" size="large" :icon="h(PlusOutlined)">Increase</Button>
        </Space>
      </Flex>
    </Card>
    <Card>
      <Slider v-model:value="sliderValue" />
    </Card>
    <Card>
      <Flex style="height: 60px">
        <Spin spinning />
        <Spin spinning indicator="dot-wheel" />
        <Spin spinning indicator="line-wheel" />
        <Spin spinning :spin-circle-percent="50" indicator="ring-circle" />
        <Spin spinning :spin-circle-percent="50" indicator="ring-rail" />
        <Spin spinning indicator="dynamic-circle" />
        <Spin spinning indicator="magic-ring" />
      </Flex>
    </Card>
    <Card>
      <Steps :items="stepsItems" v-model:current="current" />
    </Card>
    <Swiper
      style="margin-left: 0"
      :images="images"
      :height="450"
      :speed="800"
      :pagination="{
        dynamicBullets: true,
        clickable: true
      }"
    />
    <Card>
      <Tabs :items="tabItems" v-model:active-key="activeKey" />
    </Card>
    <TextScroll :items="scrollItems" />
    <Upload v-model:fileList="fileList" />
  </Flex>
</ConfigProvider>

- 色块与下方组件读取**同一组 `CSS` 变量**：二者位于同一 `Provider` 作用域，不存在第二份色值，因此始终同步；
- 示例覆盖全部 `39` 个消费主色的组件；`Table` 排序箭头、`Badge` 计数底、`Timeline` 的 `blue` 圆点、`GradientText` 渐变端点均取自种子（点击 `Table` 表头可见）；
- `Tag` 的 `processing` 预设取主色，`success` / `warning` / `error` 取语义色（见「语义种子」一节）；其余 `13` 个命名色为组件自有色板，与种子无关；
- 深色皮肤（如 `Menu` 的 `theme="dark"`）底色取种子派生的品牌色暗底：改主色时根列表、浮层面板与内联子菜单一起换；
- `Message` / `Modal` / `Notification` 走推荐用法 `useXxx()`（入口已包裹 `Provider`），浮层令牌同样跟随当前作用域；
- 组件样式只消费 `var(--va-*)`，不参与换色计算：切换种子不会重建组件，也不会触发重渲染。

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import {
  AppstoreOutlined,
  CalendarOutlined,
  CommentOutlined,
  InboxOutlined,
  MailOutlined,
  MessageOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { LoadingBarProvider, useMessage, useModal, useNotification } from 'vue-amazing-ui'
import type {
  CarouselImage,
  ItemType,
  LoadingBarApi,
  MenuKey,
  MessageApi,
  ModalApi,
  NotificationApi,
  SelectOption,
  StepsItem,
  TableColumn,
  TabsItem,
  TextScrollItem,
  TimelineItemProps,
  UploadFileType
} from 'vue-amazing-ui'
const primaryColor = ref<string>('#ff6900')
// 补充的 6 个主色消费点：Badge / Tag / GradientText / TimePicker / Timeline / Table
const themeTimeValue = ref<number | null>(null)
const themeTimelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2023-05-24' },
  { content: 'Solve initial network problems 2023-05-24', color: 'blue' }
]
const themeTableColumns: TableColumn[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: Record<string, unknown>, b: Record<string, unknown>) =>
      String(a.name ?? '').localeCompare(String(b.name ?? ''))
  },
  { title: 'Age', dataIndex: 'age' }
]
const themeTableData: Record<string, unknown>[] = [
  { key: '1', name: 'Alice', age: 32 },
  { key: '2', name: 'Bob', age: 28 }
]
const checkboxChecked = ref<boolean>(false)
const cardDate = ref<number>(Date.now())
const dateValue = ref<number>(Date.now())
const inputValue = ref<string>('')
const inputNumberValue = ref<number>(3)
const inputSearchValue = ref<string>('')
const autoCompleteValue = ref<string>('')
const autoCompleteOptions = ref<string[]>([])
function onAutoCompleteSearch(searchText: string) {
  // 模拟远程搜索：根据输入动态生成联想选项
  autoCompleteOptions.value = !searchText
    ? []
    : [searchText, `${searchText}${searchText}`, `${searchText}${searchText}${searchText}`]
}
const cardRef = ref<HTMLDivElement>()
// 局部加载条挂载到 cardRef 容器，通过 <LoadingBarProvider> 的 @ready 取到该作用域内的 api
const localLoadingBar = ref<LoadingBarApi>()
// 浮层类组件推荐 useXxx()：入口 App.vue 已包裹对应 Provider
const message = useMessage()
const modal = useModal()
const notification = useNotification()
const page = ref<number>(1)
const radioChecked = ref<boolean>(false)
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
// 种子换色用例的菜单：深色皮肤的三层表面（根列表 / 浮层面板 / 内联子菜单）都取种子派生的品牌色暗底
const seedMenuOpenKeys = ref<MenuKey[]>(['sub1'])
const seedMenuSelectedKeys = ref<MenuKey[]>(['3'])
const seedMenuItems = ref<ItemType[]>([
  { key: '1', icon: () => h(MailOutlined), label: 'Navigation One' },
  { key: '2', icon: () => h(CalendarOutlined), label: 'Navigation Two' },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(SettingOutlined),
    label: 'Navigation Four',
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' }
    ]
  },
  { key: '9', icon: () => h(InboxOutlined), label: 'Navigation Five' }
])
const selectOptions = ref<SelectOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '上海市',
    value: 2
  },
  {
    label: '纽约市',
    value: 3
  },
  {
    label: '旧金山',
    value: 4
  },
  {
    label: '布宜诺斯艾利斯',
    value: 5
  },
  {
    label: '伊斯坦布尔',
    value: 6
  },
  {
    label: '拜占庭',
    value: 7
  },
  {
    label: '君士坦丁堡',
    value: 8
  }
])
const selectedValue = ref<number>(5)
const percent = ref<number>(80)
const sliderValue = ref<number>(50)
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref<number>(2)
const switchChecked = ref<boolean>(false)
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
const activeKey = ref<string>('1')
const textareaValue = ref<string>('')
const scrollItems = ref<TextScrollItem[]>([
  {
    title: '美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  },
  {
    title: '《麦田里的守望者》首次出版于1951年',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  },
  {
    title: '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
  },
  {
    title: '并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  },
  {
    title: '愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣',
    href: 'https://themusecatcher.blog.csdn.net',
    target: '_blank'
  }
])
const fileList = ref<UploadFileType[]>([
  {
    name: '1.jpg',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'Markdown.pdf',
    url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/Markdown.pdf'
  }
])
function onIncrease(scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline(scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>
<template>
  <ConfigProvider :theme="{ seed: { primary: primaryColor } }">
    <Card title="修改主题色，以下组件配色实时联动">
      <Space align="center">
        primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" :show-alpha="false" />
      </Space>
    </Card>
    <br />
    <br />
    <Flex vertical>
      <Space align="center">
        <Alert style="width: 200px" message="Info Text" type="info" show-icon />
        <AutoComplete
          :width="200"
          v-model:value="autoCompleteValue"
          :options="autoCompleteOptions"
          placeholder="输入以远程搜索"
          @search="onAutoCompleteSearch"
        />
        <BackTop />
        <Button type="primary">Primary Button</Button>
        <Checkbox v-model:checked="checkboxChecked">Checkbox</Checkbox>
        <ColorPicker :width="200" />
        <DatePicker v-model:value="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
        <Input :width="200" v-model:value="inputValue" placeholder="please input" />
        <InputNumber :width="120" v-model:value="inputNumberValue" placeholder="please input" />
        <InputSearch
          :width="200"
          v-model:value="inputSearchValue"
          :search-props="{ type: 'primary' }"
          placeholder="input search"
        />
        <Button type="primary" @click="message.info('This is an info message')">Show Message</Button>
        <Button
          type="primary"
          @click="modal.info({ title: 'This is an info modal', content: 'Some descriptions ...' })"
          >Show Modal</Button
        >
        <Button
          type="primary"
          @click="notification.info({ title: 'Notification Title', content: 'This is a normal notification' })"
          >Show Notification</Button
        >
        <Popconfirm title="Custom Theme" description="There will have some descriptions ..." icon="info">
          <Button type="primary">Show Confirm</Button>
        </Popconfirm>
        <Radio v-model:checked="radioChecked">Radio</Radio>
        <Select :options="selectOptions" v-model:value="selectedValue" />
        <Switch v-model:value="switchChecked" />
        <Textarea :width="360" v-model:value="textareaValue" placeholder="custom theme textarea" />
        <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
      </Space>
      <Space align="center" wrap>
        <Badge :value="5">
          <Avatar shape="square" size="large" />
        </Badge>
        <Tag color="processing">Processing</Tag>
        <GradientText>Gradient Text</GradientText>
        <TimePicker v-model:value="themeTimeValue" placeholder="请选择时间" />
        <Timeline>
          <TimelineItem v-for="(item, index) in themeTimelineItems" :key="index" v-bind="item" />
        </Timeline>
      </Space>
      <Card>
        <Table :columns="themeTableColumns" :data-source="themeTableData" :show-pagination="false" size="small" />
      </Card>
      <Calendar v-model:value="cardDate" display="card" />
      <Carousel style="margin-left: 0" :images="images" :height="450" />
      <Card>
        <Menu
          v-model:openKeys="seedMenuOpenKeys"
          v-model:selectedKeys="seedMenuSelectedKeys"
          style="width: 256px"
          mode="inline"
          theme="dark"
          :items="seedMenuItems"
        />
      </Card>
      <Card style="height: 300px; transform: translate(0)">
        <FloatButton type="primary" :right="96">
          <template #icon>
            <MessageOutlined />
          </template>
        </FloatButton>
        <FloatButton type="primary" shape="square">
          <template #icon>
            <CommentOutlined />
          </template>
        </FloatButton>
      </Card>
      <div
        style="
          position: relative;
          padding: 48px 36px;
          overflow: hidden;
          border: 1px solid var(--va-border-color);
          border-radius: 8px;
        "
      >
        <div ref="cardRef" style="position: absolute; inset: 0; pointer-events: none"></div>
        <LoadingBarProvider
          :container-style="{ position: 'absolute' }"
          :to="cardRef"
          @ready="localLoadingBar = $event"
        >
          <Space>
            <Button type="primary" @click="localLoadingBar?.start()">Start</Button>
            <Button @click="localLoadingBar?.finish()">Finish</Button>
            <Button type="danger" @click="localLoadingBar?.error()">Error</Button>
          </Space>
        </LoadingBarProvider>
      </div>
      <Card>
        <Pagination v-model:page="page" :total="500" show-quick-jumper />
      </Card>
      <Card>
        <Flex vertical>
          <Progress :percent="percent" />
          <Space align="center">
            <Progress type="circle" :percent="percent" />
            <Button @click="onDecline(5)" size="large" :icon="h(MinusOutlined)">Decline</Button>
            <Button @click="onIncrease(5)" size="large" :icon="h(PlusOutlined)">Increase</Button>
          </Space>
        </Flex>
      </Card>
      <Card>
        <Slider v-model:value="sliderValue" />
      </Card>
      <Card>
        <Flex style="height: 60px">
          <Spin spinning />
          <Spin spinning indicator="dot-wheel" />
          <Spin spinning indicator="line-wheel" />
          <Spin spinning :spin-circle-percent="50" indicator="ring-circle" />
          <Spin spinning :spin-circle-percent="50" indicator="ring-rail" />
          <Spin spinning indicator="dynamic-circle" />
          <Spin spinning indicator="magic-ring" />
        </Flex>
      </Card>
      <Card>
        <Steps :items="stepsItems" v-model:current="current" />
      </Card>
      <Swiper
        style="margin-left: 0"
        :images="images"
        :height="450"
        :speed="800"
        :pagination="{
          dynamicBullets: true,
          clickable: true
        }"
      />
      <Card>
        <Tabs :items="tabItems" v-model:active-key="activeKey" />
      </Card>
      <TextScroll :items="scrollItems" />
      <Upload v-model:fileList="fileList" />
    </Flex>
  </ConfigProvider>
</template>
```

:::

## 语义种子：success / warning / error / info

_`seed` 的 `success` / `warning` / `error` / `info` 与 `primary` 共用同一套色阶规则：修改单个色值，`Alert` / `Tag` / 危险按钮的常态 / 浅底 / 描边同步更新。_

<br/>

<Flex vertical gap="middle">
  <Space align="center" wrap>
    <span>success:</span>
    <ColorPicker style="width: 160px" v-model:value="seedSuccess" :show-alpha="false" />
    <span>warning:</span>
    <ColorPicker style="width: 160px" v-model:value="seedWarning" :show-alpha="false" />
  </Space>
  <Space align="center" wrap>
    <span>error:</span>
    <ColorPicker style="width: 160px" v-model:value="seedError" :show-alpha="false" />
    <span>info:</span>
    <ColorPicker style="width: 160px" v-model:value="seedInfo" :show-alpha="false" />
  </Space>
  <ConfigProvider :abstract="false" :theme="seedTheme">
    <Flex vertical gap="middle">
      <Space align="center" wrap>
        <Alert style="width: 180px" type="success" message="Success" show-icon />
        <Alert style="width: 180px" type="warning" message="Warning" show-icon />
        <Alert style="width: 180px" type="error" message="Error" show-icon />
        <Alert style="width: 180px" type="info" message="Info" show-icon />
      </Space>
      <Space align="center" wrap>
        <Button type="danger">Danger</Button>
        <Tag color="success">Success</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="error">Error</Tag>
      </Space>
    </Flex>
  </ConfigProvider>
</Flex>

- 每个语义色各自派生「常态 / 浅底 / 描边」，组件读 `--va-{success,warning,error,info}-*`，无需逐组件配置；
- `info` 未传时复用主色（链接色 `--va-link-*` 亦取 `info`），仅修改主色即可同步信息提示与链接；本节单独传入 `info`，因此不再随主色派生；
- `Tag` 的 `success` / `warning` / `error` 预设与 `Alert` 的 `type` 消费同一套变量；`Tag` 其余 `13` 个命名色（`pink` / `blue` 等）是组件自有色板，不受影响；
- `neutralText` / `neutralBg` 控制中性色阶（文字透明度、背景明暗），通常无需调整；色值格式（只收不透明 `#rgb` / `#rrggbb`）与例外规则见[定制主题：颜色种子](/guide/customize-theme.html#颜色种子-seed)。

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const seedSuccess = ref<string>('#52c41a')
const seedWarning = ref<string>('#faad14')
const seedError = ref<string>('#ff4d4f')
// info 未传时复用 primary 的三件套；显式传入后独立派生（链接色也取 info）
const seedInfo = ref<string>('#1677ff')
const seedTheme = computed<ConfigProviderTheme>(() => ({
  seed: {
    success: seedSuccess.value,
    warning: seedWarning.value,
    error: seedError.value,
    info: seedInfo.value
  }
}))
</script>
<template>
  <Flex vertical gap="middle">
    <Space align="center" wrap>
      <span>success:</span>
      <ColorPicker style="width: 160px" v-model:value="seedSuccess" :show-alpha="false" />
      <span>warning:</span>
      <ColorPicker style="width: 160px" v-model:value="seedWarning" :show-alpha="false" />
    </Space>
    <Space align="center" wrap>
      <span>error:</span>
      <ColorPicker style="width: 160px" v-model:value="seedError" :show-alpha="false" />
      <span>info:</span>
      <ColorPicker style="width: 160px" v-model:value="seedInfo" :show-alpha="false" />
    </Space>
    <ConfigProvider :abstract="false" :theme="seedTheme">
      <Flex vertical gap="middle">
        <Space align="center" wrap>
          <Alert style="width: 180px" type="success" message="Success" show-icon />
          <Alert style="width: 180px" type="warning" message="Warning" show-icon />
          <Alert style="width: 180px" type="error" message="Error" show-icon />
          <Alert style="width: 180px" type="info" message="Info" show-icon />
        </Space>
        <Space align="center" wrap>
          <Button type="danger">Danger</Button>
          <Tag color="success">Success</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="error">Error</Tag>
        </Space>
      </Flex>
    </ConfigProvider>
  </Flex>
</template>
```

:::

## 明暗模式：light / dark / auto

_`theme.mode` 决定派生使用的色阶（`light` / `dark`），`auto` 跟随系统 `prefers-color-scheme`；种子无需重写，暗色不是第二套配色。_

<br/>

<Flex vertical>
  <Space align="center" class="mb10">
    mode:
    <Segmented v-model:value="mode" :options="modeOptions" />
  </Space>
  <ConfigProvider :abstract="false" :theme="{ mode }">
    <Card title="作用域内的明暗切换">
      <Flex vertical gap="middle">
        <Space align="center" wrap>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="danger">Danger Button</Button>
          <Tag color="blue">Tag</Tag>
          <Switch v-model:value="switchChecked" />
          <Slider :value="60" style="width: 160px" />
          <Progress :percent="percent" style="width: 180px" />
        </Space>
        <Space align="center" wrap>
          <Input :width="180" v-model:value="inputValue" placeholder="please input" />
          <Select :options="darkSelectOptions" v-model:value="darkSelectValue" :width="160" />
          <Pagination v-model:page="darkPage" :total="50" :page-size="10" />
          <Tooltip tooltip="浮层跟随当前作用域">
            <Button>Hover me</Button>
          </Tooltip>
        </Space>
        <Space align="center" wrap>
          <Alert style="width: 190px" message="Info Text" type="info" show-icon />
          <Alert style="width: 190px" message="Success Text" type="success" show-icon />
          <Alert style="width: 190px" message="Warning Text" type="warning" show-icon />
          <Alert style="width: 190px" message="Error Text" type="error" show-icon />
        </Space>
      </Flex>
    </Card>
  </ConfigProvider>
</Flex>

- 本节默认展示 `dark`，切换即可对比两套默认表；种子不变，仅更换派生入参；
- 最外层只切 `mode`、又没有可继承的种子时，`Provider` 不写变量、只写 `data-va-mode`，由构建期的静态默认表接管 —— 因此切换暗色为纯 `CSS` 行为，不触发样式重建；
- `mode="auto"` 跟随系统 `prefers-color-scheme`，变化时自动重派生、卸载时解除监听；`SSR` 首帧的差异处理见[定制主题：明暗模式](/guide/customize-theme.html#明暗模式-light-dark-auto)；
- 浮层（`Tooltip` / `Select` 下拉 / `Modal`）虽 `Teleport` 到 `body`，但当前作用域的令牌与模式会转发到浮层根节点，因此仍能跟随。

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SegmentedOption, ThemeMode } from 'vue-amazing-ui'
const mode = ref<ThemeMode>('dark')
const modeOptions: SegmentedOption[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Auto', value: 'auto' }
]
const inputValue = ref<string>('')
const switchChecked = ref<boolean>(false)
const percent = ref<number>(80)
const darkSelectValue = ref<number>(1)
const darkSelectOptions = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
]
const darkPage = ref<number>(1)
</script>
<template>
  <Flex vertical>
    <Space class="mb10" align="center">
      mode:
      <Segmented v-model:value="mode" :options="modeOptions" />
    </Space>
    <ConfigProvider :abstract="false" :theme="{ mode }">
      <Card title="作用域内的明暗切换">
        <Flex vertical gap="middle">
          <Space align="center" wrap>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="danger">Danger Button</Button>
            <Tag color="blue">Tag</Tag>
            <Switch v-model:value="switchChecked" />
            <Slider :value="60" style="width: 160px" />
            <Progress :percent="percent" style="width: 180px" />
          </Space>
          <Space align="center" wrap>
            <Input :width="180" v-model:value="inputValue" placeholder="please input" />
            <Select :options="darkSelectOptions" v-model:value="darkSelectValue" :width="160" />
            <Pagination v-model:page="darkPage" :total="50" :page-size="10" />
            <Tooltip tooltip="浮层跟随当前作用域">
              <Button>Hover me</Button>
            </Tooltip>
          </Space>
          <Space align="center" wrap>
            <Alert style="width: 190px" message="Info Text" type="info" show-icon />
            <Alert style="width: 190px" message="Success Text" type="success" show-icon />
            <Alert style="width: 190px" message="Warning Text" type="warning" show-icon />
            <Alert style="width: 190px" message="Error Text" type="error" show-icon />
          </Space>
        </Flex>
      </Card>
    </ConfigProvider>
  </Flex>
</template>
```

:::

## 组件级主色：theme.components

_`theme.components.<组件>.primaryColor` 仅覆盖该组件的整套主色（常态 / 悬停 / 按下 / 浅底 / 描边），其余组件仍取 `seed`。典型场景：按钮改为品牌绿，链接保持品牌蓝。_

<br/>

<Flex vertical gap="middle">
  <Space align="center" wrap>
    <span>componentPrimary:</span>
    <ColorPicker style="width: 200px" v-model:value="componentPrimary" :show-alpha="false" />
  </Space>
  <Flex vertical gap="small">
    <span class="theme-caption">默认 seed（Button / Slider / Progress 全部跟随）</span>
    <Space align="center" wrap>
      <Button type="primary">Primary Button</Button>
      <Slider :value="40" style="width: 180px" />
      <Progress :percent="60" style="width: 160px" />
    </Space>
  </Flex>
  <Flex vertical gap="small">
    <span class="theme-caption">theme.components（只改这三个组件）</span>
    <ConfigProvider :abstract="false" :theme="componentTheme">
      <Space align="center" wrap>
        <Button type="primary">Primary Button</Button>
        <Slider :value="40" style="width: 180px" />
        <Progress :percent="60" style="width: 160px" />
      </Space>
    </ConfigProvider>
  </Flex>
</Flex>

- 组件配置优先于 `seed` 与外层祖先上的 `--va-primary-*`；运行期增删实时生效，删掉后回落到 `seed`；
- 同一色值可同时配置多个组件（本节 `Button` / `Slider` / `Progress`），各自独立派生；
- 沿 `DOM` 继承：外层配的组件主色会继续作用于内层，内层只改 `seed` 不会把它重置；
- 仅影响该组件自身的主色使用点；组合组件内的子组件按各自的 `theme.components` 配置；`Slider` 的轨道 / 手柄 / 气泡等细部件仍使用组件令牌（见下一节）；
- 完整规则（`39` 个可配组件清单、`abstract` 组合方式、纯 `CSS` 切暗色时的 `mode` 要求）见[定制主题：组件级主色](/guide/customize-theme.html#组件级主色-theme-components)。

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const componentPrimary = ref<string>('#18a058')
const componentTheme = computed<ConfigProviderTheme>(() => ({
  components: {
    Button: { primaryColor: componentPrimary.value },
    Slider: { primaryColor: componentPrimary.value },
    Progress: { primaryColor: componentPrimary.value }
  }
}))
</script>
<template>
  <Flex vertical gap="middle">
    <Space align="center" wrap>
      <span>componentPrimary:</span>
      <ColorPicker style="width: 200px" v-model:value="componentPrimary" :show-alpha="false" />
    </Space>
    <Flex vertical gap="small">
      <span class="theme-caption">默认 seed（Button / Slider / Progress 全部跟随）</span>
      <Space align="center" wrap>
        <Button type="primary">Primary Button</Button>
        <Slider :value="40" style="width: 180px" />
        <Progress :percent="60" style="width: 160px" />
      </Space>
    </Flex>
    <Flex vertical gap="small">
      <span class="theme-caption">theme.components（只改这三个组件）</span>
      <ConfigProvider :abstract="false" :theme="componentTheme">
        <Space align="center" wrap>
          <Button type="primary">Primary Button</Button>
          <Slider :value="40" style="width: 180px" />
          <Progress :percent="60" style="width: 160px" />
        </Space>
      </ConfigProvider>
    </Flex>
  </Flex>
</template>
```

:::

## 组件令牌：单组件细节覆盖

_`theme.components` 覆盖整套主色；仅调整单个视觉面（滑动条轨道、手柄光环等）时，使用组件令牌 `--va-<组件>-*`。组件令牌是公开的 `CSS` 变量，写在任意祖先选择器上即生效，无需 `ConfigProvider`。_

<br/>

<div class="theme-demo">
  <div class="theme-demo-surface" :style="tokenStyle">
    <Flex vertical gap="middle">
      <Space align="center" wrap>
        <Button type="primary">Token Button</Button>
        <Button>Default Button</Button>
      </Space>
      <Slider :value="60" />
    </Flex>
  </div>
</div>

- 令牌是**组件内部颜色变量的公开名字**，与全局令牌一样沿 `DOM` 继承，不需要额外安装或注册；
- 组件令牌只在消费处带默认值、自身不声明，因此写在任意祖先都能生效，不会被组件样式反向压住；
- 状态是成组的：只改常态会出现「悬停跳回默认色」，底色类令牌要同时看前景色（如滑动输入条的数值气泡）；
- 一个视觉元素可能拆成多个令牌：`Slider` 的轨道与滑块的**光环**分别取值（`--va-slider-track-color` / `--va-slider-handle-shadow-color`），仅改轨道会使手柄停留在默认主色 —— 上方示例已同时覆盖两者；
- 完整清单与整组覆盖示例见[组件级令牌](/guide/customize-theme.html#组件级令牌与整组覆盖)。

::: details Show Code

```vue
<script setup lang="ts">
// 整组覆盖：常态 / 悬停 / 按下一起给，避免悬停跳回默认色
const tokenStyle = {
  '--va-button-primary-color': '#722ed1',
  '--va-button-primary-color-hover': '#9254de',
  '--va-button-primary-color-active': '#531dab',
  '--va-slider-track-color': '#722ed1',
  '--va-slider-track-color-hover': '#9254de',
  // 滑块光环是独立令牌，只改轨道会让手柄停在默认主色
  '--va-slider-handle-shadow-color': '#722ed1',
  '--va-slider-handle-shadow-color-hover-focus': '#9254de'
}
</script>
<template>
  <div :style="tokenStyle">
    <Flex vertical gap="middle">
      <Space align="center" wrap>
        <Button type="primary">Token Button</Button>
        <Button>Default Button</Button>
      </Space>
      <Slider :value="60" />
    </Flex>
  </div>
</template>
```

:::

## 作用域换肤：嵌套 ConfigProvider

_典型场景：深色侧边栏、活动页局部换肤。在该区域外层再包一个 `ConfigProvider`，变量仅作用于这棵子树，兄弟节点不受影响。_

<br/>

<Flex vertical>
  <Space align="center" wrap>
    <span>commonPrimaryColor:</span>
    <ColorPicker style="width: 200px" v-model:value="commonPrimaryColor" :show-alpha="false" />
  </Space>
  <Space align="center" wrap>
    <span>scopePrimaryColor:</span>
    <ColorPicker style="width: 200px" v-model:value="scopePrimaryColor" :show-alpha="false" />
  </Space>
  <ConfigProvider :abstract="false" :theme="theme">
    <Flex vertical gap="middle">
      <Space align="center" wrap>
        <span class="theme-caption">外层作用域</span>
        <Alert style="width: 180px" message="Outer Alert" type="info" show-icon />
        <Button type="primary">Outer Button</Button>
      </Space>
      <ConfigProvider :abstract="false" :theme="{ seed: { primary: scopePrimaryColor } }">
        <Flex vertical gap="small">
          <span class="theme-caption">子树作用域（仅影响本子树）</span>
          <Space align="center" wrap>
            <Alert style="width: 180px" message="Scoped Alert" type="info" show-icon />
            <Button type="primary">Scoped Button</Button>
          </Space>
        </Flex>
      </ConfigProvider>
    </Flex>
  </ConfigProvider>
</Flex>

- 变量写在**包裹元素**上、靠 `CSS` 继承生效：子树内的组件与更内层的作用域都会取到它，兄弟节点不受影响；
- 内层只传 `seed` 的部分字段时是整个替换（不逐字段合并），**没传的字段回落默认值**；完全不传 `seed` 才继承外层，`mode` 同理；
- 作用域内的浮层（`Tooltip` / `Select` 面板 / `Modal` / `Message`）会带上当前令牌，不会因挂载到 `body` 而退回默认配色；
- 页面级生效（`body` 背景、页面链接）只能由最外层 `abstract: true` 写 `<html>`；嵌套层一律 `abstract: false`，否则没有承载变量的节点，开发环境会告警；
- 更细的边界（`<html>` 写入权仲裁、运行期改父级主题的限制、组件配置的覆盖顺序）见[定制主题：作用域换肤](/guide/customize-theme.html#作用域换肤-嵌套-configprovider)。

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const commonPrimaryColor = ref<string>('#1677ff')
const scopePrimaryColor = ref<string>('#18a058')
// 必须用 computed 建立响应式关联，直接 ref 快照会导致 ColorPicker 改动不生效
const theme = computed<ConfigProviderTheme>(() => ({
  seed: {
    primary: commonPrimaryColor.value
  }
}))
</script>
<template>
  <Flex vertical>
    <Space align="center" wrap>
      <span>commonPrimaryColor:</span>
      <ColorPicker style="width: 200px" v-model:value="commonPrimaryColor" :show-alpha="false" />
    </Space>
    <Space align="center" wrap>
      <span>scopePrimaryColor:</span>
      <ColorPicker style="width: 200px" v-model:value="scopePrimaryColor" :show-alpha="false" />
    </Space>
    <ConfigProvider :abstract="false" :theme="theme">
      <Flex vertical gap="middle">
        <Space align="center" wrap>
          <span class="theme-caption">外层作用域</span>
          <Alert style="width: 180px" message="Outer Alert" type="info" show-icon />
          <Button type="primary">Outer Button</Button>
        </Space>
        <ConfigProvider :abstract="false" :theme="{ seed: { primary: scopePrimaryColor } }">
          <Flex vertical gap="small">
            <span class="theme-caption">子树作用域（仅影响本子树）</span>
            <Space align="center" wrap>
              <Alert style="width: 180px" message="Scoped Alert" type="info" show-icon />
              <Button type="primary">Scoped Button</Button>
            </Space>
          </Flex>
        </ConfigProvider>
      </Flex>
    </ConfigProvider>
  </Flex>
</template>
```

:::

## 运行期切换：响应式 theme

_`theme` 支持响应式传入：以 `computed` 包装后，切换种子，已挂载组件即时更新，无需刷新页面。_

<br/>

<Flex vertical>
  <Space align="center">
    <Switch v-model:value="overrideEnabled" />
    <span>切换主色（#1677ff ↔ #18a058）</span>
  </Space>
  <ConfigProvider :abstract="false" :theme="overrideTheme">
    <Space align="center">
      <Alert style="width: 200px" message="Info Text" type="info" show-icon />
      <Button type="primary">Primary Button</Button>
    </Space>
  </ConfigProvider>
</Flex>

- `theme` 为普通响应式数据：整体替换（`computed` 返回新对象）或就地改写 `seed.primary` 均生效；
- 切换只重算 `CSS` 变量、不重建组件，因此输入内容与滚动位置不会丢失。

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const overrideEnabled = ref<boolean>(false)
// 运行期切换用的两个主题预设：仅切换主色种子
const themeWithoutOverride: ConfigProviderTheme = {
  seed: {
    primary: '#1677ff'
  }
}
const themeWithOverride: ConfigProviderTheme = {
  seed: {
    primary: '#18a058'
  }
}
const overrideTheme = computed<ConfigProviderTheme>(() =>
  overrideEnabled.value ? themeWithOverride : themeWithoutOverride
)
</script>
<template>
  <Flex vertical>
    <Space align="center">
      <Switch v-model:value="overrideEnabled" />
      <span>切换主色（#1677ff ↔ #18a058）</span>
    </Space>
    <ConfigProvider :abstract="false" :theme="overrideTheme">
      <Space align="center">
        <Alert style="width: 200px" message="Info Text" type="info" show-icon />
        <Button type="primary">Primary Button</Button>
      </Space>
    </ConfigProvider>
  </Flex>
</template>
```

:::

## 链接色：随种子派生

_链接色由种子派生：`--va-link-color` / `-hover` / `-active` 随主色同步重算，页面链接与组件插槽内的链接一并更新，无需额外配置。_

<br/>

<!-- 文档站正文的 `.vp-doc a`（特异性 0,1,1）会覆盖库的全局链接基座（特异性 0），此处为演示单独引用 CSS 变量以便观察；实际项目无需此处理 -->
<style>
  .link-theme-demo a {
    color: var(--va-link-color, #1677ff);
    text-decoration: none;
  }

  .link-theme-demo a:hover {
    color: var(--va-link-color-hover, #69b1ff);
  }

  .link-theme-demo a:active {
    color: var(--va-link-color-active, #0958d9);
  }
</style>

<Flex vertical class="link-theme-demo">
  <Space align="center">
    linkPrimaryColor:<ColorPicker style="width: 200px" v-model:value="linkPrimaryColor" :show-alpha="false" />
  </Space>
  <ConfigProvider :abstract="false" :theme="{ seed: { primary: linkPrimaryColor } }">
    <Card width="50%" title="链接颜色跟随主题">
      <template #extra>
        <a href="#">more</a>
      </template>
      <p>页面链接：<a href="#">Link 1</a> 与 <a href="#">Link 2</a></p>
    </Card>
  </ConfigProvider>
</Flex>

- 链接基座为 `:where(a)`（特异性 `0`），宿主的 `a { color }` 可直接覆盖，无需 `!important`；
- 只想改链接、不动主色时，单独覆盖 `--va-link-color` / `-hover` / `-active` 三个变量即可；
- 上方 `<style>` 仅用于覆盖文档站正文样式，实际项目无需引入。

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const linkPrimaryColor = ref<string>('#1677ff')
</script>
<template>
  <Flex vertical>
    <Space align="center">
      linkPrimaryColor:<ColorPicker style="width: 200px" v-model:value="linkPrimaryColor" :show-alpha="false" />
    </Space>
    <ConfigProvider :abstract="false" :theme="{ seed: { primary: linkPrimaryColor } }">
      <Card width="50%" title="链接颜色跟随主题">
        <template #extra>
          <a href="#">more</a>
        </template>
        <p>页面链接：<a href="#">Link 1</a> 与 <a href="#">Link 2</a></p>
      </Card>
    </ConfigProvider>
  </Flex>
</template>
```

:::

若需单独定制链接颜色，直接在自己的页面样式中覆盖即可（链接基座特异性为 `0`，任何链接规则都能覆盖它）：

```css
a {
  color: #f5222d;
}

a:hover {
  color: #ff7875;
}
```

## 自定义包裹元素：tag

_`abstract=false` 会渲染一层包裹元素，默认 `div`；`tag` 可改为 `span` 等行内元素，避免在 `<p>` / `<li>` 内插入块级节点、破坏文档语义。_

<br/>

<ConfigProvider :abstract="false" tag="span" :theme="{ seed: { primary: '#ff6900' } }">
  <Button type="primary">Primary Button</Button>
</ConfigProvider>

- `tag` 只在 `abstract=false` 时有效；`abstract=true` 不渲染包裹元素，`tag` 会被忽略；
- 包裹元素只承载变量与 `data-va-mode`，没有额外样式，因此不会影响原有布局；
- 无需新增 `DOM` 时使用 `abstract=true`，或直接在祖先选择器上写 `--va-*`（两者均不产生包裹元素）。

::: details Show Code

```vue
<template>
  <ConfigProvider :abstract="false" tag="span" :theme="{ seed: { primary: '#ff6900' } }">
    <Button type="primary">Primary Button</Button>
  </ConfigProvider>
</template>
```

:::

## 离散 API 的主题

_`Tooltip`、`Select` 下拉、`Modal`、`Message` 等组件会 `Teleport` 到 `body`，主题来源只有两条：_

| 浮层是谁创建的 | 主题从哪来 | 你要做什么 |
| :-- | :-- | :-- |
| 页面里的组件（`Modal` / `Tooltip` / `Select` …） | 自动带上所属 `ConfigProvider` 作用域的令牌 | 无需额外配置，同作用域内自动跟随 |
| 组件树外调用 `createDiscreteApi()` | 继承 `<html>`，或自带一份独立主题 | 下面两种写法 |

### 继承主应用主题

<br/>

_不传 `configProviderProps`：浮层的 `CSS` 变量从 `<html>` 继承，跟随主应用主题实时变化_

<br/>

<Flex vertical>
  <Space>
    <Button type="primary" @click="onDiscreteMessage">Discrete Message</Button>
    <Button type="primary" @click="onDiscreteNotification">Discrete Notification</Button>
    <Button type="primary" @click="onDiscreteModal">Discrete Modal</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { createDiscreteApi } from 'vue-amazing-ui'
import type { MessageApi, ModalApi, NotificationApi } from 'vue-amazing-ui'
let discreteMessage: MessageApi | null = null
let discreteNotification: NotificationApi | null = null
let discreteModal: ModalApi | null = null
let disposeApi: (() => void) | null = null
// createDiscreteApi 内部会创建 DOM 容器，SSR（Node）下需在挂载后调用
onMounted(() => {
  // 不传 configProviderProps：浮层不写 <html>，CSS 变量从 <html> 继承
  const api = createDiscreteApi(['message', 'notification', 'modal'])
  discreteMessage = api.message
  discreteNotification = api.notification
  discreteModal = api.modal
  disposeApi = api.dispose
})
// 离散实例是独立应用，离开页面必须显式销毁
onBeforeUnmount(() => disposeApi?.())
function onDiscreteMessage() {
  discreteMessage?.info('Discrete Message 继承主应用主题变量')
}
function onDiscreteNotification() {
  discreteNotification?.info({ title: 'Discrete Notification', content: '主题变量继承自 <html>' })
}
function onDiscreteModal() {
  discreteModal?.info({ title: 'Discrete Modal', content: '主题变量继承自 <html>' })
}
</script>
<template>
  <Flex vertical>
    <Space>
      <Button type="primary" @click="onDiscreteMessage">Discrete Message</Button>
      <Button type="primary" @click="onDiscreteNotification">Discrete Notification</Button>
      <Button type="primary" @click="onDiscreteModal">Discrete Modal</Button>
    </Space>
  </Flex>
</template>
```

:::

### 自定义主题

<br/>

_传 `configProviderProps.theme`：浮层根节点内联该作用域的令牌与 `data-va-mode`，与主应用主题互不影响；传 `computed` 改色即时生效_

<br/>

<Flex vertical gap="small">
  <Space align="center" wrap>
    <span>customPrimary:</span>
    <ColorPicker style="width: 200px" v-model:value="discreteCustomPrimary" :show-alpha="false" />
  </Space>
  <Space>
    <Button type="primary" @click="onDiscreteCustomMessage">Custom Theme Message</Button>
    <Button type="primary" @click="onDiscreteCustomNotification">Custom Theme Notification</Button>
    <Button type="primary" @click="onDiscreteCustomModal">Custom Theme Modal</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { createDiscreteApi } from 'vue-amazing-ui'
import type { ConfigProviderProps, MessageApi, ModalApi, NotificationApi } from 'vue-amazing-ui'
let discreteMessage: MessageApi | null = null
let discreteNotification: NotificationApi | null = null
let discreteModal: ModalApi | null = null
let disposeApi: (() => void) | null = null
// 浮层自带主题：不依赖 <html> 上的变量；传 computed 后改色即时生效
const discreteCustomPrimary = ref<string>('#eb2f96')
const discreteCustomConfig = computed<ConfigProviderProps>(() => ({
  theme: { seed: { primary: discreteCustomPrimary.value } }
}))
onMounted(() => {
  const api = createDiscreteApi(['message', 'notification', 'modal'], {
    configProviderProps: discreteCustomConfig
  })
  discreteMessage = api.message
  discreteNotification = api.notification
  discreteModal = api.modal
  disposeApi = api.dispose
})
onBeforeUnmount(() => disposeApi?.())
function onDiscreteMessage() {
  discreteMessage?.info('Discrete Message 使用 configProviderProps.theme 自定义主题')
}
function onDiscreteNotification() {
  discreteNotification?.info({
    title: 'Discrete Notification',
    content: '主题令牌由 configProviderProps.theme 提供'
  })
}
function onDiscreteModal() {
  discreteModal?.info({
    title: 'Discrete Modal',
    content: '主题令牌由 configProviderProps.theme 提供'
  })
}
</script>
<template>
  <Flex vertical gap="small">
    <Space align="center" wrap>
      <span>customPrimary:</span>
      <ColorPicker style="width: 200px" v-model:value="discreteCustomPrimary" :show-alpha="false" />
    </Space>
    <Space>
      <Button type="primary" @click="onDiscreteMessage">Custom Theme Message</Button>
      <Button type="primary" @click="onDiscreteNotification">Custom Theme Notification</Button>
      <Button type="primary" @click="onDiscreteModal">Custom Theme Modal</Button>
    </Space>
  </Flex>
</template>
```

:::

两种方式都不会改写 `<html>`，`dispose()` 也不会误清除主应用写入的变量。

## 浮层层级：baseZIndex

_浮层层级需同时满足两点：弹窗内的下拉、提示不被遮罩覆盖；多个弹窗并存时，后打开者位于上层。组件自带默认层级，也可传 `baseZIndex` 交由 `Provider` 统一分配。_

### 各组件默认层级

<br/>

浮层按类型划分层级：锚点跟随型浮层（`Tooltip` / `Select` 等）需高于承载它的视口固定型浮层（`Modal` / `Drawer` / `Dialog`），否则会被遮罩盖住：

| 浮层 | 默认层级 | 说明 |
| :-- | :-- | :-- |
| `Tooltip`（含 `Popover` / `Popconfirm` / `Ellipsis` / `Rate` / `BackTop` / `FloatButton` 的气泡） | **`1070`** | 锚点跟随型需高于 `Modal` / `Drawer` / `Dialog` |
| `Select` / `AutoComplete` / `Dropdown` / `DatePicker` / `TimePicker` / `ColorPicker`（含 `Cascader` / `Pagination` / `Calendar` 的下拉） | **`1050`** | 同上 |
| `Modal` / `Dialog` | **`1000`**（遮罩）/ **`1010`**（弹窗） | 弹窗在遮罩之上 `+10` |
| `Drawer` | **`1000`** | 遮罩在容器内按 `DOM` 顺序排列 |
| `Image` 全屏预览 | **`1070`**（遮罩）/ **`1080`**（预览）/ `1081`（操作按钮） | 预览高于 `Modal` / `Drawer` |
| `Message` / `Notification` | **`1030`** / **`1040`** | 全局反馈层：**高于承载层**（`Modal` 弹窗 `1010`）、**低于锚点跟随型浮层**（`Select` `1050` / `Tooltip` `1070`） |
| `LoadingBar` | **`9999`** | 始终在最上层 |
| `BackTop` | **`9`**（可配 `zIndex`） | 页面级控件，需**低于**浮层，不参与自动分配 |
| `FloatButton` | **`99`**（可配 `zIndex`） | 同上 |
| `Spin` 局部遮罩 | `9` | 相对自身容器的局部层级，不参与全局分配 |
| `Badge` / `Watermark` 装饰层 | `9` / `90`（可配 `zIndex`） | 装饰性叠加，不参与全局分配 |

上表的取值遵循「基准 `1000` + 类别偏移」的规则（`Tooltip` / `Image +70`、`Select +50`、`Message +30`、`Notification +40`）：同类浮层共用同一偏移量；同一层内部再按 `10` 为步长细分（如 `Modal` / `Dialog` 的遮罩 `1000` / 弹窗 `1010`，`Image` 的遮罩 `1070` / 预览 `1080`）。`BackTop`（`9`）与 `FloatButton`（`99`）为页面级控件，不参与该序列。

<br/>

反馈层刻意**不占据最高层级** —— 这样在消息 / 通知内容里放 `Select` / `Tooltip` 时，浮层不会被消息框压住。取值 `1030` / `1040` 是为了与 `Modal` 弹窗（`1010`）、`Select` 面板（`1050`）**都不打平**：同层级时上下关系会退化为 `DOM` 顺序（模板源码顺序），顺序不可控。`LoadingBar`（`9999`）始终保持最上。

### 自动分配（可选）

<br/>

传入 `baseZIndex` 后，`ConfigProvider` 会向下注入层级分配器，锚点跟随型与视口固定型浮层共同消费：

- 浮层在**出现**时领取层级，分配点恒在当前所有已打开浮层之上，即「后出现者在上」—— 该序列只用于**没有承载关系的独立浮层之间**（多个弹窗、多个页面级下拉）；
- 浮层位于承载层（`Modal` / `Drawer` / `Dialog` / 上层浮层面板）内时，会**挂进该承载层的内容容器**，层叠关系由 `CSS` 的包含关系表达 —— 因此它恒在其承载层之上、随承载层一起显隐与位移，不受层级序列影响；未处于任何承载层内时仍挂 `body`；
- 层级数值随「**同时可见**的浮层数」增长，不随打开次数无限增大（浮层隐藏后即归还层级）；
- 承载层关闭时，其内部已打开的浮层（如 `Select` 下拉）会**一并收起**（收起即归还层级）；
- 各组件自身的 `zIndex` `prop` 优先级最高；
- **不传 `baseZIndex` 时各组件使用上表的默认层级**，可按需开启。

<ConfigProvider :base-z-index="1000">
  <Button type="primary" @click="layerOpen = true">Open Modal</Button>
  <Modal v-model:open="layerOpen" title="弹窗内浮层">
    <Space align="center">
      <Tooltip tooltip="Vue Amazing UI">
        <Button>Hover me</Button>
      </Tooltip>
      <Select :options="selectOptions" v-model:value="layerSelectedValue" :width="200" />
    </Space>
  </Modal>
</ConfigProvider>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'vue-amazing-ui'
const layerOpen = ref(false)
const layerSelectedValue = ref<number>(1)
const selectOptions: SelectOption[] = [
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '布宜诺斯艾利斯', value: 5 },
  { label: '伊斯坦布尔', value: 6 },
  { label: '拜占庭', value: 7 },
  { label: '君士坦丁堡', value: 8 }
]
</script>
<template>
  <ConfigProvider :base-z-index="1000">
    <Button type="primary" @click="layerOpen = true">Open Modal</Button>
    <Modal v-model:open="layerOpen" title="弹窗内浮层">
      <Space align="center">
        <Tooltip tooltip="Vue Amazing UI">
          <Button>Hover me</Button>
        </Tooltip>
        <Select :options="selectOptions" v-model:value="layerSelectedValue" :width="200" />
      </Space>
    </Modal>
  </ConfigProvider>
</template>
```

:::

## 常见问题排查

_按「改的是哪一层」定位，再检查作用域与覆盖范围；完整清单见[定制主题：排查清单](/guide/customize-theme.html#排查清单-颜色没生效)。_

- 悬停 / 按下跳回默认色：只覆盖了常态，组件令牌要整组覆盖（常态 / 悬停 / 按下）；
- 弹窗 / 下拉没跟随：确认在 `ConfigProvider` 子树内；页面级主题要在最外层用 `abstract: true`；
- 暗色只变了一半：纯 `CSS` 切暗色时 `data-va-mode` 要写在实际作用域节点上；
- 自定义 `SVG` 不变色：`fill` 是 `presentation attribute`，不解析 `var()`，请写进 `style`。

几条实践建议：

- **应用根部只放一个 `Provider`**：`abstract: true` + `seed` / `mode`，页面内需要局部换肤时再嵌套 `abstract: false`；
- **不要用令牌重复配置同一个颜色**：优先用 `theme.components` 让系统派生状态，令牌只用于细部件；
- **在 `JS` / `canvas` / `SVG` 中取色**：用主入口公开的 `derive(seed, mode)`，与 `--va-*` 逐值一致，不要自己拼色阶；
- **品牌色偏浅时主动换深色**：系统不替品牌色做对比度兜底，主色文字与白字对比度不足时应更换主色，或单独覆盖 `--va-primary-text-color` / `--va-text-color-solid`。

## APIs

### ConfigProvider Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| theme | 主题对象 | [ConfigProviderTheme](#configprovidertheme-type) | undefined |
| abstract | 是否不存在 `DOM` 包裹元素（默认渲染包裹元素、变量写在上面；传 `true` 时写 `<html>`，用于应用级主题。只有 `components`、没有 `seed` / `mode` 时不参与 `<html>` 写入，需改用 `false` 或补充全局主题） | boolean | false |
| tag | `ConfigProvider` 被渲染成的元素，`abstract` 为 `false` 时有效 | string | 'div' |
| baseZIndex | 浮层起始层级（`z-index`），传入后各浮层按「后出现者在上」自增分配；不传则各组件沿用自身默认层级 | number | undefined |

### ConfigProviderTheme Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| seed? | 颜色种子 | [ThemeSeed](#themeseed-type) |
| mode? | 模式：浅色 / 暗色 / 跟随系统 | 'light' \| 'dark' \| 'auto' |
| components? | 组件级主色；优先于 `seed`；键为已接线的组件名（[ThemeComponentKey](#themecomponentkey-type)，写错在编译期报错） | Partial\<Record\<[ThemeComponentKey](#themecomponentkey-type), [ComponentThemeConfig](#componentthemeconfig-type)\>\> |

> 未传 `theme`（或传空对象）时不写任何变量，完全使用静态默认表；`mode="auto"` 跟随系统 `prefers-color-scheme` 并在变化时重新派生；`seed` / `mode` / `components` 的派生规则详见[定制主题](/guide/customize-theme.html)。

### ThemeComponentKey Type

| 名称 | 值 |
| :-- | :-- |
| ThemeComponentKey | 'Alert' &#124; 'AutoComplete' &#124; 'BackTop' &#124; 'Badge' &#124; 'Button' &#124; 'Calendar' &#124; 'Carousel' &#124; 'Checkbox' &#124; 'ColorPicker' &#124; 'DatePicker' &#124; 'FloatButton' &#124; 'GradientText' &#124; 'Image' &#124; 'Input' &#124; 'InputNumber' &#124; 'InputSearch' &#124; 'LoadingBar' &#124; 'Menu' &#124; 'Message' &#124; 'Modal' &#124; 'Notification' &#124; 'Pagination' &#124; 'Popconfirm' &#124; 'Progress' &#124; 'Radio' &#124; 'Select' &#124; 'Slider' &#124; 'Spin' &#124; 'Steps' &#124; 'Swiper' &#124; 'Switch' &#124; 'Table' &#124; 'Tabs' &#124; 'Tag' &#124; 'TextScroll' &#124; 'Textarea' &#124; 'TimePicker' &#124; 'Timeline' &#124; 'Upload' |

> 取值为已接线组件级主色的组件名（与本库组件目录同名、顺序固定，由 `THEME_COMPONENTS` 守护）；键写错在编译期报错，不依赖运行期告警。每个组件可覆盖的令牌见[组件级令牌](/guide/customize-theme.html#组件级令牌与整组覆盖)。

### ComponentThemeConfig Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| primaryColor? | 组件主色，只接受不透明 `#rgb` / `#rrggbb` / `#rrggbbff`（与 `seed` 同一口径）；按色阶派生常态 / 悬停 / 按下 / 浅底 / 描边 / 实色文字 | string |

> 组件级主色覆盖 `39` 个已接线的内置组件（完整清单见[组件级令牌](/guide/customize-theme.html#组件级令牌与整组覆盖)）；未接入的组件键会在开发环境告警。组件的细部件颜色（如 `Slider` 的 `rail` / `handle` / `tooltip`）仍用组件级令牌覆盖。

### ThemeSeed Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| primary? | 品牌主色，默认 `#1677ff` | string |
| success? | 成功色，默认 `#52c41a` | string |
| warning? | 警告色，默认 `#faad14` | string |
| error? | 错误 / 危险色，默认 `#ff4d4f` | string |
| info? | 信息色，未传时跟随 primary | string |
| neutralText? | 中性文本基准，默认 `#000000` | string |
| neutralBg? | 中性背景基准（显式传入时两个模式共用，未传时按模式取 `#ffffff` / `#000000`） | string |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 内容 | v-slot:default |
