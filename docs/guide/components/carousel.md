# 轮播图 Carousel

<GlobalElement />

_一组轮播的区域_

<!-- 本页的演示外壳刻意与 src/views/carousel/Index.vue 不同：本文件用 `<Flex vertical>`，演示页用 `<Space vertical>`。
     两者是既定例外，改动任何一侧都不要顺手同步另一侧（见 development/demo-doc-guide.md「表单与演示的纵向布局」）。 -->

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用轮播图的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { TransitionPresets } from '@vueuse/core'
import type { EasingFunction } from '@vueuse/core'
import { Carousel } from 'vue-amazing-ui'
import type { CarouselProps, CarouselImage, CarouselEasingPreset } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg',
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
  }
])
const singleImage = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  }
])
const showArrow = ref<boolean>(false)
const positionOptions = [
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const dotPosition = ref<CarouselProps['dotPosition']>('top')
const effectOptions = [
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  }
]
const effect = ref<CarouselProps['effect']>('fade')
const triggerOptions = [
  {
    label: 'click',
    value: 'click'
  },
  {
    label: 'hover',
    value: 'hover'
  }
]
const dotTrigger = ref<CarouselProps['dotTrigger']>('hover')
const loop = ref<boolean>(true)
const initialIndex = ref<number>(3)
const controlledIndex = ref<number>(1)
const beforeChangeInfo = ref<string>('-')
const afterChangeInfo = ref<string>('-')
function onBeforeChange(from: number, to: number) {
  beforeChangeInfo.value = `${from} → ${to}`
}
function onAfterChange(current: number) {
  afterChangeInfo.value = `${current}`
}
const objectFitOptions = [
  {
    label: 'fill',
    value: 'fill'
  },
  {
    label: 'contain',
    value: 'contain'
  },
  {
    label: 'cover',
    value: 'cover'
  },
  {
    label: 'none',
    value: 'none'
  },
  {
    label: 'scale-down',
    value: 'scale-down'
  }
]
const objectFit = ref<CarouselProps['objectFit']>('fill')
const draggable = ref<boolean>(true)
const mousewheel = ref<boolean>(true)
function clickImage(image: CarouselImage) {
  console.log('image', image)
}
// slideFunction 的三种取值形式：缓动预设名 / 三次贝塞尔控制点数组 / 缓动函数
const slideEasingType = ref<'preset' | 'bezier' | 'function'>('preset')
const slideEasingTypeOptions = [
  { label: '缓动预设名', value: 'preset' },
  { label: '贝塞尔数组', value: 'bezier' },
  { label: '缓动函数', value: 'function' }
]
// 预设名派生自 @vueuse/core 的 TransitionPresets，随上游自动同步
const slideEasingPresetOptions = Object.keys(TransitionPresets).map((preset) => ({ label: preset, value: preset }))
const slideEasingPreset = ref<CarouselEasingPreset>('easeOutBack')
// 三次贝塞尔控制点：x1 / x2 需落在 [0, 1] 内，y1 / y2 可超出该区间以产生回弹过冲（如 back-out）
const slideEasingBezier = reactive({ x1: 0.34, y1: 1.56, x2: 0.64, y2: 1 })
const bezierPointControls = [
  { key: 'x1', min: 0, max: 1 },
  { key: 'y1', min: -1, max: 2 },
  { key: 'x2', min: 0, max: 1 },
  { key: 'y2', min: -1, max: 2 }
] as const
// 贝塞尔数组必须是四个有效数字：InputNumber 清空时会回传 null，此时不改写数组，输入框失焦后回滚显示
function updateBezierPoint(key: keyof typeof slideEasingBezier, value?: number | null) {
  if (value !== undefined && value !== null) {
    slideEasingBezier[key] = value
  }
}
// 缓动函数形态示例：smoothstep，入参 t 为 0~1 的进度，返回缓动后的进度
const slideEasingFunction: EasingFunction = (t) => t * t * (3 - 2 * t)
const slideEasing = computed<CarouselProps['slideFunction']>(() => {
  const { x1, y1, x2, y2 } = slideEasingBezier
  if (slideEasingType.value === 'preset') {
    return slideEasingPreset.value
  }
  if (slideEasingType.value === 'function') {
    return slideEasingFunction
  }
  return [x1, y1, x2, y2]
})
// fadeFunction 的两种取值形式：四个贝塞尔控制点 / CSS transition-timing-function 写法
const fadeEasingType = ref<'bezier' | 'css'>('bezier')
const fadeEasingTypeOptions = [
  { label: '贝塞尔控制点', value: 'bezier' },
  { label: 'CSS 写法', value: 'css' }
]
const fadeEasing = computed<CarouselProps['fadeFunction']>(() =>
  fadeEasingType.value === 'bezier' ? [0.25, 0.1, 0.25, 1] : 'ease-in-out'
)
// 配置器的 fadeFunction 下拉项：CSS transition-timing-function 取值
const fadeFunctionOptions = [
  { label: 'ease', value: 'ease' },
  { label: 'linear', value: 'linear' },
  { label: 'ease-in-out', value: 'ease-in-out' },
  { label: 'cubic-bezier(0.4, 0, 0.2, 1)', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { label: 'steps(5, end)', value: 'steps(5, end)' }
]
const carousel = ref<InstanceType<typeof Carousel> | null>(null)
const toIndex = ref(1)
const currentIndex = ref(1)
function getCurrentIndex() {
  currentIndex.value = carousel.value?.getCurrentIndex() ?? currentIndex.value
}
const slideFunctionOptions = [
  { label: 'smooth', value: 'smooth' },
  { label: 'ease', value: 'ease' },
  { label: 'back-out', value: 'back-out' }
]
const slideFunctionMap: Record<string, [number, number, number, number]> = {
  smooth: [0.65, 0, 0.35, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'back-out': [0.34, 1.56, 0.64, 1]
}
const slideFunctionName = ref<string>('smooth')
const slideFunction = computed(() => slideFunctionMap[slideFunctionName.value])
// 配置器状态：字段顺序与组件 Props 定义顺序保持一致
// height 在 Props 中为 number | string，此处收窄为 number，便于用 InputNumber 调节
// fadeFunction 在 Props 中为 string | [number, number, number, number]，此处收窄为 string，便于用 Select 调节
type CarouselConfigState = CarouselProps & { height: number; fadeFunction: string }
const state = reactive<CarouselConfigState>({
  width: '100%',
  height: 450,
  autoplay: true,
  pauseOnMouseEnter: false,
  effect: 'slide',
  interval: 3000,
  loop: true,
  initialIndex: 1,
  currentIndex: 1,
  showArrow: true,
  arrowColor: '#FFF',
  arrowSize: 36,
  dots: true,
  dotSize: 10,
  dotColor: 'rgba(255, 255, 255, 0.3)',
  dotActiveColor: '#1677FF',
  dotPosition: 'bottom',
  dotTrigger: 'click',
  objectFit: 'fill',
  draggable: true,
  mousewheel: true,
  fadeDuration: 500,
  fadeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  slideDuration: 800
})
// width 输入框：纯数字按 px 处理转成 number（组件只对 number 补 px 单位），带单位 / 百分比则原样传递，留空回退组件默认值
const widthInput = computed({
  get: () => (state.width === undefined ? '' : String(state.width)),
  set: (value: string) => {
    const input = value.trim()
    if (!input) {
      state.width = undefined
      return
    }
    state.width = /^\d+(\.\d+)?$/.test(input) ? Number(input) : input
  }
})
// height 输入框清空时不回写，避免组件回退到默认的 100vh 撑爆预览
function onHeightChange(value?: number) {
  if (value !== undefined) {
    state.height = value
  }
}
// initialIndex 仅在初始化时生效，变更时清空受控值，避免受控 currentIndex 抢占新的初始页
watch(
  () => state.initialIndex,
  () => {
    state.currentIndex = undefined
  }
)
</script>

## 基本使用

_当焦点在 `Arrow` 或 `Dots` 上时，可以通过键盘上、下、左、右按键切换_

<br>

<Carousel :images="images" :height="450" @click="clickImage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
function clickImage(image: CarouselImage) {
  console.log('image', image)
}
</script>
<template>
  <Carousel :images="images" :height="450" @click="clickImage" />
</template>
```

:::

## 箭头

<Flex vertical>
  <Space align="center">
    showArrow: <Switch v-model:value="showArrow" />
  </Space>
  <Carousel :images="images" :height="450" :show-arrow="showArrow" @click="clickImage" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const showArrow = ref<boolean>(false)
function clickImage(image: CarouselImage) {
  console.log('image', image)
}
</script>
<template>
  <Flex vertical>
    <Space align="center">
      showArrow: <Switch v-model:value="showArrow" />
    </Space>
    <Carousel :images="images" :height="450" :show-arrow="showArrow" @click="clickImage" />
  </Flex>
</template>
```

:::

## 自动轮播

<Carousel :images="images" :height="450" autoplay @click="clickImage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
function clickImage(image: CarouselImage) {
  console.log('image', image)
}
</script>
<template>
  <Carousel :images="images" :height="450" autoplay @click="clickImage" />
</template>
```

:::

## 指示点位置

<Flex vertical>
  <RadioGroup :options="positionOptions" v-model:value="dotPosition" button button-style="solid" />
  <Carousel :images="images" :height="450" autoplay :dotPosition="dotPosition" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const positionOptions = [
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const dotPosition = ref<CarouselProps['dotPosition']>('top')
</script>
<template>
  <Flex vertical>
    <RadioGroup :options="positionOptions" v-model:value="dotPosition" button button-style="solid" />
    <Carousel :images="images" :height="450" autoplay :dotPosition="dotPosition" />
  </Flex>
</template>
```

:::

## 垂直

<Carousel :images="images" :height="450" autoplay dotPosition="right" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
</script>
<template>
  <Carousel :images="images" :height="450" autoplay dotPosition="right" />
</template>
```

:::

## 移入暂停

<Carousel :images="images" :height="450" autoplay pause-on-mouse-enter dotPosition="right" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
</script>
<template>
  <Carousel :images="images" :height="450" autoplay pause-on-mouse-enter dotPosition="right" />
</template>
```

:::

## 过渡效果

<Flex vertical>
  <RadioGroup :options="effectOptions" v-model:value="effect" button button-style="solid" />
  <Carousel :images="images" :height="450" :effect="effect" :fade-duration="1500" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const effectOptions = [
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  }
]
const effect = ref<CarouselProps['effect']>('fade')
</script>
<template>
  <Flex vertical>
    <RadioGroup :options="effectOptions" v-model:value="effect" button button-style="solid" />
    <Carousel :images="images" :height="450" :effect="effect" :fade-duration="1500" />
  </Flex>
</template>
```

:::

## 鼠标经过指示点切换轮播图

<Flex vertical>
  <RadioGroup :options="triggerOptions" v-model:value="dotTrigger" button button-style="solid" />
  <Carousel :images="images" :height="450" :dot-trigger="dotTrigger" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const triggerOptions = [
  {
    label: 'click',
    value: 'click'
  },
  {
    label: 'hover',
    value: 'hover'
  }
]
const dotTrigger = ref<CarouselProps['dotTrigger']>('hover')
</script>
<template>
  <Flex vertical>
    <RadioGroup :options="triggerOptions" v-model:value="dotTrigger" button button-style="solid" />
    <Carousel :images="images" :height="450" :dot-trigger="dotTrigger" />
  </Flex>
</template>
```

:::

## 自定义滑动动画

_`slideFunction` 支持缓动预设名、三次贝塞尔控制点数组与缓动函数，预设名与 `@vueuse/core` 的 [`TransitionPresets`](https://vueuse.org/core/useTransition/#usage) 一致_

<br/>

<Flex vertical>
  <Space>
    <RadioGroup :options="slideEasingTypeOptions" v-model:value="slideEasingType" button button-style="solid" />
    <Select
      v-if="slideEasingType === 'preset'"
      :options="slideEasingPresetOptions"
      v-model:value="slideEasingPreset"
      width="200"
      show-search
    />
  </Space>
  <Space v-if="slideEasingType === 'bezier'" align="center">
    <template v-for="point in bezierPointControls" :key="point.key">
      <span>{{ point.key }}</span>
      <InputNumber
        :value="slideEasingBezier[point.key]"
        :min="point.min"
        :max="point.max"
        :step="0.01"
        @update:value="updateBezierPoint(point.key, $event)"
      />
    </template>
  </Space>
  <p v-else-if="slideEasingType === 'function'">缓动函数：<code>t => t * t * (3 - 2 * t)</code></p>
  <Carousel :images="images" :height="450" :slide-duration="800" :slide-function="slideEasing" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { TransitionPresets } from '@vueuse/core'
import type { EasingFunction } from '@vueuse/core'
import type { CarouselImage, CarouselEasingPreset, CarouselProps } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
// slideFunction 的三种取值形式：缓动预设名 / 三次贝塞尔控制点数组 / 缓动函数
const slideEasingType = ref<'preset' | 'bezier' | 'function'>('preset')
const slideEasingTypeOptions = [
  { label: '缓动预设名', value: 'preset' },
  { label: '贝塞尔数组', value: 'bezier' },
  { label: '缓动函数', value: 'function' }
]
// 预设名派生自 @vueuse/core 的 TransitionPresets，随上游自动同步
const slideEasingPresetOptions = Object.keys(TransitionPresets).map((preset) => ({ label: preset, value: preset }))
const slideEasingPreset = ref<CarouselEasingPreset>('easeOutBack')
// 三次贝塞尔控制点：x1 / x2 需落在 [0, 1] 内，y1 / y2 可超出该区间以产生回弹过冲（如 back-out）
const slideEasingBezier = reactive({ x1: 0.34, y1: 1.56, x2: 0.64, y2: 1 })
const bezierPointControls = [
  { key: 'x1', min: 0, max: 1 },
  { key: 'y1', min: -1, max: 2 },
  { key: 'x2', min: 0, max: 1 },
  { key: 'y2', min: -1, max: 2 }
] as const
// 贝塞尔数组必须是四个有效数字：InputNumber 清空时会回传 null，此时不改写数组，输入框失焦后回滚显示
function updateBezierPoint(key: keyof typeof slideEasingBezier, value?: number | null) {
  if (value !== undefined && value !== null) {
    slideEasingBezier[key] = value
  }
}
// 缓动函数形态示例：smoothstep，入参 t 为 0~1 的进度，返回缓动后的进度
const slideEasingFunction: EasingFunction = (t) => t * t * (3 - 2 * t)
const slideEasing = computed<CarouselProps['slideFunction']>(() => {
  const { x1, y1, x2, y2 } = slideEasingBezier
  if (slideEasingType.value === 'preset') {
    return slideEasingPreset.value
  }
  if (slideEasingType.value === 'function') {
    return slideEasingFunction
  }
  return [x1, y1, x2, y2]
})
</script>
<template>
  <Flex vertical>
    <Space>
      <RadioGroup :options="slideEasingTypeOptions" v-model:value="slideEasingType" button button-style="solid" />
      <Select
        v-if="slideEasingType === 'preset'"
        :options="slideEasingPresetOptions"
        v-model:value="slideEasingPreset"
        width="200"
        show-search
      />
    </Space>
    <Space v-if="slideEasingType === 'bezier'" align="center">
      <template v-for="point in bezierPointControls" :key="point.key">
        <span>{{ point.key }}</span>
        <InputNumber
          :value="slideEasingBezier[point.key]"
          :min="point.min"
          :max="point.max"
          :step="0.01"
          @update:value="updateBezierPoint(point.key, $event)"
        />
      </template>
    </Space>
    <p v-else-if="slideEasingType === 'function'">缓动函数：<code>t => t * t * (3 - 2 * t)</code></p>
    <Carousel :images="images" :height="450" :slide-duration="800" :slide-function="slideEasing" />
  </Flex>
</template>
```

:::

## 自定义渐变动画

_`fadeFunction` 可传四个三次贝塞尔控制点（自动转为 `CSS` [`cubic-bezier()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function/cubic-bezier) 写法），也可直接传 `CSS` [`transition-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) 写法_

<br/>

<Flex vertical>
  <RadioGroup :options="fadeEasingTypeOptions" v-model:value="fadeEasingType" button button-style="solid" />
  <Carousel :images="images" :height="450" effect="fade" :fade-duration="1500" :fade-function="fadeEasing" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CarouselImage, CarouselProps } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
// fadeFunction 的两种取值形式：四个贝塞尔控制点 / CSS transition-timing-function 写法
const fadeEasingType = ref<'bezier' | 'css'>('bezier')
const fadeEasingTypeOptions = [
  { label: '贝塞尔控制点', value: 'bezier' },
  { label: 'CSS 写法', value: 'css' }
]
const fadeEasing = computed<CarouselProps['fadeFunction']>(() =>
  fadeEasingType.value === 'bezier' ? [0.25, 0.1, 0.25, 1] : 'ease-in-out'
)
</script>
<template>
  <Flex vertical>
    <RadioGroup :options="fadeEasingTypeOptions" v-model:value="fadeEasingType" button button-style="solid" />
    <Carousel :images="images" :height="450" effect="fade" :fade-duration="1500" :fade-function="fadeEasing" />
  </Flex>
</template>
```

:::

## 自定义样式

<Carousel
  :images="images"
  :height="450"
  arrow-color="#13C2C2"
  :arrow-size="48"
  dot-active-color="#13C2C2"
  :dot-style="{ backgroundColor: '#FFF' }"
  :dot-active-style="{ width: '25px', backgroundColor: 'gold' }"
  :spin-props="{ indicator: 'dot', color: '#13C2C2' }"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
</script>
<template>
  <Carousel
    :images="images"
    :height="450"
    arrow-color="#13C2C2"
    :arrow-size="48"
    dot-active-color="#13C2C2"
    :dot-style="{ backgroundColor: '#FFF' }"
    :dot-active-style="{ width: '25px', backgroundColor: 'gold' }"
    :spin-props="{ indicator: 'dot', color: '#13C2C2' }"
  />
</template>
```

:::

## 循环切换

_关闭 `loop` 后到达首尾时，该方向的切换（箭头、键盘、滚轮、拖拽、自动轮播）均失效，该方向的箭头同时置灰_

<br/>

<Flex vertical>
  <Space align="center"> loop: <Switch v-model:value="loop" /> </Space>
  <Carousel :images="images" :height="450" :loop="loop" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const loop = ref<boolean>(true)
</script>
<template>
  <Flex vertical>
    <Space align="center"> loop: <Switch v-model:value="loop" /> </Space>
    <Carousel :images="images" :height="450" :loop="loop" />
  </Flex>
</template>
```

:::

## 单张图片

_图片只有一张时不渲染箭头，也不会自动轮播或响应键盘、滚轮、拖拽切换（指示点仍显示）_

<br/>

<Carousel :images="singleImage" :height="450" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const singleImage = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  }
])
</script>
<template>
  <Carousel :images="singleImage" :height="450" />
