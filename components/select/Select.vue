<script setup lang="ts">
import { ref, computed, watch, watchEffect, nextTick, onMounted, inject, h, withDirectives, vShow, useSlots } from 'vue'
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
  options?: string // 分组子选项的字段名（分组 / 树形数据，P2 起支持）
}
export type SelectValue = string | number
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
  // 数据与取值
  options?: Option[] // 选项数据
  fieldNames?: FieldNames // 选项字段名配置，用于自定义选项的文本 / 值字段
  mode?: SelectMode // 设置多选模式，'multiple' 为多选，'tags' 为标签（可输入并创建新条目），不传为单选
  value?: SelectValue | SelectValue[] // (v-model:value) 当前选中的 option 条目值，mode 为 multiple / tags 时为数组
  optionLabelProp?: string // 回填到选择框的 option 属性值，未指定时取 label 字段
  // 外观与尺寸
  width?: string | number // 选择器宽度，单位 px
  height?: number // 选择器高度，单位 px
  size?: 'small' | 'middle' | 'large' // 选择器大小
  placeholder?: string // 默认占位文本
  bordered?: boolean // 是否有边框
  status?: 'error' | 'warning' // 设置校验状态
  // 交互与图标
  disabled?: boolean // 是否禁用
  autofocus?: boolean // 是否自动获取焦点
  allowClear?: boolean // 是否支持清除
  clearIcon?: VNode | (() => VNode) // 自定义清除图标
  suffixIcon?: VNode | (() => VNode) // 自定义的选择框后缀图标
  showArrow?: boolean // 是否显示下拉小箭头
  loading?: boolean // 是否处于加载状态，展开面板时后缀图标变为加载中
  // 搜索与过滤
  showSearch?: boolean // 是否支持搜索
  searchValue?: string // 控制搜索文本（受控）
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
  // 面板开合与高亮
  open?: boolean // 是否展开下拉菜单（受控）
  defaultOpen?: boolean // 是否默认展开下拉菜单
  defaultActiveFirstOption?: boolean // 是否默认高亮第一个选项
  firstActiveValue?: SelectValue | SelectValue[] // 默认高亮的选项
  // 面板内容
  dropdownRender?: (params: DropdownRenderParams) => VNode // 自定义下拉框内容
  notFoundContent?: string | VNode | null // 当下拉列表为空时显示的内容，传 null 时不展开空面板
  menuItemSelectedIcon?: VNode | (() => VNode) // 自定义当前选中的条目图标
  maxDisplay?: number // 下拉面板最多能展示的项数，超过后滚动显示
  listHeight?: number // 下拉面板滚动高度，单位 px（未传时回落 maxDisplay × 32）
  scrollbarProps?: ScrollbarProps // 下拉面板滚动条 scrollbar 组件属性配置
  // 面板定位与层级
  placement?: SelectPlacement // 下拉面板弹出位置
  flip?: boolean // 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  to?: string | HTMLElement | false // 下拉面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  popupClassName?: string // 下拉面板的类名，用于自定义面板样式
  dropdownMenuStyle?: CSSProperties // 下拉面板自定义样式，可覆盖定位（与 AutoComplete 的同名属性语义一致）
  dropdownMatchSelectWidth?: boolean | number // 下拉菜单和选择器同宽，为数字时指定下拉菜单宽度
  zIndex?: number // 下拉面板层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
}
// 声明组件插槽类型
export interface SelectSlots {
  option?: (props: Option) => VNode[]
  notFoundContent?: () => VNode[]
  suffixIcon?: () => VNode[]
  menuItemSelectedIcon?: (props: { isSelected: boolean }) => VNode[]
  clearIcon?: (props: { clear: (e?: MouseEvent) => void }) => VNode[]
  dropdownRender?: (props: DropdownRenderParams) => VNode[]
  placeholder?: () => VNode[]
  optionLabel?: (option: Option) => VNode[]
  tagRender?: (params: TagRenderParams) => VNode[]
  maxTagPlaceholder?: (params: { omittedValues: Option[] }) => VNode[]
  removeIcon?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  fieldNames: undefined,
  mode: undefined,
  value: undefined,
  optionLabelProp: undefined,
  width: 'auto',
  height: undefined,
  size: 'middle',
  placeholder: '请选择',
  bordered: true,
  status: undefined,
  disabled: false,
  autofocus: false,
  allowClear: false,
  clearIcon: undefined,
  suffixIcon: undefined,
  showArrow: undefined,
  loading: false,
  showSearch: undefined, // 未指定时按模式兜底（多选默认开启搜索），故不能在此落 false
  searchValue: undefined,
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
  open: undefined,
  defaultOpen: false,
  defaultActiveFirstOption: true,
  firstActiveValue: undefined,
  dropdownRender: undefined,
  notFoundContent: undefined,
  menuItemSelectedIcon: undefined,
  maxDisplay: 8,
  listHeight: undefined,
  scrollbarProps: () => ({}),
  placement: 'bottomLeft',
  flip: true,
  to: undefined,
  popupClassName: undefined,
  dropdownMenuStyle: undefined,
  dropdownMatchSelectWidth: true,
  zIndex: undefined
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
const emits = defineEmits([
  'update:value',
  'update:searchValue',
  'change',
  'search',
  'select',
  'clear',
  'focus',
  'blur',
  'openChange',
  'dropdownVisibleChange',
  'popupScroll',
  'mouseenter',
  'mouseleave',
  'inputKeyDown',
  'deselect'
])
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const selectWrapRef = ref<HTMLElement | null>(null) // 组件根元素引用，用于判断焦点是否仍落在本组件内
const inputRef = ref<HTMLInputElement | null>(null) // input 元素引用
const selectContentRef = ref<HTMLElement | null>(null) // selectContent 模板引用
const selectPanelRef = ref<HTMLElement | null>(null) // 下拉面板 selectPanel 模板引用
const selectPanelWrapperRef = ref<HTMLElement | null>(null) // 定位参照容器：面板 top / left 的坐标原点
const showOptions = ref<boolean>(false) // 非受控模式下显示隐藏 options 面板
const innerSearchValue = ref<string>('') // 非受控模式下的搜索文本
const focused = ref<boolean>(false) // select 是否聚焦
const isComposing = ref<boolean>(false) // 是否处于输入法(IME)合成中，合成期间不触发 search / 过滤
const hoverValue = ref<SelectValue | null>(null) // 面板中高亮项的 value
const backspaceLock = ref<boolean>(false) // 退格锁：上一次按键时搜索文本是否非空（避免清空搜索的同一次按键又删掉一个 tag）
const responsiveTagCount = ref<number>(0) // maxTagCount 为 'responsive' 时按容器宽度算出的可见 tag 数
const responsiveMeasured = ref<boolean>(false) // 是否已按容器宽度量取过（量取前先全量渲染，避免无布局环境下 tag 全被折叠）
const { colorPalettes, shadowColor } = useInject('Select') // 主题色注入
// 层级：ConfigProvider 传入 baseZIndex 时按「后出现者在上」自增分配；未传则沿用默认层级 1050
// 下拉面板需高于承载它的 Modal / Drawer / Dialog
// 领取时机由面板「出现」驱动（allocateOnMount: false）：面板首帧才渲染，挂载时不持有槽位，
// 否则未展开过的下拉会长期占位、抬高后续分配点
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
// 分组子选项字段名（antd 口径：fieldNames.options，未指定时为 'options'）
const groupField = computed(() => props.fieldNames?.options || 'options')
/** 是否为「分组」形态：任一 option 的分组字段是非空数组即成立 */
const hasGroupedOptions = computed(() =>
  props.options.some((option) => {
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
  if (!hasGroupedOptions.value) return props.options
  return props.options.flatMap((option) => {
    const children = option?.[groupField.value]
    return Array.isArray(children) && children.length > 0 ? children : [option]
  })
})
/** 子选项值 → 所属分组标签：渲染分组标题用（跨组时插入一次） */
const optionGroupLabels = computed(() => {
  const labels = new Map<string, string>()
  if (!hasGroupedOptions.value) return labels
  props.options.forEach((option) => {
    const children = option?.[groupField.value]
    if (!Array.isArray(children) || !children.length) return
    const groupLabel = String(getOptionLabel(option) ?? '')
    children.forEach((child) => {
      const childValue = getOptionValue(child)
      if (childValue !== undefined && childValue !== null) {
        labels.set(String(childValue), groupLabel)
      }
    })
  })
  return labels
})
const isMultiple = computed(() => props.mode === 'multiple' || props.mode === 'tags') // 是否多选模式（含标签模式）
const isTagsMode = computed(() => props.mode === 'tags') // 是否标签模式（输入内容即可创建新条目）
// 搜索能力：显式 showSearch 优先；未指定时多选（含 tags）默认可搜索，单选默认不可搜索（antd 口径：showSearch ?? multiple）
const mergedShowSearch = computed(() => props.showSearch ?? isMultiple.value)
// 箭头显示：多选默认不显示箭头（antd 口径），loading 时显示（后缀位置由加载中图标接管）
const mergedShowArrow = computed(() => props.showArrow ?? (props.loading || !isMultiple.value))
const mergedOpen = computed(() => (props.open !== undefined ? props.open : showOptions.value))
const mergedSearchValue = computed(() => (props.searchValue !== undefined ? props.searchValue : innerSearchValue.value))
// 多选值列表：单选值归一为单元素数组，空值统一为空数组（内部一律按数组处理）
const valueList = computed<SelectValue[]>(() => {
  const value = props.value
  if (Array.isArray(value)) {
    return value.filter((item) => item !== undefined && item !== null)
  }
  if (value === undefined || value === null) return []
  return [value]
})
// 输入框展示文本：多选（非 tags）在面板关闭时不展示已输入的搜索文本（antd 口径：重开面板时恢复）
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
// 输入框可编辑性（antd 口径）：tags 始终可输入；multiple 需开启 showSearch 且面板展开 / 已聚焦；单选仅看 showSearch
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
const optionsStyle = computed(() => {
  const maxHeight = props.listHeight !== undefined ? props.listHeight : props.maxDisplay * 32
  const style: CSSProperties = {
    maxHeight: `${maxHeight}px`
  }
  return style
})
// 选项缓存：options 动态变化时（远程搜索清空、已选项被移出列表）已选项仍需保留原 label 与原始数据
const optionCache = new Map<SelectValue, Option>()
/** 按值兜底生成选项：值不在 options 中时 label 回落 value（对齐 antd） */
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
/** 读取选项的 label 字段 */
function getOptionLabel(option: Option): unknown {
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
// 当前选中项（单选）：value 未指定 / 在选项中查不到时为 undefined
const selectedOption = computed<Option | undefined>(() => {
  const value = props.value
  if (value === undefined || value === null || Array.isArray(value)) return undefined
  return findOption(value)
})
// 回填内容：optionLabelProp 指定的字段优先，未指定时取 label 字段，均缺失时回落 value
const optionLabelRaw = computed<unknown>(() => {
  if (props.value === undefined || props.value === null) return undefined
  const option = selectedOption.value
  if (props.optionLabelProp && option) {
    return option[props.optionLabelProp]
  }
  return option ? getOptionLabel(option) : undefined
})
// 占位判定：多选在「无已选值且输入框为空（非合成中）」时展示；单选按 antdv 口径（value 为 undefined，
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
const itemTitle = computed(() => {
  const text = displayText.value
  return typeof text === 'string' || typeof text === 'number' ? String(text) : undefined
})
// ==================== 多选 / 标签 ====================
const TAG_GAP = 4 // tag 右外边距，与 .select-selection-item 的 margin-right 保持一致（用于 responsive 宽度累计）
// 已选项列表（多选）：按 value 顺序映射，查不到时回落缓存 / value 兜底选项
const selectedOptions = computed<Option[]>(() =>
  valueList.value.map((value) => findOption(value) ?? createFallbackOption(value))
)
/** tag 显示文本：optionLabelProp 优先，未指定取 label 字段，均缺失回落 value；超出 maxTagTextLength 时截断 */
function getTagLabel(option: Option, value: SelectValue): unknown {
  const raw = props.optionLabelProp ? option?.[props.optionLabelProp] : getOptionLabel(option)
  const text = raw ?? value
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
// 折叠提示默认文案（antd 口径：+ N ...）
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
    return { option, value, label, closable, disabled, hidden: index >= visibleCount, params }
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
  const restWidth = restNode ? restNode.offsetWidth + TAG_GAP : 0
  const containerStyle = getComputedStyle(container)
  const available =
    container.clientWidth - parseFloat(containerStyle.paddingLeft) - parseFloat(containerStyle.paddingRight)
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
// responsive 折叠：容器宽度由 ResizeObserver 兜住，tag 数量 / 文本 / 尺寸变化时由 watch 兜住
useResizeObserver(selectContentRef, () => measureResponsiveTagCount())
watch(
  [() => props.maxTagCount, () => props.size, selectedOptions],
  () => {
    if (props.maxTagCount === 'responsive') {
      nextTick(measureResponsiveTagCount)
    }
  },
  { flush: 'post' }
)
// tags 模式的选项全集：已选值若不在 options 中，补成伪选项，使新建的标签出现在下拉列表中（antd 口径）
const filledOptions = computed<Option[]>(() => {
  if (!isTagsMode.value) return flatOptions.value
  const existed = new Set(flatOptions.value.map((option) => getOptionValue(option)))
  const patchValues = valueList.value
    .filter((value) => !existed.has(value))
    .sort((valueA, valueB) => (valueA < valueB ? -1 : 1))
  return [...flatOptions.value, ...patchValues.map((value) => createFallbackOption(value))]
})
// 过滤后的选项：filterOption 为 false 或搜索文本为空时不过滤
// 默认过滤字段遵循 antd：optionFilterProp 优先，未指定时按 value 字段匹配（大小写不敏感）
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
// tags 模式：输入内容未命中任何选项时，把它作为「新建标签」伪选项置于列表首位，可直接点击 / 回车选中（antd 口径）
const searchFilledOptions = computed<Option[]>(() => {
  if (!isTagsMode.value) return filteredOptions.value
  const keyword = mergedSearchValue.value
  if (!keyword) return filteredOptions.value
  const filterProp = props.optionFilterProp ?? mergedFieldNames.value.value
  const matched = filteredOptions.value.some((option) => option?.[filterProp] === keyword)
  return matched ? filteredOptions.value : [createFallbackOption(keyword), ...filteredOptions.value]
})
// 展示用选项：传了 filterSort 时对过滤结果排序（antd 语义：仅搜索场景生效）
const displayOptions = computed<Option[]>(() => {
  const filterSort = props.filterSort
  if (!filterSort) return searchFilledOptions.value
  return [...searchFilledOptions.value].sort((optionA, optionB) => filterSort(optionA, optionB))
})
// 空态内容是否存在：显式传 null 表示「不提供空态」，此时选项为空不展开面板（antd 口径）
const hasNotFoundContent = computed(() => props.notFoundContent !== null)
const emptyListContent = computed(() => !hasNotFoundContent.value && displayOptions.value.length === 0)
// 面板可见：不仅要打开，还需有空态兜底，否则空列表下会展开一个空壳面板
const panelVisible = computed(() => mergedOpen.value && !emptyListContent.value)
// 清除图标可用：开启 allowClear、未禁用，且「有选中值或有搜索文本」
const canClear = computed(
  () => props.allowClear && !props.disabled && (!showPlaceholder.value || Boolean(mergedSearchValue.value))
)
// 是否处于「有输入文本」状态（antd SingleSelector 口径）：此时隐藏回填内容与占位文本
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
// 面板层级：显式 zIndex 优先于自动分配 / 默认层级（与乙类组件的 zIndex prop 同一优先级契约）
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
 * 打开面板时的高亮 / 滚动处理 —— 逐条对齐 antd（vc-select/OptionList 的 watch([open, searchValue])）：
 * - **单选模式且已有选中值**：把高亮复位到选中项并滚入可视区；
 * - 其余情形（多选 / 标签，或单选无值）：**不复位** —— 保留用户上次移动的高亮与滚动位置
 *   （antd 的复位分支带 `!multiple && rawValues.size === 1` 前置条件，多选下开合不会打断用户已定位的位置）
 */
watch(panelVisible, async (visible) => {
  if (!visible || isMultiple.value) return
  const selected = displayOptions.value.find((option) => !option.disabled && isOptionSelected(option))
  if (!selected) return
  hoverValue.value = getOptionValue(selected) ?? null
  await scrollOptionIntoView('.option-hover')
})
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
// 承载层（Modal / Drawer / Dialog）关闭时收起面板并归位聚焦态：容器不卸载内容，本面板也不会随容器消失 ——
// ① 面板：停留在打开态会占着层级槽位，被「后出现者在上」重新打开的容器反超（落到遮罩之下），
//    同时无谓抬高后续分配点（详见 z-index.ts 的 Z_INDEX_CONTAINER_OPEN_KEY）
// ② 聚焦态：容器关闭不派发 blur（focusTriggerAfterClose 归还焦点时也未必落到本 input 上），
//    故须在此显式归位，否则容器重开时聚焦描边与阴影仍在
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

/** 将面板内指定选项（当前选中项 / 键盘高亮项）滚动到可视区域内（已可见时不做任何滚动） */
async function scrollOptionIntoView(selector: string): Promise<void> {
  await nextTick()
  const scrollContainer = selectPanelRef.value?.querySelector<HTMLElement>('.scrollbar-container')
  const option = selectPanelRef.value?.querySelector<HTMLElement>(selector)
  if (!scrollContainer || !option) return
  // 用 offsetTop / offsetHeight 而非 getBoundingClientRect：
  // 面板打开时正在播放 enter 缩放动画，rect 会被 transform 缩放失真，
  // 导致误判选项已可见而跳过滚动；offsetTop 是布局值，不受 transform 影响
  const optionTop = option.offsetTop
  const optionBottom = optionTop + option.offsetHeight
  const { scrollTop, clientHeight } = scrollContainer
  if (optionTop < scrollTop) {
    scrollContainer.scrollTop = optionTop
  } else if (optionBottom > scrollTop + clientHeight) {
    scrollContainer.scrollTop = optionBottom - clientHeight
  }
}
/**
 * 面板开合状态变更 / 用户开合请求的统一上报：
 * open 为纯受控属性（显隐由外部驱动），组件同时派发 openChange（项目惯例）与 dropdownVisibleChange（antd 同名事件）
 */
function emitPanelChange(open: boolean): void {
  emits('openChange', open)
  emits('dropdownVisibleChange', open)
}
/**
 * 统一控制面板显隐：
 * - 非受控：直接改内部状态，事件由 watch(showOptions) 上报
 * - 受控：不直接改内部状态（实际显隐由外部 open 驱动），但必须把用户的「开合请求」上报出去 ——
 *   若受控时直接 return，用户交互（点击 / 输入）既打不开面板也不派发任何事件；
 *   与目标值相同的请求不再重复上报，避免噪声
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
/** 收起面板：单选同时复位搜索文本（重开面板不应残留上次输入）；多选保留（重开面板时恢复，antd 口径） */
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
 * （与 antd 的 getSeparatedContent 一致：只输入分隔符会得到空数组，此时清空输入但不产生新值）
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
/** 分词结果转为选中值：tags 模式直接建标签，multiple 模式按 label 匹配已有选项取其 value（antd 口径） */
function submitSeparatedValues(words: string[]): void {
  const labelField = mergedFieldNames.value.label
  const patchValues: SelectValue[] = isTagsMode.value
    ? words
    : words
        .map((word) => props.options.find((option) => option?.[labelField] === word))
        .map((option) => (option ? getOptionValue(option) : undefined))
        .filter((value): value is SelectValue => value !== undefined)
  emitMultipleChange(Array.from(new Set([...valueList.value, ...patchValues])))
  patchValues.forEach((value) => emits('select', value, findOption(value) ?? createFallbackOption(value)))
  // 分词完成即收起面板（antd 行为：粘贴 / 输入分隔符视为一轮输入结束）
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
  // 多选下焦点真正离开组件时处理残留的搜索文本：tags 提交为新标签，multiple 静默清空（antd 口径）
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
 * 面板 mousedown：阻止面板内的非输入类区域抢走触发器焦点
 *
 * 与触发器同理，不阻止默认行为会让 input 失焦触发 blur 关闭面板；
 * 但 dropdownRender 等自定义区域内的输入类元素（antd 扩展菜单即此模式）必须拿到焦点，故对其放行 ——
 * 随之而来的 blur 由 onBlur 的「焦点是否仍在面板内」判定放行，面板保持展开
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
/** 多选值是否发生变化：长度一致且逐项相等时视为未变化（与 antd 的 change 触发条件一致） */
function isValueListChanged(nextValues: SelectValue[]): boolean {
  const current = valueList.value
  return nextValues.length !== current.length || nextValues.some((item, index) => item !== current[index])
}
/** 多选值变更统一出口：同步 v-model 并派发 change（多选下第 3 参 index 不适用，固定传 undefined） */
function emitMultipleChange(nextValues: SelectValue[]): void {
  if (!isValueListChanged(nextValues)) return
  emits('update:value', nextValues)
  emits(
    'change',
    nextValues,
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
  emits('deselect', value, option)
  selectFocus()
}
/** tags 模式：把当前搜索文本提交为新标签（回车 / 失焦时触发，对齐 antd 的 submit 分支） */
function submitTag(): void {
  const text = (mergedSearchValue.value || '').trim()
  if (!text) return
  const value: SelectValue = text
  const nextValues = valueList.value.includes(value) ? [...valueList.value] : [...valueList.value, value]
  emitMultipleChange(nextValues)
  emits('select', value, findOption(value) ?? createFallbackOption(value))
  setSearchValue('')
}
/** 选中下拉项：单选选中后回填并收起面板；多选切换选中并保持面板展开（antd 口径） */
function onSelectOption(option: Option, index: number): void {
  const value = getOptionValue(option)
  if (!isMultiple.value) {
    if (props.value !== value) {
      emits('update:value', value)
      emits('change', value, option, index)
    }
    emits('select', value, option)
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
    emits('deselect', value, option)
  } else {
    emits('select', value, option)
    hoverValue.value = value
  }
  // 选中项后清空搜索文本（antd 口径：autoClearSearchValue 为 true 时选中与反选都清空）
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
    clearedOptions.forEach((option) => emits('deselect', getOptionValue(option), option))
  } else if (changed) {
    emits('update:value', undefined)
    emits('change', undefined, undefined, undefined)
  }
  emits('clear')
  selectFocus()
}
// 键盘导航：↑↓ 移动高亮（跳过禁用项、环形，随即滚入可视区）、Enter 选中高亮项、Esc 关闭面板
// 面板未打开时 ↑↓（或任意可打印字符）打开面板，与 antd 的键盘行为保持一致
function onKeydown(e: KeyboardEvent): void {
  emits('inputKeyDown', e)
  if (props.disabled) return
  // 输入法组合中的按键全部交由 IME 处理，不驱动面板：Enter 是「确认候选 / 上屏」、↑↓ 是「切换候选页」、
  // Backspace 是「删除组合文本」——若继续执行，Enter 会误选中当前高亮项（且随后的 compositionend
  // 又把搜索文本写回输入框，表现为「凭空选中一项 + 输入框残留文本」）。
  // antd 以 keyCode(which) 判定 Enter，而 Chromium 对「被 IME 消费的按键」给出 keyCode 229，天然规避了
  // 该问题；antd 在 tags 的提交分支亦显式检查了 !compositionStatus（vc-select/Selector/index.tsx）。
  if (e.isComposing || isComposing.value) return
  // 退格锁：记录本次按键前的搜索文本是否非空（上一次按键结束时写入），
  // 避免「清空搜索文本的同一次按键」紧接着又删掉一个标签（antd 的 useLock 语义）
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
    scrollOptionIntoView('.option-hover')
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
      // 无高亮项：tags 模式把输入内容提交为新标签（antd 的 onSearchSubmit 分支）
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
/** 滚动面板选项：传数字按下标定位，传对象按顶部偏移定位 */
function scrollTo(arg: number | { index?: number; top?: number }): void {
  const scrollContainer = selectPanelRef.value?.querySelector<HTMLElement>('.scrollbar-container')
  if (!scrollContainer) return
  if (typeof arg === 'number') {
    const option = scrollContainer.querySelectorAll<HTMLElement>('.select-option')[arg]
    option?.scrollIntoView({ block: 'nearest' })
    return
  }
  if (arg?.index !== undefined) {
    const option = scrollContainer.querySelectorAll<HTMLElement>('.select-option')[arg.index]
    option?.scrollIntoView({ block: 'nearest' })
    return
  }
  if (arg?.top !== undefined) {
    scrollContainer.scrollTop = arg.top
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
/** 多选模式的默认选中图标（对勾，与 antd 的 CheckOutlined 一致） */
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
 * 选项选中态图标：多选模式默认渲染对勾；单选仅在提供 menuItemSelectedIcon（prop 或插槽）时渲染（antd 口径）
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
// 选项节点渲染：默认菜单与 dropdownRender 共用同一实现，避免两处重复
function renderOptionNode(option: Option, index: number): VNode {
  const value = getOptionValue(option)
  const label = getOptionLabel(option)
  const optionSlot = slots.option
  return h(
    'p',
    {
      class: [
        'select-option',
        {
          'option-hover': !option.disabled && value === hoverValue.value,
          'option-selected': isOptionSelected(option),
          'option-disabled': option.disabled,
          // 分组子选项：左缩进一级（与 antd 的 -option-grouped 同款）
          'option-grouped': optionGroupLabels.value.has(String(value))
        }
      ],
      title: label === undefined || label === null ? undefined : String(label),
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
      h('span', { class: 'select-option-content' }, optionSlot ? optionSlot(option) : String(label ?? value ?? '')),
      renderOptionState(option)
    ]
  )
}
// 内置菜单节点（函数组件）：直接渲染选项列表与空态，通过 v-show 切换避免销毁重建
const menuNode: SelectMenuNode = () => {
  // 分组形态：按当前扁平顺序在跨组处插入分组标题（标题不可选中、不占展示下标）
  const optionNodes: VNode[] = []
  let lastGroupLabel: string | undefined
  displayOptions.value.forEach((option, index) => {
    const groupLabel = optionGroupLabels.value.get(String(getOptionValue(option)))
    if (groupLabel !== undefined && groupLabel !== lastGroupLabel) {
      optionNodes.push(h('p', { class: 'select-option-group' }, groupLabel))
    }
    lastGroupLabel = groupLabel
    optionNodes.push(renderOptionNode(option, index))
  })
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
    () => optionNodes
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
    <div ref="selectContentRef" class="select-content-container">
      <!-- 多选 / 标签：标签列表。被折叠的 tag 仍渲染在 DOM 中（以绝对定位隐藏），供 responsive 量取真实宽度 -->
      <template v-if="isMultiple">
        <span
          v-for="item in tagItems"
          :key="String(item.value)"
          class="select-selection-item"
          :class="{ 'select-selection-item-disabled': item.disabled, 'select-tag-hidden': item.hidden }"
          :title="getTagTitle(item.label)"
        >
          <!-- 插槽存在即接管 tag 渲染：以内容探测判定会误伤「渲染结果取决于选项字段」的插槽，故直接看插槽是否提供 -->
          <slot v-if="slots.tagRender" name="tagRender" v-bind="item.params" />
          <template v-else>
            <span class="select-selection-item-content">{{ item.label }}</span>
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
/* 离开动画期间禁用指针事件
   必须带上 `.select-panel-container`：单类写法 `.slide-leave-active` 与下方的
   `.select-panel-container { pointer-events: auto }` 同为「类 + 作用域属性 = 0,2,0」，
   且本规则声明在**前**，会被后者按源码顺序覆盖而静默失效；带上该类后为 0,3,0，靠**特异性**取胜 */
.select-panel-container.slide-leave-active {
  pointer-events: none;
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
    /* 用于与空内容做基线对齐（antd 同款处理：`''` 与 undefined 值的高度一致） */
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
/* 展开时回填内容降为占位色，与 antd 一致 */
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
  /* 无边框覆盖禁用态：antd 的 &-borderless 对背景 / 边框 / 阴影用 !important 覆盖一切（禁用态也不例外），
     故此处以「根元素双类」提升特异性（高于 .select-disabled .select-content-container），
     使「无边框 + 禁用」仍是无边框（仅文字转灰 + not-allowed 光标） */
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
/* ==================== 多选 / 标签 ==================== */
.select-wrap.select-multiple {
  /* 高度自适应：tag 换行时触发器随之增高（antd 同款） */
  height: auto;
  min-height: var(--select-height);
  /* tag 高度随 size 变化（antd 口径：控件高度 - 8px） */
  --select-tag-height: calc(var(--select-height) - 8px);
  .select-content-container {
    /* 空内容时的基线高度由容器自身保底（替代下方的 \a0 占位） */
    min-height: var(--select-height);
    flex-wrap: wrap;
    align-items: center;
    padding: 1px 4px;
    cursor: text;
    /* 丢弃基线的 \a0 占位：它是 flex 子项，tag 换行时会被带到「输入框所在的那一行」，
       把该行由 24px 抬到 28px —— 实测 4 标签场景本项目 60px / antd 56px。
       antd 因 tags 与输入框同处 -selection-overflow（占位与其同级）而不受影响，
       此处以「容器 min-height 保底」等价达成同一结果 */
    &::after {
      content: none;
    }
  }
  /* 显示箭头 / 支持清除时为右侧图标预留宽度（antd 口径：图标 12px + 内边距 12px） */
  &.select-show-arrow .select-content-container,
  &.select-allow-clear .select-content-container {
    padding-right: 24px;
  }
  /* 输入框内联在 tag 列表之后（antd 布局：tag 列表 + 输入框）
     ① 基尺寸取 0：若按内容基宽（auto）参与换行计算，输入框会把首行剩余空间挤满而自身换到第二行，
        连基线占位一起顶下去 —— 实测触发器高度由 32px 变成 58px（多出一整行）。
        取 0 后与 antd 行为一致：先按 tag 排布，再把「本行剩余宽度」增长给输入框
     ② 左间距 8px：仅「搜索框排在标签之前（无标签）」时需要（antd 同款），缺少它时光标会紧贴容器左内边距；
        跟在标签之后时由标签自身的 margin-right 提供间隔，故紧随其后的规则把非首位的搜索框左间距归零 */
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
  /* 搜索框前面已有标签时不再叠加左间距：antd 的该间距只服务于「搜索框在最前」的场景，
     跟在标签之后时拉开距离的是标签自身的 margin-right 4px
     （实测：本项目 12px / antd 4px → 归零后与 antd 对齐） */
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
/* 标签本体：与 antd 的 selection-item 对齐（背景 / 边框 / 内边距 / 圆角） */
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
  /* 面板基准字号：antd 在下拉根节点声明 fontSize: token.fontSize（14px），
     本项目原先未声明 → 空态等「非选项」内容会继承页面字号（演示页为 16px，比选项大一号） */
  font-size: 14px;
  outline: none;
  cursor: auto;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  /* 菜单内容由内部函数组件经 h() 创建，这些 DOM 不带本组件的 scoped 属性，
     直接写后代选择器会全部失配（表现为「面板没有样式」），故以 :deep() 命中深层节点 */
  :deep(.select-options-panel) {
    /* 关闭滚动越界回弹与滚动链：否则触控板惯性滚动会带着列表冲出滚动区，面板底部露出空白
       （antd 以 transform 位移实现列表滚动，内容天然不越界，故需在此显式关闭原生回弹）。
       ⚠️ 必须是 none 而非 contain —— contain 只切断向父级的滚动链，元素自身的弹性回弹照旧发生，
       用 contain 时「滚到底仍有留白」依旧存在 */
    .scrollbar-container {
      overscroll-behavior: none;
    }
    /* 分组标题：antd 口径（次级文字色 + 小字号 + 不参与交互）——
       高度取选项行高控制值 32px、行高取 antd 全局 lineHeight 1.5714，与选项行等高 */
    .select-option-group {
      min-height: 32px;
      padding: 5px 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      line-height: 1.5714285714285714;
      cursor: default;
    }
    /* 分组子选项左缩进一级：对齐 antd 的 -option-grouped（paddingInlineStart = controlPaddingHorizontal × 2 = 24px） */
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
      /* 已选项的选中态图标使用主色（antd 口径：colorPrimary） */
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
    /* 不自设 min-width：空态宽度受面板约束，撑破宽度会被 overflow: hidden 裁掉内容（与 antd 的空态一致，随面板换行）。
       左右内边距取 8px 而非 16px：面板等宽时留给内容的宽度有限，16px 会把「暂无数据」挤成两行。
       不设 text-align: center（antd 同款）：默认空态由 Empty 组件自身 text-align: center 居中；
       使用者传入的自定义内容（字符串或 VNode，如 notFoundContent 放 Spin / 放文案）一律左对齐，
       与 antd 的 `&-empty`（仅声明 color）保持一致 */
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
