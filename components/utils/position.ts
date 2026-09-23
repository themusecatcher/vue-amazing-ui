import { ref, toValue, computed, watch, onBeforeUnmount } from 'vue'
import type { CSSProperties, MaybeRefOrGetter, Ref } from 'vue'
import { beforeNextFrameOnce } from 'seemly'
import { getScrollParent } from './dom'
/**
 * 浮层定位工具集（组件库内部使用，不对外导出）
 *
 * - `useFloating`：定位内核，只做「算 + 输出 + 同步」，不创建 DOM、不含样式、不接管 Teleport。
 *   `Tooltip` / `Select` / `AutoComplete` / `Slider` 等浮层组件均基于它实现；
 * - `getFloatingBoundaryRect`：测量遮挡边界，供内核在 `boundary: 'scrollParent'` 口径下复用。
 *
 * 二者与组件内部 DOM 契约（两层定位容器、`data-va-floating-mount` 挂载点、z-index 注入协议）
 * 强绑定，公开即等于把内部实现固化为公开 API，故仅从 barrel 供内部引用。
 */

/**
 * 获取遮挡边界矩形（相对视口的四条边）
 *
 * 仅当浮层真的挂在可滚动父元素内、会被其 overflow 裁剪时，才以该容器为界；否则以视口为界 ——
 * Teleport 到 body / 具名容器的浮层不受中间滚动容器裁剪，若仍以容器为界会出现「空间充足却翻转」。
 *
 * 求解边界与锚点可见性判定共用同一口径，故由内核统一调用；视口尺寸也由内核逐帧测量后传入，
 * 避免同帧重复测量。
 *
 * @param scrollTarget - 最近的可滚动父元素，为 null 时以视口为界
 * @param panel - 浮层面板元素，用于判断是否真被 scrollTarget 裁剪
 * @param viewportWidth - 视口宽度（内核逐帧测量）
 * @param viewportHeight - 视口高度（内核逐帧测量）
 * @returns 遮挡边界矩形相对视口的四条边
 */
export function getFloatingBoundaryRect(
  scrollTarget: HTMLElement | null,
  panel: HTMLElement | null,
  viewportWidth: number,
  viewportHeight: number
): FloatingBoundaryRect {
  // 以视口为界的兜底：可滚动父元素不存在、其自身即视口（documentElement），
  // 或并未真正包含浮层（Teleport 到 body / 具名容器的浮层不受中间容器 overflow 裁剪）
  const viewportRect = { top: 0, left: 0, bottom: viewportHeight, right: viewportWidth }
  if (!scrollTarget || scrollTarget === document.documentElement || !scrollTarget.contains(panel)) {
    return viewportRect
  }
  const { top, left, bottom, right } = scrollTarget.getBoundingClientRect()
  return {
    top: top < 0 ? 0 : top,
    left: left < 0 ? 0 : left,
    bottom: bottom > viewportHeight ? viewportHeight : bottom,
    right: right > viewportWidth ? viewportWidth : right
  }
}

/*
 * 浮层定位内核：useFloating
 *
 * 分三层：
 * 1. 求解层：查表完成 flip / 次轴 align 自适应 / offset 位移 / transformOrigin（不含 overlap
 *    分支，本库无该需求）；
 * 2. 测量层：用 `position: fixed; inset: 0` 的隐藏元素量真实视口矩形；支持 DOM 元素 / 虚拟锚点 /
 *    x-y 手动定位三种锚点；浮层尺寸取布局尺寸（`offsetWidth / offsetHeight`），避开缩放动画期间
 *    的 rect 失真；
 * 3. 同步层：监听锚点全链滚动祖先、视口 resize、字体就绪，并提供 `sync()` 供锚点持续移动
 *    （如拖动）的场景主动重对齐。
 *
 * 与常见实现的两点差异：
 * - 把 flip 与 shift 拆成两个独立开关，`!flip` 不会连带跳过 align 自适应与 shift；
 * - 合并了本库业务侧能力：遮挡边界口径（`boundary`）、等宽 / 最小等宽（`matchTriggerWidth`）。
 *   「3 态水平对齐」（贴左 / 贴右 / 贴视口左边缘）无需单独参数：前两态即 placement 的次轴后缀，
 *   第三态由 `shift` 的对齐自适应 + 位移（`deriveOffset`）实现。
 * ============================================================================================== */

/**
 * 浮层 12 向方向（对外命名，与组件 props 一致：`top` / `topLeft` / `leftTop` …）
 *
 * 内核内部统一映射为 kebab 命名（`top` / `top-start` / `left-start` …）；出入参一律使用本命名，
 * 使组件公开 props 不受内核命名影响。
 */
export type FloatingPlacement =
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
  | 'rightBottom'

/** 主轴方向 */
type AxisPlacement = 'top' | 'bottom' | 'left' | 'right'
/** 次轴对齐方式 */
type FloatingAlign = 'start' | 'center' | 'end'
/** kebab 命名：主轴（无后缀即 center）或主轴 + 对齐后缀 */
export type KebabPlacement = AxisPlacement | `${AxisPlacement}-${Exclude<FloatingAlign, 'center'>}`
/** kebab 命名：复合方向（带对齐后缀） */
type CompositePlacement = Exclude<KebabPlacement, AxisPlacement>

/**
 * 内部坐标系下的矩形
 *
 * ⚠️ **这不是纯坐标，勿凭直觉改写**：
 * - `left` / `top`：元素左 / 上边缘距视口左 / 上边缘的距离 → 同时也是「左 / 上方可用空间」；
 * - `right` / `bottom`：视口右 / 下边缘距元素右 / 下边缘的**剩余空间**（不是坐标）；
 * - `width` / `height`：元素自身尺寸。
 *
 * 由此得到求解层赖以成立的一条约定：`rect[position]`（position ∈ top/bottom/left/right）
 * 恒表示「该方向上的可用空间」，翻转判定与次轴 align 自适应全部建立在它之上。改写需逐
 * placement、逐边界条件自证等价，否则会引入更隐蔽的缺陷。
 */
