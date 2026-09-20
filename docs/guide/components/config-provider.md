# 全局化配置 ConfigProvider

<GlobalElement />

_为组件提供统一的全局化配置_

## 何时使用

- 当需要定制主题时
<!-- - 当需要为组件提供全局配置时 -->

<script setup lang="ts">
import { ref, computed, h, onMounted } from 'vue'
import { format } from 'date-fns'
import { MessageOutlined, CommentOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { ConfigProvider, createDiscreteApi, LoadingBar } from 'vue-amazing-ui'
import type { ConfigProviderProps, ConfigProviderTheme, CarouselImage, MessageApi, ModalApi, NotificationApi, SelectOption, StepsItem, TabsItem, TextScrollItem, UploadFileType } from 'vue-amazing-ui'
const primaryColor = ref<string>('#ff6900')
const commonPrimaryColor = ref<string>('#1677ff')
const buttonPrimaryColor = ref<string>('#18a058')
const theme = computed<ConfigProviderTheme>(() => ({
  common: {
    primaryColor: commonPrimaryColor.value
  },
  Button: {
    primaryColor: buttonPrimaryColor.value
  }
}))
const checkboxChecked = ref<boolean>(false)
const cardDate = ref<number>(Date.now())
const dateValue = ref<string>(format(new Date(), 'yyyy-MM-dd'))
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
const loadingBarRef = ref<InstanceType<typeof LoadingBar> | null>(null)
const messageRef = ref<MessageApi>()
const modalRef = ref<ModalApi>()
const notificationRef = ref<NotificationApi>()
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
// 主题同步到离散 API：createDiscreteApi 主题经 configProviderProps 显式传入（支持 Ref/computed 响应式）
const discretePrimaryColor = ref<string>('#ff6900')
const discreteConfigProviderProps = computed<ConfigProviderProps>(() => ({
  theme: {
    common: { primaryColor: discretePrimaryColor.value }
  }
}))
let discreteMessage: MessageApi | null = null
let discreteNotification: NotificationApi | null = null
let discreteModal: ModalApi | null = null
// createDiscreteApi 内部会创建 DOM 容器，SSR（Node）下需在挂载后调用
onMounted(() => {
  const discreteApi = createDiscreteApi(['message', 'notification', 'modal'], {
    configProviderProps: discreteConfigProviderProps
  })
  discreteMessage = discreteApi.message
  discreteNotification = discreteApi.notification
  discreteModal = discreteApi.modal
})
function onDiscreteMessage() {
  discreteMessage?.info('Discrete Message 经 configProviderProps 跟随主题色')
}
function onDiscreteNotification() {
  discreteNotification?.info({
    title: 'Discrete Notification',
    content: '经 configProviderProps 跟随主题色'
  })
}
function onDiscreteModal() {
  discreteModal?.info({
    title: 'Discrete Modal',
    content: '经 configProviderProps 跟随主题色'
  })
}
// 浮层层级管理：自动分配
const layerOpen = ref(false)
const layerSelectedValue = ref<number>(1)
</script>

## 基本使用

_`ConfigProvider` 使用 `Vue3` 的 `provide` / `inject` 特性，只需在应用外围包裹一次即可全局生效。_

<br/>

<Card title="以下示例已包含所有使用主题色的组件">
  <Space align="center">
    primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" />
  </Space>
</Card>
<br/>
<br/>
<ConfigProvider :theme="{ common: { primaryColor } }">
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
      <DatePicker v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
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
      <Select :options="selectOptions" v-model="selectedValue" />
      <Switch v-model="switchChecked" />
      <Textarea :width="360" v-model:value="textareaValue" placeholder="custom theme textarea" />
      <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
    </Space>
    <Calendar v-model:value="cardDate" display="card" />
    <Carousel style="margin-left: 0" :images="images" :height="450" />
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
    <LoadingBar ref="loadingBarRef" :container-style="{ position: 'absolute' }" :to="cardRef" />
    <div
      ref="cardRef"
      style="position: relative; width: 50%; padding: 48px 36px; border-radius: 4px; border: 1px solid #f0f0f0"
    >
      <Space>
        <Button type="primary" @click="loadingBarRef?.start()">Start</Button>
        <Button @click="loadingBarRef?.finish()">Finish</Button>
        <Button type="danger" @click="loadingBarRef?.error()">Error</Button>
      </Space>
    </div>
    <Pagination v-model:page="page" :total="500" show-quick-jumper />
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
        <Spin spinning indicator="spin-dot" />
        <Spin spinning indicator="spin-line" />
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

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { format } from 'date-fns'
import { MessageOutlined, CommentOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { LoadingBar } from 'vue-amazing-ui'
import type { CarouselImage, MessageApi, ModalApi, NotificationApi, SelectOption, StepsItem, TabsItem, TextScrollItem, UploadFileType } from 'vue-amazing-ui'
const primaryColor = ref<string>('#ff6900')
const checkboxChecked = ref<boolean>(false)
const cardDate = ref<number>(Date.now())
const dateValue = ref<string>(format(new Date(), 'yyyy-MM-dd'))
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
const loadingBarRef = ref<InstanceType<typeof LoadingBar> | null>(null)
const messageRef = ref<MessageApi>()
const modalRef = ref<ModalApi>()
const notificationRef = ref<NotificationApi>()
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
  <Card title="以下示例已包含所有使用主题色的组件">
    <Space align="center">
      primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" />
    </Space>
  </Card>
  <br/>
  <br/>
  <ConfigProvider :theme="{ common: { primaryColor } }">
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
        <DatePicker v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
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
        <Select :options="selectOptions" v-model="selectedValue" />
        <Switch v-model="switchChecked" />
        <Textarea :width="360" v-model:value="textareaValue" placeholder="custom theme textarea" />
        <Image src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" />
      </Space>
      <Calendar v-model:value="cardDate" display="card" />
      <Carousel style="margin-left: 0" :images="images" :height="450" />
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
      <LoadingBar ref="loadingBarRef" :container-style="{ position: 'absolute' }" :to="cardRef" />
      <div
        ref="cardRef"
        style="position: relative; width: 50%; padding: 48px 36px; border-radius: 4px; border: 1px solid #f0f0f0"
      >
        <Space>
          <Button type="primary" @click="loadingBarRef?.start()">Start</Button>
          <Button @click="loadingBarRef?.finish()">Finish</Button>
          <Button type="danger" @click="loadingBarRef?.error()">Error</Button>
        </Space>
      </div>
      <Pagination v-model:page="page" :total="500" show-quick-jumper />
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
          <Spin spinning indicator="spin-dot" />
          <Spin spinning indicator="spin-line" />
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

## 自定义组件主题

<Flex vertical>
  <Space align="center">
    commonPrimaryColor:<ColorPicker style="width: 200px" v-model:value="commonPrimaryColor" />
  </Space>
  <Space align="center">
    buttonPrimaryColor:<ColorPicker style="width: 200px" v-model:value="buttonPrimaryColor" />
  </Space>
  <ConfigProvider :theme="theme">
    <Space align="center">
      <Alert style="width: 200px" message="Info Text" type="info" show-icon />
      <Button type="primary">Primary Button</Button>
    </Space>
  </ConfigProvider>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const commonPrimaryColor = ref<string>('#1677ff')
const buttonPrimaryColor = ref<string>('#18a058')
// 必须用 computed 建立响应式关联，直接 ref 快照会导致 ColorPicker 改动不生效
const theme = computed<ConfigProviderTheme>(() => ({
  common: {
    primaryColor: commonPrimaryColor.value
  },
  Button: {
    primaryColor: buttonPrimaryColor.value
  }
}))
</script>
<template>
  <Flex vertical>
    <Space align="center">
      commonPrimaryColor:<ColorPicker style="width: 200px" v-model:value="commonPrimaryColor" />
    </Space>
    <Space align="center">
      buttonPrimaryColor:<ColorPicker style="width: 200px" v-model:value="buttonPrimaryColor" />
    </Space>
    <ConfigProvider :theme="theme">
      <Space align="center">
        <Alert style="width: 200px" message="Info Text" type="info" show-icon />
        <Button type="primary">Primary Button</Button>
      </Space>
    </ConfigProvider>
  </Flex>
</template>
```

:::

## 自定义包裹元素

<ConfigProvider :abstract="false" tag="span" :theme="{ common: { primaryColor: '#ff6900' } }">
  <Button type="primary">Primary Button</Button>
</ConfigProvider>

::: details Show Code

```vue
<template>
  <ConfigProvider :abstract="false" tag="span" :theme="{ common: { primaryColor: '#ff6900' } }">
    <Button type="primary">Primary Button</Button>
  </ConfigProvider>
</template>
```

:::

## 主题同步到离散 API

_`createDiscreteApi()` 的主题经第二参 `configProviderProps` 显式传入（支持 `Ref` / `computed`），与组件树内 `ConfigProvider` 共享同一份主题即可同步跟随，不再依赖模块级主题快照。_

<br/>

<Flex vertical>
  <Space align="center">
    primaryColor:
    <ColorPicker style="width: 200px" v-model:value="discretePrimaryColor" />
  </Space>
  <Space>
    <Button type="primary" @click="onDiscreteMessage">Discrete Message</Button>
    <Button type="primary" @click="onDiscreteNotification">Discrete Notification</Button>
    <Button type="primary" @click="onDiscreteModal">Discrete Modal</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { createDiscreteApi } from 'vue-amazing-ui'
import type { ConfigProviderProps, MessageApi, ModalApi, NotificationApi } from 'vue-amazing-ui'
// 主题同步到离散 API：createDiscreteApi 主题经 configProviderProps 显式传入（支持 Ref/computed 响应式）
const discretePrimaryColor = ref<string>('#ff6900')
const discreteConfigProviderProps = computed<ConfigProviderProps>(() => ({
  theme: {
    common: { primaryColor: discretePrimaryColor.value }
  }
}))
let discreteMessage: MessageApi | null = null
let discreteNotification: NotificationApi | null = null
let discreteModal: ModalApi | null = null
// createDiscreteApi 内部会创建 DOM 容器，SSR（Node）下需在挂载后调用
onMounted(() => {
  const discreteApi = createDiscreteApi(['message', 'notification', 'modal'], {
    configProviderProps: discreteConfigProviderProps
  })
  discreteMessage = discreteApi.message
  discreteNotification = discreteApi.notification
  discreteModal = discreteApi.modal
})
function onDiscreteMessage() {
  discreteMessage?.info('Discrete Message 跟随主题色')
}
function onDiscreteNotification() {
  discreteNotification?.info({
    title: 'Discrete Notification',
    content: '跟随主题色'
  })
}
function onDiscreteModal() {
  discreteModal?.info({
    title: 'Discrete Modal',
    content: '跟随主题色'
  })
}
</script>
<template>
  <Flex vertical>
    <Space align="center">
      primaryColor:
      <ColorPicker style="width: 200px" v-model:value="discretePrimaryColor" />
    </Space>
    <Space>
      <Button type="primary" @click="onDiscreteMessage">Discrete Message</Button>
      <Button type="primary" @click="onDiscreteNotification">Discrete Notification</Button>
      <Button type="primary" @click="onDiscreteModal">Discrete Modal</Button>
    </Space>
  </Flex>
</template>
```

:::

## 浮层层级管理

### 各组件默认层级

<br/>

浮层按类型划分层级：锚点跟随型浮层（`Tooltip` / `Select` 等）需高于承载它的视口固定型浮层（`Modal` / `Drawer` / `Dialog`），否则会被遮罩盖住：

| 浮层 | 默认层级 | 说明 |
| :--- | :--- | :--- |
| `Tooltip`（含 `Popover` / `Popconfirm` / `Ellipsis` / `ColorPicker` / `Rate` / `BackTop` / `FloatButton` 的气泡） | **1070** | 锚点跟随型需高于 `Modal` / `Drawer` / `Dialog` |
| `Select` / `AutoComplete`（含 `Cascader` / `Pagination` / `Calendar` 的下拉） | **1050** | 同上 |
| `Modal` / `Dialog` | **1000**（遮罩）/ **1010**（弹窗） | 弹窗在遮罩之上 `+10` |
| `Drawer` | **1000** | 遮罩在容器内按 DOM 顺序排列 |
| `Image` 全屏预览 | **1070**（遮罩）/ **1080**（预览）/ `1081`（操作按钮） | 预览高于 `Modal` / `Drawer` |
| `Message` / `Notification` | **1030** / **1040** | 全局反馈层：**高于承载层**（`Modal` 弹窗 `1010`）、**低于锚点跟随型浮层**（`Select` `1050` / `Tooltip` `1070`） |
| `LoadingBar` | **9999** | 始终在最上层 |
| `BackTop` | **9**（可配 `zIndex`） | 页面级控件，需**低于**浮层，不参与自动分配 |
| `FloatButton` | **99**（可配 `zIndex`） | 同上 |
| `Spin` 局部遮罩 | `9` | 相对自身容器的局部层级，不参与全局分配 |
| `Badge` / `Watermark` 装饰层 | `9` / `90`（可配 `zIndex`） | 装饰性叠加，不参与全局分配 |

上表的取值与 Ant Design Vue 的族偏移一致（其 `zIndexPopupBase: 1000`，`Tooltip +70`、`Select +50`、`Image +80`、`Affix = zIndexBase + 10`、`FloatButton 99`），因此迁移习惯一致。

反馈层刻意**不占据最高层级** —— 这样在消息 / 通知内容里放 `Select` / `Tooltip` 时，浮层不会被消息框压住。取值 `1030` / `1040` 是为了与 `Modal` 弹窗（`1010`）、`Select` 面板（`1050`）**都不打平**：同层级时上下关系会退化为 `DOM` 顺序（模板源码顺序），顺序不可控。`LoadingBar`（`9999`）始终保持最上。

### 自动分配（可选）

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
      <Select :options="selectOptions" v-model="layerSelectedValue" :width="200" />
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
        <Select :options="selectOptions" v-model="layerSelectedValue" :width="200" />
      </Space>
    </Modal>
  </ConfigProvider>
</template>
```

:::

## APIs

### ConfigProvider

| 参数    | 说明    | 类型                                                        | 默认值 |
| :------- | :------- | :----------------------------------------------------------- | :----- |
| theme   | 主题对象 | [ConfigProviderTheme](#theme-type)                                        | {}     |
| abstract | 是否不存在 `DOM` 包裹元素                                   | boolean | true   |
| tag     | `ConfigProvider` 被渲染成的元素，`abstract` 为 `true` 时有效 | string  | 'div'  |
| baseZIndex | 浮层起始层级（`z-index`），传入后各浮层按「后出现者在上」自增分配；不传则各组件沿用自身默认层级 | number | undefined |

### Theme Type

| 名称                                 | 说明                            | 类型                  | 默认值    |
| :------------------------------------ | :------------------------------- | :--------------------- | :-------- |
| common?                              | 全局通用配置，优先级低于组件配置 | [Config](#config-type) | undefined |
| [ComponentName?](#componentname-type) | 组件自定义配置                  | [Config](#config-type) | undefined |

### Config Type

| 名称         | 说明  | 类型  | 默认值    |
| :------------ | :----- | :----- | :-------- |
| primaryColor? | 主题色 | string | undefined |

### ComponentName Type

| 名称 | 值 |
| :-- | :-- |
| ComponentName | 'Alert' &#124; 'AutoComplete' &#124; 'BackTop' &#124; 'Button' &#124; 'Calendar' &#124; 'Carousel' &#124; 'Checkbox' &#124; 'ColorPicker' &#124; 'DatePicker' &#124; 'FloatButton' &#124; 'Image' &#124; 'Input' &#124; 'InputNumber' &#124; 'InputSearch' &#124; 'LoadingBar' &#124; 'Message' &#124; 'Modal' &#124; 'Notification' &#124; 'Pagination' &#124; 'Popconfirm' &#124; 'Progress' &#124; 'Radio' &#124; 'Select' &#124; 'Slider' &#124; 'Spin' &#124; 'Steps' &#124; 'Swiper' &#124; 'Switch' &#124; 'Tabs' &#124; 'Textarea' &#124; 'TextScroll' &#124; 'Upload' |

## Slots

| 名称   | 说明 | 类型           |
| :------ | :--- | :------------- |
| default | 内容 | v-slot:default |
