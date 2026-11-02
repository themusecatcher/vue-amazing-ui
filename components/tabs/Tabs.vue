<script setup lang="ts">
import { ref, computed, watch, onMounted, useSlots, defineComponent, getCurrentInstance } from 'vue'
import type { CSSProperties, PropType, VNode } from 'vue'
import Dropdown, { type DropdownMenuOption } from 'components/dropdown'
import { log, useControlledModel, useResizeObserver, useSlotsExist } from 'components/utils'
import { parseTabPanes } from './slotItems'
import { getCenterScroll } from './scroll'
import type { TabsDisplayDirective, TabsPane } from './slotItems'

/** 页签在导航区的分布方式 */
export type TabsJustifyContent = 'space-between' | 'space-around' | 'space-evenly' | 'center' | 'start' | 'end'
/** 新增页签按钮配置：对象形态渲染为禁用态 */
export interface TabsAddable {
  disabled?: boolean // 是否禁用新增按钮
}
/** 切换页签前的钩子：返回 `false` 或 Promise reject 时取消本次切换 */
export type TabsBeforeLeave = (key: string | number, oldKey?: string | number) => boolean | void | Promise<unknown>

/**
 * 标签页：`TabPane` 只描述「这一页叫什么、是否禁用、内容是什么」，导航栏、指示条与面板容器统一由本组件渲染
 */
export interface Props {
  // 双向绑定
  activeKey?: string | number // 当前激活 tab 面板的 key
  defaultActiveKey?: string | number // 非受控时的初始激活 key，仅在未传 activeKey 时生效
  // 内容数据
  prefix?: string // 标签页前缀
  suffix?: string // 标签页后缀
  // 形态外观
  size?: 'small' | 'middle' | 'large' // 标签页大小
  type?: 'line' | 'card' // 标签页的类型
  tabPosition?: 'top' | 'right' | 'bottom' | 'left' // 自定义页签位置
  justifyContent?: TabsJustifyContent // 页签在导航区的分布方式，line 下仅未溢出时生效，card 下仅 center 生效
  tabGutter?: number // 页签之前的间隙大小，单位 px
  tabStyle?: CSSProperties // 自定义页签样式
  tabClass?: string // 自定义页签类名
  contentStyle?: CSSProperties // 自定义内容样式
  contentClass?: string // 自定义内容类名
  // 行为交互
  animated?: boolean // 是否启用切换动画，在 tabPosition: 'top' | 'bottom' 时有效
  centerActiveTab?: boolean // 切换页签时是否把激活项滚动到导航区中间，空间不足时贴边
  addable?: boolean | TabsAddable // 是否展示新增页签按钮；传对象可渲染为禁用态
  destroyInactiveTabPane?: boolean // 是否销毁非激活面板的内容，页签自身的 displayDirective 优先
  beforeLeave?: TabsBeforeLeave // 切换页签前的钩子，返回 false 或 Promise reject 时取消切换
}
/** 自定义页签头的插槽参数 */
export interface TabsTabBarSlotProps {
  tabs: TabsPane[] // 页签列表
  activeKey?: string | number // 当前激活 key
  change: (key: string | number) => void // 切换页签
}
// 声明组件插槽类型
export interface TabsSlots {
  default?: () => VNode[] // 标签页内容（TabPane 子组件）
  prefix?: () => VNode[] // 自定义标签页前缀
  suffix?: () => VNode[] // 自定义标签页后缀
  addIcon?: () => VNode[] // 自定义新增页签按钮的图标
  tabBar?: (props: TabsTabBarSlotProps) => VNode[] // 自定义页签头，使用后替代内置导航
}

const props = withDefaults(defineProps<Props>(), {
  activeKey: undefined,
  defaultActiveKey: undefined,
  prefix: undefined,
  suffix: undefined,
  size: 'middle',
  type: 'line',
  tabPosition: 'top',
  justifyContent: undefined,
  tabGutter: undefined,
  tabStyle: () => ({}),
  tabClass: undefined,
  contentStyle: () => ({}),
  contentClass: undefined,
  animated: false,
  centerActiveTab: false,
  addable: false,
  destroyInactiveTabPane: false,
  beforeLeave: undefined
})
defineSlots<TabsSlots>()
/**
 * 插槽内容渲染器：把 `() => VNode[]` 当插槽函数求值
 *
 * 直接把槽函数交给 `<component :is>` 会被 Vue 当作函数式组件，而槽函数每次解析都是新引用，
 * 类型变化会连带重新挂载面板内容（输入框失焦、内部状态丢失）；这里以稳定组件承载，只更新 prop。
 */
