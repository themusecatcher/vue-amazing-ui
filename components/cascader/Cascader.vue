<script lang="ts">
// 本块为模块级作用域（仅在模块加载时执行一次）：a11y 关联 id 的自增序号需跨组件实例唯一。
// 不使用项目既有的 createKeyGenerator（含时间戳）：SSR 与客户端会产出不同 id，触发水合时属性不匹配。
let cascaderIdSeed = 0
function nextCascaderId(): string {
  cascaderIdSeed += 1
  return `vui-cascader-${cascaderIdSeed}`
}
/** 多选回填策略：父级下全部子项选中时只回填父级路径 */
export const SHOW_PARENT = 'SHOW_PARENT'
/** 多选回填策略：只回填叶子路径 */
export const SHOW_CHILD = 'SHOW_CHILD'
</script>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, nextTick, onMounted, onBeforeUnmount, useSlots } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import Empty from 'components/empty'
import Popup from 'components/popup'
import Scrollbar, { type ScrollbarProps } from 'components/scrollbar'
import { injectFromChain, useResizeObserver, zIndexContainerOpenKey, FLOATING_LAYER_Z_INDEX } from 'components/utils'
import type { FloatingPlacement, MountElement } from 'components/utils'
export interface Option {
  label?: string // 选项名
  value?: string | number // 选项值
  disabled?: boolean // 是否禁用选项，默认 false
  children?: Option[] // 子选项数组，缺省或为空即叶子节点
  isLeaf?: boolean // 是否叶子节点，异步加载场景下置 false 可强制显示展开图标
  loading?: boolean // 是否正在加载子项，异步加载场景下置 true 会显示加载图标
  [propName: string]: any // 允许携带任意自定义字段：#option 插槽会透传原始数据对象，便于自定义渲染
}
export interface FieldNames {
  label?: string // 选项的文本字段名
  value?: string // 选项的值字段名
  children?: string // 子选项的字段名
}
export type CascaderValue = string | number
export type CascaderPath = CascaderValue[]
// 绑定值形态：单选为单条路径，多选为路径数组
export type CascaderModelValue = CascaderPath | CascaderPath[]
export type CascaderPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
export type ShowCheckedStrategy = typeof SHOW_PARENT | typeof SHOW_CHILD
// 搜索结果自定义渲染的回调参数
export interface SearchRenderParams {
  inputValue: string // 当前搜索文本
  path: Option[] // 命中项从根到自身的选项路径
}
export interface SearchConfig {
  filter?: (inputValue: string, path: Option[]) => boolean // 命中判定，缺省为「路径上任一选项文本包含输入项」
  sort?: (pathA: Option[], pathB: Option[], inputValue: string) => number // 结果排序
  render?: (params: SearchRenderParams) => VNode | string // 结果项内容渲染
  limit?: number | false // 结果条数上限，false 为不限，默认 50
  matchInputWidth?: boolean // 搜索结果面板是否与选择器同宽，默认 true
}
// displayRender 的回调参数
export interface DisplayRenderParams {
  labels: string[] // 各级选项文本
  selectedOptions: Option[] // 各级选项数据
}
// tagRender 的回调参数
export interface TagRenderParams {
  label: string // tag 显示文本（各级文本以 ' / ' 连接）
  value: CascaderPath // tag 对应的选中路径
  path: Option[] // tag 对应的选项数据
  closable: boolean // 是否可移除
  disabled: boolean // 是否禁用（禁用项的 tag 不可移除）
  onClose: (e?: MouseEvent) => void // 移除该 tag
}
// maxTagPlaceholder 的回调参数
export interface MaxTagPlaceholderParams {
  omittedValues: CascaderPath[] // 被折叠的选中路径
  omittedLabels: string[] // 被折叠路径的文本
}
export interface Props {
  // 双向绑定与受控核心
  value?: CascaderModelValue // (v-model:value) 选中路径：单选为单条路径，多选为路径数组
  defaultValue?: CascaderModelValue // 非受控初始值，形态同 value
  open?: boolean // 是否展开面板（受控，不传时由组件内部维护）
  searchValue?: string // 搜索文本（受控，配对 update:searchValue；不传时由组件内部维护）
  // 内容与数据源
  options?: Option[] // 可选项数据源
  fieldNames?: FieldNames // 选项字段名配置，用于自定义选项的文本 / 值 / 子选项字段
  // 外观与尺寸
  width?: string | number // 选择器宽度，单位 px
  size?: 'small' | 'middle' | 'large' // 选择器大小
  placeholder?: string // 未选中时的占位文本
  bordered?: boolean // 是否有边框
  maxTagCount?: number | 'responsive' // 多选时最多显示多少个 tag，'responsive' 按容器宽度自动折叠
  maxTagPlaceholder?: string | VNode | ((params: MaxTagPlaceholderParams) => VNode) // 折叠 tag 的提示内容
  // 状态与反馈
  disabled?: boolean // 是否禁用
  status?: 'error' | 'warning' // 设置校验状态
  // 图标与清除
  allowClear?: boolean // 是否支持清除
  clearIcon?: string | VNode | (() => VNode) // 自定义清除图标
  suffixIcon?: string | VNode | (() => VNode) // 自定义选择框后缀图标，多选下不渲染
  expandIcon?: string | VNode | (() => VNode) // 自定义次级菜单展开图标
  loadingIcon?: string | VNode | (() => VNode) // 自定义子项加载中的图标
  removeIcon?: string | VNode | (() => VNode) // 自定义多选 tag 的移除图标
  // 行为交互
  changeOnSelect?: boolean // 点选任意层级即改变 value；否则只有选中叶子节点才改变
  multiple?: boolean // 是否支持多选
  showCheckedStrategy?: ShowCheckedStrategy // 多选回填策略：父级全选时只回填父级路径，或只回填叶子路径
  loadData?: (selectedOptions: Option[]) => void // 异步加载子项，入参为当前路径上的选项数据
  expandTrigger?: 'click' | 'hover' // 次级菜单的展开方式
  showSearch?: boolean | SearchConfig // 是否支持搜索，为对象时可配置过滤 / 排序 / 渲染 / 条数上限
  displayRender?: (params: DisplayRenderParams) => VNode | string // 自定义已选内容的渲染（单选生效）
  tagRender?: (params: TagRenderParams) => VNode // 自定义多选 tag 的渲染
  notFoundContent?: string | VNode | null // 面板空数据时的内容，传 null 时回落默认空态
  panelHeight?: number // 面板每列的高度，单位 px，超出后滚动显示
  virtual?: boolean // 是否开启列虚拟滚动，长列表仅渲染可视区选项；关闭时全量渲染，列宽由整列内容决定
  optionHeight?: number // 选项行高，虚拟滚动的换算基准，需与实际行高一致
  scrollbarProps?: ScrollbarProps // 面板滚动条 scrollbar 组件属性配置
  // 面板定位与层级
  placement?: CascaderPlacement // 面板弹出位置
  flip?: boolean // 面板被视口或最近可滚动父元素遮挡时自动翻转
  to?: string | MountElement | false | ((triggerNode: HTMLElement | null) => string | MountElement) // 面板挂载的容器节点：元素标签名 / 元素本身 / 按触发器求值的函数；false 会待在原地
  popupClassName?: string // 面板的类名，用于自定义面板样式
  dropdownMenuStyle?: CSSProperties // 面板自定义样式，可覆盖定位（与 Select 的同名属性语义一致）
  dropdownMenuColumnStyle?: CSSProperties // 面板每一列的样式，可按列定制宽度等
  zIndex?: number // 面板层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
  // 可访问性
  autofocus?: boolean // 是否自动获取焦点
  id?: string // 组件 id，用于 aria-controls / aria-activedescendant 关联，未传时内部生成
}
// 声明组件插槽类型（顺序与文档 `## Slots` 表一致）
export interface CascaderSlots {
  default?: () => VNode[] // 自定义触发器内容，提供后整体替换选择框
  option?: (option: Option) => VNode[] // 自定义选项内容，作用域为当前选项数据
  expandIcon?: () => VNode[] // 自定义次级菜单展开图标
  loadingIcon?: () => VNode[] // 自定义子项加载中的图标
  suffixIcon?: () => VNode[] // 自定义选择框后缀图标
  clearIcon?: (props: { clear: (e?: MouseEvent) => void }) => VNode[] // 自定义清除图标
  removeIcon?: () => VNode[] // 自定义多选 tag 的移除图标
  notFoundContent?: () => VNode[] // 自定义空数据内容
  displayRender?: (params: DisplayRenderParams) => VNode[] // 自定义已选内容，作用域参数同 displayRender 属性
  tagRender?: (params: TagRenderParams) => VNode[] // 自定义多选 tag 的渲染
  maxTagPlaceholder?: (params: MaxTagPlaceholderParams) => VNode[] // 折叠 tag 的提示内容
  showSearchRender?: (params: SearchRenderParams) => VNode[] // 自定义搜索结果项内容
  action?: () => VNode[] // 面板底部的自定义操作区
}
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  defaultValue: undefined,
  open: undefined,
  searchValue: undefined,
  options: () => [],
  fieldNames: undefined,
  width: 184,
  size: 'middle',
  placeholder: '请选择',
  bordered: true,
  maxTagCount: undefined,
  maxTagPlaceholder: undefined,
  disabled: false,
  status: undefined,
  allowClear: true,
  clearIcon: undefined,
  suffixIcon: undefined,
  expandIcon: undefined,
  loadingIcon: undefined,
  removeIcon: undefined,
  changeOnSelect: false,
  multiple: false,
  showCheckedStrategy: SHOW_PARENT,
  loadData: undefined,
  expandTrigger: 'click',
  showSearch: false,
  displayRender: undefined,
  tagRender: undefined,
  notFoundContent: undefined,
  panelHeight: 180,
  virtual: false,
  optionHeight: 32,
  scrollbarProps: () => ({}),
  placement: 'bottomLeft',
  flip: true,
  to: undefined,
  popupClassName: undefined,
  dropdownMenuStyle: undefined,
  dropdownMenuColumnStyle: undefined,
  zIndex: undefined,
  autofocus: false,
  id: undefined
})
defineSlots<CascaderSlots>()
// 插槽一律按「是否提供」判定，不以渲染内容探测：带作用域参数的插槽（displayRender / option 等）
// 以空对象调用时渲染结果本就为空，内容探测会把已提供的插槽误判为未提供
const slots = useSlots()
// 声明组件事件（顺序与文档 `## Events` 表一致；update:value 即 v-model:value 回写，随 value 属性一并说明）
const emits = defineEmits([
  'update:value',
  'change',
  'openChange',
  'dropdownVisibleChange',
  'update:searchValue',
  'search',
  'clear',
  'focus',
  'blur'
])
const wrapRef = ref<HTMLElement | null>(null) // 组件根元素引用，用于判断焦点是否仍落在本组件内
// 是否由默认插槽接管触发器：接管后没有输入框承载焦点，外部点击需显式监听
const hasCustomTrigger = Boolean(slots.default)
const inputRef = ref<HTMLInputElement | null>(null) // 触发器输入框（只读时仅用于承载聚焦态）
const contentRef = ref<HTMLElement | null>(null) // 触发器内容容器（面板定位锚点）
const popupRef = ref<InstanceType<typeof Popup> | null>(null) // 浮层宿主模板引用（面板根元素经其 expose 取得）
const innerOpen = ref<boolean>(false) // 非受控模式下的面板显隐
const innerSearchValue = ref<string>('') // 非受控模式下的搜索文本
const focused = ref<boolean>(false) // 是否聚焦（决定描边 / 阴影）
const isComposing = ref<boolean>(false) // 是否处于输入法(IME)合成中，合成期间不触发 search / 过滤
const searchHoverIndex = ref<number>(0) // 搜索结果的键盘高亮下标
const activeCells = ref<CascaderValue[]>([]) // 面板中当前激活（高亮 / 展开）的路径
// 选项字段名配置：未指定（含显式空值）的字段逐一回退默认值
const mergedFieldNames = computed(() => ({
  label: props.fieldNames?.label || 'label',
  value: props.fieldNames?.value || 'value',
  children: props.fieldNames?.children || 'children'
}))
const mergedOpen = computed(() => (props.open !== undefined ? props.open : innerOpen.value))
const mergedSearchValue = computed(() => (props.searchValue !== undefined ? props.searchValue : innerSearchValue.value))
const mergedShowSearch = computed(() => props.showSearch !== false)
const searchConfig = computed<SearchConfig>(() =>
  typeof props.showSearch === 'object' && props.showSearch !== null ? props.showSearch : {}
)
const cascaderWidth = computed(() => (typeof props.width === 'number' ? `${props.width}px` : props.width))
const cascaderHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 32,
    large: 40
  }
  return `${heightMap[props.size]}px`
})
const panelHeightStyle = computed(() => `${props.panelHeight}px`)
const floatingPlacement = computed<FloatingPlacement>(() => props.placement)
// 挂载容器支持函数形态：按当前触发器求值一次，开合时重算（对齐「按触发器动态取容器」的用法）
const resolvedTo = shallowRef<string | MountElement | false | undefined>(
  typeof props.to === 'function' ? undefined : props.to
)
const panelTransitionProps: TransitionProps = {
  name: 'cascader-slide',
  enterFromClass: 'cascader-slide-enter',
  enterActiveClass: 'cascader-slide-enter',
  enterToClass: 'cascader-slide-enter cascader-slide-enter-active',
  leaveFromClass: 'cascader-slide-leave',
  leaveActiveClass: 'cascader-slide-leave cascader-slide-leave-active',
  leaveToClass: 'cascader-slide-leave cascader-slide-leave-active'
}
// 面板类名：宿主基础皮肤类 + 使用者的 popupClassName（皮肤类作前缀保名，与 Select 同一范式）
const mergedPanelClass = computed(() => ['cascader-panel-container', props.popupClassName].filter(Boolean).join(' '))
// 面板挂载在 Teleport 目标下（可能是 body），拿不到组件根上的 CSS 变量，故面板用到的变量在此重复声明
const cascaderPanelStyle = computed<CSSProperties>(() => ({
  ...props.dropdownMenuStyle,
  '--cascader-panel-height': panelHeightStyle.value,
  '--cascader-item-bg-active': 'var(--va-cp-cascader-primary-bg-color, var(--va-primary-bg-color))',
  '--cascader-primary-color': 'var(--va-cp-cascader-primary-color, var(--va-primary-color))',
  '--cascader-primary-color-hover': 'var(--va-cp-cascader-primary-color-hover, var(--va-primary-color-hover))'
}))
// 可访问性（ARIA）：id 在 SSR 与客户端须一致，故用模块级自增序号
const innerCascaderId = nextCascaderId()
const mergedCascaderId = computed(() => props.id || innerCascaderId)
const listboxId = computed(() => `${mergedCascaderId.value}_list`)
// 面板可见：打开即可见；无选项由面板内的空态占位呈现，notFoundContent 传 null 时回退默认空态
const panelVisible = computed(() => mergedOpen.value)
const panelSearchMode = computed(() => mergedShowSearch.value && mergedSearchValue.value !== '')
// 是否处于「有输入文本」状态：输入法合成期间也算（此时搜索文本尚未同步，否则拼音会与占位文本重叠）
const hasTextInput = computed(() => mergedShowSearch.value && (mergedSearchValue.value !== '' || isComposing.value))
// 后缀图标形态：打开且支持搜索时显示搜索图标，其余显示箭头（自定义后缀在模板中优先命中）
const showSearchIcon = computed(() => mergedOpen.value && mergedShowSearch.value)
const showPlaceholder = computed(() => valuePaths.value.length === 0 && !hasTextInput.value)
watch(
  [() => props.to, mergedOpen],
  () => {
    const to = props.to
    resolvedTo.value = typeof to === 'function' ? to(contentRef.value) : to
  },
  { immediate: true }
)
/** 读取选项的 value 字段 */
function getOptionValue(option: Option): CascaderValue | undefined {
  return option?.[mergedFieldNames.value.value]
}
/** 读取选项的文本字段并归一为字符串（缺失时回落 value） */
function getOptionLabelText(option: Option): string {
  const label = option?.[mergedFieldNames.value.label]
  if (typeof label === 'string') return label
  if (typeof label === 'number') return String(label)
  const value = getOptionValue(option)
  return value === undefined ? '' : String(value)
}
/** 读取选项的子选项数组（缺省 / 非数组一律视为无子级） */
function getChildren(option: Option): Option[] {
  const children = option?.[mergedFieldNames.value.children]
  return Array.isArray(children) ? children : []
}
/** 是否为叶子节点：显式 isLeaf 优先，缺省时按有无子选项判定（无子项即叶子） */
function isLeafOption(option: Option): boolean {
  if (option.isLeaf === true) return true
  if (option.isLeaf === false) return false
  return getChildren(option).length === 0
}
/** 按值在某一级选项列表中查找 */
function findOption(options: Option[], value: CascaderValue | undefined): Option | undefined {
  if (value === undefined) return undefined
  return options.find((option) => getOptionValue(option) === value)
}
/** 按值兜底生成选项：值不在 options 中时（远程数据未就绪等）label 回落 value */
function createFallbackOption(value: CascaderValue): Option {
  return {
    [mergedFieldNames.value.value]: value,
    [mergedFieldNames.value.label]: String(value)
  }
}
// 内部值：受控时以 value 为准，非受控时由内部维护（初值取 defaultValue）
const innerValue = ref<CascaderModelValue | undefined>(props.defaultValue)
const modelValue = computed<CascaderModelValue | undefined>(() =>
  props.value !== undefined ? props.value : innerValue.value
)
const isMultiple = computed(() => props.multiple)
/** 路径键：值里可能含任意字符，用序列化结果做键避免拼接冲突 */
function pathKey(path: CascaderPath): string {
  return JSON.stringify(path)
}
// 归一化：多选把值视为路径数组，单选视为单条路径（空数组表示未选）
const valuePaths = computed<CascaderPath[]>(() => {
  const value = modelValue.value
  if (value === undefined || value === null) return []
  // 防御：多选值里的非数组项按「单值路径」处理，避免错误用法直接抛错
  if (isMultiple.value) {
    return (value as unknown[]).map((item) => (Array.isArray(item) ? (item as CascaderPath) : [item as CascaderValue]))
  }
  const path = value as CascaderPath
  return path.length > 0 ? [path] : []
})
// 多选值展平为叶子路径：父级路径展开为其全部叶子，勾选态据此推导
const checkedLeafPaths = computed<CascaderPath[]>(() => {
  if (!isMultiple.value) return valuePaths.value
  const result: CascaderPath[] = []
  valuePaths.value.forEach((path) => collectLeafPaths(path, result))
  return result
})
const checkedKeySet = computed(() => new Set(checkedLeafPaths.value.map((path) => pathKey(path))))
/** 收集某条路径下的全部叶子路径（本身即叶子时收集自身；禁用分支整棵跳过，不可勾选） */
function collectLeafPaths(path: CascaderPath, result: CascaderPath[]): void {
  const optionPath = findPathOptions(path)
  const option = optionPath?.[optionPath.length - 1]
  const children = option ? getChildren(option) : []
  if (children.length === 0) {
    result.push(path)
    return
  }
  children.forEach((child) => {
    const value = getOptionValue(child)
    if (value !== undefined && !child.disabled) {
      collectLeafPaths([...path, value], result)
    }
  })
}
/** 统计子树中被勾选的叶子数与叶子总数（禁用分支不计入，其勾选态不参与父级推导） */
function countSubtreeLeaves(option: Option, path: CascaderPath): { checked: number; total: number } {
  const children = getChildren(option)
  if (children.length === 0) {
    return { checked: checkedKeySet.value.has(pathKey(path)) ? 1 : 0, total: 1 }
  }
  return children.reduce<{ checked: number; total: number }>(
    (acc, child) => {
      const value = getOptionValue(child)
      if (value === undefined || child.disabled) return acc
      const next = countSubtreeLeaves(child, [...path, value])
      return { checked: acc.checked + next.checked, total: acc.total + next.total }
    },
    { checked: 0, total: 0 }
  )
}
/** 多选勾选态：全选 / 半选 / 未选（禁用项恒为未选，与不可操作的语义一致） */
function getCheckState(option: Option, columnIndex: number): 'checked' | 'half' | 'none' {
  if (!isMultiple.value || option.disabled) return 'none'
  const path = pathOfOption(option, columnIndex)
  if (path.length === 0) return 'none'
  const { checked, total } = countSubtreeLeaves(option, path)
  if (total > 0 && checked === total) return 'checked'
  return checked > 0 ? 'half' : 'none'
}
// 单选回填路径：取第一条路径
const displayPath = computed<CascaderPath>(() => valuePaths.value[0] ?? [])
// 选中路径的选项数据：逐级下钻，缺项处用兜底选项占位，保证回填文本不丢
const selectedPath = computed<Option[]>(() => resolveOptions(displayPath.value))
const displayLabels = computed<string[]>(() => selectedPath.value.map((option) => getOptionLabelText(option)))
const displayText = computed(() => displayLabels.value.join(' / '))
const displayParams = computed<DisplayRenderParams>(() => ({
  labels: displayLabels.value,
  selectedOptions: selectedPath.value
}))
// 已选内容的自定义渲染：插槽优先（项目约定），其次 displayRender 属性
const customDisplayRender = computed<(() => VNode | string) | null>(() => {
  if (slots.displayRender) {
    return () => slots.displayRender!(displayParams.value) as unknown as VNode
  }
  const displayRender = props.displayRender
  return displayRender ? () => displayRender(displayParams.value) : null
})
// 多选 tag 使用的路径：按回填策略格式化后再展示，保证与 change 回写的形态一致
const tagPaths = computed<CascaderPath[]>(() =>
  isMultiple.value ? formatStrategyPaths(checkedLeafPaths.value) : valuePaths.value
)
// 多选 tag：每条路径一个 tag，默认展示末级文本（完整路径由 #tagRender 自行组织）
const tagItems = computed<TagRenderParams[]>(() => {
  if (!isMultiple.value) return []
  return tagPaths.value.map((path) => {
    const optionPath = resolveOptions(path)
    const lastOption = optionPath[optionPath.length - 1]
    return {
      // 多选 tag 只显示末级文本（完整路径由 #tagRender 自行组织）
      label: lastOption ? getOptionLabelText(lastOption) : '',
      value: path,
      path: optionPath,
      disabled: optionPath.some((option) => option.disabled),
      closable: !props.disabled,
      onClose: (e?: MouseEvent) => removeTag(path, e)
    }
  })
})
const TAG_GAP = 4 // 默认 tag 的右外边距（与 .cascader-selection-item 的 margin-right 一致），用于 responsive 宽度累计
const SEARCH_GAP = 4 // 多选输入框的左外边距（与 .cascader-search 的 margin-left 一致）
const SEARCH_MIN_WIDTH = 4 // 多选输入框可压缩到的最小宽度（与 .cascader-search 的 min-width 一致）
const responsiveTagCount = ref<number>(0) // 'responsive' 时按容器宽度算出的可见 tag 数
const responsiveMeasured = ref<boolean>(false) // 是否已按容器宽度量取过（量取前先全量渲染，避免无布局环境下 tag 全被折叠）
// 可见 tag 数：number 直接截断，'responsive' 用实测值，未设置时全量展示
const visibleTagCount = computed(() => {
  const total = tagItems.value.length
  const { maxTagCount } = props
  if (maxTagCount === 'responsive') {
    return responsiveMeasured.value ? Math.min(responsiveTagCount.value, total) : total
  }
  if (typeof maxTagCount === 'number') {
    return Math.min(maxTagCount, total)
  }
  return total
})
const omittedTagItems = computed(() => tagItems.value.slice(visibleTagCount.value))
const omittedPlaceholderParams = computed<MaxTagPlaceholderParams>(() => ({
  omittedValues: omittedTagItems.value.map((item) => item.value),
  omittedLabels: omittedTagItems.value.map((item) => item.label)
}))
const omittedText = computed(() => `+ ${omittedTagItems.value.length} ...`)
// 次级菜单展开列：第 0 列为根数据，其后每列由激活路径逐级下钻得到
const columns = computed<Option[][]>(() => {
  const result: Option[][] = [props.options]
  let list = props.options
  for (const cell of activeCells.value) {
    const matched = findOption(list, cell)
    const children = matched ? getChildren(matched) : []
    if (children.length === 0) break
    result.push(children)
    list = children
  }
  return result
})
/** 该列当前激活项（路径命中即高亮，整条激活路径都会高亮） */
function isActiveOption(option: Option, columnIndex: number): boolean {
  return activeCells.value[columnIndex] === getOptionValue(option)
}
// 虚拟滚动：列内只渲染可视区的选项，未渲染区用等高占位撑出，滚动条长度与全量渲染等价
const DEFAULT_OPTION_HEIGHT = 32 // 默认行高（与 .cascader-option 的 min-height 一致）
const VIRTUAL_OVERSCAN = 1 // 可视区上下各多渲染的行数，快速滚动时不留空隙
const rowHeight = computed(() => (props.optionHeight > 0 ? props.optionHeight : DEFAULT_OPTION_HEIGHT))
const columnScrollTops = ref<Record<number, number>>({}) // 各列滚动位置（列下标 → scrollTop）
const columnMenuEls = ref<(HTMLElement | null)[]>([]) // 各列菜单容器（定位滚动容器用）
/** 该列是否需要窗口化：显式开启且内容高于面板（装得下时全量渲染） */
function isColumnVirtualActive(length: number): boolean {
  return props.virtual === true && length * rowHeight.value > props.panelHeight
}
/** 该列可滚动的最大位置：内容高度减去一屏 */
function columnMaxScrollTop(length: number): number {
  return Math.max(length * rowHeight.value - props.panelHeight, 0)
}
/**
 * 该列的渲染窗口 [start, end)：滚动位置决定起点，末端一屏 + 上下缓冲行。
 * 滚动位置先按当前内容长度夹取：列内容变短（换父级 / 值变更）时缓存值可能越界，
 * 不夹取会算出空窗口，表现为整列空白
 */
