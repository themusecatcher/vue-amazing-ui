<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { VNode } from 'vue'
import { useSlotsExist } from 'components/utils'

// 内置指示符枚举（字符串取值即内置；各形态说明见行尾）
export type BuiltinIndicator =
  | 'dot' // 四点闪烁：四点整体旋转 + 逐点闪烁
  | 'dot-wheel' // 八点轮：八点等距成轮，亮度沿圆周扫过（支持 speed / rotate）
  | 'line-wheel' // 八线轮：八条轮辐等距成轮，亮度沿圆周扫过（支持 speed / rotate）
  | 'ring-circle' // 圆环：缺口圆弧持续旋转
  | 'ring-rail' // 圆环轨道：带底轨的缺口圆弧持续旋转
  | 'dynamic-circle' // 动态圆环：弧长与位置同时变化
  | 'magic-ring' // 翻转双环：内外环绕轴翻面，相差 45° 相位

export type SpinIndicator = BuiltinIndicator | VNode | (() => VNode) | null

export interface Props {
  spinning?: boolean // 是否为加载中状态
  size?: 'small' | 'middle' | 'large' // 加载中尺寸
  fitContent?: boolean // 根节点宽度是否贴合内容宽度（内容比父容器窄时，遮罩与加载效果一起按内容宽度居中）；无内容时不生效
  tip?: string // 描述文案
  delay?: number // 延迟显示加载效果的时间（ms）；0 表示不延迟，可避免请求过快时 loading 一闪而过；仅在显示方向生效，隐藏始终立即
  indicator?: SpinIndicator // 加载指示符：内置枚举（7 种，见 BuiltinIndicator）/ 自定义 VNode 或渲染函数（插槽形态用 #indicator）/ null 不渲染
  color?: string // 指示符颜色；indicator 为 magic-ring 时表示外环颜色
  spinCircleWidth?: number // 圆环宽度（指示符宽度的百分比；magic-ring 收敛到 6～26 以保证两环定位与翻面动效有效）；仅 ring-circle / ring-rail / magic-ring 生效
  spinCirclePercent?: number // 圆环弧长（0～100，圆环周长的百分比）；仅 ring-circle / ring-rail 生效
  ringRailColor?: string // 圆环轨道颜色；仅 ring-rail 生效
  magicRingColor?: string // 内环颜色；仅 magic-ring 生效；未传时取外环色的浅一档（color 无法解析时取主题主色浅一档）
  rotate?: boolean // 出现时是否整体旋转一圈；仅 dot-wheel / line-wheel 生效
  speed?: number // 动画周期（ms），值越小越快：dot-wheel / line-wheel 为亮度扫过一圈、magic-ring 为翻面一圈；仅 dot-wheel / line-wheel / magic-ring 生效
}
// 声明组件插槽类型
export interface SpinSlots {
  tip?: () => VNode[]
  indicator?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'middle',
  fitContent: false,
  tip: undefined,
  delay: 0,
  indicator: 'dot',
  color: undefined,
  spinCircleWidth: undefined,
  spinCirclePercent: 33,
  ringRailColor: 'var(--va-border-color)',
  magicRingColor: undefined,
  rotate: false,
  speed: undefined
})
defineSlots<SpinSlots>()
const slotsExist = useSlotsExist(['tip', 'default', 'indicator'])
// 自定义指示符：优先 #indicator 插槽，其次取 indicator 传入的 VNode / 渲染函数；传 null 表示不渲染
const customIndicator = computed(() => {
  return typeof props.indicator === 'string' ? undefined : props.indicator
})
const showCustomIndicator = computed(() => {
  return slotsExist.indicator || (customIndicator.value !== undefined && customIndicator.value !== null)
})
// 自定义指示符生效时不再产出内置值：否则 #indicator 插槽会与 indicator 的默认值 'dot' 同时渲染
const builtinIndicator = computed<BuiltinIndicator | undefined>(() => {
  if (showCustomIndicator.value) {
    return undefined
  }
  return typeof props.indicator === 'string' ? props.indicator : undefined
})
// 离散点阵族：三者共用同一套几何与动画模型（位置与相位同源于索引，见样式内说明）
const POINT_INDICATORS: readonly BuiltinIndicator[] = ['dot', 'dot-wheel', 'line-wheel']
const isPointIndicator = computed(() => {
  const indicator = builtinIndicator.value
  return indicator !== undefined && POINT_INDICATORS.includes(indicator)
})
// 点阵元素数量：dot 为 4（正方形四角），点轮 / 线轮为 8
const pointCount = computed(() => {
  return builtinIndicator.value === 'dot' ? 4 : 8
})
// 是否叠加「整体旋转」：dot 自身已在整体旋转，故仅点轮 / 线轮支持
const isBoxRotate = computed(() => {
  return props.rotate && (builtinIndicator.value === 'dot-wheel' || builtinIndicator.value === 'line-wheel')
})
// 文案与指示符的间距：dot / dot-wheel 的点阵盒留白大于线阵与圆环，间距单独放宽
const isDotTip = computed(() => {
  return builtinIndicator.value === 'dot' || builtinIndicator.value === 'dot-wheel'
})
// 动画周期（ms）：点轮 / 线轮为亮度扫过一圈、翻转双环为翻面一圈，节奏不同，故不传时按指示符取默认
// （800 / 1500）；下界收敛到 1，避免非正数产出无效的 animation-duration（浏览器静默丢弃，动画停摆）
const speedComputed = computed(() => {
  const speed = props.speed === undefined ? (builtinIndicator.value === 'magic-ring' ? 1500 : 800) : props.speed
  return Math.max(speed, 1)
})
// 圆环宽度是「占指示符宽度的百分比」，需落在 (0, 100) 开区间，否则半径为 0 或负值（path 非法、不渲染）。
// 默认按指示符取：单环（ring-circle / ring-rail）12；翻转双环 13 —— 两环紧贴叠合，自外缘到内洞连穿
// 4 道环宽，同一百分比会让环带明显厚重。翻转双环再收敛到 6～26：下界按最苛刻的 small 档（24px）反推，
// 环宽不足 1.25px 时内环定位反向、侧视最窄处宽度转负（关键帧失效）；上界处内洞直径（直径 - 4 × 环宽 + 2）
// 转负，内环实心化、失去「环」的形态
const circleWidth = computed(() => {
  const width =
    props.spinCircleWidth === undefined ? (builtinIndicator.value === 'magic-ring' ? 13 : 12) : props.spinCircleWidth
  const min = builtinIndicator.value === 'magic-ring' ? 6 : 1
  const max = builtinIndicator.value === 'magic-ring' ? 26 : 99
  return Math.min(Math.max(width, min), max)
})
// 圆环长度是「占圆环周长的百分比」，文档约定 0～100
const circlePercent = computed(() => {
  return Math.min(Math.max(props.spinCirclePercent, 0), 100)
})
// 圆环周长
const circlePerimeter = computed(() => {
  return (100 - circleWidth.value) * Math.PI
})
// 圆环轨道路径指令
const circlePath = computed(() => {
  const long = 100 - circleWidth.value
  return `M 50,50 m 0,-${long / 2}
   a ${long / 2},${long / 2} 0 1 1 0,${long}
   a ${long / 2},${long / 2} 0 1 1 0,-${long}`
})
// 圆环可见弧长（stroke-dasharray），ring-circle 与 ring-rail 共用
const circleDashArray = computed(() => {
  return `${(circlePercent.value / 100) * circlePerimeter.value}px, ${circlePerimeter.value}px`
})
// 指示符颜色：未传 color 时取主色别名，实例覆盖写在 --spin-primary-color 上
const primaryColor = computed(() => {
  if (props.color === undefined) {
    return 'var(--va-cp-spin-primary-color, var(--va-primary-color))'
  } else {
    return props.color
  }
})
// 内环默认比外环浅一档：翻转时两环交替侧视，浅色内环作环面的受光面，与外环基色拉开层次；
// 显式传 color 时按该色派生同色系浅调（否则会出现外环黄、内环仍是主题色）；color 无法解析
// （如传入 CSS 变量）时回落到主题的悬停档主色 —— 亮 / 暗两种模式下它都比基色浅，方向一致
const INNER_RING_LIGHTEN = 8
const magicRingColorComputed = computed(() => {
  if (props.magicRingColor !== undefined) {
    return props.magicRingColor
  }
  if (props.color !== undefined) {
    const parsed = new TinyColor(props.color)
    if (parsed.isValid) {
      return parsed.lighten(INNER_RING_LIGHTEN).toRgbString()
    }
  }
  return 'var(--va-cp-spin-primary-color-hover, var(--va-primary-color-hover))'
})
const showTip = computed(() => {
  return slotsExist.tip || props.tip
})
// 宽度贴合内容：需「显式开启」且「确有内容」——无内容时 fit-content 会让根节点塌陷为 0，指示符失去居中基准
const showFitContent = computed(() => {
  return props.fitContent && slotsExist.default
})
// 注：系统「减弱动态效果」偏好由样式内的媒体查询统一处理（见 <style> 末尾）；动画名不能交给 JS 注入的
// CSS 变量 —— scoped 会把 @keyframes 重命名为 `名字-<hash>`，变量值却不重写，animation-name 静默失效
// 实际展示态：spinning 为真且超过 delay 后展示，为假时立即隐藏（避免遮罩残留）。
// 初值取 false，由下方 immediate 首次同步决定：挂载时若已处于 spinning 且设了 delay，同样要等满延迟才展示
const spinningShow = ref(false)
let delayTimer: ReturnType<typeof setTimeout> | null = null
// 清理延迟显示定时器：避免重复设置，也避免卸载后回调仍触发
function clearDelayTimer(): void {
  if (delayTimer !== null) {
    clearTimeout(delayTimer)
    delayTimer = null
  }
}
watch(
  () => props.spinning,
  (spinning) => {
    clearDelayTimer()
    if (!spinning || props.delay <= 0) {
      spinningShow.value = spinning
      return
    }
    delayTimer = setTimeout(() => {
      spinningShow.value = true
      delayTimer = null
    }, props.delay)
  },
  { immediate: true }
)
onBeforeUnmount(clearDelayTimer)
</script>
<template>
  <div
    :class="['spin-wrap', `spin-${size}`, { 'spin-fit-content': showFitContent }]"
    :aria-busy="spinning"
    :style="`
      --spin-primary-color: ${primaryColor};
      --spin-magic-ring-color: ${magicRingColorComputed};
      --spin-circle-width: ${circleWidth};
      --spin-speed: ${speedComputed}ms;
    `"
  >
    <!-- 有文案时作为状态区域供读屏播报（role=status 隐含 aria-live=polite）；无文案时不抛空状态 -->
    <Transition name="fade">
      <div class="spin-container" v-show="spinningShow" :role="showTip ? 'status' : undefined">
        <!-- 无文案时指示符是唯一的加载信号，补 role=img 与名称供读屏播报；有文案时由状态区域统一播报 -->
        <div class="spin-box" :role="showTip ? undefined : 'img'" :aria-label="showTip ? undefined : '加载中'">
          <!-- 自定义指示符：插槽优先，其次取 indicator 传入的 VNode / 渲染函数 -->
          <div v-if="showCustomIndicator" class="spin-indicator">
            <slot name="indicator">
              <component v-if="customIndicator" :is="customIndicator" />
            </slot>
          </div>
          <!-- 离散点阵族：位置（角度）与相位（时间）同源于索引 k，故一层 DOM 即可生成均匀点阵 -->
          <div
            v-if="isPointIndicator"
            class="spin-points-box"
            :class="[`spin-points-${builtinIndicator}`, { 'spin-box-rotate': isBoxRotate }]"
          >
            <span v-for="index in pointCount" :key="index" class="point" :style="`--spin-point-index: ${index}`"></span>
          </div>
          <div v-if="builtinIndicator === 'ring-circle'" class="spin-ring-circle">
            <svg class="circle" viewBox="0 0 100 100">
              <path
                :d="circlePath"
                stroke-linecap="round"
                class="path"
                :style="`stroke-dasharray: ${circleDashArray}`"
                fill-opacity="0"
              ></path>
            </svg>
          </div>
          <div v-if="builtinIndicator === 'ring-rail'" class="spin-ring-rail">
            <svg class="circle" viewBox="0 0 100 100">
              <path
                :d="circlePath"
                stroke-linecap="round"
                class="trail"
                :style="`stroke: ${ringRailColor}; stroke-dasharray: ${circlePerimeter}px, ${circlePerimeter}px;`"
                fill-opacity="0"
              ></path>
              <path
                :d="circlePath"
                stroke-linecap="round"
                class="path"
                :style="`stroke-dasharray: ${circleDashArray}`"
                fill-opacity="0"
              ></path>
            </svg>
          </div>
          <div v-if="builtinIndicator === 'dynamic-circle'" class="spin-dynamic-circle">
            <svg class="circle" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
            </svg>
          </div>
          <!-- 内环写在前面：后绘制的外环压在内环之上，两环亚像素重叠时由「更靠外」的外环占据，
               否则浅色内环会在交界处压出一条亮线（视觉上像内环盖住了外环） -->
          <div v-if="builtinIndicator === 'magic-ring'" class="spin-magic-ring">
            <div class="inner-ring"></div>
            <div class="outer-ring"></div>
          </div>
          <div v-if="showTip" class="spin-tip" :class="{ 'dot-tip': isDotTip }">
            <slot name="tip">{{ tip }}</slot>
          </div>
        </div>
      </div>
    </Transition>
    <div class="spin-content" :class="{ 'spin-blur': spinningShow }">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  pointer-events: none;
}
.spin-wrap {
  --spin-dot-box: 30px; // dot（四点闪烁）的轮盘边长
  --spin-dot-size: 11px; // dot 的单点直径
  --spin-points-box: 30px; // dot-wheel（八点轮）的轮盘边长
  --spin-points-size: 9px; // dot-wheel 的单点直径
  --spin-line-length: 12px; // line-wheel 的单根轮辐长度
  --spin-line-width: 4px; // line-wheel 的单根轮辐宽度
  --spin-ring-size: 36px; // ring-circle / ring-rail 的直径
  --spin-dynamic-size: 38px; // dynamic-circle 的直径
  --spin-magic-size: 36px; // magic-ring 的直径
  --spin-magic-border-width: calc(var(--spin-magic-size) * var(--spin-circle-width) / 100);
  --spin-magic-inset: calc(var(--spin-magic-border-width) - 0.5px);
  --spin-magic-narrow-width: calc(var(--spin-magic-border-width) * 2 - 1.5px);
  --spin-magic-rotate-duration: calc(var(--spin-speed) * 5 / 3);
  --spin-tip-font-size: 14px;
  --spin-tip-font-weight: 500;
  --spin-tip-line-height: 18px;
  --spin-tip-margin-top: 12px;
  --spin-dot-tip-margin-top: 16px;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.spin-fit-content {
    width: fit-content;
    max-width: 100%;
  }
  .spin-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    .spin-box {
      text-align: center;
      line-height: 0;
      .spin-indicator {
        display: inline-block;
        line-height: normal;
      }
      .spin-points-box {
        position: relative;
        display: inline-block;
        width: var(--spin-points-box);
        height: var(--spin-points-box);
        .point {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(calc(var(--spin-points-angle) * (var(--spin-point-index) - 1)))
            translateY(calc(-1 * var(--spin-points-radius)));
          background-color: var(--spin-primary-color);
          // 静态亮度梯度：与动画首帧一致，供「动画被禁用」（系统减弱动态效果）时兜底
          opacity: calc(1 - var(--spin-points-fade-step) * (var(--spin-point-index) - 1));
          // 单一波形 + 逐点负延迟相移：一个 keyframes 取代 N 组各自成文的波形
          animation: spinTrace var(--spin-speed) linear infinite;
          animation-delay: calc(-1 * var(--spin-speed) * var(--spin-points-phase) * (var(--spin-point-index) - 1));
        }
        &.spin-points-dot {
          --spin-points-angle: 90deg;
          --spin-points-radius: calc((var(--spin-dot-box) - var(--spin-dot-size)) * 0.7071);
          width: var(--spin-dot-box);
          height: var(--spin-dot-box);
          animation: spinDotRotate 1.2s linear infinite;
          .point {
            width: var(--spin-dot-size);
            height: var(--spin-dot-size);
            border-radius: 50%;
            opacity: 0.3;
            animation: spinDotFade 1s linear infinite alternate;
            animation-delay: calc((var(--spin-point-index) - 1) * 0.4s);
          }
        }
        &.spin-points-dot-wheel {
          --spin-points-angle: -45deg;
          --spin-points-phase: 0.125;
          --spin-points-radius: calc((var(--spin-points-box) - var(--spin-points-size)) * 0.7071);
          --spin-points-fade-step: 0.0875; // (1 - 0.3) / 8：与 spinTrace 的落差按点均分
          .point {
            width: var(--spin-points-size);
            height: var(--spin-points-size);
            border-radius: 50%;
          }
        }
        &.spin-points-line-wheel {
          --spin-points-angle: -45deg; // 同 dot-wheel：角度与相位成对反向，保证波峰顺时针移动
          --spin-points-phase: 0.125;
          --spin-points-radius: var(--spin-line-length);
          --spin-points-fade-step: 0.0875; // 同 dot-wheel：静态兜底与动画首帧一致
          width: calc(var(--spin-line-length) * 3);
          height: calc(var(--spin-line-length) * 3);
          .point {
            width: var(--spin-line-width);
            height: var(--spin-line-length);
            border-radius: var(--spin-line-length);
          }
        }
      }
      .spin-box-rotate {
        animation: spinCircle 2.4s ease-in-out;
      }
      .spin-ring-circle,
      .spin-ring-rail {
        display: inline-block;
        overflow: hidden;
        width: var(--spin-ring-size);
        height: var(--spin-ring-size);
        animation: spinCircle 0.8s linear infinite;
      }
      .circle {
        .trail {
          stroke-width: var(--spin-circle-width);
          stroke-dashoffset: 0;
        }
        .path {
          stroke: var(--spin-primary-color);
          stroke-width: var(--spin-circle-width);
          stroke-dashoffset: 0;
        }
      }
      .spin-dynamic-circle {
        display: inline-block;
        width: var(--spin-dynamic-size);
        height: var(--spin-dynamic-size);
        animation: spinCircle 2s linear infinite;
        .circle {
          .path {
            stroke-width: 5;
            stroke-dasharray: 90, 150;
            stroke-dashoffset: 0;
            stroke: var(--spin-primary-color);
            stroke-linecap: round;
            animation: loadingDash 1.5s ease-in-out infinite;
            @keyframes loadingDash {
              0% {
                stroke-dasharray: 1, 200;
                stroke-dashoffset: 0;
              }
              50% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -40px;
              }
              100% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -124px;
              }
            }
          }
        }
      }
      @keyframes spinCircle {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes spinTrace {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
        }
      }
      @keyframes spinDotRotate {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes spinDotFade {
        100% {
          opacity: 1;
        }
      }
      .spin-magic-ring {
        display: inline-block;
        position: relative;
        width: var(--spin-magic-size);
        height: var(--spin-magic-size);
        transform: rotate(45deg);
        animation: spinMagicRingRotate var(--spin-magic-rotate-duration) linear infinite;
        @keyframes spinMagicRingRotate {
          100% {
            transform: rotate(405deg);
          }
        }
        .outer-ring,
        .inner-ring {
          position: absolute;
          left: 50%;
          width: var(--spin-magic-full-width);
          height: 100%;
          border-style: solid;
          border-width: var(--spin-magic-border-width);
          border-radius: 50%;
          transform: translateX(-50%);
          animation: spinMagicRingFlip var(--spin-speed) linear infinite;
        }
        .outer-ring {
          top: 0;
          --spin-magic-full-width: 100%;
          border-color: var(--spin-primary-color);
        }
        .inner-ring {
          top: var(--spin-magic-inset);
          height: calc(100% - var(--spin-magic-inset) * 2);
          --spin-magic-full-width: calc(100% - var(--spin-magic-inset) * 2);
          border-color: var(--spin-magic-ring-color);
          animation-delay: calc(var(--spin-speed) / -8);
        }
        @keyframes spinMagicRingFlip {
          0% {
            width: var(--spin-magic-full-width);
            animation-timing-function: ease-in;
          }
          20.5% {
            width: var(--spin-magic-narrow-width);
          }
          29.5% {
            width: var(--spin-magic-narrow-width);
            animation-timing-function: ease-out;
          }
          50% {
            width: var(--spin-magic-full-width);
            animation-timing-function: ease-in;
          }
          70.5% {
            width: var(--spin-magic-narrow-width);
          }
          79.5% {
            width: var(--spin-magic-narrow-width);
            animation-timing-function: ease-out;
          }
          100% {
            width: var(--spin-magic-full-width);
          }
        }
      }
      .spin-tip {
        color: var(--spin-primary-color);
        text-align: center;
        font-size: var(--spin-tip-font-size);
        font-weight: var(--spin-tip-font-weight);
        line-height: var(--spin-tip-line-height);
        margin-top: var(--spin-tip-margin-top);
      }
      .dot-tip {
        margin-top: var(--spin-dot-tip-margin-top);
      }
    }
  }
  .spin-content {
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
  }
  .spin-blur {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }
}
.spin-wrap.spin-small {
  --spin-dot-box: 20px;
  --spin-dot-size: 8px;
  --spin-points-box: 20px;
  --spin-points-size: 6px;
  --spin-line-length: 8px;
  --spin-line-width: 3.2px;
  --spin-ring-size: 24px;
  --spin-dynamic-size: 26px;
  --spin-magic-size: 24px;
  --spin-tip-font-weight: 400;
  --spin-tip-line-height: 16px;
  --spin-tip-margin-top: 8px;
  --spin-dot-tip-margin-top: 12px;
}
.spin-wrap.spin-large {
  --spin-dot-box: 40px;
  --spin-dot-size: 15px;
  --spin-points-box: 40px;
  --spin-points-size: 12px;
  --spin-line-length: 16px;
  --spin-line-width: 5.33px;
  --spin-ring-size: 48px;
  --spin-dynamic-size: 50px;
  --spin-magic-size: 48px;
  --spin-tip-font-size: 16px;
  --spin-tip-line-height: 20px;
  --spin-tip-margin-top: 16px;
  --spin-dot-tip-margin-top: 22px;
}
@media (prefers-reduced-motion: reduce) {
  .spin-wrap .spin-container .spin-box {
    .spin-points-box .point,
    .spin-points-box.spin-points-dot,
    .spin-points-box.spin-points-dot .point,
    .spin-box-rotate,
    .spin-ring-circle,
    .spin-ring-rail,
    .spin-dynamic-circle,
    .spin-dynamic-circle .circle .path,
    .spin-magic-ring,
    .spin-magic-ring .outer-ring,
    .spin-magic-ring .inner-ring {
      animation: none;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
