<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TextScrollItem } from 'vue-amazing-ui'
const scrollItems = ref<TextScrollItem[]>([
  {
    title: '美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说',
    href: 'https://blog.csdn.net/Dandrose?type=blog',
    target: '_blank'
  },
  {
    title: '《麦田里的守望者》首次出版于1951年',
    href: 'https://blog.csdn.net/Dandrose?type=blog',
    target: '_blank'
  },
  {
    title: '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
  },
  {
    title: '并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界',
    href: 'https://blog.csdn.net/Dandrose?type=blog',
    target: '_blank'
  },
  {
    title: '愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣',
    href: 'https://blog.csdn.net/Dandrose?type=blog',
    target: '_blank'
  }
])
const singleItem: TextScrollItem = {
  title: '请用一只玫瑰纪念我 🌹'
}
const textScroll = ref()
const disabled = ref<boolean>(true)
const vertical = ref<boolean>(false)
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
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
  height: 50,
  fontSize: 16,
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.88)',
  backgroundColor: '#fff',
  hrefHoverColor: '#1677ff',
  amount: 4,
  gap: 20,
  speed: 48,
  vertical: false,
  duration: 1000,
  interval: 3000,
  pauseOnMouseEnter: false
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">水平文字滚动</h2>
    <TextScroll :items="scrollItems" @click="onClick" />
    <h2 class="mt30 mb10">垂直文字滚动</h2>
    <TextScroll
      style="background-color: #e6f4ff"
      :items="scrollItems"
      :item-style="{ fontSize: '20px' }"
      vertical
      @click="onClick"
    />
    <h2 class="mt30 mb10">单条文字滚动</h2>
    <Flex vertical>
      <TextScroll
        :items="singleItem"
        single
        :width="280"
        :item-style="{ fontSize: '24px', fontWeight: 600, color: 'darkred' }"
        @click="onClick"
      />
      <TextScroll
        :items="[singleItem]"
        vertical
        :width="300"
        :item-style="{ fontSize: '24px', fontWeight: 600, color: 'darkred' }"
        @click="onClick"
      />
    </Flex>
    <h2 class="mt30 mb10">自定义样式</h2>
    <TextScroll
      style="background-color: #e6f4ff; border-radius: 12px"
      :items="scrollItems"
      :item-style="{ fontSize: '20px', fontWeight: 500, color: '#FF9800' }"
      :height="60"
      @click="onClick"
    />
    <h2 class="mt30 mb10">自定义链接悬浮色</h2>
    <TextScroll :items="scrollItems" href-hover-color="#ff6900" @click="onClick" />
    <h2 class="mt30 mb10">自定义展示条数和间距</h2>
    <TextScroll :items="scrollItems" :amount="3" :gap="30" @click="onClick" />
    <h2 class="mt30 mb10">自定义滚动速度</h2>
    <Flex vertical>
      <TextScroll :items="scrollItems" :speed="72" @click="onClick" />
      <TextScroll :items="scrollItems" vertical :duration="800" :interval="2000" @click="onClick" />
    </Flex>
    <h2 class="mt30 mb10">鼠标移入暂停</h2>
    <Flex vertical>
      <TextScroll :items="scrollItems" pause-on-mouse-enter @click="onClick" />
      <TextScroll :items="scrollItems" vertical pause-on-mouse-enter @click="onClick" />
    </Flex>
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
      <TextScroll ref="textScroll" :vertical="vertical" :items="scrollItems" @click="onClick" />
    </Flex>
    <h2 class="mt30 mb10">文字滚动配置器</h2>
    <Flex vertical>
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
          <Flex gap="small" vertical>
            color:
            <ColorPicker v-model:value="state.color" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            backgroundColor:
            <ColorPicker v-model:value="state.backgroundColor" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            hrefHoverColor:
            <ColorPicker v-model:value="state.hrefHoverColor" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            amount:
            <Slider v-model:value="state.amount" :min="1" :max="scrollItems.length" />
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
            speed:
            <Slider v-model:value="state.speed" :min="10" :max="100" />
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
            duration:
            <Slider v-model:value="state.duration" :min="100" :step="100" :max="3000" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            interval:
            <Slider v-model:value="state.interval" :min="1000" :step="100" :max="10000" />
          </Flex>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical>
            pauseOnMouseEnter:
            <Switch v-model="state.pauseOnMouseEnter" />
          </Space>
        </Col>
      </Row>
      <TextScroll
        :style="`background-color: ${state.backgroundColor}`"
        :items="scrollItems"
        :single="state.single"
        :height="state.height"
        :item-style="{
          fontSize: state.fontSize + 'px',
          fontWeight: state.fontWeight,
          color: state.color
        }"
        :href-hover-color="state.hrefHoverColor"
        :amount="state.amount"
        :gap="state.gap"
        :speed="state.speed"
        :vertical="state.vertical"
        :duration="state.duration"
        :interval="state.interval"
        :pause-on-mouse-enter="state.pauseOnMouseEnter"
        @click="onClick"
      />
    </Flex>
  </div>
</template>