function columnRenderWindow(columnIndex: number, length: number): { start: number; end: number } {
  if (!isColumnVirtualActive(length)) {
    return { start: 0, end: length }
  }
  const top = Math.min(columnScrollTops.value[columnIndex] ?? 0, columnMaxScrollTop(length))
  const start = Math.max(0, Math.floor(top / rowHeight.value) - VIRTUAL_OVERSCAN)
  const end = Math.min(length, Math.ceil((top + props.panelHeight) / rowHeight.value) + VIRTUAL_OVERSCAN)
  return { start, end }
}
/** 该列实际渲染的选项切片 */
function visibleColumnOptions(column: Option[], columnIndex: number): Option[] {
  const { start, end } = columnRenderWindow(columnIndex, column.length)
  return start === 0 && end === column.length ? column : column.slice(start, end)
}
/** 该列上下占位高度：未渲染区间用等高占位撑出 */
function columnPadding(columnIndex: number, length: number): { top: number; bottom: number } {
  const { start, end } = columnRenderWindow(columnIndex, length)
  return { top: start * rowHeight.value, bottom: (length - end) * rowHeight.value }
}
// 虚拟滚动只渲染可视区，列宽会跟着切片内容变（越往下滚越宽、选中加粗再把箭头推右），
// 故虚拟列按「整列最宽行」锁定宽度：先渲染一层隐藏测量层量出宽度，再作为该列的最小宽度
const columnMinWidths = ref<Record<number, number>>({}) // 列下标 → 锁定宽度（px）
const measuringColumns = ref(false) // 是否处于测量渲染态
const MENU_H_PADDING = 8 // .cascader-menu 左右内边距，测量层量到的是内容宽，需补齐
const MIN_COLUMN_WIDTH = 111 // 列的最小宽度（与 .cascader-menu 的 min-width 保持一致）
/** 该列是否需要锁宽：窗口化生效且没有自定义 option 插槽（插槽内容无法按文本预量） */
function canLockColumnWidth(length: number): boolean {
  return isColumnVirtualActive(length) && !slots.option
}
/** 虚拟列的锁定宽度样式，未锁定的列（全量渲染）交回内容决定 */
function columnLockStyle(columnIndex: number, length: number): CSSProperties | undefined {
  const width = columnMinWidths.value[columnIndex]
  if (!width || !isColumnVirtualActive(length)) return undefined
  return { minWidth: `${width}px` }
}
/**
 * 量取各虚拟列的整列宽度并锁定。
 * 测量层用 600 字重渲染：激活项加粗后不会超过锁定宽度，列宽因此完全不随滚动与选中变化
 */