const TabsSlotContent = defineComponent({
  name: 'TabsSlotContent',
  props: {
    content: { type: Function as PropType<() => VNode[]> }
  },
  setup: (slotProps) => () => slotProps.content?.()
})
// 插槽在 computed 求值时（渲染过程中）被调用，槽内读取的响应式数据会被本 computed 收集，
// 因此页签文字 / 禁用态随外部状态更新而重算；若改在渲染之外解析，Vue 会跳过依赖收集并告警
const slots: TabsSlots = useSlots()
const panes = computed(() => parseTabPanes(slots.default?.() ?? []))
const tabsRef = ref<HTMLElement[]>([]) // 所有 tabs 的 ref 模板引用
const tabBarLeft = ref(0) // tabBar 的水平偏移量
const tabBarTop = ref(0) // tabBar 的垂直偏移量
const tabBarWidth = ref(0) // tabBar 的宽度
const tabBarHeight = ref(0) // tabBar 的高度
const wrapRef = ref<HTMLElement | null>(null)
const wrapWidth = ref<number>()
const wrapHeight = ref<number>()
const navRef = ref<HTMLElement | null>(null)
const navWidth = ref<number>()
const navHeight = ref<number>()
const showWheel = ref(false) // 标签页是否存在滚动
const scrollMax = ref(0) // 最大滚动距离
const scrollLeft = ref(0) // 水平滚动距离
const scrollTop = ref(0) // 垂直滚动距离
const transition = ref(false)
const emits = defineEmits<{
  'update:activeKey': [key: string | number] // 激活项变化
  change: [key: string | number] // 切换面板时调用
  tabClick: [key: string | number, event: MouseEvent | KeyboardEvent] // 点击页签时调用
  tabScroll: [info: { direction: 'left' | 'right' | 'top' | 'bottom' }] // 页签滚动时调用
  add: [] // 点击新增页签按钮时调用
  close: [key: string | number] // 点击页签关闭按钮时调用
}>()
const slotsExist = useSlotsExist(['prefix', 'suffix', 'tabBar'])
const uid = `tabs-${getCurrentInstance()?.uid ?? 0}` // 页签与面板的 aria 关联 id 前缀
// (v-model) 当前激活 key：传值即受控，未传时取 defaultActiveKey 自持（缺省即无激活项）
const activeKeyModel = useControlledModel<string | number | undefined>('activeKey', props.defaultActiveKey)
const activeIndex = computed(() => {
  return panes.value.findIndex((pane) => pane.key === activeKeyModel.value)
})
const showPrefix = computed(() => {
  return Boolean(slotsExist.prefix || props.prefix)
})
const showSuffix = computed(() => {
  return Boolean(slotsExist.suffix || props.suffix)
})
const beforeShadowShow = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    // 水平位置
    return showWheel.value && scrollLeft.value > 0
  } else {
    // 垂直位置
    return showWheel.value && scrollTop.value > 0
  }
})
const afterShadowShow = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    // 水平位置
    return showWheel.value && scrollLeft.value < scrollMax.value
  } else {
    // 垂直位置
    return showWheel.value && scrollTop.value < scrollMax.value
  }
})
const navStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      transform: `translate(${-scrollLeft.value}px, 0)`
    }
  } else {
    return {
      transform: `translate(0, ${-scrollTop.value}px)`
    }
  }
})
const tabGutterStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      marginLeft: `${props.tabGutter}px`
    }
  } else {
    return {
      marginTop: `${props.tabGutter}px`
    }
  }
})
// 页签分布：仅 line 且未溢出时生效（溢出后列表宽度由内容撑开，分布无意义）
const justifyStyle = computed<CSSProperties>(() => {
  if (props.type === 'card' || showWheel.value) {
    return {}
  }
  return props.justifyContent ? { justifyContent: props.justifyContent } : {}
})
// card 的页签按内容宽度排列，居中由导航容器承担；该形态下只有 center 有含义
const navCentered = computed(() => props.justifyContent === 'center')
const tabBarStyle = computed(() => {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    return {
      left: `${tabBarLeft.value}px`,
      width: `${tabBarWidth.value}px`
    }
  } else {
    return {
      top: `${tabBarTop.value}px`,
      height: `${tabBarHeight.value}px`
    }
  }
})
const animatedStyle = computed(() => {
  if (props.animated && ['top', 'bottom'].includes(props.tabPosition)) {
    return {
      marginLeft: `-${100 * (activeIndex.value !== -1 ? activeIndex.value : 0)}%`
    }
  }
  return {}
})
const hiddenStyle = computed(() => {
  if (props.animated && ['top', 'bottom'].includes(props.tabPosition)) {
    return {
      visibility: 'hidden',
      height: '0px',
      overflowY: 'hidden'
    }
  }
  return {
    display: 'none'
  }
})
watch(
  () => activeKeyModel.value,
  () => {
    getBarDisplay()
  },
  {
    flush: 'post'
  }
)
// 分布方式只挪动页签位置、不改变容器尺寸（ResizeObserver 不会触发），须主动重算指示条
watch(
  () => props.justifyContent,
  () => {
    getBarDisplay()
  },
  {
    flush: 'post'
  }
)
// 形态、方向与尺寸会连带改变溢出判定，须连同导航区尺寸一起重算
watch(
  () => [props.type, props.tabPosition, props.tabGutter, props.size],
  () => {
    getNavSize()
  },
  {
    flush: 'post'
  }
)
onMounted(() => {
  getNavSize()
})
useResizeObserver([wrapRef, navRef], () => {
  getNavSize()
})
function getNavSize(): void {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    getNavHorizontalSize()
  } else {
    getNavVerticalSize()
  }
}
function getNavHorizontalSize(): void {
  if (!wrapRef.value || !navRef.value) return
  wrapWidth.value = wrapRef.value.offsetWidth
  navWidth.value = navRef.value.offsetWidth
  if (navWidth.value > wrapWidth.value) {
    showWheel.value = true
    scrollMax.value = navWidth.value - wrapWidth.value
    scrollLeft.value = scrollMax.value
  } else {
    showWheel.value = false
    scrollLeft.value = 0
  }
  getBarDisplay()
}
function getNavVerticalSize(): void {
  if (!wrapRef.value || !navRef.value) return
  wrapHeight.value = wrapRef.value.offsetHeight
  navHeight.value = navRef.value.offsetHeight
  if (navHeight.value > wrapHeight.value) {
    showWheel.value = true
    scrollMax.value = navHeight.value - wrapHeight.value
    scrollTop.value = scrollMax.value
  } else {
    showWheel.value = false
    scrollTop.value = 0
  }
  getBarDisplay()
}
function getBarDisplay(): void {
  if (['top', 'bottom'].includes(props.tabPosition)) {
    getBarHorizontalDisplay()
  } else {
    getBarVerticalDisplay()
  }
}
function getBarHorizontalDisplay(): void {
  const el = activeIndex.value !== -1 ? tabsRef.value[activeIndex.value] : null
  if (el) {
    tabBarLeft.value = el.offsetLeft
    tabBarWidth.value = el.offsetWidth
    if (showWheel.value) {
      if (props.centerActiveTab) {
        // 居中口径：激活项中点对齐可视区中点，首尾空间不足时贴边
        const target = getCenterScroll(tabBarLeft.value, tabBarWidth.value, wrapWidth.value ?? 0, scrollMax.value)
        if (target !== scrollLeft.value) {
          transition.value = true
          scrollLeft.value = target
        }
      } else {
        if (tabBarLeft.value < scrollLeft.value) {
          transition.value = true
          scrollLeft.value = tabBarLeft.value
        }
        const targetScroll = tabBarLeft.value + tabBarWidth.value - (wrapWidth.value ?? 0)
        if (targetScroll > scrollLeft.value) {
          transition.value = true
          scrollLeft.value = targetScroll
        }
      }
    }
  } else {
    tabBarLeft.value = 0
    tabBarWidth.value = 0
  }
}
function getBarVerticalDisplay(): void {
  const el = activeIndex.value !== -1 ? tabsRef.value[activeIndex.value] : null
  if (el) {
    tabBarTop.value = el.offsetTop
    tabBarHeight.value = el.offsetHeight
    if (showWheel.value) {
      if (props.centerActiveTab) {
        const target = getCenterScroll(tabBarTop.value, tabBarHeight.value, wrapHeight.value ?? 0, scrollMax.value)
        if (target !== scrollTop.value) {
          transition.value = true
          scrollTop.value = target
        }
      } else {
        if (tabBarTop.value < scrollTop.value) {
          transition.value = true
          scrollTop.value = tabBarTop.value
        }
        const targetScroll = tabBarTop.value + tabBarHeight.value - (wrapHeight.value ?? 0)
        if (targetScroll > scrollTop.value) {
          transition.value = true
          scrollTop.value = targetScroll
        }
      }
    }
  } else {
    tabBarTop.value = 0
    tabBarHeight.value = 0
  }
}
/** 是否为当前激活页签 */
function isActive(key: string | number): boolean {
  return activeKeyModel.value === key
}
function onTab(key: string | number): void {
  // 写模型即完成两种路径：受控时只上报，非受控时本地生效
  activeKeyModel.value = key
  emits('change', key)
}
let tabChangeId = 0 // 切换请求序号：连点时只让最后一次的校验结果生效
/**
 * 用户主动切换入口（点击 / 键盘 / 溢出菜单）
 *
 * 先过 `beforeLeave`：返回 false 或 Promise reject 时取消本次切换，且不对外抛出 `change`；
 * 校验期间发生的新请求以序号较大者为准，避免旧请求的异步结果覆盖用户的最后一次操作。
 */
