# 水印 Watermark

<BackTop />

<br/>

*给页面的某个区域加上水印*

## 何时使用

- 页面需要添加水印标识版权时使用
- 适用于防止信息盗用

<script setup lang="ts">
import { reactive, ref } from 'vue'
const model = reactive({
  content: 'Vue Amazing UI',
  layout: 'alternate',
  color: 'rgba(0,0,0,.15)',
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
const show = ref(false)
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

#### 通过 content 设置 字符串数组 指定多行文字水印内容。

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

#### 通过 image 指定图片地址。为保证图片高清且不被拉伸，请设置 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。

<Watermark
  :height="30"
  :width="130"
  image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original">
  <div style="height: 360px" />
</Watermark>

::: details Show Code

```vue
<template>
  <Watermark
    :height="30"
    :width="130"
    image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original">
    <div style="height: 360px" />
  </Watermark>
</template>
```

:::

## 全屏幕水印

<Watermark v-if="show" fullscreen content="Vue Amazing UI"></Watermark>
<Switch v-model:checked="show" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <Watermark v-if="show" fullscreen content="Vue Amazing UI"></Watermark>
  <Switch v-model:checked="show" />
</template>
```

:::

## 自定义配置

#### 通过自定义参数配置预览水印效果

<Flex>
  <Watermark v-bind="model">
    <p class="u-paragraph">
      The light-speed iteration of the digital world makes products more complex. However, human
      consciousness and attention resources are limited. Facing this design contradiction, the
      pursuit of natural interaction will be the consistent direction of Ant Design.
    </p>
    <p class="u-paragraph">
      Natural user cognition: According to cognitive psychology, about 80% of external
      information is obtained through visual channels. The most important visual elements in the
      interface design, including layout, colors, illustrations, icons, etc., should fully
      absorb the laws of nature, thereby reducing the user&apos;s cognitive cost and bringing
      authentic and smooth feelings. In some scenarios, opportunely adding other sensory
      channels such as hearing, touch can create a richer and more natural product experience.
    </p>
    <p class="u-paragraph">
      Natural user behavior: In the interaction with the system, the designer should fully
      understand the relationship between users, system roles, and task objectives, and also
      contextually organize system functions and services. At the same time, a series of methods
      such as behavior analysis, artificial intelligence and sensors could be applied to assist
      users to make effective decisions and reduce extra operations of users, to save
      users&apos; mental and physical resources and make human-computer interaction more
      natural.
    </p>
    <img
      style=" position: relative; z-index: 1; width: 100%; max-width: 800px;"
      src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg"
      alt="示例图片"
    />
  </Watermark>
  <Flex
    style="
      width: 25%;
      flex-shrink: 0;
      border-left: 1px solid #eee;
      padding-left: 20px;
      margin-left: 20px;
    "
    vertical
    gap="middle"
  >
    <p>Content</p>
    <Input v-model:value="model.content" />
    <p>Layout</p>
    <Radio :options="layoutOptions"  v-model:value="model.layout" />
    <p>Color</p>
    <Input v-model:value="model.color" />
    <p>FontSize</p>
    <Slider v-model:value="model.fontSize" :step="1" :min="0" :max="100" />
    <p>FontWeight</p>
    <InputNumber v-model:value="model.fontWeight" :step="100" :min="100" :max="1000" />
    <p>zIndex</p>
    <Slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" />
    <p>Rotate</p>
    <Slider v-model:value="model.rotate" :step="1" :min="-180" :max="180" />
    <p>Gap</p>
    <Space style="display: flex" align="baseline">
      <InputNumber v-model:value="model.gap[0]" :min="0" placeholder="gapX" />
      <InputNumber v-model:value="model.gap[1]" :min="0" placeholder="gapY" />
    </Space>
    <p>Offset</p>
    <Space style="display: flex" align="baseline">
      <InputNumber v-model:value="model.offset[0]" :min="0" placeholder="offsetLeft" />
      <InputNumber v-model:value="model.offset[1]" :min="0" placeholder="offsetTop" />
    </Space>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
const model = reactive({
  content: 'Vue Amazing UI',
  layout: 'alternate',
  color: 'rgba(0,0,0,.15)',
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
  <Flex>
    <Watermark v-bind="model">
      <p class="u-paragraph">
        The light-speed iteration of the digital world makes products more complex. However, human
        consciousness and attention resources are limited. Facing this design contradiction, the
        pursuit of natural interaction will be the consistent direction of Ant Design.
      </p>
      <p class="u-paragraph">
        Natural user cognition: According to cognitive psychology, about 80% of external
        information is obtained through visual channels. The most important visual elements in the
        interface design, including layout, colors, illustrations, icons, etc., should fully
        absorb the laws of nature, thereby reducing the user&apos;s cognitive cost and bringing
        authentic and smooth feelings. In some scenarios, opportunely adding other sensory
        channels such as hearing, touch can create a richer and more natural product experience.
      </p>
      <p class="u-paragraph">
        Natural user behavior: In the interaction with the system, the designer should fully
        understand the relationship between users, system roles, and task objectives, and also
        contextually organize system functions and services. At the same time, a series of methods
        such as behavior analysis, artificial intelligence and sensors could be applied to assist
        users to make effective decisions and reduce extra operations of users, to save
        users&apos; mental and physical resources and make human-computer interaction more
        natural.
      </p>
      <img
        style=" position: relative; z-index: 1; width: 100%; max-width: 800px;"
        src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg"
        alt="示例图片"
      />
    </Watermark>
    <Flex
      style="
        width: 25%;
        flex-shrink: 0;
        border-left: 1px solid #eee;
        padding-left: 20px;
        margin-left: 20px;
      "
      vertical
      gap="middle"
    >
      <p>Content</p>
      <Input v-model:value="model.content" />
      <p>Layout</p>
      <Radio :options="layoutOptions"  v-model:value="model.layout" />
      <p>Color</p>
      <Input v-model:value="model.color" />
      <p>FontSize</p>
      <Slider v-model:value="model.fontSize" :step="1" :min="0" :max="100" />
      <p>FontWeight</p>
      <InputNumber v-model:value="model.fontWeight" :step="100" :min="100" :max="1000" />
      <p>zIndex</p>
      <Slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" />
      <p>Rotate</p>
      <Slider v-model:value="model.rotate" :step="1" :min="-180" :max="180" />
      <p>Gap</p>
      <Space style="display: flex" align="baseline">
        <InputNumber v-model:value="model.gap[0]" :min="0" placeholder="gapX" />
        <InputNumber v-model:value="model.gap[1]" :min="0" placeholder="gapY" />
      </Space>
      <p>Offset</p>
      <Space style="display: flex" align="baseline">
        <InputNumber v-model:value="model.offset[0]" :min="0" placeholder="offsetLeft" />
        <InputNumber v-model:value="model.offset[1]" :min="0" placeholder="offsetTop" />
      </Space>
    </Flex>
  </Flex>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 水印的宽度，默认值为 `content` 自身的宽度 | number | undefined | false
height | 水印的高度，默认值为 `content` 自身的高度 | number | undefined | false
layout | 水印的布局方式：平行布局 `parallel`; 交替布局 `alternate` | 'parallel' &#124; 'alternate' | 'alternate' | false
rotate | 水印绘制时，旋转的角度，单位 `°` | number | -22 | false
zIndex | 追加的水印元素的 `z-index` | number| 9 | false
image | 图片源，建议使用 `2` 倍或 `3` 倍图，优先级高于文字 | string | undefined | false
content | 水印文字内容 | string &#124; string[] | '' | false
fullscreen | 是否展示全屏 | boolean | false | false
color | 字体颜色 | string | 'rgba(0,0,0,.15)' | false
fontSize | 字体大小，单位`px` | number | 16 | false
fontWeight | 字体粗细 | 'normal' &#124; 'light' &#124; 'weight' &#124; number | 'normal' | false
fontFamily | 字体类型 | string | 'sans-serif' | false
fontStyle | 字体样式 | 'none' &#124; 'normal' &#124; 'italic' &#124; 'oblique' | 'normal' | false
gap | 水印之间的间距 | [number, number] | [100, 100] | false
offset | 水印距离容器左上角的偏移量，默认为 `gap/2` | [number, number] | [50, 50] | false
