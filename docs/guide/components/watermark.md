# 水印 Watermark

<GlobalElement hide-watermark />

*给页面的某个区域加上水印*

## 何时使用

- 页面需要添加水印标识版权时使用
- 适用于防止信息盗用

<script setup lang="ts">
import { reactive, ref } from 'vue'
const show = ref(false)
const fixed = ref(true)
const imageModel = reactive({
  rotate: 0,
  borderRadius: 24
})
const model = reactive({
  content: 'Vue Amazing UI',
  layout: 'alternate',
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 400,
  zIndex: 9,
  rotate: -22,
  gap: [100, 100],
  offset: [50, 50]
})
const layoutOptions = [
  {
    label: 'alternate',
    value: 'alternate'
  },
  {
    label: 'parallel',
    value: 'parallel'
  }
]
</script>

## 基本使用

<Watermark content="Vue Amazing UI">
  <div style="height: 360px" />
</Watermark>

::: details Show Code

```vue
<template>
  <Watermark content="Vue Amazing UI">
    <div style="height: 360px" />
  </Watermark>
</template>
```

:::

## 平行布局水印

<Watermark layout="parallel" content="Vue Amazing UI">
  <div style="height: 360px" />
</Watermark>

::: details Show Code

```vue
<template>
  <Watermark layout="parallel" content="Vue Amazing UI">
    <div style="height: 360px" />
  </Watermark>
</template>
```

:::

## 多行水印

*通过 `content` 设置字符串数组，指定多行文字水印内容*

<Watermark :content="['Vue Amazing UI', 'Hello World']">
  <div style="height: 400px" />
</Watermark>

::: details Show Code

```vue
<template>
  <Watermark :content="['Vue Amazing UI', 'Hello World']">
    <div style="height: 400px" />
  </Watermark>
</template>
```

:::

## 图片水印

*通过 `image` 指定图片地址；为保证图片高清且不被拉伸，请设置 `width` 和 `height`；另支持设置图片旋转角度和展示区域的圆角*

<Flex>
  <Flex vertical :gap="8" :width="240">
    Rotate: <Slider v-model:value="imageModel.rotate" :step="1" :min="-180" :max="180" />
  </Flex>
  <Flex vertical :gap="8" :width="240">
    BorderRadius: <Slider v-model:value="imageModel.borderRadius" :step="1" :min="0" :max="100" />
  </Flex>
</Flex>
<Watermark
  :height="48"
  :width="48"
  :rotate="imageModel.rotate"
  :border-radius="imageModel.borderRadius"
  image="https://avatars.githubusercontent.com/u/46012811?v=4"
>
  <div style="height: 360px" />
</Watermark>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive } from 'vue'
const imageModel = reactive({
  rotate: 0,
  borderRadius: 24
})
</script>
<template>
  <Flex>
    <Flex vertical :gap="8" :width="240">
      Rotate: <Slider v-model:value="imageModel.rotate" :step="1" :min="-180" :max="180" />
    </Flex>
    <Flex vertical :gap="8" :width="240">
      BorderRadius: <Slider v-model:value="imageModel.borderRadius" :step="1" :min="0" :max="100" />
    </Flex>
  </Flex>
  <Watermark
    :height="48"
    :width="48"
    :rotate="imageModel.rotate"
    :border-radius="imageModel.borderRadius"
    image="https://avatars.githubusercontent.com/u/46012811?v=4"
  >
    <div style="height: 360px" />
  </Watermark>
</template>
```

:::

## 全屏幕水印

<Watermark v-if="show" fullscreen :fixed="fixed" content="Vue Amazing UI" :z-index="30"></Watermark>
<Space align="center">
  Fullscreen: <Switch v-model="show" />
  Fixed: <Switch v-model="fixed" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const fixed = ref(true)
</script>
<template>
  <Watermark v-if="show" fullscreen :fixed="fixed" content="Vue Amazing UI" :z-index="30"></Watermark>
  <Space align="center">
    Fullscreen: <Switch v-model="show" />
    Fixed: <Switch v-model="fixed" />
  </Space>
</template>
```

:::

## 水印配置器

*通过自定义参数配置预览水印效果*

