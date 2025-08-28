<script setup lang="ts">
import { reactive, ref } from 'vue'
import { dateFormat } from 'vue-amazing-ui'
const realTime = ref<string>(dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS'))
const updateTime = () => {
  realTime.value = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS')
  requestAnimationFrame(updateTime)
}
requestAnimationFrame(updateTime)
const show = ref(false)
const fixed = ref(true)
const imageModel = reactive({
  rotate: 0,
  layout: 'alternate'
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
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
    <h2 class="mt30 mb10">实时水印</h2>
    <Watermark :content="realTime" :text-style="{ fontFamily: 'Helvetica Neue' }">
      <div style="height: 360px" />
    </Watermark>
    <h2 class="mt30 mb10">图片水印</h2>
    <h3 class="mb10"
      >通过 image 指定图片地址；为保证图片高清且不被拉伸，请设置 width 和 height；另支持设置图片布局方式 layout
      和旋转角度 rotate 等</h3
    >
    <Flex>
      <Flex vertical :gap="8">
        Layout: <Radio :options="layoutOptions" v-model:value="imageModel.layout" button />
      </Flex>
      <Flex vertical :gap="8" :width="240">
        Rotate: <Slider v-model:value="imageModel.rotate" :step="1" :min="-180" :max="180" />
      </Flex>
    </Flex>
    <Watermark
      :height="48"
      :width="48"
      :layout="imageModel.layout"
      :rotate="imageModel.rotate"
      image="https://avatars.githubusercontent.com/u/46012811?v=4"
    >
      <div style="height: 360px" />
    </Watermark>
    <h2 class="mt30 mb10">全屏幕水印</h2>
    <Watermark v-if="show" fullscreen :fixed="fixed" content="Vue Amazing UI"></Watermark>
    <Space align="center"> Fullscreen: <Switch v-model="show" /> Fixed: <Switch v-model="fixed" /> </Space>
    <h2 class="mt30 mb10">水印配置器</h2>
    <h3 class="mb10">通过自定义参数配置预览水印效果</h3>
    <Row :gutter="24">
      <Col :span="18">
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
            src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/6.jpg"
            alt="示例图片"
          />
        </Watermark>
      </Col>
      <Col :span="6">
        <Flex vertical :gap="12">
          <Flex vertical> Content:<Input v-model:value="model.content" /> </Flex>
          <Flex vertical> Layout:<Radio :options="layoutOptions" v-model:value="model.layout" button /> </Flex>
          <Flex vertical> Color:<ColorPicker v-model:value="model.color" /> </Flex>
          <Flex vertical> FontSize:<Slider v-model:value="model.fontSize" :step="1" :min="0" :max="100" /> </Flex>
          <Flex vertical>
            FontWeight:<InputNumber v-model:value="model.fontWeight" :step="100" :min="100" :max="1000" />
          </Flex>
          <Flex vertical> zIndex:<Slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" /> </Flex>
          <Flex vertical> Rotate:<Slider v-model:value="model.rotate" :step="1" :min="-180" :max="180" /> </Flex>
          <Flex vertical>
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
        </Flex>
      </Col>
    </Row>
  </div>
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
