<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'
import type { CSSProperties, FunctionalComponent, TransitionProps, VNode } from 'vue'
import {
  FLOATING_MOUNT_ATTR,
  raiseFloatingOrder,
  useFloating,
  useFloatingTeleportTarget,
  useZIndex
} from 'components/utils'
import type { FloatingBoundary, FloatingPlacement, FloatingPoint, FloatingVirtualAnchor } from 'components/utils'
/**
 * 浮层宿主
 *
 * 只负责「弹层」里与内容、皮肤无关的宿主机制，供 `Tooltip` / `Popover` / `Popconfirm` /
 * `Dropdown` / `Menu` 等组件复用，把此前分散在 5 处的重复实现收拢到一处：
 * - **两层 DOM**：定位参照容器（`absolute` + 零高度 + `pointer-events: none`，
 *   既不参与布局也不产生层叠上下文，仅作为面板 `top` / `left` 的坐标原点）+ 面板（定位样式落点）。
 *   容器按**实时测量**，故 Teleport 到 body 与 `to: false` 就地渲染共用同一套求解；
 * - **首帧优化**：首次展示前不渲染任何 DOM，之后 `v-show` 复用同一元素、动画期间不卸载；
 * - **卸载语义**（`destroyOnHide`，默认关闭）：为真时在**离开过渡结束之后**卸载整棵子树（容器 + 面板 +
 *   箭头），此后 DOM 归零；重新展示按「首次展示」路径重建 —— 重新领取层级、重新测量、重播进入动画。
 *   卸载时机由 `afterLeave` 单一驱动：`show` 变假的当帧不卸载（否则离开动画会直接消失），离开被打断
 *   （动画未结束就重新 `show`）时 Vue 不发 `afterLeave`，故同样不卸载。注意 `renderBody` 逃生舱渲染的
 *   面板根元素一并被卸载，其**内部组件状态随之重置**；
 * - **Teleport / `to: false`**：`to === false` 就地渲染，面板留在父级内部（picker 面板的内层浮层需要）；
 * - **Transition**：动画配置由皮肤层经 `transitionProps` 传入 —— 宿主不含皮肤，动画缓动 / 关键帧
 *   属皮肤层（如 `Tooltip` 的 zoom、`Select` 的 slide）；
 * - **关闭语义**：宿主只按 `show` 渲染，动画结束后发 `animationend` / `afterLeave`；触发语义
 *   （hover / click / focus / 延迟 / 外部点击 / esc）与业务耦合，留在消费组件
 *   ——「动画期间不卸载」正是靠这里的 `v-show` 保证；
 * - **层级**：消费 `useZIndex`，每次「出现」重新领取，保证后出现者在上；
 * - **箭头 DOM + 方向类**：面板上落 `va-popup-placement-{实际方向}`（**对外命名**，如
 *   `va-popup-placement-bottomLeft`），箭头几何全部由皮肤层的 CSS 用方向类选择器驱动 ——
 *   内核不输出箭头几何给 JS 使用者。
 */

/**
 * `renderBody` 逃生舱的入参
 *
 * 返回值为**面板元素本身**，下列绑定必须由使用者一并落到面板根元素上，否则定位 / 层级 / 箭头 CSS 会失效。
 * 规则来源：抽象若不能被局部接管，使用者就会绕过它。
 */