export interface FloatingRect {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

// ── 查表：方向 / 对齐的映射关系，逐项照搬 ───────────────────────────────────────────────────────
const oppositionPositions: Record<AxisPlacement, AxisPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}
const oppositeAligns: Record<FloatingAlign, FloatingAlign> = {
  start: 'end',
  center: 'center',
  end: 'start'
}
const propToCompare: Record<AxisPlacement, 'width' | 'height'> = {
  top: 'height',
  bottom: 'height',
  left: 'width',
  right: 'width'
}
const transformOrigins: Record<KebabPlacement, string> = {
  'bottom-start': 'top left',
  bottom: 'top center',
  'bottom-end': 'top right',
  'top-start': 'bottom left',
  top: 'bottom center',
  'top-end': 'bottom right',
  'right-start': 'top left',
  right: 'center left',
  'right-end': 'bottom left',
  'left-start': 'top right',
  left: 'center right',
  'left-end': 'bottom right'
}
const oppositeAlignCssPositionProps: Record<CompositePlacement, AxisPlacement> = {
  'bottom-start': 'right',
  'bottom-end': 'left',
  'top-start': 'right',
  'top-end': 'left',
  'right-start': 'bottom',
  'right-end': 'top',
  'left-start': 'bottom',
  'left-end': 'top'
}
const keepOffsetDirection: Record<AxisPlacement, boolean> = {
  top: true, // top++
  bottom: false, // top--
  left: true, // left++
  right: false // left--
}
const cssPositionToOppositeAlign: Record<AxisPlacement, Exclude<FloatingAlign, 'center'>> = {
  top: 'end',
  bottom: 'start',
  left: 'end',
  right: 'start'
}

// ── placement 命名映射（对外驼峰 ↔ 内核 kebab）──────────────────────────────────────────────────
const FLOATING_TO_KEBAB: Record<FloatingPlacement, KebabPlacement> = {
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  bottom: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  left: 'left',
  leftTop: 'left-start',
  leftBottom: 'left-end',
  right: 'right',
  rightTop: 'right-start',
  rightBottom: 'right-end'
}
const KEBAB_TO_FLOATING: Record<KebabPlacement, FloatingPlacement> = {
  top: 'top',
  'top-start': 'topLeft',
  'top-end': 'topRight',
  bottom: 'bottom',
  'bottom-start': 'bottomLeft',
  'bottom-end': 'bottomRight',
  left: 'left',
  'left-start': 'leftTop',
  'left-end': 'leftBottom',
  right: 'right',
  'right-start': 'rightTop',
  'right-end': 'rightBottom'
}

// ── 测量层 ────────────────────────────────────────────────────────────────────────────────────
/** 视口测量元素的 id（占用独立命名空间，避免与页面既有元素冲突） */
const VIEW_MEASURER_ID = 'va-floating-view-measurer'
let viewMeasurer: HTMLElement | null = null

/**
 * 测量真实视口矩形
 *
 * 用一个 `position: fixed; inset: 0` 的隐藏元素代替 `documentElement.clientWidth / clientHeight`：
 * 后者只能拿到宽高、拿不到非零的 left / top，且量不出页面缩放等场景下的实际视口。
 * 元素首次使用时惰性创建，之后复用。
 *
 * @returns 视口矩形；SSR（Node）或无 body 时返回 null
 */
export function ensureViewBoundingRect(): DOMRect | null {
  // SSR（Node）下无 document；body 尚未就绪时也无处挂载
  if (typeof document === 'undefined' || !document.body) return null
  // 缓存元素被外部移除（如应用整体替换 body 内容）时重新创建，避免长期量到全零矩形
  if (!viewMeasurer || !viewMeasurer.isConnected) {
    const existing = document.getElementById(VIEW_MEASURER_ID)
    if (existing) {
      viewMeasurer = existing
    } else {
      const el = document.createElement('div')
      el.id = VIEW_MEASURER_ID
      const { style } = el
      style.position = 'fixed'
      style.left = '0'
      style.right = '0'
      style.top = '0'
      style.bottom = '0'
      style.pointerEvents = 'none'
      style.visibility = 'hidden'
      document.body.appendChild(el)
      viewMeasurer = el
    }
  }
  return viewMeasurer.getBoundingClientRect()
}

/** 换算所需的矩形字段集（DOMRect 或同形普通对象，兼容虚拟锚点返回的矩形） */
type FloatingRectLike = Pick<DOMRect, 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'>

/**
 * 虚拟锚点
 *
 * 只需提供 `getBoundingClientRect`，不必是真实 DOM 元素：`Tour` / `Anchor` / Table 列筛选等
 * 「指向任意位置」的场景，可直接喂入一个合成矩形。
 */
export interface FloatingVirtualAnchor {
  getBoundingClientRect(): FloatingRectLike
}

/** x-y 手动定位点（视口坐标，通常取自鼠标事件 clientX / clientY） */
export interface FloatingPoint {
  x: number
  y: number
}

/**
 * 把视口矩形换算为内部坐标系矩形（口径见 {@link FloatingRect}）
 *
 * @param rect - 视口矩形
 * @returns 内部坐标系下的矩形
 */
function toFloatingRect(rect: FloatingRectLike): FloatingRect {
  const viewRect = ensureViewBoundingRect()
  const viewLeft = viewRect?.left ?? 0
  const viewTop = viewRect?.top ?? 0
  const viewWidth = viewRect?.width ?? 0
  const viewHeight = viewRect?.height ?? 0
  return {
    left: rect.left - viewLeft,
    top: rect.top - viewTop,
    bottom: viewHeight + viewTop - rect.bottom,
    right: viewWidth + viewLeft - rect.right,
    width: rect.width,
    height: rect.height
  }
}

/**
 * 按内部坐标系测量元素矩形
 *
 * @param el - 待测量元素
 * @returns 内部坐标系下的矩形
 */
function getFloatingRect(el: HTMLElement): FloatingRect {
  return toFloatingRect(el.getBoundingClientRect())
}

/**
 * 按内部坐标系测量浮层矩形（尺寸取**布局尺寸**）
 *
 * 浮层尺寸取 `offsetWidth / offsetHeight` 而非 `getBoundingClientRect`：进入 / 离开的缩放动画会
 * 改变 `transform`，使 rect 返回缩放后的视觉尺寸（动画期间偏小 → 翻转判定与次轴位移算错）。
 * 求解只用浮层宽高，故此处直接以布局尺寸覆盖。
 *
 * @param el - 浮层元素
 * @returns 内部坐标系下的浮层矩形
 */
function getFollowerFloatingRect(el: HTMLElement): FloatingRect {
  const rect = getFloatingRect(el)
  rect.width = el.offsetWidth
  rect.height = el.offsetHeight
  return rect
}

/**
 * 浮层是否尚未渲染（`display: none`）
 *
 * ⚠️ 判定的是「**是否渲染**」而不是「尺寸是否为 0」：尺寸为 0 的浮层（例如内容全部绝对定位）是
 * **合法输入**，仍应正常参与求解；只有 `display: none` 才会让 `offsetWidth / offsetHeight` 双双
 * 归零，从而破坏翻转与内推判定（见 {@link useFloating} 的 `applyPosition`）。
 *
 * @param el - 浮层元素
 * @returns 未渲染时为 true
 */
function isPanelHidden(el: HTMLElement): boolean {
  return window.getComputedStyle(el).display === 'none'
}