function requestTabChange(key: string | number): void {
  const guard = props.beforeLeave
  // 未传守卫时保持既有行为；激活项未变化时也不必拦截（受控模式下外部值可能尚未回写）
  if (!guard || key === activeKeyModel.value) {
    onTab(key)
    return
  }
  const id = ++tabChangeId
  Promise.resolve()
    .then(() => guard(key, activeKeyModel.value))
    .then((allow) => {
      if (allow !== false && id === tabChangeId) {
        onTab(key)
      }
    })
    .catch((error: unknown) => {
      // 钩子抛错按「不允许切换」处理，但不吞掉错误：保留告警便于排查
      log('warn', 'Tabs', 'beforeLeave 校验失败，已取消本次切换', error)
    })
}
function onTabClick(pane: TabsPane, event: MouseEvent): void {
  emits('tabClick', pane.key, event)
  if (!pane.disabled) {
    requestTabChange(pane.key)
  }
}
/** 从 start 起按 step 方向找第一个可用页签，全部禁用时返回 -1 */
function findEnabledIndex(start: number, step: 1 | -1): number {
  for (let index = start + step; index >= 0 && index < panes.value.length; index += step) {
    if (!panes.value[index].disabled) {
      return index
    }
  }
  return -1
}
/** 键盘导航：左右（上下）切换、Home / End 跳到首尾可用页签 */
function onTabKeydown(event: KeyboardEvent, index: number): void {
  const vertical = !['top', 'bottom'].includes(props.tabPosition)
  const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = vertical ? 'ArrowDown' : 'ArrowRight'
  let target = -1
  if (event.key === prevKey) {
    target = findEnabledIndex(index, -1)
  } else if (event.key === nextKey) {
    target = findEnabledIndex(index, 1)
  } else if (event.key === 'Home') {
    target = findEnabledIndex(-1, 1)
  } else if (event.key === 'End') {
    target = findEnabledIndex(panes.value.length, -1)
  } else {
    return
  }
  event.preventDefault()
  if (target === -1) {
    return
  }
  emits('tabClick', panes.value[target].key, event)
  requestTabChange(panes.value[target].key)
  tabsRef.value[target]?.focus()
}
function onClose(key: string | number): void {
  emits('close', key)
}
/**
 * 溢出页签：完整落在视口外的页签收纳进「更多」下拉
 *
 * 判定以页签盒子的实际位置为准，随滚动位置与容器尺寸重算；只被裁掉一部分的页签仍留在导航区
 * （与折叠式口径一致：收纳项 = 前部完全滚出 + 后部完全未进入），未溢出时为空数组。
 */
