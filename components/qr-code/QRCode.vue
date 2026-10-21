<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, shallowRef } from 'vue'
import type { CSSProperties } from 'vue'
import qrcodegen from './qrcodegen'
import Spin from 'components/spin'
import Button from 'components/button'
import { log } from 'components/utils'

export interface Props {
  value?: string // 需要编码为二维码的文本或地址
  title?: string // 无障碍文本：svg 类型输出为 <title>，canvas / image 类型输出为 aria-label / alt
  type?: 'svg' | 'canvas' | 'image' // 渲染类型：矢量 / 位图 / 图片
  size?: number // 二维码整体大小（含内边距与外边框），单位 px
  padding?: number // 容器内边距，二维码绘制区为 size 减去两侧内边距与外边框
  color?: string // 二维码前景色，CSS 颜色值
  bgColor?: string // 二维码背景色，CSS 颜色值
  icon?: string // 二维码中央图标的地址
  iconSize?: number // 中央图标的大小，单位 px
  iconBackgroundColor?: string // 中央图标的底色，用于压盖点阵、凸显图标
  iconBorderRadius?: number // 中央图标底色的圆角，单位 px
  bordered?: boolean // 是否展示外边框
  borderColor?: string // 外边框颜色
  status?: 'active' | 'expired' | 'loading' | 'scanned' // 二维码状态
  expiredText?: string // status 为 expired 时的提示文案
  refreshText?: string // status 为 expired 时刷新按钮的文案
  scannedText?: string // status 为 scanned 时的提示文案
  errorLevel?: 'L' | 'M' | 'Q' | 'H' // 纠错等级（最低保障，容量允许时会自动提升到更高等级）
  scale?: number // 每个二维码点占用的最小像素数（屏幕像素密度更高时自动提升），同时决定导出图片的分辨率
}
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  title: undefined,
  type: 'svg',
  size: 160,
  padding: 12,
  color: '#000',
  bgColor: '#FFF',
  icon: undefined,
  iconSize: 40,
  iconBackgroundColor: '#FFF',
  iconBorderRadius: 4,
  bordered: true,
  borderColor: 'var(--va-border-split-color)',
  status: 'active',
  expiredText: '二维码已过期',
  refreshText: '点击刷新',
  scannedText: '已扫描',
  // 默认 M：内容较少时编码器仍会自动提升实际纠错等级
  errorLevel: 'M',
  scale: 8
})
const emit = defineEmits<{
  (e: 'refresh', event: MouseEvent): void
}>()
/** 外边框宽度：边框常驻，bordered 为 false 时仅隐去颜色，绘制区两侧恒定占用 1px */
const BORDER_WIDTH = 1
/** 纠错等级映射：传入等级为最低保障，容量允许时编码器会自动提升到更高等级 */
const ERROR_LEVEL_MAP = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH
}
const canvasRef = ref<HTMLCanvasElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const imageDataURL = ref('')
const iconImage = shallowRef<HTMLImageElement | null>(null)
/** 二维码绘制区边长（px），扣除容器内边距与外边框 */
const innerSize = computed(() => Math.max(props.size - props.padding * 2 - BORDER_WIDTH * 2, 0))
/** 二维码模块矩阵：size 为每边模块数，data 按行优先存储明暗（1 为暗点） */
const modules = computed(() => {
  if (!props.value) return null
  try {
    const qr = qrcodegen.QrCode.encodeText(props.value, ERROR_LEVEL_MAP[props.errorLevel])
    const numCells = qr.size
    const rows = qr.getModules()
    const data = new Uint8Array(numCells * numCells)
    for (let y = 0; y < numCells; y++) {
      const row = rows[y] ?? []
      for (let x = 0; x < numCells; x++) {
        data[y * numCells + x] = row[x] ? 1 : 0
      }
    }
    return { size: numCells, data }
  } catch (error) {
    // 内容超出二维码容量或纠错等级非法时降级为空渲染，避免 computed 抛错冒泡至渲染层导致整树崩溃
    log('error', 'QRCode', '二维码编码失败', error)
    return null
  }
})
/** 每边模块数，供 svg 模板使用 */
const moduleCount = computed(() => modules.value?.size ?? 0)
/** svg 背景路径（整块底色） */
const backgroundPath = computed(() => `M0 0h${moduleCount.value}v${moduleCount.value}H0z`)
/**
 * 图标覆盖的模块矩形（半开区间）：图标区域的点阵需挖空，
 * 否则图标压住点阵会显著降低识别率；由图标显示尺寸换算到模块坐标并居中
 */
