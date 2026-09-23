<script lang="ts">
// 选择器 Select：数据源支持配置式 options 与子组件式（SelectOption / SelectOptGroup）双模式，
// 覆盖单选 / 多选 / 标签 / labelInValue / 虚拟滚动，并提供搜索过滤、tag 折叠与无障碍语义。
// 本块为模块级作用域（仅在模块加载时执行一次）：a11y 关联 id 的自增序号需跨组件实例唯一。
// ⚠️ 不使用项目既有的 createKeyGenerator（含时间戳）：SSR 与客户端会产出不同 id，触发水合时属性不匹配。
let selectIdSeed = 0
function nextSelectId(): string {
  selectIdSeed += 1
  return `vui-select-${selectIdSeed}`
}
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  watchEffect,
  nextTick,
  onMounted,
  onBeforeUnmount,
  inject,
  h,
  withDirectives,
  vShow,
  useSlots,
  Fragment,
  Text
} from 'vue'
import type { CSSProperties, Ref, VNode } from 'vue'
import Empty from 'components/empty'
import Scrollbar, { type ScrollbarProps } from 'components/scrollbar'
import {
  raiseFloatingOrder,
  useFloating,
  useFloatingTeleportTarget,
  useInject,
  useResizeObserver,
  useSlotsExist,
  useZIndex,
  Z_INDEX_CONTAINER_OPEN_KEY,
  FLOATING_LAYER_Z_INDEX
} from 'components/utils'
import type { FloatingPlacement } from 'components/utils'
export interface Option {
  label?: string // 选项名
  value?: string | number // 选项值
  disabled?: boolean // 是否禁用选项，默认 false
  [propName: string]: any // 允许携带任意自定义字段：#option 插槽会透传原始数据对象，便于自定义渲染
}
export interface FieldNames {
  label?: string // 选项的文本字段名
  value?: string // 选项的值字段名
  options?: string // 分组子选项的字段名（对应分组 / 树形数据的下级选项数组）
}
export type SelectValue = string | number
// labelInValue 打开时的 value 对象形态（LabeledValue 形态）
export interface LabeledValue {
  label: unknown // 选项文本（子组件式写法下由默认插槽求值而来）
  value: SelectValue // 选项值
  key?: string | number // 选项唯一键，缺省时与 value 一致
  originLabel?: unknown // 原始选项文本（子组件式写法下为默认插槽函数）
}
export type SelectPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
export type SelectMode = 'multiple' | 'tags'
// dropdownRender 的 menuNode：以函数组件形式提供，模板中可直接 <component :is="menuNode" /> 渲染
export type SelectMenuNode = () => VNode[]
export interface DropdownRenderParams {
  menuNode: SelectMenuNode // 内置下拉菜单节点
}
// tagRender（prop / 插槽）的渲染参数
export interface TagRenderParams {
  label: unknown // tag 显示文本（已按 maxTagTextLength 截断）
  value?: SelectValue // tag 对应的选项值
  disabled: boolean // tag 是否禁用（禁用项的 tag 不可移除）
  closable: boolean // tag 是否可移除
  onClose: (e?: MouseEvent) => void // 移除该 tag
  option: Option // tag 对应的原始选项数据（tags 模式新建项为伪选项）
}