async function measureColumnWidths(): Promise<void> {
  if (props.virtual !== true || slots.option || !columns.value.some((column) => isColumnVirtualActive(column.length))) {
    if (Object.keys(columnMinWidths.value).length > 0) columnMinWidths.value = {}
    return
  }
  const collect = (): Record<number, number> => {
    const widths: Record<number, number> = {}
    columns.value.forEach((column, columnIndex) => {
      if (!isColumnVirtualActive(column.length)) return
      const layer = columnMenuEls.value[columnIndex]?.querySelector<HTMLElement>('.cascader-menu-measure')
      // 取亚像素宽度再向上取整：offsetWidth 会先四舍五入，锁定值比真实需要窄 0.5px 时会挤掉文本
      const width = layer?.getBoundingClientRect().width ?? 0
      if (width > 0) widths[columnIndex] = Math.max(Math.ceil(width) + MENU_H_PADDING, MIN_COLUMN_WIDTH)
    })
    return widths
  }
  measuringColumns.value = true
  let widths: Record<number, number> = {}
  // 首帧（Teleport 刚挂载 / 面板子树还没渲染）量不到就继续等，最多 6 帧兜底
  for (let attempt = 0; attempt < 6; attempt++) {
    await nextTick()
    widths = collect()
    if (Object.keys(widths).length > 0) break
  }
  measuringColumns.value = false
  columnMinWidths.value = widths
}
// 列数据 / 勾选形态 / 尺寸变化后重量列宽：面板首次挂载、换父级新开一列都会走到
watch([columns, () => props.multiple, () => props.size], () => nextTick(measureColumnWidths), { immediate: true })
/** 列滚动：记录滚动位置驱动渲染窗口（Scrollbar 的 scroll 事件带原生事件对象） */
function onColumnScroll(columnIndex: number, e: Event): void {
  const target = e.target as HTMLElement | null
  columnScrollTops.value = { ...columnScrollTops.value, [columnIndex]: target?.scrollTop ?? 0 }
}
/**
 * 列菜单容器 ref：拿到 Scrollbar 内部滚动容器，用于键盘导航时按行高换算滚动位置。
 * 元素未变时直接返回：内联函数 ref 每次渲染都会调用，无条件写新数组会触发重渲染死循环
 */
function setColumnMenuRef(el: unknown, columnIndex: number): void {
  const next = el instanceof HTMLElement ? el : null
  if (columnMenuEls.value[columnIndex] === next) return
  const list = [...columnMenuEls.value]
  list[columnIndex] = next
  columnMenuEls.value = list
}
/** 该列的滚动容器（Scrollbar 内部容器） */
function columnScrollContainer(columnIndex: number): HTMLElement | null {
  return columnMenuEls.value[columnIndex]?.querySelector<HTMLElement>('.scrollbar-container') ?? null
}
/**
 * 把该列的下标项最小幅度地滚入可视区：
 * 虚拟滚动下目标行可能尚未渲染，按「行下标 × 行高」换算；全量渲染时直接量目标行的真实位置
 */
function scrollColumnOptionIntoView(columnIndex: number, optionIndex: number): void {
  if (optionIndex < 0) return
  const length = columns.value[columnIndex]?.length ?? 0
  const container = columnScrollContainer(columnIndex)
  if (!container) return
  if (isColumnVirtualActive(length)) {
    const itemTop = optionIndex * rowHeight.value
    const itemBottom = itemTop + rowHeight.value
    const viewTop = container.scrollTop
    const viewBottom = viewTop + container.clientHeight
    if (itemTop < viewTop) {
      container.scrollTop = itemTop
    } else if (itemBottom > viewBottom) {
      container.scrollTop = itemBottom - container.clientHeight
    }
  } else {
    // 行已在 DOM 中：按真实几何滚动，行高随内容变化时也不会算偏
    const row = container.querySelector('.cascader-menu-list')?.children[optionIndex] as HTMLElement | undefined
    if (!row) return
    const rowRect = row.getBoundingClientRect()
    const boxRect = container.getBoundingClientRect()
    if (rowRect.top < boxRect.top) {
      container.scrollTop += rowRect.top - boxRect.top
    } else if (rowRect.bottom > boxRect.bottom) {
      container.scrollTop += rowRect.bottom - boxRect.bottom
    }
  }
  // 同步回写渲染窗口的依据：程序化设置 scrollTop 的 scroll 事件是异步的，不主动写会让窗口停在旧位置，
  // 表现为「面板打开了但选中项不在渲染出来的那几项里」
  if (columnScrollTops.value[columnIndex] !== container.scrollTop) {
    columnScrollTops.value = { ...columnScrollTops.value, [columnIndex]: container.scrollTop }
  }
}
/** 该列滚动位置回到顶部（列内容换成另一组选项时调用） */
function resetColumnScroll(columnIndex: number): void {
  const container = columnScrollContainer(columnIndex)
  if (container) {
    container.scrollTop = 0
  }
  if (columnScrollTops.value[columnIndex] !== undefined) {
    const next = { ...columnScrollTops.value }
    delete next[columnIndex]
    columnScrollTops.value = next
  }
}
/**
 * 展开时把缓存位置写回各列容器：收起期间列可能被重建，浏览器既不会保留也不会恢复 scrollTop，
 * 而渲染窗口依据的是缓存值 —— 只恢复容器、不主动归零，面板才会停在关掉时的那个位置。
 * 虚拟滚动按行高夹取（与渲染窗口同一公式，两者必须一致）；全量渲染交给浏览器按真实内容夹取，
 * 再把夹取后的真实值回写缓存，避免缓存与容器错位
 */
function restoreColumnScroll(): void {
  columns.value.forEach((column, columnIndex) => {
    const container = columnScrollContainer(columnIndex)
    if (!container) return
    const cached = columnScrollTops.value[columnIndex]
    // 无缓存（首次展开 / 切换父级时刚清空）：以容器真实位置为准。面板只是 v-show 隐藏时
    // 浏览器自己会保留 scrollTop，此处的职责是让渲染窗口跟上它，而不是把容器打回顶部
    if (cached === undefined) {
      if (container.scrollTop !== 0) {
        columnScrollTops.value = { ...columnScrollTops.value, [columnIndex]: container.scrollTop }
      }
      return
    }
    // 有缓存：收起期间容器可能被重建（scrollTop 归零），按缓存写回
    const top = isColumnVirtualActive(column.length) ? Math.min(cached, columnMaxScrollTop(column.length)) : cached
    container.scrollTop = top
    if (cached !== container.scrollTop) {
      columnScrollTops.value = { ...columnScrollTops.value, [columnIndex]: container.scrollTop }
    }
  })
}
/**
 * 激活路径变化（点选 / 键盘移动 / 悬浮展开）后的列滚动维护：
 * ① 该列父级变了 → 内容是一组新选项，滚动位置回到顶部（否则停在上一个父级的滚动位置，观感如「没切换」）；
 * ② 再把该列激活项滚入可视区（虚拟滚动下目标行可能尚未渲染，按行高换算）
 */
