<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, nextTick } from 'vue'
import {
  getImageName,
  getScrollParent,
  log,
  useIntersectionObserver,
  useResizeObserver,
  useWindowWidth
} from 'components/utils'
/**
  宽度固定，图片等比例缩放；先预取每张图片的原始尺寸，再按「追加到当前高度最小的列」计算 top、left，
  结合 `relative` 和 `absolute` 定位渲染。布局与数据解耦：
  - 原始尺寸按 `src` 缓存，增删 / 重排图片不会让已加载的尺寸失效；
  - 图片提供 `aspectRatio` 时无需预取，可立即生成占位框并在加载完成前展示骨架；
  - 未提供宽高比时先按占位比例落位（骨架立刻可见、首屏高度接近真实值），尺寸取回后原地精化；
  - 单张图片加载失败不中断整体布局，有占位框的图片保留位置并展示失败态；
  - 每轮布局带版本号，旧一轮的异步结果不会写入新一轮的状态；
  - 开启 `lazy` 时只渲染到「视口底部 + 安全余量」，滚动接近底部再按批追加。
*/
export interface Image {
  name?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
  target?: '_self' | '_blank' // 如何打开跳转链接
  aspectRatio?: number // 宽高比（宽度 / 高度），提供后无需预取尺寸即可生成占位框
}
export interface Responsive {
  xs?: number // <576px 时的列数
  sm?: number // ≥576px 时的列数
  md?: number // ≥768px 时的列数
  lg?: number // ≥992px 时的列数
  xl?: number // ≥1200px 时的列数
  xxl?: number // ≥1600px 时的列数
}
export interface Props {
  images?: Image[] // 图片数组
  columnCount?: number | Responsive // 要划分的列数，可写成响应式对象 { xs: 2, md: 4 }
  gap?: number | [number, number] // 图片之间的间隙，单位 px；数组时表示 [水平间距, 垂直间距]
  width?: string | number // 瀑布流区域的总宽度，单位 px
  borderRadius?: number // 瀑布流区域和图片圆角，单位 px
  bgColor?: string // 瀑布流区域背景填充色
  lazy?: boolean // 是否按需渲染：只渲染到视口下方安全余量处，滚动接近底部时再追加
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  columnCount: 3,
  gap: 20,
  width: '100%',
  borderRadius: 8,
  bgColor: 'var(--va-bg-layout-color)',
  lazy: false
})
const emits = defineEmits<{
  (e: 'click', image: Image, index: number, event: MouseEvent): void
}>()
/** 图片原始尺寸 */
interface Size {
  width: number
  height: number
}
/** 渲染单元：位置由布局算法计算，内容仍实时取自 `props.images` */
interface Cell {
  index: number // 对应的图片下标
  top: number
  left: number
  width: number
  height: number
}
/** 单轮布局的列参数 */
interface Metrics {
  columnWidth: number
  columnGap: number
  rowGap: number
  count: number
}

const MIN_COLUMN_COUNT = 1
const DEFAULT_COLUMN_COUNT = 3
const DEFAULT_TARGET = '_blank'
const PROVISIONAL_RATIO = 1 // 尺寸未取回时的占位宽高比（宽 / 高）：先按此比例落位，取回真实尺寸后原地精化
const PROVISIONAL_SIZE: Size = { width: 1, height: 1 / PROVISIONAL_RATIO } // 只关心比值，宽固定为 1 便于复用等比换算
const LAZY_BUFFER_RATIO = 0.75 // 按需渲染的安全余量：可视区高度的 0.75 倍
const LAZY_BATCH_ROWS = 2 // 每批追加的行数
const LAZY_EDGE_EPSILON = 1 // 填满判定容差（px），避免哨兵正好停在观察边界上
const MAX_LAZY_ROUNDS = 20 // 单次填充的最大轮次，防御容器不可见等异常场景
// 断点由大到小：命中即取该断点上配置的列数
const BREAKPOINTS: [number, keyof Responsive][] = [
  [1600, 'xxl'],
  [1200, 'xl'],
  [992, 'lg'],
  [768, 'md'],
  [576, 'sm']
]

