<script setup lang="ts">
import { ref, computed, getCurrentInstance, nextTick, watch } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Tooltip from 'components/tooltip'
import Button, { type ButtonProps } from 'components/button'
import { useSlotsExist } from 'components/utils'
// 基类型必须是相对路径的纯 .ts：compiler-sfc 解析 extends 基类型时不认别名，也不认 .vue
import type { TooltipProps } from '../tooltip/types'
import { TOOLTIP_INHERITED_DEFAULTS } from '../tooltip/types'

// 排除名单独立成类型：Omit 的 K 约束是 keyof any，拼错会静默漏剔除，
// 用 AssertKeys 补上 key 存在性校验（pnpm type-check 会拦住）
type OmittedTooltipKeys = 'tooltip' | 'contentClass' | 'contentStyle' | 'tooltipStyle'
type AssertKeys<T extends keyof TooltipProps> = T
type _OmittedKeysExist = AssertKeys<OmittedTooltipKeys>

/**
 * 与 Popover 同构：继承 Tooltip 契约，再由 rest 全量下发给内层 Tooltip，
 * 保证 `<Popconfirm trigger="hover">` 这类属性直接写在组件上的用法继续成立。
 *
 * `keyboard` 不再本地重声明，直接沿用继承来的类型（默认值仍为 true，见 withDefaults）。
 */
