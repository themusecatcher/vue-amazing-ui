<script setup lang="ts">
import { ref, computed, watchEffect, watch, nextTick, onUnmounted, inject } from 'vue'
import type { CSSProperties, Ref } from 'vue'
import Empty from 'components/empty'
import Scrollbar, { type ScrollbarProps } from 'components/scrollbar'
import {
  raiseFloatingOrder,
  useFloating,
  useFloatingTeleportTarget,
  useInject,
  useZIndex,
  Z_INDEX_CONTAINER_OPEN_KEY,
  FLOATING_LAYER_Z_INDEX
} from 'components/utils'
import type { FloatingPlacement } from 'components/utils'
export interface Option {
  label?: string // 选项名
  value?: string | number // 选项值
  disabled?: boolean // 是否禁用选项，默认 false
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
export interface Props {
  options?: Option[] // 选项数据
  label?: string // 字典项的文本字段名
  value?: string // 字典项的值字段名
  placeholder?: string // 默认占位文本
  disabled?: boolean // 是否禁用
  width?: string | number // 选择器宽度，单位 px
  height?: number // 选择器高度，单位 px
  size?: 'small' | 'middle' | 'large' // 选择器大小
  allowClear?: boolean // 是否支持清除
  search?: boolean // 是否支持搜索
  placement?: 'bottom' | 'top' // 下拉面板弹出位置
  flip?: boolean // 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置
  to?: string | HTMLElement | false // 下拉面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  popupClassName?: string // 下拉面板的类名，用于自定义面板样式
  dropdownMenuStyle?: CSSProperties // 下拉面板自定义样式，可覆盖定位（与 AutoComplete 的同名属性语义一致）
  zIndex?: number // 下拉面板层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
  /*
    根据输入项进行筛选，默认为 true 时，筛选每个选项的文本字段 label 是否包含输入项，包含返回 true，反之返回 false
    当其为函数 Function 时，接受 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
  */
  filter?: ((inputValue: string, option: Option) => boolean) | true // 过滤条件函数，仅当支持搜索时生效
  maxDisplay?: number // 下拉面板最多能展示的项数，超过后滚动显示
  scrollbarProps?: ScrollbarProps // 下拉面板滚动条 scrollbar 组件属性配置
  modelValue?: number | string // (v-model) 当前选中的 option 条目值
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: 'label',
  value: 'value',
  placeholder: '请选择',
  disabled: false,
  width: 'auto',
  height: undefined,
  size: 'middle',
  allowClear: false,
  search: false,
  placement: 'bottom',
  flip: true,
  to: undefined,
  popupClassName: undefined,
  dropdownMenuStyle: undefined,
  zIndex: undefined,
  filter: true,
  maxDisplay: 8,
  scrollbarProps: () => ({}),
  modelValue: undefined
})
const initialDisplay = ref<boolean>(false) // 性能优化，使用 v-if 避免初始时不必要的渲染，展示之后使用 v-show 来控制显示隐藏
const filterOptions = ref<Option[]>([]) // 过滤后的选项数组
let filterResetTimer: ReturnType<typeof setTimeout> | null = null // 面板关闭态下延迟重置选项的定时器
const selectedName = ref<string | number | null>() // 当前选中选项的 label
const inputRef = ref<HTMLElement | null>(null) // input 元素引用
const inputValue = ref<string>() // 支持搜索时，用户输入内容
const hideSelectName = ref<boolean>(false) // 用户输入时，隐藏 selectName 的展示
const hoverValue = ref<string | number | null>() // 鼠标悬浮项的 value 值
const showOptions = ref<boolean>(false) // 显示隐藏 options 面板
const showArrow = ref<boolean>(true) // 剪头图标显隐
const showClear = ref<boolean>(false) // 清除图标显隐
const showCaret = ref<boolean>(false) // 支持搜索时，输入光标的显隐
const showSearch = ref<boolean>(false) // 搜索图标显隐
const selectFocused = ref<boolean>(false) /// select 是否聚焦
const { colorPalettes, shadowColor } = useInject('Select') // 主题色注入
const selectContentRef = ref<HTMLElement | null>(null) // selectContent 模板引用
const selectPanelRef = ref<HTMLElement | null>(null) // 下拉面板 selectPanel 模板引用
const selectPanelWrapperRef = ref<HTMLElement | null>(null) // 定位参照容器：面板 top / left 的坐标原点
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
const emits = defineEmits(['update:modelValue', 'change', 'openChange'])
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
// 是否存在滚动
const isScrollable = computed(() => {
  return props.options.length > props.maxDisplay
})
const optionsStyle = computed(() => {
  // 选项区最大高度 = maxDisplay × 单选项高度 32px，恰好展示 maxDisplay 项后滚动
  // （面板自身上下 4px 内边距不属于选项区，额外计入会让下一项漏出 8px 的一小条）
  const style: CSSProperties = {
    maxHeight: `${props.maxDisplay * 32}px`
  }
  return style
})
// 定位内核：只做「算 + 输出 + 同步」，本组件不再自研翻转 / 对齐几何
// 期望方向取 bottomLeft / topLeft：面板与触发器等宽且左对齐，Left 后缀即该对齐口径；
// 主轴翻转天然只在这两者之间切换，与面板仅支持垂直两向的语义一致
const floatingPlacement = computed<FloatingPlacement>(() => (props.placement === 'top' ? 'topLeft' : 'bottomLeft'))
const { panelStyle, transformOrigin } = useFloating(selectPanelRef, {
  anchor: () => selectContentRef.value,
  offsetContainer: selectPanelWrapperRef,
  placement: () => floatingPlacement.value,
  flip: () => props.flip,
  shift: false, // 次轴不做对齐自适应与微调：面板与触发器等宽，次轴无溢出空间可调
  offset: 4, // 主轴间距：面板紧贴锚点外 4px
  boundary: 'scrollParent', // 复用 getFloatingBoundaryRect 口径：仅当浮层真被滚动容器裁剪时才以容器为界
  matchTriggerWidth: 'width', // 面板与触发器等宽（width 与 minWidth 同值）
  enabled: () => showOptions.value
})
// 面板层级：显式 zIndex 优先于自动分配 / 默认层级（与乙类组件的 zIndex prop 同一优先级契约）
const selectPanelZIndex = computed(() => props.zIndex ?? layerZIndex.value)
// 面板内联样式：内核输出（定位 + 动画原点）+ 使用者自定义样式 + 层级 + 主题变量
// 顺序与 AutoComplete 一致：dropdownMenuStyle 可覆盖定位，但层级与主题变量始终由组件接管
const selectPanelStyle = computed<CSSProperties>(() => ({
  ...panelStyle.value,
  transformOrigin: transformOrigin.value,
  ...props.dropdownMenuStyle,
  zIndex: selectPanelZIndex.value,
  '--select-option-bg-color-active': colorPalettes.value[0]
}))
watch(showOptions, async (to) => {
  // 首次打开时才用 v-if 渲染面板，此后仅由 v-show 控制显隐
  if (to && !initialDisplay.value) {
    initialDisplay.value = true
  }
  // 每次「出现」重新领取层级（与 Popup / Modal / Drawer 同一语义）：面板关闭后不卸载（仅 v-show），
  // 若只在挂载时领取一次，则被承载它的 Modal / Drawer 等「重新出现并置顶」后，二次打开的下拉会落到遮罩之下。
  // 关闭时归还槽位（面板元素保留、内联层级不变）：否则「弹窗 ↔ 下拉」交替出现时两者会互相抬升，层级随开合次数持续增长
  if (to) {
    allocateZIndex()
    // 无分配器时同层级浮层的上下关系由 DOM 顺序决定，故每次展开都把容器移到目标末尾 ——
    // 使顺序等于「最近一次打开的顺序」（就地渲染时容器在组件自身 DOM 内，不能移动）
    if (resolvedTo.value !== false) {
      raiseFloatingOrder(selectPanelWrapperRef.value)
    }
  } else {
    releaseZIndex()
  }
  emits('openChange', to)
  if (props.search && !to) {
    inputValue.value = undefined
    hideSelectName.value = false
  }
  // 打开面板时把当前选中项滚动到可视区域内
  if (to) {
    await scrollOptionIntoView('.option-selected')
  }
})
// 承载层（Modal / Drawer / Dialog）关闭时收起面板并归位聚焦态：容器不卸载内容，本面板也不会随容器消失 ——
// ① 面板：本组件的关闭依赖 input 的 blur，而容器关闭只是把内容 display:none、不派发 blur，
//    面板于是停留在打开态：容器已关闭、面板仍悬浮且占着层级槽位，容器再次打开时按「后出现者在上」
//    重新领取层级会越过它 → 面板反而落到遮罩之下（详见 z-index.ts 的 Z_INDEX_CONTAINER_OPEN_KEY）
// ② 聚焦态：容器关闭同样不派发 blur（focusTriggerAfterClose 归还焦点时也未必落到本 input 上），
//    故须在此显式归位，否则容器重开时 `.select-focused` 的描边与阴影仍在
const containerOpen = inject(Z_INDEX_CONTAINER_OPEN_KEY, null) as Ref<boolean> | null
if (containerOpen) {
  watch(containerOpen, (open) => {
    if (!open) {
      closeOptionsPanel()
      selectFocused.value = false
      hoverValue.value = null
    }
  })
}
watchEffect(() => {
  // 重跑前先取消上一次的延迟重置，避免定时器堆积
  if (filterResetTimer) {
    clearTimeout(filterResetTimer)
    filterResetTimer = null
  }
  if (props.search) {
    if (inputValue.value) {
      const keyword = inputValue.value
      filterOptions.value = props.options.filter((option) => {
        if (typeof props.filter === 'function') {
          return props.filter(keyword, option)
        } else {
          return option[props.label].includes(keyword)
        }
      })
    } else {
      if (showOptions.value) {
        filterOptions.value = [...props.options]
      } else {
        filterResetTimer = setTimeout(() => {
          filterOptions.value = [...props.options]
        }, 200)
      }
    }
    // inputValue 先判空可让本分支短路：否则 filterOptions 会被登记为该 effect 的依赖，
    // 又被上面的延迟重置定时器写入，形成「写入 → 重跑 → 再排定时器」的自触发循环。
    // 复位语义：有输入（searchValue 变化）时把悬浮态落到过滤结果首项；
    // 无输入时保持原悬浮项 —— 面板关闭会清空输入，若此处一并复位，关闭前的悬浮态就会丢失
    if (inputValue.value) {
      hoverValue.value = filterOptions.value.length ? filterOptions.value[0][props.value] : null
    }
  } else {
    filterOptions.value = props.options
  }
})
// 卸载时取消面板关闭态的延迟重置定时器，避免回调在卸载后仍持有组件作用域并写入状态
onUnmounted(() => {
  if (filterResetTimer) {
    clearTimeout(filterResetTimer)
    filterResetTimer = null
  }
})
watchEffect(() => {
  initSelector()
})
// 滚动跟随 / 视口 resize / 字体就绪的重对齐由定位内核统一承担（遍历锚点全链滚动祖先 + 帧合并）
// 将面板内指定选项（当前选中项 / 键盘高亮项）滚动到可视区域内（已可见时不做任何滚动）
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
function initSelector(): void {
  if (props.modelValue) {
    const target = props.options.find((option) => option[props.value] === props.modelValue)
    if (target) {
      selectedName.value = target[props.label]
      hoverValue.value = target[props.value]
    } else {
      selectedName.value = props.modelValue
      hoverValue.value = null
    }
  } else {
    selectedName.value = null
    hoverValue.value = null
  }
}
function onFocus(): void {
  selectFocused.value = true
}
// 关闭下拉面板，并把与搜索相关的状态归位（聚焦态由调用方自行维护）
function closeOptionsPanel(): void {
  if (showOptions.value) {
    showOptions.value = false
  }
  if (props.search) {
    showSearch.value = false
    showArrow.value = true
    hideSelectName.value = false
  }
}
function onBlur(): void {
  selectFocused.value = false
  closeOptionsPanel()
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
function onEnter(): void {
  // allowClear 的箭头 / 清除图标切换
  if (props.allowClear) {
    if (selectedName.value || (props.search && inputValue.value)) {
      showArrow.value = false
      showClear.value = true
      if (props.search) {
        showSearch.value = false
      }
    }
  }
}
function onLeave(): void {
  // 还原箭头 / 清除图标与 search 状态，同 onEnter
  if (props.allowClear && showClear.value) {
    showClear.value = false
    if (!props.search) {
      showArrow.value = true
    }
  }
  if (props.search) {
    if (showOptions.value) {
      showSearch.value = true
      showArrow.value = false
    } else {
      showSearch.value = false
      showArrow.value = true
    }
  }
}
function onHover(value: string | number): void {
  hoverValue.value = value
}
async function toggleSelect(): Promise<void> {
  selectFocus()
  if (!props.search && inputRef.value) {
    inputRef.value.style.opacity = '0'
  }
  // 面板定位由定位内核在 showOptions 翻为 true 时自动执行（enabled 驱动），无需显式重算
  showOptions.value = !showOptions.value
  // 打开面板时确定悬浮态：
  // ① 有选中项 → 悬浮到选中项；
  // ② 无选中项、或原悬浮项已不在可用选项中（含从未悬浮过）→ 悬浮到首个可用项；
  // ③ 其余情况保持关闭前的悬浮项
  if (showOptions.value) {
    const selected = selectedName.value
      ? props.options.find((option) => option[props.label] === selectedName.value)
      : undefined
    if (selected) {
      hoverValue.value = selected[props.value]
    } else if (!props.options.some((option) => !option.disabled && option[props.value] === hoverValue.value)) {
      const firstEnabled = props.options.find((option) => !option.disabled)
      hoverValue.value = firstEnabled ? firstEnabled[props.value] : null
    }
  }
  if (props.search) {
    if (!showClear.value) {
      showArrow.value = !showOptions.value
      showSearch.value = showOptions.value
    }
  }
}
function onSearchInput(e: Event): void {
  hideSelectName.value = Boolean((e.target as HTMLInputElement)?.value)
}
// 键盘导航：↑↓ 移动高亮（跳过禁用项、环形，随即滚入可视区）、Enter 选中高亮项、Esc 关闭面板
// 面板未打开时 ↑↓ 仅打开面板（悬浮态由 toggleSelect 的打开分支确定），与 AutoComplete 的键盘行为保持一致
function onKeydown(e: KeyboardEvent): void {
  if (props.disabled) return
  const list = filterOptions.value
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (!list.length) return
    e.preventDefault()
    if (!showOptions.value) {
      toggleSelect()
      return
    }
    const isArrowDown = e.key === 'ArrowDown'
    const currentIdx = list.findIndex((option) => !option.disabled && option[props.value] === hoverValue.value)
    // 环形查找下一个未禁用项：从当前项的下一个开始循环一圈；无高亮时向下从第一项、向上从最后一项开始
    let start = 0
    if (isArrowDown) {
      start = currentIdx === -1 ? 0 : currentIdx + 1
    } else {
      start = currentIdx === -1 ? list.length - 1 : currentIdx - 1
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
    hoverValue.value = list[nextIdx][props.value]
    scrollOptionIntoView('.option-hover')
    return
  }
  if (e.key === 'Enter') {
    // 面板打开且有高亮未禁用项时，Enter 确认选中（下标口径与鼠标点击一致，均为过滤后列表的下标）
    if (!showOptions.value) return
    const index = list.findIndex((option) => !option.disabled && option[props.value] === hoverValue.value)
    if (index < 0) return
    e.preventDefault()
    onChange(list[index][props.value], list[index][props.label], index)
    return
  }
  if (e.key === 'Escape' && showOptions.value) {
    e.preventDefault()
    closeOptionsPanel()
  }
}
function onClear(): void {
  if (selectFocused.value) {
    selectFocus()
    showCaret.value = true
  }
  showClear.value = false
  selectedName.value = null
  hoverValue.value = null
  showOptions.value = false
  showSearch.value = false
  showArrow.value = true
  emits('update:modelValue')
  emits('change')
}
function selectFocus(): void {
  inputRef.value?.focus() // 通过 input 标签聚焦来模拟 select 整体聚焦效果
}
// 选中下拉项后的回调
function onChange(value: string | number, label: string, index: number): void {
  if (props.modelValue !== value) {
    selectedName.value = label
    hoverValue.value = value
    emits('update:modelValue', value)
    emits('change', value, label, index)
  }
  showCaret.value = false
  // 选项的 mousedown 已阻止默认行为（input 不再失焦），故关闭面板不能再依赖 blur 事件，需在此显式关闭
  closeOptionsPanel()
  selectFocus()
}
</script>
<template>
  <div
    class="select-wrap"
    :class="{
      'select-focused': selectFocused,
      'search-select': search,
      'select-small': size === 'small',
      'select-large': size === 'large',
      'select-disabled': disabled
    }"
    :style="`
      --select-width: ${selectWidth};
      --select-height: ${selectHeight};
      --select-primary-color-hover: ${colorPalettes[4]};
      --select-primary-color-focus: ${colorPalettes[4]};
      --select-primary-shadow-color: ${shadowColor};
    `"
    @mousedown="onMousedown"
    @click="disabled ? () => false : toggleSelect()"
  >
    <div ref="selectContentRef" class="select-content-container" @mouseenter="onEnter" @mouseleave="onLeave">
      <span class="select-search">
        <input
          ref="inputRef"
          class="search-input"
          :class="{ 'caret-show': showOptions || showCaret }"
          type="text"
          autocomplete="off"
          :readonly="!search"
          :disabled="disabled"
          @input="onSearchInput"
          @keydown="onKeydown"
          v-model="inputValue"
          @blur="!disabled ? onBlur() : () => false"
          @focus="!disabled ? onFocus() : () => false"
        />
      </span>
      <span
        class="select-item"
        :class="{ 'select-placeholder': !selectedName || showOptions, 'select-item-hidden': hideSelectName }"
        :title="selectedName === null || selectedName === undefined ? undefined : String(selectedName)"
      >
        {{ selectedName || placeholder }}
      </span>
      <svg
        class="arrow-svg"
        :class="{ 'arrow-rotate': showOptions, 'show-svg': showArrow }"
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
        class="search-svg"
        :class="{ 'show-svg': showSearch }"
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
      <svg
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
            v-show="showOptions"
            ref="selectPanelRef"
            class="select-panel-container"
            :class="popupClassName"
            :style="selectPanelStyle"
            @mousedown.prevent
          >
            <Scrollbar
              v-show="filterOptions.length"
              :style="{ ...optionsStyle, '--scrollbar-rail-vertical-right': '2px 0 2px auto' }"
              class="select-options-panel"
              @click.stop="selectFocus"
              v-bind="scrollbarProps"
            >
              <!-- 选项上按下鼠标时阻止默认行为：否则 mousedown 会让 input 失焦触发 blur 关闭面板，
                   而面板在离开动画期间已整体禁用指针事件（见 .select-panel-container.slide-leave-active），
                   随后的 mouseup / click 便落不到选项上 —— 表现为「真实鼠标点击选项无任何反应」 -->
              <p
                v-for="(option, index) in filterOptions"
                :key="index"
                :class="[
                  'select-option',
                  {
                    'option-hover': !option.disabled && option[value] === hoverValue,
                    'option-selected': option[label] === selectedName,
                    'option-disabled': option.disabled
                  }
                ]"
                :title="option[label]"
                @mouseenter="onHover(option[value])"
                @mousedown.prevent
                @click.stop="option.disabled ? selectFocus() : onChange(option[value], option[label], index)"
              >
                {{ option[label] }}
              </p>
            </Scrollbar>
            <div
              v-show="!filterOptions.length"
              class="select-options-panel options-panel-empty"
              @click.stop="selectFocus"
            >
              <Empty image="outlined" />
            </div>
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
      }
      .caret-show {
        caret-color: auto;
      }
    }
    .select-item {
      position: relative;
      padding-right: 18px;
      flex: 1;
      line-height: calc(var(--select-height) - 2px);
      user-select: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: all 0.3s;
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
      display: inline-block;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.25);
      fill: currentColor;
      opacity: 0;
      user-select: none;
      pointer-events: none;
    }
    .arrow-svg {
      .icon-svg();
      transition:
        transform 0.3s,
        opacity 0.3s;
    }
    .arrow-rotate {
      transform: rotate(180deg);
    }
    .search-svg {
      .icon-svg();
      transition: opacity 0.3s;
    }
    .clear-svg {
      .icon-svg();
      z-index: 1;
      background: #fff;
      cursor: pointer;
      transition:
        color 0.2s,
        opacity 0.3s;
      &:hover {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .show-svg {
      opacity: 1;
      pointer-events: auto;
    }
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
.select-small {
  font-size: 14px;
  .select-content-container {
    padding: 0 7px;
    border-radius: 4px;
    .select-search {
      left: 7px;
      right: 28px;
    }
    .select-item {
      padding-right: 22px;
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
  outline: none;
  cursor: auto;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);

  .select-options-panel {
    .select-option {
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
    }
    .option-hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .option-selected {
      font-weight: 600;
      background: var(--select-option-bg-color-active);
    }
    .option-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
  .options-panel-empty {
    min-width: 112px;
    padding: 9px 16px;
    .empty-wrap {
      margin-block: 8px;
      :deep(.empty-image-wrap) {
        height: 35px;
      }
    }
  }
}
</style>
