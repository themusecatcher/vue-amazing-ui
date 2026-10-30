import type { CSSProperties } from 'vue'
import type { MountElement } from '../utils'

/**
 * Tooltip 的公开 prop 契约
 *
 * Popover / Popconfirm 通过 `Omit` 继承本类型，因此这里是三者共用的唯一数据源。
 *
 * ⚠️ 本文件必须保持「纯 `.ts` + 相对路径导出」：compiler-sfc 解析 `interface X extends ...`
 * 的基类型时走 `ts.resolveModuleName`，只认相对路径的 `.ts` / `.tsx` / `.d.ts`；
 * 别名（`components/tooltip`）或 `.vue` 会直接编译失败（Failed to resolve extends base type）。
 * 同理，继承方必须以相对路径引入本文件。
 */
export interface TooltipProps {
  maxWidth?: string | number // 文字提示最大宽度，单位 px
  content?: string // 展示的内容
  contentClass?: string // 设置展示内容的类名
  contentStyle?: CSSProperties // 设置展示内容的样式
  tooltip?: string // 文字提示内容
  tooltipClass?: string // 设置文字提示的类名
  tooltipStyle?: CSSProperties // 设置文字提示的样式
  popupClassName?: string // 设置浮层面板（定位盒）的类名，用于自定义面板层样式
  popupStyle?: CSSProperties // 设置浮层面板（定位盒）的样式，在皮肤变量与动画原点之后合并，可覆盖定位
  zIndex?: number // 浮层层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
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
  keyboard?: boolean // 是否支持按键操作 (enter 切换显示；esc 关闭)，仅当 trigger: 'click' 时生效
  disabled?: boolean // 是否禁用文字提示，禁用后不响应任何触发
  to?: string | MountElement | false // 弹出框挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  destroyOnHide?: boolean // 隐藏后是否卸载弹出框 DOM：离开动画结束后卸载，再次显示时重新创建并重新定位；false 时元素常驻、仅切换显示
  transitionDuration?: number // 文字提示动画的过渡持续时间，单位 ms
  showDelay?: number // 文字提示显示的延迟时间，单位 ms，仅当 trigger: hover 时生效
  hideDelay?: number // 文字提示隐藏的延迟时间，单位 ms，仅当 trigger: hover 时生效
  open?: boolean // (v-model) 文字提示是否显示；显式传入（含 false）即为受控：显隐以该值为准，内部触发只经 update:open / openChange 上报
  openControl?: boolean // 只使用 open 属性控制显示隐藏，仅当 trigger: hover 时生效，此时移入移出将不会触发显示隐藏，全部由 open 属性控制
  anchor?: MountElement | null // 外部锚点：传入后不渲染触发包裹层，触发监听、无障碍属性与定位全部以该元素为准
  getDisabled?: () => boolean // 展示前的动态禁用判定（如文本未溢出时不展示），每次展示前求值
  tooltipRole?: string // 面板 role，落在 `.tooltip-card`（与 tooltipStyle 同节点）；默认 'tooltip'，对话框类皮肤（Popconfirm）改为 'alertdialog'
  tooltipLabelledby?: string // 面板可访问名称的来源元素 id：role 为 dialog / alertdialog 时必需，普通提示无需设置
  describedBy?: boolean // 是否把面板 id 关联到触发器的 aria-describedby，默认 true；对话框类面板应关闭，否则整块内容会被当作触发器的描述朗读
}

/**
 * 下游组件（Popover / Popconfirm）必须一并继承的默认值
 *
 * 收录标准：Tooltip 的 `withDefaults` 中「值 ≠ 该类型隐式默认」的项。
 * `extends Omit<TooltipProps, …>` 只共享类型、不共享默认值，而 Vue 会把「缺省且无默认值」的
 * 布尔 prop 强转成 `false` —— 于是继承方会把 `false` 经 `v-bind` 下发给 Tooltip，覆盖其真实默认值。
 * 受影响的有两类：
 * - 默认值为 `true` 的布尔项：`arrow`、`flip`（漏继承则箭头消失、flip 失效）；
 * - 默认值为 `undefined` 的布尔项：`open`（漏继承则恒下发 `open: false`，即「永远受控且关闭」，
 *   点击触发器再也打不开浮层）；
 * 数字 / 字符串 prop 不受影响（父侧为 `undefined`，Vue 不覆盖子组件默认值）。
 */
export const TOOLTIP_INHERITED_DEFAULTS = {
  arrow: true,
  flip: true,
  open: undefined,
  // 描述关联同为「默认 true」：漏继承会被 Vue 强转成 false，Popover / Popconfirm 的触发器将静默失去
  // aria-describedby。Popconfirm 有意偏离为 false（面板是 alertdialog，见其 withDefaults 注释）
  describedBy: true
} as const