</template>
```

:::

## 初始展示页

_通过 `initial-index` 指定初始展示的图片下标，仅在初始化时生效_

<br/>

<Flex vertical>
  <Space align="center">
    initialIndex: <InputNumber :min="1" :max="images.length" v-model:value="initialIndex" />
  </Space>
  <Carousel :key="initialIndex" :images="images" :height="450" :initial-index="initialIndex" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const initialIndex = ref<number>(3)
</script>
<template>
  <Flex vertical>
    <Space align="center">
      initialIndex: <InputNumber :min="1" :max="images.length" v-model:value="initialIndex" />
    </Space>
    <Carousel :key="initialIndex" :images="images" :height="450" :initial-index="initialIndex" />
  </Flex>
</template>
```

:::

## 受控当前页

_通过 `v-model:current-index` 双向绑定当前页：外部改值即可跳转，点击指示点或箭头切换也会实时回写_

<br/>

<Flex vertical>
  <Space align="center">
    当前页：<InputNumber :min="1" :max="images.length" v-model:value="controlledIndex" />
    <Button @click="controlledIndex = 1">跳转到第 1 张</Button>
    <Button @click="controlledIndex = images.length">跳转到最后一张</Button>
  </Space>
  <Carousel v-model:current-index="controlledIndex" :images="images" :height="450" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const controlledIndex = ref<number>(1)