/**
 * 取浮层 border box 的**精确尺寸（含小数）**
 *
 * 百分比位移的参照盒是浮层的 border box，而 `offsetWidth / offsetHeight` 是**取整值**，会抹掉
 * 决定细缝的小数部分（`130.15625 → 130`），故这里取 `getComputedStyle` 的布局尺寸 —— 它不受
 * 皮肤层缩放动画的 `transform` 影响（`getBoundingClientRect` 会受影响），动画期间也能量到正确尺寸。
 *
 * @param el - 浮层元素
 * @param fallback - 量不到时的回退值（offset 尺寸）
 * @returns border box 尺寸
 */
function getPanelBorderBoxSize(
  el: HTMLElement,
  fallback: { width: number; height: number }
): { width: number; height: number } {
  if (typeof window === 'undefined') return fallback
  try {
    const style = window.getComputedStyle(el)
    const width = parseFloat(style.width)
    const height = parseFloat(style.height)
    if (!Number.isFinite(width) || !Number.isFinite(height)) return fallback
    // border-box 下计算宽度即 border box；content-box 下需补上内边距与边框
    if (style.boxSizing === 'border-box') return { width, height }
    const toPx = (value: string) => {
      const px = parseFloat(value)
      return Number.isFinite(px) ? px : 0
    }
    return {
      width:
        width +
        toPx(style.paddingLeft) +
        toPx(style.paddingRight) +
        toPx(style.borderLeftWidth) +
        toPx(style.borderRightWidth),
      height:
        height +
        toPx(style.paddingTop) +
        toPx(style.paddingBottom) +
        toPx(style.borderTopWidth) +
        toPx(style.borderBottomWidth)
    }
  } catch (err) {
    console.debug('浮层精确尺寸测量失败，跳过位移取整：', err)
    return fallback
  }
}

/** 遮挡边界矩形（视口坐标的四条边） */
export interface FloatingBoundaryRect {
  top: number
  left: number
  bottom: number
  right: number
}

/**
 * 把「视口口径」的矩形换算为「以遮挡边界为口径」的矩形
 *
 * 求解层对 `targetRect` 的四条边一律按**可用空间**解读（见 {@link FloatingRect}），因此换边界只需
 * 换空间的参照物：四条边都改为「到边界对应边的距离」。边界取视口时该换算等价于恒等（视口原点为 0、
 * 宽度即右边界），故可统一走一条代码路径。
 *
 * 注意：`getOffset` 需要的是「相对定位容器的坐标」，那里仍传视口口径的矩形，两者不可混用。
 *
 * @param rect - 视口口径的矩形
 * @param boundary - 遮挡边界
 * @returns 以遮挡边界为口径的矩形
 */
function toBoundaryRelativeRect(rect: FloatingRect, boundary: FloatingBoundaryRect): FloatingRect {
  return {
    left: rect.left - boundary.left,
    top: rect.top - boundary.top,
    right: boundary.right - (rect.left + rect.width),
    bottom: boundary.bottom - (rect.top + rect.height),
    width: rect.width,
    height: rect.height
  }
}

/**
 * 目标（锚点）是否已完全离开「自身可见区」
 *
 * 判定用「矩形与可见区无交集」而非「尺寸为 0」：锚点只要还有 1px 落在可见区内，就仍需正常翻转与
 * 内推（例如触发器贴视口底部、两侧都放不下时把浮层推回边界内）。
 *
 * @param targetRect - 锚点矩形（内部坐标系，left / top 即视口坐标）
 * @param visibleRect - 锚点自身的可见区（最近可滚动祖先 ∩ 视口），视口坐标的四条边
 * @returns 锚点完全离开可见区时为 true
 */
function isTargetOutOfVisibleRect(targetRect: FloatingRect, visibleRect: FloatingBoundaryRect): boolean {
  return (
    targetRect.left + targetRect.width <= visibleRect.left ||
    targetRect.left >= visibleRect.right ||
    targetRect.top + targetRect.height <= visibleRect.top ||
    targetRect.top >= visibleRect.bottom
  )
}

/**
 * 按内部坐标系构造「点锚点」矩形
 *
 * 宽高恒为 0，故 left / top 同时就是「左 / 上方可用空间」，right / bottom 即「视口右 / 下边缘到该点
 * 的剩余空间」，与 {@link FloatingRect} 的约定自洽。
 *
 * @param x - 视口坐标 x（通常为鼠标事件 clientX）
 * @param y - 视口坐标 y（通常为鼠标事件 clientY）
 * @returns 点锚点的内部坐标系矩形
 */
function getPointFloatingRect(x: number, y: number): FloatingRect {
  return toFloatingRect({ left: x, top: y, right: x, bottom: y, width: 0, height: 0 })
}

// ── 求解层 ────────────────────────────────────────────────────────────────────────────────────

/**
 * 求实际方向与对齐微调量
 *
 * - 次轴 align 自适应：浮层比目标宽 / 高或空间不足时，start ↔ end 互换或退化为 center；
 * - 主轴翻转：仅同轴翻转（top ↔ bottom / left ↔ right），绝不跨轴，且保留原次轴后缀。
 *
 * 三点显式决策：
 * 1. `!flip` 不连带跳过 align 自适应与 shift —— 两个开关独立，只有都关闭才整体跳过，避免
 *    「关闭主轴翻转」时连次轴兜底一起失效；
 * 2. 「放不下」判定额外计入 `extraMainAxisSize`（主轴间距等浮层盒之外仍被占用的空间）：只比较浮层
 *    自身尺寸会漏算间距，浮层会带着间距溢出边界；取 0 时退化为「只比较浮层自身尺寸」；
 * 3. **翻转口径**：**当前侧放不下，且对侧空间更大**才翻转 —— 绝不跨轴，也绝不在空间更小的一侧
 *    展开。两侧都放不下时浮层必然溢出遮挡边界，由调用方按 {@link getMainAxisOverflowOffset} 推回
 *    边界内，保证浮层至少完整可见。
 *
 * @param placement - 期望方向（kebab 命名）
 * @param targetRect - 锚点矩形（内部坐标系，可按遮挡边界为口径）
 * @param followerRect - 浮层矩形（内部坐标系；求解只用其 width / height）
 * @param shift - 是否做次轴对齐微调（偏移量）
 * @param flip - 是否允许主轴同轴翻转
 * @param extraMainAxisSize - 主轴方向浮层盒之外仍占用的尺寸（px），仅参与「放不下」判定；可选，默认 0
 * @returns 实际方向与主 / 次轴微调量（px）
 */
