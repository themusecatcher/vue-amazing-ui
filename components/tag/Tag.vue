<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Space, { type SpaceProps } from 'components/space'
import { renderContentToVNode, useSlotsExist } from 'components/utils'
export interface TagColor {
  color?: string // 背景色
  textColor?: string // 文字色
  borderColor?: string // 边框色
}

export interface Item {
  label?: string // 标签文本
  closable?: boolean // 标签是否可以关闭，默认 true
  color?: string // 标签颜色
  icon?: string | VNode | (() => VNode) // 设置图标
  size?: 'small' | 'middle' | 'large' // 标签尺寸
  bordered?: boolean // 是否有边框，默认取组件 bordered
  disabled?: boolean // 是否禁用，默认取组件 disabled
}

export interface Props {
  value?: string[] | Item[] // 动态标签数组，仅当 dynamic: true 时生效
  icon?: string | VNode | (() => VNode) // 设置图标；插槽形态请用 #icon
  closeIcon?: string | VNode | (() => VNode) // 自定义关闭图标；插槽形态请用 #closeIcon
  color?: string | TagColor // 标签颜色：预设色名 / 具体色值 / 配色对象（可分别指定背景、文字、边框色）
  size?: 'small' | 'middle' | 'large' // 标签尺寸
  round?: boolean // 是否圆角胶囊形
  bordered?: boolean // 是否有边框
  disabled?: boolean // 是否禁用
  closable?: boolean // 标签是否可以关闭
  dynamic?: boolean // 是否启用标签动态添加和删除
  triggerClickOnClose?: boolean // 点击关闭按钮时是否同时触发标签的 click
  spaceProps?: SpaceProps // Space 组件属性配置，仅当 dynamic: true 时生效
}
export interface TagSlots {
  // icon / closeIcon 同时服务动态标签列表（带 item / index）与单个标签，故参数全部可选
  icon?: (props: { item?: Item; icon?: Props['icon']; index?: number }) => VNode[]
  closeIcon?: (props: { item?: Item; index?: number }) => VNode[]
  default?: () => VNode[]
  label?: (props: { item: Item; label: string | undefined; index: number }) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  icon: undefined,
  closeIcon: undefined,
  color: undefined,
  size: 'middle',
  bordered: true,
  round: false,
  disabled: false,
  closable: false,
  dynamic: false,
  triggerClickOnClose: false,
  spaceProps: () => ({})
})
// 仅动态分支需要插槽对象：`#icon` 带 item / index 作用域，只能按「是否提供」判断
const slots = defineSlots<TagSlots>()
const inputRef = ref<HTMLInputElement | null>(null)
const showInput = ref(false)
const inputValue = ref('')
const hidden = ref(false)
// 状态色与色板色分开维护：色板色另支持 `-inverse` 深色底变体，状态色没有该变体
const statusColor = ['success', 'processing', 'error', 'warning', 'default']
const paletteColor = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
]
const inverseSuffix = '-inverse'
const emits = defineEmits<{
  (e: 'update:value', value: string[] | Item[]): void
  (e: 'close', event: MouseEvent): void
  (e: 'click', event: MouseEvent): void
  (e: 'dynamicClose', item: Item, index: number): void
}>()
const isStrArray = computed(() => props.dynamic && typeof props.value[0] === 'string')
const tagItems = computed<Item[]>(() => {
  if (!props.dynamic || !props.value.length) return []
  // 字符串数组归一为 label 对象；对象数组默认可关闭（item 显式传 false 时以 item 为准）
  return props.value.map((value) =>
    typeof value === 'string' ? { label: value, closable: true } : { closable: true, ...value }
  )
})
// 静态分支的 `#icon` 只带组件级 `icon` 作用域参数，内容探测足以判定；动态项依赖 item / index，改用「是否提供」
const slotsExist = useSlotsExist(['icon'])
const showIcon = computed<boolean>(() => {
  if (props.dynamic) return false
  return slotsExist.icon || props.icon !== undefined
})
// 颜色呈现解析：预设色名走 class（随明暗主题变量变化），自定义配色才需要内联样式
const isColorObject = (value?: string | TagColor): value is TagColor => typeof value === 'object' && value !== null
const isPresetColor = (value?: string) => {
  if (!value) return false
  if (statusColor.includes(value) || paletteColor.includes(value)) return true
  return value.endsWith(inverseSuffix) && paletteColor.includes(value.slice(0, -inverseSuffix.length))
}
const isCustomColor = (value?: string | TagColor) => {
  if (isColorObject(value)) return !!(value.color || value.textColor || value.borderColor)
  return !!value && !isPresetColor(value)
}
// 非自定义配色返回空对象，避免输出无效声明；文字色经 CSS 变量下发，才能被关闭图标继承
const customStyle = (value?: string | TagColor): CSSProperties => {
  if (isColorObject(value)) {
    const style: Record<string, string> = {}
    if (value.color) style.backgroundColor = value.color
    if (value.borderColor) style.borderColor = value.borderColor
    if (value.textColor) style['--tag-custom-text'] = value.textColor
    return style as CSSProperties
  }
  return value && !isPresetColor(value) ? { backgroundColor: value } : {}
}
// 动态标签项的颜色、边框与禁用：项级设置优先，回落到组件级
const itemColor = (item: Item) => item.color || props.color
const itemBordered = (item: Item) => item.bordered ?? props.bordered
const itemDisabled = (item: Item) => item.disabled ?? props.disabled
const itemPresetClass = (item: Item) => {
  const color = itemColor(item)
  return !isColorObject(color) && isPresetColor(color) ? `tag-${color}` : ''
}
const closeIconNode = computed(() => (props.closeIcon === undefined ? null : renderContentToVNode(props.closeIcon)))
function onClick(e: MouseEvent) {
  if (props.disabled) return
  emits('click', e)
}
function onItemClick(e: MouseEvent, item: Item) {
  if (itemDisabled(item)) return
  emits('click', e)
}
// 关闭意图：先派发事件，父侧调用 preventDefault 时保留标签
function requestClose(event: MouseEvent) {
  emits('close', event)
  if (event.defaultPrevented) return
  hidden.value = true
}
function onClose(e: MouseEvent) {
  if (props.disabled) return
  if (!props.triggerClickOnClose) e.stopPropagation()
  requestClose(e)
}
// 关闭按钮可聚焦：Enter / Space 转发为一次原生 click，事件载荷与鼠标操作完全一致
function onCloseKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  if (e.key !== 'Enter' && e.key !== ' ') return
  e.preventDefault()
  ;(e.currentTarget as HTMLElement | null)?.click()
}
function onCloseTags(event: MouseEvent, item: Item, index: number) {
  if (itemDisabled(item)) return
  if (!props.triggerClickOnClose) event.stopPropagation()
  emits('close', event)
  if (event.defaultPrevented) return
  const newValue = isStrArray.value
    ? (props.value as string[]).filter((_, i) => i !== index)
    : (props.value as Item[]).filter((_, i) => i !== index)
  emits('update:value', newValue)
  emits('dynamicClose', item, index)
}
function onCloseTagsKeydown(e: KeyboardEvent) {
  if (e.key !== 'Enter' && e.key !== ' ') return
  e.preventDefault()
  ;(e.currentTarget as HTMLElement | null)?.click()
}
async function onAdd() {
  if (props.disabled) return
  showInput.value = true
  await nextTick()
  inputRef.value?.focus()
}
// 标签文本是否已存在：动态添加时去重，避免产生同名标签
function hasLabel(label: string) {
  return props.value.some((value) => (typeof value === 'string' ? value === label : value.label === label))
}
function onChange() {
  const label = inputValue.value.trim()
  showInput.value = false
  inputValue.value = ''
  if (!label || hasLabel(label)) return
  // 新增项与既有项同口径：对象项默认可关闭（见 tagItems 的归一化）
  const nextValue = isStrArray.value
    ? [...(props.value as string[]), label]
    : [...(props.value as Item[]), { label, closable: true }]
  emits('update:value', nextValue)
}
function onKeyboard(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    inputRef.value?.blur()
  }
  if (e.key === 'Escape') {
    showInput.value = false
    inputValue.value = ''
  }
}
</script>
<template>
  <span
    v-if="!dynamic"
    class="tag-wrap"
    :class="[
      `tag-${size}`,
      isPresetColor(typeof color === 'string' ? color : undefined) ? `tag-${color}` : '',
      {
        'tag-borderless': !bordered,
        'tag-round': round,
        'tag-disabled': disabled,
        'tag-has-color': isCustomColor(color),
        'tag-hidden': hidden
      }
    ]"
    :style="customStyle(color)"
    @click="onClick"
  >
    <span v-if="showIcon" class="tag-icon">
      <slot name="icon" :icon="icon">
        <component :is="renderContentToVNode(icon)" v-if="icon !== undefined" />
      </slot>
    </span>
    <span class="tag-label">
      <slot></slot>
    </span>
    <span
      v-if="closable"
      class="tag-close"
      role="button"
      aria-label="关闭标签"
      :tabindex="disabled ? -1 : 0"
      @click="onClose"
      @keydown="onCloseKeydown"
    >
      <slot name="closeIcon">
        <component :is="closeIconNode" v-if="closeIconNode" class="close-svg" />
        <svg
          v-else
          focusable="false"
          class="close-svg"
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
      </slot>
    </span>
  </span>
  <Space v-else gap="small" v-bind="spaceProps">
    <span
      v-for="(item, index) in tagItems"
      :key="index"
      class="tag-wrap"
      :class="[
        `tag-${item.size || size}`,
        itemPresetClass(item),
        {
          'tag-borderless': !itemBordered(item),
          'tag-round': round,
          'tag-disabled': itemDisabled(item),
          'tag-has-color': isCustomColor(itemColor(item))
        }
      ]"
      :style="customStyle(itemColor(item))"
      @click="onItemClick($event, item)"
    >
      <!-- 按「插槽已提供」而非「插槽有内容」判断：插槽内容可能依赖 item / index，
           setup 期的空对象探测拿不到真实结果，无内容的容器由 .tag-icon:empty 隐藏 -->
      <span v-if="slots.icon || item.icon !== undefined" class="tag-icon">
        <slot name="icon" :item="item" :icon="item.icon ?? icon" :index="index">
          <component :is="renderContentToVNode(item.icon)" v-if="item.icon !== undefined" />
        </slot>
      </span>
      <span class="tag-label">
        <slot name="label" :item="item" :label="item.label" :index="index">{{ item.label }}</slot>
      </span>
      <span
        v-if="item.closable ?? closable"
        class="tag-close"
        role="button"
        aria-label="关闭标签"
        :tabindex="itemDisabled(item) ? -1 : 0"
        @click="onCloseTags($event, item, index)"
        @keydown="onCloseTagsKeydown"
      >
        <slot name="closeIcon" :item="item" :index="index">
          <component :is="closeIconNode" v-if="closeIconNode" class="close-svg" />
          <svg
            v-else
            focusable="false"
            class="close-svg"
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
        </slot>
      </span>
    </span>
    <span
      v-if="!showInput"
      class="tag-wrap"
      :class="[`tag-${size}`, { 'tag-plus': dynamic, 'tag-disabled': disabled }]"
      @click="onAdd"
    >
      <svg
        focusable="false"
        class="plus-svg"
        data-icon="plus"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
      </svg>
    </span>
    <input
      v-if="showInput"
      ref="inputRef"
      class="tag-input"
      :class="`input-${size}`"
      type="text"
      v-model="inputValue"
      @blur="showInput = false"
      @change="onChange"
      @keydown="onKeyboard"
    />
  </Space>