</script>
<template>
  <Flex vertical>
    <Space align="center">
      当前页：<InputNumber :min="1" :max="images.length" v-model:value="controlledIndex" />
      <Button @click="controlledIndex = 1">跳转到第 1 张</Button>
      <Button @click="controlledIndex = images.length">跳转到最后一张</Button>
    </Space>
    <Carousel v-model:current-index="controlledIndex" :images="images" :height="450" />
  </Flex>
</template>
```

:::

## 切换回调

_`beforeChange` 在切换开始时触发，`afterChange` 在切换结束后触发_

<br/>

<Flex vertical>
  <Space align="center"> 最近一次： {{ beforeChangeInfo }} / {{ afterChangeInfo }} </Space>
  <Carousel :images="images" :height="450" @before-change="onBeforeChange" @after-change="onAfterChange" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const beforeChangeInfo = ref<string>('-')
const afterChangeInfo = ref<string>('-')
function onBeforeChange(from: number, to: number) {
  beforeChangeInfo.value = `${from} → ${to}`
}
function onAfterChange(current: number) {
  afterChangeInfo.value = `${current}`
}
</script>
<template>
  <Flex vertical>
    <Space align="center"> 最近一次： {{ beforeChangeInfo }} / {{ afterChangeInfo }} </Space>
    <Carousel :images="images" :height="450" @before-change="onBeforeChange" @after-change="onAfterChange" />
  </Flex>
</template>
```