export interface Props {
  // 双向绑定与受控核心
  value?: SelectValue | LabeledValue | (SelectValue | LabeledValue)[] // (v-model:value) 当前选中的 option 条目值，mode 为 multiple / tags 时为数组；labelInValue 打开时元素为 { label, value, key, originLabel } 对象
  open?: boolean // 是否展开下拉菜单（受控，不传时由组件内部维护）
  searchValue?: string // 搜索文本（受控，配对 update:searchValue；不传时由组件内部维护）
  // 内容与数据源
  options?: Option[] // 选项数据
  fieldNames?: FieldNames // 选项字段名配置，用于自定义选项的文本 / 值字段
  mode?: SelectMode // 设置多选模式，'multiple' 为多选，'tags' 为标签（可输入并创建新条目），不传为单选
  labelInValue?: boolean // 是否把每个选项的 label 包装到 value 中，value 类型变为 { label, value, key, originLabel }
  optionLabelProp?: string // 回填到选择框的 option 属性值，未指定时取 label 字段
  // 外观与尺寸
  width?: string | number // 选择器宽度，单位 px
  height?: number // 选择器高度，单位 px
  size?: 'small' | 'middle' | 'large' // 选择器大小
  placeholder?: string // 默认占位文本
  // 状态与反馈
  bordered?: boolean // 是否有边框
  status?: 'error' | 'warning' // 设置校验状态
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否处于加载状态，展开面板时后缀图标变为加载中
  // 图标与清除
  allowClear?: boolean // 是否支持清除
  clearIcon?: VNode | (() => VNode) // 自定义清除图标
  suffixIcon?: VNode | (() => VNode) // 自定义的选择框后缀图标
  showArrow?: boolean // 是否显示下拉小箭头
  menuItemSelectedIcon?: VNode | (() => VNode) // 自定义当前选中的条目图标
  // 搜索与过滤
  showSearch?: boolean // 是否支持搜索，未指定时多选（multiple / tags）默认开启、单选默认关闭
  optionFilterProp?: string // 搜索时过滤对应的 option 属性，不支持 children
  /*
    根据输入项进行筛选，默认为 true 时，筛选每个选项 optionFilterProp 字段是否包含输入项，包含返回 true，反之返回 false
    当其为 false 时不筛选，显示全部选项（常用于远程搜索）
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filterOption?: boolean | ((inputValue: string, option: Option) => boolean) // 过滤条件函数，仅当支持搜索时生效
  filterSort?: (optionA: Option, optionB: Option) => number // 搜索时对筛选结果项的排序函数
  // 多选与标签（mode 为 multiple / tags 时生效）
  maxTagCount?: number | 'responsive' // 最多显示多少个 tag，为 'responsive' 时按容器宽度自动折叠
  maxTagPlaceholder?: string | VNode | ((omittedValues: Option[]) => VNode) // 隐藏 tag 时显示的内容
  maxTagTextLength?: number // tag 上显示文本的最大长度，超出部分以 ... 截断
  tagRender?: (params: TagRenderParams) => VNode // 自定义 tag 的渲染内容
  removeIcon?: VNode | (() => VNode) // 自定义 tag 的移除图标
  tokenSeparators?: string[] // 自动分词的分隔符，输入命中后按分隔符拆分并直接选中
  autoClearSearchValue?: boolean // 多选模式下选中项后是否清空搜索框
  // 初始与开合高亮（挂载时一次性生效）
  autofocus?: boolean // 是否自动获取焦点
  defaultOpen?: boolean // 是否默认展开下拉菜单（非受控）
  defaultActiveFirstOption?: boolean // 是否默认高亮第一个选项
  firstActiveValue?: SelectValue | SelectValue[] // 默认高亮的选项
  // 面板内容
  dropdownRender?: (params: DropdownRenderParams) => VNode // 自定义下拉框内容
  notFoundContent?: string | VNode | null // 当下拉列表为空时显示的内容，传 null 时不展开空面板
  maxDisplay?: number // 下拉面板最多能展示的项数，超过后滚动显示
  listHeight?: number // 下拉面板滚动高度，单位 px（未传时回落 maxDisplay × 32）
  virtual?: boolean // 是否开启虚拟滚动，大数据量时仅渲染可视区选项
  listItemHeight?: number // 虚拟滚动的列表项高度，单位 px，需与选项实际行高一致
  scrollbarProps?: ScrollbarProps // 下拉面板滚动条 scrollbar 组件属性配置
  // 面板定位与层级
  placement?: SelectPlacement // 下拉面板弹出位置
  flip?: boolean // 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  to?: string | HTMLElement | false // 下拉面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  popupClassName?: string // 下拉面板的类名，用于自定义面板样式
  dropdownMenuStyle?: CSSProperties // 下拉面板自定义样式，可覆盖定位（与 AutoComplete 的同名属性语义一致）
  dropdownMatchSelectWidth?: boolean | number // 下拉菜单和选择器同宽，为数字时指定下拉菜单宽度
  zIndex?: number // 下拉面板层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
  // 可访问性
  id?: string // 组件 id，用于 aria-controls / aria-activedescendant 关联，未传时内部生成
}
// 声明组件插槽类型（顺序与文档 `## Slots` 表一致）
export interface SelectSlots {
  default?: () => VNode[] // 子组件式选项（<SelectOption> / <SelectOptGroup>）
  option?: (props: Option) => VNode[] // 自定义选项内容，作用域为当前选项数据
  optionLabel?: (option: Option) => VNode[] // 自定义回填到选择框的内容，作用域为当前选中项数据
  placeholder?: () => VNode[] // 自定义占位内容
  suffixIcon?: () => VNode[] // 自定义选择框后缀图标
  clearIcon?: (props: { clear: (e?: MouseEvent) => void }) => VNode[] // 自定义清除图标，作用域参数 clear 为清除方法
  menuItemSelectedIcon?: (props: { isSelected: boolean }) => VNode[] // 自定义选中项图标，作用域参数 isSelected 标识该项是否被选中
  notFoundContent?: () => VNode[] // 自定义空数据内容
  dropdownRender?: (props: DropdownRenderParams) => VNode[] // 自定义下拉框内容，作用域参数 menuNode 为内置菜单节点
  tagRender?: (params: TagRenderParams) => VNode[] // 自定义 tag 渲染内容，作用域参数同 tagRender 属性
  maxTagPlaceholder?: (params: { omittedValues: Option[] }) => VNode[] // tag 被折叠时显示的内容，作用域参数 omittedValues 为被折叠的选项数组
  removeIcon?: () => VNode[] // 自定义 tag 的移除图标
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  open: undefined,
  searchValue: undefined,
  options: () => [],
  fieldNames: undefined,
  mode: undefined,
  labelInValue: false,
  optionLabelProp: undefined,
  width: 'auto',
  height: undefined,
  size: 'middle',
  placeholder: '请选择',
  bordered: true,
  status: undefined,
  disabled: false,
  loading: false,
  allowClear: false,
  clearIcon: undefined,
  suffixIcon: undefined,
  showArrow: undefined,
  menuItemSelectedIcon: undefined,
  showSearch: undefined, // 未指定时按模式兜底（多选默认开启搜索），故不能在此落 false
  optionFilterProp: undefined,
  filterOption: true,
  filterSort: undefined,
  maxTagCount: undefined,
  maxTagPlaceholder: undefined,
  maxTagTextLength: undefined,
  tagRender: undefined,
  removeIcon: undefined,
  tokenSeparators: () => [],
  autoClearSearchValue: true,
  autofocus: false,
  defaultOpen: false,
  defaultActiveFirstOption: true,
  firstActiveValue: undefined,
  dropdownRender: undefined,
  notFoundContent: undefined,
  maxDisplay: 8,
  listHeight: undefined,
  virtual: true,
  listItemHeight: 32,
  scrollbarProps: () => ({}),
  placement: 'bottomLeft',
  flip: true,
  to: undefined,
  popupClassName: undefined,
  dropdownMenuStyle: undefined,
  dropdownMatchSelectWidth: true,
  zIndex: undefined,
  id: undefined
})
defineSlots<SelectSlots>()
const slots = useSlots()
const slotsExist = useSlotsExist([
  'option',
  'notFoundContent',
  'suffixIcon',
  'menuItemSelectedIcon',
  'clearIcon',
  'dropdownRender',
  'placeholder'
])
// 声明组件事件（顺序与文档 `## Events` 表一致；update:value 即 v-model:value 回写，随 value 属性一并说明）
const emits = defineEmits([
  'update:value',
  'change',
  'deselect',
  'select',
  'clear',
  'search',
  'focus',
  'blur',
  'openChange',
  'dropdownVisibleChange',
  'popupScroll',
  'mouseenter',
  'mouseleave',
  'inputKeyDown',
  'update:searchValue'
])
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const selectWrapRef = ref<HTMLElement | null>(null) // 组件根元素引用，用于判断焦点是否仍落在本组件内
const inputRef = ref<HTMLInputElement | null>(null) // 搜索输入框
const selectContentRef = ref<HTMLElement | null>(null) // 触发器内容容器（面板定位锚点 + tag 宽度量取对象）
const selectPanelRef = ref<HTMLElement | null>(null) // 面板根元素（滚动容器查找 / 焦点归属判定）
const selectPanelWrapperRef = ref<HTMLElement | null>(null) // 定位参照容器：面板 top / left 的坐标原点
const showOptions = ref<boolean>(false) // 非受控模式下的面板显隐
const innerSearchValue = ref<string>('') // 非受控模式下的搜索文本
const focused = ref<boolean>(false) // 是否聚焦（决定描边 / 阴影与多选输入框的可编辑性）
const isComposing = ref<boolean>(false) // 是否处于输入法(IME)合成中，合成期间不触发 search / 过滤
const hoverValue = ref<SelectValue | null>(null) // 键盘 / 悬浮高亮项的 value
const backspaceLock = ref<boolean>(false) // 退格锁：上一次按键时搜索文本是否非空（避免清空搜索的同一次按键又删掉一个 tag）
const responsiveTagCount = ref<number>(0) // maxTagCount 为 'responsive' 时按容器宽度算出的可见 tag 数
const responsiveMeasured = ref<boolean>(false) // 是否已按容器宽度量取过（量取前先全量渲染，避免无布局环境下 tag 全被折叠）
const { colorPalettes, shadowColor } = useInject('Select') // 主题色注入
// 层级：ConfigProvider 传入 baseZIndex 时按「后出现者在上」自增分配，未传则沿用默认 1050（面板需高于承载它的 Modal / Drawer / Dialog）；
// 领取时机由面板「出现」驱动（allocateOnMount: false）—— 挂载时不持有槽位，否则未展开过的下拉会长期占位、抬高后续分配点
const {
  zIndex: layerZIndex,
  allocate: allocateZIndex,
  release: releaseZIndex
} = useZIndex(FLOATING_LAYER_Z_INDEX.select, undefined, { allocateOnMount: false })
// 挂载点：显式 to 优先，否则就近取承载层内容容器（Modal / Drawer / Dialog / 外层 Popup 面板），
// 都没有则回落 body（见 utils/floating-mount.ts）
const resolvedTo = useFloatingTeleportTarget(
  () => selectContentRef.value,
  () => props.to
)
// 选项字段名配置：未指定（含显式空值）的字段逐一回退默认值
const mergedFieldNames = computed(() => ({
  label: props.fieldNames?.label || 'label',
  value: props.fieldNames?.value || 'value'
}))
// 分组子选项字段名（约定：fieldNames.options，未指定时为 'options'）
const groupField = computed(() => props.fieldNames?.options || 'options')
// 子组件式选项（default 插槽）
/** 选项 / 分组标记组件的静态标记字段（静态标记约定） */
interface OptionMarker {
  isSelectOption?: boolean
  isSelectOptGroup?: boolean
}
/** 判定 vnode 是否为标记组件：非标记组件（含普通元素 / 文本）返回 null */
function getMarkerKind(vnode: VNode): 'option' | 'group' | null {
  const type = vnode.type as OptionMarker | null
  if (!type) return null
  if (type.isSelectOptGroup) return 'group'
  if (type.isSelectOption) return 'option'
  return null
}
/** vnode.key 归一为 string | number（symbol / null 视为未设置） */
function getVNodeKey(vnode: VNode): string | number | undefined {
  const { key } = vnode
  return typeof key === 'string' || typeof key === 'number' ? key : undefined
}
/** 插槽返回值归一为数组：数组原样、单节点 / 文本包成数组、空值转空数组（函数式插槽可不返回数组） */
function toSlotChildren(result: unknown): VNode[] {
  if (Array.isArray(result)) return result as VNode[]
  if (result === undefined || result === null) return []
  return [result as VNode]
}
/**
 * 提取插槽渲染结果中的纯文本：递归进入元素子节点（组件节点取不到渲染结果，跳过）。
 * 该文本用于 tag / title / 过滤 / maxTagTextLength 截断等文本场景；富内容渲染直接取插槽函数（见 getOptionLabelSlot）
 */
function getSlotText(nodes: VNode[] | undefined): string | undefined {
  if (!nodes?.length) return undefined
  let text = ''
  const walk = (list: VNode[]) => {
    list.forEach((node) => {
      if (typeof node === 'string' || typeof node === 'number') {
        text += String(node)
        return
      }
      const children = node?.children
      if (node?.type === Text || typeof children === 'string') {
        text += String(children ?? '')
        return
      }
      if (Array.isArray(children)) walk(children as VNode[])
    })
  }
  walk(nodes)
  return text || undefined
}
/**
 * 子组件式写法下挂载的「标签插槽函数」（选项取默认插槽、分组取 #label 插槽）：富内容（图标 + 文本）由它渲染。
 * 该字段属内部约定（不外露于公开 Option 类型），缺省时回落 label 字段
 */
function getOptionLabelSlot(option: Option | undefined): (() => VNode[]) | undefined {
  const slot: unknown = option?.children
  return typeof slot === 'function' ? (slot as () => VNode[]) : undefined
}
/**
 * 解析 default 插槽的 vnode 为选项数据（子组件式写法）：
 * `<SelectOption>` → 选项对象，`<SelectOptGroup>` → 分组对象（组内子项递归解析），Fragment 展开后继续，其余节点忽略
 */
function parseSlotOptions(nodes: VNode[]): Option[] {
  const { label: labelKey, value: valueKey } = mergedFieldNames.value
  const items: Option[] = []
  nodes.forEach((vnode) => {
    if (vnode.type === Fragment) {
      items.push(...parseSlotOptions((vnode.children as VNode[] | null) ?? []))
      return
    }
    const kind = getMarkerKind(vnode)
    if (!kind) return
    // 组件 vnode 的 props 即传入的属性；插槽内容位于 children（对象形态）
    const slotProps = (vnode.props ?? {}) as Record<string, unknown>
    const slotFns = vnode.children as Record<string, (() => VNode[]) | undefined> | null
    const { label: labelProp, value: valueProp, disabled: disabledProp, ...restProps } = slotProps
    const optionKey = getVNodeKey(vnode)
    // label 属性显式非空时优先于插槽文本（约定：props.label 优先）
    const hasLabelProp = typeof labelProp === 'string' && labelProp !== ''
    if (kind === 'group') {
      const labelNodes = toSlotChildren(slotFns?.label?.())
      items.push({
        ...restProps,
        key: optionKey,
        [labelKey]: hasLabelProp ? labelProp : (getSlotText(labelNodes) ?? String(optionKey ?? '')),
        [groupField.value]: parseSlotOptions(toSlotChildren(slotFns?.default?.())),
        // #label 插槽：富内容（图标 + 文本）由它渲染；label 属性已指定时不再渲染（props.label 优先）
        children: hasLabelProp ? undefined : slotFns?.label
      })
      return
    }
    items.push({
      ...restProps,
      key: optionKey,
      [valueKey]: valueProp ?? optionKey,
      [labelKey]: hasLabelProp ? labelProp : getSlotText(toSlotChildren(slotFns?.default?.())),
      // 支持 <SelectOption disabled />：静态属性编译为空串，故空串同样视为禁用（约定）
      disabled: disabledProp === '' || Boolean(disabledProp),
      // 默认插槽：富内容由它渲染，labelInValue 的 originLabel 亦取此函数
      children: hasLabelProp ? undefined : slotFns?.default
    })
  })
  return items
}
/** 选项数据源：default 插槽（子组件式写法）存在时以插槽为准，否则取 options（本项目「插槽优先于 prop」的统一约定） */
const rawOptions = computed<Option[]>(() => (slots.default ? parseSlotOptions(slots.default()) : props.options))
/** 是否为「分组」形态：任一 option 的分组字段是非空数组即成立 */
const hasGroupedOptions = computed(() =>
  rawOptions.value.some((option) => {
    const children = option?.[groupField.value]
    return Array.isArray(children) && children.length > 0
  })
)
/**
 * 参与选中 / 过滤 / 键盘导航的扁平候选集：
 * 分组形态取组内子选项（组条目本身不可选中），非分组形态即原始 options。
 * 分组标题只在渲染时插入、不进索引空间 —— 故 change 第 3 参（展示列表下标）与扁平候选保持一致。
 */
const flatOptions = computed<Option[]>(() => {
  if (!hasGroupedOptions.value) return rawOptions.value
  return rawOptions.value.flatMap((option) => {
    const children = option?.[groupField.value]
    return Array.isArray(children) && children.length > 0 ? (children as Option[]) : [option]
  })
})
/**
 * 子选项值 → 所属分组信息：渲染分组标题用。
 * 同时保存分组键（key 缺省时回落组序号）—— 标题内容可能是 VNode 数组，无法用引用比较判断是否跨组
 */
const optionGroups = computed(() => {
  const groups = new Map<string, { option: Option; groupKey: string | number }>()
  if (!hasGroupedOptions.value) return groups
  rawOptions.value.forEach((option, index) => {
    const children = option?.[groupField.value]
    if (!Array.isArray(children) || !children.length) return
    const groupKey = getOptionValue(option) ?? index
    ;(children as Option[]).forEach((child) => {
      const childValue = getOptionValue(child)
      if (childValue !== undefined && childValue !== null) {
        groups.set(String(childValue), { option, groupKey })
      }
    })
  })
  return groups
})
const isMultiple = computed(() => props.mode === 'multiple' || props.mode === 'tags') // 是否多选模式（含标签模式）
const isTagsMode = computed(() => props.mode === 'tags') // 是否标签模式（输入内容即可创建新条目）
// 搜索能力：显式 showSearch 优先；未指定时多选（含 tags）默认可搜索，单选默认不可搜索（约定：showSearch ?? multiple）
const mergedShowSearch = computed(() => props.showSearch ?? isMultiple.value)
// 箭头显示：多选默认不显示箭头（约定），loading 时显示（后缀位置由加载中图标接管）
const mergedShowArrow = computed(() => props.showArrow ?? (props.loading || !isMultiple.value))
const mergedOpen = computed(() => (props.open !== undefined ? props.open : showOptions.value))
const mergedSearchValue = computed(() => (props.searchValue !== undefined ? props.searchValue : innerSearchValue.value))
// labelInValue
/** 是否为 labelInValue 对象（约定：非对象 / 数组 / 空值一律视为原始值） */
function isLabeledValue(value: unknown): value is LabeledValue {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}
/** 取 labelInValue 对象的原始选中值（缺省回落 key） */
function getRawValue(item: SelectValue | LabeledValue): SelectValue | undefined {
  if (!isLabeledValue(item)) return item
  return item.value ?? item.key
}
/** v-model 入参归一为数组：数组原样、单值包成单元素数组、空值为空数组 */
function toValueItems(value: Props['value']): (SelectValue | LabeledValue)[] {
  if (Array.isArray(value)) return value
  if (value === undefined || value === null) return []
  return [value]
}
/** 入参 labelInValue 对象携带的 label：回填文本与事件回传时保留调用方传入的文本（约定：入参 label 优先于选项数据） */
const incomingLabels = computed(() => {
  const labels = new Map<SelectValue, unknown>()
  toValueItems(props.value).forEach((item) => {
    if (!isLabeledValue(item) || item.label === undefined) return
    const raw = getRawValue(item)
    if (raw !== undefined) labels.set(raw, item.label)
  })
  return labels
})
/** 选项展示内容：入参 label 优先 > optionLabelProp 指定字段 > label 字段 > value 兜底（约定） */
function resolveLabel(value: SelectValue, option: Option | undefined): unknown {
  const incoming = incomingLabels.value.get(value)
  if (incoming !== undefined) return incoming
  if (props.optionLabelProp && option) {
    return option[props.optionLabelProp] ?? value
  }
  return getOptionLabel(option) ?? value
}
/** 取选项键：key 缺省时与 value 一致（约定） */
function getOptionKey(option: Option | undefined, value: SelectValue): string | number {
  const key: unknown = option?.key
  return typeof key === 'string' || typeof key === 'number' ? key : value
}
/** 原始值 → labelInValue 对象（约定：originLabel 保留子组件式写法下的默认插槽函数） */
function createLabeledValue(value: SelectValue): LabeledValue {
  const option = findOption(value)
  const label = resolveLabel(value, option)
  return {
    label,
    value,
    key: getOptionKey(option, value),
    originLabel: getOptionLabelSlot(option) ?? label
  }
}
/** 事件载荷包装：labelInValue 打开时包装为对象，否则原样返回（约定） */
function wrapValue(value: SelectValue | undefined): SelectValue | LabeledValue | undefined {
  if (value === undefined || value === null) return value
  return props.labelInValue ? createLabeledValue(value) : value
}
/** 多选事件载荷包装：labelInValue 打开时逐项包装为对象（约定） */
function wrapValues(values: SelectValue[]): SelectValue[] | LabeledValue[] {
  return props.labelInValue ? values.map((value) => createLabeledValue(value)) : values
}
// 多选值列表：单选值归一为单元素数组，labelInValue 对象取其原始值，空值统一为空数组（内部一律按原始值数组处理）
const valueList = computed<SelectValue[]>(() =>
  toValueItems(props.value)
    .map((item) => getRawValue(item))
    .filter((item): item is SelectValue => item !== undefined)
)
// 输入框展示文本：多选（非 tags）在面板关闭时不展示已输入的搜索文本（约定：重开面板时恢复）
const inputDisplayValue = computed(() =>
  isMultiple.value && !isTagsMode.value && !mergedOpen.value ? '' : mergedSearchValue.value
)
// 输入框绑定值：仍以内部状态为准（保留 v-model 在元素上维护的 composing 标记，IME 期间不触发 search），
// 仅在「多选且面板关闭」时展示为空
const inputModelValue = computed({
  get: () => inputDisplayValue.value,
  set: (value: string) => {
    innerSearchValue.value = value
  }
})
// 输入框可编辑性（约定）：tags 始终可输入；multiple 需开启 showSearch 且面板展开 / 已聚焦；单选仅看 showSearch
const inputEditable = computed(() => {
  if (isTagsMode.value) return true
  if (!isMultiple.value) return mergedShowSearch.value
  return mergedShowSearch.value && (mergedOpen.value || focused.value)
})
const selectWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const selectHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 32,
    large: 40
  }
  if (props.height !== undefined) {
    return `${props.height}px`
  }
  return `${heightMap[props.size]}px`
})
// 选项区最大高度：listHeight 显式指定时优先，否则按 maxDisplay × 单选项高度 32px
// （面板自身上下 4px 内边距不属于选项区，额外计入会让下一项漏出 8px 的一小条）
// 独立成 computed 供虚拟滚动复用，避免「样式」与「窗口换算」两处各算一遍而漂移
const optionsMaxHeight = computed(() => (props.listHeight !== undefined ? props.listHeight : props.maxDisplay * 32))
const optionsStyle = computed(() => {
  const style: CSSProperties = {
    maxHeight: `${optionsMaxHeight.value}px`
  }
  return style
})
// 选项缓存：options 动态变化时（远程搜索清空、已选项被移出列表）已选项仍需保留原 label 与原始数据
const optionCache = new Map<SelectValue, Option>()
/** 按值兜底生成选项：值不在 options 中时 label 回落 value */
function createFallbackOption(value: SelectValue): Option {
  return {
    [mergedFieldNames.value.value]: value,
    [mergedFieldNames.value.label]: value
  }
}
/** 读取选项的 value 字段 */
function getOptionValue(option: Option): SelectValue | undefined {
  return option?.[mergedFieldNames.value.value]
}
/** 读取选项的 label 字段（选项不存在时返回 undefined） */
function getOptionLabel(option: Option | undefined): unknown {
  return option?.[mergedFieldNames.value.label]
}
/** 按值查找选项：优先当前 options，其次历史缓存（options 被清空后 tag / 回填内容仍显示原 label） */
function findOption(value: SelectValue): Option | undefined {
  const current = flatOptions.value.find((option) => getOptionValue(option) === value)
  if (current) {
    optionCache.set(value, current)
    return current
  }
  return optionCache.get(value)
}
/** 判断选项是否为当前选中项 */
function isOptionSelected(option: Option): boolean {
  const value = getOptionValue(option)
  if (value === undefined || value === null) return false
  return valueList.value.includes(value)
}
// 当前选中项（单选）：value 未指定 / 为数组 / 在选项中查不到时为 undefined
const selectedOption = computed<Option | undefined>(() => {
  const value = props.value
  if (value === undefined || value === null || Array.isArray(value)) return undefined
  const raw = getRawValue(value)
  return raw === undefined ? undefined : findOption(raw)
})
// 回填内容：入参 label 优先，其次 optionLabelProp 指定字段，再取 label 字段，均缺失时回落 value
const optionLabelRaw = computed<unknown>(() => {
  const value = props.value
  if (value === undefined || value === null || Array.isArray(value)) return undefined
  const raw = getRawValue(value)
  return raw === undefined ? undefined : resolveLabel(raw, findOption(raw))
})
// 占位判定：多选在「无已选值且输入框为空（非合成中）」时展示；单选按取值判定（value 为 undefined，
// 或 value 为 null 且无 label），其余情况（含 '' / 0）都是有意义的值，不展示占位文本
const showPlaceholder = computed(() => {
  if (isMultiple.value) {
    return valueList.value.length === 0 && !inputDisplayValue.value && !isComposing.value
  }
  if (props.value === undefined) return true
  if (props.value === null) return optionLabelRaw.value === undefined || optionLabelRaw.value === null
  return false
})
const displayText = computed<unknown>(() => optionLabelRaw.value ?? props.value)
/** 回填内容的渲染节点：子组件式写法下由标签插槽渲染富内容，普通选项仍走模板插值的快速路径 */
const displayLabelContent = computed<SelectMenuNode | null>(() => {
  const labelSlot = getOptionLabelSlot(selectedOption.value)
  return labelSlot ? () => labelSlot() : null
})
const itemTitle = computed(() => {
  const text = displayText.value
  return typeof text === 'string' || typeof text === 'number' ? String(text) : undefined
})
// 多选 / 标签
const TAG_GAP = 4 // 默认标签的右外边距（与 .select-selection-item 的 margin-right 一致），用于 responsive 宽度累计
// tagRender 接管后外层不再提供外边距、标签间距由自定义内容承担，量宽时不再额外累加间距
const tagGap = computed(() => (slots.tagRender ? 0 : TAG_GAP))
// 已选项列表（多选）：按 value 顺序映射，查不到时回落缓存 / value 兜底选项
const selectedOptions = computed<Option[]>(() =>
  valueList.value.map((value) => findOption(value) ?? createFallbackOption(value))
)
/** tag 显示文本：optionLabelProp 优先，未指定取 label 字段，均缺失回落 value；超出 maxTagTextLength 时截断 */
function getTagLabel(option: Option, value: SelectValue): unknown {
  const text = resolveLabel(value, option)
  const { maxTagTextLength } = props
  if (typeof maxTagTextLength !== 'number') return text
  if (typeof text !== 'string' && typeof text !== 'number') return text
  const str = String(text)
  return str.length > maxTagTextLength ? `${str.slice(0, maxTagTextLength)}...` : text
}
/** tag 的 title：仅文本型才设置（与选项 title 口径一致） */
function getTagTitle(label: unknown): string | undefined {
  return typeof label === 'string' || typeof label === 'number' ? String(label) : undefined
}
// 可见 tag 数：number 直接截断，'responsive' 用实测值（首次量取前先全量展示），未设置时全量展示
const visibleTagCount = computed(() => {
  const total = selectedOptions.value.length
  const { maxTagCount } = props
  if (maxTagCount === 'responsive') {
    return responsiveMeasured.value ? Math.min(responsiveTagCount.value, total) : total
  }
  if (typeof maxTagCount === 'number') return Math.min(maxTagCount, total)
  return total
})
// 被折叠的 tag（maxTagPlaceholder 的 omittedValues）
const omittedOptions = computed<Option[]>(() => selectedOptions.value.slice(visibleTagCount.value))
// 折叠提示默认文案（约定：+ N ...）
const omittedText = computed(() => `+ ${omittedOptions.value.length} ...`)
// 折叠提示内容：prop（函数 / 节点 / 文本）优先，未传时用默认文案；插槽在模板中优先于 prop
const omittedContent = computed<unknown>(() => {
  const { maxTagPlaceholder } = props
  if (typeof maxTagPlaceholder === 'function') {
    return maxTagPlaceholder(omittedOptions.value)
  }
  return maxTagPlaceholder ?? omittedText.value
})
// tag 渲染数据（模板遍历用）：value / label / 可移除性 / 是否被折叠 / tagRender 参数，避免在模板里反复取值
const tagItems = computed(() => {
  const visibleCount = visibleTagCount.value
  return selectedOptions.value.map((option, index) => {
    const value = getOptionValue(option) as SelectValue
    const label = getTagLabel(option, value)
    const closable = !props.disabled && !option.disabled
    const disabled = Boolean(option.disabled)
    const params: TagRenderParams = {
      label,
      value,
      disabled,
      closable,
      onClose: (e?: MouseEvent) => {
        e?.stopPropagation()
        if (closable) {
          removeTag(option)
        }
      },
      option
    }
    // 子组件式写法下由标签插槽渲染富内容，普通选项仍走模板插值的快速路径
    const labelSlot = getOptionLabelSlot(option)
    const labelContent: SelectMenuNode | null = labelSlot ? () => labelSlot() : null
    return { option, value, label, labelContent, closable, disabled, hidden: index >= visibleCount, params }
  })
})
// 自定义 tag 移除图标：插槽优先（项目约定），其次 prop；统一包成函数组件便于模板以 <component :is> 渲染
const customRemoveIcon = computed<SelectMenuNode | null>(() => {
  if (slots.removeIcon) {
    return () => slots.removeIcon!()
  }
  const icon = props.removeIcon
  if (!icon) return null
  return () => [typeof icon === 'function' ? (icon as () => VNode)() : icon]
})
/**
 * 计算 responsive 模式下的可见 tag 数：
 * 全部 tag 始终渲染在 DOM 中（被折叠项以绝对定位隐藏，不占位但可量宽），
 * 因此直接量取每个 tag 的真实宽度（含 tagRender 的自定义渲染），无需额外的镜像节点
 */
