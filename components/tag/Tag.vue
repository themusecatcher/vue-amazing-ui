<script setup lang="ts">
import { ref, computed, nextTick, watchEffect } from 'vue'
import type { VNode } from 'vue'
import Space, { type SpaceProps } from 'components/space'
import { useSlotsExist } from 'components/utils'
export interface Item {
  label?: string // 标签文本
  closable?: boolean // 标签是否可以关闭，默认 true
  color?: string // 标签颜色
  icon?: string // 设置图标
  size?: 'small' | 'middle' | 'large' // 标签尺寸
  bordered?: boolean // 是否有边框，默认 true
}

export interface Props {
  closable?: boolean // 标签是否可以关闭
  color?: string // 标签颜色
  icon?: string // 设置图标
  size?: 'small' | 'middle' | 'large' // 标签尺寸
  bordered?: boolean // 是否有边框
  dynamic?: boolean // 是否启用标签动态添加和删除
  spaceProps?: SpaceProps // Space 组件属性配置，仅当 dynamic: true 时生效
  value?: string[] | Item[] // 动态标签数组，仅当 dynamic: true 时生效
}
// 声明组件插槽类型
export interface TagSlots {
  // icon 存在两类出口：动态标签列表（带 item/index）与单个标签（无参数），故参数全部可选
  icon?: (props: { item?: Item; icon?: string; index?: number }) => VNode[]
  default?: () => VNode[]
  label?: (props: { item: Item; label: string | undefined; index: number }) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  closable: false,
  color: undefined,
  icon: undefined,
  size: 'middle',
  bordered: true,
  dynamic: false,
  spaceProps: () => ({}),
  value: () => []
})
defineSlots<TagSlots>()
const inputRef = ref<HTMLInputElement | null>(null)
const showInput = ref(false)
const inputValue = ref('')
const presetColor = [
  'success',
  'processing',
  'error',
  'warning',
  'default',
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
const hidden = ref(false)
const tagsIconRef = ref<HTMLElement[]>([]) // 各标签图标元素的模板引用数组
const showTagsIcon = ref(Array(props.value.length).fill(1))
const slotsExist = useSlotsExist(['icon'])
const emits = defineEmits(['update:value', 'close', 'dynamicClose'])
const isStrArray = computed(() => {
  if (props.dynamic) {
    if (props.value.length) {
      if (typeof props.value[0] === 'string') {
        return true
      }
      if (typeof props.value[0] === 'object') {
        return false
      }
    }
  }
  return null
})
const tagItems = computed(() => {
  if (props.dynamic) {
    if (props.value.length) {
      if (isStrArray.value) {
        return props.value.map((tag: any) => {
          return {
            label: tag,
            closable: true
          }
        })
      } else {
        return props.value.map((tag: any) => {
          return {
            closable: true,
            ...tag
          }
        })
      }
    }
  }
  return []
})
const showIcon = computed(() => {
  if (!props.dynamic) {
    return slotsExist.icon || props.icon
  }
  return false
})
watchEffect(() => {
  if (props.dynamic) {
    const len = props.value.length
    showTagsIcon.value = Array(len).fill(1)
    nextTick(() => {
      if (tagsIconRef.value) {
        for (let n = 0; n < len; n++) {
          // SSR（Node）下模板引用数组无对应元素，跳过缺失项
          const iconEl = tagsIconRef.value[n]
          if (iconEl) {
            showTagsIcon.value[n] = iconEl.offsetWidth
          }
        }
      }
    })
  }
})
function onClose(e: MouseEvent) {
  hidden.value = true
  emits('close', e)
}
function onCloseTags(item: Item, n: number) {
  const newValue = (props.value as any[]).filter((item: any, index: number) => {
    return index !== n
  })
  emits('update:value', newValue)
  emits('dynamicClose', item, n)
}
async function onAdd() {
  showInput.value = true
  await nextTick()
  inputRef.value?.focus()
}
function onChange() {
  if (isStrArray.value) {
    emits('update:value', [...props.value, inputValue.value])
  } else {
    emits('update:value', [
      ...props.value,
      {
        label: inputValue.value
      }
    ])
  }
  showInput.value = false
  inputValue.value = ''
}
function onKeyboard(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    inputRef.value?.blur()
  }
}
</script>
<template>
  <div
    v-if="!dynamic"
    class="tag-wrap"
    :class="[
      `tag-${size}`,
      color && presetColor.includes(color) ? `tag-${color}` : '',
      {
        'tag-borderless': !bordered,
        'tag-has-color': color && !presetColor.includes(color),
        'tag-hidden': hidden
      }
    ]"
    :style="`background-color: ${color && !presetColor.includes(color) ? color : ''};`"
  >
    <span v-if="showIcon" class="tag-icon">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span class="tag-label">
      <slot></slot>
    </span>
    <span v-if="closable" class="tag-close" @click="onClose">
      <svg
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
    </span>
  </div>
  <Space v-else gap="small" v-bind="spaceProps">
    <div
      class="tag-wrap"
      :class="[
        `tag-${item.size || size}`,
        (item.color || color) && presetColor.includes(item.color || color) ? `tag-${item.color || color}` : '',
        {
          'tag-borderless': item.bordered !== undefined && !item.bordered,
          'tag-has-color': (item.color || color) && !presetColor.includes(item.color || color)
        }
      ]"
      :style="`background-color: ${(item.color || color) && !presetColor.includes(item.color || color) ? item.color || color : ''};`"
      v-for="(item, index) in tagItems"
      :key="index"
    >
      <span v-if="showTagsIcon[index]" ref="tagsIconRef" class="tag-icon">
        <slot name="icon" :item="item" :icon="icon" :index="index">{{ item.icon }}</slot>
      </span>
      <span class="tag-label">
        <slot name="label" :item="item" :label="item.label" :index="index">{{ item.label }}</slot>
      </span>
      <span v-if="item.closable || closable" class="tag-close" @click="onCloseTags(item, index)">
        <svg
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
      </span>
    </div>
    <div v-if="!showInput" class="tag-wrap" :class="[`tag-${size}`, { 'tag-plus': dynamic }]" @click="onAdd">
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
    </div>
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
.tag-wrap {
  display: inline-flex;
  align-items: center;
  height: 24px;
  font-size: 14px;
  color: var(--va-text-color-1);
  padding-inline: 7px;
  white-space: nowrap;
  // 默认标签底：取最淡的中性叠加，暗色下才是浅色薄底而不是纯黑
  background: var(--va-fill-color-4);
  border: 1px solid var(--va-border-color);
  border-radius: 6px;
  transition: all 0.2s;
  text-align: start;
  .tag-icon {
    margin-right: 5px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    :deep(svg) {
      fill: currentColor;
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
    font-size: 14px;
    color: var(--va-text-color-1);
    font-style: normal;
    line-height: 0;
    text-align: center;
    vertical-align: -0.175em;
    transition: color 0.2s;
  }
  .tag-close {
    margin-left: 3px;
    display: inline-flex;
    align-items: center;
    height: 100%;
    vertical-align: top;
    font-style: normal;
    line-height: 0;
    text-align: center;
    cursor: pointer;
    .close-svg {
      display: inline-block;
      font-size: 12px;
      color: var(--va-text-color-3);
      transition: all 0.2s;
      &:hover {
        color: var(--va-text-color-1);
      }
    }
  }
}
.tag-small {
  height: 22px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 4px;
  .plus-svg {
    font-size: 12px;
  }
  .tag-close {
    font-size: 10px;
  }
}
.tag-large {
  height: 28px;
  line-height: 26px;
  .tag-close {
    font-size: 14px;
    vertical-align: -0.16em;
  }
}
.tag-plus {
  background: var(--va-bg-container-color);
  border-style: dashed;
  padding-inline: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-color: var(--va-cp-tag-primary-color, var(--va-primary-color));
    .plus-svg {
      color: var(--va-cp-tag-primary-color, var(--va-primary-color));
    }
  }
}
.tag-input {
  width: 86px;
  color: var(--va-text-color-1);
  height: 24px;
  font-size: 14px;
  line-height: 22px;
  padding: 0 8px;
  position: relative;
  display: inline-block;
  min-width: 0;
  background-color: var(--va-bg-container-color);
  border: 1px solid var(--va-border-color);
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;
  &:focus {
    /* 聚焦态：边框取悬停档主色（与 hover 同色），阴影取焦点环 */
    border-color: var(--va-cp-tag-primary-color-hover, var(--va-primary-color-hover));
    box-shadow: var(--va-cp-tag-focus-shadow, var(--va-focus-shadow));
    border-right-width: 1px;
    outline: 0;
  }
}
.input-small {
  width: 78px;
  height: 22px;
  font-size: 12px;
  line-height: 20px;
  padding: 0 6px;
  border-radius: 4px;
}
.input-large {
  width: 90px;
  height: 28px;
  line-height: 26px;
}
// 语义状态直接复用主题变量，暗色随表切换
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
.tag-borderless {
  border-color: transparent;
}
.tag-has-color {
  color: #fff;
  border-color: transparent;
  .tag-close .close-svg {
    color: rgba(255, 255, 255, 0.85);
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
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
 * 后者用于暗色页面内的浅色回环。暗色值取「底 0 档 / 边 2 档 / 字 5 档」。
 */
:root,
[data-va-mode='light'] {
  --tag-pink-text: #c41d7f;
  --tag-pink-bg: #fff0f6;
  --tag-pink-border: #ffadd2;
  --tag-red-text: #cf1322;
  --tag-red-bg: #fff1f0;
  --tag-red-border: #ffa39e;
  --tag-yellow-text: #d4b106;
  --tag-yellow-bg: #feffe6;
  --tag-yellow-border: #fffb8f;
  --tag-orange-text: #d46b08;
  --tag-orange-bg: #fff7e6;
  --tag-orange-border: #ffd591;
  --tag-green-text: #389e0d;
  --tag-green-bg: #f6ffed;
  --tag-green-border: #b7eb8f;
  --tag-cyan-text: #08979c;
  --tag-cyan-bg: #e6fffb;
  --tag-cyan-border: #87e8de;
  --tag-blue-text: #0958d9;
  --tag-blue-bg: #e6f4ff;
  --tag-blue-border: #91caff;
  --tag-purple-text: #531dab;
  --tag-purple-bg: #f9f0ff;
  --tag-purple-border: #d3adf7;
  --tag-geekblue-text: #1d39c4;
  --tag-geekblue-bg: #f0f5ff;
  --tag-geekblue-border: #adc6ff;
  --tag-magenta-text: #eb2f96;
  --tag-magenta-bg: #fff0f6;
  --tag-magenta-border: #ffadd2;
  --tag-volcano-text: #d4380d;
  --tag-volcano-bg: #fff2e8;
  --tag-volcano-border: #ffbb96;
  --tag-gold-text: #d48806;
  --tag-gold-bg: #fffbe6;
  --tag-gold-border: #ffe58f;
  --tag-lime-text: #7cb305;
  --tag-lime-bg: #fcffe6;
  --tag-lime-border: #eaff8f;
}
[data-va-mode='dark'] {
  --tag-pink-text: #cb2b83;
  --tag-pink-bg: #291321;
  --tag-pink-border: #551c3b;
  --tag-red-text: #d32029;
  --tag-red-bg: #2a1215;
  --tag-red-border: #58181c;
  --tag-yellow-text: #d8bd14;
  --tag-yellow-bg: #2b2611;
  --tag-yellow-border: #595014;
  --tag-orange-text: #d87a16;
  --tag-orange-bg: #2b1d11;
  --tag-orange-border: #593815;
  --tag-green-text: #49aa19;
  --tag-green-bg: #162312;
  --tag-green-border: #274916;
  --tag-cyan-text: #13a8a8;
  --tag-cyan-bg: #112123;
  --tag-cyan-border: #144848;
  --tag-blue-text: #1668dc;
  --tag-blue-bg: #111a2c;
  --tag-blue-border: #15325b;
  --tag-purple-text: #642ab5;
  --tag-purple-bg: #1a1325;
  --tag-purple-border: #301c4d;
  --tag-geekblue-text: #2b4acb;
  --tag-geekblue-bg: #131629;
  --tag-geekblue-border: #1c2755;
  --tag-magenta-text: #cb2b83;
  --tag-magenta-bg: #291321;
  --tag-magenta-border: #551c3b;
  --tag-volcano-text: #d84a1b;
  --tag-volcano-bg: #2b1611;
  --tag-volcano-border: #592716;
  --tag-gold-text: #d89614;
  --tag-gold-bg: #2b2111;
  --tag-gold-border: #594214;
  --tag-lime-text: #8bbb11;
  --tag-lime-bg: #1f2611;
  --tag-lime-border: #3e4f13;
}
</style>