:::

## 图片填充方式

_与 `CSS` 同名属性一致，默认 `fill` 拉伸填满容器_

<br/>

<Flex vertical>
  <Space align="center">
    objectFit: <Select :options="objectFitOptions" v-model:value="objectFit" style="width: 160px" />
  </Space>
  <Carousel :images="images" :height="450" :object-fit="objectFit" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const objectFitOptions = [
  {
    label: 'fill',
    value: 'fill'
  },
  {
    label: 'contain',
    value: 'contain'
  },
  {
    label: 'cover',
    value: 'cover'
  },
  {
    label: 'none',
    value: 'none'
  },
  {
    label: 'scale-down',
    value: 'scale-down'
  }
]
const objectFit = ref<CarouselProps['objectFit']>('fill')
</script>
<template>
  <Flex vertical>
    <Space align="center">
      objectFit: <Select :options="objectFitOptions" v-model:value="objectFit" style="width: 160px" />
    </Space>
    <Carousel :images="images" :height="450" :object-fit="objectFit" />
  </Flex>
</template>
```

:::

## 拖拽切换

_开启 `draggable` 后支持鼠标与触摸拖拽，位移超过容器宽度一半或速度超过 `0.4px/ms` 即翻页_

<br/>

<Flex vertical>
  <Space align="center"> draggable: <Switch v-model:value="draggable" /> </Space>
  <Carousel :images="images" :height="450" :draggable="draggable" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const draggable = ref<boolean>(true)
</script>
<template>
  <Flex vertical>
    <Space align="center"> draggable: <Switch v-model:value="draggable" /> </Space>
    <Carousel :images="images" :height="450" :draggable="draggable" />
  </Flex>
</template>
```