const hiddenPanes = computed<TabsPane[]>(() => {
  if (!showWheel.value) {
    return []
  }
  const horizontal = ['top', 'bottom'].includes(props.tabPosition)
  const offset = horizontal ? scrollLeft.value : scrollTop.value
  const size = (horizontal ? wrapWidth.value : wrapHeight.value) ?? 0
  return panes.value.filter((pane, index) => {
    const el = tabsRef.value[index]
    if (!el) {
      return false
    }
    const start = horizontal ? el.offsetLeft : el.offsetTop
    const end = start + (horizontal ? el.offsetWidth : el.offsetHeight)
    return end <= offset || start >= offset + size
  })
})
const moreOpen = ref(false)
// 收纳入口与末个页签的间距跟随 tabGutter（未显式设置时紧贴，纵向位置单独成行不叠加）
const operationsStyle = computed<CSSProperties>(() => {
  if (['top', 'bottom'].includes(props.tabPosition) && props.tabGutter !== undefined) {
    return { marginLeft: `${props.tabGutter}px` }
  }
  return {}
})
const moreMenus = computed<DropdownMenuOption[]>(() => {
  return hiddenPanes.value.map((pane) => ({
    key: pane.key,
    label: pane.tab,
    disabled: pane.disabled,
    paneClosable: Boolean(pane.closable)
  }))
})
function onMoreSelect(key: DropdownMenuOption['key']): void {
  // 切换后隐藏项集合会变，显式收起避免菜单停留在新一批可见项上
  moreOpen.value = false
  const pane = panes.value.find((item) => item.key === key)
  if (pane) {
    requestTabChange(pane.key)
  }
}
function onMoreClose(key: DropdownMenuOption['key']): void {
  moreOpen.value = false
  emits('close', key as string | number)
}
// 首次激活过的页签集合：show:lazy 只渲染访问过的面板内容
const visitedKeys = ref<Set<string | number>>(new Set())
watch(
  () => activeKeyModel.value,
  (key) => {
    if (key === undefined || visitedKeys.value.has(key)) return
    visitedKeys.value = new Set(visitedKeys.value).add(key)
  },
  { immediate: true }
)
/** 面板内容的渲染口径：页签自身 displayDirective 优先，其次组件级 destroyInactiveTabPane，默认保留 */
function resolveRenderMode(pane: TabsPane): TabsDisplayDirective {
  if (pane.displayDirective) {
    return pane.displayDirective
  }
  return props.destroyInactiveTabPane ? 'if' : 'show'
}
/** 面板内容是否渲染：if 立即卸载、show 保留、show:lazy 首次激活后保留 */
function shouldRenderContent(pane: TabsPane): boolean {
  if (!pane.contentSlot) {
    return false
  }
  if (isActive(pane.key)) {
    return true
  }
  const mode = resolveRenderMode(pane)
  if (mode === 'if') {
    return false
  }
  if (mode === 'show:lazy') {
    return visitedKeys.value.has(pane.key)
  }
  return true
}
const addDisabled = computed<boolean>(() => {
  return typeof props.addable === 'object' && props.addable?.disabled === true
})
function onAddClick(): void {
  if (addDisabled.value) return
  emits('add')
}
// 滚轮与触摸板滑动：默认行为会连带滚动页面，且本库用 transform 而非原生滚动，故须先拦截再折算滚动量
function onWheel(e: WheelEvent): void {
  e.stopPropagation()
  e.preventDefault() // 禁止浏览器捕获触摸板滑动事件
  if (e.deltaX || e.deltaY) {
    if (['top', 'bottom'].includes(props.tabPosition)) {
      // 水平滚动
      getHorizontalScroll(e.deltaX)
    } else {
      // 垂直滚动
      getVerticalScroll(e.deltaY)
    }
  }
}
function getHorizontalScroll(deltaX: number): void {
  const next = Math.min(Math.max(scrollLeft.value + deltaX, 0), scrollMax.value)
  if (next === scrollLeft.value) {
    return
  }
  scrollLeft.value = next
  emits('tabScroll', { direction: deltaX > 0 ? 'right' : 'left' })
}
function getVerticalScroll(deltaY: number): void {
  const next = Math.min(Math.max(scrollTop.value + deltaY, 0), scrollMax.value)
  if (next === scrollTop.value) {
    return
  }
  scrollTop.value = next
  emits('tabScroll', { direction: deltaY > 0 ? 'bottom' : 'top' })
}
function getContentStyle(pane: TabsPane): CSSProperties {
  if (!isActive(pane.key)) {
    return hiddenStyle.value as CSSProperties
  }
  return {}
}
</script>
<template>
  <div
    class="tabs-wrap"
    :class="[
      `tabs-${tabPosition} tabs-${size}`,
      {
        'tabs-card': type === 'card'
      }
    ]"
  >
    <div class="tabs-nav-container" :class="{ 'tabs-nav-custom': slotsExist.tabBar }" :style="tabStyle">
      <div v-if="showPrefix" class="tabs-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </div>
      <slot v-if="slotsExist.tabBar" name="tabBar" :tabs="panes" :active-key="activeKeyModel" :change="onTab" />
      <div
        v-else
        ref="wrapRef"
        class="tabs-nav-wrap"
        :class="{
          'tabs-center': navCentered,
          'before-shadow-active': beforeShadowShow,
          'after-shadow-active': afterShadowShow
        }"
      >
        <div
          ref="navRef"
          class="tabs-nav-list"
          role="tablist"
          :aria-orientation="['top', 'bottom'].includes(tabPosition) ? 'horizontal' : 'vertical'"
          :class="{ 'nav-transition': transition }"
          @transitionend="transition = false"
          :style="[navStyle, justifyStyle]"
          @wheel="showWheel ? onWheel($event) : () => false"
        >
          <div
            ref="tabsRef"
            class="tab-item"
            role="tab"
            :id="`${uid}-tab-${pane.key}`"
            :aria-selected="isActive(pane.key)"
            :aria-disabled="pane.disabled || undefined"
            :aria-controls="`${uid}-panel-${pane.key}`"
            :tabindex="isActive(pane.key) ? 0 : -1"
            :class="[
              tabClass,
              {
                'tab-line-active': type === 'line' && isActive(pane.key),
                'tab-card-active': type === 'card' && isActive(pane.key),
                'tab-disabled': pane.disabled
              }
            ]"
            :style="index > 0 && tabGutter !== undefined ? tabGutterStyle : {}"
            @click="onTabClick(pane, $event)"
            @keydown="onTabKeydown($event, index)"
            v-for="(pane, index) in panes"
            :key="pane.key"
          >
            <TabsSlotContent v-if="pane.tabSlot" :content="pane.tabSlot" />
            <template v-else>{{ pane.tab }}</template>
            <span
              v-if="pane.closable"
              class="tab-close"
              role="button"
              aria-label="关闭页签"
              @click.stop="onClose(pane.key)"
            >
              <svg focusable="false" aria-hidden="true" viewBox="64 64 896 896">
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                ></path>
              </svg>
            </span>
          </div>
          <div
            class="tab-bar"
            :class="{
              'tab-bar-disabled': panes[activeIndex]?.disabled,
              'card-hidden': type === 'card'
            }"
            :style="tabBarStyle"
          ></div>
          <button
            v-if="addable"
            type="button"
            class="tab-add"
            :class="{ 'tab-add-disabled': addDisabled }"
            aria-label="新增页签"
            :disabled="addDisabled"
            @click="onAddClick"
          >
            <slot name="addIcon">
              <svg focusable="false" aria-hidden="true" viewBox="64 64 896 896">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            </slot>
          </button>
        </div>
      </div>
      <div v-if="hiddenPanes.length" class="tabs-nav-operations" :style="operationsStyle">
        <Dropdown
          v-model:open="moreOpen"
          trigger="hover"
          placement="bottomLeft"
          overlay-class-name="tabs-more-menu"
          :menus="moreMenus"
          @menu-click="onMoreSelect"
        >
          <button type="button" class="tab-more" aria-label="更多页签">
            <svg focusable="false" aria-hidden="true" viewBox="64 64 896 896">
              <path
                d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"
              ></path>
            </svg>
          </button>
          <template #label="{ option }">
            <span class="tab-more-label">{{ option?.label }}</span>
            <span
              v-if="option?.paneClosable"
              class="tab-more-close"
              role="button"
              aria-label="关闭页签"
              @click.stop="onMoreClose(option?.key)"
            >
              <svg focusable="false" aria-hidden="true" viewBox="64 64 896 896">
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                ></path>
              </svg>
            </span>
          </template>
        </Dropdown>
      </div>
      <div v-if="showSuffix" class="tabs-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </div>
    </div>
    <div class="tabs-page-container" :style="contentStyle">
      <div
        class="tabs-content-wrap"
        :class="{ 'tabs-content-animated': animated && ['top', 'bottom'].includes(tabPosition) }"
        :style="animatedStyle"
      >
        <div
          class="tabs-content"
          :class="contentClass"
          role="tabpanel"
          :id="`${uid}-panel-${pane.key}`"
          :aria-labelledby="`${uid}-tab-${pane.key}`"
          :tabindex="isActive(pane.key) ? 0 : -1"
          :style="getContentStyle(pane)"
          v-for="pane in panes"
          :key="pane.key"
        >
          <TabsSlotContent v-if="shouldRenderContent(pane)" :content="pane.contentSlot" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.tabs-wrap {
  display: flex;
  font-size: 14px;
  color: var(--va-text-color-1);
  line-height: 1.5714285714285714;
  list-style: none;
  .tabs-nav-container {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    &::before {
      position: absolute;
      content: '';
    }
    .tabs-prefix {
      flex: none;
    }
    .tabs-suffix {
      flex: none;
    }
    .tabs-nav-wrap {
      position: relative;
      display: flex;
      flex: auto;
      align-self: stretch;
      overflow: hidden;
      white-space: nowrap;
      transform: translate(0);
      .shadow {
        position: absolute;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
        content: '';
        pointer-events: none;
      }
      &::before {
        .shadow();
      }
      &::after {
        .shadow();
      }
      .tabs-nav-list {
        position: relative;
        display: flex;
        // 内容不足时撑满容器（分布样式才有作用），内容超出时不参与收缩、由内容撑开触发溢出收纳
        flex: none;
        min-width: 100%;
        .tab-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          // 图标与文字的间距；关闭按钮再以负外边距抵消到 8px
          gap: 12px;
          background: transparent;
          border: 0;
          outline: none;
          cursor: pointer;
          transition: all 0.3s;
          // 激活 / 禁用项不参与 hover 变色：active 文字恒为主色（规则作用于内层 btn），
          // disabled 恒为置灰色（disabled 规则后置书写、同特异性压过 hover）
          &:not(.tab-line-active, .tab-card-active, .tab-disabled):hover {
            color: var(--va-cp-tabs-primary-color-hover, var(--va-primary-color-hover));
          }
          :deep(svg) {
            fill: currentColor;
          }
        }
        .tab-line-active {
          /* 激活页签是「主色文字」：取 primary-text 语义位（默认与 primary 同值） */
          color: var(--va-cp-tabs-primary-text-color, var(--va-primary-text-color));
          text-shadow: 0 0 0.25px currentcolor;
        }
        .tab-disabled {
          color: var(--va-text-color-disabled);
          cursor: not-allowed;
          &:hover {
            color: var(--va-text-color-disabled);
          }
        }
        .tab-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 12px;
          height: 12px;
          margin: 0 -4px;
          font-size: 12px;
          color: var(--va-text-color-3);
          transition: color 0.3s;
          &:hover {
            color: var(--va-text-color-1);
          }
          svg {
            width: 1em;
            height: 1em;
            fill: currentColor;
          }
        }
        .tab-add {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          // 独立点击区：line 类型没有卡片外框，靠最小宽度与内边距撑出可点范围
          min-width: 32px;
          padding: 0 8px;
          margin-left: 16px;
          font-size: 14px;
          // 与页签文字同色：图标取 currentColor，偏浅会显得像禁用态
          color: var(--va-text-color-1);
          background: transparent;
          border: 0;
          cursor: pointer;
          transition: color 0.3s;
          &:hover {
            color: var(--va-cp-tabs-primary-color-hover, var(--va-primary-color-hover));
          }
          svg {
            width: 1em;
            height: 1em;
            fill: currentColor;
          }
        }
        .tab-add-disabled {
          color: var(--va-text-color-disabled);
          cursor: not-allowed;
          &:hover {
            color: var(--va-text-color-disabled);
          }
        }
        .tab-bar {
          position: absolute;
          background-color: var(--va-cp-tabs-primary-color, var(--va-primary-color));
          pointer-events: none;
          border-radius: 2px;
          transition:
            width 0.3s,
            left 0.3s,
            height 0.3s,
            top 0.3s,
            background-color;
        }
        .tab-bar-disabled {
          background-color: var(--va-text-color-disabled);
        }
        .card-hidden {
          visibility: hidden;
        }
      }
      .nav-transition {
        transition: all 0.15s;
      }
    }
    // 溢出收纳入口：作为导航区的兄弟节点占位，不覆盖页签（覆盖式会遮住滚到底的末项）
    .tabs-nav-operations {
      display: flex;
      flex: none;
      align-items: stretch;
      align-self: stretch;
      // 触发器撑满导航高度：浮层锚点底边与导航底边重合，下拉面板才能落在分割线下方
      :deep(.dropdown-trigger) {
        display: flex;
        align-items: center;
        height: 100%;
      }
      .tab-more {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        // 与页签文字等宽的点击区：宽度由图标 + 左右各 16px 内边距撑开
        padding: 0 16px;
        // 图标以 1em 取尺寸：显式字号避免落到浏览器按钮默认的 13.33px
        font-size: 14px;
        color: var(--va-text-color-1);
        background: transparent;
        border: 0;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: var(--va-cp-tabs-primary-color-hover, var(--va-primary-color-hover));
        }
        svg {
          width: 1em;
          height: 1em;
          fill: currentColor;
        }
      }
    }
    .tab-more-label {
      flex: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-more-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      margin-left: 8px;
      color: var(--va-text-color-3);
      transition: color 0.3s;
      &:hover {
        color: var(--va-text-color-1);
      }
      svg {
        width: 1em;
        height: 1em;
        fill: currentColor;
      }
    }
    // 自定义页签头的高度由插槽内容决定，会把分割线压在内容下方；提升层级保证底边线始终可见
    &.tabs-nav-custom::before {
      z-index: 1;
    }
    .tabs-center {
      justify-content: center;
    }
    .before-shadow-active {
      &::before {
        opacity: 1;
      }
    }
    .after-shadow-active {
      &::after {
        opacity: 1;
      }
    }
  }
  .tabs-page-container {
    flex: auto;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    .tabs-content-wrap {
      position: relative;
      display: flex;
      width: 100%;
      .tabs-content {
        outline: none;
        flex: none;
        width: 100%;
      }
    }
    .tabs-content-animated {
      transition: margin 0.3s;
    }
  }
}
.tabs-top {
  flex-direction: column;
  .tabs-nav-container {
    margin-bottom: 16px;
    .tabs-prefix {
      padding-right: 12px;
    }
    .tabs-suffix {
      padding-left: 12px;
    }
    &::before {
      right: 0;
      left: 0;
      bottom: 0;
      border-bottom: 1px solid var(--va-border-split-color);
    }
    .tabs-nav-wrap {
      &::before {
        top: 0;
        bottom: 0;
        width: 32px;
        left: 0;
        box-shadow: inset 10px 0 8px -8px var(--va-shadow-color);
      }
      &::after {
        top: 0;
        bottom: 0;
        width: 32px;
        right: 0;
        box-shadow: inset -10px 0 8px -8px var(--va-shadow-color);
      }
      .tabs-nav-list {
        .tab-item {
          &:not(:first-child) {
            margin-left: 32px;
          }
        }
        .tab-bar {
          height: 2px;
          bottom: 0;
        }
      }
    }
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 8px 8px 0 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 8px 8px 0 0;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 6px 6px 0 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 6px 6px 0 0;
          }
        }
      }
    }
  }
}
.tabs-bottom {
  flex-direction: column;
  .tabs-nav-container {
    order: 1;
    margin-top: 16px;
    .tabs-prefix {
      padding-right: 12px;
    }
    .tabs-suffix {
      padding-left: 12px;
    }
    &::before {
      right: 0;
      left: 0;
      top: 0;
      border-bottom: 1px solid var(--va-border-split-color);
    }
    .tabs-nav-wrap {
      &::before {
        top: 0;
        bottom: 0;
        width: 32px;
        left: 0;
        box-shadow: inset 10px 0 8px -8px var(--va-shadow-color);
      }
      &::after {
        top: 0;
        bottom: 0;
        width: 32px;
        right: 0;
        box-shadow: inset -10px 0 8px -8px var(--va-shadow-color);
      }
      .tabs-nav-list {
        .tab-item {
          &:not(:first-child) {
            margin-left: 32px;
          }
        }
        .tab-bar {
          height: 2px;
          top: 0;
        }
      }
    }
  }
  .tabs-page-container {
    order: 0;
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 0 0 8px 8px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 0 8px 8px;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 0 0 6px 6px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 0 6px 6px;
          }
        }
      }
    }
  }
}
.tabs-left {
  .tabs-nav-container {
    flex-direction: column;
    min-width: 40px;
    margin-right: 24px;
    .tabs-prefix {
      padding-bottom: 12px;
    }
    .tabs-suffix {
      padding-top: 12px;
    }
    &::before {
      top: 0;
      bottom: 0;
      right: 0;
      border-left: 1px solid var(--va-border-split-color);
    }
    .tabs-nav-wrap {
      flex-direction: column;
      &::before {
        right: 0;
        left: 0;
        height: 32px;
        top: 0;
        box-shadow: inset 0 10px 8px -8px var(--va-shadow-color);
      }
      &::after {
        right: 0;
        left: 0;
        height: 32px;
        bottom: 0;
        box-shadow: inset 0 -10px 8px -8px var(--va-shadow-color);
      }
      .tabs-nav-list {
        flex: 1 0 auto;
        flex-direction: column;
        .tab-item {
          padding: 8px 24px;
          text-align: center;
          &:not(:first-child) {
            margin-top: 16px;
          }
        }
        .tab-bar {
          width: 2px;
          right: 0;
        }
      }
    }
    // 纵向位置时收纳入口落在导航区下方，横向占满并居中
    .tabs-nav-operations {
      height: 32px;
      align-self: auto;
      justify-content: center;
    }
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 8px 0 0 8px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 8px 0 0 8px;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 6px 0 0 6px;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 6px 0 0 6px;
          }
        }
      }
    }
  }
}
.tabs-right {
  .tabs-nav-container {
    order: 1;
    flex-direction: column;
    min-width: 40px;
    margin-left: 24px;
    .tabs-prefix {
      padding-bottom: 12px;
    }
    .tabs-suffix {
      padding-top: 12px;
    }
    &::before {
      top: 0;
      bottom: 0;
      left: 0;
      border-left: 1px solid var(--va-border-split-color);
    }
    .tabs-nav-wrap {
      flex-direction: column;
      &::before {
        right: 0;
        left: 0;
        height: 32px;
        top: 0;
        box-shadow: inset 0 10px 8px -8px var(--va-shadow-color);
      }
      &::after {
        right: 0;
        left: 0;
        height: 32px;
        bottom: 0;
        box-shadow: inset 0 -10px 8px -8px var(--va-shadow-color);
      }
      .tabs-nav-list {
        flex: 1 0 auto;
        flex-direction: column;
        .tab-item {
          padding: 8px 24px;
          text-align: center;
          &:not(:first-child) {
            margin-top: 16px;
          }
        }
        .tab-bar {
          width: 2px;
          left: 0;
        }
      }
    }
    // 纵向位置时收纳入口落在导航区下方，横向占满并居中
    .tabs-nav-operations {
      height: 32px;
      align-self: auto;
      justify-content: center;
    }
  }
  &.tabs-card {
    .tabs-nav-container {
      border-radius: 0 8px 8px 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 8px 8px 0;
          }
        }
      }
    }
  }
  &.tabs-card.tabs-small {
    .tabs-nav-container {
      border-radius: 0 6px 6px 0;
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            border-radius: 0 6px 6px 0;
          }
        }
      }
    }
  }
}
.tabs-small {
  .tabs-nav-container {
    font-size: 14px;
  }
  &.tabs-top:not(.tabs-card),
  &.tabs-bottom:not(.tabs-card) {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 8px 0;
          }
        }
      }
    }
  }
}
.tabs-middle {
  .tabs-nav-container {
    font-size: 14px;
  }
  &.tabs-top:not(.tabs-card),
  &.tabs-bottom:not(.tabs-card) {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 12px 0;
          }
        }
      }
    }
  }
}
.tabs-large {
  .tabs-nav-container {
    font-size: 16px;
  }
  &.tabs-top:not(.tabs-card),
  &.tabs-bottom:not(.tabs-card) {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 16px 0;
          }
        }
      }
    }
  }
}
.tabs-card {
  .tabs-nav-container {
    .tabs-nav-wrap {
      .tabs-nav-list {
        // 卡片按内容宽度排列，居中由导航容器负责（与 line 的分布方式互不影响）
        min-width: 0;
        .tab-item {
          padding: 8px 16px;
          background: var(--va-fill-color-4);
          border: 1px solid var(--va-border-split-color);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .tab-add {
          min-width: 40px;
          margin-left: 2px;
          padding: 0 8px;
          border: 1px solid var(--va-border-split-color);
          border-radius: 8px 8px 0 0;
        }
        .tab-card-active {
          color: var(--va-cp-tabs-primary-text-color, var(--va-primary-text-color));
          background: var(--va-bg-container-color);
          text-shadow: 0 0 0.25px currentcolor;
        }
        .tab-disabled {
          color: var(--va-text-color-disabled);
          cursor: not-allowed;
          &:hover {
            color: var(--va-text-color-disabled);
          }
        }
      }
    }
  }
  &.tabs-top {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-left: 2px;
            }
          }
          .tab-card-active {
            border-bottom-color: var(--va-bg-container-color);
          }
        }
      }
    }
  }
  &.tabs-bottom {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-left: 2px;
            }
          }
          .tab-card-active {
            border-top-color: var(--va-bg-container-color);
          }
        }
      }
    }
  }
  &.tabs-left {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-top: 2px;
            }
          }
          .tab-card-active {
            border-right-color: var(--va-bg-container-color);
          }
        }
      }
    }
  }
  &.tabs-right {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            &:not(:first-child) {
              margin-top: 2px;
            }
          }
          .tab-card-active {
            border-left-color: var(--va-bg-container-color);
          }
        }
      }
    }
  }
  &.tabs-small {
    .tabs-nav-container {
      .tabs-nav-wrap {
        .tabs-nav-list {
          .tab-item {
            padding: 6px 16px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
// 「更多」下拉：面板由宿主 Dropdown 渲染并 Teleport 到 body，作用域样式无法命中，故落在全局样式块。
// 内边距只留菜单自身一层（内容层归零），面板高度与首项间距才与页签栏密度一致；菜单项 30px 高 / 最小宽 120px / 超过 200px 滚动
.tabs-more-menu {
  // 展开动画以锚点侧为原点：默认居中缩放会让面板顶边在进场期间下沉，看起来离页签栏更远
  &.dropdown-overlay.va-popup-placement-bottomLeft,
  &.dropdown-overlay.va-popup-placement-bottomRight {
    transform-origin: top left;
  }
  &.dropdown-overlay.va-popup-placement-topLeft,
  &.dropdown-overlay.va-popup-placement-topRight {
    transform-origin: bottom left;
  }
  &.dropdown-overlay .dropdown-content {
    padding: 0;
  }
  .dropdown-menu {
    max-height: 200px;
    padding: 4px 0;
    overflow-y: auto;
  }
  .dropdown-menu .dropdown-menu-item-content {
    min-width: 120px;
    padding: 4px 12px;
  }
}
</style>
