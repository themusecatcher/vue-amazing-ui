<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import {
  useSlotsExist,
  useMutationObserver,
  useEventListener,
  useResizeObserver,
  rafTimeout,
  cancelRaf,
  useOptionsSupported
} from 'components/utils'
export interface Props {
  maxWidth?: string | number // 文字提示最大宽度，单位 px
  content?: string // 展示的内容 string | slot
  contentClass?: string // 设置展示内容的类名
  contentStyle?: CSSProperties // 设置展示内容的样式
  tooltip?: string // 文字提示内容 string | slot
  tooltipClass?: string // 设置文字提示的类名
  tooltipStyle?: CSSProperties // 设置文字提示的样式
  bgColor?: string // 文字提示框背景颜色，支持预设色或自定义色值 (如 #f50/rgba)
  arrow?: boolean // 是否显示箭头
  arrowPointAtCenter?: boolean // 箭头是否指向目标元素中心，仅当 placement 为复合方向 (如 topLeft) 时生效
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom' // 文字提示位置
  flip?: boolean // 文字提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  trigger?: 'hover' | 'click' | 'focus' | 'contextmenu' // 文字提示触发方式
  keyboard?: boolean // 是否支持按键操作 (enter 显示；esc 关闭)，仅当 trigger: 'click' 时生效
  disabled?: boolean // 是否禁用文字提示，禁用后不响应任何触发
  to?: string | HTMLElement | false // 弹出框挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  transitionDuration?: number // 文字提示动画的过渡持续时间，单位 ms
  showDelay?: number // 文字提示显示的延迟时间，单位 ms，仅当 trigger: hover 时生效
  hideDelay?: number // 文字提示隐藏的延迟时间，单位 ms，仅当 trigger: hover 时生效
  show?: boolean // (v-model) 文字提示是否显示
  showControl?: boolean // 只使用 show 属性控制显示隐藏，仅当 trigger: hover 时生效，此时移入移出将不会触发显示隐藏，全部由 show 属性控制
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: 240,
  content: undefined,
  contentClass: undefined,
  contentStyle: () => ({}),
  tooltip: undefined,
  tooltipClass: undefined,
  tooltipStyle: () => ({}),
  bgColor: 'rgba(0, 0, 0, 0.85)',
  arrow: true,
  arrowPointAtCenter: false,
  placement: 'top',
  flip: true,
  trigger: 'hover',
  keyboard: false,
  disabled: false,
  to: 'body',
  transitionDuration: 100,
  showDelay: 100,
  hideDelay: 100,
  show: false,
  showControl: false
})
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const tooltipShow = ref<boolean>(false) // tooltip 显示隐藏标识
const tooltipTimer = ref() // tooltip 延迟显示隐藏的定时器标识符
const positionRaf = ref<{ id: number } | null>(null) // 位置更新的 rAF 帧标识，用于合并同一帧内的多次位置重算
const scrollTarget = ref<HTMLElement | null>(null) // 最近的可滚动父元素
const scrollTop = ref<number>(0) // scrollTarget 的滚动位置
const cardTop = ref<number>(0) // 弹出框相对于 tooltipContent 的垂直位置
const cardLeft = ref<number>(0) // 弹出框相对于 tooltipContent 的水平位置
type Placement = NonNullable<Props['placement']>
type MainAxis = 'top' | 'bottom' | 'left' | 'right' // 主轴方向
type CrossAlign = 'start' | 'center' | 'end' // 次轴对齐方式
const tooltipPlace = ref<Placement>('top') // 弹出框位置
const tooltipContentRef = ref<HTMLElement | null>(null) // tooltipContent 模板引用
const tooltipContentRect = ref<DOMRect>() // tooltipContent 元素的大小及其相对于视口的位置
const tooltipRef = ref<HTMLElement | null>(null) // tooltip 模板引用
const positionedContainer = ref<HTMLElement | null>(null) // 弹出框相对定位的容器元素
const positionedContainerRect = ref<DOMRect>() // positionedContainer 元素的大小及其相对于视口的位置
const tooltipCardRef = ref<HTMLElement | null>(null) // tooltipCard 模板引用
const tooltipCardRect = ref<DOMRect>() // tooltipCard 元素的大小及其相对于视口的位置
const viewportWidth = ref<number>(document.documentElement.clientWidth) // 视口宽度(不包括滚动条)
const viewportHeight = ref<number>(document.documentElement.clientHeight) // 视口高度(不包括滚动条)
const { isSupported: passiveSupported } = useOptionsSupported('passive')
const { isSupported: captureSupported } = useOptionsSupported('capture')
const emits = defineEmits(['update:show', 'openChange', 'animationend'])
const slotsExist = useSlotsExist(['tooltip'])
// 预设色板：色名 → 色值
const presetColors: Record<string, string> = {
  pink: '#eb2f96',
  red: '#f5222d',
  yellow: '#fadb14',
  orange: '#fa8c16',
  cyan: '#13c2c2',
  green: '#52c41a',
  blue: '#1677ff',
  purple: '#722ed1',
  geekblue: '#2f54eb',
  magenta: '#eb2f96',
  volcano: '#fa541c',
  gold: '#faad14',
  lime: '#a0d911'
}
// 解析背景色：预设色名映射为对应色值，否则作为自定义色值直接使用
const tooltipBgColor = computed(() => {
  return presetColors[props.bgColor] ?? props.bgColor
})
const tooltipMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return `${props.maxWidth}px`
  }
  return props.maxWidth
})
const showTooltip = computed(() => {
  return slotsExist.tooltip || props.tooltip
})
// 复合方向时箭头中心距卡片对齐边的距离，单位 px
const arrowOffset = computed(() => {
  return props.arrow ? 13 : 8
})
// 将 tooltipPlace 拆分为主轴方向 (top/bottom/left/right)
const mainAxis = computed<MainAxis>(() => {
  const place = tooltipPlace.value
  if (place.startsWith('top')) return 'top'
  if (place.startsWith('bottom')) return 'bottom'
  if (place.startsWith('left')) return 'left'
  if (place.startsWith('right')) return 'right'
  return 'top'
})
// 将 tooltipPlace 拆分为次轴对齐方式 (start/center/end)
const crossAlign = computed<CrossAlign>(() => {
  const place = tooltipPlace.value
  if (place.endsWith('Left') || place.endsWith('Top')) return 'start'
  if (place.endsWith('Right') || place.endsWith('Bottom')) return 'end'
  return 'center'
})
const tooltipPlacement = computed(() => {
  const contentTop = (tooltipContentRect.value as DOMRect)?.top ?? 0
  const containerTop = (positionedContainerRect.value as DOMRect)?.top ?? 0
  const offsetTop = contentTop - containerTop
  const contentLeft = (tooltipContentRect.value as DOMRect)?.left ?? 0
  const containerLeft = (positionedContainerRect.value as DOMRect)?.left ?? 0
  const offsetLeft = contentLeft - containerLeft
  // 箭头贴合边缘时的 transformOrigin 基准值
  const arrowEdge = props.arrow ? -4 : -6
  switch (mainAxis.value) {
    case 'top':
      return {
        transformOrigin: `${transformOriginCross.value} ${cardTop.value}px`,
        top: `${offsetTop - cardTop.value}px`,
        left: `${offsetLeft - cardLeft.value}px`
      }
    case 'bottom':
      return {
        transformOrigin: `${transformOriginCross.value} ${arrowEdge}px`,
        top: `${offsetTop + cardTop.value}px`,
        left: `${offsetLeft - cardLeft.value}px`
      }
    case 'left':
      return {
        transformOrigin: `${cardLeft.value}px ${transformOriginCross.value}`,
        top: `${offsetTop - cardTop.value}px`,
        left: `${offsetLeft - cardLeft.value}px`
      }
    case 'right':
      return {
        transformOrigin: `${arrowEdge}px ${transformOriginCross.value}`,
        top: `${offsetTop - cardTop.value}px`,
        left: `${offsetLeft + cardLeft.value}px`
      }
    default:
      return {
        transformOrigin: `50% ${cardTop.value}px`,
        top: `${offsetTop - cardTop.value}px`,
        left: `${offsetLeft - cardLeft.value}px`
      }
  }
})
// 次轴方向上的缩放动画原点 (复合方向对齐到箭头所在侧)
const transformOriginCross = computed(() => {
  if (crossAlign.value === 'start') return `${arrowOffset.value}px`
  if (crossAlign.value === 'end') return `calc(100% - ${arrowOffset.value}px)`
  return '50%'
})
watch([() => props.placement, () => props.arrow, () => props.arrowPointAtCenter, () => props.flip], () => {
  updatePosition()
})
watch(
  () => showTooltip.value && tooltipShow.value,
  (to) => {
    if (to && !initialDisplay.value) {
      initialDisplay.value = true
    }
  },
  {
    immediate: true
  }
)
watch(
  () => props.show,
  (to) => {
    if (to && !tooltipShow.value) {
      onShow()
    }
    if (!to && tooltipShow.value) {
      onHide()
    }
  },
  {
    immediate: true
  }
)
onMounted(() => {
  observeScroll()
})
onBeforeUnmount(() => {
  cleanup()
})
// 监听 vitepress 文档页面滚动
const mutationObserver = useMutationObserver(
  scrollTarget,
  () => {
    if (scrollTop.value !== scrollTarget.value?.scrollTop) {
      scrollTop.value = scrollTarget.value?.scrollTop ?? 0
      updatePosition()
    }
  },
  { subtree: true, attributes: true }
)
useEventListener(window, 'resize', getViewportSize)
// 监听 tooltipCard 和 tooltipContent 的尺寸变化，更新弹出框位置
useResizeObserver([tooltipCardRef, tooltipContentRef], (entries: ResizeObserverEntry[]) => {
  // 排除 tooltipCard 显示过渡动画时的尺寸变化
  if (!(showTooltip.value && tooltipShow.value)) return
  if (entries.length === 1 && entries[0].target.classList.contains('tooltip-card')) {
    const { blockSize, inlineSize } = entries[0].borderBoxSize[0]
    if (
      Math.round(blockSize) === Math.round((tooltipCardRect.value as DOMRect).height) &&
      Math.round(inlineSize) === Math.round((tooltipCardRect.value as DOMRect).width)
    ) {
      return
    }
  }
  updatePosition()
})
// 获取弹出框相对定位的容器元素
function getPositionedContainer(): void {
  let parentElement = tooltipRef.value?.parentElement
  while (parentElement) {
    if (parentElement === document.documentElement) {
      positionedContainer.value = document.documentElement
      return
    }
    const { position } = getComputedStyle(parentElement)
    if (position !== 'static') {
      positionedContainer.value = parentElement
      return
    }
    parentElement = parentElement.parentElement
  }
}
function getViewportSize() {
  viewportWidth.value = document.documentElement.clientWidth
  viewportHeight.value = document.documentElement.clientHeight
  observeScroll() // 窗口尺寸变化时，重新查询并监听最近可滚动父元素
  updatePosition()
}
// 查询并监听最近可滚动父元素
function observeScroll() {
  cleanup()
  scrollTarget.value = getScrollParent(tooltipContentRef.value)
  scrollTarget.value &&
    scrollTarget.value.addEventListener(
      'scroll',
      updatePosition,
      passiveSupported.value ? { passive: true } : undefined
    )
  if (scrollTarget.value === document.documentElement) {
    mutationObserver.start()
  } else {
    mutationObserver.stop()
  }
}
/**
 * 清理滚动监听事件并重置滚动目标
 *
 * 清理函数，移除滚动事件监听并重置滚动目标
 */