:::

## 滚轮切换

_开启 `mousewheel` 后滚轮切换，单次滚动量需超过 `10`_

<br/>

<Flex vertical>
  <Space align="center"> mousewheel: <Switch v-model:value="mousewheel" /> </Space>
  <Carousel :images="images" :height="450" :mousewheel="mousewheel" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const mousewheel = ref<boolean>(true)
</script>
<template>
  <Flex vertical>
    <Space align="center"> mousewheel: <Switch v-model:value="mousewheel" /> </Space>
    <Carousel :images="images" :height="450" :mousewheel="mousewheel" />
  </Flex>
</template>
```

:::

## 自定义箭头

_通过 `prevArrow`、`nextArrow` 插槽自定义箭头，插槽内容仅负责外观，点击切换由组件接管_

<br/>

<Carousel :images="images" :height="450">
  <template #prevArrow="{ isPrevDisabled }">
    <span class="custom-arrow" :class="{ 'custom-arrow-disabled': isPrevDisabled }">
      <LeftOutlined />
    </span>
  </template>
  <template #nextArrow="{ isNextDisabled }">
    <span class="custom-arrow" :class="{ 'custom-arrow-disabled': isNextDisabled }">
      <RightOutlined />
    </span>
  </template>
</Carousel>

<style lang="less" scoped>
.custom-arrow {
  color: #fff;
  font-size: 30px;
  line-height: 1;
  opacity: 0.72;
  // 图标是 inline SVG，text-shadow 对它不生效，需用 drop-shadow 沿轮廓生成柔和外晕
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.32));
  transition: opacity 0.3s;
  &:not(.custom-arrow-disabled):hover {
    opacity: 1;
  }
}
.custom-arrow-disabled {
  opacity: 0.32;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
</script>
<template>
  <Carousel :images="images" :height="450">
    <template #prevArrow="{ isPrevDisabled }">
      <span class="custom-arrow" :class="{ 'custom-arrow-disabled': isPrevDisabled }">
        <LeftOutlined />
      </span>
    </template>
    <template #nextArrow="{ isNextDisabled }">
      <span class="custom-arrow" :class="{ 'custom-arrow-disabled': isNextDisabled }">
        <RightOutlined />
      </span>
    </template>
  </Carousel>
</template>
<style lang="less" scoped>
.custom-arrow {
  color: #fff;
  font-size: 30px;
  line-height: 1;
  opacity: 0.72;
  // 图标是 inline SVG，text-shadow 对它不生效，需用 drop-shadow 沿轮廓生成柔和外晕
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.32));
  transition: opacity 0.3s;
  &:not(.custom-arrow-disabled):hover {
    opacity: 1;
  }
}
.custom-arrow-disabled {
  opacity: 0.32;
}
</style>
```

:::

## 自定义指示点

_通过 `dots` 插槽自定义指示点，需自行调用 `to(n)` 切换_

<br/>

<Carousel :images="images" :height="450">
  <template #dots="{ to, total, currentIndex }">
    <span
      class="custom-dot"
      :class="{ 'custom-dot-active': n === currentIndex }"
      v-for="n in total"
      :key="n"
      @click="to(n)"
    ></span>
  </template>
</Carousel>

