<script setup lang="ts">
import { ref, computed, watchEffect, watch, onMounted, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import Scrollbar from 'components/scrollbar'
import { useInject, useScrollParent, useFloatingPosition } from 'components/utils'
export interface Option {
  disabled?: boolean // 是否禁用
  value: string | number // 唯一的 value 值
  label: string // 显示的 label 值
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
  dropdownMatchSelectWidth?: boolean | number // 下拉菜单和选择器同宽，为数字时指定下拉菜单宽度
  dropdownMenuStyle?: CSSProperties // 下拉菜单自定义样式
  to?: string | HTMLElement | false // 下拉面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  options?: (string | number | Option | GroupOption)[] // 自动完成的数据源
  value: string // (v-model) 当前输入的值
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
  dropdownMatchSelectWidth: true,
  dropdownMenuStyle: undefined,
  to: 'body',
  options: () => [],
  value: undefined,
  width: '100%',
  size: 'middle',
  status: undefined,
  filterOption: false
})
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
const slots = useSlots()
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const inputRef = ref<HTMLInputElement | null>(null) // input 元素引用
const customInputRef = ref<HTMLElement | null>(null) // 自定义输入组件容器引用
const disabledBlur = ref<boolean>(false) // 是否禁用 input 标签的 blur 事件
const isComposing = ref<boolean>(false) // 是否处于输入法(IME)合成中，合成期间不触发 search/filter
const hoverValue = ref<string | number | null>(null) // 鼠标悬浮项的 value 值
const lastUserValue = ref<string>('') // 用户原始输入（backfill 时键盘 Esc 还原用，与 onInput 同步更新）
const showOptions = ref<boolean>(false) // 显示隐藏下拉面板
const focused = ref<boolean>(false) // 自动完成是否聚焦
const { colorPalettes, shadowColor } = useInject('AutoComplete') // 主题色注入
const panelOffset = ref<number>(0) // 下拉面板相对于内容的垂直偏移距离
const panelPlace = ref<'bottom' | 'top'>('bottom') // 下拉面板垂直位置
const panelAlign = ref<'left' | 'right' | 'viewport-left'>('left') // 下拉面板水平对齐方向：右侧空间不足时右对齐，超宽时贴视口左边缘
const contentRef = ref<HTMLElement | null>(null) // 内容模板引用
const panelRef = ref<HTMLElement | null>(null) // 下拉面板模板引用
const panelHeight = ref<number>() // 下拉面板的高度
const panelWidth = ref<number>() // 下拉面板的宽度
// 测量定位容器与内容元素矩形
const { positionedContainerRect, contentRect, measure } = useFloatingPosition(contentRef, panelRef)
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
// 选项过滤是否匹配
function matchOption(item: string | number | Option): boolean {
  const label = getLabel(item)
  if (typeof props.filterOption === 'function') {
    const option = typeof item === 'object' ? item : { value: getValue(item), label }
    return Boolean(props.filterOption(props.value, option))
  }
  return label.includes(props.value)
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
const panelPlacement = computed(() => {
  const contentTop = (contentRect.value as DOMRect)?.top ?? 0
  const containerTop = (positionedContainerRect.value as DOMRect)?.top ?? 0
  const offsetTop = contentTop - containerTop
  const contentBottom = (contentRect.value as DOMRect)?.bottom ?? 0
  const containerBottom = (positionedContainerRect.value as DOMRect)?.bottom ?? 0
  const offsetBottom = containerBottom - contentBottom
  const contentLeft = (contentRect.value as DOMRect)?.left ?? 0
  const containerLeft = (positionedContainerRect.value as DOMRect)?.left ?? 0
  const offsetLeft = contentLeft - containerLeft
  const contentRight = (contentRect.value as DOMRect)?.right ?? 0
  const containerRight = (positionedContainerRect.value as DOMRect)?.right ?? 0
  const offsetRight = containerRight - contentRight
  // 贴视口左边缘时的水平偏移：使面板左边缘落在视口 x=0 处（相对定位容器左边缘换算）
  const offsetViewportLeft = -containerLeft
  const contentWidth = (contentRect.value as DOMRect)?.width ?? 0
  // dropdownMatchSelectWidth：true 面板与内容同宽（min-width）；number 指定面板宽度；false 面板宽度自适应内容（min-width 兜底）
  const widthStyle: CSSProperties =
    typeof props.dropdownMatchSelectWidth === 'number'
      ? { width: `${props.dropdownMatchSelectWidth}px`, minWidth: `${contentWidth}px` }
      : { minWidth: `${contentWidth}px`, width: props.dropdownMatchSelectWidth ? `${contentWidth}px` : 'auto' }
  // 水平定位：right 右对齐（面板右边缘对齐内容右边缘）；viewport-left 贴视口左边缘；否则默认左对齐（面板左边缘对齐内容左边缘）
  let horizontalStyle: CSSProperties
  if (panelAlign.value === 'right') {
    horizontalStyle = { right: `${offsetRight}px` }
  } else if (panelAlign.value === 'viewport-left') {
    horizontalStyle = { left: `${offsetViewportLeft}px` }
  } else {
    horizontalStyle = { left: `${offsetLeft}px` }
  }
  // transformOrigin 水平锚点跟随对齐方向：右对齐时锚点在右侧，其余在左侧
  const originX = panelAlign.value === 'right' ? '100%' : '0'
  switch (panelPlace.value) {
    case 'top':
      return {
        transformOrigin: `${originX} 100%`,
        bottom: `${offsetBottom + panelOffset.value}px`,
        ...horizontalStyle,
        ...widthStyle
      }
    case 'bottom':
    default:
      return {
        transformOrigin: `${originX} 0`,
        top: `${offsetTop + panelOffset.value}px`,
        ...horizontalStyle,
        ...widthStyle
      }
  }
})
watch(showOptions, (to) => {
  if (to && !initialDisplay.value) {
    initialDisplay.value = true
  }
})
watch(showOptions, (to) => {
  emit('openChange', to)
  emit('dropdownVisibleChange', to)
})
// 受控 open：外部传入 open 时，同步到内部面板显隐
watch(
  () => props.open,
  (val) => {
    if (typeof val === 'boolean') {
      showOptions.value = val
      if (val) {
        getPosition()
      }
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
// 重置 hover 高亮：优先定位到当前选中值对应的选项，否则回退到默认高亮首项逻辑
function resetHoverValue(): void {
  const selected = flattenOptions.value.find((option) => !option.disabled && String(option.value) === props.value)
  if (selected) {
    hoverValue.value = selected.value
  } else if (props.defaultActiveFirstOption) {
    const firstEnabled = flattenOptions.value.find((option) => !option.disabled)
    hoverValue.value = firstEnabled ? firstEnabled.value : null
  } else {
    hoverValue.value = null
  }
}
// 面板打开或关闭时都重置 hover：关闭时重置确保下次打开定位正确，打开时重置兜底面板未真正关闭的场景
watch(showOptions, () => {
  resetHoverValue()
})
watchEffect(() => {
  if (focused.value && props.open === undefined) {
    showOptions.value = true
  }
})
onMounted(() => {
  // 挂载后同步一次 value 到自定义输入组件插槽元素
  if (slots.default) {
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
// 查询并监听最近可滚动父元素，响应视口 resize
const { scrollTarget, viewportWidth, viewportHeight } = useScrollParent(contentRef, updatePosition)
// 更新下拉面板位置
function updatePosition() {
  showOptions.value && getPosition()
}
// 计算下拉面板位置
async function getPosition() {
  await measure()
  panelHeight.value = panelRef.value?.offsetHeight
  panelWidth.value = panelRef.value?.offsetWidth
  panelOffset.value = (contentRect.value as DOMRect).height + 4
  panelPlace.value = getPlacement()
  panelAlign.value = getAlign()
}
// 获取可滚动父元素或视口的矩形信息：仅当可滚动父元素真正裁剪面板 (即面板挂载在该容器内) 时，才以其为界，否则以视口为界
// 修复：面板 Teleport 到 body/具名容器时不受中间滚动容器 overflow 裁剪，flip 边界应为视口，避免空间充足却意外翻转
function getShelterRect() {
  const clipByScrollTarget =
    scrollTarget.value && scrollTarget.value !== document.documentElement && scrollTarget.value.contains(panelRef.value)
  if (scrollTarget.value && clipByScrollTarget) {
    const scrollTargetRect = scrollTarget.value.getBoundingClientRect()
    return {
      top: scrollTargetRect.top < 0 ? 0 : scrollTargetRect.top,
      bottom: scrollTargetRect.bottom > viewportHeight.value ? viewportHeight.value : scrollTargetRect.bottom
    }
  }
  return {
    top: 0,
    bottom: viewportHeight.value
  }
}
// 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
function getPlacement(): 'bottom' | 'top' {
  const { top, bottom } = contentRect.value as DOMRect // 内容元素各边缘相对于浏览器视口的位置(不包括滚动条)
  const { top: targetTop, bottom: targetBottom } = getShelterRect() // 滚动元素或视口各边缘相对于浏览器视口的位置(不包括滚动条)
  const topDistance = top - targetTop // 内容元素上边缘距离滚动元素上边缘的距离
  const bottomDistance = targetBottom - bottom // 内容元素下边缘距离动元素下边缘的距离
  return findPlace('bottom', [])
  // 查询满足条件的 place，如果没有，则返回默认值
  function findPlace(place: string, disabledPlaces: string[]): 'bottom' | 'top' {
    if (place === 'bottom') {
      if (!disabledPlaces.includes('bottom')) {
        if (bottomDistance < (panelHeight.value as number) + 4) {
          return findPlace('top', [...disabledPlaces, 'bottom'])
        } else {
          return 'bottom'
        }
      } else {
        if (!disabledPlaces.includes('top')) {
          return findPlace('top', disabledPlaces)
        }
      }
    } else if (place === 'top') {
      if (!disabledPlaces.includes('top')) {
        if (topDistance < (panelHeight.value as number) + 4) {
          return findPlace('bottom', [...disabledPlaces, 'top'])
        } else {
          return 'top'
        }
      } else {
        if (!disabledPlaces.includes('bottom')) {
          return findPlace('bottom', disabledPlaces)
        }
      }
    }
    return 'bottom'
  }
}
// 下拉面板水平方向被视口遮挡时自动调整对齐方式（基于实际遮挡检测，而非单纯宽度对比）
// left：默认左对齐（面板左边缘对齐内容左边缘），左对齐不溢出视口右侧时采用
// right：左对齐会溢出视口右侧、但右对齐不溢出视口左侧时采用（面板右边缘对齐内容右边缘）
// viewport-left：左右对齐均会溢出视口时，贴视口左边缘兜底，保证从左侧可见内容
function getAlign(): 'left' | 'right' | 'viewport-left' {
  const { left, right } = contentRect.value as DOMRect // 内容元素左右边缘相对于视口的位置
  const width = panelWidth.value ?? 0 // 面板实际宽度
  // 左对齐：面板左边缘 = 内容左边缘 left，右边缘 = left + width，超过视口右边缘则遮挡
  const leftAlignOverflow = left + width > viewportWidth.value
  // 右对齐：面板右边缘 = 内容右边缘 right，左边缘 = right - width，小于 0 则遮挡视口左侧
  const rightAlignOverflow = right - width < 0
  // 左对齐不遮挡，直接左对齐
  if (!leftAlignOverflow) {
    return 'left'
  }
  // 左对齐遮挡但右对齐不遮挡，切换为右对齐
  if (!rightAlignOverflow) {
    return 'right'
  }
  // 左右对齐都遮挡，贴视口左边缘兜底
  return 'viewport-left'
}
// 统一控制面板显隐：受控 open 模式下不直接修改内部状态，仅由外部 open 驱动（openChange/dropdownVisibleChange 已在 watch 中 emit）
function setPanelOpen(open: boolean): void {
  if (props.open === undefined) {
    showOptions.value = open
  }
}
function openPanel(): void {
  if (!props.disabled) {
    setPanelOpen(true)
    getPosition()
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
function onEnter(): void {
  disabledBlur.value = true
}
function onLeave(): void {
  disabledBlur.value = false
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
  disabledBlur.value = Boolean(disabled)
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
function focus(): void {
  inputFocus()
}
function blur(): void {
  blurInput()
}
defineExpose({
  focus,
  blur
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
      'auto-complete-custom': slots.default,
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
  >
    <div ref="contentRef" class="auto-complete-content" @mouseenter="onEnter" @mouseleave="onLeave">
      <div
        v-if="slots.default"
        ref="customInputRef"
        class="auto-complete-custom-input"
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @focusin="!disabled ? onFocus() : () => false"
        @focusout="!disabledBlur && !disabled ? onBlur() : () => false"
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
        @blur="!disabledBlur && !disabled ? onBlur() : () => false"
        @focus="!disabled ? onFocus() : () => false"
        @click="onClick"
      />
      <span v-if="slots.clearIcon" class="clear-svg" :class="{ 'show-svg': showClear }" @click.stop="onClear">
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
    <Teleport :disabled="to === false" :to="to === false ? null : to">
      <Transition
        name="slide"
        enter-from-class="slide-enter"
        enter-active-class="slide-enter"
        enter-to-class="slide-enter slide-enter-active"
        leave-from-class="slide-leave"
        leave-active-class="slide-leave slide-leave-active"
        leave-to-class="slide-leave slide-leave-active"
      >
        <div
          v-if="initialDisplay"
          v-show="panelVisible"
          ref="panelRef"
          class="auto-complete-panel"
          :class="popupClassName"
          :style="{
            ...panelPlacement,
            ...dropdownMenuStyle,
            '--auto-complete-option-bg-color-active': colorPalettes[0]
          }"
        >
          <Scrollbar
            :style="{ ...optionsStyle, '--scrollbar-rail-vertical-right': '2px 0 2px auto' }"
            class="auto-complete-options"
            @click.stop="inputFocus"
            @mouseenter="disabledBlur = true"
            @mouseleave="disabledBlur = false"
          >
            <template v-for="(item, index) in displayData" :key="index">
              <template v-if="isGroup(item)">
                <p class="auto-complete-group-title">
                  <slot v-if="slots.option" name="option" v-bind="item" />
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
                  @click.stop="isDisabled(child) ? inputFocus() : onSelectOption(child)"
                >
                  <slot v-if="slots.option" name="option" v-bind="childSlotProps(child)" />
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
                @click.stop="isDisabled(item) ? inputFocus() : onSelectOption(item)"
              >
                <slot v-if="slots.option" name="option" v-bind="childSlotProps(item)" />
                <template v-else>{{ getLabel(item) }}</template>
              </p>
            </template>
          </Scrollbar>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<style lang="less" scoped>
.slide-enter {
  transform: scale(0);
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
      transform: scaleY(0.8);
      opacity: 0;
    }
    100% {
      transform: scaleY(1);
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
      transform: scaleY(1);
      opacity: 1;
    }
    100% {
      transform: scaleY(0.8);
      opacity: 0;
    }
  }
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
.auto-complete-panel {
  position: absolute;
  z-index: 1000;
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