export interface PopupBodyBindings {
  /** 面板 class（宿主基础类 + 可选的自定义类），需绑定到根元素 */
  class: string
  /** 面板元素引用回调：内核据此测量浮层尺寸，需绑定到根元素 */
  setPanelRef: (el: HTMLElement | null) => void
  /** 面板内联样式：定位（top / left / transform）+ 缩放原点 + 层级，需绑定到根元素 */
  style: CSSProperties
  /** 实际方向（对外命名，如 `bottomLeft`）：已包含在 `class` 的方向类中，此处供使用者按需读取 */
  placement: FloatingPlacement
  /** 箭头节点（由 `arrow` / `arrowClass` 生成），需放入面板内；无箭头时为 null */
  arrow: VNode | null
}
export interface Props {
  show?: boolean // 面板是否显示，由消费组件控制（宿主不接管触发语义）
  destroyOnHide?: boolean // 隐藏后是否卸载浮层 DOM：离开过渡结束后卸载整棵子树（含 renderBody 的面板），重新展示时元素与内部状态均为新建；默认 false 时元素常驻、仅切换 display。运行中切换该值只影响其后发生的隐藏（不对已隐藏的浮层追溯）
  to?: string | HTMLElement | false // 面板挂载的容器节点，可选：元素标签名（如 body）或元素本身，false 会待在原地
  anchor?: HTMLElement | null // DOM 锚点
  virtualAnchor?: FloatingVirtualAnchor | null // 虚拟锚点（非 DOM 元素，用于指向任意矩形）
  point?: FloatingPoint | null // x-y 手动定位（视口坐标，用于跟随鼠标 / 定点弹出）
  placement?: FloatingPlacement // 期望方向，实际方向见面板上的 `va-popup-placement-*` 类名
  flip?: boolean // 主轴空间不足时是否同轴翻转
  shift?: boolean // 次轴溢出时是否做对齐自适应与微调
  offset?: number // 主轴方向面板与锚点之间的间距，单位 px
  boundary?: FloatingBoundary // 遮挡边界口径：最近可滚动父元素（默认，被裁剪时才生效）或视口
  matchTriggerWidth?: 'width' | 'minWidth' | number | false // 面板与锚点的尺寸关系
  arrow?: boolean // 是否渲染箭头 DOM（几何由皮肤层的方向类选择器驱动）
  arrowClass?: string // 箭头的自定义类名（皮肤层挂载点）
  defaultZIndex: number // 默认层级：未传 zIndex 且未注入层级管理器时使用（见浮层统一默认层级表）
  zIndex?: number // 显式层级，优先级最高
  panelClass?: string // 面板的类名（皮肤层挂载点）
  panelStyle?: CSSProperties // 面板的样式，在内核输出之后合并，可覆盖定位 / 缩放原点（层级不受其影响，始终由 zIndex prop / 分配器决定）
  transitionProps?: TransitionProps // 过渡动画配置（动画名 / 各阶段类名 / 时长等），由皮肤层提供
  renderBody?: (bindings: PopupBodyBindings) => VNode // 逃生舱：接管面板元素本身的渲染
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  destroyOnHide: false,
  to: undefined,
  anchor: null,
  virtualAnchor: null,
  point: null,
  placement: 'bottom',
  flip: true,
  shift: true,
  offset: 0,
  boundary: 'scrollParent',
  matchTriggerWidth: false,
  arrow: false,
  arrowClass: undefined,
  zIndex: undefined,
  panelClass: undefined,
  panelStyle: () => ({}),
  transitionProps: () => ({}),
  renderBody: undefined
})
// 根节点是 Teleport，属性无法自动透传（Vue 会丢弃），故关闭自动继承并显式绑到面板上：
// 消费组件的面板级监听（如 mouseenter / mouseleave / keydown）与 class / style 由此落到面板
defineOptions({ inheritAttrs: false })
const emits = defineEmits<{
  animationend: [] // 面板自身动画（进入 / 离开）结束
  afterLeave: [] // 离开动画结束，面板已完全隐藏
}>()
const initialDisplay = ref<boolean>(props.show) // 首帧优化：首次展示前不渲染，之后用 v-show 复用
const destroyed = ref<boolean>(false) // 面板子树已被卸载（仅 destroyOnHide 模式会置真；重新展示时复位）
// 面板子树是否存在于 DOM：默认模式沿用首帧优化（首次展示后常驻），销毁模式在离开过渡结束后移除整棵子树
const shouldRender = computed<boolean>(() => initialDisplay.value && !destroyed.value)
// 离开动画进行中：此间面板不接管指针事件
// 该状态由宿主自持而非交给皮肤层：面板的 `pointer-events: auto` 同样由宿主声明（见文件尾样式块），
// 同文件内两条规则优先级相同、靠源码顺序即可稳定生效，皮肤层无需为表达状态而提高选择器优先级
const leaving = ref<boolean>(false)
const panelRef = ref<HTMLElement | null>(null) // 面板元素引用：定位样式的落点与测量的对象
const containerRef = ref<HTMLElement | null>(null) // 定位参照容器引用：面板 top / left 的坐标原点
// 层级：未传 zIndex 时以 defaultZIndex 为回退；ConfigProvider 传入 baseZIndex 时改由其分配
// 层级：挂载点进入承载层后，本层的 z 只在承载层内部表达相对顺序（不再与承载层争层级）；
// 领取时机完全由「出现」驱动（allocateOnMount: false）—— 隐藏的浮层不该持有槽位，
// 否则会持续抬高后续分配点，违背「数值随同时可见层数增长」
const {
  zIndex: layerZIndex,
  allocate: allocateZIndex,
  release: releaseZIndex
} = useZIndex(props.defaultZIndex, undefined, { allocateOnMount: false })
const popupZIndex = computed(() => props.zIndex ?? layerZIndex.value)
// 挂载点：显式 to 优先，否则就近取承载层内容容器（Modal / Drawer / Dialog / 外层 Popup 面板），
// 都没有则回落 body（见 utils/floating-mount.ts）
const resolvedTo = useFloatingTeleportTarget(
  () => props.anchor,
  () => props.to
)
// 定位内核：只做「算 + 输出 + 同步」，宿主负责把输出声明式地绑到 DOM 上
const {
  panelStyle: floatingPanelStyle,
  actualPlacement,
  transformOrigin,
  update,
  sync
} = useFloating(panelRef, {
  anchor: () => props.anchor,
  virtualAnchor: () => props.virtualAnchor,
  point: () => props.point,
  offsetContainer: containerRef,
  placement: () => props.placement,
  flip: () => props.flip,
  shift: () => props.shift,
  offset: () => props.offset,
  boundary: () => props.boundary,
  matchTriggerWidth: () => props.matchTriggerWidth,
  enabled: () => props.show // 隐藏时停止测量与监听
})
// 面板内联样式：内核输出（定位 + 缩放原点）+ 皮肤层样式 + 层级。
// 层级放在最后：`panelStyle` 是皮肤层的样式逃生口（要求可覆盖定位 / 缩放原点），
// 但**层级始终由宿主接管**（与 Select / AutoComplete 的「使用者样式不接管层级」同一契约），
// 否则使用者经 popupStyle / dropdownMenuStyle 传入 zIndex 会绕开 `zIndex` prop 与分配器
const mergedPanelStyle = computed<CSSProperties>(() => ({
  ...floatingPanelStyle.value,
  transformOrigin: transformOrigin.value,
  ...props.panelStyle,
  zIndex: popupZIndex.value
}))
// 箭头节点：宿主只渲染结构，几何交给皮肤层的 CSS（同级的方向类选择器）
const arrowVNode = computed<VNode | null>(() =>
  props.arrow ? h('div', { class: ['va-popup-arrow', props.arrowClass] }) : null
)
/**
 * 面板类名：宿主基础类 + 皮肤类（panelClass）+ 实际方向类 + 离开态类
 *
 * 方向以**类名**落地（`notification-${placement}`、`drawer-${placement}` 同此约定），
 * 皮肤层只需「方向类 + 父子嵌套」即可写出箭头几何，不必解析方向字符串（不做前后缀匹配）。
 * 默认面板与 `renderBody` 逃生舱共用同一份。
 */
