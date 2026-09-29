<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { renderContentToVNode, siderCollapsedKey, useWindowWidth } from 'components/utils'
import { getSiderId, siderHookKey } from '../siderHook'

/** 断点对应的视窗宽度（单位 px），用于 collapsedWidth 的响应式取值 */
export interface LayoutSiderResponsive {
  xs?: number // 视窗宽度 <576 时使用的收起宽度
  sm?: number // 视窗宽度 ≥576 时使用的收起宽度
  md?: number // 视窗宽度 ≥768 时使用的收起宽度
  lg?: number // 视窗宽度 ≥992 时使用的收起宽度
  xl?: number // 视窗宽度 ≥1200 时使用的收起宽度
  xxl?: number // 视窗宽度 ≥1600 时使用的收起宽度
  xxxl?: number // 视窗宽度 ≥2000 时使用的收起宽度
}
/** 收起类型：点击触发器 / 响应式断点 */
type CollapseType = 'clickTrigger' | 'responsive'

/**
 * 侧边栏：自带默认样式及收起能力，只能放在 Layout 中
 * 收起状态支持 v-model:collapsed；未传时内部自持，defaultCollapsed 决定初始态
 */
export interface Props {
  collapsed?: boolean // (v-model) 当前收起状态，不传时为非受控
  defaultCollapsed?: boolean // 是否默认收起，仅非受控时生效
  width?: number | string // 宽度，数字与数字字符串按 px 处理
  collapsedWidth?: number | LayoutSiderResponsive // 收起时的宽度；数字按 px 处理，传对象时按视窗宽度取档位，设为 0 会出现特殊触发器
  theme?: 'light' | 'dark' // 侧边栏主题色
  collapsible?: boolean // 是否可收起
  breakpoint?: keyof LayoutSiderResponsive // 触发响应式收起的断点，视窗宽度低于该断点时收起
  trigger?: VNode | string | null // 自定义收起触发器；传 null 隐藏触发器
  reverseArrow?: boolean // 翻转折叠箭头方向，Sider 在右侧时使用
  zeroWidthTriggerStyle?: CSSProperties // collapsedWidth 为 0 时特殊触发器的样式
}
export interface LayoutSiderSlots {
  default?: () => VNode[]
  trigger?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  collapsed: undefined,
  width: 200,
  collapsedWidth: 80,
  theme: 'dark',
  defaultCollapsed: false,
  collapsible: false,
  breakpoint: undefined,
  trigger: undefined,
  reverseArrow: false,
  zeroWidthTriggerStyle: undefined
})
defineSlots<LayoutSiderSlots>()
const emits = defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void
  (e: 'collapse', collapsed: boolean, type: CollapseType): void
  (e: 'breakpoint', broken: boolean): void
}>()
// 断点阈值（px）：与 Grid 断点表一致
const responsiveSize = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
  xxxl: 2000
}
const viewportWidth = useWindowWidth() // SSR 取 0，挂载后随 resize 更新
const innerCollapsed = ref<boolean>(Boolean(props.collapsed ?? props.defaultCollapsed))
// 受控时跟随外部 collapsed（显式传 undefined 会回落到展开态，与非受控语义区分开）
watch(
  () => props.collapsed,
  (value) => {
    innerCollapsed.value = Boolean(value)
  }
)
// 响应式登记：Layout 收到登记后才会把布局方向切换为水平
const siderHook = inject(siderHookKey, null)
const siderId = getSiderId()
siderHook?.addSider(siderId)
onBeforeUnmount(() => {
  siderHook?.removeSider(siderId)
})
// 下发收起态给内部菜单：菜单自身不再需要绑定 inlineCollapsed
provide(siderCollapsedKey, innerCollapsed)
const collapsedSiderWidth = computed(() => {
  if (typeof props.collapsedWidth === 'number') {
    return props.collapsedWidth
  }
  return getResponsiveCollapsedWidth(props.collapsedWidth)
})
/** 视窗宽度是否已低于 breakpoint；未配置 breakpoint 时为 null（不参与响应式收起） */
const breakpointBroken = computed(() => {
  if (!props.breakpoint) {
    return null
  }
  return viewportWidth.value < responsiveSize[props.breakpoint]
})
/** 宽度归一：数字与纯数字字符串按 px 处理，已带单位的字符串原样保留 */
function toLength(value: number | string): string {
  const text = String(value)
  return text !== '' && Number.isFinite(Number(text)) ? `${text}px` : text
}
// 宽度只取决于当前收起状态：断点响应式收起同样生效（与 collapsible 无关，后者仅决定是否渲染点击触发器）
const siderWidth = computed(() => {
  const rawWidth = innerCollapsed.value ? collapsedSiderWidth.value : props.width
  return toLength(rawWidth)
})
// --layout-sider-width 经 CSS 变量继承链下发给内部菜单：菜单收起态宽度跟随侧边栏实际宽度（如 80/120/0）
const siderStyle = computed<CSSProperties>(
  () =>
    ({
      '--layout-sider-width': siderWidth.value,
      flex: `0 0 ${siderWidth.value}`,
      maxWidth: siderWidth.value,
      minWidth: siderWidth.value,
      width: siderWidth.value
    }) as CSSProperties
)
const zeroWidth = computed(() => collapsedSiderWidth.value === 0)
// trigger 显式传 null 表示隐藏触发器；传入内容（插槽优先）时替换默认图标
const showTrigger = computed(() => props.trigger !== null)
const hasCustomTrigger = computed(() => props.trigger !== undefined && props.trigger !== null)
const triggerVNode = computed(() => renderContentToVNode(props.trigger ?? undefined))
// 收起时留出触发器高度，避免内容被遮住；零宽触发器浮在侧边栏之外，故不计入
const hasTrigger = computed(() => props.collapsible && showTrigger.value && !zeroWidth.value)
// 零宽触发器在 breakpoint 触发收起时也要出现，因此不与 collapsible 绑定
const showTriggerArea = computed(() => {
  if (!showTrigger.value) {
    return false
  }
  return props.collapsible || (zeroWidth.value && breakpointBroken.value === true)
})
const arrowRotated = computed(() => {
  return props.reverseArrow ? !innerCollapsed.value : innerCollapsed.value
})
/**
 * 同步收起状态
 *
 * 仅非受控（collapsed 未传）时才写内部状态——受控模式下外部才是唯一数据源，
 * 但仍需抛出 update:collapsed 供 v-model 回写
 */
