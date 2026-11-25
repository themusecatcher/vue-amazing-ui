# 瀑布流 Waterfall

<GlobalElement />

_瀑布流图片展示_

::: tip 说明

- 宽度固定，图片等比例缩放；使用 `JS` 获取每张图片宽度和高度，结合 `relative` 和 `absolute` 定位计算每个图片的位置 `top`、`left`，保证每张新的图片都追加在当前高度最小的那列末尾

- 每张图片一进入列表就会生成占位框：加载完成前展示呼吸骨架，加载失败时已落位的格子保留位置并显示失败图标；提供 `aspectRatio`（宽高比）时无需测量即可按真实比例占位，未提供时先按 `1:1` 占位、尺寸取回后原地精化（连尺寸都取不到则跳过该图、不占位，且在 `images` 数组变化前不再重试）

- 开启 `lazy` 后只渲染可视区下方约一屏的内容，滚动接近底部时按批追加
:::

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

## 基本使用

<Waterfall :images="images" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const images = ref<WaterfallImage[]>([])
function loadImages() {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      name: `image-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`,
      link: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <Waterfall :images="images" />
</template>
```

:::

## 响应式列数

`columnCount` 可写成响应式对象，按视口宽度取列数；当前视口未命中的断点会回落到已配置的更小断点：

<br/>

<Waterfall :images="images" :column-count="{ xs: 1, sm: 2, md: 3, lg: 4 }" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const images = ref<WaterfallImage[]>([])
function loadImages() {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      name: `image-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  loadImages()
})
</script>
<template>
  <Waterfall :images="images" :column-count="{ xs: 1, sm: 2, md: 3, lg: 4 }" />
</template>
```

:::

## 间隙

`gap` 传数字时行列同值，传数组时表示 [水平间距, 垂直间距]：

<br/>

<Waterfall :images="images" :gap="[40, 8]" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const images = ref<WaterfallImage[]>([])
function loadImages() {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      name: `image-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`
    })
  }
}
onBeforeMount(() => {
  loadImages()
})
</script>
<template>
  <Waterfall :images="images" :gap="[40, 8]" />
</template>
```

:::

## 点击事件

`click` 回调会拿到当前图片与下标；图片带 `link` 时同样先派发事件，可在回调中 `preventDefault()` 拦截跳转（下方示例即如此）。未设 `link` 的格子不进入 `Tab` 序列，`click` 也就没有键盘等价路径（需要键盘可达时请为图片提供 `link`）：

<br/>