const waterfallRef = ref<HTMLElement | null>(null) // 瀑布流容器引用
const sentinelRef = ref<HTMLElement | null>(null) // 触底哨兵元素引用
const cells = ref<Cell[]>([]) // 当前渲染的图片位置信息
const totalHeight = ref<number>(0) // 瀑布流区域总高度
const renderLimit = ref<number>(props.lazy ? 0 : props.images.length) // 当前允许渲染的图片数量
const loadedSrcs = reactive(new Set<string>()) // 已加载完成的图片地址
const failedSrcs = reactive(new Set<string>()) // 加载失败的图片地址
const sizeCache = new Map<string, Size | null>() // 图片地址 → 原始尺寸，null 表示加载失败
const loadingTasks = new Map<string, Promise<Size | null>>() // 图片地址 → 进行中的尺寸预取
const ioSupported = typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function' // 是否支持相交观察
let layoutVersion = 0 // 布局版本号，用于丢弃上一轮的异步结果
let measuredWidth = 0 // 最近一次测量到的容器宽度
let fillToken = 0 // 填充轮次的作废标记，新一轮填充会终止上一轮
const viewportWidth = useWindowWidth() // 视口宽度，用于解析响应式列数
// 当前生效的列数
const resolvedColumnCount = computed(() => {
  return resolveColumnCount()
})
// 水平 / 垂直间距（拆成两个原子值，避免使用方每次传新数组时触发重排）
const horizontalGap = computed(() => {
  return resolveGap()[0]
})
const verticalGap = computed(() => {
  return resolveGap()[1]
})
// 瀑布流区域总宽度
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else {
    return props.width
  }
})
// 瀑布流区域的样式变量
const wrapStyle = computed(() => {
  return `
    --waterfall-border-radius: ${props.borderRadius}px;
    --waterfall-bg-color: ${props.bgColor};
    --waterfall-width: ${totalWidth.value};
    --waterfall-height: ${totalHeight.value}px;
  `
})
// 滚动容器：页面整体滚动时取 null（以视口为准），否则取最近的滚动祖先
const scrollRoot = computed<HTMLElement | null>(() => {
  if (typeof document === 'undefined') return null
  const parent = getScrollParent(waterfallRef.value)
  return parent && parent !== document.documentElement ? parent : null
})
// 只看图片地址序列：增删 / 换图才重排，名称、链接等不影响布局的字段变化不触发
watch(
  () => props.images.map((image) => image.src).join('\n'),
  () => {
    // 数据整体变化时允许重新尝试失败过的图片
    clearFailedSizes()
    pruneImageState()
    syncRenderLimit()
    relayout()
  },
  {
    flush: 'post'
  }
)
// 列数（含视口断点变化）、间隙、宽度变化时重新计算布局
watch(
  [resolvedColumnCount, horizontalGap, verticalGap, () => props.width],
  () => {
    relayout()
  },
  {
    flush: 'post'
  }
)
// 按需渲染开关变化时重置渲染范围
watch(
  () => props.lazy,
  () => {
    syncRenderLimit()
    relayout()
  },
  {
    flush: 'post'
  }
)
onMounted(() => {
  // 不支持相交观察时退回全量渲染，避免内容缺失
  if (!ioSupported) renderLimit.value = props.images.length
  relayout()
})
// 窗口宽度改变时重新计算瀑布流布局
useResizeObserver(waterfallRef, () => {
  const currentWidth = waterfallRef.value?.offsetWidth ?? 0
  if (currentWidth <= 0 || currentWidth === measuredWidth) return
  relayout()
})
// 哨兵进入「可视区 + 安全余量」范围时补齐下一批
useIntersectionObserver(
  sentinelRef,
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) void fillViewport()
  },
  () => ({
    root: scrollRoot.value,
    rootMargin: `0px 0px ${LAZY_BUFFER_RATIO * 100}% 0px`
  })
)
/** 解析列数：数字直接使用；对象按视口宽度匹配断点，打断点均未命中时回落 xs */
function resolveColumnCount(): number {
  const value = props.columnCount
  if (typeof value === 'number') return value
  const width = viewportWidth.value
  for (const [minWidth, breakpoint] of BREAKPOINTS) {
    const count = value[breakpoint]
    if (width >= minWidth && count !== undefined) return count
  }
  return value.xs ?? DEFAULT_COLUMN_COUNT
}
/** 解析间距：数组按 [水平间距, 垂直间距] 取值，数字时两向同值 */
function resolveGap(): [number, number] {
  const [horizontal, vertical] = Array.isArray(props.gap) ? props.gap : [props.gap, props.gap]
  return [Math.max(horizontal, 0), Math.max(vertical, 0)]
}
/** 列数归一化：取整且不小于 1，非法值（0 / 负数 / NaN）回落最小值 */
function normalizeColumnCount(count: number): number {
  return Math.max(MIN_COLUMN_COUNT, Math.trunc(count) || MIN_COLUMN_COUNT)
}
/** 解析列参数：列数取整且不小于 1；列间隙不超过容器可均分的宽度，避免出现负列宽 */
function createMetrics(containerWidth: number, count: number, gap: [number, number]): Metrics {
  const column = normalizeColumnCount(count)
  const columnGap = Math.min(gap[0], containerWidth / (column + 1))
  const columnWidth = (containerWidth - (column + 1) * columnGap) / column
  const rowGap = gap[1]
  // 列间隙占满容器时列宽为 0，此时放弃间隙，保证图片仍有可见宽度
  if (columnWidth > 0) {
    return { columnWidth, columnGap, rowGap, count: column }
  }
  return { columnWidth: Math.max(containerWidth / column, 0), columnGap: 0, rowGap, count: column }
}
/** 计算单张图片的位置：追加到当前高度最小的列，并列时取最左列 */
function placeCell(index: number, size: Size, metrics: Metrics, heights: number[]): Cell {
  const { columnWidth, columnGap, rowGap, count } = metrics
  const height = (size.height / size.width) * columnWidth
  let column = 0
  for (let n = 1; n < count; n++) {
    if (heights[n] < heights[column]) column = n
  }
  const top = heights[column] + rowGap
  heights[column] = top + height
  return {
    index,
    top,
    left: (columnWidth + columnGap) * column + columnGap,
    width: columnWidth,
    height
  }
}
/**
 * 按图片顺序把尺寸快照转换成渲染单元：
 * - 已就绪：按真实比例落位；
 * - 尚未取回（undefined）：按占位比例落位，使首屏高度接近真实值；
 * - 预取失败（null）：跳过，不占位（失败态只在已落位的格子上展示）。
 */
