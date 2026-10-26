<script setup lang="ts">
import { ref, computed, h, onUnmounted } from 'vue'
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
import { createDiscreteApi } from 'vue-amazing-ui'
import type {
  ConfigProviderProps,
  ConfigProviderTheme,
  CarouselImage,
  ItemType,
  LoadingBarApi,
  MenuKey,
  MessageApi,
  ModalApi,
  NotificationApi,
  SelectOption,
  SegmentedOption,
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
// 「所有组件一起变色」补充的 6 个主色消费点：Badge / Tag / GradientText / TimePicker / Timeline / Table
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
const theme = computed<ConfigProviderTheme>(() => ({
  seed: {
    primary: commonPrimaryColor.value
  }
}))
const overrideEnabled = ref<boolean>(false)
// 运行期切换用的两个主题预设：仅换种子，其余颜色由派生函数统一生成
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
const autoCompleteValue = ref<string>('')
const autoCompleteOptions = ref<string[]>([])
const checkboxChecked = ref<boolean>(false)
const cardDate = ref<number>(Date.now())
const dateValue = ref<number>(Date.now())
const inputValue = ref<string>('')
const inputNumberValue = ref<number>(3)
const inputSearchValue = ref<string>('')
// 这三处刻意用组件形态 + @ready 取实例：useMessage() / useModal() / useNotification() 命中的是入口 App.vue 的 Provider，
// 弹层挂在 <body> 上只跟随页面级主题；只有组件形态落在本段 ConfigProvider 作用域内，才能演示「改种子 → 弹层同步换色」
const messageRef = ref<MessageApi>()
const modalRef = ref<ModalApi>()
const notificationRef = ref<NotificationApi>()
const cardRef = ref<HTMLDivElement>()
// 局部加载条挂载到 cardRef 容器，通过 <LoadingBarProvider> 的 @ready 取到该作用域内的 api
const localLoadingBar = ref<LoadingBarApi>()
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
const darkSelectValue = ref<number>(1)
const darkSelectOptions: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
]
const darkPage = ref<number>(1)
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
function onAutoCompleteSearch(searchText: string) {
  // 模拟远程搜索：根据输入动态生成联想选项
  autoCompleteOptions.value = !searchText
    ? []
    : [searchText, `${searchText}${searchText}`, `${searchText}${searchText}${searchText}`]
}
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
// 离散实例 A：不传 configProviderProps，浮层挂在 body，CSS 变量从 <html> 继承，自动跟随主应用主题
const {
  message: discreteMessage,
  notification: discreteNotification,
  modal: discreteModal,
  dispose: disposeInherited
} = createDiscreteApi(['message', 'notification', 'modal'])
// 离散实例 B：传 configProviderProps.theme，浮层自带该作用域的令牌（不经 <html>），可独立换肤；
// 传 computed 时浮层随取色实时更新，不需要销毁重建实例
const discreteCustomPrimary = ref<string>('#eb2f96')
const discreteCustomConfig = computed<ConfigProviderProps>(() => ({
  theme: { seed: { primary: discreteCustomPrimary.value } }
}))
const {
  message: discreteCustomMessage,
  notification: discreteCustomNotification,
  modal: discreteCustomModal,
  dispose: disposeCustom
} = createDiscreteApi(['message', 'notification', 'modal'], {
  configProviderProps: discreteCustomConfig
})
// 离散实例是独立应用，离开页面必须显式销毁，否则其容器与浮层会一直挂在 body 上
onUnmounted(() => {
  disposeInherited()
  disposeCustom()
})
function onDiscreteMessage() {
  discreteMessage.info('Discrete Message 继承主应用主题变量')
}
function onDiscreteNotification() {
  discreteNotification.info({
    title: 'Discrete Notification',
    content: '主题变量继承自 <html>'
  })
}
function onDiscreteModal() {
  discreteModal.info({
    title: 'Discrete Modal',
    content: '主题变量继承自 <html>'
  })
}
function onDiscreteCustomMessage() {
  discreteCustomMessage.info('Discrete Message 使用 configProviderProps.theme 自定义主题')
}
function onDiscreteCustomNotification() {
  discreteCustomNotification.info({
    title: 'Discrete Notification',
    content: '主题令牌由 configProviderProps.theme 提供'
  })
}
function onDiscreteCustomModal() {
  discreteCustomModal.info({
    title: 'Discrete Modal',
    content: '主题令牌由 configProviderProps.theme 提供'
  })
}
// 浮层层级自动分配：弹窗内嵌套 Tooltip / Select
const layerModalOpen = ref<boolean>(false)
const layerSelectedValue = ref<number>(1)
// 语义色：success / warning / error / info 与主色走同一套色阶映射
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
// 组件级主色：同一个主色可以一次配置多个组件，各自派生悬停 / 按下 / 浅底
const componentPrimary = ref<string>('#18a058')
const componentTheme = computed<ConfigProviderTheme>(() => ({
  components: {
    Button: { primaryColor: componentPrimary.value },
    Slider: { primaryColor: componentPrimary.value },
    Progress: { primaryColor: componentPrimary.value }
  }
}))
// 组件令牌：纯 CSS 变量覆盖单个视觉面，不经过 Provider；整组覆盖才不会有「悬停跳回默认色」
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
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">配置面：从全局到实例</h2>
    <p class="mb10">
      自上而下，作用范围依次收窄。种子是派生整套色阶的起点色，派生出的 42 个 CSS 变量由组件读取，因此换肤不重建组件；
      四层冲突时按普通 CSS 级联处理。
    </p>
    <Descriptions class="mb10" :column="1" bordered>
      <DescriptionsItem label="theme.seed">7 个颜色种子（主色 / 语义色 / 中性色），一次换整套</DescriptionsItem>
      <DescriptionsItem label="theme.mode">light / dark / auto，浅色与暗色共用同一组种子</DescriptionsItem>
      <DescriptionsItem label="theme.components"
        >只换某个组件的整套主色，悬停 / 按下 / 浅底 / 描边自动派生</DescriptionsItem
      >
      <DescriptionsItem label="组件令牌 --va-*">只换某个组件的单个视觉面，纯 CSS、写在任意祖先即可</DescriptionsItem>
    </Descriptions>
    <h2 class="mt30 mb10">种子换色：全组件联动</h2>
    <p class="mb10">
      只修改种子 <code>seed.primary</code> 一个值，<code>39</code> 个消费主色的组件同步换色，无需逐组件传色。
    </p>
    <!--
      用默认包裹元素形态（abstract: false）演示：本站 <html> 已被 App.vue 的应用级主题占用，
      abstract: true 只由最外层实例写入，内层再传既没有承载变量的节点、也不会写 <html>，主题会整体失效。
      包裹元素内的 Teleport 浮层（下拉、弹窗、消息）由边界转发自带当前令牌，同样一并跟随
    -->
    <ConfigProvider :theme="{ seed: { primary: primaryColor } }">
      <Card width="70%" title="修改主题色，以下组件配色实时联动">
        <Space align="center">
          <span>primary:</span>
          <!-- 主题种子只接受不透明色：关闭 alpha 通道，避免拖拽后输出 #rrggbbaa 让种子失效 -->
          <ColorPicker style="width: 200px" v-model:value="primaryColor" :show-alpha="false" />
        </Space>
        <div class="theme-swatches mt10">
          <span class="theme-swatch">
            <i class="swatch swatch-primary"></i>
            <code>--va-primary-color</code>
          </span>
          <span class="theme-swatch">
            <i class="swatch swatch-primary-hover"></i>
            <code>--va-primary-color-hover</code>
          </span>
          <span class="theme-swatch">
            <i class="swatch swatch-primary-active"></i>
            <code>--va-primary-color-active</code>
          </span>
          <span class="theme-swatch">
            <i class="swatch swatch-primary-bg"></i>
            <code>--va-primary-bg-color</code>
          </span>
          <span class="theme-swatch">
            <i class="swatch swatch-primary-border"></i>
            <code>--va-primary-border-color</code>
          </span>
          <span class="theme-swatch">
            <i class="swatch swatch-link"></i>
            <code>--va-link-color</code>
          </span>
        </div>
        <p class="theme-tip mt10">
          上排色块取的就是本作用域真实写入的变量（不是写死的示例色）。改一个种子只重算 15 个变量：主色 6（含上排 5
          个色块与主色文字）+ info 3 + 链接 3（末位色块，取 info，本例未单独传 info 故与主色同值）+ 焦点环 1 +
          深色皮肤底色 2（只被 <code>Menu</code> 的 <code>theme="dark"</code> 消费，故不单独占色块），其余 27
          个连值都不变。
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
          <Button type="primary" @click="messageRef?.info('This is an info message')">Show Message</Button>
          <Message @ready="messageRef = $event" />
          <Button
            type="primary"
            @click="modalRef?.info({ title: 'This is an info modal', content: 'Some descriptions ...' })"
            >Show Modal</Button
          >
          <Modal @ready="modalRef = $event" />
          <Button
            type="primary"
            @click="notificationRef?.info({ title: 'Notification Title', content: 'This is a normal notification' })"
            >Show Notification</Button
          >
          <Notification @ready="notificationRef = $event" />
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
        <Card width="50%">
          <Table :columns="themeTableColumns" :data-source="themeTableData" :show-pagination="false" size="small" />
        </Card>
        <Calendar v-model:value="cardDate" display="card" />
        <Carousel style="margin-left: 0" :images="images" :width="800" :height="450" />
        <Card width="50%">
          <Menu
            v-model:openKeys="seedMenuOpenKeys"
            v-model:selectedKeys="seedMenuSelectedKeys"
            style="width: 256px"
            mode="inline"
            theme="dark"
            :items="seedMenuItems"
          />
        </Card>
        <Card width="50%" style="height: 300px; transform: translate(0)">
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
        <!-- 就地演示：to / container-style 只能由局部 Provider 声明，加载条才会取本段种子的令牌（全局实例挂在 body，取页面级主色） -->
        <div
          style="
            position: relative;
            width: 50%;
            padding: 48px 36px;
            overflow: hidden;
            border: 1px solid var(--va-border-color);
            border-radius: 4px;
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
        <Card width="50%">
          <Pagination v-model:page="page" :total="500" show-quick-jumper />
        </Card>
        <Card width="50%">
          <Flex vertical>
            <Progress :percent="percent" />
            <Space align="center">
              <Progress type="circle" :percent="percent" />
              <Button @click="onDecline(5)" size="large" :icon="h(MinusOutlined)">Decline</Button>
              <Button @click="onIncrease(5)" size="large" :icon="h(PlusOutlined)">Increase</Button>
            </Space>
          </Flex>
        </Card>
        <Card width="50%">
          <Slider v-model:value="sliderValue" />
        </Card>
        <Card width="50%">
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
        <Card width="50%">
          <Steps :items="stepsItems" v-model:current="current" />
        </Card>
        <Swiper
          style="margin-left: 0"
          :images="images"
          :width="800"
          :height="450"
          :speed="800"
          :pagination="{
            dynamicBullets: true,
            clickable: true
          }"
        />
        <Card width="50%">
          <Tabs :items="tabItems" v-model:active-key="activeKey" />
        </Card>
        <TextScroll :items="scrollItems" />
        <Upload v-model:fileList="fileList" />
      </Flex>
    </ConfigProvider>
    <ul class="mt10 mb10">
      <li class="mb10"
        >色块与下方组件读取同一组 <code>CSS</code> 变量：二者位于同一 Provider
        作用域，不存在第二份色值，因此始终同步；</li
      >
      <li class="mb10"
        >示例覆盖全部 39 个消费主色的组件；<code>Table</code> 排序箭头、<code>Badge</code> 计数底、<code>Timeline</code>
        的 blue 圆点、<code>GradientText</code> 渐变端点均取自种子（点击表头可见）；</li
      >
      <li class="mb10"
        ><code>Tag</code> 的 processing 预设取主色，success / warning / error 取语义色（见「语义种子」）；其余 13
        个命名色为组件自有色板，与种子无关；</li
      >
      <li class="mb10"
        >深色皮肤（如 <code>Menu</code> 的
        <code>theme="dark"</code>）底色取种子派生的品牌色暗底：改主色时根列表、浮层面板与内联子菜单一起换；
      </li>
      <li>组件样式只消费 <code>var(--va-*)</code>，不参与换色计算：切换种子不会重建组件，也不会触发重渲染。</li>
    </ul>
    <h2 class="mt30 mb10">语义种子：success / warning / error / info</h2>
    <p class="mb10">
      <code>seed</code> 的 <code>success</code> / <code>warning</code> / <code>error</code> / <code>info</code> 与
      <code>primary</code> 共用同一套色阶规则：修改单个色值，Alert / Tag / 危险按钮的常态 / 浅底 / 描边同步更新。
    </p>
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
    <ul class="mt10 mb10">
      <li class="mb10"
        >每个语义色各自派生「常态 / 浅底 / 描边」，组件读
        <code>--va-{success,warning,error,info}-*</code>，不用逐个组件配置；
      </li>
      <li class="mb10"
        ><code>info</code> 未传时复用主色（链接色也取 <code>info</code>）；本例单独传了
        <code>info</code>，它就不再跟主色走；
      </li>
      <li
        ><code>neutralText</code> /
        <code>neutralBg</code>
        控制中性色阶（文字透明度、背景明暗），一般不用动；色值格式与例外规则见文档站「定制主题」。
      </li>
    </ul>
    <h2 class="mt30 mb10">明暗模式：light / dark / auto</h2>
    <p class="mb10">
      <code>theme.mode</code> 决定派生使用的色阶，<code>auto</code> 跟随系统 <code>prefers-color-scheme</code>；
      种子无需重写。本节默认展示暗色，切换即可对比两套默认表。
    </p>
    <Flex vertical>
      <Space class="mb10" align="center">
        mode:
        <Segmented v-model:value="mode" :options="modeOptions" />
      </Space>
      <!-- 只切 mode：带包裹元素时派生结果写到本子树，不覆盖 <html> 上的页面级主题 -->
      <ConfigProvider :abstract="false" :theme="{ mode }">
        <Card width="70%" title="作用域内的明暗切换">
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
    <h2 class="mt30 mb10">组件级主色：theme.components</h2>
    <p class="mb10">
      <code>theme.components.&lt;组件&gt;.primaryColor</code> 仅覆盖该组件的整套主色（常态 / 悬停 / 按下 / 浅底 /
      描边），其余组件仍取 <code>seed</code>。典型场景：按钮改为品牌绿，链接保持品牌蓝。
    </p>
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
    <ul class="mt10 mb10">
      <li class="mb10"
        >组件配置优先于 <code>seed</code> 与外层祖先上的 <code>--va-primary-*</code>，删掉后回落到 <code>seed</code>；
      </li>
      <li class="mb10">同一色值可同时配置多个组件（Button / Slider / Progress），各自独立派生；</li>
      <li>仅影响该组件自身的主色使用点；Slider 的轨道 / 手柄 / 气泡等细部件仍使用组件令牌（见下一节）。</li>
    </ul>
    <h2 class="mt30 mb10">组件令牌：单组件细节覆盖</h2>
    <p class="mb10">
      <code>theme.components</code> 覆盖整套主色；仅调整单个视觉面（滑动条轨道、手柄光环等）时，使用组件令牌
      <code>--va-&lt;组件&gt;-*</code>。组件令牌是公开的 CSS 变量，写在任意祖先选择器上即生效，无需
      <code>ConfigProvider</code>。
    </p>
    <div class="token-zone" :style="tokenStyle">
      <Flex vertical gap="middle">
        <Space align="center" wrap>
          <Button type="primary">Token Button</Button>
          <Button>Default Button</Button>
        </Space>
        <Slider :value="60" />
      </Flex>
    </div>
    <ul class="mt10 mb10">
      <li class="mb10">状态是成组的：只改常态会出现「悬停跳回默认色」，请整组覆盖（常态 / 悬停 / 按下）；</li>
      <li class="mb10"
        >一个视觉元素可能拆成多个令牌：Slider 的轨道与滑块的光环分别取值，只改轨道会让手柄停在默认主色；</li
      >
      <li>完整清单与整组覆盖示例见文档站「定制主题 - 组件级令牌」。</li>
    </ul>
    <h2 class="mt30 mb10">作用域换肤：嵌套 ConfigProvider</h2>
    <p class="mb10">
      典型场景：深色侧边栏、活动页局部换肤。在该区域外层再包一个 <code>ConfigProvider</code>，变量仅作用于这棵子树，
      兄弟节点不受影响。
    </p>
    <Flex vertical>
      <Space align="center">
        commonPrimaryColor:
        <ColorPicker style="width: 200px" v-model:value="commonPrimaryColor" :show-alpha="false" />
      </Space>
      <Space align="center">
        scopePrimaryColor:
        <ColorPicker style="width: 200px" v-model:value="scopePrimaryColor" :show-alpha="false" />
      </Space>
      <!-- 作用域换肤：外层也要带包裹元素，变量才能只落在本子树内、不覆盖 <html> 上的页面级主题 -->
      <ConfigProvider :abstract="false" :theme="theme">
        <Flex vertical gap="middle">
          <Space align="center" wrap>
            <span class="theme-caption">外层作用域</span>
            <Alert style="width: 180px" message="Outer Alert" type="info" show-icon />
            <Button type="primary">Outer Button</Button>
          </Space>
          <!-- 带包裹元素才能在子树内换肤；不加 abstract=false 时没有可承载变量的节点 -->
          <ConfigProvider :abstract="false" :theme="{ seed: { primary: scopePrimaryColor } }">
            <Flex vertical gap="small">
              <span class="theme-caption">子树作用域：只影响这里</span>
              <Space align="center" wrap>
                <Alert style="width: 180px" message="Scoped Alert" type="info" show-icon />
                <Button type="primary">Scoped Button</Button>
              </Space>
            </Flex>
          </ConfigProvider>
        </Flex>
      </ConfigProvider>
    </Flex>
    <ul class="mt10 mb10">
      <li class="mb10">变量写在包裹元素上、靠 CSS 继承生效，子树内的组件与更内层作用域都会取到它；</li>
      <li class="mb10"
        >内层只传 <code>seed</code> 的部分字段时是整个替换（不逐字段合并），没传的字段回落默认值；完全不传才继承外层；
      </li>
      <li class="mb10"
        >作用域内的浮层（Tooltip / Select 面板 / Modal）会带上当前令牌，不会因为挂到 body 就退回默认配色；</li
      >
      <li
        >页面级生效只能由最外层 <code>abstract: true</code> 写 <code>&lt;html&gt;</code>，嵌套层一律
        <code>abstract: false</code>。
      </li>
    </ul>
    <h2 class="mt30 mb10">运行期切换：响应式 theme</h2>
    <p class="mb10">
      <code>theme</code> 支持响应式传入：以 <code>computed</code> 包装后，切换种子，已挂载组件即时更新，无需刷新页面。
    </p>
    <Flex vertical>
      <Space align="center">
        <Switch v-model:value="overrideEnabled" />
        <span>切换主色（#1677ff ↔ #18a058）</span>
      </Space>
      <!-- 与上方的页面级主题并存：本段用包裹元素限定范围，避免覆盖 <html> 上的主题 -->
      <ConfigProvider :abstract="false" :theme="overrideTheme">
        <Space align="center">
          <Alert style="width: 200px" message="Info Text" type="info" show-icon />
          <Button type="primary">Primary Button</Button>
        </Space>
      </ConfigProvider>
    </Flex>
    <ul class="mt10 mb10">
      <li class="mb10"><code>theme</code> 为普通响应式数据：整体替换或就地改写 <code>seed.primary</code> 均生效；</li>
      <li>切换只重算 CSS 变量、不重建组件，因此输入内容与滚动位置不会丢失。</li>
    </ul>
    <h2 class="mt30 mb10">链接色：随种子派生</h2>
    <p class="mb10">
      链接色由种子派生：<code>--va-link-color</code> / <code>-hover</code> / <code>-active</code>
      随主色同步重算，页面链接与组件插槽内的链接一并更新，无需额外配置。
    </p>
    <Flex vertical>
      <Space align="center">
        linkPrimaryColor:
        <ColorPicker style="width: 200px" v-model:value="linkPrimaryColor" :show-alpha="false" />
      </Space>
      <ConfigProvider :abstract="false" :theme="{ seed: { primary: linkPrimaryColor } }">
        <Card width="50%" title="链接颜色跟随主题">
          <template #extra>
            <a href="#">more</a>
          </template>
          <p> 页面链接：<a href="#">Link 1</a> 与 <a href="#">Link 2</a> </p>
        </Card>
      </ConfigProvider>
    </Flex>
    <ul class="mt10 mb10">
      <li class="mb10"
        >链接基座是 <code>:where(a)</code>（特异性 0），你自己的 <code>a { color }</code> 会自然胜出，不需要
        <code>!important</code>；
      </li>
      <li
        >只想改链接、不动主色时，单独覆盖 <code>--va-link-color</code> / <code>-hover</code> /
        <code>-active</code> 三个变量即可。
      </li>
    </ul>
    <h2 class="mt30 mb10">自定义包裹元素：tag</h2>
    <p class="mb10">
      <code>abstract=false</code> 会渲染一层包裹元素，默认 <code>div</code>；<code>tag</code> 可改为
      <code>span</code> 等行内元素，避免在 <code>&lt;p&gt;</code> /
      <code>&lt;li&gt;</code> 内插入块级节点、破坏文档语义。
    </p>
    <ConfigProvider :abstract="false" tag="span" :theme="{ seed: { primary: '#ff6900' } }">
      <Button type="primary">Primary Button</Button>
    </ConfigProvider>
    <ul class="mt10 mb10">
      <li class="mb10"
        ><code>tag</code> 只在 <code>abstract=false</code> 时有效；<code>abstract=true</code> 不渲染包裹元素；</li
      >
      <li>包裹元素只承载变量与 <code>data-va-mode</code>，没有额外样式，不会影响原有布局。</li>
    </ul>
    <h2 class="mt30 mb10">离散 API 的主题</h2>
    <p class="mb10">
      <code>Tooltip</code>、<code>Select</code> 下拉、<code>Modal</code>、<code>Message</code> 等组件会
      <code>Teleport</code> 到 <code>body</code>，主题来源只有两条：页面内的组件自动携带所属 Provider 的令牌；
      组件树外调用 <code>createDiscreteApi()</code> 时按以下两种方式之一处理。
    </p>
    <h3 class="mt30 mb10">继承主应用主题</h3>
    <p class="mb10">
      不传 <code>configProviderProps</code>：浮层的 CSS 变量从 <code>&lt;html&gt;</code> 继承，跟随主应用主题实时变化。
    </p>
    <Flex vertical>
      <Space>
        <Button type="primary" @click="onDiscreteMessage">Discrete Message</Button>
        <Button type="primary" @click="onDiscreteNotification">Discrete Notification</Button>
        <Button type="primary" @click="onDiscreteModal">Discrete Modal</Button>
      </Space>
    </Flex>
    <h3 class="mt30 mb10">自定义主题</h3>
    <p class="mb10">
      传 <code>configProviderProps.theme</code>：浮层根节点内联该作用域的令牌与
      <code>data-va-mode</code>，与主应用主题互不影响；传 <code>computed</code> 时改色即时生效，无需重建实例。
    </p>
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
    <p class="mt10">
      两种方式都不会改写 <code>&lt;html&gt;</code>，<code>dispose()</code> 也不会误清除主应用的变量。
    </p>
    <h2 class="mt30 mb10">浮层层级：baseZIndex</h2>
    <p class="mb10">
      浮层层级需同时满足两点：弹窗内的下拉、提示不被遮罩覆盖；多个弹窗并存时，后打开者位于上层。组件自带默认层级，
      也可传 <code>baseZIndex</code> 交由 Provider 统一分配（后出现者在上，隐藏即归还，数值不会无限增大）。
    </p>
    <ConfigProvider :base-z-index="1000">
      <Button type="primary" @click="layerModalOpen = true">Open Modal</Button>
      <Modal v-model:open="layerModalOpen" title="弹窗内浮层">
        <Space align="center">
          <Tooltip tooltip="Vue Amazing UI">
            <Button>Hover me</Button>
          </Tooltip>
          <Select :options="selectOptions" v-model:value="layerSelectedValue" :width="200" />
        </Space>
      </Modal>
    </ConfigProvider>
    <h2 class="mt30 mb10">常见问题排查</h2>
    <ul class="mt10 mb10">
      <li class="mb10">只有某个组件不对：先看实例 <code>style</code> / <code>color</code> prop 是否覆盖。</li>
      <li class="mb10">悬停 / 按下跳回默认色：组件令牌只覆盖了常态，需整组覆盖（常态 / 悬停 / 按下）。</li>
      <li class="mb10">
        弹窗 / 下拉没跟随：检查是否在 Provider 子树内；页面级主题需在最外层用 <code>abstract: true</code>。
      </li>
      <li class="mb10">暗色只变了一半：纯 CSS 切暗色时 <code>data-va-mode</code> 要写在实际作用域节点上。</li>
      <li class="mb10"
        >自定义 SVG 不变色：<code>fill</code> 是 presentation attribute，不解析 <code>var()</code>，请写进
        <code>style</code>。
      </li>
      <li>完整排查表见文档站「定制主题 - 排查清单」。</li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.theme-tip {
  font-size: 12px;
  line-height: 1.6;
  color: var(--va-text-color-3);
}

.theme-caption {
  font-size: 12px;
  color: var(--va-text-color-3);
}

.theme-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.theme-swatch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--va-text-color-2);
}

.swatch {
  width: 16px;
  height: 16px;
  border: 1px solid var(--va-border-color);
  border-radius: 4px;
}

.swatch-primary {
  background: var(--va-primary-color);
}

.swatch-primary-hover {
  background: var(--va-primary-color-hover);
}

.swatch-primary-active {
  background: var(--va-primary-color-active);
}

.swatch-primary-bg {
  background: var(--va-primary-bg-color);
}

.swatch-primary-border {
  background: var(--va-primary-border-color);
}

.swatch-link {
  background: var(--va-link-color);
}

.token-zone {
  padding: 16px;
  border: 1px dashed var(--va-border-color);
  border-radius: 8px;
}
</style>