function measureResponsiveTagCount(): void {
  const container = selectContentRef.value
  if (!container || props.maxTagCount !== 'responsive') return
  const total = selectedOptions.value.length
  const tagNodes = Array.from(
    container.querySelectorAll<HTMLElement>('.select-selection-item:not(.select-selection-item-rest)')
  )
  const restNode = container.querySelector<HTMLElement>('.select-selection-item-rest')
  const restWidth = restNode ? restNode.offsetWidth + tagGap.value : 0
  const containerStyle = getComputedStyle(container)
  const available =
    container.clientWidth - parseFloat(containerStyle.paddingLeft) - parseFloat(containerStyle.paddingRight)
  let used = 0
  let count = 0
  for (let index = 0; index < tagNodes.length; index++) {
    const width = tagNodes[index].offsetWidth + tagGap.value
    // 折叠后还需额外放下「折叠提示」tag，最后一项无需预留
    const need = width + (index < total - 1 ? restWidth : 0)
    if (used + need > available) break
    used += width
    count = index + 1
  }
  if (count !== responsiveTagCount.value) {
    responsiveTagCount.value = count
  }
  responsiveMeasured.value = true
}
// responsive 折叠：容器宽度由 ResizeObserver 兜住，tag 数量 / 文本 / 尺寸变化时由 watch 兜住
// （maxTagTextLength / optionLabelProp 直接决定 tag 文本宽度，但不改变选中项引用与容器宽度，故须显式纳入依赖）
useResizeObserver(selectContentRef, () => measureResponsiveTagCount())
watch(
  [
    () => props.maxTagCount,
    () => props.size,
    () => props.maxTagTextLength,
    () => props.optionLabelProp,
    selectedOptions
  ],
  () => {
    if (props.maxTagCount === 'responsive') {
      nextTick(measureResponsiveTagCount)
    }
  },
  { flush: 'post' }
)
// tags 模式的选项全集：已选值若不在 options 中，补成伪选项，使新建的标签出现在下拉列表中（约定）
const filledOptions = computed<Option[]>(() => {
  if (!isTagsMode.value) return flatOptions.value
  const existed = new Set(flatOptions.value.map((option) => getOptionValue(option)))
  const patchValues = valueList.value
    .filter((value) => !existed.has(value))
    .sort((valueA, valueB) => (valueA < valueB ? -1 : 1))
  return [...flatOptions.value, ...patchValues.map((value) => createFallbackOption(value))]
})
// 过滤后的选项：filterOption 为 false 或搜索文本为空时不过滤
// 默认过滤字段：optionFilterProp 优先，未指定时按 value 字段匹配（大小写不敏感）
const filteredOptions = computed<Option[]>(() => {
  const keyword = mergedSearchValue.value
  if (!keyword || props.filterOption === false) return filledOptions.value
  const upperKeyword = keyword.toUpperCase()
  const filterProp = props.optionFilterProp ?? mergedFieldNames.value.value
  const filterOption = props.filterOption
  return filledOptions.value.filter((option) => {
    if (typeof filterOption === 'function') {
      return Boolean(filterOption(keyword, option))
    }
    return String(option?.[filterProp] ?? '')
      .toUpperCase()
      .includes(upperKeyword)
  })
})
// tags 模式：输入内容未命中任何选项时，把它作为「新建标签」伪选项置于列表首位，可直接点击 / 回车选中（约定）
const searchFilledOptions = computed<Option[]>(() => {
  if (!isTagsMode.value) return filteredOptions.value
  const keyword = mergedSearchValue.value
  if (!keyword) return filteredOptions.value
  const filterProp = props.optionFilterProp ?? mergedFieldNames.value.value
  const matched = filteredOptions.value.some((option) => option?.[filterProp] === keyword)
  return matched ? filteredOptions.value : [createFallbackOption(keyword), ...filteredOptions.value]
})
// 展示用选项：传了 filterSort 时对过滤结果排序（语义：仅搜索场景生效）
const displayOptions = computed<Option[]>(() => {
  const filterSort = props.filterSort
  if (!filterSort) return searchFilledOptions.value
  return [...searchFilledOptions.value].sort((optionA, optionB) => filterSort(optionA, optionB))
})
// 虚拟滚动（大数据量只渲染可视区）
// 选项行高：与 .select-option / .select-option-group 的实际行高一致（默认 32px），
// 既是渲染窗口的换算基准，也是上下占位区高度的换算基准
const DEFAULT_ROW_HEIGHT = 32
// 可视区上下各多渲染 1 行：快速滚动时内容不落在窗口空隙里
const VIRTUAL_OVERSCAN = 1
const rowHeight = computed(() => (props.listItemHeight > 0 ? props.listItemHeight : DEFAULT_ROW_HEIGHT))
/**
 * 虚拟滚动开关（开关判定）：
 * dropdownMatchSelectWidth 为 false 时面板宽度按内容自适应，须全量渲染才能量出真实宽度，故自动关闭虚拟滚动
 */
