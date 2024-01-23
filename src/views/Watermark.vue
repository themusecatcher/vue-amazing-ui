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
<template>
  <div>
    <h1>Watermark 水印</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Watermark content="Vue Amazing UI">
      <div style="height: 360px" />
    </Watermark>
    <h2 class="mt30 mb10">平行布局水印</h2>
    <Watermark layout="parallel" content="Vue Amazing UI">
      <div style="height: 360px" />
    </Watermark>
    <h2 class="mt30 mb10">多行水印</h2>
    <h3 class="mb10">通过 content 设置 字符串数组 指定多行文字水印内容。</h3>
    <Watermark :content="['Vue Amazing UI', 'Hello World']">
      <div style="height: 400px" />
    </Watermark>
    <h2 class="mt30 mb10">图片水印</h2>
    <h3 class="mb10">通过 image 指定图片地址。为保证图片高清且不被拉伸，请设置 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。</h3>
    <Watermark
      :height="30"
      :width="130"
      image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original">
      <div style="height: 360px" />
    </Watermark>
    <h2 class="mt30 mb10">全屏幕水印</h2>
    <Watermark v-if="show" fullscreen content="Vue Amazing UI"></Watermark>
    <Switch v-model:checked="show" />
    <h2 class="mt30 mb10">自定义配置</h2>
    <h3 class="mb10">通过自定义参数配置预览水印效果。</h3>
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
  </div>
</template>
<style>
.u-paragraph {
  margin-bottom: 1em;
  color: rgba(0, 0, 0, .88);
  word-break: break-word;
  line-height: 1.5714285714285714;
}
</style>
