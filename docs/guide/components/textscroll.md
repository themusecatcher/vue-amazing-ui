# 文字滚动 TextScroll

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*文字滚动*

## 何时使用

- 当需要公告消息水平或垂直滚动展示时

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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
  title: '请用一只玫瑰纪念我...',
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

## 水平文字滚动

<TextScroll :scrollText="scrollText" @click="onClick" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
function onClick (text: string) { // 获取点击的标题
  console.log('text', text)
}
</script>
<template>
  <TextScroll :scrollText="scrollText" @click="onClick" />
</template>
```

:::

## 单条文字滚动

<TextScroll
  :scrollText="singleText"
  single
  :width="360"
  :text-style="{ fontSize: '24px', fontWeight: 600, color: '#FF5B29' }"
  @click="onClick"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const singleText = {
  title: '请用一只玫瑰纪念我...',
  href: 'https://blog.csdn.net/Dandrose?type=blog'
}
function onClick (text: string) { // 获取点击的标题
  console.log('text', text)
}
</script>
<template>
  <TextScroll
    :scrollText="singleText"
    single
    :width="360"
    :text-style="{ fontSize: '24px', fontWeight: 600, color: '#FF5B29' }"
    @click="onClick"
  />
</template>
```

:::

## 垂直文字滚动

<TextScroll
  :scrollText="scrollText"
  :board-style="{ backgroundColor: '#e6f4ff' }"
  :text-style="{ fontSize: '20px' }"
  vertical
  @click="onClick"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
function onClick (text: string) { // 获取点击的标题
  console.log('text', text)
}
</script>
<template>
  <TextScroll
    :scrollText="scrollText"
    :board-style="{ backgroundColor: '#e6f4ff' }"
    :text-style="{ fontSize: '20px' }"
    vertical
    @click="onClick"
  />
</template>
```

:::

## 自定义链接悬浮样式

<TextScroll :scrollText="scrollText" href-hover-color="#ff6900" @click="onClick" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
function onClick (text: string) { // 获取点击的标题
  console.log('text', text)
}
</script>
<template>
  <TextScroll :scrollText="scrollText" href-hover-color="#ff6900" @click="onClick" />
</template>
```

:::

## 自定义样式

<TextScroll
  :scrollText="scrollText"
  :board-style="{ backgroundColor: '#e6f4ff', borderRadius: '12px' }"
  :text-style="{ fontSize: '28px', color: '#FF9800' }"
  :amount="3"
  :height="80"
  @click="onClick"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
function onClick (text: string) { // 获取点击的标题
  console.log('text', text)
}
</script>
<template>
  <TextScroll
    :scrollText="scrollText"
    :board-style="{ backgroundColor: '#e6f4ff', borderRadius: '12px' }"
    :text-style="{ fontSize: '28px', color: '#FF9800' }"
    :amount="3"
    :height="80"
    @click="onClick"
  />
</template>
```

:::

## 使用 TextScroll Methods

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
  <TextScroll :vertical="vertical" ref="textScroll" :scrollText="scrollText" @click="onClick" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
function onClick (text: string) { // 获取点击的标题
  console.log('text', text)
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
    <TextScroll :vertical="vertical" ref="textScroll" :scrollText="scrollText" @click="onClick" />
  </Flex>
</template>
```

:::

## 自定义滚动速度

<TextScroll :scrollText="scrollText" :step="2" @click="onClick" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
function onClick (text: string) { // 获取点击的标题
  console.log('text', text)
}
</script>
<template>
  <TextScroll :scrollText="scrollText" :step="2" @click="onClick" />
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

::: details Show Code

```vue
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
    title:
      '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内'
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
function onClick(text: any) {
  // 获取点击的标题
  costringle.log('text', text)
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
scrollText | 滚动文字数组，`single: true` 时，类型为 `Text`；多条文字滚动时，数组长度必须大于等于 `amount` 才能滚动 | [Text](#text-type)[] &#124; [Text](#text-type) | []
single | 是否启用单条文字滚动效果，只支持水平文字滚动，为 `true` `时，amount` 自动设为 `1` | boolean | false
width | 滚动区域宽度，单位 `px` | number &#124; string | '100%'
height | 滚动区域高度，单位 `px` | number | 50
boardStyle | 滚动区域样式，优先级低于 `width`、`height` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
textStyle | 滚动文字样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
hrefHoverColor | 链接文字鼠标悬浮颜色；仅当 `href` 存在时生效 | string | '#1677ff'
amount | 滚动区域展示条数，水平滚动时生效 | number | 4
gap | 水平滚动文字各列间距或垂直滚动文字两边的边距，单位 `px` |  number | 20
interval | 水平滚动动画执行时间间隔，单位 `ms`，水平滚动时生效 | number | 10
step | 水平滚动动画每次执行时移动距离，单位 `px`，水平滚动时生效，与 `interval` 配合控制滚动速度 | number | 1
vertical | 是否垂直滚动 | boolean | false
verticalInterval | 垂直文字滚动时间间隔，单位 `ms`，垂直滚动时生效 | number | 3000

### Text Type

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
click | 点击标题时的回调 | (text: [Text](#text-type)) => void
