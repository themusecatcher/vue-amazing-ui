<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CSSProperties } from 'vue'
import QRCode from 'qrcode'
export interface Props {
  value?: string // 扫描后的文本或地址
  type?: 'svg' | 'canvas' | 'image' // 二维码的渲染类型
  icon?: string // 二维码中图片的地址
  size?: number // 二维码大小，单位 px
  iconSize?: number // 二维码中图片的大小，单位 px
  color?: string // 二维码颜色，Value must be in hex format (十六进制颜色值)
  bgColor?: string // 二维码背景色，Value must be in hex format (十六进制颜色值)
  bordered?: boolean // 是否有边框
  borderColor?: string // 边框颜色
  scale?: number // 缩放因子，每个 black dots 占用多少像素
  /*
    纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。
    通常情况下二维码分为 4 个纠错级别：L级 可纠正约 7% 错误、M级 可纠正约 15% 错误、Q级 可纠正约 25% 错误、H级 可纠正约30% 错误。
    并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。
    当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。
  */
  errorLevel?: 'L' | 'M' | 'Q' | 'H' // 二维码纠错等级
}
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  type: 'svg',
  icon: undefined,
  size: 160,
  iconSize: 40,
  color: '#000',
  bgColor: '#FFF',
  bordered: true,
  borderColor: 'rgba(5, 5, 5, 0.06)',
  scale: 8,
  errorLevel: 'H'
})
const qrcodeSVGRef = ref<HTMLElement | null>(null)
const qrcodeCanvasRef = ref<HTMLElement | null>(null)
const qrcode = ref<HTMLCanvasElement | string>('')
const qrcodeStyle = computed(() => {
  const style: CSSProperties = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    backgroundColor: `${props.bgColor}`,
    borderColor: `${props.borderColor}`
  }
  return style
})
const iconStyle = computed(() => {
  const style: CSSProperties = {
    width: `${props.iconSize}px`,
    height: `${props.iconSize}px`,
    backgroundColor: `${props.bgColor}`
  }
  return style
})
const qrcodeOptions = computed(() => {
  return {
    quality: 1, // number 默认 0.92, 0 <= quality <= 1 仅在 type 为 'image/jpeg' 或 'image/webp' 时有效
    margin: 0, // number 默认 4, 边距大小，单位 px
    scale: props.scale, // number，默认 4, 缩放因子，A value of 1 means 1px per modules (black dots).
    color: {
      dark: props.color, // 像素点颜色
      light: '#00000000' // 背景色
    },
    errorCorrectionLevel: props.errorLevel
  }
})
watch(
  () => [props.value, props.type, qrcodeOptions.value],
  async () => {
    if (props.value) {
      if (props.type === 'svg') {
        qrcode.value = await QRCode.toString(props.value, qrcodeOptions.value)
        qrcodeSVGRef.value!.innerHTML = qrcode.value // !. 非空断言运算符
      } else if (props.type === 'canvas') {
        qrcode.value = await QRCode.toCanvas(props.value, qrcodeOptions.value)
        qrcodeCanvasRef.value?.appendChild(qrcode.value)
      } else {
        qrcode.value = await QRCode.toDataURL(props.value, qrcodeOptions.value)
      }
    }
  },
  {
    immediate: true,
    deep: true,
    flush: 'post'
  }
)
defineExpose({
  getQRCodeImage: () => props.value && QRCode.toDataURL(props.value, qrcodeOptions.value)
})
</script>
<template>
  <div class="m-qrcode" :class="{ 'qrcode-bordered': bordered }" :style="qrcodeStyle">
    <span v-if="type === 'svg'" ref="qrcodeSVGRef" class="qrcode-svg"></span>
    <span v-if="type === 'canvas'" ref="qrcodeCanvasRef" class="qrcode-canvas"></span>
    <img v-if="type === 'image'" :src="qrcode as string" class="qrcode-image" alt="QR Code" />
    <img v-if="icon" :src="icon" :style="iconStyle" class="qrcode-icon" alt="QR Code Icon" />
  </div>
</template>
<style lang="less" scoped>
.m-qrcode {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  overflow: hidden;
  .qrcode-svg,
  .qrcode-canvas,
  .qrcode-image {
    width: 100%;
    height: 100%;
  }
  .qrcode-canvas {
    :deep(canvas) {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .qrcode-icon {
    position: absolute;
    z-index: 1;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.qrcode-bordered {
  border-width: 1px;
  border-style: solid;
}
</style>
