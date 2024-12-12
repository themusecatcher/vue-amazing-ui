# 文字滚动 TextScroll

<GlobalElement />

*文字滚动*

## 何时使用

- 当需要公告消息水平或垂直滚动展示时

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
  title: '请用一只玫瑰纪念我 🌹',
  href: 'https://blog.csdn.net/Dandrose?type=blog',
  target: '_blank'
}
const textScroll = ref()
const disabled = ref(true)
const vertical = ref(false)
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
  height: 60,
  fontSize: 18,
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.88)',
  backgroundColor: '#FFF',
  amount: 4,
  gap: 20,
  speed: 48,
  vertical: false,
  duration: 1000,
  interval: 3000
})
</script>

## 水平文字滚动

<TextScroll :items="scrollItems" @click="onClick" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <TextScroll :items="scrollItems" @click="onClick" />
</template>
```

:::

## 垂直文字滚动

<TextScroll
  style="background-color: #e6f4ff"
  :items="scrollItems"
  :item-style="{ fontSize: '20px' }"
  vertical
  @click="onClick"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <TextScroll
    style="background-color: #e6f4ff"
    :items="scrollItems"
    :item-style="{ fontSize: '20px' }"
    vertical
    @click="onClick"
  />
</template>
```

:::

## 单条文字滚动

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TextScrollItem } from 'vue-amazing-ui'
const singleItem: TextScrollItem = {
  title: '请用一只玫瑰纪念我 🌹',
  href: 'https://blog.csdn.net/Dandrose?type=blog'
}
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <TextScroll
    :items="singleItem"
    single
    :width="280"
    :item-style="{ fontSize: '24px', fontWeight: 600, color: 'darkred' }"
    @click="onClick"
  />
</template>
```

:::

## 自定义样式

<TextScroll
  style="background-color: #e6f4ff; border-radius: 12px"
  :items="scrollItems"
  :item-style="{ fontSize: '20px', fontWeight: 500, color: '#FF9800' }"
  :height="60"
  @click="onClick"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <TextScroll
    style="background-color: #e6f4ff; border-radius: 12px"
    :items="scrollItems"
    :item-style="{ fontSize: '20px', fontWeight: 500, color: '#FF9800' }"
    :height="60"
    @click="onClick"
  />
</template>
```

:::

## 自定义链接悬浮样式

<TextScroll :items="scrollItems" href-hover-color="#ff6900" @click="onClick" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <TextScroll :items="scrollItems" href-hover-color="#ff6900" @click="onClick" />
</template>
```

:::

## 自定义展示条数和间距

<TextScroll
  :items="scrollItems"
  :amount="3"
  :gap="30"
  @click="onClick"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <TextScroll
    :items="scrollItems"
    :amount="3"
    :gap="30"
    @click="onClick"
  />
</template>
```

:::

## 自定义滚动速度

<Flex vertical>
  <TextScroll :items="scrollItems" :speed="72" @click="onClick" />
  <TextScroll :items="scrollItems" vertical :duration="800" :interval="2000" @click="onClick" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <Flex vertical>
    <TextScroll :items="scrollItems" :speed="72" @click="onClick" />
    <TextScroll :items="scrollItems" vertical :duration="800" :interval="2000" @click="onClick" />
  </Flex>
</template>
```

:::

## 使用 Methods

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
const textScroll = ref()
const disabled = ref(true)
const vertical = ref(false)
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
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
</template>
```

:::

## 文字滚动配置器

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
</Row>
<TextScroll
  class="mt30"
  :style="`background-color: ${state.backgroundColor}`"
  :items="scrollItems"
  :single="state.single"
  :height="state.height"
  :item-style="{
    fontSize: state.fontSize + 'px',
    fontWeight: state.fontWeight,
    color: state.color
  }"
  :amount="state.amount"
  :gap="state.gap"
  :speed="state.speed"
  :vertical="state.vertical"
  :duration="state.duration"
  :interval="state.interval"
  @click="onClick"
/>

::: details Show Code

```vue
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
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  costringle.log('item', item)
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
  speed: 48,
  vertical: false,
  duration: 1000,
  interval: 3000
})
</script>
<template>
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
  </Row>
  <TextScroll
    class="mt30"
    :style="`background-color: ${state.backgroundColor}`"
    :items="scrollItems"
    :single="state.single"
    :height="state.height"
    :item-style="{
      fontSize: state.fontSize + 'px',
      fontWeight: state.fontWeight,
      color: state.color
    }"
    :amount="state.amount"
    :gap="state.gap"
    :speed="state.speed"
    :vertical="state.vertical"
    :duration="state.duration"
    :interval="state.interval"
    @click="onClick"
  />
</template>
<style lang="less" scoped>
.mt30 {
  margin-top: 30px;
}
</style>
```

:::

<style lang="less" scoped>
.mt30 {
  margin-top: 30px;
}
</style>

## APIs

### TextScroll

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
items | 滚动文字数组，`single` 为 `true` 时，类型为 `Item`；多条文字水平滚动时，数组长度必须大于等于 `amount` 才能滚动 | [Item](#item-type)[] &#124; [Item](#item-type) | []
single | 是否启用单条文字滚动效果，水平滚动时生效，为 `true` 时，`amount` 自动设为 `1` | boolean | false
width | 滚动区域宽度，单位 `px` | string &#124; number | '100%'
height | 滚动区域高度，单位 `px` | number | 50
itemStyle | 滚动文字样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
hrefHoverColor | 链接文字鼠标悬浮颜色；仅当 `href` 存在时生效 | string | '#1677ff'
amount | 滚动区域展示条数，水平滚动时生效 | number | 4
gap | 水平滚动文字各列间距或垂直滚动文字两边的间距，单位 `px` |  number | 20
speed | 水平滚动时移动的速度，单位是像素每秒，水平滚动时生效 | number | 48
vertical | 是否垂直滚动 | boolean | false
duration | 垂直滚动过渡持续时间，单位 `ms`，垂直滚动时生效 | number | 1000
interval | 垂直文字滚动时间间隔，单位 `ms`，垂直滚动时生效 | number | 3000
pauseOnMouseEnter | 鼠标移入是否暂停滚动 | boolean | true

### Item Type

名称 | 说明 | 类型 | 默认
-- | -- | -- | --
title | 文字标题 | string | undefined
href? | 跳转链接 | string | undefined
target? | 跳转链接打开方式，`href` 存在时生效 | '_self' &#124; '_blank' | undefined

## Methods

名称 | 说明 | 类型
-- | -- | --
start | 开始滚动 | () => void
stop | 暂停滚动 | () => void
reset | 重置滚动 | () => void

## Events

名称 | 说明 | 类型
-- | -- | --
click | 点击标题时的回调 | (item: [Item](#item-type)) => void