function collapse(value: boolean, type: CollapseType) {
  if (props.collapsed === undefined) {
    innerCollapsed.value = value
  }
  emits('update:collapsed', value)
  emits('collapse', value, type)
}
function toggleCollapse() {
  collapse(!innerCollapsed.value, 'clickTrigger')
}
/** 视窗宽度变化跨越断点时同步收起状态，并抛出 breakpoint / collapse 事件 */
function handleBreakpoint() {
  const broken = breakpointBroken.value
  if (broken === null) {
    return
  }
  emits('breakpoint', broken)
  if (innerCollapsed.value !== broken) {
    collapse(broken, 'responsive')
  }
}
watch(viewportWidth, handleBreakpoint)
// 初始视窗即在断点之下时同样需要同步（挂载后执行，SSR 无副作用）
onMounted(handleBreakpoint)
/** 按视窗宽度取断点档位；均未命中时回落到默认收起宽度 80 */
function getResponsiveCollapsedWidth(collapsedWidth: LayoutSiderResponsive) {
  if (viewportWidth.value >= 2000 && collapsedWidth.xxxl !== undefined) {
    return collapsedWidth.xxxl
  }
  if (viewportWidth.value >= 1600 && collapsedWidth.xxl !== undefined) {
    return collapsedWidth.xxl
  }
  if (viewportWidth.value >= 1200 && collapsedWidth.xl !== undefined) {
    return collapsedWidth.xl
  }
  if (viewportWidth.value >= 992 && collapsedWidth.lg !== undefined) {
    return collapsedWidth.lg
  }
  if (viewportWidth.value >= 768 && collapsedWidth.md !== undefined) {
    return collapsedWidth.md
  }
  if (viewportWidth.value >= 576 && collapsedWidth.sm !== undefined) {
    return collapsedWidth.sm
  }
  if (viewportWidth.value < 576 && collapsedWidth.xs !== undefined) {
    return collapsedWidth.xs
  }
  return 80
}
</script>
<template>
  <aside
    class="layout-sider-wrap"
    :class="[
      `layout-sider-${theme}`,
      {
        'layout-sider-has-trigger': hasTrigger,
        'layout-sider-zero-width': zeroWidth,
        'layout-sider-below': breakpointBroken === true
      }
    ]"
    :style="siderStyle"
  >
    <div class="layout-sider-children">
      <slot></slot>
    </div>
    <template v-if="showTriggerArea">
      <span
        v-if="zeroWidth"
        class="layout-sider-zero-width-trigger"
        :class="`layout-sider-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`"
        :style="zeroWidthTriggerStyle"
        @click="toggleCollapse"
      >
        <slot name="trigger">
          <component :is="triggerVNode" v-if="hasCustomTrigger" />
          <svg
            v-else
            class="bars-svg"
            focusable="false"
            data-icon="bars"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"
            ></path>
          </svg>
        </slot>
      </span>
      <div v-else class="layout-sider-trigger" :style="`width: ${siderWidth}`" @click="toggleCollapse">
        <slot name="trigger">
          <component :is="triggerVNode" v-if="hasCustomTrigger" />
          <svg
            v-else
            class="arrow-svg"
            :class="{ 'rotate-arrow': arrowRotated }"
            focusable="false"
            data-icon="left"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
            ></path>
          </svg>
        </slot>
      </div>
    </template>
  </aside>
