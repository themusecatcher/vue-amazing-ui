<script setup lang="ts">
import { ref, reactive } from 'vue'
const scrollText = ref<any[]>([
  {
    title: '美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说',
    href: 'https://blog.csdn.net/Dandrose?type=blog'
  },
  {
    title: '首次出版于1951年',
    href: 'https://blog.csdn.net/Dandrose?type=blog'
  },
  {
    title: '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
  },
  {
    title: '并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界',
    href: 'https://blog.csdn.net/Dandrose?type=blog'
  },
  {
    title: '愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣',
    href: 'https://blog.csdn.net/Dandrose?type=blog'
  }
])
const singleText = {
  title: '请用一只玫瑰纪念我 🌹',
  href: 'https://blog.csdn.net/Dandrose?type=blog'
}
const textScroll = ref()
const disabled = ref(true)
const vertical = ref(false)
function onClick(text: string) {
  // 获取点击的标题
  console.log('text', text)
}
function handleStart() {
  textScroll.value.start()
  disabled.value = true
}
function handleStop() {
  textScroll.value.stop()
  disabled.value = false
}
function handleReset() {
  textScroll.value.reset()
  disabled.value = true
}
const state = reactive({
  single: false,
  height: 60,
  fontSize: 18,
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.88)',
  backgroundColor: '#FFF',
  amount: 4,
  gap: 20,
  interval: 10,
  step: 1,
  vertical: false,
  verticalInterval: 3000
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">水平文字滚动</h2>
    <TextScroll :scrollText="scrollText" @click="onClick" />
    <h2 class="mt30 mb10">单条文字滚动</h2>
    <TextScroll
      :scrollText="singleText"
      single
      :width="270"
      :text-style="{ fontSize: '24px', fontWeight: 600, color: 'darkred' }"
      @click="onClick"
    />
    <h2 class="mt30 mb10">垂直文字滚动</h2>
    <TextScroll
      :scrollText="scrollText"
      :board-style="{ backgroundColor: '#e6f4ff' }"
      :text-style="{ fontSize: '20px' }"
      vertical
      @click="onClick"
    />
    <h2 class="mt30 mb10">自定义链接悬浮样式</h2>
    <TextScroll :scrollText="scrollText" href-hover-color="#ff6900" @click="onClick" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <TextScroll
      :scrollText="scrollText"
      :board-style="{ backgroundColor: '#e6f4ff', borderRadius: '12px' }"
      :text-style="{ fontSize: '28px', color: '#FF9800' }"
      :gap="30"
      :height="80"
      @click="onClick"
    />
    <h2 class="mt30 mb10">使用 Methods</h2>
    <Flex vertical>
      <Space vertical>
        <Space align="center">
          vertical:
          <Switch v-model="vertical" />
        </Space>
        <Space>
          <Button type="primary" :disabled="disabled" @click="handleStart">开始</Button>
          <Button @click="handleStop">暂停</Button>
          <Button type="primary" ghost @click="handleReset">重置</Button>
        </Space>
      </Space>
      <TextScroll ref="textScroll" :vertical="vertical" :scrollText="scrollText" @click="onClick" />
    </Flex>
    <h2 class="mt30 mb10">自定义滚动速度</h2>
    <TextScroll :scrollText="scrollText" :step="2" @click="onClick" />
    <h2 class="mt30 mb10">文字滚动配置器</h2>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Flex gap="small" vertical>
          height:
          <Slider v-model:value="state.height" :min="6" :max="180" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          fontSize:
          <Slider v-model:value="state.fontSize" :min="6" :max="180" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          fontWeight:
          <InputNumber v-model:value="state.fontWeight" :step="100" :min="100" :max="1000" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          color:
          <Input v-model:value="state.color" placeholder="color" />
        </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          backgroundColor:
          <Input v-model:value="state.backgroundColor" placeholder="backgroundColor" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          amount:
          <Slider v-model:value="state.amount" :min="1" :max="scrollText.length" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          gap:
          <Slider v-model:value="state.gap" :min="10" :max="100" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          interval:
          <Slider v-model:value="state.interval" :min="5" :max="100" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          step:
          <Slider v-model:value="state.step" :min="0.1" :step="0.1" :max="20" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          vertical:
          <Switch v-model="state.vertical" />
        </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          verticalInterval:
          <Slider v-model:value="state.verticalInterval" :min="1000" :step="100" :max="10000" />
        </Flex>
      </Col>
    </Row>
    <TextScroll
      class="mt30"
      :scrollText="scrollText"
      :single="state.single"
      :height="state.height"
      :board-style="{
        backgroundColor: state.backgroundColor
      }"
      :text-style="{
        fontSize: state.fontSize + 'px',
        fontWeight: state.fontWeight,
        color: state.color
      }"
      :amount="state.amount"
      :gap="state.gap"
      :interval="state.interval"
      :step="state.step"
      :vertical="state.vertical"
      :vertical-interval="state.verticalInterval"
      @click="onClick"
    />
  </div>
</template>