export function getPlacementAndOffsetOfFollower(
  placement: KebabPlacement,
  targetRect: FloatingRect,
  followerRect: FloatingRect,
  shift: boolean,
  flip: boolean,
  extraMainAxisSize = 0
): { placement: KebabPlacement; top: number; left: number } {
  if (!flip && !shift) {
    return { placement, top: 0, left: 0 }
  }
  const [position, align] = placement.split('-') as [AxisPlacement, FloatingAlign | undefined]
  let properAlign: FloatingAlign = align ?? 'center'
  let properOffset = { top: 0, left: 0 }
  // 计算把浮层推回边界内所需的对齐微调量：diff 为该方向上的溢出量，方向符号由 keepOffsetDirection 决定
  const deriveOffset = (
    oppositeAlignCssSizeProp: 'width' | 'height',
    alignCssPositionProp: AxisPlacement,
    offsetVertically: boolean
  ): { left: number; top: number } => {
    let left = 0
    let top = 0
    const diff =
      followerRect[oppositeAlignCssSizeProp] - targetRect[alignCssPositionProp] - targetRect[oppositeAlignCssSizeProp]
    if (diff > 0 && shift) {
      if (offsetVertically) {
        top = keepOffsetDirection[alignCssPositionProp] ? diff : -diff
      } else {
        left = keepOffsetDirection[alignCssPositionProp] ? diff : -diff
      }
    }
    return { left, top }
  }
  const offsetVertically = position === 'left' || position === 'right'
  if (properAlign !== 'center') {
    // 复合方向：按「当前对齐侧」与「对侧」的可用空间，决定是否换对齐侧或退化为居中
    const oppositeAlignCssPositionProp = oppositeAlignCssPositionProps[`${position}-${properAlign}`]
    const currentAlignCssPositionProp = oppositionPositions[oppositeAlignCssPositionProp]
    const oppositeAlignCssSizeProp = propToCompare[oppositeAlignCssPositionProp]
    if (followerRect[oppositeAlignCssSizeProp] > targetRect[oppositeAlignCssSizeProp]) {
      if (
        targetRect[oppositeAlignCssPositionProp] + targetRect[oppositeAlignCssSizeProp] <
        followerRect[oppositeAlignCssSizeProp]
      ) {
        const followerOverTargetSize =
          (followerRect[oppositeAlignCssSizeProp] - targetRect[oppositeAlignCssSizeProp]) / 2
        if (
          targetRect[oppositeAlignCssPositionProp] < followerOverTargetSize ||
          targetRect[currentAlignCssPositionProp] < followerOverTargetSize
        ) {
          if (targetRect[oppositeAlignCssPositionProp] < targetRect[currentAlignCssPositionProp]) {
            // 对侧空间更大：换到对侧对齐（取反即对当前 properAlign 取反）
            properAlign = oppositeAligns[properAlign]
            properOffset = deriveOffset(oppositeAlignCssSizeProp, currentAlignCssPositionProp, offsetVertically)
          } else {
            properOffset = deriveOffset(oppositeAlignCssSizeProp, oppositeAlignCssPositionProp, offsetVertically)
          }
        } else {
          // 居中更合适
          properAlign = 'center'
        }
      }
    } else if (followerRect[oppositeAlignCssSizeProp] < targetRect[oppositeAlignCssSizeProp]) {
      if (
        targetRect[currentAlignCssPositionProp] < 0 &&
        targetRect[oppositeAlignCssPositionProp] > targetRect[currentAlignCssPositionProp]
      ) {
        properAlign = oppositeAligns[properAlign]
      }
    }
  } else {
    // 居中方向：居中放不下时退化为 start / end 对齐
    const alternativeAlignCssPositionProp1: AxisPlacement = position === 'bottom' || position === 'top' ? 'left' : 'top'
    const alternativeAlignCssPositionProp2 = oppositionPositions[alternativeAlignCssPositionProp1]
    const alternativeAlignCssSizeProp = propToCompare[alternativeAlignCssPositionProp1]
    const followerOverTargetSize =
      (followerRect[alternativeAlignCssSizeProp] - targetRect[alternativeAlignCssSizeProp]) / 2
    if (
      targetRect[alternativeAlignCssPositionProp1] < followerOverTargetSize ||
      targetRect[alternativeAlignCssPositionProp2] < followerOverTargetSize
    ) {
      if (targetRect[alternativeAlignCssPositionProp1] > targetRect[alternativeAlignCssPositionProp2]) {
        properAlign = cssPositionToOppositeAlign[alternativeAlignCssPositionProp1]
        properOffset = deriveOffset(alternativeAlignCssSizeProp, alternativeAlignCssPositionProp1, offsetVertically)
      } else {
        properAlign = cssPositionToOppositeAlign[alternativeAlignCssPositionProp2]
        properOffset = deriveOffset(alternativeAlignCssSizeProp, alternativeAlignCssPositionProp2, offsetVertically)
      }
    }
  }
  // 主轴翻转：仅同轴（position ↔ oppositionPositions[position]）。两侧都放不下时浮层必然溢出边界，
  // 由调用方按 getMainAxisOverflowOffset 推回边界内，故这里不必为了「避免裁切」而放宽翻转条件
  // （那会让方向随两侧空间的微小变化来回跳）
  let properPosition = position
  if (
    flip &&
    targetRect[position] < followerRect[propToCompare[position]] + extraMainAxisSize &&
    targetRect[position] < targetRect[oppositionPositions[position]]
  ) {
    properPosition = oppositionPositions[position]
  }
  return {
    placement: properAlign !== 'center' ? `${properPosition}-${properAlign}` : properPosition,
    left: properOffset.left,
    top: properOffset.top
  }
}

/**
 * 取缩放动画原点（transformOrigin）
 *
 * 查表得出，无分支、无魔法值。表中不含 overlap 形态（本库无 overlap 需求）。
 *
 * @param placement - 实际方向（kebab 命名）
 * @returns CSS transform-origin 值
 */
export function getProperTransformOrigin(placement: KebabPlacement): string {
  return transformOrigins[placement]
}

/**
 * 求浮层相对定位容器的 top / left 与百分比位移
 *
 * 逐 case 把位移写成「锚点边缘 − 容器原点 [+ 对齐微调]」，自身尺寸则由**百分比位移**承担，
 * 因此**浮层尺寸变化时无需重算**。
 *
 * **位移用 CSS 独立属性 `translate` 而非 `transform`**：皮肤层的缩放动画用的是独立属性 `scale`，
 * 独立变换属性的复合顺序为 `translate → rotate → scale → transform`。若定位写在 `transform` 里，
 * `scale` 会与之相乘，使位移量被一并缩放（动画期间浮层整体偏移 `(1 - scale) × 位移量`，观感上像从
 * 错误的一角弹出）；写在 `translate` 里则 `scale` 只作用于已就位的盒子，动画期间位置保持不动。
 *
 * @param placement - 实际方向（kebab 命名）
 * @param offsetRect - 定位容器的视口矩形（只用其 left / top 作坐标原点）
 * @param targetRect - 锚点矩形（内部坐标系）
 * @param offsetTopToStandardPlacement - 主轴方向的对齐微调量（top）
 * @param offsetLeftToStandardPlacement - 主轴方向的对齐微调量（left）
 * @returns 浮层的内联定位样式值
 */