</template>
<style lang="less" scoped>
// `-inverse` 变体：色板色反相为深色底 + 白字，底色取色板第 6 档
.tag-inverse(@bg) {
  color: var(--va-text-color-solid);
  background: @bg;
  border-color: @bg;
  :deep(svg) {
    color: inherit;
    fill: currentColor;
  }
}
.tag-wrap {
  display: inline-flex;
  align-items: center;
  height: 22px;
  font-size: 12px;
  line-height: 20px;
  color: var(--va-text-color-1);
  padding-inline: 7px;
  white-space: nowrap;
  background: var(--va-fill-color-4);
  border: 1px solid var(--va-border-color);
  border-radius: 4px;
  transition: all 0.2s;
  text-align: start;
  // 标签内的链接跟随标签文本色，而不是页面链接色；
  // 插槽内容带的是父组件的 scope 标记，必须用 :deep 命中，否则规则对用户传入的链接完全不生效
  :deep(a),
  :deep(a:hover) {
    color: inherit;
  }
  .tag-icon {
    margin-inline-end: 5px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    :deep(svg) {
      fill: currentColor;
    }
    // 插槽按条件渲染时可能产出空容器，此时不再占用间距
    &:empty {
      display: none;
    }
  }
  .tag-label {
    height: 100%;
    display: inline-flex;
    align-items: center;
  }
  .plus-svg {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    color: var(--va-text-color-1);
    font-style: normal;
    line-height: 0;
    text-align: center;
    vertical-align: -0.175em;
    transition: color 0.2s;
  }
  .tag-close {
    margin-inline-start: 3px;
    display: inline-flex;
    align-items: center;
    height: 100%;
    position: relative;
    vertical-align: top;
    font-style: normal;
    line-height: 0;
    text-align: center;
    cursor: pointer;
    // 焦点环画在居中的方框上而非点击区本身：点击区是撑满标签高度的窄条（10×22），
    // 直接描边会得到越出标签上下边界、与图标比例失衡的长方框
    &:focus-visible {
      outline: none;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        transform: translate(-50%, -50%);
        border: 2px solid var(--va-cp-tag-primary-color, var(--va-primary-color));
        border-radius: 4px;
        pointer-events: none;
      }
    }
    // 尺寸必须落在 .close-svg 上：父级 font-size 会被 svg 自身的字号覆盖
    .close-svg {
      display: inline-block;
      font-size: 10px;
      // 跟随标签文字色：固定的灰在彩色底、尤其 `-inverse` 深色底上几乎不可见；
      // 次要层级改用透明度表达，hover 恢复满色
      color: inherit;
      opacity: 0.7;
      transition: all 0.2s;
      &:hover {
        opacity: 1;
      }
    }
  }
}
.tag-small {
  height: 20px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 4px;
  .plus-svg {
    font-size: 10px;
  }
}
.tag-large {
  height: 28px;
  font-size: 14px;
  line-height: 26px;
  border-radius: 6px;
  .plus-svg {
    font-size: 14px;
  }
  .tag-close {
    vertical-align: -0.16em;
    .close-svg {
      font-size: 12px;
    }
  }
}
.tag-plus {
  background: var(--va-bg-container-color);
  border-style: dashed;
  padding-inline: 10px;
  text-align: center;
  cursor: pointer;
  // 禁用态不给出可点击的悬停反馈
  &:not(.tag-disabled):hover {
    border-color: var(--va-cp-tag-primary-color, var(--va-primary-color));
    .plus-svg {
      color: var(--va-cp-tag-primary-color, var(--va-primary-color));
    }
  }
}
.tag-input {
  width: 86px;
  color: var(--va-text-color-1);
  height: 22px;
  font-size: 12px;
  line-height: 20px;
  padding: 0 8px;
  position: relative;
  display: inline-block;
  min-width: 0;
  background-color: var(--va-bg-container-color);
  border: 1px solid var(--va-border-color);
  border-radius: 4px;
  outline: none;
  transition: all 0.2s;
  &:focus {
    border-color: var(--va-cp-tag-primary-color-hover, var(--va-primary-color-hover));
    box-shadow: var(--va-cp-tag-focus-shadow, var(--va-focus-shadow));
    border-right-width: 1px;
    outline: 0;
  }
}
.input-small {
  width: 78px;
  height: 20px;
  font-size: 12px;
  line-height: 18px;
  padding: 0 6px;
  border-radius: 4px;
}
.input-large {
  width: 90px;
  height: 28px;
  font-size: 14px;
  line-height: 26px;
  border-radius: 6px;
}
// 无边框标签的背景比默认深一档；声明在配色类之前，预设色/状态色才能保留各自的浅色底
.tag-borderless {
  background: var(--va-fill-color-1);
}
// 放在尺寸类之后，才能盖过各档位的圆角
.tag-round {
  border-radius: 999px;
}
.tag-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.tag-success {
  color: var(--va-success-color);
  background: var(--va-success-bg-color);
  border-color: var(--va-success-border-color);
  :deep(svg) {
    color: inherit;
    fill: currentColor;
  }
}
.tag-processing {
  color: var(--va-cp-tag-primary-color, var(--va-primary-color));
  background: var(--va-cp-tag-primary-bg-color, var(--va-primary-bg-color));
  border-color: var(--va-cp-tag-primary-border-color, var(--va-primary-border-color));
  :deep(svg) {
    color: inherit;
    fill: currentColor;
  }
}
.tag-error {
  color: var(--va-error-color);
  background: var(--va-error-bg-color);
  border-color: var(--va-error-border-color);
  :deep(svg) {
    color: inherit;
    fill: currentColor;
  }
}
.tag-warning {
  color: var(--va-warning-color);
  background: var(--va-warning-bg-color);
  border-color: var(--va-warning-border-color);
  :deep(svg) {
    color: inherit;
    fill: currentColor;
  }
}
.tag-pink {
  color: var(--tag-pink-text);
  background: var(--tag-pink-bg);
  border-color: var(--tag-pink-border);
  :deep(svg) {
    color: var(--tag-pink-text);
    fill: currentColor;
  }
}
.tag-red {
  color: var(--tag-red-text);
  background: var(--tag-red-bg);
  border-color: var(--tag-red-border);
  :deep(svg) {
    color: var(--tag-red-text);
    fill: currentColor;
  }
}
.tag-yellow {
  color: var(--tag-yellow-text);
  background: var(--tag-yellow-bg);
  border-color: var(--tag-yellow-border);
  :deep(svg) {
    color: var(--tag-yellow-text);
    fill: currentColor;
  }
}
.tag-orange {
  color: var(--tag-orange-text);
  background: var(--tag-orange-bg);
  border-color: var(--tag-orange-border);
  :deep(svg) {
    color: var(--tag-orange-text);
    fill: currentColor;
  }
}
.tag-green {
  color: var(--tag-green-text);
  background: var(--tag-green-bg);
  border-color: var(--tag-green-border);
  :deep(svg) {
    color: var(--tag-green-text);
    fill: currentColor;
  }
}
.tag-cyan {
  color: var(--tag-cyan-text);
  background: var(--tag-cyan-bg);
  border-color: var(--tag-cyan-border);
  :deep(svg) {
    color: var(--tag-cyan-text);
    fill: currentColor;
  }
}
.tag-blue {
  color: var(--tag-blue-text);
  background: var(--tag-blue-bg);
  border-color: var(--tag-blue-border);
  :deep(svg) {
    color: var(--tag-blue-text);
    fill: currentColor;
  }
}
.tag-purple {
  color: var(--tag-purple-text);
  background: var(--tag-purple-bg);
  border-color: var(--tag-purple-border);
  :deep(svg) {
    color: var(--tag-purple-text);
    fill: currentColor;
  }
}
.tag-geekblue {
  color: var(--tag-geekblue-text);
  background: var(--tag-geekblue-bg);
  border-color: var(--tag-geekblue-border);
  :deep(svg) {
    color: var(--tag-geekblue-text);
    fill: currentColor;
  }
}
.tag-magenta {
  color: var(--tag-magenta-text);
  background: var(--tag-magenta-bg);
  border-color: var(--tag-magenta-border);
  :deep(svg) {
    color: var(--tag-magenta-text);
    fill: currentColor;
  }
}
.tag-volcano {
  color: var(--tag-volcano-text);
  background: var(--tag-volcano-bg);
  border-color: var(--tag-volcano-border);
  :deep(svg) {
    color: var(--tag-volcano-text);
    fill: currentColor;
  }
}
.tag-gold {
  color: var(--tag-gold-text);
  background: var(--tag-gold-bg);
  border-color: var(--tag-gold-border);
  :deep(svg) {
    color: var(--tag-gold-text);
    fill: currentColor;
  }
}
.tag-lime {
  color: var(--tag-lime-text);
  background: var(--tag-lime-bg);
  border-color: var(--tag-lime-border);
  :deep(svg) {
    color: var(--tag-lime-text);
    fill: currentColor;
  }
}
.tag-pink-inverse {
  .tag-inverse(var(--tag-pink-inverse-bg));
}
.tag-red-inverse {
  .tag-inverse(var(--tag-red-inverse-bg));
}
.tag-yellow-inverse {
  .tag-inverse(var(--tag-yellow-inverse-bg));
}
.tag-orange-inverse {
  .tag-inverse(var(--tag-orange-inverse-bg));
}
.tag-cyan-inverse {
  .tag-inverse(var(--tag-cyan-inverse-bg));
}
.tag-green-inverse {
  .tag-inverse(var(--tag-green-inverse-bg));
}
.tag-blue-inverse {
  .tag-inverse(var(--tag-blue-inverse-bg));
}
.tag-purple-inverse {
  .tag-inverse(var(--tag-purple-inverse-bg));
}
.tag-geekblue-inverse {
  .tag-inverse(var(--tag-geekblue-inverse-bg));
}
.tag-magenta-inverse {
  .tag-inverse(var(--tag-magenta-inverse-bg));
}
.tag-volcano-inverse {
  .tag-inverse(var(--tag-volcano-inverse-bg));
}
.tag-gold-inverse {
  .tag-inverse(var(--tag-gold-inverse-bg));
}
.tag-lime-inverse {
  .tag-inverse(var(--tag-lime-inverse-bg));
}
.tag-has-color {
  // 文字色经 `--tag-custom-text` 下发，配置对象里的 textColor 才能同时作用于文本与关闭图标
  color: var(--tag-custom-text, var(--va-text-color-solid));
  border-color: transparent;
}
// 必须放在全部配色规则之后：无边框对所有配色形态统一去掉边框，配色自带的底色保持不变
.tag-wrap.tag-borderless {
  border-color: transparent;
}
.tag-hidden {
  display: none;
}
</style>
<style lang="less">
/**
 * 预设色板变量（组件自有色彩资产，不属于 `--va-*` 公开契约）
 *
 * 为什么不用「模式属性 + 后代选择器」：后代选择器只判断“祖先里有没有 dark”，
 * 无法感知更近的 light 作用域 —— 暗色页面里的嵌套浅色作用域、以及带 `data-va-mode`
 * 的 Teleport 面板都会取错色板。按模式声明为**继承变量**后，取值跟随最近的声明节点，
 * 与作用域/转发天然对齐。
 *
 * 浅色同时声明在 `:root` 与 `[data-va-mode='light']`：前者服务无属性的默认页面，
 * 后者用于暗色页面内的浅色回环。暗色值取「底 0 档 / 边 2 档 / 字 5 档」；
 * `-inverse` 变体的底色取第 6 档（色板基准色），因此单独声明。
 */
