<script setup lang="ts">
/**
 * 在容器（或全屏）上铺一层由 canvas 绘制、按 `background-repeat` 平铺的重复水印。
 * 水印层被删除或被改写 style / class 时自动重建；绘制失败（图片不可用）只告警、不影响宿主内容。
 */
import { shallowRef, computed, inject, watch, onMounted, onBeforeUnmount } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { useMutationObserver, log } from 'components/utils'
import { THEME_SNAPSHOT_KEY } from 'components/config-provider/context'
export interface Font {
  color?: string // 字体颜色；不传时取主题变量 --va-fill-color-3（浅色 rgba(0,0,0,.15) / 暗色 rgba(255,255,255,.18)）
  fontSize?: number // 字体大小，单位 px，默认 16
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number // 字体粗细，默认 'normal'
  fontFamily?: string // 字体类型，默认 'sans-serif'
  fontStyle?: 'normal' | 'italic' | 'oblique' // 字体样式，默认 'normal'
  fontVariant?: 'normal' | 'small-caps' // 字体变体，默认 'normal'；仅 small-caps 在 font 简写中合法
  textAlign?: 'left' | 'center' | 'right' // 多行文字的横向对齐方式，默认 'center'；单行无差异
  lineHeight?: number // 多行文字的行高（相邻两行文本的距离），单位 px，默认 fontSize × 1.2；同时决定单元格高度
}
export interface Props {
  content?: string | string[] // 水印文字内容，传数组即为多行
  image?: string // 图片源，优先级高于 content，建议使用 2 倍或 3 倍图
  imageOpacity?: number // 图片水印的透明度，仅当传 image 时生效
  width?: number // 水印的宽度，单位 px；默认图片按原图比例推算、文字按内容宽度
  height?: number // 水印的高度，默认为 content 自身的高度，单位 px
  layout?: 'parallel' | 'alternate' // 布局方式：平行布局 / 交替布局
  rotate?: number // 水印绘制时旋转的角度，单位 deg
  textStyle?: Font // 水印文字样式
  gap?: [number, number] // 水印之间的间距
  offset?: [number, number] // 水印距离容器左上角的偏移量，默认为 gap / 2
  zIndex?: number // 水印层的 z-index
  fullscreen?: boolean // 是否启用全屏水印，启用后挂载到 <html> 并固定于视口
}
// 声明组件插槽类型
export interface WatermarkSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  content: undefined,
  image: undefined,
  imageOpacity: 1,
  width: undefined,
  height: undefined,
  layout: 'alternate',
  rotate: -22,
  textStyle: () => ({
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontStyle: 'normal'
  }),
  gap: () => [100, 100],
  offset: undefined, // 不设默认值：缺省时由 offsetLeft / offsetTop 回落到 gap / 2
  zIndex: 90,
  fullscreen: false
})
defineSlots<WatermarkSlots>()
const containerRef = shallowRef<HTMLDivElement | null>(null) // 组件容器，局部水印作为其子节点铺在内容之上
const watermarkRef = shallowRef<HTMLDivElement>() // 水印元素，尚未创建时为 undefined
// 水印实际挂载的父节点（全屏时为 <html>），防篡改观察者跟着它走
const markParent = shallowRef<HTMLElement | null>(null)
// SSR（Node）环境无 document，htmlRef 为 null；浏览器端仍指向 <html> 元素
const htmlRef = shallowRef<HTMLElement | null>(typeof document !== 'undefined' ? document.documentElement : null)
/**
 * 水印默认色：canvas 读不到 CSS 变量，故按优先级取色——
 * 1. 显式 `textStyle.color`；
 * 2. Provider 的只读快照（既定用途之一）；
 * 3. 无 Provider 时回读 `<html>` 上的静态变量表（`:root` / `[data-va-mode]` 已声明两个模式的全量表，
 *    首帧与重绘时两套模式都正确；纯 CSS 在运行期改 `<html>` 属性不会触发重绘，跟随明暗请用 Provider 的 `mode`）；
 * 4. SSR 等拿不到 DOM 时才回落浅色默认。
 */