export function getOffset(
  placement: KebabPlacement,
  offsetRect: Pick<FloatingRect, 'left' | 'top'>,
  targetRect: FloatingRect,
  offsetTopToStandardPlacement: number,
  offsetLeftToStandardPlacement: number
): { top: string; left: string; translate: string } {
  switch (placement) {
    case 'bottom-start':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        translate: ''
      }
    case 'bottom-end':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        translate: '-100%'
      }
    case 'top-start':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        translate: '0 -100%'
      }
    case 'top-end':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        translate: '-100% -100%'
      }
    case 'right-start':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        translate: ''
      }
    case 'right-end':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        translate: '0 -100%'
      }
    case 'left-start':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        translate: '-100%'
      }
    case 'left-end':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        translate: '-100% -100%'
      }
    case 'top':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
        translate: '-50% -100%'
      }
    case 'right':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        translate: '0 -50%'
      }
    case 'left':
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        translate: '-100% -50%'
      }
    case 'bottom':
    default:
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
        translate: '-50%'
      }
  }
}

/**
 * 把「百分比位移」中不足 1px 的小数部分补掉，使浮层最终落在整数像素上
 *
 * **为什么需要**：位移写成百分比是为了「浮层尺寸变化时无需重算」（见 {@link getOffset}），但浮层
 * 尺寸常带小数（卡片宽度由文本撑开，如 `118.15625px`），百分比位移随之落在小数像素上。此时浏览器
 * 把浮层的**背景盒**对齐到整数像素绘制，而**自带 transform 节点的后代**（如箭头的旋转盒）仍按其
 * 精确布局位置绘制 —— 两者边缘在相接处错开不足 1px，留下一条淡色细缝（`Tooltip` / `Slider` 的
 * `left` / `right` 方向肉眼可见；`top` / `bottom` 方向因浮层高度通常为整数而不出现）。
 *
 * **做法**：只补掉「不足 1px 的小数部分」，百分比本身仍承担「随浮层尺寸自适应」，尺寸变化时依旧
 * 无需重算；补足后浮层落在整数像素上，背景边缘与箭头边缘重新对齐。
 *
 * @param translate - 百分比位移（形如 `'-100% -50%'` / `'0 -100%'` / `''`）
 * @param size - 浮层 border box 尺寸（百分比位移的参照盒）
 * @returns 取整后的位移；无需修正时原样返回
 */
export function snapTranslate(translate: string, size: { width: number; height: number }): string {
  if (!translate) return translate
  return translate
    .split(' ')
    .map((token, index) => snapTranslateToken(token, index === 0 ? size.width : size.height))
    .join(' ')
}

/**
 * 单个轴向的百分比位移取整：`-100%` → `calc(-100% + 0.156px)`
 *
 * @param token - 单轴位移（`0` / `-50%` / `-100%`）
 * @param refSize - 该轴的参照尺寸（px）
 * @returns 取整后的位移；非百分比 / 参照尺寸不可用 / 已在整数像素上时原样返回
 */
function snapTranslateToken(token: string, refSize: number): string {
  // 非百分比（`0`）或参照尺寸不可用（未布局、SSR、单测环境无布局）时不修正
  if (!token.endsWith('%') || !(refSize > 0)) return token
  const offset = (parseFloat(token) / 100) * refSize
  if (!Number.isFinite(offset)) return token
  const correction = Math.round(offset) - offset
  if (Math.abs(correction) < 1e-6) return token
  return `calc(${token} + ${Number(correction.toFixed(4))}px)`
}

/**
 * 求主轴方向的外间距（把浮层沿主轴方向推离锚点 offset 距离）
 *
 * 主轴间距由浮层视觉盒之外的空间承担，此处把它显式化为 `offset` 参数，
 * 叠加进 getOffset 的对齐微调量中，方向符号随实际方向确定。
 *
 * @param placement - 实际方向（kebab 命名）
 * @param offset - 主轴间距（px）
 * @returns 叠加到 getOffset 微调量上的偏移
 */
function getMainAxisGap(placement: KebabPlacement, offset: number): { top: number; left: number } {
  if (offset === 0) {
    return { top: 0, left: 0 }
  }
  const position = placement.split('-')[0] as AxisPlacement
  if (position === 'top') return { top: -offset, left: 0 }
  if (position === 'bottom') return { top: offset, left: 0 }
  if (position === 'left') return { top: 0, left: -offset }
  return { top: 0, left: offset }
}

/**
 * 求主轴方向「把浮层推回遮挡边界内」所需的位移量
 *
 * 期望方向与对侧都放不下时，浮层必然溢出遮挡边界，若放任不管就会被裁切
 * （现象：下拉面板只露出前几项 / 溢出视口底边被截断）。此处把主轴位移补足，使浮层被推回边界内 ——
 * **允许覆盖锚点**（浮层完整可见优先）。
 *
 * 由 {@link useFloating} 的 `applyPosition` 在 `flip` 开启时调用：`flip: false` 的语义是「不为主轴
 * 边界做任何位置调整」（`Slider` 气泡即依赖此语义），此时不启用本兜底。
 * 只处理主轴（placement 的首个方向）：次轴的「对齐侧自适应 + 微调」由 `shift` 承担，两者互不影响。
 *
 * @param placement - 实际方向（kebab 命名）
 * @param targetRect - 锚点矩形（视口口径；left / top 为真实坐标）
 * @param followerRect - 浮层矩形（只取主轴尺寸）
 * @param boundary - 遮挡边界（视口口径）
 * @param gap - 主轴间距（px）
 * @returns 叠加到 getOffset 微调量上的主轴位移（全 0 表示无需调整）
 */