function buildCells(sizes: (Size | null | undefined)[], metrics: Metrics, heights: number[]): Cell[] {
  const list: Cell[] = []
  sizes.forEach((size, index) => {
    if (size === null) return
    list.push(placeCell(index, size ?? PROVISIONAL_SIZE, metrics, heights))
  })
  return list
}
/** 提交一轮布局结果；没有可渲染图片时高度归零，避免空数据留下固定高度的空白块 */
function applyLayout(list: Cell[], metrics: Metrics, heights: number[]): void {
  cells.value = [...list]
  totalHeight.value = list.length ? Math.max(...heights) + metrics.rowGap : 0
}
/** 数据变化后清掉失败记录，让这些图片有机会重新加载 */
function clearFailedSizes(): void {
  sizeCache.forEach((size, src) => {
    if (!size) {
      sizeCache.delete(src)
    }
  })
}
/** 预取图片原始尺寸：失败降级为 null 并按预期内降级记录日志，不抛出异常 */
function loadSize(src: string, index: number): Promise<Size | null> {
  const cached = sizeCache.get(src)
  if (cached !== undefined) {
    return Promise.resolve(cached)
  }
  const loading = loadingTasks.get(src)
  if (loading) {
    return loading
  }
  const task = new Promise<Size | null>((resolve) => {
    const image = new Image()
    image.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = image
      // 尺寸无效时按失败处理，避免后续等比计算出现 Infinity
      resolve(width > 0 && height > 0 ? { width, height } : null)
    }
    image.onerror = () => {
      log('debug', 'Waterfall', `images[${index}] 图片加载失败，已跳过：${src}`)
      resolve(null)
    }
    image.src = src
  }).then((size) => {
    sizeCache.set(src, size)
    return size
  })
  loadingTasks.set(src, task)
  void task.finally(() => loadingTasks.delete(src))
  return task
}
/** 宽高比是否可用：非正数与非有限值都会让等比换算得到 Infinity / NaN */
function isValidRatio(ratio: number | undefined): ratio is number {
  return typeof ratio === 'number' && Number.isFinite(ratio) && ratio > 0
}
/** 解析单张图片的布局尺寸：优先用传入的宽高比，其次取尺寸缓存；undefined 表示尚未取到 */
function resolveSize(index: number): Size | null | undefined {
  const image = props.images[index]
  if (!image) return undefined
  if (isValidRatio(image.aspectRatio)) {
    // 只关心比值，宽固定为 1 便于复用同一套等比换算
    return { width: 1, height: 1 / image.aspectRatio }
  }
  return sizeCache.get(image.src)
}
/** 布局入口：先测量容器宽度，再按尺寸是否就绪决定一次提交还是渐进精化 */
async function updateLayout(): Promise<void> {
  const containerWidth = waterfallRef.value?.offsetWidth ?? 0
  // 容器不可见（如隐藏的 Tab）时宽度为 0：记录「尚未测量」，等尺寸恢复后由 ResizeObserver 再次触发
  if (containerWidth <= 0) {
    measuredWidth = 0
    return
  }
  measuredWidth = containerWidth
  const version = ++layoutVersion
  const metrics = createMetrics(containerWidth, resolvedColumnCount.value, resolveGap())
  const limit = Math.min(renderLimit.value, props.images.length)
  const sizes: (Size | null | undefined)[] = []
  for (let index = 0; index < limit; index++) {
    sizes.push(resolveSize(index))
  }
  // 先提交一轮：已就绪的按真实比例落位，未取回的按占位比例补齐，首屏立刻有骨架且高度接近真实值；
  // 尺寸全部就绪时这一轮就是最终结果，不会再有后续重排
  const heights: number[] = Array(metrics.count).fill(0)
  applyLayout(buildCells(sizes, metrics, heights), metrics, heights)
  if (sizes.every((size) => size !== undefined)) return
  // 存在未取尺寸的图片：并行预取，按图片顺序逐张替换占位格，已落位的真实格子位置稳定
  const tasks = props.images.slice(0, limit).map((image, index) => {
    const size = sizes[index]
    return size === undefined ? loadSize(image.src, index) : Promise.resolve(size)
  })
  await commitGradually(version, tasks, metrics, sizes)
}
/** 渐进精化布局；版本号变化说明已开始新一轮布局，本轮结果直接丢弃 */
async function commitGradually(
  version: number,
  tasks: Promise<Size | null>[],
  metrics: Metrics,
  sizes: (Size | null | undefined)[]
): Promise<void> {
  const snapshot = [...sizes]
  for (let index = 0; index < tasks.length; index++) {
    const size = await tasks[index]
    if (version !== layoutVersion) return
    snapshot[index] = size
    const heights: number[] = Array(metrics.count).fill(0)
    applyLayout(buildCells(snapshot, metrics, heights), metrics, heights)
  }
}
/** 重排并按需补齐视口内容 */
function relayout(): void {
  void updateLayout().then(fillViewport)
}
/** 校正渲染范围：未开启按需渲染或环境不支持相交观察时一次渲染全部 */
function syncRenderLimit(): void {
  const total = props.images.length
  renderLimit.value = props.lazy && ioSupported ? Math.min(renderLimit.value, total) : total
}
/** 清理已不在当前列表中的加载状态，避免集合随增删无界增长 */
function pruneImageState(): void {
  const alive = new Set(props.images.map((image) => image.src))
  const prune = (srcs: Set<string>): void => {
    srcs.forEach((src) => {
      if (!alive.has(src)) srcs.delete(src)
    })
  }
  prune(loadedSrcs)
  prune(failedSrcs)
}
/** 可视区参照：自定义滚动容器取其可视范围，页面滚动取视口 */
function visibleRange(): { bottom: number; height: number } | null {
  const root = scrollRoot.value
  if (root) {
    const rect = root.getBoundingClientRect()
    return { bottom: rect.bottom, height: rect.height }
  }
  if (typeof window === 'undefined') return null
  return { bottom: window.innerHeight, height: window.innerHeight }
}
/** 已渲染内容是否越过「可视区底部 + 安全余量」；容器不可见时按已填满处理，避免无意义追加 */
function isViewportFilled(): boolean {
  const element = waterfallRef.value
  const range = visibleRange()
  if (!element || !range || range.height <= 0) return true
  // 容器底边超出可视区底边的距离，需要至少留出 LAZY_BUFFER_RATIO 屏，滚动时才不会露出空白
  const overflow = element.getBoundingClientRect().bottom - range.bottom
  return overflow >= range.height * LAZY_BUFFER_RATIO + LAZY_EDGE_EPSILON
}
/** 单批追加数量：两行图片，列数变化时同步生效 */
function lazyBatchSize(): number {
  return normalizeColumnCount(resolvedColumnCount.value) * LAZY_BATCH_ROWS
}
/** 追加渲染直到填满安全余量；新一轮调用会终止上一轮的循环 */
async function fillViewport(): Promise<void> {
  if (!props.lazy || !ioSupported) return
  const token = ++fillToken
  for (let round = 0; round < MAX_LAZY_ROUNDS; round++) {
    if (token !== fillToken) return
    const total = props.images.length
    if (renderLimit.value >= total) return
    // 首轮无条件放一批：容器高度为 0 时会被判定为已填满，否则会卡在空容器上
    if (renderLimit.value > 0 && isViewportFilled()) return
    renderLimit.value = Math.min(renderLimit.value + lazyBatchSize(), total)
    await updateLayout()
    await nextTick()
  }
}
/** 图片加载完成：记录成功状态并清除可能存在的失败记录 */
function handleImageLoad(index: number): void {
  const src = props.images[index]?.src
  if (!src) return
  failedSrcs.delete(src)
  loadedSrcs.add(src)
}
/** 图片加载失败：撤销成功记录并转为失败态，占位框保留位置不再展示破图 */
function handleImageError(index: number): void {
  const image = props.images[index]
  if (!image?.src) return
  loadedSrcs.delete(image.src)
  failedSrcs.add(image.src)
  log('debug', 'Waterfall', `images[${index}] 图片加载失败：${image.src}`)
}
/** 是否展示占位框：图片加载完成前一律展示骨架（含尺寸未取回的临时格），失败时保留位置 */
function showPlaceholder(index: number): boolean {
  const src = props.images[index]?.src
  return src ? !loadedSrcs.has(src) : true
}
/** 图片是否已加载完成：未完成时隐藏 img，避免占位框上叠出浏览器默认的破图与替代文本 */
function isLoaded(index: number): boolean {
  const src = props.images[index]?.src
  return src ? loadedSrcs.has(src) : false
}
/** 图片是否加载失败，用于把占位框切换为失败样式 */
function isFailed(index: number): boolean {
  const src = props.images[index]?.src
  return src ? failedSrcs.has(src) : false
}
/** 取指定下标的图片数据；渲染单元与图片数组同步生成，仍用可选链兜底 */
function imageAt(index: number): Image | undefined {
  return props.images[index]
}
/** 点击图片：派发原始数据与事件，便于使用方在跳转前拦截（preventDefault） */
function handleCellClick(index: number, event: MouseEvent): void {
  const image = imageAt(index)
  if (image) {
    emits('click', image, index, event)
  }
}
</script>
<template>
  <div ref="waterfallRef" class="waterfall-wrap" :style="wrapStyle">
    <a
      v-for="cell in cells"
      :key="`${cell.index}-${imageAt(cell.index)?.src}`"
      class="waterfall-image"
      :class="{ 'link-cursor': imageAt(cell.index)?.link }"
      :style="`width: ${cell.width}px; height: ${cell.height}px; top: ${cell.top}px; left: ${cell.left}px;`"
      :href="imageAt(cell.index)?.link"
      :target="imageAt(cell.index)?.target ?? DEFAULT_TARGET"
      @click="handleCellClick(cell.index, $event)"
    >
      <span
        v-if="showPlaceholder(cell.index)"
        class="placeholder-item"
        :class="{ 'placeholder-error': isFailed(cell.index) }"
      >
        <svg
          v-if="isFailed(cell.index)"
          class="placeholder-icon"
          viewBox="0 0 1098 1024"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          />
        </svg>
      </span>
      <img
        class="image-item"
        :class="{ 'image-visible': isLoaded(cell.index) }"
        :src="imageAt(cell.index)?.src"
        :alt="getImageName(imageAt(cell.index))"
        @load="handleImageLoad(cell.index)"
        @error="handleImageError(cell.index)"
      />
    </a>
    <div ref="sentinelRef" class="waterfall-sentinel" aria-hidden="true"></div>
  </div>