function cleanup() {
  scrollTarget.value && scrollTarget.value.removeEventListener('scroll', updatePosition)
  scrollTarget.value = null
  if (positionRaf.value) {
    cancelRaf(positionRaf.value)
    positionRaf.value = null
  }
}
// 获取父元素
function getParentElement(el: HTMLElement): HTMLElement | null {
  // Document
  if (el === document.documentElement) return null
  return el.parentElement
}
// 查找最近的可滚动父元素
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (el === null) return null
  const parentElement = getParentElement(el)
  if (parentElement === null) return null
  // Document
  if (parentElement === document.documentElement) return document.documentElement
  const isScrollable = (el: HTMLElement): boolean => {
    const { overflow, overflowX, overflowY } = getComputedStyle(el)
    return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
  }
  // Element
  if (isScrollable(parentElement)) return parentElement
  return getScrollParent(parentElement)
}
// 更新文字提示位置：用 rAF 合并同一帧内的多次调用 (scroll/resize/observer 高频触发)，
// 每帧渲染前只执行一次 getPosition，与浏览器渲染节奏对齐，跟手且减少强制 reflow
function updatePosition() {
  if (!tooltipShow.value) return
  if (positionRaf.value) return // 本帧已排队，跳过重复调度
  positionRaf.value = rafTimeout(() => {
    positionRaf.value = null
    tooltipShow.value && getPosition()
  })
}
// 计算文字提示位置
async function getPosition() {
  await nextTick()
  getPositionedContainer()
  positionedContainerRect.value = positionedContainer.value?.getBoundingClientRect() as DOMRect
  tooltipContentRect.value = tooltipContentRef.value?.getBoundingClientRect() as DOMRect
  tooltipCardRect.value = tooltipCardRef.value?.getBoundingClientRect() as DOMRect
  if (props.flip) {
    tooltipPlace.value = getPlacement()
  } else {
    tooltipPlace.value = props.placement
  }
  const cardWidth = tooltipCardRect.value.width
  const cardHeight = tooltipCardRect.value.height
  // 内容实际尺寸：取首个元素 (触发元素) 的边框矩形，避免 tooltip-content 包裹的子元素 margin 被计入
  const contentEl = tooltipContentRef.value?.firstElementChild as HTMLElement | null
  const contentRect = contentEl?.getBoundingClientRect() ?? tooltipContentRect.value
  const contentWidth = contentRect.width
  const contentHeight = contentRect.height
  // 主轴偏移：弹出框相对内容元素在主轴方向上的距离
  const mainOffset = {
    top: cardHeight + (props.arrow ? 4 + 12 : 6),
    bottom: contentHeight + (props.arrow ? 4 : 6),
    left: cardWidth + (props.arrow ? 4 + 12 : 6),
    right: contentWidth + (props.arrow ? 4 : 6)
  }
  // 次轴偏移：根据对齐方式 (start/center/end) 计算，复合方向支持箭头指向中心
  function getCrossOffset(cardSize: number, contentSize: number): number {
    if (crossAlign.value === 'center') {
      return (cardSize - contentSize) / 2
    }
    if (crossAlign.value === 'start') {
      return props.arrowPointAtCenter ? arrowOffset.value - contentSize / 2 : 0
    }
    // end
    return props.arrowPointAtCenter ? cardSize - arrowOffset.value - contentSize / 2 : cardSize - contentSize
  }
  if (mainAxis.value === 'top') {
    cardTop.value = mainOffset.top
    cardLeft.value = getCrossOffset(cardWidth, contentWidth)
    clampCrossAxis(cardWidth, cardHeight, 'horizontal')
  } else if (mainAxis.value === 'bottom') {
    cardTop.value = mainOffset.bottom
    cardLeft.value = getCrossOffset(cardWidth, contentWidth)
    clampCrossAxis(cardWidth, cardHeight, 'horizontal')
  } else if (mainAxis.value === 'left') {
    cardTop.value = getCrossOffset(cardHeight, contentHeight)
    cardLeft.value = mainOffset.left
    clampCrossAxis(cardWidth, cardHeight, 'vertical')
  } else if (mainAxis.value === 'right') {
    cardTop.value = getCrossOffset(cardHeight, contentHeight)
    cardLeft.value = mainOffset.right
    clampCrossAxis(cardWidth, cardHeight, 'vertical')
  }
}
// 次轴方向溢出兜底 (对齐 dom-align 的 adjustX/adjustY)：
// 主轴为 top/bottom 时按水平方向 clamp 弹出框到遮挡边界内，主轴为 left/right 时按垂直方向 clamp，
// 避免弹出框次轴方向超出视口或滚动容器边界。基准使用 tooltipContentRect (即 .tooltip-content)，
// 与 tooltipPlacement 渲染时的 left/top 计算口径保持一致
function clampCrossAxis(cardWidth: number, cardHeight: number, crossAxis: 'horizontal' | 'vertical'): void {
  if (!props.flip) return
  const shelter = getShelterRect()
  const contentRect = tooltipContentRect.value as DOMRect
  if (crossAxis === 'horizontal') {
    // 弹出框左/右边缘相对视口位置 = contentRect.left - cardLeft (+ cardWidth)
    const cardLeftEdge = contentRect.left - cardLeft.value
    const cardRightEdge = cardLeftEdge + cardWidth
    if (cardRightEdge > shelter.right) {
      cardLeft.value += cardRightEdge - shelter.right
    }
    if (cardLeftEdge < shelter.left) {
      cardLeft.value -= shelter.left - cardLeftEdge
    }
  } else {
    // 弹出框上/下边缘相对视口位置 = contentRect.top - cardTop (+ cardHeight)
    const cardTopEdge = contentRect.top - cardTop.value
    const cardBottomEdge = cardTopEdge + cardHeight
    if (cardBottomEdge > shelter.bottom) {
      cardTop.value += cardBottomEdge - shelter.bottom
    }
    if (cardTopEdge < shelter.top) {
      cardTop.value -= shelter.top - cardTopEdge
    }
  }
}
// 获取遮挡边界矩形：仅当可滚动父元素真正裁剪弹出框 (即弹出框挂载在该容器内) 时，才以其为界，否则以视口为界
// 修复：弹出框 Teleport 到 body/具名容器时不受中间滚动容器 overflow 裁剪，flip 边界应为视口，避免空间充足却意外翻转
function getShelterRect() {
  const clipByScrollTarget =
    scrollTarget.value &&
    scrollTarget.value !== document.documentElement &&
    scrollTarget.value.contains(tooltipRef.value)
  if (scrollTarget.value && clipByScrollTarget) {
    const scrollTargetRect = scrollTarget.value.getBoundingClientRect()
    return {
      top: scrollTargetRect.top < 0 ? 0 : scrollTargetRect.top,
      left: scrollTargetRect.left < 0 ? 0 : scrollTargetRect.left,
      bottom: scrollTargetRect.bottom > viewportHeight.value ? viewportHeight.value : scrollTargetRect.bottom,
      right: scrollTargetRect.right > viewportWidth.value ? viewportWidth.value : scrollTargetRect.right
    }
  }
  return {
    top: 0,
    left: 0,
    bottom: viewportHeight.value,
    right: viewportWidth.value
  }
}
// 文字提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
// 主轴仅在同轴方向翻转 (top↔bottom / left↔right)，绝不跨轴，
// 且始终保留原次轴对齐后缀 (如 Left/Right/Top/Bottom)，因此 bottomLeft 只会在 bottomLeft ↔ topLeft 之间切换
function getPlacement(): Placement {
  // 提取 props.placement 的主轴方向与次轴后缀
  const propPlace = props.placement
  let baseMain: MainAxis = 'top'
  if (propPlace.startsWith('top')) baseMain = 'top'
  else if (propPlace.startsWith('bottom')) baseMain = 'bottom'
  else if (propPlace.startsWith('left')) baseMain = 'left'
  else if (propPlace.startsWith('right')) baseMain = 'right'
  const crossSuffix = propPlace.slice(baseMain.length) // '' | 'Left' | 'Right' | 'Top' | 'Bottom'
  const { top, bottom, left, right } = tooltipContentRect.value as DOMRect // 内容元素各边缘相对于浏览器视口的位置(不包括滚动条)
  const { top: targetTop, bottom: targetBottom, left: targetLeft, right: targetRight } = getShelterRect() // 滚动元素或视口各边缘相对于浏览器视口的位置(不包括滚动条)
  const topDistance = top - targetTop - (props.arrow ? 12 : 0) // 内容元素上边缘距离滚动元素上边缘的距离
  const bottomDistance = targetBottom - bottom - (props.arrow ? 12 : 0) // 内容元素下边缘距离滚动元素下边缘的距离
  const leftDistance = left - targetLeft - (props.arrow ? 12 : 0) // 内容元素左边缘距离滚动元素左边缘的距离
  const rightDistance = targetRight - right - (props.arrow ? 12 : 0) // 内容元素右边缘距离滚动元素右边缘的距离
  const cardHeight = (tooltipCardRect.value as DOMRect).height
  const cardWidth = (tooltipCardRect.value as DOMRect).width
  const gap = props.arrow ? 4 : 6 // 主轴方向弹出框与内容元素之间的间距
  const flippedMain = flipMainAxis(baseMain)
  return `${flippedMain}${crossSuffix}` as Placement
  // 主轴仅在自身反方向上翻转一次 (同轴翻转)：空间不足则翻到反方向，
  // 若反方向也完全放不下 (isCompleteFail) 则恢复原方向，交由后续次轴 clamp 兜底
  function flipMainAxis(main: MainAxis): MainAxis {
    if (main === 'top') {
      const fitsTop = topDistance >= cardHeight + gap
      const fitsBottom = bottomDistance >= cardHeight + gap
      if (fitsTop) return 'top'
      return fitsBottom ? 'bottom' : 'top'
    }
    if (main === 'bottom') {
      const fitsTop = topDistance >= cardHeight + gap
      const fitsBottom = bottomDistance >= cardHeight + gap
      if (fitsBottom) return 'bottom'
      return fitsTop ? 'top' : 'bottom'
    }
    if (main === 'left') {
      const fitsLeft = leftDistance >= cardWidth + gap
      const fitsRight = rightDistance >= cardWidth + gap
      if (fitsLeft) return 'left'
      return fitsRight ? 'right' : 'left'
    }
    const fitsLeft = leftDistance >= cardWidth + gap
    const fitsRight = rightDistance >= cardWidth + gap
    if (fitsRight) return 'right'
    return fitsLeft ? 'left' : 'right'
  }
}
function onShow(): void {
  if (props.disabled) return
  tooltipTimer.value && cancelRaf(tooltipTimer.value)
  if (!tooltipShow.value) {
    // 显示延迟仅在 hover 触发时生效，click/contextmenu/focus 等触发方式立即显示
    const delay = props.trigger === 'hover' ? props.showDelay : 0
    tooltipTimer.value = rafTimeout(() => {
      tooltipShow.value = true
      getPosition()
      emits('update:show', true)
      emits('openChange', true)
      if (showTooltip.value && (props.trigger === 'click' || props.trigger === 'contextmenu')) {
        document.addEventListener('click', handleClick, captureSupported.value ? { capture: true } : true)
      }
    }, delay)
  }
}
function onHide(): void {
  tooltipTimer.value && cancelRaf(tooltipTimer.value)
  if (tooltipShow.value) {
    // 隐藏延迟仅在 hover 触发时生效，click/contextmenu/focus 等触发方式立即隐藏
    const delay = props.trigger === 'hover' ? props.hideDelay : 0
    tooltipTimer.value = rafTimeout(() => {
      tooltipShow.value = false
      emits('update:show', false)
      emits('openChange', false)
      if (showTooltip.value && (props.trigger === 'click' || props.trigger === 'contextmenu')) {
        document.removeEventListener('click', handleClick, captureSupported.value ? { capture: true } : true)
      }
    }, delay)
  }
}
function toggleVisible() {
  if (!tooltipShow.value) {
    onShow()
  } else {
    onHide()
  }
}
function handleClick(e: Event) {
  if (!tooltipRef.value?.contains(e.target as Node)) {
    onHide()
  }
}
function onEnterWrap() {
  if (showTooltip.value && props.trigger === 'hover' && !props.showControl) {
    onShow()
  }
}
function onLeaveWrap() {
  if (showTooltip.value && props.trigger === 'hover' && !props.showControl) {
    onHide()
  }
}
function onAnimationEnd() {
  emits('animationend', tooltipShow.value)
}
function onEnterTooltip() {
  if (props.trigger === 'hover' && !props.showControl) {
    onShow()
  }
}
function onLeaveTooltip() {
  if (props.trigger === 'hover' && !props.showControl) {
    onHide()
  }
}
// focus 触发：内容元素获得/失去焦点时显示/隐藏
function onFocus() {
  if (showTooltip.value && props.trigger === 'focus') {
    onShow()
  }
}
function onBlur() {
  if (showTooltip.value && props.trigger === 'focus') {
    onHide()
  }
}
// contextmenu 触发：右键菜单时显示 (阻止默认菜单)，点击外部由 handleClick 关闭
function onContextmenu(e: Event) {
  if (showTooltip.value && props.trigger === 'contextmenu' && !tooltipShow.value) {
    e.preventDefault()
    onShow()
  }
}
// 弹出框卡片上的 esc 按键处理：trigger 为 click 且开启 keyboard 时关闭
function onTooltipKeydownEsc() {
  if (props.trigger === 'click' && props.keyboard && tooltipShow.value) {
    onHide()
  }
}
// 内容元素点击处理：trigger 为 click 时切换显示
function onContentClick() {
  if (showTooltip.value && props.trigger === 'click' && !tooltipShow.value) {
    onShow()
  }
}
// 内容元素 enter 按键处理：trigger 为 click 且开启 keyboard 时切换显示
function onContentKeydownEnter() {
  if (showTooltip.value && props.trigger === 'click' && props.keyboard) {
    toggleVisible()
  }
}
// 内容元素 esc 按键处理：trigger 为 click 且开启 keyboard 时关闭
function onContentKeydownEsc() {
  if (showTooltip.value && props.trigger === 'click' && props.keyboard && tooltipShow.value) {
    onHide()
  }
}
defineExpose({
  show: onShow,
  hide: onHide,
  observeScroll
})
</script>
<template>
  <div class="tooltip-wrap" @mouseenter="onEnterWrap" @mouseleave="onLeaveWrap">
    <Teleport :disabled="to === false" :to="to === false ? null : to">
      <Transition
        name="zoom"
        enter-from-class="zoom-enter"
        enter-active-class="zoom-enter"
        enter-to-class="zoom-enter zoom-enter-active"
        leave-from-class="zoom-leave"
        leave-active-class="zoom-leave zoom-leave-active"
        leave-to-class="zoom-leave zoom-leave-active"
        @animationend="onAnimationEnd"
      >
        <div
          v-if="initialDisplay"
          v-show="showTooltip && tooltipShow"
          ref="tooltipRef"
          class="tooltip-card-container"
          :class="{ [`tooltip-${mainAxis}-padding`]: arrow }"
          :style="{
            ...tooltipPlacement,
            '--tooltip-max-width': tooltipMaxWidth,
            '--tooltip-background-color': tooltipBgColor,
            '--tooltip-transition-duration': `${transitionDuration}ms`
          }"
          @mouseenter="onEnterTooltip"
          @mouseleave="onLeaveTooltip"
          @keydown.esc="onTooltipKeydownEsc"
        >
          <div ref="tooltipCardRef" class="tooltip-card" :class="tooltipClass" :style="tooltipStyle">
            <slot name="tooltip">{{ tooltip }}</slot>
          </div>
          <div v-if="arrow" class="tooltip-arrow" :class="[`arrow-${mainAxis}`, `arrow-cross-${crossAlign}`]"></div>
        </div>
      </Transition>
    </Teleport>
    <span
      ref="tooltipContentRef"
      class="tooltip-content"
      :class="contentClass"
      :style="contentStyle"
      :tabindex="trigger === 'focus' ? 0 : undefined"
      @click="onContentClick"
      @contextmenu="onContextmenu"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter="onContentKeydownEnter"
      @keydown.esc="onContentKeydownEsc"
    >
      <slot>{{ content }}</slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.tooltip-wrap {
  position: relative;
  display: inline-block;
}
.zoom-enter {
  transform: none;
  opacity: 0;
  animation-duration: var(--tooltip-transition-duration);
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.zoom-enter-active {
  animation-name: zoomIn;
  animation-play-state: running;
  @keyframes zoomIn {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
.zoom-leave {
  animation-duration: var(--tooltip-transition-duration);
  animation-fill-mode: both;
  animation-play-state: paused;
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-leave-active {
  animation-name: zoomOut;
  animation-play-state: running;
  pointer-events: none;
  @keyframes zoomOut {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
  }
}
.tooltip-card-container {
  position: absolute;
  z-index: 999;
  width: max-content;
  outline: none;
  .tooltip-card {
    min-width: 32px;
    max-width: var(--tooltip-max-width);
    min-height: 32px;
    padding: 6px 8px;
    font-size: 14px;
    color: #fff;
    line-height: 1.5714285714285714;
    text-align: justify;
    text-decoration: none;
    word-break: break-all;
    background-color: var(--tooltip-background-color);
    border-radius: 6px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    :deep(svg) {
      fill: currentColor;
    }
  }
  .tooltip-arrow {
    position: absolute;
    z-index: 9;
    display: block;
    pointer-events: none;
    width: 16px;
    height: 16px;
    overflow: hidden;
    &::before {
      position: absolute;
      width: 16px;
      height: 8px;
      background-color: var(--tooltip-background-color);
      clip-path: polygon(
        1.6568542494923806px 100%,
        50% 1.6568542494923806px,
        14.34314575050762px 100%,
        1.6568542494923806px 100%
      );
      clip-path: path(
        'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
      );
      content: '';
    }
    &::after {
      position: absolute;
      width: 8.970562748477143px;
      height: 8.970562748477143px;
      margin: auto;
      border-radius: 0 0 2px 0;
      transform: translateY(50%) rotate(-135deg);
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
      z-index: 0;
      background: transparent;
      content: '';
    }
  }
  .arrow-top {
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%) translateY(100%) rotate(180deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .arrow-bottom {
    left: 50%;
    top: 12px;
    transform: translateX(-50%) translateY(-100%) rotate(0deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .arrow-left {
    top: 50%;
    right: 12px;
    transform: translateX(100%) translateY(-50%) rotate(90deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .arrow-right {
    top: 50%;
    left: 12px;
    transform: translateX(-100%) translateY(-50%) rotate(-90deg);
    &::before {
      bottom: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  // 复合方向箭头次轴对齐：--arrow-edge = 箭头中心距卡片边(13px) - 箭头视觉半宽(8px)
  --arrow-edge: 5px;
  // 水平主轴 (top/bottom)：箭头沿水平方向靠边
  .arrow-top,
  .arrow-bottom {
    &.arrow-cross-start {
      left: var(--arrow-edge);
      transform: translateX(0) translateY(100%) rotate(180deg);
    }
    &.arrow-cross-end {
      left: auto;
      right: var(--arrow-edge);
      transform: translateX(0) translateY(100%) rotate(180deg);
    }
  }
  .arrow-bottom {
    &.arrow-cross-start {
      transform: translateX(0) translateY(-100%) rotate(0deg);
    }
    &.arrow-cross-end {
      transform: translateX(0) translateY(-100%) rotate(0deg);
    }
  }
  // 垂直主轴 (left/right)：箭头沿垂直方向靠边
  .arrow-left,
  .arrow-right {
    &.arrow-cross-start {
      top: var(--arrow-edge);
    }
    &.arrow-cross-end {
      top: auto;
      bottom: var(--arrow-edge);
    }
  }
  .arrow-left {
    &.arrow-cross-start {
      transform: translateX(100%) translateY(0) rotate(90deg);
    }
    &.arrow-cross-end {
      transform: translateX(100%) translateY(0) rotate(90deg);
    }
  }
  .arrow-right {
    &.arrow-cross-start {
      transform: translateX(-100%) translateY(0) rotate(-90deg);
    }
    &.arrow-cross-end {
      transform: translateX(-100%) translateY(0) rotate(-90deg);
    }
  }
}
.tooltip-top-padding {
  padding-bottom: 12px;
}
.tooltip-bottom-padding {
  padding-top: 12px;
}
.tooltip-left-padding {
  padding-right: 12px;
}
.tooltip-right-padding {
  padding-left: 12px;
}
.tooltip-content {
  display: inline-block;
}
</style>