const iconExcavation = computed(() => {
  if (!props.icon || !modules.value || !innerSize.value) return null
  const numCells = modules.value.size
  const covered = (props.iconSize / innerSize.value) * numCells
  const start = Math.max(Math.floor((numCells - covered) / 2), 0)
  const end = Math.min(Math.ceil((numCells + covered) / 2), numCells)
  return end > start ? { start, end } : null
})
/** 前景暗点路径（合并同行的连续暗点为单条子路径，大幅压缩节点数） */
const foregroundPath = computed(() => {
  const matrix = modules.value
  if (!matrix) return ''
  const { size: numCells, data } = matrix
  const box = iconExcavation.value
  const ops: string[] = []
  for (let y = 0; y < numCells; y++) {
    let start: number | null = null
    for (let x = 0; x < numCells; x++) {
      const inExcavation = box !== null && y >= box.start && y < box.end && x >= box.start && x < box.end
      const dark = Boolean(data[y * numCells + x]) && !inExcavation
      if (dark && start === null) {
        start = x
      } else if (!dark && start !== null) {
        ops.push(`M${start} ${y}h${x - start}v1H${start}z`)
        start = null
      }
    }
    if (start !== null) ops.push(`M${start} ${y}h${numCells - start}v1H${start}z`)
  }
  return ops.join('')
})
const qrcodeStyle = computed(() => {
  const style: CSSProperties = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    padding: `${props.padding}px`,
    backgroundColor: `${props.bgColor}`,
    // 边框常驻、仅切换颜色，避免 bordered 变化时绘制区尺寸跳动
    borderColor: props.bordered ? `${props.borderColor}` : 'transparent'
  }
  return style
})
/**
 * 图标几何信息（模块坐标系）：底色块的位置尺寸与圆角，
 * 以及保持原始宽高比并在底色块内居中后的图片绘制矩形；canvas 与 svg 共用同一份
 */
const iconPlacement = computed(() => {
  const icon = iconImage.value
  const numCells = modules.value?.size ?? 0
  if (!icon || !numCells || !innerSize.value) return null
  const ratio = numCells / innerSize.value
  const side = props.iconSize * ratio
  const radius = props.iconBorderRadius * ratio
  const x = (numCells - side) / 2
  const y = (numCells - side) / 2
  const aspect = icon.height ? icon.width / icon.height : 1
  const width = aspect >= 1 ? side : side * aspect
  const height = aspect <= 1 ? side : side / aspect
  return {
    icon,
    side,
    radius,
    x,
    y,
    width,
    height,
    imageX: x + (side - width) / 2,
    imageY: y + (side - height) / 2
  }
})
/**
 * 每个二维码点的绘制像素数：以 scale 为下限，
 * 并按绘制区在当前屏幕像素密度下的实际所需自动提升，避免高分辨率屏下位图被放大而发虚
 */