function getMainAxisOverflowOffset(
  placement: KebabPlacement,
  targetRect: FloatingRect,
  followerRect: FloatingRect,
  boundary: FloatingBoundaryRect,
  gap: number
): { top: number; left: number } {
  const position = placement.split('-')[0] as AxisPlacement
  if (position === 'top' || position === 'bottom') {
    // 期望位置的顶边：bottom 起于锚点下边缘外 gap，top 起于锚点上边缘外 gap 再自身上移一个浮层高
    const top =
      position === 'bottom' ? targetRect.top + targetRect.height + gap : targetRect.top - gap - followerRect.height
    if (top < boundary.top) {
      return { top: boundary.top - top, left: 0 }
    }
    if (top + followerRect.height > boundary.bottom) {
      return { top: boundary.bottom - top - followerRect.height, left: 0 }
    }
    return { top: 0, left: 0 }
  }
  // 水平主轴（left / right）同理
  const left =
    position === 'right' ? targetRect.left + targetRect.width + gap : targetRect.left - gap - followerRect.width
  if (left < boundary.left) {
    return { top: 0, left: boundary.left - left }
  }
  if (left + followerRect.width > boundary.right) {
    return { top: 0, left: boundary.right - left - followerRect.width }
  }
  return { top: 0, left: 0 }
}

/**
 * 写入浮层的尺寸关系（等宽 / 最小等宽 / 固定宽度）
 *
 * **必须直接写在元素上而不是走样式绑定**：尺寸会参与紧随其后的浮层测量，
 * 若等下一帧由模板更新，本次求解读到的仍是旧尺寸（等宽场景下偏差极大）。
 *
 * 该写入是内核唯一的 DOM 写操作，且仅当调用方显式传入 `matchTriggerWidth` 时才发生。
 *
 * @param panel - 浮层元素
 * @param triggerWidth - 锚点宽度（px）
 * @param match - 尺寸关系（`'width'` / `'minWidth'` / `number` / `false`）
 */
function applyMatchTriggerWidth(
  panel: HTMLElement,
  triggerWidth: number,
  match: 'width' | 'minWidth' | number | false
): void {
  const { style } = panel
  if (match === 'width') {
    // 等宽：宽与最小宽都跟随触发器，内容超宽时也不会被压窄
    style.width = `${triggerWidth}px`
    style.minWidth = `${triggerWidth}px`
    return
  }
  if (match === 'minWidth') {
    // 最小等宽：宽由内容决定，仅保证不窄于触发器
    style.width = ''
    style.minWidth = `${triggerWidth}px`
    return
  }
  if (typeof match === 'number') {
    style.width = `${match}px`
    style.minWidth = `${triggerWidth}px`
    return
  }
  style.width = ''
  style.minWidth = ''
}

// ── 同步层 ────────────────────────────────────────────────────────────────────────────────────

/**
 * 收集锚点的**全链**滚动祖先
 *
 * 用 while 逐级向上遍历，把每一层可滚动祖先都纳入监听 —— 只取最近的一个时，锚点处于嵌套双层滚动
 * 容器内时外层滚动不触发跟随。视口滚动的事件目标为 window（元素级 scroll 不冒泡，documentElement
 * 收不到），故 documentElement 统一替换为 window。
 *
 * @param el - 起点元素（锚点）
 * @returns 需要监听 scroll 的全链目标
 */
function collectScrollTargets(el: HTMLElement): (HTMLElement | Window)[] {
  if (typeof window === 'undefined') return []
  const targets: (HTMLElement | Window)[] = []
  let cursor: HTMLElement | null = el
  while (cursor !== null) {
    cursor = getScrollParent(cursor)
    if (cursor === null) break
    targets.push(cursor === document.documentElement ? window : cursor)
  }
  return targets
}

/** 滚动 / 尺寸同步的触发源 */
export type FloatingSyncTrigger = 'scroll' | 'resize' | 'font'

/** 遮挡边界口径：视口 / 最近可滚动祖先（仅当浮层真被其裁剪时，见 getFloatingBoundaryRect） */
export type FloatingBoundary = 'viewport' | 'scrollParent'

/**
 * 同步监听的注册选项
 *
 * 滚动 / resize 回调只读不写，passive 可避免阻塞合成线程；add / remove 复用同一对象，
 * 保证在不支持 options 对象的老引擎（把对象当 capture 布尔值）上注册与移除依然配对。
 */
const SYNC_LISTENER_OPTIONS: AddEventListenerOptions = { passive: true }

/**
 * 浮层「尚未渲染（`display: none`）」时的最大重试帧数
 *
 * 宿主用 `v-show` 控制浮层显隐时，`enabled` 翻真的首个求解 tick 可能仍处于 `display: none`
 * （宿主的样式更新发生在本轮 post 回调之后），此时测得的尺寸全为 0 —— 详见 `applyPosition`。
 * 两帧足以跨过该窗口，且不会在「浮层长期未渲染」时持续空转。
 */
const MAX_HIDDEN_RETRIES = 2

export interface UseFloatingOptions {
  /** 锚点元素（DOM 锚点；与 virtualAnchor / point 三选一，优先级见 {@link useFloating}） */
  anchor?: MaybeRefOrGetter<HTMLElement | null>
  /** 虚拟锚点（非 DOM 元素的自定义矩形，用于 Tour / Table 列筛选等「指向任意位置」场景） */
  virtualAnchor?: MaybeRefOrGetter<FloatingVirtualAnchor | null>
  /** x-y 手动定位（视口坐标，用于跟随鼠标 / 鼠标事件定点弹出） */
  point?: MaybeRefOrGetter<FloatingPoint | null>
  /**
   * 浮层的定位参照容器
   *
   * 浮层的 `top` / `left` 相对该容器的 padding box 计算，容器需满足 `position: absolute`、
   * 无 padding / border，作为定位原点。本库的宿主 DOM 由 `<Popup>` 渲染，故容器由宿主传入。
   * 容器矩形按**实时测量**，因此 Teleport 到 body 与 `to: false` 就地渲染两种情况共用同一套求解，
   * 无需内核区分。
   */
  offsetContainer: MaybeRefOrGetter<HTMLElement | null>
  /** 期望方向（对外命名） */
  placement: MaybeRefOrGetter<FloatingPlacement>
  /** 是否允许主轴同轴翻转，默认 true */
  flip?: MaybeRefOrGetter<boolean>
  /** 是否做次轴对齐微调（含 align 自适应），默认 true */
  shift?: MaybeRefOrGetter<boolean>
  /** 主轴方向浮层与锚点之间的间距（px），默认 0 */
  offset?: MaybeRefOrGetter<number>
  /**
   * 遮挡边界口径，默认 `'scrollParent'`
   *
   * `'scrollParent'` 复用本库 `getFloatingBoundaryRect`：仅当浮层真的被最近可滚动祖先裁剪时以其为界，
   * 否则（含浮层被 Teleport 出去的情形）自动退化为视口 —— 即 `Tooltip` / `Select` /
   * `AutoComplete` 现状口径。`'viewport'` 为以视口为界的口径。
   */
  boundary?: MaybeRefOrGetter<FloatingBoundary>
  /**
   * 尺寸关系，默认 `false`（不约束）
   *
   * - `'width'`：浮层宽 = 锚点宽，且最小宽同值（`Select` 现状）
   * - `'minWidth'`：浮层最小宽 = 锚点宽，宽由内容决定（`AutoComplete` 现状）
   * - `number`：浮层宽 = 该像素值，最小宽 = 锚点宽（`AutoComplete` 的 `dropdownMatchSelectWidth` 传数值时）
   */
  matchTriggerWidth?: MaybeRefOrGetter<'width' | 'minWidth' | number | false>
  /** 是否启用定位与监听（浮层隐藏时置 false，避免无谓测量），默认 true */
  enabled?: MaybeRefOrGetter<boolean>
  /** 需要跟随的触发源，默认全开 */
  syncTrigger?: FloatingSyncTrigger[]
}