<Alert type="info" show-icon :message="clickMessage" :description="clickDescription" />
<br/>
<Waterfall :images="images" @click="handleClick" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const images = ref<WaterfallImage[]>([])
const clicked = ref<WaterfallImage | null>(null) // 最近点击的图片
const clickedIndex = ref(-1) // 最近点击图片的下标
function loadImages() {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      name: `image-${i}`,
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${i}.jpg`
    })
  }
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
onBeforeMount(() => {
  loadImages()
})
</script>
<template>
  <Alert type="info" show-icon :message="clickMessage" :description="clickDescription" />
  <br/>
  <Waterfall :images="images" @click="handleClick" />
</template>
```

:::

## 动态增删

图片数组变化后自动重排，追加时只预取新增图片的尺寸；清空后容器高度归零：

<br/>

<Flex vertical>
  <Space>
    <Button @click="appendImages">追加 5 张</Button>
    <Button @click="removeFirstImage">删除首张</Button>
    <Button @click="clearImages">清空</Button>
  </Space>
  <Waterfall :images="dynamicImages" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const dynamicImages = ref<WaterfallImage[]>([])
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
onBeforeMount(() => {
  // 默认展示几张，便于直接观察增删效果
  loadDynamicImages()
})
</script>
<template>
  <Flex vertical>
    <Space>
      <Button @click="appendImages">追加 5 张</Button>
      <Button @click="removeFirstImage">删除首张</Button>
      <Button @click="clearImages">清空</Button>
    </Space>
    <Waterfall :images="dynamicImages" />
  </Flex>
</template>
```

:::

## 加载占位

为图片提供 `aspectRatio`（宽高比）后无需等待尺寸测量即可生成占位框，图片加载完成前显示骨架；加载失败时保留位置并显示失败图标。网络较快时骨架一闪而过，可点击「重新加载」或限速网络观察。

<br/>

<Flex vertical>
  <Space>
    <Button @click="reloadPlaceholder">重新加载</Button>
  </Space>
  <Waterfall :images="placeholderImages" />
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
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
function reloadPlaceholder() {
  // 追加时间戳绕过浏览器缓存，便于观察加载前的骨架
  const stamp = Date.now()
  placeholderImages.value = PLACEHOLDER_BASE.map((image) => ({ ...image, src: `${image.src}?t=${stamp}` }))
}
</script>
<template>
  <Flex vertical>
    <Space>
      <Button @click="reloadPlaceholder">重新加载</Button>
    </Space>
    <Waterfall :images="placeholderImages" />
  </Flex>
</template>
```

::::

## 按需渲染

开启 `lazy` 后只渲染可视区下方约一屏的内容，滚动接近底部时按批追加；右上角计数随追加实时更新，全部 `{{ lazyImages.length }}` 张渲染完成后停止。

<br/>

<div ref="lazyWrapRef">
  <div style="position: sticky; top: calc(var(--vp-nav-height, 64px) + 8px); z-index: 2; text-align: right">
    <Tag :color="lazyRenderCount === lazyImages.length ? 'success' : 'processing'">
      已渲染 {{ lazyRenderCount }} / {{ lazyImages.length }} 张
    </Tag>
  </div>
  <Waterfall :images="lazyImages" :lazy="true" :column-count="4" />
</div>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import type { WaterfallImage } from 'vue-amazing-ui'
const LAZY_TOTAL = 60
const LAZY_RATIOS = [1.5, 0.75, 1, 1.33, 0.67, 1.14]
const lazyImages = ref<WaterfallImage[]>([])
const lazyRenderCount = ref(0)
const lazyWrapRef = ref<HTMLElement | null>(null)
let lazyObserver: MutationObserver | null = null
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
  loadLazyImages()
})
onMounted(() => {
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
  <div ref="lazyWrapRef">
    <div style="position: sticky; top: calc(var(--vp-nav-height, 64px) + 8px); z-index: 2; text-align: right">
      <Tag :color="lazyRenderCount === lazyImages.length ? 'success' : 'processing'">
        已渲染 {{ lazyRenderCount }} / {{ lazyImages.length }} 张
      </Tag>
    </div>
    <Waterfall :images="lazyImages" :lazy="true" :column-count="4" />
  </div>
</template>
```

::::

## 瀑布流配置器

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
  <Col :span="6" style="margin-top: 20px">
    <Flex vertical>
      bgColor:
      <ColorPicker v-model:value="state.bgColor" />
    </Flex>
  </Col>
</Row>
<br/>
<Waterfall
  :images="images"
  :column-count="state.columnCount"
  :gap="[state.horizontalGap, state.verticalGap]"
  :width="`${state.width}%`"
  :bg-color="state.bgColor"
  :border-radius="state.borderRadius"
/>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
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
onBeforeMount(() => {
  // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
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
          <InputNumber v-model:value="state.horizontalGap" :min="0" :max="100" />
          <InputNumber v-model:value="state.verticalGap" :min="0" :max="100" />
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
    <Col :span="6" style="margin-top: 20px">
      <Flex vertical>
        bgColor:
        <ColorPicker v-model:value="state.bgColor" />
      </Flex>
    </Col>
  </Row>
  <br/>
  <Waterfall
    :images="images"
    :column-count="state.columnCount"
    :gap="[state.horizontalGap, state.verticalGap]"
    :width="`${state.width}%`"
    :bg-color="state.bgColor"
    :border-radius="state.borderRadius"
  />
</template>
```

::::

## APIs

### Waterfall Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| images | 图片数组 | [WaterfallImage](#waterfallimage-type)[] | [] |
| columnCount | 要划分的列数，可写成响应式对象 | number &#124; [WaterfallResponsive](#waterfallresponsive-type) | 3 |
| gap | 图片之间的间隙，单位 `px`；数组时表示 [水平间距, 垂直间距]，两者同时分别作为瀑布流区域的左右 / 上下内间距 | number &#124; [number, number] | 20 |
| width | 瀑布流区域的总宽度 | string &#124; number | '100%' |
| borderRadius | 瀑布流区域和图片圆角，单位 `px` | number | 8 |
| bgColor | 瀑布流区域背景填充色，不传时取主题变量 `--va-bg-layout-color` | string | 'var(--va-bg-layout-color)' |
| lazy | 是否按需渲染，只渲染可视区下方约一屏的内容，滚动接近底部时按批追加 | boolean | false |

### WaterfallImage Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| name? | 图片名称，未设置时自动从图片地址 `src` 中提取 | string |
| src | 图片地址 | string |
| link? | 图片跳转链接 | string |
| target? | 如何打开跳转链接 | '\_self' &#124; '\_blank' |
| aspectRatio? | 宽高比（宽度 / 高度），提供后无需预取尺寸即可生成占位框 | number |

### WaterfallResponsive Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| xs? | `＜576px` 时的列数 | number |
| sm? | `≥576px` 时的列数 | number |
| md? | `≥768px` 时的列数 | number |
| lg? | `≥992px` 时的列数 | number |
| xl? | `≥1200px` 时的列数 | number |
| xxl? | `≥1600px` 时的列数 | number |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| click | 点击图片时的回调函数；图片带 `link` 时同样先派发事件再跳转，可在回调中 `preventDefault()` 拦截 | (image: [WaterfallImage](#waterfallimage-type), index: number, event: MouseEvent) => void |