const virtualEnabled = computed(() => props.virtual !== false && props.dropdownMatchSelectWidth !== false)
/** 渲染行：分组标题行与选项行各占一个行高，故「行下标 × 行高」即可换算任意行的滚动位置 */
interface MenuRow {
  key: string // 行唯一键
  option?: Option // 选项行（与 group 二选一）
  group?: Option // 分组标题行
  optionIndex?: number // 该行在 displayOptions 中的扁平下标（分组标题行无此值）
}
const menuRows = computed<MenuRow[]>(() => {
  const rows: MenuRow[] = []
  let lastGroupKey: string | number | undefined
  displayOptions.value.forEach((option, index) => {
    const group = optionGroups.value.get(String(getOptionValue(option)))
    if (group && group.groupKey !== lastGroupKey) {
      // key 带上 rows.length：同一分组键在列表中不连续出现两次时也不会撞键
      rows.push({ key: `group-${String(group.groupKey)}-${rows.length}`, group: group.option })
    }
    lastGroupKey = group?.groupKey
    rows.push({ key: `option-${index}`, option, optionIndex: index })
  })
  return rows
})
/** 扁平选项下标 → 渲染行下标：键盘导航与滚动定位均按下标换算，与目标行是否已渲染无关 */
const optionRowIndexMap = computed(() => {
  const map = new Map<number, number>()
  menuRows.value.forEach((row, rowIndex) => {
    if (row.optionIndex !== undefined) {
      map.set(row.optionIndex, rowIndex)
    }
  })
  return map
})
const totalRowsHeight = computed(() => menuRows.value.length * rowHeight.value)
/** 是否真正窗口化：开启虚拟滚动且内容高于面板（装得下时全量渲染，虚拟列表同款判定） */
const virtualActive = computed(() => virtualEnabled.value && totalRowsHeight.value > optionsMaxHeight.value)
/** 面板可视区高度：内容装不下时即面板最大高度 */
const virtualViewportHeight = computed(() => Math.min(optionsMaxHeight.value, totalRowsHeight.value))
const virtualScrollTop = ref(0) // 面板滚动位置（由容器原生 scroll 事件同步），作为渲染窗口起点
/** 当前高亮项在 displayOptions 中的扁平下标（无高亮时为 -1） */
const activeOptionIndex = computed(() =>
  displayOptions.value.findIndex((option) => !option.disabled && getOptionValue(option) === hoverValue.value)
)
/** 渲染窗口 [start, end)：滚动位置决定起点，末端一屏 + 上下缓冲行 */
const renderWindow = computed(() => {
  const total = menuRows.value.length
  if (!virtualActive.value) {
    return { start: 0, end: total }
  }
  const height = rowHeight.value
  const top = virtualScrollTop.value
  const start = Math.max(0, Math.floor(top / height) - VIRTUAL_OVERSCAN)
  const end = Math.min(total, Math.ceil((top + virtualViewportHeight.value) / height) + VIRTUAL_OVERSCAN)
  return { start, end }
})
/**
 * 高亮行的行下标 / 是否落在渲染窗口内。
 * ⚠️ 不把高亮行强行纳入窗口：鼠标悬浮行与滚动位置是两个独立状态，强制纳入会让「滚动后窗口跳回悬浮行」
 * （等于与用户滚动对抗）。改为：高亮行不在窗口内时不设置 aria-activedescendant，避免指向不存在的节点。
 */
const activeRowIndex = computed(() => optionRowIndexMap.value.get(activeOptionIndex.value))
const activeRowRendered = computed(() => {
  const row = activeRowIndex.value
  return row !== undefined && row >= renderWindow.value.start && row < renderWindow.value.end
})
const visibleRows = computed(() => menuRows.value.slice(renderWindow.value.start, renderWindow.value.end))
// 上下占位高度：未被渲染的区间用等高空 div 撑出，使滚动条长度与全量渲染时等价
const virtualTopHeight = computed(() => (virtualActive.value ? renderWindow.value.start * rowHeight.value : 0))
const virtualBottomHeight = computed(() =>
  virtualActive.value ? (menuRows.value.length - renderWindow.value.end) * rowHeight.value : 0
)
// 可访问性（ARIA）
// id 在 SSR 与客户端须一致，故用模块级自增序号而非时间戳（见文件顶部 nextSelectId）
const innerSelectId = nextSelectId()
const mergedSelectId = computed(() => props.id || innerSelectId)
const listboxId = computed(() => `${mergedSelectId.value}_list`)
/** 选项 DOM id：`${id}_list_${扁平下标}`，供 aria-activedescendant 指向 */
function optionDomId(optionIndex: number): string {
  return `${listboxId.value}_${optionIndex}`
}
/** 当前高亮项对应的 DOM id：面板未展开 / 无高亮 / 高亮行不在渲染窗口内时均不设置（避免指向不存在的节点） */
const activeDescendantId = computed(() =>
  mergedOpen.value && activeRowRendered.value && activeOptionIndex.value >= 0
    ? optionDomId(activeOptionIndex.value)
    : undefined
)
/** 屏幕阅读器播报文本：面板关闭时聚合已选内容（隐藏 aria-live 节点同款） */
const screenReaderText = computed(() => {
  if (mergedOpen.value) return ''
  return selectedOptions.value
    .map((option) => {
      const label = getOptionLabel(option)
      return typeof label === 'string' || typeof label === 'number'
        ? String(label)
        : String(getOptionValue(option) ?? '')
    })
    .filter((text) => text !== '')
    .join(', ')
})
// 空态内容是否存在：显式传 null 表示「不提供空态」，此时选项为空不展开面板（约定）
const hasNotFoundContent = computed(() => props.notFoundContent !== null)
const emptyListContent = computed(() => !hasNotFoundContent.value && displayOptions.value.length === 0)
// 面板可见：不仅要打开，还需有空态兜底，否则空列表下会展开一个空壳面板
const panelVisible = computed(() => mergedOpen.value && !emptyListContent.value)
// 清除图标可用：开启 allowClear、未禁用，且「有选中值或有搜索文本」
const canClear = computed(
  () => props.allowClear && !props.disabled && (!showPlaceholder.value || Boolean(mergedSearchValue.value))
)
// 是否处于「有输入文本」状态（既有口径）：此时隐藏回填内容与占位文本
const hasTextInput = computed(() => {
  if (!mergedShowSearch.value && !mergedOpen.value) return false
  return Boolean(mergedSearchValue.value) || isComposing.value
})
// 后缀图标形态：打开且可搜索时显示搜索图标，其余显示箭头（自定义后缀 / loading 分支在模板中优先命中）
const showSearchIcon = computed(() => mergedOpen.value && mergedShowSearch.value)
// 定位内核：只做「算 + 输出 + 同步」，本组件不再自研翻转 / 对齐几何
// （须声明在 panelVisible 之后：enabled 会在内核注册时立即求值，前置会命中 const 的暂时性死区）
const floatingPlacement = computed<FloatingPlacement>(() => props.placement)
// 面板与触发器的宽度契约：true 等宽、false 仅最小等宽（内容自适应）、number 指定面板宽度
const matchTriggerWidth = computed<'width' | 'minWidth' | number>(() => {
  if (typeof props.dropdownMatchSelectWidth === 'number') {
    return props.dropdownMatchSelectWidth
  }
  return props.dropdownMatchSelectWidth ? 'width' : 'minWidth'
})
const {
  panelStyle,
  transformOrigin,
  sync: syncFloating
} = useFloating(selectPanelRef, {
  anchor: () => selectContentRef.value,
  offsetContainer: selectPanelWrapperRef,
  placement: () => floatingPlacement.value,
  flip: () => props.flip,
  // 次轴：dropdownMatchSelectWidth 为 false 时面板按内容自适应，可能横向溢出，故交由内核做对齐自适应与微调
  shift: true,
  offset: 4, // 主轴间距：面板紧贴锚点外 4px
  boundary: 'scrollParent', // 复用 getFloatingBoundaryRect 口径：仅当浮层真被滚动容器裁剪时才以容器为界
  matchTriggerWidth: () => matchTriggerWidth.value,
  enabled: () => panelVisible.value
})
// 触发器「自身尺寸」变化时重算面板位置：内核的 'resize' 只监听视口（window），
// 锚点自身长高不会触发重算 —— 典型场景是多选标签逐条增多换行，触发器由一行变两行，
// 面板仍停在旧位置，与触发器互相遮挡错位（如「隐藏已选择选项」用例选到一定条数时）
useResizeObserver(selectContentRef, () => {
  if (panelVisible.value) {
    syncFloating()
  }
})
// 面板层级：显式 zIndex 优先于自动分配 / 默认层级（与其它浮层组件的 zIndex prop 同一优先级契约）
const selectPanelZIndex = computed(() => props.zIndex ?? layerZIndex.value)
// 面板内联样式：内核输出（定位 + 动画原点）+ 使用者自定义样式 + 层级 + 主题变量
// 顺序与 AutoComplete 一致：dropdownMenuStyle 可覆盖定位，但层级与主题变量始终由组件接管
// 面板挂载在 Teleport 目标下（可能是 body），拿不到组件根上的 CSS 变量，故面板用到的变量在此重复声明
const selectPanelStyle = computed<CSSProperties>(() => ({
  ...panelStyle.value,
  transformOrigin: transformOrigin.value,
  ...props.dropdownMenuStyle,
  zIndex: selectPanelZIndex.value,
  '--select-option-bg-color-active': colorPalettes.value[0],
  '--select-primary-color': colorPalettes.value[5]
}))

watch(
  () => props.open,
  (val) => {
    if (typeof val === 'boolean') {
      showOptions.value = val
    }
  },
  { immediate: true }
)
// 受控 searchValue：外部变更同步到内部可写目标（v-model 绑定的就是该目标），
// 呈现层统一读 mergedSearchValue，故受控时内部值仅作镜像、不参与过滤
watch(
  () => props.searchValue,
  (val) => {
    if (val !== undefined && val !== innerSearchValue.value) {
      innerSearchValue.value = val
    }
  },
  { immediate: true }
)
// 非受控模式下由内部状态变化上报开合事件；
// 受控模式的事件由 setPanelOpen 在「用户请求变更」时派发，此处必须跳过 ——
// 否则外部改 open 驱动状态变化也会被回传成一次多余事件，事件方向就反了
watch(showOptions, (open) => {
  if (props.open === undefined) {
    emitPanelChange(open)
  }
})
// 面板首次出现时才用 v-if 渲染浮层 DOM；此后由 v-show 控制显隐
// 每次「出现」重新领取层级（与 Popup / Modal / Drawer 同一语义）：面板关闭后不卸载（仅 v-show），
// 若只在挂载时领取一次，则被承载它的 Modal / Drawer 等「重新出现并置顶」后，二次打开的下拉会落到遮罩之下。
// 关闭时归还槽位（面板元素保留、内联层级不变）：否则「弹窗 ↔ 下拉」交替出现时两者会互相抬升，层级随开合次数持续增长
watch(panelVisible, async (visible) => {
  if (!visible) {
    releaseZIndex()
    return
  }
  if (!initialDisplay.value) {
    initialDisplay.value = true
  }
  allocateZIndex()
  await nextTick()
  // 无分配器时同层级浮层的上下关系由 DOM 顺序决定，故每次展开都把容器移到目标末尾 ——
  // 使顺序等于「最近一次打开的顺序」（就地渲染时容器在组件自身 DOM 内，不能移动）
  if (resolvedTo.value !== false) {
    raiseFloatingOrder(selectPanelWrapperRef.value)
  }
})
/**
 * 打开面板时的高亮 / 滚动处理：仅「单选且已有选中值」把高亮复位到选中项并滚入可视区；
 * 其余情形（多选 / 标签 / 单选无值）保留用户上次移动的高亮与滚动位置，避免打断已定位的位置
 */
