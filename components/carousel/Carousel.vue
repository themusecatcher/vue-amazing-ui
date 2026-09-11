<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import { useEventListener, useResizeObserver, useInject, useMediaQuery, useSlotsExist } from 'components/utils'
import { transition } from '@vueuse/core'
import type { CubicBezierPoints, EasingFunction } from '@vueuse/core'
import Spin, { type SpinProps } from 'components/spin'
export interface Image {
  name?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
  target?: '_self' | '_blank' // 如何打开跳转链接
}
export interface Props {
  images?: Image[] // 轮播图图片数组
  width?: number | string // 轮播图宽度，单位 px
  height?: number | string // 轮播图高度，单位 px
  autoplay?: boolean // 是否自动轮播
  pauseOnMouseEnter?: boolean // 当鼠标移入轮播图时，是否暂停自动轮播
  effect?: 'slide' | 'fade' // 轮播图切换时的过渡效果
  interval?: number // 自动轮播间隔，单位 ms
  loop?: boolean // 是否循环切换，为 false 时首尾不再回绕，到达边界后该方向的切换（箭头 / 键盘 / 滚轮 / 拖拽 / 自动轮播）失效
  initialIndex?: number // 初始展示的图片下标，从 1 开始
  currentIndex?: number // 当前展示的图片下标（受控），从 1 开始，配合 v-model:current-index 使用
  showArrow?: boolean // 是否显示箭头
  arrowColor?: string // 箭头颜色
  arrowSize?: number // 箭头大小，单位 px
  dots?: boolean // 是否显示指示点
  dotSize?: number // 指示点大小，单位 px
  dotColor?: string // 指示点颜色
  dotActiveColor?: string // 指示点选中颜色，默认为主题色
  dotStyle?: CSSProperties // 指示点样式，优先级高于 dotSize、dotColor
  dotActiveStyle?: CSSProperties // 指示点选中样式，优先级高于 dotActiveColor
  dotPosition?: 'bottom' | 'top' | 'left' | 'right' // 指示点位置，位置为 'left' | 'right' 时，effect: 'slide' 轮播自动变为垂直轮播
  dotsTrigger?: 'click' | 'hover' // 指示点触发切换的方式
  spinProps?: SpinProps // 图片加载中样式，Spin 组件属性配置，参考 Spin Props
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' // 图片填充方式，同 CSS object-fit，默认 fill 即拉伸填满容器
  draggable?: boolean // 是否可以拖拽滑动切换（鼠标与触摸均支持）
  mousewheel?: boolean // 是否支持鼠标滚轮切换
  fadeDuration?: number // 渐变动画持续时长，单位 ms，仅当 effect 为 'fade' 时生效
  fadeFunction?: string // 渐变动画函数，仅当 effect 为 'fade' 时生效，可参考 transition-timing-function 写法：https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
  slideDuration?: number // 滑动动画持续时长，单位 ms，仅当 effect 为 'slide' 时生效
  slideFunction?: CubicBezierPoints | EasingFunction // 滑动动画函数，仅当 effect 为 'slide' 时生效，可参考 transition 写法：https://vueuse.org/core/useTransition/#usage
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  width: '100%',
  height: '100vh',
  autoplay: false,
  pauseOnMouseEnter: false,
  effect: 'slide',
  interval: 3000,
  loop: true,
  initialIndex: 1,
  showArrow: true,
  arrowColor: '#FFF',
  arrowSize: 36,
  dots: true,
  dotSize: 10,
  dotColor: 'rgba(255, 255, 255, 0.3)',
  dotActiveColor: undefined,
  dotStyle: () => ({}),
  dotActiveStyle: () => ({}),
  dotPosition: 'bottom',
  dotsTrigger: 'click',
  spinProps: () => ({}),
  objectFit: 'fill',
  draggable: false,
  mousewheel: false,
  fadeDuration: 500,
  fadeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  slideDuration: 800,
  slideFunction: () => [0.65, 0, 0.35, 1] as CubicBezierPoints
})
const emits = defineEmits<{
  click: [image: Image] // 点击图片时的回调
  beforeChange: [from: number, to: number] // 切换开始时触发，from 为当前页、to 为目标页，均从 1 开始
  afterChange: [current: number] // 切换结束后触发，参数为当前页，从 1 开始
  'update:currentIndex': [currentIndex: number] // 当前页变更，配合 v-model:current-index 使用，从 1 开始
}>()
const prevArrowSlotExist = useSlotsExist('prevArrow') // 是否提供了自定义上一张箭头插槽
const nextArrowSlotExist = useSlotsExist('nextArrow') // 是否提供了自定义下一张箭头插槽
const offset = ref(0) // 滑动偏移值
const slideTimer = ref<ReturnType<typeof setTimeout> | null>(null) // 轮播切换定时器
const stopCarousel = ref(false) // 鼠标悬浮时，停止切换标志
const switchPrevent = ref(false) // 在滑动切换过程中，禁用其他所有切换操作
let animationId = 0 // 滑动动画令牌，自增即中止在飞的滑动动画
const fadeTimer = ref<ReturnType<typeof setTimeout> | null>(null) // 渐变动画结束后的定时器，用于解锁切换并重启自动轮播
const targetPosition = ref<number>() // 目标移动位置
const carouselRef = ref<HTMLElement | null>(null) // carousel DOM 引用
const activeSwitcher = ref(1) // 当前展示图片标识
const imageWidth = ref<number>() // 图片宽度
const imageHeight = ref<number>() // 图片高度
const noFadeTransition = ref(false) // 临时关闭 fade 过渡（to 的无动画切换使用）
// 已加载完成的图片地址集合：按 src 而非下标记录，图片换序、换地址或重复引用时加载态都不会错位
const loadedSrcs = ref(new Set<string>())
const { colorPalettes } = useInject('Carousel') // 主题色注入
const { match: prefersReducedMotion } = useMediaQuery('(prefers-reduced-motion: reduce)') // 系统「减弱动态效果」偏好
const dragging = ref(false) // 是否处于拖拽会话中（用于禁用文本选择、显示抓取光标）
let dragDragged = false // 本次拖拽会话是否已构成有效拖拽（用于抑制拖拽尾随的点击）
let dragPointerId = -1 // 当前拖拽的指针 id
let dragStartX = 0 // 拖拽起点 X 坐标
let dragStartY = 0 // 拖拽起点 Y 坐标
let dragStartOffset = 0 // 拖拽开始时的位移
let dragStartTime = 0 // 拖拽开始时间戳
let pendingInitialIndex = true // 首次拿到图片数据前，initialIndex 尚未生效
// 拖拽超过该像素位移才视为有效拖拽，避免与点击事件冲突
const DRAG_START_THRESHOLD = 5
// 拖拽判定为翻页的位移比例 / 速度阈值
const DRAG_SWITCH_RATIO = 0.5
const DRAG_SWITCH_VELOCITY = 0.4
// 滚轮单次滚动量阈值，低于该值不切换
const WHEEL_SWITCH_THRESHOLD = 10
// 轮播图区域宽度
const carouselWidth = computed(() => {
  const width = props.width
  return typeof width === 'number' ? `${width}px` : width
})
// 轮播图区域高度
const carouselHeight = computed(() => {
  const height = props.height
  return typeof height === 'number' ? `${height}px` : height
})
// 轮播图片数量
const imageAmount = computed(() => {
  return props.images.length
})
// 首张图片是否加载完成：自动轮播以首图就绪作为启动信号
const firstImageLoaded = computed(() => {
  const firstSrc = props.images[0]?.src
  return firstSrc !== undefined && loadedSrcs.value.has(firstSrc)
})
// 是否垂直轮播
const verticalSlide = computed(() => {
  return ['left', 'right'].includes(props.dotPosition)
})
// 每次移动的单位距离
const moveUnitDistance = computed(() => {
  // 尺寸未测量时按 0 处理，调用侧以 falsy 判定「尚未就绪」，与原先的 undefined 行为一致
  if (verticalSlide.value) {
    return imageHeight.value ?? 0
  } else {
    return imageWidth.value ?? 0
  }
})
// 上一张是否不可切换：图片不足两张，或关闭 loop 后已到达首张
const isPrevDisabled = computed(() => {
  return imageAmount.value <= 1 || (!props.loop && activeSwitcher.value <= 1)
})
// 下一张是否不可切换：图片不足两张，或关闭 loop 后已到达末张
const isNextDisabled = computed(() => {
  return imageAmount.value <= 1 || (!props.loop && activeSwitcher.value >= imageAmount.value)
})
// 指示点选中颜色
const dotActiveColorComputed = computed(() => {
  if (props.dotActiveColor === undefined) {
    return colorPalettes.value[5]
  } else {
    return props.dotActiveColor
  }
})
// 箭头容器尺寸
const arrowStyle = computed(() => {
  return { width: `${props.arrowSize}px`, height: `${props.arrowSize}px` }
})
// fade 过渡时长：无动画切换或系统偏好减弱动效时置 0
const fadeDurationValue = computed(() => {
  return noFadeTransition.value || prefersReducedMotion.value ? 0 : props.fadeDuration
})
// 滑动动画时长：系统偏好减弱动效时置 0（瞬时切换），而非禁用轮播
const slideDurationValue = computed(() => {
  return prefersReducedMotion.value ? 0 : props.slideDuration
})
const carouselStyle = computed(() => {
  if (props.effect === 'slide') {
    return {
      transform: (verticalSlide.value ? 'translateY' : 'translateX') + `(${-offset.value}px)`
    }
  } else {
    return {}
  }
})
// 单张图片的渲染尺寸：尚未测量时不输出内联尺寸，交由 CSS 的 100% 兜底，避免渲染出 width: undefinedpx
const imageSizeStyle = computed(() => {
  const style: CSSProperties = { objectFit: props.objectFit }
  if (imageWidth.value !== undefined) {
    style.width = `${imageWidth.value}px`
  }
  if (imageHeight.value !== undefined) {
    style.height = `${imageHeight.value}px`
  }
  return style
})
// 实际渲染的轮播项：slide 效果且开启 loop 时末尾追加一张首图副本，用于无缝循环；fade 或关闭 loop 时不需要副本
const slideItems = computed(() => {
  const items = props.images.map((image, index) => ({
    image,
    index,
    key: `${index}-${image.src}`,
    clone: false as boolean
  }))
  const firstImage = props.images[0]
  if (firstImage === undefined || props.effect !== 'slide' || !props.loop) {
    return items
  }
  return [...items, { image: firstImage, index: 0, key: `clone-${firstImage.src}`, clone: true }]
})
watch(
  () => [
    verticalSlide.value,
    props.effect,
    props.images,
    props.autoplay,
    props.interval,
    props.loop,
    props.fadeDuration,
    props.fadeFunction,
    firstImageLoaded.value
  ],
  () => {
    initCarousel()
  },
  {
    deep: true,
    flush: 'post'
  }
)
watch(activeSwitcher, (to) => {
  emits('update:currentIndex', to)
})
// 受控 currentIndex 外部变更时同步内部下标（越界值按区间钳制后同步）
watch(
  () => props.currentIndex,
  (value) => {
    if (value === undefined) return
    const nextIndex = normalizeIndex(value)
    if (nextIndex !== activeSwitcher.value) {
      onSwitch(nextIndex)
    }
  }
)
// 实参 document 在 setup 期求值，SSR（Node）下必须先判断存在性再调用
if (typeof document !== 'undefined') {
  useEventListener(document, 'visibilitychange', visibilityChange)
}
useResizeObserver(carouselRef, () => {
  getImageSize()
  initCarousel()
})
// 把任意下标规整到 [1, imageAmount] 区间；数量为 0 或非整数时回落到 1
function normalizeIndex(value: number): number {
  const amount = imageAmount.value
  const safe = Number.isInteger(value) ? value : 1
  return amount === 0 ? 1 : Math.min(Math.max(safe, 1), amount)
}
// 图片数量减少或当前页失效时，把当前页钳制回有效区间：
// 否则 offset 会按越界下标换算（slide 滑出空白区、fade 下所有图片都不满足选中条件而整块不可见）
function clampActiveSwitcher(): void {
  const clamped = normalizeIndex(activeSwitcher.value)
  if (clamped !== activeSwitcher.value) {
    activeSwitcher.value = clamped
  }
}
// 相对当前页取相邻页下标：loop 时环形回绕，否则线性增减（调用侧已先行做边界守卫）
function nextIndexFrom(current: number, step: 1 | -1): number {
  const amount = imageAmount.value
  if (!props.loop) {
    return current + step
  }
  return ((current - 1 + step + amount) % amount) + 1
}
function initCarousel(): void {
  slideTimer.value && clearTimeout(slideTimer.value)
  fadeTimer.value && clearTimeout(fadeTimer.value)
  abortSlide()
  switchPrevent.value = false
  noFadeTransition.value = false
  // 首次拿到图片数据时应用 initialIndex（受控 currentIndex 优先），下标与 to() / 文档一致从 1 开始
  if (pendingInitialIndex && imageAmount.value > 0) {
    pendingInitialIndex = false
    activeSwitcher.value = normalizeIndex(props.currentIndex ?? props.initialIndex)
  }
  clampActiveSwitcher()
  // 尺寸未就绪时跳过换算，避免 offset 被写成 NaN 而渲染出 translateX(NaNpx)
  if (props.effect === 'slide' && moveUnitDistance.value) {
    offset.value = (activeSwitcher.value - 1) * moveUnitDistance.value
  }
  onStart()
}
// 图片加载完成
function onImageLoad(src: string): void {
  loadedSrcs.value.add(src)
}
// 图片加载失败同样结束加载态：否则 Spin 会一直旋转，且蒙层会让该页始终无法点击
function onImageError(src: string): void {
  loadedSrcs.value.add(src)
}
// 获取每张图片尺寸
function getImageSize(): void {
  if (!carouselRef.value) return
  imageWidth.value = carouselRef.value.offsetWidth
  imageHeight.value = carouselRef.value.offsetHeight
}
function onKeyboard(e: KeyboardEvent): void {
  if (imageAmount.value <= 1) return
  const isPrev = e.key === 'ArrowLeft' || e.key === 'ArrowUp'
  const isNext = e.key === 'ArrowRight' || e.key === 'ArrowDown'
  if (!isPrev && !isNext) return
  // 到达边界（loop 关闭）时不做任何处理，也不拦截按键，让焦点/页面滚动保持默认行为
  if ((isPrev && isPrevDisabled.value) || (isNext && isNextDisabled.value)) return
  // 只拦截已处理的按键：无条件 preventDefault 会一并吞掉 Tab，导致键盘焦点无法移出
  e.preventDefault()
  if (isPrev) {
    onLeftArrow()
  } else {
    onRightArrow()
  }
}
// 当用户导航到新页面、切换标签页、关闭标签页、最小化或关闭浏览器，或者在移动设备上从浏览器切换到不同的应用程序时，暂停切换
function visibilityChange(): void {
  const visibility = document.visibilityState
  if (visibility === 'hidden') {
    // hidden
    // 两个定时器都要取消：改用 setTimeout 后回调在后台仍会触发，fade 效果下会违背「暂停切换」的语义
    slideTimer.value && clearTimeout(slideTimer.value)
    fadeTimer.value && clearTimeout(fadeTimer.value)
    // 页面隐藏时通常收不到 pointerup，需在此重置拖拽会话，避免回来后拖拽状态残留
    dragging.value = false
    dragDragged = false
    dragPointerId = -1
    // 有在飞的滑动动画时直接跳到其终点，再中止动画
    if (targetPosition.value !== undefined) {
      offset.value = targetPosition.value
    }
    abortSlide()
    switchPrevent.value = false
  } else {
    // visible
    onStart()
  }
}
// force: 仅用户主动恢复（鼠标移出）时传 true；配置变更、尺寸变化等被动重启不得解除悬停暂停
function onStart(force = false): void {
  if (!props.autoplay || imageAmount.value <= 1 || !firstImageLoaded.value) return
  if (!force && stopCarousel.value) return
  // 超过一条时滑动
  stopCarousel.value = false
  autoSlide() // 自动滑动轮播
}
function onStop(): void {
  slideTimer.value && clearTimeout(slideTimer.value)
  stopCarousel.value = true
}
// 鼠标移入轮播区域：仅 pauseOnMouseEnter 时暂停自动轮播
function onCarouselEnter(): void {
  if (props.autoplay && props.pauseOnMouseEnter) {
    onStop()
  }
}
// 鼠标移出轮播区域：仅 pauseOnMouseEnter 时恢复自动轮播
function onCarouselLeave(): void {
  if (props.autoplay && props.pauseOnMouseEnter) {
    onStart(true)
  }
}
// 切换前置：锁定其他切换、清理自动轮播定时器、抛出 beforeChange
function beginSwitch(nextIndex: number): void {
  switchPrevent.value = true
  slideTimer.value && clearTimeout(slideTimer.value)
  emits('beforeChange', activeSwitcher.value, nextIndex)
}
// loop 下正向回绕后会停在尾部副本上（视觉等同于首张）：切换前先归位到真实起点，避免出现长距离回退动画
function normalizeCloneOffset(): void {
  if (props.loop && activeSwitcher.value === 1 && offset.value === imageAmount.value * moveUnitDistance.value) {
    offset.value = 0
  }
}
// 提交切换：按 effect 分派动画，并统一在结束后抛出 afterChange、续排自动轮播
// instant 为 true 时不播动画直接落位（to(n, true) 使用）
function commitSwitch(nextIndex: number, slideTarget: number, instant: boolean): void {
  if (props.effect === 'fade') {
    // 无动画切换时临时把过渡时长压到 0，切换完成后于下一次宏任务恢复
    noFadeTransition.value = instant
    activeSwitcher.value = nextIndex
    fadeTimer.value && clearTimeout(fadeTimer.value)
    fadeTimer.value = setTimeout(
      () => {
        noFadeTransition.value = false
        switchPrevent.value = false
        emits('afterChange', activeSwitcher.value)
        if (props.autoplay) {
          autoSlide()
        }
      },
      instant ? 0 : fadeDurationValue.value
    )
    return
  }
  if (instant) {
    abortSlide()
    offset.value = slideTarget
    activeSwitcher.value = nextIndex
    switchPrevent.value = false
    emits('afterChange', nextIndex)
    if (props.autoplay) {
      autoSlide()
    }
    return
  }
  activeSwitcher.value = nextIndex
  slideTo(slideTarget)
}
function autoSlide() {
  if (stopCarousel.value) return
  // 容器尺寸为 0 或尚未完成测量时无法计算位移，直接跳过本次调度：
  // 否则 offset % (imageAmount * 0) 会得到 NaN，使滑动动画的插值位置失效。
  // 尺寸就绪后由 ResizeObserver → initCarousel → onStart 重新启动自动轮播。
  if (!moveUnitDistance.value) return
  // 关闭 loop 后到达末页即停止调度，避免空转的定时器
  if (isNextDisabled.value) return
  slideTimer.value && clearTimeout(slideTimer.value)
  slideTimer.value = setTimeout(() => {
    if (isNextDisabled.value) return
    const nextIndex = nextIndexFrom(activeSwitcher.value, 1)
    // 目标位移沿用「当前下标 × 单位距离」：loop 下末页时该值恰为尾部副本位置，形成无缝循环
    const target = activeSwitcher.value * moveUnitDistance.value
    if (props.effect === 'slide') {
      normalizeCloneOffset()
    }
    beginSwitch(nextIndex)
    commitSwitch(nextIndex, target, false)
  }, props.interval)
}
function onLeftArrow(): void {
  // 图片不足两张或已到达首张（loop 关闭）时无可切换内容，直接返回
  if (isPrevDisabled.value || switchPrevent.value) return
  const nextIndex = nextIndexFrom(activeSwitcher.value, -1)
  const target = (nextIndex - 1) * moveUnitDistance.value
  // loop 下从首张回退到尾张：先把起点瞬移到尾部副本（显示的就是首张），再滑向尾张，视觉上无缝
  if (props.effect === 'slide' && props.loop && offset.value === 0 && imageAmount.value > 1) {
    offset.value = imageAmount.value * moveUnitDistance.value
  }
  beginSwitch(nextIndex)
  commitSwitch(nextIndex, target, false)
}
function onRightArrow(): void {
  // 图片不足两张或已到达末张（loop 关闭）时无可切换内容，直接返回
  if (isNextDisabled.value || switchPrevent.value) return
  const nextIndex = nextIndexFrom(activeSwitcher.value, 1)
  const target = activeSwitcher.value * moveUnitDistance.value
  if (props.effect === 'slide') {
    normalizeCloneOffset()
  }
  beginSwitch(nextIndex)
  commitSwitch(nextIndex, target, false)
}
// 滑动到目标位置：由 @vueuse/core 的 transition 直接驱动 offset，
// 动画结束会精确写入目标值，因此回弹类缓动（含过冲）也能正确落位
function slideTo(target: number): void {
  const id = ++animationId
  const from = offset.value
  targetPosition.value = target
  const duration = slideDurationValue.value
  // 起点与终点一致，或时长被压到 0（系统偏好减弱动效）时直接落位
  if (from === target || duration <= 0) {
    offset.value = target
    targetPosition.value = undefined
    onSlideFinish()
    return
  }
  transition(offset, from, target, {
    duration, // 过渡动画时长，每次调用现读，保证 prop 响应式
    easing: props.slideFunction, // 过渡动画函数，同上
    abort: () => id !== animationId
  }).then(() => {
    if (id !== animationId) return
    targetPosition.value = undefined
    onSlideFinish()
  })
}
// 中止在飞的滑动动画（不写入终值）
function abortSlide(): void {
  animationId++
  targetPosition.value = undefined
}
// 滑动结束：解锁切换，并在自动轮播下调度下一次
function onSlideFinish(): void {
  switchPrevent.value = false
  emits('afterChange', activeSwitcher.value)
  if (props.autoplay) {
    autoSlide() // 自动间隔切换下一张
  }
}
// 分页 / 指定页切换图片
function onSwitch(n: number, dontAnimate = false): void {
  if (switchPrevent.value || activeSwitcher.value === n) return
  if (props.effect === 'slide') {
    normalizeCloneOffset()
  }
  const target = (n - 1) * moveUnitDistance.value
  beginSwitch(n)
  commitSwitch(n, target, dontAnimate)
}
// 指示点点击切换
function onDotClick(n: number): void {
  if (props.dotsTrigger === 'click') {
    onSwitch(n)
  }
}
// 指示点悬停切换
function onDotMouseEnter(n: number): void {
  if (props.dotsTrigger === 'hover') {
    onSwitch(n)
  }
}
// 轮播项点击：拖拽结束后的点击不触发 click 事件，也不跟随链接跳转
function onImageClick(e: MouseEvent, image: Image): void {
  if (dragDragged) {
    dragDragged = false
    e.preventDefault()
    return
  }
  emits('click', image)
}
// 拖拽开始时禁止浏览器原生拖拽（否则 <img> / <a> 会抢走指针事件）
function onDragStart(e: DragEvent): void {
  if (props.draggable) {
    e.preventDefault()
  }
}
function onPointerDown(e: PointerEvent): void {
  if (!props.draggable || imageAmount.value <= 1) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  const el = carouselRef.value
  if (!el) return
  dragging.value = true
  dragDragged = false
  dragPointerId = e.pointerId
  dragStartX = e.clientX
  dragStartY = e.clientY
  dragStartOffset = offset.value
  dragStartTime = Date.now()
  // 接管交互：中止在飞动画并暂停自动轮播，拖拽期间不与其他切换竞争
  abortSlide()
  switchPrevent.value = false
  slideTimer.value && clearTimeout(slideTimer.value)
  // 指针捕获后，move / up 事件都会派发到本元素，无需在 document 上挂监听
  if (typeof el.setPointerCapture === 'function') {
    el.setPointerCapture(e.pointerId)
  }
}
function onPointerMove(e: PointerEvent): void {
  if (!dragging.value) return
  const delta = verticalSlide.value ? e.clientY - dragStartY : e.clientX - dragStartX
  if (!dragDragged && Math.abs(delta) < DRAG_START_THRESHOLD) return
  dragDragged = true
  const unit = moveUnitDistance.value
  // 可拖拽范围：loop 时尾张后可露出尾部副本，否则止步于尾张
  const maxOffset = (props.loop ? imageAmount.value : imageAmount.value - 1) * unit
  const next = Math.min(Math.max(dragStartOffset - delta, 0), maxOffset)
  offset.value = next
}
function onPointerUp(): void {
  endDrag(false)
}
function onPointerCancel(): void {
  endDrag(true)
}
// 结束拖拽：按位移比例 / 速度判定是否翻页，否则回弹到起始位移
function endDrag(cancel: boolean): void {
  if (!dragging.value) return
  const el = carouselRef.value
  if (el && dragPointerId !== -1 && typeof el.releasePointerCapture === 'function') {
    el.releasePointerCapture(dragPointerId)
  }
  dragging.value = false
  dragPointerId = -1
  const unit = moveUnitDistance.value
  // 未构成有效拖拽（普通点击）：恢复被 pointerdown 暂停的自动轮播，并保留点击语义
  if (!dragDragged || !unit) {
    onStart()
    return
  }
  const moved = offset.value - dragStartOffset
  const elapsed = Math.max(Date.now() - dragStartTime, 1)
  const velocity = moved / elapsed
  const beyondThreshold = Math.abs(moved) > unit * DRAG_SWITCH_RATIO || Math.abs(velocity) > DRAG_SWITCH_VELOCITY
  if (cancel || !beyondThreshold) {
    slideTo(dragStartOffset)
    return
  }
  if (moved > 0) {
    if (isNextDisabled.value) {
      slideTo(dragStartOffset)
    } else {
      onRightArrow()
    }
  } else {
    if (isPrevDisabled.value) {
      slideTo(dragStartOffset)
    } else {
      onLeftArrow()
    }
  }
}
// 鼠标滚轮切换：单次滚动量超过阈值才切换一页，且不与进行中的切换竞争
function onMouseWheel(e: WheelEvent): void {
  if (!props.mousewheel || dragging.value) return
  if (imageAmount.value <= 1) return
  e.preventDefault()
  if (switchPrevent.value) return
  // 垂直轮播取纵向滚动量；水平轮播优先取横向，无横向分量时回退到纵向以兼容普通鼠标滚轮
  const horizontal = e.deltaX !== 0 ? e.deltaX : e.deltaY
  const step = verticalSlide.value ? e.deltaY : horizontal
  if (Math.abs(step) < WHEEL_SWITCH_THRESHOLD) return
  if (step > 0) {
    if (!isNextDisabled.value) {
      onRightArrow()
    }
  } else {
    if (!isPrevDisabled.value) {
      onLeftArrow()
    }
  }
}
function to(n: number, dontAnimate = false): void {
  // 非整数入参会写入非整数的当前页，使指示点永不命中、change 传出非法下标
  if (!Number.isInteger(n)) return
  if (n >= 1 && n <= imageAmount.value) {
    onSwitch(n, dontAnimate)
  }
}
function prev(): void {
  onLeftArrow()
}
function next(): void {
  onRightArrow()
}
function getCurrentIndex(): number {
  return activeSwitcher.value
}
onBeforeUnmount(() => {
  slideTimer.value && clearTimeout(slideTimer.value)
  fadeTimer.value && clearTimeout(fadeTimer.value)
  abortSlide()
})
defineExpose({
  to,
  prev,
  next,
  getCurrentIndex
})
</script>
<template>
  <div
    ref="carouselRef"
    class="carousel-wrap"
    :class="{
      'carousel-vertical': verticalSlide,
      'carousel-fade': effect === 'fade',
      'carousel-draggable': draggable,
      'carousel-dragging': dragging
    }"
    :style="`
      --carousel-width: ${carouselWidth};
      --carousel-height: ${carouselHeight};
      --carousel-arrow-color: ${arrowColor};
      --carousel-dot-size: ${dotSize}px;
      --carousel-dot-color: ${dotColor};
      --carousel-fade-duration: ${fadeDurationValue}ms;
      --carousel-fade-function: ${fadeFunction};
    `"
    @mouseenter="onCarouselEnter"
    @mouseleave="onCarouselLeave"
    @wheel="onMouseWheel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @dragstart="onDragStart"
  >
    <div class="carousel-flex-wrap" :style="carouselStyle">
      <div
        class="image-wrap"
        :class="{ 'image-fade-active': effect === 'fade' && activeSwitcher === item.index + 1 }"
        :aria-hidden="item.clone ? 'true' : undefined"
        @click="onImageClick($event, item.image)"
        v-for="item in slideItems"
        :key="item.key"
      >
        <Spin :spinning="!loadedSrcs.has(item.image.src)" indicator="dynamic-circle" v-bind="spinProps">
          <a
            class="image-link"
            :class="{ 'link-cursor': item.image.link }"
            :href="item.image.link"
            :target="item.image.target ? item.image.target : '_blank'"
            :tabindex="item.clone ? -1 : undefined"
          >
            <img
              @load="onImageLoad(item.image.src)"
              @error="onImageError(item.image.src)"
              :src="item.image.src"
              :alt="item.image.name"
              class="image-item"
              :style="imageSizeStyle"
              draggable="false"
            />
          </a>
        </Spin>
      </div>
    </div>
    <template v-if="showArrow && imageAmount > 1">
      <div
        class="arrow-left"
        :class="{ 'arrow-custom': prevArrowSlotExist }"
        tabindex="0"
        :style="prevArrowSlotExist ? undefined : arrowStyle"
        @click="onLeftArrow"
        @keydown="onKeyboard"
      >
        <slot
          name="prevArrow"
          :prev="prev"
          :next="next"
          :to="to"
          :total="imageAmount"
          :current-index="activeSwitcher"
          :is-prev-disabled="isPrevDisabled"
          :is-next-disabled="isNextDisabled"
        >
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z"
            ></path>
          </svg>
        </slot>
      </div>
      <div
        class="arrow-right"
        :class="{ 'arrow-custom': nextArrowSlotExist }"
        tabindex="0"
        :style="nextArrowSlotExist ? undefined : arrowStyle"
        @click="onRightArrow"
        @keydown="onKeyboard"
      >
        <slot
          name="nextArrow"
          :prev="prev"
          :next="next"
          :to="to"
          :total="imageAmount"
          :current-index="activeSwitcher"
          :is-prev-disabled="isPrevDisabled"
          :is-next-disabled="isNextDisabled"
        >
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z"
            ></path>
          </svg>
        </slot>
      </div>
    </template>
    <div class="carousel-switch" :class="`switch-${dotPosition}`" v-if="dots">
      <slot name="dots" :to="to" :total="imageAmount" :current-index="activeSwitcher">
        <div
          tabindex="0"
          class="dot-item"
          :style="[
            dotStyle,
            activeSwitcher === n ? { backgroundColor: dotActiveColorComputed, ...dotActiveStyle } : {}
          ]"
          v-for="n in imageAmount"
          :key="n"
          @click="onDotClick(n)"
          @mouseenter="onDotMouseEnter(n)"
          @keydown="onKeyboard"
        ></div>
      </slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.carousel-wrap {
  display: inline-block;
  width: var(--carousel-width);
  height: var(--carousel-height);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .carousel-flex-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    .image-wrap {
      // 指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值
      flex-shrink: 0; // 默认为 1，为 0 时不缩小
      display: inline-block;
      cursor: pointer;
      .image-link {
        display: block;
        height: 100%;
        cursor: default;
        .image-item {
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius);
          display: inline-block;
          vertical-align: bottom;
        }
      }
      .link-cursor {
        cursor: pointer;
      }
    }
  }
  &:hover {
    // 自定义箭头由使用方决定外观，不参与悬停变暗
    .arrow-left:not(.arrow-custom) {
      opacity: 0.7;
      pointer-events: auto;
    }
    .arrow-right:not(.arrow-custom) {
      opacity: 0.7;
      pointer-events: auto;
    }
  }
  .arrow-left,
  .arrow-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--carousel-arrow-color);
    fill: currentColor;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
    // 键盘聚焦时同样要让箭头可见：默认 opacity: 0 会把焦点样式一起隐藏
    &:focus-visible {
      opacity: 1;
      pointer-events: auto;
    }
    .arrow-icon {
      width: 100%;
      height: 100%;
    }
  }
  .arrow-left {
    left: 6px;
  }
  .arrow-right {
    right: 6px;
  }
  // 自定义箭头由使用方决定外观，默认常显并可直接交互
  .arrow-custom {
    opacity: 1;
    pointer-events: auto;
  }
  .carousel-switch {
    display: flex;
    justify-content: center;
    gap: 8px;
    position: absolute;
    z-index: 9;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    .dot-item {
      // flex: 0 1 auto;
      width: var(--carousel-dot-size);
      height: var(--carousel-dot-size);
      border-radius: var(--carousel-dot-size);
      background-color: var(--carousel-dot-color);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  .switch-top {
    top: 12px;
    bottom: auto;
  }
  .switch-left {
    left: 12px;
    right: auto;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    flex-direction: column;
  }
  .switch-right {
    right: 12px;
    left: auto;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    flex-direction: column;
  }
}
// 可拖拽时禁用浏览器默认手势：水平轮播只接管横向、垂直轮播只接管纵向，其余方向仍可滚动页面
.carousel-draggable {
  touch-action: pan-y;
}
.carousel-vertical.carousel-draggable {
  touch-action: pan-x;
}
.carousel-dragging {
  cursor: grabbing;
  user-select: none;
}
.carousel-vertical {
  .carousel-flex-wrap {
    flex-direction: column;
  }
  .arrow-left {
    top: 6px;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
  .arrow-right {
    top: auto;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
}
.carousel-fade {
  .image-wrap {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    transition-property: opacity;
    transition-duration: var(--carousel-fade-duration);
    transition-timing-function: var(--carousel-fade-function);
  }
  .image-fade-active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
