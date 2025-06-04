<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const images = ref<WaterfallImage[]>([])
const state = reactive({
  columnCount: 3,
  columnGap: 20,
  backgroundColor: '#e6f4ff',
  borderRadius: 12
})
function loadImages() {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      name: `image-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`
      // link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Waterfall :images="images" />
    <h2 class="mt30 mb10">瀑布流配置器</h2>
    <Row :gutter="24">
      <Col :span="6">
        <Flex vertical gap="middle">
          columnCount:
          <Slider :min="1" :max="6" v-model:value="state.columnCount" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical gap="middle">
          columnGap:
          <Slider :min="10" :max="100" v-model:value="state.columnGap" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical gap="middle">
          borderRadius:
          <Slider :min="0" :max="100" v-model:value="state.borderRadius" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical>
          backgroundColor:
          <ColorPicker v-model:value="state.backgroundColor" />
        </Flex>
      </Col>
    </Row>
    <Waterfall
      class="mt30"
      :images="images"
      :column-count="state.columnCount"
      :column-gap="state.columnGap"
      :background-color="state.backgroundColor"
      :border-radius="state.borderRadius"
    />
  </div>
</template>