</template>
<style lang="less" scoped>
.waterfall-wrap {
  position: relative;
  width: var(--waterfall-width);
  height: var(--waterfall-height);
  border-radius: var(--waterfall-border-radius);
  background-color: var(--waterfall-bg-color);
  .waterfall-image {
    position: absolute;
    display: block;
    cursor: default;
    .image-item {
      width: 100%;
      height: 100%;
      border-radius: var(--waterfall-border-radius);
      display: inline-block;
      vertical-align: bottom;
      object-fit: cover;
      /* 加载完成前隐藏：失败时浏览器默认的破图图标与替代文本不应叠在占位框上 */
      opacity: 0;
    }
    .image-visible {
      opacity: 1;
    }
    .placeholder-item {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--waterfall-border-radius);
      background: var(--va-fill-color-2);
      /* 加载中：呼吸动画提示仍在等待；失败后停止动画，避免与「加载很慢」混淆 */
      animation: waterfall-breath 1.4s ease-in-out infinite;
    }
    .placeholder-error {
      animation: none;
      color: var(--va-text-color-3);
    }
    .placeholder-icon {
      /* 随格子宽度缩放：窄格不挤、大格不空，接近占位图形占三成宽度的观感 */
      width: clamp(32px, 30%, 64px);
      height: auto;
      fill: currentColor;
    }
  }
  .waterfall-sentinel {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 1px;
  }
  .link-cursor {
    cursor: pointer;
  }
}
@keyframes waterfall-breath {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}
</style>