watch(activeCells, (next, prev) => {
  nextTick(() => {
    columns.value.forEach((column, columnIndex) => {
      const parentChanged = pathKey((prev ?? []).slice(0, columnIndex)) !== pathKey(next.slice(0, columnIndex))
      if (parentChanged) {
        resetColumnScroll(columnIndex)
      }
      const activeValue = next[columnIndex]
      if (activeValue === undefined) return
      const index = column.findIndex((option) => getOptionValue(option) === activeValue)
      if (index >= 0) {
        scrollColumnOptionIntoView(columnIndex, index)
      }
    })
  })
})
/** 选项在整棵数据树中的路径（用于勾选 / 展开 / 键盘等需要完整路径的场景） */
function pathOfOption(option: Option, columnIndex: number): CascaderPath {
  const value = getOptionValue(option)
  return value === undefined ? [] : [...activeCells.value.slice(0, columnIndex), value]
}
/** 搜索结果命中判定：默认「路径上任一选项文本包含输入项」（大小写不敏感） */
function defaultSearchFilter(inputValue: string, path: Option[]): boolean {
  const keyword = inputValue.toLowerCase()
  return path.some((option) => getOptionLabelText(option).toLowerCase().includes(keyword))
}
// 搜索结果：仅叶子节点参与（changeOnSelect 打开时任意层级都可作为结果，与面板点选口径一致）
const searchResults = computed<Option[][]>(() => {
  const keyword = mergedSearchValue.value
  if (!panelSearchMode.value) return []
  const { filter, sort, limit = 50 } = searchConfig.value
  const matcher = filter ?? defaultSearchFilter
  const result: Option[][] = []
  const reachLimit = () => !sort && limit !== false && result.length >= limit
  const dig = (options: Option[], path: Option[]): void => {
    options.forEach((option) => {
      if (reachLimit()) return
      const currentPath = [...path, option]
      const children = getChildren(option)
      if ((children.length === 0 || props.changeOnSelect) && matcher(keyword, currentPath)) {
        result.push(currentPath)
      }
      if (children.length > 0) {
        dig(children, currentPath)
      }
    })
  }
  dig(props.options, [])
  if (sort) {
    result.sort((pathA, pathB) => sort(pathA, pathB, keyword))
  }
  return limit === false ? result : result.slice(0, limit)
})
/** 把文本按关键词切成「命中 / 未命中」片段，供搜索结果高亮渲染 */
function splitKeyword(text: string, keyword: string): { text: string; hit: boolean }[] {
  if (!keyword) return [{ text, hit: false }]
  const segments: { text: string; hit: boolean }[] = []
  const lowerText = text.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  let start = 0
  let index = lowerText.indexOf(lowerKeyword)
  while (index !== -1) {
    if (index > start) {
      segments.push({ text: text.slice(start, index), hit: false })
    }
    segments.push({ text: text.slice(index, index + keyword.length), hit: true })
    start = index + keyword.length
    index = lowerText.indexOf(lowerKeyword, start)
  }
  if (start < text.length) {
    segments.push({ text: text.slice(start), hit: false })
  }
  return segments
}
// 搜索结果渲染项：key + 路径 + 逐级高亮片段（render 配置存在时改由使用者接管内容）
const searchItems = computed(() => {
  const render = searchConfig.value.render
  const inputValue = mergedSearchValue.value
  return searchResults.value.map((path) => ({
    key: path.map((option) => String(getOptionValue(option))).join('-'),
    path,
    segments: path.map((option) => splitKeyword(getOptionLabelText(option), inputValue)),
    renderNode: render ? () => render({ inputValue, path }) : null
  }))
})
const showSearchPanel = computed(() => panelSearchMode.value && searchItems.value.length > 0)
const showEmptyPanel = computed(
  () => props.options.length === 0 || (panelSearchMode.value && searchItems.value.length === 0)
)
// 面板宽度契约：空态与搜索结果保留选择器的最小宽度，其余由列内容决定（每列 111px）
const matchTriggerWidth = computed<'minWidth' | false>(() => {
  const keepTriggerWidth =
    showEmptyPanel.value || (panelSearchMode.value && (searchConfig.value.matchInputWidth ?? true))
  return keepTriggerWidth ? 'minWidth' : false
})
/** 统一控制面板显隐：非受控直接改内部状态（事件由 watch(innerOpen) 上报） */
function setPanelOpen(open: boolean): void {
  if (props.open === undefined) {
    innerOpen.value = open
  } else if (props.open !== open) {
    emitPanelChange(open)
  }
}
function emitPanelChange(open: boolean): void {
  emits('openChange', open)
  emits('dropdownVisibleChange', open)
}
function openPanel(): void {
  if (!props.disabled) {
    setPanelOpen(true)
  }
}
function closePanel(): void {
  setPanelOpen(false)
}
function setSearchValue(value: string): void {
  innerSearchValue.value = value
  if (props.searchValue !== undefined) {
    emits('update:searchValue', value)
  }
}
/**
 * 搜索输入框的可写目标：读统一走 mergedSearchValue（受控时由外部驱动），
 * 写走 setSearchValue（受控时额外回传 update:searchValue）
 */
const inputModelValue = computed({
  get: () => mergedSearchValue.value,
  set: (value: string) => setSearchValue(value)
})
function focusTrigger(): void {
  inputRef.value?.focus()
}
function onFocus(): void {
  focused.value = true
  emits('focus')
}
/**
 * 焦点离开组件（触发器 blur 与面板 focusout 共用）
 *
 * 焦点仍在本组件内时（面板内自定义内容之间移动、或回到触发器本身）不收起，
 * 面板侧的 focusout 是必需的一环：焦点进入面板内自定义内容后再离开时，触发器不会再收到 blur
 */
function onBlur(e?: FocusEvent): void {
  if (props.disabled) return
  const related = (e?.relatedTarget as Node | null) ?? null
  if (related && (popupRef.value?.panelRef?.contains(related) || wrapRef.value?.contains(related))) return
  focused.value = false
  closePanel()
  emits('blur')
}
/**
 * 触发器 mousedown：阻止输入框以外的区域抢走焦点
 *
 * 点击文本 / 箭头 / 清除图标会让输入框失焦 → blur 关闭面板，随后 click 的 toggle 又打开面板，
 * 表现为「点触发器关不掉面板」；仅当目标是输入框本身时放行，保留浏览器原生聚焦与光标定位
 */
function onMousedown(e: MouseEvent): void {
  if (e.target !== inputRef.value) {
    e.preventDefault()
  }
}
/** 面板 mousedown：阻止非输入类区域抢走触发器焦点（自定义内容里的输入类元素放行） */
function onPanelMousedown(e: MouseEvent): void {
  const target = e.target as HTMLElement | null
  if (target?.closest('input, textarea, select, [contenteditable]')) return
  e.preventDefault()
}
function togglePanel(): void {
  if (props.disabled) return
  if (mergedOpen.value) {
    closePanel()
    return
  }
  focusTrigger()
  openPanel()
}
/** 单选值变更统一出口：同步 v-model 并派发 change（value 为路径，options 为路径上的选项数据） */
function emitChange(cells: CascaderPath): void {
  if (props.value === undefined) {
    innerValue.value = cells
  }
  emits('update:value', cells)
  emits('change', cells, resolveOptions(cells))
}
/** 多选值变更统一出口：按回填策略格式化后同步 v-model 并派发 change */
function emitMultipleChange(leafPaths: CascaderPath[]): void {
  const nextValue = formatStrategyPaths(leafPaths)
  if (props.value === undefined) {
    innerValue.value = nextValue
  }
  emits('update:value', nextValue)
  emits(
    'change',
    nextValue,
    nextValue.map((path) => resolveOptions(path))
  )
}
/**
 * 按 showCheckedStrategy 格式化：父级下全部叶子选中时折叠为父级路径（默认），SHOW_CHILD 时保留叶子路径。
 * 输出顺序跟随叶子路径的输入顺序：首个可折叠祖先占位，其后同属该子树的叶子跳过。
 * 无法在 options 中解析的值原样保留 —— 远程数据未就绪时不能把用户的选中值丢掉
 */
function formatStrategyPaths(leafPaths: CascaderPath[]): CascaderPath[] {
  if (props.showCheckedStrategy === SHOW_CHILD) return leafPaths
  const leafKeys = new Set(leafPaths.map((path) => pathKey(path)))
  const result: CascaderPath[] = []
  const consumed = new Set<string>()
  leafPaths.forEach((path) => {
    const key = pathKey(path)
    if (consumed.has(key)) return
    const folded = findFoldablePath(path, leafKeys)
    const foldedKey = pathKey(folded)
    if (consumed.has(foldedKey)) return
    result.push(folded)
    if (foldedKey === key) {
      consumed.add(key)
      return
    }
    const optionPath = findPathOptions(folded)
    const foldedOption = optionPath?.[optionPath.length - 1]
    if (foldedOption) {
      collectSubtreeLeafKeys(foldedOption, folded, consumed)
    }
  })
  return result
}
/** 路径可折叠的最高祖先路径：自根向下逐层判定子树是否全选，无可折叠祖先时返回自身 */
function findFoldablePath(path: CascaderPath, leafKeys: Set<string>): CascaderPath {
  for (let length = 1; length < path.length; length += 1) {
    const prefix = path.slice(0, length)
    const optionPath = findPathOptions(prefix)
    const option = optionPath?.[optionPath.length - 1]
    if (option && isSubtreeAllChecked(option, prefix, leafKeys)) return prefix
  }
  return path
}
/** 收集子树的全部叶子路径键（折叠为父级时用于标记已消费） */
function collectSubtreeLeafKeys(option: Option, path: CascaderPath, target: Set<string>): void {
  const children = getChildren(option)
  if (children.length === 0) {
    target.add(pathKey(path))
    return
  }
  children.forEach((child) => {
    const value = getOptionValue(child)
    if (value !== undefined) {
      collectSubtreeLeafKeys(child, [...path, value], target)
    }
  })
}
/**
 * 子树是否可折叠为父级：禁用项恒不折叠，且禁用子项不参与判定
 * （禁用子项无法被取消勾选，父级下可用子项全选即视为整体选中）
 */
function isSubtreeAllChecked(option: Option, path: CascaderPath, leafKeys: Set<string>): boolean {
  if (option.disabled) return false
  const children = getChildren(option).filter((child) => !child.disabled && getOptionValue(child) !== undefined)
  if (children.length === 0) {
    return getChildren(option).length === 0 && leafKeys.has(pathKey(path))
  }
  return children.every((child) => {
    const value = getOptionValue(child)
    return value !== undefined && isSubtreeAllChecked(child, [...path, value], leafKeys)
  })
}
/** 把值路径解析为选项路径（逐级下钻，缺项处用兜底选项占位） */
function resolveOptions(cells: CascaderPath): Option[] {
  const result: Option[] = []
  let list = props.options
  const cellsSafe = Array.isArray(cells) ? cells : []
  cellsSafe.forEach((cell) => {
    const matched = findOption(list, cell)
    result.push(matched ?? createFallbackOption(cell))
    list = matched ? getChildren(matched) : []
  })
  return result
}
/** 把值路径解析为**真实存在**的选项路径：任一层缺项即返回 null（键盘确认时用，避免确认到不存在的路径） */
function findPathOptions(cells: CascaderPath): Option[] | null {
  const result: Option[] = []
  let list = props.options
  for (const cell of cells) {
    const matched = findOption(list, cell)
    if (!matched) return null
    result.push(matched)
    list = getChildren(matched)
  }
  return result.length > 0 ? result : null
}
const loadingKeys = ref<Set<string>>(new Set()) // 已触发 loadData 且尚未拿到子项的路径键
/**
 * 展开某级时按需异步加载子项：声明了 loadData、当前无子项且未被标记为叶子时才触发；
 * 子项由使用者在 loadData 回调里写入 options，加载态在拿到子项后自动解除
 */