export interface UseFloatingReturn {
  /** 浮层内联定位样式：top / left / translate（尺寸交由百分比位移承担） */
  panelStyle: Ref<CSSProperties>
  /** 翻转 / 对齐自适应后的实际方向（对外命名，供宿主落成 DOM 属性供 CSS 消费） */
  actualPlacement: Ref<FloatingPlacement>
  /** 缩放动画原点（相对浮层自身盒） */
  transformOrigin: Ref<string>
  /** 主动重算一次（立即执行，不做帧合并） */
  update: () => void
  /**
   * 帧级强制重对齐（同一帧内多次调用只重算一次）
   *
   * 用于锚点持续移动但无滚动 / resize 事件的场景（如 Slider 拖动中的手柄）；调用方在每次锚点位置
   * 变化时调用即可，无需自管订阅。
   */
  sync: () => void
}

/**
 * 组合式函数（浮层定位内核）
 *
 * 只做「算 + 输出 + 同步」：不创建 DOM、不假设内容结构、不含皮肤、不接管 Teleport。
 * - 算：flip / 次轴 align 自适应 / offset / transformOrigin；
 * - 输出：浮层内联样式与实际方向；仅当传入 `matchTriggerWidth` 时会写浮层尺寸样式；
 * - 同步：锚点所在**全链**滚动祖先 + 视口 resize + 字体就绪自动重算，另有 `sync()` 供锚点持续
 *   移动（拖动）场景主动强制重对齐。
 *
 * 锚点三选一，按 `point` → `virtualAnchor` → `anchor` 的优先级取第一个可用者。
 *
 * @param panelRef - 浮层元素（定位样式的落点）
 * @param options - 锚点（三选一）、参照容器与求解参数
 * @returns 定位样式、实际方向、动画原点、主动重算与帧级重对齐方法
 */
