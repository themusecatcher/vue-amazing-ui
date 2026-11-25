<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, onBeforeUnmount, reactive } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const images = ref<WaterfallImage[]>([])
const state = reactive({
  columnCount: 3,
  horizontalGap: 20,
  verticalGap: 20,
  width: 100,
  borderRadius: 12,
  bgColor: '#e6f4ff'
})
const clicked = ref<WaterfallImage | null>(null) // 最近点击的图片
const clickedIndex = ref(-1) // 最近点击图片的下标
const dynamicImages = ref<WaterfallImage[]>([])
const PLACEHOLDER_BASE: WaterfallImage[] = [
  {
    name: '竖图 3:4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    aspectRatio: 0.75
  },
  {
    name: '横图 3:2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    aspectRatio: 1.5
  },
  {
    name: '方图 1:1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    aspectRatio: 1
  },
  {
    name: '失败示例',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/missing.jpg',
    aspectRatio: 1.33
  }
]
const placeholderImages = ref<WaterfallImage[]>(PLACEHOLDER_BASE.map((image) => ({ ...image })))
const LAZY_TOTAL = 60
const LAZY_RATIOS = [1.5, 0.75, 1, 1.33, 0.67, 1.14]
const lazyImages = ref<WaterfallImage[]>([])
const lazyRenderCount = ref(0)
const lazyWrapRef = ref<HTMLElement | null>(null)
let lazyObserver: MutationObserver | null = null
function createImage(index: number): WaterfallImage {
  return {
    name: `image-${index}`,
    src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${((index - 1) % 10) + 1}.jpg`
  }
}
function loadDynamicImages() {
  for (let i = 1; i <= 5; i++) {
    dynamicImages.value.push(createImage(i))
  }
}
function appendImages() {
  const start = dynamicImages.value.length + 1
  for (let i = start; i < start + 5; i++) {
    dynamicImages.value.push(createImage(i))
  }
}
function removeFirstImage() {
  dynamicImages.value.shift()
}
function clearImages() {
  dynamicImages.value = []
}
function handleClick(image: WaterfallImage, index: number, event: MouseEvent) {
  // 示例数据带 link：这里拦截跳转，专注演示 click 回调（删掉本行即恢复默认跳转）
  event.preventDefault()
  clicked.value = image
  clickedIndex.value = index
  console.log('click', image, index, event)
}
// 标题下方点击结果的主文案：未点击时给出操作提示
const clickMessage = computed(() => {
  const image = clicked.value
  if (!image) return '最近点击：暂无'
  return `最近点击：第 ${clickedIndex.value + 1} 张（${image.name ?? image.src}）`
})
// 辅助说明：点击后展示图片地址，未点击时提示回调参数的可见位置
const clickDescription = computed(() => {
  return clicked.value?.src ?? '点击任意图片，回调参数（image / index / event）会同时输出到控制台'
})
function formatPercent(value: number) {
  return `${value}%`
}
function formatPixel(value: number) {
  return `${value}px`
}
function loadImages() {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      name: `image-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`,
      link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`
    })
  }
}
function reloadPlaceholder() {
  // 追加时间戳绕过浏览器缓存，便于观察加载前的骨架
  const stamp = Date.now()
  placeholderImages.value = PLACEHOLDER_BASE.map((image) => ({ ...image, src: `${image.src}?t=${stamp}` }))
}
function loadLazyImages() {
  for (let i = 1; i <= LAZY_TOTAL; i++) {
    lazyImages.value.push({
      name: `lazy-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${((i - 1) % 10) + 1}.jpg`,
      aspectRatio: LAZY_RATIOS[(i - 1) % LAZY_RATIOS.length]
    })
  }
}
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
  loadLazyImages()
  loadDynamicImages()
})
onMounted(() => {
  // 统计已渲染数量，便于观察按需渲染的追加过程
  const element = lazyWrapRef.value
  if (!element) return
  lazyObserver = new MutationObserver(() => {
    lazyRenderCount.value = element.querySelectorAll('.waterfall-image').length
  })
  lazyObserver.observe(element, { childList: true, subtree: true })
})
onBeforeUnmount(() => {
  lazyObserver?.disconnect()
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Waterfall :images="images" />
    <h2 class="mt30 mb10">响应式列数</h2>
    <Waterfall :images="images" :column-count="{ xs: 1, sm: 2, md: 3, lg: 4 }" />
    <h2 class="mt30 mb10">间隙</h2>
    <Waterfall :images="images" :gap="[40, 8]" />
    <h2 class="mt30 mb10">点击事件</h2>
    <p class="mb10">
      <code>click</code> 回调会拿到当前图片与下标；图片带 <code>link</code> 时同样先派发事件，可在回调中
      <code>preventDefault()</code> 拦截跳转（下方示例即如此）。未设 <code>link</code> 的格子不进入
      <code>Tab</code> 序列，<code>click</code> 也就没有键盘等价路径（需要键盘可达时请为图片提供 <code>link</code>）
    </p>
    <Alert class="mb10" type="info" show-icon :message="clickMessage" :description="clickDescription" />
    <Waterfall :images="images" @click="handleClick" />
    <h2 class="mt30 mb10">动态增删</h2>
    <Space>
      <Button @click="appendImages">追加 5 张</Button>
      <Button @click="removeFirstImage">删除首张</Button>
      <Button @click="clearImages">清空</Button>
    </Space>
    <Waterfall :images="dynamicImages" class="mt20" />
    <h2 class="mt30 mb10">加载占位</h2>
    <p class="mb10">
      为图片提供
      <code>aspectRatio</code
      >（宽高比）后无需等待尺寸测量即可生成占位框，图片加载完成前显示骨架；加载失败时保留位置并显示失败图标。网络较快时骨架一闪而过，可点击「重新加载」或限速网络观察。
    </p>
    <Button class="mb20" @click="reloadPlaceholder">重新加载</Button>
    <Waterfall :images="placeholderImages" />
    <h2 class="mt30 mb10">按需渲染</h2>
    <p class="mb10">
      开启 <code>lazy</code> 后只渲染可视区下方约一屏的内容，滚动接近底部时按批追加；右上角计数随追加实时更新，全部
      {{ lazyImages.length }} 张渲染完成后停止。
    </p>
    <div ref="lazyWrapRef">
      <div style="position: sticky; top: 8px; z-index: 2; text-align: right">
        <Tag :color="lazyRenderCount === lazyImages.length ? 'success' : 'processing'">
          已渲染 {{ lazyRenderCount }} / {{ lazyImages.length }} 张
        </Tag>
      </div>
      <Waterfall :images="lazyImages" :lazy="true" :column-count="4" />
    </div>
    <h2 class="mt30 mb10">瀑布流配置器</h2>
    <Row :gutter="24">
      <Col :span="6">
        <Flex vertical>
          columnCount:
          <Slider :min="1" :max="6" v-model:value="state.columnCount" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical>
          gap: 水平 / 垂直
          <Flex gap="small">
            <InputNumber v-model:value="state.horizontalGap" :min="0" :max="100" placeholder="水平" />
            <InputNumber v-model:value="state.verticalGap" :min="0" :max="100" placeholder="垂直" />
          </Flex>
        </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical>
          width:
          <Slider :min="20" :max="100" :format-tooltip="formatPercent" v-model:value="state.width" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical>
          borderRadius:
          <Slider :min="0" :max="100" :format-tooltip="formatPixel" v-model:value="state.borderRadius" />
        </Flex>
      </Col>
      <Col :span="6" class="mt20">
        <Flex vertical>
          bgColor:
          <ColorPicker v-model:value="state.bgColor" />
        </Flex>
      </Col>
    </Row>
    <Waterfall
      class="mt30"
      :images="images"
      :column-count="state.columnCount"
      :gap="[state.horizontalGap, state.verticalGap]"
      :width="`${state.width}%`"
      :bg-color="state.bgColor"
      :border-radius="state.borderRadius"
    />
  </div>
</template>