function loadChildren(option: Option, path: CascaderPath): void {
  const loadData = props.loadData
  if (!loadData || option.isLeaf === true) return
  if (getChildren(option).length > 0) return
  const key = pathKey(path)
  if (loadingKeys.value.has(key)) return
  loadingKeys.value = new Set([...loadingKeys.value, key])
  loadData(resolveOptions(path))
}
/**
 * 子项是否处于加载中：数据里标记 loading，或已触发 loadData 但子项尚未写入
 *
 * 子项到位即结束加载态（而不是等 options 变更事件）：使用者在 loadData 里通常就地补写
 * `option.children`，数组引用不变，侦听不到变更
 */
function isLoadingOption(option: Option, columnIndex: number): boolean {
  if (option.loading === true) return true
  if (loadingKeys.value.size === 0) return false
  if (!loadingKeys.value.has(pathKey(pathOfOption(option, columnIndex)))) return false
  return getChildren(option).length === 0
}
/** 切换某条路径的勾选：按「子树全部叶子」为单位整体增删 */
function toggleCheckPath(path: CascaderPath): void {
  if (path.length === 0) return
  const leafPaths: CascaderPath[] = []
  collectLeafPaths(path, leafPaths)
  const currentKeys = checkedKeySet.value
  const allChecked = leafPaths.every((leaf) => currentKeys.has(pathKey(leaf)))
  const removing = new Set(leafPaths.map((leaf) => pathKey(leaf)))
  const rest = checkedLeafPaths.value.filter((leaf) => !removing.has(pathKey(leaf)))
  // 未全选时补齐该子树的全部叶子：rest 已剔除其中的已勾选叶子，只补未勾选的会丢掉已选项
  const next = allChecked ? rest : [...rest, ...leafPaths]
  emitMultipleChange(next)
  setSearchValue('')
}
/** 移除多选 tag（tag 移除按钮 / 退格键共用） */
function removeTag(path: CascaderPath, e?: MouseEvent): void {
  e?.stopPropagation()
  if (props.disabled) return
  const leafPaths: CascaderPath[] = []
  collectLeafPaths(path, leafPaths)
  const removing = new Set(leafPaths.map((leaf) => pathKey(leaf)))
  emitMultipleChange(checkedLeafPaths.value.filter((leaf) => !removing.has(pathKey(leaf))))
}
/** 点选选项：多选切换勾选（父级只展开），单选按叶子 / changeOnSelect 决定是否更新值 */
function onOptionClick(option: Option, columnIndex: number): void {
  if (option.disabled) return
  const cells = pathOfOption(option, columnIndex)
  if (cells.length === 0) return
  activeCells.value = cells
  const leaf = isLeafOption(option)
  if (isMultiple.value) {
    if (leaf) {
      toggleCheckPath(cells)
    } else {
      loadChildren(option, cells)
    }
    return
  }
  if (leaf) {
    setSearchValue('')
    emitChange(cells)
    closePanel()
    focusTrigger()
    return
  }
  loadChildren(option, cells)
  if (!props.changeOnSelect) return
  emitChange(cells)
  // 悬停展开时点选父级即为「最终选定」；点击展开下保留面板，供继续下钻
  if (props.expandTrigger === 'hover') {
    closePanel()
  }
}
/** 勾选按钮点击（不触发展开） */
function onCheckboxClick(option: Option, columnIndex: number, e: MouseEvent): void {
  e.stopPropagation()
  if (option.disabled) return
  toggleCheckPath(pathOfOption(option, columnIndex))
}
/** 双击选项：changeOnSelect 下作为「结束下钻」的快捷操作 */
function onOptionDblclick(): void {
  if (props.changeOnSelect && mergedOpen.value && !isMultiple.value) {
    closePanel()
  }
}
function onOptionMouseEnter(option: Option, columnIndex: number): void {
  if (props.expandTrigger !== 'hover' || option.disabled) return
  const cells = pathOfOption(option, columnIndex)
  if (cells.length > 0) {
    activeCells.value = cells
    loadChildren(option, cells)
  }
}
/** 点选搜索结果：单选回填并收起；多选切换勾选并保持展开 */
function onSearchItemClick(path: Option[]): void {
  const cells = path
    .map((option) => getOptionValue(option))
    .filter((value): value is CascaderValue => value !== undefined)
  if (cells.length === 0) return
  activeCells.value = cells
  if (isMultiple.value) {
    toggleCheckPath(cells)
    return
  }
  setSearchValue('')
  emitChange(cells)
  closePanel()
  focusTrigger()
}
function onSearchInput(e: Event): void {
  // 输入法合成中不触发 search / 过滤：以 v-model 在元素上维护的 composing 标记为准
  const el = e.target as HTMLInputElement & { composing?: boolean }
  if (el?.composing) return
  const value = el?.value ?? ''
  emits('search', value)
  activeCells.value = []
  searchHoverIndex.value = 0
  if (!mergedOpen.value) {
    openPanel()
  }
}
function onCompositionStart(): void {
  isComposing.value = true
}
function onCompositionEnd(): void {
  isComposing.value = false
}
/**
 * 清除选中值：多选与单选都回写空数组（单选的空数组即未选）
 *
 * 清值后直接收起面板（不清空激活路径）：激活路径一旦同步清空，列会在收起动画开始前先塌陷成根列，
 * 表现为「右列瞬间消失、首列再淡出」的两段式动画；保留列内容才能让整个面板作为一个整体收起
 */
function onClear(e?: MouseEvent): void {
  e?.stopPropagation()
  if (props.disabled) return
  setSearchValue('')
  closePanel()
  if (props.value === undefined) {
    innerValue.value = []
  }
  emits('update:value', [])
  emits('change', [], [])
  emits('clear')
  focusTrigger()
}
/**
 * 键盘交互：Esc 收起面板、Enter 选中当前激活项、↑↓ 在当前列内移动激活项
 * （跨列方向键与搜索结果列表的完整导航在后续迭代补齐）
 */
function onKeydown(e: KeyboardEvent): void {
  if (props.disabled) return
  // 输入法组合中的按键全部交由 IME 处理，不驱动面板
  if (e.isComposing || isComposing.value) return
  if (e.key === 'Escape') {
    if (mergedOpen.value) {
      e.preventDefault()
      closePanel()
    }
    return
  }
  // 搜索态：↑↓ 在结果间移动，Enter 选中当前高亮结果
  if (panelSearchMode.value) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (searchItems.value.length === 0) return
      e.preventDefault()
      const step = e.key === 'ArrowDown' ? 1 : -1
      searchHoverIndex.value = (searchHoverIndex.value + step + searchItems.value.length) % searchItems.value.length
      return
    }
    if (e.key === 'Enter') {
      if (!mergedOpen.value) {
        openPanel()
        return
      }
      const item = searchItems.value[searchHoverIndex.value] ?? searchItems.value[0]
      if (!item) return
      e.preventDefault()
      onSearchItemClick(item.path)
      return
    }
    return
  }
  if (!mergedOpen.value) {
    // 面板未展开时，方向键 / 回车都可唤起面板
    if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      openPanel()
    }
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    const activePath = findPathOptions(activeCells.value)
    const activeOption = activePath?.[activePath.length - 1]
    if (!activeOption || activeOption.disabled) return
    if (isMultiple.value) {
      toggleCheckPath(activeCells.value)
      return
    }
    if (!isLeafOption(activeOption) && !props.changeOnSelect) return
    emitChange(activeCells.value)
    if (isLeafOption(activeOption)) {
      closePanel()
    }
    return
  }
  // → 进入当前激活项的子列（无子项时触发异步加载），← 退回上一列
  if (e.key === 'ArrowRight') {
    const activePath = findPathOptions(activeCells.value)
    const activeOption = activePath?.[activePath.length - 1]
    if (!activeOption || activeOption.disabled) return
    const children = getChildren(activeOption)
    if (children.length === 0) {
      loadChildren(activeOption, activeCells.value)
      return
    }
    const firstChild = children.find((child) => !child.disabled) ?? children[0]
    const firstValue = getOptionValue(firstChild)
    if (firstValue === undefined) return
    e.preventDefault()
    activeCells.value = [...activeCells.value, firstValue]
    return
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    // 已在首列时 ← 收起面板（与 → 进入下一列对称）
    if (activeCells.value.length > 1) {
      activeCells.value = activeCells.value.slice(0, -1)
    } else {
      closePanel()
    }
    return
  }
  // 多选：Space 切换当前激活项勾选、Backspace 删除最后一个 tag（搜索文本为空时）
  if (isMultiple.value && e.key === ' ') {
    if (activeCells.value.length === 0) return
    e.preventDefault()
    toggleCheckPath(activeCells.value)
    return
  }
  if (isMultiple.value && e.key === 'Backspace' && mergedSearchValue.value === '') {
    const lastTag = tagItems.value[tagItems.value.length - 1]
    if (lastTag) {
      e.preventDefault()
      removeTag(lastTag.value)
    }
    return
  }
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  e.preventDefault()
  // 在当前激活项所在的列内移动（无激活时为首列）：↑↓ 只换高亮、不展开子列，→ 才进入下一列
  const columnIndex = Math.max(activeCells.value.length - 1, 0)
  const column = columns.value[columnIndex] ?? []
  const currentIndex = column.findIndex((option) => isActiveOption(option, columnIndex))
  const step = e.key === 'ArrowDown' ? 1 : -1
  for (let offset = 1; offset <= column.length; offset++) {
    const nextIndex = (currentIndex + step * offset + column.length) % column.length
    const nextOption = column[nextIndex]
    if (!nextOption || nextOption.disabled) continue
    const cells = pathOfOption(nextOption, columnIndex)
    if (cells.length > 0) {
      activeCells.value = cells
    }
    return
  }
}
const customSuffixIcon = computed<(() => (string | VNode)[]) | null>(() => {
  if (slots.suffixIcon) {
    return () => slots.suffixIcon!()
  }
  const icon = props.suffixIcon
  if (!icon) return null
  return () => [typeof icon === 'function' ? (icon as () => VNode)() : icon]
})
const customClearIcon = computed<(() => (string | VNode)[]) | null>(() => {
  if (slots.clearIcon) {
    return () => slots.clearIcon!({ clear: onClear })
  }
  const icon = props.clearIcon
  if (!icon) return null
  return () => [typeof icon === 'function' ? (icon as () => VNode)() : icon]
})
// 次级菜单展开图标 / 加载图标 / tag 移除图标：插槽优先（项目约定），其次 prop
const customExpandIcon = computed<(() => (string | VNode)[]) | null>(() => {
  if (slots.expandIcon) {
    return () => slots.expandIcon!()
  }
  const icon = props.expandIcon
  if (!icon) return null
  return () => [typeof icon === 'function' ? (icon as () => VNode)() : icon]
})
const customLoadingIcon = computed<(() => (string | VNode)[]) | null>(() => {
  if (slots.loadingIcon) {
    return () => slots.loadingIcon!()
  }
  const icon = props.loadingIcon
  if (!icon) return null
  return () => [typeof icon === 'function' ? (icon as () => VNode)() : icon]
})
const customRemoveIcon = computed<(() => (string | VNode)[]) | null>(() => {
  if (slots.removeIcon) {
    return () => slots.removeIcon!()
  }
  const icon = props.removeIcon
  if (!icon) return null
  return () => [typeof icon === 'function' ? (icon as () => VNode)() : icon]
})
// 折叠 tag 的提示内容：插槽优先，其次 prop，最后回落「+ N ...」
const customMaxTagPlaceholder = computed<(() => string | VNode) | null>(() => {
  if (slots.maxTagPlaceholder) {
    return () => slots.maxTagPlaceholder!(omittedPlaceholderParams.value) as unknown as VNode
  }
  const placeholder = props.maxTagPlaceholder
  if (placeholder === undefined) return null
  return () => (typeof placeholder === 'function' ? placeholder(omittedPlaceholderParams.value) : placeholder)
})
// 清除图标可用：开启 allowClear、未禁用，且存在已选值或搜索文本
const canClear = computed(
  () => props.allowClear && !props.disabled && (valuePaths.value.length > 0 || mergedSearchValue.value !== '')
)
const customNotFoundContent = computed<(() => string | VNode) | null>(() => {
  const content = props.notFoundContent
  if (content === undefined || content === null) return null
  return () => content
})
const screenReaderText = computed(() => {
  if (mergedOpen.value) return ''
  return isMultiple.value ? tagItems.value.map((item) => item.label).join(', ') : displayText.value
})
// 受控 open：外部变更同步到内部状态（模板统一读 mergedOpen，内部值仅作镜像）
watch(
  () => props.open,
  (value) => {
    if (typeof value === 'boolean') {
      innerOpen.value = value
    }
  },
  { immediate: true }
)
// 受控 searchValue：外部变更同步到内部可写目标
watch(
  () => props.searchValue,
  (value) => {
    if (value !== undefined) {
      innerSearchValue.value = value
    }
  },
  { immediate: true }
)
// 非受控模式下由内部状态变化上报开合事件；受控模式由 setPanelOpen 在「用户请求变更」时派发
watch(innerOpen, (open) => {
  if (props.open === undefined) {
    emitPanelChange(open)
  }
})
// 展开时把激活路径复位到已选路径（没有已选值时只展示根列）；收起时只清搜索文本。
// 收起期间保留激活路径，否则列会在收起动画途中塌陷，看起来像「逐列关闭」而非整体收起
watch(mergedOpen, (open) => {
  if (open) {
    /*
      展开即回到上次关掉时的各列位置：缓存（渲染窗口的依据）保持不变，只把容器 scrollTop 写回，
      由 restoreColumnScroll 统一夹取并回写。激活路径变化（换父级 / 选中值变了）的归零与定位
      交给下面的 activeCells 监听，二者互不覆盖
    */
    nextTick(restoreColumnScroll)
    // 单选：展开时对齐已选路径，保证面板与回填内容对应。
    // 路径没变就不重新赋值 —— 赋值会触发激活项定位，把用户上次的滚动位置拖走；
    // 多选：没有「当前路径」，且已选值可能有多条，取第一条展开会误导 —— 沿用上次的展开状态，
    // 首次打开时激活路径为空，自然只展示根列
    if (!isMultiple.value) {
      const selectedPath = valuePaths.value[0] ?? []
      if (pathKey(activeCells.value) !== pathKey(selectedPath)) {
        activeCells.value = [...selectedPath]
      }
    }
    searchHoverIndex.value = 0
    return
  }
  setSearchValue('')
})
// 外部改动 value 后，面板未展开时无需处理；展开中同步激活路径，避免面板与回填内容错位。
// 值被清空时不回退激活路径：清空只是取消选中，面板停在当前列，收起时再统一复位。
// 多选不同步：勾选任一分支都只是增删选中项，不该把面板展开到该分支（与打开时的口径一致）
watch(
  () => props.value,
  () => {
    const nextPath = valuePaths.value[0] ?? []
    if (mergedOpen.value && !isMultiple.value && !panelSearchMode.value && nextPath.length > 0) {
      activeCells.value = [...nextPath]
    }
  }
)
/**
 * 计算 responsive 模式下的可见 tag 数
 *
 * 全部 tag 始终渲染在 DOM 中（被折叠项以绝对定位隐藏，不占位但可量宽），
 * 因此直接量取每个 tag 的真实宽度（含 tagRender 的自定义渲染），无需额外的镜像节点
 */