const themeSnapshot = inject(THEME_SNAPSHOT_KEY, null)
const resolvedTextColor = computed(() => {
  if (props.textStyle.color) {
    return props.textStyle.color
  }
  const snapshotColor = themeSnapshot?.value?.['--va-fill-color-3']
  if (snapshotColor) {
    return snapshotColor
  }
  // 静态变量表随每份样式产物下发，无 Provider 的纯 CSS 暗色（直接写 data-va-mode）也能取到模式正确的值
  if (typeof document !== 'undefined') {
    const staticColor = getComputedStyle(document.documentElement).getPropertyValue('--va-fill-color-3').trim()
    if (staticColor) {
      return staticColor
    }
  }
  return 'rgba(0, 0, 0, 0.15)'
})
const stopObservation = shallowRef(false) // 自身写入 DOM 期间暂停防篡改观察，避免自触发重绘
const gapX = computed(() => props.gap?.[0] ?? 100)
const gapY = computed(() => props.gap?.[1] ?? 100)
const gapXCenter = computed(() => gapX.value / 2)
const gapYCenter = computed(() => gapY.value / 2)
const offsetLeft = computed(() => props.offset?.[0] ?? gapXCenter.value)
const offsetTop = computed(() => props.offset?.[1] ?? gapYCenter.value)
// 平行布局画布为 1 个单元格、交替布局为 2 × 2 个（对角两格绘制图案）；非法 layout 值按交替布局兜底
const BaseSize = computed(() => (props.layout === 'parallel' ? 1 : 2))
const markStyle = computed(() => {
  const markStyle: CSSProperties = {
    zIndex: props.zIndex,
    position: props.fullscreen ? 'fixed' : 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    backgroundRepeat: 'repeat'
  }
  // 偏移为正时把水印层整体内缩并交出背景偏移，避免平铺图案在容器左/上边缘被截断
  let positionLeft = offsetLeft.value - gapXCenter.value
  let positionTop = offsetTop.value - gapYCenter.value
  if (positionLeft > 0) {
    markStyle.left = `${positionLeft}px`
    markStyle.width = `calc(100% - ${positionLeft}px)`
    positionLeft = 0
  }
  if (positionTop > 0) {
    markStyle.top = `${positionTop}px`
    markStyle.height = `calc(100% - ${positionTop}px)`
    positionTop = 0
  }
  markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`
  return markStyle
})
watch(
  // 主题变化（含明暗切换）与 props 变化都要重绘
  () => [props, resolvedTextColor.value],
  () => {
    renderWatermark()
  },
  {
    deep: true, // 强制转成深层侦听器
    flush: 'post' // 在侦听器回调中访问被 Vue 更新之后的 DOM
  }
)
let isUnmounted = false
onMounted(() => {
  renderWatermark()
  // 自定义字体仍在加载时首帧量到的是回退字体宽度，就绪后补一次重绘校正单元格尺寸
  if (typeof document !== 'undefined' && document.fonts?.status === 'loading') {
    document.fonts.ready.then(() => {
      if (!isUnmounted) {
        renderWatermark()
      }
    })
  }
})
onBeforeUnmount(() => {
  isUnmounted = true
  destroyWatermark()
})
// 防止用户修改/隐藏水印：两个观察者各管一件事，避免对整个容器（全屏时是整个文档）做 subtree + attributes 全量监听
// 观察目标必须随 fullscreen 变化重建：commitWatermark 用 append() 移动同一个水印节点，
// 目标若在 setup 阶段被固化，切到全屏后节点搬到 <html> 下，观察者仍盯旧节点会导致防篡改失效
const observeTarget = computed(() => markParent.value ?? containerRef.value)
useMutationObserver(observeTarget, onMutate, { childList: true })
useMutationObserver(watermarkRef, onMutate, { attributes: true, attributeFilter: ['style', 'class'] })
function onMutate(mutations: MutationRecord[]) {
  if (stopObservation.value) {
    return
  }
  // 一批变更只需重建一次，避免同批次多条记录触发多次绘制
  if (!mutations.some((mutation) => reRendering(mutation, watermarkRef.value))) {
    return
  }
  destroyWatermark()
  renderWatermark()
}
function destroyWatermark() {
  if (watermarkRef.value) {
    watermarkRef.value.remove()
    watermarkRef.value = undefined
  }
}
/**
 * 水印挂载点：
 * - 非全屏 → 组件自身容器（局部水印，随所在容器滚动）；
 * - 全屏 → `<html>` + `position: fixed`，始终钉住视口。
 *
 * 挂到 `<html>` 而非 body：`position: fixed` 的包含块会被祖先的 transform / filter 改写，
 * 脱离 body 可保证定位基准恒为视口。全屏水印不覆盖 `<body>` 之外的布局区域，也因此天然盖住侧栏等固定区域。
 */
function resolveMarkParent(): HTMLElement | null {
  return props.fullscreen ? htmlRef.value : containerRef.value
}
function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}
// 由 camelCase 转为 CSS 属性名（zIndex → z-index），用于拼装 style 字符串
function getStyleStr(style: CSSProperties): string {
  return Object.keys(style)
    .map((key) => `${toLowercaseSeparator(key)}: ${String(style[key as keyof CSSProperties])};`)
    .join(' ')
}
/**
 * 文字水印的单元格宽高：默认按内容测量（图片水印不走这里，见 resolveImageMarkSize）。
 */
function getTextMarkSize(ctx: CanvasRenderingContext2D) {
  let defaultWidth = 120
  let defaultHeight = 64
  const { content, width, height } = props
  const fontSize = Number(props.textStyle.fontSize ?? 16)
  const lineHeight = resolveLineHeight(fontSize)
  if (ctx.measureText) {
    // 空内容不参与测量：measureText(undefined) 量的是字符串 "undefined" 的宽度，会把单元格撑大
    const contents = (Array.isArray(content) ? content : [content]).filter((item): item is string => Boolean(item))
    if (contents.length) {
      ctx.font = buildFont(fontSize, lineHeight)
      defaultWidth = Math.ceil(Math.max(...contents.map((item) => ctx.measureText(item).width)))
      // 文本块高度 = 首行字高 + (行数 - 1) × 行高；行高与绘制共用 resolveLineHeight，避免高度与绘制错位
      defaultHeight = fontSize + (contents.length - 1) * lineHeight
    }
  }
  return [width ?? defaultWidth, height ?? defaultHeight] as const
}
/**
 * 多行文本的行高（px，相邻两行文本的距离）：显式配置优先，默认按字号等比（1.2 倍，约等于 CSS 的 normal）。
 * 按比例而非固定增量，字号变大时行间才不会被挤在一起；非有限值回落默认值，否则行坐标为 NaN、整块水印会静默消失。
 */
function resolveLineHeight(fontSize: number) {
  const lineHeight = props.textStyle.lineHeight
  return typeof lineHeight === 'number' && Number.isFinite(lineHeight) ? lineHeight : Math.round(fontSize * 1.2)
}
/**
 * 测量与绘制共用同一 font 串：fontVariant / fontWeight / fontStyle 都会改变字宽，
 * 两处分别拼装会让单元格尺寸与实际绘制错位（small-caps 比同字号常规字形宽约 5%）。
 */
function buildFont(fontSize: number, lineHeight: number) {
  const {
    fontWeight = 'normal',
    fontFamily = 'sans-serif',
    fontStyle = 'normal',
    fontVariant = 'normal'
  } = props.textStyle
  return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px/${lineHeight}px ${fontFamily}`
}
/**
 * 图片水印的单元格宽高：显式指定优先，缺失的一边按原图比例推算，
 * 两边都缺时等比缩放到默认单元格（120 × 64）内，避免任意比例的图片被拉伸变形。
 */
function resolveImageMarkSize(naturalWidth: number, naturalHeight: number) {
  const { width, height } = props
  if (width && height) {
    return { width, height }
  }
  if (!naturalWidth || !naturalHeight) {
    return { width: width ?? 120, height: height ?? 64 }
  }
  const aspectRatio = naturalHeight / naturalWidth
  if (width) {
    return { width, height: Math.round(width * aspectRatio) }
  }
  if (height) {
    return { width: Math.round(height / aspectRatio), height }
  }
  const scale = Math.min(120 / naturalWidth, 64 / naturalHeight)
  return { width: Math.round(naturalWidth * scale), height: Math.round(naturalHeight * scale) }
}
/**
 * 单元格几何：由单元格宽高推出画布位图尺寸、两格的绘制原点与旋转中心。
 * 交替布局的第二格整体错开一个单元格（画布是 2 × 2 个单元格）。
 */
function getCellGeometry(markWidth: number, markHeight: number) {
  const ratio = getPixelRatio()
  const canvasWidth = (gapX.value + markWidth) * ratio
  const canvasHeight = (gapY.value + markHeight) * ratio
  const drawX = (gapX.value * ratio) / 2
  const drawY = (gapY.value * ratio) / 2
  const drawWidth = markWidth * ratio
  const drawHeight = markHeight * ratio
  const rotateX = (drawWidth + gapX.value * ratio) / 2
  const rotateY = (drawHeight + gapY.value * ratio) / 2
  return {
    bitmapWidth: Math.round(canvasWidth * BaseSize.value),
    bitmapHeight: Math.round(canvasHeight * BaseSize.value),
    drawX,
    drawY,
    drawWidth,
    drawHeight,
    rotateX,
    rotateY,
    alternateDrawX: drawX + canvasWidth,
    alternateDrawY: drawY + canvasHeight,
    alternateRotateX: rotateX + canvasWidth,
    alternateRotateY: rotateY + canvasHeight
  }
}
// 当前显示设备的物理像素分辨率与 CSS 像素分辨率之比
function getPixelRatio() {
  return window.devicePixelRatio || 1
}
function fillTexts(ctx: CanvasRenderingContext2D, drawX: number, drawY: number, drawWidth: number) {
  const ratio = getPixelRatio()
  const content = props.content
  const fontSize = Number(props.textStyle.fontSize ?? 16)
  const textAlign = props.textStyle.textAlign ?? 'center'
  const color = resolvedTextColor.value
  const lineHeight = resolveLineHeight(fontSize)
  ctx.font = buildFont(fontSize * ratio, lineHeight * ratio)
  ctx.fillStyle = color
  ctx.globalAlpha = 1 // canvas 复用：清掉图片水印可能留下的透明度
  // 逐行按自身宽度算偏移，三档对齐共用一套坐标（不同字号/字号比例下都不依赖 translate）
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  const contents = Array.isArray(content) ? content : [content]
  contents?.forEach((item, index) => {
    const text = item ?? ''
    const lineWidth = ctx.measureText(text).width
    let alignOffset = 0
    if (textAlign === 'center') {
      alignOffset = (drawWidth - lineWidth) / 2
    } else if (textAlign === 'right') {
      alignOffset = drawWidth - lineWidth
    }
    ctx.fillText(text, drawX + alignOffset, drawY + index * lineHeight * ratio)
  })
}
// 复用一个 canvas：每次重绘都新建会持续分配后备缓冲区并产生 GC 压力
let canvasEl: HTMLCanvasElement | null = null
// 重绘序号：图片是异步加载的，靠它丢弃已被后续重绘取代的回调
let renderToken = 0
/**
 * 取绘制用 canvas 并按需调整后备缓冲区尺寸；尺寸不变时只清空位图。
 * 重设 width 会重建缓冲区（比清空更贵），且会重置上下文状态。
 */
function acquireCanvas(bitmapWidth: number, bitmapHeight: number, ctx: CanvasRenderingContext2D) {
  const canvas = canvasEl ?? (canvasEl = document.createElement('canvas'))
  if (canvas.width === bitmapWidth && canvas.height === bitmapHeight) {
    // 上一轮可能留下未还原的变换（图片在绘制途中被下一次重绘取代），先复位再清空
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, bitmapWidth, bitmapHeight)
  } else {
    canvas.width = bitmapWidth
    canvas.height = bitmapHeight
  }
  return canvas
}
function renderWatermark() {
  if (!canvasEl) {
    canvasEl = document.createElement('canvas')
  }
  const ctx = canvasEl.getContext('2d')
  if (!ctx) {
    return
  }
  const token = ++renderToken
  const image = props.image
  const rotate = props.rotate ?? -22
  // 两次绘制各自 save / restore：canvas 是复用的，漏掉 restore 会让变换与透明度在重绘之间累积
  if (image) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'
    img.onload = () => {
      // 拖动 rotate 等高频操作会排队多个 onload，后到的旧回调不能再覆盖新水印
      if (token !== renderToken) {
        return
      }
      // 单元格尺寸依赖原图比例，只能在加载完成后才确定
      const { width, height } = resolveImageMarkSize(img.naturalWidth, img.naturalHeight)
      const cell = getCellGeometry(width, height)
      const canvas = acquireCanvas(cell.bitmapWidth, cell.bitmapHeight, ctx)
      ctx.save()
      ctx.globalAlpha = props.imageOpacity ?? 1
      rotateWatermark(ctx, cell.rotateX, cell.rotateY, rotate)
      ctx.drawImage(img, cell.drawX, cell.drawY, cell.drawWidth, cell.drawHeight)
      ctx.restore()
      ctx.save()
      ctx.globalAlpha = props.imageOpacity ?? 1
      rotateWatermark(ctx, cell.alternateRotateX, cell.alternateRotateY, rotate)
      ctx.drawImage(img, cell.alternateDrawX, cell.alternateDrawY, cell.drawWidth, cell.drawHeight)
      ctx.restore()
      commitWatermark(canvas, width)
    }
    img.onerror = () => {
      // 图片未返回 CORS 响应头时浏览器直接判为加载失败（onload 不触发），否则表现为水印静默消失
      log('debug', 'Watermark', '图片加载失败：请确认图片地址可访问，且服务端返回 Access-Control-Allow-Origin 响应头')
    }
    img.src = image
    return
  }
  const [markWidth, markHeight] = getTextMarkSize(ctx)
  const cell = getCellGeometry(markWidth, markHeight)
  const canvas = acquireCanvas(cell.bitmapWidth, cell.bitmapHeight, ctx)
  ctx.save()
  rotateWatermark(ctx, cell.rotateX, cell.rotateY, rotate)
  fillTexts(ctx, cell.drawX, cell.drawY, cell.drawWidth)
  ctx.restore()
  ctx.save()
  rotateWatermark(ctx, cell.alternateRotateX, cell.alternateRotateY, rotate)
  fillTexts(ctx, cell.alternateDrawX, cell.alternateDrawY, cell.drawWidth)
  ctx.restore()
  commitWatermark(canvas, markWidth)
}
function commitWatermark(canvas: HTMLCanvasElement, markWidth: number) {
  const parent = resolveMarkParent()
  if (!parent) {
    return
  }
  let dataUrl = ''
  try {
    dataUrl = canvas.toDataURL()
  } catch (error) {
    // 画布被跨域图片污染时无法导出位图（此时整块水印都不显示），给出可定位的提示
    log('error', 'Watermark', '画布被跨域图片污染，无法生成水印图案：请为图片配置 CORS 响应头', error)
    return
  }
  stopObservation.value = true
  let element = watermarkRef.value
  if (!element) {
    element = document.createElement('div')
    element.setAttribute('aria-hidden', 'true') // 纯装饰层，对辅助技术隐藏
    watermarkRef.value = element
  }
  markParent.value = parent
  // 整体替换 style（而非逐项赋值）：篡改者写入的 display / opacity 等属性才能被一并清除
  element.setAttribute(
    'style',
    getStyleStr({
      ...markStyle.value,
      backgroundImage: `url('${dataUrl}')`,
      backgroundSize: `${(gapX.value + markWidth) * BaseSize.value}px`
    })
  )
  parent.append(element)
  // 本次写入会触发观察者，等 MutationObserver 本轮记录投递完再恢复监听
  setTimeout(() => {
    stopObservation.value = false
  })
}
// 以单元格中心为原点旋转
function rotateWatermark(ctx: CanvasRenderingContext2D, rotateX: number, rotateY: number, rotate: number) {
  ctx.translate(rotateX, rotateY)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  ctx.translate(-rotateX, -rotateY)
}
// 是否需要重建水印：节点被移除，或节点自身的 style / class 被改写
function reRendering(mutation: MutationRecord, watermarkElement?: HTMLElement) {
  let flag = false
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some((node) => node === watermarkElement)
  }
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true
  }
  return flag
}
</script>
<template>
  <div ref="containerRef" class="watermark-wrap" style="position: relative">
    <slot></slot>
  </div>
</template>