watch(panelVisible, async (visible) => {
  if (!visible) {
    // 收起前先记下用户看到的滚动位置：本分支早于 v-show 生效（pre 队列先于渲染副作用），容器此刻仍可见；
    // 一旦隐藏，浏览器会把容器 scrollTop 归零（Chrome 实测），之后再也读不到关闭前的位置
    onContainerScroll()
    return
  }
  await nextTick()
  // 面板 DOM 首次出现时绑定滚动监听；每次展开都恢复并同步一次滚动位置
  // （面板用 v-show 复用同一元素，滚动位置跨开合保留；详见 bindScrollContainer 注释）
  bindScrollContainer()
  if (isMultiple.value) return
  const selectedIndex = displayOptions.value.findIndex((option) => !option.disabled && isOptionSelected(option))
  if (selectedIndex < 0) return
  hoverValue.value = getOptionValue(displayOptions.value[selectedIndex]) ?? null
  await scrollRowIntoView(optionRowIndexMap.value.get(selectedIndex) ?? -1)
})
// 选项列表变化（搜索过滤 / options 更新）后同步滚动位置：浏览器可能已把 scrollTop 夹到新的内容高度，
// 组件内的镜像值不同步会让渲染窗口落在错误区间（如清空搜索后仍从旧偏移开始渲染）
watch(menuRows, () => nextTick(onContainerScroll), { flush: 'post' })
// 默认高亮：defaultActiveFirstOption 为 true 时高亮首个可用项，为 false 时清空高亮
// （依赖为选项列表本身，故面板开合不会重置用户已移动的高亮位置）
watchEffect(() => {
  if (!props.defaultActiveFirstOption) {
    hoverValue.value = null
    return
  }
  const firstEnabled = displayOptions.value.find((option) => !option.disabled)
  hoverValue.value = firstEnabled ? (getOptionValue(firstEnabled) ?? null) : null
})
// 承载层（Modal / Drawer / Dialog）关闭时收起面板并归位聚焦态（容器不卸载内容，面板不会随容器消失）：
// ① 面板停留打开态会占着层级槽位、被重新打开的容器反超（详见 z-index.ts 的 Z_INDEX_CONTAINER_OPEN_KEY）；
// ② 容器关闭不派发 blur，不显式归位则容器重开时仍残留聚焦描边与阴影
const containerOpen = inject(Z_INDEX_CONTAINER_OPEN_KEY, null) as Ref<boolean> | null
if (containerOpen) {
  watch(containerOpen, (open) => {
    if (!open) {
      closePanel()
      focused.value = false
      hoverValue.value = null
    }
  })
}
onMounted(() => {
  // autofocus：挂载后自动获取焦点
  if (props.autofocus && !props.disabled) {
    selectFocus()
  }
  // defaultOpen：非受控时初始展开下拉面板
  if (props.defaultOpen && props.open === undefined && !props.disabled) {
    openPanel()
  }
  // firstActiveValue：指定默认高亮项（数组取首项）
  if (props.firstActiveValue !== undefined) {
    const first = Array.isArray(props.firstActiveValue) ? props.firstActiveValue[0] : props.firstActiveValue
    hoverValue.value = first ?? null
  }
  // responsive 折叠：挂载时同步量取一次（读布局属性会强制回流拿到真实宽度），
  // 使首帧就按容器宽度折叠，避免 tag 先铺满再收起的闪烁
  measureResponsiveTagCount()
})

/** 面板滚动容器：虚拟滚动的滚动源，也是高亮滚动 / scrollTo 的操作对象 */
function getScrollContainer(): HTMLElement | null {
  return selectPanelRef.value?.querySelector<HTMLElement>('.scrollbar-container') ?? null
}
const scrollContainerEl = ref<HTMLElement | null>(null) // 已绑定 scroll 监听的容器
/** 把容器的真实滚动位置同步进组件（滚动事件 / 定位后 / 面板收起前调用） */
function onContainerScroll(): void {
  const container = scrollContainerEl.value
  if (container) {
    virtualScrollTop.value = container.scrollTop
  }
}
/**
 * 代理面板滚轮滚动：原生滚动由合成线程先行、窗口化渲染在主线程计算，快速滚动时渲染窗口追不上，
 * 视口下沿会露出未渲染的占位区（面板底部先空白、随后被文本填充）→ 虚拟滚动生效时接管 wheel，
 * 阻止原生滚动并按 delta 自行写 scrollTop，使滚动位置与渲染窗口同帧生效（到边界且方向朝外时不拦截，保留滚动链）
 */
function onPanelWheel(e: WheelEvent): void {
  if (!virtualActive.value) return
  const container = scrollContainerEl.value
  if (!container) return
  const maxTop = Math.max(container.scrollHeight - container.clientHeight, 0)
  // deltaMode 归一：行模式按行高换算（Firefox 鼠标滚轮固定 deltaY=±3，不换算会近乎不动）、页模式按可视区高度
  const unit = e.deltaMode === 1 ? rowHeight.value : e.deltaMode === 2 ? container.clientHeight : 1
  const nextTop = Math.min(Math.max(container.scrollTop + e.deltaY * unit, 0), maxTop)
  if (nextTop === container.scrollTop) return
  e.preventDefault()
  container.scrollTop = nextTop
  // 同任务内同步窗口起点，不等 scroll 事件（同步改 DOM 与状态）：
  // 渲染窗口与滚动位置在同一次「事件 → 微任务渲染」内一起生效，帧内不留空隙
  onContainerScroll()
}
/**
 * 绑定滚动容器的原生 scroll 监听。
 * 虚拟滚动的窗口起点必须与真实滚动位置实时同步，直接监听容器原生 scroll 可让滚轮 / 触控板 /
 * 程序化滚动等全部来源都同步（不依赖 Scrollbar 组件事件的派发条件与方向判定）
 */
function bindScrollContainer(): void {
  const container = getScrollContainer()
  if (!container) return
  if (container !== scrollContainerEl.value) {
    scrollContainerEl.value?.removeEventListener('scroll', onContainerScroll)
    scrollContainerEl.value?.removeEventListener('wheel', onPanelWheel)
    container.addEventListener('scroll', onContainerScroll, { passive: true })
    // 须非 passive：wheel 代理要能 preventDefault 掉原生滚动
    container.addEventListener('wheel', onPanelWheel, { passive: false })
    scrollContainerEl.value = container
  }
  /*
    先按组件内记录的偏移恢复容器位置，再回读真实值对齐：display:none 期间浏览器会把容器 scrollTop
    归零且不恢复（Chrome 实测），只回读会丢掉关闭前的偏移 → 面板重开后一片空白（渲染窗口仍按旧偏移
    切片、容器停在顶部）；偏移超出新内容高度时由浏览器夹取，容器位置与渲染窗口始终一致
  */
  if (container.scrollTop !== virtualScrollTop.value) {
    container.scrollTop = virtualScrollTop.value
  }
  onContainerScroll()
}
onBeforeUnmount(() => {
  scrollContainerEl.value?.removeEventListener('scroll', onContainerScroll)
  scrollContainerEl.value?.removeEventListener('wheel', onPanelWheel)
})
/**
 * 将指定渲染行滚入可视区（已可见时不做任何滚动）。
 * 按「行下标 × 行高」换算滚动位置，不查目标行的 DOM —— 虚拟滚动下目标行可能尚未渲染；
 * 且位置由下标算出，天然不受面板 enter 缩放动画（transform）影响
 */
function scrollRowIntoViewSync(rowIndex: number): void {
  if (rowIndex < 0) return
  const container = getScrollContainer()
  if (!container) return
  const height = rowHeight.value
  const rowTop = rowIndex * height
  const rowBottom = rowTop + height
  const { scrollTop, clientHeight } = container
  if (rowTop < scrollTop) {
    container.scrollTop = rowTop
  } else if (rowBottom > scrollTop + clientHeight) {
    container.scrollTop = rowBottom - clientHeight
  }
  onContainerScroll()
}
/** 面板首帧渲染前容器 DOM 尚未存在，故等一个 tick 再滚动 */
async function scrollRowIntoView(rowIndex: number): Promise<void> {
  if (rowIndex < 0) return
  await nextTick()
  scrollRowIntoViewSync(rowIndex)
}
/**
 * 面板开合状态变更 / 用户开合请求的统一上报：
 * open 为纯受控属性（显隐由外部驱动），组件同时派发 openChange（项目惯例）与 dropdownVisibleChange（对应的对外事件）
 */
function emitPanelChange(open: boolean): void {
  emits('openChange', open)
  emits('dropdownVisibleChange', open)
}
/**
 * 统一控制面板显隐：非受控直接改内部状态（事件由 watch(showOptions) 上报）；
 * 受控不改内部状态，但必须把用户的「开合请求」上报（直接 return 会让点击 / 输入既不开面板也不派发事件），
 * 与目标值相同的请求不重复上报
 */
function setPanelOpen(open: boolean): void {
  if (props.open === undefined) {
    showOptions.value = open
  } else if (props.open !== open) {
    emitPanelChange(open)
  }
}
/** 展开面板（禁用态不响应） */
function openPanel(): void {
  if (!props.disabled) {
    setPanelOpen(true)
  }
}
/** 收起面板：单选同时复位搜索文本（重开面板不应残留上次输入）；多选保留（重开面板时恢复） */
function closePanel(): void {
  setPanelOpen(false)
  if (mergedShowSearch.value && !isMultiple.value) {
    setSearchValue('')
  }
}
/** 设置搜索文本：受控（searchValue）时仅回传事件，非受控时同步内部状态 */
function setSearchValue(value: string): void {
  innerSearchValue.value = value
  if (props.searchValue !== undefined) {
    emits('update:searchValue', value)
  }
}
/**
 * tokenSeparators 分词：命中分隔符时返回拆分结果（过滤空串），未命中返回 null
 * （分词实现一致：只输入分隔符会得到空数组，此时清空输入但不产生新值）
 */
function splitByTokenSeparators(text: string): string[] | null {
  const separators = props.tokenSeparators ?? []
  if (!separators.length) return null
  let matched = false
  let result = [text]
  separators.forEach((separator) => {
    const next: string[] = []
    result.forEach((item) => {
      const parts = item.split(separator)
      if (parts.length > 1) matched = true
      next.push(...parts)
    })
    result = next
  })
  return matched ? result.filter((item) => item) : null
}
/** 分词结果转为选中值：tags 模式直接建标签，multiple 模式按 label 匹配已有选项取其 value（约定） */
function submitSeparatedValues(words: string[]): void {
  const labelField = mergedFieldNames.value.label
  const patchValues: SelectValue[] = isTagsMode.value
    ? words
    : words
        .map((word) => flatOptions.value.find((option) => option?.[labelField] === word))
        .map((option) => (option ? getOptionValue(option) : undefined))
        .filter((value): value is SelectValue => value !== undefined)
  emitMultipleChange(Array.from(new Set([...valueList.value, ...patchValues])))
  patchValues.forEach((value) => emits('select', wrapValue(value), findOption(value) ?? createFallbackOption(value)))
  // 分词完成即收起面板（行为：粘贴 / 输入分隔符视为一轮输入结束）
  setPanelOpen(false)
}
/** 搜索文本变更：多选下先尝试分词，未命中分词时更新文本、派发 search、并展开面板 */
function handleSearch(value: string): void {
  if (isMultiple.value) {
    const words = splitByTokenSeparators(value)
    if (words) {
      submitSeparatedValues(words)
      setSearchValue('')
      // 同一轮 input 事件里 v-model 已把原文写入内部状态、随后又被上面清回空串，
      // 该 computed 的净变化为零 → Vue 不触发重渲染（实测 3.5.42）→ 输入框会残留分词前的原文
      // （面板未开合、无其它状态变化时尤为明显），故在此显式清空输入框的 DOM 值
      if (inputRef.value) {
        inputRef.value.value = ''
      }
      return
    }
  }
  setSearchValue(value)
  emits('search', value)
  if (!mergedOpen.value && !props.disabled) {
    openPanel()
  }
}
function selectFocus(): void {
  inputRef.value?.focus() // 通过 input 标签聚焦来模拟 select 整体聚焦效果
}
function onFocus(): void {
  focused.value = true
  emits('focus')
}
/**
 * 焦点离开组件（触发器 blur 与面板 focusout 共用）
 *
 * 焦点仍在本组件内时（面板内自定义内容之间移动、或回到触发器本身）不收起：
 * 后者由触发器的 click 统一决定开合，此处若抢先收起会出现「点触发器关不掉 / 打不开」的抖动
 *
 * 面板侧的 focusout 是必需的一环：焦点进入面板内的自定义内容（dropdownRender 的输入框等）时
 * 触发器的 input 已经失焦，此后焦点再离开面板不会再触发它的 blur，仅靠 input 的 blur 面板将无法关闭
 */
function onBlur(e?: FocusEvent): void {
  if (props.disabled) return
  const related = (e?.relatedTarget as Node | null) ?? null
  if (related && (selectPanelRef.value?.contains(related) || selectWrapRef.value?.contains(related))) return
  // 多选下焦点真正离开组件时处理残留的搜索文本：tags 提交为新标签，multiple 静默清空（约定）
  if (isMultiple.value && mergedSearchValue.value) {
    if (isTagsMode.value) {
      submitTag()
    } else {
      setSearchValue('')
    }
  }
  focused.value = false
  closePanel()
  emits('blur')
}
/**
 * 触发器 mousedown：阻止输入框以外的区域抢走焦点
 *
 * 点击触发器上的非可聚焦部分（文本、箭头、清除图标）会让 input 失焦 → blur 关闭面板，
 * 随后 click 里的 toggle 又把面板打开，表现为「点触发器关不掉面板」。
 * 仅当事件目标是输入框本身时放行，以保留浏览器原生的聚焦与光标定位。
 */
