<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { TransitionPresets } from '@vueuse/core'
import type { CubicBezierPoints } from '@vueuse/core'
import { Carousel, type CarouselProps, type CarouselImage, type CarouselEasingPreset } from 'vue-amazing-ui'
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
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/4.jpg'
  },
  {
    name: 'image-5',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg',
    link: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/5.jpg'
  },
  {
    name: 'image-6',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/6.jpg'
  },
  {
    name: 'image-7',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/7.jpg'
  },
  {
    name: 'image-8',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/8.jpg'
  },
  {
    name: 'image-9',
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/9.jpg'
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
// slideFunction 的取值形式：缓动预设名 / 三次贝塞尔控制点数组
const slideEasingType = ref<'preset' | 'bezier'>('preset')
const slideEasingTypeOptions = [
  { label: '缓动预设名', value: 'preset' },
  { label: '贝塞尔数组', value: 'bezier' }
]
// 预设名派生自 @vueuse/core 的 TransitionPresets，随上游自动同步
const slideEasingPresetOptions = Object.keys(TransitionPresets).map((preset) => ({ label: preset, value: preset }))
const slideEasingPreset = ref<CarouselEasingPreset>('easeOutBack')
const slideEasingBezier: CubicBezierPoints = [0.45, 1, 0.55, 1]
const slideEasing = computed(() => (slideEasingType.value === 'preset' ? slideEasingPreset.value : slideEasingBezier))
// fadeFunction 的两种取值形式：四个贝塞尔控制点 / CSS transition-timing-function 写法
const fadeEasingType = ref<'bezier' | 'css'>('bezier')
const fadeEasingTypeOptions = [
  { label: '贝塞尔控制点', value: 'bezier' },
  { label: 'CSS 写法', value: 'css' }
]
const fadeEasingBezier: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
const fadeEasing = computed<CarouselProps['fadeFunction']>(() =>
  fadeEasingType.value === 'bezier' ? fadeEasingBezier : 'ease-in-out'
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
  width: 800,
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
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">当焦点在 <code>Arrow</code> 或 <code>Dots</code> 上时，可以通过键盘上、下、左、右按键切换</p>
    <Carousel :images="images" :width="800" :height="450" @click="clickImage" />
    <h2 class="mt30 mb10">箭头</h2>
    <Space align="center"> showArrow: <Switch v-model="showArrow" /> </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :show-arrow="showArrow" @click="clickImage" />
    <h2 class="mt30 mb10">自动轮播</h2>
    <Carousel :images="images" :width="800" :height="450" autoplay @click="clickImage" />
    <h2 class="mt30 mb10">指示点位置</h2>
    <Radio :options="positionOptions" v-model:value="dotPosition" button button-style="solid" />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" autoplay :dotPosition="dotPosition" />
    <h2 class="mt30 mb10">垂直</h2>
    <Carousel :images="images" :width="800" :height="450" autoplay dotPosition="right" />
    <h2 class="mt30 mb10">移入暂停</h2>
    <Carousel :images="images" :width="800" :height="450" autoplay pause-on-mouse-enter dotPosition="right" />
    <h2 class="mt30 mb10">过渡效果</h2>
    <Radio :options="effectOptions" v-model:value="effect" button button-style="solid" />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :effect="effect" :fade-duration="1500" />
    <h2 class="mt30 mb10">鼠标经过指示点切换轮播图</h2>
    <Radio :options="triggerOptions" v-model:value="dotTrigger" button button-style="solid" />
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :dot-trigger="dotTrigger" />
    <h2 class="mt30 mb10">自定义滑动动画</h2>
    <p class="mb10">
      <code>slideFunction</code> 支持缓动预设名、三次贝塞尔控制点数组与缓动函数，预设名与 <code>@vueuse/core</code> 的
      <code>TransitionPresets</code> 一致
    </p>
    <Space>
      <Radio :options="slideEasingTypeOptions" v-model:value="slideEasingType" button button-style="solid" />
      <Select
        v-if="slideEasingType === 'preset'"
        :options="slideEasingPresetOptions"
        v-model="slideEasingPreset"
        width="200"
        search
      />
    </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :slide-duration="800" :slide-function="slideEasing" />
    <h2 class="mt30 mb10">自定义渐变动画</h2>
    <p class="mb10">
      <code>fadeFunction</code> 可传四个三次贝塞尔控制点（自动转为 CSS <code>cubic-bezier()</code> 写法），也可直接传
      CSS <code>transition-timing-function</code> 写法
    </p>
    <Radio :options="fadeEasingTypeOptions" v-model:value="fadeEasingType" button button-style="solid" />
    <br />
    <br />
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      effect="fade"
      :fade-duration="1500"
      :fade-function="fadeEasing"
    />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      arrow-color="#13C2C2"
      :arrow-size="48"
      dot-active-color="#13C2C2"
      :dot-style="{ backgroundColor: '#FFF' }"
      :dot-active-style="{ width: '25px', backgroundColor: 'gold' }"
      :spin-props="{ indicator: 'dot', color: '#13C2C2' }"
    />
    <h2 class="mt30 mb10">循环切换</h2>
    <p class="mb10">关闭 <code>loop</code> 后到达首尾时，该方向的切换（箭头、键盘、滚轮、拖拽、自动轮播）均失效</p>
    <Space align="center"> loop: <Switch v-model="loop" /> </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :loop="loop" />
    <h2 class="mt30 mb10">单张图片</h2>
    <p class="mb10">图片只有一张时不渲染箭头，也不会自动轮播或响应键盘、滚轮、拖拽切换（指示点仍显示）</p>
    <Carousel :images="singleImage" :width="800" :height="450" />
    <h2 class="mt30 mb10">初始展示页</h2>
    <p class="mb10">通过 <code>initial-index</code> 指定初始展示的图片下标，仅在初始化时生效</p>
    <Space align="center">
      initialIndex: <InputNumber :min="1" :max="images.length" v-model:value="initialIndex" />
    </Space>
    <br />
    <br />
    <Carousel :key="initialIndex" :images="images" :width="800" :height="450" :initial-index="initialIndex" />
    <h2 class="mt30 mb10">受控当前页</h2>
    <p class="mb10">
      通过 <code>v-model:current-index</code> 双向绑定当前页：外部改值即可跳转，点击指示点或箭头切换也会实时回写
    </p>
    <Space align="center">
      当前页：<InputNumber :min="1" :max="images.length" v-model:value="controlledIndex" />
      <Button @click="controlledIndex = 1">跳转到第 1 张</Button>
      <Button @click="controlledIndex = images.length">跳转到最后一张</Button>
    </Space>
    <br />
    <br />
    <Carousel v-model:current-index="controlledIndex" :images="images" :width="800" :height="450" />
    <h2 class="mt30 mb10">切换回调</h2>
    <p class="mb10"><code>beforeChange</code> 在切换开始时触发，<code>afterChange</code> 在切换结束后触发</p>
    <Space align="center"> 最近一次： {{ beforeChangeInfo }} / {{ afterChangeInfo }} </Space>
    <br />
    <br />
    <Carousel
      :images="images"
      :width="800"
      :height="450"
      @before-change="onBeforeChange"
      @after-change="onAfterChange"
    />
    <h2 class="mt30 mb10">图片填充方式</h2>
    <p class="mb10">与 CSS 同名属性一致，默认 <code>fill</code> 拉伸填满容器</p>
    <Space align="center">
      objectFit: <Select :options="objectFitOptions" v-model="objectFit" style="width: 160px" />
    </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :object-fit="objectFit" />
    <h2 class="mt30 mb10">拖拽切换</h2>
    <p class="mb10">
      开启 <code>draggable</code> 后支持鼠标与触摸拖拽，位移超过容器宽度一半或速度超过 <code>0.4px/ms</code> 即翻页
    </p>
    <Space align="center"> draggable: <Switch v-model="draggable" /> </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :draggable="draggable" />
    <h2 class="mt30 mb10">滚轮切换</h2>
    <p class="mb10">开启 <code>mousewheel</code> 后滚轮切换，单次滚动量需超过 <code>10</code></p>
    <Space align="center"> mousewheel: <Switch v-model="mousewheel" /> </Space>
    <br />
    <br />
    <Carousel :images="images" :width="800" :height="450" :mousewheel="mousewheel" />
    <h2 class="mt30 mb10">自定义箭头</h2>
    <p class="mb10">
      通过 <code>prevArrow</code>、<code>nextArrow</code> 插槽自定义箭头，插槽内容仅负责外观，点击切换由组件接管
    </p>
    <Carousel :images="images" :width="800" :height="450">
      <template #prevArrow="{ isPrevDisabled }">
        <span class="custom-arrow" :class="{ 'custom-arrow-disabled': isPrevDisabled }">‹</span>
      </template>
      <template #nextArrow="{ isNextDisabled }">
        <span class="custom-arrow" :class="{ 'custom-arrow-disabled': isNextDisabled }">›</span>
      </template>
    </Carousel>
    <h2 class="mt30 mb10">自定义指示点</h2>
    <p class="mb10">通过 <code>dots</code> 插槽自定义指示点，需自行调用 <code>to(n)</code> 切换</p>
    <Carousel :images="images" :width="800" :height="450">
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
    <h2 class="mt30 mb10">使用 Methods</h2>
    <Space>
      <InputNumber :min="1" :max="images.length" v-model:value="toIndex" />
      <Button @click="carousel?.to(toIndex)">跳转到</Button>
      <Button @click="carousel?.to(toIndex, true)">跳转到（无动画）</Button>
      <Button @click="carousel?.prev()">前一页</Button>
      <Button @click="carousel?.next()">后一页</Button>
      <Button @click="getCurrentIndex">获取当前页：{{ currentIndex }}</Button>
    </Space>
    <br />
    <br />
    <Carousel ref="carousel" :images="images" :width="800" :height="450" />
    <h2 class="mt30 mb10">轮播图配置器</h2>
    <p class="mb10">currentIndex 为受控属性，留空时由组件自行维护当前页，设置后进入受控模式</p>
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
          <Space gap="small" vertical> autoplay：<Switch v-model="state.autoplay" /> </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> pauseOnMouseEnter：<Switch v-model="state.pauseOnMouseEnter" /> </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical>
            effect：<Radio :options="effectOptions" v-model:value="state.effect" button button-style="solid" />
          </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            interval：<Slider v-model:value="state.interval" :min="100" :step="10" :max="10000" />
          </Flex>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> loop：<Switch v-model="state.loop" /> </Space>
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
          <Space gap="small" vertical> showArrow：<Switch v-model="state.showArrow" /> </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> arrowColor：<ColorPicker v-model:value="state.arrowColor" /> </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> arrowSize：<Slider v-model:value="state.arrowSize" :min="1" /> </Flex>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> dots：<Switch v-model="state.dots" /> </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> dotSize：<Slider v-model:value="state.dotSize" :min="4" :max="64" /> </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> dotColor：<ColorPicker v-model:value="state.dotColor" /> </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical> dotActiveColor：<ColorPicker v-model:value="state.dotActiveColor" /> </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            dotPosition：
            <Select :options="positionOptions" v-model="state.dotPosition" />
          </Flex>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical>
            dotTrigger：
            <Radio :options="triggerOptions" v-model:value="state.dotTrigger" button button-style="solid" />
          </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            objectFit：<Select :options="objectFitOptions" v-model="state.objectFit" />
          </Flex>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> draggable：<Switch v-model="state.draggable" /> </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical> mousewheel：<Switch v-model="state.mousewheel" /> </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            fadeDuration：<Slider v-model:value="state.fadeDuration" :min="100" :step="10" :max="10000" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            fadeFunction：<Select :options="fadeFunctionOptions" v-model="state.fadeFunction" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            slideDuration：<Slider v-model:value="state.slideDuration" :min="100" :step="10" :max="10000" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            slideFunction：<Select :options="slideFunctionOptions" v-model="slideFunctionName" />
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
  </div>
</template>
<style lang="less" scoped>
.custom-arrow {
  color: #fff;
  font-size: 36px;
  line-height: 1;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}
.custom-arrow-disabled {
  color: rgba(255, 255, 255, 0.3);
}
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