const panelClassName = computed(() =>
  [
    'va-popup-panel',
    props.panelClass,
    `va-popup-placement-${actualPlacement.value}`,
    leaving.value ? 'va-popup-leaving' : ''
  ]
    .filter(Boolean)
    .join(' ')
)
// 面板元素引用回调：函数引用保持稳定，避免 renderBody 每次重渲染都触发一次内核重算
function setPanelRef(el: HTMLElement | null): void {
  panelRef.value = el
  // renderBody 逃生舱的面板根元素由使用者渲染（模板上无法预置属性），故在此补挂载点标记：
  // 面板内再放甲类浮层（如 Popover ⊃ Select）时，内层浮层据就近原则挂进本面板
  el?.setAttribute(FLOATING_MOUNT_ATTR, '')
}
// 逃生舱入参：使用者据此渲染自己的面板根元素
const bodyBindings = computed<PopupBodyBindings>(() => ({
  class: panelClassName.value,
  setPanelRef,
  style: mergedPanelStyle.value,
  placement: actualPlacement.value,
  arrow: arrowVNode.value
}))
/**
 * `renderBody` 的承载组件
 *
 * 用函数式组件承载而非在 `computed` 里直接调用：VNode 必须落在**渲染上下文内**创建，
 * 否则其上的 ref 会成为「无主的 hoisted vnode」而无法注册（Vue 会告警并跳过 setRef）。
 */