function onMousedown(e: MouseEvent): void {
  if (e.target !== inputRef.value) {
    e.preventDefault()
  }
}
/**
 * 面板 mousedown：阻止面板内的非输入类区域抢走触发器焦点（否则 input 失焦 → blur 关闭面板）；
 * dropdownRender 等自定义区域内的输入类元素必须拿到焦点，故对其放行 —— 随之而来的 blur
 * 由 onBlur 的「焦点是否仍在面板内」判定放行，面板保持展开
 */
function onPanelMousedown(e: MouseEvent): void {
  const target = e.target as HTMLElement | null
  if (target?.closest('input, textarea, select, [contenteditable]')) return
  e.preventDefault()
}
function onMouseEnter(e: MouseEvent): void {
  emits('mouseenter', e)
}
function onMouseLeave(e: MouseEvent): void {
  emits('mouseleave', e)
}
function onPopupScroll(e: Event): void {
  emits('popupScroll', e)
}
function onSearchInput(e: Event): void {
  // 输入法合成中不触发 search / 过滤：以 v-model 在元素上维护的 composing 标记为准
  // （v-model 会在 compositionend 时先清标记、再补发一次 input，故此处无需自行补触发，且不受监听器顺序影响）
  const el = e.target as HTMLInputElement & { composing?: boolean }
  if (el?.composing) return
  handleSearch(el?.value ?? '')
}
function onCompositionStart(): void {
  isComposing.value = true
}
function onCompositionEnd(): void {
  isComposing.value = false
}
/** 点击触发器：开合面板（禁用态不响应） */
function toggleSelect(): void {
  if (props.disabled) return
  if (mergedOpen.value) {
    closePanel()
    return
  }
  selectFocus()
  openPanel()
}
/** 高亮指定选项（鼠标悬浮） */
function onHover(option: Option): void {
  if (option.disabled) return
  hoverValue.value = getOptionValue(option) ?? null
}
/** 多选值是否发生变化：长度一致且逐项相等时视为未变化（change 触发条件） */
function isValueListChanged(nextValues: SelectValue[]): boolean {
  const current = valueList.value
  return nextValues.length !== current.length || nextValues.some((item, index) => item !== current[index])
}
/** 多选值变更统一出口：同步 v-model 并派发 change（多选下第 3 参 index 不适用，固定传 undefined） */
function emitMultipleChange(nextValues: SelectValue[]): void {
  if (!isValueListChanged(nextValues)) return
  const payload = wrapValues(nextValues)
  emits('update:value', payload)
  emits(
    'change',
    payload,
    nextValues.map((value) => findOption(value) ?? createFallbackOption(value)),
    undefined
  )
}
/** 移除标签（标签上的移除按钮 / 退格键共用）：派发 change + deselect，并保持输入框聚焦 */
function removeTag(option: Option): void {
  if (props.disabled) return
  const value = getOptionValue(option)
  if (value === undefined || value === null) return
  emitMultipleChange(valueList.value.filter((item) => item !== value))
  emits('deselect', wrapValue(value), option)
  selectFocus()
}
/** tags 模式：把当前搜索文本提交为新标签（回车 / 失焦时触发） */
function submitTag(): void {
  const text = (mergedSearchValue.value || '').trim()
  if (!text) return
  const value: SelectValue = text
  const nextValues = valueList.value.includes(value) ? [...valueList.value] : [...valueList.value, value]
  emitMultipleChange(nextValues)
  emits('select', wrapValue(value), findOption(value) ?? createFallbackOption(value))
  setSearchValue('')
}
/** 选中下拉项：单选选中后回填并收起面板；多选切换选中并保持面板展开（约定） */
function onSelectOption(option: Option, index: number): void {
  const value = getOptionValue(option)
  if (!isMultiple.value) {
    // 受控比较按原始值进行：labelInValue 打开时 props.value 是对象，直接比较必然不等
    const current =
      Array.isArray(props.value) || props.value === undefined || props.value === null
        ? undefined
        : getRawValue(props.value)
    if (current !== value) {
      emits('update:value', wrapValue(value))
      emits('change', wrapValue(value), option, index)
    }
    emits('select', wrapValue(value), option)
    hoverValue.value = value ?? null
    closePanel()
    selectFocus()
    return
  }
  // 多选 / 标签：切换选中
  if (value === undefined || value === null) return
  const selected = valueList.value.includes(value)
  emitMultipleChange(selected ? valueList.value.filter((item) => item !== value) : [...valueList.value, value])
  if (selected) {
    emits('deselect', wrapValue(value), option)
  } else {
    emits('select', wrapValue(value), option)
    hoverValue.value = value
  }
  // 选中项后清空搜索文本（约定：autoClearSearchValue 为 true 时选中与反选都清空）
  if (props.autoClearSearchValue) {
    setSearchValue('')
  }
  selectFocus()
}
/** 清除选中值（仅清空自身状态，不做 v-model:value 之外的额外处理；多选清空为数组并逐个派发 deselect） */
function onClear(e?: MouseEvent): void {
  e?.stopPropagation()
  if (props.disabled) return
  const changed = isMultiple.value ? valueList.value.length > 0 : props.value !== undefined
  setSearchValue('')
  hoverValue.value = null
  closePanel()
  if (isMultiple.value && changed) {
    const clearedOptions = selectedOptions.value
    emits('update:value', [])
    emits('change', [], [], undefined)
    clearedOptions.forEach((option) => emits('deselect', wrapValue(getOptionValue(option)), option))
  } else if (changed) {
    emits('update:value', undefined)
    emits('change', undefined, undefined, undefined)
  }
  emits('clear')
  selectFocus()
}
// 键盘导航：↑↓ 移动高亮（跳过禁用项、环形，随即滚入可视区）、Enter 选中高亮项、Esc 关闭面板
// 面板未打开时 ↑↓（或任意可打印字符）打开面板，沿用既有的键盘行为
function onKeydown(e: KeyboardEvent): void {
  emits('inputKeyDown', e)
  if (props.disabled) return
  // 输入法组合中的按键全部交由 IME 处理，不驱动面板：Enter 是「确认候选 / 上屏」、↑↓ 是「切换候选页」、
  // Backspace 是「删除组合文本」——若继续执行，Enter 会误选中当前高亮项（且随后的 compositionend
  // 又把搜索文本写回输入框，表现为「凭空选中一项 + 输入框残留文本」）。
  // 判定依据：KeyboardEvent.isComposing（标准属性，IME 组合中的按键为 true）+ 组件自身维护的
  // isComposing 标记（覆盖 compositionstart ~ compositionend 整段过程，不依赖浏览器是否置位前者）
  if (e.isComposing || isComposing.value) return
  // 退格锁：记录本次按键前的搜索文本是否非空（上一次按键结束时写入），
  // 避免「清空搜索文本的同一次按键」紧接着又删掉一个标签（既有的锁语义）
  const clearLock = backspaceLock.value
  backspaceLock.value = Boolean(mergedSearchValue.value)
  const list = displayOptions.value
  // 退格删除：搜索文本为空时删除最后一个可移除的标签（多选专属，禁用项跳过）
  if (e.key === 'Backspace' && isMultiple.value && !clearLock && !mergedSearchValue.value && valueList.value.length) {
    const removable = [...selectedOptions.value].reverse().find((option) => !option.disabled)
    if (removable) {
      removeTag(removable)
    }
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (!list.length) return
    e.preventDefault()
    if (!mergedOpen.value) {
      openPanel()
      return
    }
    const isArrowDown = e.key === 'ArrowDown'
    const currentIdx = list.findIndex((option) => !option.disabled && getOptionValue(option) === hoverValue.value)
    // 环形查找下一个未禁用项：从当前项的下一个开始循环一圈；无高亮时向下从第一项、向上从最后一项开始
    let start: number
    if (currentIdx === -1) {
      start = isArrowDown ? 0 : list.length - 1
    } else {
      start = isArrowDown ? currentIdx + 1 : currentIdx - 1
    }
    const direction = isArrowDown ? 1 : -1
    let nextIdx = -1
    for (let i = 0; i < list.length; i++) {
      const idx = (start + direction * i + list.length) % list.length
      if (!list[idx].disabled) {
        nextIdx = idx
        break
      }
    }
    // 无其他可用项（仅当前项未禁用或全部禁用）时保持原高亮
    if (nextIdx < 0 || nextIdx === currentIdx) return
    hoverValue.value = getOptionValue(list[nextIdx]) ?? null
    scrollRowIntoView(optionRowIndexMap.value.get(nextIdx) ?? -1)
    return
  }
  if (e.key === 'Enter') {
    if (!mergedOpen.value) {
      // tags 模式：面板未展开时回车把输入内容提交为新标签
      if (isTagsMode.value) {
        e.preventDefault()
        submitTag()
      }
      return
    }
    const index = list.findIndex((option) => !option.disabled && getOptionValue(option) === hoverValue.value)
    if (index < 0) {
      // 无高亮项：tags 模式把输入内容提交为新标签（既有的提交分支）
      if (isTagsMode.value) {
        e.preventDefault()
        submitTag()
      }
      return
    }
    e.preventDefault()
    onSelectOption(list[index], index)
    return
  }
  if (e.key === 'Escape' && mergedOpen.value) {
    e.preventDefault()
    closePanel()
    return
  }
  // 可打印字符（无修饰键）触发面板展开，使非搜索模式也能用键盘唤起下拉
  if (!mergedOpen.value && !isComposing.value && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    openPanel()
  }
}
/** 滚动面板选项：传数字 / index 按「扁平选项下标」定位（虚拟滚动下目标行未渲染同样有效），传 top 按滚动偏移定位 */
function scrollTo(arg: number | { index?: number; top?: number }): void {
  if (typeof arg === 'number') {
    scrollRowIntoViewSync(optionRowIndexMap.value.get(arg) ?? -1)
    return
  }
  if (arg?.index !== undefined) {
    scrollRowIntoViewSync(optionRowIndexMap.value.get(arg.index) ?? -1)
    return
  }
  if (arg?.top !== undefined) {
    const scrollContainer = getScrollContainer()
    if (!scrollContainer) return
    scrollContainer.scrollTop = arg.top
    onContainerScroll()
  }
}
/** 空态内容：插槽优先（项目约定），其次 prop，最后回落项目 Empty 组件 */
function renderNotFoundContent(): VNode | string | VNode[] {
  const notFoundSlot = slots.notFoundContent
  if (slotsExist.notFoundContent && notFoundSlot) {
    return notFoundSlot()
  }
  if (props.notFoundContent !== undefined && props.notFoundContent !== null) {
    return props.notFoundContent
  }
  return h(Empty, { image: 'outlined' })
}
/** 多选模式的默认选中图标（对勾） */
function renderCheckIcon(): VNode {
  return h(
    'svg',
    {
      class: 'select-option-check',
      focusable: 'false',
      'data-icon': 'check',
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      'aria-hidden': 'true',
      viewBox: '64 64 896 896'
    },
    [
      h('path', {
        d: 'M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'
      })
    ]
  )
}
/**
 * 选项选中态图标：多选模式默认渲染对勾；单选仅在提供 menuItemSelectedIcon（prop 或插槽）时渲染（约定）
 */
function renderOptionState(option: Option): VNode | null {
  const icon = props.menuItemSelectedIcon
  const iconSlot = slots.menuItemSelectedIcon
  const hasCustomIcon = Boolean(iconSlot) || icon !== undefined
  if (!hasCustomIcon && !isMultiple.value) return null
  const isSelected = isOptionSelected(option)
  // 函数 / 插槽形态由使用者按 isSelected 自行决定显隐，故始终渲染
  const alwaysRender = Boolean(iconSlot) || typeof icon === 'function'
  if (!alwaysRender && !isSelected) return null
  const stateNode = iconSlot
    ? iconSlot({ isSelected })
    : typeof icon === 'function'
      ? (icon as () => VNode)()
      : (icon ?? renderCheckIcon())
  return h('span', { class: 'select-option-state' }, stateNode as VNode[])
}
/**
 * 条目可见内容：子组件式写法（挂载了标签插槽函数）时取插槽渲染结果（支持图标等富内容），
 * 否则取文本 label，均缺失时回落 fallback
 */
