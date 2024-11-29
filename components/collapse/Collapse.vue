<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties, VNode, Slot } from 'vue'
import Button from '../button'
export interface Item {
  key?: string | number // 对应 activeKey，如果没有传入 key 属性，则默认使用数据索引 (0,1,2...) 绑定
  header?: string // 面板标题 string | slot
  content?: string // 面板内容 string | slot
  disabled?: boolean // 是否禁用展开
  copyable?: boolean // 是否可复制面板内容
  copyProps?: object // 复制按钮属性配置，参考 Button Props
  copyText?: string // 复制按钮文本
  copiedText?: string // 已复制按钮文本
  lang?: string // 面板右上角固定内容，例如 language 标识 string | slot
  arrow?: VNode | Slot // 自定义箭头切换图标
  showArrow?: boolean // 是否展示箭头
  arrowPlacement?: 'left' | 'right' // 箭头位置
  extra?: string // 面板标题右侧的额外内容 string | slot
  [propName: string]: any // 用于包含带有任意数量的其他属性
}
export interface Props {
  items?: Item[] // 折叠面板数据，可使用 slot 替换指定 key 的 header、content、arrow、extra、lang
  activeKey?: string[] | string | number[] | number | null // (v-model) 当前激活 tab 面板的 key，传入 string | number 类型时，即为手风琴模式
  disabled?: boolean // 是否禁用，较低优先级
  collapseStyle?: CSSProperties // 设置面板的样式
  bordered?: boolean // 带边框风格的折叠面板
  ghost?: boolean // 使折叠面板透明且无边框
  itemStyle?: CSSProperties // 设置面板容器的样式
  headerStyle?: CSSProperties // 设置面板标题的样式
  contentStyle?: CSSProperties // 设置面板内容的样式
  arrow?: Slot // 自定义箭头切换图标 slot
  showArrow?: boolean // 是否展示箭头，较低优先级
  arrowPlacement?: 'left' | 'right' // 箭头位置
  arrowStyle?: CSSProperties // 设置面板箭头的样式
  extra?: string // 面板标题右侧的额外内容，较低优先级 string | slot
  lang?: string // 面板右上角固定内容，例如 language 标识，较低优先级 string | slot
  copyable?: boolean // 是否可复制面板内容，较低优先级
  copyProps?: object // 复制按钮属性配置，参考 Button Props，较低优先级
  copyText?: string // 复制按钮文本，较低优先级
  copiedText?: string // 已复制按钮文本，较低优先级
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  activeKey: null,
  disabled: false,
  collapseStyle: () => ({}),
  bordered: true,
  ghost: false,
  itemStyle: () => ({}),
  headerStyle: () => ({}),
  contentStyle: () => ({}),
  arrow: undefined,
  showArrow: true,
  arrowPlacement: 'left',
  arrowStyle: () => ({}),
  extra: undefined,
  lang: undefined,
  copyable: false,
  copyProps: () => ({}),
  copyText: 'Copy',
  copiedText: 'Copied'
})
const contentRef = ref() // 面板内容的模板引用
const copyBtnTxt = ref<string>() // 复制按钮文本
const copyBtnClickedKeys = ref<(string | number)[]>([]) // 被点击的复制按钮的 key
const emits = defineEmits(['update:activeKey', 'change'])
watchEffect(() => {
  copyBtnTxt.value = props.copyText
})
function getComputedValue(item: Item, key: keyof Props) {
  let computedValue = props[key as keyof Props]
  if (item?.[key as keyof Item] !== undefined) {
    computedValue = item[key as keyof Item]
  }
  return computedValue
}
function getComputedKey(key: number|string|undefined, index: number) {
  if (key !== undefined) {
    return key
  }
  return index
}
function setProperties(el: Element) {
  ;(el as HTMLElement).style.height =
    (el.lastElementChild as HTMLElement).offsetHeight + (props.bordered && !props.ghost ? 1 : 0) + 'px'
  ;(el as HTMLElement).style.opacity = '1'
}
function removeProperties(el: Element) {
  ;(el as HTMLElement).style.removeProperty('height')
  ;(el as HTMLElement).style.removeProperty('opacity')
}
function emitValue(value: any) {
  emits('update:activeKey', value)
  emits('change', value)
}
function onClick(key: string | number) {
  if (activeCheck(key)) {
    if (Array.isArray(props.activeKey)) {
      const res = (props.activeKey as any[]).filter((actKey: string | number) => actKey !== key)
      emitValue(res)
    } else {
      emitValue(null)
    }
  } else {
    if (Array.isArray(props.activeKey)) {
      emitValue([...props.activeKey, key])
    } else {
      emitValue(key)
    }
  }
}
function activeCheck(key: string | number): boolean {
  if (Array.isArray(props.activeKey)) {
    return (props.activeKey as any[]).includes(key)
  } else {
    return props.activeKey === key
  }
}
function getCopyBtnTxt(item: Item, index: number) {
  const copyText = getComputedValue(item, 'copyText')
  const copiedText = getComputedValue(item, 'copiedText')
  if (copyBtnClickedKeys.value.includes(getComputedKey(item.key, index))) {
    return copiedText
  } else {
    return copyText
  }
}
function onCopy(index: number, key: string | number) {
  navigator.clipboard.writeText(contentRef.value[index].innerText || '').then(
    () => {
      /* clipboard successfully set */
      copyBtnClickedKeys.value.push(key)
      setTimeout(() => {
        copyBtnClickedKeys.value.filter((clickedKey: string | number ) => clickedKey !== key)
      }, 3000)
    },
    (err) => {
      /* clipboard write failed */
      console.log('copy failed', err)
    }
  )
}
</script>
<template>
  <div
    class="m-collapse"
    :class="{
      'collapse-borderless': !bordered,
      'collapse-arrow-right': arrowPlacement === 'right',
      'collapse-ghost': ghost
    }"
    :style="collapseStyle"
  >
    <div
      class="m-collapse-item"
      :class="{ 'collapse-item-disabled': getComputedValue(item, 'disabled') }"
      :style="itemStyle"
      v-for="(item, index) in items"
      :key="index"
    >
      <div
        tabindex="0"
        class="m-collapse-header"
        :class="{ 'collapse-header-no-arrow': item.showArrow !== undefined ? !item.showArrow : !showArrow }"
        :style="headerStyle"
        @click="getComputedValue(item, 'disabled') ? () => false : onClick(getComputedKey(item.key, index))"
        @keydown.enter="onClick(getComputedKey(item.key, index))"
      >
        <div
          v-if="item.showArrow !== undefined ? item.showArrow : showArrow"
          class="collapse-arrow"
          :style="arrowStyle"
        >
          <slot name="arrow" :key="getComputedKey(item.key, index)" :active="activeCheck(getComputedKey(item.key, index))">
            <svg
              class="arrow-svg"
              :class="{ 'arrow-rotate': activeCheck(getComputedKey(item.key, index)) }"
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
          </slot>
        </div>
        <div class="collapse-header">
          <slot name="header" :item="item" :header="item.header" :key="getComputedKey(item.key, index)" :active="activeCheck(getComputedKey(item.key, index))">
            {{ item.header || '--' }}
          </slot>
        </div>
        <div class="collapse-extra">
          <slot name="extra" :item="item" :extra="item.extra" :key="getComputedKey(item.key, index)" :active="activeCheck(getComputedKey(item.key, index))">
            {{ item.extra || extra }}
          </slot>
        </div>
      </div>
      <Transition
        name="collapse"
        @enter="setProperties"
        @after-enter="removeProperties"
        @leave="setProperties"
        @after-leave="removeProperties"
      >
        <div
          v-show="activeCheck(getComputedKey(item.key, index))"
          class="m-collapse-content"
          :class="{ 'collapse-copyable': getComputedValue(item, 'copyable') }"
        >
          <div class="collapse-lang">
            <slot name="lang" :item="item" :lang="getComputedValue(item, 'lang')" :key="getComputedKey(item.key, index)" :active="activeCheck(getComputedKey(item.key, index))">
              {{ getComputedValue(item, 'lang') }}
            </slot>
          </div>
          <Button class="collapse-copy" size="small" type="primary" @click="onCopy(index, getComputedKey(item.key, index))" v-bind="getComputedValue(item, 'copyProps') as object">
            {{ getCopyBtnTxt(item, index) }}
          </Button>
          <div ref="contentRef" class="collapse-content" :style="contentStyle">
            <slot
              name="content"
              :item="item"
              :content="item.content"
              :key="getComputedKey(item.key, index)"
              :active="activeCheck(getComputedKey(item.key, index))"
            >
              {{ item.content }}
            </slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style lang="less" scoped>