export interface Props extends Omit<TooltipProps, OmittedTooltipKeys> {
  title?: string // 弹出确认框的标题
  titleStyle?: CSSProperties // 设置标题的样式
  description?: string // 弹出确认框的内容描述
  descriptionStyle?: CSSProperties // 设置内容描述的样式
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
  icon?: 'success' | 'info' | 'warning' | 'danger' | VNode | (() => VNode) // 自定义 Icon 图标；插槽形态请用 #icon
  iconStyle?: CSSProperties // 设置 Icon 图标的样式，一般不需要设置，主要用于自定义 Icon 图标时
  cancelText?: string // 取消按钮文字
  cancelType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 取消按钮类型
  cancelProps?: ButtonProps // 取消按钮 props，优先级高于 cancelType，参考 Button 组件 props
  okText?: string // 确认按钮文字
  okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 确认按钮类型
  okProps?: ButtonProps // 确认按钮 props，优先级高于 okType，参考 Button 组件 props
  showCancel?: boolean // 是否显示取消按钮
}
// 声明组件插槽类型
export interface PopconfirmSlots {
  icon?: () => VNode[]
  title?: () => VNode[]
  description?: () => VNode[]
  cancelText?: () => VNode[]
  okText?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  // 默认值为 true 的布尔项必须显式继承：缺省会被 Vue 强转成 false 并覆盖 Tooltip 的默认值
  ...TOOLTIP_INHERITED_DEFAULTS,
  // 必须显式给默认值：Tooltip 默认 hover，漏写会让「点击确认」静默退化为「悬停确认」
  trigger: 'click',
  keyboard: true,
  // 确认框是「要求用户做决策」的面板：role 用 alertdialog（气泡内、无遮罩，故不设 aria-modal），
  // 可访问名称由标题元素经 aria-labelledby 提供；同时断开触发器的 aria-describedby ——
  // 否则整块按钮文案都会被当成触发器的描述朗读，而面板内容是待操作内容而非说明
  tooltipRole: 'alertdialog',
  describedBy: false,
  maxWidth: 'auto',
  bgColor: 'var(--va-bg-elevated-color)', // 必须是 CSS 变量，硬编码会失去换肤能力
  transitionDuration: 200,
  // `to` 的联合类型含 `false`，运行时类型因此带 Boolean —— 缺省时 Vue 会把它转成 `false`，
  // 下发给 Tooltip 后等价于「就地渲染」，浮层不再挂进承载层（Modal / Select 面板）内。
  // 必须显式给 `undefined`，Vue 才不会对该 boolean 型 prop 做缺省转换
  to: undefined,
  title: undefined,
  titleStyle: () => ({}),
  description: undefined,
  descriptionStyle: () => ({}),
  tooltipStyle: () => ({}),
  icon: 'warning',
  iconStyle: () => ({}),
  cancelText: '取消',
  cancelType: 'default',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  showCancel: true
})
// 声明 open 后 Vue 会丢弃 onUpdate:open 的 attrs 透传（runtime-core filterModelListeners），
// 故必须自行声明 emits 并在模板转发，否则 v-model:open 静默失效
const emits = defineEmits(['update:open', 'openChange', 'animationend', 'cancel', 'ok'])
defineSlots<PopconfirmSlots>()
// 必须用 computed 包裹：直接解构 props 会丢响应性，rest 变成一次性快照。
// 下方解构出的自有字段仅用于「从 rest 中剔除」，否则会作为 DOM 属性落到触发包裹层
const tooltipBindings = computed(() => {
  const {
    title,
    titleStyle,
    description,
    descriptionStyle,
    tooltipStyle,
    icon,
    iconStyle,
    cancelText,
    cancelType,
    cancelProps,
    okText,
    okType,
    okProps,
    showCancel,
    ...rest
  } = props
  return rest
})
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null) // Tooltip 组件模板引用
const slotsExist = useSlotsExist(['description'])
const showDesc = computed(() => {
  return slotsExist.description || props.description
})
// 面板的可访问名称：确认框标题既可来自 title prop 也可来自 #title 插槽，故 id 必须由组件自己生成，
// 由 aria-labelledby（落在带 role 的 .tooltip-card 上）指向标题元素
const titleId = `va-popconfirm-title-${getCurrentInstance()?.uid ?? 0}`
const okButtonRef = ref<InstanceType<typeof Button> | null>(null)
// 焦点是否由本组件送入面板：为真才在关闭时归还，避免把用户点到别处的焦点抢回来
let focusInsidePending = false
// 打开时把焦点送进「确定」：面板 Teleport 到 body 末尾，不主动聚焦时 Tab 的下一个落点是触发器
// 之后的 DOM，键盘用户根本到不了面板里的按钮。仅 click 触发聚焦 —— hover 打开时抢焦点会打断输入
function focusPanelOk(): void {
  if (props.trigger !== 'click') return
  nextTick(() => {
    const okEl = okButtonRef.value?.$el as HTMLElement | null
    if (!okEl) return
    okEl.focus({ preventScroll: true })
    focusInsidePending = true
  })
}
// 关闭后归还焦点：仅当焦点仍在面板内（或已落到 body）时归还，用户点到别处则不抢回来
function restoreFocusToTrigger(): void {
  if (!focusInsidePending) return
  focusInsidePending = false
  const card = tooltipRef.value?.tooltipCardRef ?? null
  const active = document.activeElement as HTMLElement | null
  if (active && active !== document.body && !card?.contains(active)) return
  tooltipRef.value?.focusTrigger()
}
function onOpenChange(open: boolean): void {
  emits('openChange', open)
  if (open) {
    focusPanelOk()
    return
  }
  restoreFocusToTrigger()
}
// 受控开合由父侧直接改 open 驱动，不经过 requestVisible（因而没有 openChange），单独兜两条路径
watch(
  () => props.open,
  (open) => {
    if (open === true) {
      focusPanelOk()
      return
    }
    if (open === false) restoreFocusToTrigger()
  }
)
function onCancel(e: Event): void {
  emits('cancel', e)
  tooltipRef.value?.hide()
}
function onOk(e: Event): void {
  emits('ok', e)
  tooltipRef.value?.hide()
}
</script>
<template>
  <Tooltip
    ref="tooltipRef"
    v-bind="tooltipBindings"
    :tooltip-style="{
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'start',
      ...tooltipStyle
    }"
    :tooltip-labelledby="titleId"
    @update:open="emits('update:open', $event)"
    @open-change="onOpenChange"
    @animationend="emits('animationend', $event)"
  >
    <template #tooltip>
      <div class="popconfirm-wrap">
        <span class="popconfirm-icon" :style="iconStyle">
          <slot name="icon">
            <svg
              v-if="icon === 'info'"
              class="icon-info"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="64 64 896 896"
              data-icon="info-circle"
              aria-hidden="true"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
              ></path>
            </svg>
            <svg
              v-else-if="icon === 'success'"
              class="icon-success"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="64 64 896 896"
              data-icon="check-circle"
              aria-hidden="true"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
              ></path>
            </svg>
            <svg
              v-else-if="icon === 'danger'"
              class="icon-danger"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="64 64 896 896"
              data-icon="close-circle"
              aria-hidden="true"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
              ></path>
            </svg>
            <svg
              v-else-if="icon === 'warning'"
              class="icon-warning"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="64 64 896 896"
              data-icon="exclamation-circle"
              aria-hidden="true"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
              ></path>
            </svg>
            <component v-else-if="icon" :is="icon" />
          </slot>
        </span>
        <div :id="titleId" class="popconfirm-title" :class="{ 'title-font-weight': showDesc }" :style="titleStyle">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
      <div v-if="showDesc" class="popconfirm-description" :style="descriptionStyle">
        <slot name="description">{{ description }}</slot>
      </div>
      <div class="popconfirm-btns">
        <Button v-if="showCancel" size="small" :type="cancelType" @click="onCancel" v-bind="cancelProps">
          <slot name="cancelText">{{ cancelText }}</slot>
        </Button>
        <Button ref="okButtonRef" size="small" :type="okType" @click="onOk" v-bind="okProps">
          <slot name="okText">{{ okText }}</slot>
        </Button>
      </div>
    </template>
    <slot></slot>
  </Tooltip>
</template>
<style lang="less" scoped>
.popconfirm-wrap {
  position: relative;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--va-text-color-1);
  display: flex;
  flex-wrap: nowrap;
  align-items: start;
  .popconfirm-icon {
    flex: none;
    font-size: 14px;
    line-height: 1;
    padding-top: 4px;
    display: inline-block;
    text-align: center;
    .icon-svg {
      display: inline-block;
      fill: currentColor;
    }
    :deep(svg) {
      fill: currentColor;
    }
  }
  .icon-info {
    color: var(--va-cp-popconfirm-primary-color, var(--va-primary-color));
  }
  .icon-success {
    color: var(--va-success-color);
  }
  .icon-danger {
    color: var(--va-error-color);
  }
  .icon-warning {
    color: var(--va-warning-color);
  }
  .popconfirm-title {
    flex: auto;
    margin-left: 8px;
  }
  .title-font-weight {
    font-weight: 600;
  }
}
.popconfirm-description {
  position: relative;
  margin-left: 22px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--va-text-color-1);
}
.popconfirm-btns {
  text-align: end;
  .btn-wrap {
    margin-left: 8px;
  }
}
</style>