<Row :gutter="24">
  <Col :span="18">
    <Watermark v-bind="model">
      <p class="paragraph-text">
        《麦田里的守望者》（英语：The Catcher in the Rye），为美国作家J.D.塞林格于1951年发表的长篇小说。这部有争议的作品原本是面向成年读者的，但迅速因其青春期焦虑和隔绝的主题而在青少年读者中流行。
      </p>
      <p class="paragraph-text">
        该书以主人公霍尔顿·考菲尔德第一人称口吻讲述自己被学校开除学籍后在纽约城游荡将近两昼夜，企图逃出虚伪的成人世界、去寻求纯洁与真理的经历与感受。
      </p>
      <p class="paragraph-text">
        该书于1951年出版之后，立刻引起巨大的轰动，受到读者──特别是青年人──的热烈的欢迎，被翻译为多国语版。小说每年大约有250,000本售出、总计为6500万本。《时代杂志》将《麦田里的守望者》列在“2005年度百大英语小说（自1923年起）”榜上，现代图书馆及其读者也将其列在20世纪百大英文小说榜上。赞赏者认为本书用青少年的口吻平铺直叙，增加了作品的感染力，传神地描写主角的内心思维，并说出了青少年不满成年世界充满虚伪欺瞒的心声。批评者则认为书中主角离经叛道，逃学、吸烟、喝酒又满嘴粗话，会给年轻读者带来不良影响。当时许多图书馆及学校将之列为禁书，并被列在America library Associations上。但现在这本书却是许多美国学校的指定读物。有的评论家说，它“大大地影响了好几代美国青年”。而且有学者认为，霍尔顿是当代美国文学中最早出现的反英雄形象之一。
      </p>
      <img
        style="max-width: 100%"
        src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg"
        alt="示例图片"
      />
    </Watermark>
  </Col>
  <Col :span="6">
    <Flex vertical :gap="12">
      Content:<Input v-model:value="model.content" /> Layout:<Radio
        :options="layoutOptions"
        v-model:value="model.layout"
        button
      />
      Color:<Input v-model:value="model.color" /> FontSize:<Slider
        v-model:value="model.fontSize"
        :step="1"
        :min="0"
        :max="100"
      />
      FontWeight:<InputNumber v-model:value="model.fontWeight" :step="100" :min="100" :max="1000" />
      zIndex:<Slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" /> Rotate:<Slider
        v-model:value="model.rotate"
        :step="1"
        :min="-180"
        :max="180"
      />
      Gap:
      <Flex>
        <InputNumber v-model:value="model.gap[0]" :min="0" placeholder="gapX" />
        <InputNumber v-model:value="model.gap[1]" :min="0" placeholder="gapY" />
      </Flex>
      Offset:
      <Flex>
        <InputNumber v-model:value="model.offset[0]" :min="0" placeholder="offsetLeft" />
        <InputNumber v-model:value="model.offset[1]" :min="0" placeholder="offsetTop" />
      </Flex>
    </Flex>
  </Col>
</Row>

<style lang="less" scoped>
.paragraph-text {
  margin-bottom: 1em;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.88);
  word-break: break-word;
  line-height: 1.5714285714285714;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