.collapse-enter-active,
.collapse-leave-active {
  overflow: hidden;
  transition:
    height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.collapse-enter-from,
.collapse-leave-to {
  height: 0 !important;
  opacity: 0 !important;
}
.m-collapse {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 8px;
  .m-collapse-item {
    border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border-radius: 0 0 8px 8px;
      .m-collapse-header,
      .m-collapse-content {
        border-radius: 0 0 8px 8px;
      }
    }
    .m-collapse-header {
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      padding: 12px 16px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.5714285714285714;
      cursor: pointer;
      transition: all 0.3s;
      &:focus {
        outline: none;
      }
      .collapse-arrow {
        font-size: 12px;
        height: 22px;
        display: flex;
        align-items: center;
        padding-right: 12px;
        .arrow-rotate {
          transform: rotate(90deg);
        }
        :deep(svg) {
          fill: currentColor;
          transition: transform 0.3s;
        }
      }
      .collapse-header {
        // 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器
        flex: auto; // 相当于 flex: 1 1 auto
        margin-right: auto;
        display: inline-block;
      }
      .collapse-extra {
        display: flex;
        align-items: center;
        :deep(svg) {
          fill: currentColor;
        }
      }
    }
    .collapse-header-no-arrow {
      padding-left: 12px;
    }
    .m-collapse-content {
      position: relative;
      color: rgba(0, 0, 0, 0.88);
      background-color: #ffffff;
      border-top: 1px solid #d9d9d9;
      .collapse-lang {
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.38);
        opacity: 1;
        transition: opacity 0.3s;
      }
      .collapse-copy {
        position: absolute;
        right: 8px;
        top: 8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
      }
      .collapse-content {
        padding: 16px;
        white-space: pre-wrap;
      }
    }
    .collapse-copyable {
      &:hover {
        .collapse-lang {
          opacity: 0;
          pointer-events: none;
        }
        .collapse-copy {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
  .collapse-item-disabled {
    .m-collapse-header {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
}
.collapse-borderless {
  background-color: rgba(0, 0, 0, 0.02);
  border: 0;
  .m-collapse-item {
    &:last-child {
      border-bottom: 0;
      .m-collapse-header {
        border-radius: 0;
      }
    }
    .m-collapse-content {
      background-color: transparent;
      border-top: 0;
    }
  }
}
.collapse-arrow-right {
  .m-collapse-item .m-collapse-header .collapse-arrow {
    order: 1; // order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0
    padding-right: 0;
    padding-left: 12px;
  }
}
.collapse-ghost {
  background-color: transparent;
  border: 0;
  .m-collapse-item {
    border-bottom: 0;
    .m-collapse-content {
      background-color: transparent;
      border: 0;
    }
  }
}
</style>