<style lang="less" scoped>
.custom-dot {
  display: inline-block;
  width: 24px;
  height: 6px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: background-color 0.3s;
}
.custom-dot-active {
  background-color: #1677ff;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
</script>
<template>
  <Carousel :images="images" :height="450">
    <template #dots="{ to, total, currentIndex }">
      <span
        class="custom-dot"
        :class="{ 'custom-dot-active': n === currentIndex }"
        v-for="n in total"
        :key="n"
        @click="to(n)"
      ></span>
    </template>
  </Carousel>
</template>
<style lang="less" scoped>
.custom-dot {
  display: inline-block;
  width: 24px;
  height: 6px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: background-color 0.3s;
}
.custom-dot-active {
  background-color: #1677ff;
}
</style>
```

:::

## 使用 Methods

<Flex vertical>
  <Space>
    <InputNumber :min="1" :max="images.length" v-model:value="toIndex" />
    <Button @click="carousel?.to(toIndex)">跳转到</Button>
    <Button @click="carousel?.to(toIndex, true)">跳转到（无动画）</Button>
    <Button @click="carousel?.prev()">前一页</Button>
    <Button @click="carousel?.next()">后一页</Button>
    <Button @click="getCurrentIndex">获取当前页：{{ currentIndex }}</Button>
  </Space>
  <Carousel ref="carousel" :images="images" :height="450" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Carousel } from 'vue-amazing-ui'
import type { CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const carousel = ref<InstanceType<typeof Carousel> | null>(null)
const toIndex = ref(1)
const currentIndex = ref(1)
function getCurrentIndex() {
  currentIndex.value = carousel.value?.getCurrentIndex() ?? currentIndex.value
}
</script>
<template>
  <Flex vertical>
    <Space>
      <InputNumber :min="1" :max="images.length" v-model:value="toIndex" />
      <Button @click="carousel?.to(toIndex)">跳转到</Button>
      <Button @click="carousel?.to(toIndex, true)">跳转到（无动画）</Button>
      <Button @click="carousel?.prev()">前一页</Button>
      <Button @click="carousel?.next()">后一页</Button>
      <Button @click="getCurrentIndex">获取当前页：{{ currentIndex }}</Button>
    </Space>
    <Carousel ref="carousel" :images="images" :height="450" />
  </Flex>
</template>
```

:::

## 轮播图配置器

_`currentIndex` 为受控属性，留空时由组件自行维护当前页，设置后进入受控模式_

<Flex gap="large" vertical>
  <Row :gutter="[24, 12]">
    <Col :span="6">
      <Flex gap="small" vertical>
        width：<Input v-model:value="widthInput" placeholder="800 / 100% / 80vw" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        height：
        <InputNumber :value="state.height" :min="100" :max="800" :step="10" @update:value="onHeightChange" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> autoplay：<Switch v-model:value="state.autoplay" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> pauseOnMouseEnter：<Switch v-model:value="state.pauseOnMouseEnter" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        effect：<RadioGroup :options="effectOptions" v-model:value="state.effect" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        interval：<Slider v-model:value="state.interval" :min="100" :step="10" :max="10000" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> loop：<Switch v-model:value="state.loop" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        initialIndex：<InputNumber :min="1" :max="images.length" v-model:value="state.initialIndex" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        currentIndex：<InputNumber :min="1" :max="images.length" v-model:value="state.currentIndex" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> showArrow：<Switch v-model:value="state.showArrow" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        arrowColor：<ColorPicker v-model:value="state.arrowColor" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical> arrowSize：<Slider v-model:value="state.arrowSize" :min="1" /> </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> dots：<Switch v-model:value="state.dots" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotSize：<Slider v-model:value="state.dotSize" :min="4" :max="64" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotColor：<ColorPicker v-model:value="state.dotColor" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotActiveColor：<ColorPicker v-model:value="state.dotActiveColor" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        dotPosition：
        <Select :options="positionOptions" v-model:value="state.dotPosition" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        dotTrigger：
        <RadioGroup :options="triggerOptions" v-model:value="state.dotTrigger" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        objectFit：<Select :options="objectFitOptions" v-model:value="state.objectFit" />
      </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> draggable：<Switch v-model:value="state.draggable" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> mousewheel：<Switch v-model:value="state.mousewheel" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        fadeDuration：<Slider v-model:value="state.fadeDuration" :min="100" :step="10" :max="10000" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        fadeFunction：<Select :options="fadeFunctionOptions" v-model:value="state.fadeFunction" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        slideDuration：<Slider v-model:value="state.slideDuration" :min="100" :step="10" :max="10000" />
      </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical>
        slideFunction：<Select :options="slideFunctionOptions" v-model:value="slideFunctionName" />
      </Flex>
    </Col>
  </Row>
  <Carousel
    :key="state.initialIndex"
    v-model:current-index="state.currentIndex"
    :images="images"
    :spin-props="{ indicator: 'dot', color: '#13C2C2' }"
    :slide-function="slideFunction"
    v-bind="state"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { CarouselProps, CarouselImage } from 'vue-amazing-ui'
const images = ref<CarouselImage[]>([
  {
    name: 'image-1',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg'
  },
  {
    name: 'image-2',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/2.jpg'
  },
  {
    name: 'image-3',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/3.jpg'
  },
  {
    name: 'image-4',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  }
])
const positionOptions = [
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const effectOptions = [
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  }
]
const triggerOptions = [
  {
    label: 'click',
    value: 'click'
  },
  {
    label: 'hover',
    value: 'hover'
  }
]
const objectFitOptions = [
  {
    label: 'fill',
    value: 'fill'
  },
  {
    label: 'contain',
    value: 'contain'
  },
  {
    label: 'cover',
    value: 'cover'
  },
  {
    label: 'none',
    value: 'none'
  },
  {
    label: 'scale-down',
    value: 'scale-down'
  }
]
// 配置器的 fadeFunction 下拉项：CSS transition-timing-function 取值
const fadeFunctionOptions = [
  { label: 'ease', value: 'ease' },
  { label: 'linear', value: 'linear' },
  { label: 'ease-in-out', value: 'ease-in-out' },
  { label: 'cubic-bezier(0.4, 0, 0.2, 1)', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { label: 'steps(5, end)', value: 'steps(5, end)' }
]
const slideFunctionOptions = [
  { label: 'smooth', value: 'smooth' },
  { label: 'ease', value: 'ease' },
  { label: 'back-out', value: 'back-out' }
]
const slideFunctionMap: Record<string, [number, number, number, number]> = {
  smooth: [0.65, 0, 0.35, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'back-out': [0.34, 1.56, 0.64, 1]
}
const slideFunctionName = ref<string>('smooth')
const slideFunction = computed(() => slideFunctionMap[slideFunctionName.value])
// 配置器状态：字段顺序与组件 Props 定义顺序保持一致
// height 在 Props 中为 number | string，此处收窄为 number，便于用 InputNumber 调节
// fadeFunction 在 Props 中为 string | [number, number, number, number]，此处收窄为 string，便于用 Select 调节
type CarouselConfigState = CarouselProps & { height: number; fadeFunction: string }
const state = reactive<CarouselConfigState>({
  width: '100%',
  height: 450,
  autoplay: true,
  pauseOnMouseEnter: false,
  effect: 'slide',
  interval: 3000,
  loop: true,
  initialIndex: 1,
  currentIndex: 1,
  showArrow: true,
  arrowColor: '#FFF',
  arrowSize: 36,
  dots: true,
  dotSize: 10,
  dotColor: 'rgba(255, 255, 255, 0.3)',
  dotActiveColor: '#1677FF',
  dotPosition: 'bottom',
  dotTrigger: 'click',
  objectFit: 'fill',
  draggable: true,
  mousewheel: true,
  fadeDuration: 500,
  fadeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  slideDuration: 800
})
// width 输入框：纯数字按 px 处理转成 number（组件只对 number 补 px 单位），带单位 / 百分比则原样传递，留空回退组件默认值
const widthInput = computed({
  get: () => (state.width === undefined ? '' : String(state.width)),
  set: (value: string) => {
    const input = value.trim()
    if (!input) {
      state.width = undefined
      return
    }
    state.width = /^\d+(\.\d+)?$/.test(input) ? Number(input) : input
  }
})
// height 输入框清空时不回写，避免组件回退到默认的 100vh 撑爆预览
function onHeightChange(value?: number) {
  if (value !== undefined) {
    state.height = value
  }
}
// initialIndex 仅在初始化时生效，变更时清空受控值，避免受控 currentIndex 抢占新的初始页
watch(
  () => state.initialIndex,
  () => {
    state.currentIndex = undefined
  }
)
</script>
<template>
  <Flex gap="large" vertical>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Flex gap="small" vertical>
          width：<Input v-model:value="widthInput" placeholder="800 / 100% / 80vw" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          height：
          <InputNumber :value="state.height" :min="100" :max="800" :step="10" @update:value="onHeightChange" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> autoplay：<Switch v-model:value="state.autoplay" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> pauseOnMouseEnter：<Switch v-model:value="state.pauseOnMouseEnter" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          effect：<RadioGroup :options="effectOptions" v-model:value="state.effect" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          interval：<Slider v-model:value="state.interval" :min="100" :step="10" :max="10000" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> loop：<Switch v-model:value="state.loop" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          initialIndex：<InputNumber :min="1" :max="images.length" v-model:value="state.initialIndex" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          currentIndex：<InputNumber :min="1" :max="images.length" v-model:value="state.currentIndex" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> showArrow：<Switch v-model:value="state.showArrow" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          arrowColor：<ColorPicker v-model:value="state.arrowColor" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> arrowSize：<Slider v-model:value="state.arrowSize" :min="1" /> </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> dots：<Switch v-model:value="state.dots" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotSize：<Slider v-model:value="state.dotSize" :min="4" :max="64" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotColor：<ColorPicker v-model:value="state.dotColor" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotActiveColor：<ColorPicker v-model:value="state.dotActiveColor" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          dotPosition：
          <Select :options="positionOptions" v-model:value="state.dotPosition" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          dotTrigger：
          <RadioGroup :options="triggerOptions" v-model:value="state.dotTrigger" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          objectFit：<Select :options="objectFitOptions" v-model:value="state.objectFit" />
        </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> draggable：<Switch v-model:value="state.draggable" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> mousewheel：<Switch v-model:value="state.mousewheel" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          fadeDuration：<Slider v-model:value="state.fadeDuration" :min="100" :step="10" :max="10000" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          fadeFunction：<Select :options="fadeFunctionOptions" v-model:value="state.fadeFunction" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          slideDuration：<Slider v-model:value="state.slideDuration" :min="100" :step="10" :max="10000" />
        </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical>
          slideFunction：<Select :options="slideFunctionOptions" v-model:value="slideFunctionName" />
        </Flex>
      </Col>
    </Row>
    <Carousel
      :key="state.initialIndex"
      v-model:current-index="state.currentIndex"
      :images="images"
      :spin-props="{ indicator: 'dot', color: '#13C2C2' }"
      :slide-function="slideFunction"
      v-bind="state"
    />
  </Flex>
</template>
```

:::

## APIs

### Carousel Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| images | 轮播图图片数组 | [CarouselImage](#carouselimage-type)[] | [] |
| width | 轮播图宽度，单位 `px` | number &#124; string | '100%' |
| height | 轮播图高度，单位 `px` | number &#124; string | '100vh' |
| autoplay | 是否自动轮播 | boolean | false |
| pauseOnMouseEnter | 当鼠标移入轮播图时，是否暂停自动轮播 | boolean | false |
| effect | 轮播图切换时的过渡效果 | 'slide' &#124; 'fade' | 'slide' |
| interval | 自动轮播间隔，单位 `ms` | number | 3000 |
| loop | 是否循环切换，为 `false` 时首尾不再回绕，到达边界后该方向的切换（箭头、键盘、滚轮、拖拽、自动轮播）失效、该方向的箭头置灰 | boolean | true |
| initialIndex | 初始展示的图片下标，从 `1` 开始，仅在初始化时生效 | number | 1 |
| currentIndex <Tag color="cyan">v-model</Tag> | 当前展示的图片下标（受控），从 `1` 开始，配合 `v-model:current-index` 使用 | number | undefined |
| showArrow | 是否显示箭头，图片数量大于 `1` 时才渲染 | boolean | true |
| arrowColor | 箭头颜色 | string | '#FFF' |
| arrowSize | 箭头大小，单位 `px` | number | 36 |
| dots | 是否显示指示点 | boolean | true |
| dotSize | 指示点大小，单位 `px` | number | 10 |
| dotColor | 指示点颜色 | string | 'rgba(255, 255, 255, 0.3)' |
| dotActiveColor | 指示点选中颜色 | string | undefined |
| dotStyle | 指示点样式，优先级高于 `dotSize`、`dotColor` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| dotActiveStyle | 指示点选中样式，优先级高于 `dotActiveColor` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| dotPosition | 指示点位置，位置为 `left` &#124; `right` 时，`effect: 'slide'` 轮播自动变为垂直轮播 | 'bottom' &#124; 'top' &#124; 'left' &#124; 'right' | 'bottom' |
| dotTrigger | 指示点触发切换的方式 | 'click' &#124; 'hover' | 'click' |
| spinProps | 图片加载中样式，`Spin` 组件属性配置，参考 [Spin Props](./spin.md#spin-props) | [SpinProps](./spin.md#spin-props) | {} |
| objectFit | 图片填充方式，同 `CSS` `object-fit` | 'fill' &#124; 'contain' &#124; 'cover' &#124; 'none' &#124; 'scale-down' | 'fill' |
| draggable | 是否可以拖拽滑动切换（鼠标与触摸均支持） | boolean | false |
| mousewheel | 是否支持鼠标滚轮切换 | boolean | false |
| fadeDuration | 渐变动画持续时长，单位 `ms`，仅当 `effect` 为 `'fade'` 时生效 | number | 500 |
| fadeFunction | 渐变动画函数，仅当 `effect` 为 `'fade'` 时生效，可传四个三次贝塞尔控制点（自动转为 `CSS` `cubic-bezier()` 写法，其中 `x1` / `x2` 需落在 `[0, 1]` 内）或 `CSS` [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) 写法 | string &#124; [number, number, number, number] | [0.4, 0, 0.2, 1] |
| slideDuration | 滑动动画持续时长，单位 `ms`，仅当 `effect` 为 `'slide'` 时生效 | number | 800 |
| slideFunction | 滑动动画函数，仅当 `effect` 为 `'slide'` 时生效，可传缓动预设名、三次贝塞尔控制点数组或缓动函数 | [CarouselEasingPreset](#carouseleasingpreset-type) &#124; [CubicBezierPoints](https://vueuse.org/core/useTransition/) &#124; [EasingFunction](https://vueuse.org/core/useTransition/) | [0.65, 0, 0.35, 1] |

### CarouselEasingPreset Type

<br/>

缓动预设名源自 `@vueuse/core` 的 `TransitionPresets`，用于 `slideFunction`

| 名称 | 值 |
| :-- | :-- |
| CarouselEasingPreset | 'linear' &#124; 'easeInSine' &#124; 'easeOutSine' &#124; 'easeInOutSine' &#124; 'easeInQuad' &#124; 'easeOutQuad' &#124; 'easeInOutQuad' &#124; 'easeInCubic' &#124; 'easeOutCubic' &#124; 'easeInOutCubic' &#124; 'easeInQuart' &#124; 'easeOutQuart' &#124; 'easeInOutQuart' &#124; 'easeInQuint' &#124; 'easeOutQuint' &#124; 'easeInOutQuint' &#124; 'easeInExpo' &#124; 'easeOutExpo' &#124; 'easeInOutExpo' &#124; 'easeInCirc' &#124; 'easeOutCirc' &#124; 'easeInOutCirc' &#124; 'easeInBack' &#124; 'easeOutBack' &#124; 'easeInOutBack' |

### CarouselImage Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| name? | 图片名称 | string |
| src | 图片地址 | string |
| link? | 图片跳转链接 | string |
| target? | 如何打开跳转链接 | '_self' &#124; '_blank' |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| prevArrow | 自定义上一张箭头，点击切换由组件接管 | v-slot:prevArrow="{ prev, next, to, total, currentIndex, isPrevDisabled, isNextDisabled }" |
| nextArrow | 自定义下一张箭头，点击切换由组件接管 | v-slot:nextArrow="{ prev, next, to, total, currentIndex, isPrevDisabled, isNextDisabled }" |
| dots | 自定义指示点，需自行调用 `to(n)` 切换 | v-slot:dots="{ to, total, currentIndex }" |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| beforeChange | 切换开始时触发，`from` 为当前页、`to` 为目标页，均从 `1` 开始 | (from: number, to: number) => void |
| afterChange | 切换结束后触发，参数为当前页，从 `1` 开始 | (current: number) => void |
| click | 点击图片时的回调 | (image: [CarouselImage](#carouselimage-type)) => void |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| to | 切换至某一页，从 `1` 开始，`dontAnimate` 为 `true` 时不使用动画 | (n: number, dontAnimate?: boolean) => void |
| prev | 切换至前一页 | () => void |
| next | 切换至后一页 | () => void |
| getCurrentIndex | 获取当前页，从 `1` 开始 | () => number |
