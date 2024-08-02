<script setup lang="ts">
import { shallowRef, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import { useMutationObserver } from '../utils'
interface Props {
  width?: number // 水印的宽度，默认值为 content 自身的宽度
  height?: number // 水印的高度，默认值为 content 自身的高度
  layout?: 'parallel' | 'alternate' // 布局方式：平行布局，交替布局
  rotate?: number // 水印绘制时，旋转的角度，单位 deg
  zIndex?: number // 追加的水印元素的 z-index
  image?: string // 图片源，建议使用 2 倍或 3 倍图，优先级高于文字
  content?: string | string[] // 水印文字内容
  fullscreen?: boolean // 是否展示全屏
  color?: string // 字体颜色
  fontSize?: number // 字体大小
  fontWeight?: 'normal' | 'light' | 'weight' | number // 	字体粗细
  fontFamily?: string // 字体类型
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique' // 字体样式
  gap?: [number, number] // 水印之间的间距
  offset?: [number, number] // 水印距离容器左上角的偏移量，默认为 gap/2
}
const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  layout: 'alternate',
  rotate: -22,
  zIndex: 90,
  image: undefined,
  content: '',
  fullscreen: false,
  color: 'rgba(0,0,0,.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  gap: () => [100, 100],
  offset: () => [50, 50]
})
const FontGap = 3
// 和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。
const containerRef = shallowRef() // ref() 的浅层作用形式
const watermarkRef = shallowRef()
const htmlRef = shallowRef(document.documentElement) // <html></html>元素
const stopObservation = shallowRef(false)
const gapX = computed(() => props.gap?.[0] ?? 100)
const gapY = computed(() => props.gap?.[1] ?? 100)
const gapXCenter = computed(() => gapX.value / 2)
const gapYCenter = computed(() => gapY.value / 2)
const offsetLeft = computed(() => props.offset?.[0] ?? gapXCenter.value)
const offsetTop = computed(() => props.offset?.[1] ?? gapYCenter.value)
const BaseSize = computed(() => {
  // Base size of the canvas, 1 for parallel layout and 2 for alternate layout
  const layoutMap = {
    parallel: 1,
    alternate: 2
  }
  return layoutMap[props.layout]
})
const markStyle = computed(() => {
  const markStyle: CSSProperties = {
    zIndex: props.zIndex ?? 9,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    backgroundRepeat: 'repeat'
  }
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
  () => [props],
  () => {
    renderWatermark()
  },
  {
    deep: true, // 强制转成深层侦听器
    flush: 'post' // 在侦听器回调中访问被 Vue 更新之后的 DOM
  }
)
onMounted(() => {
  renderWatermark()
})
onBeforeUnmount(() => {
  destroyWatermark()
})
// 防止用户修改/隐藏水印
useMutationObserver(props.fullscreen ? htmlRef : containerRef, onMutate, {
  subtree: true, // 监听以 target 为根节点的整个子树
  childList: true, // 监听 target 节点中发生的节点的新增与删除
  attributes: true, // 观察所有监听的节点属性值的变化
  attributeFilter: ['style', 'class'] // 声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
})
function onMutate(mutations: MutationRecord[]) {
  if (!stopObservation.value) {
    mutations.forEach((mutation: MutationRecord) => {
      if (reRendering(mutation, watermarkRef.value)) {
        destroyWatermark()
        renderWatermark()
      }
    })
  }
}
function destroyWatermark() {
  if (watermarkRef.value) {
    watermarkRef.value.remove()
    watermarkRef.value = undefined
  }
}
function appendWatermark(base64Url: string, markWidth: number) {
  if (containerRef.value && watermarkRef.value) {
    stopObservation.value = true
    watermarkRef.value.setAttribute(
      'style',
      getStyleStr({
        ...markStyle.value,
        backgroundImage: `url('${base64Url}')`,
        backgroundSize: `${(gapX.value + markWidth) * BaseSize.value}px`
      })
    )
    if (props.fullscreen) {
      htmlRef.value.setAttribute('style', 'position: relative')
      htmlRef.value.append(watermarkRef.value)
    } else {
      containerRef.value?.append(watermarkRef.value)
    }
    setTimeout(() => {
      stopObservation.value = false
    })
  }
}
// converting camel-cased strings to be lowercase and link it with Separator
function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}
function getStyleStr(style: CSSProperties): string {
  return Object.keys(style)
    .map((key: any) => `${toLowercaseSeparator(key)}: ${style[key]};`)
    .join(' ')
}
/*
  Get the width and height of the watermark. The default values are as follows
  Image: [120, 64]; Content: It's calculated by content
*/
function getMarkSize(ctx: CanvasRenderingContext2D) {
  let defaultWidth = 120
  let defaultHeight = 64
  const content = props.content
  const image = props.image
  const width = props.width
  const height = props.height
  const fontSize = props.fontSize
  const fontFamily = props.fontFamily
  if (!image && ctx.measureText) {
    ctx.font = `${Number(fontSize)}px ${fontFamily}`
    const contents = Array.isArray(content) ? content : [content]
    const widths = contents.map((item) => ctx.measureText(item!).width)
    defaultWidth = Math.ceil(Math.max(...widths))
    defaultHeight = Number(fontSize) * contents.length + (contents.length - 1) * FontGap
  }
  return [width ?? defaultWidth, height ?? defaultHeight] as const
}
// Returns the ratio of the device's physical pixel resolution to the css pixel resolution
function getPixelRatio() {
  return window.devicePixelRatio || 1
}
function fillTexts(ctx: CanvasRenderingContext2D, drawX: number, drawY: number, drawWidth: number, drawHeight: number) {
  const ratio = getPixelRatio()
  const content = props.content
  const fontSize = props.fontSize
  const fontWeight = props.fontWeight
  const fontFamily = props.fontFamily
  const fontStyle = props.fontStyle
  const color = props.color
  const mergedFontSize = Number(fontSize) * ratio
  ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.translate(drawWidth / 2, 0)
  const contents = Array.isArray(content) ? content : [content]
  contents?.forEach((item, index) => {
    ctx.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio))
  })
}
function renderWatermark() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const image = props.image
  const rotate = props.rotate ?? -22
  if (ctx) {
    if (!watermarkRef.value) {
      watermarkRef.value = document.createElement('div')
    }
    const ratio = getPixelRatio()
    const [markWidth, markHeight] = getMarkSize(ctx)
    const canvasWidth = (gapX.value + markWidth) * ratio
    const canvasHeight = (gapY.value + markHeight) * ratio
    canvas.setAttribute('width', `${canvasWidth * BaseSize.value}px`)
    canvas.setAttribute('height', `${canvasHeight * BaseSize.value}px`)

    const drawX = (gapX.value * ratio) / 2
    const drawY = (gapY.value * ratio) / 2
    const drawWidth = markWidth * ratio
    const drawHeight = markHeight * ratio
    const rotateX = (drawWidth + gapX.value * ratio) / 2
    const rotateY = (drawHeight + gapY.value * ratio) / 2
    /** Alternate drawing parameters */
    const alternateDrawX = drawX + canvasWidth
    const alternateDrawY = drawY + canvasHeight
    const alternateRotateX = rotateX + canvasWidth
    const alternateRotateY = rotateY + canvasHeight
    ctx.save()
    rotateWatermark(ctx, rotateX, rotateY, rotate)
    if (image) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
        /** Draw interleaved pictures after rotation */
        ctx.restore()
        rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate)
        ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight)
        appendWatermark(canvas.toDataURL(), markWidth)
      }
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'
      img.src = image
    } else {
      fillTexts(ctx, drawX, drawY, drawWidth, drawHeight)
      /** Fill the interleaved text after rotation */
      ctx.restore()
      rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate)
      fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight)
      appendWatermark(canvas.toDataURL(), markWidth)
    }
  }
}
// Rotate with the watermark as the center point
function rotateWatermark(ctx: CanvasRenderingContext2D, rotateX: number, rotateY: number, rotate: number) {
  ctx.translate(rotateX, rotateY)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  ctx.translate(-rotateX, -rotateY)
}
// Whether to re-render the watermark
function reRendering(mutation: MutationRecord, watermarkElement?: HTMLElement) {
  let flag = false
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some((node) => node === watermarkElement)
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true
  }
  return flag
}
</script>
<template>
  <div ref="containerRef" style="position: relative">
    <slot></slot>
  </div>
</template>