const unitPixels = computed(() => {
  const numCells = modules.value?.size ?? 0
  const base = Math.max(Math.floor(props.scale), 1)
  if (!numCells || !innerSize.value) return base
  const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1
  return Math.max(base, Math.ceil((innerSize.value * dpr) / numCells))
})
/** 将二维码绘制到目标 canvas：屏幕渲染与导出共用，保证「所见即所得」 */
const paint = (canvas: HTMLCanvasElement) => {
  const matrix = modules.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  // 无编码内容（value 为空或编码失败）时清空画布，避免残留上一次的二维码
  if (!matrix) {
    canvas.width = 0
    canvas.height = 0
    return
  }
  const numCells = matrix.size
  const unit = unitPixels.value
  const pixelSize = numCells * unit
  canvas.width = pixelSize
  canvas.height = pixelSize
  const { data } = matrix
  const box = iconExcavation.value
  ctx.clearRect(0, 0, pixelSize, pixelSize)
  ctx.fillStyle = props.bgColor
  ctx.fillRect(0, 0, pixelSize, pixelSize)
  ctx.fillStyle = props.color
  for (let y = 0; y < numCells; y++) {
    for (let x = 0; x < numCells; x++) {
      const inExcavation = box !== null && y >= box.start && y < box.end && x >= box.start && x < box.end
      if (data[y * numCells + x] && !inExcavation) ctx.fillRect(x * unit, y * unit, unit, unit)
    }
  }
  const placement = iconPlacement.value
  if (!placement) return
  // 图标底色：圆角块压盖点阵；部分环境不支持 roundRect 时退化为直角块
  const { icon, side, radius, x, y, width, height, imageX, imageY } = placement
  ctx.fillStyle = props.iconBackgroundColor
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x * unit, y * unit, side * unit, side * unit, radius * unit)
    ctx.fill()
  } else {
    ctx.fillRect(x * unit, y * unit, side * unit, side * unit)
  }
  ctx.drawImage(icon, imageX * unit, imageY * unit, width * unit, height * unit)
}
const renderCanvas = () => {
  const canvas = canvasRef.value
  if (canvas) paint(canvas)
}
const renderImage = () => {
  // 无编码内容时回落为空 DataURL，与 svg 的空渲染保持一致
  if (!modules.value) {
    imageDataURL.value = ''
    return
  }
  const canvas = document.createElement('canvas')
  paint(canvas)
  imageDataURL.value = canvas.toDataURL('image/png')
}
/**
 * 统一绘制入口：canvas 与 image 类型共用同一份模块矩阵与图标信息
 * （svg 类型由模板声明式渲染，服务端也不依赖挂载）。
 * 绘制失败（如色值非法）时保留既有内容并通过控制台告警，不静默失败也不中断组件
 */