const model = reactive({
  content: 'Vue Amazing UI',
  layout: 'alternate',
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 400,
  zIndex: 9,
  rotate: -22,
  gap: [100, 100],
  offset: [50, 50]
})
const layoutOptions = [
  {
    label: 'alternate',
    value: 'alternate'
  },
  {
    label: 'parallel',
    value: 'parallel'
  }
]
</script>
<template>
  <Row :gutter="24">
    <Col :span="18">
      <Watermark v-bind="model">
        <p class="paragraph-text">
          《麦田里的守望者》（英语：The Catcher in the Rye），为美国作家J.D.塞林格于1951年发表的长篇小说。这部有争议的作品原本是面向成年读者的，但迅速因其青春期焦虑和隔绝的主题而在青少年读者中流行。
        </p>
        <p class="paragraph-text">
          该书以主人公霍尔顿·考菲尔德第一人称口吻讲述自己被学校开除学籍后在纽约城游荡将近两昼夜，企图逃出虚伪的成人世界、去寻求纯洁与真理的经历与感受。
        </p>
        <p class="paragraph-text">
          该书于1951年出版之后，立刻引起巨大的轰动，受到读者──特别是青年人──的热烈的欢迎，被翻译为多国语版。小说每年大约有250,000本售出、总计为6500万本。《时代杂志》将《麦田里的守望者》列在“2005年度百大英语小说（自1923年起）”榜上，现代图书馆及其读者也将其列在20世纪百大英文小说榜上。赞赏者认为本书用青少年的口吻平铺直叙，增加了作品的感染力，传神地描写主角的内心思维，并说出了青少年不满成年世界充满虚伪欺瞒的心声。批评者则认为书中主角离经叛道，逃学、吸烟、喝酒又满嘴粗话，会给年轻读者带来不良影响。当时许多图书馆及学校将之列为禁书，并被列在America library Associations上。但现在这本书却是许多美国学校的指定读物。有的评论家说，它“大大地影响了好几代美国青年”。而且有学者认为，霍尔顿是当代美国文学中最早出现的反英雄形象之一。
        </p>
        <img
          style="max-width: 100%"
          src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg"
          alt="示例图片"
        />
      </Watermark>
    </Col>
    <Col :span="6">
      <Flex vertical :gap="12">
        Content:<Input v-model:value="model.content" /> Layout:<Radio
          :options="layoutOptions"
          v-model:value="model.layout"
          button
        />
        Color:<Input v-model:value="model.color" /> FontSize:<Slider
          v-model:value="model.fontSize"
          :step="1"
          :min="0"
          :max="100"
        />
        FontWeight:<InputNumber v-model:value="model.fontWeight" :step="100" :min="100" :max="1000" />
        zIndex:<Slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" /> Rotate:<Slider
          v-model:value="model.rotate"
          :step="1"
          :min="-180"
          :max="180"
        />
        Gap:
        <Flex>
          <InputNumber v-model:value="model.gap[0]" :min="0" placeholder="gapX" />
          <InputNumber v-model:value="model.gap[1]" :min="0" placeholder="gapY" />
        </Flex>
        Offset:
        <Flex>
          <InputNumber v-model:value="model.offset[0]" :min="0" placeholder="offsetLeft" />
          <InputNumber v-model:value="model.offset[1]" :min="0" placeholder="offsetTop" />
        </Flex>
      </Flex>
    </Col>
  </Row>
</template>
<style lang="less" scoped>
.paragraph-text {
  margin-bottom: 1em;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.88);
  word-break: break-word;
  line-height: 1.5714285714285714;
}
</style>
```

:::

## APIs

### Watermark

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
width | 水印的宽度，默认为 `content` 自身的宽度，单位 `px` | number | undefined
height | 水印的高度，默认为 `content` 自身的高度，单位 `px` | number | undefined
layout | 水印的布局方式：平行布局 `parallel`; 交替布局 `alternate` | 'parallel' &#124; 'alternate' | 'alternate'
rotate | 水印绘制时，旋转的角度，单位 `°` | number | -22
zIndex | 追加的水印元素的 `z-index` | number| 90
image | 图片源，建议使用 `2` 倍或 `3` 倍图，优先级高于文字 | string | undefined
borderRadius | number | 设置图片水印圆角，该值对应图片圆形可展示区域的半径，仅当使用图片水印时生效 | undefined
content | 水印文字内容 | string &#124; string[] | undefined
fullscreen | 是否启用全屏水印 | boolean | false
fixed | 是否固定水印，仅当启用全屏水印时生效 | boolean | true
textStyle | 水印文字样式 | [Font](#font-type) | {<br/>&nbsp;&nbsp;color: 'rgba(0, 0, 0, 0.15)',<br/>&nbsp;&nbsp;fontSize: 16,<br/>&nbsp;&nbsp;fontWeight: 'normal',<br/>&nbsp;&nbsp;fontFamily: 'sans-serif',<br/>&nbsp;&nbsp;fontStyle: 'normal' <br/>}
gap | 水印之间的间距 | [number, number] | [100, 100]
offset | 水印距离容器左上角的偏移量，默认为 `gap/2` | [number, number] | [50, 50]

### Font Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
color | 字体颜色 | string | 'rgba(0, 0, 0, 0.15)'
fontSize | 字体大小，单位 `px` | number | 16
fontWeight | 字体粗细 | 'normal' &#124; 'light' &#124; 'weight' &#124; number | 'normal'
fontFamily | 字体类型 | string | 'sans-serif'
fontStyle | 字体样式 | 'none' &#124; 'normal' &#124; 'italic' &#124; 'oblique' | 'normal'

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义内容 | v-slot:default