function measureResponsiveTagCount(): void {
  const container = contentRef.value
  if (!container || props.maxTagCount !== 'responsive') return
  const total = tagItems.value.length
  const tagNodes = Array.from(
    container.querySelectorAll<HTMLElement>('.cascader-selection-item:not(.cascader-selection-item-rest)')
  )
  const restNode = container.querySelector<HTMLElement>('.cascader-selection-item-rest')
  const restWidth = restNode ? restNode.offsetWidth + TAG_GAP : 0
  const containerStyle = getComputedStyle(container)
  const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0
  const paddingRight = parseFloat(containerStyle.paddingRight) || 0
  // 输入框与 tag 同处一个换行流，须预留它可压缩到的最小占位：
  // 否则 tag 恰好占满一整行时，输入框被挤到下一行，容器会凭空多出一行空白
  const available = container.clientWidth - paddingLeft - paddingRight - SEARCH_MIN_WIDTH - SEARCH_GAP
  let used = 0
  let count = 0
  for (let index = 0; index < tagNodes.length; index++) {
    const width = tagNodes[index].offsetWidth + TAG_GAP
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
// 触发器自身尺寸变化（宽度预设固定、tag 换行、responsive 折叠依据）时重算面板位置与可见 tag 数
useResizeObserver(contentRef, () => {
  measureResponsiveTagCount()
  if (panelVisible.value) {
    popupRef.value?.sync()
  }
})
// responsive 折叠：tag 数量 / 文本 / 尺寸变化时重新量取（容器宽度由 ResizeObserver 兜住）
watch(
  [() => props.maxTagCount, () => props.size, tagItems],
  () => {
    if (props.maxTagCount === 'responsive') {
      nextTick(measureResponsiveTagCount)
    }
  },
  { flush: 'post' }
)
// 承载层（Modal / Drawer / Dialog）关闭时收起面板并归位聚焦态
const containerOpen = injectFromChain(zIndexContainerOpenKey) ?? null
if (containerOpen) {
  watch(containerOpen, (open) => {
    if (!open) {
      closePanel()
      focused.value = false
      activeCells.value = []
    }
  })
}
/**
 * 自定义触发器下的外部点击收起：触发器没有输入框，焦点不会离开组件，
 * 因此无法沿用「输入框 blur」的收起路径，改为文档级 mousedown 判定（捕获阶段，先于触发器的开合）
 */
function onDocumentMousedown(e: MouseEvent): void {
  if (!mergedOpen.value) return
  const target = e.target as Node | null
  if (!target) return
  if (wrapRef.value?.contains(target) || popupRef.value?.panelRef?.contains(target)) return
  closePanel()
}
onMounted(() => {
  if (props.autofocus && !props.disabled) {
    focusTrigger()
  }
  // responsive 折叠：挂载时同步量取一次（读布局属性会强制回流拿到真实宽度）
  measureResponsiveTagCount()
  if (hasCustomTrigger) {
    document.addEventListener('mousedown', onDocumentMousedown, true)
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentMousedown, true)
})
defineExpose({
  focus: focusTrigger,
  blur: () => inputRef.value?.blur(),
  /** 多选已勾选项的选项数据，按 showCheckedStrategy 折叠，与 change 第二参同源；非多选返回空数组 */
  getCheckedData: (): Option[][] =>
    isMultiple.value ? formatStrategyPaths(checkedLeafPaths.value).map(resolveOptions) : []
})
</script>
<template>
  <div
    ref="wrapRef"
    class="cascader-wrap"
    :class="{
      'cascader-focused': focused,
      'cascader-open': mergedOpen,
      'cascader-small': size === 'small',
      'cascader-large': size === 'large',
      'cascader-disabled': disabled,
      'cascader-borderless': !bordered,
      'cascader-status-error': status === 'error',
      'cascader-status-warning': status === 'warning',
      'cascader-allow-clear': allowClear,
      'search-cascader': mergedShowSearch,
      'cascader-custom': hasCustomTrigger,
      'cascader-multiple': isMultiple
    }"
    :style="`--cascader-width: ${cascaderWidth}; --cascader-height: ${cascaderHeight};`"
    @mousedown="onMousedown"
    @click="togglePanel"
  >
    <!-- 屏幕阅读器播报：面板关闭时聚合已选内容 -->
    <span v-if="screenReaderText" class="cascader-sr-only" aria-live="polite">{{ screenReaderText }}</span>
    <!-- 自定义触发器：默认插槽整体替换选择框内容，仅保留点击开合与面板锚点 -->
    <div v-if="hasCustomTrigger" ref="contentRef" class="cascader-custom-trigger">
      <slot />
    </div>
    <div v-else ref="contentRef" class="cascader-content-container">
      <!-- 多选：tag 列表；超出 maxTagCount 的部分折叠为提示 -->
      <template v-if="isMultiple">
        <span
          v-for="(item, index) in tagItems"
          :key="index"
          class="cascader-selection-item"
          :class="{
            'cascader-selection-item-disabled': item.disabled,
            'cascader-selection-item-custom': slots.tagRender,
            'cascader-tag-hidden': index >= visibleTagCount
          }"
          :title="item.label"
        >
          <slot v-if="slots.tagRender" name="tagRender" v-bind="item" />
          <template v-else>
            <span class="cascader-selection-item-content">{{ item.label }}</span>
            <span
              v-if="item.closable"
              class="cascader-selection-item-remove"
              @mousedown.stop.prevent
              @click.stop="item.onClose($event)"
            >
              <slot v-if="slots.removeIcon" name="removeIcon" />
              <component :is="customRemoveIcon" v-else-if="customRemoveIcon" />
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
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                ></path>
              </svg>
            </span>
          </template>
        </span>
        <span v-if="omittedTagItems.length" class="cascader-selection-item cascader-selection-item-rest">
          <slot v-if="slots.maxTagPlaceholder" name="maxTagPlaceholder" v-bind="omittedPlaceholderParams" />
          <component :is="customMaxTagPlaceholder" v-else-if="customMaxTagPlaceholder" />
          <template v-else>{{ omittedText }}</template>
        </span>
      </template>
      <!-- 单选：回填内容；有输入文本时隐藏，避免与输入内容重叠 -->
      <span v-if="!isMultiple && !showPlaceholder && !hasTextInput" class="cascader-item" :title="displayText">
        <slot v-if="slots.displayRender" name="displayRender" v-bind="displayParams" />
        <component :is="customDisplayRender" v-else-if="customDisplayRender" />
        <template v-else>{{ displayText }}</template>
      </span>
      <!-- 占位文本与回填内容并列判定（多选也要显示）：多选下由样式绝对定位到底层 -->
      <span v-if="showPlaceholder" class="cascader-item cascader-placeholder">{{ placeholder }}</span>
      <!-- 输入框排在回填内容之后：多选时 tag 占满前段，光标紧随末尾 tag -->
      <span class="cascader-search">
        <input
          ref="inputRef"
          class="search-input"
          :class="{ 'caret-show': focused }"
          type="text"
          autocomplete="off"
          role="combobox"
          :id="mergedCascaderId"
          :aria-expanded="mergedOpen"
          aria-haspopup="listbox"
          :aria-controls="listboxId"
          :aria-owns="listboxId"
          aria-autocomplete="list"
          :readonly="!mergedShowSearch"
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
      <!-- 后缀图标：多选不显示（与多选无展开箭头一致）；自定义后缀整体接管，否则按「搜索态 ⇄ 箭头」切换 -->
      <template v-if="!isMultiple">
        <span v-if="customSuffixIcon" class="icon-svg cascader-suffix show-svg">
          <component :is="customSuffixIcon" />
        </span>
        <!-- 箭头与搜索图标常驻 DOM，只切换 .show-svg 控制透明度：互换用 v-if 会直接卸载 / 挂载元素，
             开关面板时「箭头 ⇄ 搜索图标」就没有交叉淡入淡出的过渡效果 -->
        <template v-else>
          <svg
            class="icon-svg arrow-svg"
            :class="{ 'show-svg': !showSearchIcon }"
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
      </template>
      <!-- 清除图标：满足清除条件时渲染，hover 触发器时显示（覆盖在箭头之上） -->
      <span v-if="slots.clearIcon" class="icon-svg clear-svg" :class="{ 'show-svg': canClear }" @click.stop="onClear">
        <slot name="clearIcon" :clear="onClear" />
      </span>
      <span
        v-else-if="customClearIcon"
        class="icon-svg clear-svg"
        :class="{ 'show-svg': canClear }"
        @click.stop="onClear"
      >
        <component :is="customClearIcon" />
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
    <!-- 浮层宿主承担 Teleport / 定位 / 翻转自适应 / 层级 / 过渡 / 字体承接与主题转发 -->
    <Popup
      ref="popupRef"
      :show="panelVisible"
      :to="resolvedTo"
      :anchor="contentRef"
      :placement="floatingPlacement"
      :offset="4"
      :flip="flip"
      :shift="true"
      boundary="scrollParent"
      :match-trigger-width="matchTriggerWidth"
      :default-z-index="FLOATING_LAYER_Z_INDEX.select"
      :z-index="zIndex"
      :panel-class="mergedPanelClass"
      :panel-style="cascaderPanelStyle"
      :transition-props="panelTransitionProps"
      @mousedown="onPanelMousedown"
      @focusout="onBlur"
      @click.stop
    >
      <div class="cascader-panel-body">
        <div class="cascader-panel-menus">
          <!-- 搜索结果：单列展示完整路径，命中片段高亮 -->
          <div v-if="showSearchPanel" class="cascader-menu cascader-menu-search">
            <Scrollbar
              class="cascader-menu-scroll"
              :style="{ '--scrollbar-rail-vertical-right': '2px 0 2px auto' }"
              v-bind="scrollbarProps"
            >
              <ul class="cascader-menu-list" role="listbox" :id="listboxId">
                <li
                  v-for="(item, index) in searchItems"
                  :key="item.key"
                  class="cascader-option"
                  :class="{ 'option-hover': index === searchHoverIndex }"
                  role="option"
                  aria-selected="false"
                  @mousedown.prevent
                  @mouseenter="searchHoverIndex = index"
                  @click.stop="onSearchItemClick(item.path)"
                >
                  <span class="cascader-option-content">
                    <slot
                      v-if="slots.showSearchRender"
                      name="showSearchRender"
                      :input-value="mergedSearchValue"
                      :path="item.path"
                    />
                    <component :is="item.renderNode" v-else-if="item.renderNode" />
                    <template v-else>
                      <template v-for="(level, levelIndex) in item.segments" :key="levelIndex">
                        <span v-if="levelIndex > 0"> / </span>
                        <span
                          v-for="(segment, segmentIndex) in level"
                          :key="segmentIndex"
                          :class="{ 'cascader-option-keyword': segment.hit }"
                          >{{ segment.text }}</span
                        >
                      </template>
                    </template>
                  </span>
                </li>
              </ul>
            </Scrollbar>
          </div>
          <!-- 级联列：每列一级数据，最后一列为当前激活项的子级 -->
          <template v-if="!showSearchPanel && !showEmptyPanel">
            <div
              v-for="(column, columnIndex) in columns"
              :key="columnIndex"
              :ref="(el) => setColumnMenuRef(el, columnIndex)"
              class="cascader-menu"
              :style="[dropdownMenuColumnStyle, columnLockStyle(columnIndex, column.length)]"
            >
              <!-- 锁宽测量层：整列全量渲染一次（不可见、不占位），量出最宽行宽后由 columnLockStyle 锁定 -->
              <div
                v-if="measuringColumns && canLockColumnWidth(column.length)"
                class="cascader-menu-measure"
                aria-hidden="true"
              >
                <div v-for="(option, optionIndex) in column" :key="optionIndex" class="cascader-option">
                  <span v-if="isMultiple" class="cascader-option-checkbox"></span>
                  <span class="cascader-option-content">{{ getOptionLabelText(option) }}</span>
                  <span v-if="!isLeafOption(option)" class="cascader-option-expand-icon"></span>
                </div>
              </div>
              <Scrollbar
                class="cascader-menu-scroll"
                :style="{ '--scrollbar-rail-vertical-right': '2px 0 2px auto' }"
                v-bind="scrollbarProps"
                @scroll="onColumnScroll(columnIndex, $event)"
              >
                <ul
                  class="cascader-menu-list"
                  role="listbox"
                  :aria-multiselectable="isMultiple"
                  :id="columnIndex === 0 ? listboxId : undefined"
                >
                  <li
                    v-if="columnPadding(columnIndex, column.length).top > 0"
                    class="cascader-virtual-placeholder"
                    :style="{ height: `${columnPadding(columnIndex, column.length).top}px` }"
                    aria-hidden="true"
                  ></li>
                  <li
                    v-for="option in visibleColumnOptions(column, columnIndex)"
                    :key="pathKey(pathOfOption(option, columnIndex))"
                    class="cascader-option"
                    :class="{
                      'option-active': isActiveOption(option, columnIndex),
                      'option-disabled': option.disabled
                    }"
                    role="option"
                    :aria-selected="isActiveOption(option, columnIndex)"
                    :aria-checked="isMultiple ? getCheckState(option, columnIndex) === 'checked' : undefined"
                    :aria-disabled="option.disabled"
                    :title="getOptionLabelText(option)"
                    @mousedown.prevent
                    @click.stop="onOptionClick(option, columnIndex)"
                    @dblclick.stop="onOptionDblclick"
                    @mouseenter="onOptionMouseEnter(option, columnIndex)"
                  >
                    <span
                      v-if="isMultiple"
                      class="cascader-option-checkbox"
                      :class="{
                        'checkbox-checked': getCheckState(option, columnIndex) === 'checked',
                        'checkbox-half': getCheckState(option, columnIndex) === 'half'
                      }"
                      role="checkbox"
                      :aria-checked="
                        getCheckState(option, columnIndex) === 'half'
                          ? 'mixed'
                          : getCheckState(option, columnIndex) === 'checked'
                      "
                      @mousedown.prevent
                      @click="onCheckboxClick(option, columnIndex, $event)"
                    >
                      <span
                        v-if="!option.disabled"
                        class="checkbox-wave"
                        :class="{ 'wave-active': getCheckState(option, columnIndex) === 'checked' }"
                      ></span>
                    </span>
                    <span class="cascader-option-content">
                      <slot v-if="slots.option" name="option" v-bind="option" />
                      <template v-else>{{ getOptionLabelText(option) }}</template>
                    </span>
                    <!-- 子项加载中：显示加载图标替代展开箭头 -->
                    <span v-if="isLoadingOption(option, columnIndex)" class="cascader-option-loading-icon">
                      <slot v-if="slots.loadingIcon" name="loadingIcon" />
                      <component :is="customLoadingIcon" v-else-if="customLoadingIcon" />
                      <svg
                        v-else
                        focusable="false"
                        data-icon="loading"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
                        ></path>
                      </svg>
                    </span>
                    <span v-else-if="!isLeafOption(option)" class="cascader-option-expand-icon">
                      <slot v-if="slots.expandIcon" name="expandIcon" />
                      <component :is="customExpandIcon" v-else-if="customExpandIcon" />
                      <svg
                        v-else
                        focusable="false"
                        data-icon="right"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                      >
                        <path
                          d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
                        ></path>
                      </svg>
                    </span>
                  </li>
                  <li
                    v-if="columnPadding(columnIndex, column.length).bottom > 0"
                    class="cascader-virtual-placeholder"
                    :style="{ height: `${columnPadding(columnIndex, column.length).bottom}px` }"
                    aria-hidden="true"
                  ></li>
                </ul>
              </Scrollbar>
            </div>
          </template>
          <!-- 空数据：与选项区同高，避免面板高度跳动 -->
          <div v-if="showEmptyPanel" class="cascader-panel-empty">
            <slot v-if="slots.notFoundContent" name="notFoundContent" />
            <component :is="customNotFoundContent" v-else-if="customNotFoundContent" />
            <Empty v-else image="outlined" />
          </div>
        </div>
        <!-- 底部操作区：与选项区分割，供自定义「确定 / 重置」等操作 -->
        <div v-if="slots.action" class="cascader-panel-footer">
          <slot name="action" />
        </div>
      </div>
    </Popup>
  </div>