const RenderBody: FunctionalComponent = () => (props.renderBody ? props.renderBody(bodyBindings.value) : null)
watch(
  () => props.show,
  (show) => {
    if (!show) return
    // 首次展示后转入 v-show，元素不再卸载（动画期间同样如此）
    initialDisplay.value = true
    // 重新展示：复位卸载标记，面板子树按「首次展示」路径重建（重新测量 / 重播进入动画）
    destroyed.value = false
    // 每次「出现」重新领取层级：保证重新打开的浮层位于其它已打开层之上（未注入管理器时为空操作）
    allocateZIndex()
    // 无分配器时同层级浮层的上下关系由 DOM 顺序决定，故每次出现都把容器移到目标末尾 ——
    // 使顺序等于「最近一次打开的顺序」（就地渲染时容器在组件自身 DOM 内，不能移动）
    if (resolvedTo.value !== false) {
      raiseFloatingOrder(containerRef.value)
    }
  },
  // 初始即为显示态（受控 show / 默认展开）时也要领取一次，故立即执行
  { immediate: true }
)
// 仅响应面板自身的动画结束：插槽内容中的嵌套动画冒泡上来时 target 不是面板，需忽略
function onAnimationEnd(e: AnimationEvent): void {
  if (e.target !== panelRef.value) return
  emits('animationend')
}
// 离开动画开始：面板在动画期间不再接管指针事件（避免「正在消失的面板」仍可点击 / 悬浮）
function onBeforeLeave(): void {
  leaving.value = true
}
// 进入动画开始：复位离开态 —— 离开动画被中途取消（动画未结束就重新 show）时不会走 afterLeave，需在此兜底
function onBeforeEnter(): void {
  leaving.value = false
}
function onAfterLeave(): void {
  leaving.value = false
  // 离开动画结束后归还槽位（此刻面板才真正 display: none）：若在 show 变 false 时立即归还，
  // 新出现的层会拿到腾出的槽位、被这个仍在淡出的旧面板反超
  releaseZIndex()
  // 卸载只在离开过渡真正结束时发生（此刻面板已不可见，整棵子树移除不会截断动画）。
  // 再判一次 `show`：被打断的离开不应卸载——虽由 Vue「取消离开即不发 afterLeave」保证不触发，
  // 但这里仍需防御「可见面板被卸载」这一最坏结果
  destroyed.value = props.destroyOnHide && !props.show
  emits('afterLeave')
}
defineExpose({
  panelRef, // 面板元素（消费组件用于判定外部点击范围等）
  actualPlacement, // 翻转 / 自适应后的实际方向（皮肤层据此冻结动画原点、做箭头几何）
  update, // 主动重算一次位置
  sync // 帧级强制重对齐（锚点持续移动场景）
})
</script>
<template>
  <!-- 条件放在 Teleport 上（而不是容器 div 上）：Teleport 随「首次展示」才挂载，容器因而按**打开顺序**
       追加到目标末尾 —— 同族同层级浮层（如承载层内两个 Tooltip）的上下关系等于「后打开者在上」，
       即「容器在可见时才 appendChild 到父节点」；
       若 Teleport 常驻，同族同层级浮层的顺序会退化为模板源码顺序，与打开先后无关 -->
  <Teleport v-if="shouldRender" :disabled="resolvedTo === false" :to="resolvedTo === false ? null : resolvedTo">
    <div ref="containerRef" class="va-popup-container">
      <!-- appear：首次插入也要播放进入动画。容器的 v-if 首帧优化会让「首次展示」等同于初次渲染，
           不加 appear 时 Vue 不会触发 enter，面板会生硬出现（只有第二次起才有过渡） -->
      <Transition
        appear
        v-bind="transitionProps"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        @animationend="onAnimationEnd"
        @after-leave="onAfterLeave"
      >
        <!-- 显式取 props：裸写 `renderBody` 时 vue-tsc 会把该条件判为「函数恒为真」(TS2774)，与运行时「未传则不渲染逃生舱」的语义不符 -->
        <RenderBody v-if="props.renderBody" v-show="show" />
        <div
          v-else
          v-show="show"
          ref="panelRef"
          v-bind="$attrs"
          :class="panelClassName"
          :style="mergedPanelStyle"
          data-va-floating-mount=""
        >
          <slot></slot>
          <component :is="arrowVNode" v-if="arrowVNode" />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
/* 定位参照容器：绝对定位 + 零高度，
   既不参与布局也不遮挡页面交互；z-index 保持 auto，避免产生层叠上下文而把面板的层级关在里层 */
.va-popup-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: auto;
  height: 0;
  pointer-events: none;
}
.va-popup-panel {
  position: absolute;
  /* 容器关闭了指针事件（pointer-events 可继承），面板必须显式恢复，否则 hover / click 全部失效 */
  pointer-events: auto;
}
/* 离开动画期间不接管指针事件：
   比上方 `.va-popup-panel` 多一个类（0,3,0 > 0,2,0），靠**特异性**稳定生效，与源码顺序无关 ——
   该状态由宿主自持，皮肤层（Tooltip 等）无需再为覆盖上方声明而提高选择器优先级 */
.va-popup-panel.va-popup-leaving {
  pointer-events: none;
}
.va-popup-arrow {
  /* 箭头绝对定位溢出面板、不占面板盒（主轴间距由 offset 表达），几何全部由皮肤层的
     方向类选择器驱动 */
  position: absolute;
  pointer-events: none;
}
</style>