export function useFloating(panelRef: Ref<HTMLElement | null>, options: UseFloatingOptions): UseFloatingReturn {
  const {
    anchor,
    virtualAnchor,
    point,
    offsetContainer,
    placement,
    flip = true,
    shift = true,
    offset = 0,
    boundary = 'scrollParent',
    matchTriggerWidth = false,
    enabled = true,
    syncTrigger = ['scroll', 'resize', 'font']
  } = options
  const styleTop = ref('')
  const styleLeft = ref('')
  // 位移用独立属性 translate（而非 transform）：与皮肤层的 scale 动画复合时平移量不会被缩放
  const styleTranslate = ref('')
  const actualPlacement = ref<FloatingPlacement>(toValue(placement))
  const transformOrigin = ref('')
  const panelStyle = computed<CSSProperties>(() => ({
    top: styleTop.value,
    left: styleLeft.value,
    translate: styleTranslate.value
  }))
  let scrollTargets: (HTMLElement | Window)[] = []
  let boundaryScrollParent: HTMLElement | null = null // 遮挡边界参照的滚动祖先（随锚点刷新，避免每帧走 getComputedStyle）
  let disposed = false // 组件已卸载：忽略在途的帧回调与字体就绪回调
  let fontsReadyAttached = false // 字体就绪回调每实例至多挂一次，避免反复 show 累积 promise 回调
  let hiddenRetries = 0 // 浮层「尚未渲染」已重试的帧数，见 applyPosition
  // 是否具备可用的锚点来源（决定要不要建立同步监听；仅 point / virtualAnchor 时也成立）
  const hasAnchorSource = computed(() => Boolean(toValue(point) || toValue(virtualAnchor) || toValue(anchor)))

  // 求当前锚点矩形：point 优先、其次虚拟锚点、最后 DOM 锚点
  function resolveTargetRect(): FloatingRect | null {
    const manualPoint = toValue(point)
    if (manualPoint) {
      return getPointFloatingRect(manualPoint.x, manualPoint.y)
    }
    const virtual = toValue(virtualAnchor)
    if (virtual) {
      return toFloatingRect(virtual.getBoundingClientRect())
    }
    const anchorEl = toValue(anchor)
    return anchorEl ? getFloatingRect(anchorEl) : null
  }

  // 求遮挡边界：scrollParent 口径复用 getFloatingBoundaryRect（浮层未被容器裁剪时自动退化为视口）。
  // 视口尺寸由调用方传入，避免同一帧内重复测量（求解 / 内推 / 锚点可见性判定共用同一口径）
  function resolveBoundaryRect(panel: HTMLElement, viewWidth: number, viewHeight: number): FloatingBoundaryRect {
    if (toValue(boundary) === 'scrollParent') {
      return getFloatingBoundaryRect(boundaryScrollParent, panel, viewWidth, viewHeight)
    }
    return { top: 0, left: 0, bottom: viewHeight, right: viewWidth }
  }

  // 计算并落盘定位样式：单次求解 = 量 → 求方向与微调量 → 求 top / left / translate
  function applyPosition(): void {
    if (disposed) return
    const panel = panelRef.value
    const container = toValue(offsetContainer)
    if (!toValue(enabled) || !panel || !container) return
    const targetRect = resolveTargetRect()
    if (!targetRect) return
    // 尺寸关系须在测量浮层之前写入，否则本次求解读到的仍是上一轮尺寸
    applyMatchTriggerWidth(panel, targetRect.width, toValue(matchTriggerWidth))
    const kebabPlacement = FLOATING_TO_KEBAB[toValue(placement)]
    // 浮层尚未渲染：宿主用 `v-show` 控制时，`enabled` 翻真的首个求解 tick 里浮层仍是 `display: none`
    // （宿主的样式更新发生在本轮 post 回调之后），offsetWidth / offsetHeight 双双为 0。此时若照常
    // 求解，「下方永远放得下」会让主轴既不翻转也不内推，且此后不会再有任何 trigger 触发重算
    // （现象：首次打开正常翻转到上方，二次打开却向下展开并被裁切）。故本轮不落盘样式，改到后续帧
    // 重试（带上限，避免浮层长期未渲染时空转）
    if (isPanelHidden(panel)) {
      if (hiddenRetries < MAX_HIDDEN_RETRIES) {
        hiddenRetries += 1
        scheduleSync()
      }
      return
    }
    hiddenRetries = 0
    const followerRect = getFollowerFloatingRect(panel)
    const offsetRect = getFloatingRect(container)
    const mainAxisSpacing = toValue(offset)
    // 视口尺寸与本轮遮挡边界只量一次：求解、「推回边界内」与锚点可见性判定共用同一口径
    const viewRect = ensureViewBoundingRect()
    const viewWidth = viewRect?.width ?? 0
    const viewHeight = viewRect?.height ?? 0
    const boundaryRect = resolveBoundaryRect(panel, viewWidth, viewHeight)
    // 锚点可见性守卫：锚点已完全离开可见区（最近可滚动祖先 ∩ 视口）时不做主轴翻转与内推 —— 浮层按
    // 期望方向原样跟随锚点移出边界（缺该守卫时浮层会钉在视口边缘不随锚点离场，观感像 `position: fixed`）。
    // 仅真实 DOM 锚点可判定；虚拟锚点 / x-y 手动定位没有 DOM 祖先，保持原有行为
    const domAnchor = toValue(anchor)
    const anchorOutOfVisibleRect = Boolean(
      domAnchor &&
      isTargetOutOfVisibleRect(
        targetRect,
        getFloatingBoundaryRect(boundaryScrollParent, domAnchor, viewWidth, viewHeight)
      )
    )
    const flipEnabled = toValue(flip) && !anchorOutOfVisibleRect
    const {
      left: shiftLeft,
      top: shiftTop,
      placement: properPlacement
    } = getPlacementAndOffsetOfFollower(
      kebabPlacement,
      // 求解口径：可用空间以遮挡边界为界（视口口径下该换算等价于恒等）
      toBoundaryRelativeRect(targetRect, boundaryRect),
      followerRect,
      toValue(shift),
      flipEnabled,
      mainAxisSpacing // 主轴间距同样占用空间，须计入「放不下」判定
    )
    const gap = getMainAxisGap(properPlacement, mainAxisSpacing)
    // 翻转后两侧都放不下时，浮层必然溢出遮挡边界而被裁切，按主轴方向推回边界内；
    // `flip: false` 的语义是「不为主轴边界做任何位置调整」，故不启用（Slider 气泡即依赖此语义）
    const overflow = flipEnabled
      ? getMainAxisOverflowOffset(properPlacement, targetRect, followerRect, boundaryRect, mainAxisSpacing)
      : { top: 0, left: 0 }
    const { top, left, translate } = getOffset(
      properPlacement,
      offsetRect,
      targetRect,
      shiftTop + gap.top + overflow.top,
      shiftLeft + gap.left + overflow.left
    )
    actualPlacement.value = KEBAB_TO_FLOATING[properPlacement]
    transformOrigin.value = getProperTransformOrigin(properPlacement)
    styleTop.value = top
    styleLeft.value = left
    // 百分比位移取整：浮层尺寸常带小数，否则背景边缘会与箭头等自带 transform 的后代边缘错开不足
    // 1px，在相接处留下淡色细缝（见 snapTranslate）。translate 为空（无位移）时无需测量浮层尺寸
    styleTranslate.value = translate ? snapTranslate(translate, getPanelBorderBoxSize(panel, followerRect)) : translate
  }

  // 帧合并：滚动 / resize / 拖动高频触发时，每帧最多重算一次
  function scheduleSync(): void {
    if (disposed || !toValue(enabled)) return
    beforeNextFrameOnce(applyPosition)
  }

  // 重建同步监听：先清后建，保证锚点变化后监听对象不残留
  function addSyncListeners(): void {
    removeSyncListeners()
    if (disposed) return
    const anchorEl = toValue(anchor)
    // 遮挡边界参照的最近滚动祖先与锚点同生命周期刷新（每帧重算要走 getComputedStyle 全链，代价高）
    boundaryScrollParent = anchorEl ? getScrollParent(anchorEl) : null
    // 滚动链只能从真实 DOM 锚点向上收集：虚拟锚点 / x-y 手动定位没有 DOM 祖先，
    // 该场景由调用方在需要时主动 sync()
    if (syncTrigger.includes('scroll') && anchorEl) {
      scrollTargets = collectScrollTargets(anchorEl)
      scrollTargets.forEach((target) => target.addEventListener('scroll', scheduleSync, SYNC_LISTENER_OPTIONS))
    }
    // resize / 字体就绪与锚点类型无关（视口级事件）
    if (syncTrigger.includes('resize') && typeof window !== 'undefined') {
      window.addEventListener('resize', scheduleSync, SYNC_LISTENER_OPTIONS)
    }
    if (syncTrigger.includes('font') && !fontsReadyAttached && typeof document !== 'undefined') {
      fontsReadyAttached = true
      document.fonts?.ready
        .then(() => {
          if (!disposed && toValue(enabled)) applyPosition()
        })
        .catch((err) => console.debug('字体就绪检测失败，跳过字体触发的重对齐：', err))
    }
  }

  // 移除同步监听（含字体回调），幂等
  function removeSyncListeners(): void {
    scrollTargets.forEach((target) => target.removeEventListener('scroll', scheduleSync, SYNC_LISTENER_OPTIONS))
    scrollTargets = []
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', scheduleSync, SYNC_LISTENER_OPTIONS)
    }
  }

  // 锚点来源 / 浮层 / 启用态变化时重建监听并立即定位：post flush 保证 DOM 已就绪且在浏览器绘制前
  // 完成，避免首帧错位闪烁
  watch(
    [() => toValue(anchor), hasAnchorSource, () => panelRef.value, () => toValue(enabled), () => toValue(boundary)],
    ([, hasSource, panel]) => {
      if (!toValue(enabled) || !hasSource || !panel) {
        removeSyncListeners()
        return
      }
      addSyncListeners()
      applyPosition()
    },
    { immediate: true, flush: 'post' }
  )
  // 求解参数与锚点矩形来源变化时立即重算（不做帧合并，避免切换方向的瞬间停在旧位置）
  watch(
    [
      () => toValue(placement),
      () => toValue(flip),
      () => toValue(shift),
      () => toValue(offset),
      () => toValue(boundary),
      () => toValue(matchTriggerWidth),
      () => toValue(point),
      () => toValue(virtualAnchor)
    ],
    () => {
      if (toValue(enabled)) applyPosition()
    },
    { flush: 'post' }
  )
  onBeforeUnmount(() => {
    disposed = true
    removeSyncListeners()
  })

  return {
    panelStyle,
    actualPlacement,
    transformOrigin,
    update: applyPosition,
    sync: scheduleSync
  }
}