function renderItemContent(option: Option, fallback?: unknown): string | VNode[] {
  const labelSlot = getOptionLabelSlot(option)
  if (labelSlot) return toSlotChildren(labelSlot())
  const label = getOptionLabel(option)
  return label === undefined || label === null ? String(fallback ?? '') : String(label)
}
// 选项节点渲染：默认菜单与 dropdownRender 共用同一实现，避免两处重复
// key 必传：虚拟滚动下窗口滑动时，缺 key 会让 Vue 按下标复用 DOM 节点 ——
// 同一节点被换上别的选项的类名，配合 .select-option 的 background 过渡即表现为「已选项蓝色标记闪动」
// （按 key 渲染：窗口滑动只增删两端的行，既有行节点原地保留）
function renderOptionNode(option: Option, index: number, key: string): VNode {
  const value = getOptionValue(option)
  const label = getOptionLabel(option)
  const optionSlot = slots.option
  const selected = isOptionSelected(option)
  return h(
    'p',
    {
      key,
      class: [
        'select-option',
        {
          'option-hover': !option.disabled && value === hoverValue.value,
          'option-selected': selected,
          'option-disabled': option.disabled,
          // 分组子选项：左缩进一级
          'option-grouped': optionGroups.value.has(String(value))
        }
      ],
      // 可访问性：选项角色 + 可被 aria-activedescendant 指向的 id + 选中态
      role: 'option',
      id: optionDomId(index),
      'aria-selected': selected,
      // 仅文本型 label 设置 title（与回填内容 / tag 的 title 口径一致：VNode 标签无法转为有意义的文本）
      title: typeof label === 'string' || typeof label === 'number' ? String(label) : undefined,
      // 选项上按下鼠标时阻止默认行为：否则 mousedown 会让 input 失焦触发 blur 关闭面板，
      // 而面板在离开动画期间已整体禁用指针事件（见 .select-panel-container.slide-leave-active），
      // 随后的 mouseup / click 便落不到选项上 —— 表现为「真实鼠标点击选项无任何反应」
      onMousedown: (e: MouseEvent) => e.preventDefault(),
      onMouseenter: () => onHover(option),
      onClick: (e: MouseEvent) => {
        e.stopPropagation()
        if (option.disabled) {
          selectFocus()
          return
        }
        onSelectOption(option, index)
      }
    },
    [
      // 内容单独包一层：选项为 flex 容器（容纳选中图标），裸文本节点无法直接应用省略号截断
      h('span', { class: 'select-option-content' }, optionSlot ? optionSlot(option) : renderItemContent(option, value)),
      renderOptionState(option)
    ]
  )
}
// 内置菜单节点（函数组件）：直接渲染选项列表与空态，通过 v-show 切换避免销毁重建
const menuNode: SelectMenuNode = () => {
  // 分组标题已并入渲染行（见 menuRows，标题不可选中、不占展示下标）；
  // 虚拟滚动时只渲染窗口内的行，上下用等高空 div 撑出未渲染区，滚动几何与全量渲染等价
  const optionNodes: VNode[] = []
  if (virtualTopHeight.value > 0) {
    optionNodes.push(
      // 纯布局占位：对读屏隐藏，避免 listbox 内出现无角色的空节点
      h('div', {
        key: 'placeholder-top',
        class: 'select-options-placeholder',
        style: { height: `${virtualTopHeight.value}px` },
        'aria-hidden': 'true'
      })
    )
  }
  visibleRows.value.forEach((row) => {
    if (row.group) {
      // key 取自渲染行（同一分组的标题行键稳定），窗口滑动时节点原地保留而非按下标改内容
      optionNodes.push(
        h('p', { key: row.key, class: 'select-option-group', role: 'presentation' }, renderItemContent(row.group))
      )
      return
    }
    if (row.option) {
      optionNodes.push(renderOptionNode(row.option, row.optionIndex ?? 0, row.key))
    }
  })
  if (virtualBottomHeight.value > 0) {
    optionNodes.push(
      h('div', {
        key: 'placeholder-bottom',
        class: 'select-options-placeholder',
        style: { height: `${virtualBottomHeight.value}px` },
        'aria-hidden': 'true'
      })
    )
  }
  const hasOptions = displayOptions.value.length > 0
  const listNode = h(
    Scrollbar,
    {
      class: 'select-options-panel',
      style: { ...optionsStyle.value, '--scrollbar-rail-vertical-right': '2px 0 2px auto' },
      onScroll: onPopupScroll,
      onClick: (e: MouseEvent) => {
        e.stopPropagation()
        selectFocus()
      },
      ...props.scrollbarProps
    },
    // listbox 容器：角色与 id 落在直接包裹选项行的元素上，与 aria-activedescendant 的 `${id}_list_${index}` 同源
    () => [h('div', { class: 'select-options-list', role: 'listbox', id: listboxId.value }, optionNodes)]
  )
  const emptyNode = h(
    'div',
    {
      class: 'select-options-panel options-panel-empty',
      onClick: (e: MouseEvent) => {
        e.stopPropagation()
        selectFocus()
      }
    },
    [renderNotFoundContent()]
  )
  return [withDirectives(listNode, [[vShow, hasOptions]]), withDirectives(emptyNode, [[vShow, !hasOptions]])]
}
// 面板内容：dropdownRender（插槽优先）时由使用者包裹内置菜单，否则直接渲染内置菜单
// 统一包成函数组件，模板里以 <component :is="panelContent" /> 渲染
const panelContent = computed<SelectMenuNode>(() => {
  if (slots.dropdownRender) {
    const dropdownSlot = slots.dropdownRender
    return () => dropdownSlot({ menuNode })
  }
  if (props.dropdownRender) {
    const dropdownRender = props.dropdownRender
    return () => [dropdownRender({ menuNode })]
  }
  return menuNode
})
// 自定义后缀图标：插槽优先（项目约定），其次 prop；统一包成函数组件便于模板以 <component :is> 渲染
const customSuffixIcon = computed<SelectMenuNode | null>(() => {
  if (slotsExist.suffixIcon) {
    return () => slots.suffixIcon!()
  }
  const icon = props.suffixIcon
  if (!icon) return null
  return () => [typeof icon === 'function' ? (icon as () => VNode)() : icon]
})
defineExpose({
  focus: selectFocus,
  blur: () => inputRef.value?.blur(),
  scrollTo
})
</script>
<template>
  <div
    ref="selectWrapRef"
    class="select-wrap"
    :class="{
      'select-focused': focused,
      'select-open': mergedOpen,
      'select-small': size === 'small',
      'select-large': size === 'large',
      'select-disabled': disabled,
      'select-borderless': !bordered,
      'select-status-error': status === 'error',
      'select-status-warning': status === 'warning',
      'select-show-arrow': mergedShowArrow,
      'select-allow-clear': allowClear,
      'search-select': mergedShowSearch,
      'select-multiple': isMultiple,
      'select-tags': isTagsMode
    }"
    :style="`
      --select-width: ${selectWidth};
      --select-height: ${selectHeight};
      --select-primary-color-hover: ${colorPalettes[4]};
      --select-primary-color-focus: ${colorPalettes[4]};
      --select-primary-shadow-color: ${shadowColor};
    `"
    @mousedown="onMousedown"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="toggleSelect"
  >
    <!-- 屏幕阅读器播报：面板关闭时聚合已选内容（隐藏 aria-live 节点），视觉上不可见 -->
    <span v-if="screenReaderText" class="select-sr-only" aria-live="polite">{{ screenReaderText }}</span>
    <div ref="selectContentRef" class="select-content-container">
      <!-- 多选 / 标签：标签列表。被折叠的 tag 仍渲染在 DOM 中（以绝对定位隐藏），供 responsive 量取真实宽度 -->
      <template v-if="isMultiple">
        <!-- tagRender 接管渲染时外层不再提供标签视觉（背景 / 边框 / 内边距 / 固定高度），否则与自定义内容叠成双层标签 -->
        <span
          v-for="item in tagItems"
          :key="String(item.value)"
          class="select-selection-item"
          :class="{
            'select-tag-render': Boolean(slots.tagRender),
            'select-selection-item-disabled': item.disabled,
            'select-tag-hidden': item.hidden
          }"
          :title="getTagTitle(item.label)"
        >
          <!-- 插槽存在即接管 tag 渲染：以内容探测判定会误伤「渲染结果取决于选项字段」的插槽，故直接看插槽是否提供 -->
          <slot v-if="slots.tagRender" name="tagRender" v-bind="item.params" />
          <template v-else>
            <span class="select-selection-item-content">
              <component :is="item.labelContent" v-if="item.labelContent" />
              <template v-else>{{ item.label }}</template>
            </span>
            <span
              v-if="item.closable"
              class="select-selection-item-remove"
              @mousedown.stop.prevent
              @click.stop="item.params.onClose($event)"
            >
              <slot v-if="slots.removeIcon" name="removeIcon" />
              <component v-else-if="customRemoveIcon" :is="customRemoveIcon" />
              <svg
                v-else
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
                ></path>
              </svg>
            </span>
          </template>
        </span>
        <!-- 折叠提示：插槽 > prop > 默认文案（+ N ...），插槽作用域为 { omittedValues } -->
        <span v-if="omittedOptions.length" class="select-selection-item select-selection-item-rest">
          <slot v-if="slots.maxTagPlaceholder" name="maxTagPlaceholder" :omitted-values="omittedOptions" />
          <template v-else>{{ omittedContent }}</template>
        </span>
      </template>
      <span class="select-search" :class="{ 'select-search-inline': isMultiple }">
        <input
          ref="inputRef"
          class="search-input"
          :class="{ 'caret-show': mergedOpen }"
          type="text"
          autocomplete="off"
          role="combobox"
          :id="mergedSelectId"
          :aria-expanded="mergedOpen"
          aria-haspopup="listbox"
          :aria-controls="listboxId"
          :aria-owns="listboxId"
          aria-autocomplete="list"
          :aria-activedescendant="activeDescendantId"
          :readonly="!inputEditable"
          :disabled="disabled"
          v-model="inputModelValue"
          @input="onSearchInput"
          @compositionstart="onCompositionStart"
          @compositionend="onCompositionEnd"
          @keydown="onKeydown"
          @focus="onFocus"
          @blur="onBlur"
        />
      </span>
      <!-- 回填内容（单选）：搜索框有输入文本时隐藏，避免与输入内容重叠 -->
      <span v-if="!isMultiple && !showPlaceholder && !hasTextInput" class="select-item" :title="itemTitle">
        <!-- 插槽存在即接管回填渲染：以内容探测判定会误伤「选项字段为空」的自定义插槽（渲染结果为空文本），故直接看插槽是否提供 -->
        <slot v-if="slots.optionLabel" name="optionLabel" v-bind="selectedOption ?? {}" />
        <component v-else-if="displayLabelContent" :is="displayLabelContent" />
        <template v-else>{{ displayText }}</template>
      </span>
      <!-- 占位文本：单选下有输入文本时保留占位（避免布局跳动）但不可见；多选下无已选值且输入为空时展示 -->
      <span
        v-else-if="showPlaceholder"
        class="select-item select-placeholder"
        :class="{ 'select-item-hidden': !isMultiple && hasTextInput }"
      >
        <slot v-if="slotsExist.placeholder" name="placeholder" />
        <template v-else>{{ placeholder }}</template>
      </span>
      <!-- 后缀图标：自定义 > 加载中 > 打开且可搜索（搜索图标）> 默认箭头 -->
      <span v-if="customSuffixIcon" class="icon-svg select-suffix show-svg">
        <component :is="customSuffixIcon" />
      </span>
      <span v-else-if="loading" class="icon-svg select-suffix show-svg loading-svg">
        <svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024">
          <path
            d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
          ></path>
        </svg>
      </span>
      <template v-else-if="mergedShowArrow">
        <!-- 箭头与搜索图标常驻 DOM，只切换 .show-svg 控制透明度：互换用 v-if 会直接卸载 / 挂载元素，
             开关面板时「箭头 ⇄ 搜索图标」就没有交叉淡入淡出的过渡效果 -->
        <svg
          class="icon-svg arrow-svg"
          :class="{ 'show-svg': !showSearchIcon, 'arrow-rotate': mergedOpen }"
          focusable="false"
          data-icon="down"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
          ></path>
        </svg>
        <svg
          class="icon-svg search-svg"
          :class="{ 'show-svg': showSearchIcon }"
          focusable="false"
          data-icon="search"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
          ></path>
        </svg>
      </template>
      <!-- 清除图标：满足清除条件时渲染，hover 触发器时显示（覆盖在箭头之上） -->
      <span
        v-if="slotsExist.clearIcon"
        class="icon-svg clear-svg"
        :class="{ 'show-svg': canClear }"
        @click.stop="onClear"
      >
        <slot name="clearIcon" :clear="onClear" />
      </span>
      <svg
        v-else
        class="icon-svg clear-svg"
        :class="{ 'show-svg': canClear }"
        focusable="false"
        data-icon="close-circle"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        fill-rule="evenodd"
        viewBox="64 64 896 896"
        @click.stop="onClear"
      >
        <path
          d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
        ></path>
      </svg>
    </div>
    <!-- 条件放在 Teleport 上：容器按**打开顺序**追加到目标末尾，同族同层级浮层的上下关系即「后打开者在上」
         （即「容器在可见时才 appendChild 到父节点」）；若 Teleport 常驻，顺序会退化为模板源码顺序，与打开先后无关 -->
    <Teleport v-if="initialDisplay" :disabled="resolvedTo === false" :to="resolvedTo === false ? null : resolvedTo">
      <!-- 两层 DOM：定位参照容器 + 面板。
           容器的实时矩形即面板 top / left 的坐标原点，故 Teleport 与 to: false 就地渲染共用同一套求解；
           首帧优化内化在此：首次展示前不渲染任何浮层 DOM，之后由面板上的 v-show 复用同一元素 -->
      <div ref="selectPanelWrapperRef" class="select-panel-wrapper">
        <Transition
          appear
          name="slide"
          enter-from-class="slide-enter"
          enter-active-class="slide-enter"
          enter-to-class="slide-enter slide-enter-active"
          leave-from-class="slide-leave"
          leave-active-class="slide-leave slide-leave-active"
          leave-to-class="slide-leave slide-leave-active"
        >
          <div
            v-show="panelVisible"
            ref="selectPanelRef"
            class="select-panel-container"
            :class="popupClassName"
            :style="selectPanelStyle"
            @mousedown="onPanelMousedown"
            @focusout="onBlur"
            @click.stop
          >
            <component :is="panelContent" />
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>
<style lang="less" scoped>
/* 缩放动画只改独立变换属性 scale：定位由内核写在独立属性 `translate` 上（复合链最外层，不受缩放影响）；
   keyframes 若改写 `transform` 会覆盖使用者经 `dropdownMenuStyle` 等样式 prop 传入的内联 transform
   （CSS 动画优先级高于内联样式，且 animation-fill-mode: both 在过渡类移除前一直生效） */
.slide-enter {
  scale: 0;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.slide-enter-active {
  animation-name: slideIn;
  animation-play-state: running;
  @keyframes slideIn {
    0% {
      scale: 1 0.8;
      opacity: 0;
    }
    100% {
      scale: 1;
      opacity: 1;
    }
  }
}
.slide-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.slide-leave-active {
  animation-name: slideOut;
  animation-play-state: running;
  @keyframes slideOut {
    0% {
      scale: 1;
      opacity: 1;
    }
    100% {
      scale: 1 0.8;
      opacity: 0;
    }
  }
}
.select-panel-container.slide-leave-active {
  pointer-events: none;
}
/* 屏幕阅读器专用文本：可被读屏读取但不参与视觉呈现（绝对定位，不影响触发器布局） */
.select-sr-only {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
.select-wrap {
  position: relative;
  display: inline-block;
  width: var(--select-width);
  height: var(--select-height);
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.88);
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  &:not(.select-disabled):hover {
    .select-content-container {
      border-color: var(--select-primary-color-hover);
    }
  }
  .select-content-container {
    position: relative;
    display: flex;
    padding: 0 11px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    outline: none;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    /* 用于与空内容做基线对齐（`''` 与 undefined 值的高度一致） */
    &::after {
      display: inline-block;
      width: 0;
      visibility: hidden;
      content: '\a0';
      line-height: calc(var(--select-height) - 2px);
    }
    .select-search {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 11px;
      right: 11px;
      .search-input {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        caret-color: transparent;
        vertical-align: top;
        background: transparent;
        border: none;
        outline: none;
        appearance: none;
        opacity: 0;
        cursor: pointer;
        &::-webkit-search-cancel-button {
          display: none;
          -webkit-appearance: none;
        }
      }
      .caret-show {
        caret-color: auto;
      }
    }
    .select-item {
      position: relative;
      flex: 1;
      line-height: calc(var(--select-height) - 2px);
      user-select: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: color 0.3s;
    }
    .select-placeholder {
      color: rgba(0, 0, 0, 0.25);
      transition: none;
      pointer-events: none;
    }
    .select-item-hidden {
      visibility: hidden;
    }
    .icon-svg {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 11px;
      margin: auto 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 12px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.25);
      fill: currentColor;
      user-select: none;
      pointer-events: none;
      /* 图标默认透明、由 .show-svg 点亮：箭头与搜索图标常驻 DOM，靠透明度交叉淡入淡出。
         若改用 v-if 互斥渲染，元素会被直接卸载 / 挂载，切换时没有过渡效果 */
      opacity: 0;
      transition: opacity 0.3s;
    }
    .show-svg {
      opacity: 1;
    }
    .arrow-svg {
      transition:
        transform 0.3s,
        opacity 0.3s;
    }
    .arrow-rotate {
      transform: rotate(180deg);
    }
    .loading-svg svg {
      animation: select-loading-spin 1s linear infinite;
    }
    /* 清除图标覆盖在箭头之上（自带背景遮挡），默认不可见，hover 触发器时显示 */
    .clear-svg {
      z-index: 1;
      opacity: 0;
      background: #fff;
      cursor: pointer;
      transition:
        color 0.2s,
        opacity 0.3s;
      &:hover {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    /* 清除图标同样带 .show-svg（表示「满足显示条件」），需压回透明，再由 hover 点亮 */
    .clear-svg.show-svg {
      opacity: 0;
    }
  }
  &:hover .clear-svg.show-svg {
    opacity: 1;
    pointer-events: auto;
  }
}
/* 展开时回填内容降为占位色，与既有实现一致 */
.select-open:not(.select-disabled) {
  .select-item {
    color: rgba(0, 0, 0, 0.25);
  }
}
.select-focused:not(.select-disabled) {
  .select-content-container {
    border-color: var(--select-primary-color-focus);
    box-shadow: 0 0 0 2px var(--select-primary-shadow-color);
  }
}
.search-select {
  .select-content-container {
    cursor: text;
    .select-search {
      .search-input {
        cursor: auto;
        color: inherit;
        opacity: 1;
      }
    }
  }
}
/* 显示箭头时给回填内容预留箭头位置，避免长文本压住图标 */
.select-show-arrow {
  .select-item {
    padding-right: 18px;
  }
}
.select-small {
  font-size: 14px;
  .select-content-container {
    padding: 0 7px;
    border-radius: 4px;
    .select-search {
      left: 7px;
      right: 28px;
    }
  }
  &.select-show-arrow {
    .select-item {
      padding-right: 21px;
    }
  }
}
.select-large {
  font-size: 16px;
  .select-content-container {
    padding: 0 11px;
    border-radius: 8px;
    .select-item {
      padding-right: 20px;
    }
  }
}
.select-borderless {
  &.select-wrap .select-content-container {
    border-color: transparent;
    background-color: transparent;
  }
  .clear-svg {
    background: transparent;
  }
  &:not(.select-disabled) {
    &:hover .select-content-container {
      border-color: transparent;
    }
    &.select-focused .select-content-container {
      border-color: transparent;
      box-shadow: none;
    }
  }
}
.select-disabled {
  .select-content-container {
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    user-select: none;
    cursor: not-allowed;
    .select-search .search-input {
      cursor: not-allowed;
    }
  }
  .select-item {
    color: rgba(0, 0, 0, 0.25);
  }
}
.select-status-error:not(.select-disabled) {
  .select-content-container {
    border-color: #ff7875;
  }
  &:hover .select-content-container {
    border-color: #ff7875;
  }
  &.select-focused .select-content-container {
    border-color: #ff7875;
    box-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);
  }
}
.select-status-warning:not(.select-disabled) {
  .select-content-container {
    border-color: #ffd666;
  }
  &:hover .select-content-container {
    border-color: #ffd666;
  }
  &.select-focused .select-content-container {
    border-color: #ffd666;
    box-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);
  }
}
/* 多选 / 标签 */
.select-wrap.select-multiple {
  /* 高度自适应：tag 换行时触发器随之增高 */
  height: auto;
  min-height: var(--select-height);
  /* tag 高度随 size 变化（约定：控件高度 - 8px） */
  --select-tag-height: calc(var(--select-height) - 8px);
  .select-content-container {
    /* 空内容时的基线高度由容器自身保底（替代下方的 \a0 占位） */
    min-height: var(--select-height);
    flex-wrap: wrap;
    align-items: center;
    padding: 1px 4px;
    cursor: text;
    &::after {
      content: none;
    }
  }
  /* 显示箭头 / 支持清除时为右侧图标预留宽度（约定：图标 12px + 内边距 12px） */
  &.select-show-arrow .select-content-container,
  &.select-allow-clear .select-content-container {
    padding-right: 24px;
  }
  .select-content-container .select-search {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    display: inline-flex;
    flex: 1 1 0;
    margin-left: 8px;
    min-width: 4px;
    max-width: 100%;
    .search-input {
      width: 100%;
      height: var(--select-tag-height);
      line-height: calc(var(--select-tag-height) - 2px);
      color: inherit;
      opacity: 1;
      cursor: auto;
      caret-color: auto;
    }
  }
  .select-content-container .select-search:not(:first-child) {
    margin-left: 0;
  }
  /* 占位文本绝对定位：tag 换行时不影响高度计算 */
  .select-content-container .select-placeholder {
    position: absolute;
    top: 50%;
    right: 11px;
    left: 11px;
    transform: translateY(-50%);
    line-height: 1.5714285714285714;
  }
}
/* 标签本体：（背景 / 边框 / 内边距 / 圆角与选中项一致） */
.select-selection-item {
  display: flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
  max-width: 100%;
  height: var(--select-tag-height);
  margin: 2px 4px 2px 0;
  padding-left: 8px;
  padding-right: 4px;
  border: 1px solid rgba(5, 5, 5, 0.06);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: calc(var(--select-tag-height) - 2px);
  cursor: default;
  user-select: none;
}
/* tagRender 接管渲染：外层只保留排布职责，间距与标签视觉（外边距 / 背景 / 边框 / 内边距 / 固定高度）
   全部交给自定义内容，否则会与自定义内容（如带边框的标签组件）叠成双层标签 */
.select-selection-item.select-tag-render {
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}
.select-selection-item-content {
  display: inline-block;
  margin-right: 4px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
}
.select-selection-item-remove {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 10px;
  font-weight: bold;
  line-height: inherit;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: rgba(0, 0, 0, 0.88);
  }
  svg {
    vertical-align: -0.2em;
  }
}
/* 禁用项的标签：不可移除 */
.select-selection-item-disabled {
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}
/* 被 responsive 折叠的 tag：绝对定位隐藏，不占位但保留布局以便量取真实宽度 */
.select-tag-hidden {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
/* 定位参照容器：绝对定位 + 零高度，既不参与布局也不遮挡
   页面交互；z-index 保持 auto，避免产生层叠上下文而把面板的层级关在里层 */
.select-panel-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: auto;
  height: 0;
  pointer-events: none;
}
.select-panel-container {
  position: absolute;
  /* 容器关闭了指针事件（pointer-events 可继承），面板必须显式恢复，否则选项的 hover / 点击全部失效 */
  pointer-events: auto;
  /* 默认层级与 useZIndex 的回退值一致；ConfigProvider 传入 baseZIndex 时由内联样式覆盖 */
  z-index: 1050;
  padding: 4px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  font-size: 14px;
  outline: none;
  cursor: auto;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  :deep(.select-options-panel) {
    /* 关闭滚动越界回弹与滚动链：否则触控板惯性滚动会带着列表冲出滚动区，面板底部露出空白
       （若以 transform 位移实现列表滚动则内容天然不越界，本库用原生滚动故需在此显式关闭回弹）。
       ⚠️ 必须是 none 而非 contain —— contain 只切断向父级的滚动链，元素自身的弹性回弹照旧发生，
       用 contain 时「滚到底仍有留白」依旧存在 */
    .scrollbar-container {
      overscroll-behavior: none;
      /* 关闭 Chrome 的滚动锚定：虚拟滚动随窗口切换改变上下占位高度，锚定补偿会反向调整 scrollTop，
         与窗口计算互相追赶形成抖动（本项目的位置由下标算出，不需要浏览器补偿） */
      overflow-anchor: none;
    }
    .select-option-group {
      min-height: 32px;
      padding: 5px 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      line-height: 1.5714285714285714;
      cursor: default;
    }
    .select-option.option-grouped {
      padding-inline-start: 24px;
    }
    .select-option {
      position: relative;
      min-height: 32px;
      display: flex;
      align-items: center;
      padding: 5px 12px;
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5714285714285714;
      cursor: pointer;
      overflow: hidden;
      transition: background 0.3s ease;
      .select-option-content {
        flex: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .select-option-state {
        flex: none;
      }
    }
    .option-hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .option-selected {
      font-weight: 600;
      background: var(--select-option-bg-color-active);
      .select-option-state {
        color: var(--select-primary-color);
      }
    }
    .option-selected.option-disabled {
      background: rgba(0, 0, 0, 0.04);
    }
    .option-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
  :deep(.options-panel-empty) {
    padding: 9px 8px;
    .empty-wrap {
      margin-block: 8px;
      .empty-image-wrap {
        height: 35px;
      }
    }
  }
}
@keyframes select-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