const renderQRCode = () => {
  // svg 由模板声明式渲染；canvas / image 在无内容时走清空分支，与 svg 的空渲染保持一致
  if (props.type === 'svg') return
  try {
    if (props.type === 'canvas') {
      renderCanvas()
    } else {
      renderImage()
    }
  } catch (error) {
    log('error', 'QRCode', '二维码绘制失败', error)
  }
}
// 绘制依赖由 renderQRCode 内部读取的响应式数据自动追踪；type 需显式读取以覆盖类型切换
watchEffect(
  () => {
    void props.type
    renderQRCode()
  },
  { flush: 'post' }
)
if (props.icon && props.errorLevel === 'L') {
  log('warn', 'QRCode', '同时使用 icon 与 L 纠错等级会明显降低识别率，建议将 errorLevel 设为 M 及以上')
}
onMounted(() => {
  renderQRCode()
  if (imageRef.value) imageRef.value.addEventListener('load', renderQRCode)
})
// 图标需先加载完成才能绘制与挖空：以加载态触发重绘，并在地址变更时中止上一次加载
// 服务端无 Image 全局，跳过加载（图标节点由客户端挂载后补齐，与首帧渲染一致，不会引起水合失配）
watchEffect((onCleanup) => {
  const src = props.icon
  if (!src || typeof window === 'undefined') {
    iconImage.value = null
    return
  }
  let aborted = false
  const image = new Image()
  image.onload = () => {
    if (aborted) return
    iconImage.value = image
    renderQRCode()
  }
  image.onerror = () => {
    if (aborted) return
    iconImage.value = null
    renderQRCode()
  }
  image.src = src
  onCleanup(() => {
    aborted = true
  })
})
/** 点击刷新：仅转发事件，状态由使用方控制 */
const onRefresh = (event: MouseEvent) => {
  emit('refresh', event)
}
defineExpose({
  /** 导出当前二维码图片（dataURL），内容与屏幕渲染一致（含中央图标）；可传入 MIME 类型与质量参数 */
  toDataURL: (type = 'image/png', quality?: number): string => {
    if (!props.value || !modules.value) return ''
    try {
      const canvas = document.createElement('canvas')
      paint(canvas)
      return canvas.toDataURL(type, quality)
    } catch (error) {
      log('error', 'QRCode', '二维码导出失败', error)
      return ''
    }
  }
})
</script>
<template>
  <div class="qr-code-wrap" :style="qrcodeStyle">
    <svg
      v-if="type === 'svg'"
      class="qr-code-svg"
      :viewBox="`0 0 ${moduleCount} ${moduleCount}`"
      width="100%"
      height="100%"
      shape-rendering="crispEdges"
      role="img"
      :aria-label="title"
    >
      <title v-if="title">{{ title }}</title>
      <path :fill="bgColor" :d="backgroundPath" />
      <path :fill="color" :d="foregroundPath" />
      <template v-if="iconPlacement">
        <rect
          :fill="iconBackgroundColor"
          :x="iconPlacement.x"
          :y="iconPlacement.y"
          :width="iconPlacement.side"
          :height="iconPlacement.side"
          :rx="iconPlacement.radius"
          :ry="iconPlacement.radius"
        />
        <image
          :href="iconPlacement.icon.src"
          :x="iconPlacement.imageX"
          :y="iconPlacement.imageY"
          :width="iconPlacement.width"
          :height="iconPlacement.height"
          preserveAspectRatio="none"
        />
      </template>
    </svg>
    <canvas
      v-else-if="type === 'canvas'"
      ref="canvasRef"
      class="qr-code-canvas"
      role="img"
      :aria-label="title"
    ></canvas>
    <img v-else ref="imageRef" :src="imageDataURL" class="qr-code-image" :alt="title || 'QR Code'" />
    <div v-if="status !== 'active'" class="qr-code-mask">
      <Spin v-if="status === 'loading'" />
      <template v-else-if="status === 'expired'">
        <p class="qr-code-expired">{{ expiredText }}</p>
        <Button type="link" @click="onRefresh">
          <template #icon>
            <svg class="qr-code-refresh-icon" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M12.6 1.6v3h-3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
          {{ refreshText }}
        </Button>
      </template>
      <p v-else class="qr-code-scanned">{{ scannedText }}</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.qr-code-wrap {
  // 状态遮罩配色：底色作用于整个遮罩（可为半透明色，让二维码在遮罩下隐约透出），文案色仅作用于 expiredText / scannedText
  // （loading 指示符与「点击刷新」按钮为 Spin / Button，沿用各自主题色）
  // 变量声明在组件根元素上，祖先元素的同名声明会被遮蔽，覆盖需作用于组件自身（如内联样式）
  // 遮罩底取容器色（浅色为白、暗色为深灰容器色），文案用正文色 —— 两者必须同源，否则暗色下会出现「白底白字」
  --qr-code-mask-bg-color: var(--va-bg-container-color);
  --qr-code-mask-text-color: var(--va-text-color-1);
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // 边框常驻（颜色由内联样式在透明间切换），保证 bordered 变化时绘制区尺寸不跳动
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  overflow: hidden;
  .qr-code-svg,
  .qr-code-canvas,
  .qr-code-image {
    display: block;
    width: 100%;
    height: 100%;
  }
  .qr-code-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--qr-code-mask-text-color);
    text-align: center;
    background: var(--qr-code-mask-bg-color);
    .qr-code-expired,
    .qr-code-scanned {
      margin: 0;
      color: inherit;
    }
    .qr-code-expired {
      margin-bottom: 4px;
    }
  }
  .qr-code-refresh-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