</template>
<style lang="less" scoped>
.cascader-sr-only {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
/* 自定义触发器：尺寸由插槽内容决定，不再套用选择框的宽高与皮肤 */
.cascader-custom {
  width: auto;
  height: auto;
  .cascader-custom-trigger {
    display: inline-flex;
    align-items: center;
    line-height: 1.5714285714285714;
  }
}
.cascader-wrap {
  position: relative;
  display: inline-block;
  width: var(--cascader-width);
  height: var(--cascader-height);
  font-size: 14px;
  font-weight: 400;
  color: var(--va-text-color-1);
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  &:not(.cascader-disabled):hover {
    .cascader-content-container {
      border-color: var(--va-cp-cascader-primary-color-hover, var(--va-primary-color-hover));
    }
  }
  .cascader-content-container {
    position: relative;
    display: flex;
    box-sizing: border-box;
    padding: 0 11px;
    border: 1px solid var(--va-border-color);
    border-radius: 6px;
    background-color: var(--va-bg-container-color);
    width: 100%;
    height: 100%;
    outline: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &::after {
      display: inline-block;
      width: 0;
      visibility: hidden;
      content: '\a0';
      line-height: calc(var(--cascader-height) - 2px);
      transition: line-height 0.3s;
    }
    .cascader-search {
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
    .cascader-item {
      position: relative;
      flex: 1;
      line-height: calc(var(--cascader-height) - 2px);
      user-select: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      /* 行高与让位内边距同样随尺寸档位过渡，否则高度平滑而行高瞬跳，看起来像字体突变 */
      transition:
        color 0.3s,
        line-height 0.3s,
        padding 0.3s;
    }
    .cascader-placeholder {
      color: var(--va-text-color-disabled);
      transition: none;
      pointer-events: none;
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
      color: var(--va-text-color-disabled);
      fill: currentColor;
      user-select: none;
      pointer-events: none;
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
    .clear-svg {
      z-index: 1;
      opacity: 0;
      background: var(--va-bg-container-color);
      cursor: pointer;
      transition:
        color 0.2s,
        opacity 0.3s;
      &:hover {
        color: var(--va-text-color-3);
      }
    }
    .clear-svg.show-svg {
      opacity: 0;
    }
  }
  &:hover .clear-svg.show-svg {
    opacity: 1;
    pointer-events: auto;
  }
}
.cascader-open:not(.cascader-disabled) {
  .cascader-item {
    color: var(--va-text-color-disabled);
  }
  .arrow-svg {
    transform: rotate(180deg);
  }
}
.cascader-focused:not(.cascader-disabled) {
  .cascader-content-container {
    border-color: var(--va-cp-cascader-primary-color-hover, var(--va-primary-color-hover));
    box-shadow: var(--va-cp-cascader-focus-shadow, var(--va-focus-shadow));
  }
}
.search-cascader {
  .cascader-content-container {
    cursor: text;
    .cascader-search .search-input {
      cursor: auto;
      color: inherit;
      opacity: 1;
    }
  }
}
/* 单选带后缀图标（箭头 / 搜索图标）：回填与占位文本为其让位，避免省略号压到图标上
   （多选不渲染后缀图标，回填内容由 tag 承担，无需让位） */
.cascader-wrap:not(.cascader-multiple) .cascader-item {
  padding-right: 18px;
}
.cascader-wrap.cascader-small:not(.cascader-multiple) .cascader-item {
  padding-right: 21px;
}
.cascader-wrap.cascader-large:not(.cascader-multiple) .cascader-item {
  padding-right: 20px;
}
.cascader-small {
  font-size: 14px;
  .cascader-content-container {
    padding: 0 7px;
    border-radius: 4px;
    .cascader-search {
      left: 7px;
      right: 28px;
    }
  }
}
.cascader-large {
  font-size: 16px;
  .cascader-content-container {
    padding: 0 11px;
    border-radius: 8px;
  }
}
/* 多选：触发器高度随 tag 换行增长，搜索框回归行内流 */
.cascader-wrap.cascader-multiple {
  height: auto;
  min-height: var(--cascader-height);
  --cascader-tag-height: calc(var(--cascader-height) - 8px);
  .cascader-content-container {
    min-height: var(--cascader-height);
    flex-wrap: wrap;
    align-items: center;
    padding: 1px 4px;
    cursor: text;
    &::after {
      content: none;
    }
  }
  &.cascader-allow-clear .cascader-content-container {
    padding-right: 24px;
  }
  .cascader-content-container .cascader-search {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    display: inline-flex;
    flex: 1 1 0;
    margin-left: 4px;
    min-width: 4px;
    max-width: 100%;
    .search-input {
      width: 100%;
      height: var(--cascader-tag-height);
      line-height: calc(var(--cascader-tag-height) - 2px);
      color: inherit;
      opacity: 1;
      cursor: auto;
      caret-color: auto;
    }
  }
  .cascader-content-container .cascader-placeholder {
    position: absolute;
    top: 50%;
    right: 11px;
    left: 11px;
    transform: translateY(-50%);
    line-height: 1.5714285714285714;
  }
}
.cascader-selection-item {
  display: flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
  max-width: 100%;
  height: var(--cascader-tag-height);
  margin: 2px 4px 2px 0;
  padding-left: 8px;
  padding-right: 4px;
  border: 1px solid var(--va-border-split-color);
  border-radius: 4px;
  background: var(--va-fill-color-2);
  color: var(--va-text-color-1);
  line-height: calc(var(--cascader-tag-height) - 2px);
  cursor: default;
  user-select: none;
  /* tag 高度 / 行高随尺寸档位派生，需与触发器同步过渡（字号跟随根字号，不单独声明） */
  transition:
    height 0.3s,
    line-height 0.3s;
}
/* 自定义 tag（#tagRender）：皮肤由使用者接管，包裹层只负责布局与换行度量 */
.cascader-selection-item-custom {
  height: auto;
  padding: 0;
  border: none;
  background: transparent;
}
.cascader-selection-item-content {
  display: inline-block;
  margin-right: 4px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
}
.cascader-selection-item-remove {
  display: inline-flex;
  align-items: center;
  color: var(--va-text-color-3);
  font-size: 10px;
  font-weight: bold;
  line-height: inherit;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: var(--va-text-color-1);
  }
  svg {
    vertical-align: -0.2em;
  }
}
.cascader-tag-hidden {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
.cascader-selection-item-disabled {
  border-color: var(--va-border-color);
  color: var(--va-text-color-disabled);
  cursor: not-allowed;
}
/* 折叠提示沿用普通 tag 皮肤，仅左右内边距对称（无 remove 图标） */
.cascader-selection-item-rest {
  padding: 0 8px;
}
.cascader-borderless {
  &.cascader-wrap .cascader-content-container {
    border-color: transparent;
    background-color: transparent;
  }
  &:not(.cascader-disabled) {
    &:hover .cascader-content-container {
      border-color: transparent;
    }
    &.cascader-focused .cascader-content-container {
      border-color: transparent;
      box-shadow: none;
    }
  }
}
.cascader-disabled {
  .cascader-content-container {
    color: var(--va-text-color-disabled);
    background: var(--va-fill-color-1);
    user-select: none;
    cursor: not-allowed;
    .cascader-search .search-input {
      cursor: not-allowed;
    }
  }
  .cascader-item {
    color: var(--va-text-color-disabled);
  }
}
.cascader-status-error:not(.cascader-disabled) {
  .cascader-content-container {
    border-color: var(--va-error-color);
  }
  &:hover .cascader-content-container {
    border-color: var(--va-error-color);
  }
  &.cascader-focused .cascader-content-container {
    border-color: var(--va-error-color);
    box-shadow: 0 0 0 2px var(--va-error-bg-color);
  }
}
.cascader-status-warning:not(.cascader-disabled) {
  .cascader-content-container {
    border-color: var(--va-warning-color);
  }
  &:hover .cascader-content-container {
    border-color: var(--va-warning-color);
  }
  &.cascader-focused .cascader-content-container {
    border-color: var(--va-warning-color);
    box-shadow: 0 0 0 2px var(--va-warning-bg-color);
  }
}
/* 面板内的自持容器：选项皮肤挂在这一层，靠它（本组件渲染，带 scope id）保住 scoped 作用域；
   面板根（.cascader-panel-container）的几何归全局块 */
@keyframes cascader-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes cascader-checkbox-wave {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.6);
  }
}
.cascader-panel-body {
  display: flex;
  flex-direction: column;
  .cascader-panel-menus {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
  }
  /* 虚拟滚动占位：只承担高度，不带选项行的任何盒模型 */
  .cascader-virtual-placeholder {
    min-height: 0;
    padding: 0;
    list-style: none;
  }
  .cascader-panel-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px;
    border-top: 1px solid var(--va-border-split-color);
  }
  .cascader-menu {
    position: relative;
    box-sizing: border-box;
    flex: 1 0 auto;
    min-width: 111px;
    height: var(--cascader-panel-height);
    padding: 4px;
    /* 分隔线用 inset 阴影绘制：不占盒模型，展开新列时列在「最后一列 ↔ 非最后一列」之间切换
       不会改变内容区宽度（用 border 会突然少 1px，表现为内容与箭头左移一下） */
    &:not(:last-child) {
      box-shadow: inset -1px 0 0 var(--va-border-split-color);
    }
    overflow: hidden;
  }
  /* 锁宽测量层：绝对定位 + 内容宽，脱离列的宽度约束；visibility 隐藏但仍参与布局，才能量到真实宽度 */
  .cascader-menu-measure {
    position: absolute;
    top: 0;
    left: 0;
    width: max-content;
    visibility: hidden;
    pointer-events: none;
    .cascader-option {
      width: max-content;
      /* 按加粗形态量宽：激活项加粗后不会超过锁定宽度 */
      font-weight: 600;
    }
    .cascader-option-expand-icon {
      width: 12px;
    }
  }
  .cascader-menu-search {
    flex: auto;
    max-width: 360px;
  }
  .cascader-menu-scroll {
    height: 100%;
  }
  :deep(.scrollbar-container) {
    overscroll-behavior: none;
    overflow-anchor: none;
  }
  .cascader-menu-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .cascader-option {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    min-height: 32px;
    padding: 5px 12px;
    border-radius: 4px;
    color: var(--va-text-color-1);
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5714285714285714;
    cursor: pointer;
    transition:
      background 0.3s ease,
      color 0.3s ease;
    &:hover {
      background: var(--va-fill-color-1);
    }
    .cascader-option-content {
      flex: auto;
      /* min-width: 0 才能让内容在固定列宽内收缩：否则 flex item 的 min-width: auto
         会以文本宽度为下限，把已锁定的列宽重新撑开（表现为点击选中后面板又宽了 1px） */
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .cascader-option-expand-icon {
      flex: none;
      margin-inline-start: 4px;
      color: var(--va-text-color-3);
      font-size: 12px;
      line-height: 1;
    }
  }
  .cascader-option.option-hover {
    background: var(--va-fill-color-1);
  }
  /* 多选复选按钮：与复选框组件同款皮肤 —— 对勾与半选都由 ::after 边框绘制，扩散环改由独立节点承担 */
  .cascader-option-checkbox {
    position: relative;
    flex: none;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    margin-inline-end: 8px;
    border: 1px solid var(--va-border-color);
    border-radius: 4px;
    background: transparent;
    transition: all 0.3s;
    /* 对勾：CSS 边框旋转绘制，尺寸与缓动同复选框组件 */
    &::after {
      position: absolute;
      top: 50%;
      left: 21.5%;
      display: table;
      width: 5.7142857142857135px;
      height: 9.142857142857142px;
      border: 2px solid var(--va-text-color-solid);
      border-top: 0;
      border-left: 0;
      opacity: 0;
      content: '';
      transform: rotate(45deg) scale(0) translate(-50%, -50%);
      transition:
        all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
        opacity 0.1s;
    }
    /* 选中扩散外环：1.6 倍外扩的描边环，扩散同时淡出 */
    .checkbox-wave {
      position: absolute;
      top: -1px;
      right: -1px;
      bottom: -1px;
      left: -1px;
      box-sizing: border-box;
      border-radius: inherit;
      pointer-events: none;
      animation-iteration-count: 1;
      animation-duration: 0.3s;
      animation-timing-function: ease-in-out;
      transition: all 0.3s;
    }
    /* 默认不可见：环由选中态驱动，程序化选中时鼠标未必在项上 */
    .wave-active {
      z-index: 1;
      visibility: hidden;
      border: 2px solid var(--cascader-primary-color);
      animation-name: cascader-checkbox-wave;
      animation-fill-mode: backwards;
    }
  }
  .cascader-option:not(.option-disabled) .cascader-option-checkbox:hover {
    border-color: var(--cascader-primary-color);
    .checkbox-wave.wave-active {
      visibility: visible;
      border-color: var(--cascader-primary-color-hover);
    }
  }
  .cascader-option-checkbox.checkbox-checked {
    border-color: var(--cascader-primary-color);
    background: var(--cascader-primary-color);
    &::after {
      opacity: 1;
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
      transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    }
  }
  .cascader-option:not(.option-disabled) .cascader-option-checkbox.checkbox-checked:hover {
    border-color: transparent;
    background: var(--cascader-primary-color-hover);
  }
  /* 半选：保持容器底与默认描边，::after 退化为居中的主色实心方块 */
  .cascader-option-checkbox.checkbox-half::after {
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    border: 0;
    background: var(--cascader-primary-color);
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  .cascader-option.option-disabled .cascader-option-checkbox {
    border-color: var(--va-border-color);
    background: var(--va-fill-color-1);
    &::after {
      border-color: var(--va-text-color-disabled);
    }
    &.checkbox-half::after {
      border: 0;
      background: var(--va-text-color-disabled);
    }
  }
  .cascader-option-loading-icon {
    flex: none;
    display: inline-flex;
    margin-inline-start: 4px;
    color: var(--va-text-color-3);
    font-size: 12px;
    animation: cascader-loading-spin 1s linear infinite;
  }
  .cascader-option-keyword {
    color: var(--va-error-color);
  }
  .cascader-option.option-active:not(.option-disabled) {
    font-weight: 600;
    background: var(--cascader-item-bg-active);
  }
  .cascader-option.option-disabled {
    color: var(--va-text-color-disabled);
    cursor: not-allowed;
    &:hover {
      background: transparent;
    }
    .cascader-option-expand-icon {
      color: var(--va-text-color-disabled);
    }
  }
  .cascader-panel-empty {
    box-sizing: border-box;
    flex: auto;
    padding: 9px 8px;
    min-width: 111px;
    :deep(.empty-wrap) {
      margin-block: 8px;
      :deep(.empty-image-wrap) {
        height: 35px;
      }
    }
  }
}
</style>
<style lang="less">
/* 面板根皮肤与动画必须留在全局：它们作用于 <Popup> 宿主编译出的面板节点（scope id 属宿主），
   且宿主把面板 Teleport 到 body 后不在本组件 DOM 子树内，scoped 与 :deep() 均选不中。
   收口口径：① 面板几何以 .cascader-panel-container 收口（定位 / 指针事件 / 层级由宿主基类与内联样式承担）；
   ② 动画类与关键帧统一加 `cascader-slide-` 前缀，避免与宿主页面及其它浮层撞名；
   ③ 缩放只改独立变换属性 scale：定位由宿主内核写在独立属性 translate 上（复合链最外层，不受缩放影响） */
.cascader-panel-container {
  padding: 0;
  border-radius: 8px;
  background-color: var(--va-bg-elevated-color);
  background-clip: padding-box;
  font-size: 14px;
  outline: none;
  cursor: auto;
  box-shadow: var(--va-popup-shadow);
  overflow: hidden;
}
.cascader-slide-enter {
  scale: 0;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.cascader-slide-enter-active {
  animation-name: cascaderSlideIn;
  animation-play-state: running;
}
.cascader-slide-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.cascader-slide-leave-active {
  animation-name: cascaderSlideOut;
  animation-play-state: running;
}
@keyframes cascaderSlideIn {
  0% {
    scale: 1 0.8;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
@keyframes cascaderSlideOut {
  0% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 1 0.8;
    opacity: 0;
  }
}
</style>