:root,
[data-va-mode='light'] {
  --tag-pink-text: #c41d7f;
  --tag-pink-bg: #fff0f6;
  --tag-pink-border: #ffadd2;
  --tag-pink-inverse-bg: #eb2f96;
  --tag-red-text: #cf1322;
  --tag-red-bg: #fff1f0;
  --tag-red-border: #ffa39e;
  --tag-red-inverse-bg: #f5222d;
  --tag-yellow-text: #d4b106;
  --tag-yellow-bg: #feffe6;
  --tag-yellow-border: #fffb8f;
  --tag-yellow-inverse-bg: #fadb14;
  --tag-orange-text: #d46b08;
  --tag-orange-bg: #fff7e6;
  --tag-orange-border: #ffd591;
  --tag-orange-inverse-bg: #fa8c16;
  --tag-green-text: #389e0d;
  --tag-green-bg: #f6ffed;
  --tag-green-border: #b7eb8f;
  --tag-green-inverse-bg: #52c41a;
  --tag-cyan-text: #08979c;
  --tag-cyan-bg: #e6fffb;
  --tag-cyan-border: #87e8de;
  --tag-cyan-inverse-bg: #13c2c2;
  --tag-blue-text: #0958d9;
  --tag-blue-bg: #e6f4ff;
  --tag-blue-border: #91caff;
  --tag-blue-inverse-bg: #1677ff;
  --tag-purple-text: #531dab;
  --tag-purple-bg: #f9f0ff;
  --tag-purple-border: #d3adf7;
  --tag-purple-inverse-bg: #722ed1;
  --tag-geekblue-text: #1d39c4;
  --tag-geekblue-bg: #f0f5ff;
  --tag-geekblue-border: #adc6ff;
  --tag-geekblue-inverse-bg: #2f54eb;
  --tag-magenta-text: #eb2f96;
  --tag-magenta-bg: #fff0f6;
  --tag-magenta-border: #ffadd2;
  --tag-magenta-inverse-bg: #eb2f96;
  --tag-volcano-text: #d4380d;
  --tag-volcano-bg: #fff2e8;
  --tag-volcano-border: #ffbb96;
  --tag-volcano-inverse-bg: #fa541c;
  --tag-gold-text: #d48806;
  --tag-gold-bg: #fffbe6;
  --tag-gold-border: #ffe58f;
  --tag-gold-inverse-bg: #faad14;
  --tag-lime-text: #7cb305;
  --tag-lime-bg: #fcffe6;
  --tag-lime-border: #eaff8f;
  --tag-lime-inverse-bg: #a0d911;
}
[data-va-mode='dark'] {
  --tag-pink-text: #cb2b83;
  --tag-pink-bg: #291321;
  --tag-pink-border: #551c3b;
  --tag-pink-inverse-bg: #cb2b83;
  --tag-red-text: #d32029;
  --tag-red-bg: #2a1215;
  --tag-red-border: #58181c;
  --tag-red-inverse-bg: #d32029;
  --tag-yellow-text: #d8bd14;
  --tag-yellow-bg: #2b2611;
  --tag-yellow-border: #595014;
  --tag-yellow-inverse-bg: #d8bd14;
  --tag-orange-text: #d87a16;
  --tag-orange-bg: #2b1d11;
  --tag-orange-border: #593815;
  --tag-orange-inverse-bg: #d87a16;
  --tag-green-text: #49aa19;
  --tag-green-bg: #162312;
  --tag-green-border: #274916;
  --tag-green-inverse-bg: #49aa19;
  --tag-cyan-text: #13a8a8;
  --tag-cyan-bg: #112123;
  --tag-cyan-border: #144848;
  --tag-cyan-inverse-bg: #13a8a8;
  --tag-blue-text: #1668dc;
  --tag-blue-bg: #111a2c;
  --tag-blue-border: #15325b;
  --tag-blue-inverse-bg: #1668dc;
  --tag-purple-text: #642ab5;
  --tag-purple-bg: #1a1325;
  --tag-purple-border: #301c4d;
  --tag-purple-inverse-bg: #642ab5;
  --tag-geekblue-text: #2b4acb;
  --tag-geekblue-bg: #131629;
  --tag-geekblue-border: #1c2755;
  --tag-geekblue-inverse-bg: #2b4acb;
  --tag-magenta-text: #cb2b83;
  --tag-magenta-bg: #291321;
  --tag-magenta-border: #551c3b;
  --tag-magenta-inverse-bg: #cb2b83;
  --tag-volcano-text: #d84a1b;
  --tag-volcano-bg: #2b1611;
  --tag-volcano-border: #592716;
  --tag-volcano-inverse-bg: #d84a1b;
  --tag-gold-text: #d89614;
  --tag-gold-bg: #2b2111;
  --tag-gold-border: #594214;
  --tag-gold-inverse-bg: #d89614;
  --tag-lime-text: #8bbb11;
  --tag-lime-bg: #1f2611;
  --tag-lime-border: #3e4f13;
  --tag-lime-inverse-bg: #8bbb11;
}
</style>