</template>
<style lang="less" scoped>
.layout-sider-wrap {
  position: relative;
  // Firefox 无法把 flex item 的宽度压到内容宽度以下，需显式清掉最小宽度
  min-width: 0;
  // 纵向弹性布局：内容区自适应剩余高度、触发器在侧边栏高度内占位（不额外撑高侧边栏）
  display: flex;
  flex-direction: column;
  background: var(--layout-sider-background, #001529);
  transition:
    all 0.2s,
    background 0s;
}
.layout-sider-light {
  background: var(--layout-sider-light-background, #fff);
  .layout-sider-trigger {
    color: var(--layout-sider-light-trigger-color, rgba(0, 0, 0, 0.88));
    background: var(--layout-sider-light-trigger-background, #fff);
  }
  .layout-sider-zero-width-trigger {
    color: var(--layout-sider-light-trigger-color, rgba(0, 0, 0, 0.88));
    background: var(--layout-sider-light-background, #fff);
    border: 1px solid var(--layout-background, #f5f5f5);
    border-inline-start: 0;
  }
}
.layout-sider-children {
  // 自适应剩余高度：触发器存在时自动让出 48px（无需再用 padding 预留）
  flex: 1 1 auto;
  // Firefox 无法把 flex item 的高度压到内容高度以下，需显式清掉最小高度
  min-height: 0;
  // 规避首个子元素 margin 折叠后露出的 0.1px 缝隙
  margin-top: -0.1px;
  padding-top: 0.1px;
}
.layout-sider-zero-width {
  // 零宽时兜住自定义内容的横向溢出（零宽触发器为绝对定位，不受影响）
  > * {
    overflow: hidden;
  }
}
.layout-sider-zero-width-trigger {
  position: absolute;
  top: 64px;
  right: -40px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--layout-sider-trigger-color, #fff);
  font-size: 20px;
  background: var(--layout-sider-background, #001529);
  border-start-start-radius: 0;
  border-start-end-radius: 6px;
  border-end-end-radius: 6px;
  border-end-start-radius: 0;
  cursor: pointer;
  transition: background 0.3s;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
    transition: all 0.3s;
    content: '';
  }
  &:hover::after {
    background: rgba(255, 255, 255, 0.2);
  }
}
.layout-sider-zero-width-trigger-right {
  right: auto;
  left: -40px;
  border-start-start-radius: 6px;
  border-start-end-radius: 0;
  border-end-end-radius: 0;
  border-end-start-radius: 6px;
}
.layout-sider-trigger {
  // sticky 相对滚动容器贴底（整页滚动时即为视口底），flex: none 使其在侧边栏高度内占位
  position: sticky;
  bottom: 0;
  z-index: 1;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  color: var(--layout-sider-trigger-color, #fff);
  background: var(--layout-sider-trigger-background, #002140);
  cursor: pointer;
  transition: all 0.2s;
}
.bars-svg,
.arrow-svg {
  fill: currentColor;
}
.arrow-svg {
  transition: all 0.2s;
}
.rotate-arrow {
  transform: rotateY(180deg);
}
</style>
