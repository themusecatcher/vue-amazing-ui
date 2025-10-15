# 全局化配置 ConfigProvider

<GlobalElement />

_为组件提供统一的全局化配置_

## 何时使用

- 当需要定制主题时
<!-- - 当需要为组件提供全局配置时 -->

<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
import { MessageOutlined, CommentOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { ConfigProviderTheme, CarouselImage, SelectOption, StepsItem, TabsItem, TextScrollItem, UploadFileType } from 'vue-amazing-ui'
const primaryColor = ref<string>('#ff6900')
const commonPrimaryColor = ref<string>('#1677ff')
const buttonPrimaryColor = ref<string>('#18a058')
const theme = ref<ConfigProviderTheme>({
  common: {
    primaryColor: commonPrimaryColor.value
  },
  Button: {
    primaryColor: buttonPrimaryColor.value
  }
})
const checkboxChecked = ref<boolean>(false)
const cardDate = ref<number>(Date.now())
const dateValue = ref<string>(format(new Date(), 'yyyy-MM-dd'))
const inputValue = ref<string>('')
const inputNumberValue = ref<number>(3)
const inputSearchValue = ref<string>('')
const cardRef = ref()
const loadingBarRef = ref()
const messageRef = ref()
const modalRef = ref()
const notificationRef = ref()
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
const options = ref<SelectOption[]>([
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

## 基本使用

_`ConfigProvider` 使用 `Vue3` 的 `provide` / `inject` 特性，只需在应用外围包裹一次即可全局生效。_

<br/>
<Card title="以下示例已包含所有使用主题色的组件" >
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
      <BackTop />
      <Button type="primary">Primary Button</Button>
      <Checkbox v-model:checked="checkboxChecked">Checkbox</Checkbox>
      <ColorPicker :width="200" />
      <DatePicker v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
      <Input :width="200" v-model:value="inputValue" placeholder="custom theme input" />
      <InputNumber :width="120" v-model:value="inputNumberValue" placeholder="please input" />
      <InputSearch
        :width="200"
        v-model:value="inputSearchValue"
        :search-props="{ type: 'primary' }"
        placeholder="input search"
      />
      <Button type="primary" @click="messageRef.info('This is an info message')">Show Message</Button>
      <Message ref="messageRef" />
      <Button
        type="primary"
        @click="modalRef.info({ title: 'This is an info modal', content: 'Some descriptions ...' })"
        >Show Modal</Button
      >
      <Modal ref="modalRef" />
      <Button
        type="primary"
        @click="notificationRef.info({ title: 'Notification Title', description: 'This is a normal notification' })"
        >Show Notification</Button
      >
      <Notification ref="notificationRef" />
      <Popconfirm title="Custom Theme" description="There will have some descriptions ..." icon="info">
        <Button type="primary">Show Confirm</Button>
      </Popconfirm>
      <Radio v-model:checked="radioChecked">Radio</Radio>
      <Select :options="options" v-model="selectedValue" />
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
        <Button type="primary" @click="loadingBarRef.start()">Start</Button>
        <Button @click="loadingBarRef.finish()">Finish</Button>
        <Button type="danger" @click="loadingBarRef.error()">Error</Button>
      </Space>
    </div>
    <Pagination v-model:page="page" :total="500" show-quick-jumper />
    <Card>
      <Flex vertical>
        <Progress :percent="percent" />
        <Space align="center">
          <Progress type="circle" :percent="percent" />
          <Button @click="onDecline(5)" size="large" :icon="MinusOutlined">Decline</Button>
          <Button @click="onIncrease(5)" size="large" :icon="PlusOutlined">Increase</Button>
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
import { ref } from 'vue'
import { format } from 'date-fns'
import { MessageOutlined, CommentOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { CarouselImage, SelectOption, StepsItem, TabsItem, TextScrollItem, UploadFileType } from 'vue-amazing-ui'
const primaryColor = ref<string>('#ff6900')
const checkboxChecked = ref<boolean>(false)
const cardDate = ref<number>(Date.now())
const dateValue = ref<string>(format(new Date(), 'yyyy-MM-dd'))
const inputValue = ref<string>('')
const inputNumberValue = ref<number>(3)
const inputSearchValue = ref<string>('')
const cardRef = ref()
const loadingBarRef = ref()
const messageRef = ref()
const modalRef = ref()
const notificationRef = ref()
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
const options = ref<SelectOption[]>([
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
  <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
  <br />
  <br />
  <ConfigProvider :theme="{ common: { primaryColor } }">
    <Flex vertical>
      <Space align="center">
        <Alert style="width: 200px" message="Info Text" type="info" show-icon />
        <BackTop />
        <Button type="primary">Primary Button</Button>
        <Checkbox v-model:checked="checkboxChecked">Checkbox</Checkbox>
        <ColorPicker :width="200" />
        <DatePicker v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
        <Input :width="200" v-model:value="inputValue" placeholder="custom theme input" />
        <InputNumber :width="120" v-model:value="inputNumberValue" placeholder="please input" />
        <InputSearch
          :width="200"
          v-model:value="inputSearchValue"
          :search-props="{ type: 'primary' }"
          placeholder="input search"
        />
        <Button type="primary" @click="messageRef.info('This is an info message')">Show Message</Button>
        <Message ref="messageRef" />
        <Button
          type="primary"
          @click="modalRef.info({ title: 'This is an info modal', content: 'Some descriptions ...' })"
          >Show Modal</Button
        >
        <Modal ref="modalRef" />
        <Button
          type="primary"
          @click="notificationRef.info({ title: 'Notification Title', description: 'This is a normal notification' })"
          >Show Notification</Button
        >
        <Notification ref="notificationRef" />
        <Popconfirm title="Custom Theme" description="There will have some descriptions ..." icon="info">
          <Button type="primary">Show Confirm</Button>
        </Popconfirm>
        <Radio v-model:checked="radioChecked">Radio</Radio>
        <Select :options="options" v-model="selectedValue" />
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
          <Button type="primary" @click="loadingBarRef.start()">Start</Button>
          <Button @click="loadingBarRef.finish()">Finish</Button>
          <Button type="danger" @click="loadingBarRef.error()">Error</Button>
        </Space>
      </div>
      <Pagination v-model:page="page" :total="500" show-quick-jumper />
      <Card>
        <Flex vertical>
          <Progress :percent="percent" />
          <Space align="center">
            <Progress type="circle" :percent="percent" />
            <Button @click="onDecline(5)" size="large" :icon="MinusOutlined">Decline</Button>
            <Button @click="onIncrease(5)" size="large" :icon="PlusOutlined">Increase</Button>
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
  <ConfigProvider
    :theme="{ common: { primaryColor: commonPrimaryColor }, Button: { primaryColor: buttonPrimaryColor } }"
  >
    <Space align="center">
      <Alert style="width: 200px" message="Info Text" type="info" show-icon />
      <Button type="primary">Primary Button</Button>
    </Space>
  </ConfigProvider>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'
const commonPrimaryColor = ref<string>('#1677ff')
const buttonPrimaryColor = ref<string>('#18a058')
const theme = ref<ConfigProviderTheme>({
  common: {
    primaryColor: commonPrimaryColor.value
  },
  Button: {
    primaryColor: buttonPrimaryColor.value
  }
})
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

## APIs

### ConfigProvider

| 参数     | 说明     | 类型                                                         | 默认值 |
| :------- | :------- | :----------------------------------------------------------- | :----- |
| theme    | 主题对象 | [Theme](#theme-type)                                         | {}     |
| abstract | boolean  | 是否不存在 `DOM` 包裹元素                                    | true   |
| tag      | string   | `ConfigProvider` 被渲染成的元素，`abstract` 为 `true` 时有效 | 'div'  |

### Theme Type

| 名称                                  | 说明                             | 类型                   | 默认值    |
| :------------------------------------ | :------------------------------- | :--------------------- | :-------- |
| common?                               | 全局通用配置，优先级低于组件配置 | [Config](#config-type) | undefined |
| [ComponentName?](#componentname-type) | 组件自定义配置                   | [Config](#config-type) | undefined |

### Config Type

| 名称          | 说明   | 类型   | 默认值    |
| :------------ | :----- | :----- | :-------- |
| primaryColor? | 主题色 | string | undefined |

### ComponentName Type

| 名称 | 值 |
| :-- | :-- |
| ComponentName | 'Alert' &#124; 'BackTop' &#124; 'Button' &#124; 'Calendar' &#124; 'Carousel' &#124; 'Checkbox' &#124; 'ColorPicker' &#124; 'DatePicker' &#124; 'FloatButton' &#124; 'Image' &#124; 'Input' &#124; 'InputNumber' &#124; 'InputSearch' &#124; 'LoadingBar' &#124; 'Message' &#124; 'Modal' &#124; 'Notification' &#124; 'Pagination' &#124; 'Popconfirm' &#124; 'Progress' &#124; 'Radio' &#124; 'Select' &#124; 'Slider' &#124; 'Spin' &#124; 'Steps' &#124; 'Swiper' &#124; 'Switch' &#124; 'Tabs' &#124; 'Textarea' &#124; 'TextScroll' &#124; 'Upload' |

## Slots

| 名称    | 说明 | 类型           |
| :------ | :--- | :------------- |
| default | 内容 | v-slot:default |
