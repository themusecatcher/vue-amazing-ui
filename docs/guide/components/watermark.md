# 水印 Watermark

<GlobalElement hide-watermark />

_给页面的某个区域加上水印_

## 何时使用

- 页面需要添加水印标识版权时使用
- 适用于防止信息盗用

<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import { dateFormat } from 'vue-amazing-ui'
const realTime = ref<string>(dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS'))
let rafId = 0
const updateTime = () => {
  realTime.value = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS')
  rafId = requestAnimationFrame(updateTime)
}
// SSR（Node）环境无 requestAnimationFrame：挂载后启动，卸载时取消
onMounted(() => {
  rafId = requestAnimationFrame(updateTime)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
})
const show = ref(false)
const imageModel = reactive({
  rotate: 0,
  layout: 'alternate',
  opacity: 0.8
})
// 水印由 canvas 绘制、读不到 CSS 变量，故按当前明暗模式给出与主题令牌 --va-fill-color-3 一致的默认色
const { isDark } = useData()
const defaultTextColor = computed<string>(() => (isDark.value ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)'))
// 演示多行文字的排版：只放多行专属的字段，其余文字样式由水印配置器覆盖
const multiLineModel = reactive<{
  textAlign: 'left' | 'center' | 'right'
  lineHeight: number
}>({
  textAlign: 'center',
  lineHeight: 24
})
const alignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const variantOptions = [
  {
    label: 'normal',
    value: 'normal'
  },
  {
    label: 'small-caps',
    value: 'small-caps'
  }
]
const model = reactive({
  content: 'Vue Amazing UI',
  width: 120,
  height: 64,
  layout: 'alternate',
  rotate: -22,
  zIndex: 9,
  gap: [100, 100],
  offset: [50, 50],
  textStyle: {
    color: defaultTextColor.value,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'sans-serif',
    fontStyle: 'normal',
    fontVariant: 'normal'
  }
})
// 明暗切换时把仍是「模式默认色」的水印色一起换掉；经 ColorPicker 改过的颜色保持不动
watch(defaultTextColor, (color: string, previousColor: string) => {
  if (model.textStyle.color === previousColor) {
    model.textStyle.color = color
  }
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
const fontStyleOptions = [
  {
    label: 'normal',
    value: 'normal'
  },
  {
    label: 'italic',
    value: 'italic'
  },
  {
    label: 'oblique',
    value: 'oblique'
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

_`content` 传数组即为多行水印，每个元素占一行；下方可调 `textStyle.textAlign` 对齐与 `textStyle.lineHeight` 行高，颜色、字号等其余文字样式见下方水印配置器_

<Row :gutter="[24, 12]">
  <Col :span="8">
    <Flex gap="small" vertical>
      textAlign:<RadioGroup :options="alignOptions" v-model:value="multiLineModel.textAlign" button />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      lineHeight:<Slider v-model:value="multiLineModel.lineHeight" :step="1" :min="16" :max="80" />
    </Flex>
  </Col>
</Row>
<Watermark :content="['Vue Amazing UI', 'Hello World']" :text-style="multiLineModel">
  <div style="height: 400px" />
</Watermark>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive } from 'vue'
// 演示多行文字的排版：只放多行专属的字段，其余文字样式由水印配置器覆盖
const multiLineModel = reactive<{
  textAlign: 'left' | 'center' | 'right'
  lineHeight: number
}>({
  textAlign: 'center',
  lineHeight: 24
})
const alignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'right',
    value: 'right'
  }
]
</script>
<template>
  <Row :gutter="[24, 12]">
    <Col :span="8">
      <Flex gap="small" vertical>
        textAlign:<RadioGroup :options="alignOptions" v-model:value="multiLineModel.textAlign" button />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        lineHeight:<Slider v-model:value="multiLineModel.lineHeight" :step="1" :min="16" :max="80" />
      </Flex>
    </Col>
  </Row>
  <Watermark :content="['Vue Amazing UI', 'Hello World']" :text-style="multiLineModel">
    <div style="height: 400px" />
  </Watermark>
</template>
```

:::

## 实时水印

<Watermark :content="realTime" :text-style="{ fontFamily: 'Helvetica Neue' }">
  <div style="height: 360px" />
</Watermark>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { dateFormat } from 'vue-amazing-ui'
const realTime = ref<string>(dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS'))
let rafId = 0
const updateTime = () => {
  realTime.value = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS')
  rafId = requestAnimationFrame(updateTime)
}
// SSR（Node）环境无 requestAnimationFrame：挂载后启动，卸载时取消
onMounted(() => {
  rafId = requestAnimationFrame(updateTime)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
})
</script>
<template>
  <Watermark :content="realTime" :text-style="{ fontFamily: 'Helvetica Neue' }">
    <div style="height: 360px" />
  </Watermark>
</template>
```

:::

## 图片水印

_`image` 指定图片地址，未设置宽高时按原图比例推算单元格尺寸；下方可调 `layout` 布局、`rotate` 旋转与 `imageOpacity` 透明度_

<Flex>
  <Flex vertical :gap="8">
    layout: <RadioGroup :options="layoutOptions" v-model:value="imageModel.layout" button />
  </Flex>
  <Flex vertical :gap="8" :width="240">
    rotate: <Slider v-model:value="imageModel.rotate" :step="1" :min="-180" :max="180" />
  </Flex>
  <Flex vertical :gap="8" :width="240">
    imageOpacity: <Slider v-model:value="imageModel.opacity" :step="0.01" :min="0" :max="1" />
  </Flex>
</Flex>
<Watermark
  :layout="imageModel.layout"
  :rotate="imageModel.rotate"
  :image-opacity="imageModel.opacity"
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
  layout: 'alternate',
  opacity: 0.8
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
  <Flex>
    <Flex vertical :gap="8"> layout: <RadioGroup :options="layoutOptions" v-model:value="imageModel.layout" button /> </Flex>
    <Flex vertical :gap="8" :width="240">
      rotate: <Slider v-model:value="imageModel.rotate" :step="1" :min="-180" :max="180" />
    </Flex>
    <Flex vertical :gap="8" :width="240">
      imageOpacity: <Slider v-model:value="imageModel.opacity" :step="0.01" :min="0" :max="1" />
    </Flex>
  </Flex>
  <Watermark
    :layout="imageModel.layout"
    :rotate="imageModel.rotate"
    :image-opacity="imageModel.opacity"
    image="https://avatars.githubusercontent.com/u/46012811?v=4"
  >
    <div style="height: 360px" />
  </Watermark>
</template>
```

:::

## 全屏幕水印

_开启后水印钉住视口，页面滚动时始终覆盖整屏；需要水印随文档滚动时，用非全屏水印包住页面根内容即可_

<Watermark v-if="show" fullscreen content="Vue Amazing UI"></Watermark> <Space align="center"> fullscreen: <Switch v-model:value="show" /> </Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <Watermark v-if="show" fullscreen content="Vue Amazing UI"></Watermark>
  <Space align="center"> fullscreen: <Switch v-model:value="show" /> </Space>
</template>
```

:::

## 与浮层叠加

_水印是装饰层（默认 `z-index: 90`），始终位于 `Tooltip` 等浮层之下：浮层覆盖的地方看不到水印_

<br/>

<Watermark content="Vue Amazing UI" :gap="[60, 60]">
  <Flex
    align="center"
    justify="center"
    style="height: 240px; border: 1px dashed var(--va-border-color); border-radius: 8px"
  >
    <Tooltip placement="top">
      <template #tooltip>
        <div style="width: 168px; line-height: 1.6">我是浮层，水印在我下方：气泡覆盖到哪里，那里的水印就看不见了</div>
      </template>
      <Button>Hover me</Button>
    </Tooltip>
  </Flex>
</Watermark>

::: details Show Code

```vue
<template>
  <Watermark content="Vue Amazing UI" :gap="[60, 60]">
    <Flex
      align="center"
      justify="center"
      style="height: 240px; border: 1px dashed var(--va-border-color); border-radius: 8px"
    >
      <Tooltip placement="top">
        <template #tooltip>
          <div style="width: 168px; line-height: 1.6">我是浮层，水印在我下方：气泡覆盖到哪里，那里的水印就看不见了</div>
        </template>
        <Button>Hover me</Button>
      </Tooltip>
    </Flex>
  </Watermark>
</template>
```

:::

## 水印配置器

_下方表单覆盖组件的常用属性，改动实时生效；图片水印与全屏模式见上方用例，多行文字的对齐与行高见「多行水印」_

<Row :gutter="[24, 12]">
  <Col :span="8">
    <Flex gap="small" vertical>
      content:<Input v-model:value="model.content" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      width:<InputNumber v-model:value="model.width" :step="1" :min="0" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      height:<InputNumber v-model:value="model.height" :step="1" :min="0" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      layout:<RadioGroup :options="layoutOptions" v-model:value="model.layout" button />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      rotate:<Slider v-model:value="model.rotate" :step="1" :min="-180" :max="180" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      zIndex:<Slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      gap:<Flex>
        <InputNumber v-model:value="model.gap[0]" :min="0" placeholder="gapX" />
        <InputNumber v-model:value="model.gap[1]" :min="0" placeholder="gapY" />
      </Flex>
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      offset:<Flex>
        <InputNumber v-model:value="model.offset[0]" :min="0" placeholder="offsetLeft" />
        <InputNumber v-model:value="model.offset[1]" :min="0" placeholder="offsetTop" />
      </Flex>
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      color:<ColorPicker v-model:value="model.textStyle.color" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      fontSize:<Slider v-model:value="model.textStyle.fontSize" :step="1" :min="0" :max="100" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      fontWeight:<InputNumber v-model:value="model.textStyle.fontWeight" :step="100" :min="100" :max="1000" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      fontFamily:<Input v-model:value="model.textStyle.fontFamily" />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      fontStyle:<RadioGroup :options="fontStyleOptions" v-model:value="model.textStyle.fontStyle" button />
    </Flex>
  </Col>
  <Col :span="8">
    <Flex gap="small" vertical>
      fontVariant:<RadioGroup :options="variantOptions" v-model:value="model.textStyle.fontVariant" button />
    </Flex>
  </Col>
</Row>

<div style="margin-top: 20px">
  <Watermark v-bind="model">
    <p class="paragraph-text">
      《麦田里的守望者》（英语：The Catcher in the
      Rye），为美国作家J.D.塞林格于1951年发表的长篇小说。这部有争议的作品原本是面向成年读者的，但迅速因其青春期焦虑和隔绝的主题而在青少年读者中流行。
    </p>
    <p class="paragraph-text">
      该书以主人公霍尔顿·考菲尔德第一人称口吻讲述自己被学校开除学籍后在纽约城游荡将近两昼夜，企图逃出虚伪的成人世界、去寻求纯洁与真理的经历与感受。
    </p>
    <p class="paragraph-text">
      该书于1951年出版之后，立刻引起巨大的轰动，受到读者──特别是青年人──的热烈的欢迎，被翻译为多国语版。小说每年大约有250,000本售出、总计为6500万本。《时代杂志》将《麦田里的守望者》列在“2005年度百大英语小说（自1923年起）”榜上，现代图书馆及其读者也将其列在20世纪百大英文小说榜上。赞赏者认为本书用青少年的口吻平铺直叙，增加了作品的感染力，传神地描写主角的内心思维，并说出了青少年不满成年世界充满虚伪欺瞒的心声。批评者则认为书中主角离经叛道，逃学、吸烟、喝酒又满嘴粗话，会给年轻读者带来不良影响。当时许多图书馆及学校将之列为禁书，并被列在America
      library
      Associations上。但现在这本书却是许多美国学校的指定读物。有的评论家说，它“大大地影响了好几代美国青年”。而且有学者认为，霍尔顿是当代美国文学中最早出现的反英雄形象之一。
    </p>
    <img
      style="max-width: 100%"
      src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/6.jpg"
      alt="示例图片"
    />
  </Watermark>
</div>

<style lang="less" scoped>
.paragraph-text {
  margin-bottom: 1em;
  font-size: 16px;
  color: var(--va-text-color-1);
  word-break: break-word;
  line-height: 1.5714285714285714;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useData } from 'vitepress'
// 水印由 canvas 绘制、读不到 CSS 变量，故按当前明暗模式给出与主题令牌 --va-fill-color-3 一致的默认色
const { isDark } = useData()
const defaultTextColor = computed<string>(() => (isDark.value ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)'))
const model = reactive({
  content: 'Vue Amazing UI',
  width: 120,
  height: 64,
  layout: 'alternate',
  rotate: -22,
  zIndex: 9,
  gap: [100, 100],
  offset: [50, 50],
  textStyle: {
    color: defaultTextColor.value,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'sans-serif',
    fontStyle: 'normal',
    fontVariant: 'normal'
  }
})
// 明暗切换时把仍是「模式默认色」的水印色一起换掉；经 ColorPicker 改过的颜色保持不动
watch(defaultTextColor, (color: string, previousColor: string) => {
  if (model.textStyle.color === previousColor) {
    model.textStyle.color = color
  }
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
const fontStyleOptions = [
  {
    label: 'normal',
    value: 'normal'
  },
  {
    label: 'italic',
    value: 'italic'
  },
  {
    label: 'oblique',
    value: 'oblique'
  }
]
const variantOptions = [
  {
    label: 'normal',
    value: 'normal'
  },
  {
    label: 'small-caps',
    value: 'small-caps'
  }
]
</script>
<template>
  <Row :gutter="[24, 12]">
    <Col :span="8">
      <Flex gap="small" vertical>
        content:<Input v-model:value="model.content" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        width:<InputNumber v-model:value="model.width" :step="1" :min="0" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        height:<InputNumber v-model:value="model.height" :step="1" :min="0" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        layout:<RadioGroup :options="layoutOptions" v-model:value="model.layout" button />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        rotate:<Slider v-model:value="model.rotate" :step="1" :min="-180" :max="180" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        zIndex:<Slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        gap:<Flex>
          <InputNumber v-model:value="model.gap[0]" :min="0" placeholder="gapX" />
          <InputNumber v-model:value="model.gap[1]" :min="0" placeholder="gapY" />
        </Flex>
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        offset:<Flex>
          <InputNumber v-model:value="model.offset[0]" :min="0" placeholder="offsetLeft" />
          <InputNumber v-model:value="model.offset[1]" :min="0" placeholder="offsetTop" />
        </Flex>
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        color:<ColorPicker v-model:value="model.textStyle.color" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        fontSize:<Slider v-model:value="model.textStyle.fontSize" :step="1" :min="0" :max="100" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        fontWeight:<InputNumber v-model:value="model.textStyle.fontWeight" :step="100" :min="100" :max="1000" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        fontFamily:<Input v-model:value="model.textStyle.fontFamily" />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        fontStyle:<RadioGroup :options="fontStyleOptions" v-model:value="model.textStyle.fontStyle" button />
      </Flex>
    </Col>
    <Col :span="8">
      <Flex gap="small" vertical>
        fontVariant:<RadioGroup :options="variantOptions" v-model:value="model.textStyle.fontVariant" button />
      </Flex>
    </Col>
  </Row>

  <div style="margin-top: 20px">
    <Watermark v-bind="model">
      <p class="paragraph-text">
        《麦田里的守望者》（英语：The Catcher in the
        Rye），为美国作家J.D.塞林格于1951年发表的长篇小说。这部有争议的作品原本是面向成年读者的，但迅速因其青春期焦虑和隔绝的主题而在青少年读者中流行。
      </p>
      <p class="paragraph-text">
        该书以主人公霍尔顿·考菲尔德第一人称口吻讲述自己被学校开除学籍后在纽约城游荡将近两昼夜，企图逃出虚伪的成人世界、去寻求纯洁与真理的经历与感受。
      </p>
      <p class="paragraph-text">
        该书于1951年出版之后，立刻引起巨大的轰动，受到读者──特别是青年人──的热烈的欢迎，被翻译为多国语版。小说每年大约有250,000本售出、总计为6500万本。《时代杂志》将《麦田里的守望者》列在“2005年度百大英语小说（自1923年起）”榜上，现代图书馆及其读者也将其列在20世纪百大英文小说榜上。赞赏者认为本书用青少年的口吻平铺直叙，增加了作品的感染力，传神地描写主角的内心思维，并说出了青少年不满成年世界充满虚伪欺瞒的心声。批评者则认为书中主角离经叛道，逃学、吸烟、喝酒又满嘴粗话，会给年轻读者带来不良影响。当时许多图书馆及学校将之列为禁书，并被列在America
        library
        Associations上。但现在这本书却是许多美国学校的指定读物。有的评论家说，它“大大地影响了好几代美国青年”。而且有学者认为，霍尔顿是当代美国文学中最早出现的反英雄形象之一。
      </p>
      <img
        style="max-width: 100%"
        src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/6.jpg"
        alt="示例图片"
      />
    </Watermark>
  </div>
</template>

<style lang="less" scoped>
.paragraph-text {
  margin-bottom: 1em;
  font-size: 16px;
  color: var(--va-text-color-1);
  word-break: break-word;
  line-height: 1.5714285714285714;
}
</style>
```

:::

## APIs

### Watermark Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| content | 水印文字内容，传数组即为多行 | string &#124; string[] | undefined |
| image | 图片源，建议使用 `2` 倍或 `3` 倍图，优先级高于 `content` | string | undefined |
| imageOpacity | 图片水印的透明度，仅当传 `image` 时生效 | number | 1 |
| width | 水印的宽度，单位 `px`；默认图片按原图比例推算、文字按内容宽度 | number | undefined |
| height | 水印的高度，单位 `px`；默认图片按原图比例推算、文字按内容高度 | number | undefined |
| layout | 水印的布局方式：平行布局 `parallel`; 交替布局 `alternate` | 'parallel' &#124; 'alternate' | 'alternate' |
| rotate | 水印绘制时，旋转的角度，单位 `°` | number | -22 |
| textStyle | 水印文字样式；`color` 不传时取主题变量 `--va-fill-color-3`（随明暗切换） | [WatermarkFont](#watermarkfont-type) | {<br/>&nbsp;&nbsp;fontSize: 16,<br/>&nbsp;&nbsp;fontWeight: 'normal',<br/>&nbsp;&nbsp;fontFamily: 'sans-serif',<br/>&nbsp;&nbsp;fontStyle: 'normal' <br/>} |
| gap | 水印之间的间距 | [number, number] | [100, 100] |
| offset | 水印距离容器左上角的偏移量 | [number, number] | gap / 2 |
| zIndex | 追加的水印元素的 `z-index` | number | 90 |
| fullscreen | 是否启用全屏水印，启用后挂载到 `<html>` 并固定于视口 | boolean | false |

### WatermarkFont Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| color? | 字体颜色，默认取 `--va-fill-color-3`（浅色 `rgba(0,0,0,.15)` / 暗色 `rgba(255,255,255,.18)`） | string |
| fontSize? | 字体大小，单位 `px`，默认 `16` | number |
| fontWeight? | 字体粗细，默认 `'normal'` | 'normal' &#124; 'bold' &#124; 'lighter' &#124; 'bolder' &#124; number |
| fontFamily? | 字体类型，默认 `'sans-serif'` | string |
| fontStyle? | 字体样式，默认 `'normal'` | 'normal' &#124; 'italic' &#124; 'oblique' |
| fontVariant? | 字体变体，默认 `'normal'`；仅 `small-caps` 在 `font` 简写中合法 | 'normal' &#124; 'small-caps' |
| textAlign? | 多行文字的横向对齐方式，默认 `'center'`；单行无差异 | 'left' &#124; 'center' &#124; 'right' |
| lineHeight? | 多行文字的行高（相邻两行文本的距离），单位 `px`，默认 `fontSize × 1.2`（`16px` 时 `19px`）；同时决定单元格高度 | number |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 自定义内容 | v-slot:default |
