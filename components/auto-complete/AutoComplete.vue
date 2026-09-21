<script setup lang="ts">
import { ref, computed, watchEffect, watch, onMounted, inject } from 'vue'
import type { CSSProperties, VNode, Ref } from 'vue'
import Scrollbar from 'components/scrollbar'
import {
  raiseFloatingOrder,
  useFloating,
  useFloatingTeleportTarget,
  useInject,
  useSlotsExist,
  useZIndex,
  Z_INDEX_CONTAINER_OPEN_KEY,
  FLOATING_LAYER_Z_INDEX
} from 'components/utils'
export interface Option {
  disabled?: boolean // 是否禁用
  value: string | number // 唯一的 value 值
  label?: string // 显示的 label 值，缺失时兜底展示 value
  // 允许携带任意自定义字段：#option 插槽会透传原始数据对象，便于自定义渲染与远程数据源场景
  [propName: string]: any
}
export interface GroupOption {
  options?: (string | number | Option)[] // 子选项，存在该字段即视为分组
  label?: string // label 文本
  value?: string | number // value 值
}

export interface Props {
  allowClear?: boolean // 是否支持清除
  autofocus?: boolean // 是否自动获取焦点
  backfill?: boolean // 使用键盘选择选项的时候把选中项回填到输入框中
  bordered?: boolean // 是否有边框
  defaultActiveFirstOption?: boolean // 是否默认高亮第一个选项
  defaultOpen?: boolean // 是否默认展开下拉菜单
  disabled?: boolean // 是否禁用
  open?: boolean // 是否展开下拉菜单（受控）
  placeholder?: string // 默认占位文本
  popupClassName?: string // 下拉菜单的 className 属性
  zIndex?: number // 下拉面板层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
  dropdownMatchSelectWidth?: boolean | number // 下拉菜单和选择器同宽，为数字时指定下拉菜单宽度
  dropdownMenuStyle?: CSSProperties // 下拉菜单自定义样式
  to?: string | HTMLElement | false // 下拉面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  options?: (string | number | Option | GroupOption)[] // 自动完成的数据源
  value?: string // (v-model) 当前输入的值，未受控时按空串处理
  width?: string | number // 自动完成宽度，单位 px
  size?: 'small' | 'middle' | 'large' // 自动完成大小
  status?: 'error' | 'warning' // 设置校验状态
  /*
    根据输入项进行筛选，默认为 false 时不筛选，显示全部数据源，由用户在 search 事件中远程更新 options
    当其为 true 时，筛选每个选项的文本字段 label 是否包含输入项，包含返回 true，反之返回 false
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filterOption?: boolean | ((inputValue: string, option: Option) => boolean) // 过滤条件函数
}
// 声明组件插槽类型
export interface AutoCompleteSlots {
  default?: () => VNode[]
  clearIcon?: (props: { clearIcon: () => void }) => VNode[]
  // option 由 v-bind 展开，结构取决于使用方数据源（Option / GroupOption / 自定义字段），无法静态收窄
  option?: (props: any) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  allowClear: false,
  autofocus: false,
  backfill: false,
  bordered: true,
  defaultActiveFirstOption: true,
  defaultOpen: false,
  disabled: false,
  open: undefined,
  placeholder: undefined,
  popupClassName: undefined,
  zIndex: undefined,
  dropdownMatchSelectWidth: true,
  dropdownMenuStyle: undefined,
  to: undefined,
  options: () => [],
  value: undefined,
  width: '100%',
  size: 'middle',
  status: undefined,
  filterOption: false
})
defineSlots<AutoCompleteSlots>()
const slotsExist = useSlotsExist(['default', 'clearIcon', 'option'])
const emit = defineEmits([
  'update:value',
  'search',
  'select',
  'change',
  'focus',
  'blur',
  'clear',
  'openChange',
  'dropdownVisibleChange'
])
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const inputRef = ref<HTMLInputElement | null>(null) // input 元素引用
const customInputRef = ref<HTMLElement | null>(null) // 自定义输入组件容器引用
const isComposing = ref<boolean>(false) // 是否处于输入法(IME)合成中，合成期间不触发 search/filter
const hoverValue = ref<string | number | null>(null) // 鼠标悬浮项的 value 值
const lastUserValue = ref<string>('') // 用户原始输入（backfill 时键盘 Esc 还原用，与 onInput 同步更新）
const showOptions = ref<boolean>(false) // 显示隐藏下拉面板
const focused = ref<boolean>(false) // 自动完成是否聚焦
const { colorPalettes, shadowColor } = useInject('AutoComplete') // 主题色注入
const contentRef = ref<HTMLElement | null>(null) // 内容模板引用
const panelRef = ref<HTMLElement | null>(null) // 下拉面板模板引用
const panelWrapperRef = ref<HTMLElement | null>(null) // 定位参照容器：面板 top / left 的坐标原点
// 层级：ConfigProvider 传入 baseZIndex 时按「后出现者在上」自增分配；未传则沿用默认层级 1050
// （下拉面板需高于承载它的 Modal / Drawer / Dialog，故取 popupBase + 50）
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
  () => contentRef.value,
  () => props.to
)
// 清除图标显隐：开启 allowClear、未禁用且有值时显示（与 Input 组件保持一致，有值即显示，不依赖 hover）
const showClear = computed<boolean>(() => {
  return props.allowClear && !props.disabled && Boolean(props.value)
})
const autoCompleteWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const autoCompleteHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 32,
    large: 40
  }
  return `${heightMap[props.size]}px`
})
const optionsStyle = computed(() => {
  const style: CSSProperties = {
    maxHeight: '256px'
  }
  return style
})
// 判断是否为分组项：存在 options 字段即视为分组
function isGroup(item: string | number | Option | GroupOption): item is GroupOption {
  return typeof item === 'object' && Array.isArray((item as GroupOption).options)
}
// 获取叶子选项的 value 值
function getValue(item: string | number | Option): string | number {
  if (typeof item === 'string' || typeof item === 'number') {
    return item
  }
  return item.value
}
// 获取叶子选项的 label 文本，缺失时兜底 value 的字符串形式
function getLabel(item: string | number | Option): string {
  if (typeof item === 'string' || typeof item === 'number') {
    return String(item)
  }
  return item.label ?? String(item.value)
}
// 判断叶子选项是否禁用
function isDisabled(item: string | number | Option): boolean | undefined {
  if (typeof item === 'string' || typeof item === 'number') {
    return false
  }
  return item.disabled
}
// 选项过滤是否匹配（value 可选，未受控时按空串参与匹配，与「空输入不过滤」的行为一致）
function matchOption(item: string | number | Option): boolean {
  const label = getLabel(item)
  const inputValue = props.value ?? ''
  if (typeof props.filterOption === 'function') {
    const option = typeof item === 'object' ? item : { value: getValue(item), label }
    return Boolean(props.filterOption(inputValue, option))
  }
  return label.includes(inputValue)
}
// #option 插槽参数，字符串/数字包装为 Option 结构，对象透传原始数据（保留自定义字段）
function childSlotProps(item: string | number | Option): Option {
  if (typeof item === 'string' || typeof item === 'number') {
    return { value: item, label: String(item) }
  }
  return item
}
// 过滤后的选项数据（保留分组结构，过滤后空组剔除）
const filteredData = computed<(string | number | Option | GroupOption)[]>(() => {
  // 输入法合成中不参与本地筛选，显示全部数据源，待合成结束后再按最终输入筛选，与官网行为一致
  if (props.filterOption === false || isComposing.value) {
    return props.options
  }
  const result: (string | number | Option | GroupOption)[] = []
  props.options.forEach((item) => {
    if (isGroup(item)) {
      const options = (item.options ?? []).filter(matchOption)
      if (options.length) {
        result.push({ ...item, options })
      }
    } else if (matchOption(item)) {
      result.push(item)
    }
  })
  return result
})
// 展平的叶子选项列表，用于 hover 高亮和空态判断
const flattenOptions = computed<Option[]>(() => {
  const result: Option[] = []
  filteredData.value.forEach((item) => {
    if (isGroup(item)) {
      item.options?.forEach((child) => {
        result.push({ value: getValue(child), label: getLabel(child), disabled: isDisabled(child) })
      })
    } else {
      result.push({ value: getValue(item), label: getLabel(item), disabled: isDisabled(item) })
    }
  })
  return result
})
// 面板是否可见：打开状态且有可展示的选项（无选项时隐藏，与官网一致），单一布尔驱动 Transition 保证隐藏动画完整
const panelVisible = computed<boolean>(() => showOptions.value && flattenOptions.value.length > 0)
// 面板渲染用的选项数据（保留态）：有选项时同步 filteredData，选项变空时保留上一次内容，避免面板隐藏动画期间内容突然清空导致高度塌缩打断 leave 动画
const displayData = ref<(string | number | Option | GroupOption)[]>([])
watch(
  filteredData,
  (val) => {
    if (val.length) {
      displayData.value = val
    }
  },
  { immediate: true }
)
// 面板与内容（触发器）的尺寸关系：true 等宽、false 仅最小等宽、number 指定面板宽度（最小宽仍为触发器宽）
const matchTriggerWidth = computed<'width' | 'minWidth' | number>(() => {
  if (typeof props.dropdownMatchSelectWidth === 'number') {
    return props.dropdownMatchSelectWidth
  }
  return props.dropdownMatchSelectWidth ? 'width' : 'minWidth'
})
// 定位内核：只做「算 + 输出 + 同步」，本组件不再自研翻转与 3 态水平对齐。
// 期望方向取 bottomLeft（左对齐）：次轴溢出时的对齐自适应与边界位移由内核的次轴处理（shift）承担，
// 故组件侧不再保留独立的水平对齐判定
const { panelStyle, transformOrigin } = useFloating(panelRef, {
  anchor: () => contentRef.value,
  offsetContainer: panelWrapperRef,
  placement: 'bottomLeft',
  flip: true, // 始终按空间翻转（无开关，翻到对侧以保证面板完整可见）
  shift: true, // 次轴溢出时做对齐自适应与微调
  offset: 4, // 主轴间距：面板紧贴锚点外 4px
  boundary: 'scrollParent', // 复用 getFloatingBoundaryRect 口径：仅当浮层真被滚动容器裁剪时才以容器为界
  matchTriggerWidth: () => matchTriggerWidth.value,
  enabled: () => panelVisible.value
})
// 面板层级：显式 zIndex 优先于自动分配 / 默认层级（与乙类组件的 zIndex prop 同一优先级契约）
const autoCompletePanelZIndex = computed(() => props.zIndex ?? layerZIndex.value)
// 面板内联样式：内核输出（定位 + 动画原点）+ 使用者自定义样式 + 层级 + 主题变量
// 合并顺序：自定义样式可覆盖定位，但层级与主题变量始终由组件接管
const autoCompletePanelStyle = computed<CSSProperties>(() => ({
  ...panelStyle.value,
  transformOrigin: transformOrigin.value,
  ...props.dropdownMenuStyle,
  zIndex: autoCompletePanelZIndex.value,
  '--auto-complete-option-bg-color-active': colorPalettes.value[0]
}))
watch(showOptions, (to) => {
  if (!to) return
  // 首次展开：容器由 Teleport 追加到目标末尾（天然在末尾），此处无需处理
  if (!initialDisplay.value) {
    initialDisplay.value = true
    return
  }
  // 再次展开：把容器移到目标末尾 —— 无分配器时同层级浮层的上下关系由 DOM 顺序决定，
  // 移动后顺序即「最近一次打开的顺序」（就地渲染时容器在组件自身 DOM 内，不能移动）
  if (resolvedTo.value !== false) {
    raiseFloatingOrder(panelWrapperRef.value)
  }
})
// 每次「出现」重新领取层级（与 Popup / Modal / Drawer 同一语义）：面板关闭后不卸载（仅 v-show），
// 若只在挂载时领取一次，则被承载它的 Modal / Drawer 等「重新出现并置顶」后，二次打开的下拉会落到遮罩之下。
// 关闭时归还槽位（面板元素保留、内联层级不变）：否则「弹窗 ↔ 下拉」交替出现时两者会互相抬升，层级随开合次数持续增长
watch(panelVisible, (visible) => {
  if (visible) {
    allocateZIndex()
  } else {
    releaseZIndex()
  }
})
// 承载层（Modal / Drawer / Dialog）关闭时收起面板并归位聚焦态：容器不卸载内容，本面板也不会随容器消失 ——
// ① 面板：停留在打开态会让它占着层级槽位，被「后出现者在上」重新打开的容器反超（落到遮罩之下），
//    同时无谓抬高后续分配点（详见 z-index.ts 的 Z_INDEX_CONTAINER_OPEN_KEY）
// ② 聚焦态：容器关闭不派发 blur（focusTriggerAfterClose 归还焦点时也未必落到本 input 上），
//    故须在此显式归位，否则容器重开时 `.auto-complete-focused` 的描边与阴影仍在
const containerOpen = inject(Z_INDEX_CONTAINER_OPEN_KEY, null) as Ref<boolean> | null
if (containerOpen) {
  watch(containerOpen, (open) => {
    if (!open) {
      setPanelOpen(false)
      focused.value = false
      hoverValue.value = null
    }
  })
}
watch(showOptions, (to) => {
  // 非受控模式下由内部状态变化上报开合事件；
  // 受控模式的事件由 setPanelOpen 在「用户请求变更」时派发（见下），此处必须跳过 ——
  // 否则外部改 open 驱动 showOptions 变化也会被回传成一次多余事件，事件方向就反了
  if (props.open === undefined) {
    emitPanelChange(to)
  }
})
// 受控 open：外部传入 open 时，同步到内部面板显隐
watch(
  () => props.open,
  (val) => {
    if (typeof val === 'boolean') {
      // 面板定位由定位内核在面板可见时自动执行（enabled 驱动），无需显式重算
      showOptions.value = val
    }
  },
  { immediate: true }
)
watchEffect(() => {
  // defaultActiveFirstOption 为 true 时默认高亮第一个可用选项，否则不预高亮
  if (!props.defaultActiveFirstOption) {
    hoverValue.value = null
    return
  }
  const firstEnabled = flattenOptions.value.find((option) => !option.disabled)
  hoverValue.value = firstEnabled ? firstEnabled.value : null
})
// 打开面板时把悬浮态复位到「当前输入值对应的选项」
// 输入框无值、或值查不到对应项时**保持关闭前的悬浮项不动**（不回落首项）：否则「输入框为空 → 悬浮某项 → 关闭 → 重开」会丢失上次的悬浮项。
// 首个可用项的兜底高亮由上方 watchEffect 负责，它只在选项列表变化（含搜索过滤）时触发，与面板开合无关
watch(showOptions, (to) => {
  if (!to) return
  const matched = flattenOptions.value.find((option) => !option.disabled && String(option.value) === props.value)
  if (matched) {
    hoverValue.value = matched.value
  }
})
watchEffect(() => {
  if (focused.value && props.open === undefined) {
    showOptions.value = true
  }
})
onMounted(() => {
  // 挂载后同步一次 value 到自定义输入组件插槽元素
  if (slotsExist.default) {
    const el = getCustomInputEl()
    if (el && el.value !== props.value) {
      el.value = props.value ?? ''
    }
  }
  // autofocus：挂载后自动获取焦点
  if (props.autofocus && !props.disabled) {
    inputFocus()
  }
  // defaultOpen：非受控时初始展开下拉面板
  if (props.defaultOpen && props.open === undefined && !props.disabled) {
    openPanel()
  }
})
// 滚动跟随 / 视口 resize / 字体就绪的重对齐由定位内核统一承担（遍历锚点全链滚动祖先 + 帧合并）
// 面板开合状态变更 / 用户开合请求的统一上报：
// open 为纯受控属性（显隐由外部驱动），
// 组件只通过 openChange / dropdownVisibleChange 通知可见性变更，不做 v-model:open 双向绑定
function emitPanelChange(open: boolean): void {
  emit('openChange', open)
  emit('dropdownVisibleChange', open)
}
// 统一控制面板显隐：
// - 非受控：直接改内部状态，事件由 watch(showOptions) 上报
// - 受控：不直接改内部状态（实际显隐由外部 open 驱动），但必须把用户的「开合请求」上报出去 ——
//   若受控时直接 return，用户交互（聚焦 / 点击 / 输入）既打不开面板也不派发任何事件，
//   而 openChange / dropdownVisibleChange 只在 props 变化时回传，与文档「通过 open 控制面板显隐，
//   配合 dropdownVisibleChange 事件使用」的用法完全相反；与目标值相同的请求不再重复上报，避免噪声
function setPanelOpen(open: boolean): void {
  if (props.open === undefined) {
    showOptions.value = open
  } else if (props.open !== open) {
    emitPanelChange(open)
  }
}
function openPanel(): void {
  if (!props.disabled) {
    // 面板定位由定位内核在面板可见时自动执行（enabled 驱动），无需显式重算
    setPanelOpen(true)
  }
}
function onInput(e: Event): void {
  const input = (e.target as HTMLInputElement)?.value ?? ''
  // 记录用户原始输入，backfill 键盘 Esc 时还原（onHover/onKeydown 的回填不会触发 onInput，lastUserValue 仅由用户主动输入更新）
  lastUserValue.value = input
  // 始终同步 value 保证输入框回显（含合成中的拼音）
  emit('update:value', input)
  // 输入法合成中仅回显，不触发 search/filter，待合成结束(compositionend)统一触发，与官网行为一致
  if (isComposing.value) {
    return
  }
  emit('search', input)
  openPanel()
}
// 输入法合成开始：标记合成中，暂停 search/filter
function onCompositionStart(): void {
  isComposing.value = true
}
// 输入法合成结束：清除标记并触发一次 search/filter（此时才是真正上屏的完整输入）
function onCompositionEnd(e: Event): void {
  isComposing.value = false
  const input = (e.target as HTMLInputElement)?.value ?? ''
  // 合成结束后同步更新用户原始输入
  lastUserValue.value = input
  emit('update:value', input)
  emit('search', input)
  openPanel()
}
function onFocus(): void {
  focused.value = true
  openPanel()
  emit('focus')
}
function onBlur(): void {
  focused.value = false
  setPanelOpen(false)
  emit('blur')
}
function onClick(): void {
  openPanel()
}
/**
 * 触发器 mousedown：阻止输入框以外的区域抢走焦点
 *
 * 点击触发器上的非可聚焦部分（清除图标、自定义输入插槽的空白区）会让 input 失焦 → blur 关闭面板。
 * 仅当事件目标是输入框本身（含自定义输入插槽内的 input / textarea）时放行，
 * 以保留浏览器原生的聚焦与光标定位。
 */
function onMousedown(e: MouseEvent): void {
  if (e.target === inputRef.value || e.target === getCustomInputEl()) {
    return
  }
  e.preventDefault()
}
// 键盘导航：↑↓ 移动高亮（backfill 时回填到输入框），Enter 选中，Esc 还原为用户原始输入
function onKeydown(e: KeyboardEvent): void {
  if (props.disabled) return
  const list = flattenOptions.value
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (!list.length) return
    // 面板未打开时，↑↓ 仅打开面板并保持/设置默认高亮，不修改 hoverValue
    if (!showOptions.value) {
      openPanel()
      e.preventDefault()
      return
    }
    e.preventDefault()
    const currentIdx = list.findIndex((option) => !option.disabled && option.value === hoverValue.value)
    // 环形查找下一个未禁用项：从当前项的下一个开始循环一圈；无高亮时向下从第一项、向上从最后一项开始（与官网一致）
    const start =
      e.key === 'ArrowDown'
        ? currentIdx === -1
          ? 0
          : currentIdx + 1
        : currentIdx === -1
          ? list.length - 1
          : currentIdx - 1
    let nextIdx = -1
    const direction = e.key === 'ArrowDown' ? 1 : -1
    for (let i = 0; i < list.length; i++) {
      const idx = (start + direction * i + list.length) % list.length
      if (!list[idx].disabled) {
        nextIdx = idx
        break
      }
    }
    // 无其他可用项（仅当前项未禁用或全部禁用）时保持原 hoverValue
    if (nextIdx < 0 || nextIdx === currentIdx) return
    hoverValue.value = list[nextIdx].value
    // backfill：键盘导航时回填到输入框（不触发 search），与 onHover 行为一致
    if (props.backfill) {
      emit('update:value', String(list[nextIdx].value))
    }
  } else if (e.key === 'Enter') {
    // 面板打开且有高亮未禁用项时，Enter 确认选中
    if (showOptions.value && hoverValue.value !== null) {
      const target = list.find((option) => !option.disabled && option.value === hoverValue.value)
      if (target) {
        e.preventDefault()
        onSelectOption(target)
      }
    }
  } else if (e.key === 'Escape') {
    // Esc：还原用户原始输入并关闭面板
    if (showOptions.value) {
      e.preventDefault()
      emit('update:value', lastUserValue.value)
      setPanelOpen(false)
    }
  }
}
function onHover(value: string | number, disabled: boolean | undefined): void {
  hoverValue.value = value
  // backfill：hover 高亮选项时把选中项 value 回填到输入框（不触发 search）
  if (props.backfill && !disabled) {
    emit('update:value', String(value))
  }
}
function onSelectOption(item: string | number | Option): void {
  const value = getValue(item)
  // 确认选项后，更新用户原始输入为选中值
  lastUserValue.value = String(value)
  emit('update:value', String(value))
  emit('select', value, childSlotProps(item))
  emit('change', value)
  setPanelOpen(false)
  // select 后保持 input 失焦，避免 watchEffect 重新打开面板
  focused.value = false
  blurInput()
}
function onClear(): void {
  if (focused.value) {
    inputFocus()
  }
  // 清除后同步重置用户原始输入
  lastUserValue.value = ''
  emit('update:value', '')
  emit('change', '')
  emit('clear')
  setPanelOpen(false)
}
function inputFocus(): void {
  const customEl = getCustomInputEl()
  if (customEl) {
    customEl.focus()
  } else {
    inputRef.value?.focus()
  }
}
function blurInput(): void {
  const customEl = getCustomInputEl()
  if (customEl) {
    customEl.blur()
  } else {
    inputRef.value?.blur()
  }
}
// 获取自定义输入组件插槽内的 input/textarea 元素
function getCustomInputEl(): HTMLInputElement | HTMLTextAreaElement | null {
  return customInputRef.value?.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null
}
// 自定义输入组件模式下，同步外部 value 到插槽元素
watch(
  () => props.value,
  (val) => {
    const el = getCustomInputEl()
    if (el && el.value !== val) {
      el.value = val ?? ''
    }
  },
  { immediate: true }
)
// 暴露方法：focus() 获取焦点、blur() 移除焦点
defineExpose({
  focus: inputFocus,
  blur: blurInput
})
</script>
<template>
  <div
    class="auto-complete-wrap"
    :class="{
      'auto-complete-focused': focused,
      'auto-complete-small': size === 'small',
      'auto-complete-large': size === 'large',
      'auto-complete-disabled': disabled,
      'auto-complete-borderless': !bordered,
      'auto-complete-custom': slotsExist.default,
      'auto-complete-status-error': status === 'error',
      'auto-complete-status-warning': status === 'warning'
    }"
    :style="`
      --auto-complete-width: ${autoCompleteWidth};
      --auto-complete-height: ${autoCompleteHeight};
      --auto-complete-primary-color-hover: ${colorPalettes[4]};
      --auto-complete-primary-color-focus: ${colorPalettes[4]};
      --auto-complete-primary-shadow-color: ${shadowColor};
    `"
    @mousedown="onMousedown"
  >
    <div ref="contentRef" class="auto-complete-content">
      <div
        v-if="slotsExist.default"
        ref="customInputRef"
        class="auto-complete-custom-input"
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @focusin="!disabled ? onFocus() : () => false"
        @focusout="!disabled ? onBlur() : () => false"
        @keydown="onKeydown"
        @click="onClick"
      >
        <slot />
      </div>
      <input
        v-else
        ref="inputRef"
        class="auto-complete-input"
        type="text"
        autocomplete="off"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="value"
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @keydown="onKeydown"
        @blur="!disabled ? onBlur() : () => false"
        @focus="!disabled ? onFocus() : () => false"
        @click="onClick"
      />
      <span v-if="slotsExist.clearIcon" class="clear-svg" :class="{ 'show-svg': showClear }" @click.stop="onClear">
        <slot name="clearIcon" :clear-icon="onClear" />
      </span>
      <svg
        v-else
        class="clear-svg"
        :class="{ 'show-svg': showClear }"
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
      <div ref="panelWrapperRef" class="auto-complete-panel-wrapper">
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
            ref="panelRef"
            class="auto-complete-panel"
            :class="popupClassName"
            :style="autoCompletePanelStyle"
            @mousedown.prevent
          >
            <Scrollbar
              :style="{ ...optionsStyle, '--scrollbar-rail-vertical-right': '2px 0 2px auto' }"
              class="auto-complete-options"
              @click.stop="inputFocus"
            >
              <!-- 选项上按下鼠标时阻止默认行为：否则 mousedown 会让 input 失焦触发 blur 关闭面板，
                   而面板在离开动画期间已整体禁用指针事件（见 .auto-complete-panel.slide-leave-active），
                   随后的 mouseup / click 便落不到选项上 —— 表现为「真实鼠标点击选项无任何反应」 -->
              <template v-for="(item, index) in displayData" :key="index">
                <template v-if="isGroup(item)">
                  <p class="auto-complete-group-title">
                    <slot v-if="slotsExist.option" name="option" v-bind="item" />
                    <template v-else>{{ item.label ?? item.value }}</template>
                  </p>
                  <p
                    v-for="(child, childIndex) in item.options"
                    :key="`${index}-${childIndex}`"
                    :class="[
                      'auto-complete-option',
                      'option-grouped',
                      {
                        'option-hover': !isDisabled(child) && getValue(child) === hoverValue,
                        'option-disabled': isDisabled(child)
                      }
                    ]"
                    :title="getLabel(child)"
                    @mouseenter="onHover(getValue(child), isDisabled(child))"
                    @mousedown.prevent
                    @click.stop="isDisabled(child) ? inputFocus() : onSelectOption(child)"
                  >
                    <slot v-if="slotsExist.option" name="option" v-bind="childSlotProps(child)" />
                    <template v-else>{{ getLabel(child) }}</template>
                  </p>
                </template>
                <p
                  v-else
                  :class="[
                    'auto-complete-option',
                    {
                      'option-hover': !isDisabled(item) && getValue(item) === hoverValue,
                      'option-disabled': isDisabled(item)
                    }
                  ]"
                  :title="getLabel(item)"
                  @mouseenter="onHover(getValue(item), isDisabled(item))"
                  @mousedown.prevent
                  @click.stop="isDisabled(item) ? inputFocus() : onSelectOption(item)"
                >
                  <slot v-if="slotsExist.option" name="option" v-bind="childSlotProps(item)" />
                  <template v-else>{{ getLabel(item) }}</template>
                </p>
              </template>
            </Scrollbar>
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
   必须带上 `.auto-complete-panel`：单类写法 `.slide-leave-active` 与下方的
   `.auto-complete-panel { pointer-events: auto }` 同为「类 + 作用域属性 = 0,2,0」，
   且本规则声明在**前**，会被后者按源码顺序覆盖而静默失效；带上该类后为 0,3,0，靠**特异性**取胜 */
.auto-complete-panel.slide-leave-active {
  pointer-events: none;
}
.auto-complete-wrap {
  position: relative;
  display: inline-block;
  width: var(--auto-complete-width);
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.88);
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  &:not(.auto-complete-disabled):hover {
    .auto-complete-content {
      border-color: var(--auto-complete-primary-color-hover);
    }
  }
  .auto-complete-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    min-width: 120px;
    padding: 0 11px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: #fff;
    height: var(--auto-complete-height);
    outline: none;
    cursor: text;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    .auto-complete-input {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      appearance: none;
      font-size: inherit;
      color: inherit;
      &::placeholder {
        color: rgba(0, 0, 0, 0.25);
      }
    }
    .clear-svg {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 11px;
      margin: auto 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.25);
      fill: currentColor;
      opacity: 0;
      user-select: none;
      pointer-events: none;
      background: #fff;
      cursor: pointer;
      transition:
        color 0.2s,
        opacity 0.3s;
      &:hover {
        color: rgba(0, 0, 0, 0.45);
      }
      // 自定义 clearIcon 插槽内的图标统一约束尺寸，避免默认图标组件尺寸过大或垂直错位
      :deep(svg) {
        display: block;
        width: 1em;
        height: 1em;
        fill: currentColor;
      }
    }
    .show-svg {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
.auto-complete-focused:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: var(--auto-complete-primary-color-focus);
    box-shadow: 0 0 0 2px var(--auto-complete-primary-shadow-color);
  }
}
.auto-complete-small {
  .auto-complete-content {
    padding: 0 7px;
    border-radius: 4px;
    .clear-svg {
      right: 7px;
    }
  }
}
.auto-complete-large {
  font-size: 16px;
  .auto-complete-content {
    border-radius: 8px;
  }
}
.auto-complete-borderless:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: transparent;
  }
  &:hover .auto-complete-content {
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &.auto-complete-focused .auto-complete-content {
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.04);
    box-shadow: none;
  }
}
.auto-complete-status-error:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: #ff7875;
  }
  &:hover .auto-complete-content {
    border-color: #ff7875;
  }
  &.auto-complete-focused .auto-complete-content {
    border-color: #ff7875;
    box-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);
  }
}
.auto-complete-status-warning:not(.auto-complete-disabled) {
  .auto-complete-content {
    border-color: #ffd666;
  }
  &:hover .auto-complete-content {
    border-color: #ffd666;
  }
  &.auto-complete-focused .auto-complete-content {
    border-color: #ffd666;
    box-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);
  }
}
.auto-complete-custom {
  .auto-complete-content {
    min-width: 0;
    padding: 0;
    border: none;
    background: transparent;
    height: auto;
  }
  .auto-complete-custom-input {
    width: 100%;
  }
  // 自定义输入组件模式下，边框与聚焦阴影由内部输入组件(如 InputSearch)自行渲染，外层不再叠加，避免阴影覆盖搜索按钮等附加内容
  &:not(.auto-complete-disabled):hover .auto-complete-content,
  &.auto-complete-focused .auto-complete-content {
    border-color: transparent;
    box-shadow: none;
  }
}
.auto-complete-disabled {
  .auto-complete-content {
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    user-select: none;
    cursor: not-allowed;
    .auto-complete-input {
      cursor: not-allowed;
    }
  }
}
/* 定位参照容器：绝对定位 + 零高度，既不参与布局也不遮挡
   页面交互；z-index 保持 auto，避免产生层叠上下文而把面板的层级关在里层 */
.auto-complete-panel-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: auto;
  height: 0;
  pointer-events: none;
}
.auto-complete-panel {
  position: absolute;
  /* 容器关闭了指针事件（pointer-events 可继承），面板必须显式恢复，否则选项的 hover / 点击全部失效 */
  pointer-events: auto;
  /* 默认层级与 useZIndex 的回退值一致；ConfigProvider 传入 baseZIndex 时由内联样式覆盖 */
  z-index: 1050;
  padding: 4px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  outline: none;
  cursor: auto;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  .auto-complete-options {
    .auto-complete-group-title {
      padding: 5px 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      line-height: 22px;
      cursor: default;
    }
    .auto-complete-option {
      min-height: 32px;
      display: block;
      padding: 5px 12px;
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5714285714285714;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: background 0.3s ease;
      // 分组内选项相对分组标题额外缩进 12px
      &.option-grouped {
        padding-left: 24px;
      }
      // 自定义选项内容为 flex 布局时，允许子项收缩并对超宽文本省略号截断，与官网表现一致
      :deep(> div) {
        min-width: 0;
        > span,
        > a {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .option-hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .option-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
}
</style>
